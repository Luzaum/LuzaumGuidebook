import { MedicationRecord } from '../../types/medication';

export const micofenolatoMofetilaMedicationRecord: MedicationRecord = {
  id: 'med-micofenolato-mofetila',
  slug: 'micofenolato-mofetila',
  title: 'Micofenolato de Mofetila (MMF)',
  activeIngredient: 'Micofenolato de mofetila (pró-fármaco éster 2-morfolinoetílico do ácido micofenólico / MPA)',
  isControlled: false,
  tradeNames: [
    'CellCept® 500 mg Comprimidos Revestidos (Roche — Referência Humana Extrabula; importação descontinuada no Brasil em fev/2026, disponível enquanto durarem os estoques)',
    'Micofenolato de Mofetila 500 mg Comprimidos Genéricos (EMS, Eurofarma, Accord, Cristália)',
    'CellCept IV® 500 mg Pó Liofilizado para Solução Injetável (Roche / Genéricos Hospitalares)',
    'Micofenolato de Mofetila Cápsulas Magistrais Veterinárias 50 mg, 100 mg, 150 mg e 250 mg (Formulação Personalizada)',
    'Micofenolato de Mofetila Suspensão Oral Manipulada 50 mg/mL ou 100 mg/mL (Veículo Oral Protetor Palatável)',
    'Myfortic® 180 mg e 360 mg Comprimidos Gastrorresistentes (Novartis — Micofenolato Sódico / EC-MPS; NÃO Intercambiável mg por mg com MMF em Pequenos Animais)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/mycophenolate%20mofetil/PNG',
  pharmacologicClass:
    'Imunossupressor antiproliferativo seletivo; pró-fármaco do ácido micofenólico (MPA); inibidor potente, não competitivo e reversível da inosina-monofosfato-desidrogenase (IMPDH tipo II), bloqueador seletivo da síntese de novo de purinas em linfócitos',
  species: ['dog', 'cat'],
  category: 'terapeutica-geral',
  tags: [
    'Micofenolato de Mofetila',
    'MMF',
    'Ácido Micofenólico',
    'MPA',
    'CellCept',
    'Myfortic',
    'Imunossupressor',
    'Inibidor da IMPDH',
    'Síntese de Purinas',
    'IMHA',
    'ITP',
    'MUE',
    'Glomerulopatia Imunomediada',
    'Pênfigo Foliáceo',
    'Miastenia Gravis',
    'ACVIM 2019',
    'ACVIM 2024',
    'Receita Simples',
    'Fármaco Perigoso NIOSH',
  ],

  mechanismOfAction:
    'O micofenolato de mofetila (MMF) é o éster 2-morfolinoetílico do ácido micofenólico (MPA), quimicamente sintetizado com fórmula molecular C23H31NO7 (massa molar 433,50 g/mol). Trata-se de um pró-fármaco desprovido de atividade imunológica direta, concebido para aperfeiçoar a solubilidade lipídica e a absorção oral em comparação ao ácido parental. Após a administração oral ou parenteral, o MMF sofre hidrólise pré-sistêmica e sistêmica ultrarrápida mediada por carboxilesterases teciduais no trato gastrointestinal, fígado e plasma, liberando a molécula ativa, o ácido micofenólico (MPA; C17H20O6, 320,34 g/mol). O MPA atua como um inibidor potente, reversível e não competitivo da enzima inosina-monofosfato-desidrogenase (IMPDH), a enzima limitante que catalisa a oxidação dependente de NAD+ da inosina monofosfato (IMP) em xantosina monofosfato (XMP), precursora obrigatória da guanosina monofosfato (GMP), guanosina difosfato (GDP) e guanosina trifosfato (GTP e dGTP). Existem duas isoformas principais da enzima: a IMPDH tipo I, expressa constitutivamente na maioria dos tecidos somáticos, e a IMPDH tipo II, cuja transcrição é seletivamente induzida e superexpressa em até 5 vezes em linfócitos B e T ativados em resposta a estímulos antigênicos. O MPA exibe uma potência inibitória aproximadamente 5 vezes superior contra a isoforma IMPDH-II. A seletividade imunológica do micofenolato reside no fato de que, ao contrário dos neutrófilos, macrófagos, eritrócitos e outros tecidos corporais que possuem vias acessórias eficientes de reaproveitamento de purinas (salvage pathways) através da enzima hipoxantina-guanina-fosforribosiltransferase (HGPRT) para regenerar nucleotídeos a partir de bases preexistentes, os linfócitos T e B proliferativos dependem quase que exclusivamente da síntese de novo de nucleotídeos de guanina para a duplicação do seu DNA e transcrição de RNA. O bloqueio da síntese de GMP e dGTP deprime os estoques celulares de guanosina, paralisando a progressão clonal dos linfócitos na fase S do ciclo celular de maneira predominantemente citostática e não citotóxica. Além de bloquear a expansão clonal celular, a depleção intracelular de GTP prejudica a glicosilação de glicoproteínas de superfície essenciais, reduzindo a expressão e a afinidade de moléculas de adesão leucocitária (como integrinas e selectinas), diminuindo o rolamento e o recrutamento de leucócitos para focos inflamatórios teciduais e reduzindo expressivamente a produção de autoanticorpos por plasmócitos derivados de clones B suprimidos. Farmacodinamicamente, a inibição ocorre a jusante da ativação inicial: a síntese e a secreção precoces de interleucina-1 (IL-1) e interleucina-2 (IL-2) pelos linfócitos ainda ocorrem, porém a célula fica metabolicamente incapacitada de traduzir esse estímulo em divisão mitótica.',

  plainLanguageSummary:
    'O micofenolato de mofetila é um imunossupressor antiproliferativo potente e seletivo empregado na medicina de pequenos animais como terapia de segunda linha ou agente poupador de glicocorticoides no controle de doenças imunomediadas graves em cães e gatos, atuando como um pró-fármaco que é rapidamente hidrolisado no organismo em sua molécula ativa, o ácido micofenólico. Seu mecanismo de ação diferencia-se de outros agentes por inibir de forma específica e reversível a enzima inosina-monofosfato-desidrogenase tipo dois, bloqueando a síntese de novo de nucleotídeos de guanina essenciais para a replicação do material genético dos linfócitos B e T ativados, os quais, ao contrário da maioria das outras células corporais que conseguem reaproveitar purinas preexistentes, dependem quase que exclusivamente dessa via de fabricação própria para proliferar e produzir autoanticorpos patológicos. Embora represente uma alternativa valiosa em afecções como meningoencefalomielite de etiologia desconhecida, glomerulopatias imunomediadas e casos selecionados de trombocitopenia imune ou pênfigo, seu emprego contemporâneo exige discernimento clínico apurado, uma vez que a evidência mais recente em anemia hemolítica imunomediada canina tornou-se mais cautelosa ao demonstrar ausência de benefício inequívoco frente a terapias padrão, ao mesmo tempo em que a toxicidade gastrointestinal com diarreia aguda ou hemorrágica e enterocolite constitui o principal efeito limitante da dose na espécie canina e felina, demandando monitoramento laboratorial hematológico periódico e cuidados rigorosos de biossegurança ocupacional durante a manipulação por tratar-se de uma substância com potencial teratogênico estabelecido.',

  pillars: [
    {
      title: 'Inibição Seletiva da IMPDH-II & Bloqueio Linfocitário de Purinas',
      icon: 'Shield',
      desc: 'Inibe com 5 vezes mais potência a isoforma II da IMPDH, depletando guanina e paralisando a proliferação clonal de linfócitos T e B dependentes da síntese de novo.',
    },
    {
      title: 'Pró-Fármaco MMF versus Ácido Micofenólico Ativo (MPA)',
      icon: 'Zap',
      desc: 'O MMF é um éster sem ação biológica direta rapidamente clivado em MPA por carboxilesterases; a eficácia e a toxicidade são estritamente ditadas pela exposição sistêmica ao MPA.',
    },
    {
      title: 'Variabilidade Farmacocinética & Recirculação Entero-Hepática',
      icon: 'RefreshCw',
      desc: 'O metabólito glucuronídeo (MPAG) é excretado na bile e desconjugado por bactérias intestinais, reciclando MPA livre; antibióticos ou ciclosporina alteram drasticamente sua exposição.',
    },
    {
      title: 'Toxicidade Gastrointestinal como Fator Dose-Limitante',
      icon: 'AlertTriangle',
      desc: 'A diarreia severa, por vezes hemorrágica, atinge cerca de 25% dos cães e dita o limite posológico clínico; doses excessivas aumentam a enterocolite antes de ampliarem a imunossupressão.',
    },
  ],

  quickSummaryHighlights: [
    'Imunossupressor antiproliferativo seletivo; inibe a IMPDH-II e a síntese de novo de guanina em linfócitos B e T ativados.',
    'Indicado como segundo imunossupressor / poupador de corticoides em MUE canina, glomerulopatias imunomediadas (IRIS), ITP e dermatopatias autoimunes.',
    'Na IMHA canina, evidência prospectiva de 2024 (Agnoli et al.) tornou o uso rotineiro cauteloso: não demonstrou benefício adicional e houve maior mortalidade comparada à ciclosporina.',
    'Posologia usual em cães: 8 a 12 mg/kg VO a cada 12 horas (frequentemente 10 mg/kg q12h); evitar escaladas agressivas (20 mg/kg) que geram enterocolite e diarreia profusa.',
    'Em gatos, metabolização ocorre por formação de MPA-glucosídeo (contornando a deficiência de glicuronidação), mas farmacocinética é imprevisível e tolerabilidade clínica limitada (10 mg/kg q12h).',
    'MMF NÃO é intercambiável mg por mg com Micofenolato Sódico (Myfortic®); em cães, o sal sódico gastrorresistente produziu mais diarreia e lesões intestinais graves.',
    'Correção de interação: a ciclosporina bloqueia o transportador biliar MRP2 e REDUZ a exposição ao MPA em 30 a 50% (bula CellCept), embora mantenham sinergismo imunossupressor aditivo.',
    'Medicamento perigoso (NIOSH 2024): teratogênico e embriotóxico comprovado. Não triturar nem abrir cápsulas; uso de luvas obrigatório e contraindicação absoluta na gestação.',
    'Classificação regulatória no Brasil: Receita Simples (não integra as listas especiais da Portaria 344/98).',
  ],

  clinicalWarningItems: [
    {
      label: 'Alerta de Biossegurança Ocupacional e Teratogenicidade Grave (Lista NIOSH 2024)',
      text: 'O micofenolato de mofetila é classificado oficialmente pela NIOSH (versão vigente 2024) como fármaco perigoso em ambientes de saúde (hazardous drug). Possui teratogenicidade e embriotoxicidade humanas e animais severas comprovadas, induzindo malformações congênitas graves (craniofaciais, cardíacas, diafragmáticas e de extremidades) e perda fetal precoce. É expressamente proibido abrir cápsulas, pulverizar ou quebrar comprimidos revestidos. O manuseio de formulações líquidas manipuladas ou comprimidos exige o uso de luvas de proteção de nitrila. Mulheres gestantes ou que estejam planejando engravidar não devem manipular o medicamento sob nenhuma hipótese.',
    },
    {
      label: 'Toxicidade Gastrointestinal Dose-Dependente e Dose-Limitante (Diarreia Hemorrágica e Enterocolite)',
      text: 'A toxicidade sobre o trato digestivo é o efeito adverso mais frequente e o principal determinante limitante da dose na rotina de pequenos animais. Estudos populacionais (Fukushima et al., 2021) documentam sinais gastrointestinais em 24,4% dos cães tratados, manifestando-se tipicamente após 7 a 14 dias na forma de diarreia profusa, fezes com muco e sangue fresco (hematoquezia), vômitos e anorexia decorrentes de apoptose epitelial e enterocolite. Caso surja diarreia hemorrágica ou apatia, o medicamento deve ser temporariamente suspenso e a dose subsequente reduzida em 25% a 50%. Aumentar a dose além de 15 mg/kg eleva drasticamente a morbidade gastrointestinal sem ganho imunossupressor proporcional.',
    },
    {
      label: 'Não Intercambialidade entre MMF e Micofenolato Sódico (Myfortic®) em Medicina Veterinária',
      text: 'O micofenolato de mofetila (MMF, CellCept®) e o micofenolato sódico gastrorresistente (EC-MPS, Myfortic®) NÃO são bioequivalentes nem intercambiáveis miligrama por miligrama em cães e gatos. Embora na medicina humana a formulação de micofenolato sódico tenha sido criada para mitigar náuseas gástricas, ensaios experimentais em cães Beagles evidenciaram que o micofenolato sódico provocou diarreia significativamente mais intensa, perda de peso severa, enterite e absorção farmacocinética errática quando comparado ao MMF. Não substituir apresentações sem orientação especializada estrita.',
    },
    {
      label: 'Evidência Cautelosa em Anemia Hemolítica Imunomediada (IMHA) Canina (Ensaio Clínico 2024)',
      text: 'Embora o Consenso ACVIM de 2019 tenha incluído o MMF (8 a 12 mg/kg VO q12h) entre as opções aceitáveis de segundo imunossupressor na IMHA, o ensaio clínico prospectivo randomizado mais recente de Agnoli et al. (JVIM, 2024) em 43 cães não encontrou superioridade da adição de MMF à metilprednisolona e registrou mortalidade significativamente superior no grupo MMF aos 60 e 365 dias em comparação à ciclosporina. O ConsultaVET recomenda cautela no emprego de rotina na IMHA, priorizando corticosteroides em monoterapia ou ciclosporina, e reservando o MMF para casos individualizados refratários.',
    },
    {
      label: 'Interação Crítica com Antibióticos e Microbiota Intestinal na Recirculação Entero-Hepática',
      text: 'O ácido micofenólico sofre extensa circulação entero-hepática através da desconjugação do metabólito biliar MPAG por beta-glucuronidases produzidas pela microbiota intestinal comensal, processo responsável por até 40% da sua exposição plasmática total (segundo pico). A introdução de antibióticos de amplo espectro (como amoxicilina com clavulanato, fluoroquinolonas ou metronidazol) erradica essas bactérias e pode reduzir abruptamente a exposição sistêmica ao MPA em até 30% a 50%, podendo provocar recaída subclínica da doença autoimune sem qualquer alteração na dose prescrita.',
    },
  ],

  indications: [
    'Terapia adjuvante de segunda linha e agente poupador de glicocorticoides na meningoencefalomielite de etiologia desconhecida (MUE / MUO) em cães.',
    'Tratamento imunossupressor de glomerulopatias imunomediadas e glomerulonefrites por imunocomplexos em cães (Consenso IRIS).',
    'Opção de segundo agente imunossupressor na trombocitopenia imunomediada (ITP) refratária ou corticosteroide-dependente em cães (Consenso ACVIM 2024).',
    'Tratamento de dermatopatias autoimunes caninas (pênfigo foliáceo, vasculites imunomediadas e lúpus eritematoso sistêmico).',
    'Terapia de resgate ou poupadora de glicocorticoides em anemia hemolítica imunomediada (IMHA) canina selecionada (sob estrita monitorização).',
    'Coadjuvante em miastenia gravis adquirida canina intolerante a glicocorticoides (sem substituir a piridostigmina).',
  ],

  contraindications: [
    'Hipersensibilidade conhecida ao micofenolato de mofetila, ácido micofenólico ou a qualquer componente da fórmula.',
    'Infecções bacterianas, fúngicas ou virais ativas graves não controladas (sepse, pneumonia fúngica, piotórax).',
    'Fêmeas gestantes ou lactantes (teratogenicidade documentada e malformações congênitas graves).',
    'Enteropatias inflamatórias graves ou colite hemorrágica ativa preexistente.',
  ],

  cautions: [
    'Insuficiência renal crônica grave (depuração diminuída do metabólito MPAG glucuronídeo).',
    'Mielossupressão preexistente (neutropenia < 2.000/uL, trombocitopenia < 50.000/uL): exige hemogramas seriados.',
    'Uso concomitante com antibióticos de amplo espectro (redução da recirculação entero-hepática e queda da exposição ao MPA).',
    'Risco ocupacional na manipulação (fármaco perigoso NIOSH): uso obrigatório de luvas, proibição de partir comprimidos.',
  ],

  adverseEffects: [
    'Toxicidade gastrointestinal dose-limitante (diarreia aguda profusa, enterite hemorrágica, êmese e anorexia).',
    'Mielossupressão (leucopenia, neutropenia e raramente trombocitopenia ou anemia arregenerativa).',
    'Infecções oportunistas secundárias (infecção do trato urinário, piodermites, pneumonias e demodicose generalizada).',
    'Letargia, perda de peso e desconforto abdominal.',
  ],

  quickIndications: [
    {
      condition: 'Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO) Canina',
      species: 'dog',
      doseSummary: '10 a 20 mg/kg VO a cada 12 horas (q12h), associada a glicocorticoide sistêmico em dose imunossupressora',
      route: 'Oral (VO) ou IV inicial lenta em 2 horas',
      duration: 'Uso continuado prolongado (meses a anos) com titulação individualizada',
      clinicalContext: 'Cães com encefalite inflamatória não infecciosa (GME, NME, NLE) confirmada por liquor e neuroimagem.',
    },
    {
      condition: 'Glomerulopatias Imunomediadas Caninas (Consenso Internacional IRIS)',
      species: 'dog',
      doseSummary: '10 mg/kg VO a cada 12 horas (q12h); isolado ou associado a prednisolona em titulação rápida',
      route: 'Oral (VO)',
      duration: 'Pelo menos 8 a 16 semanas para avaliação fidedigna de resposta da proteinúria (UPC)',
      clinicalContext: 'Cães com síndrome nefrótica ou glomerulonefrite por imunocomplexos comprovada ou altamente presumida.',
    },
    {
      condition: 'Trombocitopenia Imunomediada (ITP) Canina (Consenso ACVIM 2024)',
      species: 'dog',
      doseSummary: '7,0 a 10,0 mg/kg VO a cada 12 horas (q12h) como segundo imunossupressor',
      route: 'Oral (VO)',
      duration: 'Até estabilização da contagem plaquetária (> 100.000/µL) e desmame gradual do glicocorticoide',
      clinicalContext: 'Pacientes com resposta incompleta aos corticosteroides ou efeitos colaterais esteroidais severos.',
    },
    {
      condition: 'Dermatopatias Autoimunes e Pênfigo Foliáceo Canino',
      species: 'dog',
      doseSummary: '10 a 15 mg/kg VO a cada 12 horas (ou 7 a 13 mg/kg VO q8h segundo BSAVA 10ª ed.)',
      route: 'Oral (VO)',
      duration: 'Mínimo de 6 a 8 semanas até início de remissão clínica e cicatrização de crostas',
      clinicalContext: 'Agente poupador de corticoides para controle crônico de lesões pustulosas e crostosas.',
    },
    {
      condition: 'Anemia Hemolítica Imunomediada (IMHA) Canina (Consenso ACVIM 2019 / Agnoli 2024)',
      species: 'dog',
      doseSummary: '8,0 a 12,0 mg/kg VO a cada 12 horas (q12h) em associação à metilprednisolona/prednisolona',
      route: 'Oral (VO)',
      duration: 'Individualizada; reavaliar benefício aos 30 e 60 dias devido a dados de segurança conflitantes',
      clinicalContext: 'Uso selecionado de segundo imunossupressor quando há intolerância à ciclosporina.',
    },
    {
      condition: 'Doenças Imunomediadas Felinas Selecionadas (Evidência Clínica Limitada)',
      species: 'cat',
      doseSummary: '10 mg/kg VO a cada 12 horas (q12h) com alimento; monitorar estritamente apetite e vômitos',
      route: 'Oral (VO em formulação magistral individualizada)',
      duration: 'Individualizada sob vigilância de toxicidade digestiva',
      clinicalContext: 'Felinos com IMHA ou dermatopatias refratárias sem resposta a outros imunossupressores.',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-mmf-dog-mue',
      indication: 'Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO) Canina',
      clinicalContext:
        'Cães jovens a de meia-idade de raças pequenas ou médias com sinais neurológicos multifocais agudos a subagudos (meningoencefalite granulomatosa, necrotizante ou leucoencefalite) confirmados por celularidade inflamatória no LCR e ressonância magnética encefálica.',
      species: 'dog',
      dose: '10 a 20 mg/kg VO a cada 12 horas (iniciar tipicamente com 10 a 15 mg/kg q12h)',
      route: 'Oral (VO) ou IV lenta em infusão de 2 horas na fase de emergência em cães com disfagia',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Tratamento continuado por 6 a 12 meses; desmame gradual após remissão clínica e liquórica',
      mechanismOfAction:
        'Suprime a expansão clonal de linfócitos T autorreativos CD4+ e CD8+ que infiltram as meninges e o parênquima cerebral, reduzindo a expressão de moléculas de adesão endoteliais e atenuando a formação de granulomas perivasculares.',
      clinicalRationale:
        'Estudo retrospectivo de Song et al. (2020) em 86 cães com MUE tratados com MMF associado a prednisolona revelou taxa global de resposta clínica de 87,2% (66,3% de resposta completa) e mediana de sobrevida expressiva de 558 dias, consolidando o MMF como um dos imunossupressores mais amplamente prescritos em neuroimunologia veterinária.',
      monitoring: 'Exame neurológico seriado, hemograma quinzenal no primeiro mês e monitoramento de fezes/vômitos.',
      referenceIds: ['ref-song-2020', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Estudo de Coorte Retrospectivo Amplo em População Clínica Específica',
    },
    {
      id: 'ind-mmf-dog-glomerulopathy',
      indication: 'Glomerulopatias Imunomediadas e Glomerulonefrite por Imunocomplexos Canina',
      clinicalContext:
        'Cães com proteinúria renal grave e persistente (UPC > 2,0 com hipoalbuminemia), síndrome nefrótica ou confirmação histopatológica de deposição glomerular de imunocomplexos (GN membranosa, membranoproliferativa).',
      species: 'dog',
      dose: '10 mg/kg VO a cada 12 horas (q12h)',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Mínimo de 8 a 16 semanas antes de definir ineficácia; respondedores mantêm por 6 a 12 meses',
      mechanismOfAction:
        'Inibe a síntese de novo de purinas nos linfócitos B autorreativos, diminuindo a produção e a circulação sistêmica de autoanticorpos e a subsequente deposição subepitelial de imunocomplexos na membrana basal glomerular.',
      clinicalRationale:
        'O Consenso Internacional IRIS sobre Glomerulopatias Caninas recomenda o MMF como agente imunossupressor não esteroidal primordial, tanto em monoterapia (para evitar os efeitos hiperfiltrativos e proteinúricos deletérios dos corticoides) quanto em associação transitória com prednisona na glomerulopatia rapidamente progressiva.',
      monitoring: 'Razão proteína:creatinina urinária (UPC), albumina sérica, creatinina, SDMA e pressão arterial.',
      referenceIds: ['ref-iris-gn-consensus', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas em Nefrologia Veterinária (IRIS)',
    },
    {
      id: 'ind-mmf-dog-itp',
      indication: 'Trombocitopenia Imunomediada (ITP) Canina como Segundo Imunossupressor',
      clinicalContext:
        'Cães com plaquetometria crítica (< 20.000/µL) e hemorragias petequiais/mucosas que não alcançam remissão satisfatória após 7 a 14 dias de glicocorticoides ou apresentam recaídas precoces durante o desmame.',
      species: 'dog',
      dose: '7,0 a 10,0 mg/kg VO a cada 12 horas (q12h)',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Uso mantido até a estabilização plaquetária consolidada (> 100.000/µL) e desmame lento',
      mechanismOfAction:
        'Cessa a geração de anticorpos antiplaquetários da classe IgG produzidos por clones de linfócitos B ativados, diminuindo a opsonização e a fagocitose prematura de plaquetas pelos macrófagos esplênicos.',
      clinicalRationale:
        'O Consenso ACVIM 2024 classifica o MMF como uma opção razoável de segundo imunossupressor quando a monoterapia esteroidal é insuficiente, embora destaque que o nível de evidência permanece baixo. Yau & Bianco (2014) demonstraram remissão em 5 cães estáveis tratados exclusivamente com MMF, comprovando potencial clínico como monoterapia ou agente adjuvante.',
      monitoring: 'Contagem automatizada e manual de plaquetas em lâmina, hematócrito e pesquisa de melena.',
      referenceIds: ['ref-acvim-itp-2024', 'ref-yau-2014', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Diretriz de Consenso ACVIM 2024 (Recomendação Fraca, Evidência Baixa)',
    },
    {
      id: 'ind-mmf-dog-dermatopathy',
      indication: 'Dermatopatias Autoimunes e Pênfigo Foliáceo Canino',
      clinicalContext:
        'Cães com pênfigo foliáceo, vasculite cutânea imunomediada ou lúpus eritematoso discóide que sofrem efeitos colaterais inaceitáveis de corticosteroides (iatrogenia cushingoide, hepatomegalia, calcinose).',
      species: 'dog',
      dose: '10 a 15 mg/kg VO a cada 12 horas (ou 7 a 13 mg/kg VO q8h segundo protocolo BSAVA)',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (ou a cada 8 horas)',
      duration: 'Mínimo de 6 a 8 semanas para remissão clínica (média de 5,7 semanas descrita por Ackermann)',
      mechanismOfAction:
        'Inibe a síntese de autoanticorpos antidesmogleína-1 dirigidos contra as junções intercelulares dos queratinócitos da epiderme, prevenindo a acantólise e a formação de pústulas subcórneas.',
      clinicalRationale:
        'Ackermann et al. (2017) demonstraram resposta favorável em 10 de 14 cães com doenças dermatológicas autoimunes tratados com dose média de 14,7 mg/kg q12h associada a corticosteroides, alcançando remissão em média aos 40 dias e permitindo redução expressiva da dose do glicocorticoide.',
      monitoring: 'Citologia de crostas/pústulas epidérmicas, tolerabilidade gastrointestinal e hemograma mensal.',
      referenceIds: ['ref-ackermann-2017', 'ref-bsava-10', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2b — Estudo Clínico Retrospectivo em População Dermatológica Canina',
    },
    {
      id: 'ind-mmf-dog-imha',
      indication: 'Anemia Hemolítica Imunomediada (IMHA) Canina — Segundo Agente sob Monitoramento',
      clinicalContext:
        'Cães com anemia regenerativa grave mediada por autoanticorpos antieritrocitários, aglutinação em salina positiva ou esferocitose que não respondem à prednisona ou apresentam intolerância à ciclosporina.',
      species: 'dog',
      dose: '8,0 a 12,0 mg/kg VO a cada 12 horas (q12h)',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Reavaliação crítica nos primeiros 30 a 60 dias devido a evidências conflitantes de mortalidade',
      mechanismOfAction:
        'Reduz a proliferação clonal de células B produtoras de hemolisinas e aglutininas, diminuindo a destruição extravascular no baço e intravascular mediada por complemento.',
      clinicalRationale:
        'Historicamente sugerido pelo Consenso ACVIM 2019, seu emprego tornou-se objeto de cautela em 2024 após o ensaio prospectivo randomizado de Agnoli et al. evidenciar ausência de ganho na resposta hematológica e maior mortalidade no grupo MMF comparado à ciclosporina. O uso deve ser ponderado individualmente.',
      monitoring: 'Hematócrito seriado, esferócitos, aglutinação persistente, bilirrubinas e tolerabilidade entérica.',
      referenceIds: ['ref-acvim-imha-2019', 'ref-agnoli-2024', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1b — Ensaio Prospectivo Randomizado com Dados Conflitantes de Segurança (Agnoli 2024)',
    },
    {
      id: 'ind-mmf-cat-immuno',
      indication: 'Doenças Imunomediadas Felinas Selecionadas (IMHA, Dermatopatias Refratárias)',
      clinicalContext:
        'Gatos com afecções autoimunes graves refratários a glicocorticoides ou com intolerância hepática/pancreática a outros agentes imunossupressores.',
      species: 'cat',
      dose: '10,0 mg/kg VO a cada 12 horas (administrar rigorosamente com alimento)',
      route: 'Oral (VO em formulação magistral individualizada)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Individualizada; suspender se houver hiporexia persistente',
      mechanismOfAction:
        'Inibe a IMPDH e a síntese de purinas nos linfócitos felinos ativados após conversão metabólica em MPA por glicosidação.',
      clinicalRationale:
        'Estudos de Slovak et al. (2018, 2019) comprovaram que felinos convertem eficientemente o MMF em MPA ativo através da formação de MPA-glucosídeo, superando a deficiência da via de glicuronidação. Contudo, a incidência de distúrbios digestivos é elevada e a evidência clínica terapêutica permanece restrita a séries pequenas.',
      monitoring: 'Consumo calórico diário, peso corporal, fezes, hemograma e bioquímica hepática quinzenais.',
      referenceIds: ['ref-slovak-2019', 'ref-slovak-2018', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Estudos Laboratoriais Farmacocinéticos e Farmacodinâmicos na Espécie Felina',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'O micofenolato de mofetila exibe absorção gastrointestinal célere e abrangente em cães e gatos. Por ser um pró-fármaco, o MMF intacto atinge concentrações plasmáticas muito efêmeras, sendo hidrolisado quase instantaneamente durante a absorção mucosa e na primeira passagem hepática por carboxilesterases teciduais no metabólito farmacologicamente ativo, o ácido micofenólico (MPA). Em cães adultos hígidos, a biodisponibilidade oral estimada oscila entre 54% e 87% dependendo da dose e do regime concomitante. No estudo farmacocinético de Grobman et al. (2017) em Dachshunds juvenis com dose de 13 mg/kg VO, o tempo para atingir a concentração plasmática máxima (Tmax) foi de apenas 0,33 ± 0,18 horas (~20 minutos) e a concentração de pico (Cmax) média foi de 9,33 ± 7,04 µg/mL com AUC de 12,84 ± 6,62 h·µg/mL, evidenciando expressiva variabilidade interindividual (coeficiente de variação de Cmax próximo a 77%). A presença de alimento no estômago reduz a velocidade de absorção e achata o pico plasmático (Cmax menor e Tmax mais tardio), sem contudo comprometer clinicamente a extensão total da biodisponibilidade (AUC total preservada); assim, para mitigar náuseas e vômitos, a administração junto a uma pequena porção de alimento é amplamente aceita na prática veterinária.',
    distribution:
      'O ácido micofenólico ativo exibe elevada taxa de ligação a proteínas plasmáticas, ligando-se predominantemente à albumina sérica (~97% em seres humanos). Em cães e gatos, o percentual de ligação proteica livre varia consideravelmente em função do estado de higidez. Pacientes nefropatas portadores de glomerulonefrite ou enteropatia perdedora de proteínas com hipoalbuminemia severa apresentam aumento dramático na fração livre (desligada) de MPA circulante, o que amplia o volume de distribuição tecidual e pode acelerar a depuração sistêmica, tornando a mensuração de concentrações totais de MPA isoladas pouco representativas da exposição biologicamente ativa. O MPA atravessa a barreira hematoencefálica em quantidade suficiente para modular processos neuroinflamatórios perivasculares em cães com meningoencefalomielite (MUE). É substrato do transportador carreador de efluxo P-glicoproteína (ABCB1 / MDR1) e da proteína de resistência a múltiplos fármacos 2 (ABCC2 / MRP2), fundamentais para sua distribuição celular e transporte biliar.',
    metabolism:
      'A biotransformação ocorre em duas etapas centrais: primeiro, a clivagem do éster MMF em MPA ativo por carboxilesterases intestinais, hepáticas e plasmáticas. Em seguida, o MPA ativo é extensivamente conjugado no fígado através de enzimas UDP-glicuronosiltransferases (UGT, primariamente UGT1A9 em humanos e caninos) no metabólito principal, o 7-O-glicuronídeo de ácido micofenólico (MPAG), que é farmacologicamente inerte. Uma rota metabólica secundária gera o acil-glicuronídeo (AcMPAG), que possui discreta reatividade e foi implicado na patogênese de lesões mucosas intestinais. O metabolismo dependente das isoenzimas do citocromo P450 microssomal é desprezível. Na espécie felina, historicamente assumia-se que a deficiência constitucional de glicuronidação impediria a metabolização segura do fármaco; contudo, pesquisas contemporâneas (Slovak et al., 2018 e 2019) elucidaram que gatos formam eficientemente o metabólito MPA-glucosídeo como uma via alternativa compensatória de bioconversão, convertendo o MMF em MPA ativo sem impedimentos enzimáticos.',
    elimination:
      'A depuração final do micofenolato depende de uma complexa recirculação entero-hepática (EHC). O metabólito inativo polar MPAG é ativamente excretado na bile para o lúmen intestinal pelo transportador canalicular ABCC2 (MRP2). No lúmen do intestino delgado e cólon, enzimas beta-glicuronidases produzidas pela microbiota comensal desconjugam o MPAG, regenerando o ácido micofenólico (MPA) livre lipofílico, que é prontamente reabsorvido pela mucosa para a circulação portal. Essa reciclagem entero-hepática gera um clássico segundo pico de concentração plasmática entre 6 e 12 horas após a administração da dose, respondendo por 10% a 40% da área sob a curva (AUC) total do fármaco. Os metabólitos finais são excretados predominantemente pela urina por filtração glomerular e secreção tubular ativa. Em cães adultos, a meia-vida plasmática média de eliminação terminal é de aproximadamente 2,9 horas; em Dachshunds juvenis avaliados por Grobman et al. (2017), a t1/2 foi de 5,50 ± 3,80 horas (esclarecendo o erro de digitação editorial presente em algumas fontes secundárias que registraram erroneamente 5,5 minutos). Em gatos, a t1/2 é estimada entre 5 e 9 horas.',
    cnsPenetration:
      'Penetração parênquima-meníngea satisfatória para suprimir a resposta autoimune mediada por linfócitos em cães com meningoencefalomielite de etiologia desconhecida (MUE / MUO).',
    plasmaBinding:
      'Ligação a proteínas plasmáticas extremamente alta (~97% em dados humanos à albumina). Hipoalbuminemia severa aumenta a fração livre ativa e a toxicidade tecidual.',
    halfLife:
      'Aproximadamente 2,9 horas em cães adultos; 5,50 ± 3,80 horas em Dachshunds juvenis (estudo Grobman 2017); aproximadamente 5 a 9 horas em felinos.',
  },

  attentionData: {
    precautions: [
      {
        condition: 'Gestação e Lactação',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O micofenolato é um potente teratógeno e embriotóxico que interfere diretamente na duplicação do DNA de células embrionárias em rápida divisão, provocando malformações congênitas múltiplas, anomalias craniofaciais e cardíacas e morte fetal intrauterina.',
        clinicalAction:
          'Contraindicação absoluta. Não administrar a fêmeas gestantes ou lactantes. Confirmar ausência de prenhez antes do início da terapia.',
      },
      {
        condition: 'Manipulação por Tutores ou Profissionais Gestantes (Risco Ocupacional NIOSH 2024)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Classificado como medicamento perigoso com risco comprovado de mutagenicidade e teratogenicidade por absorção dérmica ou inalação de partículas aerolisadas de comprimidos fracionados ou pós manipulados.',
        clinicalAction:
          'Mulheres grávidas ou tentando engravidar não devem ter contato com o fármaco. Usar luvas de nitrila ao manusear suspensões ou cápsulas; é vedado triturar comprimidos revestidos.',
      },
      {
        condition: 'Enteropatia Inflamatória Grave ou Diarreia Preexistente',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O ácido micofenólico induz apoptose em enterócitos e colonócitos em constante renovação, agravando a quebra da barreira mucosal e precipitando enterocolite hemorrágica e sepse de origem entérica.',
        clinicalAction:
          'Contraindicado em pacientes com gastroenterite aguda severa ativa. Em quadros leves, avaliar cautelosamente o risco antes de introduzir.',
      },
      {
        condition: 'Mielossupressão Preexistente ou Neutropenia Significativa',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Embora mais seletivo para linfócitos, em concentrações elevadas o MPA pode deprimir a linhagem granulocítica medular, levando a neutropenia grave e risco iminente de sepse bacteriana fulminante.',
        clinicalAction:
          'Não iniciar se neutrófilos segmentados estiverem abaixo de 3.000/µL. Suspender o tratamento se houver queda rápida da contagem celular no hemograma de controle.',
      },
      {
        condition: 'Infecções Bacterianas, Fúngicas ou Virais Sistêmicas Não Controladas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A potente imunossupressão de células T e B impede a contenção e depuração de patógenos invasivos, promovendo bacteremia, pneumonia por aspiração e sepse letal.',
        clinicalAction:
          'Tratar e controlar integralmente qualquer foco infeccioso ativo antes de instituir o micofenolato. Monitorar sinais ocultos de infecção (ex: urinálise seriada).',
      },
      {
        condition: 'Hipoalbuminemia Acentuada (Albumina sérica < 2,0 g/dL)',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Com 97% de ligação à albumina normal, a queda proteica duplica ou triplica a fração livre circulante de MPA ativo, aumentando exponencialmente o risco de toxicidade gastrointestinal grave.',
        clinicalAction:
          'Reduzir a dose inicial calculada em 30% a 50% em pacientes com glomerulonefrite ou proteinúria intensa com hipoalbuminemia até que os níveis proteicos se estabilizem.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Enterocolite Aguda e Diarreia Hemorrágica Profusa',
        frequency: 'common',
        mechanism:
          'Apoptose direta de enterócitos nas criptas intestinais, inflamação mucosal mediada por AcMPAG e perda da renovação celular epitelial no intestino delgado e cólon.',
        clinicalManagement:
          'Ocorre em cerca de 25% dos cães, tipicamente após 7 a 14 dias de uso. Suspender temporariamente o fármaco por 48 a 72 horas, instituir suporte hidroeletrolítico e protetores de mucosa. Se o quadro regredir, reintroduzir com 50% da dose anterior.',
      },
      {
        effect: 'Vômitos, Hiporexia, Náuseas e Perda Ponderal',
        frequency: 'common',
        mechanism:
          'Irritação direta da mucosa gástrica e efeito central em quimiorreceptores de náusea.',
        clinicalManagement:
          'Administrar rigorosamente acompanhado de pequena porção de alimento palatável. Se persistir, prescrever antieméticos (maropitant ou ondansetrona) ou titular a dose para baixo.',
      },
      {
        effect: 'Neutropenia e Mielossupressão Secundária',
        frequency: 'uncommon',
        mechanism:
          'Supressão citostática da hematopoiese na medula óssea por inibição basal de precursores mieloides.',
        clinicalManagement:
          'Frequência descrita de aproximadamente 4% em cães (Fukushima 2021). Monitorar hemograma quinzenal no primeiro mês. Suspender se neutrófilos caírem abaixo de 3.000/µL.',
      },
      {
        effect: 'Infecções Oportunistas (Cistite Bacteriana, Piodermite Profunda, Pneumonia, Sepse)',
        frequency: 'uncommon',
        mechanism:
          'Depressão da imunidade celular (linfócitos T) e humoral (linfócitos B), especialmente quando associado a glicocorticoides.',
        clinicalManagement:
          'Realizar urinálise e urocultura periódicas em cães imunossuprimidos; tratar precocemente com antimicrobianos direcionados por cultura e antibiograma.',
      },
      {
        effect: 'Hepatopatia Tóxica com Elevação de Enzimas Hepáticas (ALT/AST)',
        frequency: 'rare',
        mechanism:
          'Reação idiossincrática hepatocelular ou sobrecarga metabólica hepática de conjugação.',
        clinicalManagement:
          'Monitorar painel bioquímico hepático mensalmente. Reduzir a dose ou descontinuar caso a ALT se eleve em mais de 3 a 5 vezes o valor de referência basal.',
      },
      {
        effect: 'Pancreatite Aguda Necrosante',
        frequency: 'very_rare',
        mechanism:
          'Efeito idiossincrático associado à imunossupressão e disfunção microvascular pancreática relatado esporadicamente em cães e gatos.',
        clinicalManagement:
          'Suspender o fármaco imediatamente, hospitalizar o paciente em terapia intensiva com analgesia multimodal com opioides e suporte hemodinâmico intensivo.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Surgimento de Diarreia Aquosa sem Sangue ou Desconforto Digestivo Leve',
        recommendedAdjustment:
          'Reduzir a dose diária total em 25% a 30% ou dividir a dose em administrações menores a cada 8 a 12 horas acompanhadas de alimento.',
        physiologicalRationale:
          'A menor concentração luminal tópica instantânea de MPA minimiza a taxa de apoptose dos enterócitos e permite a recuperação da barreira epitelial.',
      },
      {
        clinicalCondition: 'Diarreia Hemorrágica Severa (Hematoquezia / Melena)',
        recommendedAdjustment:
          'Suspender o micofenolato de imediato por pelo menos 3 a 5 dias até a remissão completa do sangramento digestivo; reavaliar a necessidade de troca de fármaco.',
        physiologicalRationale:
          'O sangramento reflete necrose e desnudamento da mucosa entérica com alto risco iminente de translocação bacteriana e sepse gram-negativa.',
      },
      {
        clinicalCondition: 'Neutropenia (< 3.000 neutrófilos/µL) ou Leucopenia Progressiva',
        recommendedAdjustment:
          'Interromper o tratamento temporariamente até recuperação celular (> 4.000/µL); reiniciar com redução permanente de 30% a 50% da dose.',
        physiologicalRationale:
          'A proliferação de precursores mieloides foi comprometida; insistir na dose plena gera colapso imunitário e choque séptico.',
      },
      {
        clinicalCondition: 'Hipoalbuminemia Marcada (Albumina < 2,0 g/dL em Glomerulopatia ou IBD)',
        recommendedAdjustment:
          'Reduzir a dose inicial em 30% a 50% (ex: iniciar com 5 a 7 mg/kg q12h em vez de 10 mg/kg q12h) e titular lentamente pela proteinúria.',
        physiologicalRationale:
          'A fração livre não ligada de MPA ativo triplica no plasma hipoalbuminêmico, gerando superexposição tecidual com toxicidade acentuada.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Avançada (Estágios IRIS 3 e 4)',
        recommendedAdjustment:
          'Utilizar doses conservadoras (5 a 7,5 mg/kg q12h ou q24h) com monitoramento quinzenal de azotemia e tolerabilidade.',
        physiologicalRationale:
          'O clearance renal de MPAG cai acentuadamente; o metabólito inativo retido compete com o MPA pela albumina, aumentando o MPA livre biologicamente ativo.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Ciclosporina (Atopica® / Neoral®)',
        severity: 'major',
        clinicalEffect:
          'Redução da exposição plasmática ao MPA em cerca de 30% a 50%, embora apresentem sinergismo imunossupressor farmacodinâmico aditivo benéfico.',
        pharmacologicalMechanism:
          'A ciclosporina inibe competitivamente o transportador biliar ABCC2 (MRP2) nos hepatócitos, bloqueando a excreção de MPAG para a bile e interrompendo a recirculação entero-hepática do MPA (documentado oficialmente na bula do CellCept®).',
      },
      {
        drugOrClass: 'Azatioprina (Imuran®)',
        severity: 'contraindicated',
        clinicalEffect:
          'Mielossupressão profunda e potencialmente letal, aplasia medular e infecções oportunistas fulminantes sem acréscimo de eficácia comprovada.',
        pharmacologicalMechanism:
          'Sinergismo citostático aditivo sobre o metabolismo de purinas e a síntese de DNA celular nos precursores hematopoiéticos da medula óssea.',
      },
      {
        drugOrClass: 'Antibióticos de Amplo Espectro (Amoxicilina + Clavulanato, Quinolonas, Metronidazol)',
        severity: 'major',
        clinicalEffect:
          'Queda acentuada da concentração plasmática de MPA (redução de até 30% a 50% da AUC), com risco de falha terapêutica e recaída da doença autoimune.',
        pharmacologicalMechanism:
          'Erradicação da microbiota intestinal bacteriana comensal produtora de enzimas beta-glicuronidases, impedindo a desconjugação do MPAG em MPA ativo no cólon.',
      },
      {
        drugOrClass: 'Colestiramina',
        severity: 'major',
        clinicalEffect:
          'Redução massiva de aproximadamente 40% na AUC e exposição sistêmica ao ácido micofenólico.',
        pharmacologicalMechanism:
          'Resina de troca iônica que se liga irreversivelmente ao MPA e MPAG no lúmen gastrointestinal, sequestrando-os e impedindo sua reabsorção entero-hepática (atua como antídoto de intoxicação).',
      },
      {
        drugOrClass: 'Antiácidos com Alumínio e Magnésio, Sevelamer, Carbonato de Cálcio e Ferro Oral',
        severity: 'moderate',
        clinicalEffect:
          'Diminuição significativa da absorção oral de micofenolato com redução de até 35% na Cmax e AUC.',
        pharmacologicalMechanism:
          'Formação de quelatos insolúveis no trato gastrointestinal e alteração do pH gástrico que prejudica a dissolução do éster de mofetila. Espaçar administrações em pelo menos 2 a 3 horas.',
      },
      {
        drugOrClass: 'Inibidores de Bomba de Prótons (Omeprazol, Pantoprazol)',
        severity: 'moderate',
        clinicalEffect: 'Redução na taxa de dissolução e absorção do MMF, diminuindo o pico plasmático inicial.',
        pharmacologicalMechanism:
          'A elevação do pH gástrico reduz a solubilidade dependente de acidez do pró-fármaco no estômago.',
      },
      {
        drugOrClass: 'Vacinas Vivas Modificadas (Vanguard, Nobivac, Felocell etc.)',
        severity: 'contraindicated',
        clinicalEffect:
          'Risco severo de replicação viral vacinal descontrolada com manifestação da doença clínica e falha de imunização.',
        pharmacologicalMechanism:
          'A intensa imunossupressão linfocítica impede a montagem de resposta neutralizante adaptativa contra cepas atenuadas.',
      },
      {
        drugOrClass: 'Glicocorticoides (Prednisolona, Dexametasona)',
        severity: 'minor',
        clinicalEffect: 'Sinergismo terapêutico imunossupressor de primeira linha amplamente preconizado na clínica médica.',
        pharmacologicalMechanism:
          'Ação genômica anti-inflamatória e pró-apoptótica dos corticoides complementando a ação antiproliferativa seletiva do micofenolato.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Solução de Glicose a 5% em Água (SG 5%) — DILUENTE EXCLUSIVO PADRONIZADO',
      ],
      incompatibleFluids: [
        'Solução de Cloreto de Sódio a 0,9% (SF 0,9% — incompatibilidade físico-química descrita pelo fabricante)',
        'Solução de Ringer com Lactato (risco de precipitação de cristais)',
        'Outros medicamentos administrados na mesma via ou equipo',
      ],
      infusionRateGuidance:
        'A administração parenteral intravenosa deve ser realizada exclusivamente por infusão contínua lenta ao longo de pelo menos 2 HORAS (nunca em bolus rápido). Velocidade aproximada de infusão: 5 mg/kg por hora (0,083 mg/kg/minuto). Injeções rápidas desencadeiam irritação endotelial vascular, dor intensa, flebite química e hipotensão.',
      preparationNotes:
        'Reconstituir o frasco de CellCept IV 500 mg injetando 14 mL de SG 5% estéril. Agitar suavemente até dissolução límpida completa (gerando concentração de 35 mg/mL de MMF). Em seguida, aspirar o volume correspondente à dose prescrita e diluir em bolsa de SG 5% de 50 mL a 100 mL para obter concentração final de 6 mg/mL. Inspecionar visualmente contra partículas antes da infusão.',
      storageRequirements:
        'Armazenar comprimidos e cápsulas entre 15°C e 30°C, ao abrigo da luz solar e da umidade. As soluções injetáveis reconstituídas e diluídas em SG 5% devem ser utilizadas imediatamente ou mantidas entre 2°C e 8°C por no máximo 24 horas. Suspensões orais manipuladas permanecem estáveis por até 60 dias em temperatura ambiente em frascos âmbar bem fechados.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO) — Via Padrão de Manutenção',
        technique:
          'Administrar os comprimidos ou cápsulas magistrais preferencialmente inteiros com pequena porção de alimento para atenuar náuseas. Nunca abrir as cápsulas nem pulverizar os comprimidos.',
        nursingCare:
          'Usar luvas de nitrila durante a administração de formulações líquidas manipuladas ou cápsulas. Lavar rigorosamente as mãos após o procedimento. Registrar consistência fecal e apetite a cada administração.',
        limitations:
          'Os comprimidos humanos comerciais de 500 mg são excessivamente concentrados para animais de pequeno porte e gatos, exigindo obrigatoriamente manipulação veterinária precisa para evitar superdosagem.',
      },
      {
        route: 'Intravenosa (IV) — Infusão Hospitalar Lenta',
        technique:
          'Utilizar cateter venoso pérvio exclusivo. Infundir a solução diluída em SG 5% através de bomba de infusão volumétrica calibrada para transcorrer em no mínimo 120 minutos (2 horas).',
        nursingCare:
          'Inspecionar o trajeto venoso a cada 30 minutos para detecção precoce de flebite ou extravasamento tecidual. Caso ocorra extravasamento, interromper a infusão imediatamente.',
        limitations:
          'Estritamente contraindicada em injeção intravenosa rápida ou bolus. Apenas diluível em solução glicosada a 5%.',
      },
      {
        route: 'Subcutânea (SC) e Intramuscular (IM)',
        technique: 'Vias expressamente não recomendadas.',
        nursingCare: 'Não administrar por via intramuscular ou subcutânea.',
        limitations: 'Provoca dor extrema, necrose tecidual e possui farmacocinética completamente errática.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Éster Morfolinoetílico do Ácido Micofenólico (Derivado do Ácido Ftalano)',
      chemicalClassDescription:
        'Derivado do ácido 6-(4-hidroxi-6-metoxi-7-metil-3-oxo-1,3-di-hidroisobenzofuran-5-il)-4-metil-hex-4-enoico, com fórmula molecular C23H31NO7 e peso molecular de 433,50 g/mol, solúvel em etanol e metanol.',
      therapeuticClass: 'Imunossupressor Antiproliferativo Seletivo de Linfócitos',
      therapeuticClassDescription:
        'Inibidor específico, potente e reversível da síntese de novo de purinas mediada pela IMPDH tipo II, com ação citostática sobre linfócitos T e B ativados.',
      atcCode: 'L04AA06',
      receptorTargets: [
        'Enzima Inosina-5-Monofosfato Desidrogenase Tipo II (IMPDH-II)',
        'Enzima Inosina-5-Monofosfato Desidrogenase Tipo I (IMPDH-I)',
        'Transportador Canalicular Biliar ABCC2 (MRP2)',
        'Glicoproteína-P / ABCB1 (MDR1)',
      ],
      receptorsAndSites: [
        {
          name: 'Sítio Ativo da IMPDH Tipo II',
          type: 'Enzima citosólica homotetramérica limitante da via de novo de purinas',
          action: 'Inibição não competitiva e reversível da oxidação de IMP em XMP',
          clinicalEffect:
            'Depleção seletiva de estoques de dGTP e GTP com interrupção da proliferação clonal de linfócitos B e T na fase S do ciclo celular.',
        },
        {
          name: 'Moléculas de Adesão Endotelial e Leucocitária',
          type: 'Glicoproteínas transmembrana (selectinas, integrinas)',
          action: 'Supressão da glicosilação pós-traducional dependente de nucleotídeos de guanina',
          clinicalEffect:
            'Atenuação da migração e do recrutamento de células inflamatórias para tecidos alvos (pele, glomérulos e encéfalo).',
        },
      ],
      detailedTargets: [
        {
          target: 'IMPDH-II Linfocitária',
          action: 'Inibição potente reversível (afinidade 5 vezes superior à IMPDH-I)',
          clinicalSignificance:
            'Base da seletividade do micofenolato, poupando a maioria das células somáticas não linfocitárias.',
        },
        {
          target: 'Transportador Biliar MRP2 / ABCC2',
          action: 'Substrato carreador de efluxo biliar',
          clinicalSignificance:
            'Regula a recirculação entero-hepática; alvo bloqueado pela ciclosporina gerando redução de exposição ao MPA.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receita Simples (Uso Humano Extrabula ou Magistral Veterinário)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 (Não consta nas Listas de Entorpecentes ou Psicotrópicos)',
      retentionRequired: false,
      guidelines:
        'O micofenolato de mofetila é comercializado sob regime de "Venda sob Prescrição Médica", não estando sujeito ao controle especial por talonários específicos (não exige Receita de Controle Especial em 2 vias da Portaria 344/98 nem Notificação de Receita B/A). No âmbito veterinário, é prescrito em receituário simples impresso ou digital. Todavia, devido ao seu enquadramento na lista NIOSH (National Institute for Occupational Safety and Health, versão 2024) como medicamento perigoso com risco teratogênico grave comprovado, o médico-veterinário deve obrigatoriamente incluir na receita orientações explícitas de biossegurança ocupacional ao tutor: não fracionar comprimidos revestidos, manusear cápsulas e líquidos com luvas descartáveis de nitrila e proibir expressamente a manipulação por tutoras gestantes ou em idade fértil.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Sensibilidade Gastrointestinal Marcante, Recirculação Entero-Hepática e Variabilidade de Meia-Vida',
        description:
          'Em cães, o trato digestivo é o órgão-alvo primordial de toxicidade, ocorrendo enterocolite em até 24,4% dos pacientes tratados, com lesões mucosas decorrentes de apoptose epitelial e metabólitos tóxicos luminais. A meia-vida média em adultos é de cerca de 2,9 horas, mas varia amplamente (Grobman et al. 2017 demonstraram t1/2 de 5,50 ± 3,80 horas em Dachshunds juvenis, esclarecendo o erro de 5,5 minutos de fontes secundárias). A recirculação entero-hepática gera um segundo pico plasmático expressivo. Cães toleram muito mal o micofenolato sódico gastrorresistente (Myfortic®), apresentando diarreia mais intensa que com o MMF.',
        clinicalImplications:
          'Iniciar com doses conservadoras de 10 mg/kg q12h. Suspender imediatamente se houver diarreia hemorrágica para prevenir sepse entérica. Não substituir MMF por Myfortic em cães.',
      },
      {
        species: 'cat',
        title: 'Biotransformação por MPA-Glucosídeo, Tolerabilidade Frágil e Menor Volume de Evidência',
        description:
          'Historicamente desaconselhado em felinos por se acreditar que a deficiência constitucional de glicuronidação causaria toxicidade fatal, estudos contemporâneos (Slovak et al., 2018 e 2019) provaram que gatos convertem eficientemente o MMF em MPA ativo e utilizam uma via compensatória de conjugação com glicose formando MPA-glucosídeo. Contudo, gatos apresentam tolerabilidade gastrointestinal frágil: doses de 15 mg/kg q8h provocaram diarreia e hiporexia em 100% dos animais avaliados, enquanto a dose de 10 mg/kg q12h foi tolerada satisfatoriamente apenas por uma parcela dos gatos.',
        clinicalImplications:
          'O MMF é uma opção de resgate em felinos refratários, devendo ser prescrito em 10 mg/kg q12h administrado rigorosamente com alimento em cápsulas magistrais. Interromper se houver anorexia por mais de 48h.',
      },
    ],

    curiositiesAndHistory: [
      'O ácido micofenólico foi isolado e cristalizado em 1893 pelo médico italiano Bartolomeo Gosio a partir do fungo Penicillium stoloniferum, constituindo historicamente o primeiro metabólito com ação antibacteriana pura purificado na história da microbiologia, décadas antes da redescoberta da penicilina por Alexander Fleming.',
      'Suas propriedades imunossupressoras seletivas foram desvendadas nos anos 1970 e 1980 pela Syntex Corporation, levando ao desenvolvimento do pró-fármaco de mofetila para viabilizar absorção clínica, culminando na aprovação pela FDA em 1995 sob o nome comercial CellCept® para prevenir a rejeição em transplantes renais humanos.',
      'A impressionante seletividade de poupar neutrófilos e atacar preferencialmente linfócitos foi um mistério por anos, até que a identificação molecular das isoformas IMPDH-I (constitutiva) e IMPDH-II (induzida nos linfócitos) revelou o mecanismo chave da seletividade farmacodinâmica.',
      'Em fevereiro de 2026, a Roche comunicou formalmente aos órgãos de saúde e entidades médicas brasileiras a descontinuação definitiva da importação do medicamento de referência CellCept® no Brasil, abrindo caminho para o protagonismo de medicamentos genéricos nacionais e formulações magistrais veterinárias.',
      'Na medicina veterinária, o micofenolato ganhou notoriedade como uma das armas mais eficazes no controle da meningoencefalomielite inflamatória (MUE) e de glomerulonefrites imunomediadas refratárias.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Dose Usual de Referência: 10,0 mg/kg VO a cada 12 horas (q12h). Devido ao risco ocupacional de fármaco perigoso (NIOSH 2024), é PROIBIDO triturar ou pulverizar comprimidos revestidos de 500 mg. Para cães de pequeno/médio porte e felinos, utilizar obrigatoriamente formulações magistrais veterinárias (cápsulas personalizadas ou suspensão oral palatável manipulada de 50 mg/mL ou 100 mg/mL).',
    headers: [
      'Peso Corporal (kg)',
      'Dose 10 mg/kg (mg)',
      'Cápsula Magistral Indicada',
      'Volume Suspensão 100 mg/mL',
      'Comprimido Comercial 500 mg (CellCept® / Genérico)',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '20 mg',
        col1: 'Manipular cápsula de 20 mg',
        col2: '0,20 mL',
        col3: 'Impraticável (risco grave de superdosagem)',
      },
      {
        weight: '4 kg',
        totalDose: '40 mg',
        col1: 'Manipular cápsula de 40 mg',
        col2: '0,40 mL',
        col3: 'Impraticável (risco grave de superdosagem)',
      },
      {
        weight: '5 kg',
        totalDose: '50 mg',
        col1: 'Cápsula de 50 mg',
        col2: '0,50 mL',
        col3: 'Impraticável (não partilhar comprimido de 500 mg)',
      },
      {
        weight: '10 kg',
        totalDose: '100 mg',
        col1: 'Cápsula de 100 mg',
        col2: '1,00 mL',
        col3: 'Impraticável (fracionamento em 1/5 impreciso e perigoso)',
      },
      {
        weight: '15 kg',
        totalDose: '150 mg',
        col1: 'Cápsula de 150 mg',
        col2: '1,50 mL',
        col3: 'Impraticável (preferir cápsulas manipuladas)',
      },
      {
        weight: '20 kg',
        totalDose: '200 mg',
        col1: 'Cápsula de 200 mg',
        col2: '2,00 mL',
        col3: 'Apenas se comprimido de 250 mg disponível ou manipular',
      },
      {
        weight: '25 kg',
        totalDose: '250 mg',
        col1: 'Cápsula de 250 mg',
        col2: '2,50 mL',
        col3: '1/2 comprimido de 500 mg (apenas se houver vinco formal)',
      },
      {
        weight: '30 kg',
        totalDose: '300 mg',
        col1: 'Cápsula de 300 mg',
        col2: '3,00 mL',
        col3: 'Preferir formulação magistral exata de 300 mg',
      },
      {
        weight: '40 kg',
        totalDose: '400 mg',
        col1: 'Cápsula de 400 mg',
        col2: '4,00 mL',
        col3: 'Aproximação com manipulado de 400 mg',
      },
      {
        weight: '50 kg',
        totalDose: '500 mg',
        col1: 'Cápsula de 500 mg',
        col2: '5,00 mL',
        col3: '1 comprimido inteiro revestido de 500 mg',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador Volumétrico para Suspensão Oral Manipulada (100 mg/mL)',
      concentration: '100 mg por mL (formulação magistral veterinária protetora)',
      dropletRatio: '1 mL = 100 mg de micofenolato de mofetila',
      practicalRule:
        'Para a dose padrão de 10 mg/kg: administrar exatamente 0,1 mL por kg de peso corporal a cada 12 horas através de seringa dosadora oral graduada.',
      note: 'Nunca dosar em gotas caseiras livres. Usar luvas descartáveis durante o manuseio da seringa dosadora oral para prevenir contaminação ocupacional dérmica.',
    },
  },

  samplePrescriptionText: `RECEITA MÉDICA-VETERINÁRIA (RECEITA SIMPLES)

Paciente: Luke | Espécie: Canina | Raça: Pug | Idade: 4 anos | Peso: 10 kg
Tutor: Juliana Peixoto Costa | CPF: 987.654.321-99
Endereço: Alameda dos Ipês, 88 — Curitiba/PR

USO ORAL AMBULATORIAL (FORMULAÇÃO MAGISTRAL VETERINÁRIA)

1. Micofenolato de Mofetila (MMF) 100 mg ---------------------------- 60 cápsulas gelatinosas
   Princípio ativo: Micofenolato de mofetila 100 mg por cápsula
   Excipiente gastroprotetor inerte q.s.p. 1 cápsula
   Posologia: Administrar uma (1) cápsula por via oral a cada 12 horas (q12h), nos mesmos horários (ex.: às 08h00 e às 20h00), fornecida imediatamente junto ou logo após pequena porção de refeição úmida, durante 30 dias ininterruptos.

ORIENTAÇÕES CRÍTICAS DE SEGURANÇA E BIOSSEGURANÇA AO TUTOR:
1. Advertência de Medicamento Perigoso: O micofenolato é um imunossupressor potente com ação teratogênica comprovada. Mulheres gestantes, lactantes ou que estejam tentando engravidar são expressamente PROIBIDAS de manusear este medicamento.
2. Modo de Manuseio: Administrar a cápsula inteira com o auxílio de luvas descartáveis. NUNCA abrir, romper, mastigar ou dissolver o conteúdo das cápsulas. Lavar rigorosamente as mãos com água e sabão após a administração.
3. Efeitos Adversos Gastrointestinais: Diarreia com muco, fezes amolecidas e vômitos podem ocorrer nos primeiros 14 dias de uso. Caso o animal apresente diarreia líquida profusa ou fezes com sangue vivo (vermelho escuro ou aspecto de borra de café), suspender imediatamente o medicamento e contatar a clínica veterinária.
4. Risco de Infecções Oportunistas: Por modular a imunidade, relate prontamente sintomas de febre, tosse, apatia intensa, lesões de pele ou alterações na micção.
5. Armazenamento: Conservar o frasco bem fechado, em temperatura ambiente fresca (15°C a 30°C), protegido da luz solar e longe do alcance de crianças e de outros animais.

Retorno e Monitoramento: Retorno ambulatorial agendado para 14 dias para realização de hemograma completo e dosagem de enzimas hepáticas e albumina.

Curitiba, 28 de setembro de 2026.

___________________________________________________________
Dra. Camila Vasconcelos Rocha — Médica-Veterinária
CRMV-PR nº 18.940 | Telefone: (41) 99123-4567`,

  clinicalNotesRichText: `
<h3>1. Fisiologia Molecular: Síntese de Novo de Purinas e a Seletividade da IMPDH Tipo II</h3>
<p>Para compreender a singularidade farmacodinâmica do micofenolato de mofetila (MMF), é fundamental analisar as duas rotas biológicas pelas quais as células dos mamíferos obtêm nucleotídeos de purina (adenosina e guanosina) necessários para a síntese de DNA e RNA, transcrição gênica e transdução de sinal:</p>
<ol>
  <li><strong>Via de Reaproveitamento (Salvage Pathway):</strong> Utilizada amplamente pela vasta maioria das células somáticas do organismo (incluindo neutrófilos maduros, hemácias, miócitos e hepatócitos), na qual as purinas são recicladas a partir de produtos de degradação metabólica através da enzima hipoxantina-guanina-fosforribosiltransferase (HGPRT). Essa via não depende da inosina monofosfato desidrogenase.</li>
  <li><strong>Via de Novo (De Novo Pathway):</strong> Processo metabólico energeticamente exigente que sintetiza a guanosina a partir da fosforribosilpirofosfato (PRPP) e glutamina. A enzima inosina-5'-monofosfato-desidrogenase (IMPDH) catalisa a etapa limitante inicial que oxida a inosina monofosfato (IMP) em xantosina monofosfato (XMP), que por sua vez é aminada em guanosina monofosfato (GMP).</li>
</ol>
<p>Os linfócitos B e T ativados em resposta a estímulos antigênicos e autoimunes entram em uma fase mitótica explosiva na qual a demanda por purinas se multiplica em mais de 10 vezes. Diferentemente das demais linhagens teciduais, os linfócitos ativados <em>dependem desproporcionalmente da via de novo</em> para sustentar essa expansão clonal rápida. Ademais, a enzima IMPDH existe em duas isoformas moleculares homotetraméricas distintas: a IMPDH-I, expressa constitutivamente em baixos níveis em todos os tecidos somáticos, e a <strong>IMPDH-II</strong>, cuja expressão gênica é ativada seletivamente em linfócitos maduros durante o processo de ativação imunológica. O ácido micofenólico (MPA) ativo liga-se ao sítio alostérico adjacente ao domínio de ligação de NAD+, atuando como um inibidor reversível e não competitivo com uma afinidade e potência inibitória aproximadamente 5 vezes superior contra a isoforma IMPDH-II.</p>
<p>O esgotamento intracelular agudo de nucleotídeos de guanina (dGTP e GTP) resultante do bloqueio da IMPDH-II impede a polimerização da fita de DNA durante a fase S do ciclo celular, aprisionando os linfócitos B e T autorreativos em uma parada mitótica citostática limpa, sem deflagrar a lise celular inespecífica e necrótica associada a alquilantes clássicos. Como efeito secundário marcante, a depleção de GTP inibe as enzimas fucosiltransferases e manosiltransferases, deprimindo a glicosilação de glicoproteínas de superfície como as integrinas VLA-4 e selectinas, o que bloqueia o rolamento e a diapedese de monócitos e linfócitos para os tecidos inflamados (como a derme no pênfigo, as meninges na MUE e o glomérulo nas nefrites).</p>

<h3>2. Recirculação Entero-Hepática, Microbioma e a Correção da Interação com a Ciclosporina</h3>
<p>A farmacocinética do ácido micofenólico em pequenos animais é profundamente marcada pelo fenômeno de <strong>recirculação entero-hepática (EHC)</strong>. Após a absorção oral do pró-fármaco MMF e sua clivagem em MPA livre, o fármaco é glucuronizado no fígado pela UDP-glucuronosiltransferase na forma inerte 7-O-glucuronídeo de ácido micofenólico (MPAG). Esse metabólito polar é transportado ativamente através da membrana canalicular dos hepatócitos para a bile pelo carreador de efluxo <em>multidrug resistance-associated protein 2</em> (ABCC2 / MRP2).</p>
<p>Ao alcançar a luz do intestino delgado e do cólon através do fluxo biliar, o MPAG encontra a densa comunidade bacteriana do microbioma entérico. Bactérias anaeróbias comensais (como <em>Bacteroides</em> e <em>Clostridium</em> spp.) sintetizam e secretam a enzima <strong>beta-glucuronidase</strong>, que hidrolisa a ligação glicosídica do MPAG, liberando novamente o MPA ativo lipofílico na luz intestinal. Esse MPA regenerado é prontamente reabsorvido pela mucosa colônica para o sistema venoso portal, gerando um segundo pico plasmático nítido entre 6 e 12 horas após a ingestão da dose e contribuindo com até 10% a 40% da área sob a curva (AUC) total diária de exposição ao fármaco.</p>
<p>Esse mecanismo farmacocinético sustenta duas correções clínicas de suma importância para o ConsultaVET:</p>
<ol>
  <li><strong>Correção da Interação com a Ciclosporina:</strong> Certos materiais veterinários secundários (incluindo versões preliminares do VIN) mencionaram de forma equivocada que a ciclosporina aumentaria as concentrações de micofenolato. A bula oficial contemporânea do medicamento de referência CellCept® (Roche) e os estudos de farmacologia clínica humana e animal esclarecem o oposto: a ciclosporina inibe de forma potente o transportador biliar MRP2/ABCC2, impedindo a excreção canalicular de MPAG para a bile e bloqueando a recirculação entero-hepática. O resultado é uma <strong>redução de 30% a 50% na exposição sistêmica (AUC) ao MPA</strong> em esquemas contendo ciclosporina quando comparados a regimes isolados. No entanto, do ponto de vista farmacodinâmico, ciclosporina e MMF atuam em etapas distintas e somatórias da imunidade celular (a ciclosporina bloqueia a calcineurina e a síntese de IL-2, enquanto o MMF bloqueia a proliferação linfocítica downstream), produzindo potente imunossupressão aditiva que exige vigilância contra infecções secundárias a despeito da menor AUC de MPA.</li>
  <li><strong>Interação com Antimicrobianos de Amplo Espectro:</strong> A prescrição concomitante de antibióticos orais que erradicam os anaeróbios entéricos secretores de beta-glucuronidase (tais como amoxicilina com clavulanato, enrofloxacina ou metronidazol) destrói a desconjugação intraluminal de MPAG, abolindo o segundo pico de absorção e reduzindo a biodisponibilidade do MPA ativo em até metade. O paciente veterinário pode apresentar recaída aguda de uma doença autoimune controlada sem que tenha havido qualquer modificação na dose prescrita de micofenolato.</li>
</ol>

<h3>3. Não Intercambialidade: MMF versus Micofenolato Sódico (EC-MPS / Myfortic®)</h3>
<p>Uma armadilha posológica grave na rotina de pequenos animais é a tentativa de substituir o micofenolato de mofetila (MMF, 500 mg) pelo micofenolato sódico com revestimento entérico gastrorresistente (EC-MPS, Myfortic® 180 mg e 360 mg) sob a presunção de equivalência molar e menor agressão gástrica. Na medicina humana, o Myfortic® foi formulado especificamente com polímeros entéricos para dissolver apenas no pH neutro do duodeno e diminuir as náuseas dispépticas proximais.</p>
<p>Contudo, pesquisas fisiológicas comparativas em cães Beagles demonstraram resultados diametralmente opostos: a motilidade gastrointestinal e o perfil de trânsito canino diferem substancialmente do humano. Nos cães que receberam micofenolato sódico gastrorresistente, a liberação retardada do sal concentrou o fármaco de forma abrupta e maciça no íleo e no cólon, deflagrando <strong>taxas severamente mais altas de diarreia inflamatória, perda ponderal rápida, enterocolite e apoptose mucosal extensa</strong> em comparação aos que receberam o MMF convencional. Além disso, a absorção do micofenolato sódico em cães revelou-se extremamente errática e imprevisível. Por essas razões, o ConsultaVET contraindica a substituição automática entre essas apresentações em cães e gatos, mantendo o MMF como o fármaco de escolha consolidado.</p>

<h3>4. Análise Crítica das Evidências em IMHA e ITP: O Impacto do Ensaio Prospectivo de 2024</h3>
<p>O papel do MMF nas citopenias imunomediadas passou por uma significativa reavaliação crítica entre 2019 e 2026:</p>
<ul>
  <li><strong>Anemia Hemolítica Imunomediada (IMHA):</strong> O Consenso ACVIM de 2019 estabeleceu o MMF (8 a 12 mg/kg VO q12h) como uma opção de segundo imunossupressor recomendada para cães com fatores de mau prognóstico ou dependência esteroidal. Contudo, em 2024, Agnoli e colaboradores publicaram no <em>Journal of Veterinary Internal Medicine</em> o primeiro ensaio prospectivo randomizado comparando metilprednisolona isolada versus metilprednisolona associada à ciclosporina versus metilprednisolona associada ao MMF (~7,5 mg/kg q12h) em 43 cães com IMHA espontânea. O estudo concluiu que a adição de um segundo imunossupressor não proporcionou nenhuma superioridade estatística na velocidade de recuperação do hematócrito, dias de hospitalização ou taxa de recaída. Mais alarmante ainda, os animais do grupo MMF apresentaram mortalidade cumulativa significativamente superior em relação aos tratados com ciclosporina aos 60 dias (diferença de 42,8%, P = 0,009) e aos 365 dias (diferença de 50%, P = 0,003). Embora o tamanho amostral modesto impeça afirmar causalidade direta, esses achados impuseram uma postura de grande cautela no uso indiscriminado do MMF em IMHA canina, reforçando que os corticosteroides permanecem como a base absoluta de tratamento.</li>
  <li><strong>Trombocitopenia Imunomediada (ITP):</strong> No recente Consenso ACVIM de 2024 sobre ITP em cães e gatos, o micofenolato figura entre os agentes secundários considerados aceitáveis para associação aos glicocorticoides. Entretanto, o painel de especialistas categorizou a força dessa recomendação como fraca e o nível de evidência científica como baixo. A série clínica clássica de Yau & Bianco (2014) demonstrou remissão completa em 5 cães estáveis tratados apenas com MMF; todavia, a ausência de grupo controle e a possibilidade de remissões espontâneas na ITP limitam conclusões definitivas.</li>
</ul>

<h3>5. Esclarecimento do Erro Editorial de Meia-Vida (5,5 Minutos versus 5,5 Horas)</h3>
<p>Um detalhe de auditoria farmacológica de alta relevância descoberto na literatura refere-se ao estudo pioneiro de farmacocinética de Grobman et al. (2017) em cães Dachshunds juvenis recebendo 13 mg/kg de MMF oral. O compêndio Plumb's Veterinary Drug Handbook (10ª edição) e compilações derivadas reproduziram no texto descritivo que a meia-vida do fármaco teria sido de "5,5 minutos". A conferência minuciosa dos dados primários da Tabela 2 do artigo original publicado no <em>Journal of Veterinary Pharmacology and Therapeutics</em> confirma de maneira inequívoca que a meia-vida terminal mensurada foi de <strong>5,50 ± 3,80 HORAS</strong>, valor compatível com a meia-vida de 2,9 horas em adultos e com o intervalo de administração a cada 12 horas. A presença da abreviação "min" no abstract original tratou-se de um manifesto erro tipográfico editorial. O ConsultaVET cadastra formalmente a meia-vida correta em horas.</p>

<h3>6. Particularidades do Metabolismo Felino: A Rota do MPA-Glucosídeo</h3>
<p>Por muitos anos perdurou o dogma na medicina veterinária de que o micofenolato seria absolutamente contraindicado em felinos devido à deficiência clássica da família de enzimas hepáticas UDP-glucuronosiltransferases (UGT), temendo-se que o acúmulo tóxico do fármaco inalterado fosse letal. Esse conceito foi formalmente superado pelos trabalhos de Slovak e colaboradores (2018 e 2019):
<ul>
  <li>Gatos sadios que receberam MMF por via oral e intravenosa foram perfeitamente capazes de clivar o éster e gerar concentrações terapêuticas plenas de MPA ativo.</li>
  <li>Para a conjugação e eliminação metabólica, a espécie felina recruta eficientemente uma via alternativa de <strong>glicosidação</strong>, sintetizando o metabólito inativo MPA-glucosídeo e compensando a ausência do MPAG.</li>
  <li>Todavia, a tolerabilidade clínica na espécie felina é bastante restrita: doses de 15 mg/kg a cada 8 horas induziram vômitos incoercíveis, anorexia e diarreia em 100% dos gatos avaliados em ensaios laboratoriais. O regime de 10 mg/kg a cada 12 horas é considerado a dose máxima tolerável, exigindo rigoroso acompanhamento do consumo alimentar diário sob risco de desencadeamento de lipidose hepática secundária em gatos com hiporexia prolongada.</li>
</ul>
</p>

<h3>7. Diretrizes de Biossegurança Ocupacional (Lista NIOSH 2024) e Mercado Brasileiro 2026</h3>
<p>O micofenolato de mofetila integra a listagem oficial da NIOSH (versão 2024) de fármacos perigosos (Hazardous Drugs in Healthcare Settings). Os riscos ocupacionais para equipes veterinárias e tutores decorrem primariamente de sua comprovada ação mutagênica e teratogênica. A manipulação inadvertida de fragmentos de comprimidos quebrados ou formulações orais sem equipamentos de proteção pode propiciar absorção percutânea ou inalação de aerossóis. As recomendações para prescrição incluem:
<ul>
  <li>Prescrever formulações na dosagem exata do animal para eliminar a necessidade de corte domiciliar de comprimidos.</li>
  <li>Uso obrigatório de luvas de nitrila descartáveis para o tutor que administra formulações manipuladas.</li>
  <li>Vedação absoluta de manipulação ou contato por mulheres grávidas ou em planejamento reprodutivo.</li>
  <li>Comunicação de descontinuação do CellCept® no Brasil em 2026 pela Roche, orientando os prescritores a utilizarem medicamentos genéricos registrados de laboratórios nacionais com boas práticas de fabricação (EMS, Eurofarma) ou farmácias de manipulação veterinária qualificadas.</li>
</ul>
</p>

<h3>8. Toxicologia, Superdosagem e a Colestiramina como Antídoto Farmacocinético</h3>
<p>A superdosagem aguda acidental manifesta-se essencialmente pela exacerbação violenta dos efeitos gastrointestinais e medulares: vômitos incoercíveis, diarreia sanguinolenta maciça, dor abdominal, desidratação hipovolêmica, colapso hemodinâmico, neutropenia grave e septicemia por translocação de enterobactérias. O micofenolato não é depurado de forma eficaz por hemodiálise convencional devido à sua elevadíssima taxa de ligação à albumina (~97%) e volume de distribuição tecidual.</p>
<p>O recurso farmacológico de resgate mais eficaz em centros de terapia intensiva é o emprego da <strong>Colestiramina</strong> por sonda orogástrica ou via oral. A colestiramina é uma resina sequestrante de ácidos biliares que exibe elevada afinidade de ligação pelo ácido micofenólico livre e pelo MPAG na luz entérica. Ao ligar-se covalentemente ao fármaco na luz gastrointestinal, a colestiramina impede a hidrólise enzimática bacteriana e bloqueia a reabsorção, interrompendo em definitivo a recirculação entero-hepática e acelerando a depuração do fármaco para as fezes. Em seres humanos intoxicados, a colestiramina demonstrou capacidade de <strong>reduzir a área sob a curva (AUC) e os níveis plasmáticos de MPA em aproximadamente 40%</strong>, funcionando como um verdadeiro antídoto farmacocinético intraluminal.</p>
`,

  references: [
    {
      id: 'ref-agnoli-2024',
      citationText:
        'Agnoli C, Tumbarello M, Vasylyeva K, et al. Methylprednisolone alone or combined with cyclosporine or mycophenolate mofetil for the treatment of immune-mediated hemolytic anemia in dogs, a prospective study. J Vet Intern Med. 2024;38(5):2480-2494. doi:10.1111/jvim.17122. PMID: 38961558.',
      sourceType: 'Ensaio clínico prospectivo randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/38961558/',
      notes: 'Estudo em 43 cães com IMHA demonstrando ausência de superioridade com MMF (~7,5 mg/kg q12h) e maior mortalidade em relação à ciclosporina.',
      evidenceLevel: 'Nível 1b — Ensaio Prospectivo Randomizado',
    },
    {
      id: 'ref-acvim-itp-2024',
      citationText:
        'LeVine DN, Goggs R, Kohn B, et al. ACVIM consensus statement on the treatment of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1982-2007. doi:10.1111/jvim.17079. PMID: 38779941.',
      sourceType: 'Diretriz de consenso internacional de especialistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/38779941/',
      notes: 'Consenso ACVIM 2024 que inclui o MMF como opção razoável de 2º imunossupressor na ITP, embora com força de recomendação fraca e evidência baixa.',
      evidenceLevel: 'Nível 1a — Consenso de Especialistas ACVIM',
    },
    {
      id: 'ref-acvim-imha-2019',
      citationText:
        'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172. doi:10.1111/jvim.15463. PMID: 31025438.',
      sourceType: 'Diretriz de consenso de especialistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31025438/',
      notes: 'Consenso que introduziu formalmente o MMF na faixa de 8 a 12 mg/kg VO q12h como opção adjuvante ao corticosteroide.',
      evidenceLevel: 'Nível 1a — Consenso Internacional ACVIM',
    },
    {
      id: 'ref-fukushima-2021',
      citationText:
        'Fukushima K, et al. A retrospective study of adverse effects of mycophenolate mofetil administration to dogs with immune-mediated disease. J Vet Intern Med. 2021;35(5):2215-2221. doi:10.1111/jvim.16209. PMID: 34231261.',
      sourceType: 'Estudo clínico retrospectivo multicêntrico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34231261/',
      notes: 'Avaliação de 131 cães tratados com MMF: sinais GI em 24,4%, neutropenia em 4%, anemia em 4% e trombocitopenia em 4%.',
      evidenceLevel: 'Nível 2b — Estudo Clínico Observacional Amplo',
    },
    {
      id: 'ref-song-2020',
      citationText:
        'Song JH, Yu DH, Lee HC, et al. Evaluation of treatment with a combination of mycophenolate mofetil and prednisolone in dogs with meningoencephalomyelitis of unknown etiology: a retrospective study of 86 cases (2009-2017). BMC Vet Res. 2020;16(1):185. doi:10.1186/s12917-020-02414-3. PMID: 32532259.',
      sourceType: 'Estudo de coorte retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/32532259/',
      notes: '86 cães com MUE tratados com MMF e prednisolona: 87,2% de respondedores e mediana de sobrevida de 558 dias.',
      evidenceLevel: 'Nível 2b — Coorte Retrospectiva Ampla em Neurologia',
    },
    {
      id: 'ref-yau-2014',
      citationText:
        'Yau VK, Bianco D. Treatment of five haemodynamically stable dogs with immune-mediated thrombocytopenia using mycophenolate mofetil as single agent. J Small Anim Pract. 2014;55(6):330-333. doi:10.1111/jsap.12203. PMID: 24602067.',
      sourceType: 'Série de casos prospectiva',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24602067/',
      notes: 'Remissão clínica em 5 de 5 cães estáveis com ITP tratados exclusivamente com MMF (7,1 a 14,4 mg/kg q12h).',
      evidenceLevel: 'Nível 3 — Série de Casos Clínicos sem Grupo Controle',
    },
    {
      id: 'ref-ackermann-2017',
      citationText:
        'Ackermann AL, May ER, Frank LA. Use of mycophenolate mofetil to treat immune-mediated skin disease in 14 dogs: a retrospective evaluation (2005-2014). Vet Dermatol. 2017;28(2):195-e44. doi:10.1111/vde.12400. PMID: 27943548.',
      sourceType: 'Estudo retrospectivo em dermatologia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27943548/',
      notes: 'Resposta favorável em 10 de 14 cães com pênfigo e dermatoses autoimunes tratados com dose média de 14,7 mg/kg q12h.',
      evidenceLevel: 'Nível 2b — Estudo Observacional Dermatológico',
    },
    {
      id: 'ref-grobman-2017',
      citationText:
        'Grobman M, Boothe DM, Rindt H, et al. Pharmacokinetics and dynamics of mycophenolate mofetil after single-dose oral administration in juvenile dachshunds. J Vet Pharmacol Ther. 2017;40(6):e1-e10. doi:10.1111/jvp.12420. PMID: 28649788.',
      sourceType: 'Estudo farmacocinético e farmacodinâmico experimental',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28649788/',
      notes: 'Demonstrou t1/2 de 5,50 ± 3,80 horas em Dachshunds juvenis com 13 mg/kg VO, corrigindo erro tipográfico de 5,5 min.',
      evidenceLevel: 'Nível 2b — Ensaio Farmacocinético em População Canina',
    },
    {
      id: 'ref-slovak-2019',
      citationText:
        'Slovak JE, Hwang JK, Rivera SM, Villarino NF. Pharmacokinetics of mycophenolic acid and its effect on CD4+ and CD8+ T cells after oral administration of mycophenolate mofetil to healthy cats. J Vet Intern Med. 2019;33(5):2020-2028. doi:10.1111/jvim.15585. PMID: 31423655.',
      sourceType: 'Estudo farmacocinético e farmacodinâmico em felinos',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31423655/',
      notes: 'Comprova formação de MPA ativo em 10 gatos com MMF oral e elucida via compensatória de glicosidação felina.',
      evidenceLevel: 'Nível 2b — Estudo Farmacocinético e Celular em Gatos',
    },
    {
      id: 'ref-slovak-2018',
      citationText:
        'Slovak JE, Hwang JK, Rivera SM, Villarino NF. Pharmacokinetics and pharmacodynamics of mycophenolic acid in healthy cats after twice-daily IV administration of mycophenolate mofetil for three days. Am J Vet Res. 2018;79(10):1093-1099. doi:10.2460/ajvr.79.10.1093. PMID: 30256137.',
      sourceType: 'Estudo farmacológico IV prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30256137/',
      notes: 'Avaliação de infusão intravenosa lenta de 10 mg/kg q12h por 2 horas durante 3 dias em felinos com queda de 26% em PBMC.',
      evidenceLevel: 'Nível 2b — Estudo Farmacocinético Laboratorial',
    },
    {
      id: 'ref-iris-gn-consensus',
      citationText:
        'Brown CA, Elliott J, Schmiedt CW, et al. Consensus Recommendations on the Evaluation, Diagnosis, and Management of Suspected Immune-Mediated Glomerular Disease in Dogs. J Vet Intern Med. 2013;27:S19-S43. doi:10.1111/jvim.12233.',
      sourceType: 'Diretriz de consenso internacional de especialistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24372990/',
      notes: 'Diretrizes do grupo IRIS recomendando MMF a 10 mg/kg VO q12h como imunossupressor padrão em glomerulopatias imunomediadas.',
      evidenceLevel: 'Nível 1a — Consenso Internacional de Nefrologia Veterinária',
    },
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux / Wiley-Blackwell; 2023. Monografia “Mycophenolate”, pp. 920-922. ISBN 9781394172207.',
      sourceType: 'Compêndio farmacológico veterinário terciário',
      url: null,
      notes: 'Monografia com descrição de indicações imunomediadas, doses usuais de 10-20 mg/kg q12h, preparo IV e toxicidade GI.',
      evidenceLevel: 'Nível 2a — Referência Terciária Consolidada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia “Mycophenolate mofetil”, pp. 278-279 e protocolos pp. 468-470.',
      sourceType: 'Formulário farmacológico veterinário britânico',
      url: null,
      notes: 'Monografia do BSAVA com posologia usual de 8-12 mg/kg q12h e protocolo dermatológico de 7-13 mg/kg q8h.',
      evidenceLevel: 'Nível 2a — Compêndio Farmacológico Britânico',
    },
    {
      id: 'ref-bula-cellcept-2026',
      citationText:
        'Produtos Roche Químicos e Farmacêuticos S.A. Bula do Profissional de Saúde: CellCept® (micofenolato de mofetila 500 mg). Aprovada pela ANVISA em 08/06/2026.',
      sourceType: 'Bula oficial aprovada por agência regulatória',
      url: 'https://dialogoroche.com.br/content/dam/roche-dialogo/dialogo-brazil-assets/downloadable-assets/produtos/bulas/cellcept/cellcept-bula-para-profissionais-da-saude.pdf',
      notes: 'Documento oficial registrando a redução de 30% a 50% na exposição ao MPA causada pela ciclosporina por interferência na circulação entero-hepática.',
      evidenceLevel: 'Nível 1a — Documentação Regulatória Oficial',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'mmf-foundation-mue-evidence',
      title: 'Manejo Imunossupressor da Meningoencefalomielite de Etiologia Desconhecida (MUE)',
      narrative:
        'A meningoencefalomielite de etiologia desconhecida (MUE / MUO) abrange um espectro devastador de encefalites inflamatórias não infecciosas em cães, caracterizadas por infiltrado perivascular linfoplasmocitário e granulomatoso no encéfalo e medula espinhal. O estudo retrospectivo de Song et al. (2020) envolvendo 86 cães tratados com a combinação de prednisolona e micofenolato de mofetila demonstrou uma das mais altas taxas de resposta clínica descritas na neurologia veterinária: 87,2% dos cães apresentaram melhora neurológica mensurável (66,3% de remissão completa), alcançando uma expressiva mediana de sobrevida de 558 dias. O micofenolato atua bloqueando a proliferação clonal de linfócitos T autorreativos e a expressão de moléculas de adesão endoteliais que medeiam a invasão leucocitária da barreira hematoencefálica.',
      narrativeHighlights: [
        'Estudo de Coorte em 86 cães com diagnóstico confirmado de MUE',
        'Taxa global de resposta neurológica de 87,2% (66,3% de remissão completa)',
        'Mediana de sobrevida prolongada de 558 dias sob protocolo combinado',
        'Eventos adversos gastrointestinais em 30,2% e infecções oportunistas em 19,8%',
      ],
      referenceIds: ['ref-song-2020', 'ref-plumb-10'],
      studies: [
        {
          citation:
            'Song JH, Yu DH, Lee HC, et al. Evaluation of treatment with a combination of mycophenolate mofetil and prednisolone in dogs with meningoencephalomyelitis of unknown etiology: a retrospective study of 86 cases. BMC Vet Res. 2020;16:185.',
          referenceId: 'ref-song-2020',
          sourceType: 'Coorte Retrospectiva Ampla',
          summaryText:
            '86 cães com MUE tratados com MMF (10 a 20 mg/kg q12h) e prednisolona apresentaram 66,3% de resposta completa, 20,9% de resposta parcial e sobrevida mediana de 558 dias. Diarreia ocorreu em 30,2% e infecções em 19,8%.',
          summaryHighlights: ['87,2% de resposta favorável', '558 dias de sobrevida mediana', 'Controle neurológico consistente'],
          metrics: ['n = 86 cães', 'Dose: 10 a 20 mg/kg VO q12h', 'Sobrevida: 558 dias'],
          clinicalConclusion:
            'A associação de MMF e prednisolona é altamente efetiva no controle a longo prazo da MUE canina, com taxa expressiva de remissão.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/32532259/',
        },
      ],
    },
    {
      id: 'mmf-foundation-imha-reevaluation',
      title: 'Reavaliação Contemporânea da Evidência em IMHA Canina (Ensaio Clínico 2024)',
      narrative:
        'A anemia hemolítica imunomediada é uma afecção hiperaguda de alta letalidade. Embora o Consenso ACVIM de 2019 tenha posicionado o MMF como um dos imunossupressores de segunda linha recomendados, o ensaio clínico prospectivo randomizado de Agnoli et al. (2024) trouxe uma inflexão crítica de segurança: comparando metilprednisolona em monoterapia versus associação com ciclosporina versus associação com MMF em 43 cães, a terapia combinada com MMF não demonstrou aceleração na recuperação eritrocitária e cursou com mortalidade estatisticamente maior aos 60 e 365 dias em relação à ciclosporina. Esses achados desautorizam a inclusão rotineira cega do MMF em todo cão com IMHA, recomendando reserva para casos criteriosamente selecionados.',
      narrativeHighlights: [
        'Ensaio Clínico Prospectivo Randomizado (Agnoli et al., JVIM 2024)',
        '43 cães com IMHA comparando metilprednisolona, ciclosporina e MMF (~7,5 mg/kg q12h)',
        'Ausência de benefício hematológico na resposta aguda com adição de MMF',
        'Mortalidade significativamente superior no grupo MMF frente à ciclosporina aos 60 e 365 dias',
      ],
      referenceIds: ['ref-agnoli-2024', 'ref-acvim-imha-2019'],
      studies: [
        {
          citation:
            'Agnoli C, Tumbarello M, Vasylyeva K, et al. Methylprednisolone alone or combined with cyclosporine or mycophenolate mofetil for the treatment of canine IMHA. J Vet Intern Med. 2024;38:2480-2494.',
          referenceId: 'ref-agnoli-2024',
          sourceType: 'Ensaio Clínico Prospectivo Randomizado',
          summaryText:
            '43 cães com IMHA tratados com metilprednisolona isolada ou combinada com ciclosporina ou MMF não exibiram diferenças no tempo até estabilização do hematócrito. O grupo MMF apresentou mortalidade superior comparado à ciclosporina (P = 0,009 aos 60 dias).',
          summaryHighlights: ['Sem benefício aditivo em IMHA', 'Maior mortalidade a 60 dias (P = 0,009)', 'Cautela no uso rotineiro'],
          metrics: ['n = 43 cães', 'Dose MMF: ~7,5 mg/kg q12h', 'Seguimento: 365 dias'],
          clinicalConclusion:
            'A associação rotineira de MMF em IMHA não conferiu vantagem de sobrevida ou de remissão hematológica em relação ao corticoide isolado ou ciclosporina.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/38961558/',
        },
      ],
    },
    {
      id: 'mmf-foundation-safety-fukushima',
      title: 'Incidência de Toxicidade e Segurança em Larga Escala (131 Cães)',
      narrative:
        'A crença empírica inicial de que o micofenolato seria totalmente isento de mielossupressão foi desfeita por dados populacionais consistentes. Fukushima et al. (2021) analisaram retrospectivamente 131 cães tratados com MMF para afecções imunomediadas e comprovaram que, embora o trato gastrointestinal seja o órgão mais frequentemente afetado (24,4% de diarreia e vômitos), a mielotoxicidade é uma realidade clínica mensurável, atingindo cerca de 4% de neutropenia, 4% de anemia e 4% de trombocitopenia. O monitoramento do hemograma completo a cada 14 a 30 dias é mandatório para interromper o fármaco antes da instalação de leucopenia severa.',
      narrativeHighlights: [
        'Estudo Retrospectivo Amplo em 131 cães (Fukushima et al., JVIM 2021)',
        'Sinais gastrointestinais dose-limitantes presentes em 24,4% dos pacientes',
        'Neutropenia documentada em 4% dos animais avaliados',
        'Desmistifica a ausência de mielotoxicidade e consolida o hemograma como exame de vigilância',
      ],
      referenceIds: ['ref-fukushima-2021', 'ref-plumb-10'],
      studies: [
        {
          citation:
            'Fukushima K, et al. A retrospective study of adverse effects of mycophenolate mofetil administration to dogs with immune-mediated disease. J Vet Intern Med. 2021;35:2215-2221.',
          referenceId: 'ref-fukushima-2021',
          sourceType: 'Estudo Retrospectivo Amplo',
          summaryText:
            'Em 131 cães com doenças imunomediadas recebendo dose mediana de 17,5 mg/kg/dia de MMF por 56 dias, 24,4% desenvolveram efeitos gastrointestinais e cerca de 4% apresentaram neutropenia e citopenias periféricas.',
          summaryHighlights: ['24,4% de toxicidade GI', '4% de neutropenia', 'Dose mediana: 17,5 mg/kg/dia'],
          metrics: ['n = 131 cães', 'Duração mediana: 56 dias', 'Sinais GI: 31/127'],
          clinicalConclusion:
            'O trato gastrointestinal é o principal limitante da dose; a ocorrência de neutropenia exige monitoramento hematológico rotineiro.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/34231261/',
        },
      ],
    },
    {
      id: 'mmf-foundation-feline-metabolism',
      title: 'Biotransformação e Farmacodinâmica Celular em Felinos (Estudos Slovak)',
      narrative:
        'A segurança e a farmacocinética do MMF na espécie felina foram definitivamente elucidadas por Slovak et al. (2018 e 2019). Contrariando o dogma histórico de que a deficiência felina de glucuronidação impediria o uso da medicação, os autores demonstraram que gatos convertem rapidamente o pró-fármaco MMF no MPA ativo após administração oral e intravenosa, utilizando uma via metabólica compensatória de conjugação com glicose para sintetizar MPA-glucosídeo. Por via intravenosa (10 mg/kg q12h em infusão de 2 horas por 3 dias), observou-se supressão funcional de 26% nas células mononucleares de sangue periférico (PBMC). Por via oral, a tolerabilidade foi dose-dependente, com diarreia e anorexia severas em regimes a cada 8 horas, consolidando o regime conservador de 10 mg/kg a cada 12 horas como o limite de segurança felina.',
      narrativeHighlights: [
        'Descoberta da rota compensatória de glicosidação felina (MPA-glucosídeo)',
        'Comprovação de conversão biológica em MPA ativo por vias oral e IV',
        'Supressão funcional de 26% na contagem celular imunológica de PBMC',
        'Inviabilidade clínica de regimes agressivos a cada 8 horas por intensa diarreia',
      ],
      referenceIds: ['ref-slovak-2019', 'ref-slovak-2018', 'ref-bsava-10'],
      studies: [
        {
          citation:
            'Slovak JE, Hwang JK, Rivera SM, Villarino NF. Pharmacokinetics of mycophenolic acid and its effect on CD4+ and CD8+ T cells after oral administration of mycophenolate mofetil to healthy cats. J Vet Intern Med. 2019;33:2020-2028.',
          referenceId: 'ref-slovak-2019',
          sourceType: 'Ensaio Farmacocinético e Farmacodinâmico Felino',
          summaryText:
            'Dez gatos hígidos tratados com MMF oral demonstraram conversão em MPA ativo e formação de MPA-glucosídeo. Efeitos adversos digestivos surgiram em 5 de 10 gatos dentro de 7 dias, revelando grande variabilidade de tolerabilidade.',
          summaryHighlights: ['Formação de MPA-glucosídeo', 'Conversão oral confirmada', 'Variação individual de tolerância'],
          metrics: ['n = 10 gatos', 'Dose: 10 mg/kg VO q12h', 'Período: 7 dias'],
          clinicalConclusion:
            'Gatos metabolizam eficientemente o MMF por vias glicosídicas, mas apresentam sensibilidade digestiva que requer monitoramento cauteloso.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/31423655/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Methylprednisolone alone or combined with cyclosporine or mycophenolate mofetil for the treatment of canine IMHA',
      authorsYear: 'Agnoli C, Tumbarello M, Vasylyeva K, et al. (2024)',
      journal: 'Journal of Veterinary Internal Medicine 38(5):2480-2494',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, aberto',
      sampleSize: '43 cães com anemia hemolítica imunomediada espontânea',
      mainFindings:
        'A adição de MMF (~7,5 mg/kg q12h) ou ciclosporina à metilprednisolona não acelerou a remissão hematológica nem reduziu o tempo de internação frente ao corticoide isolado. A mortalidade no grupo MMF foi significativamente superior em relação ao grupo ciclosporina aos 60 dias (P = 0,009) e 365 dias (P = 0,003).',
      clinicalTakeaway:
        'Não há respaldo científico para a adição rotineira de MMF a todo cão com IMHA na admissão; os glicocorticoides isolados permanecem como padrão inicial e a ciclosporina demonstrou perfil de segurança superior.',
      referenceId: 'ref-agnoli-2024',
    },
    {
      title: 'A retrospective study of adverse effects of mycophenolate mofetil administration to dogs with immune-mediated disease',
      authorsYear: 'Fukushima K, et al. (2021)',
      journal: 'Journal of Veterinary Internal Medicine 35(5):2215-2221',
      studyDesign: 'Estudo clínico retrospectivo multicêntrico',
      sampleSize: '131 cães tratados para diversas doenças autoimunes',
      mainFindings:
        'Eventos adversos gastrointestinais foram documentados em 24,4% (31/127) dos cães tratados. Mielossupressão ocorreu em frequência modesta, com neutropenia em 4% (3/76), anemia em 4% (1/25) e trombocitopenia em 4% (1/25). A dose mediana utilizada foi de 17,5 mg/kg/dia por 56 dias.',
      clinicalTakeaway:
        'A toxicidade gastrointestinal é dose-limitante e atinge um quarto dos cães; o risco de neutropenia comprova a obrigatoriedade de acompanhamento hematológico periódico durante a terapia crônica.',
      referenceId: 'ref-fukushima-2021',
    },
    {
      title: 'Evaluation of treatment with a combination of mycophenolate mofetil and prednisolone in dogs with MUE',
      authorsYear: 'Song JH, Yu DH, Lee HC, et al. (2020)',
      journal: 'BMC Veterinary Research 16(1):185',
      studyDesign: 'Estudo de coorte retrospectivo amplo',
      sampleSize: '86 cães com diagnóstico clínico e anatomopatológico de MUE',
      mainFindings:
        'A taxa global de resposta clínica ao protocolo MMF (10 a 20 mg/kg q12h) associado a prednisolona foi de 87,2% (resposta completa em 66,3% e parcial em 20,9%). A mediana de sobrevida global foi de 558 dias. Recaídas ocorreram em 45,3% dos respondedores e eventos GI em 30,2%.',
      clinicalTakeaway:
        'O MMF é um dos agentes mais consistentes e eficazes para manutenção a longo prazo em cães com meningoencefalomielite de etiologia desconhecida.',
      referenceId: 'ref-song-2020',
    },
    {
      title: 'Treatment of five haemodynamically stable dogs with ITP using mycophenolate mofetil as single agent',
      authorsYear: 'Yau VK, Bianco D. (2014)',
      journal: 'Journal of Small Animal Practice 55(6):330-333',
      studyDesign: 'Série de casos clínica prospectiva',
      sampleSize: '5 cães com trombocitopenia imune espontânea',
      mainFindings:
        'Cinco cães com ITP receberam MMF como monoterapia (7,1 a 14,4 mg/kg q12h) devido à contraindicação de esteroides. Todos os 5 animais atingiram remissão plaquetária completa (> 100.000 plaquetas/µL); 4 cães suspenderam o MMF sem apresentar recaídas subsequentes.',
      clinicalTakeaway:
        'Demonstra atividade imunológica autônoma real do MMF na ITP canina, posicionando-o como opção poupadora em animais que não podem receber corticosteroides.',
      referenceId: 'ref-yau-2014',
    },
    {
      title: 'Pharmacokinetics and dynamics of mycophenolate mofetil after single-dose oral administration in juvenile dachshunds',
      authorsYear: 'Grobman M, Boothe DM, Rindt H, et al. (2017)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics 40(6):e1-e10',
      studyDesign: 'Estudo farmacocinético e farmacodinâmico experimental',
      sampleSize: '6 cães tratados com 13 mg/kg VO e 2 controles',
      mainFindings:
        'Absorção ultrarrápida com Tmax de 0,33 h, Cmax de 9,33 µg/mL e meia-vida terminal de 5,50 ± 3,80 horas (esclarecendo erro editorial de digitação em minutos). A proliferação de células CD5+ in vitro não foi significativamente deprimida após dose única isolada.',
      clinicalTakeaway:
        'Comprova que a meia-vida do MMF em cães é de aproximadamente 5,5 horas (e não 5,5 minutos), reforçando a necessidade biológica de administrações a cada 12 horas.',
      referenceId: 'ref-grobman-2017',
    },
    {
      title: 'Pharmacokinetics of mycophenolic acid and its effect on CD4+ and CD8+ T cells after oral MMF in cats',
      authorsYear: 'Slovak JE, Hwang JK, Rivera SM, Villarino NF. (2019)',
      journal: 'Journal of Veterinary Internal Medicine 33(5):2020-2028',
      studyDesign: 'Ensaio clínico farmacocinético em felinos hígidos',
      sampleSize: '10 gatos adultos saudáveis',
      mainFindings:
        'Gatos converteram MMF em MPA e formaram MPA-glucosídeo por rota glicosídica funcional. Todavia, 5 de 10 gatos manifestaram distúrbios digestivos severos (vômitos e diarreia) em uma semana, limitando a progressão da dose.',
      clinicalTakeaway:
        'Felinos são metabolicamente capazes de utilizar MMF, mas exibem sensibilidade gastrointestinal expressiva, exigindo estrita vigilância clínica com dose padrão de 10 mg/kg q12h.',
      referenceId: 'ref-slovak-2019',
    },
  ],

  presentations: [
    {
      id: 'pres-mmf-comp-500',
      name: 'CellCept® 500 mg Comprimidos Revestidos',
      brand: 'Roche Farma (Referência Humana Extrabula; importação descontinuada no Brasil em 2026)',
      form: 'Comprimido revestido oblongo',
      concentrationValue: 500.0,
      concentrationUnit: 'mg',
      packInfo: 'Caixa com 50 comprimidos revestidos de 500 mg',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido revestido sem sulco; PROIBIDO triturar ou pulverizar por risco ocupacional NIOSH',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Receita Simples)',
      packageDescription: 'Cartucho com 50 comprimidos revestidos contendo 500 mg de micofenolato de mofetila',
    },
    {
      id: 'pres-mmf-gen-comp-500',
      name: 'Micofenolato de Mofetila 500 mg Genérico',
      brand: 'Genérico Humano Extrabula (EMS, Eurofarma, Accord, Cristália)',
      form: 'Comprimido revestido simples',
      concentrationValue: 500.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 50 ou 100 comprimidos de 500 mg',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido revestido não partilhável sem perda de integridade',
      channel: 'human_pharmacy',
      commercialType: 'Genérico Humano Extrabula',
      packageDescription: 'Cartucho com 50 comprimidos revestidos de 500 mg',
    },
    {
      id: 'pres-mmf-caps-mag-custom',
      name: 'Micofenolato de Mofetila Cápsulas Magistrais Veterinárias',
      brand: 'Formulação Magistral Veterinária Personalizada (Farmácia Especializada)',
      form: 'Cápsula gelatinosa manipulada individualizada',
      concentrationValue: 100.0,
      concentrationUnit: 'mg',
      concentrationOptions: [
        { id: 'opt-caps-20', label: '20 mg por cápsula (cães miniatura e gatos de 2 kg)', unitValue: 20, unitLabel: 'mg' },
        { id: 'opt-caps-50', label: '50 mg por cápsula (cães e gatos de 5 kg)', unitValue: 50, unitLabel: 'mg' },
        { id: 'opt-caps-100', label: '100 mg por cápsula (cães de 10 kg)', unitValue: 100, unitLabel: 'mg', isDefault: true },
        { id: 'opt-caps-150', label: '150 mg por cápsula (cães de 15 kg)', unitValue: 150, unitLabel: 'mg' },
        { id: 'opt-caps-200', label: '200 mg por cápsula (cães de 20 kg)', unitValue: 200, unitLabel: 'mg' },
        { id: 'opt-caps-250', label: '250 mg por cápsula (cães de 25 kg)', unitValue: 250, unitLabel: 'mg' },
      ],
      packInfo: 'Frasco plástico de polietileno com 30 ou 60 cápsulas dosadas sob medida',
      route: 'Oral (VO)',
      scoringInfo: 'Cápsula sob medida para o peso do paciente, evitando riscos de fracionamento',
      channel: 'compounded',
      commercialType: 'Formulação Magistral Veterinária',
      packageDescription: 'Frasco plástico com 60 cápsulas gelatinosas personalizadas',
    },
    {
      id: 'pres-mmf-susp-mag-100',
      name: 'Micofenolato de Mofetila 100 mg/mL Suspensão Oral Manipulada',
      brand: 'Formulação Magistral Veterinária com Veículo Protetor',
      form: 'Suspensão oral homogênea flavorizada',
      concentrationValue: 100.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco âmbar de 30 mL ou 60 mL acompanhado de seringa graduada milimetrada',
      route: 'Oral (VO)',
      scoringInfo: '1 mL = 100 mg de MMF (0,1 mL por kg para a dose de 10 mg/kg)',
      channel: 'compounded',
      commercialType: 'Formulação Magistral Veterinária Líquida',
      packageDescription: 'Frasco âmbar de 60 mL com seringa dosadora oral',
    },
    {
      id: 'pres-mmf-inj-500',
      name: 'CellCept IV® 500 mg Pó Liofilizado para Solução Injetável',
      brand: 'Roche / Genéricos Hospitalares (Uso Hospitalar Extrabula)',
      form: 'Pó liofilizado para reconstituição e diluição em frasco-ampola',
      concentrationValue: 500.0,
      concentrationUnit: 'mg/frasco',
      packInfo: 'Frasco-ampola de vidro com 500 mg de micofenolato de mofetila',
      route: 'Intravenosa (IV lenta por infusão contínua em 2 horas exclusivamente)',
      scoringInfo: 'Reconstituir com 14 mL de SG 5% (35 mg/mL) e diluir em bolsa de SG 5% até 6 mg/mL',
      channel: 'human_pharmacy',
      commercialType: 'Referência Hospitalar Humana Extrabula',
      packageDescription: 'Frasco-ampola de uso único com 500 mg de pó liofilizado',
    },
  ],

  doses: [
    {
      id: 'dose-mmf-dog-mue',
      species: 'dog',
      indication: 'Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO) Canina',
      clinicalContext: 'Terapia imunossupressora contínua de longo prazo em cães com GME, NME ou NLE.',
      doseMin: 10.0,
      doseMax: 20.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Uso mantido por meses a anos com desmame individualizado após remissão neurológica',
      notes:
        'Iniciar com 10 a 15 mg/kg VO q12h em combinação com prednisolona em dose imunossupressora. Estudo de Song et al. (2020) em 86 cães comprovou 87,2% de resposta favorável e sobrevida mediana de 558 dias. Se houver vômito ou diarreia moderada, reduzir para 10 mg/kg q12h com alimento.',
      monitoring: 'Avaliação neurológica postural, hemograma quinzenal no 1º mês e monitoramento de fezes/vômitos.',
      referenceIds: ['ref-song-2020', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Estudo Retrospectivo Amplo com Alta Taxa de Resposta Clínica (Song 2020)',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-dog-glomerulo',
      species: 'dog',
      indication: 'Glomerulopatias Imunomediadas e Glomerulonefrite por Imunocomplexos (Consenso IRIS)',
      clinicalContext: 'Cães com síndrome nefrótica ou glomerulonefrite comprovada por proteinúria grave persistente.',
      doseMin: 10.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Mínimo de 8 a 16 semanas para avaliação de eficácia; continuada se houver queda da UPC',
      notes:
        'Dose padronizada pelas Diretrizes de Consenso Internacional IRIS (10 mg/kg VO q12h). Pode ser utilizada isoladamente ou associada a prednisolona com desmame rápido. Se a albumina estiver < 2,0 g/dL, considerar iniciar com 7 mg/kg q12h devido ao aumento da fração livre ativa.',
      monitoring: 'Razão UPC urinária, creatinina, albumina, pressão arterial e tolerabilidade gastrointestinal.',
      referenceIds: ['ref-iris-gn-consensus', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas em Nefrologia Veterinária (IRIS)',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-dog-itp',
      species: 'dog',
      indication: 'Trombocitopenia Imunomediada (ITP) Canina como Segundo Imunossupressor (Consenso ACVIM 2024)',
      clinicalContext: 'Cães com ITP primária com resposta insuficiente aos corticosteroides ou efeitos colaterais severos.',
      doseMin: 7.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Uso mantido até estabilização plaquetária consolidada (> 100.000/µL) e desmame gradual',
      notes:
        'Opção razoável de 2º agente segundo ACVIM 2024 (recomendação fraca, evidência baixa). Plumb cita 7 a 9 mg/kg q12h; Yau & Bianco (2014) utilizaram até 14 mg/kg q12h em 5 cães com remissão completa. Associar à corticoterapia inicial.',
      monitoring: 'Contagem de plaquetas seriada, hematócrito, pesquisa de melena e tolerabilidade digestiva.',
      referenceIds: ['ref-acvim-itp-2024', 'ref-yau-2014', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Diretriz de Consenso ACVIM 2024 (Recomendação Fraca, Evidência Baixa)',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-dog-dermatopathy',
      species: 'dog',
      indication: 'Dermatopatias Autoimunes e Pênfigo Foliáceo Canino (Ackermann 2017 / BSAVA 10ª ed.)',
      clinicalContext: 'Agente poupador de esteroides para cães com lesões pustulosas, crostas e vasculite.',
      doseMin: 10.0,
      doseMax: 15.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (ou 7 a 13 mg/kg VO q8h)',
      duration: 'Pelo menos 6 a 8 semanas até remissão clínica satisfatória (média de 5,7 semanas)',
      notes:
        'Dose média de 14,7 mg/kg q12h descrita por Ackermann et al. (2017) com remissão em 10 de 14 cães. O BSAVA preconiza 7 a 13 mg/kg a cada 8 horas. Como doses elevadas e q8h aumentam a incidência de diarreia, iniciar preferencialmente com 10 mg/kg q12h e titular.',
      monitoring: 'Inspeção dermatológica de crostas/úlceras, citologia cutânea, fezes e hemograma.',
      referenceIds: ['ref-ackermann-2017', 'ref-bsava-10', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2b — Estudo Retrospectivo em Dermatologia Veterinária',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-dog-imha',
      species: 'dog',
      indication: 'Anemia Hemolítica Imunomediada (IMHA) Canina — Segundo Agente com Monitoramento Estrito',
      clinicalContext: 'Cães com IMHA grave refratários a glicocorticoides ou intolerantes à ciclosporina.',
      doseMin: 8.0,
      doseMax: 12.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Reavaliação crítica em 30 a 60 dias devido a dados recentes de mortalidade',
      notes:
        'Faixa do Consenso ACVIM 2019 (8 a 12 mg/kg q12h). ALERTA DE EVIDÊNCIA: O ensaio prospectivo de Agnoli et al. (2024) não demonstrou benefício adicional e apontou mortalidade maior no grupo MMF frente à ciclosporina. Uso deve ser criterioso e individualizado.',
      monitoring: 'Hematócrito seriado, esferócitos, bilirrubinas, hemograma quinzenal e tolerabilidade intestinal.',
      referenceIds: ['ref-acvim-imha-2019', 'ref-agnoli-2024', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1b — Ensaio Prospectivo Randomizado com Dados Conflitantes de Segurança (Agnoli 2024)',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-cat-general',
      species: 'cat',
      indication: 'Doenças Imunomediadas Felinas Selecionadas (IMHA, Dermatopatias Refratárias)',
      clinicalContext: 'Gatos com afecções autoimunes refratárias sem tolerância a outros imunossupressores.',
      doseMin: 10.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Individualizada; suspender se houver hiporexia persistente',
      notes:
        'Gatos metabolizam MMF via MPA-glucosídeo (Slovak 2019). Doses de 10 mg/kg q12h são o limite superior de tolerabilidade felina; doses de 15 mg/kg q8h causam diarreia em 100% dos gatos. Administrar estritamente com refeição úmida e monitorar consumo calórico diário.',
      monitoring: 'Apetite diário, peso, consistência fecal, hemograma e bioquímica hepática quinzenais.',
      referenceIds: ['ref-slovak-2019', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Estudos Farmacocinéticos e Celulares em Felinos',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
    {
      id: 'dose-mmf-cat-iv-exp',
      species: 'cat',
      indication: 'Protocolo Intravenoso Hospitalar Curto em Felinos (Estudos Farmacocinéticos Slovak 2018)',
      clinicalContext: 'Uso hospitalar de emergência em gatos incapazes de deglutir com doença imunomediada aguda.',
      doseMin: 10.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta em 2 horas)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Até 3 dias consecutivos (transição para via oral assim que viável)',
      notes:
        'Diluir em SG 5% exclusivamente até concentração de 6 mg/mL e infundir lentamente ao longo de pelo menos 2 HORAS em bomba volumétrica. Slovak et al. (2018) demonstraram queda de 26% em PBMC com boa tolerância a curto prazo.',
      monitoring: 'Trajeto vascular contra flebite, pressão arterial, traçado ECG e ausência de hipotensão.',
      referenceIds: ['ref-slovak-2018', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2b — Estudo Farmacocinético e Farmacodinâmico Experimental',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-inj-500',
    },
    {
      id: 'dose-mmf-dog-mg',
      species: 'dog',
      indication: 'Miastenia Gravis Adquirida Canina Intolerante a Esteroides (Coadjuvante)',
      clinicalContext: 'Cães com fraqueza muscular e megaesôfago com intolerância severa a glicocorticoides.',
      doseMin: 10.0,
      doseMax: 20.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h)',
      duration: 'Individualizada; não substitui anticolinesterásicos de primeira linha',
      notes:
        'Coadjuvante imunossupressor em casos selecionados. Estudo de Dewey et al. (2010) em 27 cães com MG não evidenciou aumento na sobrevida ou tempo até remissão em relação à piridostigmina isolada. Cuidado extremo com pneumonia por aspiração.',
      monitoring: 'Força muscular, frequência respiratória, deglutição e prevenção de aspiração alimentar.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Estudo Retrospectivo sem Ganho de Eficácia Estatística Comprovada',
      calculatorEnabled: true,
      presentationId: 'pres-mmf-caps-mag-custom',
    },
  ],

  relatedDiseaseSlugs: [
    'anemia-hemolitica-imunomediada-canina',
    'trombocitopenia-caes-gatos',
    'miastenia-gravis-caes-gatos',
  ],
};
