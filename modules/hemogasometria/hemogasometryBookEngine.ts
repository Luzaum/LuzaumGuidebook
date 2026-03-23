export type Species = 'dog' | 'cat';
export type SampleType = 'arterial' | 'venous';

export type AnalyzerInputs = {
  species: Species;
  sampleType: SampleType;
  temperature: string;
  fio2: string;
  barometricPressure: string;
  ph: string;
  pco2: string;
  po2: string;
  hco3: string;
  so2: string;
  be: string;
  na: string;
  k: string;
  cl: string;
  albumin: string;
  lactate: string;
  glucose: string;
  tco2: string;
};

type Range = { min: number; max: number; mean: number };

type ParsedInputs = {
  species: Species;
  sampleType: SampleType;
  temperature: number;
  fio2: number;
  barometricPressure: number;
  ph: number;
  pco2: number;
  po2: number;
  hco3: number;
  so2: number;
  be: number;
  na: number;
  k: number;
  cl: number;
  albumin: number;
  lactate: number | null;
  glucose: number | null;
  tco2: number | null;
};

export type AnalysisResult = {
  acidBaseLabel: string;
  primaryDisorder: string;
  compensationLabel: string;
  compensationExpected: string;
  oxygenationLabel: string;
  oxygenationDetail: string;
  anionGapLabel: string;
  anionGapValue: number;
  correctedAnionGap: number;
  sampleComment: string;
  beComment: string;
  alerts: string[];
  differentials: string[];
};

export const BOOK_REFERENCES: Record<Species, {
  pH: Record<SampleType, Range>;
  pco2: Record<SampleType, Range>;
  hco3: Record<SampleType, Range>;
  po2: Partial<Record<SampleType, Range>>;
  so2: Range;
  be: { min: number; max: number };
  anionGap: { min: number; max: number };
}> = {
  dog: {
    pH: { arterial: { mean: 7.4, min: 7.35, max: 7.45 }, venous: { mean: 7.39, min: 7.35, max: 7.45 } },
    pco2: { arterial: { mean: 37, min: 31, max: 43 }, venous: { mean: 37, min: 33, max: 42 } },
    hco3: { arterial: { mean: 22, min: 19, max: 26 }, venous: { mean: 22, min: 20, max: 25 } },
    po2: { arterial: { mean: 92, min: 80, max: 104 }, venous: { mean: 52, min: 47, max: 57 } },
    so2: { mean: 95, min: 90, max: 100 },
    be: { min: -4, max: 4 },
    anionGap: { min: 12, max: 24 },
  },
  cat: {
    pH: { arterial: { mean: 7.38, min: 7.31, max: 7.46 }, venous: { mean: 7.34, min: 7.27, max: 7.41 } },
    pco2: { arterial: { mean: 31, min: 25, max: 37 }, venous: { mean: 38, min: 32, max: 45 } },
    hco3: { arterial: { mean: 18, min: 14, max: 22 }, venous: { mean: 20, min: 18, max: 24 } },
    po2: { arterial: { mean: 107, min: 95, max: 119 } },
    so2: { mean: 95, min: 90, max: 100 },
    be: { min: -4, max: 4 },
    anionGap: { min: 13, max: 27 },
  },
};

export const DEFAULT_INPUTS: Record<Species, AnalyzerInputs> = {
  dog: { species: 'dog', sampleType: 'arterial', temperature: '38.5', fio2: '21', barometricPressure: '760', ph: '7.40', pco2: '37', po2: '92', hco3: '22', so2: '95', be: '0', na: '145', k: '4.5', cl: '109', albumin: '3.0', lactate: '1.2', glucose: '100', tco2: '22' },
  cat: { species: 'cat', sampleType: 'arterial', temperature: '38.4', fio2: '21', barometricPressure: '760', ph: '7.38', pco2: '31', po2: '107', hco3: '18', so2: '95', be: '0', na: '152', k: '4.2', cl: '116', albumin: '3.4', lactate: '1.0', glucose: '92', tco2: '19' },
};

const parseNumber = (value: string) => Number(String(value || '').replace(',', '.'));
export const formatRange = (range: Range) => `${range.min} - ${range.max}`;

const parseInputs = (inputs: AnalyzerInputs): ParsedInputs => ({
  species: inputs.species,
  sampleType: inputs.sampleType,
  temperature: parseNumber(inputs.temperature),
  fio2: parseNumber(inputs.fio2),
  barometricPressure: parseNumber(inputs.barometricPressure),
  ph: parseNumber(inputs.ph),
  pco2: parseNumber(inputs.pco2),
  po2: parseNumber(inputs.po2),
  hco3: parseNumber(inputs.hco3),
  so2: parseNumber(inputs.so2),
  be: parseNumber(inputs.be),
  na: parseNumber(inputs.na),
  k: parseNumber(inputs.k),
  cl: parseNumber(inputs.cl),
  albumin: parseNumber(inputs.albumin),
  lactate: inputs.lactate ? parseNumber(inputs.lactate) : null,
  glucose: inputs.glucose ? parseNumber(inputs.glucose) : null,
  tco2: inputs.tco2 ? parseNumber(inputs.tco2) : null,
});

const classifyPh = (value: number, range: Range) => value < range.min ? 'Acidemia' : value > range.max ? 'Alcalemia' : 'pH dentro da faixa';

export function analyzeFromBook(rawInputs: AnalyzerInputs): AnalysisResult {
  const actual = parseInputs(rawInputs);
  const ref = BOOK_REFERENCES[actual.species];
  const phRange = ref.pH[actual.sampleType];
  const pco2Range = ref.pco2[actual.sampleType];
  const hco3Range = ref.hco3[actual.sampleType];
  const acidBaseLabel = classifyPh(actual.ph, phRange);

  let primaryDisorder = 'Sem distúrbio primário evidente';
  if (acidBaseLabel === 'Acidemia') primaryDisorder = actual.pco2 > pco2Range.max && actual.hco3 < hco3Range.min ? 'Distúrbio misto em acidemia' : actual.pco2 > pco2Range.max ? 'Acidose Respiratória' : actual.hco3 < hco3Range.min ? 'Acidose Metabólica' : primaryDisorder;
  if (acidBaseLabel === 'Alcalemia') primaryDisorder = actual.pco2 < pco2Range.min && actual.hco3 > hco3Range.max ? 'Distúrbio misto em alcalemia' : actual.pco2 < pco2Range.min ? 'Alcalose Respiratória' : actual.hco3 > hco3Range.max ? 'Alcalose Metabólica' : primaryDisorder;
  if (acidBaseLabel === 'pH dentro da faixa' && ((actual.pco2 > pco2Range.max && actual.hco3 > hco3Range.max) || (actual.pco2 < pco2Range.min && actual.hco3 < hco3Range.min))) primaryDisorder = 'pH normal com distúrbio misto ou compensado';

  let compensationLabel = 'Sem cálculo aplicável';
  let compensationExpected = 'Avaliação compensatória não necessária.';
  if (primaryDisorder === 'Acidose Metabólica' || primaryDisorder === 'Alcalose Metabólica') {
    const expected = ref.pco2[actual.sampleType].mean + ((actual.hco3 - ref.hco3[actual.sampleType].mean) * 0.7);
    compensationExpected = `PCO2 esperada: ${expected.toFixed(1)} mmHg (±3)`;
    compensationLabel = Math.abs(actual.pco2 - expected) <= 3 ? 'Compensação compatível com a fórmula do guia' : actual.pco2 > expected + 3 ? 'Sugere componente respiratório acidótico associado' : 'Sugere componente respiratório alcalótico associado';
  }
  if (primaryDisorder === 'Acidose Respiratória' || primaryDisorder === 'Alcalose Respiratória') {
    const delta = actual.pco2 - ref.pco2[actual.sampleType].mean;
    const acute = ref.hco3[actual.sampleType].mean + (delta * (primaryDisorder === 'Acidose Respiratória' ? 0.15 : 0.25));
    const chronic = ref.hco3[actual.sampleType].mean + (delta * (primaryDisorder === 'Acidose Respiratória' ? 0.35 : 0.55));
    compensationExpected = `HCO3 esperado: aguda ${acute.toFixed(1)} | crônica ${chronic.toFixed(1)} (±2)`;
    const min = Math.min(acute, chronic) - 2;
    const max = Math.max(acute, chronic) + 2;
    compensationLabel = actual.hco3 >= min && actual.hco3 <= max ? 'HCO3 compatível com compensação respiratória esperada' : actual.hco3 > max ? 'Sugere alcalose metabólica associada' : 'Sugere acidose metabólica associada';
  }

  let oxygenationLabel = 'Gradiente A-a não aplicável para amostra venosa';
  let oxygenationDetail = 'Use amostra arterial para avaliar oxigenação.';
  if (actual.sampleType === 'arterial') {
    const pao2 = ((actual.fio2 / 100) * (actual.barometricPressure - 47)) - (1.2 * actual.pco2);
    const gradient = pao2 - actual.po2;
    oxygenationDetail = `PAO2 ${pao2.toFixed(1)} mmHg | Δ(A-a)O2 ${gradient.toFixed(1)} mmHg`;
    oxygenationLabel = gradient > 25 ? 'Gradiente A-a aumentado: sugere incompatibilidade V/Q ou doença pulmonar' : gradient >= 5 && gradient <= 15 ? 'Gradiente A-a normal: hipoxemia sugere hipoventilação ou baixa FiO2' : 'Gradiente A-a limítrofe';
  }

  const ag = (actual.na + actual.k) - (actual.cl + actual.hco3);
  const correctedAg = ag + (4.2 * (3.77 - actual.albumin));
  const anionGapLabel = correctedAg > ref.anionGap.max ? 'Ânion gap aumentado: padrão de acidose orgânica' : actual.hco3 < hco3Range.min ? 'Ânion gap normal com HCO3 baixo: padrão hiperclorêmico provável' : 'Ânion gap dentro da faixa do guia';
  const sampleComment = actual.sampleType === 'venous' && actual.po2 >= 80 ? 'PO2 alta sugere rever se a coleta realmente foi venosa.' : actual.sampleType === 'arterial' && actual.po2 < 60 ? 'PO2 muito baixa em amostra arterial. Considere hipoxemia importante ou problema pré-analítico.' : 'Compatibilidade básica entre a origem declarada e a PO2 preservada.';
  const beComment = actual.be < -4 ? 'BE negativo sugere componente metabólico acidótico.' : actual.be > 4 ? 'BE positivo sugere componente metabólico alcalótico.' : 'Base excess dentro da faixa do guia.';
  const alerts = [
    actual.ph <= 7.1 ? 'pH ≤ 7,1: o guia recomenda abordagem mais agressiva na acidose metabólica grave.' : '',
    actual.sampleType === 'arterial' && actual.po2 < 80 && actual.fio2 <= 21 ? 'PO2 abaixo de 80 mmHg em ar ambiente: há hipoxemia.' : '',
    primaryDisorder.includes('misto') ? 'A compensação não acompanha um padrão simples e o guia orienta suspeitar de distúrbio misto.' : '',
    correctedAg > ref.anionGap.max ? 'Ânion gap corrigido elevado: correlacione com lactato, cetonas, uremia e intoxicações.' : '',
    actual.albumin < 2.5 ? 'Hipoalbuminemia pode mascarar o ânion gap e precisa ser corrigida no cálculo.' : '',
    actual.sampleType === 'venous' ? 'Os valores de compensação do guia foram estabelecidos principalmente com sangue arterial.' : '',
  ].filter(Boolean);
  const differentials = primaryDisorder === 'Acidose Metabólica' && anionGapLabel.includes('aumentado') ? ['Acidose láctica', 'Cetoacidose diabética', 'Acidose urêmica', 'Intoxicações orgânicas'] :
    primaryDisorder === 'Acidose Metabólica' ? ['Diarreia', 'Acidose tubular renal', 'Acidose dilucional', 'Hipoadrenocorticismo'] :
    primaryDisorder === 'Alcalose Metabólica' ? ['Vômito gástrico', 'Terapia diurética', 'Pós-hipercapnia', 'Hiperaldosteronismo'] :
    primaryDisorder === 'Acidose Respiratória' ? ['Obstrução de vias aéreas', 'Doença pleural', 'Depressão central', 'Doença neuromuscular'] :
    primaryDisorder === 'Alcalose Respiratória' ? ['Hipoxemia', 'Dor ou ansiedade', 'Ventilação mecânica excessiva', 'Sepse ou hipertermia'] :
    ['Correlacionar com histórico, exame físico e outros exames.'];

  return { acidBaseLabel, primaryDisorder, compensationLabel, compensationExpected, oxygenationLabel, oxygenationDetail, anionGapLabel, anionGapValue: ag, correctedAnionGap: correctedAg, sampleComment, beComment, alerts, differentials };
}
