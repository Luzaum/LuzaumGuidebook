import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Registro canônico de colapso traqueal em cães e gatos.
 *
 * Organização editorial e clínica:
 * - Visão multiespécie: cães (forma degenerativa clássica) e gatos (forma primária rara e investigação de causas secundárias);
 * - Livros-texto do acervo para fundamentos: Nelson & Couto 6ª ed., Plumb's 10ª ed., BSAVA Small Animal Formulary 10ª ed., Ettinger 9ª ed.;
 * - Literatura recente de ponta: Kim et al. (2024), Robin et al. (2024), Suematsu et al. (2025/2026), Weisse et al. (2026), Tanaka & Uemura (2022);
 * - Doses, duração, mecanismo, contraindicações e monitorização expressos em cada conduta;
 * - Ausência estrita de asteriscos duplos em todo o arquivo.
 */
export const colapsoTraquealCaninoRecord: DiseaseRecord = {
  id: 'disease-colapso-traqueal-canino',
  slug: 'colapso-traqueal-canino',
  title: 'Colapso Traqueal em Cães e Gatos',
  subtitle: 'Doença dinâmica e estática das vias aéreas centrais: reconhecimento clínico, diferenciação felina, manejo farmacológico e suporte emergencial',
  synonyms: [
    'Colapso traqueal canino e felino',
    'Traqueomalácia',
    'Traqueobroncomalácia',
    'Tracheal collapse',
    'Collapsing trachea',
    'Tracheobronchomalacia',
    'Canine and feline tracheal collapse syndrome',
    'Tosse em grasnado de ganso',
    'Goose honk',
  ],
  species: ['dog', 'cat'],
  category: 'respiratorio',
  tags: [
    'Tosse crônica',
    'Via aérea central',
    'Cães de pequeno porte',
    'Particularidades felinas',
    'Fluoroscopia',
    'Traqueobroncoscopia',
    'Broncomalácia',
    'Stent traqueal',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['colapso-traqueal-canino'],
  quickSummary:
    'Doença respiratória crônica caracterizada pela perda de rigidez estrutural da parede traqueal, culminando em estreitamento dinâmico ou estático do lúmen. Em cães, predomina o fenótipo de tosse seca paroxística em grasnado de ganso decorrente de condromalácia dos anéis em raças toy. Em gatos, o colapso traqueal primário é excepcional e impõe investigar causas secundárias obstrutivas. O diagnóstico combina fenótipo clínico com fluoroscopia dinâmica e traqueobroncoscopia. O manejo inicial baseia-se em perda de peso, uso estrito de peitoral, mitigação ambiental e terapia médica individualizada; stents ou próteses são reservados para obstrução refratária.',
  quickDecisionStrip: [
    'Dispneia, cianose, exaustão ventilatória ou síncope: priorizar oxigenoterapia hands-off, controle de temperatura e sedação suave antes de qualquer exame.',
    'Radiografia negativa não encerra a investigação diagnóstica; fluoroscopia dinâmica e traqueobroncoscopia esclarecem casos falso-negativos.',
    'Tratar o fenótipo clínico do paciente e suas comorbidades ativas — não indicar intervenções invasivas com base apenas no percentual anatômico da imagem.',
    'Controle de peso, uso exclusivo de peitoral e eliminação de irritantes aéreos compõem a base inegociável do tratamento conservador.',
    'Stent intraluminal ou prótese extraluminal: considerar em centro de referência quando há falência ventilatória refratária ao tratamento médico.',
  ],
  quickSummaryRich: {
    lead:
      'A pergunta central que orienta a tomada de decisão clínica é: predomina tosse crônica paroxística ou obstrução respiratória com falência ventilatória? Em cães, tosse estável sem hipoxemia permite propedêutica e farmacoterapia ambulatorial escalonada. Dispneia progressiva, cianose, respiração de boca aberta (típica em gatos) e síncope exigem estabilização emergencial imediata. A anatomia transmural dita o comportamento: o segmento cervical tende a colapsar na inspiração, enquanto a traqueia intratorácica e os brônquios principais fecham-se dinamicamente na expiração forçada e na tosse.',
    leadHighlights: ['tosse crônica', 'obstrução respiratória', 'estabilização', 'inspiração', 'expiração'],
    pillars: [
      {
        title: 'Defina o fenótipo clínico',
        body:
          'Diferenciar apresentação tosse-dominante de obstrução-dominante. Estudos modernos revelam desacoplamento entre o grau na imagem e a intensidade da tosse; o plano terapêutico deve focar no conforto ventilatório e nas comorbidades associadas.',
        highlights: ['Tosse-dominante', 'obstrução-dominante', 'podem divergir'],
      },
      {
        title: 'Empregue imagem funcional dinâmica',
        body:
          'Radiografias cervicais e torácicas são úteis para triagem e exclusão de afecções concomitantes, mas capturam apenas um instante estático. Fluoroscopia dinâmica expõe o ciclo respiratório em tempo real; a endoscopia detalha a cartilagem, a mucosa e a presença de broncomalácia.',
        highlights: ['Radiografias', 'Fluoroscopia', 'broncoscopia'],
      },
      {
        title: 'Atenue a sobrecarga ventilatória',
        body:
          'Otimização do peso corporal, uso exclusivo de peitoral, controle de temperatura e eliminação de poluentes domiciliares diminuem o trabalho muscular e os reflexos tussígenos. A farmacoterapia é selecionada pelo mecanismo predominante.',
        highlights: ['Perda de peso', 'peitoral', 'comorbidades'],
      },
    ],
    diagnosticFlow: {
      title: 'Rota diagnóstica sequencial',
      steps: [
        {
          label: '1. Estabilidade primeiro',
          timing: 'Imediato no plantão',
          detail:
            'Diante de cianose, ortopneia, exaustão ou hipertermia por dispneia, fornecer oxigênio suplementar em ambiente calmo e climatizado. Adiar radiografias, contenção física forçada ou palpação traqueal provocatória até estabilização cardiorrespiratória completa.',
        },
        {
          label: '2. Fenótipo e localização provável',
          timing: 'Consulta inicial',
          detail:
            'Caracterizar padrão da tosse (grasnado de ganso em cães vs respiração ruidosa sem tosse em gatos), fase respiratória predominante do ruído (estridor inspiratório cervical vs sibilo expiratório intratorácico) e pesquisar comorbidades como colapso laríngeo, bronquite e cardiopatia.',
        },
        {
          label: '3. Radiografias cervicotorácicas direcionadas',
          timing: 'Triagem imaginológica',
          detail:
            'Obter projeções laterais estendidas abrangendo pescoço, entrada torácica e tórax em fases inspiratória e expiratória. Avaliar silhueta cardíaca, padrão bronquial e parênquima pulmonar para exclusão de diferenciais.',
          limitations: 'Exame estático: subestima a gravidade e Suematsu et al. (2025) encontraram radiografias discretas ou sem colapso em 14,1% de cães com colapso grau IV confirmado por endoscopia.',
        },
        {
          label: '4. Fluoroscopia dinâmica funcional',
          timing: 'Definição e mapeamento',
          detail:
            'Examinar múltiplos ciclos ventilatórios espontâneos e tosse provocada suavemente para mapear extensão cervical, transição da entrada torácica, traqueia torácica e brônquios principais.',
        },
        {
          label: '5. Laringotraqueobroncoscopia',
          timing: 'Planejamento e estadiamento',
          detail:
            'Inspeção sob sedação controlada para graduar a traqueomalácia de I a IV, identificar formato dos anéis (dorsoventral vs malformação em W), avaliar brônquios e coletar lavado traqueal para citologia e microbiologia quando houver suspeita de infecção.',
          limitations: 'Requer anestesia geral e equipe treinada para recuperação imediata da via aérea.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Rota terapêutica multimodal',
      steps: [
        {
          label: '1. Alívio de sobrecarga e gatilhos',
          detail:
            'Substituição obrigatória de coleira por peitoral, emagrecimento orientado se sobrepeso, condicionamento térmico ambiental, veto a fumaça de tabaco, incensos e desinfetantes voláteis. Tratamento agressivo de comorbidades concomitantes.',
          duration: 'Permanente.',
        },
        {
          label: '2. Quebra do ciclo vicioso da tosse',
          detail:
            'Em tosse seca paroxística improdutiva, escolher um único agente antitussígeno: butorfanol VO (0,55 mg/kg q6–12h), hidrocodona VO (0,2–0,5 mg/kg q6–12h) ou codeína VO (1–2 mg/kg q6–12h como alternativa de menor biodisponibilidade). Não associar múltiplos opioides simultaneamente.',
          reassess: 'Contato em 48–72 horas; retorno clínico em 7 a 14 dias para ajuste de dose ou intervalo.',
        },
        {
          label: '3. Modulação inflamatória e broncodilatação',
          detail:
            'Corticosteroide oral em curso curto e regressivo apenas para edema agudo de mucosa (prednisona 0,5 mg/kg/dia por 5 a 10 dias com desmame). Transição para fluticasona inalatória (110 a 220 µg/puff q12h) para controle crônico local sem efeitos sistêmicos. Broncodilatadores (teofilina ou terbutalina) somente se houver bronquite ou broncomalácia confirmada.',
          reassess: 'Reavaliar benefício objetivo em 14 dias; suspender broncodilatadores que não demonstrem melhora clínica.',
        },
        {
          label: '4. Monitoramento ambulatorial e diário de tosse',
          detail:
            'Registrar em diário domiciliar o número diário de paroxismos, interrupção de sono, tolerância a passeios e episódios de cianose ou síncope. Revisão clínica seriada com pesagem obrigatória.',
        },
        {
          label: '5. Intervenção cirúrgica ou intervencionista',
          detail:
            'Encaminhar para centro cirúrgico especializado quando a obstrução respiratória for grave e refratária ao manejo clínico multimodal. Prótese extraluminal em anéis para traqueia cervical ou stent intraluminal de nitinol para acometimento intratorácico difuso.',
          reassess: 'Seguimento fluoroscópico e broncoscópico programado; vigiar tosse residual e tecido de granulação.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'O colapso traqueal é uma doença progressiva da via aérea central resultante da perda das propriedades viscoelásticas normais da matriz cartilaginosa e do tônus do músculo traqueal. Ocorre redução acentuada de glicosaminoglicanos (sulfato de condroitina) e cálcio nos anéis hialinos, levando ao amolecimento estrutural (condromalácia), achatamento dorsoventral dos anéis e prolapso da membrana traqueal dorsal flácida para dentro do lúmen. O termo traqueobroncomalácia é o mais fidedigno para abranger o comprometimento concomitante da carina e dos brônquios principais e lobares.',
    classificacaoAnatomica: {
      kind: 'clinicalTable' as const,
      caption: 'Localização do colapso e comportamento transmural esperado',
      headers: ['Componente', 'Fase em que tende a piorar', 'Implicação clínica'],
      rows: [
        ['Cervical / extratorácico', 'Inspiração', 'Esforço inspiratório e ruído de via aérea superior podem predominar.'],
        ['Intratorácico', 'Expiração e tosse', 'Esforço expiratório, tosse e fechamento dinâmico ganham importância.'],
        ['Bronquial', 'Expiração e tosse', 'Pode manter sinais mesmo após tratamento apenas da traqueia.'],
        ['Malformação estática', 'Menos dependente da fase', 'Estreitamento pode persistir ao longo do ciclo respiratório.'],
      ],
    },
    colapsoWShaped:
      'Além do achatamento dorsoventral tradicional, foi identificada a malformação cartilaginosa em W (W-shaped collapse), descrita detalhadamente por Suematsu et al. (2026). Nela, a cartilagem traqueal dobra-se medialmente sobre si mesma em um padrão estático invaginado, sem relaxamento membranoso dorsal típico. Cães portadores da conformação em W apresentam risco 12 vezes maior de necessitar oxigenioterapia pré-operatória de emergência do que cães com colapso tradicional, mas exibem excelente resposta à prótese traqueal extraluminal contínua (CETP), alcançando 90,9% de sobrevida em 36 meses.',
    particularidadesFelinas:
      'Na espécie felina, o colapso traqueal primário é excepcional e raro na rotina clínica (Tanaka & Uemura, 2022; Mims et al., 2008). O diâmetro traqueal em gatos adultos varia entre 5 e 8 mm. Diante de estreitamento traqueal felino em imagem, é obrigatório pesquisar causas secundárias antes de presumir condromalácia primária: massas neoplásicas extrínsecas (linfoma mediastinal, carcinoma tireoidiano), compressões por linfadenopatias, corpos estranhos intraluminais, trauma por mordedura ou atropelamento e, com grande relevância, estenose traqueal cicatricial iatrogênica decorrente de insuflação excessiva do balonete de tubo endotraqueal durante procedimentos anestésicos.',
    leiDePoiseuilleEFisiologia:
      'A biofísica do estreitamento traqueal é classicamente explicada de forma didática pela Lei de Poiseuille, segundo a qual a resistência (R) ao fluxo laminar em um conduto cilíndrico rígido é inversamente proporcional à quarta potência do raio (R ~ 1/r^4). Como consequência, uma redução de apenas 50% no raio da via aérea acarreta uma elevação teórica de até 16 vezes na resistência ao fluxo aéreo, exigindo do paciente um esforço respiratório colossal para manter o volume corrente. Contudo, deve-se ressaltar a limitação biológica desse modelo: a traqueia viva é um tubo flexível dinâmico submetido a pressões transmurais alternadas e fluxo turbulentoso durante a expiração e a tosse paroxística, onde a perda de carga relaciona-se mais intensamente à velocidade e à densidade do gás do que ao regime puramente laminar.',
    fatoresAgravantes: [
      'Obesidade e sobrepeso: o acúmulo de gordura cervical e torácica reduz a complacência da parede torácica, comprime a via aérea superior e amplifica o gradiente transmural.',
      'Estresse térmico, calor e ambientes abafados: o mecanismo de termorregulação por taquipneia (panting) acelera a velocidade do ar e aprofunda as pressões negativas transmurais.',
      'Excitação e estresse emocional: hiperativação adrenérgica com aumento da frequência e profundidade ventilatória.',
      'Irritantes aéreos: fumaça de cigarro, queima de incensos, aerossóis domésticos, poeira de reformas e perfumes intensos deflagram crises de tosse paroxística.',
      'Uso de coleira cervical convencional: a tração externa exerce pressão direta sobre os anéis condromalácicos, provocando colapso mecânico imediato.',
      'Comorbidades cardiorrespiratórias: síndrome braquicefálica, paralisia de laringe, bronquite crônica, infecções do trato respiratório e doença valvar mitral degenerativa com cardiomegalia atrial esquerda.',
    ],
    limitesDoConceito:
      'Colapso traqueal dinâmico, broncomalácia periférica, hipoplasia traqueal congênita, estenose traqueal fibrosa cicatricial e compressão tumoral extrínseca representam entidades fisiopatológicas distintas. A abordagem terapêutica e o prognóstico dependem diretamente da identificação do mecanismo etiológico exato.',
    figuraMapeamentoKim2024: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/colapso-traqueal/mapeamento-anatomico-colapso-kim-2024.jpg',
      caption: 'Mapeamento anatômico e gradação do colapso traqueal por fluoroscopia em 110 cães de raças pequenas: distribuição por segmento cervical, entrada torácica e intratorácico (Kim et al., 2024, Front Vet Sci, CC BY 4.0).',
    },
  },
  epidemiology: {
    perfilClassico:
      'O perfil epidemiológico típico compreende cães de raças toy e miniatura de meia-idade a idosos, com idade mediana entre 6 e 10 anos. As raças com maior predisposição clínica consolidada incluem Yorkshire Terrier, Spitz Alemão (Pomeranian), Poodle Toy e Miniatura, Maltês, Chihuahua e Pug. Todavia, casos congênitos severos podem manifestar sinais nos primeiros meses ou no primeiro ano de vida.',
    evidenciaRecente: [
      'Kim et al. (2024): Na maior coorte contemporânea avaliada por fluoroscopia com 110 cães de pequeno porte, 68,1% dos pacientes apresentavam colapso concomitante de brônquio principal. Menor escore de condição corporal magra, idade mais avançada e obesidade estiveram fortemente associados ao risco de colapso severo. Crucialmente, não houve correlação estatística entre o grau fluoroscópico e a severidade do escore de tosse (p=0,350), comprovando a dissociação clínica com a imagem estática.',
      'Weisse et al. (2026): Levantamento institucional de centro de referência terciário com 11.061 cães da raça Yorkshire Terrier revelou diagnóstico documentado de colapso traqueal em 739 animais (6,7%), demonstrando a elevada penetrância da afecção na raça.',
      'Carr et al. (2022/2023): Levantamento internacional conduzido com 180 especialistas de 22 países confirmou a inexistência de consensos ou guidelines formais publicados pelo ACVIM ou ACVS para colapso traqueal, evidenciando ampla variabilidade de condutas e dependência de evidências observacionais.',
    ],
    notaSobreGatos:
      'Em gatos, a apresentação clínica é esporádica e acomete principalmente animais maduros a idosos (ex: felino de 12 anos relatado por Tanaka & Uemura, 2022). Ao contrário dos cães, felinos raramente apresentam o som clássico de grasnado de ganso, manifestando-se prioritariamente por respiração ruidosa, estridor laríngeo, taquipneia compensatória e crises súbitas de respiração com a boca aberta diante de esforço ou estresse.',
    figuraColapsoBronquicoKim2024: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/colapso-traqueal/colapso-bronquico-kim-2024.jpg',
      caption: 'Grau de herniação de lobo pulmonar cranial cervical e presença de colapso de brônquio principal demonstrados por imagem fluoroscópica em cães (Kim et al., 2024, Front Vet Sci, CC BY 4.0).',
    },
  },
  pathogenesisTransmission: {
    cascataMecanica: [
      'Predisposição genética ou degeneração adquirida reduz a concentração de glicosaminoglicanos, desestruturando os anéis cartilaginosos.',
      'A perda de rigidez elástica permite que as oscilações de pressão transmural do ciclo respiratório achatem o lúmen luminal.',
      'O fluxo aéreo turbulento resultante e o atrito repetido das paredes traqueais traumatizam a mucosa respiratória.',
      'O reflexo tussígeno é deflagrado, gerando picos pressóricos intratorácicos violentos que agravam a condromalácia dos anéis.',
      'O prejuízo do aparelho mucociliar favorece retenção de muco, metaplasia epitelial e exacerbações inflamatórias cíclicas.',
    ],
    cicloAutoperpetuante:
      'O ciclo autoperpetuante da tosse no colapso traqueal opera da seguinte forma: o estreitamento luminal primário gera turbulência do ar, a qual agride mecanicamente o epitélio ciliado; o atrito e a vibração estimulam mecanorreceptores e deflagram tosse paroxística intensa. Cada paroxismo eleva bruscamente a pressão intratorácica positiva (acima de 50 a 100 cmH2O), esmagando a traqueia torácica contra si mesma, desnudando a camada epitelial, liberando metaloproteinases de matriz e citocinas inflamatórias, o que acentua o edema da mucosa e reduz ainda mais a luz traqueal. Interromper farmacologicamente esse ciclo é um dos pilares mais vitais do tratamento.',
    pontoChave:
      'A síndrome é uma patologia estrutural crônica degenerativa, mecânica e progressiva. Não se trata de doença infecciosa transmissível; infecções virais ou bacterianas secundárias atuam apenas como gatilhos de descompensação aguda em um conduto previamente fragilizado.',
  },
  pathophysiology: {
    mecanicaRespiratoria:
      'O comportamento biomecânico do colapso é regido pela diferença entre a pressão intraluminal traqueal e a pressão externa peritraqueal (gradiente transmural), conforme detalhado no Nelson & Couto 6ª ed. No segmento cervical (extratorácico), a pressão externa é a pressão atmosférica. Durante a fase inspiratória, a descida do diafragma gera pressão subatmosférica (negativa) dentro da traqueia; quando os anéis são fracos, a pressão atmosférica circundante colapsa a parede cervical para dentro. No segmento intratorácico e nos brônquios, a pressão peritraqueal é a pressão pleural; durante a expiração e especialmente na tosse, a pressão pleural torna-se fortemente positiva em relação ao lúmen da via aérea, forçando o prolapso da membrana dorsal e o fechamento do segmento torácico.',
    consequencias: [
      'Aumento crítico da resistência ao fluxo e sobrecarga extenuante da musculatura respiratória diafragmática e intercostal.',
      'Fluxo aéreo acelerado e turbulento com desidratação e estresse de cisalhamento do muco protetor.',
      'Hipoxemia arterial e hipercapnia em crises obstrutivas agudas por fadiga ventilatória.',
      'Síncope tussígena multifatorial: decorrente de elevação súbita da pressão intratorácica que reduz o retorno venoso ao coração direito, transitória redução do débito cardíaco e reflexos vasovagais ativados por barorreceptores.',
      'Desenvolvimento tardio de cor pulmonale e hipertensão arterial pulmonar secundária à vasoconstrição hipóxica crônica em cães com traqueobroncomalácia extensa.',
    ],
    figuraFluoroscopiaKim2024: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/colapso-traqueal/fluoroscopia-colapso-traqueal-kim-2024.jpg',
      caption: 'Imagem fluoroscópica em decúbito lateral direito durante o ciclo respiratório, ilustrando acentuado dobramento dinâmico (tracheal kinking) e colapso luminal em cão de pequeno porte (Kim et al., 2024, Front Vet Sci, CC BY 4.0).',
    },
  },
  clinicalSignsPathophysiology: {
    sinais: [
      {
        system: 'Apresentação clínica canina clássica',
        findings: [
          {
            finding: 'Tosse seca, áspera, paroxística em grasnado de ganso (goose honk)',
            mechanism: 'Turbulência rápida do fluxo e choque mecânico das paredes e membrana traqueal dorsal frouxa.',
            clinicalMeaning: 'Sinal clínico característico, porém compartilhado com bronquite crônica em fases iniciais.',
            priority: 'common',
          },
          {
            finding: 'Ânsia de vômito ou engasgo ao término do acesso de tosse',
            mechanism: 'Estimulação mecânica intensa de mecanorreceptores laríngeos e faríngeos pelo paroxismo.',
            clinicalMeaning: 'Frequentemente confundido pelos tutores com náusea ou patologia gastrointestinal primária.',
            priority: 'common',
          },
          {
            finding: 'Exacerbação por calor, passeios com guia, excitação ou ingestão de água',
            mechanism: 'Aumento imediato da demanda ventilatória e pressão externa exercida sobre a traqueia cervical.',
            priority: 'common',
          },
        ],
      },
      {
        system: 'Sinais de obstrução avançada e emergência',
        findings: [
          {
            finding: 'Estridor inspiratório e/ou esforço respiratório acentuado',
            mechanism: 'Estenose crítica da luz traqueal impondo restrição mecânica grave ao volume de ar inspirado.',
            clinicalMeaning: 'Diferenciar ruído inspiratório (cervical) de expiratório (torácico/bronquial).',
            priority: 'emergency',
          },
          {
            finding: 'Cianose de mucosas, ortopneia, exaustão muscular e síncope',
            mechanism: 'Incapacidade de manter troca gasosa alveolar, associada à queda do débito por alta pressão intratorácica.',
            clinicalMeaning: 'Risco iminente de parada cardiorrespiratória; requer estabilização emergencial hands-off.',
            priority: 'emergency',
          },
        ],
      },
      {
        system: 'Fenótipo e manifestações em felinos',
        findings: [
          {
            finding: 'Dispneia progressiva com respiração de boca aberta',
            mechanism: 'Gatos são respiradores nasais obrigatórios; respiração com boca aberta reflete estresse ventilatório extremo.',
            clinicalMeaning: 'Sinal de alarme vermelho na espécie felina; ausência do som de grasnado de ganso.',
            priority: 'emergency',
          },
          {
            finding: 'Estridor de via aérea superior, anorexia e intolerância ao manuseio',
            mechanism: 'Gasto energético elevado na respiração impede alimentação e deflagra exaustão rápida.',
            priority: 'common',
          },
        ],
      },
    ],
    gatilhosComuns: [
      'Excitação e estresse emocional agudo (visitas, campainha, euforia na recepção do tutor)',
      'Estresse térmico em dias quentes ou ambientes sem ar-condicionado',
      'Exercício físico moderado a intenso',
      'Tração sobre coleira de pescoço',
      'Exposição a aerossóis, poeira de reformas, fumaça de tabaco e desodorizadores de ambiente',
      'Ingestão rápida de água ou alimento seco',
    ],
    diagnosticosDiferenciais: [
      'Bronquite crônica canina e felina (tosse diária produtiva, infiltrado inflamatório em lavado)',
      'Complexo respiratório infeccioso canino (tosse aguda de início recente com histórico de exposição)',
      'Doença valvar mitral degenerativa canina com cardiomegalia importante (compressão do brônquio principal esquerdo pelo átrio dilatado)',
      'Afecções de vias aéreas superiores: síndrome obstrutiva braquicefálica, paralisia de laringe, colapso de faringe',
      'Asma felina (caracterizada por broncoconstrição periférica, tosse com postura estendida, sibilos e eosinofilia em lavado)',
      'Corpo estranho intraluminal, neoplasia traqueal (linfoma, carcinoma) ou pólipo inflamatório',
      'Estenose traqueal cicatricial iatrogênica (especialmente em gatos com histórico prévio de anestesia geral e intubação)',
    ],
    figuraRadiografiaGatoTanaka2022: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/colapso-traqueal/radiografia-colapso-traqueal-gato-tanaka-2022.jpg',
      caption: 'Radiografias torácicas lateral e ventrodorsal em gata de 12 anos demonstrando colapso traqueal primário grau IV com estreitamento luminal superior a 80–90% na admissão (Tanaka & Uemura, 2022, Vet Med Sci, CC BY 4.0).',
    },
  },
  diagnosis: {
    abordagem: [
      {
        stepNumber: 1,
        title: 'Estabilizar o paciente e identificar o fenótipo dominante',
        description:
          'Diferenciar tosse crônica isolada em paciente normoxêmico de obstrução ventilatória aguda com angústia respiratória. Em animais cianóticos ou taquipneicos graves, instituir suporte de oxigênio e conduta estritamente sem contenção forçada (hands-off). Não realizar manobras de palpação traqueal forçada para desencadear tosse em animais instáveis.',
        purpose: 'Garantir sobrevivência imediata e estratificar gravidade clínica.',
      },
      {
        stepNumber: 2,
        title: 'Anamnese detalhada e exame físico cardiorrespiratório',
        description:
          'Registrar cronicidade dos episódios, gatilhos conhecidos, tolerância ao esforço, presença de episódios sincopais e aferir escore de condição corporal. Na ausculta, avaliar cuidadosamente tempo inspiratório e expiratório, ruídos traqueais, estridor laríngeo, estalidos brônquicos e presença de sopros cardíacos sistólicos.',
        purpose: 'Identificar localização anatômica mais provável e desmascarar comorbidades associadas.',
      },
      {
        stepNumber: 3,
        title: 'Radiografia cervicotorácica estática',
        description:
          'Realizar projeções radiográficas laterais estendidas abrangendo pescoço, entrada torácica e tórax total, idealmente associando fases de inspiração e expiração forçada. Permite triagem de estenoses grosseiras, avaliação da silhueta cardíaca, do padrão pulmonar e de massas intratorácicas.',
        purpose: 'Exclusão de diagnósticos diferenciais e triagem do trajeto traqueal.',
        limitations:
          'Exame estático sujeito a elevadas taxas de falso-negativos por capturar apenas uma fração de segundo do ciclo. Suematsu et al. (2025) encontraram radiografias discretas ou sem colapso em 14,1% de cães com colapso grau IV confirmado por traqueobroncoscopia.',
      },
      {
        stepNumber: 4,
        title: 'Fluoroscopia dinâmica funcional',
        description:
          'Padrão de excelência para mapeamento funcional não invasivo sem necessidade de anestesia geral. Permite observar o comportamento do lúmen durante ventilação espontânea, esforço inspiratório, expiração e episódios de tosse suave, mapeando traqueia cervical, entrada torácica, carina e bifurcação bronquial principal.',
        purpose: 'Avaliar a dinâmica transmural e definir a extensão anatômica do comprometimento.',
        limitations: 'Disponibilidade restrita a centros diagnósticos de referência e necessidade de contenção suave colaborativa.',
      },
      {
        stepNumber: 5,
        title: 'Traqueobroncoscopia e laringoscopia direta',
        description:
          'Padrão ouro anatômico do trato respiratório. Sob protocolo anestésico planejado com controle rígido de via aérea, possibilita inspecionar a conformação e integridade dos anéis cartilaginosos, a mobilidade das cartilagens aritenoides, o grau de hiperemia e prolapso da membrana dorsal, a presença de configuração em W e a visualização dos brônquios lobares. Permite coleta de lavado para citologia e microbiologia.',
        purpose: 'Confirmação anatômica direta, graduação definitiva e investigação microbiológica.',
        limitations: 'Exige anestesia geral em paciente de alto risco respiratório, monitorização anestésica rigorosa e preparo para desmame ventilatório.',
        isGoldStandard: true,
      },
    ],
    graduacaoEndoscopica: {
      kind: 'clinicalTable' as const,
      caption: 'Graduação endoscópica anatômica tradicional — correlacionar sempre ao quadro clínico',
      headers: ['Grau', 'Redução aproximada do lúmen', 'Leitura prática'],
      rows: [
        ['I', '25%', 'Alteração leve; pequena variação pode ocorrer fisiologicamente.'],
        ['II', '50%', 'Colapso moderado.'],
        ['III', '75%', 'Colapso acentuado.'],
        ['IV', '90–100%', 'Aposição quase completa ou completa.'],
      ],
    },
    interpretacaoIntegrada:
      'Não transformar a graduação em indicação automática de stent. A coorte de 110 cães de Kim et al. (2024) comprovou a ausência de correlação linear entre a gravidade na imagem e a intensidade da tosse (p=0,350). O tratamento intervencionista com stent ou prótese deve ser guiado pela severidade do desconforto ventilatório e pela refratariedade ao tratamento médico adequado, e não apenas pelo número da graduação endoscópica em paciente compensado.',
    examesComplementares:
      'Ecocardiograma bidimensional com Doppler: essencial em cães toy e idosos para investigar hipertensão pulmonar concomitante (estimativa de pressão sistólica de artéria pulmonar via refluxo tricúspide) e quantificar dilatação de câmaras esquerdas por degeneração valvar mitral. Lavado broncoalveolar ou traqueal com citologia e cultura bacteriana quantitativa e antibiograma são indicados quando há suspeita de componente infeccioso ativo.',
  },
  treatment: {
    decisaoInicial:
      'A conduta imediata depende da presença de estresse respiratório. Na crise obstrutiva aguda com cianose ou exaustão, a prioridade absoluta é oxigenoterapia de fluxo livre ou em incubadora climatizada com mínima manipulação (hands-off), resfriamento corporal caso haja hipertermia decorrente de taquipneia ansiosa e alívio farmacológico imediato da agitação e tosse com butorfanol injetável. Proibições absolutas na admissão de crise: contenção forçada, exames radiográficos imediatos e palpação traqueal provocatória.',
    ordemDePrioridadeEstruturada: [
      {
        title: '1. Medidas mecânicas e ambientais',
        summary:
          'Substituir coleira por peitoral, instituir perda de peso se necessário e reduzir calor, fumaça, aerossóis e excitação. Corrigir doenças de via aérea superior e tratar comorbidades demonstradas.',
        duration: 'Permanente.',
        reassess: 'Revisão em 2–4 semanas; depois a cada 3–6 meses quando estável. Registrar peso, escore corporal, paroxismos e tolerância ao exercício.',
        evidence: 'Ettinger 9ª ed.; Nelson & Couto 6ª ed.; ACVS.',
      },
      {
        title: '2. Controlar tosse seca e inflamação quando presentes',
        summary:
          'Antitussígeno pode quebrar o ciclo tosse–trauma–inflamação. Corticosteroide sistêmico deve ser curto e individualizado; via inalatória é alternativa quando há componente inflamatório e necessidade de reduzir exposição sistêmica.',
        options:
          'Antitussígeno — escolher apenas um:\n• butorfanol 0,55 mg/kg VO q6–12h (até 1,1 mg/kg se necessário)\n• hidrocodona 0,2–0,5 mg/kg VO q6–12h\n• codeína 1–2 mg/kg VO q6–12h (alternativa de menor evidência)\nInflamação de mucosa:\n• prednisona/prednisolona em curso com desmame\n• fluticasona 110–220 µg/puff, 1 puff por via inalatória q6–12h',
        duration:
          '• Antitussígeno: teste curto e menor frequência eficaz\n• Corticosteroide sistêmico: curso limitado com desmame\n• Fluticasona: avaliar resposta em 2–4 semanas',
        reassess:
          '• Contato em 48–72h para tosse intensa\n• Consulta em até 7–14 dias: avaliar paroxismos, sono, exercício, sedação, constipação, polifagia e PU/PD',
        evidence: 'Ettinger 9ª ed.; Nelson & Couto 6ª ed.; Talavera-López et al. (2023).',
      },
      {
        title: '3. Tratar apenas o componente comprovado',
        summary:
          'Broncodilatador é selecionado para doença de vias aéreas inferiores/broncoespasmo, não para “endurecer” a traqueia. Antimicrobiano não é rotina: usar quando citologia, cultura e quadro clínico sustentarem infecção.',
        options:
          'Broncoespasmo ou pequenas vias aéreas:\n• terbutalina 0,625–5 mg/cão VO q8–12h\n• teofilina de liberação prolongada 10 mg/kg VO q12h\n• Nota: Não associar automaticamente e não usar como tratamento isolado',
        duration: 'Teste terapêutico de 1–2 semanas; manter somente se houver melhora objetiva.',
        reassess:
          'Em 7–14 dias: frequência cardíaca e ritmo, tremores/agitação, sinais gastrointestinais, esforço respiratório e diário de tosse.',
        evidence: 'Nelson & Couto 6ª ed.; Ettinger 9ª ed.',
      },
      {
        title: '4. Encaminhar obstrução grave refratária',
        summary:
          'Prótese extraluminal é opção sobretudo para segmentos cervicais acessíveis; stent intraluminal pode abranger doença extensa ou intratorácica. Seleção depende da anatomia, experiência do centro e capacidade de seguimento.',
        reassess: 'Tosse, infecção, tecido de granulação, fratura, migração e colapso fora do segmento tratado.',
        evidence: 'ACVS; Robin et al. (2024); Suematsu et al. (2026).',
      },
    ],
    terapiaFarmacologica:
      'Escolher o fármaco rigorosamente pelo componente dominante do paciente (Nelson & Couto 6ª ed., Plumb’s 10ª ed., BSAVA 10ª ed.): antitussígeno opioide para tosse seca e improdutiva crônica; corticosteroide curto para edema agudo de mucosa; broncodilatador exclusivamente se houver broncoespasmo ou doença de pequenas vias aéreas documentada. Regra de ouro da segurança farmacológica: não associar empiricamente butorfanol, hidrocodona e codeína: selecionar um opioide, titular pela menor dose eficaz e reavaliar. Em felinos, é proibido o uso de qualquer xarope contendo paracetamol devido ao risco de meta-hemoglobinemia letal.',
    protocolosCriseObstrutiva: [
      {
        drug: 'Butorfanol — crise obstrutiva',
        indication: 'Tosse seca paroxística com agitação ou dispneia, após iniciar oxigênio e mínima manipulação.',
        dose: '0,05–0,2 mg/kg',
        frequency: 'q4–6h, conforme resposta',
        route: 'SC',
        duration: 'Durante a estabilização; não converter automaticamente em uso crônico.',
        mechanism:
          'Agonismo opioide κ com antagonismo/agonismo parcial μ; eleva o limiar central da tosse e fornece sedação de curta duração.',
        reassess:
          'Monitorização contínua de esforço, SpO₂, coloração, nível de consciência e capacidade de eliminar secreções. Escalonar via aérea se houver fadiga, hipoxemia ou obstrução persistente.',
        cautions:
          'Pode causar sedação, ataxia, bradicardia e depressão respiratória. Reduzir dose com outros depressores do SNC e em cães MDR1; evitar supressão da tosse quando há secreção abundante.',
        contraindications: 'Hipersensibilidade; extrema cautela em disfunção hepática/renal grave e doença respiratória secretória.',
        notes: 'Ettinger 9ª ed. descreve esta faixa para estabilização aguda. Naloxona pode reverter efeitos opioides clinicamente importantes.',
      },
      {
        drug: 'Acepromazina — adjuvante para agitação',
        indication: 'Agitação que aumenta esforço e fechamento dinâmico, somente se perfusão e pressão arterial forem adequadas.',
        dose: '0,01–0,05 mg/kg; faixa publicada até 0,1 mg/kg',
        frequency: 'Dose única; aguardar 15–30 min antes de considerar reforço',
        route: 'SC, IM ou IV lenta',
        duration: 'Efeito usual 3–4h; pode persistir 6–8h.',
        mechanism:
          'Fenotiazínico com bloqueio dopaminérgico central e α₁-adrenérgico; reduz excitação, mas não produz analgesia e não possui reversor específico.',
        reassess: 'Pressão arterial, temperatura, ventilação e sedação após 5–15 minutos e até recuperação.',
        cautions:
          'Preferir a extremidade baixa da faixa, sobretudo com opioide. Pode causar hipotensão, hipotermia e sedação prolongada; maior sensibilidade em MDR1.',
        contraindications: 'Evitar em choque, hipotensão, hipovolemia/desidratação, anemia importante ou disfunção hepática grave.',
        notes: 'Não substitui oxigênio nem controle da tosse. Epinefrina não é o vasopressor de escolha na hipotensão por fenotiazínico.',
      },
    ],
    protocolosAmbulatoriais: [
      {
        drug: 'Butorfanol — antitussígeno oral',
        indication: 'Tosse seca, áspera e improdutiva que interrompe sono, exercício ou perpetua irritação traqueal.',
        dose: '0,55 mg/kg; se necessário, até 1,1 mg/kg',
        frequency: 'q6–12h',
        route: 'VO',
        duration: 'Curso curto; o Plumb’s orienta que normalmente não ultrapasse 7 dias.',
        mechanism:
          'Modulação opioide central do reflexo da tosse; a baixa biodisponibilidade oral ainda permite efeito antitussígeno.',
        reassess: 'Contato em 48–72h e consulta em até 7 dias; reduzir dose ou intervalo assim que o ciclo da tosse estiver controlado.',
        cautions: 'Sedação, ataxia, constipação/bradicardia e retenção de muco; efeitos somam-se aos de outros sedativos.',
        contraindications: 'Não usar para tosse produtiva com secreção copiosa ou quando a depuração de secreções é necessária.',
      },
      {
        drug: 'Hidrocodona — antitussígeno oral',
        indication: 'Alternativa para tosse seca e improdutiva intensa ou refratária; não é escolha para tosse produtiva.',
        dose: '0,2–0,5 mg/kg (Ettinger: 0,22 mg/kg)',
        frequency: 'q6–12h (Ettinger: q12h)',
        route: 'VO',
        duration: 'Até controlar a exacerbação; reavaliar antes de prolongar.',
        mechanism: 'Agonista μ-opioide que suprime diretamente o centro medular da tosse e reduz excitabilidade neuronal.',
        reassess: 'Em 48–72h se tosse intensa; formalmente em até 7 dias. Titular para controle sem sedação excessiva.',
        cautions:
          'Sedação, constipação, vômito e depressão respiratória. Opioide controlado; disponibilidade e regras de prescrição variam.',
        contraindications:
          'Evitar em depressão respiratória importante, obstrução GI e secreção respiratória aumentada. Não usar combinações com ibuprofeno em cães; produtos com paracetamol nunca em gatos.',
      },
      {
        drug: 'Codeína — antitussígeno oral (alternativa)',
        indication:
          'Tosse seca e improdutiva quando um produto de codeína isolada está disponível e as opções preferenciais não estão disponíveis, não foram toleradas ou não produziram resposta adequada.',
        dose: '1–2 mg/kg',
        frequency: 'q6–12h',
        route: 'VO',
        duration: 'Teste curto, com reavaliação precoce; manter somente se houver benefício clínico objetivo sem sedação excessiva.',
        mechanism:
          'Atividade agonista em receptores μ-opioides com modulação central do reflexo da tosse. Em cães, o principal metabólito é codeína-6-glicuronídeo, cuja contribuição antitussígena permanece incerta.',
        reassess:
          'Contato em 48–72h e consulta em até 7 dias; comparar frequência/intensidade dos paroxismos, sono e tolerância ao exercício com sedação, ventilação e trânsito intestinal.',
        cautions:
          'Biodisponibilidade oral em cães é muito baixa (aproximadamente 4–6%) e a resposta pode ser imprevisível. Sedação, vômito, constipação, íleo e depressão respiratória são possíveis; outros depressores do SNC aumentam esses riscos.',
        contraindications:
          'Não usar em depressão respiratória importante, obstrução GI suspeita ou tosse produtiva que exige depuração de secreções. Contraindicada com inibidor da monoaminoxidase durante o uso e por 14 dias após sua suspensão.',
        notes:
          'Uso extrabula. O Plumb’s não identifica estudos que comprovem definitivamente eficácia antitussígena oral em pacientes veterinários e considera a hidrocodona mais potente. Preferir codeína isolada; em produtos de associação, calcular e avaliar separadamente a segurança de cada princípio ativo. Medicamento sujeito a controle especial conforme a legislação vigente.',
      },
      {
        drug: 'Prednisona ou prednisolona — curso anti-inflamatório',
        indication: 'Exacerbação com inflamação/edema de mucosa; não corrige condromalácia e não deve ser automática em todo cão.',
        dose: '0,5 mg/kg por dose → 0,25 mg/kg por dose',
        frequency: 'q12h × 3d; 0,25 mg/kg q12h × 5d; q24h × 10d; q48h × 12d',
        route: 'VO',
        duration: '30 dias no protocolo prospectivo publicado.',
        mechanism:
          'Ativação do receptor glicocorticoide reduz citocinas, permeabilidade vascular, edema e hipersensibilidade da mucosa.',
        reassess: 'Em 7–14 dias e ao final de 4 semanas; verificar tosse, esforço, peso, PU/PD, polifagia, ofegação e infecção.',
        cautions:
          'Usar a menor exposição eficaz. Diabetes, cardiopatia avançada, doença renal, infecção e obesidade aumentam o risco; evitar associação com AINE.',
        contraindications: 'Infecção fúngica sistêmica; cautela forte em diabetes descompensado, úlcera GI e infecção não controlada.',
        notes:
          'Regime testado em apenas 30 cães. Ettinger também descreve 0,2 mg/kg q24h por 1–2 semanas como opção de baixa dose; Nelson & Couto admite 0,5–1 mg/kg q12h na exacerbação, com desmame em 3–4 semanas.',
      },
      {
        drug: 'Fluticasona — corticosteroide inalatório',
        indication: 'Inflamação traqueobrônquica quando se deseja reduzir efeitos sistêmicos ou há resposta prévia a glicocorticoide.',
        dose: 'Plumb’s: 110–220 µg/puff, 1 puff por dose',
        frequency: 'q6–12h, ajustando à resposta',
        route: 'Inalatória por MDI + espaçador e máscara',
        duration: 'Reavaliar em 2 e 4 semanas; manutenção depende do fenótipo e da resposta.',
        mechanism:
          'Glicocorticoide de alta potência com ação predominantemente local; reduz inflamação da mucosa sem efeito de resgate imediato.',
        reassess: 'Semanas 2 e 4. Conferir técnica, vedação da máscara, tosse, esforço, PU/PD e sinais de hipercortisolismo.',
        cautions:
          'Manter máscara por 7–10 respirações após o jato. Ao migrar de corticoide sistêmico, sobrepor e desmamar por 10–14 dias para evitar insuficiência adrenal.',
        contraindications: 'Não usar como broncodilatador de resgate em crise aguda; evitar em hipersensibilidade ao produto.',
        notes:
          'No ensaio de 30 cães: 100 µg/cão q8h × 5d, q12h × 5d, q24h × 5d, q48h × 5d; depois 50 µg/cão q48h × 10d. Foi eficaz com menos PU/PD que prednisona.',
      },
    ],
    adjuvantesViasAereasInferiores: [
      {
        drug: 'Terbutalina — teste terapêutico selecionado',
        indication: 'Broncoespasmo ou colapso/doença de pequenas vias aéreas concomitante; benefício no colapso traqueal isolado é controverso.',
        dose: '0,625–5 mg/cão (dose total, não mg/kg); em gatos: 0,625–1,25 mg/gato',
        frequency: 'q8–12h',
        route: 'VO',
        duration: 'Teste de 1–2 semanas; continuar apenas com melhora objetiva.',
        mechanism:
          'Agonista β₂-adrenérgico: relaxa músculo liso brônquico, reduz resistência das pequenas vias e pode diminuir pressões intratorácicas.',
        reassess: 'Em 7–14 dias; frequência cardíaca, ritmo, esforço, ausculta, tremores e resposta do diário de tosse.',
        cautions: 'Pode causar taquicardia, tremor, excitação, hipotensão, hiperglicemia e hipocalemia.',
        contraindications: 'Cautela em arritmia/cardiopatia, hipertensão, hipertireoidismo, diabetes, glaucoma ou convulsões.',
      },
      {
        drug: 'Teofilina de liberação prolongada — teste selecionado',
        indication: 'Doença/colapso de pequenas vias aéreas ou bronquite crônica concomitante; não fortalece a cartilagem traqueal.',
        dose: 'Inicial 10 mg/kg; faixa 5–20 mg/kg conforme tolerância e formulação',
        frequency: 'q12h inicialmente; faixa publicada q12–24h',
        route: 'VO, liberação prolongada',
        duration: 'Teste de 1–2 semanas; manutenção somente se benefício superar efeitos adversos.',
        mechanism:
          'Inibe PDE III/IV, antagoniza adenosina, aumenta cAMP, relaxa músculo liso, melhora depuração mucociliar e contratilidade diafragmática.',
        reassess: 'Em 7–14 dias; antes se vômito, agitação, tremor ou taquicardia. Considerar nível sérico se falha ou toxicidade.',
        cautions:
          'Índice terapêutico estreito e absorção variável. Calcular pelo peso magro em obesos; não triturar formulação de liberação prolongada.',
        contraindications:
          'Contraindicada em cães com histórico de convulsões; cautela em taquiarritmia, cardiopatia grave, úlcera GI, hepatopatia e hipoxemia grave.',
        notes: 'Enrofloxacina pode reduzir a depuração em cerca de 50%; macrolídeos, cimetidina e outros fármacos também podem elevar a exposição.',
      },
    ],
    evidenciaCorticoideInalatorio:
      'Talavera-López et al. (2023) randomizaram 30 cães com tosse e colapso traqueal para fluticasona inalatória ou prednisona oral por quatro semanas. Ambos os grupos melhoraram; ao final, o grupo inalatório apresentou escore clínico discretamente menor e menos poliúria/polidipsia. O tamanho amostral pequeno limita a precisão e não demonstra superioridade para todos os fenótipos.',
    planoDeReavaliacao: {
      kind: 'clinicalTable' as const,
      caption: 'Seguimento orientado pelo risco e pela resposta',
      headers: ['Momento', 'O que verificar', 'Decisão esperada'],
      rows: [
        ['Durante a crise', 'Esforço, SpO₂, mucosas, fadiga, temperatura, pressão e sedação.', 'Manter mínima manipulação; intubar/ventilar se oxigenação ou ventilação falhar.'],
        ['48–72 horas', 'Paroxismos, sono, alimentação, secreção, sedação, vômito/constipação.', 'Ajustar antitussígeno; antecipar retorno se piora, cianose ou síncope.'],
        ['7–14 dias', 'Diário de tosse, peso, exercício, técnica inalatória e efeitos dos fármacos.', 'Manter apenas o que trouxe benefício; iniciar/continuar desmame do corticoide.'],
        ['4 semanas', 'Resposta global, necessidade diária de resgate e comorbidades não controladas.', 'Redefinir fenótipo; discutir imagem dinâmica/endoscopia se resposta insuficiente.'],
        ['Estável: a cada 3–6 meses', 'Peso/BCS, tosse, exercício, síncope, efeitos crônicos e adesão ambiental.', 'Usar a menor carga medicamentosa eficaz e atualizar plano de crise.'],
        ['Após stent/prótese', 'Tosse, febre, secreção, dispneia, migração/fratura e tecido de granulação.', 'Seguir o calendário do centro intervencionista; sinais novos exigem avaliação imediata.'],
      ],
    },
    criteriosIntervencao: [
      'Obstrução respiratória importante, recorrente ou incapacitante apesar de manejo médico bem executado.',
      'Anatomia e extensão documentadas por avaliação dinâmica e/ou endoscópica.',
      'Comorbidades potencialmente tratáveis avaliadas antes do implante.',
      'Tutor compreende que tosse e medicamentos podem persistir e aceita seguimento prolongado.',
    ],
    oQueEvitar: [
      'Indicar stent apenas por grau anatômico alto em cão clinicamente controlado.',
      'Usar antibiótico empiricamente em toda exacerbação sem evidência de infecção.',
      'Prescrever broncodilatador como tratamento estrutural da cartilagem traqueal.',
      'Manter glicocorticoide sistêmico crônico sem reavaliar peso, efeitos adversos e alternativas.',
      'Provocar tosse ou realizar contenção intensa em paciente cianótico ou exausto.',
      'Administrar produtos antitussígenos humanos contendo paracetamol para pacientes felinos.',
    ],
    monitoramento: [
      'Diário semanal: frequência e duração dos paroxismos, sono interrompido, esforço respiratório e gatilhos.',
      'Peso e escore corporal em toda revisão.',
      'Eventos de cianose, síncope ou queda de tolerância ao exercício exigem reavaliação precoce.',
      'Após implante: tosse nova/pior, febre, secreção, dispneia ou alteração radiográfica justificam investigação de complicação.',
    ],
    prognosticoResumo:
      'Aproximadamente 70% a 80% dos cães com colapso traqueal mantêm excelente qualidade de vida e bom controle de sinais clínicos com o manejo conservador multimodal estruturado. Nos pacientes com obstrução grave refratária submetidos a implante de stent intraluminal de nitinol, o alívio imediato da asfixia é obtido na maioria esmagadora dos casos, porém os tutores devem ser esclarecidos de que a tosse pode persistir devido à presença do corpo estranho endoluminal e à traqueobroncomalácia coexistente. Em felinos com colapso primário grau IV, relatos contemporâneos como Tanaka & Uemura (2022) demonstram excelente resolução da dispneia com stent autoexpansível, sem migração ou quebra em seguimento prolongado superior a 188 dias.',
  },
  complications: {
    doencaNatural: [
      'Progressão da obstrução, broncomalácia, inflamação crônica, depuração mucociliar prejudicada e infecção secundária selecionada.',
      'Cianose, síncope, exaustão respiratória e possível hipertensão pulmonar em doença avançada ou multissegmentar.',
    ],
    aposStent: {
      kind: 'clinicalTable' as const,
      caption: 'Meta-análise de 15 estudos de stent traqueal em cães (Robin et al., 2024)',
      headers: ['Desfecho', 'Estimativa combinada'],
      rows: [
        ['Tosse precoce', '99%'],
        ['Tosse tardia', '75%'],
        ['Tosse tardia clinicamente relevante', '52%'],
        ['Infecção', '24%'],
        ['Tecido de granulação', '20%'],
        ['Fratura', '12%'],
        ['Recorrência do colapso', '10%'],
        ['Migração', '5%'],
      ],
    },
    leituraDaEvidencia:
      'As estimativas pós-stent vêm de estudos heterogêneos e centros especializados. Servem para consentimento e vigilância, não para prever exatamente o risco de um cão individual. O dado mais crítico para alinhamento com o tutor é a tosse tardia clinicamente relevante em 52% dos casos e a necessidade frequente de manter fármacos supressores.',
    figuraStentGatoTanaka2022: {
      kind: 'imageModal' as const,
      url: '/consulta-vet/colapso-traqueal/stent-traqueal-gato-tanaka-2022.jpg',
      caption: 'Radiografias torácicas imediatamente após cirurgia e aos 188 dias de pós-operatório demonstrando fixação estável de stent autoexpansível de nitinol em gata de 12 anos sem migração ou quebra (Tanaka & Uemura, 2022, Vet Med Sci, CC BY 4.0).',
    },
  },
  prevention: {
    prevencaoPrimaria:
      'Não há método comprovado para impedir a alteração estrutural em um cão predisposto. O objetivo prático é reduzir gatilhos e evitar que obesidade, irritantes e doenças respiratórias amplifiquem os sinais.',
    planoDomiciliar: [
      'Usar peitoral bem ajustado; evitar pressão no pescoço.',
      'Manter peso e condição corporal adequados.',
      'Evitar fumaça, incensos, sprays, poeira e ambientes quentes/abafados.',
      'Planejar exercício leve em horários frescos e reduzir excitação intensa.',
      'Filmar episódios e registrar frequência, duração e contexto para as revisões.',
    ],
    sinaisDeUrgencia:
      'Respiração difícil em repouso, língua ou mucosas azuladas, colapso/síncope, incapacidade de interromper o paroxismo ou exaustão exigem atendimento imediato.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['bronquite-cronica-caes-gatos', 'doenca-valvar-mitral-degenerativa-caes'],
  relatedMedicationSlugs: ['butorfanol', 'prednisolona'],
  references: [
    {
      id: 'ref-plumbs-10e',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: acepromazina, butorfanol, codeína, fluticasona, hidrocodona, terbutalina, teofilina e prednisolona/prednisona.',
      sourceType: 'Manual farmacológico do acervo',
      notes: 'Doses, mecanismos, contraindicações, interações, duração e monitorização dos fármacos.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-bsava-formulary-10e',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary. 10th ed. Part A: Canine and Feline. British Small Animal Veterinary Association; 2020. Monografias: Butorphanol, Fluticasone, Theophylline, Codeine, Terbutaline.',
      sourceType: 'Manual farmacológico do acervo',
      notes: 'Diretrizes posológicas e de segurança para cães e gatos.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-ettinger-9e',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E, eds. Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Chapter 215: Large Airway Diseases, “Tracheal Collapse (Dogs)”, pp. 1158–1160.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Fundamentos, apresentação, diagnóstico, manejo e prognóstico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 21: Disorders of the Trachea and Bronchi, “Tracheobronchomalacia (Collapsing Trachea)”, pp. 333–337; Chapter 25: Emergency Management of Respiratory Distress, p. 381.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Conceito de traqueobroncomalácia, dinâmica de pressão transmural, manejo de crise no plantão e prognóstico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-thrall-8e',
      citationText:
        'Thrall DE, ed. Textbook of Veterinary Diagnostic Radiology. 8th ed. Elsevier. Chapter 29: Canine and Feline Larynx and Trachea, “Tracheal and Bronchial Collapse”, pp. 602–603.',
      sourceType: 'Livro de diagnóstico por imagem do acervo',
      notes: 'Radiografia, fluoroscopia, graduação e planejamento de stent.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-endoscopy-2e',
      citationText:
        'McCarthy TC, ed. Veterinary Endoscopy for the Small Animal Practitioner. 2nd ed. Wiley-Blackwell; 2021. Chapter 5: Bronchoscopy, pp. 195–214.',
      sourceType: 'Livro de endoscopia do acervo',
      notes: 'Achados broncoscópicos, amostragem e segurança anestésica.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-kim-2024',
      citationText:
        'Kim MR, Kim SH, Ryu MO, et al. A retrospective study of tracheal collapse in small-breed dogs: 110 cases (2022–2024). Front Vet Sci. 2024;11:1448249.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1448249/full',
      notes: 'Fatores associados, broncomalácia e dissociação entre grau e tosse.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-robin-2024',
      citationText:
        'Robin T, Robin E, Le Boedec K, et al. A systematic review and meta-analysis of prevalence of complications after tracheal stenting in dogs. J Vet Intern Med. 2024;38(4):2034–2048.',
      sourceType: 'Revisão sistemática e meta-análise',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256162/',
      notes: 'Estimativas combinadas de complicações pós-stent.',
      evidenceLevel: 'Síntese de estudos observacionais',
    },
    {
      id: 'ref-carr-2022',
      citationText:
        'Carr SV, Reinero C, Rishniw M, Pritchard JC. Specialists’ approach to tracheal collapse: survey-based opinions on diagnostics, medical management, and comorbid diseases. J Am Vet Med Assoc. 2023;261(1):80–86.',
      sourceType: 'Levantamento internacional com especialistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36166502/',
      notes: '180 especialistas de 22 países; descreve prática contemporânea e lacunas de evidência, sem constituir guideline.',
      evidenceLevel: 'Survey clínico',
    },
    {
      id: 'ref-talavera-2023',
      citationText:
        'Talavera-López J, Sáez-Mengual O, Fernández-del-Palacio MJ. Comparative Study of Inhaled Fluticasone Versus Oral Prednisone in 30 Dogs with Cough and Tracheal Collapse. Vet Sci. 2023;10:548.',
      sourceType: 'Estudo prospectivo randomizado',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10535501/',
      notes: 'Amostra pequena; fornece esquema de quatro semanas, resposta clínica e eventos adversos comparativos.',
      evidenceLevel: 'Ensaio clínico pequeno',
    },
    {
      id: 'ref-congiusta-2021',
      citationText:
        'Congiusta M, Weisse C, Berent AC, Tozier E. Comparison of medical management alone and tracheal endoluminal stent placement in dogs with tracheal collapse. J Am Vet Med Assoc. 2021;258(3):279–289.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33496623/',
      notes: 'Seleção de casos médicos versus stent; comparação não randomizada.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-suematsu-radiography-2025',
      citationText:
        'Suematsu M, et al. Radiography underestimates the severity of tracheobronchoscopy-confirmed grade IV tracheal collapse in dogs. Am J Vet Res. 2025;86(9).',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40466662/',
      notes: 'Limitações da radiografia para excluir ou graduar doença grave.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-suematsu-prosthesis-2026',
      citationText:
        'Suematsu M, Minamoto T, Suematsu H, et al. Long-term outcomes of dogs with W-shaped or traditional tracheal collapse treated with a continuous extraluminal tracheal prosthesis. Vet Surg. 2026;55(1):118–130.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41148950/',
      notes: 'Resultados de centro especializado; não comparar diretamente com stent sem ajuste de seleção.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-tanaka-2022',
      citationText:
        'Tanaka M, Uemura A. Self-expanding tracheal stent placement in a cat with primary tracheal collapse. Vet Med Sci. 2022;8(4):1347–1351.',
      sourceType: 'Relato de caso clínico',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9297796/',
      notes: 'Primeiro relato de colocação de stent autoexpansível de nitinol em felino com colapso traqueal primário grau IV com sucesso em longo prazo.',
      evidenceLevel: 'Relato de caso',
    },
    {
      id: 'ref-mims-2008',
      citationText:
        'Mims DE, et al. Extraluminal tracheal ring prosthesis in a domestic cat with tracheal collapse. J Am Anim Hosp Assoc. 2008;44(3):149–153.',
      sourceType: 'Relato de caso clínico',
      notes: 'Descrição de prótese extraluminal em anéis de polipropileno em paciente felino.',
      evidenceLevel: 'Relato de caso',
    },
    {
      id: 'ref-weisse-2026',
      citationText:
        'Weisse C, Kwok SY, Berent A, Andy C. Prevalence of tracheal collapse syndrome, congenital portosystemic shunts, or both in Yorkshire Terriers at one veterinary hospital. J Vet Intern Med. 2026;40(3):aalag094.',
      sourceType: 'Estudo transversal de centro único',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42132355/',
      notes: 'Estimativa institucional em Yorkshire Terriers; não representa prevalência populacional global.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-acvs',
      citationText: 'American College of Veterinary Surgeons. Tracheal Collapse. Animal Health Topics.',
      sourceType: 'Revisão técnica especializada',
      url: 'https://www.acvs.org/small-animal/tracheal-collapse/',
      notes: 'Material educacional de especialista; não é consenso formal.',
      evidenceLevel: 'Revisão especializada',
    },
  ],
  isPublished: true,
  source: 'seed',
};
