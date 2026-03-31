export type ReferenceParameter = 
  | 'pH' | 'pCO2' | 'pO2' | 'HCO3' | 'BE' | 'sO2' 
  | 'Na' | 'K' | 'Cl' | 'iCa' | 'tCa' 
  | 'lactate' | 'glucose' | 'albumin' 
  | 'hematocrit' | 'hemoglobin' | 'anionGap' 
  | 'tCO2' | 'cHCO3' | 'H';

export interface ReferenceRangeValue {
  min: number;
  max: number;
  unit: string;
  source: string;
  notes?: string;
}

export type ReferencePreset = {
  [key in ReferenceParameter]?: ReferenceRangeValue;
};

export type SpeciesPreset = {
  arterial: ReferencePreset;
  venous: ReferencePreset;
};

export const DEFAULT_REFERENCE_RANGES: Record<'canine' | 'feline', SpeciesPreset> = {
  canine: {
    arterial: {
      pH: { min: 7.35, max: 7.45, unit: '', source: 'Silverstein & Hopper 2015 / BSAVA' },
      pCO2: { min: 35, max: 45, unit: 'mmHg', source: 'Silverstein & Hopper 2015' },
      pO2: { min: 85, max: 100, unit: 'mmHg', source: 'Guia Prático da Hemogasometria 2023' },
      HCO3: { min: 20, max: 24, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      BE: { min: -4, max: 4, unit: 'mEq/L', source: 'Guia Prático da Hemogasometria 2023' },
      sO2: { min: 95, max: 100, unit: '%', source: 'Standard Physiological' },
      Na: { min: 140, max: 155, unit: 'mEq/L', source: 'DiBartola' },
      K: { min: 3.5, max: 5.5, unit: 'mEq/L', source: 'DiBartola' },
      Cl: { min: 105, max: 115, unit: 'mEq/L', source: 'DiBartola' },
      iCa: { min: 1.1, max: 1.4, unit: 'mmol/L', source: 'Silverstein & Hopper 2015' },
      tCa: { min: 9.0, max: 11.5, unit: 'mg/dL', source: 'Standard Veterinary' },
      lactate: { min: 0.5, max: 2.5, unit: 'mmol/L', source: 'Guia Prático da Hemogasometria 2023', notes: 'Pode ser até < 2.0 em repouso absoluto.' },
      glucose: { min: 70, max: 120, unit: 'mg/dL', source: 'Standard Veterinary' },
      albumin: { min: 2.5, max: 4.0, unit: 'g/dL', source: 'Standard Veterinary' },
      hematocrit: { min: 37, max: 55, unit: '%', source: 'Standard Veterinary' },
      hemoglobin: { min: 12, max: 18, unit: 'g/dL', source: 'Standard Veterinary' },
      anionGap: { min: 12, max: 24, unit: 'mEq/L', source: 'DiBartola', notes: 'Varia com o equipamento. Sem K, o gap é de 12-24. Com K, 15-25.' },
      tCO2: { min: 21, max: 28, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      cHCO3: { min: 20, max: 24, unit: 'mEq/L', source: 'Standard Veterinary' },
      H: { min: 35, max: 45, unit: 'nmol/L', source: 'Calculated from pH 7.35-7.45' },
    },
    venous: {
      pH: { min: 7.32, max: 7.42, unit: '', source: 'Silverstein & Hopper 2015' },
      pCO2: { min: 40, max: 50, unit: 'mmHg', source: 'Silverstein & Hopper 2015' },
      pO2: { min: 40, max: 50, unit: 'mmHg', source: 'Guia Prático da Hemogasometria 2023' },
      HCO3: { min: 21, max: 26, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      BE: { min: -4, max: 4, unit: 'mEq/L', source: 'Guia Prático da Hemogasometria 2023' },
      sO2: { min: 70, max: 80, unit: '%', source: 'Standard Physiological' },
      Na: { min: 140, max: 155, unit: 'mEq/L', source: 'DiBartola' },
      K: { min: 3.5, max: 5.5, unit: 'mEq/L', source: 'DiBartola' },
      Cl: { min: 105, max: 115, unit: 'mEq/L', source: 'DiBartola' },
      iCa: { min: 1.1, max: 1.4, unit: 'mmol/L', source: 'Silverstein & Hopper 2015' },
      tCa: { min: 9.0, max: 11.5, unit: 'mg/dL', source: 'Standard Veterinary' },
      lactate: { min: 0.5, max: 2.5, unit: 'mmol/L', source: 'Guia Prático da Hemogasometria 2023' },
      glucose: { min: 70, max: 120, unit: 'mg/dL', source: 'Standard Veterinary' },
      albumin: { min: 2.5, max: 4.0, unit: 'g/dL', source: 'Standard Veterinary' },
      hematocrit: { min: 37, max: 55, unit: '%', source: 'Standard Veterinary' },
      hemoglobin: { min: 12, max: 18, unit: 'g/dL', source: 'Standard Veterinary' },
      anionGap: { min: 12, max: 24, unit: 'mEq/L', source: 'DiBartola' },
      tCO2: { min: 22, max: 29, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      cHCO3: { min: 21, max: 26, unit: 'mEq/L', source: 'Standard Veterinary' },
      H: { min: 38, max: 48, unit: 'nmol/L', source: 'Calculated from pH 7.32-7.42' },
    }
  },
  feline: {
    arterial: {
      pH: { min: 7.25, max: 7.40, unit: '', source: 'Silverstein & Hopper 2015 / BSAVA', notes: 'Gatos têm pH basal levemente inferior a cães.' },
      pCO2: { min: 28, max: 34, unit: 'mmHg', source: 'Silverstein & Hopper 2015' },
      pO2: { min: 95, max: 115, unit: 'mmHg', source: 'Guia Prático da Hemogasometria 2023' },
      HCO3: { min: 14, max: 22, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      BE: { min: -5, max: 0, unit: 'mEq/L', source: 'Guia Prático da Hemogasometria 2023' },
      sO2: { min: 95, max: 100, unit: '%', source: 'Standard Physiological' },
      Na: { min: 145, max: 158, unit: 'mEq/L', source: 'DiBartola' },
      K: { min: 3.5, max: 5.5, unit: 'mEq/L', source: 'DiBartola' },
      Cl: { min: 115, max: 125, unit: 'mEq/L', source: 'DiBartola' },
      iCa: { min: 1.1, max: 1.4, unit: 'mmol/L', source: 'Silverstein & Hopper 2015' },
      tCa: { min: 8.5, max: 10.5, unit: 'mg/dL', source: 'Standard Veterinary' },
      lactate: { min: 0.5, max: 2.0, unit: 'mmol/L', source: 'Guia Prático da Hemogasometria 2023', notes: 'Gatos em estresse extremo podem ter falso aumento.' },
      glucose: { min: 70, max: 130, unit: 'mg/dL', source: 'Standard Veterinary', notes: 'Hiperglicemia por estresse é comum.' },
      albumin: { min: 2.5, max: 4.0, unit: 'g/dL', source: 'Standard Veterinary' },
      hematocrit: { min: 24, max: 45, unit: '%', source: 'Standard Veterinary' },
      hemoglobin: { min: 8, max: 15, unit: 'g/dL', source: 'Standard Veterinary' },
      anionGap: { min: 13, max: 27, unit: 'mEq/L', source: 'DiBartola' },
      tCO2: { min: 15, max: 23, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      cHCO3: { min: 14, max: 22, unit: 'mEq/L', source: 'Standard Veterinary' },
      H: { min: 40, max: 56, unit: 'nmol/L', source: 'Calculated from pH 7.25-7.40' },
    },
    venous: {
      pH: { min: 7.24, max: 7.38, unit: '', source: 'Silverstein & Hopper 2015' },
      pCO2: { min: 33, max: 40, unit: 'mmHg', source: 'Silverstein & Hopper 2015' },
      pO2: { min: 35, max: 45, unit: 'mmHg', source: 'Guia Prático da Hemogasometria 2023' },
      HCO3: { min: 15, max: 23, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      BE: { min: -5, max: 0, unit: 'mEq/L', source: 'Guia Prático da Hemogasometria 2023' },
      sO2: { min: 70, max: 80, unit: '%', source: 'Standard Physiological' },
      Na: { min: 145, max: 158, unit: 'mEq/L', source: 'DiBartola' },
      K: { min: 3.5, max: 5.5, unit: 'mEq/L', source: 'DiBartola' },
      Cl: { min: 115, max: 125, unit: 'mEq/L', source: 'DiBartola' },
      iCa: { min: 1.1, max: 1.4, unit: 'mmol/L', source: 'Silverstein & Hopper 2015' },
      tCa: { min: 8.5, max: 10.5, unit: 'mg/dL', source: 'Standard Veterinary' },
      lactate: { min: 0.5, max: 2.0, unit: 'mmol/L', source: 'Guia Prático da Hemogasometria 2023' },
      glucose: { min: 70, max: 130, unit: 'mg/dL', source: 'Standard Veterinary' },
      albumin: { min: 2.5, max: 4.0, unit: 'g/dL', source: 'Standard Veterinary' },
      hematocrit: { min: 24, max: 45, unit: '%', source: 'Standard Veterinary' },
      hemoglobin: { min: 8, max: 15, unit: 'g/dL', source: 'Standard Veterinary' },
      anionGap: { min: 13, max: 27, unit: 'mEq/L', source: 'DiBartola' },
      tCO2: { min: 16, max: 25, unit: 'mEq/L', source: 'Silverstein & Hopper 2015' },
      cHCO3: { min: 15, max: 23, unit: 'mEq/L', source: 'Standard Veterinary' },
      H: { min: 42, max: 58, unit: 'nmol/L', source: 'Calculated from pH 7.24-7.38' },
    }
  }
};

export const TOOLTIPS = {
  sampleType: 'Amostra arterial é essencial para avaliar a O2 alveolar (pO2). Venosa (PvO2) avalia apenas o consumo tecidual.',
  pH: 'Mede a concentração de íons H+. Direciona a acidemia (< 7.35) ou alcalemia (> 7.45).',
  pCO2: 'Componente respiratório. O aumento causa acidose respiratória (hipoventilação). A queda causa alcalose respiratória.',
  pO2: 'Pressão parcial de oxigênio. Para avaliar oxigenação, precisa ser amostra arterial.',
  HCO3: 'Componente metabólico primário. Calculado a partir de pCO2 e pH. Queda indica acidose metabólica.',
  BE: 'Base Excess. Indica quantos mEq/L de base forte seriam necessários para normalizar o pH.',
  fio2: 'Fração inspirada de oxigênio. Em ar ambiente é 21% (0.21). Vital para calcular a relação P/F e o Gradiente A-a.',
  lactate: 'Produto do metabolismo anaeróbico. Níveis > 2.5 alertam para baixo débito/hipoperfusão.',
};
