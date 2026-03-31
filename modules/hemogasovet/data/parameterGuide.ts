import { BloodGasInput } from '../types';

export interface ParameterGuideEntry {
  label: string;
  unit: string;
  whatItIs: string;
  highMeaning: string;
  lowMeaning: string;
  relationships: string[];
  scenarios: string[];
  pitfalls: string[];
  sampleLimitations?: string;
}

export const PARAMETER_GUIDE: Partial<Record<keyof BloodGasInput | 'barometricPressure' | 'altitude', ParameterGuideEntry>> = {
  pH: {
    label: 'pH',
    unit: 'adimensional',
    whatItIs: 'Resume o balanco entre acidos e bases no sangue.',
    highMeaning: 'Alcalemia ou compensacao excessiva aparente.',
    lowMeaning: 'Acidemia por disturbio respiratorio, metabolico ou misto.',
    relationships: ['Interpretar sempre junto de pCO2 e HCO3/BE.', 'pH normal pode mascarar disturbio misto.'],
    scenarios: ['Choque', 'DKA', 'vomitos', 'doenca pulmonar', 'obstrucao uretral'],
    pitfalls: ['Nunca interpretar pH isoladamente.', 'Valores extremos exigem revisao de unidade ou digitacao.'],
  },
  pCO2: {
    label: 'pCO2',
    unit: 'mmHg',
    whatItIs: 'Reflete ventilacao alveolar e o componente respiratorio do equilibrio acido-base.',
    highMeaning: 'Hipoventilacao e tendencia a acidose respiratoria.',
    lowMeaning: 'Hiperventilacao e tendencia a alcalose respiratoria.',
    relationships: ['Avaliar com pH.', 'Relacionar com PaO2 e gradiente A-a em amostra arterial.'],
    scenarios: ['Sedacao', 'fadiga respiratoria', 'dor', 'ansiedade', 'doenca pleural'],
    pitfalls: ['Amostra venosa nao substitui analise arterial de oxigenacao.'],
  },
  pO2: {
    label: 'pO2',
    unit: 'mmHg',
    whatItIs: 'Estima a pressao parcial de oxigenio dissolvido.',
    highMeaning: 'Hiperoxia ou oxigenioterapia.',
    lowMeaning: 'Hipoxemia.',
    relationships: ['Interpretar com FiO2, tipo de amostra, SaO2 e A-a.', 'Nao usar PvO2 como desempenho pulmonar.'],
    scenarios: ['Pneumonia', 'edema pulmonar', 'hipoventilacao', 'derrame pleural'],
    pitfalls: ['Sem FiO2 a interpretacao fica limitada.', 'Em amostra venosa nao indica troca gasosa pulmonar.'],
    sampleLimitations: 'Confiavel para desempenho pulmonar apenas em amostra arterial.',
  },
  HCO3: {
    label: 'HCO3',
    unit: 'mEq/L',
    whatItIs: 'Principal tampao metabolico.',
    highMeaning: 'Alcalose metabolica ou compensacao renal cronica.',
    lowMeaning: 'Acidose metabolica ou compensacao de alcalose respiratoria.',
    relationships: ['Comparar com BE e Cl.', 'Essencial para anion gap e compensacao esperada.'],
    scenarios: ['Diarreia', 'vomitos', 'doenca renal', 'DKA'],
    pitfalls: ['Se conflitar com BE, revisar sinal e unidade.', 'Nao assumir distubio simples sem conferir compensacao.'],
  },
  BE: {
    label: 'Base excess',
    unit: 'mEq/L',
    whatItIs: 'Quantifica o componente metabolico independentemente da pCO2.',
    highMeaning: 'Excesso de base, consistente com alcalose metabolica.',
    lowMeaning: 'Deficit de base, consistente com acidose metabolica.',
    relationships: ['Deve caminhar de forma coerente com HCO3.', 'Ajuda quando HCO3 esta ausente.'],
    scenarios: ['Choque', 'perdas gastricas', 'diarreia', 'insuficiencia renal'],
    pitfalls: ['Sinal invertido gera interpretacao enganosa.', 'Conflito com HCO3 deve disparar cautela.'],
  },
  AG: {
    label: 'Anion gap',
    unit: 'mEq/L',
    whatItIs: 'Ajuda a diferenciar acidose metabolica por acidos nao mensurados de acidose hipercloremica.',
    highMeaning: 'Acidos nao mensurados elevados.',
    lowMeaning: 'Pode refletir hipoalbuminemia ou erro de entrada.',
    relationships: ['Corrigir por albumina quando possivel.', 'Interpretar junto de lactato, glicose e HCO3.'],
    scenarios: ['DKA', 'sepse', 'uremia', 'intoxicacoes'],
    pitfalls: ['AG normal nao exclui acidose se albumina estiver baixa.'],
  },
  Na: {
    label: 'Sodio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation extracelular.',
    highMeaning: 'Deficit de agua livre ou ganho de sodio.',
    lowMeaning: 'Excesso relativo de agua ou perda de sodio.',
    relationships: ['Influencia AG e osmolaridade.', 'Comparar com glicose e contexto de desidratacao.'],
    scenarios: ['Desidratacao', 'hipoadrenocorticismo', 'diabetes insipidus'],
    pitfalls: ['Mudancas rapidas sao mais perigosas do que o numero isolado.'],
  },
  K: {
    label: 'Potassio',
    unit: 'mEq/L',
    whatItIs: 'Principal cation intracelular, critico para excitabilidade cardiaca.',
    highMeaning: 'Risco de arritmia e fraqueza muscular.',
    lowMeaning: 'Fraqueza, ileo, piora de alcalose e sensibilidade a insulina.',
    relationships: ['Interpretar com pH e ECG.', 'Em DKA, valor normal pode mascarar deplecao total.'],
    scenarios: ['Obstrucao uretral', 'DKA', 'vomitos', 'doenca renal'],
    pitfalls: ['Nao confiar apenas no valor serico em acidemia importante.'],
  },
  Cl: {
    label: 'Cloro',
    unit: 'mEq/L',
    whatItIs: 'Principal anion extracelular mensurado.',
    highMeaning: 'Tende a acidose metabolica hipercloremica.',
    lowMeaning: 'Tende a alcalose metabolica hipocloremica.',
    relationships: ['Ler com HCO3 e fluidoterapia.', 'Ajuda a diferenciar perdas gastricas de intestinais.'],
    scenarios: ['Vomitos', 'diarreia', 'uso excessivo de NaCl 0.9%'],
    pitfalls: ['Valor isolado nao explica o disturbio sem contexto de bicarbonato.'],
  },
  albumin: {
    label: 'Albumina',
    unit: 'g/dL',
    whatItIs: 'Principal proteina plasmatic e anion nao mensurado relevante.',
    highMeaning: 'Hemoconcentracao ou desidratacao.',
    lowMeaning: 'Hipoalbuminemia, reduz AG aparente e reduz pressao oncótica.',
    relationships: ['Corrigir AG por albumina.', 'Relacionar com perfusao e doenca hepatica/intestinal.'],
    scenarios: ['PLE', 'hepatopatia', 'inflamacao sistemica'],
    pitfalls: ['AG pode parecer normal por falsa reducao de anions nao mensurados.'],
  },
  lactate: {
    label: 'Lactato',
    unit: 'mmol/L',
    whatItIs: 'Marcador de metabolismo anaerobio e perfusao.',
    highMeaning: 'Hipoperfusao, sepse ou causa tipo B.',
    lowMeaning: 'Sem relevancia clinica isolada.',
    relationships: ['Interpretar com choque, AG e perfusao.', 'Clearance seriado e mais util que medida unica.'],
    scenarios: ['Sepse', 'GDV', 'choque hipovolemico'],
    pitfalls: ['Elevacao isolada sem contexto nao fecha diagnostico.'],
  },
  glucose: {
    label: 'Glicose',
    unit: 'mg/dL',
    whatItIs: 'Substrato energetico e marcador de estresse/metabolismo.',
    highMeaning: 'Estresse, diabetes, DKA.',
    lowMeaning: 'Risco neurologico, sepse, insulinoma, filhotes graves.',
    relationships: ['Interpretar com AG e K em suspeita de DKA.', 'Corrige parte da leitura de sodio em hiperglicemia.'],
    scenarios: ['DKA', 'sepse', 'filhotes graves'],
    pitfalls: ['Hiperglicemia de estresse e comum em gatos.'],
  },
  iCa: {
    label: 'Calcio ionizado',
    unit: 'mmol/L',
    whatItIs: 'Fracao biologicamente ativa do calcio.',
    highMeaning: 'Pode acompanhar neoplasia, hiperparatireoidismo ou erro de unidade.',
    lowMeaning: 'Maior irritabilidade neuromuscular e piora de cardiotoxicidade por hipercalemia.',
    relationships: ['Importante na obstrucao uretral e DKA.', 'pH altera fracao ionizada.'],
    scenarios: ['Obstrucao uretral', 'pancreatite', 'eclampsia'],
    pitfalls: ['Conferir unidade quando valor parecer muito alto.'],
  },
  tCa: {
    label: 'Calcio total',
    unit: 'mg/dL',
    whatItIs: 'Soma do calcio ligado e ionizado.',
    highMeaning: 'Hipercalcemia.',
    lowMeaning: 'Pode refletir hipoalbuminemia sem reduzir iCa.',
    relationships: ['Interpretar junto de albumina e iCa.', 'Nao substitui o iCa em pacientes criticos.'],
    scenarios: ['Neoplasia', 'hipoalbuminemia'],
    pitfalls: ['Nao usar calcio total sozinho para tomada de decisao critica.'],
  },
  hematocrit: {
    label: 'Hematocrito',
    unit: '%',
    whatItIs: 'Proporcao de volume sanguineo ocupada por eritrócitos.',
    highMeaning: 'Hemoconcentracao ou policitemia.',
    lowMeaning: 'Anemia e menor capacidade de transporte de oxigenio.',
    relationships: ['Interpretar com hemoglobina, perfusao e PaO2.', 'Hipoxemia pode ser agravada por anemia.'],
    scenarios: ['Hemorragia', 'desidratacao', 'hemolise'],
    pitfalls: ['PaO2 normal nao exclui hipoxia se Hb/Ht estiverem baixos.'],
  },
  hemoglobin: {
    label: 'Hemoglobina',
    unit: 'g/dL',
    whatItIs: 'Principal carreador de oxigenio no sangue.',
    highMeaning: 'Pode acompanhar hemoconcentracao.',
    lowMeaning: 'Reduz conteudo arterial de oxigenio mesmo com PaO2 normal.',
    relationships: ['Integrar com Ht, SaO2 e quadro perfusional.', 'Baixa Hb limita DO2.'],
    scenarios: ['Anemia hemorrágica', 'hemolise', 'doenca cronica'],
    pitfalls: ['Nao confundir boa saturacao com adequada entrega de oxigenio.'],
  },
  sO2: {
    label: 'Saturacao de O2',
    unit: '%',
    whatItIs: 'Percentual de hemoglobina saturada por oxigenio.',
    highMeaning: 'Adequada ou em oxigenioterapia.',
    lowMeaning: 'Dessaturacao relevante.',
    relationships: ['Comparar com pO2.', 'Incompatibilidades podem sugerir erro de amostra ou valor.'],
    scenarios: ['Doenca pulmonar', 'shunt', 'hipoventilacao'],
    pitfalls: ['PvO2/PvSatO2 nao servem para desempenho pulmonar.'],
  },
  H: {
    label: 'H+',
    unit: 'nmol/L',
    whatItIs: 'Representa acidez de forma inversa ao pH.',
    highMeaning: 'Acidemia.',
    lowMeaning: 'Alcalemia.',
    relationships: ['Deve ser coerente com o pH.', 'Valor pode denunciar erro de OCR.'],
    scenarios: ['Qualquer disturbio acido-base importante'],
    pitfalls: ['Nao usar isoladamente.'],
  },
  cHCO3: {
    label: 'cHCO3/std HCO3',
    unit: 'mEq/L',
    whatItIs: 'Formas calculadas/padronizadas de bicarbonato.',
    highMeaning: 'Sugere alcalose metabolica.',
    lowMeaning: 'Sugere acidose metabolica.',
    relationships: ['Serve como apoio quando HCO3 principal estiver ausente.', 'Comparar com HCO3 medido e BE.'],
    scenarios: ['Analises com painel ampliado'],
    pitfalls: ['Pode divergir por arredondamento ou tipo de calculo do aparelho.'],
  },
  tCO2: {
    label: 'tCO2',
    unit: 'mEq/L',
    whatItIs: 'CO2 total, geralmente proximo do bicarbonato em clinica.',
    highMeaning: 'Tende a alcalose metabolica.',
    lowMeaning: 'Tende a acidose metabolica.',
    relationships: ['Complementa HCO3.', 'Comparar com HCO3 e pCO2.'],
    scenarios: ['Painel bioquimico/hemogas ampliado'],
    pitfalls: ['Nao substitui sozinho a analise completa.'],
  },
  fio2: {
    label: 'FiO2',
    unit: 'fracao interna / % na UI',
    whatItIs: 'Fracao inspirada de oxigenio ofertada ao paciente.',
    highMeaning: 'Oxigenioterapia ou ventilacao com enriquecimento de O2.',
    lowMeaning: 'Nao aplicavel abaixo de ar ambiente.',
    relationships: ['Essencial para P/F e A-a.', 'Deve ser normalizada para fracao no motor.'],
    scenarios: ['Oxigenioterapia', 'VM', 'avaliacao de hipoxemia'],
    pitfalls: ['Confusao entre 21 e 0.21 e uma das falhas mais comuns.'],
  },
  temperature: {
    label: 'Temperatura',
    unit: 'C',
    whatItIs: 'Contextualiza consumo de O2, producao de CO2 e discrepancias entre valor reportado e fisiologia real.',
    highMeaning: 'Hipertermia aumenta metabolismo e demanda de O2.',
    lowMeaning: 'Hipotermia pode reduzir metabolismo e alterar a comparacao clinica com o valor reportado.',
    relationships: ['Interpreta pCO2, lactato e oxigenacao com mais cautela.', 'Deve aparecer no resumo e na qualidade dos dados.'],
    scenarios: ['Sepse', 'choque, trauma, anestesia'],
    pitfalls: ['Nao inventar correcao matematica sem base. Contextualizar e alertar e mais seguro.'],
  },
  barometricPressure: {
    label: 'Pressao barometrica',
    unit: 'mmHg',
    whatItIs: 'Ajusta a disponibilidade alveolar de oxigenio.',
    highMeaning: 'Sem significado isolado clinico comum.',
    lowMeaning: 'Pode reduzir PAO2 esperada.',
    relationships: ['Usada no calculo do gradiente A-a.', 'Relacionar com altitude.'],
    scenarios: ['Pacientes em altitude'],
    pitfalls: ['Sem ela, o calculo de A-a e aproximado.'],
  },
  altitude: {
    label: 'Altitude',
    unit: 'm',
    whatItIs: 'Contextualiza menor pressao de O2 ambiental.',
    highMeaning: 'Maior altitude reduz PAO2 esperada.',
    lowMeaning: 'Nao aplicavel clinicamente ao nivel do mar.',
    relationships: ['Pode ajudar a estimar pressao barometrica.', 'Interfere na leitura de hipoxemia.'],
    scenarios: ['Clinicas em altitude'],
    pitfalls: ['Nao classificar hipoxemia sem considerar altitude quando relevante.'],
  },
};

type ParameterGuideCard = {
  id: string;
  name: string;
  fullName: string;
  category: 'acid-base' | 'oxygenation' | 'electrolyte' | 'metabolite';
  unit: string;
  description: string;
  physiology: string;
  importance: string;
  highMeaning: string;
  lowMeaning: string;
  clinicalScenarios: string[];
  pitfalls: string;
  relationship: string;
};

function inferCategory(id: string): ParameterGuideCard['category'] {
  if (['pH', 'pCO2', 'HCO3', 'BE', 'AG', 'H', 'cHCO3', 'tCO2'].includes(id)) return 'acid-base';
  if (['pO2', 'sO2', 'fio2', 'barometricPressure', 'altitude'].includes(id)) return 'oxygenation';
  if (['Na', 'K', 'Cl', 'iCa', 'tCa'].includes(id)) return 'electrolyte';
  return 'metabolite';
}

export const parameterGuide: ParameterGuideCard[] = Object.entries(PARAMETER_GUIDE).map(([id, entry]) => ({
  id,
  name: entry?.label || id,
  fullName: entry?.label || id,
  category: inferCategory(id),
  unit: entry?.unit || '',
  description: entry?.whatItIs || '',
  physiology: [entry?.whatItIs, ...(entry?.relationships || [])].filter(Boolean).join(' '),
  importance: [entry?.highMeaning, entry?.lowMeaning, entry?.sampleLimitations].filter(Boolean).join(' '),
  highMeaning: entry?.highMeaning || '',
  lowMeaning: entry?.lowMeaning || '',
  clinicalScenarios: entry?.scenarios || [],
  pitfalls: (entry?.pitfalls || []).join(' '),
  relationship: (entry?.relationships || []).join(' '),
}));
