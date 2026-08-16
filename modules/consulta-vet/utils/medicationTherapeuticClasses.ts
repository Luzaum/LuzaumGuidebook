import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Brain,
  Flame,
  Gauge,
  HeartPulse,
  Ribbon,
  ShieldCheck,
  Syringe,
  TestTubes,
  Thermometer,
  TriangleAlert,
  Waves,
  Zap,
} from 'lucide-react';
import type { MedicationRecord } from '../types/medication';

export interface MedicationTherapeuticClass {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  theme: string;
  selectedClassName: string;
  iconClassName: string;
  medicationSlugs: readonly string[];
  keywords: readonly string[];
}

/**
 * Taxonomia terapêutica da seção Medicamentos.
 *
 * A categoria editorial da doença (cardiologia, gastroenterologia etc.) não é
 * usada como sinônimo automático de classe farmacológica. Uma molécula pode
 * pertencer a mais de uma classe; a primeira correspondência é a classe
 * primária mostrada no cartão.
 */
export const MEDICATION_THERAPEUTIC_CLASSES: readonly MedicationTherapeuticClass[] = [
  {
    slug: 'antibacterianos',
    label: 'Antibacterianos',
    shortLabel: 'Antibacterianos',
    description: 'Antibióticos sistêmicos e associações com inibidor de beta-lactamase.',
    icon: ShieldCheck,
    theme: 'infectologia',
    selectedClassName: 'border-emerald-500 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300',
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
    medicationSlugs: ['sulfametoxazol-trimetoprima', 'amoxicilina-clavulanato', 'ampicilina-sulbactam', 'ampicilina', 'clindamicina', 'metronidazol', 'enrofloxacina', 'marbofloxacina', 'ciprofloxacina'],
    keywords: ['antibiótico', 'antibacteriano', 'aminopenicilina', 'sulfonamida', 'beta-lactâmico', 'β-lactâmico'],
  },
  {
    slug: 'anti-helminticos-antiparasitarios',
    label: 'Anti-helmínticos e antiparasitários',
    shortLabel: 'Anti-helmínticos',
    description: 'Vermífugos, cestocidas e protocolos antiprotozoários selecionados.',
    icon: ShieldCheck,
    theme: 'infectologia',
    selectedClassName: 'border-lime-500 bg-lime-500/[0.07] text-lime-800 dark:text-lime-300',
    iconClassName: 'text-lime-600 dark:text-lime-400',
    medicationSlugs: ['fenbendazol', 'praziquantel'],
    keywords: ['anti-helmíntico', 'antihelmintico', 'vermífugo', 'vermifugo', 'cestocida', 'benzimidazol', 'praziquantel', 'fenbendazol'],
  },
  {
    slug: 'aines',
    label: 'Anti-inflamatórios não esteroidais (AINEs)',
    shortLabel: 'AINEs',
    description: 'AINEs e coxibes; não inclui dipirona nem corticosteroides.',
    icon: Thermometer,
    theme: 'anestesia-dor',
    selectedClassName: 'border-orange-500 bg-orange-500/[0.07] text-orange-700 dark:text-orange-300',
    iconClassName: 'text-orange-600 dark:text-orange-400',
    medicationSlugs: [],
    keywords: ['aine', 'anti-inflamatório não esteroidal', 'coxibe', 'meloxicam', 'carprofeno', 'firocoxib', 'robenacoxib'],
  },
  {
    slug: 'glicocorticoides',
    label: 'Glicocorticoides',
    shortLabel: 'Corticoides',
    description: 'Corticosteroides sistêmicos ou de ação predominantemente local.',
    icon: Flame,
    theme: 'endocrinologia',
    selectedClassName: 'border-amber-500 bg-amber-500/[0.07] text-amber-800 dark:text-amber-300',
    iconClassName: 'text-amber-600 dark:text-amber-400',
    medicationSlugs: ['prednisolona', 'budesonida'],
    keywords: ['glicocorticoide', 'corticosteroide', 'corticoide'],
  },
  {
    slug: 'analgesicos-anestesicos',
    label: 'Analgésicos e anestésicos',
    shortLabel: 'Dor e anestesia',
    description: 'Analgésicos não AINEs e anestésicos locais.',
    icon: Syringe,
    theme: 'anestesia-dor',
    selectedClassName: 'border-cyan-500 bg-cyan-500/[0.07] text-cyan-800 dark:text-cyan-300',
    iconClassName: 'text-cyan-600 dark:text-cyan-400',
    medicationSlugs: ['dipirona', 'lidocaina', 'amantadina'],
    keywords: ['analgésico', 'anestésico local', 'pirazolona'],
  },
  {
    slug: 'neurologicos-anticonvulsivantes',
    label: 'Neurológicos e anticonvulsivantes',
    shortLabel: 'Neurológicos',
    description: 'Anticonvulsivantes e moduladores de dor neuropática.',
    icon: Brain,
    theme: 'neurologia',
    selectedClassName: 'border-indigo-500 bg-indigo-500/[0.07] text-indigo-700 dark:text-indigo-300',
    iconClassName: 'text-indigo-600 dark:text-indigo-400',
    medicationSlugs: ['pregabalina', 'selegilina', 'fluoxetina', 'amitriptilina'],
    keywords: ['anticonvulsivante', 'antiepiléptico', 'dor neuropática', 'neurológico'],
  },
  {
    slug: 'antiemeticos',
    label: 'Antieméticos',
    shortLabel: 'Antieméticos',
    description: 'Controle farmacológico de náusea e vômito.',
    icon: Activity,
    theme: 'gastroenterologia',
    selectedClassName: 'border-fuchsia-500 bg-fuchsia-500/[0.07] text-fuchsia-700 dark:text-fuchsia-300',
    iconClassName: 'text-fuchsia-600 dark:text-fuchsia-400',
    medicationSlugs: ['maropitant', 'ondansetron'],
    keywords: ['antiemético', 'êmese', 'antagonista nk1', '5-ht3'],
  },
  {
    slug: 'hepatobiliares',
    label: 'Hepatobiliares',
    shortLabel: 'Hepatobiliares',
    description: 'Ácidos biliares e suporte hepatocelular com dose definida.',
    icon: Waves,
    theme: 'gastroenterologia',
    selectedClassName: 'border-yellow-500 bg-yellow-500/[0.08] text-yellow-800 dark:text-yellow-300',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    medicationSlugs: ['same-sadenosilmetionina', 'suplementos-hepaticos-silimarina', 'acido-ursodesoxicolico'],
    keywords: ['hepatoprotetor', 'hepatobiliar', 'ácido biliar', 'colerético', 'coleretico'],
  },
  {
    slug: 'cardiovasculares',
    label: 'Cardiovasculares',
    shortLabel: 'Cardiovasculares',
    description: 'Modulação do SRAA, inotropismo e hemodinâmica cardiovascular.',
    icon: HeartPulse,
    theme: 'cardiologia',
    selectedClassName: 'border-rose-500 bg-rose-500/[0.07] text-rose-700 dark:text-rose-300',
    iconClassName: 'text-rose-600 dark:text-rose-400',
    medicationSlugs: ['benazepril', 'pimobendan'],
    keywords: ['inodilatador', 'ieca', 'cardiovascular', 'insuficiência cardíaca'],
  },
  {
    slug: 'antiarritmicos',
    label: 'Antiarrítmicos e controle de frequência',
    shortLabel: 'Antiarrítmicos',
    description: 'Fármacos com ação eletrofisiológica ou cronotrópica direta.',
    icon: Zap,
    theme: 'cardiologia',
    selectedClassName: 'border-red-500 bg-red-500/[0.07] text-red-700 dark:text-red-300',
    iconClassName: 'text-red-600 dark:text-red-400',
    medicationSlugs: ['diltiazem', 'digoxina', 'atenolol', 'propranolol', 'esmolol', 'sotalol', 'atropina', 'lidocaina'],
    keywords: ['antiarrítmico', 'antiarritmico', 'betabloqueador', 'bloqueador de canais de ca', 'glicosídeo cardíaco'],
  },
  {
    slug: 'endocrinologicos-hormonais',
    label: 'Endocrinológicos e hormonais',
    shortLabel: 'Endocrinológicos',
    description: 'Reposição hormonal e inibição de síntese hormonal.',
    icon: TestTubes,
    theme: 'endocrinologia',
    selectedClassName: 'border-violet-500 bg-violet-500/[0.07] text-violet-700 dark:text-violet-300',
    iconClassName: 'text-violet-600 dark:text-violet-400',
    medicationSlugs: ['desoxicorticosterona-pivalato', 'metimazol', 'levotiroxina-sodica'],
    keywords: ['hormônio', 'hormonal', 'antitireoidiano', 't4 sintético', 'mineralocorticoide'],
  },
  {
    slug: 'metabolicos-hipolipemiantes',
    label: 'Metabólicos e hipolipemiantes',
    shortLabel: 'Metabólicos',
    description: 'Moduladores do metabolismo lipídico.',
    icon: Gauge,
    theme: 'endocrinologia',
    selectedClassName: 'border-teal-500 bg-teal-500/[0.07] text-teal-700 dark:text-teal-300',
    iconClassName: 'text-teal-600 dark:text-teal-400',
    medicationSlugs: ['benzafibrato'],
    keywords: ['hipolipemiante', 'fibrato', 'hipertrigliceridemia'],
  },
  {
    slug: 'antineoplasicos-imunossupressores',
    label: 'Antineoplásicos e imunossupressores',
    shortLabel: 'Antineoplásicos',
    description: 'Citotóxicos e imunossupressores que exigem monitorização específica.',
    icon: Ribbon,
    theme: 'oncologia',
    selectedClassName: 'border-purple-500 bg-purple-500/[0.07] text-purple-700 dark:text-purple-300',
    iconClassName: 'text-purple-600 dark:text-purple-400',
    medicationSlugs: ['clorambucil'],
    keywords: ['antineoplásico', 'citotóxico', 'agente alquilante', 'quimioterapia'],
  },
  {
    slug: 'antidotos-toxicologia',
    label: 'Antídotos e toxicologia',
    shortLabel: 'Antídotos',
    description: 'Antídotos e fármacos de reversão de toxíndromes.',
    icon: TriangleAlert,
    theme: 'emergencia-intensivismo',
    selectedClassName: 'border-orange-500 bg-orange-500/[0.07] text-orange-700 dark:text-orange-300',
    iconClassName: 'text-orange-600 dark:text-orange-400',
    medicationSlugs: ['n-acetilcisteina', 'atropina'],
    keywords: ['antídoto', 'antidoto', 'toxicologia', 'intoxicação', 'organofosforado'],
  },
] as const;

function normalizedMedicationText(medication: Pick<MedicationRecord, 'pharmacologicClass' | 'tags' | 'indications'>): string {
  return [medication.pharmacologicClass, ...medication.tags, ...medication.indications]
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function normalizeKeyword(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

export function getMedicationTherapeuticClassIds(
  medication: Pick<MedicationRecord, 'slug' | 'pharmacologicClass' | 'tags' | 'indications'>,
): string[] {
  const exact = MEDICATION_THERAPEUTIC_CLASSES.filter((item) => item.medicationSlugs.includes(medication.slug));
  if (exact.length > 0) return exact.map((item) => item.slug);

  const searchable = normalizedMedicationText(medication);
  return MEDICATION_THERAPEUTIC_CLASSES
    .filter((item) => item.keywords.some((keyword) => searchable.includes(normalizeKeyword(keyword))))
    .map((item) => item.slug);
}

export function getPrimaryMedicationTherapeuticClass(
  medication: Pick<MedicationRecord, 'slug' | 'pharmacologicClass' | 'tags' | 'indications'>,
): MedicationTherapeuticClass | null {
  const [primaryClassId] = getMedicationTherapeuticClassIds(medication);
  return MEDICATION_THERAPEUTIC_CLASSES.find((item) => item.slug === primaryClassId) || null;
}
