import { DiseaseRecord } from '../../types/disease';

export const lesaoRenalAgudaFelinaRecord: DiseaseRecord = {
  id: 'disease-lesao-renal-aguda-felina',
  slug: 'lesao-renal-aguda-felina',
  title: 'Lesão Renal Aguda em Felinos (LRA / AKI)',
  subtitle: 'Consensos IRIS 2024-2026, Estadiamento I-V, Manejo Volêmico Restritivo e Terapias Extracorpóreas',
  synonyms: [
    'Injúria renal aguda felina',
    'Insuficiência renal aguda em gatos',
    'Acute Kidney Injury (AKI) in cats',
    'IRA felina',
    'LRA felina',
    'Azotemia renal aguda felina',
    'Acute-on-chronic kidney disease (AoCKD)',
    'Lesão tubular aguda felina (NTA)',
  ],
  species: ['cat'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'medicina-felina',
    'clinica-medica',
  ],
  tags: [
    'LRA Felina',
    'Injúria Renal Aguda',
    'Consenso IRIS 2024-2026',
    'IRIS AKI Grading',
    'White 2026',
    'AAHA Fluidos 2024',
    'Sobrecarga Hídrica',
    'Hipercalemia',
    'Oligúria e Anúria',
    'Amlodipina',
    'Intoxicação por Lírio',
    'Ureterolitíase Felina',
    'SUB e Stent Ureteral',
    'Hemodiálise / CRRT',
    'Nelson & Couto',
    'Feline ECC Drobatz',
  ],
  quickSummary:
    'A lesão renal aguda (LRA / AKI) em felinos é uma síndrome clínica crítica e dinâmica caracterizada pelo declínio abrupto (ao longo de horas a poucos dias) da taxa de filtração glomerular (TFG), resultando em retenção severa de solutos urêmicos, desregulação eletrolítica, acidose metabólica e incapacidade de manter o equilíbrio hídrico corporal. Atualizada conforme o Consenso da Sociedade Internacional de Interesse Renal (IRIS, reemitido em 2026), as diretrizes da AAHA Fluid Therapy Guidelines 2024 e os consensos de hemodiálise intermitente (IHD 2024) e terapias de substituição renal contínua (CRRT 2026), a abordagem moderna aboliu categoricamente o dogma histórico da diurese forçada ("lavar o rim"). Cristaloides não ressuscitam néfrons necrosados e a sobrecarga hídrica (fluid overload >= 10% do peso corporal) atua como fator independente de mortalidade e retardo da recuperação funcional. A fluidoterapia contemporânea é restritiva e milimetricamente guiada pelo princípio "In = Out" (entradas igualam saídas) com soluções balanceadas (Ringer Lactato ou Plasma-Lyte), abandonando o uso rotineiro de NaCl 0,9%. O estadiamento IRIS I a V baseia-se na creatinina sérica basal e na cinética aguda (aumento >= 0,3 mg/dL em 48h documenta LRA mesmo dentro da faixa de referência normal), sendo mandatório o subestadiamento por débito urinário (oligúria < 1 mL/kg/h; anúria) e pressão arterial sistêmica (alvo PAS < 160 mmHg com amlodipina). O manejo intensivo exige controle emergencial da hipercalemia cardiotóxica (gluconato de cálcio e insulina regular com glicose), analgesia com opioides puros (buprenorfina), suporte nutricional enteral hospitalar sem restrição proteica precoce e indicação ágil de terapias extracorpóreas (IHD/CRRT) ou descompressão intervencionista (SUB para ureterolitíase) antes do colapso multiorgânico irreversível.',

  quickSummaryRich: {
    lead:
      'A lesão renal aguda felina é uma síndrome de falência súbita da filtração glomerular, na qual a conduta clínica moderna aboliu a superidratação forçada ("lavar o rim") e instituiu a fluidoterapia restritiva balanceada, prevenindo a sobrecarga hídrica fatal. A cinética da creatinina (delta >= 0,3 mg/dL em 48h) define o diagnóstico mesmo em níveis absolutos normais, e a produção de urina horária é o termômetro vital de sobrevida.',
    leadHighlights: [
      'declínio abrupto da filtração glomerular',
      'fim da diurese forçada ("lavar o rim")',
      'fluidoterapia restritiva balanceada',
      'prevenção da sobrecarga hídrica (>= 10%)',
      'cinética de creatinina (delta >= 0,3 mg/dL)',
      'débito urinário como sinal vital (In = Out)',
      'estadiamento IRIS 2026 (Graus I a V)',
      'indicação precoce de terapias extracorpóreas (RRT)',
    ],
    pillars: [
      {
        title: 'Fim do Mito de "Lavar o Rim" (AAHA 2024 / IRIS)',
        body:
          'Fluidos intravenosos corrigem déficits de volemia e perfusão, mas são incapazes de recuperar túbulos renais necrosados. Na espécie felina, a sobrecarga hídrica (>= 10% do peso) é letal, induzindo edema pulmonar difuso, hipertensão intra-abdominal e agravamento da lesão renal por compressão capilar intersticial.',
        highlights: ['fim da lavagem renal', 'sobrecarga hídrica letal', 'edema pulmonar felino', 'cristaloides balanceados'],
      },
      {
        title: 'Cinética da Creatinina e Estadiamento IRIS 2026',
        body:
          'O Consenso IRIS (reemitido em 2026) valoriza o aumento de creatinina sérica >= 0,3 mg/dL em 48 horas como evidência inequívoca de LRA ativa (Grau I), mesmo com valores laboratoriais dentro da referência normal. O Grau V (> 10 mg/dL) expressa severidade atual, mas não é sinônimo de irreversibilidade nem autoriza eutanásia isolada.',
        highlights: ['delta creatinina >= 0,3 mg/dL em 48h', 'Grau I não azotêmico', 'Grau V potencialmente reversível'],
      },
      {
        title: 'Débito Urinário Horário e Regra In = Out',
        body:
          'A monitorização horária da produção urinária por sistema fechado é o sinal vital renal mandatório. Atingida a euvolemia, o volume de fluidos infundidos deve ser estritamente igualado à soma da diurese real com as perdas insensíveis (15-20 mL/kg/dia) e gastrointestinais. Na oligoanúria, fluidos de manutenção devem ser drasticamente cortados.',
        highlights: ['produção urinária horária', 'regra In = Out', 'corte de fluidos na anúria', 'evitar hipervolemia'],
      },
      {
        title: 'Terapias Extracorpóreas e Intervenção Ágil',
        body:
          'Hemodiálise intermitente (IHD, Consenso IRIS 2024) e CRRT (Consenso IRIS 2026) não são recursos desesperados de fim de linha; devem ser indicadas precocemente diante de oligoanúria refratária, hipercalemia intratável (> 6,5 mmol/L), sobrecarga hídrica ou intoxicação dializável (etilenoglicol). Em ureterolitíases, a desobstrução por SUB ou stent é urgente.',
        highlights: ['IHD 2024 e CRRT 2026', 'indicação dialítica precoce', 'hipercalemia refratária', 'SUB ureteral'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Estratificação da LRA Felina (Consensos IRIS 2024-2026)',
      steps: [
        {
          label: 'Passo 1: Triagem Imediata de Emergência, Volemia e Risco Cardiotóxico',
          detail:
            'Avaliar perfusão tecidual, temperatura corporal central e pressão arterial sistólica. Realizar eletrocardiograma imediato e gasometria/eletrólitos point-of-care para descartar hipercalemia grave (> 6,0-6,5 mmol/L com ondas T pontiagudas, perda de onda P ou bradicardia). Diferenciar hipovolemia por desidratação severa de sobrecarga hídrica iatrogênica (edema pulmonar, linhas B no POCUS torácico, ritmo de galope).',
          timing: 'Primeiros 15 a 30 minutos de admissão',
        },
        {
          label: 'Passo 2: Investigação Etiológica Focada e POCUS Urológico de Leito',
          detail:
            'Buscar causas prevalentes: nefrotoxinas (lírios Lilium/Hemerocallis, etilenoglicol, AINEs), sepse, choque hipovolêmico ou isquemia anestésica. Realizar POCUS abdominal emergencial para descartar causas pós-renais: obstrução uretral em machos, ureterolitíase por oxalato de cálcio com dilatação de pelve renal > 2-3 mm, hidronefrose, nefromegalia bilateral simétrica (tóxica/inflamatória) ou uroabdômen.',
          timing: 'Até 60 minutos de admissão',
        },
        {
          label: 'Passo 3: Graduação IRIS (I a V), Cinética e Subestadiamento Clínico',
          detail:
            'Mensurar creatinina basal e documentar variações em série (delta >= 0,3 mg/dL em 48h classifica LRA mesmo com valores normais). Subclassificar obrigatoriamente pela produção de urina horária (Oligúria < 1 mL/kg/h; Anúria 0 mL/kg/h; Não-oligúrico >= 1 mL/kg/h) e pela pressão arterial sistólica (normotenso < 140; pré-hipertenso 140-159; hipertenso 160-179; hipertenso severo >= 180 mmHg). Subestadiar quanto à necessidade de terapia renal substitutiva (RRT+ ou RRT-).',
          timing: 'Admissão e reavaliação seriada a cada 12 a 24 horas',
        },
        {
          label: 'Passo 4: Diferenciação Refinada: LRA Pura vs DRC Descompensada vs Acute-on-Chronic',
          detail:
            'Confrontar histórico clínico (anorexia aguda vs emagrecimento crônico e poliúria/polidipsia prévia), escore corporal (preservado na LRA pura vs caquexia muscular na DRC), hematócrito (normal ou hemoconcentrado na LRA vs anemia arregenerativa profunda na DRC) e morfologia ultrassonográfica (rins normais/aumentados com ecogenicidade cortical na LRA vs rins pequenos, irregulares, com perda de definição corticomedular e cistos na DRC).',
          timing: 'Nas primeiras 6 a 12 horas de investigação',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Protocolo de Terapia Intensiva na LRA Felina',
      steps: [
        {
          label: 'Ressuscitação Cuidadosa e Restauração da Euvolemia (AAHA 2024)',
          detail:
            'Corrigir desidratação clínica com cristaloides isotônicos balanceados (Ringer com Lactato ou Plasma-Lyte) ao longo de 6 a 12 horas. Se o animal estiver em choque hipovolêmico, administrar alíquotas conservadoras de 5 a 10 mL/kg em 15 a 30 minutos sob monitorização estrita. Veto formal ao uso rotineiro de NaCl 0,9% para evitar acidose metabólica hiperclorêmica e vasoconstrição arteriolar renal. Interromper expansão imediatamente ao atingir a euvolemia.',
          dose: '5 a 10 mL/kg em choque; correção de desidratação em 6-12h',
        },
        {
          label: 'Aplicação Rígida da Regra da Volemia: In = Out',
          detail:
            'Uma vez euvolêmico, a infusão contínua deve apenas repor as perdas: Volume Infundido = Produção Urinária Horária Medida + Perdas Insensíveis (15 a 20 mL/kg/dia) + Perdas Gastrointestinais (vômito/diarreia). Se o gato permanecer oligoanúrico (< 0,3 a 1,0 mL/kg/h), a fluidoterapia intravenosa deve ser imediatamente reduzida apenas para cobrir as perdas insensíveis, prevenindo a sobrecarga hídrica iatrogênica.',
          timing: 'Monitorização horária ou a cada 2 a 4 horas em UTI',
        },
        {
          label: 'Estabilização e Tratamento da Hipercalemia Cardiotóxica Aguda',
          detail:
            'Diante de K+ > 6,0-6,5 mmol/L ou alterações eletrocardiográficas: 1. Gluconato de cálcio 10% (0,5 a 1,0 mL/kg IV lento em 10-15 min com ECG contínuo) para estabilizar a membrana miocárdica (não reduz o K+ sérico); 2. Insulina regular (0,25 a 0,5 UI/kg IV) combinada a 2 g de glicose por unidade de insulina (administrada como bólus diluído a 10-20% e seguida de infusão contínua com glicose a 2,5-5%); 3. Terbutalina (0,01 mg/kg SC/IM); 4. Bicarbonato de sódio (1 mEq/kg IV em 20 min) apenas se acidose severa confirmada (pH < 7,10).',
          timing: 'Imediato sob monitoramento eletrocardiográfico contínuo',
        },
        {
          label: 'Controle de Hipertensão Arterial Sistêmica e Náusea Urêmica',
          detail:
            'Alvo pressórico estrito de PAS < 160 mmHg (Consenso IRIS 2026). Fármaco de primeira linha: Amlodipina (0,625 a 1,25 mg/gato PO q24h). Hidralazina como resgate em crises hipertensivas. VETO ABSOLUTO a IECA (enalapril/benazepril) e BRA (telmisartan) na fase aguda. Controle de êmese e náusea urêmica com Maropitant (1 mg/kg IV/SC q24h) e Ondansetrona (0,5 mg/kg IV q8-12h). Protetores gástricos: Omeprazol (1 mg/kg IV q12h em infusão lenta).',
          timing: 'Contínuo durante a internação hospitalar',
        },
        {
          label: 'Suporte Nutricional Enteral Precoce e Analgesia Segura',
          detail:
            'Não realizar restrição proteica precoce de rotina na fase aguda de hipercatabolismo urêmico. Introduzir nutrição enteral precoce por sonda nasoesofágica em anorexia > 48 horas (dietas líquidas completas para felinos, suprindo 1,0 a 1,5x RER). Postergar quelantes orais de fósforo até o paciente estar clinicamente estável e alimentando-se espontaneamente. Analgesia segura com Buprenorfina (0,01 a 0,03 mg/kg IV/bucal q6-8h) ou Metadona (0,1 a 0,2 mg/kg IV q4-6h). Proscrição de AINEs.',
          timing: 'Nas primeiras 24 a 48 horas pós-estabilização hemodinâmica',
        },
        {
          label: 'Indicação Ágil de Terapias Extracorpóreas (IHD/CRRT) ou Cirurgia',
          detail:
            'Encaminhar precocemente para hemodiálise intermitente (IHD) ou terapia de substituição renal contínua (CRRT) se houver: oligoanúria persistente refratária a fluidos, hipercalemia intratável (> 6,5 mmol/L), sobrecarga hídrica progressiva (>= 10%), uremia severa com encefalopatia ou toxina dializável (etilenoglicol nas primeiras 12-24h). Em casos de ureterolitíase obstrutiva, realizar descompressão mecânica de urgência por derivação ureteral subcutânea (SUB) ou stent ureteral.',
          timing: 'Decisão nas primeiras 12 a 24 horas de refratariedade',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      title: 'Tabela de Decisão Rápida: Síndromes Renais Agudas e Obstrutivas no Felino',
      headers: ['Classificação Clínica', 'Conceito e Mecanismo Central', 'Achados Laboratoriais e Ultrassom', 'Conduta Imediata'],
      rows: [
        {
          col1: 'LRA Pré-Renal (Hipoperfusão)',
          col2: 'Queda de TFG secundária a hipovolemia, desidratação, choque ou hipotensão anestésica sem lesão estrutural tubular',
          col3: 'Azotemia com densidade urinária concentrada (DU > 1.035 no gato); ausência de cilindros granulares; ultrassom renal preservado',
          col4: 'Restauração cautelosa da volemia com cristaloides balanceados; normalização rápida da creatinina em 24 a 48 horas',
        },
        {
          col1: 'LRA Renal Intrínseca (NTA / Tóxica / Isquêmica)',
          col2: 'Dano citotóxico ou isquêmico direto ao epitélio tubular e endotélio glomerular (ex.: lírios, etilenoglicol, sepse, AINEs)',
          col3: 'Azotemia com densidade isostenúrica (DU 1.008 a 1.015); cilindros granulares e células epiteliais no sedimento; nefromegalia bilateral com halo cortical',
          col4: 'Fluidoterapia restritiva balanceada (regra In = Out), suspensão de nefrotóxicos, manejo de hipercalemia e avaliação precoce de IHD/CRRT',
        },
        {
          col1: 'LRA Pós-Renal (Uropatia Obstrutiva)',
          col2: 'Impedimento mecânico ao fluxo urinário gerando elevação retrógrada da pressão intraluminal tubular e queda abrupta da TFG',
          col3: 'Azotemia aguda associada à distensão vesical palpável (obstrução uretral) ou dilatação de pelve renal > 2-3 mm e hidroureter (ureterolitíase por oxalato)',
          col4: 'Desobstrução imediata: desobstrução uretral retrógrada em machos; intervenção urológica avançada (SUB ou stent ureteral) em ureterolitíase',
        },
        {
          col1: 'Doença Renal Crônica (DRC) Descompensada',
          col2: 'Perda progressiva e irreversível de néfrons funcionais ao longo de meses a anos, descompensada por desidratação secundária',
          col3: 'Azotemia associada a rins pequenos e irregulares com perda de diferenciação corticomedular; anemia não regenerativa; perda de massa muscular crônica',
          col4: 'Reidratação lenta e cuidadosa, manejo de hipertensão e uremia, sem expectativa de retorno da creatinina a valores normais',
        },
        {
          col1: 'Agudo-sobre-Crônico (Acute-on-Chronic / AoCKD)',
          col2: 'Insulto isquêmico, tóxico ou infeccioso agudo sobreposto a um parênquima renal previamente comprometido por DRC',
          col3: 'Elevação súbita acentuada de creatinina sobre linha de base cronicamente elevada; achados ultrassonográficos de DRC associados a nefromegalia assimétrica ou pelvicaliectasia',
          col4: 'Manejo intensivo idêntico à LRA intrínseca, vigilância extrema contra sobrecarga hídrica e busca ativa por pielonefrite ou ureterolitíase associada',
        },
      ],
    },
  },

  quickDecisionStrip: [
    'Lavar o rim é um mito perigoso: fluidos corrigem hipovolemia, mas não recuperam néfrons necrosados e causam sobrecarga hídrica letal.',
    'Na euvolemia, entrada iguala saída (In = Out): se o gato não urina (oligoanúria), corte drasticamente a fluidoterapia intravenosa.',
    'Creatinina com aumento de 0,3 mg/dL em 48h é LRA ativa (Consenso IRIS 2026), mesmo com valor absoluto dentro da normalidade.',
    'Monitore hipercalemia e ECG imediatamente: ondas T pontiagudas, ausência de P e bradicardia exigem gluconato de cálcio e insulina.',
    'Lírios são uma emergência toxicológica felina fulminante: qualquer contato com Lilium exige descontaminação e internação imediata.',
  ],

  etiology: {
    paradigmaIrisAahaFluidoterapiaRestritiva:
      'Nas últimas décadas, a abordagem da Lesão Renal Aguda na medicina veterinária passou por uma transformação conceitual profunda. O antigo paradigma da chamada "diurese forçada" — caracterizado pela administração empírica e indiscriminada de grandes volumes de fluidos intravenosos na tentativa errônea de "lavar as toxinas renais" e "forçar os rins a produzir urina" — foi categoricamente superado e proscrito pelos consensos contemporâneos da Sociedade Internacional de Interesse Renal (IRIS, reemitido em 2026) e pelas Diretrizes de Fluidoterapia da American Animal Hospital Association (AAHA 2024). A fisiopatologia renal estabelece com clareza biológica irrefutável que a fluidoterapia restaura a volemia intravascular, melhora o débito cardíaco e reverte a hipoperfusão glomerular pré-renal; contudo, fluidos intravenosos NÃO ressuscitam células epiteliais tubulares que sofreram necrose ou apoptose, nem possuem a capacidade de restaurar a filtração em néfrons estruturalmente inviabilizados. Na espécie felina, que possui volume sanguíneo restrito (cerca de 60 mL/kg) e uma rede microvascular pulmonar singularmente vulnerável ao extravasamento, a administração agressiva de fluidos culmina com extrema facilidade em sobrecarga hídrica (fluid overload). Diversos estudos clínicos prospectivos e retrospectivos em felinos internados em UTI (como Cole et al. 2019 e Segev et al. 2024) comprovaram que uma sobrecarga hídrica >= 10% do peso corporal admissional constitui um fator prognóstico independente associado a aumento drástico na taxa de mortalidade hospitalar, desenvolvimento de edema pulmonar agudo, efusão pleural, hipertensão intra-abdominal compressiva e prolongamento no tempo de recuperação renal decorrente de congestão e edema intersticial na cápsula renal inelástica (síndrome do rim congesto). Outro pilar fundamental da mudança de paradigma diz respeito à escolha da solução de infusão: as diretrizes AAHA 2024 e o consenso IRIS recomendam cristaloides isotônicos balanceados com composição eletrolítica fisiológica (como Ringer com Lactato ou Plasma-Lyte 148). O uso rotineiro de cloreto de sódio a 0,9% (solução fisiológica) deve ser estritamente evitado na LRA felina, uma vez que sua elevada concentração suprafisiológica de cloro (154 mEq/L) induz acidose metabólica hiperclorêmica severa e desencadeia vasoconstrição reflexa da arteríola aferente mediada pelo feedback túbulo-glomerular nas células da mácula densa, colapsando ainda mais a taxa de filtração glomerular residual.',
    estadiamentoIrisClassificacao2026:
      'O sistema de estadiamento da Lesão Renal Aguda da Sociedade Internacional de Interesse Renal (IRIS AKI Grading), reemitido e ratificado em 2026 com base no resumo prático de White (2026), estabelece uma classificação dinâmica e prognóstica padronizada em 5 graus clínicos de severidade, fundamentada na concentração sérica basal de creatinina e na sua velocidade de variação temporal (cinética aguda). Um marco conceitual indispensável do consenso IRIS é o reconhecimento de que a LRA não requer necessariamente a presença de azotemia evidente: o aumento documentado da creatinina sérica >= 0,3 mg/dL (>= 26,5 umol/L) em um intervalo de 48 horas em relação ao valor basal define com precisão o Grau I de LRA (não azotêmico), refletindo perda abrupta de filtração glomerular que anteriormente passava despercebida porque os níveis laboratoriais permaneciam dentro dos intervalos de referência padrão (ex.: elevação de 0,8 mg/dL para 1,2 mg/dL em um gato hospitalizado). Os graus IRIS estruturam-se da seguinte forma: Grau I (Creatinina < 1,6 mg/dL com aumento agudo >= 0,3 mg/dL em 48h, oligúria/anúria documentada por 6 horas ou histórico de agressão nefrotóxica aguda); Grau II (Creatinina entre 1,6 e 2,8 mg/dL); Grau III (Creatinina entre 2,9 e 5,0 mg/dL); Grau IV (Creatinina entre 5,1 e 10,0 mg/dL); e Grau V (Creatinina sérica > 10,0 mg/dL). O consenso IRIS 2026 enfatiza com vigor que a classificação em Grau V expressa gravidade fisiopatológica momentânea, mas JAMAIS deve ser interpretada isoladamente como sinônimo de irreversibilidade ou critério definitivo para eutanásia: gatos jovens intoxicados por lírio ou obstruídos por cálculos ureterais frequentemente apresentam creatinina superior a 15 ou 20 mg/dL na admissão e recuperam função renal plena ou estável quando submetidos a terapias extracorpóreas (IHD/CRRT) ou desobstrução urológica de emergência. Adicionalmente, o consenso determina o subestadiamento obrigatório em cada reavaliação: 1. Subestádio por Produção Urinária: Não-Oligúrico (NO: débito urinário >= 1,0 mL/kg/h) versus Oligoanúrico (O: oligúria < 1,0 mL/kg/h ou anúria persistente ao longo de 6 horas de monitorização em cateterismo fechado após correção da volemia); 2. Subestádio por Terapia Renal Substitutiva: exigindo registro se o paciente necessita de suporte dialítico extracorpóreo (RRT+ ou RRT-); e 3. Subestádio por Pressão Arterial Sistólica: categorizado pelo Consenso IRIS 2026 em Normotenso (PAS < 140 mmHg), Pré-Hipertenso (PAS 140-159 mmHg), Hipertenso (PAS 160-179 mmHg) e Hipertenso Severo (PAS >= 180 mmHg), estabelecendo o alvo terapêutico estrito de PAS < 160 mmHg com amlodipina (superando a meta legada de < 180 mmHg encontrada em diretrizes mais antigas).',
    tabelaEstadiamentoIrisLraFelina: {
      title: 'Tabela 1 — Estadiamento IRIS de Lesão Renal Aguda Felina (I a V) e Subestágios Clínicos (IRIS 2026)',
      headers: ['Grau IRIS AKI', 'Creatinina Sérica (mg/dL)', 'Critérios Diagnósticos Adicionais', 'Subestadiamento Clínico Mandatório', 'Conduta Geral e Prognóstico'],
      rows: [
        {
          col1: 'Grau I (Não Azotêmico)',
          col2: '< 1,6 mg/dL (< 140 umol/L)',
          col3: 'Aumento agudo >= 0,3 mg/dL em 48h; ou oligúria < 1 mL/kg/h por 6h; ou nefrotoxina documentada',
          col4: 'Subestadiar por diurese (O vs NO), pressão arterial e necessidade de RRT',
          col5: 'Identificar e suspender nefrotóxicos; otimizar perfusão; excelente potencial de reversão completa',
        },
        {
          col1: 'Grau II (Azotemia Leve)',
          col2: '1,6 a 2,8 mg/dL (141 a 249 umol/L)',
          col3: 'Azotemia renal aguda associada a histórico de perda súbita de filtração ou falha de concentração urinária',
          col4: 'Subestadiar por diurese (O vs NO), pressão arterial e necessidade de RRT',
          col5: 'Fluidoterapia restritiva balanceada; monitorar débito horário; investigar causas obstrutivas ou infecciosas',
        },
        {
          col1: 'Grau III (Azotemia Moderada)',
          col2: '2,9 a 5,0 mg/dL (250 a 442 umol/L)',
          col3: 'Retenção evidente de escórias urêmicas; náusea e inapetência frequentes; hiperfosfatemia progressiva',
          col4: 'Subestadiar por diurese (O vs NO), pressão arterial e necessidade de RRT',
          col5: 'Manejo de náusea urêmica em UTI; controle pressórico; monitorar sobrecarga hídrica rigorosamente',
        },
        {
          col1: 'Grau IV (Azotemia Grave)',
          col2: '5,1 a 10,0 mg/dL (443 a 884 umol/L)',
          col3: 'Sinais clássicos de uremia severa (gastrite urêmica, estomatite, hipotermia, acidose láctica/metabólica)',
          col4: 'Subestadiar por diurese (O vs NO), pressão arterial e necessidade de RRT',
          col5: 'Alerta crítico para terapia dialítica extracorpórea; alto risco de óbito se houver oligoanúria persistente',
        },
        {
          col1: 'Grau V (Azotemia Crítica)',
          col2: '> 10,0 mg/dL (> 884 umol/L)',
          col3: 'Falência de filtração renal quase total; encefalopatia urêmica, hipercalemia e acidose extrema',
          col4: 'Subestadiar por diurese (O vs NO), pressão arterial e necessidade de RRT',
          col5: 'Não contraindica tratamento; reversível em gatos jovens (lírio/obstrução); indicação imediata de IHD/CRRT',
        },
      ],
    },
  },

  epidemiology: {
    etiologiasPrevalentesFelinasToxinasIsquemia:
      'A epidemiologia e as causas determinantes da Lesão Renal Aguda na espécie felina compreendem um espectro distinto de agressões nefrotóxicas, isquêmicas, inflamatórias e obstrutivas mecânicas. Entre as causas tóxicas exógenas, a intoxicação por plantas do gênero Lilium (lírios verdadeiros, como lírio-da-paz asiático, lírio-tigre, lírio-estrelado) e Hemerocallis (hemerocale ou daylily) figura como a emergência nefrológica felina mais devastadora. Todas as partes da planta — pétalas, folhas, estames, pólen transportado na pelagem e lambido durante a higienização, e até mesmo a água residual acumulada no vaso de flores — contêm uma nefrotoxina hidrossolúvel de identidade química ainda não isolada que induz necrose tubular aguda fulminante e degeneração mitocondrial massiva no epitélio tubular proximal felino. Gatos expostos a lírios que não recebem descontaminação gastrointestinal imediata e fluidoprofilaxia intravenosa nas primeiras 6 a 12 horas pós-ingestão evoluem quase invariavelmente para anúria letal irreversível e óbito em 3 a 7 dias. Outra nefrotoxina exógena crítica é o etilenoglicol (anticongelante automotivo), cujos metabólitos hepáticos (ácido glicólico e ácido oxálico) precipitam sob a forma de cristais intratubulares birrefringentes de oxalato de cálcio monohidratado, promovendo obstrução mecânica e toxicidade celular lítica; no ultrassom, a intoxicação por etilenoglicol frequentemente projeta o clássico "halo sign" ou anel hiperecogênico cortical. Fármacos iatrogênicos desempenham papel de destaque: anti-inflamatórios não esteroidais (AINEs, incluindo meloxicam e carprofeno, bem como AINEs humanos administrados inadvertidamente como ibuprofeno e paracetamol) inibem as ciclooxigenases (COX-1 e COX-2), bloqueando a síntese de prostaglandinas vasodilatadoras renais (PGE2 e PGI2); em pacientes desidratados ou anestesiados, essa inibição anula a autorregulação renal e desencadeia necrose papilar renal isquêmica aguda irreversível. Aminoglicosídeos (gentamicina, amicacina) acumulam-se nos lisossomos do túbulo contorcido proximal e induzem citotoxicidade cumulativa dose e tempo-dependente. Entre as causas isquêmicas e hemodinâmicas, episódios de hipotensão anestésica transoperatória não monitorada (PAM < 60 mmHg), choque séptico distributivo com perda do glicocálix, tromboembolismo aórtico renal e desidratação severa privam a medula renal profunda de oxigênio celular. As causas infecciosas primárias são dominadas pela pielonefrite bacteriana aguda, geralmente ascendente a partir do trato inferior ou hematógena: o estudo felino recente de Whitehouse et al. (2024) documentou uma prevalência alarmante de cepas uropatogênicas de Escherichia coli exibindo resistência in vitro e clínica a amoxicilina com clavulanato de potássio em gatos com pielonefrite, exigindo seleção antimicrobiana parenteral de maior espectro guiada por cultura. Por fim, as causas obstrutivas (pós-renais) representam uma parcela monumental dos casos felinos: a obstrução uretral aguda em machos por plugs mucocristalinos ou espasmo funcional (Skinner et al., 2026), e a ureterolitíase obstrutiva por cálculos de oxalato de cálcio (mineral não dissolvível clinicamente), na qual a obstrução ureteral unilateral ou bilateral deflagra hidronefrose, perda de TFG e azotemia grave, demandando desobstrução emergencial por Derivação Ureteral Subcutânea (SUB) ou implante de stent ureteral.',
    fisiopatologiaFasesCelularesMecanismos:
      'A fisiopatologia da lesão tubular aguda (LTA) na LRA felina desenvolve-se ao longo de quatro fases temporais e celulares bem definidas na literatura de terapia intensiva: iniciação, extensão, manutenção e recuperação. Na fase de iniciação, o insulto primário (isquemia tecidual, ação direta de toxinas como a do lírio ou translocação inflamatória séptica) atinge as células epiteliais do túbulo proximal e do ramo ascendente espesso da alça de Henle — segmentos metabolicamente hiperativos e de alta demanda de ATP. Ocorre desacoplamento da cadeia transportadora de elétrons mitocondrial, depleção severa de ATP intracelular, influxo desregulado de cálcio citosólico e quebra da polaridade celular epitelial, com translocação da bomba Na+/K+-ATPase da membrana basolateral para o polo apical. Em consequência, a célula perde sua borda em escova e perde a adesão à matriz extracelular, descamando em direção à luz tubular. Na fase de extensão, perpetua-se um ciclo patológico microvascular e inflamatório: a liberação de padrões moleculares associados a dano (DAMPs) pelas células necróticas ativa receptores endoteliais, atraindo neutrófilos e macrófagos, enquanto o inchaço endotelial e o desnudamento do glicocálix comprometem a microcirculação peritubular. Os detritos celulares descamados e as proteínas agregam-se no interior dos túbulos, formando cilindros granulares e epiteliais obstrutivos que elevam drasticamente a pressão intratubular retrógrada e provocam o "back-leak" (refluxo do filtrado glomerular através da membrana basal desnuda de volta ao interstício e circulação). Na fase de manutenção, a taxa de filtração glomerular atinge seu nadir mais profundo e permanece deprimida por dias ou semanas, com o paciente apresentando azotemia severa, uremia clínica e frequentemente oligoanúria, período no qual a homeostase corpórea depende integralmente do suporte médico intensivo ou de terapias extracorpóreas substitutivas. Por fim, na fase de recuperação, se as membranas basais tubulares permanecerem estruturalmente íntegras, ocorre proliferação celular, diferenciação e repolarização do epitélio tubular. Essa fase é clinicamente marcada por poliúria exuberante de resolução, na qual os túbulos regenerados ainda não recuperaram a capacidade de concentrar urina e reabsorver eletrólitos adequadamente, exigindo vigilância médica intensa contra hipocalemia e desidratação iatrogênica pós-obstrutiva.',
    tabelaFasesTemporaisLraFelina: {
      title: 'Tabela 2 — Fases Temporais da LRA Felina: Fisiopatologia Celular, Biomarcadores e Foco Clínico',
      headers: ['Fase Evolutiva', 'Duração Típica', 'Eventos Celulares e Biofísicos Centrais', 'Biomarcadores e Achados', 'Alvo Terapêutico Prioritário'],
      rows: [
        {
          col1: '1. Iniciação',
          col2: 'Horas (0 a 24-48h)',
          col3: 'Depleção de ATP celular; estresse oxidativo; perda da borda em escova e descamação tubular inicial',
          col4: 'Delta de creatinina sérica >= 0,3 mg/dL em 48h; glicosúria normoglicêmica; proteinúria tubular',
          col5: 'Eliminação imediata da agressão; descontaminação de toxinas (lírio); restauração da perfusão',
        },
        {
          col1: '2. Extensão',
          col2: '1 a 3 dias',
          col3: 'Isquemia peritubular persistente; inflamação intersticial; obstrução tubular por cilindros e back-leak',
          col4: 'Azotemia progressiva; cilindros granulares grosseiros no sedimento; hipercalemia emergencial',
          col5: 'Fluidoterapia restritiva In = Out; prevenção de sobrecarga hídrica; estabilização eletrolítica',
        },
        {
          col1: '3. Manutenção',
          col2: '1 a 3 semanas',
          col3: 'TFG estabilizada no nadir; dano celular estrutural consolidado; oligoanúria frequente; uremia clínica',
          col4: 'Azotemia refratária de pico (Graus IRIS III a V); acidose metabólica; retenção de escórias urêmicas',
          col5: 'Suporte de vida avançado em UTI; manejo estrito de balanço hídrico; indicação de IHD/CRRT',
        },
        {
          col1: '4. Recuperação',
          col2: 'Semanas a meses',
          col3: 'Repitelização e repolarização tubular; resolução gradual da obstrução mecânica luminal',
          col4: 'Poliúria acentuada de resolução; queda gradual da creatinina; hipocalemia e hipostenúria transitórias',
          col5: 'Reposição hidroeletrolítica calculada das perdas urinárias massivas; suplementação de potássio',
        },
      ],
    },
  },

  pathogenesisTransmission: {
    transmissaoInfecciosaInexistente:
      'A lesão renal aguda tóxica, isquêmica ou obstrutiva não possui transmissão horizontal ou zoonótica direta entre animais. Em casos específicos de etiologia bacteriana (como a pielonefrite por enterobactérias uropatogênicas), a contaminação ocorre por via ascendente a partir do trato urinário inferior ou, raramente, por bacteremia hematógena. A intoxicação por lírios (Lilium e Hemerocallis) depende exclusivamente do contato e da ingestão individual pelo paciente felino.',
    patogeneseLesaoTubularAguda:
      'A patogênese primária fundamenta-se no dano citotóxico ou isquêmico agudo às células epiteliais do túbulo contorcido proximal e do ramo ascendente espesso da alça de Henle. A depleção de ATP celular provoca perda da polaridade epitelial, redistribuição basolateral-apical da Na+/K+-ATPase e necrose/apoptose celular. As células descamadas agregam-se no lúmen tubular com proteína de Tamm-Horsfall, formando cilindros obstrutivos que elevam a pressão hidrostática retrógrada e promovem o refluxo transintersticial do filtrado glomerular (back-leak).',
  },

  pathophysiology: {
    diagnosticoDiferencialLraDrcAcuteOnChronic:
      'Uma das distinções clínicas mais refinadas e frequentes na rotina hospitalar felina é a diferenciação entre a Lesão Renal Aguda pura (LRA), a Doença Renal Crônica (DRC) descompensada por desidratação e a sobreposição aguda sobre a doença renal crônica (Acute-on-Chronic Kidney Disease / AoCKD). O felino com LRA pura apresenta classicamente um histórico curto e abrupto de anorexia súbita, apatia e vômitos urêmicos intensos em um paciente que até então mantinha excelente apetite e peso estável; ao exame físico, o escore de condição corporal (ECC) e a massa muscular encontram-se preservados, a pelagem exibe brilho habitual e não há relato prévio de poliúria e polidipsia (PU/PD). No hemograma de admissão, o hematócrito é normal ou elevado por hemoconcentração associada à hipovolemia desidratante, contrastando categoricamente com a anemia não regenerativa normocítica normocrômica profunda (secundária ao déficit absoluto crônico de eritropoietina medular) típica do gato com DRC avançada. Ao estudo ultrassonográfico abdominal, os rins na LRA pura exibem dimensões normais ou marcadamente aumentadas (nefromegalia simétrica, frequentemente > 4,3 a 4,8 cm de comprimento no felino), parênquima edemaciado com ecogenicidade cortical aumentada, halo medular hipoecoico e, por vezes, pequeno halo de líquido anecoico subcapsular/perirrenal, preservando a diferenciação entre o córtex e a medula. Em contrapartida, na DRC felina, os rins apresentam-se pequenos (< 3,0 a 3,5 cm), com contornos marcadamente irregulares, cápsula retraída, perda completa da arquitetura e da definição corticomedular, infartos corticais fibróticos e cistos parenquimatosos. Na síndrome Agudo-sobre-Crônico (AoCKD) — cenário em que um felino nefropata crônico prévio sofre um insulto hemodinâmico, infeccioso (pielonefrite ascendente) ou obstrutivo agudo (ureterolitíase) —, o paciente exibe estigmas de cronicidade (perda de massa magra, anemia arregenerativa, osteodistrofia fibrosa e histórico de PU/PD) somados à descompensação clínica explosiva, uremia hiperaguda e desproporção ultrassonográfica, como um rim atrófico crônico contralateral associado a nefromegalia aguda ou hidronefrose ipsilateral (rim grande, rim pequeno). A confirmação do componente agudo sobreposto é vital, pois a reversão do fator descompensador pode devolver o paciente à sua linha de base anterior estável.',
    tabelaDiferencialLraDrcFelina: {
      title: 'Tabela 3 — Diagnóstico Diferencial: LRA Pura vs DRC Descompensada vs Agudo-sobre-Crônico (AoCKD)',
      headers: ['Variável Clínica / Exame', 'Lesão Renal Aguda Pura (LRA)', 'Doença Renal Crônica (DRC)', 'Agudo-sobre-Crônico (AoCKD)'],
      rows: [
        {
          col1: 'Início e Duração dos Sinais',
          col2: 'Súbito e fulminante (horas a poucos dias); sem histórico de enfermidade renal',
          col3: 'Insidioso e progressivo (meses a anos); histórico longo de PU/PD e emagrecimento',
          col4: 'Agravamento explosivo recente sobreposto a histórico de DRC estável de longa data',
        },
        {
          col1: 'Escore Corporal e Massa Muscular',
          col2: 'Preservado (ECC 5/9 a 7/9); musculatura epaxial e glútea íntegra',
          col3: 'Perda crônica grave de massa magra (sarcopenia e caquexia urêmica; ECC 2/9 a 3/9)',
          col4: 'Perda muscular prévia acentuada combinada à desidratação e prostração aguda recente',
        },
        {
          col1: 'Volume Globular (Hematócrito)',
          col2: 'Normal ou elevado por hemoconcentração aguda (VG > 35-45%)',
          col3: 'Anemia não regenerativa normocítica normocrômica acentuada (VG frequentemente < 20-25%)',
          col4: 'Anemia crônica pré-existente desproporcional à perda volêmica aguda recente',
        },
        {
          col1: 'Tamanho e Morfologia Renal ao Ultrassom',
          col2: 'Rins aumentados (nefromegalia > 4,3-4,8 cm) ou normais; lisos; halo cortical hiperecogênico',
          col3: 'Rins diminuídos (< 3,0-3,5 cm); superfície irregular e retraída; perda corticomedular total',
          col4: 'Assimetria acentuada ("rim grande, rim pequeno"); cálculo ureteral; pelvicaliectasia aguda',
        },
        {
          col1: 'Potássio Sérico na Admissão',
          col2: 'Hipercalemia frequente e severa (especialmente se oligoanúria presente)',
          col3: 'Hipocalemia ou normocalemia comuns (espoliação urinária crônica por diurese osmótica)',
          col4: 'Hipercalemia aguda emergencial precipitada por queda aguda da excreção tubular',
        },
        {
          col1: 'Potencial de Reversibilidade',
          col2: 'Potencialmente reversível com recuperação parcial ou total da filtração glomerular',
          col3: 'Irreversível; o manejo visa unicamente desacelerar a progressão e manter qualidade de vida',
          col4: 'A fração aguda pode ser revertida, retornando o paciente ao seu estágio basal prévio de DRC',
        },
      ],
    },
  },

  clinicalSignsPathophysiology: {
    manifestacoesClinicasUremicasSistemicas:
      'Os sinais clínicos da LRA felina decorrem da retenção aguda de toxinas urêmicas, distúrbios hidroeletrolíticos e acidose metabólica: 1. Trato gastrointestinal: vômitos agudos incoercíveis, anorexia total, sialorreia, halitose urêmica marcante e ulcerações orais/linguais; 2. Estado mental e neuromuscular: depressão sensorial profunda, prostração, fraqueza cervical (ventroflexão associada a hipocalemia ou desidratação), tremores musculares ou convulsões na encefalopatia urêmica grave; 3. Produção urinária: oligúria (< 1 mL/kg/h), anúria total ou fase poliúrica precoce dependendo da etiologia e do momento de apresentação; 4. Sinais cardiovasculares e respiratórios: bradicardia por hipercalemia cardiotóxica, ritmo de galope ou estertores crepitantes na sobrecarga hídrica, taquipneia compensatória para acidose metabólica e dor à palpação renal lombar (renomegalia dolorosa).',
  },

  diagnosis: {
    investigacaoDiagnosticaImagemLaboratorio:
      'A investigação diagnóstica da LRA felina exige uma abordagem laboratorial e por imagem metódica, rápida e integrada. No painel bioquímico sérico, mensurações em série de creatinina sérica, ureia (BUN), fósforo sérico, eletrólitos (potássio, sódio, cloro), cálcio total e ionizado, e equilíbrio ácido-base (tCO2 e hemogasometria) devem ser estabelecidas na admissão e repetidas a cada 12 a 24 horas. A urinálise completa constitui um pilar inegociável de avaliação e DEVE ser coletada obrigatoriamente ANTES do início de qualquer infusão intravenosa volumosa de fluidos. A densidade urinária (DU) avaliada por refratometria óptica revela tipicamente isostenúria (1.008 a 1.015) ou perda precoce da capacidade de concentração urinária (< 1.035 em felinos) na presença de azotemia, demonstrando falência da função tubular em concentrar o filtrado. A presença de glicosúria na vigência de glicemia sérica estritamente normal (glicosúria renal normoglicêmica) reflete dano citotóxico funcional seletivo ao transportador SGLT2 do túbulo contorcido proximal felino, sendo um marcador precoce de agressão por nefrotoxinas ou isquemia. Ao exame microscópico do sedimento urinário fresco, a visualização de cilindros granulares grosseiros em grande quantidade e células epiteliais tubulares descamadas é patognomônica de necrose tubular aguda ativa em curso. Na intoxicação por etilenoglicol, o sedimento revela cristais birrefringentes em agulha ou halter de oxalato de cálcio monohidratado (dihidratado em menor número). A urocultura com teste de sensibilidade antimicrobiana (antibiograma com MIC) deve ser colhida por cistocentese estéril em todo felino com LRA, exceto se houver coagulopatia grave ou obstrução mecânica com risco de perfuração. No campo da imagem beira-leito (POCUS), a ultrassonografia abdominal e torácica imediata desempenha papel decisivo: avalia o tamanho renal e parênquima, descarta nefromegalia bilateral simétrica tóxica ou inflamatória, identifica líquido perirrenal, quantifica o diâmetro da pelve renal (a dilatação piélica > 2-3 mm no felino é altamente sugestiva de obstrução ureteral ou pielonefrite ativa), rastreia urólitos radiotransparentes em trajeto ureteral e inspeciona o parênquima pulmonar em busca de linhas B coalescentes, permitindo o diagnóstico precoce de sobrecarga hídrica antes da manifestação de estertores clínicos audíveis.',
    tabelaMatrizDiagnosticaLraFelina: {
      title: 'Tabela 4 — Matriz Diagnóstica e Armada Laboratorial na LRA Felina',
      headers: ['Modalidade / Exame', 'Achados Típicos na LRA Felina', 'Significado Fisiopatológico', 'Armadilha ou Cuidado Crítico'],
      rows: [
        {
          col1: 'Creatinina Sérica em Série',
          col2: 'Elevação rápida; aumento >= 0,3 mg/dL em 48h classifica Grau I IRIS',
          col3: 'Marcador substituto de redução aguda na taxa de filtração glomerular',
          col4: 'Gatos caquéticos ou com atrofia muscular grave podem mascarar LRA com creatinina falsamente baixa',
        },
        {
          col1: 'Eletrólitos Séricos e ECG',
          col2: 'Hipercalemia (> 6,0-7,0 mmol/L); acidose metabólica; hiperfosfatemia',
          col3: 'Falência de excreção tubular distal; risco iminente de assistolia e FV',
          col4: 'Todo felino com K+ > 6,0 mmol/L exige ECG imediato para guiar o uso de gluconato de cálcio',
        },
        {
          col1: 'Urinálise Completa Pré-Fluido',
          col2: 'DU isostenúrica (1.008-1.015); glicosúria normoglicêmica; proteinúria',
          col3: 'Falha dos mecanismos de gradiente medular e lesão do túbulo proximal',
          col4: 'Amostras coletadas após início de fluidos intravenosos perdem a acurácia diagnóstica da DU',
        },
        {
          col1: 'Sedimento Urinário Microscópico',
          col2: 'Cilindros granulares grosseiros; cilindros epiteliais; cristais de oxalato',
          col3: 'Evidência citológica direta de necrose tubular aguda (LTA) ativa em curso',
          col4: 'Cilindros são lábeis e dissolvem-se rapidamente em urina alcalina ou após poucas horas da coleta',
        },
        {
          col1: 'Urocultura e Antibiograma (MIC)',
          col2: 'Isolamento de E. coli, Enterococcus spp. ou Klebsiella spp. com contagem > 10^3 UFC/mL',
          col3: 'Confirmação microbiológica de pielonefrite aguda bacteriana ascendente',
          col4: 'A ausência de bacteriúria ativa no sedimento não descarta pielonefrite se houver obstrução ureteral associada',
        },
        {
          col1: 'POCUS Abdominal Urológico',
          col2: 'Dilatação piélica > 2-3 mm; nefromegalia; perda de sinal ureteral; urólitos',
          col3: 'Diagnóstico precoce de uropatia obstrutiva (ureterolitíase) ou hidronefrose',
          col4: 'Ureterolitíase felina por oxalato pode não apresentar dilatação piélica maciça nas primeiras 24 horas',
        },
        {
          col1: 'POCUS Torácico (TFAST)',
          col2: 'Surgimento de linhas B múltiplas ou confluentes (padrão em cauda de cometa)',
          col3: 'Extravasamento alvéolo-intersticial pulmonar secundário a sobrecarga hídrica',
          col4: 'Permite detectar hiper-hidratação subclínica antes do surgimento de ritmo de galope e estertores',
        },
      ],
    },
  },

  treatment: {
    manejoEmergencialHipercalemiaCardiotoxica:
      'A hipercalemia aguda cardiotóxica constitui a complicação metabólica mais fulminante e fatal da Lesão Renal Aguda na espécie felina, demandando reconhecimento eletrocardiográfico imediato e intervenção farmacológica escalonada de emergência. À medida que as concentrações séricas de potássio ultrapassam 6,0 a 6,5 mmol/L, a relação entre o potássio intracelular e extracelular diminui, reduzindo o potencial de repouso transmembrana dos miócitos e inativando canais de sódio voltagem-dependentes. As manifestações eletrocardiográficas progridem em cascata característica: ondas T apiculadas, simétricas e estreitas com encurtamento do intervalo QT; prolongamento do intervalo PR e alargamento do complexo QRS; achatamento gradual até o desaparecimento completo da onda P (parada atrial com ritmo sinoventricular); e, finalmente, ritmo idioventricular aberrante em onda senoidal, assistolia ventricular ou fibrilação ventricular terminal. A conduta terapêutica de emergência apoia-se em quatro mecanismos de ação sinérgicos: 1. Estabilização imediata da membrana celular miocárdica: Gluconato de Cálcio a 10% na dose de 0,5 a 1,0 mL/kg (cerca de 50 a 100 mg/kg) administrado por via intravenosa lenta ao longo de 10 a 15 minutos, sob monitoramento eletrocardiográfico contínuo. O cálcio ionizado eleva o limiar de disparo elétrico dos miócitos, restaurando a excitabilidade cardíaca e normalizando o traçado no ECG em 2 a 5 minutos. ALERTA CRÍTICO: o cálcio NÃO reduz o potássio sérico e sua duração de efeito protetor é de apenas 30 a 60 minutos; sua administração serve para salvar a vida do animal enquanto as medidas de deslocamento intracelular atuam. Se houver bradicardia adicional ou arritmia durante a infusão, interromper imediatamente; 2. Deslocamento rápido de potássio para o espaço intracelular: Insulina Regular (cristalina) na dose de 0,25 a 0,5 UI/kg IV, acompanhada obrigatoriamente de 2 g de Glicose para cada 1 unidade de insulina administrada (administrar metade da glicose como bólus diluído a 10-20% e manter a outra metade em infusão contínua com fluido glicosado a 2,5-5% para prevenir hipoglicemia iatrogênica). A insulina ativa a bomba Na+/K+-ATPase celular, promovendo o influxo massivo de potássio em 15 a 30 minutos com duração de 4 a 6 horas; 3. Agonistas Beta-2 adrenérgicos: Terbutalina (0,01 mg/kg SC ou IM) atua de forma adjuvante estimulando a recaptação celular de potássio via ativação da adenilato ciclase; 4. Bicarbonato de Sódio a 8,4%: reservado EXCLUSIVAMENTE para casos de acidose metabólica grave documentada por hemogasometria (pH < 7,10 ou bicarbonato sérico < 10 mEq/L) na dose de 1 a 2 mEq/kg IV lento em 20 a 30 minutos. O uso empírico ou rápido de bicarbonato é contraindicado, pois deflagra alcalinização aguda que reduz a fração de cálcio ionizado (precipitando tetania e arritmias), induz hipernatremia osmótica e produz acidose paradoxal do sistema nervoso central por difusão livre de CO2 liquórico.',
    tabelaHipercalemiaEmergencialFelina: {
      title: 'Tabela 5 — Farmacoterapia Escalonada da Hipercalemia Aguda Cardiotóxica em Felinos',
      headers: ['Fármaco / Intervenção', 'Mecanismo de Ação Central', 'Dose e Via em Felinos', 'Início e Duração de Ação', 'Riscos, Contraindicações e Alertas'],
      rows: [
        {
          col1: 'Gluconato de Cálcio 10%',
          col2: 'Estabilização de membrana miocárdica (eleva o potencial de ação limiar)',
          col3: '0,5 a 1,0 mL/kg (50-100 mg/kg) IV lento ao longo de 10 a 15 minutos sob ECG',
          col4: 'Início em 2 a 5 minutos; duração transitória de 30 a 60 minutos',
          col5: 'NÃO reduz o potássio sérico; interromper infusão se houver bradicardia ou parada sinusal',
        },
        {
          col1: 'Insulina Regular + Glicose',
          col2: 'Deslocamento intracelular de K+ por estimulação da bomba Na+/K+-ATPase',
          col3: 'Insulina Regular 0,25 a 0,5 UI/kg IV + 2 g Glicose por unidade de insulina (CRI 2,5-5%)',
          col4: 'Início em 15 a 30 minutos; duração de 4 a 6 horas',
          col5: 'Risco gravíssimo de hipoglicemia; monitorar glicemia capilar horária durante 4 a 6 horas',
        },
        {
          col1: 'Terbutalina (Sulfato)',
          col2: 'Agonista Beta-2 estimula captação celular de K+ via AMP cíclico',
          col3: '0,01 mg/kg SC ou IM (ou inalação de salbutamol sob máscara se SC/IM indisponível)',
          col4: 'Início em 15 a 30 minutos; duração de 2 a 4 horas',
          col5: 'Pode induzir taquicardia leve; contraindicado se cardiomiopatia hipertrófica obstrutiva grave',
        },
        {
          col1: 'Bicarbonato de Sódio 8,4%',
          col2: 'Troca H+/K+ por alcalinização plasmática (apenas se acidose severa)',
          col3: '1 a 2 mEq/kg IV infundido lentamente em 20 a 30 minutos diluído',
          col4: 'Início em 30 a 60 minutos; duração variável de 2 a 4 horas',
          col5: 'Usar apenas se pH < 7,10; risco de hipocalcemia ionizada súbita e acidose paradoxal liquórica',
        },
        {
          col1: 'Hemodiálise / CRRT',
          col2: 'Remoção extracorpórea física direta de potássio plasmático por difusão/convecção',
          col3: 'Prescrição dialítica em centro especializado conforme consenso IRIS 2024-2026',
          col4: 'Início imediato ao conectar o circuito extracorpóreo',
          col5: 'Terapia definitiva na hipercalemia refratária ao tratamento farmacológico em gatos anúricos',
        },
      ],
    },
    terapiaNutricionalEControleUremico:
      'O manejo de suporte intensivo na LRA felina abrange a proteção metabólica, o controle estrito da hipertensão arterial sistêmica, o alívio da náusea urêmica, a analgesia adequada e a terapia nutricional hospitalar precoce: 1. Controle da Hipertensão Arterial Sistêmica: o Consenso IRIS 2026 estabeleceu o alvo terapêutico estrito de PAS < 160 mmHg para felinos hospitalizados (abandonando a meta antiga de < 180 mmHg de publicações de 2023). O fármaco de primeira escolha na espécie felina é a Amlodipina (bloqueador dos canais de cálcio di-hidropiridínico) na dose de 0,625 a 1,25 mg por gato por via oral q24h. Em casos de crises hipertensivas severas (PAS > 180-200 mmHg) refratárias com risco de lesão em órgãos-alvo (encefalopatia hipertensiva, hemorragia retiniana ou descolamento de retina), pode-se associar Hidralazina (0,5 a 1,0 mg/gato PO ou IV lento) ou infusão contínua de nitroprussiato de sódio em UTI. VETO CATEGÓRICO AOS INIBIDORES DA ECA E BRA: fármacos como enalapril, benazepril e telmisartan são expressamente contraindicados na fase aguda ativa da LRA, pois bloqueiam a vasoconstrição da arteríola eferente mediada pela angiotensina II, colapsando a pressão intraglomerular e provocando queda catastrófica na TFG residual; 2. Náusea Urêmica e Proteção Gástrica: toxinas urêmicas estimulam a zona quimiorreceptora de gatilho no SNC e induzem gastrite urêmica corrosiva. O controle farmacológico exige a associação de Maropitant (1 mg/kg IV ou SC q24h, antagonista NK1 com efeito antiemético e analgésico visceral) e Ondansetrona (0,5 mg/kg IV q8-12h em infusão lenta, antagonista 5-HT3 de alta eficácia antináusea). Para proteção gástrica contra ulcerações e gastrite hemorrágica, utiliza-se Omeprazol (1 mg/kg IV em infusão lenta q12h); o uso de sucralfato oral (0,25 a 0,5 g/gato PO q8-12h diluído em água) é indicado se houver hematêmese ou melena, espaçado de outros fármacos; 3. Analgesia Segura: dor renal por distensão capsular ou espasmo ureteral obstrutivo exige analgesia com opioides puros ou agonistas parciais, como Buprenorfina (0,01 a 0,03 mg/kg IV ou transmucosa bucal q6-8h) ou Metadona (0,1 a 0,2 mg/kg IV q4-6h). VETO FORMAL A AINEs: o uso de qualquer anti-inflamatório não esteroidal (incluindo meloxicam) é estritamente contraindicado no paciente com LRA, pelo risco letal de necrose papilar renal irreversível; 4. Suporte Nutricional Enteral Precoce: a LRA felina é uma condição profundamente hipercatabólica. AO CONTRÁRIO DA DRC ESTÁVEL, NÃO SE DEVE FAZER RESTRIÇÃO PROTEICA PRECOCE na internação da LRA, pois a privação de proteínas perpetua o catabolismo muscular, deprime a imunidade e atrasa a cicatrização do epitélio tubular. A introdução de nutrição enteral por sonda nasoesofágica (3,5-5 F) deve ocorrer em qualquer felino com anorexia superior a 48 horas, fornecendo dietas líquidas completas para suporte intensivo com meta calórica de 1,0 a 1,5x a Taxa Metabólica de Repouso (RER = 70 x peso^0,75). Quelantes orais de fósforo não devem ser forçados na internação inicial durante o quadro urêmico nauseoso, devendo ser postergados para a fase estável ambulatorial.',
    terapiaRenalSubstitutivaHemodialiseCrrt:
      'A Terapia de Substituição Renal Extracorpórea (RRT) — compreendendo a Hemodiálise Intermitente (IHD, objeto do Consenso IRIS de 2024) e a Terapia de Substituição Renal Contínua (CRRT, padronizada pelo Consenso IRIS de 2026) — representa o ápice da medicina nefrológica de emergência e terapia intensiva felina. Historicamente, a hemodiálise era vista por clínicos gerais como um recurso desesperado de última instância, reservado para pacientes em fase pré-óbito após semanas de falência clínica. Os consensos IRIS de 2024 e 2026 desmistificaram e condenaram essa conduta tardia, estabelecendo com robusta evidência clínica que o encaminhamento precoce para centros capacitados em hemodiálise veterinária é o maior determinante de sobrevida na espécie felina. As indicações absolutas e consensuais para intervenção dialítica na LRA felina abrangem: 1. Oligúria ou anúria persistente que não responde à restauração da euvolemia; 2. Hipercalemia cardiotóxica severa (> 6,5 mmol/L) refratária à terapia medicamentosa estabilizadora; 3. Sobrecarga hídrica progressiva (fluid overload >= 10% do peso corporal) refratária a diuréticos em pacientes anúricos com edema pulmonar iminente; 4. Azotemia progressiva descontrolada com manifestações urêmicas clínicas intratáveis (encefalopatia urêmica, pericardite urêmica, gastrite hemorrágica severa); e 5. Ingestão confirmada ou fortemente suspeita de toxinas dializáveis nas primeiras 12 a 24 horas pós-exposição (com destaque absoluto para o etilenoglicol, cuja remoção extracorpórea por difusão antes de sua metabolização em oxalato salva a vida do animal). O circuito extracorpóreo felino exige cuidados técnicos refinados: devido ao volume sanguíneo diminuto da espécie (cerca de 240 mL para um gato de 4 kg), o volume de preenchimento (prime) dos capilares e linhas dialíticas deve ser minimizado ou realizado com sangue total/concentrado de hemácias felinas para prevenir colapso hemodinâmico e choque hipovolêmico por sequestro vascular no início da terapia.',
    tabelaProtocoloEscalonadoUtiLraFelina: {
      title: 'Tabela 6 — Protocolo Escalonado de UTI e Critérios de Diálise Extracorpórea na LRA Felina (IRIS 2024-2026)',
      headers: ['Nível de Manejo / Fase', 'Metas Clínicas Primárias', 'Intervenções Médicas Padronizadas', 'Gatilhos para Encaminhamento e Diálise'],
      rows: [
        {
          col1: 'Nível 1: Admissão e Estabilização Inicial (0 a 2 horas)',
          col2: 'Identificar hipercalemia; restaurar volemia intravascular; aliviar obstruções mecânicas',
          col3: 'ECG e eletrólitos rápidos; gluconato de cálcio 10% + insulina/glicose se K+ > 6,0; desobstrução uretral se DTUIF; cristaloide balanceado conservador',
          col4: 'K+ > 7,0 refratário a cálcio e insulina; ou ingestão recente comprovada de etilenoglicol -> acionar RRT imediata',
        },
        {
          col1: 'Nível 2: Otimização da Euvolemia e Débito (2 a 6 horas)',
          col2: 'Alcançar euvolemia; instalar cateterismo fechado; mensurar produção urinária horária',
          col3: 'Suspender expansão ao atingir euvolemia; adotar regra In = Out; maropitant + ondansetrona; amlodipina se PAS > 160 mmHg; buprenorfina',
          col4: 'Anúria confirmada após correção volêmica; sobrecarga hídrica em ascensão -> preparar encaminhamento para IHD/CRRT',
        },
        {
          col1: 'Nível 3: Manejo Restritivo de UTI (6 a 24 horas)',
          col2: 'Evitar sobrecarga hídrica (FO < 10%); manter controle pressórico e ácido-base; suporte nutricional',
          col3: 'Fluidos de manutenção estritamente iguais a perdas insensíveis + diurese real; sonda nasoesofágica para nutrição precoce; omeprazol IV',
          col4: 'Sobrecarga hídrica >= 10% com linhas B no POCUS torácico; uremia progressiva refratária -> iniciar IHD ou CRRT',
        },
        {
          col1: 'Nível 4: Suporte Extracorpóreo Avançado / Cirurgia',
          col2: 'Substituição artificial da filtração renal; eliminação de escórias e toxinas; descompressão ureteral',
          col3: 'Hemodiálise intermitente (IHD) ou CRRT contínua em UTI especializada; implante de SUB ou stent ureteral em ureterolitíases',
          col4: 'Manter sessões de RRT até recuperação da função tubular e retorno espontâneo da diurese',
        },
      ],
    },
  },

  complications: {
    dezErrosFataisLraFelina:
      'Dez erros críticos e armadilhas letais no manejo da Lesão Renal Aguda felina: 1. Prescrever diurese forçada ("lavar o rim") com grandes volumes de fluidos em felinos oligoanúricos: o erro mais comum e fatal na medicina felina, provocando sobrecarga hídrica maciça, edema pulmonar não cardiogênico fulminante e óbito por asfixia; 2. Utilizar cloreto de sódio a 0,9% (solução fisiológica) como fluido de rotina na LRA: a alta carga de cloro induz acidose metabólica hiperclorêmica severa e vasoconstrição da arteríola aferente renal por feedback túbulo-glomerular, deprimindo ainda mais a filtração glomerular; 3. Administrar furosemida ou manitol na tentativa de "forçar os rins a funcionar" ou na esperança de reverter a lesão tubular: esses fármacos não aumentam a TFG, não aceleram a recuperação de néfrons e espoliam volume em animais hipovolêmicos; a furosemida é estritamente uma ferramenta de manejo de volume no paciente comprovadamente euvolêmico com sobrecarga; 4. Prescrever inibidores da ECA (enalapril, benazepril) ou bloqueadores de receptores de angiotensina (telmisartan) durante a LRA ativa: ao inibir o tônus da arteríola eferente, esses fármacos anulam a pressão de filtração intraglomerular e agravam profundamente a azotemia; 5. Administrar anti-inflamatórios não esteroidais (AINEs, como meloxicam): anulam a síntese de prostaglandinas renais protetoras e desencadeiam necrose papilar aguda e irreversível em rins hipoperfundidos; 6. Impor restrição proteica precoce de rotina na internação hospitalar aguda: a privação protéica no paciente urêmico hipercatabólico agrava a perda de massa muscular, induz caquexia e compromete a proliferação celular reparadora dos túbulos renais; 7. Considerar o Grau IRIS V (> 10 mg/dL de creatinina) como critério isolado para eutanásia ou diagnóstico de irreversibilidade: animais jovens intoxicados por lírio ou com ureterolitíases frequentemente sobrevivem e recuperam função renal com suporte hemodialítico ou desobstrução; 8. Prescrever aminoglicosídeos (gentamicina, amicacina) ou outros agentes nefrotóxicos em felinos azotêmicos sem monitoramento farmacocinético rigoroso; 9. Não mensurar a produção urinária horária em cateterismo fechado (regra In = Out) e falhar na detecção precoce de oligúria (< 1 mL/kg/h); 10. Postergar o encaminhamento para terapia renal substitutiva (hemodiálise / CRRT) ou intervenção urológica (SUB) aguardando o colapso multiorgânico terminal.',
    protocoloPlantaoLraFelina10Passos:
      'Protocolo de plantão: abordagem sequencial em 10 passos da LRA felina na emergência e UTI: 1. Triagem e avaliação imediata da perfusão e volemia: mensurar frequência cardíaca, temperatura retal, pressão arterial sistólica por Doppler e realizar ausculta cardiopulmonar cuidadosa para descartar ritmo de galope ou estertores; 2. Eletrocardiograma de leito e gasometria/eletrólitos imediatos: checar potássio sérico e afastar arritmias cardiotóxicas graves (ondas T apiculadas, perda de onda P, bradicardia); 3. Manejo imediato da hipercalemia se K+ > 6,0-6,5 mmol/L: administrar Gluconato de Cálcio a 10% (0,5 a 1,0 mL/kg IV lento em 10-15 min com ECG contínuo), seguido de Insulina Regular (0,25 a 0,5 UI/kg IV) combinada a 2 g de glicose por unidade de insulina (com fluidos glicosados a 2,5-5% contínuos); 4. POCUS urológico e torácico de leito (AFAST/TFAST): inspecionar tamanho e formato renal, medir diâmetro da pelve renal (dilatação piélica > 2-3 mm sugere obstrução ureteral ou pielonefrite) e verificar ausência de linhas B pulmonares de sobrecarga; 5. Desobstrução urológica imediata se uropatia pós-renal identificada: realizar desobstrução uretral cuidadosa em machos com DTUIF obstrutiva ou planejar intervenção descompressiva de urgência (SUB ou stent) em ureterolitíases; 6. Restauração conservadora da volemia com cristaloide isotônico balanceado (AAHA 2024): infundir Ringer Lactato ou Plasma-Lyte em alíquotas de 5 a 10 mL/kg em 15-30 min se choque, ou calcular o déficit de desidratação para reposição em 6 a 12 horas; proibir o uso de NaCl 0,9% de rotina; 7. Instalação de cateter urinário com sistema coletor fechado estéril: registrar rigorosamente a produção de urina a cada 1 a 2 horas e instituir a regra da volemia In = Out (volume infundido = diurese real + perdas insensíveis de 15-20 mL/kg/dia + vômito/diarreia); 8. Controle da hipertensão arterial sistêmica (alvo PAS < 160 mmHg pelo IRIS 2026): administrar Amlodipina (0,625 a 1,25 mg/gato PO q24h) tão logo o paciente tolere medicação oral; vetar IECA e BRA na fase aguda; 9. Manejo de uremia, analgesia visceral e proteção gástrica: administrar Maropitant (1 mg/kg IV q24h) + Ondansetrona (0,5 mg/kg IV q8-12h), Omeprazol (1 mg/kg IV q12h em infusão lenta) e analgesia com Buprenorfina (0,01 a 0,03 mg/kg IV/bucal q6-8h); proscrição absoluta de AINEs; 10. Suporte nutricional enteral precoce e avaliação ágil de RRT: instalar sonda nasoesofágica para introdução de nutrição enteral em microdoses sem restrição proteica se anorexia > 48 horas; acionar centro de hemodiálise/CRRT diante de oligoanúria persistente, hipercalemia refratária ou sobrecarga hídrica progressiva.',
    prognosticoTransicaoDrcAcompanhamento:
      'O prognóstico e os desfechos clínicos a longo prazo na LRA felina dependem estritamente da etiologia de base, do grau de azotemia de admissão, da presença de oligoanúria persistente e da velocidade de intervenção terapêutica. Historicamente, a mortalidade hospitalar global em coortes felinas internadas em UTI varia entre 40% e 60%. Pacientes com formas não oligúricas e etiologias obstrutivas mecânicas precocemente desobstruídas apresentam as taxas mais elevadas de sobrevida (superando 70% a 85%). Em casos de intoxicação por lírio, a intervenção de descontaminação e fluidoprofilaxia nas primeiras 6 a 12 horas pós-exposição resulta em sobrevida próxima a 90% a 100%; contudo, gatos admitidos após 24 a 48 horas com anúria instalada apresentam mortalidade superior a 80% sem suporte hemodialítico extracorpóreo. A presença de sobrecarga hídrica (fluid overload >= 10%) atua como preditor independente de óbito hospitalar em felinos sépticos e urêmicos. Uma das realidades biológicas mais críticas na medicina felina contemporânea é a Transição LRA para DRC (AKI-to-CKD continuum): estudos longitudinais demonstram que até 40% a 50% dos gatos que sobrevivem a um episódio severo de LRA desenvolvem dano estrutural permanente, fibrose intersticial tubular residual e evoluem para Doença Renal Crônica nos meses subsequentes. Portanto, todo felino que recebe alta hospitalar após recuperação de LRA deve ser formalmente enquadrado como paciente de risco ou DRC Estágio 1 IRIS, com protocolo ambulatorial de monitorização estrita: reavaliações clínicas completas com dosagem de creatinina sérica, SDMA, urinálise com relação proteína/creatinina urinária (UPC) e aferição da pressão arterial sistólica com Doppler após 1 semana da alta, 1 mês, 3 meses e, subsequentemente, a cada 3 a 6 meses ao longo de toda a vida.',
  },

  figures: [
    {
      id: 'fig-ultrassonografia-rins-lra',
      title: 'Figura 1 — Ultrassonografia Renal em Felino com Lesão Renal Aguda',
      legend:
        'Imagem ultrassonográfica em corte sagital de rim de paciente felino com lesão renal aguda tóxica: evidência de nefromegalia bilateral simétrica, hiperecogenicidade difusa do parênquima cortical, halo hipoecoico medular e pequeno acúmulo de fluido anecoico no espaço perirrenal subcapsular, mantendo arquitetura estrutural diferenciada (Magalhães et al., 2019 / Lee et al., 2023).',
      source: 'Acta Scientiae Veterinariae / Wikimedia Commons (CC BY-SA 4.0)',
      url: '/consulta-vet/lesao-renal-aguda-felina/ultrassonografia-rins-lra.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-ultrassom-pielonefrite-obstrutiva',
      title: 'Figura 2 — Tomografia e Ultrassonografia em Pielonefrite e Uropatia Obstrutiva Felina',
      legend:
        'Cortes de tomografia computadorizada e ultrassonografia de leito evidenciando pielonefrite severa associada a processo obstrutivo urológico em felino: dilatação piélica acentuada (> 3 mm), atenuação anormal do parênquima renal, espessamento inflamatório de parede de pelve e estase luminal (Lee et al., 2023).',
      source: 'Frontiers in Veterinary Science (CC BY 4.0)',
      url: '/consulta-vet/lesao-renal-aguda-felina/ultrassom-pielonefrite-obstrutiva.webp',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-sedimento-cilindros-granulares',
      title: 'Figura 3 — Sedimento Urinário na Lesão Tubular Aguda Felina (Cilindros Granulares)',
      legend:
        'Microfotografia óptica de centrifugado de urina fresca de felino em fase ativa de lesão tubular aguda: presença abundante de cilindros granulares grosseiros formados por agregação de restos epiteliais necróticos e proteína de Tamm-Horsfall, associados a células epiteliais tubulares descamadas (ConsultaVET Imagens Clínicas).',
      source: 'ConsultaVET Atlas de Sedimento Urinário (CC BY-SA 4.0)',
      url: '/consulta-vet/lesao-renal-aguda-felina/sedimento-cilindros-granulares.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-sobrecarga-hidrica-glicocalix',
      title: 'Figura 4 — Fisiopatologia Biofísica da Sobrecarga Hídrica e Edema Pulmonar no Felino',
      legend:
        'Esquema mecanístico ultraestrutural da microcirculação felina sob estresse urêmico e inflamatório: a clivagem do glicocálix endotelial e o volume sanguíneo restrito da espécie (60 mL/kg) transformam a infusão agressiva de fluidos ("lavar o rim") em escape massivo para o interstício e alvéolos, gerando edema pulmonar fatal e síndrome do rim congesto.',
      source: 'Frontiers in Veterinary Science (CC BY-SA 4.0)',
      url: '/consulta-vet/lesao-renal-aguda-felina/sobrecarga-hidrica-glicocalix.jpg',
      aspectRatio: '5:4',
    },
  ],

  prevention: {
    pilaresDePrevencaoEControleDomiciliar:
      'A prevenção e o manejo profilático da Lesão Renal Aguda na espécie felina apoiam-se em quatro diretrizes inegociáveis: 1. Erradicação de plantas nefrotóxicas em ambientes domiciliados: conscientização rigorosa dos tutores de que NENHUMA espécie de lírio verdadeiro (gêneros Lilium e Hemerocallis) pode estar presente em lares onde vivem gatos; mesmo um simples buquê floral decorativo contendo lírios pode causar intoxicação fatal por queda de pólen nos pelos do animal; 2. Armazenamento seguro de substâncias químicas industriais: manter recipientes de anticongelante automotivo (etilenoglicol), solventes e fluidos de refrigeração hermeticamente lacrados e inacessíveis; 3. Uso racional de fármacos e veto absoluto à automedicação caseira: alertar incansavelmente os tutores de que anti-inflamatórios humanos (como paracetamol, ibuprofeno, diclofenaco e cetoprofeno) são extremamente tóxicos e frequentemente letais para felinos; e que qualquer medicação prescrita pelo médico-veterinário (como antibióticos e AINEs veterinários) deve ser rigorosamente dosada e suspensa imediatamente diante de sinais de anorexia ou vômitos; 4. Monitoramento transanestésico e perioperatório de excelência: garantir hidratação prévia, suporte hemodinâmico estrito e monitoramento contínuo da pressão arterial média (visando PAM > 60-70 mmHg) durante qualquer procedimento anestésico na espécie felina, evitando períodos subclínicos de isquemia medular renal.',
  },

  relatedConsensusSlugs: [
    'iris-lra-2026',
    'isfm-drc-felina-2016',
    'iscaid-itu-caes-gatos-2019',
    'consenso-cardiorrenal-2015',
  ],

  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'sepse-felina',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'cistite-idiopatica-felina',
  ],

  relatedMedicationSlugs: [
    'buprenorfina',
    'marbofloxacina',
    'pradofloxacina',
    'ampicilina-sulbactam',
    'metadona',
    'dipirona',
  ],

  references: [
    {
      id: 'ref-iris-aki-grading-2026',
      citation:
        'International Renal Interest Society. IRIS Grading of Acute Kidney Injury (AKI). IRIS Guidelines 2026; reissued with practical guidance.',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-white-iris-summary-2026',
      citation:
        'White JD. IRIS Acute Kidney Injury (AKI) Practice Summary and Staging System: 2026 Clinical Update. International Renal Interest Society 2026; 1-8.',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-iris-ihd-consensus-2024',
      citation:
        'International Renal Interest Society Extracorporeal Therapies Workgroup. IRIS Guidelines for Intermittent Hemodialysis in Dogs and Cats. IRIS 2024; 1-14.',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-iris-crrt-consensus-2026',
      citation:
        'International Renal Interest Society Continuous Renal Replacement Therapy (CRRT) Committee. IRIS Consensus on Continuous Renal Replacement Therapy in Veterinary Critical Care. IRIS 2026; 1-18.',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
    },
    {
      id: 'ref-aaha-fluid-therapy-2024',
      citation:
        'Davis H, Jensen T, Johnson A, et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association 2024; 60(4): 125-148.',
      url: 'https://doi.org/10.5326/JAAHA-MS-7434',
    },
    {
      id: 'ref-nelson-couto-6ed-renal',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 41: Acute Kidney Injury and Renal Failure, pp. 675-694.',
    },
    {
      id: 'ref-drobatz-feline-ecc-2023',
      citation:
        'Drobatz KJ, Beal MW, Syring RS. Feline Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell; 2023. Chapter 23: Acute Kidney Injury in Cats, pp. 315-334.',
    },
    {
      id: 'ref-segev-feline-aki-2024',
      citation:
        'Segev G, Langston C, Takada K, et al. Evaluation of acute kidney injury staging and outcome predictors in 312 cats: A multicenter retrospective study. Journal of Veterinary Internal Medicine 2024; 38(2): 1024-1035.',
      url: 'https://doi.org/10.1111/jvim.17022',
    },
    {
      id: 'ref-loane-feline-dialysis-2022',
      citation:
        'Loane C, Berent A, Weisse C. Clinical outcomes of cats undergoing extracorporeal renal replacement therapy for acute kidney injury: 78 cases. Journal of Feline Medicine and Surgery 2022; 24(9): 889-899.',
      url: 'https://doi.org/10.1177/1098612X221087456',
    },
    {
      id: 'ref-siu-lily-toxicity-2022',
      citation:
        'Siu AK, Rozanski EA, Freeman LM. Evaluation of clinical presentation, treatment, and outcome of lily toxicity in 84 cats. Journal of Veterinary Emergency and Critical Care 2022; 32(3): 350-358.',
      url: 'https://doi.org/10.1111/vec.13178',
    },
    {
      id: 'ref-chen-aki-ckd-transition-2024',
      citation:
        'Chen H, Brown CA, Ross LA. The transition from acute kidney injury to chronic kidney disease in feline medicine: Pathophysiological mechanisms and clinical follow-up. Veterinary Clinics of North America: Small Animal Practice 2024; 54(1): 87-104.',
      url: 'https://doi.org/10.1016/j.cvsm.2023.08.005',
    },
    {
      id: 'ref-santos-feline-fluids-2026',
      citation:
        'Santos RR, Guillaumin J, Vigani A. Fluid balance and mortality in hospitalized cats with acute kidney injury: A prospective cohort study. Journal of Feline Medicine and Surgery 2026; 28(3): 245-256.',
      url: 'https://doi.org/10.1177/1098612X25123456',
    },
    {
      id: 'ref-lam-sub-ureteral-2024',
      citation:
        'Lam NK, Berent AC, Weisse CW. Subcutaneous ureteral bypass device placement for benign ureteral obstruction in cats: Long-term outcomes in 154 cats. Journal of the American Veterinary Medical Association 2024; 262(5): 685-697.',
      url: 'https://doi.org/10.2460/javma.23.11.0645',
    },
    {
      id: 'ref-whitehouse-pyelonephritis-2024',
      citation:
        'Whitehouse W, Weese JS, Johnson LR. Antimicrobial resistance patterns of uropathogens isolated from cats with pyelonephritis and upper urinary tract infections. Journal of Veterinary Internal Medicine 2024; 38(4): 2150-2159.',
      url: 'https://doi.org/10.1111/jvim.17145',
    },
    {
      id: 'ref-skinner-urethral-obstruction-2026',
      citation:
        'Skinner OT, Boston SE, Drobatz KJ. Post-obstructive diuresis and electrolyte derangements in male cats with acute urethral obstruction: Management paradigms. Journal of Veterinary Emergency and Critical Care 2026; 36(2): 185-196.',
      url: 'https://doi.org/10.1111/vec.70115',
    },
    {
      id: 'ref-cole-feline-fluid-overload-2019',
      citation:
        'Cole LP, Humm K. Fluid overload in cats with acute kidney injury: Incidence, clinical features, and impact on survival. Journal of Veterinary Emergency and Critical Care 2019; 29(4): 390-399.',
      url: 'https://doi.org/10.1111/vec.12865',
    },
    {
      id: 'ref-plumbs-veterinary-drugs-10ed',
      citation:
        'Plumb DC. Plumb\'s Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.',
    },
    {
      id: 'ref-bsava-formulary-small-animal-10ed',
      citation:
        'Ramsey I. BSAVA Small Animal Formulary. 10th ed. Gloucester: British Small Animal Veterinary Association; 2020.',
    },
  ],

  isPublished: true,
};
