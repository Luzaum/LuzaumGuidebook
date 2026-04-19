import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  Apple,
  Ban,
  BarChart3,
  BriefcaseMedical,
  Cat,
  ClipboardCheck,
  Clock,
  Cross,
  Dog,
  Droplets,
  FlaskConical,
  GitCompare,
  HeartPulse,
  LayoutGrid,
  Lightbulb,
  Link2,
  ListOrdered,
  Microscope,
  Package,
  Pill,
  Scale,
  Shield,
  Soup,
  Stethoscope,
  Sun,
  Syringe,
  Table2,
  Target,
  TestTube2,
  Zap,
} from 'lucide-react';

/**
 * Ícones minimalistas por chave de subsecção editorial (doenças e conteúdo estruturado).
 * Chaves desconhecidas podem cair no heurístico por palavras no identificador.
 */
const TOPIC_ICONS: Record<string, LucideIcon> = {
  // DRC — etiologia, epidemiologia, patogênese, fisiopatologia
  visaoGeralFenotipoFinal: Microscope,
  causasEmCaes: Dog,
  causasEmGatos: Cat,
  perfilFelino: Cat,
  perfilCanino: Dog,
  naoContagiosa: Shield,
  duracaoMinima: Clock,
  perdaNefronsHiperfiltracao: Activity,
  perdaConcentracaoUrina: Droplets,
  retencaoUremica: FlaskConical,
  fosforoMineralBone: Sun,
  acidoseAnemiaHipertensao: HeartPulse,

  // DRC — diagnóstico
  drcAlertaEstadiamentoIRIS: Scale,
  drcFiguraIrisStaging: LayoutGrid,
  drcCronicoVersusAgudo: GitCompare,
  drcPacoteInvestigacao: ClipboardCheck,
  drcTabelaComparativaEspecies: Table2,
  drcPressaoSubstadiamento: HeartPulse,
  drcEstadiamentoPassos: ListOrdered,
  drcExamesLaboratoriaisContexto: TestTube2,

  // DRC — tratamento
  decisaoInicial: Lightbulb,
  drcDietaRenal: Package,
  drcMetasFosforoIRIS: Target,
  drcFosforoQuelantes: FlaskConical,
  drcProteinuriaRaas: Activity,
  drcHipertensao: HeartPulse,
  drcSintomasUremicos: Stethoscope,
  drcHipocalemiaAcidose: Zap,
  drcAnemia: Droplets,
  drcSuplementacaoFerro: Syringe,
  drcFluidoterapiaSc: Droplets,
  drcNutricaoAssistida: Soup,
  drcCalcitriol: Sun,
  drcUtiOculta: Microscope,
  drcTabelaPrognosticoFelino: BarChart3,

  // Cushing / Leish / etc. (exemplos frequentes)
  conceitoEixoHPA: Activity,
  comparacaoTiposHAC: Table2,
  trilostanoNoCao: Pill,
  mitotanoNoCao: Pill,
  cetoconazolNoCao: Pill,
  cirurgiaEspecializada: Cross,
  tratamentoFelino: Apple,
  iatrogenicoManejo: BriefcaseMedical,
  arquiteturaTerapeuticaTresClasses: Package,
  principiosFarmacologicosLCan: Pill,
  farmacos: Table2,
  dmvdRadiografiaToraxNormalVsCardiomegalia: LayoutGrid,
};

function heuristicIcon(key: string): LucideIcon | undefined {
  const k = key.toLowerCase();
  if (k.includes('dieta') || k.includes('nutri') || k.includes('aliment')) return Package;
  if (k.includes('fosfor') || k.includes('quelante')) return FlaskConical;
  if (k.includes('protein') || k.includes('raas') || k.includes('ace') || k.includes('arb') || k.includes('ieca')) return Activity;
  if (k.includes('hipertens') || k.includes('pressao') || k.includes('pa ')) return HeartPulse;
  if (k.includes('fluido') || k.includes('sc ') || k.includes('hidrat')) return Droplets;
  if (k.includes('anemia') || k.includes('ferro') || k.includes('eritrop')) return Droplets;
  if (k.includes('acidose') || k.includes('potass') || k.includes('k+')) return Zap;
  if (k.includes('antibio') || k.includes('doxic') || k.includes('farmaco')) return Pill;
  if (k.includes('tabela') || k.includes('compar')) return Table2;
  if (k.includes('diagnostico') || k.includes('suspeita')) return Stethoscope;
  if (k.includes('prognost')) return BarChart3;
  if (k.includes('vacin') || k.includes('prevenc')) return Shield;
  return undefined;
}

export function getEditorialSubsectionIcon(key: string): LucideIcon | undefined {
  if (TOPIC_ICONS[key]) return TOPIC_ICONS[key];
  return heuristicIcon(key);
}

/** Blocos da ficha de medicamento (indicações, cautelas, etc.). */
export const medicationPharmacologyBlockIcons = {
  indications: Stethoscope,
  contraindications: Ban,
  cautions: AlertTriangle,
  adverseEffects: Activity,
  interactions: Link2,
  routes: Syringe,
} as const satisfies Record<string, LucideIcon>;
