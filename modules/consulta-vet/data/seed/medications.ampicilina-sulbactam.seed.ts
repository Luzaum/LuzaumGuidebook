import type { MedicationRecord } from '../../types/medication';

export const ampicilinaSulbactamMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-ampicilina-sulbactam',
    slug: 'ampicilina-sulbactam',
    title: 'Ampicilina + Sulbactam (Injetável)',
    activeIngredient: 'Ampicilina Sódica + Sulbactam Sódico (Proporção 2:1)',
    pharmacologicClass:
      'Antibacteriano bactericida; aminopenicilina potencializada por inibidor suicida de beta-lactamases (relação 2:1)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: [
      'Ampicilina',
      'Sulbactam',
      'Aminopenicilina Potencializada',
      'Beta-lactâmico',
      'Inibidor de Beta-lactamase',
      'Uso Hospitalar',
      'Pneumonia Aspirativa',
      'Piotórax',
      'Sepse',
      'IN Anvisa 360/2025',
    ],
    tradeNames: [
      'Ampicilina Sódica + Sulbactam Sódico 1,5 g e 3 g Pó para Solução Injetável (ABL Brasil, Fresenius Kabi, Eurofarma, Blau, Cristália - Uso Humano / Uso Veterinário Extra-bula)',
      'Unasyn® 1,5 g e 3 g Injetável (Pfizer - Referência Humana)',
    ],
    officialSiteUrl: 'https://consultas.anvisa.gov.br/',
    leafletUrl: 'https://consultas.anvisa.gov.br/',
    mechanismOfAction:
      'A ampicilina é uma aminopenicilina semissintética bactericida que se liga covalentemente e acila as proteínas ligadoras de penicilinas (PBPs, especialmente D,D-transpeptidases, carboxipeptidases e endopeptidases), inibindo a etapa terminal de transpeptidação na síntese do peptidoglicano da parede celular bacteriana em divisão. Isso causa instabilidade mecânica, ativação de autolisinas bacterianas e lise osmótica. O sulbactam sódico é uma sulfona do ácido penicilânico que atua como inibidor suicida irreversível de beta-lactamases: liga-se ao sítio catalítico das serina-beta-lactamases bacterianas suscetíveis (incluindo classes TEM, SHV, certas oxacilinases e enzimas de anaeróbios como Bacteroides fragilis), formando um complexo acil-enzima estável que impede a hidrólise enzimática do anel beta-lactâmico da ampicilina. Como consequência dessa proteção farmacodinâmica, a ampicilina permanece intacta para ligar-se às suas PBPs-alvo, restaurando e ampliando o espectro antimicrobiano.',
    plainLanguageSummary:
      'Antibiótico injetável hospitalar formado pela união de dois compostos em proporção 2:1: a ampicilina, que destrói a parede celular das bactérias ativas, e o sulbactam, que funciona como um escudo protetor contra as enzimas de defesa (beta-lactamases) produzidas por certas bactérias. É amplamente utilizado na rotina hospitalar veterinária para pneumonia aspirativa grave, infecções torácicas mistas (piotórax) e infecções abdominais ou sepse. ATENÇÃO CRÍTICA À DOSE: as ampolas comerciais vêm na proporção de 2 partes de ampicilina para 1 parte de sulbactam. A dose padrão recomendada (22 a 30 mg/kg da associação total) equivale a 15 a 20 mg/kg de ampicilina mais 7,5 a 10 mg/kg de sulbactam. Estudos recentes de 2025 alertam que ele não cobre todos os Gram-negativos hospitalares em animais críticos, exigindo terapia combinada em quadros sépticos graves.',

    indications: [
      'Pneumonia bacteriana comunitária grave ou pneumonia aspirativa mista (Gram-positivos, anaeróbios e Gram-negativos suscetíveis) em cães e gatos hospitalizados.',
      'Manejo hospitalar multimodal do piotórax canino e felino (infecções polimicrobianas pleurais com Actinomyces, Bacteroides, Prevotella e Pasteurella), associado a drenagem torácica ativa.',
      'Sepse abdominal e peritonite séptica secundária a ruptura gastrointestinal, associado a desbridamento cirúrgico de foco e suporte hemodinâmico.',
      'Profilaxia antimicrobiana cirúrgica parenteral em procedimentos contaminados ou limpos-contaminados de tecidos moles e gastrointestinais.',
      'Ponte intravenosa hospitalar para pacientes em jejum, com vômitos incoercíveis ou sem absorção entérica confiável candidatos a amoxicilina-clavulanato oral.',
    ],

    contraindications: [
      'Histórico confirmado de hipersensibilidade grave, anafilaxia, urticária imune imediata ou broncoespasmo a penicilinas, aminopenicilinas ou a qualquer componente da fórmula.',
      'Monoterapia isolada em casos confirmados ou com forte suspeita de sepse por enterobacterales multirresistentes, Pseudomonas aeruginosa, bactérias produtoras de AmpC/ESBL ou Staphylococcus resistente à meticilina (MRSA/MRSP).',
      'Infecções exclusivas por bactérias atípicas desprovidas de parede celular de peptidoglicano, como Mycoplasma spp. ou Chlamydia spp. (resistência intrínseca completa).',
    ],

    cautions: [
      'As doses expressas no formulário internacional Plumb consideram a soma dos dois componentes (ampicilina + sulbactam). Sempre especificar na prescrição se a dose prescrita é da associação total ou do componente ampicilina para evitar subdosagem ou superdosagem de 50%.',
      'Usar com cautela em pacientes com hipersensibilidade documentada a outros beta-lactâmicos, como cefalosporinas, cefamicinas e carbapenêmicos, devido à possibilidade de reação cruzada. A contraindicação absoluta se aplica ao histórico de hipersensibilidade grave ou anafilaxia a penicilinas.',
      'Em pacientes com azotemia e doença renal crônica (DRC), a depuração renal da ampicilina sofre redução acentuada e a meia-vida se estende de 1,5 h para aproximadamente 4 h; considerar espaçamento de intervalo para q12h em infecções por patógenos com MIC baixa.',
      'Incompatibilidade físico-química direta in vitro com aminoglicosídeos (amicacina, gentamicina): nunca misturar na mesma seringa ou frasco de infusão. Administrar em acessos venosos separados ou lavar a via abundantemente antes e depois.',
      'O controle mecânico de foco infeccioso (drenagem de piotórax, lavagem peritoneal cirúrgica, drenagem de abscessos) é determinante para o sucesso terapêutico; o antibiótico não supera alta carga bacteriana e debris em cavidades não drenadas.',
      'Durante anestesia geral com inalatórios, a depuração de ampicilina cai cerca de 40% em cães, mantendo níveis séricos prolongados no intraoperatório.',
      'Gestação e lactação: ampicilina e sulbactam atravessam a placenta e são distribuídos no leite em baixas concentrações. Usar somente quando o benefício esperado superar o risco e observar filhotes lactentes quanto a alterações gastrointestinais.',
      'Em hepatopatia preexistente, acompanhar periodicamente enzimas hepáticas e bilirrubina. A relevância veterinária da hepatite colestática descrita em humanos ainda é desconhecida.',
      'A ampicilina pode gerar resultado falso-positivo de glicose urinária em testes baseados em redução do cobre; testes enzimáticos com glicose oxidase não sofrem essa interferência.',
    ],

    adverseEffects: [
      'Dor, irritação tecidual local e desconforto à administração intramuscular (solução alcalina reconstituída com pH 8,0 a 10,0).',
      'Tromboflebite ou irritação endotelial na administração intravenosa rápida em veia periférica (mitigada por infusão lenta ao longo de 15 a 30 minutos).',
      'Distúrbios gastrointestinais leves a moderados (náusea, êmese reflexa, amolecimento fecal transitório por disbiose).',
      'Reações imunomediadas de hipersensibilidade (febre medicamentosa, exantema cutâneo, prurido ou angioedema).',
      'Anafilaxia rara, porém potencialmente fatal, especialmente após administração intravenosa; interromper imediatamente e instituir suporte emergencial caso ocorra.',
      'Risco potencial de neurotoxicidade ou crises convulsivas apenas em superdoses acentuadas em pacientes nefropatas anúricos com acúmulo no sistema nervoso central.',
      'Elevação assintomática e transitória de transaminases hepáticas e fosfatase alcalina em tratamentos prolongados.',
      'Hepatite colestática ou colestase foi descrita em humanos e costuma ser reversível após a suspensão; a relevância clínica em cães e gatos não está estabelecida.',
    ],

    interactions: [
      'Aminoglicosídeos (amicacina, gentamicina): beta-lactâmicos podem inativá-los in vitro; não misturar na mesma seringa, frasco ou equipo e separar a administração.',
      'Alopurinol: pode aumentar a ocorrência de erupções cutâneas em humanos; relevância veterinária desconhecida.',
      'Antimicrobianos bacteriostáticos (tetraciclinas, macrolídeos, cloranfenicol e sulfonamidas): antagonismo demonstrado in vitro, mas importância clínica incerta.',
      'Metotrexato: a ampicilina pode reduzir sua excreção renal e elevar o risco de toxicidade.',
      'Micofenolato: a associação pode reduzir as concentrações ou os efeitos do micofenolato.',
      'Probenecida: reduz a secreção tubular de ampicilina e sulbactam, prolongando as concentrações sistêmicas.',
      'Varfarina: pode aumentar o risco de sangramento por redução da produção intestinal de vitamina K; monitorar coagulação quando a associação for inevitável.',
      'Diclorfenamida: a associação pode aumentar o risco de hipocalemia.',
    ],
    routes: ['Intravenosa', 'Intramuscular', 'Subcutânea'],
    adminNotesText:
      'Medicamento predominantemente hospitalar devido ao intervalo de 6 a 8 horas. As doses do Plumb são expressas pela soma de ampicilina e sulbactam. Armazenar o pó a até 30 °C. Após reconstituição, respeitar rigorosamente concentração, diluente, temperatura e prazo de uso; soluções a 30 mg/mL em água para injeção ou SF 0,9% permanecem estáveis por até 8 horas em temperatura ambiente ou 72 horas sob refrigeração a 4 °C. Não usar alteração de cor, precipitação ou turbidez como único critério de estabilidade.',

    // 1. Quatro Pilares Terapêuticos
    pillars: [
      {
        title: 'Quebre a Parede',
        icon: 'Shield',
        desc: 'A ampicilina inibe covalentemente as PBPs transpeptidases, bloqueando a síntese de peptidoglicano e gerando lise osmótica bactericida em células ativas.',
      },
      {
        title: 'Proteja o Beta-Lactâmico',
        icon: 'Lock',
        desc: 'O sulbactam atua como inibidor suicida de serina-beta-lactamases, impedindo a destruição enzimática da ampicilina e restaurando sua potência.',
      },
      {
        title: 'Tempo Acima da MIC (fT>MIC)',
        icon: 'Clock',
        desc: 'Como beta-lactâmico clássico tempo-dependente, a eficácia clínica correlaciona-se com a fração do intervalo em que o fármaco livre supera a MIC.',
      },
      {
        title: 'Controle de Foco é Soberano',
        icon: 'AlertCircle',
        desc: 'Nenhum esquema antibiótico compensa acúmulo de fibrina, pus e alta carga bacteriana. Piotórax exige dreno torácico e peritonite exige cirurgia.',
      },
    ],

    // 2. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Pneumonia Bacteriana Grave ou Aspirativa (Cães e Gatos)',
        species: 'both',
        doseSummary: '22 a 30 mg/kg da associação total IV a cada 6 a 8 horas (preferencialmente 30 mg/kg q8h em críticos)',
        route: 'Intravenosa lenta (IV ao longo de 15 a 30 min)',
        duration: 'Reavaliação clínica e radiográfica em 10 a 14 dias; individualizar conduta',
        clinicalContext:
          'Manejo de flora mista orofaríngea/gástrica aspirada com envolvimento de Streptococcus, anaeróbios, Pasteurella e Gram-negativos suscetíveis. Em risco de Gram-negativos multirresistentes, associar fluoroquinolona ou aminoglicosídeo.',
      },
      {
        condition: 'Piotórax e Infecções Pleurais Polimicrobianas',
        species: 'both',
        doseSummary: '22 a 30 mg/kg da associação total IV a cada 6 a 8 horas',
        route: 'Intravenosa (IV lenta diluída em SF 0,9%)',
        duration: 'Mínimo de 2 a 3 semanas hospitalares ou com transição para VO após estabilização',
        clinicalContext:
          'Cobertura excelente para a flora anaeróbia e mista típica de piotórax felino (Actinomyces, Bacteroides, Pasteurella). A colocação de dreno torácico e a drenagem ativa são mandatórias para eficácia.',
      },
      {
        condition: 'Sepse Abdominal e Peritonite Séptica Hospitalar',
        species: 'both',
        doseSummary: '30 mg/kg da associação total IV a cada 6 a 8 horas (ou infusão estendida)',
        route: 'Intravenosa lenta em infusão contínua ou intermitente',
        duration: 'Fase aguda com desescalonamento guiado por cultura e antibiograma',
        clinicalContext:
          'Parte de protocolo empírico para ruptura de víscera oca ou trauma contaminado. Estudos PK/PD alertam para variabilidade extrema em cães sépticos graves contra Gram-negativos.',
      },
      {
        condition: 'Profilaxia Antimicrobiana Cirúrgica Parenteral',
        species: 'both',
        doseSummary: '22 mg/kg da associação total IV na indução anestésica (30 a 60 min pré-incisão)',
        route: 'Intravenosa lenta (IV em 15 minutos)',
        duration: 'Dose única na indução; repetir intraoperatoriamente a cada 90 a 120 minutos se cirurgia longa',
        clinicalContext:
          'Garante níveis teciduais acima da MIC no momento da incisão e contaminação cirúrgica. Não manter antimicrobiano no pós-operatório sem evidência de infecção instalada.',
      },
      {
        condition: 'Ponte Intravenosa para Amoxicilina-Clavulanato',
        species: 'both',
        doseSummary: '22 mg/kg da associação total IV a cada 8 horas',
        route: 'Intravenosa lenta (IV)',
        duration: 'Até restabelecimento da via oral e ausência de êmese',
        clinicalContext:
          'Indicada quando o paciente internado necessita da cobertura de aminopenicilina com inibidor de beta-lactamase mas está em jejum (NPO), vomitando ou sem trânsito gastrintestinal.',
      },
    ],

    // 3. Indicações Completas e Detalhadas
    detailedIndications: [
      {
        id: 'ind-amp-sulb-pneumonia',
        indication: 'Pneumonia Bacteriana Grave e Pneumonia por Aspiração em Cães e Gatos',
        clinicalContext:
          'A aspiração de conteúdo orofaríngeo ou gástrico introduz flora microbiana mista composta por cocos Gram-positivos (Streptococcus, Staphylococcus), bastonetes Gram-negativos entéricos e anaeróbios estritos da cavidade oral. A associação ampicilina + sulbactam oferece excelente cobertura para o componente Gram-positivo e anaeróbio, além de cobrir parte dos Enterobacterales suscetíveis. O consenso do ISCAID recomenda ampicilina-sulbactam 20 mg/kg do componente ampicilina (equivalente a 30 mg/kg total) IV a cada 6 a 8 horas para pneumonia secundária, preconizando a associação de um segundo antimicrobiano com cobertura para Gram-negativos (como fluoroquinolonas) em animais criticamente instáveis com risco de sepse.',
        species: 'both',
        dose: '22 a 30 mg/kg da associação total (equivalente a 15 a 20 mg/kg de ampicilina + 7,5 a 10 mg/kg de sulbactam)',
        route: 'Intravenosa lenta (IV diluída em 20 a 50 mL de SF 0,9% em 15 a 30 minutos)',
        frequency: 'A cada 6 a 8 horas (q6h a q8h)',
        duration: '10 a 14 dias com reavaliação clínica, radiográfica e hematológica precoce',
        mechanismOfAction:
          'Inibição de PBPs bacterianas pela ampicilina combinada à inativação suicida de beta-lactamases pelo sulbactam, eliminando os agentes patogênicos presentes na árvore traqueobrônquica e alvéolos pulmonares.',
        clinicalRationale:
          'A via parenteral contorna a baixa e errática absorção da ampicilina oral e fornece níveis pulmonares e liquóricos teciduais rápidos em animais dispneicos e hipoxêmicos sem exigir deglutição.',
        monitoring: 'Frequência respiratória, oximetria de pulso (SpO2), esforço ventilatório, leucograma, radiografias torácicas de controle e função renal.',
        referenceIds: ['ref-plumbs-10th-amp-sulb', 'ref-iscaid-respiratory-2017', 'ref-nelson-couto-6th-emergency'],
        evidenceLevel: 'Consenso Internacional ISCAID / Diretrizes Clínicas Especializadas',
      },
      {
        id: 'ind-amp-sulb-pyothorax',
        indication: 'Piotórax e Empiema Pleural Polimicrobiano Canino e Felino',
        clinicalContext:
          'O piotórax em gatos frequentemente decorre de feridas penetrantes por mordedura ou extensão de infecções respiratórias, caracterizando-se por flora polimicrobiana anaeróbia estrita (Fusobacterium, Prevotella, Porphyromonas, Bacteroides, Peptostreptococcus) e facultativa (Pasteurella multocida, Actinomyces). Em cães, a infecção costuma apresentar também bastonetes Gram-negativos entéricos (E. coli, Klebsiella). A ampicilina-sulbactam é uma das drogas de primeira linha consagradas na literatura felina devido à excelente sensibilidade dos anaeróbios e Pasteurella. Entretanto, a irrigação e drenagem ativa por drenos torácicos bilaterais de pequeno calibre com lavagem com SF 0,9% aquecido são indispensáveis para remover a barreira física de fibrina e leucócitos degenerados.',
        species: 'both',
        dose: '22 a 30 mg/kg da associação total IV',
        route: 'Intravenosa lenta (IV diluída em SF 0,9%)',
        frequency: 'A cada 6 a 8 horas (q6h a q8h)',
        duration: '2 a 4 semanas; transicionar para amoxicilina-clavulanato oral após melhora e remoção dos drenos',
        mechanismOfAction:
          'Penetração no líquido e tecido pleural inflamado com bloqueio bactericida de síntese de parede contra anaeróbios e Gram-positivos protegidos por sulbactam.',
        clinicalRationale:
          'Série de casos clínicos prospectivos e retrospectivos demonstra sobrevida elevada em felinos com piotórax tratados com drenagem percutânea e ampicilina-sulbactam parenteral associada.',
        monitoring: 'Volume e aspecto citológico do lavado pleural, oximetria, temperatura retal, leucograma seriado e parâmetros de função renal.',
        referenceIds: ['ref-del-magno-2021-feline-pyothorax', 'ref-iscaid-respiratory-2017', 'ref-bsava-10th-formulary'],
        evidenceLevel: 'Série de Casos Clínicos / Consenso ISCAID',
      },
      {
        id: 'ind-amp-sulb-sepsis-peritonitis',
        indication: 'Peritonite Séptica, Sepse Abdominal e Infecções Polimicrobianas Graves',
        clinicalContext:
          'Na peritonite séptica secundária a perfuração gastrointestinal, deiscência de anastomose ou ruptura de abscesso visceral, a contaminação fecal e peritoneal é intensamente polimicrobiana, envolvendo anaeróbios intestinais e Enterobacterales. O ensaio clínico randomizado veterinário de Stewart et al. (2022) em cães com peritonite séptica avaliou a farmacocinética de 50 mg/kg IV q8h versus infusão contínua, demonstrando sustentação de 100% de T>MIC para patógenos suscetíveis com MIC até 1,25 mcg/mL. Contudo, estudos mais recentes de 2025 (Goggs et al.) demonstram que em cães sépticos graves a probabilidade de atingir alvos contra cepas de Enterobacterales com MIC acima de 4 a 8 mcg/mL é inferior a 10%, indicando a necessidade mandatória de terapia associada em choque séptico.',
        species: 'both',
        dose: '30 mg/kg da associação total IV (ou 50 mg/kg em protocolos hospitalares intensivos com infusão)',
        route: 'Intravenosa lenta (em 20 a 30 minutos ou infusão estendida)',
        frequency: 'A cada 6 a 8 horas (q6h a q8h)',
        duration: 'Fase de choque e pós-operatório imediato; guiar descalonamento por cultura e antibiograma do lavado peritoneal',
        mechanismOfAction:
          'Ação bactericida sinérgica rápida reduzindo a endotoxemia e proliferação bacteriana sistêmica e na cavidade celomática peritoneal.',
        clinicalRationale:
          'A terapia antimicrobiana precoce após o reconhecimento da sepse, associada à laparotomia exploratória quando indicada e à ressuscitação hemodinâmica, integra o controle urgente do foco infeccioso em pequenos animais.',
        monitoring: 'Lactato sérico, pressão arterial média (PAM), débito urinário, escore de sepse veterinária (APPLE), leucograma e glicemia.',
        referenceIds: ['ref-stewart-2022-peritonitis-pk', 'ref-goggs-2025-critically-ill-dogs', 'ref-wang-2025-azotemia-pk'],
        evidenceLevel: 'Nível 1b (Ensaios Clínicos Randomizados e Farmacocinéticos)',
      },
      {
        id: 'ind-amp-sulb-surgical-prophylaxis',
        indication: 'Profilaxia Antimicrobiana Cirúrgica em Procedimentos Contaminados ou Limpos-Contaminados',
        clinicalContext:
          'Em cirurgias gastrointestinais (enterotomia, enterectomia, gastrotomia), ressecção hepática ou cirurgias de cabeça e pescoço com contaminação orofaríngea, a ampicilina-sulbactam previne infecção do sítio cirúrgico (ISC) ao erradicar inóculos bacterianos introduzidos durante o procedimento. A literatura farmacocinética canina de 2025 (The Veterinary Journal) comprovou que sob anestesia geral a depuração da ampicilina diminui em cerca de 40%, mantendo níveis séricos acima de 4 mg/L durante toda a anestesia quando administrada na indução e repetida a cada 90 a 120 minutos em cirurgias prolongadas.',
        species: 'both',
        dose: '22 mg/kg da associação total IV (equivalente a 14,7 mg/kg ampicilina + 7,3 mg/kg sulbactam)',
        route: 'Intravenosa lenta (aplicar 30 a 60 minutos antes da incisão cirúrgica na indução)',
        frequency: 'Repetir a cada 90 a 120 minutos durante o ato cirúrgico se procedimento > 2 horas',
        duration: 'Encerrar na saída do centro cirúrgico; não manter por dias na ausência de infecção confirmada',
        mechanismOfAction:
          'Garante pico e concentração tecidual bactericida no sítio operatório no momento exato em que ocorre o risco de contaminação mecânica.',
        clinicalRationale:
          'A profilaxia pós-cirúrgica tardia é ineficaz e induz resistência bacteriana; a presença do antimicrobiano ativo no coágulo inicial previne a colonização primária.',
        monitoring: 'Inspeção do sítio cirúrgico, temperatura corporal, analgesia e sinais locais de inflamação pós-operatória.',
        referenceIds: ['ref-vet-journal-2025-anesthesia-pk', 'ref-plumbs-10th-amp-sulb', 'ref-bsava-10th-formulary'],
        evidenceLevel: 'Nível 1b / Diretrizes Internacionais de Prevenção de ISC',
      },
      {
        id: 'ind-amp-sulb-iv-bridge',
        indication: 'Ponte Intravenosa Hospitalar para Amoxicilina-Clavulanato Oral',
        clinicalContext:
          'Cães e gatos acometidos por infecções suscetíveis tratáveis por amoxicilina-clavulanato oral que são admitidos em regime de internação hospitalar por êmese, íleo adinâmico, anorexia grave ou necessidade de NPO (nada por via oral) beneficiam-se da ampicilina-sulbactam parenteral como substituto bioequivalente de espectro. Uma vez cessados os vômitos e restabelecida a tolerância alimentar oral, realiza-se o descalonamento (step-down) seguro para a amoxicilina-clavulanato via oral.',
        species: 'both',
        dose: '22 mg/kg da associação total IV a cada 8 horas',
        route: 'Intravenosa lenta (IV)',
        frequency: 'A cada 8 horas (q8h)',
        duration: 'Enquanto o paciente estiver impossibilitado de ingerir comprimidos ou suspensões orais',
        mechanismOfAction:
          'Mesmo mecanismo bactericida da aminopenicilina potencializada por inibidor de beta-lactamase na circulação e nos tecidos periféricos.',
        clinicalRationale:
          'Evita a perda de eficácia antimicrobiana decorrente de vômitos ou má absorção intestinal em pacientes hospitalizados descompensados.',
        monitoring: 'Tolerância gástrica, melhora do apetite, ausência de êmese e parâmetros de infecção de base.',
        referenceIds: ['ref-plumbs-10th-amp-sulb', 'ref-bsava-10th-formulary'],
        evidenceLevel: 'Prática Clínica Padrão Ouro / Consenso Farmacológico',
      },
    ],

    // 4. Farmacocinética Clínica Detalhada (Zero Asteriscos Literais)
    pharmacokineticsData: {
      absorption:
        'A administração intravenosa atinge 100% de biodisponibilidade sistêmica imediata por definição, com pico sérico (Cmax) registrado logo ao término da infusão. Pela via intramuscular, a absorção ocorre prontamente, porém a solução aquosa reconstituída é alcalina (pH entre 8,0 e 10,0) e gera irritação mecânica e dor local na musculatura. A via subcutânea apresenta absorção lenta e errática, especialmente em pacientes em choque, hipotérmicos ou desidratados com vasoconstrição periférica reflexa. A formulação não se destina ao uso por via oral: o sulbactam sódico apresenta baixíssima absorção gastrintestinal e a ampicilina pura apresenta biodisponibilidade entérica de apenas 30% a 55% em carnívoros, sendo fortemente prejudicada pela presença de alimentos. Por via oral veterinária, utiliza-se a amoxicilina-clavulanato.',
      distribution:
        'A ampicilina e o sulbactam são moléculas altamente hidrofílicas (XLogP negativo) que se distribuem amplamente pelo líquido extracelular corporal. O volume aparente de distribuição (Vd) da ampicilina em cães é de aproximadamente 0,3 L/kg e em gatos de cerca de 0,167 L/kg, refletindo distribuição confinada aos tecidos ricamente vascularizados e espaços intersticiais. Ambos os compostos atingem concentrações terapêuticas adequadas nos pulmões, fígado, rins, trato biliar, líquido pleural, ascite peritoneal e líquido sinovial. A penetração através da barreira hematoencefálica (BHE) íntegra e no líquor é baixa devido à polaridade da molécula; no entanto, em meninges intensamente inflamadas a permeabilidade liquórica sobe para 10% a 60% dos níveis séricos.',
      metabolism:
        'Diferentemente de outros fármacos veterinários, a eliminação da ampicilina e do sulbactam independe predominantemente do metabolismo microssomal do citocromo P450 (CYP450). Não sofrem autoindução enzimática e não dependem da via da glucuronidação, o que elimina a preocupação farmacológica clássica de toxicidade felina por deficiência funcional de glucuroniltransferase (UGT1A6). Uma fração pequena da ampicilina sofre hidrólise simples para ácidos peniciloicos inativos, enquanto a grande maioria do fármaco permanece inalterada.',
      elimination:
        'A eliminação de ambos os componentes é predominantemente renal, por filtração glomerular e secreção tubular ativa mediada por transportadores de ânions orgânicos. Em cães não azotêmicos hospitalizados, a meia-vida média da ampicilina foi de 1,5 ± 0,3 hora; em cães azotêmicos, aumentou para 3,9 ± 2,4 horas, com maior exposição sistêmica. Em outro estudo, a depuração plasmática canina foi de aproximadamente 318 mL/kg/h em animais acordados e 186 mL/kg/h sob anestesia geral.',
      cnsPenetration:
        'Penetração baixa no sistema nervoso central com barreira hematoencefálica íntegra decorrente da hidrofilicidade; eleva-se significativamente (10% a 60% da concentração plasmática) na presença de meningite purulenta e inflamação endotelial ativa.',
      plasmaBinding:
        'Taxa de ligação às proteínas plasmáticas baixa, de aproximadamente 20% em cães e gatos. As frações livres ativas permanecem elevadas no compartimento intersticial e não sofrem interferência crítica por deslocamento competitivo com outros fármacos.',
      halfLife:
        'Cães não azotêmicos hospitalizados: 1,5 ± 0,3 hora | Cães azotêmicos hospitalizados: 3,9 ± 2,4 horas. Dados específicos da associação em gatos são limitados; a monografia remete à farmacocinética da ampicilina.',
    },

    // 5. Informações Gerais e Práticas (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Intravenosa Lenta ou Infusão Intermitente (IV)',
          technique:
            'Via de escolha primária em sepse, pneumonia grave, piotórax e peritonite. Reconstituir o frasco-ampola com água para injeção estéril. A solução pode ser administrada diretamente por via IV lenta em 5 a 20 minutos ou ser diluída em bolsa de 50 a 100 mL de SF 0,9% e infundida em 15 a 30 minutos.',
          nursingCare:
            'Inspecionar o cateter intravenoso periférico regularmente para sinais de flebite ou extravasamento endotelial. Nunca aplicar em bólus rápido em jato.',
          limitations: 'Exige cateter venoso pérvio e monitoramento hospitalar constante.',
        },
        {
          route: 'Intramuscular Profunda (IM)',
          technique:
            'Aplicar em grandes massas musculares (massa epaxial lombar ou quadríceps femoral). Para mitigar a dor local marcante decorrente do pH alcalino da solução, o Plumb admite a reconstituição do pó liofilizado com lidocaína estéril 0,5% a 2% sem vasoconstritor em vez de água estéril.',
          nursingCare:
            'Alternar rigorosamente os sítios de aplicação intramuscular a cada tomada. Observar sinais de hematoma ou dor acentuada.',
          limitations: 'Dolorosa; não indicada em pacientes sépticos, desidratados ou com hipoperfusão periférica e trombocitopenia.',
        },
        {
          route: 'Subcutânea (SC - Uso Extra-Bula Limitado)',
          technique:
            'Injeção no tecido subcutâneo dorso-cervical em animais estáveis sem acesso venoso viável.',
          nursingCare:
            'Massagear suavemente o sítio após aplicação e avaliar tolerância local.',
          limitations: 'Evitar como via inicial em choque, hipotermia ou desidratação grave porque a hipoperfusão pode tornar a absorção imprevisível; em pacientes críticos, preferir a via IV.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica (Cloreto de Sódio 0,9% - SF 0,9%) - DILUENTE DE ESCOLHA PADRÃO (estabilidade de até 8 horas em temperatura ambiente a 25°C)',
          'Água estéril para injeção - indicada para reconstituição inicial do frasco liofilizado',
        ],
        incompatibleFluids: [
          'NUNCA misturar na mesma seringa, frasco ou equipo com aminoglicosídeos (Amicacina, Gentamicina, Tobramicina) devido à inativação química mútua in vitro',
          'Solução de Ringer com lactato: compatibilidade em conector Y variável ou incerta; a administração conjunta pode reduzir a concentração de ampicilina em cerca de 30%',
          'Solução de glicose a 5%: compatibilidade em conector Y variável ou incerta para a associação; não tratar como diluente intercambiável sem confirmar a bula e a concentração',
          'Incompatível com soluções ácidas parenterais e bicarbonato de sódio concentrado',
        ],
        infusionRateGuidance:
          'Administração intermitente: infundir diluído em SF 0,9% ao longo de 15 a 30 minutos. Em administração intravenosa direta, aplicar lentamente em 5 a 20 minutos. Em protocolos de infusão contínua (CRI) em cães com peritonite séptica, utiliza-se dose de ataque em bólus de 50 mg/kg seguida de infusão contínua de 0,1 mg/kg/minuto.',
        preparationNotes:
          'Reconstituição do frasco de 1,5 g (1 g ampicilina + 0,5 g sulbactam): adicionar 3,2 mL de água para injeção estéril, obtendo volume final de aproximadamente 4,0 mL na concentração de 375 mg/mL da associação total (250 mg/mL de ampicilina + 125 mg/mL de sulbactam). Para o frasco de 3,0 g (2 g ampicilina + 1 g sulbactam), adicionar 6,4 mL, obtendo cerca de 8,0 mL na mesma concentração. Após diluição a 30 mg/mL em água para injeção ou SF 0,9%, a solução é estável por até 8 horas em temperatura ambiente ou 72 horas sob refrigeração a 4°C. Para outras concentrações, diluentes ou condições, consultar a bula específica ou a farmácia hospitalar.',
      },
      pharmacologicalClassification: {
        receptorsAndSites: [
          {
            name: 'PBPs (Proteínas Ligadoras de Penicilinas) / D,D-Transpeptidases',
            type: 'Enzima Alvo Primária da Síntese de Parede Celular',
            action:
              'A ampicilina liga-se covalentemente ao sítio ativo de transpeptidação das PBPs bacterianas, mimetizando o dipeptídeo D-Ala-D-Ala e impedindo a formação de ligações cruzadas no peptidoglicano.',
            clinicalEffect:
              'Ação bactericida rápida com lise osmótica bacteriana em fases de multiplicação celular ativa.',
          },
          {
            name: 'Beta-Lactamases Bacterianas (Serina-Beta-Lactamases)',
            type: 'Enzima de Resistência Inativada pelo Sulbactam',
            action:
              'O sulbactam sódico entra no sítio catalítico das beta-lactamases e é atacado pela serina, formando um complexo acil-enzima irreversível que bloqueia a destruição da ampicilina.',
            clinicalEffect:
              'Ampliação do espectro da ampicilina contra isolados suscetíveis produtores de betalactamases inibidas pelo sulbactam, incluindo alguns Staphylococcus sensíveis à meticilina, Pasteurella, E. coli, Klebsiella e anaeróbios como Bacteroides fragilis. A atividade não é universal e deve ser confirmada por cultura e antibiograma.',
          },
        ],
        autonomicAndEndocrineEffects: [
          {
            system: 'Sistema Imunológico / Resposta Alérgica',
            effect: 'Hipersensibilidade Imunomediada Tipo I e Tipo IV',
            description:
              'Metabólitos peniciloil formam haptenos com proteínas teciduais. Em animais previamente sensibilizados, pode desencadear urticária, prurido facial e anafilaxia aguda.',
          },
          {
            system: 'Sistema Renal e Tubular',
            effect: 'Excreção Ativa por Transportadores Aniônicos',
            description:
              'Eliminação renal ativa e passiva gerando concentrações urinárias dezenas de vezes superiores à concentração sérica, com excelente ação em trato urinário.',
          },
        ],
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Cães: Variabilidade Farmacocinética em Críticos e Azotemia',
          description:
            'Estudos clínicos recentes de 2025 comprovam que cães sépticos graves apresentam variabilidade extrema de distribuição e depuração de ampicilina, resultando em subexposição contra cepas de Enterobacterales com MIC limítrofe. Em cães azotêmicos, a meia-vida quadruplica (de 1,5 h para quase 4 h), permitindo espaçar o intervalo para q12h em patógenos suscetíveis.',
        },
        {
          species: 'cat',
          title: 'Gatos: Eficácia no Piotórax e Ausência de Barreira de Glucuronidação',
          description:
            'A ampicilina e o sulbactam não dependem de glucuronidação hepática, não apresentando a toxicidade clássica felina de drogas hepatotóxicas. Possui excelente resposta clínica em piotórax felino, onde predomina a flora anaeróbia oral de mordeduras associada a Pasteurella multocida.',
        },
      ],
      prescriptionType:
        'Receituário comum do médico-veterinário em 2 vias com retenção de uma via pela farmácia (Instrução Normativa Anvisa nº 360/2025 para antimicrobianos sob prescrição). Em ambiente hospitalar fechado, administrado sob ordem de prescrição da internação.',
    },

    // 6. Módulo de Atenção e Segurança (Attention Tab)
    attentionData: {
      precautions: [
        {
          condition: 'Diferenciação de Convenção de Dose (Associação Total vs. Ampicilina Pura)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'O produto comercial é formulado na proporção 2:1. O formulário internacional Plumb expressa suas recomendações na soma dos dois princípios ativos (mg/kg total). Se o profissional prescrever 20 mg/kg pensando ser a dose total, estará aplicando apenas 13,3 mg de ampicilina e 6,7 mg de sulbactam.',
          clinicalAction:
            'Registrar sempre na prescrição hospitalar a frase explicativa: Associação total de ampicilina + sulbactam (proporção 2:1), onde 30 mg/kg total = 20 mg/kg ampicilina + 10 mg/kg sulbactam.',
        },
        {
          condition: 'Pacientes Críticos com Suspeita de Sepse por Enterobacterales',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Dados farmacocinéticos caninos de 2025 (Goggs et al.) demonstram que em animais graves a chance de atingir alvos farmacodinâmicos (fT>MIC acima de 50%) para Enterobacterales com MIC de 8 mcg/mL é de apenas 10%.',
          clinicalAction:
            'Não utilizar ampicilina-sulbactam como monoterapia isolada em choque séptico ou peritonite grave por Gram-negativos; associar fluoroquinolona ou aminoglicosídeo até resultado de cultura.',
        },
        {
          condition: 'Insuficiência Renal Aguda ou Crônica (Azotemia Marcada)',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Como a depuração é predominantemente renal, cães azotêmicos apresentam meia-vida de 3,9 horas (vs. 1,5 h em normais) e triplicação da AUC sérica.',
          clinicalAction:
            'Em pacientes azotêmicos clinicamente estáveis infectados por cepas sensíveis (MIC baixa), considerar aumentar o intervalo posológico de q8h para q12h para evitar acúmulo excessivo.',
        },
        {
          condition: 'Incompatibilidade Química com Aminoglicosídeos',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A ampicilina reage quimicamente in vitro com aminoglicosídeos (amicacina, gentamicina), inativando ambos os fármacos se misturados no mesmo recipiente.',
          clinicalAction:
            'Nunca misturar ampicilina-sulbactam e amicacina na mesma seringa ou frasco. Infundir em horários separados ou lavar o cateter com SF 0,9% antes e depois da infusão.',
        },
        {
          condition: 'Histórico de Reação Alérgica a Beta-Lactâmicos',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Risco de reação anafilática mediada por IgE com hipotensão súbita, broncoespasmo, colapso cardiovascular e óbito.',
          clinicalAction:
            'Contraindicação absoluta apenas quando houver hipersensibilidade grave prévia a penicilinas. Em caso de anafilaxia, suspender imediatamente e instituir o protocolo de emergência da unidade, com adrenalina pela via indicada, oxigênio, suporte hemodinâmico e monitorização contínua.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Dor e Irritação Muscular Local',
          frequency: 'common',
          mechanism: 'Solução aquosa alcalina reconstituída (pH 8,0 a 10,0) em contato com fibras musculares',
          clinicalManagement: 'Preferir via intravenosa em animais internados; se IM for necessária, reconstituir com lidocaína a 1% sem vasoconstritor.',
        },
        {
          effect: 'Tromboflebite Venosa',
          frequency: 'uncommon',
          mechanism: 'Irritação endotelial de vasos periféricos por infusões repetidas ou velocidade inadequada',
          clinicalManagement: 'Diluir a dose em 20 a 50 mL de SF 0,9%, administrar lentamente ao longo de 20 minutos e alternar sítios de punção venosa.',
        },
        {
          effect: 'Êmese e Desconforto Gastrointestinal Transitório',
          frequency: 'uncommon',
          mechanism: 'Estímulo reflexo autonômico por bólus venoso acelerado ou disbiose da microbiota intestinal',
          clinicalManagement: 'Reduzir a velocidade de infusão intravenosa e monitorar trânsito digestivo.',
        },
        {
          effect: 'Reações de Hipersensibilidade Cutânea (Urticária / Prurido)',
          frequency: 'rare',
          mechanism: 'Reação alérgica imunomediada induzida por determinantes antigênicos peniciloil',
          clinicalManagement: 'Suspender a medicação imediatamente; prescrever anti-histamínicos e suporte de barreira.',
        },
        {
          effect: 'Neurotoxicidade e Crises Convulsivas em Superdose',
          frequency: 'rare',
          mechanism: 'Bloqueio de receptores GABAérgicos no SNC por concentrações extremamente altas de beta-lactâmico em pacientes com falência renal anúrica',
          clinicalManagement: 'Suspender a ampicilina, ajustar depuração por diálise ou fluidoterapia e administrar diazepam ou fenobarbital se convulsões.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Cão Azotêmico Estável com Infecção por Patógeno de MIC Baixa',
          recommendedAdjustment: 'Manter a dose de 22 mg/kg total e estender o intervalo posológico de q8h para q12h',
          physiologicalRationale: 'A meia-vida plasmática canina sobe de 1,5 h para cerca de 3,9 h na azotemia, mantendo tempo acima da MIC mesmo com doses mais espaçadas.',
        },
        {
          clinicalCondition: 'Choque Séptico Agudo ou Peritonite Grave sem Antibiograma Prévio',
          recommendedAdjustment: 'NÃO reduzir a dose; utilizar 30 mg/kg total IV q8h associado a um segundo agente para Gram-negativos',
          physiologicalRationale: 'Em pacientes sépticos o volume de distribuição se expande por fuga capilar, e a redução precoce de dose aumenta o risco de mortalidade.',
        },
        {
          clinicalCondition: 'Insuficiência Hepática Isolada com Função Renal Preservada',
          recommendedAdjustment: 'Não é necessária redução de dose da associação ampicilina-sulbactam',
          physiologicalRationale: 'O fármaco é depurado predominantemente por excreção renal ativa e não sobrecarrega as vias metabólicas do hepatócito.',
        },
        {
          clinicalCondition: 'Paciente Submetido a Anestesia Geral Inalatória Prolongada',
          recommendedAdjustment: 'Repetir a dose profilática a cada 90 a 120 minutos durante o ato operatório',
          physiologicalRationale: 'Sob anestesia, a depuração plasmática da ampicilina caiu cerca de 40% no estudo citado, prolongando a exposição; ainda assim, a redose deve seguir a duração do procedimento e o protocolo cirúrgico.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Aminoglicosídeos (Amicacina, Gentamicina, Tobramicina)',
          severity: 'major',
          clinicalEffect: 'Inativação química direta de ambos os antibióticos se misturados na mesma seringa ou frasco',
          pharmacologicalMechanism: 'Reação nucleofílica do anel beta-lactâmico com os grupos amino dos aminoglicosídeos gerando amidas inativas.',
        },
        {
          drugOrClass: 'Metotrexato',
          severity: 'major',
          clinicalEffect: 'Aumento expressivo da concentração sérica e risco de toxicidade grave por metotrexato',
          pharmacologicalMechanism: 'A ampicilina compete pelos transportadores de ânions orgânicos renais, reduzindo a depuração tubular do metotrexato.',
        },
        {
          drugOrClass: 'Probenecida',
          severity: 'moderate',
          clinicalEffect: 'Aumento da meia-vida e das concentrações plasmáticas de ampicilina e sulbactam',
          pharmacologicalMechanism: 'Bloqueio competitivo da secreção tubular ativa de penicilinas no túbulo proximal renal.',
        },
        {
          drugOrClass: 'Antibacterianos Bacteriostáticos (Tetraciclinas, Macrolídeos, Cloranfenicol)',
          severity: 'moderate',
          clinicalEffect: 'Potencial redução do efeito bactericida da ampicilina',
          pharmacologicalMechanism: 'Beta-lactâmicos necessitam de multiplicação celular ativa para exercer lise osmótica; bacteriostáticos paralisam a divisão.',
        },
        {
          drugOrClass: 'Varfarina',
          severity: 'moderate',
          clinicalEffect: 'Possível aumento do risco de sangramento; acompanhar tempo de protrombina/INR quando houver uso concomitante',
          pharmacologicalMechanism: 'Alteração da microbiota intestinal pode reduzir a produção de vitamina K e potencializar o efeito anticoagulante.',
        },
        {
          drugOrClass: 'Micofenolato',
          severity: 'moderate',
          clinicalEffect: 'Possível redução das concentrações ou do efeito imunossupressor do micofenolato',
          pharmacologicalMechanism: 'Interação descrita em compêndio; monitorar resposta clínica, pois a magnitude em pacientes veterinários não está definida.',
        },
      ],
    },

    // 7. Apresentações Comerciais
    presentations: [
      {
        id: 'pres-amp-sulb-15g',
        name: 'Ampicilina Sódica + Sulbactam Sódico 1,5 g Injetável (Frasco-ampola Pó Liofilizado)',
        brand: 'ABL / Fresenius Kabi / Eurofarma / Genérico',
        form: 'injectable',
        route: 'Intravenosa / Intramuscular',
        commercialType: 'human_pharmacy',
        concentrationOptions: [
          {
            id: 'conc-375mg-ml',
            label: '375 mg/mL total (250 mg/mL Ampicilina + 125 mg/mL Sulbactam)',
            unitValue: 375,
            unitLabel: 'mg/mL',
            isDefault: true,
          },
        ],
        calculatedMlPerKgFormula: 'dose / 375',
        packageDescription: 'Frasco-ampola contendo pó estéril: 1.000 mg de ampicilina sódica + 500 mg de sulbactam sódico (proporção 2:1).',
      },
      {
        id: 'pres-amp-sulb-30g',
        name: 'Ampicilina Sódica + Sulbactam Sódico 3,0 g Injetável (Frasco-ampola Pó Liofilizado)',
        brand: 'ABL / Fresenius Kabi / Eurofarma / Genérico',
        form: 'injectable',
        route: 'Intravenosa / Intramuscular',
        commercialType: 'human_pharmacy',
        concentrationOptions: [
          {
            id: 'conc-375mg-ml-3g',
            label: '375 mg/mL total após adição de 6,4 mL de diluente',
            unitValue: 375,
            unitLabel: 'mg/mL',
            isDefault: true,
          },
        ],
        calculatedMlPerKgFormula: 'dose / 375',
        packageDescription: 'Frasco-ampola contendo pó estéril: 2.000 mg de ampicilina sódica + 1.000 mg de sulbactam sódico (proporção 2:1).',
      },
    ],

    // 8. Regimes Posológicos Clínicos (Calculadora)
    doses: [
      {
        id: 'dose-amp-sulb-standard',
        species: 'both',
        indication: 'Pneumonia Grave / Piotórax / Infecções Polimicrobianas Agudas',
        doseMin: 22,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta',
        frequency: 'A cada 8 horas (q8h; até q6h em sepse)',
        duration: '10 a 14 dias (conforme resposta clínica)',
        clinicalContext: 'Dose calculada pela associação total (ampicilina + sulbactam 2:1). Equivale a 15-20 mg/kg de ampicilina + 7,5-10 mg/kg de sulbactam.',
        monitoring: 'SpO2, frequência respiratória, leucograma, radiografias e função renal.',
        evidenceLevel: 'Compêndio farmacológico e consenso clínico',
        referenceIds: ['ref-plumbs-10th-amp-sulb', 'ref-iscaid-respiratory-2017'],
        calculatorEnabled: true,
        presentationId: 'pres-amp-sulb-15g',
        presentationConcentrationId: 'conc-375mg-ml',
      },
      {
        id: 'dose-amp-sulb-sepsis-crit',
        species: 'both',
        indication: 'Sepse Abdominal / Peritonite Séptica / Paciente Crítico UTI',
        doseMin: 30,
        doseMax: 30,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta diluída',
        frequency: 'A cada 6 a 8 horas (q6h a q8h)',
        duration: 'Fase aguda cirúrgica e hospitalar',
        clinicalContext: 'Dose máxima da associação total. Associar a cobertura para Gram-negativos multirresistentes até resultado do antibiograma.',
        monitoring: 'Lactato, pressão arterial invasiva, débito urinário e hemograma.',
        evidenceLevel: 'Compêndio farmacológico e estudos farmacocinéticos clínicos',
        referenceIds: ['ref-plumbs-10th-amp-sulb', 'ref-stewart-2022-peritonitis-pk', 'ref-goggs-2025-critically-ill-dogs'],
        calculatorEnabled: true,
        presentationId: 'pres-amp-sulb-15g',
        presentationConcentrationId: 'conc-375mg-ml',
      },
      {
        id: 'dose-amp-sulb-azotemic',
        species: 'dog',
        indication: 'Cão Azotêmico Estável com Patógeno de MIC Baixa',
        doseMin: 22,
        doseMax: 22,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta',
        frequency: 'A cada 12 horas (q12h)',
        duration: 'Individualizada conforme evolução da creatinina',
        clinicalContext: 'Espaçamento do intervalo amparado por estudo farmacocinético canino de 2025 devido ao prolongamento da meia-vida para 3,9 horas.',
        monitoring: 'Creatinina sérica, ureia, eletrólitos e débito urinário.',
        evidenceLevel: 'Estudo farmacocinético clínico prospectivo',
        referenceIds: ['ref-wang-2025-azotemia-pk'],
        calculatorEnabled: true,
        presentationId: 'pres-amp-sulb-15g',
        presentationConcentrationId: 'conc-375mg-ml',
      },
      {
        id: 'dose-amp-sulb-prophylaxis',
        species: 'both',
        indication: 'Profilaxia Cirúrgica Perioperatória (Pré-Incisão)',
        doseMin: 22,
        doseMax: 22,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta',
        frequency: '30 a 60 min pré-incisão; redose q90-120min se cirurgia longa',
        duration: 'Dose intraoperatória única ou repetida durante a cirurgia',
        clinicalContext: 'Garante nível tecidual protetor no momento exato do corte e contaminação. Encerrar na recuperação da anestesia.',
        monitoring: 'Sítio cirúrgico, temperatura pós-operatória.',
        evidenceLevel: 'Compêndio farmacológico e estudo farmacocinético clínico',
        referenceIds: ['ref-plumbs-10th-amp-sulb', 'ref-vet-journal-2025-anesthesia-pk'],
        calculatorEnabled: true,
        presentationId: 'pres-amp-sulb-15g',
        presentationConcentrationId: 'conc-375mg-ml',
      },
    ],

    // 9. Tabela Prática de Peso e Calibrador (Reconstituição 375 mg/mL)
    practicalWeightTable: {
      standardDoseText:
        'Reconstituição do frasco de 1,5 g com 3,2 mL de água para injeção gerando 4,0 mL na concentração de 375 mg/mL da associação total (250 mg/mL ampicilina + 125 mg/mL sulbactam).',
      headers: [
        'Peso do Paciente (kg)',
        'Dose Total (22 mg/kg)',
        'Volume a 375 mg/mL',
        'Dose Total (30 mg/kg)',
        'Volume a 375 mg/mL',
      ],
      rows: [
        { weight: '2 kg', totalDose: '44 mg total', col1: '0,12 mL', col2: '60 mg total', col3: '0,16 mL' },
        { weight: '4 kg', totalDose: '88 mg total', col1: '0,23 mL', col2: '120 mg total', col3: '0,32 mL' },
        { weight: '5 kg', totalDose: '110 mg total', col1: '0,29 mL', col2: '150 mg total', col3: '0,40 mL' },
        { weight: '10 kg', totalDose: '220 mg total', col1: '0,59 mL', col2: '300 mg total', col3: '0,80 mL' },
        { weight: '15 kg', totalDose: '330 mg total', col1: '0,88 mL', col2: '450 mg total', col3: '1,20 mL' },
        { weight: '20 kg', totalDose: '440 mg total', col1: '1,17 mL', col2: '600 mg total', col3: '1,60 mL' },
        { weight: '30 kg', totalDose: '660 mg total', col1: '1,76 mL', col2: '900 mg total', col3: '2,40 mL' },
        { weight: '40 kg', totalDose: '880 mg total', col1: '2,35 mL', col2: '1.200 mg total', col3: '3,20 mL' },
      ],
      dropletCalibrator: {
        title: 'Calibrador de Diluição e Infusão Hospitalar',
        concentration: '375 mg/mL da associação total reconstituída (250 mg/mL ampicilina + 125 mg/mL sulbactam)',
        dropletRatio: 'Uso exclusivamente injetável (não aplicável conversão em gotas orais)',
        practicalRule:
          'Dose de 22 mg/kg total = peso (kg) x 0,0587 mL | Dose de 30 mg/kg total = peso (kg) x 0,08 mL',
        note:
          'Diluir o volume aspirado em 20 a 50 mL de Solução Fisiológica 0,9% e infundir ao longo de 15 a 30 minutos. Nunca misturar com aminoglicosídeos.',
      },
    },

    // 10. Texto Modelo de Prescrição Hospitalar Pronto
    samplePrescriptionText:
      'USO HOSPITALAR INTRAVENOSO\n1. Ampicilina Sódica + Sulbactam Sódico 1,5 g (Pó liofilizado para injeção - proporção 2:1)\n   - Reconstituir o frasco de 1,5 g adicionando 3,2 mL de água para injeção estéril (concentração final: 375 mg/mL da associação total, correspondendo a 250 mg/mL de ampicilina e 125 mg/mL de sulbactam).\n   - Administrar [VOLUME] mL ([DOSE_MG] mg da associação total, equivalente a [DOSE_AMP] mg de ampicilina + [DOSE_SULB] mg de sulbactam), diluídos em 30 a 50 mL de Solução Fisiológica 0,9%, por via intravenosa, em infusão lenta ao longo de 20 a 30 minutos, a cada 8 horas, durante o período de internação hospitalar.\n   - ATENÇÃO ENFERMAGEM: NUNCA misturar no mesmo frasco ou equipo com aminoglicosídeos (Amicacina ou Gentamicina) pelo risco de inativação química mútua.\n   - Reavaliar diariamente resposta clínica, leucograma, radiografias e função renal, realizando o descalonamento antimicrobiano assim que houver resultado de cultura e antibiograma.',

    // 11. Fundamentos Clínicos & Evidências Publicadas Comentadas (Zero Asteriscos)
    clinicalFoundationsData: [
      {
        id: 'cf-stewart-peritonitis',
        title: 'Infusão Contínua versus Intermitente em Cães com Peritonite Séptica',
        narrative:
          'A farmacodinâmica dos beta-lactâmicos depende do tempo em que a concentração plasmática livre permanece acima da concentração inibitória mínima (fT>MIC). Em peritonite séptica com elevada carga bacteriana e debris peritoneais, otimizar essa exposição é decisivo. O ensaio clínico prospectivo randomizado de Stewart et al. (2022) comparou em 11 cães com peritonite séptica confirmada a administração de 50 mg/kg IV em bólus inicial seguido de infusão contínua (0,1 mg/kg/min) versus 50 mg/kg IV intermitente a cada 8 horas. Ambas as estratégias garantiram 100% de T>MIC para patógenos com MIC de até 1,25 mcg/mL. Para cepas com MIC elevadas (8 e 16 mcg/mL), a infusão contínua alcançou superioridade numérica mantendo níveis terapêuticos sem toxicidade associada.',
        narrativeHighlights: ['fT>MIC', 'infusão contínua', 'peritonite séptica', '100% de T>MIC'],
        studies: [
          {
            citation: 'Stewart SD, Allen S, Eisenberg B, et al. Am J Vet Res. 2022;84(2):ajvr.22.08.0139.',
            referenceId: 'ref-stewart-2022-peritonitis-pk',
            sourceType: 'Ensaio Clínico Randomizado Prospectivo',
            summaryText:
              'Estudo prospectivo com 11 cães com peritonite séptica submetidos a infusão contínua (50 mg/kg bólus + 0,1 mg/kg/min) vs. infusão intermitente (50 mg/kg q8h). Ambas mantiveram 100% de tempo acima da MIC para isolados com MIC de 0,25 e 1,25 mcg/mL.',
            summaryHighlights: ['100% de tempo acima da MIC', '50 mg/kg q8h', 'infusão contínua'],
            metrics: ['n = 11 cães com peritonite', '100% T>MIC para MIC 1,25 mcg/mL', 'Dose: 50 mg/kg'],
            clinicalConclusion:
              'Demonstra a robustez do regime de 30 a 50 mg/kg para cobrir bactérias suscetíveis e evidencia a lógica de prolongar a infusão em infecções graves com patógenos de MIC intermediária.',
          },
        ],
      },
      {
        id: 'cf-wang-azotemia-pk',
        title: 'A Disfunção Renal e Azotemia Prolongam Profundamente a Meia-Vida Canina',
        narrative:
          'Como a eliminação da ampicilina e do sulbactam depende quase exclusivamente dos rins por filtração e secreção tubular ativa, a doença renal modifica drasticamente sua farmacocinética. O estudo prospectivo de 2025 conduzido por Wang et al. avaliou 29 cães internados (19 azotêmicos e 10 não azotêmicos) tratados com 22 mg/kg total IV a cada 8 horas. Nos cães com azotemia, a meia-vida plasmática média de eliminação saltou de 1,5 horas para 3,9 horas (p menor que 0,0009) e a exposição total (AUC) triplicou (214,5 vs 60,3 mcg h/mL). A modelagem farmacocinética demonstrou que o intervalo a cada 12 horas atinge com segurança os alvos terapêuticos em cães azotêmicos com bactérias suscetíveis.',
        narrativeHighlights: ['meia-vida saltou de 1,5 para 3,9 horas', 'AUC triplicada', 'intervalo a cada 12 horas'],
        studies: [
          {
            citation: 'Wang Z, Shropshire S, Gustafson D, et al. J Vet Pharmacol Ther. 2025;48:241-249.',
            referenceId: 'ref-wang-2025-azotemia-pk',
            sourceType: 'Estudo Farmacocinético Clínico Prospectivo',
            summaryText:
              'Avaliação de 29 cães hospitalizados recebendo 22 mg/kg total IV a cada 8 horas. A meia-vida da ampicilina nos azotêmicos foi de 3,9 ± 2,4 h, versus 1,5 ± 0,3 h nos não azotêmicos (p < 0,00001). A modelagem indicou que o intervalo de 12 horas pode atingir o alvo farmacodinâmico em cães azotêmicos quando o isolado é suscetível.',
            summaryHighlights: ['meia-vida de 3,9 h', 'AUC de 214,5 vs 60,3', 'alvo terapêutico em q12h'],
            metrics: ['n = 29 cães internados', 't1/2: 3,9h azotêmicos vs 1,5h controle', 'p < 0,0009'],
            clinicalConclusion:
              'Cães azotêmicos estáveis infectados por patógenos sensíveis podem ser manejados com segurança com intervalo estendido para q12h, prevenindo acúmulo e toxicidade.',
          },
        ],
      },
      {
        id: 'cf-goggs-critically-ill',
        title: 'Alerta PK/PD em Cães Críticos: Subexposição Frequente Contra Enterobacterales',
        narrative:
          'Um dos erros clínicos mais comuns na terapia intensiva é supor que ampicilina-sulbactam é um antimicrobiano de amplo espectro autossuficiente para sepse por Gram-negativos. O ensaio clínico de Goggs et al. (2025) avaliou 25 cães criticamente enfermos em UTI recebendo 20 mg/kg de ampicilina + 10 mg/kg de sulbactam IV a cada 8 horas. Devido à imensa variabilidade hemodinâmica, expansão volêmica e fuga capilar típica da sepse, a probabilidade de atingir a meta farmacodinâmica (50% fT>MIC) foi de cerca de 90% para isolados com MIC baixa (0,25 mcg/mL), mas desabou para apenas aproximadamente 10% quando a MIC foi de 8 mcg/mL, nível frequente em Enterobacterales hospitalares.',
        narrativeHighlights: ['apenas 10% de probabilidade para MIC 8 mcg/mL', 'subexposição em sepse', 'terapia associada'],
        studies: [
          {
            citation: 'Goggs R, Robbins S, Menard J, et al. J Vet Pharmacol Ther. 2025;48(6):445-456.',
            referenceId: 'ref-goggs-2025-critically-ill-dogs',
            sourceType: 'Ensaio Farmacocinético em Pacientes Críticos',
            summaryText:
              'Estudo em 25 cães internados em UTI com sepse e doenças graves. Apenas 10% dos animais atingiram alvos farmacodinâmicos para patógenos com MIC de 8 mcg/mL sob o regime convencional de 30 mg/kg total q8h.',
            summaryHighlights: ['25 cães críticos de UTI', '10% de sucesso para MIC 8 mcg/mL', 'variabilidade extrema'],
            metrics: ['n = 25 cães de UTI', '90% sucesso para MIC 0,25', '10% sucesso para MIC 8,0 mcg/mL'],
            clinicalConclusion:
              'Não utilizar ampicilina-sulbactam como monoterapia isolada para sepse por Gram-negativos em cães graves; associar obrigatoriamente um agente com melhor cobertura Gram-negativa.',
          },
        ],
      },
      {
        id: 'cf-vet-journal-anesthesia',
        title: 'Anestesia Geral Reduz a Depuração Plasmática em Cerca de 40%',
        narrative:
          'A farmacocinética sob anestesia geral difere do estado acordado. O estudo clínico de 2025 publicado no The Veterinary Journal avaliou 20 cães e observou redução da depuração plasmática da ampicilina de 318 mL/kg/h para 186 mL/kg/h (cerca de 40%). Doses de 20 mg/kg de ampicilina repetidas a cada 90 minutos mantiveram concentrações teciduais acima de 4 mg/L durante 100% do procedimento; a modelagem indicou que a infusão estendida por 4 horas aumentou o ponto de corte farmacodinâmico de 0,5 mg/L para 4 mg/L.',
        narrativeHighlights: ['depuração reduzida em cerca de 40%', 'redose a cada 90 minutos', 'infusão estendida elevou o ponto de corte'],
        studies: [
          {
            citation: 'Population pharmacokinetics of IV ampicillin in dogs. Vet J. 2025;314:106435.',
            referenceId: 'ref-vet-journal-2025-anesthesia-pk',
            sourceType: 'Estudo Farmacocinético Populacional',
            summaryText:
              'Ensaio prospectivo em 20 cães avaliando a cinética no estado acordado e sob anestesia. A depuração caiu de 318 para 186 mL/kg/h. A redose intraoperatória a cada 90 minutos manteve 100% do tempo avaliado acima de 4 mg/L.',
            summaryHighlights: ['depuração: 318 vs. 186 mL/kg/h', 'redose a cada 90 min', '100% do tempo acima de 4 mg/L'],
            metrics: ['n = 20 cães', 'queda de cerca de 40% na depuração', 'redose a cada 90 min'],
            clinicalConclusion:
              'Fundamenta o protocolo cirúrgico padrão ouro de redose a cada 90 a 120 minutos em cirurgias prolongadas e apoia infusões estendidas na rotina.',
          },
        ],
      },
      {
        id: 'cf-del-magno-pyothorax',
        title: 'Manejo Clínico do Piotórax Felino com Drenos de Pequeno Calibre',
        narrative:
          'O piotórax em gatos exige abordagem combinada imediata. Del Magno et al. (2021) descreveram uma série de 10 felinos com piotórax tratados com drenos torácicos de pequeno calibre guiados por fio e antimicrobianoterapia. Nove dos 10 gatos receberam ampicilina-sulbactam parenteral, isolada ou combinada. Os patógenos isolados incluíram Actinomyces, bactérias anaeróbias polimicrobianas, Streptococcus e Pasteurella multocida; todos os 10 gatos sobreviveram à internação. Como se trata de uma série pequena e retrospectiva, o achado apoia a adequação microbiológica do esquema nesse contexto, mas não demonstra superioridade; a drenagem torácica ativa continua indispensável.',
        narrativeHighlights: ['10 gatos sobreviveram', '9/10 tratados com ampicilina-sulbactam', 'drenagem ativa essencial'],
        studies: [
          {
            citation: 'Del Magno S, Foglia A, Golinelli L, et al. Open Vet J. 2021;10(4):443-451.',
            referenceId: 'ref-del-magno-2021-feline-pyothorax',
            sourceType: 'Série de Casos Clínicos Retrospectiva',
            summaryText:
              'Avaliação de 10 gatos com piotórax tratados com drenos percutâneos finos e ampicilina-sulbactam como base antimicrobiana. Taxa de sobrevida hospitalar de 100%.',
            summaryHighlights: ['100% de sobrevida', 'drenos de pequeno calibre', 'flora anaeróbia e Pasteurella'],
            metrics: ['n = 10 felinos', '100% sobrevida hospitalar', '9/10 receberam ampicilina-sulbactam'],
            clinicalConclusion:
              'Confirma a ampicilina-sulbactam como droga de escolha no piotórax felino, enfatizando que o controle físico do foco (drenagem) é parte inseparável da eficácia.',
          },
        ],
      },
    ],

    // 12. Referências Bibliográficas Completas
    references: [
      {
        id: 'ref-plumbs-10th-amp-sulb',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Ampicillin Sodium / Sulbactam Sodium monograph, pp. 82-84; Ampicillin monograph, pp. 78-81. Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-formulary',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Ampicillin monograph, pp. 27-28. British Small Animal Veterinary Association; 2020. Nota editorial: esta edição não contém monografia própria da associação ampicilina/sulbactam.',
        sourceType: 'Formulário Clínico Internacional BSAVA - componente ampicilina',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443743',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-stewart-2022-peritonitis-pk',
        citationText:
          'Stewart SD, Allen S, Eisenberg B, et al. Comparison of the pharmacokinetics of continuous and intermittent infusions of ampicillin-sulbactam in dogs with septic peritonitis. Am J Vet Res. 2022;84(2):ajvr.22.08.0139. doi: 10.2460/ajvr.22.08.0139.',
        sourceType: 'Ensaio Clínico Randomizado em Peritonite Séptica',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36520648/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Randomizado)',
      },
      {
        id: 'ref-wang-2025-azotemia-pk',
        citationText:
          'Wang Z, Shropshire S, Gustafson D, et al. Pharmacokinetics of Ampicillin-Sulbactam in Azotemic and Non-Azotemic Dogs. J Vet Pharmacol Ther. 2025;48:241-249. doi: 10.1111/jvp.13506.',
        sourceType: 'Estudo Farmacocinético em Cães Azotêmicos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40072220/',
        evidenceLevel: 'Nível 1b (Farmacocinética Clínica Prospectiva)',
      },
      {
        id: 'ref-goggs-2025-critically-ill-dogs',
        citationText:
          'Goggs R, Robbins S, Menard J, et al. Intravenous Ampicillin/Sulbactam in Critically Ill Dogs has Variable Pharmacokinetics. J Vet Pharmacol Ther. 2025;48(6):445-456. doi: 10.1111/jvp.70004.',
        sourceType: 'Estudo Farmacocinético em UTI Veterinária',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40511602/',
        evidenceLevel: 'Nível 1b (Farmacocinética em Pacientes Críticos)',
      },
      {
        id: 'ref-vet-journal-2025-anesthesia-pk',
        citationText:
          'Population pharmacokinetics of intravenous ampicillin in awake and anaesthetised dogs. Vet J. 2025;314:106435. doi: 10.1016/j.tvjl.2025.106435.',
        sourceType: 'Estudo Farmacocinético sob Anestesia Geral',
        url: 'https://pubmed.ncbi.nlm.nih.gov/40930245/',
        evidenceLevel: 'Nível 1b (Farmacocinética Populacional)',
      },
      {
        id: 'ref-del-magno-2021-feline-pyothorax',
        citationText:
          'Del Magno S, Foglia A, Golinelli L, et al. The use of small-bore wire-guided chest drains for the management of feline pyothorax: a retrospective case series. Open Vet J. 2021;10(4):443-451. doi: 10.4314/ovj.v10i4.12.',
        sourceType: 'Série de Casos Clínicos Felinos',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33614440/',
        evidenceLevel: 'Nível 2c (Série de Casos Clínicos)',
      },
      {
        id: 'ref-iscaid-respiratory-2017',
        citationText:
          'Lappin MR, Blondeau J, Boothe D, et al. Antimicrobial use Guidelines for Treatment of Respiratory Tract Disease in Dogs and Cats: Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases (ISCAID). J Vet Intern Med. 2017;31(2):279-294. doi: 10.1111/jvim.14627.',
        sourceType: 'Diretrizes Clínicas Internacionais ISCAID',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28185306/',
        evidenceLevel: 'Consenso Internacional Especializado (ISCAID)',
      },
      {
        id: 'ref-nelson-couto-6th-emergency',
        citationText:
          'Nelson RW, Couto CG. Medicina Interna de Pequenos Animais, 6ª ed. Cap. 18: Emergency Management of Respiratory Distress, pp. 312-325. Elsevier Brasil; 2021.',
        sourceType: 'Tratado de Medicina Interna Veterinária',
        evidenceLevel: 'Tratado Padrão Ouro Internacional',
      },
      {
        id: 'ref-anvisa-in-360-2025',
        citationText:
          'Agência Nacional de Vigilância Sanitária (ANVISA). Instrução Normativa IN nº 360, de 23 de abril de 2025. Lista de substâncias antimicrobianas sujeitas a controle e retenção de receita.',
        sourceType: 'Normativa Regulatória Oficial Brasileira',
        url: 'https://anvisalegis.datalegis.net/',
        evidenceLevel: 'Legislação Federal Vigente',
      },
    ],

    genericBrandsNote:
      'Apresentações registradas no Brasil para uso humano e utilizadas em rotina veterinária extra-bula incluem ampicilina sódica + sulbactam sódico pó liofilizado 1,5 g e 3,0 g (proporção 2:1) de laboratórios como ABL Brasil (Registro MS 1.5562.0032), Fresenius Kabi, Eurofarma, Blau Farmacêutica e Cristália, além da marca de referência Unasyn® (Pfizer).',

    // 13. Avisos Clínicos Importantes Específicos
    clinicalWarningItems: [
      {
        label: 'Proporção 2:1 e Convenção de Dose:',
        text: 'As ampolas comerciais combinam 2 partes de ampicilina com 1 parte de sulbactam. A dose padrão internacional (Plumb) expressa a soma total (22 a 30 mg/kg total). Logo, 30 mg/kg da associação = 20 mg/kg de ampicilina + 10 mg/kg de sulbactam. Sempre explicitar na prescrição para prevenir subdosagem ou superdosagem.',
      },
      {
        label: 'Alerta em Sepse e Enterobacterales:',
        text: 'Estudos de 2025 comprovam que em cães sépticos críticos a chance de atingir alvos contra Enterobacterales com MIC limítrofe (8 mcg/mL) é de apenas 10%. Não utilizar ampicilina-sulbactam como monoterapia isolada em choque séptico sem cobertura associada para Gram-negativos.',
      },
      {
        label: 'Incompatibilidade com Aminoglicosídeos:',
        text: 'NUNCA misturar ampicilina-sulbactam com amicacina ou gentamicina na mesma seringa, frasco ou via de infusão. Ocorre precipitação e inativação química mútua in vitro imediata. Administrar em acessos venosos separados ou lavar a via com SF 0,9%.',
      },
    ],

    relatedDiseaseSlugs: [
      'coagulacao-intravascular-disseminada-caes-gatos',
    ],
    isControlled: false,
    isPublished: true,
    source: 'seed',
  },
];

export const ampicilinaSulbactamMedicationRecord = ampicilinaSulbactamMedicationsSeed[0];
