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
    summary: 'Adultos estaveis podem partir de formulas usuais, mas ainda exigem prescricao individualizada.',
    sections: [
      { heading: 'O que muda', bullets: ['Usar manutencao como classe de necessidade, nao como atalho.', 'Sempre separar ressuscitacao, reidratacao, perdas continuas e manutencao.'] },
      { heading: 'Quando ser conservador', bullets: ['Se houver cardiopatia, doenca renal, anestesia, TCE ou sinais de sobrecarga.', 'Quando o exame sugerir que o problema principal nao e manutencao.'] },
      { heading: 'Monitorar', bullets: ['Peso seriado, FR, esforco respiratorio, ausculta, diurese, PA e eletrólitos.', 'Balanço hidrico e resposta clinica precisam acompanhar a taxa prescrita.'] },
    ],
  },
  puppy: {
    title: 'Filhote',
    summary: 'Filhotes tem maior agua corporal total, menor reserva e risco maior de hipoglicemia e sobrecarga.',
    sections: [
      { heading: 'O que muda', bullets: ['Necessidade basal pode ser maior que em adultos.', 'Volumes pequenos representam grande fracao do volume circulante.'] },
      { heading: 'Riscos', bullets: ['Hipoglicemia, hipotermia e sobrecarga.', 'Interpretacao laboratorial deve respeitar faixas etarias.'] },
      { heading: 'Monitorar', bullets: ['Peso, temperatura, glicemia, diurese e FR.', 'Microgotas ou bomba sao preferiveis quando o volume e pequeno.'] },
    ],
    footer: 'Se houver hipoperfusao, sair da logica de manutencao e ir para ressuscitacao fracionada.',
  },
  neonate: {
    title: 'Neonato',
    summary: 'Neonatos exigem abordagem microdosada, aquecimento e vigilancia estreita.',
    sections: [
      { heading: 'O que muda', bullets: ['Maior agua corporal total e necessidade por kg mais alta.', 'Nao toleram jejum, hipotermia nem erro pequeno de volume.'] },
      { heading: 'Quando reduzir', bullets: ['Ao menor sinal de sobrecarga ou perfusao incerta.', 'Sempre usar metas curtas de reavaliacao.'] },
      { heading: 'Monitorar', bullets: ['Peso, temperatura, glicemia, perfusao, sucção e diurese.', 'Reavaliar acesso e aquecimento a cada intervencao.'] },
    ],
  },
  senior: {
    title: 'Idoso',
    summary: 'Pacientes idosos podem ter reserva cardiaca e renal menor mesmo sem diagnostico fechado.',
    sections: [
      { heading: 'O que muda', bullets: ['Comecar de forma conservadora e revisar cedo.', 'Valorizar tendencia laboratorial e pressao arterial.'] },
      { heading: 'Risco', bullets: ['Sobrecarga, azotemia e descompensacao anestesica.', 'Doenca cronica oculta pode aparecer apos excesso de volume.'] },
      { heading: 'Monitorar', bullets: ['FR, ausculta, peso, diurese, PA e creatinina.', 'Nao confiar em um unico numero fixo de manutencao.'] },
    ],
  },
  pregnant: {
    title: 'Gestante',
    summary: 'Gestacao altera distribuicao de volume e perfusao; manter estabilidade materna e central.',
    sections: [
      { heading: 'O que muda', bullets: ['Evitar hipotensao e hipoperfusao materna.', 'Ser conservador com excesso de sodio e agua.'] },
      { heading: 'Quando sair da manutencao', bullets: ['Hemorragia, sepse, vomitos intensos e anestesia exigem protocolo proprio.', 'Avaliacao obstetrica precisa entrar na decisao.'] },
      { heading: 'Monitorar', bullets: ['PA, perfusao, FR, perdas e contexto obstetrico.', 'Corrigir deficits gradualmente se a paciente estiver estavel.'] },
    ],
  },
  lactating: {
    title: 'Lactante',
    summary: 'Lactacao aumenta demanda hidrica e pode mascarar queda de consumo oral.',
    sections: [
      { heading: 'O que muda', bullets: ['Necessidade basal pode subir.', 'Ingestao oral e producao lactea ajudam a interpretar o caso.'] },
      { heading: 'Quando reduzir', bullets: ['Cardiopatia, insuficiencia renal e anestesia reduzem a margem de seguranca.', 'Nao assumir que toda demanda alta justifica volume alto IV.'] },
      { heading: 'Monitorar', bullets: ['Peso, ingestao oral, diurese, FR e exame clinico seriado.', 'Separar deficits reais de demanda fisiologica.'] },
    ],
  },
  obese: {
    title: 'Obeso',
    summary: 'Obesidade pede cautela com o peso usado no calculo para nao superestimar volume.',
    sections: [
      { heading: 'O que muda', bullets: ['Preferir peso ideal ou ajustado para manutencao e reposicao.', 'Bolus seguem guiados pela perfusao real.'] },
      { heading: 'Risco', bullets: ['Sobrecarga, hipoventilacao e superestimacao do volume distribuivel.', 'Anestesia e cardiopatia elevam o risco.'] },
      { heading: 'Monitorar', bullets: ['FR, esforco, ausculta, peso e resposta hemodinamica.', 'Documentar quando o calculo usar peso ideal.'] },
    ],
  },
};

export const comorbidityContent: Record<Comorbidity, InfoContent> = {
  cardiopatia: {
    title: 'Cardiopatia / ICC',
    summary: 'Evitar precipitar congestao. Hipotensao em CHF nao se corrige cegamente com mais fluido.',
    sections: [
      { heading: 'O que muda', bullets: ['Priorizar agua enteral e dieta umida quando possivel.', 'Se IV for necessario, usar estrategia conservadora.'] },
      { heading: 'Quando reduzir', bullets: ['Ao primeiro sinal de taquipneia, esforco, quemoses ou ganho rapido de peso.', 'Hipotensao pode apontar para vasoativo/inotropico.'] },
      { heading: 'Monitorar', bullets: ['FR em repouso, ausculta, peso, PA, diurese e perfusao.', 'Suspender ou reduzir fluidos se sobrecarga aparecer.'] },
    ],
    footer: 'AAHA cita 0,45% NaCl + 2,5% dextrose em meia a uma manutencao diaria como opcao conservadora em alguns cenarios.',
  },
  doenca_renal: {
    title: 'Doenca renal / Oliguria / Anuria',
    summary: 'Fluidoterapia apoia o rim corrigindo anormalidades trataveis; nao e o tratamento da azotemia isoladamente.',
    sections: [
      { heading: 'O que muda', bullets: ['Em nao hipotensos, corrigir desidratacao gradualmente.', 'Em insuficiencia renal importante, ir mais devagar.'] },
      { heading: 'Quando sair da manutencao', bullets: ['Oliguria, anuria e azotemia progressiva exigem protocolo renal especifico.', 'Nao perseguir pressao com volume sem resposta.'] },
      { heading: 'Monitorar', bullets: ['Peso, diurese, azotemia, PA, ausculta, FR e eletrólitos.', 'Balanço hidrico rigoroso e sinais de sobrecarga sao centrais.'] },
    ],
  },
  tce: {
    title: 'TCE / TBI',
    summary: 'A meta e euvolemia com perfusao adequada, evitando hipovolemia, hipotonicidade e hiperhidratacao.',
    sections: [
      { heading: 'O que muda', bullets: ['Nao usar fluidos que reduzam osmolaridade serica para ressuscitacao.', 'Osmoterapia e ferramenta especifica, nao substituto de perfusao adequada.'] },
      { heading: 'Quando ser conservador', bullets: ['Evitar excesso de cristaloide isotônico.', 'Mannitol exige cautela em hipovolemia, doenca renal e ICC.'] },
      { heading: 'Monitorar', bullets: ['Neurologico seriado, pupilas, PA, glicemia, eletrólitos e gasometria/capnografia se disponivel.', 'Reavaliar 30 a 60 min apos intervencoes.'] },
    ],
  },
  hipoalbuminemia: {
    title: 'Hipoalbuminemia',
    summary: 'Edema nao exclui hipovolemia. Plasma nao corrige albumina de forma simples.',
    sections: [
      { heading: 'O que muda', bullets: ['A perda de pressao oncotica dificulta manter liquido no vaso.', 'Avaliacao hemodinamica deve prevalecer sobre a aparencia de edema isolado.'] },
      { heading: 'Alertas', bullets: ['Plasma aumenta albumina pouco; volumes altos sao necessarios.', 'Nao prometer correcao simples de albumina com FFP.'] },
      { heading: 'Monitorar', bullets: ['Perfusao, peso, ausculta e perdas em terceiro espaco.', 'Separar objetivo hemodinamico do objetivo oncotico.'] },
    ],
    footer: 'AAHA cita que cerca de 22 mL/kg de plasma seriam necessarios para elevar albumina em 0,5 g/dL.',
  },
  anemia: {
    title: 'Anemia / Hemorragia',
    summary: 'Cristaloide nao trata anemia. Hemodiluicao pode piorar interpretacao do hematocrito e da oferta de O2.',
    sections: [
      { heading: 'O que muda', bullets: ['Se hipovolemico, ressuscitar perfusao primeiro.', 'Se anemia significativa persistir, pensar em hemocomponente.'] },
      { heading: 'Risco', bullets: ['Excesso de fluido mascara PCV/TP.', 'Nao usar cristalóide como substituto de sangue.'] },
      { heading: 'Monitorar', bullets: ['Perfusao, lactato, PCV/TP, sangramento e PA.', 'Separar claramente ressuscitacao de manutencao.'] },
    ],
  },
  sepse: {
    title: 'Sepse / Vasodilatacao',
    summary: 'Manutencao nao resolve choque distributivo. Ressuscitacao e fase separada e pode precisar vasoativo.',
    sections: [
      { heading: 'O que muda', bullets: ['Bolus fracionados com reavaliacao continuam centrais.', 'Pancreatite, anafilaxia, trauma e parvovirose grave podem compartilhar essa logica.'] },
      { heading: 'Quando sair da manutencao', bullets: ['Se perfusao nao responde, pensar cedo em vasoativo.', 'Nao insistir em excesso de volume apos restaurar volemia.'] },
      { heading: 'Monitorar', bullets: ['PA, lactato, diurese, temperatura, mentacao, peso e FR.', 'Sobrecarga pode coexistir com perfusao ruim.'] },
    ],
  },
  anestesia: {
    title: 'Anestesia / Perioperatorio',
    summary: 'Taxa inicial deve ser conservadora. Nem toda hipotensao anestesica e falta de volume.',
    sections: [
      { heading: 'O que muda', bullets: ['Ponto de partida pratico: 5 mL/kg/h em caes e 3 mL/kg/h em gatos.', 'Reavaliar profundidade anestesica, FC, temperatura, analgesia e hemorragia antes de subir soro.'] },
      { heading: 'Risco', bullets: ['Sobrecarga perioperatoria e hemodiluicao.', 'A antiga pratica de 10 mL/kg/h nao e o padrao atual.'] },
      { heading: 'Monitorar', bullets: ['PA, plano anestesico, FC, perfusao, perdas reais e temperatura.', 'Considerar vasopressor/inotropico quando apropriado.'] },
    ],
  },
};

export const dehydrationScale = [
  { range: '<5%', signs: 'Nao detectavel ao exame clinico.' },
  { range: '5-6%', signs: 'Alteracao muito sutil e mucosa pegajosa.' },
  { range: '6-8%', signs: 'Diminuicao do turgor e mucosas secas.' },
  { range: '8-10%', signs: 'Olhos mais fundos e TPC comecando a prolongar.' },
  { range: '10-12%', signs: 'Tenda cutanea persistente e sinais de hipovolemia ou choque.' },
  { range: '>12%', signs: 'Choque hipovolemico e risco de morte.' },
];

export const maintenanceGuide = [
  { label: 'Gatos estaveis', detail: '40 a 50 mL/kg/dia e faixa de referencia util.' },
  { label: 'Caes pequenos e medios', detail: '60 mL/kg/dia pode ser ponto de partida tradicional.' },
  { label: 'Caes gigantes', detail: '30 a 40 mL/kg/dia evita superestimacao por kg.' },
  { label: 'Filhotes', detail: '80 a 90 mL/kg/dia pode ser necessario com reavaliacao.' },
  { label: 'Neonatos', detail: '100 a 140 mL/kg/dia existe em cenarios especificos, nunca como numero cego.' },
];

export const lossSizePresets: Record<AnimalSize, { label: string; mlPerKg: number }> = {
  mini: { label: 'Mini', mlPerKg: 2 },
  small: { label: 'Pequeno', mlPerKg: 2.5 },
  medium: { label: 'Medio', mlPerKg: 3 },
  large: { label: 'Grande', mlPerKg: 3.5 },
  giant: { label: 'Gigante', mlPerKg: 4 },
};

export const resuscitationPresets: ResuscitationPreset[] = [
  {
    id: 'canine-standard',
    species: 'canine',
    label: 'Cao padrao hipovolemico',
    defaultMlKg: 15,
    minMlKg: 10,
    maxMlKg: 20,
    summary: 'Bolus inicial fracionado em RL, com reavaliacao ao fim de cada aliquota.',
    why: ['AAHA sustenta bolus iniciais de 15 a 20 mL/kg em 15 a 30 min para caes.', 'A pratica moderna privilegia aliquotas, nao choque inteiro de uma vez.'],
    monitor: ['FC, pulso, mucosas/TPC, PA, lactato, FR e ausculta.', 'Parar se sinais de sobrecarga aparecerem.'],
    stopWhen: ['Perfusao melhorar.', 'FR ou ausculta piorarem.', 'Nao houver resposta e a fisiologia apontar para vasoativo ou hemorragia.'],
  },
  {
    id: 'canine-cardiac',
    species: 'canine',
    label: 'Cao cardiopata',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Abordagem conservadora com aliquotas menores e vigilancia respiratoria agressiva.',
    why: ['Cardiopatia aumenta risco de edema pulmonar.', 'Hipotensao pode exigir inotropico ou vasopressor, nao mais soro.'],
    monitor: ['FR, esforco, ausculta, peso, PA e perfusao.', 'Reavaliar antes de cada novo bolus.'],
    stopWhen: ['Taquipneia, crepitacoes, quemoses ou corrimento nasal seroso.', 'Ausencia de resposta apesar de bolus cautelosos.'],
  },
  {
    id: 'canine-renal',
    species: 'canine',
    label: 'Cao renal',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Preserva reanimacao quando necessario, mas com olhar restrito para sobrecarga.',
    why: ['Rins doentes nao lidam bem com excesso de volume.', 'Oliguria ou anuria exigem protocolo especifico.'],
    monitor: ['Diurese, peso, FR, ausculta, PA e azotemia.', 'Nao perseguir pressao com volume sem resposta.'],
    stopWhen: ['Diurese nao acompanha, peso sobe ou sinais respiratorios aparecem.', 'Perfusao seguir ruim apesar de aliquotas adequadas.'],
  },
  {
    id: 'canine-septic',
    species: 'canine',
    label: 'Cao septico',
    defaultMlKg: 15,
    minMlKg: 10,
    maxMlKg: 20,
    summary: 'Choque distributivo pede bolus fracionados e avaliacao precoce de vasoativo.',
    why: ['Manutencao nao resolve vasodilatacao.', 'Perfusao pode nao responder apenas com cristaloide.'],
    monitor: ['PA, lactato, mentacao, diurese, temperatura e FR.', 'Observar vazamento capilar e edema.'],
    stopWhen: ['Lactato e perfusao melhorarem.', 'Persistir hipotensao e necessidade de vasoativo ficar clara.'],
  },
  {
    id: 'canine-tbi',
    species: 'canine',
    label: 'Cao com TCE',
    defaultMlKg: 10,
    minMlKg: 10,
    maxMlKg: 15,
    summary: 'Meta e perfusao sem hiperhidratacao. RL continua como bolus padrao nesta tela.',
    why: ['TCE pede euvolemia e pressao adequadas.', 'Se houver indicacao osmoterapica, ela entra no modulo especifico.'],
    monitor: ['Neurologico seriado, pupilas, PA, glicemia, FR e ausculta.', 'Evitar sobrecarga e hipotonicidade.'],
    stopWhen: ['Perfusao estabilizar.', 'Piora neurologica ou respiratoria exigir replanejamento.'],
  },
  {
    id: 'feline-standard',
    species: 'feline',
    label: 'Gato padrao hipovolemico',
    defaultMlKg: 10,
    minMlKg: 5,
    maxMlKg: 15,
    summary: 'Gatos exigem bolus menores e reavaliacao mais curta.',
    why: ['AAHA trabalha com 5 a 10 mL/kg em 15 a 30 min para bolus iniciais.', 'Choque felino pode ser mais traiçoeiro.'],
    monitor: ['FR, esforco, ausculta, pulso, temperatura e PA.', 'Bradicardia nao exclui choque em gato.'],
    stopWhen: ['Perfusao melhorar.', 'Qualquer sinal de sobrecarga surgir.'],
  },
  {
    id: 'feline-cardiac',
    species: 'feline',
    label: 'Gato cardiopata',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Aliquota pequena e decisao guiada por ausculta, FR e perfusao.',
    why: ['Gatos sao sensiveis a edema pulmonar e derrame pleural.', 'Mais volume raramente e a primeira resposta para hipotensao em cardiopata.'],
    monitor: ['FR, ausculta, PA, peso, perfusao e temperatura.', 'Reavaliacao apos cada aliquota.'],
    stopWhen: ['FR subir ou ausculta piorar.', 'Perfusao nao responder e a fisiologia sugerir vasoativo ou inotropico.'],
  },
  {
    id: 'feline-renal',
    species: 'feline',
    label: 'Gato renal',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Aliquotas pequenas com foco em diurese e sobrecarga.',
    why: ['Oliguria ou anuria tornam excesso de volume especialmente perigoso.', 'Correcao de desidratacao em estavel deve ser lenta.'],
    monitor: ['Diurese, peso, FR, ausculta, PA e azotemia.'],
    stopWhen: ['Nao houver resposta hemodinamica.', 'Sinais de sobrecarga surgirem.'],
  },
  {
    id: 'feline-septic',
    species: 'feline',
    label: 'Gato septico',
    defaultMlKg: 7.5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Bolus fracionado, aquecimento e reavaliacao hemodinamica precoce.',
    why: ['Vasodilatacao e permeabilidade aumentada podem coexistir com risco alto de sobrecarga.', 'Gatos compensam de forma menos obvia.'],
    monitor: ['Temperatura, PA, lactato, mentacao, FR e perfusao.'],
    stopWhen: ['Perfusao melhorar ou precisar migrar para vasoativo.'],
  },
  {
    id: 'feline-tbi',
    species: 'feline',
    label: 'Gato com TCE',
    defaultMlKg: 5,
    minMlKg: 5,
    maxMlKg: 10,
    summary: 'Perfusao sem excesso, com transicao rapida para avaliacao neurologica e osmoterapia quando indicada.',
    why: ['TCE nao tolera hipotensao nem hiperhidratacao.', 'Bolus menor reduz risco de sobrecarga felina.'],
    monitor: ['Neurologico seriado, pupilas, PA, FR, ausculta e glicemia.'],
    stopWhen: ['Perfusao estabilizar.', 'Piora neurologica ou respiratoria ocorrer.'],
  },
];

export const tcePrinciples = [
  'TCE pede euvolemia e perfusao adequada.',
  'Evitar hipovolemia, hiperhidratacao e fluidos que reduzam osmolaridade serica.',
  'Monitorar neurologicamente em serie e reavaliar pressao e perfusao apos cada intervencao.',
];

export const mgcsSections = [
  {
    title: 'Atividade motora',
    rows: [
      ['6', 'Normal'],
      ['5', 'Hemiparesia, tetraparesia ou atividade descerebrada'],
      ['4', 'Recumbente com rigidez extensora intermitente'],
      ['3', 'Recumbente com rigidez extensora constante'],
      ['2', 'Recumbente com rigidez extensora constante e opistotono'],
      ['1', 'Recumbente, hipotonia muscular, reflexos deprimidos ou ausentes'],
    ],
  },
  {
    title: 'Reflexos de tronco encefalico',
    rows: [
      ['6', 'PLR normal e oculocefalico normal'],
      ['5', 'PLR lento e oculocefalico normal a reduzido'],
      ['4', 'Miose bilateral sem resposta e oculocefalico normal a reduzido'],
      ['3', 'Pupilas puntiformes e oculocefalico reduzido ou ausente'],
      ['2', 'Midriase unilateral sem resposta e oculocefalico reduzido ou ausente'],
      ['1', 'Midriase bilateral sem resposta e oculocefalico reduzido ou ausente'],
    ],
  },
  {
    title: 'Nivel de consciencia',
    rows: [
      ['6', 'Alerta ocasional, responsivo ao ambiente'],
      ['5', 'Depressao ou delirium, responde mas inadequadamente'],
      ['4', 'Semicoma, responde a estimulo visual'],
      ['3', 'Semicoma, responde a estimulo auditivo'],
      ['2', 'Semicoma, responde so a estimulo nociceptivo repetido'],
      ['1', 'Coma, sem resposta a estimulo nociceptivo repetido'],
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
    summary: 'Problema do compartimento intravascular. Requer bolus fracionado e reavaliacao, nao manutencao.',
    why: ['Perfusao inadequada derruba entrega de oxigenio.', 'Hipovolemia e desidratacao podem coexistir, mas nao sao a mesma coisa.'],
    goals: ['Restaurar perfusao.', 'Usar aliquotas com reavaliacao.', 'Migrar cedo para vasoativo ou hemocomponente se o problema nao for volume isolado.'],
    preferred: ['RL para bolus nesta tela.', 'Aliquotas de 15 a 20 mL/kg em caes e 5 a 10 mL/kg em gatos como referencia didatica.'],
    avoid: ['Misturar bolus com manutencao.', 'Dar volume de choque inteiro de uma vez.', 'Usar hipotonicidade para ressuscitacao.'],
    monitor: ['FC, pulso, mucosas/TPC, PA, lactato, FR, ausculta e diurese.'],
  },
  {
    id: 'dehydration',
    title: 'Desidratacao',
    summary: 'Deficit do intersticio e intracelular. Correcao sustentada geralmente em 12 a 24 h em estaveis.',
    why: ['Um bolus rapido nao reidrata o intersticio de forma duradoura.', 'Pode coexistir com hipovolemia e perdas continuas.'],
    goals: ['Calcular deficit.', 'Definir janela de correcao coerente.', 'Somar perdas continuas sem misturar ressuscitacao.'],
    preferred: ['Reposicao balanceada com ajuste por comorbidades.', '24 a 48 h se cronico, debilitado ou cardiopata.'],
    avoid: ['Tratar como choque quando o paciente esta perfundindo bem.', 'Esquecer de pesar o paciente.'],
    monitor: ['Peso, mucosas, turgor, olhos, FR, diurese e eletrólitos.'],
  },
  {
    id: 'cardiac',
    title: 'Cardiopatia / ICC',
    summary: 'Evitar desencadear congestao e reconhecer cedo quando a hipotensao nao e por falta de volume.',
    why: ['Pre-carga excessiva precipita edema pulmonar e efusoes.', 'Pacientes com CHF pedem estrategia conservadora.'],
    goals: ['Manter hidratacao minima eficaz.', 'Priorizar via enteral quando possivel.', 'Considerar inotropico ou vasoativo quando a hemodinamica pedir.'],
    preferred: ['Agua enteral ou dieta umida.', '0,45% NaCl + 2,5% dextrose em meia a uma manutencao diaria quando IV for inevitavel.'],
    avoid: ['Bolus cegos.', 'Escalar fluido para toda hipotensao.'],
    monitor: ['FR em repouso, ausculta, peso, PA, diurese e perfusao.'],
  },
  {
    id: 'renal',
    title: 'Doenca renal / Oliguria / Anuria',
    summary: 'Nao tratar azotemia com soro como se fosse objetivo isolado.',
    why: ['Excesso de volume pode piorar rapidamente o estado respiratorio.', 'Oliguria e anuria exigem salto para protocolo renal estreito.'],
    goals: ['Corrigir anormalidades trataveis.', 'Repor desidratacao gradualmente em nao hipotensos.', 'Seguir diurese e peso de perto.'],
    preferred: ['Balanceados em muitos cenarios.', 'Ajuste fino guiado por perfusao, diurese e eletrólitos.'],
    avoid: ['Forcar diurese com volume sem resposta.', 'Ignorar ganho de peso e ausculta.'],
    monitor: ['Peso, diurese, azotemia, PA, FR, ausculta e eletrólitos.'],
  },
  {
    id: 'tce',
    title: 'TCE',
    summary: 'Euvolemia com perfusao adequada e osmoterapia quando indicada, sem excesso.',
    why: ['Hipotensao agrava lesao secundaria.', 'Hipotonicidade e excesso de agua pioram risco neurologico.'],
    goals: ['Evitar hipovolemia.', 'Evitar hiperhidratacao.', 'Acionar osmoterapia com monitorizacao real.'],
    preferred: ['Cristaloide isotônico para euvolemia.', 'Hipertonica ou mannitol no modulo especifico, conforme contexto.'],
    avoid: ['Fluidos hipotônicos.', 'Reduzir TCE a uma tela de dose.'],
    monitor: ['Neurologico seriado, pupilas, PA, glicemia, eletrólitos e capnografia/gasometria se disponivel.'],
  },
  {
    id: 'sepsis',
    title: 'Sepse / Vasodilatacao',
    summary: 'Choque distributivo nao se resolve com manutencao.',
    why: ['Ha vasodilatacao, permeabilidade aumentada e possivel hipovolemia relativa ou absoluta.', 'Muitos pacientes vao precisar vasoativo.'],
    goals: ['Ressuscitar em fase separada.', 'Reavaliar resposta perfusional apos cada aliquota.', 'Evitar excesso de fluido depois que a volemia foi recuperada.'],
    preferred: ['Aliquotas de cristaloide com reavaliacao.', 'Vasoativo quando perfusao nao responde.'],
    avoid: ['Chamar manutencao de tratamento do choque.', 'Atrasar decisao de vasoativo.'],
    monitor: ['PA, lactato, diurese, mentacao, FR, temperatura e peso.'],
  },
  {
    id: 'hypoalbuminemia',
    title: 'Hipoalbuminemia',
    summary: 'Edema nao exclui hipovolemia e plasma nao e atalho para subir albumina de forma significativa.',
    why: ['A baixa pressao oncotica dificulta manter liquido no vascular.', 'Volumes altos de plasma geram mudanca modesta na albumina.'],
    goals: ['Avaliar perfusao real.', 'Evitar promessas irreais com plasma.', 'Monitorar terceiro espaco e sobrecarga.'],
    preferred: ['Estrategia conservadora e contextualizada.', 'Separar objetivo hemodinamico do oncotico.'],
    avoid: ['Usar plasma como resposta simplista.', 'Ignorar edema e perfusao ao mesmo tempo.'],
    monitor: ['Peso, FR, ausculta, perfusao, perdas e resposta clinica.'],
  },
  {
    id: 'anemia',
    title: 'Anemia / Hemorragia',
    summary: 'Cristaloide nao corrige oferta de O2 em anemia significativa.',
    why: ['Hemodiluicao pode piorar a situacao.', 'Hemorragia pode exigir hemocomponente.'],
    goals: ['Ressuscitar hipovolemia quando presente.', 'Pensar em sangue quando a fisiologia pedir.', 'Evitar excesso de cristalóide.'],
    preferred: ['Bolus guiado por perfusao se houver choque.', 'Transfusao quando indicada.'],
    avoid: ['Tratar anemia com soro.', 'Esquecer que fluidos mudam o hematocrito.'],
    monitor: ['PA, lactato, PCV/TP, perfusao e sangramento ativo.'],
  },
  {
    id: 'vomit-alkalosis',
    title: 'Vomitos + alcalose metabolica hipocloremica',
    summary: 'Perda gastrica tende a puxar cloro e pode direcionar a escolha do fluido.',
    why: ['Hipocloremia e alcalose sustentam sinais clinicos.', 'NaCl 0,9% ganha relevancia em muitos desses pacientes.'],
    goals: ['Repor volume e cloro.', 'Somar perdas continuas.', 'Acompanhar potassio.'],
    preferred: ['NaCl 0,9% quando a alcalose hipocloremica dominar o quadro.', 'KCl com seguranca se necessario.'],
    avoid: ['Ignorar acidobase e eletrólitos.', 'Bolusar KCl.'],
    monitor: ['Cloro, sodio, potassio, acidobase, perdas e perfusao.'],
  },
  {
    id: 'diarrhea-acidosis',
    title: 'Diarreia + acidose metabolica',
    summary: 'Perdas entericas podem pedir cristalóide balanceado e reposicao de perdas continuas.',
    why: ['Acidose e hipocalemia sao frequentes.', 'Subestimar a perda enterica atrasa a recuperacao.'],
    goals: ['Repor volume, deficits e perdas.', 'Corrigir potassio e acidobase.', 'Monitorar peso e diurese.'],
    preferred: ['RL ou outro balanceado em muitos cenarios.', 'Suplementacao de potassio quando indicada.'],
    avoid: ['Chamar grande perda enterica de manutencao.', 'Esquecer de medir ou estimar perdas.'],
    monitor: ['Potassio, acidobase, FR, diurese, peso e perfusao.'],
  },
  {
    id: 'dka',
    title: 'DKA',
    summary: 'Desidratacao, diurese osmotica e perdas de K e P dominam a logica.',
    why: ['O potassio corporal total costuma estar baixo.', 'Correcao agressiva da glicemia e perigosa.'],
    goals: ['Restaurar perfusao.', 'Corrigir desidratacao em 24 a 48 h.', 'Repor K e P guiados por monitorizacao.'],
    preferred: ['Cristaloide apropriado ao estado hemodinamico.', 'Dextrose quando a glicemia cair.'],
    avoid: ['Insulina antes da reposicao inicial.', 'Bolus desnecessarios em paciente estavel.'],
    monitor: ['Glicemia, K, P, acidobase, mentacao, diurese e peso.'],
  },
  {
    id: 'hyponatremia',
    title: 'Hiponatremia',
    summary: 'Correcao cronica deve ser lenta; hipotonicidade nao serve para ressuscitacao de hipovolemia.',
    why: ['Correcao rapida demais gera dano neurologico.', 'Contexto clinico e tendencia importam mais que numero isolado.'],
    goals: ['Corrigir causa e volume.', 'Limitar correcao a 0,5 mEq/L/h ou 10 a 12 mEq/L/dia em cronicos.', 'Rechecar a cada 4 a 6 h quando relevante.'],
    preferred: ['Ressuscitacao apropriada se hipovolemico.', 'Plano separado para correcao do sodio.'],
    avoid: ['Misturar manutencao hipotônica com choque.', 'Acelerar correcao sem monitorizacao.'],
    monitor: ['Sodio seriado, neurologico, balanço e diurese.'],
  },
  {
    id: 'hypernatremia',
    title: 'Hipernatremia',
    summary: 'Correcao lenta e calculada, com free water deficit como helper quando fizer sentido.',
    why: ['Queda rapida demais pode precipitar edema cerebral.', 'Hipotonicidade nao ressuscita hipovolemia.'],
    goals: ['Corrigir perfusao primeiro se necessario.', 'Planejar reducao gradual do sodio.', 'Rechecar sodio a cada 4 a 6 h.'],
    preferred: ['Usar free water deficit como ajuda, nao piloto automatico.', 'Ajustar com contexto e laboratorio real.'],
    avoid: ['Corrigir acima de 0,5 mEq/L/h ou 10 a 12 mEq/L/dia em cronicos.', 'Ignorar perdas continuas.'],
    monitor: ['Sodio, neurologico, diurese, peso e sinais de volume.'],
  },
  {
    id: 'anesthesia',
    title: 'Anestesia',
    summary: 'Taxa inicial conservadora e interpretacao hemodinamica antes de subir soro.',
    why: ['A pratica antiga de 10 mL/kg/h perdeu sustentacao.', 'Hipotensao anestesica pode refletir vasodilatacao e profundidade anestesica.'],
    goals: ['Comecar com 5 mL/kg/h em caes e 3 mL/kg/h em gatos como defaults.', 'Reavaliar antes de aumentar.'],
    preferred: ['Cristaloide de reposicao em taxa inicial baixa.', 'Vasoativo ou ajuste anestesico quando apropriado.'],
    avoid: ['Tratar toda hipotensao apenas com fluido.', 'Sobrecarga perioperatoria.'],
    monitor: ['PA, FC, profundidade, temperatura, perdas, perfusao e diurese quando relevante.'],
  },
  {
    id: 'neonate-puppy',
    title: 'Neonato / Filhote',
    summary: 'Maior agua corporal, reserva menor e necessidade de microcontrole.',
    why: ['Volumes pequenos mudam muito a fisiologia.', 'Hipotermia e hipoglicemia alteram perfusao rapidamente.'],
    goals: ['Prescricao em microvolumes.', 'Aquecimento e glicemia sob vigilancia.', 'Usar tabelas etarias para eletrólitos.'],
    preferred: ['Bomba, seringa ou microgotas.', 'Reavaliacao muito frequente.'],
    avoid: ['Volumes cegos por kg.', 'Ignorar temperatura e glicose.'],
    monitor: ['Peso, temperatura, glicemia, FR, diurese e perfusao.'],
  },
  {
    id: 'pancreatitis',
    title: 'Pancreatite',
    summary: 'Pode combinar vasodilatacao, perdas, dor e terceiro espaco.',
    why: ['A perfusao pancreatica piora quando o volume falha.', 'O excesso de fluido tambem cobra preco.'],
    goals: ['Restaurar perfusao com reavaliacao.', 'Somar perdas e terceiro espaco.', 'Controlar dor e monitorar sobrecarga.'],
    preferred: ['Cristaloide balanceado em estrategia individualizada.'],
    avoid: ['Subestimar perdas e vasodilatacao.', 'Persistir com volume quando a perfusao nao melhora e o risco respiratorio sobe.'],
    monitor: ['Perfusao, lactato, FR, ausculta, peso, eletrólitos e perdas continuas.'],
  },
];

export const monitoringGeneralChecklist = ['Peso corporal seriado', 'Balanco hidrico', 'Entradas', 'Saidas', 'Diurese', 'FR', 'Esforco respiratorio', 'Ausculta', 'PA', 'Temperatura', 'Mucosas/TPC', 'Mentacao', 'PCV/TP', 'Eletrólitos', 'Lactato se disponivel'];

export const monitoringIntervals = [
  { scenario: 'Paciente instavel ou com perdas imprevisiveis', interval: 'ate q2h' },
  { scenario: 'Paciente estabilizado', interval: 'q4-6h' },
  { scenario: 'TCE no inicio e apos intervencoes', interval: 'neuro q30-60 min' },
];

export const overloadSigns = ['Taquipneia', 'Aumento do esforco respiratorio', 'Crepitacoes', 'Quemose', 'Edema periferico', 'Corrimento nasal seroso', 'Ganho agudo de peso', 'Queda de saturacao', 'Queda de PCV/TP/USG em contexto compativel'];

export const dilutionExamples = [
  { title: 'NaCl 20% para 7,5% em seringa de 20 mL', stock: '7,5 mL de NaCl 20%', diluent: '12,5 mL de agua esteril', result: 'Volume final 20 mL a 7,5%' },
  { title: 'NaCl 20% para 7,2% em bolsa de 100 mL', stock: '36 mL de NaCl 20%', diluent: '64 mL de agua esteril', result: 'Volume final 100 mL a 7,2%' },
  { title: 'NaCl 10% para 7,5% em bolsa de 100 mL', stock: '75 mL de NaCl 10%', diluent: '25 mL de agua esteril', result: 'Volume final 100 mL a 7,5%' },
];
