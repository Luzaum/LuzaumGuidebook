export interface FoodItem {
  name: string;
  species: string[];
  calories: number;
  unit: string;
  protein: string;
  fat: string;
  indication: string;
  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'ALL';
  neuterStatus: 'NEUTERED' | 'INTACT' | 'ANY';
  isTherapeutic: boolean;
  therapeuticIndications?: string[];
  alerts?: Array<{
    type: 'green' | 'red' | 'yellow';
    text: string;
  }>;
  dilution?: {
    scoop_g: number;
    water_ml: number;
  };
}

export const predefinedFoods: FoodItem[] = [
  // --- Cães & Gatos ---
  {
    name: "Hill's a/d Urgent Care (Úmido)",
    species: ['dog', 'cat'],
    calories: 1.175,
    unit: 'g',
    protein: '8.5%',
    fat: '5.2%',
    indication: 'Convalescença, anorexia, pós-cirurgia, lesão.',
    lifeStage: 'ALL',
    neuterStatus: 'ANY',
    isTherapeutic: true,
    alerts: [
      {
        type: 'green',
        text: 'Excelente para pacientes anoréxicos ou que necessitam de suporte calórico em pequenos volumes.'
      },
      {
        type: 'red',
        text: 'Alto teor de gordura e proteína: <strong>contraindicado</strong> em pancreatite, hiperlipidemia, e DRC/encefalopatia hepática não compensadas.'
      }
    ]
  },
  // Adicione mais alimentos aqui...
];

export const energyFactors = {
  dog: {
    'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
    'Filhote (25% peso adulto)': { k: 3.0, desc: 'Início do crescimento.' },
    'Filhote (50% peso adulto)': { k: 2.5, desc: 'Meio do crescimento.' },
    'Filhote (75% peso adulto)': { k: 2.0, desc: 'Final do crescimento.' },
    'Adulto Castrado / Inativo': { k: 1.6, desc: 'Para prevenir ganho de peso.' },
    'Adulto Ativo / Não Castrado': { k: 1.8, desc: 'Atividade normal.' },
    'Perda de Peso (Sedentário/Obeso)': { k: 1.0, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
    'Idoso': { k: 1.4, desc: 'Necessidade energética reduzida.' },
    'Gestação (1-5 semanas)': { k: 1.8, desc: 'Início da gestação.' },
    'Gestação (6-9 semanas)': { k: 2.0, desc: 'Final da gestação.' },
    'Lactação (Ninhada pequena 1-4)': { k: '2.0-4.0', desc: 'Ajustar conforme nº de filhotes.' },
    'Lactação (Ninhada grande 5-12)': { k: '4.0-8.0', desc: 'Ajustar conforme nº de filhotes.' },
  },
  cat: {
    'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
    'Filhote (até 4 meses)': { k: 2.5, desc: 'Crescimento rápido.' },
    'Filhote (4-12 meses)': { k: 2.0, desc: 'Fase final de crescimento.' },
    'Adulto Castrado / Inativo': { k: 1.0, desc: 'Para prevenir ganho de peso.' },
    'Adulto Ativo / Não Castrado': { k: 1.2, desc: 'Atividade normal.' },
    'Perda de Peso (Sedentário/Obeso)': { k: 0.8, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
    'Idoso (sem sobrepeso)': { k: '1.0-1.2', desc: 'Ajustar conforme condição corporal.' },
    'Gestação': { k: 2.0, desc: 'Aumento gradual ao longo da gestação.' },
    'Lactação (Ninhada pequena)': { k: '2.0-3.0', desc: 'Ajustar conforme o número de filhotes.' },
    'Lactação (Ninhada grande)': { k: '4.0-6.0', desc: 'Ajustar conforme o número de filhotes.' },
  }
};
