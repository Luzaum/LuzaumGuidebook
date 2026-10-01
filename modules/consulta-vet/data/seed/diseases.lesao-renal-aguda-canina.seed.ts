import { DiseaseRecord } from '../../types/disease';

export const lesaoRenalAgudaCaninaRecord: DiseaseRecord = {
  id: 'disease-lesao-renal-aguda-canina',
  slug: 'lesao-renal-aguda-canina',
  title: 'Lesão Renal Aguda em Cães (LRA / IRA / AKI)',
  subtitle: 'Consenso IRIS AKI 2026, Leptospirose, Uvas/Passas, Manejo Volêmico Restritivo e Terapias Extracorpóreas',
  synonyms: [
    'Injúria renal aguda canina',
    'Insuficiência renal aguda em cães',
    'Acute Kidney Injury in dogs',
    'Canine AKI',
    'IRA canina',
    'LRA canina',
    'Azotemia renal aguda canina',
    'Necrose tubular aguda em cães',
    'Nefrose tóxica canina',
    'Acute-on-chronic kidney disease canina (AoCKD)',
  ],
  species: ['dog'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'infectologia',
    'clinica-medica',
  ],
  isPublished: true,
  tags: [
    'LRA Canina',
    'Injúria Renal Aguda',
    'Consenso IRIS 2026',
    'IRIS AKI Grading',
    'Leptospirose Canina',
    'Leptospira interrogans',
    'LPHS',
    'Ácido Tartárico',
    'Uvas e Passas',
    'Etilenoglicol',
    'AINEs',
    'AAHA Fluidos 2024',
    'Ins and Outs',
    'Fim da Diurese Forçada',
    'Hipercalemia Cardiotóxica',
    'Hemodiálise / CRRT',
    'Nelson & Couto',
    'Critical Care Silverstein',
  ],
  quickSummary:
    'A lesão renal aguda (LRA / AKI) em cães é uma síndrome clínica de início abrupto (horas a dias) caracterizada pelo declínio rápido da taxa de filtração glomerular (TFG), resultando em acúmulo de solutos urêmicos, desequilíbrio hidroeletrolítico potencialmente letal e acidose metabólica. Atualizada segundo as diretrizes da Sociedade Internacional de Interesse Renal (Consenso IRIS AKI reemitido em 2026), as diretrizes da AAHA Fluid Therapy Guidelines 2024 e o Consenso ACVIM sobre Leptospirose Canina (2023), a abordagem contemporânea aboliu formalmente o conceito de diurese forçada ("lavar o rim"). Fluidos intravenosos corrigem a hipovolemia e restauram a perfusão, mas são incapazes de regenerar células tubulares necrosadas; a sobrecarga hídrica (fluid overload >= 5-10% do peso corporal) correlaciona-se diretamente com óbito em cães por edema pulmonar e síndrome do rim congesto. O estadiamento IRIS I a V classifica a gravidade com base na creatinina sérica e na sua cinética (aumento agudo >= 0,3 mg/dL em 48h documenta LRA mesmo com valores dentro do intervalo de referência), associado a subestágios mandatórios de débito urinário (não-oligúrico >= 1,0 mL/kg/h versus oligoanúrico < 1,0 mL/kg/h), necessidade de terapia de substituição renal (RRT) e pressão arterial sistêmica (alvo PAS < 160 mmHg). As principais causas em cães incluem a leptospirose zoonótica (Leptospira interrogans, exigindo PCR e sorologia MAT combinados, tratamento com ampicilina parenteral inicial e doxiciclina oral por 14 dias para erradicar o estado de portador renal, com rigorosa biossegurança), nefrotoxicidade por uvas e passas (necrose tubular por ácido tartárico), intoxicação por etilenoglicol (cristais em ponta de cerca de oxalato de cálcio mono-hidratado e tratamento com fomepizole/4-MP), isquemia perioperatória e nefropatia por AINEs. Uma vez alcançada a euvolemia, o aporte hídrico deve seguir milimetricamente a regra de entradas e saídas (Ins and Outs: débito urinário + perdas insensíveis de 20 mL/kg/dia + perdas gastrointestinais). O protocolo de UTI exige reversão imediata da hipercalemia cardiotóxica (gluconato de cálcio 10%, insulina com glicose e agonistas beta-2) e indicação precoce de terapias de purificação extracorpórea (hemodiálise intermitente ou CRRT) em oligoanúria refratária ou sobrecarga volêmica.',

  quickSummaryRich: {
    lead:
      'A lesão renal aguda canina é uma emergência crítica de falência súbita da filtração glomerular. A conduta contemporânea aboliu a superidratação forçada ("lavar o rim") em favor da fluidoterapia restritiva guiada por Ins and Outs, prevenindo a sobrecarga hídrica letal. A cinética da creatinina (delta >= 0,3 mg/dL em 48h) define a lesão precocemente, enquanto a identificação tempestiva de causas reversíveis — especialmente leptospirose zoonótica, intoxicação por uvas/ácido tartárico e etilenoglicol — aliada ao suporte dialítico oportuno define a sobrevida do paciente.',
    pillars: [
      {
        title: 'Fim da Diurese Forçada e Regra de Ins & Outs',
        body:
          'Superação do mito de "lavar o rim": fluidos restauram a euvolemia, mas não ressuscitam túbulos necrosados. Uma vez euvolêmico, o aporte hídrico deve igualar exatamente as perdas medidas (débito urinário + perdas insensíveis de 20 mL/kg/dia + vômito/diarreia). A sobrecarga hídrica (>= 5-10%) eleva a mortalidade por edema pulmonar e compressão renal sob a cápsula inelástica.',
        highlights: ['fim de lavar o rim', 'regra de Ins and Outs', 'perdas insensíveis 20 mL/kg/dia', 'sobrecarga hídrica letal'],
      },
      {
        title: 'Cinética da Creatinina e Estadiamento IRIS 2026',
        body:
          'O diagnóstico precoce não depende de azotemia extrema: elevação absoluta na creatinina sérica >= 0,3 mg/dL em 48 horas documenta LRA ativa (Grau I), mesmo com creatinina basal normal. O estadiamento IRIS de I a V orienta prognóstico e exige subestadiamento por débito urinário (não-oligúrico >= 1 mL/kg/h vs oligoanúrico), necessidade de diálise (RRT) e pressão arterial.',
        highlights: ['delta >= 0,3 mg/dL em 48h', 'estadiamento IRIS I a V', 'subestágio de débito urinário', 'alvo PAS < 160 mmHg'],
      },
      {
        title: 'Identificação Etiológica: Leptospirose e Toxinas',
        body:
          'Investigação imediata das causas primárias caninas: leptospirose zoonótica (PCR em sangue/urina e MAT pareada; tratamento com ampicilina IV e doxiciclina oral com EPIs); nefrotoxicidade por uvas/passas (ácido tartárico com necrose tubular proximal); e etilenoglicol (cristais de oxalato monoidratado em ponta de cerca; antídoto fomepizole/4-MP precoce).',
        highlights: ['leptospirose zoonótica', 'PCR e MAT pareada', 'uvas e ácido tartárico', 'etilenoglicol e fomepizole'],
      },
      {
        title: 'Controle da Hipercalemia e Suporte Dialítico Ágil',
        body:
          'Hipercalemia (> 6,5 mmol/L) em pacientes oligoanúricos é emergência cardiotóxica iminente (ondas T apiculadas, perda de onda P e fibrilação). Estabilização imediata da membrana miocárdica com gluconato de cálcio 10%, seguido de influxo intracelular com insulina/glicose e terbutalina. Terapias extracorpóreas (IHD/CRRT) indicadas precocemente em anúria e sobrecarga.',
        highlights: ['gluconato de cálcio 10%', 'insulina regular com glicose', 'terbutalina', 'hemodiálise intermitente e CRRT'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial na LRA Canina (Consenso IRIS 2026)',
      steps: [
        {
          label: 'Passo 1: Triagem de Volemia, Perfusão e Biomarcadores de Urgência',
          detail: 'Avaliar estado hemodinâmico, tempo de preenchimento capilar, pulsos e peso corporal basal. Coletar sangue para creatinina sérica, ureia, potássio, sódio, cloro, fósforo, hemograma completo e hemogasometria.',
          timing: 'Primeiros 15 a 30 minutos',
        },
        {
          label: 'Passo 2: Urinálise Completa Pré-Fluido e Densidade Urinária',
          detail: 'Colher amostra de urina estéril por cistocentese ou cateterismo antes de fluidos vigorosos. Avaliar densidade por refratometria (isostenúria 1.008-1.012 indica perda de capacidade de concentração), glicosúria normoglicêmica e sedimento com pesquisa de cilindros granulares e cristais.',
          timing: 'Imediato (pré-fluido)',
        },
        {
          label: 'Passo 3: POCUS Abdominal e Trato Urinário Completo',
          detail: 'Ultrassonografia renal e urinária focada: excluir causas pós-renais obstrutivas (urolitíase, dilatação de pelve > 2 mm, ruptura vesical/uroabdome). Avaliar ecogenicidade cortical, sinal do halo medular e tamanho renal (nefromegalia simétrica é típica de LRA).',
          timing: 'Primeira hora',
        },
        {
          label: 'Passo 4: Investigação Etiológica Específica de Leptospirose',
          detail: 'Em todo cão com LRA de causa não estabelecida, coletar sangue total com EDTA e urina para PCR de Leptospira interrogans antes do antibiótico, e soro para teste de aglutinação microscópica (MAT). Instituir biossegurança de zoonose imediatamente.',
          timing: 'Primeira hora de atendimento',
        },
        {
          label: 'Passo 5: Triagem Específica de Nefrotoxinas e AINEs',
          detail: 'Anamnese minuciosa pesquisando ingestão de uvas frescas, uvas passas, anticongelante automotivo (etilenoglicol), lírios em residências com gatos, AINEs de uso humano ou veterinário, e picada de serpente botrópica/crotálica.',
          timing: 'Admissão',
        },
        {
          label: 'Passo 6: Sondagem Uretral Fechada e Mensuração Horária do Débito',
          detail: 'Em pacientes com suspeita de oligúria, instalar sistema fechado de cateterismo vesical com bolsa coletora estéril e mensuração horária de urina. Classificar em Não-Oligúrico (>= 1,0 mL/kg/h) versus Oligoanúrico (< 1,0 mL/kg/h).',
          timing: 'Primeiras 2 a 4 horas',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Escalonado de UTI Canina (AAHA 2024 / IRIS 2026)',
      steps: [
        {
          label: 'Passo 1: Restauração da Euvolemia com Cristaloides Balanceados',
          detail: 'Se o paciente estiver desidratado ou hipovolêmico, infundir cristaloides isotônicos balanceados (Ringer Lactato ou Plasma-Lyte 148). Em choque hipovolêmico, usar alíquotas de 10 a 20 mL/kg em 15-30 min com reavaliação contínua. Evitar salina a 0,9% de rotina para prevenir acidose hiperclorêmica.',
          timing: 'Primeiras 2 a 6 horas',
        },
        {
          label: 'Passo 2: Transição Rígida para a Regra de "Ins and Outs"',
          detail: 'Assim que a euvolemia for alcançada, cessar infusões empíricas. O aporte hídrico de manutenção deve corresponder estritamente ao débito urinário horário medido mais perdas insensíveis (20 mL/kg/dia em cães) mais perdas contemporâneas por vômito e diarreia.',
          timing: 'Após atingir euvolemia',
        },
        {
          label: 'Passo 3: Manejo Emergencial da Hipercalemia Cardiotóxica',
          detail: 'Se K+ > 6,5 mmol/L com alterações no ECG (ondas T altas, ausência de onda P, QRS alargado): administrar gluconato de cálcio 10% (0,5 a 1,0 mL/kg IV lento sob ECG), seguido de insulina regular (0,25 a 0,5 UI/kg IV) com 2 g de glicose por unidade de insulina e terbutalina.',
          timing: 'Imediato se K+ elevado',
        },
        {
          label: 'Passo 4: Antibioticoterapia Guiada para Leptospirose',
          detail: 'Iniciar ampicilina sódica (20 a 30 mg/kg IV q6-8h) em cães anoréxicos ou com vômitos. Assim que o trato gastrointestinal tolerar, fazer transição para doxiciclina oral (5 mg/kg q12h por 14 dias ininterruptos) para erradicar a colonização dos túbulos renais e o estado de portador.',
          timing: 'Primeira hora após coleta',
        },
        {
          label: 'Passo 5: Desafio Diurético Criterioso em Oligoanúria Euvolêmica',
          detail: 'Se o paciente permanecer oligoanúrico (< 1 mL/kg/h) a despeito de comprovadamente euvolêmico, realizar desafio com furosemida (2 mg/kg IV em bólus; ou 0,5 a 1,0 mg/kg/h em CRI). Se não houver resposta em 2 a 4 horas, suspender a furosemida para evitar ototoxicidade e acúmulo.',
          timing: 'Após confirmação de euvolemia',
        },
        {
          label: 'Passo 6: Terapias de Purificação Extracorpórea (IHD / CRRT / DP)',
          detail: 'Acionar serviço de terapia renal substitutiva (hemodiálise intermitente, CRRT ou diálise peritoneal) sem demora diante de anúria persistente, hipercalemia refratária, acidose metabólica grave incontrolável ou sobrecarga de volume (>= 5-10% do peso).',
          timing: 'Primeiras 12 a 24 horas',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      headers: ['Parâmetro / Achado', 'Condição Clínica', 'Interpretação Fisiopatológica', 'Conduta Imediata de Plantão'],
      rows: [
        {
          parametro: 'Creatinina Sérica',
          condicao: 'Aumento >= 0,3 mg/dL em relação ao basal em 48h',
          interpretacao: 'Lesão Renal Aguda Ativa (IRIS Grau I); perda subclínica de filtração glomerular',
          conduta: 'Internação em UTI, suspender nefrotóxicos, urinálise pré-fluido, rastrear leptospirose e monitorar débito',
        },
        {
          parametro: 'Potássio Sérico (K+)',
          condicao: 'K+ > 6,5 mmol/L com onda T apiculada ou bradicardia',
          interpretacao: 'Hipercalemia cardiotóxica com risco iminente de assistolia ou FV',
          conduta: 'Gluconato de cálcio 10% (0,5-1 mL/kg IV lento sob ECG), seguido de Insulina Regular + Glicose e Terbutalina',
        },
        {
          parametro: 'Débito Urinário',
          condicao: '< 1,0 mL/kg/h após 4-6h de reposição volêmica euvolêmica',
          interpretacao: 'LRA Oligoanúrica; necrose tubular aguda extensa ou obstrução não identificada',
          conduta: 'Sondagem uretral fechada, ultrassom para excluir obstrução, restringir fluidos (Ins and Outs) e avaliar diálise',
        },
        {
          parametro: 'Balanço Hídrico',
          condicao: 'Ganho de peso >= 5% a 10% com quimose, linhas B no POCUS ou crepitação',
          interpretacao: 'Sobrecarga hídrica iatrogênica (Fluid Overload); edema pulmonar e síndrome do rim congesto',
          conduta: 'Interromper fluidos intravenosos imediatamente; furosemida se responsivo; indicar hemodiálise/CRRT para ultrafiltração',
        },
        {
          parametro: 'Sedimento Urinário',
          condicao: 'Cristais de oxalato de cálcio monoidratado (ponta de cerca / haltere)',
          interpretacao: 'Intoxicação aguda por etilenoglicol (anticongelante automotivo)',
          conduta: 'Fomepizole (4-MP) 20 mg/kg IV imediato (ou etanol 20%); hemodiálise de emergência nas primeiras horas',
        },
      ],
    },
  },

  quickDecisionStrip: [
    'Aumento de creatinina sérica >= 0,3 mg/dL em 48h comprova LRA ativa pelo Consenso IRIS 2026, mesmo dentro do intervalo normal.',
    'Abolir a diurese forçada ("lavar o rim"): restaurar euvolemia e igualar estritamente entradas e saídas (Ins and Outs: débito + 20 mL/kg/dia).',
    'Sobrecarga hídrica (>= 5-10% de ganho de peso) eleva a mortalidade em cães por edema pulmonar e colapso microvascular renal sob a cápsula inelástica.',
    'Suspeitar ativamente de leptospirose em todo cão com LRA: isolamento com EPIs, coletar sangue/urina para PCR e MAT, e iniciar ampicilina/doxiciclina.',
    'Hipercalemia > 6,5 mmol/L é emergência com risco de parada: gluconato de cálcio 10% (0,5-1 mL/kg IV lento) sob ECG antes de qualquer manobra.',
  ],

  etiology: {
    conceitoEClassificacaoEtiologicaCanina:
      'A lesão renal aguda (LRA) no cão é classificada fisiopatologicamente em três grandes compartimentos etiológicos: pré-renal, renal intrínseca e pós-renal. A LRA pré-renal decorre da hipoperfusão glomerular sem lesão estrutural primária das células tubulares, sendo prontamente corrigível com a restauração volêmica e perfusional nas primeiras 6 a 12 horas. Contudo, se a isquemia hipoperfusional persistir, evolui inevitavelmente para necrose tubular aguda isquêmica (LRA renal intrínseca). A LRA renal intrínseca resulta de insultos tóxicos, infecciosos, isquêmicos ou inflamatórios direcionados aos túbulos renais, interstício ou glomérulos. A LRA pós-renal resulta de obstrução aguda ao fluxo urinário bilateral (ou unilateral em rim único funcional) ou de uroabdome decorrente de ruptura vesical, ureteral ou uretral.',
    leptospiroseCaninaEpidemiologiaSorovares:
      'A leptospirose, causada por espiroquetas patogênicas do complexo Leptospira interrogans sensu lato, é uma das principais causas de LRA renal intrínseca e icterícia em cães no Brasil e no mundo. A transmissão ocorre primariamente pelo contato direto com urina de roedores infectados ou indireto através de água de enchentes, poças, lama e solo úmido contaminados. As bactérias penetram através de mucosas intactas ou abrasões cutâneas, disseminam-se rapidamente pela corrente sanguínea durante a fase leptospirêmica e colonizam o epitélio dos túbulos contorcidos proximais e o interstício renal, deflagrando nefrite tubulointersticial linfoplasmocitária aguda com edema cortical intenso. Os principais sorovares associados à LRA canina incluem Pomona, Grippotyphosa, Icterohaemorrhagiae, Canicola, Bratislava, Australis e Autumnalis. Uma complicação hiperaguda de alta letalidade é a Síndrome da Hemorragia Pulmonar por Leptospirose (LPHS), mediada por toxinas bacterianas e vasculite imune, manifestando-se por hemoptise, dispneia grave e infiltrado interstício-alveolar bilateral difuso.',
    nefrotoxinasCaninasUvasPassasAcidoTartarico:
      'Nefrotoxinas constituem etiologia primordial de necrose tubular aguda (NTA) tóxica em cães. Dentre elas, destacam-se: 1) Uvas frescas e uvas passas (Vitis vinifera): estudos contemporâneos (Coit et al., 2021; Wegenast et al., 2022) identificaram o ácido tartárico e o bitartarato de potássio como os princípios tóxicos causadores de necrose tubular proximal aguda fulminante. A suscetibilidade canina exibe marcante variação idiossincrática, onde doses pequenas podem desencadear anúria em cães sensíveis. 2) Etilenoglicol: componente de anticongelantes automotivos, altamente palatável. Seus metabólitos hepáticos (glicoaldeído, ácido glicólico e ácido oxálico) precipitam como cristais insolúveis de oxalato de cálcio monoidratado nos túbulos, causando destruição mecânica e química maciça com acidose metabólica grave com hiato antermico elevado. 3) Anti-inflamatórios não esteroidais (AINEs): meloxicam, carprofeno, cetoprofeno e sobretudo ibuprofeno e flunixina em doses inadequadas inibem as enzimas COX-1 e COX-2, suprimindo a síntese de prostaglandinas vasodilatadoras renais (PGE2 e PGI2). Em animais hipovolêmicos ou hipotensos, a perda do tônus dilatador da arteríola aferente colapsa o fluxo sanguíneo medular, culminando em necrose de crista/papila renal. 4) Aminoglicosídeos (gentamicina, amicacina): acumulam-se nos lisossomos do epitélio tubular proximal, causando perda de borda em escova e descamação tubular.',
    isquemiaHemodinamicaIntermacaoChoque:
      'A LRA isquêmica é consequência de episódios prolongados de hipoperfusão renal em choque séptico, choque hipovolêmico grave, hemorragia aguda ou hipotensão perioperatória não monitorizada (PAM < 60 mmHg). A intermação (heatstroke / golpe de calor), comum em cães braquicefálicos e cães de trabalho, induz LRA multifatorial: a hipertermia corporal crítica (> 41,5 °C) causa citotoxicidade térmica direta nas células endoteliais e tubulares, depleção de ATP, desidratação maciça com choque distributivo e rabdomiólise extensa. A lise muscular libera grandes quantidades de mioglobina na circulação, a qual precipita nos túbulos renais sob a forma de cilindros mioglobínicos obstrutivos e catalisa a formação de radicais livres de oxigênio mediados pelo ferro hemínico, agravando a necrose tubular aguda.',
    tabelaEstadiamentoIrisCanina: {
      title: 'Tabela 1 — Estadiamento IRIS de Lesão Renal Aguda Canina (I a V) e Subestágios Clínicos (IRIS 2026)',
      headers: ['Grau IRIS', 'Creatinina Sérica (mg/dL)', 'Creatinina (umol/L)', 'Cinética e Critérios Diagnósticos', 'Subestadiamento Mandatório'],
      rows: [
        {
          col1: 'Grau I (Não-azotêmico)',
          col2: '< 1,6 mg/dL',
          col3: '< 140 umol/L',
          col4: 'Aumento agudo >= 0,3 mg/dL em 48h; oligúria/anúria documentada por 6h; ou nefropatia tóxica/isquêmica ativa documentada',
          col5: 'Débito: NO (>= 1 mL/kg/h) vs O (< 1 mL/kg/h)\nDiálise: RRT+ vs RRT-\nPAS: Normo (<140), Pré (140-159), Hiper (160-179), Severo (>=180)',
        },
        {
          col1: 'Grau II (Leve)',
          col2: '1,6 a 2,8 mg/dL',
          col3: '141 a 247 umol/L',
          col4: 'Azotemia leve de início agudo ou piora documentada sobre função basal prévia',
          col5: 'Subclassificar obrigatoriamente por débito (NO/O), necessidade de suporte dialítico (RRT) e pressão arterial',
        },
        {
          col1: 'Grau III (Moderada)',
          col2: '2,9 a 5,0 mg/dL',
          col3: '248 a 442 umol/L',
          col4: 'Azotemia moderada; uremia clínica em desenvolvimento; desregulação hidroeletrolítica frequente',
          col5: 'Subclassificar obrigatoriamente por débito (NO/O), necessidade de suporte dialítico (RRT) e pressão arterial',
        },
        {
          col1: 'Grau IV (Grave)',
          col2: '5,1 a 10,0 mg/dL',
          col3: '443 a 884 umol/L',
          col4: 'Azotemia severa; sinais sistêmicos urêmicos marcantes (gastrite, hipercalemia, acidose metabólica)',
          col5: 'Subclassificar obrigatoriamente por débito (NO/O), necessidade de suporte dialítico (RRT) e pressão arterial',
        },
        {
          col1: 'Grau V (Crítica)',
          col2: '> 10,0 mg/dL',
          col3: '> 884 umol/L',
          col4: 'Falência renal aguda crítica; altíssimo risco vital imediato; indicação urgente de terapia renal substitutiva (IHD/CRRT)',
          col5: 'Subclassificar obrigatoriamente por débito (NO/O), necessidade de suporte dialítico (RRT) e pressão arterial',
        },
      ],
    },
  },

  epidemiology: {
    epidemiologiaCaninaFatoresRiscoComorbidades:
      'A LRA canina não apresenta predileção sexual restrita, acometendo animais de todas as faixas etárias. Cães jovens e de porte médio a grande com hábitos externos (caça, acesso a quintais, áreas rurais ou péri-urbanas sujeitas a inundações) exibem maior exposição à leptospirose. Animais geriátricos apresentam reserva funcional renal diminuída e maior prevalência de Doença Renal Crônica (DRC) subclínica, tornando-se suscetíveis a episódios de agudização sobre crônico (Acute-on-Chronic Kidney Disease - AoCKD) diante de desidratação, cirurgias ou uso de fármacos nefrotóxicos. Cães braquicefálicos (Bulldog Francês, Pug, Bulldog Inglês) exibem vulnerabilidade desproporcional à intermação. Fatores de risco maiores incluem: hipovolemia prévia, sepse, anestesia geral desprovida de monitoração pressórica contínua, terapia concomitante com fármacos que afetam a hemodinâmica glomerular (a tríade nefrotóxica: AINE + IECA/BRA + diurético) e exposição a toxinas residenciais.',
    tabelaEtiologiasEToxinasCaninas: {
      title: 'Tabela 2 — Principais Etiologias e Toxinas Causadoras de LRA em Cães: Características e Condutas',
      headers: ['Etiologia / Agente', 'Fisiopatologia Específica', 'Achados Marcadores / Diagnóstico', 'Conduta Imediata e Antídotos'],
      rows: [
        {
          col1: 'Leptospirose (Leptospira interrogans)',
          col2: 'Nefrite tubulointersticial bacteriana, vasculite endotelial e síndrome de hemorragia pulmonar (LPHS)',
          col3: 'PCR positivo em sangue ou urina; sorologia MAT com soroconversão ou título >= 1:800; icterícia e trombocitopenia',
          col4: 'Ampicilina sódica (20-30 mg/kg IV q6-8h) na internação; transição para doxiciclina (5 mg/kg VO q12h por 14 dias); isolamento e EPIs',
        },
        {
          col1: 'Uvas e Passas (Vitis vinifera)',
          col2: 'Necrose tubular aguda proximal desencadeada por ácido tartárico e bitartarato de potássio',
          col3: 'Histórico de ingestão, vômitos precoces, hipercalcemia e elevação abrupta de creatinina dentro de 24 a 48h',
          col4: 'Descontaminação imediata (êmese se < 2-4h, carvão ativado); fluidoterapia de suporte por 48h; monitorar creatinina e cálcio',
        },
        {
          col1: 'Etilenoglicol (Anticongelante)',
          col2: 'Metabólitos hepáticos (ácido glicólico/oxálico) precipitam cristais de oxalato nos túbulos; NTA destrutiva maciça',
          col3: 'Cristais de oxalato monoidratado (ponta de cerca) no sedimento em 3-6h; hiato antermico e osmolar elevados; fluorescência Wood',
          col4: 'Fomepizole (4-MP) 20 mg/kg IV imediato nas primeiras horas (ou etanol a 20%); hemodiálise de emergência para depuração da toxina',
        },
        {
          col1: 'Nefropatia por AINEs',
          col2: 'Inibição de prostaglandinas vasodilatadoras renais (PGE2/PGI2), colapso do fluxo medular e necrose papilar renal',
          col3: 'Histórico de meloxicam/carprofeno/ibuprofeno, especialmente se associado a desidratação, anestesia ou diuréticos',
          col4: 'Interromper imediatamente o AINE; restabelecer perfusão com cristaloides balanceados; misoprostol adjuvante; gastroproteção com IBP',
        },
        {
          col1: 'Aminoglicosídeos (Gentamicina / Amicacina)',
          col2: 'Acúmulo nos lisossomos do túbulo proximal com necrose celular e perda da borda em escova',
          col3: 'Cilindros granulares precoces no sedimento (dias antes do aumento de creatinina); proteinúria e glicosúria normoglicêmica',
          col4: 'Suspender o aminoglicosídeo ao primeiro sinal de cilindrúria; corrigir volemia; monitorar eletrólitos e função renal residual',
        },
        {
          col1: 'Intermação / Heatstroke (Golpe de Calor)',
          col2: 'Citotoxicidade térmica direta (> 41,5 °C), rabdomiólise com liberação maciça de mioglobina, choque distributivo e CIVD',
          col3: 'Histórico de exposição térmica, hipertermia, creatina fosfoquinase (CK) extremamente elevada, mioglobinúria e acidose láctica',
          col4: 'Resfriamento ativo até 39,0 °C (não usar gelo); fluidoterapia balanceada; suporte cardiovascular; monitorar débito e coagulação',
        },
      ],
    },
  },

  pathogenesisTransmission: {
    fisiopatologiaCelularNecroseTubularAguda:
      'A patogênese da lesão renal aguda intrínseca desdobra-se classicamente em quatro fases temporais: iniciação, extensão, manutenção e recuperação. Na fase de iniciação, o insulto isquêmico ou tóxico deprime os níveis intracelulares de ATP, causando falência da bomba Na+/K+-ATPase basolateral e acúmulo intracelular de sódio e cálcio. Ocorre desorganização do citoesqueleto de actina, perda da borda em escova do epitélio tubular proximal e redistribuição anormal de integrinas e transportadores para o domínio apical. Células viáveis e necróticas descamam para a luz tubular, agregando-se à proteína de Tamm-Horsfall e formando cilindros obstrutivos luminais que elevam a pressão hidrostática intratubular e promovem refluxo retrógrado (backleak) do filtrado glomerular para o interstício peritubular inflamado.',
    mecanismoFeedbackTubuloglomerularEColapsoTfg:
      'A falha de reabsorção tubular proximal de sódio e cloro faz com que concentrações anormalmente elevadas de NaCl atinjam a mácula densa no início do túbulo contorcido distal. A mácula densa interpreta essa sobrecarga luminal de eletrólitos como um estado de hiperfiltração inapropriada e ativa intensamente o mecanismo de feedback túbulo-glomerular (TGF), liberando adenosina e ativando vasoconstrição reflexa da arteríola glomerular aferente. Esse bloqueio pré-glomerular reduz drasticamente a pressão capilar hidrostática de filtração, provocando a queda abrupta da taxa de filtração glomerular (TFG) e o colapso na produção urinária (oligúria ou anúria funcional). Na medula externa renal, rica em túbulos metabolicamente ativos e pobre em perfusão vascular basal, instala-se congestão leucocitária microvascular persistente que perpetua a hipóxia tecidual durante a fase de manutenção.',
  },

  pathophysiology: {
    paradigmaFluidoterapiaRestritivaCanina:
      'Historicamente, preconizava-se a "diurese forçada" com volumes maciços de fluidos parenterais na esperança de empurrar debris e restaurar a função renal. A nefrologia veterinária contemporânea comprovou que esse dogma é incorreto e deletério: fluidos restauram a volemia circulante efetiva, mas não regeneram células tubulares destruídas. O rim canino é encapsulado por uma cápsula fibrosa inelástica; a infusão excessiva de fluidos gera edema intersticial renal que eleva a pressão parenquimatosa intracapsular, comprimindo os capilares peritubulares e veias intrarrenais e reduzindo ainda mais a perfusão (síndrome do rim congesto). Ademais, a sobrecarga de volume (fluid overload >= 5-10% do peso) precipita edema pulmonar agudo cardiogênico/permeabilidade, ascite, efusão pleural e falência respiratória.',
    tabelaDiagnosticoDiferencialLraCanina: {
      title: 'Tabela 3 — Matriz de Diagnóstico Diferencial da Azotemia e Insuficiência Renal no Cão',
      headers: ['Critério Diferencial', 'LRA Renal Intrínseca', 'Azotemia Pré-Renal Pura', 'Azotemia Pós-Renal Obstrutiva', 'LRA sobreposta a DRC (AoCKD)'],
      rows: [
        {
          col1: 'Início Temporal',
          col2: 'Hiperagudo a agudo (horas a poucos dias)',
          col3: 'Agudo, paralelo à causa primária de hipoperfusão',
          col4: 'Agudo (horas após obstrução mecânica completa)',
          col5: 'Piora abrupta recente sobre histórico crônico de meses',
        },
        {
          col1: 'Densidade Urinária (Pré-Fluido)',
          col2: 'Isostenúria (1.008 a 1.018); rim incapaz de concentrar',
          col3: 'Hiperstenúria (> 1.030 em cães); rim funcionalmente concentrando',
          col4: 'Variável (frequentemente isostenúrica se anúria/oligoanúria)',
          col5: 'Isostenúria fixa prévia (1.008 a 1.018)',
        },
        {
          col1: 'Resposta a 4-6h de Fluidoterapia',
          col2: 'Creatinina persiste elevada; resposta parcial ou nula',
          col3: 'Queda acentuada da creatinina e normalização da TFG',
          col4: 'Nenhuma queda até a desobstrução mecânica da via urinária',
          col5: 'Queda parcial de creatinina até retornar ao valor basal da DRC',
        },
        {
          col1: 'Morfologia Ultrassonográfica Renal',
          col2: 'Nefromegalia bilateral simétrica, hiperecogenicidade cortical',
          col3: 'Rins morfologicamente normais',
          col4: 'Pieloectasia acentuada, hidroureter, cálculo ou uroabdome',
          col5: 'Rins diminuídos, contornos irregulares, perda corticomedular',
        },
        {
          col1: 'Hematócrito / Eritrograma',
          col2: 'Normal ou hemoconcentração inicial por desidratação',
          col3: 'Hemoconcentração relativa (hematócrito elevado)',
          col4: 'Variável conforme a causa de base',
          col5: 'Anemia normocítica normocrômica não regenerativa da DRC',
        },
        {
          col1: 'Sedimentoscopia Urinária',
          col2: 'Cilindros granulares grosseiros, células epiteliais tubulares',
          col3: 'Sedimento inativo ou cilindros hialinos esparsos',
          col4: 'Sedimento variável; pesquisa de cristais e hematúria',
          col5: 'Cilindros granulares novos superpostos a cilindros céreos crônicos',
        },
      ],
    },
  },

  clinicalSignsPathophysiology: {
    manifestacoesClinicasFaseOliguricaVsPoliurica:
      'As manifestações clínicas da LRA canina expressam o acúmulo de toxinas urêmicas e desequilíbrios hidroeletrolíticos: letargia profunda, apatia, anorexia, vômitos incoercíveis, hálito urêmico e desidratação aguda. A fase oligoanúrica (< 1,0 mL/kg/h) representa a expressão mais grave da necrose tubular aguda, cursando com risco iminente de sobrecarga hídrica e hipercalemia. Na fase de recuperação, pode ocorrer poliúria maciça (diurese pós-desobstrução ou recuperação tubular) que demanda reposição hídrica e monitoramento de hipocalemia.',
    sindromeHemorragicaPulmonarLeptospirose:
      'A Síndrome de Hemorragia Pulmonar por Leptospirose (LPHS) constitui uma complicação hiperaguda de alta letalidade em cães infectados por Leptospira interrogans, caracterizada por vasculite endotelial pulmonar, hemoptise, dispneia intensa e infiltrado alveolar difuso visível na radiografia torácica.',
    hipercalemiaCardiotoxicaEAcidoseMetabolica:
      'A incapacidade de excreção de prótons e potássio na oligoanúria precipita acidose metabólica com hiato antermico elevado e hipercalemia severa (K+ > 6,5 mmol/L), a qual deprime a condução cardíaca atrioventricular, provocando ondas T apiculadas, perda de onda P, bradicardia sinusal, ritmo sinoventricular e risco iminente de assistolia ou fibrilação ventricular.',
  },

  diagnosis: {
    estadiamentoIrisLraCanina2026:
      'O estadiamento IRIS de LRA Canina (reemitido em 2026) classifica a gravidade de I a V com base na creatinina sérica e na sua cinética (aumento agudo >= 0,3 mg/dL em 48h documenta LRA ativa, mesmo com creatinina basal normal), complementado pelos subestágios de débito urinário (não-oligúrico >= 1,0 mL/kg/h versus oligoanúrico < 1,0 mL/kg/h), necessidade de diálise (RRT+ vs RRT-) e pressão arterial sistêmica (alvo PAS < 160 mmHg com amlodipina).',
    diagnosticoDiferencialLraDrcCanina:
      'A distinção entre LRA pura, azotemia pré-renal e agudização sobre DRC prévia baseia-se na densidade urinária pré-fluido, histórico temporal, resposta à restauração volêmica em 4-6h e morfologia renal ao ultrassom (nefromegalia em LRA pura vs rins diminuídos e irregulares em DRC).',
    armadaLaboratorialUrinaliseSedimentoscopiaCanina:
      'A urinálise colhida antes de fluidos revela isostenúria (1.008 a 1.018), proteinúria tubular e glicosúria normoglicêmica. A sedimentoscopia microscópica revela cilindros granulares grosseiros (patognomônicos de necrose tubular aguda ativa) e cristais monoidratados de oxalato de cálcio em ponta de cerca no etilenoglicol.',
    diagnosticoLeptospirosePcrMatSorologia:
      'Em qualquer cão com LRA sem causa óbvia, colher imediatamente sangue e urina para PCR de Leptospira interrogans antes do antibiótico, e soro para sorologia MAT pareada com intervalo de 2 a 4 semanas. Títulos agudos >= 1:800 (não vacinados) ou >= 1:1600 (vacinados), ou aumento de quatro vezes nos títulos confirmam a infecção.',
    ultrassonografiaRenalCaninaPocusTratoUrinario:
      'Ultrassonografia renal de leito (POCUS): avaliação de tamanho renal (nefromegalia simétrica é clássica de LRA), hiperecogenicidade cortical, sinal do halo medular e exclusão de causas pós-renais obstrutivas (dilatação piélica > 2-3 mm, urólitos ureterais ou uroabdome).',
    tabelaArmadaDiagnosticaLraCanina: {
      title: 'Tabela 4 — Armada Diagnóstica, Exames Laboratoriais, Urinálise e Diagnóstico por Imagem na LRA Canina',
      headers: ['Exame Diagnóstico', 'Achados Esperados / Positivos na LRA', 'Significado Fisiopatológico', 'Armadilhas e Cuidados de Execução'],
      rows: [
        {
          col1: 'Creatinina Sérica Seriada',
          col2: 'Elevação >= 0,3 mg/dL em 48h ou elevação percentual >= 50%',
          col3: 'Queda abrupta da taxa de filtração glomerular',
          col4: 'Perda de massa muscular acentuada reduz a creatinina basal; dosar em série',
        },
        {
          col1: 'Eletrólitos Séricos e Gasometria',
          col2: 'Hipercalemia (> 6,5 mmol/L), hiperfosfatemia severa, acidose metabólica',
          col3: 'Incapacidade de excreção de H+ e K+ pelos túbulos coletores distais',
          col4: 'Hemólise in vitro na coleta pode elevar falsamente o potássio sérico',
        },
        {
          col1: 'Urinálise e Refratometria Pré-Fluido',
          col2: 'Densidade 1.008 a 1.018, glicosúria normoglicêmica, proteinúria tubular',
          col3: 'Dano às células do túbulo contorcido proximal e alça de Henle',
          col4: 'Amostra DEVE ser colhida antes de bólus de fluidos que diluem a densidade',
        },
        {
          col1: 'Sedimentoscopia Urinária',
          col2: 'Cilindros granulares grosseiros, células tubulares, cristais de oxalato monoidratado',
          col3: 'Desprendimento celular e necrose tubular ativa; nefrose tóxica',
          col4: 'Cilindros desintegram-se rapidamente em urina alcalina ou após horas em repouso',
        },
        {
          col1: 'PCR para Leptospira (Sangue e Urina)',
          col2: 'Amplificação de DNA leptospiral antes do antibiótico',
          col3: 'Infecção ativa em corrente sanguínea (1ª semana) ou rins (após 1ª semana)',
          col4: 'Antibioticoterapia prévia pode negativar o PCR; colher sangue e urina simultâneos',
        },
        {
          col1: 'Sorologia MAT Pareada para Leptospira',
          col2: 'Aumento de quatro vezes nos títulos pareados ou título inicial >= 1:800/1:1600',
          col3: 'Soroconversão imune específica contra sorovares patogênicos',
          col4: 'Cães na primeira semana de doença podem apresentar MAT falso-negativo por ausência de anticorpos',
        },
        {
          col1: 'POCUS Renal e Abdominal',
          col2: 'Nefromegalia, halo medular hipoecoico, ausência de dilatação pós-renal obstrutiva',
          col3: 'Edema intersticial cortical agudo; exclusão de cálculos obstrutivos',
          col4: 'Exige operador treinado; rins normais não descartam LRA Grau I/II inicial',
        },
      ],
    },
  },

  treatment: {
    protocoloFluidoterapiaRestritivaBalançoHidrico:
      'A fluidoterapia na LRA canina obedece a duas fases sequenciais rigorosas: 1) Fase de Ressuscitação Volêmica: se o paciente apresentar desidratação clínica ou choque, infundir cristaloides balanceados (Ringer Lactato ou Plasma-Lyte 148). O déficit de desidratação (peso corporal em kg x % desidratação estimada x 10) deve ser reposto gradualmente ao longo de 4 a 6 horas em cães, monitorando ausculta pulmonar, pressão arterial e peso. O cloreto de sódio a 0,9% não deve ser utilizado de rotina para evitar acidose hiperclorêmica e vasoconstrição renal mediada por feedback túbulo-glomerular. 2) Fase de Manutenção Guiada por Ins and Outs: uma vez restabelecida a euvolemia, cessa-se qualquer infusão empírica livre. O aporte hídrico horário passa a ser calculado exatamente como: Débito Urinário Horário Medido + Perdas Insensíveis (20 mL/kg/dia divididos por 24 horas, ou cerca de 0,8 mL/kg/h) + Perdas Contemporâneas (volume estimado de vômitos ou diarreia). Na presença de oligoanúria persistente, a taxa de fluidos deve ser reduzida estritamente para repor apenas as perdas insensíveis, prevenindo a sobrecarga volêmica letal.',
    manejoEmergencialHipercalemiaCanina:
      'A hipercalemia aguda (K+ > 6,5 a 7,0 mmol/L) constitui emergência cardiotóxica iminente. O protocolo farmacológico de resgate compreende: 1) Gluconato de Cálcio a 10%: dose de 0,5 a 1,0 mL/kg IV lento ao longo de 10 a 15 minutos sob monitoramento eletrocardiográfico contínuo. Estabiliza imediatamente a membrana dos cardiomiócitos sem reduzir o potássio sérico (início em 2 a 5 minutos, duração de 30 a 60 minutos). Se ocorrer bradicardia ou alargamento de intervalo QT durante a infusão, interromper imediatamente. 2) Insulina Regular + Glicose: insulina regular na dose de 0,25 a 0,5 UI/kg IV associada a 2,0 g de glicose por unidade de insulina administrada (metade da dose de glicose em bólus IV diluído a 10-25% e o restante adicionado à fluidoterapia contínua como glicose a 2,5-5,0% para prevenir hipoglicemia). Promove o influxo celular ativo de K+ via Na+/K+-ATPase. 3) Terbutalina (0,01 mg/kg SC ou IM) ou salbutamol inalatório: agonista beta-2 que potencializa a captação celular de potássio. 4) Bicarbonato de sódio a 8,4% (1 a 2 mEq/kg IV lento em 20 min): reservado exclusivamente para acidose metabólica grave documentada (pH < 7,15 ou HCO3- < 12 mmol/L).',
    tabelaFarmacoterapiaHipercalemiaESuporteCanino: {
      title: 'Tabela 5 — Farmacoterapia de Emergência, Manejo de Hipercalemia e Suporte de UTI Canina',
      headers: ['Fármaco / Intervenção', 'Dose Canina de Referência', 'Via e Frequência', 'Mecanismo de Ação e Efeito', 'Cuidados Críticos e Monitoramento'],
      rows: [
        {
          col1: 'Gluconato de Cálcio 10%',
          col2: '0,5 a 1,0 mL/kg (máximo 10 mL)',
          col3: 'IV lento ao longo de 10-15 min',
          col4: 'Antagoniza a cardiotoxicidade do potássio; estabiliza o potencial de membrana miocárdica',
          col5: 'Monitoramento de ECG OBRIGATÓRIO; suspender se houver bradicardia; não reduz K+ sérico',
        },
        {
          col1: 'Insulina Regular + Glicose',
          col2: '0,25 a 0,5 UI/kg insulina regular + 2 g glicose por UI',
          col3: 'IV em bólus (glicose 25%) seguido de CRI glicose 2,5-5%',
          col4: 'Estimula a bomba Na+/K+-ATPase basolateral, promovendo influxo celular de K+',
          col5: 'Risco crítico de hipoglicemia severa; monitorar glicemia horária por pelo menos 4 a 6 horas',
        },
        {
          col1: 'Terbutalina',
          col2: '0,01 mg/kg',
          col3: 'SC ou IM a cada 4 a 6 horas',
          col4: 'Agonista beta-2 adrenérgico; potencializa o influxo celular de potássio',
          col5: 'Monitorar frequência cardíaca; contraindicado em taquiarritmias graves preexistentes',
        },
        {
          col1: 'Bicarbonato de Sódio 8,4%',
          col2: '1,0 a 2,0 mEq/kg',
          col3: 'IV lento ao longo de 20 a 30 min',
          col4: 'Promove troca celular de H+ por K+; alcaliniza o plasma em acidose grave documentada',
          col5: 'Usar APENAS se pH < 7,15 ou HCO3- < 12; risco de hipocalcemia ionizada e sobrecarga de sódio',
        },
        {
          col1: 'Furosemida (Desafio)',
          col2: '2,0 mg/kg bólus único (ou CRI 0,5-1,0 mg/kg/h)',
          col3: 'IV lenta em 2 a 5 minutos',
          col4: 'Inibe o carreador Na+/K+/2Cl- na alça de Henle; tenta converter oligoanúria em não-oligúria',
          col5: 'CONTRAINDICADA em hipovolemia; suspender após 2-4h se não houver resposta diurética',
        },
        {
          col1: 'Ampicilina Sódica',
          col2: '20,0 a 30,0 mg/kg',
          col3: 'IV a cada 6 a 8 horas',
          col4: 'Beta-lactâmico bactericida; trata leptospiremia ativa no cão hospitalizado',
          col5: 'Fármaco de escolha na fase inicial com vômitos; transição para doxiciclina após estabilização',
        },
        {
          col1: 'Doxiciclina',
          col2: '5,0 mg/kg q12h (ou 10 mg/kg q24h)',
          col3: 'Oral com alimento por 14 dias',
          col4: 'Tetraciclina lipofílica; erradica a colonização renal crônica de Leptospira',
          col5: 'Iniciar assim que o cão tolerar via oral; não interromper antes de 14 dias para evitar portador',
        },
        {
          col1: 'Fomepizole (4-MP)',
          col2: '20 mg/kg inicial, depois 15 mg/kg em 12h e 24h, depois 5 mg/kg em 36h',
          col3: 'IV lenta',
          col4: 'Inibidor competitivo potente da álcool-desidrogenase; bloqueia a formação de metabólitos do etilenoglicol',
          col5: 'Eficácia máxima nas primeiras 3 a 8 horas pós-ingestão; hemodiálise indicada em intoxicações tardias',
        },
      ],
    },
    terapiaAntimicrobianaLeptospiroseDuasFases:
      'Em qualquer cão com LRA cuja causa infecciosa não possa ser categoricamente descartada, iniciar imediatamente antibioticoterapia para leptospirose conforme o Consenso ACVIM 2023: 1) Fase Inicial / Paciente Hospitalizado com Vômitos ou Azotemia Grave: ampicilina sódica na dose de 20 a 30 mg/kg IV a cada 6 a 8 horas (ou penicilina G cristalina). Trata a leptospiremia ativa, mas não elimina com segurança o estado de portador tubular renal. 2) Fase de Eliminação do Portador Renal / Paciente Estável sem Vômitos: transição para doxiciclina na dose de 5 mg/kg VO a cada 12 horas (ou 10 mg/kg q24h) por exatamente 14 dias ininterruptos. A doxiciclina penetra no epitélio tubular renal e elimina a colonização persistente da Leptospira, impedindo que o animal continue excretando espiroquetas no ambiente.',
    manejoOligoanuriaDesafioDiureticoFurosemida:
      'Se o cão permanecer em oligúria (< 1 mL/kg/h) ou anúria após a confirmação inequívoca de euvolemia e desobstrução mecânica, a resposta tubular deve ser testada: 1) Desafio Diurético com Furosemida: administrar furosemida na dose de 2,0 mg/kg IV em bólus único lento. Se houver resposta diurética (débito > 1 mL/kg/h dentro de 2 horas), pode-se instituir infusão contínua (CRI) de furosemida a 0,5 a 1,0 mg/kg/h. 2) Se NÃO houver resposta após 2 a 4 horas: a furosemida deve ser IMEDIATAMENTE suspensa. Doses repetidas em rins não responsivos não restauram a filtração e provocam ototoxicidade e nefrite intersticial alérgica. Furosemida e manitol são FORMALMENTE CONTRAINDICADOS em pacientes desidratados ou hipovolêmicos.',
    terapiasExtracorporeasHemodialiseCrrtCanina:
      'Conforme as diretrizes consensuais da IRIS para Hemodiálise Intermitente (IHD 2024) e Terapias de Substituição Renal Contínua (CRRT 2026), a indicação de suporte dialítico não deve ser tardia. Critérios maiores de indicação precoce: oligoanúria refratária ao desafio diurético após euvolemia; hipercalemia refratária (> 6,5 mmol/L); sobrecarga hídrica significativa (>= 5-10% do peso corporal); acidose metabólica grave refratária (pH < 7,15); uremia clínica progressiva e grave com complicações neurológicas ou sangramento digestivo; e intoxicações dialisáveis precoces (etilenoglicol nas primeiras 12 a 24 horas antes do dano renal anúrico permanente).',
    tabelaProtocoloEscalonadoUtiCanina: {
      title: 'Tabela 6 — Protocolo Escalonado de UTI e Critérios para Terapia Renal Substitutiva (RRT) em Cães',
      headers: ['Nível de Manejo', 'Cenário Clínico Canino', 'Ações Mandatórias da Equipe', 'Critérios de Escalonamento / Desfecho'],
      rows: [
        {
          col1: 'Nível 1: Admissão e Estabilização',
          col2: 'Cão azotêmico agudo desidratado, com histórico de toxinas, choque ou leptospirose suspeita',
          col3: 'Coletar sangue/urina para exames pré-fluido; restaurar euvolemia com Ringer Lactato em 4-6h; instalar EPIs de zoonose',
          col4: 'Se normalizar creatinina pós-fluido: azotemia pré-renal pura. Se persistir azotemia: confirmar LRA intrínseca e avançar para Nível 2',
        },
        {
          col1: 'Nível 2: Manejo Restritivo Euvolêmico',
          col2: 'Paciente euvolêmico em LRA confirmada; produção urinária preservada (>= 1,0 mL/kg/h)',
          col3: 'Transição imediata para regra de Ins and Outs (débito + 20 mL/kg/dia + perdas GI); antibioticoterapia para leptospirose; gastroproteção',
          col4: 'Monitorar peso corporal a cada 8-12h; se ganho de peso > 3% sem aumento de débito, restringir fluidos imediatamente',
        },
        {
          col1: 'Nível 3: Manejo da Oligoanúria e Hipercalemia',
          col2: 'Paciente euvolêmico com débito < 1,0 mL/kg/h ou anúria por mais de 4-6h; K+ sérico em ascensão',
          col3: 'Desafio com furosemida (2 mg/kg IV); protocolo de hipercalemia (gluconato de cálcio, insulina/glicose, terbutalina); cateter vesical fechado',
          col4: 'Se houver diurese em 2-4h: manter Ins and Outs. Se persistir oligoanúria refratária: escalonar IMEDIATAMENTE para Nível 4 (RRT)',
        },
        {
          col1: 'Nível 4: Terapia Renal Substitutiva (IHD / CRRT / DP)',
          col2: 'Anúria persistente, hipercalemia refratária (> 6,5 mmol/L), sobrecarga hídrica (>= 5-10%), uremia crítica descompensada',
          col3: 'Acionar serviço de hemodiálise intermitente (IHD), CRRT ou diálise peritoneal de emergência; preparar cateter venoso central duplo lúmen',
          col4: 'Ultrafiltração para remoção de sobrecarga hídrica e depuração de solutos urêmicos até regeneração do epitélio tubular renal',
        },
      ],
    },
  },

  complications: {
    complicacoesCriticasSobrecargaHidricaUremia:
      'As complicações com risco à vida na UTI incluem: 1) Sobrecarga Hídrica Iatrogênica (Fluid Overload): ganho de peso >= 5% a 10% decorrente de excesso de fluidos parenterais em animais oligoanúricos, deflagrando edema pulmonar agudo, efusão pleural, ascite e síndrome compartimental abdominal com compressão da veia cava caudal e artérias renais. 2) Gastropatia e Hemorragia Digestiva Urêmica: sangramento gástrico e melena por vasculite urêmica e hipersecreção ácida (manejar com inibidores de bomba de prótons como pantoprazol 1 mg/kg IV q12h e sucralfato slurry). 3) Síndrome de Hemorragia Pulmonar por Leptospirose (LPHS): causa de morte súbita por asfixia e hemorragia alveolar maciça em cães infectados.',
    sindromeDesequilibrioDialiticoHipertensao:
      'Em cães submetidos a hemodiálise intermitente com azotemia crítica (ureia > 200-300 mg/dL), a redução excessivamente rápida da ureia sérica pode gerar gradiente osmótico reverso entre o sangue e o encéfalo, atraindo água para o tecido cerebral e provocando a Síndrome do Desequilíbrio Dialítico, manifestada por convulsões, coma e edema cerebral (prevenida com prescrição dialítica de fluxo baixo inicial e uso de manitol intradialítico). Crises hipertensivas graves (PAS >= 180 mmHg) exigem amlodipina oral ou vasodilatadores parenterais contínuos (nitroprussiato ou fenoldopam).',
    dezErrosFataisLraCanina:
      'A monografia detalha 10 erros críticos e armadilhas comuns no manejo da LRA canina: 1) Prescrever "diurese forçada" ("lavar o rim") e afogar o paciente em fluidos; 2) Ignorar a regra de Ins and Outs uma vez restabelecida a euvolemia; 3) Administrar furosemida ou manitol em cão hipovolêmico ou desidratado; 4) Esquecer a biossegurança zoonótica e o risco de leptospirose para a equipe e tutores; 5) Prescrever AINEs em pacientes desidratados, nefropatas ou em uso de IECAs; 6) Não reconhecer a cinética da creatinina (aumento de 0,3 mg/dL já é LRA ativa); 7) Atrasar o manejo emergencial da hipercalemia cardiotóxica; 8) Prescrever doxiciclina oral em cão com vômitos em vez de ampicilina IV inicial; 9) Retardar a indicação de hemodiálise/CRRT até o paciente estar moribundo e em choque refratário; 10) Não monitorar a pressão arterial sistêmica e o débito urinário horário na UTI.',
  },

  prevention: {
    protocoloPlantaoLraCanina10Passos:
      'Protocolo prático sequencial de plantão em 10 passos para atendimento emergencial de cães com suspeita de lesão renal aguda: Passo 1: Avaliar perfusão e peso basal; Passo 2: Coletar sangue e urina pré-fluidos; Passo 3: POCUS para descartar obstrução; Passo 4: Coletar PCR e MAT para leptospirose com EPIs; Passo 5: Restaurar euvolemia com cristaloides balanceados; Passo 6: Transição para Ins & Outs; Passo 7: Reverter hipercalemia com gluconato de cálcio e insulina/glicose; Passo 8: Iniciar ampicilina IV; Passo 9: Desafio com furosemida se anúria euvolêmica; Passo 10: Acionar hemodiálise se anúria ou sobrecarga refratária.',
    prevencaoVacinacaoLeptospiroseProtecaoRenal:
      'A prevenção da LRA canina baseia-se na vacinação anual multissoro contra leptospirose utilizando vacinas contendo pelo menos quatro sorovares (Canicola, Icterohaemorrhagiae, Grippotyphosa e Pomona); controle populacional de roedores e restrição de acesso a águas pluviais estagnadas; conscientização dos tutores quanto à extrema toxicidade de uvas, passas e etilenoglicol; monitoramento pressórico e hidratação rigorosa durante anestesias gerais; e proscrição de combinações nefrotóxicas (AINEs associados a hipovolemia ou bloqueadores do sistema renina-angiotensina).',
  },

  figures: [
    {
      id: 'fig-us-rim-canino-lra',
      title: 'Ultrassonografia Renal Canina em Lesão Renal Aguda',
      legend:
        'Corte sagital de rim canino ao ultrassom evidenciando nefromegalia bilateral simétrica, hiperecogenicidade acentuada do parênquima cortical, sinal do halo medular hipoecoico e discreto halo líquido anecoico subcapsular (achados característicos de necrose tubular aguda e nefrite tubulointersticial canina).',
      url: '/consulta-vet/lesao-renal-aguda-canina/ultrassonografia-rim-canino-lra.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-sedimento-cilindros-granulares-caninos',
      title: 'Sedimentoscopia Urinária: Cilindros Granulares Grosseiros',
      legend:
        'Fotomicromicrografia de centrifugado urinário canino (aumento de 400x) evidenciando múltiplos cilindros granulares grosseiros e células epiteliais tubulares descamadas inclusas na matriz de uromodulina, achado patognomônico precoce de necrose tubular aguda ativa e nefrotoxicidade.',
      url: '/consulta-vet/lesao-renal-aguda-canina/sedimento-cilindros-granulares-lra-canina.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-sedimento-cristais-oxalato-monoidratado',
      title: 'Cristais de Oxalato de Cálcio Mono-Hidratado (Intoxicação por Etilenoglicol)',
      legend:
        'Sedimentoscopia urinária canina exibindo cristais de oxalato de cálcio mono-hidratado em formato típico de prisma, ponta de cerca (picket fence) e haltere, patognomônicos de nefrose tóxica por ingestão de etilenoglicol (anticongelante).',
      url: '/consulta-vet/lesao-renal-aguda-canina/sedimento-cristais-oxalato-calcio-monoidratado.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-leptospirose-lphs-canina',
      title: 'Síndrome da Hemorragia Pulmonar por Leptospirose (LPHS)',
      legend:
        'Radiografia torácica lateral de cão com lesão renal aguda anúrica por leptospirose evidenciando infiltrado interstício-alveolar bilateral difuso e opacidades coalescentes compondo o quadro grave da Síndrome de Hemorragia Pulmonar por Leptospirose.',
      url: '/consulta-vet/lesao-renal-aguda-canina/leptospirose-hemorragia-pulmonar-lphs.jpg',
      aspectRatio: '4:3',
    },
  ],

  relatedConsensusSlugs: [
    'iris-lra-2026',
    'acvim-leptospirose-caes-2023',
    'iscaid-itu-caes-gatos-2019',
    'consenso-cardiorrenal-2015',
    'acvim-urolitiase-caes-gatos-2016',
  ],

  plainLanguage: {
    whatIsIt:
      'A lesão renal aguda (LRA ou IRA) em cães é uma falha súbita e perigosa na capacidade dos rins de filtrar o sangue, eliminar toxinas e regular a água e os sais minerais do organismo. Ao contrário da doença renal crônica, que se desenvolve lentamente ao longo de meses ou anos, a lesão renal aguda acontece de forma abrupta — em questão de horas ou poucos dias. Ela pode ser causada por infecções graves transmitidas pela água ou urina de roedores (como a leptospirose), ingestão de substâncias altamente tóxicas para cães (como uvas frescas ou passas, anticongelante de carros e certos anti-inflamatórios de uso humano ou veterinário administrados sem hidratação adequada), desidratação severa ou bloqueios que impedem a saída da urina. Trata-se de uma verdadeira emergência médica que exige internação hospitalar imediata em UTI veterinária, onde cuidados intensivos podem salvar os rins antes que o dano se torne irreversível.',
    keyPoints: [
      'O mito de "lavar o rim" acabou: antigamente acreditava-se que colocar muito soro na veia "lavaria" as toxinas do rim. Os consensos internacionais mais modernos (como o IRIS e a AAHA) provaram que o excesso de soro é extremamente perigoso para o cão, acumulando água nos pulmões (edema pulmonar) e inchando os próprios rins, o que piora o quadro. O soro deve ser medido gota a gota, repondo apenas o que o animal realmente perde.',
      'Leptospirose é uma causa frequente e uma zoonose: cães que entram em contato com água parada, lama ou urina de ratos podem contrair a bactéria Leptospira. Ela ataca violentamente os rins e o fígado, podendo também causar hemorragia nos pulmões. Como a leptospirose pode passar para os seres humanos através do contato com a urina do cão, a equipe veterinária e a família devem adotar cuidados rigorosos de proteção (uso de luvas e desinfecção).',
      'Uvas e passas são venenos perigosos para cães: mesmo poucas uvas ou passas podem desencadear necrose tubular aguda fulminante e falência renal nos cães devido à toxicidade do ácido tartárico presente na fruta. Nunca ofereça uvas ao seu cão e busque atendimento emergencial caso haja ingestão acidental.',
      'Etilenoglicol (anticongelante) é letal se não tratado nas primeiras horas: presente em aditivos de radiadores automotivos, possui sabor adocicado atraente para cães. No corpo, transforma-se em cristais pontiagudos que entopem e destroem os rins. O socorro deve ser prestado nas primeiras 3 a 6 horas para que o antídoto faça efeito.',
      'Parar de urinar é sinal de perigo extremo: quando os rins entram em falência aguda, o cão pode parar completamente de produzir urina (anúria) ou urinar quantidades mínimas. Isso faz com que o potássio aumente muito no sangue, o que pode paralisar o coração a qualquer momento.',
      'A hemodiálise veterinária pode salvar vidas: em cães que pararam de urinar ou que acumularam muita água ou toxinas, as máquinas de hemodiálise ou diálise peritoneal assumem o papel dos rins temporariamente, mantendo o cão vivo enquanto os rins se recuperam da inflamação.',
      'A recuperação exige paciência e seguimento rigoroso: mesmo após sair do hospital e voltar para casa, os rins podem levar semanas ou meses para cicatrizar, e uma parcela dos cães pode manter algum grau de sequela renal que exigirá acompanhamento veterinário periódico.',
    ],
    whatIs:
      'A lesão renal aguda canina é a perda rápida e potencialmente reversível da função de filtragem dos rins, provocada por infecções (como leptospirose), toxinas (uvas, anticongelante, remédios) ou choque, exigindo internação em UTI com monitoramento rígido de fluidos.',
    warningSigns:
      'Vômitos repetidos e repentinos, desânimo e fraqueza intensa, recusa total de comida e água, hálito forte com cheiro de urina, redução drástica ou parada total na produção de urina, urina escura ou com sangue, febre, respiração ofegante, dor abdominal e convulsões ou tremores.',
    diagnosis:
      'Exames de sangue urgentes para medir creatinina, ureia, potássio, fósforo e gases sanguíneos (pequenos aumentos de 0,3 mg/dL na creatinina já confirmam lesão ativa), medição estrita da produção horária de urina com sonda, exames para leptospirose (PCR e sorologia MAT), urinálise detalhada e ultrassonografia dos rins.',
    homeCare:
      'A fase aguda exige internação obrigatória. Após a alta hospitalar, administrar pontualmente todos os medicamentos prescritos (antibióticos para leptospirose, protetores gástricos e remédios de pressão), fornecer água limpa e fresca à vontade, estimular a alimentação com dietas terapêuticas úmidas e saborosas, acompanhar o volume de urina e o peso do cão, e realizar todos os retornos agendados para exames de sangue e urina.',
  },

  references: [
    {
      id: 'ref-iris-aki-2026',
      citationText:
        'International Renal Interest Society. IRIS Grading of Acute Kidney Injury (AKI). Reissued 2026. IRIS Guidelines.',
      sourceType: 'Consenso Internacional de Especialistas',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
      notes: 'Diretriz seminal reemitida em 2026 estabelecendo a graduação I a V, cinética de creatinina (delta >= 0,3 mg/dL em 48h) e subestadiamento por débito urinário, diálise e pressão arterial.',
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-sykes-acvim-lepto-2023',
      citationText:
        'Sykes JE, Francey T, Schuller S, et al. 2023 ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37(6):1966-1982. doi:10.1111/jvim.16903.',
      sourceType: 'Consenso Internacional ACVIM',
      url: 'https://doi.org/10.1111/jvim.16903',
      notes: 'Diretrizes oficiais do ACVIM sobre diagnóstico molecular por PCR e MAT pareada, tratamento em duas fases (ampicilina/doxiciclina) e biossegurança da leptospirose em cães.',
      evidenceLevel: 'Nível 1a — Diretriz de Consenso de Especialistas',
    },
    {
      id: 'ref-nelson-couto-6ed',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2019. Capítulo 41: Clinical Approach to Renal Disease, pp. 642–665; Capítulo 42: Acute Kidney Injury, pp. 666–684.',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      url: 'https://search.worldcat.org/isbn/9780323572972',
      notes: 'Tratado clássico com descrição aprofundada da fisiopatologia da necrose tubular aguda, etiologias em cães, manejo de Ins & Outs e sedimentoscopia urinária.',
      evidenceLevel: 'Nível 2a — Referência Terciária Consolidada',
    },
    {
      id: 'ref-greene-infectious-5ed',
      citationText:
        'Sykes JE, ed. Greene’s Infectious Diseases of the Dog and Cat. 5th ed. Elsevier; 2022. Capítulo 43: Leptospirosis, pp. 581–602.',
      sourceType: 'Tratado de Infectologia Veterinária',
      url: 'https://search.worldcat.org/isbn/9780323509343',
      notes: 'Referência primordial de infectologia sobre sorovares, manifestações renais e pulmonares (LPHS), soroepidemiologia e vacinação de cães.',
      evidenceLevel: 'Nível 2a — Compêndio de Especialistas',
    },
    {
      id: 'ref-coit-tartaric-2021',
      citationText:
        'Coit B, Monti S, Rozanski E, et al. Tartaric acid and potassium bitartrate toxicity in dogs following grape and raisin ingestion. J Am Anim Hosp Assoc. 2021;57(5):220–225.',
      sourceType: 'Estudo Clínico e Toxicológico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34491987/',
      notes: 'Estudo seminal que desvendou o ácido tartárico e o bitartarato de potássio como os princípios tóxicos causadores de necrose tubular proximal na intoxicação por uvas e passas.',
      evidenceLevel: 'Nível 2b — Investigação Toxicológica e Clínica',
    },
    {
      id: 'ref-wegenast-grapes-2022',
      citationText:
        'Wegenast CA, Meadows CA, Anderson RE, et al. Acute kidney injury in dogs associated with the ingestion of grapes, raisins, and wine: 120 cases (2015-2020). J Vet Emerg Crit Care. 2022;32(4):450–458. doi:10.1111/vec.13190.',
      sourceType: 'Estudo de Coorte Multicêntrico',
      url: 'https://doi.org/10.1111/vec.13190',
      notes: 'Avaliação clínica de 120 cães intoxicados por uvas e passas documentando a variabilidade individual, taxa de anúria e recuperação com fluidoterapia precoce.',
      evidenceLevel: 'Nível 2b — Estudo Observacional Amplo',
    },
    {
      id: 'ref-iris-ihd-2024',
      citationText:
        'Cowgill LD, Langston CE, Segev G, et al. International Renal Interest Society Consensus Statement on Intermittent Hemodialysis in Dogs and Cats. J Vet Intern Med. 2024;38(1):15–32. doi:10.1111/jvim.16950.',
      sourceType: 'Consenso Internacional IRIS',
      url: 'https://doi.org/10.1111/jvim.16950',
      notes: 'Diretrizes consensuais para prescrição, cateterismo central, fluxo sanguíneo e ultrafiltração em cães submetidos a hemodiálise intermitente.',
      evidenceLevel: 'Nível 1a — Consenso Internacional de Nefrologia',
    },
    {
      id: 'ref-iris-crrt-2026',
      citationText:
        'International Renal Interest Society. IRIS Consensus Guidelines on Continuous Renal Replacement Therapy (CRRT) in Dogs and Cats. 2026.',
      sourceType: 'Consenso Internacional IRIS',
      url: 'https://www.iris-kidney.com/iris-guidelines-1',
      notes: 'Consenso contemporâneo estabelecendo as diretrizes de hemofiltração venovenosa contínua e hemodiafiltração para suporte em choque séptico e LRA canina.',
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-aaha-fluid-2024',
      citationText:
        'Davis H, Jensen T, Johnson A, et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2024;60(4):145–168. doi:10.5326/JAAHA-MS-7440.',
      sourceType: 'Diretriz de Consenso da Associação Americana',
      url: 'https://doi.org/10.5326/JAAHA-MS-7440',
      notes: 'Diretrizes oficiais da AAHA redefinindo a fluidoterapia moderna, desaconselhando a hidratação forçada e estabelecendo critérios rigorosos contra sobrecarga hídrica.',
      evidenceLevel: 'Nível 1a — Diretriz de Sociedade Médica',
    },
    {
      id: 'ref-silverstein-critical-care',
      citationText:
        'Silverstein DC, Hopper K, eds. Small Animal Critical Care Medicine. 3rd ed. Elsevier; 2023. Capítulo 75: Acute Kidney Injury, pp. 412–424; Capítulo 77: Renal Replacement Therapies, pp. 430–442.',
      sourceType: 'Compêndio de Medicina Intensiva Veterinária',
      url: 'https://search.worldcat.org/isbn/9780323764698',
      notes: 'Referência padrão-ouro de UTI veterinária para monitoramento de balanço hídrico (Ins & Outs), tratamento de hipercalemia e suporte dialítico em cães críticos.',
      evidenceLevel: 'Nível 2a — Tratado de Medicina Intensiva',
    },
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Furosemide, Calcium Gluconate, Doxycycline, Ampicillin, Fomepizole.',
      sourceType: 'Formulário Farmacológico Veterinário',
      url: 'https://search.worldcat.org/isbn/9781394172207',
      notes: 'Posologia de referência para fármacos cardiovasculares, antimicrobianos e antídotos utilizados na emergência nefrológica.',
      evidenceLevel: 'Nível 2a — Compêndio Farmacológico Consolidado',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografias: Insulin, Terbutaline, Calcium Gluconate.',
      sourceType: 'Formulário Veterinário Britânico',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes: 'Diretrizes farmacológicas britânicas para suporte intensivo e protocolos de emergência nefrológica em cães.',
      evidenceLevel: 'Nível 2a — Compêndio de Especialistas',
    },
  ],
};
