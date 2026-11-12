import type { MedicationRecord } from '../../types/medication';

export const TRANSAMIN_PRODUCT_URL = 'https://www.zydusbrasil.com/produtos/transamin.php';
export const TRANSAMIN_LEAFLET_URL = 'https://www.zydusbrasil.com/produtos/bulas/prescricao/transamin.pdf';

const mechanism = 'O ácido tranexâmico (TXA) imita a lisina e ocupa, de forma reversível, pontos de ligação do plasminogênio. Isso dificulta sua ligação à fibrina e a ação da plasmina sobre a malha do coágulo. Se essa malha estiver se desfazendo cedo demais, o TXA pode prolongar sua estabilidade. Seu efeito depende de haver fibrina para preservar. Controle da fonte, reposição de componentes sanguíneos e tratamento da causa atendem a outras partes do problema.';
const monitoring = 'Acompanhe sangramento visível ou por imagem, perfusão, pressão arterial, tendência do hematócrito, função renal e eventos adversos. Quando disponível, use TEG ou ROTEM para comparar a lise do coágulo antes e depois e interpretar junto com força do coágulo, fibrinogênio e quadro clínico.';
const plumb = 'ref-book-foundations-plumbs-acido-tranexamico';
const bsava = 'ref-book-foundations-bsava-acido-tranexamico';

const regimens = [
  {
    id: 'txa-dog-iv-bsava', species: 'dog', indication: 'Sangramento canino com suspeita fundamentada de hiperfibrinólise',
    doseMin: 10, route: 'IV', frequency: 'A cada 8 h no BSAVA, por infusão lenta', duration: 'Reavaliar antes de cada dose',
    notes: 'Referência do BSAVA para uso adjuvante. Decida conforme a evolução do sangramento e, quando possível, a atividade fibrinolítica. A repetição depende da perfusão, função renal e risco trombótico.',
    referenceIds: [bsava], evidenceLevel: 'Formulário veterinário. Uso extra-bula.',
  },
  {
    id: 'txa-dog-oral-bsava', species: 'dog', indication: 'Via oral em cão estável, quando houver indicação de manter antifibrinólise',
    doseMin: 15, doseMax: 20, route: 'VO', frequency: 'A cada 8 h no BSAVA', duration: 'Individualizar conforme causa e resposta',
    notes: 'A absorção oral retarda o pico do efeito em comparação com a via IV. Antes da transição, confirme que o paciente está estável, tolera via oral e ainda tem indicação de tratamento. A apresentação de 250 mg pode inviabilizar uma fração precisa em cães pequenos.',
    referenceIds: [bsava, 'ref-txa-osekavage'], evidenceLevel: 'Formulário e farmacocinética canina. Uso extra-bula.',
  },
  {
    id: 'txa-dog-shock', species: 'dog', indication: 'Choque hemorrágico canino com hiperfibrinólise documentada',
    doseMin: 20, route: 'IV', frequency: 'Ataque único em 20 min, seguido de 20 mg/kg totais ao longo de 8 h', duration: 'Oito horas de manutenção no ensaio',
    notes: 'Regime de Mays et al. em pacientes selecionados por tromboelastografia, além do cuidado habitual. A manutenção equivale a 2,5 mg/kg/h, calculados a partir dos 20 mg/kg distribuídos em oito horas. O ensaio avaliou principalmente lise do coágulo.',
    referenceIds: ['ref-txa-mays'], evidenceLevel: 'Ensaio randomizado. Benefício demonstrado no desfecho viscoelástico sob estímulo.',
  },
  {
    id: 'txa-dog-angiostrongylus', species: 'dog', indication: 'Angiostrongilose canina com hiperfibrinólise',
    doseMin: 10, doseMax: 20, route: 'IV', frequency: 'Infundir em 15–20 min. Reavaliar repetição em 6–8 h conforme viscoelastometria', duration: 'Guiada pelo quadro e pela lise',
    notes: 'Se o coágulo se desfaz cedo e também há hipofibrinogenemia, há dois problemas a tratar. O TXA aborda a lise. Reposição de fibrinogênio quando indicada e tratamento antiparasitário têm objetivos próprios.',
    referenceIds: [plumb, 'ref-txa-angiostrongylus'], evidenceLevel: 'Série clínica e formulário. Uso extra-bula.',
  },
  {
    id: 'txa-dog-cri-plumb', species: 'dog', indication: 'Infusão contínua canina descrita no Plumb',
    doseMin: 10, route: 'IV', frequency: 'Ataque de 10 mg/kg, seguido de 10 mg/kg/h', duration: 'Três horas de manutenção na referência',
    notes: 'A referência de origem avaliou cães saudáveis. A taxa de manutenção é quatro vezes a taxa do ensaio de Mays. Compare a população, a dose total e a duração antes de interpretar os protocolos. Referência para discussão hospitalar.',
    referenceIds: [plumb, 'ref-txa-kelmer'], evidenceLevel: 'Formulário apoiado por estudo em cães saudáveis.',
  },
  {
    id: 'txa-cat-iv', species: 'cat', indication: 'Hemorragia em gato hospitalizado, uso adjuvante descrito',
    doseMin: 10, route: 'IV', frequency: 'A cada 6 h na série de Kelley, com reavaliação antes de repetir', duration: 'Sem duração ideal estabelecida',
    notes: 'A dose mediana na série foi 10 mg/kg. O estudo descreve como o fármaco foi usado e quais eventos foram registrados. A decisão em gatos exige considerar a causa da hemorragia e o risco de trombose, especialmente em cardiopatas.',
    referenceIds: ['ref-txa-kelley', 'ref-txa-cats'], evidenceLevel: 'Coortes retrospectivas. Regime observado, sem validação de eficácia.',
  },
  {
    id: 'txa-dog-emesis', species: 'dog', indication: 'Indução de vômito após ingestão, uso toxicológico descrito',
    doseMin: 50, route: 'IV', frequency: 'Dose inicial do estudo de Orito et al.', duration: 'Intervenção única inicial, sob supervisão',
    notes: 'Objetivo diferente da hemostasia. O desfecho foi vomitar, sem comprovação de remoção completa do material. A decisão depende do agente, do tempo desde a ingestão e da proteção das vias aéreas. Evite induzir vômito quando houver risco de aspiração, ingestão de cáusticos ou objeto perfurante.',
    referenceIds: [plumb, 'ref-txa-orito'], evidenceLevel: 'Série prospectiva sem comparador. Fora da calculadora.',
  },
] as const;

const studies: NonNullable<MedicationRecord['clinicalStudiesCommented']> = [
  {
    referenceId: 'ref-txa-mays', title: 'Choque hemorrágico canino com hiperfibrinólise', authorsYear: 'Mays et al. (2025)', journal: 'JAVMA 263:54–62',
    studyDesign: 'Ensaio randomizado, cego, com salina', sampleSize: '25 cães em dois hospitais',
    methodology: 'Se o coágulo se desfaz cedo num cão em choque, o TXA consegue preservar essa fibrina? Os autores selecionaram cães com choque hemorrágico e evidência de hiperfibrinólise. Além do cuidado habitual, sortearam TXA ou salina. Mediram a lise com tromboelastografia rápida, inclusive após adicionar tPA à amostra para desafiar o coágulo, antes da dose e às 8, 12 e 24 horas.',
    mainFindings: 'O traçado rápido convencional normalizou em todos os sobreviventes. No teste com tPA, a lise se normalizou às oito horas em 14 de 14 cães com TXA e em 8 de 11 com salina. A lise mediana foi menor no grupo TXA às 8 e 12 horas.',
    limitations: 'A população era pequena e selecionada pelo fenótipo de coagulação. O resultado viscoelástico, especialmente sob estímulo em laboratório, não estabelece ganho de sobrevida ou economia de hemocomponentes.',
    clinicalTakeaway: 'O ensaio ajuda a escolher o paciente em que o mecanismo do TXA faz sentido: um cão que sangra e mostra lise excessiva. Depois de administrar, acompanhe se a hemorragia e a perfusão de fato melhoram. Um traçado mais estável responde à pergunta sobre o coágulo. A resposta do animal depende também de fechar a fonte e repor o que perdeu.',
  },
  {
    referenceId: 'ref-txa-sigrist-hemo', title: 'Hemoabdômen canino sob manejo inicial não cirúrgico', authorsYear: 'Sigrist et al. (2022)', journal: 'Schweiz Arch Tierheilkd 164:437–446',
    studyDesign: 'Coorte retrospectiva', sampleSize: '48 cães, 28 expostos ao TXA',
    methodology: 'Ter sangue livre no abdômen já identifica quem se beneficia do antifibrinolítico? Os autores compararam cães que receberam 20 mg/kg IV até três horas após o diagnóstico com cães sem TXA. Durante 48 horas, procuraram aumento do líquido abdominal, queda do hematócrito, necessidade de exploração cirúrgica e transfusão.',
    mainFindings: 'O estudo não encontrou diferença nos indicadores de sangramento persistente nem na necessidade de transfusão. Nenhum dos 16 cães com tromboelastometria apresentou hiperfibrinólise na chegada.',
    limitations: 'A equipe escolheu o tratamento sem sorteio e apenas parte da amostra fez o teste. Os dados não excluem benefício em um subgrupo com lise acelerada documentada.',
    clinicalTakeaway: 'Sangue no abdômen mostra onde houve perda, mas deixa em aberto o mecanismo. Se o cão continua acumulando líquido ou perde perfusão, esse estudo dá pouca base para esperar que o TXA resolva o quadro. Reavalie a fonte e a necessidade de intervenção e transfusão. A seleção por hiperfibrinólise é a diferença que ajuda a entender o resultado de Mays.',
  },
  {
    referenceId: 'ref-txa-angiostrongylus', title: 'Lise acelerada e fibrinogênio baixo na angiostrongilose', authorsYear: 'Sigrist et al. (2017)', journal: 'JVIM 31:1091–1099',
    studyDesign: 'Série retrospectiva com ROTEM', sampleSize: '21 cães infectados',
    methodology: 'Por que alguns cães com Angiostrongylus vasorum sangram tanto? Os autores compararam traçados ROTEM de cães infectados com e sem hemorragia. Separaram a rapidez com que o coágulo se desfazia da força atribuída à fibrina. Nos cães tratados, acompanharam a resposta após TXA ou reposição de plasma.',
    mainFindings: 'Oito de 12 cães com sangramento apresentaram hiperfibrinólise, contra um de nove sem sangramento. A lise caiu nos sete cães hiperfibrinolíticos tratados com TXA. A função da fibrina no FIBTEM melhorou após plasma em parte dos pacientes.',
    limitations: 'A série foi pequena, retrospectiva e incluiu tratamentos simultâneos. Ela descreve respostas dos traçados sem isolar um efeito sobre a mortalidade.',
    clinicalTakeaway: 'Imagine um coágulo fraco que também se desfaz cedo. Preservá-lo com TXA aborda a lise, mas a falta de fibrinogênio ainda pode limitar sua resistência. O trabalho ajuda a procurar e tratar esses problemas em paralelo, enquanto se trata o parasito e se monitora o sangramento.',
  },
  {
    referenceId: 'ref-txa-osekavage', title: 'Tempo de ação das vias oral e intravenosa', authorsYear: 'Osekavage et al. (2018)', journal: 'AJVR 79:1057–1063',
    studyDesign: 'Estudo cruzado randomizado de farmacocinética e farmacodinâmica', sampleSize: 'Seis cães adultos saudáveis',
    methodology: 'A via oral preserva o coágulo com a mesma rapidez da IV? Cada cão recebeu, em ocasiões diferentes, 10 ou 20 mg/kg IV e aproximadamente 15 ou 20 mg/kg por boca. Os autores mediram concentrações plasmáticas e testaram o sangue colhido num modelo de lise induzida.',
    mainFindings: 'As quatro exposições reduziram a lise no modelo. O pico do efeito após administração oral ocorreu mais tarde. A dose de 20 mg/kg IV atingiu brevemente concentrações propostas para inibição completa naquele modelo.',
    limitations: 'Os cães eram saudáveis e a lise foi provocada em laboratório. A concentração experimental e o tempo até o pico podem diferir em pacientes com choque, lesão renal ou má absorção.',
    clinicalTakeaway: 'O estudo explica por que a via importa mesmo quando duas doses parecem próximas em mg/kg. A apresentação oral exige tempo para absorção. Se a decisão precisa produzir efeito rápido, esse atraso pesa. Num cão estável, a pergunta passa a ser se há indicação de manter antifibrinólise e se a via oral é viável.',
  },
  {
    referenceId: 'ref-txa-spine-small', title: 'Infusão durante hemilaminectomia com fenestração', authorsYear: 'Estudo de hemilaminectomia (2023)', journal: 'Topics in Companion Animal Medicine',
    studyDesign: 'Comparação prospectiva com solução salina', sampleSize: '16 cães, oito por grupo',
    methodology: 'O TXA reduz a perda durante uma técnica específica de cirurgia de coluna? Os autores compararam salina com 20 mg/kg IV iniciais, seguidos de 2 mg/kg/h, durante hemilaminectomia associada à fenestração de disco.',
    mainFindings: 'O grupo que recebeu o fármaco perdeu menos sangue durante a cirurgia estudada.',
    limitations: 'A amostra pequena e a técnica definida deixam em aberto a magnitude do efeito em outros procedimentos e o impacto em transfusão ou recuperação.',
    clinicalTakeaway: 'O trabalho dá uma hipótese concreta para equipes que lidam com essa técnica: manter exposição durante a cirurgia pode influenciar a perda medida. Para usar o resultado, confira se a operação, o risco de sangramento e o esquema se parecem com os do estudo. A leitura ganha contexto quando se compara com o ensaio maior de dose única.',
  },
  {
    referenceId: 'ref-txa-spine-large', title: 'Dose pré-operatória única em cirurgia de coluna', authorsYear: 'De Celis Perez et al. (2026)', journal: 'Veterinary Anaesthesia and Analgesia 53:101317',
    studyDesign: 'Ensaio prospectivo randomizado e cego', sampleSize: '101 cães',
    methodology: 'Uma única dose antes da cirurgia traz benefício suficiente para uso de rotina? Os pesquisadores sortearam 15 mg/kg IV ou solução de Hartmann, em blocos por tipo de cirurgia. Estimaram a perda por método gravimétrico e compararam o volume perdido por kg.',
    mainFindings: 'A perda média foi de 3,20 mL/kg com TXA e 3,70 mL/kg no controle, sem diferença demonstrada. Perda superior a 10% da volemia estimada ocorreu em seis cães com TXA e sete no controle.',
    limitations: 'O estudo testou dose única, com técnicas diferentes de cirurgia e anestesia a critério do clínico. Ele não comparou dose única e infusão contínua entre si.',
    clinicalTakeaway: 'A diferença entre os ensaios é uma pista sobre onde a evidência termina. Um investigou infusão numa técnica específica. O outro perguntou se bastava dar uma dose prévia para uma população mais ampla. O segundo não sustenta profilaxia universal com esse esquema. Os dois juntos ajudam a discutir a indicação sem presumir que todo procedimento de coluna tem o mesmo risco.',
  },
  {
    referenceId: 'ref-txa-kelley', title: 'O que se observou na UTI de cães e gatos', authorsYear: 'Kelley et al. (2022)', journal: 'JVECC 32:791–799',
    studyDesign: 'Revisão de prontuários de animais expostos', sampleSize: '226 cães e 28 gatos na análise',
    methodology: 'Como o TXA vinha sendo usado em animais graves, e quais reações apareciam nos prontuários? Os autores extraíram dose, diagnósticos, transfusão e eventos adversos em cães e gatos de uma UTI. Compararam o volume transfundido conforme o TXA tivesse sido dado antes ou depois.',
    mainFindings: 'A dose IV mediana foi 10 mg/kg nas duas espécies. O volume transfundido não diferiu pelo momento da administração. Houve hipersalivação e um relato de convulsão em cão após exposição cumulativa de 280 mg/kg.',
    limitations: 'A série não tinha grupo sem TXA para medir eficácia ou atribuir causalidade. Prontuários podem subestimar reações, e o número de gatos limita as estimativas nessa espécie.',
    clinicalTakeaway: 'O estudo ajuda a planejar vigilância e a entender como o fármaco foi usado no hospital. O caso de convulsão torna importante conferir dose acumulada e duração da bomba. Em gatos, encontrar uma dose mediana em prontuários informa a experiência publicada, mas ainda deixa em aberto quais pacientes ganham com ela.',
  },
  {
    referenceId: 'ref-txa-cats', title: 'Antifibrinolíticos em gatos com diferentes causas de sangramento', authorsYear: 'Wahldén et al. (2023)', journal: 'JAAHA 59:177–183',
    studyDesign: 'Série retrospectiva multicêntrica',
    methodology: 'Em quais situações clínicos usaram TXA ou ácido aminocaproico em gatos? A equipe buscou prontuários de gatos que receberam os medicamentos entre 2015 e 2021 e levantou indicação, dose, via, tempo de uso, eventos adversos e evolução.',
    mainFindings: 'Foram descritos 30 casos com TXA e cinco com ácido aminocaproico. A hemorragia não traumática foi o motivo mais comum. A dose mediana de TXA foi 10 mg/kg e a via mais usada foi a IV. Houve sete eventos potencialmente adversos no conjunto dos 35 gatos, sem atribuição causal estabelecida.',
    limitations: 'Os esquemas e as causas da hemorragia variaram. Os dados não permitem concluir se um antifibrinolítico reduz sangramento ou melhora sobrevida em gatos.',
    clinicalTakeaway: 'O trabalho mostra que o uso felino publicado inclui situações bem diferentes, de hemorragia espontânea a cirurgia. Para decidir no caso individual, procure primeiro o mecanismo que o TXA poderia corrigir e estime o risco trombótico. Uma dose frequente na série não resolve essa decisão.',
  },
  {
    referenceId: 'ref-txa-orito', title: 'Vômito após ingestão acidental em cães', authorsYear: 'Orito et al. (2017)', journal: 'J Vet Med Sci 79:1978–1982',
    studyDesign: 'Estudo prospectivo observacional', sampleSize: '137 cães',
    methodology: 'Se houver indicação de esvaziar o estômago, o TXA consegue provocar vômito? Os autores observaram cães atendidos após ingestão acidental que receberam 50 mg/kg IV inicialmente. Em parte dos que não responderam, houve doses adicionais.',
    mainFindings: 'Vomitaram 116 de 137 cães após a primeira dose. O total chegou a 129 de 137 após as tentativas adicionais.',
    limitations: 'Vomitar não mede quanto material saiu do estômago. Sem comparação direta, a série não estabelece superioridade sobre outros eméticos nem segurança em cães com alto risco de aspiração.',
    clinicalTakeaway: 'Aqui, o vômito era o objetivo. Na hemostasia, é um evento adverso que pode comprometer um animal debilitado. Por isso a dose usada na descontaminação fica em outro contexto. Antes de tentar induzir vômito, decida se trazer o material de volta pelo esôfago é seguro para aquele paciente.',
  },
];

const indications = [
  'Uso adjuvante extra-bula em cães e gatos com hemorragia em que a lise precoce do coágulo seja plausível ou documentada. A evidência clínica mais direta é em cães com choque hemorrágico e hiperfibrinólise selecionados por teste viscoelástico.',
  'Angiostrongilose canina com hiperfibrinólise, em conjunto com tratamento da causa e correção das deficiências hemostáticas identificadas.',
  'Avaliação individual em cirurgia com risco hemorrágico específico. Os resultados variam com o procedimento e o esquema. A dose única pré-operatória não reduziu perda em um ensaio maior de cirurgia de coluna.',
  'Uso toxicológico para induzir vômito em cães selecionados tem objetivo e exposição próprios. As doses desse cenário ficam fora do cálculo hemostático.',
];
const contraindications = [
  'Hipersensibilidade ao fármaco. Evitar em trombose ou tromboembolismo ativo e avaliar cuidadosamente antecedentes ou risco trombótico elevado.',
  'A solução injetável requer identificação inequívoca da via. A administração intratecal ou epidural pode provocar convulsões, arritmias e morte.',
];
const cautions = [
  'Em hematúria de origem renal ou ureteral, considere obstrução por coágulo. Localize a origem e avalie o fluxo urinário antes de decidir.',
  'Em insuficiência renal, a exposição pode aumentar. Individualize a decisão, dose e intervalo, especialmente antes de repetir ou manter infusão. As tabelas de ajuste da bula humana usam parâmetros e indicações humanas.',
  'Na coagulação intravascular disseminada, defina se predomina sangramento com lise excessiva ou formação disseminada de trombos. Um paciente pode sangrar e ainda apresentar fibrinólise reduzida.',
  'Em paciente com convulsões, lesão neurológica ou exposição cumulativa elevada, avalie cuidadosamente a indicação. Evite extrapolar regimes de cães para gatos.',
];
const adverseEffects = [
  'Náusea, hipersalivação, vômito e diarreia. Em cães, vômito é mais provável com dose alta ou administração IV rápida.',
  'Hipotensão com administração IV rápida, descrita na documentação humana. Monitore pressão e perfusão no paciente veterinário, em especial se já estiver em choque.',
  'Convulsão, alteração visual e trombose merecem atenção. A frequência em cães e gatos permanece incerta. O Plumb descreve toxicidade retiniana experimental com exposição alta e prolongada.',
];
const interactions = [
  'Alteplase e outros trombolíticos têm objetivo farmacológico oposto ao TXA. Discuta qualquer associação em protocolo especializado.',
  'Estrogênios e terapias pró-coagulantes exigem avaliação do risco trombótico. A evidência de interação clínica vem sobretudo de humanos. Reposição de hemocomponentes indicada pelo quadro tem avaliação própria.',
  'O Plumb descreve possível aumento de risco de sangramento com clorpromazina. É um sinal de interação potencial, sem efeito quantitativo estabelecido em pequenos animais.',
  'Compatibilidade é uma questão de preparo. Evite misturar com sangue ou soluções com penicilina. Use acesso separado ou siga o protocolo institucional para compartilhamento de linha.',
];

export const acidoTranexamicoMedicationRecord: MedicationRecord = {
  id: 'med-acido-tranexamico',
  slug: 'acido-tranexamico',
  title: 'Ácido tranexâmico',
  activeIngredient: 'Ácido tranexâmico',
  pharmacologicClass: 'Antifibrinolítico, análogo sintético da lisina',
  category: 'emergencia-intensivismo',
  species: ['dog', 'cat'],
  tradeNames: ['Transamin®'],
  officialSiteUrl: TRANSAMIN_PRODUCT_URL,
  leafletUrl: TRANSAMIN_LEAFLET_URL,
  tags: ['ácido tranexâmico', 'TXA', 'Transamin', 'antifibrinolítico', 'hiperfibrinólise', 'hemorragia', 'choque hemorrágico'],
  plainLanguageSummary: 'Quando um animal sangra, o corpo forma um coágulo para tampar o local. O ácido tranexâmico ajuda a preservar esse coágulo quando ele se desfaz cedo demais. É um recurso do atendimento veterinário. Encontrar e controlar a origem do sangramento continua sendo parte do tratamento.',
  mechanismOfAction: mechanism,
  indications,
  contraindications,
  cautions,
  adverseEffects,
  interactions,
  routes: ['IV', 'VO'],
  pillars: [
    { title: 'O alvo é a lise do coágulo', desc: 'O medicamento desacelera a quebra da fibrina. A indicação faz mais sentido quando essa quebra está contribuindo para a perda de sangue.' },
    { title: 'A fonte do sangramento orienta a conduta', desc: 'Um vaso lesionado, uma deficiência de fibrinogênio e um coágulo que se desfaz cedo exigem intervenções diferentes, mesmo quando coexistem.' },
    { title: 'A resposta precisa aparecer no paciente', desc: 'Relacione o traçado viscoelástico à perfusão, à tendência do hematócrito e à perda de sangue observada.' },
  ],
  quickSummaryHighlights: ['Cães e gatos. Uso veterinário extra-bula das apresentações humanas listadas.', 'Evidência dependente da indicação. A experiência felina é principalmente observacional.', 'Confira concentração, via, velocidade e exposição acumulada antes de administrar.'],
  clinicalWarningItems: [
    { label: 'Erro de via', text: contraindications[1] },
    { label: 'Trombose e função renal', text: 'Revise risco trombótico e depuração renal antes de repetir doses ou programar uma infusão contínua.' },
    { label: 'Choque hemorrágico', text: 'Organize controle da fonte e ressuscitação enquanto avalia se há um alvo para o antifibrinolítico.' },
  ],
  quickIndications: [
    { condition: regimens[0].indication, species: 'dog', doseSummary: '10 mg/kg a cada 8 h como referência do BSAVA', route: 'IV lenta', duration: 'Conforme reavaliação hospitalar' },
    { condition: regimens[3].indication, species: 'dog', doseSummary: '10–20 mg/kg em 15–20 min na série clínica', route: 'IV lenta', duration: 'Repetição guiada pelo traçado e pela clínica' },
    { condition: regimens[5].indication, species: 'cat', doseSummary: '10 mg/kg foi a mediana observada em prontuários', route: 'IV', duration: 'Sem regime validado' },
  ],
  detailedIndications: regimens.map((regimen) => ({
    id: regimen.id,
    indication: regimen.indication,
    species: regimen.species,
    dose: ('doseMax' in regimen ? regimen.doseMin + '–' + regimen.doseMax : regimen.doseMin) + ' mg/kg',
    route: regimen.route,
    frequency: regimen.frequency,
    duration: regimen.duration,
    mechanismOfAction: regimen.id === 'txa-dog-emesis' ? 'A exposição IV elevada pode desencadear o reflexo do vômito. O Plumb descreve participação provável de vias da neurocinina.' : mechanism,
    clinicalRationale: regimen.notes,
    monitoring: regimen.id === 'txa-dog-emesis' ? 'Proteja as vias aéreas e acompanhe vômito, estado neurológico e sinais de aspiração.' : monitoring,
    referenceIds: [...regimen.referenceIds],
    evidenceLevel: regimen.evidenceLevel,
  })),
  doses: regimens.map((regimen) => ({
    ...regimen,
    referenceIds: [...regimen.referenceIds],
    doseUnit: 'mg',
    perWeightUnit: 'kg',
    calculatorEnabled: regimen.id === 'txa-dog-iv-bsava',
    presentationId: regimen.route === 'IV' ? 'txa-50mgml' : 'txa-250mg',
  })),
  presentations: [
    {
      id: 'txa-50mgml', name: 'Transamin® injetável', form: 'Solução injetável', concentrationValue: 50,
      concentrationUnit: 'mg/mL', packInfo: 'Ampola de 5 mL, com 250 mg no total. Caixa com 5 ampolas.',
      route: 'IV', channel: 'human_pharmacy', commercialProductSlug: 'transamin-zydus',
      scoringInfo: 'Para uma dose já definida de 100 mg, aspire 2 mL da ampola de 50 mg/mL. Os 250 mg na embalagem correspondem ao conteúdo dos 5 mL. Se o preparo for diluído, registre em separado o volume aspirado, o volume final e a concentração final. Identifique a seringa como ácido tranexâmico IV e administre em ambiente hospitalar. A bula brasileira orienta uso endovenoso e administração isolada de outros medicamentos.',
    },
    {
      id: 'txa-250mg', name: 'Transamin® comprimido revestido', form: 'Comprimido revestido', concentrationValue: 250,
      concentrationUnit: 'mg/comprimido', packInfo: 'Caixa com 12 comprimidos revestidos.',
      route: 'VO', channel: 'human_pharmacy', commercialProductSlug: 'transamin-zydus',
      scoringInfo: 'Os 250 mg são a quantidade por comprimido inteiro. Por exemplo, se o veterinário determinar 100 mg, o comprimido inteiro entregaria 2,5 vezes a dose. A fração matemática de 0,4 comprimido não garante uma divisão precisa. Se a dose prescrita não puder ser dispensada com precisão, discuta uma apresentação adequada com o prescritor e o farmacêutico. A via oral pressupõe paciente estável e capaz de engolir.',
    },
  ],
  genericBrandsNote: 'As duas apresentações são humanas e têm o mesmo princípio ativo. A ampola expressa concentração em mg/mL e o comprimido expressa quantidade por unidade. Se consultar uma referência com ampola de 100 mg/mL, recalcule a partir do rótulo disponível. Para 100 mg, são 2 mL com 50 mg/mL ou 1 mL com 100 mg/mL. Transportar o volume de uma apresentação para a outra pode dobrar a dose.',
  practicalWeightTable: {
    standardDoseText: 'Tabela de conversão para o esquema canino de referência do BSAVA, de 10 mg/kg IV, usando a ampola de 50 mg/mL. Multiplique o peso por 10 para obter os miligramas e divida por 50 para obter o volume a aspirar. Para 10 kg, a conta dá 100 mg e 2 mL. O volume final, a velocidade e a repetição dependem do preparo e da avaliação clínica.',
    headers: ['Peso', 'Dose de referência', 'Volume a aspirar', 'Concentração da ampola'],
    rows: [5, 10, 15, 20, 30, 40].map((weight) => ({
      weight: weight + ' kg', totalDose: (10 * weight) + ' mg', col1: (weight / 5).toLocaleString('pt-BR') + ' mL', col2: '50 mg/mL',
    })),
  },
  administration: [
    'Confirme o peso, a concentração em mg/mL, a via e o tempo de administração. Rotule seringa e bomba com nome e via IV. Separe o fármaco de soluções neuraxiais.',
    'Em infusão contínua, registre separadamente a dose de ataque, a taxa em mg/kg/h, a duração e a dose total prevista. Reavalie o paciente e a bomba em cada passagem de plantão.',
  ],
  monitoringParameters: [
    'Antes da dose, registre a fonte provável, a perda observável, a perfusão, a pressão e o suporte já iniciado. Quando possível, colha amostras para hemograma, plaquetas, fibrinogênio, função renal e avaliação da coagulação, sem atrasar o controle da fonte ou a ressuscitação.',
    'Durante a administração, acompanhe pressão, pulso, perfusão e estado neurológico. Se a pressão cair, confira a velocidade e procure sinais de reação aguda ou perda contínua. No paciente hemorrágico, essa distinção muda o que precisa ser tratado naquele momento.',
    'Depois da dose, compare o paciente com o ponto de partida. Observe tendência do hematócrito junto da perfusão e da perda observável. O hematócrito inicial pode subestimar a perda aguda, e fluidos ou transfusão mudam sua leitura.',
    'Quando houver TEG ou ROTEM, compare exames feitos com o mesmo método e leia a lise junto com a firmeza do coágulo. TP e TTPa avaliam etapas da coagulação e têm utilidade diferente. Um traçado com menos lise e um paciente ainda instável pedem nova avaliação da fonte, da reposição e de outras causas de choque.',
    'Antes de repetir ou prolongar a infusão, some a dose de ataque e o que a bomba já entregou. Revise diurese, creatinina, eventos adversos e se a lise ainda contribui para a hemorragia. A evolução clínica orienta a continuidade.',
  ],
  clientInformation: [
    'O medicamento ajuda a preservar o coágulo quando ele se desfaz cedo. Pergunte à equipe qual é a causa da hemorragia e como será avaliada a resposta.',
    'Procure atendimento imediato se o animal voltar a sangrar, ficar muito pálido, respirar com dificuldade, desmaiar ou apresentar convulsão.',
  ],
  pharmacokineticsData: {
    absorption: 'Em cães saudáveis, o estudo cruzado de Osekavage observou efeito antifibrinolítico mais tardio por via oral. A via IV dispensa absorção. Em choque, a resposta pela via oral pode ser menos previsível.',
    distribution: 'O Plumb descreve distribuição em líquidos corporais e baixa ligação proteica com base sobretudo em dados humanos. Cães e gatos em choque podem apresentar distribuição diferente da observada em animais saudáveis.',
    metabolism: 'A documentação humana descreve pouco metabolismo. A maior parte do fármaco é eliminada inalterada na urina.',
    elimination: 'A depuração renal é clinicamente relevante em exposições repetidas. A função renal e o quadro do paciente orientam a reavaliação. Não há tabela de ajuste validada por estágio IRIS para os esquemas desta ficha.',
    cnsPenetration: 'A exposição do sistema nervoso é especialmente perigosa em erro neuraxial. O antagonismo de receptores inibitórios de glicina e GABA é um mecanismo proposto para convulsões.',
  },
  attentionData: {
    attentionSubtitle: 'Via IV, risco trombótico, função renal e vigilância durante a infusão',
    precautions: [
      { condition: 'Trombose ou tromboembolismo', alertLevel: 'contraindicated', physiologicalExplanation: 'Preservar fibrina pode estabilizar também um trombo patológico.', clinicalAction: contraindications[0] },
      { condition: 'Erro de via neuraxial', alertLevel: 'contraindicated', physiologicalExplanation: 'O contato direto com o sistema nervoso pode causar toxicidade grave.', clinicalAction: contraindications[1] + ' Rotule a seringa e mantenha armazenamento separado de anestésicos locais.' },
      { condition: 'Hematúria de trato urinário superior', alertLevel: 'warning', physiologicalExplanation: 'Coágulos persistentes podem obstruir o ureter e agravar o comprometimento renal.', clinicalAction: cautions[0] },
      { condition: 'Coagulação intravascular disseminada', alertLevel: 'warning', physiologicalExplanation: 'Sangramento e trombose podem coexistir. A fibrinólise pode estar aumentada ou reduzida.', clinicalAction: cautions[2] },
      { condition: 'Exposição elevada ou paciente neurológico', alertLevel: 'caution', physiologicalExplanation: 'Acúmulo e altas concentrações podem favorecer neurotoxicidade.', clinicalAction: cautions[3] },
      { condition: 'Hipersensibilidade conhecida', alertLevel: 'contraindicated', physiologicalExplanation: 'Uma nova exposição pode desencadear reação aguda. Em paciente hemorrágico, hipotensão e alterações respiratórias também podem decorrer da própria emergência.', clinicalAction: 'Revise reações anteriores ao fármaco ou aos componentes da apresentação. Se surgirem sinais compatíveis com reação aguda durante a administração, interrompa e avalie imediatamente vias aéreas, respiração e circulação.' },
      { condition: 'Hematúria com dificuldade de urinar', alertLevel: 'warning', physiologicalExplanation: 'Preservar um coágulo dentro do trato urinário pode dificultar a drenagem. Sangramento, coágulos e obstrução exigem avaliação da origem e da patência.', clinicalAction: 'Diferencie redução de produção urinária de retenção ou obstrução. Se houver hematúria com dor, esforço improdutivo ou queda de diurese, investigue antes de repetir TXA.' },
    ],
    adverseEffectsDetailed: [
      { effect: 'Náusea, hipersalivação, vômito ou diarreia', frequency: 'unknown', mechanism: 'O vômito pode ocorrer logo após a dose IV e depende da exposição. Em cães, doses elevadas também foram estudadas para provocar deliberadamente o reflexo.', clinicalManagement: 'Interrompa a infusão para avaliar o paciente se houver vômito ou deterioração. Proteja as vias aéreas, confira dose e velocidade e avalie necessidade de suporte.' },
      { effect: 'Hipotensão durante administração IV', frequency: 'unknown', mechanism: 'A documentação humana relaciona administração rápida à queda de pressão. No paciente em choque, perda persistente também pode explicar a hipotensão.', clinicalManagement: 'Monitore pressão e perfusão durante a infusão. Se houver queda, pause e investigue velocidade, reação aguda e progressão da hemorragia.' },
      { effect: 'Convulsão, tremores ou alteração de consciência', frequency: 'unknown', mechanism: 'O bloqueio de vias inibitórias do sistema nervoso é um mecanismo proposto. Exposição cumulativa elevada, depuração renal reduzida e erro neuraxial aumentam a preocupação.', clinicalManagement: 'Interrompa a administração e faça avaliação emergencial. Confira via, dose acumulada, concentração final e tempo da bomba.' },
      { effect: 'Alterações visuais ou suspeita de tromboembolismo', frequency: 'unknown', mechanism: 'A toxicidade retiniana em cães e gatos foi descrita em condições experimentais de exposição elevada e prolongada. A frequência clínica de tromboembolismo em pequenos animais é incerta.', clinicalManagement: 'Reavalie imediatamente se houver alteração visual, dispneia súbita ou déficit de perfusão. Suspenda enquanto a equipe avalia a suspeita e a necessidade do medicamento.' },
      { effect: 'Dose excessiva ou erro de programação da bomba', frequency: 'overdose', mechanism: 'Confundir mg/mL com mg por ampola, ou confundir dose total com taxa horária, pode aumentar muito a exposição. Kelley e colaboradores registraram uma convulsão após exposição cumulativa elevada. Um relato isolado não estabelece um limiar de toxicidade.', clinicalManagement: 'Interrompa a administração e reconstrua a exposição com peso, concentração, volume efetivamente entregue, duração e via. Avalie circulação, respiração, função renal e estado neurológico. Se houver suspeita de administração neuraxial, trate como emergência imediata.' },
    ],
    doseReductionGuidelines: [
      { clinicalCondition: 'Lesão renal ou oligúria', recommendedAdjustment: 'Registre creatinina, tendência da diurese, perfusão e quantidade já administrada. Antes de repetir ou prolongar uma infusão, reavalie se o benefício esperado justifica a exposição adicional. As tabelas humanas de creatinina não foram validadas para definir a dose veterinária por estágio IRIS.', physiologicalRationale: 'Se a eliminação renal diminui, a dose anterior pode continuar circulando quando a próxima entra. O problema é maior com repetições ou manutenção prolongada. Em choque, a diurese pode cair antes que a creatinina reflita a mudança de função.' },
      { clinicalCondition: 'Vômito ou queda de pressão durante a administração', recommendedAdjustment: 'Interrompa a administração para avaliar via, velocidade, pressão e vias aéreas. Revise necessidade e plano de administração antes de reiniciar.', physiologicalRationale: 'A velocidade e a exposição influenciam a tolerabilidade, mas em choque a própria hemorragia também pode causar hipotensão.' },
    ],
    drugInteractionsDetailed: [
      { drugOrClass: 'Trombolíticos, como alteplase', severity: 'major', clinicalEffect: interactions[0], pharmacologicalMechanism: 'O trombolítico favorece a formação de plasmina. O antifibrinolítico dificulta sua atuação sobre a fibrina.' },
      { drugOrClass: 'Estrogênios e agentes pró-coagulantes', severity: 'informational', clinicalEffect: interactions[1], pharmacologicalMechanism: 'O risco pode aumentar pela combinação de formação de trombo com menor capacidade de dissolvê-lo.' },
      { drugOrClass: 'Clorpromazina', severity: 'informational', clinicalEffect: interactions[2], pharmacologicalMechanism: 'Interação potencial listada no Plumb, com relevância veterinária incerta.' },
      { drugOrClass: 'Sangue e soluções com penicilina', severity: 'informational', clinicalEffect: interactions[3], pharmacologicalMechanism: 'Questão de compatibilidade da mistura. O TXA pode integrar o mesmo atendimento que a transfusão, com preparo e administração separados.' },
      { drugOrClass: 'Ácido aminocaproico e outros antifibrinolíticos', severity: 'informational', clinicalEffect: 'Se o paciente já recebeu outro antifibrinolítico, confira dose, hora e motivo antes de acrescentar TXA. A associação não tem benefício estabelecido nos protocolos veterinários citados.', pharmacologicalMechanism: 'Ambos dificultam a degradação da fibrina. Combinar exposições sem um objetivo claro dificulta avaliar a resposta e a tolerância.' },
    ],
    dilutionGuide: {
      compatibleFluids: ['Cloreto de sódio 0,9% foi empregado em protocolo veterinário de infusão. Confirme a compatibilidade e a concentração final para o produto e o protocolo do hospital antes de preparar.'],
      incompatibleFluids: ['A documentação de compatibilidade orienta manter sangue e soluções com penicilina fora da mistura.', 'A bula brasileira orienta administrar Transamin IV isoladamente, sem misturar a outros medicamentos ou usar o equipo em que outro medicamento esteja sendo infundido.'],
      infusionRateGuidance: 'Registre em quanto tempo deve entrar a dose inicial. Para manutenção, converta a taxa prescrita em mg/kg/h para mg/h pelo peso e divida pela concentração final em mg/mL para obter mL/h. No estudo de Mays, a dose inicial entrou em 20 minutos e a manutenção durou oito horas. Use os tempos do protocolo escolhido e observe pressão e sinais digestivos.',
      preparationNotes: 'Guarde na embalagem original entre 15 e 30 °C, protegido de umidade e luz solar direta, conforme a bula brasileira. Antes do preparo, confira lote, validade e integridade da ampola. A solução deve estar límpida, incolor e sem partículas. A validade da embalagem fechada não define a estabilidade da mistura preparada. Siga o protocolo de farmácia hospitalar após abrir ou diluir.',
    },
  },
  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV)',
        technique: 'Escolha a via IV quando houver indicação de antifibrinólise e o início do efeito precisar ser previsível. Confirme a permeabilidade do acesso. Administre lentamente conforme o esquema escolhido e use bomba na infusão contínua. Confira a concentração da ampola e a da mistura antes de programar a bomba.',
        nursingCare: 'Rotule seringa, solução e via imediatamente após o preparo. Rastreie o equipo até o acesso, mantenha o produto separado de anestésicos locais e acompanhe pressão, perfusão, vômito e estado neurológico. Na passagem do plantão, informe quanto já entrou e quando a infusão termina.',
        limitations: 'A bula brasileira da ampola indica exclusivamente a via endovenosa. A via neuraxial, que inclui a intratecal e a epidural, pode causar intoxicação grave. A administração rápida pode provocar hipotensão e vômito.',
      },
      {
        route: 'Oral (VO)',
        technique: 'Avalie a via oral quando o paciente estiver estável, tolerar a ingestão e ainda houver indicação de preservar o coágulo. O estudo de Osekavage em cães saudáveis observou um pico de efeito mais tardio por essa via.',
        nursingCare: 'Confira a dose em mg e a possibilidade de dispensá-la com precisão. Registre quanto o animal conseguiu ingerir. Em caso de vômito após a dose, consulte o prescritor antes de repetir, pois a quantidade já absorvida é incerta.',
        limitations: 'O estudo em cães saudáveis não estabelece equivalência entre as vias em choque. Vômito, dificuldade de engolir e perfusão instável reduzem a previsibilidade da via oral.',
      },
    ],
    pharmacologicalClassification: { chemicalClass: 'Análogo da lisina', therapeuticClass: 'Antifibrinolítico', therapeuticClassDescription: mechanism },
    prescriptionType: 'Venda sob prescrição. As apresentações listadas têm bula humana. Os esquemas veterinários descritos nesta ficha são extra-bula.',
    speciesPeculiarities: [
      { species: 'dog', title: 'Quando a lise excessiva muda a indicação', description: 'No ensaio de Mays, os cães já tinham choque hemorrágico e evidência de lise excessiva. O resultado mais claro apareceu no teste que desafiava o coágulo. Isso mostra ação sobre a fibrinólise nesse grupo, mas deixa em aberto o efeito sobre transfusão e sobrevida.', clinicalImplications: 'Num cão com hemoabdômen ou no pós-operatório, use a fonte, a perfusão e a estabilidade do coágulo para decidir. Se a hemorragia persistir apesar de menor lise no exame, procure perda ainda ativa ou outro déficit hemostático. Antecipe a vigilância de vômito durante a administração IV.' },
      { species: 'cat', title: 'O que as séries felinas permitem concluir', description: 'Os prontuários descrevem uso em hemorragias de diferentes causas e doses variáveis. Os 10 mg/kg observados como mediana descrevem a prática registrada. O desenho dos estudos não permite estimar o benefício de um esquema para um gato específico.', clinicalImplications: 'Procure evidência de lise excessiva, revise função renal e considere se o gato já tem risco trombótico, especialmente se houver cardiopatia relevante ou tromboembolismo prévio. Registre qual achado justificaria repetir a dose e reavalie esse achado antes de continuar.' },
    ],
  },
  relatedDiseaseSlugs: ['coagulacao-intravascular-disseminada-caes-gatos'],
  clinicalStudiesCommented: studies,
  references: [
    { id: 'ref-txa-bula', citationText: 'Zydus Brasil. Transamin, bula e apresentações brasileiras.', url: TRANSAMIN_LEAFLET_URL, sourceType: 'Bula humana' },
    { id: 'ref-txa-fda-via', citationText: 'FDA. Alerta sobre administração intratecal inadvertida de ácido tranexâmico injetável.', url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-alerts-healthcare-professionals-about-risk-medication-errors-tranexamic-acid-injection-resulting', sourceType: 'Alerta de segurança em medicina humana' },
    { id: 'ref-txa-mays', citationText: 'Mays EL et al. Tranexamic acid stops hyperfibrinolysis in dogs with hemorrhagic shock. JAVMA. 2025;263:54–62.', url: 'https://doi.org/10.2460/javma.24.03.0216' },
    { id: 'ref-txa-sigrist-hemo', citationText: 'Sigrist NE et al. Effect of early administration of tranexamic acid on ongoing haemorrhage in dogs with non-surgically treated haemoabdomen. 2022.', url: 'https://doi.org/10.17236/sat00357' },
    { id: 'ref-txa-angiostrongylus', citationText: 'Sigrist NE et al. Hyperfibrinolysis and Hypofibrinogenemia Diagnosed With Rotational Thromboelastometry in Dogs Naturally Infected With Angiostrongylus vasorum. 2017.', url: 'https://doi.org/10.1111/jvim.14723' },
    { id: 'ref-txa-osekavage', citationText: 'Osekavage KE et al. Pharmacokinetics of tranexamic acid in healthy dogs and assessment of its antifibrinolytic properties in canine blood. 2018.', url: 'https://doi.org/10.2460/ajvr.79.10.1057' },
    { id: 'ref-txa-spine-small', citationText: 'Tranexamic Acid in Reducing Intraoperative Bleeding in Dogs Undergoing Thoracolumbar and Lumbar Hemilaminectomy and Intervertebral Disc Fenestration. Topics in Companion Animal Medicine. 2024;58:100820.', url: 'https://doi.org/10.1016/j.tcam.2023.100820' },
    { id: 'ref-txa-spine-large', citationText: 'De Celis Perez CM, Santos L, Bell A. Effect of a single dose of tranexamic acid on perioperative blood loss in dogs undergoing spinal surgery. 2026.', url: 'https://doi.org/10.1016/j.vaa.2026.101317' },
    { id: 'ref-txa-kelley', citationText: 'Kelley M et al. Retrospective analysis of the use of tranexamic acid in critically ill dogs and cats. JVECC. 2022;32:791–799.', url: 'https://doi.org/10.1111/vec.13237' },
    { id: 'ref-txa-cats', citationText: 'Wahldén L et al. Evaluation of Therapeutic Use of Antifibrinolytics in Cats. JAAHA. 2023;59:177–183.', url: 'https://doi.org/10.5326/JAAHA-MS-7349' },
    { id: 'ref-txa-orito', citationText: 'Orito K et al. Safety and efficacy of intravenous administration for tranexamic acid-induced emesis in dogs with accidental ingestion of foreign substances. 2017.', url: 'https://doi.org/10.1292/jvms.17-0463' },
    { id: 'ref-txa-kelmer', citationText: 'Kelmer E et al. Effects of intravenous administration of tranexamic acid on hematological, hemostatic, and thromboelastographic analytes in healthy adult dogs. 2015.', url: 'https://pubmed.ncbi.nlm.nih.gov/26088425/' },
  ],
};
