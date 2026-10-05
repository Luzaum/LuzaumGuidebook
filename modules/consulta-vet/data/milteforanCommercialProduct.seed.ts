import type { CommercialMedicationProduct } from '../types/commercialMedication';

const MILTEFORAN_PRICE_SOURCE_DATE = '2026-09-30';

const MILTEFORAN_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Miltefosine (pp. 887–888 / PDF pp. 914–915): classifica a miltefosina como leishmanicida oral da classe das alquilfosfocolinas que atua desorganizando membranas fosfolipídicas, inibindo a citocromo-c oxidase mitocondrial com depleção de ATP e alterando a homeostase de cálcio de Leishmania infantum. Ressalta a posologia canina clássica de 2 mg/kg VO q24h por 28 dias e adverte que não promove cura parasitológica estéril, requerendo monitoramento contínuo da função renal e controle vetorial estrito contra flebotomíneos.';

const MILTEFORAN_SAFETY_ALERT =
  'MEDICAMENTO VETERINÁRIO SOB REGIME DE CONTROLE ESPECIAL DO MAPA (PORTARIA MAPA Nº 837/2025). PRESCRIÇÃO OBRIGATÓRIA EM NOTIFICAÇÃO DE RECEITA VETERINÁRIA (NRV) EM DUAS VIAS COM RETENÇÃO DA 1ª VIA PELO ESTABELECIMENTO COMERCIAL (VALIDADE DE 30 DIAS). ALERTAS CRÍTICOS: 1) TOXICIDADE REPRODUTIVA SEVERA: teratogênica e embriotóxica comprovada; contraindicada em prenhez, lactação e reprodutores; proibida a manipulação por mulheres gestantes ou em idade fértil sem luvas. 2) NÃO ESTERILIZAÇÃO PARASITOLÓGICA: reduz a carga parasitária mas não erradica L. infantum; o cão pode permanecer infectante para o mosquito-palha, sendo OBRIGATÓRIO o uso ininterrupto de coleiras repelentes à base de deltametrina ou tópicos repelentes. 3) NÃO TRATAR CÃES ASSINTOMÁTICOS: cães apenas soropositivos ou PCR positivos sem sinais clínicos e sem proteinúria não devem receber tratamento. 4) TOLERÂNCIA DIGESTIVA: vômitos e fezes amolecidas na 1ª semana são comuns; fornecer sempre misturado a alimento completo. 5) EVIDÊNCIA NEGATIVA NA ESPOROTRICOSE FELINA: ensaio clínico comprovou ineficácia e severa toxicidade; não prescrever para gatos.';

export const milteforanCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'milteforan-virbac',
    slug: 'milteforan',
    name: 'Milteforan® 20 mg/mL (Miltefosina)',
    manufacturer: 'Virbac Saúde Animal Brasil',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis'],
    productPageUrl: 'https://vet-br.virbac.com/produtos/leishmaniose/milteforan',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/miltefosine/PNG',
    species: ['dog'],
    presentations: [
      'Milteforan® 20 mg/mL solução oral — frasco com 30 mL e seringa dosadora',
      'Milteforan® 20 mg/mL solução oral — frasco com 60 mL e seringa dosadora',
      'Milteforan® 20 mg/mL solução oral — frasco com 90 mL e seringa dosadora',
    ],
    activeComponents: ['miltefosina 20 mg/mL (2,0% m/v)'],
    searchAliases: [
      'milteforan',
      'miltefosina',
      'miltefosine',
      'leishmanicida',
      'leishmaniose',
      'calazar',
      'virbac',
      'lvc',
      'remedio leishmaniose',
    ],
    labelCompositionSummary:
      'Cada 1 mL da solução oral contém 20 mg de miltefosina (equivalente a 2,0% m/v) em veículo aquoso com propilenoglicol q.s.p. 1 mL. Frascos de 30 mL, 60 mL e 90 mL acompanhados de seringa dosadora calibrada.',
    labelDirections:
      'Bula oficial Virbac / MAPA: Administrar 2 mg/kg de peso corporal por via oral, uma vez ao dia (a cada 24 horas), durante 28 dias consecutivos. Cada 0,1 mL de solução equivale a 2 mg de miltefosina (administrar 0,1 mL para cada 1 kg de peso vivo, ou 1,0 mL para cada 10 kg). Ministrar rigorosamente junto à refeição, misturada a uma pequena porção de alimento. Não agitar vigorosamente o frasco para evitar a formação de espuma.',
    dosageGuidance: {
      labelDose:
        'Cães: 2 mg/kg VO a cada 24 horas durante 28 dias consecutivos (0,1 mL/kg q24h). Não encurtar nem fracionar o ciclo de tratamento.',
      plumbs: {
        dog: [
          {
            title: 'Leishmaniose Visceral Canina (Protocolo Padrão Mundial)',
            dose: '2 mg/kg VO a cada 24 horas durante 28 dias consecutivos',
            note: 'Dose oficial registrada no MAPA. Administrar junto com refeição. Em diretrizes internacionais (WAVD 2025, LeishVet), combina-se concomitantemente com alopurinol 10 mg/kg VO q12h por 6 a 12 meses. O consenso CLWG 2026 reposicionou o esquema como segunda escolha frente ao antimoniato de meglumina devido a preocupações com recidiva precoce e risco de resistência parasitária.',
          },
        ],
      },
      notes: [
        'Calibrador prático: 0,1 mL por kg de peso corporal ao dia = 1 mL por 10 kg de peso ao dia.',
        'Não utilizar a via intravenosa ou parenteral.',
        'Não agitar vigorosamente o frasco antes da aspiração.',
        'Exigir uso de luvas no manuseio; proibido manuseio por mulheres gestantes.',
        'Manter obrigatoriamente coleira ou produto repelente contra flebotomíneos (Lutzomyia longipalpis) durante e após o tratamento.',
      ],
    },
    plumbsContext: MILTEFORAN_PLUMBS_CONTEXT,
    clinicalUse:
      'Tratamento leishmanicida específico de cães com leishmaniose visceral canina clinicamente manifesta (estágios II a IV do LeishVet; Classes B a D do CLWG 2026), visando remissão clínica, redução de carga parasitária e controle da proteinúria por glomerulonefrite.',
    reassessment:
      'Reavaliação clínica e laboratorial (hemograma, creatinina, ureia, UPC urinário e perfil proteico) ao término dos 28 dias e aos 3, 6 e 12 meses pós-tratamento. Investigar recaída ou resistência se houver retorno de lesões cutâneas ou piora da proteinúria.',
    prescriptionExample:
      'Milteforan (miltefosina 20 mg/mL) solução oral — 1 frasco de 30 mL (ou volume total calculado para 28 dias). Administrar ___ mL (dose calculada de 2 mg/kg) por via oral uma vez ao dia, estritamente misturado à comida úmida, por 28 dias seguidos. Manusear com luvas; proibido manuseio por gestantes. Notificação de Receita Veterinária (Portaria MAPA 837/2025).',
    safetyAlert: MILTEFORAN_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 1.450,00',
      rangeLabel:
        'Frasco 30 mL: R$ 1.350 a R$ 1.580 | Frasco 60 mL: R$ 2.400 a R$ 2.750 | Frasco 90 mL: R$ 3.200 a R$ 3.850',
      sourceDate: MILTEFORAN_PRICE_SOURCE_DATE,
      notes:
        'Produto veterinário sujeito a Notificação de Receita Veterinária do MAPA (Portaria 837/2025). Valores de referência em distribuidores veterinários autorizados Virbac no Brasil em setembro de 2026.',
    },
    evidenceLevel:
      'Consensos internacionais WAVD 2025, CLWG 2026 e LeishVet; Plumb’s 10ª ed.; Bula oficial registrada no MAPA.',
    isControlled: true,
    catalogMedicationId: 'editorial:miltefosina',
  },
];
