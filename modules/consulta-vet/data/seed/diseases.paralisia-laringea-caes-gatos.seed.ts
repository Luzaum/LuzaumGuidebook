import { DiseaseRecord } from '../../types/disease';

export const paralisiaLaringeaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-paralisia-laringea-caes-gatos',
  slug: 'paralisia-laringea-caes-gatos',
  title: 'Paralisia Laríngea em Cães e Gatos (GOLPP / LPPN)',
  subtitle:
    'Neuropatia Axonal, Movimento Paradoxal, Emergência Asfíxica e Lateralização da Aritenoide',
  synonyms: [
    'Paralisia de laringe',
    'GOLPP canino',
    'Geriatric-Onset Laryngeal Paralysis Polyneuropathy',
    'LPPN juvenil',
    'Laryngeal paralysis in dogs and cats',
    'Disfunção do CAD',
    'Obstrução laríngea neuromuscular',
    'Paralisia laríngea felina',
    'Paralisia de pregas vocais canina',
    'Atonia laríngea adquirida',
  ],
  species: ['dog', 'cat'],
  category: 'pneumologia',
  categories: [
    'pneumologia',
    'neurologia',
    'urgencia-emergencia',
    'cirurgia',
    'clinica-medica',
  ],
  tags: [
    'Paralisia Laríngea',
    'GOLPP',
    'LPPN',
    'CAD',
    'Nervo Laríngeo Recorrente',
    'Stridor Inspiratório',
    'Movimento Paradoxal',
    'Tie-back UAL',
    'Pneumonia Aspirativa',
    'Stanley 2010',
    'Wilson & Monnet 2016',
    'Rishniw 2021',
    'Natsume 2025',
    'Forni 2026',
    'AAHA Senior Care 2023',
    'Nelson & Couto',
  ],
  isPublished: true,

  quickSummary:
    'A paralisia laríngea é uma falha neuromuscular primária ou secundária na capacidade de promover a abdução simétrica das cartilagens aritenoides durante a fase inspiratória da respiração. O m. cricoarytenoideus dorsalis (CAD), inervado pelo nervo laríngeo recorrente (RLN, ramo do nervo vago/NC X), é o único abdutor das aritenoides; na sua ausência ou falência, nenhum músculo intrínseco substitui sua função, resultando em estreitamento grave da rima glottidis, aumento dramático da resistência ao fluxo de ar e estridor inspiratório de alta frequência. Em cães idosos (especialmente Labradores e Golden Retrievers com idade superior a 9 anos), a doença não é uma anomalia isolada da laringe, mas sim a manifestação clínica precoce de uma polineuropatia axonal sistêmica progressiva dependente do comprimento axonal (GOLPP - Geriatric-Onset Laryngeal Paralysis Polyneuropathy), com comprometimento subsequente da inervação faringoesofágica e dos membros pélvicos (nervo ciático). No estudo seminal de Stanley et al. (2010), 100% dos cães com paralisia laríngea acompanhados demonstraram disfunção esofágica progressiva em 1 ano. Em gatos, a enfermidade é muito mais rara, sendo as apresentações unilaterais (com predileção esquerda) clinicamente sintomáticas e frequentemente associadas a causas secundárias (neoplasias cervicais/mediastinais, trauma e neuropatias), tendo como sinal histórico a perda do ronronar (loss of purring). O diagnóstico definitivo exige laringoscopia funcional sob plano anestésico leve (com propofol mantendo ventilação espontânea) sincronizada com a respiração para diferenciar a ausência de abdução ativa do movimento passivo paradoxal expiratório, auxiliada por doxapram se houver depressão respiratória e pela palpação passiva para excluir anquilose cricoaritenoide mecânica. Na emergência com estresse térmico e asfixia, a conduta inicial exige abordagem hands-off, oxigênio sem estresse, sedação cuidadosa (acepromazina com butorfanol), resfriamento ativo (interrompido aos 39,5°C) e dexametasona para atenuar o edema laríngeo secundário, procedendo à intubação orotraqueal se houver exaustão. O tratamento de escolha para doença moderada a grave é a lateralização unilateral da aritenoide (UAL / tie-back), que promove um bypass biomecânico permanente aumentando a rima glottidis; o procedimento deve ser estritamente unilateral para preservar a proteção contra aspiração. A complicação crônica mais temida é a pneumonia aspirativa (incidência cumulativa de 31,8% em 3 a 4 anos em Wilson & Monnet, 2016), sendo a natação terminantemente proibida por toda a vida.',

  quickDecisionStrip: [
    'Paralisia laríngea é falha de abdução inspiratória: o CAD é o único abdutor e sua denervação gera estridor e colapso dinâmico.',
    'Em cão geriátrico, pense em GOLPP: é uma neuropatia sistêmica; a cirurgia desobstrui o ar, mas não interrompe a progressão axonal.',
    'Cuidado na laringoscopia: plano anestésico profundo cria falso diagnóstico de paralisia; sincronize o olhar com o tórax para flagrar movimento paradoxal.',
    'Doxepina não funciona: ensaio clínico randomizado duplo-cego (Rishniw et al., 2021) refutou seu uso no tratamento da paralisia.',
    'Após o tie-back, proibição perpétua de natação: a rima glottidis fica permanentemente aberta e o risco de afogamento e aspiração é fatal.',
  ],

  quickSummaryRich: {
    lead:
      'A paralisia laríngea em cães e gatos é uma afecção neuromuscular obstrutiva caracterizada pela perda da capacidade de abdução ativa das aritenoides durante a inspiração. Em cães idosos, constitui a manifestação inicial do complexo neurodegenerativo GOLPP, exigindo desobstrução cirúrgica por lateralização unilateral (tie-back) e profilaxia vitalícia de pneumonia aspirativa.',
    leadHighlights: [
      'O m. cricoarytenoideus dorsalis (CAD) é o único abdutor; sem ele, a rima glottidis não abre na inspiração.',
      'GOLPP é uma polineuropatia sistêmica: 100% dos cães desenvolvem disfunção motora ou esofágica progressiva em 1 ano.',
      'O movimento paradoxal (abertura passiva na expiração) é a armadilha mais perigosa na laringoscopia superficial.',
      'A natação deve ser permanentemente proibida após a lateralização cirúrgica devido ao risco fatal de aspiração maciça.',
    ],
    pillars: [
      {
        title: 'Mecânica Ventilatória e o Papel Exclusivo do CAD',
        body:
          'A laringe depende do m. cricoarytenoideus dorsalis (CAD), inervado pelo nervo laríngeo recorrente, para afastar as cartilagens aritenoides a cada incursão inspiratória. Quando desnervado, a rima glottidis permanece estreita, o fluxo aéreo torna-se intensamente turbulento (gerando estridor de alta frequência) e a pressão negativa intralaríngea puxa os tecidos flácidos para o centro, instalando um ciclo asfixiante de edema e colapso tecidual.',
      },
      {
        title: 'O Complexo GOLPP e a Axonopatia Distal',
        body:
          'O termo paralisia laríngea idiopática adquirida foi substituído pelo reconhecimento do complexo GOLPP (Geriatric-Onset Laryngeal Paralysis Polyneuropathy). Por ser uma axonopatia dependente de comprimento (length-dependent), os nervos mais longos (laríngeo recorrente, esofágico pararrecorrente e ciático) degeneram primeiro, gerando disfonia e estridor, seguidos por disfagia/megaesôfago e fraqueza progressiva de membros pélvicos.',
      },
      {
        title: 'Laringoscopia sob Plano Leve e Movimento Paradoxal',
        body:
          'O exame definitivo requer visualização direta da glote sob plano anestésico superficial com propofol, mantendo incursões espontâneas. A armadilha clínica número um é o movimento paradoxal: a pressão positiva da expiração empurra as aritenoides passivamente para fora, simulando abdução. Um auxiliar deve sincronizar em voz alta as fases do tórax (inspira / expira) durante o exame.',
      },
      {
        title: 'Tratamento Cirúrgico: Lateralização Unilateral (Tie-Back)',
        body:
          'A intervenção cirúrgica de escolha é a lateralização unilateral da aritenoide (UAL / tie-back), fixando uma aritenoide em abdução permanente. O procedimento deve ser rigorosamente unilateral para manter a menor abertura compatível com a ventilação e preservar proteção contra broncoaspiração, uma vez que a pneumonia aspirativa atinge até 31,8% dos pacientes a longo prazo.',
      },
    ],

    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial da Paralisia Laríngea',
      steps: [
        {
          label: 'Passo 1 — Triagem e Caracterização Acústica do Estridor',
          detail:
            'Identificar som agudo e ruidoso predominantemente inspiratório (estridor de via aérea superior), diferenciando de estertor nasofaríngeo de baixa frequência (ronco). Investigar histórico de mudança vocal (disfonia no cão ou perda do ronronar no gato) e intolerância ao calor.',
          timing: 'Atendimento inicial (minutos 0 a 10)',
          limitations: 'Animais em repouso podem apresentar estridor muito discreto que se exacerba dramaticamente apenas com estresse ou calor.',
        },
        {
          label: 'Passo 2 — Exame Físico e Neurológico Completo de Neurônio Motor',
          detail:
            'Avaliar força, postura e propriocepção dos membros pélvicos (pesquisa de knuckling, atrofia muscular e reflexos espinhais). Avaliar pares cranianos e investigar sinais concomitantes de GOLPP ou Miastenia Gravis.',
          timing: 'Primeiros 30 minutos',
          limitations: 'Em pacientes dispneicos graves ou hipertermicos, o exame deve ser adiado até a estabilização para evitar colapso asfíxico.',
        },
        {
          label: 'Passo 3 — Estudo Radiográfico Torácico e Cervical (3 Projeções)',
          detail:
            'Realizar projeções torácicas laterais direita/esquerda e ventrodorsal para afastar pneumonia aspirativa ativa, megaesôfago e massas mediastinais. Avaliar distensão traqueal patológica conforme os índices de Natsume et al. (2025) (CD:3R >= 2,3 e TT:3R >= 1,9).',
          timing: 'Primeiras 2 horas (após estabilização)',
          limitations: 'Radiografia simples não avalia a movimentação dinâmica da cartilagem e não confirma nem exclui paralisia funcional.',
        },
        {
          label: 'Passo 4 — Laringoscopia Funcional sob Plano Anestésico Leve',
          detail:
            'Indução cuidadosa com propofol titulado até abertura oral mantendo respiração espontânea. Um assistente observa a parede torácica e vocaliza as fases (inspira/expira) para documentar ausência de abdução ativa inspiratória e movimento paradoxal expiratório.',
          timing: 'Sob agendamento eletivo ou pós-resfriamento de emergência',
          limitations: 'Anestesia excessivamente profunda deprime o centro respiratório e imobiliza aritenoides normais gerando falso diagnóstico.',
        },
        {
          label: 'Passo 5 — Teste de Mobilidade Passiva e Avaliação Etiológica Adicional',
          detail:
            'Com uma sonda romba, deslocar delicadamente as aritenoides sob anestesia para confirmar mobilidade articular livre e excluir anquilose cricoaritenoide. Se houver megaesôfago ou fraqueza sistêmica atípica, colher sorologia para AChR-Ab (Miastenia) e dosagem de T4 livre/TSH.',
          timing: 'Imediatamente após a laringoscopia funcional',
          limitations: 'A anquilose cricoaritenoide contraindica o tie-back habitual e exige abordagem cirúrgica modificada.',
        },
      ],
    },

    treatmentFlow: {
      title: 'Fluxograma de Manejo Emergencial e Cirúrgico da Paralisia Laríngea',
      steps: [
        {
          label: 'Passo 1 — Estabilização Imediata Hands-Off e Oxigenoterapia Suave',
          detail:
            'Acomodar o paciente em ambiente fresco e silencioso, evitando contenção forçada ou procedimentos estressantes. Fornecer oxigênio em fluxo livre, tenda ou máscara aberta. Lembrar que oxigênio suplementar não atravessa uma rima glottidis completamente ocluída.',
          duration: 'Minutos 0 a 15 da admissão',
          reassess: 'A cada 5 minutos pelo padrão ventilatório e oximetria',
          limitations: 'Manipulação excessiva em cães estressados pode desencadear laringoespasmo e parada cardiorrespiratória imediata.',
        },
        {
          label: 'Passo 2 — Sedação Criteriosa para Interrupção do Ciclo Asfíxico',
          detail:
            'Administrar butorfanol associado à acepromazina em doses baixas para diminuir o pânico, a frequência respiratória e a pressão negativa que colapsa a glote. Em felinos, priorizar butorfanol com ou sem alfaxalona intramuscular.',
          dose: 'Butorfanol 0,2 a 0,4 mg/kg IV/IM associado a Acepromazina 0,02 a 0,05 mg/kg IV/IM (titular cautelosamente se hipotensão)',
          duration: 'Dose única de resgate',
          reassess: 'Em 10 a 15 minutos avaliando aprofundamento respiratório',
          limitations: 'Contraindicado em doses altas se houver hipotensão severa, choque distributivo ou hipoventilação avançada.',
        },
        {
          label: 'Passo 3 — Resfriamento Ativo e Corticoide de Curta Duração',
          detail:
            'Se a temperatura retal ultrapassar 40,5°C por incapacidade de ofego, instituir resfriamento com toalhas úmidas e ventilador, interrompendo rigorosamente aos 39,5°C para prevenir hipotermia de rebote. Administrar dexametasona IV para reduzir o edema secundário da mucosa laríngea.',
          dose: 'Dexametasona fosfato sódico 0,1 a 0,5 mg/kg IV em bolus único',
          duration: 'Resfriamento por 15 a 30 minutos; corticoide dose única',
          reassess: 'Monitorar temperatura retal a cada 5 a 10 minutos',
          limitations: 'Corticoide trata o edema mucoso secundário, mas não recupera a inervação do CAD nem reverte a axonopatia de base.',
        },
        {
          label: 'Passo 4 — Intubação Orotraqueal de Emergência ou Traqueostomia',
          detail:
            'Se houver exaustão muscular respiratória, cianose persistente, hipercapnia progressiva ou colapso irreversível, induzir anestesia geral com propofol e intubar com tubo orotraqueal balonado com cuff. Se o acesso orotraqueal for impossível por massa ou edema, realizar traqueostomia temporária.',
          duration: 'Até estabilização hemodinâmica e resolução da crise',
          reassess: 'Gasometria arterial/venosa seriada e ventilação mecânica se necessário',
          limitations: 'A extubação só deve ser tentada após reversão completa do edema e estabilização de temperatura.',
        },
        {
          label: 'Passo 5 — Lateralização Unilateral da Aritenoide (UAL / Tie-Back)',
          detail:
            'Indicar cirurgia de UAL (cricoaritenoide ou tireoaritenoide unilateral esquerda) em pacientes com comprometimento clínico moderado a severo. O procedimento ancora a aritenoide em posição parcialmente aberta, criando um conduto aéreo permanente.',
          duration: 'Procedimento cirúrgico definitivo de resgate',
          reassess: 'Avaliação pós-operatória de fonese, tosse e monitoramento radiográfico de pneumonia aspirativa',
          limitations: 'A abertura permanente da glote gera risco vitalício de broncoaspiração (pneumonia aspirativa em ~32% dos cães em 3 anos).',
        },
      ],
    },
  },

  plainLanguage: {
    whatIsIt:
      'A paralisia laríngea é uma doença na qual a laringe (a "caixa de voz" e entrada da respiração na garganta) perde a capacidade de abrir quando o animal respira fundo. Em condições normais, toda vez que o cão ou gato inspira, músculos especiais puxam as cartilagens da garganta para os lados, abrindo bem o canal para o ar passar facilmente até os pulmões. Na paralisia, o nervo que comanda esses músculos sofre uma falha, e as cartilagens ficam caídas e moles no meio do caminho. Com isso, o espaço para o ar entrar fica muito apertado, provocando um barulho alto e agudo de falta de ar (chamado de estridor), cansaço rápido e sensação constante de sufocamento. Em cães idosos (especialmente Labradores e Golden Retrievers com mais de 9 anos), isso raramente é um problema isolado na garganta: na grande maioria das vezes, faz parte de uma síndrome chamada GOLPP, que é um envelhecimento e desgaste progressivo dos nervos mais compridos do corpo, fazendo com que o cão também sinta fraqueza nas pernas traseiras e dificuldade para engolir alimentos com o passar dos meses. Em gatos a doença é bem mais rara e costuma provocar uma mudança marcante: o gato para de miar direito ou perde totalmente a capacidade de ronronar.',
    keyPoints: [
      'O barulho agudo ao respirar é o sinal de alerta: o som de "apito" ou chiado alto quando o animal puxa o ar (estridor) indica que a garganta está muito fechada e exige avaliação veterinária.',
      'Perigo extremo em dias quentes e com agitação: cães não suam pelo corpo e precisam ofegar com a boca aberta para perder calor. Com a laringe fechada, o cão não consegue se resfriar, entra em pânico e desenvolve intermação (febre altíssima por calor) que pode ser fatal em minutos.',
      'Não é apenas velhice ou artrite: muitos tutores acham que o cão está apenas "ficando velho e cansado", mas o desânimo e a fraqueza muitas vezes decorrem da falta de oxigênio crônica e da neuropatia GOLPP.',
      'Gatos perdem o ronronar: em gatos com paralisia laríngea, a perda do som característico de ronronar (purr) associada a miado rouco é um dos sinais mais clássicos da doença.',
      'Exame sob sedação leve para confirmar: o diagnóstico definitivo é feito olhando a garganta com uma câmera ou laringoscópio enquanto o animal respira sozinho sob uma anestesia bem leve.',
      'A cirurgia de Tie-Back salva vidas: a cirurgia de lateralização da aritenoide coloca um ponto cirúrgico para manter um dos lados da garganta sempre aberto, permitindo que o ar volte a entrar livremente.',
      'NUNCA mais deixe o animal nadar: após a cirurgia, como a garganta não se fecha totalmente, se o animal entrar em piscina, lago ou mar, a água entra direto nos pulmões e ele pode se afogar rapidamente.',
      'Cuidado com a pneumonia por aspiração: com a garganta aberta, pequenos pedaços de comida ou líquidos podem escapar para o pulmão. Se o pet começar a tossir após comer, ficar prostrado ou tiver febre, procure o veterinário imediatamente.',
    ],
    whatIs:
      'A paralisia laríngea é uma falha neuromuscular na qual as cartilagens da laringe não abrem durante a respiração, estreitando a entrada de ar e provocando estridor agudo, cansaço fácil, risco de asfixia no calor e predisposição a pneumonias.',
    warningSigns:
      'Respiração ruidosa com som de apito ou chiado alto ao puxar o ar, mudança no tom do latido (voz rouca) ou perda do ronronar no gato, cansaço desproporcional em passeios curtos, engasgos com água, língua azulada ou arroxeada (cianose) no calor e fraqueza para levantar as patas traseiras.',
    diagnosis:
      'A confirmação exige laringoscopia direta sob anestesia leve mantendo a respiração espontânea, sincronizando o olhar com o tórax para flagrar a ausência de abertura das cartilagens, associada a radiografias do pescoço e tórax para investigar pneumonia aspirativa e megaesôfago.',
    homeCare:
      'Evitar passeios em horários quentes e locais úmidos, manter o ambiente sempre fresco com ar-condicionado ou ventilador, trocar definitivamente a coleira de pescoço por peitoral ergonômico, oferecer ração em formato de almôndegas úmidas, proibir terminantemente o pet de nadar ou entrar em piscinas e vigiar qualquer sinal de tosse ou cansaço respiratório.',
  },

  figures: [
    {
      id: 'fig-paralisia-laringea-1',
      title: 'Anatomia Laríngea e Fisiopatologia da Abdução Glótica',
      legend:
        'Diferenciação biomecânica da rima glottidis:\n' +
        '- Dinâmica normal (à esquerda): ativação do nervo laríngeo recorrente contrai o m. cricoarytenoideus dorsalis (CAD), único abdutor intrínseco, promovendo a abertura ampla da rima glottidis a cada inspiração.\n' +
        '- Paralisia laríngea (à direita): a denervação do CAD impede a abdução ativa; a pressão intraluminal negativa gerada pelo esforço inspiratório suga as aritenoides medialmente (colapso inspiratório), gerando turbulência, estridor agudo e o característico movimento paradoxal expiratório.',
      url: '/consulta-vet/paralisia-laringea-caes-gatos/fisiopatologia-laringea-abducao-normal-vs-paradoxal-cad.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-paralisia-laringea-2',
      title: 'O Complexo GOLPP: Polineuropatia Progressiva Geriátrica',
      legend:
        'Progressão temporal e multissistêmica do complexo GOLPP (Geriatric-Onset Laryngeal Paralysis Polyneuropathy):\n' +
        '- Fase 1 (laringe): padrão de axonopatia dependente de comprimento (length-dependent) acomete precocemente o nervo laríngeo recorrente, gerando disfonia e estridor inspiratório.\n' +
        '- Fase 2 (esôfago): evolui para os ramos pararrecurrentes faringoesofágicos com dismotilidade e retenção (risco elevado de pneumonia aspirativa conforme Stanley et al., 2010).\n' +
        '- Fase 3 (membros pélvicos): culmina com o comprometimento do nervo ciático, resultando em paraparesia flácida e déficits proprioceptivos de membros pélvicos.',
      url: '/consulta-vet/paralisia-laringea-caes-gatos/golpp-polineuropatia-progressao-e-mecanismo-axonopatia.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-paralisia-laringea-3',
      title: 'Algoritmo Diagnóstico e Padrão-Ouro Laringoscópico',
      legend:
        'Fluxograma diagnóstico estruturado da paralisia laríngea:\n' +
        '- Triagem semiológica: caracterização do estridor inspiratório e diferenciação de estertor.\n' +
        '- Laringoscopia funcional padrão-ouro: plano anestésico superficial com propofol mantendo respiração espontânea (Pan et al., 2022).\n' +
        '- Sincronização obrigatória das fases ventilatórias com auxílio verbal e uso criterioso de doxapram.\n' +
        '- Teste de palpação passiva: afastar anquilose cricoaritenoide mecânica.\n' +
        '- Radiografia torácica e índices traqueais de Natsume et al. (2025): CD:3R >= 2,3 e TT:3R >= 1,9.',
      url: '/consulta-vet/paralisia-laringea-caes-gatos/algoritmo-diagnostico-laringoscopia-leve-indices-traqueais.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'fig-paralisia-laringea-4',
      title: 'Emergência e Tratamento Cirúrgico: Tie-Back e Conduta',
      legend:
        'Manejo integrado da crise obstrutiva e pós-operatório:\n' +
        '- Resgate emergencial: abordagem hands-off, oxigênio suave, resfriamento ativo interrompido aos 39,5°C, sedação com butorfanol/acepromazina e corticoterapia.\n' +
        '- Biomecânica cirúrgica: lateralização unilateral da aritenoide (UAL / tie-back) proporcionando a menor abertura suficiente para abolir a resistência inspiratória.\n' +
        '- Justificativa unilateral: reduz a incidência de pneumonia aspirativa (Wilson & Monnet, 2016) comparada a procedimentos bilaterais.\n' +
        '- Regra vital pós-operatória: proibição vitalícia e inegociável de natação.',
      url: '/consulta-vet/paralisia-laringea-caes-gatos/emergencia-e-manejo-cirurgico-tie-back-ual-pos-operatorio.jpg',
      aspectRatio: '3:2',
    },
  ],

  etiology: {
    conceitoNeurodegenerativoGOLPP:
      'Conceito contemporâneo e natureza do complexo GOLPP:\n' +
      'A paralisia laríngea adquirida em cães idosos deixou de ser considerada uma afecção isolada da via aérea superior para ser reconhecida como um componente cardinal do complexo GOLPP (Geriatric-Onset Laryngeal Paralysis Polyneuropathy).\n\n' +
      'Mecanismos neurobiológicos fundamentais:\n' +
      '- Doença neurodegenerativa lentamente progressiva: acomete cães geriátricos de raças grandes e gigantes, caracterizada por degeneração axonal e perda seletiva de fibras mielinizadas de grande calibre.\n' +
      '- Axonopatia distal dependente de comprimento (length-dependent axonopathy): axônios com trajetos anatômicos muito extensos apresentam falência de transporte axonal e desmielinização retrógrada (dying-back neuropathy).\n' +
      '- Ordem de acometimento cronológico: os nervos laríngeos recorrentes, os ramos pararrecurrentes do esôfago e os ramos distais do nervo ciático são invariavelmente os primeiros a manifestar falência clínica.',

    anatomiaCartilaginosaECAD:
      'Anatomia cirúrgica da laringe e papel exclusivo do CAD:\n' +
      '- Arcabouço cartilaginoso: formado pela epiglote, cartilagem tireoide, cartilagem cricoide e pelas cartilagens aritenoides pareadas (com processos cuneiforme, corniculado, muscular e vocal).\n' +
      '- Músculo cricoarytenoideus dorsalis (CAD):\n' +
      '  - É o único e exclusivo abdutor intrínseco das cartilagens aritenoides.\n' +
      '  - Nenhum outro músculo substitui sua função de abrir a rima glottidis na inspiração.\n' +
      '- Musculatura adutora redundante:\n' +
      '  - Múltiplos grupos musculares promovem adução protetora da glote (m. cricoarytenoideus lateralis, m. arytenoideus transversus e m. thyroarytenoideus).\n' +
      '- Consequência biomecânica:\n' +
      '  - A denervação seletiva do CAD condena as aritenoides à imobilidade em posição paramediana estreita, causando obstrução inspiratória mecânica grave.',

    inervacaoVagalELaringeoRecorrente:
      'Trajeto anatômico vulnerável do nervo laríngeo recorrente:\n' +
      '- Origem e trajeto motor:\n' +
      '  - A inervação motora somática da musculatura intrínseca deriva do nervo laríngeo caudal, terminação direta do nervo laríngeo recorrente (RLN), ramo do nervo vago (NC X) originado no núcleo ambíguo do tronco encefálico.\n' +
      '- Assimetria e extensão anatômica:\n' +
      '  - As fibras vagais descem pelo pescoço até a cavidade torácica.\n' +
      '  - No lado esquerdo: o nervo contorna o arco aórtico próximo ao ligamento arterioso e sobe em trajeto retrógrado pelo pescoço junto à traqueia e esôfago até a laringe.\n' +
      '  - No lado direito: contorna a artéria subclávia direita cranialmente.\n' +
      '- Extensão axonal crítica:\n' +
      '  - Axônios de até 80 a 100 cm em cães gigantes geram altíssima vulnerabilidade metabólica ao transporte celular retrógrado/anterógrado e a traumas mecânicos cervicais e torácicos.',

    nervoLaringeoCranialESensibilidade:
      'Inervação sensorial protetora pelo nervo laríngeo cranial:\n' +
      '- Inervação motora e sensorial:\n' +
      '  - Fornece inervação motora exclusiva para o m. cricothyroideus (tensor das pregas vocais).\n' +
      '  - Fornece a principal inervação sensorial da mucosa laríngea cranial e supraglótica.\n' +
      '- Relevância fisiológica dos reflexos protetores:\n' +
      '  - A integridade sensitiva da mucosa é o gatilho indispensável para o reflexo da tosse e para o fechamento reflexo da glote durante a deglutição.\n' +
      '- Impacto no GOLPP:\n' +
      '  - A perda progressiva da sensibilidade mucosal predispõe o paciente à microaspiração laringotraqueal crônica silenciosa mesmo antes de qualquer correção cirúrgica.',

    geneticaLPPNJuvenilVariantes:
      'Variantes genéticas na neuropatia juvenil (LPPN / LPPC):\n' +
      'Em animais jovens, a paralisia laríngea hereditária manifesta-se sob forma congênita precoce ou polineuropatia juvenil associada a mutações específicas:\n' +
      '- Gene RAPGEF6: documentado em Bull Terriers e Miniature Bull Terriers.\n' +
      '- Gene RAB3GAP1: identificado em Black Russian Terriers, Rottweilers e Alaskan Huskies.\n' +
      '- Gene NDRG1: mutação descrita em Greyhounds e Malamutes do Alasca.\n' +
      '- Genes ARHGEF10, GJA9 e CNTNAP1: descritos em Leonbergers e São Bernardos.\n' +
      '- Variante CNTNAP1 p.G937E (Shelton et al., 2025): documentada em homozigose em Dogues Alemães jovens com paralisia laríngea severa e degeneração axonal difusa de neurônio motor inferior.',

    etiologiaFelinaNeoplasiasETrauma:
      'Particularidades etiológicas na espécie felina:\n' +
      'Em gatos, a paralisia laríngea é substancialmente mais rara do que em cães; obras de emergência felina (Feline Emergency and Critical Care Medicine 2e) enfatizam que uma causa secundária deve ser ativamente investigada antes de rotular a afecção como idiopática:\n' +
      '- Neoplasias infiltrativas cervicais ou laríngeas: linfoma, carcinoma de células escamosas, adenocarcinoma e tumores de bainha de nervo do vago.\n' +
      '- Lesões iatrogênicas pós-cirúrgicas: trauma após tireoidectomia (frequente em gatos hipertireoideos) ou manipulação traqueal.\n' +
      '- Trauma penetrante cervical: mordeduras de outros animais e lacerações.\n' +
      '- Laringite inflamatória grave e polineuropatias generalizadas.\n' +
      '- Predileção unilateral esquerda: comum devido à maior extensão anatômica do nervo laríngeo recorrente esquerdo.',

    desmistificandoHipotireoidismoNaLaringe:
      'Desmistificação da correlação com hipotireoidismo:\n' +
      '- Histórico vs evidência atual: no passado, presumia-se que a deficiência hormonal causasse a neuropatia do CAD; diretrizes contemporâneas e revisões do VIN desmistificaram essa causalidade direta.\n' +
      '- Fatores de confusão clínica:\n' +
      '  - Cães idosos de grande porte têm alta prevalência tanto de hipotireoidismo quanto de GOLPP (mera sobreposição etária).\n' +
      '  - Hipoxemia crônica e estresse respiratório induzem a síndrome do eutireoideo doente com queda espúria de T4 total.\n' +
      'MITO TERAPÊUTICO:\n' +
      '- A reposição hormonal com levotiroxina NÃO reverte a paralisia laríngea estabelecida; a dosagem tireoidiana deve ser tratada como comorbidade, sem expectativa de cura ventilatória.',

    miasteniaGravisEToxinasDiferencial:
      'Diagnósticos diferenciais neuromusculares e toxinas:\n' +
      '- Miastenia Gravis adquirida:\n' +
      '  - Autoanticorpos anti-AChR na junção neuromuscular afetam musculatura estriada da laringe e esôfago, mimetizando estridor e disfagia sem tetraparesia óbvia.\n' +
      '- Botulismo (Clostridium botulinum):\n' +
      '  - Bloqueio pré-sináptico da liberação de acetilcolina gerando paralisia flácida difusa.\n' +
      '- Tétano cefálico:\n' +
      '  - Espasmo adutor da laringe e trismo mandibular.\n' +
      '- Toxicidades e outras causas:\n' +
      '  - Intoxicação por organofosforados e carbamatos\n' +
      '  - Saturnismo (intoxicação por chumbo)\n' +
      '  - Paralisia por picada de carrapatos (Ixodes / Dermacentor).',

    tabelaClassificacaoEtiologicaParalisiaLaringea:
      'Classificação etiológica e comparativa da paralisia laríngea em pequenos animais (Tabela 1).',
  },

  epidemiology: {
    predisposicaoCaninaGeriátricaLabrador:
      'Perfil epidemiológico canino e predisposição racial:\n' +
      '- Faixa etária e porte:\n' +
      '  - Acomete predominantemente cães geriátricos com idade superior a 9 ou 10 anos (mediana de 10,5 a 11 anos).\n' +
      '  - Forte predileção por animais de porte grande ou gigante (> 25 a 35 kg).\n' +
      '- Predisposição racial marcante (Labrador Retriever):\n' +
      '  - A raça Labrador Retriever representa 60% a 73% de todos os pacientes diagnosticados em centros mundiais de referência (VIN 2025, Wilson & Monnet 2016, Rishniw et al. 2021).\n' +
      '- Outras raças amplamente acometidas:\n' +
      '  - Golden Retriever, São Bernardo, Terra Nova, Setter Irlandês, Weimaraner, Pastor Alemão, Boxer e Brittany Spaniel.\n' +
      '- Distribuição por sexo:\n' +
      '  - Não há predisposição sexual comprovada, afetando machos e fêmeas com frequência equivalente.',

    epidemiologiaFelinaERaridade:
      'Perfil epidemiológico e particularidades na espécie felina:\n' +
      '- Frequência populacional:\n' +
      '  - Enfermidade considerada incomum a rara na clínica felina de rotina.\n' +
      '- Faixa etária e raças:\n' +
      '  - Apresenta-se tipicamente em gatos adultos a idosos (mediana de 8 a 12 anos), sem predisposição racial estrita (animais sem raça definida de pelo curto e longo predominam).\n' +
      '- Repercussão clínica da paralisia unilateral em gatos:\n' +
      '  - Ao contrário do cão (onde a afecção unilateral costuma ser subclínica), no gato a paralisia unilateral de uma única aritenoide gera estridor e dispneia clinicamente significativos em 10% a 57% das séries publicadas (VIN felino 2025, Taylor et al. 2009, Forni et al. 2026).\n' +
      '  - Predileção consistente pelo lado esquerdo.',

    fatoresDesencadeantesClimaticos:
      'Tríade de gatilhos para descompensação asfíxica aguda:\n' +
      'A descompensação clínica súbita em um paciente crônico e compensado é invariavelmente desencadeada por três fatores precipitantes:\n' +
      '- 1. Hipertermia ambiental e umidade relativa elevada: dias quentes de verão impedem a troca calórica adequada.\n' +
      '- 2. Excitação emocional intensa: visitas, chegada de tutores ou estresse em consultório aumentam a frequência ventilatória.\n' +
      '- 3. Exercício físico ou passeios vigorosos: elevam imediatamente a demanda metabólica por oxigênio.\n\n' +
      'REGRA FISIOPATOLÓGICA:\n' +
      '- Cães com obstrução da via aérea superior são incapazes de realizar troca térmica evaporativa eficaz por polipneia (panting), deflagrando rápida intermação secundária com colapso respiratório.',

    sobrecargaDoTutorECuidadoGeriátrico:
      'Impacto na família tutora e diretrizes geriátricas (AAHA 2023):\n' +
      '- Desgaste emocional e físico da rotina de cuidados:\n' +
      '  - O ruído respiratório contínuo, a ansiedade de asfixia noturna, episódios de tosse pós-prandial e o manejo ambiental rigoroso afetam profundamente a qualidade de vida da família.\n' +
      '- Progressão motora de membros pélvicos:\n' +
      '  - A perda progressiva da capacidade de levantar-se e andar exige assistência física diária por parte dos tutores.\n' +
      '- Recomendações da AAHA Senior Care Guidelines (2023):\n' +
      '  - Reconhecem formalmente o complexo GOLPP e preconizam suporte ativo aos cuidadores, adaptações ambientais domiciliares e acolhimento multidisciplinar para sustentar o bem-estar animal e familiar.',

    tabelaClassificacaoEtiologicaParalisiaLaringea:
      'Classificação etiológica e comparativa da paralisia laríngea em pequenos animais (Tabela 1).',
  },

  pathophysiology: {
    mecanicaRespiratoriaNormalDaGlote:
      'Fisiologia ventilatória normal da rima glottidis:\n' +
      '- Sincronização central:\n' +
      '  - Durante a respiração espontânea, o ciclo ventilatório laríngeo é rigorosamente coordenado pelos centros respiratórios no bulbo e na ponte.\n' +
      '- Ativação pré-inspiratória:\n' +
      '  - Milissegundos antes do início da contração diafragmática, os motoneurônios do núcleo ambíguo disparam pelo nervo laríngeo recorrente, promovendo contração bilateral do CAD.\n' +
      '- Abdução ativa e expansão da glote:\n' +
      '  - As cartilagens aritenoides giram em torno da articulação cricoaritenoide e abduzem lateralmente, expandindo o diâmetro transversal da rima glottidis e reduzindo drasticamente a resistência à entrada do fluxo de ar.\n' +
      '- Fase expiratória:\n' +
      '  - O CAD relaxa e as cartilagens retornam medialmente por recuo elástico tecidual, permitindo fluxo aéreo passivo desobstruído.',

    colapsoInspiratorioEMovimentoParadoxal:
      'Biomecânica do colapso e o movimento paradoxal:\n' +
      '- Estase paramediana das cartilagens:\n' +
      '  - Com a falência e atrofia do CAD, as aritenoides permanecem estáticas em posição paramediana estreita.\n' +
      '- Efeito Bernoulli e sucção intraluminal:\n' +
      '  - O esforço inspiratório cria uma pressão intraluminal fortemente negativa no lúmen laríngeo (equação de Bernoulli).\n' +
      '  - Essa sucção negativa traciona as aritenoides flácidas e as pregas vocais medialmente em direção ao eixo central, fechando ainda mais a rima glottidis.\n' +
      '- Movimento paradoxal expiratório:\n' +
      '  - Durante a expiração, a pressão positiva intralaríngea empurra passivamente as cartilagens para fora.\n\n' +
      'ARMADILHA DIAGNÓSTICA:\n' +
      '- A laringe parece abrir na expiração e fechar na inspiração; esse movimento passivo paradoxal é frequentemente confundido por operadores inexperientes com abdução fisiológica.',

    aerodinamicaPoiseuilleETurbulencia:
      'Aerodinâmica e lei de Poiseuille na via aérea estreitada:\n' +
      '- Impacto exponencial do raio da glote:\n' +
      '  - Pela lei de Poiseuille simplificada (Resistência inversamente proporcional à quarta potência do raio, r^4), uma pequena redução percentual no calibre glótico provoca aumento exponencial na resistência resistiva ao fluxo de ar.\n' +
      '- Transição de fluxo laminar para turbulento:\n' +
      '  - O fluxo aéreo perde o perfil laminar regular e adota padrão altamente turbulento com vórtices de alta velocidade.\n' +
      '  - Esses vórtices vibram as bordas das cartilagens aritenoides inflamadas, gerando o estridor inspiratório característico.\n' +
      '- Sobrecarga muscular compensatória:\n' +
      '  - A turbulência amplifica o trabalho mecânico respiratório, exigindo pressões pleurais inspiratórias ainda mais negativas para vencer o obstáculo anatômico.',

    cicloViciosoAsfixicoEHipertermia:
      'Cascata do ciclo vicioso asfíxico e hipertermia de estresse:\n' +
      '- 1. Esforço inspiratório aumentado gera atrito mecânico e cisalhamento sobre a mucosa aritenoidea.\n' +
      '- 2. Instala-se edema inflamatório local, congestão microvascular e espessamento mucoso intraluminal.\n' +
      '- 3. A rima glottidis estreita-se ainda mais, elevando a resistência ao fluxo aéreo.\n' +
      '- 4. O paciente entra em pânico e ansiedade intensa, deflagrando taquipneia reflexa que aumenta a demanda ventilatória minuto.\n' +
      '- 5. Incapacidade de realizar perda de calor evaporativo via respiração bucal (panting ineficaz).\n' +
      '- 6. A temperatura corporal sobe descontroladamente, ultrapassando 40,5 a 41,5°C.\n' +
      '- 7. A hipertermia sistêmica induz lesão endotelial térmica, acidose lática severa e colapso circulatório.',

    edemaPulmonarPorPressaoNegativaNPPE:
      'Fisiopatologia do edema pulmonar por pressão negativa (NPPE):\n' +
      '- Mecanismo da manobra de Müller involuntária:\n' +
      '  - Ocorre em situações de obstrução alta severa quando o paciente realiza esforços inspiratórios violentos contra uma glote quase totalmente ocluída.\n' +
      '- Geração de pressões intratorácicas extremas:\n' +
      '  - Geram-se pressões pleurais e alveolares excessivamente negativas (podendo ultrapassar -30 a -50 cmH2O).\n' +
      '- Extravasamento capilar hidrostático:\n' +
      '  - A sucção transmural extrema eleva o gradiente hidrostático nos capilares pulmonares, forçando o transudato plasmático para o interstício e alvéolos.\n' +
      '- Rompimento mecânico da barreira alvéolo-capilar:\n' +
      '  - Causa clássica de edema pulmonar agudo não cardiogênico com hipoxemia refratária pós-desobstrução mecânica.',

    fisiopatologiaDaDisfuncaoEsofagicaGOLPP:
      'Comprometimento neuromuscular esofágico no GOLPP:\n' +
      '- Desnervação concomitante do esôfago cranial:\n' +
      '  - A degeneração axonal no GOLPP não se limita aos ramos laríngeos do vago, acometendo também os ramos pararrecurrentes e os axônios que inervam a musculatura estriada esofágica cervical.\n' +
      '- Perda do peristaltismo secundário:\n' +
      '  - Prejuízo na onda peristáltica propulsiva e retardo no esvaziamento esofágico para o estômago.\n' +
      '- Evidência de Stanley et al. (2010):\n' +
      '  - Cães com paralisia laríngea apresentam disfunção no trânsito esofágico em frequência significativamente superior a controles saudáveis, com estase de saliva e alimento na entrada torácica e risco iminente de refluxo e pneumonia aspirativa.',

    tabelaAnatomiaEFisiologiaGlotica:
      'Tabela comparativa — Anatomia e fisiologia do trato laríngeo em cães e gatos (Tabela 2).',
  },

  clinicalSigns: {
    stridorInspiratorioVsStertor:
      'Diferenciação semiológica: estridor vs estertor:\n' +
      '- Estridor inspiratório (Sinal cardeal de paralisia laríngea):\n' +
      '  - Som áspero, estridente e de alta frequência audível tipicamente durante a fase inspiratória.\n' +
      '  - Frequentemente perceptível à distância sem estetoscópio, exacerbando-se com exercício físico, calor ou latidos.\n' +
      '- Estertor (Stertor - Diagnóstico diferencial):\n' +
      '  - Ruído grave, de baixa frequência e roncante, típico de obstruções nasofaríngeas, palato mole redundante alongado ou colapso de faringe.\n' +
      'ATENÇÃO CLÍNICA:\n' +
      '- A presença de estridor agudo indica invariavelmente afecção restritiva a nível laríngeo ou traqueal cervical alto.',

    disfoniaEAlteracaoDoLatido:
      'Disfonia precoce e perda da fonese normal:\n' +
      '- Sintoma inicial frequentemente negligenciado:\n' +
      '  - Rouquidão evidente ou perda da fonese normal (disfonia) constitui um dos sinais mais precoces relatados pelos tutores, precedendo crises asfíxicas em meses ou anos.\n' +
      '- Base neuromuscular:\n' +
      '  - A tensão, aproximação e modulação das pregas vocais dependem da musculatura intrínseca da laringe.\n' +
      '  - Com a denervação, o timbre e o volume do latido alteram-se, tornando-se áspero, abafado ou transformado em sussurro rouco.',

    perdaDoRonronarSinalFelino:
      'Semiologia felina: perda do ronronar e miado alterado:\n' +
      '- Perda do ronronar (Loss of purring, VIN 2025):\n' +
      '  - Na espécie felina, a perda do ronronar é um dos achados históricos mais marcantes da paralisia laríngea.\n' +
      '  - O ronronar normal exige ativação neural oscilatória rítmica da musculatura intrínseca laríngea; com a paralisia, o gato perde a capacidade de sustentação dessa ressonância.\n' +
      '- Outros sinais na espécie felina:\n' +
      '  - Alteração na modulação do miado\n' +
      '  - Tosse discreta e engasgos pós-ingesta\n' +
      '  - Dispneia progressiva com respiração de boca aberta em fases avançadas.',

    criseAsfixicaAgudaECianose:
      'Apresentação clínica na descompensação asfíxica aguda:\n' +
      '- Postura ortopneica de socorro:\n' +
      '  - Cabeça e pescoço estendidos em linha reta, cotovelos abduzidos, narinas dilatadas e expressão facial de angústia.\n' +
      '- Cianose mucocutânea:\n' +
      '  - Mucosas orais e linguais arroxeadas ou azuladas por dessaturação arterial severa (SpO2 < 85%).\n' +
      '- Secreção e hipertermia fulminante:\n' +
      '  - Salivação viscosa e espumosa acumulada nas comissuras labiais.\n' +
      '  - Temperatura retal frequentemente superior a 40,5 a 41,5°C decorrente do trabalho muscular asfíxico.\n' +
      '- Colapso hemodinâmico e síncope:\n' +
      '  - Síncope hipóxica por exaustão diafragmática e isquemia cerebral iminente.',

    progressaoNeurologicaApendicular:
      'Sinais neurológicos apendiculares associados ao complexo GOLPP:\n' +
      '- Sinais de neurônio motor inferior em membros pélvicos:\n' +
      '  - Paraparesia flácida simétrica com fraqueza muscular e dificuldade para subir escadas ou levantar-se de pisos lisos.\n' +
      '- Ataxia proprioceptiva sensorial:\n' +
      '  - Arrastamento dos dígitos no solo (knuckling) com desgaste irregular das unhas dorsais.\n' +
      '- Atrofia muscular e reflexos lentificados:\n' +
      '  - Hipotrofia progressiva da musculatura glútea e femoral caudal com reflexos posturais retardados.\n' +
      '- Evidência de Stanley et al. (2010):\n' +
      '  - 31% dos cães já apresentavam déficits apendiculares na admissão, e 100% dos animais acompanhados manifestaram sinais neurológicos generalizados em até 1 ano pós-diagnóstico.',

    tabelaComparativaSinaisCaoVsGato:
      'Tabela comparativa — Sinais clínicos e particularidades por espécie: Cão versus Gato (Tabela 3).',
  },

  diagnosis: {
    laringoscopiaLevePadraoOuro:
      'Padrão-ouro confirmatório da paralisia laríngea:\n' +
      '- Princípio diagnóstico essencial:\n' +
      '  - Visualização direta da laringe e da rima glottidis sob plano anestésico superficial e leve, mantendo rigorosamente a respiração espontânea do paciente.\n' +
      '- Instrumentação e posicionamento técnico:\n' +
      '  - Utiliza-se laringoscópio com lâmina longa de ponta romba (Miller ou Macintosh) posicionado sobre a base da língua.\n' +
      '  - Evitar pressionar excessivamente a epiglote ou o processo cuneiforme para não limitar artificialmente a motilidade da cartilagem.\n' +
      '- Critério de confirmação positiva:\n' +
      '  - Constatação inequívoca da ausência bilateral (ou unilateral no gato) de abdução ativa das cartilagens aritenoides durante a fase inspiratória.',

    armadilhaDoPlanoAnestesicoProfundo:
      'Armadilha do plano anestésico excessivamente profundo:\n' +
      '- Risco crítico de falso-positivo diagnóstico:\n' +
      '  - O maior erro técnico durante a laringoscopia é aprofundar o plano anestésico.\n' +
      '  - Anestésicos gerais deprimem a atividade dos motoneurônios do tronco encefálico e diminuem a excursão ventilatória, fazendo com que uma laringe perfeitamente saudável pareça paralisada e imóvel.\n' +
      '- Evidência farmacológica comparativa (Pan et al., 2022):\n' +
      '  - Em estudo randomizado cruzado, a alfaxalona provocou redução significativamente maior na área glótica e na mobilidade aritenoidea quando comparada ao propofol em doses equipotentes.\n' +
      '- REGRA DE OURO anestésica:\n' +
      '  - O propofol intravenoso titulado vagarosamente até o ponto exato de abertura da boca constitui o protocolo farmacológico preferível para a avaliação funcional confiável.',

    sincronismoRespiratorioEDoxapram:
      'Sincronismo respiratório estrito e uso de doxapram:\n' +
      '- Prevenção do falso diagnóstico por movimento paradoxal:\n' +
      '  - A sincronização estrita com o movimento da caixa torácica é mandatória.\n' +
      '  - Recomenda-se que um assistente posicionado junto ao tórax do animal vocalize com clareza cada fase: INSPIRA... EXPIRA... INSPIRA... enquanto o examinador observa as aritenoides.\n' +
      '- Protocolo farmacológico de estimulação com doxapram:\n' +
      '  - Se a respiração estiver excessivamente superficial pela sedação inicial, administra-se doxapram na dose de 1,0 a 2,2 mg/kg IV.\n' +
      '  - Mecanismo de ação: estimula os quimiorreceptores carotídeos centrais e induz incursões inspiratórias profundas e vigorosas.\n' +
      '- Diferenciação entre laringe funcional e paralisia verdadeira:\n' +
      '  - Laringe normal: a abdução ampla das cartilagens aritenoides torna-se imediatamente visível.\n' +
      '  - Paralisia verdadeira: as aritenoides permanecem imóveis ou colapsam medialmente pela pressão negativa intraluminal.',

    testeDeMobilidadePassivaAnquilose:
      'Teste de mobilidade passiva e diagnóstico diferencial de anquilose:\n' +
      '- Manobra mecânica intraoperatória obrigatória:\n' +
      '  - Durante a inspeção sob laringoscopia, antes de indicar a lateralização da aritenoide, o cirurgião deve palpar as cartilagens com uma pinça romba ou sonda bulbosa e deslocar passivamente a aritenoide lateralmente.\n' +
      '- Interpretação diagnóstica comparativa:\n' +
      '  - Paralisia neuromuscular verdadeira: a articulação cricoaritenoide move-se livremente e com total complacência sem resistência mecânica.\n' +
      '  - Anquilose ou osteoartrite cricoaritenoide: a articulação apresenta-se rígida, espessada e mecanicamente bloqueada.\n' +
      '- ALERTA CIRÚRGICO:\n' +
      '  - Em casos de anquilose mecânica articular, o procedimento de tie-back convencional falhará em promover abdução satisfatória, demandando abordagens descompressivas alternativas.',

    radiografiaToracicaIndicesNatsume2025:
      'Radiografia torácica e índices morfométricos de Natsume et al. (2025):\n' +
      '- Projeções e objetivos da avaliação radiográfica:\n' +
      '  - Estudo radiográfico torácico de 3 projeções é obrigatório para descartar pneumonia aspirativa e megaesôfago associado.\n' +
      '- Marcadores de distensão traqueal por esforço inspiratório crônico:\n' +
      '  - A obstrução laríngea crônica e a pressão negativa transmural geram dilatação dinâmica da traqueia intratorácica e da carina em relação à largura da 3ª costela.\n' +
      '- Índices morfométricos validados por Natsume et al. (2025):\n' +
      '  - Índice CD:3R (Carina Distension vs 3ª costela): valor >= 2,3 (área sob a curva ROC de 0,97).\n' +
      '  - Índice TT:3R (Traqueia Torácica vs 3ª costela): valor >= 1,9 (área sob a curva ROC de 0,98).\n' +
      '- Aplicação clínica prática:\n' +
      '  - Ambos os índices exibem altíssima acurácia como marcadores radiográficos quantitativos auxiliares na confirmação da obstrução laríngea crônica.',

    rastreioDeMegaesofagoEPneumoniaPrevia:
      'Rastreio de megaesôfago e pneumonia aspirativa prévia:\n' +
      '- Avaliação criteriosa dos lobos pulmonares dependentes:\n' +
      '  - Inspecionar minuciosamente os lobos cranioventrais (lobo médio direito e segmento cranial do lobo cranial esquerdo) em busca de consolidações alveolares e broncogramas aéreos.\n' +
      '- Rastreio de dilatação e hipomotilidade esofágica:\n' +
      '  - Documentar a presença de colunas gasosas dilatadas e hipomotilidade no esôfago cervical e intratorácico.\n' +
      '- Diretriz prognóstica pré-operatória de Wilson & Monnet (2016):\n' +
      '  - A presença de pneumonia aspirativa tratada e estabilizada no pré-operatório NÃO contraindica a cirurgia de tie-back.\n' +
      '  - Por outro lado, o megaesôfago estabelecido eleve substancialmente o risco de complicações pós-operatórias tardias, demandando monitoramento intensivo.',

    ultrassonografiaLaringeaEcolaringografia:
      'Ultrassonografia laríngea transcutânea (Ecolaringografia):\n' +
      '- Princípio técnico da técnica ultrassonográfica:\n' +
      '  - Avaliação da motilidade das cartilagens e processos cuneiformes por via cervical ventral utilizando transdutor linear de alta frequência (7,5 a 12 MHz).\n' +
      '- Vantagens do método não invasivo:\n' +
      '  - Possibilidade de exame em pacientes conscientes sem necessidade de contenção química ou anestesia geral depressora.\n' +
      '- Limitações e riscos de interpretação:\n' +
      '  - Elevada dependência da curva de aprendizado e experiência do operador.\n' +
      '  - Risco relevante de confusão entre movimento passivo paradoxal expiratório e abdução ativa inspiratória.\n' +
      '- REGRA DE OURO diagnóstica:\n' +
      '  - A ecolaringografia constitui exame de triagem não invasivo complementar, mas não substitui a laringoscopia direta sob plano leve como padrão-ouro confirmatório.',

    eletrodiagnosticoEMGConducaoNervosa:
      'Eletrodiagnóstico neuromuscular e estudos de condução nervosa:\n' +
      '- Eletromiografia (EMG) do CAD e musculatura apendicular:\n' +
      '  - Revela potenciais de fibrilação espontâneos e ondas agudas positivas (positive sharp waves).\n' +
      '  - Confirma o processo ativo de desnervação motora periférica de neurônio motor inferior.\n' +
      '- Estudos de velocidade de condução nervosa (VCN):\n' +
      '  - Avaliação motora e sensorial com registro de redução na velocidade de condução e diminuição na amplitude dos potenciais de ação compostos nos nervos ciático e ulnar.\n' +
      '- Relevância clínica no complexo GOLPP:\n' +
      '  - Documenta a neuropatia axonal distal sistêmica e confirma o caráter polineuropático do paciente geriátrico nos casos de dúvida diagnóstica ou manifestações neuromusculares atípicas.',

    tabelaDiagnosticoDiferencialLaringeo:
      'Tabela comparativa — Diagnóstico diferencial das afecções obstrutivas da via aérea superior (Tabela 4).',
  },

  treatment: {
    estabilizacaoDeEmergenciaProtocoloHandsOff:
      'Protocolo de emergência inicial e abordagem hands-off:\n' +
      '- REGRA VITAL de abordagem mínima hands-off:\n' +
      '  - Minimizar manipulação invasiva, proibir contenções forçadas, colocação intempestiva de cateteres ou tentativas de posicionamento radiográfico sob angústia respiratória.\n' +
      '- Medidas de suporte ambiental imediatas:\n' +
      '  - Posicionar o paciente em decúbito esternal confortável sobre superfície acolchoada em sala climatizada com temperatura entre 18°C e 20°C.\n' +
      '- Oxigenoterapia sem estresse:\n' +
      '  - Fornecer oxigênio a 100% via fluxo livre próximo ao focinho (blow-by a 3-5 L/min), tenda de oxigênio ou máscara com fluxo aberto.\n' +
      '- RESSALVA FISIOLÓGICA CRÍTICA:\n' +
      '  - A oxigenoterapia suplementar é completamente inócua se a via aérea glótica estiver ocluída mecanicamente em 100%, exigindo intervenção desobstrutiva imediata.',

    sedacaoCriteriosaEResfriamentoAtivo:
      'Sedação farmacológica criteriosa e controle da hipertermia:\n' +
      '- Quebra do ciclo vicioso de ansiedade e colapso glótico:\n' +
      '  - A ansiedade gera taquipneia, que acelera o fluxo turbulento e puxa medialmente as aritenoides colapsadas.\n' +
      '- Protocolo sedativo de resgate:\n' +
      '  - Butorfanol: 0,2 a 0,4 mg/kg IV ou IM, isolado ou associado a:\n' +
      '  - Acepromazina: 0,02 a 0,05 mg/kg IV ou IM (estritamente em cães normotensos e não hipovolêmicos) para desacelerar o padrão ventilatório e quebrar o pânico asfíxico.\n' +
      '- Protocolo de resfriamento ativo em hipertermia (> 40,5°C):\n' +
      '  - Aspersão de água em temperatura ambiente sobre extremidades e abdômen, compressas úmidas e ventilação por convecção.\n' +
      '- ALERTA VITAL:\n' +
      '  - Interromper o resfriamento ativo estritamente ao atingir 39,5°C para prevenir o rebote de hipotermia grave iatrogênica.',

    corticoideDeResgateEdemaLaringeo:
      'Corticoide de resgate para atenuação do edema laríngeo:\n' +
      '- Indicação terapêutica na crise aguda:\n' +
      '  - Indicado na presença de edema inflamatório secundário e congestão tecidual decorrentes do atrito traumático repetitivo das cartilagens aritenoides colapsadas.\n' +
      '- Posologia recomendada:\n' +
      '  - Dexametasona (fosfato dissódico): 0,1 a 0,5 mg/kg IV em dose única de ataque.\n' +
      '- Mecanismo e limites da resposta clínica:\n' +
      '  - Reduz a tumefação e a exsudação vascular da mucosa intraluminal, expandindo ligeiramente a rima glottidis e aliviando a resistência ao fluxo.\n' +
      '- REGRA DE OURO clínica:\n' +
      '  - O corticoide atenua o edema agudo secundário, mas NÃO recupera a função contrátil do músculo CAD desnervado nem reverte a polineuropatia motora subjacente.',

    intubacaoTraquealETraqueostomia:
      'Indicações de intubação orotraqueal e traqueostomia de urgência:\n' +
      '- Critérios objetivos para intubação imediata de resgate:\n' +
      '  - Exaustão respiratória iminente por fadiga da musculatura ventilatória acessória.\n' +
      '  - Cianose persistente ou SpO2 < 90% sob oxigenoterapia suplementar contínua.\n' +
      '  - Perda progressiva do nível de consciência ou estupor asfíxico.\n' +
      '  - Hipercapnia grave documentada (PaCO2 > 60 mmHg) associada a acidose mista descompensada.\n' +
      '- Conduta técnica de intubação:\n' +
      '  - Indução rápida com propofol IV e intubação orotraqueal com tubo balonado com cuff insuflado adequadamente.\n' +
      '  - A estabilização imediata da ventilação confirma a sede puramente laríngea da obstrução respiratória.\n' +
      '- Indicação de traqueostomia temporária de urgência:\n' +
      '  - Indicada caso a intubação orotraqueal seja impedida por espasmo laringofaríngeo catastrófico, estenose neoplásica massiva ou edema perilaringeo intransponível.\n' +
      '  - Realiza-se abertura cirúrgica transversal entre o 3º e o 5º anéis traqueais com fixação de cânula traqueal de tamanho apropriado.',

    manejoConservadorCandidatosELimites:
      'Manejo conservador — Critérios de seleção e limitações clínicas:\n' +
      '- Perfil do paciente candidato ao manejo não cirúrgico:\n' +
      '  - Pacientes com paralisia laríngea subclínica ou de grau leve.\n' +
      '  - Ausência de histórico de crises asfíxicas agudas, síncopes ou cianose.\n' +
      '  - Manutenção de tolerância respiratória aceitável em repouso e esforços domésticos moderados.\n' +
      '- Medidas de suporte ambiental e comportamental:\n' +
      '  - Perda de peso estrita e direcionada caso o paciente apresente sobrepeso ou obesidade.\n' +
      '  - Substituição permanente de coleiras cervicais por peitoral ergonômico.\n' +
      '  - Restrição de passeios aos horários de temperaturas amenas, evitando calor excessivo e alta umidade.\n' +
      '  - Manutenção em ambiente climatizado residencial (18°C a 22°C) e redução de estímulos excitatórios.\n' +
      '- Limite terapêutico fundamental:\n' +
      '  - O manejo conservador apenas reduz a demanda ventilatória; ele não retarda a atonia do músculo CAD nem impede a progressão da neuropatia sistêmica.',

    desmistificandoADoxepinaEstudoRishniw:
      'Desmistificando a doxepina — Ensaio clínico de Rishniw et al. (2021):\n' +
      '- Contexto histórico e uso empírico anterior:\n' +
      '  - A doxepina (antidepressivo tricíclico com ação anti-histamínica e moduladora de neurotransmissores) foi amplamente difundida em congressos veterinários como terapia médica oral empírica.\n' +
      '- Desenho do estudo de evidência científica nível 1:\n' +
      '  - Ensaio clínico randomizado, duplo-cego e placebo-controlado rigoroso conduzido por Rishniw et al. (2021).\n' +
      '  - População: 22 cães da raça Labrador Retriever diagnosticados com paralisia laríngea adquirida.\n' +
      '  - Protocolo testado: doxepina na dose de 3 a 5 mg/kg VO a cada 12 horas por 28 dias versus placebo.\n' +
      '- Resultados clínicos comprovados:\n' +
      '  - A doxepina NÃO produziu qualquer melhora nos escores objetivos de qualidade de vida, no estridor ou na tolerância ventilatória (P = 0,84).\n' +
      '  - O ensaio foi interrompido precocemente pela ausência absoluta de benefício clínico demonstrável.\n' +
      '- CONTRAINDICAÇÃO FORMAL:\n' +
      '  - O uso de doxepina para tratamento de paralisia laríngea é formalmente desaconselhado com base em evidência classe A.',

    lateralizacaoUnilateralDaAritenoideUAL:
      'Lateralização unilateral da aritenoide (UAL / Tie-back):\n' +
      '- Padrão-ouro cirúrgico de escolha:\n' +
      '  - Procedimento eletivo padrão-ouro para cães com afecção clinicamente sintomática, crises obstrutivas ou perda na qualidade de vida.\n' +
      '- Princípios da técnica cirúrgica lateral esquerda:\n' +
      '  - Acesso cervical lateral esquerdo dissecando a borda caudo-dorsal da cartilagem tireoide.\n' +
      '  - Desarticulação criteriosa da articulação cricoaritenoide sem violar a integridade da mucosa laríngea intraluminal.\n' +
      '- Fixação biomecânica da rima glottidis:\n' +
      '  - Inserção de uma ou duas suturas de material inabsorvível monofilamentar (polipropileno 2-0 ou 0).\n' +
      '  - Ancoragem do processo muscular da aritenoide à borda dorsocaudal da cartilagem cricoide (CAL) ou lâmina tireoidea (TAL).\n' +
      '  - Tracionamento controlado mantendo abertura permanente de diâmetro moderado que restabelece o fluxo laminar inspiratório.',

    justificativaBiomecanicaUnilateralVsBilateral:
      'Justificativa biomecânica — Procedimento unilateral versus bilateral:\n' +
      '- Paradoxo da proteção da via aérea versus fluxo ventilatório:\n' +
      '  - A laringe atua como válvula de proteção esfincteriana essencial durante a deglutição de saliva, líquidos e alimentos sólidos.\n' +
      '  - O objetivo da intervenção cirúrgica moderna não é a abertura máxima da glote, mas a MENOR abdução suficiente para abolir a resistência patológica inspiratória.\n' +
      '- Consequência fatal da lateralização bilateral:\n' +
      '  - A abertura bilateral da glote acarreta incompetência esfincteriana total irreversível.\n' +
      '  - A epiglote torna-se incapaz de ocluir o orifício glótico excessivamente alargado durante a fase faríngea da deglutição.\n' +
      '- CONTRAINDICAÇÃO FORMAL:\n' +
      '  - A lateralização bilateral da aritenoide é terminantemente proscrita devido à ocorrência de pneumonia aspirativa grave e fulminante com taxas inaceitáveis de morbimortalidade.',

    tecnicasCALvsTALDrudi2022:
      'Técnicas cirúrgicas comparadas — CAL versus TAL (Drudi et al., 2022):\n' +
      '- Técnica clássica cricoaritenoide (CAL):\n' +
      '  - Ancora o processo muscular da aritenoide diretamente à crista mediana dorsocaudal da cartilagem cricoide.\n' +
      '  - Reproduz o vetor biomecânico fisiológico exato do músculo cricoaritenoideo dorsal.\n' +
      '- Técnica alternativa tireoaritenoide (TAL):\n' +
      '  - Ancora o processo muscular aritenoideo à face caudal da lâmina da cartilagem tireoide.\n' +
      '  - Proporciona acesso anatômico facilitado com menor dissecção perilaringea posterior.\n' +
      '- Evidências do ensaio prospectivo randomizado de Drudi et al. (2022):\n' +
      '  - Ambas as abordagens promoveram aumento significativo da rima glottidis (+205% na CAL e +152% na TAL).\n' +
      '  - Não foram constatadas diferenças estatisticamente significativas na taxa de complicações pós-operatórias a curto prazo entre ambas as técnicas.',

    aritenoidectomiaParcialEndoscopicaFelina2026:
      'Aritenoidectomia parcial transoral endoscópica em gatos (Forni et al., 2026):\n' +
      '- Particularidades do manejo cirúrgico na espécie felina:\n' +
      '  - O tie-back convencional exibe altas taxas de complicações e falhas na espécie felina devido à diminuta dimensão anatômica das cartilagens e ao risco de deiscência.\n' +
      '- Inovação endoscópica descrita por Forni, Rondi & Romussi (2026):\n' +
      '  - Estudo de série clínica em oito gatos apresentando dispneia obstrutiva grave refratária.\n' +
      '  - Execução de aritenoidectomia parcial unilateral transoral guiada por vídeo-endoscopia de alta definição.\n' +
      '- Desfechos e segurança clínica no acompanhamento:\n' +
      '  - Ressecção minimamente invasiva da margem medial da aritenoide sem nenhuma incisão cervical externa.\n' +
      '  - Alívio respiratório desobstrutivo imediato em 100% dos felinos operados.\n' +
      '  - Ausência de complicações maiores e sem necessidade de realização de traqueostomia permanente no seguimento longitudinal.',

    tabelaProtocoloEmergencialECirurgico:
      'Tabela comparativa — Protocolo farmacológico de emergência e modalidades cirúrgicas (Tabela 5).',
  },

  complications: {
    pneumoniaAspirativaPosOperatoria:
      'Pneumonia aspirativa pós-operatória tardia:\n' +
      '- Natureza e magnitude do risco a longo prazo:\n' +
      '  - Complicação mais comum, temida e determinante de mortalidade após a lateralização da aritenoide.\n' +
      '  - Ao fixar a aritenoide em abdução permanente, a barreira protetora da via aérea perde parte da sua eficácia mecânica contra refluxos e secreções.\n' +
      '- Incidência cumulativa demonstrada por Wilson & Monnet (2016):\n' +
      '  - Estudo multicêntrico com 232 cães submetidos à UAL esquerda:\n' +
      '  - Incidência cumulativa em 1 ano de pós-operatório: 18,6%.\n' +
      '  - Incidência cumulativa aos 3 e 4 anos de seguimento: 31,8%.\n' +
      '- REGRA DE OURO de orientação ao tutor:\n' +
      '  - O tutor deve ser informado previamente de que o risco de pneumonia aspirativa persiste durante toda a sobrevida pós-operatória do paciente.',

    impactoDoMegaesofagoEOpioides:
      'Fatores de risco perioperatórios e impacto do megaesôfago:\n' +
      '- Evidências multivariadas de Wilson & Monnet (2016):\n' +
      '  - Megaesôfago documentado no raio-X torácico: eleva o risco relativo de pneumonia aspirativa em 2,58 vezes (Hazard Ratio 2,58; IC95% 1,56–3,93; P < 0,001), consolidando a hipomotilidade esofágica como o maior preditor isolado de aspiração.\n' +
      '  - Uso de opioides no período pós-operatório imediato: associou-se a risco aumentado de aspiração (HR 1,69), em virtude da sedação central e inibição transitória do reflexo de tosse e deglutição.\n' +
      '- Ineficácia comprovada da metoclopramida preventiva:\n' +
      '  - A administração empírica de metoclopramida NÃO conferiu nenhuma proteção contra pneumonia aspirativa (HR 0,94).',

    falhaDeSuturaEAvulsaoCartilaginosa:
      'Falha de sutura, avulsão e fratura cartilaginosa:\n' +
      '- Período crítico e mecanismos precipitantes:\n' +
      '  - Maior risco nas primeiras 2 a 4 semanas de pós-operatório, desencadeado por episódios de latidos repetitivos, estresse agudo ou movimentação cervical súbita.\n' +
      '- Variações biomecânicas associadas à idade do paciente:\n' +
      '  - Cães jovens: cartilagens com matriz elástica e macia propiciam o rasgamento do tecido pelo fio cirúrgico (suture pull-through).\n' +
      '  - Cães idosos: cartilagens cricoide ou aritenoide severamente mineralizadas sofrem microfraturas ou estilhaçamento no ponto de ancoragem da sutura.\n' +
      '- Conduta terapêutica diante da perda de lateralização:\n' +
      '  - Reavaliação emergencial sob laringoscopia direta superficial e reoperação no lado contralateral caso a abdução tenha sido perdida.',

    edemaSeromaEHematomaCervical:
      'Complicações locais perioperatórias e sequelas mecânicas menores:\n' +
      '- Complicações incisais e cervicais comuns:\n' +
      '  - Formação de seroma no leito de dissecação cervical profunda (habitualmente reabsorvido espontaneamente em 7 a 14 dias).\n' +
      '  - Hematoma subcutâneo local decorrente de hemostasia incompleta de ramos vasculares tireóideos.\n' +
      '- Alterações funcionais laríngeas esperadas:\n' +
      '  - Episódios de tosse ou engasgo passageiro na deglutição rápida de líquidos durante as primeiras 2 semanas pós-cirúrgicas.\n' +
      '  - Alteração definitiva no timbre do latido (disfonia ou afonia parcial permanente) decorrente da assimetria vibratória da rima glottidis.\n' +
      '- Complicação neurológica iatrogênica infrequente:\n' +
      '  - Paralisia transitória do nervo hipoglosso secundária a tração tecidual vigorosa, cursando com dificuldade de retração lingual.',

    progressaoInexoravelDaNeuropatiaGOLPP:
      'Progressão da neuropatia periférica no complexo GOLPP:\n' +
      '- Esclarecimento mandatória do caráter neurodegenerativo:\n' +
      '  - A lateralização da aritenoide alivia a obstrução mecânica das vias aéreas superiores, mas NÃO detém a degeneração axonal progressiva do complexo GOLPP.\n' +
      '- Evidências clínicas do estudo de Bookbinder et al. (2016):\n' +
      '  - Coorte observacional de 90 cães com paralisia laríngea geriátrica:\n' +
      '  - A cirurgia promoveu ganho expressivo de qualidade de vida e prolongou a sobrevida dos animais operados.\n' +
      '  - Animais com manifestações neurológicas apendiculares prévias apresentaram incidência substancialmente maior de complicações a longo prazo (74% vs 32%; Odds Ratio 4,04), decorrente da progressão da paraparese e fraqueza proprioceptiva.',

    dezErrosFataisParalisiaLaringea:
      'Dez erros clássicos e armadilhas letais no manejo da paralisia laríngea:\n' +
      '1. Sedação profunda na laringoscopia:\n' +
      '- O aprofundamento excessivo do plano anestésico paralisa a laringe saudável e induz falsos diagnósticos positivos.\n' +
      '2. Não sincronizar o exame com o tórax:\n' +
      '- Confundir movimento paradoxal (abertura passiva na expiração) com abdução inspiratória ativa verdadeira.\n' +
      '3. Não palpar a mobilidade articular:\n' +
      '- Deixar de diagnosticar anquilose cricoaritenoide e realizar tie-back ineficaz em cartilagens anquilosadas.\n' +
      '4. Desprezar o rastreio de megaesôfago:\n' +
      '- Omitir radiografias torácicas de 3 projeções e desconhecer o risco aumentado de aspiração por hipomotilidade esofágica.\n' +
      '5. Indicar tie-back bilateral:\n' +
      '- Causar incompetência glótica completa com aspiração maciça fatal de alimentos e líquidos.\n' +
      '6. Forçar contenção na crise asfíxica:\n' +
      '- Não respeitar a abordagem hands-off no paciente descompensado, deflagrando parada cardiorrespiratória por estresse.\n' +
      '7. Prescrever doxepina na expectativa de reversão:\n' +
      '- Confiar em medicação comprovadamente ineficaz em ensaio clínico randomizado (Rishniw et al., 2021) e atrasar a conduta cirúrgica.\n' +
      '8. Permitir natação após tie-back:\n' +
      '- Omitir a proibição absoluta de corpos d água ao tutor, resultando em afogamento agudo por entrada desobstruída de água na glote.\n' +
      '9. Manter coleira de pescoço:\n' +
      '- Preservar coleiras tradicionais que comprimem diretamente a laringe operada e desestabilizam as suturas de ancoragem.\n' +
      '10. Iludir o tutor sobre a cura neurológica:\n' +
      '- Não orientar que a polineuropatia GOLPP continuará progredindo para os membros pélvicos ao longo dos anos.',

    protocoloPlantaoParalisiaLaringea10Passos:
      'Protocolo de plantão em 10 passos para crise de paralisia laríngea:\n' +
      '1. Avaliação visual primária hands-off:\n' +
      '- Confirmar estridor inspiratório agudo, esforço diafragmático e coloração de mucosas sem conter fisicamente o paciente.\n' +
      '2. Oxigenoterapia sem estresse:\n' +
      '- Fornecer oxigênio a 100% por fluxo contínuo livre (blow-by a 3-5 L/min) próximo às narinas em sala climatizada.\n' +
      '3. Sedação farmacológica rápida de alívio:\n' +
      '- Administrar butorfanol (0,2 a 0,4 mg/kg IV ou IM) com ou sem acepromazina (0,02 a 0,05 mg/kg IV ou IM se normotenso).\n' +
      '4. Termometria retal e controle de hipertermia:\n' +
      '- Se temperatura > 40,5°C, iniciar resfriamento ativo com água morna/ambiente nas extremidades até atingir 39,5°C.\n' +
      '5. Corticoterapia anti-edema de resgate:\n' +
      '- Administrar dexametasona fosfato dissódico (0,1 a 0,5 mg/kg IV) em dose única para atenuar a tumefação da mucosa glótica.\n' +
      '6. Acesso venoso periférico calibroso:\n' +
      '- Instalar cateter intravenoso estéril somente após o paciente manifestar efeito satisfatório da sedação farmacológica.\n' +
      '7. Triagem para intubação de emergência:\n' +
      '- Caso o animal mantenha cianose, SpO2 < 90% ou exaustão respiratória iminente, induzir com propofol e intubar com tubo endotraqueal balonado.\n' +
      '8. Laringoscopia diagnóstica sob plano superficial:\n' +
      '- Avaliar a dinâmica das cartilagens aritenoides sincronizada à vocalização da inspiração/expiração por assistente.\n' +
      '9. Prova farmacológica com doxapram:\n' +
      '- Se houver dúvida diagnóstica por sedação, administrar doxapram (1,0 a 2,2 mg/kg IV) para desafiar a abdução ativa.\n' +
      '10. Encaminhamento e estabilização para correção cirúrgica:\n' +
      '- Programar lateralização unilateral da aritenoide (UAL / tie-back) assim que os parâmetros respiratórios e térmicos forem normalizados.',
  },

  prevention: {
    proibicaoAbsolutaENaoNegociavelDeNatacao:
      'Proibição absoluta e vitalícia de natação:\n' +
      '- VETO FORMAL E INEGOCIÁVEL:\n' +
      '  - É expressamente proibido permitir que cães submetidos a tie-back ou aritenoidectomia nadem em piscinas, rios, lagos ou praias.\n' +
      '- Mecanismo do afogamento fatal:\n' +
      '  - Como uma das cartilagens aritenoides fica permanentemente fixada em posição aberta, o animal perde a capacidade de vedamento reflexo da glote ao submergir a cabeça.\n' +
      '  - A água penetra diretamente na árvore traqueobrônquica em grande volume, culminando em asfixia mecânica aguda e óbito imediato.',

    substituicaoDefinitivaDeColeiraPorPeitoral:
      'Substituição mandatória de coleiras por peitoral ergonômico:\n' +
      '- REGRA DE OURO de conduta física e passeios:\n' +
      '  - Banimento permanente e definitivo de qualquer coleira cervical, enforcador, guia unificada ou coleira de estrangulamento.\n' +
      '- Justificativa biomecânica:\n' +
      '  - A compressão mecânica sobre as cartilagens tireoide e cricoide traciona o leito cirúrgico e pode romper as suturas de polipropileno do tie-back.\n' +
      '- Indicação do modelo adequado:\n' +
      '  - Uso restrito de peitorais ergonômicos em Y ou peitorais de suporte torácico com tração central sobre o esterno.',

    reabilitacaoFisicaEMassaMuscularAAHA:
      'Reabilitação física e manejo do complexo GOLPP (AAHA Senior Care Guidelines, 2023):\n' +
      '- Preservação da massa muscular e combate à sarcopenia:\n' +
      '  - Implementação precoce de fisioterapia motora direcionada para fortalecimento da musculatura glútea e femoral posterior.\n' +
      '  - Hidroterapia assistida em passarela seca ou esteira de baixa velocidade com suporte torácico.\n' +
      '- Adaptações de segurança no ambiente domiciliar:\n' +
      '  - Instalação de pisos antiderrapantes, passadeiras emborrachadas e rampas suaves para evitar derrapagens e traumas articulares.\n' +
      '- Manejo do escore de condição corporal:\n' +
      '  - Controle estrito do peso corporal com metas calóricas rigorosas para evitar sobrecarga musculoesquelética sobre membros pélvicos denervados.',

    estrategiaAlimentarFracionadaMeatballs:
      'Estratégia alimentar e prevenção de aspiração pós-operatória:\n' +
      '- Apresentação física e consistência da dieta:\n' +
      '  - Fornecer dietas pastosas ou úmidas moldadas manualmente em formato de almôndegas esféricas compactas (meatballs).\n' +
      '  - A forma em almôndega permite que o bolo alimentar seja propelido pela base da língua diretamente para o esôfago sem fragmentação ou dispersão na faringe.\n' +
      '- Fracionamento das refeições e postura na ingestão:\n' +
      '  - Fracionar a alimentação diária em 3 a 4 pequenas porções ao longo do dia.\n' +
      '  - Administrar a alimentação com o comedouro em nível ligeiramente elevado para favorecer a gravidade na propulsão alimentar.\n' +
      '- Restrição e manejo de ingestão hídrica:\n' +
      '  - Evitar o acesso a baldes ou bacias profundas de água fria; ofertar água fresca em volumes fracionados sob supervisão direta.',
  },

  prognosis: {
    sobrevidaPosOperatoriaNoCao:
      'Sobrevida pós-operatória e eficácia na espécie canina:\n' +
      '- Resolução imediata dos sinais obstrutivos:\n' +
      '  - A lateralização unilateral da aritenoide proporciona alívio imediato e marcante do estridor, da dispneia inspiratória e da intolerância ao esforço.\n' +
      '- Taxas de sobrevida cumulativa a longo prazo (Wilson & Monnet, 2016):\n' +
      '  - População geriátrica avaliada (232 cães; idade mediana de 10,6 anos e peso mediano de 35 kg):\n' +
      '  - Taxa de sobrevida em 1 ano: 93,6% a 94%.\n' +
      '  - Taxa de sobrevida em 2 anos: 89%.\n' +
      '  - Taxa de sobrevida em 3 anos: 84%.\n' +
      '  - Taxa de sobrevida em 4 anos pós-cirurgia: 75%.',

    impactoNaQualidadeDeVidaBookbinder2016:
      'Impacto quantitativo na qualidade de vida (Bookbinder et al., 2016):\n' +
      '- Redução na mortalidade associada à afecção respiratória:\n' +
      '  - A intervenção cirúrgica esteve associada a uma redução de 2,6 vezes no risco relativo de morte (Hazard Ratio 2,6; IC95% 1,34–4,84; P = 0,006) comparada ao manejo exclusivamente conservador em cães moderados a graves.\n' +
      '- Avaliação qualitativa referida pelos tutores:\n' +
      '  - Incremento médio superior a 4 pontos em escalas padronizadas e validadas de qualidade de vida.\n' +
      '  - Eliminação da angústia asfíxica crônica, restauração de ciclos de sono repousantes e retorno de passeios e interação familiar ativa.',

    prognosticoEFatoresDeterminantesEmGatos:
      'Prognóstico e fatores determinantes na espécie felina:\n' +
      '- Sobrevida na paralisia laríngea idiopática ou cirúrgica:\n' +
      '  - Estudos de literatura felina (Taylor et al. 2009, Thunberg & Lantz 2010, Forni et al. 2026) demonstram que gatos operados com sucesso podem alcançar sobrevida superior a 2 a 3 anos.\n' +
      '- Fatores prognósticos desfavoráveis na espécie felina:\n' +
      '  - Presença de neoplasias cervicais ou mediastinais invasivas (linfoma, carcinoma tireóideo).\n' +
      '  - Instalação de polineuropatias periféricas de evolução rápida.\n' +
      '- Determinação do desfecho clínico:\n' +
      '  - O prognóstico final em gatos depende fundamentalmente da etiologia de base e da velocidade de intervenção para restabelecer a patência da rima glottidis.',

    tabelaPrognosticoESobrevidaComparada:
      'Tabela comparativa — Sobrevida estimada e desfechos clínicos por modalidade de manejo (Tabela 6).',
  },

  tables: [
    {
      id: 'tab-paralisia-laringea-1',
      title: 'Tabela 1 — Classificação Etiológica Abrangente da Paralisia Laríngea',
      headers: ['Categoria Etiológica', 'Entidade Específica', 'Mecanismo Patológico e Envolvimento Nervoso', 'Espécie e Perfil Típico'],
      rows: [
        ['Neurodegenerativa Geriátrica', 'Complexo GOLPP', 'Axonopatia distal dependente de comprimento acometendo RLN, esôfago e ciático', 'Cães idosos >9 anos (Labrador, Golden, São Bernardo)'],
        ['Hereditária Juvenil', 'LPPN / LPPC Juvenil', 'Mutações genéticas (RAPGEF6, RAB3GAP1, NDRG1, ARHGEF10, CNTNAP1)', 'Cães filhotes a jovens (Bull Terrier, Leonberger, Dogue Alemão)'],
        ['Congênita Estrutural', 'Defeito Congênito do CAD', 'Agenesia ou hipoplasia das fibras musculares do CAD e motoneurônios', 'Filhotes ao desmame; raros gatos Siameses'],
        ['Iatrogênica Cirúrgica', 'Trauma Cervical Cirúrgico', 'Transecção, compressão ou lesão térmica do RLN em tireoidectomia ou traqueia', 'Cães e gatos submetidos a cirurgias cervicais ou ducto arterioso'],
        ['Neoplásica Infiltrativa', 'Massas Cervicais / Mediastinais', 'Invasão tumoral direta ou compressão do trajeto do vago/RLN (carcinoma, linfoma)', 'Mais prevalente em gatos idosos e cães com tumores tireoidianos'],
        ['Neuromuscular Secundária', 'Miastenia Gravis Adquirida', 'Autoanticorpos anti-AChR bloqueiam a transmissão na junção do CAD e esôfago', 'Cães adultos a idosos; frequentemente com megaesôfago focal'],
        ['Neurotóxica / Infecciosa', 'Botulismo e Neurotoxinas', 'Bloqueio na exocitose de acetilcolina (C. botulinum, chumbo, carrapatos)', 'Cães com acesso a carcaças, lixo orgânico ou áreas endêmicas de carrapato'],
      ],
    },
    {
      id: 'tab-paralisia-laringea-2',
      title: 'Tabela 2 — Anatomia e Fisiologia do Trato Laríngeo: Cão versus Gato',
      headers: ['Parâmetro Biológico', 'Cão (Canis lupus familiaris)', 'Gato (Felis catus)', 'Implicação Clínica e Cirúrgica'],
      rows: [
        ['Único Abdutor Glótico', 'm. cricoarytenoideus dorsalis (CAD)', 'm. cricoarytenoideus dorsalis (CAD)', 'Denervação do CAD não possui compensação por outros músculos intrínsecos'],
        ['Inervação Motora do CAD', 'Nervo laríngeo recorrente caudal (RLN / NC X)', 'Nervo laríngeo recorrente caudal (RLN / NC X)', 'Axônios longos vulneráveis a axonopatias e compressões mecânicas'],
        ['Comprimento do RLN Esquerdo', 'Contorna arco aórtico no tórax cranial', 'Contorna arco aórtico no tórax cranial', 'Trajeto esquerdo mais longo predispõe a acometimento unilateral felino'],
        ['Apresentação Unilateral', 'Geralmente subclínica e silenciosa', 'Frequentemente sintomática com estridor e dispneia', 'Doença unilateral no gato pode justificar intervenção de resgate'],
        ['Estrutura das Cartilagens', 'Grandes, espessas, mineralizam com a idade', 'Pequenas, elásticas, frágeis e delgadas', 'Alto risco de fratura e pull-through em suturas cirúrgicas felinas'],
        ['Produção de Ronronar (Purr)', 'Ausente fisiologicamente na espécie canina', 'Ativação oscilatória da musculatura laríngea', 'Perda do ronronar (loss of purring) é sinal histórico no gato (VIN 2025)'],
      ],
    },
    {
      id: 'tab-paralisia-laringea-3',
      title: 'Tabela 3 — Sinais Clínicos Comparativos: Cão versus Gato',
      headers: ['Sinal Clínico / Manifestação', 'Espécie Canina (🐶)', 'Espécie Felina (🐱)', 'Significado Diagnóstico e Alerta'],
      rows: [
        ['Estridor Inspiratório', 'Muito frequente, áspero e de alta frequência', 'Típico, perceptível em repouso ou agitação', 'Localização imediata na via aérea superior'],
        ['Alteração da Voz / Miado', 'Latido rouco, disfonia progressiva e perda vocal', 'Miado rouco ou afônico', 'Comprometimento da tensão das pregas vocais'],
        ['Perda do Ronronar', 'Não aplicável', 'Achado clássico muito sugestivo (VIN)', 'Sinal histórico característico da afecção felina'],
        ['Crise Hipertermica (>40,5°C)', 'Comum em dias quentes e estresse físico', 'Incomum nas séries clínicas descritas', 'Urgência com necessidade de resfriamento ativo imediato'],
        ['Disfagia e Tosse pós-água', 'Comum; reflete GOLPP e dismotilidade esofágica', 'Possível, mas menos reportada', 'Alerta para risco iminente de pneumonia aspirativa'],
        ['Fraqueza de Membros Pélvicos', 'Muito comum na evolução do GOLPP (ciático)', 'Rara; restrita a polineuropatias sistêmicas', 'Confirmação do caráter difuso da neuropatia no cão'],
        ['Doença Unilateral Sintomática', 'Rara; cães toleram bem paralisia unilateral', 'Comum (10% a 57% dos casos descritos)', 'Investigar neoplasia cervical e mediastinal no gato'],
      ],
    },
    {
      id: 'tab-paralisia-laringea-4',
      title: 'Tabela 4 — Diagnóstico Diferencial de Obstruções Laríngeas e Faríngeas',
      headers: ['Diagnóstico Diferencial', 'Achado Laringoscópico / Radiográfico', 'Diferenciação Prática e Testes', 'Conduta Diferenciada'],
      rows: [
        ['Anquilose Cricoaritenoide', 'Aritenoide fixa sem abdução ativa', 'Palpação passiva sob anestesia: cartilagem rígida e imóvel', 'Contraindica tie-back clássico; ressecção ou traqueostomia'],
        ['Neoplasia Laríngea', 'Massa tecidual intraluminal irregular', 'Biópsia por biópsia/endoscopia e exame histopatológico', 'Ressecção cirúrgica, oncologia e radioterapia'],
        ['Colapso Laríngeo Grau I-III', 'Perda estrutural das cartilagens com inversão', 'Associado a síndrome braquicefálica crônica grave (BOAS)', 'Estadiação de BOAS, estaquiectomia, rinoplastia e UAL seletivo'],
        ['Laringite Inflamatória Felina', 'Espessamento mucoso bilateral e edema difuso', 'Histopatologia (estudo de 2025: US e TC não diferenciam de tumor)', 'Corticoterapia sistêmica e investigação de corpo estranho'],
        ['Eversão de Sáculos Laríngeos', 'Mucosa dos ventrículos projetada no lúmen', 'Visualização direta de massas translúcidas na rima', 'Sacculectomia cirúrgica por laringotomia ou via oral'],
        ['Miastenia Gravis Adquirida', 'Atonia laríngea com megaesôfago generalizado', 'Dosagem de anticorpos contra receptor de acetilcolina (AChR-Ab)', 'Piridostigmina oral e imunossupressão quando apropriado'],
      ],
    },
    {
      id: 'tab-paralisia-laringea-5',
      title: 'Tabela 5 — Protocolo Farmacológico de Emergência e Intervenções Cirúrgicas',
      headers: ['Fármaco / Intervenção', 'Mecanismo Farmacodinâmico', 'Posologia e Via Recomendada', 'Momento de Uso e Observações Clínicas'],
      rows: [
        ['Butorfanol', 'Agonista opioide kappa e antagonista mu (sedação leve)', '0,2 a 0,4 mg/kg IV ou IM', 'Primeira escolha para quebrar o ciclo de pânico na emergência'],
        ['Acepromazina', 'Antagonista dopaminérgico D2 com efeito tranquilizante', '0,02 a 0,05 mg/kg IV ou IM (dose baixa)', 'Associar ao butorfanol em pacientes normotensos sem choque'],
        ['Dexametasona Fosfato', 'Glicocorticoide de curta ação redutor de edema tecidual', '0,1 a 0,5 mg/kg IV dose única', 'Redução do edema laríngeo secundário por atrito na crise'],
        ['Doxapram', 'Estimulante do centro respiratório bulbar via carotídea', '1,0 a 2,2 mg/kg IV lento', 'Uso estritamente diagnóstico durante a laringoscopia leve'],
        ['Furosemida', 'Diurético de alça inibidor do simporte Na-K-2Cl', '2,0 a 4,0 mg/kg IV ou IM', 'Indicado APENAS se houver edema pulmonar por pressão negativa (NPPE)'],
        ['Lateralização da Aritenoide (UAL)', 'Ancoragem cirúrgica unilateral do processo muscular', 'Procedimento cirúrgico sob anestesia geral', 'Tratamento de escolha em cães com estridor e intolerância moderada'],
        ['Aritenoidectomia Endoscópica', 'Ressecção parcial transoral guiada por endoscopia', 'Procedimento cirúrgico emergencial felino', 'Alternativa inovadora em gatos dispneicos graves (Forni et al., 2026)'],
      ],
    },
    {
      id: 'tab-paralisia-laringea-6',
      title: 'Tabela 6 — Sobrevida Comparada e Desfechos Clínicos por Modalidade',
      headers: ['Modalidade / Cenário Clínico', 'Sobrevida Mediana / Taxas Históricas', 'Principais Complicações Associadas', 'Fontes de Evidência e Recomendações'],
      rows: [
        ['UAL em Cães (Geral)', '1 ano: 94% | 2 anos: 89% | 4 anos: 75%', 'Pneumonia aspirativa cumulativa em 31,8% em 3 anos', 'Wilson & Monnet (2016) coorte de 232 cães operados'],
        ['UAL em Cães com Megaesôfago', 'Sobrevida reduzida em comparação a esôfago normal', 'Risco relativo de pneumonia aspirativa elevado em 2,58x', 'Wilson & Monnet (2016); requer extrema cautela e aviso ao tutor'],
        ['Cães Cirúrgicos vs Conservadores', 'Cirurgia reduz risco de morte em 2,6 vezes (HR 2,6)', 'Pneumonia aspirativa e complicações da neuropatia GOLPP', 'Bookbinder et al. (2016) estudo de 90 cães com GOLPP'],
        ['UAL em Felinos (Séries Clássicas)', '11 meses a >2 anos (complicação pós-op até 50%)', 'Pull-through de sutura, tosse, pneumonia e afonia', 'Thunberg & Lantz (2010); amostras pequenas e cirurgia delicada'],
        ['Aritenoidectomia Endoscópica Gatos', 'Excelente sobrevida funcional a curto/médio prazo', 'Tosse leve, estridor residual temporário, sem estenose', 'Forni, Rondi & Romussi (2026) série de 8 gatos em emergência'],
      ],
    },
  ],

  errorsAndTrapdoors: [
    {
      id: 'err-paralisia-1',
      title: 'Confundir movimento paradoxal com abdução inspiratória normal durante a laringoscopia',
      description:
        'Durante a expiração, a pressão positiva pulmonar empurra passivamente as aritenoides flácidas para fora, simulando abertura. Na inspiração, a pressão negativa colapsa as cartilagens para dentro. Um examinador desatento pode interpretar a abertura expiratória passiva como normal. É obrigatório ter um auxiliar sincronizando verbalmente as incursões torácicas (inspira / expira) durante o exame.',
    },
    {
      id: 'err-paralisia-2',
      title: 'Aprofundar excessivamente o plano anestésico para examinar a laringe',
      description:
        'A administração em excesso de propofol ou alfaxalona deprime o drive respiratório central e imobiliza aritenoides perfeitamente saudáveis, gerando um falso diagnóstico de paralisia laríngea. A sedação deve ser estritamente superficial, permitindo apenas a abertura oral enquanto se mantêm incursões espontâneas.',
    },
    {
      id: 'err-paralisia-3',
      title: 'Presumir que a paralisia laríngea no cão idoso é uma alteração isolada da garganta',
      description:
        'Na vasta maioria dos Labradores e cães geriátricos, a paralisia é apenas a ponta do iceberg do complexo neurodegenerativo GOLPP. A cirurgia de tie-back desobstrui o canal respiratório, mas não cura a neuropatia periférica de neurônio motor inferior, que continuará progredindo para os membros pélvicos e esôfago.',
    },
    {
      id: 'err-paralisia-4',
      title: 'Atribuir a paralisia laríngea ao hipotireoidismo e prometer cura com levotiroxina',
      description:
        'Embora cães geriátricos possam apresentar hipotireoidismo concomitante ou síndrome do eutireoideo doente decorrente do estresse respiratório crônico, ensaios clínicos demonstraram que o tratamento com hormônio tireoidiano não reverte a atonia do CAD. O hipotireoidismo deve ser tratado pela sua própria relevância metabólica, sem falsa promessa de restabelecimento laríngeo.',
    },
    {
      id: 'err-paralisia-5',
      title: 'Prescrever doxepina acreditando em melhora funcional da paralisia laríngea',
      description:
        'Apesar do uso empírico e anedótico histórico, um ensaio clínico prospectivo, duplo-cego e placebo-controlado (Rishniw et al., 2021) provou categoricamente que a doxepina não promoveu nenhum benefício clínico ou funcional em Labradores com paralisia laríngea, tendo o grupo placebo apresentado escores superiores. A droga não deve ser recomendada.',
    },
    {
      id: 'err-paralisia-6',
      title: 'Executar lateralização bilateral da aritenoide na tentativa de maximizar o fluxo aéreo',
      description:
        'A abdução bilateral das aritenoides destrói completamente o mecanismo esfinctérico protetor da laringe durante a deglutição, expondo a traqueia e os brônquios à inundação contínua de saliva e alimentos e elevando drasticamente as taxas de pneumonia aspirativa letal. A lateralização deve ser estritamente unilateral.',
    },
    {
      id: 'err-paralisia-7',
      title: 'Confundir estridor inspiratório agudo com estertor nasofaríngeo',
      description:
        'O estridor é um som áspero de alta frequência gerado pela passagem turbulenta de ar por uma rima glottidis estenosada. O estertor é um ruído grave e roncante originado em tecidos redundantes da nasofaringe e palato mole. Confundir os dois ruídos atrasa o diagnóstico e leva a intervenções errôneas no palato ou nas cavidades nasais.',
    },
    {
      id: 'err-paralisia-8',
      title: 'Usar furosemida indiscriminadamente na crise acreditando que ela desinchará a laringe',
      description:
        'A furosemida é um diurético de alça e não tem efeito sobre o edema mecânico e inflamatório da mucosa laríngea. Seu uso na crise asfíxica é indicado única e exclusivamente quando houver confirmação radiográfica de edema pulmonar por pressão negativa (NPPE). Em pacientes hipertermicos e desidratados, a furosemida sem indicação agrava o choque hipovolêmico.',
    },
    {
      id: 'err-paralisia-9',
      title: 'Prescrever metoclopramida no pós-operatório acreditando que ela previne pneumonia aspirativa',
      description:
        'No grande estudo de Wilson & Monnet (2016) com 232 cães submetidos à lateralização unilateral, a administração de metoclopramida no pós-operatório não demonstrou nenhuma redução estatisticamente significativa no risco de pneumonia aspirativa (Hazard Ratio 0,94; IC95% 0,67–1,37). A proteção deve focar no manejo postural e consistência alimentar.',
    },
    {
      id: 'err-paralisia-10',
      title: 'Permitir que o animal nade após a cirurgia de lateralização da aritenoide',
      description:
        'A natação deve ser terminantemente proibida por toda a vida do paciente após o tie-back. Com uma aritenoide permanentemente abduzida, a entrada involuntária de água na orofaringe resulta em aspiração direta e maciça para o trato respiratório inferior, culminando em afogamento agudo e óbito imediato.',
    },
  ],

  clinicalProtocols: [
    {
      id: 'proto-paralisia-1',
      title: 'Protocolo de Plantão em 10 Passos: Abordagem da Crise Respiratória Obstrutiva e Estridor',
      description:
        'Roteiro de conduta intensiva sequencial para cães e gatos admitidos em emergência com estridor inspiratório grave, cianose, hipertermia ou colapso asfíxico.',
      steps: [
        {
          step: 1,
          action: 'Triagem Visual e Conduta Hands-Off Imediata',
          target: 'Avaliação de padrão ventilatório e prevenção de estresse letal',
          description:
            'Acomodar o paciente imediatamente em ambiente fresco, silencioso e calmo. Proibir contenção forçada, punções venosas imediatas ou tentativas de radiografia. Observar postura ortopneica, presença de estridor agudo e coloração de mucosas sem tocar no animal.',
        },
        {
          step: 2,
          action: 'Oxigenoterapia sem Estresse',
          target: 'Suplementação de oxigênio inspiratório (FiO2 40-60%)',
          description:
            'Fornecer oxigênio por fluxo livre (blow-by) posicionado a 2 a 4 cm das narinas, em tenda plástica transparente ou em gaiola com oxigênio enriquecido. Nunca forçar máscara facial apertada se o animal demonstrar pânico ou resistir.',
        },
        {
          step: 3,
          action: 'Sedação Criteriosa de Resgate',
          target: 'Quebra do ciclo de ansiedade, taquipneia e colapso glótico',
          description:
            'Administrar butorfanol (0,2 a 0,4 mg/kg IV ou IM). Em cães normotensos e sem sinais de choque, associar acepromazina em dose baixa (0,02 a 0,05 mg/kg IV ou IM). Em felinos, usar butorfanol isolado ou combinado com alfaxalona (1 a 2 mg/kg IM).',
        },
        {
          step: 4,
          action: 'Aferição Térmica e Resfriamento Ativo Controlado',
          target: 'Tratamento de hipertermia secundária ao trabalho respiratório',
          description:
            'Se a temperatura retal ultrapassar 40,5°C, aplicar toalhas umedecidas em água ambiente ou morna sobre as patas e virilhas e posicionar um ventilador direcionado ao tronco. Interromper rigorosamente o resfriamento ativo aos 39,5°C para evitar overshoot hipotérmico.',
        },
        {
          step: 5,
          action: 'Corticoterapia Anti-inflamatória de Curta Duração',
          target: 'Redução do edema laríngeo secundário por atrito tecidual',
          description:
            'Administrar dexametasona fosfato sódico (0,1 a 0,5 mg/kg IV em bolus único). O corticoide diminui a congestão e o edema da mucosa das aritenoides, aumentando discretamente o calibre da rima glottidis em até 30 a 60 minutos.',
        },
        {
          step: 6,
          action: 'Monitoramento Oximétrico e Avaliação de Fadiga',
          target: 'Detecção precoce de falência respiratória iminente',
          description:
            'Monitorar SpO2 continuamente. Se a saturação permanecer abaixo de 90% a despeito de oxigênio ou se surgirem sinais de exaustão diafragmática (respiração abdominal paradoxal, obnubilação e bradipneia agônica), preparar material para intubação imediata.',
        },
        {
          step: 7,
          action: 'Indução Anestésica e Intubação Orotraqueal de Emergência',
          target: 'Garantia mecânica definitiva da via aérea superior',
          description:
            'Administrar propofol (2 a 4 mg/kg IV titulado) e intubar imediatamente a traqueia com tubo orotraqueal balonado com cuff. Insuflar o balonete e acoplar a circuito respiratório com 100% de oxigênio. Se o alívio respiratório for imediato, confirma-se o sítio obstrutivo laríngeo.',
        },
        {
          step: 8,
          action: 'Inspeção Laríngea Direta sob Plano Leve Durante o Resgate',
          target: 'Confirmação diagnóstica de paralisia funcional',
          description:
            'No momento da intubação (ou logo antes com a boca aberta), visualizar a mobilidade das aritenoides com laringoscópio. Observar a ausência de abdução ativa e descartar massas, corpos estranhos obstrutivos ou fraturas cartilaginosas mecânicas.',
        },
        {
          step: 9,
          action: 'Radiografia Cervical e Torácica Pós-Estabilização',
          target: 'Identificação de pneumonia aspirativa, megaesôfago e índices traqueais',
          description:
            'Com o animal estável e oxigenado, realizar radiografias de tórax e pescoço em 3 projeções. Pesquisar consolidacões alveolares cranioventrais, megaesôfago e calcular os índices traqueais de Natsume et al. (2025) (CD:3R >= 2,3 e TT:3R >= 1,9).',
        },
        {
          step: 10,
          action: 'Planejamento Cirúrgico Definitivo e Recomendações Vitais',
          target: 'Indicação de lateralização unilateral (tie-back) e profilaxia de afogamento',
          description:
            'Agendar cirurgia de lateralização unilateral da aritenoide (UAL / tie-back) assim que o edema for controlado e a pneumonia (se presente) for estabilizada. Instruir a família sobre a proibição perpétua e absoluta de natação, troca definitiva por peitoral e vigilância contra aspiração.',
        },
      ],
    },
  ],

  editorialReferences: [
    {
      authors: 'Stanley BJ, Hauptman JG, Fritz MC, Rosenstein DS, Kinns J',
      title: 'Esophageal dysfunction in dogs with idiopathic laryngeal paralysis: a controlled cohort study',
      journal: 'Veterinary Surgery',
      year: 2010,
      volume: '39(2)',
      pages: '139-149',
      url: 'https://doi.org/10.1111/j.1532-950X.2009.00626.x',
    },
    {
      authors: 'Wilson D, Monnet E',
      title: 'Risk factors for the development of aspiration pneumonia after unilateral arytenoid lateralization in dogs with laryngeal paralysis: 232 cases (1995-2012)',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2016,
      volume: '248(2)',
      pages: '188-194',
      url: 'https://doi.org/10.2460/javma.248.2.188',
    },
    {
      authors: 'Bookbinder LC, Flanders JA, Bookbinder PF',
      title: 'Idiopathic canine laryngeal paralysis as one sign of a diffuse polyneuropathy: an observational study of 90 cases (2007-2013)',
      journal: 'Veterinary Surgery',
      year: 2016,
      volume: '45(2)',
      pages: '245-260',
      url: 'https://doi.org/10.1111/vsu.12444',
    },
    {
      authors: 'Rishniw M, Lhermite GP, Simpson KW',
      title: 'Effect of doxepin on quality of life in Labradors with laryngeal paralysis: a double-blinded, randomized, placebo-controlled trial',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2021,
      volume: '35(4)',
      pages: '1943-1949',
      url: 'https://doi.org/10.1111/jvim.16162',
    },
    {
      authors: 'Pan PC, Pypendop BH, Johnson LR',
      title: 'Comparison between propofol and alfaxalone anesthesia for the evaluation of laryngeal function in healthy dogs',
      journal: 'PLoS One',
      year: 2022,
      volume: '17(6)',
      pages: 'e0270812',
      url: 'https://doi.org/10.1371/journal.pone.0270812',
    },
    {
      authors: 'Drudi D, Vignoli M, Cinti F, et al.',
      title: 'Comparison of immediate and short-term outcomes of cricoarytenoid and thyroarytenoid lateralization in dogs with laryngeal paralysis',
      journal: 'Veterinary Surgery',
      year: 2022,
      volume: '51(3)',
      pages: '482-488',
      url: 'https://doi.org/10.1111/vsu.13778',
    },
    {
      authors: 'Shubert MP, Ganjei JB',
      title: 'Outcome following elective unilateral arytenoid lateralization performed in an outpatient manner in dogs: 44 cases (2018-2021)',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2023,
      volume: '261(8)',
      pages: '1182-1188',
      url: 'https://doi.org/10.2460/javma.23.02.0121',
    },
    {
      authors: 'Natsume RE, Scansen BA, Johnson LR',
      title: 'Radiographic tracheal and carina distension is associated with diagnosis of laryngeal paralysis in dogs',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2025,
      volume: '263(12)',
      pages: '1540-1545',
      url: 'https://doi.org/10.2460/javma.25.03.0173',
    },
    {
      authors: 'Shelton GD, Minor KM, Guo LT, et al.',
      title: 'A CNTNAP1 missense variant associated with laryngeal paralysis and polyneuropathy in young Great Dane dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2025,
      volume: '39(4)',
      pages: 'e70185',
      url: 'https://doi.org/10.1111/jvim.70185',
    },
    {
      authors: 'Taylor SS, Harvey AM, Barr FJ, Moore AH',
      title: 'Laryngeal disease in cats: a retrospective study of 35 cases',
      journal: 'Journal of Feline Medicine and Surgery',
      year: 2009,
      volume: '11(12)',
      pages: '954-962',
      url: 'https://doi.org/10.1016/j.jfms.2009.04.007',
    },
    {
      authors: 'Thunberg B, Lantz GC',
      title: 'Evaluation of unilateral arytenoid lateralization for the treatment of laryngeal paralysis in 14 cats',
      journal: 'Journal of the American Animal Hospital Association',
      year: 2010,
      volume: '46(6)',
      pages: '418-424',
      url: 'https://doi.org/10.5326/0460418',
    },
    {
      authors: 'Forni D, Rondi M, Romussi S',
      title: 'Transoral endoscopic-assisted partial arytenoidectomy as a treatment for laryngeal paralysis in eight cats',
      journal: 'Animals (Basel)',
      year: 2026,
      volume: '16(13)',
      pages: '2083',
      url: 'https://doi.org/10.3390/ani16132083',
    },
    {
      authors: 'American Animal Hospital Association (AAHA)',
      title: '2023 AAHA Senior Care Guidelines for Dogs and Cats - Special Disease Consideration: GOLPP Complex',
      journal: 'Journal of the American Animal Hospital Association',
      year: 2023,
      volume: '59(1)',
      pages: '1-21',
      url: 'https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/special-disease-consideration-golpp-complex/',
    },
    {
      authors: 'American College of Veterinary Surgeons (ACVS)',
      title: 'Laryngeal Paralysis in Dogs and Cats: Surgical Management and Principles of Tie-back',
      journal: 'ACVS Clinical Resources',
      year: 2024,
      volume: 'Resource Guide',
      pages: '1-8',
      url: 'https://www.acvs.org/small-animal/paralyzed-larynx/',
    },
    {
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine. Chapter 16-18: Disorders of the Larynx and Upper Airway',
      journal: 'Elsevier',
      year: 2020,
      volume: '6th Edition',
      pages: '270-279',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
    },
    {
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine. Chapter 9: Respiratory Emergencies',
      journal: 'Wiley-Blackwell',
      year: 2012,
      volume: '2nd Edition',
      pages: '146-147',
      url: 'https://www.wiley.com/en-us/Manual+of+Small+Animal+Emergency+and+Critical+Care+Medicine%2C+2nd+Edition-p-9780813824734',
    },
    {
      authors: 'Drobatz KJ, Rozanski EA, Silverstein DC',
      title: 'Feline Emergency and Critical Care Medicine. Chapter 11: Upper Airway Disease in Cats',
      journal: 'Wiley-Blackwell',
      year: 2022,
      volume: '2nd Edition',
      pages: '114-115',
      url: 'https://www.wiley.com/en-us/Feline+Emergency+and+Critical+Care+Medicine%2C+2nd+Edition-p-9781119568957',
    },
    {
      authors: 'Veterinary Information Network (VIN)',
      title: 'Laryngeal Paralysis (Canine and Feline): Clinical Practice Review and Surgical Guidelines',
      journal: 'VINcyclopedia',
      year: 2025,
      volume: 'Updated September 2025',
      pages: '1-14',
      url: 'https://www.vin.com/members/cms/project/defaultadv1.aspx?pId=11147',
    },
    {
      authors: 'RECOVER Initiative',
      title: '2024 RECOVER Guidelines: Monitoring and Critical Care in Upper Airway Obstruction',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      year: 2024,
      volume: '34(S1)',
      pages: 'e13100',
      url: 'https://doi.org/10.1111/vec.13100',
    },
  ],
};
