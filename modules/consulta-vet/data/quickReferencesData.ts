/**
 * Dados de referência para a seção de Oncologia do ConsultaVET.
 * Fontes:
 * - BSAVA Manual of Canine and Feline Oncology (3rd Edition), Capítulo 7: Principles of chemotherapy.
 * - BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition), Apêndice I e II.
 * - Withrow and MacEwen's Small Animal Clinical Oncology (6th Edition), Capítulos 12, 15 e 33.
 */

export type Species = 'canine' | 'feline';

export interface BsaTableRow {
  weightKg: number;
  bsaM2: number;
}

export type OncologyRegimen = 'conventional' | 'metronomic';

export interface OncologyDose {
  rates: readonly [number, number?];
  basis: 'mg/m²' | 'mg/kg' | 'UI/m²' | 'UI/kg' | 'mg';
  schedule: string;
  route?: string;
  species?: Species;
  dogWeight?: 'under15' | 'atLeast15';
}

export interface OncologyDrug {
  id: string;
  name: string;
  class: string;
  regimen: OncologyRegimen;
  route: string;
  doses: OncologyDose[];
  source: string;
  sourceUrl?: string;
  indication: string;
  keyNotes: string[];
  vesicant: boolean;
  nadirDays?: string;
  precautions: string[];
}

export function calculateOncologyDose(dose: OncologyDose, weightKg: number, bsaM2: number): number[] {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return [];
  const multiplier = dose.basis.endsWith('/m²') ? bsaM2 : dose.basis.endsWith('/kg') ? weightKg : 1;
  return dose.rates.flatMap((rate) => rate === undefined ? [] : [rate * multiplier]);
}

export function getOncologyDoses(drug: OncologyDrug, species: Species, weightKg: number): OncologyDose[] {
  const dogWeight = weightKg < 15 ? 'under15' : 'atLeast15';
  return drug.doses.filter((dose) =>
    (!dose.species || dose.species === species) &&
    (!dose.dogWeight || weightKg <= 0 || dose.dogWeight === dogWeight)
  );
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
    regimen: 'conventional',
    doses: [
      { rates: [30], basis: 'mg/m²', schedule: 'A cada 21 dias · cães ≥15 kg', species: 'canine', dogWeight: 'atLeast15' },
      { rates: [1], basis: 'mg/kg', schedule: 'A cada 21 dias · cães <15 kg', species: 'canine', dogWeight: 'under15' },
      { rates: [1], basis: 'mg/kg', schedule: 'A cada 21 dias', species: 'feline' },
    ],
    source: 'Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.; BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Referência de ciclo convencional. A calculadora usa 15 kg como corte em cães, com base no Withrow. O manual BSAVA descreve 10 kg.',
    keyNotes: [
      'Vesicante extremo: risco de necrose tecidual grave por extravasamento.',
      'Cardiotoxicidade cumulativa em cães (dose cumulativa limite ~180–240 mg/m²). Realizar ecocardiograma prévio se cardiopata.',
      'Nefrotoxicidade em gatos (monitorar creatinina e urina rotineiramente).',
      'Dexrazoxano disponível como cardioprotetor (proporção 10:1 em relação à doxorrubicina, 30 min antes).',
    ],
    vesicant: true,
    nadirDays: '7 a 10 dias (neutropenia)',
    precautions: [
      'Somente puncionar cateter com técnica de punção única ("first-stick"); nunca usar veia já puncionada no mesmo dia.',
      'A referência descreve diluição em solução fisiológica 0,9%.',
    ],
  },
  {
    id: 'vincristina',
    name: 'Vincristina',
    class: 'Alcalóide da Vinca / Inibidor Mitótico',
    route: 'IV estrito (bolus lento ou infusão curta)',
    regimen: 'conventional',
    doses: [{ rates: [0.5, 0.75], basis: 'mg/m²', schedule: 'Semanal ou conforme o protocolo combinado' }],
    source: 'BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Linfoma (CHOP/COP) e outros protocolos específicos. Avaliar ajuste individual em cães com variante ABCB1.',
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
    regimen: 'conventional',
    doses: [
      { rates: [200, 250], basis: 'mg/m²', schedule: 'Dose total por ciclo a cada 21 dias' },
      { rates: [50], basis: 'mg/m²', route: 'VO', schedule: 'A cada 48 h ou 3–4 dias consecutivos na semana, conforme o protocolo linfoide' },
      { rates: [250, 300], basis: 'mg/m²', route: 'VO', schedule: 'COP felino · dose total a cada 21 dias, no dia após a vincristina', species: 'feline' },
    ],
    source: 'BSAVA Small Animal Formulary, 10ª ed.; BSAVA Manual of Canine and Feline Oncology, 3ª ed.; Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.',
    indication: 'Neoplasias linfoides. O fracionamento da dose oral total e os dias de administração dependem do protocolo.',
    keyNotes: [
      'Metabolito acroleína é irritante vesical e pode causar Cistite Hemorrágica Estéril.',
      'Monitorar hemograma e sinais urinários. Diante de hematúria ou disúria, interromper e investigar cistite; a alternativa depende do protocolo.',
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
    regimen: 'conventional',
    doses: [
      { rates: [300], basis: 'mg/m²', schedule: 'A cada 21 dias', species: 'canine' },
      { rates: [200, 250], basis: 'mg/m²', schedule: 'A cada 21 dias', species: 'feline' },
    ],
    source: 'BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Exemplo de uso: osteossarcoma apendicular canino em adjuvância. Avaliar função renal antes de definir a dose.',
    keyNotes: [
      'Segura em felinos (ao contrário da cisplatina que causa edema pulmonar letal em gatos).',
      'Excreção predominantemente renal; monitorar perfil renal (ureia, creatinina, densidade).',
      'Mielossupressão é a principal toxicidade limitante de dose.',
      'Indicação principal: Osteossarcoma apendicular canino (adjuvante pós-amputação) e carcinomas.',
    ],
    vesicant: false,
    nadirDays: 'Cão: 11 a 14 dias | Gato: 14 a 21 dias (nadir mais tardio)',
    precautions: [
      'Programar o hemograma de nadir conforme a espécie e o protocolo.',
      'Conferir hemograma antes do próximo ciclo e aplicar os critérios do protocolo para adiar ou ajustar a dose.',
    ],
  },
  {
    id: 'lomustina',
    name: 'Lomustina (CCNU)',
    class: 'Nitrosoureia (Agente Alquilante Lipofílico)',
    route: 'Oral (cápsulas)',
    regimen: 'conventional',
    doses: [
      { rates: [60, 90], basis: 'mg/m²', schedule: 'A cada 3 semanas', species: 'canine' },
      { rates: [50, 60], basis: 'mg/m²', schedule: 'A cada 5–6 semanas', species: 'feline' },
    ],
    source: 'BSAVA Manual of Canine and Feline Oncology, 3ª ed.; Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.',
    indication: 'Exemplos de uso: linfoma cutâneo, mastocitoma e tumores do SNC, conforme protocolo.',
    keyNotes: [
      'Atravessa a barreira hematoencefálica (excelente para neoplasias do SNC e linfoma cutâneo).',
      'Risco de hepatotoxicidade cumulativa em cães; acompanhar enzimas hepáticas durante o tratamento.',
      'Mielossupressão severa, tardia e cumulativa (trombocitopenia persistente).',
      'Fibrose pulmonar irreversível descrita em gatos.',
      'O Withrow relata estudos metronômicos em cães com toxicidade relevante e benefício clínico incerto. Os cálculos deste cartão são para ciclos convencionais.',
    ],
    vesicant: false,
    nadirDays: '7 a 14 dias (neutrófilos) e até 21 a 28 dias (plaquetas)',
    precautions: [
      'Manter as cápsulas de lomustina intactas durante o manuseio.',
      'Avaliar ALT/FA antes de cada sessão; suspender se elevação contínua.',
    ],
  },
  {
    id: 'crisantaspase',
    name: 'Crisantaspase (L-Asparaginase)',
    class: 'Enzima Específica de Fase G1',
    route: 'IM ou SC (evitar IV pelo risco de anafilaxia)',
    regimen: 'conventional',
    doses: [
      { rates: [400], basis: 'UI/kg', schedule: 'Indução ou resgate, conforme protocolo' },
      { rates: [10000], basis: 'UI/m²', schedule: 'Esquema alternativo de indução ou resgate' },
    ],
    source: 'Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.; BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Doenças linfoproliferativas. As duas bases de cálculo são opções de protocolo e geram valores distintos.',
    keyNotes: [
      'Inibe a síntese protéica privando os blastos de asparagina exógena.',
      'Mielossupressão é incomum. Avaliar o hemograma e a condição clínica antes da administração.',
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
    regimen: 'conventional',
    doses: [{ rates: [2], basis: 'mg/m²', schedule: 'Semanal ou conforme o protocolo' }],
    source: 'BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Mastocitoma e alguns protocolos de linfoma.',
    keyNotes: [
      'Vesicante grave: mesmo risco de necrose que a vincristina e doxorrubicina.',
      'Fármaco de primeira linha para Mastocitoma de alto grau ou não ressecável (associado a prednisolona).',
      'Mais mielossupressora que a vincristina, porém menos neurotóxica.',
    ],
    vesicant: true,
    nadirDays: '4 a 9 dias',
    precautions: [
      'Técnica first-stick mandatória para infusão venosa.',
      'Hemograma obrigatório pré-dose para checagem de neutrófilos segmentados.',
    ],
  },
  {
    id: 'clorambucila',
    name: 'Clorambucila (Clorambucil, Leukeran)',
    class: 'Agente Alquilante de Ação Lenta',
    route: 'Oral (comprimidos)',
    regimen: 'conventional',
    doses: [
      { rates: [15, 20], basis: 'mg/m²', schedule: 'A cada 14 dias · com prednisolona', species: 'canine' },
      { rates: [2, 6], basis: 'mg/m²', schedule: 'A cada 24–48 h · alternativa para linfoma canino', species: 'canine' },
      { rates: [20], basis: 'mg/m²', schedule: 'A cada 14 dias · com prednisolona', species: 'feline' },
      { rates: [2], basis: 'mg', schedule: 'A cada 48 h · alternativa para linfoma alimentar felino de baixo grau', species: 'feline' },
    ],
    source: 'BSAVA Small Animal Formulary, 10ª ed.; Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.',
    indication: 'Linfoma. Em gatos, os esquemas exibidos referem-se ao linfoma alimentar de baixo grau.',
    keyNotes: [
      'Excelente tolerância gastrointestinal.',
      'Pode substituir a ciclofosfamida em protocolos específicos, com dose própria para a indicação.',
      'Monitorar citopenias tardias durante o uso prolongado.',
    ],
    vesicant: false,
    nadirDays: 'Mielossupressão tardia; monitorar durante o tratamento',
    precautions: [
      'Comprimidos não podem ser divididos. Manter refrigerado (2°C a 8°C).',
      'Acompanhar hemograma e plaquetas de forma seriada, conforme o protocolo.',
    ],
  },
  {
    id: 'mitoxantrona',
    name: 'Mitoxantrona',
    class: 'Antracenodiona Sintética',
    route: 'IV em 15–20 min, diluída em NaCl 0,9%',
    regimen: 'conventional',
    doses: [
      { rates: [5.5], basis: 'mg/m²', schedule: 'A cada 21 dias', species: 'canine' },
      { rates: [6.5], basis: 'mg/m²', schedule: 'A cada 21 dias', species: 'feline' },
    ],
    source: 'BSAVA Manual of Canine and Feline Oncology, 3ª ed.',
    indication: 'Exemplos de uso: resgate de linfoma e carcinoma urotelial, conforme protocolo.',
    keyNotes: [
      'Coloração azulada marcante; pode colorir temporariamente a esclera e urina do paciente de azul-esverdeado.',
      'Alternativa à doxorrubicina com risco substancialmente menor de cardiotoxicidade.',
      'Indicação: Carcinoma de células transicionais (TCC / bexiga), adenocarcinoma de saco anal e resgates de linfoma.',
    ],
    vesicant: false,
    nadirDays: '7 a 10 dias',
    precautions: [
      'Monitorar hemograma na janela de nadir e prevenir extravasamento devido ao risco de irritação tecidual.',
      'Informar tutores sobre a coloração verde-azulada da urina por 24-48 horas.',
    ],
  },
  {
    id: 'ciclofosfamida-metronomica-canina',
    name: 'Ciclofosfamida',
    class: 'Agente alquilante',
    regimen: 'metronomic',
    route: 'VO',
    doses: [{ rates: [10, 15], basis: 'mg/m²', schedule: 'A cada 24 h, em uso contínuo', species: 'canine' }],
    source: 'BSAVA Small Animal Formulary, 10ª ed.; Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.',
    indication: 'Protocolos selecionados para tumores sólidos em cães. A dose e a associação variam com o tumor e o protocolo.',
    keyNotes: [
      'Em sarcoma de tecidos moles com ressecção incompleta, Elmslie et al. estudaram 10 mg/m² com piroxicam. O estudo também incluiu administração em dias alternados, com eficácia comparativa incerta.',
      'Acompanhar hemograma, urinálise e sinais urinários pela possibilidade de toxicidade cumulativa e cistite hemorrágica estéril.',
    ],
    vesicant: false,
    precautions: ['Diante de hematúria ou disúria, interromper e investigar. Manter a formulação oral intacta durante o manuseio.'],
  },
  {
    id: 'clorambucila-metronomica-canina',
    name: 'Clorambucila (Clorambucil)',
    class: 'Agente alquilante',
    regimen: 'metronomic',
    route: 'VO',
    doses: [{ rates: [4], basis: 'mg/m²', schedule: 'A cada 24 h, em uso contínuo', species: 'canine' }],
    source: 'BSAVA Small Animal Formulary, 10ª ed.; Withrow & MacEwen’s Small Animal Clinical Oncology, 6ª ed.; Therapeutic Strategies in Veterinary Oncology.',
    indication: 'Protocolo estudado em cães com tumores espontâneos, incluindo carcinoma urotelial de bexiga.',
    keyNotes: ['Acompanhar hemograma e plaquetas em série pelo risco de mielossupressão cumulativa.'],
    vesicant: false,
    precautions: ['Manusear comprimidos intactos e usar formulação apropriada à dose prescrita.'],
  },
  {
    id: 'ciclofosfamida-metronomica-felina',
    name: 'Ciclofosfamida',
    class: 'Agente alquilante',
    regimen: 'metronomic',
    route: 'VO',
    doses: [{ rates: [15], basis: 'mg/m²', schedule: 'A cada 24 h, em uso contínuo', species: 'feline' }],
    source: 'Petrucci et al., estudo retrospectivo multicêntrico de carcinoma mamário metastático felino.',
    sourceUrl: 'https://doi.org/10.1177/1098612X20964416',
    indication: 'Esquema estudado em 11 gatas com carcinoma mamário metastático. Evidência limitada a esse contexto.',
    keyNotes: ['Acompanhar hemograma e sinais urinários ao longo do tratamento.'],
    vesicant: false,
    precautions: ['Manusear a formulação oral intacta. Investigar sinais de toxicidade antes de prosseguir com o esquema.'],
  },
  {
    id: 'clorambucila-metronomica-felina',
    name: 'Clorambucila (Clorambucil)',
    class: 'Agente alquilante',
    regimen: 'metronomic',
    route: 'VO',
    doses: [{ rates: [0.4, 0.6], basis: 'mg/kg', schedule: 'A cada 48 h, em uso contínuo', species: 'feline' }],
    source: 'Petrucci et al., estudo retrospectivo multicêntrico de carcinoma mamário metastático felino.',
    sourceUrl: 'https://doi.org/10.1177/1098612X20964416',
    indication: 'Esquema estudado em quatro gatas com carcinoma mamário metastático. Evidência limitada a esse contexto.',
    keyNotes: ['Acompanhar hemograma e plaquetas em série pelo risco de mielossupressão cumulativa.'],
    vesicant: false,
    precautions: ['Manusear comprimidos intactos e usar formulação apropriada à dose prescrita.'],
  },
];

/** Diretrizes de biossegurança e monitorização */
export const BSAVA_SAFETY_GUIDELINES = [
  {
    id: 'dose',
    title: 'Dose por peso ou superfície corporal',
    summary:
      'A base de cálculo depende do fármaco, da espécie e do protocolo. Para doxorrubicina, o Withrow descreve opções de redução em cães pequenos e gatos; o corte de peso varia entre referências.',
  },
  {
    id: 'vesicants',
    title: 'Técnica de Punção Única ("First-Stick") para Vesicantes',
    summary:
      'Doxorrubicina, Vincristina e Vinblastina provocam necrose tecidual severa com destruição muscular e esfacelamento se extravasarem. O cateter venoso periférico deve ser introduzido de primeira tentativa ("first-stick"), testado com solução salina estéril sem resistência, mantendo refluxo sanguíneo antes, durante e após a infusão. Nunca utilizar veias puncionadas para coleta no mesmo dia.',
  },
  {
    id: 'tablets',
    title: 'Proibição Absoluta de Fracionar Comprimidos Citotóxicos',
    summary:
      'Comprimidos citotóxicos (ex.: Ciclofosfamida, Clorambucila, Lomustina) nunca devem ser cortados, partidos ou esmagados. Essa prática libera aerossóis mutagênicos no ambiente clínico e a distribuição do princípio ativo no comprimido não é uniforme. Se o peso do animal exigir dose intermediária, encomende a formulação exata em farmácia de manipulação veterinária habilitada.',
  },
  {
    id: 'urinary',
    title: 'Monitorização urinária com ciclofosfamida',
    summary:
      'A acroleína pode provocar cistite hemorrágica estéril. Acompanhe sinais urinários e urinálise, sobretudo durante o uso contínuo. Diante de hematúria ou disúria, interrompa e investigue; a profilaxia deve seguir o protocolo e a avaliação individual.',
  },
  {
    id: 'nadir',
    title: 'Janela de Nadir e Monitorização Laboratorial',
    summary:
      'O nadir dos neutrófilos ocorre tipicamente entre o 7º e o 10º dia pós-quimioterapia para a maioria dos agentes (11–14 dias no cão e 14–21 dias no gato para carboplatina). Avalie neutrófilos e plaquetas conforme o protocolo. Em esquemas metronômicos, programe monitorização seriada de toxicidade cumulativa.',
  },
] as const;

/** Citações bibliográficas formais */
export const BSAVA_BIBLIOGRAPHIC_SOURCES = [
  {
    title: 'BSAVA Manual of Canine and Feline Oncology',
    edition: '3rd Edition',
    authors: 'John M. Dobson & B. Duncan X. Lascelles',
    chapter: 'Principles of Chemotherapy',
    details:
      'Conversão de Peso para Área de Superfície Corporal, Princípios de Dosagem, Toxicidades, Manejo e Perfis Farmacológicos.',
  },
  {
    title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline',
    edition: '10th Edition',
    authors: 'Fergus Allerton (Editor-in-Chief)',
    chapter: 'Formulário de Oncologia e Protocolos',
    details:
      'Posologia por espécie e indicação, incluindo esquemas metronômicos em cães.',
  },
  {
    title: "Withrow and MacEwen's Small Animal Clinical Oncology",
    edition: '6th Edition',
    authors: 'David M. Vail, Douglas H. Thamm, Julius M. Liptak',
    chapter: 'Clinical Oncology',
    details:
      'Quimioterapia convencional, estudos metronômicos e protocolos para tumores hematopoiéticos.',
  },
];
