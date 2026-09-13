import { ClinicalQuickGuide } from '../../types/clinicalQuickGuide';
import { guiaBiopsiaIncisional } from './clinicalQuickGuides.biopsia-incisional.seed';

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
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/exame-ruptura-ligamento-cruzado-cranial.webp',
  heroImageAlt: 'Imagem ilustrativa de exame de ruptura do ligamento cruzado cranial: materiais ou modelo didático, sem pacientes.',
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
        'Dois vídeos de referência: gaveta cranial e compressão tibial. Podem ser reproduzidos diretamente nesta página.',
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
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/toracocentese-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de toracocentese em cães e gatos: materiais ou modelo didático, sem pacientes.',
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
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/abdominocentese-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de abdominocentese em cães e gatos: materiais ou modelo didático, sem pacientes.',
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
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/bandagem-robert-jones.webp',
  heroImageAlt: 'Imagem ilustrativa de bandagem robert jones: materiais ou modelo didático, sem pacientes.',
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

const guiaColetaArterial: ClinicalQuickGuide = {
  id: 'cqg-coleta-arterial-005',
  slug: 'coleta-sangue-arterial-caes-gatos',
  title: 'Coleta de sangue arterial em cães e gatos',
  subtitle: 'Procedimentos Clínicos — Punção dorsal pedal e femoral, hemogasometria, cuidados pré-analíticos e interpretação',
  summary: 'Guia completo e objetivo para o clínico veterinário: quando indicar a gasometria arterial, qual artéria escolher em cães e gatos, posicionamento sem estresse, técnica de punção com agulha fina, prevenção de erros pré-analíticos (bolhas, heparina, tempo), valores de referência e cateterização arterial.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'coleta arterial',
    'sangue arterial',
    'hemogasometria',
    'gasometria',
    'arterial',
    'pao2',
    'paco2',
    'fio2',
    'arteria dorsal pedal',
    'metatarsal dorsal',
    'arteria femoral',
    'puncao arterial',
    'heparina',
    'erros pre analiticos',
    'bsava',
    'cateter arterial',
    'hipoxemia',
    'ventilacao',
    'cat friendly',
    'oxigenoterapia',
    'vetius'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/coleta-sangue-arterial-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de coleta de sangue arterial em cães e gatos: materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'Objetivo primário: avaliar oxigenação (PaO₂) e ventilação (PaCO₂) pulmonares reais; a PvO₂ venosa NÃO substitui a PaO₂ para função pulmonar.',
    'Primeira escolha por espécie: artéria dorsal pedal/metatarsal em cães (distal ao jarrete, entre II e III metatarsos); artéria femoral em gatos e cães pequenos.',
    'Calibre e seringa: 25G para gatos e cães pequenos; 22G para cães médios e grandes. Seringa heparinizada seca de gasometria (volume de 0,4–1 mL).',
    'Manejo do estresse: evitar sedação de rotina para avaliar a ventilação real; contudo, contenção violenta gera hiperventilação e alcalose respiratória artificial.',
    'Paciente ortopneico: NUNCA forçar decúbito lateral se agravar a dispneia; colete em estação ou decúbito esternal com oxigenação contínua.',
    'Momento crítico pós-punção: expulsar bolhas de ar imediatamente, fechar hermeticamente e analisar em até 5 minutos; registrar SEMPRE a FiO₂.',
    'Prevenção de hematoma: compressão digital direta e contínua no sítio de punção por no mínimo 5 minutos cronometrados.'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. Para que serve uma amostra arterial?' },
    {
      type: 'paragraph',
      text: 'A hemogasometria arterial é a ferramenta diagnóstica padrão-ouro para avaliar simultaneamente três componentes fisiológicos vitais: Oxigenação (determinada pela PaO₂), Ventilação alveolar (determinada pela PaCO₂) e Equilíbrio ácido-base sistêmico (pH, PaCO₂, bicarbonato [HCO₃⁻] e excesso/déficit de base [Base Excess]).'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Por que a amostra venosa NÃO substitui a arterial?',
      text: 'A grande e insubstituível diferença em relação à amostra venosa é a oxigenação. A PO₂ venosa (PvO₂) é profundamente dependente da extração de oxigênio pelos tecidos periféricos, do débito cardíaco e da microcirculação. Uma gasometria venosa responde com precisão questões metabólicas de pH e bicarbonato, mas é incapaz de demonstrar se o pulmão está conseguindo transferir oxigênio para o sangue capilar pulmonar.'
    },
    { type: 'heading', level: 3, text: 'Quando vale a pena coletar sangue arterial?' },
    {
      type: 'paragraph',
      text: 'Na rotina clínica, pense em sangue arterial sempre que a dúvida central for: "Esse pulmão está conseguindo colocar O₂ no sangue e eliminar CO₂ adequadamente?". É particularmente indicada em:'
    },
    {
      type: 'steps',
      items: [
        'Dispneia ou taquipneia aguda de origem indeterminada.',
        'Suspeita clínica de hipoxemia (cianose, respiração superficial rápida, ortopneia).',
        'Pneumopatias agudas e crônicas: pneumonia bacteriana ou por aspiração, edema pulmonar cardiogênico e não cardiogênico, contusão pulmonar pós-trauma e síndrome do desconforto respiratório agudo (SDRA/ARDS).',
        'Suspeita de hipoventilação alveolar ou fadiga da musculatura respiratória (PaCO₂ elevada).',
        'Doenças neuromusculares com risco de falência ventilatória (polirradiculoneurite aguda, botulismo, tétano, miastenia gravis, paralisia por carrapato).',
        'Obstrução de vias aéreas superiores ou inferiores (síndrome braquicefálica, colapso de traqueia, paralisia de laringe, bronquite/asma felina).',
        'Monitoramento objetivo da resposta à oxigenoterapia e titulação de desmame.',
        'Ventilação mecânica invasiva ou suporte ventilatório não invasivo.',
        'Anestesia de pacientes com doença pulmonar importante ou submetidos a toracotomias e laparotomias prolongadas.',
        'Discrepância evidente entre a gravidade clínica do paciente e a leitura do oxímetro de pulso (SpO₂).'
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Diferenciação Fisiopatológica Crucial',
      text: 'A gasometria arterial diferencia com precisão se uma hipoxemia é causada por simples hipoventilação (onde a PaCO₂ está muito elevada e o gradiente alvéolo-arterial A–a é normal) ou por alterações graves de ventilação/perfusão (V/Q), shunt da direita para a esquerda ou espessamento da barreira alvéolo-capilar (onde o gradiente A–a está aumentado).'
    },

    { type: 'heading', level: 2, text: '2. Resumo Rápido — Cão vs. Gato' },
    {
      type: 'table',
      caption: 'Guia comparativo rápido de punção arterial entre espécies (BSAVA Procedures 2024)',
      headers: ['Item Clínico', 'Cão 🐶', 'Gato 🐱'],
      rows: [
        ['Primeira escolha prática', 'Artéria dorsal pedal / metatarsal dorsal', 'Artéria femoral'],
        ['Alternativa clínica', 'Artéria femoral', 'Artéria dorsal pedal / metatarsal'],
        ['Calibre da agulha', '25G em cães pequenos; 22G em cães médios e grandes', '25G (agulha fina com bisel curto)'],
        ['Seringa recomendada', 'Própria para hemogasometria (heparina seca balanceada)', 'Própria para hemogasometria (heparina seca balanceada)'],
        ['Volume de sangue', '~0,4 a 1 mL (menor volume aceito pelo aparelho)', '~0,4 a 0,5 mL'],
        ['Ângulo de inserção', '30° a 60° em relação à superfície da pele', '30° a 45° (face medial da coxa)'],
        ['Uso de sedação', 'Evitar de rotina; realizar em paciente consciente', 'Evitar de rotina; priorizar técnica Cat Friendly'],
        ['Tempo de compressão', '5 minutos contínuos sem interrupção', '5 minutos contínuos sem interrupção'],
        ['Tempo de processamento', 'Imediato (alvo ideal ≤ 5 minutos)', 'Imediato (alvo ideal ≤ 5 minutos)']
      ]
    },

    { type: 'heading', level: 2, text: '3. Antes de Conter o Paciente' },
    {
      type: 'paragraph',
      text: 'Este é um ponto determinante para a validade do procedimento: um exame tecnicamente perfeito torna-se fisiologicamente inútil se o paciente for submetido a estresse desmedido antes da coleta. Todo o material deve ser reunido e aberto antes de aproximar as mãos do animal.'
    },
    {
      type: 'steps',
      title: 'Checklist de Materiais de Bancada',
      items: [
        'Seringa própria para hemogasometria pré-heparinizada com heparina seca (liofilizada balanceada com eletrólitos).',
        'Agulha hipodérmica apropriada (22G para cão grande; 25G para cão pequeno e gato).',
        'Máquina de tricotomia limpa com lâmina 40 (apenas para janela cirúrgica mínima de 2x2 cm).',
        'Antisséptico (álcool 70% ou clorexidina alcoólica).',
        'Gazes secas estéreis para compressão hemostática imediata.',
        'Tampa plástica hermética / stopper vedante para vedação imediata da ponta da seringa.',
        'Bandagem elástica coesiva leve para proteção posterior, se necessário.',
        'Identificação da amostra e analisador point-of-care (ex.: i-STAT, ABL90, Epoc, Edan) pré-aquecido e com cartucho à mão.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Registro Obrigatório da Oxigenoterapia e FiO₂',
      text: 'Antes de realizar a punção, registre na ficha ou no analisador: "Ar ambiente" ou, se estiver sob oxigênio, o tipo de interface (máscara, cateter nasal, incubadora/UTI), o fluxo em L/min, a FiO₂ estimada e a duração prévia da suplementação. Uma PaO₂ de 100 mmHg é excelente em ar ambiente (FiO₂ ≈ 0,21), mas expressa insuficiência respiratória severa em um animal recebendo FiO₂ de 1,0 (100%)! NUNCA retire o oxigênio de um paciente dispneico apenas para obter uma gasometria em ar ambiente.'
    },

    { type: 'heading', level: 2, text: '4. Sedar ou Não Sedar? & Paciente Dispneico' },
    {
      type: 'paragraph',
      text: 'Em princípio: NÃO sedar. O BSAVA Guide to Procedures 2024 recomenda a coleta em paciente consciente e orienta evitar sedativos porque a grande maioria dos fármacos (opioides, agonistas alfa-2, fenotiazínicos e benzodiazepínicos) deprime a ventilação alveolar, reduz a frequência respiratória, eleva a PaCO₂ e reduz a PaO₂, falseando a avaliação da função ventilatória espontânea.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'A Armadilha do Estresse e da Hiperventilação',
      text: 'Uma contenção forçada ou violenta é tão deletéria quanto a sedação: um animal em pânico hiperventila intensamente. A hiperventilação alveolar "lava" o CO₂ do sangue com extrema rapidez: PaCO₂ cai bruscamente → pH sobe → alcalose respiratória artificial. As diretrizes AAFP/ISFM Cat Friendly enfatizam que a manipulação mínima, suave e silenciosa produz resultados clínicos fidedignos e protege o paciente.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Conduta no Paciente Gravemente Dispneico (Ortopneico)',
      text: 'Se o animal apresentar dispneia moderada a grave ou ortopneia (cabeça estendida, cotovelos abduzidos), NÃO o force a permanecer em decúbito lateral. Como destaca Vaden et al., o decúbito lateral comprime a caixa torácica e limita o diafragma, podendo induzir parada cardiorrespiratória iatrogênica. Nesses pacientes, colha com o animal em estação (em pé) ou decúbito esternal, mantendo oxigênio contínuo. Regra clínica: se a contenção agravar a angústia respiratória, INTERROMPA o procedimento imediatamente.'
    },

    { type: 'heading', level: 2, text: '5. CÃO — Coleta pela Artéria Dorsal Pedal (1ª Escolha)' },
    {
      type: 'paragraph',
      text: 'A artéria dorsal pedal (continuação direta da artéria tibial cranial no dorso do pé) é o local mais recomendado no cão (BSAVA 2024). Trata-se de uma artéria periférica, superficial, que repousa diretamente sobre a base óssea tarsometatarsal e distante de grandes veias ou troncos nervosos vulneráveis. Sua maior vantagem é a segurança hemostática: a compressão pós-punção contra os ossos metatársicos controla o sangramento com grande eficácia.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/puncao-dorsal-pedal-cao.svg',
      alt: 'Diagrama esquemático da punção da artéria dorsal pedal em cão',
      caption: 'Figura 1: Anatomia esquemática da face dorsal do tarso e metatarso canino. A artéria dorsal pedal cruza superficialmente logo distal ao jarrete entre o II e III metatarsos. A agulha entra a 30°–60° com bisel para cima sobre o pulso arterial palpável.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/dorsal-pedal-cateter-sasaki.webp',
      alt: 'Posicionamento e fixação de cateter arterial na dorsal pedal canina',
      caption: 'Figura 2: Artéria dorsal pedal em cão. A imagem demonstra a localização superficial do vaso na face dorsal da região tarsometatarsal e o posicionamento de dispositivo arterial. Para hemogasometria diagnóstica isolada, realiza-se punção direta com agulha fina. Adaptado de Sasaki et al. (2019), Frontiers in Veterinary Science, sob licença CC BY.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/anatomia-arteria-dorsal-pedal-cao.jpg',
      alt: 'Prancha anatômica histórica da artéria dorsal do pé em cão',
      caption: 'Figura 3: Prancha anatômica histórica evidenciando o trajeto superficial da artéria dorsal do pé (a. dorsalis pedis) cruzando distalmente a articulação do tarso/jarrete em direção aos espaços intermetatársicos. Adaptado de A Guide to the Dissection of the Dog (1912), Wikimedia Commons (domínio público).'
    },
    { type: 'heading', level: 3, text: 'Anatomia Prática que o Clínico Deve Imaginar' },
    {
      type: 'paragraph',
      text: 'Pense no relevo ósseo: tíbia distal → articulação do tarso (jarrete) → dorso do pé → espaço entre o segundo (II) e o terceiro (III) metatarsos. O vaso passa superficialmente nessa depressão. O clínico não precisa "ver" a artéria com os olhos: precisa fechar a atenção na ponta dos dedos e identificar uma pulsação rítmica e focal.'
    },
    { type: 'heading', level: 3, text: 'Passo a Passo da Punção Dorsal Pedal Canina' },
    {
      type: 'steps',
      title: 'Técnica de Execução Passo a Passo',
      items: [
        'Localize primeiro a pulsação: Com o indicador e o dedo médio, palpe suavemente o dorso da região tarsometatarsal. Não pressione excessivamente; a pressão oblitera o vaso e faz o pulso sumir.',
        'Posicione o paciente em decúbito lateral: O membro a ser puncionado deve ficar apoiado para baixo, rente à mesa, proporcionando estabilidade mecânica. O auxiliar mantém o membro contralateral superior afastado dorsalmente.',
        'Estenda suavemente o membro: Promova leve extensão tarsometatarsal sem tracionar excessivamente o jarrete. Uma leve rotação interna ou externa do pé pode projetar o pulso com maior nitidez.',
        'Tricotomia mínima: Raspe uma pequena janela de pelo (cerca de 2x2 cm) diretamente sobre a área pulsátil.',
        'Antissepsia delicada (sem fricção): O BSAVA recomenda limpar suavemente com compressa de álcool 70% ou clorexidina. ATENÇÃO: Nunca esfregue vigorosamente a pele, pois a fricção mecânica induz vasoespasmo arterial reflexo e desaparecimento do pulso.',
        'Estabilize a artéria: Apoie as pontas de dois dedos da mão não dominante proximal e distalmente ao ponto selecionado, formando uma "mira tátil" longitudinal que delimita o vaso sem ocluí-lo.',
        'Posicione a agulha: Conecte a agulha (22G em cães médios/grandes; 25G em cães pequenos) à seringa de gasometria com o bisel voltado para cima, em ângulo de 30° a 60° com a pele, alinhada com o trajeto vascular.',
        'Inserção firme e deliberada: Atravesse a pele e a túnica adventícia da artéria com um movimento único, direto e controlado (BSAVA 2024).',
        'Aproveite a pressão arterial (autoenchimento): Ao canular o lúmen, surge um flash pulsátil e o sangue arterial preenche espontaneamente a seringa pela própria pressão intravascular sistêmica. Não tracione o êmbolo vigorosamente.',
        'Jamais "pescar" a artéria: Se não houver retorno de sangue, não movimente a agulha lateralmente em alavanca. Movimentos laterais causam laceração da parede vascular, hematomas dolorosos, vasoespasmo imediato e trombose. Recue suavemente a agulha até o plano subcutâneo ou retire-a e repalpe o pulso.',
        'Volume mínimo suficiente: Colete apenas o volume exigido pelo analisador (geralmente entre 0,4 e 1,0 mL).',
        'Retirada e compressão ininterrupta de 5 minutos: Retire a agulha e aplique imediatamente compressão digital firme com gaze estéril por 5 minutos contínuos no relógio. Não fique levantando a gaze para "espiar".'
      ]
    },

    { type: 'heading', level: 2, text: '6. CÃO — Quando Usar a Artéria Femoral?' },
    {
      type: 'paragraph',
      text: 'A artéria femoral pode ser uma alternativa no cão quando a dorsal pedal estiver inacessível. Contudo, exige maior rigor técnico pela proximidade anatômica com a veia femoral.'
    },
    {
      type: 'steps',
      title: 'Indicações de Uso Femoral no Cão',
      items: [
        'Cães de raças miniatura ou porte toy, nos quais a artéria dorsal pedal tem calibre diminuto.',
        'Pacientes hipotérmicos com vasoconstrição periférica severa, nos quais os pulsos distais estão filiformes.',
        'Lesões ortopédicas, fraturas, bandagens ou celulite na porção distal do membro pélvico.',
        'Hipotensão profunda com pressão de pulso metatársica indetectável à palpação.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Risco de Contaminação Venosa na Artéria Femoral',
      text: 'A artéria femoral localiza-se na face medial da coxa, mas corre contígua e ligeiramente cranial à veia femoral. Se a punção desviar caudalmente ou se a agulha transfixar a artéria e penetrar a veia, o resultado será uma amostra venosa ou mista (Nelson & Couto). Amostras mistas exibem PO₂ falsamente baixa e PCO₂ falsamente alta, induzindo erros diagnósticos graves.'
    },
    {
      type: 'steps',
      title: 'Técnica da Punção Femoral Canina',
      items: [
        'Posicione o cão em decúbito lateral e abduza o membro pélvico superior para expor a face medial da coxa apoiada.',
        'Palpe o pulso femoral imediatamente ventral ao canal inguinal e proximal ao joelho.',
        'Estabilize a artéria com os dedos e insira a agulha (22G ou 25G) a 30°–45° com o bisel voltado para cima, apontando ligeiramente no sentido cranial para se afastar da veia.',
        'Após o flash e coleta de 0,4–1,0 mL, retire e comprima por 5 minutos contínuos.'
      ]
    },

    { type: 'heading', level: 2, text: '7. GATO — Coleta Arterial & Manejo Cat Friendly' },
    {
      type: 'paragraph',
      text: 'No paciente felino, o manejo clínico e a contenção exigem cuidado redobrado. Em gatos e cães muito pequenos, a ARTÉRIA FEMORAL é a PRIMEIRA ESCOLHA prática recomendada na literatura (Johnson 2020; BSAVA 2024), pois a artéria dorsal pedal no gato é extremamente delgada e sofre vasoespasmo com grande facilidade.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Diretrizes Cat Friendly (AAFP/ISFM 2022)',
      text: 'O gato nunca deve ser esticado em postura forçada de "prancha". A contenção com força excessiva amplifica o medo, deflagra luta motora intensa, eleva brutalmente o consumo miocárdico de oxigênio e induz hiperventilação descompensatória. Adote manipulação gentil com toalhas macias, minimize ruídos e iluminação, apoie o animal sobre superfícies acolchoadas e adapte a postura ao conforto do felino.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/localizacao-anatomica-arteria-femoral-gatos-vetius.jpg',
      alt: 'Localização anatômica da artéria femoral em gatos - Face medial da coxa e triângulo femoral (Vetius)',
      caption: 'Figura 4: Localização anatômica da artéria femoral em gatos na face medial da coxa com o membro pélvico elevado para expor o triângulo femoral. Observe a disposição craniocaudal do feixe neurovascular: Nervo femoral / ramo safeno (cranial, amarelo), Artéria femoral (intermediária, vermelho) e Veia femoral (caudal, azul) — regra N-A-V. O esquema e a secção transversal detalham os limites musculares (M. sartório cranial, M. pectíneo/adutor caudal). Fonte: Criação própria do Vetius (adaptado de Dyce et al. e Miller’s Anatomy of the Dog and Cat).'
    },
    { type: 'heading', level: 3, text: 'GATO — Passo a Passo da Punção Femoral' },
    {
      type: 'steps',
      title: 'Protocolo de Punção Femoral Felina',
      items: [
        'Tenha todo o material pronto antes de posicionar o felino: seringa com heparina seca, agulha 25G conectada, gaze com antisséptico e analisador pronto para leitura.',
        'Posicione o gato em decúbito lateral relaxado: permita que o animal descanse o corpo e a cabeça sobre uma toalha macia. Abduza suavemente a pata superior para expor a face medial da coxa inferior sem hiperextender a articulação do joelho.',
        'Localize a pulsação femoral: Encoste as polpas digitais na porção proximal medial da coxa, logo abaixo da virilha. No gato, a artéria femoral pulsa vigorosamente e é palpada com facilidade na maioria dos pacientes.',
        'Utilize obrigatoriamente agulha 25G: Calibres maiores aumentam o desconforto, provocam espasmo arterial imediato e laceram a parede vascular delicada.',
        'Estabilize a artéria com suavidade: Utilize dois dedos da mão não dominante para delimitar a linha de pulso, sem empurrar o vaso contra o fêmur.',
        'Insira a agulha a 30°–45° com bisel para cima: Realize um movimento delicado e contínuo no plano longitudinal do vaso.',
        'Deixe a seringa preencher passivamente: Observe o flash pulsátil e o preenchimento espontâneo de 0,4 a 0,5 mL de sangue. Evite puxar o êmbolo para não colabar o vaso ou aspirar ar.',
        'Retire a agulha e comprima por 5 minutos cronometrados: Não encurte esse período. A musculatura medial da coxa é frouxa e hematomas podem se formar rapidamente se a hemostasia não for rigorosa.',
        'Verifique a perfusão do membro: Ao término dos 5 minutos, inspecione a coxa, palpe o pulso distal e confirme ausência de sangramento ativo ou hematoma progressivo.'
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'E a artéria dorsal pedal no gato?',
      text: 'A punção da artéria dorsal pedal no gato é anatomicamente viável e pode ser utilizada em situações específicas (por exemplo, quando a região femoral bilateral apresenta hematomas, feridas ou em gatos sob anestesia geral estável). Contudo, na rotina clínica ambulatorial, a femoral costuma ter taxa de sucesso amplamente superior.'
    },

    { type: 'heading', level: 2, text: '8. Como Confirmar se a Amostra é Realmente Arterial?' },
    {
      type: 'paragraph',
      text: 'Nenhum sinal visual isolado é infalível, mas o conjunto de pistas hemodinâmicas garante segurança ao clínico antes do envio da amostra para leitura.'
    },
    {
      type: 'table',
      caption: 'Critérios de validação de sangue arterial vs. armadilhas frequentes',
      headers: ['Critério Avaliado', 'Comportamento Arterial Confiável', 'Armadilha Clínica & Alerta'],
      rows: [
        [
          'Preenchimento da seringa',
          'Enchimento rápido e espontâneo sem necessidade de aspirar o êmbolo.',
          'Melhor indicador prático de pressão intravascular arterial.'
        ],
        [
          'Flash na ponta da agulha',
          'Aparecimento súbito e pulsátil de sangue na junção canhão-agulha.',
          'Indica posicionamento da ponta da agulha no centro do lúmen arterial.'
        ],
        [
          'Pulso tátil no êmbolo',
          'Sensação de leve pressão empurrando o êmbolo para trás na mão do operador.',
          'Mais nítido em seringas de baixo atrito próprias para hemogasometria.'
        ],
        [
          'Cor do sangue ("vermelho vivo")',
          'NÃO É UM SINAL CONFIÁVEL PARA JULGAMENTO.',
          'Paciente com hipoxemia severa terá sangue arterial escuro! E sangue venoso de paciente sob FiO₂ 100% pode parecer vermelho vivo.'
        ],
        [
          'Paciente chocado ou hipotenso',
          'Pressão arterial de pulso diminuída (PAM < 60 mmHg).',
          'A seringa pode não preencher espontaneamente em pacientes em choque (Johnson). Requer tração sutil e delicada do êmbolo.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '9. Manejo Crítico da Amostra (Os Primeiros 30 Segundos)' },
    {
      type: 'paragraph',
      text: 'Você pode realizar uma punção perfeita e destruir completamente a precisão diagnóstica nos 30 segundos subsequentes. O sangue arterial é uma amostra biologicamente ativa e extremamente sensível à troca com o ar ambiente e ao metabolismo celular contínuo.'
    },
    {
      type: 'steps',
      title: 'Sequência de Conduta Imediata Pós-Coleta',
      items: [
        '1. Imediatamente após desengatar a seringa da agulha ou do sítio, mantenha-a estritamente vertical com a ponta voltada para cima.',
        '2. Dê leves toques com o dedo indicador no corpo cilíndrico da seringa para que microbolhas presas subam em direção ao bico.',
        '3. Avance o êmbolo suavemente com a ponta protegida por gaze e expulse TODO o ar e bolhas visíveis imediatamente.',
        '4. Vede o bico da seringa com a tampa plástica hermética / borracha vedante própria (evitando qualquer troca gasosa).',
        '5. Homogeneíze a amostra suavemente: role a seringa entre as palmas das mãos por 10 a 15 segundos e inverta o eixo 5 vezes para dissolver a heparina sem produzir hemólise mecânica.',
        '6. Processe no analisador de hemogasometria imediatamente (alvo ideal: ≤ 5 minutos, BSAVA 2024).'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Por que as bolhas de ar destroem o exame?',
      text: 'O ar atmosférico possui uma PO₂ de ~150 mmHg e PCO₂ de ~0,3 mmHg. Uma bolha de ar dentro da seringa entra em rápido equilíbrio difusional com o sangue: o CO₂ do sangue migra para a bolha (fazendo a PaCO₂ cair artificialmente) e o oxigênio da bolha entra no sangue (elevando artificialmente a PaO₂ em direção a 150 mmHg). Isso faz com que um paciente em hipoxemia severa (ex.: PaO₂ real de 48 mmHg) aparente ter uma oxigenação falsa de 85 ou 95 mmHg no laudo!'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Cuidado com Heparina Líquida Manual',
      text: 'A seringa ideal possui heparina seca de lítio liofilizada e balanceada com eletrólitos. Se for preparar uma seringa manualmente: aspire uma pequena gota de heparina líquida (5.000 UI/mL), molhe toda a parede da seringa e EXPULSE PRATICAMENTE TODA a heparina de volta no frasco ou gaze. O volume retido no canhão da agulha (espaço morto) já é suficiente para anticoagular 1 mL de sangue. Excesso de heparina líquida dilui a amostra, reduz a PaCO₂ e distorce medições de cálcio iônico e potássio.'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Colocar ou Não no Gelo?',
      text: 'Textos clássicos recomendavam estocar em água com gelo para desacelerar o metabolismo celular (eritrócitos consomem O₂ e produzem CO₂). No entanto, com os analisadores point-of-care modernos (ex.: i-STAT, Epoc, ABL), a melhor prática clínica é o processamento imediato em até 5 minutos à temperatura ambiente. O banho de gelo só deve ser utilizado se houver atraso inevitável de transporte para laboratório externo, lembrando que seringas plásticas resfriadas sofrem aumento gradual de permeabilidade gasosa.'
    },

    { type: 'heading', level: 2, text: '10. Tabela Mestra de Erros Pré-Analíticos' },
    {
      type: 'table',
      caption: 'Principais erros pré-analíticos em hemogasometria arterial, impactos nos parâmetros e mecanismos',
      headers: ['Erro Pré-Analítico', 'Impacto nos Resultados', 'Mecanismo Fisiopatológico'],
      rows: [
        [
          'Bolha de ar retida na seringa',
          'PaCO₂ ↓ falsamente; PaO₂ desviada em direção a ~150 mmHg',
          'Equilíbrio difusional contínuo dos gases sanguíneos com o ar atmosférico da bolha.'
        ],
        [
          'Heparina líquida em excesso',
          'PaCO₂ ↓ por diluição; alteração nos eletrólitos (K⁺, Ca²⁺) e hematócrito',
          'Efeito diluente do líquido e acidez química da heparina líquida não balanceada.'
        ],
        [
          'Punção venosa acidental',
          'PaO₂ muito baixa (~30–50 mmHg); PaCO₂ mais elevada (~45–55 mmHg); pH menor',
          'Amostra reflete sangue venoso periférico após extração tecidual de O₂ e adição de CO₂.'
        ],
        [
          'Amostra mista (artéria + veia)',
          'Valores intermediários discordantes da condição respiratória do paciente',
          'Laceramento simultâneo de vaso arterial e venoso contíguos (comum no triângulo femoral).'
        ],
        [
          'Demora em temperatura ambiente (>10–15 min)',
          'PaO₂ ↓ contínua; PaCO₂ ↑ progressiva; pH ↓ (tendência à acidose)',
          'Metabolismo anaeróbico celular ativo de leucócitos e eritrócitos consumindo O₂ e gerando CO₂ e lactato.'
        ],
        [
          'Animal em hiperventilação por estresse',
          'PaCO₂ acentuadamente baixa; pH ↑ (alcalose respiratória artificial)',
          'Aumento desproporcional da ventilação alveolar por medo/pânico lavando CO₂ volátil.'
        ],
        [
          'Formação de microcoágulo na seringa',
          'Erro de calibração, obstrução de sensores e inutilização do cartucho',
          'Heparinização insuficiente ou falha na homogeneização por rolamento da seringa.'
        ],
        [
          'FiO₂ não registrada no momento',
          'Impossibilidade de interpretar a adequação da PaO₂ e calcular a relação PaO₂/FiO₂',
          'A interpretação da função pulmonar depende de saber quanto O₂ o animal estava respirando.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '11. Complicações e Contraindicações' },
    {
      type: 'paragraph',
      text: 'A punção arterial é um procedimento seguro quando executado com agulha fina e técnica rigorosa. Contudo, devido à alta pressão intraluminal, não deve ser tratada com a mesma ligeireza de uma venopunção periférica.'
    },
    {
      type: 'steps',
      title: 'Complicações Potenciais',
      items: [
        'Formação de hematoma e equimose no sítio de punção (principal complicação, prevenida por compressão de 5 minutos).',
        'Sangramento prolongado em pacientes com trombocitopenia ou distúrbios da hemostasia.',
        'Vasoespasmo arterial transitório (especialmente após fricção cutânea vigorosa ou tentativas repetidas).',
        'Trombose arterial focal com comprometimento transitório ou permanente da perfusão do membro (rara em punções únicas; mais comum em cateteres arteriais de longa permanência).',
        'Laceramento e trauma vascular decorrentes de movimentos laterais da agulha ("pesca de vaso").',
        'Infecção cutânea local ou bacteremia iatrogênica por falha de assepsia.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Contraindicações Clínicas à Punção Arterial',
      text: 'O BSAVA 2024 contraindica a punção arterial nos seguintes cenários: 1) Coagulopatias graves ou trombocitopenia severa ativa (risco de hemorragia incontrolável e hematoma compressivo); 2) Dermatite bacteriana, piodermite ou infecção tecidual no sítio de punção; 3) Pele desvitalizada, queimada ou com contusão profunda adjacente; 4) Regiões com alto risco de contaminação por fezes ou urina (especialmente na região femoral de pacientes incontinentes ou com diarreia profusa). Repense a punção periférica se o vaso já tiver sofrido múltiplas tentativas frustradas recentes.'
    },

    { type: 'heading', level: 2, text: '12. Cuidados e Monitoramento Pós-Procedimento' },
    {
      type: 'steps',
      title: 'Sequência de Cuidados Pós-Punção',
      items: [
        'Mantenha compressão digital contínua e firme por no mínimo 5 minutos inteiros no relógio.',
        'Ao soltar os dedos, inspecione a pele minuciosamente procurando sinais de sangramento contínuo ou aumento de volume tecidual (hematoma em expansão).',
        'Palpe novamente a pulsação arterial distal quando possível.',
        'Avalie a perfusão do membro pélvico: cor dos coxins e unhas, temperatura cutânea e tempo de preenchimento capilar (TPC).',
        'Aplique bandagem elástica leve se houver pequeno gotejamento residual.',
        'ATENÇÃO: Nunca aperte a bandagem a ponto de agir como torniquete venoso ou arterial. Remova ou afrouxe a bandagem dentro de 30 a 60 minutos se a hemostasia estiver completa.'
      ]
    },

    { type: 'heading', level: 2, text: '13. Valores de Referência & Regras de Interpretação' },
    {
      type: 'table',
      caption: 'Valores de referência arteriais em ar ambiente (cães e gatos — BSAVA Guide to Procedures 2024)',
      headers: ['Parâmetro', 'Cão (Ar Ambiente)', 'Gato (Ar Ambiente)', 'Significado Fisiológico'],
      rows: [
        ['pH', '7,35 a 7,46', '7,31 a 7,46', 'Status do equilíbrio hidrogeniônico sistêmico'],
        ['PaCO₂', '30,8 a 42,8 mmHg', '25,2 a 36,8 mmHg', 'Eficiência da ventilação alveolar (gatos são fisiologicamente mais hipocápnicos)'],
        ['PaO₂', '80,9 a 103,3 mmHg', '95,4 a 118,2 mmHg', 'Oxigenação arterial pulmonar'],
        ['HCO₃⁻', '18,8 a 25,6 mmol/L', '14,4 a 21,6 mmol/L', 'Componente metabólico renal/tampão'],
        ['Base Excess (BE)', '0 ± 4 mmol/L', '0 ± 4 mmol/L', 'Excesso ou déficit de bases tampão']
      ]
    },
    { type: 'heading', level: 3, text: 'Regras Práticas de Bolso para Oxigenação' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Limiares de Hipoxemia em Ar Ambiente',
      text: '• PaO₂ < 80 mmHg: Suspeite de hipoxemia (troca gasosa comprometida ou hipoventilação alveolar).\n• PaO₂ < 60 mmHg: Hipoxemia grave / crítica com risco iminente de colapso orgânico e hipóxia celular tecidual (corresponde a SpO₂ de ~90% na curva de dissociação da hemoglobina).'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'A Regra dos 5× para Pacientes sob Oxigenoterapia',
      text: 'Quando o paciente recebe oxigênio enriquecido, a PaO₂ esperada pode ser rapidamente estimada à beira do leito pela fórmula prática:\n\nPaO₂ esperada ≈ 5 × FiO₂ (expressa em porcentagem)\n\n• FiO₂ 100% (oxigênio puro via tubo/máscara selada) → PaO₂ esperada ≈ 500 mmHg.\n• FiO₂ 40% (cateter nasal / máscara frouxa) → PaO₂ esperada ≈ 200 mmHg.\n• FiO₂ 21% (ar ambiente) → PaO₂ esperada ≈ 100 mmHg.\n\nSe um cão recebe oxigênio a 100% e sua PaO₂ na gasometria for de 85 mmHg, o valor absoluto parece "normal" para ar ambiente, mas o paciente está em FALÊNCIA DE OXIGENAÇÃO GRAVÍSSIMA!'
    },

    { type: 'heading', level: 2, text: '14. Cateter Arterial: Quando Indicar?' },
    {
      type: 'paragraph',
      text: 'Para uma amostra pontual, a punção percutânea simples com agulha fina é a conduta mais prática e segura. Contudo, em situações de terapia intensiva e suporte ventilatório avançado, a colocação de um cateter arterial de permanência é altamente indicada.'
    },
    {
      type: 'steps',
      title: 'Indicações de Cateterização Arterial de Permanência',
      items: [
        'Necessidade de coletas gasométricas seriadas e frequentes (ex.: monitoramento de desmame, titulação de ventilador mecânico), evitando trauma vascular repetido.',
        'Pacientes internados em ventilação mecânica invasiva sob anestesia geral.',
        'Monitorização contínua da Pressão Arterial Invasiva (PAI), padrão-ouro para titulação de vasopressores (noradrenalina, dopamina) e inotrópicos em choque séptico e hipovolêmico.',
        'Cirurgias torácicas, laparotomias de alto risco ou procedimentos neurocirúrgicos complexos.'
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Evidência Prática na Artéria Dorsal Pedal',
      text: 'A artéria dorsal pedal é o sítio clássico de escolha para canulação arterial com cateter 22G ou 24G em pequenos animais. Um ensaio clínico em 120 cães anestesiados demonstrou a alta taxa de sucesso, estabilidade e segurança desse acesso periférico para coleta seriada de sangue e monitorização invasiva contínua (Sasaki et al., 2019, Front Vet Sci).'
    },

    { type: 'heading', level: 2, text: '15. Fluxograma de Decisão na Coleta Arterial' },
    {
      type: 'flowchart',
      title: 'Fluxo Clínico da Indicação à Análise Imediata',
      nodes: [
        { id: 'ind', label: 'Indicação clínica (PaO₂ / PaCO₂ / P/F)', variant: 'start' },
        { id: 'disp', label: 'Paciente calmo ou gravemente dispneico?', variant: 'decision' },
        { id: 'ox', label: 'Oxigenar, posição ortopneica, sem forçar decúbito', variant: 'action' },
        { id: 'prep', label: 'Montar todo o material e registrar FiO₂', variant: 'action' },
        { id: 'sp', label: 'Cão (dorsal pedal 22-25G) | Gato (femoral 25G)', variant: 'action' },
        { id: 'punc', label: 'Punção 30°-60°, bisel p/ cima, autoenchimento', variant: 'action' },
        { id: 'sample', label: 'Tirar bolhas em 30s, vedar seringa e homogeneizar', variant: 'action' },
        { id: 'hemo', label: '5 min de compressão digital contínua', variant: 'action' },
        { id: 'read', label: 'Analisar em ≤ 5 min com FiO₂ documentada', variant: 'end' }
      ],
      edges: [
        { from: 'ind', to: 'disp' },
        { from: 'disp', to: 'ox', label: 'Dispneico/Agitado' },
        { from: 'disp', to: 'prep', label: 'Calmo/Estável' },
        { from: 'ox', to: 'prep' },
        { from: 'prep', to: 'sp' },
        { from: 'sp', to: 'punc' },
        { from: 'punc', to: 'sample' },
        { from: 'sample', to: 'hemo' },
        { from: 'hemo', to: 'read' }
      ]
    },

    { type: 'heading', level: 2, text: '16. Box de Bolso — Não Esquecer 🩸' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'COLETA ARTERIAL — REGRAS DE OURO DO PLANTÃO',
      text: '1. ANTES DE CONTER: Prepare todo o material na bancada → registre a FiO₂ e o fluxo de O₂ → evite sedativos de rotina → minimize o estresse de contenção.\n\n2. CÃO: Primeira escolha na artéria dorsal pedal (distal ao jarrete, entre metatarsos II e III) com agulha 22G ou 25G.\n\n3. GATO: Primeira escolha na artéria femoral (face medial proximal da coxa) com agulha 25G e protocolo Cat Friendly.\n\n4. PUNÇÃO: Bisel voltado para cima → ângulo de 30° a 60° → espere o preenchimento espontâneo pela pressão arterial → JAMAIS faça movimentos laterais de "pescar" a artéria.\n\n5. MANEJO DA AMOSTRA: Remova todas as bolhas de ar nos primeiros 30 segundos → feche hermeticamente com tampa vedante → role suavemente entre as mãos → processe em analisador point-of-care em até 5 minutos.\n\n6. PÓS-PUNÇÃO: Mantenha 5 minutos de compressão digital direta ininterrupta no relógio.\n\n7. ATENÇÃO: NUNCA confie apenas na cor do sangue (hipoxemia severa gera sangue escuro). Registre SEMPRE a FiO₂ fornecida ao paciente.'
    },

    { type: 'heading', level: 2, text: '17. Referências Técnicas' },
    {
      type: 'paragraph',
      text: 'O conteúdo deste guia foi estruturado com base nas principais fontes de medicina de emergência, procedimentos e terapia intensiva veterinária:'
    },
    {
      type: 'steps',
      items: [
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Seção: Blood sampling – (a) arterial, pp. 74–76 (Referência central de padronização do procedimento).',
        'Johnson LR. Canine and Feline Respiratory Medicine. 2nd ed. Wiley-Blackwell; 2020. Chapter 2 – Respiratory Diagnostics: Blood Gas Analysis, pp. 18–20.',
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. British Small Animal Veterinary Association; 2018. Chapter 7 – General approach to respiratory distress: Blood gas artifacts and sample handling, p. 115.',
        'Sasaki K, Shiga T, Gómez de Segura IÁ. Advantages of a Novel Device for Arterial Catheter Securement in Anesthetized Dogs. Front Vet Sci. 2019;6:171. (Artigo Open Access sob licença CC BY).',
        'Rodan I, Dowgray N, Carney HC, et al. 2022 AAFP/ISFM Cat Friendly Veterinary Interaction Guidelines: Approach and Handling Techniques. J Feline Med Surg. 2022;24(11):1093–1132.'
      ]
    }
  ],
  isPublished: true
};

const guiaMedulaOssea: ClinicalQuickGuide = {
  id: 'cqg-medula-ossea-006',
  slug: 'puncao-biopsia-medula-ossea-caes-gatos',
  title: 'Punção e biópsia de medula óssea em cães e gatos',
  subtitle: 'Procedimentos Clínicos — Aspirado (AMO), biópsia core (BMO), anatomia umeral, ilíaca e femoral, preparo de espículas e interpretação',
  summary: 'Guia definitivo para o clínico veterinário: quando indicar a avaliação medular (pancitopenia, citopenias inexplicadas, células atípicas), diferença entre aspirado e core, escolha do sítio por espécie e porte, anestesia/analgesia perióstea obrigatória, técnica de penetração cortical com estilete, manejo imediato das espículas (coagulação em 10-20s), técnica de squash e conduta diagnóstica no dry tap.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'medula ossea',
    'puncao de medula',
    'aspirado de medula',
    'biopsia de medula',
    'amo',
    'bmo',
    'espiculas',
    'dry tap',
    'crista iliaca',
    'umero proximal',
    'fossa trocanterica',
    'mielograma',
    'mielofibrose',
    'pancitopenia',
    'anemia nao regenerativa',
    'relacao mieloide eritroide',
    'klima',
    'rosenthal',
    'illinois',
    'jamshidi',
    'bsava',
    'vetius'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/puncao-biopsia-medula-ossea-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de punção e biópsia de medula óssea em cães e gatos: materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'Aspirado (AMO) avalia morfologia e maturação celular individual; Biópsia core (BMO) avalia arquitetura óssea, celularidade global e fibrose.',
    'Indicações primárias: pancitopenia, anemia não regenerativa persistente, citopenias inexplicadas, células atípicas em circulação, febre de origem obscura e estadiamento oncológico.',
    'Primeira escolha anatômica: crista ilíaca em cães médios e grandes; úmero proximal em gatos e cães pequenos (área craniolateral achatada); fossa trocantérica como alternativa.',
    'Analgesia obrigatória: o periósteo é densamente inervado; infiltrar anestésico local até o periósteo em todos os pacientes (sedação não substitui analgesia!). Preferir anestesia geral em gatos.',
    'Técnica mecânica: estilete travado → pressão axial firme + rotações curtas alternadas (D ⇄ E) → sensação de perda de resistência ("give") ao entrar no espaço medular.',
    'Volume de aspiração: aspirar < 0,5 mL (sucção curta com seringa de 20 mL); relaxar o êmbolo assim que o sangue surgir para evitar hemodiluição.',
    'Tempo crítico de bancada: a medula coagula em 10 a 20 segundos; lâminas limpas devem estar montadas na mesa antes de iniciar a punção. Procurar ESPÍCULAS e confeccionar esfregaço por deslizamento suave (squash).',
    'Dry tap (aspirado seco): recolocar o estilete e avançar ~1 cm; se persistir em 2 sítios diferentes com citopenia grave, suspeitar de mielofibrose e realizar biópsia core.'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. O que Estamos Coletando? (AMO vs. BMO)' },
    {
      type: 'paragraph',
      text: 'A expressão genérica "punção de medula" pode envolver duas modalidades de amostragem completamente distintas, com indicações, vantagens e limitações próprias: o Aspirado de Medula Óssea (AMO) e a Biópsia Core de Medula Óssea (BMO).'
    },
    {
      type: 'table',
      caption: 'Diferenças fundamentais entre Aspirado Citológico (AMO) e Biópsia Histopatológica (BMO)',
      headers: ['Amostra', 'O que entrega', 'Principal Vantagem', 'Principal Limitação'],
      rows: [
        [
          'Aspirado de medula óssea (AMO)',
          'Citologia / mielograma',
          'Excelente detalhe da morfologia celular individual e avaliação precisa da maturação das linhagens hematopoéticas.',
          'Avalia mal a arquitetura tridimensional, a presença de mielofibrose e a celularidade global verdadeira da medula.'
        ],
        [
          'Biópsia core de medula óssea (BMO)',
          'Fragmento histopatológico intacto (osso + medula)',
          'Avaliação fidedigna da arquitetura, proporção entre células e tecido adiposo, e diagnóstico definitivo de mielofibrose ou infiltrados focais.',
          'Menor resolução morfológica de células individuais; requer descalcificação óssea laboratorial e processamento histotécnico mais lento.'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'A Analogia da "Cidade Medular"',
      text: 'Imagine a medula óssea como uma grande metrópole. O aspirado aborda alguns pedestres na calçada e pergunta: "Quem são vocês? Em que estágio de desenvolvimento estão? Vocês parecem saudáveis?". Já a biópsia core fotografa o quarteirão inteiro com suas edificações e pergunta: "Quanto deste bairro é ocupado por moradores? Quanto virou terreno baldio com entulho (gordura)? As vias estruturais estão íntegras ou foram tomadas por cicatrizes de colágeno (fibrose) ou invadidas por estruturas neoplásicas?". O aspirado diz quem está presente; o core diz como o ambiente está estruturado.'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Complementaridade Diagnóstica (BSAVA 2024)',
      text: 'O BSAVA e o Textbook of Small Animal Emergency Medicine recomendam considerar AMO e BMO como exames complementares. A biópsia core é especialmente indispensável quando o aspirado resulta em amostra hipocelular, permitindo diferenciar se a escassez de células decorre de aplasia/hipoplasia real ou de falha técnica na sucção.'
    },

    { type: 'heading', level: 2, text: '2. Fisiologia & Por que não podemos furar qualquer parte de qualquer osso?' },
    {
      type: 'paragraph',
      text: 'A medula óssea é um tecido ricamente vascularizado organizado entre trabéculas de osso esponjoso e uma rede contínua de sinusoides capilares. Nos espaços intertrabeculares reside a linhagem hematopoética ativa: a célula-tronco pluripotente que se diferencia em precursores eritroides, granulocíticos/monocíticos e megacariocíticos, amadurecendo gradualmente até ser liberada para o sangue periférico.'
    },
    {
      type: 'paragraph',
      text: 'Em pacientes neonatos e jovens, praticamente todo o esqueleto participa ativamente da hematopoese. Com o avançar da idade e a maturidade óssea, a medula vermelha hematopoética presente nas diáfises tubulares dos ossos longos sofre involução fisiológica, sendo progressivamente substituída por tecido adiposo inativo (medula amarela).'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Atenção Crítica ao Ponto de Punção no Adulto (Vaden et al.)',
      text: 'No cão e gato adultos, a hematopoese ativa concentra-se nas extremidades proximais de ossos longos (epífises e metáfises proximais de úmero e fêmur) e em ossos predominantemente planos (asa do ílio e esterno). Furar o centro diafisário de um osso longo de um animal adulto aspira quase que exclusivamente gordura amarela e sangue venoso! A escolha precisa do acidente anatômico define o sucesso do mielograma.'
    },

    { type: 'heading', level: 2, text: '3. Quando Pedir Medula Óssea? (Indicações Clínicas)' },
    {
      type: 'paragraph',
      text: 'A pergunta diagnóstica correta antes de indicar o procedimento não é simplesmente "Esse hemograma está alterado?", mas sim: "A alteração observada no sangue periférico pode ter origem na produção ou maturação medular, e a resposta mudará minha conduta terapêutica?".'
    },
    {
      type: 'steps',
      title: 'Principais Indicações Clínicas (BSAVA 2024; eClinPath Cornell)',
      items: [
        'Pancitopenia inexplicada: queda simultânea de hemácias, leucócitos e plaquetas — o exemplo clássico de falência multilinhagem (suspeita de aplasia, mielodisplasia, mielofibrose, mieloftise, infecção crônica ou toxicidade).',
        'Anemia não regenerativa persistente: após exclusão consistente de causas extramedulares como doença renal crônica (deficiência de eritropoetina), anemia de doença inflamatória crônica severa, endocrinopatias (hipotireoidismo, hipoadrenocorticismo) ou carências nutricionais.',
        'Trombocitopenia inexplicada: refratária à terapia convencional ou associada a outras alterações hematológicas.',
        'Neutropenia grave isolada: inexplicada ou persistente, sem evidência de consumo infeccioso agudo maciço periférico (ex.: sepse ou peritonite).',
        'Leucocitose acentuada ou bizarra: presença de blastos, precursores atípicos ou células indiferenciadas em circulação (suspeita de leucemia aguda ou crônica).',
        'Febre de Origem Indeterminada (FOI): investigação de doenças infecciosas intracelulares sistêmicas (leishmaniose visceral, histoplasmose, toxoplasmose, micobacterioses).',
        'Hiperglobulinemia monoclonal inexplicada (gamopatia monoclonal): suspeita de mieloma múltiplo (infiltração medular de plasmócitos neoplásicos) ou linfoma.',
        'Hipercalcemia de malignidade sem causa primária aparente.',
        'Estadiamento clínico de neoplasias linforreticulares e mastocitomas sistêmicos.',
        'Avaliação dos estoques teciduais de ferro através de colorações especiais (reação de Perls / azul da Prússia).'
      ]
    },

    { type: 'heading', level: 2, text: '4. Quando a Medula NÃO é Obrigatória em Citopenias' },
    {
      type: 'paragraph',
      text: 'O clínico geral deve distinguir situações de citopenia periférica primária em que a medula óssea não precisa ser o primeiro exame a ser executado.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Trombocitopenia Imunomediada (PTI) Típica no Cão',
      text: 'Se um cão apresenta trombocitopenia isolada grave (ex.: 8.000 plaquetas/µL), mas mantém série vermelha e leucócitos normais e quadro clínico clássico de destruição periférica, a investigação inicial deve focar em causas secundárias (hemoparasitoses, fármacos) e início de terapia imunossupressora. Nelson & Couto recomendam a medula principalmente se houver ausência de resposta terapêutica, surgimento de outras citopenias ou suspeita de mieloftise. Mas se o paciente tiver trombocitopenia + anemia não regenerativa + neutropenia, a avaliação medular passa a ser mandatória!'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Atenção Especial no Gato: Pseudotrombocitopenia!',
      text: 'Antes de cogitar qualquer punção medular em um felino com trombocitopenia laboratorial, CONFIRME o esfregaço! Gatos agregam plaquetas com facilidade extrema no tubo de EDTA. A pseudotrombocitopenia por agregados plaquetários na cauda da lâmina é uma das armadilhas pré-analíticas mais frequentes na clínica felina. Além disso, a investigação de retrovírus (FeLV/FIV) deve sempre preceder o procedimento invasivo (Nelson & Couto).'
    },

    { type: 'heading', level: 2, text: '5. Trombocitopenia Grave Contraindica a Punção?' },
    {
      type: 'paragraph',
      text: 'Não necessariamente! Uma contagem de plaquetas severamente reduzida, isoladamente, NÃO equivale a uma coagulopatia grave (Nelson & Couto; BSAVA 2024).'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Trombocitopenia vs. Coagulopatia Sistêmica',
      text: 'Em pacientes com trombocitopenia isolada grave, tanto o aspirado quanto a biópsia core podem ser realizados com segurança porque o orifício cortical é milimétrico e o sangramento do trajeto ósseo costuma ser facilmente controlado por compressão mecânica digital direta e contínua. Por outro lado, coagulopatias sistêmicas graves (deficiência profunda de fatores de coagulação, intoxicação por rodenticidas dicumarínicos ou CIVD descompensada) constituem contraindicações de alto risco que exigem correção prévia com plasma ou hemostáticos.'
    },

    { type: 'heading', level: 2, text: '6. Contraindicações e Cuidados Locais' },
    {
      type: 'steps',
      title: 'Situações para Mudar de Local ou Evitar a Punção',
      items: [
        'Coagulopatia clinicamente relevante e não controlada.',
        'Fratura, fissura óssea ou osteomielite prévia no osso selecionado.',
        'Infecção cutânea local, piodermite profunda ou abscesso sobrejacente: NUNCA atravesse abscesso ou pele infectada para atingir o osso, sob risco de inocular bactérias diretamente na cavidade medular e provocar osteomielite iatrogênica grave.',
        'Tecidos necróticos, queimaduras graves ou áreas com risco iminente de contaminação fecal/urinária.'
      ]
    },

    { type: 'heading', level: 2, text: '7. Escolha do Local Anatômico 🦴' },
    {
      type: 'paragraph',
      text: 'A escolha do sítio ideal baseia-se na espécie, conformação corporal, escore de condição corporal e preferência técnica do operador (BSAVA 2024).'
    },
    {
      type: 'table',
      caption: 'Hierarquia recomendada para seleção do sítio de punção medular',
      headers: ['Paciente', '1ª Escolha Prática', '2ª Escolha (Alternativa)', 'Particularidades Técnicas'],
      rows: [
        [
          'Cão médio ou grande magro',
          'Crista ilíaca',
          'Úmero proximal',
          'Asa ilíaca larga, facilmente palpável em decúbito esternal, longe de feixes vasculonervosos nobres.'
        ],
        [
          'Cão pequeno ou musculoso/obeso',
          'Úmero proximal',
          'Fossa trocantérica do fêmur',
          'A crista ilíaca em animais obesos pode ser difícil de estabilizar; o úmero craniolateral possui pouca cobertura de tecidos moles.'
        ],
        [
          'Gato 🐱 (todas as conformações)',
          'Úmero proximal',
          'Fossa trocantérica do fêmur',
          'Sítio padrão-ouro felino (Byers 2017; BSAVA 2024); oferece excelente rendimento para aspirado e biópsia core.'
        ],
        [
          'Operador experiente / UTI',
          'Esterno',
          'Úmero proximal',
          'Cortical fina e facilidade de punção em cães (Defarges 2013), mas exige controle estrito de profundidade pelo risco de lesão torácica.'
        ]
      ]
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/locais-coleta-medula-ossea-caes-gatos.jpg',
      alt: 'Locais principais de coleta de medula óssea em cães e gatos — referências anatômicas',
      caption: 'Figura 1 — Locais principais de coleta de medula óssea em cães e gatos. Crista ilíaca (asa do ílio): 1ª escolha em cães médios e grandes; úmero proximal (tubérculo maior, área craniolateral): padrão-ouro em gatos e alternativa em cães pequenos; fossa trocantérica (fêmur): alternativa quando os sítios anteriores estão indisponíveis. (Referências: BSAVA 2024; Byers 2017; Nelson & Couto)'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'E o Esterno no Cão?',
      text: 'O estudo comparativo de Defarges et al. (2013) em 26 cães Beagle demonstrou que o esterno é tecnicamente mais rápido de aspirar e exige menos tentativas que a crista ilíaca, cursando com menor desconforto pós-procedimento (Guillot et al. 2011). No entanto, pela ausência de margem de erro posterior e proximidade das vísceras torácicas e mediastino, o esterno NÃO deve ser ensinado como primeira técnica para o clínico geral, ficando restrito a operadores experientes.'
    },

    { type: 'heading', level: 2, text: '8. Equipamentos e o Papel Vital do Estilete' },
    {
      type: 'paragraph',
      text: 'A coleta de medula óssea requer agulhas cirúrgicas rígidas especializadas, dotadas de cânula de aço reforçada e estilete interno travável.'
    },
    {
      type: 'table',
      caption: 'Calibres de agulha recomendados por porte e espécie (BSAVA Guide to Procedures 2024)',
      headers: ['Tipo de Agulha', 'Cão > 5 kg', 'Cão < 5 kg', 'Gato 🐱'],
      rows: [
        ['Agulha de aspiração (Klima ou Rosenthal)', '14G', '16G', '16G'],
        ['Agulha de biópsia core (Jamshidi)', '12G a 14G', '14G a 16G', '14G a 16G (ou Illinois 16G)'],
        ['Sistemas motorizados (OnControl)', '15G', '15G', '15G']
      ]
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig1-agulha-illinois.jpg',
      alt: 'Agulha Illinois para aspiração de medula óssea',
      caption: 'Figura 2: Agulha de Illinois para aspiração de medula óssea. Note a cânula metálica, o estilete interno com empunhadura anatômica e o batente regulável de profundidade rosqueável. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig3-agulha-jamshidi.jpg',
      alt: 'Agulha Jamshidi para biópsia core de medula óssea',
      caption: 'Figura 3: Agulha Jamshidi para biópsia core (BMO). A ponta cilíndrica afilada permite recortar um fragmento trabecular intacto, enquanto o estilete guia e o mandril interno expulsam a amostra no sentido retrógrado. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'O Papel Vital do Estilete (Nunca avance sem ele!)',
      text: 'A agulha precisa atravessar pele, tecido subcutâneo, fáscia muscular, periósteo e o córtex ósseo. Sem o estilete interno travado, o lúmen oco da agulha funcionará como um "vazador de couro", preenchendo-se com um plug de gordura e fragmento ósseo cortical que obstruirá completamente a luz da agulha. Ao aspirar, NADA virá (dry tap artificial). Mantenha o estilete firmemente instalado até sentir a penetração na cavidade medular.'
    },

    { type: 'heading', level: 2, text: '9. Preparação dos Materiais ANTES de Anestesiar' },
    {
      type: 'steps',
      title: 'Checklist de Materiais de Bancada',
      items: [
        'Agulha de aspiração (Klima, Rosenthal ou Illinois) ou biópsia (Jamshidi) estéril e testada.',
        'Seringa plástica de 20 mL com bico Luer-Lock (gera maior pulso de vácuo transitório que seringas de 5 ou 10 mL).',
        'Anticoagulante para priming (ACD, citrato de sódio ou EDTA líquido).',
        'Anestésico local (lidocaína 2% sem vasoconstritor).',
        'Lâmina de bisturi nº 11 com cabo.',
        'Material completo de tricotomia e antissepsia cirúrgica (clorexidina alcoólica).',
        'Campos cirúrgicos estéreis fenestrados e luvas cirúrgicas.',
        '10 a 20 lâminas de microscopia de borda fosca, limpas, desengorduradas e secas, abertas na bancada.',
        'Placa de Petri de vidro ou plástico estéril para verificação macroscópica de espículas.',
        'Pipeta de vidro ou pipeta Pasteur com bico plástico tratado.',
        'Tubo pediátrico com EDTA para amostra líquida excedente.',
        'Frasco com formalina tamponada a 10% (SEMPRE AFASTADO das lâminas de citologia) se for colhido core.',
        'Cola tecidual cirúrgica (cianoacrilato) ou fio de sutura monofilamentar (nylon 3-0 ou 4-0).'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'O Maior Inimigo da Punção Medular',
      text: 'O maior obstáculo de uma punção de medula óssea NÃO é a penetração do osso: é conseguir uma amostra perfeita e deixá-la COAGULAR na seringa ou na bancada em 10 a 20 segundos antes de confeccionar as lâminas! As lâminas de vidro devem estar enfileiradas e prontas antes de aproximar a agulha do animal.'
    },

    { type: 'heading', level: 2, text: '10. Anticoagulante: Anticoagular NÃO é Diluir' },
    {
      type: 'paragraph',
      text: 'A medula óssea é rica em tromboplastina tecidual liberada pela quebra das trabéculas ósseas, o que deflagra a cascata de coagulação quase que instantaneamente.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Técnica de Priming da Seringa e Agulha',
      text: 'O BSAVA e Cornell recomendam aspirar ~1 mL de anticoagulante (solução de ACD ou EDTA), banhar minuciosamente as paredes internas da seringa e o lúmen da agulha e EXPULSAR praticamente todo o líquido, deixando apenas o volume mínimo residual retido no cone e canhão (~0,05 a 0,1 mL). Se você deixar 1 mL de anticoagulante líquido na seringa e colher 0,3 mL de medula, você terá uma amostra diluída em 4 vezes! Anticoagular é recobrir as superfícies de contato, jamais diluir a celularidade.'
    },

    { type: 'heading', level: 2, text: '11. Sedação, Anestesia & Analgesia Perióstea' },
    {
      type: 'paragraph',
      text: 'A abordagem anestésica deve garantir imobilidade absoluta do paciente e bloqueio nociceptivo profundo:'
    },
    {
      type: 'steps',
      title: 'Protocolos Anestésicos Recomendados',
      items: [
        'CÃO 🐶: Sedação profunda (opioide pleno associado a agonista alfa-2 adrenérgico ou benzodiazepínico) associada obrigatoriamente a anestesia local infiltrativa perióstea. Se o paciente for instável, agressivo ou o operador estiver em curva de aprendizado, a anestesia geral é a conduta de eleição.',
        'GATO 🐱: O BSAVA 2024 recomenda conservadoramente ANESTESIA GERAL associada a analgesia multimodal e anestesia local infiltrativa. Embora operadores experientes possam utilizar sedação pesada em casos selecionados (Byers 2017), a anestesia geral em gatos assegura imobilidade perfeita, previne movimentos reflexos perigosos e protege o paciente.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Por que Infiltrar o Periósteo Mesmo sob Anestesia?',
      text: 'O periósteo possui a maior densidade de nociceptores somáticos de todo o esqueleto. A rotação e a pressão de uma agulha rígida contra o periósteo causam dor excruciante que pode provocar despertares súbitos, arritmias reflexas e taquicardia severa mesmo em animais sob sedação profunda. A infiltração deve ser realizada com agulha fina (25G) na pele, subcutâneo e depositando 0,5 a 1,5 mL de lidocaína 2% diretamente contra a superfície óssea (Guillot et al. 2011).'
    },

    { type: 'heading', level: 2, text: '12. Técnica de Entrada no Espaço Medular' },
    {
      type: 'steps',
      title: 'Princípios da Perfuração Óssea Controlada',
      items: [
        'Preparação asséptica: tricotomia de 10 × 10 cm, antissepsia cirúrgica em 3 etapas e colocação de campo estéril.',
        'Incisão cutânea mínima: realize uma incisão puntiforme de 2 a 3 mm na pele com lâmina de bisturi nº 11 sobre o acidente ósseo. Isso evita que a agulha calibrosa arraste, esmague e torça a pele durante a rotação.',
        'Apoio cortical firme: introduza a agulha com o estilete travado até sentir o contato rígido e plano contra o córtex ósseo.',
        'Pressão axial constante: exerça pressão firme e controlada ao longo do eixo longitudinal planejado.',
        'Rotação curta alternada: gire a empunhadura da agulha alternando sentido horário e anti-horário em arcos curtos (como uma furadeira manual de precisão). Não tente fazer círculos amplos com o punho.'
      ]
    },
    { type: 'heading', level: 3, text: 'Como Reconhecer que Entrou na Cavidade Medular?' },
    {
      type: 'steps',
      items: [
        '1. Queda súbita de resistência ("Give"): Ao vencer a túnica cortical densa e alcançar a medula esponjosa trabecular, há uma perceptível perda de resistência mecânica e a agulha avança com maior facilidade.',
        '2. Estabilidade mecânica absoluta: A agulha fica firmemente engastada no osso. Ao soltar a mão, ela não cai e não oscila. Ao movimentar delicadamente a cânula, o próprio membro ou a pelve do paciente se move junto em bloco (BSAVA 2024).'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'JAMAIS Balance a Agulha Lateralmente',
      text: 'Se a penetração cortical parecer difícil, nunca tente inclinar ou balançar a agulha para os lados fazendo alavanca contra o osso. O torque lateral sobre metal e osso pode fraturar a agulha dentro da cortical, quebrar tábuas ósseas e lacerar nervos ou vasos contíguos. Mantenha alinhamento estrito: eixo firme + pressão contínua + rotação alternada.'
    },

    { type: 'heading', level: 2, text: '13. Passo a Passo por Sítio Anatômico' },
    { type: 'heading', level: 3, text: 'CÃO — Crista Ilíaca (1ª Escolha no Cão Médio/Grande)' },
    {
      type: 'paragraph',
      text: 'A crista ilíaca é o sítio mais clássico e seguro no cão (BSAVA 2024). O paciente é posicionado em decúbito esternal com os membros pélvicos bem recolhidos sob o abdome ("postura de esfinge"), expondo a asa ilíaca bilateralmente.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig5-acesso-crista-iliaca.jpg',
      alt: 'Acesso à crista ilíaca para aspiração medular em cão',
      caption: 'Figura 4: Posicionamento e introdução da agulha na crista ilíaca dorsal em cão. A agulha é direcionada perpendicularmente à porção mais ampla da asa ilíaca. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'steps',
      title: 'Passos Técnicos na Crista Ilíaca',
      items: [
        'Palpe simultaneamente as duas asas do ílio com as polpas dos dedos.',
        'Identifique o ponto mais dorsal e mais largo da crista ilíaca.',
        'Truque de mira do BSAVA: com a ponta da agulha sobre o osso, deslize suavemente para a borda medial até sentir a queda do osso; depois deslize para a lateral. Posicione a agulha exatamente no centro dessa largura.',
        'Mantenha a agulha perpendicular à pele ou apontando ligeiramente no sentido caudal, avançando no plano intramedular entre as corticais medial e lateral da asa ilíaca.'
      ]
    },
    { type: 'heading', level: 3, text: 'CÃO E GATO — Úmero Proximal (1ª Escolha no Gato e Cão Pequeno)' },
    {
      type: 'paragraph',
      text: 'O úmero proximal é o sítio preferencial no gato e em cães de pequeno porte (Byers 2017; BSAVA 2024). O paciente é posicionado em decúbito lateral com o membro a ser puncionado apoiado confortavelmente.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig4-acesso-umero-proximal.jpg',
      alt: 'Acesso ao úmero proximal para aspiração medular',
      caption: 'Figura 5: Punção medular umeral proximal na face craniolateral plana, entre o tubérculo maior e a cabeça umeral. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'steps',
      title: 'Passos Técnicos no Úmero Proximal',
      items: [
        'Palpe a articulação escapuloumeral e identifique o tubérculo maior do úmero.',
        'Localize a faceta óssea craniolateral relativamente plana situada imediatamente distal e lateral ao tubérculo maior.',
        'O auxiliar pode rotacionar suavemente o cotovelo no sentido medial para projetar a face lateral do ombro.',
        'Insira a agulha perpendicularmente a essa superfície plana ou direcionada paralelamente ao eixo longo da diáfise umeral, penetrando até atingir a cavidade esponjosa proximal.'
      ]
    },
    { type: 'heading', level: 3, text: 'CÃO E GATO — Fossa Trocantérica do Fêmur' },
    {
      type: 'paragraph',
      text: 'A fossa trocantérica situa-se na extremidade proximal do fêmur, constituindo excelente alternativa anatômica quando os outros sítios estão inacessíveis.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig7-fossa-trocanterica.jpg',
      alt: 'Acesso à fossa trocantérica do fêmur',
      caption: 'Figura 6: Punção medular na fossa trocantérica femoral, medial ao trocanter maior. O trajeto é estritamente paralelo à diáfise femoral, mantendo afastamento do feixe ciático caudal. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'steps',
      title: 'Passos Técnicos na Fossa Trocantérica',
      items: [
        'Coloque o animal em decúbito lateral e palpe a proeminência rígida do trocanter maior do fêmur.',
        'A fossa trocantérica fica situada imediatamente medial à crista trocantérica.',
        'Insira a agulha encostada na borda medial do trocanter maior e avance-a em direção distal, estritamente paralela ao eixo longo da diáfise femoral.',
        'O auxiliar pode aplicar leve rotação interna/adutora no joelho para facilitar a estabilização.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: '⚠️ ALERTA MÁXIMO NA FOSSA TROCANTÉRICA: O NERVO CIÁTICO',
      text: 'O nervo ciático (isquiático) corre imediatamente caudal ao fêmur proximal. Se a agulha escorregar caudalmente ao trocanter maior durante a força de penetração, ela pode lacerar diretamente o tronco do nervo ciático, provocando dor lancinante e paralisia permanente do membro pélvico! Mantenha a agulha sempre "caminhando" sobre a cortical óssea medial e avance rigorosamente paralela à diáfise femoral, NUNCA no plano caudal.'
    },

    { type: 'heading', level: 2, text: '14. Técnica de Aspiração e Controle de Volume' },
    {
      type: 'steps',
      title: 'Como Executar a Sucção Medular Eficaz',
      items: [
        'Assim que a agulha estiver firmemente engastada na cavidade medular, interrompa o avanço.',
        'Segure a base da agulha com uma mão e desrosqueie/remova o estilete com a outra.',
        'Acople firmemente uma seringa de 20 mL preparada com priming de anticoagulante.',
        'Realize uma sucção forte, curta e decidida: puxe o êmbolo até a marca de 10 a 12 mL para gerar um pulso transitório de pressão negativa intensa.',
        'Essa pressão negativa descola fragmentos celulares e trabéculas de espículas da medula.',
        'ASSIM QUE SURGIR O PRIMEIRO FLASH DE MATERIAL SANGUINOLENTO NO CONE DA SERINGA: RELAXE IMEDIATAMENTE O ÊMBOLO!'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Por que o volume deve ser rigorosamente MENOR que 0,5 mL?',
      text: 'A medula óssea é densamente vascularizada por sinusoides. Nas primeiras gotas de aspiração, vêm as espículas e células hematopoéticas verdadeiras. Se você continuar tracionando o êmbolo para colher 1, 2 ou 3 mL de sangue, o vácuo sugará sangue circulante periférico em grande escala, provocando hemodiluição maciça. Amostras hemodiluídas parecem ter apenas hemácias maduras e neutrófilos segmentados, mascarando hipoplasias e impedindo a avaliação fidedigna pelo patologista (BSAVA 2024; Drobatz et al. 2019).'
    },

    { type: 'heading', level: 2, text: '15. "Veio Sangue. Acertei?" — O Reconhecimento das Espículas' },
    {
      type: 'paragraph',
      text: 'O sangue medular recém-aspirado parece sangue comum a olho nu. O que confirma de forma inequívoca que a punção foi bem-sucedida é a visualização macroscópica de ESPÍCULAS MEDULARES e gotículas lipídicas flutuantes.'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig8-espiculas-medulares.jpg',
      alt: 'Espículas medulares em amostra aspirada',
      caption: 'Figura 7: Aspecto visual das espículas/partículas medulares recém-aspiradas. Note os pequenos fragmentos granulares acinzentados/esbranquiçados visíveis imersos no sangue. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Morfologia Macroscópica das Espículas',
      text: 'Ao despejar a amostra em uma placa de Petri ou ao incliná-la sobre uma lâmina de vidro, as espículas se destacam como pequenos grãos de areia ou partículas esbranquiçadas e opacas imersas no sangue líquido. São esses fragmentos que contêm os precursores hematopoéticos intactos e os megacariócitos que permitirão o diagnóstico.'
    },

    { type: 'heading', level: 2, text: '16. O que Fazer Diante de um "Dry Tap" (Aspirado Seco)?' },
    {
      type: 'paragraph',
      text: 'O "dry tap" (nenhum retorno de material à aspiração) ocorre principalmente por 4 causas: 1) Agulha muito superficial (ainda no córtex externo); 2) Agulha muito profunda (impactada contra o córtex oposto); 3) Obstrução da luz da agulha por plug de tecido; 4) Doença medular proliferativa ou fibrótica que impede a aspiração celular.'
    },
    {
      type: 'steps',
      title: 'Conduta Padronizada perante Dry Tap',
      items: [
        'Desconecte a seringa e recoloque o estilete imediatamente.',
        'Avance a agulha cerca de 0,5 a 1 cm com movimentos rotacionais suaves ou recue 2 mm para desobstruir a ponta.',
        'Remova o estilete, reconecte a seringa e repita a sucção rápida.',
        'Se falhar após 2 a 3 tentativas delicadas, retire a agulha e mude para um sítio anatômico alternativo.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Dry Tap Repetido em Paciente Pancitopênico = INDICAÇÃO DE CORE!',
      text: 'Se você realizou a técnica correta no ílio e no úmero e ambos resultaram em dry tap num paciente com pancitopenia ou anemia não regenerativa grave, NÃO conclua simplesmente que houve falha do operador. Dry taps repetidos em sítios diferentes são a manifestação clínica clássica de MIELOFIBROSE, aplasia grave ou infiltração neoplásica densa (mieloftise). Nesses casos, o aspirado é a técnica que falha, enquanto a biópsia core (BMO) com Jamshidi torna-se indispensável para o diagnóstico (Withrow & MacEwen).'
    },

    { type: 'heading', level: 2, text: '17. Manuseio Imediato & Preparo dos Esfregaços' },
    {
      type: 'paragraph',
      text: 'A medula óssea coagula em 10 a 20 segundos devido à alta concentração de tromboplastina tecidual. Todo o processamento de bancada deve ser executado com agilidade imediata.'
    },
    { type: 'heading', level: 3, text: 'Técnica 1 — Lâminas Inclinadas (Método Rápido)' },
    {
      type: 'paragraph',
      text: 'Posicione 10 a 15 lâminas limpas em posição inclinada sobre a bancada. Deposite uma pequena gota do aspirado na margem superior de cada lâmina. O sangue sinusoidal líquido escorre rapidamente para baixo, enquanto as partículas medulares, mais pesadas e ricas em estroma, aderem à porção superior do vidro.'
    },
    { type: 'heading', level: 3, text: 'Técnica 2 — Placa de Petri com Pipeta de Vidro (Padrão Ouro)' },
    {
      type: 'paragraph',
      text: 'Expulse a gota do aspirado no centro de uma placa de Petri estéril. Com uma pipeta de vidro (Cornell destaca que o vidro evita que as espículas grudem nas paredes plásticas), colete individualmente as partículas com o menor volume possível de sangue adjacente e transfira-as para o centro das lâminas.'
    },
    { type: 'heading', level: 3, text: 'A Técnica de "Squash" Suave (Sem Esmagamento Brutal)' },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/medula-fig9-preparo-laminas-squash.jpg',
      alt: 'Preparo dos esfregaços de medula por técnica de deslizamento suave (squash)',
      caption: 'Figura 8: Confecção correta dos esfregaços medulares pelo método de squash deslizante. A lâmina superior repousa sobre a espícula e é deslizada horizontalmente com pressão suave, preservando a integridade das células precursoras. Fonte: Byers CG, JFMS 2017 (Open Access / SAGE).'
    },
    {
      type: 'steps',
      title: 'Passos para Confecção do Squash',
      items: [
        'Deposite a espícula medular no centro da lâmina base (lâmina A).',
        'Apoie suavemente uma segunda lâmina limpa (lâmina B) perpendicularmente ou paralelamente sobre a primeira.',
        'Permita que o próprio peso do vidro espalhe a espícula; NÃO pressione com força vertical para baixo!',
        'Deslize as duas lâminas em sentidos opostos com um movimento horizontal contínuo e nivelado.',
        'Pressão excessiva rompe os núcleos e as membranas celulares (smear artifact), inviabilizando o exame citológico.'
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Secagem e Isolamento dos Vapores de Formalina',
      text: 'Seque imediatamente os esfregaços ao ar ou com ar morno de secador. Mantenha as lâminas secas e NUNCA armazene lâminas citológicas na mesma embalagem com recipientes de formalina (formol)! Os vapores de formalina fixam parcialmente as células nas lâminas de citologia, impedindo a penetração dos corantes Romanowsky e tornando as preparações completamente acinzentadas e inelegíveis.'
    },

    { type: 'heading', level: 2, text: '18. Dicas de Ouro de Laboratório & Envio' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Core uma Lâmina ANTES de Despertar o Paciente!',
      text: 'Sempre core pelo menos uma lâmina com corante rápido (Panótico ou Diff-Quik) enquanto o paciente ainda se encontra anestesiado na mesa. Avalie ao microscópio: Há espículas celulares visíveis? Existem células hematopoéticas em quantidade satisfatória ou apenas sangue periférico? Se a amostra for inadequada, você pode realizar uma nova punção imediatamente no mesmo procedimento, sem submeter o paciente a um novo ciclo anestésico no dia seguinte.'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Envie Sempre o Hemograma Concomitante',
      text: 'Um mielograma nunca deve ser interpretado isoladamente. Uma hiperplasia eritroide com anemia regenerativa periférica expressa resposta fisiológica ativa à hemólise; contudo, a mesma hiperplasia eritroide na presença de anemia grave não regenerativa no sangue periférico indica bloqueio de maturação ou eritropoese ineficaz (Drobatz et al. 2019; de Cristo et al. 2023). Envie SEMPRE sangue periférico em EDTA coletado no mesmo dia.'
    },

    { type: 'heading', level: 2, text: '19. Raciocínio Clínico na Interpretação do Mielograma' },
    {
      type: 'table',
      caption: 'Raciocínio clínico inicial das linhagens medulares hematopoéticas',
      headers: ['Linhagem', 'Achado no Mielograma', 'Interpretação e Hipóteses Clínicas'],
      rows: [
        [
          'Eritroide',
          'Hiperplasia eritroide com sangue periférico regenerativo',
          'Resposta medular adequada à hemorragia ou hemólise periférica.'
        ],
        [
          'Eritroide',
          'Hiperplasia eritroide com sangue periférico NÃO regenerativo',
          'Eritropoese ineficaz, bloqueio de maturação, mielodisplasia ou deficiência nutricional grave.'
        ],
        [
          'Eritroide',
          'Hipoplasia ou aplasia eritroide pura',
          'Aplasia eritroide pura imunomediada (PRCA), supressão por FeLV/FIV, toxicidade medular, insuficiência renal crônica.'
        ],
        [
          'Megacariocítica',
          'Número aumentado de megacariócitos com plaquetopenia periférica',
          '"Fábrica acelerada": destruição imunomediada periférica (PTI), sequestro esplênico ou consumo vascular (CIVD).'
        ],
        [
          'Megacariocítica',
          'Número acentuadamente reduzido ou ausência de megacariócitos',
          'Falência produtiva medular, toxicidade por estrógeno, infecção medular, mielodisplasia.'
        ],
        [
          'Relação M:E (Mieloide:Eritroide)',
          'Relação M:E elevada (> 3:1 a 4:1)',
          'Hiperplasia mieloide (infecção crônica, leucemia) OU hipoplasia eritroide associada.'
        ],
        [
          'Relação M:E (Mieloide:Eritroide)',
          'Relação M:E diminuída (< 0,5:1 a 1:1)',
          'Hiperplasia eritroide compensatória OU hipoplasia mieloide (agranulocitose).'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'A Relação M:E Nunca é um Diagnóstico Isolado',
      text: 'A relação mieloide:eritroide avalia a proporção entre os dois maiores compartimentos proliferativos da medula. Ela sempre deve ser analisada em conjunto com a celularidade total estimada e com a contagem absoluta de neutrófilos e eritrócitos do hemograma do mesmo dia.'
    },

    { type: 'heading', level: 2, text: '20. Quando e Como Fazer a Biópsia Core (BMO)?' },
    {
      type: 'paragraph',
      text: 'A biópsia core (BMO) é indicada em casos de suspeita de mielofibrose, aplasia/hipoplasia global, osteosclerose, mielonecrose, estadiamento de linfomas e neoplasias metastáticas ou quando o aspirado resulta repetidamente em dry tap.'
    },
    {
      type: 'steps',
      title: 'Técnica Resumida com Agulha Jamshidi',
      items: [
        'Ordem de coleta: se for realizar aspirado e core na mesma sessão, colha o aspirado PRIMEIRO e depois realize o core em ponto ligeiramente deslocado ou contralateral (evita contaminação e hemodiluição).',
        'Introduza a agulha Jamshidi com estilete até vencer a cortical óssea.',
        'Remova o estilete e avance a cânula oca por 1 a 2 cm dentro do osso com rotação contínua para recortar a coluna medular.',
        'Antes de puxar a agulha, faça uma leve inclinação lateral e rotação completa de 360° para fraturar a base do fragmento ósseo.',
        'Retire a agulha e utilize o mandril extrator para empurrar o fragmento no sentido RETRÓGRADO (da ponta para o conector Luer), evitando esmagamento.',
        'O fragmento intacto (idealmente ≥ 0,5 cm) deve ser imerso imediatamente em frasco com formalina tamponada a 10%.'
      ]
    },

    { type: 'heading', level: 2, text: '21. Complicações & Cuidados Pós-Procedimento' },
    {
      type: 'steps',
      title: 'Monitoramento e Hemostasia',
      items: [
        'Aplique compressão digital direta contínua no sítio ósseo por no mínimo 3 a 5 minutos (prolongar em trombocitopenias graves).',
        'Aproxime as bordas da microincisão cutânea com uma gota de cola cirúrgica (cianoacrilato) ou um ponto simples com fio inabsorvível.',
        'Monitore sinais de hematoma expansivo, sangramento persistente ou claudicação no pós-operatório imediato.',
        'Forneça analgesia sistêmica pós-operatória adequada (opioides ou anti-inflamatórios de acordo com a condição clínica do paciente) — o procedimento não deve ser considerado indolor (Guillot et al. 2011).'
      ]
    },

    { type: 'heading', level: 2, text: '22. Fluxograma de Decisão na Coleta de Medula' },
    {
      type: 'flowchart',
      title: 'Fluxo Clínico da Indicação ao Envio Laboratorial',
      nodes: [
        { id: 'ind', label: 'Indicação clínica (Pancitopenia / Citopenia inexplicada / Blasto)', variant: 'start' },
        { id: 'eval', label: 'Hemograma + Reticulócitos + Excluir causas extramedulares', variant: 'action' },
        { id: 'type', label: 'Definir amostra: Aspirado (AMO), Core (BMO) ou ambos', variant: 'decision' },
        { id: 'site', label: 'Sítio: Cão (Ílio/Úmero) | Gato (Úmero proximal)', variant: 'action' },
        { id: 'prep', label: 'Sedação/GA + Infiltração perióstea + Lâminas na bancada', variant: 'action' },
        { id: 'punc', label: 'Perfuração com estilete → sentir "give" e estabilidade', variant: 'action' },
        { id: 'asp', label: 'Aspirar &lt; 0,5 mL com seringa 20 mL e conferir espículas', variant: 'action' },
        { id: 'dry', label: 'Veio material ou Dry Tap?', variant: 'decision' },
        { id: 'slide', label: 'Montar esfregaços por squash em ≤ 20 segundos', variant: 'action' },
        { id: 'core', label: 'Recolocar estilete / avançar 1 cm ou indicar Core Jamshidi', variant: 'action' },
        { id: 'end', label: 'Coloração teste + envio com hemograma periférico concomitante', variant: 'end' }
      ],
      edges: [
        { from: 'ind', to: 'eval' },
        { from: 'eval', to: 'type' },
        { from: 'type', to: 'site' },
        { from: 'site', to: 'prep' },
        { from: 'prep', to: 'punc' },
        { from: 'punc', to: 'asp' },
        { from: 'asp', to: 'dry' },
        { from: 'dry', to: 'slide', label: 'Espículas' },
        { from: 'dry', to: 'core', label: 'Dry Tap' },
        { from: 'core', to: 'asp' },
        { from: 'slide', to: 'end' }
      ]
    },

    { type: 'heading', level: 2, text: '23. Box de Bolso — Antes de Puncionar Medula 🩸' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'CHECKLIST DE OURO DO PLANTÃO — MEDULA ÓSSEA',
      text: '1. INDICAÇÃO: Citopenia inexplicada, pancitopenia, anemia não regenerativa, febre obscura ou estadiamento oncológico.\n\n2. PRÉ-REQUISITO: Hemograma completo concomitante com reticulócitos e esfregaço periférico no mesmo dia.\n\n3. AMOSTRA: Aspirado (AMO) para morfologia celular; Biópsia core (BMO) para arquitetura e fibrose. Se suspeita de aplasia ou mielofibrose, faça ambos.\n\n4. SÍTIO ANATÔMICO:\n   • Cão: crista ilíaca (médio/grande) ou úmero proximal (pequeno/obeso).\n   • Gato: úmero proximal (área craniolateral plana).\n   • Fêmur: cuidado absoluto com o nervo ciático caudal.\n\n5. ANESTESIA & ANALGESIA: Bloqueio anestésico local obrigatório até o periósteo em todos os animais; preferir anestesia geral em gatos.\n\n6. PENETRAÇÃO: Estilete travado → pressão axial + rotação alternada → sentir o "give" → agulha fica imóvel.\n\n7. SUCÇÃO: Menos de 0,5 mL! Pare a tração assim que o sangue aparecer no cone (evita hemodiluição).\n\n8. BANCADA: Monte os esfregaços em ≤ 20 segundos por técnica de squash suave. Seque ao ar e NUNCA junte com formol!\n\n9. DRY TAP REPETIDO: Suspeite fortemente de mielofibrose e execute biópsia core.'
    },

    { type: 'heading', level: 2, text: '24. Referências Técnicas' },
    {
      type: 'paragraph',
      text: 'O conteúdo deste guia foi estruturado com base nas principais fontes de medicina de procedimentos, hematologia e terapia intensiva veterinária:'
    },
    {
      type: 'steps',
      items: [
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Bone marrow aspiration, pp. 101–106 (Referência central de padronização do procedimento).',
        'Vaden SL, Knoll JS, Smith FWK, Tilley LP. Exames Laboratoriais e Procedimentos Diagnósticos em Cães e Gatos. Editora Roca; 2013. Seção: Biopsia e Aspirado de Medula Óssea (Laurel E. Williams), pp. 192–195.',
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 87 – Disorders of Hemostasis, p. 1395 e Chapter 73 – Common Immune-Mediated Diseases, pp. 1242–1243.',
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019. Bone Marrow Sampling and Analysis: Indications, Core Biopsy and Hemodilution.',
        'Byers CG. Diagnostic bone marrow sampling in cats: currently accepted best practices. J Feline Med Surg. 2017;19(7):759–767. (Artigo Open Access / SAGE).',
        'Defarges A, Abrams-Ogg A, Foster RA, Bienzle D. Comparison of sternal, iliac, and humeral bone marrow aspiration in Beagle dogs. Vet Clin Pathol. 2013;42(2):170–176.',
        'Guillot M, Del Castillo JRE, Chamel G, et al. Pain induced by a minor medical procedure (bone marrow aspiration) in dogs. J Vet Intern Med. 2011;25(5):1050–1056.',
        'de Cristo TG, Biezus G, Volpato J, et al. Overview of Bone Marrow Aspiration from 120 Cats in Different Hematological Conditions. Vet Med Int. 2023;2023:2493618. (Artigo Open Access sob licença CC BY).',
        'Cornell University College of Veterinary Medicine — eClinPath. Bone marrow: Indications, Methods and Evaluation. Recursos abertos de hematologia e patologia clínica veterinária.'
      ]
    }
  ],
  isPublished: true
};
/**
 * Guia: Sondagem e cateterização uretral em fêmeas (cadelas e gatas).
 * Conteúdo técnico de medicina intensiva, emergência e urologia de pequenos animais.
 * Referências: BSAVA Guide to Procedures (2024), VECC Procedures (2025), ISCAID (2019), iCatCare (2025), Dornbusch et al. (JAVMA 2022).
 */
const guiaSondagemUretralFemeas: ClinicalQuickGuide = {
  id: 'cqg-sondagem-femeas-007',
  slug: 'sondagem-cateterizacao-uretral-femeas',
  title: 'Sondagem e cateterização uretral em fêmeas (cadelas e gatas)',
  subtitle:
    'Procedimentos Clínicos — Palpação digital da papila, técnica às cegas felina, método dos dois cateteres (<10 kg), sistema fechado e prevenção de ITU (ISCAID)',
  summary:
    'Guia prático e avançado para cateterização uretral em cadelas e gatas: anatomia do vestíbulo e meato uretral ventral, técnica de palpação digital ("dedo teto"), método dos dois cateteres (Dornbusch), visualização com otoscópio, uso seguro do balão de Foley, circuito fechado gravitacional e prevenção de infecção hospitalar baseada no ISCAID e iCatCare.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'sondagem uretral femea',
    'sondagem uretral cadela',
    'sondagem uretral gata',
    'cateterizacao uretral femea',
    'cateter foley',
    'papila uretral',
    'meato uretral ventral',
    'dois cateteres',
    'dual catheter',
    'dornbusch',
    'sistema fechado de urina',
    'cauti',
    'iscaid',
    'icatcare',
    'debito urinario',
    'incontinencia urinaria',
    'obstrucao uretral femea',
    'bexiga urinaria',
    'uretra femea',
    'espéculo vaginal',
    'otoscópio sondagem',
    'red rubber'
  ],
  youtubeVideoId: 'lt3y-gyEte8',
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/sondagem-cateterizacao-uretral-femeas.webp',
  heroImageAlt: 'Imagem ilustrativa de sondagem e cateterização uretral em fêmeas (cadelas e gatas): materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'A uretra não desemboca na vagina: seu meato está no assoalho ventral do vestíbulo, ligeiramente cranial à vulva e à fossa clitoridiana.',
    'Palpação digital ("dedo teto") na cadela: o indicador no vestíbulo atua como barreira física sobre o canal vaginal dorsal, guiando a sonda sob sua polpa até o orifício uretral.',
    'Fêmeas <10 kg e gatas: a técnica dos dois cateteres (Dornbusch/JAVMA) oclui a vagina dorsalmente com cateter de maior calibre e orienta o cateter urinário ventralmente com ~80% de êxito.',
    'Balão de Foley: JAMAIS insufle na uretra. Avance até o lúmen vesical, confirme o refluxo espontâneo de urina e use SOMENTE água estéril (salina cristaliza; ar flutua).',
    'Prevenção de CAUTI (ISCAID 2019): manter sistema fechado com bolsa abaixo do paciente e sem tocar o piso; NÃO usar antibiótico profilático de rotina nem cultivar a ponta da sonda.'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. A Ideia Central e Quando Sondar 🎯' },
    {
      type: 'paragraph',
      text:
        'A sondagem uretral da fêmea é um procedimento relativamente simples depois que o clínico compreende a anatomia topográfica tridimensional. No entanto, costuma ser motivo de frustração no início da curva de aprendizado porque o meato uretral externo não é visível na inspeção externa: ele situa-se no assoalho ventral do vestíbulo vaginal, cranial à rima vulvar e à fossa clitoridiana. Em pacientes pequenas — particularmente em gatas e cadelas toy — o lúmen vestibular é tão reduzido que a palpação digital torna-se fisicamente inviável.'
    },
    {
      type: 'paragraph',
      text:
        'A cateterização uretral em fêmeas possui indicações clínicas e cirúrgicas precisas e jamais deve ser banalizada:'
    },
    {
      type: 'steps',
      items: [
        'Mensuração quantitativa rigorosa do débito urinário (alvo normal: 1–2 mL/kg/h): essencial no monitoramento hemodinâmico de choque séptico, hipovolêmico ou cardiogênico, e na vigilância da Injúria Renal Aguda (IRA oligúrica vs. não oligúrica).',
        'Alívio e descompressão vesical: em retenções urinárias funcionais (ex.: dissinergia reflexa, bexiga neurogênica pós-hérnia de disco lombar/sacral) ou anatômicas/mecânicas parciais.',
        'Manutenção da descompressão no perioperatório: cirurgias pélvicas, ortopédicas de bacia, laparotomias exploratórias prolongadas ou reconstruções perineais.',
        'Manejo de fêmeas não ambulatórias, politraumatizadas ou comatadas: evita queimaduras de urina (scalding) e contaminação bacteriana perigenital secundária.',
        'Investigação contrastada do trato urinário inferior: realização de uretrocistografia retrógrada e vaginouretrografia para pesquisa de rotura, fístulas, cálculos ou neoplasias (ex.: carcinoma urotelial).',
        'Tratamento conservador temporário de lesões uretrais traumáticas: manutenção de stent intraluminal enquanto ocorre reepitelização de lacerações parciais.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'QUANDO NÃO SONDAR: UROCULTURA E URINÁLISE DE ROTINA',
      text:
        'Não vale a pena sondar fêmeas apenas para conseguir uma amostra de urina de rotina! Para cultura bacteriana quantitativa e antibiograma, a CISTOCENTESE estéril é o método de eleição por produzir amostras livres da flora colonizadora normal da vagina e do vestíbulo. Para urinálise de triagem em fêmeas estáveis, a micção espontânea com desprezo do primeiro jato é preferível para poupar o paciente dos riscos de trauma uretral e inoculação bacteriana ascendente.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'REGRA DE OURO DE SEGURANÇA: NUNCA EMPURRE COM FORÇA!',
      text:
        'Uma sonda uretral que precisa ser "empurrada" com resistência mecânica não está no caminho correto. O avanço forçado pode produzir lacerações transmurais, hemorragia profusa, falsas vias submucosas e perfuração vesical ou uretral iatrogênica. Lubrificação estéril generosa, relaxamento farmacológico (sedação), posicionamento adequado e compreensão espacial da papila são incomparavelmente mais determinantes para o sucesso do que a força manual.'
    },

    { type: 'heading', level: 2, text: '2. Anatomia Cirúrgico-Clínica Fundamental 🧠' },
    {
      type: 'paragraph',
      text:
        'Para acertar a sondagem de primeira, o clínico deve visualizar mentalmente a sequência longitudinal craniocaudal do trato urogenital inferior:'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'SEQUÊNCIA TOPOGRÁFICA',
      text:
        'Vulva (lábios externos) → Vestíbulo vaginal (área comum urogenital) → Vagina (canal dorsal cranial)\n\n• A uretra feminina NÃO desemboca na vagina propriamente dita.\n• Seu óstio externo (meato uretral) está localizado no ASSOALHO VENTRAL do vestíbulo, logo cranial à fossa clitoridiana e caudal à junção vestibulovaginal.'
    },
    {
      type: 'paragraph',
      text:
        'Particularidades anatômicas cruciais entre as espécies:'
    },
    {
      type: 'steps',
      items: [
        'Na cadela: o meato uretral situa-se no ápice ou na base de uma elevação mucosa arredondada — a papila uretral (tubérculo uretral) —, geralmente palpável pelo indicador como um pequeno relevo firme contendo uma fenda longitudinal ou depressão central. A sínfise púbica situa-se imediatamente cranial e ventral ao vestíbulo, servindo como apoio anatômico firme.',
        'Na gata: toda a estrutura é miniaturizada. A papila é extremamente sutil e o óstio uretral apresenta-se essencialmente como uma fenda milimétrica no assoalho ventral da linha média. Como o espaço não admite palpação digital, o procedimento baseia-se na condução vetorial estritamente ventral da sonda ou em visualização sob iluminação direta.',
        'A armadilha da fossa clitoridiana: na comissura ventral da vulva existe uma concavidade mucosa rasa — a fossa do clitóris. Cateteres direcionados muito ventralmente logo na entrada da vulva podem ficar travados nessa fossa em fundo cego, simulando estenose uretral. O meato uretral real fica aproximadamente 1 a 3 cm mais cranial ao longo do assoalho.',
        'A armadilha do canal vaginal (o erro mais comum): o canal vaginal abre-se cranialmente e dorsalmente à papila uretral. Trata-se de um conduto muito mais largo e complacente. Qualquer cateter introduzido paralelamente ao teto ou que passe reto para frente sem orientação ventral penetrará na vagina, permitindo avanço profundo de 8 a 15 cm sem qualquer saída de urina!'
      ]
    },

    { type: 'heading', level: 2, text: '3. Ilustração Técnica: Anatomia Sagital e Métodos de Sondagem 📸' },
    {
      type: 'paragraph',
      text:
        'O esquema abaixo resume a anatomia sagital pélvica, o trajeto das vias corretas e erradas, e as três principais técnicas de inserção (digital, dois cateteres e felina):'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/sondagem-uretral-femea-anatomia-tecnica.svg',
      alt: 'Diagrama esquemático das vias anatômicas sagitais e métodos de cateterização uretral em cadelas e gatas.',
      caption:
        'Figura 1: Anatomia sagital do vestíbulo feminino e técnicas de cateterização. (1) Topografia sagital: uretra ventral vs. vagina dorsal. (2) Técnica de palpação digital na cadela: o indicador bloqueia o teto vaginal e a sonda corre sob a polpa. (3) Técnica dos dois cateteres para fêmeas <10 kg (Dornbusch et al.): cateter vaginal tracionado dorsalmente abre o meato uretral para o cateter menor. (4) Sondagem felina às cegas com tração vulvar e visualização por otoscópio.'
    },

    { type: 'heading', level: 2, text: '4. Seleção de Materiais e Escolha do Cateter 🩺' },
    {
      type: 'paragraph',
      text:
        'A escolha do calibre (escala French, onde 1 Fr = 0,33 mm de diâmetro externo) e do material da sonda é determinante para prevenir trauma mecânico, estenose secundária e incrustação de biofilme:'
    },
    {
      type: 'table',
      headers: ['Espécie / Porte', 'Objetivo / Duração', 'Calibre (French)', 'Material Recomendado', 'Tipo de Ponta / Retenção'],
      rows: [
        [
          'Gata (2–5 kg)',
          'Permanência (Débito)',
          '3,5 Fr a 5 Fr',
          'Poliuretano / Silicone macio',
          'Ponta romba atraumática com orifícios laterais; sutura em asa de borboleta'
        ],
        [
          'Gata (2–5 kg)',
          'Alívio único',
          '3,5 Fr',
          'Polietileno flexível ou Silicone',
          'Ponta romba lubrificada; drenagem e retirada imediata'
        ],
        [
          'Cadela Toy / Mini (<5 kg)',
          'Permanência',
          '3,5 Fr a 5 Fr',
          'Silicone ou Poliuretano',
          'Foley miniatura (3,5–5 Fr com balão 1,5 mL) ou asa de borboleta'
        ],
        [
          'Cadela Pequena (5–10 kg)',
          'Permanência',
          '6 Fr a 8 Fr',
          'Silicone / Foley 2 vias',
          'Balão intravesical (3 mL de água estéril)'
        ],
        [
          'Cadela Média (10–25 kg)',
          'Permanência',
          '8 Fr a 10 Fr',
          'Silicone / Foley 2 vias',
          'Balão intravesical (3 a 5 mL de água estéril)'
        ],
        [
          'Cadela Grande (>25 kg)',
          'Permanência',
          '10 Fr a 14 Fr',
          'Silicone / Foley 2 vias',
          'Balão intravesical (5 a 10 mL de água estéril)'
        ],
        [
          'Fêmea <10 kg (Dois Cateteres)',
          'Técnica Dornbusch',
          'Cateter 1 (Vaginal): 18 Fr cão / 10 Fr gato; Cateter 2 (Uretra): 8 Fr cão / 5 Fr gato',
          'Red Rubber (Vaginal) + Silicone/Poliuretano (Uretral)',
          'Cateter 1 bloqueia vagina dorsalmente; Cateter 2 entra no meato ventral'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'MATERIAIS RÍGIDOS: CONTRAINDICADOS PARA PERMANÊNCIA',
      text:
        'Cateteres de polipropileno/nylon rígido (como sondas Tom Cat convencionais) só são aceitáveis para alívio imediato pontual ou desobstrução mecânica inicial. Para permanência em internação, cateteres rígidos causam necrose por pressão na mucosa, microperfurações na parede vesical cranial, hematúria persistente e dor intensa. Utilize sempre SILICONE ou POLIURETANO para cateteres de demora (BSAVA 2024).'
    },
    {
      type: 'paragraph',
      text:
        'Lista de materiais estéreis indispensáveis na bancada antes de iniciar:'
    },
    {
      type: 'steps',
      items: [
        'Luvas estéreis de tamanho cirúrgico e campo fenestrado estéril.',
        'Clorexidina aquosa 0,05% ou solução de PVPI aquoso 1% para antissepsia de mucosas (NUNCA formulações alcoólicas ou degermantes com tensoativos concentrados).',
        'Compressas de gaze estéreis e solução salina isotônica estéril 0,9%.',
        'Gel lubrificante hidrossolúvel estéril (preferencialmente seringa pré-carregada estéril; lidocaína gel 2% estéril opcional para fêmeas com sensibilidade uretral).',
        'Cateter uretral estéril de calibre pré-selecionado (e um de calibre inferior de reserva).',
        'Estilete ou fio-guia metálico com revestimento de teflon (se utilizar cateteres de silicone extremamente maleáveis).',
        'Seringa de 5–10 mL para coleta imediata de urina e seringa com ÁGUA ESTÉRIL para insuflação do balão de Foley (se aplicável).',
        'Sistema fechado de drenagem urinária com bolsa graduada e válvula antirrefluxo.',
        'Espéculo vaginal bivalve pequeno ou cone de otoscópio esterilizado com fonte de luz halógena/LED (para visualização direta).',
        'Fio monofilamentar não absorvível (náilon 3-0 ou 4-0) e fita esparadrapo para fixação tipo asa de borboleta (butterfly tape).',
        'Colar elizabetano ajustado ao comprimento do focinho.'
      ]
    },

    { type: 'heading', level: 2, text: '5. Regra de Ouro: Medição Prévia do Comprimento 📏' },
    {
      type: 'paragraph',
      text:
        'Antes de lubrificar e introduzir qualquer sonda uretral, segure o dispositivo com o invólucro estéril fechado ou com luvas estéreis sobre a superfície externa do animal:'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'TRAJETO EXTERNO DE REFERÊNCIA',
      text:
        'Acompanhe o caminho: Rima vulvar → Assoalho vestibular → Uretra ventral → Sínfise púbica / Colo vesical.\n\n• Marque visualmente o comprimento correspondente no corpo do cateter.\n• O objetivo é que a ponta e os orifícios laterais da sonda ultrapassem o colo vesical em apenas 1 a 2 cm dentro da bexiga.\n• Cateteres introduzidos com excesso de comprimento dentro da cavidade vesical dobram-se sobre si mesmos, entram em contato irritativo crônico com o ápice da bexiga e, em casos graves, podem formar nós verdadeiros intravesicais que requerem cistotomia cirúrgica para remoção!'
    },

    { type: 'heading', level: 2, text: '6. Parte I — Cadela: Posicionamento e Preparo Asséptico 🐶' },
    {
      type: 'paragraph',
      text:
        'O posicionamento correto é responsável por 70% da facilidade do procedimento na cadela. Três posições são validadas na literatura:'
    },
    {
      type: 'steps',
      items: [
        'Decúbito lateral (decúbito lateral direito para operadores destros): excelente para a técnica de palpação digital. O membro pélvico superior é tracionado cranialmente e a cauda é refletida dorsalmente por um assistente. Permite grande conforto ergonômico ao clínico sentado ou em pé.',
        'Decúbito esternal com membros posteriores projetados além da borda da mesa: posição clássica descrita pelo BSAVA. A mesa de procedimentos apoia o abdome, enquanto os membros pélvicos pendem suavemente, abrindo o vestíbulo pélvico e relaxando a musculatura perineal.',
        'Decúbito dorsal com membros abduzidos ("frog-leg"): indicada principalmente quando se opta por visualização direta com espéculo vaginal ou otoscópio sob iluminação direta.'
      ]
    },
    {
      type: 'paragraph',
      text:
        'Preparo do paciente e antissepsia rigorosa:'
    },
    {
      type: 'steps',
      items: [
        'Sedação e controle de dor: cadelas conscientes e tensas contraem o esfíncter uretral externo estriado e a musculatura vestibular. A sedação com agonista alfa-2 adrenérgico (ex.: dexmedetomidina em microdose) associado a opioide puro ou sedação dissociativa proporciona relaxamento uretral e evita movimentos bruscos durante a manipulação.',
        'Tosa e higienização inicial: tose apenas pelos longos que encostem na comissura vulvar. Lave a região perivulvar e o períneo com água morna e sabão neutro para remover crostas e sujidades grosseiras.',
        'Antissepsia da mucosa: instile e lave o vestíbulo com solução aquosa de clorexidina a 0,05% ou PVPI tópico aquoso 1%. Remova o excesso com compressa de gaze estéril seca. NUNCA aplique clorexidina alcoólica ou álcool 70% na mucosa vestibular (causa dor química intensa, descamação e edema).',
        'Paramentação: calce luvas estéreis e posicione campos cirúrgicos estéreis sob a pelve e ao redor da vulva.'
      ]
    },

    { type: 'heading', level: 2, text: '7. Técnica Principal na Cadela: Palpação Digital ("Dedo como Teto") 👆' },
    {
      type: 'paragraph',
      text:
        'A técnica digital é a mais reproduzível, rápida e consagrada na rotina clínica hospitalar para cadelas de médio e grande porte. Segue rigorosamente a descrição do BSAVA Procedures (2024) e do VECC Procedures (2025):'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Lubrificação do dedo e entrada vestibular: lubrifique generosamente a luva cirúrgica estéril da sua mão não-dominante (geralmente a esquerda para destros). Introduza suavemente a ponta do dedo indicador pela rima vulvar, avançando ao longo do assoalho do vestíbulo em direção cranial.',
        'Passo 2 — Mapeamento do assoalho e localização da papila: deslize a polpa digital sobre o assoalho vestibular, mantendo leve pressão contra a sínfise púbica subjacente. A cerca de 2 a 5 cm da entrada (conforme o porte da cadela), você sentirá uma pequena saliência carnosa ou tubérculo arredondado contendo uma depressão/fenda central — é a papila uretral.',
        'Passo 3 — O dedo indicador vira "teto" (barreira dorsal): mantenha a polpa do seu indicador apoiada imediatamente sobre a face DORSAL da papila uretral. Nesse exato instante, seu dedo bloqueia fisicamente o canal vaginal cranial e isola o meato uretral no assoalho sob ele (dorsal = vagina bloqueada; ventral = orifício uretral aberto).',
        'Passo 4 — Condução da sonda sob o dedo: com a mão dominante estéril, segure o cateter uretral lubrificado a cerca de 3 a 5 cm da ponta. Introduza a ponta no vestíbulo e avance-a na linha média, encostada ao assoalho, correndo DIRETAMENTE SOB a superfície palmar do seu dedo indicador.',
        'Passo 5 — O "slip" intrauretral: ao tocar o meato na base da papila sob a polpa digital, incline delicadamente a ponta da sonda para baixo e para frente. Quando a ponta engata no meato, ocorre a nítida sensação tátil de que a sonda "caiu" ou "escorregou" para dentro de um túnel complacente, e a resistência ao avanço desaparece.',
        'Passo 6 — Como diagnosticar o erro clássico de trajetória: se você sentir a sonda deslizar cranialmente por cima do dorso do seu dedo ou continuar avançando 10–15 cm sem resistência e sem urina, o cateter passou reto para dentro da vagina! NÃO continue empurrando. Recue a sonda em 4 a 5 cm até que a ponta retorne sob a polpa do indicador, deprima o assoalho ventral e tente novamente.',
        'Passo 7 — Avanço vesical e refluxo urinário: uma vez dentro do meato, avance a sonda lenta e suavemente pela uretra até alcançar o comprimento pré-medido. Assim que a extremidade fenestrada transpor o colo vesical, a urina fluirá espontaneamente pelo conector da sonda.'
      ]
    },

    { type: 'heading', level: 2, text: '8. Técnica Alternativa na Cadela: Visualização com Espéculo ou Otoscópio 🔦' },
    {
      type: 'paragraph',
      text:
        'Indicada quando o clínico não consegue palpar com segurança a papila (ex.: vestíbulo edemaciado, estro recente, cadelas de porte pequeno onde o dedo indicador entra muito justo, ou alterações anatômicas cicatriciais):'
    },
    {
      type: 'steps',
      items: [
        'Posicionamento: posicione a cadela sedada em decúbito dorsal (posição de rã) ou decúbito esternal com a pelve na borda da mesa.',
        'Instrumento de visualização: utilize um espéculo vaginal bivalve pequeno esterilizado, um laringoscópio infantil estéril com lâmina reta (Miller), ou um cone longo de otoscópio esterilizado acoplado a uma fonte de luz potente.',
        'Introdução e direção: lubrifique a face externa do cone/espéculo. Introduza-o na vulva direcionado inicialmente em ângulo de 60° dorsocranialmente para ultrapassar a fossa do clitóris; em seguida, horizontalize o instrumento e avance-o paralelamente ao assoalho.',
        'Identificação do meato: abra suavemente as valvas do espéculo e ajuste o feixe de luz. Olhando diretamente para o assoalho do vestíbulo, procure uma projeção mucosa rósea em forma de botão ou crista com um orifício central em fenda (o meato uretral). Imediatamente dorsal e cranial à papila observa-se a luz ampla do canal vaginal.',
        'Passagem do cateter sob visão direta: mantendo o espéculo imóvel, introduza o cateter uretral lubrificado através do cone/valvas e guie a ponta diretamente para o interior do orifício da papila.',
        'Parada no refluxo: avance a sonda aproximadamente 1 a 2 cm após o início do fluxo urinário (Atlas of Canine and Feline Urinalysis 2017) e remova o espéculo delicadamente deslizando-o ao redor do cateter já fixado.'
      ]
    },

    { type: 'heading', level: 2, text: '9. Cadela Pequena (<10 kg): A Técnica dos Dois Cateteres ⭐' },
    {
      type: 'paragraph',
      text:
        'Em fêmeas pesando menos de 10 kg, o diâmetro do vestíbulo é comumente estreito demais para admitir o dedo indicador do veterinário sem trauma tecidual. Por outro lado, a sondagem "às cegas" tradicional apresenta baixa taxa de sucesso porque a sonda naturalmente tende a tomar a via vaginal mais ampla.'
    },
    {
      type: 'paragraph',
      text:
        'A técnica dos dois cateteres (Dual-Catheter Technique), descrita por Dornbusch et al. (JAVMA 2022 / Can Vet J), resolve esse desafio com extrema elegância e respaldo de ensaios clínicos controlados:'
    },
    {
      type: 'steps',
      items: [
        'Lógica biomecânica: em vez de usar o dedo indicador para bloquear a entrada da vagina, utiliza-se um cateter de grosso calibre para ocupar o canal vaginal dorsal e retificar o vestíbulo, deixando livre e exposto apenas o meato uretral ventral.',
        'Cateter 1 (Bloqueador Vaginal): selecione uma sonda Red Rubber ou cateter uretral de calibre grosso (18 Fr em cadelas <10 kg; 10 Fr em gatas). Lubrifique e introduza pelo vestíbulo, permitindo que ela siga espontaneamente a via dorsal mais fácil para o interior da vagina por 6 a 10 cm.',
        'Tração dorsal do Cateter 1: com a mão não-dominante, segure a extremidade externa da sonda vaginal e reflita-a suavemente em direção dorsal (para cima). Essa manobra oclui completamente o teto vaginal e traciona cranialmente a junção vestibulovaginal, expondo o assoalho ventral.',
        'Cateter 2 (Sonda Urinária Definitiva): selecione o cateter urinário flexível (8 Fr em cadelas <10 kg; 3,5–5 Fr em gatas). Lubrifique a ponta e introduza-o no vestíbulo correndo imediatamente POR BAIXO do cateter vaginal.',
        'Ângulo de ataque de 45°: mantenha o segundo cateter orientado estritamente na linha média e angulado em cerca de 45° contra o assoalho ventral. Realize micromovimentos exploratórios suaves; o cateter deslizará com facilidade para dentro do meato uretral.',
        'Confirmação e retirada do Cateter 1: assim que a urina fluir pelo Cateter 2, avance-o mais 1 cm, remova completamente o Cateter 1 (vaginal) e proceda à conexão do sistema coletor.'
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'EVIDÊNCIA CIENTÍFICA ROBUSTA (Dornbusch et al.)',
      text:
        'Em ensaio clínico com 39 fêmeas <10 kg, a taxa de sucesso com a técnica dos dois cateteres foi de 79,5% (31/39), comparada a apenas 43,6% (17/39) com técnicas convencionais às cegas. O tempo médio de sondagem caiu expressivamente. Além disso, em operadores inexperientes (alunos e residentes novatos), 8 de 9 operadores conseguiram sondar na PRIMEIRA tentativa com os dois cateteres (JAVMA / CVJ 2022). Adote essa técnica como padrão em fêmeas miniaturas!'
    },

    { type: 'heading', level: 2, text: '10. Casos Complexos na Cadela: Técnica de Fio-Guia / Seldinger Modificado 🪢' },
    {
      type: 'paragraph',
      text:
        'Cateteres de Foley confeccionados em silicone puro são extremamente macios e flexíveis — o que é excelente para o bem-estar e menor irritação da bexiga —, mas essa mesma maleabilidade torna extremamente difícil vencer o tônus esfincteriano da uretra sem que a sonda dobre.'
    },
    {
      type: 'paragraph',
      text:
        'Robben (Journal of Veterinary Emergency and Critical Care, 2020) padronizou a técnica de Seldinger modificada para sondagem uretral difícil em cadelas:'
    },
    {
      type: 'steps',
      items: [
        'Introdução de cateter guia semi-rígido: posiciona-se no meato uretral um cateter de polipropileno/polietileno fino ou cateter venoso estilete de pequeno calibre (fácil de conduzir pela papila).',
        'Passagem do fio-guia hidrofílico: avança-se um fio-guia vascular hidrofílico metálico (0,035" com ponta flexível em "J") através do cateter inicial até o interior da bexiga.',
        'Retirada do introdutor: remove-se o cateter semi-rígido, mantendo o fio-guia imóvel na luz vesical.',
        'Avanço do cateter Foley de silicone: a sonda Foley definitiva é montada sobre o fio-guia e deslizada suavemente através do meato até a bexiga.',
        'Retirada do fio-guia: confirma-se a saída de urina, retira-se o fio-guia e procede-se à insuflação do balão de retenção.'
      ]
    },

    { type: 'heading', level: 2, text: '11. Parte II — Gata: Particularidades Anatômicas e Sedação 🐱' },
    {
      type: 'paragraph',
      text:
        'A anatomia do trato urogenital inferior da gata segue o mesmo padrão da cadela, porém em escala milimétrica. A uretra felina feminina mede apenas cerca de 2 a 3 cm de comprimento total e tem diâmetro luminal reduzido, com mucosa extremamente frágil e propensa a espasmos.'
    },
    {
      type: 'steps',
      items: [
        'Sedação profunda ou anestesia geral obrigatória: o BSAVA Procedures (2024) enfatiza que tentar sondar uma gata acordada ou com contenção física simples é contraindicado — gera estresse extremo, movimentos bruscos, espasmo esfincteriano e alto risco de laceração uretral. Protocolos combinando butorfanol/buprenorfina com dexmedetomidina e cetamina em doses baixas, ou anestesia inalatória com máscara/TIVA propofol, são padrão-ouro.',
        'Posicionamento preferencial: decúbito lateral direito (para operadores destros) com o assistente tracionando a cauda dorsalmente e expondo amplamente a vulva. Alternativamente, decúbito esternal com uma toalha enrolada sob a pelve (elevando a bacia) e os membros pélvicos estendidos para trás.'
      ]
    },

    { type: 'heading', level: 2, text: '12. Técnica às Cegas na Gata (Passo a Passo) 🐾' },
    {
      type: 'paragraph',
      text:
        'A técnica às cegas felina bem executada baseia-se na retificação do vestíbulo e na orientação estritamente ventral da sonda:'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Antissepsia: faça higienização cuidadosa da vulva e da região perineal com solução aquosa de clorexidina 0,05%. Coloque luvas estéreis.',
        'Passo 2 — Tração caudal dos lábios vulvares: com os dedos indicador e polegar da mão não-dominante, apreenda delicadamente as bordas laterais da vulva e exerça tração suave em sentido CAUDAL (para trás). Essa manobra estica e retifica o vestíbulo vaginal, transformando o trajeto sinuoso em uma canaleta reta.',
        'Passo 3 — Lubrificação generosa: aplique gel hidrossolúvel estéril em toda a extensão distal do cateter (3,5 Fr ou 5 Fr, de preferência em poliuretano flexível com ponta romba).',
        'Passo 4 — Direção do cateter (para frente e para baixo): introduza a ponta do cateter pela comissura dorsal da vulva e avance-a direcionando imediatamente para o ASSOALHO VENTRAL na linha média, com uma angulação de 30° a 45°. A ponta deve correr raspando suavemente o assoalho.',
        'Passo 5 — O deslizamento pelo meato: mantenha leve pressão contínua para frente. Conforme o cateter desliza pelo assoalho, sua ponta engata na pequena depressão do meato uretral e "escorrega" espontaneamente para dentro da uretra.',
        'Passo 6 — Se houver resistência precoce (<1 cm): NUNCA force. Provavelmente a ponta está encostada na parede dorsal ou na fossa clitoridiana. Recue a sonda em 1 cm, reposicione-a rigorosamente na linha média do assoalho e reinsira.',
        'Passo 7 — Parada milimétrica: assim que surgir urina no hub do cateter, avance apenas cerca de 0,5 a 1 cm a mais (BSAVA 2024) e pare imediatamente! A bexiga da gata tem parede delgada; avançar 5 ou 6 cm de sonda causará irritação severa e dobra mecânica.'
      ]
    },

    { type: 'heading', level: 2, text: '13. Gata Difícil: Visualização com Cone de Otoscópio e Dois Cateteres 🔦' },
    {
      type: 'paragraph',
      text:
        'Se duas tentativas delicadas às cegas não resultarem em progressão, suspenda o procedimento às cegas para evitar trauma da mucosa e escolha uma das alternativas com respaldo visual ou mecânico:'
    },
    {
      type: 'steps',
      items: [
        'Visualização com cone de otoscópio estéril (Atlas of Canine and Feline Urinalysis 2017): esterilize cones finos de otoscópio em autoclave ou óxido de etileno. Sob sedação, lubrifique o cone e introduza-o delicadamente pela vulva. Com a luz do otoscópio direcionada ao assoalho ventral, visualize a pequena papila uretral. Introduza um cateter de 3,5 Fr através do interior do cone diretamente no meato sob controle visual contínuo.',
        'Técnica dos dois cateteres na gata: introduza um cateter 10 Fr Red Rubber para ocluir a vagina dorsalmente e tracioná-la para cima; em seguida, conduza um cateter uretral de 3,5 Fr ou 5 Fr sob ele a 45° em direção ao assoalho ventral (sucesso superior a 75% em fêmeas felinas).'
      ]
    },

    { type: 'heading', level: 2, text: '14. Confirmação do Posicionamento Vesical: O Que Fazer Quando a Urina Não Vem? 🧪' },
    {
      type: 'paragraph',
      text:
        'O padrão-ouro irrefutável de posicionamento vesical é o refluxo espontâneo ou a fácil aspiração de urina com seringa estéril acoplada ao conector da sonda. No entanto, a ausência imediata de fluxo NÃO descarta necessariamente o posicionamento intravesical correto:'
    },
    {
      type: 'steps',
      items: [
        'Bexiga previamente esvaziada: em pacientes com retenção funcional que miccionaram parcialmente antes da sedação ou que sofreram choque hipovolêmico com anúria/oligúria extrema, pode não haver urina disponível para refluxo.',
        'Oclusão dos orifícios fenestrados por sucção mucosa: a mucosa vesical vazia pode colabar sobre as fenestras laterais do cateter. Aspire suavemente com seringa de 5 mL.',
        'Teste de Flush Estéril com Salina: instile lentamente 3 a 5 mL de solução salina 0,9% estéril. Se a infusão correr sem qualquer resistência elástica e a totalidade do volume for reaspirada imediatamente com facilidade (geralmente tingida de urina), o cateter está com 100% de certeza dentro do lúmen vesical.',
        'Confirmação ultrassonográfica à beira-leito (POCUS): posicione o transdutor na região prepúbica. A presença da sonda de silicone é identificada como duas linhas hiperecogênicas paralelas no interior do lúmen anecoico da bexiga.',
        'Suspeita de ruptura vesical: em pacientes politraumatizados (atropelamentos, quedas), a ausência de urina associada a líquido livre abdominal pode indicar rotura de bexiga; realize abdominocentese e dosagem de creatinina no efluente peritoneal.'
      ]
    },

    { type: 'heading', level: 2, text: '15. Balão de Retenção Foley: O Erro Crítico que Não Pode Ocorrer ⚠️' },
    {
      type: 'paragraph',
      text:
        'A cateterização com sonda Foley de 2 ou 3 vias oferece retenção interna autônoma através de um balão inflável na extremidade distal. Todavia, a insuflação inadvertida do balão na luz da uretra é uma das complicações iatrogênicas mais catastróficas da medicina veterinária!'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'REGRAS MANDATÓRIAS DO BALÃO DE FOLEY',
      text:
        '1. JAMAIS insufle o balão antes de aspirar urina livremente: a saída de urina comprova que os orifícios da sonda alcançaram o lúmen vesical.\n\n2. Avance mais 1 a 2 cm APÓS a urina sair: o balão inflável situa-se cerca de 1 cm ATRÁS dos orifícios de drenagem. Se você inflar no momento exato em que a urina surge, o balão ainda pode estar no colo vesical ou na uretra proximal!\n\n3. NUNCA utilize ar para insuflar o balão: o ar flutua no teto da bexiga, não ancora adequadamente no colo e pode vazar através da membrana do balonete.\n\n4. NUNCA utilize solução salina (NaCl 0,9%): os cristais de cloreto de sódio precipitam na microválvula e no canal capilar de insuflação ao longo dos dias, impedindo a desinsuflação posterior e exigindo punção guiada por ultrassom para desarmar o balão!\n\n5. Utilize SEMPRE ÁGUA DESTILADA / ESTÉRIL: use exatamente o volume gravado pelo fabricante no funil lateral da sonda (ex.: 3 mL ou 5 mL).\n\n6. Tracione suavemente após insuflar: puxe o cateter devagar até sentir resistência suave de ancoragem contra o colo vesical.'
    },

    { type: 'heading', level: 2, text: '16. Ilustração Técnica: Montagem do Sistema Fechado e Prevenção de ITU 📸' },
    {
      type: 'paragraph',
      text:
        'O esquema a seguir detalha a conexão do circuito fechado estéril, o posicionamento gravitacional da bolsa coletora e os princípios fundamentais de controle de infecção preconizados pelo consenso internacional ISCAID e iCatCare:'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/sondagem-sistema-fechado-coleta.svg',
      alt: 'Diagrama técnico de montagem do sistema fechado de drenagem urinária e prevenção de ITU baseada no ISCAID e iCatCare.',
      caption:
        'Figura 2: Sistema fechado de drenagem urinária e prevenção de ITU associada ao cateter (CAUTI). O circuito fechado com válvula antirrefluxo deve permanecer SEMPRE abaixo do leito do paciente e NUNCA em contato direto com o chão hospitalar. Coletas para urocultura devem ser feitas exclusivamente pela porta de amostragem desinfetada com álcool 70%. Antibióticos profiláticos são estritamente contraindicados (ISCAID 2019).'
    },

    { type: 'heading', level: 2, text: '17. Montagem e Fixação do Sistema Fechado de Drenagem 🛡️' },
    {
      type: 'paragraph',
      text:
        'Uma vez posicionada e confirmada a sonda uretral de permanência, o manejo do sistema de drenagem dita o prognóstico infeccioso do paciente internado:'
    },
    {
      type: 'steps',
      items: [
        'Fixação externa atraumática (Butterfly Tape): aplique uma tira de esparadrapo cirúrgico impermeável ao redor do corpo da sonda a cerca de 2 cm da vulva, formando uma "asa de borboleta". Suture as abas da fita à pele perineal lateral ou lábios vulvares com fio de náilon 3-0 ou 4-0 em padrão isolado simples. Em gatas, tiras de fita fixadas à base da cauda fornecem alívio de tração adicional.',
        'Circuito fechado ininterrupto: acople o conector da sonda diretamente ao extensor estéril da bolsa coletora urinária graduada comercial (dotada de câmara graduada e válvula antirrefluxo unidirecional). Se indisponível, monte uma bolsa de infusão IV vazia estéril conectada a um equipo macrogotas fechado, mantendo a conexão rigorosamente selada.',
        'Gravidade e desnível permanente: a bolsa coletora DEVE permanecer continuamente posicionada ABAIXO do nível da bexiga do paciente para garantir drenagem livre e evitar pressão hidrostática retrógrada.',
        'NUNCA apoiar a bolsa no chão: o piso da enfermaria veterinária é densamente colonizado por patógenos nosocomiais multirresistentes (ex.: Pseudomonas aeruginosa, Klebsiella pneumoniae, Staphylococcus aureus meticilina-resistente). Suspenda a bolsa em suportes de leito ou acondicione-a em caixas plásticas suspensas.',
        'Colar elizabetano mandatório: a remoção traumática da sonda com o balão de Foley ainda insuflado pelo próprio paciente gera laceração uretral catastrófica. O colar deve ser mantido 24 horas por dia.'
      ]
    },

    { type: 'heading', level: 2, text: '18. Prevenção de ITU Hospitalar Associada ao Cateter (CAUTI) — Diretrizes ISCAID 2019 🔬' },
    {
      type: 'paragraph',
      text:
        'A infecção do trato urinário associada ao cateter (CAUTI) é a infecção hospitalar mais prevalente em unidades de terapia intensiva veterinária. O consenso internacional da ISCAID (International Society for Companion Animal Infectious Diseases, 2019) e o consenso felino iCatCare (2025) estabelecem diretrizes estritas:'
    },
    {
      type: 'table',
      headers: ['Prática Avaliada', 'Recomendação ISCAID / iCatCare', 'Justificativa Científica e Evidência'],
      rows: [
        [
          'Antibiótico Profilático de Rotina',
          'NUNCA ADMINISTRAR ❌',
          'Não previne bacteriúria nem ITU clínica; apenas seleciona biofilmes de bactérias nosocomiais multirresistentes de difícil controle.'
        ],
        [
          'Bacteriúria Assintomática',
          'NÃO TRATAR COM ANTIBIÓTICO ❌',
          'Entre 10% e 55% dos animais sondados desenvolvem colonização bacteriana sem lesão tecidual. Tratar apenas se houver sinais clínicos de cistite/pielonefrite (febre, dor abdominal, leucocitose).'
        ],
        [
          'Cultura da Ponta da Sonda Removida',
          'NÃO RECOMENDADA ❌',
          'A ponta reflete apenas o biofilme aderido ao polímero sintético e flora do vestíbulo, e NÃO infecção bacteriana da parede vesical.'
        ],
        [
          'Cultura de Urina da Bolsa Coletora',
          'CONTRAINDICADA ❌',
          'A urina estagnada na bolsa é invariavelmente colonizada por contaminação externa retrógrada e bactérias do ambiente hospitalar.'
        ],
        [
          'Coleta Correta para Urocultura',
          'Porta Estéril com Álcool 70% ou Cistocentese',
          'Desinfete a borracha da porta de amostragem proximal com álcool 70% por 30s e colha com agulha 26G e seringa estéril.'
        ],
        [
          'Troca de Sonda por Calendário Fixo',
          'NÃO RECOMENDADA ❌',
          'Trocar a cada 48h ou 72h apenas aumenta o trauma uretral mecânico e inocula bactérias a cada nova instrumentação.'
        ],
        [
          'Tempo de Permanência do Cateter',
          'MÍNIMO POSSÍVEL (Revisão Diária)',
          'O risco de bacteriúria aumenta cerca de 10% a 15% por dia de cateterização. Remova a sonda imediatamente assim que o paciente estabilizar.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '19. Quando Parar Imediatamente e Reavaliar 🚨' },
    {
      type: 'paragraph',
      text:
        'A insistência em manobras cegas sob resistência mecânica é o mecanismo causal de quase todas as rupturas uretrais iatrogênicas. Interrompa as tentativas de sondagem se:'
    },
    {
      type: 'steps',
      items: [
        'Resistência mecânica firme ou sensação de obstáculo rígido que não cede à pressão suave.',
        'Hemorragia ativa e contínua pelo meato uretral ou vestíbulo vulvar.',
        'Reação álgica aguda da paciente mesmo sob protocolo de sedação considerado adequado.',
        'Mais de 2 a 3 tentativas frustradas com perda da assepsia ou edema vulvar progressivo.',
        'Suspeita clínica de estenose uretral cicatricial ou cálculo uretral impactado.',
        'Suspeita de laceração ou rotura uretral prévia (ex.: histórico de atropelamento pélvico recente).'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'SEQUÊNCIA INTELIGENTE DE RESGATE',
      text:
        'Parar manobras forçadas → Aprofundar sedação/analgesia → Trocar para técnica de visualização direta (otoscópio/espéculo) → Aplicar técnica dos dois cateteres (<10 kg) → Realizar ultrassonografia vesical e avaliação pélvica → Se retenção urinária grave e impossibilidade de transpor a uretra, realizar CISTOCENTESE DESCOMPRESSIVA de alívio com agulha 22G e seringa/extensor, ou indicar tubo de cistostomia pré-púbica temporária.'
    },

    { type: 'heading', level: 2, text: '20. Tabela de Troubleshooting Clínico Rápido ⚙️' },
    {
      type: 'paragraph',
      text:
        'Resolução objetiva para as intercorrências mais frequentes na cateterização de cadelas e gatas:'
    },
    {
      type: 'table',
      headers: ['Intercorrência Observada', 'Causa Mais Provável', 'Conduta Imediata Recomendada'],
      rows: [
        [
          'A sonda entra profundamente (>10 cm no cão; >5 cm no gato), mas não sai urina',
          'A sonda penetrou no canal vaginal dorsal (caminho errado mais comum)',
          'Recue a sonda em 4–6 cm até que a ponta retorne ao vestíbulo. Redirecione a ponta estritamente para o assoalho ventral sob o dedo ou use técnica dos dois cateteres.'
        ],
        [
          'Sonda avança além do dedo indicador do clínico na cadela',
          'A sonda passou por cima da papila uretral e entrou na vagina',
          'Recue 3 cm. Mantenha a polpa do indicador firmemente apoiada sobre a papila e passe o cateter sob a superfície palmar do dedo.'
        ],
        [
          'Na gata, o cateter sempre desvia para a vagina',
          'Vetor de inserção muito dorsal ou vestíbulo sinuoso colapsado',
          'Tracionar os lábios vulvares caudalmente com os dedos. Manter a ponta da sonda raspando o assoalho ventral em ângulo de 30° a 45°.'
        ],
        [
          'Impossibilidade de palpar a papila uretral pelo toque digital',
          'Paciente pequena (<10 kg), excesso de gordura ou edema de mucosa',
          'Não insista às cegas. Utilize visualização direta com cone de otoscópio estéril ou aplique a técnica dos dois cateteres (Dornbusch).'
        ],
        [
          'Cateter de silicone flexível dobra e não vence o esfíncter',
          'Material excessivamente mole ou espasmo esfincteriano estriado',
          'Utilize cateter com estilete/fio-guia metálico teflonado rígido (sem ultrapassar a ponta) ou técnica de Seldinger modificada.'
        ],
        [
          'Urina saiu inicialmente no hub, mas cessou após avançar',
          'A ponta encostou na parede vesical cranial ou dobrou-se',
          'Recue a sonda delicadamente em 1 a 2 cm. Aspire com seringa ou faça flush de teste com 3 mL de salina estéril.'
        ],
        [
          'O circuito fechado parou de drenar urina na internação',
          'Dobra na extensão, bolsa acima do nível da bexiga ou coágulo na luz',
          'Verifique todo o circuito físico (bolsa suspensa, sem dobras, nivelada abaixo da bexiga) antes de presumir oligúria hemodinâmica. Se ocluída por coágulo/sedimento, faça lavagem suave estéril.'
        ],
        [
          'Presença de sangue no cateter após tentativas frustradas',
          'Trauma e laceração mecânica da mucosa uretral ou vestibular',
          'Interrompa imediatamente novas tentativas. Administre analgesia e realize avaliação ultrassonográfica para checar integridade uretral.'
        ],
        [
          'O cateter Foley foi expelido espontaneamente',
          'Balão subinsuflado, colo vesical dilatado ou ruptura do balonete',
          'JAMAIS reinfle o balão às cegas. Examine o cateter expelido para checar integridade e reinicie a sondagem estéril do zero se mantida a indicação.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '21. Fluxograma de Decisão Clínica para Sondagem em Fêmeas 🔄' },
    {
      type: 'flowchart',
      title: 'Fluxo Decisório na Cateterização Uretral em Cadelas e Gatas',
      nodes: [
        { id: 'ind', label: 'Indicação clínica definida (Débito urinário / Retenção / Cirurgia)', variant: 'start' },
        { id: 'prep', label: 'Sedação profunda/relaxamento + Medição prévia + Antissepsia aquosa', variant: 'action' },
        { id: 'spec', label: 'Espécie e Porte do Paciente', variant: 'decision' },
        { id: 'dog_lg', label: 'Cadela Média/Grande (>10 kg): Palpação Digital ("Dedo Teto")', variant: 'action' },
        { id: 'small', label: 'Cadela Pequena (<10 kg) ou Gata: Dedo não cabe', variant: 'action' },
        { id: 'two_cat', label: 'Técnica dos Dois Cateteres (Vaginal 18/10 Fr + Uretral 8/5 Fr)', variant: 'action' },
        { id: 'cat_blind', label: 'Gata: Tração vulvar caudal + Sondagem 30-45° ventral', variant: 'action' },
        { id: 'flow', label: 'Refluxo espontâneo ou aspiração de urina?', variant: 'decision' },
        { id: 'foley', label: 'Avançar +1–2 cm → Insuflar Foley c/ Água Estéril → Tracionar suave', variant: 'action' },
        { id: 'vis', label: 'Parar às cegas! Visualização com Cone de Otoscópio / Espéculo', variant: 'action' },
        { id: 'sys', label: 'Sistema Fechado: Bolsa abaixo do leito, fora do chão + Sem ATB profilático', variant: 'end' }
      ],
      edges: [
        { from: 'ind', to: 'prep' },
        { from: 'prep', to: 'spec' },
        { from: 'spec', to: 'dog_lg', label: '> 10 kg' },
        { from: 'spec', to: 'small', label: '< 10 kg / Felino' },
        { from: 'dog_lg', to: 'flow' },
        { from: 'small', to: 'two_cat', label: '1ª Escolha <10 kg' },
        { from: 'small', to: 'cat_blind', label: 'Opção Gata' },
        { from: 'two_cat', to: 'flow' },
        { from: 'cat_blind', to: 'flow' },
        { from: 'flow', to: 'foley', label: 'Sim (Urina)' },
        { from: 'flow', to: 'vis', label: 'Não / Resistência' },
        { from: 'vis', to: 'flow' },
        { from: 'foley', to: 'sys' }
      ]
    },

    { type: 'heading', level: 2, text: '22. Box de Bolso — Checklist de Ouro do Plantão 📋' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'CHECKLIST DE BOLSO DO PLANTÃO — SONDAGEM DE FÊMEAS 🩺',
      text:
        '1. INDICAÇÃO: Débito urinário quantitativo, retenção, pós-trauma ou cirurgia. Não sondar fêmeas estáveis apenas para urinálise simples ou urocultura (prefira cistocentese!).\n\n2. ANATOMIA: O meato uretral está no ASSOALHO VENTRAL do vestíbulo, cranial à fossa clitoridiana. Se a sonda for para o canal amplo dorsal, entrou na vagina.\n\n3. MEDIÇÃO: Meça externamente da vulva ao colo vesical antes de inserir. Evite excesso de sonda dentro da bexiga (risco de nós verdadeiros e trauma na parede).\n\n4. CADELA >10 kg: Posicione o indicador na face dorsal da papila uretral como um "teto". A sonda avança sob a polpa digital até cair no meato.\n\n5. PACIENTES <10 kg E GATAS: Use a técnica dos dois cateteres (Dornbusch). O cateter vaginal grosso oclui o teto dorsal; o cateter uretral menor avança ventralmente a 45° com 80% de êxito.\n\n6. GATA: Sedação profunda mandatória. Tracione os lábios vulvares caudalmente e mantenha o cateter rigorosamente no assoalho ventral. Pare após 2 tentativas e use otoscópio.\n\n7. FOLEY INTRAVESICAL: NUNCA insufle o balão antes de aspirar urina e avançar mais 1 a 2 cm. Use SOMENTE ÁGUA ESTÉRIL (salina cristaliza e ar flutua!).\n\n8. CIRCUITO FECHADO: Bolsa coletora graduada SEMPRE abaixo do paciente e NUNCA repousando no chão.\n\n9. CONTROLE DE ITU (ISCAID 2019): SEM antibiótico profilático! Não cultivar a ponta da sonda nem urina da bolsa. Colher urocultura somente na porta estéril desinfetada com álcool 70%.'
    },

    { type: 'heading', level: 2, text: '23. Referências Técnicas e Bibliográficas 📚' },
    {
      type: 'paragraph',
      text:
        'O conteúdo deste guia foi estruturado com base nas diretrizes internacionais mais recentes de urologia, emergência e terapia intensiva veterinária:'
    },
    {
      type: 'steps',
      items: [
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Urethral catheterization – (b) bitch: pp. 286–289; (e) queen: pp. 294–296. (Referência primária para posicionamento, técnica digital e abordagem felina).',
        'Johnson CA, ed. Veterinary Emergency and Critical Care Procedures. 3rd ed. Wiley-Blackwell; 2025. Chapter 6: Urinary Catheter Placement, Urohydropulsion, and Temporary Antepubic Cystostomy Catheter Placement — bitch: pp. 181–186; queen: pp. 191–194.',
        'Dornbusch JA, et al. A dual-catheter technique is more effective than a traditional blind technique for urethral catheterization in female dogs weighing less than 10 kg: A randomized controlled trial. J Am Vet Med Assoc (JAVMA). 2022;260(S3):S42–S47. / Can Vet J. 2022.',
        'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8–25. (Diretrizes globais sobre prevenção de CAUTI, uso racional de antimicrobianos e bacteriúria).',
        'Sparkes AH, et al. ISFM/iCatCare Consensus Guidelines on the Diagnosis and Management of Feline Lower Urinary Tract Disease. J Feline Med Surg. 2025;27(1):1098612X241309176. (Padronização de sistemas fechados de coleta e alívio gravitacional).',
        'Robben JH. Modified Seldinger technique for urethral catheterization using a soft Foley catheter in female dogs. J Vet Emerg Crit Care. 2020;30(5):597–600.',
        'Zatelli A, D’Ippolito P. Atlas of Canine and Feline Urinalysis. Wiley-Blackwell; 2017. Chapter 1: Urine Collection Methods — Catheterization in female dogs and cats using otoscopic cones, pp. 25–30.',
        'Silverstein DC, Hopper K, eds. Small Animal Critical Care Medicine. 3rd ed. Elsevier; 2023. Chapter 89: Monitoring Urine Output and Urinary Catheter Management in the ICU, pp. 485–492.',
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019. Chapter 187: Urethral Catheterization — indications, materials, Foley management, pp. 1211–1218.'
      ]
    }
  ],
  isPublished: true
};


/**
 * Guia: Coleta de líquor (LCR / CSF) em cães e gatos.
 * Conteúdo técnico avançado de neurologia, medicina intensiva e procedimentos.
 * Referências: BSAVA Procedures (2024), Nelson & Couto (2020), de Lahunta (2021), Danciu et al. (JVIM 2025), Sivolapenko et al. (2022).
 */
const guiaColetaLiquor: ClinicalQuickGuide = {
  id: 'cqg-coleta-liquor-008',
  slug: 'coleta-liquor-lcr-caes-gatos',
  title: 'Coleta de líquor (LCR / CSF) em cães e gatos',
  subtitle:
    'Neurologia & Procedimentos — Punção cisternal (cisterna magna) e lombar (L5–L6 / L6–L7), prevenção de herniação cerebral, manejo da amostra e citologia',
  summary:
    'Guia completo para punção do espaço subaracnoide em cães e gatos: anatomia da cisterna cerebelomedular e espaço lombar, landmarks do triângulo atlanto-occipital, regras vitais de segurança contra herniação encefálica (Danciu 2025), técnica de gotejamento passivo sem aspiração, preservação da amostra em 30–60 min e interpretação citológica laboratorial.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'coleta de liquor',
    'liquido cefalorraquidiano',
    'lcr',
    'csf',
    'puncao cisterna magna',
    'puncao atlanto-occipital',
    'puncao lombar',
    'srma',
    'meningoencefalite',
    'muo',
    'gme',
    'pleocitose',
    'dissociacao albuminocitologica',
    'herniacao cerebral',
    'pressao intracraniana',
    'cavalier king charles chiari',
    'espinhal lombar',
    'espaco subaracnoide',
    'citologia liquor'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/coleta-liquor-lcr-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de coleta de líquor (lcr / csf) em cães e gatos: materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'O alvo da agulha é o espaço subaracnoide (Cisterna Cerebelomedular ou espaço lombar): a ponta NUNCA deve penetrar o parênquima do tronco encefálico ou medula espinhal.',
    'Pergunta vital prévia: "Este paciente pode herniar se eu retirar LCR?" Se houver suspeita de hipertensão intracraniana ou efeito de massa, realize imagem prévia e postergue a coleta.',
    'JAMAIS aspire líquor com seringa: o fluxo deve ser estritamente passivo (a pressão negativa atrai a medula para a ponta da agulha e precipita herniação caudal).',
    'Cavalier King Charles Spaniel: alta prevalência de malformação semelhante a Chiari com deslocamento do cerebelo; sem RM prévia mostrando espaço livre, prefira a via lombar.',
    'O relógio corre contra a amostra: processe ou preserve a citologia em 30–60 minutos (ambiente hipoproteico causa lise e degeneração celular acelerada).'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. A Ideia Central e Anatomia do Espaço Subaracnoide 🧠' },
    {
      type: 'paragraph',
      text:
        'A coleta de líquido cefalorraquidiano (LCR ou CSF) é uma das ferramentas diagnósticas mais valiosas da neurologia veterinária para investigar afecções inflamatórias, infecciosas e neoplásicas do sistema nervoso central (SNC). No entanto, diferencia-se da maioria dos procedimentos ambulatoriais por uma razão crítica: uma punção realizada no paciente inadequado ou com avanço milimétrico excessivo da agulha pode resultar em laceração direta do tronco encefálico, hemorragia do SNC ou herniação cerebral fatal.'
    },
    {
      type: 'paragraph',
      text:
        'O líquor é produzido predominantemente pelos plexos coroideus nos ventrículos encefálicos, circula pelo sistema ventricular e ganha o espaço subaracnoide, situado entre as leptomeninges:'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'ANATOMIA DAS CAMADAS MENÍNGEAS',
      text:
        'Dura-máter (externa, fibrosa) → Aracnoide (intermediária) → ESPAÇO SUBARACNOIDE COM LCR → Pia-máter (aderida ao parênquima neural) → Medula / Encéfalo.\n\n• O objetivo cirúrgico da agulha é parar dentro do espaço subaracnoide.\n• Ela JAMAIS deve atravessar a pia-máter ou tocar a substância nervosa.'
    },
    {
      type: 'paragraph',
      text:
        'Fisiologia e dinâmica de circulação liquórica (Cunningham 2020):'
    },
    {
      type: 'steps',
      items: [
        'Taxa de produção contínua: aproximadamente 3 mL/hora no cão e cerca de 1 mL/hora no gato.',
        'Sentido de fluxo craniocaudal: o LCR circula do compartimento intracraniano em direção à medula espinhal caudal. Por isso, uma amostra coletada caudalmente a uma lesão focal medular tende a refletir com muito maior fidelidade as alterações inflamatórias/celulares daquela lesão do que uma amostra cisternal cranial.',
        'Cisterna Cerebelomedular (Cisterna Magna): é uma dilatação natural do espaço subaracnoide localizada na transição entre o aspecto caudal do cerebelo, a medula oblonga (tronco encefálico) e o arco dorsal do atlas (C1). Por ser a cavidade liquórica mais ampla e acessível, constitui o local clássico de escolha em cães e gatos.'
      ]
    },

    { type: 'heading', level: 2, text: '2. Quando Vale a Pena Coletar LCR? Indicações Clínicas 🎯' },
    {
      type: 'paragraph',
      text:
        'O LCR é um exame de refinamento e caracterização de processos patológicos ativos do SNC. Suas indicações clássicas incluem:'
    },
    {
      type: 'steps',
      items: [
        'Suspeita de meningoencefalite de origem desconhecida (MUO): incluindo granulomatosa (GME), necrosante (NME) e leucoencefalite necrosante (NLE).',
        'Suspeita de arterite responsiva a corticosteroides (SRMA): febre de origem indeterminada associada a dor cervical severa, hiperestesia e leucocitose periférica.',
        'Meningoencefalomielites infecciosas: cinomose, toxoplasmose, neosporose, criptococose, peritonite infecciosa felina (PIF neurológica), infecções bacterianas e fúngicas.',
        'Investigação de neoplasias do SNC: particularmente linfoma do SNC e carcinomatose meníngea (células neoplásicas esfoliam diretamente no líquor).',
        'Pacientes neurológicos em que o exame clínico associado à imagem (TC/RM) não forneceu diagnóstico conclusivo ou quando a confirmação inflamatória é indispensável antes de instituir imunossupressão pesada.'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'LIMITAÇÃO CLÍNICA: O LCR RARAMENTE FECHA ETIOLOGIA SOZINHO',
      text:
        'O de Lahunta (2021) e Nelson & Couto (2020) enfatizam que o líquor é altamente sensível à presença de doença no SNC, mas tem especificidade etiológica limitada:\n\n• Pleocitose mononuclear NÃO é sinônimo exclusivo de MUO (pode ocorrer em cinomose crônica, PIF ou neoplasia).\n• Pleocitose neutrofílica NÃO significa obrigatoriamente bactéria (é o achado cardinal da SRMA, uma afecção estritamente autoimune e estéril).\n• Dissociação albuminocitológica (proteína alta com células normais) ocorre tanto em neoplasias quanto em compressões mecânicas crônicas por hérnia de disco.'
    },

    { type: 'heading', level: 2, text: '3. A Pergunta Mais Importante: "Este Paciente Pode Herniar?" 🚨' },
    {
      type: 'paragraph',
      text:
        'Esta pergunta deve ser respondida antes mesmo de desembalar a agulha de punção! A remoção de líquor altera abruptamente o gradiente de pressão hidrostática entre os compartimentos intracraniano e espinhal.'
    },
    {
      type: 'paragraph',
      text:
        'Em um encéfalo normal e complacente, a retirada de pequeno volume de LCR é compensada instantaneamente. Porém, se houver efeito de massa (tumor intracraniano), edema cerebral difuso grave ou obstrução ao fluxo liquórico (hidrocefalia obstrutiva), a pressão intracraniana (PIC) estará perigosamente elevada. A descompressão súbita no forame magno gera um vetor de sucção caudal que desloca o cerebelo e o tronco encefálico através do forame magno (herniação cerebelar/foraminal) ou do tentório (herniação transtentorial).'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'EVIDÊNCIA CIENTÍFICA: COMPLICAÇÕES MAIORES E PIC (Danciu et al. JVIM 2025)',
      text:
        'Em uma coorte monumental de 7.545 coletas de LCR em cães, complicações maiores ocorreram em apenas 0,15% (11 cães) — comprovando que o procedimento é seguro nas mãos de clínicos treinados. Contudo, quando a complicação ocorreu, a mortalidade foi altíssima. Os fatores comuns entre os pacientes que complicaram incluíram: alteração prévia de consciência, apagamento de sulcos na RM, desvio de linha média e herniação foraminal incipiente antes da punção. Portanto, em encefalopatas, a regra é: NEUROIMAGEM PRIMEIRO → PUNCIONAR DEPOIS (se seguro).'
    },

    { type: 'heading', level: 2, text: '4. Documentação de Imagem: Herniação de Tronco Encefálico Pós-Coleta 📸' },
    {
      type: 'paragraph',
      text:
        'A ressonância magnética abaixo (Danciu et al. 2025, publicação Open Access CC BY 4.0) demonstra o mecanismo patológico da complicação fatal quando a coleta é realizada sob gradiente pressórico patológico:'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/danciu-2025-herniacao-pos-lcr.jpg',
      alt: 'Ressonância magnética sagital de cão demonstrando herniação do verme cerebelar através do forame magno após coleta de líquor.',
      caption:
        'Figura 1: Ressonância magnética sagital (Danciu et al. JVIM 2025, licença CC BY 4.0). As imagens pré-coleta demonstravam compressão dos espaços liquóricos encefálicos e ventriculomegalia. A imagem pós-coleta revela deslocamento e herniação caudal evidente do ápice do verme cerebelar através do forame magno contra o arco dorsal do atlas, comprimindo a medula oblonga.'
    },

    { type: 'heading', level: 2, text: '5. Contraindicações Formais à Punção Cisternal ⛔' },
    {
      type: 'paragraph',
      text:
        'A presença de qualquer um dos achados abaixo contraindica a punção cisternal ou exige estabilização prévia e reconsideração da indicação:'
    },
    {
      type: 'steps',
      items: [
        'Sinais clínicos de Hipertensão Intracraniana (HIC) severa: estupor ou coma progressivo, anisocoria recente ou pupilas fixas e dilatadas, postura de descerebração (opistótono com quatro membros rígidos), padrão respiratório de Cheyne-Stokes ou apneia, e a Tríade de Cushing (hipertensão arterial associada a bradicardia reflexa).',
        'Instabilidade atlantoaxial (subluxação AA): extremamente prevalente em raças miniaturas/toy (Yorkshire, Chihuahua, Maltês). A flexão cervical a 90° requerida para a punção pode colabar o arco do atlas sobre o tronco e lacerar a medula espinhal pelo dente do áxis!',
        'Fraturas ou luxações vertebrais cervicais: risco imediato de transecção medular durante a manipulação posicional.',
        'Coagulopatias sistêmicas ou trombocitopenia severa (<30.000–50.000 plaquetas/µL): risco de hemorragia incontrolável do plexo venoso vertebral interno com compressão e hematomielia.',
        'Infecção cutânea, abscesso ou celulite no sítio de punção: inoculação bacteriana direta no espaço subaracnoide gerando meningite iatrogênica.',
        'Risco anestésico inaceitável ou instabilidade hemodinâmica descompensada.'
      ]
    },

    { type: 'heading', level: 2, text: '6. Alerta Crítico de Raça: Cavalier King Charles Spaniel 🐶' },
    {
      type: 'paragraph',
      text:
        'O Cavalier King Charles Spaniel (CKCS) possui predisposição genética altíssima para a Malformação semelhante a Chiari (Chiari-like Malformation — CM). O occipital hipoplásico resulta em fossa caudal reduzida e ectopia/herniação caudal do verme cerebelar em direção ao forame magno.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'A ANATOMIA MUDA COM A FLEXÃO CERVICAL (Sivolapenko et al. 2022)',
      text:
        'Estudo em cães submetidos a RM com o pescoço flexionado a 90° revelou que:\n\n• 56% (23/41) apresentaram herniação cerebelar foraminal durante a flexão.\n• Em 29% (12/41), a trajetória retilínea da agulha de punção cruzaria DIRETAMENTE o parênquima do verme cerebelar!\n\n• RECOMENDAÇÃO BSAVA (2024): Em cães da raça Cavalier King Charles Spaniel sem exame prévio de RM atestando espaço subaracnoide cisternal amplo e seguro, EVITE A PUNÇÃO CISTERNAL ÀS CEGAS e opte preferencialmente pela via LOMBAR.'
    },

    { type: 'heading', level: 2, text: '7. Cisternal vs. Lombar: Qual Sítio Escolher? ⚖️' },
    {
      type: 'paragraph',
      text:
        'A seleção criteriosa entre a punção cisternal cerebelomedular e a punção subaracnoide lombar impacta diretamente o rendimento diagnóstico e a segurança do procedimento:'
    },
    {
      type: 'table',
      headers: ['Suspeita Clínica / Cenário', 'Sítio Recomendado', 'Justificativa Fisiopatológica e Técnica'],
      rows: [
        [
          'Encefalopatia / Meningoencefalite (MUO, PIF, Cinomose)',
          'Cisterna Cerebelomedular',
          'Amostra cranial direta do encéfalo; espaço amplo com fluxo abundante e baixa contaminação'
        ],
        [
          'Cervicalgia / Suspeita de SRMA aguda',
          'Cisterna (± Lombar)',
          'Cisterna é o sítio primário; a coleta simultânea nos dois sítios aumenta a sensibilidade diagnóstica'
        ],
        [
          'Mielopatia Toracolombar ou Lombossacra (Lombar focal)',
          'Punção Lombar',
          'O fluxo craniocaudal carreia citocinas e células da lesão para o espaço caudal a ela'
        ],
        [
          'Cavalier King Charles Spaniel ou Chiari suspeito',
          'Punção Lombar',
          'Evita o risco de penetrar o cerebelo ectópico no forame magno durante a flexão cervical'
        ],
        [
          'Suspeita de Hipertensão Intracraniana / Lesão de Fossa Caudal',
          'Punção Lombar (com cautela)',
          'Menor risco de precipitar herniação foraminal aguda do que a punção suboccipital direta'
        ],
        [
          'Falha técnica cisternal (3 tentativas frustradas)',
          'Migrar para Punção Lombar',
          'Evita insistência lesiva na transição bulbomedular'
        ]
      ]
    },
    {
      type: 'paragraph',
      text:
        'Dados comparativos da literatura (Fentem et al. / Vet Record): em estudo prospectivo com 102 cães, a taxa de sucesso da punção cisternal foi de 95,8%, com fluxo rápido e menor contaminação por sangue, enquanto a punção lombar atingiu 86,1% de sucesso, demandando maior tempo e paciência do operador.'
    },

    { type: 'heading', level: 2, text: '8. Materiais e Equipamentos Obrigatórios 🩺' },
    {
      type: 'paragraph',
      text:
        'A coleta de LCR exige técnica estéril estrita de nível cirúrgico. Tenha todos os itens reunidos antes de induzir a anestesia:'
    },
    {
      type: 'steps',
      items: [
        'Anestesia geral balanceada e monitoramento multiparamétrico: capnografia, oximetria de pulso, ECG e pressão arterial não invasiva são vitais. A intubação orotraqueal é obrigatória. Utilize tubo aramado/reforçado para evitar oclusão da luz traqueal durante a flexão cervical a 90°.',
        'Agulhas espinais estéreis com mandril (estilete interno): NUNCA utilize agulhas hipodérmicas convencionais sem estilete (o bisel oco corta um "core" de pele e tecido subcutâneo, transportando bactérias e queratina para o espaço subaracnoide, e gera oclusão precoce por coágulo).',
        'Gatos e cães pequenos/médios (<15 kg): agulha espinal 22G × 1,5 polegadas (3,8 cm). Em gatos e cães toy, a cisterna pode situar-se a apenas alguns milímetros da pele!',
        'Cães grandes (>15–25 kg): agulha espinal 20G ou 22G × 1,5 a 2,5 polegadas.',
        'Cães gigantes (>40 kg): agulha espinal 20G ou 22G × 3,0 a 3,5 polegadas.',
        'Material de assepsia e paramentação: luvas estéreis cirúrgicas, campo fenestrado estéril, clorexidina degermante para tricotomia e clorexidina alcoólica/aquosa para antissepsia cutânea em três tempos.',
        'Tubos plásticos estéreis adequados: tubo com anticoagulante EDTA (para contagem total de células, citologia e PCR) e tubo seco estéril sem anticoagulante (para culturas microbiológicas e sorologias).',
        'Lâminas de microscopia limpas desengorduradas e seringa de 1 mL estéril com agulha para confecção de esfregaços imediatos ou citocentrifugação.'
      ]
    },

    { type: 'heading', level: 2, text: '9. Ilustração Técnica: Triângulo Atlanto-Occipital e Punção Sagital 📸' },
    {
      type: 'paragraph',
      text:
        'O diagrama esquemático abaixo sintetiza os marcos ósseos do triângulo atlanto-occipital, a relação de profundidade com as camadas da cisterna cerebelomedular e a técnica de progressão na coluna lombar:'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/coleta-liquor-anatomia-landmarks.svg',
      alt: 'Diagrama esquemático dos marcos da cisterna magna e punção lombar em cães e gatos.',
      caption:
        'Figura 2: Anatomia cirúrgica e técnica da coleta de LCR. (1) O triângulo atlanto-occipital: protuberância occipital externa e asas do atlas; o ponto de punção é exatamente na linha média central. (2) Corte sagital da cisterna cerebelomedular: a agulha transpõe a membrana atlanto-occipital e a dura-máter, PARANDO no espaço subaracnoide com refluxo passivo. (3) Punção lombar em L5–L6 (cão) ou L6–L7 (gato): a agulha toca o processo espinhoso da vértebra caudal e "caminha" cranialmente pelo trilho ósseo. (4) Regras de segurança de ouro.'
    },

    { type: 'heading', level: 2, text: '10. Parte I — Punção Cisternal: Posicionamento Milimétrico 📐' },
    {
      type: 'paragraph',
      text:
        'O posicionamento do paciente determina 90% do sucesso e da segurança da punção atlanto-occipital:'
    },
    {
      type: 'steps',
      items: [
        'Decúbito lateral verdadeiro: deite o paciente em decúbito lateral direito (para operadores destros), com a coluna vertebral estritamente paralela e alinhada à borda da mesa.',
        'Flexão da articulação atlanto-occipital em 90°: um assistente treinado flexiona a cabeça em relação à coluna cervical em um ângulo aproximado de 90°. O objetivo é abrir o espaço interlaminar atlanto-occipital sem fletir excessivamente o pescoço contra o esterno.',
        'Alinhamento do plano sagital: o plano mediano da cabeça deve permanecer estritamente paralelo à superfície da mesa cirúrgica. A ponta do focinho não pode estar apontada para o teto nem caída em direção à mesa. Rotações axiais da cabeça desviam a linha média externa da linha média neural profunda!',
        'Vigilância constante da via aérea: verifique o traçado de capnografia (ETCO₂) imediatamente após flexionar a cabeça. Se a curva colabar ou o volume corrente cair, o tubo endotraqueal acotovelou; reduza discretamente a flexão até restabelecer a patência ventilatória total.'
      ]
    },

    { type: 'heading', level: 2, text: '11. Delimitação do Triângulo Atlanto-Occipital 🔺' },
    {
      type: 'paragraph',
      text:
        'Após ampla tricotomia (do occipital até a vértebra C2 e lateralmente além das asas do atlas) e antissepsia rigorosa em três tempos, palpe os três marcos anatômicos com dedos enluvados esterilmente (BSAVA 2024):'
    },
    {
      type: 'steps',
      items: [
        'Marco 1 (Vértice Cranial): Protuberância occipital externa — crista óssea palpável na transição dorsocaudal do crânio.',
        'Marcos 2 e 3 (Vértices Laterais): Asas do Atlas (C1) — palpe a borda cranial das duas asas do atlas com os dedos polegar e médio da mão não-dominante.',
        'O Triângulo Imaginário: visualize a linha imaginária transversal que conecta as duas asas do atlas e as duas linhas oblíquas que convergem cranial para a protuberância occipital.',
        'O Ponto de Entrada: localize a depressão central sobre a LINHA MÉDIA SAGITAL dorsal, no centro geométrico desse triângulo (ou logo cranial ao ponto médio da linha que une as asas do atlas).'
      ]
    },

    { type: 'heading', level: 2, text: '12. Inserção da Agulha Cisternal Passo a Passo 💉' },
    {
      type: 'paragraph',
      text:
        'Execute a punção com gestos calmos, apoios sólidos e máxima precisão mecânica:'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Apoio obrigatório da mão: nunca segure a agulha com a mão livre "flutuando" no ar. Apoie o aspecto ulnar da sua mão ou o dedo mínimo firmemente sobre a nuca do paciente. Esse apoio ancora a mão e impede avanços intempestivos se o animal sofrer qualquer microoscilação.',
        'Passo 2 — Vetor de introdução: posicione a agulha espinal exatamente na linha média sagital, com o corpo da agulha paralelo à superfície da mesa e apontando suavemente em direção à comissura da mandíbula / focinho do paciente.',
        'Passo 3 — Orientação do bisel: o BSAVA Procedures (2024) orienta o bisel voltado caudalmente para separar as fibras elásticas da membrana atlanto-occipital.',
        'Passo 4 — Penetração e retirada do mandril: perfure a pele e a fáscia superficial com o mandril travado. Logo após vencer o plano cutâneo, REMOVA O MANDRIL interno e inspecione o hub plástico.',
        'Passo 5 — Avanço milímetro a milímetro: avance a agulha desobstruída em incrementos rigorosos de 1 a 2 mm por vez. Após cada microavanço, aguarde 2 a 3 segundos observando o interior do hub transparente.',
        'Passo 6 — A sensação de "pop" da dura-máter: em muitos pacientes, ao perfurar a membrana atlanto-occipital e a dura-máter, percebe-se uma sutil perda de resistência tátil (um "pop" suave). Contudo, em animais jovens, idosos ou caquéticos, esse pop pode ser imperceptível!',
        'Passo 7 — O endpoint absoluto: no instante exato em que uma coluna ou menisco de líquido cristalino límpido surgir no hub da agulha, PARE DE AVANÇAR IMEDIATAMENTE! O espaço subaracnoide foi alcançado; milímetros abaixo está o parênquima vital do tronco encefálico.'
      ]
    },

    { type: 'heading', level: 2, text: '13. Regra de Segurança Vital: Gotejamento Passivo e NUNCA Aspirar 🚫' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'NUNCA CONECTE UMA SERINGA PARA "PUXAR" O LÍQUOR!',
      text:
        'A aspiração com seringa é uma das manobras mais perigosas da neurologia veterinária (BSAVA 2024, de Lahunta 2021):\n\n1. A pressão negativa gerada pelo êmbolo traciona a medula espinhal e a pia-máter em direção ao bisel da agulha, provocando laceração e contusão medular iatrogênica.\n2. A queda brusca de pressão intratecal potencializa o gradiente de sucção e precipita a herniação cerebelar foraminal imediata.\n\n• O LCR DEVE GOTEJAR PASSIVAMENTE por gravidade diretamente do hub da agulha para o tubo coletor aberto mantido logo abaixo dele.\n• Também NÃO realize compressão das veias jugulares de rotina: a manobra eleva repentinamente a pressão venosa intracraniana e a PIC.'
    },

    { type: 'heading', level: 2, text: '14. Intercorrências na Cisternal: Contato Ósseo, Sangue e Limite de Tentativas ⚠️' },
    {
      type: 'paragraph',
      text:
        'Como proceder com frieza técnica diante dos incidentes mais comuns durante a punção cisternal:'
    },
    {
      type: 'steps',
      items: [
        'Se a agulha bater em osso: se encontrar resistência óssea dura e superficial, você atingiu a crista occipital (muito cranial) ou o arco do atlas (muito caudal). NUNCA FORCE. Recue a agulha quase até a pele, reconfirme a linha média e os três pontos do triângulo, corrija discretamente o ângulo em sentido oposto e reinsira suavemente.',
        'PROIBIDO VARRER LATERALMENTE: jamais incline a agulha em "alavanca" ou faça movimentos de varredura lateral enquanto a ponta estiver introduzida profundamente nos planos musculares! Isso atua como uma lâmina cortando a medula cervical.',
        'Se sair sangue franco pelo hub: você puncionou um dos ramos venosos do plexo vertebral interno ou um vaso meníngeo. RETIRE A AGULHA IMEDIATAMENTE, comprima suavemente o sítio com gaze por 1 minuto e descarte a agulha. Nova tentativa só deve ser feita com uma agulha estéril nova e limpa.',
        'A Regra de Ouro das Três Tentativas (de Lahunta): se um operador realizar 3 tentativas bem executadas sem conseguir obter líquor, o procedimento cisternal deve ser SUSPENSO por esse profissional. Insistir repetidamente traumatiza os tecidos, gera hematoma retrobulbar e aumenta drasticamente o risco de lesão medular. Solicite auxílio de outro operador experiente ou converta para a punção lombar.'
      ]
    },

    { type: 'heading', level: 2, text: '15. Parte II — Punção Lombar: Diferenças Anatômicas Cão vs. Gato 🦴' },
    {
      type: 'paragraph',
      text:
        'A punção subaracnoide lombar é tecnicamente mais exigente do que a cisternal devido ao menor calibre do canal vertebral, à presença da cauda equina e à necessidade de atravessar planos ligamentares mais densos:'
    },
    {
      type: 'steps',
      items: [
        'DIFERENÇA ANATÔMICA CAPITAL POR ESPÉCIE:\n• NO CÃO: o sítio de eleição é o espaço intervertebral L5–L6 (o cone medular canino termina usualmente ao nível de L6).\n• NO GATO: o sítio de eleição é o espaço intervertebral L6–L7 (a medula espinhal felina estende-se mais caudalmente, terminando ao nível de L7 ou S1).',
        'Posicionamento e flexão lombar: paciente sob anestesia geral em decúbito lateral verdadeiro. O assistente traciona os membros pélvicos em direção CRANIAL (em flexão fetal), arqueando suavemente a coluna lombar para abrir os espaços interarqueados dorsais.',
        'Localização das cristas ilíacas: palpe as cristas dos ossos ílios bilateralmente. A linha imaginária que une as duas cristas ilíacas passa exatamente sobre o processo espinhoso da vértebra L7.',
        'Identificação dos processos espinhosos:\n• No cão: encontre L7 entre os ílios e caminhe cranialmente para o processo espinhoso proeminente de L6; o espaço-alvo L5–L6 fica imediatamente cranial a L6.\n• No gato: identifique L7; o espaço-alvo L6–L7 fica imediatamente cranial a L7.'
      ]
    },

    { type: 'heading', level: 2, text: '16. Técnica do "Trilho Ósseo" na Punção Lombar 🪡' },
    {
      type: 'paragraph',
      text:
        'A melhor forma de evitar o desvio lateral da agulha é utilizar o método do trilho ósseo vertebral:'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Toque ósseo inicial: introduza a agulha espinal na linha média sagital com o mandril inserido, perpendicular à coluna, encostando a ponta diretamente no topo do processo espinhoso da vértebra caudal ao espaço (ex.: processo de L6 no cão).',
        'Passo 2 — Caminhar cranialmente pelo trilho: deslize a ponta da agulha cranialmente sobre a lâmina óssea até que ela "escorregue" da borda óssea para a depressão elástica do espaço intervertebral.',
        'Passo 3 — Transfixação do ligamento interarcuado: avance com firmeza controlada através do ligamento interarcuado e da dura-máter dorsal. Pode-se perceber um pop nítido.',
        'Passo 4 — Remoção do mandril e espera paciente: retire o mandril e observe o hub. O fluxo liquórico lombar é significativamente mais lento do que o cisternal (formação lenta de gotas espaçadas). Aguarde até 15–30 segundos com calma antes de assumir insucesso.',
        'O significado do "twitch" motor: se o paciente apresentar uma contração involuntária súbita da cauda ou do membro pélvico durante a penetração, a ponta da agulha tocou uma raiz nervosa da cauda equina. Isso indica que o espaço subaracnoide dorsal foi ultrapassado! Recue a agulha em 1 a 2 mm e aguarde o refluxo de LCR no espaço dorsal.'
      ]
    },

    { type: 'heading', level: 2, text: '17. Volume de Coleta e Fracionamento em Tubos 🧪' },
    {
      type: 'paragraph',
      text:
        'O volume total de LCR retirado deve ser estritamente planejado com base no peso do animal para prevenir hipotensão liquórica e cefaleia/desconforto pós-punção:'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'REGRA CONSERVADORA DE VOLUME (Nelson & Couto)',
      text:
        'Volume alvo padrão: 0,5 mL a 1,5 mL (suficiente para citologia e bioquímica).\n\n• LIMITE MÁXIMO DE SEGURANÇA: NÃO exceder 1 mL para cada 5 kg de peso vivo do paciente.\n• Em gatos (2 a 4 kg): colete apenas cerca de 0,4 mL a 0,8 mL.\n• Em cães médios (10 a 20 kg): colete entre 1,0 mL e 2,0 mL.\n• Defina previamente com o laboratório a ordem de prioridade dos exames!'
    },
    {
      type: 'steps',
      items: [
        'Tubo 1 — EDTA (preferencial para triagem): reserve a maior alíquota para contagem total de células nucleadas (TNCC), citomorfologia diferencial, contagem de hemácias e proteína total. O EDTA impede a formação de microcoágulos de fibrina que aprisionam leucócitos.',
        'Tubo 2 — Tubo estéril sem anticoagulante (seco): destinado a culturas microbiológicas aeróbias e anaeróbias, cultura fúngica, títulos sorológicos e painéis de PCR para agentes infecciosos (cinomose, toxoplasma, neospora, etc.).'
      ]
    },

    { type: 'heading', level: 2, text: '18. Corrida Contra o Relógio: Preservação da Amostra (30–60 min) ⏱️' },
    {
      type: 'paragraph',
      text:
        'Diferente do sangue periférico, o líquor é um fluido biológico hipoproteico com osmolaridade e pH específicos. Sem a matriz protetora proteica do plasma, os leucócitos (especialmente neutrófilos e macrófagos) iniciam lise celular e apoptose em menos de 30 a 60 minutos após a coleta!'
    },
    {
      type: 'steps',
      items: [
        'Tempo ideal: realizar a contagem celular e preparar as lâminas citológicas em até 30 a 60 minutos pós-punção.',
        'Preservação com Soro Autólogo (BSAVA 2024): se a amostra precisar ser transportada para um laboratório externo com trânsito de várias horas ou até 24–48 horas, adicione soro sanguíneo do próprio paciente à alíquota de citologia:',
        'Proporção de soro autólogo: adicione 30% a 50% de soro autólogo ao volume de LCR destinado à citologia (ex.: 1,0 mL de LCR + 0,3 a 0,5 mL de soro do próprio cão/gato). As albuminas do soro estabilizam as membranas leucocitárias e preservam a integridade morfológica celular.',
        'ALERTA OBRIGATÓRIO: mantenha sempre uma alíquota pura de LCR sem soro em tubo separado para a mensuração de proteína total e microproteína, pois o soro adicionado alteraria artificialmente os níveis proteicos!'
      ]
    },

    { type: 'heading', level: 2, text: '19. Valores de Referência e Avaliação Macroscópica 📊' },
    {
      type: 'paragraph',
      text:
        'A inspeção visual macroscópica inicial contra fundo branco fornece pistas imediatas antes do envio ao laboratório:'
    },
    {
      type: 'table',
      headers: ['Aspecto Macroscópico', 'Característica Visual', 'Interpretação e Correlação Clínica'],
      rows: [
        [
          'Normal ("Água de Rocha")',
          'Límpido, transparente e completamente incolor',
          'SNC normal ou processo patológico sem quebra maciça de barreira / celularidade discreta'
        ],
        [
          'Turvo / Opalescente',
          'Aspecto leitoso ou perda de translucidez',
          'Pleocitose acentuada (TNCC >200–500 céls/µL), aumento massivo de proteínas ou presença de bactérias/fungos'
        ],
        [
          'Xantocrômico (Amarelado / Alaranjado)',
          'Coloração amarela persistente no sobrenadante centrifugado',
          'Presença de bilirrubina/oxiemoglobina resultante de lise de hemácias de hemorragia antiga (>24h) ou hiperbilirrubinemia severa'
        ],
        [
          'Róseo ou Sanguinolento',
          'Coloração vermelha em intensidade variável',
          'Presença de hemácias: diferenciar acidente de punção (iatrogênico) de hemorragia subaracnoide prévia'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'VALORES DE REFERÊNCIA GERAIS NO CÃO E GATO (Nelson & Couto, de Lahunta)',
      text:
        '• Contagem de Células Nucleadas (TNCC): <3 a 5 células/µL (geralmente 0 a 2 céls/µL).\n• Contagem de Hemácias: 0 hemácias/µL.\n• Proteína Total (Cisterna Cerebelomedular): <25 mg/dL no cão; <20 mg/dL no gato.\n• Proteína Total (Espaço Lombar): <35 a 45 mg/dL no cão e gato (o LCR lombar tem naturalmente concentração proteica discretamente superior pelo menor volume e reabsorção).'
    },

    { type: 'heading', level: 2, text: '20. Padrões Citológicos e Interpretação Básica 🔬' },
    {
      type: 'paragraph',
      text:
        'A população celular de um líquor normal é composta por 60% a 70% de pequenos linfócitos maduros monomórficos e 30% a 40% de grandes mononucleares/macrófagos, sem neutrófilos íntegros ou eosinófilos. Os principais padrões patológicos são:'
    },
    {
      type: 'table',
      headers: ['Padrão Citológico', 'Achado Predominante no LCR', 'Principais Diagnósticos Diferenciais'],
      rows: [
        [
          'Pleocitose Neutrofílica',
          'Aumento de TNCC com >50% de neutrófilos segmentados ou degenerados',
          'Arterite responsiva a corticoides (SRMA aguda), meningites bacterianas sépticas, peritonite infecciosa felina (PIF), abcessos cerebrais, necrose e infarto agudo'
        ],
        [
          'Pleocitose Mononuclear / Mista',
          'Aumento de TNCC com predomínio de linfócitos, monócitos e macrófagos',
          'Meningoencefalites de origem indeterminada (MUO / GME / NME), cinomose encefálica, toxoplasmose, neosporose, PIF fase tardia, processos inflamatórios crônicos'
        ],
        [
          'Pleocitose Eosinofílica',
          'Presença de >10% a 20% de eosinófilos na contagem diferencial',
          'Meningite eosinofílica criptocócica (Criptococose), infecções fúngicas sistêmicas (blastomicose, histoplasmose), migração larval parasitária, reações a fármacos e idiopática'
        ],
        [
          'Dissociação Albuminocitológica',
          'Proteína total elevada (>30–45 mg/dL) com contagem celular normal (<5 céls/µL)',
          'Compressão mecânica por hérnia de disco toracolombar, neoplasias intramedulares/extramedulares (meningioma, glioma), polirradiculoneurite aguda, isquemia e quebra de barreira hematoencefálica'
        ],
        [
          'Citologia Neoplásica Positiva',
          'Presença de blastos atípicos, células monomórficas bizarras ou com critérios de malignidade',
          'Linfoma multicêntrico com acometimento meníngeo, sarcoma histiocítico, carcinomatose meníngea (altíssima especificidade)'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'PÉROLA DE LAHUNTA: LCR NORMAL NÃO EXCLUI MENINGOENCEFALITE',
      text:
        'Cerca de 10% a 15% dos cães com meningoencefalite inflamatória comprovada por biópsia/necropsia (particularmente lesões focais em tronco encefálico ou prosencéfalo) podem apresentar análise de LCR inteiramente normal ou apenas com discreta hiperproteinemia. Nunca descarte uma suspeita neurológica grave apenas por um laudo de LCR normal!'
    },

    { type: 'heading', level: 2, text: '21. Distinção: Hemorragia Verdadeira vs. Acidente de Punção 🩸' },
    {
      type: 'paragraph',
      text:
        'A contaminação sanguínea acidental é um dos maiores dilemas no plantão. Três critérios objetivos auxiliam na diferenciação:'
    },
    {
      type: 'steps',
      items: [
        'Teste dos tubos seriados: no acidente de punção (lesão vascular venosa pelo bisel), o sangue é abundante na primeira gota e vai clareando progressivamente do tubo 1 para o tubo 2 e 3. Na hemorragia subaracnoide prévia verdadeira, a cor sanguinolenta permanece uniforme e homogênea em todos os tubos.',
        'Centrifugação imediata e inspeção do sobrenadante: centrifugue a amostra a 1.000 rpm por 5 minutos. Se o sobrenadante for perfeitamente límpido e incolor ("água"), o sangue é recente e oriundo de trauma da punção. Se o sobrenadante permanecer xantocrômico (amarelado/alaranjado), comprova-se hemorragia preexistente com lise de hemácias ocorrida há mais de 12 a 24 horas.',
        'Critérios citológicos definitivos: a visualização ao microscópio de eritrofagocitose (macrófagos fagocitando eritrócitos) ou inclusões de hemossiderina / cristais de hematoidina no citoplasma de macrófagos confirma de forma inequívoca hemorragia patológica preexistente no SNC.'
      ]
    },

    { type: 'heading', level: 2, text: '22. Monitoramento Pós-Procedimento e Complicações 🚨' },
    {
      type: 'paragraph',
      text:
        'O período de recuperação anestésica imediata exige vigilância ininterrupta da equipe médica. Complicações maiores surgem tipicamente nos primeiros 30 a 60 minutos pós-punção:'
    },
    {
      type: 'steps',
      items: [
        'Monitoramento hemodinâmico e respiratório contínuo: avalie frequência cardíaca, pressão arterial sistêmica (PA), saturação de oxigênio (SpO₂), capnografia e esforço ventilatório espontâneo.',
        'SINAIS CRÍTICOS DE HERNIAÇÃO CEREBRAL OU LESÃO DE TRONCO:\n• Apneia persistente ou falha em reassumir ventilação espontânea após cessação dos anestésicos.\n• Bradicardia severa acompanhada de hipertensão arterial aguda (reflexo de Cushing).\n• Assimetria pupilar aguda (anisocoria), midríase bilateral fixa ou perda súbita do reflexo fotomotor.\n• Postura extensora rígida dos membros ou opistótono agudo.',
        'CONDUTA IMEDIATA EM CASO DE HERNIAÇÃO SUSPEITA:\n1. Eleve a cabeça e o tronco do paciente em 30° em relação à mesa (facilita a drenagem venosa jugular sem fletir o pescoço).\n2. Mantenha ventilação mecânica controlada fornecendo normocapnia estrita (alvo ETCO₂: 30 a 35 mmHg — a hipoventilação eleva o CO₂ e causa vasodilatação cerebral massiva!).\n3. Administre Manitol a 20% (0,5 a 1,0 g/kg IV em 15–20 minutos) ou Solução Salina Hipertônica 7,5% (2 a 4 mL/kg IV em bolus lento de 5 minutos) para redução osmótica imediata do edema cerebral.'
      ]
    },

    { type: 'heading', level: 2, text: '23. Tabela de Troubleshooting Clínico Rápido ⚙️' },
    {
      type: 'paragraph',
      text:
        'Resolução prática para os dilemas mais frequentes durante a realização do procedimento:'
    },
    {
      type: 'table',
      headers: ['Intercorrência Observada', 'Causa Mais Provável', 'Conduta Imediata Recomendada'],
      rows: [
        [
          'A agulha bate em osso rígido e raso na punção cisternal',
          'Agulha desviada para a crista occipital (cranial) ou arco de C1 (caudal)',
          'Recue a agulha quase até a pele. Reconfirme o triângulo e a linha média. Corrija a angulação e reinsira. Nunca faça varredura lateral profunda.'
        ],
        [
          'Nenhum líquor reflui pelo hub na cisterna',
          'Ponta ainda na musculatura, bisel encostado na dura-máter ou cisterna muito rasa',
          'Avance 1 mm e espere 3 segundos. Gire suavemente o corpo da agulha em 90°. Se persistir seco, retire e repita a palpação.'
        ],
        [
          'Sai sangue puro pelo hub da agulha espinal',
          'Perfuração de vaso do plexo venoso vertebral interno',
          'Retire imediatamente. Comprima a região por 1 minuto. Descarte a agulha e reinicie a punção com agulha estéril nova.'
        ],
        [
          'Fluxo extremamente lento ou ausente na punção lombar',
          'Pressão hidrostática baixa no canal lombar ou orifício ocluído por raiz',
          'Aguarde com paciência (pode levar 20 segundos para a primeira gota). Gire suavemente o hub em 90° ou recue meio milímetro.'
        ],
        [
          'O paciente contrai a cauda ou perna ("twitch") na lombar',
          'A agulha tocou raízes da cauda equina no assoalho do canal',
          'A agulha ultrapassou o espaço subaracnoide dorsal. Recue 1 a 2 mm devagar buscando o espaço dorsal.'
        ],
        [
          'Operador atinge 3 tentativas frustradas sem LCR',
          'Dificuldade anatômica, edema tecidual local ou desvio de referências',
          'REGRA DAS TRÊS TENTATIVAS: suspenda novas tentativas. Chame colega mais experiente ou converta para punção lombar.'
        ],
        [
          'Cão Cavalier King Charles Spaniel necessita de LCR',
          'Alto risco de Chiari-like com verme cerebelar ectópico foraminal',
          'Evite punção cisternal às cegas. Realize a coleta pelo espaço subaracnoide lombar (L5–L6).'
        ],
        [
          'Paciente não retoma respiração espontânea pós-punção',
          'Herniação cerebelar foraminal com compressão do centro respiratório',
          'Suporte ventilatório avançado imediato, manter cabeça elevada a 30°, hiperosmolar (manitol ou salina 7,5%) e avisar equipe de UTI.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '24. Fluxograma de Decisão Clínica para Coleta de LCR 🔄' },
    {
      type: 'flowchart',
      title: 'Fluxo Decisório na Indicação e Execução da Coleta de LCR',
      nodes: [
        { id: 'ind', label: 'Indicação clínica (Encefalopatia / SRMA / Mielopatia)', variant: 'start' },
        { id: 'eval', label: 'Exame neurológico + Triagem de PIC e Estabilidade', variant: 'action' },
        { id: 'pic', label: 'Sinais de Hipertensão Intracraniana ou Efeito de Massa?', variant: 'decision' },
        { id: 'img', label: 'PARAR! Realizar RM/TC primeiro e tratar edema/PIC', variant: 'action' },
        { id: 'site', label: 'Seleção do sítio anatômico de punção', variant: 'decision' },
        { id: 'cis', label: 'Cisterna Magna: Cão/Gato (Anestesia + Flexão 90° + Triângulo AO)', variant: 'action' },
        { id: 'lumb', label: 'Lombar: Mielopatia / Chiari (Cão L5–L6 / Gato L6–L7)', variant: 'action' },
        { id: 'flow', label: 'Avanço 1-2 mm/vez → LCR no hub?', variant: 'decision' },
        { id: 'collect', label: 'PARE! Coleta estritamente passiva (Nunca aspirar) → Tubo EDTA + Seco', variant: 'action' },
        { id: 'fail', label: '3 tentativas frustradas? Trocar operador ou migrar de sítio', variant: 'action' },
        { id: 'lab', label: 'Processar citologia em até 30–60 min (ou soro autólogo 30-50%)', variant: 'end' }
      ],
      edges: [
        { from: 'ind', to: 'eval' },
        { from: 'eval', to: 'pic' },
        { from: 'pic', to: 'img', label: 'Sim (HIC)' },
        { from: 'pic', to: 'site', label: 'Não (Seguro)' },
        { from: 'site', to: 'cis', label: 'Encéfalo / SRMA' },
        { from: 'site', to: 'lumb', label: 'Medula / CKCS' },
        { from: 'cis', to: 'flow' },
        { from: 'lumb', to: 'flow' },
        { from: 'flow', to: 'collect', label: 'LCR cristalino' },
        { from: 'flow', to: 'fail', label: 'Sem LCR / Sangue' },
        { from: 'fail', to: 'site' },
        { from: 'collect', to: 'lab' }
      ]
    },

    { type: 'heading', level: 2, text: '25. Box de Bolso — Checklist de Ouro e "Nunca Faça" 📋' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'CHECKLIST DE OURO DO PLANTÃO NEUROLÓGICO — LCR 🧠',
      text:
        '1. INDICAÇÃO E IMAGEM: Nunca puncione às cegas um paciente com estupor, anisocoria ou bradicardia hipertensiva. Se suspeitar de HIC, faça RM/TC antes!\n\n' +
        '2. O ALVO DA AGULHA: A agulha para DENTRO do espaço subaracnoide. Jamais encoste na medula espinhal ou tronco encefálico.\n\n' +
        '3. POSICIONAMENTO CISTERNAL: Decúbito lateral verdadeiro, flexão cervical a 90° e plano sagital estritamente paralelo à mesa. Monitore o tubo traqueal.\n\n' +
        '4. LANDMARKS DO TRIÂNGULO: Protuberância occipital externa + asas esquerda e direita do atlas. Entrada na linha média central.\n\n' +
        '5. AVANÇO MILIMÉTRICO: Remova o estilete logo após a pele e avance de 1 em 1 mm. Ao surgir líquor: PARE IMEDIATAMENTE!\n\n' +
        '6. NUNCA ASPIRE: O fluxo deve ser 100% passivo por gravidade. Seringa causa vácuo perigoso e atrai tecido neural para o bisel.\n\n' +
        '7. REGRA DAS TRÊS TENTATIVAS: Bateu 3 tentativas sem sucesso? Pare. Não insista para não lacerar o tronco encefálico.\n\n' +
        '8. SÍTIO LOMBAR: Escolha L5–L6 para cães e L6–L7 para gatos. Se houver contração súbita de cauda/perna, recue 1 mm do canal ventral.\n\n' +
        '9. PRESERVAÇÃO RÁPIDA: Processe em 30 a 60 minutos. Se houver transporte longo, adicione 30% a 50% de soro autólogo à fração citológica.'
    },

    { type: 'heading', level: 2, text: '26. Referências Técnicas e Bibliográficas 📚' },
    {
      type: 'paragraph',
      text:
        'O conteúdo deste guia foi estruturado com base nas principais referências internacionais de neuroanatomia, neurologia clínica e procedimentos veterinários:'
    },
    {
      type: 'steps',
      items: [
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Cerebrospinal fluid sampling – (a) cerebellomedullary cistern: pp. 129–133; (b) lumbar cistern: pp. 133–135. (Referência primária para posicionamento, técnica do triângulo e punção lombar).',
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 59 – Diagnostic Tests for Nervous System and Neuromuscular Disorders, pp. 1068–1072. (Landmarks anatômicos, volume máximo seguro e citologia).',
        'de Lahunta A, Glass E, Kent M. de Lahunta’s Veterinary Neuroanatomy and Clinical Neurology. 5th ed. Elsevier; 2021. Chapter 4 – Cerebrospinal Fluid and Hydrocephalus, pp. 79–91. (Fisiopatologia liquórica, regra das tentativas e segurança).',
        'Danciu C, et al. Major complications associated with cerebrospinal fluid collection in dogs: 11 cases (2010–2023). J Vet Intern Med. 2025;39(2):e70165. Open Access CC BY 4.0. (Maior coorte mundial avaliando segurança em 7.545 coletas e herniação cerebelar).',
        'Sivolapenko O, et al. Magnetic resonance imaging evaluation of needle trajectory during cerebellomedullary cisternal puncture in dogs with and without Chiari-like malformation. J Anat. 2022;241(1):13–21.',
        'Fentem R, et al. Success rate and complications associated with cerebellomedullary and lumbar cerebrospinal fluid collection in dogs: a prospective study of 102 cases. Vet Rec. 2021;189(12):e787.',
        'Cunningham JG, Klein BG. Cunningham’s Textbook of Veterinary Physiology. 6th ed. Elsevier; 2020. Chapter 15 – Cerebrospinal Fluid and the Blood-Brain Barrier, pp. 150–153.',
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. British Small Animal Veterinary Association; 2018. Chapter 9 – Emergency Neurological Procedures: CSF collection, pp. 147–148.',
        'Gama FGV, et al. Colheita de líquido cefalorraquidiano em cães: modificação de técnica prévia baseada em marcos ósseos diretos. Semina: Cienc Agrar. 2009;30(3):685–692.'
      ]
    }
  ],
  isPublished: true
};


/**
 * Guia: Desobstrução uretral em cães e gatos.
 * Conteúdo técnico de medicina intensiva, nefrologia, emergência e urologia de pequenos animais.
 * Referências: iCatCare Consensus (JFMS 2025), ACVIM Consensuses (2024/2016), BSAVA Guide to Procedures (2024), VECC Procedures (2025).
 */
const guiaDesobstrucaoUretral: ClinicalQuickGuide = {
  id: 'cqg-desobstrucao-uretral-009',
  slug: 'desobstrucao-uretral-caes-gatos',
  title: 'Desobstrução uretral em cães e gatos: manejo emergencial e técnica',
  subtitle:
    'Urologia & Emergência — Consenso iCatCare 2025, retificação em S e flush pulsátil felino, retro-hidropropulsão canina (ACVIM/BSAVA), estabilização de hipercalemia e MEMO para CIF',
  summary:
    'Guia clínico definitivo para desobstrução uretral em pequenos animais: reconhecimento e manejo da hipercalemia crítica (ECG e gluconato de cálcio), manobra de retificação da uretra felina em S e flush hidráulico pulsátil, retro-hidropropulsão canina com oclusão digital retal, uso criterioso da cistocentese descompressiva, descontinuação da prazosina rotineira e manejo multimodal da Cistite Idiopática Felina (CIF).',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'desobstrucao uretral',
    'obstrucao uretral gato',
    'obstrucao uretral cao',
    'gato obstruido',
    'icatcare 2025',
    'retro-hidropropulsao',
    'uretiolito',
    'calculo uretral',
    'plug uretral',
    'cistite idiopatica felina',
    'cif',
    'fic',
    'hipercalemia',
    'gluconato de calcio',
    'prazosina',
    'sonda uretral',
    'sonda tom cat',
    'sonda de demora',
    'diurese pos-obstrutiva',
    'atonia detrusor',
    'memo',
    'acvim'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/desobstrucao-uretral-caes-gatos.webp',
  heroImageAlt: 'Imagem ilustrativa de desobstrução uretral em cães e gatos: manejo emergencial e técnica: materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'A desobstrução não é passar sonda: é estabilização hemodinâmica prévia (K⁺, ECG e volemia) seguida de manobras hidráulicas atraumáticas.',
    'Tríade preditiva de hipercalemia crítica: FC <140 bpm + Temperatura <35,5°C tem valor preditivo >98% para K⁺ >8 mmol/L no gato obstruído.',
    'Manobra felina em "S": tracione o prepúcio dorsal e caudalmente para alinhar a uretra peniana e pélvica; a coluna de líquido (flush pulsátil) abre o caminho, NUNCA a ponta plástica como aríete.',
    'Retro-hidropropulsão canina: oclua a uretra pélvica pelo reto e o pênis distalmente com gaze; pressurize a uretra com salina/lubrificante 50:50 e solte abruptamente o reto mantendo o flush.',
    'Atualizações 2025/2026 (iCatCare): prazosina e antibióticos profiláticos NÃO são recomendados de rotina; sonda de demora por 24–36 h (não 48 h fixas); CIF exige enriquecimento ambiental (MEMO) e analgesia.'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. O que Muda entre o Cão e o Gato? 🐱🐶' },
    {
      type: 'paragraph',
      text:
        'A obstrução uretral completa transforma rapidamente uma afecção do trato urinário inferior em uma emergência metabólica sistêmica com risco iminente de morte. Embora a consequência fisiopatológica final (azotemia pós-renal, hipercalemia e acidose) seja idêntica, a etiologia, a anatomia e a técnica de resolução diferem profundamente entre cães e gatos:'
    },
    {
      type: 'table',
      headers: ['Característica Clínica', '🐱 Gato Macho', '🐶 Cão Macho'],
      rows: [
        [
          'Paciente Típico',
          'Macho jovem a meia-idade, castrado, indoor, com histórico de estresse ou sobrepeso',
          'Macho de qualquer idade ou porte; fêmeas são extremamente raras'
        ],
        [
          'Causa Primária Mais Frequente',
          'Cistite Idiopática Felina (CIF/FIC) gerando plug uretral mucocristalino e espasmo',
          'Urolitíase (uretrólitos migrados da bexiga), estenoses cicatriciais ou massas'
        ],
        [
          'Frequência de Hipercalemia Grave',
          'Muito comum e potencialmente fatal (frequente K⁺ >7–8 mmol/L)',
          'Menos frequente no início, mas sempre deve ser dosada e monitorada'
        ],
        [
          'Desafio Anatômico Específico',
          'Uretra peniana milimétrica com curvatura natural em "S" muito pronunciada',
          'Uretra longa; cálculos travam na base do osso peniano (sulco inelástico)'
        ],
        [
          'Objetivo Mecânico Imediato',
          'Desalojar o plug por flush pulsátil suave e retificar o trajeto uretral',
          'Retro-hidropropulsionar o cálculo de volta para o lúmen vesical'
        ],
        [
          'Conduta Pós-Desobstrução',
          'Manejo da CIF: analgesia, fluidoterapia, aumento da água e enriquecimento (MEMO)',
          'Remoção cirúrgica/endoscópica definitiva do urólito + análise quantitativa'
        ],
        [
          'Prazosina (Alfa-1 bloqueador)',
          'NÃO recomendada de rotina pelo consenso iCatCare 2025 (sem benefício comprovado)',
          'Pode ter papel se houver componente funcional (FOO), mas ineficaz contra cálculo'
        ],
        [
          'Antibioticoterapia Empírica',
          'CONTRAINDICADA (CIF é predominantemente estéril; seleciona superbactérias)',
          'NÃO automática; colher urina por cistocentese e guiar por cultura se indicada'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '2. Fisiopatologia Sistêmica e o Perigo da Hipercalemia ⚡' },
    {
      type: 'paragraph',
      text:
        'A oclusão intraluminal impede o fluxo urinário e deflagra uma cascata hemodinâmica retrógrada rápida:'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'CASCATA DA OBSTRUÇÃO COMPLETA',
      text:
        'Uretra ocluída → Pressão intravesical aumenta expressivamente → Pressão hidrostática retrógrada nos ureteres e túbulos renais → Pressão efetiva de filtração glomerular desaba → Taxa de Filtração Glomerular (TFG) colapsa → Parada na excreção de K⁺, H⁺, fósforo, ureia e creatinina.\n\n• Em menos de 24 a 48 horas de obstrução total, desenvolve-se uremia severa, desidratação, acidose metabólica e hipercalemia com risco de parada cardíaca.'
    },
    {
      type: 'paragraph',
      text:
        'Por que a hipercalemia mata tão rápido no paciente obstruído?'
    },
    {
      type: 'steps',
      items: [
        'O potássio extracelular elevado reduz a magnitude do potencial de repouso das células miocárdicas (a membrana torna-se menos negativa).',
        'Isso inativa progressivamente os canais rápidos de sódio voltagem-dependentes, retardando a condução intraventricular.',
        'No traçado eletrocardiográfico (ECG), as alterações progridem sequencialmente: Ondas T apiculadas e simétricas ("em tenda") → Intervalo PR prolongado → Achatamento e desaparecimento completo da onda P (parada sinoventricular) → Alargamento bizarro do complexo QRS → Bradicardia ventricular extrema → Fibrilação ventricular ou assistolia.',
        'NUNCA aguarde a bradicardia evidente para solicitar ECG: arritmias graves e instabilidade de membrana ocorrem mesmo com frequências cardíacas aparentemente preservadas (iCatCare 2025).'
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'PÉROLA CLÍNICA DE TRIAGEM (iCatCare 2025)',
      text:
        'A combinação clínica de:\nFC < 140 bpm + Temperatura corporal < 35,5 °C\napresenta VALOR PREDITIVO POSITIVO SUPERIOR A 98% para hipercalemia severa (K⁺ > 8,0 mmol/L) em gatos obstruídos! Se o paciente chegar hipotérmico e bradicárdico, inicie medidas cardioprotetoras imediatamente antes mesmo do resultado do ionograma.'
    },

    { type: 'heading', level: 2, text: '3. Triagem de Emergência e Banco Mínimo Laboratorial 📋' },
    {
      type: 'paragraph',
      text:
        'Avaliação primária nos primeiros 3 minutos de recepção:'
    },
    {
      type: 'steps',
      items: [
        'Exame físico direcionado: nível de consciência (alerta, embotado, estuporoso), coloração de mucosas, Tempo de Preenchimento Capilar (TPC), qualidade dos pulsos femorais, pressão arterial sistólica (Doppler/oscilométrico), padrão respiratório e palpação abdominal gentil da bexiga (bexiga grande, pétrea e intensamente dolorosa).',
        'ECG contínuo imediato: indispensável em qualquer paciente obstruído para guiar a necessidade de intervenção cardioprotetora com cálcio.',
        'Coleta de sangue pré-fluidoterapia: colha amostra para dosagem de eletrólitos (K⁺, Na⁺, Cl⁻, cálcio ionizado), creatinina, ureia, hemogasometria (pH, HCO₃⁻, BE), hematócrito/proteína plasmática total (PCV/TS) e glicemia.',
        'Atenção ao sedimento urinário: a identificação de cristais de estruvita ou oxalato na urina NÃO confirma que a obstrução seja causada por cálculo da mesma composição; a cristalúria pode ser um epifenômeno inócuo. Nunca institua dietas dissolutivas apenas pelo sedimento sem radiografia (iCatCare 2025).'
      ]
    },

    { type: 'heading', level: 2, text: '4. Estabilização Pré-Desobstrução e Controle da Hipercalemia 💉' },
    {
      type: 'paragraph',
      text:
        'A desobstrução mecânica NUNCA deve anteceder a estabilização hemodinâmica e a proteção miocárdica. Gatos anestesiados sob hipercalemia severa e choque frequentemente sofrem parada cardiorrespiratória irreversível durante a indução!'
    },
    {
      type: 'steps',
      items: [
        'Acesso venoso e fluidoterapia titulada por metas: inicie expansão volêmica imediata com cristalóide isotônico (Ringer com Lactato ou solução balanceada). O consenso iCatCare 2025 esclarece que cristaloides balanceados NÃO são contraindicados pela pequena quantidade de K⁺ (4–5 mEq/L) que contêm; pelo contrário, por conterem tampões precursores de bicarbonato, corrigem a acidose e normalizam o K⁺ mais rápido que o NaCl 0,9%. Em choque, use bolus alíquotas de 10 mL/kg em 10–15 minutos com reavaliação.',
        'GLUCONATO DE CÁLCIO A 10% (Primeira Escolha se Arritmia ou K⁺ >7,5–8,0 mmol/L):\n• Dose: 0,5 a 1,5 mL/kg IV lento administrado em 10 a 20 minutos sob monitoramento contínuo do ECG.\n• Mecanismo: o cálcio antagoniza os efeitos eletrofisiológicos do potássio na membrana miocárdica, restaurando o gradiente de excitabilidade e estreitando o QRS em minutos.\n• ALERTA: o gluconato de cálcio NÃO REDUZ A CONCENTRAÇÃO SÉRICA DE K⁺; ele apenas confere uma "janela de proteção cardíaca" de 20 a 40 minutos para que a fluidoterapia e a insulina atuem.',
        'INSULINA REGULAR + DEXTROSE (Shift Intracelular Ativo de K⁺):\n• Insulina regular: 0,2 a 0,5 UI/kg IV em bolus.\n• Dextrose 50%: administrar 2 g de glicose para cada unidade de insulina administrada (diluída em salina para concentração máxima de 10–20% e evitar flebite), seguida de infusão contínua de glicose a 2,5–5% por 6 a 12 horas para prevenir hipoglicemia tardia.'
      ]
    },

    { type: 'heading', level: 2, text: '5. Analgesia e Protocolo Anestésico / Sedativo 😴' },
    {
      type: 'paragraph',
      text:
        'A distensão vesical aguda e o espasmo uretral provocam dor excruciante, potencializando a liberação simpática e dificultando a passagem do cateter:'
    },
    {
      type: 'steps',
      items: [
        'Opioides puros como base analgésica: metadona (0,2 a 0,3 mg/kg IV) ou infusão contínua de fentanil (3 a 10 µg/kg/h IV). Em gatos com quadro álgico brando pós-desobstrução, a buprenorfina (0,02 a 0,04 mg/kg IV/sublingual) é excelente.',
        'Anti-inflamatórios não esteroidais (AINEs): CONTRAINDICADOS na fase inicial de paciente obstruído, desidratado ou azotêmico, pelo risco iminente de necrose de papila renal e insuficiência renal aguda iatrogênica.',
        'Anestesia geral é o padrão-ouro no felino: tentar desobstruir gatos com contenção física ou sedação superficial gera trauma uretral severo por movimentação do animal. Indução com propofol titulado ou associação dissociativa (cetamina + midazolam em microdoses) após correção da volemia e do potássio proporciona relaxamento muscular pleno do assoalho pélvico.'
      ]
    },

    { type: 'heading', level: 2, text: '6. Cistocentese Descompressiva: Fazer ou Não? (iCatCare 2025) 🎯' },
    {
      type: 'paragraph',
      text:
        'A realização de cistocentese antes da cateterização uretral já foi motivo de debates acalorados. As diretrizes internacionais atuais posicionam o procedimento da seguinte forma:'
    },
    {
      type: 'steps',
      items: [
        'Indicações aceitas: recomendada quando a bexiga está sob extrema tensão mecânica e o paciente precisa ser estabilizado antes da indução anestésica, quando a passagem da sonda falhar na primeira tentativa, ou para aliviar a contrapressão intravesical facilitando a hidropropulsão.',
        'Técnica correta e segura: contenção suave ou sedação prévia; preferir auxílio de ultrassom (POCUS); utilizar agulha fina 22G conectada a extensor flexível de duas vias, torneira de 3 vias e seringa de 20 mL. Realize UMA ÚNICA punção estável e aspire o máximo de urina possível para colabar a bexiga.',
        'PROIBIÇÃO ABSOLUTA DE EXPRESSÃO MANUAL: jamais tente "espremer" uma bexiga obstruída com as mãos! A manobra é extremamente dolorosa, traumatiza o detrusor já isquêmico e pode causar ruptura vesical catastrófica com uroabdome imediato.'
      ]
    },

    { type: 'heading', level: 2, text: '7. Ilustração Técnica: Desobstrução Uretral Felina 📸' },
    {
      type: 'paragraph',
      text:
        'O diagrama a seguir resume as manobras anatômicas capitais preconizadas pelo consenso iCatCare 2025 para desobstrução segura do gato macho:'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/desobstrucao-uretral-felina-tecnica.svg',
      alt: 'Diagrama técnico da desobstrução uretral em gatos: alinhamento em S, flush pulsátil e triagem de hipercalemia.',
      caption:
        'Figura 1: Técnica da desobstrução uretral felina (iCatCare 2025). (1) Retificação da uretra: tração dorsocaudal do prepúcio alinha as porções peniana e pélvica. (2) Flush pulsátil hidráulico: o líquido distende a uretra e solta o plug sem atuar como aríete plástico. (3) Segurança do cateter: remoção obrigatória do mandril metálico antes da inserção. (4) Triagem relâmpago de hipercalemia e conduta com gluconato de cálcio.'
    },

    { type: 'heading', level: 2, text: '8. Materiais e Seleção do Cateter Felino 🩺' },
    {
      type: 'paragraph',
      text:
        'A escolha correta do cateter previne lacerações e diminui a taxa de reobstrução hospitalar:'
    },
    {
      type: 'steps',
      items: [
        'Calibre ideal: selecione cateter de 3,0 Fr ou 3,5 Fr com ponta aberta (open-ended). Cateteres grossos de 5,0 Fr geram atrito excessivo, edema mucoso intenso e aumentam comprovadamente o risco de reobstrução precoce (iCatCare 2025).',
        'ALERTA DO MANDRIL METÁLICO (STYLET): se o cateter selecionado possuir estilete metálico interno, RETIRE O MANDRIL ANTES de introduzir a sonda na uretra! O mandril transforma a ponta em um aríete rígido cortante capaz de perfurar a uretra membranosa ao menor espasmo muscular.',
        'Lavagem peniana distal: um cateter intravenoso 20G ou 22G flexível (sem a agulha de aço!) pode ser acoplado à seringa de salina para realizar lavagens superficiais dos primeiros 5 mm do pênis se houver plug distal visível.',
        'Seringa e extensor: utilize seringa de 5–10 mL com NaCl 0,9% estéril e extensor flexível curto para amortecer os movimentos das mãos do operador durante o flush.'
      ]
    },

    { type: 'heading', level: 2, text: '9. Parte I — Gato: Técnica Passo a Passo de Desobstrução 🐾' },
    {
      type: 'paragraph',
      text:
        'Siga a sequência padronizada internacionalmente para minimizar o trauma uretral:'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Antissepsia: com o gato adequadamente anestesiado, posicione-o em decúbito lateral ou dorsal com os membros pélvicos abduzidos. Faça antissepsia delicada da região prepucial com solução aquosa de clorexidina 0,05%.',
        'Passo 2 — Inspeção e ordenha suave da ponta do pênis: exteriorize o pênis tracionando delicadamente o prepúcio. Inspecione o meato; frequentemente há um pequeno tampão de muco e cristais ("plug") protruindo na abertura externa. Realize uma massagem extremamente suave entre o polegar e o indicador; muitos tampões desprendem-se espontaneamente nessa manobra!',
        'Passo 3 — A MANOBRA ANATÔMICA MAIS IMPORTANTE (Retificação da Curvatura em S): a uretra do gato macho faz uma curva anatômica dorsal em "S" ao redor do arco isquiático. Segure a pele prepucial e o pênis e tracione o conjunto firmemente em sentido DORSAL E CAUDAL (para cima e para trás, em direção à cauda). Essa tração desfaz a curvatura e alinha perfeitamente a uretra peniana com a uretra pélvica.',
        'Passo 4 — Introdução inicial milimétrica: lubrifique generosamente a ponta do cateter 3,5 Fr com gel hidrossolúvel estéril. Introduza apenas os primeiros 0,5 a 1,0 cm pelo meato peniano mantendo a tração dorsocaudal.',
        'Passo 5 — Hidropropulsão retrógrada com flush pulsátil: acople a seringa de salina estéril. Enquanto avança o cateter lenta e delicadamente, realize pequenos pulsos rápidos e repetidos de injeção de salina (flush pulsátil). A coluna de líquido expande radialmente a luz uretral, lubrifica as paredes e empurra o sedimento em direção à bexiga. O LÍQUIDO DESOBSTRUI, NÃO O PLÁSTICO!',
        'Passo 6 — Conduta na resistência mecânica: se o cateter travar, NUNCA empurre com força. Verifique se a tração dorsocaudal do prepúcio foi relaxada involuntariamente; aumente o flush pulsátil; gire a sonda suavemente entre os dedos; troque para um cateter de 3,0 Fr mais fino.',
        'Passo 7 — Chegada à bexiga e alívio: ao transpor o esfíncter e a obstrução, a resistência cessa abruptamente e há refluxo livre de urina avermelhada/turva. Avance o cateter apenas o suficiente para os orifícios ficarem dentro da bexiga (cerca de 5 a 8 cm no total, nunca introduza a sonda inteira!).',
        'Passo 8 — Esvaziamento e lavagem vesical suave: esvazie a bexiga por completo e mensure o volume drenado. Se houver debris maciços ou coágulos densos, faça lavagens repetidas suaves com alíquotas de 10 a 15 mL de NaCl 0,9% estéril morno, reaspirando em seguida. Não force lavagens infinitas até a urina sair "cristalina" — a mucosa inflamada continuará sangrando levemente.'
      ]
    },

    { type: 'heading', level: 2, text: '10. Sonda de Demora e Circuito Fechado no Gato (24–36 Horas) 🛡️' },
    {
      type: 'paragraph',
      text:
        'A manutenção da sonda uretral pós-desobstrução deve seguir parâmetros atualizados de tempo e assepsia:'
    },
    {
      type: 'steps',
      items: [
        'Troca obrigatória para sonda macia: retire o cateter de polipropileno/rígido utilizado para a desobstrução e introduza um cateter de permanência confeccionado em SILICONE puro ou POLIURETANO macio (3,0 a 3,5 Fr). Manter cateteres rígidos como sonda de demora causa ulceração mecânica da bexiga e dor intensa.',
        'Tempo de permanência atualizado (iCatCare 2025): em média de 24 a 36 HORAS. A antiga conduta de manter 48 a 72 horas obrigatórias foi superada. Assim que o paciente demonstrar resolução da azotemia, urina macroscopicamente mais clara e débito estável, remova a sonda para diminuir a inflamação mecânica e o risco de infecção.',
        'Circuito fechado de drenagem obrigatório: acople a sonda a uma extensão e bolsa coletora graduada mantida sempre ABAIXO do paciente e FORA DO CHÃO. Acompanhe a produção horária de urina (mL/kg/h) e compare com o volume de fluido infundido ("ins vs. outs").',
        'Higiene local: faça antissepsia suave da interface pênis-cateter com clorexidina aquosa 0,05% a cada 8 horas.'
      ]
    },

    { type: 'heading', level: 2, text: '11. Vigilância da Diurese Pós-Obstrutiva (POD) 🌊' },
    {
      type: 'paragraph',
      text:
        'Após a liberação da via urinária, os rins frequentemente entram em uma fase de diurese osmótica maciça (Post-Obstructive Diuresis — POD):'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'A ARMADILHA DA DIURESE PÓS-OBSTRUTIVA',
      text:
        'Mecanismo: a perda do gradiente hiperosmolar medular renal decorrente da isquemia prévia associada à eliminação massiva da ureia acumulada (diurese osmótica) e à insensibilidade transitória dos túbulos ao hormônio antidiurético (ADH).\n\n• O paciente pode produzir débitos urinários impressionantes (>5 a 10 mL/kg/hora!).\n• PERIGO: o animal passa rapidamente de hipercalêmico/azotêmico para HIPOCALÊMICO SEVERO E HIPOVOLÊMICO novamente.\n• CONDUTA: monitore o débito urinário a cada 1 a 2 horas e ajuste a taxa de fluidoterapia para repor as perdas urinárias na proporção 1:1, suplementando KCl nos fluidos intravenosos conforme o ionograma seriado.'
    },

    { type: 'heading', level: 2, text: '12. Antibiótico e Prazosina: Mudanças Cruciais de Prática (iCatCare 2025) 💊' },
    {
      type: 'paragraph',
      text:
        'Dois dos medicamentos mais prescritos historicamente no gato obstruído sofreram revisão radical pelas novas evidências científicas:'
    },
    {
      type: 'steps',
      items: [
        'PRAZOSINA — NÃO RECOMENDADA DE ROTINA: por décadas prescreveu-se o alfa-1 bloqueador prazosina para "relaxar o colo vesical e a uretra". Ensaios clínicos randomizados recentes e o consenso iCatCare 2025 demonstraram AUSÊNCIA DE BENEFÍCIO estatístico na prevenção de reobstrução, e alguns estudos associaram a prazosina a maior taxa de recidiva. Além disso, seu efeito hipotensor agudo é extremamente perigoso em gatos recém-saídos de hipovolemia e choque.',
        'ANTIBIOTICOTERAPIA EMPÍRICA — FORMALMENTE DESENCORAJADA: mais de 95% dos episódios de obstrução uretral em gatos jovens decorrem de Cistite Idiopática Felina (CIF), uma doença abacteriana e estéril! O uso profilático de amoxicilina com clavulanato ou enrofloxacina não previne infecção, mas induz colonização por cepas hospitalares multirresistentes (ex.: Pseudomonas, Enterococcus faecium). Reserve antibióticos exclusivamente se houver urocultura positiva colhida por cistocentese.',
        'Medicamentos contraindicados ou ineficazes: acepromazina não tem efeito relaxante uretral comprovado e causa hipotensão severa; diazepam oral é formalmente contraindicado em felinos pelo risco de necrose hepática fulminante idiossincrática.'
      ]
    },

    { type: 'heading', level: 2, text: '13. O que Fazer Quando a Sonda Não Passa no Gato? 🚨' },
    {
      type: 'paragraph',
      text:
        'Se você realizou os passos corretos e o cateter não progride, interrompa novas tentativas forçadas para não lacerar a uretra e execute o algoritmo de resgate:'
    },
    {
      type: 'steps',
      items: [
        '1. Reavalie a retificação: confirme que a mão do assistente está mantendo o pênis e prepúcio tracionados dorsocaudalmente. Se o pênis pender ventralmente, a curva em S bloqueia o cateter.',
        '2. Aprofunde o relaxamento anestésico: pequenos movimentos de dor provocam espasmo imediato do esfíncter uretral externo estriado.',
        '3. Protocolo de Atracúrio Intrauretral (Técnica de Resgate iCatCare 2025):\n• Preparo: aspire 0,2 mL de atracúrio (10 mg/mL) e dilua em 3,8 mL de NaCl 0,9% estéril (concentração final: 0,5 mg/mL).\n• Instilação: introduza o cateter o máximo possível na uretra distal e instile lentamente a solução no lúmen uretral ao longo de 5 minutos.\n• Mecanismo: o bloqueador neuromuscular atua localmente promovendo paralisia e relaxamento da musculatura uretral estriada sem causar bloqueio sistêmico.\n• Após 5 minutos de espera, repita a manobra de hidropropulsão pulsátil.',
        '4. Suspeita de Rotura Uretral: se houver resistência súbita com perda de retorno de líquido e enfisema/edema perineal, pare imediatamente. Realize uretrografia retrógrada com contraste iodado hidrossolúvel (iohexol). Se confirmada a rotura, realize cistostomia percutânea temporária e encaminhe para intervenção cirúrgica/uretrostomia perineal.'
      ]
    },

    { type: 'heading', level: 2, text: '14. Cistite Idiopática Felina (CIF / FIC): Manejo Multimodal (MEMO) 🐱' },
    {
      type: 'paragraph',
      text:
        'Desobstruir a uretra resolve apenas a emergência imediata. Como mais de 60% a 70% dos gatos voltam a obstruir se a doença de base for negligenciada, o clínico deve compreender o que é a Cistite Idiopática Felina (CIF):'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'A CIF É UMA DOENÇA NEUROBIOLÓGICA SISTÊMICA (iCatCare 2025)',
      text:
        'A CIF não é primariamente uma inflamação da bexiga. A bexiga é apenas o "órgão de choque" periférico de um distúrbio neuroendócrino central. Gatos susceptíveis possuem hiper-reatividade do Sistema Central de Resposta à Ameaça (estresse ambiental) associado a déficit na resposta do eixo hipotálamo-hipófise-adrenal (HHA). Estressores cotidianos disparam estimulação simpática maciça, liberação de substância P na parede vesical, vasodilatação, edema mucoso e formação de plugs de muco proteico com estruvita.'
    },
    {
      type: 'steps',
      items: [
        'Pilar 1 — Analgesia prolongada: a dor visceral mantém o tônus simpático elevado. Prescreva buprenorfina sublingual (0,02 mg/kg q8–12h) para os primeiros 3 a 5 dias pós-alta.',
        'Pilar 2 — MEMO (Multimodal Environmental Modification): a intervenção mais eficaz para prevenir recidivas:\n• Regra das Caixas Sanitárias: número de caixas = número de gatos da casa + 1, distribuídas em cômodos diferentes (nunca todas alinhadas no mesmo canto da lavanderia!).\n• Tamanho e substrato: caixas grandes (comprimento de 1,5 vez o tamanho do gato), sem tampa, com areia de grãos finos sem perfume, limpas pelo menos 2 vezes ao dia.\n• Recursos separados: comida e água em locais distintos, longe das caixas de areia, com múltiplos pontos pela casa.\n• Enriquecimento vertical e esconderijos: prateleiras, arranhadores altos e tocas para permitir refúgio contra conflitos intergatos.',
        'Pilar 3 — Aumento agressivo da ingestão de água: transição gradual para dieta 100% úmida (sachês/patês), fontes de água corrente e água aromatizada (caldo de frango sem sal) para manter a densidade urinária abaixo de 1.035 e diluir o sedimento.',
        'Fármacos comprovadamente ineficazes na CIF: o consenso iCatCare 2025 destaca que corticoides (prednisolona), anti-inflamatórios e suplementos de glicosaminoglicanos (GAGs / pentosan) NÃO demonstraram benefício estatístico em ensaios controlados.'
      ]
    },

    { type: 'heading', level: 2, text: '15. Parte II — Cão com Obstrução Uretral: Mecânica vs. Funcional 🐶' },
    {
      type: 'paragraph',
      text:
        'No cão, o consenso ACVIM de Distúrbios de Micção (2024) estabelece a diferenciação inicial obrigatória entre as duas grandes classes obstrutivas:'
    },
    {
      type: 'steps',
      items: [
        'Obstrução Mecânica da Via de Saída (Mechanical Outflow Obstruction — MOO): emergência urológica clássica. Decorre de obstrução física intraluminal (uretrólitos em mais de 80% dos casos; coágulos), intramural (carcinoma urotelial, estenose uretral, uretrite proliferativa) ou extraluminal (hiperplasia prostática benigna, prostatite, abscesso prostático ou massas pélvicas).',
        'Obstrução Funcional da Via de Saída (Functional Outflow Obstruction — FOO): anteriormente denominada dissinergia detrusor-uretral idiopática. Ocorre falha no relaxamento reflexo do esfíncter uretral estriado ou liso durante a contração do detrusor. Típica de cães machos de grande porte e jovens a meia-idade: o cão inicia a postura miccional produzindo um jato fino que é subitamente interrompido, resultando em grande volume urinário residual. SÓ PODE SER DIAGNOSTICADA APÓS EXCLUIR CÁLCULOS E MASSAS POR IMAGEM.'
      ]
    },

    { type: 'heading', level: 2, text: '16. Diagnóstico por Imagem no Cão Obstruído 📸' },
    {
      type: 'paragraph',
      text:
        'A radiografia simples é o primeiro exame obrigatório no cão macho com retenção urinária mecânica:'
    },
    {
      type: 'steps',
      items: [
        'Projeção radiográfica lateral completa: o filme radiográfico DEVE incluir toda a extensão da uretra — desde o colo vesical e uretra pélvica, passando pelo arco isquiático, até a ponta do pênis. Os membros pélvicos devem ser tracionados cranialmente para evitar sobreposição dos fêmures sobre a uretra isquiática.',
        'A anatomia do "Os Penis" (Osso Peniano): a transição entre a uretra pélvica e a uretra peniana na base do osso peniano é circundada por uma canaleta óssea rígida e inexpansível. É exatamente nesse ponto de estreitamento que mais de 85% dos uretrólitos caninos ficam aprisionados!',
        'Quando a radiografia simples é negativa: suspeite de cálculos radiolucentes (urato de amônio em Dálmatas e cães com shunt portossistêmico; cistina em Bulldogs e Teckels) ou estenose/neoplasia. Realize URETROCISTOGRAFIA RETRÓGRADA com contraste iodado hidrossolúvel positivo ou ultrassonografia transretal.'
      ]
    },

    { type: 'heading', level: 2, text: '17. Ilustração Técnica: Retro-hidropropulsão Canina 📸' },
    {
      type: 'paragraph',
      text:
        'O esquema abaixo resume o protocolo cirúrgico de retropulsão hidráulica de uretrólitos em cães machos recomendado pelo BSAVA e ACVIM:'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/retro-hidropropulsao-canina-passos.svg',
      alt: 'Diagrama esquemático da técnica de retro-hidropropulsão uretral em cães machos com oclusão retal.',
      caption:
        'Figura 2: Retro-hidropropulsão de uretrólitos no cão macho. (1) Sítio de impacto clássico na base do osso peniano. (2) Passo a passo: lubrificação com mistura 50:50, cateter posicionado caudal ao cálculo, oclusão digital retal da uretra pélvica e liberação súbita da compressão com flush contínuo. (3) Importância do RX pós-procedimento (sucesso cumulativo de 86,7% na 2ª tentativa). (4) Encaminhamento do urólito para análise mineral.'
    },

    { type: 'heading', level: 2, text: '18. Técnica de Retro-hidropropulsão no Cão Macho Passo a Passo 🪨' },
    {
      type: 'paragraph',
      text:
        'A retro-hidropropulsão bem-sucedida baseia-se na expansão hidrostática da uretra ao redor do cálculo, e NÃO na força física do cateter (BSAVA Guide to Procedures 2024):'
    },
    {
      type: 'steps',
      items: [
        'Passo 1 — Anestesia geral e posicionamento: induza anestesia geral balanceada para relaxamento completo do tônus uretral. Posicione o cão em decúbito lateral.',
        'Passo 2 — Cistocentese descompressiva preparatória: se a bexiga estiver repleta e tensa, descomprima-a previamente por cistocentese com extensor e torneira de 3 vias. Isso reduz a pressão intravesical oposta e cria espaço para receber o volume de líquido que será injetado pela uretra.',
        'Passo 3 — Preparo da mistura lubrificante 50:50: em uma seringa de 20 mL, misture 5 mL de solução salina 0,9% estéril e 5 mL de gel lubrificante hidrossolúvel estéril (utilize uma torneira de 3 vias para homogeneizar a mistura).',
        'Passo 4 — Posicionamento da sonda imediatamente distal ao cálculo: introduza um cateter uretral flexível de bom calibre (6 a 10 Fr, conforme o porte) pelo pênis até encontrar a resistência do cálculo. NUNCA tente empurrar a pedra com a ponta do cateter! A ponta deve permanecer 0,5 cm caudal/distal ao cálculo.',
        'Passo 5 — Instilação de lubrificante ao redor do cálculo: injete 3 a 8 mL da mistura salina/lubrificante para envolver o urólito e reduzir o coeficiente de atrito contra a mucosa uretral.',
        'Passo 6 — Oclusão dupla simultânea (A chave da técnica!):\n• O auxiliar: calça luva, lubrifica o dedo indicador, introduz no reto do cão e comprime firmemente a uretra pélvica contra a face dorsal da sínfise púbica.\n• O operador: com compressas de gaze estéril úmidas, comprime firmemente o meato peniano ao redor do cateter para vedar qualquer refluxo externo.',
        'Passo 7 — Pressurização hidrostática: acople uma seringa grande de 20 a 50 mL contendo salina estéril ao cateter. Injete com firmeza e pressão contínua. Com a uretra ocluída no reto e no pênis, a pressão do fluido dilata a luz uretral ao redor do cálculo.',
        'Passo 8 — Liberação súbita da compressão pélvica: no momento de maior distensão líquida, o assistente RETIRA ABRUPTAMENTE o dedo da compressão retal enquanto o operador CONTINUA INJETANDO vigorosamente o flush de salina. A onda de choque hidrostática impulsiona o cálculo livremente pela uretra pélvica em direção à bexiga!',
        'Passo 9 — Vigilância da repleção vesical: palpe o abdome a cada ciclo de injeção. Não permita que a bexiga atinja hiperdistensão iatrogênica; se necessário, aspire novamente por cistocentese.'
      ]
    },

    { type: 'heading', level: 2, text: '19. Confirmação por Imagem e Documentação Radiográfica (Frontiers 2023) 📸' },
    {
      type: 'paragraph',
      text:
        'A passagem livre do cateter para a bexiga NÃO comprova isoladamente que todos os cálculos foram retropulsionados! É comum o cateter contornar um urólito irregular e entrar no lúmen vesical, deixando fragmentos pontiagudos impactados na uretra membranosa (a taxa de sucesso na primeira tentativa é de apenas 55,6%, elevando-se para 86,7% no segundo ciclo):'
    },
    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/retro-hidropropulsao-cao-frontiers-2023.webp',
      alt: 'Radiografias laterais antes e depois de retro-hidropropulsão bem-sucedida em cão macho (Frontiers 2023).',
      caption:
        'Figura 3: Radiografia lateral pré e pós-retro-hidropropulsão em cão macho (Er, Fick & Long Mays, Frontiers in Vet Sci 2023, licença CC BY). (A) Presença de múltiplos uretrólitos radiopacos impactados na transição isquiática e base do osso peniano. (B) Pós-hidropropulsão bem-sucedida: os cálculos foram totalmente carreados para a bexiga, liberando o trajeto uretral. Observa-se cateter de cistostomia percutânea (pigtail) temporário posicionado.'
    },

    { type: 'heading', level: 2, text: '20. Destino Definitivo do Cálculo e Análise Mineral Quantitativa 🔬' },
    {
      type: 'paragraph',
      text:
        'A retro-hidropropulsão transforma uma emergência obstrutiva com risco de vida em um caso eletivo de urolitíase vesical não obstrutiva:'
    },
    {
      type: 'steps',
      items: [
        'Opções terapêuticas para o cistólito: litotripsia a laser minimamente invasiva com cistoscopia e retirada por cestóide (basket retrieval, padrão-ouro ACVIM), cistolitotomia percutânea (PCCL) ou cistotomia cirúrgica convencional por laparotomia.',
        'Dissolução clínica medicamentosa: só é aplicável se houver forte suspeita de estruvita não obstrutiva associada a infecção em fêmeas ou cães desobstruídos com fluxo livre.',
        'ANÁLISE MINERAL QUANTITATIVA OBRIGATÓRIA: todo e qualquer urólito extraído deve ser lavado em água destilada, seco e encaminhado para laboratório de referência para análise por Espectroscopia de Infravermelho com Transformada de Fourier (FTIR) ou Difração de Raios-X. O cristal encontrado na urinálise NÃO substitui a análise mineral do cálculo!'
      ]
    },

    { type: 'heading', level: 2, text: '21. Falha de Desobstrução no Cão: Cistostomia Pigtail como Ponte 🪢' },
    {
      type: 'paragraph',
      text:
        'Se após dois ciclos completos e tecnicamente perfeitos de hidropropulsão o cálculo persistir firmemente encravado, PARE IMEDIATAMENTE de traumatizar a uretra:'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'CONDUTA DIANTE DA FALHA DE RETROPULSÃO',
      text:
        '1. Não insista com força bruta (risco iminente de ruptura de uretra e necrose peniana).\n2. Implante um cateter de cistostomia pré-púbica percutânea com balão ou pigtail sob controle ecográfico (Frontiers 2023, VECC Procedures 2025).\n3. A cistostomia desvia o fluxo urinário, normaliza a função renal e permite estabilização metabólica e eletrolítica segura.\n4. Encaminhe o paciente em seguida para cirurgia de cistotomia associada a flushing retrógrado assistido por incisão vesical ou uretrostomia escrotal de urgência.'
    },

    { type: 'heading', level: 2, text: '22. Obstrução Uretral na Cadela: O que Pensar? 🐕' },
    {
      type: 'paragraph',
      text:
        'A uretra da cadela é curta, de amplo calibre e complacente. Por essa razão, a retenção urinária obstrutiva verdadeira em fêmeas caninas é extremamente rara:'
    },
    {
      type: 'steps',
      items: [
        'Diagnósticos diferenciais primários: urólito volumoso migrado da bexiga que ultrapassou o colo vesical; carcinoma urotelial (de células de transição) invadindo o colo da bexiga e a uretra proximal; estenose uretral cicatricial secundária a trauma obstétrico ou cirurgia pélvica prévia; uretrite proliferativa crônica.',
        'Abordagem clínica: proceda à cateterização uretral pela técnica digital da papila no assoalho ventral ou com espéculo vaginal/otoscópio. Se houver resistência anatômica firme impedindo a progressão, realize cistoscopia e biópsia imediata sob visão direta.'
      ]
    },

    { type: 'heading', level: 2, text: '23. Tabela de Troubleshooting Clínico Rápido ⚙️' },
    {
      type: 'paragraph',
      text:
        'Resolução objetiva para os dilemas mais frequentes no plantão de urgência urológica:'
    },
    {
      type: 'table',
      headers: ['Intercorrência Observada', 'Causa Mais Provável', 'Conduta Imediata Recomendada'],
      rows: [
        [
          'Gato com K⁺ >8 mmol/L e FC <120 bpm na admissão',
          'Cardiotoxicidade hipercalêmica grave por anúria pós-renal',
          'Administrar Gluconato de Cálcio 10% (0,5–1,5 mL/kg IV lento em 10–20 min sob ECG contínuo). Iniciar expansão volêmica imediata.'
        ],
        [
          'Cateter felino 3,5 Fr não passa de 1–2 cm',
          'Uretra curvada em "S" não alinhada ou plug distal no meato',
          'Tracionar o prepúcio e pênis dorsal e caudalmente para esticar a uretra. Ordenhar a ponta do pênis. Fazer flush pulsátil de salina.'
        ],
        [
          'Resistência contínua na uretra pélvica do gato apesar da tração',
          'Espasmo intenso do esfíncter uretral estriado ou cálculo encravado',
          'Instilar atracúrio intrauretral (0,5 mg/mL por 5 min). Aprofundar anestesia geral. Se falhar, realizar cistocentese descompressiva.'
        ],
        [
          'Presença de sangue abundante na urina do gato pós-desobstrução',
          'Hemorragia por estiramento da mucosa vesical isquêmica (descompressão)',
          'Normal nos primeiros 20 mL. Realizar lavagens suaves com NaCl 0,9% morno sem forçar. Manter circuito fechado e monitorar hematócrito.'
        ],
        [
          'Gato produz >8 mL/kg/hora de urina 4h após desobstruir',
          'Diurese pós-obstrutiva osmótica (POD) com perda de água e K⁺',
          'Reposição de fluidos na proporção 1:1 com o débito medido. Suplementar KCl no soro com base em eletrólitos seriados.'
        ],
        [
          'Cão macho: cálculo não volta para a bexiga no primeiro flush',
          'Pressurização hidrostática insuficiente ou escape de líquido',
          'Assegurar oclusão digital retal firme da uretra pélvica + meato ocluído com gaze. Usar mistura 50:50 salina/lubrificante e soltar abruptamente.'
        ],
        [
          'A sonda passa no cão, mas o RX pós-procedimento mostra pedras',
          'Cateter contornou os urólitos na uretra membranosa/peniana',
          'Repetir a retro-hidropropulsão com sonda de maior calibre (8–10 Fr) para carregar todos os fragmentos residuais à bexiga.'
        ],
        [
          'Infiltração de líquido no subcutâneo perineal durante o flush',
          'Laceração ou rotura iatrogênica da parede uretral',
          'PARAR IMEDIATAMENTE O FLUSH. Uretrografia com contraste iodado hidrossolúvel. Implante de cistostomia temporária e avaliar cirurgia.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '24. Fluxograma de Decisão Clínica na Obstrução Uretral 🔄' },
    {
      type: 'flowchart',
      title: 'Algoritmo Decisório de Triagem, Desobstrução e Manejo',
      nodes: [
        { id: 'tri', label: 'Triagem: Bexiga pétrea + Estrangúria/Anúria', variant: 'start' },
        { id: 'eval', label: 'ECG + K⁺ + Perfusão: Hipercalemia / Arritmia presente?', variant: 'decision' },
        { id: 'ca', label: 'Emergência: Gluconato de Cálcio 10% IV lento + Insulina/Dextrose', variant: 'action' },
        { id: 'stab', label: 'Estabilização volêmica: Ringer Lactato titulado 10 mL/kg', variant: 'action' },
        { id: 'spec', label: 'Espécie do Paciente?', variant: 'decision' },
        { id: 'cat', label: '🐱 GATO: Anestesia geral + Retificação em S + Flush pulsátil 3,5 Fr', variant: 'action' },
        { id: 'dog', label: '🐶 CÃO: RX uretra total + Anestesia + Retro-hidropropulsão c/ oclusão retal', variant: 'action' },
        { id: 'ok_cat', label: 'Desobstrução felina bem-sucedida: Sonda macia 24-36h + Sistema fechado', variant: 'action' },
        { id: 'ok_dog', label: 'Cálculo retropulsionado: RX confirmação + Cirurgia/Litotripsia eletiva', variant: 'action' },
        { id: 'post', label: 'Vigilância da Diurese Pós-Obstrutiva (POD) + Controle do K⁺ e Débito', variant: 'action' },
        { id: 'long', label: 'Tratamento de base: CIF (Analgesia + MEMO + Água) | Cão (Análise mineral)', variant: 'end' }
      ],
      edges: [
        { from: 'tri', to: 'eval' },
        { from: 'eval', to: 'ca', label: 'Sim (FC <140 ou K⁺ >7,5)' },
        { from: 'eval', to: 'stab', label: 'Não (K⁺ normal)' },
        { from: 'ca', to: 'stab' },
        { from: 'stab', to: 'spec' },
        { from: 'spec', to: 'cat', label: 'Felino' },
        { from: 'spec', to: 'dog', label: 'Canino' },
        { from: 'cat', to: 'ok_cat' },
        { from: 'dog', to: 'ok_dog' },
        { from: 'ok_cat', to: 'post' },
        { from: 'ok_dog', to: 'post' },
        { from: 'post', to: 'long' }
      ]
    },

    { type: 'heading', level: 2, text: '25. Box de Bolso — Checklist de Ouro e "Erros Fatais" 📋' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'CHECKLIST DO PLANTÃO — DESOBSTRUÇÃO URETRAL 🩺💧',
      text:
        '1. ESTABILIZE PRIMEIRO: Trate a hipercalemia e o choque antes de desobstruir! FC <140 bpm e T <35,5°C = K⁺ >8 mmol/L (Gluconato de cálcio 10% IV lento em 10–20 min).\n\n' +
        '2. GATO: NUNCA USE MANDRIL (STYLET) DENTRO DA URETRA. Retire o estilete de aço antes da inserção.\n\n' +
        '3. MANOBRA EM "S": Tracione o prepúcio e o pênis para trás e para cima; uretra retificada elimina 90% do atrito mecânico.\n\n' +
        '4. O FLUIDO DESOBSTRUI: Use pequenos jatos de salina (flush pulsátil) com cateter 3,0–3,5 Fr. A sonda NUNCA deve ser usada como aríete contra o plug!\n\n' +
        '5. CÃO: RX DE TODA A URETRA ANTES. A retro-hidropropulsão exige mistura 50:50 salina/gel, oclusão digital retal e liberação súbita com flush contínuo.\n\n' +
        '6. CONFIRMAÇÃO POR IMAGEM: O fato da sonda passar no cão não garante que a uretra está limpa. Repita o RX pós-procedimento!\n\n' +
        '7. CIRCUITO FECHADO E TEMPO: Bolsa sempre abaixo da bexiga e fora do chão. Tempo de permanência no gato: 24 a 36 horas (não 48 h cegas).\n\n' +
        '8. O QUE NÃO FAZER: NÃO prescrever prazosina de rotina, NÃO usar antibióticos profiláticos empíricos e NUNCA espremer a bexiga manualmente!\n\n' +
        '9. TRATAR A DOENÇA REAL: No gato com CIF, a desobstrução é só o começo; trate a dor e institua MEMO (enriquecimento ambiental, caixas limpas e água abundante).'
    },

    { type: 'heading', level: 2, text: '26. Referências Técnicas e Bibliográficas 📚' },
    {
      type: 'paragraph',
      text:
        'O conteúdo deste guia integra os consensos e diretrizes internacionais mais recentes de emergência, urologia e medicina felina:'
    },
    {
      type: 'steps',
      items: [
        'Taylor SS, Sparkes AH, et al. 2025 iCatCare Consensus Guidelines on the Diagnosis and Management of Feline Lower Urinary Tract Diseases. J Feline Med Surg (JFMS). 2025;27(1):1098612X241309176. (Consenso global mais recente para medicina felina, atualizando fluidoterapia, prazosina, cistocentese, atracúrio e MEMO).',
        'Lulich JP, Osborne CA, et al. ACVIM Small Animal Consensus Recommendations on the Treatment and Prevention of Uroliths in Dogs and Cats. J Vet Intern Med. 2016;30(5):1564–1574.',
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Urethral catheterization – tomcat with blocked urethra (pp. 292–294) & Urethral retrograde urohydropulsion in a male dog (pp. 296–298).',
        'Johnson CA, ed. Veterinary Emergency and Critical Care Procedures. 3rd ed. Wiley-Blackwell; 2025. Chapter 6: Urinary Catheter Placement, Urohydropulsion, and Temporary Antepubic Cystostomy Catheter Placement (pp. 173–209).',
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 43: Canine and Feline Urolithiasis (pp. 712–724) & Chapter 44: Obstructive and Nonobstructive Feline Idiopathic Cystitis (pp. 724–729).',
        'Er J, Fick J, Long Mays K. Management of obstructive urolithiasis with percutaneous pigtail cystostomy catheter placement in three male dogs. Front Vet Sci. 2023;10:1200406. Open Access CC BY. (Demonstração da retro-hidropropulsão e resgate por cistostomia temporária).',
        'Kim J, et al. Evaluation of retrograde urohydropulsion using computed tomography in 45 male dogs with urethral calculi. J Vet Med Sci. 2022;84(10):1343–1348. (Estatísticas de sucesso na 1ª vs. 2ª tentativa de hidropropulsão e cálculos residuais na uretra membranosa).',
        'Fascetti AJ, Delaney SJ, eds. Applied Veterinary Clinical Nutrition. 2nd ed. Wiley-Blackwell; 2024. Chapter 16: Nutritional Management of Lower Urinary Tract Disease — urethral plugs and idiopathic cystitis (pp. 412–433).',
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. British Small Animal Veterinary Association; 2018. Chapter 8: Renal and urinary tract emergencies (pp. 123–135).'
      ]
    }
  ],
  isPublished: true
};


/**
 * Guia: Sondagem uretral em cães machos.
 * Conteúdo técnico de procedimentos, urologia, emergência e terapia intensiva de pequenos animais.
 * Referências: BSAVA Guide to Procedures (3ª ed., 2024), VECC Procedures (3ª ed., 2025), Textbook of Small Animal Emergency Medicine (2019), Atlas of Canine and Feline Urinalysis (2017), ISCAID Guidelines (2019).
 */
const guiaSondagemUretralMachos: ClinicalQuickGuide = {
  id: 'cqg-sondagem-uretral-machos-010',
  slug: 'sondagem-uretral-caes-machos',
  title: 'Sondagem uretral em cães machos: técnica passo a passo, pontos de resistência e manejo',
  subtitle:
    'Nefro-Urologia & Emergência — Passagem atraumática, manobra de retificação pélvica, os penis e arco isquiático, protocolo seguro de Foley, prevenção de CAUTI (ISCAID) e conduta em obstruções',
  summary:
    'Guia prático e avançado para cateterização uretral no cão macho: anatomia sagital e superação atraumática dos 3 pontos de resistência fisiológica (osso peniano, arco isquiático e próstata), a manobra de retificação peniana caudal, mensuração prévia antinó intravesical, regras absolutas para insuflação da sonda Foley, sistema fechado e prevenção de infecção (ISCAID 2019), escalonamento em obstruções e uso de fio-guia hidrofílico.',
  category: 'procedimentos',
  species: ['dog'],
  searchKeywords: [
    'sondagem uretral cao',
    'sondagem uretral cao macho',
    'cateterizacao uretral cao',
    'cateterismo urinario cao',
    'sonda foley cao',
    'foley silicone',
    'arco isquiatico',
    'os penis',
    'osso peniano',
    'retificacao uretral',
    'no intravesical',
    'cauti',
    'iscaid 2019',
    'uro-hidropropulsao',
    'debito urinario cao',
    'retencao urinaria cao',
    'bsava procedures 2024',
    'vecc 2025'
  ],
  youtubeVideoId: null,
  heroImageSrc: '/consulta-vet/clinical-guides/procedure-covers/sondagem-uretral-caes-machos.webp',
  heroImageAlt: 'Imagem ilustrativa de sondagem uretral em cães machos: técnica passo a passo, pontos de resistência e manejo: materiais ou modelo didático, sem pacientes.',
  quickBullets: [
    'A sonda deve acompanhar a anatomia: NUNCA vença a resistência mecânica com o uso da força.',
    '3 pontos de resistência fisiológica normais: os penis (sulco ósseo inextensível), arco isquiático (curva pélvica) e região prostática.',
    'O truque de ouro da técnica: tracionar o pênis e o prepúcio CAUDALMENTE retifica a uretra, desfazendo o cotovelo de 90° no arco isquiático.',
    '📏 Meça antes de inserir: calcule da ponta da glande ao colo vesical para evitar dobras, alças e a temida formação de nó intravesical.',
    'Cateter Foley: JAMAIS insufle o balão dentro da uretra! Avance até obter urina + 2 a 4 cm, retire o estilete e insufle com água estéril.',
    'Prevenção de CAUTI (ISCAID): mantenha sistema 100% fechado com bolsa suspensa abaixo da bexiga e SEM antibiótico profilático empírico.'
  ],
  sections: [
    { type: 'heading', level: 2, text: '1. O Princípio Fundamental & Bases Técnicas 🩺' },
    {
      type: 'paragraph',
      text:
        'A cateterização uretral no cão macho é frequentemente descrita como um procedimento simples porque o óstio uretral externo é diretamente visível na ponta da glande do pênis exteriorizado — dispensando os espéculos e a palpação às cegas necessários na fêmea. No entanto, a verdadeira complexidade clínica começa logo após a sonda penetrar no lúmen uretral: o trajeto anatômico possui estreitamentos e curvaturas fisiológicas rígidas que oferecem resistência mecânica natural, sendo os mesmos sítios onde impactam urólitos, estenoses e neoplasias.'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'A REGRA DE OURO DA CATETERIZAÇÃO URETRAL',
      text:
        'A sonda deve acompanhar a anatomia; a anatomia NUNCA deve ser vencida pela força.\n\n' +
        'O lúmen uretral canino é extremamente vascularizado e delicado. Qualquer tentativa de "empurrar com mais força" quando a sonda encontra resistência converte um procedimento simples em dilaceração da mucosa, falso trajeto, extravasamento perirretal de urina ou ruptura uretral traumática que demandará reconstrução cirúrgica de urgência.'
    },
    {
      type: 'paragraph',
      text:
        'Este guia padroniza a técnica baseando-se nas mais respeitadas diretrizes internacionais de procedimentos e emergência: o BSAVA Guide to Procedures in Small Animal Practice (3ª ed., 2024, pp. 284–286 e 296–298), o Veterinary Emergency and Critical Care Procedures (3ª ed., 2025, Cap. 6, pp. 173–180), o Textbook of Small Animal Emergency Medicine (2019, Cap. 187, pp. 1210–1215), o Atlas of Canine and Feline Urinalysis (2017) e o consenso ISCAID sobre prevenção de infecções do trato urinário associadas a cateter (CAUTI).'
    },

    { type: 'heading', level: 2, text: '2. Quando Sondar um Cão Macho? Indicações Clínicas e de UTI 🎯' },
    {
      type: 'paragraph',
      text:
        'A sondagem uretral no cão macho deve ser realizada sob justificativa diagnóstica ou terapêutica bem fundamentada, e não como atalho para coleta de rotina:'
    },
    {
      type: 'steps',
      items: [
        'Monitoramento quantitativo do débito urinário: padrão-ouro em pacientes críticos com choque, sepse, lesão renal aguda (LRA) ou insuficiência cardíaca congestiva, onde o balanço hídrico rigoroso (alvo: 1 a 2 mL/kg/hora) orienta a fluidoterapia e o uso de inotrópicos e diuréticos.',
        'Descompressão e esvaziamento vesical em retenção urinária: alívio da hiperdistensão por obstrução mecânica (urólitos, estenose, hiperplasia prostática, neoplasia) ou distúrbios funcionais (bexiga neurogênica por trauma medular, hérnia de disco toracolombar ou atonia do detrusor).',
        'Pacientes não ambulatórios, em decúbito prolongado ou anestesiados: cães politraumatizados, sob anestesia geral prolongada ou com tetraparesia, prevenindo retenção urinária dolorosa e escaldaduras graves por contato com a urina.',
        'Manutenção temporária da patência uretral pós-desobstrução: drenagem mantida por 24 a 48 horas após remoção de urólitos ou tampões inflamatórios para permitir a redução do edema da mucosa e prevenir reobstrução precoce.',
        'Estudos radiográficos contrastados do trato inferior: administração retrógrada de meio de contraste iodado hidrossolúvel para uretrografia retrógrada e cistografia positiva ou de duplo contraste.',
        'Tratamento conservador de lesões uretrais parciais selecionadas: atuando como molde ("stent") intraluminal para guiar a regeneração epitelial por segunda intenção sob drenagem contínua.'
      ]
    },

    { type: 'heading', level: 2, text: '3. Quando NÃO Fazer uma Sondagem Rotineira (Contraindicações) 🚫' },
    {
      type: 'paragraph',
      text:
        'O BSAVA Guide to Procedures 2024 estabelece como contraindicações à sondagem uretral transuretral convencional:'
    },
    {
      type: 'steps',
      items: [
        'Suspeita de ruptura ou dilaceração uretral preexistente: traumatismos pélvicos graves com fratura de bacia ou atropelamentos frequentemente provocam rotura da uretra membranosa. A sondagem cega e insistente nesses casos perfura o hematoma, desvia para o tecido celular subcutâneo ou retroperitoneal e agrava a lesão. (Nesses casos, a avaliação deve ser feita por uretrografia retrógrada com baixa pressão, endoscopia ou auxílio de fio-guia hidrofílico).',
        'Massas uretrais volumosas ou estenosantes: neoplasias como carcinoma de células uretrais/transicionais (TCC) tornam a parede extremamente friável. A tentativa de forçar uma sonda pode provocar perfuração transmural ou sangramento incoercível.',
        'Estenoses uretrais cicatriciais severas: exigem dilatação por balão, stents uretrais ou uretrostomia, e não passagem forçada de sondas de calibre comum.',
        'Coleta rotineira de urina para urinálise sem retenção: NUNCA sonde um cão apenas para "pegar urina rápida" se o paciente puder urinar espontaneamente ou se a cistocentese for viável.'
      ]
    },

    { type: 'heading', level: 2, text: '4. Sondagem vs. Cistocentese: Cuidados Pré-Analíticos 🔬' },
    {
      type: 'paragraph',
      text:
        'O Atlas of Canine and Feline Urinalysis (2017) ressalta dois princípios laboratoriais indispensáveis na escolha do método de coleta:'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'ARTEFATOS PRÉ-ANALÍTICOS INDUZIDOS PELA SONDA',
      text:
        '1. UROCULTURA: A cistocentese guiada por ultrassom é SEMPRE o método preferencial para cultura e antibiograma. A sondagem transuretral inevitavelmente arrasta bactérias comensais da mucosa prepucial e do óstio distal, gerando resultados falso-positivos ou crescimento polimicrobiano de colonizadores.\n\n' +
        '2. HEMATÚRIA E DESPAMAÇÃO CELULAR IATROGÊNICAS: O atrito mecânico da sonda sobre a mucosa uretral e vesical esfolia células transicionais e causa microtraumas capilares. É esperado encontrar eritrócitos (hematúria microscópica) e agrupamentos de células epiteliais de transição na amostra colhida por sonda, achado que não deve ser confundido erroneamente com cistite hemorrágica ou neoplasia.'
    },

    { type: 'heading', level: 2, text: '5. Anatomia Sagital da Uretra Canina: Os 3 Pontos de Resistência 🦴' },
    {
      type: 'paragraph',
      text:
        'Ao introduzir o cateter, o clínico deve mentalizar o trajeto contínuo: óstio uretral externo → uretra peniana → sulco do osso peniano → arco isquiático (uretra membranosa) → próstata (uretra prostática) → colo vesical → lúmen da bexiga. Em três regiões anatômicas específicas, é absolutamente fisiológico encontrar um aumento súbito e discreto na resistência:'
    },
    {
      type: 'steps',
      items: [
        '① Região do Osso Peniano (Os Penis):\nA uretra corre ventralmente abrigada em uma calha óssea inextensível (sulco uretral do os penis). Essa conformação óssea restringe a complacência do tubo urinário. Além disso, o BSAVA descreve um discreto estreitamento luminal fisiológico nesse ponto. É também o sítio mais comum de impacto mecânico de urólitos provenientes da bexiga.',
        '② Arco Isquiático (Curvatura Pélvica Caudal):\nPara entrar na cavidade pélvica, a uretra precisa realizar uma curva anatômica acentuada ao contornar a borda caudal da sínfise isquiática. Em repouso, essa curva forma um ângulo próximo a 90°. Se o operador simplesmente empurrar a sonda para a frente, a ponta colidirá perpendicularmente contra a parede dorsal da uretra.',
        '③ Região Prostática (Uretra Prostática):\nA próstata envolve circularmente a uretra proximal adjacente ao colo vesical. Em machos não castrados (inteiros) e em animais idosos com Hiperplasia Prostática Benigna (HPB) ou prostatite, o parênquima glandular comprimido reduz o diâmetro intraluminal, exigindo pressão contínua, porém extremamente suave, para progressão.'
      ]
    },

    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/sondagem-uretral-cao-anatomia-retificacao.svg',
      alt: 'Anatomia sagital da uretra do cão macho mostrando os 3 pontos de resistência fisiológica e manobra de retificação',
      caption:
        'Figura 1: Anatomia sagital canina com os 3 pontos de resistência fisiológica (1: Os penis, 2: Arco isquiático, 3: Próstata) e comparação biomecânica demonstrando a redução da angulação uretral de 90° para 160° com a tração caudal do pênis (BSAVA 2024 / VECC 2025).'
    },

    { type: 'heading', level: 2, text: '6. O Truque Mais Importante da Técnica: A Manobra de Retificação Caudal 💡' },
    {
      type: 'paragraph',
      text:
        'A maioria das falhas e falsas vias na sondagem do cão macho ocorre no arco isquiático. O clínico empurra a sonda com o pênis apontado para a cabeça do paciente (cranial), mantendo o arco uretral dobrado em ângulo agudo. A sonda encurva-se, bate na parede óssea dorsal e para.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'A MANOBRA BIOMECÂNICA (BSAVA 2024)',
      text:
        'Assim que a extremidade da sonda ultrapassar a base do osso peniano:\n' +
        '1. Segure o corpo do pênis e o prepúcio com gaze estéril.\n' +
        '2. Tracione o pênis e o prepúcio suavemente no SENTIDO CAUDAL (em direção ao ânus / cauda do paciente).\n' +
        '3. Ao puxar o pênis para trás, você alinha o eixo da uretra peniana com a uretra membranosa pélvica, abrindo o ângulo de 90° para aproximadamente 160° (retificação).\n\n' +
        '💡 Uma sonda que parecia completamente "bloqueada" no arco isquiático passa a avançar com um simples toque macio logo após a aplicação do vetor caudal, sem nenhuma necessidade de força adicional!'
    },

    { type: 'heading', level: 2, text: '7. Escolha do Cateter: Tipos, Calibres e Materiais 📏' },
    {
      type: 'paragraph',
      text:
        'A escolha do dispositivo deve equilibrar o objetivo clínico (alívio rápido vs. permanência na UTI), o calibre do paciente e a biocompatibilidade do material. O princípio geral ditado pelo Atlas of Urinalysis é: "utilize o menor diâmetro que atenda com eficácia o objetivo clínico", reduzindo o atrito e a necrose por compressão mucosa.'
    },
    {
      type: 'table',
      caption: 'Guia de Seleção de Cateteres Uretrais em Cães Machos (BSAVA 2024 / VECC 2025 / ISCAID)',
      headers: ['Tipo de Cateter', 'Material', 'Calibre (Fr)', 'Comprimento', 'Indicação Principal & Vantagens'],
      rows: [
        [
          'Nylon / Poliamida Flexível',
          'Poliamida semi-rígida',
          '6 a 10 Fr',
          '50 a 60 cm',
          'Sondagem pontual de alívio, esvaziamento diagnóstico e retro-hidropropulsão de urólitos (BSAVA 2024). Boa dirigibilidade.'
        ],
        [
          'Foley de Silicone',
          'Silicone puro (100%)',
          '5 a 10 Fr',
          '30 ou 55 cm',
          'PADRÃO-OURO para permanência / UTI. Balão autoestático atraumático, altíssima biocompatibilidade e menor incrustação mineral.'
        ],
        [
          'Poliuretano Macio (Mila)',
          'Poliuretano termossensível',
          '4 a 8 Fr',
          '30 a 50 cm',
          'Permanência em cães pequenos ou de porte médio. Macio à temperatura corporal, radiopaco e com marcações centimétricas.'
        ],
        [
          'Red Rubber (Robinson)',
          'Borracha de látex natural',
          '5 a 10 Fr',
          '40 cm',
          'Sondagem temporária ou lavagens vesicais. Muito flexível, mas o látex pode induzir inflamação tecidual se mantido por dias.'
        ],
        [
          'Fio-Guia Hidrofílico',
          'Nitinol com cobertura hidrofílica',
          '0,035 polegadas',
          '100 a 150 cm',
          'Uso intervencionista em uretra lacerada, estenose ou falsa via (trilho para cateter open-ended sob fluoroscopia).'
        ]
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'LEMBRETE MATEMÁTICO: A ESCALA FRENCH (Fr)',
      text:
        '1 French (Fr) equivale a 0,33 mm de diâmetro externo:\n' +
        '• 3,5 Fr ≈ 1,1 mm (cães miniatura / filhotes)\n' +
        '• 6 Fr ≈ 2,0 mm (cães pequenos e médios)\n' +
        '• 8 Fr ≈ 2,6 mm (cães médios e grandes)\n' +
        '• 10 Fr ≈ 3,3 mm (cães gigantes / uro-hidropropulsão)\n\n' +
        'Lembre-se: cães machos exigem sondas muito mais longas que fêmeas (comprimento típico de 50 a 60 cm para cães de grande porte, enquanto fêmeas utilizam 15 a 30 cm).'
    },

    { type: 'heading', level: 2, text: '8. Mensuração Prévia Obrigatória: Como Evitar o Nó Intravesical 📏' },
    {
      type: 'paragraph',
      text:
        'Um dos erros mais comuns de operadores inexperientes é introduzir a sonda inteira (40 a 60 cm) em um cão de porte médio só porque ela "continua entrando com facilidade".'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'O PERIGO DA FORMAÇÃO DE NÓ INTRAVESICAL',
      text:
        'Quando um comprimento excessivo de cateter flexível penetra na bexiga urinária, o tubo colide contra o ápice vesical cranial, dobra-se sobre si mesmo, forma uma alça circular (looping) e, com os movimentos do paciente ou da parede do detrusor, amarra um verdadeiro nó cego intravesical.\n\n' +
        'Essa complicação está amplamente documentada na literatura urológica canina. Quando um nó se forma, o cateter fica impossibilitado de ser puxado de volta pela uretra, exigindo cistotomia cirúrgica de emergência para desatar o nó e remover a sonda!'
    },
    {
      type: 'steps',
      title: 'Técnica de Mensuração Prévia (Atlas of Urinalysis / VECC 2025):',
      items: [
        '1. Mantenha a sonda ainda embalada ou sob luva estéril externamente sobre o corpo do paciente.',
        '2. Posicione a ponta da sonda ao lado do colo da bexiga (palpado no abdômen caudal ou estimado cranialmente ao púbis).',
        '3. Acompanhe o trajeto anatômico: colo vesical → arco isquiático pélvico → base do pênis → meato uretral na glande.',
        '4. Adicione apenas 2 a 3 cm a esse comprimento medido.',
        '5. Marque o ponto de limite máximo de inserção mentalmente ou com uma caneta estéril na face externa do cateter. NUNCA introduza além dessa marcação!'
      ]
    },

    { type: 'heading', level: 2, text: '9. Lista de Materiais Necessários para o Procedimento 📦' },
    {
      type: 'steps',
      items: [
        'Cateter urinário estéril adequado ao porte (nylon flexível para alívio; Foley de silicone 100% para permanência).',
        'Se utilizar Foley: seringa de 3 a 5 mL preenchida com ÁGUA DESTILADA ESTÉRIL (o volume prescrito pelo fabricante no hub da sonda).',
        'Luvas cirúrgicas estéreis e campo fenestrado estéril.',
        'Máquina de tosa com lâmina 40 (se houver pelagem longa ao redor do prepúcio).',
        'Compressas de gaze estéreis.',
        'Solução antisséptica aquosa delicada (clorexidina aquosa 0,05% ou polivinilpirrolidona iodada diluída a 0,5–1%). Evitar antissépticos alcoólicos!',
        'Solução fisiológica (NaCl 0,9%) estéril morna para enxágue abundante da glande e do saco prepucial.',
        'Gel lubrificante hidrossolúvel estéril (preferencialmente em seringa descartável estéril ou tubo de uso único).',
        'Seringas estéreis de 10 mL e 20 mL para aspiração de urina e flush de teste.',
        'Tubo estéril para coleta de urina (com e sem preservativo).',
        'Se a sonda for de permanência: circuito fechado de drenagem com bolsa coletora estéril com válvula antirrefluxo e torneira de esvaziamento.',
        'Material para fixação: fita esparadrapo impermeável ("borboleta"), fio de sutura monofilamentar inabsorvível (nylon 3-0 ou 2-0) com agulha cortante, e colar elizabetano ajustado ao porte.'
      ]
    },

    { type: 'heading', level: 2, text: '10. Sedação e Manejo do Paciente Obstruído 🚨' },
    {
      type: 'paragraph',
      text:
        'A necessidade de sedação depende estritamente do temperamento do cão e do quadro patológico de base:'
    },
    {
      type: 'steps',
      items: [
        'Cão cooperativo e não obstruído (ex.: monitoramento de débito na UTI): a sondagem é habitualmente bem tolerada com contenção física gentil em decúbito lateral, sem necessidade de fármacos depressores do SNC.',
        'Cão ansioso, agressivo ou dolorido: uma sedação multimodal leve (ex.: metadona 0,2 mg/kg associada a midazolam 0,2 mg/kg IV) reduz o estresse, impede movimentos bruscos que laceram a uretra e diminui o tônus esfincteriano.',
        'Cão com obstrução uretral (uretrólitos): o animal encontra-se em intensa dor e espasmo muscular. A tentativa de sondar ou realizar hidropropulsão em cão acordado é altamente traumática e frustrante. Sedação profunda ou anestesia geral inalatória/TIVA é fortemente recomendada pelo BSAVA 2024 para atingir relaxamento muscular uretral completo.',
        '🚨 AVALIAÇÃO METABÓLICA PRÉVIA EM OBSTRUÍDOS: Antes de anestesiar qualquer cão completamente obstruído, meça potássio sérico, creatinina, ureia e realize ECG. Se houver hipercalemia ou choque urêmico pós-renal, estabilize com fluidos cristaloides e controle arritmias ANTES de iniciar a instrumentação da uretra.'
      ]
    },

    { type: 'heading', level: 2, text: '11. Posicionamento e Antissepsia Rigorosa 🧼' },
    {
      type: 'steps',
      items: [
        'Posicionamento padrão: decúbito lateral. Posicione o cão em decúbito lateral confortável (geralmente sobre o lado oposto ao membro de dominância do operador).',
        'Abdução do membro: o assistente afasta o membro pélvico superior craniodorsalmente, oferecendo visualização ampla e irrestrita de toda a extensão do prepúcio e da região perineal.',
        'Tosa higiênica: tose os pelos circundantes ao orifício prepucial caso possam tocar o campo estéril.',
        'Limpeza externa: lave a superfície externa do prepúcio com gaze embebida em sabão neutro e enxágue.',
        'Exteriorização e antissepsia da glande: retraia o prepúcio caudalmente para expor completamente a glande do pênis. Limpe a glande e o óstio uretral com compressas de gaze embebidas em clorexidina aquosa 0,05%. Enxágue abundantemente com jatos de solução salina 0,9% estéril para remover resíduos antissépticos que causariam uretrite química.',
        'Montagem do campo estéril: calce luvas cirúrgicas estéreis e posicione o campo cirúrgico fenestrado sobre o abdômen e pelve, deixando exposta apenas a glande do pênis exteriorizada.'
      ]
    },

    { type: 'heading', level: 2, text: '12. Técnica Passo a Passo da Sondagem Uretral 🐾' },
    {
      type: 'paragraph',
      text:
        'Siga a sequência padronizada do BSAVA Guide to Procedures 2024 e VECC Procedures 2025 para máxima segurança e assepsia:'
    },
    {
      type: 'steps',
      title: 'Passos da Inserção:',
      items: [
        'Passo 1 — Exteriorização e Estabilização Gentil:\nCom a mão não dominante enluvada com gaze estéril, segure o corpo do pênis logo caudal à glande e empurre o prepúcio para trás. ⚠️ CUIDADO: Não estrangule a base do pênis com os dedos! A compressão excessiva colapsa a uretra no ponto em que ela precisa receber a sonda (erro enfatizado pelo Clinician\'s Brief).',
        'Passo 2 — Visualização Direta do Óstio Uretral Externo:\nLocalize a fenda vertical do meato na ponta mais cranial da glande. Ao contrário da fêmea, a entrada é 100% visível.',
        'Passo 3 — Lubrificação Generosa:\nBanhe os primeiros 10 a 15 cm do cateter com gel lubrificante hidrossolúvel estéril (K-Y estéril). Nunca use vaselina ou lubrificantes oleosos. A lubrificação abundante é o principal redutor de trauma e de resistência por atrito.',
        'Passo 4 — Introdução no Meato Uretral:\nSegure a ponta do cateter a 2–3 cm da extremidade com a mão dominante. Introduza a ponta suavemente no meato e avance os primeiros centímetros. A sonda deve deslizar sem qualquer resistência inicial.',
        'Passo 5 — Passagem pelo Osso Peniano (1º Ponto de Resistência):\nAo atingir a base do os penis, uma resistência elástica leve é normal. Mantenha o alinhamento reto e aplique uma ROTAÇÃO SUAVE contínua no corpo da sonda enquanto aplica discreta pressão para a frente. Não empurre bruscamente!',
        'Passo 6 — Manobra de Retificação no Arco Isquiático (2º Ponto de Resistência):\nQuando a marca da sonda atingir a curvatura pélvica, ela tende a parar. SOLTE a pressão cranial, segure o pênis e tracione o pênis e prepúcio no sentido CAUDAL. Mantendo a tração caudal constante, avance a sonda com a mão dominante. Ela deslizará suavemente pelo arco isquiático.',
        'Passo 7 — Progressão Prostática e Chegada à Bexiga (3º Ponto de Resistência):\nAo entrar na uretra pélvica, sinta a passagem através do parênquima prostático. O surgimento de urina fluindo pela extremidade do cateter (hub) confirma o alcance da cavidade vesical.',
        'Passo 8 — Avanço de Segurança Adicional:\nAssim que a urina começar a fluir, avance a sonda APENAS MAIS 1 A 2 CM (máximo 3 cm) para certificar-se de que os orifícios fenestrados da ponta ultrapassaram o trígono e o esfíncter interno, evitando empurrar comprimento redundante no fundo da bexiga.'
      ]
    },

    { type: 'heading', level: 2, text: '13. A Regra da Resistência: O que Fazer Quando a Sonda Trava? 🚨' },
    {
      type: 'paragraph',
      text:
        'A maior virtude de um clínico durante a sondagem é saber parar. O momento mais perigoso é quando o operador pensa: "só falta empurrar um pouquinho mais para passar":'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'CONDUTA SISTEMÁTICA DIANTE DE RESISTÊNCIA RÍGIDA',
      text:
        '1. PARE IMEDIATAMENTE. Nunca tente "vencer" a resistência empurrando o cateter.\n\n' +
        '2. RECUE a sonda em 3 a 5 cm.\n\n' +
        '3. RETIFIQUE O VETOR: Aplique tração caudal firme no prepúcio e pênis para desfazer dobras mucosas no arco isquiático.\n\n' +
        '4. INSTILE SALINA COM LUBRIFICANTE (HYDRO-FLUSH): Conecte uma seringa com 5 mL de salina estéril e lubrificante e faça um pequeno flush suave para hidrodistender a luz uretral à frente da sonda.\n\n' +
        '5. REDUZA O CALIBRE: Se utilizava uma sonda 8 Fr ou 10 Fr, substitua por uma 6 Fr ou 5 Fr mais flexível.\n\n' +
        '6. SE A RESISTÊNCIA PERSISTIR EM BLOQUEIO FIRME: Interrompa as tentativas. O paciente possui um urólito impactado, estenose grave ou massa tumoral. Solicite radiografia simples/contrastada ou ultrassonografia.'
    },

    { type: 'heading', level: 2, text: '14. Não Saiu Urina: Como Confirmar se a Sonda Está na Bexiga? 💧' },
    {
      type: 'paragraph',
      text:
        'A ausência imediata de fluxo urinário pelo hub após a introdução da sonda não significa obrigatoriamente que ela está fora da bexiga. O Veterinary Emergency and Critical Care Procedures (2025) aponta as causas mais comuns:'
    },
    {
      type: 'steps',
      items: [
        'Bexiga urinária completamente vazia: comum em pacientes que urinaram durante o transporte ou em anúria por lesão renal aguda isquêmica.',
        'Orifícios da ponta colabados contra a mucosa do detrusor: a extremidade da sonda pode estar aspirada contra a parede interna da bexiga vazia.',
        'Lúmen ocluído por coágulo sanguíneo, tampão mucoso ou excesso de gel lubrificante.',
        'Cateter dobrado em alça na cavidade vesical.',
        'Rotura vesical traumática com extravasamento (uroperitônio).',
        'Extravasamento por falso trajeto (a sonda perfurou a uretra e entrou no espaço retroperitoneal ou pelve).'
      ]
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'ALGORITMO DE CONFIRMAÇÃO EM 4 PASSOS',
      text:
        '1. Aspiração gentil com seringa de 10 mL.\n' +
        '2. Flush de teste com 3 a 5 mL de salina estéril: se o líquido entrar sem resistência e retornar livremente na aspiração com urina, a posição intravesical está confirmada.\n' +
        '3. Recue a sonda em 1 cm caso os orifícios estejam encostados na parede.\n' +
        '4. Se persistir a dúvida, realize ultrassonografia abdominal à beira do leito (POCUS): visualize a bexiga e observe o eco linear hiperecogênico do cateter com artefato de reverberação dentro do lúmen anecoico.'
    },

    { type: 'heading', level: 2, text: '15. Manejo Específico da Sonda Foley de Silicone 🎈' },
    {
      type: 'paragraph',
      text:
        'A sonda Foley de silicone é o dispositivo de escolha para permanência na internação, mas seu balonete autoestático exige rigor técnico absoluto para não provocar lesões iatrogênicas gravíssimas:'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'REGRA ABSOLUTA: JAMAIS INSUFLE O BALÃO DENTRO DA URETRA!',
      text:
        'O balonete da Foley é projetado para expandir dentro do lúmen complacente da bexiga urinária. Se o operador insuflar o balão enquanto a ponta ainda estiver na uretra membranosa ou prostática, a expansão radial súbita de 3 a 5 mL dilacera a parede uretral, causa dor lancinante, hemorragia volumosa, falso trajeto e resulta em estenose cicatricial estenosante irreversível!'
    },
    {
      type: 'steps',
      title: 'As 4 Etapas Obrigatórias da Foley (BSAVA 2024 / VECC 2025):',
      items: [
        '1. Introduza a Foley até obter fluxo espontâneo de urina. Assim que a urina fluir, avance a sonda MAIS 2 A 4 CM para garantir que todo o balão está livre dentro da cavidade vesical.',
        '2. Remova o mandril (estilete de aço interno): segure a porção externa da sonda firmemente com uma das mãos e puxe o estilete com a outra. ⚠️ Se você não segurar o corpo da sonda, o atrito do mandril puxará toda a Foley de volta para dentro da uretra no momento da retirada!',
        '3. Insufle o balão com ÁGUA DESTILADA ESTÉRIL no volume exato recomendado pelo fabricante (habitualmente 3 a 5 mL para calibres veterinários 5–8 Fr). NUNCA use solução salina (NaCl 0,9%), pois os cristais de cloreto de sódio precipitam na microválvula do balão e impedem sua desinsuflação no momento de remover a sonda!',
        '4. Recue lentamente a Foley com tração suave até sentir a resistência elástica do balão encostando suavemente contra o colo da bexiga. Interrompa a tração e fixe a sonda externamente.'
      ]
    },

    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/sondagem-foley-cao-posicionamento-fixacao.svg',
      alt: 'Manejo seguro da sonda Foley no cão macho e fixação em sistema fechado',
      caption:
        'Figura 2: As 3 fases do balonete da sonda Foley no cão macho (1: Erro catastrófico de insuflação intrauretral, 2: Avanço seguro intravesical com retirada de estilete, 3: Insuflação com água estéril e apoio no colo), detalhe da fixação com fita borboleta no prepúcio e sistema fechado de drenagem (BSAVA 2024 / ISCAID 2019).'
    },

    { type: 'heading', level: 2, text: '16. Fixação Externa Atraumática e Montagem do Circuito Fechado 🔒' },
    {
      type: 'paragraph',
      text:
        'A fixação inadequada é uma das principais causas de trauma uretral mecânico e avulsão acidental:'
    },
    {
      type: 'steps',
      items: [
        'Técnica da Fita em Borboleta (Hackett & Mazzaferro / VECC 2025): dobre uma fita esparadrapo impermeável ao redor do corpo externo da sonda, colando as abas uma contra a outra ("asas de borboleta"). Perfure e suture as asas da fita à pele do prepúcio com fio de nylon 3-0 ou 2-0. NUNCA passe a agulha através da borracha da própria sonda (risco de ocluir o lúmen ou perfurar o canal do balão!).',
        'Alívio de tensão: deixe uma pequena alça de folga no cateter antes da fixação para que as ereções parciais ou movimentos dos membros do cão não tracionem diretamente o pênis.',
        'Montagem do Sistema Fechado: conecte a extremidade da sonda a uma extensão estéril acoplada a uma bolsa coletora de urina com válvula antirrefluxo e porta de amostragem estéril.',
        'Posicionamento da Bolsa Coletora: a bolsa deve permanecer OBRIGATORIAMENTE ABAIXO DO NÍVEL DA BEXIGA em todos os momentos para permitir fluxo passivo por gravidade. JAMAIS permita que a bolsa ou o tubo fiquem em contato com o chão da baia!',
        'Colar Elizabetano: obrigatório e não negociável durante 100% do período de permanência da sonda.'
      ]
    },

    { type: 'heading', level: 2, text: '17. Prevenção de CAUTI (Diretrizes ISCAID 2019) 🦠' },
    {
      type: 'paragraph',
      text:
        'A infecção do trato urinário associada ao cateter (CAUTI) é uma das complicações nosocomiais mais frequentes em pacientes internados. A International Society for Companion Animal Infectious Diseases (ISCAID) preconiza condutas estritas:'
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'DIRETRIZES DA ISCAID PARA PREVENÇÃO DE CAUTI',
      text:
        '• NUNCA ADMINISTRAR ANTIBIÓTICO PROFILÁTICO: Prescrever antibióticos empíricos apenas porque o paciente está sondado NÃO previne infecção; pelo contrário, seleciona microrganismos multirresistentes hospitalares (ex.: Pseudomonas aeruginosa, Enterococcus faecium, E. coli produtora de ESBL).\n\n' +
        '• MANTER CIRCUITO ESTRITAMENTE FECHADO: Não desconecte a bolsa do cateter para coletar urina. Utilize a porta de amostragem de borracha higienizada com álcool 70% e agulha fina (25G).\n\n' +
        '• NUNCA REALIZAR LAVAGENS VESICAIS COM ANTIMICROBIANOS OU BIOCIDAS: A instilação de antibióticos na bexiga causa irritação química severa sem benefício clínico.\n\n' +
        '• MENOR TEMPO POSSÍVEL: A cada dia que a sonda permanece, o risco de bacteriúria aumenta em 10% a 20%. Reavalie diariamente e retire a sonda assim que o paciente recuperar estabilidade hemodinâmica ou capacidade de micção voluntária.\n\n' +
        '• NÃO CULTIVAR A PONTA DA SONDA NEM URINA DA BOLSA: A ponta da sonda e o fluido estagnado da bolsa contêm colonização bacteriana que não reflete necessariamente infecção invasiva na bexiga. Se houver suspeita de cistite bacteriana após a alta, realize urocultura por CISTOCENTESE estéril.'
    },

    { type: 'heading', level: 2, text: '18. Abordagem do Cão Obstruído por Uretrólito: Não "Empurre a Pedra" 🛑' },
    {
      type: 'paragraph',
      text:
        'Em cães machos, a obstrução uretral quase invariavelmente decorre de urólitos (estruvita, oxalato de cálcio, urato) que migraram da bexiga e impactaram caudalmente ao osso peniano ou na curvatura isquiática. O BSAVA 2024 é categórico: NUNCA utilize a ponta da sonda como aríete para empurrar o cálculo à força!'
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'O PRINCÍPIO DA RETRO-HIDROPROPULSÃO URETRAL (BSAVA 2024 / VECC 2025)',
      text:
        'Em vez de empurrar a pedra contra a mucosa inflamada, a técnica cria uma câmara de alta pressão líquida ao redor do cálculo:\n' +
        '1. Mistura Lubrificante: misture 50% de solução salina 0,9% estéril com 50% de gel lubrificante hidrossolúvel estéril através de uma torneira de 3 vias.\n' +
        '2. Duplo Bloqueio Simultâneo: o assistente insere o dedo enluvado no reto e comprime a uretra pélvica contra a sínfise púbica. O operador comprime o meato uretral ao redor da sonda com gaze.\n' +
        '3. Hidrodistensão: injetam-se 10 a 20 mL da mistura para dilatar radialmente a parede da uretra, permitindo que o líquido contorne o cálculo.\n' +
        '4. Liberação Súbita com Flush: no ápice da distensão, o dedo retal é subitamente liberado enquanto a injeção rápida continua, gerando uma onda hidrostática que transporta o urólito de volta para o lúmen vesical.\n\n' +
        'Estudos mostram sucesso cumulativo de 86,7% na 2ª tentativa. Confirmar obrigatoriamente por radiografia que todos os cálculos retornaram à bexiga!'
    },

    {
      type: 'figure',
      src: '/consulta-vet/clinical-guides/retro-hidropropulsao-canina-passos.svg',
      alt: 'Técnica de retro-hidropropulsão uretral retrógrada no cão macho',
      caption:
        'Figura 3: Mecânica de retro-hidropropulsão uretral no cão macho: compressão retal digital combinada à oclusão prepucial e liberação com retorno dos cálculos para a bexiga (BSAVA 2024 / VECC 2025).'
    },

    { type: 'heading', level: 2, text: '19. Recursos Avançados: O Uso do Fio-Guia Hidrofílico (0,035") ⭐' },
    {
      type: 'paragraph',
      text:
        'Nas situações em que a uretra sofreu trauma iatrogênico por tentativas intempestivas, ocorrem retalhos (flaps) de mucosa, edema e falsas vias cegas. Qualquer cateter plástico comum continuará colidindo contra os fundos-de-saco perfurados.'
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'TÉCNICA DE SELDINGER MODIFICADA COM FIO-GUIA (BSAVA NEPHROLOGY & UROLOGY)',
      text:
        '• Fio-guia hidrofílico de nitinol (0,035 polegadas): apresenta ponta atraumática flexível com revestimento hidrofílico ativado por água, oferecendo atrito quase zero.\n' +
        '• Ele é capaz de negociar suavemente as irregularidades da mucosa dilacerada e encontrar o lúmen verdadeiro em direção à bexiga.\n' +
        '• Uma vez que o fio penetra na bexiga (confirmado por ultrassom ou fluoroscopia), ele atua como um trilho seguro: um cateter uretral de ponta aberta (open-ended) ou cateter de poliuretano é deslizado sobre o fio diretamente para dentro da bexiga.\n' +
        '• Esta técnica deve ser considerada intervenção de resgate avançado antes de submeter o paciente a cirurgias de uretrostomia de urgência.'
    },

    { type: 'heading', level: 2, text: '20. Tabela de Troubleshooting Clínico Rápido ⚙️' },
    {
      type: 'paragraph',
      text:
        'Resolução prática e objetiva para as principais intercorrências encontradas durante a sondagem uretral no cão macho:'
    },
    {
      type: 'table',
      headers: ['Intercorrência Encontrada', 'Causa Provável Mais Comum', 'Conduta Imediata Recomendada'],
      rows: [
        [
          'A sonda não consegue entrar no meato uretral',
          'Pênis não estabilizado, ereção parcial ou ângulo de inserção torto',
          'Estabilizar o pênis com gaze estéril logo atrás da glande. Alinhar a sonda paralelamente ao pênis e lubrificar abundantemente o meato.'
        ],
        [
          'A sonda para após 5 a 10 cm de inserção',
          'Resistência fisiológica no os penis ou urólito impactado',
          'Aplicar rotação suave contínua com pressão mínima. Se resistir com bloqueio rígido, suspeitar de urólito no sulco e realizar radiografia.'
        ],
        [
          'A sonda para na curvatura pélvica caudal',
          'Ângulo agudo de 90° no arco isquiático (pênis apontado para a frente)',
          'EXECUTE A MANOBRA DE RETIFICAÇÃO: tracione o prepúcio e o pênis caudalmente (para trás) para alinhar a uretra peniana à pélvica (~160°).'
        ],
        [
          'Resistência firme no segmento proximal profundo',
          'Compressão por hiperplasia prostática benigna (HPB) ou prostatite',
          'Pressão contínua muito suave acompanhada de leve rotação. Não forçar. Se houver prostatite aguda com dor intensa, sedar e considerar calibre 6 Fr.'
        ],
        [
          'Sangramento uretral súbito pelo meato',
          'Dilaceração de mucosa ou perfuração por força excessiva',
          'INTERROMPA NOVAS TENTATIVAS IMEDIATAMENTE. Administre analgesia. Realize uretrografia retrógrada para avaliar integridade da parede.'
        ],
        [
          'A sonda entrou até a marcação, mas não sai urina',
          'Bexiga vazia, orifício encostado na mucosa, coágulo na luz ou dobra',
          'Aspirar com seringa de 10 mL. Injetar 3 a 5 mL de salina estéril e reaspirar. Recuar a sonda em 1 cm. Se persistir, avaliar com ultrassonografia.'
        ],
        [
          'Resistência intensa ao insuflar o balão da Foley',
          'O balão ainda está alojado dentro do lúmen estreito da uretra',
          'NUNCA FORCE O ÊMBOLO! Aspire imediatamente todo o líquido, avance a sonda mais 3 a 5 cm na bexiga e tente insuflar novamente.'
        ],
        [
          'O cão chora e vocaliza de dor ao insuflar a Foley',
          'Insuflação intrauretral aguda com dilaceração da parede',
          'ESVAZIE O BALÃO NO MESMO SEGUNDO! Confirme o refluxo de urina, avance a sonda e confirme a posição intravesical antes de reinflar.'
        ],
        [
          'A sonda de permanência parou de drenar urina na baia',
          'Dobra no tubo, bolsa acima da bexiga ou coágulo ocluindo o orifício',
          'Inspecione todo o circuito físico: estique dobras, abaixe a bolsa para abaixo do nível da baia e realize lavagem com 5 mL de salina estéril.'
        ],
        [
          'A sonda Foley foi expelida espontaneamente pelo cão',
          'Balão desinsuflou por vazamento ou foi tracionado pelo paciente',
          'Inspecione o balão e meça o líquido. Coloque colar elizabetano imediatamente. Não tente reinserir a mesma sonda usada; utilize uma nova estéril.'
        ],
        [
          'Urina com aspecto turvo ou com odor fétido após 48h de sonda',
          'Bacteriúria nosocomial associada ao cateter (CAUTI)',
          'Avalie clinicamente o paciente (febre, leucocitose). Se clinicamente estável, retire a sonda. Colha urina por cistocentese para urocultura se indicado.'
        ]
      ]
    },

    { type: 'heading', level: 2, text: '21. Fluxograma de Decisão Clínica na Sondagem Uretral Canina 🔄' },
    {
      type: 'flowchart',
      title: 'Algoritmo Decisório para Sondagem Uretral no Cão Macho',
      nodes: [
        { id: 'ind', label: 'Indicação clínica definida (Débito urinário / Retenção / Procedimento)', variant: 'start' },
        { id: 'contra', label: 'Suspeita de trauma pélvico/uretral grave ou hematoma perineal?', variant: 'decision' },
        { id: 'img_first', label: 'PARAR! Uretrografia retrógrada ou auxílio de fio-guia sob imagem', variant: 'action' },
        { id: 'plan', label: 'Decúbito lateral + Mensuração prévia (glande ao colo) + Assepsia estéril', variant: 'action' },
        { id: 'entry', label: 'Exteriorizar glande + Lubrificação generosa + Entrada no meato', variant: 'action' },
        { id: 'res_check', label: 'Atingiu arco isquiático / resistência encontrada?', variant: 'decision' },
        { id: 'straighten', label: 'Manobra de Retificação: Tracionar pênis e prepúcio CAUDALMENTE', variant: 'action' },
        { id: 'urine', label: 'Urina reflui livremente pelo hub da sonda?', variant: 'decision' },
        { id: 'safety_adv', label: 'Avançar apenas +1 a 2 cm de segurança após o início do fluxo', variant: 'action' },
        { id: 'trouble', label: 'Flush suave 3 mL + Aspirar + Recuar 1 cm + Ultrassom POCUS', variant: 'action' },
        { id: 'type_cat', label: 'Sondagem de alívio ou de permanência na internação?', variant: 'decision' },
        { id: 'relief', label: 'Alívio: Esvaziar / Coletar amostra → Retirar a sonda com movimento suave', variant: 'end' },
        { id: 'foley_flow', label: 'Foley: Avançar +3cm → Retirar estilete → Insuflar com água estéril → Apoiar no colo', variant: 'action' },
        { id: 'closed', label: 'Fixação com fita borboleta no prepúcio + Circuito fechado + Colar elizabetano', variant: 'end' }
      ],
      edges: [
        { from: 'ind', to: 'contra' },
        { from: 'contra', to: 'img_first', label: 'Sim' },
        { from: 'contra', to: 'plan', label: 'Não' },
        { from: 'plan', to: 'entry' },
        { from: 'entry', to: 'res_check' },
        { from: 'res_check', to: 'straighten', label: 'Sim' },
        { from: 'straighten', to: 'urine' },
        { from: 'res_check', to: 'urine', label: 'Passou liso' },
        { from: 'urine', to: 'safety_adv', label: 'Sim' },
        { from: 'urine', to: 'trouble', label: 'Não' },
        { from: 'trouble', to: 'safety_adv' },
        { from: 'safety_adv', to: 'type_cat' },
        { from: 'type_cat', to: 'relief', label: 'Alívio pontual' },
        { from: 'type_cat', to: 'foley_flow', label: 'Permanência (Foley)' },
        { from: 'foley_flow', to: 'closed' }
      ]
    },

    { type: 'heading', level: 2, text: '22. Box de Bolso — Checklist de Ouro e "NUNCA FAÇA" 📋' },
    {
      type: 'callout',
      variant: 'tip',
      title: 'CHECKLIST DE OURO DO PLANTÃO — SONDAGEM DO CÃO MACHO 🐶🩺',
      text:
        '1. MEÇA ANTES DE INSERIR: Estime externamente da ponta da glande ao colo vesical e marque o limite na sonda. Sonda em excesso forma nós intravesicais cirúrgicos!\n\n' +
        '2. NÃO ESTRANGULE O PÊNIS: Segure o corpo peniano suavemente; comprimir a base oclui a própria uretra que você está tentando canular.\n\n' +
        '3. RETIFICAÇÃO É O SEGREDO: Se a sonda parar no arco isquiático, puxe o prepúcio e o pênis para trás (vetor caudal). O alinhamento abre o ângulo para 160° e desfaz a resistência.\n\n' +
        '4. RESISTÊNCIA NÃO SE VENCE COM FORÇA: A uretra não se dilata na marra. Pare, recue, irrigue, troque para um calibre menor e, se persistir, faça imagem.\n\n' +
        '5. NUNCA EMPURRE CÁLCULOS COM A PONTA: Em uretrólitos, realize retro-hidropropulsão com mistura 50:50 de salina e gel, oclusão retal digital e liberação súbita.\n\n' +
        '6. CUIDADO EXTREMO COM A FOLEY: Certifique-se de que o balão está totalmente intravesical (urina + 2 a 4 cm). Retire o estilete metálico segurando a sonda e insufle com ÁGUA ESTÉRIL (nunca salina).\n\n' +
        '7. FIXAÇÃO ATRAUMÁTICA: Use fita borboleta colada na sonda e suture na pele prepucial. NUNCA fure a sonda com a agulha de sutura!\n\n' +
        '8. PREVENÇÃO DE CAUTI (ISCAID): Mantenha circuito 100% fechado, bolsa coletora suspensa ABAIXO da bexiga e fora do chão, e NUNCA prescreva antibióticos profiláticos de rotina!'
    },

    { type: 'heading', level: 2, text: '23. Referências Técnicas e Bibliográficas 📚' },
    {
      type: 'paragraph',
      text:
        'O conteúdo deste guia segue as evidências e recomendações dos seguintes tratados de procedimentos, emergência e urologia veterinária:'
    },
    {
      type: 'steps',
      items: [
        'Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. British Small Animal Veterinary Association; 2024. Urethral catheterization – (a) male dog: pp. 284–286; Urethral retrograde urohydropulsion in a male dog: pp. 296–298.',
        'Johnson CA, ed. Veterinary Emergency and Critical Care Procedures. 3rd ed. Wiley-Blackwell; 2025. Chapter 6: Urinary Catheter Placement, Urohydropulsion, and Temporary Antepubic Cystostomy Catheter Placement (male dogs: pp. 175–180; urohydropulsion: pp. 195–200).',
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019. Chapter 187: Urethral Catheterization (Including Urohydropulsion), pp. 1210–1215.',
        'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8–25. (Diretrizes vigentes de CAUTI, bacteriúria assintomática e uso racional de antimicrobianos).',
        'Barkan E, et al. Atlas of Canine and Feline Urinalysis. Wiley-Blackwell; 2017. Chapter 1: Sample Collection and Handling (male catheterization, length estimation and artifactual hematuria, pp. 15–19).',
        'Bartges JW, Callens AJ, eds. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. British Small Animal Veterinary Association; 2017. Chapter 27: Interventional urology and hydrophilic guidewire urethral stenting, pp. 315–316.',
        'Maeta N, et al. Dysuria Associated with Non-Neoplastic Bone Hyperplasia of the Os Penis in a Pug Dog. Vet Sci. 2021;8(1):6. Open Access CC BY 4.0. (Demonstração tomográfica do sulco uretral inextensível do os penis e barreira anatômica na uretrocistografia).',
        'Powell LL. Urinary Catheter Placement in Dogs. Clinician’s Brief. Peer-reviewed procedural review.',
        'Kim J, et al. Evaluation of retrograde urohydropulsion using computed tomography in 45 male dogs with urethral calculi. J Vet Med Sci. 2022;84(10):1343–1348. (Sucesso global de 86,7% na hidropropulsão e análise dos pontos de impactação).'
      ]
    }
  ],
  isPublished: true
};

export const clinicalQuickGuidesSeed: ClinicalQuickGuide[] = [
  guiaBiopsiaIncisional,
  guiaRupturaLcc,
  guiaBandagemRobertJones,
  guiaToracocentese,
  guiaAbdominocentese,
  guiaColetaArterial,
  guiaMedulaOssea,
  guiaSondagemUretralFemeas,
  guiaColetaLiquor,
  guiaDesobstrucaoUretral,
  guiaSondagemUretralMachos
];
