import { useState, useMemo } from 'react';
import { Patient } from '../../shared/types/patient';
import { AccessType, Diluent, DoseUnit, Drug, DrugPresentation, PumpType, RegimeType } from '../../shared/types/drug';
import { CalculationInput } from '../../shared/types/calculation';
import { calculateCRI } from '../../calculation-engine/calculator';
import { evaluateSafety } from '../../safety-rules/evaluator';
import { FavoriteItem } from '../services/favoritesService';
import { HistoryItem } from '../services/historyService';
import { getDrugById } from '../../catalog/drugs';
import {
  buildCustomPresentation,
  CUSTOM_PRESENTATION_ID,
  getSupportedRegimes,
} from '../../ui/lib/drugContent';

interface CalculationConfigState {
  dose: number;
  doseUnit: DoseUnit;
  presentationId: string;
  diluent: Diluent;
  totalVolume: number;
  infusionRate: number;
  regime: RegimeType;
  accessType: AccessType;
  pumpType: PumpType;
  customPresentationConcentration: number;
  customPresentationUnit: DrugPresentation['concentrationUnit'];
  customVolumeEnabled: boolean;
  usePreDilution: boolean;
}

const DEFAULT_CONFIG: CalculationConfigState = {
  dose: 0,
  doseUnit: 'mcg/kg/min',
  presentationId: '',
  diluent: 'NaCl 0.9%',
  totalVolume: 100,
  infusionRate: 10,
  regime: 'CRI',
  accessType: 'peripheral',
  pumpType: 'syringe',
  customPresentationConcentration: 0,
  customPresentationUnit: 'mg/mL',
  customVolumeEnabled: false,
  usePreDilution: false,
};

export const useCalculation = () => {
  const [patient, setPatient] = useState<Patient>({
    species: 'dog',
    weight: 10,
    state: 'adult',
    comorbidities: [],
  });

  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [config, setConfig] = useState<CalculationConfigState>(DEFAULT_CONFIG);

  const getDefaultRegime = (drug: Drug): RegimeType => {
    const supportedRegimes = getSupportedRegimes(drug);
    if (supportedRegimes.includes('CRI')) {
      return 'CRI';
    }
    if (supportedRegimes.includes('titratable')) {
      return 'titratable';
    }
    return supportedRegimes[0] || 'bolus';
  };

  const handleDrugSelect = (drug: Drug | null) => {
    if (!drug) {
      setSelectedDrug(null);
      setConfig(DEFAULT_CONFIG);
      return;
    }

    setSelectedDrug(drug);

    const defaultRegime = getDefaultRegime(drug);
    const defaultDoseRange =
      defaultRegime === 'bolus' ? drug.bolusDoses?.[patient.species] : drug.doses[patient.species];
    const defaultPresentation = drug.presentations[0];

    setConfig((prev) => ({
      ...prev,
      dose: defaultDoseRange?.min || 0,
      doseUnit: defaultDoseRange?.unit || drug.preferredUnit,
      presentationId: defaultPresentation?.id || '',
      diluent: drug.safetyMetadata.preferredDiluent || 'NaCl 0.9%',
      regime: defaultRegime,
      accessType: drug.safetyMetadata.centralAccessRequired ? 'central' : 'peripheral',
      pumpType: drug.safetyMetadata.syringePumpRequired ? 'syringe' : 'volumetric',
      customPresentationConcentration: defaultPresentation?.concentration || 0,
      customPresentationUnit: defaultPresentation?.concentrationUnit || 'mg/mL',
      customVolumeEnabled: false,
    }));
  };

  const handleConfigChange = <K extends keyof CalculationConfigState>(field: K, value: CalculationConfigState[K]) => {
    setConfig((prev) => {
      if (field === 'presentationId' && value === CUSTOM_PRESENTATION_ID && selectedDrug) {
        const seedPresentation = selectedDrug.presentations[0];

        return {
          ...prev,
          presentationId: CUSTOM_PRESENTATION_ID,
          customPresentationConcentration:
            prev.customPresentationConcentration > 0
              ? prev.customPresentationConcentration
              : seedPresentation?.concentration || 0,
          customPresentationUnit: prev.customPresentationUnit || seedPresentation?.concentrationUnit || 'mg/mL',
        };
      }

      if (field === 'customVolumeEnabled' && !value) {
        return {
          ...prev,
          customVolumeEnabled: false,
        };
      }

      if (field === 'regime' && selectedDrug) {
        const isBolus = value === 'bolus' || value === 'bolus_maintenance';
        const currentUnit = prev.doseUnit;
        const isCurrentUnitBolus = ['mg/kg', 'mcg/kg', 'mL/kg', 'U/kg', 'mcg/m2'].includes(currentUnit);

        if (isBolus && !isCurrentUnitBolus) {
          const bolusUnit = selectedDrug.bolusDoses?.[patient.species]?.unit || 'mg/kg';
          return { ...prev, regime: value as RegimeType, doseUnit: bolusUnit };
        } else if (!isBolus && isCurrentUnitBolus) {
          const criUnit = selectedDrug.doses[patient.species]?.unit || selectedDrug.preferredUnit || 'mcg/kg/min';
          return { ...prev, regime: value as RegimeType, doseUnit: criUnit };
        }
      }

      return { ...prev, [field]: value };
    });
  };

  const loadFavorite = (item: FavoriteItem | HistoryItem) => {
    const hydratedDrug = getDrugById(item.input.drug.id) || item.input.drug;
    const isCustomPresentation = Boolean(item.input.presentation.custom);

    setPatient(item.input.patient);
    setSelectedDrug(hydratedDrug);
    setConfig({
      dose: item.input.dose,
      doseUnit: item.input.doseUnit,
      presentationId: isCustomPresentation ? CUSTOM_PRESENTATION_ID : item.input.presentation.id,
      diluent: item.input.diluent,
      totalVolume: item.input.totalVolume,
      infusionRate: item.input.infusionRate,
      regime: item.input.regime || 'CRI',
      accessType: item.input.accessType || 'peripheral',
      pumpType: item.input.pumpType || 'syringe',
      customPresentationConcentration: item.input.presentation.concentration,
      customPresentationUnit: item.input.presentation.concentrationUnit,
      customVolumeEnabled: ![5, 10, 20, 60, 100, 250, 500, 1000].includes(item.input.totalVolume),
      usePreDilution: false,
    });
  };

  const calculationData = useMemo(() => {
    if (!selectedDrug || !patient.weight || config.dose <= 0) {
      return { input: null, result: null, safety: null };
    }

    if (config.regime !== 'bolus' && config.totalVolume <= 0) {
      return { input: null, result: null, safety: null };
    }

    let presentation: DrugPresentation | undefined;

    if (config.presentationId === CUSTOM_PRESENTATION_ID) {
      if (config.customPresentationConcentration <= 0) {
        return { input: null, result: null, safety: null };
      }

      presentation = buildCustomPresentation(
        selectedDrug,
        config.customPresentationConcentration,
        config.customPresentationUnit,
      );
    } else {
      presentation = selectedDrug.presentations.find((item) => item.id === config.presentationId);
    }

    if (!presentation) {
      return { input: null, result: null, safety: null };
    }

    const input: CalculationInput = {
      patient,
      drug: selectedDrug,
      dose: config.dose,
      doseUnit: config.doseUnit,
      presentation,
      diluent: config.diluent,
      totalVolume: config.totalVolume,
      infusionRate: config.infusionRate,
      regime: config.regime,
      accessType: config.accessType,
      pumpType: config.pumpType,
      usePreDilution: config.usePreDilution,
    };

    const result = calculateCRI(input);
    const safety = evaluateSafety(input, result);

    return { input, result, safety };
  }, [patient, selectedDrug, config]);

  return {
    patient,
    setPatient,
    selectedDrug,
    handleDrugSelect,
    config,
    handleConfigChange,
    loadFavorite,
    input: calculationData.input,
    result: calculationData.result,
    safety: calculationData.safety,
  };
};
