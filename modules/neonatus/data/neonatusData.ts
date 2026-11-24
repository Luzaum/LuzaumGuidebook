export type NeonatusSpecies = 'dog' | 'cat';

export type NeonatusTab =
  | 'apgar'
  | 'cuidados'
  | 'denticao'
  | 'calculadoras';

export interface ApgarParameterOption {
  points: 0 | 1 | 2;
  label: string;
  detail: string;
}

export interface ApgarParameter {
  id: string;
  name: string;
  howToAssess: string;
  options: [ApgarParameterOption, ApgarParameterOption, ApgarParameterOption];
}

export interface SerialApgarRecord {
  id: string;
  puppyLabel: string;
  species: NeonatusSpecies;
  timepoint: '5 min' | '30 min' | '60 min' | 'Outro';
  apgarTotal: number;
  reflexTotal?: number | null;
  statusLabel: string;
  timestamp: string;
}

export interface ClinicalFigure {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  speciesTag?: 'Cães' | 'Gatos' | 'Cães e Gatos';
}

export const CANINE_APGAR_PARAMETERS: ApgarParameter[] = [
  {
    id: 'hr',
    name: 'Frequência cardíaca',
    howToAssess:
      'Ausculta cardíaca precordial com estetoscópio pediátrico/neonatal ou palpação do choque precordial.',
    options: [
      { points: 0, label: '< 180 bpm', detail: 'Bradicardia acentuada ou ausente' },
      { points: 1, label: '180–220 bpm', detail: 'Frequência cardíaca reduzida / limítrofe' },
      { points: 2, label: '> 220 bpm', detail: 'Frequência cardíaca vigorosa' },
    ],
  },
  {
    id: 'rr',
    name: 'Esforço respiratório',
    howToAssess:
      'Observe a expansibilidade toracoabdominal combinada à intensidade da vocalização (choro).',
    options: [
      { points: 0, label: 'Sem choro, FR < 6 irpm', detail: 'Sem vocalização e FR < 6 irpm' },
      { points: 1, label: 'Choro fraco, FR 6–15 irpm', detail: 'Vocalização discreta e FR 6–15 irpm' },
      { points: 2, label: 'Choro evidente, FR > 15 irpm', detail: 'Vocalização forte e FR > 15 irpm' },
    ],
  },
  {
    id: 'irritability',
    name: 'Irritabilidade reflexa',
    howToAssess:
      'Estímulo delicado da extremidade de um membro, observando retirada, movimento e vocalização.',
    options: [
      { points: 0, label: 'Ausente', detail: 'Sem resposta ao estímulo periférico' },
      { points: 1, label: 'Resposta fraca / Discreta', detail: 'Retirada lenta ou queixa fraca' },
      { points: 2, label: 'Resposta vigorosa', detail: 'Retirada rápida e vocalização ativa' },
    ],
  },
  {
    id: 'motility',
    name: 'Motilidade / tônus',
    howToAssess:
      'Avaliado pela postura corporal e movimentação espontânea do filhote (não apenas pela força de sucção).',
    options: [
      { points: 0, label: 'Flácido', detail: 'Atonia muscular e ausência de movimento' },
      { points: 1, label: 'Algumas flexões', detail: 'Tônus reduzido com flexões discretas' },
      { points: 2, label: 'Movimentos ativos', detail: 'Bom tônus flexor e movimentação ativa' },
    ],
  },
  {
    id: 'mucosa',
    name: 'Mucosas',
    howToAssess:
      'Inspeção visual da coloração da mucosa oral e da língua sob boa iluminação.',
    options: [
      { points: 0, label: 'Cianóticas', detail: 'Mucosas azuladas ou arroxeadas' },
      { points: 1, label: 'Pálidas', detail: 'Mucosas esbranquiçadas / hipocoradas' },
      { points: 2, label: 'Róseas', detail: 'Mucosas normocoradas e rosadas' },
    ],
  },
];

export const FELINE_APGAR_PARAMETERS: ApgarParameter[] = [
  {
    id: 'hr',
    name: 'Frequência cardíaca',
    howToAssess:
      'Ausculta cardíaca com estetoscópio neonatal. As faixas < 100 e < 180 bpm se sobrepõem e 180–199 bpm é zona intermediária; escolha conforme a avaliação clínica global.',
    options: [
      { points: 0, label: '< 100 bpm', detail: 'Bradicardia crítica (< 100 bpm)' },
      { points: 1, label: '< 180 bpm (100–179 bpm)', detail: 'Frequência cardíaca reduzida' },
      { points: 2, label: '200–280 bpm', detail: 'Faixa fisiológica neonatal felina' },
    ],
  },
  {
    id: 'rr',
    name: 'FR e padrão respiratório',
    howToAssess:
      'Contagem dos movimentos respiratórios por minuto e observação do ritmo e da amplitude.',
    options: [
      { points: 0, label: 'Ausente ou < 10 irpm', detail: 'Apneia ou bradipneia severa' },
      { points: 1, label: 'FR < 40, fraca/irregular', detail: 'Respiração superficial ou irregular' },
      { points: 2, label: '40–160, regular e rítmica', detail: 'Padrão respiratório regular e eficaz' },
    ],
  },
  {
    id: 'tone',
    name: 'Tônus muscular',
    howToAssess:
      'Inspeção da postura corporal e da atividade motora espontânea dos membros e tronco.',
    options: [
      { points: 0, label: 'Flácido', detail: 'Flacidez generalizada sem resistência' },
      { points: 1, label: 'Algumas flexões', detail: 'Flexão parcial das extremidades' },
      { points: 2, label: 'Movimentos ativos', detail: 'Movimentação ativa e tônus firme' },
    ],
  },
  {
    id: 'mucosa',
    name: 'Cor das mucosas',
    howToAssess:
      'Avaliação visual da mucosa oral e da língua.',
    options: [
      { points: 0, label: 'Cianóticas', detail: 'Coloração azulada ou arroxeada' },
      { points: 1, label: 'Pálidas', detail: 'Coloração pálida ou esbranquiçada' },
      { points: 2, label: 'Róseas', detail: 'Coloração rósea saudável' },
    ],
  },
  {
    id: 'irritability',
    name: 'Irritabilidade reflexa',
    howToAssess:
      'Resposta motora e vocal ao estímulo delicado na extremidade de um membro.',
    options: [
      { points: 0, label: 'Ausente', detail: 'Sem reação ao estímulo' },
      { points: 1, label: 'Algum movimento', detail: 'Movimento discreto sem reação vigorosa' },
      { points: 2, label: 'Resposta vigorosa', detail: 'Retirada energética e vocalização' },
    ],
  },
];

export const FELINE_REFLEX_PARAMETERS: ApgarParameter[] = [
  {
    id: 'suckling',
    name: 'Sucção (suckling)',
    howToAssess:
      'Introduza suavemente a ponta de um dedo enluvado limpo e aquecido na cavidade oral do gatinho.',
    options: [
      { points: 0, label: 'Ausente', detail: 'Sem movimentos de sucção' },
      { points: 1, label: 'Sucção fraca', detail: 'Movimentos fracos, sem pressão firme' },
      { points: 2, label: 'Sucção forte', detail: 'Sucção forte com pressão negativa da língua' },
    ],
  },
  {
    id: 'rooting',
    name: 'Procura (rooting)',
    howToAssess:
      'Aproxime a mão em concha do focinho do filhote e observe os movimentos de busca e orientação.',
    options: [
      { points: 0, label: 'Ausente', detail: 'Não busca a fonte alimentar' },
      { points: 1, label: 'Procura lenta', detail: 'Busca lenta e hesitante' },
      { points: 2, label: 'Procura imediata e vigorosa', detail: 'Orientação imediata em direção à mão' },
    ],
  },
  {
    id: 'righting',
    name: 'Endireitamento (righting)',
    howToAssess:
      'Posicione o gatinho cuidadosamente em decúbito dorsal sobre superfície macia e observe o retorno à posição esternal.',
    options: [
      { points: 0, label: 'Não retorna', detail: 'Permanece de barriga para cima' },
      { points: 1, label: 'Retorno lento', detail: 'Vira-se lentamente com dificuldade' },
      { points: 2, label: 'Retorno imediato', detail: 'Retorno imediato à posição esternal' },
    ],
  },
];

export const FELINE_REFLEX_FIGURE: ClinicalFigure = {
  id: 'feline-reflexes',
  src: '/neonatus/feline-reflexes.webp',
  alt: 'Exemplos de avaliação dos reflexos neonatais em gatinhos: endireitamento, sucção e procura',
  title: 'Avaliação Prática dos Reflexos Neonatais em Gatinhos',
  speciesTag: 'Gatos',
  caption:
    '(a, b) Reflexo de endireitamento (righting): o gatinho é colocado cuidadosamente em decúbito dorsal sobre superfície macia e observa-se o giro ativo até o decúbito esternal. (c, d) Reflexo de sucção (suckling): avaliado com dedo enluvado limpo, verificando a pressão negativa exercida pela língua. (e) Reflexo de procura (rooting): aproximação da mão ao focinho observando a busca imediata da fonte alimentar.',
};

export function interpretApgarScore(score: number) {
  if (score >= 7) {
    return {
      range: '7–10',
      title: 'Sem sofrimento aparente',
      badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      panelClass: 'border-emerald-500/35 bg-emerald-500/[0.06]',
      summary:
        'Boa vitalidade neonatal. Manter aquecimento ativo, secagem, antissepsia umbilical, garantir mamada precoce de colostro e reavaliar seriadamente aos 5, 30 e 60 minutos.',
    };
  }
  if (score >= 4) {
    return {
      range: '4–6',
      title: 'Sofrimento moderado',
      badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      panelClass: 'border-amber-500/35 bg-amber-500/[0.06]',
      summary:
        'Depressão neonatal moderada. Exige assistência imediata: aquecimento controlado, estímulo tátil, desobstrução suave de vias aéreas se houver secreção, suporte ventilatório/oxigênio se houver hipoventilação e monitorização da sucção e glicemia.',
    };
  }
  return {
    range: '0–3',
    title: 'Sofrimento grave',
    badgeClass: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    panelClass: 'border-rose-500/35 bg-rose-500/[0.06]',
    summary:
      'Depressão cardiorrespiratória e neurológica crítica (alto risco de mortalidade nas primeiras horas). Iniciar ou manter imediatamente ventilação com pressão positiva (VPP) se apneia/gasping/bradicardia e compressões torácicas se FC < 60 bpm persistente.',
  };
}

export function interpretFelineReflexScore(score: number) {
  if (score >= 5) {
    return {
      range: '5–6',
      title: 'Reflexos preservados / vigorosos',
      badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      summary:
        'Reflexos adequados para busca mamária e ingestão segura de colostro.',
    };
  }
  if (score >= 3) {
    return {
      range: '3–4',
      title: 'Reflexos reduzidos (alerta alimentar)',
      badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      summary:
        'Risco de falha na ingestão de colostro. Checar temperatura (≥ 35 °C) e glicemia; auxiliar posicionamento na mama ou considerar sondagem orogástrica se a sucção for fraca.',
    };
  }
  return {
    range: '0–2',
    title: 'Reflexos deprimidos / ausentes',
    badgeClass: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    summary:
      'Alto risco de aspiração se alimentado por mamadeira ou seringa. Não forçar alimentação oral sem sucção firme; corrigir hipotermia (< 35 °C) e hipoglicemia antes de nutrir por sonda.',
  };
}

export interface RecoverStep {
  step: string;
  title: string;
  subtitle: string;
  keyPoints: string[];
  warning?: string;
}

export const RESUSCITATION_STEPS: RecoverStep[] = [
  {
    step: '01',
    title: 'Avaliação Imediata, Secagem e Estímulo Tátil',
    subtitle: 'Não aguardar o Apgar completo para agir em neonatos sem vitalidade',
    keyPoints: [
      'Remover imediatamente membranas fetais do focinho/narinas e iniciar controle térmico (ambiente aquecido a 30–32 °C, superfície seca e morna).',
      'Secar o neonato com compressa limpa e aquecida fazendo fricção gentil no tórax e dorso: isso reduz a perda de calor por evaporação e estimula o início da respiração.',
      'Avaliar simultaneamente esforço respiratório (choro/expansão torácica), tônus e frequência cardíaca.',
    ],
    warning:
      'PROIBIDO balançar ou "sacudir" o filhote de cabeça para baixo (swinging): causa risco elevado de hemorragia intracraniana, lesão cervical e aspiração gástrica.',
  },
  {
    step: '02',
    title: 'Desobstrução Seletiva de Vias Aéreas',
    subtitle: 'Somente quando há secreção ou mecônio visível obstruindo boca/narinas',
    keyPoints: [
      'Aspirar suavemente primeiro a cavidade oral e depois as narinas com pera de borracha macia ou cateter com sucção controlada.',
      'Manter cabeça e pescoço em alinhamento neutro/levemente estendido (evitar dobrar ou hiperestender a traqueia neonatal).',
    ],
    warning:
      'Evitar aspiração faríngea profunda ou repetitiva: desencadeia reflexo vagal intenso, bradicardia grave e laringoespasmo.',
  },
  {
    step: '03',
    title: 'Ventilação com Pressão Positiva (VPP) — Prioridade Máxima',
    subtitle: 'Indicada imediatamente em apneia, gasping ou bradicardia (< 120 bpm)',
    keyPoints: [
      'A bradicardia neonatal é quase sempre secundária à hipóxia; expandir e oxigenar os pulmões é a manobra mais decisiva.',
      'Iniciar VPP com máscara facial bem vedada sobre o focinho (ou intubação se disponível) em ar ambiente (FiO₂ 21%), na frequência de 20 a 30 respirações/minuto.',
      'Nas primeiras insuflações de recrutamento, pressões de pico de 20–30 cmH₂O com ~1 segundo de inspiração ajudam a deslocar o fluido pulmonar fetal.',
      'Se não houver melhora da frequência cardíaca após 30–60 s de VPP efetiva, suplementar oxigênio a 100%.',
    ],
    warning:
      'Não utilizar doxapram de rotina em neonatos hipóxicos: ele eleva o consumo cerebral de oxigênio e não substitui a ventilação pulmonar.',
  },
  {
    step: '04',
    title: 'Compressões Torácicas e Fármacos',
    subtitle: 'Para FC < 60 bpm (ou < 50 bpm / assistolia) persistente após VPP efetiva',
    keyPoints: [
      'Iniciar compressões torácicas laterolaterais ou ventrodorsais diretamente sobre o coração na frequência de 120–150 compressões/minuto, coordenadas com VPP com O₂ a 100% (ex.: relação 4:1 ou 3:1).',
      'Se FC permanecer baixa após 60 segundos de compressões + VPP eficaz: administrar Adrenalina 0,01 a 0,03 mg/kg IV (veia umbilical/jugular) ou IO (fêmur/úmero proximal) a cada 3–5 minutos.',
      'Reverter opioides (Naloxona 0,01–0,04 mg/kg IV/IO/IM/SC) somente se a mãe recebeu opioides antes do parto/cesariana.',
    ],
  },
];

export const NEWBORN_CARE_FIGURES: ClinicalFigure[] = [
  {
    id: 'recover-ppv',
    src: '/neonatus/recover-ppv-mask.jpg',
    alt: 'Ventilação com pressão positiva usando máscara facial neonatal bem vedada',
    title: 'Ventilação com Pressão Positiva (Máscara Facial)',
    speciesTag: 'Cães e Gatos',
    caption:
      'Posicionamento para VPP em neonato: a máscara facial pediátrica deve vedar bem ao redor do focinho enquanto a mão apoia o corpo e mantém o pescoço alinhado, garantindo entrada efetiva de ar nos pulmões sem dobrar a traqueia.',
  },
  {
    id: 'recover-cpr',
    src: '/neonatus/recover-chest-compressions.jpg',
    alt: 'Técnicas de compressão torácica em neonatos em decúbito lateral e dorsal',
    title: 'Técnicas de Compressão Torácica Neonatal',
    speciesTag: 'Cães e Gatos',
    caption:
      'As compressões são aplicadas diretamente sobre os ventrículos cardíacos: (A) com um ou dois dedos em decúbito lateral; (B) técnica circunferencial envolvendo o tórax com polegar e dedos; ou (C) em decúbito dorsal sobre o esterno.',
  },
  {
    id: 'recover-algo',
    src: '/neonatus/recover-algorithm.jpg',
    alt: 'Fluxograma de reanimação neonatal passo a passo para cães e gatos',
    title: 'Fluxograma de Decisão nos Primeiros Minutos',
    speciesTag: 'Cães e Gatos',
    caption:
      'Fluxo rápido do primeiro minuto de vida: secagem, aquecimento (meta 35–37 °C) e estímulo tátil; avaliação imediata de frequência cardíaca e respiração; VPP precoce se apneia/bradicardia; e compressões (4:1) com acesso vascular e adrenalina se FC < 50–60 bpm.',
  },
  {
    id: 'colostrum-nursing',
    src: '/neonatus/newborn-colostrum-nursing.jpg',
    alt: 'Filhotes recém-nascidos mamando colostro na mãe',
    title: 'Ingestão Precoce de Colostro (Primeiras 12–16 h)',
    speciesTag: 'Cães e Gatos',
    caption:
      'Recém-nascidos em decúbito esternal mamando logo após estabilização térmica. A absorção intestinal de imunoglobulinas (IgG) é máxima nas primeiras 4–8 horas, cai após 12–16 horas e se encerra em 24 horas.',
  },
  {
    id: 'newborn-umbilical',
    src: '/neonatus/newborn-puppy-umbilical.jpg',
    alt: 'Filhote recém-nascido com olhos fechados e região umbilical visível',
    title: 'Características do Recém-Nascido e Coto Umbilical',
    speciesTag: 'Cães e Gatos',
    caption:
      'Filhote nos primeiros dias de vida exibindo pálpebras fechadas, mucosas/focinho rosados e região umbilical evidente. O coto umbilical deve receber antissepsia (clorexidina 0,5–2% 2x/dia) e costuma secar e cair entre o 2º e o 5º dia.',
  },
  {
    id: 'kitten-bottle',
    src: '/neonatus/kitten-bottle-feeding.jpg',
    alt: 'Gatinho recém-nascido sendo alimentado na mamadeira em decúbito esternal',
    title: 'Postura Correta no Aleitamento Artificial',
    speciesTag: 'Gatos',
    caption:
      'Na ausência da mãe ou na suplementação, o filhote deve estar normotérmico (≥ 35 °C), aquecido e posicionado de barriga para baixo (decúbito esternal), com a cabeça alinhada horizontalmente — nunca de barriga para cima — para evitar aspiração pulmonar.',
  },
  {
    id: 'ear-canal',
    src: '/neonatus/puppy-ear-canal.jpg',
    alt: 'Evolução da abertura do conduto auditivo externo em filhote do nascimento ao 17º dia',
    title: 'Abertura do Conduto Auditivo (Marcos de Desenvolvimento)',
    speciesTag: 'Cães',
    caption:
      'Evolução anatômica da orelha e abertura do conduto auditivo externo: fechado ao nascimento e aos 7 dias, iniciando abertura entre o 14º e o 17º dia (geralmente 12–17 dias em cães; 6–14 dias em gatos).',
  },
];

export interface CareSection {
  id: string;
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
  highlightBox?: {
    title: string;
    text: string;
    tone: 'emerald' | 'amber' | 'rose' | 'cyan';
  };
}

export const INITIAL_CARE_SECTIONS: CareSection[] = [
  {
    id: 'triade',
    badge: 'Tríade da Mortalidade Neonatal',
    title: 'Hipotermia, Hipoglicemia e Desidratação',
    summary:
      'As três condições se retroalimentam rapidamente nas primeiras horas e semanas de vida. Interromper esse ciclo precocemente evita o quadro de definhamento neonatal.',
    bullets: [
      'Hipotermia (< 35 °C): os recém-nascidos não têm reflexo de tremor nos primeiros 6 dias, possuem pouca gordura subcutânea e alta perda de calor. O frio reduz a frequência cardíaca, causa íleo paralítico e abole a sucção.',
      'Hipoglicemia (< 40–50 mg/dL): reservas hepáticas de glicogênio esgotam-se em poucas horas de jejum. Causa choro agudo seguido de apatia, hipotonia, tremores e convulsões.',
      'Desidratação: cerca de 80% do peso neonatal é água e os rins imaturos têm baixa capacidade de concentrar urina (densidade normal de 1.006 a 1.017).',
    ],
    highlightBox: {
      title: 'REGRA CLÍNICA INEGOCIÁVEL: Nunca alimentar neonato hipotérmico (< 35 °C)',
      text: 'Abaixo de 35 °C ocorre paralisia intestinal (íleo). Fornecer leite a um filhote frio leva à fermentação, distensão gasosa, regurgitação e pneumonia aspirativa fatal. Aqueça gradualmente (~1 °C/h) e corrija a glicemia antes de iniciar a alimentação.',
      tone: 'rose',
    },
  },
  {
    id: 'colostro',
    badge: 'Imunidade Passiva',
    title: 'Colostro, Fechamento Intestinal e Isoeritrólise Felina',
    summary:
      'Apenas 5% a 10% das imunoglobulinas (IgG) passam pela placenta em cães e gatos; portanto, 90% a 95% da defesa inicial depende do colostro nas primeiras horas.',
    bullets: [
      'Janela de absorção: a permeabilidade intestinal às IgG é máxima nas primeiras 4–8 horas, cai muito após 12–16 horas e fecha completamente em 24 horas.',
      'Garantir que todos os filhotes mamem colostro assim que estiverem aquecidos e com reflexo de sucção presente.',
      'Em órfãos ou agalactia materna: utilizar banco de colostro da mesma espécie ou soro/plasma de adulto saudável da mesma espécie por via oral (< 16 h) ou SC/IP.',
    ],
    highlightBox: {
      title: 'Atenção em Gatos: Isoeritrólise Neonatal Felina (INF)',
      text: 'Gatas de sangue tipo B possuem altos níveis de anticorpos anti-A no colostro. Se cruzadas com machos tipo A ou AB, os filhotes tipo A/AB que mamarem colostro nas primeiras 16–24 h desenvolvem hemólise aguda grave (mucosas pálidas/ictéricas, urina escura, necrose da ponta da cauda e morte súbita). Em cruzamentos de risco, separar os filhotes da mãe nas primeiras 16–24 h e alimentar com sucedâneo ou leite de gata tipo A.',
      tone: 'amber',
    },
  },
  {
    id: 'umbigo-higiene',
    badge: 'Manejo Periparto',
    title: 'Coto Umbilical, Estimulação Anogenital e Pesagem',
    summary:
      'Rotinas simples de enfermagem previnem onfaloflebite, sepse bacteriana e retenção urinária ou fecal.',
    bullets: [
      'Coto umbilical: ligar/clampear a 1–2 cm da parede abdominal com fio estéril, cortar distalmente e higienizar com clorexidina 0,5%–2% (ou iodo diluído) 2x/dia até secar e cair (entre 2 e 5 dias).',
      'Estimulação anogenital: até os 16–21 dias de vida, cães e gatos não urinam nem defecam sozinhos. Massageie suavemente a região perineal com algodão morno úmido após cada mamada.',
      'Pesagem diária: identificar os filhotes e pesar em balança de precisão (em gramas) 1–2x/dia. Perda > 10% nas primeiras 24 h ou estagnação de peso é sinal precoce de alerta.',
    ],
    highlightBox: {
      title: 'Avaliação da Hidratação pela Urina no Algodão',
      text: 'O teste de turgor da pele falha em neonatos. Avalie hidratação pela umidade da boca, ganho de peso e cor da urina no algodão: a urina normal do neonato é quase incolor/transparente. Urina amarela intensa ou escura indica desidratação.',
      tone: 'cyan',
    },
  },
];

export const TEMPERATURE_TABLE = [
  {
    week: '1ª Semana (0–7 dias)',
    rectalDog: '35,0 – 36,5 °C',
    rectalCat: '35,0 – 36,5 °C',
    ambient: '30 – 32 °C',
    humidity: '55 – 65%',
  },
  {
    week: '2ª Semana (8–14 dias)',
    rectalDog: '36,5 – 37,5 °C',
    rectalCat: '36,5 – 37,5 °C',
    ambient: '27 – 29 °C',
    humidity: '55 – 65%',
  },
  {
    week: '3ª Semana (15–21 dias)',
    rectalDog: '37,0 – 38,0 °C',
    rectalCat: '37,0 – 38,0 °C',
    ambient: '25 – 27 °C',
    humidity: '55 – 65%',
  },
  {
    week: '4ª Semana (22–28 dias)',
    rectalDog: '37,5 – 38,5 °C',
    rectalCat: '37,5 – 38,5 °C',
    ambient: '22 – 24 °C',
    humidity: '50 – 60%',
  },
];

export const VITAL_PARAMETERS_TABLE = [
  {
    parameter: 'Peso médio ao nascer',
    dog: '100 – 500 g (80 g raças toy a > 600 g gigantes)',
    cat: '90 – 110 g (faixa normal: 85 – 120 g)',
  },
  {
    parameter: 'Meta de ganho de peso',
    dog: '+5% a 10% do peso inicial/dia (dobra em 7–10 dias)',
    cat: '+10 a 15 g/dia ou 70–100 g/semana (dobra em 7–10 dias)',
  },
  {
    parameter: 'Frequência cardíaca (1ª–2ª sem)',
    dog: '200 – 250 bpm (> 220 bpm ideal ao nascer)',
    cat: '200 – 280 bpm',
  },
  {
    parameter: 'Frequência respiratória (1ª–2ª sem)',
    dog: '15 – 35 irpm',
    cat: '20 – 40 irpm (40–160 irpm logo após o parto)',
  },
  {
    parameter: 'Glicemia neonatal normal',
    dog: '70 – 150 mg/dL (hipoglicemia < 40–50 mg/dL)',
    cat: '70 – 150 mg/dL (hipoglicemia < 40–50 mg/dL)',
  },
  {
    parameter: 'Urina / Densidade',
    dog: '25 – 40 mL/kg/dia · Densidade 1.006 – 1.017',
    cat: '25 – 40 mL/kg/dia · Densidade 1.006 – 1.017',
  },
];

export interface DentalTimelineRow {
  toothGroup: string;
  deciduousEruption: string;
  permanentEruption: string;
  clinicalNotes: string;
}

export const CANINE_DENTAL_TIMELINE: DentalTimelineRow[] = [
  {
    toothGroup: 'Incisivos Centrais (I1)',
    deciduousEruption: '3 a 4 semanas (21–28 dias)',
    permanentEruption: '3 a 4 meses (12–16 semanas)',
    clinicalNotes: 'Primeiros incisivos definitivos a trocar; observar borda trilobada (flor-de-lis) no dente permanente.',
  },
  {
    toothGroup: 'Incisivos Intermediários (I2)',
    deciduousEruption: '3 a 4 semanas (21–28 dias)',
    permanentEruption: '3,5 a 4,5 meses (14–18 semanas)',
    clinicalNotes: 'Erupcionam logo após ou junto aos centrais na dentição decídua.',
  },
  {
    toothGroup: 'Incisivos Cantos / Laterais (I3)',
    deciduousEruption: '3 a 4 semanas (21–30 dias)',
    permanentEruption: '4 a 5 meses (16–20 semanas)',
    clinicalNotes: 'Últimos incisivos a completar a troca permanente.',
  },
  {
    toothGroup: 'Caninos (C)',
    deciduousEruption: '3 semanas (~21 dias)',
    permanentEruption: '4 a 6 meses (média 5 meses)',
    clinicalNotes:
      'Caninos de leite são longos, finos ("agulhas") e curvados para trás. Frequente retenção decídua em raças toy e pequenas.',
  },
  {
    toothGroup: '1º Pré-molar (PM1)',
    deciduousEruption: 'Não possui predecessor de leite',
    permanentEruption: '4 a 5 meses',
    clinicalNotes: 'Erupciona diretamente como dente permanente logo atrás do canino.',
  },
  {
    toothGroup: 'Pré-molares (PM2, PM3, PM4)',
    deciduousEruption: '4 a 12 semanas (geralmente 4–6 semanas)',
    permanentEruption: '4 a 6 meses (5–6 meses)',
    clinicalNotes:
      'O PM4 superior e o M1 inferior formam os dentes carniceiros definitivos. Na fase de leite, o PM3 superior e o PM4 inferior exercem função semelhante.',
  },
  {
    toothGroup: '1º Molar (M1)',
    deciduousEruption: 'Não possui predecessor de leite',
    permanentEruption: '4 a 5 meses (16–20 semanas)',
    clinicalNotes: 'O 1º molar inferior é o maior dente da mandíbula.',
  },
  {
    toothGroup: '2º Molar (M2)',
    deciduousEruption: 'Não possui predecessor de leite',
    permanentEruption: '5 a 6 meses',
    clinicalNotes: 'Presente na maxila e na mandíbula do cão.',
  },
  {
    toothGroup: '3º Molar (M3 — apenas inferior)',
    deciduousEruption: 'Não possui predecessor de leite',
    permanentEruption: '6 a 7 meses',
    clinicalNotes: 'Último dente a erupcionar no cão (exclusivo da mandíbula); marca ~6–7 meses de idade.',
  },
];

export const FELINE_DENTAL_TIMELINE: DentalTimelineRow[] = [
  {
    toothGroup: 'Incisivos Centrais (I1)',
    deciduousEruption: '2 a 3 semanas (14–21 dias)',
    permanentEruption: '3 a 3,5 meses (12–14 semanas)',
    clinicalNotes: 'Minúsculos; são os primeiros dentes de leite a apontar na gengiva do gatinho.',
  },
  {
    toothGroup: 'Incisivos Intermediários (I2)',
    deciduousEruption: '2 a 3 semanas (14–21 dias)',
    permanentEruption: '3,5 a 4 meses (14–16 semanas)',
    clinicalNotes: 'Acompanham de perto a erupção dos incisivos centrais.',
  },
  {
    toothGroup: 'Incisivos Laterais / Cantos (I3)',
    deciduousEruption: '3 a 4 semanas (21–28 dias)',
    permanentEruption: '4 a 4,5 meses (16–18 semanas)',
    clinicalNotes: 'Completam a fileira dos 6 incisivos entre os caninos.',
  },
  {
    toothGroup: 'Caninos (C)',
    deciduousEruption: '3 a 4 semanas (21–28 dias)',
    permanentEruption: '4 a 5 meses (16–20 semanas)',
    clinicalNotes:
      'Finos, translúcidos e pontiagudos na dentição decídua; caninos permanentes possuem sulco longitudinal vertical característico.',
  },
  {
    toothGroup: 'Pré-molares Superiores (PM2, PM3, PM4)',
    deciduousEruption: '3 a 6 semanas (21–42 dias)',
    permanentEruption: '4 a 6 meses (16–24 semanas)',
    clinicalNotes: 'Gatos não possuem PM1 superior; apresentam 3 pré-molares superiores de cada lado.',
  },
  {
    toothGroup: 'Pré-molares Inferiores (PM3, PM4)',
    deciduousEruption: '4 a 6 semanas (28–42 dias)',
    permanentEruption: '4 a 6 meses (16–24 semanas)',
    clinicalNotes: 'Gatos não possuem PM1 nem PM2 inferiores (apenas 2 pré-molares inferiores de cada lado).',
  },
  {
    toothGroup: 'Molares (M1 superior e M1 inferior)',
    deciduousEruption: 'Não possui predecessor de leite',
    permanentEruption: '4 a 5 meses (16–20 semanas)',
    clinicalNotes: 'Gatos possuem apenas 1 molar por hemiarcada. Dentição permanente completa (30 dentes) aos ~6 meses.',
  },
];

export const DENTAL_CLINICAL_FIGURES: ClinicalFigure[] = [
  {
    id: 'canine-early',
    src: '/neonatus/canine-dentition-early.jpg',
    alt: 'Progressão dentária de cão do nascimento até a 23ª semana de vida',
    title: 'Evolução Dentária Canina: Do Nascimento à 23ª Semana',
    speciesTag: 'Cães',
    caption:
      'Ao nascimento e no 15º dia a gengiva é totalmente lisa (edêntula). No 25º dia apontam os primeiros dentes decíduos em "agulha". No 51º dia todos os 28 dentes de leite já estão erupcionados. Na 13ª semana inicia-se a queda e troca dos incisivos centrais, e na 23ª semana (~5,5 meses) observam-se os caninos e pré-molares permanentes em erupção.',
  },
  {
    id: 'canine-1to12m',
    src: '/neonatus/canine-dentition-1to12m.jpg',
    alt: 'Acompanhamento mensal da arcada dentária canina do 1º ao 12º mês',
    title: 'Série Mensal Canina (1º ao 12º Mês)',
    speciesTag: 'Cães',
    caption:
      'Note no 2º e 3º meses os espaços fisiológicos (diastemas) entre os dentes decíduos conforme a mandíbula cresce; entre o 4º e o 6º mês ocorre a substituição pelos dentes permanentes maiores e branco-marfim; a partir do 7º mês a arcada permanente completa (42 dentes) está estabelecida.',
  },
  {
    id: 'kitten-milk-teeth',
    src: '/neonatus/kitten-milk-teeth.jpg',
    alt: 'Close-up da dentição decídua de um filhote felino',
    title: 'Dentição Decídua Felina ("Dentes de Leite")',
    speciesTag: 'Gatos',
    caption:
      'Visualização aproximada dos dentes de leite em filhote felino: observe os 6 incisivos minúsculos alinhados entre os caninos decíduos finos, translúcidos e extremamente pontiagudos (presentes a partir de 2–4 semanas de idade).',
  },
  {
    id: 'feline-permanent',
    src: '/neonatus/feline-permanent-dentition.jpg',
    alt: 'Close-up da dentição permanente em gato adulto jovem',
    title: 'Dentição Permanente Felina (A partir dos 6 Meses)',
    speciesTag: 'Gatos',
    caption:
      'Arcada permanente felina (30 dentes): coroas mais largas, densas e de tonalidade branco-marfim. Observe os caninos permanentes robustos com sulco vertical na face vestibular e os pré-molares serrilhados sem dentes de leite residuais.',
  },
  {
    id: 'retained-deciduous',
    src: '/neonatus/retained-deciduous-dog.jpg',
    alt: 'Retenção de canino decíduo ao lado do canino permanente em filhote de cão',
    title: 'Retenção de Dente Decíduo ("Dupla Dentição")',
    speciesTag: 'Cães',
    caption:
      'Achado clínico frequente em raças pequenas e toy: o canino decíduo fino permanece aderido junto ao canino permanente mais espesso. Regra clínica: dois dentes do mesmo tipo não devem coexistir no mesmo local — a extração precoce do dente de leite retido previne acúmulo de placa, doença periodontal e desvio de mordida.',
  },
  {
    id: 'shed-deciduous',
    src: '/neonatus/deciduous-shed-teeth-ruler.jpg',
    alt: 'Dentes decíduos esfoliados de filhote de cão medidos com régua em centímetros',
    title: 'Anatomia dos Dentes Decíduos Esfoliados',
    speciesTag: 'Cães',
    caption:
      'Dentes de leite após a queda natural: note como apenas a coroa e uma porção oca da raiz permanecem, pois os osteoclastos reabsorvem a raiz do dente decíduo à medida que o dente permanente emerge por baixo.',
  },
  {
    id: 'kitten-chart',
    src: '/neonatus/kitten-development-chart.webp',
    alt: 'Guia visual semana a semana de desenvolvimento e dentição de gatinhos até 8 semanas',
    title: 'Guia Visual Felino Semana a Semana (0 a 8 Semanas)',
    speciesTag: 'Gatos',
    caption:
      'Correlação entre dentição e marcos físicos no gato: 0–2 semanas (sem dentes, olhos abrindo 8–12 dias, coto umbilical cai ~5 dias); 3 semanas (incisivos decíduos apontam); 4 semanas (caninos decíduos erupcionam); 5 semanas (pré-molares emergem e inicia desmame); 6 semanas (todos os 26 dentes de leite presentes).',
  },
];

export interface AgeStageOption {
  id: string;
  label: string;
  dogAge: string;
  catAge: string;
  dentalFindings: string;
  physicalMilestones: string;
  dietRecommendation: string;
}

export const AGE_ESTIMATION_STAGES: AgeStageOption[] = [
  {
    id: 'stage-1',
    label: 'Edêntulo + Olhos fechados + Coto umbilical presente',
    dogAge: '0 a 5 dias de vida',
    catAge: '0 a 5 dias de vida',
    dentalFindings: 'Totalmente sem dentes (gengiva lisa).',
    physicalMilestones:
      'Coto umbilical presente (cai entre 2 e 5 dias), pálpebras fechadas, condutos auditivos fechados, locomoção apenas por rastejamento.',
    dietRecommendation: 'Exclusivamente colostro/leite materno ou sucedâneo lácteo aquecido a cada 2–3 horas.',
  },
  {
    id: 'stage-2',
    label: 'Edêntulo + Olhos abrindo ou recém-abertos (azul-acinzentados)',
    dogAge: '10 a 16 dias (~2 semanas)',
    catAge: '7 a 14 dias (~1,5 a 2 semanas)',
    dentalFindings: 'Ainda sem dentes em cães; em gatos, os incisivos decíduos começam a apontar por volta dos 14 dias.',
    physicalMilestones:
      'Coto umbilical já cicatrizado; olhos abrindo (10–14 d cão; 7–14 d gato) com íris azul-acinzentada; condutos auditivos abrindo (12–17 d cão; 6–14 d gato); começa a sustentar o peso nos membros.',
    dietRecommendation: 'Leite materno ou sucedâneo lácteo a cada 3 horas + estímulo anogenital após cada mamada.',
  },
  {
    id: 'stage-3',
    label: 'Incisivos e Caninos decíduos ("agulhas") apontando na gengiva',
    dogAge: '3 a 4 semanas (21–28 dias)',
    catAge: '2 a 4 semanas (14–28 dias)',
    dentalFindings:
      'Erupção dos incisivos decíduos (I1, I2, I3) e caninos decíduos finos e pontiagudos. Pré-molares ainda ausentes ou iniciando.',
    physicalMilestones:
      'Caminha com mais firmeza, visão e audição funcionais, início do controle voluntário de micção e defecação (~3 semanas).',
    dietRecommendation:
      'Leite materno/sucedâneo a cada 4 horas; a partir de 3,5–4 semanas iniciar apresentação gradual de papinha de desmame.',
  },
  {
    id: 'stage-4',
    label: 'Pré-molares decíduos presentes (dentição de leite completa)',
    dogAge: '5 a 11 semanas (1,5 a 2,5 meses)',
    catAge: '5 a 11 semanas (1,5 a 2,5 meses)',
    dentalFindings:
      'Arcada decídua completa (Cão: 28 dentes; Gato: 26 dentes). Dentes pequenos, branco-azulados/translúcidos, com diastemas conforme a mandíbula cresce.',
    physicalMilestones:
      'Cor dos olhos mudando para a tonalidade definitiva (4–6 semanas), socialização ativa e coordenação motora completa.',
    dietRecommendation:
      'Transição alimentar / desmame progressivo entre 4 e 8 semanas para alimento úmido/seco de filhotes.',
  },
  {
    id: 'stage-5',
    label: 'Troca dos Incisivos (I1, I2, I3 permanentes erupcionando)',
    dogAge: '3 a 5 meses (12–20 semanas)',
    catAge: '3 a 4,5 meses (12–18 semanas)',
    dentalFindings:
      'Queda dos incisivos de leite e erupção dos incisivos permanentes (maiores, branco-marfim, borda trilobada no cão). Caninos ainda são decíduos no início do 3º–4º mês.',
    physicalMilestones: 'Fase juvenil; crescimento ósseo rápido.',
    dietRecommendation: 'Alimento completo para filhotes em crescimento.',
  },
  {
    id: 'stage-6',
    label: 'Troca dos Caninos e Erupção dos Molares Permanentes',
    dogAge: '4,5 a 7 meses',
    catAge: '4,5 a 6 meses',
    dentalFindings:
      'Caninos permanentes em erupção (4–6 meses no cão; 4–5 meses no gato) e erupção dos molares definitivos. Aos 6–7 meses a dentição permanente está completa (42 dentes no cão; 30 no gato).',
    physicalMilestones: 'Inspecionar sempre se há retenção de caninos decíduos ("dupla dentição").',
    dietRecommendation: 'Alimento para filhotes; avaliar extração de decíduos retidos se houver dois dentes no mesmo lugar.',
  },
];

export const SOURCE_LINKS = [
  {
    label: 'Consenso RECOVER — Diretrizes Clínicas de Reanimação Neonatal em Cães e Gatos (PMC12374490)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12374490/',
  },
  {
    label: 'Avaliação de Apgar Neonatal Canino — Resumo PubMed (PMID 19476989)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19476989/',
  },
  {
    label: 'Predição de Sobrevivência em Gatinhos com Apgar e Reflexos Neonatais (PMC13735678)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13735678/',
  },
  {
    label: 'Desenvolvimento Dentário e Conduto Auditivo em Filhotes — Estudo Aberto (PMC12535301)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12535301/',
  },
  {
    label: 'WSAVA Global Dental Guidelines — Diretrizes Odontológicas Mundiais',
    url: 'https://wsava.org/global-guidelines/dental-guidelines/',
  },
  {
    label: 'Kitten Lady — Guia Visual de Desenvolvimento e Idade em Gatinhos',
    url: 'https://www.kittenlady.org/age',
  },
  {
    label: 'Wikimedia Commons — Fotos Clínicas de Dentição e Neonatos (CC BY / Domínio Público)',
    url: 'https://commons.wikimedia.org/wiki/File:Morkie_puppy_retained_teeth.jpg',
  },
];
