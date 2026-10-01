import { MedicationRecord } from '../../types/medication';

export const amitriptilinaMedicationRecord: MedicationRecord = {
  id: 'med-amitriptilina',
  slug: 'amitriptilina',
  title: 'Amitriptilina (Cloridrato de Amitriptilina)',
  activeIngredient: 'Cloridrato de amitriptilina (3-(10,11-di-hidro-5H-dibenzo[a,d]ciclo-hepten-5-ilideno)-N,N-dimetilpropan-1-amina)',
  isControlled: true,
  controlNotice:
    'Medicamento sob Controle Especial — Portaria SVS/MS nº 344/1998 (Lista C1: Outras substâncias sujeitas a controle especial). Prescrição privativa em Receita de Controle Especial em 2 vias branca (1ª via retida pela farmácia, 2ª via devolvida ao tutor). Validade de 30 dias em todo o território nacional. Quantidade máxima para até 60 dias de tratamento. Obrigatoriedade dos novos formulários físicos Versão 2 vigentes desde 18 de maio de 2026.',
  tradeNames: [
    'Amytril® 25 mg e 75 mg Comprimidos Revestidos (Cristália — Referência Humana no Brasil)',
    'Cloridrato de Amitriptilina 25 mg e 75 mg Genéricos (EMS, Medley, Eurofarma, Teuto)',
    'Amitriptilina Cloridrato Cápsulas Manipuladas Veterinárias 2,5 mg, 5 mg e 10 mg (Uso Oral)',
    'Amitriptilina Solução Oral Manipulada 5 mg/mL ou 10 mg/mL em Veículo Adoçado Sem Xilitol',
    'Elavil® e Endep® (Marcas de Referência Históricas Internacionais)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/amitriptyline/PNG',
  pharmacologicClass:
    'Antidepressivo tricíclico (TCA) do grupo das aminas terciárias; inibidor não seletivo da recaptação de serotonina e noradrenalina (SNRI tricíclico); antagonista dos receptores muscarínicos, histaminérgicos H1 e adrenérgicos alfa-1; bloqueador de canais rápidos de sódio voltagem-dependentes; neuromodulador analgésico de dor crônica neuropática',
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Amitriptilina',
    'Amitriptyline',
    'Amytril',
    'Antidepressivo Tricíclico',
    'TCA',
    'Dor Neuropática',
    'Sensibilização Central',
    'Cistite Idiopática Felina',
    'FIC Refratária',
    'Ansiedade',
    'Comportamento Animal',
    'Granuloma de Lambedura',
    'Lista C1',
    'Portaria 344',
    'Receita de Controle Especial',
  ],

  mechanismOfAction:
    'A amitriptilina é uma amina terciária tricíclica dibenzocicloheptadieno dotada de uma farmacologia complexa e multirreceptorial que vai muito além de sua classificação tradicional como antidepressivo. Seu efeito primário reside na inibição pré-sináptica competitiva dos transportadores de recaptação neuronal de serotonina (SERT / SLC6A4) e noradrenalina (NET / SLC6A2), resultando em aumento pronunciado da disponibilidade dessas monoaminas na fenda sináptica do sistema nervoso central. No âmbito comportamental, a elevação imediata de serotonina não se traduz em ansiólise instantânea: a resposta terapêutica requer de 2 a 4 semanas de administração contínua para deflagrar dessensibilização dos autorreceptores inibitórios 5-HT1A e alfa-2 pré-sinápticos, reprogramação epigenética pós-sináptica e indução de plasticidade neuronal via fator neurotrófico derivado do cérebro (BDNF). No controle da dor neuropática e sensibilização central crônica, a amitriptilina fortalece as vias inibitórias descendentes que se projetam da substância cinzenta periaquedutal e do locus coeruleus até as lâminas I, II e V do corno dorsal da medula espinhal, onde a noradrenalina ativa receptores alfa-2 pós-sinápticos nos interneurônios inibitórios, bloqueando a transmissão aferente nociceptiva para centros talâmicos. Simultaneamente, a amitriptilina exibe propriedades secundárias marcantes: (1) potente antagonismo competitivo dos receptores histaminérgicos H1 centrais e periféricos, responsável por sedação precoce pronunciada, estímulo de apetite e modesto alívio antipruriginoso adjuvante com estabilização de degranulação mastocitária; (2) expressivo antagonismo dos receptores muscarínicos colinérgicos (M1 a M5), provocando efeitos anticolinérgicos como xerostomia (boca seca), diminuição da produção lacrimal, relaxamento do músculo detrusor da bexiga com retenção urinária e retardo do trânsito gastrointestinal; (3) antagonismo dos receptores adrenérgicos alfa-1 vasculares, podendo precipitar hipotensão e vasodilatação periférica; e (4) em doses elevadas ou superdosagens, bloqueio dose-dependente dos canais rápidos de sódio voltagem-dependentes (efeito estabilizador de membrana tipo quinidina / anestésico local), lentificando a fase 0 do potencial de ação miocárdico e predispondo a alargamento do complexo QRS, arritmias ventriculares reentrantes e cardiotoxicidade severa.',

  plainLanguageSummary:
    'A amitriptilina é um medicamento antidepressivo tricíclico de múltipla ação utilizado em cães e gatos como neuromodulador para o controle de dores crônicas de difícil controle (como a dor neuropática e síndromes de dor na coluna ou articulações), transtornos de ansiedade e comportamentos compulsivos, e de forma adjuvante em gatos selecionados com cistite idiopática crônica grave que não melhoraram com o enriquecimento do ambiente. Diferente de calmantes rápidos de emergência, a amitriptilina precisa ser fornecida continuamente todos os dias no mesmo horário por pelo menos duas a quatro semanas para que seus efeitos benéficos sobre a mente e as vias de alívio da dor no cérebro comecem a se consolidar de verdade, não devendo nunca ser administrada apenas de vez em quando sob demanda. Devido à sua ação abrangente em diferentes receptores do organismo, é muito frequente que o animal apresente sonolência acentuada nos primeiros dias de tratamento, além de boca seca, fezes mais ressecadas e diminuição do lacrimejamento dos olhos, sendo estritamente contraindicada em pacientes com dificuldade para urinar, bexiga flácida ou entupimento das vias urinárias, pois ela relaxa a parede da bexiga e pode impedir a saída da urina. Por se tratar de uma substância controlada pela Portaria 344 da Anvisa na Lista C1, sua compra exige a apresentação de Receita de Controle Especial em duas vias emitida pelo médico-veterinário, com validade de trinta dias, devendo os comprimidos ou cápsulas ser mantidos em local seguro e fora do alcance de animais e crianças, pois a ingestão acidental de doses altas pode causar arritmias cardíacas graves e convulsões.',

  pillars: [
    {
      title: 'Inibição Pré-Sináptica de NET & SERT',
      icon: 'Shield',
      desc: 'Bloqueia a recaptação de noradrenalina e serotonina na fenda sináptica, exigindo 2 a 4 semanas de adaptação de autorreceptores para resposta ansiolítica e comportamental estável.',
    },
    {
      title: 'Fortalecimento da Via Descendente Inibitória da Dor',
      icon: 'Heart',
      desc: 'Potencializa a sinalização noradrenérgica alfa-2 e serotoninérgica no corno dorsal espinhal, inibindo a transmissão de dor neuropática, alodinia e sensibilização central.',
    },
    {
      title: 'Antagonismo H1 Sedativo & Antialérgico',
      icon: 'Zap',
      desc: 'Bloqueio histaminérgico central gerando sedação pronunciada inicial e discreto efeito antipruriginoso adjuvante com estabilização mastocitária em dermatoses crônicas.',
    },
    {
      title: 'Farmacologia Anticolinérgica, Alfa-1 & Canais de Na+',
      icon: 'AlertTriangle',
      desc: 'Ação antimuscarínica que causa boca seca, constipação e relaxamento detrusor (risco de retenção urinária), aliada a risco de hipotensão alfa-1 e bloqueio de sódio cardíaco em superdose.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Proibição Absoluta em Obstrução Urinária e Atonia Vesical (Perigo na FIC Aguda)',
      text: 'A potente ação anticolinérgica antimuscarínica da amitriptilina inibe diretamente a contração do músculo detrusor da bexiga, favorecendo retenção urinária volumosa. O fármaco é formalmente contraindicado em gatos ou cães com obstrução uretral ativa, estrangúria mecânica ou bexiga flácida hipocontrátil. Ensaios clínicos randomizados duplo-cegos (Kruger et al. 2003 e Kraijer et al. 2003) comprovaram que a amitriptilina de curto prazo (7 dias) NÃO traz benefício no tratamento da crise aguda de Cistite Idiopática Felina (FIC), associando-se inclusive a recorrências mais precoces. Seu nicho na FIC é restrito exclusivamente a casos crônicos, recorrentes e refratários após falha do manejo ambiental multimodal (MEMO) e analgesia.',
    },
    {
      label: 'Risco Crítico de Síndrome Serotoninérgica com Outros Psicotrópicos',
      text: 'A associação de amitriptilina com inibidores da monoamina oxidase / IMAO (como a selegilina) é estritamente contraindicada e potencialmente letal, exigindo um período de intervalo prévio (washout) de pelo menos 14 dias entre as terapias. A coadministração com inibidores seletivos da recaptação de serotonina (fluoxetina, sertralina, paroxetina), outros antidepressivos tricíclicos (clomipramina) ou opioides serotoninérgicos como o tramadol eleva drasticamente o risco de Síndrome Serotoninérgica grave (hipertermia maligna, tremores, rigidez muscular, taquicardia, mioclonia e convulsões). Adicionalmente, tanto a amitriptilina quanto o tramadol diminuem o limiar convulsivo.',
    },
    {
      label: 'Não Utilizar como Medicamento PRN (Uso Sob Demanda) em Ansiedade',
      text: 'A amitriptilina não possui ação ansiolítica aguda imediata. A sonolência ou apatia observada nas primeiras doses decorre exclusivamente do bloqueio histaminérgico H1 sedativo e não de ansiólise verdadeira. A modulação de fobias, ansiedade de separação e compulsões exige administração contínua diária por um período mínimo de 2 a 4 semanas para que ocorra a dessensibilização dos autorreceptores e a remodelação das sinapses centrais. O uso episódico sob demanda apenas seda o paciente sem tratar o estresse subjacente.',
    },
    {
      label: 'Via Transdérmica Ineficaz e Não Confiável em Felinos',
      text: 'Estudos farmacocinéticos rigorosos cruzados em gatos (Mealey et al. 2004) comprovaram que a aplicação transdérmica de amitriptilina em gel de lecitina de organogel plurônico (PLO) no pavilhão auricular resulta em absorção sistêmica mínima, errática e clinicamente desprezível em relação à via oral. A suposta resposta observada historicamente na rotina clínica derivava quase que exclusivamente da ingestão oral acidental durante o hábito de lambedura (grooming). A via transdérmica NÃO é recomendada para uso no ConsultaVET.',
    },
    {
      label: 'Cardiotoxicidade em Superdose: Alargamento do QRS e Reversão com Bicarbonato de Sódio',
      text: 'Em doses supraterapêuticas ou ingestão acidental pelo paciente, a amitriptilina bloqueia os canais rápidos de sódio miocárdicos (efeito tipo anestésico local classe Ia), lentificando a velocidade de condução intraventricular. O achado de alargamento do complexo QRS e taquiarritmias ventriculares reentrantes no eletrocardiograma é o principal marcador de intoxicação grave potencialmente fatal. O antídoto de primeira linha para cardiotoxicidade por TCA em cães e gatos é o Bicarbonato de Sódio a 8,4% (2 a 3 mEq/kg IV lento), que alcaliniza o meio sérico e restaura a condutância do sódio miocárdico. A fisostigmina é contraindicada por risco de bradiarritmias fatais e convulsões.',
    },
  ],

  indications: [
    'Tratamento adjuvante da dor crônica com componente neuropático, sensibilização central, síndrome dolorosa miofascial e osteoartrite refratária em cães e gatos.',
    'Tratamento adjuvante da Cistite Idiopática Felina (FIC) crônica, grave e recorrente após falha do manejo ambiental e hídrico multimodal (MEMO).',
    'Tratamento de transtornos de ansiedade crônica, fobia a ruídos, ansiedade de separação canina e comportamentos compulsivos (granuloma de lambedura acral).',
    'Tratamento coadjuvante de alterações comportamentais felinas crônicas, incluindo marcação urinária vertical refratária e overgrooming psicogênico.',
    'Terapia antipruriginosa adjuvante de resgate em dermatites atópicas refratárias com componente ansioso ou hiperestésico associado (uso histórico secundário).',
  ],

  quickIndications: [
    {
      condition: 'Dor Crônica e Neuropática Canina (Sensibilização Central)',
      species: 'dog',
      doseSummary: '1 a 2 mg/kg VO a cada 12 a 24 horas (iniciar com 1 mg/kg q24h à noite e titular gradualmente)',
      route: 'Oral (VO)',
      duration: 'Uso contínuo multimodal; reavaliar analgesia e tolerabilidade a cada 14 a 30 dias',
      clinicalContext: 'Cães com lombossacralgia degenerativa, compressão radicular crônica ou alodinia refratária a AINEs.',
    },
    {
      condition: 'Transtornos de Ansiedade e Comportamentos Compulsivos Caninos',
      species: 'dog',
      doseSummary: '1 a 2 mg/kg VO a cada 12 a 24 horas associado a protocolo de modificação comportamental',
      route: 'Oral (VO)',
      duration: 'Mínimo de 4 a 8 semanas para avaliação de resposta comportamental; desmame gradual ao retirar',
      clinicalContext: 'Cães com granuloma por lambedura acral ou ansiedade de separação refratária.',
    },
    {
      condition: 'Cistite Idiopática Felina (FIC) Crônica Recorrente e Refratária',
      species: 'cat',
      doseSummary: '0,5 a 1 mg/kg VO a cada 24 horas à noite (ou 2,5 a 5 mg/gato q24h) associado a manejo MEMO',
      route: 'Oral (VO)',
      duration: 'Tratamento de longo prazo (6 a 12 meses sob monitoramento urinário e de peso); descontinuar se retenção',
      clinicalContext: 'Gatos com FIC recorrente grave não obstrutiva que falharam ao enriquecimento ambiental.',
    },
    {
      condition: 'Dor Neuropática e Sensibilização Central Felina',
      species: 'cat',
      doseSummary: '0,5 a 1 mg/kg VO a cada 24 horas (ou 2,5 a 5 mg/gato VO q24h à noite)',
      route: 'Oral (VO)',
      duration: 'Uso prolongado adjuvante; titular conforme grau de sedação e aceitação da cápsula',
      clinicalContext: 'Gatos com dor espinhal crônica, hiperestesia felina ou osteoartrite avançada.',
    },
    {
      condition: 'Prurido Alérgico Refratário Canino com Componente Psicogênico',
      species: 'dog',
      doseSummary: '1 a 2,2 mg/kg VO a cada 12 horas (q12h) por 3 a 4 semanas para prova terapêutica',
      route: 'Oral (VO)',
      duration: 'Avaliar por 30 dias; descontinuar caso não haja redução perceptível do escore de prurido',
      clinicalContext: 'Uso de resgate em cães atópicos com componente compulsivo associado.',
    },
  ],

  contraindications: [
    'Obstrução uretral mecânica ativa, retenção urinária ou atonia vesical flácida em cães e gatos (risco severo de ruptura vesical por bloqueio antimuscarínico do detrusor).',
    'Glaucoma de ângulo fechado pré-existente (a midríase anticolinérgica obstrui o escoamento trabecular do humor aquoso).',
    'Epilepsia idiopática ativa, histórico de crises convulsivas ou doença intracraniana estrutural (a amitriptilina reduz o limiar convulsivo).',
    'Insuficiência cardíaca congestiva, arritmias ventriculares ativas, bloqueios atrioventriculares de condução ou cardiopatias estruturais avançadas.',
    'Uso simultâneo ou recente de Inibidores da Monoamina Oxidase / IMAO (como selegilina); washout obrigatório de no mínimo 14 dias.',
    'Hepatopatia severa descompensada ou insuficiência hepática aguda (metabolismo predominantemente hepático dependente do CYP450).',
    'Tratamento isolado e de curto prazo da crise aguda de Cistite Idiopática Felina (ineficaz e associado a piora da recorrência segundo RCTs de Kruger et al. e Kraijer et al.).',
  ],

  cautions: [
    'Medicamento sob Controle Especial (Portaria 344/98 Lista C1): exigência de Receita de Controle Especial em 2 vias branca com retenção da primeira via.',
    'Sedação inicial pronunciada e tolerância: alertar o tutor de que a letargia das primeiras semanas decorre de ação anti-histamínica e não reflete cura ansiolítica.',
    'Diminuição da secreção lacrimal: cautela extrema em animais com ceratoconjuntivite seca (KCS); monitorar teste lacrimal de Schirmer (STT).',
    'Retardo da motilidade gastrointestinal e obstipação: monitorar frequência e consistência fecal, especialmente em gatos e cães geriátricos predispostos a megacólon.',
    'Interferência no perfil tireoidiano: a amitriptilina reduz as concentrações séricas basais de tT3, tT4 e fT4 em cães e gatos sem causar hipotireoidismo clínico primário; coletar perfil tireoidiano antes de iniciar a terapia (Plumb 10ª ed.).',
    'Hipertireoidismo felino: cautela acentuada pelo risco de potencialização adrenérgica, taquiarritmias e instabilidade cardiovascular.',
    'Desmame gradual obrigatório: tratamentos superiores a 30 dias devem ser retirados gradativamente ao longo de 2 a 3 semanas para evitar síndrome de descontinuação.',
    'Palatabilidade amarga extrema em gatos: nunca esmagar ou abrir comprimidos/cápsulas na boca do animal; o sabor provoca ptialismo e sialorreia profusa de repulsa gustativa.',
  ],

  adverseEffects: [
    'Sedação profunda, sonolência diurna e ataxia leve (especialmente nos primeiros 7 a 14 dias de indução terapêutica).',
    'Sinais anticolinérgicos: xerostomia (boca seca), diminuição da produção de lágrima, constipação intestinal, midríase e retenção urinária.',
    'Efeitos cardiovasculares: taquicardia sinusal, hipotensão postural por bloqueio alfa-1, síncope e, em doses altas, arritmias ventriculares com alargamento do QRS.',
    'Efeitos gastrointestinais: náuseas, anorexia, êmese pós-dose (mais comum em estômago vazio) e ganho de peso corporal crônico por estímulo de apetite.',
    'Hipersalivação e ptialismo transitório imediato após a administração oral em gatos devido ao sabor intensamente amargo da substância.',
    'Piora da qualidade da pelagem em felinos sob uso crônico prolongado devido à redução da frequência diária de autolimpeza (grooming).',
    'Redução do limiar epileptogênico com deflagração de tremores musculares ou crises convulsivas em animais predispostos.',
    'Reações hematológicas raras: trombocitopenia leve transitória, neutropenia idiossincrática ou elevação discreta de enzimas hepáticas (ALT/FA).',
  ],

  interactions: [
    'Inibidores da Monoamina Oxidase / IMAO (Selegilina): Contraindicação absoluta. Risco de Síndrome Serotoninérgica fatal, colapso autonômico e hipertermia maligna. Respeitar washout de pelo menos 14 dias.',
    'Inibidores Seletivos da Recaptação de Serotonina (Fluoxetina, Sertralina, Paroxetina): Somação de efeito serotoninérgico e inibição competitiva do metabolismo pelo CYP450, elevando o risco de toxicidade e Síndrome Serotoninérgica.',
    'Tramadol: Associação de alto risco farmacológico. Ocorre somação da recaptação de serotonina/noradrenalina associada à diminuição cumulativa do limiar convulsivo. Evitar associação rotineira ou monitorar rigorosamente.',
    'Amantadina: Potencialização de efeitos anticolinérgicos centrais e periféricos (retenção urinária grave, íleo paralítico, boca seca e hipertermia) além de risco de prolongamento do intervalo QT.',
    'Betanecol: Antagonismo farmacológico direto no trato urinário. A amitriptilina bloqueia os receptores muscarínicos que o betanecol tenta ativar para promover a contração do detrusor; evitar a associação.',
    'Fármacos Anticolinérgicos e Anti-histamínicos H1 Sedativos (Difenidramina, Atropina, Hioscina): Somação de efeitos antimuscarínicos com obstipação severa, íleo, retenção urinária e sedação excessiva.',
    'Agentes Simpatomiméticos e Vasopressores (Adrenalina, Noradrenalina, Efedrina): A inibição da recaptação de catecolaminas pela amitriptilina pode hipersensibilizar a resposta cardiovascular, deflagrando picos hipertensivos e arritmias ventriculares graves.',
    'Agentes Anestésicos Gerais e Depressores do SNC: Potencialização da depressão do sistema nervoso central e vasodilatação com hipotensão perioperatória; o anestesista deve ser informado do uso crônico de amitriptilina.',
    'Cimetidina e Inibidores do CYP450: Inibição do metabolismo hepático da amitriptilina com aumento substancial de sua concentração plasmática e meia-vida, potencializando toxicidades.',
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção oral rápida a partir do trato gastrointestinal. Em cães Greyhounds saudáveis submetidos a estudo farmacocinético crossover (Norkus et al. 2015), a administração de 4 mg/kg VO produziu pico plasmático (Cmax) médio de 27,4 ng/mL em Tmax aproximado de 1 hora. A biodisponibilidade oral absoluta canina foi baixa, em torno de 6%, em decorrência de expressivo metabolismo pré-sistêmico de primeira passagem intestinal e hepática (a administração de 8,1 mg/kg com alimento elevou a Cmax e AUC em comparação ao jejum, demonstrando que a oferta com pequena refeição melhora a exposição e reduz êmese). Em gatos, a absorção oral é relativamente rápida com Tmax descrito entre 1 e 2 horas; a via transdérmica em gel PLO apresentou biodisponibilidade desprezível e imprevisível (Mealey et al. 2004), sendo desaconselhada.',
    distribution:
      'Molécula altamente lipofílica (XLogP3 ~5,0) que exibe amplo volume de distribuição tecidual (> 10 a 18 L/kg em humanos; volume amplo e variável em cães). A taxa de ligação a proteínas plasmáticas é elevada (superior a 90% a 95%, ligando-se predominantemente à albumina sérica). Atravessa facilmente a barreira hematoencefálica (BHE), atingindo concentrações elevadas no parênquima cerebral, córtex e medula espinhal, além de atravessar a barreira placentária e ser excretada no leite materno. É substrato da P-glicoproteína (ABCB1/MDR1).',
    metabolism:
      'Extenso metabolismo hepático mediado por enzimas do complexo citocromo P450. A principal via metabólica consiste na N-desmetilação oxidativa gerando a nortriptilina, um metabólito farmacologicamente ativo que retém potente capacidade de inibição da recaptação de noradrenalina (NET) com menor efeito antimuscarínico que o fármaco parental. Vias secundárias incluem hidroxilação (formando 10-hidroxiamitriptilina e 10-hidroxinortriptilina) e conjugação glicurônica. Em felinos, embora as vias de glicuronidação sejam constitucionalmente mais lentas, a oxidação e desmetilação hepática suprem a biotransformação inicial.',
    elimination:
      'A eliminação da amitriptilina intacta e da nortriptilina livre por excreção renal é ínfima (menos de 2% a 5% da dose). Cerca de 40% a 50% dos metabólitos hidroxilados e conjugados inativos são eliminados na urina dentro de 24 horas, com o restante sofrendo excreção biliar e fecal. A meia-vida de eliminação terminal da amitriptilina parental em cães situa-se entre 4 e 10 horas (média de 4,33 horas em Greyhounds), enquanto a meia-vida da nortriptilina ativa é mais prolongada (6 a 12 horas, média de 6,2 horas). Em gatos, a meia-vida clínica não foi estabelecida com segurança matemática universal.',
  },

  doses: [
    {
      id: 'dose-amit-dog-behavior',
      species: 'dog',
      indication: 'Transtornos de ansiedade crônica, fobias sonoras e comportamentos compulsivos caninos',
      doseMin: 1.0,
      doseMax: 2.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Uso contínuo por no mínimo 4 a 8 semanas para avaliação de eficácia; desmame gradual ao retirar',
      notes:
        'Iniciar preferencialmente com 1 mg/kg VO a cada 24 horas à noite para mitigar a sedação diurna inicial. Pode ser titulada progressivamente para 1 a 2 mg/kg q12h em casos refratários. Administrar sempre associado a enriquecimento ambiental e modificação comportamental. Não utilizar de forma pontual (PRN). Exige Receita de Controle Especial em 2 vias (Lista C1).',
      calculatorEnabled: true,
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-amit-dog-neuropathic',
      species: 'dog',
      indication: 'Dor crônica neuropática, sensibilização central e lombossacralgia em cães',
      doseMin: 1.0,
      doseMax: 4.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12–24h',
      duration: 'Uso crônico multimodal sob reavaliação periódica',
      notes:
        'Diretrizes da WSAVA e Plumb 10ª ed.: iniciar conservadoramente com 1 mg/kg VO q24h à noite (ou q12h) e titular gradualmente até 3 a 4 mg/kg q12h em casos neuropáticos severos conforme tolerabilidade. Evitar associação rotineira com tramadol pelo risco de Síndrome Serotoninérgica e redução do limiar convulsivo.',
      calculatorEnabled: true,
      referenceIds: ['ref-wsava-pain-2022', 'ref-plumb-10', 'ref-bsava-10'],
    },
    {
      id: 'dose-amit-dog-pruritus',
      species: 'dog',
      indication: 'Prurido alérgico canino refratário e dermatite por lambedura acral (uso histórico secundário)',
      doseMin: 1.0,
      doseMax: 2.2,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h',
      duration: '3 a 4 semanas para avaliação de prova terapêutica',
      notes:
        'Estudo clínico de Miller et al. (1992): 1 mg/kg VO q12h promoveu alívio significativo do prurido em apenas cerca de 16% a 32% dos cães atópicos. Reservar como adjuvante em casos refratários quando há componente psicogênico associado ao prurido (ex.: granuloma acral).',
      calculatorEnabled: true,
      referenceIds: ['ref-miller-pruritus-1992', 'ref-plumb-10'],
    },
    {
      id: 'dose-amit-cat-behavior',
      species: 'cat',
      indication: 'Transtornos comportamentais felinos, marcação urinária vertical e overgrooming psicogênico',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Uso prolongado por pelo menos 4 a 8 semanas sob monitoramento de peso e pelagem',
      notes:
        'Dose felina padronizada BSAVA (10ª ed., p. 23): 0,5 a 1 mg/kg VO a cada 24 horas à noite. Prescrever cápsulas manipuladas veterinárias de 2,5 mg ou 5 mg para permitir fracionamento seguro. Nunca abrir ou esmagar a cápsula (sabor intensamente amargo que induz sialorreia profusa).',
      calculatorEnabled: true,
      referenceIds: ['ref-bsava-10', 'ref-plumb-10'],
    },
    {
      id: 'dose-amit-cat-fic-refractory',
      species: 'cat',
      indication: 'Cistite Idiopática Felina (FIC) crônica, grave e recorrente (adjuvante após falha do MEMO)',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: '6 a 12 meses sob acompanhamento clínico contínuo e exames de urina',
      notes:
        'Posologia de manutenção para FIC crônica refratária (iCatCare 2025): 0,5 a 1 mg/kg VO a cada 24 horas à noite (geralmente 2,5 a 5 mg/gato q24h). Formalmente CONTRAINDICADO na crise aguda de FIC e em gatos com obstrução ou atonia vesical (Kruger et al. 2003). Monitorar ganho de peso e qualidade da pelagem.',
      calculatorEnabled: true,
      referenceIds: ['ref-icatcare-fic-2025', 'ref-chew-fic-1998', 'ref-bsava-10'],
    },
    {
      id: 'dose-amit-cat-fic-high-chew',
      species: 'cat',
      indication: 'Cistite Idiopática Felina crônica grave de resgate — protocolo histórico de estudo prolongado',
      doseMin: 10.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Até 12 meses conforme tolerabilidade clínica',
      notes:
        'Dose fixa noturna utilizada no estudo prospectivo clássico de Chew et al. (1998, JAVMA): 10 mg por gato VO a cada 24 horas à noite em 15 felinos com FIC severa refratária. Embora tenha eliminado sinais clínicos em 60% a 73% dos gatos, cursou com sonolência inicial, piora da pelagem por menos grooming em 89% dos gatos e formação de microcálculos em 4 animais.',
      calculatorEnabled: false,
      referenceIds: ['ref-chew-fic-1998', 'ref-plumb-10'],
    },
    {
      id: 'dose-amit-cat-neuropathic',
      species: 'cat',
      indication: 'Dor crônica neuropática, hiperestesia felina e dor articular refratária em gatos',
      doseMin: 2.5,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'gato',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Uso prolongado adjuvante; reavaliar a cada 30 dias',
      notes:
        'Dose prática por animal para dor neuropática e sensibilização central (WSAVA Pain Guidelines): 2,5 a 5 mg por gato VO a cada 24 horas à noite. Titular a partir de 2,5 mg/gato. Monitorar sonolência e motilidade intestinal.',
      calculatorEnabled: false,
      referenceIds: ['ref-wsava-pain-2022', 'ref-plumb-10'],
    },
  ],

  monitoringParameters: [
    'Avaliação de sinais comportamentais e escores de dor: monitorar a latência terapêutica de 2 a 4 semanas, orientando o tutor a não esperar efeito ansiolítico imediato.',
    'Monitoramento da micção e palpação vesical periódica: verificar ausência de disúria, estrangúria ou retenção urinária decorrente do relaxamento do detrusor por bloqueio anticolinérgico.',
    'Avaliação oftálmica e lacrimal (Teste de Schirmer / STT): realizar em pacientes predispostos à ceratoconjuntivite seca (KCS) ou com sinais de ressecamento ocular.',
    'Exame clínico cardiovascular e eletrocardiograma (ECG): auscultação seriada de frequência cardíaca e ritmo; em pacientes cardiopatas, idosos ou suspeita de superdosagem, obter traçado eletrocardiográfico para monitorar a largura do complexo QRS e arritmias ventriculares.',
    'Avaliação da função hepática e renal: monitorar ALT, AST, fosfatase alcalina, creatinina e ureia a cada 6 a 12 meses durante o tratamento crônico.',
    'Urinálise com sedimento em felinos com FIC: realizar periodicamente para rastrear formação de sedimentos, cristais ou cálculos secundários ao retardo miccional.',
    'Monitoramento de peso corporal e escore de condição corporal (ECC): registrar evolução ponderal, visto que o bloqueio H1 frequentemente induz polifagia e ganho de peso em cães e gatos.',
  ],

  clientInformation: [
    'Medicamento sob Controle Especial (Receita em 2 vias): A amitriptilina é uma substância controlada pela Portaria 344 da Anvisa. Sua receita possui validade de 30 dias.',
    'O remédio demora para fazer efeito: Para ansiedade, estresse ou alívio de dores crônicas, o medicamento precisa ser fornecido todos os dias de forma contínua durante 2 a 4 semanas para que o benefício real seja percebido. Ele não funciona como um calmante pontual para ser usado apenas no dia de fogos de artifício ou viagens.',
    'Sonolência nos primeiros dias: É normal que o animal apresente sonolência, preguiça e lentidão na primeira ou segunda semana de tratamento. Esse efeito costuma diminuir gradativamente com o tempo.',
    'Cuidado com a bexiga: Observe diariamente se o seu animal está conseguindo urinar normalmente. Se o cão ou gato fizer força para urinar e não sair nada, ou se a barriga estiver muito inchada e dolorida, suspenda o medicamento e procure o veterinário imediatamente.',
    'Gatos — Nunca abra a cápsula: A amitriptilina é extremamente amarga. Se a cápsula for aberta ou o remédio for esmagado na comida, o gato vai babar copiosamente e poderá criar aversão alimentar.',
    'Como administrar: O medicamento pode ser fornecido com um pequeno pedaço de alimento ou após uma refeição para diminuir o risco de enjoo e vômitos.',
    'Nunca pare o remédio de repente: Caso o animal use a amitriptilina há mais de um mês, a interrupção brusca pode causar agitação e mal-estar. O médico-veterinário orientará como diminuir a dose aos poucos ao longo de duas a três semanas.',
    'Armazenamento seguro: Guarde o frasco em local seco e fechado, fora do alcance de crianças e de outros animais. Em doses altas, este remédio pode causar arritmias cardíacas graves e intoxicação fatal.',
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia: Amitriptyline, pp. 59–60.',
      sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Monografia canônica com posologia comparada para comportamento, dor crônica e prurido, alertas de toxicidade anticolinérgica e interferência tireoidiana.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia: Amitriptyline, pp. 22–23.',
      sourceType: 'Formulário Veterinário Internacional',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Diretrizes britânicas de dosagem (1 a 2 mg/kg q12-24h em cães e 0,5 a 1 mg/kg q24h em gatos), recomendação de administração com alimento e alertas de retenção urinária.',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-icatcare-fic-2025',
      citationText:
        'Taylor S, Boysen S, Buffington T, et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. J Feline Med Surg. 2025;27(2):1098612X241309176. doi:10.1177/1098612X241309176.',
      sourceType: 'Diretriz de Consenso Internacional Especializado',
      url: 'https://doi.org/10.1177/1098612X241309176',
      notes: 'Consenso iCatCare 2025 definindo a Cistite Idiopática Felina como distúrbio do sistema de resposta à ameaça e posicionando a amitriptilina exclusivamente como adjuvante em casos crônicos refratários.',
      evidenceLevel: 'Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-wsava-pain-2022',
      citationText:
        'Monteiro BP, Lascelles BDX, Murrell J, Robertson S, Steagall PVM, Wright B. 2022 WSAVA guidelines for the recognition, assessment and treatment of pain. J Small Anim Pract. 2023;64(4):177-254. doi:10.1111/jsap.13566.',
      sourceType: 'Diretriz Global de Manejo da Dor',
      url: 'https://doi.org/10.1111/jsap.13566',
      notes: 'Consagra os antidepressivos tricíclicos como moduladores do sistema inibitório descendente da dor em dor crônica e neuropática, ressaltando evidência clínica veterinária limitada.',
      evidenceLevel: 'Diretriz Internacional Especializada WSAVA',
    },
    {
      id: 'ref-norkus-pk-2015',
      citationText:
        'Norkus C, Rankin D, KuKanich B. Pharmacokinetics of intravenous and oral amitriptyline and its active metabolite nortriptyline in Greyhound dogs. Vet Anaesth Analg. 2015;42(6):580-589. doi:10.1111/vaa.12248.',
      sourceType: 'Ensaio farmacocinético cruzado prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25683584/',
      notes: 'Estudo seminal em cães Greyhounds demonstrando Tmax oral de 1 h, t1/2 de 4,33 h, biodisponibilidade oral de 6% e formação do metabólito ativo nortriptilina.',
      evidenceLevel: 'Nível I — Ensaio farmacocinético cruzado',
    },
    {
      id: 'ref-norkus-food-2015',
      citationText:
        'Norkus C, Rankin D, KuKanich B. Evaluation of the pharmacokinetics of oral amitriptyline and its active metabolite nortriptyline in fed and fasted Greyhound dogs. J Vet Pharmacol Ther. 2015;38(6):619-622. doi:10.1111/jvp.12237.',
      sourceType: 'Ensaio farmacocinético de interação alimentar',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25989225/',
      notes: 'Demonstrou que a administração com alimento melhora a absorção/exposição da amitriptilina e reduz a incidência de êmese em cães.',
      evidenceLevel: 'Nível I — Farmacocinética cruzada com alimento',
    },
    {
      id: 'ref-mealey-transdermal-2004',
      citationText:
        'Mealey KL, Peck KE, Bennett BS, Sellon RK, Swinney GR, Melzer K, Guedis DL. Systemic absorption of amitriptyline and buspirone after oral and transdermal administration to healthy cats. J Vet Intern Med. 2004;18(1):43-46. doi:10.1892/0891-6640(2004)18<43:saoaab>2.0.co;2.',
      sourceType: 'Ensaio clínico farmacocinético cruzado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/14765730/',
      notes: 'Comprovou absorção transdérmica errática e clinicamente insuficiente de amitriptilina em gel PLO no pavilhão auricular de gatos.',
      evidenceLevel: 'Nível I — Ensaio cruzado prospectivo em felinos',
    },
    {
      id: 'ref-kraijer-fic-2003',
      citationText:
        'Kraijer M, Fink-Gremmels J, Nickel RF. Negative outcome of 7-day amitriptyline administration in acute idiopathic cystitis in cats. Vet Q. 2003;25(3):105-110.',
      sourceType: 'Ensaio clínico randomizado (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12765630/',
      notes: 'Segundo RCT independente demonstrando ausência de benefício da amitriptilina na crise aguda de cistite idiopática felina.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado',
    },
    {
      id: 'ref-kruger-fic-2003',
      citationText:
        'Kruger JM, Conway TS, Kaneene JB, Perry RL, Hagenlocker E, Golombek A, Stuhler J. Randomized controlled trial of the efficacy of short-term amitriptyline administration for treatment of acute, nonobstructive, idiopathic lower urinary tract disease in cats. J Am Vet Med Assoc. 2003;222(6):749-758. doi:10.2460/javma.2003.222.749.',
      sourceType: 'Ensaio clínico randomizado controlado por placebo (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12675297/',
      notes: 'RCT demonstrando que o uso de amitriptilina por 7 dias na crise aguda de FIC não acelera a melhora e aumenta o risco de recidivas precoces.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado e controlado',
    },
    {
      id: 'ref-chew-fic-1998',
      citationText:
        'Chew DJ, Buffington CA, Kendall MS, DiBartola SP, Woodworth BE. Amitriptyline treatment for severe recurrent idiopathic cystitis in cats. J Am Vet Med Assoc. 1998;213(9):1282-1286.',
      sourceType: 'Estudo clínico prospectivo de longo prazo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9810383/',
      notes: 'Estudo seminal em 15 gatos com FIC refratária grave recebendo 10 mg/gato q24h por até 12 meses; comprovou remissão clínica em 60% a 73%, mas com ganho de peso e alteração da pelagem.',
      evidenceLevel: 'Nível II — Estudo prospectivo longitudinal',
    },
    {
      id: 'ref-virga-aggression-2001',
      citationText:
        'Virga V, Houpt KA, Scarlett JM. Efficacy of amitriptyline as a pharmacological adjunct to behavioral modification in the management of aggressive behaviors in dogs. J Am Anim Hosp Assoc. 2001;37(4):325-330. doi:10.5326/15473317-37-4-325.',
      sourceType: 'Ensaio clínico randomizado duplo-cego cruzado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11450832/',
      notes: 'Ensaio controlado comprovando ausência de benefício adicional da amitriptilina na agressão canina em relação à modificação comportamental isolada.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado e controlado',
    },
    {
      id: 'ref-miller-pruritus-1992',
      citationText:
        'Miller WH Jr, Scott DW, Wellington JR. Nonsteroidal management of canine pruritus with amitriptyline. Cornell Vet. 1992;82(1):53-57.',
      sourceType: 'Estudo clínico prospectivo aberto',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1740060/',
      notes: 'Avaliou 31 cães atópicos com 1 mg/kg q12h, demonstrando resposta satisfatória em apenas 16% a 32% dos casos.',
      evidenceLevel: 'Nível III — Série de casos clínicos prospectivos',
    },
    {
      id: 'ref-cristalia-amytril',
      citationText:
        'Cristália Produtos Químicos Farmacêuticos Ltda. Bula oficial do medicamento Amytril® (Cloridrato de amitriptilina 25 mg e 75 mg comprimidos revestidos). Registro ANVISA MS nº 1.0298.0163.',
      sourceType: 'Bula Técnica Oficial Registrada ANVISA',
      url: 'https://consultas.anvisa.gov.br/#/medicamentos/',
      notes: 'Apresentação comercial humana de referência no Brasil sob a Lista C1 da Portaria 344/98.',
      evidenceLevel: 'Documento Técnico Regulatório ANVISA',
    },
  ],

  presentations: [
    {
      id: 'pres-amytril-25mg',
      name: 'Amytril® 25 mg Comprimidos Revestidos',
      brand: 'Cristália (Referência Humana Extrabula no Brasil)',
      form: 'Comprimido revestido',
      concentrationValue: 25.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 ou 60 comprimidos revestidos de 25 mg (Lista C1)',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-amitriptilina-75mg',
      name: 'Cloridrato de Amitriptilina 75 mg Comprimidos Revestidos',
      brand: 'EMS / Eurofarma / Cristália',
      form: 'Comprimido revestido',
      concentrationValue: 75.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 30 comprimidos revestidos de 75 mg (Lista C1)',
      route: 'Oral (VO)',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-amitriptilina-mag-caps',
      name: 'Amitriptilina Cloridrato Cápsulas Magistrais Veterinárias',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Cápsula gelatinosa manipulada',
      concentrationValue: 5.0,
      concentrationUnit: 'mg',
      packInfo: 'Frasco com 30 ou 60 cápsulas (doses flexíveis: 2,5 mg, 5 mg ou 10 mg)',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
    {
      id: 'pres-amitriptilina-mag-sol',
      name: 'Amitriptilina Solução Oral Magistral 5 mg/mL (Veículo Adoçado)',
      brand: 'Farmácia de Manipulação Veterinária Especializada',
      form: 'Solução oral palatável',
      concentrationValue: 5.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco conta-gotas ou dosador oral de 30 mL a 60 mL',
      route: 'Oral (VO)',
      channel: 'compounded',
    },
  ],

  
  attentionSubtitle:
    'Retenção urinária por bloqueio muscarínico, proibição absoluta na FIC aguda, toxicidade por superdose reversível por bicarbonato e controle especial C1.',

  attentionData: {
    precautions: [
      {
        condition: 'Bexiga Obstruída, Atonia Vesical Mecânica ou Risco de Retenção Urinária',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O potente antagonismo muscarínico colinérgico periférico da amitriptilina relaxa a musculatura lisa do detrusor vesical e eleva o tônus de resistência uretral. Em animais com estenose, urolitíase, plugues uretrais ou bexiga neurogênica hipocontrátil, o fármaco precipita retenção urinária aguda, sobredistensão vesical dolorosa, hidronefrose secundária e risco iminente de rotura de bexiga.',
        clinicalAction:
          'Contraindicação formal absoluta. Palpar a bexiga previamente à introdução e certificar-se da total patência uretral. Suspender de imediato se houver disúria improdutiva ou distensão abdominal.',
      },
      {
        condition: 'Crise Aguda de Cistite Idiopática Felina (FIC)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Ensaios clínicos randomizados duplo-cegos controlados por placebo (Kruger et al. 2003; Kraijer et al. 2003) provaram que um curso curto de 7 dias de amitriptilina na fase aguda não acelera a resolução da hematúria ou disúria e se associa a recorrência mais precoce dos sinais em 12 meses, além de provocar retenção vesical.',
        clinicalAction:
          'Não utilizar na crise aguda de FIC. Na emergência felina, priorizar analgesia multimodal com opioides (buprenorfina), antiespasmódicos, desobstrução suave quando necessária e enriquecimento ambiental (MEMO).',
      },
      {
        condition: 'Associação Concomitante com Inibidores da MAO (Selegilina, Amitraz) e ISRSs',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A inibição simultânea da MAO e da recaptação neuronal de serotonina deflagra acúmulo descontrolado de 5-HT na fenda sináptica central e periférica, precipitando a Síndrome Serotoninérgica letal caracterizada por hipertermia grave, mioclonias, rigidez muscular, taquicardia, convulsões e colapso circulatório.',
        clinicalAction:
          'Contraindicação absoluta. Respeitar um período de wash-out mínimo de 14 dias após a descontinuação de selegilina antes de iniciar amitriptilina, e de pelo menos 5 a 6 semanas após suspensão de fluoxetina.',
      },
      {
        condition: 'Cardiopatias Preexistentes, Arritmias Ventriculares e Bloqueios Cardíacos',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A amitriptilina exerce efeito quinidina-like miocárdico dose-dependente por bloqueio dos canais rápidos de sódio voltagem-dependentes (Nav1.5), lentificando a velocidade de condução intraventricular, alargando o complexo QRS e predispondo a arritmias ventriculares graves, bloqueios atrioventriculares e morte súbita.',
        clinicalAction:
          'Contraindicada em cães e gatos com insuficiência cardíaca congestiva descompensada, bloqueios de ramo, arritmias ventriculares ou histórico de síncope cardiogênica.',
      },
      {
        condition: 'Histórico de Epilepsia e Convulsões Idiopáticas',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Antidepressivos tricíclicos diminuem de forma comprovada o limiar convulsivo cortical, facilitando a propagação de descargas epileptiformes paroxísticas em pacientes neurológicos predispostos.',
        clinicalAction:
          'Utilizar com extrema precaução em animais epilépticos sob terapia anticonvulsivante estável; evitar em pacientes refratários ou com histórico recente de crises em salva.',
      },
      {
        condition: 'Aplicação Transdérmica em Gel PLO Auricular em Felinos',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Estudo farmacocinético cruzado felino (Mealey et al. 2004) comprovou que a amitriptilina veiculada em gel de lecitina de organogel plurônico (gel PLO) aplicado na pina auricular apresenta absorção transdérmica errática e níveis séricos indetectáveis ou terapeuticamente nulos.',
        clinicalAction:
          'Não prescrever formulações transdérmicas auriculares de amitriptilina para gatos. Utilizar exclusivamente a via oral com cápsulas manipuladas de doses adequadas.',
      },
      {
        condition: 'Descontinuação Abrupta após Tratamento Prolongado',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A supressão súbita da inibição monoaminérgica crônica precipita síndrome de abstinência/descontinuação com hiperestesia, insônia, anorexia, vômitos, tremores e rebote comportamental ansioso exacerbado.',
        clinicalAction:
          'Nunca interromper bruscamente terapias com duração superior a 4 semanas. Realizar desmame gradual reduzindo a dose em 25% a cada 1 a 2 semanas ao longo de um período de 3 a 4 semanas.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Sedação Profunda, Sonolência e Letargia Inicial',
        frequency: 'common',
        mechanism: 'Bloqueio competitivo de alta afinidade sobre os receptores histaminérgicos centrais H1 e alfa-1 adrenérgicos.',
        clinicalManagement:
          'Muito comum nas primeiras 1 a 2 semanas. Iniciar a dose no limite inferior e administrar preferencialmente à noite antes do repouso; o efeito sedativo tende a atenuar-se gradualmente com a adaptação dos receptores.',
      },
      {
        effect: 'Manifestações Anticolinérgicas (Xerostomia, Midríase, Constipação)',
        frequency: 'common',
        mechanism: 'Antagonismo competitivo não seletivo sobre os receptores muscarínicos colinérgicos periféricos (M1, M2 e M3).',
        clinicalManagement:
          'Garantir acesso irrestrito a água limpa e fresca. Em animais propensos a fecaloma ou constipação crônica, associar fibras dietéticas solúveis ou laxantes emolientes.',
      },
      {
        effect: 'Ganho de Peso Corporal e Polifagia',
        frequency: 'common',
        mechanism: 'Bloqueio de receptores serotoninérgicos 5-HT2C e histaminérgicos H1 no hipotálamo ventromedial, estimulando o centro do apetite e reduzindo o gasto calórico basal.',
        clinicalManagement:
          'Acompanhar a evolução ponderal e o escore de condição corporal a cada 30 a 60 dias. Ajustar a densidade calórica da dieta prescrita quando necessário.',
      },
      {
        effect: 'Piora do Cuidado com a Pelagem (Unkept Coat) em Felinos',
        frequency: 'common',
        mechanism: 'Sedação central prolongada e alteração da motivação comportamental com diminuição do comportamento inato de autolimpeza (grooming).',
        clinicalManagement:
          'Relatado em até 89% dos gatos tratados com 10 mg/gato no estudo de Chew et al. (1998). Orientar escovação diária assistida pelo tutor e reduzir a dose se houver negligência higiênica excessiva.',
      },
      {
        effect: 'Ptialismo e Sialorreia Intensa por Deglutição Incompleta de Cápsula',
        frequency: 'common',
        mechanism: 'Estimulação gustativa reflexa amarga e queimação química na mucosa bucal em contato com o princípio ativo desprotegido.',
        clinicalManagement:
          'O cloridrato de amitriptilina possui palatabilidade extremamente amarga e desagradável. Jamais triturar comprimidos ou abrir cápsulas; administrar em invólucros íntegros, palatabilizantes veterinários ou em solução oral saborizada devidamente tamponada.',
      },
      {
        effect: 'Retenção Urinária e Elevação do Volume Residual Pós-Miccional',
        frequency: 'uncommon',
        mechanism: 'Inibição da contratilidade do músculo detrusor mediada pelo bloqueio muscarínico M3 vesical.',
        clinicalManagement:
          'Suspender a medicação imediatamente. Esvaziar a bexiga por sondagem uretral asséptica aliviadora e monitorar recuperação do tônus vesical.',
      },
      {
        effect: 'Cardiotoxicidade Grave em Superdosagem (Alargamento de QRS e Taquicardia Ventricular)',
        frequency: 'overdose',
        mechanism: 'Bloqueio dos canais rápidos de sódio Nav1.5 com prolongamento do potencial de ação miocárdico e bloqueio alfa-adrenérgico periférico com choque hipotensivo.',
        clinicalManagement:
          'Emergência médica absoluta. Realizar lavagem gástrica se ingestão recente e administrar carvão ativado. Instalar monitorização eletrocardiográfica contínua. Administrar Bicarbonato de Sódio a 8,4% na dose de 1 a 2 mEq/kg IV lento para reverter a cardiotoxicidade por alcalinização plasmática e carga de sódio.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Via preferencial e exclusiva para cães e gatos. Administrar preferencialmente à noite, junto com uma pequena fração de alimento ou refeição para amortecer o refluxo gástrico, reduzir náuseas e elevar a biodisponibilidade sistêmica (Norkus et al. 2015).',
        nursingCare:
          'Garantir a deglutição imediata da cápsula ou comprimido com um pequeno bolo úmido de comida ou seringa com 2 a 3 mL de água para evitar esofagite por retenção na mucosa esofágica.',
        limitations:
          'Biodisponibilidade oral reduzida (~6% em cães) decorrente de metabolismo pré-sistêmico de primeira passagem intestinal e hepática. Sabor amargo extremo se violada a cápsula.',
      },
      {
        route: 'Transdérmica Auricular (Gel PLO)',
        technique:
          'Desaconselhada formalmente pela literatura científica veterinária.',
        nursingCare:
          'Orientar os tutores de que fórmulas transdérmicas auriculares de amitriptilina não atingem concentrações terapêuticas comprovadas em felinos.',
        limitations:
          'Biodisponibilidade sérica praticamente nula e imprevisível em gatos (Mealey et al. 2004).',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Antidepressivo Tricíclico (Derivado Dibenzociclo-heptadieno / Amina Terciária)',
      chemicalClassDescription:
        'Molécula tricíclica sintética lipofílica de fórmula molecular C20H23N (massa molecular 277,40 g/mol, sal cloridrato 313,86 g/mol), caracterizada por um anel central de sete membros fundido a dois anéis benzênicos com cadeia lateral propil-dimetilamina.',
      therapeuticClass: 'Antidepressivo Tricíclico, Modulador de Vias Inibitórias Descendentes da Dor e Ansiolítico Central',
      therapeuticClassDescription:
        'Inibidor não seletivo da recaptação de serotonina e noradrenalina que reforça a analgesia espinhal descendente e modula estados de ansiedade, com efeitos colaterais decorrentes do bloqueio histaminérgico H1 e muscarínico colinérgico.',
      atcCode: 'N06AA09',
      receptorTargets: [
        'Transportador de Serotonina (SERT)',
        'Transportador de Noradrenalina (NET)',
        'Receptores Muscarínicos de Acetilcolina (M1, M2, M3, M4, M5)',
        'Receptores Histaminérgicos H1',
        'Receptores Adrenérgicos Alfa-1 e Alfa-2',
        'Canais Rápidos de Sódio Miocárdicos Voltagem-Dependentes (Nav1.5)',
      ],
      receptorsAndSites: [
        {
          name: 'Transportador de Serotonina (SERT)',
          type: 'Proteína carreadora de membrana sináptica',
          action: 'Bloqueio da recaptação neuronal de 5-HT com aumento da concentração sináptica',
          clinicalEffect:
            'Modulação de circuitos límbicos de ansiedade e potencialização de vias inibitórias da dor no corno dorsal medular.',
        },
        {
          name: 'Transportador de Noradrenalina (NET)',
          type: 'Proteína carreadora de membrana sináptica',
          action: 'Inibição da recaptação de noradrenalina no parênquima cerebral e medular',
          clinicalEffect:
            'Estímulo alfa-2 adrenérgico descendente inibitório da nocicepção e aumento do alerta cortical crônico.',
        },
        {
          name: 'Receptores Histaminérgicos H1',
          type: 'Receptor acoplado à proteína Gq',
          action: 'Antagonismo competitivo com supressão da neurotransmissão histaminérgica ativadora',
          clinicalEffect:
            'Potente efeito sedativo e ansiolítico inicial, alívio de prurido reflexo e estímulo central de apetite.',
        },
        {
          name: 'Receptores Muscarínicos M3 (Detrusor e Glândulas)',
          type: 'Receptor acoplado à proteína Gq',
          action: 'Antagonismo muscarínico colinérgico periférico',
          clinicalEffect:
            'Relaxamento do músculo detrusor vesical, redução de espasmos miccionais, xerostomia e retenção urinária em sobredoses.',
        },
        {
          name: 'Canais de Sódio Miocárdicos (Nav1.5)',
          type: 'Canal iônico voltagem-dependente cardíaco',
          action: 'Bloqueio de condutância quinidina-like em altas concentrações',
          clinicalEffect:
            'Lentificação da condução ventricular intracardíaca, alargamento de QRS e risco de taquiarritmias em superdosagens.',
        },
      ],
      detailedTargets: [
        {
          target: 'Vias Serotoninérgicas e Noradrenérgicas Medulares',
          action: 'Inibição concomitante de recaptação monoaminérgica',
          clinicalSignificance:
            'Ação analgésica sinérgica contra dor crônica neuropática, hiperestesia e sensibilização central.',
        },
        {
          target: 'Receptores Alfa-1 Adrenérgicos Vasculares',
          action: 'Bloqueio antagonista periférico',
          clinicalSignificance:
            'Vasodilatação moderada e hipotensão postural inicial, especialmente em felinos hipovolêmicos.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receita de Controle Especial em 2 Vias (Lista C1 da Portaria SVS/MS nº 344/1998)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 — Lista C1 (Substâncias Sujeitas a Controle Especial)',
      retentionRequired: true,
      guidelines:
        'A amitriptilina é uma substância controlada pela Portaria SVS/MS nº 344/1998 (Lista C1). Sua prescrição médica veterinária exige obrigatoriamente Receita de Controle Especial em 2 vias brancas, contendo os dados completos do profissional prescritor (nome, CRMV, UF, endereço, assinatura e carimbo), do tutor (nome completo, CPF e endereço residencial) e identificação do paciente animal (nome, espécie, raça, sexo e peso corporal). A primeira via fica retida na farmácia humana ou de manipulação veterinária no ato da dispensação, e a segunda via é carimbada e devolvida ao tutor como comprovante. Validade nacional de 30 dias contados da data de emissão.',
    },

    speciesPeculiarities: [
      {
        species: 'cat',
        title: 'Sensibilidade ao Amargor, Ineficácia na FIC Aguda e Resposta Restrita à FIC Crônica Refratária',
        description:
          'Gatos possuem aversão profunda ao sabor amargo e cáustico do cloridrato de amitriptilina, reagindo com ptialismo copioso e aversão alimentar imediata se a cápsula for aberta ou o comprimido quebrado. Na cistite idiopática felina (FIC), ensaios clínicos randomizados duplo-cegos comprovaram que a amitriptilina é ineficaz para abreviar crises agudas e pode aumentar a frequência de recorrências. Seu uso em felinos restringe-se exclusivamente a casos de FIC crônica grave refratária ao manejo ambiental multimodal (MEMO), em dosagens de 0,5 a 1 mg/kg VO a cada 24 horas à noite (ou 2,5 a 5 mg/gato). O uso crônico frequentemente cursa com sonolência duradoura, perda do cuidado com os pelos (unkept coat) e ganho de peso.',
        clinicalImplications:
          'Prescrever sempre cápsulas manipuladas com invólucro gelatinoso intacto nas dosagens exatas de 2,5 mg ou 5 mg. Jamais utilizar em crise aguda de FIC ou em felinos com histórico de obstrução uretral ativa.',
      },
      {
        species: 'dog',
        title: 'Biodisponibilidade Oral Reduzida, Metabolismo Pré-Sistêmico e Benefício com Alimento',
        description:
          'Estudo de farmacocinética cruzada canina (Norkus et al. 2015) revelou que a amitriptilina apresenta biodisponibilidade oral absoluta de apenas ~6% em cães, resultante de extenso metabolismo de primeira passagem hepático mediado pelo citocromo P450, biotransformando-se no metabólito ativo nortriptilina (meia-vida de 6,2 horas). A administração junto com alimento melhora a absorção e atenua expressivamente a ocorrência de náuseas e vômitos. É empregada como adjuvante em dor neuropática (espondilose, lombossacralgia) e transtornos de ansiedade crônica sob doses de 1 a 2 mg/kg VO q12-24h (podendo atingir até 4 mg/kg em titulação especializada).',
        clinicalImplications:
          'Orientar o tutor a fornecer o medicamento sempre após pequena porção de ração úmida. Iniciar com 1 mg/kg q24h à noite para minimizar a sedação inicial e titular progressivamente a cada 2 a 3 semanas.',
      },
    ],

    curiositiesAndHistory: [
      'Desenvolvida e sintetizada pela farmacêutica Merck na década de 1950 durante a corrida dos antidepressivos tricíclicos derivados da clorpromazina, aprovada pela FDA em 1961.',
      'Sua estrutura química dibenzociclo-heptadieno possui uma cadeia lateral propilideno que confere alta lipofilicidade e facilidade ímpar de travessia da barreira hematoencefálica.',
      'O pioneiro ensaio prospectivo de Dennis Chew et al. em 1998 na Universidade do Estado de Ohio foi o primeiro a descrever o benefício do tratamento prolongado da cistite idiopática felina com amitriptilina, revolucionando a percepção da FIC como um distúrbio neuroendócrino sistêmico de estresse.',
      'Apesar do entusiasmo inicial com a cistite felina nos anos 1990, os ensaios clínicos randomizados duplo-cegos de Kruger (2003) e Kraijer (2003) desmistificaram seu uso empírico na emergência ao provarem a total ineficácia do fármaco nas crises agudas de 7 dias.',
      'A reversão da toxicidade cardíaca da amitriptilina pelo bicarbonato de sódio foi descoberta após a constatação de que a alcalinização do pH sanguíneo promove a dissociação da molécula de amitriptilina dos canais rápidos de sódio cardíacos, salvando inúmeras vidas em superdosagens acidentais.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Posologia prática orientativa de Amitriptilina por faixa de peso para cães e gatos. Devido ao sabor amargo e à necessidade de doses fracionadas seguras, a manipulação veterinária magistral em cápsulas de 2,5 mg, 5 mg, 10 mg e 25 mg é fortemente recomendada.',
    headers: [
      'Faixa de Peso / Paciente',
      'Indicação Clínica Típica',
      'Faixa de Dose (mg/dose)',
      'Apresentação Sugerida',
    ],
    rows: [
      {
        weight: 'Gatos 3 a 5 kg',
        totalDose: '2,5 mg a cada 24 horas à noite',
        col1: 'FIC crônica refratária / Ansiedade felina (0,5 a 0,8 mg/kg)',
        col2: 'Cápsula manipulada veterinária de 2,5 mg',
      },
      {
        weight: 'Gatos > 5 kg',
        totalDose: '5 mg a cada 24 horas à noite',
        col1: 'FIC crônica refratária / Overgrooming psicogênico (0,7 a 1,0 mg/kg)',
        col2: 'Cápsula manipulada veterinária de 5 mg',
      },
      {
        weight: 'Cães 5 kg (Mini)',
        totalDose: '5 mg a cada 12 a 24 horas',
        col1: 'Ansiedade canina / Dor neuropática inicial (1 mg/kg)',
        col2: 'Cápsula manipulada veterinária de 5 mg',
      },
      {
        weight: 'Cães 10 kg (Pequeno)',
        totalDose: '10 mg a cada 12 a 24 horas',
        col1: 'Ansiedade canina / Lombossacralgia inicial (1 mg/kg)',
        col2: 'Comprimido humano de 10 mg ou cápsula veterinária de 10 mg',
      },
      {
        weight: 'Cães 20 kg (Médio)',
        totalDose: '20 a 25 mg a cada 12 a 24 horas',
        col1: 'Ansiedade crônica / Dor crônica neuropática (1 a 1,25 mg/kg)',
        col2: 'Comprimido humano de 25 mg (Amytril / genérico) ou cápsula de 20 mg',
      },
      {
        weight: 'Cães 30 kg (Grande)',
        totalDose: '30 a 50 mg a cada 12 a 24 horas',
        col1: 'Dor neuropática severa / Transtorno compulsivo (1 a 1,6 mg/kg)',
        col2: 'Comprimido humano de 25 mg (1 a 2 comp) ou cápsula de 30 a 50 mg',
      },
      {
        weight: 'Cães 40 kg (Gigante)',
        totalDose: '40 a 75 mg a cada 12 a 24 horas',
        col1: 'Sensibilização central refratária / Ansiedade grave (1 a 1,8 mg/kg)',
        col2: 'Comprimido humano de 75 mg ou manipulação personalizada de 40 a 60 mg',
      },
    ],
  },

  samplePrescriptionText:
    'RECEITUÁRIO DE CONTROLE ESPECIAL (EM 2 VIAS)\n\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome Completo], Médico(a) Veterinário(a), CRMV-[UF] [Número]\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Animal], Espécie: Felina / Canina, Raça: [Raça], Peso: [0,0] kg\n\n' +
    'USO ORAL\n' +
    '1. Cloridrato de Amitriptilina [Dosagem prescrita: ex. 2,5 mg ou 10 mg] ---------------- 30 cápsulas\n' +
    '   (Manipulação veterinária em cápsulas gelatinosas íntegras)\n' +
    '   Posologia: Administrar 1 (uma) cápsula por via oral, a cada 24 horas, rigorosamente no período da noite, após pequena refeição, durante 30 (trinta) dias consecutivos.\n\n' +
    'ORIENTAÇÕES IMPORTANTES AO TUTOR:\n' +
    '- Jamais abrir ou quebrar as cápsulas, pois o medicamento tem gosto intensamente amargo e provoca salivação copiosa.\n' +
    '- Sonolência e lentidão são reações normais nas primeiras duas semanas de tratamento.\n' +
    '- Caso note que o animal não consegue urinar ou apresente a barriga distendida e dolorida, suspenda o medicamento e contate o veterinário imediatamente.\n' +
    '- Não interrompa o tratamento sem orientação profissional expressa.',

  clinicalStudiesCommented: [
    {
      title: 'Amitriptyline treatment for severe recurrent idiopathic cystitis in cats',
      authorsYear: 'Chew DJ, Buffington CA, Kendall MS, et al. (1998)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Estudo prospectivo clínico longitudinal aberto não controlado (12 meses de acompanhamento)',
      sampleSize: '15 gatos com cistite idiopática felina grave e recorrente',
      mainFindings: 'A administração contínua de 10 mg por gato VO a cada 24 horas à noite eliminou ou reduziu substancialmente os sinais clínicos em 11 dos 15 gatos (73%) aos 6 meses e em 9 de 15 gatos (60%) aos 12 meses. Contudo, 89% dos gatos desenvolveram sonolência inicial importante, piora do cuidado com a pelagem (unkept coat) por perda de autolimpeza e ganho de peso, além de microcálculos em 4 animais.',
      clinicalTakeaway: 'Comprova eficácia da terapia crônica prolongada exclusivamente em felinos com FIC grave e recorrente após falha estrita do enriquecimento ambiental multimodal (MEMO). Efeitos colaterais sedativos e dermatológicos frequentes.',
      referenceId: 'ref-chew-fic-1998',
    },
    {
      title: 'Randomized controlled trial of the efficacy of short-term amitriptyline administration for treatment of acute, nonobstructive, idiopathic lower urinary tract disease in cats',
      authorsYear: 'Kruger JM, Conway TS, Kaneene JB, et al. (2003)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e controlado por placebo (RCT Nível I)',
      sampleSize: '31 gatos com episódio agudo de doença do trato urinário inferior felino não obstrutiva',
      mainFindings: 'O tratamento de curto prazo com amitriptilina (5 mg/gato VO q24h durante 7 dias) não produziu benefício estatístico na duração ou intensidade da disúria, hematúria ou estrangúria em comparação ao placebo. No seguimento de 12 meses, os gatos tratados com amitriptilina apresentaram recidiva mais precoce e frequente dos sinais do que os gatos do grupo placebo.',
      clinicalTakeaway: 'Evidência definitiva de Nível I contra o uso de amitriptilina na crise aguda de FIC. Cursos curtos de 7 dias não trazem alívio clínico e podem precipitar recorrências mais precoces.',
      referenceId: 'ref-kruger-fic-2003',
    },
    {
      title: 'Negative outcome of 7-day amitriptyline administration in acute idiopathic cystitis in cats',
      authorsYear: 'Kraijer M, Fink-Gremmels J, Nickel RF. (2003)',
      journal: 'The Veterinary Quarterly',
      studyDesign: 'Ensaio clínico prospectivo randomizado duplo-cego (RCT Nível I)',
      sampleSize: '24 gatos com cistite idiopática aguda',
      mainFindings: 'A administração de amitriptilina por 7 dias durante o episódio agudo não acelerou a taxa de recuperação clínica nem reduziu os escores de desconforto em comparação ao manejo convencional de suporte.',
      clinicalTakeaway: 'Corrobora o ensaio de Kruger (2003), demonstrando que a amitriptilina não tem espaço como intervenção de resgate ou curto prazo na fase aguda da cistite felina.',
      referenceId: 'ref-kraijer-fic-2003',
    },
    {
      title: 'Systemic absorption of amitriptyline and buspirone after oral and transdermal administration to healthy cats',
      authorsYear: 'Mealey KL, Peck KE, Bennett BS, et al. (2004)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Estudo farmacocinético experimental cruzado prospectivo',
      sampleSize: '6 gatos hígidos com dosagem plasmática seriada por HPLC',
      mainFindings: 'Enquanto a via oral produziu concentrações plasmáticas consistentes, a administração tópica de amitriptilina em gel de lecitina de organogel plurônico (gel PLO) na pina auricular resultou em concentrações séricas indetectáveis ou terapeuticamente irrelevantes na vasta maioria das coletas temporais.',
      clinicalTakeaway: 'A via transdérmica em gel PLO é ineficaz para amitriptilina em gatos e não deve ser utilizada.',
      referenceId: 'ref-mealey-transdermal-2004',
    },
    {
      title: 'Pharmacokinetics of intravenous and oral amitriptyline and its active metabolite nortriptyline in Greyhound dogs',
      authorsYear: 'Norkus C, Rankin D, KuKanich B. (2015)',
      journal: 'Veterinary Anaesthesia and Analgesia (VAA)',
      studyDesign: 'Estudo farmacocinético cruzado experimental com cromatografia e espectrometria de massas',
      sampleSize: '6 cães Greyhounds com administrações IV e oral de 4 mg/kg',
      mainFindings: 'A biodisponibilidade oral absoluta canina foi de 6,4% devido ao expressivo metabolismo pré-sistêmico de primeira passagem. A meia-vida da amitriptilina foi de 4,33 horas e a do metabólito ativo nortriptilina foi de 6,2 horas. Em estudo adjacente, a administração com alimento elevou a exposição sistêmica e reduziu a ocorrência de êmese.',
      clinicalTakeaway: 'Fundamenta a necessidade de doses caninas em mg/kg relativamente mais altas que as humanas e respalda a administração junto com alimento.',
      referenceId: 'ref-norkus-pk-2015',
    },
    {
      title: 'Efficacy of amitriptyline as a pharmacological adjunct to behavioral modification in aggressive dogs',
      authorsYear: 'Virga V, Houpt KA, Scarlett JM. (2001)',
      journal: 'Journal of the American Animal Hospital Association (JAAHA)',
      studyDesign: 'Ensaio clínico prospectivo duplo-cego randomizado e cruzado',
      sampleSize: '18 cães com comportamentos agressivos caninos diagnosticados',
      mainFindings: 'A adição de amitriptilina à terapia de modificação comportamental não demonstrou benefício estatisticamente superior em relação à modificação comportamental associada a placebo no controle de agressão em cães.',
      clinicalTakeaway: 'Alerta que a amitriptilina isolada não soluciona problemas complexos de agressão canina, devendo a modificação comportamental e o enriquecimento ambiental ser os pilares de base.',
      referenceId: 'ref-virga-aggression-2001',
    },
  ],
  relatedDiseaseSlugs: [
    'cistite-idiopatica-felina',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
    'dermatite-atopica-canina',
  ],
};
