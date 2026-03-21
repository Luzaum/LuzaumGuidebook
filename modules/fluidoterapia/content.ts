export const FLUID_PAGE_SECTIONS = {
  calculator: [
    { id: 'patient', label: 'Paciente' },
    { id: 'method', label: 'Método' },
    { id: 'modifiers', label: 'Ajustes' },
    { id: 'results', label: 'Resultados' },
    { id: 'monitoring', label: 'Monitorização' },
  ],
  conditions: [
    { id: 'triage', label: 'Mapa clínico' },
    { id: 'cards', label: 'Doenças' },
    { id: 'cautions', label: 'Red flags' },
  ],
  guide: [
    { id: 'principles', label: 'Princípios' },
    { id: 'formulas', label: 'Fórmulas' },
    { id: 'when', label: 'Quando escolher' },
    { id: 'routes', label: 'Vias' },
    { id: 'trust', label: 'Confiabilidade' },
  ],
} as const

export const DISEASE_GUIDES = [
  {
    title: 'Cetoacidose diabética',
    category: 'Metabólico',
    objective: 'Restaurar volume e corrigir perdas antes da insulina.',
    choose: 'Cristaloide isotônico inicialmente, com reavaliação frequente de glicose, K e fósforo.',
    avoid: 'Começar insulina sem reanimação volêmica e ignorar perdas eletrolíticas.',
    monitor: 'Glicose, potássio, fósforo, perfusão, débito urinário.',
  },
  {
    title: 'Traumatismo cranioencefálico',
    category: 'Neurológico',
    objective: 'Preservar perfusão cerebral sem piorar edema.',
    choose: 'Ressuscitação hemodinâmica e, quando houver edema cerebral sintomático, hipertônica 3 a 7,5% em 2 a 6 mL/kg por 10 a 15 min.',
    avoid: 'Fluidos hipotônicos como estratégia de reanimação e expansão cega sem monitorização neurológica.',
    monitor: 'Pressão arterial, pupilas, estado mental, sinais de herniação e oxigenação.',
  },
  {
    title: 'Cardiopata',
    category: 'Baixa tolerância a volume',
    objective: 'Aumentar pré-carga sem precipitar congestão.',
    choose: 'Estratégia low and slow, bolus menores e reavaliação respiratória a cada etapa.',
    avoid: 'Bolus padrão repetidos sem ausculta, frequência respiratória e pressão.',
    monitor: 'Crepitações, esforço respiratório, SpO2, pressão arterial, ganho de peso.',
  },
  {
    title: 'Doença renal oligúrica',
    category: 'Baixa tolerância a volume',
    objective: 'Suportar perfusão sem causar hipervolemia.',
    choose: 'Prova de carga curta e metas claras de resposta clínica e urinária.',
    avoid: 'Usar fluido em excesso para “forçar diurese”.',
    monitor: 'Produção de urina, peso, pressão, perfusão e sinais de sobrecarga.',
  },
  {
    title: 'Hipoalbuminemia',
    category: 'Baixa oncótica',
    objective: 'Manter volume intravascular minimizando extravasamento.',
    choose: 'Cristaloide mais contido, rotas enterais quando possível e estratégia gradual.',
    avoid: 'Cargas volumétricas agressivas sem olhar edema e efusões.',
    monitor: 'Quimose, edema periférico, derrames, oxigenação.',
  },
  {
    title: 'Diarreia com acidose hiperclorêmica',
    category: 'Gastrointestinal',
    objective: 'Repor água e eletrólitos sem agravar hipercloremia.',
    choose: 'Cristaloides balanceados quando o contexto acidótico/clorêmico apontar nessa direção.',
    avoid: 'NaCl 0,9% automático quando o cloro já está elevado.',
    monitor: 'Cloro, bicarbonato, perfusão, perdas contínuas.',
  },
  {
    title: 'Vômito com alcalose hipoclorêmica',
    category: 'Gastrointestinal',
    objective: 'Repor cloreto e volume.',
    choose: 'NaCl 0,9% costuma ser a escolha lógica quando há necessidade de cloro.',
    avoid: 'Ignorar hipocloremia e perdas gástricas repetidas.',
    monitor: 'Cloro, potássio, vômito em mL e resposta clínica.',
  },
]

export const GUIDE_BLOCKS = [
  {
    title: 'Os três objetivos do cálculo',
    body: 'A AAHA organiza a fluidoterapia em três intenções: ressuscitação, reidratação e manutenção. O erro mais comum é usar uma única “taxa padrão” para tudo.',
    bullets: [
      'Ressuscitação corrige perfusão e choque.',
      'Reidratação corrige déficit intersticial ao longo de 12 a 24 horas.',
      'Manutenção sustenta a necessidade diária quando a ingestão não basta.',
    ],
  },
  {
    title: 'Por que há mais de uma fórmula de manutenção',
    body: 'O consenso aceita múltiplas formas válidas de estimar manutenção. O papel do app é expor a fórmula e deixar o clínico escolher a que melhor encaixa no paciente.',
    bullets: [
      'Por kg: simples e auditável.',
      'Alométrica: aproxima necessidade metabólica.',
      'Linear: 30 x kg + 70, rápida e prática.',
      'Pediátrica: multiplicador sobre dose adulta.',
    ],
  },
  {
    title: 'Quando escolher cada via',
    body: 'A escolha da via depende da gravidade do déficit e da tolerância do paciente.',
    bullets: [
      'IV/IO para hipovolemia e choque.',
      'SC para contexto ambulatorial e pacientes selecionados.',
      'Enteral sempre que o trato gastrointestinal puder ser usado.',
    ],
  },
]
