import type { CommercialMedicationProduct } from '../types/commercialMedication';

const DONAREN_PRICE_SOURCE_DATE = '2026-09-30';

const DONAREN_PLUMBS_CONTEXT =
  'Plumb’s 10ª ed., monografia Trazodone Hydrochloride (pp. 1266–1269): classifica a trazodona como modulador serotoninérgico da classe SARI (Serotonin Antagonist and Reuptake Inhibitor) e antagonista alfa-1 adrenérgico. Destaca o uso no manejo Fear Free de ansiedade situacional pré-visita, transporte felino, estresse hospitalar e adjuvante comportamental. Enfatiza que sedação não equivale a ansiólise completa, alerta para a grande variabilidade individual de resposta cinotécnica e adverte contra o uso de formulações humanas de liberação modificada no lugar de comprimidos de liberação imediata.';

const DONAREN_SAFETY_ALERT =
  'PRODUTO HUMANO — USO VETERINÁRIO EXTRABULA SOB PRESCRIÇÃO EM RECEITA DE CONTROLE ESPECIAL EM 2 VIAS (LISTA C1 DA PORTARIA SVS/MS Nº 344/1998). ALERTAS CRÍTICOS: 1) SÍNDROME SEROTONINÉRGICA: contraindicada associação com IMAOs (selegilina, amitraz) — exigir washout ≥ 14 dias; risco elevado na combinação com tramadol, SSRIs (fluoxetina) e TCAs (clomipramina). 2) INIBIÇÃO DA AGREGAÇÃO PLAQUETÁRIA: inibição de SERT reduz conteúdo serotoninérgico plaquetário e deprime a agregação plaquetária in vitro (estudo Benjamin 2023: 95% → 62%); cautela em trombocitopênicos, coagulopatas e cirurgias de risco. 3) INTERFERÊNCIA NO EXAME NEUROLÓGICO: deprime temporariamente reações posturais e propriocepção em animais sadios. 4) SUPRESSÃO NO TESTE DE ESTIMULAÇÃO COM ACTH: estudo Brown 2024 demonstrou atenuação no cortisol pós-ACTH e delta cortisol; suspender antes de dosagens adrenais. 5) HIPOTENSÃO ARTERIAL: antagonismo alfa-1 provoca vasodilatação e queda de pressão sistólica (demonstrada em felinos); cautela em cardiopatas e hipovolêmicos. 6) NÃO INTERCAMBIALIDADE: Donaren Retard e Donaren LP não devem ser usados em substituição aos comprimidos imediatos e nunca devem ser triturados.';

export const donarenCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'donaren-apsen',
    slug: 'donaren',
    name: 'Donaren® (Cloridrato de Trazodona)',
    manufacturer: 'Apsen Farmacêutica S.A.',
    commercialClass: 'neurologic',
    commercialSubclass: 'sedative_anesthetic',
    commercialSubclasses: ['sedative_anesthetic'],
    productPageUrl: 'https://produtos.apsen.com.br/donaren',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/trazodone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Donaren® 50 mg comprimidos revestidos sulcados — caixa com 60 comprimidos (permite bipartição uniforme em 25 mg)',
      'Donaren® 50 mg comprimidos revestidos sulcados — caixa com 5 comprimidos (fracionamento de teste)',
      'Donaren® 100 mg comprimidos revestidos — caixa com 30 comprimidos (NÃO deve ser partido segundo fabricante)',
      'Donaren® Retard 150 mg / Donaren® LP 150 mg — comprimidos de liberação prolongada (NÃO intercambiável; NÃO triturar)',
    ],
    activeComponents: [
      'cloridrato de trazodona 50 mg (equivalente a 45,5 mg de trazodona base)',
      'cloridrato de trazodona 100 mg (equivalente a 91,0 mg de trazodona base)',
    ],
    searchAliases: [
      'donaren',
      'trazodona',
      'trazodone',
      'cloridrato de trazodona',
      'donaren 50mg',
      'donaren 100mg',
      'donaren retard',
      'donaren lp',
      'desyrel',
      'sari',
      'calmante cão',
      'calmante gato',
      'fear free',
    ],
    labelCompositionSummary:
      'Donaren® 50 mg: cada comprimido revestido contém 50 mg de cloridrato de trazodona (equivalente a 45,5 mg de base livre) e excipientes. Apresenta sulco funcional no núcleo que permite divisão uniforme em duas metades de 25 mg. Donaren® 100 mg: cada comprimido revestido contém 100 mg de cloridrato de trazodona (sem sulco; a fabricante Apsen informa que não deve ser partido). Donaren® Retard / LP 150 mg: formulação de matriz de liberação controlada/prolongada de 24 horas, não devendo ser macerada nem extrapolada para a rotina veterinária.',
    labelDirections:
      'Bula humana Apsen: antidepressivo com ação sedativa; posologia humana inicial de 50 a 150 mg/dia via oral, dividida em 2 tomadas ou tomada única à noite. Doses veterinárias extrabula: Cães: pré-visita veterinária e ansiedade situacional 5 a 7,5 mg/kg VO 90 a 120 minutos antes (em cães com fobia severa previamente avaliados, doses de 9 a 12 mg/kg VO possuem validação em RCT; teto prático de 300 mg/dose); hospitalização 2 a 4 mg/kg VO q12h inicial (titular até 10–12 mg/kg q8h se necessário; teto 600 mg/dia). Gatos: pré-visita e transporte 50 mg/gato VO em dose única 60 a 120 minutos antes da saída (dose com melhor evidência direta por ensaio clínico cruzado); gatos pequenos (<2,5 kg) podem receber 25 mg (meio comprimido de 50 mg); a dose de 100 mg/gato produz sedação mais profunda, mas causa queda transitória de cerca de 22 mmHg na PAS. Medicamento de controle especial Lista C1 (Receita de Controle Especial em 2 vias, validade 30 dias).',
    dosageGuidance: {
      labelDose:
        'Produto de uso humano sob controle especial (Lista C1 da Portaria 344/98). Bula humana não contém posologia veterinária. Uso exclusivo sob prescrição médico-veterinária em 2 vias.',
      plumbs: {
        dog: [
          {
            title: 'Ansiedade situacional, pré-visita e transporte (Fear Free usual)',
            dose: '5 a 7,5 mg/kg VO em dose única, 90 a 120 minutos antes do evento ansiogênico',
            note: 'Dose prática de referência recomendada pela literatura. Administrar preferencialmente com pequena porção de alimento. Realizar dose-teste prévia em domicílio em dia sem estresse. Limite máximo usual de 300 mg por dose em cães gigantes.',
          },
          {
            title: 'Ansiedade pré-visita intensa e refratária (Ensaio Kim et al. 2022)',
            dose: '9 a 12 mg/kg VO em dose única, 90 minutos antes do transporte',
            note: 'Validada em ensaio clínico duplo-cego placebo-controlado (Kim 2022) em cães com histórico grave de reatividade e estresse ambulatorial. Teto de 300 mg/dose. Exige triagem prévia de tolerância para descartar ataxia intensa.',
          },
          {
            title: 'Hospitalização e controle de estresse agudo em UTI/enfermaria',
            dose: '2 a 4 mg/kg VO a cada 12 horas inicialmente; titular até 10 a 12 mg/kg q8h se necessário',
            note: 'Iniciar baixo para evitar náusea e sedação excessiva em ambiente hospitalar polimedicado. Limite formal de 300 mg/dose e 600 mg/24 horas.',
          },
          {
            title: 'Transtornos de ansiedade crônica e adjuvante comportamental',
            dose: '2,5 a 5 mg/kg VO a cada 12 a 24 horas nos primeiros 3 dias; titular conforme resposta',
            note: 'Titular gradualmente com base na tolerância e eficácia até média de 7,5 mg/kg/dia (faixa 2 a 19,5 mg/kg/dia). Sempre associar a intervenção comportamental e enriquecimento ambiental.',
          },
          {
            title: 'Confinamento pós-operatório ortopédico (Evidência conflitante)',
            dose: '3,5 a 7 mg/kg VO a cada 12 horas (podendo atingir q8h; máx 300 mg/dose)',
            note: 'Ensaio aberto de Gruen (2014) reportou melhora em 89% dos cães ortopédicos; ensaio placebo-controlado subsequente não demonstrou superioridade inequívoca ao placebo. Manter reserva clínica quanto à eficácia intrínseca.',
          },
        ],
        cat: [
          {
            title: 'Pré-visita veterinária e transporte felino (Ensaio Stevens et al. 2016)',
            dose: '50 mg/gato VO em dose única, 60 a 120 minutos antes de colocar na caixa de transporte',
            note: 'Dose fixa validada em ensaio clínico cruzado duplo-cego com melhora marcante na docilidade e facilidade de exame clínico. Em felinos jovens ou com menos de 2,5 kg, pode-se partir o comprimido de Donaren 50 mg administrando 25 mg (meia unidade).',
          },
          {
            title: 'Sedação oral para procedimentos ambulatoriais e exames',
            dose: '50 a 100 mg/gato VO em dose única antes do procedimento',
            note: 'Doses de 75 a 100 mg/gato produzem sedação mais rápida e intensa, mas estudo recente de 2025 comprovou queda transitória de ~22 mmHg na pressão arterial sistólica com 100 mg. Preferir 50 mg como ponto de partida conservador em gatos cardiopatas ou idosos.',
          },
        ],
      },
      notes: [
        'Donaren 50 mg possui sulco oficial da Apsen e pode ser partido uniformemente em metades de 25 mg.',
        'Donaren 100 mg NÃO deve ser partido segundo o fabricante; para doses de 10 mg, 15 mg, 20 mg ou outras fracionadas em animais pequenos, recorrer à manipulação magistral veterinária.',
        'Donaren Retard e Donaren LP 150 mg são formas de liberação prolongada com perfil farmacocinético incompatível com os estudos de sedação imediata em cães e gatos; NUNCA triturar comprimidos de liberação prolongada.',
        'Não utilizar a via intravenosa: estudo canino (Jay 2013) demonstrou taquicardia em 100% dos animais e desinibição agressiva paradoxal em 50%.',
        'Realizar sempre uma dose-teste prévia em casa em ambiente calmo devido à extrema dispersão do Tmax canino (média de 7,4 ± 4,5 horas) e variabilidade na absorção felina.',
      ],
    },
    plumbsContext: DONAREN_PLUMBS_CONTEXT,
    clinicalUse:
      'Medicação ansiolítica situacional de primeira linha no protocolo Fear Free para consultas veterinárias, exames complementares, colheita de sangue, transporte de felinos, hospitalização em cães reativos e adjuvante em distúrbios crônicos de ansiedade.',
    reassessment:
      'Avaliar a qualidade do relaxamento, nível de sedação e coordenação motora no ambiente doméstico antes da saída. Monitorar a pressão arterial sistólica caso o animal receba vasodilatadores ou apresente cardiopatia estrutural. Se houver desinibição comportamental com vocalização intensa ou agitação paradoxal, suspender novas doses.',
    prescriptionExample:
      'Donaren (cloridrato de trazodona) 50 mg comprimidos revestidos sulcados — 1 caixa com 60 comprimidos. Administrar 1 comprimido (ou dose calculada de ___ mg) por via oral com pequeno petisco úmido, rigorosamente 1 hora e meia a 2 horas antes da ida à clínica veterinária ou do início de eventos de estresse sonoro. Bloquear acesso a escadas durante a ação do medicamento. Receita de Controle Especial em 2 vias (Lista C1 da Portaria 344/98).',
    safetyAlert: DONAREN_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 72,50',
      rangeLabel:
        'Donaren 50 mg (60 cp): R$ 68,00 a R$ 85,00 | Donaren 100 mg (30 cp): R$ 82,00 a R$ 105,00',
      sourceDate: DONAREN_PRICE_SOURCE_DATE,
      notes:
        'Medicamento humano de venda sob controle especial da Lista C1 da Portaria 344/98. Preço médio praticado em farmácias comerciais brasileiras para a caixa com 60 comprimidos de 50 mg.',
    },
    evidenceLevel:
      'Plumb’s 10ª ed.; Ensaios clínicos randomizados duplo-cegos (Stevens et al. 2016; Kim et al. 2022); Diretrizes Fear Free 2024.',
    isControlled: true,
    catalogMedicationId: 'editorial:trazodona',
  },
];
