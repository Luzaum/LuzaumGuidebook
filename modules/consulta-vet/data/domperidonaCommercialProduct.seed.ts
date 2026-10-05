import type { CommercialMedicationProduct } from '../types/commercialMedication';

const DOMPERIDONA_PRICE_SOURCE_DATE = '2026-09-30';

const DOMPERIDONA_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Domperidone (pp. 421–422 / PDF pp. 448–449): antagonista dos receptores dopaminérgicos periféricos D2 e D3 que não atravessa a barreira hematoencefálica íntegra em concentrações significativas (bloqueio de efluxo por P-glicoproteína), agindo na CRTZ e plexo mioentérico. Seu principal destaque contemporâneo na clínica de pequenos animais é a imunomodulação por hiperprolactinemia na prevenção da Leishmaniose Visceral Canina em cães soronegativos de áreas endêmicas (0,5 mg/kg VO q24h por 30 dias a cada 4 meses; Sabaté 2014, WAVD 2025 grau moderado). Plumb’s ressalta que o fármaco perdeu espaço na rotina gastroenterológica para maropitant e ondansetrona devido à inconsistência demonstrada no esvaziamento gástrico canino e ineficácia antral em gatos.';

const DOMPERIDONA_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E CARDIOVASCULAR: 1) PROLONGAMENTO DO INTERVALO QTc (DONATO ET AL. 2024): a domperidona bloqueia canais de potássio dependentes de voltagem hERG/Kv11.1 no miocárdio canino, causando prolongamento estatisticamente significativo do QTc no ECG (195,4 ms basal -> 205,1 ms; p=0,0292). Contraindicada em associação com inibidores potentes do CYP3A4 (cetoconazol, itraconazol, eritromicina) e fármacos que prolongam a repolarização (antiarrítmicos classes IA e III, metadona, cisaprida). 2) DIVERGÊNCIA DE CONSENSO (WAVD 2025 vs CLWG 2026): indicada para PREVENÇÃO em cães soronegativos de áreas endêmicas; contudo, o WAVD 2025 NÃO a recomenda como tratamento para cães com leishmaniose clínica (evidência fraca/insuficiente), enquanto o CLWG 2026 admite apenas como adjuvante aos leishmanicidas consolidados (NUNCA em monoterapia). 3) GATOS: evidência fraca e ineficácia antral comprovada por manometria (Mangel 1983); não utilizar de rotina. 4) NÃO DISPENSA REPELÊNCIA: a domperidona não tem ação repelente contra flebotomíneos; a manutenção de coleiras inseticidas à base de deltametrina é obrigatória.';

export const domperidonaCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'domperix-eurofarma',
    slug: 'domperix',
    name: 'Domperix® 1 mg/mL Suspensão Oral (Domperidona)',
    manufacturer: 'Eurofarma Laboratórios S.A.',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_prokinetic',
    commercialSubclasses: ['gi_prokinetic', 'infectious_leishmaniasis'],
    productPageUrl: 'https://eurofarma.com.br/produtos/domperix',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/domperidone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Domperix® 1 mg/mL suspensão oral — frasco plástico com 100 mL e seringa dosadora graduada',
      'Domperidona Genérica 1 mg/mL suspensão oral — frasco com 100 mL (EMS, Medley, Eurofarma)',
      'Domperidona 10 mg comprimidos revestidos — caixas com 30 ou 60 comprimidos sulcados',
    ],
    activeComponents: ['domperidona base 1 mg/mL (ou 10 mg por comprimido)'],
    searchAliases: [
      'domperix',
      'domperidona',
      'domperidone',
      'motilium',
      'procinetico',
      'antiemetico',
      'leisguard',
      'leishmaniose',
      'eurofarma',
    ],
    labelCompositionSummary:
      'Cada 1 mL da suspensão oral contém 1 mg de domperidona base em veículo aquoso com celulose microcristalina, carmelose sódica, sorbitol, metilparabeno, propilparabeno e polissorbato 20. Frasco contendo 100 mL acompanhado de seringa dosadora graduada em mililitros.',
    labelDirections:
      'Uso Extrabula em Medicina Veterinária: 1) Prevenção da Leishmaniose Canina em animais soronegativos: 0,5 mg/kg por via oral uma vez ao dia (q24h) por 30 dias consecutivos a cada 4 meses (equivalente a 0,5 mL/kg q24h da suspensão 1 mg/mL, ou 5,0 mL para cada 10 kg). 2) Antiemético / pró-cinético secundário: 0,05 a 0,1 mg/kg VO a cada 12 a 24 horas (0,5 a 1,0 mL para cada 10 kg), administrado 15 a 30 minutos antes do alimento.',
    dosageGuidance: {
      labelDose:
        'Cães (Prevenção LVC): 0,5 mg/kg VO q24h por 30 dias a cada 4 meses (0,5 mL/kg q24h da suspensão 1 mg/mL). Cães (Pró-cinético): 0,05 a 0,1 mg/kg VO q12–24h antes das refeições.',
      plumbs: {
        dog: [
          {
            title: 'Imunomodulação Preventiva na Leishmaniose Visceral Canina (WAVD 2025)',
            dose: '0,5 mg/kg VO a cada 24 horas durante 30 dias consecutivos a cada 4 meses',
            note: 'Indicado para cães clinicamente saudáveis e soronegativos em áreas de transmissão endêmica. Com Domperix® 1 mg/mL: fornecer 0,5 mL para cada 1 kg de peso por dia (5 mL a cada 10 kg). Sabaté et al. (2014) comprovaram redução relativa de 80% no adoecimento clínico. Não substitui coleiras repelentes contra flebotomíneos.',
          },
          {
            title: 'Antiemético e Pró-cinético Gastrintestinal Secundário (Plumb’s 10ª ed.)',
            dose: '0,05 a 0,1 mg/kg VO a cada 12 a 24 horas (ou 2 a 5 mg/cão)',
            note: 'Administrar 15 a 30 minutos antes das refeições. Em declínio frente a maropitant e ondansetrona por inconsistência no esvaziamento gástrico (Orihata & Sarna 1994).',
          },
        ],
        cat: [
          {
            title: 'Distúrbios de Motilidade / Refluxo (Uso Empírico Histórico)',
            dose: '2 a 5 mg por gato VO a cada 8 a 12 horas',
            note: 'Evidência muito fraca. Mangel (1983) demonstrou ineficácia antral em felinos. Evitar na rotina e priorizar alternativas validadas.',
          },
        ],
      },
      notes: [
        'Calibrador com suspensão 1 mg/mL: Peso (kg) × 0,5 = volume diário em mL (ex.: cão de 10 kg recebe 5,0 mL ao dia).',
        'Não utilizar concomitantemente com cetoconazol, itraconazol, eritromicina, claritromicina ou antiarrítmicos.',
        'Realizar ECG basal em pacientes cardiopatas ou idosos pelo risco de prolongamento do intervalo QTc.',
        'Venda sob prescrição veterinária em Receituário Simples (medicamento não controlado no Brasil).',
      ],
    },
    plumbsContext: DOMPERIDONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Imunomodulação profilática quadrimestral em cães soronegativos para L. infantum em regiões endêmicas; adjuvante secundário em refluxo gastroesofágico e esofagite; indução de lactação em cadelas com agalactia.',
    reassessment:
      'Triagem sorológica obrigatória antes de cada ciclo quadrimestral para assegurar que o cão não soroconverteu. Acompanhamento com eletrocardiograma se houver arritmia prévia.',
    prescriptionExample:
      'Domperix (domperidona 1 mg/mL) suspensão oral humana — 2 frascos de 100 mL. Administrar 5,0 mL (dose de 0,5 mg/kg para cão de 10 kg) por via oral, uma vez ao dia, junto ao alimento, durante 30 dias consecutivos. Repetir a cada 4 meses após confirmação de sorologia negativa para leishmaniose.',
    safetyAlert: DOMPERIDONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 22,00',
      rangeLabel:
        'Suspensão 1 mg/mL 100 mL: R$ 18,00 a R$ 26,00 | Comprimidos 10 mg (cx 30): R$ 16,00 a R$ 24,00',
      sourceDate: DOMPERIDONA_PRICE_SOURCE_DATE,
      notes:
        'Apresentação de uso humano amplamente comercializada em drogarias de todo o Brasil. Não exige retenção de receita.',
    },
    evidenceLevel:
      'Consenso mundial WAVD 2025 (grau moderado para prevenção); Ensaio Sabaté et al. (2014); Estudo de QTc Donato et al. (2024); Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:domperidona',
  },
  {
    id: 'leisguard-ecuphar',
    slug: 'leisguard',
    name: 'Leisguard® 5 mg/mL Suspensão Oral (Domperidona Veterinária)',
    manufacturer: 'Ecuphar / Esteve Veterinaria (Europa)',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis', 'gi_prokinetic'],
    productPageUrl: 'https://cimavet.aemps.es',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/domperidone/PNG',
    species: ['dog'],
    presentations: [
      'Leisguard® 5 mg/mL suspensão oral — frasco com 60 mL e seringa dosadora em kg',
      'Leisguard® 5 mg/mL suspensão oral — frasco com 105 mL e seringa dosadora em kg',
    ],
    activeComponents: ['domperidona base 5 mg/mL (0,5% m/v)'],
    searchAliases: [
      'leisguard',
      'leisgard',
      'domperidona veterinaria',
      'domperidona 5 mg/ml',
      'ecuphar',
      'esteve',
      'leishmaniose canina',
      'prevencao leishmaniose',
    ],
    labelCompositionSummary:
      'Cada 1 mL de suspensão oral contém 5 mg de domperidona base (equivalente a 0,5% m/v). Frascos de 60 mL ou 105 mL acompanhados de seringa dosadora calibrada em quilogramas de peso corporal (0,1 mL para cada 1 kg).',
    labelDirections:
      'Bula oficial Europeia (CIMAVET / Esteve): Administrar 0,5 mg/kg de peso corporal por via oral, uma vez ao dia (a cada 24 horas), durante 30 dias consecutivos. Cada 0,1 mL de suspensão equivale a 0,5 mg de domperidona (administrar 0,1 mL para cada 1 kg de peso vivo, ou 1,0 mL para cada 10 kg). Repetir o tratamento a cada 4 meses ao longo do período de risco em áreas endêmicas.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,5 mg/kg VO a cada 24 horas durante 30 dias consecutivos (0,1 mL/kg q24h). Repetir a cada 4 meses.',
      plumbs: {
        dog: [
          {
            title: 'Prevenção da Leishmaniose Canina em Cães Soronegativos',
            dose: '0,5 mg/kg VO a cada 24 horas por 30 dias consecutivos a cada 4 meses',
            note: 'Dose oficial registrada na União Europeia para Leisguard® 5 mg/mL (0,1 mL/kg q24h = 1 mL para cada 10 kg). Administrar diretamente na boca ou com alimento.',
          },
        ],
      },
      notes: [
        'Calibrador com Leisguard 5 mg/mL: 0,1 mL por kg ao dia (1 mL a cada 10 kg).',
        'Produto veterinário de referência na Europa; no Brasil, pode ser adquirido via importação autorizada pelo MAPA.',
        'Não utilizar em cães cardiopatas ou sob uso concomitante de antifúngicos azólicos.',
      ],
    },
    plumbsContext: DOMPERIDONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Redução do risco de desenvolvimento de infecção ativa e doença clínica por Leishmania infantum em cães soronegativos de regiões endêmicas.',
    reassessment:
      'Controle sorológico periódico quadrimestral antes do início de cada ciclo de 30 dias.',
    prescriptionExample:
      'Leisguard (domperidona 5 mg/mL) suspensão oral veterinária — 1 frasco de 60 mL. Administrar 1,0 mL (dose de 0,5 mg/kg para cão de 10 kg) por via oral, uma vez ao dia, por 30 dias consecutivos. Repetir quadrimestralmente.',
    safetyAlert: DOMPERIDONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 380,00',
      rangeLabel: 'Frasco 60 mL sob importação especial: R$ 340,00 a R$ 420,00',
      sourceDate: DOMPERIDONA_PRICE_SOURCE_DATE,
      notes:
        'Valores de referência para importação formal de produto veterinário europeu registrado na Espanha/UE.',
    },
    evidenceLevel:
      'Registro oficial CIMAVET/AEMPS na Espanha; Consenso WAVD 2025; Sabaté et al. (2014).',
    isControlled: false,
    catalogMedicationId: 'editorial:domperidona',
  },
];
