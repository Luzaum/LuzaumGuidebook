import { MedicationRecord } from '../../types/medication';

export const prednisolonaMedicationRecord: MedicationRecord = {
  id: 'med-prednisolona',
  slug: 'prednisolona',
  title: 'Prednisolona',
  activeIngredient: 'Prednisolona (Prednisolona base / Fosfato sódico / Acetato / Succinato sódico)',
  isControlled: false,
  tradeNames: [
    'Preditabs® 5 mg, 10 mg e 20 mg Comprimidos Bissulcados (Biovet / Vencofarma — Cães e Gatos)',
    'Prediderm® 5 mg e 20 mg Comprimidos Palatáveis (Ourofino — Uso Veterinário Oficial Cães)',
    'Predivet® 5 mg e 20 mg Comprimidos (Biogénesis Bagó Pet — Cães e Gatos)',
    'Prednisolona ProvetS® 5 mg e 20 mg (Provets Simões — Linha Veterinária Pequenos Animais)',
    'Prelone® 3 mg/mL Solução Oral (Aché — Referência Humana Extrabula; 1 mL = 3 mg)',
    'Predsim® Gotas 11 mg/mL (Cosmed / Hypera — Referência Humana Extrabula; 1 mL = 20 gotas = 0,55 mg/gota)',
    'Solu-Delta-Cortef® 100 mg e 500 mg Pó Injetável (Zoetis — Succinato Sódico de Prednisolona Hospitalar)',
    'Pred-Forte® 1% e Ster® 0,12% / 1% Suspensão Oftálmica (Allergan / União Química)',
  ],
  officialSiteUrl: 'https://vetsmart.com.br/cg/produto/77/prediderm',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/prednisolone/PNG',
  pharmacologicClass:
    'Glicocorticoide sintético de ação intermediária; anti-inflamatório esteroidal potente, imunossupressor, repositor hormonal adrenocortical e antineoplásico linfolítico',
  species: ['dog', 'cat'],
  category: 'terapeutica-geral',
  tags: [
    'Prednisolona',
    'Prednisona',
    'Glicocorticoide',
    'Corticosteroide',
    'Anti-inflamatório Esteroide',
    'Imunossupressor',
    'IMHA',
    'ITP',
    'Hipoadrenocorticismo',
    'Doença de Addison',
    'IBD Felina',
    'Enteropatia Crônica',
    'Preditabs',
    'Prediderm',
    'Prelone',
    'Predsim',
    'ACVIM',
    'Desmame Esteroide',
  ],

  mechanismOfAction:
    'A prednisolona é um corticosteroide pregnano sintético com potência anti-inflamatória aproximadamente 4 vezes superior à da hidrocortisona e baixa atividade mineralocorticoide intrínseca (cerca de 0,3 vezes). Por ser uma molécula lipofílica, penetra facilmente nas células por difusão passiva através da membrana plasmática e liga-se a receptores citoplasmáticos específicos de glicocorticoides (GR / NR3C1). Esta ligação desencadeia alteração conformacional, dissociação de proteínas chaperonas (incluindo HSP90 e HSP70), homodimerização do complexo ativado e translocação para o núcleo celular. No núcleo, a prednisolona atua através de dois grandes mecanismos transcricionais complementares: 1) Transativação: o complexo liga-se diretamente a elementos responsivos a glicocorticoides (GRE) no DNA, promovendo a transcrição de proteínas anti-inflamatórias, principalmente a anexina A1 (lipocortina-1), a qual inibe diretamente a fosfolipase A2 (PLA2), bloqueando a clivagem de fosfolipídios de membrana e suprimindo a montante a disponibilidade de ácido araquidônico para as vias da ciclo-oxigenase (COX-2) e lipoxigenase (5-LOX), cessando a síntese de prostaglandinas, tromboxanos e leucotrienos. 2) Transrepressão: o complexo interage fisicamente com fatores de transcrição pró-inflamatórios mestres (especialmente NF-kappa-B e AP-1), bloqueando a transcrição gênica de citocinas inflamatórias essenciais (IL-1, IL-2, IL-6, TNF-alfa, IFN-gama), enzimas inflamatórias (COX-2, iNOS), moléculas de adesão endotelial e quimiocinas de recrutamento leucocitário. Em nível imunológico celular, reduz a expressão de receptores Fc-gama em macrófagos teciduais (baço e fígado), impedindo a fagocitose e destruição opsonizada de eritrócitos na anemia hemolítica imunomediada (IMHA) e de plaquetas na trombocitopenia imunomediada (ITP). Adicionalmente, deprime a imunidade celular mediada por linfócitos T, induz apoptose em populações linfocitárias neoplásicas e reativas, inibe a desgranulação mastocitária e reduz o tráfego leucocitário tecidual. Em nível neuroendócrino e renal, exerce feedback negativo sobre o eixo hipotálamo-hipófise-adrenal suprimindo CRH e ACTH, atua como antagonista funcional da vasopressina (ADH) nos túbulos coletores renais induzindo diurese aquosa e estimula a gliconeogênese com antagonismo periférico aos efeitos da insulina.',

  plainLanguageSummary:
    'A prednisolona é um dos medicamentos mais versáteis e fundamentais da medicina veterinária, pertencente à classe dos glicocorticoides de ação intermediária, amplamente utilizada em cães e gatos em regimes posológicos radicalmente distintos conforme o objetivo clínico: reposição fisiológica no hipoadrenocorticismo, controle anti-inflamatório em alergias e dermatopatias, imunossupressão potente em doenças imunomediadas como anemia hemolítica e trombocitopenia, e como quimioterápico linfolítico em neoplasias hematopoiéticas. Em felinos domésticos, a prednisolona ativa é estritamente mandatória em substituição à prednisona, pois a espécie felina apresenta baixa capacidade de absorção e bioativação hepática da molécula pró-fármaco, além de densidade reduzida de receptores celulares que frequentemente demanda doses proporcionalmente maiores. O sucesso e a segurança do tratamento dependem da individualização da dose, acompanhamento de parâmetros como glicemia e pressão arterial, e de um protocolo de desmame gradual e planejado após terapias continuadas para permitir a recuperação funcional do eixo hipotálamo-hipófise-adrenal.',

  pillars: [
    {
      title: 'Freio Inflamatório Transcricional (NF-kB e Eicosanoides)',
      icon: 'ShieldAlert',
      desc: 'Bloqueia os fatores de transcrição NF-kB e AP-1, inibe a fosfolipase A2 e a COX-2, suprimindo radicalmente citocinas pró-inflamatórias, prostaglandinas e leucotrienos teciduais.',
    },
    {
      title: 'Imunossupressão Celular e Downregulation de Receptores Fc',
      icon: 'Shield',
      desc: 'Reduz receptores Fc em macrófagos esplênicos e hepáticos, interrompendo a fagocitose de hemácias na IMHA e plaquetas na ITP, além de suprimir a resposta de linfócitos T auxiliares.',
    },
    {
      title: 'Reposição Endócrina no Hipoadrenocorticismo',
      icon: 'HeartPulse',
      desc: 'Doses fisiológicas mínimas substituem o cortisol deficiente na insuficiência adrenocortical (Doença de Addison), mantendo estabilidade hemodinâmica, glicêmica e integridade vascular.',
    },
    {
      title: 'Ação Linfolítica e Adjuvância Antineoplásica',
      icon: 'Target',
      desc: 'Induz apoptose programada de linhagens celulares linfoides anormais, constituindo a base de protocolos quimioterápicos para linfoma, leucemias e mastocitomas caninos e felinos.',
    },
  ],

  quickSummaryHighlights: [
    'Dose Depende Radicalmente do Objetivo Clínico',
    'Reposição << Anti-inflamatório << Imunossupressor',
    'Gatos: Usar Sempre Prednisolona Ativa e Não Prednisona',
    'Gatos Têm Metade dos Receptores GR e Menor Afinidade',
    'Desmame Gradual Obrigatório após Terapias Acima de 14 Dias',
    'Contraindicada Associação Rotineira com AINEs (Ulceração GI)',
    'Antagoniza Efeito da Insulina (Alerta em Diabéticos)',
    'Receituário Simples sem Retenção Especial de Receita',
  ],

  quickIndications: [
    {
      condition: 'Doenças Imunomediadas Graves (IMHA / ITP Canina)',
      species: 'dog',
      doseSummary: '2 a 3 mg/kg/dia VO (ou 50 a 60 mg/m2/dia em cães > 25 kg); reduzir para <= 2 mg/kg/dia em 1-2 semanas',
      route: 'Oral (com alimento) ou IV lenta em casos graves (succinato)',
      duration: 'Manutenção inicial por semanas até estabilização de Ht/plaquetas, seguido de desmame lento por 3 a 6 meses',
      clinicalContext: 'Consenso ACVIM: primeira linha em IMHA e ITP com monitoramento de Ht, esferócitos e plaquetas',
    },
    {
      condition: 'Doenças Imunomediadas Felinas (IMHA / ITP / Pênfigo)',
      species: 'cat',
      doseSummary: '2 a 4 mg/kg/dia VO (dividida a cada 12 a 24 horas); gatos requerem doses maiores que cães',
      route: 'Oral (comprimidos ou suspensão líquida com alimento)',
      duration: 'Indução até remissão hematológica/cutânea, seguida de titulação descendente para dias alternados',
      clinicalContext: 'Uso obrigatório de prednisolona ativa; monitorar glicemia estrita pelo risco aumentado de diabetes',
    },
    {
      condition: 'Reposição Hormonal no Hipoadrenocorticismo Crônico (Addison)',
      species: 'both',
      doseSummary: '0,05 a 0,20 mg/kg/dia VO (maioria dos cães estabiliza com < 0,10 mg/kg/dia); duplicar em estresse',
      route: 'Oral administrada pela manhã',
      duration: 'Terapia contínua por toda a vida associada a DOCP injetável ou fludrocortisona',
      clinicalContext: 'Reposição fisiológica de glicocorticoide; titulação pela ausência de letargia, anorexia e vômitos',
    },
    {
      condition: 'Alergias, Prurido e Doenças Inflamatórias Gerais',
      species: 'both',
      doseSummary: 'Cães: 0,5 a 1,0 mg/kg/dia VO | Gatos: 0,5 a 1,5 mg/kg/dia VO; reduzir rápido para q48h',
      route: 'Oral preferencialmente com alimento',
      duration: 'Cursos curtos de 3 a 7 dias, transicionando para terapia em dias alternados (menor dose eficaz)',
      clinicalContext: 'Dermatite alérgica, hipersensibilidade alimentar e traqueobronquite aguda responsiva',
    },
    {
      condition: 'Enteropatia Inflamatória Crônica / IBD Canina e Felina',
      species: 'both',
      doseSummary: '1 a 2 mg/kg/dia VO administrado uma vez ao dia ou dividido a cada 12 horas',
      route: 'Oral com alimento',
      duration: 'Indução de 2 a 4 semanas com desmame lento condicionado a escores clínicos e albumina',
      clinicalContext: 'Doença inflamatória intestinal moderada a grave com falha a manejo dietético isolado',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-pred-imha',
      indication: 'Anemia Hemolítica Imunomediada (IMHA) Canina e Felina',
      clinicalContext: 'Emergência hematológica imunomediada com destruição acelerada de hemácias opsonizadas',
      species: 'both',
      dose: 'Cães: 2 a 3 mg/kg/dia VO (SID ou BID) ou 50 a 60 mg/m2/dia em cães > 25 kg. Gatos: 2 a 4 mg/kg/dia VO',
      route: 'Oral com pequena porção de alimento (ou IV lenta como succinato se vômito incoercível)',
      frequency: 'A cada 12 a 24 horas',
      duration: 'Reduzir para <= 2 mg/kg/dia em 1 a 2 semanas se Ht estável; desmame de ~25% a cada 3 semanas por 3 a 6 meses',
      mechanismOfAction:
        'A prednisolona reduz de forma rápida e expressiva a densidade e afinidade de receptores Fc-gama na superfície dos macrófagos do sistema mononuclear fagocitário esplênico e hepático, cessando a fagocitose das hemácias recobertas por autoanticorpos (IgG e IgM). A longo prazo, inibe a cooperação de linfócitos T auxiliares, reduz a proliferação linfocitária e suprime citocinas inflamatórias secundárias.',
      clinicalRationale:
        'Segundo as diretrizes ACVIM de IMHA, a prednisolona é a terapia imunossupressora de primeira linha padrão-ouro. Doses acima de 2 mg/kg/dia em cães de grande porte não aumentam a eficácia e elevam dramaticamente o risco de complicações infecciosas, fraqueza muscular grave e eventos tromboembólicos. O cálculo por área de superfície corporal (50-60 mg/m2/dia) em cães > 25 kg previne superdosagens tóxicas.',
      monitoring:
        'Hematócrito (PCV) seriado, contagem de reticulócitos, bilirrubina sérica, esferócitos no esfregaço sanguíneo, aglutinação em lâmina salina, hemograma completo, urinálise com urocultura seriada e monitoramento de sinais de tromboembolismo pulmonar.',
      referenceIds: ['ref-acvim-imha-2019', 'ref-nelson-couto-cap72', 'ref-plumbs-10ed'],
      evidenceLevel: 'Consenso Internacional ACVIM de Alto Nível de Evidência (Nível A)',
    },
    {
      id: 'ind-pred-itp',
      indication: 'Trombocitopenia Imunomediada Primária (ITP) em Cães e Gatos',
      clinicalContext: 'Destruição imunomediada aguda de plaquetas com contagens críticas (< 30.000/mcL) e hemorragias',
      species: 'both',
      dose: 'Cães: 2 mg/kg/dia VO (SID ou BID). Gatos: 1 a 2 mg/kg VO a cada 12 a 24 horas',
      route: 'Oral administrada com alimento. Contraindicada a via intramuscular pelo risco grave de hematomas',
      frequency: 'A cada 12 a 24 horas',
      duration: 'Manter dose de indução até recuperação plaquetária (> 100.000/mcL); desmame de ~25% a cada 2 a 4 semanas',
      mechanismOfAction:
        'Suprime a depuração prematura de plaquetas opsonizadas por autoanticorpos pelos macrófagos sinusais do baço através do downregulation de receptores Fc. Em menor grau, reduz a síntese de anticorpos antiplaquetários específicos dirigidos contra glicoproteínas de membrana (GPIIb/IIIa).',
      clinicalRationale:
        'O Consenso ACVIM 2024 de ITP confirmou que doses iniciais de 2 mg/kg/dia oferecem eficácia idêntica a doses superiores (3-4 mg/kg/dia), com índice significativamente menor de efeitos colaterais incapacitantes. A associação precoce com vincristina em dose única (0,02 mg/kg IV) encurta o tempo mediano de recuperação plaquetária para 2,5 a 3 dias.',
      monitoring:
        'Contagem automatizada de plaquetas com confirmação visual obrigatória em esfregaço sanguíneo (afastando pseudotrombocitopenia por agregados em EDTA), hematócrito, pesquisa de sangramento oculto em fezes (melena), petéquias, hematúria e pressão arterial sistêmica.',
      referenceIds: ['ref-acvim-itp-2024', 'ref-plumbs-10ed', 'ref-bsava-10ed'],
      evidenceLevel: 'Consenso Internacional ACVIM de Alto Nível de Evidência (Nível A)',
    },
    {
      id: 'ind-pred-addison',
      indication: 'Reposição Glicocorticoide no Hipoadrenocorticismo (Doença de Addison)',
      clinicalContext: 'Deficiência crônica ou aguda de cortisol endógeno por destruição autoimune da adrenal',
      species: 'both',
      dose: 'Cães estáveis: 0,05 a 0,20 mg/kg/dia VO (maioria < 0,10 mg/kg/dia). Crise aguda: 1 a 2 mg/kg IV lenta (succinato sódico)',
      route: 'Oral matinal para manutenção crônica; Intravenosa lenta no internamento hospitalar da crise',
      frequency: 'Uma vez ao dia (preferencialmente pela manhã)',
      duration: 'Tratamento de manutenção contínuo por toda a vida',
      mechanismOfAction:
        'Substitui fisiologicamente a secreção ausente de cortisol endógeno pela zona fasciculada adrenal, restaurando a permeabilidade e integridade vascular endotelial, a gliconeogênese hepática basal, o apetite e a tolerância cardiovascular ao estresse fisiológico.',
      clinicalRationale:
        'As diretrizes AAHA 2023 destacam que a dose crônica deve ser a menor necessária para manter o animal assintomático, livre de anorexia, letargia e vômitos. Doses excessivas causam sinais iatrogênicos de Cushing (PU/PD marcante, ganho de peso, alopecia). Em períodos de estresse programado (cirurgias, viagens, procedimentos odontológicos, doenças intercorrentes), a dose diária de prednisolona deve ser temporariamente duplicada ou triplicada por 2 a 3 dias.',
      monitoring:
        'Controle clínico do apetite, peso, fezes e energia; eletrólitos séricos (sódio e potássio para titulação do mineralocorticoide associado DOCP); glicemia de jejum; densidade urinária e prevenção de sinais de hiperadrenocorticismo.',
      referenceIds: ['ref-aaha-endocrinopatias-2023', 'ref-plumbs-10ed', 'ref-bsava-10ed'],
      evidenceLevel: 'Diretrizes Clínicas Consensadas AAHA e Literatura Consolidada (Nível B+)',
    },
    {
      id: 'ind-pred-ibd',
      indication: 'Enteropatia Inflamatória Crônica / Doença Inflamatória Intestinal (IBD)',
      clinicalContext: 'Enteropatia linfoplasmocítica, eosinofílica ou perdedora de proteínas com má resposta à dieta',
      species: 'both',
      dose: '1 a 2 mg/kg/dia VO administrado em dose única matinal ou fracionado a cada 12 horas',
      route: 'Oral com alimento',
      frequency: 'A cada 12 a 24 horas',
      duration: 'Indução por 2 a 4 semanas; iniciar titulação lenta de desmame conforme normalização clínica e da albumina',
      mechanismOfAction:
        'Reduz o infiltrado de células mononucleares inflamatórias na lâmina própria intestinal, reprime quimiocinas de mucosa e citocinas que desestabilizam as junções oclusivas enterocitárias, diminuindo a permeabilidade anormal da barreira entérica e a perda proteica.',
      clinicalRationale:
        'Estudo recente de Jablonski et al. (2025) demonstrou que cães com enteropatia perdedora de proteínas (PLE) apresentam exposição e absorção total de prednisolona comparáveis a cães saudáveis, demonstrando que falhas terapêuticas não decorrem de má absorção generalizada do fármaco. Em felinos, Webb & Webb (2022) confirmaram a eficácia clínica da prednisolona oral em gatos com IBD comprovada por biópsia.',
      monitoring:
        'Escore clínico FCEAI (felino) ou CCECAI (canino), peso corporal quinzenal, consistência fecal, episódios de êmese, dosagem de albumina sérica, cobalamina sérica (vitamina B12), folato e urinálise seriada.',
      referenceIds: ['ref-jablonski-2025', 'ref-webb-2022', 'ref-bsava-10ed'],
      evidenceLevel: 'Ensaios Clínicos Veterinários Randomizados e Farmacocinéticos (Nível B+)',
    },
    {
      id: 'ind-pred-alergia',
      indication: 'Dermatopatias Alérgicas, Atopia e Asma Felina (Fase Aguda)',
      clinicalContext: 'Prurido agudo incapacitante, exacerbação de dermatite atópica ou crise broncoespástica felina',
      species: 'both',
      dose: 'Cães: 0,5 a 1,0 mg/kg/dia VO | Gatos: 0,5 a 1,5 mg/kg/dia VO (dividido BID ou SID)',
      route: 'Oral com alimento',
      frequency: 'A cada 12 a 24 horas inicialmente; transicionar para dias alternados (q48h)',
      duration: 'Indução curta de 3 a 7 dias, reduzindo progressivamente para a menor dose em dias alternados',
      mechanismOfAction:
        'Inibe a infiltração de eosinófilos e mastócitos teciduais, bloqueia a liberação de histamina e leucotrienos, diminui a permeabilidade vascular e alivia rapidamente o prurido inflamatório e o edema brônquico.',
      clinicalRationale:
        'A corticoterapia em dermatopatias crônicas não deve ser mantida indefinidamente como monoterapia diária devido ao risco cumulativo de hiperadrenocorticismo iatrogênico. Deve atuar como terapia ponte rápida enquanto se investiga a causa primária e se instituem opções poupadoras como oclacitinibe, lokivetmab ou ciclosporina em cães, ou corticoides inalatórios (fluticasona) na asma felina.',
      monitoring:
        'Escore visual de prurido (PVAS), lesões secundárias de pele (piodermite ou malasseziose), ausculta torácica e esforço respiratório em gatos asmáticos, glicemia e tolerância gastrintestinal.',
      referenceIds: ['ref-bsava-10ed', 'ref-plumbs-10ed'],
      evidenceLevel: 'Formulários Veterinários Padrão-Ouro e Diretrizes Dermatológicas (Nível B+)',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Apresenta absorção gastrointestinal rápida e expressiva após administração oral tanto em cães quanto em gatos. Em cães hígidos, o pico de concentração plasmática (Tmax) ocorre geralmente dentro de 1 a 4 horas pós-administração (Ekstrand et al., 2021). Em felinos domésticos, a biodisponibilidade oral da prednisolona ativa é alta, aproximando-se de 100%, em drástico contraste com a prednisona oral, cuja biodisponibilidade no gato é de apenas 21% (Center et al., 2013). Uma dose oral de 2 mg/kg de prednisolona produz no gato uma exposição plasmática (AUC) aproximadamente 4 vezes superior à gerada pela mesma dose de prednisona. Adicionalmente, gatos com sobrepeso ou obesos apresentam concentrações plasmáticas cerca de 2 vezes maiores que gatos eutróficos com a mesma dose ponderal. Em cães acometidos por enteropatia perdedora de proteínas (PLE), a biodisponibilidade e a AUC plasmática total não diferem significativamente de animais controles saudáveis (Jablonski et al., 2025), indicando absorção entérica preservada mesmo diante de inflamação e edema de mucosa. A administração concomitante de pequena porção de alimento não afeta clinicamente a extensão da absorção e é altamente recomendada para minimizar o desconforto gástrico.',
    distribution:
      'Distribui-se amplamente por todos os tecidos orgânicos devido à sua lipofilicidade moderada (XLogP3 aproximado de 1,6). Em modelos farmacocinéticos caninos de dois compartimentos após injeção intravenosa, o volume de distribuição do compartimento central é de aproximadamente 2,3 L/kg e o periférico de 0,6 L/kg (Ekstrand et al., 2021). A taxa de ligação a proteínas plasmáticas em cães hígidos é de aproximadamente 93,3% (fração livre de 6,7%), ocorrendo principalmente com a albumina e a transcortina (globulina ligadora de corticosteroides). Em cães com enteropatia perdedora de proteínas e hipoalbuminemia acentuada, a fração livre circulante de prednisolona aumenta de forma estatisticamente significante para 15,7% (ligação de 84,3%; P = 0,02), elevando a fração farmacologicamente disponível. A molécula atravessa a barreira placentária e é excretada em pequenas frações no leite materno. A nível celular, os gatos apresentam aproximadamente a metade do número de receptores citosólicos de glicocorticoides em comparação aos cães (23,1 fmol/mg versus 45 fmol/mg no fígado) e menor afinidade de ligação (Kd 3,2 nM vs 0,4 nM; van den Broek & Stafford, 1992).',
    metabolism:
      'A molécula da prednisolona já se encontra em sua conformação molecular ativa, não dependendo de bioativação hepática prévia para exercer seus efeitos terapêuticos. Esta característica a distingue crucialmente da prednisona, que é um pró-fármaco inativo e necessita de conversão hepática pela enzima 11-beta-hidroxiesteroide desidrogenase tipo 1 (11b-HSD1). Sofre biotransformação oxidativa e redutiva no parênquima hepático com posterior conjugação com glicuronídeos e sulfatos antes da depuração. Embora isoenzimas do citocromo P450 (CYP) participem de etapas metabólicas oxidativas, a depuração hepática não é atribuída a uma única isoenzima específica em pequenos animais. Fármacos indutores enzimáticos hepáticos, como o fenobarbital e a fenitoína, aumentam a depuração e reduzem os níveis circulantes de prednisolona. Inibidores enzimáticos, como o cetoconazol e o itraconazol, reduzem o clearance e prolongam a exposição sistêmica ao esteroide.',
    elimination:
      'A eliminação ocorre predominantemente por depuração metabólica tecidual hepática seguida de excreção urinária de metabólitos inativos conjugados, com menos de 2% a 5% da dose original eliminada de forma inalterada pelos rins. O clearance sistêmico experimental no cão é de aproximadamente 1.370 mL/kg/h. A meia-vida plasmática terminal de eliminação no cão é curta, estimada em cerca de 1,7 horas em Beagles saudáveis (Ekstrand et al., 2021) e de 1,3 a 1,8 horas em cães adultos (Jablonski et al., 2025). Em felinos, a meia-vida plasmática também é curta. É imperativo destacar que a meia-vida plasmática curta NÃO reflete a duração da ação terapêutica: a meia-vida biológica e farmacodinâmica da prednisolona é intermediária, variando de 12 a 36 horas, devido à persistência intracelular prolongada das alterações na expressão gênica e na síntese proteica induzidas pelo receptor de glicocorticoides. O pH urinário não exerce impacto clinicamente significativo sobre a velocidade de eliminação.',
    cnsPenetration:
      'Apresenta permeabilidade moderada através da barreira hematoencefálica íntegra devido às suas propriedades lipofílicas, alcançando concentrações terapeuticamente úteis no sistema nervoso central para o manejo de edema vasogênico peritumoral e meningoencefalites de origem desconhecida (MUO), embora não existam coeficientes percentuais de partição líquor/plasma padronizados para parametrização algorítmica.',
    plasmaBinding:
      'Aproximadamente 93% em cães saudáveis, ligada à albumina e transcortina. Em pacientes com hipoalbuminemia acentuada (como na enteropatia perdedora de proteínas), a fração livre terapeuticamente ativa mais que dobra (subindo de 6,7% para 15,7%), aumentando a sensibilidade aos efeitos farmacológicos e aos riscos tóxicos.',
    halfLife:
      'Meia-vida plasmática terminal curta (cerca de 1,7 horas em cães saudáveis). Meia-vida biológica e tecidual intermediária (12 a 36 horas), o que a torna a molécula de escolha para regimes de manutenção em dias alternados (q48h).',
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (Comprimidos Palatáveis, Bissulcados ou Solução em Gotas)',
        technique:
          'Via preferencial de escolha para terapias continuadas ambulatoriais e hospitalares. Pode ser administrada junto com uma pequena porção de alimento para atenuar o potencial ulcerogênico gástrico local sem prejuízo relevante da absorção. Em animais com disfagia, vômitos esporádicos ou gatos com aversão a comprimidos, soluções orais pediátricas humanas (Prelone 3 mg/mL ou Predsim Gotas 11 mg/mL) oferecem ajuste milimétrico de volume.',
        nursingCare:
          'Garantir disponibilidade irrestrita e permanente de água limpa e fresca devido ao efeito polidípsico induzido. Nunca triturar formulações com revestimento entérico se existentes e orientar o tutor a jamais interromper abruptamente administrações mantidas por mais de 14 dias.',
        limitations:
          'Inviável na vigência de êmese incoercível, choque circulatório descompensado, íleo paralítico grave ou inconsciência.',
      },
      {
        route: 'Intravenosa Lenta (Succinato Sódico de Prednisolona Hospitalar)',
        technique:
          'Reservada para situações hospitalares de emergência (crise addisoniana aguda, choque anafilático grave, exacerbação de IMHA fulminante com intolerância gástrica). Utilizar exclusivamente a apresentação hidrossolúvel de succinato sódico de prednisolona (Solu-Delta-Cortef). Diluir o pó liofilizado com o diluente próprio do fabricante (sistema Act-O-Vial) e infundir lentamente por via endovenosa.',
        nursingCare:
          'A solução reconstituída deve ser límpida; qualquer turvação exige descarte imediato. Proteger da luz e utilizar imediatamente após preparo. Monitorar pressão arterial e ritmo cardíaco durante a infusão. Nunca confundir com formulações em suspensão de acetato, estritamente contraindicadas por via endovenosa.',
        limitations:
          'Raridade comercial de apresentações injetáveis veterinárias de succinato no Brasil; ausência de taxa máxima universal de infusão em mg/kg/min validada para hardcode.',
      },
      {
        route: 'Intramuscular (Suspensões ou Soluções Injetáveis)',
        technique:
          'Injeção profunda em grandes massas musculares (músculos lombares epaxiais ou semitendinoso/semimembranoso).',
        nursingCare:
          'Alternar os sítios anatômicos de injeção em administrações repetidas. Observar formação de hematomas locais.',
        limitations:
          'Formalmente contraindicada em pacientes com trombocitopenia imunomediada (ITP) grave, coagulopatias ou diátese hemorrágica pelo risco iminente de grandes hematomas intramusculares compressivos.',
      },
      {
        route: 'Tópica Oftálmica (Acetato de Prednisolona 1% e 0,12%)',
        technique:
          'Instilar 1 gota no saco conjuntival do olho acometido a cada 4 a 12 horas conforme a severidade inflamatória (uveíte anterior não ulcerativa, ceratite estromal imunomediada). Agitar rigorosamente a suspensão oftálmica antes de cada instilação.',
        nursingCare:
          'Realizar teste de fluoresceína obrigatório antes da primeira instilação e periodicamente durante o tratamento.',
        limitations:
          'Estritamente contraindicada na vigência de úlcera corneana ativa superficial ou profunda, pelo risco iminente de liquefação estromal (melting), infecção secundária e perfuração ocular.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Cloreto de Sódio 0,9% (SF 0,9%) — verificar compatibilidade da apresentação específica',
        'Glicose 5% (SG 5%) — compatível com succinato sódico sob uso imediato',
      ],
      incompatibleFluids: [
        'Ringer com Lactato (não presumir compatibilidade direta sem confirmação)',
        'Soluções contendo gluconato de cálcio, metaraminol, metotrexato ou prometazina',
      ],
      infusionRateGuidance:
        'Administrar IV lentamente conforme a bula específica do fabricante e o protocolo hospitalar institucional. Não existe velocidade de infusão máxima universal validada para parametrização matemática fixa no aplicativo.',
      preparationNotes:
        'Após reconstituição do succinato liofilizado, a solução deve ser mantida ao abrigo da luz e aplicada imediatamente. Soluções turvas, com precipitados visíveis ou descoloridas devem ser descartadas sumariamente. Não misturar na mesma seringa ou bureta com outros medicamentos injetáveis.',
      storageRequirements:
        'Comprimidos: conservar em recipientes hermeticamente fechados em temperatura ambiente entre 15 e 30 °C, ao abrigo de luz e umidade excessiva. Soluções orais líquidas: não congelar e manter em frasco âmbar fechado. Pó para injeção: armazenar em temperatura ambiente.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Sensibilidade Farmacodinâmica Aumentada & Isoenzima de Fosfatase Alcalina',
        peculiarity:
          'O cão possui elevada densidade de receptores hepáticos de glicocorticoides (cerca de 45 fmol/mg) com alta afinidade nanomolar (Kd 0,4 nM), tornando a espécie muito responsiva e suscetível aos efeitos adversos clássicos. O cão expressa uma isoenzima hepática exclusiva induzida por corticosteroides (C-ALP), resultando em elevações expressivas de fosfatase alcalina sérica mesmo em tratamentos curtos, acompanhada de glicogenose hepatocelular vacuolar. O antagonismo funcional do ADH nos ductos coletores renais desencadeia precocemente poliúria compensada por polidipsia marcante (PU/PD). O catabolismo proteico com atrofia muscular temporal/epaxial e alopecia simétrica não pruriginosa manifesta-se em tratamentos crônicos.',
      },
      {
        species: 'cat',
        title: 'Resistência ao Esteroide, Necessidade de Prednisolona Ativa & Risco Diabetogênico',
        peculiarity:
          'O gato possui aproximadamente a metade do número de receptores de glicocorticoide encontrados no cão (23,1 fmol/mg no fígado) e menor afinidade de ligação (Kd 3,2 nM), exigindo doses imunossupressoras frequentemente mais altas (2 a 4 mg/kg/dia). Crucialmente, os gatos possuem capacidade de absorção entérica e bioativação hepática da prednisona muito inferiores às do cão, resultando em AUC 4 vezes menor; logo, a prednisona NÃO deve ser utilizada em felinos quando a prednisolona ativa estiver disponível. Gatos não possuem a isoenzima de ALP induzida por corticoide, de modo que elevações de fosfatase alcalina em felinos em corticoterapia sugerem colangio-hepatite ou lipidose hepática real. Gatos são singularmente vulneráveis à hiperglicemia e indução de diabetes mellitus secundário à resistência periférica insulínica.',
      },
    ],

    prescriptionType: {
      category: 'Receituário Simples (Não Sujeito a Controle Especial)',
      ordinanceOrLaw: 'Portaria SVS/MS 344/98 e Instrução Normativa Federal de Medicamentos Isentos',
      retentionRequired: false,
      guidelines:
        'A prednisolona não integra as listas de substâncias sob controle especial no Brasil (não pertence à Lista C1 e não exige Notificação de Receita). É prescrita em receituário veterinário simples em via única para farmácias comerciais humanas ou veterinárias. Não possui prazo de validade de receita restrito a 30 dias por regra de entorpecentes/psicotrópicos, embora se recomende acompanhamento clínico estrito.',
    },

    pharmacologicalClassification: {
      chemicalClass: 'Corticosteroide sintético derivado do pregnano',
      chemicalClassDescription:
        'Molécula esteroidal sintética 11-beta,17-alfa,21-tri-hidroxipregna-1,4-dieno-3,20-diona contendo dupla ligação entre os carbonos 1 e 2 que quadruplica a potência anti-inflamatória em relação ao cortisol e reduz a atividade mineralocorticoide.',
      therapeuticClass: 'Anti-inflamatório esteroidal, imunossupressor, repositor hormonal e antineoplásico',
      therapeuticClassDescription:
        'Agente hormonal modificador da resposta biológica com potente ação inibitória sobre a expressão gênica inflamatória e citocinas imunológicas mediada pelo receptor de glicocorticoides.',
      detailedTargets: [
        {
          target: 'Receptor de Glicocorticoides Citoplasmático (GR / NR3C1)',
          action: 'Agonismo pleno de alta afinidade com dissociação de chaperonas e migração nuclear',
          clinicalSignificance:
            'Alvo molecular mestre primário responsável por toda a cascata de transativação e transrepressão gênica anti-inflamatória e imunológica.',
        },
        {
          target: 'Fatores de Transcrição Inflamatórios NF-kappa-B e AP-1',
          action: 'Transrepressão direta e bloqueio da maquinaria de transcrição pró-inflamatória',
          clinicalSignificance:
            'Interrompe a síntese de IL-1, IL-2, IL-6, TNF-alfa, interferon-gama, COX-2, quimiocinas e moléculas de adesão endotelial.',
        },
        {
          target: 'Fosfolipase A2 (PLA2) / Anexina A1 (Lipocortina-1)',
          action: 'Indução transcricional de anexina A1 com inibição enzimática indireta da PLA2',
          clinicalSignificance:
            'Bloqueia a liberação do ácido araquidônico das membranas celulares, suprimindo simultaneamente a via das prostaglandinas e a dos leucotrienos.',
        },
        {
          target: 'Receptores Fc-gama em Macrófagos Mononucleares',
          action: 'Downregulation e redução expressiva da densidade e avidez dos receptores Fc',
          clinicalSignificance:
            'Impede a fagocitose e lise de hemácias e plaquetas opsonizadas por autoanticorpos no baço e fígado em pacientes com IMHA e ITP.',
        },
        {
          target: 'Eixo Hipotálamo-Hipófise-Adrenal (CRH e ACTH)',
          action: 'Retroalimentação negativa potente e supressão da secreção hormonal',
          clinicalSignificance:
            'Causa atrofia da zona fasciculada e reticular da adrenal em tratamentos superiores a 14 dias, tornando o desmame lento obrigatório.',
        },
        {
          target: 'Vasopressina (ADH) nos Túbulos Coletores Renais',
          action: 'Antagonismo funcional da ação do hormônio antidiurético e redução da permeabilidade aquosa',
          clinicalSignificance:
            'Mecanismo fisiológico primário subjacente à poliúria aquosa precoce e marcante observada na espécie canina.',
        },
      ],
    },
  },

  attentionData: {
    attentionSubtitle: 'Toxicidades Esteroidais, Manejo de Comorbidades, Interações e Protocolos de Desmame',
    adverseEffectsDetailed: [
      {
        effect: 'Poliúria, Polidipsia e Polifagia (PU/PD/PP)',
        frequency: 'common',
        mechanism:
          'Antagonismo funcional periférico dos receptores tubulares renais de ADH (vasopressina) induzindo diurese osmótica aquosa compensada por polidipsia, associada a estímulo direto de centros hipotalâmicos de apetite.',
        clinicalManagement:
          'Garantir água limpa irrestrita para evitar desidratação hipernatrêmica. Orientar controle de ingestão calórica. Reduzir a dose para a menor posologia eficaz em dias alternados assim que a afecção de base permitir.',
      },
      {
        effect: 'Hepatopatia Vacuolar Esteroidal e Aumento de Enzimas Hepáticas (ALP/GGT/ALT)',
        frequency: 'common',
        mechanism:
          'No cão, indução direta da expressão gênica da isoenzima hepática específica de fosfatase alcalina esteroidal (C-ALP) e acúmulo intracelular maciço de glicogênio nos hepatócitos (degeneração vacuolar).',
        clinicalManagement:
          'Interpretar a elevação de fosfatase alcalina no cão no contexto do uso do corticosteroide, diferenciando de colestase biliar obstrutiva real. Em gatos, elevações de ALP NÃO são induzidas por esteroide e exigem investigação de hepatopatia primária.',
      },
      {
        effect: 'Hiperglicemia e Indução ou Descompensação de Diabetes Mellitus',
        frequency: 'common',
        mechanism:
          'Estímulo acentuado da gliconeogênese hepática a partir de aminoácidos mobilizados e inibição da captação periférica de glicose por induzir resistência aos receptores de insulina no tecido muscular e adiposo.',
        clinicalManagement:
          'Monitorar glicemia e glicosúria periodicamente, com atenção redobrada na espécie felina e em pacientes com sobrepeso ou pré-diabéticos. Em diabéticos confirmados, ajustar a insulinoterapia e preferir agentes imunossupressores poupadores.',
      },
      {
        effect: 'Atrofia Muscular, Fraqueza e Alopecia Bilateral Simétrica',
        frequency: 'common',
        mechanism:
          'Ação catabólica proteica sustentada com inibição da síntese de colágeno por fibroblastos e desagregação proteica miofibrilar, com afinamento cutâneo e bloqueio da fase anágena dos folículos pilosos.',
        clinicalManagement:
          'Suporte nutricional hiperproteico equilibrado e fisioterapia motora. Transicionar a posologia para o menor regime posológico em dias alternados (q48h) para atenuar o catabolismo muscular crônico.',
      },
      {
        effect: 'Imunossupressão Oportunista e Infecção Oculta do Trato Urinário',
        frequency: 'uncommon',
        mechanism:
          'Supressão funcional da imunidade celular (linfócitos T, monócitos e macrófagos) e neutralização da febre e dos sinais cardinais de inflamação por bloqueio de citocinas pirogênicas.',
        clinicalManagement:
          'Realizar urinálise seriada acompanhada de urocultura quantitativa com TSA em tratamentos imunossupressores prolongados, uma vez que a ausência de disúria e piúria não afasta bacteriúria clinicamente relevante.',
      },
      {
        effect: 'Erosão, Úlcera Gastroduodenal e Hemorragia Digestiva Alta',
        frequency: 'uncommon',
        mechanism:
          'Aumento da secreção gástrica ácida e péptica associado à inibição da síntese de prostaglandinas citoprotetoras mucosas e redução do turnover celular epitelial, agravado drasticamente por AINEs associados.',
        clinicalManagement:
          'Suspender o fármaco ou reduzir imediatamente a dose diante de melena ou hematêmese. Instituir inibidores de bomba de prótons (omeprazol 1 mg/kg IV/VO BID) e protetores de mucosa (sucralfato). Jamais associar AINEs.',
      },
      {
        effect: 'Supressão do Eixo HHA e Insuficiência Adrenocortical Iatrogênica Pós-Retirada',
        frequency: 'common',
        mechanism:
          'Feedback negativo prolongado sobre o hipotálamo e adeno-hipófise inibindo a síntese de CRH e ACTH, levando à atrofia da zona fasciculada adrenal. A suspensão abrupta deflagra colapso por deficiência aguda de cortisol.',
        clinicalManagement:
          'Realizar desmame gradual lento (cerca de 25% a cada 2 a 4 semanas) em tratamentos mantidos por mais de 14 dias. Em situações de estresse clínico ou cirúrgico agudo durante ou logo após o desmame, administrar dose de reforço.',
      },
    ],

    precautions: [
      {
        condition: 'Associação Concomitante com Anti-inflamatórios Não Esteroidais (AINEs)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A inibição simultânea da ciclo-oxigenase gástrica pelos AINEs somada à supressão da fosfolipase A2 e redução do turnover epitelial pela prednisolona potencializa sinergicamente o risco de perfuração péptica e peritonite séptica letal.',
        clinicalAction:
          'Contraindicação formal estrita. Respeitar período de intervalo de eliminação (washout) de 5 a 7 dias entre a suspensão de um AINE e o início da corticoterapia, salvo em emergências toxicológicas ou anafiláticas sob estrita proteção gástrica.',
      },
      {
        condition: 'Úlcera Corneana Ativa (Via Tópica Oftálmica)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Os corticosteroides tópicos inibem a migração fibroblástica, bloqueiam a reepitelização e ativam metaloproteinases e colagenases estromais, convertendo erosões superficiais em ceratomalácia rápida (melting) e perfuração do globo ocular.',
        clinicalAction:
          'Contraindicação absoluta de formulações oftálmicas contendo corticosteroide na presença de desepitelização corneana. Realizar teste de fluoresceína antes de qualquer prescrição oftálmica.',
      },
      {
        condition: 'Micose Sistêmica e Infecções Bacterianas Graves não Cobertas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A potente ação inibitória sobre macrófagos, células NK e linfócitos T neutraliza as barreiras celulares de contenção de fungos intracelulares (Blastomyces, Cryptococcus, Histoplasma) e microrganismos sépticos invasivos.',
        clinicalAction:
          'Evitar a administração de doses anti-inflamatórias ou imunossupressoras até que a infecção fúngica ou bacteriana esteja sob terapia antimicrobiana direcionada eficaz, salvo em reposição hormonal estrita no hipoadrenocorticismo.',
      },
      {
        condition: 'Diabetes Mellitus Descompensado',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O estímulo à gliconeogênese hepática e o antagonismo dos transportadores periféricos de glicose provocam resistência insulínica severa e descontrole cetoacidótico grave, sobretudo em felinos.',
        clinicalAction:
          'Usar apenas diante de indicação imunomediada ou neoplásica vital sem alternativa terapêutica, escalonando as doses de insulina e implementando monitoramento glicêmico diário por sensores contínuos ou glicemia capilar.',
      },
      {
        condition: 'Doença Renal Crônica (DRC) e Hipertensão Arterial Sistêmica',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A fraca atividade mineralocorticoide pode favorecer retenção hídrica e expansão de volume extracelular, agravando a hipertensão e elevando a pressão intraglomerular com progressão da proteinúria renal.',
        clinicalAction:
          'Monitorar pressão arterial sistólica e relação proteína:creatinina urinária (UPC) quinzenalmente. Não aplicar cortes percentuais automáticos por estágio IRIS sem justificativa hemodinâmica real.',
      },
      {
        condition: 'Trombocitopenia Grave (Via Intramuscular)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A punção de grandes massas musculares sob contagens plaquetárias críticas (< 30.000/mcL) causa laceração vascular com hemorragia incoercível e hematomas compressivos dolorosos de grandes proporções.',
        clinicalAction:
          'Administrar estritamente pelas vias oral ou intravenosa lenta diluída em pacientes com ITP, evitando injeções intramusculares.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica (Estágios IRIS 1 a 4)',
        recommendedAdjustment:
          'Não há algoritmo validado de redução percentual automática por estágio IRIS (ex.: não aplicar -25% ou -50%). Individualizar a dose guiando-se estritamente pela comorbidade.',
        physiologicalRationale:
          'A prednisolona não é eliminada de forma inalterada pela via renal (menos de 5% é excretado inalterado na urina), de modo que a depuração plasmática depende essencialmente da biotransformação hepática. Contudo, nefropatas possuem risco elevado de lesão ulcerativa gástrica urêmica e proteinúria induzida por hiperfiltração intraglomerular, demandando vigilância de pressão arterial e UPC.',
      },
      {
        clinicalCondition: 'Hepatopatias Crônicas e Insuficiência Hepática',
        recommendedAdjustment:
          'Sem percentual fixo pré-determinado de corte. Prescrever estritamente prednisolona ativa e nunca prednisona. Titular para a menor dose eficaz com monitoramento funcional.',
        physiologicalRationale:
          'Pacientes cirróticos ou com insuficiência funcional hepática possuem menor capacidade de converter o pró-fármaco prednisona em prednisolona ativa. Ao prescrever prednisolona pura, garante-se exposição terapêutica sem sobrecarregar a via da 11b-hidroxiesteroide desidrogenase hepática. Deve-se atentar para a hipoalbuminemia, que eleva a fração livre ativa.',
      },
      {
        clinicalCondition: 'Pacientes Geriátricos e Síndrome da Fragilidade',
        recommendedAdjustment:
          'Utilizar a menor dose eficaz pelo menor período de tempo possível, priorizando a transição precoce para terapia em dias alternados (q48h) ou agentes poupadores.',
        physiologicalRationale:
          'Animais idosos possuem menor massa muscular esquelética basal (sarcopenia), redução da densidade óssea trabecular e maior prevalência de infecções urinárias subclínicas e pré-diabetes, sofrendo impacto funcional desproporcional decorrente do catabolismo esteroidal.',
      },
      {
        clinicalCondition: 'Monitoramento Terapêutico de Fármacos (TDM)',
        recommendedAdjustment:
          'Não dosar níveis séricos de prednisolona para fins de ajuste terapêutico (TDM é desprovido de valor prático de rotina).',
        physiologicalRationale:
          'A concentração sérica de prednisolona não reflete a ocupação intracelular dos receptores nucleares nem a intensidade da alteração epigenética e transcricional tecidual. O ajuste deve guiar-se estritamente por marcadores clínicos e laboratoriais da doença tratada (Ht na IMHA, plaquetas na ITP, escore FCEAI na IBD, glicemia e cortisol no Addison).',
      },
      {
        clinicalCondition: 'Protocolo de Desmame Gradual Obrigatório (Tapering)',
        recommendedAdjustment:
          'Regra Geral Padrão-Ouro: Reduzir aproximadamente 25% da dose diária a cada 2 a 4 semanas, condicionado à manutenção comprovada da remissão clínica.',
        physiologicalRationale:
          'Terapias administradas por mais de 10 a 14 dias suprimem o eixo hipotálamo-hipófise-adrenal, resultando em atrofia da zona fasciculada da adrenal. A recuperação da secreção endógena de ACTH e cortisol pode demandar de semanas a meses. O desmame escalonado restaura progressivamente a resposta cortical e culmina na transição para dias alternados (q48h) antes da suspensão final.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Anti-inflamatórios Não Esteroidais (AINEs: Carprofeno, Meloxicam, Firocoxibe, Robenacoxibe)',
        severity: 'contraindicated',
        clinicalEffect:
          'Aumento exponencial do risco de erosões gástricas, hemorragia digestiva alta, melena, úlceras perfurantes e peritonite séptica.',
        pharmacologicalMechanism:
          'Ação sinérgica lesiva: o AINE inibe a COX-1/COX-2 e a síntese de PGE2 gástrica protetora, enquanto a prednisolona inibe a fosfolipase A2, diminui o turnover epitelial e estimula a secreção ácida clorídrica e péptica.',
      },
      {
        drugOrClass: 'Insulinas (NPH, Glargina, Detemir, Regular)',
        severity: 'major',
        clinicalEffect:
          'Perda do controle glicêmico com hiperglicemia refratária e necessidade de expressivo escalonamento da dose insulínica.',
        pharmacologicalMechanism:
          'A prednisolona estimula a gliconeogênese hepática e inibe os transportadores de glicose GLUT-4 no tecido muscular e adiposo, promovendo intensa resistência periférica à insulina.',
      },
      {
        drugOrClass: 'Diuréticos Depletores de Potássio (Furosemida, Torsemida, Hidroclorotiazida) e Anfotericina B',
        severity: 'major',
        clinicalEffect:
          'Risco acentuado de hipocalemia grave, fraqueza muscular, hiporreflexia e arritmias ventriculares cardíacas.',
        pharmacologicalMechanism:
          'Somação de perdas renais de potássio: a atividade mineralocorticoide residual da prednisolona estimula a troca tubular de sódio por potássio no túbulo distal, potencializada pelo bloqueio do transportador Na-K-2Cl ou cotransporte Na-Cl.',
      },
      {
        drugOrClass: 'Digitálicos (Digoxina)',
        severity: 'major',
        clinicalEffect:
          'Aumento acentuado do risco de intoxicação digitálica e arritmias ventriculares potencialmente letais.',
        pharmacologicalMechanism:
          'A hipocalemia decorrente do efeito mineralocorticoide do corticoide potencializa a ligação e a inibição da bomba Na+/K+-ATPase miocárdica pela digoxina, facilitando arritmias ectópicas.',
      },
      {
        drugOrClass: 'Indutores Enzimáticos Hepáticos (Fenobarbital, Fenitoína, Primidona, Rifampicina)',
        severity: 'moderate',
        clinicalEffect:
          'Redução substancial da eficácia anti-inflamatória e imunossupressora da prednisolona por queda nos níveis plasmáticos.',
        pharmacologicalMechanism:
          'Indução das enzimas microssomais oxidativas hepáticas acelerando a depuração metabólica sistêmica da prednisolona livre.',
      },
      {
        drugOrClass: 'Inibidores Enzimáticos Antifúngicos Azóis (Cetoconazol, Itraconazol, Fluconazol)',
        severity: 'moderate',
        clinicalEffect:
          'Elevação dos níveis plasmáticos circulantes de prednisolona com exacerbação precoce de sinais iatrogênicos de Cushing.',
        pharmacologicalMechanism:
          'Inibição de enzimas oxidativas hepáticas do complexo citocromo P450 responsáveis pelo catabolismo e depuração dos corticosteroides.',
      },
      {
        drugOrClass: 'Ciclosporina',
        severity: 'moderate',
        clinicalEffect:
          'Aumento mútuo das concentrações plasmáticas circulantes de ambos os imunossupressores.',
        pharmacologicalMechanism:
          'Competição e inibição recíproca das vias metabólicas oxidativas microssomais hepáticas e transportadores de efluxo (glicoproteína-P).',
      },
    ],
  },

  clinicalStudiesCommented: [
    {
      title: 'Epidermal and Hepatic Glucocorticoid Receptors in Cats and Dogs',
      authorsYear: 'van den Broek AH, Stafford WL (1992)',
      journal: 'Research in Veterinary Science, 52(3):312-315. PMID: 1620963',
      studyDesign: 'Estudo experimental comparativo in vitro de ligação de radioligantes hormonais',
      sampleSize: 'Biópsias teciduais de pele e parênquima hepático de cães e gatos hígidos',
      mainFindings:
        'Cães apresentaram concentração hepática média de receptores de glicocorticoides de 45 ± 10,1 fmol/mg com constante de dissociação Kd de 0,4 ± 0,1 nM. Gatos apresentaram apenas 23,1 ± 10,4 fmol/mg com Kd de 3,2 ± 0,9 nM. Na pele, cães tinham 46,4 fmol/mg versus 23,9 fmol/mg nos gatos.',
      clinicalTakeaway:
        'Comprova a base biológica molecular para a conhecida menor sensibilidade celular dos gatos aos corticosteroides, justificando doses imunossupressoras felinas rotineiramente maiores (2 a 4 mg/kg) do que as caninas.',
      referenceId: 'ref-vandenbroek-1992',
    },
    {
      title: 'Influence of Body Condition on Plasma Prednisolone and Prednisone Concentrations in Cats',
      authorsYear: 'Center SA, Randolph JF, Warner KL, Simpson KW, Rishniw M (2013)',
      journal: 'Research in Veterinary Science, 95(1):225-230. PMID: 23473553',
      studyDesign: 'Ensaio clínico crossover randomizado farmacocinético oral',
      sampleSize: '11 gatos domésticos (5 eutróficos e 6 com sobrepeso)',
      mainFindings:
        'Após dose oral única de 2 mg/kg, a prednisolona produziu uma exposição sistêmica (AUC) à prednisolona ativa aproximadamente 4 vezes superior à gerada pela mesma dose de prednisona. Gatos com sobrepeso apresentaram concentrações plasmáticas cerca de 2 vezes maiores que gatos normais.',
      clinicalTakeaway:
        'Fundamenta a diretriz mandatória de prescrever estritamente prednisolona ativa em gatos, evitando a prednisona pela fraca bioativação oral felina, e alerta para maior exposição em felinos obesos.',
      referenceId: 'ref-center-2013',
    },
    {
      title: 'Prednisolone in Dogs: Plasma Exposure and White Blood Cell Response',
      authorsYear: 'Ekstrand C, Pettersson H, Gehring R, Hedeland M, Adolfsson S, Lilliehook I (2021)',
      journal: 'Frontiers in Veterinary Science, 8:666219. PMID: 34179161',
      studyDesign: 'Ensaio clínico farmacocinético-farmacodinâmico crossover 4 vias',
      sampleSize: '9 cães Beagle adultos sob administrações orais e intravenosas de 1 mg/kg',
      mainFindings:
        'A meia-vida terminal plasmática foi de 1,7 horas com clearance sistêmico de 1.370 mL/kg/h. O leucograma demonstrou aumento de neutrófilos por desmarginação vascular rápida e linfopenia reversível dentro de 24 horas.',
      clinicalTakeaway:
        'Demonstra com rigor que a meia-vida plasmática curta do esteroide não limita a duração clínica de sua resposta tecidual, comprovando o fenômeno de desmarginação leucocitária sem aumento primário de produção mieloide.',
      referenceId: 'ref-ekstrand-2021',
    },
    {
      title: 'Prednisolone Pharmacokinetics in Dogs with Protein-Losing Enteropathy',
      authorsYear: 'Jablonski SA, Strohmeyer JL, Buchweitz JP, Lehner AF, Langlois DK (2025)',
      journal: 'Journal of Veterinary Internal Medicine, 39(1):e17277. PMID: 39715442',
      studyDesign: 'Estudo prospectivo controlado de farmacocinética clínica',
      sampleSize: '14 cães com enteropatia perdedora de proteínas (PLE) e 7 controles sadios',
      mainFindings:
        'A fração livre de prednisolona nos cães com PLE aumentou significativamente para 15,7% comparada a 6,7% nos controles (P = 0,02). Entretanto, a exposição plasmática total (AUC) e o pico de concentração (Cmax) não diferiram entre os grupos.',
      clinicalTakeaway:
        'Comprova que cães com PLE absorvem a prednisolona oral normalmente, demonstrando que falhas terapêuticas não devem ser atribuídas à má absorção intestinal do fármaco, mas à severidade ou refratariedade inflamatória.',
      referenceId: 'ref-jablonski-2025',
    },
    {
      title: 'Comparing Mesenchymal Stem Cells with Prednisolone for Feline Inflammatory Bowel Disease',
      authorsYear: 'Webb TL, Webb CB (2022)',
      journal: 'Journal of Feline Medicine and Surgery, 24(8):e244-e250. PMID: 35713592',
      studyDesign: 'Ensaio clínico randomizado prospectivo controlado cego para o tutor',
      sampleSize: '12 gatos com doença inflamatória intestinal (IBD) confirmada por biópsia',
      mainFindings:
        'Gatos tratados com prednisolona oral (1 a 2 mg/kg/dia com desmame guiado por resposta) apresentaram melhora substancial do escore clínico de atividade enteropática felina (FCEAI médio reduzindo para 3,7 aos 6 meses).',
      clinicalTakeaway:
        'Fornece validação clínica direta e prospectiva para o protocolo padrão de prednisolona oral em doença inflamatória intestinal felina comprovada por biópsia histopatológica.',
      referenceId: 'ref-webb-2022',
    },
  ],

  presentations: [
    {
      id: 'pres-preditabs-5',
      label: 'Preditabs® 5 mg (Biovet — Caixa com 10 ou 20 Comprimidos Bissulcados)',
      brand: 'Preditabs® (Biovet / Vencofarma)',
      form: 'Comprimido bissulcado palatável',
      concentrationValue: 5,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Blíster com 10 ou 20 comprimidos bissulcados para cães e gatos',
      route: 'Oral',
      channel: 'veterinary_pharmacy',
      packageDescription: 'Comprimido de 5 mg permitindo divisão precisa em metades (2,5 mg)',
      calculatedMlPerKgFormula: 'Dose total (mg) / 5 = Número de comprimidos',
    },
    {
      id: 'pres-preditabs-20',
      label: 'Preditabs® 20 mg (Biovet — Blíster com 10 Comprimidos Bissulcados)',
      brand: 'Preditabs® (Biovet / Vencofarma)',
      form: 'Comprimido bissulcado palatável',
      concentrationValue: 20,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Cartucho com 10 comprimidos bissulcados para animais médios e grandes',
      route: 'Oral',
      channel: 'veterinary_pharmacy',
      packageDescription: 'Comprimido de 20 mg com sulco central (divisível em 10 mg)',
      calculatedMlPerKgFormula: 'Dose total (mg) / 20 = Número de comprimidos',
    },
    {
      id: 'pres-prediderm-5',
      label: 'Prediderm® 5 mg (Ourofino — Cartucho com 10 Comprimidos Palatáveis)',
      brand: 'Prediderm® (Ourofino Saúde Animal)',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 5,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Caixa com 10 comprimidos palatáveis registrados no MAPA nº 9.577 para cães',
      route: 'Oral',
      channel: 'veterinary_pharmacy',
      packageDescription: 'Comprimido palatável de 5 mg',
      calculatedMlPerKgFormula: 'Dose total (mg) / 5 = Número de comprimidos',
    },
    {
      id: 'pres-prediderm-20',
      label: 'Prediderm® 20 mg (Ourofino — Cartucho com 10 Comprimidos Palatáveis)',
      brand: 'Prediderm® (Ourofino Saúde Animal)',
      form: 'Comprimido palatável bissulcado',
      concentrationValue: 20,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Caixa com 10 comprimidos palatáveis registrados no MAPA nº 9.578 para cães',
      route: 'Oral',
      channel: 'veterinary_pharmacy',
      packageDescription: 'Comprimido palatável de 20 mg',
      calculatedMlPerKgFormula: 'Dose total (mg) / 20 = Número de comprimidos',
    },
    {
      id: 'pres-prelone-sol-3',
      label: 'Prelone® Solução Oral 3 mg/mL (Aché — Frascos com 60 mL ou 120 mL e Seringa Dosadora)',
      brand: 'Prelone® (Aché Laboratórios — Linha Humana)',
      form: 'Solução oral líquida com aroma agradável',
      concentrationValue: 3,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco de vidro âmbar com 60 mL ou 120 mL com seringa dosadora em mL',
      route: 'Oral',
      channel: 'human_pharmacy',
      packageDescription: 'Solução oral de 3 mg/mL (1 mL = 3 mg de prednisolona base)',
      calculatedMlPerKgFormula: 'Dose total (mg) / 3 = Volume a administrar em mL',
    },
    {
      id: 'pres-predsim-gotas-11',
      label: 'Predsim® Gotas 11 mg/mL (Cosmed / Hypera — Frasco Conta-Gotas 20 mL)',
      brand: 'Predsim® Gotas (Cosmed — Referência Humana)',
      form: 'Suspensão oral em gotas',
      concentrationValue: 11,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco conta-gotas com 20 mL (bula do fabricante: 1 mL = 20 gotas = 0,55 mg/gota)',
      route: 'Oral',
      channel: 'human_pharmacy',
      packageDescription: 'Gotas orais (1 gota = 0,55 mg de prednisolona)',
      calculatedMlPerKgFormula: 'Dose total (mg) / 0,55 = Número de gotas a administrar',
    },
    {
      id: 'pres-solu-delta-cortef-100',
      label: 'Solu-Delta-Cortef® 100 mg (Zoetis — Frasco-Ampola Act-O-Vial com Diluente Estéril)',
      brand: 'Solu-Delta-Cortef® (Zoetis — Uso Hospitalar)',
      form: 'Pó liofilizado com diluente integrado para injeção',
      concentrationValue: 100,
      concentrationUnit: 'mg/frasco',
      packInfo: 'Sistema Act-O-Vial de 10 mL contendo succinato sódico de prednisolona liofilizado',
      route: 'Intravenosa lenta (após reconstituição imediata)',
      channel: 'veterinary_pharmacy',
      packageDescription: 'Frasco de 100 mg para emergências hospitalares',
      calculatedMlPerKgFormula: 'Dose total (mg) / 10 = Volume reconstituído a 10 mg/mL em mL',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Tabela prática exemplificativa calculada para o regime anti-inflamatório inicial canino de 0,5 mg/kg por via oral. AVISO CLÍNICO OBRIGATÓRIO: Esta tabela destina-se exclusivamente ao regime anti-inflamatório de 0,5 mg/kg. NÃO serve para imunossupressão (2 a 4 mg/kg) nem para reposição fisiológica (< 0,1 mg/kg). Para cães e gatos pequenos, a solução oral em mL (Prelone 3 mg/mL) garante dosagem substancialmente mais exata do que o fracionamento de comprimidos.',
    headers: [
      'Peso do Paciente',
      'Dose Total (0,5 mg/kg)',
      'Prelone 3 mg/mL (mL)',
      'Predsim Gotas (0,55 mg/gota)',
      'Comprimidos 5 mg',
      'Comprimidos 20 mg',
    ],
    rows: [
      {
        weight: '2 kg (Gato Peq / Cão Mini)',
        totalDose: '1,0 mg',
        col1: '0,33 mL',
        col2: '≈ 2 gotas (1,1 mg)',
        col3: '0,2 comp. (impraticável)',
        col4: 'Impraticável',
      },
      {
        weight: '3 kg (Gato Médio)',
        totalDose: '1,5 mg',
        col1: '0,50 mL',
        col2: '≈ 3 gotas (1,65 mg)',
        col3: '1/4 comprimido (1,25 mg)',
        col4: 'Impraticável',
      },
      {
        weight: '4 kg (Gato Adulto / Cão Mini)',
        totalDose: '2,0 mg',
        col1: '0,67 mL',
        col2: '≈ 4 gotas (2,2 mg)',
        col3: '0,4 comp. (impraticável)',
        col4: 'Impraticável',
      },
      {
        weight: '5 kg (Cão Pequeno / Gato Grande)',
        totalDose: '2,5 mg',
        col1: '0,83 mL',
        col2: '≈ 5 gotas (2,75 mg)',
        col3: '1/2 comprimido (2,5 mg)',
        col4: 'Impraticável',
      },
      {
        weight: '10 kg (Cão Pequeno / Médio)',
        totalDose: '5,0 mg',
        col1: '1,67 mL',
        col2: '≈ 9 gotas (4,95 mg)',
        col3: '1 comprimido inteiro',
        col4: '1/4 comprimido (5 mg)',
      },
      {
        weight: '15 kg (Cão Médio)',
        totalDose: '7,5 mg',
        col1: '2,50 mL',
        col2: '≈ 14 gotas (7,7 mg)',
        col3: '1 + 1/2 comprimido',
        col4: 'Impraticável',
      },
      {
        weight: '20 kg (Cão Médio / Grande)',
        totalDose: '10,0 mg',
        col1: '3,33 mL',
        col2: '≈ 18 gotas (9,9 mg)',
        col3: '2 comprimidos de 5 mg',
        col4: '1/2 comprimido de 20 mg',
      },
      {
        weight: '30 kg (Cão Grande)',
        totalDose: '15,0 mg',
        col1: '5,00 mL',
        col2: '≈ 27 gotas (14,8 mg)',
        col3: '3 comprimidos de 5 mg',
        col4: '3/4 comprimido (15 mg)',
      },
      {
        weight: '40 kg (Cão Gigante)',
        totalDose: '20,0 mg',
        col1: '6,67 mL',
        col2: '≈ 36 gotas (19,8 mg)',
        col3: '4 comprimidos de 5 mg',
        col4: '1 comprimido inteiro de 20 mg',
      },
    ],
  },

  samplePrescriptionText:
    'USO VETERINÁRIO — RECEITUÁRIO SIMPLES\n\nPaciente: [Nome do Animal] | Espécie: [Canina / Felina] | Peso: [XX] kg\nTutor: [Nome do Tutor]\n\n1. PREDNISOLONA [Apresentação Selecionada: 5 mg / 20 mg / Solução 3 mg/mL] ............ [X frascos ou caixas]\n   Administrar por via oral a dose de [X] mg (equivalente a [X] comprimido(s) ou [X] mL da solução) a cada [12 / 24] horas, durante [X] dias.\n\nORIENTAÇÕES ESSENCIAIS DE SEGURANÇA AO TUTOR:\n- Administrar preferencialmente junto a uma pequena porção de alimento para minimizar o desconforto gástrico.\n- Não associar outros anti-inflamatórios (como meloxicam, carprofeno, cetoprofeno) nem aspirina sem autorização expressa do médico-veterinário (risco grave de úlcera gástrica e hemorragia).\n- Garantir água limpa e fresca à vontade em recipientes de fácil acesso, pois é esperado aumento da sede e do volume urinário (poliúria e polidipsia).\n- NUNCA interromper este medicamento repentinamente se o tratamento tiver duração superior a 14 dias. A redução da dose (desmame) deve ser feita gradualmente sob supervisão profissional para evitar insuficiência hormonal adrenal.\n- Notificar imediatamente a clínica veterinária diante de vômitos escuros com aspecto de borra de café, fezes pretas e pastosas (melena), fraqueza acentuada ou febre.',

  references: [
    {
      id: 'ref-plumbs-10ed',
      citationText:
        'Plumb DC. Plumb’s Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. Monografia “PrednisoLONE/Prednisone/PrednisoLONE Sodium Succinate”, pp. 1058–1063.',
      sourceType: 'Formulário terapêutico padrão-ouro internacional',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781394176106',
      evidenceLevel: 'Compêndio padrão-ouro veterinário global',
    },
    {
      id: 'ref-bsava-10ed',
      citationText:
        'British Small Animal Veterinary Association (BSAVA). Small Animal Formulary, Part A: Canine and Feline. 10th ed. Gloucester: BSAVA; 2020. Monografia “Prednisolone”, pp. 340–341.',
      sourceType: 'Formulário veterinário britânico de pequenos animais',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
      evidenceLevel: 'Formulário terapêutico institucional consagrado',
    },
    {
      id: 'ref-nelson-couto-cap72',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 72: Treatment of Primary Immune-Mediated Diseases, pp. 1221–1223.',
      sourceType: 'Tratado de medicina interna veterinária',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
      evidenceLevel: 'Tratado de referência em medicina interna',
    },
    {
      id: 'ref-acvim-imha-2019',
      citationText:
        'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172.',
      sourceType: 'Consenso de especialistas do colégio americano',
      url: 'https://doi.org/10.1111/jvim.15463',
      evidenceLevel: 'Consenso Internacional ACVIM de Alto Nível de Evidência (Nível A)',
    },
    {
      id: 'ref-acvim-itp-2024',
      citationText:
        'Fellman CL, Mackin AJ, Giger U, et al. ACVIM consensus statement on the diagnosis and treatment of immune-mediated thrombocytopenia in dogs. J Vet Intern Med. 2024;38(4):1955-1979.',
      sourceType: 'Consenso de especialistas do colégio americano',
      url: 'https://doi.org/10.1111/jvim.17079',
      evidenceLevel: 'Consenso Internacional ACVIM de Alto Nível de Evidência (Nível A)',
    },
    {
      id: 'ref-aaha-endocrinopatias-2023',
      citationText:
        'Behrend EN, Greco DS, Ward CR, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):107-135.',
      sourceType: 'Diretrizes clínicas consensadas',
      url: 'https://doi.org/10.5326/JAAHA-MS-7368',
      evidenceLevel: 'Diretrizes Clínicas Consensadas AAHA (Nível B+)',
    },
    {
      id: 'ref-vandenbroek-1992',
      citationText:
        'van den Broek AH, Stafford WL. Epidermal and hepatic glucocorticoid receptors in cats and dogs. Res Vet Sci. 1992;52(3):312-315.',
      sourceType: 'Estudo experimental comparativo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1620963/',
      evidenceLevel: 'Estudo biológico comparativo padrão de referência',
    },
    {
      id: 'ref-center-2013',
      citationText:
        'Center SA, Randolph JF, Warner KL, Simpson KW, Rishniw M. Influence of body condition on plasma prednisolone and prednisone concentrations in clinically healthy cats after single oral dose administration. Res Vet Sci. 2013;95(1):225-230.',
      sourceType: 'Ensaio clínico crossover farmacocinético',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23473553/',
      evidenceLevel: 'Ensaio farmacocinético cruzado padrão-ouro em felinos',
    },
    {
      id: 'ref-ekstrand-2021',
      citationText:
        'Ekstrand C, Pettersson H, Gehring R, Hedeland M, Adolfsson S, Lilliehook I. Prednisolone in Dogs: Plasma Exposure and White Blood Cell Response. Front Vet Sci. 2021;8:666219.',
      sourceType: 'Ensaio clínico farmacocinético-farmacodinâmico',
      url: 'https://doi.org/10.3389/fvets.2021.666219',
      evidenceLevel: 'Estudo farmacocinético-farmacodinâmico prospectivo',
    },
    {
      id: 'ref-jablonski-2025',
      citationText:
        'Jablonski SA, Strohmeyer JL, Buchweitz JP, Lehner AF, Langlois DK. Prednisolone pharmacokinetics in dogs with protein-losing enteropathy. J Vet Intern Med. 2025;39(1):e17277.',
      sourceType: 'Estudo clínico prospectivo controlado',
      url: 'https://doi.org/10.1111/jvim.17277',
      evidenceLevel: 'Estudo prospectivo controlado de farmacocinética clínica',
    },
    {
      id: 'ref-webb-2022',
      citationText:
        'Webb TL, Webb CB. Comparing adipose-derived mesenchymal stem cells with prednisolone for the treatment of feline inflammatory bowel disease. J Feline Med Surg. 2022;24(8):e244-e250.',
      sourceType: 'Ensaio clínico randomizado cego',
      url: 'https://doi.org/10.1177/1098612X221104053',
      evidenceLevel: 'Ensaio clínico randomizado controlado em felinos',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Gatos: Usar Sempre Prednisolona e Evitar Prednisona',
      text: 'Gatos absorvem e convertem a prednisona de forma muito ineficiente, resultando em exposição plasmática 4 vezes menor à forma ativa (Center et al., 2013). Sempre prescrever prednisolona ativa.',
    },
    {
      label: 'Diferenciação Radical de Doses',
      text: 'Prednisolona possui 4 faixas posológicas totalmente distintas: reposição adrenal (< 0,1 mg/kg) << anti-inflamatório (0,5 a 1 mg/kg) << imunossupressor (2 a 4 mg/kg) << antineoplásico linfolítico.',
    },
    {
      label: 'Desmame Obrigatório após Uso Contínuo > 14 Dias',
      text: 'O uso diário por mais de 10 a 14 dias causa atrofia da zona fasciculada adrenal por supressão de ACTH. A retirada abrupta deflagra insuficiência adrenal iatrogênica potencialmente letal.',
    },
    {
      label: 'Contraindicação com AINEs e Úlcera Corneana',
      text: 'A associação com AINEs causa perfuração péptica grave. A via oftálmica é estritamente contraindicada na presença de desepitelização corneana pelo risco de melting e perfuração do globo.',
    },
  ],

  indications: [
    'Terapia anti-inflamatória em dermatopatias alérgicas, atopia, hipersensibilidade alimentar e prurido agudo.',
    'Imunossupressão padrão-ouro em anemia hemolítica imunomediada (IMHA) e trombocitopenia imunomediada (ITP).',
    'Tratamento imunossupressor e anti-inflamatório da doença inflamatória intestinal (IBD) e enteropatias crônicas.',
    'Reposição glicocorticoide fisiológica na insuficiência adrenocortical primária ou secundária (Doença de Addison).',
    'Componente antineoplásico linfolítico em protocolos de quimioterapia para linfoma (L-CHOP, COP) e mastocitoma.',
    'Manejo anti-inflamatório de laringite, colapso traqueal inflamatório, asma felina e meningoencefalites responsivas a esteroide.',
  ],

  contraindications: [
    'Administração concomitante com anti-inflamatórios não esteroidais (AINEs) ou ácido acetilsalicílico.',
    'Aplicação tópica oftálmica na vigência de ceratite ulcerativa ativa ou erosão corneana com fluoresceína positiva.',
    'Micoses sistêmicas graves (blastomicose, criptococose, histoplasmose) salvo reposição fisiológica no hipoadrenocorticismo.',
    'Administração por via intramuscular profunda em animais com trombocitopenia grave ou coagulopatias.',
    'Infecções bacterianas sépticas agudas ativas na ausência de antibioticoterapia bactericida apropriada de cobertura.',
    'Uso de vacinas de vírus vivo atenuado durante a vigência de corticoterapia em doses imunossupressoras.',
  ],

  cautions: [
    'Em gatos, utilizar estritamente prednisolona ativa e não prednisona, pela ineficiência de bioativação oral felina.',
    'Gatos com sobrepeso apresentam exposição plasmática duplicada, exigindo titulação ponderal cautelosa.',
    'Diabetes mellitus: a prednisolona induz resistência periférica à insulina e estimula a gliconeogênese, exigindo monitoramento.',
    'Doença renal crônica com proteinúria ou hipertensão arterial sistêmica exige vigilância periódica de PA e UPC.',
    'Uso prolongado acima de 14 dias exige protocolo de desmame escalonado de cerca de 25% a cada 2 a 4 semanas.',
    'Avaliação seriada de urinálise e urocultura quantitativa em animais sob imunossupressão prolongada.',
  ],

  adverseEffects: [
    'Poliúria, polidipsia e polifagia marcantes decorrentes do antagonismo tubular do ADH e estímulo hipotalâmico.',
    'Elevação da fosfatase alcalina sérica (ALP induzida por corticoide) e degeneração vacuolar glicogênica hepatocelular em cães.',
    'Atrofia muscular temporal e epaxial, letargia e fraqueza decorrentes do catabolismo proteico miofibrilar crônico.',
    'Alopecia simétrica bilateral não pruriginosa, comedões e fragilidade com afinamento cutâneo em terapias sustentadas.',
    'Hiperglicemia dose-dependente com risco de desencadear diabetes mellitus manifesto, especialmente em felinos.',
    'Erosões gastroduodenais, vômitos esporádicos, diarreia, fezes escuras (melena) ou gastrite inflamatória.',
  ],

  routes: [
    'por via oral (comprimidos palatáveis ou solução oral com alimento)',
    'por via intravenosa lenta (succinato sódico reconstituído hospitalar)',
    'por via tópica oftálmica (suspensão oftálmica a 0,12% ou 1% estéril)',
  ],

  doses: [
    {
      id: 'dose-pred-dog-anti',
      species: 'dog',
      indication: 'Anti-inflamatório e Antialérgico Geral',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h–q24h',
      duration: '3 a 7 dias inicialmente; transicionar para dias alternados (q48h) na menor dose de controle.',
      notes:
        'Administrar com alimento. Não exceder 40 mg no total por cão em raças grandes. Reduzir para dias alternados assim que possível.',
      calculatorEnabled: true,
      presentationId: 'pres-preditabs-5',
    },
    {
      id: 'dose-pred-cat-anti',
      species: 'cat',
      indication: 'Anti-inflamatório e Antialérgico Felino',
      doseMin: 0.5,
      doseMax: 1.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h–q24h',
      duration: 'Indução curta por 3 a 5 dias; reduzir gradualmente para 0,5 mg/kg em dias alternados (q48h).',
      notes:
        'Usar estritamente prednisolona ativa e não prednisona. Gatos requerem doses anti-inflamatórias ligeiramente superiores às dos cães.',
      calculatorEnabled: true,
      presentationId: 'pres-prelone-sol-3',
    },
    {
      id: 'dose-pred-dog-imuno',
      species: 'dog',
      indication: 'Imunossupressão Padrão (IMHA, ITP, Pênfigo, Poliartrite)',
      doseMin: 2.0,
      doseMax: 3.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h ou q24h',
      duration: 'Manter dose de ataque por 1 a 2 semanas até estabilização do Ht/plaquetas; reduzir ~25% a cada 3 semanas por 3 a 6 meses.',
      notes:
        'Consenso ACVIM: para cães > 25 kg, calcular por superfície corporal (50 a 60 mg/m2/dia) ou teto de 60-80 mg/dia para limitar toxicidade.',
      calculatorEnabled: true,
      presentationId: 'pres-preditabs-20',
    },
    {
      id: 'dose-pred-cat-imuno',
      species: 'cat',
      indication: 'Imunossupressão Felina (IMHA, ITP, Pênfigo, Complexo Eosinofílico)',
      doseMin: 2.0,
      doseMax: 4.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q12h ou q24h',
      duration: 'Manter indução até remissão completa e desmamar progressivamente ao longo de 2 a 4 meses até regime em dias alternados.',
      notes:
        'Gatos possuem metade da densidade de receptores GR e menor afinidade, justificando dose inicial de 2 a 4 mg/kg/dia. Monitorar glicemia.',
      calculatorEnabled: true,
      presentationId: 'pres-prelone-sol-3',
    },
    {
      id: 'dose-pred-reposicao',
      species: 'dog',
      indication: 'Reposição Glicocorticoide Crônica no Hipoadrenocorticismo (Addison)',
      doseMin: 0.05,
      doseMax: 0.20,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h (pela manhã)',
      duration: 'Contínuo por toda a vida associado à reposição mineralocorticoide com DOCP ou fludrocortisona.',
      notes:
        'Diretrizes AAHA 2023: a maioria dos cães estáveis requer < 0,10 mg/kg/dia. Duplicar temporariamente em situações de estresse clínico.',
      calculatorEnabled: true,
      presentationId: 'pres-predsim-gotas-11',
    },
    {
      id: 'dose-pred-cat-reposicao',
      species: 'cat',
      indication: 'Reposição Glicocorticoide Felina no Hipoadrenocorticismo',
      doseMin: 0.10,
      doseMax: 0.20,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h (pela manhã)',
      duration: 'Contínuo por toda a vida associado a DOCP.',
      notes:
        'Afecção rara em gatos; titular para a menor dose matinal que previna hiporexia e depressão.',
      calculatorEnabled: true,
      presentationId: 'pres-prelone-sol-3',
    },
    {
      id: 'dose-pred-dog-onc',
      species: 'dog',
      indication: 'Quimioterapia Linfolítica / Protocolos Antineoplásicos (Linfoma)',
      doseMin: 2.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: 'Conforme protocolo oncológico específico (ex.: protocolo de indução L-CHOP semanas 1 a 4).',
      notes:
        'Administrar estritamente conforme protocolo do oncologista veterinário; escalonamento de desmame conforme avanço dos ciclos quimioterápicos.',
      calculatorEnabled: true,
      presentationId: 'pres-preditabs-20',
    },
  ],
};
