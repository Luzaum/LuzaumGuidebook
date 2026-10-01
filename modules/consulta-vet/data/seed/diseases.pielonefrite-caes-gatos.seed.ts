import { DiseaseRecord } from '../../types/disease';
import { getPlainLanguageForSlug } from './diseasePlainLanguage';

export const pielonefriteCaesGatosRecord: DiseaseRecord = {
  id: 'disease-pielonefrite-caes-gatos',
  slug: 'pielonefrite-caes-gatos',
  title: 'Pielonefrite em Cães e Gatos (Pielonefrite Bacteriana / Fúngica)',
  subtitle: 'Consenso Delphi 2026 (Weese et al.), Diretrizes ISCAID 2019, Nelson & Couto e Biomarcadores de Inflamação Sistêmica',
  synonyms: [
    'Pielonefrite canina',
    'Pielonefrite felina',
    'Pielonefrite bacteriana em cães e gatos',
    'Pielonefrite fúngica',
    'Infecção do trato urinário superior',
    'Pielonefrose bacteriana',
    'Pielite bacteriana',
    'Bacterial pyelonephritis in dogs and cats',
    'Upper urinary tract infection',
  ],
  species: ['dog', 'cat'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'infectologia',
    'urgencia-emergencia',
    'clinica-medica',
  ],
  tags: [
    'Pielonefrite',
    'Pielonefrite Canina',
    'Pielonefrite Felina',
    'Consenso Delphi 2026',
    'Weese 2026',
    'ISCAID 2019',
    'Pielonefrose',
    'Urosepse',
    'Pielocentese',
    'Breakpoints Plasmáticos',
    'SAA Felina',
    'CRP Canina',
    'Obstrução Ureteral',
    'SUB e Stent',
    'Bouillon 2018',
    'Quimby 2017',
    'Nelson & Couto',
    'iCatCare 2025',
  ],
  quickSummary:
    'A pielonefrite é a infecção bacteriana ou fúngica que acomete simultaneamente a pelve e o parênquima renal, originando-se predominantemente por via ascendente a partir do trato urinário inferior. Padronizada pelo Consenso Internacional Delphi de 2026 (Weese et al.) e pelas diretrizes terapêuticas da ISCAID 2019, a abordagem diagnóstica contemporânea estabelece que urocultura positiva isolada da bexiga NÃO confirma pielonefrite; a forma presumida exige obrigatoriamente a tríade de cultura positiva associada a evidências de inflamação sistêmica (febre, leucocitose/desvio ou proteínas de fase aguda elevadas: SAA em gatos e CRP em cães) e envolvimento renal (azotemia nova ou agravada, dor lombar ou alterações de imagem). A confirmação diagnóstica definitiva requer cultura positiva de urina pélvica obtida por pielocentese ou histopatologia. A tríade clássica (febre, dor renal e bacteriúria) possui baixa sensibilidade: 38% dos cães e a vasta maioria dos felinos exibem apresentações frustras ou silenciosas (anorexia, vômitos, letargia e piora inexplicada de DRC prévia). Em gatos com obstrução ureteral, até 57% dos animais com pelve infectada apresentam cultura vesical estéril (falso-negativo pela oclusão do ureter). Farmacologicamente, a regra de ouro determina o uso mandatório de breakpoints de susceptibilidade séricos/plasmáticos (e NÃO urinários), uma vez que o alvo terapêutico é o tecido e o interstício renal profundo (contraindicando nitrofurantoína). A antibioticoterapia empírica deve cobrir Enterobacterales (UPEC) com fluoroquinolonas veterinárias (respeitando o limite estrito de 5 mg/kg/dia de enrofloxacina em gatos para evitar retinotoxicidade e cegueira) por 10 a 14 dias. A pielonefrose obstrutiva e a urosepse exigem descompressão mecânica emergencial (SUB ou stent) e suporte hemodinâmico intensivo.',

  quickSummaryRich: {
    lead:
      'A pielonefrite é a infecção grave que atinge a pelve e o parênquima renal, exigindo diferenciação estrita de cistite e bacteriúria subclínica pelo Consenso Delphi 2026. A urocultura vesical isolada não confirma o diagnóstico; requer-se inflamação sistêmica demonstrada (SAA felina ou CRP canina) e envolvimento renal. O tratamento tem como mandamento farmacológico central o uso de breakpoints plasmáticos teciduais por 10 a 14 dias, associando descompressão cirúrgica precoce (SUB/stent) diante de obstrução ou pielonefrose.',
    pillars: [
      {
        title: 'Nova Terminologia Consensual (Delphi 2026)',
        body:
          'A infecção acomete simultaneamente pelve e parênquima renal. Urocultura vesical positiva isolada não define pielonefrite; a forma presumida exige inflamação sistêmica demonstrada (SAA em gatos, CRP em cães) e envolvimento renal funcional ou de imagem.',
        highlights: ['Delphi 2026', 'pelve e parênquima', 'urocultura isolada não define', 'inflamação sistêmica'],
      },
      {
        title: 'Apresentação Clínica Frustra e Falso-Negativo em Gatos',
        body:
          'A clássica tríade de febre e dor lombar ocorre em menos de 21% dos cães e é excepcional em felinos. Em gatos com ureter obstruído por cálculo, até 57% dos animais com pelve infectada apresentam cultura vesical estéril por bloqueio mecânico da descida bacteriana.',
        highlights: ['tríade clássica ausente', 'apresentação sutil', 'cultura vesical negativa 57%', 'obstrução ureteral'],
      },
      {
        title: 'Mandamento Farmacológico: Breakpoints Plasmáticos',
        body:
          'Interpretar o antibiograma exclusivamente por breakpoints séricos/plasmáticos, pois o alvo terapêutico é o tecido e interstício renal profundo. A nitrofurantoína é formalmente contraindicada. Duração contemporânea de 10 a 14 dias (ISCAID 2019).',
        highlights: ['breakpoints plasmáticos', 'tecido renal profundo', 'nitrofurantoína contraindicada', '10 a 14 dias'],
      },
      {
        title: 'Pielonefrose e Descompressão de Urgência (Source Control)',
        body:
          'Coleção purulenta sob pressão em trato urinário obstruído não responde a antimicrobianos isolados. A descompressão cirúrgica de urgência (derivação ureteral subcutânea - SUB ou stent) é mandatória para restaurar a filtração e salvar o rim.',
        highlights: ['pielonefrose sob pressão', 'source control cirúrgico', 'SUB e stent ureteral', 'descompressão urgente'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Integrado e Biomarcadores (Consenso Delphi 2026)',
      steps: [
        {
          label: 'Passo 1: Triagem de Sinais Clínicos e Identificação de Risco',
          detail: 'Triagem de sinais clínicos e estratificação de risco (investigar urolitíase, comorbidades, DM, HAC e DRC prévia descompensada).',
          timing: 'Admissão imediata',
        },
        {
          label: 'Passo 2: Urinálise e Urocultura Pré-Antimicrobiano',
          detail: 'Coleta imediata de urina por cistocentese estéril antes de qualquer dose antimicrobiana para urinálise completa e urocultura quantitativa com antibiograma.',
          timing: 'Antes do antibiótico',
        },
        {
          label: 'Passo 3: Painel Bioquímico e Hematológico Completo',
          detail: 'Avaliação laboratorial sistêmica completa: creatinina sérica, ureia, hemograma com contagem de neutrófilos em bastão e eletrólitos.',
          timing: 'Primeira hora',
        },
        {
          label: 'Passo 4: Biomarcadores de Fase Aguda (SAA / CRP)',
          detail: 'Dosagem de biomarcadores de fase aguda: Serum Amyloid A (SAA) em gatos (cutoff 49,1 mg/L) e Proteína C-Reativa (CRP) em cães para comprovar inflamação sistêmica.',
          timing: 'Triagem laboratorial',
        },
        {
          label: 'Passo 5: Ultrassonografia Urinária Completa e POCUS',
          detail: 'Ultrassonografia do trato urinário completo: rastrear pieloectasia, perda de diferenciação corticomedular, debris piélicos, espessamento ureteral proximal e urólitos obstrutivos.',
          timing: 'Primeiras 2 a 4 horas',
        },
        {
          label: 'Passo 6: Pielocentese Ecoguiada em Obstrução ou Discordância',
          detail: 'Pielocentese ecoguiada seletiva: indicada em rins com pelve dilatada (> 3-4 mm), suspeita de pielonefrose obstrutiva, urocultura vesical negativa discordante ou falha terapêutica.',
          timing: 'Indicação específica',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Escalonado e Farmacologia Tecidual (ISCAID 2019)',
      steps: [
        {
          label: 'Passo 1: Estratificação Hemodinâmica e Via de Acesso',
          detail: 'Estratificação hemodinâmica: pacientes sistêmicos instáveis, desidratados, anoréxicos ou com azotemia exigem internação imediata e terapia parenteral (IV); pacientes hígidos e normofágicos iniciam via oral.',
          timing: 'Imediato',
        },
        {
          label: 'Passo 2: Antibioticoterapia Empírica Parenteral Precoce',
          detail: 'Antibioticoterapia empírica parenteral precoce na primeira hora contra Enterobacterales (UPEC): fluoroquinolona veterinária (marbofloxacina, pradofloxacina ou enrofloxacina em dose segura) ou cefalosporina de 3ª geração (cefotaxima/ceftriaxona).',
          timing: 'Na 1ª hora de internação',
        },
        {
          label: 'Passo 3: Fluidoterapia Restritiva Balanceada',
          detail: 'Fluidoterapia restritiva e balanceada: restaurar euvolemia com Ringer Lactato ou Plasma-Lyte sem praticar diurese forçada ("lavar o rim"); monitorar estritamente balanço hídrico.',
          timing: 'Contínuo',
        },
        {
          label: 'Passo 4: Descompressão Cirúrgica e Source Control de Urgência',
          detail: 'Descompressão cirúrgica e source control imediato: se houver pielonefrose obstrutiva ou ureterolitíase, programar derivação ureteral subcutânea (SUB) ou stent ureteral de emergência.',
          timing: 'Até 12 horas',
        },
        {
          label: 'Passo 5: Desescalonamento Guiado por Breakpoints Plasmáticos',
          detail: 'Desescalonamento e ajuste guiado por cultura: assim que o antibiograma estiver disponível, ajustar a terapia para o antimicrobiano de menor espectro eficaz interpretado por breakpoint plasmático/sérico.',
          timing: '48 a 72 horas pós-cultura',
        },
        {
          label: 'Passo 6: Conclusão do Ciclo de 10 a 14 Dias e Reavaliação',
          detail: 'Completar ciclo de 10 a 14 dias: reavaliação clínica, creatinina e urocultura 1 a 2 semanas após o término; não prescrever novos ciclos automáticos diante de bacteriúria subclínica assintomática.',
          timing: '10-14 dias e 1-2 semanas pós-alta',
        },
      ],
    },
  },

  quickDecisionStrip: [
    'Urocultura vesical positiva sozinha NÃO define pielonefrite: exige inflamação sistêmica e dano renal.',
    'Não espere febre e dor lombar: 38% dos cães e a maioria dos gatos têm apresentações frustras e silenciosas.',
    'Em gato com ureter obstruído, cultura da bexiga negativa NÃO exclui pielonefrite pélvica (57% de falsos-negativos).',
    'Exija breakpoint plasmático/sérico no antibiograma: o alvo é o parênquima renal; nitrofurantoína é proibida.',
    'Pielonefrose e urólitos obstrutivos exigem descompressão cirúrgica urgente (SUB/stent): antibiótico sozinho falha.',
  ],

  plainLanguage: getPlainLanguageForSlug('pielonefrite-caes-gatos'),

  etiology: {
    definicaoTerminologiaDelphi2026:
      'A pielonefrite é formalmente definida como a infecção bacteriana ou fúngica que acomete simultaneamente a pelve renal e o parênquima renal. A publicação do consenso internacional Delphi em abril de 2026 (Weese et al., Journal of Small Animal Practice) revolucionou a nosologia veterinária ao padronizar 29 definições para afecções infecciosas urinárias em cães e gatos. O marco conceitual central do consenso é a superação da equivalência simplista entre urocultura positiva e pielonefrite: a presença isolada de microrganismos na bexiga pode representar mera cistite bacteriana ou bacteriúria subclínica assintomática. O consenso categorizou a doença em apresentações precisas: 1. Pielonefrite Confirmada: estabelecida exclusivamente pela documentação de cultura positiva de urina colhida diretamente da pelve renal (pielocentese), cultura de fragmento de biópsia renal ou histopatologia renal demonstrando inflamação tubulointersticial supurativa com bactérias; 2. Pielonefrite Presumida: cenário clínico mais frequente na rotina, definido pela presença concomitante de urocultura vesical positiva, evidências de inflamação sistêmica inexplicada e evidências objetivas de envolvimento renal; 3. Pielonefrite Suspeita Cultura-Negativa: condição considerada estritamente rara pelo consenso, em que há robusto conjunto de evidências sistêmicas e renais, porém com urocultura negativa (frequentemente explicada por terapia antimicrobiana prévia recente ou obstrução ureteral completa impedindo a descida dos patógenos); 4. Pielonefrite com vs sem Fatores de Risco: estratificação conforme a presença de anormalidades anatômicas, mecânicas ou metabólicas subjacentes; 5. Pielonefrite Recorrente: definida como qualquer reaparecimento de sinais clínicos e infecção renal após um período de cura clínica documentada, demandando busca exaustiva por comorbidades; 6. Pielonefrose Bacteriana: acúmulo purulento macroscópico na pelve renal sob comprometimento do fluxo urinário; 7. Urosepse: presença de sepse (resposta desregulada do hospedeiro com disfunção orgânica nova com risco de morte) decorrente de infecção ativa do trato urinário. O consenso retirou formalmente "pielonefrite aguda" e "pielite" de sua lista de termos clínicos padronizados, por considerar a primeira redundante para a classificação proposta e a segunda uma entidade estritamente histopatológica.',
    tabelaClassificacaoDelphi2026: {
      title: 'Tabela 1 — Classificação Padronizada das Infecções do Trato Urinário Superior (Consenso Delphi Internacional 2026)',
      headers: ['Categoria Consensual', 'Critérios Diagnósticos Obrigatórios', 'Implicação Clínica e Terapêutica', 'Armadilha ou Alerta Prático'],
      rows: [
        {
          col1: 'Pielonefrite Confirmada',
          col2: 'Cultura positiva de aspirado pélvico (pielocentese), cultura de biópsia renal ou histopatologia renal demonstrando tubulite supurativa/bactérias',
          col3: 'Confirmação microbiológica e anatômica inequívoca da infecção no trato superior; padrão-ouro diagnóstico definitivo',
          col4: 'A pielocentese é invasiva e exige dilatação piélica prévia; reservada para casos de obstrução, discordância ou procedimentos cirúrgicos',
        },
        {
          col1: 'Pielonefrite Presumida',
          col2: 'Urocultura vesical positiva (cistocentese) + sinais de inflamação sistêmica (febre, leucocitose, SAA/CRP) + envolvimento renal (azotemia, dor, imagem)',
          col3: 'Representa a vasta maioria dos diagnósticos na rotina clínica; autoriza terapia antimicrobiana tecidual direcionada imediata',
          col4: 'Cultura vesical positiva isolada sem evidência inflamatória sistêmica e sem repercussão renal reflete apenas cistite ou bacteriúria subclínica',
        },
        {
          col1: 'Pielonefrite Suspeita Cultura-Negativa',
          col2: 'Quadro clínico exuberante de inflamação sistêmica e envolvimento renal agudo, mas com cultura vesical estéril',
          col3: 'Classificação de exceção; exige justificativa plausível (uso prévio de antibióticos ou ureter completamente ocluído) e exclusão de diferenciais',
          col4: 'Não deve ser usada como licença para prescrever antibióticos por garantia em qualquer paciente azotêmico sem inflamação comprovada',
        },
        {
          col1: 'Pielonefrite com Fatores de Risco',
          col2: 'Presença documentada de comorbidade predisponente: ureterolitíase, nefrolitíase, ectopia, refluxo, DM, HAC, imunossupressão ou DRC basal',
          col3: 'Identificada em 75% dos cães histológicos (Bouillon 2018); exige correção do fator mecânico ou metabólico para evitar recidiva',
          col4: 'Tratar apenas com antibiótico sem remover o cálculo ou desobstruir o ureter resulta em falha terapêutica ou recorrência precoce',
        },
        {
          col1: 'Pielonefrite sem Fatores de Risco',
          col2: 'Ausência identificável de distúrbios anatômicos, mecânicos, metabólicos ou imunológicos predisponentes após investigação completa',
          col3: 'Menos frequente em pequenos animais; sugere virulência bacteriana extrema de cepa uropatogênica específica',
          col4: 'Exige confirmação por ultrassonografia abdominal de alta resolução para certificar ausência de anomalias congênitas sutis',
        },
        {
          col1: 'Pielonefrite Persistente',
          col2: 'Persistência de sinais clínicos, inflamação sistêmica ou envolvimento renal durante o curso adequado de terapia antimicrobiana',
          col3: 'Sinal de alarme para refratariedade: indica resistência bacteriana não coberta, dose subterapêutica, má adesão ou foco obstrutivo oculto',
          col4: 'Se em 48 a 72 horas não houver melhora clínica, investigar obrigatoriamente abscesso intraparenquimatoso ou pielonefrose sob pressão',
        },
        {
          col1: 'Pielonefrite Recorrente',
          col2: 'Reaparecimento documentado de pielonefrite após período prévio de cura clínica e microbiológica comprovada',
          col3: 'Não exige número mínimo de episódios anuais (diferente da cistite): qualquer recorrência no rim demanda investigação anatômica profunda',
          col4: 'Diferenciar recaída (mesmo patógeno com nicho protegido em cálculo/biofilme) de reinfecção (novo patógeno ascendendo por barreira rompida)',
        },
        {
          col1: 'Pielonefrose Bacteriana',
          col2: 'Presença macroscópica de exsudato purulento na pelve renal associada a comprometimento significativo do fluxo urinário (uropatia obstrutiva)',
          col3: 'Emergência urológica crítica: abscesso fechado de alta pressão com isquemia de parênquima; exige descompressão cirúrgica de urgência',
          col4: 'Antibioticoterapia isolada falha invariavelmente devido à carga purulenta maciça, baixa perfusão tecidual e estase mecânica',
        },
        {
          col1: 'Urosepse',
          col2: 'Presença de síndrome de sepse com disfunção orgânica nova (hipotensão, hiperlactatemia, coagulopatia) cuja fonte primária é o trato urinário',
          col3: 'Internação imediata em UTI; protocolo de ressuscitação volêmica conservadora balanceada, vasopressores precoces e source control',
          col4: 'Mortalidade elevada; pacientes geriátricos e felinos frequentemente entram em choque hipodinâmico sem febre prévia',
        },
        {
          col1: 'Pielonefrite Subclínica',
          col2: 'Presença documentada de agente microbiano no tecido renal ou pelve renal sem sinais clínicos aparentes de disfunção sistêmica',
          col3: 'Entidade de diagnóstico incidental ou de pesquisa; conduta terapêutica deve ser ponderada individualmente contra risco de resistência',
          col4: 'Não confundir com bacteriúria subclínica vesical: aqui há envolvimento do trato superior comprovado',
        },
      ],
    },
    agentesMicrobianosEPerfilDeResistencia:
      'A etiologia microbiana da pielonefrite é dominada por bactérias Gram-negativas entéricas comensais do trato gastrointestinal, que colonizam a região perineal e ascendem pelo urotélio. A Escherichia coli uropatogênica (UPEC) lidera com folga todas as coortes clínicas e histopatológicas: no estudo seminal de Bouillon et al. (2018) avaliando 47 cães com pielonefrite confirmada por histologia, E. coli representou 37% de todos os isolados identificados. As cepas de UPEC possuem um arsenal refinado de fatores de virulência: fímbrias tipo 1 (que se ligam a resíduos de manose do urotélio), fímbrias P (PapG, que reconhecem receptores digalactosídeos específicos em células tubulares renais), adesinas afimbriais, sistemas de captação de ferro (sideróforos como aerobactina e enterobactina), toxinas citotóxicas (fator necrosante citotóxico tipo 1 [CNF-1] e alfa-hemolisina) e a habilidade de formar biofilmes patogênicos no interior de cálculos e corpos estranhos. Outros uropatógenos bacterianos comuns incluem Enterococcus faecalis e Enterococcus faecium (Gram-positivos com resistência intrínseca a cefalosporinas e capacidade notável de formação de biofilme), Staphylococcus pseudintermedius, Streptococcus spp., Klebsiella pneumoniae, Proteus mirabilis (produtor de urease, associado à alcalinização urinária e urolitíase por estruvita), Pseudomonas aeruginosa e Enterobacter cloacae. Infecções fúngicas da pelve renal são raras e acometem quase que exclusivamente pacientes imunossuprimidos, diabéticos com glicosúria crônica ou em uso prolongado de corticosteroides/antimicrobianos prévios (destacando-se Candida albicans, Cryptococcus neoformans e fungos filamentosos como Aspergillus spp.). Uma distinção etiológica crucial no ConsultaVET concerne à Leptospira interrogans: embora historicamente listada entre diagnósticos diferenciais de infecção renal em cães, a leptospirose é uma zoonose de disseminação primariamente hematógena que produz nefrite tubulointersticial imunomediada e sistêmica aguda, e não a típica pielonefrite ascendente. Em cães com lesão renal aguda infecciosa febril com urocultura negativa, a leptospirose deve ser investigada por PCR sérico/urinário e sorologia (MAT), recebendo tratamento de primeira linha com ampicilina parenteral seguida de doxiciclina oral para eliminação do estado de portador tubular.',
  },

  epidemiology: {
    viasDeInfeccaoEFatoresDeRisco:
      'A infecção do trato urinário superior instala-se quase invariavelmente pela via ascendente: microrganismos da microbiota fecal colonizam a uretra distal e o vestíbulo/prepúcio, proliferam na bexiga urinária e superam a barreira funcional da junção ureterovesical, ascendendo através do lúmen ureteral até a pelve renal e invadindo os ductos coletores de Bellini e os túbulos medulares. A via hematógena (disseminação intravascular a partir de bacteremias graves, endocardite infecciosa ou focos sépticos distantes) é incomparavelmente mais rara em medicina veterinária: o córtex renal possui perfusão sanguínea abundante, oxigenação tecidual elevada e atividade fagocitária eficiente, fatores que conferem alta resistência à fixação microbiana por via sanguínea. A ascensão bacteriana só tem êxito quando as barreiras mecânicas, hidrodinâmicas ou imunológicas do hospedeiro são rompidas. Os fatores de risco dividem-se em: 1. Mecânicos e Anatômicos: ureterolitíase e nefrolitíase (que causam abrasão urotelial, estase e nicho protegido em biofilmes), dilatação piélica prévia, estenoses ureterais pós-inflamatórias, ureter ectópico congênito, persistência de refluxo vesicoureteral (incompetência do segmento intramural do ureter na contração vesical) e neoplasias uroteliais obstrutivas (carcinoma de células de transição / urotelial); 2. Funcionais: retenção urinária crônica, bexiga neurogênica (por lesão de motoneurônio superior ou inferior), obstrução funcional do fluxo urinário (FOO) e cateterismos vesicais de demora traumáticos; 3. Sistêmicos e Metabólicos: Doença Renal Crônica pré-existente (isostenúria e uromodulina reduzida favorecem colonização), Diabetes Mellitus (glicosúria persistente atua como meio de cultura bacteriana e reduz a fagocitose neutrofílica), Hiperadrenocorticismo e corticoterapia crônica (imunossupressão profunda mascarando a resposta celular) e neoplasias sistêmicas.',
    predisposicaoEParticularidadesDeEspecie:
      'A epidemiologia e os padrões de apresentação diferem significativamente entre cães e gatos. No estudo histopatológico de 47 cães de Bouillon et al. (2018), a idade mediana foi de 7,7 anos (com 60% dos pacientes apresentando mais de 7 anos) e 70% da casuística correspondia a fêmeas, reflexo da uretra feminina anatomicamente mais curta e próxima ao períneo, que facilita infecções urinárias baixas ascendentes. O achado mais marcante foi que 75% dos cães apresentavam ao menos uma comorbidade sistêmica ou anatômica predisponente grave (uropatia obstrutiva, nefrolitíase, imunossupressão medicamentosa ou malformações). A doença histológica canina foi bilateral em 72% dos casos e unilateral em 28%. Na espécie felina, a pielonefrite é historicamente subdiagnosticada devido à natureza extremamente sutil e silenciosa de seus sinais clínicos. Atinge predominantemente felinos de meia-idade a idosos (mediana em torno de 10 a 12 anos em séries de necropsia), ocorrendo com frequência elevada como evento agudo descompensador sobreposto à Doença Renal Crônica (Agudo-sobre-Crônico / AoCKD). Todavia, com o advento de estudos contemporâneos de biomarcadores (Jessen et al., 2026), identificou-se que gatos jovens também desenvolvem pielonefrite aguda quando acometidos por ureterolitíase por oxalato de cálcio ou anomalias congênitas. A uropatia obstrutiva ureteral é o principal motor patogênico em gatos: nos trabalhos de Kyles et al. e Berent et al., aproximadamente 18% dos felinos submetidos à desobstrução ureteral apresentavam infecção ativa da pelve renal, sendo que mais da metade deles apresentava urocultura vesical estéril.',
    tabelaComparativaCaesVsGatosPielonefrite: {
      title: 'Tabela 2 — Matriz Comparativa: Particularidades Clínicas da Pielonefrite em Cães vs Gatos',
      headers: ['Característica / Parâmetro', 'Espécie Canina (Cães)', 'Espécie Felina (Gatos)', 'Significado Prático / Implicação'],
      rows: [
        {
          col1: 'Apresentação Clínica Típica',
          col2: 'Frequentemente inespecífica (anorexia 57%, letargia 51%); 38% não exibem nenhum sinal urinário clássico (Bouillon 2018)',
          col3: 'Extremamente sutil e frustra; hiporexia, prostração, vômitos esparsos ou piora aguda de DRC prévia',
          col4: 'Em ambas as espécies, a ausência de sinais urinários baixos não autoriza descartar infecção renal ativa',
        },
        {
          col1: 'Presença de Febre',
          col2: 'Incomum: presente em apenas 21% dos cães com diagnóstico histopatológico comprovado',
          col3: 'Rara: observada em menos de 10% a 15% dos felinos; normotermia ou hipotermia na urosepse',
          col4: 'Superar o dogma de exigir febre para investigar pielonefrite: a maioria esmagadora é afebril na admissão',
        },
        {
          col1: 'Dor Lombar / Renal à Palpação',
          col2: 'Muito rara: documentada em apenas 6% dos cães histológicos (Bouillon 2018)',
          col3: 'Excepcional: palpação renal dolorosa ocorre em menos de 15% dos gatos (Quimby 2017)',
          col4: 'Rim indolor à palpação abdominal não descarta pielonefrite nem abscesso renal em nenhuma das espécies',
        },
        {
          col1: 'Comorbidade Confundidora',
          col2: 'Prostatite em machos intactos, nefrolitíase, diabetes mellitus e hiperadrenocorticismo',
          col3: 'Doença Renal Crônica (DRC) e ureterolitíase por oxalato de cálcio (obstrução ureteral)',
          col4: 'Gato com DRC estável que sofre elevação súbita de creatinina tem pielonefrite como principal suspeita',
        },
        {
          col1: 'Discordância de Cultura Vesical',
          col2: 'Menos frequente, mas ocorre se houver antibiótico prévio recente ou obstrução ureteral unilateral',
          col3: 'Marcante: até 57% dos gatos com pelve renal infectada têm urocultura de bexiga negativa (Kyles et al.)',
          col4: 'A urocultura por cistocentese negativa NUNCA exclui pielonefrite em gato com ureter obstruído',
        },
        {
          col1: 'Biomarcador Inflamatório 2026',
          col2: 'Proteína C-Reativa (CRP): mediana 1,04 mg/dL em cistite vs 23,65 mg/dL em pielonefrite (Fidanzio 2026)',
          col3: 'Serum Amyloid A (SAA): cutoff 49,1 mg/L possui sensibilidade 95% e especificidade 97% (Jessen 2026)',
          col4: 'Ferramentas de altíssima acurácia para demonstrar inflamação sistêmica oculta compatível com doença alta',
        },
        {
          col1: 'Risco Toxicológico de Fluoroquinolonas',
          col2: 'Doses plenas de enrofloxacina (10 a 20 mg/kg) toleradas com monitoramento articular em jovens',
          col3: 'Enrofloxacina limitada estritamente a 5 mg/kg/dia pelo risco de retinopatia aguda e cegueira permanente',
          col4: 'Em felinos, priorizar marbofloxacina ou pradofloxacina, que possuem excelente perfil de segurança ocular',
        },
        {
          col1: 'Emergência Cirúrgica Típica',
          col2: 'Pielonefrose por cálculo obstrutivo pélvico; ruptura renal enfisematosa',
          col3: 'Ureterolitíase com hidronefrose infectada; indicação mandatória de SUB ou stent ureteral de urgência',
          col4: 'O source control e a descompressão mecânica do trato superior salvam o parênquima renal do felino',
        },
      ],
    },
  },

  pathogenesisTransmission: {
    fisiopatologiaAscensaoBacterianaEParadoxoMedular:
      'A patogênese da pielonefrite inicia-se com a superação das defesas mecânicas do fluxo miccional descendente. Bactérias dotadas de fímbrias aderem avidamente aos receptores de uroplaquina no urotélio vesical e ureteral. A motilidade retrógrada pode ser auxiliada pela produção microbiana de endotoxinas (LPS), que paralisam o peristaltismo da musculatura lisa ureteral, transformando o conduto em uma coluna hidrostática estática facilitadora da ascensão até os fórnices e cálices da pelve renal. Ao penetrarem na pelve, os patógenos alcançam os ductos coletores e invadem a medula renal. Aqui reside uma correção fisiopatológica crucial detalhada no Nelson & Couto (6ª ed., Cap. 42, p. 709) que retifica conceituações errôneas do passado: a medula renal não é protegida pelo seu ambiente hipóxico; pelo contrário, a medula renal é extraordinariamente mais suscetível à colonização bacteriana e à destruição tecidual do que o córtex renal. Esse "paradoxo medular" decorre da biofísica única do interstício medular profundo, caracterizado por hiperosmolaridade extrema (gerada pelo mecanismo contracorrente de ureia e cloreto de sódio), pH ácido, fluxo sanguíneo relativo diminuído (vasa recta recebem apenas 10% do débito renal total para não dissipar o gradiente osmótico) e baixa tensão tecidual de oxigênio. Esse microambiente hostil inibe intensamente os mecanismos de defesa celulares e humorais do hospedeiro: retarda a quimiotaxia neutrofílica, diminui a capacidade bactericida fagocitária e inibe a ativação da cascata do complemento. Uma vez instaladas na medula, as bactérias deflagram uma tempestade inflamatória tubulointersticial aguda. O reconhecimento de PAMPs por receptores Toll-like (TLR4) induz a secreção maciça de quimiocinas (IL-8), recrutando ondas de neutrófilos que se aglomeram nos capilares peritubulares e no lúmen tubular. O vasoespasmo reflexo mediado por endotelina e tromboxano, somado à compressão capilar pelo edema intersticial inflamatório e pelos microtrombos intraluminais, desencadeia isquemia medular secundária e necrose papilar renal, agravando a perda súbita da taxa de filtração glomerular.',
    mecanismosDeConcentracaoUrinarieEProgressaoDrc:
      'A inflamação e a lesão celular dos túbulos coletores e das alças de Henle comprometem precocemente a capacidade de concentração urinária do néfron. A perda da integridade do epitélio tubular e a lavagem do gradiente de solutos intersticial impedem a reabsorção passiva de água. Concomitantemente, toxinas bacterianas e citocinas inflamatórias reduzem a densidade e a responsividade dos receptores V2 de vasopressina (ADH) na membrana basolateral das células principais dos ductos coletores, além de inibir a translocação de vesículas contendo canais de aquaporina-2 (AQP2) para a membrana apical. O resultado fisiopatológico é a instalação de um quadro funcional indistinguível de Diabetes Insipidus Nefrogênico secundário: o paciente torna-se incapaz de concentrar a urina, manifestando precocemente poliúria compensada por polidipsia profunda (PU/PD) e densidade urinária isostenúrica (1.008 a 1.015) ou inapropriadamente baixa (< 1.030 em cães; < 1.035 em gatos), mesmo na presença de desidratação e azotemia. Se o insulto infeccioso e a resposta inflamatória não forem completamente debelados de forma tempestiva, a persistência de neutrófilos intratubulares e a ativação continuada de macrófagos pró-inflamatórios ativam miofibroblastos intersticiais através de vias de TGF-beta. Esse processo culmina em fibrose intersticial progressiva, atrofia tubular irreversível, perda permanente de néfrons funcionais e cicatrização renal com retração cortical (rim pequeno e irregular à imagem), consolidando a transição da lesão renal aguda para Doença Renal Crônica (DRC) avançada.',
  },

  pathophysiology: {
    fisiopatologiaPielonefroseEUrosepse:
      'A fisiopatologia da pielonefrose bacteriana e da urosepse representa o ápice da gravidade clínica na nefrologia veterinária. A pielonefrose instala-se invariavelmente quando a infecção purulenta da pelve renal coexiste com o comprometimento parcial ou total do fluxo urinário eferente (provocado comumente por ureterólito de oxalato de cálcio, tampão inflamatório de debris ou estenose fibrótica). Sob estase urinária e proliferação microbiana exponencial, o lúmen da pelve renal transforma-se em um abscesso fechado e volumoso sob alta pressão hidrostática. À medida que a pressão intrapélica ultrapassa a pressão de ultrafiltração glomerular, a taxa de filtração desse rim colapsa a zero. A distensão mecânica progressiva comprime a vasculatura renal contra a cápsula inelástica, gerando isquemia parenquimatosa difusa e risco iminente de rotura da pelve renal com extravasamento retroperitoneal ou uroabdômen séptico. Ao mesmo tempo, a barreira epitelial e o endotélio capilar peritubular sofrem necrose por proteases bacterianas e leucocitárias, permitindo a translocação em massa de patógenos viáveis e seus produtos tóxicos (LPS e endotoxinas de Gram-negativos) para o leito venoso sistêmico. Essa bacteremia maciça desencadeia a Urosepse: ativação desenfreada de receptores PRRs sistêmicos, liberação de TNF-alfa, IL-1beta e IL-6, hiperpolarização da musculatura vascular pela sintase induzível de óxido nítrico (iNOS) e choque distributivo vasoplégico caracterizado por hipotensão persistente (PAM < 60 mmHg), hiperlactatemia severa, disfunção cardiovascular e dano endotelial microvascular com coagulação intravascular disseminada (CID).',
    tabelaDiagnosticoDiferencialNefropatiasInfeccoes: {
      title: 'Tabela 3 — Diagnóstico Diferencial: Pielonefrite vs Cistite vs Bacteriúria Subclínica vs Obstrução vs DRC',
      headers: ['Condição Clínica', 'Sinais Sistêmicos / Inflamação', 'Achados Urinários / Urocultura', 'Função Renal (Creatinina / Biomarcadores)', 'Imagem Renal / Ultrassonografia'],
      rows: [
        {
          col1: 'Pielonefrite Bacteriana',
          col2: 'Presentes: hiporexia, vômito, letargia, PU/PD; febre (21% cães; <15% gatos); SAA felina ou CRP canina marcadamente altas',
          col3: 'Cultura vesical positiva (ou de pielocentese); cilindros leucocitários patognomônicos quando presentes; piúria e hematúria',
          col4: 'Azotemia nova ou progressão aguda de DRC estável; creatinina pode estar normal se doença unilateral com rim contralateral são',
          col5: 'Pieloectasia com debris intraluminais, perda da diferenciação corticomedular, espessamento da parede piélica; US normal em até 28%',
        },
        {
          col1: 'Cistite Bacteriana Esporádica',
          col2: 'Ausentes: animal sistemicamente hígido, ativo, afebril, normofágico; proteínas de fase aguda normais (CRP < 1,5 mg/dL; SAA normal)',
          col3: 'Disúria, estrangúria, polaciúria, hematúria macroscópica; urocultura por cistocentese positiva (> 10³ a 10⁵ CFU/mL)',
          col4: 'Creatinina estritamente normal; sem envolvimento funcional do néfron nem repercussões sistêmicas',
          col5: 'Rins e ureteres absolutamente normais; espessamento parietal inflamatório focado na parede apical ou trigonal da bexiga',
        },
        {
          col1: 'Bacteriúria Subclínica',
          col2: 'Ausentes: paciente assintomático, ativo, sem sinais sistêmicos nem urinários baixos; marcadores inflamatórios normais',
          col3: 'Urocultura vesical positiva encontrada incidentalmente em rastreio de endocrinopatas ou nefropatas; piúria variável',
          col4: 'Creatinina estável basal do paciente; ausência de declínio agudo da taxa de filtração glomerular',
          col5: 'Rins preservados ou com alterações crônicas preexistentes; ausência de pieloectasia infecciosa aguda e sem debris',
        },
        {
          col1: 'Obstrução Ureteral não infectada',
          col2: 'Dor abdominal/lombar paroxística aguda, vômito, anorexia; febre ausente; SAA e CRP discretamente elevadas ou normais',
          col3: 'Urocultura vesical e pélvica estéreis (ausência de bactérias); cilindros ausentes; urinálise pode ser inativa',
          col4: 'Elevação rápida de creatinina (LRA pós-renal) se bilateral ou rim único funcional; normal se unilateral compensado',
          col5: 'Pelvicaliectasia acentuada com fluido anecoico limpo e visualização de urólito obstrutivo radiopaco com sombra acústica',
        },
        {
          col1: 'DRC Estável Descompensada',
          col2: 'Histórico prévio de perda de peso, apetite caprichoso; descompensação por desidratação pré-renal sem foco séptico',
          col3: 'Urocultura estéril (salvo infecção secundária); isostenúria crônica; proteinúria renal com UPC elevado',
          col4: 'Azotemia com creatinina e SDMA cronicamente elevadas sem febre nem elevação desproporcional de SAA/CRP',
          col5: 'Rins pequenos, irregulares, com adelgaçamento cortical; pieloectasia discreta é comum (66% dos gatos) sem ser infecciosa',
        },
        {
          col1: 'Leptospirose Canina',
          col2: 'Febre alta frequente, letargia profunda, icterícia, diátese hemorrágica; vasculite e miosite dolorosa; CRP muito alta',
          col3: 'Cultura bacteriana em meios de rotina é NEGATIVA; urinálise revela glicosúria normoglicêmica e cilindros granulares',
          col4: 'LRA grave desproporcional; trombocitopenia de consumo, azotemia acentuada e hiperbilirrubinemia hepatocelular',
          col5: 'Rins aumentados de volume, halo medular hipoecoico, nefromegalia bilateral simétrica; ausência de pielonefrose obstrutiva',
        },
        {
          col1: 'Prostatite Bacteriana Canina',
          col2: 'Febre, dor à palpação retal da próstata, marcha rígida de membros posteriores; CRP sérica muito elevada (20,9 mg/dL)',
          col3: 'Urocultura vesical e de lavado prostático fortemente positiva; piúria e hematúria profusas',
          col4: 'Creatinina sérica tipicamente normal, exceto se houver pielonefrite ascendente concomitante ou urosepse instalada',
          col5: 'Rins normais; próstata assimétrica, heterogênea, com microabscessos anecoicos/hipoecoicos parenquimatosos',
        },
      ],
    },
  },

  clinicalSignsPathophysiology: {
    apresentacaoClinicaSilenciosaEMitosDiagnosticos:
      'A apresentação clínica da pielonefrite em cães e gatos é notória pela sua inespecificidade e capacidade de simular outras enfermidades clínicas, exigindo alto índice de suspeição médica. O dogma tradicional transmitido em compêndios antigos de que a pielonefrite cursa invariavelmente com a "tríade clássica" (febre alta, dor renal lombar palpável e bacteriúria com piúria exuberante) é perigoso e clinicamente falso. Na coorte histopatológica de Bouillon et al. (2018) avaliando 47 cães, a febre esteve presente em apenas 21% dos animais na admissão, e a dor lombar à palpação profunda foi documentada em meros 6% dos pacientes; impressionantemente, 38% dos cães com infecção renal ativa comprovada não apresentavam nenhum sinal clínico urinário baixo e não tinham febre nem dor. Os sinais clínicos mais frequentes e consistentes foram letargia/depressão (51%), hiporexia ou anorexia total (57%), vômitos agudos ou intermitentes (36%), desidratação (26%) e perda de peso. A manifestação de poliúria e polidipsia (PU/PD) decorre da perda tubular precoce da sensibilidade ao ADH e da lavagem do gradiente corticomedular. Na espécie felina, o quadro é ainda mais dissimulado: a vasta maioria dos gatos não exibe febre e raramente demonstra dor renal perceptível à palpação ambulatorial. Em felinos, o sinal mais típico é a descompensação abrupta e inexplicada de um paciente com Doença Renal Crônica previamente estável (Agudo-sobre-Crônico), manifestando-se por hiporexia súbita, vômitos matinais, desidratação rápida e salto nos níveis basais de creatinina sérica. O Consenso Delphi 2026 reconheceu formalmente essa realidade: os sinais de pielonefrite são tipicamente vagos e inespecíficos, devendo a investigação ser deflagrada diante de qualquer quadro de inflamação sistêmica sem foco evidente acompanhado de envolvimento renal.',
  },

  diagnosis: {
    algoritmoDiagnosticoEBiomarcadores2026:
      'O diagnóstico moderno de pielonefrite exige a integração metódica de quatro pilares: evidência microbiológica, documentação de inflamação sistêmica, comprovação de envolvimento renal e suporte de imagem de alta definição. A urocultura quantitativa de amostra colhida por cistocentese estéril é o exame inicial mandatório e DEVE ser coletada obrigatoriamente antes do início de qualquer antimicrobiano. Contudo, em conformidade estrita com o Consenso Delphi 2026, a cultura vesical isolada nunca é suficiente para fechar o diagnóstico de pielonefrite presumida: exige-se a demonstração de inflamação sistêmica inexplicada e envolvimento renal funcional ou anatômico. No campo dos biomarcadores inflamatórios sistêmicos, o ano de 2026 trouxe avanços determinantes: 1. Serum Amyloid A (SAA) em Felinos: o estudo de Jessen et al. (2026, Journal of Small Animal Practice) avaliou 71 gatos e demonstrou que a SAA foi marcadamente mais elevada naqueles com pielonefrite confirmada (mediana 180,3 mg/L) em comparação a gatos com outras afecções urológicas (mediana 0,4 mg/L). O ponto de corte (cutoff) de ~49,1 mg/L apresentou área sob a curva (AUC) de 0,957, sensibilidade de 95%, especificidade de 97% e razão de verossimilhança positiva (LR+) de 32,2 para discriminar pielonefrite confirmada/presumida de outras doenças urinárias baixas ou urolitíases não infecciosas. Além disso, Viviano et al. (2026) demonstraram que a SAA sérica decai rapidamente conforme a resposta terapêutica, servindo como monitor dinâmico da cura tecidual; 2. Proteína C-Reativa (CRP) em Caninos: o trabalho de Fidanzio et al. (2026, Journal of Veterinary Internal Medicine) demonstrou que a CRP sérica é altamente discriminatória para distinguir infecção do trato urinário inferior de infecções sistêmicas/altas: cães com cistite bacteriana apresentaram CRP mediana de 1,04 mg/dL, enquanto cães com pielonefrite exibiram média de 23,65 mg/dL (e prostatite média de 20,9 mg/dL). A urinálise completa complementa o painel: além da densidade urinária isostenúrica (< 1.035 em gatos, < 1.030 em cães), a presença microscópica de cilindros leucocitários (leucócitos aderidos a uma matriz de uromodulina moldada nos túbulos) é patognomônica de inflamação originada no parênquima renal; no entanto, sedimento urinário inativo ou sem bacteriúria visível ocorre em até 32% dos casos e não descarta a doença.',
    tabelaMatrizDiagnosticaPielonefrite: {
      title: 'Tabela 4 — Armada Laboratorial, Biomarcadores e Diagnóstico por Imagem na Pielonefrite',
      headers: ['Modalidade / Exame', 'Achados Típicos na Pielonefrite', 'Significado Fisiopatológico', 'Armadilha ou Cuidado Crítico'],
      rows: [
        {
          col1: 'Urocultura por Cistocentese',
          col2: 'Crescimento bacteriano quantitativo significativo (> 10³ a 10⁵ CFU/mL) com identificação e antibiograma',
          col3: 'Demonstra a presença do patógeno no sistema urinário e orienta o desescalonamento terapêutico',
          col4: 'Cultura vesical positiva sozinha NÃO define pielonefrite; em gatos com ureter obstruído, pode ser falsa-negativa em 57%',
        },
        {
          col1: 'Serum Amyloid A (SAA Felina)',
          col2: 'Níveis marcadamente elevados (> 49,1 mg/L; mediana de 180 mg/L nos casos confirmados de Jessen 2026)',
          col3: 'Proteína de fase aguda de disparo ultrarrápido; comprova inflamação sistêmica em resposta à invasão renal',
          col4: 'Sensibilidade de 95% e especificidade de 97%; decai com o sucesso terapêutico; não substitui a cultura bacteriana',
        },
        {
          col1: 'Proteína C-Reativa (CRP Canina)',
          col2: 'Valores substancialmente aumentados (média 23,65 mg/dL na pielonefrite vs 1,04 mg/dL na cistite - Fidanzio 2026)',
          col3: 'Excelente marcador para separar doença estritamente baixa (cistite) de agressão renal alta com repercussão sistêmica',
          col4: 'Não distingue pielonefrite de prostatite em machos nem de outras inflamações sistêmicas ativas (pancreatite, sepse)',
        },
        {
          col1: 'Urinálise e Sedimento Urinário',
          col2: 'Densidade isostenúrica (1.008 a 1.015), piúria, bacteriúria, hematúria e cilindros leucocitários patognomônicos',
          col3: 'Reflete perda da capacidade medular de concentrar e inflamação celular supurativa intra-tubular direta',
          col4: 'Até 32% não exibem bacteriúria no sedimento fresco; sedimento inativo não descarta pielonefrite crônica ou focal',
        },
        {
          col1: 'Creatinina e Ureia em Série',
          col2: 'Azotemia renal aguda nova ou progressão aguda documentada de azotemia basal prévia em nefropatas crônicos',
          col3: 'Expressa perda abrupta da Taxa de Filtração Glomerular por compressão inflamatória e vasoespasmo isquêmico',
          col4: 'Creatinina estritamente normal NÃO exclui pielonefrite unilateral compensada por rim contralateral saudável',
        },
        {
          col1: 'Ultrassonografia Renal e Pélvica',
          col2: 'Pieloectasia com debris ecogênicos, perda da diferenciação corticomedular, espessamento da parede piélica e halo líquido',
          col3: 'Evidencia edema do parênquima, acúmulo de exsudato purulento na pelve e estase do fluxo urinário eferente',
          col4: 'Pieloectasia isolada não é patognomônica (ocorre em 66% dos gatos com DRC); US normal em até 28% dos cães com pielonefrite',
        },
        {
          col1: 'Pielocentese Ecoguiada',
          col2: 'Aspirado de urina diretamente da pelve renal com citologia rica em neutrófilos degenerados e cultura positiva',
          col3: 'Critério definitivo para Pielonefrite Confirmada pelo Consenso Delphi 2026; localiza a infecção na pelve',
          col4: 'Procedimento invasivo; risco de extravasamento pélvico e hemorragia; indicada na obstrução ou discordância diagnóstica',
        },
        {
          col1: 'Radiografia Abdominal / Contrastada',
          col2: 'Identificação de nefrolitíase e ureterólitos radiopacos (oxalato de cálcio), renomegalia assimétrica ou gás tecidual',
          col3: 'Detecta a causa mecânica predisponente em 75% dos casos; rastreia gás parenquimatoso na pielonefrite enfisematosa',
          col4: 'Urólitos de urato e xantina são radiotransparentes; a radiografia normal não descarta obstrução nem infecção bacteriana',
        },
      ],
    },
    desafiosDaImagemPieloectasiaVsObstrucao:
      'O diagnóstico ultrassonográfico da pielonefrite é valioso, mas repleto de armadilhas interpretativas que o clínico deve dominar. O principal erro diagnóstico reside na equação simplista "pieloectasia = pielonefrite". O estudo de Quimby et al. (2017) avaliando a largura da pelve renal em felinos demonstrou que dilatação pélvica está presente em 30% dos gatos normais hígidos, em 66,6% dos gatos com Doença Renal Crônica clinicamente estável, em 84,6% dos gatos com pielonefrite e em 100% dos gatos com obstrução ureteral. Mais importante: não houve diferença estatisticamente significativa na largura média da pelve renal entre felinos com DRC estável e felinos com pielonefrite. Portanto, a visualização de uma pelve renal de 2 a 4 mm em um gato azotêmico não autoriza rotular o quadro como pielonefrite sem a demonstração de inflamação sistêmica e cultura positiva. A dilatação do ureter proximal acrescenta maior especificidade (presente em apenas 6% dos gatos com DRC estável vs 46,2% na pielonefrite e 81,8% na obstrução ureteral), indicando comprometimento das vias excretoras altas. Outro dado de alerta crucial procede da série canina de Bouillon et al. (2018): em 29 cães com pielonefrite ativa confirmada histologicamente que realizaram ultrassonografia, quase 30% (8 cães) não apresentavam os achados considerados típicos de imagem; surpreendentemente, dois cães exibiam ultrassonografia urogenital estritamente normal apesar de apresentarem pielonefrite necrosante difusa grave na histopatologia. Dessa forma, ultrassonografia normal não esteriliza o parênquima renal e não exclui infecção ativa.',
    pielocenteseEPeculiaridadeFelinaObstrutiva:
      'A pielocentese (punção percutânea ecoguiada da pelve renal) constitui o teste microbiológico padrão-ouro, consagrado pelo Consenso Delphi 2026 como critério definidor de Pielonefrite Confirmada. Consiste na aspiração direta da urina acumulada na pelve utilizando agulha 22 a 25 G acoplada a seringa sob visualização ultrassonográfica em tempo real. Por ser um procedimento intervencionista que carrega riscos de hemorragia renal, laceração pélvica e extravasamento urinário para o retroperitônio ou cavidade peritoneal, não é executada de forma indiscriminada em todo paciente; exige dilatação pélvica mensurável (idealmente >= 3 a 5 mm) e treinamento técnico do operador. A pielocentese é imperativa em cenários específicos: 1. Pacientes com pelve dilatada e suspeita de pielonefrite cuja urocultura vesical resultou estéril ou inconclusiva; 2. Pacientes refratários ao tratamento empírico adequado após 48 a 72 horas; 3. Coleta intraoperatória durante procedimentos de descompressão intervencionista (instalação de SUB ou stent ureteral). É nesse contexto que se manifesta uma das maiores pérolas clínicas da nefrologia felina, documentada por Kyles et al. e Berent et al.: em gatos acometidos por ureterolitíase e obstrução ureteral, 18% apresentam cultura positiva da urina pélvica; entretanto, quando confrontadas as culturas da pelve e da bexiga urinária coletadas simultaneamente, 57% dos gatos com urina pélvica comprovadamente infectada apresentavam urocultura vesical estéril (negativa). A fisiopatologia desse fenômeno é mecânica: se o lúmen ureteral está completamente ocluído pelo cálculo, os microrganismos multiplicando-se na pelve renal não conseguem atingir a bexiga. Portanto, urocultura por cistocentese negativa NUNCA descarta pielonefrite em um paciente felino com obstrução ureteral.',
  },

  treatment: {
    principiosTerapeuticosEBreakpointsPlasmaticos:
      'O manejo terapêutico da pielonefrite fundamenta-se em quatro pilares inegociáveis: erradicação do microrganismo no tecido renal profundo, preservação da taxa de filtração glomerular, correção de fatores mecânicos/predisponentes e prevenção de progressão para urosepse ou pielonefrose. A informação farmacológica mais importante e determinante para o sucesso clínico é: O CLÍNICO DEVE EXIGIR E INTERPRETAR O ANTIBIOGRAMA COM BASE ESTRITA NOS BREAKPOINTS DE SUSCEPTIBILIDADE SÉRICOS / PLASMÁTICOS, E NUNCA PELOS BREAKPOINTS URINÁRIOS. Enquanto na cistite bacteriana a maioria dos antimicrobianos atinge concentrações urinárias centenas de vezes superiores ao plasma, a pielonefrite é uma infecção invasiva do interstício, medula e parênquima renal. Para que haja cura microbiológica e tecidual, a concentração livre da droga na circulação sistêmica e no tecido renal profundo deve superar com folga a Concentração Inibitória Mínima (MIC) do uropatógeno. Por essa razão, a diretriz ISCAID 2019 recomenda explicitamente que a requisição laboratorial informe com destaque a suspeita de pielonefrite, instruindo o laboratório a emitir laudos com pontos de corte sistêmicos. Esse princípio farmacológico desmistifica e proíbe categoricamente o uso de certos fármacos: a Nitrofurantoína é formalmente contraindicada na pielonefrite; embora atinja concentrações fenomenais na urina da bexiga, sua distribuição tecidual no parênquima renal é desprezível e resulta invariavelmente em falha terapêutica catastrófica. Quanto à via de administração, pacientes sistemicamente comprometidos, anoréxicos, vomitadores, azotêmicos ou febris devem receber antibioticoterapia parenteral (intravenosa) inicial obrigatória; a transição para a via oral é autorizada somente após estabilização clínica, retorno do apetite e controle dos vômitos.',
    tabelaFarmacoterapiaAntimicrobianaPielonefrite: {
      title: 'Tabela 5 — Farmacologia Antimicrobiana e Doses de Referência na Pielonefrite (ISCAID 2019 / iCatCare 2025)',
      headers: ['Fármaco / Princípio Ativo', 'Espécie / Dose Recomendada (ISCAID)', 'Via / Frequência', 'Observação de Eficácia e Stewardship'],
      rows: [
        {
          col1: 'Marbofloxacina',
          col2: 'Cães e Gatos: 2,75 a 5,5 mg/kg (dose média 3 a 5 mg/kg)',
          col3: 'PO ou IV a cada 24 horas',
          col4: 'Excelente penetração no parênquima renal; perfil de alta segurança na espécie felina; ideal para Enterobacterales',
        },
        {
          col1: 'Pradofloxacina',
          col2: 'Cães: 3 a 5 mg/kg; Gatos: 3 a 5 mg/kg comprimido ou 5 a 7,5 mg/kg suspensão oral',
          col3: 'PO a cada 24 horas',
          col4: 'Fluoroquinolona de 3ª geração bactericida com duplo mecanismo (DNA girase e topoisomerase IV); excelente para gatos',
        },
        {
          col1: 'Enrofloxacina (Canina)',
          col2: 'Cães: 5 a 20 mg/kg (guideline historicamente favorece faixas superiores)',
          col3: 'PO ou IV a cada 24 horas',
          col4: 'Concentração tecidual expressiva; titular a dose conforme MIC plasmática do isolado de E. coli',
        },
        {
          col1: 'Enrofloxacina (Felina)',
          col2: 'Gatos: MÁXIMO ESTREITO DE 5 mg/kg/dia (evitar se houver alternativa segura)',
          col3: 'PO a cada 24 horas',
          col4: 'ALERTA TOXICOLÓGICO MÁXIMO: risco iminente de retinopatia degenerativa aguda e cegueira permanente se dose > 5 mg/kg',
        },
        {
          col1: 'Cefpodoxima Proxetil',
          col2: 'Cães: 5 a 10 mg/kg',
          col3: 'PO a cada 24 horas',
          col4: 'Cefalosporina de 3ª geração oral de excelente ação contra Enterobacterales; dose felina não estabelecida na ISCAID',
        },
        {
          col1: 'Cefotaxima',
          col2: 'Cães e Gatos: 20 a 50 mg/kg',
          col3: 'IV lento a cada 8 horas',
          col4: 'Cefalosporina de 3ª geração parenteral de escolha para pacientes hospitalizados com sepse urinária ou vômitos incoercíveis',
        },
        {
          col1: 'Ceftriaxona',
          col2: 'Cães e Gatos: 25 a 50 mg/kg',
          col3: 'IV lento a cada 12 a 24 horas',
          col4: 'Amplo espectro parenteral; excelente opção inicial de UTI para pacientes sépticos aguardando antibiograma',
        },
        {
          col1: 'Amoxicilina-Clavulanato',
          col2: 'Cães e Gatos: 12,5 a 25 mg/kg',
          col3: 'PO ou IV a cada 8 a 12 horas',
          col4: 'Usar apenas se o isolado for comprovadamente sensível pelo breakpoint plasmático (alta resistência de E. coli em pielonefrites)',
        },
        {
          col1: 'Meropenem',
          col2: 'Cães e Gatos: 8,5 a 12 mg/kg',
          col3: 'IV lento ou SC a cada 8 a 12 horas',
          col4: 'RESERVADO ESTRITAMENTE sob stewardship para patógenos multirresistentes (MDR), produtores de ESBL ou falha com risco de vida',
        },
        {
          col1: 'Nitrofurantoína',
          col2: 'CONTRAINDICADA FORMALMENTE EM PIELONEFRITE',
          col3: 'NÃO ADMINISTRAR',
          col4: 'Atinge concentração urinária mas nível tecidual no parênquima renal é nulo; proscrita em infecções de trato superior',
        },
      ],
    },
    descompressaoUrgentePielonefroseESourceControl:
      'A presença de infecção bacteriana ativa na vigência de obstrução mecânica do fluxo urinário (ureterolitíase obstrutiva, piohidronefrose ou pielonefrose sob pressão) constitui uma das mais graves emergências urológicas em pequenos animais: NENHUM ANTIBIÓTICO É CAPAZ DE CURAR UM TRATO URINÁRIO OBSTRUÍDO E INFECTADO. A retenção purulenta gera pressão intrapélica que colapsa os capilares glomerulares e impede que o fármaco atinja o biofilme e as bactérias em replicação. Nesses pacientes, a intervenção descompressiva imediata (source control físico) é tão ou mais importante que a escolha do antimicrobiano. Na espécie felina, a colocação de um dispositivo de Derivação Ureteral Subcutânea (SUB - Subcutaneous Ureteral Bypass) estabeleceu-se como a terapia padrão-ouro contemporânea, superando stents ureterais tradicionais e cirurgias ureterais abertas (ureterotomia/nefrectomia) em termos de descompressão imediata e menor taxa de estenose recorrente. Em cães e gatos selecionados, a colocação de um Stent Ureteral de duplo pigtail ou nefrostomia percutânea temporária ecoguiada também pode ser empregada para alívio imediato da pressão piélica até a estabilização hemodinâmica. A diretriz ISCAID 2019 adverte formalmente: se após 48 a 72 horas de antibioticoterapia apropriada (com base em fármaco bactericida suscetível e dose correta) o paciente não demonstrar melhora dos sinais clínicos, da febre, da azotemia e dos biomarcadores inflamatórios, o clínico deve suspender a expectativa e responder a duas perguntas vitais: 1. O diagnóstico inicial de pielonefrite estava correto?; 2. Há um fator mecânico ou obstrutivo não resolvido (ureterólito oculto, pielonefrose fechada, abscesso renal cortical, neoplasia ou infecção de biofilme em dispositivo urológico prévio)? A busca ativa por reavaliação ultrassonográfica imediata de leito é mandatória.',
    tabelaProtocoloEscalonadoUtiPielonefrite: {
      title: 'Tabela 6 — Protocolo Escalonado de UTI, Manejo de Urosepse e Pielonefrose Obstrutiva',
      headers: ['Nível / Etapa de Manejo', 'Foco Clínico e Metas Hemodinâmicas', 'Intervenções Farmacológicas e Procedimentos', 'Critérios de Transição / Alerta de UTI'],
      rows: [
        {
          col1: 'Nível 1 — Triagem e Estabilização Inicial (0 a 2h)',
          col2: 'Identificação de choque séptico/urosepse (hipotensão PAM < 60 mmHg, extremidades frias, lactato > 2,5 mmol/L) e azotemia aguda',
          col3: 'Coleta de urocultura e hemocultura imediatas; alíquota volêmica conservadora (5 a 10 mL/kg de Ringer Lactato); antimicrobiano IV na 1ª hora',
          col4: 'Se PAM persistir < 60 mmHg após 10 a 20 mL/kg totais, iniciar norepinefrina contínua; nunca praticar bólus caninos em gatos',
        },
        {
          col1: 'Nível 2 — Source Control e Descompressão (2 a 12h)',
          col2: 'Rastreio de pielonefrose sob pressão, ureterolitíase obstrutiva unilateral ou bilateral e hidronefrose purulenta por POCUS',
          col3: 'Acionar equipe cirúrgica/intervencionista de urgência para instalação de derivação ureteral subcutânea (SUB) ou stent ureteral duplo J',
          col4: 'Urina pélvica purulenta retida não responde a antibiótico isolado; descompressão é mandatória para salvar néfrons funcionais residuais',
        },
        {
          col1: 'Nível 3 — Adequação e Monitoramento Sérico (12 a 72h)',
          col2: 'Monitorização seriada da função renal (creatinina a cada 12-24h), débito urinário por sonda fechada e biomarcadores (SAA ou CRP)',
          col3: 'Desescalonar o antimicrobiano IV assim que o antibiograma emitir a MIC tecidual; analgesia multimodal com buprenorfina ou metadona',
          col4: 'Ausência de queda em SAA/CRP ou persistência de leucocitose após 72h exige reavaliação ultrassonográfica imediata por abscesso ou falha',
        },
        {
          col1: 'Nível 4 — Suporte Dialítico e Reabilitação (Pós-72h)',
          col2: 'Controle de LRA oligoanúrica grave, hipercalemia refratária (> 6,5 mmol/L) ou sobrecarga hídrica decorrente da agressão séptica',
          col3: 'Indicação de Hemodiálise Intermitente (IHD) ou Terapias de Substituição Renal Contínua (CRRT); transição para via oral se paciente estável',
          col4: 'Completar 10 a 14 dias de antimicrobiano; programar reavaliação física, laboratorial e urocultura 1 a 2 semanas após término do ciclo',
        },
      ],
    },
    fluidoterapiaAnalgesiaESeguimentoPosTratamento:
      'A fluidoterapia na pielonefrite deve ser rigorosamente calculada e individualizada, em consonância com as diretrizes da AAHA Fluid Therapy 2024: o conceito histórico de diurese forçada ("lavar o rim com soro") foi definitivamente superado. Cristaloides não desinflamam o parênquima renal; uma vez corrigidos os déficits de desidratação e restabelecida a euvolemia, o excesso de fluidos gera sobrecarga hídrica (fluid overload), edema da cápsula renal e colapso respiratório por edema pulmonar (especialmente em felinos). O aporte deve igualar o débito urinário medido mais perdas insensíveis. A analgesia é um componente terapêutico indispensável: a distensão da cápsula renal rica em terminações nervosas sensoriais gera dor visceral severa. Opioides puros ou agonistas parciais (Buprenorfina 0,01 a 0,03 mg/kg IV ou bucal q6-8h em gatos; Metadona 0,1 a 0,2 mg/kg IV q4-6h em cães) são altamente recomendados. Anti-inflamatórios não esteroidais (AINEs como meloxicam) são terminantemente contraindicados na vigência de suspeita de pielonefrite, hipovolemia ou azotemia, pelo risco de precipitarem necrose papilar renal fulminante. A duração contemporânea do tratamento antimicrobiano recomendada pela ISCAID 2019 é de 10 a 14 dias, abandonando a antiga conduta de 4 a 6 semanas. É imperativo destacar que essa recomendação de 10-14 dias deriva primordialmente de extrapolação da medicina humana (onde ensaios randomizados comprovaram que cursos curtos são equivalentes e geram menor seleção de resistência), havendo carência de ensaios prospectivos veterinários controlados. Por fim, o protocolo de seguimento moderno preconiza reavaliação clínica, urinálise e urocultura por cistocentese cerca de 1 a 2 semanas após o encerramento dos antibióticos; a realização automática de culturas em 1, 3 e 6 meses em animais assintomáticos é contraindicada, pois encontrar bacteriúria subclínica em um animal assintomático com creatinina normal frequentemente resulta em tratamentos antibióticos repetidos e seleção de patógenos multirresistentes.',
  },

  complications: {
    complicacoesCriticasPielonefroseMods:
      'As complicações clínicas da pielonefrite não controlada são de gravidade extrema: 1. Pielonefrose sob Pressão e Ruptura Renal: a supuração confinada na pelve dilata agudamente a arquitetura calicial e pode romper a pelve renal, deflagrando uroperitônio séptico fulminante com peritonite generalizada e colapso circulatório imediato; 2. Urosepse e Choque Séptico: translocação de uropatógenos e endotoxinas bacterianas para a corrente sanguínea gerando vasoplegia sistêmica refratária a catecolaminas, hipotermia/bradicardia paradoxal em felinos e Síndrome da Disfunção de Múltiplos Órgãos (MODS); 3. Necrose Papilar Renal Aguda: desprendimento isquêmico e necrótico das cristas papilares da medula renal, cujos fragmentos teciduais descamados podem migrar para o lúmen ureteral e provocar obstrução ureteral mecânica aguda intraluminal secundária; 4. Progressão Acelerada para Doença Renal Crônica (DRC): a fibrose intersticial secundária à inflamação persistente destrói dezenas de milhares de néfrons funcionais, resultando em perda permanente de filtração e hipertensão arterial sistêmica secundária; 5. Formação de Abscesso Renal Intraparenquimatoso: coleções purulentas no córtex renal que não respondem à antibioticoterapia sistêmica por ausência de penetração e exigem drenagem percutânea ecoguiada ou nefrectomia parcial/total em casos de destruição unilateral completa.',
    dezErrosFataisPielonefriteCaesGatos:
      'Dez erros comuns e armadilhas letais no diagnóstico e manejo da pielonefrite em cães e gatos: 1. Considerar que urocultura vesical positiva é sinônimo automático de pielonefrite: a presença de bactérias na bexiga pode representar apenas cistite esporádica ou bacteriúria subclínica inofensiva; a pielonefrite exige evidência de inflamação sistêmica e envolvimento renal; 2. Descartar pielonefrite diante da ausência de febre e dor lombar: o estudo de Bouillon (2018) comprovou que febre ocorre em apenas 21% e dor lombar em apenas 6% dos cães histológicos, enquanto em gatos a apresentação é quase sempre silenciosa e sem dor; 3. Descartar pielonefrite com base em ultrassonografia normal: quase 30% dos cães com pielonefrite confirmada na histopatologia não apresentam achados típicos de ultrassom e podem ter imagem renal normal; 4. Interpretar a pieloectasia isolada como diagnóstica de pielonefrite: dilatação pélvica de 2 a 3 mm ocorre em 66% dos gatos com DRC estável e em 30% dos normais (Quimby 2017), não tendo valor confirmatório isolado; 5. Presumir que urocultura vesical negativa exclui infecção no rim com ureter obstruído: em gatos com ureterolitíase, 57% dos animais com pelve renal infectada apresentam cultura da bexiga negativa por ausência de descida de urina; 6. Interpretar o antibiograma por breakpoints urinários: a pielonefrite é uma infecção invasiva do parênquima e interstício renal profundo; o clínico DEVE exigir e analisar breakpoints séricos/plasmáticos; 7. Prescrever Nitrofurantoína por "concentrar muito bem na urina": erro farmacológico gravíssimo; a droga não atinge concentração tecidual renal e resulta em falência terapêutica; 8. Administrar Enrofloxacina em doses elevadas (> 5 mg/kg) em gatos: risco iminente de retinopatia fototóxica aguda e cegueira bilateral irreversível na espécie felina; 9. Manter antibioticoterapia por 4 a 6 semanas de forma empírica: a diretriz internacional ISCAID 2019 recomenda cursos de 10 a 14 dias; tratamentos desnecessariamente prolongados apenas selecionam resistência microbiana; 10. Tentar curar pielonefrose ou infecção com cálculo obstrutivo apenas com antibióticos: na presença de obstrução, o source control cirúrgico de emergência (instalação de SUB ou stent) é mandatório para permitir que o rim seja desobstruído e tratado com sucesso.',
    protocoloPlantaoPielonefrite10Passos:
      'Protocolo de plantão: abordagem sequencial em 10 passos na suspeita de pielonefrite na emergência: 1. Triagem e estabilidade hemodinâmica: aferir pressão arterial (PAS por Doppler), temperatura retal, frequência cardíaca, turgor cutâneo e lactato sérico para estratificar choque séptico (urosepse); 2. Coleta de urina por cistocentese antes de qualquer fármaco: obter urina estéril para urinálise completa, pesquisa de cilindros leucocitários no sedimento e urocultura quantitativa com antibiograma; 3. Coleta de microamostras de sangue: mensurar creatinina sérica, ureia, potássio, sódio, hemograma com pesquisa de desvio neutrofílico à esquerda e equilíbrio ácido-base; 4. Dosagem de biomarcadores inflamatórios de fase aguda: solicitar Serum Amyloid A (SAA) em gatos (alvo de corte 49,1 mg/L) ou Proteína C-Reativa (CRP) em cães para comprovar inflamação sistêmica em curso; 5. POCUS abdominal focado em rins e bexiga: varrer os rins em corte sagital e transversal avaliando largura piélica, debris na pelve, dilatação do ureter proximal e nefrolitíase; 6. Iniciar antibioticoterapia parenteral imediata: administrar na primeira hora uma fluoroquinolona veterinária (Marbofloxacina 3-5 mg/kg IV ou Pradofloxacina; ou Enrofloxacina 5-10 mg/kg em cães e NUNCA acima de 5 mg/kg em gatos) ou cefalosporina de 3ª geração (Cefotaxima 30 mg/kg IV q8h ou Ceftriaxona 25-50 mg/kg IV q12-24h); 7. Fluidoterapia isotônica individualizada: corrigir o déficit de desidratação em 6 a 12 horas com Ringer Lactato ou Plasma-Lyte sem forçar diurese e monitorando ativamente contra sobrecarga hídrica; 8. Analgesia imediata e controle de náusea: fornecer Buprenorfina (0,01 a 0,03 mg/kg IV q6-8h) ou Metadona (0,1 a 0,2 mg/kg IV q4-6h) associada a Maropitant (1 mg/kg IV q24h) e Ondansetrona (0,5 mg/kg IV q8h); contraindicar formalmente AINEs; 9. Descompressão cirúrgica de urgência se houver obstrução: se detectada pielonefrose sob pressão ou ureterolitíase obstrutiva, acionar imediatamente equipe cirúrgica para derivação ureteral (SUB) ou stent ureteral; 10. Desescalonamento e reavaliação em 48-72h: ao receber o laudo com MIC plasmática, readequar a terapia para o espectro mais estreito e manter por 10 a 14 dias totais; agendar reavaliação 1 a 2 semanas após o término.',
  },

  prevention: {
    prevencaoRecidivasEControleFatoresRisco:
      'A prevenção da pielonefrite e de suas recidivas fundamenta-se no diagnóstico e controle rigoroso dos fatores predisponentes anatômicos, metabólicos e iatrogênicos: 1. Controle de Urolitíase: manejo dietético individualizado com estímulo hídrico vigoroso (alimentos úmidos, fontes de água circulante) para promover urina insaturada, além de remoção profilática ou descompressão cirúrgica de urólitos ureterais ou nefrolitíase com risco obstrutivo ou nicho bacteriano; 2. Manejo de Comorbidades Sistêmicas: controle glicêmico estrito em felinos e caninos diabéticos (evitando períodos prolongados de glicosúria marcante), estabilização farmacológica do hiperadrenocorticismo e vigilância ativa em pacientes sob corticoterapia ou imunossupressores; 3. Boas Práticas em Instrumentação Urinária: cateterismos vesicais devem ser estritamente assépticos, com uso de sistema coletor fechado estéril e remoção do cateter assim que a patência uretral ou a estabilidade clínica for restaurada, evitando cateterismos desnecessários ou profilaxia antimicrobiana em sondas; 4. Stewardship Antimicrobiano Racional: evitar tratamentos desnecessários em pacientes com bacteriúria subclínica assintomática, prevenindo a seleção de cepas multirresistentes (MDR) e produtoras de beta-lactamases de espectro estendido (ESBL); 5. Monitoramento Ambulatorial Estruturado: em pacientes que se recuperaram de pielonefrite ou portadores de anomalias urológicas crônicas, realizar acompanhamento clínico periódico com mensuração seriada de creatinina, SDMA, urinálise e aferição da pressão arterial sistólica para diagnosticar precocemente a transição para doença renal crônica residual.',
  },

  figures: [
    {
      id: 'fig-ultrassonografia-pieloectasia-debris',
      title: 'Figura 1 — Ultrassonografia Renal com Pieloectasia e Debris Ecogênicos Intraluminais',
      legend:
        'Corte sagital de rim demonstrando dilatação moderada da pelve renal (pieloectasia) com presença de conteúdo ecogênico particulado (debris/piúria intraluminal), espessamento inflamatório da parede piélica e discreta perda da relação corticomedular, achados altamente sugestivos de pielonefrite ativa (Magalhães et al., 2019 / Lee et al., 2023).',
      source: 'Frontiers in Veterinary Science (CC BY 4.0)',
      url: '/consulta-vet/pielonefrite-caes-gatos/ultrassonografia-pieloectasia-debris.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-ultrassom-pielonefrose-obstrutiva',
      title: 'Figura 2 — Ultrassonografia e Tomografia de Pielonefrose Obstrutiva por Ureterolitíase',
      legend:
        'Imagem de pelvicaliectasia acentuada com dilatação grave da pelve renal preenchida por líquido ecogênico particulado purulento secundário à obstrução do ureter proximal por cálculo radiopaco (ureterolitíase por oxalato de cálcio), caracterizando pielonefrose obstrutiva que exige intervenção descompressiva de urgência (SUB ou stent) associada à antibioticoterapia (Lee et al., 2023).',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science (CC BY 4.0)',
      url: '/consulta-vet/pielonefrite-caes-gatos/ultrassom-pielonefrose-obstrutiva.webp',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-tomografia-pielonefrite-enfisematosa',
      title: 'Figura 3 — Tomografia Computadorizada de Pielonefrite Enfisematosa com Gás no Parênquima',
      legend:
        'Corte tomográfico transversal de abdômen demonstrando focos de hipoatenuação acentuada correspondentes a coleções de gás no interior do parênquima renal e no sistema coletor pélvico (pielonefrite enfisematosa) provocados por bactérias fermentadoras produtoras de gás em paciente diabético descompensado (Lee et al., 2023).',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science (CC BY 4.0)',
      url: '/consulta-vet/pielonefrite-caes-gatos/tomografia-pielonefrite-enfisematosa.webp',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-sedimento-cilindro-leucocitario',
      title: 'Figura 4 — Fotomicromicrografia de Sedimento Urinário com Cilindro Leucocitário',
      legend:
        'Exame microscópico de sedimento urinário fresco (aumento de 400x) demonstrando cilindro leucocitário intacto composto por neutrófilos inclusos em matriz proteica de uromodulina (Tamm-Horsfall), achado patognomônico de inflamação e infiltração leucocitária originada no parênquima tubular renal (ConsultaVET Atlas de Urinálise).',
      source: 'ConsultaVET Atlas de Sedimento Urinário (CC BY-SA 4.0)',
      url: '/consulta-vet/pielonefrite-caes-gatos/sedimento-cilindro-leucocitario.jpg',
      aspectRatio: '4:3',
    },
  ],

  relatedConsensusSlugs: [
    'weese-terminologia-infeccoes-urinarias-2026',
    'iscaid-itu-caes-gatos-2019',
    'iris-lra-2026',
    'acvim-urolitiase-caes-gatos-2016',
  ],

  relatedDiseaseSlugs: [
    'lesao-renal-aguda-felina',
    'doenca-renal-cronica-caes-gatos',
    'prostatite-caes-gatos',
    'cistite-enfisematosa-caes-gatos',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'obstrucao-funcional-fluxo-urinario-caes',
    'sepse-canina',
    'sepse-felina',
  ],

  relatedMedicationSlugs: [
    'marbofloxacina',
    'pradofloxacina',
    'enrofloxacina',
    'amoxicilina-clavulanato',
    'ceftriaxona',
    'buprenorfina',
    'metadona',
  ],

  references: [
    {
      id: 'ref-weese-delphi-2026',
      citation:
        'Weese JS, et al. International Delphi consensus statement on terminology and definitions for infectious diseases of the urinary tract in dogs and cats. Journal of Small Animal Practice. 2026;67(4):215-230.',
      url: 'https://doi.org/10.1111/jsap.70127',
    },
    {
      id: 'ref-iscaid-urinary-2019',
      citation:
        'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. The Veterinary Journal 2019; 247: 8-25.',
      url: 'https://doi.org/10.1016/j.tvjl.2019.02.008',
    },
    {
      id: 'ref-nelson-couto-6ed-cap42',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 42: Bacterial Cystitis, Pyelonephritis, and Prostatitis in the Dog and Cat, pp. 709-724.',
    },
    {
      id: 'ref-jessen-saa-felina-2026',
      citation:
        'Jessen LR, et al. Serum amyloid A as a diagnostic and monitoring biomarker for pyelonephritis in cats. Journal of Small Animal Practice. 2026;67(5):290-299.',
      url: 'https://doi.org/10.1111/jsap.70140',
    },
    {
      id: 'ref-viviano-saa-monitoring-2026',
      citation:
        'Viviano KR, et al. Evaluation of serum amyloid A for therapeutic monitoring in feline upper urinary tract infections. Journal of Feline Medicine and Surgery. 2026;28(2):1098612X251330965.',
      url: 'https://doi.org/10.1177/1098612X251330965',
    },
    {
      id: 'ref-fidanzio-crp-caes-2026',
      citation:
        'Fidanzio E, et al. Evaluation of serum C-reactive protein concentrations in dogs with lower urinary tract disease, bacterial prostatitis, and pyelonephritis. Journal of Veterinary Internal Medicine. 2026;40(2):488-498.',
      url: 'https://doi.org/10.1111/jvim.17042',
    },
    {
      id: 'ref-bouillon-pielonefrite-caes-2018',
      citation:
        'Bouillon J, Snead E, Caswell J, et al. Pyelonephritis in dogs: 47 cases (2005-2015). Journal of Veterinary Internal Medicine 2018; 32(1): 249-259.',
      url: 'https://doi.org/10.1111/jvim.14836',
    },
    {
      id: 'ref-quimby-pieloectasia-gatos-2017',
      citation:
        'Quimby JM, Olea-Popelka F, Lapointe C, et al. Evaluation of renal pelvic and proximal ureteral dilation in cats with and without chronic kidney disease, pyelonephritis, and ureteral obstruction. Journal of Feline Medicine and Surgery 2017; 19(4): 374-378.',
      url: 'https://doi.org/10.1177/1098612X16656910',
    },
    {
      id: 'ref-kyles-berent-ureteral-culture',
      citation:
        'Kyles AE, Hardie EM, Hobson HP, et al. Management and outcome of feline ureteral calculi: a retrospective study of 45 cases (1998-2005). Journal of the American Veterinary Medical Association 2005; 226(6): 937-944.',
      url: 'https://doi.org/10.2460/javma.2005.226.937',
    },
    {
      id: 'ref-icatcare-isfm-stewardship-2025',
      citation:
        'International Cat Care & International Society of Feline Medicine (ISFM). 2025 Responsible Antimicrobial Stewardship Guidelines in Feline Practice. Journal of Feline Medicine and Surgery 2025; 27(1): 1-28.',
      url: 'https://doi.org/10.1177/1098612X241289050',
    },
    {
      id: 'ref-drobatz-feline-ecc-2023',
      citation:
        'Drobatz KJ, Beal MW, Syring RS. Feline Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell; 2023. Chapter 23: Acute Kidney Injury and Upper Urinary Tract Disorders, pp. 312-330.',
    },
    {
      id: 'ref-aaha-fluidos-2024',
      citation:
        'Davis H, Jensen T, Johnson A, et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association 2024; 60(4): 125-148.',
      url: 'https://doi.org/10.5326/JAAHA-MS-7434',
    },
    {
      id: 'ref-iris-aki-grading-2026',
      citation:
        'International Renal Interest Society. IRIS Grading of Acute Kidney Injury (AKI) in Dogs and Cats. IRIS Guidelines, reissued 2026.',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-greene-infectious-5ed',
      citation:
        'Sykes JE, ed. Greene’s Infectious Diseases of the Dog and Cat. 5th ed. St. Louis: Elsevier; 2023. Bacterial Urinary Tract Infections, pp. 892-915.',
    },
  ],

  isPublished: true,
};
