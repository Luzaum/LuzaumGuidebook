import type { CommercialMedicationProduct } from '../types/commercialMedication';

const METOCLOPRAMIDA_PRICE_SOURCE_DATE = '2026-10-04';

const METOCLOPRAMIDA_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Metoclopramide (pp. 867–869 / PDF pp. 894–896): antagonista dos receptores dopaminérgicos D2 e D3 centrais e periféricos, agonista 5-HT4 no plexo mioentérico e antagonista fraco de 5-HT3 em altas concentrações. Atua como antiemético na CRTZ e estimula o esvaziamento gastroduodenal e jejunal, além de aumentar a pressão do esfíncter esofágico inferior. Plumb’s ressalta que é mais eficaz como antiemético em cães que em gatos, possui pouco efeito sobre o cólon e apresenta riscos de manifestações extrapiramidais tratáveis com difenidramina (2,2 mg/kg IV).';

const METOCLOPRAMIDA_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E CARDIOVASCULAR: 1) ABANDONO DO BOLUS IV DE 1 mg/kg (ROLFI & CHESNEL 2026): injeção intravenosa rápida em alta dose foi associada a bradicardia extrema (<4 bpm), assistolia e parada cardiorrespiratória em cães anestesiados; em infusão contínua (CRI), utilizar a nova dose de ataque conservadora de 0,05 a 0,1 mg/kg IV lenta. 2) CONTRAINDICAÇÃO ABSOLUTA: obstrução mecânica gastrintestinal, corpo estranho e perfuração de víscera oca; risco de rotura por hiperperistaltismo forçado. 3) EFEITOS EXTRAPIRAMIDAIS: tremores musculares, rigidez, distonia e agitação acatisia-like; reverter com difenidramina (2,2 mg/kg IV/IM). 4) EPILEPSIA: contraindicada/evitar por redução do limiar convulsivo. 5) AJUSTE RENAL: reduzir em 50% em DRC avançada (IRIS 3–4) pelo risco de acúmulo sérico. 6) GOTAS: Nausetrat (1 gota ≈ 0,1 mg) vs Plasil (1 gota ≈ 0,19 mg) — nunca prescrever gotas sem indicar o produto.';

export const metoclopramidaCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'nausetrat-oral-ucbvet',
    slug: 'nausetrat-oral',
    name: 'Nausetrat® Solução Oral 5 mg/mL (Cloridrato de Metoclopramida)',
    manufacturer: 'UCBVET Saúde Animal',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic', 'gi_prokinetic'],
    productPageUrl: 'https://ucbvet.com/produto/nausetrat-solucao-oral/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/metoclopramide/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Nausetrat® 5 mg/mL solução oral — frasco plástico conta-gotas com 20 mL',
    ],
    activeComponents: ['cloridrato de metoclopramida 5 mg/mL (0,5% m/v)'],
    searchAliases: [
      'nausetrat',
      'metoclopramida',
      'plasil',
      'antiemetico',
      'procinetico',
      'esvaziamento gastrico',
      'ucbvet',
    ],
    labelCompositionSummary:
      'Cada 100 mL contém cloridrato de metoclopramida 500 mg (equivalente a 5 mg/mL) e veículo q.s.p. 100 mL. Frasco conta-gotas de 20 mL. Bula oficial calibrada em: 1 gota ≈ 0,1 mg de metoclopramida.',
    labelDirections:
      'Bula oficial UCBVET: Administrar por via oral 1 a 4 gotas para cada 1 kg de peso corporal (correspondendo a 0,1 a 0,4 mg/kg), a cada 8 horas, preferencialmente 30 a 45 minutos antes das refeições, ou a critério do médico-veterinário.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 0,1 a 0,4 mg/kg VO a cada 8 horas (1 a 4 gotas/kg q8h). Dose média usual: 0,25 mg/kg VO q8h (2,5 gotas/kg).',
      plumbs: {
        dog: [
          {
            title: 'Controle de Vômitos e Gastroparesia (Plumb’s 10ª ed.)',
            dose: '0,2 a 0,5 mg/kg VO a cada 6 a 8 horas',
            note: 'Administrar 30 a 60 minutos antes da alimentação para efeito pró-cinético. Reduzir em 50% em pacientes com doença renal crônica avançada (IRIS 3–4).',
          },
        ],
        cat: [
          {
            title: 'Distúrbios Motores Digestivos e Vômitos (BSAVA 10ª ed.)',
            dose: '0,17 a 0,33 mg/kg VO a cada 8 horas',
            note: 'Menor eficácia antiemética central que em cães; monitorar agitação e inquietação. Não usar em megacólon.',
          },
        ],
      },
      notes: [
        'Calibrador: 1 gota contém aproximadamente 0,1 mg (cão de 10 kg na dose de 0,25 mg/kg recebe 25 gotas = 0,5 mL).',
        'Contraindicado em suspeita de obstrução gastrointestinal mecânica ou perfuração.',
        'Suspender se houver tremores musculares, rigidez ou andar compulsivo (tratar com difenidramina).',
      ],
    },
    plumbsContext: METOCLOPRAMIDA_PLUMBS_CONTEXT,
    clinicalUse:
      'Antiemético central para êmese de origem urêmica ou tóxica; estimulante da motilidade gastroduodenal em gastroparesia, estase pós-cirúrgica e refluxo gastroesofágico.',
    reassessment:
      'Reavaliar se o vômito persistir após 24 a 48 horas de terapia; investigar corpos estranhos, pancreatite, obstruções parciais ou necessidade de antieméticos NK1/5-HT3.',
    prescriptionExample:
      'Nausetrat (metoclopramida 5 mg/mL) solução oral — 1 frasco de 20 mL. Administrar 0,5 mL (ou 25 gotas, equivalente a 2,5 mg para cão de 10 kg) por via oral a cada 8 horas, 30 minutos antes do alimento, por 3 a 5 dias.',
    safetyAlert: METOCLOPRAMIDA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 26,00',
      rangeLabel: 'Frasco 20 mL: R$ 22,00 a R$ 32,00',
      sourceDate: METOCLOPRAMIDA_PRICE_SOURCE_DATE,
      notes: 'Produto veterinário comercializado em lojas especializadas e farmácias veterinárias.',
    },
    evidenceLevel: 'Plumb’s 10ª ed.; BSAVA 10ª ed.; Bula oficial registrada no MAPA nº 1.258/1980.',
    isControlled: false,
    catalogMedicationId: 'editorial:metoclopramida',
  },
  {
    id: 'nausetrat-injetavel-ucbvet',
    slug: 'nausetrat-injetavel',
    name: 'Nausetrat® Injetável 5 mg/mL (Cloridrato de Metoclopramida)',
    manufacturer: 'UCBVET Saúde Animal',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic', 'gi_prokinetic'],
    productPageUrl: 'https://ucbvet.com/produto/nausetrat-injetavel/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/metoclopramide/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Nausetrat® Injetável 5 mg/mL — frasco-ampola de vidro com 10 mL',
    ],
    activeComponents: ['cloridrato de metoclopramida 5 mg/mL (0,5% m/v)'],
    searchAliases: [
      'nausetrat injetavel',
      'metoclopramida injetavel',
      'plasil injetavel',
      'cri metoclopramida',
      'antiemetico injetavel',
      'ucbvet',
    ],
    labelCompositionSummary:
      'Cada 1 mL de solução estéril contém 5 mg de cloridrato de metoclopramida em veículo aquoso tamponado q.s.p. 1 mL. Frasco-ampola de 10 mL para aplicação SC, IM, IV lenta ou infusão contínua (CRI).',
    labelDirections:
      'Bula oficial UCBVET: Administrar 0,2 a 0,5 mg/kg por via subcutânea, intramuscular ou intravenosa lenta, a cada 8 horas. Em terapia intensiva hospitalar, utilizar em infusão intravenosa contínua (CRI) na dose de 1 a 2 mg/kg/dia.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,2 a 0,5 mg/kg SC, IM ou IV lenta q8h; ou CRI de 1 a 2 mg/kg/dia (0,042 a 0,083 mg/kg/h). Gatos: 0,17 a 0,33 mg/kg SC, IM ou IV lenta q8h.',
      plumbs: {
        dog: [
          {
            title: 'Infusão Intravenosa Contínua (CRI Hospitalar)',
            dose: '1 a 2 mg/kg/dia IV lenta contínua (0,042 a 0,083 mg/kg/h)',
            note: 'Modelagem PK 2026: administrar ataque conservador de 0,05 mg/kg IV (para CRI 1 mg/kg/dia) ou 0,1 mg/kg IV (para CRI 2 mg/kg/dia) imediatamente antes da bomba. NUNCA usar ataque de 1 mg/kg pelo risco de assistolia.',
          },
        ],
      },
      notes: [
        'Na via IV intermitente, administrar estritamente de forma lenta em 5 a 10 minutos diluído em NaCl 0,9%.',
        'Incompatível fisicamente com cefalosporinas, bicarbonato de sódio e cloranfenicol.',
        'Proteger equipos e bolsas de infusão prolongada da incidência de luz solar.',
      ],
    },
    plumbsContext: METOCLOPRAMIDA_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle emergencial de vômitos hospitalares, parvovirose canina, íleo funcional pós-cirúrgico e suporte pró-cinético em UTI de pequenos animais.',
    reassessment:
      'Monitorar ausculta de motilidade gastrintestinal e débito urinário a cada 12 a 24 horas durante a infusão contínua.',
    prescriptionExample:
      'Nausetrat Injetável 5 mg/mL — 1 frasco de 10 mL. Aplicar 0,5 mL (2,5 mg para cão de 10 kg na dose de 0,25 mg/kg) por via SC ou IV lenta em 10 minutos, a cada 8 horas.',
    safetyAlert: METOCLOPRAMIDA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 22,00',
      rangeLabel: 'Frasco-ampola 10 mL: R$ 18,00 a R$ 28,00',
      sourceDate: METOCLOPRAMIDA_PRICE_SOURCE_DATE,
      notes: 'Apresentação hospitalar veterinária com registro oficial no MAPA.',
    },
    evidenceLevel: 'Consensos de UTI veterinária; Modelagem PK Martin-Flores et al. (2026); Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:metoclopramida',
  },
];
