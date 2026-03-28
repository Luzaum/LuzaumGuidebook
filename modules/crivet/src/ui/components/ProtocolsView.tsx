
import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  Beaker,
  BookOpen,
  CheckCircle2,
  FileText,
  Info,
  ShieldCheck,
  Weight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Patient } from '../../shared/types/patient';
import { Drug, DrugPresentation } from '../../shared/types/drug';
import { getDrugById } from '../../catalog/drugs';
import { DrugReferenceCard } from './DrugReferenceCard';
import { InfoModal } from './InfoModal';
import { TipButton } from './TipButton';
import { convertConcentrationToMcgPerMl, convertDoseToMcgPerHour } from '../../calculation-engine/unitConversions';
import { buildCustomPresentation, CUSTOM_PRESENTATION_ID, getPresentationOptions, parseDoseRange } from '../lib/drugContent';

type ProtocolCategory = 'CRI' | 'Bolus' | 'Sedacao/Pre-medicacao' | 'Emergencia';

interface ProtocolDrugLine {
  name: string;
  dose: string;
  previewDose?: string;
  notes?: string;
  drugId?: string;
}

interface Protocol {
  id: string;
  name: string;
  description: string;
  category: ProtocolCategory;
  drugs: ProtocolDrugLine[];
  species: ('dog' | 'cat')[];
  indications: string[];
  warnings?: string[];
  clinicalNotes?: string;
}

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

const categories: (ProtocolCategory | 'All')[] = ['All', 'CRI', 'Bolus', 'Sedacao/Pre-medicacao', 'Emergencia'];

const drugCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'anestesicos_analgesicos', label: 'Anestesicos/Analgesicos' },
  { id: 'sedativos_tranquilizantes', label: 'Sedativos/Tranquilizantes' },
  { id: 'opioides', label: 'Opioides' },
  { id: 'vasopressores_inotropicos', label: 'Vasopressores/Inotropicos' },
  { id: 'antiarritmicos', label: 'Anti-arritmicos' },
  { id: 'anticonvulsivantes', label: 'Anticonvulsivantes' },
  { id: 'diureticos', label: 'Diureticos' },
  { id: 'metabolicos_insulina', label: 'Metabolicos/Insulina' },
  { id: 'outros', label: 'Outros' },
] as const;

const predefinedProtocols: Protocol[] = [
  {
    id: 'flk',
    name: 'FLK (Fentanil, Lidocaina, Cetamina)',
    description: 'Analgesia multimodal por infusao continua para dor severa.',
    category: 'CRI',
    drugs: [
      { name: 'Fentanil', drugId: 'fentanyl', dose: '2-5 mcg/kg/h', notes: 'Base opioide da analgesia.' },
      { name: 'Lidocaina', drugId: 'lidocaine', dose: '1-2 mg/kg/h', notes: 'Reduz CAM e contribui para analgesia sistemica.' },
      { name: 'Cetamina', drugId: 'ketamine', dose: '0.1-0.6 mg/kg/h', notes: 'Modula hiperalgesia e sensibilizacao central.' },
    ],
    species: ['dog'],
    indications: ['Dor severa', 'Ortopedia complexa', 'Laparotomias', 'Amputacoes'],
    warnings: ['Evitar lidocaina em gatos.', 'Monitorar depressao respiratoria devido ao fentanil.'],
    clinicalNotes: 'A combinacao reduz a necessidade de altas doses isoladas de cada farmaco.',
  },
  {
    id: 'mlk',
    name: 'MLK (Morfina, Lidocaina, Cetamina)',
    description: 'Protocolo classico de analgesia multimodal por infusao continua.',
    category: 'CRI',
    drugs: [
      { name: 'Morfina', drugId: 'morphine', dose: '0.1-0.2 mg/kg/h', notes: 'Opioide mu-agonista de longa duracao.' },
      { name: 'Lidocaina', drugId: 'lidocaine', dose: '1-2 mg/kg/h', notes: 'Poupador de inalatorio e analgesico sistemico.' },
      { name: 'Cetamina', drugId: 'ketamine', dose: '0.1-0.6 mg/kg/h', notes: 'Boa opcao para dor neuropatica.' },
    ],
    species: ['dog'],
    indications: ['Dor trans e pos-operatoria', 'Trauma extenso', 'Pancreatite severa'],
    warnings: ['Morfina pode causar liberacao de histamina em bolus rapido.', 'Pode haver emese na pre-anestesia.'],
    clinicalNotes: 'Excelente custo-beneficio quando se tem bomba de infusao disponivel.',
  },
  {
    id: 'dex-ket-sedation',
    name: 'Dexmedetomidina + Cetamina (IM)',
    description: 'Sedacao profunda e analgesia para procedimentos curtos.',
    category: 'Sedacao/Pre-medicacao',
    drugs: [
      { name: 'Dexmedetomidina', drugId: 'dexmedetomidine', dose: '5-10 mcg/kg', notes: 'Sedacao, analgesia e relaxamento muscular.' },
      { name: 'Cetamina', drugId: 'ketamine', dose: '3-5 mg/kg', notes: 'Dissociativo com suporte cardiovascular relativo.' },
    ],
    species: ['dog', 'cat'],
    indications: ['Contencao para exames', 'Radiografias', 'Pequenos procedimentos'],
    warnings: ['Bradicardia e hipertensao iniciais sao esperadas.', 'Evitar em pacientes instaveis.'],
    clinicalNotes: 'A combinacao fornece sedacao robusta em pacientes bem selecionados.',
  },
  {
    id: 'propofol-induction',
    name: 'Inducao com Propofol',
    description: 'Inducao anestesica rapida, suave e curta.',
    category: 'Bolus',
    drugs: [{ name: 'Propofol', drugId: 'propofol', dose: '2-6 mg/kg', notes: 'Titular lentamente ao efeito.' }],
    species: ['dog', 'cat'],
    indications: ['Inducao para intubacao', 'TIVA em cenarios selecionados'],
    warnings: ['Pode causar apneia e hipotensao dose-dependentes.'],
    clinicalNotes: 'Pre-oxigenacao e titulacao fracionada melhoram a seguranca.',
  },
  {
    id: 'fentanyl-bolus',
    name: 'Resgate Analgesico (Fentanil)',
    description: 'Bolus intravenoso para resgate analgesico intraoperatorio.',
    category: 'Bolus',
    drugs: [{ name: 'Fentanil', drugId: 'fentanyl', dose: '2-5 mcg/kg', notes: 'Inicio em 1-2 minutos e duracao curta.' }],
    species: ['dog', 'cat'],
    indications: ['Picos de dor transoperatoria', 'Taquicardia e hipertensao responsivas a dor'],
    warnings: ['Monitorar bradicardia e depressao respiratoria.'],
    clinicalNotes: 'Bolus util para controle rapido de dor aguda durante cirurgias.',
  },
  {
    id: 'cpr-epinephrine',
    name: 'RCP: Epinefrina (Adrenalina)',
    description: 'Vasopressor de primeira linha na reanimacao cardiopulmonar.',
    category: 'Emergencia',
    drugs: [{ name: 'Epinefrina', drugId: 'epinephrine', dose: '0.01 mg/kg a 0.1 mg/kg', notes: 'Titular conforme o momento da RCP.' }],
    species: ['dog', 'cat'],
    indications: ['Parada cardiorrespiratoria'],
    warnings: ['Doses altas podem piorar a perfusao pos-ressuscitacao.', 'Arritmogeníco.'],
    clinicalNotes: 'O foco e restaurar perfusao central durante as compressoes.',
  },
  {
    id: 'status-epilepticus',
    name: 'Status Epilepticus (Controle de Crise)',
    description: 'Interrupcao de convulsoes ativas e refratarias.',
    category: 'Emergencia',
    drugs: [
      { name: 'Diazepam', drugId: 'diazepam', dose: '0.5-1.0 mg/kg', notes: 'Primeira escolha IV ou retal.' },
      { name: 'Midazolam', drugId: 'midazolam', dose: '0.2-0.5 mg/kg', notes: 'Boa opcao IM ou intranasal sem acesso IV.' },
      { name: 'Propofol', drugId: 'propofol', dose: '2-6 mg/kg (bolus) ou 0.1-0.6 mg/kg/min (CRI)', previewDose: '2-6 mg/kg', notes: 'Se refratario, considerar inducao anestesica e suporte ventilatorio.' },
    ],
    species: ['dog', 'cat'],
    indications: ['Status epilepticus', 'Convulsoes em cluster'],
    warnings: ['Monitorar depressao respiratoria.', 'Diazepam oral e contraindicado em gatos.'],
    clinicalNotes: 'Parar a crise primeiro; depois estabilizar e instituir manutencao.',
  },
];

const formatRange = (low: number, high: number, baseUnit: 'mcg' | 'U', continuous: boolean) => {
  if (baseUnit === 'U') {
    const label = continuous ? 'U/h' : 'U';
    return low === high ? `${low.toFixed(2)} ${label}` : `${low.toFixed(2)} - ${high.toFixed(2)} ${label}`;
  }

  const shouldUseMg = Math.max(low, high) >= 1000;
  const unit = `${shouldUseMg ? 'mg' : 'mcg'}${continuous ? '/h' : ''}`;
  const factor = shouldUseMg ? 1000 : 1;
  const a = low / factor;
  const b = high / factor;
  return a === b ? `${a.toFixed(2)} ${unit}` : `${a.toFixed(2)} - ${b.toFixed(2)} ${unit}`;
};

const formatVolumeRange = (low: number, high: number, continuous: boolean) => {
  const unit = continuous ? 'mL/h' : 'mL';
  return low === high ? `${low.toFixed(2)} ${unit}` : `${low.toFixed(2)} - ${high.toFixed(2)} ${unit}`;
};

export const ProtocolsView: React.FC<ProtocolsViewProps> = ({ patient, onPatientChange, onLoadDrug }) => {
  const [activeCategory, setActiveCategory] = useState<ProtocolCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowState, setRowState] = useState<Record<string, ProtocolRowState>>({});
  const [protocolMixConfigs, setProtocolMixConfigs] = useState<Record<string, ProtocolMixConfig>>({});
  const [referenceDrug, setReferenceDrug] = useState<Drug | null>(null);

  const filteredProtocols = useMemo(
    () => predefinedProtocols.filter((protocol) => {
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

  const buildPreview = (protocol: Protocol, line: ProtocolDrugLine) => {
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
      <div className="space-y-8" style={{ zoom: 0.5 }}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">Protocolos Clinicos</h2>
            <p className="mt-1 font-medium text-slate-500 dark:text-slate-400">Uma linha por protocolo, com previa por peso e concentracao do estoque</p>
          </div>
        </div>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
          <div className="rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:border-blue-500/20 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-900 dark:text-blue-300">Pesquisar Protocolos</h4>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: FLK, MLK, Sedação, Fentanil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-2 border-blue-100 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-blue-900/30 dark:bg-slate-900/40 dark:text-white dark:focus:border-blue-500"
                />
                <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Weight className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Paciente de referencia</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Compartilhado com a calculadora CRI</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Especie</label>
                <div className="flex gap-2">
                  {(['dog', 'cat'] as const).map((species) => (
                    <button
                      key={species}
                      type="button"
                      onClick={() => onPatientChange({ ...patient, species })}
                      className={cn(
                        'flex-1 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-all',
                        patient.species === species
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
                      )}
                    >
                      {species === 'dog' ? 'Cao' : 'Gato'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Peso</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={patient.weight === 0 ? '' : patient.weight}
                    onChange={(event) => onPatientChange({ ...patient, weight: event.target.value === '' ? 0 : parseFloat(event.target.value) })}
                    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-3 pr-10 text-lg font-bold text-slate-800 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                    placeholder="10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-500">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all',
                activeCategory === category
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700',
              )}
            >
              {category === 'All' ? 'Todos os Protocolos' : category}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProtocols.map((protocol) => (
              <motion.section
                key={protocol.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="border-b border-slate-100 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{protocol.name}</h3>
                        <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{protocol.category}</span>
                        {protocol.species.map((species) => (
                          <span key={`${protocol.id}-${species}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{species === 'dog' ? 'Caes' : 'Gatos'}</span>
                        ))}
                      </div>
                      <p className="max-w-5xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{protocol.description}</p>
                    </div>
                    {!protocol.species.includes(patient.species) && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">O protocolo esta visivel, mas a especie atual nao faz parte da indicacao principal.</div>}
                  </div>
                </div>

                <div className="border-b border-slate-100 bg-slate-50/30 p-6 dark:border-slate-800">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <Beaker className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Configuração da Mistura</h4>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Recipiente Final</label>
                        <div className="flex flex-wrap gap-1.5">
                          {[5, 10, 20, 60].map(v => (
                            <button 
                              key={`s-${v}`}
                              onClick={() => updateMixConfig(protocol.id, { totalVolume: v })}
                              className={cn(
                                "rounded-lg border px-2 py-1 text-[10px] font-black transition-all",
                                getMixConfig(protocol.id).totalVolume === v 
                                  ? "border-indigo-500 bg-indigo-500 text-white"
                                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
                              )}
                            >
                              Seringa {v}mL
                            </button>
                          ))}
                          {[100, 250, 500, 1000].map(v => (
                            <button 
                              key={`b-${v}`}
                              onClick={() => updateMixConfig(protocol.id, { totalVolume: v })}
                              className={cn(
                                "rounded-lg border px-2 py-1 text-[10px] font-black transition-all",
                                getMixConfig(protocol.id).totalVolume === v 
                                  ? "border-indigo-500 bg-indigo-500 text-white"
                                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
                              )}
                            >
                              Bolsa {v}mL
                            </button>
                          ))}
                        </div>
                        <div className="relative ml-2">
                          <input 
                            type="number" 
                            className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            value={getMixConfig(protocol.id).totalVolume}
                            onChange={(e) => updateMixConfig(protocol.id, { totalVolume: parseFloat(e.target.value) || 0 })}
                          />
                          <span className="absolute right-2 top-1.5 text-[10px] font-bold text-slate-400">mL</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 border-l border-slate-100 pl-4 dark:border-slate-800">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Taxa na Bomba</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            value={getMixConfig(protocol.id).infusionRate}
                            onChange={(e) => updateMixConfig(protocol.id, { infusionRate: parseFloat(e.target.value) || 0 })}
                          />
                          <span className="absolute right-2 top-1.5 text-[10px] font-bold text-slate-400">mL/h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
                  <div className="space-y-4">
                    {protocol.drugs.map((line) => {
                      const catalogDrug = line.drugId ? getDrugById(line.drugId) : undefined;
                      const rowKey = getRowKey(protocol.id, line.name);
                      const currentRow = rowState[rowKey] || getDefaultRowState(catalogDrug);
                      const presentationOptions = catalogDrug ? getPresentationOptions(catalogDrug) : [];
                      const preview = buildPreview(protocol, line);

                      return (
                        <div key={`${protocol.id}-${line.name}`} className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/35">
                          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                            <div className="space-y-4">
                              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{line.name}</h4>
                                    {catalogDrug && <TipButton variant="book" compact label="Tip" onClick={() => setReferenceDrug(catalogDrug)} />}
                                  </div>
                                  <div className="mt-2 inline-flex rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">{line.dose}</div>
                                </div>
                                {catalogDrug && <button type="button" onClick={() => onLoadDrug?.(catalogDrug.id)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-400">Usar na calculadora <ArrowRight className="h-4 w-4" /></button>}
                              </div>

                              {line.notes && <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" /><p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{line.notes}</p></div>}
                              {catalogDrug ? (
                                <>
                                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Apresentacao</label>
                                      <select
                                        value={currentRow.presentationId}
                                        onChange={(event) => updateRowState(rowKey, catalogDrug, { presentationId: event.target.value })}
                                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                                      >
                                        {presentationOptions.map((presentation) => <option key={presentation.id} value={presentation.id}>{presentation.description}</option>)}
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Estoque atual</label>
                                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{preview ? `${preview.selectedPresentation.concentration} ${preview.selectedPresentation.concentrationUnit}` : 'Selecione uma concentracao'}</div>
                                    </div>
                                  </div>

                                  {currentRow.presentationId === CUSTOM_PRESENTATION_ID && (
                                    <div className="grid gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:grid-cols-[1fr_140px] dark:border-indigo-500/20 dark:bg-indigo-500/10">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={currentRow.customConcentration === 0 ? '' : currentRow.customConcentration}
                                        onChange={(event) => updateRowState(rowKey, catalogDrug, { customConcentration: event.target.value === '' ? 0 : parseFloat(event.target.value) })}
                                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-base font-bold text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                                        placeholder="Concentracao"
                                      />
                                      <select
                                        value={currentRow.customUnit}
                                        onChange={(event) => updateRowState(rowKey, catalogDrug, { customUnit: event.target.value as DrugPresentation['concentrationUnit'] })}
                                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                                      >
                                        {['mg/mL', 'mcg/mL', 'U/mL'].map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                      </select>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">Este item nao esta vinculado ao catalogo interno, entao a previa automatica nao esta disponivel.</div>
                              )}
                            </div>

                            <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                              <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Beaker className="h-4 w-4" /></div>
                                <div>
                                  <h5 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Previa para {patient.weight > 0 ? `${patient.weight} kg` : 'peso nao definido'}</h5>
                                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Baseada na dose indicada e na concentracao escolhida</p>
                                </div>
                              </div>

                              {preview ? (
                                <div className="grid gap-3">
                                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">Volume a Adicionar na Mistura</p>
                                    <p className="mt-2 text-2xl font-black tracking-tight text-indigo-900 dark:text-indigo-100">
                                      {(preview.lowVolume * (getMixConfig(protocol.id).totalVolume / (getMixConfig(protocol.id).infusionRate || 1))).toFixed(2)} mL
                                    </p>
                                    <p className="mt-1 text-[10px] font-medium text-indigo-600/70 dark:text-indigo-400/60 uppercase tracking-wider">
                                      Total para {getMixConfig(protocol.id).totalVolume} mL de solução
                                    </p>
                                  </div>
                                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Leitura rapida</p>
                                    <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">{preview.parsed.min === preview.parsed.max ? `${line.name}: ${preview.parsed.min} ${preview.parsed.unit} para ${patient.weight} kg.` : `${line.name}: faixa ${preview.parsed.min}-${preview.parsed.max} ${preview.parsed.unit} para ${patient.weight} kg.`}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">Defina peso e apresentacao valida para gerar a previa clinica desta linha.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {protocol.drugs.length > 1 && (
                      <div className="mt-4 rounded-3xl border-2 border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-500/20 dark:bg-indigo-500/5">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                            <ShieldCheck className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold tracking-tight text-indigo-900 dark:text-indigo-300">Resumo de Preparo da Mistura</h4>
                            <p className="text-xs font-medium text-indigo-700/70 dark:text-indigo-300/60">Instruções para montagem da bolsa/seringa única</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3">
                            {(() => {
                              const config = getMixConfig(protocol.id);
                              const bagDuration = config.totalVolume / (config.infusionRate || 1);
                              let totalDrugsVolume = 0;
                              
                              const drugVolumes = protocol.drugs.map(line => {
                                const preview = buildPreview(protocol, line);
                                if (!preview) return null;
                                
                                // Se for contínuo, calcula baseado no volume total / taxa
                                // Se for bolus/único, usa o volume direto calculado pelo preview
                                const volumeToAdd = preview.continuous 
                                  ? preview.lowVolume * (config.totalVolume / (config.infusionRate || 1))
                                  : preview.lowVolume;
                                  
                                totalDrugsVolume += volumeToAdd;
                                return { name: line.name, volume: volumeToAdd, unit: 'mL', continuous: preview.continuous };
                              }).filter(Boolean);

                              const diluentVolume = Math.max(0, config.totalVolume - totalDrugsVolume);

                              return (
                                <>
                                  <div className="space-y-2">
                                    {drugVolumes.map((dv: any, idx: number) => (
                                      <div key={idx} className="flex items-center justify-between rounded-xl bg-white/60 p-3 shadow-sm dark:bg-slate-900/60">
                                        <div className="flex flex-col">
                                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{dv.name}</span>
                                          {!dv.continuous && <span className="text-[10px] text-amber-600 font-bold uppercase">Dose fixa (Bolus)</span>}
                                        </div>
                                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{dv.volume.toFixed(2)} mL</span>
                                      </div>
                                    ))}
                                    <div className="flex items-center justify-between rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Diluente p/ completar</span>
                                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{diluentVolume.toFixed(2)} mL</span>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>

                          <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-500/20">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">Volume Final</p>
                            <p className="mt-1 text-3xl font-black">{getMixConfig(protocol.id).totalVolume.toFixed(0)} mL</p>
                            
                            <div className="mt-4 space-y-2 border-t border-indigo-500/50 pt-4">
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-indigo-200">Taxa de Infusão:</span>
                                <span>{getMixConfig(protocol.id).infusionRate} mL/h</span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-indigo-200">Duração Prevista:</span>
                                <span>{(getMixConfig(protocol.id).totalVolume / (getMixConfig(protocol.id).infusionRate || 1)).toFixed(1)}h</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <p>Cálculo baseado na dose MÍNIMA da faixa. Caso deseje doses maiores, use a calculadora individual para cada fármaco ou ajuste a taxa da bomba proporcionalmente.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <aside className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/35"><div className="mb-3 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div><h4 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-700 dark:text-slate-300">Indicacoes</h4></div><div className="space-y-2">{protocol.indications.map((item) => <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" /><span>{item}</span></div>)}</div></div>
                    {protocol.warnings && protocol.warnings.length > 0 && <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-500/20 dark:bg-rose-500/10"><div className="mb-3 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-rose-600 dark:bg-slate-900 dark:text-rose-300"><AlertTriangle className="h-4 w-4" /></div><h4 className="text-sm font-bold uppercase tracking-[0.22em] text-rose-800 dark:text-rose-300">Cuidados</h4></div><div className="space-y-2">{protocol.warnings.map((item) => <div key={item} className="flex items-start gap-2 text-sm font-medium text-rose-800/90 dark:text-rose-200/90"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" /><span>{item}</span></div>)}</div></div>}
                    {protocol.clinicalNotes && <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="mb-3 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><Info className="h-4 w-4" /></div><h4 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-700 dark:text-slate-300">Nota clinica</h4></div><p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{protocol.clinicalNotes}</p></div>}
                  </aside>
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <InfoModal
        open={Boolean(referenceDrug)}
        onClose={() => setReferenceDrug(null)}
        title={referenceDrug ? `Banco de Farmacos • ${referenceDrug.namePt}` : 'Banco de Farmacos'}
        subtitle="Referencia rapida do farmaco selecionado"
        icon={<BookOpen className="h-5 w-5" />}
      >
        {referenceDrug && <DrugReferenceCard drug={referenceDrug} categories={drugCategories as any} condensed />}
      </InfoModal>
    </>
  );
};
