import { MedicationRecord } from '../../types/medication';

export const nitroprussiatoDeSodioMedicationRecord: MedicationRecord = {
  id: 'nitroprussiato-de-sodio',
  slug: 'nitroprussiato-de-sodio',
  title: 'Nitroprussiato de sódio (Nitroprusseto)',
  activeIngredient: 'Nitroprussiato de sódio di-hidratado',
  tradeNames: [
    'Nitrop® 25 mg/mL ampola 2 mL — 50 mg (Hypofarma, Reg. MS 1.0387.0012)',
    'Nitroprus® 50 mg pó liofilizado + diluente SG 5% 2 mL + bolsa fotoprotetora (Cristália, Reg. MS 1.0298.0218)',
  ],
  pharmacologicClass:
    'Vasodilatador arterial e venoso direto de ação imediata (doador de óxido nítrico / ativador da guanilato ciclase solúvel); anti-hipertensivo parenteral de alto risco em UTI',
  category: 'cardiologia',
  species: ['dog', 'cat'],
  officialSiteUrl: 'https://hypofarma.com.br/portfolio-item/nitrop-2/',
  leafletUrl: 'https://www.cristalia.com.br/produto/138/bula-profissional',
  routes: [
    'Via Intravenosa Contínua (IV CRI EXCLUSIVA — em bomba de infusão após reconstituição 50 mg/2 mL e diluição em SG 5% de 100, 250, 500 ou 1.000 mL)',
  ],
  isControlled: false,
  controlNotice:
    'Medicamento hospitalar de ALTO RISCO em terapia intensiva (receita simples, fora da Portaria SVS/MS nº 344/1998); uso exclusivamente intravenoso contínuo sob monitorização contínua da pressão arterial.',
  plainLanguageSummary:
    'Vasodilatador balanceado (arterial e venoso) mais potente e rapidamente titulável da medicina intensiva veterinária. Atua liberando óxido nítrico diretamente na musculatura lisa vascular, reduzindo pós-carga e pré-carga em 1 a 2 minutos após o início da bomba e cessando em 1 a 10 minutos após desligar. É reservado para emergências hipertensivas com lesão aguda de órgãos-alvo, edema pulmonar cardiogênico refratário (especialmente em cães com doença valvar mitral estágio D), crises adrenérgicas de feocromocitoma ou intoxicação simpaticomimética.\n\n**Como reconstituir e diluir (passo a passo conforme bulas):** o frasco-ampola em pó contém **50 mg** acompanhado de **2 mL de diluente (SG 5%)** — ao misturar, obtém-se a solução preliminar concentrada de **25 mg/mL (25.000 µg/mL)** (mesma concentração da ampola líquida pronta de 2 mL). **Jamais infundir direto**: diluir obrigatoriamente em **SG 5%** e proteger imediatamente da luz. Usando o frasco inteiro (**2 mL = 50 mg**): em **1.000 mL** = **50 µg/mL** (`0,05 mg/mL`); em **500 mL** = **100 µg/mL** (`0,1 mg/mL`, padrão clássico); em **250 mL** = **200 µg/mL** (`0,2 mg/mL`, preferido em edema pulmonar); e em **100 mL** = **500 µg/mL** (`0,5 mg/mL`, concentração muito alta fora da tabela padrão de bula — reservada à bomba de seringa/restrição hídrica extrema). Em cães pequenos e gatos usando frasco/bolsa de **100 mL**, prefira **fracionar a solução reconstituída (25 mg/mL)**: `0,2 mL` (`5 mg`) em 100 mL = **50 µg/mL**; `0,4 mL` (`10 mg`) em 100 mL = **100 µg/mL**; `0,8 mL` (`20 mg`) em 100 mL = **200 µg/mL**.',
  tags: [
    'nitroprussiato de sódio',
    'nitroprusseto de sódio',
    'Nitrop',
    'Nitroprus',
    'vasodilatador balanceado',
    'doador de óxido nítrico',
    'GMPc',
    'emergência hipertensiva',
    'edema pulmonar cardiogênico',
    'doença valvar mitral',
    'feocromocitoma',
    'intoxicação por cianeto',
    'tiocianato',
    'metemoglobinemia',
    'CRI UTI',
    'fotoproteção',
  ],
  relatedDiseaseSlugs: [
    'hipertensao-arterial-sistemica-caes-gatos',
    'doenca-valvar-mitral-degenerativa-caes',
    'cardiomiopatia-dilatada-caes-gatos',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'cardiomiopatia-restritiva-felina',
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
    'doenca-renal-cronica-canina',
    'doenca-renal-cronica-felina',
  ],
  mechanismOfAction:
    'Complexo de coordenação nitrosil-pentacianoferrato (Na₂[Fe(CN)₅NO]·2H₂O; ~297,95 g/mol) que reage rapidamente no sangue com oxi-hemoglobina e grupos sulfidrila de eritrócitos e proteínas plasmáticas para liberar óxido nítrico (NO) independentemente da síntese endotelial. O NO difunde-se até a musculatura lisa arteriolar e venosa, liga-se ao grupo heme da guanilato ciclase solúvel (sGC), eleva o GMPc intracelular e ativa a proteína quinase G (PKG), reduzindo o cálcio citosólico livre, aumentando seu sequestro pelo retículo sarcoplasmático e favorecendo a desfosforilação da cadeia leve de miosina pela fosfatase da miosina. O resultado é relaxamento imediato de arteríolas (queda acentuada da resistência vascular sistêmica e pós-carga) e vênulas de capacitância (aumento do reservatório venoso não estressado, reduzindo retorno venoso, pressão atrial esquerda e congestão pulmonar). Na mesma reação redox com a hemoglobina são formadas cianometa-hemoglobina, metemoglobina e íons cianeto livres (CN⁻), os quais inibem a citocromo c oxidase mitocondrial (complexo IV) caso superem a capacidade de conversão hepática/tecidual pela rodanase dependente de enxofre a tiocianato (SCN⁻).',
  indications: [
    'Emergência hipertensiva com lesão aguda ou progressiva de órgãos-alvo (cérebro, retina, rins ou coração — tipicamente PAS ≥ 180 mmHg): redução gradual titulada da pressão arterial conforme meta do Consenso ACVIM (2018).',
    'Edema pulmonar cardiogênico fulminante refratário à oxigenoterapia e diureticoterapia de alça (especialmente na insuficiência mitral mixomatosa canina avançada estágios C/D para reduzir pós-carga e fração regurgitante).',
    'Insuficiência cardíaca aguda de baixo débito com resistência vascular e pressões de enchimento elevadas: associação especializada à dobutamina após avaliação ecocardiográfica confirmando disfunção sistólica.',
    'Crise hipertensiva intraoperatória por manipulação cirúrgica de feocromocitoma ou hipertensão perioperatória grave (incluindo pós-reperfusão de transplante renal ou hiperadrenocorticismo descompensado).',
    'Crise hipertensiva refratária induzida por simpaticomiméticos ou síndrome serotoninérgica (ex.: intoxicação grave por fenilpropanolamina, anfetaminas ou excesso de fenilefrina quando outros bloqueadores foram insuficientes).',
    'Hipotensão arterial deliberada transoperatória em cirurgia vascular complexa (ex.: ligadura de persistência do ducto arterioso sob anestesia especializada — indicação de exceção, fora da rotina clínica).',
  ],
  contraindications: [
    'Hipertensão arterial compensatória secundária a obstrução anatômica ao fluxo (ex.: coarctação da aorta, shunts arteriovenosos) ou hipertensão compensatória intracraniana por resposta de Cushing (pode colapsar a pressão de perfusão distal/cerebral).',
    'Uso concomitante de inibidores da fosfodiesterase-5 (sildenafil, tadalafil) ou estimuladores da guanilato ciclase solúvel (riociguate): risco potencialmente fatal de vasodilatação sinérgica e hipotensão refratária por acúmulo extremo de GMPc.',
    'Perfusão cerebral já inadequada, hipertensão intracraniana descompensada / traumatismo cranioencefálico (o nitroprussiato dilata a vasculatura cerebral e pode elevar o fluxo sanguíneo cerebral e a pressão intracraniana) ou cirurgia de emergência em paciente agônico.',
    'Insuficiência cardíaca ou choque circulatório com resistência vascular sistêmica já baixa (choque distributivo/séptico) ou hipovolemia não corrigida.',
    'Cardiomiopatias com obstrução dinâmica da via de saída ou dependência extrema de pré-carga/disfunção diastólica grave (ex.: estenose subaórtica severa ou cardiomiopatia hipertrófica obstrutiva sem congestão responsiva) sem monitorização ecocardiográfica.',
    'Ausência de bomba de infusão precisa, cateter venoso seguro e monitorização contínua da pressão arterial (direta invasiva ou Doppler contínua) em ambiente hospitalar.',
  ],
  cautions: [
    'MEDICAMENTO DE ALTO RISCO E ERRO DE DILUIÇÃO FATAL: a ampola a 25 mg/mL equivale a 25.000 µg/mL (250 vezes mais concentrada que uma bolsa diluída a 100 µg/mL). Confundir µg/kg/min com mg/kg/min introduz erro de 1.000 vezes.',
    'PROIBIDO BOLUS OU FLUSH NO ACESSO: nunca lavar (flush) o cateter ou extensor contendo nitroprussiato residual; mesmo pequenos volumes retidos na linha venosa desencadeiam hipotensão súbita grave.',
    'FOTOPROTEÇÃO E MUDANÇA DE COR: a luz reduz o ferro férrico (Fe³⁺) a ferroso (Fe²⁺) com perda rápida de potência (acelerada em bolsas PVC expostas à luz fluorescente). Soluções frescas em SG 5% apresentam tom palha/laranja-claro/levemente amarronzado; descartar imediatamente se ficarem azuis, verdes ou vermelho-escuras. Seguir bula brasileira do Nitroprus® protegendo bolsa e equipo.',
    'DILUENTE PADRÃO NO BRASIL É SG 5%: não extrapolar veículo de solução pronta norte-americana (NaCl 0,9%) para diluir os concentrados/liofilizados brasileiros sem validação específica de estabilidade.',
    'NÃO CONFUNDIR OS NOMES (SAFETY LOOK-ALIKE): nunca confundir nitroPRUSSIATO com nitroGLICERINA ou nitroFURANTOÍNA; se houver uso prévio de pasta de nitroglicerina no edema pulmonar, suspendê-la ao iniciar o nitroprussiato.',
    'RISCO DE TOXICIDADE POR CIANETO E TIOCIANATO: infusões acima de 2 µg/kg/min produzem cianeto acima da capacidade fisiológica habitual; taxas máximas (10–15 µg/kg/min) jamais devem exceder 10 minutos sem controle clínico; interromper idealmente antes de 48–72 h. Hepatopatia, nefropatia (meia-vida do tiocianato salta além de 2,7–7 dias), hiponatremia, hipotireoidismo e deficiência de vitamina B₁₂ ou enxofre agravam a toxicidade.',
    'SENSIBILIDADE FELINA E RISCO OXIDATIVO: gatos exibem escassa literatura clínica e maior suscetibilidade eritrocitária a dano oxidativo e formação de metemoglobina; utilizar sempre a menor taxa eficaz (tipicamente 0,5–3 µg/kg/min, raramente até 5 µg/kg/min em protocolos críticos pontuais).',
    'REFRAÇÃO / TOLERÂNCIA E INTERAÇÕES ANESTÉSICAS: em anestesia geral, reduz a pressão do esfíncter esofágico inferior (LESP), aumentando risco de refluxo gastroesofágico perioperatório. Ao contrário da nitroglicerina, não gera tolerância clássica precoce em uso curto — embora haja relato de perda de resposta em cardiopatas refratários, e tolerância súbita deve também alertar para toxicidade precoce por cianeto.',
  ],
  adverseEffects: [
    'Hipotensão arterial severa dose-dependente com hipoperfusão renal (oligúria/LRA), cerebral (depressão/convulsões), coronariana e acidose láctica secundária.',
    'Taquicardia sinusal reflexa mediada por barorreceptores e ativação simpática compensatória (ou bradicardia/arritmias em instabilidade severa).',
    'Intoxicação aguda por cianeto (inibição do complexo IV mitocondrial / hipóxia histotóxica): hiperlactatemia, acidose metabólica progressiva, aumento paradoxal da saturação venosa de O₂ (baixa extração celular), taquicardia, hiperventilação, tremores, convulsões e colapso cardiovascular.',
    'Intoxicação subaguda por tiocianato (> 60–100 µg/mL em referência humana/veterinária, especialmente em nefropatas e infusões > 48–72 h): agitação, delírio em cães, hiperreflexia, convulsões, náusea e supressão tireoidiana.',
    'Metemoglobinemia e lesão oxidativa de eritrócitos (sangue amarronzado, cianose refratária ao oxigênio e falsa leitura na oximetria de pulso convencional — requer co-oximetria), com maior preocupação em felinos.',
    'Elevação da pressão intracraniana por vasodilatação arterial cerebral e relaxamento do esfíncter esofágico inferior durante anestesia.',
    'Irritação venosa local, dor à infusão ou lesão tecidual local em extravasamento.',
  ],
  interactions: [
    'Inibidores de PDE5 (sildenafil, tadalafil) e estimuladores de sGC (riociguate): CONTRAINDICAÇÃO ABSOLUTA — acúmulo sinérgico de GMPc com risco de colapso circulatório severo.',
    'Anestésicos inalatórios (isoflurano, sevoflurano) e propofol: hipotensão profunda aditiva; requer ajuste simultâneo de plano anestésico e PA invasiva.',
    'Outros anti-hipertensivos e vasodilatadores (amlodipino, hidralazina, enalapril, benazepril, telmisartan, prazosina, acepromazina): potencialização acentuada da queda pressórica e risco de lesão renal pré-renal.',
    'Betabloqueadores (propranolol, esmolol, atenolol) e bloqueadores de canais de cálcio inotrópicos negativos (verapamil, diltiazem): atenuam taquicardia reflexa compensatória e podem agravar baixo débito cardíaco.',
    'Dobutamina: sinergismo hemodinâmico benéfico em baixo débito cardíaco canino (inotropismo + redução de pós-carga) sob ecocardiografia e vigilância estrita.',
    'Anticolinérgicos / antimuscarínicos (atropina, propantelina): podem potencializar efeitos adversos hemodinâmicos; na hipertensão por intoxicação por fenilpropanolamina, atropina é estritamente contraindicada na bradicardia reflexa.',
    'Incompatibilidades em linha/bolsa: incompatível em mesma bolsa com qualquer fármaco; em Y-site, bula brasileira do Nitroprus® cita incompatibilidade com levofloxacino e atracúrio (divergência frente ao formulário norte-americano que relata compatibilidade do atracúrio) — preferir acesso venoso exclusivo.',
  ],
  administration: [
    'Preparo rigoroso e duplo-check: reconstituir o pó liofilizado de 50 mg com 2 mL do diluente SG 5% (ou aspirar os 2 mL da ampola de 25 mg/mL = 50 mg) e diluir em bolsa de SG 5%: 1.000 mL (50 µg/mL), 500 mL (100 µg/mL) ou 250 mL (200 µg/mL), escolhendo o volume considerando restrição hídrica em cardiopatas.',
    'Identificar a bolsa com concentração em µg/mL, data/hora e etiqueta de MEDICAMENTO DE ALTO RISCO; envolver imediatamente a bolsa com material fotoprotetor opaco (e proteger o equipo quando exigido pela bula do fabricante como Nitroprus®).',
    'Administrar EXCLUSIVAMENTE por bomba de infusão de alta precisão em acesso venoso pérvio dedicado. Nunca administrar em bolus direto e NUNCA realizar flush no equipo conectado.',
    'Calcular pela fórmula mL/h = (Dose [µg/kg/min] × Peso [kg] × 60) / Concentração [µg/mL] e titular mediante monitorização contínua de PA (invasiva preferencial ou Doppler contínuo), ECG, lactato e perfusão.',
    'Ao suspender após estabilização, reduzir gradualmente em 10–30 minutos enquanto inicia terapia oral de manutenção (exceto se houver hipotensão grave ou suspeita de toxicidade por cianeto, quando a suspensão é imediata).',
  ],
  quickSummaryHighlights: [
    'Ampola Nitrop® 25 mg/mL = 25.000 µg/mL (250× mais concentrada que diluição de 100 µg/mL); diluir SEMPRE em SG 5% antes de infundir em bomba.',
    'Emergência hipertensiva ACVIM: iniciar 0,5 µg/kg/min (0,5–3,5 µg/kg/min cães; dados felinos limitados 0,5–3 µg/kg/min) visando reduzir PAS ~10% na 1ª hora e ~15% nas horas seguintes.',
    'Edema pulmonar cardiogênico refratário / MMVD estágio D: iniciar 0,5–1 µg/kg/min e titular q10–30min (maioria responde a 2–3 µg/kg/min; tetos de 10–15 µg/kg/min são exceção de risco alto).',
    'Metabolização direta gera cianeto (→ tiocianato renal): taxas > 2 µg/kg/min excedem desintoxicação basal e taxas máximas (10 µg/kg/min) nunca devem passar de 10 minutos.',
    'Contraindicado com sildenafil/tadalafil, hipertensão compensatória/PIC elevada e hipovolemia; NUNCA realizar flush do equipo.',
  ],
  pillars: [
    {
      title: 'Vasodilatação Balanceada via NO',
      icon: 'heart-pulse',
      desc: 'Libera óxido nítrico intracelular (ativando guanilato ciclase → GMPc → PKG), reduzindo simultaneamente pós-carga arterial (RVS) e pré-carga venosa em 1–2 minutos, independente de receptores α ou endotélio íntegro.',
    },
    {
      title: 'Titulação Minuto a Minuto',
      icon: 'gauge',
      desc: 'Meia-vida circulante ~2 min e reversão pressórica em 1–10 min ao desligar a bomba, permitindo reduzir gradualmente emergências hipertensivas ou ajustar pós-carga no feocromocitoma e edema pulmonar refratário.',
    },
    {
      title: 'Risco Metabólico (CN⁻ / SCN⁻)',
      icon: 'shield-alert',
      desc: 'A mesma reação com hemoglobina que gera NO libera cianeto (bloqueia citocromo c oxidase) e gera tiocianato renal (meia-vida 2,7–7 dias). Duração curta na PA não impede toxicidade cumulativa severa.',
    },
    {
      title: 'Reconstituição (50 mg + 2 mL) & Diluições',
      icon: 'syringe',
      desc: '50 mg pó + 2 mL diluente = 25 mg/mL (25.000 µg/mL). Frasco inteiro em SG 5%: 1.000 mL → 50 µg/mL | 500 mL → 100 µg/mL | 250 mL → 200 µg/mL | 100 mL → 500 µg/mL. Para 100 mL em pequenos portes, aspirar fração de 25 mg/mL (0,4 mL = 100 µg/mL). Fotoproteger e proibir flush.',
    },
  ],
  clinicalWarningItems: [
    {
      label: 'PERIGO DE ERRO FATAL DE CONCENTRAÇÃO (250×) E FATOR 1.000',
      text: 'O frasco reconstituído (50 mg em 2 mL) e a ampola pronta têm 25 mg/mL (25.000 µg/mL) — 250× mais concentrados que a bolsa de 100 µg/mL (50 mg/500 mL) e 50× mais que 100 mL com o frasco inteiro (500 µg/mL). Confundir µg/kg/min com mg/kg/min gera erro de 1.000×; conferir por dois profissionais.',
    },
    {
      label: 'BOLSA DE 100 mL: FRASCO INTEIRO (500 µg/mL) VS FRACIONAMENTO',
      text: 'As bulas nacionais padronizam 50 mg em 250, 500 ou 1.000 mL de SG 5%. Colocar os 50 mg (2 mL) inteiros em 100 mL gera 500 µg/mL (vazão 5× menor). Em cães pequenos/gatos usando 100 mL, aspire apenas fração do reconstituído (0,2 mL = 50 µg/mL; 0,4 mL = 100 µg/mL; 0,8 mL = 200 µg/mL), descartando o soro excedente antes de injetar.',
    },
    {
      label: 'NUNCA REALIZAR FLUSH NO CATETER OU BOLUS IV',
      text: 'Lavar a linha contendo nitroprussiato residual injeta um bolus acidental que derruba a pressão arterial em segundos, com risco de isquemia cerebral, renal e parada cardíaca.',
    },
    {
      label: 'CONTRAINDICAÇÃO CRÍTICA COM SILDENAFIL / TADALAFIL E NO TCE',
      text: 'Associação com inibidores da PDE5 causa hipotensão refratária potencialmente letal. Em pacientes neurológicos com hipertensão intracraniana, a vasodilatação cerebral agrava a PIC e o reflexo de Cushing.',
    },
    {
      label: 'INTOXICAÇÃO POR CIANETO, TIOCIANATO E DANO OXIDATIVO FELINO',
      text: 'Infusões > 2 µg/kg/min ou > 48–72 h acumulam cianeto e tiocianato (especialmente em nefropatas/hepatopatas). Monitorar lactato, gasometria (acidose metabólica) e metemoglobina (co-oximetria), mantendo cautela redobrada em gatos.',
    },
  ],
  presentations: [
    {
      id: 'pres-nitroprussiato-nitrop-25',
      label: 'Nitrop® 25 mg/mL — Solução concentrada 50 mg/2 mL (Hypofarma, ampola)',
      name: 'Nitrop® 25 mg/mL — Ampola de 2 mL (50 mg totais)',
      brand: 'Hypofarma (Reg. MS 1.0387.0012)',
      form: 'Solução injetável concentrada estéril para diluição obrigatória',
      presentation: 'Ampola de 2 mL a 25 mg/mL (= 25.000 µg/mL; total de 50 mg em caixa hospitalar com 5 ampolas)',
      concentrationValue: 25,
      concentrationUnit: 'mg/mL',
      route: 'Via Intravenosa Contínua (após diluição em SG 5%)',
      packInfo:
        'CONCENTRADO — JAMAIS INFUNDIR PURO (25.000 µg/mL). Diluir 1 ampola (2 mL = 50 mg) em 1.000 mL (50 µg/mL), 500 mL (100 µg/mL) ou 250 mL (200 µg/mL) de SG 5% — ou fracionar (0,2–0,8 mL) para frascos de 100 mL — e proteger imediatamente da luz.',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-nitroprussiato-nitroprus-50',
      label: 'Nitroprus® 50 mg — Pó liofilizado + diluente SG 5% 2 mL + fotoprotetor (Cristália)',
      name: 'Nitroprus® 50 mg — Frasco-ampola pó liofilizado + diluente SG 5%',
      brand: 'Cristália (Reg. MS 1.0298.0218)',
      form: 'Pó liofilizado estéril para reconstituição e diluição IV',
      presentation: 'Frasco-ampola de 50 mg acompanhado de ampola diluente (SG 5% 2 mL) e envelope fotoprotetor',
      concentrationValue: 50,
      concentrationUnit: 'mg/frasco',
      route: 'Via Intravenosa Contínua (após reconstituição e diluição em SG 5%)',
      packInfo:
        'PASSO 1 (Reconstituição): injetar os 2 mL do diluente próprio (SG 5%) no frasco de 50 mg → solução mãe a 25 mg/mL (25.000 µg/mL), estável por até 4 h ao abrigo da luz. PASSO 2 (Diluição): transferir para 1.000 mL (50 µg/mL), 500 mL (100 µg/mL) ou 250 mL (200 µg/mL) de SG 5% (estável até 24 h protegido da luz; bula exige fotoproteção de bolsa e equipo).',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-nitroprussiato-diluido-100',
      label: 'Diluição padrão UTI em 500 mL de SG 5% — 100 µg/mL (50 mg em 500 mL)',
      name: 'Solução diluída padrão 100 µg/mL (50 mg em 500 mL SG 5%)',
      brand: 'Preparo asséptico à beira do leito (Nitrop® 2 mL ou Nitroprus® 50 mg reconstituído em 2 mL)',
      form: 'Solução diluída para bomba de infusão intravenosa contínua',
      presentation: '50 mg (2 mL da solução a 25 mg/mL) diluídos em 500 mL de SG 5% (= 100 µg/mL = 0,1 mg/mL)',
      concentrationValue: 100,
      concentrationUnit: 'mcg/mL',
      route: 'Via Intravenosa Contínua em bomba de infusão (acesso exclusivo)',
      packInfo:
        'Concentração intermediária mais utilizada na rotina hospitalar. Para cada 1 µg/kg/min, infundir 0,6 mL/kg/h (ex.: cão 10 kg a 1 µg/kg/min = 6 mL/h). Na bolsa de 1.000 mL (50 mg/1.000 mL = 50 µg/mL), a vazão dobra (1,2 mL/kg/h). Estabilidade 24 h fotoprotegida; descartar se azul, verde ou vermelho-escuro.',
      channel: 'compounded',
    },
    {
      id: 'pres-nitroprussiato-diluido-200',
      label: 'Diluição concentrada p/ restrição hídrica em 250 mL SG 5% — 200 µg/mL (50 mg em 250 mL)',
      name: 'Solução concentrada 200 µg/mL (50 mg em 250 mL SG 5%)',
      brand: 'Preparo asséptico à beira do leito para cardiopatas / edema pulmonar',
      form: 'Solução diluída concentrada para bomba de infusão IV contínua',
      presentation: '50 mg (2 mL da solução a 25 mg/mL) diluídos em 250 mL de SG 5% (= 200 µg/mL = 0,2 mg/mL)',
      concentrationValue: 200,
      concentrationUnit: 'mcg/mL',
      route: 'Via Intravenosa Contínua em bomba de infusão (acesso exclusivo)',
      packInfo:
        'Preferida em edema pulmonar cardiogênico refratário para evitar sobrecarga volêmica pelo diluente: entrega apenas 0,3 mL/kg/h para cada 1 µg/kg/min (ex.: cão 20 kg a 3 µg/kg/min = 18 mL/h em vez de 36 mL/h a 100 µg/mL).',
      channel: 'compounded',
    },
    {
      id: 'pres-nitroprussiato-diluido-100ml',
      label: 'Preparo em minibolsa/frasco de 100 mL SG 5% — Fracionado (50–250 µg/mL) ou Frasco Inteiro (500 µg/mL)',
      name: 'Preparo em 100 mL de SG 5% para pequenos portes / bomba de seringa',
      brand: 'Preparo asséptico fracionado a partir da solução mãe 25 mg/mL (50 mg em 2 mL)',
      form: 'Solução em pequeno volume (100 mL) para gatos, cães toy ou restrição hídrica severa',
      presentation:
        'Em 100 mL de SG 5%: 0,2 mL (5 mg) → 50 µg/mL | 0,4 mL (10 mg) → 100 µg/mL | 0,8 mL (20 mg) → 200 µg/mL | 1,0 mL (25 mg) → 250 µg/mL | 2,0 mL (50 mg, frasco inteiro) → 500 µg/mL',
      concentrationValue: 100,
      concentrationUnit: 'mcg/mL',
      route: 'Via Intravenosa Contínua em bomba de infusão / bomba de seringa (acesso exclusivo)',
      packInfo:
        'ATENÇÃO: adicionar o frasco inteiro (50 mg = 2 mL) em 100 mL de SG 5% produz 500 µg/mL (0,5 mg/mL; 0,12 mL/kg/h a 1 µg/kg/min), fora da tabela padrão de 250/500/1.000 mL das bulas e com risco ampliado de erro em animais pequenos. Para obter 100 µg/mL em 100 mL, aspire 0,4 mL da solução reconstituída (25 mg/mL), retire 0,4 mL de SG 5% do frasco de 100 mL e injete o fármaco (o restante no frasco original dura até 4 h ao abrigo da luz).',
      channel: 'compounded',
    },
  ],
  doses: [
    {
      id: 'dose-snp-dog-emergencia-hipertensiva',
      species: 'dog',
      indication: 'Emergência hipertensiva com lesão aguda de órgãos-alvo (PAS ≥ 180 mmHg)',
      doseMin: 0.5,
      doseMax: 3.5,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— iniciar em 0,5 µg/kg/min e titular a cada 5–15 min buscando redução gradual da PAS (~10% na 1ª hora e ~15% nas horas seguintes)',
      duration: 'Até estabilização pressórica e transição segura para anti-hipertensivo oral de manutenção',
      clinicalContext:
        'Consenso ACVIM (2018) em cães: queda abrupta da PA abaixo da autorregulação cerebral/renal provoca isquemia iatrogênica; usar somente em UTI com monitorização pressórica contínua.',
      evidenceLevel: 'Consenso ACVIM (2018) em cães — baixa evidência direta comparativa',
      monitoring:
        'Pressão arterial invasiva (preferencial) ou Doppler contínua, ECG contínuo, perfusão periférica, função renal, débito urinário, lactato e gasometria.',
      notes:
        'Referências de medicina interna também descrevem início em 1–2 µg/kg/min até limite de 10 µg/kg/min. Cálculo de bomba: mL/h = (Dose [µg/kg/min] × Peso [kg] × 60) / Concentração da bolsa [µg/mL] (50, 100 ou 200 µg/mL em SG 5%).',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-cat-emergencia-hipertensiva',
      species: 'cat',
      indication: 'Emergência hipertensiva com lesão aguda de órgãos-alvo em felinos (uso cauteloso)',
      doseMin: 0.5,
      doseMax: 3,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— iniciar em 0,5 µg/kg/min (0,5–1 µg/kg/min) e titular lentamente conforme resposta pressórica, evitando ultrapassar 3–5 µg/kg/min',
      duration: 'Uso mais curto possível (poucas horas até máximo ~24 h), transicionando precocemente para amlodipino oral/retal',
      clinicalContext:
        'Extrapolação cautelosa com dados clínicos escassos em gatos (em série retrospectiva recente de emergências hipertensivas, nenhum gato recebeu nitroprussiato); felinos são mais vulneráveis a hipotensão fatal e lesão oxidativa eritrocitária.',
      evidenceLevel: 'Consenso ACVIM / formulários cardiológicos — evidência clínica felina limitada',
      monitoring:
        'Pressão arterial contínua (Doppler/arterial), frequência cardíaca, exame fundoscópico/neurológico, hematócrito/co-oximetria (metemoglobina), lactato e estado ácido-base.',
      notes:
        'Manuais de emergência felina e endocrinologia aguda também citam faixa de 0,5–5 µg/kg/min em tempestade tireoidiana ou hiperaldosteronismo hipertensivo, mas recomendam começar baixo e limitar duração pela toxicidade por cianeto e dano oxidativo.',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-dog-icc-mmvd-refrataria',
      species: 'dog',
      indication:
        'Edema pulmonar cardiogênico refratário / Doença valvar mitral mixomatosa (MMVD estágios C–D)',
      doseMin: 0.5,
      doseMax: 3,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— iniciar em 0,5–1 µg/kg/min e aumentar em incrementos de 0,5–1 µg/kg/min a cada 10–30 min até melhora respiratória e da perfusão',
      duration: 'Geralmente 12 a 48 h (evitar ultrapassar 72 h) com desmame gradual após início da terapia oral (ex.: IECA / pimobendan)',
      clinicalContext:
        'Adjuvante em UTI junto a oxigênio e furosemida para reduzir pós-carga e fração regurgitante mitral; maioria dos cães responde entre 2 e 3 µg/kg/min (protocolos antigos citam até 5–8 µg/kg/min mantendo PAM > 70 mmHg).',
      evidenceLevel: 'Consenso ACVIM (2019) e formulários cardiológicos — evidência fraca/observacional',
      monitoring:
        'Frequência e esforço respiratórios, ausculta pulmonar, pressão arterial contínua (manter PAM > 70 mmHg), ECG, débito cardíaco quando disponível e função renal.',
      notes:
        'O Consenso ACVIM (2019) cita titulação excepcional até 10–15 µg/kg/min por 12–48 h, porém taxas máximas (≥ 10 µg/kg/min) apresentam alto risco de toxicidade por cianeto e não devem ser mantidas por mais de 10 min sem revisão crítica. Se houver baixo débito por cardiomiopatia dilatada, considerar associação à dobutamina após ecocardiografia e suspender nitroglicerina tópica prévia.',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-cat-edema-pulmonar-refratario',
      species: 'cat',
      indication: 'Edema pulmonar cardiogênico refratário em gatos (uso de exceção em UTI)',
      doseMin: 0.5,
      doseMax: 3,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— iniciar em 0,5–1 µg/kg/min e titular com extrema cautela em incrementos mínimos, raramente até 3–5 µg/kg/min',
      duration: 'Poucas horas até máximo de 24 h sob vigilância contínua em UTI (risco letal de hipotensão e cianeto > 3 dias)',
      clinicalContext:
        'Reservado estritamente a edema pulmonar refratário após toracocentese, oxigenoterapia e furosemida IV; contraindicado se houver obstrução dinâmica de via de saída ventricular (cardiomiopatia hipertrófica obstrutiva) ou hipovolemia.',
      evidenceLevel: 'Formulários cardiológicos e terapia intensiva felina — evidência limitada',
      monitoring:
        'Pressão arterial contínua, frequência respiratória, ecocardiografia POCUS (confirmar ausência de obstrução dinâmica de via de saída), ECG, hematócrito e lactato.',
      notes:
        'Em gatos dependentes de alta pressão de enchimento diastólico (disfunção diastólica grave), a venodilatação brusca pode colapsar o débito cardíaco. Escolher bolsa concentrada se necessário restringir volume de fluidos.',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-feocromocitoma-intraoperatorio',
      species: 'both',
      indication: 'Crise hipertensiva intraoperatória por feocromocitoma ou hipertensão anestésica grave',
      doseMin: 0.1,
      doseMax: 10,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— titular em bomba conforme resposta na pressão arterial invasiva durante picos catecolaminérgicos',
      duration: 'Uso estritamente transoperatório com redução ou suspensão imediata após ligadura venosa e excisão tumoral',
      clinicalContext:
        'Tratado de anestesiologia veterinária consagra o nitroprussiato como agente de escolha nos picos hipertensivos por feocromocitoma (atua diretamente no músculo liso apesar da descarga maciça de catecolaminas); após retirada do tumor pode ocorrer hipotensão severa súbita exigindo suspensão imediata, cristaloides e vasopressores.',
      evidenceLevel: 'Anestesiologia veterinária especializada e séries cirúrgicas (evidência felina escassa)',
      monitoring:
        'Cateter arterial invasivo contínuo (obrigatório), ECG, capnografia, glicemia pós-operatória (risco de hipoglicemia após queda de catecolaminas) e equilíbrio ácido-base.',
      notes:
        'Em protocolos cirúrgicos de emergência também se relatam faixas iniciais de 1–5 µg/kg/min (ou alternativas como fentolamina/sulfato de magnésio e esmolol após bloqueio α prévio). Se a PA cair abruptamente após remoção tumoral em cão pré-tratado com fenoxibenzamina, pode ser necessária vasopressina.',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-toxicologia-simpaticomimeticos',
      species: 'dog',
      indication:
        'Hipertensão grave refratária por intoxicação simpaticomimética (fenilpropanolamina, anfetaminas, síndrome serotoninérgica)',
      doseMin: 1,
      doseMax: 10,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— iniciar em 1 µg/kg/min e ajustar a cada 5–10 min até controle pressórico (faixa usual efetiva de 1–8 µg/kg/min)',
      duration: 'Geralmente desmamada em 12–24 h conforme eliminação do agente tóxico',
      clinicalContext:
        'Empregado quando bloqueadores α-adrenérgicos (ex.: acepromazina) ou bloqueadores de canais de cálcio não controlam hipertensão maligna por intoxicação; na bradicardia reflexa por fenilpropanolamina, atropina é estritamente contraindicada.',
      evidenceLevel: 'Relatos de caso clínicos e manuais de toxicologia emergencial veterinária',
      monitoring:
        'Pressão arterial contínua, ECG (associar esmolol/betabloqueador apenas conforme protocolo antiarrítmico após avaliação vascular), avaliação ocular/neurológica e função renal.',
      notes:
        'Associar terapia específica conforme o agente (ex.: ciproeptadina na síndrome serotoninérgica; betabloqueador para taquiarritmias graves apenas quando a vasoconstrição alfa estiver controlada).',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
    {
      id: 'dose-snp-hipotensao-deliberada-excecao',
      species: 'dog',
      indication:
        'Hipotensão deliberada transoperatória para controle hemorrágico vascular (protocolo de exceção — NÃO rotineiro)',
      doseMin: 5,
      doseMax: 25,
      doseUnit: 'mcg',
      perWeightUnit: 'kg/min',
      route: 'IV CRI',
      frequency:
        '— titulação ultracurta sob anestesia especializada para reduzir transitoriamente a PAM (45–60 mmHg) durante reparo cirúrgico',
      duration: 'Apenas alguns minutos durante manobra crítica de hemostasia vascular (NÃO manter como CRI contínua)',
      clinicalContext:
        'Baseado exclusivamente em série retrospectiva de 6 cães durante complicação cirúrgica de ligadura de ducto arterioso patente; doses > 10 µg/kg/min superam limites usuais de segurança toxicológica para cianeto.',
      evidenceLevel: 'Série retrospectiva pequena (Hunter et al., 2003) — intervenção de resgate excepcional',
      monitoring:
        'Pressão arterial invasiva contínua, ECG, gasometria arterial seriada, lactato e reposição volêmica imediata após controle cirúrgico.',
      notes:
        'NUNCA extrapolar 15–25 µg/kg/min para emergências médicas em UTI ou infusões prolongadas pelo altíssimo risco de intoxicação aguda por cianeto e isquemia orgânica irreversível.',
      calculatorEnabled: false,
      presentationId: 'pres-nitroprussiato-diluido-100',
    },
  ],
  detailedIndications: [
    {
      id: 'ind-snp-emergencia-hipertensiva',
      indication: 'Emergência hipertensiva com lesão aguda de órgãos-alvo (LOA)',
      clinicalContext:
        'Pacientes com PAS gravemente elevada (geralmente ≥ 180 mmHg) acompanhada de encefalopatia/convulsões, hemorragia ou descolamento de retina agudo, lesão renal aguda progressiva ou edema/descompensação cardíaca aguda. PAS alta isolada sem LOA não justifica terapia parenteral agressiva imediata.',
      species: 'both',
      dose: 'Cães: 0,5–3,5 µg/kg/min (início 0,5–1 µg/kg/min) | Gatos: 0,5–3 µg/kg/min (evidência limitada)',
      route: 'IV CRI exclusiva em SG 5%',
      frequency: 'Titulação a cada 5–15 min buscando queda gradual de ~10% da PAS na 1ª hora e ~15% nas horas seguintes',
      duration: 'Até estabilização e transição para anti-hipertensivos orais (ex.: amlodipino / telmisartan / IECA)',
      mechanismOfAction:
        'Relaxa diretamente o músculo liso arteriolar via liberação de NO e aumento de GMPc/PKG, diminuindo rapidamente a resistência vascular sistêmica (PAM ≈ DC × RVS) em poucos minutos.',
      clinicalRationale:
        'Órgãos cronicamente hipertensos (cérebro e rins) deslocam sua curva de autorregulação para cima; normalizar bruscamente a pressão arterial provoca hipoperfusão isquêmica irreversível. A titulação minuto a minuto permite atingir a redução escalonada recomendada pelo Consenso ACVIM (2018), lembrando que nos gatos a experiência é restrita e muitos casos respondem bem ao amlodipino oral/retal quando tolerado.',
      monitoring:
        'Pressão arterial contínua (preferir cateter arterial invasivo ou Doppler contínua), estado neurológico, exame fundoscópico, débito urinário, creatinina, lactato e gasometria.',
      highlights: [
        'Meta ACVIM: −10% na 1ª hora e −15% nas horas seguintes',
        'Evitar normalização abrupta da PA',
        'Transicionar para terapia oral assim que estável',
      ],
      referenceIds: ['ref-snp-acvim-2018', 'ref-snp-beeston-2022', 'ref-snp-plumbs-10', 'ref-snp-ettinger-9'],
      evidenceLevel: 'Consenso ACVIM (2018) em cães; extrapolação cautelosa em gatos',
    },
    {
      id: 'ind-snp-icc-edema-pulmonar',
      indication: 'Edema pulmonar cardiogênico refratário e insuficiência cardíaca aguda (MMVD / baixo débito)',
      clinicalContext:
        'Cães (e casos selecionados em gatos) com dispneia grave e edema pulmonar cardiogênico que não respondem após 30 min a O₂, furosemida IV e manejo básico, ou pacientes com doença valvar mitral mixomatosa (estágio D) e insuficiência ventricular com alto tônus vasoconstritor.',
      species: 'both',
      dose: '0,5–3 µg/kg/min IV CRI (maioria responde a 2–3 µg/kg/min; protocolos citam até 5–10 ou exceção de 10–15 µg/kg/min em cães)',
      route: 'IV CRI exclusiva em SG 5% (preferir bolsa 200 µg/mL se houver restrição hídrica severa)',
      frequency: 'Incrementos de 0,5–1 µg/kg/min a cada 10–30 min conforme resposta respiratória e PA',
      duration: '12–48 h (máximo absoluto recomendado < 72 h em cães e ≤ 24 h em gatos)',
      mechanismOfAction:
        'A arteriodilatação reduz a impedância à ejeção aórtica do ventrículo esquerdo (favorecendo fluxo anterógrado e diminuindo a fração regurgitante mitral), enquanto a venodilatação amplia a capacitância esplâncnica/periférica e alivia a pressão atrial esquerda e capilar pulmonar.',
      clinicalRationale:
        'Em cães com baixa contratilidade miocárdica (ex.: cardiomiopatia dilatada ou choque cardiogênico normo/hipotensivo), vasodilatar isoladamente pode colapsar a PA; nessas situações, recomenda-se confirmar contratilidade por ecocardiografia e iniciar dobutamina em associação controlada. Suspender nitroglicerina tópica ao iniciar o nitroprussiato e escolher concentração de SG 5% que não sobrecarregue o paciente com fluido livre.',
      monitoring:
        'Esforço/frequência respiratória, PAM (manter > 70 mmHg), débito cardíaco quando disponível, ECG, lactato e eletrólitos.',
      highlights: [
        'Reduz pós-carga mitral e pré-carga pulmonar',
        'Atenção à carga hídrica da bolsa em cardiopatas',
        'Associar dobutamina se baixo débito por disfunção sistólica',
      ],
      referenceIds: ['ref-snp-acvim-2019', 'ref-snp-greer-2004', 'ref-snp-manual-ecc', 'ref-snp-feline-ecc'],
      evidenceLevel: 'Consenso ACVIM (2019) e série retrospectiva (Greer et al., 2004) — evidência fraca/limitada',
    },
    {
      id: 'ind-snp-feocromocitoma-toxicologia',
      indication: 'Crise hipertensiva intraoperatória (feocromocitoma) e toxicologia simpaticomimética',
      clinicalContext:
        'Picos hipertensivos extremos desencadeados por manipulação cirúrgica de feocromocitoma, adrenalectomia/hiperadrenocorticismo, reperfusão em transplante renal ou intoxicações refratárias (fenilpropanolamina, anfetaminas, síndrome serotoninérgica).',
      species: 'both',
      dose: '0,1–10 µg/kg/min IV CRI (anestesia/feocromocitoma) | 1–10 µg/kg/min (toxicologia canina)',
      route: 'IV CRI exclusiva em SG 5% com monitorização arterial invasiva preferencial',
      frequency: 'Titulação contínua minuto a minuto em bomba durante picos hipertensivos',
      duration: 'Transoperatório ou 12–24 h em intoxicação; suspender imediatamente após ligadura/exérese tumoral se ocorrer queda pressórica',
      mechanismOfAction:
        'Relaxa diretamente a musculatura lisa vascular via NO/GMPc independentemente da ocupação maciça de receptores α₁-adrenérgicos pelas catecolaminas circulantes.',
      clinicalRationale:
        'Mesmo pacientes pré-tratados com fenoxibenzamina podem apresentar descargas catecolaminérgicas graves na manipulação tumoral. A curta meia-vida circulante (~2 min) torna o nitroprussiato ideal porque permite desligamento rápido quando, após ligadura venosa adrenal, sobrevém vasodilatação profunda pós-excisão exigindo reposição volêmica e vasopressores (incluindo vasopressina se refratário).',
      monitoring:
        'Linha arterial invasiva contínua, ECG (esmolol/lidocaína para taquiarritmias apenas após controle α/vasodilatador), glicemia e gasometria.',
      highlights: [
        'Droga de escolha na hipertensão por feocromocitoma',
        'Desligar imediatamente após exérese se PA cair',
        'Nunca usar atropina na bradicardia reflexa por PPA',
      ],
      referenceIds: ['ref-snp-lumb-jones-6', 'ref-snp-essentials-anesth', 'ref-snp-ginn-2013', 'ref-snp-manual-ecc'],
      evidenceLevel: 'Referência anestésica consagrada e relatos clínicos; ensaios prospectivos limitados',
    },
  ],
  clinicalStudiesCommented: [
    {
      title: 'Use of Sodium Nitroprusside (SNP) for Treatment of Fulminant Congestive Heart Failure (CHF) in Dogs with Mitral Regurgitation',
      authorsYear: 'Greer R, Lichtenberger M, Kirby R (2004)',
      journal: 'Journal of Veterinary Emergency and Critical Care (DOI: 10.1111/j.1476-4431.2004.t01-28-04035.x)',
      studyDesign: 'Série clínica retrospectiva (publicada como resumo de congresso)',
      sampleSize: '10 cães com insuficiência mitral grave e edema pulmonar fulminante refratário',
      methodology:
        'Administração de CRI de nitroprussiato iniciada a 1 µg/kg/min titulada por pressão arterial e desconforto respiratório em cães que falharam à terapia inicial convencional.',
      limitations:
        'Amostra pequena, ausência de grupo controle, desenho retrospectivo em resumo de congresso e inconsistência na notação de unidades entre regimes no texto resumido.',
      mainFindings:
        'Oito dos dez cães sobreviveram à alta hospitalar; sete dos sobreviventes obtiveram melhora clara do desconforto respiratório em até 2 horas (e um após ~6 horas).',
      clinicalTakeaway:
        'Sustenta o uso adjuvante de resgate em insuficiência mitral aguda refratária iniciando em 0,5–1 µg/kg/min sob monitorização intensiva, sem comprovar redução isolada de mortalidade.',
      referenceId: 'ref-snp-greer-2004',
    },
    {
      title: 'Evaluation of presentation, treatment and outcome in hypertensive emergency in dogs and cats: 15 cases (2003–2019)',
      authorsYear: 'Beeston D, Jepson R, Cortellini S (2022)',
      journal: 'Journal of Small Animal Practice, 63, 784–791 (DOI: 10.1111/jsap.13530 | PMID: 35811381)',
      studyDesign: 'Série clínica retrospectiva observacional',
      sampleSize: '15 pacientes com emergência hipertensiva (7 cães e 8 gatos; PAS mediana inicial de 230 mmHg)',
      methodology:
        'Revisão de causas subjacentes (9/15 com LRA associada), fármacos anti-hipertensivos empregados e sobrevida à alta hospitalar.',
      limitations:
        'Amostra pequena e heterogênea, sem randomização entre fármacos; apenas 3 cães receberam nitroprussiato (1 µg/kg/min inicial no caso documentado) e nenhum gato recebeu o fármaco.',
      mainFindings:
        'Sobrevivência geral foi de 53,3% (8/15); embora utilizado em emergências hipertensivas caninas graves, não há prova de superioridade sobre outros agentes parenterais ou orais de ação rápida, reforçando a lacuna de dados em gatos.',
      clinicalTakeaway:
        'Confirma o papel prático do nitroprussiato na crise hipertensiva canina de UTI, mantendo o amlodipino como pilar de grande utilidade na espécie felina.',
      referenceId: 'ref-snp-beeston-2022',
    },
    {
      title: 'Sodium nitroprusside-induced deliberate hypotension to facilitate patent ductus arteriosus ligation in dogs',
      authorsYear: 'Hunter SL, Culp LB, Muir WW III, et al. (2003)',
      journal: 'Veterinary Surgery, 32, 336–340 (DOI: 10.1053/jvet.2003.50046 | PMID: 12865995)',
      studyDesign: 'Série clínica retrospectiva cirúrgica',
      sampleSize: '6 cães com hemorragia durante ligadura de persistência do ducto arterioso (PDA)',
      methodology:
        'Infusão de nitroprussiato titulada entre 5 e 25 µg/kg/min durante complicação cirúrgica aguda para reduzir a PAM para 45–60 mmHg por 5–10 minutos.',
      limitations:
        'Intervenção de resgate altamente especializada com taxas muito acima dos limites seguros de toxicidade metabólica; não aplicável à UTI clínica nem a períodos > alguns minutos.',
      mainFindings:
        'A redução rápida da PAM permitiu hemostasia e conclusão cirúrgica em todos os 6 cães sem intercorrências anestésicas relatadas.',
      clinicalTakeaway:
        'Ilustra o potencial de resgate intraoperatório imediato, mas 15–25 µg/kg/min NÃO deve ser usado como rotina clínica ou manutenção contínua.',
      referenceId: 'ref-snp-hunter-2003',
    },
    {
      title: 'Cyanide release from sodium nitroprusside in the dog & Prevention with sodium thiosulfate/hydroxocobalamin',
      authorsYear: 'Michenfelder JD (1977) & Krapez JR et al. (1981)',
      journal: 'Anesthesiology, 46:196–201 (PMID: 842873) & Br J Anaesth, 53:793–804 (PMID: 7272142)',
      studyDesign: 'Estudos farmacotoxicológicos experimentais em cães',
      sampleSize: '39 cães (Michenfelder 1977) e modelo canino de infusão de 1,5 mg/kg/h (Krapez 1981)',
      methodology:
        'Avaliação da liberação de cianeto independente da hipotensão sob infusões crescentes por 1 hora e efeito profilático de tiossulfato (75 mg/kg) e hidroxocobalamina.',
      limitations:
        'Modelos experimentais agudos com doses elevadas; regimes profiláticos experimentais não equivalem a algoritmos posológicos clínicos felinos/caninos padronizados.',
      mainFindings:
        'Doses totais acima de ~1–1,5 mg/kg em 1 h provocaram toxicidade metabólica aguda por cianeto mesmo com PA estável. O tiossulfato reduziu drasticamente as concentrações de cianeto elevando a conversão para tiocianato (eliminado pelos rins).',
      clinicalTakeaway:
        'Comprova que a toxicidade cianogênica depende da dose acumulada e velocidade de infusão (não apenas da hipotensão), exigindo vigilância de ácido-base, lactato e função renal.',
      referenceId: 'ref-snp-michenfelder-1977',
    },
  ],
  pharmacokineticsData: {
    absorption: [
      '• **Via Intravenosa Contínua (IV CRI)**: Única via clínica aceita (**biodisponibilidade de 100%**). O início da queda pressórica ocorre em **1 a 2 minutos** após atingir taxa efetiva e desaparece em **1 a 10 minutos** após interromper a bomba.',
      '• **Vias VO, SC, IM, OTM e TD**: Ineficazes / sem regime terapêutico validado; a molécula requer acesso intravascular direto contínuo e é irritante tecidual em extravasamento.',
    ].join('\n'),
    distribution:
      'Permanece inicialmente restrito ao espaço intravascular/extracelular onde reage imediatamente com oxi-hemoglobina e tecidos (não há Vd ou % de ligação proteica canina/felina quantificados com precisão clínica). Atravessa a placenta em modelos experimentais com risco fetal de exposição ao cianeto; vasodilata o leito cerebral podendo elevar a pressão intracraniana.',
    metabolism:
      'Biotransformação imediata não dependente de citocromo P450: reage não enzimaticamente no sangue com oxi-hemoglobina formando cianometa-hemoglobina, metemoglobina, NO (oxidado rapidamente a nitrito) e até 4–5 equivalentes de íons cianeto (CN⁻). O CN⁻ é convertido principalmente pela enzima rodanase (tiossulfato sulfurtransferase) hepática e tecidual, usando doadores de enxofre, em tiocianato (SCN⁻).',
    elimination:
      'Meia-vida circulante do fármaco ativo de apenas ~2 minutos (referência humana; início/término em cães e gatos segue o mesmo perfil ultrarrápido de 1–10 min). Já o tiocianato formado é eliminado quase exclusivamente por via renal, com meia-vida longa de **2,7 a 7 dias** em função renal normal, prolongando-se acentuadamente na disfunção renal ou hiponatremia.',
    cnsPenetration:
      'Não quantificada em % no líquor; o aumento secundário do fluxo sanguíneo encefálico por vasodilatação pode elevar a PIC em pacientes com complacência intracraniana reduzida.',
    plasmaBinding:
      'Reage rapidamente de forma química/redox com grupos sulfidrila de hemoglobina e proteínas plasmáticas em vez de ligação reversível clássica mensurada clinicamente.',
    halfLife:
      'Nitroprussiato ativo: ~2 min (efeito pressórico cessa em 1–10 min). Metabólito tiocianato: ~2,7 a 7 dias com função renal preservada (muito mais longa na LRA/DRC).',
  },
  attentionData: {
    attentionSubtitle:
      'Vasodilatador de alto risco em UTI: exige diluição em SG 5%, fotoproteção, acesso exclusivo sem flush, monitorização contínua da PA e vigilância contra cianeto/tiocianato.',
    precautions: [
      {
        condition: 'Uso concomitante de sildenafil, tadalafil ou riociguate',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O nitroprussiato eleva a síntese de GMPc via guanilato ciclase enquanto inibidores de PDE5 bloqueiam sua degradação, provocando acúmulo maciço intracelular e vasodilatação refratária.',
        clinicalAction:
          'Contraindicação formal: jamais associar em cães ou gatos tratados para hipertensão pulmonar com sildenafil ou tadalafil.',
      },
      {
        condition: 'Ausência de monitorização pressórica contínua ou bomba de infusão / Flush no acesso',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Quedas abruptas da PAM desencadeiam isquemia cerebral, miocárdica e renal em segundos; qualquer lavagem (flush) da linha entrega um bolus acidental massivo.',
        clinicalAction:
          'Utilizar exclusivamente em UTI/centro cirúrgico com bomba de precisão, linha exclusiva e linha arterial invasiva (preferencial) ou Doppler contínua.',
      },
      {
        condition: 'Hipertensão compensatória, estenoses obstrutivas ou hipertensão intracraniana / TCE',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Vasodilatação sistêmica reduz a perfusão distal em obstruções vasculares e a vasodilatação arterial cerebral aumenta o volume sanguíneo encefálico e a pressão intracraniana.',
        clinicalAction:
          'Não utilizar no reflexo de Cushing, TCE descompensado ou hipertensão compensatória; reavaliar alternativas.',
      },
      {
        condition: 'Hipovolemia não corrigida, choque distributivo (RVS baixa) ou anemia severa',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A venodilatação reduz ainda mais o retorno venoso e o volume sistólico em hipovolêmicos; na anemia grave reduz adicionalmente a oferta tecidual de oxigênio.',
        clinicalAction:
          'Corrigir volemia/perfusão antes de considerar vasodilatadores; nunca usar em choque séptico ou hipovolêmico.',
      },
      {
        condition: 'Infusões rápidas (> 2 µg/kg/min) ou prolongadas (> 48–72 h) / Taxa máxima 10 µg/kg/min',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A geração de CN⁻ excede a conversão hepática via rodanase e o tiocianato acumula-se progressivamente na circulação, bloqueando a citocromo c oxidase mitocondrial.',
        clinicalAction:
          'Não manter taxa de 10 µg/kg/min por mais de 10 minutos; monitorar lactato, acidose metabólica e saturação venosa; planejar desmame oral precoce.',
      },
      {
        condition: 'Disfunção renal (DRC/LRA), hepatopatia, hiponatremia, hipotireoidismo ou déficit B₁₂',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Hepatopatia prejudica a conversão CN⁻ → SCN⁻ e disfunção renal/hiponatremia prolongam drasticamente a meia-vida do tiocianato (> 7 dias), além de SCN⁻ competir com iodeto na tireoide.',
        clinicalAction:
          'Evitar infusões prolongadas em nefropatas IRIS 3–4 ou hepatopatas descompensados; acompanhar função renal, eletrólitos e sinais neurológicos.',
      },
      {
        condition: 'Espécie felina (cardiopatia diastólica/HCM obstrutiva e risco oxidativo)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Gatos exibem menor reserva diastólica diante de redução súbita da pré-carga e maior vulnerabilidade da hemoglobina à formação oxidativa de metemoglobina.',
        clinicalAction:
          'Iniciar sempre no limite mínimo (0,5 µg/kg/min), evitar se houver obstrução dinâmica de via de saída no eco e limitar duração ao estritamente necessário.',
      },
      {
        condition: 'Degradação luminosa e erro de diluição (ampola 25 mg/mL vs bolsa 100 µg/mL)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A luz reduz Fe³⁺ para Fe²⁺ inativando a solução e escurecendo-a; a ampola pura (25.000 µg/mL) é 250 vezes mais concentrada que a diluição padrão.',
        clinicalAction:
          'Diluir apenas em SG 5%, fotoproteger bolsa e sistema conforme bula e descartar imediatamente se solução ficar azul, verde ou vermelho-escura.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Hipotensão arterial severa e hipoperfusão de órgãos-alvo',
        frequency: 'very_common',
        mechanism:
          'Vasodilatação arteriolar e venosa direta dose-dependente quando a titulação ultrapassa a necessidade hemodinâmica ou ocorre queda da resistência abaixo do limiar de autorregulação.',
        clinicalManagement:
          'Reduzir a taxa ou interromper imediatamente a bomba (efeito pressórico reverte em 1–10 min); administrar cristaloides/suporte vasopressor apenas conforme status cardiológico.',
      },
      {
        effect: 'Taquicardia sinusal reflexa e alterações eletrocardiográficas',
        frequency: 'common',
        mechanism:
          'Descarga barorreflexa e ativação simpática compensatória em resposta à redução rápida da pressão arterial sistêmica.',
        clinicalManagement:
          'Checar pressão arterial, volemia e dor antes de intervir na frequência cardíaca isoladamente.',
      },
      {
        effect: 'Intoxicação por cianeto (hipóxia histotóxica e acidose láctica)',
        frequency: 'overdose',
        mechanism:
          'Acúmulo de íons CN⁻ inibindo o complexo IV (citocromo c oxidase) mitocondrial, bloqueando a fosforilação oxidativa com acúmulo de lactato e baixa extração tecidual de O₂.',
        clinicalManagement:
          'Suspender imediatamente a infusão, fornecer oxigênio a 100%, tratar acidose e instituir suporte toxicológico específico (hidroxocobalamina ou tiossulfato de sódio sob orientação especializada).',
      },
      {
        effect: 'Toxicidade por tiocianato (> 60–100 µg/mL) e metemoglobinemia',
        frequency: 'rare',
        mechanism:
          'Acúmulo renal lento de tiocianato (neurotoxicidade, delírio canino e supressão tireoidiana) ou oxidação do ferro da hemoglobina a Fe³⁺ durante reações redox intensas (especialmente em felinos).',
        clinicalManagement:
          'Suspender a exposição; considerar hemodiálise para depurar tiocianato acumulado em nefropatas graves e co-oximetria para quantificar metemoglobina (azul de metileno exige cautela extrema em gatos).',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Gatos, geriatras, caquexia ou cardiopatia sob uso prévio de diuréticos/IECA',
        recommendedAdjustment:
          'Iniciar obrigatoriamente na extremidade mínima (0,5 µg/kg/min) com incrementos pequenos e intervalos de 15–30 min, evitando taxas > 3–5 µg/kg/min.',
        physiologicalRationale:
          'Menor reserva volêmica e maior sensibilidade hipotensora/oxidativa aumentam risco de colapso circulatório e metemoglobinemia.',
      },
      {
        clinicalCondition: 'DRC avançada (IRIS 3–4), LRA oligúrica ou hepatopatia grave',
        recommendedAdjustment:
          'Não existem algoritmos numéricos validados por estágio IRIS; usar apenas pela menor duração indispensável (< 24 h) e na menor velocidade eficaz (< 2 µg/kg/min).',
        physiologicalRationale:
          'Redução do metabolismo hepático de CN⁻ e da depuração renal de SCN⁻ elevam exponencialmente o risco de toxicidade cumulativa.',
      },
      {
        clinicalCondition: 'Refração súbita à infusão ou elevação de lactato com acidemia',
        recommendedAdjustment:
          'Não escalonar cegamente para 10–15 µg/kg/min; suspeitar de intoxicação precoce por cianeto e interromper imediatamente.',
        physiologicalRationale:
          'Tolerância aguda acompanhada de acidose láctica e aumento de taquicardia/saturação venosa de O₂ pode sinalizar bloqueio respiratório celular por cianeto.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Sildenafil, tadalafil e riociguate',
        severity: 'contraindicated',
        clinicalEffect: 'Hipotensão profunda refratária com risco de colapso fatal.',
        pharmacologicalMechanism: 'Sinergismo extremo pelo aumento da síntese e bloqueio da hidrólise de GMPc.',
      },
      {
        drugOrClass: 'Anestésicos inalatórios (isoflurano, sevoflurano) e propofol',
        severity: 'major',
        clinicalEffect: 'Potencialização marcada de hipotensão intraoperatória.',
        pharmacologicalMechanism: 'Redução aditiva da resistência vascular sistêmica e atenuação de reflexos simpáticos.',
      },
      {
        drugOrClass: 'Amlodipino, hidralazina, IECA, telmisartan, prazosina e acepromazina',
        severity: 'major',
        clinicalEffect: 'Queda exagerada da pressão arterial e hipoperfusão renal aguda.',
        pharmacologicalMechanism: 'Bloqueio concomitante de múltiplos eixos vasoconstritores compensatórios.',
      },
      {
        drugOrClass: 'Betabloqueadores (esmolol, propranolol) e bloqueadores de Ca²⁺ cardioativos',
        severity: 'moderate',
        clinicalEffect: 'Hipotensão acentuada e inibição de taquicardia compensatória.',
        pharmacologicalMechanism: 'Inotropismo/cronotropismo negativos somados à redução da pós-carga e pré-carga.',
      },
      {
        drugOrClass: 'Dobutamina (interação terapêutica dirigida)',
        severity: 'informational',
        clinicalEffect: 'Melhora do débito cardíaco anterógrado e queda da pressão capilar pulmonar em cães com disfunção sistólica severa.',
        pharmacologicalMechanism: 'Agonismo inotrópico β₁ combinado à redução equilibrada de pós-carga e pré-carga.',
      },
    ],
  },
  generalInfoData: {
    routesDetailed: [
      {
        route: 'Via Intravenosa Contínua (IV CRI EXCLUSIVA — Passo a Passo da Reconstituição e Diluição)',
        technique:
          'ETAPA 1 (Reconstituição do frasco em pó de 50 mg): aspirar os 2 mL da ampola diluente (SG 5%) e injetar no frasco-ampola de 50 mg, homogeneizando suavemente até dissolução completa → obtém-se solução mãe de 25 mg/mL (25.000 µg/mL; equivalente à ampola pronta líquida de 2 mL). Estabilidade preliminar: até 4 h ao abrigo da luz. ETAPA 2 (Diluição final conforme volume de SG 5%): transferindo os 2 mL inteiros (50 mg) → 1.000 mL SG 5% = 50 µg/mL (0,05 mg/mL); 500 mL SG 5% = 100 µg/mL (0,1 mg/mL); 250 mL SG 5% = 200 µg/mL (0,2 mg/mL); 100 mL SG 5% = 500 µg/mL (0,5 mg/mL — alta concentração, uso excepcional em bomba de seringa). Para preparar 100 mL nas concentrações mais usuais em cães pequenos e gatos, aspirar fração da solução mãe a 25 mg/mL: 0,2 mL (5 mg) → 50 µg/mL; 0,4 mL (10 mg) → 100 µg/mL; 0,8 mL (20 mg) → 200 µg/mL (retirando antes volume igual de soro do frasco de 100 mL). ETAPA 3 (Infusão): fotoproteger bolsa e equipo conforme bula e infundir por bomba de precisão pela fórmula mL/h = (Dose µg/kg/min × Peso kg × 60) ÷ Concentração µg/mL.',
        nursingCare:
          'Checagem dupla obrigatória da concentração final (µg/mL) e da taxa (mL/h), rotulagem imediata com horário e volume, inspeção periódica da cor da solução (descartar se azul, verde ou vermelho-escuro) e PROIBIÇÃO ABSOLUTA de lavar/flushar a via venosa.',
        limitations:
          'Uso restrito à UTI ou centro cirúrgico equipado; jamais administrar sem controle volumétrico de bomba nem infundir o frasco reconstituído (25.000 µg/mL) diretamente.',
      },
      {
        route: 'Via Bolus IV Direto / IM / SC / VO',
        technique: 'FORMALMENTE CONTRAINDICADO / INEFICAZ.',
        nursingCare: 'Proscrever qualquer aplicação direta da ampola pura (25.000 µg/mL) ou injeção extravascular.',
        limitations: 'Bolus IV causa colapso pressórico imediato e morte; extravasamento produz irritação local severa.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'PASSO 1 — RECONSTITUIÇÃO (Pó 50 mg + 2 mL de SG 5%): produz solução mãe preliminar de 25 mg/mL (= 25.000 µg/mL; mesma concentração da ampola líquida Nitrop® 25 mg/mL × 2 mL). Estável por até 4 horas ao abrigo da luz.',
        'PASSO 2A — DILUIÇÃO DO FRASCO INTEIRO (50 mg = 2 mL) EM SG 5% (conforme bula padrão + opção 100 mL): • 1.000 mL de SG 5% → 50 µg/mL (0,05 mg/mL | a 1 µg/kg/min = 1,2 mL/kg/h) • 500 mL de SG 5% → 100 µg/mL (0,1 mg/mL | a 1 µg/kg/min = 0,6 mL/kg/h — padrão UTI) • 250 mL de SG 5% → 200 µg/mL (0,2 mg/mL | a 1 µg/kg/min = 0,3 mL/kg/h — preferida em edema pulmonar) • 100 mL de SG 5% → 500 µg/mL (0,5 mg/mL | a 1 µg/kg/min = 0,12 mL/kg/h — alta concentração fora da tabela clássica de bula, exigir bomba de seringa/alta precisão).',
        'PASSO 2B — PREPARO FRACIONADO EM 100 mL DE SG 5% (para cães pequenos/gatos evitando 500 µg/mL): partindo da solução reconstituída a 25 mg/mL (25.000 µg/mL), retirar volume equivalente de soro do frasco de 100 mL e adicionar: • 0,2 mL (5 mg) → 50 µg/mL • 0,4 mL (10 mg) → 100 µg/mL • 0,8 mL (20 mg) → 200 µg/mL • 1,0 mL (25 mg) → 250 µg/mL.',
        'FÓRMULA DE BOMBA E CONFERÊNCIA: mL/h = (Dose [µg/kg/min] × Peso [kg] × 60) / Concentração final [µg/mL]. Nunca confundir µg/kg/min com mg/kg/min (fator 1.000).',
      ],
      incompatibleFluids: [
        'Não adicionar nenhum outro medicamento dentro da bolsa de infusão de nitroprussiato.',
        'Evitar extrapolar automaticamente NaCl 0,9% (SF 0,9%) ou Ringer Lactato para diluição das formulações concentradas brasileiras sem validação específica do fabricante.',
        'Incompatibilidade em Y-site citada na bula Nitroprus® para levofloxacino e atracúrio (com divergência de compatibilidade do atracúrio no formulário estrangeiro); manter via venosa exclusiva sempre que possível.',
      ],
      infusionRateGuidance:
        'Titular em bomba iniciando em 0,5 µg/kg/min (crise hipertensiva / felinos) ou 0,5–1 µg/kg/min (edema pulmonar canino), ajustando a cada 5–30 min conforme protocolo clínico e PA.',
      preparationNotes:
        'Solução fresca em SG 5% possui cor laranja-clara / palha / levemente amarronzada (pH 3,5–6). Reconstituição preliminar do liofilizado (50 mg em 2 mL = 25 mg/mL) é estável por até 4 h ao abrigo da luz; após diluição final em SG 5% (100, 250, 500 ou 1.000 mL), estabilidade máxima é de até 24 h sob fotoproteção (a luz reduz Fe³⁺ a Fe²⁺ inativo). Proteger bolsa e equipo conforme bula do Nitroprus® e descartar imediatamente se virar para azul, verde ou vermelho-escuro.',
      storageRequirements:
        'Armazenar ampolas e frascos fechados em temperatura ambiente controlada (15–30 °C), protegidos de luz e umidade; não congelar.',
    },
    prescriptionType: {
      category: 'Medicamento hospitalar de alto risco (receita simples — uso extrabula veterinário)',
      ordinanceOrLaw: 'Não listado na Portaria SVS/MS nº 344/1998',
      retentionRequired: false,
      guidelines:
        'Apesar de não exigir talonário especial pela Portaria 344/1998, é medicamento de alta vigilância restrito a internação/UTI ou anestesia hospitalar com monitorização contínua e cálculo em µg/kg/min validado por dois profissionais.',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Complexo de coordenação inorgânico nitrosil-pentacianoferrato (Na₂[Fe(CN)₅NO]·2H₂O | ~297,95 g/mol)',
      chemicalClassDescription:
        'Complexo iônico hidrossolúvel com átomo central de ferro ligado a cinco grupos cianeto e um grupo nitrosil; não se aplica o modelo clássico de pKa de bases orgânicas lipofílicas.',
      therapeuticClass: 'Vasodilatador balanceado direto / doador de NO (anti-hipertensivo parenteral de emergência)',
      therapeuticClassDescription:
        'Reduz simultaneamente resistência arterial (pós-carga) e capacitância venosa (pré-carga) com início em 1–2 minutos e término em 1–10 minutos após suspensão.',
      atcCode: 'C02DD01',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Emergências hipertensivas, MMVD estágio D e feocromocitoma canino',
        description:
          'Principal espécie documentada clinicamente (0,5–3,5 µg/kg/min em emergências hipertensivas ACVIM; 0,5–3 µg/kg/min com exceções relatadas até 10–15 µg/kg/min em MMVD refratária; 0,1–10 µg/kg/min no feocromocitoma). Estudos caninos demonstram toxicidade aguda por cianeto em doses totais > 1–1,5 mg/kg/h.',
        clinicalImplications:
          'Em cardiopatas dilatados/baixo débito pode ser associado à dobutamina após ecocardiografia; evitar manter 10 µg/kg/min por mais de 10 minutos e limitar infusão idealmente a ≤ 48–72 h.',
      },
      {
        species: 'cat',
        title: 'Evidência felina limitada, menor reserva diastólica e dano oxidativo eritrocitário',
        description:
          'Documentação clínica felina bastante escassa (ex.: 0,5–3 µg/kg/min em referências cardiológicas/hipertensivas; até 5 µg/kg/min em protocolos de emergência endócrina/pulmonar). Hemoglobina felina possui maior suscetibilidade a oxidação e formação de metemoglobina.',
        clinicalImplications:
          'Iniciar em 0,5 µg/kg/min pelo menor tempo possível (poucas horas até máximo ~24 h), vigiar obstrução dinâmica de via de saída no eco, e preferir amlodipino quando a via oral/retal for viável e efetiva.',
      },
    ],
  },
  practicalWeightTable: {
    standardDoseText:
      'Vazões em mL/h na taxa inicial de referência de 1 µg/kg/min (= 60 µg/kg/h) nas 4 bolsas em SG 5%. Para 0,5 µg/kg/min usar metade; para 2 ou 3 µg/kg/min multiplicar por 2 ou 3.',
    headers: [
      'Peso',
      'Taxa (1 µg/kg/min)',
      '1.000 mL (50 µg/mL)',
      '500 mL (100 µg/mL)',
      '250 mL (200 µg/mL)',
      '100 mL frasco inteiro (500 µg/mL)*',
    ],
    rows: [
      { weight: '2 kg', totalDose: '120 µg/h', col1: '2,4 mL/h', col2: '1,2 mL/h', col3: '0,6 mL/h', col4: '0,24 mL/h*' },
      { weight: '4 kg', totalDose: '240 µg/h', col1: '4,8 mL/h', col2: '2,4 mL/h', col3: '1,2 mL/h', col4: '0,48 mL/h*' },
      { weight: '5 kg', totalDose: '300 µg/h', col1: '6,0 mL/h', col2: '3,0 mL/h', col3: '1,5 mL/h', col4: '0,60 mL/h*' },
      { weight: '10 kg', totalDose: '600 µg/h', col1: '12,0 mL/h', col2: '6,0 mL/h', col3: '3,0 mL/h', col4: '1,20 mL/h' },
      { weight: '20 kg', totalDose: '1.200 µg/h', col1: '24,0 mL/h', col2: '12,0 mL/h', col3: '6,0 mL/h', col4: '2,40 mL/h' },
      { weight: '30 kg', totalDose: '1.800 µg/h', col1: '36,0 mL/h', col2: '18,0 mL/h', col3: '9,0 mL/h', col4: '3,60 mL/h' },
    ],
    dropletCalibrator: {
      title: 'Regra Prática de Reconstituição (50 mg pó + 2 mL) e Preparo em 100, 250, 500 e 1.000 mL de SG 5%',
      concentration: 'Solução mãe reconstituída = 25 mg/mL (25.000 µg/mL em 2 mL; estável até 4 h protegida da luz)',
      dropletRatio: '1.000 mL → 50 µg/mL | 500 mL → 100 µg/mL | 250 mL → 200 µg/mL | 100 mL (50 mg) → 500 µg/mL',
      practicalRule:
        'Para preparar 100 mL sem concentrar a 500 µg/mL (ideal em gatos e cães ≤ 5 kg), use fração da solução mãe de 25 mg/mL: 0,2 mL (5 mg) → 50 µg/mL | 0,4 mL (10 mg) → 100 µg/mL (repetir valores da coluna 500 mL!) | 0,8 mL (20 mg) → 200 µg/mL.',
      note:
        '*As bulas brasileiras descrevem diluição do frasco inteiro de 50 mg em 250, 500 ou 1.000 mL de SG 5%. Usar 50 mg inteiros em 100 mL (500 µg/mL) gera vazões muito baixas (< 1 mL/h em cães pequenos e gatos), exigindo bomba de seringa de alta precisão ou preparo fracionado.',
    },
  },
  genericBrandsNote:
    'Reconstituição Nitroprus® 50 mg: dissolver o pó com os 2 mL de SG 5% do diluente próprio (25 mg/mL; até 4 h protegido da luz). Nitrop® 25 mg/mL (2 mL) já vem líquido com os mesmos 50 mg totais. Diluir exclusivamente em SG 5% (validade 24 h fotoprotegida; proteger bolsa e equipo conforme bula brasileira) e nunca confundir a solução mãe de 25.000 µg/mL com a bolsa diluída.',
  monitoringParameters: [
    'Pressão arterial contínua (linha arterial invasiva preferencial ou Doppler contínua) a cada 5–15 min durante titulação.',
    'ECG contínuo, frequência cardíaca, pressão de pulso/perfusão periférica e débito cardíaco (quando disponível em UTI/anestesia).',
    'Frequência e padrão respiratórios, ausculta pulmonar e POCUS/ecocardiografia para avaliar resposta da congestão e função sistólica.',
    'Gasometria arterial/venosa, lactato sérico e saturação venosa de O₂ seriados (rastreio de hipóxia histotóxica por cianeto).',
    'Ureia, creatinina, SDMA, eletrólitos (especialmente Na⁺) e débito urinário contínuo (risco de hipoperfusão renal ou acúmulo de tiocianato).',
    'Hematócrito e co-oximetria para quantificar metemoglobina (oximetria de pulso convencional não diferencia metemoglobinemia), sobretudo em gatos ou exposição > 24–48 h.',
  ],
  clientInformation: [
    'Medicamento de uso estritamente hospitalar em terapia intensiva ou centro cirúrgico; não existe administração domiciliar segura.',
    'Informar os tutores de que ajustes contínuos dependem de aferição constante da pressão arterial e de exames laboratoriais seriados para prevenir queda pressórica severa ou toxicidade metabólica.',
  ],
  clinicalStructuredBlocks: [
    {
      kind: 'clinicalCallout',
      variant: 'brazil',
      title: 'BLOCOS D/F — Apresentações brasileiras (Nitrop® e Nitroprus®), SG 5% e fotoproteção',
      body: 'No Brasil o fármaco aparece também grafado como nitroprusseto de sódio em ampolas de 25 mg/mL (Nitrop® 2 mL = 50 mg) ou pó liofilizado de 50 mg + 2 mL de SG 5% e bolsa fotoprotetora (Nitroprus®). Não existe apresentação veterinária registrada no MAPA (uso extrabula). Diferente de uma solução pronta estrangeira em SF 0,9%, as formulações brasileiras devem ser diluídas em SG 5% (50, 100 ou 200 µg/mL). A luz reduz Fe³⁺ a Fe²⁺ degradando o fármaco (especialmente em bolsas PVC sob luz fluorescente): seguir a bula nacional protegendo bolsa e equipo e descartar se houver mudança de cor para azul, verde ou vermelho-escuro.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'info',
      title: 'BLOCOS B/C — Fórmula da bomba, restrição hídrica e ausência de calculadora automática unitária',
      body: 'A bomba calcula mL/h = (Dose [µg/kg/min] × Peso [kg] × 60) / Concentração da bolsa [µg/mL] — por exemplo, um cão de 5 kg recebendo 1 µg/kg/min na diluição de 100 µg/mL exige 3 mL/h (0,3 mg/h; exposição acumulada diária de 1,44 mg/kg/dia). Em pacientes com edema pulmonar grave, bolsas de 100 µg/mL podem aportar volumes expressivos (ex.: cão de 20 kg a 3 µg/kg/min recebe 36 mL/h = 432 mL em 12 h), favorecendo concentração de 200 µg/mL (50 mg/250 mL). Por exigir escolha prévia da concentração diluída e impedir erro fatal de 250× sobre a ampola pura (25.000 µg/mL), a calculadora unitária fica desabilitada nas entradas de CRI.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'caution',
      title: 'BLOCO E — Intoxicação por cianeto/tiocianato, metemoglobina e resgate específico',
      body: 'A degradação não enzimática libera cianeto (CN⁻), inibindo a citocromo c oxidase mitocondrial (complexo IV) e gerando acidose láctica com aumento da saturação venosa de O₂. Infusões > 2 µg/kg/min superam a desintoxicação fisiológica pela rodanase e 10 µg/kg/min jamais deve exceder 10 min. O tiocianato (SCN⁻) possui depuração renal (meia-vida 2,7–7 dias, maior na DRC/hiponatremia; tóxico > 60–100 µg/mL, causando delírio canino e disfunção tireoidiana). Em toxicidade aguda: suspender imediatamente, ofertar O₂ e considerar hidroxocobalamina ou tiossulfato de sódio (protocolos experimentais caninos descrevem 6 mg/kg/h IV pós-toxicidade ou 75 mg/kg profilático) sob consultoria toxicológica; hemodiálise remove tiocianato, mas não substitui tratamento imediato do cianeto.',
    },
  ],
  clinicalNotesRichText:
    'Nitroprussiato de sódio (Na₂[Fe(CN)₅NO]·2H₂O; ~297,95 g/mol) é um doador direto de óxido nítrico (NO) de uso hospitalar EXCLUSIVAMENTE IV contínuo em bomba de infusão após reconstituição (frasco pó 50 mg + 2 mL SG 5% = solução mãe 25 mg/mL = 25.000 µg/mL, estável até 4 h ao abrigo da luz) e diluição obrigatória em SG 5% (frasco inteiro de 50 mg em 1.000 mL → 50 µg/mL; 500 mL → 100 µg/mL; 250 mL → 200 µg/mL; 100 mL → 500 µg/mL — ou preparo fracionado em 100 mL usando 0,2 mL [50 µg/mL], 0,4 mL [100 µg/mL] ou 0,8 mL [200 µg/mL] da solução mãe), jamais em bolus ou com flush na linha. Reduz rapidamente pós-carga arterial e pré-carga venosa (início 1–2 min; término 1–10 min após desligar), útil em emergências hipertensivas com LOA (ACVIM 2018: 0,5–3,5 µg/kg/min em cães visando −10% da PAS na 1ª h e −15% nas seguintes; dados limitados em gatos 0,5–3 µg/kg/min), edema pulmonar cardiogênico refratário / MMVD estágio D (0,5–1 µg/kg/min inicial, usual 2–3 µg/kg/min), crise hipertensiva por feocromocitoma (0,1–10 µg/kg/min) e intoxicação por fenilpropanolamina/anfetaminas (1–10 µg/kg/min; atropina é contraindicada na bradicardia reflexa por PPA). Contraindicado com sildenafil/tadalafil, em hipovolemia, choque com RVS baixa e hipertensão intracraniana (eleva FSC/PIC); reduz pressão do esfíncter esofágico inferior sob anestesia. Proteger da luz (descartar se azul/verde/vermelho-escuro). Risco cumulativo de cianeto (> 2 µg/kg/min; não manter 10 µg/kg/min > 10 min), tiocianato renal (meia-vida 2,7–7 dias) e metemoglobinemia oxidativa em gatos.',
  references: [
    {
      id: 'ref-snp-plumbs-10',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley-Blackwell / VetMedux; 2023. Monografia “Nitroprusside”, pp. 939–941 (e referências toxicológicas pp. 1016, 1018, 1078).",
      sourceType: 'Formulário veterinário internacional',
      notes:
        'Indicações, doses em crise hipertensiva e ICC, incompatibilidades, estabilidade luminosa (Fe³⁺ → Fe²⁺), sensibilidade felina oxidativa, limiar de 10 min na taxa máxima e toxicidade por cianeto/tiocianato.',
      evidenceLevel: 'Referência terciária de farmacologia clínica veterinária',
    },
    {
      id: 'ref-snp-lumb-jones-6',
      citationText:
        'Lamont LA, Grimm KA, Robertson SA, Love L, Schroeder CA (eds.). Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. 6th ed. Wiley-Blackwell; 2024. Cap. 13 (p. 210), Cap. 25 (Sodium nitroprusside, p. 429), Cap. 41 (Table 41.2 p. 866), Cap. 42 (pp. 897–900, Table 42.2) e Cap. 44 (p. 948).',
      sourceType: 'Tratado de anestesiologia veterinária',
      notes:
        'Mecanismo com oxi-hemoglobina/NO/metemoglobina, doses intraoperatórias no feocromocitoma (0,1–10 µg/kg/min), queda de LESP, transplante renal, tiossulfato 6 mg/kg/h e descarte por alteração de cor.',
      evidenceLevel: 'Tratado de referência em anestesiologia veterinária',
    },
    {
      id: 'ref-snp-essentials-anesth',
      citationText:
        'Grimm KA, Tranquilli WJ, Lamont LA (eds.). Essentials of Small Animal Anesthesia and Analgesia. 2nd ed. Wiley-Blackwell; 2011. Cap. 13 (Table 13.1, aumento de FSC/PIC) e manejo de feocromocitoma (1–5 µg/kg/min).',
      sourceType: 'Manual de anestesiologia veterinária',
      notes:
        'Efeito vasodilatador cerebral aumentando fluxo sanguíneo cerebral e PIC; controle de picos hipertensivos em feocromocitoma e necessidade de suporte pós-exérese.',
      evidenceLevel: 'Referência especializada em anestesiologia',
    },
    {
      id: 'ref-snp-ettinger-9',
      citationText:
        "Côté É, Ettinger SJ, Feldman EC (eds.). Ettinger's Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 121 (p. 639), Cap. 137 (p. 712), Cap. 229 (p. 1281, Box 229.2) e Cap. 236 (pp. 1430–1431, Table 236.1).",
      sourceType: 'Tratado de medicina interna veterinária',
      notes:
        'Redução balanceada de pós-carga e volume estressado venoso, manejo de intoxicação por fenilpropanolamina (proibição de atropina), meta gradual de redução da PAS e limites clínicos.',
      evidenceLevel: 'Tratado internacional de medicina interna',
    },
    {
      id: 'ref-snp-manual-ecc',
      citationText:
        'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD. Manual of Small Animal Emergency and Critical Care Medicine. 2nd ed. Wiley-Blackwell; 2012. pp. 33, 92, 202–203 (Table 10.4), 205, 477–478, 508 e 612.',
      sourceType: 'Manual de terapia intensiva e emergência veterinária',
      notes:
        'Protocolo prático em ICC fulminante canina, suspensão de nitroglicerina tópica ao iniciar CRI, fórmula de diluição, meta de PAM > 70 mmHg, transição oral para enalapril e toxicologia de anfetaminas/síndrome serotoninérgica.',
      evidenceLevel: 'Referência clínica de emergência crítica',
    },
    {
      id: 'ref-snp-feline-ecc',
      citationText:
        'Drobatz KJ, Reineke E, et al. Feline Emergency and Critical Care Medicine. 2nd ed. Wiley-Blackwell; 2023. pp. 101, 368–369 e 371.',
      sourceType: 'Manual especializado em emergência felina',
      notes:
        'Faixa cautelosa em gatos (0,5–5 µg/kg/min, iniciar baixo), limitação temporal (poucas horas até ~24 h; risco letal de hipotensão e toxicidade por cianeto > 3 dias) e uso em tempestade tireoidiana/hiperaldosteronismo.',
      evidenceLevel: 'Referência especializada em medicina intensiva felina',
    },
    {
      id: 'ref-snp-bsava-nephro',
      citationText:
        'Elliott J, Grauer GF, Westropp JL (eds.). BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA; 2017. pp. 194 e 202.',
      sourceType: 'Manual especializado em nefrologia veterinária',
      notes:
        'Manejo parenteral com monitorização contínua na emergência hipertensiva nefropática e cuidados na síndrome cardiorrenal (CvRD). Nota: BSAVA Small Animal Formulary 10th ed. verificado sem monografia de nitroprussiato.',
      evidenceLevel: 'Manual técnico de nefrologia',
    },
    {
      id: 'ref-snp-acvim-2018',
      citationText:
        'Acierno MJ, Brown S, Coleman AE, et al. ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32(6):1803–1822.',
      sourceType: 'Consenso internacional',
      doi: '10.1111/jvim.15331',
      url: 'https://doi.org/10.1111/jvim.15331',
      notes:
        'Define PAS ≥ 180 mmHg como alto risco para LOA, faixa de 0,5–3,5 µg/kg/min em cães e meta gradual (−10% na 1ª h e −15% nas horas subsequentes).',
      evidenceLevel: 'Consenso internacional (ACVIM 2018)',
    },
    {
      id: 'ref-snp-acvim-2019',
      citationText:
        'Keene BW, Atkins CE, Bonagura JD, et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33(3):1127–1140.',
      sourceType: 'Consenso internacional',
      doi: '10.1111/jvim.15488',
      url: 'https://doi.org/10.1111/jvim.15488',
      notes:
        'Descreve uso de nitroprussiato em ICC aguda estágio D refratária (1–15 µg/kg/min IV titulados por 12–48 h, com nível de evidência fraco).',
      evidenceLevel: 'Consenso internacional (ACVIM 2019)',
    },
    {
      id: 'ref-snp-greer-2004',
      citationText:
        'Greer R, Lichtenberger M, Kirby R. Use of Sodium Nitroprusside (SNP) for Treatment of Fulminant Congestive Heart Failure (CHF) in Dogs with Mitral Regurgitation. J Vet Emerg Crit Care. 2004.',
      sourceType: 'Série clínica retrospectiva',
      doi: '10.1111/j.1476-4431.2004.t01-28-04035.x',
      url: 'https://doi.org/10.1111/j.1476-4431.2004.t01-28-04035.x',
      notes: '10 cães com insuficiência mitral refratária; 8/10 sobreviveram à alta hospitalar.',
      evidenceLevel: 'Estudo observacional retrospectivo pequeno',
    },
    {
      id: 'ref-snp-beeston-2022',
      citationText:
        'Beeston D, Jepson R, Cortellini S. Evaluation of presentation, treatment and outcome in hypertensive emergency in dogs and cats: 15 cases (2003–2019). J Small Anim Pract. 2022;63:784–791.',
      sourceType: 'Série clínica retrospectiva',
      doi: '10.1111/jsap.13530',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35811381/',
      notes: '7 cães e 8 gatos (PAS mediana 230 mmHg; 3 cães receberam nitroprussiato; 0 gatos).',
      evidenceLevel: 'Série retrospectiva observacional',
    },
    {
      id: 'ref-snp-hunter-2003',
      citationText:
        'Hunter SL, Culp LB, Muir WW III, et al. Sodium nitroprusside-induced deliberate hypotension to facilitate patent ductus arteriosus ligation in dogs. Vet Surg. 2003;32:336–340.',
      sourceType: 'Série clínica retrospectiva cirúrgica',
      doi: '10.1053/jvet.2003.50046',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12865995/',
      notes: '6 cães em hipotensão deliberada de resgate transoperatório (5–25 µg/kg/min por 5–10 min).',
      evidenceLevel: 'Série cirúrgica de exceção',
    },
    {
      id: 'ref-snp-michenfelder-1977',
      citationText:
        'Michenfelder JD. Cyanide release from sodium nitroprusside in the dog. Anesthesiology. 1977;46:196–201 & Krapez JR, Vesey CJ, Adams L, Cole PV. Br J Anaesth. 1981;53:793–804.',
      sourceType: 'Estudos experimentais farmacotoxicológicos',
      url: 'https://pubmed.ncbi.nlm.nih.gov/842873/',
      notes:
        'Demonstração em cães de toxicidade por cianeto em doses cumulativas > 1–1,5 mg/kg/h e proteção metabólica por tiossulfato (75 mg/kg) com elevação de tiocianato.',
      evidenceLevel: 'Estudos experimentais caninos',
    },
    {
      id: 'ref-snp-ginn-2013',
      citationText:
        'Ginn JA, Bentley E, Stepien RL. Systemic hypertension and hypertensive retinopathy following PPA overdose in a dog. J Am Anim Hosp Assoc. 2013;49:46–53.',
      sourceType: 'Relato de caso clínico',
      doi: '10.5326/JAAHA-MS-5692',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23148140/',
      notes: 'Controle de hipertensão severa e retinopatia hipertensiva por fenilpropanolamina utilizando nitroprussiato (1–5 µg/kg/min).',
      evidenceLevel: 'Relato de caso',
    },
    {
      id: 'ref-snp-bula-br',
      citationText:
        'Cristália Produtos Químicos Farmacêuticos (Nitroprus® 50 mg) & Hypofarma (Nitrop® 25 mg/mL 2 mL). Bulas profissionais e fichas oficiais no Brasil; FDA/DailyMed Sodium Nitroprusside label.',
      sourceType: 'Bulas e documentação regulatória',
      url: 'https://www.cristalia.com.br/produto/138/bula-profissional',
      notes:
        'Diluição em SG 5% (50, 100 e 200 µg/mL), fotoproteção obrigatória de frasco e equipo em Nitroprus®, alerta de black box (> 2 µg/kg/min / máx. 10 min a 10 µg/kg/min) e incompatibilidade com sildenafil/levofloxacino.',
      evidenceLevel: 'Documentação regulatória técnica (ANVISA / FDA)',
    },
  ],
};
