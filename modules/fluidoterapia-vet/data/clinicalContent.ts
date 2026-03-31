import { AnimalSize, Comorbidity, PhysiologicState, Species } from '../types';

export interface ContentSection {
  heading: string;
  bullets: string[];
}

export interface InfoContent {
  title: string;
  summary: string;
  sections: ContentSection[];
  footer?: string;
}

export interface ResuscitationPreset {
  id: string;
  species: Species;
  label: string;
  defaultMlKg: number;
  minMlKg: number;
  maxMlKg: number;
  summary: string;
  why: string[];
  monitor: string[];
  stopWhen: string[];
}

export interface ProtocolContent {
  id: string;
  title: string;
  summary: string;
  why: string[];
  goals: string[];
  preferred: string[];
  avoid: string[];
  monitor: string[];
  alerts?: string[];
}

export const physiologicStateContent: Record<PhysiologicState, InfoContent> = {
  adult: {
    title: 'Adulto',
    summary: 'Adultos estáveis podem partir de fórmulas usuais, mas ainda exigem prescrição individualizada.',
    sections: [
      { heading: 'O que muda', bullets: ['Usar manutenção como classe de necessidade, não como atalho.', 'Sempre separar ressuscitação, reidratação, perdas contínuas e manutenção.'] },
      { heading: 'Quando ser conservador', bullets: ['Se houver cardiopatia, doença renal, anestesia, TCE ou sinais de sobrecarga.', 'Quando o exame sugerir que o problema principal não é manutenção.'] },
      { heading: 'Monitorar', bullets: ['Peso seriado, FR, esforço respiratório, ausculta, diurese, PA e eletrólitos.', 'Balanço hídrico e resposta clínica precisam acompanhar a taxa prescrita.'] },
    ],
  },
  puppy: {
    title: 'Filhote',
    summary: 'Filhotes têm maior água corporal total, menor reserva e risco maior de hipoglicemia e sobrecarga.',
    sections: [
      { heading: 'O que muda', bullets: ['Necessidade basal pode ser maior que em adultos.', 'Volumes pequenos representam grande fração do volume circulante.'] },
      { heading: 'Riscos', bullets: ['Hipoglicemia, hipotermia e sobrecarga.', 'Interpretação laboratorial deve respeitar faixas etárias.'] },
      { heading: 'Monitorar', bullets: ['Peso, temperatura, glicemia, diurese e FR.', 'Microgotas ou bomba são preferíveis quando o volume é pequeno.'] },
    ],
    footer: 'Se houver hipoperfusão, sair da lógica de manutenção e ir para ressuscitação fracionada.',
  },
  neonate: {
    title: 'Neonato',
    summary: 'Neonatos exigem abordagem microdosada, aquecimento e vigilância estreita.',
    sections: [
      { heading: 'O que muda', bullets: ['Maior água corporal total e necessidade por kg mais alta.', 'Não toleram jejum, hipotermia nem erro pequeno de volume.'] },
      { heading: 'Quando reduzir', bullets: ['Ao menor sinal de sobrecarga ou perfusão incerta.', 'Sempre usar metas curtas de reavaliação.'] },
      { heading: 'Monitorar', bullets: ['Peso, temperatura, glicemia, perfusão, sucção e diurese.', 'Reavaliar acesso e aquecimento a cada intervenção.'] },
    ],
  },
  senior: {
    title: 'Idoso',
    summary: 'Pacientes idosos podem ter reserva cardíaca e renal menor mesmo sem diagnóstico fechado.',
    sections: [
      { heading: 'O que muda', bullets: ['Começar de forma conservadora e revisar cedo.', 'Valorizar tendência laboratorial e pressão arterial.'] },
      { heading: 'Risco', bullets: ['Sobrecarga, azotemia e descompensação anestésica.', 'Doença crônica oculta pode aparecer após excesso de volume.'] },
      { heading: 'Monitorar', bullets: ['FR, ausculta, peso, diurese, PA e creatinina.', 'Não confiar em um único número fixo de manutenção.'] },
    ],
  },
  pregnant: {
    title: 'Gestante',
    summary: 'Gestação altera distribuição de volume e perfusão; manter estabilidade materna e central.',
    sections: [
      { heading: 'O que muda', bullets: ['Evitar hipotensão e hipoperfusão materna.', 'Ser conservador com excesso de sódio e água.'] },
      { heading: 'Quando sair da manutenção', bullets: ['Hemorragia, sepse, vômitos intensos e anestesia exigem protocolo próprio.', 'Avaliação obstétrica precisa entrar na decisão.'] },
      { heading: 'Monitorar', bullets: ['PA, perfusão, FR, perdas e contexto obstétrico.', 'Corrigir déficits gradualmente se a paciente estiver estável.'] },
    ],
  },
  lactating: {
    title: 'Lactante',
    summary: 'Lactação aumenta demanda hídrica e pode mascarar queda de consumo oral.',
    sections: [
      { heading: 'O que muda', bullets: ['Necessidade basal pode subir.', 'Ingestão oral e produção láctea ajudam a interpretar o caso.'] },
      { heading: 'Quando reduzir', bullets: ['Cardiopatia, insuficiência renal e anestesia reduzem a margem de segurança.', 'Não assumir que toda demanda alta justifica volume alto IV.'] },
      { heading: 'Monitorar', bullets: ['Peso, ingestão oral, diurese, FR e exame clínico seriado.', 'Separar déficits reais de demanda fisiológica.'] },
    ],
  },
  obese: {
    title: 'Obeso',
    summary: 'Obesidade pede cautela com o peso usado no cálculo para não superestimar volume.',
    sections: [
      { heading: 'O que muda', bullets: ['Preferir peso ideal ou ajustado para manutenção e reposição.', 'Bolus seguem guiados pela perfusão real.'] },
      { heading: 'Risco', bullets: ['Sobrecarga, hipoventilação e superestimação do volume distribuível.', 'Anestesia e cardiopatia elevam o risco.'] },
      { heading: 'Monitorar', bullets: ['FR, esforço, ausculta, peso e resposta hemodinâmica.', 'Documentar quando o cálculo usar peso ideal.'] },
    ],
  },
};

export const comorbidityContent: Record<Comorbidity, InfoContent> = {
  cardiopatia: {
    title: 'Cardiopatia / ICC',
    summary: 'Evitar precipitar congestão. Hipotensão em CHF não se corrige cegamente com mais fluido.',
    sections: [
      { heading: 'O que muda', bullets: ['Priorizar água enteral e dieta úmida quando possível.', 'Se IV for necessário, usar estratégia conservadora.'] },
      { heading: 'Quando reduzir', bullets: ['Ao primeiro sinal de taquipneia, esforço, quemoses ou ganho rápido de peso.', 'Hipotensão pode apontar para vasoativo/inotrópico.'] },
      { heading: 'Monitorar', bullets: ['FR em repouso, ausculta, peso, PA, diurese e perfusão.', 'Suspender ou reduzir fluidos se sobrecarga aparecer.'] },
    ],
    footer: 'AAHA cita 0,45% NaCl + 2,5% dextrose em meia a uma manutenção diária como opção conservadora em alguns cenários.',
  },
  doenca_renal: {
    title: 'Doença renal / Oligúria / Anúria',
    summary: 'Fluidoterapia apoia o rim corrigindo anormalidades tratáveis; não é o tratamento da azotemia isoladamente.',
    sections: [
      { heading: 'O que muda', bullets: ['Em não hipotensos, corrigir desidratação gradualmente.', 'Em insuficiência renal importante, ir mais devagar.'] },
      { heading: 'Quando sair da manutenção', bullets: ['Oligúria, anúria e azotemia progressiva exigem protocolo renal específico.', 'Não perseguir pressão com volume sem resposta.'] },
      { heading: 'Monitorar', bullets: ['Peso, diurese, azotemia, PA, ausculta, FR e eletrólitos.', 'Balanço hídrico rigoroso e sinais de sobrecarga são centrais.'] },
    ],
  },
  tce: {
    title: 'TCE / TBI',
    summary: 'A meta é euvolemia com perfusão adequada, evitando hipovolemia, hipotonicidade e hiper-hidratação.',
    sections: [
      { heading: 'O que muda', bullets: ['Não usar fluidos que reduzam osmolaridade sérica para ressuscitação.', 'Osmoterapia é ferramenta específica, não substituto de perfusão adequada.'] },
      { heading: 'Quando ser conservador', bullets: ['Evitar excesso de cristaloide isotônico.', 'Mannitol exige cautela em hipovolemia, doença renal e ICC.'] },
      { heading: 'Monitorar', bullets: ['Neurológico seriado, pupilas, PA, glicemia, eletrólitos e gasometria/capnografia se disponível.', 'Reavaliar 30 a 60 min após intervenções.'] },
    ],
  },
  hipoalbuminemia: {
    title: 'Hipoalbuminemia',
    summary: 'Edema não exclui hipovolemia. Plasma não corrige albumina de forma simples.',
    sections: [
      { heading: 'O que muda', bullets: ['A perda de pressão oncótica dificulta manter líquido no vaso.', 'Avaliação hemodinâmica deve prevalecer sobre a aparência de edema isolado.'] },
      { heading: 'Alertas', bullets: ['Plasma aumenta albumina pouco; volumes altos são necessários.', 'Não prometer correção simples de albumina com FFP.'] },
      { heading: 'Monitorar', bullets: ['Perfusão, peso, ausculta e perdas em terceiro espaço.', 'Separar objetivo hemodinâmico do objetivo oncótico.'] },
    ],
    footer: 'AAHA cita que cerca de 22 mL/kg de plasma seriam necessários para elevar albumina em 0,5 g/dL.',
  },
  anemia: {
    title: 'Anemia / Hemorragia',
    summary: 'Cristaloide não trata anemia. Hemodiluição pode piorar interpretação do hematócrito e da oferta de O2.',
    sections: [
      { heading: 'O que muda', bullets: ['Se hipovolêmico, ressuscitar perfusão primeiro.', 'Se anemia significativa persistir, pensar em hemocomponente.'] },
      { heading: 'Risco', bullets: ['Excesso de fluido mascara PCV/TP.', 'Não usar cristalóide como substituto de sangue.'] },
      { heading: 'Monitorar', bullets: ['Perfusão, lactato, PCV/TP, sangramento e PA.', 'Separar claramente ressuscitação de manutenção.'] },
    ],
  },
  sepse: {
    title: 'Sepse / Vasodilatação',
    summary: 'Manutenção não resolve choque distributivo. Ressuscitação é fase separada e pode precisar vasoativo.',
    sections: [
      { heading: 'O que muda', bullets: ['Bolus fracionados com reavaliação continuam centrais.', 'Pancreatite, anafilaxia, trauma e parvovirose grave podem compartilhar essa lógica.'] },
      { heading: 'Quando sair da manutenção', bullets: ['Se perfusão não responde, pensar cedo em vasoativo.', 'Não insistir em excesso de volume após restaurar volemia.'] },
      { heading: 'Monitorar', bullets: ['PA, lactato, diurese, temperatura, mentação, peso e FR.', 'Sobrecarga pode coexistir com perfusão ruim.'] },
    ],
  },
  anestesia: {
    title: 'Anestesia / Perioperatório',
    summary: 'Taxa inicial deve ser conservadora. Nem toda hipotensão anestésica é falta de volume.',
    sections: [
      { heading: 'O que muda', bullets: ['Ponto de partida prático: 5 mL/kg/h em cães e 3 mL/kg/h em gatos.', 'Reavaliar profundidade anestésica, FC, temperatura, analgesia e hemorragia antes de subir soro.'] },
      { heading: 'Risco', bullets: ['Sobrecarga perioperatória e hemodiluição.', 'A antiga prática de 10 mL/kg/h não é o padrão atual.'] },
      { heading: 'Monitorar', bullets: ['PA, plano anestésico, FC, perfusão, perdas reais e temperatura.', 'Considerar vasopressor/inotrópico quando apropriado.'] },
    ],
  },
};

export const dehydrationScale = [
  { range: '<5%', signs: 'Não detectável ao exame clínico.' },
  { range: '5-6%', signs: 'Alteração muito sutil e mucosa pegajosa.' },
  { range: '6-8%', signs: 'Diminuição do turgor e mucosas secas.' },
  { range: '8-10%', signs: 'Olhos mais fundos e TPC começando a prolongar.' },
  { range: '10-12%', signs: 'Tenda cutânea persistente e sinais de hipovolemia ou choque.' },
  { range: '>12%', signs: 'Choque hipovolêmico e risco de morte.' },
];

export const maintenanceGuide = [
  { label: 'Gatos estáveis', detail: '40 a 50 mL/kg/dia é faixa de referência útil.' },
  { label: 'Cães pequenos e médios', detail: '60 mL/kg/dia pode ser ponto de partida tradicional.' },
  { label: 'Cães gigantes', detail: '30 a 40 mL/kg/dia evita superestimação por kg.' },
  { label: 'Filhotes', detail: '80 a 90 mL/kg/dia pode ser necessário com reavaliação.' },
  { label: 'Neonatos', detail: '100 a 140 mL/kg/dia existe em cenários específicos, nunca como número cego.' },
];

export const lossSizePresets: Record<AnimalSize, { label: string; mlPerKg: number }> = {
  mini: { label: 'Mini', mlPerKg: 2 },
  small: { label: 'Pequeno', mlPerKg: 2.5 },
  medium: { label: 'Médio', mlPerKg: 3 },
  large: { label: 'Grande', mlPerKg: 3.5 },
  giant: { label: 'Gigante', mlPerKg: 4 },
};

export const resuscitationPresets: ResuscitationPreset[] = [
  {
    id: 'canine-standard',
    species: 'canine',
    label: '🏥 Cão padrão hipovolêmico',
    defaultMlKg: 15,
    minMlKg: 10,
    maxMlKg: 20,
    summary: 'Bolus inicial fracionado em RL, com reavaliação ao fim de cada alíquota.',
    why: ['AAHA sustenta bolus iniciais de 15 a 20 mL/kg em 15 a 30 min para cães.', 'A prática moderna privilegia alíquotas, não choque inteiro de uma vez.'],
    monitor: ['FC, pulso, mucosas/TPC, PA, lactato, FR e ausculta.', 'Parar se sinais de sobrecarga aparecerem.'],
    stopWhen: ['Perfusão melhorar.', 'FR ou ausculta piorarem.', 'Não houver resposta e a fisiologia apontar para vasoativo ou hemorragia.'],
  },
  {
    id: 'canine-cardiac',
    species: 'canine',
    label: '❤️ Cão cardiopata',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Abordagem conservadora com alíquotas menores e vigilância respiratória agressiva.',
    why: ['Cardiopatia aumenta risco de edema pulmonar.', 'Hipotensão pode exigir inotrópico ou vasopressor, não mais soro.'],
    monitor: ['FR, esforço, ausculta, peso, PA e perfusão.', 'Reavaliar antes de cada novo bolus.'],
    stopWhen: ['Taquipneia, crepitações, quemoses ou corrimento nasal seroso.', 'Ausência de resposta apesar de bolus cautelosos.'],
  },
  {
    id: 'canine-renal',
    species: 'canine',
    label: '💧 Cão renal',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Preserva reanimação quando necessário, mas com olhar restrito para sobrecarga.',
    why: ['Rins doentes não lidam bem com excesso de volume.', 'Oligúria ou anúria exigem protocolo específico.'],
    monitor: ['Diurese, peso, FR, ausculta, PA e azotemia.', 'Não perseguir pressão com volume sem resposta.'],
    stopWhen: ['Diurese não acompanha, peso sobe ou sinais respiratórios aparecem.', 'Perfusão seguir ruim apesar de alíquotas adequadas.'],
  },
  {
    id: 'canine-septic',
    species: 'canine',
    label: '🌡️ Cão séptico',
    defaultMlKg: 15,
    minMlKg: 10,
    maxMlKg: 20,
    summary: 'Choque distributivo pede bolus fracionados e avaliação precoce de vasoativo.',
    why: ['Manutenção não resolve vasodilatação.', 'Perfusão pode não responder apenas com cristaloide.'],
    monitor: ['PA, lactato, mentação, diurese, temperatura e FR.', 'Observar vazamento capilar e edema.'],
    stopWhen: ['Lactato e perfusão melhorarem.', 'Persistir hipotensão e necessidade de vasoativo ficar clara.'],
  },
  {
    id: 'canine-tbi',
    species: 'canine',
    label: '🧠 Cão com TCE',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Meta é perfusão sem hiper-hidratação. RL continua como bolus padrão nesta tela.',
    why: ['TCE pede euvolemia e pressão adequadas.', 'Se houver indicação osmoterápica, ela entra no módulo específico.'],
    monitor: ['Neurológico seriado, pupilas, PA, glicemia, FR e ausculta.', 'Evitar sobrecarga e hipotonicidade.'],
    stopWhen: ['Perfusão estabilizar.', 'Piora neurológica ou respiratória exigir replanejamento.'],
  },
  {
    id: 'feline-standard',
    species: 'feline',
    label: '🏥 Gato padrão hipovolêmico',
    defaultMlKg: 10,
    minMlKg: 5,
    maxMlKg: 15,
    summary: 'Gatos exigem bolus menores e reavaliação mais curta.',
    why: ['AAHA trabalha com 5 a 10 mL/kg em 15 a 30 min para bolus iniciais.', 'Choque felino pode ser mais traiçoeiro.'],
    monitor: ['FR, esforço, ausculta, pulso, temperatura e PA.', 'Bradicardia não exclui choque em gato.'],
    stopWhen: ['Perfusão melhorar.', 'Qualquer sinal de sobrecarga surgir.'],
  },
  {
    id: 'feline-cardiac',
    species: 'feline',
    label: '❤️ Gato cardiopata',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Alíquota pequena e decisão guiada por ausculta, FR e perfusão.',
    why: ['Gatos são sensíveis a edema pulmonar e derrame pleural.', 'Mais volume raramente é a primeira resposta para hipotensão em cardiopata.'],
    monitor: ['FR, ausculta, PA, peso, perfusão e temperatura.', 'Reavaliação após cada alíquota.'],
    stopWhen: ['FR subir ou ausculta piorar.', 'Perfusão não responder e a fisiologia sugerir vasoativo ou inotrópico.'],
  },
  {
    id: 'feline-renal',
    species: 'feline',
    label: '💧 Gato renal',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Alíquotas pequenas com foco em diurese e sobrecarga.',
    why: ['Oligúria ou anúria tornam excesso de volume especialmente perigoso.', 'Correção de desidratação em estável deve ser lenta.'],
    monitor: ['Diurese, peso, FR, ausculta, PA e azotemia.'],
    stopWhen: ['Não houver resposta hemodinâmica.', 'Sinais de sobrecarga surgirem.'],
  },
  {
    id: 'feline-septic',
    species: 'feline',
    label: '🌡️ Gato séptico',
    defaultMlKg: 7.5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Bolus fracionado, aquecimento e reavaliação hemodinâmica precoce.',
    why: ['Vasodilatação e permeabilidade aumentada podem coexistir com risco alto de sobrecarga.', 'Gatos compensam de forma menos óbvia.'],
    monitor: ['Temperatura, PA, lactato, mentação, FR e perfusão.'],
    stopWhen: ['Perfusão melhorar ou precisar migrar para vasoativo.'],
  },
  {
    id: 'feline-tbi',
    species: 'feline',
    label: '🧠 Gato com TCE',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Perfusão sem excesso, com transição rápida para avaliação neurológica e osmoterapia quando indicada.',
    why: ['TCE não tolera hipotensão nem hiper-hidratação.', 'Bolus menor reduz risco de sobrecarga felina.'],
    monitor: ['Neurológico seriado, pupilas, PA, FR, ausculta e glicemia.'],
    stopWhen: ['Perfusão estabilizar.', 'Piora neurológica ou respiratória ocorrer.'],
  },
];

export const tcePrinciples = [
  'TCE pede euvolemia e perfusão adequada.',
  'Evitar hipovolemia, hiper-hidratação e fluidos que reduzam osmolaridade sérica.',
  'Monitorar neurologicamente em série e reavaliar pressão e perfusão após cada intervenção.',
];

export const mgcsSections = [
  {
    title: 'Atividade motora',
    rows: [
      ['6', 'Normal'],
      ['5', 'Hemiparesia, tetraparesia ou atividade descerebrada'],
      ['4', 'Recumbente com rigidez extensora intermitente'],
      ['3', 'Recumbente com rigidez extensora constante'],
      ['2', 'Recumbente com rigidez extensora constante e opistótono'],
      ['1', 'Recumbente, hipotonia muscular, reflexos deprimidos ou ausentes'],
    ],
  },
  {
    title: 'Reflexos de tronco encefálico',
    rows: [
      ['6', 'PLR normal e oculocefálico normal'],
      ['5', 'PLR lento e oculocefálico normal a reduzido'],
      ['4', 'Miose bilateral sem resposta e oculocefálico normal a reduzido'],
      ['3', 'Pupilas puntiformes e oculocefálico reduzido ou ausente'],
      ['2', 'Midríase unilateral sem resposta e oculocefálico reduzido ou ausente'],
      ['1', 'Midríase bilateral sem resposta e oculocefálico reduzido ou ausente'],
    ],
  },
  {
    title: 'Nível de consciência',
    rows: [
      ['6', 'Alerta ocasional, responsivo ao ambiente'],
      ['5', 'Depressão ou delirium, responde mas inadequadamente'],
      ['4', 'Semicoma, responde a estímulo visual'],
      ['3', 'Semicoma, responde a estímulo auditivo'],
      ['2', 'Semicoma, responde só a estímulo nociceptivo repetido'],
      ['1', 'Coma, sem resposta a estímulo nociceptivo repetido'],
    ],
  },
];

export const puppyElectrolyteTables = {
  canine: [
    { age: '2-3 meses', chloride: '99-120 mEq/L', potassium: '4,5-6,3 mEq/L', sodium: '140-156 mEq/L', magnesium: '1,4-5,2 mEq/L', phosphorus: '6,4-11,3 mg/dL' },
    { age: '4-6 meses', chloride: '99-120 mEq/L', potassium: '3,9-6,1 mEq/L', sodium: '139-159 mEq/L', magnesium: '1,4-5,2 mEq/L', phosphorus: '5,6-9,6 mg/dL' },
    { age: '7-12 meses', chloride: '99-120 mEq/L', potassium: '4,2-5,6 mEq/L', sodium: '138-158 mEq/L', magnesium: '1,4-5,2 mEq/L', phosphorus: '3,5-7,8 mg/dL' },
  ],
  feline: [
    { age: '<3 meses', chloride: '97-125 mEq/L', potassium: '3,7-6,1 mEq/L', sodium: '143-160 mEq/L', magnesium: '1,2-5,2 mEq/L', phosphorus: '6,5-10,1 mg/dL' },
    { age: '4-6 meses', chloride: '102-122 mEq/L', potassium: '4,2-5,8 mEq/L', sodium: '143-160 mEq/L', magnesium: '1,2-5,2 mEq/L', phosphorus: '6-10,4 mg/dL' },
    { age: '7-12 meses', chloride: '104-124 mEq/L', potassium: '3,7-5,3 mEq/L', sodium: '143-160 mEq/L', magnesium: '1,2-5,2 mEq/L', phosphorus: '4,5-8,5 mg/dL' },
  ],
};

export const protocols: ProtocolContent[] = [
  {
    id: 'hypovolemia',
    title: 'Hipovolemia / Choque',
    summary: 'Problema do compartimento intravascular. Requer bolus fracionado e reavaliação, não manutenção.',
    why: ['Perfusão inadequada derruba entrega de oxigênio.', 'Hipovolemia e desidratação podem coexistir, mas não são a mesma coisa.'],
    goals: ['Restaurar perfusão.', 'Usar alíquotas com reavaliação.', 'Migrar cedo para vasoativo ou hemocomponente se o problema não for volume isolado.'],
    preferred: ['RL para bolus nesta tela.', 'Alíquotas de 15 a 20 mL/kg em cães e 5 a 10 mL/kg em gatos como referência didática.'],
    avoid: ['Misturar bolus com manutenção.', 'Dar volume de choque inteiro de uma vez.', 'Usar hipotonicidade para ressuscitação.'],
    monitor: ['FC, pulso, mucosas/TPC, PA, lactato, FR, ausculta e diurese.'],
  },
  {
    id: 'dehydration',
    title: 'Desidratação',
    summary: 'Déficit do interstício e intracelular. Correção sustentada geralmente em 12 a 24 h em estáveis.',
    why: ['Um bolus rápido não reidrata o interstício de forma duradoura.', 'Pode coexistir com hipovolemia e perdas contínuas.'],
    goals: ['Calcular déficit.', 'Definir janela de correção coerente.', 'Somar perdas contínuas sem misturar ressuscitação.'],
    preferred: ['Reposição balanceada com ajuste por comorbidades.', '24 a 48 h se crônico, debilitado ou cardiopata.'],
    avoid: ['Tratar como choque quando o paciente está perfundindo bem.', 'Esquecer de pesar o paciente.'],
    monitor: ['Peso, mucosas, turgor, olhos, FR, diurese e eletrólitos.'],
  },
  {
    id: 'cardiac',
    title: 'Cardiopatia / ICC',
    summary: 'Evitar desencadear congestão e reconhecer cedo quando a hipotensão não é por falta de volume.',
    why: ['Pré-carga excessiva precipita edema pulmonar e efusões.', 'Pacientes com CHF pedem estratégia conservadora.'],
    goals: ['Manter hidratação mínima eficaz.', 'Priorizar via enteral quando possível.', 'Considerar inotrópico ou vasoativo quando a hemodinâmica pedir.'],
    preferred: ['Água enteral ou dieta úmida.', '0,45% NaCl + 2,5% dextrose em meia a uma manutenção diária quando IV for inevitável.'],
    avoid: ['Bolus cegos.', 'Escalar fluido para toda hipotensão.'],
    monitor: ['FR em repouso, ausculta, peso, PA, diurese e perfusão.'],
  },
  {
    id: 'renal',
    title: 'Doença renal / Oligúria / Anúria',
    summary: 'Não tratar azotemia com soro como se fosse objetivo isolado.',
    why: ['Excesso de volume pode piorar rapidamente o estado respiratório.', 'Oligúria e anúria exigem salto para protocolo renal estreito.'],
    goals: ['Corrigir anormalidades tratáveis.', 'Repor desidratação gradualmente em não hipotensos.', 'Seguir diurese e peso de perto.'],
    preferred: ['Balanceados em muitos cenários.', 'Ajuste fino guiado por perfusão, diurese e eletrólitos.'],
    avoid: ['Forçar diurese com volume sem resposta.', 'Ignorar ganho de peso e ausculta.'],
    monitor: ['Peso, diurese, azotemia, PA, FR, ausculta e eletrólitos.'],
  },
  {
    id: 'tce',
    title: 'TCE',
    summary: 'Euvolemia com perfusão adequada e osmoterapia quando indicada, sem excesso.',
    why: ['Hipotensão agrava lesão secundária.', 'Hipotonicidade e excesso de água pioram risco neurológico.'],
    goals: ['Evitar hipovolemia.', 'Evitar hiper-hidratação.', 'Acionar osmoterapia com monitorização real.'],
    preferred: ['Cristaloide isotônico para euvolemia.', 'Hipertônica ou mannitol no módulo específico, conforme contexto.'],
    avoid: ['Fluidos hipotônicos.', 'Reduzir TCE a uma tela de dose.'],
    monitor: ['Neurológico seriado, pupilas, PA, glicemia, eletrólitos e capnografia/gasometria se disponível.'],
  },
  {
    id: 'sepsis',
    title: 'Sepse / Vasodilatação',
    summary: 'Choque distributivo não se resolve com manutenção.',
    why: ['Há vasodilatação, permeabilidade aumentada e possível hipovolemia relativa ou absoluta.', 'Muitos pacientes vão precisar vasoativo.'],
    goals: ['Ressuscitar em fase separada.', 'Reavaliar resposta perfusional após cada alíquota.', 'Evitar excesso de fluido depois que a volemia foi recuperada.'],
    preferred: ['Alíquotas de cristaloide com reavaliação.', 'Vasoativo quando perfusão não responde.'],
    avoid: ['Chamar manutenção de tratamento do choque.', 'Atrasar decisão de vasoativo.'],
    monitor: ['PA, lactato, diurese, mentação, FR, temperatura e peso.'],
  },
  {
    id: 'hypoalbuminemia',
    title: 'Hipoalbuminemia',
    summary: 'Edema não exclui hipovolemia e plasma não é atalho para subir albumina de forma significativa.',
    why: ['A baixa pressão oncótica dificulta manter líquido no vascular.', 'Volumes altos de plasma geram mudança modesta na albumina.'],
    goals: ['Avaliar perfusão real.', 'Evitar promessas irreais com plasma.', 'Monitorar terceiro espaço e sobrecarga.'],
    preferred: ['Estratégia conservadora e contextualizada.', 'Separar objetivo hemodinâmico do oncótico.'],
    avoid: ['Usar plasma como resposta simplista.', 'Ignorar edema e perfusão ao mesmo tempo.'],
    monitor: ['Peso, FR, ausculta, perfusão, perdas e resposta clínica.'],
  },
  {
    id: 'anemia',
    title: 'Anemia / Hemorragia',
    summary: 'Cristaloide não corrige oferta de O2 em anemia significativa.',
    why: ['Hemodiluição pode piorar a situação.', 'Hemorragia pode exigir hemocomponente.'],
    goals: ['Ressuscitar hipovolemia quando presente.', 'Pensar em sangue quando a fisiologia pedir.', 'Evitar excesso de cristalóide.'],
    preferred: ['Bolus guiado por perfusão se houver choque.', 'Transfusão quando indicada.'],
    avoid: ['Tratar anemia com soro.', 'Esquecer que fluidos mudam o hematócrito.'],
    monitor: ['PA, lactato, PCV/TP, perfusão e sangramento ativo.'],
  },
  {
    id: 'vomit-alkalosis',
    title: 'Vômitos + alcalose metabólica hipoclorêmica',
    summary: 'Perda gástrica tende a puxar cloro e pode direcionar a escolha do fluido.',
    why: ['Hipocloremia e alcalose sustentam sinais clínicos.', 'NaCl 0,9% ganha relevância em muitos desses pacientes.'],
    goals: ['Repor volume e cloro.', 'Somar perdas contínuas.', 'Acompanhar potássio.'],
    preferred: ['NaCl 0,9% quando a alcalose hipoclorêmica dominar o quadro.', 'KCl com segurança se necessário.'],
    avoid: ['Ignorar acidobase e eletrólitos.', 'Bolusar KCl.'],
    monitor: ['Cloro, sódio, potássio, acidobase, perdas e perfusão.'],
  },
  {
    id: 'diarrhea-acidosis',
    title: 'Diarreia + acidose metabólica',
    summary: 'Perdas entéricas podem pedir cristalóide balanceado e reposição de perdas contínuas.',
    why: ['Acidose e hipocalemia são frequentes.', 'Subestimar a perda entérica atrasa a recuperação.'],
    goals: ['Repor volume, déficits e perdas.', 'Corrigir potássio e acidobase.', 'Monitorar peso e diurese.'],
    preferred: ['RL ou outro balanceado em muitos cenários.', 'Suplementação de potássio quando indicada.'],
    avoid: ['Chamar grande perda entérica de manutenção.', 'Esquecer de medir ou estimar perdas.'],
    monitor: ['Potássio, acidobase, FR, diurese, peso e perfusão.'],
  },
  {
    id: 'dka',
    title: 'DKA',
    summary: 'Desidratação, diurese osmótica e perdas de K e P dominam a lógica.',
    why: ['O potássio corporal total costuma estar baixo.', 'Correção agressiva da glicemia é perigosa.'],
    goals: ['Restaurar perfusão.', 'Corrigir desidratação em 24 a 48 h.', 'Repor K e P guiados por monitorização.'],
    preferred: ['Cristaloide apropriado ao estado hemodinâmico.', 'Dextrose quando a glicemia cair.'],
    avoid: ['Insulina antes da reposição inicial.', 'Bolus desnecessários em paciente estável.'],
    monitor: ['Glicemia, K, P, acidobase, mentação, diurese e peso.'],
  },
  {
    id: 'hyponatremia',
    title: 'Hiponatremia',
    summary: 'Correção crônica deve ser lenta; hipotonicidade não serve para ressuscitação de hipovolemia.',
    why: ['Correção rápida demais gera dano neurológico.', 'Contexto clínico e tendência importam mais que número isolado.'],
    goals: ['Corrigir causa e volume.', 'Limitar correção a 0,5 mEq/L/h ou 10 a 12 mEq/L/dia em crônicos.', 'Rechecar a cada 4 a 6 h quando relevante.'],
    preferred: ['Ressuscitação apropriada se hipovolêmico.', 'Plano separado para correção do sódio.'],
    avoid: ['Misturar manutenção hipotônica com choque.', 'Acelerar correção sem monitorização.'],
    monitor: ['Sódio seriado, neurológico, balanço e diurese.'],
  },
  {
    id: 'hypernatremia',
    title: 'Hipernatremia',
    summary: 'Correção lenta e calculada, com free water deficit como helper quando fizer sentido.',
    why: ['Queda rápida demais pode precipitar edema cerebral.', 'Hipotonicidade não ressuscita hipovolemia.'],
    goals: ['Corrigir perfusão primeiro se necessário.', 'Planejar redução gradual do sódio.', 'Rechecar sódio a cada 4 a 6 h.'],
    preferred: ['Usar free water deficit como ajuda, não piloto automático.', 'Ajustar com contexto e laboratório real.'],
    avoid: ['Corrigir acima de 0,5 mEq/L/h ou 10 a 12 mEq/L/dia em crônicos.', 'Ignorar perdas contínuas.'],
    monitor: ['Sódio, neurológico, diurese, peso e sinais de volume.'],
  },
  {
    id: 'anesthesia',
    title: 'Anestesia',
    summary: 'Taxa inicial conservadora e interpretação hemodinâmica antes de subir soro.',
    why: ['A prática antiga de 10 mL/kg/h perdeu sustentação.', 'Hipotensão anestésica pode refletir vasodilatação e profundidade anestésica.'],
    goals: ['Começar com 5 mL/kg/h em cães e 3 mL/kg/h em gatos como defaults.', 'Reavaliar antes de aumentar.'],
    preferred: ['Cristaloide de reposição em taxa inicial baixa.', 'Vasoativo ou ajuste anestésico quando apropriado.'],
    avoid: ['Tratar toda hipotensão apenas com fluido.', 'Sobrecarga perioperatória.'],
    monitor: ['PA, FC, profundidade, temperatura, perdas, perfusão e diurese quando relevante.'],
  },
  {
    id: 'neonate-puppy',
    title: 'Neonato / Filhote',
    summary: 'Maior água corporal, reserva menor e necessidade de microcontrole.',
    why: ['Volumes pequenos mudam muito a fisiologia.', 'Hipotermia e hipoglicemia alteram perfusão rapidamente.'],
    goals: ['Prescrição em microvolumes.', 'Aquecimento e glicemia sob vigilância.', 'Usar tabelas etárias para eletrólitos.'],
    preferred: ['Bomba, seringa ou microgotas.', 'Reavaliação muito frequente.'],
    avoid: ['Volumes cegos por kg.', 'Ignorar temperatura e glicose.'],
    monitor: ['Peso, temperatura, glicemia, FR, diurese e perfusão.'],
  },
  {
    id: 'pancreatitis',
    title: 'Pancreatite',
    summary: 'Pode combinar vasodilatação, perdas, dor e terceiro espaço.',
    why: ['A perfusão pancreática piora quando o volume falha.', 'O excesso de fluido também cobra preço.'],
    goals: ['Restaurar perfusão com reavaliação.', 'Somar perdas e terceiro espaço.', 'Controlar dor e monitorar sobrecarga.'],
    preferred: ['Cristaloide balanceado em estratégia individualizada.'],
    avoid: ['Subestimar perdas e vasodilatação.', 'Persistir com volume quando a perfusão não melhora e o risco respiratório sobe.'],
    monitor: ['Perfusão, lactato, FR, ausculta, peso, eletrólitos e perdas contínuas.'],
  },
];

export const monitoringGeneralChecklist = ['Peso corporal seriado', 'Balanço hídrico', 'Entradas', 'Saídas', 'Diurese', 'FR', 'Esforço respiratório', 'Ausculta', 'PA', 'Temperatura', 'Mucosas/TPC', 'Mentação', 'PCV/TP', 'Eletrólitos', 'Lactato se disponível'];

export const monitoringIntervals = [
  { scenario: 'Paciente instável ou com perdas imprevisíveis', interval: 'até q2h' },
  { scenario: 'Paciente estabilizado', interval: 'q4-6h' },
  { scenario: 'TCE no início e após intervenções', interval: 'neuro q30-60 min' },
];

export const overloadSigns = ['Taquipneia', 'Aumento do esforço respiratório', 'Crepitações', 'Quemose', 'Edema periférico', 'Corrimento nasal seroso', 'Ganho agudo de peso', 'Queda de saturação', 'Queda de PCV/TP/USG em contexto compatível'];

export const dilutionExamples = [
  { title: 'NaCl 20% para 7,5% em seringa de 20 mL', stock: '7,5 mL de NaCl 20%', diluent: '12,5 mL de água estéril', result: 'Volume final 20 mL a 7,5%' },
  { title: 'NaCl 20% para 7,2% em bolsa de 100 mL', stock: '36 mL de NaCl 20%', diluent: '64 mL de água estéril', result: 'Volume final 100 mL a 7,2%' },
  { title: 'NaCl 10% para 7,5% em bolsa de 100 mL', stock: '75 mL de NaCl 10%', diluent: '25 mL de água estéril', result: 'Volume final 100 mL a 7,5%' },
];
