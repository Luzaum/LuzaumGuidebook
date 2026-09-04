import type { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-25';

const BETNOVATE_TOPICAL_ALERT =
  'Produto humano de venda sob prescrição, usado extra-label em cães e gatos. Corticoide tópico potente (valerato de betametasona 0,1%): pode mascarar infecção, atrasar cicatrização e causar atrofia cutânea, supressão adrenal ou efeitos sistêmicos se aplicado em áreas extensas, oclusão ou curso prolongado. Não usar em demodicose, dermatofitose, piodermite não tratada, úlcera, ferida aberta, otite com membrana timpânica não avaliada ou lesões periorais/perianais. Impedir lambedura. Em gatos, usar quantidade mínima pelo menor tempo possível. Contraindicado em filhotes com menos de 1 ano conforme bula humana.';

export const betnovateCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'betnovate-gsk',
    slug: 'betnovate-valerato-betametasona',
    name: 'Betnovate®',
    manufacturer: 'GlaxoSmithKline Brasil (GSK)',
    commercialClass: 'dermatologic',
    commercialSubclass: 'skin_pruritus',
    commercialSubclasses: ['skin_pruritus', 'skin_atopy'],
    species: ['dog', 'cat'],
    presentations: [
      'Creme dermatológico 1 mg/g (0,1%) — bisnaga 15 g',
      'Creme dermatológico 1 mg/g (0,1%) — bisnaga 30 g',
      'Pomada dermatológica 1 mg/g (0,1%) — bisnaga 15 g',
      'Pomada dermatológica 1 mg/g (0,1%) — bisnaga 30 g',
      'Loção tópica 1 mg/mL (0,1%) — frasco 50 mL',
      'Solução capilar 1 mg/mL (0,1%) — frasco 50 mL',
    ],
    activeComponents: ['valerato de betametasona 0,1% (1 mg/g ou 1 mg/mL de betametasona base)'],
    labelCompositionSummary:
      'Valerato de betametasona 0,1%. Creme/pomada: 1,22 mg/g de valerato (equivalente a 1,00 mg/g de betametasona). Loção: 1,207 mg/mL. Solução capilar: 1,137 mg/mL. Excipientes variam por forma farmacêutica (creme: clorocresol, cetomacrogol, parafina, vaselina, água; pomada: parafina líquida e vaselina sólida).',
    labelDirections:
      'Uso tópico humano. Aplicar camada fina sobre a área afetada 1–2 vezes ao dia por até 4 semanas; reduzir frequência ou trocar por preparação menos potente conforme resposta. Creme: preferir lesões úmidas. Pomada: lesões secas, escamosas ou liquenificadas. Loção/capilar: áreas pilosas ou extensas. Em crianças (bula humana): limitar a 5 dias e evitar oclusão. Descontinuar gradualmente após controle.',
    dosageGuidance: {
      labelDose:
        'Bula humana: camada fina 1–2x/dia por até 4 semanas; manutenção/intermitente pode ser 1x/dia 2x/semana após controle. Uso veterinário extra-label: reservar para lesões inflamatórias/pruriginosas localizadas, geralmente curso curto (7–14 dias) com quantidade mínima.',
      plumbs: {
        dog: [
          {
            title: 'Lesão inflamatória/pruriginosa localizada (extra-label)',
            dose: 'Camada fina sobre área afetada 1–2x/dia por curto período',
            note: 'Confirmar diagnóstico e tratar infecção secundária antes ou concomitantemente. Preferir alternativas veterinárias (ex.: aceponato tópico) quando disponíveis.',
          },
        ],
        cat: [
          {
            title: 'Lesão inflamatória/pruriginosa focal (extra-label)',
            dose: 'Quantidade mínima em camada fina 1x/dia por curto período',
            note: 'Maior risco de absorção sistêmica e efeitos adversos; evitar áreas extensas, oclusão e uso prolongado.',
          },
        ],
      },
      notes: [
        'Creme ≠ pomada ≠ loção ≠ solução capilar — escolher veículo conforme tipo de lesão.',
        'Loção e solução capilar contêm álcool — inflamáveis; evitar calor/fogo durante e após aplicação.',
        'Não usar oclusão com filme plástico em animais que lambem a área.',
      ],
    },
    plumbsContext:
      'Betametasona é glicocorticoide potente. Em dermatologia veterinária, corticosteroides tópicos são reservados para lesões inflamatórias localizadas como estratégia poupadora de corticoide sistêmico, mas produtos humanos potentes como valerato 0,1% exigem cautela extra quanto à absorção, duração e espécie.',
    clinicalUse:
      'Extra-label em cães e gatos: prurido e inflamação cutânea focal (dermatite alérgica de contato, lesões atópicas localizadas, eczema/liquen simples, dermatite seborreica focal), quando se busca corticoide tópico potente e alternativas veterinárias específicas não estão disponíveis ou indicadas.',
    reassessment:
      'Reavaliar em 7–14 dias. Se não houver melhora em 2–4 semanas, rever diagnóstico (demodicose, Malassezia, dermatofitose, piodermite, otite, pulgas, alergia alimentar). Reduzir ou suspender gradualmente após controle; evitar cursos repetidos sem pausa.',
    prescriptionExample:
      'BETNOVATE® (valerato de betametasona 0,1%) — [creme/pomada/loção]. Aplicar camada fina apenas sobre lesão(s) descrita(s): ___, 1–2 vezes ao dia por ___ dias. Não aplicar em olhos, mucosas ou feridas abertas. Impedir lambedura por ___ minutos. Reavaliar em ___ dias.',
    safetyAlert: BETNOVATE_TOPICAL_ALERT,
    price: {
      averageLabel: 'R$ 38,10 a R$ 101,43',
      rangeLabel:
        'Pomada 15 g ~R$ 38,10; creme 30 g ~R$ 59,63; pomada 30 g ~R$ 62,61; solução capilar 50 mL ~R$ 101,43 (PMC BulasMed, ago/2026)',
      sourceDate: SOURCE_DATE,
      notes: 'Genéricos de valerato de betametasona 0,1% disponíveis com preços inferiores.',
    },
    evidenceLevel:
      'Composição, indicações e posologia conforme bula GSK/Anvisa (revisão 2025). Uso veterinário extra-label — sem aprovação específica para cães/gatos.',
    productPageUrl: 'https://consultaremedios.com.br/betnovate/bula',
    labelUrl: 'https://br.gsk.com/media/3w0jawdk/betnovate-pomada.pdf',
    imageUrl: 'https://www.cliquefarma.com.br/cdn-cgi/image/format=auto,width=280,height=280,quality=75/https://www.cliquefarma.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F88983.webp&w=3840&q=75',
  },
];
