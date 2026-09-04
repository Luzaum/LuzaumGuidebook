import { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-02';

const ITRACONAZOLE_CONTEXT =
  'Plumb’s e BSAVA descrevem 5 mg/kg VO a cada 24 horas como referência frequente em cães e gatos. A duração depende do agente e da resposta; micoses profundas e esporotricose geralmente exigem tratamento prolongado.';
const ITRACONAZOLE_ALERT =
  'Administrar cápsulas com alimento. Antiácidos e supressores de acidez podem reduzir a absorção. Monitorar apetite, vômitos e enzimas hepáticas; atenção a hepatotoxicidade e interações com glicocorticoides, ciclosporina, vincristina e rivaroxabana.';
const HUMAN_ITRACONAZOLE_DIRECTIONS =
  'Produto registrado para uso humano. Em cães e gatos, o uso é extra-label e a dose, a frequência e a duração devem ser definidas pelo médico-veterinário conforme agente, localização da micose e resposta clínica.';

function humanItraconazole(
  product: Pick<CommercialMedicationProduct, 'id' | 'slug' | 'name' | 'manufacturer' | 'presentations' | 'productPageUrl' | 'labelUrl' | 'price'>,
): CommercialMedicationProduct {
  return {
    ...product,
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antifungal',
    species: ['dog', 'cat'],
    activeComponents: ['itraconazol 100 mg'],
    labelCompositionSummary: 'Cápsula de itraconazol 100 mg para uso humano; uso veterinário extra-label.',
    labelDirections: HUMAN_ITRACONAZOLE_DIRECTIONS,
    dosageGuidance: {
      plumbs: {
        dog: [{ title: 'Referência veterinária', dose: '5 mg/kg VO a cada 24 horas' }],
        cat: [{ title: 'Referência veterinária', dose: '5 mg/kg VO a cada 24 horas' }],
      },
      labelDose: 'Extra-bula — Cães e gatos: 5 mg/kg VO a cada 24 horas.',
      notes: ['Não assumir bioequivalência com formulações manipuladas.', 'Cápsulas devem ser administradas com alimento.'],
    },
    plumbsContext: ITRACONAZOLE_CONTEXT,
    clinicalUse: 'Antifúngico sistêmico para micoses por fungos e leveduras sensíveis, mediante diagnóstico e acompanhamento veterinário.',
    reassessment: 'Reavaliar resposta clínica e, em tratamentos prolongados, monitorar enzimas hepáticas. A duração deve considerar cura clínica e micológica.',
    prescriptionExample: 'Calcular a dose individual em mg/kg e selecionar a apresentação somente após confirmar que o fracionamento é viável e seguro.',
    safetyAlert: `Uso veterinário extra-label. ${ITRACONAZOLE_ALERT}`,
    evidenceLevel: 'Apresentação e preço conforme pesquisa comercial de 02/08/2026; posologia veterinária baseada em Plumb’s e BSAVA.',
  };
}

const PREDNISOLONE_CONTEXT =
  'Plumb’s: cães 0,5–1 mg/kg/dia como anti-inflamatório e 2–4 mg/kg/dia como imunossupressor; gatos 1–2 mg/kg/dia e 2–8 mg/kg/dia, respectivamente. Usar a menor dose eficaz pelo menor tempo possível.';
const PREDNISOLONE_ALERT =
  'Não associar a AINE. Cautela em diabetes, infecção ativa, micose sistêmica, úlcera gastrointestinal, pancreatite, hipertensão e doença renal. Tratamentos prolongados exigem retirada gradual e monitoramento.';

export const itraconazolePrednisoloneCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'itl-cepav',
    slug: 'itl-itraconazol-cepav',
    name: 'ITL',
    manufacturer: 'Cepav Pharma',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antifungal',
    species: ['dog'],
    presentations: ['ITL 25 mg — caixa com 10 cápsulas', 'ITL 50 mg — caixa com 10 cápsulas', 'ITL 100 mg — caixa com 10 cápsulas'],
    activeComponents: ['itraconazol 25 mg', 'itraconazol 50 mg', 'itraconazol 100 mg'],
    labelCompositionSummary: 'Antifúngico triazólico sistêmico veterinário em cápsulas de 25 mg, 50 mg ou 100 mg.',
    labelDirections: 'Bula: cães, 5 mg/kg VO junto ao alimento, uma a duas vezes ao dia, inicialmente por 10 a 14 dias. A duração pode ser prolongada conforme gravidade e evolução.',
    dosageGuidance: {
      labelDose: '5 mg/kg por dose, VO, junto ao alimento, a cada 12–24 horas (total diário de 5–10 mg/kg/dia).',
      plumbs: { dog: [{ title: 'Referência usual', dose: '5 mg/kg VO a cada 24 horas' }] },
      notes: ['A frequência de duas vezes ao dia resulta em 10 mg/kg/dia.', 'Tratamentos de micoses profundas podem exceder os 10–14 dias iniciais da bula.'],
    },
    plumbsContext: ITRACONAZOLE_CONTEXT,
    clinicalUse: 'Dermatofitoses e micoses sistêmicas por fungos e leveduras sensíveis em cães.',
    reassessment: 'Reavaliar resposta clínica, agente envolvido e necessidade de cura micológica; monitorar função hepática em uso prolongado.',
    prescriptionExample: 'Administrar 5 mg/kg por via oral, junto ao alimento, na frequência e duração definidas para o caso.',
    safetyAlert: ITRACONAZOLE_ALERT,
    price: {
      averageLabel: '25 mg: R$ 113,75 • 50 mg: R$ 156,59 • 100 mg: R$ 250,90',
      rangeLabel: 'Caixas com 10 cápsulas; médias sem descontos de assinatura ou PIX',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://cepav.com.br/produtos/itl/',
    labelUrl: 'https://cepav.com.br/wp-content/uploads/2018/03/ITL-25-50-100-MG-logonovo12_20180222_SGF_1126.pdf',
    evidenceLevel: 'Cadastro, bula e preços consultados em 02/08/2026.',
  },
  humanItraconazole({
    id: 'itraconazol-ems-100mg', slug: 'itraconazol-ems-100mg', name: 'Itraconazol EMS 100 mg', manufacturer: 'EMS',
    presentations: ['Caixa com 4 cápsulas', 'Caixa com 15 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/itraconazol-100mg-ems-genericos-com-4-capsulas.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/itraconazol',
    price: { averageLabel: '4 cápsulas: R$ 17,95 • 15 cápsulas: R$ 43,59', rangeLabel: 'Valores localizados por apresentação', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'itraconazol-eurofarma-100mg', slug: 'itraconazol-eurofarma-100mg', name: 'Itraconazol Eurofarma 100 mg', manufacturer: 'Eurofarma',
    presentations: ['Caixa com 4 cápsulas', 'Caixa com 15 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/itraconazol-100mg-eurofarma-genericos-4-capsulas-gelatinosas.html',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/pro/Bula-Itraconazol-Eurofarma-Profissional-Consulta-Remedios.pdf',
    price: { averageLabel: '4 cápsulas: R$ 33,99 • 15 cápsulas: R$ 28,83', rangeLabel: 'O valor de 15 cápsulas foi encontrado em oferta promocional', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'itraconazol-geolab-100mg', slug: 'itraconazol-geolab-100mg', name: 'Itraconazol Geolab 100 mg', manufacturer: 'Geolab',
    presentations: ['Caixa com 4 cápsulas', 'Caixa com 15 cápsulas'],
    productPageUrl: 'https://www.drogasil.com.br/itraconazol-100mg-geolab-genericos-com-15-capsulas.html',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Confirmar preço e estoque no varejo', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'itraconazol-germed-100mg', slug: 'itraconazol-germed-100mg', name: 'Itraconazol Germed 100 mg', manufacturer: 'Germed Pharma',
    presentations: ['Caixa com 4, 10 ou 15 cápsulas', 'Embalagens hospitalares conforme bula'],
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/pro/Bula-Itraconazol-Germed-Pharma-Profissional-Consulta-Remedios.pdf',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Confirmar preço e estoque no varejo', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'itraspor-ems-100mg', slug: 'itraspor-ems-100mg', name: 'Itraspor 100 mg', manufacturer: 'EMS',
    presentations: ['Caixa com 4 cápsulas', 'Caixa com 15 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/itraspor-100-mg-4-capsulas.html',
    price: { averageLabel: '4 cápsulas: R$ 42,21', rangeLabel: 'Preço confiável da caixa com 15 cápsulas não localizado', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'itralex-ems-100mg', slug: 'itralex-ems-100mg', name: 'Itralex 100 mg', manufacturer: 'EMS',
    presentations: ['Caixa com 4 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/itralex-100mg-com-4-capsulas-gelatinosas.html',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/pro/Bula-Itralex-Profissional-Consulta-Remedios.pdf',
    price: { averageLabel: 'R$ 55,34', rangeLabel: 'Caixa com 4 cápsulas', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'traxonol-geolab-100mg', slug: 'traxonol-geolab-100mg', name: 'Traxonol 100 mg', manufacturer: 'Geolab',
    presentations: ['Caixa com 4 cápsulas', 'Caixa com 15 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/traxonol-100mg-com-4-capsulas.html',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/pro/Bula-Traxonol-Profissional-Consulta-Remedios.pdf',
    price: { averageLabel: 'Não localizado com segurança', rangeLabel: 'Confirmar preço e estoque no varejo', sourceDate: SOURCE_DATE },
  }),
  humanItraconazole({
    id: 'sporanox-janssen-100mg', slug: 'sporanox-janssen-100mg', name: 'Sporanox 100 mg', manufacturer: 'Janssen-Cilag / Janssen',
    presentations: ['Caixa residual com 28 cápsulas'],
    productPageUrl: 'https://www.drogaraia.com.br/sporanox-pulso-100mg-28-capsulas.html',
    labelUrl: 'https://innovativemedicine.jnj.com/brasil/produtos/medicamentos-descontinuados/comunicado-sporanox',
    price: { averageLabel: 'R$ 497,01', rangeLabel: 'Estoque residual; produto descontinuado gradualmente no Brasil desde 2023', sourceDate: SOURCE_DATE },
  }),
  {
    id: 'presolona-syntec-10mg', slug: 'presolona-syntec-10mg', name: 'Presolona 10', manufacturer: 'Syntec do Brasil',
    commercialClass: 'antiinflammatory', commercialSubclass: 'skin_pruritus', commercialSubclasses: ['skin_pruritus'], species: ['dog'],
    presentations: ['Caixa com 10 comprimidos de 10 mg'], activeComponents: ['acetato de prednisolona 10 mg'],
    labelCompositionSummary: 'Glicocorticoide sistêmico de duração intermediária; 10 mg por comprimido.',
    labelDirections: 'Bula: 0,5–1 mg/kg/dia em processos alérgicos e inflamatórios; 4 mg/kg/dia para imunossupressão. A dose diária pode ser dividida em 2–4 administrações.',
    dosageGuidance: { labelDose: 'Anti-inflamatória: 0,5–1 mg/kg/dia. Imunossupressora: 4 mg/kg/dia.', plumbs: { dog: [{ title: 'Anti-inflamatória', dose: '0,5–1 mg/kg/dia VO' }, { title: 'Imunossupressora', dose: '2–4 mg/kg/dia VO' }] } },
    plumbsContext: PREDNISOLONE_CONTEXT, clinicalUse: 'Processos alérgicos, inflamatórios, dermatológicos, respiratórios, musculoesqueléticos e imunomediados em cães.',
    reassessment: 'Reavaliar antes de prolongar; em uso prolongado, monitorar efeitos metabólicos, infecções e necessidade de desmame.',
    prescriptionExample: 'Calcular a dose por administração e registrar também a dose total diária.', safetyAlert: PREDNISOLONE_ALERT,
    price: { averageLabel: 'R$ 37,10', rangeLabel: 'R$ 30,00 a R$ 49,90 por caixa com 10 comprimidos', sourceDate: SOURCE_DATE },
    productPageUrl: 'https://syntec.com.br/produtos/presolona', labelUrl: 'https://syntec.com.br/storage/produtos/bulas/bula-presolona-v-007pdf-725671951.pdf',
  },
  {
    id: 'preditabs-biovet-10mg', slug: 'preditabs-biovet-10mg', name: 'Preditabs 10 mg', manufacturer: 'Biovet / Instituto BioChimico',
    commercialClass: 'antiinflammatory', commercialSubclass: 'skin_pruritus', commercialSubclasses: ['skin_pruritus'], species: ['dog', 'cat'],
    presentations: ['Caixa com 10 comprimidos palatáveis e bissulcados de 10 mg'], activeComponents: ['prednisolona 10 mg'],
    labelCompositionSummary: 'Prednisolona 10 mg em comprimido palatável e bissulcado, permitindo frações de meio e um quarto.',
    labelDirections: 'Bula: cães 0,5 mg/kg VO a cada 24 horas; gatos 1 mg/kg VO a cada 24 horas, inicialmente por 5 dias e até 7 dias conforme avaliação.',
    dosageGuidance: { labelDose: 'Cães: 0,5 mg/kg SID. Gatos: 1 mg/kg SID.', plumbs: { dog: [{ title: 'Anti-inflamatória', dose: '0,5–1 mg/kg/dia VO' }], cat: [{ title: 'Anti-inflamatória', dose: '1–2 mg/kg/dia VO' }] }, notes: ['A bula recomenda retirada gradual se o tratamento for prolongado.'] },
    plumbsContext: PREDNISOLONE_CONTEXT, clinicalUse: 'Terapia anti-inflamatória com prednisolona em cães e gatos.', reassessment: 'Reavaliar após 5 dias e antes de prolongar além de 7 dias.',
    prescriptionExample: 'Administrar a dose calculada por via oral a cada 24 horas, registrando a fração do comprimido bissulcado.', safetyAlert: PREDNISOLONE_ALERT,
    price: { averageLabel: 'R$ 32,33', rangeLabel: 'R$ 28,90 a R$ 34,11 por caixa com 10 comprimidos', sourceDate: SOURCE_DATE },
    productPageUrl: 'https://biovet.com.br/produtos/preditabs-10mg/', labelUrl: 'https://biovet.com.br/wp-content/uploads/2024/12/Bula-Preditabs-1681-ME-PARA-SITE.pdf',
  },
  {
    id: 'predvet-provets-5mg', slug: 'predvet-provets-5mg', name: 'Predvet 5 mg', manufacturer: 'Laboratório Simões / ProvetS',
    commercialClass: 'antiinflammatory', commercialSubclass: 'skin_pruritus', commercialSubclasses: ['skin_pruritus'], species: ['dog', 'cat'],
    presentations: ['Caixa com 10 comprimidos de 5 mg'], activeComponents: ['prednisolona 5 mg'], labelCompositionSummary: 'Prednisolona 5 mg por comprimido.',
    labelDirections: 'Bula anti-inflamatória: cães 0,5 mg/kg SID e gatos 1 mg/kg SID por 7 dias. Esquema imunossupressor: 2 mg/kg BID, reduzindo semanalmente até 1 mg/kg SID.',
    dosageGuidance: { labelDose: 'Anti-inflamatória: cães 0,5 mg/kg SID; gatos 1 mg/kg SID. Imunossupressora inicial: 2 mg/kg BID (4 mg/kg/dia).', plumbs: { dog: [{ title: 'Imunossupressora', dose: '2–4 mg/kg/dia VO' }], cat: [{ title: 'Imunossupressora', dose: '2–8 mg/kg/dia VO' }] }, notes: ['O protocolo de bula reduz a dose a cada 7 dias.'] },
    plumbsContext: PREDNISOLONE_CONTEXT, clinicalUse: 'Terapia anti-inflamatória ou imunossupressora em cães e gatos.', reassessment: 'Reavaliar resposta e efeitos adversos a cada etapa do esquema; não interromper abruptamente após uso prolongado.',
    prescriptionExample: 'Registrar dose por administração, frequência e dose total diária em cada etapa do desmame.', safetyAlert: PREDNISOLONE_ALERT,
    price: { averageLabel: 'R$ 24,22', rangeLabel: 'R$ 15,62 a R$ 32,83 por caixa com 10 comprimidos', sourceDate: SOURCE_DATE },
    productPageUrl: 'https://www.casadoprodutor.com.br/predvet-anti-inflamatorio-5-mg', labelUrl: 'https://provets.com.br/pdf/Bula-Predvet-5mg.pdf',
  },
  {
    id: 'prediderm-ourofino', slug: 'prediderm-prednisolona', name: 'Prediderm 5 mg', manufacturer: 'Ourofino Saúde Animal',
    commercialClass: 'antiinflammatory', commercialSubclass: 'skin_pruritus', commercialSubclasses: ['skin_pruritus'], species: ['dog'],
    presentations: ['Caixa com 10 comprimidos de 5 mg'], activeComponents: ['prednisolona 5 mg'], labelCompositionSummary: 'Prednisolona 5 mg por comprimido; produto registrado para cães.',
    labelDirections: 'Bula: reposição glicocorticoide 0,25 mg/kg/dia; ação anti-inflamatória/antialérgica 0,5–1 mg/kg por dose a cada 12–24 horas.',
    dosageGuidance: { labelDose: 'Reposição: 0,25 mg/kg/dia. Anti-inflamatória/antialérgica: 0,5–1 mg/kg por dose a cada 12–24 horas.', plumbs: { dog: [{ title: 'Anti-inflamatória', dose: '0,5–1 mg/kg/dia VO' }] }, notes: ['A faixa de bula equivale a 0,5–2 mg/kg/dia conforme dose e frequência.', 'Uso desta marca em gatos é extra-label e não consta como indicação de bula.'] },
    plumbsContext: PREDNISOLONE_CONTEXT, clinicalUse: 'Reposição glicocorticoide e tratamento anti-inflamatório ou antialérgico em cães.', reassessment: 'Individualizar frequência e redução conforme resposta; reavaliar antes de manter ou repetir o tratamento.',
    prescriptionExample: 'Registrar a dose por administração e a dose total diária, especialmente quando usada a cada 12 horas.', safetyAlert: PREDNISOLONE_ALERT,
    price: { averageLabel: 'R$ 24,68', rangeLabel: 'R$ 21,90 a R$ 27,46 por caixa com 10 comprimidos', sourceDate: SOURCE_DATE },
    productPageUrl: 'https://www.ourofinopet.com/produtos/medicamentos/prediderm/', labelUrl: 'https://consultaremedios.com.br/prediderm-ourofino-para-caes/bula',
  },
];
