export interface ParameterInteraction {
  id: string;
  trigger: string[];
  explanation: string;
}

export const PARAMETER_INTERACTIONS: ParameterInteraction[] = [
  {
    id: 'chloride-bicarbonate',
    trigger: ['Cl', 'HCO3'],
    explanation: 'Cloro e bicarbonato costumam caminhar em direções opostas para manter a eletroneutralidade; hipercloremia favorece acidose metabólica e hipocloremia favorece alcalose metabólica.',
  },
  {
    id: 'anion-gap-albumin',
    trigger: ['AG', 'albumin'],
    explanation: 'Albumina baixa mascara o aumento do hiato aniônico; o hiato aniônico (AG) corrigido ajuda a revelar ácidos não mensurados.',
  },
  {
    id: 'potassium-acidemia',
    trigger: ['K', 'pH'],
    explanation: 'A acidemia tende a deslocar potássio para o espaço extracelular; uma concentração de potássio (K) normal em acidemia importante pode esconder depleção corporal total.',
  },
  {
    id: 'oxygen-carrying-capacity',
    trigger: ['pO2', 'sO2', 'hematocrit', 'hemoglobin'],
    explanation: 'Oxigenação pulmonar e entrega tecidual não são equivalentes; hemoglobina (Hb) e hematócrito (Ht) baixos reduzem o conteúdo arterial de oxigênio mesmo com pressão parcial arterial de oxigênio (PaO2) e saturação arterial de oxigênio (SaO2) adequadas.',
  },
  {
    id: 'temperature-context',
    trigger: ['temperature', 'pCO2', 'pO2', 'lactate'],
    explanation: 'A temperatura altera a demanda metabólica, a produção de dióxido de carbono (CO2) e o contexto da leitura reportada pelo analisador.',
  },
];
