import { MedicationRecord } from '../../types/medication';

export const ciproeptadinaMedicationRecord: MedicationRecord = {
  id: 'med-ciproeptadina',
  slug: 'ciproeptadina',
  title: 'Ciproeptadina',
  activeIngredient: 'Cloridrato de ciproeptadina (cloridrato de 4-(5H-dibenzo[a,d]ciclo-hepten-5-ilideno)-1-metilpiperidina)',
  isControlled: false,
  controlNotice:
    'Medicamento de uso sob prescrição simples. No Brasil, a ciproeptadina não integra as listas de substâncias sob controle especial da Portaria SVS/MS nº 344/1998, não exigindo Notificação de Receita nem Receita de Controle Especial em duas vias com retenção de via. Seu emprego em cães e gatos é realizado na modalidade extra-label, podendo ser prescrito em receituário veterinário comum de via única.',
  tradeNames: [
    'Apevitin BC Xarope 0,8 mg/mL (EMS — Frasco com 240 mL; associação com vitaminas B e C; uso humano)',
    'Cobavital Microcomprimidos (Abbott — 4 mg de ciproeptadina associada a 1 mg de cobamamida; uso humano)',
    'Ciproeptadina Cápsulas Magistrais Veterinárias (1 mg, 2 mg e 4 mg manipuladas sob medida com excipiente inerte seguro)',
    'Ciproeptadina Suspensão Oral Veterinária Manipulada Sem Açúcar e Sem Álcool (1 mg/mL ou 2 mg/mL em veículo aquoso palatável)',
    'Periactin 4 mg Comprimidos (Referência Internacional — Organon / Merck Sharp & Dohme)',
  ],
  officialSiteUrl: 'https://www.ems.com.br/medicamentos/apevitin-bc/',
  leafletUrl: 'https://consultaremedios.com.br/apevitin-bc/bula',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cyproheptadine/PNG',
  pharmacologicClass:
    'Anti-histamínico H1 de Primeira Geração (Agonista Inverso H1); Antagonista Serotoninérgico 5-HT2 (5-HT2A e 5-HT2C); Anticolinérgico Muscarínico; Agente Orexígeno Adjuvante e Antagonista de Toxidromes Serotoninérgicas',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'Ciproeptadina',
    'Cyproheptadine',
    'Apevitin',
    'Cobavital',
    'Periactin',
    'Anti-histamínico',
    'H1',
    'Agonista Inverso',
    '5-HT2',
    'Antisserotoninérgico',
    'Estimulante de Apetite',
    'Orexígeno',
    'Síndrome Serotoninérgica',
    'Antídoto',
    'Toxicologia',
    'Gatos',
    'Cães',
    'Receituário Simples',
    'Extra-label',
  ],

  plainLanguageSummary:
    'A ciproeptadina é um medicamento anti-histamínico clássico de primeira geração que combina ação contra alergias, bloqueio potente de receptores de serotonina e efeitos anticolinérgicos, sendo empregada na clínica veterinária principalmente como estimulante do apetite em gatos inapetentes e como antídoto coadjuvante no tratamento emergencial da síndrome serotoninérgica em cães e gatos intoxicados por antidepressivos ou outros medicamentos que elevam a serotonina. No cérebro, ela atenua os sinais que ativam o centro da saciedade no hipotálamo, facilitando a retomada da alimentação voluntária em pacientes em recuperação clínica, embora não cure a causa primária da recusa alimentar e jamais deva adiar a passagem precoce de sondas nutricionais em animais que necessitam de calorias imediatas ou que estejam em risco de lipidose hepática. Além disso, por atravessar com extrema facilidade a barreira do sistema nervoso central, o efeito adverso mais comum é a sonolência profunda, podendo ocorrer em alguns felinos uma reação paradoxal de agitação motora, miados contínuos e hiperatividade que exige a imediata redução ou interrupção do tratamento, além de ser contraindicada em pacientes com retenção urinária, glaucoma de ângulo fechado ou obstrução gastrintestinal e de não possuir qualquer eficácia comprovada no tratamento da asma felina ou do hiperadrenocorticismo canino.',

  mechanismOfAction:
    'A ciproeptadina é uma molécula polifarmacológica complexa dotada de quatro propriedades moleculares integradas: 1. Agonismo inverso nos receptores histaminérgicos H1: Diferente de um bloqueador neutro, a ciproeptadina estabiliza ativamente a conformação inativa do receptor H1, suprimindo a atividade constitutiva basal além de impedir a ligação da histamina. Por ser altamente lipofílica (XLogP3 ~4,7), atravessa com facilidade a barreira hematoencefálica e desativa os neurônios histaminérgicos centrais do hipotálamo posterior responsáveis pela vigília, deflagrando sedação acentuada. 2. Antagonismo serotoninérgico potente em receptores 5-HT2 (5-HT2A e 5-HT2C): A serotonina atua fisiologicamente nos receptores 5-HT2C do núcleo arqueado estimulando neurônios anorexígenos POMC/CART, cuja liberação de alfa-MSH ativa receptores de melanocortina (MC4R) promovendo saciedade. Ao bloquear 5-HT2C, a ciproeptadina atenua o tônus anorexígeno e desloca o equilíbrio hipotalâmico para as vias de fome (NPY/AgRP), estimulando a ingesta alimentar. No córtex e medula espinhal, o bloqueio potente de 5-HT2A suprime a hiperexcitabilidade neuromuscular, hipertermia e disfunção autonômica causadas pelo excesso de serotonina na Síndrome Serotoninérgica. 3. Antagonismo muscarínico colinérgico (M3): Apresenta atividade anticolinérgica de intensidade moderada a alta, promovendo redução de secreções salivares e brônquicas, relaxamento do músculo detrusor vesical, redução da motilidade gastrointestinal e midríase pupilar. 4. Bloqueio discreto de canais de cálcio e atividade anestésica local: Exibe efeito estabilizador de membrana neuronal que contribui de forma secundária para suas ações centrais.',

  indications: [
    'Estimulação do apetite (orexígeno adjuvante) em gatos com inapetência ou hiporexia transitória em recuperação clínica, com dor e náusea devidamente controladas.',
    'Tratamento adjuvante da Síndrome Serotoninérgica em cães e gatos secundária à ingestão acidental ou sobredosagem de fármacos pró-serotoninérgicos (SSRIs, SNRIs, tricíclicos, 5-HTP, tramadol, anfetaminas ou IMAOs).',
    'Antídoto específico para reversão de sinais clínicos adversos intensos (vocalização contínua, agitação psicomotora e tremores) induzidos por sobredosagem de mirtazapina em felinos.',
    'Estimulação adjuvante do apetite em cães inapetentes (uso com respaldo clínico limitado; opções como capromorelina possuem maior sustentação científica).',
    'Terapia anti-histamínica empírica em reações de hipersensibilidade aguda de tipo I, urticária e picadas de insetos.',
    'Contexto histórico e evidências negativas: uso em asma felina como monoterapia é contraindicado por falta de eficácia em estudos controlados; uso em hiperadrenocorticismo hipófise-dependente canino é desprovido de eficácia clínica mensurável.',
  ],

  contraindications: [
    'Hipersensibilidade conhecida à ciproeptadina ou a qualquer componente da fórmula.',
    'Obstrução mecânica do trato urinário ou retenção urinária ativa: a ação anticolinérgica relaxa o detrusor vesical e piora a retenção.',
    'Glaucoma de ângulo fechado: o efeito antimuscarínico induz midríase pupilar e eleva a pressão intraocular.',
    'Íleo paralítico, atonia intestinal e obstruções gastrintestinais mecânicas: a paralisia colinérgica agrava a hipomotilidade.',
    'Associação simultânea com mirtazapina como orexígenos concomitantes: o antagonismo mútuo nos receptores 5-HT anula o benefício terapêutico.',
    'Uso como substituto de nutrição enteral ativa (sonda esofágica ou nasoesofágica) em gatos anoréxicos com risco ou presença de lipidose hepática.',
    'Monoterapia para controle de asma felina (ensaios experimentais comprovaram ausência de redução de eosinófilos nas vias aéreas).',
    'Tratamento de hiperadrenocorticismo dependente de hipófise em cães (ensaios clínicos comprovaram ineficácia endócrina e clínica).',
  ],

  cautions: [
    'Sedação marcante e depressão do sensório: comum no início da terapia; monitorar nível de consciência e hidratação.',
    'Excitação paradoxal em gatos: miados incessantes, inquietude, hiperatividade psicomotora e agressividade transitória (mania); exige redução imediata da dose ou descontinuação.',
    'Redução do limiar convulsivo: cautela em pacientes com epilepsia idiopática, encefalopatias ou histórico de crises convulsivas.',
    'Hepatopatias graves: extensa metabolização hepática; clearance reduzido e meia-vida terminal prolongada exigem titulação conservadora.',
    'Doença Renal Crônica (DRC): metabólitos polares eliminados na urina; não há algoritmo IRIS validado, exigindo vigilância de acúmulo e sedação.',
    'Espessamento de secreções respiratórias: a ação antimuscarínica resseca o muco das vias aéreas; cautela em bronquites crônicas.',
    'Interferência em testes alérgicos: suspender a administração pelo menos 7 dias antes da realização de testes alérgicos intradérmicos.',
  ],

  adverseEffects: [
    'Sistema Nervoso Central: Sedação profunda, letargia, sonolência, ataxia e perda de coordenação motora (efeito mais frequente).',
    'Reação Paradoxal Felina: Agitação, vocalização estridente contínua, inquietação, comportamento maníaco e alterações de temperamento.',
    'Efeitos Anticolinérgicos: Boca seca (xerostomia), constipação intestinal, redução da motilidade gastrointestinal, retenção de urina, midríase e taquicardia sinusal reflexa.',
    'Metabólicos e Digestivos: Polifagia intensa, sialorreia em gatos durante a administração pelo sabor amargo do fármaco, vômitos e diarreia esporádicos.',
    'Oftálmicos / Raros: Ceratoconjuntivite seca (KCS) transitória por diminuição da secreção lacrimal; elevação transitória de enzimas hepáticas em cães sob regimes prolongados.',
  ],

  interactions: [
    'Mirtazapina: Antagonismo farmacodinâmico recíproco. A ciproeptadina neutraliza a ação orexígena da mirtazapina no receptor 5-HT2; não combinar como estimulantes de apetite conjuntos. Em contrapartida, é o fármaco de escolha para tratar toxicidade por mirtazapina.',
    'Inibidores da Monoamina Oxidase / IMAOs (Selegilina, Amitraz): Potencialização e prolongamento severo dos efeitos anticolinérgicos e centrais da ciproeptadina; associação desaconselhada.',
    'Antidepressivos SSRIs, SNRIs e Tricíclicos (Fluoxetina, Sertralina, Amitriptilina, Clomipramina): O bloqueio serotoninérgico da ciproeptadina reduz a eficácia comportamental desses fármacos; porém, na intoxicação aguda com toxidrome serotoninérgica, a ciproeptadina atua como potente agente terapêutico.',
    'Tramadol: Pode atenuar o componente analgésico mediado pela inibição da recaptação de serotonina; funciona como resgate terapêutico em intoxicações com síndrome serotoninérgica.',
    'Depressores do Sistema Nervoso Central (Gabapentina, Fenobarbital, Benzodiazepínicos, Opioides, Acepromazina): Sinergismo aditivo com sonolência profunda, depressão respiratória e ataxia acentuada.',
    'Fármacos Anticolinérgicos (Atropina, Glicopirrolato, Oxibutinina, Amantadina): Somação de efeitos antimuscarínicos com risco de íleo paralítico, retenção urinária severa, midríase persistente e taquiarritmias.',
  ],

  routes: ['por via oral', 'por via retal'],

  pillars: [
    {
      title: 'Fome Não é Nutrição: Prioridade da Causa, Analgesia e Sonda Alimentar',
      subtitle: 'Orexígeno como ponte adjuvante e não como substituto de aporte calórico',
      content:
        'A estimulação farmacológica do apetite com ciproeptadina só é racional quando as causas subjacentes da hiporexia (dor, náusea, uremia, febre, hipocalemia ou estresse ambiental) tiverem sido ativamente identificadas e tratadas. Administrar um orexígeno a um gato nauseado ou com dor abdominal sem analgesia prévia gera aversão alimentar condicionada grave: o paciente aproxima-se do prato compelido pelo estímulo central, mas associa o odor da comida ao mal-estar físico e recusa o alimento em definitivo. Ademais, em felinos sob jejum prolongado ou com lipidose hepática estabelecida, a ciproeptadina é contraindicada como conduta isolada, pois a latência de ação e a inconstância da resposta não suprem o balanço energético negativo, sendo mandatória a colocação precoce de sonda alimentar (nasoesofágica ou esofágica) conforme ratificado pelas diretrizes internacionais ISFM (2022).',
    },
    {
      title: 'O Eixo Serotoninérgico 5-HT2: Conexão entre Apetite e Toxicologia',
      subtitle: 'Bloqueio de 5-HT2C na fome hipotalâmica e de 5-HT2A no resgate toxicológico',
      content:
        'A versatilidade clínica da ciproeptadina fundamenta-se no bloqueio seletivo dos receptores de serotonina 5-HT2. No núcleo arqueado do hipotálamo, a ativação fisiológica de receptores 5-HT2C estimula os neurônios POMC/CART a produzirem alfa-MSH, neurotransmissor da saciedade que inibe a ingesta alimentar. Ao bloquear 5-HT2C, a ciproeptadina neutraliza esse freio anorexígeno e permite que as vias de NPY e AgRP induzam busca alimentar. Simultaneamente, no contexto de intoxicações agudas por fármacos pró-serotoninérgicos (SSRIs, SNRIs, tramadol, 5-HTP ou mirtazapina), a hiperestimulação maciça de receptores 5-HT2A no córtex e na medula deflagra a tríade da Síndrome Serotoninérgica (hipertermia, tremores/mioclonias e instabilidade autonômica). A ciproeptadina atua bloqueando esses receptores e estancando a toxidrome, funcionando como antídoto coadjuvante de primeira linha.',
    },
    {
      title: 'Lipofilicidade, Passagem na BHE e Resposta Paradoxal Felina',
      subtitle: 'Cinética de distribuição no SNC e manejo de hiperexcitação / mania',
      content:
        'Com elevado coeficiente de partição octanol-água (XLogP3 ~4,7) e reduzida polaridade molecular, a ciproeptadina transpõe rapidamente a barreira hematoencefálica (BHE). O bloqueio concomitante dos receptores histaminérgicos H1 centrais resulta na perda da sinalização de vigília cortical, tornando a sedação e a sonolência os efeitos colaterais mais comuns. Contudo, em felinos suscetíveis, pode ocorrer uma resposta paradoxal exuberante descrita como mania felina, caracterizada por miados estridentes incessantes, desorientação, hiperatividade motora desordenada e agressividade. Essa reação é idiossincrática e decorre da desinibição de circuitos límbicos; diante de sua ocorrência, o clínico deve suspender o medicamento ou reduzir a dosagem à metade.',
    },
    {
      title: 'Perfil Anticolinérgico Relevante e Ineficácia Comprovada em Asma e Cushing',
      subtitle: 'Segurança visceral e revisão de usos históricos desmentidos pela literatura',
      content:
        'O antagonismo muscarínico exercido pela ciproeptadina impõe cuidados rigorosos em pacientes predispostos a retenção urinária, glaucoma de ângulo fechado e atonia gastrintestinal, pois o bloqueio dos receptores M3 paralisa a contração do detrusor vesical e reduz o peristaltismo entérico. Além disso, a literatura veterinária contemporânea exige a revisão de dois usos históricos outrora citados em compêndios antigos: em asma felina experimental, ensaios clínicos controlados (Schooley et al. 2007) demonstraram que mesmo doses maciças (8 mg q12h) não reduzem o infiltrado inflamatório de eosinófilos no lavado broncoalveolar, não devendo a ciproeptadina ser prescrita como monoterapia anti-inflamatória respiratória. De igual modo, ensaios em cães com hiperadrenocorticismo hipófise-dependente (Stolp et al. 1984) comprovaram total ineficácia clínica e laboratorial no controle do hipercortisolemia, devendo tais indicações constar no prontuário como obsoletas e não recomendadas.',
    },
  ],

  doses: [
    {
      id: 'dose-cipro-cat-appetite-start',
      species: 'cat',
      indication: 'Estimulação de apetite em gatos — Dose inicial prática recomendada',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg/gato',
      perWeightUnit: 'dose fixa por animal',
      route: 'VO',
      frequency: 'q12h',
      duration: 'Uso temporário por 3 a 5 dias até recuperação do consumo voluntário.',
      notes:
        'Dose de partida recomendada pela literatura contemporânea e pelo VIN; gatos que respondem ao fármaco frequentemente apresentam bom estímulo com 1 mg q12h, minimizando a sedação inicial. Administrar cápsula manipulada de 1 mg ou 1,25 mL de Apevitin BC (0,8 mg/mL).',
      calculatorEnabled: false,
      presentationId: 'pres-cipro-caps-magistral',
      referenceIds: ['ref-plumbs-10-cyproheptadine', 'ref-isfm-inappetent-2022'],
    },
    {
      id: 'dose-cipro-cat-appetite-range',
      species: 'cat',
      indication: 'Estimulação de apetite em gatos — Faixa de titulação e manutenção',
      doseMin: 1,
      doseMax: 4,
      doseUnit: 'mg/gato',
      perWeightUnit: 'dose fixa por animal',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Curso curto adjuvante sob monitoramento clínico contínuo.',
      notes:
        'Faixa clássica publicada em compêndios (Plumb 10ª ed., BSAVA 10ª ed.). Titular se a dose de 1 mg for bem tolerada mas com resposta insuficiente. Doses superiores a 2 mg aumentam a incidência de sonolência e risco de excitação paradoxal.',
      calculatorEnabled: false,
      presentationId: 'pres-cipro-caps-magistral',
      referenceIds: ['ref-plumbs-10-cyproheptadine', 'ref-bsava-10-cyproheptadine'],
    },
    {
      id: 'dose-cipro-dog-appetite',
      species: 'dog',
      indication: 'Estimulação de apetite em cães — Uso extra-label adjuvante',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Uso temporário; reavaliar se não houver resposta em 48 a 72 horas.',
      notes:
        'Evidência clínica fraca em cães. Embora Scott et al. (1992) tenham observado polifagia em 25% dos cães tratados, não há ensaios que comprovem eficácia consistente em anorexia canina. Preferir opções com evidência superior como capromorelina.',
      calculatorEnabled: true,
      presentationId: 'pres-cipro-apevitin-xpe',
      referenceIds: ['ref-plumbs-10-cyproheptadine', 'ref-scott-1992-pruritus'],
    },
    {
      id: 'dose-cipro-dog-serotonin',
      species: 'dog',
      indication: 'Síndrome Serotoninérgica em cães — Antagonista 5-HT2 de resgate toxicológico',
      doseMin: 1.1,
      doseMax: 1.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO ou PR',
      frequency: 'q4–6h PRN conforme persistência ou recidiva dos sinais',
      duration: 'Repetir apenas enquanto houver sinais de toxidrome; suspender após estabilização.',
      notes:
        'Dose toxicológica de referência (Manual Merck / Plumb 10ª ed.). Se houver vômito, alteração de consciência ou risco de aspiração, triturar o comprimido, ressuspender em 5 a 10 mL de solução salina e administrar por via retal (PR). Não substitui suporte intensivo com fluidoterapia, controle de convulsões e resfriamento ativo.',
      calculatorEnabled: true,
      presentationId: 'pres-cipro-cobavital-comp',
      referenceIds: ['ref-hopkins-2017-serotonin', 'ref-plumbs-10-cyproheptadine'],
    },
    {
      id: 'dose-cipro-cat-serotonin',
      species: 'cat',
      indication: 'Síndrome Serotoninérgica / Reversão de Mirtazapina em gatos',
      doseMin: 2,
      doseMax: 4,
      doseUnit: 'mg/gato',
      perWeightUnit: 'dose fixa por animal',
      route: 'VO ou PR',
      frequency: 'q4–6h PRN conforme persistência dos sinais',
      duration: 'Administração pontual sob vigilância intensiva até cessação dos tremores e agitação.',
      notes:
        'Antagonista de escolha para reversão de sobredosagem de mirtazapina ou intoxicação por SSRIs em felinos. Pode ser administrado por via retal após maceração em solução salina caso o gato apresente êmese ou hipersalivação profusa.',
      calculatorEnabled: false,
      presentationId: 'pres-cipro-caps-magistral',
      referenceIds: ['ref-plumbs-10-cyproheptadine'],
    },
    {
      id: 'dose-cipro-cat-antihistamine',
      species: 'cat',
      indication: 'Prurido alérgico e reações de hipersensibilidade em gatos',
      doseMin: 2,
      doseMax: 4,
      doseUnit: 'mg/gato',
      perWeightUnit: 'dose fixa por animal',
      route: 'VO',
      frequency: 'q12h',
      duration: 'Conforme necessidade clínica alérgica.',
      notes:
        'Uso anti-histamínico empírico tradicional. A resposta antipruriginosa é variável e a sedação motora é comum. Não substitui o controle de ectoparasitas nem imunossupressores em dermatites alérgicas graves.',
      calculatorEnabled: false,
      presentationId: 'pres-cipro-caps-magistral',
      referenceIds: ['ref-bsava-10-cyproheptadine'],
    },
    {
      id: 'dose-cipro-dog-antihistamine',
      species: 'dog',
      indication: 'Prurido alérgico e reações histamínicas em cães — Uso empírico',
      doseMin: 0.5,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: 'Conforme avaliação clínica.',
      notes:
        'Eficácia fraca para dermatite atópica canina; Scott et al. (1992) comprovaram taxa de resposta antipruriginosa nula (0/16 cães). Doses maiores aumentam a sonolência sem elevar a eficácia.',
      calculatorEnabled: true,
      presentationId: 'pres-cipro-apevitin-xpe',
      referenceIds: ['ref-plumbs-10-cyproheptadine', 'ref-scott-1992-pruritus'],
    },
  ],

  presentations: [
    {
      id: 'pres-cipro-caps-magistral',
      name: 'Ciproeptadina Cápsulas Magistrais Veterinárias Fracionadas',
      brand: 'Farmácia de Manipulação Veterinária Autorizada',
      form: 'cápsulas orais',
      concentrationValue: 1,
      concentrationUnit: 'mg',
      concentrationOptions: [
        { id: 'opt-cipro-1mg', label: 'Cápsulas de 1 mg (Dose prática inicial felina)', concentrationValue: 1, concentrationUnit: 'mg', isDefault: true },
        { id: 'opt-cipro-2mg', label: 'Cápsulas de 2 mg', concentrationValue: 2, concentrationUnit: 'mg' },
        { id: 'opt-cipro-4mg', label: 'Cápsulas de 4 mg', concentrationValue: 4, concentrationUnit: 'mg' },
      ],
      packInfo: 'Frasco plástico contendo 20, 30 ou 60 cápsulas manipuladas com excipiente inerte seguro (amido de milho / celulose microcristalina)',
      route: 'por via oral',
      channel: 'compounded',
      scoringInfo: 'Cápsula gelatinosa unitária não divisível.',
      packageDescription:
        'Formulações sob medida preparadas exclusivamente com cloridrato de ciproeptadina puro, sem corantes, açúcares ou vitaminas associadas, ideais para pacientes felinos e caninos.',
    },
    {
      id: 'pres-cipro-susp-magistral',
      name: 'Ciproeptadina Suspensão Oral Veterinária Sem Açúcar e Sem Álcool',
      brand: 'Farmácia de Manipulação Veterinária Autorizada',
      form: 'suspensão oral',
      concentrationValue: 1,
      concentrationUnit: 'mg/mL',
      concentrationOptions: [
        { id: 'opt-susp-1mg', label: 'Suspensão 1 mg/mL', concentrationValue: 1, concentrationUnit: 'mg/mL', isDefault: true },
        { id: 'opt-susp-2mg', label: 'Suspensão 2 mg/mL', concentrationValue: 2, concentrationUnit: 'mg/mL' },
      ],
      packInfo: 'Frasco âmbar de 30 mL ou 60 mL acompanhado de seringa dosadora milimetrada',
      route: 'por via oral',
      channel: 'compounded',
      packageDescription:
        'Veículo hidrossolúvel palatável saborizado para pequenos animais (peixe, carne ou frango), livre de xilitol, sacarose e conservantes irritantes.',
    },
    {
      id: 'pres-cipro-apevitin-xpe',
      name: 'Apevitin BC Xarope (0,8 mg/mL de Cloridrato de Ciproeptadina)',
      brand: 'EMS S/A — Uso Humano no Brasil',
      form: 'xarope oral',
      concentrationValue: 0.8,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco contendo 240 mL acompanhado de copo-medida graduado',
      route: 'por via oral',
      channel: 'human_pharmacy',
      packageDescription:
        'Produto comercial humano contendo 4 mg de cloridrato de ciproeptadina a cada 5 mL (0,8 mg/mL), associado a vitaminas do complexo B (tiamina, riboflavina, piridoxina, nicotinamida) e ácido ascórbico (vitamina C). Contém açúcar e propilenoglicol; cautela em pacientes diabéticos ou nefropatas graves.',
    },
    {
      id: 'pres-cipro-cobavital-comp',
      name: 'Cobavital Microcomprimidos (Ciproeptadina 4 mg + Cobamamida 1 mg)',
      brand: 'Abbott Laboratórios do Brasil — Uso Humano',
      form: 'microcomprimidos orais',
      concentrationValue: 4,
      concentrationUnit: 'mg',
      packInfo: 'Embalagem contendo 16 ou 30 microcomprimidos',
      route: 'por via oral ou via retal',
      channel: 'human_pharmacy',
      scoringInfo: 'Microcomprimido pequeno, passível de trituração para uso retal emergencial.',
      packageDescription:
        'Microcomprimidos contendo 4 mg de ciproeptadina base (4,35 mg de cloridrato) associados a 1 mg de cobamamida (coenzima B12). Utilizados frequentemente na emergência toxicológica triturados para uso via retal.',
    },
  ],

  pharmacokineticsDetails: {
    feline:
      'Na espécie felina, a farmacocinética da ciproeptadina foi estabelecida pelo ensaio prospectivo cruzado de Norris et al. (1998) em 6 gatos hígidos sob doses de 2 mg IV e 8 mg VO. A absorção oral revelou-se ampla, com biodisponibilidade oral aparente de 101 ± 36% (a fração aparente acima de 100% decorre de variabilidade individual e limitações do modelo em coortes pequenas). A meia-vida de eliminação plasmática terminal no gato é de 12,8 ± 9,9 horas, exibindo enorme dispersão interindividual que explica por que alguns animais permanecem sedados por até 24 a 36 horas enquanto outros requerem administrações a cada 12 horas. O volume de distribuição em equilíbrio (Vdss) é extraordinariamente elevado (~106 L/kg), refletindo sua acentuada lipofilicidade e extensíssima partição tecidual para tecidos profundos e sistema nervoso central. A depuração plasmática sistêmica é de 0,9 ± 0,3 mL/kg/min. O tempo para atingir o estado de equilíbrio dinâmico (steady-state) situa-se entre 2 e 3 dias de administrações consecutivas. A molécula sofre biotransformação hepática quase total em metabólitos polares glicuronados eliminados por excreção renal, não existindo estudos farmacocinéticos felinos que validem ajustes posológicos específicos estratificados pelos estágios IRIS da doença renal.',
    canine:
      'Na espécie canina, inexistem ensaios farmacocinéticos modernos e robustos comparáveis ao estudo de Norris em gatos. Evidências empíricas e extrapolações toxicológicas indicam que os cães metabolizam a ciproeptadina mais rapidamente do que os felinos, apresentando depuração acelerada e meia-vida consideravelmente mais curta, o que corrobora a menor previsibilidade do estímulo orexígeno e a necessidade de posologias mais frequentes (a cada 8 a 12 horas para alergias ou a cada 4 a 6 horas em protocolos de resgate na síndrome serotoninérgica). A molécula sofre extenso metabolismo hepático inicial e seus conjugados são excretados predominantemente na urina.',
    comparativeHighlights: [
      'Gato exibe meia-vida de eliminação terminal longa (~13 horas) mas com enorme desvio-padrão (± 10 horas), justificando intervalo de 12 a 24 horas e titulação cautelosa.',
      'Biodisponibilidade oral no gato é virtualmente completa (~100%), permitindo absorção consistente mesmo em pacientes com motilidade reduzida.',
      'Volume de distribuição aparente superior a 100 L/kg comprova penetração tecidual e cerebral maciça via barreira hematoencefálica.',
      'Cães apresentam eliminação mais célere e resposta orexígena significativamente menos confiável do que os felinos.',
      'Hepatopatia clínica grave reduz expressivamente a depuração metabólica do fármaco em ambas as espécies, elevando as concentrações circulantes e os riscos de sedação e anticolinergismo.',
    ],
  },

  practicalDosingTable: {
    title: 'Guia de Dosagem Prática e Conversão Volumétrica de Ciproeptadina',
    colHeaders: [
      'Paciente / Peso',
      'Dose Alvo (mg)',
      'Apevitin BC Xarope (0,8 mg/mL)',
      'Apresentação Sugerida',
    ],
    rows: [
      {
        weight: 'Gato — Dose Inicial de Apetite',
        totalDose: '1,0 mg VO q12h',
        col1: '1,25 mL VO q12h',
        col2: 'Cápsula manipulada 1 mg ou 1,25 mL de Apevitin BC',
      },
      {
        weight: 'Gato — Dose Titulada / Resistente',
        totalDose: '2,0 mg VO q12h',
        col1: '2,5 mL VO q12h',
        col2: 'Cápsula manipulada 2 mg ou 2,5 mL de Apevitin BC',
      },
      {
        weight: 'Gato — Síndrome Serotoninérgica (4 kg)',
        totalDose: '2,0 a 4,0 mg VO/PR q4–6h PRN',
        col1: '2,5 a 5,0 mL PRN (ou via retal)',
        col2: '1 microcomprimido Cobavital triturado em salina PR',
      },
      {
        weight: 'Cão 5 kg — Apetite (0,2 mg/kg)',
        totalDose: '1,0 mg VO q12–24h',
        col1: '1,25 mL VO q12–24h',
        col2: '1,25 mL Apevitin BC ou cápsula magistral 1 mg',
      },
      {
        weight: 'Cão 10 kg — Apetite (0,2 mg/kg)',
        totalDose: '2,0 mg VO q12–24h',
        col1: '2,5 mL VO q12–24h',
        col2: '2,5 mL Apevitin BC ou 1/2 comp. Cobavital',
      },
      {
        weight: 'Cão 15 kg — Síndrome Serotoninérgica (1,1 mg/kg)',
        totalDose: '16,5 mg VO/PR q4–6h PRN',
        col1: '20,6 mL Apevitin (ou comprimidos)',
        col2: '4 microcomprimidos Cobavital triturados em salina PR',
      },
      {
        weight: 'Cão 20 kg — Apetite (0,2 mg/kg)',
        totalDose: '4,0 mg VO q12–24h',
        col1: '5,0 mL VO q12–24h',
        col2: '5,0 mL Apevitin BC ou 1 comp. Cobavital 4 mg',
      },
      {
        weight: 'Cão 30 kg — Síndrome Serotoninérgica (1,1 mg/kg)',
        totalDose: '33,0 mg VO/PR q4–6h PRN',
        col1: 'Inviável em xarope por volume',
        col2: '8 microcomprimidos Cobavital triturados em salina PR',
      },
    ],
  },

  samplePrescriptionText:
    'USO VETERINÁRIO — RECEITUÁRIO SIMPLES (VIA ÚNICA)\\n\\n' +
    'MODELO 1 — ESTIMULAÇÃO DO APETITE EM GATO HIPORÉXICO CONVALESCENTE (4 KG):\\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Felino], Espécie: Felina, Raça: SRD, Peso: 4,0 kg\\n\\n' +
    'PRESCRIÇÃO:\\n' +
    '1. Ciproeptadina 1 mg ---------------------------------------------------------------------------------- 10 cápsulas gelatinosas\\n' +
    '   (Manipulação veterinária em farmácia magistral com veículo inerte seguro)\\n' +
    '   Posologia: Administrar 1 (uma) cápsula por via oral a cada 12 horas, durante 3 a 5 dias, até a estabilização do consumo alimentar espontâneo.\\n\\n' +
    'ORIENTAÇÕES AO TUTOR:\\n' +
    '- A medicação atua como um estímulo transitório para o apetite e não cura a causa básica da inapetência; manter o alimento úmido fresco e palatável.\\n' +
    '- Observar sinais de sonolência excessiva, dificuldade de equilíbrio, pupilas excessivamente dilatadas ou alterações de comportamento.\\n' +
    '- Caso o animal apresente miados excessivos e agitação contínua (reação paradoxal), suspender imediatamente o medicamento e avisar o veterinário.\\n' +
    '- Não associar à mirtazapina ou a outros antidepressivos sem expressa autorização profissional.\\n' +
    '- Caso o felino permaneça mais de 48 horas em jejum ou recusa alimentar severa, retornar com urgência para instituir suporte nutricional por sonda enteral.\\n\\n' +
    'Data de emissão: [DD/MM/AAAA] — Assinatura e Carimbo do Médico Veterinário\\n\\n' +
    '------------------------------------------------------------------------------------------------------\\n\\n' +
    'MODELO 2 — RESGATE TOXICOLÓGICO DE SÍNDROME SEROTONINÉRGICA EM CÃO (15 KG):\\n' +
    'PRESCRIÇÃO HOSPITALAR / EMERGÊNCIA:\\n' +
    '1. Cloridrato de Ciproeptadina 4 mg (Cobavital ou Genérico) ----------------------------------------------- 12 microcomprimidos\\n' +
    '   Posologia: Administrar 4 (quatro) microcomprimidos (16 mg de ciproeptadina) por via retal a cada 4 a 6 horas conforme persistência dos sinais.\\n' +
    '   Modo de Preparo: Macerar finamente os 4 microcomprimidos em gral de porcelana, suspender homogeneamente em 8 mL de solução fisiológica estéril (NaCl 0,9%) e infundir na ampola retal através de sonda uretral flexível número 6 ou 8 Fr devidamente lubrificada com gel hidrossolúvel.',

  keyStudies: [
    {
      title: 'Disposition of cyproheptadine in cats after intravenous or oral administration of a single dose',
      authorsYear: 'Norris CR, Boothe DM, Esparza T, Gray C, Ragsdale M. (1998)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Ensaio farmacocinético prospectivo cruzado em felinos sadios',
      sampleSize: '6 gatos adultos hígidos',
      mainFindings:
        'A administração oral de 8 mg de ciproeptadina resultou em biodisponibilidade oral aparente de 101 ± 36%, com meia-vida de eliminação plasmática terminal média de 12,8 ± 9,9 horas e tempo médio de permanência (MRT) de 823 ± 191 minutos. O volume de distribuição foi extraordinariamente alto (~106 L/kg) e o clearance sistêmico foi de 0,9 ± 0,3 mL/kg/min.',
      clinicalTakeaway:
        'Confirmou a excelente absorção oral da ciproeptadina em gatos e justificou a posologia a cada 12 horas, revelando todavia uma enorme variabilidade individual na meia-vida que explica as diferenças clínicas marcantes na duração da sedação.',
      referenceId: 'ref-norris-1998-pk',
    },
    {
      title: 'Effects of cyproheptadine and cetirizine on eosinophilic airway inflammation in cats with experimentally induced asthma',
      authorsYear: 'Schooley EK, McGee Turner JB, Jiji RD, Spinka CM, Reinero CR. (2007)',
      journal: 'American Journal of Veterinary Research (AJVR)',
      studyDesign: 'Ensaio clínico prospectivo randomizado cruzado controlado por placebo',
      sampleSize: '9 gatos com asma alérgica induzida experimentalmente',
      mainFindings:
        'A administração de doses maciças de ciproeptadina (8 mg VO a cada 12 horas por 7 dias) não promoveu redução estatisticamente significativa na porcentagem de eosinófilos no lavado broncoalveolar (27 ± 16%) em comparação ao placebo (40 ± 22%), sem impacto relevante nas concentrações de histamina e serotonina das vias aéreas.',
      clinicalTakeaway:
        'Evidência experimental seminal comprovando que a ciproeptadina não possui eficácia clínica como monoterapia anti-inflamatória em asma felina, devendo sua indicação ser abandonada nessa patologia.',
      referenceId: 'ref-schooley-2007-asthma',
    },
    {
      title: 'Failure of cyproheptadine hydrochloride as an antipruritic agent in allergic dogs: results of a double-blinded, placebo-controlled study',
      authorsYear: 'Scott DW, Miller WH Jr, Decker GA, Cayatte SM. (1992)',
      journal: 'Cornell Veterinarian',
      studyDesign: 'Ensaio clínico prospectivo randomizado duplo-cego e placebo-controlado',
      sampleSize: '16 cães com prurido alérgico / dermatite atópica',
      mainFindings:
        'Nenhum dos 16 cães tratados com ciproeptadina (0,1 a 0,2 mg/kg/dia) apresentou melhora clínica mensurável no escore de prurido alérgico. Notavelmente, 4 dos 16 cães (25%) desenvolveram polifagia marcante como efeito adverso durante o tratamento.',
      clinicalTakeaway:
        'Demonstrou ineficácia no controle do prurido alérgico canino, mas comprovou na prática a existência do mecanismo orexígeno mediado pelo fármaco na espécie canina.',
      referenceId: 'ref-scott-1992-pruritus',
    },
    {
      title: 'Results of cyproheptadine treatment in dogs with pituitary-dependent hyperadrenocorticism',
      authorsYear: 'Stolp R, Croughs RJ, Rijnberk A. (1984)',
      journal: 'Journal of Endocrinology',
      studyDesign: 'Ensaio clínico prospectivo em cães com hiperadrenocorticismo',
      sampleSize: '9 cães com doença de Cushing dependente de hipófise',
      mainFindings:
        'O tratamento prolongado com ciproeptadina (0,3 a 1,0 mg/kg/dia por 2 meses) não resultou em melhora clínica em nenhum dos cães e não provocou supressão consistente das concentrações séricas basais de cortisol ou da resposta ao ACTH.',
      clinicalTakeaway:
        'Desqualificou definitivamente o uso da ciproeptadina no hiperadrenocorticismo canino, comprovando que o fármaco não substitui o trilostano ou o mitotano.',
      referenceId: 'ref-stolp-1984-cushing',
    },
    {
      title: 'Serotonin Syndrome from 5-Hydroxytryptophan Supplement Ingestion in a 9-Month-Old Labrador Retriever',
      authorsYear: 'Hopkins J, Pardo M, Bischoff K. (2017)',
      journal: 'Journal of Medical Toxicology',
      studyDesign: 'Relato de caso clínico toxicológico com correlação farmacológica',
      sampleSize: '1 cão Labrador jovem com Síndrome Serotoninérgica aguda grave',
      mainFindings:
        'O paciente ingeriu dose massiva de 5-HTP desenvolvendo alteração do estado mental, midríase pupilar, hipersalivação, taquicardia sinusal severa, hipertermia de 41,2°C e hipertensão sistêmica. O tratamento intensivo associando fluidoterapia, resfriamento e antagonismo serotoninérgico com ciproeptadina oral/retal reverteu a toxidrome em 48 horas.',
      clinicalTakeaway:
        'Evidência clínica respaldando o papel terapêutico essencial da ciproeptadina como antagonista 5-HT2 no manejo da Síndrome Serotoninérgica em pequenos animais.',
      referenceId: 'ref-hopkins-2017-serotonin',
    },
    {
      title: 'Use of alteplase continuous rate infusion, pentoxifylline, and cyproheptadine in acute feline aortic thromboembolism: a study of nine cats',
      authorsYear: 'Ray CC, Wolf J, Guillaumin J. (2025)',
      journal: 'Frontiers in Veterinary Science',
      studyDesign: 'Série de casos retrospectiva bicêntrica',
      sampleSize: '9 gatos com tromboembolismo aórtico felino cardiogênico (FATE)',
      mainFindings:
        'Avaliou o emprego de protocolos combinados incluindo trombolítico (alteplase), pentoxifilina e ciproeptadina para atenuar o espasmo arterial serotoninérgico colateral. 5 dos 9 gatos receberam ciproeptadina; todos apresentaram algum ganho motor distal, porém apenas 4 sobreviveram até a alta.',
      clinicalTakeaway:
        'Representa evidência preliminar emergente muito baixa que não justifica indicar a ciproeptadina como conduta padrão no FATE, permanecendo seu papel restrito ao campo experimental.',
      referenceId: 'ref-ray-2025-fate',
    },
  ],

  relatedDiseaseSlugs: [
    'triade-felina',
    'doenca-renal-cronica-caes-gatos',
  ],

  references: [
    {
      id: 'ref-norris-1998-pk',
      citationText: 'Norris CR, Boothe DM, Esparza T, Gray C, Ragsdale M. Disposition of cyproheptadine in cats after intravenous or oral administration of a single dose. Am J Vet Res. 1998;59(1):79-81.',
      sourceType: 'Ensaio farmacocinético analítico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9442249/',
      notes: 'Estudo seminal de farmacocinética felina estabelecendo F oral de 101%, t1/2 de 12,8 horas e Vd de 106 L/kg.',
      evidenceLevel: 'Nível II — Estudo farmacocinético cruzado prospectivo em espécie-alvo',
    },
    {
      id: 'ref-schooley-2007-asthma',
      citationText: 'Schooley EK, McGee Turner JB, Jiji RD, Spinka CM, Reinero CR. Effects of cyproheptadine and cetirizine on eosinophilic airway inflammation in cats with experimentally induced asthma. Am J Vet Res. 2007;68(11):1265-1271.',
      sourceType: 'Ensaio clínico experimental randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17975984/',
      notes: 'Comprovou a ineficácia da ciproeptadina na redução da inflamação eosinofílica na asma felina.',
      evidenceLevel: 'Nível I — Ensaio experimental randomizado cruzado placebo-controlado',
    },
    {
      id: 'ref-scott-1992-pruritus',
      citationText: 'Scott DW, Miller WH Jr, Decker GA, Cayatte SM. Failure of cyproheptadine hydrochloride as an antipruritic agent in allergic dogs: results of a double-blinded, placebo-controlled study. Cornell Vet. 1992;82(3):247-251.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1643875/',
      notes: 'Demonstrou ausência de efeito antipruriginoso no cão, mas documentou polifagia em 25% dos animais.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado duplo-cego placebo-controlado',
    },
    {
      id: 'ref-stolp-1984-cushing',
      citationText: 'Stolp R, Croughs RJ, Rijnberk A. Results of cyproheptadine treatment in dogs with pituitary-dependent hyperadrenocorticism. J Endocrinol. 1984;101(3):311-314.',
      sourceType: 'Ensaio clínico prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/6726107/',
      notes: 'Comprovou ineficácia no tratamento de hiperadrenocorticismo canino.',
      evidenceLevel: 'Nível II — Ensaio clínico prospectivo em espécie-alvo',
    },
    {
      id: 'ref-hopkins-2017-serotonin',
      citationText: 'Hopkins J, Pardo M, Bischoff K. Serotonin Syndrome from 5-Hydroxytryptophan Supplement Ingestion in a 9-Month-Old Labrador Retriever. J Med Toxicol. 2017;13(2):183-186.',
      sourceType: 'Relato de caso toxicológico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28210931/',
      notes: 'Reversão de Síndrome Serotoninérgica com ciproeptadina e terapia intensiva.',
      evidenceLevel: 'Nível IV — Relato de caso clínico documentado com toxicocinética',
    },
    {
      id: 'ref-ray-2025-fate',
      citationText: 'Ray CC, Wolf J, Guillaumin J. Use of alteplase continuous rate infusion, pentoxifylline, and cyproheptadine in association or not, in acute feline aortic thromboembolism: a study of nine cats. Front Vet Sci. 2025;12:1512649.',
      sourceType: 'Série de casos retrospectiva',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40420956/',
      notes: 'Uso experimental de ciproeptadina no espasmo vascular de FATE.',
      evidenceLevel: 'Nível IV — Série de casos retrospectiva descritiva',
    },
    {
      id: 'ref-isfm-inappetent-2022',
      citationText: 'Taylor S, Chan DL, Villaverde C, et al. 2022 ISFM Consensus Guidelines on Management of the Inappetent Hospitalised Cat. J Feline Med Surg. 2022;24(7):614-640.',
      sourceType: 'Diretriz consensual internacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35775307/',
      notes: 'Classifica ciproeptadina como orexígeno tradicional de evidência fraca e prioriza mirtazapina e sondas alimentares.',
      evidenceLevel: 'Consenso internacional de especialistas da International Society of Feline Medicine',
    },
    {
      id: 'ref-plumbs-10-cyproheptadine',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia “Cyproheptadine”, pp. 327–329.',
      sourceType: 'Formulário veterinário de referência',
      url: null,
      notes: 'Monografia com farmacologia, dosagens de apetite, síndrome serotoninérgica e contraindicações em asma e Cushing.',
      evidenceLevel: 'Referência terciária veterinária padrão-ouro internacional',
    },
    {
      id: 'ref-bsava-10-cyproheptadine',
      citationText: 'Ramsey I, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia “Cyproheptadine”, pp. 103–104.',
      sourceType: 'Formulário terapêutico britânico',
      url: null,
      notes: 'Posologia de 1 a 4 mg/gato VO q12-24h para apetite e 2 a 4 mg/gato q12h para alergias.',
      evidenceLevel: 'Referência terciária britânica especializada',
    },
    {
      id: 'ref-apevitin-bc-label',
      citationText: 'EMS S/A. Bula do Medicamento Apevitin BC (Cloridrato de Ciproeptadina 0,8 mg/mL). Hortolândia: EMS; 2024.',
      sourceType: 'Bula comercial oficial de produto humano',
      url: 'https://www.ems.com.br/arquivos/produtos/bulas/bula_cloridrato_de_ciproeptadina_cloridrato_de_tiamina_riboflavina_cloridrato_de_piridoxina_nicotinamida_acido_ascorbico_1001_1529.pdf',
      notes: 'Apresentação comercial brasileira líquida de uso humano amplamente referenciada.',
      evidenceLevel: 'Documento regulatório oficial registrado na ANVISA',
    },
    {
      id: 'ref-cobavital-label',
      citationText: 'Abbott Laboratórios do Brasil Ltda. Bula do Medicamento Cobavital (Ciproeptadina 4 mg + Cobamamida 1 mg). São Paulo: Abbott; 2024.',
      sourceType: 'Bula comercial oficial de produto humano',
      url: 'https://www.abbottbrasil.com.br/nossas-bulas/cobavital-cobamamida-ciproeptadina.html',
      notes: 'Apresentação em microcomprimidos utilizada na rotina clínica e em emergências toxicológicas.',
      evidenceLevel: 'Documento regulatório oficial registrado na ANVISA',
    },
  ],
};
