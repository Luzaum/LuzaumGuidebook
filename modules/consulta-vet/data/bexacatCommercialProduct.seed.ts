import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const bexacatCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'bexacat-elanco',
    slug: 'bexacat',
    name: 'Bexacat™',
    manufacturer: 'Elanco',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_sglt2',
    commercialSubclasses: ['endocrine_sglt2', 'endocrine_insulin'],
    species: ['cat'],
    presentations: [
      'Bexacat 15 mg comprimidos palatáveis — frasco com 30 comprimidos',
      'Bexacat 15 mg comprimidos palatáveis — frasco com 90 comprimidos',
    ],
    activeComponents: ['bexagliflozina'],
    searchAliases: [
      'bexagliflozin',
      'sglt2',
      'isglt2',
      'elanco',
      'bexacat 15mg',
      'antidiabetico oral',
      'bexagliflozina 15mg',
    ],
    labelCompositionSummary:
      'Cada comprimido palatável e flavorizado contém 15 mg de bexagliflozina. Excipientes aromatizados para deglutição espontânea em felinos.',
    labelDirections:
      'Gatos: administrar 1 comprimido (15 mg) por via oral a cada 24 horas (SID), preferencialmente no mesmo horário todos os dias, com ou sem alimento. Exclusivo para gatos pesando ≥3 kg, sem histórico ou risco de cetoacidose e que nunca tenham recebido insulina.',
    dosageGuidance: {
      labelDose:
        'Bula FDA/Elanco: 15 mg/gato (1 comprimido de 15 mg) VO q24h, em gatos ≥3 kg metabolicamente estáveis, sem cetose e virgens de insulina.',
      plumbs: {
        cat: [
          {
            title: 'Diabetes mellitus felino não cetótico (virgem de insulina)',
            dose: '15 mg/gato VO q24h (1 comprimido de 15 mg SID)',
            note: 'Dose fixa de 1 comprimido por gato uma vez ao dia, independentemente do peso (para gatos ≥3,0 kg). Não fracionar nem triturar.',
          },
        ],
      },
      notes: [
        'Dose fixa de 1 comprimido (15 mg) por gato a cada 24 horas, independentemente do peso (desde que ≥3 kg).',
        'Não partir, esmagar ou diluir o comprimido.',
        'Exige triagem prévia obrigatória com dosagem de beta-hidroxibutirato (BHB) sérico: cetose (BHB > 2,4 mmol/L) contraindica absolutamente o início.',
        'Monitorar BHB sérico e glicemia nos dias 2–3, 7 e 14. Se houver anorexia, letargia, desidratação ou vômitos, suspender imediatamente o Bexacat e pesquisar cetoacidose euglicêmica (eDKA).',
      ],
    },
    plumbsContext:
      'Inibidor seletivo do cotransportador sódio-glicose tipo 2 (SGLT2) de uso veterinário oral. Inibe a reabsorção renal tubular proximal de glicose, promovendo glicosúria controlada, reduzindo a glicemia e diminuindo a glicotoxicidade sobre as células beta pancreáticas funcionais remanescentes. Segundo as diretrizes da AAHA 2026 e consenso iCatCare 2025, os inibidores de SGLT2 são opção de primeira linha em felinos recém-diagnosticados, metabolicamente estáveis e não cetóticos, cujos tutores tenham grande dificuldade em aplicar insulina injetável.',
    clinicalUse:
      'Melhora do controle glicêmico em gatos com diabetes mellitus recém-diagnosticados, não previamente tratados com insulina, clinicamente estáveis, com bom apetite e peso corporal ≥3,0 kg, sem evidência de cetonemia/cetonúria, pancreatite ou doença renal avançada.',
    reassessment:
      'Reavaliar clinicamente e mensurar BHB sanguíneo, frutozamina e glicemia nos dias 2–3, 7, 14 e 30 após o início; posteriormente, a cada 1–3 meses. Orientar o tutor a monitorar apetite e comportamento diariamente. Caso ocorra prostração, anorexia, vômitos ou perda de peso, suspender a medicação de imediato e internar para gasometria e pesquisa de eDKA.',
    prescriptionExample:
      'Bexacat (bexagliflozina) 15 mg — comprimidos mastigáveis palatáveis: administrar 1 comprimido por via oral a cada 24 horas (SID), preferencialmente no mesmo horário, diretamente na boca ou oferecido com pequena porção de alimento. Uso contínuo sob acompanhamento veterinário estrito. ALERTA AO TUTOR: suspender imediatamente o medicamento e entrar em contato com a equipe veterinária caso o felino apresente prostração, vômitos, recusa alimentar ou fraqueza.',
    safetyAlert:
      'ADVERTÊNCIA MÁXIMA DE BULA / TARJA PRETA (Boxed Warning da FDA / AAHA 2026 — nível mais alto de alerta de risco e contraindicação das agências de saúde): RISCO DE CETOACIDOSE DIABÉTICA EUGLICÊMICA (eDKA) E MORTE. A eDKA pode ocorrer com glicemia normal ou discretamente elevada (<250 mg/dL), dificultando o reconhecimento sem dosagem de beta-hidroxibutirato (BHB). CONTRAINDICAÇÕES ABSOLUTAS: 1) Gatos previamente tratados com insulina; 2) Cetoacidose diabética (CAD), cetose patológica (BHB > 2,4 mmol/L) ou histórico prévio de CAD; 3) Gatos com anorexia, desidratação, pancreatite ativa, hepatopatia ou DRC avançada (IRIS estágios 3–4); 4) Gatos pesando <3,0 kg; 5) Cães (uso estritamente felino). Conduta em suspeita de eDKA: suspender o Bexacat na hora, internar, iniciar reposição hidroeletrolítica vigorosa e administrar insulina regular associada à infusão de dextrose 2,5–5%.',
    price: {
      averageLabel: 'Em torno de US$ 55 a US$ 65 (30 comp.) / R$ 450 a R$ 650 (importação sob prescrição)',
      rangeLabel: 'Frascos com 30 ou 90 comprimidos palatáveis (mercado internacional / importação especializada)',
      sourceDate: '2026-09-08',
    },
    evidenceLevel:
      'Aprovado pelo FDA (NADA 141-566) e citado nos consensos AAHA 2026 e iCatCare 2025 para diabetes felino virgem de insulina.',
    productPageUrl: 'https://my.elanco.com/us/bexacat',
    labelUrl:
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=22736149-14a8-4bb9-b8ae-ae843a85b9e0',
    imageUrl:
      'https://assets.elanco.com/0cec44ed-3eaa-0009-2029-666567e7e4de/0bc69770-4c56-46a0-9c94-553920f8d292/Bexacat_Group_Front_MF.png?w=1600&q=75&auto=format',
  },
];
