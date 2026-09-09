import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationDose,
  ClinicalRecipeModel,
  DocumentTemplate,
} from '../types/receituario';
import { getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../utils/receituarioClinicalModels';

const NOW = '2026-08-02T00:00:00.000Z';

/** Produtos comerciais oral compatíveis com os protocolos de AINE pós-operatório. */
const MELOXICAM_ORAL_PRODUCTS = ['maxicam-ourofino', 'meloxivet-duprat', 'mellis-vet-avert'];
const CARPROFEN_ORAL_PRODUCTS = ['carproflan-agener-uniao', 'rimadyl-comprimidos-zoetis'];
const ROBENACOXIB_ORAL_PRODUCTS = ['onsior-elanco'];
const APOQUEL_ORAL_PRODUCTS = ['apoquel-zoetis'];
const ZENRELIA_ORAL_PRODUCTS = ['zenrelia-elanco'];
const CLORESTEN_TOPICAL_PRODUCTS = ['cloresten-shampoo-agener-uniao'];
const HIDRAPET_TOPICAL_PRODUCTS = ['hydrapet-creme-agener'];
const SILVER_SULFADIAZINE_TOPICAL_PRODUCTS = [
  'dermazine-30g-silvestre',
  'silglos-30g-silvestre',
  'sulfadiazina-prata-generico-uniao-quimica',
  'dermacerium-30g-silvestre',
];
const PHMB_SOAP_TOPICAL_PRODUCTS = ['pielsana-sabonete-phmb-dbs'];
const PHMB_GEL_TOPICAL_PRODUCTS = ['curatec-gel-phmb-lm-farma', 'prontosan-gel-bbraun'];
const PHMB_SOLUTION_TOPICAL_PRODUCTS = ['curatec-solucao-phmb-lm-farma', 'prontosan-solucao-bbraun'];

type MedicationOptions = {
  canonicalId?: string | null;
  presentations?: string[];
  linkedDoseIds?: string[];
  doseAlternatives?: ClinicalMedicationDefinition['doseAlternatives'];
  presentationFilter?: ClinicalMedicationDefinition['presentationFilter'];
  alert?: string;
  linkedProtocolKey?: string;
  patientInstructions?: string[];
  followUpPhases?: ClinicalMedicationDefinition['followUpPhases'];
};

function medication(
  key: string,
  name: string,
  dose: ClinicalMedicationDose,
  prescriptionText: string,
  options: MedicationOptions = {},
): ClinicalMedicationDefinition {
  return {
    key,
    name,
    canonicalMedicationId: options.canonicalId ?? null,
    canonicalLookupName: name,
    presentationIds: options.presentations || [],
    linkedDoseIds: options.linkedDoseIds || [],
    doseAlternatives: options.doseAlternatives,
    presentationFilter: options.presentationFilter || 'none',
    dose,
    doseSourceLabel: 'Modelo clínico do ConsultaVet',
    sourceReviewStatus: 'Revisão de fonte pendente',
    prescriptionText,
    internalAlert: options.alert,
    linkedProtocolKey: options.linkedProtocolKey,
    patientInstructions: options.patientInstructions,
    followUpPhases: options.followUpPhases,
  };
}

function template(
  id: string,
  title: string,
  category: string,
  species: 'cão' | 'gato' | 'ambos',
  model: ClinicalRecipeModel,
): DocumentTemplate {
  model = { ...model, options: model.options.map((option) => ({
    ...option,
    exclusiveGroup: option.exclusiveGroup || (['meloxicam', 'carprofen', 'robenacoxib', 'prednisolone', 'apoquel', 'zenrelia'].includes(option.key) ? 'anti-inflamatorio-sistemico' : undefined),
  })) };
  return {
    id,
    title,
    category,
    document_type: 'recipe',
    species,
    body_plain_text: renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), null),
    structured_defaults: { clinical_model: model },
    medication_ids: Array.from(new Set(model.options.flatMap((option) =>
      (option.medications || []).map((item) => item.canonicalMedicationId).filter((value): value is string => Boolean(value)),
    ))),
    is_global: true,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

const POSTOP_FEMALE_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Dor e pós-operatório > Castração',
  selectionMode: 'single',
  selectorLabel: 'Anti-inflamatório',
  defaultOptionKey: 'meloxicam',
  options: [
    {
      key: 'meloxicam',
      label: 'Meloxicam',
      medications: [medication('meloxicam-spay-dog', 'Meloxicam', {
        min: 0.1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '4 a 5 dias',
      }, `1. MELOXICAM — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 4 a 5 dias.

Iniciar 24 horas após a dose perioperatória, quando esta tiver sido administrada. Não utilizar se a paciente tiver recebido outro anti-inflamatório.`, {
        presentations: MELOXICAM_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'carprofen',
      label: 'Carprofeno',
      medications: [medication('carprofen-spay-dog', 'Carprofeno', {
        min: 2.2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '5 dias',
      }, `1. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 5 dias.

Regime equivalente: 4,4 mg/kg por via oral, a cada 24 horas, durante 5 dias.`, {
        presentations: CARPROFEN_ORAL_PRODUCTS,
        presentationFilter: 'oral',
        doseAlternatives: [{
          key: 'q24',
          label: '4,4 mg/kg a cada 24 horas',
          dose: { min: 4.4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '5 dias' },
          prescriptionText: `1. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 5 dias.

Regime equivalente ao esquema de 2,2 mg/kg a cada 12 horas.`,
        }],
      })],
    },
  ],
  recipeInformation: [
    'A analgesia perioperatória deve ser preventiva e multimodal, e o tratamento da dor deve continuar no ambiente domiciliar durante os dias em que ela persistir',
    'As doses de meloxicam e carprofeno estão de acordo com as referências farmacológicas para analgesia pós-operatória em cães',
  ],
  diseaseRecommendations: [
    'Utilizar roupa cirúrgica ou colar elizabetano durante todo o período de cicatrização',
    'Impedir que a paciente lamba, morda ou coce a incisão',
    'Manter a ferida cirúrgica limpa e seca',
    'Não aplicar pomadas, sprays, álcool, água oxigenada, iodo ou antissépticos na incisão fechada, salvo orientação veterinária',
    'Restringir corridas, saltos, brincadeiras intensas e acesso a escadas durante 10 a 14 dias',
    'Realizar passeios curtos, somente com guia, para urinar e defecar',
    'Não dar banho até a retirada dos pontos ou liberação pelo médico-veterinário',
    'Examinar a incisão duas vezes ao dia',
    'Pequena quantidade de edema e equimose pode ocorrer inicialmente, mas não deve aumentar progressivamente',
    'Antibióticos não devem ser prescritos rotineiramente após uma cirurgia eletiva limpa e sem intercorrências',
    'Caso a paciente apresente dor moderada ou intensa apesar do tratamento, realizar reavaliação para analgesia de resgate',
  ],
  medicationPrecautions: [
    'Suspender o anti-inflamatório e procurar avaliação diante de vômitos, diarreia, melena, hematêmese ou perda de apetite',
    'Não associar o anti-inflamatório prescrito a outro AINE ou corticosteroide',
    'Não utilizar AINE em paciente desidratada, hipovolêmica, hipotensa ou com doença renal, hepática, gastrointestinal ou distúrbio de coagulação sem reavaliação',
  ],
  returnSigns: [
    'Sangramento',
    'Abertura dos pontos',
    'Secreção ou odor desagradável',
    'Aumento progressivo do edema',
    'Dor intensa',
    'Febre',
    'Prostração',
    'Vômitos ou recusa alimentar',
  ],
};

const POSTOP_FEMALE_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Dor e pós-operatório > Castração',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'robenacoxib',
  options: [
    {
      key: 'robenacoxib',
      label: 'Robenacoxibe',
      medications: [medication('robenacoxib-spay-cat', 'Robenacoxibe', {
        min: 1, max: 2.4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 dias',
      }, `1. ROBENACOXIBE — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 dias.`, {
        presentations: ROBENACOXIB_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'meloxicam',
      label: 'Meloxicam',
      medications: [medication('meloxicam-spay-cat', 'Meloxicam', {
        min: 0.05, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'até 4 dias',
      }, `1. MELOXICAM — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante até 4 dias.

Iniciar 24 horas após uma dose perioperatória de 0,2 mg/kg, quando esta tiver sido administrada. Não continuar meloxicam oral após uma dose única de 0,3 mg/kg.`, {
        presentations: MELOXICAM_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
  ],
  recipeInformation: [
    'O robenacoxibe e o meloxicam são opções para o controle da dor pós-operatória felina, respeitando as limitações de dose e duração',
  ],
  diseaseRecommendations: [
    'Manter a gata em ambiente calmo, aquecido e separado de outros animais durante a recuperação inicial',
    'Utilizar roupa cirúrgica ou colar elizabetano continuamente',
    'Impedir lambedura ou mordedura da incisão',
    'Manter a ferida limpa e seca',
    'Não aplicar pomadas ou antissépticos em uma incisão fechada e íntegra',
    'Restringir saltos, corridas e brincadeiras durante 10 a 14 dias',
    'Não permitir acesso à rua',
    'Não dar banho até liberação veterinária',
    'Observar a região dos pontos duas vezes ao dia',
    'Dar antibiótico somente se estiver prescrito; não usar sobras de tratamentos anteriores',
  ],
  medicationPrecautions: [
    'Escolher apenas uma opção de anti-inflamatório',
    'Suspender o AINE e procurar avaliação diante de vômitos, diarreia, melena ou redução do apetite',
    'Não associar robenacoxibe ou meloxicam entre si, a outro AINE ou a corticosteroides',
    'Não administrar AINE se houver desidratação, hipotensão, hipovolemia ou comprometimento renal sem reavaliação',
  ],
  returnSigns: [
    'Abertura dos pontos',
    'Sangramento',
    'Secreção ou odor',
    'Aumento do edema',
    'Dor',
    'Prostração',
    'Vômitos ou anorexia',
  ],
};

const POSTOP_MALE_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Dor e pós-operatório > Castração',
  selectionMode: 'single',
  selectorLabel: 'Anti-inflamatório',
  defaultOptionKey: 'meloxicam',
  options: [
    {
      key: 'meloxicam',
      label: 'Meloxicam',
      medications: [medication('meloxicam-neuter-dog', 'Meloxicam', {
        min: 0.1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 dias',
      }, `1. MELOXICAM — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 dias.

Iniciar 24 horas após a dose perioperatória, quando esta tiver sido administrada.`, {
        presentations: MELOXICAM_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'carprofen',
      label: 'Carprofeno',
      medications: [medication('carprofen-neuter-dog', 'Carprofeno', {
        min: 2.2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '3 dias',
      }, `1. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 3 dias.

Regime equivalente: 4,4 mg/kg por via oral, a cada 24 horas, durante 3 dias.`, {
        presentations: CARPROFEN_ORAL_PRODUCTS,
        presentationFilter: 'oral',
        doseAlternatives: [{
          key: 'q24',
          label: '4,4 mg/kg a cada 24 horas',
          dose: { min: 4.4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 dias' },
          prescriptionText: `1. CARPROFENO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 dias.`,
        }],
      })],
    },
  ],
  recipeInformation: [
    'A duração do tratamento deve ser ajustada conforme avaliações seriadas de dor, mantendo-se o princípio de analgesia multimodal e domiciliar',
  ],
  diseaseRecommendations: [
    'Utilizar colar elizabetano continuamente durante 7 a 10 dias',
    'Não permitir lambedura ou mordedura da região escrotal',
    'Manter a incisão limpa e seca',
    'Não aplicar pomadas, sprays ou antissépticos sem orientação',
    'Restringir corridas, saltos, brincadeiras e escadas durante 7 a 10 dias',
    'Realizar apenas passeios curtos com guia',
    'Não dar banho durante o período de cicatrização',
    'Verificar a região operada duas vezes ao dia',
    'Pequeno edema escrotal pode ocorrer, mas deve permanecer discreto e diminuir progressivamente',
    'Dar antibiótico somente se estiver prescrito; não usar sobras de tratamentos anteriores',
  ],
  medicationPrecautions: [
    'Suspender o anti-inflamatório diante de vômitos, diarreia, melena ou anorexia',
    'Não associar outro AINE ou corticosteroide',
  ],
  returnSigns: [
    'Sangramento persistente',
    'Aumento do volume escrotal',
    'Coloração muito arroxeada',
    'Secreção ou odor',
    'Abertura da incisão',
    'Dor intensa ou prostração',
  ],
};

const POSTOP_MALE_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Dor e pós-operatório > Castração',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'robenacoxib',
  options: [
    {
      key: 'robenacoxib',
      label: 'Robenacoxibe',
      medications: [medication('robenacoxib-neuter-cat', 'Robenacoxibe', {
        min: 1, max: 2.4, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 dias',
      }, `1. ROBENACOXIBE — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 3 dias.`, {
        presentations: ROBENACOXIB_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
    },
  ],
  recipeInformation: [
    'Protocolos multimodais com bloqueio local, opioide e AINE proporcionam analgesia mais adequada após a orquiectomia felina',
  ],
  diseaseRecommendations: [
    'Manter o gato dentro de casa, em ambiente calmo e limpo',
    'Utilizar colar elizabetano se houver lambedura excessiva',
    'Restringir corridas, saltos e brincadeiras durante pelo menos 7 dias',
    'Não aplicar pomadas ou antissépticos na região escrotal sem orientação',
    'Pequena quantidade de sangue nas primeiras horas pode ocorrer, mas sangramento contínuo não é esperado',
    'A pequena abertura da cirurgia pode ser deixada sem pontos e fechar aos poucos, conforme explicado pela equipe; não tentar fechar ou cobrir sem orientação',
    'Dar antibiótico somente se estiver prescrito; não usar sobras de tratamentos anteriores',
  ],
  medicationPrecautions: [
    'Não associar o robenacoxibe a outro AINE ou a corticosteroides',
    'Não utilizar AINE em paciente desidratado, hipotenso, hipovolêmico ou com doença renal sem reavaliação',
  ],
  returnSigns: [
    'Sangramento persistente',
    'Aumento acentuado do volume escrotal',
    'Secreção purulenta ou odor',
    'Dor ou prostração',
    'Vômitos ou anorexia',
    'Dificuldade para urinar',
  ],
};

const ACUTE_GASTROENTERITIS_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Gastroenterologia > Gastroenterite aguda',
  selectionMode: 'multiple',
  selectorLabel: 'Medicações',
  defaultOptionKey: 'maropitant',
  options: [
    {
      key: 'maropitant',
      label: 'Maropitant',
      medications: [medication('maropitant-ge-dog', 'Maropitant', {
        min: 2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '2 a 3 dias',
      }, `1. MAROPITANT — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 2 a 3 dias.`, {
        canonicalId: 'med-maropitant',
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'ondansetron',
      label: 'Ondansetrona',
      medications: [medication('ondansetron-ge-dog', 'Ondansetrona', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 a 12 horas', duration: '3 dias',
      }, `1. ONDANSETRONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 8 a 12 horas, durante 3 dias.`, {
        presentations: ['vonau-vet-avert', 'vonau-flash-biolab', 'emedron-agener'],
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'probiotic',
      label: 'Probiótico ou simbiótico veterinário (adjuvante)',
      optional: true,
      medications: [medication('probiotic-ge-dog', 'Probiótico ou simbiótico veterinário', {
        min: 0, unit: 'mg/kg', basis: 'manual', route: 'oral', frequency: 'a cada 24 horas', duration: '7 a 10 dias',
      }, `2. PROBIÓTICO OU SIMBIÓTICO VETERINÁRIO — APRESENTAÇÃO A SELECIONAR

Administrar por via oral, conforme a dose recomendada pelo fabricante, a cada 24 horas, durante 7 a 10 dias.

Dose clínica: conforme orientação do fabricante.`, {
        presentations: ['probiotico-vetnil', 'beneflora-vet-avert', 'florentero-act-bioctal'],
        alert: 'Probióticos dependem de cepa, quantidade de microrganismos viáveis e produto. Usar como adjuvante e seguir a dose do rótulo da apresentação escolhida.',
      })],
    },
  ],
  recipeInformation: [
    'O maropitant oral é utilizado na dose de 2 mg/kg a cada 24 horas, e a alimentação enteral precoce é preferível ao jejum prolongado',
    'As diretrizes ENOVAT recomendam não usar antimicrobianos em cães com diarreia aguda leve, hemorrágica ou não hemorrágica, quando não há doença sistêmica',
    'Filhotes, cães não vacinados e pacientes com sinais sistêmicos devem ser investigados para parvovirose, parasitoses, corpo estranho e outras causas específicas',
  ],
  diseaseRecommendations: [
    'Oferecer dieta veterinária altamente digestível em pequenas porções, divididas em 4 a 6 refeições ao dia',
    'Reiniciar a alimentação precocemente assim que o vômito estiver controlado',
    'Não realizar jejum prolongado',
    'Manter água fresca disponível',
    'Em pacientes que ingerem água muito rapidamente e vomitam, oferecer pequenas quantidades várias vezes ao dia',
    'Não forçar grandes volumes de água ou alimento com seringa',
    'Após a resolução clínica, realizar transição gradual para a alimentação habitual durante 3 a 5 dias',
    'Suspender petiscos, alimentos gordurosos, restos de comida, ossos e mudanças alimentares durante a recuperação',
  ],
  medicationPrecautions: [
    'Não selecionar maropitant e ondansetrona automaticamente; reservar a associação para náusea ou vômito refratário',
    'Não utilizar metronidazol, tilosina ou outros antimicrobianos rotineiramente em cães estáveis com gastroenterite aguda não complicada',
    'Não incluir omeprazol, sucralfato ou outros gastroprotetores automaticamente; reservá-los para hematêmese, melena, esofagite ou suspeita de erosão/úlceração gastrointestinal',
  ],
  returnSigns: [
    'Vômitos persistentes',
    'Hematêmese ou melena',
    'Grande quantidade de sangue nas fezes',
    'Dor abdominal ou distensão',
    'Febre ou hipotermia',
    'Prostração ou desidratação',
    'Palidez ou alteração de consciência',
    'Ausência de melhora clara em 24 a 48 horas',
  ],
};

const TRACHEAL_COLLAPSE_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Respiratório > Colapso de traqueia',
  selectionMode: 'multiple',
  selectorLabel: 'Componentes do protocolo',
  defaultOptionKey: 'hydrocodone',
  options: [
    {
      key: 'hydrocodone',
      exclusiveGroup: 'antitussigeno',
      label: 'Hidrocodona (antitussígeno de primeira escolha)',
      medications: [medication('hydrocodone-tc-dog', 'Hidrocodona', {
        min: 0.22, max: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 6 a 8 horas', duration: '7 a 14 dias',
      }, `1. HIDROCODONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 6 a 8 horas, durante 7 a 14 dias.

Após controle da tosse, aumentar gradualmente o intervalo entre as administrações e manter a menor frequência eficaz.`, { presentationFilter: 'oral' })],
    },
    {
      key: 'codeine',
      exclusiveGroup: 'antitussigeno',
      label: 'Codeína (alternativa)',
      medications: [medication('codeine-tc-dog', 'Codeína', {
        min: 1, max: 2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 6 a 12 horas', duration: 'teste curto; reavaliar em 48 a 72 horas e antes de prolongar além de 7 dias',
      }, `1. CODEÍNA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 6 a 12 horas. Fazer contato de reavaliação em 48 a 72 horas e manter somente se houver benefício clínico sem sedação excessiva.

Não associar a hidrocodona, butorfanol ou outro antitussígeno opioide. Não usar para tosse produtiva com retenção de secreções.`, { presentationFilter: 'oral' })],
    },
    {
      key: 'prednisolone',
      label: 'Prednisolona (exacerbação inflamatória)',
      optional: true,
      medications: [medication('prednisolone-tc-dog', 'Prednisolona', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '5 a 7 dias',
      }, `2. PREDNISOLONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 5 a 7 dias.

Se houver necessidade de tratamento mais prolongado, reduzir gradualmente a dose e considerar substituição por corticosteroide inalatório.`, {
        canonicalId: 'med-prednisolona',
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'theophylline',
      label: 'Teofilina de liberação prolongada',
      optional: true,
      medications: [medication('theophylline-tc-dog', 'Teofilina de liberação prolongada', {
        min: 5, max: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: 'Continuamente até reavaliação.',
      }, `3. TEOFILINA DE LIBERAÇÃO PROLONGADA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, continuamente até reavaliação.

Não inserir teofilina automaticamente em colapso cervical isolado.`, { presentationFilter: 'oral' })],
    },
  ],
  recipeInformation: [
    'O controle da tosse é o principal componente do manejo clínico, com hidrocodona entre 0,22 e 0,5 mg/kg',
    'Corticosteroides devem ser utilizados por períodos curtos quando houver inflamação, e a teofilina é mais indicada quando existe broncomalácia ou colapso intratorácico',
    'O tratamento clínico é paliativo; pacientes refratários devem ser avaliados para fluoroscopia, broncoscopia e possível intervenção com prótese extraluminal ou stent',
  ],
  diseaseRecommendations: [
    'Substituir imediatamente a coleira cervical por peitoral',
    'Evitar qualquer pressão sobre o pescoço',
    'Promover perda de peso gradual nos pacientes com sobrepeso ou obesidade',
    'Evitar calor, umidade intensa, fumaça de cigarro, perfumes, aerossóis, poeira e produtos de limpeza voláteis',
    'Reduzir situações de excitação, latidos intensos e exercícios extenuantes',
    'Manter adequada higiene oral e tratar doença periodontal',
    'Gravar as crises de tosse, se for possível sem estressar o animal, e anotar os horários e o que estava acontecendo antes da crise',
    'Se o medicamento causar sonolência intensa, dificuldade para despertar ou respiração lenta, procurar atendimento imediatamente',
    'Não aumentar, diminuir nem combinar remédios para tosse por conta própria; combinar a reavaliação em 48 a 72 horas após iniciar ou ajustar o tratamento',
  ],
  medicationPrecautions: [
    'Escolher apenas uma opção de antitussígeno; não associar codeína e hidrocodona',
    'Investigar cardiopatia, hipertensão pulmonar, paralisia laríngea, broncomalácia e pneumonia concomitantes. Referência consultada: Ettinger, 9ª ed., capítulo de doença traqueobrônquica, PDF pp. 1310–1314',
    'Não utilizar antitussígenos quando houver pneumonia, tosse produtiva ou necessidade de eliminar secreções',
    'Antibióticos não devem ser incluídos automaticamente; utilizar somente quando houver evidência de infecção bacteriana',
    'A hidrocodona e a codeína podem causar sedação, constipação, vômitos e depressão respiratória',
    'Ajustar a dose do antitussígeno para controlar a tosse sem causar sedação excessiva',
    'A teofilina pode provocar agitação, tremores, taquicardia, vômitos ou diarreia e apresenta diversas interações medicamentosas',
    'Não associar prednisolona a AINE',
  ],
  returnSigns: [
    'Língua ou mucosas azuladas',
    'Síncope',
    'Respiração de boca aberta',
    'Intenso esforço respiratório',
    'Crise de tosse que não se interrompe',
  ],
};

const FELINE_ASTHMA: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Respiratório > Asma felina',
  selectionMode: 'multiple',
  selectorLabel: 'Componentes do protocolo',
  defaultOptionKey: 'prednisolone',
  options: [
    {
      key: 'prednisolone',
      label: 'Prednisolona (transição inicial)',
      medications: [medication('prednisolone-asthma-cat', 'Prednisolona', {
        min: 1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '7 dias; reavaliar antes de reduzir a dose',
      }, `1. PREDNISOLONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 7 dias. Reavaliar antes de reduzir a dose.

Não suspender nem reduzir por conta própria. A próxima etapa será definida na reavaliação.`, {
        canonicalId: 'med-prednisolona',
        presentationFilter: 'oral',
      })],
    },
    {
      key: 'fluticasone',
      exclusiveGroup: 'controlador-inalatorio',
      label: 'Propionato de fluticasona — Flixotide',
      medications: [
        medication('fluticasone-asthma-cat', 'Propionato de fluticasona — Flixotide', {
          min: 250, unit: 'mcg/animal', basis: 'per_animal', route: 'inalatória', frequency: 'a cada 12 horas', duration: 'Continuamente.',
        }, `2. PROPIONATO DE FLUTICASONA — FLIXOTIDE — APRESENTAÇÃO A SELECIONAR

Aplicar 1 jato da apresentação de 250 microgramas, por via inalatória, a cada 12 horas, continuamente. Manter a máscara bem ajustada ao focinho por 7 a 10 respirações depois do jato.

Não utilizar apresentações em pó seco, como Diskus ou Accuhaler. Utilizar somente a bombinha em spray encaixada no espaçador indicado para gatos. Não interromper nem reduzir por conta própria.`, {
          canonicalId: 'med-propionato-de-fluticasona',
          presentations: ['pres-flixotide-50', 'pres-flixotide-250'],
          alert: 'Fluticasona é controladora, não medicação de resgate. O modelo inicia com 250 mcg q12h porque corresponde a 1 jato inteiro da apresentação brasileira e à dose inicial prática de 220–250 mcg descrita na literatura. Reavaliar para redução. Sobrepor corticoide sistêmico na transição quando clinicamente indicado.',
          doseAlternatives: [{
            key: 'step-down',
            label: '50 microgramas por gato (redução após controle e reavaliação)',
            dose: { min: 50, unit: 'mcg/animal', basis: 'per_animal', route: 'inalatória', frequency: 'a cada 12 horas', duration: 'Continuamente.' },
            prescriptionText: `2. PROPIONATO DE FLUTICASONA — FLIXOTIDE — APRESENTAÇÃO A SELECIONAR

Aplicar 1 jato da apresentação de 50 microgramas, por via inalatória, a cada 12 horas, continuamente. Manter a máscara bem ajustada ao focinho por 7 a 10 respirações depois do jato.

Não utilizar apresentações em pó seco. Utilizar somente a bombinha em spray encaixada no espaçador indicado para gatos. Não interromper nem aumentar a dose por conta própria.`,
          }],
        }),
      ],
    },
    {
      key: 'seretide',
      exclusiveGroup: 'controlador-inalatorio',
      label: 'Fluticasona + salmeterol — seleção individual; evidência felina limitada',
      medications: [medication('seretide-asthma-cat', 'Propionato de fluticasona + salmeterol — Seretide Evohaler', {
        min: 125, unit: 'mcg/animal', basis: 'per_animal', route: 'inalatória', frequency: 'a cada 12 horas', duration: 'Continuamente.',
      }, `2. PROPIONATO DE FLUTICASONA + SALMETEROL — SERETIDE EVOHALER — APRESENTAÇÃO A SELECIONAR

Aplicar 1 jato da apresentação 25/125 microgramas, por via inalatória, a cada 12 horas, continuamente. Manter a máscara bem ajustada ao focinho por 7 a 10 respirações depois do jato.

Não utilizar apresentações em pó seco. Utilizar somente a bombinha em spray encaixada no espaçador indicado para gatos. Esta medicação é de uso diário e não serve para aliviar uma crise de falta de ar.`, {
        canonicalId: 'med-fluticasona-salmeterol',
        presentations: ['pres-seretide-25-50', 'pres-seretide-25-125', 'pres-seretide-25-250'],
        alert: 'A evidência direta em gatos para fluticasona + salmeterol é limitada e principalmente experimental, com regime diferente do uso crônico deste modelo. Selecionar somente após avaliação individual. Seretide contém broncodilatador de longa duração e não deve ser utilizado como resgate durante uma crise.',
        doseAlternatives: [{
          key: 'higher-fluticasone',
          label: '250 microgramas de fluticasona + 25 microgramas de salmeterol',
          dose: { min: 250, unit: 'mcg/animal', basis: 'per_animal', route: 'inalatória', frequency: 'a cada 12 horas', duration: 'Continuamente.' },
          prescriptionText: `2. PROPIONATO DE FLUTICASONA + SALMETEROL — SERETIDE EVOHALER — APRESENTAÇÃO A SELECIONAR

Aplicar 1 jato da apresentação 25/250 microgramas, por via inalatória, a cada 12 horas, continuamente. Manter a máscara bem ajustada ao focinho por 7 a 10 respirações depois do jato.

Utilizar somente a bombinha em spray encaixada no espaçador indicado para gatos. Esta medicação não serve para aliviar uma crise de falta de ar.`,
        }],
      })],
    },
    {
      key: 'salbutamol',
      label: 'Salbutamol (medicação de resgate)',
      optional: true,
      medications: [medication('salbutamol-asthma-cat', 'Salbutamol', {
        min: 100, unit: 'mcg/animal', basis: 'per_animal', route: 'inalatória', frequency: 'conforme broncoespasmo', duration: 'Uso pontual de resgate.',
      }, `3. SALBUTAMOL — APRESENTAÇÃO A SELECIONAR

Administrar 100 microgramas por gato, correspondentes a um jato, por via inalatória, em caso de broncoespasmo.

Pode ser repetido uma vez após 20 a 30 minutos enquanto o paciente é encaminhado para atendimento. O uso frequente não substitui o controle anti-inflamatório e exige reavaliação.`, {
        patientInstructions: ['Usar a bombinha de resgate com espaçador e máscara conforme a demonstração da equipe. Se necessário, repetir somente uma vez após 20 a 30 minutos enquanto leva o gato para atendimento. Não ficar repetindo doses em casa para adiar o atendimento.', 'Se houver falta de ar intensa, respiração de boca aberta ou língua azulada, procurar atendimento imediatamente. Não substituir a bombinha diária por esta medicação.'],
      })],
    },
  ],
  recipeInformation: [
    'Adquirir preferencialmente um espaçador veterinário para gatos, como o AeroKat ou equivalente',
    'Um espaçador humano pediátrico pode ser utilizado quando possuir máscara macia que vede completamente o focinho',
    'Acostumar o gato ao espaçador gradualmente, oferecendo reforço positivo antes de iniciar as aplicações',
    'Agitar a bombinha vigorosamente durante aproximadamente 5 a 10 segundos antes de cada aplicação',
    'Encaixar a bombinha na extremidade do espaçador e colocar a máscara sobre o focinho, garantindo vedação completa',
    'Pressionar a bombinha uma única vez e manter a máscara posicionada enquanto o gato realiza 7 a 10 respirações completas',
    'Contar as respirações pelo movimento da válvula do espaçador, quando houver indicador',
    'Administrar somente um jato por vez; quando forem prescritos dois jatos, esperar aproximadamente 30 segundos entre eles',
    'Não disparar dois jatos simultaneamente dentro da câmara',
    'Após o corticosteroide inalatório, limpar delicadamente o focinho e a região ao redor da boca com pano úmido',
    'Higienizar o espaçador conforme as instruções do fabricante e deixá-lo secar naturalmente',
    'Não interromper o tratamento inalatório apenas porque a tosse desapareceu',
    'A fluticasona não é medicação de resgate e pode necessitar de 7 a 10 dias para alcançar efeito clínico adequado; manter a prednisolona durante a transição inicial',
    'Nelson & Couto recomenda que o gato permaneça com a máscara enquanto realiza 7 a 10 respirações após cada jato',
    'A combinação fluticasona–salmeterol é opção de manutenção, mas não de resgate',
  ],
  diseaseRecommendations: [
    'Eliminar exposição a fumaça de cigarro, incenso, perfumes, sprays, aromatizadores e produtos de limpeza voláteis',
    'Para usar a bombinha prescrita, utilizar espaçador com máscara própria para gatos ou máscara que vede suavemente o focinho; pedir demonstração à equipe antes da primeira aplicação',
    'Acostumar o gato à máscara aos poucos, com carinho e recompensa, sem forçar quando ele estiver com falta de ar',
    'Agitar a bombinha conforme a bula, encaixar no espaçador, ajustar a máscara ao focinho e disparar somente um jato por vez',
    'Manter a máscara vedada por 7 a 10 respirações; observar o indicador do espaçador. Se houver outro jato prescrito, aguardar cerca de 30 segundos e repetir',
    'Limpar delicadamente o focinho com pano úmido após a aplicação; lavar e secar o espaçador conforme o fabricante',
    'A bombinha de uso diário previne crises e deve continuar mesmo sem tosse. Ela não substitui o remédio de alívio rápido prescrito para crises',
    'Não reduzir nem suspender o remédio oral por conta própria: a bombinha pode levar uma a duas semanas para atingir o efeito esperado. Reavaliar em 7 dias para definir os próximos passos',
    'Respiração de boca aberta, língua azulada, desmaio ou grande esforço para respirar exigem atendimento imediato; manter o gato calmo e não forçar comida, água ou comprimidos',
    'Preferir areia sanitária sem perfume e com baixa produção de poeira',
    'Evitar varrer ou usar aerossóis no mesmo ambiente do gato',
    'Controlar o peso corporal',
    'Registrar a frequência das crises, tosse, chiado e uso do salbutamol',
    'Contar periodicamente a frequência respiratória durante o sono',
    'Uso de salbutamol mais de duas ou três vezes por semana indica controle inadequado e necessidade de reavaliação',
  ],
  medicationPrecautions: [
    'Escolher apenas uma opção de tratamento inalatório contínuo',
    'Dose inicial de prednisolona 1 mg/kg q12h; individualizar a indução e o desmame segundo resposta, comorbidades e sobreposição com o inalatório. Ettinger 9ª ed., PDF pp. 1322–1323: indução por 1–2 semanas; não há esquema universal de suspensão em dez dias',
    'Seretide contém salmeterol de longa duração e não deve ser utilizado como resgate durante uma crise',
    'Não utilizar broncodilatador como monoterapia crônica; a inflamação das vias aéreas deve ser controlada com corticosteroide',
  ],
  returnSigns: [
    'Respiração de boca aberta',
    'Cianose',
    'Intenso esforço abdominal',
    'Incapacidade de permanecer deitado',
    'Fraqueza ou ausência de resposta ao resgate',
  ],
};

const POSTOP_WOUND_CARE: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Cuidados gerais > Manejo de feridas',
  selectionMode: 'single',
  selectorLabel: 'Tipo de ferida / protocolo',
  defaultOptionKey: 'clean-closed',
  options: [
    {
      key: 'clean-closed',
      label: 'Incisão cirúrgica fechada, limpa e íntegra',
      description: 'Não aplicar produtos rotineiramente.',
      medicationPrecautions: [
        'Manter a incisão limpa e seca',
        'Utilizar colar elizabetano ou roupa cirúrgica continuamente',
        'Não permitir lambedura, mordedura ou coçadura',
        'Não aplicar álcool, água oxigenada, soluções concentradas de iodo, pomadas humanas ou antibióticos tópicos sem indicação',
        'Examinar a incisão duas vezes ao dia',
      ],
    },
    {
      key: 'silver-sulfadiazine',
      label: 'Opção 1 — Sulfadiazina de prata 1%',
      medications: [medication('silver-sulfadiazine-wound', 'Sulfadiazina de prata 1%', {
        min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'uma a duas vezes ao dia', duration: 'Conforme reavaliação.',
      }, `1. SULFADIAZINA DE PRATA 1% — APRESENTAÇÃO A SELECIONAR

Após limpeza, aplicar uma camada fina, com aproximadamente 1 a 2 mm, sobre a área afetada, uma a duas vezes ao dia.

Cobrir com curativo estéril não aderente quando indicado.

Dose clínica: conforme orientação do fabricante e avaliação da ferida.`, {
        presentations: SILVER_SULFADIAZINE_TOPICAL_PRODUCTS,
      })],
      medicationPrecautions: [
        'Lavar as mãos e utilizar luvas limpas',
        'Remover cuidadosamente o curativo anterior; umedecer curativos aderidos com solução fisiológica antes da retirada',
        'Irrigar abundantemente a ferida com solução fisiológica 0,9%',
        'Remover apenas secreções e resíduos soltos, sem esfregar vigorosamente o tecido viável',
        'Secar delicadamente apenas a pele ao redor da lesão',
        'Impedir lambedura por pelo menos 20 a 30 minutos e, preferencialmente, utilizar colar elizabetano continuamente',
        'Não utilizar em animais com hipersensibilidade a sulfonamidas',
        'Evitar aplicação extensa ou prolongada em pacientes com doença renal ou hepática',
        'Evitar contato com os olhos',
        'A sulfadiazina pode prejudicar a granulação; não deve ser mantida automaticamente após formação de tecido de granulação saudável',
        'Reavaliar periodicamente a necessidade de continuar o produto',
      ],
    },
    {
      key: 'phmb-soap',
      label: 'Opção 2 — Sabonete com PHMB',
      medications: [medication('phmb-soap-wound', 'Sabonete com PHMB', {
        min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'uma a duas vezes ao dia', duration: 'Conforme reavaliação.',
      }, `1. SABONETE COM PHMB — APRESENTAÇÃO A SELECIONAR

Realizar a limpeza da ferida uma a duas vezes ao dia.

Dose clínica: conforme orientação do fabricante e avaliação da ferida.`, {
        presentations: PHMB_SOAP_TOPICAL_PRODUCTS,
      })],
      medicationPrecautions: [
        'Lavar as mãos e utilizar luvas',
        'Remover cuidadosamente o curativo anterior',
        'Irrigar inicialmente a ferida com solução fisiológica 0,9% para retirar secreções, sangue e resíduos soltos',
        'Aplicar pequena quantidade do sabonete com PHMB e distribuir delicadamente pelo leito e pelas margens, sem fricção agressiva',
        'Deixar o produto agir durante 5 minutos',
        'Remover completamente o excesso do sabonete com nova irrigação abundante de solução fisiológica 0,9%',
        'Secar delicadamente apenas a pele ao redor e cobrir com curativo estéril não aderente quando indicado',
        'Manter colar elizabetano ou outra barreira física',
        'Não utilizar o sabonete como substituto de desbridamento cirúrgico quando houver tecido necrótico',
        'Não introduzir o produto em cavidades profundas sem avaliação veterinária',
        'Não misturar PHMB a outros antissépticos no mesmo curativo',
        'Suspender se houver irritação intensa, dor crescente ou reação local',
      ],
    },
    {
      key: 'phmb-soap-gel',
      label: 'Opção 3 — Sabonete com PHMB + gel com PHMB',
      medications: [
        medication('phmb-soap-gel-wound-soap', 'Sabonete com PHMB', {
          min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'uma a duas vezes ao dia', duration: 'Conforme reavaliação.',
        }, `1. SABONETE COM PHMB — APRESENTAÇÃO A SELECIONAR

Realizar a limpeza uma a duas vezes ao dia:

• Irrigar a ferida com solução fisiológica 0,9%
• Aplicar o sabonete com PHMB
• Deixar agir durante 5 minutos
• Remover completamente o sabonete com solução fisiológica 0,9%
• Secar delicadamente a pele ao redor

Dose clínica: conforme orientação do fabricante e avaliação da ferida.`, {
          presentations: PHMB_SOAP_TOPICAL_PRODUCTS,
        }),
        medication('phmb-gel-wound', 'Gel com PHMB', {
          min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'após a limpeza', duration: 'Conforme reavaliação.',
        }, `2. GEL COM PHMB — APRESENTAÇÃO A SELECIONAR

Após a limpeza, aplicar uma camada fina e uniforme do gel sobre o leito da ferida.

Cobrir com gaze ou curativo estéril não aderente quando indicado.

Dose clínica: conforme orientação do fabricante e avaliação da ferida.`, {
          presentations: PHMB_GEL_TOPICAL_PRODUCTS,
        }),
      ],
      medicationPrecautions: [
        'Manter o leito úmido, mas não encharcado',
        'Ajustar a frequência das trocas conforme quantidade de exsudato',
        'Trocar imediatamente o curativo se estiver molhado, sujo, deslocado ou com odor',
        'Não introduzir gaze seca diretamente sobre tecido de granulação',
        'Não arrancar crostas ou tecidos firmemente aderidos',
        'Impedir lambedura e autotraumatismo',
        'Reavaliar a ferida regularmente para decidir sobre desbridamento, cultura, fechamento secundário ou mudança da cobertura',
      ],
    },
  ],
  recipeInformation: [
    'O uso rotineiro de antimicrobianos tópicos em incisões cirúrgicas limpas não possui benefício veterinário bem demonstrado',
    'Curativos impregnados com PHMB demonstram atividade contra bactérias veterinárias Gram-positivas e Gram-negativas e podem reduzir a contaminação do leito da ferida',
    'A irrigação com solução fisiológica, o uso de técnica limpa ou estéril e a proteção do leito com cobertura apropriada são fundamentos do manejo de feridas',
  ],
  diseaseRecommendations: [
    'Manter a ferida limpa e protegida conforme o protocolo selecionado',
    'Lavar as mãos antes e depois do cuidado e utilizar luvas limpas quando houver contato com o leito da ferida',
    'Impedir lambedura, mordedura ou coçadura com colar elizabetano, roupa cirúrgica ou outra barreira indicada',
    'Manter curativos limpos, secos e bem posicionados; trocar imediatamente se estiverem molhados, sujos, deslocados ou com odor',
    'Não aplicar álcool, água oxigenada, pomadas humanas, antibióticos ou outros antissépticos sem orientação médico-veterinária',
    'Examinar a ferida pelo menos duas vezes ao dia e registrar mudanças de abertura, secreção, odor, dor, calor, cor ou inchaço',
    'Comparecer às reavaliações para definir limpeza, desbridamento, cultura, troca de cobertura ou retirada de pontos',
  ],
  medicationPrecautions: [],
  returnSigns: [
    'Abertura, secreção, odor, dor, calor ou vermelhidão progressiva',
    'Sangramento ou aumento do edema',
    'Necrose ou progressão da lesão',
    'Febre ou apatia',
  ],
};

const ATOPIC_DERMATITIS_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Dermatologia > Dermatite atópica',
  selectionMode: 'multiple',
  selectorLabel: 'Tratamento',
  defaultOptionKey: 'apoquel',
  options: [
    {
      key: 'prednisolone',
      label: 'Opção 1 — Prednisolona (crise)',
      medications: [medication('prednisolone-atopy-dog', 'Prednisolona', {
        min: 1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '5 a 7 dias',
      }, `1. PREDNISOLONA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, durante 5 a 7 dias.

Não alterar as etapas sem orientação da equipe.`, {
        canonicalId: 'med-prednisolona',
        presentationFilter: 'oral',
        followUpPhases: [
          { doseMultiplier: 0.5, frequency: 'a cada 24 horas', duration: '5 a 7 dias' },
          { doseMultiplier: 0.5, frequency: 'a cada 48 horas', duration: '3 administrações' },
        ],
        patientInstructions: ['Após completar a última etapa prescrita, suspender e manter o acompanhamento. Se a coceira voltar, falar com a equipe antes de reiniciar.'],
      })],
    },
    {
      key: 'apoquel',
      label: 'Opção 2 — Oclacitinibe (Apoquel)',
      medications: [medication('apoquel-atopy-dog', 'Oclacitinibe — Apoquel', {
        min: 0.4, max: 0.6, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 12 horas', duration: '14 dias',
      }, `1. OCLACITINIBE — APOQUEL — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 12 horas, durante 14 dias.

O tratamento terá uma etapa de manutenção após os primeiros 14 dias.`, {
        presentations: APOQUEL_ORAL_PRODUCTS,
        presentationFilter: 'oral',
        followUpPhases: [{ doseMultiplier: 1, frequency: 'a cada 24 horas', duration: 'uso contínuo até reavaliação' }],
      })],
      medicationPrecautions: [
        'Não utilizar em cães com menos de 12 meses',
        'Investigar e tratar infecção bacteriana, fúngica ou parasitária concomitante',
        'Utilizar com cautela em pacientes com infecções recorrentes, demodicose ou neoplasia',
        'Não associar rotineiramente a corticosteroides sistêmicos, ciclosporina, Zenrelia ou outros imunossupressores',
        'Em tratamentos prolongados, considerar hemograma, bioquímica e urinálise basais e periódicos',
      ],
    },
    {
      key: 'zenrelia',
      label: 'Opção 3 — Ilunocitinibe (Zenrelia)',
      medications: [medication('zenrelia-atopy-dog', 'Ilunocitinibe — Zenrelia', {
        min: 0.6, max: 0.8, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'Continuamente até reavaliação.',
      }, `1. ILUNOCITINIBE — ZENRELIA — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via oral, a cada 24 horas, continuamente até reavaliação.

Pode ser administrado com ou sem alimento.`, {
        presentations: ZENRELIA_ORAL_PRODUCTS,
        presentationFilter: 'oral',
      })],
      medicationPrecautions: [
        'Utilizar somente em cães com pelo menos 12 meses',
        'Não associar rotineiramente a Apoquel, corticosteroides sistêmicos ou outros imunossupressores',
        'Investigar infecções cutâneas, urinárias, respiratórias e parasitárias antes e durante o tratamento',
        'Confirmar o estado vacinal antes de iniciar',
        'Não vacinar o paciente enquanto estiver recebendo Zenrelia',
        'A bula aprovada pela FDA recomenda suspensão entre 28 dias e 3 meses antes da vacinação e manutenção da suspensão por pelo menos 28 dias após a vacina',
      ],
    },
    {
      key: 'cloresten',
      label: 'Cloresten — xampu com clorexidina e miconazol',
      optional: true,
      medications: [medication('cloresten-atopy-dog', 'Cloresten — xampu com clorexidina e miconazol', {
        min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'duas vezes por semana', duration: '4 semanas',
      }, `2. CLORESTEN — XAMPU COM CLOREXIDINA E MICONAZOL — APRESENTAÇÃO A SELECIONAR

Realizar banhos duas vezes por semana, durante 4 semanas.

Molhar completamente a pele e a pelagem, aplicar quantidade suficiente para formar espuma, massagear delicadamente todo o corpo, deixar agir durante 10 minutos e enxaguar abundantemente até remover todo o produto.

Utilizar principalmente quando houver citologia ou suspeita clínica de proliferação de Malassezia ou infecção bacteriana superficial.

Dose clínica: conforme orientação do fabricante.`, {
        presentations: CLORESTEN_TOPICAL_PRODUCTS,
      })],
    },
    {
      key: 'hidrapet',
      label: 'Hidrapet — hidratante pós-banho',
      optional: true,
      medications: [medication('hidrapet-atopy-dog', 'Hidrapet — hidratante pós-banho', {
        min: 0, unit: 'mg/kg', basis: 'manual', route: 'tópica', frequency: 'após o banho', duration: '4 semanas',
      }, `3. HIDRAPET — HIDRATANTE PÓS-BANHO — APRESENTAÇÃO A SELECIONAR

Após enxaguar o Cloresten, remover apenas o excesso de água com uma toalha, aplicar o Hidrapet em toda a pele e pelagem, massagear suavemente, não enxaguar e deixar a pelagem secar naturalmente ou utilizar secador em temperatura fria ou morna, nunca quente.

Dose clínica: conforme orientação do fabricante.`, {
        presentations: HIDRAPET_TOPICAL_PRODUCTS,
      })],
    },
  ],
  recipeInformation: [
    'Prednisolona, oclacitinibe e terapias tópicas são tratamentos eficazes para dermatite atópica, mas devem ser selecionados individualmente e acompanhados do controle de infecções secundárias e da reparação da barreira cutânea',
    'O Apoquel é administrado na dose de 0,4–0,6 mg/kg a cada 12 horas por 14 dias e, posteriormente, uma vez ao dia',
    'O Zenrelia é administrado na dose de 0,6–0,8 mg/kg uma vez ao dia',
  ],
  diseaseRecommendations: [
    'Manter controle rigoroso de pulgas e outros ectoparasitas durante todo o ano',
    'Avisar se aparecerem feridas, secreção, mau cheiro na pele ou dor nos ouvidos; pode ser necessário examinar amostras da pele antes de escolher outro remédio',
    'Não usar antibióticos ou remédios contra fungos por conta própria',
    'Se a equipe recomendar um teste com alimento especial, oferecer somente esse alimento pelo período combinado, sem petiscos nem restos de comida',
    'A alergia de pele pode voltar e precisa de acompanhamento mesmo depois de melhorar',
    'Identificar e reduzir exposições ambientais associadas às crises',
    'Dar banhos e hidratar a pele somente com os produtos e a frequência prescritos',
    'Se as crises voltarem com frequência, combinar uma reavaliação para ajustar o controle de longo prazo',
    'Seguir cada etapa da receita e não aumentar, reduzir ou combinar remédios por conta própria',
  ],
  medicationPrecautions: [
    'Selecionar apenas uma opção sistêmica; não administrar prednisolona, Apoquel e Zenrelia simultaneamente como protocolo rotineiro',
    'Investigar piodermite, Malassezia e otite por citologia; indicar antimicrobianos conforme diagnóstico. Avaliar dieta de eliminação e imunoterapia alérgeno-específica quando indicadas.',
    'Não associar prednisolona a AINE',
  ],
  returnSigns: [
    'Piora súbita do prurido',
    'Pústulas, crostas ou odor intenso',
    'Secreção ou otalgia',
    'Aumento de sede e urina',
    'Vômitos ou diarreia',
    'Infecções recorrentes',
  ],
};

export const RECEITUARIO_PROTOCOL_MODELS: DocumentTemplate[] = [
  template('seed-pos-operatorio-castracao-cadela', 'Pós-operatório de castração — Cadela', 'Dor e pós-operatório', 'cão', POSTOP_FEMALE_DOG),
  template('seed-pos-operatorio-castracao-gata', 'Pós-operatório de castração — Gata', 'Dor e pós-operatório', 'gato', POSTOP_FEMALE_CAT),
  template('seed-pos-operatorio-castracao-cao-macho', 'Pós-operatório de castração — Cão macho', 'Dor e pós-operatório', 'cão', POSTOP_MALE_DOG),
  template('seed-pos-operatorio-castracao-gato-macho', 'Pós-operatório de castração — Gato macho', 'Dor e pós-operatório', 'gato', POSTOP_MALE_CAT),
  template('seed-gastroenterite-aguda-nao-complicada-cao', 'Gastroenterite aguda não complicada — Cão', 'Gastroenterologia', 'cão', ACUTE_GASTROENTERITIS_DOG),
  template('seed-colapso-traqueia-cao', 'Colapso de traqueia — Cão', 'Respiratório', 'cão', TRACHEAL_COLLAPSE_DOG),
  template('seed-asma-felina-protocolo', 'Asma felina', 'Respiratório', 'gato', FELINE_ASTHMA),
  template('seed-manejo-ferida-pos-operatoria', 'Manejo de ferida pós-operatória', 'Cuidados gerais', 'ambos', POSTOP_WOUND_CARE),
  template('seed-dermatite-atopica-cao', 'Dermatite atópica — Cão', 'Dermatologia', 'cão', ATOPIC_DERMATITIS_DOG),
];
