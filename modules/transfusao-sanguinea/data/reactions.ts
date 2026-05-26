export interface TransfusionReaction {
  name: string;
  signs: string;
  treatment: string;
  prevention: string;
  severity?: 'critical' | 'warning' | 'info';
}

export const reactionsData: TransfusionReaction[] = [
  {
    name: 'Reação Hemolítica Aguda (Imunológica)',
    signs: 'Febre, taquicardia, hipotensão, dispneia, vômito, hemoglobinemia/úria, colapso.',
    treatment: 'Fluidoterapia IV agressiva para manter a perfusão renal. Furosemida (2 mg/kg IV) se oligúria. Suporte pressor (dopamina/dobutamina).',
    prevention: 'Tipagem sanguínea e prova de compatibilidade cruzada rigorosas.',
    severity: 'critical'
  },
  {
    name: 'Reação Alérgica / Anafilática (Imunológica)',
    signs: 'Urticária, prurido, eritema, edema facial. Em casos graves (anafilaxia): dispneia, hipotensão, vômito.',
    treatment: 'Leve/Moderada: Difenidramina (1-2 mg/kg IM). Grave/Anafilaxia: Epinefrina (0.01 mg/kg IV ou IM), corticosteroides (Dexametasona 0.5-1 mg/kg IV), fluidoterapia para choque.',
    prevention: 'Pré-medicação apenas em pacientes com histórico de reação.',
    severity: 'critical'
  },
  {
    name: 'Reação Febril Não Hemolítica (FNHTR)',
    signs: 'Aumento da temperatura (>1°C) sem outros sinais de reação grave.',
    treatment: 'Diminuir a velocidade da transfusão. Administrar antipirético (ex: Dipirona 25 mg/kg em cães). Pode ser reiniciada lentamente se a febre resolver.',
    prevention: 'Uso de hemocomponentes leucorreduzidos.',
    severity: 'warning'
  },
  {
    name: 'Sobrecarga Circulatória (TACO)',
    signs: 'Taquipneia, dispneia, tosse, crepitações pulmonares, distensão da veia jugular.',
    treatment: 'Furosemida (2-4 mg/kg IV). Oxigenoterapia. Nitroglicerina tópica pode ser considerada.',
    prevention: 'Taxas de infusão lentas (1-4 mL/kg/h) em pacientes de risco. Uso de CH em vez de sangue total.',
    severity: 'warning'
  },
  {
    name: 'Contaminação Bacteriana / Sepse',
    signs: 'Febre alta, tremores, hipotensão, taquicardia, colapso (choque séptico).',
    treatment: 'Terapia de choque agressiva (fluidos, vasopressores). Antibióticos de amplo espectro IV. Coletar amostras para cultura.',
    prevention: 'Técnica estritamente asséptica. Não exceder 4 horas de transfusão.',
    severity: 'critical'
  },
  {
    name: 'Toxicidade por Citrato (Hipocalcemia)',
    signs: 'Tremores musculares, fasciculações, arritmias cardíacas, hipotensão.',
    treatment: 'Diminuir drasticamente a velocidade. Gluconato de cálcio 10% (0.5-1.5 mL/kg IV LENTAMENTE) com monitoramento de ECG.',
    prevention: 'Raro. Infusão lenta, especialmente em neonatos, hepatopatas ou transfusões maciças.',
    severity: 'info'
  }
];
