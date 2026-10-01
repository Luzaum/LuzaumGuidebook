import { MedicationRecord } from '../../types/medication';

export const amantadinaMedicationRecord: MedicationRecord = {
  id: 'med-amantadina',
  slug: 'amantadina',
  title: 'Amantadina (Cloridrato de Amantadina)',
  activeIngredient: 'Cloridrato de amantadina (1-aminoadamantano / adamantan-1-amina)',
  isControlled: true,
  tradeNames: [
    'Mantidan® 100 mg Comprimidos (Momenta Farmacêutica / Eurofarma — Referência Humana Extrabula)',
    'Cloridrato de Amantadina 100 mg Comprimidos (Genéricos Humanos Extrabula)',
    'Cloridrato de Amantadina Suspensão Oral 10 mg/mL Manipulada (Formulação Magistral Veterinária Palatável)',
    'Cloridrato de Amantadina Cápsulas Manipuladas 10 mg, 25 mg e 50 mg (Uso Magistral Veterinário)',
    'Symmetrel® 100 mg Cápsulas e Xarope 10 mg/mL (Referência Internacional Novartis / Endo)',
    'Gocovri® / Osmolex ER® Comprimidos de Liberação Prolongada (Uso Humano Internacional — NÃO Extrapolável para Veterinária)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/amantadine/PNG',
  pharmacologicClass:
    'Antagonista e modulador alostérico de baixa afinidade do canal receptor NMDA (gating antagonist); coanalgésico anti-hiperalgésico no tratamento multimodal da dor crônica e sensibilização central',
  species: ['dog', 'cat'],
  category: 'anestesia-dor',
  tags: [
    'Amantadina',
    'Cloridrato de Amantadina',
    'Mantidan',
    'Symmetrel',
    'Antagonista NMDA',
    'Modulador NMDA',
    'Gating Antagonist',
    'Dor Crônica',
    'Sensibilização Central',
    'Hiperalgesia',
    'Alodinia',
    'Wind-Up',
    'Osteoartrite Canina',
    'Osteoartrite Felina',
    'Dor Neuropática',
    'Estenose Lombossacral Degenerativa (DLSS)',
    'WSAVA 2022',
    'AAHA 2022',
    'Lista C1 (Portaria 344/98)',
    'Receita de Controle Especial 2 Vias',
  ],

  mechanismOfAction:
    'A amantadina (1-aminoadamantano) é um derivado sintético caracterizado por uma gaiola tridimensional hidrofóbica de adamantano ligada a um grupo amina primária de caráter básico. Farmacodinamicamente, atua como um antagonista não competitivo e modulador alostérico de baixa afinidade do complexo receptor-canal iônico de N-metil-D-aspartato (NMDA) ativado por glutamato e glicina no sistema nervoso central, sobretudo nos neurônios nociceptivos do corno dorsal da medula espinhal. Sob estimulação periférica contínua ou persistente decorrente de processos degenerativos articulares (osteoartrite) ou lesões nervosas crônicas, a liberação sustentada de glutamato e substância P por fibras C e A-delta induz despolarização pós-sináptica repetida mediada inicialmente por receptores AMPA. Essa despolarização sustentada remove o bloqueio fisiológico voltagem-dependente exercido pelo íon magnésio (Mg2+) no poro do canal NMDA. Com a desobstrução do poro, o glutamato promove abertura prolongada do receptor NMDA, gerando influxo maciço e patológico de íons cálcio (Ca2+) e sódio (Na+) para o meio intracelular. O aumento expressivo do cálcio citosólico desencadeia uma cascata enzimática pró-nociceptiva que ativa a proteína quinase C (PKC), a quinase dependente de cálcio-calmodulina II (CaMKII), a óxido nítrico sintase neuronal (nNOS) e as vias de sinalização MAPK/ERK, promovendo fosforilação de canais iônicos, aumento da eficácia sináptica e recrutamento de receptores adicionais para a membrana pós-sináptica. Esse fenômeno é a base fisiopatológica do "wind-up" e da sensibilização central duradoura, na qual o limiar de dor é drasticamente reduzido, convertendo estímulos fisiológicos inócuos em dor (alodinia) e amplificando desproporcionalmente a resposta a estímulos nociceptivos (hiperalgesia). Estudos eletrofisiológicos clássicos (Blanpied et al., 2005) demonstraram que a amantadina não atua meramente como um tampão estático do poro; ao contrário, comporta-se predominantemente como um antagonista de gating que acelera o fechamento do canal aberto e estabiliza conformações fechadas, diminuindo expressivamente o tempo em que o canal permanece funcionalmente condutivo. Por possuir baixa afinidade e cinética rápida de dissociação, a amantadina atenua seletivamente a hiperativação patológica do receptor NMDA sem obliterar a neurotransmissão fisiológica basal glutamatérgica necessária para memória e aprendizado, diferentemente de bloqueadores potentes de alta afinidade como a cetamina, evitando anestesia dissociativa, sedação profunda ou alucinações severas nas doses analgésicas recomendadas. Adicionalmente, a amantadina exibe propriedades dopaminérgicas secundárias (facilitação da liberação e inibição da recaptação de dopamina nos terminais pré-sinápticos centrais, mecanismo responsável por sua indicação histórica no Parkinson humano), atividade anticolinérgica fraca e efeitos serotoninérgicos in vitro, os quais podem contribuir para efeitos adversos em casos de superdosagem. Do ponto de vista estequiométrico, 1,24 mg de cloridrato de amantadina equivalem a aproximadamente 1,0 mg de amantadina base; todavia, as apresentações farmacêuticas e as diretrizes clínicas veterinárias expressam suas doses com base no sal (cloridrato), devendo a prescrição seguir o teor declarado do produto dispensado.',

  plainLanguageSummary:
    'A amantadina é um fármaco singular na medicina de pequenos animais, originalmente concebido como agente antiviral e antiparkinsoniano na medicina humana, que foi reposicionado com grande relevância na rotina veterinária moderna como um adjuvante coanalgésico para o manejo multimodal da dor crônica refratária e de estados dolorosos com sensibilização central em cães e gatos. Seu mecanismo de ação principal baseia-se no antagonismo e modulação de baixa afinidade dos receptores NMDA no corno dorsal da medula espinhal, atuando como um gating antagonist que acelera o fechamento do canal iônico ativado pelo glutamato sem causar o bloqueio dissociativo profundo característico da cetamina, reduzindo assim o influxo patológico de cálcio e diminuindo o ganho ou volume do amplificador central que mantém a dor amplificada na forma de hiperalgesia e alodinia. Na prática clínica, a amantadina não funciona como um analgésico convencional de alívio rápido para dores agudas ou fraturas, demandando um período de latência de 7 a 21 dias de terapia contínua para remodelar a excitabilidade neuronal e demonstrar benefício funcional mensurável, sendo indicada primariamente em cães com osteoartrite não controlada adequadamente apenas com anti-inflamatórios não esteroidais, em afecções com componente neuropático como a estenose lombossacral degenerativa e em felinos com doença articular crônica selecionados. Sua depuração depende quase que exclusivamente da excreção renal do fármaco inalterado por filtração glomerular e secreção tubular ativa, sem depender expressivamente do metabolismo hepático ou da glicuronidação felina, o que exige cautela primordial e ajuste posológico cuidadoso em pacientes nefropatas para evitar o acúmulo e manifestações de neurotoxicidade como agitação, tremores e mioclonias, exigindo no território brasileiro prescrição privativa sob Receita de Controle Especial em duas vias em razão do seu enquadramento na Lista C1 da Portaria 344/98.',

  pillars: [
    {
      title: 'Redução do Ganho Central & Modulação NMDA',
      icon: 'Brain',
      desc: 'Atua como gating antagonist de baixa afinidade no receptor NMDA, acelerando o fechamento do canal de cálcio e reduzindo o ganho do amplificador central na medula sem produzir anestesia dissociativa.',
    },
    {
      title: 'Terapia Multimodal & Sinergismo Analgésico',
      icon: 'Layers',
      desc: 'Combinação racional com AINEs periféricos (COX) e gabapentinoides pré-sinápticos (alfa-2-delta), atacando simultaneamente a geração, a liberação e a amplificação pós-sináptica da via dolorosa.',
    },
    {
      title: 'Janela de Latência Clínica & Remodelação (7 a 21 dias)',
      icon: 'Clock',
      desc: 'Não oferece analgesia imediata para dor aguda; o benefício clínico depende da reversão gradual da neuroplasticidade patológica, exigindo reavaliação entre 2 e 3 semanas de uso contínuo.',
    },
    {
      title: 'Depuração Renal Predominante & Cautela na DRC',
      icon: 'ShieldAlert',
      desc: 'Quase não sofre biotransformação hepática e independe de glicuronidação felina; a eliminação renal inalterada torna o rim o determinante crítico de acúmulo e neurotoxicidade.',
    },
  ],

  quickSummaryHighlights: [
    'Modulador alostérico e antagonista NMDA de baixa afinidade (gating antagonist); diminui o ganho excessivo do sistema nervoso central sem provocar anestesia dissociativa.',
    'Indicado no manejo multimodal da dor crônica com sensibilização central (osteoartrite refratária, dor neuropática, alodinia e hiperalgesia); não é analgésico agudo isolado.',
    'Regime clássico canino: 3 a 5 mg/kg VO a cada 24 horas (q24h); diretrizes contemporâneas WSAVA/AAHA aceitam 2 a 5 mg/kg VO q12-24h (estudos recentes demonstram eficácia com q12h em dor neuropática lombossacral).',
    'Em gatos com dor articular crônica, utilizar 2 a 5 mg/kg VO q24h (iniciar na faixa inferior de 2 mg/kg ou 1 a 4 mg/kg segundo BSAVA e titular); atentar para palatabilidade e sabor amargo da solução.',
    'Alerta Crítico: a dose de 14 mg/kg q24h publicada provém de um único relato de caso canino e NÃO deve ser adotada como posologia de rotina pelo risco toxicológico incerto.',
    'Eliminação quase inalterada pelos rins (pouco metabolismo hepático; independente de glicuronidação felina); nefropatas (DRC) exigem monitoramento rigoroso e redução de exposição.',
    'Uso antiviral histórico contra Influenza A em desuso e desaconselhado devido à resistência viral disseminada documentada até 2026.',
    'Medicamento de Controle Especial no Brasil: Lista C1 (Portaria SVS/MS nº 344/98), dispensado sob Receita de Controle Especial em 2 vias branca (validade 30 dias).',
  ],

  clinicalWarningItems: [
    {
      label: 'Alerta Posológico: A Dose de 14 mg/kg VO q24h é Relato de Caso Isolado e NÃO Recomendação Rotineira',
      text: 'A literatura veterinária e compêndios como o VIN registram a dose de 14 mg/kg VO q24h com base estrita em um único relato de caso de dor neuropática canina pós-trauma pélvico. Essa dosagem extrema não possui perfil de segurança estabelecido em estudos populacionais e pode precipitar manifestações graves de neurotoxicidade como agitação psicomotora, ataxia, tremores generalizados e convulsões. O ConsultaVET contraindica o emprego empírico de 14 mg/kg, recomendando manter a faixa terapêutica consolidada de 3 a 5 mg/kg q24h ou 3 mg/kg q12h.',
    },
    {
      label: 'Doença Renal Crônica (DRC) e Risco Grave de Neurotoxicidade por Acúmulo',
      text: 'A amantadina sofre metabolismo hepático desprezível (<10%) e é excretada majoritariamente inalterada por filtração glomerular e secreção tubular ativa. Em pacientes com redução da taxa de filtração glomerular (DRC Estágios IRIS 2 a 4 ou LRA), a depuração plasmática cai expressivamente e a meia-vida se prolonga, gerando acúmulo sistêmico e no SNC. Nesses pacientes, deve-se utilizar a extremidade inferior da dose, monitorar estritamente sinais de hiperexcitabilidade central e avaliar creatinina e SDMA antes e durante a terapia.',
    },
    {
      label: 'Inadequação Absoluta como Analgésico Isolado em Dor Aguda Intensa ou Trauma',
      text: 'A amantadina não possui potência analgésica direta comparável a opioides ou AINEs para bloquear nocicepção inflamatória aguda ou trauma tecidual recente (fraturas agudas, pós-operatório ortopédico imediato ou pancreatite). Seu papel exclusivo é modular a sensibilização central e o fenômeno de wind-up em protocolos multimodais. Suspender a terapia analgésica de base para prescrever amantadina isolada em dor aguda constitui erro técnico grave.',
    },
    {
      label: 'Uso Antiviral Histórico em Influenza e Risco de Resistência Farmacológica',
      text: 'Embora originalmente licenciada como inibidor do canal M2 da Influenza A, a amantadina apresenta resistência genética superior a 99% entre cepas virais de Influenza A humana e influenza canina H3N2 circulantes (documentada em estudos até 2026). O emprego empírico de amantadina como antiviral veterinário é clinicamente ineficaz, desaconselhado pelas autoridades de Saúde Única (CDC/OMS) e fomenta pressão seletiva sobre variantes virais.',
    },
  ],

  indications: [
    'Terapia adjuvante no manejo multimodal da dor crônica decorrente de osteoartrite e doença articular degenerativa refratária a AINEs em cães.',
    'Tratamento coadjuvante de afecções dolorosas crônicas com componente de dor neuropática, hiperalgesia e alodinia (estenose lombossacral degenerativa - DLSS, compressões radiculares).',
    'Prevenção e quebra do fenômeno de hiperexcitabilidade medular e "wind-up" em síndromes dolorosas crônicas ortopédicas ou oncológicas (ex: osteossarcoma).',
    'Tratamento adjuvante da osteoartrite e doença articular degenerativa crônica em felinos selecionados intolerantes a outros fármacos.',
    'Modulação de sensibilização central em dor oncológica e pós-amputação como parte de regime analgésico multimodal integrado.',
  ],

  contraindications: [
    'Hipersensibilidade conhecida à amantadina ou a qualquer componente da fórmula.',
    'Lesão renal aguda (LRA) e doença renal crônica em estágios finais (IRIS 4).',
    'Fêmeas gestantes ou lactantes (embriotoxicidade e excreção no leite materno).',
  ],

  cautions: [
    'Pacientes com doença renal crônica leve a moderada (IRIS 2 e 3): exige redução da dose e monitoramento renal estrito.',
    'Pacientes epilépticos ou com histórico de crises convulsivas (risco de redução do limiar epileptogênico).',
    'Cardiopatas com arritmias ventriculares ou prolongamento de intervalo QT.',
    'Evitar suspensão abrupta após uso prolongado (> 30 dias); desmamar ao longo de 1 a 2 semanas.',
  ],

  adverseEffects: [
    'Distúrbios gastrointestinais leves e autolimitados (êmese, fezes amolecidas, diarreia, flatulência e hiporexia).',
    'Agitação psicomotora, inquietação, hiperatividade e insônia.',
    'Ataxia, incoordenação motora e tremores musculares (especialmente em sobredosagem ou nefropatas).',
    'Sialorreia e salivação profusa em felinos pelo sabor intensamente amargo.',
  ],

  quickIndications: [
    {
      condition: 'Osteoartrite Canina Crônica Refratária a AINEs (Regime Clássico Lascelles 2008)',
      species: 'dog',
      doseSummary: '3,0 a 5,0 mg/kg VO a cada 24 horas (q24h), associada obrigatoriamente a um AINE (ex: meloxicam)',
      route: 'Oral (VO)',
      duration: 'Mínimo de 21 a 42 dias contínuos para avaliação de resposta clínica funcional',
      clinicalContext: 'Cães com claudicação e dor articular crônica que não atingem alívio suficiente com AINE isolado.',
    },
    {
      condition: 'Dor Crônica e Sensibilização Central em Cães (Diretrizes WSAVA / AAHA)',
      species: 'dog',
      doseSummary: '2,0 a 5,0 mg/kg VO a cada 12 a 24 horas (q12h ou q24h)',
      route: 'Oral (VO)',
      duration: 'Conforme evolução clínica e monitoramento de escores validados de dor (CBPI, LOAD)',
      clinicalContext: 'Manejo adjuvante multimodal em síndromes dolorosas complexas com alodinia e hiperalgesia.',
    },
    {
      condition: 'Dor Neuropática Canina / Estenose Lombossacral Degenerativa (Caterino et al. 2025)',
      species: 'dog',
      doseSummary: '3,0 mg/kg VO a cada 12 horas (q12h) em monoterapia OU 3,0 mg/kg VO q24h associada a meloxicam',
      route: 'Oral (VO)',
      duration: '21 dias consecutivos avaliados por análise objetiva em plataforma de força',
      clinicalContext: 'Cães de médio e grande porte com síndrome da cauda equina e compressão lombossacral.',
    },
    {
      condition: 'Osteoartrite e Dor Articular Crônica Felina (Shipley et al. 2021 / WSAVA 2022)',
      species: 'cat',
      doseSummary: '2,0 a 5,0 mg/kg VO a cada 24 horas (q24h); iniciar preferencialmente com 2 mg/kg e titular',
      route: 'Oral (VO em cápsula manipulada palatável)',
      duration: 'Pelo menos 21 dias (3 semanas) acompanhados por escore CSOM e avaliação do tutor',
      clinicalContext: 'Gatos com dificuldade de saltar e rigidez motora; monitorar função renal prévia.',
    },
    {
      condition: 'Prevenção e Tratamento do Fenômeno de Wind-Up / Dor Oncológica Óssea',
      species: 'both',
      doseSummary: '3,0 a 5,0 mg/kg VO a cada 12 a 24 horas (q12-24h) integrado a protocolo analgésico maior',
      route: 'Oral (VO)',
      duration: 'Uso continuado enquanto persistir o estímulo nociceptivo primário',
      clinicalContext: 'Pacientes com osteossarcoma, tumores invasivos ou dor neuropática pós-traumática.',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-amant-dog-oa-refractory',
      indication: 'Osteoartrite Canina Crônica Refratária a Anti-Inflamatórios Não Esteroidais',
      clinicalContext:
        'Cães com osteoartrite espontânea crônica moderada a severa que mantêm claudicação, relutância ao exercício ou alodinia periarticular a despeito de analgesia otimizada com AINEs.',
      species: 'dog',
      dose: '3,0 a 5,0 mg/kg (dose usual: 3 mg/kg) VO a cada 24 horas',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h) com pequena refeição',
      duration: 'Mínimo de 21 dias contínuos; reavaliar aos 42 dias segundo protocolo clínico consolidado',
      mechanismOfAction:
        'A inflamação sinovial prolongada e a destruição condral mantêm disparo nociceptivo contínuo que despolariza o corno dorsal da medula e recruta receptores NMDA. A amantadina bloqueia a amplificação pós-sináptica dependente de cálcio no corno dorsal, resgatando a eficácia funcional do AINE periférico.',
      clinicalRationale:
        'Demonstrada em ensaio clínico randomizado duplo-cego controlado por placebo (Lascelles et al., 2008), a adição de amantadina ao meloxicam resultou em melhora estatisticamente significativa nos escores de atividade física atribuídos pelos tutores no dia 42 (P = 0,030), comprovando que muitos cães refratários a AINE sofrem de sensibilização central concorrente.',
      monitoring: 'Escores funcionais de dor validados (CBPI ou LOAD), tolerabilidade gastrointestinal e função renal.',
      referenceIds: ['ref-lascelles-2008', 'ref-plumb-10', 'ref-wsava-pain-2022'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado por Placebo Duplo-Cego',
    },
    {
      id: 'ind-amant-dog-neuropathic-dlss',
      indication: 'Dor Neuropática em Cães com Estenose Lombossacral Degenerativa (DLSS)',
      clinicalContext:
        'Pacientes caninos com compressão de cauda equina, dor à palpação lombossacral, fraqueza em membros pélvicos e hiperpatia radicular.',
      species: 'dog',
      dose: '3,0 mg/kg VO a cada 12 horas (q12h) em monoterapia OU 3,0 mg/kg VO q24h associada a meloxicam',
      route: 'Oral (VO)',
      frequency: 'A cada 12 ou 24 horas',
      duration: '21 dias consecutivos com reavaliação de força biomecânica de apoio',
      mechanismOfAction:
        'A compressão crônica de raízes nervosas espinhais induz descargas ectópicas de fibras A-beta e C, recrutando receptores NMDA no corno dorsal. A amantadina acelera o fechamento do canal NMDA (gating antagonist), suprimindo os potenciais sinápticos excitatórios lentos geradores de hiperalgesia neuropática.',
      clinicalRationale:
        'Ensaio clínico contemporâneo (Caterino et al., 2025) avaliou cães com DLSS através de plataforma computadorizada de força, demonstrando que tanto a monoterapia com amantadina a 3 mg/kg q12h quanto a combinação de 3 mg/kg q24h com meloxicam geraram melhora altamente significativa no Pico de Força Vertical (PVF, P < 0,0001) e no Impulso Vertical (VI), confirmando ação analgésica objetiva em dor neuropática.',
      monitoring: 'Avaliação neurológica postural, dor à extensão lombossacral, deambulação e parâmetros renais.',
      referenceIds: ['ref-caterino-2025', 'ref-wsava-pain-2022'],
      evidenceLevel: 'Nível 2a — Ensaio Clínico Comparativo Prospectivo com Métricas Biomecânicas Objetivas',
    },
    {
      id: 'ind-amant-cat-osteoarthritis',
      indication: 'Doença Articular Degenerativa e Osteoartrite Crônica em Felinos',
      clinicalContext:
        'Gatos idosos ou de meia-idade com perda de mobilidade, relutância em saltar, alterações de grooming e desconforto ao manuseio musculoesquelético.',
      species: 'cat',
      dose: '2,0 a 5,0 mg/kg VO a cada 24 horas (iniciar com 2,0 a 3,0 mg/kg e titular; BSAVA cita 1 a 4 mg/kg)',
      route: 'Oral (VO manipulada em cápsulas pequenas palatáveis)',
      frequency: 'A cada 24 horas (q24h)',
      duration: 'Pelo menos 21 dias (3 semanas); titular dose mínima efetiva',
      mechanismOfAction:
        'Inibe a hiperexcitabilidade de neurônios nociceptivos espinhais secundária à artrose crônica, atenuando a dor articular mantida pela sensibilização medular.',
      clinicalRationale:
        'Shipley et al. (2021) demonstraram em estudo cruzado duplo-cego em 13 gatos com osteoartrite que a amantadina a 5 mg/kg q24h produziu melhora estatisticamente significativa nos escores de qualidade de vida e mobilidade avaliados pelos tutores através do questionário validado CSOM na 2ª e 3ª semanas.',
      monitoring:
        'Escore funcional felino (FMPI ou CSOM), capacidade de salto e interação, creatinina sérica, SDMA e densidade urinária para descartar acúmulo por DRC oculta.',
      referenceIds: ['ref-shipley-2021', 'ref-siao-2011', 'ref-wsava-pain-2022', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Cruzado Randomizado Duplo-Cego Controlado por Placebo',
    },
    {
      id: 'ind-amant-both-windup-cancer',
      indication: 'Prevenção e Modulação do Fenômeno de Wind-Up e Dor Oncológica Crônica',
      clinicalContext:
        'Pacientes caninos e felinos com osteossarcoma, sarcomas invasivos de tecidos moles ou lesões teciduais crônicas com dor refratária.',
      species: 'both',
      dose: '3,0 a 5,0 mg/kg VO a cada 12 a 24 horas',
      route: 'Oral (VO)',
      frequency: 'A cada 12 ou 24 horas',
      duration: 'Terapia contínua individualizada enquanto persistir o foco neoplásico',
      mechanismOfAction:
        'O microambiente tumoral secreta mediadores inflamatórios, NGF e proteases que geram nocicepção contínua e estimulação persistente de fibras C. O antagonismo NMDA bloqueia a plasticidade sináptica patológica e impede a expansão de campos receptivos medulares.',
      clinicalRationale:
        'Diretrizes internacionais de dor (WSAVA 2022 e AAHA 2022) recomendam o bloqueio NMDA oral como coadjuvante primordial em dor oncológica severa, permitindo efeito poupador de opioides e AINEs e mitigando a hiperpatia severa.',
      monitoring: 'Escores de conforto, tolerabilidade digestiva, ausência de sedação ou ataxia.',
      referenceIds: ['ref-wsava-pain-2022', 'ref-aaha-pain-2022', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2a — Diretrizes Internacionais de Consenso de Especialistas em Dor',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Apresenta absorção oral rápida, previsível e altamente eficiente em pequenos animais. Em cães hígidos (estudo com Greyhounds de Norkus et al., 2015), uma dose oral de ~2,8 mg/kg resultou em concentração plasmática de pico (Cmax) média de 275 ng/mL em 2,6 horas (Tmax variando entre 1 e 4 horas). Em felinos (Siao et al., 2011), a absorção gastrintestinal é igualmente notável, com Tmax médio de aproximadamente 2 horas e biodisponibilidade oral aparente de 130 ± 11% (valores superiores a 100% refletem variabilidade de modelos farmacocinéticos e comparações intraindividuais de AUC, expressando absorção praticamente total). A ingestão com alimento não prejudica clinicamente a extensão da biodisponibilidade e pode ser recomendada para amenizar náuseas e intolerância digestiva.',
    distribution:
      'A amantadina é uma base lipofílica fraca que apresenta volume de distribuição extremamente amplo e distribuição tecidual profunda. Em gatos, o volume de distribuição em estado de equilíbrio (Vdss) foi mensurado em 4,3 ± 0,2 L/kg; em cães, compêndios farmacológicos registram valores de até 7,46 L/kg. Atravessa prontamente a barreira hematoencefálica (BHE) graças à lipofilicidade de seu esqueleto adamantano, alcançando concentrações funcionais expressivas no parênquima cerebral e medular. A molécula exibe o fenômeno clássico de aprisionamento iônico (ion trapping) em compartimentos intracelulares ácidos: a fração não ionizada difunde-se passivamente através da membrana plasmática e dos lisossomos celulares; no ambiente intralisossomal ácido (pH 4,5-5,0), a amina protona-se intensamente, tornando-se impermeável à membrana e acumulando-se no interior das organelas em concentrações de 10 a 20 vezes superiores às plasmáticas.',
    metabolism:
      'Diferentemente da vasta maioria dos analgésicos e fármacos neurotrópicos, a amantadina sofre metabolismo hepático desprezível em cães e gatos. Em cães, apenas cerca de 10% da dose administrada é biotransformada em metabólitos secundários, primariamente a N-metilamantadina. A maior parte (>85-90%) permanece estritamente na forma da molécula parental inalterada. Em felinos, o fármaco independe das vias de glicuronidação (UGT) e das isoenzimas do citocromo P450 microssomal, contornando a vulnerabilidade constitucional clássica da espécie felina para metabolização de xenobióticos. Por essa razão, hepatopatias primárias isoladas têm impacto farmacocinético mínimo sobre sua depuração.',
    elimination:
      'A eliminação ocorre de maneira esmagadoramente predominante pelos rins, combinando filtração glomerular e secreção tubular ativa de amantadina inalterada na urina. Em felinos hígidos, a depuração plasmática sistêmica (clearance) é de cerca de 8,2 ± 2,1 mL/min/kg. A meia-vida de eliminação terminal (t1/2) é de aproximadamente 4,96 horas (~5 horas) em cães e de 5,4 a 5,8 horas em gatos. Em seres humanos, a t1/2 é muito mais longa (15 a 16 horas), o que gerou historicamente a transposição empírica equivocada de regimes a cada 24 horas para pequenos animais. Por ser eliminada inalterada pelos rins, a integridade da função renal é o principal fator limitante de sua segurança: pacientes com taxa de filtração glomerular reduzida apresentam queda severa de clearance, prolongamento da meia-vida e risco iminente de acúmulo sistêmico tóxico. A hemodiálise convencional não remove a amantadina eficientemente devido ao seu elevado volume de distribuição tecidual.',
    cnsPenetration:
      'Excelente penetração através da barreira hematoencefálica (BHE), atingindo concentrações terapêuticas rápidas no líquido cefalorraquidiano e no corno dorsal medular.',
    plasmaBinding:
      'A taxa de ligação a proteínas plasmáticas é descrita em torno de 67% na espécie humana; não existem dados espécie-específicos veterinários robustos validados em cães e gatos.',
    halfLife:
      'Aproximadamente 4,96 horas (~5 horas) em cães hígidos; aproximadamente 5,4 a 5,8 horas em gatos hígidos.',
  },

  attentionData: {
    precautions: [
      {
        condition: 'Doença Renal Crônica (DRC) e Lesão Renal Aguda (LRA)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A amantadina é eliminada essencialmente inalterada pelos rins. A queda da TFG e da secreção tubular ativa promove acúmulo do fármaco e níveis plasmáticos e cerebrais desproporcionalmente elevados.',
        clinicalAction:
          'Contraindicada em LRA e DRC em estágios finais (IRIS 4). Em DRC estágios 2 e 3, titular com extrema cautela, utilizando a menor dose da faixa e espaçando o intervalo com monitoramento estrito de creatinina, SDMA e sinais neurológicos.',
      },
      {
        condition: 'Epilepsia e Histórico de Crises Convulsivas',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A amantadina estimula a neurotransmissão dopaminérgica central e modula circuitos corticais, podendo reduzir o limiar epileptogênico e desencadear crises paroxísticas.',
        clinicalAction:
          'Usar com cautela em pacientes epilépticos ou em tratamento com outros fármacos pró-convulsivantes (ex: tramadol). Interromper imediatamente caso ocorram espasmos ou abalos musculares.',
      },
      {
        condition: 'Arritmias Cardíacas e Cardiopatias Significativas',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Em estudos experimentais com doses elevadas ou injeção parenteral rápida, a amantadina demonstrou potencial para prolongamento do intervalo QT e alterações eletrofisiológicas de condução.',
        clinicalAction:
          'Evitar em pacientes com arritmias ventriculares não controladas. Monitorar eletrocardiograma se associada a fármacos antiarrítmicos (sotalol, amiodarona).',
      },
      {
        condition: 'Suspensão Abrupta após Tratamento Prolongado',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A retirada súbita de antagonistas NMDA e moduladores dopaminérgicos após semanas de uso pode desencadear desregulação motora, hiperalgesia de rebote e agitação psicomotora.',
        clinicalAction:
          'Após terapias contínuas superiores a 30 dias, desmamar gradualmente ao longo de 1 a 2 semanas reduzindo a dose diária à metade antes da cessação definitiva.',
      },
      {
        condition: 'Gestação e Lactação',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Estudos experimentais em roedores evidenciaram embriotoxicidade, malformações ósseas e redução de peso fetal, além de excreção comprovada no leite materno.',
        clinicalAction:
          'Contraindicada em fêmeas gestantes ou lactantes. Empregar métodos analgésicos alternativos com perfil de segurança reprodutiva estabelecido.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Distúrbios Gastrointestinais (Vômitos, Diarreia, Fezes Amolecidas, Flatulência, Hiporexia)',
        frequency: 'common',
        mechanism:
          'Irritação direta da mucosa gástrica e modulação autonômica entérica dopaminérgica e colinérgica.',
        clinicalManagement:
          'Administrar sempre acompanhada de pequena porção de alimento. Se persistir ou houver êmese incoercível, reduzir a dose temporariamente ou suspender o fármaco.',
      },
      {
        effect: 'Inquietação Psicomotora, Agitação e Hiperexcitabilidade Central',
        frequency: 'uncommon',
        mechanism:
          'Aumento da liberação pré-sináptica de dopamina e inibição de sua recaptação neuronal no encéfalo.',
        clinicalManagement:
          'Geralmente ocorre no início da terapia ou em doses superiores a 5 mg/kg. Reavaliar a posologia e certificar-se de que a função renal está preservada.',
      },
      {
        effect: 'Ataxia, Tremores Musculares e Mioclonias',
        frequency: 'uncommon',
        mechanism:
          'Hiperestimulação motora dopaminérgica e interferência em circuitos interneuronais espinhais.',
        clinicalManagement:
          'Reduzir a dose à metade ou suspender temporariamente; checar creatinina sérica para descartar retenção tóxica por insuficiência renal.',
      },
      {
        effect: 'Sinais Anticolinérgicos (Boca Seca, Midríase, Constipação e Retenção Urinária)',
        frequency: 'rare',
        mechanism:
          'Atividade antagonista muscarínica fraca inerente à estrutura molecular dos adamantanos.',
        clinicalManagement:
          'Monitorar micção e defecação, especialmente em gatos idosos e machos caninos com prostatopatias.',
      },
      {
        effect: 'Neurotoxicose Grave e Crises Convulsivas (Superdosagem ou Nefropatia Avançada)',
        frequency: 'overdose',
        mechanism:
          'Excesso de estimulação central, falência de tamponamento celular e acúmulo intracelular maciço.',
        clinicalManagement:
          'Hospitalização imediata, suporte ventilatório, controle de convulsões com benzodiazepínicos e consideração de terapia com emulsão lipídica intravenosa (ILE 20%).',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica Estágio IRIS 2 (Creatinina 1,4–2,8 mg/dL em cão; 1,6–2,8 mg/dL em gato)',
        recommendedAdjustment:
          'Iniciar na extremidade inferior da faixa (2,0 a 3,0 mg/kg VO q24h) e monitorar rigorosamente.',
        physiologicalRationale:
          'A redução de 30% a 50% na taxa de filtração glomerular prolonga a meia-vida do fármaco inalterado.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Estágio IRIS 3 (Creatinina 2,9–5,0 mg/dL)',
        recommendedAdjustment:
          'Reduzir a dose em 50% ou aumentar o intervalo para a cada 48 horas (q48h) de forma individualizada.',
        physiologicalRationale:
          'O clearance renal cai drasticamente, elevando o risco de acúmulo sérico e toxicidade neurológica.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Estágio IRIS 4 ou Lesão Renal Aguda (LRA)',
        recommendedAdjustment:
          'Evitar o uso de amantadina; preferir modalidades analgésicas sem dependência renal exclusiva.',
        physiologicalRationale:
          'A incapacidade excretora renal promove retenção maciça da amantadina com risco iminente de neurotoxicidade.',
      },
      {
        clinicalCondition: 'Pacientes Geriátricos com Polifarmácia e Fraqueza Motora',
        recommendedAdjustment:
          'Iniciar com dose teste de 2,0 mg/kg q24h por 7 dias antes de avançar para doses plenas.',
        physiologicalRationale:
          'Idosos possuem menor reserva funcional renal subclínica e maior susceptibilidade a ataxia e sedação.',
      },
      {
        clinicalCondition: 'Obesidade Severa (Escore de Condição Corporal 8/9 ou 9/9)',
        recommendedAdjustment:
          'Calcular a dose com base no peso magro estimado (peso ideal) e não no peso balança excessivo.',
        physiologicalRationale:
          'O cálculo linear em animais gravemente obesos pode gerar superdosagem absoluta desnecessária.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Sulfametoxazol + Trimetoprima (TMP-SMX) e Sulfadiazina',
        severity: 'major',
        clinicalEffect:
          'Queda na excreção renal de amantadina, elevação sérica substancial e risco de neurotoxicidade.',
        pharmacologicalMechanism:
          'O trimetoprim compete ativamente e inibe o sistema de transporte carreador de secreção tubular renal de bases orgânicas compartilhado pela amantadina.',
      },
      {
        drugOrClass: 'Triamtereno e Diuréticos Poupadores de Potássio',
        severity: 'major',
        clinicalEffect: 'Redução do clearance renal de amantadina e aumento significativo de eventos adversos centrais.',
        pharmacologicalMechanism:
          'Competição competitiva pelo transporte tubular renal proximal excretor.',
      },
      {
        drugOrClass: 'Alcalinizantes Urinários (Citrato de Potássio, Bicarbonato de Sódio)',
        severity: 'moderate',
        clinicalEffect: 'Aumento da concentração plasmática de amantadina e prolongamento de sua ação.',
        pharmacologicalMechanism:
          'A urina alcalina favorece a fração não ionizada lipofílica da amantadina no néfron, estimulando sua reabsorção tubular passiva.',
      },
      {
        drugOrClass: 'Fármacos Anticolinérgicos (Atropina, Glicopirrolato, Oxibutinina, Difenidramina)',
        severity: 'moderate',
        clinicalEffect: 'Exacerbação de efeitos anticolinérgicos (boca seca, retenção urinária, midríase, constipação e taquicardia).',
        pharmacologicalMechanism:
          'Somação dos efeitos antimuscarínicos intrínsecos de ambos os medicamentos.',
      },
      {
        drugOrClass: 'Antidepressivos Tricíclicos (Amitriptilina, Clomipramina)',
        severity: 'moderate',
        clinicalEffect: 'Aumento de excitabilidade motora central e potencialização de sinais anticolinérgicos.',
        pharmacologicalMechanism:
          'Potencialização mútua de neurotransmissão monoaminérgica central e efeitos antimuscarínicos.',
      },
      {
        drugOrClass: 'Tramadol',
        severity: 'moderate',
        clinicalEffect: 'Possível redução adicional do limiar convulsivo em animais predispostos ou com overdose.',
        pharmacologicalMechanism:
          'Sinergismo em vias estimulatórias monoaminérgicas e inibição da recaptação central.',
      },
      {
        drugOrClass: 'Fármacos que Prolongam o Intervalo QT (Sotalol, Amiodarona, Cisaprida)',
        severity: 'moderate',
        clinicalEffect: 'Maior probabilidade de desenvolvimento de arritmias ventriculares complexas.',
        pharmacologicalMechanism:
          'Somação de efeitos eletrofisiológicos desfavoráveis sobre os canais de potássio miocárdicos.',
      },
      {
        drugOrClass: 'Anti-Inflamatórios Não Esteroidais (Meloxicam, Carprofeno, Firocoxib)',
        severity: 'minor',
        clinicalEffect: 'Potencialização benéfica da analgesia (sinergismo terapêutico multimodal consolidado).',
        pharmacologicalMechanism:
          'Ação periférica inibindo prostaglandinas combinada à ação central da amantadina modulando receptores NMDA.',
      },
      {
        drugOrClass: 'Gabapentinoides (Gabapentina, Pregabalina)',
        severity: 'minor',
        clinicalEffect: 'Excelente sinergismo multimodal no manejo de dor neuropática crônica.',
        pharmacologicalMechanism:
          'Gabapentinoides diminuem a liberação pré-sináptica de glutamato, enquanto a amantadina reduz a amplificação pós-sináptica.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Uso predominantemente ambulatorial por via oral; não existem formulações parenterais padronizadas para infusão contínua em cães e gatos com dor.',
      ],
      incompatibleFluids: [
        'Soluções orais com pH excessivamente alcalino que possam precipitar o cloridrato básico.',
      ],
      infusionRateGuidance:
        'Não recomendada por via intravenosa ou CRI para analgesia em cães e gatos na rotina clínica. Quando for necessário bloqueio parenteral de receptores NMDA em ambiente hospitalar intensivo, utilizar cetamina IV em infusão contínua, amplamente validada por literatura e diretrizes da WSAVA.',
      preparationNotes:
        'Para pacientes de pequeno porte e gatos, prescrever formulação magistral veterinária líquida a 10 mg/mL ou cápsulas com dosagens individuais adequadas (5 mg, 10 mg, 15 mg, 25 mg), evitando fracionamentos grosseiros de comprimidos humanos de 100 mg que comprometem a precisão posológica.',
      storageRequirements:
        'Conservar os comprimidos, cápsulas e soluções orais manipuladas em temperatura ambiente entre 15°C e 30°C, protegidos da luz e da umidade.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO) — Via de Escolha Clínica',
        technique:
          'Administrar os comprimidos ou cápsulas manipuladas diretamente na boca ou envolvidos em petisco ou pequena refeição para minimizar desconforto digestivo.',
        nursingCare:
          'Orientar o tutor a manter a administração em horários regulares e nunca suspender abruptamente após semanas de tratamento. Registrar qualquer náusea ou diarreia.',
        limitations:
          'A solução oral líquida manipulada sem aromatização adequada possui sabor intensamente amargo, podendo provocar sialorreia profusa, aversão e estresse em felinos.',
      },
      {
        route: 'Intravenosa (IV) / CRI — Não Padronizada na Dor',
        technique:
          'A via intravenosa não possui protocolos de infusão contínua (CRI) padronizados e seguros para analgesia em pequenos animais.',
        nursingCare:
          'Caso utilizada experimentalmente em UTI, exige acesso venoso exclusivo e monitoramento eletrocardiográfico rigoroso.',
        limitations:
          'Injeções rápidas podem deflagrar arritmias e hipotensão arterial; para bloqueio NMDA hospitalar em dor intensa, a cetamina IV contínua é o padrão-ouro de escolha.',
      },
      {
        route: 'Intramuscular (IM) e Subcutânea (SC)',
        technique:
          'Não recomendadas na rotina de pequenos animais.',
        nursingCare:
          'Inexistência de dados farmacocinéticos e de segurança que respaldem vias parenterais extravasculares para amantadina.',
        limitations:
          'Risco de irritação tecidual local, absorção errática e ausência de formulações veterinárias injetáveis registradas.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Derivado do Adamantano (1-aminoadamantano tricíclico)',
      chemicalClassDescription:
        'Hidrocarboneto policíclico em gaiola tridimensional rígida com fórmula molecular C10H17N (base, 151,25 g/mol) e C10H18ClN (cloridrato, 187,71 g/mol), caracterizado por elevada lipofilicidade de esqueleto e grupo amina protonável básico (pKa ~10,6).',
      therapeuticClass: 'Coanalgésico Adjuvante Anti-hiperalgésico e Modulador NMDA de Baixa Afinidade',
      therapeuticClassDescription:
        'Modulador de receptores NMDA com ação anti-hiperalgésica e antialodínica comprovada no tratamento da sensibilização central em dor crônica, associado a efeitos secundários dopaminérgicos.',
      atcCode: 'N04BB01',
      receptorTargets: [
        'Complexo Receptor-Canal NMDA (Subunidades GluN1/GluN2)',
        'Terminais Dopaminérgicos Pré-sinápticos Centrais',
        'Receptores Colinérgicos Muscarínicos (Afinidade Fraca)',
      ],
      receptorsAndSites: [
        {
          name: 'Poro do Canal Iônico do Receptor NMDA',
          type: 'Canal de cátions divalentes (cálcio e sódio) permeável e voltagem-dependente',
          action: 'Antagonismo não competitivo de baixa afinidade com aceleração do fechamento (gating antagonist)',
          clinicalEffect:
            'Atenuação da cascata de fosforilação intracelular de PKC e CaMKII, reduzindo o fenômeno de wind-up e a sensibilização central sem produzir anestesia dissociativa.',
        },
        {
          name: 'Transportador e Receptores Dopaminérgicos Centrais',
          type: 'Terminais dopaminérgicos nos núcleos da base e estriado',
          action: 'Estímulo da liberação pré-sináptica e inibição discreta da recaptação de dopamina',
          clinicalEffect:
            'Melhora de acinesia e rigidez em Parkinson humano; em animais, pode responder por inquietação motora e agitação em doses elevadas.',
        },
      ],
      detailedTargets: [
        {
          target: 'Receptor NMDA Ativado no Corno Dorsal da Medula',
          action: 'Aceleração do fechamento e bloqueio de baixa afinidade',
          clinicalSignificance:
            'Alívio da hiperalgesia e da alodinia em cães e gatos com dor crônica osteoartrítica ou neuropática refratária.',
        },
        {
          target: 'Proteína Viral M2 de Influenza A',
          action: 'Bloqueio do canal de prótons viral no endossomo (Alvo Histórico)',
          clinicalSignificance:
            'Mecanismo antiviral original do fármaco; atualmente obsoleto devido à resistência viral disseminada (>99%) documentada até 2026.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receita de Controle Especial em 2 Vias (Lista C1 - Outras substâncias sujeitas a controle especial)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 1.036/2026',
      retentionRequired: true,
      guidelines:
        'A amantadina é uma substância sujeita a controle especial classificada na Lista C1 da Portaria 344/98 da ANVISA. Deve ser prescrita privativamente por médico-veterinário devidamente inscrito no CRMV em formulário de Receita de Controle Especial em duas (2) vias brancas. A primeira via destina-se à retenção obrigatória pela farmácia comercial ou de manipulação no ato da dispensação, e a segunda via é carimbada e devolvida ao tutor para acompanhamento posológico. A receita possui prazo de validade de trinta (30) dias a partir da data de emissão em todo o território nacional. Pela regra geral da Lista C1 a quantidade máxima permitida corresponde a até 60 dias de tratamento; entretanto, a Portaria 344/98 prevê expressamente que medicamentos de uso antiparkinsoniano e anticonvulsivante (categoria na qual a amantadina se insere na farmacopeia humana oficial) podem ser dispensados para até seis (6) meses (180 dias) de tratamento. Desde 18 de maio de 2026, é obrigatória a conformidade com as novas diretrizes físicas versão 2 do receituário da ANVISA.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Meia-Vida Curta (~5 h), Latência de Ação e Racional Emergente de q12h em Dor Neuropática',
        description:
          'Em cães, a meia-vida é relativamente curta (~4,96 horas), o que gerou debates quanto ao intervalo ideal. O estudo clássico de Lascelles (2008) estabeleceu o regime de 3 a 5 mg/kg q24h associado a meloxicam para osteoartrite, demonstrando que a quebra da sensibilização central exige pelo menos 21 dias contínuos. Recentemente, ensaio clínico biomecânico de Caterino et al. (2025) demonstrou que 3 mg/kg q12h como monoterapia em cães com estenose lombossacral degenerativa (DLSS) promoveu melhora expressiva em plataforma de força, fornecendo respaldo clínico contemporâneo para a frequência q12h em casos selecionados com componente neuropático intenso. Não há evidência de susceptibilidade ligada à mutação ABCB1 (MDR1).',
        clinicalImplications:
          'Em cães com osteoartrite, o regime de 3 a 5 mg/kg q24h é a conduta padrão; em dores neuropáticas e compressões espinhais, o regime de 3 mg/kg q12h surge como alternativa clinicamente viável.',
      },
      {
        species: 'cat',
        title: 'Alta Biodisponibilidade, Independência de Glicuronidação e Desafio da Palatabilidade',
        description:
          'Gatos absorvem a amantadina de forma excelente (biodisponibilidade aparente ~130%), com meia-vida de 5,4 a 5,8 horas. Como sua depuração é quase exclusivamente renal inalterada, o fármaco não depende da via deficiente de glicuroniltransferase (UGT) felina, constituindo uma opção valiosa em felinos que não toleram outros medicamentos. Contudo, gatos geriátricos com osteoartrite frequentemente apresentam doença renal crônica oculta, exigindo rastreio de creatinina e SDMA para evitar acúmulo. Ademais, o cloridrato de amantadina tem sabor extremamente amargo; soluções orais manipuladas não palatáveis provocam hipersialorreia profusa e estresse acentuado na espécie.',
        clinicalImplications:
          'Prescrever amantadina para felinos preferencialmente em cápsulas gelatinosas pequenas manipuladas de 5 mg ou 10 mg para administração direta com petisco úmido. Iniciar com 2 mg/kg q24h e titular.',
      },
    ],

    curiositiesAndHistory: [
      'A amantadina foi sintetizada nos laboratórios da DuPont na década de 1960 e aprovada pela FDA em 1966 como agente antiviral preventivo contra a Influenza A asiática, bloqueando o canal de prótons M2 do virion.',
      'Sua eficácia contra o mal de Parkinson foi descoberta por puro acaso em 1968, quando uma mulher idosa parkinsoniana tomou o fármaco para se proteger da gripe e percebeu uma melhora dramática e inesperada em sua rigidez motora e tremores.',
      'No final da década de 1990 e anos 2000, pesquisas de neurociência desvendaram seu potente efeito modulador sobre os receptores NMDA da medula espinhal, culminando na publicação pioneira de Lascelles et al. (2008) na medicina veterinária.',
      'O termo "adamantano" provém do vocábulo grego "adamas" (diamante, indomável), porque os átomos de carbono de sua estrutura rígida em gaiola tricíclica replicam exatamente a simetria tetraédrica espacial do cristal de diamante.',
      'Na prática analgésica moderna, é carinhosamente tratada como uma espécie de "cetamina por via oral", pois modula o mesmo alvo medular da cetamina para silenciar o wind-up, mas com perfil de baixa afinidade que permite uso domiciliar crônico e seguro sem provocar alucinações ou anestesia.',
      'Em 2026, mais de 99% das linhagens circulantes do vírus da gripe apresentam mutações genéticas no canal M2 que conferem resistência aos adamantanos, sepultando definitivamente seu uso antiviral e consagrando seu papel como coanalgésico multimodal.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Dose Usual de Manutenção: 3,0 mg/kg a 5,0 mg/kg VO a cada 24 horas (ou a cada 12 horas em dor neuropática selecionada). Para cães com menos de 10 kg e gatos, prescrever formulação magistral veterinária (cápsulas personalizadas ou suspensão palatável de 10 mg/mL); o comprimido comercial humano de 100 mg (Mantidan®) só permite partição aceitável em animais acima de 15 a 20 kg.',
    headers: [
      'Peso Corporal (kg)',
      'Dose 3,0 mg/kg (mg)',
      'Volume Suspensão 10 mg/mL (3 mg/kg)',
      'Dose 5,0 mg/kg (mg)',
      'Volume Suspensão 10 mg/mL (5 mg/kg)',
      'Comprimido 100 mg (Mantidan®)',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '6,0 mg',
        col1: '0,6 mL',
        col2: '10,0 mg',
        col3: '1,0 mL',
        col4: 'Impraticável (manipular cápsula de 6 mg ou líquido)',
      },
      {
        weight: '4 kg',
        totalDose: '12,0 mg',
        col1: '1,2 mL',
        col2: '20,0 mg',
        col3: '2,0 mL',
        col4: 'Impraticável (manipular cápsula de 12–20 mg)',
      },
      {
        weight: '5 kg',
        totalDose: '15,0 mg',
        col1: '1,5 mL',
        col2: '25,0 mg',
        col3: '2,5 mL',
        col4: '1/4 de comp. (25 mg) somente para dose de 5 mg/kg',
      },
      {
        weight: '10 kg',
        totalDose: '30,0 mg',
        col1: '3,0 mL',
        col2: '50,0 mg',
        col3: '5,0 mL',
        col4: '1/2 comprimido (50 mg) para dose de 5 mg/kg',
      },
      {
        weight: '15 kg',
        totalDose: '45,0 mg',
        col1: '4,5 mL',
        col2: '75,0 mg',
        col3: '7,5 mL',
        col4: '1/2 comp. (~45 mg a 3 mg/kg) ou 3/4 comp. (75 mg)',
      },
      {
        weight: '20 kg',
        totalDose: '60,0 mg',
        col1: '6,0 mL',
        col2: '100,0 mg',
        col3: '10,0 mL',
        col4: '1 comprimido inteiro de 100 mg (para 5 mg/kg)',
      },
      {
        weight: '30 kg',
        totalDose: '90,0 mg',
        col1: '9,0 mL',
        col2: '150,0 mg',
        col3: '15,0 mL',
        col4: '1 comp. (~90 mg a 3 mg/kg) ou 1 e 1/2 comp. (150 mg)',
      },
      {
        weight: '40 kg',
        totalDose: '120,0 mg',
        col1: '12,0 mL',
        col2: '200,0 mg',
        col3: '20,0 mL',
        col4: '2 comprimidos inteiros de 100 mg (para 5 mg/kg)',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador de Suspensão Oral Manipulada (10 mg/mL)',
      concentration: '10 mg por mL (formulação magistral palatável veterinária)',
      dropletRatio: '1 mL = 10 mg de amantadina cloridrato',
      practicalRule:
        'Para a dose de 3,0 mg/kg: administrar exatamente 0,3 mL por kg de peso corporal. Para a dose de 5,0 mg/kg: administrar exatamente 0,5 mL por kg de peso corporal.',
      note: 'Ideal para gatos e cães com menos de 10 kg, permitindo ajuste fino sem os riscos de fragmentação irregular de comprimidos sólidos.',
    },
  },

  samplePrescriptionText: `RECEITA DE CONTROLE ESPECIAL — 2 VIAS
(Portaria SVS/MS nº 344/1998 — Lista C1 | RDC ANVISA nº 1.036/2026)

Paciente: Thor | Espécie: Canina | Raça: Labrador Retriever | Idade: 9 anos | Peso: 20 kg
Tutor: Carlos Eduardo da Silva | CPF: 123.456.789-00
Endereço: Rua das Palmeiras, 150 — São Paulo/SP

USO VETERINÁRIO EXTRA-LABEL AMBULATORIAL (VIA ORAL)

1. Mantidan® 100 mg (Cloridrato de Amantadina) --------------------------- 1 caixa com 30 comprimidos
   Princípio ativo: Cloridrato de amantadina 100 mg por comprimido
   Apresentação: Comprimidos de uso humano (Momenta Farmacêutica / Eurofarma)
   Posologia: Administrar um (1) comprimido de 100 mg por via oral a cada 24 horas (q24h), no mesmo horário, preferencialmente fornecido logo após pequena refeição, durante 30 dias consecutivos.

ORIENTAÇÕES ESPECÍFICAS AO RESPONSÁVEL:
1. Finalidade: Este medicamento atua no sistema nervoso central para reduzir a hipersensibilidade e a amplificação da dor crônica (sensibilização central), funcionando como adjuvante ao tratamento da osteoartrite.
2. Tempo para início de efeito: A amantadina NÃO é um analgésico de efeito imediato; sua ação benéfica decorre da remodelação dos circuitos de dor e manifesta-se tipicamente após 7 a 21 dias de tratamento ininterrupto. Não interrompa o uso nos primeiros dias sob a impressão de ausência de resposta.
3. Modo de administração: Administrar juntamente com alimento úmido para prevenir náuseas ou fezes amolecidas. Nunca fracionar comprimidos sem vinco adequado.
4. Sinais de atenção: Comunicar imediatamente ao médico-veterinário caso o animal apresente agitação motora extrema, inquietação incomum, tremores musculares generalizados, dificuldade de caminhar (ataxia) ou vômitos persistentes.
5. Manter fora do alcance de crianças e animais domésticos. Armazenar em local seco, fresco e protegido da luz solar direta.

Retorno e Reavaliação: Retorno ambulatorial agendado para 21 a 30 dias após o início para avaliação funcional com questionário CBPI e checagem de parâmetros renais séricos.

São Paulo, 28 de setembro de 2026.

___________________________________________________________
Dr. Roberto Menezes de Oliveira — Médico-Veterinário
CRMV-SP nº 24.580 | Telefone: (11) 98765-4321`,

  clinicalNotesRichText: `
<h3>1. Fisiologia Aprofundada da Sensibilização Central e do Fenômeno de Wind-Up</h3>
<p>Na fisiologia da dor articular ou somática aguda normal, a ativação de nociceptores periféricos por estímulos químicos inflamatórios (prostaglandinas, bradicinina, citocinas e fator de crescimento neural - NGF) gera potenciais de ação que trafegam pelas fibras aferentes primárias C e A-delta até as lâminas I, II e V do corno dorsal da medula espinhal. Nos terminais pré-sinápticos medulares, esses impulsos desencadeiam a exocitose de neurotransmissores excitatórios, primariamente glutamato, substância P e peptídeo relacionado ao gene da calcitonina (CGRP). Em condições basais, o glutamato liberado liga-se quase que exclusivamente a receptores ionotrópicos não-NMDA do tipo AMPA (ácido alfa-amino-3-hidroxi-5-metil-4-isoxazolpropiônico) e cainato na membrana pós-sináptica, promovendo despolarizações rápidas, efêmeras e proporcionais à intensidade do estímulo através do influxo de íons sódio (Na+). O complexo receptor-canal de N-metil-D-aspartato (NMDA) permanece funcionalmente inativo e silenciado durante essa sinalização fisiológica de rotina devido ao bloqueio eletrostático exercido pelo íon magnésio extracelular (Mg2+), que fica fisicamente ancorado no poro do canal em potenciais de membrana de repouso normais (-70 mV).</p>
<p>Contudo, na presença de afecções dolorosas crônicas graves — exemplificadas pela osteoartrite refratária de longa data, compressões radiculares por estenose lombossacral ou processos neoplásicos invasivos —, os nociceptores periféricos sustentam uma salva contínua e repetitiva de potenciais de ação de alta frequência sobre a medula espinhal. A estimulação repetitiva de receptores AMPA e receptores neurocinínicos NK1 pela substância P produz despolarização pós-sináptica duradoura e cumulativa. Quando a membrana pós-sináptica atinge potenciais mais positivos (-30 a -20 mV), a repulsão eletrostática força a ejeção física do íon magnésio (Mg2+) para fora do poro do canal NMDA. Livre do bloqueio de magnésio, o canal NMDA passa a ser avidamente ativado pela ligação cooperativa de glutamato e de seu coagonista endógeno obrigatório, a glicina.</p>
<p>A abertura do canal NMDA possui repercussões biológicas devastadoras sobre a neurofisiologia espinhal: sua condutância para cátions divalentes, em especial o cálcio (Ca2+), é extraordinariamente elevada. O influxo maciço de cálcio citosólico atua como um potente segundo mensageiro intracelular, ativando cascatas enzimáticas pró-nociceptivas dependentes de cálcio, com destaque para a proteína quinase C (PKC), a quinase dependente de cálcio-calmodulina II (CaMKII), a fosfolipase A2 (PLA2) e a óxido nítrico sintase neuronal (nNOS). A PKC fosforila resíduos serina/treonina nas subunidades GluN1 e GluN2 dos receptores NMDA e GluA1 dos receptores AMPA, promovendo o tráfico e a ancoragem de novos receptores na densidade pós-sináptica e reduzindo drasticamente a dependência de voltagem do bloqueio de magnésio residual. Concomitantemente, a ativação da nNOS gera óxido nítrico (NO), um gás lipofílico difusível que viaja retrogradamente através da fenda sináptica até o terminal pré-sináptico, ativando a guanilato ciclase e amplificando ainda mais a exocitose de glutamato. Esse circuito de retroalimentação positiva é a gênese do fenômeno de <em>wind-up</em> (aumento progressivo na frequência de disparos dos neurônios de ampla faixa dinâmica durante estimulações repetidas de fibras C) e culmina na <strong>sensibilização central</strong>: os neurônios do corno dorsal passam a manifestar limiares de excitação patologicamente baixos, campos receptivos aumentados e atividade espontânea independente do estímulo periférico primário, gerando hiperalgesia secundária (dor desproporcional a estímulos nociceptivos moderados) e alodinia (dor desencadeada por estímulos mecânicos inócuos, como um toque leve ou movimento articular suave).</p>

<h3>2. Mecanismo Farmacodinâmico Molecular: O Papel da Amantadina como Gating Antagonist</h3>
<p>A amantadina é frequentemente descrita de forma genérica nos livros didáticos como um "antagonista do receptor NMDA". No entanto, a elucidação biofísica detalhada conduzida por Blanpied, Clarke e Johnson (Journal of Neuroscience, 2005) revelou características farmacodinâmicas moleculares singulares que diferenciam radicalmente a amantadina de outros bloqueadores sintéticos. Os autores demonstraram que a amantadina comporta-se como um <strong>antagonista de baixa afinidade, voltagem-dependente e não competitivo que atua primariamente sobre o gating do canal iônico</strong>.</p>
<p>Ao penetrar no poro condutivo de um canal NMDA aberto na membrana pós-sináptica, a amantadina estabelece interações eletrostáticas transitórias. Diferentemente de bloqueadores potentes de alta afinidade (como dizocilpina/MK-801) que ocluem permanentemente o poro gerando bloqueios irreversíveis que paralisam a neurotransmissão fisiológica, a amantadina possui cinética de ligação e dissociação extremamente rápida. Em concentrações terapêuticas clinicamente relevantes, sua ação primordial não é simplesmente fechar fisicamente o poro como uma rolha estática, mas sim acelerar acentuadamente o fechamento intrínseco das comportas do canal (gating closure) e estabilizar estados conformacionais fechados inativos. Dessa forma, a amantadina reduz significativamente o tempo médio durante o qual o receptor NMDA permanece em estado aberto permeável ao cálcio. Essa propriedade farmacológica permite atenuar seletivamente a hiperativação sustentada e patológica gerada pela tempestade de glutamato da dor crônica, enquanto permite que transmissões sinápticas fisiológicas transitórias normais (essenciais para plasticidade neural basal, cognição e memória) continuem ocorrendo. É exatamente essa sutileza molecular que confere à amantadina sua ampla margem de segurança clínica por via oral ambulatorial, permitindo modular a dor crônica em cães e gatos sem deflagrar os efeitos anestésicos dissociativos profundos, disfóricos ou catalépticos observados com a cetamina ou a fenciclidina.</p>

<h3>3. Farmacocinética Comparada em Cães e Gatos e a Controvérsia Posológica (q24h versus q12h)</h3>
<p>A história da dosagem da amantadina na medicina veterinária é um exemplo clássico da transposição histórica de regimes empíricos baseados em farmacologia humana antes da consolidação de estudos farmacocinéticos robustos nas espécies-alvo. Em seres humanos, a amantadina possui uma meia-vida de eliminação plasmática extremamente prolongada, oscilando entre 15 e 16 horas em pacientes jovens e podendo ultrapassar 24 a 30 horas em idosos, sustentando perfeitamente administrações em dose única diária (q24h).</p>
<p>Entretanto, os estudos farmacocinéticos contemporâneos conduzidos em pequenos animais revelaram um perfil biológico muito mais dinâmico:
<ul>
  <li><strong>Espécie Canina (Norkus et al., 2015):</strong> Em ensaio farmacocinético rigoroso avaliando cães Greyhounds hígidos que receberam dose oral única de ~2,8 mg/kg, observou-se absorção oral célere com Cmax média de 275 ng/mL em 2,6 horas (Tmax de 1 a 4 horas). A meia-vida de eliminação terminal (t1/2) foi mensurada em 4,96 horas (~5 horas).</li>
  <li><strong>Espécie Felina (Siao et al., 2011):</strong> Em estudo cruzado com seis gatas hígidas recebendo 5 mg/kg de cloridrato de amantadina (equivalente a 4 mg/kg de base) por via IV e oral, a biodisponibilidade oral aparente foi de 130 ± 11% com Tmax de 2,0 ± 0,6 horas. O volume de distribuição no estado de equilíbrio (Vdss) foi de 4,3 ± 0,2 L/kg, o clearance sistêmico foi de 8,2 ± 2,1 mL/min/kg e a meia-vida terminal foi de aproximadamente 5,4 a 5,8 horas.</li>
</ul>
Do ponto de vista puramente matemático e farmacocinético, se um fármaco possui meia-vida de 5 horas, ao cabo de 24 horas transcorreram quase 5 meias-vidas (24 / 5 = 4,8), momento no qual resta teoricamente menos de 3% a 4% da concentração plasmática de pico. Essa discrepância levou diversos farmacologistas a questionarem a racionalidade do intervalo de 24 horas (q24h) e a postularem que administrações a cada 12 horas (q12h) seriam farmacocineticamente mais adequadas para manter níveis terapêuticos estáveis.</p>
<p>Contudo, a farmacodinâmica dos moduladores neuroplásticos do receptor NMDA não é estritamente reflexo da concentração plasmática instantânea em tempo real:
<ol>
  <li><strong>Remodelação e Fenômeno Pós-Antagonismo:</strong> A modulação do NMDA e a interrupção periódica da cascata de fosforilação de PKC desaceleram a neuroplasticidade patológica medular por horas além do clareamento plasmático do fármaco.</li>
  <li><strong>Evidência Clínica de Eficácia Histórica:</strong> O maior ensaio clínico controlado por placebo de dor crônica por osteoartrite canina da história da veterinária (Lascelles et al., 2008) utilizou rigorosamente o regime de 3 a 5 mg/kg VO a cada 24 horas (q24h), demonstrando eficácia clínica robusta e estatisticamente significativa no dia 42.</li>
  <li><strong>Evidência Biomecânica Contemporânea para q12h (Caterino et al., 2025):</strong> Em contrapartida, em cães portadores de dor neuropática grave secundária à estenose lombossacral degenerativa (DLSS), o ensaio clínico prospectivo de Caterino et al. (2025) avaliou cães recebendo amantadina a 3 mg/kg q12h como monoterapia e demonstrou melhora expressiva e objetiva das forças de reação ao solo em plataforma de força após 21 dias.</li>
</ol>
Portanto, a conduta editorial do ConsultaVET sintetiza essa controvérsia de maneira clara e baseada em evidências: o regime de <strong>3 a 5 mg/kg VO q24h</strong> permanece como o protocolo padrão com maior lastro histórico e comodidade posológica para osteoartrite crônica; enquanto o regime de <strong>2 a 5 mg/kg VO q12h</strong> (preconizado pelas diretrizes da WSAVA 2022 e respaldado pelo estudo DLSS de 2025) possui forte racional farmacocinético e eficácia comprovada em síndromes dolorosas com forte componente neuropático e refratariedade clínica.</p>

<h3>4. Alerta Editorial Crítico: A Dose de 14 mg/kg VO q24h e o Risco de Erro de Prescrição</h3>
<p>Diversos compêndios clínicos e bancos de dados veterinários (incluindo o VIN Veterinary Drug Handbook) incluem em suas tabelas de dosagem para dor neuropática crônica a cifra extrema de <strong>14 mg/kg VO q24h</strong>. É dever técnico fundamental alertar os prescritores sobre a origem dessa posologia: ela provém estritamente de um <em>único relato de caso anedótico</em> (n=1) de um cão com dor neuropática crônica intratável após fraturas pélvicas complexas, no qual o clínico assistente titulou experimentalmente o fármaco até atingir essa dosagem elevada em combinação com meloxicam. Embora tenha havido remissão de sinais nesse paciente específico, <em>a segurança, a toxicocinética e a tolerabilidade de doses tão altas nunca foram estabelecidas em ensaios clínicos populacionais</em>. Administrar 14 mg/kg aproxima-se perigosamente de patamares experimentais históricos nos quais cães passaram a manifestar hiperestesia, mioclonias e sinais evidentes de estimulação neurotóxica central (descritos em estudos a partir de 37 mg/kg). O estudo prospectivo de 2025 (Caterino et al.) comprovou que doses muito mais seguras de 3 mg/kg a cada 12 horas promovem melhora objetiva mensurável sem expor o paciente a tais riscos toxicológicos. Por esse motivo, o ConsultaVET classifica formalmente 14 mg/kg como uma dose histórica de relato de caso e contraindica seu emprego como prescrição de rotina.</p>

<h3>5. Evidência Clínica em Felinos: O Paradoxo do Estudo de Shipley et al. (2021)</h3>
<p>O emprego da amantadina em felinos com osteoartrite e doença articular degenerativa é respaldado principalmente pelo ensaio clínico pioneiro de Shipley et al. (2021), publicado no Journal of Feline Medicine and Surgery. O estudo avaliou 13 gatos com diagnóstico clínico e radiográfico de osteoartrite em desenho cruzado, duplo-cego e controlado por placebo, administrando 5 mg/kg VO q24h durante 21 dias. Os resultados trouxeram uma constatação metodológica fascinante:
<ul>
  <li><strong>Avaliação Subjetiva do Tutor (CSOM):</strong> Os escores de mobilidade, facilidade de saltar e qualidade de vida geral mensurados pelo questionário validado <em>Client-Specific Outcome Measures</em> (CSOM) apresentaram melhora estatisticamente muito significativa na 2ª e na 3ª semanas de tratamento com amantadina em comparação ao placebo (CSOM médio de 3 ± 1 versus 5 ± 2).</li>
  <li><strong>Mensuração Objetiva por Acelerometria:</strong> Paradoxalmente, os dados objetivos coletados por colares com acelerômetros demonstraram que a contagem de atividade motora total diária dos gatos que receberam amantadina foi <em>menor</em> do que no período em que receberam placebo (240.537 ± 53.880 versus 326.032 ± 91.759 contagens).</li>
</ul>
Especialistas em dor felina interpretam essa aparente discrepância não como falha terapêutica, mas como reflexo da qualidade do movimento: animais com alívio do desconforto articular crônico podem exibir comportamento mais tranquilo, relaxado e confortável no ambiente domiciliar, diminuindo a movimentação inquieta gerada pela dor, ou apresentarem discreta sedação/calmaria central dopaminérgica. Esse estudo consolida que a amantadina traz benefício perceptível ao bem-estar felino, recomendando-se iniciar com doses mais conservadoras (2 a 3 mg/kg q24h) e titular conforme resposta e tolerabilidade.</p>

<h3>6. Depuração Renal Exclusiva, Estadiamento IRIS e Monitoramento Clínico</h3>
<p>Diferentemente da grande maioria dos fármacos analgésicos que sofrem extensivo metabolismo de fase I e fase II no fígado, a amantadina é depurada praticamente inalterada pelo sistema renal através de filtração glomerular e secreção tubular ativa. Essa característica representa uma enorme vantagem farmacológica para pacientes com disfunção hepática pura, mas impõe alerta de segurança absoluto em pacientes nefropatas. Não existem tabelas veterinárias validadas por ensaios prospectivos que definam reduções matemáticas fixas de dose por estágio IRIS (como "reduzir 25% no estágio 2" ou "reduzir 50% no estágio 3"). O consenso de especialistas e formulários como Plumb's e BSAVA orientam conduta cautelosa e individualizada:
<ul>
  <li><strong>Estágio IRIS 1:</strong> Utilizar posologia habitual (3 mg/kg VO q24h); monitorar proteinúria e densidade urinária.</li>
  <li><strong>Estágio IRIS 2:</strong> Iniciar rigorosamente na faixa inferior da dose (2 mg/kg VO q24h); monitorar creatinina e SDMA seriados.</li>
  <li><strong>Estágio IRIS 3:</strong> Risco muito elevado de acúmulo sistêmico; individualizar a terapia com redução de dose diária e ampliação de intervalo (ex: q36h a q48h), pesando criteriosamente benefício versus risco e observando atentamente sinais precoces de neurotoxicidade motora.</li>
  <li><strong>Estágio IRIS 4 e LRA:</strong> Uso contraindicado devido à retenção tóxica grave e ausência de mecanismos compensatórios de depuração.</li>
</ul>
Como osteoartrite e doença renal crônica frequentemente coexistem no paciente geriátrico canino e felino, a realização de exames renais (creatinina, ureia, SDMA e urinálise) é obrigatória antes da introdução da amantadina e periodicamente ao longo da terapia crônica.</p>

<h3>7. Desuso Contemporâneo como Antiviral e Alerta de Saúde Única</h3>
<p>O VIN Veterinary Drug Handbook ainda lista a amantadina na dose de 3 a 5 mg/kg q24h para o tratamento e prevenção de infecções por Influenza A em cães e gatos. É fundamental contextualizar historicamente essa menção: a amantadina inibe o canal iônico transmembrana formado pela proteína M2 do envelope do vírus Influenza A, impedindo o influxo de prótons para o interior do virion durante a endocitose ácida no hospedeiro, bloqueando assim a dissociação das ribonucleoproteínas virais e a replicação do genoma de RNA. Contudo, nas últimas duas décadas, o uso massivo e indiscriminado de adamantanos na produção avícola e na medicina humana gerou uma pressão seletiva global devastadora, selecionando mutações pontuais no gene M (especialmente a mutação S31N na proteína M2). Em 2026, as diretrizes de vigilância epidemiológica do CDC e da OMS registram índices de resistência aos adamantanos superiores a 99% em linhagens circulantes de Influenza A. Mais grave ainda, estudos genômicos veterinários recentes identificaram cepas de influenza canina H3N2 que adquiriram resistência total à amantadina por recombinação do segmento genético M. Por essas razões, o emprego empírico de amantadina como antiviral na rotina veterinária é considerado obsoleto, clinicamente ineficaz e frontalmente contrário aos princípios internacionais de Saúde Única (One Health).</p>

<h3>8. Toxicologia, Superdosagem Acidental e o Papel Emergente da Emulsão Lipídica Intravenosa (ILE 20%)</h3>
<p>A amantadina não possui antídoto farmacológico específico competitivo disponível. Os sinais clínicos de superdosagem aguda decorrem da exacerbação de seus efeitos dopaminérgicos centrais, interferência motora e discreta atividade antimuscarínica, manifestando-se por tremores musculares difusos, inquietação intensa, hiperestesia, ataxia proprioceptiva, nistagmo (frequentemente vertical), midríase, taquicardia, convulsões e desorientação sensorial grave. Estudos toxicológicos históricos em cães registraram manifestações neurológicas a partir de 37 mg/kg e letalidade em 93 mg/kg.</p>
<p>Em 2025, Hogberg, Marshall e Vardanega publicaram um marco na toxicologia veterinária (Veterinary Medicine and Science) relatando a intoxicação acidental grave de um cão da raça Cristado Chinês de 4,9 kg que ingeriu inadvertidamente 43,5 mg/kg de amantadina oral. Em menos de 60 minutos o paciente apresentou tremores intensos generalizados, hiperestesia tátil, nistagmo vertical espontâneo e agitação refratários à administração inicial de metocarbamol. A equipe médica instituiu então a terapia com <strong>Emulsão Lipídica Intravenosa a 20% (ILE)</strong>, administrando um bólus inicial de 1,5 mL/kg IV ao longo de 1 minuto, seguido de infusão contínua de 0,25 mL/kg/minuto durante 45 minutos. O paciente apresentou remissão clínica completa dos tremores, alinhamento dos eixos oculares e recuperação integral sem sequelas nas horas subsequentes. Devido ao esqueleto adamantano lipofílico da molécula (XlogP ~2,4), a ILE atua criando uma "pia lipídica" (lipid sink) no compartimento intravascular que sequestra as moléculas livres de amantadina da circulação e dos tecidos alvos cerebrais, emergindo como uma ferramenta terapêutica de resgate promissora em intoxicações agudas potencialmente letais. Ressalta-se que a hemodiálise convencional não é eficaz para depurar a amantadina devido ao seu volume de distribuição tecidual gigantesco (>4 a 7 L/kg).</p>

<h3>9. Aspectos Regulatórios e Prescrição no Brasil (Portaria 344/98 e Novas Regras ANVISA 2026)</h3>
<p>No Brasil, a amantadina é uma substância expressamente controlada pela Portaria SVS/MS nº 344/1998, inserida na <strong>Lista C1 (Outras substâncias sujeitas a controle especial)</strong>, atualizada pela Resolução da Diretoria Colegiada RDC ANVISA nº 1.036/2026. A dispensação do produto de uso humano comercial (como o Mantidan® da Momenta/Eurofarma) ou de formulações magistrais veterinárias exige obrigatoriamente a emissão de <strong>Receita de Controle Especial em duas vias (papel branco)</strong>:
<ul>
  <li><strong>1ª Via (Retenção da Farmácia):</strong> Fica arquivada no estabelecimento farmacêutico para escrituração no Sistema Nacional de Gerenciamento de Produtos Controlados (SNGPC).</li>
  <li><strong>2ª Via (Orientação do Paciente):</strong> É carimbada pelo farmacêutico dispensador e devolvida ao tutor para acompanhamento das instruções posológicas.</li>
  <li><strong>Validade da Receita:</strong> Trinta (30) dias corridos a partir da data de sua emissão pelo médico-veterinário em todo o território nacional.</li>
  <li><strong>Quantidade Permitida e Exceção Antiparkinsoniana:</strong> A regra geral para medicamentos da Lista C1 limita a prescrição a até 60 dias de tratamento. No entanto, a própria Portaria 344/98 estabelece exceção explícita de até 6 meses (180 dias) para substâncias com indicação oficial de antiparkinsonianos ou anticonvulsivantes (categoria oficial da amantadina).</li>
  <li><strong>Padronização Física 2026:</strong> Desde 18 de maio de 2026, estão em vigor os novos formulários físicos versão 2 padronizados pela ANVISA para prescrição de medicamentos controlados.</li>
</ul>
</p>
`,

  references: [
    {
      id: 'ref-lascelles-2008',
      citationText:
        'Lascelles BDX, Gaynor JS, Smith ES, et al. Amantadine in a multimodal analgesic regimen for alleviation of refractory osteoarthritis pain in dogs. J Vet Intern Med. 2008;22(1):53-59. doi:10.1111/j.1939-1676.2007.0014.x. PMID: 18289289.',
      sourceType: 'Ensaio clínico randomizado controlado por placebo duplo-cego',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18289289/',
      notes: 'Estudo clássico de referência comprovando benefício de 3-5 mg/kg q24h com meloxicam na OA canina refratária aos 42 dias.',
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Duplo-Cego Controlado por Placebo',
    },
    {
      id: 'ref-caterino-2025',
      citationText:
        'Caterino C, Della Valle G, Aragosa F, et al. Amantadine as a therapeutic option for neuropathic pain in dogs with degenerative lumbosacral stenosis. BMC Vet Res. 2025;21:469. doi:10.1186/s12917-025-04911-9. PMID: 40671053.',
      sourceType: 'Ensaio clínico prospectivo randomizado com placa de força',
      url: 'https://bmcvetres.biomedcentral.com/counter/pdf/10.1186/s12917-025-04911-9.pdf',
      notes: 'Avaliação biomecânica objetiva em DLSS canina demonstrando melhora em PVF e VI com 3 mg/kg q12h em monoterapia e 3 mg/kg q24h combinada com meloxicam.',
      evidenceLevel: 'Nível 2a — Estudo Prospectivo Controlado com Métricas Biomecânicas Objetivas',
    },
    {
      id: 'ref-shipley-2021',
      citationText:
        'Shipley H, Flynn K, Tucker L, et al. Owner evaluation of quality of life and mobility in osteoarthritic cats treated with amantadine or placebo. J Feline Med Surg. 2021;23(6):568-574. doi:10.1177/1098612X20967639. PMID: 33112193.',
      sourceType: 'Ensaio clínico randomizado cruzado controlado por placebo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33112193/',
      notes: 'Estudo em 13 gatos com OA demonstrando melhora estatística em escores CSOM com 5 mg/kg q24h na 2ª e 3ª semanas.',
      evidenceLevel: 'Nível 1b — Ensaio Clínico Cruzado Randomizado Duplo-Cego',
    },
    {
      id: 'ref-norkus-2015',
      citationText:
        'Norkus C, Rankin D, Warner M, KuKanich B. Pharmacokinetics of oral amantadine in greyhound dogs. J Vet Pharmacol Ther. 2015;38(3):305-308. doi:10.1111/jvp.12190. PMID: 25427541.',
      sourceType: 'Estudo farmacocinético prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25427541/',
      notes: 'Demonstrou t1/2 de ~4,96h, Tmax de 2,6h e Cmax de 275 ng/mL em Greyhounds saudáveis.',
      evidenceLevel: 'Nível 2b — Estudo Farmacocinético Experimental em Espécie-Alvo',
    },
    {
      id: 'ref-siao-2011',
      citationText:
        'Siao KT, Pypendop BH, Stanley SD, Ilkiw JE. Pharmacokinetics of amantadine in cats. J Vet Pharmacol Ther. 2011;34(6):599-604. doi:10.1111/j.1365-2885.2011.01278.x. PMID: 21323678.',
      sourceType: 'Estudo farmacocinético cruzado IV e Oral',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21323678/',
      notes: 'Mapeamento PK felino demonstrando biodisponibilidade aparente ~130%, Vdss ~4,3 L/kg, clearance ~8,2 mL/min/kg e t1/2 de 5,4 a 5,8 horas.',
      evidenceLevel: 'Nível 2b — Estudo Farmacocinético Laboratorial em Felinos',
    },
    {
      id: 'ref-blanpied-2005',
      citationText:
        'Blanpied TA, Clarke RJ, Johnson JW. Amantadine inhibits NMDA receptors by accelerating channel closure during channel block. J Neurosci. 2005;25(13):3312-3322. doi:10.1523/JNEUROSCI.4262-04.2005. PMID: 15800186.',
      sourceType: 'Estudo de eletrofisiologia e biofísica molecular',
      url: 'https://pubmed.ncbi.nlm.nih.gov/15800186/',
      notes: 'Elucidação do mecanismo de gating antagonist de baixa afinidade da amantadina sobre receptores NMDA.',
      evidenceLevel: 'Nível 3 — Pesquisa Básica Experimental Farmacodinâmica',
    },
    {
      id: 'ref-hogberg-2025',
      citationText:
        'Hogberg B, Marshall K, Vardanega M. Successful Treatment With Intravenous Lipid Emulsion of Accidental Amantadine Overdose: A Case Report. Vet Med Sci. 2025;11(3):e70402. doi:10.1002/vms3.70402. PMID: 40359215.',
      sourceType: 'Relato de caso clínico toxicológico com intervenção terapêutica',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40359215/',
      notes: 'Reversão de neurotoxicose aguda grave (43,5 mg/kg) com emulsão lipídica a 20% (bólu 1,5 mL/kg + 0,25 mL/kg/min por 45 min).',
      evidenceLevel: 'Nível 4 — Relato de Caso Clínico com Desfecho Favorável',
    },
    {
      id: 'ref-wsava-pain-2022',
      citationText:
        'Monteiro BP, Lascelles BDX, Murrell J, Robertson S, Steagall PVM, Wright B. 2022 WSAVA Guidelines for the Recognition, Assessment and Treatment of Pain. J Small Anim Pract. 2023;64(4):177-254. doi:10.1111/jsap.13566.',
      sourceType: 'Diretriz internacional de consenso de especialistas',
      url: 'https://wsava.org/wp-content/uploads/2023/08/Portugues_2022-WSAVA-Diretrizes-de-dor.pdf',
      notes: 'Consenso mundial que recomenda amantadina para dor crônica/neuropática com faixa de 2 a 5 mg/kg q12-24h em cães e gatos.',
      evidenceLevel: 'Nível 1a — Consenso Internacional de Especialistas',
    },
    {
      id: 'ref-aaha-pain-2022',
      citationText:
        'Gruen ME, Lascelles BDX, Colleran E, et al. 2022 AAHA Pain Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2022;58(2):55-76. doi:10.5326/JAAHA-MS-7292.',
      sourceType: 'Diretriz de consenso clínico',
      url: 'https://www.aaha.org/resources/2022-aaha-pain-management-guidelines-for-dogs-and-cats/',
      notes: 'Diretrizes da AAHA que abordam a amantadina como antagonista NMDA oral útil em dor crônica e discutem o racional de q12h.',
      evidenceLevel: 'Nível 1a — Consenso de Sociedade Médica Veterinária',
    },
    {
      id: 'ref-plumb-10',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux / Wiley-Blackwell; 2023. Monografia “Amantadine”, pp. 46-48. ISBN 9781394172207.',
      sourceType: 'Compêndio farmacológico veterinário terciário',
      url: null,
      notes: 'Monografia revisada abordando doses de 3-5 mg/kg q24h, racional PK de q12h e advertências sobre DRC e equivalência base/sal.',
      evidenceLevel: 'Nível 2a — Referência Terciária Consolidada',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'Ramsey I, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia “Amantadine”, p. 15.',
      sourceType: 'Formulário farmacológico veterinário',
      url: null,
      notes: 'Monografia do BSAVA com posologia canina de 3-5 mg/kg q24h e felina de 1-4 mg/kg q24h com recomendação de titulação cuidadosa.',
      evidenceLevel: 'Nível 2a — Compêndio Farmacológico Britânico',
    },
    {
      id: 'ref-vin-2025',
      citationText:
        'Veterinary Information Network. VIN Veterinary Drug Handbook — Amantadine. Davis, CA: VIN; revisado em 27/08/2025.',
      sourceType: 'Compêndio digital especializado',
      url: 'https://www.vin.com/',
      notes: 'Compilação de dados clínicos, relatos de caso e parâmetros de segurança utilizados como base de análise crítica.',
      evidenceLevel: 'Nível 2b — Base de Dados Especializada Revisada por Pares',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'amantadina-foundation-oa-evidence',
      title: 'Evidência Científica Consolidada na Osteoartrite Canina Refratária a AINEs',
      narrative:
        'A osteoartrite é uma afecção degenerativa crônica que afeta a totalidade da estrutura articular e induz sensibilização medular profunda quando não controlada em longo prazo. O estudo histórico de Lascelles et al. (2008) constitui o ensaio clínico pivotal que inaugurou o emprego sistemático da amantadina na medicina veterinária. Ao avaliar 31 cães com dor articular crônica não responsiva a meloxicam isolado, a introdução de amantadina a 3–5 mg/kg q24h demonstrou benefício significativo após 21 a 42 dias de tratamento contínuo, comprovando que a quebra da neuroplasticidade do corno dorsal exige tempo biológico e sinergismo farmacológico entre AINEs periféricos e antagonistas NMDA centrais.',
      narrativeHighlights: [
        'Ensaio Clínico Duplo-Cego Randomizado Controlado por Placebo (Lascelles et al., 2008)',
        '31 cães com claudicação e dor articular refratária ao meloxicam',
        'Melhora estatisticamente significativa nos escores de atividade no dia 42 (P = 0,030)',
        'Comprova que a resposta analgésica requer de 3 a 6 semanas de tratamento ininterrupto',
      ],
      referenceIds: ['ref-lascelles-2008', 'ref-plumb-10', 'ref-wsava-pain-2022'],
      studies: [
        {
          citation:
            'Lascelles BDX, Gaynor JS, Smith ES, et al. Amantadine in a multimodal analgesic regimen for alleviation of refractory osteoarthritis pain in dogs. J Vet Intern Med. 2008;22:53-59.',
          referenceId: 'ref-lascelles-2008',
          sourceType: 'Ensaio Clínico Randomizado Duplo-Cego',
          summaryText:
            'Trinta e um cães com osteoartrite crônica de membro pélvico e dor refratária a AINE receberam meloxicam associado a amantadina (3 a 5 mg/kg q24h) ou placebo. No dia 42, os cães tratados com amantadina exibiram melhora funcional estatisticamente superior aos controles (P = 0,030) na escala avaliada pelos tutores.',
          summaryHighlights: ['P = 0,030 no dia 42', 'Eficácia como adjuvante ao meloxicam', 'Necessidade de terapia mantida'],
          metrics: ['n = 31 cães', 'Dose: 3 a 5 mg/kg VO q24h', 'Duração: 42 dias'],
          clinicalConclusion:
            'A amantadina atua como um coadjuvante multimodal efetivo para restaurar a função em cães com osteoartrite que apresentam resposta inadequada ao AINE isolado.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/18289289/',
        },
      ],
    },
    {
      id: 'amantadina-foundation-neuropathic-dlss',
      title: 'Eficácia em Dor Neuropática Canina e Estenose Lombossacral Degenerativa (2025)',
      narrative:
        'A compressão crônica das raízes nervosas de cauda equina na estenose lombossacral degenerativa (DLSS) é uma causa clássica de dor neuropática severa em cães. O ensaio clínico publicado por Caterino et al. (BMC Veterinary Research, 2025) trouxe evidência contemporânea altamente relevante ao comparar o regime combinado clássico (amantadina 3 mg/kg q24h + meloxicam) com monoterapia de amantadina a 3 mg/kg q12h por 21 dias em 20 cães avaliados objetivamente por plataforma de força biomecânica. Ambos os grupos apresentaram elevação altamente significativa do Pico de Força Vertical (PVF) e do Impulso Vertical (VI), fornecendo sustentação objetiva tanto para o sinergismo com AINEs quanto para o racional farmacocinético de administrações a cada 12 horas em afecções neuropáticas.',
      narrativeHighlights: [
        'Ensaio Clínico Prospectivo Randomizado com Análise em Plataforma de Força (Caterino et al., 2025)',
        '20 cães com DLSS e dor neuropática crônica confirmada',
        'Aumento expressivo do Pico de Força Vertical em ambos os grupos (P < 0,0001)',
        'Demonstra atividade clínica objetiva do regime de 3 mg/kg a cada 12 horas',
      ],
      referenceIds: ['ref-caterino-2025', 'ref-wsava-pain-2022'],
      studies: [
        {
          citation:
            'Caterino C, Della Valle G, Aragosa F, et al. Amantadine as a therapeutic option for neuropathic pain in dogs with degenerative lumbosacral stenosis. BMC Vet Res. 2025;21:469.',
          referenceId: 'ref-caterino-2025',
          sourceType: 'Ensaio Clínico Biomecânico Prospectivo',
          summaryText:
            'Vinte cães com DLSS foram randomizados para receber amantadina 3 mg/kg q24h + meloxicam ou amantadina 3 mg/kg q12h isoladamente durante 21 dias. Ambos os regimes produziram aumento altamente significativo das variáveis de força de apoio no membro afetado (PVF: P < 0,0001; VI: P = 0,0023 a 0,0064).',
          summaryHighlights: ['PVF P < 0,0001', 'VI P < 0,01', 'Suporte biomecânico a q12h'],
          metrics: ['n = 20 cães', 'Dose: 3 mg/kg q12h ou 3 mg/kg q24h', 'Duração: 21 dias'],
          clinicalConclusion:
            'A amantadina demonstra atividade clínica própria mensurável em dor neuropática por DLSS, sustentando posologias de 3 mg/kg a cada 12 horas em pacientes selecionados.',
          url: 'https://bmcvetres.biomedcentral.com/counter/pdf/10.1186/s12917-025-04911-9.pdf',
        },
      ],
    },
    {
      id: 'amantadina-foundation-feline-oa',
      title: 'Manejo da Osteoartrite Felina e Avaliação Subjetiva versus Objetiva',
      narrative:
        'A osteoartrite atinge mais de 90% dos gatos com mais de 12 anos de idade, mas seu diagnóstico e avaliação terapêutica são notavelmente complexos. O ensaio clínico cruzado duplo-cego de Shipley et al. (2021) em 13 felinos tratados com amantadina a 5 mg/kg q24h revelou que os tutores observaram melhora estatisticamente consistente de qualidade de vida e capacidade motora através do questionário CSOM. Concomitantemente, a contagem de atividade por acelerômetro registrou menor atividade bruta total nos gatos medicados, fenômeno interpretado como maior conforto e relaxamento do animal em repouso. O perfil de excreção renal inalterada sem dependência de glicuronidação é uma enorme fortaleza farmacológica no gato, embora exija exclusão ativa de DRC concomitante.',
      narrativeHighlights: [
        'Ensaio Clínico Cruzado Duplo-Cego Randomizado Controlado por Placebo (Shipley et al., 2021)',
        '13 gatos com osteoartrite crônica confirmada',
        'Melhora estatisticamente significativa nos escores de mobilidade CSOM nas semanas 2 e 3',
        'Segurança favorável sem dependência da glicuronidação felina deficiente',
      ],
      referenceIds: ['ref-shipley-2021', 'ref-siao-2011', 'ref-wsava-pain-2022'],
      studies: [
        {
          citation:
            'Shipley H, Flynn K, Tucker L, et al. Owner evaluation of quality of life and mobility in osteoarthritic cats treated with amantadine or placebo. J Feline Med Surg. 2021;23:568-574.',
          referenceId: 'ref-shipley-2021',
          sourceType: 'Ensaio Clínico Cruzado Randomizado',
          summaryText:
            'Treze gatos com osteoartrite receberam 5 mg/kg q24h de amantadina ou placebo por 21 dias em estudo cruzado. Os tutores relataram melhora significativa nos escores CSOM (P < 0,05), demonstrando percepção clara de benefício funcional no ambiente familiar.',
          summaryHighlights: ['CSOM favorável à amantadina', 'Tolerabilidade satisfatória', 'Uso seguro em felinos'],
          metrics: ['n = 13 gatos', 'Dose: 5 mg/kg VO q24h', 'Duração: 21 dias'],
          clinicalConclusion:
            'A amantadina proporciona melhora perceptível na qualidade de vida e mobilidade de felinos com dor articular crônica.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/33112193/',
        },
      ],
    },
    {
      id: 'amantadina-foundation-toxicology-ile',
      title: 'Manejo de Superdosagem Aguda e Tratamento de Resgate com Emulsão Lipídica (2025)',
      narrative:
        'A ausência de antídoto específico para a amantadina torna o suporte a superdosagens acidentais um desafio em centros de terapia intensiva veterinária. O relato de caso clínico recente publicado por Hogberg et al. (2025) documentou a reversão célere de neurotoxicose severa (tremores, hiperestesia e nistagmo vertical) em um cão intoxicado por 43,5 mg/kg de amantadina através da administração intravenosa de Emulsão Lipídica a 20% (ILE). A lipofilicidade do núcleo adamantano permitiu seu aprisionamento na pia lipídica intravascular, oferecendo uma intervenção terapêutica inovadora e de alta relevância para a rotina de emergência.',
      narrativeHighlights: [
        'Relato Clínico de Intoxicação Acidental Grave por Amantadina (Hogberg et al., 2025)',
        'Ingestão maciça de 43,5 mg/kg em cão com sinais neurológicos agudos severos',
        'Protocolo com ILE 20%: bólus de 1,5 mL/kg + infusão de 0,25 mL/kg/min por 45 minutos',
        'Resolução completa dos tremores e do nistagmo nas horas subsequentes',
      ],
      referenceIds: ['ref-hogberg-2025'],
      studies: [
        {
          citation:
            'Hogberg B, Marshall K, Vardanega M. Successful Treatment With Intravenous Lipid Emulsion of Accidental Amantadine Overdose: A Case Report. Vet Med Sci. 2025;11:e70402.',
          referenceId: 'ref-hogberg-2025',
          sourceType: 'Relato de Caso Toxicológico',
          summaryText:
            'Um cão de 4,9 kg ingeriu 43,5 mg/kg de amantadina e desenvolveu tremores generalizados, hiperestesia e nistagmo vertical. A infusão de emulsão lipídica a 20% (bólu 1,5 mL/kg seguido de 0,25 mL/kg/min por 45 min) resultou em melhora neurológica acelerada e resolução completa da toxicidade.',
          summaryHighlights: ['Resolução rápida de tremores e nistagmo', 'Pia lipídica eficaz', 'Segurança clínica'],
          metrics: ['n = 1 cão (4,9 kg)', 'Dose ingerida: 43,5 mg/kg', 'Protocolo: ILE 20% IV'],
          clinicalConclusion:
            'A emulsão lipídica intravenosa a 20% surge como terapia adjuvante promissora para reverter sinais de toxicose grave por amantadina em cães.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/40359215/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Amantadine in a multimodal analgesic regimen for alleviation of refractory osteoarthritis pain in dogs',
      authorsYear: 'Lascelles BDX, Gaynor JS, Smith ES, et al. (2008)',
      journal: 'Journal of Veterinary Internal Medicine 22(1):53-59',
      studyDesign: 'Ensaio clínico randomizado, duplo-cego, controlado por placebo',
      sampleSize: '31 cães com osteoartrite crônica de membro pélvico',
      mainFindings:
        'Cães recebendo meloxicam associado a amantadina (3 a 5 mg/kg q24h) apresentaram interação tratamento-tempo significativa (P = 0,009) e pontuação de atividade física avaliada pelo tutor significativamente superior ao grupo placebo no dia 42 (P = 0,030). A resposta analgésica não foi imediata, tornando-se evidente após 3 semanas de terapia contínua.',
      clinicalTakeaway:
        'A amantadina é um adjuvante comprovado para resgatar a mobilidade e o conforto em cães com osteoartrite cuja resposta a AINEs isolados é insuficiente. O benefício exige persistência no tratamento por no mínimo 3 a 6 semanas.',
      referenceId: 'ref-lascelles-2008',
    },
    {
      title: 'Amantadine as a therapeutic option for neuropathic pain in dogs with degenerative lumbosacral stenosis',
      authorsYear: 'Caterino C, Della Valle G, Aragosa F, et al. (2025)',
      journal: 'BMC Veterinary Research 21:469',
      studyDesign: 'Ensaio clínico prospectivo randomizado com análise em plataforma de força',
      sampleSize: '20 cães com estenose lombossacral degenerativa (DLSS)',
      mainFindings:
        'Tanto a amantadina a 3 mg/kg q12h em monoterapia quanto a amantadina a 3 mg/kg q24h combinada ao meloxicam produziram elevação altamente significativa do Pico de Força Vertical (PVF, P < 0,0001) e do Impulso Vertical (VI, P < 0,01) após 21 dias de tratamento, sem diferenças estatísticas entre os dois grupos.',
      clinicalTakeaway:
        'Fornece sustentação científica moderna de que a amantadina possui atividade clínica mensurável em dor neuropática espinhal, justificando tanto a associação com AINEs quanto o emprego de 3 mg/kg a cada 12 horas em casos selecionados.',
      referenceId: 'ref-caterino-2025',
    },
    {
      title: 'Owner evaluation of quality of life and mobility in osteoarthritic cats treated with amantadine or placebo',
      authorsYear: 'Shipley H, Flynn K, Tucker L, et al. (2021)',
      journal: 'Journal of Feline Medicine and Surgery 23(6):568-574',
      studyDesign: 'Ensaio clínico cruzado, randomizado, duplo-cego, controlado por placebo',
      sampleSize: '13 gatos com osteoartrite clínica e radiográfica',
      mainFindings:
        'Os escores CSOM avaliados pelos tutores revelaram melhora estatisticamente significativa na mobilidade e qualidade de vida dos felinos tratados com amantadina 5 mg/kg q24h na 2ª e 3ª semanas (P < 0,05). Acelerometria registrou menor contagem de atividade bruta total nos gatos medicados.',
      clinicalTakeaway:
        'A amantadina é clinicamente benéfica para atenuar o desconforto articular em gatos com artrose crônica. O efeito subjetivo percebido pelo tutor é positivo e consistente.',
      referenceId: 'ref-shipley-2021',
    },
    {
      title: 'Pharmacokinetics of oral amantadine in greyhound dogs',
      authorsYear: 'Norkus C, Rankin D, Warner M, KuKanich B. (2015)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics 38(3):305-308',
      studyDesign: 'Estudo farmacocinético prospectivo com dose única',
      sampleSize: '5 cães Greyhounds hígidos',
      mainFindings:
        'Dose de ~2,8 mg/kg VO gerou Cmax de 275 ng/mL, Tmax de 2,6 horas (faixa 1 a 4 h) e meia-vida terminal de 4,96 horas. Nenhum evento adverso clínico foi registrado nos animais avaliados.',
      clinicalTakeaway:
        'Demonstra que a meia-vida canina (~5 h) é substancialmente menor que a humana (~15 h), fornecendo o substrato farmacocinético para o interesse em regimes a cada 12 horas.',
      referenceId: 'ref-norkus-2015',
    },
    {
      title: 'Pharmacokinetics of amantadine in cats',
      authorsYear: 'Siao KT, Pypendop BH, Stanley SD, Ilkiw JE. (2011)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics 34(6):599-604',
      studyDesign: 'Estudo farmacocinético cruzado IV e Oral',
      sampleSize: '6 gatas adultas hígidas',
      mainFindings:
        'Biodisponibilidade oral aparente de 130 ± 11%, Vdss de 4,3 L/kg, clearance de 8,2 mL/min/kg e meia-vida terminal de 5,4 a 5,8 horas após administração IV e oral.',
      clinicalTakeaway:
        'Comprova absorção oral excelente e rápida na espécie felina com grande volume de distribuição tecidual e perfil de depuração compatível com administração a cada 24 horas (ou 12 horas em casos selecionados).',
      referenceId: 'ref-siao-2011',
    },
    {
      title: 'Successful Treatment With Intravenous Lipid Emulsion of Accidental Amantadine Overdose: A Case Report',
      authorsYear: 'Hogberg B, Marshall K, Vardanega M. (2025)',
      journal: 'Veterinary Medicine and Science 11(3):e70402',
      studyDesign: 'Relato de caso clínico com intervenção toxicológica inovadora',
      sampleSize: '1 cão (4,9 kg)',
      mainFindings:
        'Ingestão acidental de 43,5 mg/kg resultou em nistagmo vertical, tremores intensos e hiperestesia, revertidos com sucesso após protocolo com emulsão lipídica a 20% (bólus de 1,5 mL/kg + infusão contínua).',
      clinicalTakeaway:
        'A terapia com emulsão lipídica intravenosa a 20% representa uma intervenção promissora e viável no manejo hospitalar de superdosagens agudas por amantadina.',
      referenceId: 'ref-hogberg-2025',
    },
  ],

  presentations: [
    {
      id: 'pres-mantidan-comp-100',
      name: 'Mantidan® 100 mg Comprimidos',
      brand: 'Momenta Farmacêutica / Eurofarma (Referência Humana Extrabula — Lista C1)',
      form: 'Comprimido simples',
      concentrationValue: 100.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 20 ou 30 comprimidos de 100 mg',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido de 100 mg; partição em frações menores de 1/2 não recomendada sem precisão',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Portaria 344/98 Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos contendo 100 mg de cloridrato de amantadina',
    },
    {
      id: 'pres-amant-gen-comp-100',
      name: 'Cloridrato de Amantadina 100 mg Genérico',
      brand: 'Genérico Humano Extrabula (Eurofarma, EMS, Neo Química — Lista C1)',
      form: 'Comprimido simples',
      concentrationValue: 100.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido contendo 100 mg de cloridrato de amantadina',
      channel: 'human_pharmacy',
      commercialType: 'Genérico Humano Extrabula (Portaria 344/98 Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos de 100 mg',
    },
    {
      id: 'pres-amant-susp-mag-10',
      name: 'Cloridrato de Amantadina 10 mg/mL Suspensão Oral Palatável',
      brand: 'Formulação Magistral Veterinária (Farmácia de Manipulação Autorizada)',
      form: 'Suspensão oral com veículo flavorizado doce/carne',
      concentrationValue: 10.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco âmbar de 30 mL, 60 mL ou 100 mL com seringa dosadora milimetrada',
      route: 'Oral (VO)',
      scoringInfo: '1 mL = 10 mg de amantadina (0,3 mL/kg para 3 mg/kg; 0,5 mL/kg para 5 mg/kg)',
      channel: 'compounded',
      commercialType: 'Formulação Magistral Veterinária Personalizada',
      packageDescription: 'Frasco âmbar com 60 mL acompanhado de seringa graduada de 1 mL e 3 mL',
    },
    {
      id: 'pres-amant-caps-mag-custom',
      name: 'Cloridrato de Amantadina Cápsulas Magistrais Veterinárias',
      brand: 'Formulação Magistral Veterinária em Cápsulas Personalizadas',
      form: 'Cápsula gelatinosa manipulada',
      concentrationValue: 25.0,
      concentrationUnit: 'mg',
      concentrationOptions: [
        { id: 'opt-caps-5', label: '5 mg por cápsula (gatos e cães miniatura)', unitValue: 5, unitLabel: 'mg' },
        { id: 'opt-caps-10', label: '10 mg por cápsula (gatos e cães pequenos)', unitValue: 10, unitLabel: 'mg', isDefault: true },
        { id: 'opt-caps-25', label: '25 mg por cápsula (cães de 5 a 10 kg)', unitValue: 25, unitLabel: 'mg' },
        { id: 'opt-caps-50', label: '50 mg por cápsula (cães de 10 a 20 kg)', unitValue: 50, unitLabel: 'mg' },
      ],
      packInfo: 'Frasco plástico com 30 ou 60 cápsulas sob medida para o paciente',
      route: 'Oral (VO)',
      scoringInfo: 'Cápsula individualizada; dosagem exata calculada por peso sem necessidade de partição',
      channel: 'compounded',
      commercialType: 'Formulação Magistral Veterinária',
      packageDescription: 'Frasco contendo 30 cápsulas magistrais na dosagem exata prescrita',
    },
  ],

  doses: [
    {
      id: 'dose-amant-dog-oa-lascelles',
      species: 'dog',
      indication: 'Osteoartrite Canina Crônica Refratária a AINEs (Regime Clássico Lascelles 2008)',
      clinicalContext: 'Tratamento adjuvante da claudicação crônica com resposta insuficiente a AINE isolado.',
      doseMin: 3.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h)',
      duration: 'Mínimo de 21 a 42 dias para consolidação do benefício clínico funcional',
      notes:
        'Regime clássico com maior lastro de eficácia clínica da literatura (Lascelles et al., 2008). Associar obrigatoriamente a um AINE (ex: meloxicam). Não esperar alívio imediato nas primeiras 48 horas; a quebra da sensibilização central manifesta-se tipicamente entre 3 e 6 semanas.',
      monitoring: 'Escores funcionais de dor e mobilidade (CBPI ou LOAD), apetite e tolerabilidade digestiva.',
      referenceIds: ['ref-lascelles-2008', 'ref-plumb-10', 'ref-wsava-pain-2022'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Duplo-Cego Controlado por Placebo (Lascelles 2008)',
      calculatorEnabled: true,
      presentationId: 'pres-mantidan-comp-100',
    },
    {
      id: 'dose-amant-dog-wsava-range',
      species: 'dog',
      indication: 'Dor Crônica e Sensibilização Central em Cães (Diretrizes WSAVA / AAHA)',
      clinicalContext: 'Manejo multimodal em síndromes dolorosas complexas crônicas com hiperalgesia ou alodinia.',
      doseMin: 2.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 ou 24 horas (q12h ou q24h)',
      duration: 'Uso continuado individualizado conforme reavaliações periódicas',
      notes:
        'Faixa terapêutica contemporânea recomendada pelas diretrizes mundiais da WSAVA 2022 e AAHA 2022. O intervalo a cada 12 horas possui forte sustentação farmacocinética (meia-vida ~5 h) e deve ser considerado em dores severas ou persistentes.',
      monitoring: 'Nível de conforto, deambulação, ausência de inquietação ou tremores e parâmetros renais.',
      referenceIds: ['ref-wsava-pain-2022', 'ref-aaha-pain-2022', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Diretrizes Internacionais de Consenso de Especialistas em Dor',
      calculatorEnabled: true,
      presentationId: 'pres-amant-susp-mag-10',
    },
    {
      id: 'dose-amant-dog-dlss-caterino',
      species: 'dog',
      indication: 'Dor Neuropática Canina / Estenose Lombossacral Degenerativa (Caterino et al. 2025)',
      clinicalContext: 'Cães de médio e grande porte com síndrome de cauda equina e compressão lombossacral.',
      doseMin: 3.0,
      doseMax: 3.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (monoterapia) ou a cada 24 horas (associada a meloxicam)',
      duration: '21 dias consecutivos com reavaliação clínica e biomecânica',
      notes:
        'Regime contemporâneo avaliado com plataforma de força computadorizada (Caterino et al., 2025). Administrar 3 mg/kg q12h em monoterapia OU 3 mg/kg q24h combinada ao meloxicam (0,1 mg/kg q24h). Ambos os protocolos geraram melhora objetiva altamente significativa nas forças verticais de apoio.',
      monitoring: 'Marcha, tônus de cauda, dor à hiperextensão lombossacral e ausência de ataxia.',
      referenceIds: ['ref-caterino-2025', 'ref-wsava-pain-2022'],
      evidenceLevel: 'Nível 2a — Ensaio Clínico Prospectivo com Métricas Biomecânicas Objetivas (Caterino 2025)',
      calculatorEnabled: true,
      presentationId: 'pres-mantidan-comp-100',
    },
    {
      id: 'dose-amant-cat-oa-chronic',
      species: 'cat',
      indication: 'Osteoartrite e Dor Articular Crônica Felina (Shipley et al. 2021 / WSAVA 2022)',
      clinicalContext: 'Gatos com dificuldade de saltar, perda de mobilidade e doença articular degenerativa.',
      doseMin: 2.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h)',
      duration: 'Mínimo de 21 dias (3 semanas); titular à menor dose eficaz',
      notes:
        'Ensaio clínico de Shipley et al. (2021) utilizou 5 mg/kg q24h com melhora nos escores CSOM. Recomenda-se iniciar com 2,0 a 3,0 mg/kg q24h e titular progressivamente. Utilizar cápsulas magistrais pequenas palatáveis para contornar o sabor amargo intenso da solução.',
      monitoring: 'Escore de mobilidade e saltos (CSOM ou FMPI), apetite, peso e checagem prévia de creatinina/SDMA.',
      referenceIds: ['ref-shipley-2021', 'ref-siao-2011', 'ref-wsava-pain-2022'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Cruzado Randomizado Duplo-Cego (Shipley 2021)',
      calculatorEnabled: true,
      presentationId: 'pres-amant-caps-mag-custom',
    },
    {
      id: 'dose-amant-cat-bsava-titration',
      species: 'cat',
      indication: 'Titulação Baixa e Cautelosa em Felinos Geriátricos ou Nefropatas (BSAVA 10ª ed.)',
      clinicalContext: 'Gatos idosos com osteoartrite crônica e suspeita de perda funcional renal subclínica.',
      doseMin: 1.0,
      doseMax: 4.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h)',
      duration: 'Titulação lenta continuada',
      notes:
        'Faixa posológica descrita no BSAVA Small Animal Formulary 10ª edição (p. 15), caracterizada editorialmente como amplamente anedótica/empírica. Iniciar no limite inferior de 1 a 2 mg/kg e titular lentamente a cada 7 a 10 dias.',
      monitoring: 'Função renal seriada, hidratação, ausência de anorexia ou salivação.',
      referenceIds: ['ref-bsava-10', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2a — Compêndio Farmacológico BSAVA 10ª ed.',
      calculatorEnabled: true,
      presentationId: 'pres-amant-caps-mag-custom',
    },
    {
      id: 'dose-amant-both-windup-cancer',
      species: 'both',
      indication: 'Prevenção e Bloqueio do Fenômeno de Wind-Up / Dor Oncológica Refratária',
      clinicalContext: 'Modulação de sensibilização central em osteossarcoma, tumores invasivos e pós-amputação.',
      doseMin: 3.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 a 24 horas (q12-24h)',
      duration: 'Uso continuado mantido enquanto persistir o foco oncológico/estimulatório',
      notes:
        'Componente adjuvante de terapia analgésica multimodal em combinação com opioides, AINEs ou gabapentinoides. Não substitui tratamentos oncológicos específicos (cirurgia, radioterapia, bisfosfonatos).',
      monitoring: 'Escores de dor, atividade geral e ausência de sedação ou ataxia.',
      referenceIds: ['ref-wsava-pain-2022', 'ref-aaha-pain-2022', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2a — Diretrizes Internacionais de Consenso de Especialistas em Dor',
      calculatorEnabled: true,
      presentationId: 'pres-amant-susp-mag-10',
    },
    {
      id: 'dose-amant-dog-case-report-14',
      species: 'dog',
      indication: 'Dor Neuropática Severa Canina Pós-Trauma — Relato de Caso Isolado (NÃO RECOMENDADA)',
      clinicalContext: 'Dose histórica publicada em relato de caso de um único cão com dor pós-fratura pélvica.',
      doseMin: 14.0,
      doseMax: 14.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 24 horas (q24h)',
      duration: 'Relato experimental isolado',
      notes:
        'ALERTA CRÍTICO: Esta dose extrema de 14 mg/kg provém estritamente de um único relato de caso publicado (n=1) associada ao meloxicam. NÃO é uma dose clínica rotineiramente recomendada. O próprio VIN adverte que sua segurança populacional é desconhecida. Risco iminente de neurotoxicidade grave.',
      monitoring: 'Monitoramento neurológico hospitalar intensivo contra convulsões e tremores.',
      referenceIds: ['ref-vin-2025', 'ref-plumb-10'],
      evidenceLevel: 'Nível 4 — Relato de Caso Clínico Isolado (n=1) com Advertência de Toxicidade',
      calculatorEnabled: false,
      presentationId: 'pres-mantidan-comp-100',
    },
  ],

  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
  ],
};
