export type SimplifiedMedicationDefinition = {
  whatItDoes: string;
  keyPoints: string[];
};

/**
 * Camada de leitura simples. O mecanismo técnico continua sendo a fonte detalhada
 * na monografia; este texto serve como porta de entrada para leitores não especialistas.
 */
const DEFINITIONS: Record<string, SimplifiedMedicationDefinition> = {
  prednisolona: {
    whatItDoes: 'A prednisolona imita a ação do cortisol e diminui a inflamação e a atividade exagerada do sistema de defesa. A intensidade do efeito muda bastante conforme a dose: doses baixas podem repor hormônio, enquanto doses maiores controlam inflamação ou suprimem a imunidade.',
    keyPoints: ['A finalidade clínica define a dose.', 'Tratamentos prolongados geralmente exigem retirada gradual.', 'Infecções, diabetes e uso junto com anti-inflamatórios exigem cautela.'],
  },
  'sulfametoxazol-trimetoprima': {
    whatItDoes: 'A associação bloqueia duas etapas consecutivas que as bactérias usam para produzir ácido fólico. Esse bloqueio duplo dificulta a multiplicação bacteriana e torna o tratamento mais eficaz do que cada componente isolado.',
    keyPoints: ['O foco da infecção e a cultura orientam o uso.', 'Cães podem apresentar reações idiossincráticas importantes.', 'Hidratação e monitoramento são relevantes em tratamentos mais longos.'],
  },
  'amoxicilina-clavulanato': {
    whatItDoes: 'A amoxicilina impede a formação da parede da bactéria. O clavulanato protege a amoxicilina de algumas enzimas bacterianas que tentariam inativá-la, ampliando a ação contra microrganismos produtores de beta-lactamase.',
    keyPoints: ['Não substitui cultura em infecções complicadas.', 'A dose varia conforme local e gravidade da infecção.', 'Vômito e diarreia estão entre os efeitos mais comuns.'],
  },
  pregabalina: {
    whatItDoes: 'A pregabalina reduz a liberação de sinais excitatórios entre os neurônios. Com menos estímulos exagerados circulando, pode diminuir dor neuropática, ansiedade situacional e, em alguns contextos, auxiliar no controle de convulsões.',
    keyPoints: ['Sedação e falta de coordenação podem ocorrer.', 'Ajustes podem ser necessários em doença renal.', 'A indicação determina frequência e duração.'],
  },
  maropitant: {
    whatItDoes: 'O maropitant bloqueia o receptor NK1, usado pela substância P no centro do vômito. Assim, interrompe uma das principais vias finais que desencadeiam náusea e vômito por diferentes causas.',
    keyPoints: ['Controlar o vômito não elimina sua causa.', 'A via e a duração dependem do quadro clínico.', 'Dor à aplicação pode ocorrer com a formulação injetável.'],
  },
  benazepril: {
    whatItDoes: 'O benazepril reduz a formação de angiotensina II, substância que contrai vasos e favorece retenção de sal e água. Isso ajuda a diminuir a pressão sobre o coração e, em contextos selecionados, a perda de proteína pelos rins.',
    keyPoints: ['Pressão, creatinina e potássio precisam ser acompanhados.', 'Desidratação aumenta o risco de queda da função renal.', 'O benefício depende da doença e do estágio.'],
  },
  pimobendan: {
    whatItDoes: 'O pimobendan ajuda o coração a contrair com mais eficiência e, ao mesmo tempo, relaxa vasos sanguíneos. Com isso, pode melhorar o fluxo de sangue sem aumentar proporcionalmente o consumo de energia pelo músculo cardíaco.',
    keyPoints: ['A indicação depende do tipo e estágio da cardiopatia.', 'Não é apropriado para toda doença cardíaca.', 'Ecocardiograma e reavaliações orientam o uso.'],
  },
  benzafibrato: {
    whatItDoes: 'O bezafibrato ativa reguladores do metabolismo de gorduras, ajudando o organismo a reduzir triglicérides e modificar o transporte de lipídios. Na veterinária, seu uso exige seleção e acompanhamento do paciente.',
    keyPoints: ['Confirmar a grafia e o princípio ativo da apresentação.', 'Perfil lipídico e enzimas hepáticas orientam a resposta.', 'Pode haver uso extrabula em medicina veterinária.'],
  },
  'same-sadenosilmetionina': {
    whatItDoes: 'A SAMe participa de reações metabólicas do fígado e ajuda na produção de glutationa, um dos principais sistemas antioxidantes das células. É usada como suporte, não como substituta do tratamento da causa da doença hepática.',
    keyPoints: ['É um tratamento de suporte.', 'A formulação e a administração interferem na absorção.', 'A resposta deve ser avaliada junto com exames hepáticos.'],
  },
  'suplementos-hepaticos-silimarina': {
    whatItDoes: 'A silimarina reúne compostos com ação antioxidante e potencial proteção das células do fígado. Pode complementar o manejo de algumas hepatopatias, mas a qualidade da formulação e a evidência variam entre produtos.',
    keyPoints: ['Não substitui o diagnóstico da hepatopatia.', 'Produtos comerciais podem ter composições diferentes.', 'A dose deve considerar a quantidade real do ativo.'],
  },
  'acido-ursodesoxicolico': {
    whatItDoes: 'O ácido ursodesoxicólico torna a bile menos agressiva e favorece seu fluxo. Também pode exercer efeitos protetores sobre células do fígado e das vias biliares em doenças nas quais não existe obstrução completa.',
    keyPoints: ['Obstrução biliar completa deve ser descartada.', 'A administração com alimento costuma ser útil.', 'Exames e imagem orientam duração e resposta.'],
  },
  'n-acetilcisteina': {
    whatItDoes: 'A N-acetilcisteína ajuda a repor glutationa, importante defesa antioxidante do organismo. Também quebra ligações do muco, deixando secreções respiratórias menos espessas, e tem papel específico em algumas intoxicações.',
    keyPoints: ['O protocolo muda conforme a indicação.', 'Intoxicações podem exigir dose de ataque e manutenção.', 'A via intravenosa requer administração e monitoramento cuidadosos.'],
  },
};

export function getSimplifiedMedicationDefinition(slug: string): SimplifiedMedicationDefinition | null {
  return DEFINITIONS[slug] || null;
}
