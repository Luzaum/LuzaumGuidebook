import type { MedicationRecord } from '../../types/medication';

export const tramadolMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-tramadol',
    slug: 'tramadol',
    title: 'Tramadol (Cloridrato de Tramadol)',
    activeIngredient: 'Cloridrato de Tramadol',
    pharmacologicClass:
      'Analgésico de ação mista; agonista fraco de receptores µ-opioides e inibidor da recaptação neuronal de serotonina (5-HT) e noradrenalina (NE)',
    species: ['dog', 'cat'],
    category: 'anestesia-dor',
    tags: [
      'Tramadol',
      'Cronidor',
      'Opioide Atípico',
      'Analgesia Multimodal',
      'O-Desmetiltramadol (M1)',
      'Controle Especial (Lista C1 / MAPA)',
      'Dor Pós-Operatória',
      'Dor Oncológica',
    ],
    tradeNames: [
      'Cronidor® 12 mg, 40 mg e 80 mg Comprimidos Palatáveis (Agener União — Uso Veterinário Exclusivo)',
      'Cronidor® 2% Injetável 20 mg/mL (Agener União — Uso Veterinário Exclusivo)',
      'Tramal® 50 mg Cápsulas e Gotas 100 mg/mL (Grünenthal — Uso Humano)',
      'Tramal® Injetável 50 mg/mL e 100 mg/2 mL (Grünenthal — Uso Humano)',
      'Tramadol Genérico Gotas 100 mg/mL e Comprimidos 50 mg (Teuto, Medley, EMS, Eurofarma)',
      'Dorless V® Injetável 50 mg/mL (Syntec — Uso Veterinário)',
    ],
    officialSiteUrl: 'https://agener.com.br/produtos/pequenos-animais/analgesicos-e-anti-inflamatorios/cronidor/',
    leafletUrl: 'https://agener.com.br/produtos/pequenos-animais/analgesicos-e-anti-inflamatorios/cronidor/',
    mechanismOfAction:
      'Fármaco analgésico de duplo mecanismo de ação estruturado como mistura racêmica de enantiômeros (+) e (-). O enantiômero (+)-tramadol atua como agonista de baixa afinidade sobre os receptores µ-opioides (MOR) e inibe seletivamente a recaptação neuronal pré-sináptica de serotonina (5-HT), promovendo sua liberação adicional. O enantiômero (-)-tramadol inibe seletivamente a recaptação neuronal de noradrenalina (NE) e estimula receptores alfa-2 adrenérgicos no sistema nervoso central. A fração opioide clinicamente relevante depende quase na totalidade da bioativação hepática pelo citocromo P450 no metabólito ativo O-desmetiltramadol (M1), cuja afinidade pelos receptores µ-opioides é 200 a 300 vezes superior à da molécula original (Ki ~ 20-40 nM para M1 vs Ki ~ 12.486 nM para o tramadol inalterado). Paralelamente, o bloqueio sináptico da recaptação de serotonina e noradrenalina ativa intensamente as vias inibitórias descendentes da dor na substância cinzenta periaquedutal e no corno dorsal da medula espinhal, inibindo a transmissão nociceptiva ascendente.',
    plainLanguageSummary:
      'Analgésico de ação mista que combina efeito opioide fraco com modulação dos neurotransmissores serotonina e noradrenalina. ATENÇÃO: cães e gatos metabolizam o tramadol de formas completamente diferentes. Em gatos, o medicamento gera seu metabólito ativo potente (M1) e oferece analgesia real, mas seu sabor extremamente amargo causa salivação e recusa. Em cães, a produção do metabólito ativo é muito baixa e dura pouco tempo (~2h), razão pela qual o tramadol oral NÃO funciona sozinho em osteoartrite e deve ser utilizado apenas como adjuvante em protocolos de analgesia multimodal associado a outros analgésicos.',

    indications: [
      'Analgesia perioperatória e pós-cirúrgica aguda em cães e gatos (tecido mole e ortopedia), integrada a protocolos multimodais.',
      'Analgesia em felinos domésticos para dor crônica musculoesquelética (osteoartrite) sob formulação palatável ou cápsula.',
      'Componente adjuvante em protocolos multimodais para dor crônica oncológica e neuropática em pequenos animais.',
      'Controle de dor visceral aguda associada a pancreatite, peritonite ou trauma contuso em ambiente hospitalar.',
      'Potencialização analgésica multimodal em combinação aditiva benéfica com dipirona ou AINEs.',
    ],

    contraindications: [
      'Hipersensibilidade conhecida ao cloridrato de tramadol ou a qualquer componente da formulação.',
      'Histórico de epilepsia idiopática, crises convulsivas recorrentes ou traumatismo cranioencefálico com hipertensão intracraniana (o tramadol reduz o limiar convulsivo).',
      'Administração concomitante com inibidores da monoaminoxidase (IMAOs - como selegilina ou amitraz em coleiras) ou inibidores da recaptação de serotonina (ISRSs - fluoxetina, paroxetina; TCAs - amitriptilina; trazodona) pelo risco de síndrome serotoninérgica fatal.',
      'Insuficiência hepática grave descompensada ou cirrose terminal (comprometimento crítico da biotransformação em M1 e acúmulo tóxico do fármaco original).',
      'Monoterapia isolada por via oral para o tratamento de osteoartrite crônica em cães (comprovadamente ineficaz por ensaio clínico cego).',
    ],

    cautions: [
      'Não esperar analgesia opioide robusta quando administrado por via oral em cães em monoterapia; associar obrigatoriamente a AINEs, dipirona ou gabapentina.',
      'Em felinos, o amargor intenso provoca salivação profusa imediata (ptialismo), engasgo e aversão ao tutor; administrar comprimidos palatáveis veterinários ou encapsular gotas em cápsula gelatinosa vazia.',
      'Ajustar intervalo de administração em pacientes com doença renal crônica (estágios IRIS 3 e 4) e nefropatas desidratados, pois 90% da eliminação é renal.',
      'Em caso de suspeita de intoxicação aguda ou síndrome serotoninérgica, o naloxone reverte apenas a depressão respiratória opioide, NÃO inibe os efeitos serotoninérgicos e pode aumentar o risco de convulsões; empregar suporte, ciproeptadina e sedativos.',
    ],

    adverseEffects: [
      'Sedação transitória, sonolência, letargia e ataxia motora leve a moderada.',
      'Náusea, salivação excessiva (ptialismo reativo ao amargor), regurgitação e êmese.',
      'Disforia felina, agitação, vocalização anormal, dilatação pupilar (midríase) e hiperestesia temporária.',
      'Constipação intestinal e diminuição da motilidade gastrointestinal em tratamentos prolongados.',
      'Redução do limiar epiléptico com desencadeamento de crises convulsivas em animais predispostos.',
      'Síndrome serotoninérgica aguda (tremores, rigidez muscular, hipertermia, taquicardia e agitação extrema) por overdose ou interação.',
    ],

    // 1. Resumo Rápido / Indicações Resumidas
    quickIndications: [
      {
        condition: 'Analgesia Perioperatória & Pós-Cirúrgica Aguda Canina (Multimodal Parenteral)',
        species: 'dog',
        doseSummary: '2,0 a 4,0 mg/kg a cada 6 a 8 horas (IV lenta ou IM profunda); dose padrão 2 mg/kg',
        route: 'Intravenosa lenta (IV > 2-3 min) ou Intramuscular profunda (IM)',
        duration: 'Fase aguda cirúrgica (24 a 72 horas hospitalares); associar obrigatoriamente a dipirona ou AINE',
        clinicalContext:
          'Utilizado no pré-operatório imediato ou pós-operatório precoce de tecidos moles e ortopedia. A via intramuscular (Cronidor® 2%) atinge biodisponibilidade de ~92%, oferecendo pico confiável.',
      },
      {
        condition: 'Analgesia Cirúrgica e Pós-Operatória em Felinos',
        species: 'cat',
        doseSummary: '1,0 a 2,0 mg/kg a cada 8 a 12 horas (IV lenta, SC ou VO); dose máxima 2 mg/kg q12h em idosos',
        route: 'Intravenosa lenta (IV), Subcutânea (SC) ou Oral (VO encapsulado)',
        duration: 'Fase cirúrgica imediata (24 a 48 horas); manter monitoramento de comportamento',
        clinicalContext:
          'Eficácia opioide genuína demonstrada na espécie devido à sustentação de níveis elevados do metabólito M1. Evitar bólus IV rápido para mitigar náusea e disforia.',
      },
      {
        condition: 'Osteoartrite e Dor Crônica Articular Felina (Comprovada em Evidência)',
        species: 'cat',
        doseSummary: '2,0 mg/kg a cada 12 horas (VO) durante 5 a 14 dias; até 3,0 mg/kg q12h em dor refratária',
        route: 'Oral (VO em comprimido palatável ou cápsula gelatinosa)',
        duration: 'Ciclos controlados de 1 a 4 semanas com reavaliações clínicas periódicas',
        clinicalContext:
          'O estudo prospectivo randomizado de Monteiro et al. (2017) comprovou melhora objetiva da mobilidade e atividade vertical em gatos com OA tratados com 2 mg/kg q12h.',
      },
      {
        condition: 'Dor Oncológica, Neuropática & Traumática Canina (Componente Multimodal Adjuvante)',
        species: 'dog',
        doseSummary: '2,0 a 3,0 mg/kg a cada 8 horas (VO); contraindicado como monoterapia isolada',
        route: 'Oral (VO)',
        duration: 'Uso associado contínuo ou intermitente; desmame gradual após 3 a 4 semanas',
        clinicalContext:
          'O cão gera pouco M1 e depura rapidamente (t1/2 ~2h). O estudo de Budsberg et al. (2018 - JAVMA) comprovou que tramadol oral isolado não supera o placebo em osteoartrite canina. Seu uso deve ser estritamente como adjuvante sinérgico.',
      },
    ],

    // 2. Indicações Completas e Extremamente Detalhadas com Consensos Internacionais
    detailedIndications: [
      {
        id: 'ind-tramadol-dog-periop',
        indication: 'Analgesia Perioperatória e Pós-Cirúrgica Aguda em Cães (Protocolo Multimodal Parenteral)',
        clinicalContext:
          'No manejo da dor aguda cirúrgica (ovariohisterectomia, cirurgias ortopédicas e de tecidos moles), o tramadol administrado por via parenteral (IV lenta ou IM) atua reduzindo a sensibilização central e a necessidade de anestésicos inalatórios. Lumb & Jones (6ª ed., Cap. 23) e o BSAVA Small Animal Formulary (10ª ed., p. 411) relatam que 2 mg/kg de tramadol IV oferece analgesia comparável a doses baixas de morfina pós-OHE quando administrado preventivamente. Contudo, seu efeito mecânico antinociceptivo é fugaz quando usado isoladamente, exigindo sinergismo com dipirona ou AINE.',
        species: 'dog',
        dose: '2,0 a 4,0 mg/kg (dose recomendada padrão de 2,0 mg/kg IV lenta ou IM)',
        route: 'Intravenosa lenta (IV administrado em 2 a 3 minutos) ou Intramuscular profunda (IM)',
        frequency: 'A cada 6 a 8 horas (q6h a q8h)',
        duration: 'Primeiras 24 a 72 horas pós-cirúrgicas hospitalares; transicionar para via oral se mantida analgesia multimodal',
        mechanismOfAction:
          'Ativação rápida dos receptores µ-opioides medulares pelo metabólito M1 recém-formado combinada à inibição da recaptação de noradrenalina e serotonina, bloqueando a transmissão nociceptiva ascendente no corno dorsal.',
        clinicalRationale:
          'A formulação injetável veterinária Cronidor® 2% (20 mg/mL) possui biodisponibilidade intramuscular de aproximadamente 92%, superando a variabilidade da absorção entérica canina e atingindo analgesia rápida.',
        monitoring: 'Escore de dor de Glasgow simplificado, sedação, frequência respiratória, reflexo de deglutição e náusea.',
        referenceIds: ['ref-lumb-jones-6th-opioids', 'ref-bsava-10th-tramadol', 'ref-mastrocinque-2026-dipyrone-tramadol'],
        evidenceLevel: 'Diretrizes AAHA / Nível 1b (Ensaios Clínicos Randomizados)',
      },
      {
        id: 'ind-tramadol-cat-periop-oa',
        indication: 'Analgesia Cirúrgica e Osteoartrite Crônica em Felinos Domésticos',
        clinicalContext:
          'Ao contrário dos cães, felinos são excelentes respondedores farmacológicos ao tramadol. O gato produz concentrações plasmáticas substancialmente maiores e prolongadas do metabólito ativo O-desmetiltramadol (M1) devido à menor taxa de depuração e deficiência funcional de glicuronidação (UGT1A6). Ensaios clínicos demonstraram que o tramadol eleva os limiares térmicos e mecânicos de dor e restaura a mobilidade em gatos com osteoartrite natural de forma estatisticamente significativa (Monteiro et al., 2017).',
        species: 'cat',
        dose: '1,0 a 2,0 mg/kg (não exceder 2 mg/kg q12h em felinos idosos)',
        route: 'Oral (VO em comprimidos palatáveis ou cápsulas) ou Parenteral (IV lenta, SC)',
        frequency: 'A cada 12 horas (q12h; podendo ser estendido a cada 8 horas em dor cirúrgica intensa se bem tolerado)',
        duration: 'Agudo (3 a 5 dias pós-cirúrgico) ou Crônico (ciclos de 2 a 4 semanas na osteoartrite)',
        mechanismOfAction:
          'Agonismo pleno de receptores µ-opioides pelo metabólito M1 persistente (t1/2 de M1 no gato é de 4,5 a 5,0 horas) associado à potenciação das vias inibitórias descendentes monoaminérgicas.',
        clinicalRationale:
          'Eficácia comprovada em modelos térmicos e escores validados de OA felina (FMPI). O maior gargalo na espécie felina não é farmacodinâmico, mas de adesão pelo tutor devido ao extremo amargor do fármaco.',
        monitoring: 'Grau de ptialismo à tomada, sedação, midríase, comportamento eferente/disforia e frequência de defecação.',
        referenceIds: ['ref-monteiro-2017-feline-oa', 'ref-pypendop-ilkiw-2008-cat-pk', 'ref-plumbs-10th-tramadol'],
        evidenceLevel: 'Ensaio Clínico Randomizado Controlado / Nível 1a',
      },
      {
        id: 'ind-tramadol-dog-multimodal-pain',
        indication: 'Adjuvante Multimodal em Dor Oncológica, Neuropática e Traumática Canina',
        clinicalContext:
          'O estudo de Budsberg et al. (2018, JAVMA) demonstrou categoricamente que o cloridrato de tramadol administrado oralmente (5 mg/kg q8h) em monoterapia durante 10 dias NÃO produziu melhora clínica ou cinemática da dor em cães com osteoartrite de joelho ou cotovelo, sendo estatisticamente indistinguível do placebo. Por essa razão, os consensos modernos (AAHA/WSAVA) desaconselham formalmente o tramadol oral isolado para osteoartrite canina. Entretanto, em regimes multimodais para dor neuropática e dor oncológica, sua inibição de recaptação de noradrenalina/serotonina atua sinergicamente com gabapentina e AINEs.',
        species: 'dog',
        dose: '2,0 a 3,0 mg/kg (dose adjuvante combinada)',
        route: 'Oral (VO)',
        frequency: 'A cada 8 horas (q8h) pontual',
        duration: 'Variável de acordo com a patologia de base; desmame gradual ao longo de 2 a 3 semanas caso usado por > 30 dias',
        mechanismOfAction:
          'Modulação monoaminérgica das vias descendentes inibitórias da medula espinhal (aumento de serotonina e noradrenalina na fenda sináptica do corno dorsal), reduzindo o wind-up medular.',
        clinicalRationale:
          'A combinação do tramadol com gabapentina (antagonista alfa-2-delta) e dipirona atinge alvos neurofisiológicos distintos e complementares, contornando a fraca atividade µ-opioide do cão.',
        monitoring: 'Sinais de sonolência, ataxia de membros pélvicos, constipação crônica e interações medicamentosas.',
        referenceIds: ['ref-budsberg-2018-oa-dog', 'ref-kukanich-papich-2004-dog-pk', 'ref-aaha-pain-guidelines'],
        evidenceLevel: 'Literatura Especializada & Consenso de Dor / Nível 2a',
      },
    ],

    // 3. Farmacocinética Clínica Detalhada
    pharmacokineticsData: {
      absorption:
        'Absorção rápida no trato gastrointestinal superior após administração oral. Em cães, a biodisponibilidade oral é moderada e altamente variável (média de 65%, oscilando entre 45% e 90%), decorrente do expressivo metabolismo de primeira passagem hepática. Por via retal, a biodisponibilidade canina é de apenas ≈10%. Na via intramuscular profunda canina utilizando formulação veterinária (Cronidor® 2%), a biodisponibilidade atinge aproximadamente 92%. O pico de concentração plasmática máxima (Tmax) ocorre entre 1,0 e 2,0 horas em cães e entre 0,5 e 1,5 horas em gatos. Em felinos, a absorção oral é rápida e quase completa, mas severamente prejudicada na prática clínica pela salivação reflexa violenta desencadeada pelo amargor da solução.',
      distribution:
        'Fármaco altamente lipofílico que apresenta ampla e rápida distribuição tecidual sistêmica. O volume aparente de distribuição (Vd) em cães é de 3,8 a 4,7 L/kg e em gatos de 2,5 a 3,2 L/kg, refletindo extensa penetração nos tecidos corporais periféricos e extravasculares em comparação ao espaço intravascular.',
      metabolism:
        'Metabolização hepática extensa e complexa mediada pelo sistema enzimático citocromo P450, gerando mais de 20 metabólitos. DIVERGÊNCIA CENTRAL ENTRE ESPÉCIES: Em caninos, a isoenzima CYP2D15 é responsável pela O-desmetilação que forma o O-desmetiltramadol (M1), o único metabólito com relevante afinidade por receptores µ-opioides; contudo, no cão esta via é ineficiente e minoritária. A maior parte do tramadol canino é desviada pela isoenzima CYP2B11 para formar N-desmetiltramadol (M2), um metabólito inativo sem ação analgésica. Posteriormente, M1 e M2 são convertidos em M5 (N,O-didesmetiltramadol) via CYP2C21 e eliminados. Ao contrário, em felinos a formação de M1 é expressivamente maior e sustentada, além de a deficiência natural de glicuronidação felina (UGT1A6) diminuir o clearance de metabólitos, garantindo níveis séricos de M1 elevados e duradouros.',
      elimination:
        'A depuração plasmática total corporal em cães é extremamente acelerada: 55 mL/kg/minuto em animais jovens e 24 mL/kg/minuto em idosos. Em gatos, a depuração é substancialmente menor (15 a 20 mL/kg/minuto). A eliminação final é predominantemente renal: cerca de 90% da dose administrada é excretada pela urina (aproximadamente 30% como fármaco inalterado e 60% na forma de metabólitos conjugados), enquanto os 10% restantes são excretados nas fezes por secreção biliar.',
      cnsPenetration:
        'Excelente permeabilidade através da barreira hematoencefálica (BHE) graças à elevada lipossolubilidade da molécula original e do metabólito M1, atingindo concentrações terapêuticas no líquido cefalorraquidiano (LCR) e atuando tanto nos receptores opioides quanto nas vias monoaminérgicas do corno dorsal da medula.',
      plasmaBinding:
        'Baixa taxa de ligação às proteínas plasmáticas (albumina e alfa-1 glicoproteína ácida), estimada em 20% a 25% em cães e gatos. Não sofre interferência crítica por deslocamento proteico competitivo com outros fármacos.',
      halfLife:
        'Cães: Meia-vida de eliminação do tramadol de 1,5 a 2,0 horas (reduzida para 1,1 hora em Greyhounds); meia-vida do metabólito ativo M1 de apenas ≈2,0 horas | Gatos: Meia-vida de eliminação do tramadol de 2,5 a 3,5 horas; meia-vida do metabólito ativo M1 sustentada por 4,5 a 5,0 horas.',
    },

    // 4. Módulo de Informações Gerais (Info Tab)
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Oral (VO)',
          technique:
            'Administrar preferencialmente junto a pequena quantidade de alimento para reduzir náusea gástrica. Comprimidos palatáveis veterinários (Cronidor®) possuem atrativo e são aceitos voluntariamente por cães. Em gatos, o sabor extremamente amargo do tramadol líquido causa sialorreia imediata, engasgo e estresse; recomenda-se administrar as gotas ou comprimidos humanos rigorosamente acondicionados dentro de cápsulas gelatinosas vazias nº 3 ou 4.',
          nursingCare:
            'Nunca forçar a ingestão da solução em gotas diretamente na cavidade oral de felinos. Em cães, orientar o tutor que o tramadol oral exige regularidade estrita de horários (a cada 8 horas) para manter a analgesia monoaminérgica estável.',
          limitations: 'Contraindicado por via oral em pacientes com vômitos incoercíveis, íleo paralítico obstrutivo ou inconscientes.',
        },
        {
          route: 'Intravenosa (IV Lenta Hospitalar)',
          technique:
            'Administrar SEMPRE de forma lenta, respeitando o tempo mínimo de 2 a 3 minutos por injeção. Recomenda-se diluir a dose em 5 a 10 mL de Solução Fisiológica 0,9% antes de injetar no equipo.',
          nursingCare:
            'A administração em bólus IV rápido ("em jato") desencadeia náusea súbita, salivação reflexa, êmese em jato, hipotensão arterial passageira e liberação de histamina. Manter o paciente monitorado durante e após a injeção.',
          limitations: 'Exclusivo para regime ambulatorial hospitalar supervisionado ou centro cirúrgico.',
        },
        {
          route: 'Intramuscular Profunda (IM)',
          technique:
            'Aplicar em massa muscular lombar epaxial volumosa ou no membro pélvico (músculo quadríceps femoral). Utilizar agulha de calibre adequado para profundidade.',
          nursingCare:
            'A formulação veterinária Cronidor® 2% apresenta excelente biodisponibilidade IM (~92%) e raramente causa dor na aplicação. Alternar sítios de injeção em tratamentos com múltiplas tomadas.',
          limitations: 'Evitar em pacientes portadores de coagulopatias severas, trombocitopenia crítica ou caquexia muscular extrema.',
        },
        {
          route: 'Subcutânea (SC)',
          technique:
            'Injeção no tecido celular subcutâneo na região interescapular ou dorso-cervical.',
          nursingCare:
            'Via amplamente utilizada em felinos pós-cirúrgicos devido à facilidade técnica e perfil cinético favorável.',
          limitations: 'Absorção pode ser retardada em animais hipotérmicos, desidratados ou com hipoperfusão periférica.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução Fisiológica (Cloreto de Sódio 0,9% - SF 0,9%) — DILUENTE DE ESCOLHA',
          'Solução de Glicose a 5% (SG 5%) — fisicamente estável e compatível',
          'Solução de Ringer com Lactato (SRL) — compatível para infusão contínua ou bólus diluído',
          'Solução de Ringer Simples',
        ],
        incompatibleFluids: [
          'NUNCA misturar na mesma seringa com Diazepam, Midazolam ou Tiopental Sódico (ocorre turvação e precipitação imediata)',
          'Incompatível fisicamente na mesma solução com Propofol e emulsões lipídicas',
          'Incompatível com Anti-inflamatórios Não Esteroidais ácidos em frascos ou seringas de vidro/plástico',
          'Não associar a antibióticos injetáveis com pH alcalino marcado (Ampicilina sódica)',
        ],
        infusionRateGuidance:
          'Para infusão intravenosa intermitente (bólus), aplicar diluído em SF 0,9% ao longo de 2 a 3 minutos. Em infusão contínua (CRI) perioperatória, utiliza-se dose de ataque de 1,5 a 2,0 mg/kg IV lenta seguida de taxa contínua de 1,0 a 2,5 mg/kg/hora em bomba de infusão volumétrica, associado a lidocaína e cetamina (protocolo FLK/MLK adaptado).',
        preparationNotes:
          'A solução injetável de cloridrato de tramadol é incolor, límpida e aquosa com pH entre 6,5 e 7,5. Conservar em temperatura ambiente (15°C a 30°C) ao abrigo da luz e umidade. Após aberto o frasco multidoses de Cronidor® 2%, utilizar dentro do prazo de 28 dias respeitando a antissepsia estrita da rolha de borracha.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Derivado sintético ciclohexanol-aminometil feniléter ((1R,2R)-2-[(dimetilamino)metil]-1-(3-metoxifenil)ciclo-hexan-1-ol)',
        chemicalClassDescription:
          'Molécula aminociclohexanol sintética análoga à codeína com centros quirais que originam dois enantiômeros complementares com propriedades farmacológicas distintas.',
        therapeuticClass: 'Analgésico de ação central mista (agonista fraco µ-opioide e inibidor da recaptação de serotonina e noradrenalina)',
        therapeuticClassDescription:
          'Composto multimodal que combina ativação fraca de receptores opioides com reforço potente das vias inibitórias descendentes espinhais monoaminérgicas.',
        receptorTargets: [
          'Receptores µ-Opioides (MOR) Centrais e Medulares (afinidade 200x maior do metabólito M1)',
          'Transportador Neuronal de Serotonina (SERT)',
          'Transportador Neuronal de Noradrenalina (NET)',
          'Receptores Alfa-2 Adrenérgicos Centrais',
        ],
        detailedTargets: [
          {
            target: 'Receptores µ-Opioides (MOR) Centrais e Espinhais',
            action:
              'O fármaco inalterado tem afinidade desprezível (Ki ~ 12.486 nM). O metabólito ativo O-desmetiltramadol (M1) atua como agonista seletivo de alta afinidade (Ki ~ 20-40 nM) sobre os receptores MOR acoplados à proteína Gi.',
            clinicalSignificance:
              'Inibe a adenilato ciclase, fecha canais de cálcio dependentes de voltagem pré-sinápticos e abre canais de potássio retificadores internos pós-sinápticos, hiperpolarizando os neurônios do corno dorsal da medula e abortando a transmissão do impulso álgico nociceptivo. Em gatos, a produção robusta de M1 gera analgesia real; em cães, a formação incipiente de M1 limita essa via.',
          },
          {
            target: 'Transportador de Serotonina (SERT)',
            action:
              'O enantiômero (+)-tramadol inibe seletivamente a recaptação neuronal de serotonina na fenda sináptica e estimula a exocitose pré-sináptica de 5-HT.',
            clinicalSignificance:
              'Aumenta o teor de serotonina nas sinapses das vias descendentes inibitórias que se projetam do tronco encefálico para o corno dorsal da medula, bloqueando a transmissão de estímulos álgicos espinhais. Essa ação explica o risco severo de Síndrome Serotoninérgica quando associado a inibidores de recaptação (fluoxetina, amitriptilina) ou IMAOs.',
          },
          {
            target: 'Transportador de Noradrenalina (NET) & Receptores Alfa-2 Adrenérgicos',
            action:
              'O enantiômero (-)-tramadol bloqueia potentemente a recaptação de noradrenalina e estimula receptores alfa-2 adrenérgicos.',
            clinicalSignificance:
              'Promove analgesia medular mediada por noradrenalina, sinérgica com a via opioide. As vias noradrenérgicas descendentes hiperpolarizam interneurônios nociceptivos espinhais.',
          },
          {
            target: 'Complexo Citocromo P450 Hepático (CYP2D15 / CYP2B11)',
            action:
              'Substrato metabólico das enzimas microssomais hepáticas de fase I.',
            clinicalSignificance:
              'Diferença crucial de espécies: a isoenzima canina CYP2B11 desvia a biotransformação para a via inativa M2, enquanto gatos acumulam M1 devido à baixa depuração e deficiência de glicuronidação (UGT1A6).',
          },
        ],
      },
      prescriptionType: {
        category: 'Medicamento sob Controle Especial (Portaria SVS/MS nº 344/1998 — Lista C1 / MAPA)',
        ordinanceOrLaw:
          'Portaria SVS/MS nº 344/1998 (Lista C1 - Substâncias Sujeitas a Controle Especial) e Instrução Normativa MAPA nº 35/2017 para formulações veterinárias.',
        retentionRequired: true,
        guidelines:
          'Para apresentações humanas (Tramal® ou genéricos em gotas e comprimidos de até 100 mg): prescrição veterinária obrigatória em Receituário de Controle Especial em 2 vias (1ª via retida na farmácia dispensadora e 2ª via carimbada e devolvida ao tutor). Validade da receita de 30 dias contados da data de emissão, autorizando quantidade suficiente para no máximo 60 dias de tratamento. Para formulações de uso veterinário exclusivo (Cronidor® comprimidos ou injetável): emitir Notificação de Receita Veterinária ou Receituário em 2 vias com identificação completa do médico-veterinário (CRMV), dados do tutor e do paciente animal.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Caninos: Fraca Formação de M1, Clearance Ultra-Rápido e Ineficácia Oral Isolada em Osteoartrite',
          description:
            'Cães apresentam metabolismo hepático desfavorável para o tramadol: a enzima CYP2D15 canina gera quantidades mínimas de M1, enquanto a via CYP2B11 direciona o fármaco para o metabólito inativo M2. Além disso, o M1 produzido tem meia-vida extremamente fugaz de apenas ~1,7 a 2,0 horas. O estudo cego randomizado de Budsberg et al. (2018 - JAVMA) comprovou que 5 mg/kg q8h de tramadol oral isolado foi indistinguível do placebo em osteoartrite canina. Por via parenteral (Cronidor® 2% IM ou IV), o tramadol atinge picos plasmáticos rápidos e fornece analgesia pós-cirúrgica quando associado a dipirona ou AINE.',
          clinicalImplications:
            'NUNCA utilizar tramadol oral como monoterapia em cães com osteoartrite ou dor crônica ortopédica. Em cães, prescrevê-lo sempre como adjuvante em protocolos de analgesia multimodal (associado a AINEs, dipirona ou gabapentina). Intervalo rígido de 8 horas (q8h) para evitar janelas de dor por depuração rápida.',
        },
        {
          species: 'cat',
          title: 'Felinos: Produção Robusta de M1, Alta Eficácia Analgésica e o Desafio Crítico do Amargor Oral',
          description:
            'Gatos constituem a espécie que melhor responde farmacodinamicamente ao tramadol. Devido à sua cinética metabólica peculiar e à deficiência congênita de glicuronidação (UGT1A6), o felino gera concentrações séricas expressivas e duradouras de M1, com meia-vida de 4,5 a 5,0 horas (mais do que o dobro da observada no cão). Monteiro et al. (2017) demonstraram melhora significativa da mobilidade em gatos com osteoartrite usando 2 mg/kg q12h. O grande desafio na rotina felina é o amargor insuportável da molécula, que deflagra salivação profusa, náusea e aversão imediata.',
          clinicalImplications:
            'Dose recomendada de 1,0 a 2,0 mg/kg a cada 12 horas (VO, SC ou IV lenta). NUNCA administrar gotas líquidas diretamente na boca do gato: colocar as gotas ou o comprimido fracionado dentro de uma cápsula gelatinosa vazia (nº 3 ou 4) para evitar contato do fármaco com a mucosa oral.',
        },
      ],
    },

    // 5. Módulo de Atenção & Alertas Clínicos (Attention Tab)
    attentionData: {
      adverseEffectsDetailed: [
        {
          effect: 'Sedação, sonolência profunda, letargia e ataxia motora transitória',
          frequency: 'common',
          clinicalManagement:
            'Orientar o tutor que sonolência leve é esperada nas primeiras administrações. Manter o animal em local seguro com piso antiderrapante, protegido de escadas e piscinas. Se a ataxia for excessiva, reduzir a dose em 20% a 30% mantendo o analgésico de base (AINE ou dipirona).',
          mechanism:
            'Depressão inibitória dos circuitos do tronco encefálico e do sistema reticular ativador ascendente mediada pela estimulação opioide dos receptores MOR associada ao efeito agonista alfa-2 noradrenérgico central.',
        },
        {
          effect: 'Amargor extremo, ptialismo reflexo severo e aversão alimentar em gatos',
          frequency: 'common',
          clinicalManagement:
            'Não forçar a administração da solução em gotas diretamente na cavidade oral. Utilizar cápsulas gelatinosas gastrorresistentes vazias (preenchidas com a dose imediatamente antes da administração), comprimidos palatáveis veterinários (Cronidor®) ou manipulação farmacêutica palatabilizada.',
          mechanism:
            'Estimulação gustativa amarga intensa dos receptores gustativos tipo 2 (T2Rs) na base da língua felina, desencadeando efluxo parassimpático vagal e salivação reflexa massiva com ânsia de vômito.',
        },
        {
          effect: 'Náusea, salivação, regurgitação e êmese após administração intravenosa rápida',
          frequency: 'common',
          clinicalManagement:
            'Administrar a injeção intravenosa SEMPRE de forma lenta (ao longo de 2 a 3 minutos), preferencialmente diluída em SF 0,9%. Em animais propensos a náusea pós-operatória, pré-medicar com citrato de maropitant (1 mg/kg SC/IV) ou ondansetrona (0,5 mg/kg IV).',
          mechanism:
            'Estimulação direta dos quimiorreceptores da zona de gatilho quimiorreceptora (CRTZ) na área postrema do assoalho do quarto ventrículo encefálico por picos séricos rápidos de tramadol.',
        },
        {
          effect: 'Disforia felina, vocalização anormal, dilatação pupilar (midríase) e inquietação',
          frequency: 'uncommon',
          clinicalManagement:
            'Acomodar o gato em ambiente escuro, silencioso e acolhedor, reduzindo estímulos visuais e táteis. Não repreender o animal. Se a agitação for severa, administrar acepromazina em microdose (0,01 a 0,02 mg/kg IM) ou dexmedetomidina em dose reversora baixa.',
          mechanism:
            'Desinibição paroxística de circuitos talâmicos e límbicos decorrente da estimulação opioide µ em gatos associada à hiperestimulação serotoninérgica cortical transitória.',
        },
        {
          effect: 'Constipação intestinal e diminuição da motilidade digestiva em uso crônico',
          frequency: 'uncommon',
          clinicalManagement:
            'Garantir hidratação plena e estimular o consumo de água limpa. Adicionar fibras solúveis (psyllium) à dieta ou administrar lactulose (0,5 mL/kg q12h) se houver retenção fecal superior a 48 horas.',
          mechanism:
            'Ativação de receptores µ-opioides no plexo mioentérico entérico, inibindo a liberação de acetilcolina, diminuindo a peristalse propulsiva e aumentando a reabsorção de água intraluminal.',
        },
        {
          effect: 'Redução do limiar epiléptico e deflagração de crises convulsivas paroxísticas',
          frequency: 'rare',
          clinicalManagement:
            'Suspender imediatamente o tramadol. Instituir terapia anticonvulsivante de emergência com diazepam (0,5 mg/kg IV) ou levetiracetam (30 a 60 mg/kg IV). Fármaco contraindicado em animais com histórico de crises.',
          mechanism:
            'A inibição da recaptação de serotonina e a alteração dos gradientes inibitórios GABAérgicos corticais reduzem a resistência elétrica das redes neuronais, facilitando disparos epilépticos paroxísticos sincronizados.',
        },
        {
          effect: 'Síndrome Serotoninérgica Aguda por intoxicação ou interação medicamentosa',
          frequency: 'rare',
          clinicalManagement:
            'Emergência clínica grave: suspender imediatamente todos os agentes serotoninérgicos. Administrar ciproeptadina (antagonista 5-HT: 1,1 mg/kg VO ou retal em cães; 2 a 4 mg/gato VO ou retal a cada 6 a 8 horas). Controlar a hipertermia com resfriamento ativo, fornecer suporte ventilatório e tratar tremores/convulsões com benzodiazepínicos ou metocarbamol. NALOXONE NÃO REVERTE E PODE PIORAR O QUADRO.',
          mechanism:
            'Hiperestimulação maciça e sustentada de receptores serotoninérgicos centrais e periféricos (especialmente 5-HT1A e 5-HT2A), resultando em hipertermia maligna, mioclonia, rigidez muscular, taquicardia e colapso autonômico.',
        },
      ],
      precautions: [
        {
          alertLevel: 'contraindicated',
          condition: 'Uso Concomitante com IMAOs (Selegilina, Amitraz) ou ISRSs (Fluoxetina, Trazodona, Amitriptilina)',
          clinicalAction:
            'Contraindicação absoluta. NUNCA associar o tramadol com inibidores da recaptação de serotonina, antidepressivos tricíclicos ou inibidores da monoaminoxidase. Respeitar janela de descontinuação (washout) de pelo menos 14 dias antes de introduzir o tramadol.',
          physiologicalExplanation:
            'O bloqueio simultâneo da recaptação e do catabolismo da serotonina provoca acúmulo neurotóxico agudo de 5-HT nas sinapses encefálicas, desencadeando a Síndrome Serotoninérgica potencialmente letal.',
        },
        {
          alertLevel: 'contraindicated',
          condition: 'Pacientes Epilépticos, com Crises Convulsivas Prévias ou Traumatismo Cranioencefálico (TCE)',
          clinicalAction:
            'Contraindicação absoluta. O tramadol reduz significativamente o limiar convulsivo cortical. Em animais neurológicos ou com histórico de crises, escolher outros analgésicos opioides puros (metadona, morfina) ou dipirona.',
          physiologicalExplanation:
            'A hiperestimulação monoaminérgica e a inibição heterotrópica de freios GABAérgicos facilitam a deflagração e a generalização de descargas epilépticas corticais paroxísticas.',
        },
        {
          alertLevel: 'contraindicated',
          condition: 'Monoterapia Oral Isolada para Osteoartrite Crônica Canina',
          clinicalAction:
            'Contraindicação formal baseada em evidência. Não prescrever tramadol oral isolado como analgésico de rotina para osteoartrite em cães. Se prescrito, deve ser estritamente como coadjuvante de AINEs, dipirona ou gabapentina.',
          physiologicalExplanation:
            'O cão produz concentrações insignificantes do metabólito ativo M1 (t1/2 ~ 1,7h), e o estudo de Budsberg et al. (2018 - JAVMA) comprovou que a monoterapia oral é idêntica ao placebo em osteoartrite canina.',
        },
        {
          alertLevel: 'warning',
          condition: 'Insuficiência Hepática Grave Descompensada ou Cirrose Terminal',
          clinicalAction:
            'Precaução crítica. Reduzir a dose em 50% ou buscar analgésico alternativo. A biotransformação em M1 fica prejudicada e ocorre acúmulo perigoso do fármaco original na circulação.',
          physiologicalExplanation:
            'A perda de parênquima funcional hepático diminui as taxas de enzimas CYP450, acarretando acúmulo da molécula original e risco de neurotoxicidade serotoninérgica.',
        },
        {
          alertLevel: 'warning',
          condition: 'Manejo em Superdosagem e Falha/Perigo do Uso Isolado de Naloxone',
          clinicalAction:
            'Alerta toxicológico crítico. O naloxone reverte apenas os efeitos agonistas µ-opioides residuais, NÃO reverte os efeitos serotoninérgicos ou noradrenérgicos e PODE AUMENTAR O RISCO DE CONVULSÕES por despolarização paradoxal. O tratamento de escolha envolve suporte respiratório, ciproeptadina e sedação com benzodiazepínicos.',
          physiologicalExplanation:
            'O bloqueio agudo dos receptores MOR pelo naloxone remove a inibição pré-sináptica residual sobre terminais excitatórios, potencializando a hiperexcitabilidade serotoninérgica e os disparos convulsivos.',
        },
        {
          alertLevel: 'caution',
          condition: 'Doença Renal Crônica (DRC) em Estágios IRIS 3 e 4',
          clinicalAction:
            'Alerta clínico. Prolongar o intervalo de administração de cada 8 horas para cada 12 horas e utilizar o limite inferior de dose (1,0 a 2,0 mg/kg), monitorando a hidratação.',
          physiologicalExplanation:
            'Aproximadamente 90% da dose do tramadol e de seus metabólitos é eliminada pelos rins. Na perda da filtração glomerular, há retenção sérica progressiva e risco de sedação prolongada.',
        },
        {
          alertLevel: 'caution',
          condition: 'Gestação, Lactação e Neonatos',
          clinicalAction:
            'Alerta clínico. Evitar o uso em fêmeas gestantes ou lactantes. O tramadol e o metabólito M1 atravessam a placenta e são excretados no leite materno, podendo causar sedação neonatal e depressão respiratória.',
          physiologicalExplanation:
            'Passagem livre pela barreira placentária e concentração no leite materno devido à lipofilia do composto.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Insuficiência Hepática Grave Descompensada ou Shunt Portossistêmico',
          recommendedAdjustment:
            'Reduzir a dose habitual em 30% a 50% e estender o intervalo para cada 12 a 24 horas; contraindicado em hepatopatia severa descompensada com encefalopatia.',
          physiologicalRationale:
            'A perda da massa funcional hepatocelular compromete as enzimas CYP450, reduzindo o clearance sistêmico do tramadol e aumentando drasticamente o risco de acúmulo tóxico.',
        },
        {
          clinicalCondition: 'Doença Renal Crônica (DRC) — Estágios IRIS 3 e 4',
          recommendedAdjustment:
            'Manter dose conservadora de 1 a 2 mg/kg a cada 12 horas (ao invés de q8h), assegurando hidratação contínua e monitorando sedação.',
          physiologicalRationale:
            'Cerca de 90% dos metabólitos e do fármaco inalterado são eliminados pelos rins. A falência da filtração glomerular prolonga a meia-vida plasmática.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos com Fragilidade ou Felinos Idosos (> 11 anos)',
          recommendedAdjustment:
            'Adotar dose inicial de 1 a 2 mg/kg a cada 12 horas; não ultrapassar 2 mg/kg q12h em gatos idosos para prevenir disforia, midríase e ataxia.',
          physiologicalRationale:
            'Gatos idosos apresentam redução fisiológica da taxa de filtração glomerular e menor depuração hepática de M1, tornando-os altamente propensos a disforia opioide e sedação.',
        },
        {
          clinicalCondition: 'Suspensão Terapêutica pós-Uso Crônico (Protocolo de Desmame)',
          recommendedAdjustment:
            'Realizar desmame gradual ao longo de 2 a 3 semanas após uso contínuo superior a 4 semanas; nunca interromper de forma súbita.',
          physiologicalRationale:
            'A interrupção abrupta após uso prolongado pode precipitar síndrome de abstinência opioide e monoaminérgica com disforia, hiperalgesia de rebote, agitação e tremores.',
        },
        {
          clinicalCondition: 'Uso Associado a Agentes Potencializadores (Dipirona, AINEs ou Gabapentina)',
          recommendedAdjustment:
            'Utilizar o limite inferior de dose (2 mg/kg a cada 8 a 12 horas em cães), explorando o sinergismo analgésico multimodal.',
          physiologicalRationale:
            'A associação analgésica multimodal atua em múltiplos pontos da via de dor, permitindo utilizar doses menores de cada fármaco com máxima eficácia e mínimos efeitos colaterais.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Inibidores Seletivos da Recaptação de Serotonina (ISRSs - Fluoxetina, Sertralina, Paroxetina)',
          severity: 'contraindicated',
          clinicalEffect:
            'Precipitação fulminante de Síndrome Serotoninérgica com hipertermia severa, mioclonia, agitação extrema, convulsões e óbito.',
          pharmacologicalMechanism:
            'Inibição supra-aditiva da recaptação de serotonina na fenda sináptica neuronal gerada pela combinação dos dois compostos.',
        },
        {
          drugOrClass: 'Inibidores da Monoaminoxidase (IMAOs - Selegilina, Amitraz em coleiras e banhos)',
          severity: 'contraindicated',
          clinicalEffect:
            'Crise hipertensiva maligna, colapso autonômico, hipertermia letal e status epilepticus serotoninérgico.',
          pharmacologicalMechanism:
            'O tramadol bloqueia a recaptação de monoaminas enquanto os IMAOs impedem sua degradação enzimática, gerando inundação de serotonina e noradrenalina.',
        },
        {
          drugOrClass: 'Antidepressivos Tricíclicos (TCAs - Amitriptilina, Clomipramina) e Trazodona',
          severity: 'contraindicated',
          clinicalEffect:
            'Toxicidade serotoninérgica severa, sedação profunda e redução perigosa do limiar convulsivo.',
          pharmacologicalMechanism:
            'Bloqueio concomitante de transportadores monoaminérgicos (SERT/NET) e potenciação da atividade 5-HT central.',
        },
        {
          drugOrClass: 'Dipirona / Metamizol (Associação Analgésica Padrão)',
          severity: 'minor',
          clinicalEffect:
            'Sinergismo analgésico supra-aditivo altamente benéfico (Mastrocinque et al., 2026), potencializando a analgesia perioperatória sem toxicidade aditiva.',
          pharmacologicalMechanism:
            'Mecanismos complementares: a dipirona atua inibindo a COX-3 central e ativando o sistema endocanabinoide/opioide endógeno, enquanto o tramadol inibe vias monoaminérgicas descendentes.',
        },
        {
          drugOrClass: 'Anti-inflamatórios Não Esteroidais (AINEs - Carprofeno, Meloxicam, Firocoxib)',
          severity: 'minor',
          clinicalEffect:
            'Efeito analgésico poupador de opioides; fornece o componente anti-inflamatório periférico que o tramadol não possui.',
          pharmacologicalMechanism:
            'Ação periférica e central sobre COX-2 pelos AINEs combinada à modulação nociceptiva medular e supraespinhal pelo tramadol.',
        },
        {
          drugOrClass: 'Gabapentina e Pregabalina (Moduladores da Dor Neuropática)',
          severity: 'moderate',
          clinicalEffect:
            'Excelente sinergismo no controle de dor neuropática e oncológica; pode aumentar temporariamente a sedação e a ataxia.',
          pharmacologicalMechanism:
            'Bloqueio de canais de cálcio dependentes de voltagem (subunidade alfa-2-delta) pela gabapentina somado à inibição das vias nociceptivas pelo tramadol.',
        },
        {
          drugOrClass: 'Fenobarbital e Indutores Enzimáticos Microssomais do Citocromo P450',
          severity: 'moderate',
          clinicalEffect:
            'Redução das concentrações plasmáticas e encurtamento da meia-vida do tramadol, podendo requerer intervalos mais estritos.',
          pharmacologicalMechanism:
            'A indução das isoenzimas CYP450 hepáticas pelo fenobarbital acelera o clearance e a depuração metabólica do tramadol.',
        },
        {
          drugOrClass: 'Inibidores do CYP450 (Fluconazol, Cetoconazol, Cimetidina)',
          severity: 'moderate',
          clinicalEffect:
            'Aumento da concentração sérica do tramadol original com redução da conversão no metabólito ativo M1, diminuindo o efeito analgésico opioide.',
          pharmacologicalMechanism:
            'Inibição competitiva das enzimas microssomais responsáveis pela O-desmetilação em M1 e depuração hepática.',
        },
      ],
    },

    // 6. Fundamentos Clínicos & Evidências Farmacológicas (PubMed Landmark Studies)
    clinicalStudiesCommented: [
      {
        title: 'Farmacocinética do Tramadol e do Metabólito O-Desmetiltramadol em Cães',
        authorsYear: 'Kukanich B, Papich MG (2004)',
        journal: 'Journal of Veterinary Pharmacology and Therapeutics',
        studyDesign: 'Estudo prospectivo farmacocinético cruzado avaliando administração IV e oral de tramadol.',
        sampleSize: '6 cães adultos hígidos da raça Greyhound.',
        mainFindings:
          'Demonstrou que cães geram quantidades substancialmente menores de O-desmetiltramadol (M1) em relação a humanos. A meia-vida de eliminação do M1 no cão foi de apenas 2,04 horas, com clearance corporal total de 55 mL/kg/min. A biodisponibilidade oral média do tramadol foi de 65%. As concentrações plasmáticas de M1 caíram rapidamente abaixo dos limiares mínimos considerados antinociceptivos.',
        clinicalTakeaway:
          'Primeiro estudo a alertar a comunidade veterinária sobre a limitação da via opioide do tramadol no cão, comprovando a rápida depuração e a fraca formação de M1 na espécie canina.',
        referenceId: 'ref-kukanich-papich-2004-dog-pk',
      },
      {
        title: 'Farmacocinética do Tramadol e de seus Metabólitos em Gatos Domésticos',
        authorsYear: 'Pypendop BH, Ilkiw JE (2008)',
        journal: 'Journal of Veterinary Pharmacology and Therapeutics',
        studyDesign: 'Estudo prospectivo cruzado avaliando as vias intravenosa, oral e subcutânea em felinos.',
        sampleSize: '6 gatos domésticos hígidos monitorados por cromatografia líquida de alta eficiência (HPLC).',
        mainFindings:
          'Comprovou que felinos produzem concentrações séricas expressivamente maiores de M1 em comparação aos cães. A meia-vida do M1 em gatos foi de 4,5 a 5,0 horas (mais que o dobro do cão), e a depuração plasmática foi significativamente menor. A biodisponibilidade por via subcutânea foi de 93% e oral de 93%.',
        clinicalTakeaway:
          'Evidenciou a marcante divergência farmacocinética entre cães e gatos, comprovando que o felino é um metabolizador eficiente de M1 e um excelente candidato à analgesia por tramadol.',
        referenceId: 'ref-pypendop-ilkiw-2008-cat-pk',
      },
      {
        title: 'Falta de Eficácia do Tramadol Oral no Tratamento de Dor por Osteoartrite Canina',
        authorsYear: 'Budsberg SC, Torres BT, Kleine SA, Sandberg GS, Berjeski AK (2018)',
        journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
        studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego, controlado por placebo e carprofeno.',
        sampleSize: '35 cães de proprietários com osteoartrite unilateral crônica de cotovelo ou joelho.',
        mainFindings:
          'A administração oral de tramadol (5 mg/kg q8h durante 10 dias) NÃO produziu melhora estatisticamente significativa nos escores de dor (CBPI), nem na análise cinética de marcha por placa de força (PVF e VI), apresentando resultados indistinguíveis do placebo. Ao contrário, o carprofeno produziu melhora clínica e cinética expressiva.',
        clinicalTakeaway:
          'Estudo divisor de águas que desfez o mito do tramadol oral como analgésico isolado para osteoartrite em cães, contraindicando sua utilização em monoterapia para dor articular crônica canina.',
        referenceId: 'ref-budsberg-2018-oa-dog',
      },
      {
        title: 'Eficácia Analgésica do Tramadol em Gatos com Osteoartrite Espontânea Natural',
        authorsYear: 'Monteiro BP, Klinck MP, Moreau M, Guillot M, Steagall PV, Pelletier JP, Martel-Pelletier J, Gauvin D, Del Castillo JR (2017)',
        journal: 'PLoS ONE',
        studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego, cruzado e controlado por placebo.',
        sampleSize: '18 gatos idosos de proprietários particulares portadores de osteoartrite crônica confirmada.',
        mainFindings:
          'O tramadol administrado na dose de 2 mg/kg VO a cada 12 horas durante 19 dias produziu aumento estatisticamente significativo na atividade locomotora noturna e vertical (avaliada por colares com acelerômetros piezoelétricos contínuos) e redução significativa dos escores de dor e mobilidade (FMPI e CSOM). Efeitos adversos como sedação e disforia foram leves e autolimitados.',
        clinicalTakeaway:
          'Confirma a eficácia clínica real do tramadol como analgésico no manejo da osteoartrite felina, consolidando o papel do M1 na espécie.',
        referenceId: 'ref-monteiro-2017-feline-oa',
      },
      {
        title: 'Analgesia Multimodal com Tramadol e Dipirona em Cirurgia de Tecidos Moles em Pequenos Animais',
        authorsYear: 'Mastrocinque S, et al. (2026)',
        journal: 'Frontiers in Veterinary Science',
        studyDesign: 'Ensaio clínico prospectivo randomizado avaliando sinergismo antinociceptivo em cirurgia de tecidos moles.',
        sampleSize: '40 animais submetidos a ovariohisterectomia eletiva sob protocolo multimodal.',
        mainFindings:
          'A associação de dipirona (25 mg/kg IV) e cloridrato de tramadol (2 mg/kg IV) proporcionou escores de dor significativamente menores no pós-operatório imediato e reduziu a necessidade de analgesia de resgate em 65% em comparação a qualquer um dos fármacos utilizados isoladamente.',
        clinicalTakeaway:
          'Sustenta a recomendação prática de combinar tramadol com dipirona em cirurgias de tecidos moles, explorando a complementaridade de receptores da dor visceral e somática.',
        referenceId: 'ref-mastrocinque-2026-dipyrone-tramadol',
      },
      {
        title: 'Efeitos do Tramadol na Concentração Alveolar Mínima (CAM) do Sevoflurano em Cães',
        authorsYear: 'Seddighi MR, Egger CM, Rohrbach BW, Cox SK, Doherty TJ (2009)',
        journal: 'Veterinary Anaesthesia and Analgesia',
        studyDesign: 'Estudo experimental cruzado avaliando o efeito poupador de inalatório em cães anestesiados.',
        sampleSize: '6 cães adultos hígidos.',
        mainFindings:
          'O tramadol administrado em bólus IV de 1,5 mg/kg seguido de CRI de 1,3 mg/kg/h reduziu a CAM do sevoflurano em 26%. O aumento da dose para bólus de 3 mg/kg seguido de CRI de 2,6 mg/kg/h resultou em redução de 36% da CAM.',
        clinicalTakeaway:
          'Comprova o efeito hemodinâmico e poupador de anestésico inalatório do tramadol parenteral transoperatório no cão quando administrado em infusão contínua.',
        referenceId: 'ref-seddighi-2009-mac-tramadol',
      },
    ],

    // 7. Apresentações Comerciais Disponíveis no Mercado
    presentations: [
      {
        id: 'pres-cronidor-12',
        label: 'Cronidor® 12 mg (Agener União — Comprimidos Palatáveis Bipartidos)',
        form: 'Comprimido palatável sulcado divisível',
        concentrationValue: 12,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Cartucho com 10 comprimidos palatáveis sulcados; permite partição em metades iguais de 6 mg',
        route: 'VO',
        channel: 'veterinary',
        scoringInfo: 'Comprimido palatável com vinco para bipartição precisa (6 mg por metade)',
        commercialProductSlug: 'cronidor-agener',
      },
      {
        id: 'pres-cronidor-40',
        label: 'Cronidor® 40 mg (Agener União — Comprimidos Palatáveis Bipartidos)',
        form: 'Comprimido palatável sulcado divisível',
        concentrationValue: 40,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Cartucho com 10 comprimidos palatáveis sulcados; permite partição em metades iguais de 20 mg',
        route: 'VO',
        channel: 'veterinary',
        scoringInfo: 'Comprimido palatável com vinco para bipartição precisa (20 mg por metade)',
        commercialProductSlug: 'cronidor-agener',
      },
      {
        id: 'pres-cronidor-80',
        label: 'Cronidor® 80 mg (Agener União — Comprimidos Palatáveis Quadripartidos)',
        form: 'Comprimido palatável sulcado quadripartido',
        concentrationValue: 80,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Cartucho com 10 comprimidos palatáveis; permite fracionamento em quatro partes iguais de 20 mg cada',
        route: 'VO',
        channel: 'veterinary',
        scoringInfo: 'Comprimido palatável quadripartido (vinco em cruz: 20 mg por quarto)',
        commercialProductSlug: 'cronidor-agener',
      },
      {
        id: 'pres-cronidor-injetavel-2',
        label: 'Cronidor® 2% Injetável 20 mg/mL (Agener União — Frasco-Ampola 20 mL ou 50 mL)',
        form: 'Solução injetável estéril (frasco-ampola multidoses)',
        concentrationValue: 20,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco-ampola de vidro âmbar com 20 mL ou 50 mL contendo 20 mg/mL de cloridrato de tramadol',
        route: 'IV / IM / SC',
        channel: 'veterinary',
        scoringInfo: 'Solução parenteral de uso veterinário exclusivo (20 mg/mL • 0,1 mL/kg na dose de 2 mg/kg)',
        commercialProductSlug: 'cronidor-agener',
      },
      {
        id: 'pres-tramadol-gotas-100',
        label: 'Tramadol Genérico / Tramal® Gotas 100 mg/mL (Teuto, Medley, Grünenthal — Frasco 10 mL ou 15 mL)',
        form: 'Solução oral em gotas',
        concentrationValue: 100,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco conta-gotas de 10 mL ou 15 mL (100 mg/mL • 1 mL = 40 gotas • 1 gota = 2,5 mg)',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Gotejador calibrado: 40 gotas por mL (1 gota contém exatamente 2,5 mg de tramadol)',
        dropsPerMl: 40,
        commercialProductSlug: 'tramal-grunenthal',
      },
      {
        id: 'pres-tramadol-comp-50',
        label: 'Tramadol Genérico / Tramal® 50 mg (Teuto, EMS, Grünenthal — Comprimidos ou Cápsulas)',
        form: 'Comprimido ou cápsula dura',
        concentrationValue: 50,
        concentrationUnit: 'mg/comprimido',
        packInfo: 'Caixa com 10 ou 20 comprimidos/cápsulas de 50 mg de cloridrato de tramadol',
        route: 'VO',
        channel: 'human_pharmacy',
        scoringInfo: 'Comprimidos sulcados ou cápsulas humanas (difíceis de fracionar para pacientes pequenos)',
        commercialProductSlug: 'tramal-grunenthal',
      },
      {
        id: 'pres-tramal-injetavel-100',
        label: 'Tramal® / Genérico Injetável 100 mg/2 mL ou 50 mg/mL (Grünenthal / Teuto — Ampolas)',
        form: 'Solução injetável estéril (ampola)',
        concentrationValue: 50,
        concentrationUnit: 'mg/mL',
        packInfo: 'Ampola de vidro de 1 mL (50 mg) ou 2 mL (100 mg) contendo 50 mg/mL',
        route: 'IV / IM / SC',
        channel: 'human_pharmacy',
        scoringInfo: 'Uso hospitalar concentrado; requer diluição em SF 0,9% para administração lenta',
        commercialProductSlug: 'tramal-grunenthal',
      },
    ],

    // 8. Posologia Estruturada e Doses
    doses: [
      {
        id: 'dose-tramadol-dog-periop',
        species: 'dog',
        indication: 'Analgesia Perioperatória e Pós-Cirúrgica Aguda — Dose Padrão Parenteral',
        doseMin: 2.0,
        doseMax: 4.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta ou IM profunda',
        frequency: 'a cada 6 a 8 horas',
        duration: '24 a 72 horas pós-operatórias',
        notes:
          'Dose padrão recomendada de 2,0 mg/kg IV lenta (> 2 a 3 min) ou IM profunda (Cronidor® 2% injetável: 0,1 mL/kg). Associar obrigatoriamente a dipirona ou AINE para analgesia sinérgica multimodal.',
        evidenceLevel: 'Consenso AAHA de Dor / Nível 1b',
        referenceIds: ['ref-lumb-jones-6th-opioids', 'ref-bsava-10th-tramadol', 'ref-mastrocinque-2026-dipyrone-tramadol'],
        calculatorEnabled: false,
        presentationId: 'pres-cronidor-injetavel-2',
      },
      {
        id: 'dose-tramadol-cat-periop',
        species: 'cat',
        indication: 'Analgesia Cirúrgica e Pós-Operatória em Felinos',
        doseMin: 1.0,
        doseMax: 2.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'IV lenta, SC ou VO',
        frequency: 'a cada 8 a 12 horas',
        duration: '1 a 3 dias pós-cirúrgicos',
        notes:
          'Em gatos idosos, não ultrapassar 2,0 mg/kg q12h pelo risco de disforia e midríase. Por via oral, administrar apenas em comprimidos palatáveis ou em cápsulas gelatinosas gastrorresistentes.',
        evidenceLevel: 'Diretrizes Clínicas Felinas / Nível 1a',
        referenceIds: ['ref-monteiro-2017-feline-oa', 'ref-pypendop-ilkiw-2008-cat-pk'],
        calculatorEnabled: false,
      },
      {
        id: 'dose-tramadol-cat-oa',
        species: 'cat',
        indication: 'Osteoartrite e Dor Articular Crônica em Felinos (Monteiro et al., 2017)',
        doseMin: 2.0,
        doseMax: 3.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas',
        duration: 'Ciclos de 2 a 4 semanas com acompanhamento de escores de mobilidade',
        notes:
          'Dose comprovada de 2,0 mg/kg VO q12h. Exige cuidados de encapsulamento para contornar o amargor intenso e prevenir o abandono do tratamento pelo tutor.',
        evidenceLevel: 'Ensaio Clínico Randomizado Duplo-Cego / Nível 1a',
        referenceIds: ['ref-monteiro-2017-feline-oa'],
        calculatorEnabled: false,
      },
      {
        id: 'dose-tramadol-dog-multimodal',
        species: 'dog',
        indication: 'Adjuvante Multimodal em Dor Crônica Oncológica e Neuropática Canina',
        doseMin: 2.0,
        doseMax: 3.0,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 8 horas',
        duration: 'Uso contínuo multimodal com desmame lento ao final',
        notes:
          'Contraindicado em monoterapia isolada para osteoartrite canina (Budsberg et al., 2018). Prescrever estritamente como coadjuvante de AINEs, dipirona ou gabapentina.',
        evidenceLevel: 'Consenso Internacional de Dor / Nível 2a',
        referenceIds: ['ref-budsberg-2018-oa-dog', 'ref-aaha-pain-guidelines'],
        calculatorEnabled: false,
        presentationId: 'pres-cronidor-40',
      },
    ],

    // 9. Pilares Terapêuticos Essenciais & Destaques
    pillars: [
      {
        title: 'O M1 Decide a Força Opioide',
        icon: 'ShieldCheck',
        desc: 'O tramadol inalterado tem baixíssima afinidade µ-opioide (Ki > 12.000 nM). Toda a analgesia opioide verdadeira depende da formação hepática do metabólito M1 (O-desmetiltramadol), 200 a 300 vezes mais potente.',
      },
      {
        title: 'Analgesia Descendente Monoaminérgica',
        icon: 'Activity',
        desc: 'Além do efeito opioide fraco, inibe a recaptação de serotonina (SERT) e noradrenalina (NET), ativando as vias inibitórias descendentes que bloqueiam os sinais nociceptivos no corno dorsal da medula.',
      },
      {
        title: 'No Cão, o Metabolismo Trabalha Contra',
        icon: 'Clock',
        desc: 'O cão produz quantidades ínfimas e fugazes de M1 (t1/2 ~ 1,7–2h) por desvio via CYP2B11 para o metabólito inativo M2. Monoterapia oral falha em osteoartrite canina (Budsberg 2018); seu papel no cão é estritamente adjuvante multimodal.',
      },
      {
        title: 'No Gato, a Farmacologia é Outra',
        icon: 'AlertTriangle',
        desc: 'Felinos geram altos níveis duradouros de M1 (t1/2 ~ 4,5–5h) com analgesia opioide comprovada (Monteiro 2017). O gargalo crítico é o amargor extremo que causa salivação profusa e exige encapsulamento.',
      },
    ],

    quickSummaryHighlights: [
      'Analgésico de ação mista que combina agonismo µ-opioide (via metabólito M1) com inibição da recaptação de serotonina e noradrenalina',
      'Metabolismo espécie-específico divergente: cães formam pouco M1 e o depuram rapidamente (t1/2 ~2h); gatos acumulam M1 por 4,5 a 5 horas',
      'Ineficaz como monoterapia oral isolada para osteoartrite canina (estudo cego JAVMA Budsberg 2018); em cães, deve ser usado apenas em protocolos multimodais',
      'Comprovadamente eficaz em osteoartrite felina (Monteiro 2017), porém o sabor extremamente amargo exige administração em cápsulas gelatinosas gastrorresistentes',
      'Substância sujeita a controle especial (Portaria SVS/MS nº 344/1998 — Lista C1 em 2 vias / MAPA Notificação de Receita para Cronidor®)',
      'Contraindicado formalmente com IMAOs e antidepressivos pelo risco letal de Síndrome Serotoninérgica; o naloxone NÃO reverte a neurotoxicidade serotoninérgica',
    ],

    attentionSubtitle:
      'O tramadol apresenta farmacocinética drasticamente diferente entre cães e gatos. Exige atenção estrita quanto à ineficácia oral isolada em cães com dor crônica, amargor severo em felinos, redução do limiar epiléptico e contraindicação com antidepressivos pelo risco de Síndrome Serotoninérgica letal.',

    samplePrescriptionText:
      'RECEITUÁRIO DE CONTROLE ESPECIAL (LISTA C1 - EM 2 VIAS)\n' +
      '1ª Via: Retenção da Farmácia / Drogaria | 2ª Via: Orientação ao Tutor\n\n' +
      'USO ORAL:\n' +
      '1. Cronidor® 40 mg (Agener União — Uso Veterinário Exclusivo) ------- 1 cartucho (10 comprimidos)\n' +
      '   Administrar 1/2 comprimido (equivalente a 20 mg para cão de 10 kg na dose de 2 mg/kg) por via oral, a cada 8 horas (às 08:00h, 16:00h e 24:00h), durante 5 dias consecutivos, integrado ao protocolo pós-cirúrgico com dipirona.\n\n' +
      'OU ALTERNATIVA EM SOLUÇÃO ORAL (HUMANA / DROGARIA):\n' +
      '1. Tramadol Gotas 100 mg/mL (Teuto, Medley ou Tramal®) ------------- 1 frasco (10 mL)\n' +
      '   Administrar 8 gotas (equivalente a 20 mg para cão de 10 kg na concentração de 40 gotas/mL = 2,5 mg/gota) por via oral, a cada 8 horas, durante 5 dias.\n\n' +
      'PARA FELINOS (COM CUIDADO DE ENCAPSULAMENTO):\n' +
      '1. Cloridrato de Tramadol 8 mg em Cápsulas Gelatinosas Mini nº 4 --- 1 frasco (20 cápsulas)\n' +
      '   Administrar 1 cápsula por via oral a cada 12 horas para gato de 4 kg (dose de 2 mg/kg), durante 14 dias.\n\n' +
      'ORIENTAÇÕES OBRIGATÓRIAS AO TUTOR:\n' +
      '• NUNCA associar o tramadol com medicamentos antidepressivos humanos (fluoxetina, amitriptilina, trazodona) ou coleiras à base de amitraz, pelo risco grave de intoxicação (Síndrome Serotoninérgica).\n' +
      '• Não administrar gotas puras na boca de gatos: o sabor extremamente amargo causa salivação profusa imediata, náusea e estresse severo.\n' +
      '• Sonolência leve é comum nas primeiras doses; caso o animal apresente instabilidade excessiva, tremores ou desorientação, suspender o uso e contatar o médico-veterinário.',

    practicalWeightTable: {
      standardDoseText:
        'Cálculo de dose prática baseada na posologia clínica padrão de 2,0 mg/kg a cada 8 a 12 horas por via oral (VO) ou parenteral.',
      headers: [
        'Peso do Paciente',
        'Dose Alvo (2 mg/kg)',
        'Cronidor® Comprimidos (12 / 40 / 80 mg)',
        'Tramadol Gotas (40 gts/mL = 2,5 mg/gt)',
        'Cronidor® 2% Injetável (20 mg/mL)',
      ],
      rows: [
        {
          weight: '2 kg (gato / cão toy)',
          totalDose: '4 mg',
          col1: 'Inadequado fracionar (usar manipulado/gotas)',
          col2: '1 a 2 gotas (2,5 a 5 mg)',
          col3: '0,20 mL (via SC ou IV lenta)',
        },
        {
          weight: '4 kg (gato / cão pequeno)',
          totalDose: '8 mg',
          col1: '1/2 comp de 12 mg (6 mg) ou manipulado',
          col2: '3 gotas (7,5 mg)',
          col3: '0,40 mL (via SC ou IV lenta)',
        },
        {
          weight: '6 kg',
          totalDose: '12 mg',
          col1: '1 comprimido inteiro de 12 mg',
          col2: '5 gotas (12,5 mg)',
          col3: '0,60 mL (via IM profunda ou IV)',
        },
        {
          weight: '10 kg',
          totalDose: '20 mg',
          col1: '1/2 comprimido de 40 mg (20 mg)',
          col2: '8 gotas (20 mg = 0,20 mL)',
          col3: '1,00 mL (via IM ou IV lenta)',
        },
        {
          weight: '15 kg',
          totalDose: '30 mg',
          col1: '3/4 de comprimido de 40 mg (ou 1 comp 12 + 1/2 de 40)',
          col2: '12 gotas (30 mg = 0,30 mL)',
          col3: '1,50 mL (via IM ou IV lenta)',
        },
        {
          weight: '20 kg',
          totalDose: '40 mg',
          col1: '1 comprimido inteiro de 40 mg (40 mg)',
          col2: '16 gotas (40 mg = 0,40 mL)',
          col3: '2,00 mL (via IM ou IV lenta)',
        },
        {
          weight: '30 kg',
          totalDose: '60 mg',
          col1: '1 comp e 1/2 de 40 mg (ou 3/4 comp de 80 mg)',
          col2: '24 gotas (60 mg = 0,60 mL)',
          col3: '3,00 mL (via IM ou IV lenta)',
        },
        {
          weight: '40 kg',
          totalDose: '80 mg',
          col1: '1 comprimido inteiro de 80 mg (80 mg)',
          col2: '32 gotas (80 mg = 0,80 mL)',
          col3: '4,00 mL (via IM ou IV lenta)',
        },
      ],
      dropletCalibrator: {
        title: 'Guia de Conversão & Calibrador Posológico do Tramadol em Gotas',
        concentration: 'Tramadol Gotas 100 mg/mL (Uso Humano de Referência)',
        dropletRatio: '1 mL = 40 gotas • 1 gota = exatamente 2,5 mg de tramadol',
        practicalRule: '0,8 gotas por kg de peso (na dose padrão de 2 mg/kg) ou 1 gota a cada 1,25 kg',
        note: 'O frasco de tramadol 100 mg/mL humano possui bico gotejador calibrado para 40 gotas por mL. Para felinos, nunca pingar as gotas puras na boca pelo amargor intenso; pingar as gotas dentro de uma cápsula gelatinosa vazia (nº 3 ou 4) imediatamente antes de oferecer ao animal.',
      },
    },

    genericBrandsNote:
      'O cloridrato de tramadol dispõe de linha veterinária consagrada com comprimidos palatáveis sulcados (Cronidor® 12, 40 e 80 mg - Agener União) e solução injetável 2% (20 mg/mL), dispensados sob notificação veterinária (MAPA). No mercado farmacêutico humano, é comercializado sob a marca de referência Tramal® (Grünenthal) e genéricos de diversos laboratórios (Teuto, Medley, EMS, Eurofarma, Hipolabor) em gotas 100 mg/mL, comprimidos/cápsulas de 50 mg e ampolas injetáveis de 50 mg/mL e 100 mg/2 mL, dispensados sob Receituário de Controle Especial em 2 vias (Portaria 344/98 - Lista C1).',

    references: [
      {
        id: 'ref-plumbs-10th-tramadol',
        citationText:
          'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th ed. Tramadol Hydrochloride monograph, pp. 1262-1264. Wiley-Blackwell; 2023.',
        sourceType: 'Formulário Farmacológico Padrão Ouro Internacional',
        url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119846222',
        evidenceLevel: 'Padrão Ouro Internacional',
      },
      {
        id: 'ref-bsava-10th-tramadol',
        citationText:
          'BSAVA Small Animal Formulary, 10th ed. Part A: Canine and Feline. Tramadol Hydrochloride monograph, pp. 411-412. British Small Animal Veterinary Association; 2020.',
        sourceType: 'Formulário Clínico Internacional BSAVA',
        url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
        evidenceLevel: 'Diretriz de Sociedade Especializada',
      },
      {
        id: 'ref-lumb-jones-6th-opioids',
        citationText:
          'Grimm KA, Lamont LA, Tranquilli WJ, Robertson SA, Musser M. Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Chapter 23: Opioids — Multitargeting molecules (Tramadol), pp. 400-401. Wiley-Blackwell; 2024.',
        sourceType: 'Tratado de Anestesiologia e Analgesia Veterinária',
        url: 'https://www.wiley.com/en-us/Veterinary+Anesthesia+and+Analgesia%3A+The+Sixth+Edition+of+Lumb+and+Jones-p-9781119777595',
        evidenceLevel: 'Tratado de Referência Global',
      },
      {
        id: 'ref-budsberg-2018-oa-dog',
        citationText:
          'Budsberg SC, Torres BT, Kleine SA, Sandberg GS, Berjeski AK. Lack of effectiveness of tramadol hydrochloride for the treatment of pain and joint dysfunction in dogs with osteoarthritis. J Am Vet Med Assoc. 2018;252(4):427-432. doi: 10.2460/javma.252.4.427.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego Controlado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29393736/',
        evidenceLevel: 'Nível 1a (Ensaio Clínico Cego e Cinética de Marcha)',
      },
      {
        id: 'ref-monteiro-2017-feline-oa',
        citationText:
          'Monteiro BP, Klinck MP, Moreau M, Guillot M, Steagall PV, Pelletier JP, Martel-Pelletier J, Gauvin D, Del Castillo JR. Analgesic efficacy of tramadol in cats with naturally occurring osteoarthritis: systematic review and clinical study. PLoS ONE. 2017;12(4):e0175565. doi: 10.1371/journal.pone.0175565.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego Cruzado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28403212/',
        evidenceLevel: 'Nível 1a (Acelerometria e Escores Validados)',
      },
      {
        id: 'ref-kukanich-papich-2004-dog-pk',
        citationText:
          'Kukanich B, Papich MG. Pharmacokinetics of tramadol and the metabolite O-desmethyltramadol in dogs. J Vet Pharmacol Ther. 2004;27(4):239-246. doi: 10.1111/j.1365-2885.2004.00578.x.',
        sourceType: 'Estudo Farmacocinético de Referência',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15305853/',
        evidenceLevel: 'Nível 1b (Farmacocinética HPLC)',
      },
      {
        id: 'ref-pypendop-ilkiw-2008-cat-pk',
        citationText:
          'Pypendop BH, Ilkiw JE. Pharmacokinetics of tramadol, and its metabolite O-desmethyl-tramadol, in cats. J Vet Pharmacol Ther. 2008;31(1):52-59. doi: 10.1111/j.1365-2885.2007.00922.x.',
        sourceType: 'Estudo Farmacocinético Felino de Referência',
        url: 'https://pubmed.ncbi.nlm.nih.gov/18179574/',
        evidenceLevel: 'Nível 1b (Farmacocinética HPLC)',
      },
      {
        id: 'ref-mastrocinque-2026-dipyrone-tramadol',
        citationText:
          'Mastrocinque S, et al. Multimodal analgesia with tramadol and dipyrone for soft tissue surgery in small animals: antinociceptive and sparing effects. Front Vet Sci. 2026;13:1204481.',
        sourceType: 'Ensaio Clínico de Analgesia Multimodal',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        evidenceLevel: 'Nível 1b (Ensaio Clínico Prospectivo)',
      },
      {
        id: 'ref-seddighi-2009-mac-tramadol',
        citationText:
          'Seddighi MR, Egger CM, Rohrbach BW, Cox SK, Doherty TJ. Effects of tramadol on the minimum alveolar concentration of sevoflurane in dogs. Vet Anaesth Analg. 2009;36(4):334-340. doi: 10.1111/j.1467-2995.2009.00468.x.',
        sourceType: 'Estudo Farmacodinâmico Anestésico',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19538466/',
        evidenceLevel: 'Nível 2a (Farmacodinâmica Anestésica)',
      },
      {
        id: 'ref-aaha-pain-guidelines',
        citationText:
          'Gruen ME, Lascelles BDX, Colleran E, Gottlieb A, Johnson J, Lotsikas P, Marcellin-Little D, Wright B. 2022 AAHA Pain Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2022;58(2):55-76. doi: 10.5326/JAAHA-MS-7292.',
        sourceType: 'Diretrizes Clínicas de Sociedade Internacional (AAHA)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35226750/',
        evidenceLevel: 'Consenso Internacional AAHA',
      },
      {
        id: 'ref-cronidor-agener',
        citationText:
          'Agener União Saúde Animal. Cronidor® (Cloridrato de Tramadol 12 mg, 40 mg, 80 mg e 2% injetável) — Bula técnica e registro MAPA nº 9.684/2011.',
        sourceType: 'Bula Oficial MAPA / Fabricante',
        url: 'https://agener.com.br/produtos/pequenos-animais/analgesicos-e-anti-inflamatorios/cronidor/',
        evidenceLevel: 'Registro Oficial MAPA',
      },
    ],

    relatedDiseaseSlugs: [
      'doenca-do-disco-intervertebral-caes',
      'doenca-do-disco-intervertebral-gatos',
    ],

    clinicalWarningItems: [
      {
        label: 'Via Intravenosa:',
        text: 'Administrar SEMPRE por infusão lenta (> 2 a 3 minutos). A injeção rápida provoca náusea, vômito, tremores e risco de convulsão. Diluir em SF 0,9% quando administração IV for necessária.',
      },
      {
        label: 'Síndrome Serotoninérgica:',
        text: 'NUNCA combinar tramadol com ISRS (fluoxetina, sertralina), IMAOs (selegilina) ou antidepressivos tricíclicos. A interação causa síndrome serotoninérgica potencialmente fatal com hipertermia, rigidez muscular, mioclonia e colapso cardiovascular.',
      },
      {
        label: 'Felinos — Encapsulamento Obrigatório:',
        text: 'O tramadol gotas é extremamente amargo. Em gatos, NUNCA pingar as gotas diretamente na boca. Pingar a dose em cápsula gelatinosa vazia (nº 3 ou 4) imediatamente antes de oferecer ao animal para evitar ptialismo espumoso severo e recusa alimentar.',
      },
    ],

    isControlled: true,
    isPublished: true,
    source: 'seed',
  },
];

export const tramadolMedicationRecord = tramadolMedicationsSeed[0];
