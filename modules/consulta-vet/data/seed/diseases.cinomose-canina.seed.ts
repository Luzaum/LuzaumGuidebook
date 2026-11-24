import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const cinomoseCaninaRecord: DiseaseRecord = {
  id: 'disease-cinomose-canina',
  slug: 'cinomose-canina',
  title: 'Cinomose canina',
  subtitle:
    'Infecção viral grave, altamente contagiosa e multissistêmica de cães, capaz de comprometer defesas imunológicas, vias respiratórias, trato gastrointestinal, olhos, pele e sistema nervoso central.',
  synonyms: [
    'Doença de Carré',
    'Hiperqueratose dos coxins',
    'Neurocinomose',
    'CDV',
  ],
  species: ['dog'],
  category: 'infectologia',
  categories: ['infectologia', 'neurologia', 'urgencia-emergencia', 'terapia-intensiva'],
  tags: ['Cães'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['cinomose-canina'],

  quickSummary:
    'Doença viral altamente contagiosa causada pelo vírus da cinomose canina (CDV), que reduz inicialmente as defesas do organismo antes de atingir pulmões, intestino, olhos, pele e sistema nervoso central. Sinais neurológicos podem surgir semanas após melhora respiratória ou digestória. Sem antiviral curativo validado, o desfecho depende de isolamento imediato, estabilização clínica e suporte direcionado.',

  quickDecisionStrip: [
    'Isole imediatamente todo paciente suspeito antes mesmo da confirmação laboratorial: o contágio por secreções e gotículas respiratórias é intenso.',
    'RT-PCR negativa não afasta cinomose, sobretudo na fase neurológica tardia ou quando a coleta não corresponde ao órgão com eliminação ativa.',
    'Sinais neurológicos podem aparecer semanas após aparente recuperação respiratória ou digestória.',
    'Mioclonia não é convulsão: são abalos rítmicos contínuos (inclusive durante o sono) que raramente respondem a anticonvulsivantes.',
    'Antibióticos não combatem o vírus; use-os apenas diante de infecção bacteriana secundária fundamentada (como broncopneumonia).',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Na rotina clínica brasileira, a cinomose continua frequente principalmente em cães jovens com esquema vacinal ausente ou incompleto, mas também ocorre em adultos sem proteção mantida. A condução eficaz combina ==biossegurança imediata na admissão, escolha estratégica da amostra conforme a fase da doença e suporte intensivo por sistemas==, evitando corticoides de rotina e terapias experimentais sem comprovação.',
    leadHighlights: [
      'biossegurança imediata na admissão, escolha estratégica da amostra conforme a fase da doença e suporte intensivo por sistemas',
      'RT-PCR negativa não afasta cinomose',
      'Mioclonia não é convulsão',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico de Plantão — Suspeita de Cinomose Canina',
      steps: [
        {
          label: '1. Isolamento imediato e triagem de risco vital',
          timing: 'Minutos 0 a 15',
          detail:
            'Encaminhar para área de isolamento já na recepção; checar vias aéreas, respiração, oxigenação, perfusão, temperatura e glicemia (especialmente em filhotes sem apetite ou com diarreia).',
        },
        {
          label: '2. Exames basais e rastreio de coinfecções',
          timing: 'Primeiras horas',
          detail:
            'Solicitar hemograma com análise cuidadosa do esfregaço sanguíneo, bioquímica sérica, eletrólitos, radiografia ou ultrassonografia pulmonar se houver sinais respiratórios, além de teste para parvovirose em filhotes com diarreia.',
        },
        {
          label: '3. Coleta molecular conforme o quadro clínico',
          timing: 'Primeiras 24 horas',
          detail:
            'Na fase respiratória ou sistêmica aguda, combinar swab ocular/nasal com sangue total (EDTA). Em quadros subagudos ou neurológicos, incluir urina (e líquor apenas se a anestesia for segura).',
        },
        {
          label: '4. Correlação clínica e imagem neurológica',
          timing: 'Reavaliação diagnóstica',
          detail:
            'Interpretar o resultado molecular considerando vacinação viva recente. Se a PCR for negativa com forte suspeita neurológica, considerar ressonância magnética e exame do líquor para excluir outras encefalites.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Estabilização, Suporte e Neuroproteção',
      steps: [
        {
          label: '1. Oxigênio, hidratação e glicemia',
          timing: 'Minutos 0 a 30',
          detail:
            'Ofertar oxigênio diante de falta de ar ou baixa saturação, corrigir hipoglicemia imediatamente e repor volume em etapas avaliando a ausculta pulmonar para evitar sobrecarga.',
        },
        {
          label: '2. Resgate rápido de crises epilépticas',
          timing: 'Crise ≥ 5 min ou em sequência',
          detail:
            'Aplicar benzodiazepínico imediato (via venosa ou intranasal) e escalonar para anticonvulsivante de segunda linha se a crise persistir ou recorrer, corrigindo febre e alterações metabólicas em paralelo.',
        },
        {
          label: '3. Controle de vômitos e nutrição protegida',
          timing: 'Primeiras 6 a 24 horas',
          detail:
            'Administrar antiemético e iniciar alimentação precoce apenas quando o cão conseguir deglutir com segurança; jamais forçar alimento pela boca em animais prostrados ou com dificuldade de deglutição.',
        },
        {
          label: '4. Manejo bacteriano seletivo e cuidados contínuos',
          timing: 'Durante a internação',
          detail:
            'Indicar antibiótico somente com suspeita clínica ou radiográfica de infecção secundária; proteger a córnea com lubrificantes e evitar diuréticos ou corticoides sem indicação específica.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Consulta rápida (30–60 segundos) — Pontos decisivos na cinomose canina',
      headers: ['Pergunta clínica', 'Conduta objetiva baseada em evidência'],
      rows: [
        [
          'Quando suspeitar?',
          'Cão jovem ou sem vacinação confiável com ==secreção ocular e nasal, tosse, sinais digestórios, endurecimento dos coxins== ou alterações neurológicas multifocais.',
        ],
        [
          'Qual amostra enviar para RT-PCR?',
          '==Swab conjuntival/nasal + sangue EDTA== na fase aguda; ==urina== (e líquor quando seguro) em apresentações subagudas ou neurológicas.',
        ],
        [
          'Hemograma ou PCR normais descartam?',
          '==Não.== Os linfócitos podem normalizar ou subir na fase neurológica crônica {{ref:ref-kapar-2026}}, e a eliminação viral varia conforme tecido e estágio.',
        ],
        [
          'Há antiviral ou corticoide de rotina?',
          '==Não.== O tratamento é suporte intensivo; corticoides de rotina não demonstraram benefício na neurocinomose {{ref:ref-sarchahi-2025}}, e análogos nucleosídeos seguem sem validação clínica {{ref:ref-oliver-guimera-2025}}.',
        ],
        [
          'Como prevenir falhas vacinais?',
          'Seguir protocolo de vacinação essencial em filhotes até ≥ 16 semanas com reforço às 26 semanas para cobrir a queda dos anticorpos maternos {{ref:ref-wsava-2024}}.',
        ],
      ],
    },
  },

  etiology: {
    cdvVirologiaEReceptores:
      'O agente causador é o ==vírus da cinomose canina (CDV)==, um morbillivírus da família *Paramyxoviridae* com genoma de RNA de fita simples (aparentado ao vírus do sarampo humano). Por possuir ==envelope lipídico==, é sensível a detergentes, calor, ressecamento e desinfetantes hospitalares comuns — sobrevivendo menos de 24 horas em temperatura ambiente, embora persista por mais tempo em locais frios, úmidos e com matéria orgânica {{ref:ref-cornell-cdv}}.\n\n' +
      '- ==Entrada em duas etapas (células de defesa → epitélios)==: primeiro, a proteína H liga-se ao receptor ==CD150== em linfócitos, macrófagos e células dendríticas, causando queda acentuada da imunidade; depois, utiliza a ==nectina-4== para infectar células epiteliais das vias aéreas, intestino, olhos, pele e glândulas {{ref:ref-nuhoglu-2026}}.\n' +
      '- ==Disseminação célula a célula==: a proteína F promove fusão entre células vizinhas (formando células gigantes chamadas sincícios), facilitando a propagação tecidual com menor exposição aos anticorpos, enquanto as proteínas V e C bloqueiam a resposta antiviral inicial por interferon.\n' +
      '- ==Linhagens e proteção vacinal==: apesar das variações genéticas regionais no gene H, todas as cepas pertencem ao mesmo sorotipo; na prática, a maioria dos casos em cães já vacinados decorre de falha na resposta imune inicial ou interferência de anticorpos maternos, e não de escape antigênico.',
    cdvTabelaProteinasVirais: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Principais proteínas do CDV e impacto clínico',
      headers: ['Proteína viral', 'Função biológica', 'Importância clínica'],
      rows: [
        [
          'N (Nucleoproteína) e P (Fosfoproteína)',
          'Protegem o RNA viral e dão suporte à polimerase',
          'Mantêm a replicação no citoplasma e atuam como alvos da resposta celular.',
        ],
        [
          'L (Polimerase viral)',
          'Enzima responsável por copiar o RNA viral',
          'Alvo em pesquisa para antivirais análogos de nucleosídeos (como o GS-441524) {{ref:ref-oliver-guimera-2025}}.',
        ],
        [
          'H (Hemaglutinina)',
          'Liga o vírus aos receptores CD150 (imunidade) e nectina-4 (epitélios)',
          'Define quais órgãos são invadidos e guia análises genéticas regionais.',
        ],
        [
          'F (Proteína de fusão) e M (Matriz)',
          'Fundem membranas celulares e montam novas partículas virais',
          'Originam células gigantes (sincícios) e permitem propagação direta entre células vizinhas.',
        ],
        [
          'V e C (Acessórias)',
          'Bloqueiam a produção e a ação inicial de interferon',
          'Atrasam a defesa antiviral precoce e favorecem a disseminação sistêmica.',
        ],
      ],
    },
  },

  epidemiology: {
    cdvEpidemiologiaECenariosBrasil:
      'O CDV circula mundialmente onde há baixa cobertura vacinal, abrigos, canis superlotados ou contato com cães errantes e fauna silvestre. No Brasil, mantém alta relevância clínica.\n\n' +
      '- ==Cenário brasileiro em estudos recentes==: em Goiânia, Menezes et al. (2023) avaliaram 46 cães naturalmente infectados, observando predomínio em animais sem raça definida, adultos jovens de 1 a 6 anos e cães sem vacinação adequada — chamando atenção que ==10,87% tinham relato de vacinação prévia== (sem auditoria completa de protocolo e resposta imune) {{ref:ref-menezes-2023}}. Já em coorte hospitalar de 2025 com 360 cães neurológicos, os 17 casos de neurocinomose concentraram-se em animais mais jovens e em raças populares localmente (Shih Tzu e Lhasa Apso), refletindo perfil populacional do serviço, e não suscetibilidade genética universal {{ref:ref-ufg-neuro-2025}}.\n' +
      '- ==Espécies suscetíveis==: além de cães domésticos, infecta canídeos silvestres, guaxinins, furões (muito vulneráveis) e grandes felídeos selvagens; ==gatos domésticos não são hospedeiros clínicos habituais==.',
    cdvTabelaFatoresPredisponentes: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Fatores de risco e interpretação epidemiológica',
      headers: ['Fator de risco', 'Relevância', 'Explicação clínica'],
      rows: [
        [
          'Esquema vacinal ausente ou incompleto',
          'Muito alta',
          'Falta de imunidade protetora ou neutralização precoce da vacina por anticorpos maternos {{ref:ref-wsava-2024}}.',
        ],
        [
          'Idade entre 3 e 6 meses',
          'Alta',
          'Fase em que os anticorpos recebidos no colostro já não protegem totalmente contra a infecção natural.',
        ],
        [
          'Aglomeração (abrigos, canis, feiras)',
          'Alta',
          'Maior densidade de secreções respiratórias e circulação contínua do vírus {{ref:ref-aspca-cdv}}.',
        ],
        [
          'Coinfecções e debilidade imune',
          'Relevante',
          'Reduzem o controle inicial do vírus; coinfecção com parvovirose é comum e agrava o prognóstico.',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    cdvTransmissaoEJanelaImune:
      'A transmissão ocorre sobretudo pela ==inalação de gotículas respiratórias ou contato direto com secreções== oculares, nasais, saliva, urina e fezes {{ref:ref-cornell-cdv}}. Também pode haver passagem pela placenta durante a gestação, causando abortamento, natimortalidade ou fraqueza neonatal.\n\n' +
      '- ==Linha do tempo após a exposição==: sinais iniciais costumam surgir em ==3 a 6 dias== (febre passageira e apatia), seguidos pela disseminação para epitélios e sistema nervoso por volta dos dias 8 a 9; a doença clínica evidente aparece habitualmente entre 1 e 2 semanas.\n' +
      '- ==Tempo de eliminação viral==: cães recuperados podem eliminar o vírus por até ==60 a 90 dias== (ou vários meses em quadros neurológicos) {{ref:ref-cornell-cdv}}. Lembrar que detectar material genético por PCR nem sempre significa vírus vivo infectante em todo esse período.',
  },

  pathophysiology: {
    cdvFisiopatogeniaSistemica:
      'Logo após entrar pelas vias respiratórias, o vírus ataca o próprio sistema de defesa:\n\n' +
      '- ==Dias 1 a 6 (fase linfoide e queda imune)==: infecta macrófagos e células dendríticas (via receptor CD150), alcança tonsilas e linfonodos e se espalha pelo sangue associado aos leucócitos para baço, timo, medula óssea e tecidos de defesa das mucosas respiratória e intestinal.\n' +
      '- ==Queda de linfócitos==: a morte de linfócitos provoca linfopenia aguda e abre porta para infecções bacterianas secundárias, mas a ausência de linfopenia no exame de sangue não afasta imunossupressão funcional.\n' +
      '- ==Dias 9 a 14 (decisão imunológica)==: a resposta construída nessa janela define o destino do cão — resposta forte elimina o vírus antes da invasão epitelial ampla (infecção silenciosa com imunidade duradoura); resposta intermediária gera doença moderada que pode regredir; resposta fraca permite replicação disseminada nos órgãos e no sistema nervoso.\n' +
      '- ==Febre em dois picos==: um primeiro pico ocorre na viremia inicial e o segundo na disseminação para epitélios, mas frequentemente passa despercebido e não serve como critério isolado de triagem.',
    cdvMecanismosPorSistema:
      'A partir do dia 8 a 9, o vírus utiliza o receptor ==nectina-4== para invadir tecidos epiteliais:\n\n' +
      '- ==Pulmões e vias aéreas==: destrói cílios respiratórios, prejudicando a limpeza natural do muco, e causa inflamação pulmonar viral com células gigantes (sincícios). A soma de imunidade baixa e retenção de secreções favorece ==broncopneumonia bacteriana secundária== (*Bordetella bronchiseptica*, *Streptococcus* spp., *Staphylococcus* spp., *Pasteurella* spp., *Escherichia coli* ou *Mycoplasma* spp.), prejudicando a troca gasosa.\n' +
      '- ==Intestino==: lesiona as vilosidades intestinais, levando a vômitos, diarreia com perda de potássio e bicarbonato (acidose metabólica) e risco rápido de ==hipoglicemia grave em filhotes== sem apetite.\n' +
      '- ==Pele e coxins==: a persistência viral nas células da epiderme desregula a renovação celular, provocando acúmulo excessivo de queratina, espessamento e fissuras dolorosas nas almofadinhas das patas e no plano nasal {{ref:ref-koutinas-2004}}.\n' +
      '- ==Olhos==: a inflamação da glândula lacrimal reduz bruscamente a produção aquosa da lágrima (olho seco agudo), enquanto a invasão intraocular provoca inflamação da retina/coroide e do nervo óptico.\n' +
      '- ==Dentes em formação==: em filhotes infectados antes da troca dentária definitiva, o vírus lesiona as células produtoras de esmalte dentro da gengiva; como o esmalte maduro não se regenera, os dentes definitivos nascem com falhas, manchas e alterações estruturais permanentes {{ref:ref-dosenberry-2025}}.',
    cdvFigurasFisiopatologiaRespiratoria: [
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/cinomose/nuhoglu-2026-pneumonia-histopatologia.jpg',
        alt: 'Cortes histopatológicos pulmonares de cães infectados por CDV mostrando pneumonia intersticial, infiltrado neutrofílico alveolar, células gigantes sinciciais e inclusões virais epiteliais',
        shortCaption: 'Fig. 1 — Pneumonia intersticial viral, sincícios e broncopneumonia supurativa secundária pelo CDV (Nuhoğlu & Beytut, 2026).',
        caption:
          'Figura 1 — Alterações pulmonares de cães naturalmente infectados pelo CDV (painéis A–D). Observam-se espessamento intersticial, acúmulo de neutrófilos nos alvéolos (broncopneumonia bacteriana secundária), células gigantes (sincícios) e inclusões virais epiteliais. Demonstra por que a lesão viral inicial evolui frequentemente para infecção bacteriana secundária — o achado microscópico isolado não identifica a bactéria, exigindo investigação clínica e microbiológica. Fonte: Nuhoğlu e Beytut (2026), Animals 16(14):2233, Fig. 2 (CC BY 4.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/cinomose/van-de-bildt-2002-pulmao-lycaon.jpg',
        alt: 'Cortes histológicos pulmonares de cão-selvagem-africano (Lycaon pictus) com cinomose mostrando obstrução bronquiolar e inclusões virais eosinofílicas epiteliais',
        shortCaption: 'Fig. 2 — Inclusões virais em epitélio bronquiolar de Lycaon pictus infectado por CDV (van de Bildt et al., 2002).',
        caption:
          'Figura 2 — Cortes histológicos pulmonares de cão-selvagem-africano (*Lycaon pictus*) — espécie silvestre, não cão doméstico — infectado pelo CDV. Evidenciam-se detritos inflamatórios obstruindo os bronquíolos e inclusões virais no epitélio respiratório, ilustrando o tropismo pulmonar direto do vírus. Fonte: van de Bildt et al. (2002), Emerging Infectious Diseases 8(2):211–213 / CDC / Wikimedia Commons (Domínio público).',
        display: 'default',
      },
    ],
    cdvNeuroinvasaoEDesmielinizacao:
      'O CDV alcança o cérebro e a medula pela corrente sanguínea e também pela via olfatória nasal. Dentro do sistema nervoso central, provoca perda de mielina (camada isolante que acelera os impulsos nervosos) e morte ou disfunção neuronal na substância cinzenta:\n\n' +
      '- ==Duas fases da lesão neural==: na fase aguda (cães com imunidade fraca), ocorre ==desmielinização sem infiltrado inflamatório marcante== por infecção direta da glia e infecção incompleta dos oligodendrócitos (que reduz a produção de mielina); na fase subaguda ou crônica, com o retorno das defesas celulares e anticorpos, instala-se ==inflamação perivascular imunomediada== que amplia a destruição tecidual.\n' +
      '- ==Achados recentes (2024–2026)==: Verdes et al. (2024) mostraram ativação precoce de astrócitos e micróglia no cerebelo antes mesmo da perda evidente de mielina {{ref:ref-verdes-2024}}. Já Nuhoğlu e Beytut (2026) comprovaram infecção direta de astrócitos que não expressavam os receptores clássicos CD150 ou nectina-4, apontando para uma via neural alternativa ainda sem bloqueio específico {{ref:ref-nuhoglu-2026}}.',
    cdvMiocloniasVsConvulsoes:
      'Distinguir pelo padrão do movimento evita erros graves na prescrição:\n\n' +
      '- ==Mioclonia não epiléptica==: contração rítmica, breve e involuntária ("em choque") na face, músculos da mastigação, pescoço ou patas. Nasce de disparos rítmicos autônomos em neurônios motores da medula ou do tronco encefálico após lesão das vias inibitórias; por isso ==costuma persistir durante o sono profundo e raramente melhora com fenobarbital ou levetiracetam==.\n' +
      '- ==Crise epiléptica==: resulta de descargas elétricas desordenadas no córtex cerebral (podendo se manifestar como crises generalizadas ou movimentos rítmicos de mastigação com salivação intensa e perda parcial de consciência). Exige medicação anticonvulsivante imediata quando prolongada ou repetida {{ref:ref-acvim-status-2024}}.',
    cdvFigurasNeuropatologia: [
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/cinomose/verdes-2024-cerebelo-lfb.jpg',
        alt: 'Cortes histopatológicos de cerebelo canino corados por Luxol Fast Blue demonstrando progressão da desmielinização da substância branca em cães com cinomose',
        shortCaption: 'Fig. 3 — Progressão da desmielinização cerebelar na neurocinomose por coloração Luxol Fast Blue (Verdes et al., 2024).',
        caption:
          'Figura 3 — Progressão da perda de mielina no cerebelo de cães com cinomose (painéis a–f). Compara tecido saudável e lesões progressivas, mostrando perda acentuada da camada de mielina na substância branca — base anatômica da falta de coordenação motora, tremores e fraqueza progressiva. Fonte: Verdes et al. (2024), Viruses 16(11):1719, Fig. 4 (CC BY 4.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/cinomose/nuhoglu-2026-astrocitos-gfap-cdv.jpg',
        alt: 'Imunofluorescência dupla demonstrando colocalização de antígeno do vírus da cinomose canina e GFAP em astrócitos do sistema nervoso central',
        shortCaption: 'Fig. 4 — Imunofluorescência dupla evidenciando CDV dentro de astrócitos do sistema nervoso central (Nuhoğlu & Beytut, 2026).',
        caption:
          'Figura 4 — Imunofluorescência dupla mostrando o vírus dentro de astrócitos (células de sustentação fundamentais para o equilíbrio das sinapses). Como essas células não exibiam marcação equivalente de CD150 e nectina-4, o achado sustenta rotas alternativas de invasão cerebral. Fonte: Nuhoğlu e Beytut (2026), Animals 16(14):2233, Fig. 9 (CC BY 4.0).',
        display: 'default',
      },
    ],
  },

  clinicalSignsPathophysiology: {
    cdvFormasClinicasEvolutivas: {
      kind: 'clinicalTable',
      caption: 'Formas clínicas evolutivas e correlação imunológica',
      headers: ['Forma clínica', 'Quando ocorre', 'Manifestações e significado'],
      rows: [
        [
          'Infecção subclínica',
          'Resposta imune rápida (até 14 dias pós-infecção)',
          'O organismo elimina o vírus antes de grande comprometimento dos órgãos; o cão fica assintomático e imune.',
        ],
        [
          'Forma sistêmica aguda',
          'Dias 6 a 14 pós-infecção',
          'Febre, apatia, falta de apetite, conjuntivite, secreção ocular e nasal, tosse, vômitos e diarreia.',
        ],
        [
          'Forma respiratória complicada',
          'Queda imune + falha na limpeza dos cílios',
          'Evolução para broncopneumonia bacteriana secundária com febre persistente, falta de ar, crepitações pulmonares e queda de oxigenação.',
        ],
        [
          'Neurocinomose aguda ou subaguda',
          'Junto ou logo após sinais sistêmicos',
          'Convulsões focais mastigatórias ou generalizadas, falta de coordenação, déficits de nervos cranianos, tontura central, fraqueza e mioclonias.',
        ],
        [
          'Neurocinomose tardia',
          'Semanas após melhora aparente (ou sem fase respiratória notada)',
          'Abalos musculares rítmicos (mioclonias) ou sinais encefálicos e medulares em cães que já pareciam recuperados.',
        ],
        [
          'Encefalite crônica do cão idoso',
          'Persistência viral crônica rara em cães adultos ou idosos',
          'Mudança comportamental progressiva, caminhar compulsivo, perda visual e fraqueza sem sinais respiratórios ou digestórios agudos.',
        ],
        [
          'Forma congênita ou neonatal',
          'Infecção durante a gestação',
          'Abortamento, nascimento de natimortos, fraqueza neonatal e alterações neurológicas precoces.',
        ],
      ],
    },
    cdvManifestacoesGerais:
      'A viremia inicial e a resposta inflamatória sistêmica causam febre, apatia e falta de apetite. Esses sinais são inespecíficos quando isolados. A anorexia prolongada pode precipitar ==hipoglicemia rápida em filhotes==, justificando avaliação da glicemia desde a triagem.',
    cdvManifestacoesGastrointestinais:
      'A lesão das vilosidades intestinais causa má absorção e perda de água e eletrólitos, com vômitos e diarreia aquosa ou com sangue. Há risco de desidratação e queda de glicose; ==investigar parvovirose simultânea em filhotes==.',
    cdvManifestacoesRespiratoriasEOculares:
      'A invasão das mucosas respiratória e ocular inicia a fase catarral sistêmica: inflamação dos olhos (conjuntivite bilateral), secreção ocular e nasal (inicialmente clara e aquosa, tornando-se espessa e amarelada com infecção bacteriana associada), espirros, tosse e febre.\n\n' +
      '- ==Comprometimento pulmonar==: a perda dos cílios respiratórios, a pneumonia viral e a broncopneumonia bacteriana secundária podem causar respiração acelerada e esforço respiratório. A oximetria e o exame de imagem torácica ajudam a avaliar a gravidade e a orientar a decisão sobre antibióticos.\n' +
      '- ==Limite do exame visual==: embora secreção ocular e nasal em filhote sem vacina em dia levante forte suspeita, ==sua aparência isolada não diferencia cinomose de outras infecções respiratórias caninas== (como traqueobronquite infecciosa ou gripe canina), exigindo busca de sinais em outros sistemas e testes específicos.',
    cdvFiguraOculonasalSistemica: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/cinomose/cdc-phil-12786-oculonasal.jpg',
      alt: 'Fotografia clínica de cão com cinomose apresentando conjuntivite bilateral, secreção ocular e secreção nasal mucopurulenta',
      shortCaption: 'Fig. 5 — Conjuntivite bilateral e secreção oculonasal na apresentação sistêmica da cinomose (CDC PHIL #12786).',
      caption:
        'Figura 5 — Cão com cinomose apresentando conjuntivite bilateral, secreção ocular e secreção nasal. A infecção das mucosas respiratória e ocular causa inflamação e alteração da limpeza das secreções. Embora auxilie no reconhecimento precoce, a aparência isolada não distingue cinomose de outras infecções respiratórias caninas. Fonte: Centers for Disease Control and Prevention (CDC), Public Health Image Library #12786 (Dr. Brian W. J. Mahy, Domínio público).',
      display: 'default',
    },
    cdvManifestacoesOftalmologicas:
      'O exame oftalmológico completo vai além de observar secreção externa:\n\n' +
      '- ==Olho seco agudo (ceratoconjuntivite seca)==: a inflamação da glândula lacrimal reduz drasticamente a lágrima, favorecendo secreção espessa e ==risco rápido de úlcera de córnea== — motivo pelo qual o teste de Schirmer e o corante de fluoresceína são indispensáveis.\n' +
      '- ==Alterações de retina e cicatrizes em "medalhão"==: no exame de fundo de olho, a fase aguda pode exibir focos inflamatórios acinzentados na retina ou descolamento focal. Em sobreviventes, a cicatrização deixa marcas circulares brilhantes conhecidas como ==cicatrizes em medalhão== — indício permanente de infecção prévia {{ref:ref-ophthalmic-medallion}}.\n' +
      '- ==Inflamação do nervo óptico (neurite óptica)==: pode causar cegueira súbita e ausência de reflexo pupilar à luz (com inchaço do disco óptico ou até fundo de olho de aparência normal quando a inflamação é posterior ao globo ocular).',
    cdvManifestacoesDermatologicas:
      'As alterações de pele costumam aparecer após ou junto com a fase sistêmica subaguda:\n\n' +
      '- ==Espessamento dos coxins e do focinho (hiperqueratose plantar e nasal)==: a presença do vírus na pele induz acúmulo excessivo de queratina e espessamento da pele, deixando as almofadinhas das patas e a ponta do focinho endurecidas, ásperas e com fissuras dolorosas (alterações microscópicas podem preceder o aspecto visível a olho nu) {{ref:ref-koutinas-2004}}.\n' +
      '- ==Como avaliar ao exame físico==: diferencie o coxim saudável — espesso, porém uniforme e flexível ao toque — do coxim endurecido, irregular e rachado. ==A hiperqueratose sugere cinomose quando há quadro compatível, mas não confirma sozinha nem sua ausência afasta a doença== (diferenciar de pênfigo foliáceo, dermatose responsiva ao zinco e leishmaniose).\n' +
      '- ==Pústulas abdominais==: pequenas bolhas ou pústulas na região ventral e inguinal podem surgir em filhotes na fase aguda.\n' +
      '- ==Referência visual externa==: fotografias clínicas e achados microscópicos de hiperqueratose dos coxins estão listados nas referências ao final da página {{ref:ref-dierenkliniek-tiel}} {{ref:ref-koutinas-2004}}.',
    cdvManifestacoesOdontologicas:
      'Quando a infecção atinge filhotes antes da erupção dos dentes definitivos (em geral antes dos 3 a 6 meses de idade), o dano às células formadoras do esmalte deixa marcas para toda a vida:\n\n' +
      '- ==Hipoplasia de esmalte e defeitos dentários==: falhas parciais ou totais na camada de esmalte com exposição de dentina amarelada ou acastanhada, superfície irregular propensa a tártaro, alteração no formato do dente e dentes ausentes ou que não erupcionam.\n' +
      '- ==Marcador retrospectivo==: como o esmalte maduro não se regenera, essas alterações permanecem no cão adulto mesmo após cura completa, funcionando como marca histórica da cinomose na infância {{ref:ref-dosenberry-2025}}.',
    cdvFiguraHipoplasiaEsmalte: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/cinomose/dosenberry-2025-hipoplasia-esmalte.webp',
      alt: 'Fotografias clínicas e cortes histopatológicos dentários de cão sobrevivente à cinomose mostrando hipoplasia de esmalte e alterações na formação dentária',
      shortCaption: 'Fig. 6 — Hipoplasia de esmalte e alterações microscópicas dentárias em cão sobrevivente à cinomose (Dosenberry et al., 2025).',
      caption:
        'Figura 6 — Alterações dentárias em cão sobrevivente à cinomose (painéis A–G), evidenciando hipoplasia de esmalte, manchas internas, alteração da forma dentária e dentes ausentes ou não erupcionados, correlacionadas às lesões microscópicas nas células formadoras do esmalte durante o desenvolvimento em filhotes. Fonte: Dosenberry et al. (2025), Frontiers in Veterinary Science 11:1511971, Fig. 6 (CC BY 4.0).',
      display: 'default',
    },
    cdvManifestacoesNeurologicas:
      'Os sinais neurológicos refletem perda de mielina e lesão de neurônios e células gliais no cérebro, cerebelo, tronco encefálico ou medula espinhal e podem aparecer junto com o quadro sistêmico ou semanas depois {{ref:ref-verdes-2024}} {{ref:ref-nuhoglu-2026}}:\n\n' +
      '- ==Principais quadros neurológicos==: lesões no córtex cerebral causam ==crises focais mastigatórias (movimentos repetitivos de mastigação com salivação, como se mascasse algo)==, convulsões generalizadas, mudanças de comportamento ou cegueira central; lesões cerebelares e vestibulares provocam andar cambaleante, passos exagerados, tremores ao tentar alcançar objetos, inclinação de cabeça e movimento rítmico dos olhos (nistagmo); lesões medulares causam fraqueza progressiva ou paralisia de membros.\n' +
      '- ==Identificação da mioclonia==: abalos musculares rítmicos e constantes em patas, face ou mandíbula que ==mantêm o ritmo mesmo durante o sono==, diferenciando-se de convulsões verdadeiras.\n' +
      '- ==Implicação prognóstica e terapêutica==: o comprometimento neurológico é um importante marcador de pior prognóstico. Diferenciar mioclonias, frequentemente refratárias, de crises epilépticas passíveis de controle orienta o tratamento e a avaliação da resposta.\n' +
      '- ==Registro clínico em vídeo==: caso documentando fraqueza pélvica associada a mioclonias rítmicas encontra-se citado nas referências ao final do texto {{ref:ref-bsava-neuro-video-1417}}.',
    physicalExamFindings: [
      'Respiratório e circulação: checar frequência e esforço respiratório, ausculta pulmonar, saturação de oxigênio, cor das mucosas, tempo de preenchimento capilar e pressão arterial.',
      'Hidratação e glicemia: avaliar turgor cutâneo, mucosas, peso diário e dosar glicose logo na triagem de filhotes.',
      'Olhos: fazer teste lacrimal de Schirmer (risco de úlcera por olho seco), corante de fluoresceína e exame de fundo de olho.',
      'Pele e boca: palpar coxins (maciez normal versus endurecimento com fissuras), observar focinho, abdome ventral e esmalte dentário.',
      'Neurológico: testar consciência, marcha, equilíbrio, nervos cranianos, reflexo de deglutição (risco de engasgo e aspiração) e diferenciar abalos rítmicos de convulsões.',
    ],
    particularidadesCaninasEFelinas:
      '- Cães: representam a espécie clínica principal desta monografia, podendo exibir desde infecção leve até pneumonia grave, hiperqueratose dos coxins e neurocinomose precoce ou tardia.\n' +
      '- Gatos: gatos domésticos não desenvolvem cinomose canina (não confundir com a panleucopenia felina, causada por outro vírus, nem extrapolar exames ou protocolos caninos para gatos domésticos; apenas grandes felídeos selvagens apresentam suscetibilidade clínica relevante ao CDV).',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico passo a passo — Raciocínio clínico na admissão',
      subtitle: 'Expanda cada etapa para conferir prioridade clínica, escolha de amostras e alertas práticos.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Minutos 0–15 · Biossegurança',
          speciesTag: 'dog',
          title: 'Isolamento imediato e estabilização de risco vital',
          quickSummary:
            'Isole todo cão suspeito logo na chegada e avalie oxigenação, perfusão e glicemia antes de aguardar qualquer teste laboratorial.',
          quickFacts: [
            { label: 'Prioridade', value: 'Isolamento + triagem de emergência' },
            { label: 'Erro grave', value: 'Aguardar exame para isolar' },
          ],
          details: [
            {
              label: 'Por que isolar antes do diagnóstico?',
              content:
                'Apesar de sensível a detergentes e desinfetantes comuns, o vírus espalha-se rapidamente por gotículas e secreções em salas de espera e internações.',
              tone: 'warning',
            },
            {
              label: 'Checagem metabólica imediata',
              content:
                'Em filhotes prostrados ou convulsionando, meça a glicemia na hora: queda severa de glicose é reversível e pode imitar ou agravar sinais neurológicos.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Primeiras horas · Triagem',
          speciesTag: 'dog',
          title: 'Triagem sanguínea, imagem torácica e pesquisa de coinfecções',
          quickSummary:
            'Solicite hemograma (incluindo pesquisa no esfregaço), bioquímica, radiografia torácica se houver sinais respiratórios e teste de parvovirose em filhotes com diarreia.',
          quickFacts: [
            { label: 'Inclusões virais', value: 'Mais visíveis nos dias 2–9 pós-infecção' },
            { label: 'Coinfecção crítica', value: 'Parvovirose canina (CPV)' },
          ],
          details: [
            {
              label: 'Linfopenia não é obrigatória',
              content:
                'A queda de linfócitos é típica na fase aguda, porém cães na fase neurológica prolongada podem ter contagem linfocitária normal ou até elevada {{ref:ref-kapar-2026}}.',
              tone: 'evidence',
            },
            {
              label: 'Avaliação pulmonar',
              content:
                'Radiografia torácica ou ultrassonografia pulmonar à beira do leito ajudam a detectar consolidação sugestiva de broncopneumonia bacteriana secundária.',
              tone: 'default',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Primeiras 24h · Molecular',
          speciesTag: 'dog',
          title: 'Escolha estratégica das amostras para pesquisa molecular (RT-PCR)',
          quickSummary:
            'Selecione os sítios biológicos conforme a fase clínica para aumentar a chance de detecção viral.',
          quickFacts: [
            { label: 'Fase aguda', value: 'Swab ocular/nasal + sangue EDTA' },
            { label: 'Fase tardia/neuro', value: 'Urina + líquor (se seguro)' },
          ],
          details: [
            {
              label: 'Limitação de sensibilidade clínica',
              content:
                'Mesmo métodos mais sensíveis (como PCR digital em gotículas frente à RT-PCR convencional) podem resultar negativos se o vírus já tiver diminuído na amostra coletada {{ref:ref-iribarnegaray-2024}}.',
              tone: 'evidence',
            },
            {
              label: 'Cuidado com vacinação recente',
              content:
                'Cães vacinados com vírus vivo modificado nas últimas 1 a 3 semanas podem apresentar detecção molecular transitória sem infecção natural; avalie carga viral e quadro clínico.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Neurocinomose · Investigação avançada',
          speciesTag: 'dog',
          title: 'Ressonância magnética e exame do líquor quando a PCR for negativa',
          quickSummary:
            'Quando o quadro neurológico persiste com PCR inconclusiva, imagem avançada e análise liquórica ajudam a caracterizar a encefalomielite e afastar diferenciais.',
          quickFacts: [
            { label: 'Líquor agudo', value: 'Pode vir completamente normal' },
            { label: 'Líquor crônico', value: 'Proteína > 25 mg/dL e pleocitose' },
          ],
          details: [
            {
              label: 'Interpretação na fase inicial',
              content:
                'Na desmielinização aguda ainda sem inflamação exuberante, tanto a celularidade do líquor quanto o realce por contraste na ressonância podem estar ausentes, sem descartar cinomose.',
              tone: 'warning',
            },
            {
              label: 'Comprovação de anticorpos intratecais',
              content:
                'Comparar a razão de anticorpos anti-CDV entre líquor e sangue com a razão de outro agente vacinal (quando a barreira encefálica está íntegra) confirma produção local no sistema nervoso.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    cdvPerfilLaboratorial:
      'Os exames laboratoriais gerais avaliam a gravidade orgânica, detectam emergências metabólicas e orientam o controle de infecções bacterianas secundárias:\n\n' +
      '- ==Hemograma e esfregaço sanguíneo (corpúsculos de Lentz)==: anemia leve e queda de linfócitos são clássicas na fase aguda pela destruição do tecido linfoide, mas cães com neurocinomose crônica podem exibir linfócitos normais ou elevados (média de 5,82 × 10³/µL vs 1,92 × 10³/µL em controles) {{ref:ref-kapar-2026}}. Inclusões citoplasmáticas virais (==corpúsculos de Lentz==) podem aparecer em neutrófilos, linfócitos, monócitos ou hemácias jovens nos dias 2 a 9 pós-infecção — com maior rendimento no concentrado de glóbulos brancos (camada leucoplaquetária) ou em raspado conjuntival. Contudo, são achados raros e transitórios: sua ausência não exclui a doença, e é essencial não confundi-los com restos de corante, grânulos ou pomada oftálmica. Aumento de neutrófilos com desvio à esquerda aponta para broncopneumonia bacteriana secundária.\n' +
      '- ==Bioquímica sérica e eletrólitos==: vômitos e diarreia causam queda de sódio, potássio e cloro, além de desequilíbrio ácido-base e albumina baixa. Dosar ==glicemia imediatamente em filhotes== evita confundir crise por hipoglicemia com neurocinomose.\n' +
      '- ==Urinálise e coagulação==: alterações urinárias são inespecíficas, porém a urina é útil para pesquisa molecular tardia. Alterações de plaquetas e tempos de coagulação sugerem sepse ou coagulação intravascular disseminada secundária.',
    cdvFiguraCorpusculoLentz: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/cinomose/wheeler-2017-lentz-inclusion.jpg',
      alt: 'Esfregaço sanguíneo de filhote canino corado por Wright demonstrando corpúsculo de inclusão citoplasmático viral de Lentz em neutrófilo',
      shortCaption: 'Fig. 7 — Corpúsculo de inclusão citoplasmático viral em neutrófilo na cinomose canina (Wheeler, 2017).',
      caption:
        'Figura 7 — Esfregaço sanguíneo de filhote canino com cinomose, corado por Wright, demonstrando inclusão citoplasmática viral (corpúsculo de Lentz) em neutrófilo. Representa evidência citopatológica relevante frente a alterações inespecíficas do hemograma, mas tem baixa sensibilidade e janela curta — sua ausência não exclui a infecção e não substitui testes moleculares. Fonte: Lance Wheeler (2017), Wikimedia Commons (CC BY 4.0).',
      display: 'default',
    },
    cdvDiagnosticoMolecularEImagem:
      'A interpretação correta dos testes específicos evita falsos descartes e erros de diagnóstico:\n\n' +
      '- ==Testes moleculares (RT-PCR, RT-qPCR e PCR digital em gotículas)==: em estudo comparativo com 76 cães suspeitos, a detecção foi de ==51,3% (RT-PCR), 57,9% (RT-qPCR) e 72,4% (PCR digital em gotículas==, capaz de detectar a partir de 3 cópias/µL contra 86 cópias/µL na RT-qPCR) {{ref:ref-iribarnegaray-2024}}. Ainda assim, não existe teste infalível: resultados negativos ocorrem conforme a amostra e o estágio clínico, e vacinação recente com vírus vivo modificado pode gerar positivos passageiros sem haver ponto de corte único válido para todos os laboratórios.\n' +
      '- ==Sorologia, imunofluorescência e pesquisa experimental==: anticorpos sanguíneos (IgM ou IgG) sofrem interferência vacinal e não confirmam doença ativa sozinhos; a imunofluorescência direta em raspado conjuntival ou líquor concentrado depende da fase da doença. Marcadores séricos de lesão neural recentemente avaliados (NSE, GFAP e CK-BB) elevaram-se na neurocinomose, mas ainda ==carecem de valores de referência clínicos validados== para uso na rotina {{ref:ref-kapar-2026}}.\n' +
      '- ==Exames de imagem e líquor==: radiografia torácica e ultrassonografia pulmonar avaliam broncopneumonia secundária. Na ==ressonância magnética encefálica==, são típicas lesões hiperintensas em T2 e FLAIR na substância branca do cerebelo, tronco encefálico, córtex ou tálamo — frequentemente sem captação de contraste na fase aguda {{ref:ref-clinicians-brief-mri}}. No líquor, a fase crônica costuma mostrar aumento de proteína e células mononucleares (ou proteína alta com poucas células em lesões profundas).',
    cdvFiguraDiagnosticoMolecular: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/cinomose/iribarnegaray-2024-ddpcr.jpg',
      alt: 'Gráfico de PCR digital em gotículas separando populações positivas e negativas para RNA do vírus da cinomose canina',
      shortCaption: 'Fig. 8 — Análise molecular por PCR digital em gotículas para CDV: separação de gotículas positivas vs. negativas (Iribarnegaray et al., 2024).',
      caption:
        'Figura 8 — Desempenho analítico do ensaio de PCR digital em gotículas para detecção do RNA do CDV (Iribarnegaray et al., 2024, Fig. 2 A–B). O gráfico demonstra separação nítida entre gotículas positivas e negativas mesmo com carga viral muito baixa, explicando o ganho de sensibilidade em cães parcialmente imunizados ou na fase neurológica tardia — lembrando que um resultado negativo isolado continua não excluindo a doença. Fonte: Iribarnegaray et al. (2024), Viruses 16(11):1720 (CC BY 4.0).',
      display: 'default',
    },
    cdvTabelaSinteseDiagnostica: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Resumo dos exames diagnósticos e interpretações',
      headers: ['Exame', 'Achado esperado', 'Melhor momento', 'Limitação principal', 'Como usar na prática'],
      rows: [
        [
          'Hemograma + pesquisa em esfregaço',
          'Linfopenia aguda; inclusões de Lentz raras',
          'Admissão e controle',
          'Inespecífico; linfócitos normais/altos na fase crônica',
          'Avalia gravidade e suspeita bacteriana secundária {{ref:ref-kapar-2026}}.',
        ],
        [
          'Bioquímica + Eletrólitos + Glicemia',
          'Albumina baixa, potássio baixo e hipoglicemia (filhotes)',
          'Admissão e UTI',
          'Não define a causa viral',
          'Corrige riscos metabólicos imediatos.',
        ],
        [
          'Testes moleculares (RT-PCR / ddPCR)',
          'Detecção de RNA do CDV',
          'Swab/sangue (agudo); urina (tardio)',
          'Falso-negativo tardio; interferência pós-vacinal',
          'Positivo apoia fortemente; negativo ==não exclui== {{ref:ref-iribarnegaray-2024}}.',
        ],
        [
          'Líquor (quando anestesia for segura)',
          'Normal no início; proteína > 25 mg/dL e pleocitose na fase crônica',
          'Quadro neurológico sem diagnóstico',
          'Exame invasivo; pode vir normal',
          'Útil para afastar outras encefalites e medir anticorpos locais.',
        ],
        [
          'Imagem (Tórax e Ressonância)',
          'Consolidação pulmonar; lesões em T2/FLAIR no encéfalo',
          'Conforme sinais clínicos',
          'Alterações semelhantes em outras doenças',
          'Guia antibióticos pulmonares e localiza lesões cerebrais.',
        ],
      ],
    },
    cdvTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Principais diagnósticos diferenciais na rotina clínica',
      headers: ['Doença diferencial', 'O que gera confusão', 'Pistas de diferenciação', 'Investigação recomendada'],
      rows: [
        [
          'Parvovirose canina (CPV)',
          'Filhote sem vacina com vômitos, diarreia e leucopenia',
          'Diarreia hemorrágica intensa sem mioclonia; lembrar que ==as duas infecções podem ocorrer juntas==.',
          'Teste rápido/PCR para parvovirose + PCR para cinomose.',
        ],
        [
          'Traqueobronquite infecciosa e gripe canina',
          'Tosse, secreção nasal e febre em cães agrupados',
          'A presença de hiperqueratose dos coxins, alteração de retina ou sinais neurológicos aponta contra doença respiratória simples.',
          'Painel respiratório (PCR) e radiografia torácica.',
        ],
        [
          'Meningoencefalite de origem desconhecida',
          'Convulsões, desequilíbrio e alterações inflamatórias em líquor e ressonância',
          'Histórico vacinal precário, sinais respiratórios prévios ou hiperqueratose favorecem cinomose.',
          'Ressonância magnética, líquor e painel infeccioso antes de imunossupressão.',
        ],
        [
          'Toxoplasmose e Neosporose',
          'Inflamação cerebral ou medular multifocal e fraqueza',
          'Neosporose tende a causar rigidez e dor muscular pélvica sem pródromo respiratório clássico.',
          'Sorologia pareada, PCR (líquor/tecido) e enzima muscular (CK).',
        ],
        [
          'Raiva',
          'Mudança comportamental, dificuldade de engolir e paralisia aguda',
          '==Nenhum exame físico afasta raiva com segurança== quando há histórico compatível de exposição.',
          'Biossegurança rigorosa, isolamento e notificação oficial.',
        ],
        [
          'Intoxicações e Hipoglicemia primária',
          'Tremores, convulsões e vômitos agudos',
          'Ausência de febre infecciosa prévia; melhora rápida após correção da glicose.',
          'Glicemia imediata, histórico toxicológico e perfil bioquímico.',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico passo a passo — Suporte e neuroproteção',
      subtitle: 'Expanda cada etapa para conferir metas práticas, ajustes de suporte e restrições importantes.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Minutos 0–30 · Emergência',
          speciesTag: 'dog',
          title: 'Oxigenação, reposição volêmica cuidadosa e controle glicêmico',
          quickSummary:
            'Corrija hipoxemia, desidratação grave e hipoglicemia antes de outras medidas, reavaliando a respiração após cada etapa.',
          quickFacts: [
            { label: 'Choque hipovolêmico', value: 'Provas fracionadas com reavaliação pulmonar' },
            { label: 'Diurético na pneumonia', value: 'Evitar de rotina' },
          ],
          details: [
            {
              label: 'Cuidado com sobrecarga nos pulmões',
              content:
                'Não confunda crepitações de broncopneumonia com edema pulmonar cardiogênico; evite furosemida sem evidência cardíaca e monitore frequência respiratória a cada prova de fluido {{ref:ref-aaha-fluid-2024}}.',
              tone: 'danger',
            },
            {
              label: 'Cálculo de reposição hídrica',
              content:
                'Após reverter eventual hipovolemia, calcule o déficit de desidratação (`Peso em kg × % de desidratação × 10`) e reponha de forma gradual somando manutenção e perdas diárias {{ref:ref-aaha-fluid-2024}}.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Crise ≥ 5 min · Neuroemergência',
          speciesTag: 'dog',
          title: 'Controle escalonado de crises epilépticas',
          quickSummary:
            'Interrompa crises prolongadas ou repetidas com benzodiazepínico imediato (via venosa ou intranasal) e associe anticonvulsivante de manutenção.',
          quickFacts: [
            { label: '1ª linha imediata', value: 'Midazolam IV ou intranasal' },
            { label: '2ª linha IV', value: 'Levetiracetam ou Fenobarbital' },
          ],
          details: [
            {
              label: 'Via intranasal sem acesso venoso',
              content:
                'Em estudo clínico randomizado, o midazolam intranasal controlou mais rapidamente crises em cães sem acesso venoso imediato (76% vs 61% pela via venosa quando considerado o tempo de preparo) {{ref:ref-charalambous-2019}}.',
              tone: 'evidence',
            },
            {
              label: 'Correção de gatilhos paralelos',
              content:
                'Sempre corrija hipertermia, hipóxia, hipoglicemia e distúrbios eletrolíticos durante o resgate convulsivo para evitar dano cerebral secundário {{ref:ref-acvim-status-2024}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Horas 6–24 · Suporte clínico',
          speciesTag: 'dog',
          title: 'Controle de náuseas, proteção ocular e nutrição segura',
          quickSummary:
            'Controle vômitos com antieméticos eficazes e inicie suporte nutricional assim que o paciente estiver estável e sem risco de aspiração.',
          quickFacts: [
            { label: 'Via oral forçada', value: 'Contraindicada se houver disfagia' },
            { label: 'Olhos', value: 'Lubrificante se lágrima reduzida' },
          ],
          details: [
            {
              label: 'Prevenção de pneumonia aspirativa',
              content:
                'Nunca force alimentos ou líquidos na boca de cães sonolentos ou com dificuldade de engolir; se o trato digestório estiver funcional e o cão estável, prefira sonda alimentar adequada.',
              tone: 'danger',
            },
            {
              label: 'Cuidados oculares e de enfermagem',
              content:
                'Aplique colírios lubrificantes e trate úlceras ou infecções oculares oportunistas precocemente; em pacientes acamados, faça mudanças de decúbito e mantenha leito seco.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Internação · Decisões baseadas em evidência',
          speciesTag: 'dog',
          title: 'Antibióticos apenas com indicação e recusa de terapias sem comprovação',
          quickSummary:
            'Indique antimicrobianos somente diante de suspeita fundamentada de infecção bacteriana secundária e evite corticoides de rotina ou antivirais não validados.',
          quickFacts: [
            { label: 'Corticoides (neuro)', value: 'Sem benefício comprovado' },
            { label: 'Antivirais específicos', value: 'Sem aprovação clínica' },
          ],
          details: [
            {
              label: 'Duração do antibiótico',
              content:
                'Antibiótico não elimina o vírus da cinomose; mantenha-o apenas pelo tempo necessário para resolver a infecção bacteriana (como broncopneumonia), nunca aguardando negativação da PCR viral.',
              tone: 'warning',
            },
            {
              label: 'Terapias sem respaldo clínico',
              content:
                'Ensaio clínico recente com prednisolona na neurocinomose registrou elevada mortalidade (18 óbitos ou eutanásias em 25 cães) {{ref:ref-sarchahi-2025}}, e análogos nucleosídeos como GS-441524 possuem apenas testes laboratoriais iniciais sem dose ou segurança estabelecidas em cães {{ref:ref-oliver-guimera-2025}}.',
              tone: 'evidence',
            },
          ],
        },
      ],
    },
    cdvEstabilizacaoFluidosENutricao:
      'Como não existe antiviral específico aprovado contra o CDV, o suporte fisiológico contínuo é o fator decisivo para o paciente sobreviver até controlar o vírus:\n\n' +
      '- ==Fluidos e oxigênio sob medida==: diferencie choque circulatório (que exige reposição venosa rápida em pequenas etapas com reavaliação pulmonar constante) de desidratação crônica para não agravar uma pneumonia concomitante {{ref:ref-aaha-fluid-2024}}. Ofereça cateter nasal ou gaiola de oxigênio diante de baixa saturação ou esforço respiratório.\n' +
      '- ==Nutrição precoce com via aérea protegida==: alimentar precocemente mantém a integridade do intestino e evita perda acentuada de reservas corporais, usando sondas enterais quando houver recusa alimentar prolongada sem risco de vômitos incoercíveis.',
    cdvCrisesMiocloniasEControversias:
      'Alinhar expectativas reais sobre manifestações neurológicas e tratamentos controversos evita frustração e efeitos adversos:\n\n' +
      '- ==Mioclonias versus convulsões==: como as mioclonias não nascem no córtex cerebral, ==raramente cedem com fenobarbital ou levetiracetam==; a decisão clínica concentra-se em avaliar se o cão consegue comer, dormir e manter boa qualidade de vida.\n' +
      '- ==Antivirais, soros e terapias alternativas==: ribavirina, interferons comerciais, megadoses vitamínicas, ozonioterapia e homeopatia carecem de comprovação clínica consistente. Quanto a soro com anticorpos específicos (IgG porcina anti-CDV), um único ensaio pequeno em filhotes ainda sem sinais neurológicos (n = 41) sugeriu maior sobrevivência (76% vs 31,3%), o que não autoriza extrapolar eficácia para qualquer soro comercial ou plasma comum na rotina {{ref:ref-liu-2016}}.',
    cdvTabelaFarmacosSuporte: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Fármacos de suporte e emergência auditados (AAHA 2024 e ACVIM 2024)',
      headers: ['Fármaco / Terapia', 'Indicação em cães', 'Dose', 'Via e frequência', 'Observações clínicas'],
      rows: [
        [
          'Cristaloide isotônico tamponado',
          'Choque hipovolêmico',
          '15–20 mL/kg por etapa',
          'IV em 15–30 min',
          'Reavaliar ausculta e respiração após cada prova se houver pneumonia {{ref:ref-aaha-fluid-2024}}.',
        ],
        [
          'Maropitant',
          'Controle de vômitos',
          '1 mg/kg (IV/SC) ou 2 mg/kg (VO)',
          'A cada 24 h',
          'Antiemético de ação central; cautela em hepatopatas.',
        ],
        [
          'Ondansetrona',
          'Náusea ou vômito refratário',
          '0,5–1 mg/kg',
          'VO ou IV lento a cada 12–24 h',
          'Pode ser associada ao maropitant em quadros persistentes.',
        ],
        [
          'Amoxicilina–clavulanato',
          'Infecção bacteriana secundária',
          '12,5–25 mg/kg',
          'VO a cada 8–12 h (ou IV em graves)',
          '==Não trata o vírus==; preferir via venosa em pneumonia grave.',
        ],
        [
          'Midazolam',
          'Resgate de crise epiléptica',
          '0,2–0,3 mg/kg (IV) ou 0,2 mg/kg (intranasal)',
          'Dose imediata de resgate',
          'Via intranasal agiliza controle sem acesso venoso {{ref:ref-charalambous-2019}} {{ref:ref-acvim-status-2024}}.',
        ],
        [
          'Diazepam',
          'Resgate de crise epiléptica',
          '0,5 mg/kg',
          'IV (ação curta)',
          'Associar fármaco de manutenção pelo risco de retorno rápido das crises {{ref:ref-acvim-status-2024}}.',
        ],
        [
          'Levetiracetam',
          'Ataque e manutenção anticonvulsivante',
          '60 mg/kg IV (ataque); 20–30 mg/kg VO (manutenção)',
          'Ataque único; manutenção a cada 8–12 h',
          'Boa margem de segurança hepática; ajustar em doença renal {{ref:ref-acvim-status-2024}}.',
        ],
        [
          'Fenobarbital',
          'Ataque e manutenção anticonvulsivante',
          '18–24 mg/kg IV fracionado (ataque); 2,5–3 mg/kg VO (inicial)',
          'Manutenção a cada 12 h',
          'Vigiar depressão respiratória no ataque e função hepática no uso contínuo.',
        ],
        [
          'GS-441524 / Corticoides de rotina',
          'Sem indicação estabelecida',
          'Não utilizar como protocolo padrão',
          '—',
          'GS-441524 apenas experimental in vitro {{ref:ref-oliver-guimera-2025}}; corticoides sem benefício comprovado {{ref:ref-sarchahi-2025}}.',
        ],
      ],
    },
  },

  prevention: {
    cdvProtocoloVacinalWsava:
      'A vacinação essencial com vírus vivo modificado é a ferramenta mais segura e eficaz para impedir a doença clínica e reduzir a circulação viral {{ref:ref-wsava-2024}} {{ref:ref-aaha-vax-2022}}:\n\n' +
      '- ==Filhotes domiciliados (atualização WSAVA 2024)==: iniciar entre 6 e 8 semanas, repetir a cada 3 a 4 semanas até ==16 semanas ou mais== (18–20 semanas em regiões de alto risco) e aplicar um ==reforço às 26 semanas de idade== caso não haja sorologia comprovando proteção — fechando a janela em que anticorpos maternos poderiam ter neutralizado doses anteriores {{ref:ref-wsava-2024}}.\n' +
      '- ==Cães adultos (> 26 semanas) sem histórico==: 1 dose de vacina essencial viva modificada costuma conferir proteção (considerar 2ª dose em 2 a 4 semanas em cenários de alto risco); reforços posteriores geralmente a cada 3 anos conforme bula e normas locais {{ref:ref-wsava-2024}}.\n' +
      '- ==Abrigos e canis==: vacinar na admissão; filhotes a partir de 4 semanas em intervalos curtos até ~5 meses; cães acima de 5 meses recebendo duas doses com intervalo de 2 a 3 semanas {{ref:ref-wsava-2024}} {{ref:ref-aspca-cdv}}.',
    cdvBiossegurancaEIsolamento:
      '- ==Limpeza e desinfecção==: remover toda matéria orgânica com água e detergente antes de aplicar desinfetante hospitalar (hipoclorito diluído ou amônio quaternário respeitando o tempo de contato). Secreções secas e ambientes frios preservam o vírus por mais tempo.\n' +
      '- ==Encerramento do isolamento==: como a eliminação viral pode durar semanas ou meses, ambientes com outros cães suscetíveis devem combinar resolução dos sinais clínicos com testes seriados negativos antes de liberar o convívio {{ref:ref-aspca-cdv}}.',
  },

  complications: {
    cdvTabelaComplicacoesUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Complicações graves e prioridades de terapia intensiva',
      headers: ['Complicação', 'Como reconhecer cedo', 'Conduta prioritária', 'Impacto no prognóstico'],
      rows: [
        [
          'Broncopneumonia bacteriana e insuficiência respiratória',
          'Respiração rápida, esforço abdominal, queda de saturação e febre persistente',
          'Oxigenoterapia, imagem torácica e antibiótico parenteral direcionado',
          'Grave se houver cansaço respiratório ou falta de resposta ao oxigênio.',
        ],
        [
          'Choque hipovolêmico e lesão renal pré-renal',
          'Mucosas pálidas, pulso fraco, taquicardia e redução urinária',
          'Reposição volêmica fracionada com monitoramento pulmonar',
          'Grave se não revertido nas primeiras horas.',
        ],
        [
          'Hipoglicemia aguda (filhotes)',
          'Fraqueza intensa, tremores, sonolência ou crises convulsivas',
          'Correção rápida de glicose venosa seguida de manutenção contínua',
          'Altamente reversível quando identificada a tempo.',
        ],
        [
          'Estado de mal epiléptico',
          'Crise contínua ≥ 5 min, febre alta por esforço e perda prolongada de consciência',
          'Benzodiazepínico imediato → anticonvulsivante de manutenção e resfriamento',
          'Reservado a grave quando refratário.',
        ],
        [
          'Pneumonia por aspiração',
          'Engasgo ou tosse após tentativa de alimentação oral em cão debilitado',
          'Suspender alimentação pela boca imediatamente e proteger via aérea',
          'Eleva fortemente a mortalidade respiratória.',
        ],
      ],
    },
    cdvPrognosticoECoortes:
      'A mortalidade varia muito conforme o estágio clínico na chegada e o acesso à terapia intensiva:\n\n' +
      '- ==Menezes et al. (2023 — Goiânia, Brasil)==: em 46 cães com doença natural (muitos com comprometimento de múltiplos órgãos), ==82,6% (38/46) evoluíram para óbito ou eutanásia== {{ref:ref-menezes-2023}}.\n' +
      '- ==Coorte neurológica (UFG, 2025)==: entre 17 cães com neurocinomose confirmada atendidos em hospital-escola, a letalidade foi de ==47,1% (8/17)==, mostrando que casos selecionados com suporte contínuo podem alcançar sobrevida prolongada {{ref:ref-ufg-neuro-2025}}.\n' +
      '- ==Kapar et al. (2026 — neurocinomose grave)==: em 36 cães jovens não vacinados já com doença neurológica instalada, apenas 5 sobreviveram {{ref:ref-kapar-2026}}.\n' +
      '- ==Visão prática==: coma, crises refratárias, paralisia progressiva e insuficiência respiratória grave conferem prognóstico desfavorável; em contrapartida, cães que superam a fase aguda mantendo crises controladas ou apenas mioclonias estáveis podem levar vida confortável.',
  },

  references: [
    {
      id: 'ref-greene-5ed-cap22',
      authors: 'Sykes JE, Vandevelde M (In: Sykes JE)',
      title: "Cap. 22: Canine Distemper Virus Infection — Greene's Infectious Diseases of the Dog and Cat (5th Edition)",
      journal: 'Elsevier',
      year: 2023,
      pages: 'pp. 926-954 (PDF)',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 64, Cap. 93 e Cap. 96 (Polysystemic Viral Diseases)',
      journal: 'Elsevier',
      year: 2020,
      pages: 'pp. 1124-1125, 1448+, 1485-1487',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-bsava-10ed',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition)',
      journal: 'BSAVA',
      year: 2020,
      pages: 'pp. 98-99, 227-228, 244-245, 266-267, 293, 314-317',
      sourceType: 'Formulário farmacológico (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Formulário farmacológico (acervo local)',
    },
    {
      id: 'ref-macintire-2ed',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Caps. 4, 6 e 7',
      journal: 'Wiley-Blackwell',
      year: 2012,
      pages: 'pp. 30, 63, 85+',
      sourceType: 'Livro-texto de emergência (acervo local)',
    },
    {
      id: 'ref-delahunta-5ed',
      authors: 'de Lahunta A, Glass E, Kent M',
      title: "de Lahunta's Veterinary Neuroanatomy and Clinical Neurology (5th Edition)",
      journal: 'Elsevier',
      year: 2021,
      sourceType: 'Livro-texto de neurologia (acervo local)',
    },
    {
      id: 'ref-ettinger-9ed',
      authors: 'Côté E, Ettinger SJ, Feldman EC (eds.)',
      title: "Ettinger's Textbook of Veterinary Internal Medicine (9th Edition) — Caps. 22, 41, 176 e 204 (Canine Distemper)",
      journal: 'Elsevier',
      year: 2024,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-dewey-neuro-3ed',
      authors: 'Dewey CW, da Costa RC (eds.)',
      title: 'Practical Guide to Canine and Feline Neurology (3rd Edition) — Caps. 4, 5 e 6 (Neurodiagnostics & MRI)',
      journal: 'Wiley-Blackwell',
      year: 2016,
      sourceType: 'Livro-texto de neurologia (acervo local)',
    },
    {
      id: 'ref-cytologic-diagnosis-2ed',
      authors: 'Barger AM, MacNeill AL (eds.)',
      title: 'Small Animal Cytologic Diagnosis: Canine and Feline Disease (2nd Edition) — Caps. 14 e 17',
      journal: 'CRC Press / Taylor & Francis',
      year: 2023,
      sourceType: 'Livro-texto de citopatologia (acervo local)',
    },
    {
      id: 'ref-cdc-phil-12786',
      authors: 'Mahy BWJ; Centers for Disease Control and Prevention (CDC)',
      title: 'Canine distemper: clinical manifestation in a dog (Public Health Image Library, image 12786)',
      journal: 'CDC Public Health Image Library',
      url: 'https://phil.cdc.gov/Details.aspx?pid=12786',
      sourceType: 'Fotografia clínica em domínio público (Fig. 5)',
    },
    {
      id: 'ref-wheeler-2017',
      authors: 'Wheeler L',
      title: "Canine Distemper Virus Cytoplasmic Inclusion Body (Blood smear, Wright's stain)",
      journal: 'Wikimedia Commons',
      year: 2017,
      url: 'https://commons.wikimedia.org/wiki/File:Canine_Distemper_Virus_Cytoplasmic_Inclusion_Body_(Blood_smear,_Wright%27s_stain).jpg',
      sourceType: 'Fotografia citopatológica CC BY 4.0 (Fig. 7)',
    },
    {
      id: 'ref-dosenberry-2025',
      authors: 'Dosenberry C, et al.',
      title: 'An update on oral manifestations of systemic disorders in dogs and cats (Fig. 6 A–G: canine distemper dental sequelae)',
      journal: 'Frontiers in Veterinary Science',
      year: 2025,
      volume: '11',
      pages: '1511971',
      doi: '10.3389/fvets.2024.1511971',
      url: 'https://doi.org/10.3389/fvets.2024.1511971',
      sourceType: 'Artigo Open Access CC BY 4.0 e acervo visual (Fig. 6)',
    },
    {
      id: 'ref-van-de-bildt-2002',
      authors: 'van de Bildt MWG, Kuiken T, Visee AM, Lema S, Fitzjohn TR, Osterhaus ADME',
      title: 'Distemper outbreak and its effect on African wild dog conservation (Lycaon pictus pulmonary pathology)',
      journal: 'Emerging Infectious Diseases',
      year: 2002,
      volume: '8',
      issue: '2',
      pages: '211-213',
      doi: '10.3201/eid0802.010314',
      url: 'https://doi.org/10.3201/eid0802.010314',
      sourceType: 'Artigo CDC em domínio público e acervo visual (Fig. 2)',
    },
    {
      id: 'ref-koutinas-2004',
      authors: 'Koutinas AF, Baumgärtner W, Tontis D, Polizopoulou Z, Saridomichelakis MN, Lekkas S',
      title: 'Histopathology and immunohistochemistry of canine distemper virus-induced footpad hyperkeratosis (hard pad disease) in dogs with natural canine distemper',
      journal: 'Veterinary Pathology',
      year: 2004,
      volume: '41',
      issue: '1',
      pages: '2-9',
      pmid: '14715962',
      doi: '10.1354/vp.41-1-2',
      url: 'https://doi.org/10.1354/vp.41-1-2',
      sourceType: 'Artigo científico / referência externa visual (Hard Pad)',
      notes: 'Figura 1 ilustra hiperqueratose plantar em infecção natural confirmada; conferência de autorização editorial requerida antes de reprodução direta.',
    },
    {
      id: 'ref-dierenkliniek-tiel',
      authors: 'Dierenkliniek Tiel',
      title: 'Hondenziekte (Canine Distemper Virus, ziekte van Carré) — Fotografia clínica de hiperqueratose plantar',
      journal: 'Dierenkliniek Tiel (Países Baixos)',
      url: 'https://www.dierenkliniektiel.nl/',
      sourceType: 'Referência visual externa (licença não confirmada)',
      notes: 'Documentação fotográfica complementar de hiperqueratose plantar.',
    },
    {
      id: 'ref-clinicians-brief-mri',
      authors: "Clinician's Brief",
      title: 'Distemper Causing Seizures in a Puppy — Brain MRI case (T2/FLAIR thalamic hyperintensity without contrast enhancement)',
      journal: "Clinician's Brief",
      url: 'https://www.cliniciansbrief.com/',
      sourceType: 'Referência externa de neuroimagem (copyright editorial)',
      notes: 'Material protegido por direito autoral editorial; consultado apenas como referência externa de aprendizagem.',
    },
    {
      id: 'ref-ophthalmic-medallion',
      authors: 'Maggs DJ, Miller PE, Ofri R (Slatter / Systemic Diseases with Ophthalmic Manifestations)',
      title: 'Systemic Diseases with Ophthalmic Manifestations — Fig. 18.4 (Canine distemper chorioretinitis and healed medallion lesions)',
      journal: 'Elsevier Veterinary Ophthalmology',
      sourceType: 'Referência externa oftálmica (copyright editorial)',
      notes: 'Figura de capítulo protegido por direito autoral; descrita em prosa clínica sem reprodução direta.',
    },
    {
      id: 'ref-bsava-neuro-video-1417',
      authors: 'Lowrie M, Garosi L, Platt SR',
      title: 'Movement disorders (Video 14.17 — Canine distemper pelvic limb paresis and rhythmic myoclonus). BSAVA Manual of Canine and Feline Neurology',
      journal: 'BSAVA Library',
      url: 'https://www.bsavalibrary.com/',
      sourceType: 'Referência externa em vídeo clínico (acesso controlado BSAVA)',
      notes: 'Vídeo protegido pela BSAVA Library; indicado apenas como referência clínica externa.',
    },
    {
      id: 'ref-wsava-2024',
      authors: 'Squires RA, et al. (WSAVA Vaccination Guidelines Group)',
      title: '2024 guidelines for the vaccination of dogs and cats',
      journal: 'Journal of Small Animal Practice',
      year: 2024,
      doi: '10.1111/jsap.13718',
      url: 'https://doi.org/10.1111/jsap.13718',
      sourceType: 'Diretriz internacional',
      evidenceLevel: 'Consenso global',
    },
    {
      id: 'ref-acvim-status-2024',
      authors: 'Charalambous M, et al.',
      title: 'ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2024,
      volume: '38',
      pages: '19-40',
      doi: '10.1111/jvim.16928',
      url: 'https://doi.org/10.1111/jvim.16928',
      sourceType: 'Consenso ACVIM',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-aaha-vax-2022',
      authors: 'AAHA',
      title: '2022 AAHA Canine Vaccination Guidelines — Canine Distemper Virus (CDV)',
      journal: 'American Animal Hospital Association',
      year: 2022,
      url: 'https://www.aaha.org/resources/2022-aaha-canine-vaccination-guidelines/canine-distemper-virus-cdv/',
      sourceType: 'Diretriz clínica',
    },
    {
      id: 'ref-aaha-fluid-2024',
      authors: 'AAHA',
      title: '2024 AAHA Fluid Therapy Guidelines for Dogs and Cats',
      journal: 'American Animal Hospital Association',
      year: 2024,
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/',
      sourceType: 'Diretriz clínica',
    },
    {
      id: 'ref-verdes-2024',
      authors: 'Verdes JM, et al.',
      title: 'Pathological Study of Demyelination with Cellular Reactions in the Cerebellum of Dogs Infected with Canine Distemper Virus',
      journal: 'Viruses',
      year: 2024,
      volume: '16',
      issue: '11',
      pages: '1719',
      doi: '10.3390/v16111719',
      url: 'https://doi.org/10.3390/v16111719',
      sourceType: 'Estudo anatomopatológico e acervo visual (Fig. 3)',
    },
    {
      id: 'ref-iribarnegaray-2024',
      authors: 'Iribarnegaray V, et al.',
      title: 'Droplet Digital PCR Enhances Sensitivity of Canine Distemper Virus Detection',
      journal: 'Viruses',
      year: 2024,
      volume: '16',
      issue: '11',
      pages: '1720',
      doi: '10.3390/v16111720',
      url: 'https://doi.org/10.3390/v16111720',
      sourceType: 'Estudo diagnóstico comparativo e acervo visual (Fig. 8)',
    },
    {
      id: 'ref-nuhoglu-2026',
      authors: 'Nuhoğlu H, Beytut E',
      title: 'Immunohistochemical, Immunofluorescent, and Molecular Investigation of Canine Distemper Virus, Nectin 4, and CD150 Receptors in Naturally Infected Dogs with Canine Distemper Virus',
      journal: 'Animals',
      year: 2026,
      volume: '16',
      issue: '14',
      pages: '2233',
      doi: '10.3390/ani16142233',
      url: 'https://doi.org/10.3390/ani16142233',
      sourceType: 'Estudo celular/molecular e acervo visual (Figs. 1 e 4)',
    },
    {
      id: 'ref-kapar-2026',
      authors: 'Kapar A, Ok M, Avcı İ',
      title: 'Serum brain injury biomarkers (NSE, GFAP, CK-BB) and hematologic profiles in dogs with neurological canine distemper',
      journal: 'Veterinary Medicine and Science',
      year: 2026,
      doi: '10.1002/vms3.70894',
      url: 'https://doi.org/10.1002/vms3.70894',
      sourceType: 'Estudo clínico observacional',
    },
    {
      id: 'ref-sarchahi-2025',
      authors: 'Sarchahi AA, Arbabi M, Mohebalian H',
      title: 'Evaluation of phenobarbital and prednisolone in dogs with neurological manifestations of canine distemper',
      journal: 'Veterinary Medicine and Science',
      year: 2025,
      doi: '10.1002/vms3.70479',
      url: 'https://doi.org/10.1002/vms3.70479',
      sourceType: 'Série clínica terapêutica',
    },
    {
      id: 'ref-oliver-guimera-2025',
      authors: 'Oliver-Guimera A, Murphy BG, Keel MK',
      title: 'In vitro antiviral activity of GS-441524 against canine distemper virus strains',
      journal: 'Viruses',
      year: 2025,
      volume: '17',
      issue: '2',
      pages: '150',
      doi: '10.3390/v17020150',
      url: 'https://doi.org/10.3390/v17020150',
      sourceType: 'Estudo experimental in vitro',
    },
    {
      id: 'ref-liu-2016',
      authors: 'Liu PC, et al.',
      title: 'Randomized clinical trial of heterologous anti-CDV antibodies in naturally infected puppies with severe respiratory distemper',
      journal: 'Journal of Small Animal Practice',
      year: 2016,
      doi: '10.1111/jsap.12557',
      url: 'https://doi.org/10.1111/jsap.12557',
      sourceType: 'Ensaio clínico randomizado',
    },
    {
      id: 'ref-menezes-2023',
      authors: 'Menezes PR, et al.',
      title: 'Epizootiology of canine distemper in naturally infected dogs in Goiânia, Brazil',
      journal: 'Ciência Rural',
      year: 2023,
      doi: '10.1590/0103-8478cr20220166',
      url: 'https://doi.org/10.1590/0103-8478cr20220166',
      sourceType: 'Estudo epidemiológico brasileiro',
    },
    {
      id: 'ref-ufg-neuro-2025',
      authors: 'Serviço de Neurologia e Neurocirurgia Veterinária — UFG',
      title: 'Retrospective cohort of neurological canine distemper among 360 dogs with central nervous system disorders',
      journal: 'PubMed / UFG',
      year: 2025,
      sourceType: 'Estudo retrospectivo brasileiro',
    },
    {
      id: 'ref-charalambous-2019',
      authors: 'Charalambous M, et al.',
      title: 'Intranasal midazolam versus intravenous diazepam/midazolam for the management of canine status epilepticus: a multicenter randomized trial',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2019,
      doi: '10.1111/jvim.15627',
      url: 'https://doi.org/10.1111/jvim.15627',
      sourceType: 'Ensaio clínico randomizado multicêntrico',
    },
    {
      id: 'ref-cornell-cdv',
      authors: 'Cornell University — Riney Canine Health Center',
      title: 'Canine Distemper Virus: transmission, shedding and vaccination guidance',
      journal: 'Cornell University College of Veterinary Medicine',
      year: 2024,
      url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/canine-distemper-virus',
      sourceType: 'Fonte institucional',
    },
    {
      id: 'ref-msd-cdv',
      authors: 'MSD Veterinary Manual',
      title: 'Canine Distemper — Overview, Clinical Findings, Diagnosis and Treatment',
      journal: 'Merck & Co.',
      year: 2024,
      url: 'https://www.msdvetmanual.com/infectious-diseases/canine-distemper/canine-distemper',
      sourceType: 'Fonte institucional',
    },
    {
      id: 'ref-aspca-cdv',
      authors: 'ASPCApro',
      title: 'Canine Distemper Virus — Shelter Outbreak Management and Quarantine Release',
      journal: 'ASPCA',
      year: 2024,
      url: 'https://www.aspcapro.org/topics-shelter-medicine-common-diseases/canine-distemper-virus',
      sourceType: 'Fonte institucional',
    },
  ],
};
