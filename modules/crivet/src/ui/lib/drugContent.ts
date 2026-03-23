import {
  AccessType,
  Diluent,
  DoseUnit,
  Drug,
  DrugClinicalTip,
  DrugDoseGuide,
  DrugPresentation,
  RegimeType,
} from '../../shared/types/drug';
import { Species } from '../../shared/types/patient';

export interface TipSection {
  title: string;
  description?: string;
  items?: string[];
}

export type SupportedRegime = Exclude<RegimeType, 'bolus_maintenance'>;

export const CUSTOM_PRESENTATION_ID = '__custom__';

export const getSupportedRegimes = (drug: Drug): SupportedRegime[] =>
  drug.allowedRegimes.filter((regime): regime is SupportedRegime => regime !== 'bolus_maintenance');

export const formatRegimeLabel = (regime: SupportedRegime) => {
  switch (regime) {
    case 'CRI':
      return 'CRI';
    case 'bolus':
      return 'Bolus';
    case 'titratable':
      return 'Titulável';
    default:
      return regime;
  }
};

export const formatAccessLabel = (access: AccessType) =>
  access === 'central' ? 'Acesso central' : 'Acesso periférico';

export const getDoseGuides = (drug: Drug): DrugDoseGuide[] => {
  if (drug.doseGuides && drug.doseGuides.length > 0) {
    return drug.doseGuides;
  }

  const guides: DrugDoseGuide[] = [];

  if (drug.doses.dog || drug.doses.cat) {
    const dogRange = drug.doses.dog;
    const catRange = drug.doses.cat;
    const guideText = [
      dogRange ? `Cães: ${dogRange.min}-${dogRange.max} ${dogRange.unit}` : null,
      catRange ? `Gatos: ${catRange.min}-${catRange.max} ${catRange.unit}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    guides.push({
      id: `${drug.id}-cri-default`,
      regimen: drug.allowedRegimes.includes('titratable') && !drug.allowedRegimes.includes('CRI') ? 'titratable' : 'CRI',
      title: 'Faixa de dose principal',
      doseText: guideText,
      rationale: dogRange?.observations || catRange?.observations,
    });
  }

  if (drug.bolusDoses?.dog || drug.bolusDoses?.cat) {
    const dogRange = drug.bolusDoses.dog;
    const catRange = drug.bolusDoses.cat;
    const guideText = [
      dogRange ? `Cães: ${dogRange.min}-${dogRange.max} ${dogRange.unit}` : null,
      catRange ? `Gatos: ${catRange.min}-${catRange.max} ${catRange.unit}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    guides.push({
      id: `${drug.id}-bolus-default`,
      regimen: 'bolus',
      title: 'Faixa de bolus',
      doseText: guideText,
      rationale: dogRange?.observations || catRange?.observations,
    });
  }

  return guides;
};

export const getCurrentDoseHint = (drug: Drug, species: Species, regime: SupportedRegime) => {
  const guides = getDoseGuides(drug).filter(
    (guide) =>
      guide.regimen === regime &&
      (!guide.species || guide.species.length === 0 || guide.species.includes(species)),
  );

  if (guides.length > 0) {
    return guides[0];
  }

  const range =
    regime === 'bolus'
      ? drug.bolusDoses?.[species]
      : drug.doses[species];

  if (!range) {
    return null;
  }

  return {
    id: `${drug.id}-${regime}-${species}`,
    regimen: regime,
    title: `Dose usual para ${species === 'dog' ? 'cães' : 'gatos'}`,
    doseText: `${range.min}-${range.max} ${range.unit}`,
    rationale: range.observations,
  } satisfies DrugDoseGuide;
};

const tipToSection = (tip: DrugClinicalTip): TipSection => ({
  title: tip.title,
  description: tip.recommendation,
  items: tip.rationale ? [tip.rationale] : undefined,
});

export const getDiluentSections = (drug: Drug): TipSection[] => {
  if (drug.diluentGuidance && drug.diluentGuidance.length > 0) {
    return drug.diluentGuidance.map(tipToSection);
  }

  return [
    {
      title: 'Diluente preferencial',
      description: drug.safetyMetadata.preferredDiluent,
      items: [
        `Permitidos: ${drug.safetyMetadata.allowedDiluents.join(', ') || 'Nenhum informado'}`,
        drug.safetyMetadata.notRecommendedDiluents.length > 0
          ? `Evitar: ${drug.safetyMetadata.notRecommendedDiluents.join(', ')}`
          : 'Sem diluentes a evitar cadastrados.',
        `Estabilidade: ${drug.safetyMetadata.stabilityAfterDilution}`,
      ],
    },
    {
      title: 'Compatibilidade e preparo',
      items:
        drug.safetyMetadata.incompatibilities.length > 0
          ? drug.safetyMetadata.incompatibilities.map((item) => `Incompatibilidade: ${item}`)
          : ['Sem incompatibilidades cadastradas.'],
    },
  ];
};

export const getAccessSections = (drug: Drug): TipSection[] => {
  if (drug.accessGuidance && drug.accessGuidance.length > 0) {
    return drug.accessGuidance.map(tipToSection);
  }

  const accessSummary = drug.safetyMetadata.centralAccessRequired
    ? 'Acesso central é obrigatório.'
    : drug.safetyMetadata.centralAccessPreferred
      ? 'Acesso central é preferível, mas o periférico pode ser usado com vigilância.'
      : 'Acesso periférico é aceitável para o uso padrão.';

  const items = [
    drug.safetyMetadata.dedicatedLineRequired
      ? 'Recomenda-se linha exclusiva para reduzir risco de incompatibilidade.'
      : 'Não há exigência de linha exclusiva cadastrada.',
    drug.safetyMetadata.peripheralAllowed
      ? 'O acesso periférico é permitido se houver monitorização do sítio de infusão.'
      : 'O acesso periférico não é recomendado neste cadastro.',
  ];

  return [
    {
      title: 'Recomendação de via de acesso',
      description: accessSummary,
      items,
    },
  ];
};

export const getInfusionSections = (drug: Drug, regime: SupportedRegime): TipSection[] => {
  if (drug.infusionGuidance && drug.infusionGuidance.length > 0) {
    return drug.infusionGuidance.map(tipToSection);
  }

  const monitoring = drug.safetyMetadata.recommendedMonitoring;
  const currentGuide = getCurrentDoseHint(drug, 'dog', regime);

  return [
    {
      title: 'Faixa cadastrada',
      description: currentGuide?.doseText || 'Sem faixa detalhada cadastrada.',
      items: currentGuide?.rationale ? [currentGuide.rationale] : undefined,
    },
    {
      title: 'Monitorização sugerida',
      items: monitoring.length > 0 ? monitoring : ['Sem monitorização específica cadastrada.'],
    },
    {
      title: 'Observação operacional',
      description: drug.safetyMetadata.syringePumpRequired
        ? 'Prefira bomba de seringa para maior precisão.'
        : 'A taxa pode ser administrada em bomba volumétrica conforme o preparo escolhido.',
    },
  ];
};

export const getPresentationOptions = (drug: Drug): DrugPresentation[] => [
  ...drug.presentations,
  {
    id: CUSTOM_PRESENTATION_ID,
    description: 'Apresentação personalizada',
    concentration: 0,
    concentrationUnit: 'mg/mL',
    custom: true,
  },
];

export const buildCustomPresentation = (
  drug: Drug,
  concentration: number,
  concentrationUnit: DrugPresentation['concentrationUnit'],
): DrugPresentation => ({
  id: `${drug.id}-custom-presentation`,
  description: `Apresentação personalizada (${concentration} ${concentrationUnit})`,
  concentration,
  concentrationUnit,
  custom: true,
});

export const getDiluentOptions = (drug: Drug): Diluent[] => {
  const values = new Set<Diluent>([
    drug.safetyMetadata.preferredDiluent,
    ...drug.safetyMetadata.allowedDiluents,
    ...drug.safetyMetadata.notRecommendedDiluents,
  ]);

  return Array.from(values);
};

export const parseDoseText = (
  doseText: string,
  fallbackUnit: DoseUnit,
): { value: number; unit: DoseUnit } => {
  const valueMatch = doseText.match(/(\d+(?:[.,]\d+)?)/);
  const unitMatch = doseText.match(
    /(mcg\/kg\/min|mcg\/kg\/h|mg\/kg\/min|mg\/kg\/h|ng\/kg\/min|U\/kg\/h|U\/kg\/min|mg\/kg|mcg\/kg)/i,
  );

  return {
    value: valueMatch ? Number(valueMatch[1].replace(',', '.')) : 0,
    unit: (unitMatch?.[1] as DoseUnit | undefined) || fallbackUnit,
  };
};

export const parseDoseRange = (
  doseText: string,
  fallbackUnit: DoseUnit,
): { min: number; max: number; unit: DoseUnit } => {
  const numericValues = Array.from(doseText.matchAll(/(\d+(?:[.,]\d+)?)/g)).map((match) =>
    Number(match[1].replace(',', '.')),
  );
  const unitMatch = doseText.match(
    /(mcg\/kg\/min|mcg\/kg\/h|mg\/kg\/min|mg\/kg\/h|ng\/kg\/min|U\/kg\/h|U\/kg\/min|mg\/kg|mcg\/kg)/i,
  );

  const min = numericValues[0] || 0;
  const max = numericValues[1] || min;

  return {
    min,
    max,
    unit: (unitMatch?.[1] as DoseUnit | undefined) || fallbackUnit,
  };
};
