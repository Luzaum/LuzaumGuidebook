import type { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-09-01';

const DIPYRONE_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Dipyrone / Metamizole (p. 413): descreve dipirona como analgésico, antipirético e antiespasmódico. A monografia do ConsultaVet mantém as doses veterinárias separadas da bula humana do produto comercial.';

const DIPYRONE_SAFETY_ALERT =
  'Produto humano, sem dose veterinária em bula. Usar somente sob prescrição veterinária. Dipirona deve integrar analgesia multimodal e não substitui opioide, bloqueio regional ou outro protocolo adequado em dor moderada/intensa. Cautela em hipersensibilidade a pirazolonas, doença renal/hepática, alterações hematológicas, desidratação e associação com outros anti-inflamatórios.';

export const dipyroneCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'novalgina-gotas-500-opella',
    slug: 'novalgina-gotas-500',
    name: 'Novalgina® Gotas 500 mg/mL',
    manufacturer: 'Opella Healthcare Brazil',
    commercialClass: 'analgesic',
    commercialSubclass: 'analgesic_nonopioid',
    species: ['dog', 'cat'],
    presentations: [
      'Solução oral (gotas) 500 mg/mL — frasco de 10 mL',
      'Solução oral (gotas) 500 mg/mL — frasco de 20 mL',
      '1 mL = 20 gotas; 1 gota = 25 mg de dipirona monoidratada',
    ],
    activeComponents: ['dipirona monoidratada'],
    searchAliases: ['dipirona', 'metamizol', 'dipirona gotas', 'dipirona 500 mg/mL'],
    labelCompositionSummary:
      'Cada 1 mL contém 500 mg de dipirona monoidratada. A bula informa 20 gotas/mL, equivalentes a 25 mg por gota.',
    labelDirections:
      'Bula humana: uso oral; a posologia é humana e não deve ser transposta para cães ou gatos. Após aberto, o frasco é válido por 6 meses segundo a página oficial.',
    dosageGuidance: {
      labelDose:
        'Não há dose veterinária na bula da Novalgina. Conversão da apresentação: 500 mg/mL = 25 mg/gota.',
      plumbs: {
        dog: [
          {
            title: 'Dipirona — referência veterinária da monografia',
            dose: '25 mg/kg VO q8h como adjuvante de curto prazo',
            note: 'Na solução 500 mg/mL, corresponde matematicamente a 0,05 mL/kg ou 1 gota/kg. Confirmar indicação e protocolo multimodal.',
          },
          {
            title: 'Analgesia perioperatória — Plumb’s / literatura',
            dose: '25 mg/kg IV; estudos caninos descrevem 25–35 mg/kg IV',
            note: 'Não usar a solução oral por via injetável.',
          },
        ],
        cat: [
          {
            title: 'Dor pós-operatória leve/moderada — literatura felina',
            dose: '12,5 mg/kg VO q12h ou 25 mg/kg VO q24h, por curto prazo',
            note: 'A concentração de 25 mg/gota torna doses pequenas difíceis de medir; preferir volume mensurável e cálculo individual.',
          },
          {
            title: 'Analgesia adjuvante — Plumb’s',
            dose: '25 mg/kg IV q24h ou 12,5 mg/kg IV q12h',
            note: 'Não usar a solução oral por via injetável.',
          },
        ],
      },
      notes: [
        'A equivalência em gotas depende do gotejador oficial: 20 gotas/mL.',
        'Não confundir Novalgina (dipirona isolada) com Sindolor (dipirona + tramadol).',
      ],
    },
    plumbsContext: DIPYRONE_PLUMBS_CONTEXT,
    clinicalUse:
      'Apresentação humana de dipirona isolada usada de forma extrabula em cães e gatos quando o médico-veterinário escolhe dipirona como componente de analgesia multimodal.',
    reassessment:
      'Reavaliar controle da dor, vômito, sialorreia, apetite, hidratação e tolerância gastrointestinal; em uso repetido ou paciente de risco, considerar hemograma e função renal/hepática.',
    prescriptionExample:
      'Novalgina® Gotas 500 mg/mL — administrar ___ gotas (___ mL) por via oral a cada ___ horas, durante ___ dias, conforme cálculo veterinário.',
    safetyAlert: DIPYRONE_SAFETY_ALERT,
    price: {
      averageLabel: 'Dados incompletos',
      rangeLabel: 'Preço varia por volume e estabelecimento; confirmar no momento da prescrição',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Apresentação e concentração confirmadas na página e bula oficiais; uso em cães e gatos é extrabula.',
    imageUrl:
      'https://www.novalgina.com.br/dam/jcr:cdf4c305-d4c4-4fde-adaa-b4ba85ab8245/Gotas%20Kids.webp',
    productPageUrl: 'https://www.novalgina.com.br/produtos/infantil/gotas',
    labelUrl: 'https://www.novalgina.com.br/bulas/solucao-oral-gotas-500mg.pdf',
    catalogMedicationId: 'med-dipirona',
  },
  {
    id: 'novalgina-comprimidos-opella',
    slug: 'novalgina-comprimidos-500-1000',
    name: 'Novalgina® Comprimidos 500 mg / 1.000 mg',
    manufacturer: 'Opella Healthcare Brazil',
    commercialClass: 'analgesic',
    commercialSubclass: 'analgesic_nonopioid',
    species: ['dog', 'cat'],
    presentations: [
      'Comprimido simples 500 mg — embalagens com 30, 100 ou 240 comprimidos conforme bula vigente',
      'Comprimido simples 1.000 mg (1 g) — embalagens com 10, 20 ou 100 comprimidos conforme bula vigente',
    ],
    activeComponents: ['dipirona monoidratada'],
    searchAliases: ['dipirona', 'metamizol', 'dipirona 500 mg', 'dipirona 1000 mg', 'dipirona 1 g'],
    labelCompositionSummary:
      'Cada comprimido contém 500 mg ou 1.000 mg (1 g) de dipirona monoidratada, conforme a apresentação.',
    labelDirections:
      'Bula humana: comprimido de 500 mg e comprimido de 1 g para uso oral humano. A posologia humana não deve ser transposta para cães ou gatos.',
    dosageGuidance: {
      labelDose:
        'Não há dose veterinária na bula da Novalgina. Selecionar 500 mg ou 1.000 mg somente depois do cálculo em mg/kg e da avaliação de fracionamento praticável.',
      plumbs: {
        dog: [
          {
            title: 'Dipirona — referência veterinária da monografia',
            dose: '25 mg/kg VO q8h como adjuvante de curto prazo',
            note: 'Comprimido de 500 mg corresponde a 1 comprimido/20 kg nessa dose; o de 1.000 mg corresponde a 1 comprimido/40 kg. Avaliar divisibilidade real.',
          },
        ],
        cat: [
          {
            title: 'Dor pós-operatória leve/moderada — literatura felina',
            dose: '12,5 mg/kg VO q12h ou 25 mg/kg VO q24h, por curto prazo',
            note: 'Comprimidos humanos, especialmente 1.000 mg, geralmente exigem frações impraticáveis para gatos; preferir apresentação que permita dose precisa.',
          },
        ],
      },
      notes: [
        'Não escolher a potência pela embalagem: calcular primeiro a dose individual.',
        'Não confundir Novalgina (dipirona isolada) com Sindolor (dipirona + tramadol).',
      ],
    },
    plumbsContext: DIPYRONE_PLUMBS_CONTEXT,
    clinicalUse:
      'Apresentação humana de dipirona isolada usada de forma extrabula em cães e gatos quando a potência permite administração precisa dentro de protocolo analgésico multimodal.',
    reassessment:
      'Reavaliar analgesia, vômito, apetite, hidratação e tolerância gastrointestinal; em uso repetido ou paciente de risco, considerar hemograma e função renal/hepática.',
    prescriptionExample:
      'Novalgina® [500 mg ou 1.000 mg] — administrar ___ comprimido(s) por via oral a cada ___ horas, durante ___ dias, conforme cálculo veterinário.',
    safetyAlert: DIPYRONE_SAFETY_ALERT,
    price: {
      averageLabel: 'Dados incompletos',
      rangeLabel: 'Preço varia por potência, quantidade e estabelecimento; confirmar no momento da prescrição',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Apresentações e concentrações confirmadas na página e bula oficiais; uso em cães e gatos é extrabula.',
    imageUrl: 'https://www.novalgina.com.br/dam/jcr:b6f7cca8-82c6-4439-b580-03dcd5c926fb/1g%204cps.webp',
    productPageUrl: 'https://www.novalgina.com.br/produtos/adulto/1g-comprimido',
    labelUrl: 'https://www.novalgina.com.br/bulas/comprimido-simples500mg-1g.pdf',
    catalogMedicationId: 'med-dipirona',
  },
];
