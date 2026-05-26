export interface TransfusionDrug {
  name: string;
  indication: string;
  dose: string;
  category?: 'allergy' | 'anaphylaxis' | 'support' | 'reversal';
}

export const drugsData: TransfusionDrug[] = [
  {
    name: 'Difenidramina',
    indication: 'Reações alérgicas (urticária, prurido).',
    dose: '1-2 mg/kg, via IM.',
    category: 'allergy'
  },
  {
    name: 'Prometazina',
    indication: 'Alternativa à difenidramina para reações alérgicas. Uso controverso, pode causar sedação mais profunda.',
    dose: '0.2-0.5 mg/kg, via IM ou IV lenta.',
    category: 'allergy'
  },
  {
    name: 'Epinefrina (Adrenalina)',
    indication: 'Anafilaxia (choque, dispneia grave).',
    dose: '0.01 mg/kg, via IV ou IM.',
    category: 'anaphylaxis'
  },
  {
    name: 'Dexametasona',
    indication: 'Reações alérgicas graves/anafilaxia, suporte em reação hemolítica.',
    dose: '0.5-1 mg/kg, via IV.',
    category: 'support'
  },
  {
    name: 'Furosemida',
    indication: 'Sobrecarga circulatória (TACO), suporte em reação hemolítica.',
    dose: '2-4 mg/kg (TACO) ou 2 mg/kg (hemólise), via IV.',
    category: 'support'
  },
  {
    name: 'Gluconato de Cálcio 10%',
    indication: 'Toxicidade por citrato (hipocalcemia).',
    dose: '0.5-1.5 mL/kg (50-150 mg/kg), IV LENTAMENTE (10-20 min) com monitoramento de ECG.',
    category: 'reversal'
  }
];
