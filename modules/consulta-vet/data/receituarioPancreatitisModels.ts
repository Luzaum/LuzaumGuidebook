import type { ClinicalMedicationDefinition, ClinicalRecipeModel, DocumentTemplate } from '../types/receituario';
import { renderClinicalRecipe } from '../utils/receituarioClinicalModels';

// Fontes efetivamente consultadas e páginas registradas em docs/receituario-review-2026-09-07.md.
const sources = [
  'Plumb’s Veterinary Drug Handbook, 10ª ed.: maropitant (PDF 826–829), ondansetron (983–985), buprenorfina (177–182), ursodiol (1314–1316).',
  'Ettinger, 9ª ed. (2024), caps. 225, 277 e 278; PDF pp. 1400–1406 e 2018–2027. Nelson & Couto, 6ª ed., pancreatite, PDF pp. 650–665.',
  'ACVIM 2021: pancreatite felina, doi:10.1111/jvim.16053 — https://academic.oup.com/jvim/article/35/2/703/8447048',
];

function drug(key: string, name: string, canonicalId: string, dose: ClinicalMedicationDefinition['dose'], instructions: string[], linkedDoseIds: string[] = [], presentationIds: string[] = []): ClinicalMedicationDefinition {
  return {
    key, name, canonicalMedicationId: canonicalId, canonicalLookupName: name,
    dose, linkedDoseIds, presentationIds, presentationFilter: dose.route === 'oral' ? 'oral' : 'none',
    doseSourceLabel: 'Modelo clínico do ConsultaVet', sourceReviewStatus: 'Revisão de fonte pendente',
    prescriptionText: `1. ${name.toUpperCase()} — APRESENTAÇÃO A SELECIONAR\n\nAdministrar A PREENCHER por via ${dose.route}, ${dose.frequency}, durante ${dose.duration}.`,
    patientInstructions: instructions,
  };
}

function supportiveOptions(cat: boolean): ClinicalRecipeModel['options'] {
  return [
    {
      key: 'maropitant', label: 'Maropitant oral — vômitos, paciente estável', optional: true,
      description: cat ? 'Uso oral extrabula em gatos. Confirmar idade, função hepática e apresentação.' : 'Regime oral para vômitos; não usar a dose de cinetose.',
      medications: [drug(`maropitant-pancreatitis-${cat ? 'cat' : 'dog'}`, 'Maropitant', 'med-maropitant', {
        min: cat ? 1 : 2, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: '3 dias; reavaliar em 24 a 48 horas',
      }, ['Oferecer com pequena quantidade de alimento. Se vomitar após a medicação, não repetir a dose sem falar com a equipe.', 'Este remédio reduz o vômito, mas não substitui o tratamento da dor nem garante que o animal esteja conseguindo se alimentar.'])],
    },
    {
      key: 'ondansetron', label: 'Ondansetrona oral — náusea persistente', optional: true,
      description: 'Selecionar após avaliação da náusea; associação ao maropitant é decisão clínica.',
      medications: [drug(`ondansetron-pancreatitis-${cat ? 'cat' : 'dog'}`, 'Ondansetrona', 'med-ondansetron', {
        min: 0.5, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 8 horas', duration: '3 dias; reavaliar em 24 a 48 horas',
      }, ['Pode ser oferecido com ou sem alimento. Anotar se há vômitos, salivação ou recusa da comida e informar à equipe.', 'Se o animal não consegue engolir ou vomita tudo o que recebe, procurar atendimento para mudar a forma de tratamento.'])],
    },
  ];
}

function pancreatitis(cat: boolean): ClinicalRecipeModel {
  return {
    schemaVersion: 1, careSetting: 'ambulatorial', categoryPath: 'Gastroenterologia > Pancreatite',
    selectionMode: 'multiple', selectorLabel: 'Suporte após avaliação e estabilização',
    incompleteProtocolWarning: 'Não é protocolo de internação. Confirmar hidratação, analgesia, ingestão e necessidade de sonda. Selecionar apenas medicamentos indicados; nenhuma medicação é inserida automaticamente.',
    options: supportiveOptions(cat),
    veterinarianNotes: [
      ...sources,
      'Ambulatório apenas se estável, hidratado, com dor controlada, tolerância oral e retorno próximo. Dor relevante, hipoperfusão, desidratação ou vômitos persistentes requerem internação e analgesia titulável.',
      'Não incluir antibióticos, inibidores de ácido, enzimas pancreáticas ou corticoides rotineiramente na pancreatite aguda. Tratar indicação independente documentada; antibióticos para infecção/sepse, enzimas para insuficiência pancreática exócrina.',
      'Maropitant não substitui opioide para analgesia. Ondansetrona: Plumb’s 10ª ed. sustenta intervalo q8–12h em cães e q6–12h em gatos; o intervalo q24–48h impresso no cap. 225 de Ettinger não foi adotado.',
      cat ? 'Analgesia felina deve ser definida na clínica e administrada antes da alta quando depender de apresentação injetável. Maropitant oral em gatos é extrabula.' : 'Analgesia canina deve ser prescrita conforme avaliação e via domiciliar disponível. Avaliar triglicerídeos e comorbidades.',
      cat ? 'Não há benefício comprovado da restrição rotineira de gordura em gatos. Definir dieta conforme aceitação, necessidades e enteropatia concomitante.' : 'Preferir dieta completa de alta digestibilidade com restrição de gordura individualizada; considerar dieta anterior, hipertrigliceridemia e recorrência.',
      'As durações iniciais são pontos de reavaliação do fluxo, não cursos universais comprovados para pancreatite; ajustar antes de emitir. Monitorar alimentação, dor, hidratação, eletrólitos e comorbidades.',
    ],
    diseaseRecommendations: [
      'O pâncreas está inflamado e isso pode causar dor, enjoo e falta de apetite. Mesmo que pare de vomitar, o animal ainda pode precisar de tratamento e acompanhamento.',
      'Oferecer pequenas porções do alimento indicado pela equipe várias vezes ao dia, respeitando a quantidade diária prescrita. Não deixar em jejum para “descansar o pâncreas”.',
      cat ? 'Não trocar automaticamente por alimento com pouca gordura. O alimento deve ser escolhido para este gato, considerando também o intestino e o fígado.' : 'Oferecer somente a dieta indicada. Evitar restos de comida, frituras, queijos, pele de frango e petiscos gordurosos.',
      'Manter água fresca disponível. Não forçar água, comida ou remédio com seringa se estiver vomitando, muito fraco ou com dificuldade para engolir.',
      'Anotar quanto comeu e bebeu, horários dos remédios, vômitos, fezes e mudanças de comportamento. Levar essas informações no retorno.',
      'Se recusar as refeições ou comer muito menos, avisar à equipe no mesmo dia. Não esperar vários dias: pode ser necessário oferecer alimento por uma sonda colocada pelo veterinário.',
      'Não dar remédios humanos para dor nem acrescentar antibióticos ou outros produtos por conta própria.',
      'Reavaliar em 24 a 48 horas após a alta ou antes se piorar. A equipe definirá quais remédios manter e quando repetir exames.',
    ],
    medicationPrecautions: ['Confirmar função hepática, renal, idade, interações e possibilidade de administração oral. Não extrapolar o curso ambulatorial para paciente grave.'],
    returnSigns: ['Vômitos repetidos ou incapacidade de manter água', 'Dor, barriga tensa, postura encurvada ou dificuldade para descansar', 'Fraqueza intensa, desmaio ou dificuldade para respirar', 'Olhos ou gengivas amarelados', 'Recusa de alimento ou piora importante do apetite'],
  };
}

const triaditis: ClinicalRecipeModel = {
  ...pancreatitis(true), categoryPath: 'Gastroenterologia > Tríade felina',
  selectorLabel: 'Tratar os componentes confirmados da tríade felina',
  options: [
    ...supportiveOptions(true),
    {
      key: 'ursodiol', label: 'Ácido ursodesoxicólico — apenas sem obstrução biliar', optional: true,
      description: 'Adjuvante hepatobiliar após avaliar permeabilidade biliar; benefício clínico não estabelecido para todos os gatos.',
      medications: [drug('ursodiol-triaditis-cat', 'Ácido ursodesoxicólico', 'med-acido-ursodesoxicolico', {
        min: 10, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'até reavaliação em 7 dias',
      }, ['Dar junto ao alimento. Se os olhos ou a gengiva ficarem mais amarelos, aparecer dor ou vômitos persistentes, procurar atendimento no mesmo dia.'], ['dose-udca-both-primary'])],
    },
    {
      key: 'prednisolone', label: 'Prednisolona — componente inflamatório confirmado', optional: true,
      description: 'Não selecionar antes de investigar infecção biliar. Individualizar dose e desmame.',
      medications: [drug('prednisolone-triaditis-cat', 'Prednisolona', 'med-prednisolona', {
        min: 1, unit: 'mg/kg', basis: 'weight', route: 'oral', frequency: 'a cada 24 horas', duration: 'até reavaliação em 7 dias',
      }, ['Oferecer junto ao alimento. Não suspender, reduzir nem aumentar a dose por conta própria; as próximas etapas serão definidas no retorno.', 'Avisar se beber e urinar muito mais, perder força ou piorar do apetite. Não associar outros anti-inflamatórios sem orientação.'])],
    },
  ],
  veterinarianNotes: [
    ...(pancreatitis(true).veterinarianNotes || []),
    'Tríade felina reúne pancreatite, colangite e enteropatia; tratar o componente predominante e confirmar diferenciais. Ettinger 9ª ed., cap. 225, PDF pp. 1400–1406.',
    'Colangite neutrofílica: obter cultura/antibiograma de bile quando seguro e selecionar antimicrobiano com cobertura/penetração apropriadas. Não há antibiótico universal pré-selecionado; referência tradicional 4–6 semanas, ajustar à evolução e cultura.',
    'Prednisolona: faixa descrita para enteropatia 1–2 mg/kg/dia com redução até menor dose eficaz; o modelo começa em 1 mg/kg/dia. Não imunossuprimir infecção biliar não controlada. Considerar diabetes, linfoma e histopatologia antes da decisão.',
    'UDCA 10–15 mg/kg/dia com alimento; contraindicado em obstrução biliar completa. Não é substituto para desobstrução, antimicrobiano ou tratamento específico da colangite.',
    'Avaliar cobalamina, coagulação/vitamina K, eletrólitos e suporte por sonda conforme os achados; prescrever reposição individualmente. Dieta hidrolisada/nova proteína pode ser indicada pela enteropatia.',
  ],
  diseaseRecommendations: [
    'Há inflamação envolvendo o pâncreas, o intestino e as vias que levam a bile do fígado ao intestino. O tratamento é ajustado conforme o problema que mais afeta este gato.',
    ...pancreatitis(true).diseaseRecommendations,
    'Se for prescrita dieta especial para o intestino, oferecer somente ela, sem petiscos, restos de comida ou outros alimentos, pelo período combinado.',
    'Se houver antibiótico prescrito, cumprir os horários e o período indicado. Não reutilizar sobras nem interromper porque o gato parece melhor.',
  ],
};

function template(id: string, title: string, species: 'cão' | 'gato', model: ClinicalRecipeModel): DocumentTemplate {
  return { id, title, category: 'Gastroenterologia', species, document_type: 'recipe',
    body_plain_text: renderClinicalRecipe(model, [], null), structured_defaults: { clinical_model: model },
    medication_ids: [...new Set(model.options.flatMap(o => o.medications || []).map(m => m.canonicalMedicationId).filter((id): id is string => !!id))],
    is_global: true, is_active: true, created_at: '2026-09-07T00:00:00.000Z', updated_at: '2026-09-07T00:00:00.000Z' };
}

export const RECEITUARIO_PANCREATITIS_MODELS = [
  template('seed-pancreatite-cao', 'Pancreatite — Cão (após estabilização)', 'cão', pancreatitis(false)),
  template('seed-pancreatite-gato', 'Pancreatite — Gato (após estabilização)', 'gato', pancreatitis(true)),
  template('seed-triade-felina', 'Tríade felina — tratamento individualizado', 'gato', triaditis),
];
