import type { CommercialMedicationProduct } from '../types/commercialMedication';

const MOLIDUSTAT_PRICE_SOURCE_DATE = '2026-10-04';

const MOLIDUSTAT_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Darbepoetin Alfa (p. 342 / PDF p. 369 — referência comparativa de ESA histórico): descreve a abordagem tradicional da anemia não regenerativa na DRC em pequenos animais com agentes estimuladores da eritropoiese recombinantes humanos (darbepoetina), ressaltando a frequência de aplasia pura de série vermelha (PRCA) por anticorpos neutralizantes e monitoramento rigoroso de pressão arterial e ferro. O molidustat sódico (Varenzin™) representa a nova classe dos inibidores da prolil-hidroxilase do HIF (HIF-PHI), aprovado especificamente para gatos, que supera o risco de PRCA por estimular a produção de EPO felina autóloga nativa.';

const MOLIDUSTAT_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E MONITORAMENTO FELINO: 1) NÃO É TERAPIA DE RESGATE: em anemias graves descompensadas com sinais clínicos de hipóxia aguda (PCV <12–14%, taquicardia, prostração), a conduta imediata mandatória é a HEMOTRANSFUSÃO; o molidustat requer de 14 a 28 dias para elevar o hematócrito. 2) RISCO DE POLICITEMIA E HIPERVISCOSIDADE: medir PCV obrigatoriamente no D14, D21 e D28; SUSPENDER imediatamente o tratamento se o PCV ultrapassar o limite superior de referência da espécie (>45%). 3) NÃO REDOSAR EM CASO DE VÔMITO: se o felino regurgitar ou vomitar após a administração, não repetir a dose naquele dia. 4) SEPARAÇÃO DE CÁTIONS: administrar quelantes de fósforo (cálcio, alumínio, magnésio) e ferro oral com intervalo mínimo de 1 hora para evitar quelação intraluminal. 5) EXCLUSIVO PARA FELINOS: contraindicado em cães (sem dose clínica estabelecida). 6) VALIDADE: após aberto o frasco, utilizar em até 28 dias.';

export const molidustatCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'varenzin-elanco',
    slug: 'varenzin',
    name: 'Varenzin™ 25 mg/mL Suspensão Oral para Gatos (Molidustat Sódico)',
    manufacturer: 'Elanco Saúde Animal Brasil',
    commercialClass: 'renal',
    commercialSubclass: 'renal_ckd_support',
    commercialSubclasses: ['renal_ckd_support'],
    productPageUrl: 'https://vet.elanco.com/br/produtos/varenzin',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/molidustat/PNG',
    species: ['cat'],
    presentations: [
      'Varenzin™ 25 mg/mL suspensão oral — frasco com 27 mL acompanhado de seringa dosadora de 0,1 em 0,1 mL',
    ],
    activeComponents: ['molidustat sódico 25 mg/mL (2,5% m/v)'],
    searchAliases: [
      'varenzin',
      'molidustat',
      'molidustate',
      'anemia renal',
      'eritropoietina felina',
      'drc felina',
      'elanco',
      'hif phi',
    ],
    labelCompositionSummary:
      'Cada 1 mL da suspensão oral contém 25 mg de molidustat sódico em veículo oleoso enriquecido com óleo de girassol e óleo de peixe palatabilizante q.s.p. 1 mL. Frasco contendo 27 mL com adaptador de bocal e seringa dosadora graduada em incrementos de 0,1 mL.',
    labelDirections:
      'Bula oficial Elanco / MAPA nº SP 000626-2.000045: Administrar 5 mg/kg de peso corporal (equivalente a 0,2 mL/kg da suspensão 25 mg/mL) por via oral, uma vez ao dia (a cada 24 horas), durante até 28 dias consecutivos. Agitar vigorosamente antes de aspirar a dose. Administrar diretamente na boca do animal.',
    dosageGuidance: {
      labelDose:
        'Gatos: 5 mg/kg VO a cada 24 horas durante até 28 dias consecutivos (0,2 mL/kg q24h). Pausa mínima de 7 dias antes de iniciar novo ciclo.',
      plumbs: {
        cat: [
          {
            title: 'Anemia Não Regenerativa na Doença Renal Crônica (Consenso IRIS 2026)',
            dose: '5 mg/kg VO a cada 24 horas por até 28 dias (0,2 mL/kg q24h)',
            note: 'Dose oficial registrada no MAPA. Monitorar PCV nos dias 14, 21 e 28. Interromper imediatamente se o PCV atingir o limite superior do intervalo de referência. Schmidt et al. (2026) demonstraram 67,5% de taxa de resposta hematológica aos 28 dias sem desenvolvimento de PRCA.',
          },
        ],
      },
      notes: [
        'Calibrador: Peso (kg) × 0,2 = volume diário em mL (ex.: gato de 4 kg recebe 0,8 mL ao dia).',
        'Se o gato vomitar a dose, NÃO redosar no mesmo dia.',
        'Separar de quelantes de fósforo (cálcio, alumínio, magnésio) e ferro oral em pelo menos 1 a 2 horas.',
        'Após abertura do frasco, utilizar em até 28 dias.',
      ],
    },
    plumbsContext: MOLIDUSTAT_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle da anemia não regenerativa associada à doença renal crônica (estágios IRIS 2, 3 e 4) em gatos com hematócrito reduzido (tipicamente < 28%), promovendo expansão da massa eritroide e melhora da qualidade de vida.',
    reassessment:
      'Mensuração seriada de hematócrito/PCV nos dias 14, 21 e 28 do ciclo. Reavaliar resposta e pesquisar deficiência de ferro ou hemorragia se não houver resposta no D21.',
    prescriptionExample:
      'Varenzin (molidustat sódico 25 mg/mL) suspensão oral para gatos — 1 frasco de 27 mL. Administrar 0,8 mL (dose de 5 mg/kg para gato de 4 kg) por via oral, uma vez ao dia, por até 28 dias consecutivos. Monitorar hematócrito nos dias 14, 21 e 28.',
    safetyAlert: MOLIDUSTAT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 480,00',
      rangeLabel: 'Frasco 27 mL com seringa: R$ 420,00 a R$ 560,00',
      sourceDate: MOLIDUSTAT_PRICE_SOURCE_DATE,
      notes:
        'Produto veterinário comercializado sob prescrição veterinária em distribuidores autorizados Elanco no Brasil.',
    },
    evidenceLevel:
      'Ensaio clínico multicêntrico randomizado duplo-cego Schmidt et al. (2026); Bula oficial registrada no MAPA nº SP 000626-2.000045; Diretrizes de anemia da DRC IRIS (2026).',
    isControlled: false,
    catalogMedicationId: 'editorial:molidustat',
  },
];
