import { DiseaseRecord } from '../../types/disease';

export const tetanoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-tetano-caes-gatos',
  slug: 'tetano-caes-gatos',
  title: 'Tétano em Cães e Gatos (Clostridium tetani)',
  subtitle: 'Toxemia Neuroparalítica Espástica, Clivagem de Synaptobrevina/VAMP, Formas Focais e Generalizadas, Manejo Intensivo de Espasmos e Suporte Respiratório',
  synonyms: [
    'Tétano',
    'Tetanus',
    'Clostridium tetani',
    'Tétano canino',
    'Tétano felino',
    'Trismo',
    'Risus sardonicus',
    'Toxemia neuroparalítica espástica',
    'Tétano neonatal',
    'Paralisia espástica clostridial',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: [
    'neurologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'infectologia',
    'clinica-medica',
  ],
  tags: [
    'Tétano',
    'Clostridium tetani',
    'Tetanospasmina',
    'TeNT',
    'Synaptobrevin',
    'VAMP',
    'GABA',
    'Glicina',
    'Trismo',
    'Risus Sardonicus',
    'Metronidazol',
    'Antitoxina Tetânica',
    'Methocarbamol',
    'Sulfato de Magnésio',
    'Falência Respiratória',
    'Disautonomia',
    'Dussaux 2024',
    'Zitzl 2022',
    'Guedra 2021',
    'Nelson & Couto',
  ],
  isPublished: true,

  quickDecisionStrip: [
    'Tétano = Perda do freio motor: a tetanospasmina cliva a sinaptobrevina/VAMP, bloqueando a liberação de GABA e glicina; a consciência permanece 100% alerta!',
    'No gato, a apresentação típica é focal ou multifocal (78%, Dussaux et al., 2024); não espere tétano generalizado ou risus sardonicus para suspeitar de tétano felino.',
    'A ferida pode ter cicatrizado ou ser microscópica (unha, boca, pele); lave com salina abundante e desbride cirurgicamente, CONTRAINDICANDO peróxido de hidrogênio (H2O2) por citotoxicidade.',
    'Metronidazol (10–15 mg/kg IV/VO q8–12h) cessa a produção de toxina e antitoxina equina neutraliza a toxina livre; NENHUM deles reverte a toxina já internalizada nos neurônios.',
    'Monitorar função respiratória com gasometria (PaCO2) e capnografia: a rigidez torácica e laringoespasmo elevam o CO2 antes de queda na SpO2; óbito decorre de complicação respiratória (Guedra et al., 2021).',
  ],

  quickSummary:
    'ALERTA CRÍTICO DE NEUROLOGIA E TERAPIA INTENSIVA — TÉTANO = PERDA DO FREIO MOTOR: A tetanospasmina (TeNT) produzida pelo Clostridium tetani em feridas anaeróbias com baixo potencial de oxirredução ascende por transporte axonal retrógrado ao sistema nervoso central, penetra nos interneurônios inibitórios (células de Renshaw) e cliva irreversivelmente a proteína sinaptobrevina/VAMP (componente do complexo SNARE). Essa clivagem impede a exocitose vesicular dos neurotransmissores inibitórios GABA e glicina. Sem esse freio fisiológico, os motoneurônios alfa entram em hiperatividade eferente descontrolada, desencadeando contração muscular simultânea de agonistas e antagonistas, com rigidez extensora tônica contínua e espasmos paroxísticos violentos disparados por mínimos estímulos sensoriais (som, luz, toque). O paciente mantém a consciência perfeitamente lúcida e dolorosa! Em gatos, diferentemente dos cães, a resistência biológica natural à toxina é muito maior, predominando as formas focais ou multifocais (78% na série de Dussaux et al., 2024), frequentemente sem trismo ou risus sardonicus. A porta de entrada pode ser microscópica ou já estar completamente cicatrizada. O tratamento apoia-se em quatro pilares inegociáveis: (1) erradicar a bactéria produtora com desbridamento cirúrgico da ferida (com lavagem abundante de salina isotônica, contraindicando formalmente o peróxido de hidrogênio por citotoxicidade tecidual) e antibioticoterapia com metronidazol; (2) neutralizar a toxina ainda livre no sangue com antitoxina tetânica equina precoce; (3) controlar os espasmos musculares com ambiente terapêutico escuro e silencioso associado a methocarbamol e benzodiazepínicos (midazolam/diazepam); e (4) suporte intensivo de UTI mantendo o paciente vivo até a regeneração das sinapses neuronais (3 a 6 semanas), com vigilância redobrada contra hipoventilação alveolar hipercápnica e pneumonia aspirativa, complicações que determinam a mortalidade da afecção (Guedra et al., 2021).',

  quickSummaryRich: {
    lead:
      'O tétano é uma toxemia neuroparalítica espástica grave provocada pela tetanospasmina (TeNT), exotoxina sintetizada pelo Clostridium tetani em feridas com tecido desvitalizado e baixo potencial de oxirredução. Ao ascender aos interneurônios inibitórios da medula espinhal e tronco encefálico por transporte axonal retrógrado, a toxina cliva a proteína sinaptobrevina/VAMP, abolindo irreversivelmente a liberação dos neurotransmissores inibitórios glicina e GABA. Os motoneurônios alfa perdem seu mecanismo fisiológico de freio, disparando descargas eferentes contínuas que produzem rigidez extensora permanente e espasmos paroxísticos violentos deflagrados por mínimos estímulos sensoriais. O paciente mantém a consciência perfeitamente lúcida! Antibióticos e antitoxina impedem a progressão, mas a recuperação das sinapses intoxicadas requer semanas de suporte intensivo em quarto escuro silencioso, relaxamento muscular criterioso e vigilância ventilatória contra hipoventilação hipercápnica e pneumonia aspirativa.',
    leadHighlights: [
      'toxemia neuroparalítica espástica',
      'tetanospasmina',
      'Clostridium tetani',
      'sinaptobrevina/VAMP',
      'perdem seu mecanismo fisiológico de freio',
      'consciência perfeitamente lúcida',
      'suporte intensivo em quarto escuro silencioso',
    ],
    pillars: [
      {
        title: 'Pilar 1 — Fisiopatologia Molecular: Clivagem de Synaptobrevina/VAMP e Perda do Freio Motor',
        body: 'A tetanospasmina (TeNT) liga-se a receptores neuronais periféricos e ascende ao SNC por transporte axonal retrógrado (75–250 mm/dia). Sua cadeia leve atua como metaloprotease de zinco intracelular que cliva a proteína sinaptobrevina (VAMP), desmontando o complexo SNARE nos interneurônios inibitórios. Sem exocitose de GABA e glicina, os motoneurônios alfa descarregam continuamente, produzindo rigidez extensora contínua e hiperreflexia.',
        highlights: [
          'transporte axonal retrógrado',
          'sinaptobrevina (VAMP)',
          'complexo SNARE',
          'GABA e glicina',
          'rigidez extensora contínua',
        ],
      },
      {
        title: 'Pilar 2 — Diferenças entre Espécies: Alta Resistência e Tétano Focal Felino (Dussaux et al., 2024)',
        body: 'Cães e gatos possuem alta resistência natural à TeNT comparados a equinos e humanos (dose letal mínima 300–600x maior em cães e até 7.200x maior em gatos). Por essa razão, 78% dos gatos acometidos desenvolvem formas focais ou multifocais limitadas a um ou mais membros próximos à lesão prévia, sem trismo ou rigidez generalizada clássica (Dussaux et al., 2024). Em cães, a forma generalizada predomina nos jovens de grande porte.',
        highlights: [
          'alta resistência natural',
          'Dussaux et al., 2024',
          '78% dos gatos',
          'formas focais ou multifocais',
          'forma generalizada predomina em cães',
        ],
      },
      {
        title: 'Pilar 3 — Asfixia e Risco Respiratório Oculto: A Lição de Guedra et al. (2021) e PaCO2',
        body: 'A mortalidade no tétano canino é ditada por complicações respiratórias: Guedra et al. (2021) demonstraram que a sobrevida foi de 94,8% em cães sem complicação respiratória versus apenas 14,3% naqueles com complicações (laringoespasmo, rigidez torácica e pneumonia aspirativa por disfagia/megaesôfago). A hipoventilação alveolar causa retenção perigosa de PaCO2 muito antes de produzir hipoxemia ou queda na oximetria de pulso (SpO2).',
        highlights: [
          'Guedra et al. (2021)',
          'sobrevida foi de 94,8% versus 14,3%',
          'complicações respiratórias',
          'laringoespasmo',
          'retenção perigosa de PaCO2',
        ],
      },
      {
        title: 'Pilar 4 — Manejo em Quatro Frentes: Desbridamento sem H2O2, Metronidazol, Antitoxina e UTI Silenciosa',
        body: 'O manejo envolve: (1) desbridamento cirúrgico amplo e lavagem com salina isotônica, contraindicando peróxido de hidrogênio (H2O2) por citotoxicidade; (2) metronidazol IV (10–15 mg/kg q8–12h); (3) antitoxina tetânica equina precoce para neutralizar toxina livre circulante; e (4) sedação com methocarbamol e midazolam em quarto escuro silencioso, com sulfato de magnésio (MgSO4) em casos graves refratários.',
        highlights: [
          'contraindicando peróxido de hidrogênio',
          'metronidazol IV',
          'antitoxina tetânica equina',
          'methocarbamol e midazolam',
          'sulfato de magnésio (MgSO4)',
        ],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Estratificação de Risco no Tétano',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Fenótipo Espástico e Nível de Consciência',
          detail:
            'Identificar rigidez extensora persistente em membros, trismo (lockjaw), enrugamento frontal com comissuras labiais retraídas (risus sardonicus), orelhas eretas e protrusão de terceira pálpebra. Confirmar que a consciência cortical está intacta e alerta (Nelson & Couto).',
          timing: 'Minuto 0',
          limitations: 'Em gatos, os sinais são predominantemente focais/multifocais em um único membro sem fácies tetânica.',
        },
        {
          label: 'Passo 2: Busca Ativa da Porta de Entrada Inoculatória Oculta',
          detail:
            'Exame minucioso da pele, coxins, leitos ungueais, unhas fraturadas, espaços interdigitais, cavidade oral (dentes fraturados decíduos ou permanentes, abscessos periapicais), cicatrizes cirúrgicas recentes e coto umbilical em neonatos. A ferida pode estar cicatrizada.',
          timing: 'Primeira hora',
          reassess: 'A ausência de ferida visível não afasta o diagnóstico (só 31/42 cães tinham foco evidente no VIN).',
        },
        {
          label: 'Passo 3: Exclusão Rápida de Mimetizadores e Avaliação Bioquímica / Eletrolítica',
          detail:
            'Mensurar cálcio ionizado (excluir tetania hipocalcêmica), CK sérica, AST, lactato e eletrólitos. CK e AST marcadamente elevadas confirmam injúria de membrana miocítica por contração contínua (rabdomiólise). Descartar intoxicação por estricnina, metaldeído ou permetrina em gatos.',
          timing: 'Primeiras 2 a 4 horas',
          limitations: 'Hemograma e bioquímica podem estar inteiramente normais em formas focais ou iniciais.',
        },
        {
          label: 'Passo 4: Monitoramento Ventilatório Gasométrico (PaCO2) e Rastreio Radiográfico',
          detail:
            'Coleta de gasometria arterial ou venosa para avaliar PaCO2 e pH (detectar hipoventilação alveolar precoce). Radiografia torácica em 3 projeções para rastrear dilatação funcional esofágica (megaesôfago transitório) e pneumonia por broncoaspiração cranioventral.',
          timing: 'Admissão e seriada q4–6h',
          reassess: 'SpO2 normal no oxímetro de pulso não descarta hipercapnia grave instalada.',
        },
        {
          label: 'Passo 5: Eletrodiagnóstico (EMG) e Confirmação Microbiológica / Molecular Especializada',
          detail:
            'Eletromiografia de agulha (EMG) evidenciando potenciais de ação de unidade motora espontâneos contínuos, doublets e descargas simultâneas em músculos agonistas e antagonistas (De Risio et al., 2006). Coleta de tecido/aspirado profundo da ferida para cultura anaeróbia estrita e PCR tent.',
          timing: 'Primeiros 3 dias',
          limitations: 'Cultura negativa ou LCR normal não excluem tétano; diagnóstico baseia-se fortemente no quadro clínico.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Protocolo de Cuidados Críticos no Tétano',
      steps: [
        {
          label: 'Passo 1: Isolamento Imediato em Ambiente Terapêutico Escuro e Silencioso',
          detail:
            'Alocar o paciente em quarto escuro individual com isolamento acústico máximo, algodão nos ouvidos, portas vedadas e iluminação vermelha suave. Agrupar todas as manipulações e procedimentos de enfermagem para minimizar disparos de espasmos reflexos violentos.',
          timing: 'Imediato (Minuto 0)',
          limitations: 'Estímulos auditivos (portas batendo) ou luminosos podem desencadear laringoespasmo e parada respiratória.',
        },
        {
          label: 'Passo 2: Desbridamento Cirúrgico do Foco Inoculatório e Lavagem sem H2O2',
          detail:
            'Sob sedação prévia, realizar tricotomia ampla, inspeção, abertura de recessos anaeróbios fechados, remoção de corpos estranhos e desbridamento cirúrgico de tecido desvitalizado. Lavagem copiosa com solução salina isotônica ou Ringer Lactato. Veto ao peróxido de hidrogênio (citotóxico).',
          timing: 'Primeiras 2 a 4 horas (após início de antimicrobiano)',
          reassess: 'Revisar a ferida diariamente para garantir ausência de coleções purulentas ou necrose residual.',
        },
        {
          label: 'Passo 3: Antibioticoterapia Sistêmica Precoce contra Clostridium tetani',
          detail:
            'Iniciar Metronidazol 10–15 mg/kg IV lento (diluído) q8–12h por 10–14 dias para eliminar a forma vegetativa anaeróbia e cessar nova síntese de tetanospasmina. Alternativas parenterais: Ampicilina-sulbactam 30 mg/kg IV q8h ou Penicilina G cristalina 20.000–50.000 UI/kg IV q6h.',
          dose: 'Metronidazol 10–15 mg/kg IV q8–12h por 10–14 dias',
          timing: 'Imediato na admissão',
          limitations: 'Metronidazol em doses cumulativas prolongadas pode gerar neurotoxicidade vestibular (nistagmo, ataxia).',
        },
        {
          label: 'Passo 4: Neutralização de Toxina Livre Circulante com Antitoxina Equina',
          detail:
            'Administração de Antitoxina Tetânica Equina (ATS) 100–1.000 UI/kg IV lento ou SC em dose única precoce. Realizar teste de sensibilidade intradérmica prévio (0,1–0,2 mL de diluição 1:10 SC/ID) com vigilância de anafilaxia. Em gatos, verificar ausência de conservantes fenólicos (BSAVA).',
          dose: 'ATS 100–500 UI/kg IV lento diluída em salina em 30–60 min (ou SC)',
          timing: 'Primeiras 12 a 24 horas',
          limitations: 'A antitoxina não neutraliza toxina já internalizada nos axônios ou ligada no SNC; não reverte sinais imediatos.',
        },
        {
          label: 'Passo 5: Controle Farmacológico Escalonado de Espasmos e Suporte de UTI',
          detail:
            'Associação de relaxante muscular central e benzodiazepínicos: Methocarbamol (22–44 mg/kg IV/VO q8h; crises graves 55–110 mg/kg IV lento, Plumb 10e) + Midazolam (0,1–0,4 mg/kg IV/IM q2–4h ou CRI 0,1–0,5 mg/kg/h). Casos graves e disautonomia: Sulfato de Magnésio (MgSO4 bolo 70 mg/kg em 30 min + CRI 10–30 mg/kg/h) ou Dexmedetomidina.',
          dose: 'Methocarbamol 22–44 mg/kg IV/VO q8h + Midazolam 0,1–0,4 mg/kg IV q2–4h; MgSO4 CRI se refratário',
          timing: 'Contínuo por 2 a 4 semanas',
          reassess: 'Monitorar PaCO2: se depressão respiratória ou laringoespasmo, proceder à intubação orotraqueal e ventilação mecânica.',
        },
      ],
    },
  },

  etiology: {
    definicaoEToxemiaNeuroparaliticaEspastica:
      'Definição clínica e natureza da toxemia:\n' +
      'O tétano é classicamente definido como uma toxemia neuroparalítica espástica grave provocada pela tetanospasmina (TeNT), uma das neurotoxinas bacterianas mais potentes conhecidas na biologia médica.\n\n' +
      'Pilares conceituais fundamentais:\n' +
      '- Confinamento bacteriano estrito: o tétano não é uma infecção invasiva destrutiva do encéfalo ou da medula espinhal; a bactéria Clostridium tetani permanece estritamente confinada ao foco inoculatório periférico (a ferida tecidual desvitalizada).\n' +
      '- Mecanismo da sintomatologia: toda a miríade de sinais clínicos neurológicos — incluindo a hipertonia permanente, o trismo, o risus sardonicus e os espasmos musculares violentos — decorre da absorção, migração transneuronal retrógrada e ação intracelular da exotoxina proteica nos circuitos inibitórios do sistema nervoso central.\n' +
      '- Ausência de contágio horizontal: o tétano não é uma enfermidade contagiosa; a transmissão direta entre cães, gatos ou seres humanos não ocorre.\n' +
      '- Requisito patogênico: a infecção requer obrigatoriamente a contaminação acidental de uma solução de continuidade tecidual por esporos bacterianos ambientais viáveis sob microambiente anaeróbio.',

    biologiaDoAgenteClostridiumTetaniEAmbienteAnaerobio:
      'Características biológicas do agente etiológico:\n' +
      '- Taxonomia e morfologia: Clostridium tetani é um bacilo Gram-positivo, móvel por flagelos peritríquios, não encapsulado, formador de endósporos e estritamente anaeróbio.\n' +
      '- Requisito estrito de anaerobiose: em contraste com equívocos históricos sugerindo atividade aeróbia, o C. tetani é um anaeróbio obrigatório que requer ambientes teciduais com potencial de oxirredução (Eh) profundamente negativo para germinar e sintetizar suas toxinas.\n' +
      '- Esporos em baqueta de tambor: os endósporos possuem formato esférico ou oval e localização terminal proeminente, conferindo à bactéria o clássico aspecto microscópico em baqueta de tambor (drumstick).\n' +
      '- Resistência ambiental extrema: os esporos são extraordinariamente resistentes ao calor, ressecamento, radiação solar e desinfetantes químicos comuns, sobrevivendo dormentes no solo, poeira e fezes por meses a anos.\n' +
      '- Colonização comensal entérica: o microrganismo faz parte da microbiota entérica normal de cavalos, ruminantes, cães e gatos sadios, sendo eliminado no meio ambiente sem desencadear doença clínica primária no trato gastrointestinal.',

    portasDeEntradaECorrecionAoVinPeroxidoDeHidrogenio:
      'Condições locais e portas de entrada teciduais:\n' +
      '- Condições essenciais para germinação: presença de tecido necrótico isquêmico, corpos estranhos, coinfecção por bactérias aeróbias facultativas (que consomem oxigênio local) e interrupção do suprimento vascular periférico.\n' +
      '- Portas de entrada clínicas mais frequentes:\n' +
      '  - Feridas perfurantes profundas por espinhos, pregos ou mordeduras de outros animais\n' +
      '  - Lacerações cutâneas contaminadas por terra e fraturas expostas\n' +
      '  - Leitos ungueais lesados por avulsão traumática de unhas\n' +
      '  - Feridas cirúrgicas contaminadas (especialmente após ovariosalpingohisterectomia ou castração sem assepsia estrita)\n' +
      '  - Infecções da cavidade oral (fratura de dentes decíduos ou permanentes, doença periodontal avançada e abscessos periapicais)\n' +
      '  - Tecido reprodutivo pós-parto e infecção umbilical neonatal (onfalite em filhotes)\n\n' +
      'CONTRAINDICAÇÃO FORMAL:\n' +
      '- Peróxido de hidrogênio (água oxigenada / H2O2): embora textos históricos tenham sugerido seu uso na tentativa de liberar oxigênio local, as diretrizes contemporâneas de cicatrização (MSD Veterinary Manual, AAHA) contraindicam formalmente o peróxido de hidrogênio; sua efervescência causa citotoxicidade fulminante contra fibroblastos e capilares em formação, retarda a cicatrização e gera trombose microvascular.\n' +
      '- Padrão ouro no manejo da ferida: lavagem mecânica abundante com solução salina isotônica a 0,9% ou Ringer com Lactato sob pressão moderada combinada com desbridamento cirúrgico meticuloso.',

    resistenciaNaturalInterespecificaCaesVsGatos:
      'Disparidade interespecífica de susceptibilidade:\n' +
      '- Espécies altamente susceptíveis: seres humanos e equinos são extraordinariamente sensíveis à ação da tetanospasmina, desenvolvendo tétano generalizado severo após inoculação de quantidades microscópicas da toxina.\n' +
      '- Resistência biológica natural de carnívoros: cães e especialmente gatos exibem resistência natural impressionante à neurotoxina tetânica.\n' +
      '- Dados de dose letal mínima (Popoff, 2020):\n' +
      '  - Em cães: a quantidade de TeNT necessária para induzir paralisia é de 300 a 600 vezes maior do que em cobaias e equinos.\n' +
      '  - Em gatos: a dose letal necessária é de 960 a 7.200 vezes superior à de equinos.\n' +
      '- Base molecular da resistência: menor densidade ou menor afinidade dos receptores gangliosídicos de ancoragem da toxina na membrana dos terminais nervosos periféricos dos carnívoros domésticos.\n' +
      '- Implicações clínicas diretas:\n' +
      '  - Cães necessitam de cargas toxêmicas mais elevadas para generalizar a doença.\n' +
      '  - Gatos manifestam predominantemente apresentações clínicas focais ou multifocais circunscritas ao sítio inoculatório, sendo o tétano generalizado felino um evento de extrema raridade na prática médica.',

    tabelaDiferencialEspasmoERigidez: {
      caption: 'Tabela 1 — Diagnóstico Diferencial do Espasmo Muscular, Rigidez e Hipertonia em Pequenos Animais',
      headers: [
        'Condição Clínica',
        'Fisiopatologia Primária',
        'Tônus Muscular e Reflexos',
        'Nível de Consciência',
        'Pistas Distintivas e Diagnóstico Confirmatório',
      ],
      rows: [
        [
          'Tétano (Clostridium tetani)',
          'Clivagem de sinaptobrevina/VAMP; bloqueio de GABA e glicina no SNC',
          'Rigidez extensora contínua (hipertonia) e hiperreflexia; piora com estímulos',
          'Consciência 100% alerta e preservada; ansiedade e dor',
          'Risus sardonicus, trismo, protrusão de terceira pálpebra, histórico de ferida/unha/dente',
        ],
        [
          'Botulismo (Clostridium botulinum)',
          'Bloqueio pré-sináptico da liberação de acetilcolina na placa motora',
          'Hipotonia profunda e arreflexia (paralisia flácida simétrica)',
          'Consciência preservada e alerta',
          'Paralisia flácida de NMI, mandíbula caída, midríase arreativa e megaesôfago precoce',
        ],
        [
          'Intoxicação por Estricnina',
          'Antagonismo competitivo direto nos receptores pós-sinápticos de glicina',
          'Espasmos tônicos tetaniformes violentos e opistótono agudo',
          'Consciência mantida durante o espasmo até o colapso hipóxico',
          'Início superagudo (minutos a horas pós-ingestão de veneno), sem rigidez basal entre crises',
        ],
        [
          'Intoxicação por Metaldeído',
          'Depleção de GABA cerebral e aumento da atividade da monoamina oxidase',
          'Tremores musculares contínuos de corpo inteiro e convulsões motoras',
          'Consciência alterada; desorientação, cegueira transitória e coma',
          'Histórico de contato com iscas moluscicidas, hipertermia severa e nistagmo',
        ],
        [
          'Intoxicação por Permetrina em Gatos',
          'Retardo no fechamento dos canais de sódio neuronais dependentes de voltagem',
          'Tremores musculares generalizados, fasciculações e espasmos finos',
          'Consciência geralmente preservada a moderadamente deprimida',
          'Exclusivo em felinos expostos a pipetas caninas de permetrina; resposta a metocarbamol/lipídios',
        ],
        [
          'Tetania por Hipocalcemia Aguda',
          'Aumento da permeabilidade neuronal ao sódio por carência de cálcio extracelular',
          'Rigidez muscular generalizada, espasmos tônicos e tremores faciais',
          'Ansiedade, desorientação e comportamento agressivo',
          'Fêmeas lactantes (eclâmpsia puerperal) ou pós-paratireoidectomia; cálcio ionizado muito baixo',
        ],
        [
          'Miosite Mastigatória / Polimiosite',
          'Ataque autoimune mediado por anticorpos contra fibras musculares 2M ou sarcolema',
          'Trismo isolado na mastigatória; fraqueza muscular dolorosa na polimiosite',
          'Consciência perfeitamente normal',
          'Dor intensa à palpação de masseteres/temporais, ausência de sinais em membros, CK elevada',
        ],
        [
          'Raiva (Forma Furiosa ou Muda)',
          'Encefalomielite viral necrotizante transmitida por mordedura de mamífero',
          'Espasmos musculares faríngeos com salivação profusa seguidos de paralisia flácida',
          'Alteração comportamental marcante (agressividade, alucinação e torpor)',
          'Histórico de vacinação incerta, paralisia de nervos cranianos e risco zoonótico letal',
        ],
      ],
    },
  },

  epidemiology: {
    epidemiologiaCaninaEPerfilDeGravidade:
      'Perfil epidemiológico e fatores de risco na espécie canina:\n' +
      '- Frequência e impacto clínico: o tétano é considerado uma enfermidade de frequência baixa a moderada no cão, mas dotada de repercussão clínica devastadora quando atinge formas generalizadas.\n' +
      '- Faixa etária e raças predispostas: acomete cães de todas as faixas etárias, havendo maior representação epidemiológica de animais jovens (mediana de 2 a 3 anos de idade) e raças de grande e gigante porte (Labrador Retriever, Pastor Alemão, Golden Retriever, Rottweiler e Boxer), provavelmente em função de hábitos exploratórios vigorosos em ambiente externo e maior suscetibilidade a ferimentos perfurantes e lesões podais.\n' +
      '- Achados do estudo de Zitzl et al. (2022) em 42 cães hospitalizados (2006–2020):\n' +
      '  - Idade inferior a 2 anos associou-se significativamente a maior gravidade clínica e pior prognóstico (6 em 10 cães não sobreviventes tinham menos de 2 anos, p = 0,023).\n' +
      '  - Taxa global de sobrevivência hospitalar na coorte foi de 76% (32/42 cães).\n' +
      '  - Dos 10 animais não sobreviventes, 4 evoluíram para óbito espontâneo e 6 foram submetidos à eutanásia decorrente da falência respiratória ou restrições financeiras dos tutores frente à internação prolongada em UTI.',

    epidemiologiaFelinaERevolucaoDussaux2024:
      'Revolução no entendimento do tétano felino (Dussaux et al., 2024):\n' +
      'Estudo multicêntrico internacional avaliando 27 gatos diagnosticados com tétano em 11 centros de referência europeus ao longo de 18 anos redefiniu o padrão da afecção na espécie:\n' +
      '- Predomínio absoluto da forma focal: 78% dos gatos (21/27) manifestaram a forma focal ou multifocal, caracterizada por rigidez restrita a um ou dois membros próximos à porta de entrada.\n' +
      '- Raridade da forma generalizada: apenas 22% dos gatos (6/27) desenvolveram a forma generalizada clássica.\n' +
      '- Identificação da porta de entrada: em 85% dos pacientes (23/27), uma ferida recente, trauma podal ou incisão cirúrgica foi identificada e os sinais neurológicos iniciaram-se invariavelmente no membro acometido.\n' +
      '- Alta taxa de recuperação motora: a taxa de recuperação de deambulação independente nos gatos que completaram o protocolo de suporte foi de 92% (23/25), com tempo mediano até a alta de 25 dias.\n\n' +
      'REGRA CLÍNICA PARA FELINOS:\n' +
      '- A equipe veterinária não deve aguardar sinais faciais de trismo ou marcha em cavalete para suspeitar de tétano em felinos: uma claudicação progressiva associada a rigidez extensora de um único membro após traumatismo ou cirurgia constitui o fenótipo felino primordial.',

    tetanoNeonatalEOnfalite:
      'Tétano neonatal e infecção de cordão umbilical:\n' +
      '- Ocorrência em neonatos: embora o tétano seja incomum em neonatos de carnívoros domésticos, casos fatais têm sido documentados quando falhas graves de higiene ocorrem no período periparto.\n' +
      '- Evidência de Mayousse et al. (2023): relato de uma ninhada de filhotes da raça American Bully que, com apenas 3 a 5 dias de vida, desenvolveram rigidez extensora generalizada, trismo e incapacidade total de preensão dos tetos maternos para sucção.\n' +
      '- Porta de entrada comprovada: a necropsia confirmou a presença de onfalite supurativa bacteriana aguda como a porta de entrada dos esporos de C. tetani provenientes do solo do canil.\n' +
      '- Relevância diagnóstica: necessidade imperativa de incluir o tétano no diagnóstico diferencial de filhotes recém-nascidos apresentando rigidez muscular aguda associada a infecção do cordão umbilical.',

    tabelaComparativaCaesVsGatosTetano: {
      caption: 'Tabela 2 — Matriz Comparativa entre Espécies: Tétano Canino vs Tétano Felino',
      headers: [
        'Parâmetro Clínico / Epidemiológico',
        'Caninos (Zitzl et al., 2022; Guedra et al., 2021)',
        'Felinos (Dussaux et al., 2024; Moretti et al., 2024)',
      ],
      rows: [
        [
          'Susceptibilidade Natural à Tetanospasmina',
          'Moderada (dose letal mínima 300–600x maior que equinos)',
          'Altíssima resistência (dose letal 960–7.200x maior que equinos)',
        ],
        [
          'Forma Clínica Predominante',
          'Generalizada (tétano clássico com 4 membros rígidos)',
          'Focal ou Multifocal (78% restrita a membros traumatizados)',
        ],
        [
          'Sinais Faciais (Trismo e Risus Sardonicus)',
          'Muito frequentes e precoces na maioria dos cães',
          'Incomuns; observados quase exclusivamente na forma generalizada',
        ],
        [
          'Identificação da Porta de Entrada / Ferida',
          'Variável (~70% identificável; ferida frequentemente já cicatrizada)',
          'Altamente frequente (85% com histórico de ferida/trauma recente no membro)',
        ],
        [
          'Complicações Respiratórias (Asfixia / Aspirativa)',
          'Frequentes (26,4%), determinando alta mortalidade (85,7%)',
          'Raras; complicações mais comuns são hipertermia e retenção urinária',
        ],
        [
          'Taxa de Recuperação e Sobrevida',
          'Aproximadamente 76% de sobrevida hospitalar em UTI',
          'Excelente (> 90% recuperam marcha independente em 3 a 4 semanas)',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    transporteAxonalRetrogradoEIncubacao:
      'Produção toxêmica e cinética de migração retrógrada:\n' +
      'Após a germinação dos esporos vegetativos de Clostridium tetani na ferida anaeróbia, as bactérias produzem e liberam duas toxinas principais:\n' +
      '- Tetanolisina: hemolisina oxigênio-lábil que promove lise tecidual local, degradação da mielina e amplificação da necrose, favorecendo a redução do Eh tecidual.\n' +
      '- Tetanospasmina (TeNT): responsável por toda a sintomatologia neurológica.\n\n' +
      'Estrutura e transporte molecular da TeNT:\n' +
      '- Estrutura proteica: liberada como polipeptídeo inativo de 150 kDa clivado em duas cadeias por ponte dissulfeto: cadeia pesada (HC, 100 kDa) e cadeia leve (LC, 50 kDa).\n' +
      '- Ancoragem pré-sináptica: a cadeia pesada liga-se com altíssima afinidade a gângliosídeos e glicoproteínas na membrana pré-sináptica da placa motora terminal dos neurônios motores alfa.\n' +
      '- Transporte intra-axonal: a toxina é internalizada por endocitose em vesículas endossomais ácidas e inicia transporte retrógrado ao longo do citoesqueleto microtubular do nervo periférico a uma velocidade estimada de 75 a 250 mm/dia em direção ao soma do motoneurônio na coluna cinzenta ventral da medula espinhal ou núcleos motores do tronco encefálico.\n' +
      '- Período de incubação clínico: varia de 3 a 21 dias (média de 5 a 10 dias), sendo inversamente proporcional à proximidade anatômica entre a ferida inoculatória e o sistema nervoso central (feridas na cabeça, face e boca possuem incubação mais curta do que feridas distais nos membros).',

    fisiopatologiaMolecularClivagemSynaptobrevinaVamp:
      'Mecanismo de ação subcelular e clivagem do complexo SNARE:\n' +
      '- Transcitose interneuronal: ao atingir o corpo celular do neurônio motor alfa no SNC, a vesícula endossomal contendo a TeNT não descarrega a toxina no citoplasma motor, mas sofre transcitose através da fenda sináptica retrógrada para adentrar o terminal axonal dos interneurônios inibitórios da medula espinhal (especialmente as células de Renshaw e interneurônios internunciais glicinérgicos).\n' +
      '- Translocação citosólica: a acidificação intravesicular deflagra alteração conformacional na cadeia pesada da toxina, permitindo a translocação da cadeia leve enzimaticamente ativa através da membrana endossomal para o citosol do interneurônio inibitório.\n' +
      '- Clivagem da sinaptobrevina (VAMP-2): no citoplasma, a ponte dissulfeto é reduzida e a cadeia leve — funcionando como endopeptidase de zinco altamente específica — reconhece e cliva irreversivelmente a ligação peptídica Gln76-Phe77 da proteína de membrana associada a vesículas 2 (VAMP-2 / sinaptobrevina).\n' +
      '- Desestruturação do complexo SNARE: a sinaptobrevina integra o complexo SNARE (Soluble N-ethylmaleimide-sensitive factor Attachment protein Receptor); sua destruição bloqueia a atracação, ancoragem e fusão das vesículas sinápticas com a membrana plasmática pré-sináptica.',

    perdaDoFreioGabaergicoEGlicinergico:
      'Perda da modulação inibitória e hiperatividade motora descontrolada:\n' +
      '- Bloqueio da liberação de GABA e glicina: com a clivagem enzimática da sinaptobrevina/VAMP, os interneurônios inibitórios tornam-se incapazes de realizar a exocitose vesicular de seus principais neurotransmissores: o ácido gama-aminobutírico (GABA) e a glicina.\n' +
      '- Falência dos circuitos inibitórios fisiológicos:\n' +
      '  - Fisiologia normal: motoneurônio alfa ativa as células de Renshaw, as quais liberam glicina para inibir os motoneurônios dos músculos antagonistas (inibição recíproca) e limitar temporalmente a contração (auto-inibição recorrente).\n' +
      '  - Patologia no tétano: os motoneurônios alfa perdem seu mecanismo de freio motor fisiológico por desativação inibitória completa.\n' +
      '- Disparo motor ininterrupto: sem oposição inibitória, os estímulos excitatórios glutamatérgicos originados do córtex, do tronco encefálico e das aferências sensitivas periféricas provocam descargas eferentes contínuas e sustentadas de alta frequência.\n' +
      '- Co-contração agonista-antagonista: como agonistas e antagonistas contraem simultaneamente com força máxima, o membro perde a capacidade de flexão e adota rigidez cadavérica em extensão forçada.',

    tabelaClassificacaoGravidadeBurkittZitzl: {
      caption: 'Tabela 3 — Sistema de Classificação de Gravidade Clínica Canina de Burkitt / Zitzl',
      headers: [
        'Classe de Gravidade',
        'Critérios Clínicos Neurológicos e Sistêmicos',
        'Status de Deambulação',
        'Comprometimento Autonômico / Respiratório',
        'Sobrevida Documentada e Prognóstico (Zitzl et al., 2022)',
      ],
      rows: [
        [
          'Classe I (Leve)',
          'Sinais faciais isolados (risus sardonicus, trismo leve, protrusão de 3ª pálpebra) ou hipersensibilidade sensorial discreta',
          'Ambulatório independente (deambula com marcha rígida)',
          'Ausente; ventilação e sinais vitais normais',
          'Sobrevida > 90%; prognóstico excelente com tratamento básico',
        ],
        [
          'Classe II (Moderada)',
          'Rigidez muscular generalizada nos 4 membros ou disfagia moderada associada aos sinais da Classe I',
          'Ambulatório com dificuldade (marcha em cavalete ou apoio esternal)',
          'Ausente; sem disautonomia hemodinâmica',
          'Sobrevida ~80–85%; recuperação favorável sob monitoramento',
        ],
        [
          'Classe III (Grave)',
          'Tetraplegia espástica com recumbência lateral obrigatória, espasmos tetânicos paroxísticos induzidos por estímulos',
          'Não-ambulatória (recumbente rígido)',
          'Taquipneia por dor muscular; início de fadiga intercostal',
          'Sobrevida reduzida (~30–40%); risco iminente de evolução para Classe IV',
        ],
        [
          'Classe IV (Crítica / Terminal)',
          'Critérios da Classe III associados a disautonomia grave (arritmias, hipertensão/hipotensão) ou falência respiratória',
          'Não-ambulatória (recumbente com crises)',
          'Bloqueios AV, paradas sinusais, laringoespasmo, acidose respiratória (PaCO2 > 50)',
          'Mortalidade próxima a 100% sem ventilação mecânica intensiva de UTI',
        ],
      ],
    },
  },

  pathophysiology: {
    mecanismoDaRigidezTonicaVsEspasmos:
      'Diferenciação motora: rigidez tônica basal vs espasmos paroxísticos:\n' +
      '- Rigidez muscular tônica contínua:\n' +
      '  - Mecanismo fisiopatológico: decorre da perda contínua e basal da inibição glicinérgica e GABAérgica nos circuitos motores medulares, mantendo os motoneurônios alfa e gama disparando impulsos ininterruptos para as placas motoras.\n' +
      '  - Expressão clínica: hipertonia sustentada mantém as articulações travadas em extensão máxima, caracterizando a clássica "postura em cavalete" (sawhorse stance).\n' +
      '- Espasmos tetânicos reflexos paroxísticos:\n' +
      '  - Mecanismo fisiopatológico: contrações musculares súbitas, paroxísticas, violentas e extremamente dolorosas sobrepostas à rigidez de base.\n' +
      '  - Gatilhos aferentes sensitivos periféricos:\n' +
      '    - Estímulos auditivos: palmas, portas batendo, ruídos de instrumentos metálicos na enfermaria\n' +
      '    - Estímulos visuais: iluminação ambiente intensa, flashes luminosos\n' +
      '    - Estímulos proprioceptivos e táteis: toque cutâneo, palpação, venopunção e movimentação no leito\n' +
      '  - Circuito aberrante: sem modulação inibitória, o impulso sensorial sofre amplificação nos circuitos internunciais, propagando-se em cascata para múltiplos motoneurônios e deflagrando contração tetânica maciça de todo o corpo com opistótono agudo.',

    sinaisCranianosRisusSardonicusETrismo:
      'Comprometimento dos núcleos cranianos no tronco encefálico:\n' +
      '- Envolvimento do nervo facial (NC VII) e risus sardonicus:\n' +
      '  - A hiperatividade crônica do nervo facial induz contração tônica e simétrica de todos os músculos da mímica facial.\n' +
      '  - Manifestações: retração caudal das comissuras labiais com dentes expostos, enrugamento marcado da fronte e orelhas tracionadas eretas e aproximadas na linha média ("sorriso sarcástico").\n' +
      '- Envolvimento do nervo trigêmeo (NC V) e trismo mandibular:\n' +
      '  - O hipertonus dos ramos motores mandibulares do trigêmeo mantém os potentes músculos mastigatórios (masseter e temporal) em contração espástica contínua, impedindo a abertura da boca (trismo / lockjaw).\n' +
      '  - Implicações clínicas: bloqueia a apreensão e mastigação de alimentos, inviabiliza medicações orais e transforma o paciente em via aérea difícil de altíssimo risco.\n' +
      '- Retração ocular e protrusão de terceira pálpebra:\n' +
      '  - A retração espástica do músculo retrator do bulbo ocular promove enoftalmia bilateral acentuada.\n' +
      '  - A perda de volume na órbita força as terceiras pálpebras (membranas nictitantes) a protruírem passivamente sobre as córneas, comumente acompanhadas de miose pupilar reflexa.',

    preservacaoDaConscienciaEEstimuloSensorial:
      'Preservação estrita do nível de consciência e imperativo humanitário:\n' +
      '- Consciência e lucidez intactas: a tetanospasmina não atinge nem compromete o córtex cerebral consciente nem a formação reticular ativadora ascendente.\n' +
      '- Percepção sensorial de dor extrema: o cão ou gato permanece perfeitamente consciente, lúcido, atento ao ambiente e plenamente capaz de sentir a dor extrema decorrente das cãibras musculares contínuas e dos espasmos violentos.\n' +
      '- Terror psíquico e encarceramento motor: o animal expressa sofrimento psíquico, ansiedade intensa e terror frente aos estímulos sonoros e visuais que compreende, mas não consegue emitir resposta motora coordenada de esquiva devido ao travamento muscular esquelético.\n\n' +
      'CONDUTA ÉTICA E HUMANITÁRIA OBRIGATÓRIA:\n' +
      '- Fornecer analgesia vigorosa com opioides, sedação ansiolítica contínua e isolamento sensorial rigoroso em quarto escuro e silencioso.',

    disautonomiaAutonomicaEArritmias:
      'Disautonomia autonômica e tempestade simpática (Classe IV de Burkitt/Zitzl):\n' +
      '- Ascensão central da toxina: a tetanospasmina ascende aos centros autonômicos hipotalâmicos, aos núcleos do trato solitário e aos cornos intermediolaterais da medula espinhal, bloqueando a inibição sináptica do sistema nervoso autônomo simpático e parassimpático.\n' +
      '- Tempestade catecolaminérgica: liberação maciça e desregulada de epinefrina e norepinefrina circulantes alternando com episódios aberrantes de hiperatividade vagal.\n' +
      '- Instabilidade hemodinâmica paroxística:\n' +
      '  - Crises de hipertensão arterial sistêmica súbita alternando com colapso hipotensivo severo\n' +
      '  - Taquicardia sinusal intensa alternando com bradicardia sinusal severa\n' +
      '  - Arritmias ventriculares instáveis, bloqueios atrioventriculares (BAV de 2º e 3º grau) e paradas sinusais intermitentes\n' +
      '  - Sudorese plantar profusa nos coxins\n' +
      '- Hipertermia maligna por atividade muscular contínua: constitui um dos maiores preditores de colapso circulatório e morte súbita na UTI.',

    cincoViasDeFalenciaRespiratoriaEAsfixia:
      'Cinco vias sincronizadas de insuficiência respiratória e asfixia (Guedra et al., 2021):\n' +
      'A insuficiência respiratória aguda e a asfixia constituem o principal mecanismo fisiopatológico de óbito no tétano canino (acometendo mais de 26% dos cães hospitalizados), operando por cinco vias anatômicas e funcionais simultâneas:\n' +
      '- 1. Laringoespasmo agudo: espasmo tetânico súbito da musculatura adutora intrínseca da laringe (inervada pelo nervo laríngeo recorrente), ocluindo totalmente a rima glótica e deflagrando obstrução de vias aéreas superiores de alto risco.\n' +
      '- 2. Rigidez torácica intercostal: contração espástica sustentada dos músculos intercostais reduz a complacência da caixa torácica a níveis críticos, impedindo a excursão inspiratória expansiva.\n' +
      '- 3. Espasmo e fadiga diafragmática: o diafragma perde a capacidade de ciclo respiratório coordenado, gerando hipoventilação alveolar grave com colapso de volume corrente e retenção letal de PaCO2.\n' +
      '- 4. Broncoaspiração por disfagia faringoesofágica: a perda de deglutição coordenada associada a refluxo salivar culmina em aspiração cranioventral maciça e pneumonia necrotizante.\n' +
      '- 5. Megaesôfago transitório e hérnia hiatal funcional: tração diafragmática espástica e disautonomia provocam dilatação esofágica, estase e refluxo gastroesofágico silencioso.',

    complicacoesGastroesofagicasUrinariasEOrtopedicas:
      'Repercussões gastroesofágicas, urinárias e musculoesqueléticas:\n' +
      '- Trato gastrointestinal:\n' +
      '  - Disfunção autonômica e hipertonia esofágica culminam em dilatação e estase esofágica (megaesôfago induzido por tétano).\n' +
      '  - Atonia gástrica com refluxo gastroesofágico severo e constipação intestinal por íleo funcional adinâmico e decúbito prolongado.\n' +
      '- Trato urinário:\n' +
      '  - Hipertonia espástica do esfíncter uretral externo somada à disfunção autonômica e à impossibilidade biomecânica de adotar a postura de micção deflagram retenção urinária aguda severa.\n' +
      '  - Risco de atonia detrusora miogênica permanente por sobredistensão e infecções bacterianas ascendentes graves (Dussaux et al., 2024 relataram 4 gatos com retenção urinária severa, exigindo cateterismo e esfinterotomia em caso crônico).\n' +
      '- Aparelho musculoesquelético:\n' +
      '  - A força monumental da co-contração simultânea de músculos agonistas e antagonistas exerce torques mecânicos brutais sobre tendões e cápsulas articulares.\n' +
      '  - Lesões ortopédicas secundárias: luxações articulares espontâneas (luxação coxofemoral em cães e gatos, luxação patelar e tarsal), avulsões de tuberosidades ósseas e fraturas vertebrais ou femorais patológicas.',
  },

  clinicalSignsPathophysiology: {
    neuromuscularEFacial:
      'Manifestações neuromusculares e craniofaciais:\n' +
      '- Período de início: manifesta-se tipicamente entre 5 e 10 dias após o trauma, iniciando-se de forma focal ou generalizada.\n' +
      '- Marcha e postura canina:\n' +
      '  - Marcha rígida, curta e insegura com redução drástica da flexão articular.\n' +
      '  - Evolução rápida para a "postura em cavalete" (sawhorse stance): quatro membros fixos em hiperextensão forçada, cabeça e pescoço estendidos e cauda ereta e rígida em "haste de bomba" (pump-handle tail).\n' +
      '- Alterações craniofaciais patognomônicas:\n' +
      '  - Trismo mandibular: incapacidade total de abrir a mandíbula para alimentação ou exame clínico.\n' +
      '  - Risus sardonicus: retração espástica simétrica das comissuras labiais com dentes expostos e enrugamento marcado da fronte.\n' +
      '  - Enoftalmia bilateral acentuada com protrusão bilateral da terceira pálpebra cobrindo as córneas.\n' +
      '  - Orelhas tracionadas eretas e aproximadas na linha média.\n' +
      '- Reflexos espinhais e reatividade paroxística:\n' +
      '  - Hiperreflexia miotática acentuada (patelar e tibial cranial) com clônus articular frequente.\n' +
      '  - Espasmos tetânicos paroxísticos com rigidez em opistótono durando de segundos a vários minutos disparados ao menor estímulo sonoro, luminoso ou tátil.',

    respiratorioEAutonomico:
      'Sinais respiratórios e disautonomia cardiovascular de UTI:\n' +
      '- Comprometimento da mecânica respiratória:\n' +
      '  - Taquipneia superficial compensatória associada à amplitude torácica severamente limitada pela rigidez intercostal.\n' +
      '  - Estridor inspiratório grave por laringoespasmo funcional oclusivo.\n' +
      '  - Ausculta pulmonar: sons broncovesiculares ásperos progredindo para estertores úmidos difusos e crepitações na vigência de pneumonia por aspiração secundária.\n' +
      '- Desregulação autonômica e cardiovascular:\n' +
      '  - Sudorese plantar profusa nos coxins palmares e plantares.\n' +
      '  - Labilidade pressórica: alternância paroxística de picos hipertensivos e colapso hipotensivo severo.\n' +
      '  - Arritmias cardíacas: taquicardias supraventriculares com FC > 180–220 bpm alternando com bradiarritmias sinusais e bloqueios atrioventriculares avançados.\n' +
      '- Hipertermia não-pirógena:\n' +
      '  - Elevação progressiva da temperatura corporal (> 40,5 a 41,5°C) decorrente do gasto metabólico colossal da contração muscular ininterrupta, e não por termorregulação pirógena clássica.',

    gastrointestinalEUrinario:
      'Manifestações gastrointestinais e urológicas:\n' +
      '- Trato gastrointestinal e esôfago:\n' +
      '  - Ptialismo espesso: salivação profusa contínua por inabilidade mecânica de deglutir com a mandíbula travada pelo trismo.\n' +
      '  - Disfagia faríngea mecânica e anorexia completa decorrente da impossibilidade de apreensão de alimentos.\n' +
      '  - Regurgitação esofágica frequente de conteúdo aquoso e alimentar por megaesôfago induzido por disfunção autonômica.\n' +
      '  - Constipação fecal grave por íleo funcional autonômico e decúbito prolongado.\n' +
      '- Trato urinário e retenção:\n' +
      '  - Bexiga urinária de grandes dimensões, excessivamente distendida, rígida e dolorosa à palpação abdominal.\n' +
      '  - Retenção urinária aguda decorrente do espasmo do esfíncter uretral estriado e inibição da micção reflexa voluntária.\n' +
      '  - Risco crítico de ruptura vesical, atonia miogênica e uremia se não desobstruída por cateterismo urinário profilático.',

    sequelaSonoRemCpRBD:
      'Sequela neurológica funcional: distúrbio comportamental do sono REM (cpRBD pós-tétano):\n' +
      'Evidência pioneira de Shea et al. (2018) em 61 cães recuperados da afecção:\n' +
      '- Incidência na coorte: pelo menos 46% dos cães sobreviventes desenvolveram distúrbio clinicamente provável do sono REM (cpRBD pós-tétano).\n' +
      '- Semiologia durante o sono profundo:\n' +
      '  - Ausência patológica da atonia muscular fisiológica que caracteriza o estágio de sono REM.\n' +
      '  - Movimentos violentos de corrida no leito, pedalagem, tremores, espasmos mioclônicos e vocalizações/latidos altos enquanto dormem.\n' +
      '- Pistas diagnósticas distintivas com crises epilépticas:\n' +
      '  - Ao serem acordados pelo tutor, os cães despertam imediatamente lúcidos, sem qualquer período pós-ictal, amaurose ou desorientação.\n' +
      '  - Diferencia-se categoricamente de crises convulsivas noturnas verdadeiras.\n' +
      '- Manejo terapêutico e evolução:\n' +
      '  - Anticonvulsivantes tradicionais são ineficazes e desnecessários nessa sequela.\n' +
      '  - Evolução favorável: 43% dos casos resolvem espontaneamente dentro de 6 meses pós-alta hospitalar; os tutores devem ser tranquilizados quanto ao caráter benigno.',
  },

  diagnosis: {
    criteriosDiagnosticosPresuntivosEClinicos:
      'Pilares do diagnóstico clínico e presuntivo:\n' +
      'O diagnóstico do tétano em cães e gatos é essencialmente clínico e presuntivo, sustentado pela identificação inequívoca da tríade clássica:\n' +
      '- Tríade clínica canina clássica:\n' +
      '  1. Rigidez extensora persistente e hipertonia com hiperreflexia espinhal\n' +
      '  2. Espasmos paroxísticos disparados por estímulos sensoriais externos\n' +
      '  3. Sinais craniofaciais patognomônicos (trismo mandibular, risus sardonicus e protrusão bilateral de terceira pálpebra)\n' +
      '- Fenótipo felino característico (Dussaux et al., 2024):\n' +
      '  - Claudicação progressiva com rigidez espástica circunscrita a um único membro traumatizado\n' +
      '- Histórico epidemiológico compatível:\n' +
      '  - Ferida recente, trauma podal, avulsão de unha ou cirurgia prévia nas últimas 1 a 3 semanas\n' +
      '- Nível de consciência:\n' +
      '  - 100% alerta e responsivo, sem alteração cognitiva central\n\n' +
      'REGRA VITAL DE CONDUTA:\n' +
      '- Não se deve aguardar confirmação sorológica ou isolamento bacteriano para iniciar a terapia intensiva: qualquer atraso no isolamento ambiental e no início da antitoxina e dos antimicrobianos eleva exponencialmente a mortalidade por colapso ventilatório.',

    perfilLaboratorialCkAstLactatoEMioglobinuria:
      'Painel laboratorial de triagem e vigilância de lesão muscular:\n' +
      '- Hemograma completo:\n' +
      '  - Pode ser inteiramente normal ou exibir leucocitose neutrofílica madura por estresse glicocorticoide.\n' +
      '  - Neutrofilia com desvio à esquerda sugere supuração ativa ou coinfecção na ferida inoculatória.\n' +
      '- Creatina quinase (CK sérica) e AST:\n' +
      '  - CK marcadamente elevada (frequentemente > 1.000 a > 20.000 UI/L) na dependência direta da intensidade e cronicidade das contrações musculares espásticas.\n' +
      '  - Elevação proporcional concomitante de AST de origem muscular esquelética.\n' +
      '- Lactato sérico:\n' +
      '  - Elevação secundária ao metabolismo anaeróbio sustentado nas fibras musculares em espasmo e eventual hipóxia tecidual.\n' +
      '- Urinálise e mioglobinúria:\n' +
      '  - Urina com pigmentúria acastanhada escura e resultado positivo para sangue oculto na fita bioquímica (ortotolidina positiva).\n' +
      '  - Ausência de hemácias íntegras no sedimento urinário, confirmando mioglobinúria por rabdomiólise tetânica e risco iminente de lesão tubular renal aguda.',

    gasometriaArterialHipercapniaEOximetria:
      'Vigilância ventilatória na UTI: gasometria vs oximetria de pulso:\n' +
      '- Parâmetro de ouro: gasometria arterial ou venosa seriada:\n' +
      '  - Mensuração da pressão parcial de dióxido de carbono (PaCO2) e do pH sanguíneo permite a identificação precoce de hipoventilação alveolar por fadiga diafragmática ou rigidez intercostal antes que ocorra hipoxemia clínica descompensada.\n' +
      '  - PaCO2 > 45–50 mmHg: sinaliza acidose respiratória incipiente e fadiga da mecânica torácica.\n' +
      '  - PaCO2 > 55–60 mmHg com exaustão mecânica: critério mandatório e emergencial de intubação orotraqueal e suporte ventilatório mecânico invasivo.\n\n' +
      'ALERTA CRÍTICO SOBRE OXIMETRIA DE PULSO:\n' +
      '- A oximetria de pulso (SpO2) contínua é obrigatória, mas deve ser interpretada com extrema cautela, visto que a suplementação de oxigênio por fluxo livre mantém a SpO2 artificialmente normal enquanto o CO2 continua acumulando-se perigosamente no sangue.',

    diagnosticoMicrobiologicoCulturaPcrEBioensaios:
      'Investigação microbiológica e diagnósticos laboratoriais avançados:\n' +
      '- Cultura microbiológica anaeróbia da ferida:\n' +
      '  - O cultivo convencional de material de biópsia ou exsudato profundo requer meios de cultivo anaeróbios enriquecidos estritos e transporte sob anaerobiose absoluta.\n' +
      '  - O isolamento é frequentemente falso-negativo devido ao baixo número de bacilos viáveis na ferida ou uso prévio de antibióticos (no estudo felino de Dussaux et al., 2024, a cultura foi positiva em 3 de 3 gatos testados em condições especializadas, mas isso não representa sensibilidade universal).\n' +
      '- PCR molecular (gene tent e 16S rRNA):\n' +
      '  - Técnicas de PCR convencional ou em tempo real voltadas à detecção do gene da tetanospasmina (gene tent) e sequências ribossomais 16S de C. tetani exibem altíssima sensibilidade analítica (Popoff, 2020), constituindo excelente suporte confirmatório em biópsias da ferida.\n' +
      '- Bioensaios em camundongos (mouse bioassay):\n' +
      '  - A detecção direta da toxina no soro através de bioensaio de letalidade em camundongos é o padrão ouro experimental, mas é restrita a laboratórios de referência em biossegurança e raramente disponível na rotina clínica veterinária.',

    eletrodiagnosticoEmgDoubletsERadiologiaToracica:
      'Eletrodiagnóstico funcional e radiologia torácica:\n' +
      '- Eletromiografia de agulha (EMG):\n' +
      '  - Nos casos de tétano focal ou apresentações atípicas em membros, o exame eletromiográfico fornece confirmação funcional objetiva de perda de inibição glicinérgica.\n' +
      '  - Conforme demonstrado no relato clássico de De Risio et al. (2006), o traçado eletromiográfico do músculo em repouso revela descargas espontâneas contínuas de potenciais de ação de unidade motora, caracterizadas pela presença de potenciais repetitivos emparelhados em alta frequência ("doublets" de motoneurônios) e pela co-contração elétrica simultânea em grupos musculares agonistas e antagonistas, confirmando ausência de inibição recíproca.\n' +
      '- Radiografia torácica em três projeções (lateral direita, lateral esquerda e ventrodorsal):\n' +
      '  - Deve ser realizada na admissão e repetida sempre que houver taquipneia ou febre.\n' +
      '  - Objetivos específicos: rastrear megaesôfago induzido por disfunção autonômica e detectar precocemente infiltrados alveolares cranioventrais compatíveis com pneumonia por broncoaspiração.',

    tabelaPainelDiagnosticoLaboratorialEEletrofisiologico: {
      caption: 'Tabela 4 — Painel Diagnóstico e Investigação Laboratorial / Eletrofisiológica no Tétano',
      headers: [
        'Exame / Parâmetro',
        'Achados Típicos no Tétano',
        'Mecanismo Fisiopatológico Subjacente',
        'Significado Clínico e Tomada de Decisão',
      ],
      rows: [
        [
          'Hemograma Completo',
          'Normal ou leucocitose neutrofílica madura/desvio à esquerda',
          'Inflamação tecidual secundária na ferida ou estresse glicocorticoide',
          'Hemograma normal NÃO descarta tétano; neutrofilia sugere supuração na porta de entrada',
        ],
        [
          'Creatina Quinase (CK Sérica)',
          'Marcadamente elevada (1.000 a > 20.000 UI/L)',
          'Injúria da membrana do sarcolema por contração contínua e espasmos',
          'Indica extensão da rabdomiólise e orienta fluidoterapia protetora contra nefropatia por pigmento',
        ],
        [
          'Urinálise (Fita e Sedimento)',
          'Urina escura/marrom; fita fortemente positiva para "sangue" sem hemácias',
          'Filtração glomerular de mioglobina monomérica livre liberada do músculo',
          'Confirma mioglobinúria; risco de lesão tubular renal em urina ácida concentrada',
        ],
        [
          'Gasometria (PaCO2 e pH)',
          'PaCO2 > 45 a 60 mmHg com acidose respiratória progressiva',
          'Hipoventilação alveolar por rigidez intercostal e fadiga diafragmática',
          'Parâmetro de ouro para indicar intubação e ventilação mecânica antes da parada respiratória',
        ],
        [
          'Radiografia Torácica (3 Projeções)',
          'Dilatação esofágica funcional com gás (megaesôfago) e infiltrado cranioventral',
          'Disfunção autonômica esofágica e pneumonia por broncoaspiração de saliva',
          'Guedra et al. (2021) comprovaram que complicação respiratória eleva mortalidade para 85,7%',
        ],
        [
          'Eletromiografia (EMG)',
          'Descargas contínuas espontâneas, "doublets" e co-ativação agonista-antagonista',
          'Perda de inibição glicinérgica das células de Renshaw nos motoneurônios',
          'Confirma o diagnóstico em formas focais ou membros com claudicação espástica atípica',
        ],
        [
          'Cultura Anaeróbia da Ferida',
          'Isolamento de bacilos Gram-positivos anaeróbios estritos com esporo terminal',
          'Presença viável de Clostridium tetani no foco tecidual desvitalizado',
          'Sensibilidade clínica baixa; cultura negativa NÃO descarta o diagnóstico de tétano',
        ],
      ],
    },

    tabelaMonitoramentoVentilatorioEManejoViaAerea: {
      caption: 'Tabela 5 — Protocolo de Monitoramento Ventilatório e Manejo de Via Aérea Difícil no Tétano',
      headers: [
        'Parâmetro / Sinal de Alerta',
        'Estágio Compensado / Leve',
        'Estágio de Risco / Moderado',
        'Falência Ventilatória / Intervenção Imediata de UTI',
      ],
      rows: [
        [
          'Mecânica e Padrão Respiratório',
          'Respiração toracoabdominal coordenada e suave',
          'Taquipneia superficial compensatória; excursão torácica rígida',
          'Padrão paradoxal abdominal, respiração agônica ou apneia espástica',
        ],
        [
          'Dióxido de Carbono (PaCO2 / ETCO2)',
          'PaCO2 35 a 45 mmHg (normocapnia)',
          'PaCO2 46 a 55 mmHg (retenção progressiva de CO2)',
          'PaCO2 > 55–60 mmHg com acidose respiratória (pH < 7,20)',
        ],
        [
          'Integridade da Via Aérea Superior',
          'Ausência de estridor; salivação mínima controlada',
          'Estridor inspiratório discreto; ptialismo abundante acumulado',
          'Laringoespasmo oclusivo total com asfixia aguda e trismo travado',
        ],
        [
          'Conduta para Manejo de Via Aérea',
          'Monitoramento seriado; cabeceira elevada a 30°',
          'Oxigenoterapia suave por fluxo livre; aspiração orofaríngea delicada',
          'Sedação de sequência rápida com anestésico, intubação orotraqueal ou traqueostomia',
        ],
        [
          'Indicação de Ventilação Mecânica',
          'Não indicada',
          'Em espera / preparação do ventilador à beira do leito',
          'Ventilação mecânica controlada obrigatória (pressão de pico < 20 cmH2O, PEEP 5)',
        ],
      ],
    },
  },

  treatment: {
    quatroObjetivosTerapeuticosFundamentais:
      'Quatro pilares fisiopatológicos e operacionais prioritários:\n' +
      'O manejo terapêutico contemporâneo do tétano em cães e gatos estrutura-se de forma inegociável em torno de quatro objetivos integrados:\n' +
      '- 1. Interromper a produção contínua de nova tetanospasmina: erradicação cirúrgica meticulosa e farmacológica do Clostridium tetani no foco tecidual primário.\n' +
      '- 2. Neutralizar imediatamente a toxina circulante livre: administração precoce de antitoxina tetânica equina para ligar frações ainda no plasma ou fluido intersticial antes de sua internalização neuronal.\n' +
      '- 3. Controlar a hipertonia e os espasmos paroxísticos: proteção sensorial rigorosa e relaxamento farmacológico escalonado para prevenir asfixia, fraturas e exaustão metabólica.\n' +
      '- 4. Cuidados intensivos e enfermagem contínua de UTI: suporte prolongado por 3 a 6 semanas para manter hidratação, nutrição enteral, débito urinário e prevenir escaras ou atelectasias até a regeneração espontânea das sinapses neurais e das proteínas VAMP clivadas.',

    desbridamentoCirurgicoLavagemSemH2O2:
      'Abordagem cirúrgica da ferida e assepsia moderna:\n' +
      '- Momento oportuno da intervenção:\n' +
      '  - Realizar a exploração cirúrgica somente após a administração prévia de antimicrobiano e sedação adequada para evitar que manipulações teciduais forcem toxina livre para a circulação sistêmica.\n' +
      '- Técnica cirúrgica e desbridamento:\n' +
      '  - Procedimento realizado sob anestesia ou sedação profunda em ambiente silencioso.\n' +
      '  - Excisão de todo tecido necrótico, desvitalizado, crostas hemáticas espessas e corpos estranhos (farpas de madeira, espinhos, restos de solo) com margens limpas.\n' +
      '  - Abertura ampla de feridas puntiformes para eliminar recessos anaeróbios profundos.\n' +
      '- Irrigação mecânica sob pressão:\n' +
      '  - Lavagem copiosa com grandes volumes (500 a 1.000 mL) de solução salina a 0,9% estéril ou Ringer Lactato utilizando seringa de 20 mL com cateter 18G para gerar pressão de lavagem ideal (7 a 8 psi) sem lesão tecidual.\n\n' +
      'CONTRAINDICAÇÃO FORMAL:\n' +
      '- Reiterando as diretrizes atualizadas de cicatrização (MSD Veterinary Manual): é estritamente contraindicado o uso de peróxido de hidrogênio (H2O2), antissépticos concentrados ou substâncias cáusticas na ferida; a área deve ser mantida aberta para drenagem e cicatrização por segunda intenção.',

    antimicrobianosMetronidazolVsPenicilinaG:
      'Estratégia antimicrobiana bactericida para Clostridium tetani:\n' +
      '- Primeira escolha consensual: Metronidazol\n' +
      '  - Posologia: 10 a 15 mg/kg por via oral ou intravenosa lenta (diluída) a cada 8 a 12 horas durante 10 a 14 dias em cães e gatos (Nelson & Couto; BSAVA Formulary 10e; Dussaux et al., 2024).\n' +
      '  - Mecanismo e vantagens: penetra com excelência no tecido necrótico e anaeróbio, exercendo rápida ação bactericida sem exercer efeito antagônico sobre neurotransmissores inibitórios centrais.\n' +
      '  - Alerta de segurança: o uso prolongado de metronidazol em doses elevadas pode desencadear neurotoxicidade vestibular (nistagmo, ataxia vestibular e espasmos mioclônicos); monitorar rigorosamente e suspender se surgirem sinais vestibulares.\n' +
      '- Alternativa clássica: Penicilina G\n' +
      '  - Posologia: Penicilina G cristalina (20.000 a 50.000 UI/kg IV a cada 6 a 12 horas) ou Penicilina G procaína (20.000 a 40.000 UI/kg IM q12–24h).\n' +
      '  - Ressalva neurológica: penicilinas em altas concentrações exercem efeito antagônico sobre receptores GABA-A no SNC, podendo teoricamente amplificar a excitabilidade neuronal em pacientes tetânicos.\n' +
      '- Alternativas parenterais de amplo espectro em choque ou sepse: ampicilina-sulbactam (30 mg/kg IV q8h) ou amoxicilina com clavulanato de potássio.',

    antitoxinaTetanicaEquinaIndicacoesELimites:
      'Antitoxina Tetânica Equina (ATS) e limites farmacológicos:\n' +
      '- Mecanismo e papel biológico:\n' +
      '  - Imunoglobulinas policlonais heterólogas de origem equina direcionadas contra a tetanospasmina.\n' +
      '  - Seu papel terapêutico é exclusivamente a neutralização da toxina tetânica livre que ainda circula no sangue ou no leito extracelular e que ainda não penetrou nos axônios motores periféricos.\n' +
      '- Limite farmacológico crucial:\n' +
      '  - A antitoxina não possui capacidade de atravessar a barreira hematoencefálica nem de reverter a toxina que já sofreu endocitose ou que já clivou as proteínas sinápticas no SNC: o paciente não melhora imediatamente após a infusão do soro.\n' +
      '- Dose e via de administração:\n' +
      '  - Dose descrita: 100 a 1.000 UI/kg (sendo usualmente empregada a faixa de 100 a 500 UI/kg IV lenta diluída em salina ou SC em dose única precoce).\n' +
      '- Teste de sensibilidade intradérmica obrigatório:\n' +
      '  - Devido ao risco de anafilaxia contra proteínas equinas, realizar teste prévio (0,1 a 0,2 mL de diluição 1:10 em salina estéril SC ou ID, observando o sítio por 15 a 30 minutos em busca de eritema ou pápula).\n\n' +
      'ALERTA FARMACOLÓGICO EM FELINOS:\n' +
      '- O BSAVA Small Animal Formulary 10e alerta especificamente para checar o rótulo e evitar formulações de antitoxina contendo fenol como conservante pelo risco de toxicidade felina grave.\n' +
      '- Dados de Zitzl et al. (2022): estudos retrospectivos não demonstraram aumento estatisticamente significante na sobrevida de cães tratados com antitoxina vs controles, mas seu uso é biologicamente recomendado precocemente em casos em rápida progressão.',

    controleDeEspasmosAmbienteEscuroEMethocarbamol:
      'Isolamento sensorial e controle farmacológico central de espasmos:\n' +
      '- Protocolo de privação sensorial absoluta (Pilar 1):\n' +
      '  - Instalação imediata em quarto escuro silencioso com portas de isolamento acústico vedadas contra ruídos externos e luz solar.\n' +
      '  - Manipulação agrupada estrita (agrupar exames, medicações e curativos no mesmo momento para diminuir estímulos táteis).\n' +
      '  - Redução máxima de alarmes sonoros na UTI e colocação delicada de algodão nos canais auditivos do paciente.\n' +
      '- Methocarbamol (Relaxante muscular de ação central de primeira linha, Plumb 10e, BSAVA 10e):\n' +
      '  - Mecanismo: reduz a transmissão reflexa polissináptica medular sem produzir bloqueio neuromuscular periférico direto.\n' +
      '  - Dose de manutenção: 22 a 44 mg/kg por via oral ou intravenosa lenta a cada 8 horas (limite máximo acumulado de 330 mg/kg/dia).\n' +
      '  - Manejo de crises agudas: em episódios de espasmos paroxísticos graves agudos com risco de asfixia, o Plumb’s Veterinary Drug Handbook prescreve doses de resgate de 55 a 110 mg/kg (podendo chegar a 220 mg/kg) IV administradas lentamente até relaxamento motor satisfatório.',

    benzodiazepinicosAcepromazinaEMagnesio:
      'Sedação sinérgica, modulação autonômica e terapia de resgate:\n' +
      '- Benzodiazepínicos (potencializadores alostéricos de GABA):\n' +
      '  - Midazolam: 0,1 a 0,4 mg/kg IV ou IM q2–4h, ou em infusão contínua CRI na taxa de 0,1 a 0,5 mg/kg/h; excelente primeira linha em pacientes internados.\n' +
      '  - Diazepam: 0,2 a 0,5 mg/kg IV lento titulado conforme resposta clínica.\n\n' +
      'CONTRAINDICAÇÃO FORMAL EM FELINOS:\n' +
      '- O diazepam por via oral repetida é formalmente contraindicado em gatos pelo risco letal de necrose hepática aguda fulminante idiossincrática.\n\n' +
      '- Acepromazina:\n' +
      '  - Dose: 0,01 a 0,05 mg/kg IV ou IM q4–8h em cães e 0,01 a 0,03 mg/kg q6–8h em gatos.\n' +
      '  - Ação: reduz a ansiedade central e a hipersensibilidade reflexa a estímulos sonoros; contraindicada em hipotensão ou choque (bloqueio alfa-1 adrenérgico).\n' +
      '- Sulfato de Magnésio (MgSO4) em casos graves e disautonomia (Papageorgiou et al., 2021; Moretti et al., 2024):\n' +
      '  - Mecanismo: o íon magnésio compete com o cálcio nos canais pré-sinápticos dependentes de voltagem, inibindo a liberação de acetilcolina na placa motora e modulando a tempestade adrenérgica autonômica.\n' +
      '  - Protocolo: dose de ataque de 70 mg/kg IV infundida em 30 minutos seguida de CRI contínua de 10 a 30 mg/kg/h (10 a 20 mg/kg/h em gatos) sob monitoramento cardiorrespiratório e mensuração seriada de cálcio ionizado e magnésio.\n' +
      '- Dexmedetomidina em microdose CRI:\n' +
      '  - Taxa de 0,5 a 1,5 mcg/kg/h em infusão contínua para controle de tempestade adrenérgica simpática e hipertensão paroxística.',

    suporteIntensivoViaAereaNutricaoEEnfermagem:
      'Cuidados contínuos de enfermagem de UTI e medidas de suporte prolongado (3 a 6 semanas):\n' +
      '- Posicionamento e prevenção de escaras de decúbito:\n' +
      '  - Acomodação sobre colchão pneumático anti-escaras com troca de decúbito estrita a cada 4 horas ininterruptamente para evitar necrose cutânea e atelectasia pulmonar hipostática.\n' +
      '- Manejo e higiene da via aérea:\n' +
      '  - Inspeção da cavidade oral e aspiração delicada de secreções viscosas a cada 4 horas mantendo a cabeceira elevada a 30 graus.\n' +
      '  - Kit de emergência para via aérea (laringoscópio, tubos endotraqueais e instrumental estéril de traqueostomia) mantido obrigatoriamente à beira do leito.\n' +
      '- Suporte nutricional enteral precoce:\n' +
      '  - VETO FORMAL: a alimentação oral forçada é terminantemente proibida devido ao trismo e alto risco de broncoaspiração fatal.\n' +
      '  - Passagem precoce de sonda nasoesofágica ou instalação de sonda de esofagostomia sob breve sedação (Zitzl et al., 2022 demonstraram que 57% dos cães receberam nutrição por sonda enteral), calculando-se o aporte para suprir a RER diária de forma fracionada.\n' +
      '- Cuidados vesicais e oftalmológicos:\n' +
      '  - Instalação de cateter urinário estéril com sistema coletor fechado em pacientes com retenção funcional, monitorando débito urinário horário.\n' +
      '  - Aplicação de colírios lubrificantes à base de hialuronato de sódio a cada 6 a 8 horas para prevenir ceratite por dessecação corneana.',

    tabelaFarmacoterapiaDeEmergenciaEUtiTetano: {
      caption: 'Tabela 6 — Farmacoterapia de Emergência e UTI no Tétano em Cães e Gatos',
      headers: [
        'Fármaco / Procedimento',
        'Mecanismo de Ação Proposto',
        'Dose e Via em Cães',
        'Dose e Via em Gatos',
        'Notas de Segurança e Contraindicações',
      ],
      rows: [
        [
          'Metronidazol',
          'Ação bactericida anaeróbia estrita; erradica formas vegetativas de C. tetani',
          '10 a 15 mg/kg IV lento (diluído) ou VO q8–12h por 10–14 dias',
          '10 a 15 mg/kg IV lento ou VO q8–12h por 10–14 dias',
          'Primeira escolha consensual; monitorar neurotoxicidade vestibular em uso prolongado',
        ],
        [
          'Antitoxina Tetânica Equina (ATS)',
          'Imunoglobulinas heterólogas que neutralizam tetanospasmina livre circulante',
          '100 a 500 UI/kg IV lento (diluída) ou SC dose única precoce',
          '100 a 500 UI/kg IV lento ou SC dose única precoce',
          'Não neutraliza toxina já internalizada no SNC; realizar teste ID; evitar fenol em gatos (BSAVA)',
        ],
        [
          'Methocarbamol',
          'Relaxante muscular esquelético de ação central (inibição polissináptica)',
          '22 a 44 mg/kg IV/VO q8h; crises agudas 55 a 110 mg/kg IV lento (máx 330 mg/kg/dia)',
          '22 a 44 mg/kg IV lento ou VO q8h titular ao efeito de relaxamento',
          'Plumb 10e; monitorar sedação e depressão respiratória se associado a opioides',
        ],
        [
          'Midazolam',
          'Agonista de receptor GABA-A; potencializa a inibição GABAérgica residual',
          '0,1 a 0,4 mg/kg IV/IM q2–4h ou infusão contínua CRI 0,1 a 0,5 mg/kg/h',
          '0,1 a 0,3 mg/kg IV/IM q2–4h ou CRI 0,1 a 0,3 mg/kg/h',
          'Excelente controle rápido de espasmos paroxísticos induzidos por estímulos táteis/sonoros',
        ],
        [
          'Diazepam',
          'Agonista alostérico GABA-A com potente miorrelaxamento central',
          '0,2 a 0,5 mg/kg IV lento titulado conforme resposta clínica',
          '0,2 a 0,5 mg/kg IV lento exclusivamente para uso hospitalar agudo',
          'Contraindicado uso oral repetido em gatos por risco letal de necrose hepática aguda idiossincrática',
        ],
        [
          'Acepromazina',
          'Fenotiazínico sedativo central; bloqueador alfa-adrenérgico e antiemético',
          '0,01 a 0,05 mg/kg IV ou IM q4–8h se paciente normotenso',
          '0,01 a 0,03 mg/kg IV ou IM q6–8h com extrema cautela hemodinâmica',
          'Reduz hipersensibilidade a estímulos auditivos; contraindicado em choque e hipotensão',
        ],
        [
          'Sulfato de Magnésio (MgSO4)',
          'Antagonista de canais de cálcio pré-sinápticos; inibe liberação de acetilcolina',
          'Ataque 70 mg/kg IV em 30 min seguido de CRI 10 a 30 mg/kg/h',
          'Ataque 70 mg/kg IV em 30 min seguido de CRI 10 a 20 mg/kg/h (Moretti 2024)',
          'Terapia de resgate para espasmos refratários e disautonomia; monitorar reflexos, Ca2+ e ECG',
        ],
        [
          'Dexmedetomidina',
          'Agonista alfa-2 adrenérgico com potente ação simpaticolítica e sedativa',
          '0,5 a 1,5 mcg/kg/h em infusão venosa contínua titulada',
          '0,5 a 1,0 mcg/kg/h em infusão venosa contínua titulada',
          'Excelente para controle de tempestade adrenérgica simpática; monitorar bradiarritmias',
        ],
      ],
    },
  },

  complications: {
    complicacoesCriticasRespiratoriasGuedra2021:
      'Evidência definitiva sobre impacto prognóstico respiratório (Guedra, Cortellini & Humm, 2021):\n' +
      'As complicações do tétano são severas e representam o verdadeiro ponto de inflexão na taxa de mortalidade de pacientes internados.\n\n' +
      'Dados de incidência e distribuição (Guedra et al., 2021 em 53 cães):\n' +
      '- Taxa global de complicações respiratórias: 26,4% dos pacientes desenvolveram complicações respiratórias graves.\n' +
      '- Tipos de comprometimento documentados:\n' +
      '  - Pneumonia por aspiração: 15% dos cães\n' +
      '  - Obstrução de via aérea superior por laringoespasmo: 9,4% dos cães\n' +
      '  - Associação concomitante de ambas as afecções: 1,9% dos cães\n\n' +
      'Impacto prognóstico brutal na sobrevida hospitalar:\n' +
      '- Cães livres de complicações respiratórias: sobrevida hospitalar excelente de 94,8% (37/39 cães).\n' +
      '- Cães que apresentaram falência de via aérea ou pulmonar: sobrevida despencou para catastróficos 14,3% (2/14 cães).\n\n' +
      'Outras complicações sistêmicas frequentes de UTI:\n' +
      '- (1) Tempestade disautonômica com paradas sinusais e hipotensão refratária\n' +
      '- (2) Hipertermia maligna por atividade muscular contínua\n' +
      '- (3) Retenção urinária aguda com distensão detrusora miogênica e infecção hospitalar\n' +
      '- (4) Desnutrição proteico-calórica acelerada\n' +
      '- (5) Úlceras de pressão isquêmicas em proeminências ósseas\n' +
      '- (6) Luxações articulares (coxofemoral) e fraturas vertebrais por estresse mecânico espástico de co-contração agonista-antagonista.',

    dezErrosFataisTetanoCaesGatos:
      'DEZ ERROS CLÁSSICOS E ARMADILHAS LETAIS NO DIAGNÓSTICO E MANEJO DO TÉTANO EM CÃES E GATOS:\n' +
      '- (1) Descartar o diagnóstico de tétano pela ausência de ferida aberta visível: em uma parcela expressiva dos pacientes (especialmente cães), a porta de entrada já cicatrizou, é microscópica, localiza-se na boca ou no leito ungueal.\n' +
      '- (2) Esperar tetraparesia espástica generalizada e fácies clássica no gato: 78% dos gatos acometidos apresentam formas focais ou multifocais limitadas a um único membro sem trismo ou risus sardonicus (Dussaux et al., 2024).\n' +
      '- (3) Confundir espasmos tetânicos paroxísticos com crises epilépticas verdadeiras: o paciente tetânico mantém a consciência lúcida e alerta durante o espasmo, e antiepilépticos corticais isolados falham em controlar a hiperatividade medular.\n' +
      '- (4) Lavar a ferida inoculatória com peróxido de hidrogênio (H2O2) com base em textos defasados: o peróxido de hidrogênio é citotóxico para fibroblastos e microcirculação, piora a necrose tecidual e retarda a cicatrização; a conduta moderna exige desbridamento mecânico e lavagem abundante com salina isotônica.\n' +
      '- (5) Prescrever antitoxina equina tardiamente esperando melhora neurológica imediata: a antitoxina neutraliza apenas toxina livre extracelular e não reverte a toxina que já clivou a sinaptobrevina no SNC.\n' +
      '- (6) Negligenciar o controle sensorial e manter o paciente em enfermaria barulhenta e iluminada: estímulos auditivos, luminosos e táteis disparam espasmos e laringoespasmo fatal por ausência de inibição glicinérgica medular.\n' +
      '- (7) Confiar cegamente na oximetria de pulso (SpO2) como indicador de ventilação adequada: a rigidez torácica e a fadiga diafragmática provocam retenção tóxica de dióxido de carbono (PaCO2 > 50–60 mmHg) muito antes de ocorrer queda na saturação de oxigênio.\n' +
      '- (8) Forçar alimentação oral em paciente com trismo ou disfagia funcional: a administração forçada de alimento na boca provoca broncoaspiração imediata e pneumonia com mortalidade de 85% em UTI.\n' +
      '- (9) Administrar diazepam oral repetido em felinos como relaxante muscular de longo prazo: diazepam por via oral em gatos acarreta risco de necrose hepática aguda fulminante idiossincrática.\n' +
      '- (10) Abandonar a monitorização cardiorrespiratória em paciente Classe II estável na admissão: cães com tétano podem sofrer progressão rápida de classe clínica nas primeiras 48 a 72 horas pós-hospitalização (Zitzl et al., 2022).',

    protocoloPlantaoTetano10Passos:
      'PROTOCOLO DE PLANTÃO: ABORDAGEM SEQUENCIAL EM 10 PASSOS DO TÉTANO NA EMERGÊNCIA E UTI:\n\n' +
      '1. Passo 1: Triagem e Proteção Sensorial Imediata\n' +
      '- Identificar rigidez extensora, trismo ou marcha espástica com consciência alerta.\n' +
      '- Transferir imediatamente o paciente para quarto escuro e silencioso com isolamento acústico e vedação luminosa (escuridão e privação sensorial rigorosa).\n\n' +
      '2. Passo 2: Avaliação da Permeabilidade de Via Aérea e Ventilação\n' +
      '- Inspecionar laringe, acúmulo de saliva e estridor inspiratório.\n' +
      '- Colher gasometria venosa ou arterial (avaliar PaCO2 e pH) e conectar oximetria e capnografia contínua.\n\n' +
      '3. Passo 3: Acesso Venoso Calibroso e Suporte Hemodinâmico\n' +
      '- Instalar cateter intravenoso periférico com o paciente sedado para evitar estímulos dolorosos de punção.\n' +
      '- Monitorar pressão arterial invasiva ou Doppler e ECG contínuo.\n\n' +
      '4. Passo 4: Miorrelaxamento Inicial e Controle de Crise\n' +
      '- Administrar Midazolam (0,2 a 0,4 mg/kg IV lento) associado a Methocarbamol (22 a 44 mg/kg IV lento, ou 55 a 110 mg/kg em crises severas) para abrandar espasmos e rigidez.\n\n' +
      '5. Passo 5: Erradicação Bacteriana Imediata com Metronidazol\n' +
      '- Iniciar Metronidazol 10 a 15 mg/kg IV diluído em infusão lenta de 30 minutos a cada 8 a 12 horas.\n\n' +
      '6. Passo 6: Desbridamento Cirúrgico e Lavagem da Ferida sem H2O2\n' +
      '- Sob relaxamento e analgesia, tricotomizar amplamente, desbridar tecido necrótico, abrir feridas puntiformes e lavar com 500 a 1.000 mL de salina a 0,9% sob pressão.\n\n' +
      '7. Passo 7: Teste de Sensibilidade e Antitoxina Tetânica Equina\n' +
      '- Realizar teste intradérmico (0,1 mL 1:10 SC); caso negativo, administrar 100 a 500 UI/kg de Antitoxina Tetânica Equina IV lenta diluída em salina por 30 a 60 minutos.\n\n' +
      '8. Passo 8: Radiografia Torácica e Instalação de Suporte Nutricional Enteral\n' +
      '- Realizar radiografia de tórax em 3 projeções (rastrear megaesôfago e pneumonia).\n' +
      '- Passar sonda nasoesofágica para início de dieta enteral calculada na taxa de RER diária com tórax elevado a 30°.\n\n' +
      '9. Passo 9: Manejo Vesical e Enfermagem de Decúbito\n' +
      '- Avaliar esvaziamento vesical e passar sonda uretral fechada se retenção.\n' +
      '- Posicionar em colchão pneumático com mudança rigorosa de decúbito a cada 4 horas e aplicar colírio lubrificante nos olhos.\n\n' +
      '10. Passo 10: Protocolo de Resgate para Casos Refratários e Disautonomia\n' +
      '- Se espasmos persistirem ou houver arritmias/tempestade simpática, iniciar Sulfato de Magnésio (MgSO4 bolo 70 mg/kg em 30 min seguido de CRI 10 a 30 mg/kg/h) ou Dexmedetomidina CRI.\n' +
      '- Manter ventilador mecânico e kit de traqueostomia preparados à beira do leito (ventilação mecânica invasiva ou traqueostomia emergencial se laringoespasmo oclusivo).',
  },

  prevention: {
    prevencaoCirurgicaAssepsiaECuidadosDeFeridas:
      'Assepsia cirúrgica e prevenção primária de feridas:\n' +
      '- Controle rigoroso de esterilização:\n' +
      '  - Intervenções eletivas (como ovariosalpingohisterectomias e orquiectomias) devem ser realizadas exclusivamente com materiais autoclavados em calor úmido sob pressão.\n' +
      '  - A "esterilização a frio" química em bandejas desinfetantes é insuficiente para inativar endósporos de Clostridium tetani.\n' +
      '- Manejo profilático de soluções de continuidade:\n' +
      '  - Qualquer ferimento penetrante por mordedura, corpos estranhos perfurantes, lesões de unha ou feridas contaminadas por solo deve ser prontamente atendido na clínica veterinária.\n' +
      '  - Procedimentos mandatórios: tricotomia ampla, desbridamento precoce de margens necrosadas e lavagem copiosa com solução salina isotônica estéril sob pressão moderada para restabelecer a vascularização e prevenir microambientes anaeróbios.',

    inexistenciaDeVacinacaoRotineiraEImunidadePosInfeccao:
      'Diretrizes vacinais e particularidades imunológicas:\n' +
      '- Diretrizes WSAVA Vaccination Guidelines (2024):\n' +
      '  - Ao contrário da medicina humana e da equina, a vacinação profilática rotineira contra o tétano NÃO é recomendada e nem preconizada para cães e gatos.\n' +
      '  - Justificativa: altíssima resistência biológica natural que carnívoros domésticos possuem frente à tetanospasmina e baixa incidência populacional da afecção.\n' +
      '- Ausência de imunidade esterilizante pós-infecção (Popoff, 2020):\n' +
      '  - A sobrevida ao tétano clínico NÃO garante imunidade protetora contra futuros episódios da doença.\n' +
      '  - A quantidade molecular de tetanospasmina necessária para deflagrar a paralisia espástica severa em um animal é tão diminuta que frequentemente não atinge o limiar antigênico indispensável para estimular a síntese de anticorpos IgG neutralizantes de memória.',

    orientacoesAosTutoresEMonitoramentoPosAlta:
      'Reabilitação funcional e orientações domiciliares pós-alta:\n' +
      '- Continuidade da fisioterapia motora:\n' +
      '  - Após a estabilização e recuperação da marcha independente na fase hospitalar (que tipicamente exige entre 3 e 6 semanas de internação), realizar fisioterapia motora ambulatorial com alongamentos passivos suaves e caminhadas assistidas em superfícies antiderrapantes para reverter o encurtamento miotendíneo e a hipotrofia muscular.\n' +
      '- Vigilância do distúrbio do sono REM (cpRBD pós-tétano, Shea et al., 2018):\n' +
      '  - Alertar e tranquilizar os tutores sobre a possibilidade de desenvolvimento do distúrbio comportamental do sono REM.\n' +
      '  - Caso o animal apresente movimentos involuntários de corrida, pedalagem e latidos durante o sono profundo sem desorientação ao acordar, trata-se de uma sequela funcional benigna e autolimitada que resolve espontaneamente na maioria dos casos em até 6 meses, não devendo ser confundida com crises epilépticas noturnas verdadeiras.',
  },

  references: [
    {
      id: 'dussaux-2024-feline-tetanus-multicentric',
      title: 'Clinical findings and outcome in feline tetanus: a multicentric retrospective study of 27 cases and review of the literature',
      authors: 'Dussaux A, D’Anjou MA, Benchekroun G, et al.',
      journal: 'Frontiers in Veterinary Science',
      year: 2024,
      volume: '11',
      pages: '1425917',
      doi: '10.3389/fvets.2024.1425917',
      relevance: 'Estudo multicêntrico internacional seminal demonstrando predomínio da forma focal/multifocal (78%), lesão prévia em 85%, uso de metronidazol e sobrevida ambulatorial de 92% em gatos.',
    },
    {
      id: 'zitzl-2022-canine-tetanus-42cases',
      title: 'Survival in canine tetanus – retrospective analysis of 42 cases (2006–2020)',
      authors: 'Zitzl J, Schuller S, Fischer A, et al.',
      journal: 'Frontiers in Veterinary Science',
      year: 2022,
      volume: '9',
      pages: '1015569',
      doi: '10.3389/fvets.2022.1015569',
      relevance: 'Coorte de 42 cães demonstrando sobrevida de 76% e associação estatística de idade < 2 anos, hipertermia e classes III/IV de Burkitt com pior prognóstico.',
    },
    {
      id: 'guedra-2021-respiratory-complications-tetanus',
      title: 'Respiratory complications in dogs with tetanus: a retrospective study of 53 cases',
      authors: 'Guedra M, Cortellini S, Humm K.',
      journal: 'The Canadian Veterinary Journal',
      year: 2021,
      volume: '62(11)',
      pages: '1202-1206',
      pmid: '34728867',
      relevance: 'Estudo comprovando que complicações respiratórias ocorrem em 26,4% dos cães com tétano, com sobrevida de 94,8% nos livres de complicação vs 14,3% naqueles com falência respiratória.',
    },
    {
      id: 'popoff-2020-tetanus-in-animals',
      title: 'Tetanus in animals',
      authors: 'Popoff MR.',
      journal: 'Journal of Veterinary Diagnostic Investigation',
      year: 2020,
      volume: '32(2)',
      pages: '184-191',
      pmid: '32189578',
      doi: '10.1177/1040638720906814',
      relevance: 'Revisão mecanística de referência: biologia do C. tetani, transporte axonal retrógrado, clivagem de sinaptobrevina/VAMP por metaloprotease de zinco e resistência interespecífica.',
    },
    {
      id: 'burkitt-2007-risk-factors-tetanus',
      title: 'Risk factors associated with outcome in dogs with tetanus: 38 cases (1987–2005)',
      authors: 'Burkitt JM, Sturges BK, Jandrey KE, Kass PH.',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2007,
      volume: '230(1)',
      pages: '76-83',
      pmid: '17199496',
      doi: '10.2460/javma.230.1.76',
      relevance: 'Série clássica que estabeleceu o sistema de classificação de gravidade clínica (Classes I a IV) e demonstrou impacto prognóstico da disautonomia.',
    },
    {
      id: 'shea-2018-rem-sleep-behavior-disorder-tetanus',
      title: 'Association between clinically probable REM sleep behavior disorder and tetanus in dogs',
      authors: 'Shea A, Hatch A, De Risio L, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2018,
      volume: '32(6)',
      pages: '2029-2036',
      pmid: '30315605',
      doi: '10.1111/jvim.15320',
      relevance: 'Estudo documentando que 46% dos cães recuperados de tétano desenvolvem distúrbio de comportamento do sono REM (cpRBD pós-tétano), autolimitado em 6 meses.',
    },
    {
      id: 'mayousse-2023-neonatal-tetanus-puppies',
      title: 'Neonatal tetanus in a litter of American Bully puppies associated with omphalitis',
      authors: 'Mayousse V, Gilbert S, Desquilbet L, et al.',
      journal: 'Veterinary Record Case Reports',
      year: 2023,
      volume: '11(1)',
      pages: 'e506',
      doi: '10.1002/vrc2.506',
      relevance: 'Relato pioneiro demonstrando onfalite bacteriana como porta de entrada de tétano neonatal fatal em filhotes caninos com 3 a 5 dias de vida.',
    },
    {
      id: 'moretti-2024-feline-generalised-tetanus-magnesium',
      title: 'Generalised tetanus in a cat successfully treated with magnesium sulphate and dexmedetomidine',
      authors: 'Moretti M, D’Urso ES, De Risio L, et al.',
      journal: 'Veterinary Record Case Reports',
      year: 2024,
      volume: '12(3)',
      pages: 'e980',
      doi: '10.1002/vrc2.980',
      relevance: 'Relato detalhado de gato com tétano generalizado severo recuperado após suporte com sulfato de magnésio CRI (70 mg/kg ataque + 10 mg/kg/h) e dexmedetomidina.',
    },
    {
      id: 'papageorgiou-2021-magnesium-tetanus-dogs',
      title: 'The Role of Magnesium in the Management of Acute and Long-Term Symptoms Caused by Tetanus in Two Dogs',
      authors: 'Papageorgiou V, Kazakos G, Prassinos N, et al.',
      journal: 'Topics in Companion Animal Medicine',
      year: 2021,
      volume: '44',
      pages: '100535',
      doi: '10.1016/j.tcam.2021.100535',
      relevance: 'Evidência clínica do uso de sulfato de magnésio como bloqueador de influxo de cálcio pré-sináptico para alívio de espasmos musculares e disautonomia.',
    },
    {
      id: 'derisio-2006-focal-canine-tetanus-emg',
      title: 'Focal canine tetanus: diagnostic value of electromyography',
      authors: 'De Risio L, Gelati A, Albanese F, et al.',
      journal: 'Journal of Small Animal Practice',
      year: 2006,
      volume: '47(5)',
      pages: '278-280',
      pmid: '16674723',
      doi: '10.1111/j.1748-5827.2006.00046.x',
      relevance: 'Relato clássico demonstrando traçados de doublets e descargas contínuas simultâneas em músculos agonistas e antagonistas no eletromiograma de agulha.',
    },
    {
      id: 'nelson-couto-2020-cap67-muscle',
      title: 'Small Animal Internal Medicine (6th Edition) — Chapter 67: Disorders of Muscle',
      authors: 'Nelson RW, Couto CG.',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      volume: '6th ed',
      pages: '1181-1182',
      relevance: 'Capítulo fundamental descrevendo fisiopatologia de toxemia por C. tetani, sinais cranianos, metronidazol, controle de espasmos e curso prolongado.',
    },
    {
      id: 'macintire-2012-emergency-tetanus',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Chapter 13: Neurologic Emergencies: Tetanus',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD.',
      journal: 'Wiley-Blackwell',
      year: 2012,
      volume: '2nd ed',
      pages: '328-329',
      relevance: 'Diretrizes práticas de emergência: desbridamento da ferida, privação sensorial em quarto escuro, monitoramento respiratório e suporte ventilatório.',
    },
    {
      id: 'drobatz-2023-feline-critical-care-tetanus',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition) — Neurologic Dysfunctions: Tetanus',
      authors: 'Drobatz KJ, Costello M, Waddell L.',
      journal: 'Wiley-Blackwell',
      year: 2023,
      volume: '2nd ed',
      pages: '315-316',
      relevance: 'Particularidades do tétano na espécie felina, manejo hospitalar, formas localizadas e contraindicação de diazepam oral prolongado.',
    },
    {
      id: 'plumb-2023-drug-handbook-methocarbamol',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      authors: 'Plumb DC.',
      journal: 'Wiley-Blackwell',
      year: 2023,
      volume: '10th ed',
      pages: '854-856',
      relevance: 'Monografias detalhadas de methocarbamol (doses de resgate IV até 220 mg/kg), metronidazol, antitoxina tetânica e diazepam.',
    },
    {
      id: 'bsava-2020-small-animal-formulary-10e',
      title: 'BSAVA Small Animal Formulary (10th Edition) — Part A: Canine and Feline',
      authors: 'Ramsey I (Ed).',
      journal: 'British Small Animal Veterinary Association',
      year: 2020,
      volume: '10th ed',
      pages: '257, 278-279, 395-396',
      relevance: 'Diretrizes posológicas de methocarbamol, metronidazol e alerta crítico sobre excipiente fenólico em certas formulações de antitoxina equina em gatos.',
    },
    {
      id: 'vin-2023-tetanus-canine-feline',
      title: 'Tetanus in Dogs and Cats — Associate Clinical Summaries (Revised 2023)',
      authors: 'Veterinary Information Network (VIN) Editorial Staff.',
      journal: 'VIN Associate',
      year: 2023,
      relevance: 'Síntese clínica detalhada abrangendo microbiologia de C. tetani, sinais por sistemas, doses de antitoxina e cuidados intensivos de UTI.',
    },
  ],

  figures: [
    {
      id: 'fig-risus-sardonicus-trismo-tetano-canino',
      title: 'Fácies Tetânica Patognomônica: Risus Sardonicus, Trismo e Enoftalmia com Protrusão de Terceira Pálpebra',
      legend:
        'Cão da raça Labrador Retriever com tétano generalizado severo apresentando a máscara facial clássica de risus sardonicus:\n' +
        '- Retração espástica bilateral das comissuras labiais com dentes expostos\n' +
        '- Orelhas tracionadas eretas e aproximadas na linha média\n' +
        '- Enrugamento marcado da fronte e trismo mandibular completo impedindo a abertura da boca\n' +
        '- Enoftalmia com protrusão bilateral da terceira pálpebra (Fonte: Arquivo Clínico e Didático ConsultaVET).',
      url: '/consulta-vet/tetano-caes-gatos/risus-sardonicus-trismo-tetano-canino.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-fisiopatologia-tetanospasmina-clivagem-vamp-snare',
      title: 'Cascata Fisiopatológica Molecular: Transporte Axonal Retrógrado e Clivagem de Synaptobrevina/VAMP',
      legend:
        'Representação molecular da neurointoxicação por Clostridium tetani:\n' +
        '- Germinação dos esporos na ferida anaeróbia e liberação da tetanospasmina (TeNT)\n' +
        '- Ligação aos gangliosídeos da membrana motora pré-sináptica e ascensão por transporte axonal retrógrado ao SNC\n' +
        '- Nos interneurônios inibitórios (células de Renshaw), a cadeia leve cliva a sinaptobrevina (VAMP-2), desmontando o complexo SNARE e bloqueando a exocitose de GABA e glicina\n' +
        '- Sem inibição, os motoneurônios alfa disparam ininterruptamente, causando rigidez extensora e espasmos.',
      url: '/consulta-vet/tetano-caes-gatos/fisiopatologia-tetanospasmina-clivagem-vamp-snare.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-tetano-focal-membro-pelvico-felino-dussaux',
      title: 'Apresentação Felina Típica: Tétano Focal em Membro Pélvico sem Fácies Tetânica (Dussaux et al., 2024)',
      legend:
        'Paciente felino exibindo a apresentação clínica mais prevalente em gatos (forma focal em 78% dos casos, conforme estudo multicêntrico de Dussaux et al., 2024):\n' +
        '- Rigidez extensora permanente e incapacidade de flexão limitada ao membro pélvico direito, onde houve ferida prévia por mordedura há 12 dias\n' +
        '- Ausência completa de trismo, enoftalmia ou risus sardonicus\n' +
        '- Demais membros deambulando com mínima alteração.',
      url: '/consulta-vet/tetano-caes-gatos/tetano-focal-membro-pelvico-felino-dussaux.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-algoritmo-manejo-uti-espasmos-respiratorio-tetano',
      title: 'Algoritmo Decisório de Terapia Intensiva: Quarto Escuro, Miorrelaxamento, Gasometria e Manejo de Via Aérea',
      legend:
        'Fluxograma operacional para internação de pacientes com tétano moderado a grave:\n' +
        '- Isolamento absoluto em quarto escuro silencioso com algodão nos ouvidos\n' +
        '- Protocolo farmacológico escalonado (Methocarbamol + Midazolam + Metronidazol + Antitoxina equina com teste ID)\n' +
        '- Desbridamento cirúrgico da ferida com lavagem salina copiosa sem H2O2\n' +
        '- Vigilância de PaCO2 para prevenir falência ventilatória, nutrição por sonda enteral e kit de traqueostomia preparado.',
      url: '/consulta-vet/tetano-caes-gatos/algoritmo-manejo-uti-espasmos-respiratorio-tetano.jpg',
      aspectRatio: '16:9',
    },
  ],
};
