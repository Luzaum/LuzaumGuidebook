import type { DiseaseRecord } from '../../types/disease';

export const mastiteRecord: DiseaseRecord = {
  id: 'disease-mastite-caes-gatos',
  slug: 'mastite-caes-gatos',
  title: 'Mastite em cadelas e gatas',
  subtitle:
    'Inflamação infecciosa e não infecciosa das glândulas mamárias no puerpério e lactação com risco de sepse materna e síndrome do leite tóxico neonatal',
  synonyms: [
    'Mastite puerperal',
    'Mastite séptica aguda',
    'Mastite gangrenosa necrotizante',
    'Abscesso mamário puerperal',
    'Galactostase inflamatória',
    'Infecção mamária pós-parto',
  ],
  species: ['dog', 'cat'],
  category: 'reproducao-obstetricia',
  categories: ['neonatologia', 'infectologia', 'terapia-intensiva'],
  tags: [
    'Puerpério',
    'Lactação',
    'Cultura do leite',
    'Citologia láctea',
    'Sepse puerperal',
    'Abscesso mamário',
    'Mastite gangrenosa',
    'Síndrome do leite tóxico',
    'Neonatologia',
    'Cabergolina',
    'Antimicrobiano na lactação',
  ],
  quickSummary:
    'Mastite é a inflamação de uma ou mais glândulas mamárias que acomete cadelas e gatas, predominantemente nas primeiras semanas do puerpério durante o pico da lactação, mas também observada após desmame abrupto, pseudociese ou morte neonatal. O espectro patológico varia desde a galactostase não séptica e a mastite catarral leve até o abscesso mamário focal e a mastite gangrenosa necrotizante fulminante com bacteremia, sepse materna (SIRS) e choque distributivo. Os principais agentes etiológicos bacterianos são Escherichia coli, Staphylococcus pseudintermedius e Streptococcus beta-hemolíticos, que ascendem pelo canal papilar (teto), entram por microtraumatismos na pele causados pelas unhas e dentes dos filhotes ou chegam por disseminação hematógena a partir de metrite puerperal. O diagnóstico apoia-se no exame clínico rigoroso de todas as glândulas mamárias (calor, rubor, dor e alteração macroscópica do leite para consistência grumosa, purulenta, achocolatada ou hemorrágica) e na citologia microscópica do leite colhido assepticamente, a qual revela abundância de neutrófilos degenerados com fagocitose bacteriana intracelular e pH alcalino (> 7,0 vs. 6,0–6,5 do leite normal). A cultura e o antibiograma do leite são cruciais para orientar a antibioticoterapia definitiva, ressaltando-se que o isolamento bacteriano isolado não confirma mastite sem citologia inflamatória, visto que cadelas saudáveis albergam microbiota comensal na secreção láctea. A conduta terapêutica imediata consiste em antibioticoterapia empírica bactericida com fármacos de alta biodisponibilidade tecidual e baixo risco de toxicidade para a ninhada (amoxicilina com clavulanato ou cefalexina), analgesia multimodal (opioides e AINEs apenas após hidratação e normotensão plenas), compressas térmicas e ordenha gentil esvaziadora. Abscessos exigem drenagem cirúrgica e mastite gangrenosa impõe desbridamento e mastectomia emergencial. Paralelamente, os neonatos devem ser minuciosamente avaliados quanto à Síndrome do Leite Tóxico e suplementados com sucedâneo lácteo específico quando o aleitamento for contraindicado.',
  quickDecisionStrip: [
    'Glândula túrgida, quente, hiperêmica e dolorosa com leite purulento/achocolatado = mastite séptica: colher leite assepticamente para citologia e cultura antes do antibiótico.',
    'Febre, hipotermia, taquicardia, hipotensão, petéquias ou pele mamária violácea/crepitante = mastite gangrenosa e sepse: choque séptico iminente, requer internação e UTI.',
    'Citologia láctea é a chave imediata: neutrófilos degenerados com bactérias intracelulares confirmam infecção; cultura positiva isolada sem citologia inflamatória pode ser microbiota comensal.',
    'Antibioticoterapia segura na lactação: amoxicilina com clavulanato (13,75–20 mg/kg PO q12h) ou cefalexina (20–30 mg/kg PO q8–12h); evitar fluoroquinolonas (artropatia) e tetraciclinas (esmalte).',
    'Avaliação neonatal contínua: filhotes inquietos, chorosos, com abdômen distendido e perda ponderal sofrem de Síndrome do Leite Tóxico ou inanição; afastar da glândula afetada e suplementar.',
    'Ablactação farmacológica com cabergolina (5 mcg/kg PO q24h por 5–7 dias) indicada se mastite grave multifocal, choque séptico materno, gangrena ou perda da ninhada.',
  ],
  quickSummaryRich: {
    lead:
      'A mastite no puerpério é uma afecção dual que compromete a integridade sistêmica da mãe e a sobrevivência da ninhada. A dor aguda e a hiperalgesia levam à aversão materna ao aleitamento, gerando retenção láctea com aumento exponencial da pressão intraductal e isquemia capilar. Ao mesmo tempo, a proliferação de enterobactérias produtoras de endotoxinas (LPS) ou cocos piogênicos deflagra resposta inflamatória fulminante com risco de necrose tecidual e sepse puerperal. O sucesso clínico repousa na intervenção tripla e precoce: controle antimicrobiano e cirúrgico do foco infeccioso na mãe, manutenção da drenagem glandular e assistência neonatal intensiva com monitoramento do ganho de peso diário.',
    leadHighlights: [
      'afecção dual que compromete mãe e ninhada',
      'aumento exponencial da pressão intraductal',
      'LPS e cocos piogênicos',
      'sepse puerperal',
      'intervenção tripla e precoce',
      'monitoramento do ganho de peso diário',
    ],
    pillars: [
      {
        title: 'Diagnóstico Citológico Imediato',
        body:
          'A diferenciação entre galactostase fisiológica (glândula ingurgitada sem infecção) e mastite séptica aguda é feita em minutos na lâmina: a presença de neutrófilos íntegros e macrófagos vacuolizados indica retenção estéril, enquanto neutrófilos hipersegmentados ou degenerados com bactérias fagocitadas intracelularmente confirmam mastite séptica. O pH do leite, mensurado com fita reagente, sobe de 6,2–6,5 para > 7,0 na mastite devido à exsudação plasmática.',
        highlights: ['diferenciação entre galactostase e mastite', 'bactérias fagocitadas', 'pH > 7,0'],
      },
      {
        title: 'Esvaziamento e Termoterapia',
        body:
          'A compressa morna úmida (ou folhas de repolho limpas e frias para alívio do edema grave) associada à massagem delicada e ordenha manual esvazia os ácinos bloqueados, restabelece a microcirculação e elimina detritos purulentos. Se houver abscesso com flutuação ou necrose gangrenosa, a massagem é formalmente contraindicada pelo risco de disseminação embólica e ruptura septal, exigindo drenagem orientada por ultrassom ou cirurgia.',
        highlights: ['ordenha manual esvazia ácinos', 'contraindicada na gangrena e abscesso', 'drenagem orientada por ultrassom'],
      },
      {
        title: 'Segurança Farmacológica Materno-Fetal',
        body:
          'Todo fármaco administrado à fêmea lactante ingressa no leite conforme sua lipofilicidade, constante de dissociação (pKa) e grau de ligação a proteínas. Betalactâmicos (cefalexina, amoxicilina-clavulanato) têm passagem láctea moderada e excelente índice de segurança neonatal. Fármacos com toxicidade fetal/neonatal grave como fluoroquinolonas (lesão de cartilagem de crescimento), tetraciclinas (displasia dentária e óssea) e cloranfenicol são absolutamente vetados.',
        highlights: ['Betalactâmicos têm excelente segurança', 'fluoroquinolonas causam artropatia', 'tetraciclinas causam displasia dentária'],
      },
      {
        title: 'Manejo Neonatal Intensivo',
        body:
          'O leite de glândula séptica contém bactérias viáveis, endotoxinas bacterianas e mediadores pró-inflamatórios (TNF-α, IL-1β) que desencadeiam a Síndrome do Leite Tóxico nos neonatos, com aerofagia, diarreia aquosa/esverdeada, hipotermia (< 35,5°C) e choque endotóxico. Filhotes devem ser pesados em balança de precisão a cada 12–24 horas: ganho diário inferior a 10–15% do peso corporal ou perda de massa impõe alimentação artificial com fórmula comercial por sonda orogástrica.',
        highlights: ['Síndrome do Leite Tóxico', 'ganho diário inferior a 10-15%', 'sonda orogástrica'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico da Mastite Puerperal',
      steps: [
        {
          label: '1. Triagem Hemodinâmica e Sistêmica',
          timing: 'Imediato (Minuto 0 a 15)',
          detail:
            'Aferição de temperatura retal materna, tempo de preenchimento capilar (TPC), coloração de mucosas, frequência cardíaca e pressão arterial sistólica por Doppler. Sinais de alarme para sepse (SIRS): temperatura > 39,7°C ou < 37,5°C, taquicardia (> 160 bpm em cães grandes, > 180 em pequenos, > 220 em gatas), pulso filiforme e lactato sérico > 2,5 mmol/L (Ettinger, 9ª ed. 2024; Nelson & Couto, 6ª ed.).',
        },
        {
          label: '2. Inspeção e Palpação de Todos os Pares Mamários',
          timing: 'Exame físico inicial',
          detail:
            'Examinar individualmente cada mama cranial torácica até as caudais inguinais. Avaliar consistência (edemaciada, indurada, lenhosa ou flutuante), temperatura cutânea local, eritema, presença de petéquias, fissuras mamilares e áreas violáceas ou enegrecidas frias sugestivas de isquemia/gangrena. Palpar útero e inspecionar corrimento vulvar para pesquisar metrite associada (BSAVA Reproduction, 2ª ed.).',
        },
        {
          label: '3. Coleta Asséptica e Análise do Leite',
          timing: 'Antes de qualquer antimicrobiano',
          detail:
            'Assepsia rigorosa do teto com clorexidina alcoólica a 0,5% ou álcool 70%; descartar os dois primeiros jatos para expelir bactérias comensais do óstio do teto. Ordenhar o leite diretamente em frasco estéril para microbiologia e em lâmina de vidro limpa para esfregaço citológico e teste de pH em fita colorimétrica. Leite normal apresenta pH 6,2–6,5; na mastite, a perda da barreira hematomamária eleva o pH para 7,0–7,8 (Svensson et al., 2023; Nelson & Couto, 6ª ed.).',
        },
        {
          label: '4. Citologia Láctea Imediata (Diff-Quik ou Gram)',
          timing: 'Na própria clínica (15–30 minutos)',
          detail:
            'Coloração rápida panóptica: citologia normal exibe macrófagos espumosos (colostrofores), células epiteliais ductais descamadas e raros neutrófilos não degenerados (< 5 por campo de imersão). A mastite séptica caracteriza-se por infiltrado neutrofílico maciço com alterações degenerativas cariolíticas e cariorrexíticas, além de bactérias (cocos em cadeias/cachos ou bacilos Gram-negativos) fagocitadas no interior dos fagócitos (Nelson & Couto, 6ª ed.).',
        },
        {
          label: '5. Ultrassonografia das Glândulas Afetadas',
          timing: 'Quando houver induração difusa, suspeita de abscesso ou necrose',
          detail:
            'Transdutor linear de alta frequência (10–18 MHz). Diferencia edema intersticial difuso (espessamento tecidual homogêneo e anecoico septal) de abscesso mamário verdadeiro (coleção anecoica a heterogênea bem circunscrita com reforço acústico posterior e debris celulares internos) e identifica áreas avasculares ao Doppler colorido indicativas de trombose e gangrena (Ettinger, 9ª ed. 2024).',
        },
        {
          label: '6. Avaliação Clínica e Ponderal da Ninhada',
          timing: 'Simultaneamente ao atendimento materno',
          detail:
            'Inspecionar todos os filhotes: vigor de sucção ao reflexo palatino, hidratação cutânea, repleção abdominal, motilidade e temperatura retal. Pesar em balança digital com precisão de gramas e registrar em curva de ganho diário. Investigar sinais de enterite, eritema perineal e cólica por ingestão de leite ácido ou endotóxico (BSAVA Reproduction, 2ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Protocolo Terapêutico Integrado e Suporte Neonatal',
      steps: [
        {
          label: '1. Antibioticoterapia Sistêmica Empírica Imediata',
          timing: 'Imediatamente após a coleta do leite',
          detail:
            'Iniciar antimicrobiano bactericida de amplo espectro com excelente penetração no tecido mamário e baixa toxicidade para filhotes em amamentação. Amoxicilina com clavulanato de potássio ou cefalexina cobrem Staphylococcus pseudintermedius, Streptococcus spp. e a maioria das cepas de Escherichia coli suscetíveis. Em cadelas e gatas sépticas ou em choque, transitar imediatamente para a via parenteral com ampicilina sódica + sulbactam ou cefazolina IV, combinada a enrofloxacino apenas se houver desmame completo obrigatório (Plumb\'s, 10ª ed.; Nelson & Couto, 6ª ed.).',
          dose:
            'Cefalexina: 20–30 mg/kg PO q8–12h. Amoxicilina + Clavulanato: 13,75–20 mg/kg PO q12h. Ampicilina-Sulbactam (sepse IV): 22–30 mg/kg IV q8h.',
          duration: '10 a 14 dias; reavaliar em 48 horas e ajustar conforme resultado do antibiograma.',
          reassess: 'Regressão do calor, dor e volume da glândula; clareamento citológico do leite.',
        },
        {
          label: '2. Analgesia Multimodal Rigorosa',
          timing: 'Fase aguda',
          detail:
            'A distensão alveolar e a inflamação purulenta causam dor extrema (Score 3–4 na Escala de Glasgow), suprimindo o apetite materno e levando ao abandono dos filhotes. Utilizar opioides agonistas parciais ou plenos na fase aguda: buprenorfina (0,01–0,02 mg/kg SC/IM/SL q8h em gatas e cães) ou tramadol/metadona. Anti-inflamatórios não esteroidais (meloxicam 0,1 mg/kg no D1, depois 0,05 mg/kg q24h PO) somente podem ser usados se a mãe estiver hemodinamicamente estável, normotensa, bem hidratada e sem azotemia (Ettinger, 9ª ed. 2024).',
          dose: 'Buprenorfina 0,01–0,02 mg/kg SC/IM/SL q8–12h; Meloxicam 0,05 mg/kg PO q24h (somente após estabilidade volemica).',
        },
        {
          label: '3. Fisioterapia Local e Ordenha Terapêutica',
          timing: 'A cada 4 a 6 horas',
          detail:
            'Aplicar compressas mornas e úmidas na glândula afetada por 10–15 minutos para provocar vasodilatação periférica e relaxamento esfincteriano do ducto papilar, seguidas de massagem e ordenha manual delicada em direção ao teto para eliminar o leite retido e o exsudato estagnado. Nunca ordenhar com força excessiva para não romper canalículos. Contraindicado em casos de abscesso com risco de fístula interna e em mastite gangrenosa (Nelson & Couto, 6ª ed.).',
        },
        {
          label: '4. Intervenção Cirúrgica (Abscesso ou Mastite Gangrenosa)',
          timing: 'Se flutuação evidente, fístula cutânea ou necrose tecidual',
          detail:
            'Abscessos maduros e flutuantes requerem punção diagnóstica, incisão ampla com drenagem cirúrgica, curetagem de restos necróticos e lavagem copiosa com solução fisiológica morna. Pode-se inserir dreno de Penrose com fixação estéril. Áreas de necrose gangrenosa impõem debridamento cirúrgico de urgência ou mastectomia parcial/total da cadeia mamária afetada para remover a fonte de endotoxinas e bacteremia (BSAVA Reproduction, 2ª ed.; Ettinger, 9ª ed. 2024).',
        },
        {
          label: '5. Condução da Lactação e Manejo da Ninhada',
          timing: 'Decisão nas primeiras 12 horas',
          detail:
            'Se a mastite for leve e localizada, a fêmea estiver estável e o antibiótico for seguro, os filhotes podem continuar mamando nas glândulas sadias. Proteger o teto da glândula afetada com curativo ou fita suave para evitar sucção neonatal. Se houver mastite grave, purulenta maciça, gangrenosa ou a mãe estiver séptica, realizar desmame abrupto completo de todos os filhotes, fornecendo substituto lácteo específico via mamadeira ou sonda orogástrica (BSAVA Reproduction, 2ª ed.).',
        },
        {
          label: '6. Supressão Farmacológica da Lactação (Cabergolina)',
          timing: 'Se desmame total indicado ou perda da ninhada',
          detail:
            'A cabergolina é um potente agonista dos receptores dopaminérgicos D2 hipofisários que inibe a liberação de prolactina, cessando rapidamente a produção de leite e reduzindo o ingurgitamento mamário. Muito superior à bromocriptina devido à longa duração de ação e menor incidência de náuseas/êmese (Plumb\'s, 10ª ed.; BSAVA Formulary, 10ª ed.).',
          dose: 'Cabergolina: 5 mcg/kg (0,005 mg/kg) PO uma vez ao dia (q24h), administrada com alimento por 5 a 7 dias.',
          duration: '5 a 7 dias contínuos.',
          reassess: 'Regressão completa da secreção de leite e atenuação do edema mamário.',
        },
      ],
    },
  },
  etiology: {
    agentes:
      'A mastite em cães e gatos é primordialmente uma doença bacteriana aguda, provocada predominantemente por microrganismos que colonizam a pele, a flora oral dos filhotes e o trato gastrintestinal/urogenital materno. Os agentes bacterianos mais frequentemente isolados em estudos clínicos microbiológicos são:\n\n' +
      '1. Escherichia coli: Bacilo Gram-negativo entérico facultativo, isolado com frequência extraordinária em mastites agudas fulminantes e gangrenosas. Cepas de E. coli liberam grandes quantidades de lipopolissacarídeo (LPS, endotoxina), o qual se liga aos receptores TLR4 nos macrófagos mamários, deflagrando liberação maciça de TNF-alfa, IL-1 e IL-6, que causam colapso endotelial, coagulação intravascular disseminada (CIVD) e choque distributivo na mãe, além de intoxicação aguda fatal nos filhotes que ingerem o leite.\n\n' +
      '2. Staphylococcus pseudintermedius (cães) e Staphylococcus aureus / S. felis (gatos): Cocos Gram-positivos que colonizam comumente as mucosas e a pele dos carnívoros domésticos. Produzem toxinas necrosantes (alfa-hemolisina, leucocidinas) e coagulase, favorecendo a formação de microabscessos, necrose tecidual e liquefação purulenta do parênquima mamário.\n\n' +
      '3. Streptococcus beta-hemolíticos (Streptococcus canis, S. dysgalactiae): Cocos Gram-positivos anaeróbios facultativos que provocam celulite mamária erisipelatoide difusa e mastite necrosante rápida por meio de enzimas difusoras como estreptoquinase e hialuronidase.\n\n' +
      '4. Outros agentes oportunistas: Klebsiella pneumoniae, Pseudomonas aeruginosa, Enterobacter spp., Pasteurella multocida (especialmente em gatas devido a lesões por mordedura) e Proteus mirabilis. Espécies de Mycoplasma e fungos/leveduras (Candida spp., Malassezia) são raramente documentados, quase sempre secundários a cursos prévios prolongados e indiscriminados de antibioticoterapia de largo espectro.',
    vias: [
      'Via Ascendente (Canal Papilar): A via mais prevalente na mastite puerperal. Durante o pico da lactação, o canal do teto permanece relaxado ou dilatado sob a ação hormonal e o estímulo constante de sucção. Bactérias presentes na cama, nas fezes, no assoalho da maternidade ou na microbiota peri-teto ascendem através do óstio do teto em direção ao seio lactífero e ácinos mamários.',
      'Via Traumática Perimembranosa: A ação mecânica repetitiva das garras afiadas dos filhotes neonatos ao realizarem o movimento de "amassar pão" durante a amamentação provoca microescoriações e soluções de continuidade na pele do teto e da base da glândula mamária, servindo como porta de entrada direta para Staphylococcus pseudintermedius cutâneo.',
      'Via Hematógena (Disseminação Vascular): Bactérias procedentes de focos infecciosos distantes, nomeadamente de metrite puerperal bacteriana (retenção placentária, subinvolução de sítios placentários infectados), pielonefrite ou bacteremia sistêmica, instalam-se no parênquima mamário altamente vascularizado da puérpera.',
      'Galactostase e Estase Láctea: A retenção de leite nos ductos lactíferos — secundária a ninhadas pequenas com poucos filhotes para esvaziar todas as mamas, morte de filhotes, tetos invertidos, estenose ductal congênita ou desmame abrupto — eleva a pressão intraductal, causa microfissuras no epitélio alveolar e converte o leite estagnado em um meio de cultura hidroeletrolítico excepcionalmente rico para rápida proliferação microbiana.',
    ],
    culturaNormal:
      'Diferenciação crítica entre Colonização Fisiológica e Infecção Verdadeira: No estudo prospectivo conduzido por Svensson et al. (2023), 210 amostras de leite obtidas de 11 cadelas paridas clinicamente saudáveis foram submetidas à cultura microbiológica em ágar sangue, revelando crescimento bacteriano em impressionantes 86% das amostras analisadas. Foram identificados comensais normais como Staphylococcus pseudintermedius, Streptococcus spp. e estafilococos coagulase-negativos. Portanto, no contexto da clínica de pequenos animais, o achado de bactérias em cultura láctea isolada NÃO autoriza o diagnóstico de mastite bacteriana nem justifica a prescrição de antimicrobianos se a fêmea não apresentar sinais clínicos inflamatórios locais (eritema, dor, enduração) ou alterações na citologia láctea (infiltrado neutrofílico maciço com fagocitose bacteriana intracelular). Tratar culturas isoladas sem inflamação seleciona cepas multirresistentes hospitalares e desequilibra a microbiota normal.',
  },
  epidemiology: {
    periodo:
      'A mastite ocorre com máxima frequência entre a segunda e a quarta semanas pós-parto, coincidindo exatamente com o pico de produção láctea da lactação em cadelas e gatas. Entretanto, pode manifestar-se precocemente nos primeiros dias pós-parto (especialmente quando associada à metrite puerperal com retenção fetal ou placentária) ou tardiamente no período de desmame. Episódios fora da gravidez/lactação real podem ocorrer durante a pseudociese (gravidez psicológica) em cadelas com hiperprolactinemia e retenção láctea sem ninhada.',
    risco:
      'Fatores de risco maiores identificados na literatura obstétrica veterinária:\n' +
      '- Galactostase e ingurgitamento mamário por mamada ineficaz (ninhada muito pequena com 1–2 filhotes que mamam preferencialmente nas mamas inguinais e negligenciam as torácicas).\n' +
      '- Falta de corte/aparamento das pontas das unhas dos neonatos na primeira e segunda semanas de vida.\n' +
      '- Más condições higiênico-sanitárias na maternidade (camas úmidas, acúmulo de matéria fecal, urina e lóquios).\n' +
      '- Metrite puerperal bacteriana concomitante ou retenção de anexos fetais.\n' +
      '- Tetos invertidos, anomalias ductais congênitas ou cicatrizes de traumatismos mamários anteriores.\n' +
      '- Má nutrição da mãe lactante gerando debilidade imunológica e hipoproteinemia.',
    recorrencia:
      'Fêmeas com histórico prévio de mastite apresentam risco aumentado de recidiva em lactações subsequentes, decorrente de fibrose residual ductal, estenose parcial de canais lactíferos ou conformação anatômica desfavorável do teto. Nesses animais, o manejo preventivo ativo (inspeção diária, aparo de garras neonatais e rotação forçada da ninhada entre todos os pares mamários) é obrigatório desde o primeiro dia pós-parto, sendo formalmente contraindicada a antibioticoterapia profilática profilática sem infecção ativa.',
  },
  pathogenesisTransmission: {
    cascata: [
      '1. Penetração e Aderência: Microrganismos (E. coli, S. pseudintermedius, Streptococcus) penetram o esfíncter do teto aberto pela sucção ou através de fissuras cutâneas e aderem às células epiteliais dos ductos lactíferos e alvéolos mamários.',
      '2. Colonização do Substrato Lácteo: O leite puerperal é rico em lactose, proteínas, lipídios e cálcio, funcionando como um meio de enriquecimento bacteriano ideal onde as colônias se duplicam a cada 20 a 30 minutos na temperatura corporal de 38,5°C.',
      '3. Resposta Imune Inata e Quimiotaxia: O reconhecimento de padrões moleculares associados a patógenos (PAMPs, como LPS e peptidoglicanos) por receptores Toll-like (TLR2 e TLR4) em células epiteliais e macrófagos residentes desencadeia liberação de CXCL8 (IL-8), TNF-alfa e leucotrieno B4, promovendo recrutamento massivo de neutrófilos da circulação capilar mamária para a luz alveolar.',
      '4. Quebra da Barreira Hematomamária e Danos Alveolares: Neutrófilos extravasam e degranulam enzimas proteolíticas (mieloperoxidase, elastase) e espécies reativas de oxigênio (ROS). A barreira endotelial-epitelial é destruída, permitindo a transudação de albumina, fibrinogênio e íons sódio e cloreto para o leite, elevando seu pH para valores alcalinos (> 7,0) e transformando a secreção láctea em exsudato purulento coagulado com grumos de fibrina.',
      '5. Trombose Microvascular, Isquemia e Gangrena: A inflamação intensa, compressão edematosa extrínseca sobre as arteríolas mamárias e a atividade de endotoxinas/leucocidinas induzem ativação plaquetária local e trombose microvascular. O infarto isquêmico do tecido glandular culmina em necrose gangrenosa da pele e do parênquima mamário (mastite gangrenosa).',
      '6. Disseminação Sistêmica (SIRS, Sepse e Choque): A translocação de endotoxinas (LPS) ou a invasão bacteriana direta na corrente circulatória drena através das veias pudendas externas e epigástricas craniais/caudais, gerando bacteremia materna, vasodilatação sistêmica mediada por óxido nítrico, colapso circulatório distributivo, lesão renal aguda e falência de múltiplos órgãos.',
    ],
    neonatos:
      'Toxicidade Neonatal Direta e Síndrome do Leite Tóxico: Os filhotes que mamam em glândulas afetadas ingerem bactérias patogênicas vivas, citocinas inflamatórias, produtos de degradação necrótica e endotoxinas (LPS). O epitélio intestinal do neonato, altamente permeável nas primeiras 48–72 horas para a absorção macromolecular de imunoglobulinas colostrais ("gut closure" ainda incompleto), absorve rapidamente as endotoxinas e bactérias, deflagrando enterite necrotizante, choque endotóxico, acidose metabólica grave, hipotermia profunda (< 35°C), perda do reflexo de sucção e morte rápida se não forem imediatamente isolados e medicados.',
    contagio:
      'Não é uma doença primariamente contagiosa interindividual no sentido de aerossol, mas há contaminação cruzada significativa dentro do ninho: filhotes que mamam em uma mama infectada transferem bactérias viáveis via cavidade oral para os tetos de glândulas sadias da mesma mãe, disseminando a mastite por múltiplos pares mamários. Além disso, caixas de parto compartilhadas ou não desinfetadas perpetuam cepas virulentas entre fêmeas paridas.',
  },
  pathophysiology:
    'A fisiopatologia da mastite é um processo dinâmico impulsionado pela tríade: virulência do patógeno invasor, perda dos mecanismos de defesa do canal papilar e comprometimento da homeostase circulatória local e sistêmica.\n\n' +
    '1. Dinâmica da Barreira Hematomamária e Alterações Físico-Químicas do Leite: No parênquima mamário normal em lactação, junções oclusivas estreitas (tight junctions) entre as células epiteliais alveolares impedem a passagem livre de eletrólitos e proteínas do sangue para o leite. O leite de cadelas e gatas sadias possui pH ácido a neutro (6,2 a 6,5) e concentrações relativamente baixas de sódio e cloro, compensadas por altas concentrações de lactose e potássio. Sob agressão inflamatória bacteriana e liberação de TNF-alfa, IL-1beta e histamina, as junções oclusivas desestabilizam-se e se abrem. Ocorre extravasamento maciço de líquido plasmático rico em sódio, bicarbonato e albumina para o lume alveolar, provocando uma elevação abrupta do pH lácteo para 7,2–7,8. A perda de integridade acinar converte o leite em secreção serossanguinolenta ou purulenta com precipitação de fibrina em grumos obstrutivos.\n\n' +
    '2. Fisiopatologia da Isquemia e Gangrena Mamária: Determinados isolados de Staphylococcus produzem toxina alfa que deflagra vasoespasmo arteriolar severo, enquanto E. coli ativa a cascata de coagulação intravascular através da expressão do fator tecidual em células endoteliais expostas ao LPS. Essa combinação gera trombose microvascular disseminada nos plexos capilares mamários. O parênquima mamário, aprisionado sob a fáscia e a pele inelástica distendida pelo edema inflamatório tenso, sofre síndrome compartimental local, levando à anóxia tecidual e necrose coagulativa gangrenosa. A pele sobrejacente perde a temperatura (torna-se fria ao toque), adquire tonalidade cianótica/violácea e evolui para flictenas, ulceração e esfacelo necrótico total com exposição de gordura e fáscia muscular.\n\n' +
    '3. Fisiopatologia da Sepse Puerperal Materna: Quando a barreira local sucumbe, o LPS de E. coli atinge a veia epigástrica superficial caudal e ganha a veia cava caudal. No endotélio vascular pulmonar e renal, o LPS ativa a enzima óxido nítrico sintase induzível (iNOS), produzindo vasodilatação arterial sistêmica refratária com choque distributivo (hipotensão), hipoperfusão tecidual e elevação acentuada de lactato sérico. Paralelamente, o consumo de plaquetas e fatores de coagulação culmina em trombocitopenia de consumo e CIVD.\n\n' +
    '4. Eixo Neuroendócrino e Supressão da Produção de Leite: A dor extrema da mastite gera estimulação simpática aguda com liberação maciça de catecolaminas (adrenalina e noradrenalina), as quais induzem vasoconstrição dos leitos vasculares mamários e antagonizam os efeitos da ocitocina no músculo mioepitelial alveolar, impedindo a ejeção do leite ("milk let-down"). Simultaneamente, a estase prolongada acumula o peptídeo FIL (Feedback Inhibitor of Lactation) na luz alveolar, o qual sinaliza aos colonócitos mamários para cessarem a síntese de caseína e lactose, resultando em hipogalactia ou agalactia materna permanente se a lesão for destrutiva.',
  clinicalSignsPathophysiology: [
    {
      system: 'mammary',
      findings: [
        {
          finding: 'Glândula mamária tumefeita, dura, hiperêmica e intensamente dolorosa à palpação',
          mechanism:
            'A vasodilatação arteriolar mediada por prostaglandina E2 e óxido nítrico, combinada ao aumento da permeabilidade capilar por histamina e bradicinina, causa exsudação fluida no interstício mamário, elevando a pressão tecidual e comprimindo nociceptores locais.',
          clinicalMeaning:
            'Sinal cardeal de inflamação aguda ativa. Exige diferenciação com ingurgitamento fisiológico (galactostase), no qual há aumento de volume sem calor ardente ou dor excruciante.',
          priority: 'common',
        },
        {
          finding: 'Secreção láctea com alteração macroscópica (grumos de fibrina, cor amarelada, acastanhada ou hemorrágica)',
          mechanism:
            'Extravasamento maciço de neutrófilos, lise celular, detritos necróticos e hemácias através de junções epiteliais destruídas. A coagulação do fibrinogênio forma precipitados e grumos lácteos característicos.',
          clinicalMeaning:
            'Confirma o envolvimento exsudativo do parênquima alveolar e ductal. Leite francamente purulento ou hemorrágico exige interrupção imediata da amamentação nessa glândula.',
          priority: 'common',
        },
        {
          finding: 'Pele violácea, azulada, fria ao toque com crepitação ou áreas de flictena e esfacelo ulcerado',
          mechanism:
            'Trombose microvascular disseminada nos capilares e arteríolas mamárias por endotoxinas ou toxinas estafilocócicas com necrose isquêmica coagulativa transmural (mastite gangrenosa necrotizante). A crepitação pode indicar produção de gás por anaeróbios.',
          clinicalMeaning:
            'Emergência cirúrgica obstétrica absoluta! Sinal de gangrena mamária estabelecida com alto risco de óbito por sepse; exige desbridamento cirúrgico imediato e cuidados intensivos.',
          priority: 'emergency',
        },
        {
          finding: 'Massa circunscrita flutuante e dolorosa sob a pele mamária (Abscesso mamário)',
          mechanism:
            'Isolamento da infecção bacteriana por parede de tecido de granulação e fibrina, com liquefação purulenta central mediada por enzimas neutrofílicas.',
          clinicalMeaning:
            'Requer drenagem cirúrgica e lavagem antisséptica; a antibioticoterapia isolada não consegue penetrar na cápsula fibrótica espessa e no centro purulento.',
          priority: 'emergency',
        },
        {
          finding: 'Aversão e rejeição ao aleitamento (a mãe rosna, foge, esconde as mamas ou ataca os filhotes)',
          mechanism:
            'A pressão mecânica e sucção dos filhotes sobre glândulas em hipersensibilização periférica intensa deflagram dor intolerável.',
          clinicalMeaning:
            'Sinal precoce frequente que frequentemente leva o tutor ao consultório; a ninhada desnutre-se rapidamente se não houver assistência alimentar imediata.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'systemic',
      findings: [
        {
          finding: 'Febre alta (> 39,7°C) ou hipotermia paradoxal (< 37,5°C)',
          mechanism:
            'Pirógenos endógenos (IL-1, TNF-alfa, IL-6) reajustam o termostato hipotalâmico na fase inicial; a hipotermia surge quando o choque séptico e a falência mitocondrial descompensam a termogênese.',
          clinicalMeaning:
            'Hipotermia em fêmea puérpera com mastite é sinal de sepse descompensada e choque endotóxico iminente, indicando prognóstico reservado a desfavorável.',
          priority: 'emergency',
        },
        {
          finding: 'Taquicardia, pulsos femorais fracos ou céleres e tempo de preenchimento capilar prolongado (> 2s) ou rápido (< 1s - fase hiperdinâmica)',
          mechanism:
            'Vasodilatação distributiva periférica mediada por óxido nítrico com redução da resistência vascular sistêmica, seguida de hipovolemia relativa e hipoperfusão tecidual.',
          clinicalMeaning:
            'Marcadores de instabilidade hemodinâmica grave compatíveis com sepse (SIRS); impõem ressuscitação volêmica imediata com cristaloides isotônicos.',
          priority: 'emergency',
        },
        {
          finding: 'Letargia profunda, anorexia completa, vômitos e desidratação',
          mechanism:
            'Efeito de mediadores pró-inflamatórios e citocinas sobre a área postrema do tronco encefálico e redução da motilidade gastrointestinal induzida por endotoxinas.',
          clinicalMeaning:
            'Comprometimento sistêmico materno que inviabiliza os cuidados parentais normais, exigindo desmame e suporte hidroeletrolítico parenteral.',
          priority: 'common',
        },
        {
          finding: 'Oligúria e hiperlactatemia (> 2,5–4,0 mmol/L)',
          mechanism:
            'Hipoperfusão renal e microtrombose glomerular secundárias à sepse, associadas à glicólise anaeróbia tecidual generalizada.',
          clinicalMeaning:
            'Disfunção de órgãos-alvo que define sepse grave/choque séptico; requer monitoramento de débito urinário e lactatemia seriada na UTI.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'reproductive',
      findings: [
        {
          finding: 'Lóquios fétidos, purulentos ou de coloração achocolatada escura com aumento uterino à palpação',
          mechanism:
            'Metrite puerperal séptica concomitante, com proliferação bacteriana uterina e invasão da circulação sanguínea, servindo de fonte primária hematógena para a mastite.',
          clinicalMeaning:
            'Requer investigação ultrassonográfica do útero para descartar retenção de conceptos ou restos placentários; tratar a mama sem resolver a metrite resulta em recidiva.',
          priority: 'systemic',
        },
        {
          finding: 'Agalactia total ou hipogalactia aguda em todas as mamas',
          mechanism:
            'Falência secretora alveolar generalizada por ação de citocinas inflamatórias, perda de tônus mioepitelial e estresse materno agudo mediado por cortisol e catecolaminas.',
          clinicalMeaning:
            'Impõe suporte alimentar artificial integral e imediato para a totalidade da ninhada.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neonatal',
      findings: [
        {
          finding: 'Filhotes inquietos, choro persistente, hipotermia (< 35,5°C) e abdômen distendido timpanítico',
          mechanism:
            'Ingestão de leite tóxico repleto de toxinas bacterianas, restos celulares e bactérias vivas; má absorção entérica, fermentação bacteriana e aerofagia por sucção frustrada.',
          clinicalMeaning:
            'Diagnóstico clínico de Síndrome do Leite Tóxico Neonatal. Os filhotes devem ser imediatamente removidos da mãe e aquecidos ativamente.',
          priority: 'emergency',
        },
        {
          finding: 'Diarreia profusa amarelada/esverdeada e dermatite eritematosa perianal nos neonatos',
          mechanism:
            'Ação irritativa das endotoxinas e bactérias sobre a mucosa enteral neonatal com hipersecreção hídrica; fezes ácidas causam dermatite química escoriativa.',
          clinicalMeaning:
            'Risco extremo de desidratação e hipoglicemia fulminante no filhote em poucas horas; requer hidratação aquecida e alimentação por sonda orogástrica.',
          priority: 'emergency',
        },
        {
          finding: 'Perda ponderal diária ou ganho de peso nulo na balança de precisão',
          mechanism:
            'Balanço energético e hidroeletrolítico negativo devido à agalactia materna ou inabilidade de absorver nutrientes pela enterite infecciosa.',
          clinicalMeaning:
            'O peso diário é o indicador mais sensível da viabilidade neonatal; neonatos que perdem mais de 10% do peso corporal estão em estado crítico.',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Exame Físico e Triagem Clínica Materna e Neonatal',
      purpose: 'Identificar a gravidade inflamatória local, detectar sinais de sepse materna e rastrear toxicidade na ninhada.',
      description:
        'Avaliação sistemática de todos os pares mamários, desde o primeiro par torácico até o quinto par inguinal (em cadelas) e quatro pares em gatas. Registrar consistência, temperatura local, hiperestesia e coloração cutânea. Examinar cuidadosamente a vulva e lóquios pós-parto para detectar metrite. Em paralelo, inspecionar a ninhada avaliando atividade motora, preenchimento abdominal, hidratação e peso corporal com balança eletrônica de precisão (Nelson & Couto, 6ª ed.; BSAVA Reproduction, 2ª ed.).',
      interpretation:
        'Glândula dolorosa, quente e endurecida com leite descolorido confirma mastite. Hipotermia materna, petéquias ou pele mamária violácea fria indicam mastite gangrenosa e sepse puerperal. Filhotes em choro contínuo com perda ponderal confirmam agalactia ou síndrome do leite tóxico.',
      limitations:
        'A palpação profunda em fêmeas com dor intensa requer extrema cautela e analgesia prévia para evitar traumatismo tecidual ou reações agressivas defensivas.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Citologia do Leite Mamário e Mensuração de pH',
      purpose: 'Diferenciar mastite séptica de galactostase não infecciosa em minutos e comprovar infecção bacteriana ativa.',
      description:
        'Higienizar a extremidade do teto com clorexidina a 0,5%, descartar as primeiras duas gotas e ordenhar diretamente uma gota em lâmina microscópica e uma gota sobre fita indicadora de pH. Corar a lâmina seca com Diff-Quik (Panótico rápido) ou Gram. O leite normal possui pH 6,2 a 6,5 e exibe raros neutrófilos, células epiteliais e colostrofores espumosos. A mastite apresenta pH alcalino (> 7,0 a 7,8) e exsudato neutrofílico maciço (> 20 neutrófilos por campo de imersão de 1000x), com neutrófilos exibindo alterações tóxicas/degenerativas (cariólise) e bactérias (cocos ou bacilos) fagocitadas intracelularmente (Nelson & Couto, 6ª ed.; Svensson et al., 2023).',
      interpretation:
        'A demonstração de neutrófilos degenerados com bactérias intracelulares confirma mastite bacteriana séptica de forma definitiva e imediata, justificando início imediato de antimicrobianos. A presença de leite com pH normal e macrófagos sem bactérias indica galactostase estéril.',
      limitations:
        'Em mastites muito agudas ou com obstrução ductal maciça, o leite obtido pode conter apenas detritos amorfos ou não fluir, exigindo aspiração com agulha fina (PAAF) sob orientação ultrassonográfica.',
      isGoldStandard: true,
    },
    {
      stepNumber: 3,
      title: 'Cultura Microbiológica e Antibiograma do Leite',
      purpose: 'Identificar a espécie bacteriana causadora e determinar o perfil de sensibilidade e resistência antimicrobiana.',
      description:
        'Coleta rigorosamente estéril do leite mamário antes da administração da primeira dose de antimicrobiano. Limpeza antisséptica cirúrgica do teto com álcool 70% e clorexidina. O leite é ordenhado para tubo estéril e encaminhado sob refrigeração para cultivo quantitativo em ágar sangue e ágar MacConkey, seguido de teste de sensibilidade aos antimicrobianos (antibiograma por disco-difusão ou microdiluição em caldo) (Svensson et al., 2023; Greene\'s, 5ª ed. 2023).',
      interpretation:
        'Crescimento bacteriano significativo (> 10^4 UFC/mL) de patógenos puros (E. coli, S. pseudintermedius, Streptococcus spp.) correlacionado à citologia inflamatória orienta o descalonamento ou ajuste da antibioticoterapia empírica inicial.',
      limitations:
        'O resultado demora de 48 a 72 horas para ficar disponível, inviabilizando a espera para o início da terapia. Conforme Svensson et al. (2023), 86% das cadelas sadias têm bactérias comensais no leite; portanto, cultura positiva sem citologia inflamatória ou sinais clínicos NÃO fecha diagnóstico de mastite.',
      isGoldStandard: false,
    },
    {
      stepNumber: 4,
      title: 'Ultrassonografia Mamária de Alta Frequência',
      purpose: 'Avaliar arquitetura tecidual, identificar abscessos encapsulados, quantificar estase ductal e mapear necrose gangrenosa.',
      description:
        'Exame com transdutor linear superficial de alta resolução (10 a 18 MHz) aplicado sobre a pele da glândula mamária previamente umedecida com álcool ou gel acústico. Avalia-se o parênquima mamário em planos longitudinais e transversais, comparando glândulas sadias e afetadas. Utilização de Doppler colorido para avaliar o fluxo vascular nos vasos mamários (Ettinger, 9ª ed. 2024).',
      interpretation:
        'A mastite catarral/aguda exibe espessamento tecidual heterogêneo difuso com ectasia de ductos lactíferos repletos de ecos internos fluidos. O abscesso mamário caracteriza-se por cavidade focal bem delineada com conteúdo anecoico a hipoecoico espesso, debris móveis e reforço acústico posterior, orientando punção ou drenagem cirúrgica. A ausência de fluxo ao Doppler colorido associada à perda da estratificação tecidual indica infarto isquêmico e gangrena.',
      limitations:
        'Edema subcutâneo muito exuberante pode limitar a penetração acústica dos feixes ultrassonográficos de alta frequência em cadelas de grande porte.',
      isGoldStandard: false,
    },
    {
      stepNumber: 5,
      title: 'Hemograma Completo, Bioquímica Sérica e Lactato',
      purpose: 'Detectar sepse, resposta inflamatória sistêmica (SIRS), disfunção renal/hepática e alterações metabólicas na mãe.',
      description:
        'Colheita de sangue venoso para avaliação hematológica automatizada com contagem diferencial de leucócitos, creatinina, ureia, ALT, fosfatase alcalina, albumina, glicemia, eletrólitos (sódio, potássio, cálcio iônico) e lactato sérico (Ettinger, 9ª ed. 2024; Nelson & Couto, 6ª ed.).',
      interpretation:
        'Leucocitose acentuada por neutrofilia com desvio à esquerda regenerativo ou neutropenia com desvio degenerativo severo e toxicidade neutrofílica (vacuolização, corpúsculos de Döhle) confirmam sepse bacteriana grave. Trombocitopenia sugere consumo plaquetário e risco de CIVD. Hipoalbuminemia ocorre por extravasamento tecidual. Lactato sérico > 2,5 mmol/L indica hipoperfusão sistêmica e choque.',
      limitations:
        'Alterações laboratoriais sistêmicas podem ser brandas ou ausentes em mastites focais leves sem disseminação vascular.',
      isGoldStandard: false,
    },
    {
      stepNumber: 6,
      title: 'Diagnósticos Diferenciais Obrigatórios',
      purpose: 'Excluir condições não bacterianas e síndromes proliferativas que simulam mastite aguda.',
      description:
        'Diferenciar mastite aguda de:\n' +
        '1. Galactostase (ingurgitamento fisiológico): Glândulas muito aumentadas e firmes no pico da lactação, mas sem dor excruciante, sem febre, sem calor excessivo, com leite de aspecto e pH normais e citologia sem neutrófilos degenerados.\n' +
        '2. Hiperplasia Fibroadenomatosa Mamária Felina (Fibroadenoma / Hipertrofia Progestágena): Acomete gatas jovens gestantes ou sob terapia com progestinas exógenas (acetato de medroxiprogesterona). Aumento maciço e exuberante de todas as glândulas mamárias, firme, não doloroso inicialmente, sem infecção primária.\n' +
        '3. Carcinoma Mamário Inflamatório: Neoplasia mamária maligna altamente invasiva com infiltração de vasos linfáticos dérmicos, mimetizando celulite e mastite com eritema, edema em casca de laranja e dor intensa, comum em fêmeas idosas não castradas, frequentemente fora do período de lactação.\n' +
        '4. Dermatite e Celulite Perimamária: Infecções cutâneas superficiais da pele abdominal sem acometimento primário do tecido glandular mamário.',
      interpretation:
        'Identificar a etiologia correta evita uso inadequado de antibióticos em galactostases puras e intervenções cirúrgicas equivocadas em carcinomas inflamatórios.',
      limitations:
        'Carcinoma inflamatório pode coexistir com necrose secundária superficial, exigindo biópsia incisional se a lesão não responder ao tratamento antimicrobiano convencional.',
      isGoldStandard: false,
    },
  ],
  treatment: {
    antimicrobianos: [
      'Princípios de Seleção Farmacológica na Lactação: O antimicrobiano de escolha deve apresentar propriedades físico-químicas que favoreçam sua concentração no parênquima mamário (lipofilicidade moderada a alta e fraca ligação proteica), atividade bactericida contra Gram-positivos e Gram-negativos e segurança estrita para os filhotes neonatos que absorverão frações do fármaco através do leite (Plumb\'s, 10ª ed.; BSAVA Formulary, 10ª ed.).',
      'Antimicrobianos de Primeira Escolha (Casos Leves a Moderados sem Sepse):\n' +
      '- Amoxicilina com Clavulanato de Potássio: 13,75 a 20 mg/kg por via oral a cada 12 horas (PO q12h). Excelente cobertura contra Staphylococcus pseudintermedius produtor de betalactamase, Streptococcus spp. e cepas suscetíveis de E. coli. Baixíssima toxicidade neonatal (apenas risco esporádico de diarreia benigna transitória na ninhada).\n' +
      '- Cefalexina: 20 a 30 mg/kg por via oral a cada 8 a 12 horas (PO q8–12h). Cefalosporina de primeira geração com excelente tropismo tecidual cutâneo e mamário e potente ação contra cocos Gram-positivos.',
      'Antimicrobianos Parenterais em Mastite Grave, Gangrenosa ou Sepse Puerperal:\n' +
      '- Ampicilina Sódica + Sulbactam: 22 a 30 mg/kg IV a cada 8 horas (IV q8h) ou Cefazolina Sódica: 22 a 25 mg/kg IV a cada 8 horas.\n' +
      '- Terapia Combinada para Choque Séptico / Cobertura Gram-negativa Ampliada: Em casos de colapso circulatório ou forte suspeita de bacteremia por enterobactérias, associar Enrofloxacino (5 mg/kg IV ou SC q24h) ou Amicacina (15–20 mg/kg IV ou SC q24h uma vez ao dia, após restauração volêmica e confirmação de função renal normal). ATENÇÃO: O uso de fluoroquinolonas ou aminoglicosídeos EXIGE O DESMAME IMEDIATO E TOTAL DA NINHADA, devido aos riscos de artropatia cartilaginosa e nefro/ototoxicidade nos neonatos.',
      'Antimicrobianos Formalmente Contraindicados na Amamentação Ativa:\n' +
      '- Fluoroquinolonas (Enrofloxacino, Marbofloxacino): Causam erosão e necrose nas cartilagens articulares em crescimento de filhotes jovens, com claudicação e deformidades permanentes.\n' +
      '- Tetraciclinas (Doxiciclina, Oxitetraciclina): Quelam o cálcio, depositam-se nos dentes e ossos em desenvolvimento, causando hipoplasia do esmalte dentário, descoloração amarelada permanente e retardo no crescimento ósseo.\n' +
      '- Cloranfenicol: Inibe a síntese de proteínas mitocondriais e causa aplasia medular e síndrome do bebê cinzento em neonatos devido à imaturidade do sistema enzimático hepático de glicuronidação.',
      'Duração da Antibioticoterapia: Manter por no mínimo 10 a 14 dias contínuos. Reavaliar a glândula em 48 a 72 horas com nova citologia do leite. Ajustar o regime terapêutico assim que os resultados do antibiograma estiverem disponíveis.',
    ],
    suporteLocal: [
      'Termoterapia com Compressas Úmidas: Aplicar toalhas limpas embebidas em água morna (temperatura confortável ao dorso da mão) sobre a glândula afetada por 10 a 15 minutos, 3 a 4 vezes ao dia. O calor promove vasodilatação arteriolar, reduz o espasmo ductal e facilita a drenagem do leite estagnado.',
      'Ordenha Manual Terapêutica Esvaziadora: Após a termoterapia morna, realizar massagem suave com movimentos centrípetos (da base da mama em direção ao teto) e ordenha manual delicada para esvaziar o máximo possível de secreção purulenta e leite retido. O esvaziamento alivia a pressão intraductal e remove mediadores inflamatórios. Descartar todo o leite ordenhado com assepsia.',
      'Compressas Frias de Folhas de Repolho (Brassica oleracea): Em mastites hiperagudas com edema túrgido e dor excruciante onde o calor agrava o edema tecidual, a aplicação tópica de folhas de repolho verde frescas, lavadas e levemente refrigeradas por 20 a 30 minutos tem eficácia clínica comprovada em obstetrícia para alívio rápido do edema e dor por compressão mecânica e fitonutrientes anti-inflamatórios.',
      'Higiene Rigorosa e Troca Constante da Cama: Manter a fêmea e a ninhada em ambiente limpo, seco e arejado, substituindo mantas e toalhas sanitárias contaminadas com secreções mamárias ou lóquios ao menos duas vezes ao dia.',
    ],
    analgesia:
      'O manejo da dor é um pilar ético e terapêutico mandatório na mastite puerperal. A dor severa suprime a oxitocina e impede a ejeção láctea, além de induzir anorexia e agressividade maternal.\n\n' +
      '1. Opioides:\n' +
      '- Buprenorfina: Agonista parcial mu com excelente segurança materno-neonatal e perfil analgésico duradouro. Dose: 0,01 a 0,02 mg/kg por via transmucosa oral (SL), subcutânea (SC) ou intramuscular (IM) a cada 8 a 12 horas em cadelas e gatas. Fármaco de primeira linha para dor moderada a severa.\n' +
      '- Tramadol: Agonista mu fraco e inibidor da recaptação de serotonina/noradrenalina. Dose: 2 a 5 mg/kg PO a cada 8 a 12 horas em cães (eficácia controversa em cães devido à baixa produção do metabólito ativo M1; em gatos deve ser evitado por causar sialorreia profusa e disforia).\n' +
      '- Metadona: 0,1 a 0,3 mg/kg IV, SC ou IM q6–8h em pacientes hospitalizadas com mastite gangrenosa ou dor excruciante refratária.\n\n' +
      '2. Anti-Inflamatórios Não Esteroidais (AINEs):\n' +
      '- Meloxicam: 0,1 mg/kg no primeiro dia, seguido de 0,05 mg/kg por via oral uma vez ao dia (PO q24h) com alimento por 3 a 5 dias.\n' +
      'CRITÉRIO DE SEGURANÇA ABSOLUTO: AINEs só devem ser administrados em pacientes estritamente normotensas, euvolêmicas, sem histórico de hemorragia gastrintestinal e com função renal comprovadamente preservada (creatinina e ureia séricas normais). Em fêmeas desidratadas, sépticas ou em choque, os AINEs são FORMALMENTE CONTRAINDICADOS pelo risco iminente de necrose papilar renal e úlceras perfurantes no trato gastrointestinal.',
    cirurgia: [
      'Indicações Formais para Intervenção Cirúrgica:\n' +
      '1. Abscesso Mamário Encapsulado com Flutuação: Não responde adequadamente apenas ao tratamento clínico devido à barreira mecânica avascular da cápsula de tecido conectivo e à inativação bacteriana no meio purulento ácido.\n' +
      '2. Mastite Gangrenosa Necrotizante: A preservação do tecido necrótico libera doses letais contínuas de endotoxinas na circulação materno-fetal e serve como foco de gangrena progressiva gasosa.\n' +
      '3. Fístulas Mamárias Crônicas com Drenagem Purulenta Persistente.',
      'Procedimentos Cirúrgicos Recomendados:\n' +
      '- Drenagem e Debridamento de Abscesso: Incisão na porção mais dependente da coleção purulenta sob anestesia geral e bloqueio local. Aspiração do pus, desbridamento suave de septos fibrosos internos, lavagem profusa com solução fisiológica morna associada a clorexidina degermante diluída a 0,05%. Inserção de dreno passivo de Penrose fenestrado fixado com pontos simples de náilon, mantido por 48 a 72 horas até que a drenagem cesse significativamente.\n' +
      '- Desbridamento Amplo e Mastectomia Parcial ou Total: Na mastite gangrenosa, realiza-se excisão cirúrgica com margem de segurança de todo o parênquima mamário necrosado e pele isquêmica associada. Se houver envolvimento de múltiplos pares na mesma cadeia, a mastectomia regional ou total da cadeia mamária unilateral é o procedimento salvador de vida, seguido de síntese reconstrutiva com retalhos cutâneos de avanço (BSAVA Reproduction, 2ª ed.; Ettinger, 9ª ed. 2024).',
    ],
    lactacao: [
      'Manejo da Amamentação e Decisão de Desmame:\n' +
      '- Mastite Focal Leve com Leite Pouco Alterado: Se a fêmea estiver alerta, clinicamente estável, sem febre elevada e recebendo betalactâmicos seguros (amoxicilina-clavulanato ou cefalexina), os filhotes PODEM continuar mamando nas glândulas sadias não afetadas. O esvaziamento das mamas sadias pela ninhada previne novas galactostases. A glândula doente deve ser enfaixada ou protegida com camiseta cirúrgica neonatal para evitar a sucção de leite purulento pelos filhotes.\n' +
      '- Mastite Purulenta Grave, Abscesso Aberto, Gangrena ou Sepse Materna: Nestas condições, o DESMAME IMEDIATO E COMPLETO DA NINHADA É OBRIGATÓRIO. O leite contém cargas letais de patógenos e toxinas, e a mãe não tem capacidade fisiológica de manter a lactação.\n\n' +
      'Supressão Farmacológica da Lactação (Ablactação Médica com Cabergolina):\n' +
      'Quando o desmame total é imposto, deve-se inibir a lactação farmacologicamente para interromper o estímulo inflamatório e o acúmulo de secreção:\n' +
      '- Cabergolina: Agonista sintético potente e de ação prolongada dos receptores de dopamina D2 que inibe a secreção de prolactina pela adeno-hipófise. Promove rápida cessação da lactogênese em 48 a 72 horas sem provocar os efeitos colaterais de êmese intensa frequentes com a bromocriptina antiga.\n' +
      'Dose em cães e gatos: 5 mcg/kg (0,005 mg/kg) por via oral, administrada uma vez ao dia (PO q24h) com alimento por 5 a 7 dias consecutivos (Plumb\'s, 10ª ed.; BSAVA Formulary, 10ª ed.).',
    ],
    suporteNeonatal: [
      'Protocolo de Cuidados Neonatais Intensivos (Filhotes Órfãos ou Afastados):\n' +
      '1. Aquecimento Ativo e Controle Térmico: Neonatos nas primeiras 2 semanas não possuem reflexo de calafrio e dependem integralmente de fonte de calor externa. Manter a caixa-ninho com colchão térmico controlado (30 a 32°C na primeira semana, 27 a 29°C na segunda semana, com umidade relativa de 55–65%). Filhotes hipotérmicos (< 35°C) NUNCA DEVEM SER ALIMENTADOS por via enteral até que sua temperatura retal atinja pelo menos 36,5°C, pois a hipotermia paralisa o trânsito gastrintestinal (íleo paralítico) e induz fermentação letal do leite com regurgitação e aspiração pulmonar.\n' +
      '2. Nutrição Artificial com Sucedâneo Lácteo Específico: NUNCA usar leite de vaca puro (baixo teor proteico e lipídico, excesso de lactose que deflagra diarreia osmótica grave). Utilizar fórmulas comerciais específicas para cães e gatos ou substitutos balanceados aprovados. Aquecer o leite a 37–38°C antes do fornecimento.\n' +
      'Volume e Frequência: 15 a 20 mL de fórmula por 100 g de peso vivo ao dia na primeira semana, divididos em 6 a 8 refeições (a cada 2 a 3 horas). A partir da segunda semana, 20 a 25 mL/100 g/dia a cada 3 a 4 horas.\n' +
      '3. Técnica de Fornecimento Alimentar: Mamadeiras com bicos ortodônticos apropriados, posicionando o filhote em decúbito esternal (posição natural de mamada) com a cabeça levemente erguida; NUNCA alimentar neonatos de costas para evitar pneumonia por aspiração. Se o filhote estiver fraco ou sem reflexo de sucção, administrar por sonda orogástrica maleável (sonda uretral número 4 a 6 Fr) pré-medida da ponta do focinho até a última costela.\n' +
      '4. Estimulação da Eliminação Anogenital: Após cada refeição, massagear delicadamente a região perianal e perineal com algodão ou gaze umedecida em água morna para deflagrar os reflexos de micção e defecação, os quais são reflexos involuntários dependentes de estímulo materno nas primeiras 3 semanas de vida.\n' +
      '5. Monitoramento Ponderal e Sinais Vitais: Pesar cada filhote individualmente duas vezes ao dia em balança digital com precisão de gramas. Ganho esperado: 5 a 10% do peso corporal ao dia para filhotes de cães e cerca de 10 a 15 g/dia para gatinhos. Perda ponderal em 24 horas exige intervenção de emergência.',
    ],
    monitoramento: [
      'Mãe: Avaliação de pressão arterial sistólica, tempo de preenchimento capilar, frequência cardíaca e respiratória e temperatura a cada 4 a 6 horas em pacientes internadas.',
      'Lactato Sérico e Função Renal: Monitorar a depuração de lactato a cada 12 a 24 horas até a normalização (< 2,0 mmol/L) em fêmeas sépticas.',
      'Inspeção da Ferida Mamária: Avaliar cicatrização, integridade de suturas, débito de drenos e fístulas diariamente.',
      'Controle Citológico do Leite: Repetir citologia do leite a cada 48 a 72 horas para documentar o desaparecimento de neutrófilos degenerados e fagocitose bacteriana.',
    ],
  },
  complications: {
    principais: [
      'Mastite Gangrenosa Necrotizante e Infarto Mamário: Isquemia transmural aguda provocada por trombose arteriolar e toxinas bacterianas, com necrose completa do parênquima glandular e pele sobrejacente, evoluindo para feridas ulceradas extensas, perda tecidual grave e risco extremo de choque séptico.',
      'Sepse Puerperal, Choque Distributivo e Falência de Múltiplos Órgãos: Translocação bacteriana e circulação maciça de endotoxinas (LPS) através da drenagem venosa mamária, culminando em síndrome da resposta inflamatória sistêmica (SIRS), vasodilatação refratária, lesão renal aguda isquêmica, síndrome do desconforto respiratório agudo (SDRA) e colapso hemodinâmico fatal.',
      'Coagulação Intravascular Disseminada (CIVD): Ativação descontrolada da cascata de coagulação tecidual mediada por citocinas e endotoxinas, com consumo maciço de plaquetas e fatores de coagulação, petéquias cutâneas, sangramentos espontâneos por feridas operatórias e microtrombose de órgãos nobres.',
      'Abscesso Mamário Extenso e Formação de Fístulas Cutâneas Crônicas: Convalescença de coleções purulentas não drenadas cirurgicamente que rompem espontaneamente através da pele, criando trajetos fistulosos crônicos de drenagem exsudativa fétida e retardo cicatricial.',
      'Síndrome do Leite Tóxico Neonatal e Enterite Necrosante: Intoxicação maciça dos neonatos por ingestão de leite com alta carga bacteriana e endotoxinas, deflagrando aerofagia severa, colite necrotizante, hipoglicemia rápida, hipotermia (< 35°C), desidratação e morte de toda a ninhada em menos de 24 a 48 horas.',
      'Agalactia Puerperal Permanente e Perda de Glândula Funcional: Destruição extensa dos ácinos secretores e fibrose cicatricial com estenose ductal pós-inflamatória, inutilizando permanentemente a glândula para futuras lactações.',
      'Rejeição Maternal Violenta e Canibalismo Neonatal: A dor excruciante sentida pela mãe durante a aproximação e sucção dos filhotes desencadeia respostas comportamentais agressivas anômalas, resultando em traumatismo físico, esmagamento ou canibalismo dos neonatos.',
    ],
    fatoresPrognosticos: [
      'Prognóstico Excelente a Bom: Mastite bacteriana focal catarral ou seropurulenta diagnosticada precocemente nas primeiras 24 horas, em fêmea alerta, normotensa, sem sepse, com resposta rápida à amoxicilina-clavulanato e manutenção parcial do aleitamento nas mamas saudáveis.',
      'Prognóstico Reservado: Abscesso mamário volumoso com necessidade de drenagem cirúrgica e antibioticoterapia prolongada; mastite multifocal acometendo mais de 3 pares mamários; ninhada debilitada com perda de mais de 10% do peso vivo.',
      'Prognóstico Desfavorável a Grave: Mastite gangrenosa necrotizante, presença de petéquias ou sangramentos espontâneos (CIVD), hipotermia materna (< 37,5°C), neutropenia degenerativa grave com desvio à esquerda e hiperlactatemia sustentada refratária à ressuscitação volêmica.',
    ],
  },
  prevention: {
    medidas: [
      'Higienização Rigorosa da Caixa de Parto e Ambiente: Manter o piso da maternidade rigorosamente seco, limpo e desinfetado com amônia quaternária ou soluções cloradas, trocando diariamente as mantas e toalhas para reduzir a carga bacteriana ambiental de coliformes e estafilococos.',
      'Aparamento Periódico das Garras dos Neonatos: Cortar cuidadosamente as pontas pontiagudas das unhas das patas anteriores de todos os filhotes a cada 5 a 7 dias, a partir do terceiro dia de vida, com cortador apropriado, impedindo a ocorrência de microlacerações e escoriações traumáticas na pele do teto e mamas da mãe durante o estímulo de amamentação.',
      'Inspeção Clínica e Palpação Diária das Mamas: Orientar o tutor e a equipe de enfermagem a palpar cuidadosamente todos os pares mamários duas vezes ao dia nas primeiras 4 semanas de lactação, avaliando temperatura, consistência e fluxo de leite ao menor sinal de inquietação materna.',
      'Rotação Induzida dos Filhotes entre as Glândulas: Estimular que todos os filhotes mamem alternadamente em todas as glândulas mamárias (especialmente nas mamas torácicas, que produzem menos e tendem a ser abandonadas pelos filhotes mais fortes em favor das mamas inguinais), prevenindo a estase láctea e o ingurgitamento focal.',
      'Manejo Proativo na Morte da Ninhada ou Desmame Abrupto: Em casos de perda precoce dos filhotes ou desmame forçado, instituir imediatamente redução gradual do volume de ração por 24 horas e iniciar terapia com cabergolina (5 mcg/kg PO q24h por 5 dias) para bloquear a secreção de prolactina e impedir galactostase grave com mastite secundária.',
      'Tratamento Agressivo de Focos Infecciosos Pós-Parto: Investigar e tratar prontamente qualquer caso de metrite puerperal bacteriana, retenção placentária ou infecção cutânea para impedir a disseminação bacteriana hematógena para o parênquima mamário.',
    ],
    antibiotico:
      'Proibição Formal do Uso Profilático de Antimicrobianos na Lactação: É terminantemente contraindicado o uso preventivo, profilático ou metafilático de antibióticos sistêmicos em cadelas e gatas paridas saudáveis com a intenção de "evitar mastite". Essa prática empírica nociva não reduz a incidência de infecções mamárias, mas seleciona cepas de Staphylococcus pseudintermedius e enterobactérias multirresistentes a betalactâmicos (MRSP / ESBL), desequilibra a microbiota intestinal fisiológica da mãe e da ninhada em desenvolvimento e expõe os neonatos a metabólitos tóxicos desnecessários. O pilar preventivo seguro é a higiene impecável, a rotação de mamada e a detecção precoce.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['tumores-mamarios-caes-gatos'],
  relatedMedicationSlugs: ['amoxicilina-clavulanato'],
  references: [
    {
      id: 'ref-bsava-repro-mastitis',
      citationText:
        'England GCW, von Heimendahl A. BSAVA Manual of Canine and Feline Reproduction and Neonatology. 2nd ed. British Small Animal Veterinary Association; 2011. Cap. 12: Postpartum disorders and lactation, pp. 165–172; Cap. 14: Care and resuscitation of the neonate, pp. 188–202.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Diretriz de especialista / Livro-texto de referência',
    },
    {
      id: 'ref-ettinger-mastitis',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and the Cat. 9th ed. Elsevier; 2024. Cap. 308: Mammary Gland Disorders and Postpartum Complications, pp. 2095–2101.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Padrão ouro em medicina interna',
    },
    {
      id: 'ref-nelson-couto-mastitis',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 55: Disorders of the Mammary Gland – Mastitis, Galactostasis, and Agalactia, pp. 1008–1011.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Referência clínica de consenso',
    },
    {
      id: 'ref-greenes-mastitis',
      citationText:
        'Sykes JE. Greene\'s Infectious Diseases of the Dog and Cat. 5th ed. Elsevier; 2023. Cap. 42: Staphylococcal and Streptococcal Infections; Cap. 48: Gram-negative bacterial infections of the genital and mammary tract.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Referência primária em infectologia',
    },
    {
      id: 'ref-plumbs-mastitis',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Amoxicillin/Clavulanate Potassium, Cephalexin, Cabergoline, Ampicillin/Sulbactam, Buprenorphine, Meloxicam.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica padrão',
    },
    {
      id: 'ref-normal-canine-milk-2023',
      citationText:
        'Svensson A, et al. Bacteria in normal canine milk analyzed by blood agar medium and mass spectrometry. Animals. 2023;13(14):2289.',
      sourceType: 'Estudo prospectivo controlado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37444004/',
      notes:
        'Estudo prospectivo em 210 amostras demonstrando crescimento bacteriano comensal em 86% das cadelas paridas clinicamente saudáveis, refutando o uso de cultura láctea isolada para prescrição de antibióticos.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-bsava-formulary-mastitis',
      citationText:
        'Ramsey I. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografias: Cabergoline (p. 62), Amoxicillin-clavulanate (pp. 24–25).',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência de consenso em dosagem',
    },
  ],
  isPublished: true,
  source: 'seed',
};
