/**
 * Dados e constantes oficiais para a seção de Referências Rápidas - Oncologia
 * Fontes:
 * - BSAVA Manual of Canine and Feline Oncology (3rd Edition), Capítulo 7: Principles of chemotherapy.
 * - BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition), Apêndice I e II.
 * - Withrow and MacEwen's Small Animal Clinical Oncology (6th Edition), Capítulo 12.
 */

export type Species = 'canine' | 'feline';

export interface BsaTableRow {
  weightKg: number;
  bsaM2: number;
}

export interface OncologyDrug {
  id: string;
  name: string;
  class: string;
  route: string;
  standardDoseUnit: 'mg/m²' | 'mg/kg' | 'UI/m²' | 'UI/kg';
  standardDoseDisplay: string;
  frequency: string;
  applicableSpecies: Species[];
  /** Regra especial de corte para animais pequenos */
  smallPatientRule?: {
    thresholdKg: number;
    description: string;
    adjustedDoseDisplay: string;
  };
  calculateDose: (params: { weightKg: number; bsaM2: number; species: Species }) => {
    calculatedDose: number;
    unit: string;
    doseFormulaUsed: string;
    isSmallPatientAdjusted: boolean;
    note?: string;
  };
  keyNotes: string[];
  vesicant: boolean;
  nadirDays: string;
  precautions: string[];
}

/**
 * Fórmulas canônicas BSAVA para cálculo de Área de Superfície Corpórea (BSA em m²)
 * Cães: BSA (m²) = 0.101 * (Peso em kg)^(2/3)
 * Gatos: BSA (m²) = 0.100 * (Peso em kg)^(2/3)
 */
export function calculateBsa(weightKg: number, species: Species): number {
  if (weightKg <= 0 || !Number.isFinite(weightKg)) return 0;
  const k = species === 'canine' ? 0.101 : 0.100;
  const bsa = k * Math.pow(weightKg, 2 / 3);
  return Number(bsa.toFixed(3));
}

/** Tabela BSAVA para Cães (Figura 7.3 e Apêndice I) */
export const BSAVA_DOG_BSA_TABLE: BsaTableRow[] = [
  { weightKg: 0.5, bsaM2: 0.06 },
  { weightKg: 1.0, bsaM2: 0.10 },
  { weightKg: 1.5, bsaM2: 0.134 },
  { weightKg: 2.0, bsaM2: 0.16 },
  { weightKg: 2.5, bsaM2: 0.184 },
  { weightKg: 3.0, bsaM2: 0.21 },
  { weightKg: 4.0, bsaM2: 0.255 },
  { weightKg: 5.0, bsaM2: 0.295 },
  { weightKg: 6.0, bsaM2: 0.333 },
  { weightKg: 7.0, bsaM2: 0.37 },
  { weightKg: 8.0, bsaM2: 0.404 },
  { weightKg: 9.0, bsaM2: 0.437 },
  { weightKg: 10.0, bsaM2: 0.469 },
  { weightKg: 11.0, bsaM2: 0.50 },
  { weightKg: 12.0, bsaM2: 0.529 },
  { weightKg: 13.0, bsaM2: 0.553 },
  { weightKg: 14.0, bsaM2: 0.581 },
  { weightKg: 15.0, bsaM2: 0.608 },
  { weightKg: 16.0, bsaM2: 0.641 },
  { weightKg: 17.0, bsaM2: 0.668 },
  { weightKg: 18.0, bsaM2: 0.694 },
  { weightKg: 19.0, bsaM2: 0.719 },
  { weightKg: 20.0, bsaM2: 0.744 },
  { weightKg: 21.0, bsaM2: 0.769 },
  { weightKg: 22.0, bsaM2: 0.785 },
  { weightKg: 23.0, bsaM2: 0.817 },
  { weightKg: 24.0, bsaM2: 0.84 },
  { weightKg: 25.0, bsaM2: 0.864 },
  { weightKg: 26.0, bsaM2: 0.886 },
  { weightKg: 27.0, bsaM2: 0.909 },
  { weightKg: 28.0, bsaM2: 0.931 },
  { weightKg: 29.0, bsaM2: 0.953 },
  { weightKg: 30.0, bsaM2: 0.975 },
  { weightKg: 31.0, bsaM2: 0.997 },
  { weightKg: 32.0, bsaM2: 1.018 },
  { weightKg: 33.0, bsaM2: 1.029 },
  { weightKg: 34.0, bsaM2: 1.06 },
  { weightKg: 35.0, bsaM2: 1.081 },
  { weightKg: 36.0, bsaM2: 1.101 },
  { weightKg: 37.0, bsaM2: 1.121 },
  { weightKg: 38.0, bsaM2: 1.142 },
  { weightKg: 39.0, bsaM2: 1.162 },
  { weightKg: 40.0, bsaM2: 1.181 },
  { weightKg: 41.0, bsaM2: 1.201 },
  { weightKg: 42.0, bsaM2: 1.22 },
  { weightKg: 43.0, bsaM2: 1.24 },
  { weightKg: 44.0, bsaM2: 1.259 },
  { weightKg: 45.0, bsaM2: 1.278 },
  { weightKg: 46.0, bsaM2: 1.297 },
  { weightKg: 47.0, bsaM2: 1.302 },
  { weightKg: 48.0, bsaM2: 1.334 },
  { weightKg: 49.0, bsaM2: 1.352 },
  { weightKg: 50.0, bsaM2: 1.371 },
  { weightKg: 55.0, bsaM2: 1.46 },
  { weightKg: 60.0, bsaM2: 1.55 },
];

/** Tabela BSAVA para Gatos (Figura 7.4 e Apêndice I) */
export const BSAVA_CAT_BSA_TABLE: BsaTableRow[] = [
  { weightKg: 0.5, bsaM2: 0.06 },
  { weightKg: 1.0, bsaM2: 0.10 },
  { weightKg: 1.4, bsaM2: 0.125 },
  { weightKg: 1.6, bsaM2: 0.137 },
  { weightKg: 1.8, bsaM2: 0.148 },
  { weightKg: 2.0, bsaM2: 0.159 },
  { weightKg: 2.2, bsaM2: 0.169 },
  { weightKg: 2.4, bsaM2: 0.179 },
  { weightKg: 2.5, bsaM2: 0.184 },
  { weightKg: 2.6, bsaM2: 0.189 },
  { weightKg: 2.8, bsaM2: 0.199 },
  { weightKg: 3.0, bsaM2: 0.208 },
  { weightKg: 3.2, bsaM2: 0.217 },
  { weightKg: 3.4, bsaM2: 0.226 },
  { weightKg: 3.5, bsaM2: 0.231 },
  { weightKg: 3.6, bsaM2: 0.235 },
  { weightKg: 3.8, bsaM2: 0.244 },
  { weightKg: 4.0, bsaM2: 0.252 },
  { weightKg: 4.2, bsaM2: 0.26 },
  { weightKg: 4.4, bsaM2: 0.269 },
  { weightKg: 4.5, bsaM2: 0.273 },
  { weightKg: 4.6, bsaM2: 0.277 },
  { weightKg: 4.8, bsaM2: 0.285 },
  { weightKg: 5.0, bsaM2: 0.292 },
  { weightKg: 5.2, bsaM2: 0.30 },
  { weightKg: 5.4, bsaM2: 0.307 },
  { weightKg: 5.5, bsaM2: 0.316 },
  { weightKg: 5.6, bsaM2: 0.315 },
  { weightKg: 5.8, bsaM2: 0.323 },
  { weightKg: 6.0, bsaM2: 0.33 },
  { weightKg: 6.2, bsaM2: 0.337 },
  { weightKg: 6.4, bsaM2: 0.345 },
  { weightKg: 6.6, bsaM2: 0.352 },
  { weightKg: 6.8, bsaM2: 0.36 },
  { weightKg: 7.0, bsaM2: 0.366 },
  { weightKg: 7.2, bsaM2: 0.373 },
  { weightKg: 7.4, bsaM2: 0.38 },
  { weightKg: 7.6, bsaM2: 0.387 },
  { weightKg: 7.8, bsaM2: 0.393 },
  { weightKg: 8.0, bsaM2: 0.40 },
  { weightKg: 8.2, bsaM2: 0.407 },
  { weightKg: 8.4, bsaM2: 0.413 },
  { weightKg: 8.6, bsaM2: 0.42 },
  { weightKg: 8.8, bsaM2: 0.426 },
  { weightKg: 9.0, bsaM2: 0.433 },
  { weightKg: 9.2, bsaM2: 0.439 },
  { weightKg: 9.4, bsaM2: 0.445 },
  { weightKg: 9.6, bsaM2: 0.452 },
  { weightKg: 9.8, bsaM2: 0.458 },
  { weightKg: 10.0, bsaM2: 0.464 },
];

/** Fármacos oncológicos canônicos com regras de m² e kg do BSAVA */
export const BSAVA_ONCOLOGY_DRUGS: OncologyDrug[] = [
  {
    id: 'doxorrubicina',
    name: 'Doxorrubicina (Adriamicina)',
    class: 'Antraciclina / Antibiótico Antitumoral',
    route: 'IV estrito (infusão lenta em 20–30 min em NaCl 0,9%)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '30 mg/m² IV a cada 3 semanas (cães >15 kg)',
    frequency: 'A cada 3 semanas (ciclos de 21 dias)',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 15,
      description:
        'Cães <15 kg e gatos têm toxicidade severa quando dosados por m². O BSAVA preconiza dose ponderal de 1 mg/kg IV.',
      adjustedDoseDisplay: '1 mg/kg IV (para cães <15 kg e felinos)',
    },
    calculateDose: ({ weightKg, bsaM2, species }) => {
      if (species === 'feline' || weightKg < 15) {
        return {
          calculatedDose: Number((weightKg * 1.0).toFixed(2)),
          unit: 'mg',
          doseFormulaUsed: '1,0 mg/kg (regra BSAVA de proteção para cães <15 kg e felinos)',
          isSmallPatientAdjusted: true,
          note: 'Dose calculada por peso corporal (mg/kg) para evitar toxicidade e mielossupressão grave.',
        };
      }
      return {
        calculatedDose: Number((bsaM2 * 30).toFixed(2)),
        unit: 'mg',
        doseFormulaUsed: '30 mg/m² (dose padrão BSAVA para cães ≥15 kg)',
        isSmallPatientAdjusted: false,
      };
    },
    keyNotes: [
      'Vesicante extremo: risco de necrose tecidual grave por extravasamento.',
      'Cardiotoxicidade cumulativa em cães (dose cumulativa limite ~180–240 mg/m²). Realizar ecocardiograma prévio se cardiopata.',
      'Nefrotoxicidade em gatos (monitorar creatinina e urina rotineiramente).',
      'Pré-medicação com maropitant (1 mg/kg SC) recomendada para diminuir êmese aguda.',
      'Dexrazoxano disponível como cardioprotetor (proporção 10:1 em relação à doxorrubicina, 30 min antes).',
    ],
    vesicant: true,
    nadirDays: '7 a 10 dias (neutropenia)',
    precautions: [
      'Somente puncionar cateter com técnica de punção única ("first-stick"); nunca usar veia já puncionada no mesmo dia.',
      'Diluir exclusivamente em solução fisiológica 0,9% (evitar solução de Ringer Lactato / Hartmann).',
    ],
  },
  {
    id: 'vincristina',
    name: 'Vincristina',
    class: 'Alcalóide da Vinca / Inibidor Mitótico',
    route: 'IV estrito (bolus lento ou infusão curta)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '0,5 a 0,7 mg/m² IV a cada 1 a 2 semanas',
    frequency: 'Semanal ou a cada 2 semanas (conforme protocolo CHOP/COP)',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description:
        'Em animais <10 kg ou raças sensíveis ao gene MDR1/ABCB1 (Collie, Pastor Australiano), iniciar na faixa inferior (0,5 mg/m²) ou limitar ao teto máximo de 1,0 mg total.',
      adjustedDoseDisplay: '0,5 mg/m² ou dose teto de 1 mg',
    },
    calculateDose: ({ bsaM2, weightKg }) => {
      const doseStd = bsaM2 * 0.7;
      const capped = Math.min(doseStd, 1.0);
      const isCapped = doseStd > 1.0;
      const isSmall = weightKg < 10;
      return {
        calculatedDose: Number((isSmall ? bsaM2 * 0.5 : capped).toFixed(3)),
        unit: 'mg',
        doseFormulaUsed: isSmall
          ? '0,50 mg/m² (faixa conservadora para paciente <10 kg)'
          : isCapped
          ? 'Teto máximo clínico de 1,0 mg (dose por m² calculada daria ' + doseStd.toFixed(2) + ' mg)'
          : '0,70 mg/m² (dose padrão BSAVA)',
        isSmallPatientAdjusted: isSmall || isCapped,
        note: isCapped
          ? 'A dose foi limitada ao teto de segurança usual de 1,0 mg para prevenir neurotoxicidade periférica.'
          : undefined,
      };
    },
    keyNotes: [
      'Vesicante moderado a severo: necrose e ulceração se extravasar.',
      'Neurotoxicidade periférica (fraqueza de membros pélvicos, íleo paralítico e constipação).',
      'Metabolização hepatobiliar: cautela em pacientes ictéricos ou hepatopatas.',
      'Hipersensibilidade em cães portadores da mutação MDR1 (ABCB1).',
    ],
    vesicant: true,
    nadirDays: '4 a 7 dias (menos mielossupressora que vinblastina)',
    precautions: [
      'Garantir refluxo sanguíneo contínuo durante toda a aplicação.',
      'Nunca administrar por vias extravasculares ou intratecais (letal).',
    ],
  },
  {
    id: 'ciclofosfamida',
    name: 'Ciclofosfamida',
    class: 'Agente Alquilante (Oxazafosforina)',
    route: 'Oral (comprimidos) ou IV',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '200 a 250 mg/m² PO/IV a cada 3 semanas (ou 50 mg/m² em dias alternados)',
    frequency: 'A cada 3 semanas (bolus no CHOP) ou metronômica / contínua',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description:
        'Comprimidos não podem ser partidos ou esmagados. Ajustar para cápsulas manipuladas exatas ou redistribuir a dose total em 3–4 dias.',
      adjustedDoseDisplay: 'Manipulação exata ou dose fracionada em 3 a 4 dias consecutivos',
    },
    calculateDose: ({ bsaM2, weightKg }) => {
      const dose = bsaM2 * 250;
      return {
        calculatedDose: Number(dose.toFixed(1)),
        unit: 'mg',
        doseFormulaUsed: '250 mg/m² dose de pulso q3w (ou ~50 mg/m² dias alternados)',
        isSmallPatientAdjusted: weightKg < 10,
        note:
          weightKg < 10
            ? 'Atenção: Comprimidos comerciais NÃO devem ser partidos. Utilize farmácia de manipulação citotóxica para a dose exata.'
            : 'Se comprimidos comerciais forem utilizados, ajustar ao múltiplo mais próximo sem fracionar o comprimido.',
      };
    },
    keyNotes: [
      'Metabolito acroleína é irritante vesical e pode causar Cistite Hemorrágica Estéril.',
      'Protocolo protetor BSAVA: Administrar furosemida (1 mg/kg PO q12h por 48h) e garantir água à vontade.',
      'Urinálise com fita reagente antes de cada dose: suspender se hematúria macro/microscópica.',
      'Substituição recomendada em caso de cistite: Clorambucila (5 mg/m² PO alternada ou 20 mg/m² q2w).',
    ],
    vesicant: false,
    nadirDays: '7 a 10 dias (recuperação até o 21º dia)',
    precautions: [
      'Nunca dividir ou esmagar comprimidos de ciclofosfamida (risco toxicológico e distribuição irregular do fármaco no comprimido).',
      'Estimular micções frequentes durante e após o dia do tratamento.',
    ],
  },
  {
    id: 'carboplatina',
    name: 'Carboplatina',
    class: 'Composto de Coordenação de Platina',
    route: 'IV (infusão lenta de 5 a 10 minutos)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: 'Cães: 300 mg/m² IV q3w | Gatos: 200–250 mg/m² IV q3w',
    frequency: 'A cada 3 semanas (21 dias)',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description:
        'Em gatos e cães pequenos, a depuração depende estritamente da TFG (taxa de filtração glomerular). Em azotemia, reduzir a dose em 20–30%.',
      adjustedDoseDisplay: 'Ajuste proporcional à função renal (AUC / GFR)',
    },
    calculateDose: ({ bsaM2, species }) => {
      const doseRate = species === 'feline' ? 200 : 300;
      return {
        calculatedDose: Number((bsaM2 * doseRate).toFixed(1)),
        unit: 'mg',
        doseFormulaUsed:
          species === 'feline'
            ? '200 mg/m² (faixa de segurança felina BSAVA: 200–250 mg/m²)'
            : '300 mg/m² (dose padrão canina BSAVA)',
        isSmallPatientAdjusted: false,
        note:
          species === 'feline'
            ? 'Diferente da cisplatina (que é fatal em gatos), a carboplatina é segura para uso felino.'
            : 'Diurese salina forçada não é obrigatória para carboplatina, ao contrário da cisplatina.',
      };
    },
    keyNotes: [
      'Segura em felinos (ao contrário da cisplatina que causa edema pulmonar letal em gatos).',
      'Excreção predominantemente renal; monitorar perfil renal (ureia, creatinina, densidade).',
      'Mielossupressão é a principal toxicidade limitante de dose.',
      'Indicação principal: Osteossarcoma apendicular canino (adjuvante pós-amputação) e carcinomas.',
    ],
    vesicant: false,
    nadirDays: 'Cão: 11 a 14 dias | Gato: 14 a 21 dias (nadir mais tardio)',
    precautions: [
      'Fazer hemograma aos 14 dias para identificar o pico de mielossupressão (nadir).',
      'Suspender ou adiar se contagem de neutrófilos < 2.000/μL ou plaquetas < 100.000/μL.',
    ],
  },
  {
    id: 'lomustina',
    name: 'Lomustina (CCNU)',
    class: 'Nitrosoureia (Agente Alquilante Lipofílico)',
    route: 'Oral (cápsulas)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: 'Cães: 60 a 90 mg/m² PO q3–4w | Gatos: 50 a 60 mg/m² PO q3–4w',
    frequency: 'A cada 3 a 4 semanas',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description:
        'Cães <10 kg podem requerer dosagem ponderal (1,5 a 2,0 mg/kg) para evitar toxicidade acumulada severa.',
      adjustedDoseDisplay: '1,5 a 2,0 mg/kg PO',
    },
    calculateDose: ({ bsaM2, weightKg, species }) => {
      const isSmall = species === 'canine' && weightKg < 10;
      if (isSmall) {
        return {
          calculatedDose: Number((weightKg * 1.8).toFixed(1)),
          unit: 'mg',
          doseFormulaUsed: '1,8 mg/kg PO (faixa BSAVA para cães pequenos 1,5–2,0 mg/kg)',
          isSmallPatientAdjusted: true,
          note: 'Ajuste ponderal para evitar superdosagem por disponibilidade fixa de cápsulas comerciais.',
        };
      }
      const rate = species === 'feline' ? 55 : 70;
      return {
        calculatedDose: Number((bsaM2 * rate).toFixed(1)),
        unit: 'mg',
        doseFormulaUsed:
          species === 'feline' ? '55 mg/m² PO (faixa felina 50–60 mg/m²)' : '70 mg/m² PO (faixa canina 60–90 mg/m²)',
        isSmallPatientAdjusted: false,
      };
    },
    keyNotes: [
      'Atravessa a barreira hematoencefálica (excelente para neoplasias do SNC e linfoma cutâneo).',
      'Hepatotoxicidade crônica cumulativa em cães (indispensável associar SAMe / Silimarina).',
      'Mielossupressão severa, tardia e cumulativa (trombocitopenia persistente).',
      'Fibrose pulmonar irreversível descrita em gatos.',
    ],
    vesicant: false,
    nadirDays: '7 a 14 dias (neutrófilos) e até 21 a 28 dias (plaquetas)',
    precautions: [
      'NUNCA abrir as cápsulas de lomustina.',
      'Avaliar ALT/FA antes de cada sessão; suspender se elevação contínua.',
    ],
  },
  {
    id: 'crisantaspase',
    name: 'Crisantaspase (L-Asparaginase)',
    class: 'Enzima Específica de Fase G1',
    route: 'IM ou SC (evitar IV pelo risco de anafilaxia)',
    standardDoseUnit: 'UI/m²',
    standardDoseDisplay: '10.000 UI/m² IM/SC ou 400 UI/kg IM/SC',
    frequency: 'Indução ou resgate de linfoma (conforme protocolo)',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description: 'Em animais pequenos, a dose baseada em kg (400 UI/kg) é segura e de fácil conversão.',
      adjustedDoseDisplay: '400 UI/kg IM ou SC',
    },
    calculateDose: ({ bsaM2, weightKg }) => {
      const doseByBsa = bsaM2 * 10000;
      const doseByWeight = weightKg * 400;
      return {
        calculatedDose: Math.round(doseByBsa),
        unit: 'UI',
        doseFormulaUsed: '10.000 UI/m² IM/SC (equivalente alternativo: 400 UI/kg = ' + Math.round(doseByWeight) + ' UI)',
        isSmallPatientAdjusted: weightKg < 10,
        note: 'Preferir via intramuscular profunda; causa menor incidência de reações que vias intraperitoneal ou IV.',
      };
    },
    keyNotes: [
      'Inibe a síntese protéica privando os blastos de asparagina exógena.',
      'Poupadora de medula óssea (quase sem mielossupressão; ideal para pacientes neutropênicos).',
      'Alto potencial de imunogenicidade e reações de anafilaxia por ser proteína bacteriana.',
      'Pancreatite aguda e distúrbios de coagulação raros.',
    ],
    vesicant: false,
    nadirDays: 'Ausente / Mínimo impacto na medula óssea',
    precautions: [
      'Manter o paciente em observação clínica durante 30 minutos pós-aplicação com kit de anafilaxia pronto.',
      'Anticorpos neutralizantes reduzem a eficácia em aplicações repetidas.',
    ],
  },
  {
    id: 'vinblastina',
    name: 'Vinblastina',
    class: 'Alcalóide da Vinca',
    route: 'IV estrito (injeção lenta em via venosa segura)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '2,0 mg/m² IV a cada 1 a 2 semanas',
    frequency: 'A cada 1 a 2 semanas (protocolo padrão para Mastocitoma)',
    applicableSpecies: ['canine', 'feline'],
    smallPatientRule: {
      thresholdKg: 10,
      description: 'Em cães <10 kg, monitorar nadir estrito antes da dose seguinte; pode-se iniciar com 1,5–1,8 mg/m².',
      adjustedDoseDisplay: '1,5 a 2,0 mg/m²',
    },
    calculateDose: ({ bsaM2, weightKg }) => {
      const isSmall = weightKg < 10;
      const dose = bsaM2 * (isSmall ? 1.75 : 2.0);
      return {
        calculatedDose: Number(dose.toFixed(2)),
        unit: 'mg',
        doseFormulaUsed: isSmall ? '1,75 mg/m² IV (faixa conservadora para <10 kg)' : '2,0 mg/m² IV (dose padrão BSAVA)',
        isSmallPatientAdjusted: isSmall,
      };
    },
    keyNotes: [
      'Vesicante grave: mesmo risco de necrose que a vincristina e doxorrubicina.',
      'Fármaco de primeira linha para Mastocitoma de alto grau ou não ressecável (associado a prednisolona).',
      'Mais mielossupressora que a vincristina, porém menos neurotóxica.',
    ],
    vesicant: true,
    nadirDays: '4 a 7 dias',
    precautions: [
      'Técnica first-stick mandatória para infusão venosa.',
      'Hemograma obrigatório pré-dose para checagem de neutrófilos segmentados.',
    ],
  },
  {
    id: 'clorambucila',
    name: 'Clorambucila (Leukeran)',
    class: 'Agente Alquilante de Ação Lenta',
    route: 'Oral (comprimidos)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '3 a 5 mg/m² PO em dias alternados (ou 20 mg/m² q2w)',
    frequency: 'Dias alternados contínuos ou pulsado a cada 2 semanas',
    applicableSpecies: ['canine', 'feline'],
    calculateDose: ({ bsaM2 }) => {
      const doseDaily = bsaM2 * 4.0;
      const dosePulse = bsaM2 * 20.0;
      return {
        calculatedDose: Number(doseDaily.toFixed(2)),
        unit: 'mg (dias alternados)',
        doseFormulaUsed: '4,0 mg/m² PO dias alternados (ou ' + Number(dosePulse.toFixed(1)) + ' mg q2w pulsado)',
        isSmallPatientAdjusted: false,
        note: 'Comprimido comercial disponível em 2 mg; não partir. Mandatório manipular doses intermediárias.',
      };
    },
    keyNotes: [
      'Excelente tolerância gastrointestinal.',
      'Substituto ideal da ciclofosfamida quando o paciente desenvolve cistite hemorrágica estéril.',
      'Indicação primordial: Linfoma felino de pequenas células (alimentar / baixo grau) associado a prednisolona.',
    ],
    vesicant: false,
    nadirDays: '7 a 14 dias (cumulativo com uso crônico)',
    precautions: [
      'Comprimidos não podem ser divididos. Manter refrigerado (2°C a 8°C).',
      'Acompanhar plaquetometria a cada 3–4 semanas.',
    ],
  },
  {
    id: 'mitoxantrona',
    name: 'Mitoxantrona',
    class: 'Antracenodiona Sintética',
    route: 'IV lenta (20 a 30 minutos diluído em NaCl 0,9%)',
    standardDoseUnit: 'mg/m²',
    standardDoseDisplay: '5 a 6 mg/m² IV a cada 3 semanas (gatos: 6–6,5 mg/m²)',
    frequency: 'A cada 3 semanas (21 dias)',
    applicableSpecies: ['canine', 'feline'],
    calculateDose: ({ bsaM2, species }) => {
      const rate = species === 'feline' ? 6.0 : 5.5;
      return {
        calculatedDose: Number((bsaM2 * rate).toFixed(2)),
        unit: 'mg',
        doseFormulaUsed: rate + ' mg/m² IV (faixa BSAVA)',
        isSmallPatientAdjusted: false,
      };
    },
    keyNotes: [
      'Coloração azulada marcante; pode colorir temporariamente a esclera e urina do paciente de azul-esverdeado.',
      'Alternativa à doxorrubicina com risco substancialmente menor de cardiotoxicidade.',
      'Indicação: Carcinoma de células transicionais (TCC / bexiga), adenocarcinoma de saco anal e resgates de linfoma.',
    ],
    vesicant: false,
    nadirDays: '7 a 10 dias',
    precautions: [
      'Monitorar hemograma completo no nadir aos 10 dias.',
      'Informar tutores sobre a coloração verde-azulada da urina por 24-48 horas.',
    ],
  },
];

/** Resumo de Diretrizes de Biossegurança e Regras de Ouro BSAVA */
export const BSAVA_SAFETY_GUIDELINES = [
  {
    title: 'A Regra de Ouro dos Pacientes Pequenos (<10 kg e <15 kg)',
    summary:
      'Animais com menos de 10 kg (ou <15 kg para antraciclinas) têm volume de distribuição proporcionalmente menor e metabolização diferenciada em relação à área corpórea. A dosagem estrita por m² superestima a dose e resulta em mielossupressão extrema e toxicidade gastrointestinal com risco de vida. Nesses casos, converte-se para mg/kg (ex.: Doxorrubicina 1 mg/kg em vez de 30 mg/m²).',
  },
  {
    title: 'Técnica de Punção Única ("First-Stick") para Vesicantes',
    summary:
      'Doxorrubicina, Vincristina e Vinblastina provocam necrose tecidual severa com destruição muscular e esfacelamento se extravasarem. O cateter venoso periférico deve ser introduzido de primeira tentativa ("first-stick"), testado com solução salina estéril sem resistência, mantendo refluxo sanguíneo antes, durante e após a infusão. Nunca utilizar veias puncionadas para coleta no mesmo dia.',
  },
  {
    title: 'Proibição Absoluta de Fracionar Comprimidos Citotóxicos',
    summary:
      'Comprimidos citotóxicos (ex.: Ciclofosfamida, Clorambucila, Lomustina) nunca devem ser cortados, partidos ou esmagados. Essa prática libera aerossóis mutagênicos no ambiente clínico e a distribuição do princípio ativo no comprimido não é uniforme. Se o peso do animal exigir dose intermediária, encomende a formulação exata em farmácia de manipulação veterinária habilitada.',
  },
  {
    title: 'Proteção Vesical Contra Cistite Hemorrágica Estéril',
    summary:
      'A ciclofosfamida gera acroleína, que se acumula na bexiga urinária causando ulceração e sangramento severo estéril. O protocolo profilático do BSAVA exige coadministração de furosemida (1 mg/kg PO q12h no dia do fármaco e seguintes), acesso irrestrito a água limpa e micções frequentes. Em caso de hematúria, suspender imediatamente.',
  },
  {
    title: 'Janela de Nadir e Monitorização Laboratorial',
    summary:
      'O nadir dos neutrófilos ocorre tipicamente entre o 7º e o 10º dia pós-quimioterapia para a maioria dos agentes (11–14 dias no cão e 14–21 dias no gato para carboplatina). Não realizar nova sessão de quimioterapia sem conferir neutrófilos (>2.000/μL) e plaquetas (>100.000/μL).',
  },
];

/** Citações bibliográficas formais */
export const BSAVA_BIBLIOGRAPHIC_SOURCES = [
  {
    title: 'BSAVA Manual of Canine and Feline Oncology',
    edition: '3rd Edition',
    authors: 'John M. Dobson & B. Duncan X. Lascelles',
    chapter: 'Chapter 7: Principles of Chemotherapy (pp. 60–87)',
    details:
      'Tabelas de Conversão de Peso para Área de Superfície Corporal (Figuras 7.3 e 7.4), Princípios de Dosagem, Toxicidades, Manejo e Perfis Farmacológicos.',
  },
  {
    title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline',
    edition: '10th Edition',
    authors: 'Fergus Allerton (Editor-in-Chief)',
    chapter: 'Appendix I: General Information & Appendix II: Protocols (pp. 455–468)',
    details:
      'Tabelas canônicas de BSA, Fórmulas de conversão k*(BW^2/3), Protocolos CHOP/COP para linfoma e protocolos para mastocitoma.',
  },
  {
    title: "Withrow and MacEwen's Small Animal Clinical Oncology",
    edition: '6th Edition',
    authors: 'David M. Vail, Douglas H. Thamm, Julius M. Liptak',
    chapter: 'Chapter 12: Cancer Chemotherapy (pp. 189–218)',
    details:
      'Farmacocinética de agentes citotóxicos em pequenos animais, limites de corte ponderais e depuração renal da carboplatina.',
  },
];
