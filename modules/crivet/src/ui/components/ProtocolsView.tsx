import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  Beaker,
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Weight,
  Activity,
  Info,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Patient } from '../../shared/types/patient';
import { Drug, DrugPresentation } from '../../shared/types/drug';
import { getDrugById } from '../../catalog/drugs';
import { DrugReferenceCard } from './DrugReferenceCard';
import { InfoModal } from './InfoModal';
import { TipButton } from './TipButton';
import { PageHeader } from './PageHeader';
import { convertConcentrationToMcgPerMl, convertDoseToMcgPerHour } from '../../calculation-engine/unitConversions';
import { buildCustomPresentation, CUSTOM_PRESENTATION_ID, getPresentationOptions, parseDoseRange } from '../lib/drugContent';
import { CLINICAL_PROTOCOLS, type ProtocolCategory, type ClinicalProtocol } from '../../data/clinicalProtocols';

interface ProtocolRowState {
  presentationId: string;
  customConcentration: number;
  customUnit: DrugPresentation['concentrationUnit'];
}

interface ProtocolMixConfig {
  totalVolume: number;
  infusionRate: number;
}

interface ProtocolsViewProps {
  patient: Patient;
  onPatientChange: (patient: Patient) => void;
  onLoadDrug?: (drugId: string) => void;
}

const categories: (ProtocolCategory | 'All')[] = ['All', 'CRI', 'Bolus', 'Sedacao/Pre-medicacao', 'Emergência'];

const getCategoryLabel = (cat: ProtocolCategory | 'All'): string => {
  switch (cat) {
    case 'All': return 'Todos';
    case 'CRI': return 'CRI';
    case 'Bolus': return 'Bolus';
    case 'Sedacao/Pre-medicacao': return 'Sedação';
    case 'Emergência': return 'Emergência';
    default: return cat;
  }
};

const drugCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'anestesicos_analgesicos', label: 'Anestésicos/Analgésicos' },
  { id: 'sedativos_tranquilizantes', label: 'Sedativos/Tranquilizantes' },
  { id: 'opioides', label: 'Opioides' },
  { id: 'vasopressores_inotropicos', label: 'Vasopressores/Inotrópicos' },
  { id: 'antiarritmicos', label: 'Antiarrítmicos' },
  { id: 'anticonvulsivantes', label: 'Anticonvulsivantes' },
  { id: 'diureticos', label: 'Diuréticos' },
  { id: 'metabolicos_insulina', label: 'Metabólicos/Insulina' },
  { id: 'outros', label: 'Outros' },
] as const;

export const ProtocolsView: React.FC<ProtocolsViewProps> = ({ patient, onPatientChange, onLoadDrug }) => {
  const [activeCategory, setActiveCategory] = useState<ProtocolCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowState, setRowState] = useState<Record<string, ProtocolRowState>>({});
  const [protocolMixConfigs, setProtocolMixConfigs] = useState<Record<string, ProtocolMixConfig>>({});
  const [referenceDrug, setReferenceDrug] = useState<Drug | null>(null);

  const filteredProtocols = useMemo(
    () => CLINICAL_PROTOCOLS.filter((protocol) => {
      const matchesCategory = activeCategory === 'All' || protocol.category === activeCategory;
      const matchesSearch = protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           protocol.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           protocol.drugs.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }),
    [activeCategory, searchQuery],
  );

  const getRowKey = (protocolId: string, drugName: string) => `${protocolId}:${drugName}`;

  const getDefaultRowState = (catalogDrug?: Drug): ProtocolRowState => {
    const base = catalogDrug?.presentations[0];
    return {
      presentationId: base?.id || CUSTOM_PRESENTATION_ID,
      customConcentration: base?.concentration || 0,
      customUnit: base?.concentrationUnit || 'mg/mL',
    };
  };

  const updateRowState = (rowKey: string, catalogDrug: Drug | undefined, patch: Partial<ProtocolRowState>) => {
    setRowState((current) => {
      const base = current[rowKey] || getDefaultRowState(catalogDrug);
      return { ...current, [rowKey]: { ...base, ...patch } };
    });
  };

  const getMixConfig = (protocolId: string): ProtocolMixConfig => {
    return protocolMixConfigs[protocolId] || { totalVolume: 100, infusionRate: 10 };
  };

  const updateMixConfig = (protocolId: string, patch: Partial<ProtocolMixConfig>) => {
    setProtocolMixConfigs(prev => ({
      ...prev,
      [protocolId]: { ...getMixConfig(protocolId), ...patch }
    }));
  };

  const buildPreview = (protocol: ClinicalProtocol, line: ClinicalProtocol['drugs'][number]) => {
    const catalogDrug = line.drugId ? getDrugById(line.drugId) : undefined;
    if (!catalogDrug || patient.weight <= 0) {
      return null;
    }

    const rowKey = getRowKey(protocol.id, line.name);
    const current = rowState[rowKey] || getDefaultRowState(catalogDrug);
    const selectedPresentation =
      current.presentationId === CUSTOM_PRESENTATION_ID
        ? current.customConcentration > 0
          ? buildCustomPresentation(catalogDrug, current.customConcentration, current.customUnit)
          : undefined
        : catalogDrug.presentations.find((presentation) => presentation.id === current.presentationId);

    if (!selectedPresentation) {
      return null;
    }

    const parsed = parseDoseRange(line.previewDose || line.dose, catalogDrug.preferredUnit);
    if (parsed.min <= 0) {
      return null;
    }

    const lowAmount = convertDoseToMcgPerHour(parsed.min, parsed.unit as any, patient.weight, patient.species);
    const highAmount = convertDoseToMcgPerHour(parsed.max, parsed.unit as any, patient.weight, patient.species);
    const stockConcentration = convertConcentrationToMcgPerMl(selectedPresentation.concentration, selectedPresentation.concentrationUnit);
    const lowVolume = lowAmount / stockConcentration;
    const highVolume = highAmount / stockConcentration;
    const continuous = parsed.unit.includes('/h') || parsed.unit.includes('/min');
    const amountBaseUnit = selectedPresentation.concentrationUnit === 'U/mL' ? 'U' : 'mcg';

    return { current, selectedPresentation, parsed, lowAmount, highAmount, lowVolume, highVolume, continuous, amountBaseUnit: amountBaseUnit as 'mcg' | 'U' };
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <PageHeader
          icon={FileText}
          title="Protocolos clínicos"
          description="Misturas e esquemas baseados no acervo (Plumb's 10ª ed., Lumb & Jones 6ª ed.)"
        />

        {/* Paciente + busca */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <label className="mb-2 block text-xs font-medium text-slate-500">Buscar protocolo</label>
            <input
              type="text"
              placeholder="MLK, FLK, DMLK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center gap-2">
              <Weight className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Paciente de referência</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
              <div className="flex gap-2">
                {(['dog', 'cat'] as const).map((species) => (
                  <button
                    key={species}
                    type="button"
                    onClick={() => onPatientChange({ ...patient, species })}
                    className={cn(
                      'flex-1 rounded-lg border px-2 py-2 text-xs font-medium',
                      patient.species === species
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400',
                    )}
                  >
                    {species === 'dog' ? 'Cão' : 'Gato'}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={patient.weight === 0 ? '' : patient.weight}
                onChange={(event) =>
                  onPatientChange({
                    ...patient,
                    weight: event.target.value === '' ? 0 : parseFloat(event.target.value),
                  })
                }
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
                placeholder="kg"
              />
            </div>
          </div>
        </div>

        {/* Filter Categories Menu */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-xl border px-4 py-2.5 text-xs font-bold transition-all shrink-0 min-w-max w-auto cursor-pointer',
                activeCategory === category
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
              )}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Protocols List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProtocols.map((protocol) => {
              const mixConfig = getMixConfig(protocol.id);
              return (
                <motion.section
                  key={protocol.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Protocol Top Header Banner */}
                  <div className="border-b border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40 md:p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{protocol.name}</h3>
                          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-650 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {getCategoryLabel(protocol.category)}
                          </span>
                          {protocol.species.map((species) => (
                            <span key={`${protocol.id}-${species}`} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              {species === 'dog' ? 'Cães' : 'Gatos'}
                            </span>
                          ))}
                        </div>
                        <p className="max-w-5xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-450">
                          {protocol.description}
                        </p>
                      </div>
                      
                      {!protocol.species.includes(patient.species) && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-3.5 py-2.5 text-xs font-semibold text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300 max-w-sm">
                          Espécie do paciente ({patient.species === 'dog' ? 'Cão' : 'Gato'}) destoa da indicação principal.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Compounding Mixture Config Bar */}
                  <div className="border-b border-slate-100 bg-slate-50/20 px-5 py-4 dark:border-slate-800 md:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <Beaker className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-350">
                          Configuração da Mistura Final
                        </h4>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-5">
                        {/* Recipient selectors */}
                        <div className="flex items-center gap-2.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Recipiente</label>
                          <div className="flex flex-wrap gap-1">
                            {[20, 60].map(v => (
                              <button 
                                key={`s-${v}`}
                                type="button"
                                onClick={() => updateMixConfig(protocol.id, { totalVolume: v })}
                                className={cn(
                                  "rounded-lg border px-2 py-1 text-[9px] font-black transition-all cursor-pointer",
                                  mixConfig.totalVolume === v 
                                    ? "border-indigo-500 bg-indigo-500 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-400"
                                )}
                              >
                                Seringa {v}mL
                              </button>
                            ))}
                            {[100, 250, 500].map(v => (
                              <button 
                                key={`b-${v}`}
                                type="button"
                                onClick={() => updateMixConfig(protocol.id, { totalVolume: v })}
                                className={cn(
                                  "rounded-lg border px-2 py-1 text-[9px] font-black transition-all cursor-pointer",
                                  mixConfig.totalVolume === v 
                                    ? "border-indigo-500 bg-indigo-500 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-400"
                                )}
                              >
                                Bolsa {v}mL
                              </button>
                            ))}
                          </div>
                          
                          {/* Manual volume input */}
                          <div className="relative ml-1">
                            <input 
                              type="number" 
                              className="w-16 rounded-lg border border-slate-250 bg-white px-2 py-1 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                              value={mixConfig.totalVolume}
                              onChange={(e) => updateMixConfig(protocol.id, { totalVolume: parseFloat(e.target.value) || 0 })}
                            />
                            <span className="absolute right-1.5 top-1 text-[9px] font-bold text-slate-400">mL</span>
                          </div>
                        </div>

                        {/* Pump Rate */}
                        <div className="flex items-center gap-2.5 border-l border-slate-200 dark:border-slate-800 pl-4">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Taxa na Bomba</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              step="0.1"
                              className="w-18 rounded-lg border border-slate-250 bg-white px-2 py-1 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                              value={mixConfig.infusionRate}
                              onChange={(e) => updateMixConfig(protocol.id, { infusionRate: parseFloat(e.target.value) || 0 })}
                            />
                            <span className="absolute right-1.5 top-1 text-[9px] font-bold text-slate-400">mL/h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid Layout: Left Column (Compounding Recipe Table) | Right Column (Clinical Metadata) */}
                  <div className="grid gap-6 p-5 md:p-6 xl:grid-cols-[1fr_320px] items-start">
                    
                    {/* Left Column: Compounder Recipe */}
                    <div className="space-y-4">
                      {patient.weight > 0 ? (
                        <>
                          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider text-[10px]">
                                  <th className="py-2.5 px-3">Fármaco</th>
                                  <th className="py-2.5 px-3">Dose Indicada</th>
                                  <th className="py-2.5 px-3">Apresentação no Estoque</th>
                                  <th className="py-2.5 px-3 text-right">Volume a Aspirar</th>
                                  <th className="py-2.5 px-3 text-center">Ações</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                {protocol.drugs.map((line) => {
                                  const catalogDrug = line.drugId ? getDrugById(line.drugId) : undefined;
                                  const rowKey = getRowKey(protocol.id, line.name);
                                  const currentRow = rowState[rowKey] || getDefaultRowState(catalogDrug);
                                  const presentationOptions = catalogDrug ? getPresentationOptions(catalogDrug) : [];
                                  const preview = buildPreview(protocol, line);

                                  let volumeToInject = 0;
                                  if (preview) {
                                    volumeToInject = preview.continuous
                                      ? preview.lowVolume * (mixConfig.totalVolume / (mixConfig.infusionRate || 1))
                                      : preview.lowVolume;
                                  }

                                  return (
                                    <tr key={`${protocol.id}-${line.name}`} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/20">
                                      {/* Drug Name */}
                                      <td className="py-3 px-3 font-bold text-slate-850 dark:text-white">
                                        <div className="flex items-center gap-1.5">
                                          <span>{line.name}</span>
                                          {catalogDrug && (
                                            <TipButton
                                              variant="book"
                                              compact
                                              label="Info"
                                              onClick={() => setReferenceDrug(catalogDrug)}
                                            />
                                          )}
                                        </div>
                                        {line.notes && (
                                          <div className="text-[10px] font-medium text-slate-450 dark:text-slate-500 mt-0.5 leading-tight max-w-[200px]">
                                            {line.notes}
                                          </div>
                                        )}
                                      </td>

                                      {/* Dose */}
                                      <td className="py-3 px-3">
                                        <span className="inline-flex rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 px-2 py-1 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-100/10">
                                          {line.dose}
                                        </span>
                                      </td>

                                      {/* Presentation */}
                                      <td className="py-3 px-3">
                                        {catalogDrug ? (
                                          <div className="flex flex-col gap-1 max-w-[170px]">
                                            <select
                                              value={currentRow.presentationId}
                                              onChange={(event) => updateRowState(rowKey, catalogDrug, { presentationId: event.target.value })}
                                              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:outline-none cursor-pointer"
                                            >
                                              {presentationOptions.map((pres) => (
                                                <option key={pres.id} value={pres.id}>
                                                  {pres.description}
                                                </option>
                                              ))}
                                            </select>

                                            {currentRow.presentationId === CUSTOM_PRESENTATION_ID && (
                                              <div className="flex gap-1 mt-1">
                                                <input
                                                  type="number"
                                                  min="0"
                                                  step="0.01"
                                                  value={currentRow.customConcentration === 0 ? '' : currentRow.customConcentration}
                                                  onChange={(event) => updateRowState(rowKey, catalogDrug, { customConcentration: event.target.value === '' ? 0 : parseFloat(event.target.value) })}
                                                  className="w-16 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-1.5 py-0.5 text-xs font-bold text-slate-800 dark:text-white"
                                                  placeholder="Teor"
                                                />
                                                <select
                                                  value={currentRow.customUnit}
                                                  onChange={(event) => updateRowState(rowKey, catalogDrug, { customUnit: event.target.value as any })}
                                                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-1 py-0.5 text-xs font-bold text-slate-850 dark:text-white cursor-pointer"
                                                >
                                                  {['mg/mL', 'mcg/mL', 'U/mL'].map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                                </select>
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Catálogo Indisp.</span>
                                        )}
                                      </td>

                                      {/* Calculated Volume */}
                                      <td className="py-3 px-3 text-right font-black text-indigo-650 dark:text-indigo-400 text-sm">
                                        {preview ? (
                                          <span>{volumeToInject.toFixed(2)} mL</span>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">Sem dados</span>
                                        )}
                                      </td>

                                      {/* Direct link button */}
                                      <td className="py-3 px-3 text-center">
                                        {catalogDrug ? (
                                          <button
                                            type="button"
                                            onClick={() => onLoadDrug?.(catalogDrug.id)}
                                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-450 px-2 py-1 text-[10px] font-black transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-500/20 cursor-pointer"
                                          >
                                            Calculadora
                                          </button>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">N/A</span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* Unified Mix Compounding Recipe Summary Callout */}
                          {(() => {
                            let totalDrugsVolume = 0;
                            const drugVolumes = protocol.drugs.map(line => {
                              const preview = buildPreview(protocol, line);
                              if (!preview) return null;
                              
                              const volumeToAdd = preview.continuous 
                                ? preview.lowVolume * (mixConfig.totalVolume / (mixConfig.infusionRate || 1))
                                : preview.lowVolume;
                                
                              totalDrugsVolume += volumeToAdd;
                              return { name: line.name, volume: volumeToAdd };
                            }).filter(Boolean);

                            const diluentVolume = Math.max(0, mixConfig.totalVolume - totalDrugsVolume);

                            return (
                              <div className="rounded-2xl border border-indigo-150 bg-indigo-50/50 p-4 dark:border-indigo-550/20 dark:bg-indigo-950/15">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                      <ShieldCheck className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                                      <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">
                                        Receita de Preparo Simplificada
                                      </h4>
                                    </div>
                                    <p className="text-sm font-semibold text-indigo-950/90 dark:text-indigo-200/90 leading-relaxed">
                                      Para preparar <strong>{mixConfig.totalVolume} mL</strong> da mistura, aspire:{" "}
                                      {drugVolumes.map((dv: any, idx) => (
                                        <span key={idx}>
                                          <strong className="text-indigo-750 dark:text-indigo-300">{dv.volume.toFixed(2)} mL</strong> de {dv.name}
                                          {idx < drugVolumes.length - 1 ? ", " : ""}
                                        </span>
                                      ))}
                                      {" e adicione a "}
                                      <strong className="text-indigo-750 dark:text-indigo-300">{diluentVolume.toFixed(2)} mL</strong> de Diluente para completar o recipiente.
                                    </p>
                                    <div className="flex items-start gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 pt-1">
                                      <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" />
                                      <p>Volumes calculados com base na dose MÍNIMA indicada para fins de segurança inicial.</p>
                                    </div>
                                  </div>

                                  <div className="shrink-0 flex flex-col items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-3 shadow-md shadow-indigo-600/20 text-center min-w-[140px]">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-200">Volume Total</span>
                                    <span className="text-2xl font-black">{mixConfig.totalVolume} mL</span>
                                    <span className="text-[9px] font-semibold text-indigo-150 mt-1">
                                      Duração: {(mixConfig.totalVolume / (mixConfig.infusionRate || 1)).toFixed(1)}h
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-400">
                          <Weight className="mx-auto mb-2 h-10 w-10 text-slate-350 dark:text-slate-600" />
                          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Aguardando Peso</h4>
                          <p className="mt-1 text-xs max-w-sm mx-auto">
                            Defina o peso do paciente no formulário de referência no topo para gerar as doses e volumes automáticos.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Metadata Cards (Indications, Warnings, Clinical Notes) */}
                    <aside className="space-y-4">
                      {/* Indications */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4.5 dark:border-slate-800 dark:bg-slate-950/25">
                        <div className="mb-2.5 flex items-center gap-2">
                          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-450">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-350">Indicações</h4>
                        </div>
                        <div className="space-y-1.5">
                          {protocol.indications.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-xs font-semibold text-slate-655 dark:text-slate-400">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warnings / Cuidados */}
                      {protocol.warnings && protocol.warnings.length > 0 && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4.5 dark:border-rose-500/25 dark:bg-rose-950/15">
                          <div className="mb-2.5 flex items-center gap-2">
                            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                              <AlertTriangle className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-400">Cuidados Importantes</h4>
                          </div>
                          <div className="space-y-1.5">
                            {protocol.warnings.map((item) => (
                              <div key={item} className="flex items-start gap-2 text-xs font-semibold text-rose-900 dark:text-rose-350">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-550" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clinical Notes */}
                      {protocol.clinicalNotes && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 dark:border-slate-800 dark:bg-slate-900">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-550/10 dark:text-indigo-400">
                              <Info className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-350">Nota Clínica</h4>
                          </div>
                          <p className="text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-400">
                            {protocol.clinicalNotes}
                          </p>
                        </div>
                      )}

                      {protocol.sources.length > 0 && (
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                            <BookOpen className="h-3.5 w-3.5" /> Fontes (acervo)
                          </h4>
                          <ul className="space-y-1">
                            {protocol.sources.map((source) => (
                              <li key={source} className="text-xs text-emerald-900/80 dark:text-emerald-100/80">
                                {source}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </aside>

                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Reference Modal */}
      <InfoModal
        open={Boolean(referenceDrug)}
        onClose={() => setReferenceDrug(null)}
        title={referenceDrug ? `Banco de Fármacos • ${referenceDrug.namePt}` : 'Banco de Fármacos'}
        subtitle="Referência rápida do fármaco selecionado"
        icon={<BookOpen className="h-5 w-5" />}
      >
        {referenceDrug && <DrugReferenceCard drug={referenceDrug} categories={drugCategories as any} condensed />}
      </InfoModal>
    </>
  );
};
