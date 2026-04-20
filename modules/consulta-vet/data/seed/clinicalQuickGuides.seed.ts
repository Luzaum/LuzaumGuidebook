import { ClinicalQuickGuide } from '../../types/clinicalQuickGuide';

/**
 * Guia: exame físico para suspeita de ruptura do ligamento cruzado cranial (LCC).
 * Conteúdo educativo — não substitui julgamento clínico nem protocolo da clínica.
 * Referências citadas no texto (BSAVA, Gough et al., predisposições raciais) são para estudo;
 * confirme sempre na edição/fonte da sua biblioteca.
 */
const guiaRupturaLcc: ClinicalQuickGuide = {
  id: 'cqg-lcc-001',
  slug: 'exame-ruptura-ligamento-cruzado-cranial',
  title: 'Exame de ruptura do ligamento cruzado cranial',
  subtitle:
    'Ortopedia — joelho (cães e gatos): analogia clínica, tibial thrust, gaveta cranial, compressão tibial e armadilhas do exame.',
  summary:
    'Do “cinto de segurança” do LCC ao tibial thrust: por que o joelho instável “escorrega”, como posicionar as mãos (BSAVA), interpretar por ângulo, usar gaveta e compressão em conjunto e quando a sedação muda o exame.',
  category: 'ortopedia',
  species: ['dog', 'cat'],
  searchKeywords: [
    'ccl',
    'lcc',
    'lccr',
    'ligamento cruzado',
    'cranial',
    'drawer',
    'gaveta',
    'gaveta cranial',
    'tibial thrust',
    'compressão tibial',
    'tibial compression',
    'bsava',
    'fabella',
    'crista tibial',
    'menisco',
    'medial buttress',
    'joelho',
    'instabilidade',
    'ortopedia',
    'platô tibial',
    'banda craniomedial',
    'banda caudolateral',
  ],
  youtubeVideoId: null,
  heroImageAlt: 'Ilustração esquemática: posição para avaliação do joelho em flexão leve (referência visual genérica).',
  quickBullets: [
    'Pense no LCC como “cinto” que impede a tíbia de ir cranialmente; sem ele, testes mostram folga ou tibial thrust.',
    'Tibial thrust: tendência natural da tíbia a deslizar cranialmente no apoio (platô inclinado) — o exame tenta revelar isso.',
    'Gaveta cranial: teste mais manual; compressão tibial: imita força funcional do apoio. O BSAVA recomenda usar os dois.',
    'Teste em extensão e em 30–60° de flexão: bandas do LCC mudam de tensão; lesões parciais podem aparecer só num ângulo.',
    'Dor, tensão muscular, menisco/fibrose podem mascarar; sedação ou anestesia repetem o exame com outra qualidade.',
  ],
  sections: [
    { type: 'heading', level: 2, text: 'A ideia mais importante' },
    {
      type: 'paragraph',
      text:
        'Pense no joelho do cão como duas peças de LEGO apoiadas uma sobre a outra: em cima está o fêmur; embaixo, a tíbia; na frente, a patela; e dentro do joelho existem “cordas” muito importantes — os ligamentos cruzados.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Analogia clínica',
      text:
        'O ligamento cruzado cranial é como um cinto de segurança interno do joelho. Ele ajuda principalmente a impedir que a tíbia escorregue para frente em relação ao fêmur. No cão, também contribui para controlar rotação interna da tíbia e hiperextensão do joelho.',
    },
    { type: 'heading', level: 2, text: 'Por que ele rompe e por que o exame funciona?' },
    {
      type: 'paragraph',
      text:
        'O joelho do cão não é uma dobradiça reta perfeita: o platô tibial tem inclinação. Quando o animal apoia peso, o fêmur “empurra” a tíbia e existe tendência natural da tíbia querer deslizar cranialmente — na prática, costuma chamar-se tibial thrust.',
    },
    {
      type: 'paragraph',
      text:
        'Se o ligamento está íntegro, ele segura esse deslizamento. Se rompe, a tíbia fica “solta” e tende a andar para frente quando você testa a articulação. É isso que se procura demonstrar com o teste de gaveta cranial e com o teste de compressão tibial (tibial compression test).',
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'BSAVA (resumo do texto de estudo)',
      text:
        'O BSAVA destaca que esses dois testes são usados em conjunto para diagnosticar ruptura parcial ou completa do LCCr, e que dor, tensão muscular ou instabilidade sutil podem dificultar o exame no animal acordado.',
    },

    { type: 'heading', level: 2, text: '1. Antes de pôr a mão no joelho: o que observar' },
    {
      type: 'paragraph',
      text:
        'Antes do teste especial, já começa o exame ortopédico. Isto não fecha diagnóstico sozinho, mas indica: “este joelho merece teste de instabilidade”.',
    },
    { type: 'heading', level: 3, text: 'Observe andando' },
    {
      type: 'steps',
      title: 'Procure',
      items: [
        'Claudicação de apoio no membro pélvico.',
        'Apoio em ponta de dedo; passada curta.',
        'Dificuldade para sentar e levantar.',
        'Posição de “sentar torto”, com o membro mais afastado.',
        'Descarga de peso para o membro contralateral.',
      ],
    },
    { type: 'heading', level: 3, text: 'Observe parado' },
    {
      type: 'steps',
      title: 'Procure',
      items: [
        'Joelho discretamente flexionado; menos apoio naquele membro.',
        'Atrofia muscular, principalmente de quadríceps e musculatura da coxa, nos casos crônicos.',
        'Aumento de volume articular.',
      ],
    },
    { type: 'heading', level: 3, text: 'Palpe o joelho' },
    {
      type: 'paragraph',
      text: 'Compare sempre com o outro lado. Procure dor, efusão articular, espessamento periarticular, crepitação; em crônicos, o espessamento fibroso medial (medial buttress).',
    },

    { type: 'heading', level: 2, text: '2. Anatomia mínima para “enxergar” com a mão' },
    {
      type: 'paragraph',
      text:
        'Localize: patela, crista tibial, cabeça da fíbula, fabella lateral, fêmur distal e tíbia proximal.',
    },
    {
      type: 'paragraph',
      text:
        'No teste de gaveta cranial, o BSAVA orienta: uma mão no fêmur distal — polegar sobre a fabella lateral e dedo indicador na patela (mão que “trava” o fêmur); a outra mão na tíbia proximal — polegar sobre a cabeça da fíbula e indicador na crista tibial (mão que movimenta a tíbia).',
    },

    { type: 'heading', level: 2, text: '3. Teste de gaveta cranial: como fazer' },
    {
      type: 'paragraph',
      text:
        'O nome “gaveta” ajuda a imaginar: ver se a tíbia abre para frente, como gaveta a sair do armário.',
    },
    { type: 'heading', level: 3, text: 'Posicionamento' },
    {
      type: 'paragraph',
      text:
        'O BSAVA indica que pode ser feito no animal consciente; se houver dor, tensão muscular, temperamento difícil ou ruptura parcial, sedação ou anestesia geral podem ser necessárias. Acordado: frequentemente em estação sobre três membros. Sedado: decúbito lateral com o membro afetado para cima.',
    },
    { type: 'heading', level: 3, text: 'Passo a passo (mãos e movimento)' },
    {
      type: 'steps',
      title: 'Mãos',
      items: [
        'Mão do fêmur: polegar sobre a fabella lateral; indicador sobre a patela — trava o fêmur.',
        'Mão da tíbia: polegar sobre a cabeça da fíbula; indicador na crista tibial — move a tíbia.',
      ],
    },
    {
      type: 'steps',
      title: 'Movimento (protocolo BSAVA citado no material de estudo)',
      items: [
        'Aplicar força cranial na tíbia primeiro com o joelho em quase total extensão.',
        'Repetir com o joelho em 30 a 60 graus de flexão.',
      ],
    },

    { type: 'heading', level: 2, text: '4. Como interpretar a gaveta cranial' },
    {
      type: 'table',
      caption: 'Resumo alinhado ao BSAVA (estudo — confira na sua edição)',
      headers: ['Situação', 'O que se espera na gaveta'],
      rows: [
        [
          'Ruptura completa do LCCr',
          'Deslocamento cranial da tíbia em extensão e em flexão.',
        ],
        [
          'Ruptura isolada da banda craniomedial',
          'Deslocamento cranial da tíbia em flexão apenas.',
        ],
        [
          'Ruptura isolada da banda caudolateral',
          'Pode não gerar deslocamento cranial detectável da tíbia.',
        ],
        [
          'Animal jovem',
          'Movimento curtinho de gaveta com ponto final firme pode ser normal.',
        ],
      ],
    },
    {
      type: 'paragraph',
      text:
        'O LCCr tem bandas que ficam mais ou menos tensas conforme o ângulo do joelho: algumas lesões aparecem melhor em flexão; outras mascaram-se em extensão. Por isso não se testa só num ângulo — é uma sacada clínica importante.',
    },

    { type: 'heading', level: 2, text: '5. Teste de compressão tibial: como fazer' },
    {
      type: 'paragraph',
      text:
        'Reproduz o que ocorre no apoio: em vez de puxar a tíbia à mão, cria-se o empurrão mecânico que o corpo faria ao carregar peso.',
    },
    { type: 'heading', level: 3, text: 'Posicionamento' },
    {
      type: 'paragraph',
      text:
        'Mesmo raciocínio do teste anterior: pode ser acordado; se tenso, dolorido ou lesão parcial, muitas vezes sedação ou anestesia. Acordado: estação em três membros; sedado: decúbito lateral, membro afetado para cima.',
    },
    {
      type: 'steps',
      title: 'Passo a passo (BSAVA)',
      items: [
        'Segurar o fêmur distal fixo: polegar sobre a fabella lateral e indicador levemente na crista tibial.',
        'Com a outra mão, segurar a região metatarsiana.',
        'Manter o joelho em leve flexão.',
        'Flexionar lentamente o tarso.',
      ],
    },
    {
      type: 'paragraph',
      text:
        'Ao flexionar o tarso, a força transmitida pelo gastrocnêmio e estruturas caudais faz a tíbia tender a deslizar cranialmente. Se o LCCr estiver rompido, percebe-se a crista tibial a ir para frente — o tibial thrust. O BSAVA descreve resultado positivo como deslocamento cranial da crista tibial relativo ao fêmur, sugestivo de lesão do LCCr, e lembra que nem todos os casos terão instabilidade detectável neste teste.',
    },

    { type: 'heading', level: 2, text: '6. O que cada teste “prova” na biomecânica' },
    {
      type: 'table',
      caption: 'Gaveta versus compressão tibial',
      headers: ['Teste', 'Pergunta biomecânica', 'Em uma frase'],
      rows: [
        [
          'Gaveta cranial',
          '“Se eu empurrar a tíbia cranialmente à mão, o ligamento impede?”',
          'Teste mais manual, direto.',
        ],
        [
          'Compressão tibial',
          '“Se o membro recebe a força do apoio, a tíbia dispara cranialmente?”',
          'Teste mais dinâmico/funcional.',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Associação',
      text:
        'Os dois complementam-se; o BSAVA recomenda usá-los em conjunto.',
    },

    { type: 'heading', level: 2, text: '7. Quando o teste pode enganar' },
    {
      type: 'table',
      caption: 'Falsos negativos e limitações',
      headers: ['Fator', 'Efeito prático'],
      rows: [
        [
          'Fibrose periarticular; menisco (ex.: corno caudal do menisco medial “entalado”)',
          'Podem impedir a gaveta cranial mesmo com LCCr deficiente.',
        ],
        [
          'Dor, contratura, animal tenso',
          'Mascaram ou “travam” o exame.',
        ],
        [
          'Ruptura parcial',
          'Pode ser muito sutil.',
        ],
        [
          'Crônicos',
          'Menos mobilidade livre por fibrose.',
        ],
        [
          'Compressão tibial',
          'Nem todos os casos de doença do LCCr terão resultado positivo.',
        ],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Falso positivo',
      text:
        'Animal jovem pode ter gaveta curtinha com ponto final firme (considerada normal no BSAVA). Examinador inexperiente pode confundir movimento de pele, partes moles ou da perna inteira com instabilidade articular real.',
    },

    { type: 'heading', level: 2, text: '8. Sequência prática completa (ordem sugerida)' },
    {
      type: 'flowchart',
      title: 'Do observacional ao teste especial',
      nodes: [
        { id: '1', label: 'Observar marcha e postura', variant: 'start' },
        { id: '2', label: 'Palpar: dor, efusão, espessamento medial, crepitação, amplitude', variant: 'action' },
        { id: '3', label: 'Estabilidade patelar (extensão total e flexão leve)', variant: 'action' },
        { id: '4', label: 'Gaveta cranial', variant: 'action' },
        { id: '5', label: 'Compressão tibial', variant: 'action' },
        { id: '6', label: 'Comparar lado contralateral', variant: 'decision' },
        { id: '7', label: 'Duvidoso/doloroso/parcial? Sedar e repetir', variant: 'end' },
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6' },
        { from: '6', to: '7' },
      ],
    },
    {
      type: 'paragraph',
      text:
        'O BSAVA refere que avaliação sob sedação ou anestesia pode revelar instabilidade mascarada por dor, tensão muscular ou sutileza da lesão.',
    },

    { type: 'heading', level: 2, text: '9. Achados que aumentam a suspeita de LCCr' },
    {
      type: 'steps',
      title: 'Mesmo antes do teste especial',
      items: [
        'Claudicação aguda de membro pélvico.',
        'Dor à manipulação do joelho; efusão articular; instabilidade.',
        'História sem trauma importante, principalmente em cães predispostos; quadro uni ou bilateral.',
      ],
    },
    {
      type: 'paragraph',
      text:
        'Obras como Breed Predispositions to Disease in Dogs and Cats descrevem a doença do LCCr como causa comum de claudicação aguda importante e citam diagnóstico com demonstração da cranial drawer motion, além de radiografia e avaliação cirúrgica por artrotomia ou artroscopia; há predisposição racial referida (ex.: Rottweiler, Bulldog Inglês). Confirme na fonte.',
    },

    { type: 'heading', level: 2, text: '10. O exame ortopédico sozinho “fecha” diagnóstico?' },
    {
      type: 'paragraph',
      text:
        'Muitas vezes, na prática, quando há dor compatível, efusão e gaveta cranial e/ou tibial thrust positivos. Tecnicamente, o diagnóstico completo costuma integrar exame físico ortopédico, radiografia e eventualmente artrotomia ou artroscopia — em linha com referências como Gough, Thomas e O’Neill (cranial drawer, radiografia, artroscopia/artrotomia).',
    },

    { type: 'heading', level: 2, text: '11. Pérolas clínicas' },
    {
      type: 'callout',
      variant: 'info',
      title: 'Gaveta positiva em flexão, não em extensão',
      text: 'Pense em lesão parcial, especialmente banda craniomedial.',
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Tudo dói e nada mexe',
      text:
        'Não descarte LCCr: dor, contração muscular, menisco a travar, fibrose periarticular podem mascarar.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Cão muito tenso',
      text: 'Repetir sob sedação muda a qualidade do exame.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Mexeu o tarso e a crista tibial “salta”',
      text:
        'Está a ver a biomecânica da ruptura — o teste de compressão tibial a funcionar.',
    },

    { type: 'heading', level: 2, text: 'Tabela de manobras (referência rápida)' },
    {
      type: 'table',
      caption: 'Sinais clássicos na suspeita de LCC',
      headers: ['Manobra', 'O que avalia', 'Notas práticas'],
      rows: [
        [
          'Gaveta cranial (cranial drawer)',
          'Translação cranial anormal da tíbia face ao fêmur',
          'Testar extensão e 30–60° flexão; comparar lados; sensação terminal.',
        ],
        [
          'Compressão tibial (tibial thrust)',
          'Deslocamento cranial da crista com flexão do tarso e joelho em leve flexão',
          'Complementa a gaveta; nem sempre positivo em todos os casos.',
        ],
        [
          'Estabilidade patelar',
          'Luxação medial/lateral',
          'BSAVA: avaliar em extensão total e leve flexão.',
        ],
      ],
    },

    { type: 'heading', level: 2, text: 'Segurança e limitações' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Segurança',
      text:
        'Dor intensa, agressividade ou musculatura muito tensa podem mascarar sinais ou causar lesão. Não force a manipulação; use sedação/analgesia quando apropriado.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Limitações deste guia',
      text:
        'Material educativo para treino de exame físico. Diagnóstico definitivo, imagem e conduta devem seguir protocolo da clínica e literatura atualizada.',
    },

    { type: 'heading', level: 2, text: 'Figura de referência' },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/placeholder-lcc-knee.svg',
      alt: 'Diagrama esquemático: mãos posicionadas para estabilizar o fêmur e traduzir a tíbia na avaliação da gaveta.',
      caption:
        'Ilustração genérica. Substitua por foto ou desenho institucional quando disponível.',
    },
    { type: 'heading', level: 2, text: 'Vídeos demonstrativos (YouTube)' },
    {
      type: 'paragraph',
      text:
        'Dois vídeos de referência: gaveta cranial e compressão tibial. Reproduzem no próprio app (iframe responsivo).',
    },
    {
      type: 'youtubeEmbed',
      videoId: '3JA6jx67U4Q',
      title: 'Teste de gaveta cranial (cranial drawer)',
    },
    {
      type: 'youtubeEmbed',
      videoId: 'Txvir1HG_u4',
      title: 'Teste de compressão tibial (tibial compression / thrust)',
    },
  ],
  isPublished: true,
};

export const clinicalQuickGuidesSeed: ClinicalQuickGuide[] = [guiaRupturaLcc];
