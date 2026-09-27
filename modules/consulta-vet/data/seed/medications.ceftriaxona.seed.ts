import type { MedicationRecord } from '../../types/medication';

export const ceftriaxonaMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-ceftriaxona',
    slug: 'ceftriaxona',
    title: 'Ceftriaxona',
    activeIngredient: 'Ceftriaxona / Ceftriaxona Sódica',
    pharmacologicClass:
      'Antibacteriano bactericida da classe das cefalosporinas de 3ª geração (oxyimino-cefalosporina); ação tempo-dependente (fT>MIC)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Ceftriaxona',
      'Ceftriaxona Sódica',
      'Rocefin',
      'Keftron',
      'Cefalosporinas de 3ª Geração',
      'Bactericida Tempo-Dependente',
      'fT>MIC',
      'Sepse Hospitalar',
      'Meningite Bacteriana',
      'Borreliose de Lyme',
      'Incompatibilidade com Cálcio',
      'Antimicrobial Stewardship',
      'WOAH 2024-2025',
    ],
    tradeNames: [
      'Rocefin® Frasco-Ampola 500 mg e 1 g IV/IM (Roche Farmacêutica — Referência Humana)',
      'Ceftriaxona Sódica Eurofarma 500 mg e 1 g IM com Lidocaína 1% e IV (Eurofarma — Reg. MS 1.0043.0710)',
      'Keftron® ABL 1 g Frasco-Ampola Pó para Solução Injetável (Antibióticos do Brasil Ltda — Reg. MS 1.5562.0009)',
      'Ceftriaxona Sódica Genérica ABL 1 g Pó Injetável (Antibióticos do Brasil Ltda — Reg. MS 1.5562.0054)',
    ],
    officialSiteUrl: 'https://eurofarma.com.br/lang/pt/produtos/ceftriaxona-sodica-i-m',
    leafletUrl:
      'https://www.ablbrasil.com.br/wp-content/uploads/2023/03/IB280922a_Versao_Profissional-Saude-ceftriaxona-dissodica-hemieptaidratada.pdf',
    mechanismOfAction:
      'A ceftriaxona é uma cefalosporina semissintética parenteral de terceira geração pertencente ao grupo das oxyimino-cefalosporinas (fórmula molecular C₁₈H₁₈N₈O₇S₃; peso molecular 554,58 g/mol; sal dissódico anidro ~598,6 g/mol; forma farmacêutica hemieptaidratada ~1,193 g de sal para 1 g de fármaco ativo). Sua estrutura química confere elevada hidrofilia e estabilidade frente a uma ampla variedade de beta-lactamases bacterianas de espectro restrito. Atua através da mimetização estereoespecífica do dímero terminal D-alanil-D-alanina dos precursores de peptidoglicano, ligando-se covalentemente e acilando o sítio catalítico serina das proteínas ligadoras de penicilina (PBPs), com afinidade proeminente pelas PBP-2 e PBP-3 em bacilos Gram-negativos e transpeptidases de alto peso molecular. A inativação das PBPs interrompe a reação de transpeptidação terminal necessária para o entrecruzamento das cadeias polissacarídicas de peptidoglicano, gerando uma parede celular defeituosa e osmoticamente frágil. A persistência de hidrólise pelas autolisinas e mureína hidrolases endógenas, sem a contrapartida de síntese da parede, desestabiliza a pressão osmótica interna e desencadeia a lise e morte bactericida rápida. Seu perfil farmacodinâmico é estritamente tempo-dependente, sendo a porcentagem do intervalo entre doses em que a concentração plasmática livre excede a Concentração Inibitória Mínima do patógeno (% fT > MIC) o índice correlacionado com a erradicação bacteriológica e o sucesso clínico (alvo ótimo entre 40% e 70% do intervalo). Devido à sua baixa ligação proteica e rápida eliminação renal em cães e gatos, o fármaco apresenta meia-vida plasmática muito curta (aproximadamente 0,9 a 1,7 horas), o que exige planejamento criterioso do intervalo posológico (preferencialmente q12h em infecções graves ou isolados com MIC moderada) em oposição à administração diária única (q24h) comumente empregada na medicina humana.',
    plainLanguageSummary:
      'A ceftriaxona é um antibiótico injetável bactericida hospitalar de alta potência da classe das cefalosporinas de 3ª geração. É utilizada na medicina veterinária de forma extra-label (a partir de formulações humanas hospitalares) para o tratamento de infecções bacterianas graves e sepse causadas por microrganismos comprovadamente sensíveis em cultura e antibiograma, além de situações especiais como meningites e borreliose de Lyme canina. Ao contrário do que ocorre em seres humanos (onde a medicação dura cerca de 24 horas no sangue), cães e gatos eliminam a ceftriaxona muito rapidamente (meia-vida de apenas 1 a 2 horas), de modo que em infecções sérias a aplicação deve ser realizada a cada 12 horas para manter o nível do remédio acima do necessário para eliminar a bactéria. CUIDADO CRÍTICO HOSPITALAR: a ceftriaxona NUNCA deve ser misturada, diluída ou infundida simultaneamente com soluções que contenham cálcio (incluindo Ringer com Lactato), pelo risco grave de precipitação de cristais nos vasos e órgãos. Apresentações que utilizam lidocaína como diluente destinam-se exclusivamente à injeção intramuscular para alívio da dor local e JAMAIS podem ser administradas na veia (IV). No Brasil, sua aquisição sob prescrição veterinária exige receita em duas vias com validade de 10 dias.',

    indications: [
      'Infecções sistêmicas graves e sepse bacteriana de origem abdominal, urinária superior ou respiratória por bacilos Gram-negativos suscetíveis (Enterobacterales como Escherichia coli, Klebsiella pneumoniae, Proteus mirabilis) documentados em cultura e antibiograma.',
      'Meningite e meningoencefalite bacteriana em cães por microrganismos suscetíveis, beneficiando-se da capacidade das cefalosporinas de 3ª geração de transpor a barreira hematoencefálica na vigência de inflamação meníngea ativa.',
      'Endocardite bacteriana infecciosa canina causada por Streptococcus canis suscetível (20 mg/kg IV q12h por 14 dias seguido de transição para terapia oral de longa duração).',
      'Borreliose de Lyme canina (Borrelia burgdorferi) como protocolo de resgate parenteral quando as tetraciclinas de primeira linha (doxiciclina ou minociclina) são contraindicadas ou resultam em intolerância.',
      'Pielonefrite bacteriana aguda complicada e urossepse com choque séptico necessitando de terapia parenteral imediata, enquanto se aguarda o resultado confirmatório de urocultura.',
      'Broncopneumonia bacteriana bacterêmica grave hospitalar em pequenos animais necessitando de estabilização intensiva parenteral prévia ao desescalonamento microbiológico.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida à ceftriaxona, a qualquer outra cefalosporina ou histórico de anafilaxia prévia a antibacterianos beta-lactâmicos (penicilinas, carbapenêmicos).',
      'Mistura física na mesma seringa, reconstituição, diluição em frasco ou infusão simultânea em Y-site com soluções contendo cálcio (incluindo Solução de Ringer com Lactato, Solução de Hartmann ou gluconato de cálcio), pelo risco iminente de formação e precipitação microvascular de cristais insolúveis de ceftriaxona-cálcio.',
      'Administração intravenosa de formulações reconstituídas com diluente contendo lidocaína 1% (a lidocaína é destinada estritamente à via intramuscular para analgesia local; a infusão IV inadvertida deflagra arritmias cardíacas graves e colapso circulatório).',
      'Monoterapia empírica em infecções causadas por bactérias anaeróbias obrigatórias estritas (Bacteroides fragilis, Clostridium spp.), contra as quais a ceftriaxona apresenta cobertura imprevisível e clinicamente não confiável.',
      'Infecções suspeitas ou confirmadas por Enterococcus spp., Pseudomonas aeruginosa ou Staphylococcus meticilino-resistentes (MRSP, MRSA), organismos dotados de resistência intrínseca ou perda de afinidade pelas PBPs à ceftriaxona.',
      'Uso empírico indiscriminado em infecções não complicadas (como cistite bacteriana esporádica simples ou piodermite superficial), violando os princípios internacionais de Antimicrobial Stewardship (WOAH/ISCAID).',
    ],

    cautions: [
      'Princípios de Antimicrobial Stewardship e Classificação WOAH (2024-2025): as cefalosporinas de 3ª geração são classificadas como antimicrobianos de importância crítica para a saúde humana e veterinária; seu uso deve ser rigorosamente restrito a infecções graves onde exames microbiológicos indiquem falta de alternativas de menor espectro.',
      'Falácia do Intervalo Humano (q24h): cães e gatos apresentam ligação a proteínas plasmáticas muito inferior e taxa de depuração renal substancialmente acelerada em comparação ao ser humano, resultando em meia-vida de apenas ~0,9 a 1,7 h; o intervalo q24h é frequentemente subinibitório em infecções graves, devendo-se priorizar intervalos de 12 horas (q12h) para garantir fT>MIC bactericida.',
      'Manejo estrito na fluidoterapia com Ringer Lactato: se o paciente internado estiver recebendo solução contendo cálcio, interromper temporariamente a infusão, lavar o cateter com NaCl 0,9%, infundir a ceftriaxona em carreador compatível, realizar novo flush com NaCl 0,9% e somente depois reiniciar o Ringer Lactato.',
      'Sludge biliar e pseudolitíase: a formação de sais insolúveis de ceftriaxona com cálcio na vesícula biliar pode acarretar lama/barro biliar em animais submetidos a doses elevadas (≥100 mg/kg/dia) ou tratamentos prolongados; monitorar ultrassonografia hepatobiliar caso surjam êmese, dor epigástrica ou colestase.',
      'Ajuste em disfunção renal e hepática: a ceftriaxona possui eliminação mista (renal e biliar). Embora não existam tabelas de redução percentual validadas para os estágios IRIS, pacientes com insuficiência renal avançada associada a hepatopatia severa exigem monitoramento laboratorial e individualização do intervalo posológico para evitar neurotoxicidade.',
      'Incompatibilidades físicas intravenosas: fisicamente incompatível em mistura com aminoglicosídeos, vancomicina e fluconazol; administrar sempre em linhas venosas separadas com lavagem vigorosa intermediária.',
      'Interferências em ensaios laboratoriais: pode ocasionar reações falso-positivas para glicosúria em testes de redução de cobre (como fita de sulfato de cobre) e falsa elevação de creatinina em métodos químicos manuais pontuais.',
    ],

    adverseEffects: [
      'Dor, irritação tecidual, desconforto e induração transitória no local da injeção intramuscular (amenizada quando reconstituída com diluente estéril de lidocaína 1% específico para IM).',
      'Desconforto gastrintestinal transitório (hiporexia, vômito, náusea e fezes amolecidas/diarreia osmótica decorrente da alteração da microbiota intestinal).',
      'Reações de hipersensibilidade imunomediada (urticária, prurido facial, angioedema, eritema cutâneo e, raramente, anafilaxia sistêmica mediada por IgE com broncoespasmo e hipotensão).',
      'Formação de barro biliar assintomático ("sludge" biliar) ou pseudolitíase biliar por complexação com íons cálcio na vesícula biliar em doses elevadas.',
      'Discrasias hematológicas transitórias em terapias prolongadas (neutropenia, trombocitopenia, anemia com teste de Coombs direto positivo reversíveis após a suspensão).',
      'Elevações discretas e transitórias de enzimas hepáticas (ALT, fosfatase alcalina) e ureia/creatinina séricas.',
      'Flebite ou dor vascular local em infusões intravenosas periféricas rápidas ou soluções excessivamente concentradas.',
    ],

    routes: ['iv', 'im', 'sc'],

    doses: [
      {
        id: 'dose-ceftriaxona-dog-pk',
        species: 'dog',
        indication:
          'Infecção bacteriana grave por patógeno suscetível em cães (regime padrão Plumb’s / Rebuelto 2002)',
        doseMin: 50,
        doseMax: 50,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IM ou SC',
        frequency: 'A cada 12 a 24 horas (q12h em sepse/grave; q24h em MIC baixa)',
        duration: 'Conforme foco infeccioso, resposta clínica e estabilização para terapia oral',
        notes:
          'Plumb 10ª ed., p. 231 e estudo farmacocinético de Rebuelto et al. (2002). O intervalo de 12 horas (q12h) é farmacodinamicamente muito superior e recomendado em sepse, infecção profunda ou MIC indeterminada devido à meia-vida de 1,17 h (IM) e 1,73 h (SC). O regime de q24h deve ser restrito a patógenos com MIC extremamente baixa. Não administrar com soluções contendo cálcio.',
        clinicalContext:
          'Terapia parenteral hospitalar em cães com infecções bacterianas graves documentadas por cultura.',
        monitoring:
          'Avaliação clínica do foco infeccioso, temperatura, hemograma, função renal e tolerância gastrointestinal.',
        calculatorEnabled: true,
        referenceIds: ['ref-plumbs-ceftriaxone-10ed', 'rebuelto-2002-dog-pk'],
        evidenceLevel: 'Estudo Farmacocinético Canino Controlado Crossover (Rebuelto et al., 2002)',
      },
      {
        id: 'dose-ceftriaxona-cat-pk',
        species: 'cat',
        indication:
          'Infecção bacteriana por patógeno sensível em felinos (regime Plumb’s / Albarellos 2007)',
        doseMin: 25,
        doseMax: 25,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IM ou SC',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Conforme evolução clínica e desescalonamento microbiológico',
        notes:
          'Plumb 10ª ed., p. 231 e estudo farmacocinético direto de Albarellos et al. (2007). Em gatos, 25 mg/kg produz meia-vida de 1,73 h e mantém concentrações plasmáticas livres acima da MIC90 de E. coli (0,2 mcg/mL) por 10 a 12 horas (83–92% do intervalo de 12h), respaldando farmacodinamicamente a administração q12h. O VIN descreve adicionalmente 25 a 50 mg/kg IM/IV q12h para infecções sistêmicas.',
        clinicalContext:
          'Infecções sistêmicas e de tecidos moles complicadas em gatos internados por patógenos suscetíveis.',
        monitoring:
          'Resposta clínica, hidratação, tolerância digestiva e função renal/hepática.',
        calculatorEnabled: true,
        referenceIds: ['ref-plumbs-ceftriaxone-10ed', 'albarellos-2007-cat-pk'],
        evidenceLevel: 'Estudo Farmacocinético Felino Primário Controlado (Albarellos et al., 2007)',
      },
      {
        id: 'dose-ceftriaxona-dog-meningite',
        species: 'dog',
        indication:
          'Meningite e meningoencefalite bacteriana canina por patógeno suscetível (VIN / Hertzsch 2022)',
        doseMin: 15,
        doseMax: 50,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa Lenta',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Individualizada; reavaliar conforme quadro neurológico e cultura do LCR',
        notes:
          'VIN e revisão sistemática de Hertzsch & Richter (2022). A via intravenosa (IV lenta em 30 min) é mandatória para garantir pico e difusão liquórica confiável no SNC sob inflamação meníngea. A duração deve ser guiada pela resposta neurológica, hemograma e exames de neuroimagem/líquor, não se fixando rigidamente em 4–14 dias.',
        clinicalContext:
          'Infecções do sistema nervoso central com pleocitose neutrofílica e suspeita bacteriana com barreira hematoencefálica inflamada.',
        monitoring:
          'Escore neurológico seriado, temperatura, pressão arterial e monitoramento de crises epilépticas.',
        calculatorEnabled: true,
        referenceIds: ['hertzsch-2022-cns-antimicrobial-review', 'ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Revisão Sistemática de Farmacologia no SNC (Hertzsch & Richter, 2022)',
      },
      {
        id: 'dose-ceftriaxona-dog-endocardite',
        species: 'dog',
        indication:
          'Endocardite bacteriana canina infecciosa causada por Streptococcus canis suscetível',
        doseMin: 20,
        doseMax: 20,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa',
        frequency: 'A cada 12 horas (q12h)',
        duration: '14 dias consecutivos por via parenteral, seguido de terapia oral prolongada',
        notes:
          'Plumb 10ª ed., p. 231 e VIN. Protocolo específico direcionado a isolados de Streptococcus canis com identificação microbiológica e perfil de sensibilidade. Endocardite exige bactericidas com alta exposição tecidual constante na vegetação valvar. Transicionar para antibacteriano oral guiado por antibiograma após o ciclo parenteral inicial.',
        clinicalContext:
          'Cães com vegetação valvar ecocardiográfica confirmada e hemocultura positiva para Streptococcus canis.',
        monitoring:
          'Ecocardiograma de controle, hemoculturas seriadas, ausculta de sopros cardíacos e creatinina sérica.',
        calculatorEnabled: true,
        referenceIds: ['ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Diretriz Terapêutica Especializada do Plumb’s 10ª ed.',
      },
      {
        id: 'dose-ceftriaxona-lyme',
        species: 'dog',
        indication:
          'Borreliose de Lyme canina (Borrelia burgdorferi) — protocolo alternativo de resgate (ACVIM)',
        doseMin: 25,
        doseMax: 25,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa ou Subcutânea',
        frequency: 'A cada 24 horas (q24h)',
        duration: '14 a 30 dias consecutivos',
        notes:
          'Consenso ACVIM Borreliose de Lyme (Littman et al., 2018), Plumb 10ª ed. e VIN. A ceftriaxona é considerada protocolo alternativo parenteral de resgate para cães refratários ou que não toleram tetraciclinas orais (doxiciclina ou minociclina são os fármacos de primeira escolha preconizados pelo consenso).',
        clinicalContext:
          'Poliartrite ou síndrome clínica de borreliose em cães soropositivos e sintomáticos intolerantes à doxiciclina.',
        monitoring:
          'Regressão da claudicação articular, febre, proteinúria (relação UPC) e função renal.',
        calculatorEnabled: true,
        referenceIds: ['littman-2018-acvim-lyme', 'ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ACVIM (Littman et al., 2018)',
      },
      {
        id: 'dose-ceftriaxona-sepse-hospitalar',
        species: 'both',
        indication:
          'Terapia antimicrobiana parenteral inicial em sepse e choque séptico por patógenos suscetíveis',
        doseMin: 25,
        doseMax: 50,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'Intravenosa Lenta em 30 minutos',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Fase crítica de internação até estabilização e desescalonamento por cultura',
        notes:
          'Infusão intravenosa lenta em carreador compatível (NaCl 0,9% ou SG 5%) ao longo de 20 a 30 minutos (taxa média de 0,83 a 1,67 mg/kg/min). Não administrar em bólus rápido. Estritamente proibida mistura ou Y-site com soluções contendo cálcio (incluindo Ringer Lactato). Realizar coleta microbiológica prévia à primeira dose.',
        clinicalContext:
          'Pacientes caninos e felinos em ambiente de UTI veterinária com síndrome da resposta inflamatória sistêmica (SIRS) e foco infeccioso bacteriano grave presumido ou comprovado.',
        monitoring:
          'Pressão arterial média, lactato sérico, débito urinário, hemograma e culturas de controle.',
        calculatorEnabled: true,
        referenceIds: ['ref-plumbs-ceftriaxone-10ed', 'albarellos-2007-cat-pk', 'rebuelto-2002-dog-pk'],
        evidenceLevel: 'Consensos de Terapia Intensiva e Compêndio Plumb’s 10ª ed.',
      },
    ],

    presentations: [
      {
        id: 'pres-ceftriaxona-1g-iv-im',
        label: 'Ceftriaxona Sódica 1 g Frasco-Ampola Pó Liofilizado (Referência Humana Hospitalar)',
        form: 'Pó liofilizado para solução injetável frasco-ampola',
        concentrationValue: 1000,
        concentrationUnit: 'mg',
        packInfo: 'Frasco-ampola com 1 g de ceftriaxona sódica estéril',
        route: 'IV ou IM',
        scoringInfo: 'Reconstituir com 10 mL de diluente compatível (NaCl 0,9% ou água estéril) obtendo solução concentrada a 100 mg/mL',
        channel: 'human_pharmacy',
      },
      {
        id: 'pres-ceftriaxona-500mg-im-lidocaina',
        label: 'Ceftriaxona Sódica 500 mg IM + Diluente Lidocaína 1% 2 mL (Eurofarma / Genéricos)',
        form: 'Pó liofilizado com diluente anestésico de lidocaína 1%',
        concentrationValue: 500,
        concentrationUnit: 'mg',
        packInfo: 'Frasco-ampola 500 mg + ampola com 2 mL de cloridrato de lidocaína 1%',
        route: 'Exclusivamente Intramuscular (IM)',
        scoringInfo: 'USO EXCLUSIVO IM. Contraindicação absoluta por via IV devido à presença de lidocaína no diluente',
        channel: 'human_pharmacy',
      },
      {
        id: 'pres-ceftriaxona-1g-im-lidocaina',
        label: 'Ceftriaxona Sódica 1 g IM + Diluente Lidocaína 1% 3,5 mL (Eurofarma / Genéricos)',
        form: 'Pó liofilizado com diluente anestésico de lidocaína 1%',
        concentrationValue: 1000,
        concentrationUnit: 'mg',
        packInfo: 'Frasco-ampola 1 g + ampola com 3,5 mL de cloridrato de lidocaína 1%',
        route: 'Exclusivamente Intramuscular (IM)',
        scoringInfo: 'USO EXCLUSIVO IM. Reconstituição com lidocaína reduz dor local mas JAMAIS pode ser infundida por via IV',
        channel: 'human_pharmacy',
      },
    ],

    pillars: [
      {
        title: 'Mecanismo Bactericida e Lise Osmótica',
        icon: 'Zap',
        desc: 'Inibe covalentemente as PBPs 2 e 3, impedindo a transpeptidação do peptidoglicano e ativando a lise osmótica bacteriana celular rápida.',
      },
      {
        title: 'Ação Tempo-Dependente (fT > MIC) e Meia-Vida Curta',
        icon: 'Layers',
        desc: 'O determinante farmacodinâmico é fT>MIC. A meia-vida curta em cães e gatos (~1 a 1,7 h) justifica intervalos de q12h em infecções graves, desmistificando o uso rotineiro de q24h.',
      },
      {
        title: 'Incompatibilidade Absoluta com Cálcio e Ringer Lactato',
        icon: 'ShieldAlert',
        desc: 'A mistura ou infusão concomitante em Y-site com cálcio (incluindo Ringer Lactato) causa precipitação microvascular de cristais insolúveis de ceftriaxona-cálcio.',
      },
      {
        title: 'Antimicrobial Stewardship e Classificação WOAH',
        icon: 'CheckCircle2',
        desc: 'Cefalosporina de 3ª geração de importância crítica internacional. Reservar estritamente para infecções graves ou sepse com sensibilidade comprovada em antibiograma.',
      },
    ],

    quickSummaryHighlights: [
      'Cefalosporina bactericida parenteral de 3ª geração (oxyimino-cefalosporina)',
      'Ação tempo-dependente (% fT > MIC) com rápida lise bacteriana mediada por PBPs',
      'Meia-vida em cães (~0,9 a 1,7 h) e gatos (~1,7 h) é muito menor que em humanos (~8 h)',
      'Regime de 12 horas (q12h) é preferível e mais seguro em infecções graves do que q24h',
      'CONTRAINDICAÇÃO CRÍTICA: Proibida mistura ou infusão simultânea com soluções contendo Cálcio ou Ringer Lactato',
      'Apresentações IM com diluente de lidocaína 1% JAMAIS devem ser administradas por via intravenosa',
      'Excelente opção em meningites bacterianas devido à transposição da BHE sob inflamação',
      'Alternativa de resgate respaldada pela ACVIM para borreliose de Lyme canina (25 mg/kg q24h)',
      'Não possui cobertura contra Pseudomonas aeruginosa, Enterococcus spp. ou Staphylococcus meticilino-resistentes (MRSP)',
      'Stewardship WOAH: reservar para infecções graves com cultura e não usar em cistites simples rotineiras',
      'Medicamento humano utilizado sob regime extra-label no Brasil (receita de controle antimicrobiano em 2 vias, validade 10 dias)',
    ],

    quickIndications: [
      {
        condition: 'Sepse Hospitalar e Infecções Sistêmicas Graves por Gram-Negativos',
        species: 'both',
        doseSummary: '25 a 50 mg/kg IV lenta (30 min) a cada 12 horas (q12h)',
        route: 'Intravenosa Lenta',
        duration: 'Fase crítica até estabilização e desescalonamento',
        clinicalContext:
          'Tratamento parenteral em cães e gatos em terapia intensiva com bacteremia documentada por Enterobacterales suscetíveis.',
      },
      {
        condition: 'Infecção Bacteriana Suscetível em Cães (Plumb’s / Rebuelto 2002)',
        species: 'dog',
        doseSummary: '50 mg/kg IM ou SC a cada 12 a 24 horas (q12h preferível em infecções graves)',
        route: 'IM ou SC',
        duration: 'Conforme evolução clínica e foco infeccioso',
        clinicalContext:
          'Terapia parenteral baseada em dados farmacocinéticos; o regime q12h é prioritário para assegurar fT>MIC adequado.',
      },
      {
        condition: 'Infecção Bacteriana Suscetível em Gatos (Plumb’s / Albarellos 2007)',
        species: 'cat',
        doseSummary: '25 mg/kg IM ou SC a cada 12 horas (q12h)',
        route: 'IM ou SC',
        duration: 'Conforme remissão clínica e antibiograma',
        clinicalContext:
          'Sustentado por farmacocinética felina onde 25 mg/kg mantém concentrações acima da MIC90 de E. coli por 10 a 12 horas.',
      },
      {
        condition: 'Meningite e Meningoencefalite Bacteriana Canina (Hertzsch 2022)',
        species: 'dog',
        doseSummary: '15 a 50 mg/kg IV lenta a cada 12 horas (q12h)',
        route: 'Intravenosa Lenta',
        duration: 'Individualizada conforme resposta neurológica e LCR',
        clinicalContext:
          'Emprega a capacidade de penetração liquórica das cefalosporinas de 3ª geração na vigência de meningite inflamatória.',
      },
      {
        condition: 'Borreliose de Lyme Canina — Protocolo Alternativo de Resgate (ACVIM)',
        species: 'dog',
        doseSummary: '25 mg/kg IV ou SC a cada 24 horas (q24h)',
        route: 'IV ou SC',
        duration: '14 a 30 dias consecutivos',
        clinicalContext:
          'Protocolo de resgate parenteral do consenso ACVIM para cães com doença clínica intolerantes a tetraciclinas orais.',
      },
    ],

    detailedIndications: [
      {
        id: 'ind-ceftriaxona-sepse-hospitalar',
        indication: 'Sepse bacteriana hospitalar e choque séptico de origem abdominal, renal ou pulmonar',
        clinicalContext:
          'Em pacientes graves internados com sepse e bacteremia por bacilos Gram-negativos da família Enterobacterales (Escherichia coli, Klebsiella spp., Proteus spp.), a ceftriaxona fornece ação bactericida parenteral rápida. A antibioticoterapia deve ser iniciada prontamente após a coleta de hemocultura e urocultura, procedendo-se ao desescalonamento precoce conforme o laudo de suscetibilidade.',
        species: 'both',
        dose: '25 a 50 mg/kg IV lenta (30 min) q12h',
        route: 'Intravenosa Lenta',
        frequency: 'A cada 12 horas',
        duration: 'Fase de internação até estabilização hemodinâmica para transição oral',
        mechanismOfAction:
          'Inativação das PBPs 2 e 3 bacterianas com cessação do entrecruzamento de peptidoglicano e colapso osmótico célere.',
        clinicalRationale:
          'A administração em regime de 12 horas garante que a fração livre da droga permaneça acima da MIC bacteriana (% fT > MIC > 50%) na maior parte do intervalo, superando as limitações da meia-vida curta observada em pequenos animais.',
        monitoring:
          'Pressão arterial média, lactato, débito urinário, hemograma e culturas de controle.',
        referenceIds: ['ref-plumbs-ceftriaxone-10ed', 'rebuelto-2002-dog-pk', 'albarellos-2007-cat-pk'],
        evidenceLevel: 'Compêndio Plumb 10ª ed. e Farmacocinética Veterinária Primária',
      },
      {
        id: 'ind-ceftriaxona-meningite',
        indication: 'Meningite e meningoencefalite bacteriana em cães por patógenos suscetíveis',
        clinicalContext:
          'As infecções bacterianas do sistema nervoso central exigem antimicrobianos bactericidas com capacidade de transpor a barreira hematoencefálica (BHE). Cefalosporinas de 3ª geração penetram satisfatoriamente no líquido cefalorraquidiano (LCR) quando as meninges se encontram ativamente inflamadas, exercendo ação bactericida local.',
        species: 'dog',
        dose: '15 a 50 mg/kg IV lenta q12h',
        route: 'Intravenosa Lenta',
        frequency: 'A cada 12 horas',
        duration: 'Individualizada; até resolução completa dos sinais neurológicos e celulares',
        mechanismOfAction:
          'Penetração paracelular através de junções oclusivas inflamadas da barreira hematoencefálica e lise bacteriana no espaço subaracnóideo.',
        clinicalRationale:
          'Embora ensaios clínicos randomizados sejam escassos em medicina veterinária (Hertzsch & Richter, 2022), a plausibilidade biológica e os relatos de eficácia em medicina comparada respaldam seu papel terapêutico em doses elevadas.',
        monitoring:
          'Exame neurológico seriado, análise citológica de líquor quando indicado e controle de hipertensão intracraniana.',
        referenceIds: ['hertzsch-2022-cns-antimicrobial-review', 'ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Revisão Sistemática de Farmacologia no SNC (Hertzsch & Richter, 2022)',
      },
      {
        id: 'ind-ceftriaxona-endocardite',
        indication: 'Endocardite infecciosa canina por Streptococcus canis documentado',
        clinicalContext:
          'A endocardite bacteriana em pequenos animais é uma patologia de alta mortalidade associada a vegetações valvares ricas em fibrina e bactérias em lenta replicação. O tratamento exige bactericidas intravenosos contínuos para erradicar o foco.',
        species: 'dog',
        dose: '20 mg/kg IV q12h',
        route: 'Intravenosa',
        frequency: 'A cada 12 horas',
        duration: '14 dias consecutivos parenterais, seguidos de antibioticoterapia oral prolongada',
        mechanismOfAction:
          'Ligação de alta afinidade às transpeptidases de estreptococos com bactericidia tempo-dependente prolongada.',
        clinicalRationale:
          'Regime específico citado pelo Plumb 10ª ed. e literatura especializada em cardiologia infecciosa canina para consolidar a esterilização da vegetação antes da migração para via oral.',
        monitoring:
          'Ecocardiograma bidimensional com Doppler, hemoculturas seriadas e vigilância de insuficiência cardíaca congestiva.',
        referenceIds: ['ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Diretriz Terapêutica Especializada do Plumb’s 10ª ed.',
      },
      {
        id: 'ind-ceftriaxona-lyme-borreliose',
        indication: 'Borreliose de Lyme canina (Borrelia burgdorferi) — protocolo alternativo parenteral',
        clinicalContext:
          'A borreliose de Lyme é uma espiroquetose transmitida por carrapatos do gênero Ixodes caracterizada por poliartrite, febre e, em formas graves, nefrite de Lyme. As tetraciclinas orais são o padrão-ouro de 1ª linha; a ceftriaxona atua como resgate quando há intolerância gástrica refratária.',
        species: 'dog',
        dose: '25 mg/kg IV ou SC q24h',
        route: 'Intravenosa ou Subcutânea',
        frequency: 'A cada 24 horas',
        duration: '14 a 30 dias consecutivos',
        mechanismOfAction:
          'Inibição das proteínas ligadoras de penicilina de Borrelia burgdorferi com desestabilização da membrana externa e lise bacteriana.',
        clinicalRationale:
          'Apresenta alta sensibilidade in vitro e in vivo contra a espiroqueta, sendo oficialmente aceita pelo Consenso ACVIM de Borreliose de Lyme (Littman et al., 2018).',
        monitoring:
          'Avaliação clínica articular, controle de febre, proteinúria (relação UPC) e biomarcadores de nefropatia.',
        referenceIds: ['littman-2018-acvim-lyme', 'ref-plumbs-ceftriaxone-10ed'],
        evidenceLevel: 'Diretriz de Consenso Internacional ACVIM (Littman et al., 2018)',
      },
      {
        id: 'ind-ceftriaxona-pielonefrite-grave',
        indication: 'Pielonefrite bacteriana aguda complicada e urossepse com indicação parenteral',
        clinicalContext:
          'Em cães e gatos com pielonefrite aguda associada a vômitos, prostração grave ou choque séptico onde a via oral é inviável, cefalosporinas parenterais de 3ª geração alcançam altas concentrações urinárias e no parênquima renal ativo.',
        species: 'both',
        dose: '25 a 50 mg/kg IV lenta q12h',
        route: 'Intravenosa Lenta',
        frequency: 'A cada 12 horas',
        duration: '10 a 14 dias (fase parenteral inicial com transição para VO conforme sensibilidade)',
        mechanismOfAction:
          'Ação bactericida nas PBPs de enterobactérias uropatogênicas no córtex renal, medula e túbulos coletores.',
        clinicalRationale:
          'A ceftriaxona é eliminada majoritariamente inalterada pela via renal (~62,5% em 24h no cão), promovendo concentrações urinárias muito superiores às plasmáticas, suficientes para erradicação quando o microrganismo é comprovadamente sensível.',
        monitoring:
          'Ureia, creatinina, SDMA, urinálise seriada, urocultura confirmatória e ultrassonografia do trato urinário.',
        referenceIds: ['ref-plumbs-ceftriaxone-10ed', 'iscaid-uti-guidelines-2019'],
        evidenceLevel: 'Diretrizes ISCAID 2019 e Compêndio Plumb’s 10ª ed.',
      },
    ],

    pharmacokineticsData: {
      absorption:
        'Não possui formulação oral clinicamente útil, pois a absorção entérica é desprezível devido à sua alta polaridade molecular e ionização em pH gastrintestinal. Por via intravenosa (IV), a biodisponibilidade sistêmica é de 100% por definição, alcançando picos imediatos. Por via intramuscular (IM), a absorção em cães é completa e rápida, com biodisponibilidade aparente de 102 ± 27%, Cmax de aproximadamente 115,1 ± 17,0 mcg/mL e Tmax célere de 0,54 ± 0,24 h (Rebuelto et al., 2002); em gatos recebendo 25 mg/kg IM, a biodisponibilidade é de 85,7 ± 14,7%, Cmax de 54,4 ± 12,9 mcg/mL e Tmax de 0,33 ± 0,07 h (Albarellos et al., 2007). Por via subcutânea (SC), a absorção é mais lenta e prolongada, exibindo em cães Cmax de 69,3 ± 14,5 mcg/mL e Tmax de 1,29 ± 0,64 h (biodisponibilidade de 106 ± 14%); e em felinos Cmax de 42,4 ± 17,6 mcg/mL e Tmax de 1,27 ± 0,95 h.',
      distribution:
        'Molécula altamente hidrofílica que se distribui primariamente pelo espaço extracelular e líquidos corporais intersticiais. Apresenta volume de distribuição aparente em steady-state (Vdss) moderado, da ordem de 0,22 a 0,28 L/kg em cães e aproximadamente 0,57 ± 0,22 L/kg em felinos. A penetração intracelular em macrófagos e células teciduais é discreta. Concentra-se eficientemente no fluido sinovial, cavidade peritoneal, líquido pleural, parênquima renal e secreções brônquicas. A transposição para a glândula prostática íntegra é limitada pela hidrossolubilidade da molécula. No sistema nervoso central, atravessa precariamente a barreira hematoencefálica íntegra, porém na vigência de meningite inflamatória aguda a permeabilidade capilar endotelial aumenta expressivamente, permitindo que concentrações terapêuticas clinicamente úteis alcancem o líquido cefalorraquidiano.',
      metabolism:
        'A metabolização hepática da ceftriaxona é mínima em pequenos animais. A maior parte do fármaco circula e é eliminada na forma química original inalterada e biologicamente ativa. Não depende significativamente da via de glicuronidação hepática, tornando sua utilização metabolicamente segura na espécie felina sob a ótica de depuração enzimática.',
      elimination:
        'Apresenta rota de eliminação mista, predominantemente renal através de filtração glomerular com fração excretada ativa inalterada (~62,5% da dose é eliminada na urina em 24 horas em cães), acompanhada por uma expressiva rota secundária de excreção biliar e fecal. A depuração plasmática total (Clearance) em cães é de aproximadamente 3,6 a 3,9 mL/kg/min (0,22 L/kg/h) e em felinos é de 0,37 ± 0,13 L/kg/h (~6,1 mL/kg/min). A meia-vida de eliminação plasmática terminal (t1/2) em cães é de aproximadamente 0,88 h por via IV, 1,17 h por via IM e 1,73 h por via SC (Rebuelto et al., 2002). Em gatos, a meia-vida após administração IV é de 1,73 ± 0,23 h (Albarellos et al., 2007).',
      cnsPenetration:
        'Apresenta transposição satisfatória através da barreira hematoencefálica na vigência de processo inflamatório meníngeo ativo, alcançando concentrações bactericidas no LCR; a literatura veterinária não define uma porcentagem liquórica fixa universal para cães e gatos sadios.',
      plasmaBinding:
        'Em cães, a taxa de ligação proteica à albumina é baixa e saturável (concentração-dependente), correspondendo a ~25% em concentrações plasmáticas baixas (30 mcg/mL) e caindo para apenas ~2% em concentrações elevadas (1 mg/mL) (Popick et al., 1987). Essa ligação muito inferior à observada em seres humanos (~90-95%) explica a alta fração livre e a rápida depuração canina. Em gatos, a ligação proteica não foi estabelecida com precisão.',
      halfLife:
        'Meia-vida plasmática terminal curta: em cães é de aproximadamente 0,88 h (IV), 1,17 h (IM) e 1,73 h (SC); em gatos é de aproximadamente 1,73 h (IV), demandando intervalos posológicos de 12 horas em infecções graves.',
    },

    generalInfoData: {
      routesDetailed: [
        {
          route: 'Intravenosa Lenta (IV)',
          technique:
            'Reconstituir o frasco-ampola com diluente compatível sem lidocaína (NaCl 0,9% ou Água Estéril) obtendo solução a 100 mg/mL. Diluir a dose calculada em carreador compatível (NaCl 0,9% ou SG 5%) para concentração final de 10 a 40 mg/mL e infundir lentamente ao longo de 20 a 30 minutos em linha venosa exclusiva.',
          nursingCare:
            'Nunca administrar em bólus IV rápido para evitar êmese, desgranulação e flebite. Garantir cateterização venosa íntegra e observar sítio perivascular. NUNCA misturar ou infundir simultaneamente com soluções que contenham cálcio (Ringer Lactato). Realizar flush rigoroso com SF 0,9% antes e após a infusão.',
          limitations:
            'Exige acesso venoso pérvio e monitoramento hospitalar contínuo.',
        },
        {
          route: 'Intramuscular Profunda (IM)',
          technique:
            'Aplicar em musculatura lombar epaxial profunda ou na face cranial da coxa (quadríceps femoral), alternando rigorosamente os sítios anatômicos a cada injeção. Para alívio da dor local, pode-se utilizar apresentação comercial reconstituída com diluente contendo lidocaína 1%.',
          nursingCare:
            'Confirmar que a solução reconstituída com lidocaína JAMAIS será administrada por via intravenosa. Aspirar antes de injetar para evitar punção vascular inadvertida. Monitorar dor local e induração.',
          limitations:
            'Pode provocar dor e irritação tecidual importante; volumes elevados devem ser fracionados em mais de um sítio de aplicação.',
        },
        {
          route: 'Subcutânea (SC)',
          technique:
            'Administrar no tecido subcutâneo da região dorsal da escápula ou flanco com agulha de calibre adequado, alternando os sítios anatômicos.',
          nursingCare:
            'Inspecionar ausência de edema persistente, calor ou formação de nódulos estéreis locais.',
          limitations:
            'Uso extra-label respaldado por estudos farmacocinéticos (Rebuelto 2002; Albarellos 2007), apresentando absorção ligeiramente mais lenta (Tmax de ~1,3 h) e menor pico sérico que a via IM.',
        },
      ],
      pharmacologicalClassification: {
        chemicalClass: 'Cefalosporina semissintética de 3ª geração (oxyimino-cefalosporina)',
        chemicalClassDescription:
          'Derivado betalactâmico oxyimino com núcleo 7-aminocefalosporânico, cadeia lateral aminotiazolil e anel triazina diona, dotado de alta polaridade hidrofílica e resistência estrutural a diversas beta-lactamases bacterianas comuns.',
        therapeuticClass: 'Antibacteriano bactericida sistêmico parenteral tempo-dependente',
        therapeuticClassDescription:
          'Antimicrobiano bactericida de amplo espectro direcionado primariamente a bacilos Gram-negativos aeróbios (Enterobacterales), estreptococos e patógenos suscetíveis com atuação tempo-dependente (% fT > MIC).',
        detailedTargets: [
          {
            target: 'Proteína Ligadora de Penicilina 2 (PBP-2)',
            action: 'Acilação covalente do sítio catalítico da transpeptidase bacteriana',
            clinicalSignificance:
              'Inibe a síntese de peptidoglicano e altera a morfologia celular em bacilos Gram-negativos aeróbios.',
          },
          {
            target: 'Proteína Ligadora de Penicilina 3 (PBP-3)',
            action: 'Inativação da transpeptidase septal impedindo a divisão e tabicação bacteriana',
            clinicalSignificance:
              'Alvo primordial em Enterobacterales gerando filamentação bacteriana, fragilidade de parede e lise celular.',
          },
        ],
      },
      prescriptionType: {
        category: 'Medicamento sob Prescrição Médica — Uso Veterinário Extra-Rótulo (Antimicrobiano de Uso Humano)',
        ordinanceOrLaw: 'RDC Anvisa nº 471/2021 e IN Anvisa nº 360/2025 / Instruções CRMV 2026',
        retentionRequired: true,
        guidelines:
          'Por se tratar de antimicrobiano registrado para uso humano prescrito na modalidade extra-label para cães e gatos, o receituário veterinário deve ser emitido obrigatoriamente em DUAS VIAS, com validade de 10 dias corridos a partir da data de emissão. A primeira via é retida pela farmácia humana dispensadora e a segunda via é rubricada e devolvida ao tutor do animal, contendo identificação completa do médico-veterinário (CRMV), do tutor (CPF e endereço) e do paciente.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Baixa Ligação Proteica Saturável e Meia-Vida Plasmática Curta',
          description:
            'Ao contrário do ser humano (onde a ceftriaxona liga-se fortemente à albumina plasmática em ~90-95%), em cães a taxa de ligação proteica é baixa e saturável, correspondendo a apenas ~25% em concentrações séricas baixas e declinando para ~2% sob concentrações terapêuticas elevadas (Popick et al., 1987). Essa característica gera uma fração livre biologicamente ativa muito elevada que é rapidamente filtrada e depurada pelos glomérulos renais, resultando em meia-vida plasmática curta de aproximadamente 0,9 a 1,7 horas (Rebuelto et al., 2002).',
          clinicalImplications:
            'A administração em intervalo de 24 horas (q24h) comumente empregada na medicina humana é farmacodinamicamente subinibitória em infecções graves em cães; regimes a cada 12 horas (q12h) são fortemente recomendados para garantir que fT>MIC exceda 40–50% do intervalo.',
        },
        {
          species: 'cat',
          title: 'Perfil Farmacocinético Felino e Exposição Contra E. coli',
          description:
            'Estudos farmacocinéticos diretos em felinos hígidos (Albarellos et al., 2007) revelaram meia-vida de eliminação de 1,73 ± 0,23 h após administração intravenosa de 25 mg/kg, com clearance de 0,37 L/kg/h. O trabalho comprovou que para patógenos com MIC baixa (como isolados de E. coli com MIC90 de 0,2 mcg/mL), a concentração plasmática permaneceu acima da MIC por aproximadamente 10 a 12 horas (83 a 92% do intervalo). Além disso, por não depender de glicuronidação hepática primária, a ceftriaxona é metabolicamente bem tolerada pelo fígado felino.',
          clinicalImplications:
            'Fundamenta cientificamente a posologia de 25 mg/kg por via IM ou SC a cada 12 horas (q12h) como regime racional e seguro para gatos com infecções suscetíveis documentadas.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica de Cloreto de Sódio 0,9% (SF 0,9%) — diluente e fluido de infusão de escolha',
          'Solução de Glicose a 5% (SG 5%) — compatível para diluição e infusão intravenosa',
          'Água estéril para injeção — indicada para a reconstituição inicial do pó liofilizado',
        ],
        incompatibleFluids: [
          'Soluções contendo Cálcio (CONTRAINDICAÇÃO ABSOLUTA): Solução de Ringer com Lactato (RL), Solução de Hartmann, Ringer Simples ou Gluconato de Cálcio (risco de precipitação vascular fatal de ceftriaxona-cálcio)',
          'Formulações reconstituídas com Lidocaína 1% nunca devem ser infundidas por via IV (risco de arritmias cardíacas graves e colapso circulatório)',
          'Não misturar no mesmo equipo ou frasco com aminoglicosídeos (gentamicina, amicacina), vancomicina ou fluconazol devido a incompatibilidade física imediata',
        ],
        infusionRateGuidance:
          'Administrar por infusão intravenosa lenta ao longo de 20 a 30 minutos em linha venosa exclusiva. Diluir para concentrações de 10 a 40 mg/mL. A taxa média resultante situa-se em torno de 0,83 mg/kg/min (para dose de 25 mg/kg) ou 1,67 mg/kg/min (para 50 mg/kg). Não infundir em bólus intravenoso rápido.',
        preparationNotes:
          'Reconstituir o frasco de 1 g com 10 mL de água estéril ou SF 0,9% para obter solução a 100 mg/mL antes de diluir na bolsa de infusão. Soluções reconstituídas em concentração ≤100 mg/mL em SF 0,9% permanecem quimicamente estáveis por até 48 horas em temperatura ambiente (25°C) ou até 10 dias sob refrigeração (2°C a 8°C). Respeitar sempre as normas de assepsia estéril hospitalar.',
      },
    },

    attentionData: {
      attentionSubtitle:
        'Incompatibilidade Crítica com Cálcio / Ringer Lactato, Stewardship WOAH e Vigilância Farmacocinética',
      precautions: [
        {
          condition: 'Administração simultânea ou em Y-site com soluções contendo Cálcio / Ringer Lactato',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A ceftriaxona apresenta afinidade iônica por cátions bivalentes de cálcio, formando sais cristalinos extremamente insolúveis que precipitam na corrente sanguínea, provocando embolia microvascular, lesão renal e colapso cardiopulmonar.',
          clinicalAction:
            'Contraindicação absoluta de mistura em bolsa, equipo ou Y-site. Se o paciente estiver recebendo Ringer Lactato, interromper a fluidoterapia, realizar lavagem rigorosa do cateter com NaCl 0,9%, infundir a ceftriaxona em SF 0,9%, lavar novamente com NaCl 0,9% e apenas então reativar a infusão de Ringer Lactato.',
        },
        {
          condition: 'Uso de soluções com lidocaína pela via intravenosa',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A lidocaína contida nas ampolas diluentes das apresentações intramusculares comerciais atua como anestésico local; quando administrada em bólus ou infusão IV inadvertida sem cálculo estrito, induz bloqueio de condução cardíaca, bradiarritmias graves, convulsões e parada cardiorrespiratória.',
          clinicalAction:
            'Verificar com atenção o diluente utilizado. Frascos reconstituídos com lidocaína são destinados única e exclusivamente à via intramuscular profunda (IM).',
        },
        {
          condition: 'Uso empírico indiscriminado sem teste de sensibilidade (Stewardship WOAH)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Cefalosporinas de 3ª geração exercem forte pressão seletiva sobre a microbiota comensal, selecionando plasmídeos de resistência multirresistente (ESBL, AmpC) de alto impacto em saúde única.',
          clinicalAction:
            'Reservar a ceftriaxona para infecções graves, sepse ou meningite respaldadas por cultura e antibiograma. Não prescrever como antibiótico de rotina em cistites esporádicas simples ou dermatopatias primárias.',
        },
        {
          condition: 'Disfunção renal avançada concomitante a insuficiência hepática',
          alertLevel: 'caution',
          physiologicalExplanation:
            'A ceftriaxona é depurada simultaneamente pelas vias renal (filtração inalterada) e biliar. Na falência concomitante de ambos os sistemas emuladores, o clearance plasmático despenca, predispondo ao acúmulo e neurotoxicidade.',
          clinicalAction:
            'Monitorar rigorosamente ureia, creatinina, bilirrubina e sinais neurológicos; individualizar o intervalo posológico (espaçando para q18h ou q24h) com suporte hemodinâmico.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Dor e desconforto à injeção intramuscular profunda',
          frequency: 'common',
          mechanism:
            'Irritação química osmótica direta sobre as fibras musculares e terminações nervosas livres da fáscia muscular.',
          clinicalManagement:
            'Utilizar agulha fina, aplicar lentamente em musculatura profunda e, quando clinicamente indicado e viável, utilizar a apresentação contendo diluente com lidocaína 1%.',
        },
        {
          effect: 'Distúrbios gastrintestinais (vômito, náusea, diarreia)',
          frequency: 'uncommon',
          mechanism:
            'Disbiose da microbiota intestinal comensal por eliminação biliar ativa de ceftriaxona na luz entérica.',
          clinicalManagement:
            'Instituir terapia de suporte hidroeletrolítico, protetores de mucosa e antieméticos (maropitant ou ondansetrona) se necessário.',
        },
        {
          effect: 'Lama biliar e pseudolitíase ("sludge" biliar)',
          frequency: 'rare',
          mechanism:
            'Complexação estequiométrica da ceftriaxona eliminada na bile com íons cálcio, formando precipitados gelatinosos insolúveis.',
          clinicalManagement:
            'Monitorar enzimas colestáticas (ALP, GGT) e ultrassonografia da vesícula biliar em tratamentos prolongados (>14 dias) ou sob doses maciças (>100 mg/kg/dia); reversível com a descontinuação.',
        },
        {
          effect: 'Discrasias hematológicas e neutropenia imunomediada',
          frequency: 'rare',
          mechanism:
            'Supressão medular transitória idiossincrática ou destruição periférica imunomediada de neutrófilos e eritrócitos (Coombs positivo).',
          clinicalManagement:
            'Realizar hemograma de controle semanal em terapias prolongadas; descontinuar a medicação imediatamente caso surja neutropenia importante.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Renal Crônica em Cães e Gatos (Estágios IRIS 1 e 2)',
          recommendedAdjustment:
            'Nenhum ajuste empírico automático é recomendado; manter a dose terapêutica guiada pela MIC do patógeno.',
          physiologicalRationale:
            'A eliminação compensatória biliar e a alta fração livre garantem depuração suficiente sem acúmulo inicial tóxico clinicamente evidente.',
        },
        {
          clinicalCondition: 'Insuficiência Renal Grave / Oligoanúria (Estágios IRIS 3 e 4) e AKI',
          recommendedAdjustment:
            'Individualizar a conduta e monitorar clinicamente; preferir estender o intervalo posológico (q18h a q24h) em vez de reduzir a dose unitária de pico.',
          physiologicalRationale:
            'A ação bactericida é tempo-dependente mas requer atingir concentrações de pico seguras acima da MIC; a redução excessiva da dose unitária pode acarretar subdose.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Moderada a Grave',
          recommendedAdjustment:
            'Não há algoritmo de redução percentual estabelecido; monitorar função renal e parâmetros de colestase.',
          physiologicalRationale:
            'A depuração renal inalterada compensa a redução da eliminação biliar na maioria dos pacientes com hepatopatia isolada.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Soluções Contendo Cálcio e Ringer Lactato',
          severity: 'major',
          clinicalEffect:
            'Precipitação microvascular imediata de sais insolúveis de ceftriaxona-cálcio com risco de embolia, necrose tecidual e colapso fatal.',
          pharmacologicalMechanism:
            'Complexação eletrostática direta em solução aquosa; contraindicação absoluta de mistura em bolsa ou Y-site.',
        },
        {
          drugOrClass: 'Aminoglicosídeos (Gentamicina, Amicacina)',
          severity: 'major',
          clinicalEffect:
            'Incompatibilidade física imediata com turvação e perda de potência se misturados; potencial nefrotoxicidade aditiva.',
          pharmacologicalMechanism:
            'Incompatibilidade química em frasco; administrar obrigatoriamente em cateteres separados ou com lavagem abundante intermediária.',
        },
        {
          drugOrClass: 'Vancomicina e Fluconazol Injetável',
          severity: 'major',
          clinicalEffect:
            'Incompatibilidade física em mistura com precipitação visível e oclusão de cateter.',
          pharmacologicalMechanism:
            'Interação de cargas iônicas desestabilizando as moléculas carreadoras; administrar em acessos independentes.',
        },
        {
          drugOrClass: 'Cloranfenicol',
          severity: 'moderate',
          clinicalEffect:
            'Potencial antagonismo da velocidade de ação bactericida in vitro e in vivo.',
          pharmacologicalMechanism:
            'O cloranfenicol interrompe a síntese proteica ribossomal (bacteriostático), paralisando o crescimento bacteriano necessário para que a ceftriaxona exerça a lise de parede.',
        },
        {
          drugOrClass: 'Anfotericina B',
          severity: 'moderate',
          clinicalEffect:
            'Potencial potencialização de toxicidade tubular renal em terapias concomitantes.',
          pharmacologicalMechanism:
            'Efeitos lesivos somados sobre o endotélio glomerular e epitélio tubular renal.',
        },
      ],
    },

    clinicalStudiesCommented: [
      {
        title:
          'Pharmacokinetics of ceftriaxone administered by the intravenous, intramuscular or subcutaneous routes to dogs',
        authorsYear: 'Rebuelto M, Albarellos G, Ambros L, et al. 2002',
        journal: 'J Vet Pharmacol Ther. 25(1):73-76. doi: 10.1046/j.1365-2885.2002.00389.x. PMID: 11874531',
        studyDesign:
          'Ensaio farmacocinético cruzado (crossover) controlado em 6 cães mestiços hígidos recebendo dose única de 50 mg/kg de ceftriaxona sódica por vias intravenosa (IV), intramuscular (IM) e subcutânea (SC).',
        sampleSize: '6 cães adultos hígidos',
        mainFindings:
          'Demonstrou biodisponibilidade de 102 ± 27% (IM) e 106 ± 14% (SC), com picos séricos máximos (Cmax) de 115,1 ± 17,0 mcg/mL (IM) e 69,3 ± 14,5 mcg/mL (SC). As meias-vidas de eliminação terminal foram de 0,88 h (IV), 1,17 h (IM) e 1,73 h (SC). Concluiu que a administração IM ou SC a cada 12 a 24 horas pode ser útil para patógenos com MICs baixas.',
        clinicalTakeaway:
          'Constitui a base farmacocinética experimental primária para os regimes posológicos caninos adotados no Plumb’s e VIN, comprovando que meias-vidas curtas no cão exigem intervalos posológicos de 12 horas em infecções graves para manter fT>MIC.',
        referenceId: 'rebuelto-2002-dog-pk',
      },
      {
        title:
          'Pharmacokinetics of ceftriaxone after intravenous, intramuscular and subcutaneous administration to domestic cats',
        authorsYear: 'Albarellos GA, Kreil VE, Landoni MF. 2007',
        journal: 'J Vet Pharmacol Ther. 30(4):345-352. doi: 10.1111/j.1365-2885.2007.00871.x. PMID: 17610408',
        studyDesign:
          'Estudo farmacocinético felino controlado avaliando 5 gatos domésticos adultos hígidos submetidos à administração de 25 mg/kg de ceftriaxona sódica pelas vias IV, IM e SC com dosagens séricas seriadas por HPLC.',
        sampleSize: '5 gatos domésticos hígidos',
        mainFindings:
          'A meia-vida de eliminação plasmática por via IV foi de 1,73 ± 0,23 h, o volume de distribuição em equilíbrio (Vdss) foi de 0,57 ± 0,22 L/kg e o clearance plasmático foi de 0,37 ± 0,13 L/kg/h. O Cmax foi de 54,4 ± 12,9 mcg/mL (IM) e 42,4 ± 17,6 mcg/mL (SC). Para cepas de E. coli com MIC90 de 0,2 mcg/mL, as concentrações séricas permaneceram acima da MIC por 10 a 12 horas (83 a 92% do intervalo).',
        clinicalTakeaway:
          'Fornece a justificativa farmacodinâmica definitiva para o regime de 25 mg/kg a cada 12 horas (q12h) por vias IM ou SC em felinos com infecções bacterianas suscetíveis documentadas.',
        referenceId: 'albarellos-2007-cat-pk',
      },
      {
        title:
          'Plasma protein binding of ceftriaxone in different animal species and man',
        authorsYear: 'Popick AC, Crouthamel WG, Bekersky I. 1987',
        journal: 'Xenobiotica. 17(10):1139-1145. doi: 10.3109/00498258709167406. PMID: 3424863',
        studyDesign:
          'Ensaio comparativo in vitro de ligação proteica plasmática da ceftriaxona por ultrafiltração e equilíbrio de diálise em humanos, cães, ratos e macacos através de ampla faixa de concentrações séricas.',
        sampleSize: 'Plasma de diferentes espécies animais e humano',
        mainFindings:
          'Revelou que em humanos a taxa de ligação proteica atinge 90% a 95% em concentrações baixas. Em cães, a ligação à albumina é baixa e saturável: ~25% em concentrações fisiológicas baixas (30 mcg/mL), colapsando para apenas ~2% em concentrações elevadas (1 mg/mL).',
        clinicalTakeaway:
          'Explica mecanisticamente a razão pela qual a famosa meia-vida prolongada de 6 a 11 horas observada na espécie humana não existe em cães (meia-vida de ~1 hora), desconstruindo a transposição acrítica da dose q24h humana para a rotina veterinária.',
        referenceId: 'popick-1987-protein-binding',
      },
      {
        title:
          'Systematic Review of the Pharmacological Evidence for the Selection of Antimicrobials in Bacterial Infections of the Central Nervous System in Dogs and Cats',
        authorsYear: 'Hertzsch R, Richter A. 2022',
        journal: 'Front Vet Sci. 8:769588. doi: 10.3389/fvets.2021.769588. PMID: 35118150',
        studyDesign:
          'Revisão sistemática da literatura científica veterinária avaliando a farmacologia clínica, penetração através da barreira hematoencefálica e evidência terapêutica de antimicrobianos em infecções bacterianas do SNC em cães e gatos.',
        sampleSize: 'Revisão sistemática de estudos clínicos e farmacológicos veterinários',
        mainFindings:
          'Identificou que a ceftriaxona reúne características farmacocinéticas e moleculares favoráveis para penetração no SNC sob condições de quebra da barreira hematoencefálica induzida por inflamação meníngea, apresentando boa plausibilidade terapêutica, embora ensaios controlados em cães e gatos permaneçam escassos.',
        clinicalTakeaway:
          'Sustenta a indicação da ceftriaxona como opção parenteral de relevância no manejo empírico e direcionado de meningites bacterianas em pequenos animais sob vigilância clínica especializada.',
        referenceId: 'hertzsch-2022-cns-antimicrobial-review',
      },
      {
        title:
          'ACVIM consensus update on Lyme borreliosis in dogs and cats',
        authorsYear: 'Littman MP, Gerber B, Goldstein RE, Labato MA, Lappin MR, Moore GE. 2018',
        journal: 'J Vet Intern Med. 32(3):887-903. doi: 10.1111/jvim.15085. PMID: 29566442',
        studyDesign:
          'Diretriz internacional de consenso de especialistas do American College of Veterinary Internal Medicine (ACVIM) sobre o diagnóstico, tratamento e prevenção da borreliose de Lyme em pequenos animais.',
        sampleSize: 'Consenso Internacional de Painel de Especialistas do ACVIM',
        mainFindings:
          'Estabelece as tetraciclinas (doxiciclina ou minociclina por 30 dias) como tratamento de primeira linha preconizado. Contempla oficialmente a ceftriaxona na dose de 25 mg/kg IV ou SC a cada 24 horas por 14 a 30 dias como protocolo parenteral de resgate válido para casos intolerantes ou refratários.',
        clinicalTakeaway:
          'Posiciona a ceftriaxona nas diretrizes internacionais de referência para borreliose canina como terapia de resgate de alta eficácia biológica.',
        referenceId: 'littman-2018-acvim-lyme',
      },
    ],

    practicalWeightTable: {
      standardDoseText:
        'Cães e Gatos: Volumes práticos da solução reconstituída a 100 mg/mL (1 g diluído em 10 mL de NaCl 0,9% ou Água Estéril) calculados pela fórmula: Volume (mL) = [Peso (kg) × Dose (mg/kg)] ÷ 100. Infundir a dose calculada devidamente diluída em SF 0,9% ao longo de 20 a 30 minutos por via IV lenta, ou aplicar sem carreador adicional por via IM profunda/SC.',
      headers: [
        'Peso do Paciente',
        'Dose 25 mg/kg (Dose Total)',
        'Volume 100 mg/mL (25 mg/kg)',
        'Dose 50 mg/kg (Dose Total)',
        'Volume 100 mg/mL (50 mg/kg)',
      ],
      rows: [
        {
          weight: '2 kg (Gato ou Cão Miniatura)',
          totalDose: '50 mg',
          col1: '0,5 mL (q12h)',
          col2: '100 mg',
          col3: '1,0 mL (q12h)',
        },
        {
          weight: '4 kg (Gato Adulto / Cão Mini)',
          totalDose: '100 mg',
          col1: '1,0 mL (q12h)',
          col2: '200 mg',
          col3: '2,0 mL (q12h)',
        },
        {
          weight: '5 kg (Gato Grande / Cão Pequeno)',
          totalDose: '125 mg',
          col1: '1,25 mL (q12h)',
          col2: '250 mg',
          col3: '2,5 mL (q12h)',
        },
        {
          weight: '10 kg (Cão Pequeno a Médio)',
          totalDose: '250 mg',
          col1: '2,5 mL (q12h)',
          col2: '500 mg',
          col3: '5,0 mL (q12h)',
        },
        {
          weight: '15 kg (Cão Médio)',
          totalDose: '375 mg',
          col1: '3,75 mL (q12h)',
          col2: '750 mg',
          col3: '7,5 mL (q12h)',
        },
        {
          weight: '20 kg (Cão Médio a Grande)',
          totalDose: '500 mg',
          col1: '5,0 mL (q12h)',
          col2: '1.000 mg (1 g)',
          col3: '10,0 mL (q12h)',
        },
        {
          weight: '30 kg (Cão Grande)',
          totalDose: '750 mg',
          col1: '7,5 mL (q12h)',
          col2: '1.500 mg (1,5 g)',
          col3: '15,0 mL (q12h)',
        },
        {
          weight: '40 kg (Cão Gigante)',
          totalDose: '1.000 mg (1 g)',
          col1: '10,0 mL (q12h)',
          col2: '2.000 mg (2 g)',
          col3: '20,0 mL (q12h)',
        },
      ],
    },

    samplePrescriptionText:
      'RECEITUÁRIO DE CONTROLE ESPECIAL / ANTIMICROBIANOS (EM 2 VIAS — RDC ANVISA 471/2021)\\n\\nUSO VETERINÁRIO EXTRA-RÓTULO (PRESCRIÇÃO DE FORMULAÇÃO HUMANA HOSPITALAR)\\n\\n1. Ceftriaxona Sódica 1 g — Frasco-Ampola Pó para Solução Injetável ........... [inserir quantidade de frascos]\\n   - Posologia: Reconstituir o frasco-ampola com 10 mL de Solução Fisiológica de Cloreto de Sódio 0,9% (resultando em 100 mg/mL). Administrar [inserir volume calculado em mL, ex.: 2,5 mL para cão de 10 kg a 25 mg/kg], diluído em 50 a 100 mL de Cloreto de Sódio 0,9%, por via intravenosa lenta ao longo de 20 a 30 minutos, a cada 12 horas, durante [inserir número de dias, ex.: 7 a 14 dias].\\n\\nOrientações e Alertas Médicos Críticos ao Hospital / Tutor:\\n- INCOMPATIBILIDADE ABSOLUTA COM CÁLCIO: Sob nenhuma hipótese misturar, diluir ou infundir simultaneamente em Y-site com soluções contendo Cálcio, inclusive Solução de Ringer com Lactato ou Hartmann (risco iminente de precipitação microvascular de cristais de ceftriaxona-cálcio).\\n- Se o animal estiver recebendo Ringer Lactato contínuo, pausar a fluidoterapia, realizar lavagem rigorosa do cateter com NaCl 0,9%, infundir a ceftriaxona em NaCl 0,9%, realizar nova lavagem com NaCl 0,9% e apenas então retomar a fluidoterapia de manutenção.\\n- Caso seja utilizada apresentação com diluente contendo Lidocaína 1%, a solução destina-se EXCLUSIVAMENTE à injeção intramuscular profunda, sendo ESTREITAMENTE CONTRAINDICADA por via intravenosa.\\n- Descartar sobras de soluções reconstituídas não refrigeradas após 48 horas ou mantidas sob refrigeração (2 a 8°C) após 10 dias.\\n- Tratamento restrito a acompanhamento médico-veterinário hospitalar intensivo.',

    references: [
      {
        id: 'ref-plumbs-ceftriaxone-10ed',
        title: 'Ceftriaxone Monograph: Veterinary Pharmacology and Therapeutics',
        authors: 'Plumb DC, Budde J',
        year: 2023,
        journal: "Plumb's Veterinary Drug Handbook, 10th edition, pp. 230-231",
        citation:
          "Budde JA, McCluskey DM. Ceftriaxone. In: Plumb's Veterinary Drug Handbook. 10th ed. Ames: VetMedux/Wiley-Blackwell; 2023. p. 230-231.",
        sourceType: 'Compêndio Farmacológico Veterinário Padrão-Ouro',
        url: 'https://search.worldcat.org/isbn/9781394172207',
        evidenceLevel: 'Compêndio de Referência Internacional Padrão-Ouro',
      },
      {
        id: 'rebuelto-2002-dog-pk',
        title:
          'Pharmacokinetics of ceftriaxone administered by the intravenous, intramuscular or subcutaneous routes to dogs',
        authors: 'Rebuelto M, Albarellos G, Ambros L, et al.',
        year: 2002,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 25(1):73-76',
        citation:
          'Rebuelto M, Albarellos G, Ambros L, et al. Pharmacokinetics of ceftriaxone administered by the intravenous, intramuscular or subcutaneous routes to dogs. J Vet Pharmacol Ther. 2002;25(1):73-76. doi: 10.1046/j.1365-2885.2002.00389.x. PMID: 11874531.',
        sourceType: 'Estudo Farmacocinético Canino Crossover Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/11874531/',
        evidenceLevel: 'Ensaio Farmacocinético Primário Controlado',
      },
      {
        id: 'albarellos-2007-cat-pk',
        title:
          'Pharmacokinetics of ceftriaxone after intravenous, intramuscular and subcutaneous administration to domestic cats',
        authors: 'Albarellos GA, Kreil VE, Landoni MF',
        year: 2007,
        journal: 'Journal of Veterinary Pharmacology and Therapeutics. 30(4):345-352',
        citation:
          'Albarellos GA, Kreil VE, Landoni MF. Pharmacokinetics of ceftriaxone after intravenous, intramuscular and subcutaneous administration to domestic cats. J Vet Pharmacol Ther. 2007;30(4):345-352. doi: 10.1111/j.1365-2885.2007.00871.x. PMID: 17610408.',
        sourceType: 'Estudo Farmacocinético Felino Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17610408/',
        evidenceLevel: 'Ensaio Farmacocinético Felino Primário Controlado',
      },
      {
        id: 'popick-1987-protein-binding',
        title: 'Plasma protein binding of ceftriaxone',
        authors: 'Popick AC, Crouthamel WG, Bekersky I',
        year: 1987,
        journal: 'Xenobiotica. 17(10):1139-1145',
        citation:
          'Popick AC, Crouthamel WG, Bekersky I. Plasma protein binding of ceftriaxone. Xenobiotica. 1987;17(10):1139-1145. doi: 10.3109/00498258709167406. PMID: 3424863.',
        sourceType: 'Estudo In Vitro Comparativo de Ligação Proteica',
        url: 'https://pubmed.ncbi.nlm.nih.gov/3424863/',
        evidenceLevel: 'Estudo Farmacológico Mecanístico Primário',
      },
      {
        id: 'hertzsch-2022-cns-antimicrobial-review',
        title:
          'Systematic Review of the Pharmacological Evidence for the Selection of Antimicrobials in Bacterial Infections of the Central Nervous System in Dogs and Cats',
        authors: 'Hertzsch R, Richter A',
        year: 2022,
        journal: 'Frontiers in Veterinary Science. 8:769588',
        citation:
          'Hertzsch R, Richter A. Systematic Review of the Pharmacological Evidence for the Selection of Antimicrobials in Bacterial Infections of the Central Nervous System in Dogs and Cats. Front Vet Sci. 2022;8:769588. doi: 10.3389/fvets.2021.769588. PMID: 35118150.',
        sourceType: 'Revisão Sistemática de Evidências Farmacológicas no SNC',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35118150/',
        evidenceLevel: 'Revisão Sistemática Nível 1',
      },
      {
        id: 'littman-2018-acvim-lyme',
        title: 'ACVIM consensus update on Lyme borreliosis in dogs and cats',
        authors: 'Littman MP, Gerber B, Goldstein RE, et al.',
        year: 2018,
        journal: 'Journal of Veterinary Internal Medicine. 32(3):887-903',
        citation:
          'Littman MP, Gerber B, Goldstein RE, Labato MA, Lappin MR, Moore GE. ACVIM consensus update on Lyme borreliosis in dogs and cats. J Vet Intern Med. 2018;32(3):887-903. doi: 10.1111/jvim.15085. PMID: 29566442.',
        sourceType: 'Diretriz de Consenso Internacional ACVIM',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29566442/',
        evidenceLevel: 'Diretriz de Consenso Internacional Padrão-Ouro Nível 1',
      },
      {
        id: 'iscaid-uti-guidelines-2019',
        title:
          'International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats',
        authors: 'Weese JS, Blondeau J, Boothe D, et al.',
        year: 2019,
        journal: 'The Veterinary Journal. 247:8-25',
        citation:
          'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. doi: 10.1016/j.tvjl.2019.02.008. PMID: 30971357.',
        sourceType: 'Diretriz Internacional de Consenso de Especialistas (ISCAID)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
        evidenceLevel: 'Consenso Internacional Padrão-Ouro ISCAID 2019',
      },
      {
        id: 'woah-antimicrobial-prudent-use-2024',
        title:
          'WOAH List of Antimicrobial Agents of Veterinary Importance and Principles for Prudent Use',
        authors: 'World Organisation for Animal Health (WOAH)',
        year: 2024,
        journal: 'WOAH Standards and Guidelines 2024-2025',
        citation:
          'World Organisation for Animal Health. WOAH List of Antimicrobial Agents of Veterinary Importance. Paris: WOAH; 2024.',
        sourceType: 'Diretriz Internacional de Saúde Única e Stewardship',
        url: 'https://www.woah.org/en/document/list-of-antimicrobial-agents-of-veterinary-importance/',
        evidenceLevel: 'Diretriz Sanitária Global Oficial WOAH',
      },
      {
        id: 'bula-ceftriaxona-abl-brasil',
        title:
          'Bula Profissional de Saúde Ceftriaxona Dissódica Hemieptaidratada 1 g — ABL Brasil',
        authors: 'Antibióticos do Brasil Ltda (ABL)',
        year: 2023,
        journal: 'Bula Técnica Aprovada pela Anvisa — Reg. MS 1.5562.0009',
        citation:
          'Antibióticos do Brasil Ltda. Bula do Medicamento Keftron / Ceftriaxona Dissódica Hemieptaidratada. Cosmópolis: ABL; 2023.',
        sourceType: 'Bula Oficial Registrada na Anvisa',
        url: 'https://www.ablbrasil.com.br/wp-content/uploads/2023/03/IB280922a_Versao_Profissional-Saude-ceftriaxona-dissodica-hemieptaidratada.pdf',
        evidenceLevel: 'Documento Técnico Regulatório Oficial Anvisa',
      },
      {
        id: 'bula-ceftriaxona-eurofarma',
        title:
          'Bula Profissional Ceftriaxona Sódica IM com Diluente Lidocaína 1% — Eurofarma',
        authors: 'Eurofarma Laboratórios S.A.',
        year: 2026,
        journal: 'Bula Técnica Aprovada pela Anvisa — Reg. MS 1.0043.0710',
        citation:
          'Eurofarma Laboratórios S.A. Bula do Produto Ceftriaxona Sódica Pó para Solução Injetável IM. São Paulo: Eurofarma; 2026.',
        sourceType: 'Bula Oficial Registrada na Anvisa',
        url: 'https://eurofarma.com.br/lang/pt/produtos/ceftriaxona-sodica-i-m',
        evidenceLevel: 'Documento Técnico Regulatório Oficial Anvisa',
      },
    ],

    genericBrandsNote:
      'A ceftriaxona é um antimicrobiano parenteral disponível no Brasil na forma de medicamentos registrados para uso humano pela Anvisa, sob apresentações de referência (Rocefin®, Roche) e formulações genéricas e similares hospitalares (como Keftron®, ABL e Ceftriaxona Sódica Eurofarma). Para uso em cães e gatos, trata-se de prescrição na modalidade extra-rótulo (extra-label). A prescrição deve ser emitida em receituário em duas vias (com retenção de uma via pela farmácia e validade estrita de 10 dias corridos), conforme as exigências da RDC Anvisa nº 471/2021 e normativas dos Conselhos Regionais de Medicina Veterinária.',

    clinicalWarningItems: [
      {
        label: 'Incompatibilidade Absoluta com Cálcio e Ringer Lactato:',
        text: 'NUNCA misturar, diluir ou infundir simultaneamente em Y-site com soluções contendo cálcio (incluindo Ringer com Lactato ou Hartmann). Há risco severo de formação de precipitados de ceftriaxona-cálcio nos pulmões e rins.',
      },
      {
        label: 'Diluente com Lidocaína Exclusivo para IM:',
        text: 'As apresentações comerciais intramusculares que acompanham diluente com lidocaína 1% JAMAIS devem ser administradas por via intravenosa, sob risco de colapso cardiovascular e parada cardíaca.',
      },
      {
        label: 'Falácia da Dose Única Humana (q24h):',
        text: 'Em cães e gatos a meia-vida é muito curta (~0,9 a 1,7 horas) devido à baixa ligação proteica. Em infecções graves ou sepse, priorizar o intervalo de 12 horas (q12h) para garantir tempo acima da MIC bactericida.',
      },
      {
        label: 'Antimicrobial Stewardship WOAH:',
        text: 'Cefalosporina de 3ª geração de importância crítica internacional. Reservar para infecções graves respaldadas por cultura e antibiograma; contraindicada em cistites simples ou uso empírico banal.',
      },
    ],

    relatedDiseaseSlugs: [
      'doencas-trato-urinario-inferior-felino-dtuif',
      'doenca-renal-cronica-caes-gatos',
      'cistite-enfisematosa-caes-gatos',
    ],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const ceftriaxonaMedicationRecord = ceftriaxonaMedicationsSeed[0];
