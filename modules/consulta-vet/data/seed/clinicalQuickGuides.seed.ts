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

const guiaToracocentese: ClinicalQuickGuide = {
  id: 'cqg-toracocentese-002',
  slug: 'toracocentese-caes-gatos',
  title: 'Toracocentese em cães e gatos',
  subtitle: 'Procedimentos Ambulatoriais — punção e drenagem pleural terapêutica ou diagnóstica',
  summary: 'Procedimento emergencial e diagnóstico para alívio de efusão pleural e pneumotórax. Indicações, técnica de inserção (7º-9º EIC), materiais necessários e conduta pós-procedimento com furosemida.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'toracocentese',
    'pleura',
    'efusão pleural',
    'pneumotórax',
    'drenagem',
    'punção torácica',
    'furosemida',
    'cateter',
    'scalp',
    'iccd',
    'icce',
    'edema cardiogênico'
  ],
  youtubeVideoId: null,
  heroImageAlt: 'Esquema de toracocentese demonstrando a inserção perpendicular da agulha/cateter na parede torácica.',
  quickBullets: [
    'Drenar apenas se for conteúdo acumulado drenável ou para fins de diagnóstico.',
    'Local de punção: entre o 7º e 9º espaço intercostal (EIC), perpendicular à parede e na borda cranial da costela.',
    'Anestesia local: pode ser realizado um botão anestésico com lidocaína para conforto do paciente.',
    'Equipamentos chave: cateter 14-18G ou scalp 21-23G, extensor flexível, torneira de 3 vias e seringa de 20 mL.',
    'Manejo posterior: após drenagem em edema/efusão cardiogênica, a furosemida é indicada para diminuir a pressão hidrostática.'
  ],
  sections: [
    { type: 'heading', level: 2, text: 'A ideia mais importante' },
    {
      type: 'paragraph',
      text: 'A toracocentese é um procedimento ambulatorial e emergencial rápido que salva vidas. Ela consiste na punção da cavidade pleural para remover ar (pneumotórax) ou líquido (efusão pleural), aliviando imediatamente a restrição respiratória do paciente.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Critério de decisão clínica',
      text: 'A drenagem deve ser realizada apenas se houver conteúdo drenável acumulado na cavidade pleural, ou em caso de necessidade de coleta de material para diagnóstico (citologia, cultura, bioquímica).'
    },
    { type: 'heading', level: 2, text: '1. Indicações Clínicas' },
    {
      type: 'table',
      caption: 'Indicações de toracocentese por tipo de acúmulo pleural',
      headers: ['Indicação', 'Espécie', 'Causas Comuns'],
      rows: [
        [
          'Efusão Pleural (Líquido)',
          'Cães',
          'Quase sempre decorrente de Insuficiência Cardíaca Congestiva Direita (ICCD), neoplasias, hipoproteinemia ou obstrução de vasos linfáticos.'
        ],
        [
          'Efusão Pleural (Líquido)',
          'Gatos',
          'Mais comum por Insuficiência Cardíaca Congestiva Esquerda (ICCE), mas também por ICCD, neoplasias (linfoma), quilotórax, hipoproteinemia ou PIF.'
        ],
        [
          'Pneumotórax (Ar)',
          'Cães e Gatos',
          'Lesões torácicas perfurantes (mordeduras, projéteis), fratura de costela ou lesões traumáticas/espontâneas no trato respiratório.'
        ]
      ]
    },
    { type: 'heading', level: 2, text: '2. Preparação do Paciente e Anestesia' },
    {
      type: 'steps',
      items: [
        'Posicionar o paciente em estação (em pé) ou decúbito esternal para melhor estabilidade respiratória.',
        'Realizar tricotomia ampla na parede torácica lateral (entre o 6º e 10º EIC).',
        'Fazer antissepsia cirúrgica rigorosa.',
        'Anestesia local: pode ser feito um botão anestésico local infiltrando lidocaína 2% (sem vasoconstritor) na pele, tecido subcutâneo e pleura parietal.'
      ]
    },
    { type: 'heading', level: 2, text: '3. Equipamentos Necessários' },
    {
      type: 'steps',
      title: 'Checklist de Materiais',
      items: [
        'Dispositivo de punção: Cateter periférico de 14G a 18G (cães grandes/efusões espessas) ou Scalp 21G a 23G (gatos/cães pequenos).',
        'Extensor flexível (crucial para que a movimentação do paciente não desloque a agulha, evitando lesão de parênquima pulmonar).',
        'Torneira de 3 vias (three-way stopcock) para controle estéril do fluxo de drenagem.',
        'Seringa de 20 mL (ou maior) ou sistema de aspiração contínua.',
        'Tubos de coleta (EDTA para citometria e bioquímica; tubo seco para cultura/antibiograma).'
      ]
    },
    { type: 'heading', level: 2, text: '4. Técnica de Punção' },
    {
      type: 'steps',
      title: 'Passo a Passo Técnico',
      items: [
        'Puncionar entre o 7º e o 9º espaço intercostal (EIC).',
        'Direcionar a agulha perpendicularmente à parede torácica.',
        'Atenção ao posicionamento: para Líquido (Efusão), puncionar no terço ventral; para Ar (Pneumotórax), puncionar no terço dorsal.',
        'Inserir a agulha sempre na borda cranial da costela (evitando o feixe vasculonervoso intercostal que corre na borda caudal).',
        'Conectar o extensor com a torneira de 3 vias e a seringa de 20 mL, mantendo o sistema fechado para o exterior.',
        'Aspirar o máximo do conteúdo pleural até sentir pressão negativa constante ou o paciente apresentar alívio respiratório.'
      ]
    },
    { type: 'heading', level: 2, text: '5. Por que fazemos assim? (Fundamentação Anatômica & Fisiológica)' },
    {
      type: 'table',
      caption: 'Relação anatômica e fisiológica por trás das decisões do procedimento',
      headers: ['Decisão Técnica', 'Estrutura Relacionada', 'Justificativa Fisiológica / Risco Clínico'],
      rows: [
        [
          'Punção na borda CRANIAL da costela',
          'Feixe vasculonervoso intercostal',
          'Artéria, veia e nervo correm na borda caudal. Puncionar na borda cranial evita hemotórax severo e dor excruciante.'
        ],
        [
          'Punção Ventral (Líquido) vs Dorsal (Ar)',
          'Gravidade e Densidade',
          'Fluidos são densos e acumulam-se ventralmente pela gravidade. O ar é menos denso e sobe dorsalmente, definindo o local ideal de inserção.'
        ],
        [
          'Uso obrigatório de Extensor Flexível',
          'Dinâmica ventilatória pulmonar',
          'O pulmão expande-se e move-se continuamente. Uma agulha rígida direta na seringa rasgaria a pleura visceral. O extensor dissipa esse torque.'
        ],
        [
          'Torneira de 3 vias mantida fechada',
          'Pressão pleural subatmosférica',
          'A pleura tem pressão negativa. Se aberta ao exterior, o ar atmosférico entra passivamente, gerando um pneumotórax iatrogênico grave.'
        ],
        [
          'Drenagem constante porém gradual',
          'Hemodinâmica e Edema de Reexpansão',
          'A descompressão abrupta de grandes volumes causa hiperemia reativa (risco de edema pulmonar de reexpansão) e quedas bruscas de débito cardíaco.'
        ]
      ]
    },
    { type: 'heading', level: 2, text: '6. Fluxograma do Procedimento' },
    {
      type: 'flowchart',
      title: 'Fluxo Técnico da Toracocentese',
      nodes: [
        { id: 'start', label: 'Avaliar dispneia e suspeita de efusão/pneumotórax', variant: 'start' },
        { id: 'check_dren', label: 'Conteúdo pleural acumulado é drenável?', variant: 'decision' },
        { id: 'prep', label: 'Posicionar, tricotomia, antissepsia e botão anestésico', variant: 'action' },
        { id: 'local', label: 'Localizar 7º-9º EIC (ventral p/ líquido; dorsal p/ ar)', variant: 'action' },
        { id: 'punc', label: 'Inserção perpendicular na borda cranial da costela', variant: 'action' },
        { id: 'asp', label: 'Conectar extensor + torneira 3 vias e aspirar o máximo', variant: 'action' },
        { id: 'post', label: 'Tratar causa de base (ex: furosemida se cardiogênico)', variant: 'end' },
        { id: 'stop', label: 'Não drenar. Investigar outras causas de dispneia', variant: 'end' }
      ],
      edges: [
        { from: 'start', to: 'check_dren' },
        { from: 'check_dren', to: 'prep', label: 'Sim' },
        { from: 'check_dren', to: 'stop', label: 'Não' },
        { from: 'prep', to: 'local' },
        { from: 'local', to: 'punc' },
        { from: 'punc', to: 'asp' },
        { from: 'asp', to: 'post' }
      ]
    },
    { type: 'heading', level: 2, text: '7. Manejo Pós-Tratamento' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Edema e Efusão Cardiogênica',
      text: 'Após a drenagem do líquido pleural (toracocentese terapêutica) em pacientes com insuficiência cardíaca congestiva, ou no manejo de edema cardiogênico, pode-se utilizar a Furosemida (diurético de alça) para diminuir a pressão hidrostática nos capilares pulmonares/pleurais, retardando o novo acúmulo de efusão.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Monitoramento Pós-Punção',
      text: 'Monitore a frequência respiratória, padrão respiratório e saturação de O₂ nas horas subsequentes. Fique atento a sinais de pneumotórax iatrogênico (por laceração pulmonar) ou hemotórax.'
    }
  ],
  isPublished: true
};

const guiaAbdominocentese: ClinicalQuickGuide = {
  id: 'cqg-abdominocentese-003',
  slug: 'abdominocentese-caes-gatos',
  title: 'Abdominocentese em cães e gatos',
  subtitle: 'Procedimentos Clínicos — Punção, coleta e análise de efusão peritoneal',
  summary: 'Procedimento prático para triagem de líquido livre abdominal. Indicações, contraindicações, materiais necessários para diagnóstico e terapia, técnica de ponto único vs. 4 quadrantes, LPD/DPL e interpretação laboratorial de emergência.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'abdominocentese',
    'paracentese',
    'celiocentese',
    'líquido livre',
    'ascite',
    'peritonite',
    'hemoabdome',
    'uroabdome',
    'lpd',
    'dpl',
    'lavagem peritoneal',
    'citologia',
    'efusão'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/abdominocentese-quadrantes.svg',
  heroImageAlt: 'Diagrama de ponto único e quatro quadrantes para abdominocentese em cães e gatos.',
  quickBullets: [
    'Remoção de líquido livre abdominal para diagnóstico citológico/bioquímico ou alívio de ascite volumosa.',
    'Sempre esvaziar a bexiga do paciente antes de puncionar para mitigar riscos de cistocentese iatrogênica.',
    'Padrão ouro: guiada por ultrassom. Técnica cega: ponto único na linha média caudal ou quatro quadrantes.',
    'Diferenciação: Sangue de hemoabdome verdadeiro não coagula (desfibrinado); se coagular, indica punção de vaso ou baço.',
    'LPD/DPL é indicada se a abdominocentese for negativa mas houver suspeita forte de abdome agudo.'
  ],
  sections: [
    { type: 'heading', level: 2, text: 'Definição e Objetivos' },
    {
      type: 'paragraph',
      text: 'A abdominocentese (também referida como paracentese abdominal ou celiocentese) é a remoção percutânea de líquido da cavidade peritoneal. Na clínica de pequenos animais, constitui um procedimento majoritariamente diagnóstico, embora possa ter caráter terapêutico no alívio de ascites volumosas que causem restrição respiratória, dor ou aumento pressórico abdominal deletério. O objetivo primário é obter e analisar a efusão para categorizá-la, auxiliando no direcionamento médico, emergencial ou cirúrgico imediato.'
    },
    
    { type: 'heading', level: 2, text: 'Onde Consultar Ilustrações nos Livros de Referência' },
    {
      type: 'paragraph',
      text: 'Para um estudo aprofundado dos esquemas anatômicos e fotografias do procedimento, consulte as seguintes obras:'
    },
    {
      type: 'table',
      caption: 'Localização de figuras e capítulos úteis na literatura de referência',
      headers: ['Livro de Referência', 'Capítulo / Seção', 'Páginas / Figuras de Destaque'],
      rows: [
        [
          'BSAVA Guide to Procedures in Small Animal Practice (3ª ed., 2024)',
          'Abdominocentesis',
          'Páginas 43–44: Figura A.1 (abordagem de ponto único) e Figura A.2 (abordagem em quatro quadrantes).'
        ],
        [
          'Veterinary Emergency and Critical Care Procedures (3ª ed., 2025) — Hackett & Mazzaferro',
          'Cap. 7: Abdominocentesis and Diagnostic Peritoneal Lavage',
          'Páginas 211–216: Figuras 7.1 a 7.6 demonstrando material, posicionamento, assepsia, quatro quadrantes, aspiração e armazenamento.'
        ],
        [
          'Veterinary Emergency and Critical Care Procedures (3ª ed., 2025) — Hackett & Mazzaferro',
          'Diagnostic Peritoneal Lavage (DPL/LPD)',
          'Páginas 216–226: Figuras 7.7 a 7.25 mostrando detalhadamente lavagem peritoneal diagnóstica, inserção de cateter fenestrado e técnica over-the-wire.'
        ],
        [
          'BSAVA Manual of Canine and Feline Emergency and Critical Care (3ª ed.)',
          'Cap. 11/12 — Abdome Agudo / Peritonite',
          'Figura 11.1 (citologia de efusão séptica com bactérias intracelulares) e Figura 11.2 (esquema de LPD).'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '1. Quando fazer? (Indicações)' },
    {
      type: 'paragraph',
      text: 'A abdominocentese está indicada sempre que houver suspeita clínica ou confirmação por imagem de líquido livre abdominal.'
    },
    {
      type: 'steps',
      title: 'Indicações Práticas Principais',
      items: [
        'Presença de efusão identificada ao ultrassom (aFAST / TFAST).',
        'Perda de detalhe de serosa em radiografias abdominais (sugestivo de fluido livre).',
        'Quadros de abdome agudo ou dor abdominal persistente sem etiologia definida.',
        'Trauma abdominal fechado ou perfurante com possibilidade de lesão de órgãos internos.',
        'Choque circulatório de causa desconhecida, especialmente pós-trauma.',
        'Suspeita de patologias específicas: hemoabdome, uroabdome, peritonite séptica, peritonite biliar, pancreatite necrotizante ou deiscência de anastomoses gastrointestinais no pós-operatório.',
        'Terapêutica: Drenagem de ascites volumosas (geralmente decorrentes de insuficiência cardíaca congestiva, neoplasias ou hipoalbuminemia) que estejam pressionando o diafragma e causando dispneia.'
      ]
    },

    { type: 'heading', level: 2, text: '2. Quando evitar ou tomar cuidado? (Contraindicações e Precauções)' },
    {
      type: 'paragraph',
      text: 'Embora seja um procedimento seguro, existem situações de alto risco que exigem precaução extrema ou contraindicação:'
    },
    {
      type: 'steps',
      title: 'Principais Precauções Clínicas',
      items: [
        'Coagulopatias graves (risco de sangramento pós-punção, embora a abdominocentese com agulha fina apresente baixo risco de complicação hemorrágica fatal).',
        'Organomegalia acentuada (risco de punção acidental de baço ou fígado).',
        'Visceromegalia ou distensão importante de órgãos ocos (bexiga repleta, piometra, alças intestinais severamente distendidas por gás/líquido).',
        'Presença de aderências abdominais conhecidas.',
        'Ferida penetrante abdominal com evisceração ou entrada peritoneal evidente: nestes casos, a indicação é laparotomia exploratória de urgência, sendo desnecessária a punção.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Cuidados Pré-Procedimento',
      text: 'Sempre esvazie a bexiga do paciente antes de puncionar (seja por micção espontânea, compressão vesical cuidadosa ou sondagem uretral). Isso reduz drasticamente a chance de realizar uma cistocentese acidental.'
    },

    { type: 'heading', level: 2, text: '3. Materiais de Bolso (Checklist)' },
    {
      type: 'paragraph',
      text: 'Separe os materiais de acordo com a finalidade do procedimento (diagnóstica ou terapêutica):'
    },
    {
      type: 'steps',
      title: 'Abdominocentese Diagnóstica',
      items: [
        'Agulha de calibre fino (21G a 23G) — em gatos, prefira 23G (3/4"); em cães, 21G (3/4" a 1,5" dependendo do porte).',
        'Seringas de 3 mL a 5 mL.',
        'Tubo com EDTA (tampa roxa) para contagem celular global e citologia (impede a coagulação de amostras hemorrágicas).',
        'Tubo seco/siliconado (tampa vermelha) para dosagens bioquímicas (proteína total, creatinina, potássio, bilirrubina, glicose, lactato).',
        'Tubo estéril ou frasco de hemocultura para pesquisa microbiológica (aeróbios e anaeróbios).',
        'Lâminas de vidro limpas para confecção imediata de esfregaços diretos.'
      ]
    },
    {
      type: 'steps',
      title: 'Abdominocentese Terapêutica',
      items: [
        'Dispositivo do tipo Butterfly (escalp) 21G ou cateter intravenoso (18G a 20G).',
        'Torneira de 3 vias (three-way stopcock) e equipo extensor flexível.',
        'Seringas de 10 mL ou 20 mL, ou sistema de frasco de vácuo fechado para drenagem.',
        'Se possível, transdutor de ultrassom posicionado no local para guiar a punção em tempo real.'
      ]
    },

    { type: 'heading', level: 2, text: '4. Técnica Rápida — Escolha do Método' },
    
    { type: 'heading', level: 3, text: 'Opção Recomendada (Guiada por Ultrassom)' },
    {
      type: 'paragraph',
      text: 'A abdominocentese guiada por ultrassom (US) é considerada o padrão ouro. Ela deve ser a primeira opção nos casos em que há pequenos volumes de líquido livre, líquido loculado/compartimentalizado, em pacientes muito pequenos (como gatos) ou em animais com organomegalia abdominal e massas expressivas. O uso do transdutor permite visualizar a ponta da agulha adentrando o bolsão de fluido, reduzindo as chances de contaminação com sangue e de enterocenteses (perfurações intestinais) acidentais.'
    },

    { type: 'heading', level: 3, text: 'Técnica Cega — Ponto Único' },
    {
      type: 'steps',
      title: 'Execução do Ponto Único',
      items: [
        'Posicionar o cão ou gato em decúbito lateral (preferencialmente lateral esquerdo para afastar o baço da parede ventral em cães).',
        'Realizar tricotomia ampla do abdome ventral e antissepsia cirúrgica rigorosa (álcool e clorexidina).',
        'O ponto de punção padrão localiza-se na linha média (linha alba), cerca de 1 a 2 cm caudal ao umbigo. Evite punções craniais ao umbigo devido ao ligamento falciforme e acúmulo de gordura.',
        'Inserir a agulha acoplada ou não à seringa, mantendo-a perpendicular à pele.',
        'Prefira inserir a agulha sem a seringa conectada (técnica aberta), permitindo que o fluido goteje passivamente. Se não houver fluxo espontâneo, acople a seringa e aplique uma pressão negativa bem leve.',
        'Evite aplicar sucção forte com a seringa: isso pode fazer com que o omento ou alças intestinais tampem os orifícios da agulha, gerando um resultado falso-negativo.'
      ]
    },

    { type: 'heading', level: 3, text: 'Técnica em Quatro Quadrantes' },
    {
      type: 'paragraph',
      text: 'Indicada se o ponto único cego for negativo mas a suspeita de líquido livre persistir, ou quando não houver ultrassom disponível e o volume de fluido for moderado a baixo.'
    },
    {
      type: 'steps',
      title: 'Passos da Técnica de Quatro Quadrantes',
      items: [
        'Traçar linhas imaginárias cruzando o umbigo, dividindo o abdome em quatro áreas: Cranial Direito (CD), Cranial Esquerdo (CE), Caudal Direito (CaD) e Caudal Esquerdo (CaE).',
        'Realizar as punções a cerca de 2 a 3 cm do umbigo em cada um dos quadrantes (evitando áreas com massas palpáveis ou a região do baço no quadrante cranial esquerdo).',
        'Deixar a agulha inserida por aproximadamente 60 segundos em cada ponto, girando-a suavemente caso o líquido não goteje de imediato.'
      ]
    },

    { type: 'heading', level: 2, text: '5. Armadilhas Práticas no Plantão' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Amostra Hemorrágica: Hemoabdome ou Punção Traumática?',
      text: 'Ao aspirar sangue, verta imediatamente uma pequena alíquota em um tubo seco ou lâmina de vidro. Se o sangue NÃO coagular em poucos minutos, trata-se de hemoabdome verdadeiro (o sangue livre na cavidade peritoneal sofre desfibrinação rápida). Se o sangue COAGULAR rapidamente, indica-se que a agulha puncionou um vaso sanguíneo, baço ou fígado. Retire a agulha imediatamente e puncione em outro local.'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'O Falso-Negativo na Abdominocentese',
      text: 'Um resultado negativo (ausência de líquido na agulha) não exclui a presença de efusão abdominal. Volumes inferiores a 5-7 mL/kg de peso vivo, líquidos retidos no espaço retroperitoneal, obstrução da agulha pelo omento ou líquidos loculados/espessos podem impossibilitar a coleta sem auxílio do ultrassom.'
    },

    { type: 'heading', level: 2, text: '6. Lavagem Peritoneal Diagnóstica (LPD / DPL)' },
    {
      type: 'paragraph',
      text: 'A LPD é um método altamente sensível para detectar peritonite ou hemorragia abdominal em pacientes instáveis após trauma, quando o ultrassom não está disponível e a abdominocentese de múltiplos quadrantes foi negativa.'
    },
    {
      type: 'steps',
      title: 'Técnica de LPD Resumida',
      items: [
        'Certificar-se de que a bexiga do paciente está vazia.',
        'Realizar tricotomia e assepsia cirúrgica no abdome ventral médio e infundir um botão de anestesia local com lidocaína.',
        'Inserir um cateter calibroso (over-the-needle) ou cateter de diálise fenestrado na linha média, direcionando-o caudalmente para o espaço pélvico.',
        'Infundir solução cristaloide isotônica morna (soro fisiológico 0,9% ou Ringer Lactato) na dose de 10 a 20 mL/kg (alguns autores sugerem até 22 mL/kg em cães).',
        'Massagear suavemente o abdome do paciente para distribuir o líquido uniformemente pela cavidade.',
        'Abaixar o frasco/bolsa de soro vazia abaixo do nível do abdome do paciente e recuperar o líquido por gravidade (drenagem passiva). A recuperação de até 20-30% do volume infundido já é considerada suficiente para análise.',
        'Interpretação: Lembre-se de que o líquido recuperado está diluído. Avaliações de contagem celular global e dosagens bioquímicas absolutas perdem a linearidade habitual, priorizando-se a pesquisa de bactérias intracelulares e proporções bioquímicas.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Contraindicações da LPD',
      text: 'Não realize a LPD se o paciente apresentar dispneia grave, suspeita de hérnia diafragmática, organomegalia acentuada ou ferimentos abdominais abertos com indicação expressa de laparotomia cirúrgica.'
    },

    { type: 'heading', level: 2, text: '7. O que solicitar na análise do líquido?' },
    {
      type: 'paragraph',
      text: 'Sempre solicite a análise básica: aspecto macroscópico (cor, turbidez), concentração de proteína total, contagem global de células nucleadas, citologia diferencial e microbiologia.'
    },
    {
      type: 'table',
      caption: 'Bioquímica comparativa entre líquido abdominal e sangue periférico',
      headers: ['Suspeita Clínica', 'Parâmetros a Comparar', 'Interpretação de Emergência'],
      rows: [
        [
          'Uroabdome',
          'Creatinina e Potássio (Líquido vs. Sangue)',
          'Cão: Creatinina líquido:sangue > 2:1 ou Potássio líquido:sangue > 1.4:1. Gato: Creatinina líquido:sangue > 2:1 ou Potássio líquido:sangue > 1.9:1.'
        ],
        [
          'Peritonite Séptica',
          'Glicose e Lactato (Líquido vs. Sangue)',
          'Glicose do líquido menor que a do sangue por uma diferença > 20 mg/dL ou Lactato do líquido maior que o do sangue por uma diferença > 2 mmol/L. O diagnóstico definitivo baseia-se na citologia.'
        ],
        [
          'Peritonite Biliar',
          'Bilirrubina Total (Líquido vs. Sangue)',
          'Concentração de bilirrubina no líquido abdominal maior que no soro (tipicamente > 2 vezes) sugere fortemente extravasamento de bile.'
        ],
        [
          'Pancreatite / Ruptura Pancreática',
          'Amilase e Lipase (Líquido vs. Sangue)',
          'Valores de amilase ou lipase significativamente maiores no líquido abdominal em relação ao soro apoiam o diagnóstico, devendo ser correlacionados com imagem (US).'
        ],
        [
          'Hemoabdome',
          'Volume Globular / Hematócrito (Líquido vs. Sangue)',
          'Volume globular do líquido abdominal próximo ou superior ao hematócrito sistêmico indica sangramento ativo importante. Líquido que não coagula corrobora hemoabdome verdadeiro.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '8. Interpretação Citológica de Emergência' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Peritonite Séptica (Emergência Cirúrgica)',
      text: 'A identificação de neutrófilos degenerados contendo bactérias fagocitadas (bactérias intracelulares) é diagnóstico de peritonite séptica. Esse achado constitui uma emergência cirúrgica (laparotomia exploratória imediata para correção da fonte de contaminação e lavagem peritoneal exaustiva).'
    },
    {
      type: 'paragraph',
      text: 'Atenção aos detalhes diagnósticos:'
    },
    {
      type: 'steps',
      title: 'Cuidados na Interpretação',
      items: [
        'A presença de bactérias apenas extracelulares pode ser decorrente de contaminação da lâmina ou punção acidental de alça intestinal (enterocentese). A fagocitação por neutrófilos é o marcador de infecção peritoneal ativa.',
        'Pacientes no pós-operatório recente de cirurgias gastrointestinais podem apresentar alterações inflamatórias e bioquímicas temporárias sem sepse estabelecida. Nesses casos, avaliações citológicas seriadas são cruciais.',
        'Células mesoteliais reativas (que descamam da parede peritoneal em processos inflamatórios crônicos) podem mimetizar células neoplásicas. A ausência de células atípicas na amostra também não descarta neoplasia intra-abdominal.'
      ]
    },

    { type: 'heading', level: 2, text: '9. Algoritmo de Plantão' },
    {
      type: 'flowchart',
      title: 'Fluxograma de Abordagem ao Líquido Abdominal',
      nodes: [
        { id: 'step-1', label: 'Estabilizar Paciente (ABC) & Analgesia', variant: 'start' },
        { id: 'step-2', label: 'Identificar Líquido Livre (US/aFAST ou Raio-X)', variant: 'action' },
        { id: 'step-3', label: 'Abdominocentese Guiada (US) ou Cega (Ponto Único/4Q)', variant: 'action' },
        { id: 'step-4', label: 'Se Negativa + Forte Suspeita: Fazer LPD / DPL', variant: 'decision' },
        { id: 'step-5', label: 'Análise de Líquido: Citologia, Bioquímica & Conduta', variant: 'end' }
      ],
      edges: []
    },

    { type: 'heading', level: 2, text: '10. Complicações Possíveis' },
    {
      type: 'paragraph',
      text: 'As principais complicações associadas ao procedimento incluem:'
    },
    {
      type: 'steps',
      title: 'Lista de Complicações e Riscos',
      items: [
        'Hemorragia por laceração de órgãos parenquimatosos (baço ou fígado) ou vasos calibrosos.',
        'Perfuração inadvertida de órgãos ocos (enterocentese ou cistocentese).',
        'Indução de peritonite iatrogênica por falha na assepsia.',
        'Disseminação bacteriana decorrente de punção acidental de abscessos intra-abdominais ou piometra.',
        'Resultados falsos-negativos que retardam o diagnóstico.',
        'Nas técnicas de LPD: desconforto álgico à infusão, infusão subcutânea de fluidos, hematomas na parede ou diluição excessiva da amostra original.'
      ]
    }
  ],
  isPublished: true
};

const guiaBandagemRobertJones: ClinicalQuickGuide = {
  id: 'cqg-robert-jones-001',
  slug: 'bandagem-robert-jones',
  title: 'Bandagem Robert Jones',
  subtitle:
    'Ortopedia - imobilização temporária acolchoada para fraturas e luxações distais em cães e gatos.',
  summary:
    'Guia visual, em ordem prática, para montar uma bandagem Robert Jones: quando usar, materiais, estribos, algodão, gaze, acabamento, dedos visíveis e revisão final.',
  category: 'ortopedia',
  species: ['dog', 'cat'],
  searchKeywords: [
    'robert jones',
    'bandagem robert jones',
    'bandagem',
    'imobilizacao',
    'imobilização',
    'coaptacao',
    'coaptação',
    'fratura',
    'luxacao',
    'luxação',
    'tala',
    'splint',
    'ortopedia',
    'primeiros socorros',
    'membro',
    'algodao',
    'algodão',
    'gaze',
    'vetrap',
    'estribos',
    'dedos',
    'curativo'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/robert-jones-fig-09-camada-elastica.png',
  heroImageAlt:
    'Bandagem Robert Jones finalizada em membro pélvico de cão, com camada externa elástica e dedos centrais visíveis.',
  quickBullets: [
    'Pense nela como uma almofada firme e temporária: muito acolchoamento por dentro, compressão uniforme por fora.',
    'Serve melhor para ganhar tempo em fraturas ou luxações abaixo do cotovelo ou do joelho.',
    'A ferida vem antes da bandagem: limpar, lavar, proteger e só então imobilizar.',
    'A estrutura nasce do algodão volumoso comprimido pela gaze; a faixa colorida externa é acabamento, não é a força principal.',
    'Sempre deixe os dois dedos centrais visíveis para monitorar inchaço, frio, dor, umidade e aperto.'
  ],
  sections: [
    { type: 'heading', level: 2, text: 'Quando usar' },
    {
      type: 'paragraph',
      text:
        'A Robert Jones é uma bandagem temporária, grossa e acolchoada. Ela não conserta a fratura: ela compra tempo com conforto, diminui movimento doloroso, ajuda a controlar edema e protege o membro até radiografia, cirurgia, encaminhamento ou tratamento definitivo.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Regra de ouro da imobilização',
      text:
        'Para segurar bem, a bandagem precisa controlar a articulação acima e a articulação abaixo da lesão. Se a fratura está muito alta no membro, ela vira peso e volume, mas não imobiliza de verdade.'
    },
    {
      type: 'table',
      caption: 'Seleção rápida do caso',
      headers: ['Situação', 'Conduta prática'],
      rows: [
        [
          'Fratura ou luxação distal ao cotovelo ou joelho',
          'Boa opção temporária se a bandagem conseguir incluir as articulações adjacentes e o paciente tolerar o procedimento.'
        ],
        [
          'Ferida aberta associada',
          'Trate a ferida antes: tricotomia, limpeza, lavagem, desbridamento quando indicado e curativo primário/secundário antes da bandagem.'
        ],
        [
          'Fratura proximal ao cotovelo ou joelho',
          'Não use Robert Jones como imobilização principal. Considere analgesia, repouso, spica quando apropriado ou estabilização definitiva.'
        ],
        [
          'Paciente com dor intensa ou instável',
          'Faça analgesia e estabilização sistêmica primeiro; sedação ou anestesia podem ser necessárias para aplicar sem sofrimento e sem piorar a lesão.'
        ]
      ]
    },
    { type: 'heading', level: 2, text: 'Materiais' },
    {
      type: 'table',
      caption: 'Monte tudo antes de começar',
      headers: ['Material', 'Uso'],
      rows: [
        ['Fita adesiva porosa de 1 polegada', 'Estribos medial e lateral, com abas distais não aderentes.'],
        ['Rolo de algodão de 12 polegadas', 'Cães médios e grandes; pode ser dividido em largura ou espessura conforme o membro.'],
        ['Algodão ortopédico de 2 a 4 polegadas', 'Gatos e cães pequenos, geralmente em 3 a 4 rolos.'],
        ['Gaze em rolo de 3 a 6 polegadas', 'Compressão firme e uniforme do algodão; normalmente 2 a 3 rolos.'],
        ['Faixa elástica autoaderente', 'Camada externa protetora, aplicada com sobreposição e tensão moderada.'],
        ['Tesoura para bandagem e fita elástica adesiva de 2 polegadas', 'Acabamento, reforço das margens e remoção segura.'],
        ['Proteção contra água e sujeira', 'Saco plástico, manga cirúrgica ou bota impermeável apenas para saídas controladas.']
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Antes da primeira volta',
      text:
        'Radiografe quando isso não atrasar analgesia/estabilização essenciais. Se houver ferida, ela vem antes da bandagem. A Robert Jones não "corrige" contaminação, necrose ou curativo mal feito.'
    },
    { type: 'heading', level: 2, text: 'Passo a passo visual' },
    {
      type: 'paragraph',
      text:
        'Use a sequência como uma receita de bancada: preparar o paciente, criar as alças de fita, construir volume com algodão, comprimir com gaze, prender os estribos e fechar com a camada externa.'
    },
    {
      type: 'steps',
      title: 'Antes de encostar a bandagem',
      items: [
        'Controle dor antes de manipular. Se o paciente resiste, sente muita dor ou a fratura está instável, sedação ou anestesia deixam a aplicação mais segura.',
        'Coloque o paciente em decúbito lateral, com o membro afetado para cima e bem apoiado.',
        'Se existir ferida, faça tricotomia, lavagem, curativo primário/secundário e proteção antes da Robert Jones.',
        'Tenha um auxiliar para segurar o membro e manter tração suave. Isso evita torção enquanto você enrola.'
      ]
    },
    {
      type: 'heading',
      level: 3,
      text: '1. Estribos de fita: suas alças de controle'
    },
    {
      type: 'paragraph',
      text:
        'Cole duas tiras longas de fita porosa, uma de cada lado do membro, começando no carpo ou tarso e passando além dos dedos. Dobre as pontas para elas não grudarem nelas mesmas. Essas tiras funcionam como alças: ajudam o auxiliar a manter o membro alinhado e, no final, prendem a bandagem.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-02-estribos.png',
      alt:
        'Tiras de fita adesiva medial e lateral estendidas além dos dedos.'
    },
    {
      type: 'heading',
      level: 3,
      text: '2. Preparar o algodão: o volume precisa nascer antes'
    },
    {
      type: 'paragraph',
      text:
        'Abra o rolo de algodão e ajuste a espessura antes de aplicar no animal. Não tente corrigir falta de acolchoamento apertando mais a faixa externa; isso aumenta risco de compressão ruim, desconforto e pontos de pressão.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-03-algodao-espessura.png',
      alt:
        'Algodão sendo aberto para ajustar a espessura.'
    },
    {
      type: 'paragraph',
      text:
        'Se o rolo estiver largo demais para o paciente, rasgue no comprimento. Para gatos e cães pequenos, rolos menores ou algodão ortopédico de 2 a 4 polegadas costumam ficar mais fáceis de controlar.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-04-algodao-largura.png',
      alt:
        'Algodão sendo dividido no comprimento para ajustar a largura.'
    },
    {
      type: 'heading',
      level: 3,
      text: '3. Algodão no membro: construir uma almofada uniforme'
    },
    {
      type: 'paragraph',
      text:
        'Comece perto dos dedos e suba em direção ao corpo, sempre sobrepondo cerca de metade da volta anterior. Imagine que você está formando um cilindro acolchoado, sem degraus, buracos ou faixas estreitas apertadas.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-05-algodao-membro.png',
      alt:
        'Algodão sendo enrolado no membro de distal para proximal.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Imagem mental útil',
      text:
        'O algodão é o colchão da bandagem. Se ele fica fino, irregular ou com falhas, a gaze e a faixa externa não salvam o resultado.'
    },
    {
      type: 'heading',
      level: 3,
      text: '4. Gaze: transformar algodão fofo em suporte firme'
    },
    {
      type: 'paragraph',
      text:
        'A gaze é aplicada por cima do algodão com pressão firme e constante. Ela comprime o acolchoamento e dá corpo à Robert Jones. Evite terminar uma volta muito apertada diretamente sobre a pele nas extremidades.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-06-gaze-compressao.png',
      alt:
        'Gaze em rolo sendo aplicada sobre o algodão.'
    },
    {
      type: 'paragraph',
      text:
        'Quando fizer o padrão cruzado, mantenha a tensão igual de um lado ao outro. Esse cruzamento ajuda a deixar o diâmetro mais uniforme, principalmente em membros cônicos ou quando o algodão tende a abrir.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-07-gaze-cruzada.png',
      alt:
        'Aplicação cruzada da gaze sobre a bandagem.'
    },
    {
      type: 'heading',
      level: 3,
      text: '5. Prender os estribos e deixar os dedos visíveis'
    },
    {
      type: 'paragraph',
      text:
        'Separe as abas de fita, torça para a face adesiva encostar na gaze e puxe sobre a bandagem. Os dois dedos centrais devem ficar visíveis; eles são a janela de monitoramento para edema, cor, temperatura e dor.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-08-estribos-dedos.png',
      alt:
        'Estribos sendo puxados por cima da bandagem com dedos centrais visíveis.'
    },
    {
      type: 'heading',
      level: 3,
      text: '6. Camada externa: proteger sem esmagar'
    },
    {
      type: 'paragraph',
      text:
        'Finalize com faixa elástica autoaderente de distal para proximal, com cerca de 50% de sobreposição. Use tensão moderada: a bandagem deve ficar firme, mas não estrangular o acolchoamento.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/robert-jones-fig-09-camada-elastica.png',
      alt:
        'Camada externa elástica sendo aplicada sobre a bandagem Robert Jones.'
    },
    { type: 'heading', level: 2, text: 'Como saber se ficou boa' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Teste do "thump"',
      text:
        'Uma Robert Jones bem aplicada fica firme, não mole ou maleável. Ao percutir com os dedos, deve ter sensação de "thump", como uma melancia madura. Se está fofa, frouxa ou escorregando, a compressão não está adequada.'
    },
    {
      type: 'table',
      caption: 'Checklist antes de liberar o paciente',
      headers: ['Ponto de checagem', 'O que procurar'],
      rows: [
        ['Dedos centrais', 'Os dois dedos centrais devem ficar visíveis para avaliação de edema, cor, temperatura e conforto.'],
        ['Tensão', 'Firme e uniforme, sem sulcos, pregas, anéis apertados ou pontos de pressão.'],
        ['Extensão', 'A bandagem deve cruzar a articulação acima e abaixo da lesão quando essa for a estratégia de imobilização.'],
        ['Margens', 'Extremidades proximal e distal reforçadas, sem gaze ou faixa fazendo garrote na pele.'],
        ['Conforto', 'Paciente com analgesia adequada, sem piora de dor, mordedura persistente da bandagem ou inquietação progressiva.'],
        ['Proteção', 'Manter seca e limpa; proteção impermeável apenas para deslocamentos curtos e retirada ao repouso.']
      ]
    },
    { type: 'heading', level: 2, text: 'Monitoramento e retorno' },
    {
      type: 'table',
      caption: 'Sinais que exigem reavaliação rápida',
      headers: ['Achado', 'Por que importa'],
      rows: [
        ['Dedos inchados, frios, cianóticos ou doloridos', 'Pode indicar constrição, edema progressivo ou comprometimento vascular.'],
        ['Bandagem molhada, suja ou com odor', 'Aumenta risco de dermatite, maceração, infecção e perda de proteção da ferida.'],
        ['Bandagem escorregando ou girando', 'Perde imobilização e pode criar pontos de pressão.'],
        ['Dor crescente, vocalização ou tentativa intensa de remover', 'Pode ser compressão excessiva, progressão da lesão ou analgesia insuficiente.'],
        ['Margens apertadas ou feridas por atrito', 'Precisam de troca; não "ajuste por fora" uma bandagem mal posicionada.']
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Não é tratamento definitivo',
      text:
        'Rotule e registre como imobilização temporária. Se o paciente for encaminhado, deixe claro que ele precisa de avaliação veterinária definitiva dentro do prazo combinado, mesmo que pareça confortável.'
    },
    { type: 'heading', level: 2, text: 'Erros comuns' },
    {
      type: 'steps',
      items: [
        'Usar Robert Jones para lesão proximal ao cotovelo ou joelho, onde ela não consegue controlar adequadamente o foco.',
        'Fazer pouco volume de algodão e tentar compensar apertando demais a faixa externa.',
        'Deixar a gaze frouxa: a bandagem fica bonita por fora, mas mole e sem efeito de imobilização.',
        'Esconder todos os dedos, perdendo a principal janela de monitoramento.',
        'Permitir contato direto de gaze/faixa apertada com pele nas margens, criando efeito de garrote.',
        'Aplicar sobre ferida aberta sem limpeza, lavagem e curativo adequados.'
      ]
    },
    { type: 'heading', level: 2, text: 'Fontes' },
    {
      type: 'paragraph',
      text:
        'Palmer RH, Goh CSS. First Aid/Temporary Immobilization of Limb Fractures With Bandages and Splints. Today’s Veterinary Practice. Novembro/dezembro de 2019;40-51.'
    },
    {
      type: 'paragraph',
      text:
        'Imagens deste guia: figuras técnicas do mesmo artigo de Palmer RH e Goh CSS, Today’s Veterinary Practice, 2019, usadas como referência visual para aplicação da bandagem Robert Jones.'
    }
  ],
  isPublished: true
};

export const clinicalQuickGuidesSeed: ClinicalQuickGuide[] = [
  guiaRupturaLcc,
  guiaBandagemRobertJones,
  guiaToracocentese,
  guiaAbdominocentese
];

