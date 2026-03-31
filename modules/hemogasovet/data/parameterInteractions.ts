export interface ParameterInteraction {
  id: string;
  trigger: string[];
  explanation: string;
}

export const PARAMETER_INTERACTIONS: ParameterInteraction[] = [
  {
    id: 'chloride-bicarbonate',
    trigger: ['Cl', 'HCO3'],
    explanation: 'Cloro e bicarbonato costumam caminhar em direcoes opostas para manter eletroneutralidade; hipercloremia favorece acidose metabolica e hipocloremia favorece alcalose metabolica.',
  },
  {
    id: 'anion-gap-albumin',
    trigger: ['AG', 'albumin'],
    explanation: 'Albumina baixa mascara aumento do anion gap; AG corrigido ajuda a revelar acidos nao mensurados.',
  },
  {
    id: 'potassium-acidemia',
    trigger: ['K', 'pH'],
    explanation: 'Acidemia tende a deslocar potassio para o extracelular; um K normal em acidemia importante pode esconder deplecao corporal total.',
  },
  {
    id: 'oxygen-carrying-capacity',
    trigger: ['pO2', 'sO2', 'hematocrit', 'hemoglobin'],
    explanation: 'Oxigenacao pulmonar e entrega tecidual nao sao equivalentes; Hb/Ht baixos reduzem conteudo arterial de oxigenio mesmo com PaO2 e SaO2 adequadas.',
  },
  {
    id: 'temperature-context',
    trigger: ['temperature', 'pCO2', 'pO2', 'lactate'],
    explanation: 'Temperatura altera demanda metabolica, producao de CO2 e contexto da leitura reportada pelo analisador.',
  },
];
