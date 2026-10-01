import { DiseaseRecord } from '../../types/disease';

export const sepseCaninaRecord: DiseaseRecord = {
  id: 'disease-sepse-canina',
  slug: 'sepse-canina',
  title: 'Sepse e Choque Séptico em Cães',
  subtitle: 'Consensos VECCS/JVECC 2026, Fisiopatologia Celular, Disfunção Orgânica e Ressuscitação Racional',
  synonyms: [
    'Sepse canina',
    'Canine sepsis',
    'Choque séptico canino',
    'Septic shock in dogs',
    'Resposta desregulada à infecção',
    'Disfunção orgânica séptica',
    'Síndrome da disfunção de múltiplos órgãos séptica (MODS)',
  ],
  species: ['dog'],
  category: 'urgencia-emergencia',
  categories: [
    'urgencia-emergencia',
    'terapia-intensiva',
    'infecciosas',
    'hemodinamica',
    'clinica-medica',
  ],
  tags: [
    'Sepse',
    'Choque Séptico',
    'Disfunção Orgânica',
    'Consenso VECCS 2026',
    'Goggs 2026',
    'MODS',
    'Norepinefrina',
    'Vasoplegia',
    'Lactato',
    'Source Control',
    'AAHA 2024',
    'APPLEfast',
    'Peritonite Séptica',
  ],
  quickSummary:
    'A sepse canina foi profundamente redefinida pelos consensos veterinários internacionais de 2026 (Goggs et al., JVEC) como uma síndrome com risco iminente de morte decorrente de uma resposta desregulada do hospedeiro a uma infecção, caracterizada obrigatoriamente pela presença de nova disfunção orgânica. Essa conceituação supera de forma definitiva a dependência histórica de SIRS, que passa a atuar unicamente como sinalizador de alerta de triagem e não critério diagnóstico obrigatório. O choque séptico representa o subtipo hemodinâmico mais grave, definido pela coexistência de instabilidade cardiovascular e anormalidades metabólicas indicativas de hipoperfusão tecidual que persistem após ressuscitação volêmica adequada. O tratamento apoia-se em cinco pilares sinérgicos: restauração hemodinâmica racional com cristaloides balanceados em alíquotas de 15 a 20 mL/kg (diretrizes AAHA 2024), suporte vasoativo precoce com norepinefrina para combater a vasoplegia, controle físico imediato da fonte infecciosa (source control), antibioticoterapia empírica precoce e suporte intensivo multimodal com nutrição enteral precoce e proteção de órgãos.',

  quickSummaryRich: {
    lead:
      'Sepse canina é a associação obrigatória entre infecção documentada ou fortemente suspeita e disfunção orgânica nova provocada por resposta desregulada do hospedeiro. Em 2026, a presença isolada de critérios de SIRS ou febre não é suficiente nem necessária para o diagnóstico.',
    leadHighlights: [
      'resposta desregulada do hospedeiro',
      'disfunção orgânica nova',
      'SIRS não é critério diagnóstico obrigatório',
      'choque séptico',
      'ressuscitação volêmica racional',
      'norepinefrina precoce',
      'source control',
    ],
    pillars: [
      {
        title: 'A Grande Mudança Conceitual de 2026',
        body:
          'Os consensos VECCS/JVECC (Goggs et al., 2026) abandonam a fórmula simplista Infecção + SIRS = Sepse. A disfunção orgânica passa a ser obrigatória na própria definição de sepse; infecção sem falência de órgãos não deve ser classificada como sepse, e febre ou leucocitose não são pré-requisitos.',
        highlights: ['Goggs et al., 2026', 'disfunção orgânica obrigatória', 'SIRS não obrigatório'],
      },
      {
        title: 'Definição Atualizada de Choque Séptico',
        body:
          'Subgrupo de sepse de máxima gravidade e mortalidade, caracterizado por instabilidade cardiovascular e anormalidades metabólicas de hipoperfusão (ex.: hiperlactatemia, extremidades frias, oligúria) que persistem apesar de ressuscitação volêmica adequada. O consenso veterinário rejeita cutoffs humanos rígidos isolados (como PAM fixa < 65 ou lactato > 2 isolado).',
        highlights: ['instabilidade cardiovascular', 'hipoperfusão persistente', 'após ressuscitação volêmica adequada'],
      },
      {
        title: 'Fisiopatologia Celular e Tromboinflamação',
        body:
          'A ativação desenfreada de PRRs por PAMPs e DAMPs induz tempestade de citocinas, shedding do glicocálix endotelial, hiperpermeabilidade microvascular, vasoplegia refratária, imunotrombose com NETose descontrolada, aprisionamento neutrofílico capilar e cardiomiopatia séptica.',
        highlights: ['shedding do glicocálix', 'vasoplegia', 'imunotrombose', 'NETose', 'cardiomiopatia séptica'],
      },
      {
        title: 'Ressuscitação e Terapia Vasoativa Racional',
        body:
          'Veto absoluto à antiga dose de choque cega de 90 mL/kg. Emprego de alíquotas de 15 a 20 mL/kg de cristaloide balanceado em 15 a 30 minutos com reavaliação seriada dinâmica (AAHA 2024). Transição rápida para norepinefrina (0,1 a 1,0 mcg/kg/min) diante de vasoplegia persistente, evitando sobrecarga hídrica letal.',
        highlights: ['15 a 20 mL/kg', 'cristaloides balanceados', 'norepinefrina precoce', 'prevenção de sobrecarga'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Estratificação Consensual da Sepse Canina (2026)',
      steps: [
        {
          label: 'Passo 1: Identificação de Infecção Comprovada ou Fortemente Suspeita',
          detail:
            'Buscar ativamente focos abdominais (peritonite, perfuração GI, deiscência, piometra), respiratórios (pneumonia bacteriana, piotórax), urinários (pielonefrite obstrutiva), teciduais ou bacteremias. Coletar amostras para citologia e microbiologia antes do antimicrobiano, desde que isso não retarde o início terapêutico no paciente instável.',
          timing: 'Imediato (primeiros 15 minutos)',
        },
        {
          label: 'Passo 2: Investigação Objetiva de Disfunção Orgânica Nova (Goggs et al., 2026)',
          detail:
            'Aferir e documentar falência em pelo menos um sistema: Cardiovascular (hipotensão, lactato > 2 mmol/L, pulsos fracos, ScvO2 < 70%), Renal (diurese < 1 mL/kg/h por 6h, aumento de creatinina >= 0,3 mg/dL em 48h), Respiratório (hipoxemia, ARDSVet), SNC (estupor, coma, MGCS <= 14), Hepático (hiperbilirrubinemia > 0,5 mg/dL), Coagulação (plaquetas < 100.000/uL, D-dímero elevado, prolongamento de PT/aPTT > 25%) ou Metabólico (hipoglicemia, acidose severa).',
          timing: 'Admissão e monitoramento contínuo',
        },
        {
          label: 'Passo 3: Exclusão Criteriosa de Causas Concorrentes',
          detail:
            'Garantir que a alteração orgânica não é explicada por doença crônica preexistente, hipovolemia desidratativa isolada não reanimada, anestesia, sedação com opioides ou uropatia obstrutiva mecânica primária.',
          limitations: 'Disfunções orgânicas só contam se atribuíveis à resposta séptica sistêmica.',
        },
        {
          label: 'Passo 4: Estratificação de Gravidade com APPLEfast e Lactato Dinâmico',
          detail:
            'Calcular escore estruturado APPLEfast (glicose, albumina, estado mental, plaquetas e lactato). Monitorar a cinética de depuração do lactato nas primeiras 2 a 6 horas.',
          timing: 'A cada 2 a 4 horas nas primeiras 12 a 24 horas',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Pilares de Suporte Intensivo',
      steps: [
        {
          label: 'Ressuscitação Hemodinâmica Guiada por Metas (AAHA 2024)',
          detail:
            'Infusão rápida de 15 a 20 mL/kg de cristaloide balanceado (Ringer Lactato ou Plasma-Lyte) em 15 a 30 minutos. Reavaliar imediatamente perfusão, PAM, lactato e POCUS pulmonar (linhas B). Repetir apenas se persistir hipovolemia e houver responsividade a volume comprovada.',
          dose: '15 a 20 mL/kg em 15 a 30 min',
          reassess: 'A cada alíquota administrada',
        },
        {
          label: 'Suporte Vasoativo e Inotrópico Precoce',
          detail:
            'Se a PAM permanecer < 65 mmHg ou sinais de hipoperfusão persistirem após restauração do volume intravascular, iniciar prontamente norepinefrina em infusão contínua. Associar vasopressina em vasoplegia catecolamina-resistente e dobutamina se houver cardiomiopatia séptica com baixo débito.',
          dose: 'Norepinefrina 0,1 a 1,0 mcg/kg/min; Vasopressina 0,5 a 5 mU/kg/min; Dobutamina 5 a 15 mcg/kg/min',
          timing: 'Janela precoce de estabilização',
        },
        {
          label: 'Antimicrobianoterapia Empírica Precoce de Amplo Espectro',
          detail:
            'Administrar antibióticos intravenosos bactericidas adequados ao foco suspeito na primeira hora em pacientes com choque séptico. Exemplo clássico em sepse abdominal comunitária: Ampicilina/Sulbactam associada a Enrofloxacina (ou Cefalosporina de 3ª geração). Descalonar assim que o antibiograma estiver disponível.',
          timing: 'Idealmente na 1ª hora em choque séptico',
        },
        {
          label: 'Controle Físico do Foco (Source Control)',
          detail:
            'Identificar e interromper mecanicamente a fonte de contaminação através de cirurgia descompressiva/ressectiva (laparotomia em peritonite, OSH em piometra), drenagem torácica ou debridamento. Nenhum antibiótico substitui o controle cirúrgico.',
          timing: 'Assim que alcançada estabilidade hemodinâmica mínima para anestesia',
        },
        {
          label: 'Suporte Nutricional Enteral Precoce e Analgesia Segura',
          detail:
            'Introdução de nutrição enteral em microdoses por sonda nasoesofágica/gástrica em 12 a 24 horas pós-estabilização para manter trofismo de enterócitos e barreira mucosa. Analgesia baseada em opioides puros (metadona, fentanil). Veto categórico ao uso de AINEs.',
          timing: 'Após estabilização hemodinâmica inicial',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      title: 'Tabela de Decisão Rápida: SIRS vs Sepse vs Choque Séptico vs MODS (Consenso 2026)',
      headers: ['Síndrome Clínica', 'Conceito Central', 'Critérios Diagnósticos Obrigatórios', 'Conduta Imediata'],
      rows: [
        {
          col1: 'Infecção Local / Estável',
          col2: 'Invasão e replicação de patógenos restrita a um tecido ou órgão',
          col3: 'Presença do agente infeccioso sem disfunção orgânica sistêmica ou hipotensão',
          col4: 'Terapia antimicrobiana direcionada ao foco; vigilância clínica sem necessidade de suporte em UTI',
        },
        {
          col1: 'SIRS (Resposta Inflamatória)',
          col2: 'Alerta clínico de resposta inflamatória sistêmica (infecciosa ou estéril)',
          col3: 'Pelo menos 2 critérios: FC > 120 bpm, FR > 20 irpm, Temp < 38,1 ou > 39,2 °C, Leucócitos < 6.000 ou > 16.000/uL, bastonetes > 3%',
          col4: 'Investigar etiologia (pancreatite, trauma, GDV vs infecção); NÃO diagnostica sepse isoladamente',
        },
        {
          col1: 'Sepse Canina (Definição 2026)',
          col2: 'Síndrome com risco à vida por resposta desregulada do hospedeiro à infecção',
          col3: 'Infecção confirmada/suspeita + Nova Disfunção Orgânica em >= 1 sistema atribuível à sepse',
          col4: 'Internação em UTI, cristaloides balanceados guiados por metas, antibiótico precoce, source control e monitoramento seriado',
        },
        {
          col1: 'Choque Séptico',
          col2: 'Subconjunto mais grave de sepse com falência hemodinâmica e celular profunda',
          col3: 'Sepse + Instabilidade cardiovascular e hipoperfusão tecidual persistindo após restauração de volume',
          col4: 'Norepinefrina contínua, considerar vasopressina/dobutamina, oxigenioterapia e controle cirúrgico urgente',
        },
        {
          col1: 'MODS Séptica',
          col2: 'Síndrome de disfunção de múltiplos órgãos em cascata progressiva',
          col3: 'Disfunção simultânea de >= 2 sistemas orgânicos (cardiovascular, renal, respiratório, hemostático, etc.)',
          col4: 'Suporte multissistêmico avançado, ventilação mecânica se ARDS, terapia renal se AKI, estratificação com APPLE',
        },
      ],
    },
  },

  quickDecisionStrip: [
    'Sepse não é apenas infecção grave: o Consenso 2026 exige a presença de nova disfunção orgânica.',
    'SIRS não é obrigatório para sepse: ausência de febre ou leucocitose não afasta o diagnóstico.',
    'Choque séptico não exige MAP fixa: define-se por instabilidade cardiovascular e hipoperfusão pós-fluidos.',
    'Fluidos em alíquotas de 15 a 20 mL/kg (AAHA 2024): sobrecarga de volume causa edema tecidual e morte.',
    'Source control precoce: nenhum antimicrobiano cura peritonite séptica sem intervenção cirúrgica.',
  ],

  etiology: {
    definicaoEConceitoModerno2026:
      'Em julho de 2026, os consensos veterinários internacionais publicados no Journal of Veterinary Emergency and Critical Care por Goggs et al. (JVEC 36:445-469 e JVEC 36:470-488) transformaram formalmente a definição e a abordagem clínica da sepse e do choque séptico em pequenos animais. A abordagem clássica herdada de consensos humanos da década de 1990 definia sepse de maneira reducionista como a presença de infecção acompanhada de Síndrome da Resposta Inflamatória Sistêmica (SIRS). O novo consenso veterinário estabelece que sepse é uma síndrome ameaçadora à vida decorrente de uma resposta desregulada do hospedeiro a uma infecção, caracterizada obrigatoriamente pela ocorrência de nova disfunção orgânica. Demonstrou-se que os critérios tradicionais de SIRS possuem sensibilidade e especificidade insatisfatórias, falhando em estratificar risco ou predizer prognóstico de forma confiável. Assim, a presença de disfunção orgânica deixou de ser considerada apenas uma complicação tardia da chamada sepse grave (termo que se torna redundante e em desuso) para constituir o elemento nuclear e obrigatório da própria definição diagnóstica.',
    analogiaDidaticaIncendio:
      'Para facilitar o entendimento clínico e a comunicação com a equipe e tutores, a fisiopatologia da sepse pode ser visualizada através da metáfora do incêndio e do corpo de bombeiros desregulado. Em uma infecção bacteriana localizada e controlada, a invasão patogênica equivale a um foco restrito de fogo no cômodo de uma casa; o sistema imunológico funciona como uma equipe disciplinada de bombeiros que chega ao local com alarmes precisos, combate o fogo com quantidade proporcional de água, extingue as chamas e preserva a estrutura restante intacta. Na sepse, ocorre uma quebra catastrófica do controle regulatório: a infecção dispara um alarme generalizado desproporcional. Todos os bombeiros da cidade comparecem em desespero, derrubam portas desnecessariamente, arrombam paredes sadias, quebram janelas de vizinhos, fecham as ruas principais impedindo a passagem de suprimentos e inundam a casa e o quarteirão com milhões de litros de água sob alta pressão. O fogo inicial pode ter sido até extinto, mas a violência desmedida e a desorganização das próprias forças de socorro destroem a residência, alagam a vizinhança e causam colapso estrutural de edifícios distantes que jamais pegaram fogo. A sepse, portanto, não é o microrganismo destruindo tudo sozinho, mas a resposta defensiva do corpo agindo de forma autodestrutiva e caótica.',
    diferenciacaoConceitualSirsSepseMods:
      'A medicina baseada em evidências contemporânea exige diferenciação terminológica rigorosa entre cinco conceitos frequentemente confundidos na rotina hospitalar: 1. Infecção: invasão e multiplicação de microrganismos patogênicos em tecidos corporais normalmente estéreis (um paciente com cistite bacteriana ou abscesso subcutâneo simples apresenta infecção, mas está clinicamente estável e não possui sepse); 2. SIRS (Síndrome da Resposta Inflamatória Sistêmica): reação inflamatória generalizada caracterizada por alterações de temperatura, frequência cardíaca, frequência respiratória e leucograma, desencadeada tanto por estímulos infecciosos quanto por afecções estéreis graves como pancreatite aguda necrosante, politraumatismo, torção gástrica (GDV), queimaduras térmicas extensas ou neoplasias; 3. Sepse: síndrome clínica definida pela coexistência obrigatória de infecção (confirmada ou fortemente suspeita) e disfunção orgânica nova atribuível à resposta do hospedeiro; 4. Choque Séptico: subconjunto de maior gravidade e mortalidade da sepse, no qual anormalidades circulatórias, celulares e metabólicas profundas comprometem a perfusão de forma persistente, mesmo após reposição volêmica adequada; 5. MODS (Síndrome da Disfunção de Múltiplos Órgãos): comprometimento funcional progressivo e simultâneo de dois ou mais sistemas orgânicos em um paciente agudamente enfermo, no qual a homeostase não pode ser mantida sem intervenção terapêutica avançada contínua.',
    tabelaComparativaConceitos2026: {
      title: 'Tabela 1 — Transição de Paradigmas: Abordagem Clássica vs Consenso Veterinário 2026',
      headers: ['Conceito Clínico', 'Abordagem Antiga (Legada / VIN 2025)', 'Consenso Veterinário 2026 (Goggs et al., JVEC)', 'Impacto na Prática Clínica'],
      rows: [
        {
          col1: 'Definição de Sepse',
          col2: 'Infecção + Presença de >= 2 critérios de SIRS',
          col3: 'Infecção + Resposta desregulada + Disfunção orgânica com risco de vida',
          col4: 'Exige comprovação objetiva de lesão funcional em pelo menos um órgão para diagnosticar sepse',
        },
        {
          col1: 'Papel do SIRS',
          col2: 'Critério diagnóstico central e obrigatório',
          col3: 'Alerta clínico de triagem; não é necessário nem suficiente para fechar sepse',
          col4: 'Evita falsos-positivos (ex.: pancreatite estéril com SIRS) e falsos-negativos (cão séptico sem SIRS)',
        },
        {
          col1: 'Valor da Febre',
          col2: 'Sinal cardinal indispensável para suspeitar de sepse',
          col3: 'Variável inconstante; cães graves frequentemente exibem normotermia ou hipotermia',
          col4: 'Ausência de febre nunca deve ser utilizada para afastar sepse ou postergar cuidados intensivos',
        },
        {
          col1: 'Alterações do Leucograma',
          col2: 'Critério diagnóstico mandatório (leucocitose, leucopenia ou bastonetes)',
          col3: 'Achado auxiliar útil, mas não obrigatório para o diagnóstico formal',
          col4: 'Pacientes com contagem leucocitária normal podem apresentar sepse com falência orgânica',
        },
        {
          col1: 'Disfunção Orgânica',
          col2: 'Marcador exclusivo da categoria separada sepse grave',
          col3: 'Elemento nuclear obrigatório da própria definição de sepse',
          col4: 'O termo sepse grave torna-se essencialmente redundante e em desuso no vocabulário técnico',
        },
        {
          col1: 'Choque Séptico',
          col2: 'Hipotensão arterial refratária com cutoffs humanos rígidos (PAM < 65 mmHg e lactato > 2)',
          col3: 'Subconjunto com instabilidade cardiovascular e hipoperfusão após ressuscitação adequada',
          col4: 'Julgamento hemodinâmico multimodal sem dependência de um número numérico universal isolado',
        },
      ],
    },
    etiologiasEFocosInfecciososCaninos:
      'Em cães, a sepse decorre predominantemente de infecções bacterianas comunitárias ou nosocomiais, embora agentes fúngicos (ex.: Aspergillus, Candida), protozoários (Babesia canis, Babesia gibsoni) e virais (Parvovírus canino) possam atuar como gatilhos primários ou predispor a invasões bacterianas bacterêmicas maciças. O trato gastrointestinal representa a fonte anatômica mais prevalente de sepse grave e peritonite séptica secundária em cães, decorrente de perfurações por corpos estranhos lineares ou pontiagudos, deiscências de enterectomias/gastrotomias prévias, úlceras pépticas perfuradas por uso inadvertido de AINEs/corticoides e isquemia mural transmural secundária a vólvulo gástrico (GDV). O trato urinário atua como segundo grande foco através de pielonefrites ascendentes complicadas, nefrolitíase obstrutiva com pionefrose e uroabdômen pós-traumático ou obstrutivo infectado. O sistema reprodutor feminino destaca-se na cadela não castrada através da piometra e metrite séptica puerperal, enquanto nos machos sobressaem o abscesso prostático e prostatite bacteriana aguda. No tórax, a pneumonia bacteriana aspirativa secundária a megaesôfago ou disfunção laríngea e o piotórax exsudativo representam fontes frequentes de descompensação cardiorrespiratória. Feridas cutâneas por mordedura com descolamento fascial extenso, fasceíte necrotizante, osteomielite ortopédica e infecções nosocomiais associadas a cateteres venosos centrais e cirurgias prévias completam o espectro etiológico de maior relevância na UTI.',
    tabelaFocosInfecciososMicrobiologia: {
      title: 'Tabela 2 — Principais Focos de Sepse Canina e Microbiologia Típica',
      headers: ['Foco Anatômico', 'Condições Clínicas Frequentes', 'Bactérias Prevalentes', 'Particularidades Cirúrgicas'],
      rows: [
        {
          col1: 'Trato Gastrointestinal',
          col2: 'Perfuração por corpo estranho, deiscência de anastomose, úlcera perfurada, GDV isquêmico',
          col3: 'Flora mista: Escherichia coli, Enterococcus spp., Clostridium perfringens, Bacteroides fragilis, Klebsiella spp.',
          col4: 'Indicação cirúrgica mandatória de emergência; laparotomia exploratória, lavagem peritoneal abundante e omentalização',
        },
        {
          col1: 'Trato Urinário (Urossepse)',
          col2: 'Pielonefrite ascendente grave, pionefrose obstrutiva, abscesso renal, uroperitônio infectado',
          col3: 'Gram-negativos entéricos: Escherichia coli uropatogênica, Proteus mirabilis, Klebsiella, Pseudomonas aeruginosa',
          col4: 'Desobstrução urinária imediata (stent ureteral / SUB em obstruções); nefrectomia se rim destruído e contralateral pérvio',
        },
        {
          col1: 'Sistema Reprodutor',
          col2: 'Piometra de cérvix fechada ou aberta com ruptura uterina, abscesso prostático, metrite aguda',
          col3: 'Escherichia coli (predominante em 80%), Streptococcus canis, Staphylococcus pseudintermedius, anaeróbios',
          col4: 'Ovariosalpingohisterectomia (OSH) de emergência na piometra; omentalização ou drenagem cirúrgica no abscesso prostático',
        },
        {
          col1: 'Trato Respiratório e Pleura',
          col2: 'Pneumonia bacteriana aspirativa complicada com abscesso pulmonar, piotórax, trauma penetrante',
          col3: 'Pneumonia: E. coli, Pasteurella multocida, Bordetella bronchiseptica, Mycoplasma; Piotórax: anaeróbios, Nocardia, Actinomyces',
          col4: 'Toracocentese e drenagem torácica com tubo de tórax e lavagem no piotórax; lobectomia se abscesso consolidado',
        },
        {
          col1: 'Hepatobiliar',
          col2: 'Colecistite enfisematosa séptica, colangite bacteriana ascendente, ruptura de vesícula biliar, abscesso hepático',
          col3: 'Escherichia coli, Enterococcus faecalis, Clostridium spp., Klebsiella pneumoniae',
          col4: 'Colecistectomia se necrose de vesícula biliar ou peritonite biliar séptica; drenagem hepática',
        },
        {
          col1: 'Pele e Tecidos Moles',
          col2: 'Feridas penetrantes por mordedura canina, fasceíte necrotizante, celulite séptica extensa',
          col3: 'Staphylococcus pseudintermedius, Streptococcus agalactiae, Pasteurella canis, anaeróbios estritos',
          col4: 'Debridamento cirúrgico amplo de tecidos desvitalizados, drenagem em sistema fechado e curativos com pressão negativa',
        },
      ],
    },
  },

  epidemiology: {
    definicaoEClassificacao:
      'A sepse canina não possui predisposição racial genética estrita, acometendo machos e fêmeas de qualquer idade, porte ou ambiente zootécnico. Entretanto, determinados perfis fenotípicos e comorbidades subjacentes elevam dramaticamente a suscetibilidade e a velocidade de progressão para o choque séptico. Pacientes geriátricos (> 8 a 10 anos) apresentam maior prevalência de endocrinopatias imunossupressoras (hiperadrenocorticismo, diabetes mellitus descompensado), neoplasias sólidas ocultas e doença renal crônica prévia. Em contrapartida, filhotes e cães jovens (< 6 meses) possuem reserva fisiológica limitada, imaturidade imunológica e alta incidência de gastroenterite viral por Parvovírus canino com translocação bacteriana maciça e choque endotoxêmico fulminante. Fêmeas não castradas de meia-idade a idosas constituem a população sob maior risco de piometra e sepse reprodutiva bacteriana por E. coli. Raças braquicefálicas (Bulldog Francês, Bulldog Inglês, Pug) exibem incidência desproporcionalmente alta de pneumonia aspirativa bacteriana complicada devido à síndrome aérea braquicefálica associada a refluxo gastroesofágico crônico e megaesôfago funcional. Raças de grande porte e tórax profundo (Dogue Alemão, Pastor Alemão, Weimaraner) apresentam predisposição clássica à síndrome da dilatação-torção gástrica (GDV), na qual a compressão vascular esplâncnica e a necrose da parede gástrica culminam em translocação bacteriana entérica massiva, sepse abdominal e choque distributivo associado a choque obstrutivo.',
  },

  pathogenesisTransmission: {
    fisiopatologiaPampDampEndoteliopatia:
      'A patogênese da sepse inicia-se com o reconhecimento de padrões moleculares conservados dos microrganismos invasores (PAMPs - Pathogen-Associated Molecular Patterns), tais como o lipopolissacarídeo (LPS ou endotoxina) da membrana externa de bactérias Gram-negativas, peptideoglicanos e ácidos lipoteicoicos de bactérias Gram-positivas, beta-glucanos de fungos e ácidos nucleicos virais. Esses PAMPs ligam-se a receptores de reconhecimento de padrões (PRRs - Pattern Recognition Receptors), principalmente os receptores Toll-like (TLR4 para LPS, TLR2 para peptideoglicanos), receptores NOD-like intracelulares e receptores scavenger presentes em macrófagos, neutrófilos, células dendríticas e no endotélio vascular. A ligação PAMP-PRR desencadeia translocação do fator nuclear kappa B (NF-kB) para o núcleo celular e ativação de inflamassomas, gerando liberação maciça de citocinas pró-inflamatórias primárias: Fator de Necrose Tumoral alfa (TNF-alfa), Interleucina-1 beta (IL-1beta) e Interleucina-6 (IL-6). Paralelamente, a necrose celular e a destruição tecidual induzidas pela infecção liberam padrões moleculares associados ao dano (DAMPs - Damage-Associated Molecular Patterns), incluindo DNA mitocondrial, histonas citotóxicas, HMGB1 (High Mobility Group Box 1), proteínas S100 e ATP extracelular. Esses DAMPs ligam-se aos mesmos PRRs, instalando um circuito vicioso de autoamplificação inflamatória: a lesão tecidual realimenta e perpetua o alarme biológico mesmo quando a carga bacteriana primária já foi parcialmente reduzida.',
    figuraEndotelioGlicocalix: {
      id: 'fig-endotelio-glicocalix',
      title: 'Figura 1 — Desnudamento do Glicocálix Endotelial e Extravasamento Capilar',
      legend:
        'Representação biofísica da microcirculação: forças hidrostáticas e oncóticas de Starling operando em capilares com disfunção de barreira. O shedding enzimático do glicocálix endotelial e a abertura de junções intercelulares permitem a saída massiva de albumina e água para o espaço intersticial, produzindo edema tecidual simultâneo à hipovolemia intravascular efetiva na sepse.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-canina/hiperpermeabilidade-capilar-edema.jpg',
      aspectRatio: '5:4',
    },
    figuraImunotromboseNetose: {
      id: 'fig-imunotrombose-netose',
      title: 'Figura 2 — Imunotrombose Desregulada e Formação de NETs na Sepse',
      legend:
        'Esquema mecanístico de imunotrombose: interação recíproca entre neutrófilos ativados, plaquetas, fator tecidual e cascata de coagulação. A liberação descontrolada de armadilhas extracelulares de neutrófilos (NETose) aprisiona bactérias, mas promove oclusão microvascular disseminada e isquemia multiorgânica.',
      source: 'Journal of Cellular and Molecular Medicine / Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/sepse-canina/imunotrombose-netose-sepse.jpg',
      aspectRatio: '16:9',
    },
    figuraNeutrofiloNetBacterias: {
      id: 'fig-neutrofilo-net-bacterias',
      title: 'Figura 3 — Microscopia Eletrônica de Neutrófilo Projetando NET',
      legend:
        'Micrografia eletrônica de varredura demonstrando um neutrófilo em processo de NETose (verde) capturando bactérias patogênicas (roxo). Na sepse sistêmica, a deposição massiva de redes de DNA e histonas nos leitos capilares renais, pulmonares e hepáticos induz disfunção endotelial e microtrombose consuntiva.',
      source: 'Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/sepse-canina/neutrofilo-net-bacterias.jpg',
      aspectRatio: '4:3',
    },
    figuraCitologiaPeritoniteSeptica: {
      id: 'fig-citologia-peritonite-septica',
      title: 'Figura 4 — Citologia com Neutrófilos Degenerados e Bactérias Fagocitadas',
      legend:
        'Fotomicografia de esfregaço citológico de efusão cavitária exibindo neutrófilos degenerados (cariólise, cromatina frouxa e vacuolização tóxica) com bactérias intracelulares fagocitadas. Trata-se do padrão ouro citológico para confirmação de sepse cavitária e indicação cirúrgica imediata.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-canina/citologia-neutrofilos-bacterias-intracelulares.png',
      aspectRatio: '16:9',
    },
    cardiomiopatiaSepticaEPerfusao:
      'A cardiomiopatia induzida por sepse constitui uma manifestação clínica de extrema gravidade reconhecida pelo Consenso VECCS 2026. O miocárdio é lesado diretamente por citocinas circulantes (TNF-alfa e IL-1beta), estresse oxidativo, desacoplamento mitocondrial e excesso de óxido nítrico miocárdico gerado pela superexpressão da óxido nítrico sintase induzível (iNOS). Isso resulta em diminuição da sensibilidade dos miofilamentos ao cálcio e dessensibilização dos receptores beta-1 adrenérgicos. Clinicamente, o paciente canino pode desenvolver disfunção sistólica ventricular esquerda com queda acentuada da fração de encurtamento, disfunção diastólica por edema miocárdico intersticial e arritmias ventriculares complexas. Esse fenômeno gera o dilema clássico da terapia intensiva: um cão séptico hipotenso pode ter simultaneamente vasoplegia periférica e falência de bomba cardíaca. Infundir volumes excessivos de fluidos nesse paciente não melhora o débito cardíaco, resultando apenas em sobrecarga hidrostática, aumento das pressões de enchimento atrial e edema pulmonar agudo cardiogênico superimposto à lesão pulmonar inflamatória.',
    imunoparalisiaECars:
      'Ao contrário do modelo conceitual antigo que presumia uma fase puramente hiperinflamatória seguida, dias depois, por exaustão imune, o Consenso 2026 e a literatura contemporânea comprovam que a resposta pró-inflamatória e a Síndrome da Resposta Anti-inflamatória Compensatória (CARS) desenvolvem-se de forma concomitante desde os momentos iniciais da sepse. Ocorre apoptose acelerada de linfócitos T CD4+, T CD8+ e células B na polpa branca esplênica e linfonodos, exaustão funcional de células dendríticas e hiperprodução de citocinas supressoras como Interleucina-10 (IL-10) e Fator de Crescimento Transformador beta (TGF-beta). Os monócitos periféricos passam a exibir imunofenótipo desativado com expressão drasticamente reduzida do antígeno leucocitário de histocompatibilidade (MHC classe II / HLA-DR). O paciente canino séptico encontra-se simultaneamente em estado de hiperinflamação destrutiva periférica e paralisia imunológica profunda (imunoparalisia), tornando-se extraordinariamente vulnerável a bacteremias secundárias nosocomiais, reativação viral e infecções fúngicas invasivas oportunistas.',
  },

  pathophysiology: {
    mecanismosVasoplegiaHipovolemia:
      'A hipotensão e o colapso hemodinâmico do choque séptico canino não resultam de um único defeito volêmico, mas de uma complexa sobreposição de quatro mecanismos fisiopatológicos concorrentes: A. Vasodilatação Arterial Severa (Vasoplegia): a superexpressão da enzima iNOS pelo endotélio e células musculares lisas vasculares eleva as concentrações de óxido nítrico em centenas de vezes, ativando a guanilato ciclase solúvel e cGMP. Isso provoca relaxamento vascular generalizado, abertura patológica de canais de potássio ATP-dependentes (KATP), hiperpolarização celular e dessensibilização adrenérgica profunda dos receptores alfa-1, culminando em colapso da Resistência Vascular Sistêmica (RVS); B. Venodilatação e Hipovolemia Relativa: o leito venoso de capacitância armazena fisiologicamente a maior parte da volemia corporal total, dividida em volume tensionado (stressed volume, que exerce pressão transmural e direciona o retorno venoso ao coração) e volume não tensionado (unstressed volume, que apenas preenche os vasos sem exercer pressão). Na sepse, a venodilatação patológica converte ativamente volume tensionado em volume não tensionado, sequestrando grandes volumes de sangue no leito esplâncnico periférico e reduzindo a pré-carga cardíaca e o volume sistólico, gerando hipovolemia hemodinâmica severa mesmo sem qualquer perda externa de sangue; C. Hipovolemia Absoluta Verdadeira: perda líquida real por vômitos frequentes, diarreia profusa, anorexia prolongada e acúmulo de perdas em terceiro espaço (efusões peritoneais, pleurais e edema fascial); D. Hiperpermeabilidade Microvascular (Capillary Leak): a degradação enzimática e o desnudamento endotelial (shedding do glicocálix mediado por heparanases, proteases leucocitárias e espécies reativas de oxigênio) desfazem a barreira semipermeável vascular. Proteínas plasmáticas de alto peso molecular (especialmente albumina) extravasam livremente para o interstício, invertendo o gradiente oncótico de Starling e drenando água livre intravascular para o espaço intersticial. O cão séptico apresenta simultaneamente anasarca/edema tecidual difuso e hipovolemia intravascular efetiva crítica.',
    desacoplamentoMacroMicrocirculacao:
      'Uma das premissas fundamentais estabelecidas pelo Consenso de Choque Séptico de 2026 é que a macro-hemodinâmica e a microcirculação periférica encontram-se profundamente desacopladas na sepse. É perfeitamente possível ressuscitar um cão séptico até alcançar uma Pressão Arterial Média (PAM) aparentemente confortável de 65 a 70 mmHg através de fluidos e vasopressores, enquanto o leito capilar e as células permanecem hipóxicos, isquêmicos e não nutridos. A microcirculação séptica é marcada por heterogeneidade espacial severa: capilares com fluxo interrompido por microtrombos de imunotrombose encontram-se lado a lado com capilares hiperêmicos de fluxo rápido que realizam shunt microvascular funcional sem oxigenação tecidual. Além disso, as células endoteliais sofrem edema citoplasmático, os eritrócitos perdem a capacidade fisiológica de deformabilidade mecânica e os neutrófilos ativados aderem firmemente ao leito venular capilar pós-sinusoidal. A nível celular, ocorre disfunção mitocondrial direta (hipóxia citopática): a mitocôndria perde a capacidade de fosforilação oxidativa e produção eficiente de ATP mesmo quando o oxigênio está fisicamente presente no meio celular. Portanto, perseguir metas isoladas de pressão arterial sem avaliar marcadores de perfusão celular periférica (lactato dinâmico, déficit de base, débito urinário, nível de consciência e gradiente térmico) é clinicamente inadequado.',
    imunotromboseECoagulopatiaCid:
      'A ativação imune endotelial dispara a cascata da imunotrombose através da superexpressão de Fator Tecidual (FT) na superfície de monócitos e células endoteliais denudadas, ativando o Fator VII e gerando surtos descontrolados de trombina. Concomitantemente, os três mecanismos anticoagulantes naturais do hospedeiro encontram-se severamente deprimidos: os níveis plasmáticos de antitrombina (AT) despencam por consumo, degradação proteolítica por elastase neutrofílica e perda endotelial; a via da proteína C é inativada pela perda de trombomodulina e receptor endotelial de proteína C no glicocálix desnudado; e o inibidor da via do fator tecidual (TFPI) é exaurido. Os neutrófilos ativados projetam redes de DNA e histonas citotóxicas (NETs) que ancoram plaquetas, ativam o fator XII e induzem resistência fibrinolítica mediada pelo aumento de PAI-1 ativo e TAFI (Goggs et al., 2025). O consumo intravascular massivo de plaquetas e fatores de coagulação culmina em Coagulação Intravascular Disseminada (CID), momento em que o paciente canino apresenta o paradoxo mortal de trombose microvascular multiorgânica simultânea a sangramentos petequiais cutaneomucosos, hematúria e hemorragia cavitária.',
  },

  clinicalSignsPathophysiology: {
    faseHiperdinamicaInicial:
      'Fase clássica de sepse precoce compensada (choque quente): caracterizada por vasodilatação periférica com resistência vascular sistêmica diminuída e resposta cronotrópica simpática reflexa vigorosa com alto débito cardíaco. Os achados clínicos típicos incluem taquicardia marcante (FC frequentemente > 140 a 180 bpm em cães), mucosas intensamente hiperêmicas (coloração vermelho-vivo ou vermelho-tijolo), tempo de preenchimento capilar (TPC/CRT) extremamente rápido e fugaz (< 1 segundo), pulsos arteriais periféricos amplos e hipercinéticos (bounding pulse), temperatura retal elevada por febre induzida por pirogênios endógenos (39,3 a 40,5 °C) e taquipneia superficial compensatória.',
    faseHipodinamicaTardia:
      'Fase de descompensação hemodinâmica e falência circulatória (choque frio): reflete o esgotamento das reservas cronotrópicas, disfunção miocárdica séptica, perda profunda do tônus vascular e hipovolemia intravascular grave. Os achados clínicos evidenciam colapso circulatório manifesto: mucosas pálidas, esbranquiçadas ou com tonalidade cinza-chumbo; TPC severamente prolongado (> 2,5 a 4 segundos) ou ausente; pulsos arteriais femorais filiformes, fracos ou impalpáveis; extremidades periféricas frias com gradiente térmico acentuado entre tronco e patas; hipotermia retal severa (< 37,5 °C) associada a pior prognóstico; hipotensão arterial sistêmica franca; depressão mental profunda, estupor ou coma; e oligúria progressiva (< 0,5 a 1,0 mL/kg/h).',
    criteriosDisfuncaoOrganicaSistemas:
      'A essência diagnóstica do Consenso VECCS 2026 consiste na identificação ativa de disfunções orgânicas novas que não possam ser mais bem explicadas pela doença pré-existente do paciente, uso de drogas sedativas ou hipovolemia desidratativa pura não reanimada: 1. Sistema Nervoso Central (SNC): depressão mental aguda desproporcional, alteração no nível de consciência, estupor, coma, delirium séptico ou Escore de Coma de Glasgow Modificado (MGCS) <= 14/18 (excluindo hipoglicemia, hiperamonemia grave ou opioides); 2. Sistema Cardiovascular: hipotensão persistente, pulsos periféricos fracos, TPC anormal, taquicardia refratária, necessidade nova de vasopressores/inotrópicos para perfusão, hiperlactatemia (> 2 mmol/L), déficit de base persistente > 6 mmol/L inexplicado, saturação venosa central de oxigênio (ScvO2) < 70% pós-ressuscitação ou cardiomiopatia ecocardiográfica; 3. Sistema Respiratório: taquipneia, esforço respiratório com padrão restritivo, hipoxemia arterial, relação PaO2/FiO2 diminuída compatível com Lesão Pulmonar Aguda / ARDSVet com infiltrados alveolares bilaterais não cardiogênicos ao Vet BLUE e radiografia; 4. Sistema Renal: Lesão Renal Aguda (AKI) caracterizada por oligúria estrita (< 1 mL/kg/h por >= 6 horas consecutivas após restauração do volume circulante), aumento agudo da creatinina sérica >= 0,3 mg/dL em relação ao basal em < 48 horas ou cilindrúria patológica granular/celular; 5. Sistema Hepático: hiperbilirrubinemia clínica ou laboratorial (> 0,5 mg/dL) sem evidência de hemólise intravascular primária ou obstrução mecânica biliar extra-hepática primária (colestase intra-hepática da sepse), hipocolesterolemia e hiperamonemia; 6. Coagulação e Hemostasia: trombocitopenia aguda (< 100.000 plaquetas/uL ou queda > 50% em 24h), aumento de PT ou aPTT > 25% acima do intervalo laboratorial, hipofibrinogenemia, elevação marcada de D-dímero, queda de antitrombina ou sangramentos clínicos novos; 7. Metabólico e Endócrino: hipoglicemia consumptiva (< 60 mg/dL), acidemia metabólica severa ou insuficiência corticosteroide relacionada à doença crítica (CIRCI); 8. Trato Gastrointestinal: íleo paralítico adinâmico generalizado, intolerância alimentar absoluta com estase gástrica, diarreia hemorrágica enterotóxica ou hipertensão intra-abdominal.',
    tabelaCriteriosDisfuncaoOrganica: {
      title: 'Tabela 3 — Critérios Objetivos de Disfunção Orgânica em Cães Sépticos (Consenso VECCS 2026)',
      headers: ['Sistema Orgânico', 'Marcadores Consensuais de Disfunção Orgânica (2026)', 'Exclusões Mandatórias Obrigatórias'],
      rows: [
        {
          col1: 'Sistema Cardiovascular',
          col2: 'Hipotensão persistente, necessidade nova de vasopressor/inotrópico, lactato > 2 mmol/L, déficit de base > 6 mmol/L, ScvO2 < 70%, cardiomiopatia ecocardiográfica',
          col3: 'Hipovolemia pura não ressuscitada, arritmia primária prévia, sangramento hemorrágico ativo sem sepse',
        },
        {
          col1: 'Sistema Renal (AKI)',
          col2: 'Diurese < 1,0 mL/kg/h por >= 6h consecutivas (cateter fechado), creatinina sérica com aumento >= 0,3 mg/dL em < 48h, cilindros granulares patológicos',
          col3: 'Doença renal crônica prévia descompensada por desidratação pré-renal pura, obstrução uretral/ureteral mecânica pós-renal, uroperitônio',
        },
        {
          col1: 'Sistema Respiratório (ARDSVet)',
          col2: 'Hipoxemia em ar ambiente (PaO2 < 80 mmHg, SpO2 < 95%), PaO2/FiO2 <= 300, taquipneia descompensada, infiltrado interstício-alveolar bilateral não cardiogênico',
          col3: 'Edema pulmonar cardiogênico por sobrecarga volêmica iatrogênica (TACO) ou cardiopatia esquerda prévia, contusão pulmonar traumática',
        },
        {
          col1: 'Sistema Nervoso Central',
          col2: 'Alteração aguda da consciência, estupor, coma, delirium/disforia séptica, MGCS <= 14/18, novos déficits neurológicos focais',
          col3: 'Efeito residual de sedativos/opioides/anestésicos, hipoglicemia severa não corrigida, encefalopatia hepática por shunt portossistêmico congênito',
        },
        {
          col1: 'Sistema Hepático',
          col2: 'Bilirrubina total sérica > 0,5 mg/dL (colestase funcional da sepse), hiperamonemia, hipocolesterolemia severa',
          col3: 'Hemólise intravascular primária (AHIM, Babesia), obstrução mecânica biliar extra-hepática por urólito/mucocele sem sepse sistêmica',
        },
        {
          col1: 'Coagulação e Hemostasia',
          col2: 'Plaquetas < 100.000/uL (ou queda > 50% em 24h), aumento de PT ou aPTT > 25% do limite superior, D-dímero elevado, petéquias/equimoses espontâneas',
          col3: 'Trombocitopenia imunomediada (ITP) primária não séptica, intoxicação por rodenticidas anticoagulantes, hemofilia congênita',
        },
        {
          col1: 'Metabólico e Endócrino',
          col2: 'Hipoglicemia grave (< 60 mg/dL por consumo aumentado e falha gliconeogênica), acidose metabólica descompensada, CIRCI',
          col3: 'Overdose de insulina exógena em diabético, insulinoma pancreático, hipoadrenocorticismo primário de Addison típico',
        },
      ],
    },
  },

  diagnosis: {
    raciocinioSequencial2026:
      'O diagnóstico da sepse canina contemporânea é estruturado em uma propedêutica em duas etapas sequenciais obrigatórias: ETAPA 1: Determinar a existência de infecção confirmada (citologia com bactérias intracelulares, cultura positiva, cirurgia com contaminação evidente) ou fortemente suspeita (quadro clínico compatível associado a imagens ultrassonográficas/radiográficas altamente sugestivas de abscesso, líquido livre turvo ou pneumonia); ETAPA 2: Documentar objetivamente pelo menos uma nova disfunção orgânica atribuível à resposta séptica que não seja explicada pela patologia de base do órgão acometido ou comorbidade crônica. Se houver infecção comprovada, mas nenhuma disfunção orgânica identificada, o paciente é diagnosticado como portador de infecção (ex.: pielonefrite não complicada, ferida infectada, abscesso estável), recebendo antimicrobianos e vigilância rigorosa, mas NÃO deve ser rotulado como séptico. Por outro lado, caso a sepse seja confirmada e o paciente apresente instabilidade cardiovascular com sinais de hipoperfusão tecidual (hipotensão, lactato persistentemente elevado, extremidades frias) persistindo mesmo após reposição volêmica intravascular adequada, estabelece-se o diagnóstico conclusivo de CHOQUE SÉPTICO.',
    escoresGravidadeApplefast:
      'O Consenso VECCS 2026 recomenda enfaticamente o emprego de escores clínicos estruturados e validados de gravidade para estratificação objetiva de risco e comunicação prognóstica na sepse. O escore padrão ouro recomendado na rotina de terapia intensiva é o APPLEfast (Acute Patient Physiologic and Laboratory Evaluation - versão rápida), composto por cinco variáveis clínicas e laboratoriais objetivas mensuradas à admissão: 1. Glicemia sérica; 2. Albumina sérica; 3. Nível de consciência / estado mental; 4. Contagem total de plaquetas; 5. Concentração plasmática de lactato. Estudos prospectivos em cães criticamente enfermos (Castelain et al., 2026, 130 cães) comprovaram que pontuações elevadas no APPLEfast associam-se fortemente à presença de sepse e atuam como o preditor independente mais robusto de mortalidade hospitalar (Odds Ratio 3,2). Quando disponíveis dados laboratoriais mais extensos, pode ser utilizado o escore APPLEfull ou adaptações veterinárias do SOFA (Sequential Organ Failure Assessment). Ressalta-se que esses escores não fecham diagnóstico de sepse per se, mas medem a carga biológica de gravidade e disfunção multissistêmica do paciente.',
    propedeuticaLactatoDeltaGlicosePocus:
      'A propedêutica laboratorial da sepse exige interpretação dinâmica e integrada de biomarcadores: A. Lactato Sanguíneo: não deve ser interpretado como medidor exclusivo de hipóxia celular pura. A hiperlactatemia na sepse decorre de hipoperfusão (Tipo A - choque anaeróbio), mas também de estímulo adrenérgico beta-2 com glicólise acelerada, menor depuração hepática/renal e disfunção mitocondrial direta. O lactato seriado (clearance de lactato) é o verdadeiro indicador útil: uma queda de >= 30% a 50% na concentração de lactato após as primeiras 2 a 4 horas de ressuscitação correlaciona-se com sobrevida favorável; B. POCUS (Point-of-Care Ultrasound): protocolo ultrassonográfico à beira do leito indispensável. O AFAST detecta líquido livre peritoneal nos quatro quadrantes anatômicos e guia a abdominocentese de emergência; o TFAST e Vet BLUE detectam linhas B confluentes indicando edema pulmonar intersticial ou consolidação inflamatória pneumônica; o POCUS cardiovascular avalia subjetivamente a volemia da veia cava caudal (índice de colapsabilidade da VCC) e identifica cardiomiopatia séptica com contratilidade deprimida; C. Análise de Efusão Peritoneal (Peritonite Séptica): o achado citológico padrão ouro definitivo é a visualização microscópica de bactérias fagocitadas no citoplasma de neutrófilos degenerados (cariolíticos).',
    tabelaDiferencialDeltaGlicoseLactato: {
      title: 'Tabela 4 — Interpretação Laboratorial da Efusão Peritoneal na Suspeita de Sepse Abdominal',
      headers: ['Parâmetro Analisado', 'Critério Laboratorial Sugestivo de Sepse', 'Acurácia Clínica e Limitações Práticas (Séries 2023–2026)', 'Interpretação e Conduta'],
      rows: [
        {
          col1: 'Citologia da Efusão (Lâmina Corada)',
          col2: 'Presença de bactérias intracelulares fagocitadas por neutrófilos degenerados',
          col3: 'Sensibilidade de 60% a 80%, mas especificidade próxima a 100%. Padrão ouro citológico absoluto',
          col4: 'Fecha o diagnóstico de peritonite séptica imediatamente; indicação cirúrgica urgente de laparotomia sem aguardar cultura',
        },
        {
          col1: 'Delta Glicose (Sangue - Líquido)',
          col2: 'Glicose sanguínea menos glicose do líquido peritoneal > 20 mg/dL',
          col3: 'Especificidade elevada (até 100% em plasma), mas sensibilidade moderada a baixa (apenas 41% a 61% em séries modernas de 113 cães)',
          col4: 'Diferença > 20 mg/dL apoia peritonite bacteriana consumptiva. ATENÇÃO: delta < 20 mg/dL NÃO descarta peritonite séptica',
        },
        {
          col1: 'Delta Lactato (Líquido - Sangue)',
          col2: 'Lactato do líquido peritoneal maior que o lactato sanguíneo em > 2,0 mmol/L',
          col3: 'Sensibilidade de 72% a 85% e especificidade de 84% a 90%; lactato absoluto na efusão >= 4,2 mmol/L altamente sugestivo',
          col4: 'Bactérias e leucócitos produzem lactato local acelerado; reforça fortemente indicação cirúrgica exploratória',
        },
        {
          col1: 'Cultura Microbiológica e TSA',
          col2: 'Isolamento bacteriano em meios aeróbio e anaeróbio com perfil de sensibilidade (MIC)',
          col3: 'Padrão ouro microbiológico confirmatório; resultado atrasa de 48 a 72 horas para liberação',
          col4: 'Coletar amostras antes do antibiótico; direciona o descalonamento (stewardship) pós-operatório na UTI',
        },
        {
          col1: 'Biomarcadores Plasmáticos (CRP e PCT)',
          col2: 'Proteína C-Reativa (CRP) muito elevada; Procalcitonina (PCT)',
          col3: 'CRP tem alta sensibilidade para inflamação, mas zero especificidade infecciosa. PCT canina não separa sepse de SIRS estéril (Rompf 2025)',
          col4: 'Úteis apenas para acompanhar tendência terapêutica seriada; não servem como teste diagnóstico isolado de sepse',
        },
      ],
    },
  },

  treatment: {
    pilaresTerapeuticosConsensuais:
      'A abordagem terapêutica da sepse e do choque séptico em cães é organizada em cinco pilares sinérgicos de intervenção intensiva: 1. Restauração Hemodinâmica Racional: otimização da perfusão microvascular sem hiper-hidratação; 2. Terapia Vasoativa e Inotrópica: reversão precoce da vasoplegia com norepinefrina; 3. Antibioticoterapia Empírica Precoce de Amplo Espectro: administração bactericida endovenosa na primeira hora em choque séptico; 4. Controle Físico do Foco (Source Control): drenagem ou ressecção cirúrgica imediata da fonte infecciosa; 5. Terapia de Suporte Intensivo Multimodal: nutrição enteral precoce, analgesia livre de AINEs, prevenção de sobrecarga hídrica e monitoramento seriado de múltiplos órgãos.',
    abordagemHemodinamicaAaha2024:
      'A ressuscitação volêmica na sepse sofreu uma revolução crítica de segurança formalizada pelas diretrizes de fluidoterapia da AAHA 2024. A antiga prática de infundir automaticamente a chamada dose de choque empírica de 90 mL/kg de cristaloides é formalmente proscrita e considerada perigosa. O paciente séptico apresenta glicocálix rompido e hiperpermeabilidade microvascular; administrar volumes excessivos de fluidos não aumenta o volume intravascular efetivo de forma sustentada, translocando água e sódio para o interstício e gerando edema pulmonar grave (ARDSVet), edema da parede intestinal com íleo e deiscência de suturas cirúrgicas, hipertensão intra-abdominal e congestão venosa renal com agravamento da AKI. A recomendação padrão ouro da AAHA 2024 para cães em choque consiste na administração de alíquotas limitadas de 15 a 20 mL/kg de cristaloide isotônico tamponado/balanceado (como Ringer com Lactato ou Plasma-Lyte) infundidas rapidamente em 15 a 30 minutos. Após cada alíquota, é obrigatório reavaliar parâmetros dinâmicos de perfusão (TPC, frequência cardíaca, amplitude de pulso, temperatura periférica, lactato) e sinais de intolerância a fluidos (frequência respiratória, crepitações na ausculta pulmonar, linhas B no Vet BLUE e dilatação da veia cava caudal ao POCUS). Um novo bolus só deve ser administrado se o paciente permanecer hipovolêmico E continuar fluido-responsivo E não apresentar sinais de congestão. O uso de cloreto de sódio 0,9% (salina fisiológica) em grandes volumes deve ser evitado devido à sua alta carga de cloreto (154 mmol/L), que induz acidose metabólica hiperclorêmica e vasoconstrição arteriolar renal.',
    suporteVasoativoNorepinefrina:
      'Quando o volume intravascular é razoavelmente restaurado, mas a hipotensão arterial (PAM < 65 mmHg) e a hipoperfusão persistem, o defeito predominante passou a ser a VASOPLEGIA. Tentar normalizar a pressão arterial continuando a infundir cristaloides em um leito vascular paralisado e excessivamente dilatado é um erro grave que produz apenas anasarca e óbito. O vasopressor de primeira escolha consensual em cães sépticos hipotensos é a NOREPINEFRINA em infusão contínua na dose de 0,1 a 1,0 mcg/kg/min IV (titulada gradualmente ao efeito para manter PAM entre 65 e 75 mmHg). A norepinefrina atua predominantemente em receptores alfa-1 promovendo vasoconstrição arterial e venoconstrição esplâncnica (convertendo volume não tensionado em volume tensionado, o que aumenta o retorno venoso e a pré-carga), acompanhada de ação inotrópica modesta via receptores beta-1. Em pacientes profundamente hipotensos na admissão, não é necessário aguardar o término de todos os fluidos para iniciar o vasopressor: a norepinefrina precoce pode ser associada simultaneamente à primeira alíquota de cristaloide para reduzir o tempo de hipoperfusão isquêmica tecidual. Caso a vasoplegia seja refratária a doses elevadas de norepinefrina (> 0,5 a 1,0 mcg/kg/min), associa-se a VASOPRESSINA na dose de 0,5 a 5 mU/kg/min (ou 0,03 a 0,3 U/kg/h) em infusão contínua; a vasopressina atua via receptores vasculares V1 independentes do sistema adrenérgico, restaurando a reatividade vascular. Se houver documentação ecocardiográfica ou clínica de cardiomiopatia séptica com disfunção sistólica e baixo débito cardíaco persistente, adiciona-se o inotrópico DOBUTAMINA na dose de 5 a 15 mcg/kg/min IV CRI.',
    tabelaDrogasVasoativasSepse: {
      title: 'Tabela 5 — Guia Prático de Fármacos Vasoativos e Inotrópicos na Sepse Canina',
      headers: ['Fármaco / Solução', 'Mecanismo de Ação Predominante', 'Dose e Via de Administração', 'Indicações Clínicas e Cuidados'],
      rows: [
        {
          col1: 'Cristaloide Balanceado (Ringer Lactato / Plasma-Lyte)',
          col2: 'Expansão do volume intravascular efetivo isotônico tamponado',
          col3: '15 a 20 mL/kg IV em 15 a 30 minutos; reavaliar imediatamente antes de repetir',
          col4: 'Primeira linha na hipovolemia. Evitar NaCl 0,9% em grandes volumes para prevenir acidose hiperclorêmica e vasoconstrição renal',
        },
        {
          col1: 'Norepinefrina (Bitartarato)',
          col2: 'Potente agonista alfa-1 adrenérgico com ação beta-1 inotrópica leve a moderada',
          col3: '0,1 a 1,0 mcg/kg/min em infusão contínua (CRI) intravenosa, titulada ao efeito',
          col4: 'Vasopressor de primeira escolha na sepse. Reverte a vasoplegia, restaura tônus venoso e pressão de perfusão; administrar em cateter dedicado',
        },
        {
          col1: 'Vasopressina (Hormônio Antidiurético)',
          col2: 'Agonista puro de receptores V1 da musculatura lisa vascular (via não adrenérgica)',
          col3: '0,5 a 5 mU/kg/min (equivalente a aprox. 0,03 a 0,3 U/kg/h) IV CRI',
          col4: 'Segunda linha associada à norepinefrina na vasoplegia refratária a catecolaminas. Permite poupar dose de norepinefrina e reduzir taquiarritmias',
        },
        {
          col1: 'Dobutamina',
          col2: 'Agonista inotrópico positivo potente beta-1 com efeito vasodilatador beta-2 leve',
          col3: '5 a 15 mcg/kg/min em infusão contínua (CRI) intravenosa',
          col4: 'Inotrópico de escolha na cardiomiopatia induzida por sepse com disfunção contrátil sistólica e baixo débito. Monitorar taquicardia e arritmias',
        },
        {
          col1: 'Hidrocortisona (Terapia de Resgate)',
          col2: 'Glicocorticoide de curta ação; restaura sensibilidade dos receptores adrenérgicos vasculares',
          col3: '0,5 a 1,0 mg/kg IV em bolus seguido de 0,15 mg/kg/h IV CRI (ou 1 mg/kg IV q6h)',
          col4: 'Restrita como resgate no choque séptico refratário com suspeita de CIRCI sem resposta a doses máximas de vasopressores. Não usar rotineiramente',
        },
      ],
    },
    tabelaFenotiposHemodinamicosUti: {
      title: 'Tabela 6 — Raciocínio de Terapia Intensiva: Três Fenótipos Hipotensos Distintos',
      headers: ['Perfil Hemodinâmico', 'Achados ao Exame Físico e POCUS', 'Mecanismo Fisiopatológico Nuclear', 'Conduta Terapêutica Racional'],
      rows: [
        {
          col1: 'Paciente A: Hipovolemia Dominante',
          col2: 'PA baixa, TPC prolongado, mucosas pálidas e secas, pulsos fracos, veia cava caudal (VCC) colapsada ao POCUS',
          col3: 'Déficit absoluto de volume intravascular por vômitos, diarreia, perdas cavitárias e extravasamento inicial',
          col4: 'Expansão volêmica rápida com alíquota de cristaloide balanceado (15-20 mL/kg em 15-30 min); paciente é fluido-responsivo',
        },
        {
          col1: 'Paciente B: Vasoplegia Dominante',
          col2: 'PA baixa pós-fluidos, extremidades relativamente quentes, mucosas róseas/hiperêmicas, pulsos amplos, VCC preenchida',
          col3: 'Paralisia do tônus vascular periférico mediada por óxido nítrico e cGMP; perda da resistência vascular sistêmica',
          col4: 'Suspender expansão fluida rápida agressiva. Iniciar prontamente infusão contínua de Norepinefrina para restaurar o tônus vascular',
        },
        {
          col1: 'Paciente C: Falência de Bomba / Miocárdica',
          col2: 'PA baixa ou instável pós-fluidos, pulsos fracos, POCUS cardíaco revela contratilidade deprimida e átrios dilatados, lactato alto',
          col3: 'Cardiomiopatia induzida por sepse com depressão sistólica por citocinas, edema miocárdico e desacoplamento de cálcio',
          col4: 'Evitar sobrecarga volêmica letal. Associar suporte inotrópico com Dobutamina e titular vasopressor com extrema cautela',
        },
      ],
    },
    antibioticoterapiaPrecoceStewardship:
      'A administração precoce de antimicrobianos bactericidas intravenosos adequados ao foco suspeito é uma das intervenções com maior associação à sobrevida no choque séptico canino. Em pacientes instáveis com choque distributivo, cada hora de atraso no início do antibiótico apropriado eleva a probabilidade de colapso multiorgânico e óbito (Summers et al., 2021). As amostras biológicas para citologia, cultura e antibiograma (sangue, urina, secreções cavitárias) devem ser colhidas imediatamente na admissão, mas essa coleta JAMAIS deve atrasar o início da primeira dose antimicrobiana por mais de 45 a 60 minutos em um cão instável. A escolha inicial é necessariamente empírica e deve cobrir o espectro habitual do foco presumido com bactericidas sinérgicos de ampla cobertura: em infecções abdominais comunitárias não hospitalizadas, associa-se habitualmente uma aminopenicilina com inibidor de betalactamase (Ampicilina/Sulbactam 30 a 50 mg/kg IV q8h) a uma fluoroquinolona (Enrofloxacina 10 a 15 mg/kg IV q24h) ou cefalosporina de 3ª geração (Ceftriaxona 25 a 50 mg/kg IV q12h), associando Metronidazol (10 a 15 mg/kg IV q12h) se houver necessidade de ampliar cobertura anaeróbia. Em pacientes com infecções nosocomiais pós-operatórias ou histórico de hospitalização e uso recente de antibióticos, o risco de Enterobacterales multirresistentes (ESBL) e Pseudomonas aeruginosa é elevado, exigindo regimes hospitalares avançados. O princípio mandatório de Antibiotic Stewardship preconiza que, assim que os resultados da cultura e do teste de sensibilidade (MIC) estiverem disponíveis (geralmente em 48 a 72 horas), a equipe deve descalonar a terapia para o antimicrobiano de espectro mais estreito, menor toxicidade e duração mínima necessária, interrompendo associações redundantes.',
    controleFisicoDoFocoSourceControl:
      'O controle físico imediato da fonte infecciosa (source control) constitui o pilar mais decisivo e insubstituível no manejo da sepse cirúrgica. Em pacientes com peritonite séptica decorrente de perfuração intestinal, deiscência de anastomose, piometra rompida ou ruptura de vias biliares, nenhuma combinação de antibióticos ou drogas vasoativas tem capacidade biológica de curar o paciente enquanto a fonte física de contaminação bacteriana contínua permanecer aberta no organismo. O desafio na sala de emergência reside no timing cirúrgico: a equipe deve ressuscitar e estabilizar hemodinamicamente o paciente de forma rápida e focada (otimizar volume intravascular, iniciar norepinefrina se vasoplégico, corrigir hipoglicemia e acidose extrema em uma janela de 1 a 3 horas) e encaminhá-lo imediatamente ao centro cirúrgico. Postergar a cirurgia na ilusão de transformar um cão com peritonite séptica ativa em um paciente perfeitamente estável é uma armadilha fatal, pois a estabilidade definitiva é inalcançável enquanto a perfuração continuar semeando endotoxinas e bactérias na cavidade peritoneal.',
    suporteIntensivoNutricaoAnalgesia:
      'O cuidado intensivo do cão séptico exige suporte multimodal contínuo: A. Nutrição Enteral Precoce: a sepse induz estado hipermetabólico e hipercatabólico severo com proteólise muscular e consumo proteico acelerado. Manter o paciente em jejum prolongado provoca perda do trofismo dos enterócitos, atrofia das vilosidades intestinais, quebra da integridade das junções oclusivas e translocação bacteriana, realimentando a sepse. Assim que a estabilização hemodinâmica for alcançada (lactato em queda, paciente fora de doses cavalares de vasopressores), deve-se iniciar nutrição enteral precoce por sonda nasoesofágica ou nasogástrica com dietas líquidas hipercalóricas e de alta digestibilidade em alíquotas fracionadas (microenteral nutrition, 10% a 25% da necessidade energética basal para manter o trofismo mucosal, progredindo conforme a tolerância); B. Analgesia Multimodal Segura: o controle da dor severa em afecções como peritonite séptica, pancreatite e cirurgias abdominais reduz o estresse adrenérgico destrutivo e a liberação de citocinas. Os analgésicos de escolha são os opioides agonistas mu puros intravenosos em bolus ou infusão contínua (Metadona 0,1 a 0,3 mg/kg IV q4h; Fentanil 2 a 5 mcg/kg/h IV CRI; Buprenorfina 0,01 a 0,02 mg/kg IV q6-8h). Os Anti-inflamatórios Não Esteroidais (AINEs) são FORMALMENTE CONTRAINDICADOS na sepse canina devido ao risco inaceitável de necrose papilar renal, colapso da taxa de filtração glomerular e ulceração gastrointestinal perfurante; C. Manejo de Náusea e Dismotilidade: Maropitant (1 mg/kg IV q24h) e Ondansetrona (0,5 mg/kg IV q8-12h) para controle de êmese e náusea; procinéticos (metoclopramida CRI) apenas após comprovação cirúrgica de ausência de obstrução mecânica; D. Monitoramento da Função Renal e Débito Urinário: cateterismo vesical com sistema fechado estéril, mantendo meta de diurese de pelo menos 1 mL/kg/h a 2 mL/kg/h para avaliar perfusão de órgãos nobres e evitar congestão.',
  },

  complications: {
    dezErrosMataisSepse:
      'Dez erros críticos e armadilhas letais a evitar no manejo da sepse canina: 1. Atrasar o diagnóstico de sepse por ausência de febre, leucocitose ou critérios completos de SIRS (desatualizado desde o Consenso 2026); 2. Administrar a clássica dose de choque de 90 mL/kg de cristaloides de uma vez, provocando edema pulmonar fatal e congestão renal; 3. Considerar que todo cão séptico hipotenso necessita de mais fluido em vez de reconhecer vasoplegia ou cardiomiopatia e iniciar vasopressores precocemente; 4. Adiar a administração de antibióticos no choque séptico aguardando resultados de cultura microbiológica; 5. Prescrever anti-inflamatórios não esteroidais (AINEs) a pacientes sépticos hipotensos ou azotêmicos; 6. Tentar estabilizar indefinidamente um cão com peritonite séptica por perfuração antes de encaminhar para cirurgia de emergência (source control); 7. Manter jejum prolongado por dias em vez de iniciar nutrição enteral precoce por sonda assim que a perfusão estabilizar; 8. Prescrever rotineiramente corticoides em altas doses na sepse na ausência de choque vasoplégico refratário com suspeita de CIRCI; 9. Interpretar um único valor de lactato como indicador absoluto de hipóxia celular pura em vez de monitorar a tendência cinética do clearance; 10. Assumir que uma pressão arterial média (PAM) normal garante microcirculação e perfusão tecidual adequadas.',
    falenciaMúltiplaMods:
      'A progressão para Síndrome da Disfunção de Múltiplos Órgãos (MODS) representa o desfecho patológico terminal da resposta inflamatória desregulada. Estudos veterinários (Summers et al., 2021) documentam que cães com choque séptico que evoluem para óbito apresentam em média 3,24 sistemas orgânicos em falência concomitante na UTI. A ocorrência de Lesão Renal Aguda (AKI) anúrica ou oligúrica eleva a mortalidade para mais de 70% a 80%, frequentemente exigindo hemodiálise intermitente ou hemofiltração contínua em centros terciários. A instalação de ARDSVet impõe insuficiência respiratória hipoxêmica refratária com necessidade de intubação endotraqueal e ventilação mecânica com pressão positiva expiratória final (PEEP) para recrutamento alveolar. A disfunção hepática séptica com colestase e hipoalbuminemia severa agrava a anasarca e desestabiliza a ligação proteica de fármacos essenciais.',
  },

  prevention: {
    protocoloPlantaoSepse10Passos:
      'Protocolo de plantão: conduta clínica sequencial em 10 passos para o paciente canino com suspeita de sepse ou choque séptico: 1. Triagem e Oxigenação: avaliar via aérea, fornecer oxigênio a 100% sob máscara e garantir acesso venoso calibroso imediato (IV duplo ou intraósseo); 2. Coleta Diagnóstica Imediata: sangue para hemograma completo, lactato, gasometria, bioquímica (creatinina, ureia, eletrólitos, glicose, albumina, bilirrubina), coagulograma e hemoculturas pareadas; 3. POCUS de Emergência: realizar AFAST para detectar líquido livre abdominal e TFAST/Vet BLUE para avaliar edema pulmonar, consolidação e índice de colapsabilidade da veia cava caudal; 4. Abdominocentese Diagnóstica: colher líquido livre guiado por ultrassom para citologia imediata (pesquisa de bactérias intracelulares e neutrófilos degenerados) e dosagem de glicose/lactato na efusão; 5. Ressuscitação Volêmica Guiada por Metas: infundir alíquota de 15 a 20 mL/kg de cristaloide balanceado (Ringer Lactato / Plasma-Lyte) em 15 a 30 minutos; reavaliar imediatamente; 6. Suporte Vasoativo Precoce: se a PAM persistir < 65 mmHg ou sinais de má perfusão persistirem após restauração do volume, iniciar norepinefrina em infusão contínua (0,1 a 1,0 mcg/kg/min); 7. Antibioticoterapia de Emergência: administrar bactericidas intravenosos de amplo espectro na primeira hora (ex.: Ampicilina/Sulbactam + Enrofloxacina/Ceftriaxona); 8. Intervenção Cirúrgica de Emergência (Source Control): se houver líquido peritoneal séptico confirmado, encaminhar de imediato para laparotomia exploratória assim que atingir estabilidade anestésica básica; 9. Analgesia e Suporte Intensivo: opioides puros intravenosos (metadona/fentanil); veto total a AINEs; monitorar débito urinário rigoroso com sonda vesical em sistema fechado (meta >= 1 mL/kg/h); 10. Monitoramento Seriado e Nutrição Enteral: reavaliar lactato a cada 2 a 4 horas, calcular escore APPLEfast para estratificação e passar sonda alimentar nasoenteral assim que estabilizado.',
  },

  figures: [
    {
      id: 'fig-endotelio-glicocalix',
      title: 'Figura 1 — Desnudamento do Glicocálix Endotelial e Extravasamento Capilar',
      legend:
        'Representação biofísica da microcirculação: forças hidrostáticas e oncóticas de Starling operando em capilares com disfunção de barreira. O shedding enzimático do glicocálix endotelial e a abertura de junções intercelulares permitem a saída massiva de albumina e água para o espaço intersticial, produzindo edema tecidual simultâneo à hipovolemia intravascular efetiva na sepse.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-canina/hiperpermeabilidade-capilar-edema.jpg',
      aspectRatio: '5:4',
    },
    {
      id: 'fig-imunotrombose-netose',
      title: 'Figura 2 — Imunotrombose Desregulada e Formação de NETs na Sepse',
      legend:
        'Esquema mecanístico de imunotrombose: interação recíproca entre neutrófilos ativados, plaquetas, fator tecidual e cascata de coagulação. A liberação descontrolada de armadilhas extracelulares de neutrófilos (NETose) aprisiona bactérias, mas promove oclusão microvascular disseminada e isquemia multiorgânica.',
      source: 'Journal of Cellular and Molecular Medicine / Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/sepse-canina/imunotrombose-netose-sepse.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-neutrofilo-net-bacterias',
      title: 'Figura 3 — Microscopia Eletrônica de Neutrófilo Projetando NET',
      legend:
        'Micrografia eletrônica de varredura demonstrando um neutrófilo em processo de NETose (verde) capturando bactérias patogênicas (roxo). Na sepse sistêmica, a deposição massiva de redes de DNA e histonas nos leitos capilares renais, pulmonares e hepáticos induz disfunção endotelial e microtrombose consuntiva.',
      source: 'Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/sepse-canina/neutrofilo-net-bacterias.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-citologia-peritonite-septica',
      title: 'Figura 4 — Citologia com Neutrófilos Degenerados e Bactérias Fagocitadas',
      legend:
        'Fotomicografia de esfregaço citológico de efusão cavitária exibindo neutrófilos degenerados (cariólise, cromatina frouxa e vacuolização tóxica) com bactérias intracelulares fagocitadas. Trata-se do padrão ouro citológico para confirmação de sepse cavitária e indicação cirúrgica imediata.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-canina/citologia-neutrofilos-bacterias-intracelulares.png',
      aspectRatio: '16:9',
    },
  ],

  relatedConsensusSlugs: [
    'veccs-sepse-definicao-caes-gatos-2026',
    'veccs-choque-septico-prognostico-2026',
    'curative-risco-trombotico-2022',
  ],
  relatedDiseaseSlugs: [
    'coagulacao-intravascular-disseminada-caes-gatos',
    'babesiose-canina',
    'piotorax-caes-gatos',
    'cistite-enfisematosa-caes-gatos',
    'anemia-hemolitica-imunomediada-canina',
  ],
  relatedMedicationSlugs: [
    'ampicilina-sulbactam',
    'amoxicilina-clavulanato',
    'enrofloxacina',
    'ceftriaxona',
    'metadona',
    'buprenorfina',
    'dipirona',
  ],

  references: [
    {
      id: 'ref-goggs-sepse-2026',
      citation:
        'Goggs R, Cortellini S, DeClue AE, et al. Sepsis in Dogs and Cats: Consensus Definition and Clinical Criteria. Journal of Veterinary Emergency and Critical Care 2026; 36(4): 445–469.',
      url: 'https://doi.org/10.1111/vec.70129',
    },
    {
      id: 'ref-goggs-choque-2026',
      citation:
        'Goggs R, Cortellini S, DeClue AE, et al. Septic Shock and Prognosis in Dogs and Cats With Sepsis: Consensus Definition and Clinical Criteria. Journal of Veterinary Emergency and Critical Care 2026; 36(4): 470–488.',
      url: 'https://doi.org/10.1111/vec.70130',
    },
    {
      id: 'ref-aaha-fluids-2024',
      citation:
        '2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association 2024; 60(4): 120–145.',
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/',
    },
    {
      id: 'ref-ettinger-9',
      citation:
        'DeClue AE. Sepsis and the Systemic Inflammatory Response Syndrome. In: Ettinger SJ, Feldman EC, Côté E (eds). Textbook of Veterinary Internal Medicine, 9th edition. Elsevier, 2024, pp. 667–673.',
    },
    {
      id: 'ref-nelson-couto-6',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th edition. Elsevier, 2020. Capítulos 73 e 86.',
    },
    {
      id: 'ref-plumb-10',
      citation:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th edition. Wiley-Blackwell, 2023. Monografias Norepinephrine, Vasopressin, Dobutamine.',
    },
    {
      id: 'ref-summers-2021',
      citation:
        'Summers AM, Culler C, Cooper E. Evaluation of the clinical presentation and outcome of dogs with septic shock: 37 cases (2008–2018). Journal of Veterinary Emergency and Critical Care 2021; 31(1): 9–18.',
      url: 'https://doi.org/10.1111/vec.13038',
    },
    {
      id: 'ref-castelain-2026',
      citation:
        'Castelain A, et al. Sepsis and APPLEfast score in critically ill dogs: a prospective observational study. Frontiers in Veterinary Science 2026; 13: 13471268.',
      url: 'https://doi.org/10.3389/fvets.2026.13471268',
    },
    {
      id: 'ref-shipov-2023',
      citation:
        'Shipov A, et al. Prognostic factors in dogs with septic peritonitis: 113 cases. Veterinary Record 2023; 193(4): e2134.',
      url: 'https://doi.org/10.1002/vetr.2134',
    },
    {
      id: 'ref-rompf-2025',
      citation:
        'Rompf A, et al. Comparison of procalcitonin and C-reactive protein in dogs with sepsis and non-infectious SIRS. Frontiers in Veterinary Science 2025; 12: 12213344.',
      url: 'https://doi.org/10.3389/fvets.2025.12213344',
    },
  ],

  isPublished: true,
  createdAt: '2026-09-27T06:00:00.000Z',
  updatedAt: '2026-09-27T06:00:00.000Z',
};
