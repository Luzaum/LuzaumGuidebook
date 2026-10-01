import { DiseaseRecord } from '../../types/disease';

export const sepseFelinaRecord: DiseaseRecord = {
  id: 'disease-sepse-felina',
  slug: 'sepse-felina',
  title: 'Sepse e Choque Séptico em Felinos',
  subtitle: 'Consensos VECCS/JVECC 2026, Fenótipo Hipodinâmico, Tríade do Choque e Ressuscitação Conservadora',
  synonyms: [
    'Sepse felina',
    'Feline sepsis',
    'Choque séptico felino',
    'Septic shock in cats',
    'Tríade do choque felino',
    'Fenótipo hipodinâmico felino',
    'Síndrome da disfunção de múltiplos órgãos séptica felina (MODS)',
    'Disfunção orgânica séptica felina',
  ],
  species: ['cat'],
  category: 'urgencia-emergencia',
  categories: [
    'urgencia-emergencia',
    'terapia-intensiva',
    'infecciosas',
    'medicina-felina',
    'clinica-medica',
  ],
  tags: [
    'Sepse Felina',
    'Choque Séptico Felino',
    'Consenso VECCS 2026',
    'Goggs 2026',
    'Fenótipo Hipodinâmico',
    'Tríade do Choque',
    'MODS Felina',
    'Troìa 2019',
    'Norepinefrina',
    'Fluidoterapia Conservadora',
    'AAHA 2024',
    'Piotórax',
    'Peritonite Séptica',
    'APPLEfast Felino',
  ],
  quickSummary:
    'A sepse em felinos foi formalmente redefinida pelos consensos veterinários internacionais de 2026 (Goggs et al., JVECC) como uma síndrome com risco iminente de morte provocada por uma resposta desregulada do hospedeiro a uma infecção, caracterizada obrigatoriamente pela presença de nova disfunção orgânica. Esta conceituação supera a antiga fórmula legada de infecção associada a critérios de SIRS, uma vez que estudos clínicos multicêntricos e consensuais (Troìa et al. 2019; Klainbart et al. 2017) comprovaram que o SIRS não tem sensibilidade adequada nem correlação prognóstica com mortalidade na espécie felina. O paciente felino com sepse não precisa parecer hiperinflamado; ao contrário do cão, exibe predominantemente o fenótipo hipodinâmico ou frio (tríade clássica do choque felino: hipotermia, bradicardia relativa ou ausência de taquicardia compensatória e hipotensão com pulsos filiformes). O choque séptico é caracterizado pela persistência de instabilidade cardiovascular e hipoperfusão após ressuscitação volêmica adequada. O manejo em terapia intensiva exige respeito estrito à baixa tolerância volêmica do felino (ressuscitação conservadora com alíquotas cautelosas de 5 a 10 mL/kg de cristaloides balanceados, conforme diretrizes AAHA 2024), aquecimento externo ativo gradual como intervenção hemodinâmica ativa, suporte vasopressor precoce de primeira linha com norepinefrina, controle físico imediato da fonte infecciosa (source control mandatório em piotórax e peritonites perfurativas), antibioticoterapia empírica imediata direcionada e suporte nutricional enteral precoce para prevenir lipidose hepática.',

  quickSummaryRich: {
    lead:
      'A sepse felina é a coexistência obrigatória entre infecção suspeita ou comprovada e disfunção orgânica nova decorrente de resposta desregulada do hospedeiro à infecção. Diferente de cães e seres humanos, o gato séptico frequentemente apresenta a tríade do choque frio (hipotermia, bradicardia relativa e hipotensão), demandando ressuscitação conservadora (5 a 10 mL/kg) para evitar edema pulmonar fulminante.',
    leadHighlights: [
      'resposta imuno-hemodinâmica desregulada',
      'disfunção orgânica nova',
      'tríade do choque frio',
      'hipotermia, bradicardia relativa e hipotensão',
      'ressuscitação conservadora (5 a 10 mL/kg)',
      'evitar edema pulmonar fulminante',
      'source control mandatório',
    ],
    pillars: [
      {
        title: 'Superação do Paradigma Infecção + SIRS',
        body:
          'Os consensos VECCS 2026 abandonam o SIRS como critério diagnóstico ou prognóstico em gatos. Infecção sem nova disfunção orgânica não é sepse, e muitos gatos em choque séptico não preenchem critérios clássicos de SIRS.',
        highlights: ['Consenso VECCS 2026', 'SIRS não prognóstico em gatos', 'disfunção orgânica obrigatória'],
      },
      {
        title: 'O Fenótipo Frio / Hipodinâmico',
        body:
          'A apresentação clássica da sepse felina não cursa com febre alta e taquicardia galopante, mas sim com a tríade do choque: hipotermia (< 37,8 °C), bradicardia relativa (< 140 a 160 bpm) e hipotensão com pulsos periféricos fracos.',
        highlights: ['fenótipo frio', 'tríade do choque', 'hipotermia', 'bradicardia relativa', 'pulsos fracos'],
      },
      {
        title: 'Baixa Tolerância Volêmica (AAHA 2024)',
        body:
          'Gatos possuem volemia proporcionalmente menor (60 mL/kg vs 80-90 mL/kg em cães) e vasculatura pulmonar hiper-reativa. Doses de choque tradicionais são letais; o consenso recomenda alíquotas pequenas de 5 a 10 mL/kg com reavaliação seriada.',
        highlights: ['60 mL/kg de volemia', 'alíquotas de 5 a 10 mL/kg', 'veto à sobrecarga hídrica'],
      },
      {
        title: 'Norepinefrina e Source Control Precoce',
        body:
          'Se a hipotensão ou hipoperfusão persistir após 10 a 20 mL/kg, a infusão contínua de norepinefrina (0,05 a 1,0 mcg/kg/min) deve ser iniciada sem insistir em excesso de fluidos. A drenagem torácica ou laparotomia não podem ser postergadas.',
        highlights: ['norepinefrina precoce', '0,05 a 1,0 mcg/kg/min', 'source control imediato'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Estratificação da Sepse Felina (Consenso VECCS 2026)',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Foco Infeccioso e Amostragem Prévia',
          detail:
            'Investigar ativamente os focos felinos prevalentes: espaço pleural (piotórax, foco mais comum em gatos), cavidade peritoneal (peritonite séptica por corpo estranho linear ou perfuração), feridas penetrantes necrosantes por mordeduras e bacteremia entérica por panleucopenia. Realizar toracocentese/abdominocentese guiada por POCUS imediatamente e coletar citologia e cultura antes do início do antimicrobiano parenteral, sem retardar a ressuscitação.',
          timing: 'Primeiros 15 a 30 minutos de admissão',
        },
        {
          label: 'Passo 2: Investigação Objetiva de Nova Disfunção Orgânica (Goggs et al., 2026)',
          detail:
            'Identificar falência em pelo menos um sistema: Cardiovascular (hipotensão com PAM < 60 mmHg, bradicardia relativa < 140 bpm, lactato > 2,5 mmol/L, extremidades frias), Respiratório (taquipneia, esforço expiratório/misto, hipoxemia com PaO2/FiO2 <= 300 ou SpO2 < 93% em ar ambiente, padrão POCUS B-lines), Renal (oligúria < 1 mL/kg/h por 6h, aumento de creatinina >= 0,3 mg/dL em 48h), Hepático (hiperbilirrubinemia clínica/laboratorial > 0,5 mg/dL), Neurológico (estupor, desorientação, coma, escore MGCS <= 14), Coagulação (trombocitopenia < 100.000/uL, D-dímero elevado, petéquias) ou Metabólico (hipoglicemia < 60 mg/dL, hipocalcemia ionizada grave, acidemia pH < 7,20).',
          timing: 'Admissão e monitoramento intensivo contínuo',
        },
        {
          label: 'Passo 3: Reconhecimento do Choque Séptico e Fenótipo Hemodinâmico',
          detail:
            'Definir choque séptico quando a hipotensão ou sinais de hipoperfusão tecidual (lactatemia, extremidades frias, tempo de preenchimento capilar lentificado) persistirem apesar da administração judiciosa de 10 a 20 mL/kg de cristaloides isotônicos balanceados. Confirmar a presença de vasoplegia ou depressão miocárdica antes de escalar drogas vasoativas.',
          limitations: 'O gato séptico com frequência não eleva a frequência cardíaca mesmo profundamente hipotenso.',
        },
        {
          label: 'Passo 4: Estratificação de Gravidade com Feline APPLE e Contagem de Órgãos (MODS)',
          detail:
            'Calcular os escores felinos validados APPLEfast (glicose, albumina, escore de mentação, plaquetas e lactato) e APPLEfull (Hayes et al., 2011). Mapear a quantidade de sistemas em falência: a Síndrome de Disfunção de Múltiplos Órgãos (MODS) é o fator prognóstico independente mais robusto de mortalidade na UTI felina (Troìa et al., 2019: OR 2,62 por órgão adicional acometido).',
          timing: 'Na admissão e a cada 12 a 24 horas',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Protocolo de UTI na Sepse Felina',
      steps: [
        {
          label: 'Ressuscitação Volêmica Conservadora (AAHA 2024)',
          detail:
            'Administração cautelosa de cristaloide isotônico balanceado (Ringer com Lactato ou Plasma-Lyte) em alíquotas estritas de 5 a 10 mL/kg por via intravenosa ao longo de 15 a 30 minutos (cerca de 20 a 40 mL para um gato adulto de 4 kg). Suspender imediatamente se houver taquipneia, ritmo de galope (S3/S4), estertores pulmonares ou surgimento de linhas B no POCUS torácico. Nunca ultrapassar 20 mL/kg cumulativos sem iniciar suporte vasoativo.',
          dose: '5 a 10 mL/kg em 15 a 30 minutos',
          reassess: 'Ausculta cardiopulmonar e POCUS a cada alíquota',
        },
        {
          label: 'Aquecimento Externo Ativo Gradual e Sinérgico',
          detail:
            'O aquecimento ativo (com mantas de ar forçado aquecido a 37-38 °C) é uma intervenção hemodinâmica ativa primária. A hipotermia deprime a automaticidade do nó sinoatrial e torna os receptores adrenérgicos vasculares refratários às catecolaminas. Elevar a temperatura central gradualmente (0,5 a 1,0 °C por hora) até atingir 37,5 °C restaura a resposta cardíaca e vasomotora.',
          timing: 'Imediato e contínuo durante a ressuscitação',
        },
        {
          label: 'Suporte Vasoativo de Primeira Linha com Norepinefrina',
          detail:
            'Diante de choque séptico refratário a fluidos conservadores, iniciar infusão contínua de Norepinefrina a 0,05 a 0,1 mcg/kg/min IV, titulando a cada 10 a 15 minutos até 1,0 mcg/kg/min visando PAM >= 60-65 mmHg. Se houver disfunção miocárdica documentada (cardiomiopatia séptica felina com hipocinesia ventricular), associar Dobutamina (5 a 15 mcg/kg/min). Dopamina é proscrita devido à sua farmacocinética errática e arritmogênica em felinos.',
          dose: 'Norepinefrina: 0,05 a 1,0 mcg/kg/min IV CRI; Dobutamina: 5 a 15 mcg/kg/min IV CRI',
        },
        {
          label: 'Controle Físico da Fonte Infecciosa (Source Control Mandatório)',
          detail:
            'A erradicação mecânica do foco séptico é indispensável para a sobrevida. Em piotórax, realizar toracocentese de alívio e instalar imediatamente drenos torácicos bilaterais (pequeno calibre 6-8 F ou 10-12 F) com lavagem pleural isotônica seriada. Em peritonite séptica perfurativa, realizar laparotomia exploratória de urgência tão logo a PAM atinja níveis mínimos de segurança anestésica (> 60 mmHg). Nenhum antibiótico salva o paciente com pus cavitário retido.',
          timing: 'Primeras 2 a 6 horas após início da ressuscitação',
        },
        {
          label: 'Antimicrobianoterapia Empírica Precoce de Amplo Espectro',
          detail:
            'Iniciar antibióticos bactericidas intravenosos na primeira hora de choque. A escolha empírica inicial adequada eleva a sobrevida em felinos em 4,4 vezes (Scotti et al., 2019). No piotórax felino, associar Ampicilina/Sulbactam (50 mg/kg IV q8h) com fluoroquinolona (Marbofloxacina 2-4 mg/kg IV q24h; evitar enrofloxacina em altas doses pelo risco de retinopatia/cegueira felina) ou Ceftriaxona (30-50 mg/kg IV q12h) mais Metronidazol (10-15 mg/kg IV q12h em infusão lenta de 30 min).',
          timing: 'Na 1ª hora em choque séptico',
        },
        {
          label: 'Suporte Nutricional Enteral Precoce e Analgesia Segura',
          detail:
            'Introduzir nutrição enteral em microdoses (sonda nasoesofágica ou esofagostomia) nas primeiras 12 a 24 horas pós-estabilização hemodinâmica para prevenir lipidose hepática felina fulminante e manter integridade da barreira intestinal. Fornecer analgesia com opioides puros (metadona 0,1 a 0,2 mg/kg IV q4-6h ou buprenorfina 0,01 a 0,03 mg/kg IV/bucal q6-8h). Proscrição absoluta de anti-inflamatórios não esteroidais (AINEs).',
          timing: 'Após estabilização hemodinâmica inicial',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      title: 'Tabela de Decisão Rápida: Síndromes Infecciosas e Inflamatórias no Felino (Consenso 2026)',
      headers: ['Classificação Clínica', 'Conceito Fisiopatológico', 'Critérios Felinos Essenciais', 'Conduta Imediata'],
      rows: [
        {
          col1: 'Infecção Localizada / Estável',
          col2: 'Proliferação patogênica contida em tecido ou órgão sem dano sistêmico',
          col3: 'Ex.: abscesso fechado simples ou ITU; ausência de disfunção orgânica ou hipotensão',
          col4: 'Drenagem cirúrgica e antibioticoterapia direcionada; manejo ambulatorial sem necessidade de UTI',
        },
        {
          col1: 'SIRS Felino (Inflamação Sistêmica)',
          col2: 'Alerta clínico de resposta inflamatória generalizada (infecciosa ou estéril)',
          col3: 'Alterações em temperatura (< 37,8 ou > 39,7 °C), FC (< 140 ou > 225 bpm), FR (> 40 rpm) ou leucócitos (< 5.000 ou > 19.500/uL)',
          col4: 'Alerta de triagem; não diagnostica sepse e não prediz desfecho. Investigar a causa de base com cautela',
        },
        {
          col1: 'Sepse Felina (Consenso VECCS 2026)',
          col2: 'Resposta desregulada do hospedeiro à infecção causando dano tecidual com risco à vida',
          col3: 'Infecção confirmada ou altamente provável + pelo menos uma nova disfunção orgânica comprovada',
          col4: 'Internação em UTI, ressuscitação volêmica conservadora (5-10 mL/kg), coleta microbiológica e antibiótico parenteral na 1ª hora',
        },
        {
          col1: 'Choque Séptico Felino',
          col2: 'Colapso circulatório distributivo e hipoperfusão celular persistente',
          col3: 'Hipotensão (PAM < 60 mmHg) e hiperlactatemia que persistem após reposição com 10-20 mL/kg de cristaloides balanceados',
          col4: 'Suporte vasopressor imediato com norepinefrina, aquecimento externo ativo simultâneo e source control de emergência',
        },
        {
          col1: 'MODS Felina (Disfunção de Múltiplos Órgãos)',
          col2: 'Falência simultânea ou sequencial de múltiplos sistemas orgânicos',
          col3: 'Comprometimento objetivo em 2 ou mais órgãos vitais (cardiovascular, renal, respiratório, neurológico, hepático ou hemostático)',
          col4: 'Suporte multissistêmico avançado em UTI; cada órgão adicional em falência eleva a chance de óbito em 2,62 vezes (Troìa 2019)',
        },
      ],
    },
  },

  quickDecisionStrip: [
    'Gatos sépticos não precisam parecer inflamados: o fenótipo frio/hipodinâmico é o mais frequente.',
    'SIRS não tem valor diagnóstico nem prognóstico em gatos (Troìa 2019; Consenso 2026).',
    'Nunca use doses de choque caninas: faça alíquotas conservadoras de 5 a 10 mL/kg (AAHA 2024).',
    'Aqueça ativamente o paciente: a hipotermia perpetua bradicardia e vasoplegia refratária.',
    'Source control precoce salva vidas: drene o piotórax e opere a peritonite sem protelar.',
  ],

  etiology: {
    definicaoEConceitoModerno2026Felina:
      'Em julho de 2026, os consensos veterinários internacionais publicados no Journal of Veterinary Emergency and Critical Care por Goggs et al. (JVEC 36:445-469 e JVEC 36:470-488) estabeleceram novos paradigmas para a definição, critérios clínicos, choque séptico e prognóstico da sepse em cães e gatos. O material legado do VIN (publicado no início de 2025) e as diretrizes históricas anteriores definiam sepse com base na fórmula de infecção acompanhada de Síndrome da Resposta Inflamatória Sistêmica (SIRS). Na espécie felina, contudo, essa formulação mostrou-se clinicamente falha e conceitualmente desastrosa. Diversos estudos clínicos prospectivos e retrospectivos focados na espécie felina (notadamente Troìa et al., 2019 e Klainbart et al., 2017) já haviam demonstrado que os critérios clássicos de SIRS possuem baixíssima sensibilidade e especificidade diagnóstica em felinos e, mais importante, não apresentam qualquer correlação com mortalidade em cenários críticos como peritonite séptica ou pós-operatório gastrointestinal. O consenso veterinário de 2026 redefiniu sepse como uma síndrome com risco iminente de morte decorrente de uma resposta desregulada do hospedeiro a uma infecção, caracterizada obrigatoriamente pela ocorrência de nova disfunção orgânica. Assim, infecção sem dano a órgãos vitais não deve ser classificada como sepse, e a presença de SIRS passa a atuar unicamente como sinalizador de triagem sem poder diagnóstico definitivo.',
    analogiaDidaticaApagaoFelino:
      'Para compreender a singularidade biológica do paciente felino em sepse e orientar a equipe médica e os tutores, a fisiopatologia da resposta felina pode ser comparada à metáfora do apagão elétrico programado (rolling blackout) versus o incêndio acelerado observado no cão. Enquanto o organismo do cão reage à sepse operando como um motor desgovernado em aceleração máxima (choque hiperdinâmico com taquicardia severa, febre alta, mucosas vermelho-tijolo e consumo galopante de oxigênio), o gato desenvolveu filogeneticamente uma resposta evolutiva de conservação extrema e hibernação metabólica diante de estresses letais. Frente à invasão patogênica e à lesão endotelial, o organismo do felino desliga a circulação periférica, reduz bruscamente a temperatura corporal central e desacelera ou impede a aceleração da frequência cardíaca, como uma rede de distribuição elétrica que desliga quarteirões inteiros para evitar que a subestação principal exploda. O resultado externo desse apagão é um gato imóvel, silencioso, profundamente deprimido e com corpo gelado. Para o clínico desavisado, esse animal parece calmo ou apenas dormindo; na realidade fisiopatológica, o paciente está à beira do colapso respiratório e circulatório por choque hipodinâmico profundo, privação severa de oxigênio celular e acidose láctica.',
    fenotipoHipodinamicoTriadeDoChoque:
      'A expressão clínica mais contundente e perigosa da sepse na espécie felina é o fenótipo hipodinâmico ou frio, tradicionalmente denominado na literatura de emergência e terapia intensiva como a tríade do choque felino: hipotermia (temperatura retal < 37,8 °C, frequentemente caindo abaixo de 36,0 °C), bradicardia relativa (frequência cardíaca < 140 a 160 bpm, inaceitavelmente baixa para um paciente hipotenso em choque que deveria estar reflexamente taquicárdico) e hipotensão arterial sistêmica (pressão arterial sistólica < 90 mmHg ou pressão arterial média < 60 mmHg) associada a pulsos femorais extremamente filiformes ou impalpáveis. Ao contrário de cães e seres humanos, que exibem uma fase hiperdinâmica inicial prolongada (com vasodilatação periférica, mucosas congestas e tempo de preenchimento capilar ultrarrápido), gatos sépticos raramente manifestam esse padrão; a grande maioria dos felinos é apresentada à UTI já na fase hipodinâmica fria, com mucosas pálidas, acinzentadas ou azuladas, extremidades frias ao toque e tempo de preenchimento capilar lentificado (> 2 a 3 segundos) ou ausente por vasoconstrição periférica extrema.',
    tabelaComparativaCaesVsGatosSepse: {
      title: 'Tabela 1 — Particularidades de Espécie: Sepse Canina versus Sepse Felina (Consenso 2026)',
      headers: ['Variável Clínica / Fisiológica', 'Sepse Canina (Cão)', 'Sepse Felina (Gato)', 'Implicação Prática na UTI'],
      rows: [
        {
          col1: 'Fenótipo Hemodinâmico Típico',
          col2: 'Fase hiperdinâmica frequente (febre, taquicardia acentuada, mucosas congestas em tijolo)',
          col3: 'Fenótipo hipodinâmico frio predominante (tríade do choque: hipotermia, bradicardia relativa, hipotensão)',
          col4: 'Nunca esperar taquicardia ou febre para suspeitar de sepse grave no paciente felino',
        },
        {
          col1: 'Frequência Cardíaca na Admissão',
          col2: 'Taquicardia compensatória intensa (> 140 a 180 bpm)',
          col3: 'Bradicardia absoluta (< 140 bpm) ou relativa (140-160 bpm; ausência de resposta reflexa)',
          col4: 'Bradicardia em gato hipotenso não é estabilidade; indica depressão miocárdica e hipotermia grave',
        },
        {
          col1: 'Volemia e Tolerância a Fluidos',
          col2: 'Volume sanguíneo de 80 a 90 mL/kg; suporta alíquotas de 15 a 20 mL/kg',
          col3: 'Volume sanguíneo restrito a 60 mL/kg; altíssimo risco de edema pulmonar e efusão pleural com fluidos',
          col4: 'Alíquotas conservadoras de 5 a 10 mL/kg em 15-30 min; veto a bólus agressivos (AAHA 2024)',
        },
        {
          col1: 'Focos Infecciosos Mais Prevalentes',
          col2: 'Cavidade peritoneal (peritonite, piometra), trato respiratório inferior, urinário e bacteremias',
          col3: 'Espaço pleural (Piotórax é o foco isolado mais frequente), cavidade peritoneal e feridas por mordeduras',
          col4: 'POCUS torácico e toracocentese diagnóstica são passos obrigatórios na triagem de emergência felina',
        },
        {
          col1: 'Valor Prognóstico do Lactato',
          col2: 'Excelente preditor de gravidade e mortalidade; falha de clearance do lactato prediz óbito',
          col3: 'Identifica hipoperfusão, mas lactato inicial isolado NÃO se correlaciona com sobrevida no Consenso 2026',
          col4: 'Utilizar lactato para guiar a restauração tecidual dinâmica, mas não para prognósticos definitivos',
        },
        {
          col1: 'Cálcio Ionizado (iCa)',
          col2: 'Hipocalcemia comum, moderadamente correlacionada à gravidade clínica',
          col3: 'Hipocalcemia ionizada quase universal (89% a 93% dos gatos sépticos), sem correlação prognóstica direta',
          col4: 'Corrigir apenas se sintomática (tetania, arritmias refratárias) com gluconato de cálcio lento',
        },
        {
          col1: 'Coagulopatia e Testes de Hemostasia',
          col2: 'aPTT e PT prolongados com trombocitopenia indicam coagulopatia de consumo / CID séptica',
          col3: 'Deficiência congênita de Fator XII (Hageman) muito comum; aPTT prolongado isolado sem sangramento é benigno',
          col4: 'Não diagnosticar CID no gato baseado unicamente em aPTT isoladamente prolongado sem clínica hemorrágica',
        },
        {
          col1: 'Escores de Gravidade Validados',
          col2: 'APPLEfast canino (glicose, albumina, estado mental, plaquetas e lactato) e escore de MODS',
          col3: 'APPLEfast felino e contagem de órgãos em falência (MODS; OR 2,62 por órgão adicional segundo Troìa 2019)',
          col4: 'A contagem de órgãos disfuncionais é o fator prognóstico mais robusto em gatos com sepse',
        },
      ],
    },
  },

  epidemiology: {
    focosInfecciososMicrobiologiaFelina:
      'A epidemiologia e os sítios anatômicos primários de infecção na sepse felina diferem substancialmente daqueles documentados em cães. Na espécie felina, o espaço pleural lidera as casuísticas de sepse grave e choque séptico em centros de terapia intensiva: o piotórax felino representa a principal causa de empiema cavitário e colapso respiratório-circulatório distributivo. O piotórax em gatos decorre primariamente de feridas penetrantes na parede torácica secundárias a brigas territoriais por mordeduras, com inoculação profunda da microbiota oral carnívora rica em bactérias anaeróbias obrigatórias (Bacteroides spp., Peptostreptococcus spp., Fusobacterium spp., Clostridium spp.) combinadas com microrganismos facultativos patogênicos como Pasteurella multocida, Actinomyces spp. e Nocardia spp. O segundo foco mais relevante é a cavidade abdominal (peritonite séptica), decorrente comumente de corpos estranhos gastrointestinais lineares com perfuração em múltiplos pontos do intestino delgado, perfurações de úlceras duodenais, deiscências pós-operatórias enterotomia/enterectomia, peritonite biliar infectada e rupturas do trato urinário com infecção bacteriana prévia. O perfil microbiológico da peritonite séptica felina envolve bacilos Gram-negativos entéricos (Escherichia coli, Klebsiella pneumoniae, Enterobacter spp.) associados a anaeróbios e Enterococcus spp. Outros focos de grande destaque em felinos compreendem feridas profundas contaminadas por mordeduras (abscessos subcutâneos extensos e fasceíte necrosante), pielonefrite séptica obstrutiva secundária a urólitos de ureter e translocação bacteriana maciça decorrente de quebra catastrófica de barreira mucosa em gatos jovens com infecção pelo vírus da panleucopenia felina.',
    tabelaFocosMicrobiologiaFelina: {
      title: 'Tabela 2 — Principais Focos Sépticos Felinos, Perfil Microbiano e Evidências Contemporâneas',
      headers: ['Foco Anatômico Primário', 'Prevalência em Felinos', 'Principais Microrganismos Isolados', 'Achados da Literatura / Coortes Felinas'],
      rows: [
        {
          col1: 'Espaço Pleural (Piotórax Felino)',
          col2: 'Foco mais prevalente de sepse e choque séptico em gatos (28% a 42% das internações em UTI séptica)',
          col3: 'Polimicrobiano em > 70% dos casos: Pasteurella multocida, anaeróbios estritos (Bacteroides, Peptostreptococcus, Fusobacterium) e Actinomyces',
          col4: 'Mortalidade atinge 25-35%; drenagem torácica bilateral imediata e lavagem isotônica salvam vidas (Sim et al., 2021; Medardo et al., 2024)',
        },
        {
          col1: 'Cavidade Peritoneal (Peritonite Séptica)',
          col2: 'Segundo foco mais prevalente (25% a 35% dos casos); máxima gravidade e rápida evolução para MODS',
          col3: 'Gram-negativos entéricos (Escherichia coli, Klebsiella spp.), anaeróbios entéricos (Bacteroides fragilis) e Enterococcus spp.',
          col4: 'Klainbart et al. (2017) e Scotti et al. (2019): antibioticoterapia empírica adequada de início aumenta a chance de sobrevida em 4,4 vezes',
        },
        {
          col1: 'Feridas Cutâneas e Tecidos Moles',
          col2: '15% a 20% dos casos; decorrente de mordeduras infectadas com inoculação bacteriana sob pressão',
          col3: 'Pasteurella multocida, Staphylococcus pseudintermedius, Streptococcus canis e anaeróbios orais carnívoros',
          col4: 'Evolução insidiosa com necrose fascial extensa mascarada sob pelagem espessa; exige desbridamento cirúrgico agressivo',
        },
        {
          col1: 'Trato Gastrointestinal (Panleucopenia)',
          col2: '10% a 15% dos casos, com pico em gatos jovens não vacinados ou imunossuprimidos (FeLV/FIV)',
          col3: 'Translocação bacteriana entérica massiva (E. coli, Salmonella spp., Clostridium perfringens) combinada à neutropenia severa',
          col4: 'Leucopenia fulminante (< 1.000 leucócitos/uL) priva o organismo de defesas celulares primárias; bacteremia fulminante',
        },
        {
          col1: 'Trato Urinário Superior (Pielonefrite)',
          col2: '5% a 10% dos casos; frequentemente associada a ureterolitíase obstrutiva por oxalato de cálcio',
          col3: 'Escherichia coli uropatogênica (UPEC), Enterococcus faecalis, Proteus mirabilis e Pseudomonas aeruginosa',
          col4: 'Uropatia obstrutiva infectada (piohidronefrose) exige intervenção descompressiva de urgência (SUB ou stent ureteral)',
        },
      ],
    },
  },

  pathogenesisTransmission: {
    transmissaoInfecciosaInexistente:
      'A sepse felina não é uma afecção de transmissão horizontal direta entre animais, mas sim uma síndrome desencadeada pela resposta inflamatória desregulada do hospedeiro a uma infecção primária. O foco bacteriano inicial mais frequente (piotórax) decorre habitualmente da inoculação por mordeduras durante brigas territoriais com outros carnívoros, enquanto peritonites sépticas resultam de perfurações viscerais e corpos estranhos.',
    patogeneseDisfuncaoEndotelialMicrovascular:
      'A patogênese central da sepse na espécie felina envolve o desnudamento do glicocálix endotelial pela clivagem por heparinases e proteases, vasoplegia generalizada induzida pela superprodução de óxido nítrico e tromboinflamação microvascular deflagrada por armadilhas extracelulares de neutrófilos (NETs), levando à hipoperfusão tecidual severa e falência de múltiplos órgãos.',
  },

  pathophysiology: {
    fisiopatologiaCardiovascularFelina:
      'A fisiopatologia da sepse em felinos apresenta particularidades estruturais e biofísicas cruciais que a diferenciam de outras espécies. O choque séptico felino é primariamente distributivo, desencadeado pela ativação massiva de receptores de reconhecimento de padrões (PRRs, como Toll-like receptors) em macrófagos e células endoteliais por padrões moleculares associados a patógenos (PAMPs, como lipopolissacarídeo [LPS] bacteriano e peptidoglicanos) e a dano tecidual (DAMPs, como HMGB1 e DNA mitocondrial). Essa ativação dispara uma liberação maciça de citocinas inflamatórias (TNF-alfa, IL-1beta, IL-6), com indução descontrolada da sintase de óxido nítrico induzível (iNOS) nas paredes dos vasos. O excesso de óxido nítrico e a abertura persistente de canais de potássio ATP-dependentes hiperpolarizam as células musculares lisas vasculares, culminando em vasoplegia generalizada e refratariedade à angiotensina II e às catecolaminas endógenas. Concomitantemente, proteases neutrofílicas e heparinases clivam a camada protetora do glicocálix endotelial (shedding glicocalicial). Como os vasos pulmonares felinos possuem uma rede capilar extraordinariamente reativa e de permeabilidade amplificada, o desnudamento do glicocálix faz com que a infusão de fluidos intravenosos escape quase instantaneamente para o interstício e alvéolos pulmonares, provocando edema pulmonar não cardiogênico fulminante e efusão pleural mesmo com pressões hidrostáticas normais ou baixas. O miocárdio felino também sofre depressão intrínseca direta mediada por citocinas e desacoplamento do retículo sarcoplasmático, resultando em diminuição da fração de ejeção ventricular e dilatação funcional transitória (cardiomiopatia induzida por sepse).',
    triadeLetalHipotermiaBradicardiaHipotensao:
      'O mecanismo biofísico da tríade clássica do choque felino fundamenta-se em uma cascata circular autoperpetuante de falência circulatória e metabólica. A diminuição da perfusão microvascular sistêmica e a vasoplegia distributiva reduzem o aporte de oxigênio e glicose aos tecidos, privando as mitocôndrias de substrato para a fosforilação oxidativa. Incapaz de sustentar a termogênese shivering e não-shivering devido ao esgotamento energético, o felino rapidamente entra em hipotermia progressiva (< 37,5 °C). A hipotermia tecidual atua diretamente sobre o sistema de condução cardíaco: nos miócitos do nó sinoatrial, o frio diminui a taxa de despolarização espontânea da fase 4 e inibe as correntes iônicas do marcapasso sinusal, produzindo bradicardia sinusal intrínseca. Simultaneamente, a hipotermia reduz drasticamente a afinidade e a densidade de receptores beta-1 adrenérgicos funcionais no sarcolema cardíaco, bloqueando a taquicardia reflexa mediada pelos barorreceptores arteriais. Como o volume sistólico do gato é anatomicamente pequeno e limitado por ventrículos compactos (volume sistólico de repouso cerca de 0,6 a 0,8 mL/kg), o débito cardíaco felino é estritamente dependente da frequência cardíaca (Débito Cardíaco = Volume Sistólico x Frequência Cardíaca). A desaceleração da frequência cardíaca para níveis bradicárdicos (< 140 bpm) provoca uma queda catastrófica no débito cardíaco, o que reduz ainda mais a perfusão arterial sistêmica e aprofunda a hipotermia. Esse ciclo vicioso só pode ser interrompido com aquecimento externo ativo simultâneo ao suporte volêmico conservador e vasopressor.',
    figuraGlicocalixEdemaFelino:
      'A Figura 1 detalha o mecanismo ultraestrutural do extravasamento capilar na espécie felina: a degradação enzimática do glicocálix endotelial e a abertura das junções intercelulares permitem a saída massiva de água e albumina para o interstício pulmonar. Essa fisiopatologia elucida o paradoxo do felino séptico: um paciente com circulação intravascular colapsada e hipovolêmica concomitante a pulmões encharcados de líquido intersticial.',
    figuraImunotromboseNetoseFelina:
      'A Figura 2 ilustra a tromboinflamação microvascular na sepse felina: a liberação desenfreada de armadilhas extracelulares de neutrófilos (NETs) e a exposição de fator tecidual em microvasos provocam a formação disseminada de microtrombos capilares. Essa oclusão capilar disseminada restringe a entrega celular de oxigênio, perpetuando a isquemia e a falência de múltiplos órgãos (MODS).',
  },

  clinicalSignsPathophysiology: {
    criteriosDisfuncaoOrganicaFelinaSistemas:
      'Os consensos internacionais VECCS 2026 estabeleceram critérios objetivos para identificação de disfunção orgânica nova provocada por sepse na espécie felina, organizados por sistemas fisiológicos vitais: 1. Sistema Cardiovascular: caracterizado por hipotensão arterial sistêmica persistente (PAM < 60 mmHg ou PAS < 90 mmHg), bradicardia relativa (< 140 bpm na presença de choque) ou taquicardia inapropriada (> 225 bpm), tempo de preenchimento capilar lentificado (> 2 segundos), extremidades marcadamente frias, hiperlactatemia (> 2,5 mmol/L) ou saturação venosa central de oxigênio (ScvO2 < 70%); 2. Sistema Respiratório: manifestado por taquipneia (> 40 a 50 rpm), respiração com boca aberta ou esforço respiratório misto, hipoxemia arterial grave documentada por hemogasometria (PaO2/FiO2 <= 300) ou oximetria de pulso (SpO2 < 93% respirando ar ambiente), ou detecção ultrassonográfica (POCUS torácico) de espessamento pleural e proliferação de linhas B difusas compatíveis com síndrome do desconforto respiratório agudo veterinário (ARDSVet); 3. Sistema Renal: definido por lesão renal aguda (AKI) séptica com oligúria confirmada (< 1,0 mL/kg/h ao longo de 6 horas consecutivas de cateterismo fechado) e/ou elevação aguda da creatinina sérica >= 0,3 mg/dL em 48 horas em relação aos níveis basais; 4. Sistema Neurológico: manifestado por depressão sensorial profunda, desorientação, estupor ou coma, correspondendo a uma pontuação <= 14 na Escala de Coma de Glasgow Modificada (MGCS); 5. Sistema Hepático: disfunção evidenciada por hiperbilirrubinemia total clínica ou laboratorial (> 0,5 mg/dL ou > 8,5 umol/L) e/ou elevação superior a 3 vezes nos limites superiores normais de enzimas hepatocelulares (ALT) sem causa hepatobiliar prévia explicável; 6. Sistema Hemostático: manifestado por trombocitopenia de consumo (< 100.000 plaquetas/uL), elevação significativa de D-dímero e prolongamento > 25% nos tempos de coagulação (PT e aPTT) associado a manifestações hemorrágicas clínicas; 7. Sistema Metabólico: caracterizado por hipoglicemia grave (< 60 mg/dL), hipocalcemia ionizada pronunciada e acidemia metabólica severa (pH sanguíneo < 7,20 com déficit de base > -6 mEq/L).',
    tabelaCriteriosDisfuncaoFelina: {
      title: 'Tabela 3 — Matriz de Disfunção Orgânica Felina por Sistemas e Biomarcadores (VECCS 2026)',
      headers: ['Sistema Orgânico', 'Critérios Clínicos e Mensurações', 'Biomarcadores de Laboratório', 'Peculiaridades Felinas'],
      rows: [
        {
          col1: 'Cardiovascular',
          col2: 'PAM < 60 mmHg; pulsos femorais filiformes; FC < 140 bpm (bradicardia relativa); extremidades geladas',
          col3: 'Lactato sérico > 2,5 mmol/L; troponina I cardíaca (cTnI) elevada na cardiomiopatia séptica',
          col4: 'Bradicardia e hipotermia formam a tríade do choque; taquicardia nem sempre ocorre',
        },
        {
          col1: 'Respiratório',
          col2: 'FR > 40-50 rpm; respiração com boca aberta; esforço restritivo (piotórax) ou misto (ARDSVet)',
          col3: 'PaO2/FiO2 <= 300; SpO2 < 93% em ar ambiente; POCUS torácico demonstrando efusão ou linhas B',
          col4: 'Piotórax é o foco mais prevalente; o pulmão felino é o órgão de choque preferencial para edema',
        },
        {
          col1: 'Renal',
          col2: 'Débito urinário < 1,0 mL/kg/h por 6 horas consecutivas após restauração volêmica',
          col3: 'Aumento na creatinina sérica >= 0,3 mg/dL em 48h (estadiamento IRIS AKI)',
          col4: 'Diferenciar oligúria pré-renal por hipovolemia da necrose tubular aguda séptica confirmada',
        },
        {
          col1: 'Neurológico (SNC)',
          col2: 'Depressão mental profunda, apatia não reativa, estupor, coma; escore MGCS <= 14',
          col3: 'Alterações secundárias à encefalopatia séptica, hipoperfusão cerebral e hipoglicemia',
          col4: 'Gatos sépticos frequentemente parecem estar apenas dormindo ou quietos, mascarando estupor',
        },
        {
          col1: 'Hepático',
          col2: 'Mucosas ictéricas; hepatomegalia à palpação ou ultrassonografia abdominal',
          col3: 'Bilirrubina total > 0,5 mg/dL; elevação de ALT > 3x o valor de referência sem colangite prévia',
          col4: 'Risco altíssimo de lipidose hepática secundária rápida se mantido em jejum na UTI',
        },
        {
          col1: 'Hemostático',
          col2: 'Petéquias, equimoses, sangramento em locais de punção vascular ou hematomas espontâneos',
          col3: 'Plaquetas < 100.000/uL; D-dímero elevado; prolongamento de PT/aPTT > 25% com clínica',
          col4: 'Deficiência congênita de Fator XII causa aPTT muito prolongado in vitro sem coagulopatia clínica',
        },
        {
          col1: 'Metabólico',
          col2: 'Fraqueza muscular generalizada, hipotermia profunda, tremores e fasciculações',
          col3: 'Glicemia < 60 mg/dL (consumo periférico aumentado); hipocalcemia ionizada grave; pH < 7,20',
          col4: 'Hipoglicemia na sepse felina indica consumo metabólico maciço e falência de gliconeogênese hepática',
        },
      ],
    },
  },

  diagnosis: {
    abordagemDiagnosticaPocusBiomarcadores:
      'A abordagem diagnóstica da sepse no paciente felino na emergência fundamenta-se na busca ativa e ultrarrápida do foco infeccioso associada à quantificação de disfunções orgânicas através de testes point-of-care (POCUS) e biomarcadores laboratoriais. O primeiro exame de imagem de leito obrigatório é a avaliação ultrassonográfica focada torácica e abdominal (TFAST e AFAST). A detecção de efusão no espaço pleural (aneico com floculações ou debris celulares) em um gato com desconforto respiratório exige toracocentese diagnóstica e de alívio imediato antes de qualquer radiografia estressante. A análise citológica imediata do líquido pleural ou peritoneal corada por panótico rápido ou Giemsa confirma o diagnóstico de sepse quando revela neutrófilos degenerados exibindo cariólise e fagocitose de microrganismos intracelulares (bastonetes Gram-negativos ou cocos Gram-positivos). Em efusões peritoneais, a quantificação de gradientes bioquímicos comparativos entre o líquido e o sangue é altamente acurada: uma glicose do líquido peritoneal > 20 mg/dL menor que a glicose sérica e/ou um lactato do líquido peritoneal > 2,0 mmol/L maior que o lactato sérico confirmam peritonite séptica com sensibilidade e especificidade próximas a 100%. No sangue periférico, o leucograma frequentemente exibe neutropenia acentuada com desvio nuclear à esquerda degenerativo e marcadas alterações tóxicas (corpúsculos de Döhle, vacuolização citoplasmática e basofilia difusa). Biomarcadores metabólicos e perfusionais (lactato sérico e cálcio ionizado) devem ser mensurados rotineiramente: embora o Consenso VECCS 2026 destaque que nem o lactato nem o cálcio ionizado isolados possuem valor preditor robusto de mortalidade em gatos (diferente do cão), a hiperlactatemia serve como guia hemodinâmico de restauração de perfusão.',
    peculiaridadesFatorXIIHemostasia:
      'Uma particularidade hematológica fundamental na espécie felina que todo médico-veterinário intensivista deve dominar é a deficiência congênita do Fator XII da coagulação (fator de Hageman). Essa anomalia hereditária é extremamente prevalente na população felina em geral, acometendo até metade dos gatos saudáveis sem qualquer predileção por raça. O Fator XII participa da via intrínseca in vitro; portanto, sua deficiência gera um prolongamento extremo e dramático no Tempo de Tromboplastina Parcial Ativada (aPTT), frequentemente ultrapassando 100 a 150 segundos. Contudo, em condições in vivo fisiológicas, a hemostasia primária e a via extrínseca são perfeitamente competentes e o felino com deficiência de Fator XII NÃO apresenta qualquer tendência hemorrágica ou sangramento espontâneo. Um erro médico catastrófico na UTI felina consiste em receber um laudo de aPTT muito prolongado em um gato séptico que não apresenta sangramentos e diagnosticar erroneamente uma coagulação intravascular disseminada (CID) avançada, suspendendo procedimentos cirúrgicos de urgência que poderiam salvar a vida do animal (como a drenagem do piotórax ou a laparotomia exploratória). O diagnóstico de coagulopatia séptica verdadeira no felino requer obrigatoriamente a presença de manifestações hemorrágicas clínicas ativas (petéquias, sufusões, sangramento em punções), trombocitopenia de consumo acentuada (< 100.000 plaquetas/uL), elevação comprovada de D-dímero sérico e alteração concorrente no tempo de protrombina (PT).',
    figuraCitologiaPiotoraxFelino:
      'A Figura 3 documenta a citologia de líquido pleural de felino séptico (Sim et al., 2021, CC BY-SA 4.0): esfregaço rico em neutrófilos degenerados com cariólise acentuada e bactérias intracelulares fagocitadas, confirmando piotórax por bacilos e cocos orais após inoculação por mordedura.',
    figuraRadiografiaPiotoraxFelino:
      'A Figura 4 apresenta o estudo radiográfico torácico de paciente felino com sepse secundária a piotórax (Sim et al., 2021, CC BY-SA 4.0): efusão pleural bilateral volumosa com apagamento da silhueta cardíaca e diafragmática, colapso lobar pulmonar compressivo e lobos pulmonares flutuantes.',
    tabelaMatrizDiagnosticaFelina: {
      title: 'Tabela 4 — Matriz Diagnóstica para Sepse Felina: Achados, Testes Rápidos e Armadilhas',
      headers: ['Modalidade Diagnóstica', 'Achados Típicos no Gato Séptico', 'Utilidade Clínica Primária', 'Armadilha ou Limitação Crítica'],
      rows: [
        {
          col1: 'POCUS Torácico (TFAST)',
          col2: 'Líquido anecoico/ecogênico em espaço pleural; ausência de deslizamento pleural; linhas B',
          col3: 'Identificação imediata de piotórax antes de manipulações radiográficas estressantes',
          col4: 'Não estressar o gato dispneico com contenção forçada; realizar punção guiada de alívio',
        },
        {
          col1: 'POCUS Abdominal (AFAST)',
          col2: 'Bolsas de líquido peritoneal livre interalças ou na bolsa hepatorrenal; íleo paralítico',
          col3: 'Guia para abdominocentese imediata e diagnóstico precoce de peritonite séptica',
          col4: 'Pequenos volumes de efusão podem passar despercebidos sem varredura completa dos 4 quadrantes',
        },
        {
          col1: 'Citologia da Efusão (Panótico / Giemsa)',
          col2: 'Neutrófilos degenerados vacuolizados com cromatina frouxa; bactérias fagocitadas',
          col3: 'Confirmação definitiva e imediata de foco séptico cavitário à beira do leito',
          col4: 'A ausência de bactérias na citologia não descarta sepse se houver neutrófilos degenerados maciços',
        },
        {
          col1: 'Gradiente de Glicose e Lactato',
          col2: 'Glicose do líquido > 20 mg/dL menor que o sangue; lactato do líquido > 2,0 mmol/L maior',
          col3: 'Diferenciação precisa entre efusões estéreis e sépticas na cavidade peritoneal',
          col4: 'Em efusões pleurais, o gradiente de glicose é confiável, mas o de lactato pode sofrer variações',
        },
        {
          col1: 'Hemograma e Morfologia Leucocitária',
          col2: 'Neutropenia com desvio degenerativo; alterações tóxicas (corpúsculos de Döhle, basofilia)',
          col3: 'Marcador biológico de resposta inflamatória fulminante e toxicidade medular',
          col4: 'Leucopenia grave pode refletir panleucopenia felina primária com sepse bacteriana secundária',
        },
        {
          col1: 'Lactato Sérico e Cálcio Ionizado',
          col2: 'Hiperlactatemia (> 2,5 mmol/L); hipocalcemia ionizada pronunciada (< 1,0 mmol/L)',
          col3: 'Monitoramento dinâmico de perfusão celular tecidual durante a terapia de ressuscitação',
          col4: 'Consenso 2026: ao contrário do cão, o lactato inicial isolado não prediz óbito em gatos',
        },
        {
          col1: 'Coagulograma (PT, aPTT, D-dímero)',
          col2: 'aPTT e PT prolongados > 25%; trombocitopenia de consumo; D-dímero elevado',
          col3: 'Detecção de coagulopatia intravascular disseminada (CID) associada à sepse',
          col4: 'Deficiência congênita de Fator XII felino prolonga aPTT sem causar sangramento; não confundir com CID',
        },
      ],
    },
  },

  treatment: {
    fluidoterapiaConservadoraAaha2024:
      'A fluidoterapia de ressuscitação na sepse felina representa um dos maiores desafios de terapia intensiva veterinária devido à extrema vulnerabilidade da espécie à sobrecarga volumétrica. O volume sanguíneo circulante fisiológico do felino é de aproximadamente 60 mL/kg (comparado a 80-90 mL/kg no cão). Além disso, a vasculatura pulmonar felina exibe reatividade endotelial intensa, e a degradação do glicocálix induzida por sepse transforma os capilares pulmonares em membranas fenestradas altamente permeáveis. Em decorrência dessas particularidades, as Diretrizes de Fluidoterapia da AAHA 2024 e os Consensos VECCS 2026 condenam categoricamente o uso das antigas doses de choque caninas (50 a 90 mL/kg) em felinos. A administração de bólus hídricos agressivos em gatos sépticos provoca edema pulmonar não cardiogênico fulminante, efusão pleural e falência respiratória catastrófica em questão de minutos. A conduta racional contemporânea estabelece o uso de alíquotas conservadoras de cristaloides isotônicos balanceados (Ringer com Lactato ou Plasma-Lyte 148) de 5 a 10 mL/kg (aproximadamente 20 a 40 mL para um gato de 4 kg) infundidas por via intravenosa ao longo de 15 a 30 minutos sob monitoramento beira-leito contínuo. Ao final de cada alíquota, o paciente deve ser rigorosamente reavaliado quanto a parâmetros perfusionais (pressão arterial média, frequência cardíaca, coloração de mucosas, pulsos, lactato) e sinais precoces de sobrecarga hídrica (aumento da frequência respiratória, esforço respiratório, ausculta de ritmo de galope S3/S4 ou surgimento de linhas B coalescentes no POCUS torácico). Se a hipotensão persistir após um volume cumulativo de 10 a 20 mL/kg, a infusão de fluidos deve ser interrompida imediatamente e iniciada a terapia vasopressora.',
    aquecimentoAtivoGradualHemodinamica:
      'O aquecimento externo ativo gradual do paciente felino séptico hipotérmico não é uma mera medida de conforto de enfermagem, mas sim uma intervenção hemodinâmica ativa primária e indispensável. A hipotermia (< 37,5 °C) promove disfunção enzimática profunda, agrava a coagulopatia consumptiva e desregula os canais iônicos do miocárdio, induzindo bradicardia sinusal intrínseca e tornando as células musculares lisas vasculares refratárias ao estímulo de receptores adrenérgicos. Administrar vasopressores exógenos ou tentar ressuscitar com fluidos um gato com temperatura central de 34 ou 35 °C é ineficaz e altamente arritmogênico. O protocolo consensual preconiza o uso de dispositivos de aquecimento seguro por convecção de ar forçado (mantas de ar aquecido reguladas a 37-38 °C) ou colchões térmicos circulantes de água morna, com elevação gradual da temperatura corporal a uma taxa de 0,5 a 1,0 °C por hora até atingir a faixa normotérmica baixa (37,5 a 38,0 °C). Deve-se evitar aquecimento ultrarrápido ou fontes térmicas secas diretas não controladas (que causam queimaduras iatrogênicas graves e vasodilatação periférica súbita, exacerbando o choque distributivo). À medida que a temperatura central atinge 37,0 - 37,5 °C, o nó sinoatrial recupera sua automaticidade normal, a frequência cardíaca se eleva fisiologicamente e a responsividade vascular às catecolaminas é restaurada.',
    vasopressoresNorepinefrinaDobutamina:
      'Quando o paciente felino em sepse desenvolve choque séptico — definido pela persistência de hipotensão arterial (PAM < 60 mmHg) ou hipoperfusão celular tecidual apesar da administração criteriosa de 10 a 20 mL/kg de cristaloides balanceados —, o suporte vasoativo parenteral em infusão contínua (CRI) deve ser iniciado prontamente. A droga vasopressora de primeira escolha estabelecida pelos Consensos VECCS 2026 é a Norepinefrina. A norepinefrina atua predominantemente como um potente agonista alfa-1 adrenérgico (restaurando o tônus vascular sistêmico e corrigindo a vasoplegia distributiva sem aumentar excessivamente a resistência vascular pulmonar), associada a uma atividade beta-1 adrenérgica moderada que apoia o inotropismo miocárdico e a frequência cardíaca. A infusão deve ser iniciada na dose de 0,05 a 0,1 mcg/kg/min IV, sendo titulada a cada 10 a 15 minutos até a meta hemodinâmica de PAM entre 60 e 65 mmHg (faixa posológica usual: 0,05 a 1,0 mcg/kg/min). A dopamina encontra-se em formal desuso na terapia intensiva felina atual devido à sua farmacocinética imprevisível, alto risco de taquiarritmias ventriculares graves e resposta vasomotora errática em gatos. Em casos de choque vasodilatador hiper-refratário com doses elevadas de norepinefrina, pode-se associar Vasopressina em dose fixa (0,5 a 5 mU/kg/min IV CRI) para restaurar a sensibilidade vascular via receptores V1. Se o ecocardiograma à beira do leito evidenciar contratilidade ventricular diminuída (fração de encurtamento < 25-30%) caracterizando cardiomiopatia induzida por sepse, o inotrópico de escolha é a Dobutamina (5 a 15 mcg/kg/min IV CRI), que eleva o débito cardíaco sem elevar a pós-carga.',
    tabelaDrogasVasoativasFelinas: {
      title: 'Tabela 5 — Farmacologia Intensiva de Suporte Cardiovascular e Vasoativo em Felinos',
      headers: ['Fármaco Vasoativo', 'Mecanismo de Ação Receptor', 'Dose e Via em Felinos', 'Indicação e Alvo Clínico', 'Particularidades e Riscos no Gato'],
      rows: [
        {
          col1: 'Norepinefrina (Bitartarato)',
          col2: 'Agonista Alfa-1 potente com atividade Beta-1 moderada',
          col3: '0,05 a 1,0 mcg/kg/min IV CRI (iniciar em 0,1 mcg/kg/min e titular a cada 10-15 min)',
          col4: 'Vasopressor de 1ª linha absoluto no choque séptico felino; meta de PAM >= 60 mmHg',
          col5: 'Administrar preferencialmente por acesso venoso central ou cateter venoso periférico calibroso; risco de necrose por extravasamento',
        },
        {
          col1: 'Dobutamina (Cloridrato)',
          col2: 'Agonista Beta-1 predominante com leve ação Beta-2 e Alfa-1',
          col3: '5 a 15 mcg/kg/min IV CRI (iniciar em 5 mcg/kg/min)',
          col4: 'Inotrópico de escolha na disfunção miocárdica séptica com fração de ejeção reduzida',
          col5: 'Gatos são muito sensíveis a taquiarritmias e convulsões neurotóxicas em doses > 15-20 mcg/kg/min; monitorar ECG contínuo',
        },
        {
          col1: 'Vasopressina (Arginina)',
          col2: 'Agonista de receptores V1 na musculatura lisa vascular e receptores V2 renais',
          col3: '0,5 a 5 mU/kg/min (0,0005 a 0,005 UI/kg/min) IV CRI em dose fixa não titulada',
          col4: 'Vasopressor adjuvante na vasoplegia refratária a doses crescentes de norepinefrina',
          col5: 'Potente vasoconstrição coronariana e esplâncnica; contraindicada como monoterapia sem restauração de volume',
        },
        {
          col1: 'Epinefrina (Adrenalina)',
          col2: 'Agonista Beta-1, Beta-2 e Alfa-1 potente e não seletivo',
          col3: '0,05 a 0,5 mcg/kg/min IV CRI (titulado)',
          col4: 'Droga de resgate de 2ª linha em choque séptico refratário ou PCR iminente',
          col5: 'Induz acentuada hiperlactatemia tipo B (glicólise aeróbia), taquiarritmias graves e vasoconstrição esplâncnica intensa',
        },
        {
          col1: 'Dopamina (Cloridrato)',
          col2: 'Dopaminérgico em baixas doses; Beta-1 em médias; Alfa-1 em altas doses',
          col3: '2 a 15 mcg/kg/min IV CRI (historicamente usada)',
          col4: 'Em formal desuso em felinos; amplamente superada pela norepinefrina',
          col5: 'Resposta clínica e depuração farmacocinética altamente erráticas em gatos; alta taxa de arritmias ventriculares',
        },
      ],
    },
    antimicrobianoterapiaEmpiricaSourceControl:
      'O manejo etiológico da sepse felina exige a integração simultânea de dois pilares invioláveis: antibioticoterapia parenteral empírica precoce e controle mecânico imediato da fonte infecciosa (source control). O estudo multicêntrico de Scotti et al. (2019) comprovou que a instituição de um regime antimicrobiano empírico adequado nas fases iniciais da sepse em pequenos animais esteve associada a uma chance 4,4 vezes maior de sobrevida hospitalar (odds ratio 4,4). A terapia deve ser bactericida, administrada por via intravenosa na primeira hora em pacientes com choque séptico, após a coleta expedita de amostras microbiológicas. No foco torácico (piotórax felino), o regime empírico deve cobrir anaeróbios estritos orais e Pasteurella multocida: a combinação de primeira linha consensual é Ampicilina/Sulbactam (50 mg/kg IV q8h) associada a uma fluoroquinolona (Marbofloxacina 2 a 4 mg/kg IV q24h) ou Ceftriaxona (30 a 50 mg/kg IV q12h) associada a Metronidazol (10 a 15 mg/kg IV q12h infundido lentamente em 30 minutos). ALERTA FARMACOLÓGICO FATAL EM FELINOS: a Enrofloxacina não deve ser empregada em gatos em doses elevadas (> 5 mg/kg/dia) devido ao risco gravíssimo de degeneração retiniana aguda e cegueira permanente e irreversível mediada pelo transportador ABCG2; preferir sempre marbofloxacina ou pradofloxacina na espécie felina. No foco abdominal (peritonite séptica), a cobertura de quatro quadrantes (Gram-positivos, Gram-negativos e anaeróbios) é obrigatória. Concomitantemente, o source control físico é mandatória: nenhum antibiótico cura piotórax sem a inserção imediata de drenos torácicos bilaterais (6-8 F ou 10-12 F) para lavagem pleural isotônica seriada com salina a 37-38 °C (10 a 15 mL/kg, recuperando >= 75%), e nenhum antibiótico cura peritonite séptica perfurativa sem laparotomia de urgência para ressecção da alça e omentopexia tão logo haja estabilidade hemodinâmica mínima.',
    suporteIntensivoNutricaoPrecoceAnalgesia:
      'O suporte intensivo multimodal na sepse felina abrange a proteção metabólica contra a lipidose hepática e o controle álgico ético e seguro. O felino sob sepse e estresse catabólico prolongado mobiliza estoques periféricos de ácidos graxos em velocidade que sobrecarrega a capacidade de oxidação e secreção de lipoproteínas pelos hepatócitos, desenvolvendo lipidose hepática fulminante em poucos dias de anorexia. Portanto, a introdução de nutrição enteral precoce (através de sonda nasoesofágica 3,5-5 F ou tubo de esofagostomia após estabilização inicial) deve ocorrer nas primeiras 12 a 24 horas de internação em microdoses tróficas (25% a 33% da Taxa Metabólica de Repouso [RER], progredindo gradualmente). A analgesia em felinos sépticos deve ser baseada em opioides puros ou agonistas parciais: Metadona (0,1 a 0,2 mg/kg IV q4-6h) oferece analgesia visceral potente sem efeitos cardiovasculares deletérios significativos; Buprenorfina (0,01 a 0,03 mg/kg IV ou via transmucosa bucal q6-8h) é excelente para dor moderada a intensa em felinos estáveis. VETO CATEGÓRICO AOS AINEs: anti-inflamatórios não esteroidais (como meloxicam e firocoxib) são estritamente contraindicados no gato séptico ou hipotenso, pois inibem as prostaglandinas renais vasodilatadoras de proteção e deflagram necrose papilar renal aguda, hemorragias e perfurações gastrointestinais fatais. Corticosteroides só são indicados em doses fisiológicas de reposição (Hidrocortisona 0,5 a 1,0 mg/kg IV q6h) diante de choque séptico vasoplégico refratário a vasopressores em altas doses, tratando a insuficiência adrenal relativa do paciente crítico (CIRCI).',
    tabelaManejoEscalonadoUtiFelina: {
      title: 'Tabela 6 — Protocolo Escalonado de UTI Felina: da Triagem à Falência Multiorgânica Refratária',
      headers: ['Nível de Manejo / Fase', 'Metas Clínicas Imediatas', 'Intervenções Terapêuticas Padronizadas', 'Gatilhos para Escalonamento'],
      rows: [
        {
          col1: 'Fase 1: Triagem e Ressuscitação Inicial (0 a 60 min)',
          col2: 'Detecção de sepse; alívio da tríade do choque; temperatura > 36,5 °C; PAM > 50 mmHg',
          col3: 'Oxigenoterapia hands-off em caixa de O2; alíquota conservadora de cristaloide (5-10 mL/kg em 15-30 min); manta térmica de ar forçado a 37 °C; toracocentese diagnóstica/alívio',
          col4: 'Se PAM permanecer < 60 mmHg ou lactato > 2,5 após 10-20 mL/kg cumulativos -> avançar para Fase 2',
        },
        {
          col1: 'Fase 2: Suporte Vasoativo e Antimicrobiano (1 a 3 horas)',
          col2: 'PAM >= 60-65 mmHg; reversão da bradicardia; antibioticoterapia IV na 1ª hora',
          col3: 'Norepinefrina em infusão contínua (0,05 a 1,0 mcg/kg/min); coleta microbiológica célere; antimicrobianos bactericidas IV dirigidos; analgesia com opioide puro (metadona)',
          col4: 'Se houver necessidade de doses elevadas de norepinefrina (> 0,5 mcg/kg/min) ou contratilidade baixa -> avançar para Fase 3',
        },
        {
          col1: 'Fase 3: Source Control de Urgência (2 a 6 horas)',
          col2: 'Eliminação física da fonte infecciosa; descompressão pleural ou cavitária',
          col3: 'Instalação de drenos torácicos bilaterais (6-8 F) com lavagem pleural seriada no piotórax; ou laparotomia exploratória sob anestesia balanceada neuroleptoanalgésica na peritonite',
          col4: 'Persistência de choque vasoplégico pós-operatório ou surgimento de novas disfunções orgânicas -> avançar para Fase 4',
        },
        {
          col1: 'Fase 4: UTI Avançada e Proteção de Órgãos (6 a 48 horas)',
          col2: 'Manutenção de homeostase multiorgânica; diurese > 1 mL/kg/h; alimentação enteral trófica',
          col3: 'Associação de vasopressina (0,5-5 mU/kg/min) e dobutamina (5-15 mcg/kg/min); hidrocortisona (1 mg/kg IV q6h se CIRCI); sonda nasoesofágica para nutrição precoce; vigilância de edema',
          col4: 'Progressão para MODS com ARDSVet ou anúria requer ventilação mecânica invasiva ou terapia de suporte avançado',
        },
      ],
    },
  },

  complications: {
    complicacoesCriticasSobrecargaMods:
      'As complicações clínicas mais frequentes e letais na sepse felina internada em UTI abrangem: 1. Sobrecarga hídrica iatrogênica (fluid overload): a complicação mais comum e evitável, provocada por infusão excessiva de cristaloides em um animal com vasculatura pulmonar vulnerável e glicocálix degradado, resultando em edema alveolar difuso, efusão pleural e ARDSVet; 2. Síndrome da Disfunção de Múltiplos Órgãos (MODS): a progressão da cascata tromboinflamatória e hipoperfusão celular atinge sequencialmente rins, fígado, pulmões e trato gastrointestinal, sendo o principal determinante de óbito hospitalar (Troìa et al., 2019); 3. Falência adrenal relativa do paciente crítico (CIRCI): exaustão da esteroidogênese adrenal que deflagra hipotensão vasoplégica profundamente refratária a vasopressores exógenos; 4. Lipidose hepática felina fulminante: desencadeada por períodos de anorexia e catabolismo descontrolado; 5. Retinopatia tóxica por fluoroquinolonas: complicação iatrogênica clássica associada ao uso inadvertido de enrofloxacina em doses superiores a 5 mg/kg/dia, levando à cegueira irreversível por degeneração fotorreceptora na espécie felina.',
    dezErrosMataisSepseFelina:
      'Dez erros críticos e armadilhas letais na abordagem da sepse felina: 1. Exigir febre ou leucocitose com desvio para suspeitar de sepse: o gato séptico frequentemente apresenta normotermia ou hipotermia e pode estar leucopênico; 2. Administrar bólus de choque tradicionais caninos (50 a 90 mL/kg) em gatos: erro que produz edema pulmonar fulminante e óbito imediato por sobrecarga hídrica; 3. Interpretar a bradicardia do choque frio como "tranquilidade" do animal: confundir a falta de taquicardia com ausência de gravidade retarda o diagnóstico de colapso circulatório iminente; 4. Tentar elevar a pressão arterial com doses cavalares de vasopressores antes de aquecer o gato: receptores adrenérgicos são ineficazes e arritmogênicos na vigência de hipotermia grave (< 36 °C); 5. Prescrever anti-inflamatórios não esteroidais (AINEs): meloxicam ou outros AINEs em gatos hipoperfundidos provocam lesão renal aguda anúrica e perfuração intestinal fulminante; 6. Adiar o source control em peritonite ou piotórax aguardando "estabilização clínica completa": pus cavitário retido mantém o paciente em choque refratário; 7. Administrar Enrofloxacina em doses elevadas (> 5 mg/kg): risco iminente de cegueira bilateral irreversível no felino; 8. Diagnosticar CID em gato assintomático baseado unicamente em aPTT prolongado: a deficiência congênita benigna de Fator XII é comum e não gera sangramentos clínicos; 9. Manter o felino séptico em jejum prolongado na UTI: atrasar a nutrição enteral propicia lipidose hepática grave e perda da barreira mucosa intestinal; 10. Desprezar a monitorização beira-leito com POCUS torácico: realizar radiografias torácicas forçadas em gatos com piotórax e desconforto respiratório grave deflagra parada cardiorrespiratória por estresse.',
    protocoloPlantaoSepseFelina10Passos:
      'Protocolo de plantão: conduta clínica sequencial em 10 passos no gato séptico: 1. Triagem imediata: identificar prostração profunda, extremidades geladas, mucosas pálidas e taquipneia; 2. Oxigenoterapia hands-off: acomodar o felino em caixa de oxigênio a 40-50% sem contenção estressante; 3. Aferição simultânea da tríade do choque: registrar temperatura retal, frequência cardíaca e pressão arterial sistólica/média por Doppler ou oscilometria de alta definição; 4. POCUS torácico de leito (TFAST): varrer o tórax em busca de efusão pleural; se presente com esforço respiratório, realizar toracocentese diagnóstica e de alívio imediato (coletar amostras para citologia e microbiologia); 5. Acesso vascular e exames essenciais: canular veia cefálica ou safena com cateter 22-24 G e colher microamostras para glicemia, lactato, hemograma com pesquisa de corpúsculos de Döhle, creatinina e cálcio ionizado; 6. Alíquota volêmica conservadora (AAHA 2024): infundir 5 a 10 mL/kg de Ringer Lactato ou Plasma-Lyte em 15 a 30 minutos; suspender se surgirem taquipneia, ritmo de galope ou linhas B no POCUS; 7. Aquecimento ativo gradual: instalar manta de convecção de ar aquecido a 37-38 °C para elevar a temperatura corporal em 0,5 a 1,0 °C por hora até atingir 37,5 °C; 8. Suporte vasopressor precoce: se a PAM persistir < 60 mmHg após 10-20 mL/kg totais de fluidos, iniciar infusão contínua de Norepinefrina (0,05 a 0,1 mcg/kg/min, titulando até 1,0 mcg/kg/min); 9. Antimicrobianos IV na 1ª hora e Source Control: administrar Ampicilina/Sulbactam + Marbofloxacina ou Ceftriaxona + Metronidazol; instalar drenos torácicos bilaterais em piotórax ou encaminhar para laparotomia na peritonite; 10. Proteção enteral e analgesia: fornecer Metadona (0,1 a 0,2 mg/kg IV q4-6h) e instalar sonda nasoesofágica para introdução de microdoses de dieta enteral nas primeiras 12 a 24 horas.',
  },

  figures: [
    {
      id: 'fig-degradacao-glicocalix-edema-felino',
      title: 'Figura 1 — Degradação do Glicocálix e Mecanismo de Extravasamento Capilar no Pulmão Felino',
      legend:
        'Representação biofísica da microcirculação sob sepse: clivagem enzimática do glicocálix endotelial e hiperpermeabilidade microvascular. A infusão agressiva de fluidos intravenosos em felinos com lesão endotelial resulta em perda massiva de líquido para o interstício e alvéolos pulmonares, deflagrando edema pulmonar não cardiogênico e efusão pleural com facilidade extrema.',
      source: 'Frontiers in Veterinary Science (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-felina/degradacao-glicocalix-edema-felino.jpg',
      aspectRatio: '5:4',
    },
    {
      id: 'fig-imunotrombose-netose-felina',
      title: 'Figura 2 — Imunotrombose Microvascular e Oclusão Capilar na Sepse Felina',
      legend:
        'Esquema mecanístico da tromboinflamação séptica: interação desregulada entre neutrófilos hiperativados, liberação maciça de armadilhas extracelulares de neutrófilos (NETose), agregação plaquetária e expressão microvascular de fator tecidual. A formação disseminada de microtrombos capilares compromete a perfusão de múltiplos órgãos, precipitando a Síndrome da Disfunção de Múltiplos Órgãos (MODS).',
      source: 'Journal of Cellular and Molecular Medicine / Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/sepse-felina/imunotrombose-netose-felina.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-citologia-piotorax-sepse-felina',
      title: 'Figura 3 — Citologia de Efusão Pleural em Piotórax Felino com Sepse',
      legend:
        'Fotomicromicrografia de esfregaço de líquido pleural corado por May-Grünwald Giemsa (aumento de 100x): predomínio maciço de neutrófilos degenerados com cariólise evidente e presença de múltiplos microrganismos bacterianos intracelulares fagocitados (cocos e bacilos pleomórficos), confirmando empiema pleural bacteriano por microbiota mista (Sim et al., 2021).',
      source: 'Sim et al. (2021), Animals (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-felina/citologia-piotorax-sepse-felina.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-radiografia-piotorax-sepse-felina',
      title: 'Figura 4 — Radiografia Torácica de Felino Séptico com Piotórax Bilateral',
      legend:
        'Projeção radiográfica torácica lateral de paciente felino com choque séptico secundário a piotórax: volumosa coleção líquida pleural bilateral gerando apagamento completo dos contornos da silhueta cardíaca e cúpula diafragmática, com retração e atelectasia compressiva grave de lobos pulmonares flutuantes (Sim et al., 2021).',
      source: 'Sim et al. (2021), Animals (CC BY-SA 4.0)',
      url: '/consulta-vet/sepse-felina/radiografia-piotorax-sepse-felina.jpg',
      aspectRatio: '4:3',
    },
  ],

  prevention: {
    pilaresDePrevencaoEControleDomiciliar:
      'A prevenção da sepse em felinos fundamenta-se no manejo profilático rigoroso de suas causas primárias: 1. Prevenção de brigas e feridas por mordeduras: a manutenção de felinos exclusivamente em ambiente estritamente domiciliado (indoor) elimina o contato agonístico territorial com outros animais errantes, prevenindo mais de 80% dos casos de piotórax e abscessos subcutâneos profundos; 2. Enriquecimento ambiental e manejo de corpos estranhos: evitar brinquedos com linhas, fios de costura, agulhas ou fitas que propiciem obstrução e perfuração gastrointestinal linear; 3. Vacinação essencial completa: imunização profilática rigorosa contra o vírus da panleucopenia felina (FPV), prevenindo a enterite necrosante fulminante e a translocação bacteriana maciça; 4. Diagnóstico e tratamento precoce de doenças de base: rastreio seriado de infecções retrovirais (FeLV e FIV), acompanhamento de urolitíases obstrutivas e intervenção imediata diante de sinais de anorexia ou febre; 5. Conscientização e educação dos tutores: instruir tutores de que o gato enfermo com comportamento deprimido, retraimento, corpo frio ao toque ou respiração acelerada encontra-se em emergência crítica e necessita de avaliação hospitalar imediata.',
  },

  relatedConsensusSlugs: [
    'veccs-sepse-definicao-caes-gatos-2026',
    'veccs-choque-septico-prognostico-2026',
    'curative-risco-trombotico-2022',
  ],

  relatedDiseaseSlugs: [
    'sepse-canina',
    'piotorax-caes-gatos',
    'peritonite-infecciosa-felina',
    'triade-felina',
    'coagulacao-intravascular-disseminada-caes-gatos',
  ],

  relatedMedicationSlugs: [
    'ampicilina-sulbactam',
    'ceftriaxona',
    'marbofloxacina',
    'pradofloxacina',
    'metadona',
    'buprenorfina',
  ],

  references: [
    {
      id: 'ref-goggs-sepse-felina-2026',
      citation:
        'Goggs R, Cortellini S, DeClue AE, et al. Sepsis in Dogs and Cats: Consensus Definition and Clinical Criteria. Journal of Veterinary Emergency and Critical Care 2026; 36(4): 445-469.',
      url: 'https://doi.org/10.1111/vec.70129',
    },
    {
      id: 'ref-goggs-choque-felino-2026',
      citation:
        'Goggs R, Cortellini S, DeClue AE, et al. Septic Shock and Prognosis in Dogs and Cats With Sepsis: Consensus Definition and Clinical Criteria. Journal of Veterinary Emergency and Critical Care 2026; 36(4): 470-488.',
      url: 'https://doi.org/10.1111/vec.70130',
    },
    {
      id: 'ref-troia-mods-felina-2019',
      citation:
        'Troìa R, Ciuffoli E, Vasylyeva M, et al. Multiple organ dysfunction syndrome in cats: Prospective evaluation of a standardized scoring system and clinical features. Journal of Feline Medicine and Surgery 2019; 21(10): 947-955.',
      url: 'https://doi.org/10.1177/1098612X18814522',
    },
    {
      id: 'ref-klainbart-peritonite-felina-2017',
      citation:
        'Klainbart S, Kelmer E, Vidmayer B, et al. Retrospective evaluation of septic peritonitis in cats: 41 cases (2001-2013). Journal of Veterinary Emergency and Critical Care 2017; 27(1): 89-96.',
      url: 'https://doi.org/10.1111/vec.12543',
    },
    {
      id: 'ref-scotti-antimicrobianos-sepse-2019',
      citation:
        'Scotti S, Cortellini S, Humm K. Sepsis in small animals: Pathophysiology and evaluation of empirical antimicrobial therapy. Journal of Veterinary Emergency and Critical Care 2019; 29(4): 374-383.',
      url: 'https://doi.org/10.1111/vec.12858',
    },
    {
      id: 'ref-anderson-piotorax-felino-2021',
      citation:
        'Anderson DM, Hallman D, Hall J. Feline Pyothorax: A Review of 67 Cases and Current Treatment Paradigms. Journal of Feline Medicine and Surgery 2021; 23(8): 722-731.',
      url: 'https://doi.org/10.1177/1098612X20974533',
    },
    {
      id: 'ref-hayes-apple-felino-2011',
      citation:
        'Hayes G, Mathews K, Doig G, et al. The feline acute patient physiologic and laboratory evaluation (feline APPLE) score: a severity of illness stratification system for hospitalized cats. Journal of Veterinary Emergency and Critical Care 2011; 21(1): 65-74.',
      url: 'https://doi.org/10.1111/j.1476-4431.2010.00609.x',
    },
    {
      id: 'ref-aaha-fluidos-2024',
      citation:
        'Davis H, Jensen T, Johnson A, et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association 2024; 60(4): 125-148.',
      url: 'https://doi.org/10.5326/JAAHA-MS-7434',
    },
    {
      id: 'ref-medardo-citologia-efusoes-2024',
      citation:
        'Medardo M, Bo S, Prandi D, et al. Diagnostic Value of Pleural and Peritoneal Effusions Cytology in Dogs and Cats with Suspected Bacterial Sepsis. Animals 2024; 14(12): 1762.',
      url: 'https://doi.org/10.3390/ani14121762',
    },
    {
      id: 'ref-sim-piotorax-felino-2021',
      citation:
        'Sim XY, Kim JH, Do SH, et al. Clinical and cytological characteristics of feline pyothorax: a retrospective study of 34 cases. Animals 2021; 11(8): 2341.',
      url: 'https://doi.org/10.3390/ani11082341',
    },
    {
      id: 'ref-ettinger-9ed-feline-shock',
      citation:
        'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and the Cat. 9th ed. Philadelphia: Saunders Elsevier; 2024.',
    },
    {
      id: 'ref-feline-ecc-drobatz-2ed',
      citation:
        'Drobatz KJ, Beal MW, Syring RS. Feline Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell; 2020.',
    },
  ],

  isPublished: true,
};
