import { MedicationRecord } from '../../types/medication';

/**
 * Monografia Clínica Padrão-Ouro — Cetamina (Cloridrato de Cetamina Racêmica e Escetamina)
 * Foco exclusivo em Medicina Veterinária (Cães e Gatos), com linguagem direta, objetiva e prática.
 */
export const cetaminaMedicationRecord: MedicationRecord = {
  id: 'med-cetamina',
  slug: 'cetamina',
  title: 'Cetamina (Cloridrato de Cetamina / Escetamina)',
  activeIngredient: 'Cloridrato de Cetamina (Cetamina Racêmica e Escetamina)',
  isControlled: true,
  controlNotice:
    'Medicamento psicotrópico da Lista B1 (Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 676/2022) de uso exclusivo em estabelecimentos de saúde licenciados (hospitais, clínicas e ambulatórios veterinários). É proibida a dispensação para administração domiciliar. Exige Notificação de Receita B Veterinária ou Receita de Controle Especial, com escrituração em livro oficial e guarda sob chave.',
  tradeNames: [
    'Cetamin® 10% (100 mg/mL) — Syntec (Uso Veterinário)',
    'Dopalen® 100 mg/mL — Ceva Saúde Animal (Uso Veterinário)',
    'Ketamina Agener® 10% (100 mg/mL) — Agener União (Uso Veterinário)',
    'Quetamina® 100 mg/mL — Vetnil (Uso Veterinário)',
    'Vetanarcol® / Ketalex® 50 e 100 mg/mL (Uso Veterinário)',
    'Ketamin-S® / Cristália 50 mg/mL (Escetamina S+ Hospitalar)',
  ],
  officialSiteUrl: 'https://www.syntec.com.br/produtos/cetamin/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ketamine/PNG',
  priceReference: {
    amountBrl: 110.0,
    label:
      'Cetamin® 10% 100 mg/mL (frasco 10 mL): R$ 65,00 a R$ 95,00 | Dopalen® / Ketamina Agener® 100 mg/mL (frasco 10 mL): R$ 75,00 a R$ 120,00 | Cetamin® 10% (frasco 50 mL hospitalar): R$ 190,00 a R$ 265,00 | Ketamin-S® (Escetamina 50 mg/mL, ampola ou frasco): R$ 80,00 a R$ 150,00',
    presentation: 'Frasco-ampola de 10 mL ou 50 mL a 100 mg/mL (10%) de Cloridrato de Cetamina Racêmica',
    sourceName: 'Distribuidores Veterinários Oficiais (MAPA) e Tabela CMED / ANVISA',
    sourceUrl: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cmed',
    checkedAt: '2026-11-10',
    notes:
      'Medicamento psicotrópico da Lista B1 de uso estrito intrahospitalar e ambulatorial. Venda restrita a médicos-veterinários habilitados.',
  },
  pharmacologicClass:
    'Anestésico dissociativo e antagonista do receptor NMDA (analgésico preventivo e anticonvulsivante de resgate)',
  species: ['dog', 'cat'],
  category: 'anestesia-dor',
  tags: [
    'Cetamina',
    'Escetamina',
    'Norcetamina',
    'Anestésico Dissociativo',
    'Antagonista NMDA',
    'Somação Temporal Medular',
    'Sensibilização Central',
    'Infusão Contínua',
    'Co-indução Anestésica',
    'Contenção Química',
    'Estado de Mal Epiléptico',
    'Lista B1 Portaria 344/98',
  ],

  indications: [
    'Co-indução anestésica intravenosa balanceada (associada a propofol, alfaxalona ou benzodiazepínicos) em cães e gatos, reduzindo a dose do hipnótico principal e estabilizando a hemodinâmica.',
    'Contenção química intramuscular e indução dissociativa multimodal (combinada com agonista alfa-2 e opioide) em felinos e cães reativos.',
    'Analgesia preventiva e perioperatória subanestésica em infusão contínua (ICR): bloqueio da somação temporal medular (wind-up), sensibilização central e hiperalgesia induzida por opioides em cirurgias ortopédicas e de tecidos moles.',
    'Manejo emergencial de terceira linha no estado de mal epiléptico refratário em cães e gatos: bloqueio dos receptores NMDA externalizados após a falha de benzodiazepínicos.',
    'Adjuvante analgésico parenteral em dor neuropática refratária, dores oncológicas e sensibilização central crônica.',
  ],

  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
    'gengivoestomatite-cronica-felina',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'cistite-idiopatica-felina',
    'tetano-caes-gatos',
    'sepse-canina',
    'sepse-felina',
    'trauma-cranioencefalico-caes',
  ],

  attentionSubtitle:
    'Anestésico dissociativo de uso restrito hospitalar (Lista B1). Contraindicada isolada em cães (risco de rigidez e convulsões). Cuidado com o paradoxo hemodinâmico no choque grave e dessensibilizar a laringe com lidocaína tópica em gatos para prevenir laringoespasmo.',

  plainLanguageSummary:
    'A cetamina é um anestésico dissociativo e antagonista não competitivo dos receptores glutamatérgicos NMDA (N-metil-D-aspartato). Seu efeito varia profundamente de acordo com a dose e a via de administração:\n\n' +
    'Em doses anestésicas (IV ou IM), promove dissociação talamocortical com analgesia somática intensa e catalepsia, mantendo parte dos reflexos de proteção de tronco encefálico. Em cães e gatos, deve ser sempre associada a sedativos ou relaxantes musculares (agonistas alfa-2, benzodiazepínicos ou propofol) para evitar rigidez muscular, tremores e despertar com disforia.\n\n' +
    'Em doses subanestésicas (infusão contínua de 0,12 a 0,6 mg/kg/h), bloqueia a somação temporal medular (wind-up) e a sensibilização central, funcionando como potente analgésico preventivo que poupa opioides e reduz o consumo de anestésicos inalatórios. No estado de mal epiléptico refratário, bloqueia os receptores NMDA externalizados na membrana sináptica após a perda de efeito dos benzodiazepínicos, interrompendo a excitotoxicidade celular.',

  quickSummaryHighlights: [
    'anestésico dissociativo',
    'antagonista NMDA',
    'co-indução anestésica',
    'contenção química multimodal',
    'somação temporal medular',
    'infusão contínua analgésica',
    'estado de mal epiléptico refratário',
    'associação obrigatória com relaxante muscular',
  ],

  pillars: [
    {
      title: 'Bloqueio do Canal NMDA e Dissociação Talamocortical',
      icon: 'Brain',
      desc: 'Bloqueia o poro aberto do canal NMDA, desconectando as vias talamocorticais do sistema límbico com potente analgesia somática e amnésia.',
    },
    {
      title: 'Modulação Anti-Hiperalgésica e Bloqueio de Wind-Up',
      icon: 'Zap',
      desc: 'Em infusão contínua subanestésica, extingue a somação temporal no corno dorsal medular, prevenindo a sensibilização central e reduzindo o consumo de opioides.',
    },
    {
      title: 'Resgate no Estado de Mal Epiléptico Refratário',
      icon: 'Syringe',
      desc: 'Bloqueia os receptores NMDA suprarregulados após a perda de eficácia dos benzodiazepínicos, contendo a excitotoxicidade cálcio-dependente.',
    },
    {
      title: 'Perfil Hemodinâmico e Cuidados de Via Aérea',
      icon: 'ShieldCheck',
      desc: 'Mantém pressão e débito por estímulo simpático indireto em animais estáveis, mas pode descompensar o choque terminal. Exige atenção à laringe em felinos.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Paradoxo cardiovascular (estímulo simpático versus choque descompensado):',
      text: 'Em pacientes com reservas adrenérgicas preservadas, a cetamina inibe a recaptação de catecolaminas, mantendo ou elevando moderadamente a pressão arterial e a frequência cardíaca. Contudo, possui efeito inotrópico negativo direto: em pacientes críticos em choque grave ou séptico com depleção simpática, pode precipitar colapso hemodinâmico imediato.',
    },
    {
      label: 'Proibição de monoterapia anestésica em cães:',
      text: 'A cetamina nunca deve ser administrada isoladamente como anestésico em cães. Provoca hipertonia muscular severa, rigidez extensora, mioclonias, convulsões e despertar com intensa disforia. É obrigatória a associação com benzodiazepínicos, agonistas alfa-2 ou propofol.',
    },
    {
      label: 'Reflexos de via aérea, apneia e laringoespasmo em gatos:',
      text: 'Embora mantenha a ventilação espontânea, a administração intravenosa rápida em bolus induz apneia temporária ou respiração apnêustica. A preservação de reflexos laríngeos não garante proteção de via aérea e pode deflagrar laringoespasmo em gatos — é indispensável instilar lidocaína tópica (0,1 mL a 2%) nas aritenoides antes da intubação.',
    },
    {
      label: 'Diferença de potência entre Cetamina Racêmica e Escetamina S(+):',
      text: 'A escetamina (enantiômero dextrógiro puro S+) possui afinidade 3 a 4 vezes maior pelo receptor NMDA e cerca do dobro da potência analgésica e anestésica da mistura racêmica. Ao utilizar apresentações de escetamina injetável, reduza a dose calculada em 30% a 50%.',
    },
    {
      label: 'Vigilância hepática e urológica em infusões prolongadas:',
      text: 'Infusões contínuas por períodos muito longos (>24 a 48 horas) podem elevar transaminases e fosfatase alcalina por estresse hepatocelular. O uso crônico repetido associa-se a cistite química e uropatia ulcerativa pela ação citotóxica direta de metabólitos no urotélio.',
    },
  ],

  mechanismOfAction:
    'A farmacodinâmica da cetamina na medicina veterinária baseia-se em quatro ações neurofisiológicas essenciais:\n\n' +
    '1. Bloqueio não competitivo do canal NMDA: O receptor NMDA é um canal iônico glutamatérgico permeável ao sódio e ao cálcio. A cetamina atua como antagonista dependente do uso, ligando-se ao sítio da fenciclidina dentro do poro aberto do canal. Esse bloqueio reduz drasticamente o influxo tóxico de cálcio nos neurônios.\n\n' +
    '2. Dissociação talamocortical: Ao inibir a neurotransmissão glutamatérgica nas vias talamocorticais e límbicas e bloquear os canais marcapasso neuronais HCN1, causa desconexão funcional do córtex consciente, gerando analgesia somática profunda com preservação reflexa de tronco (anestesia dissociativa).\n\n' +
    '3. Prevenção da sensibilização central e do fenômeno de wind-up: Em doses subanestésicas (infusão contínua), atua especificamente nos interneurônios do corno dorsal da medula espinhal, bloqueando a amplificação dolorosa (somação temporal) gerada pelo estímulo cirúrgico e prevenindo a hiperalgesia induzida por opioides.\n\n' +
    '4. Estímulo adrenérgico indireto: Inibe a recaptação neuronal de noradrenalina e dopamina, mantendo a frequência cardíaca, a pressão arterial e a contratilidade miocárdica em animais compensados.',

  pharmacokineticsData: {
    halfLife:
      'Cães: ~40 a 60 minutos | Gatos: ~1 a 2 horas (a norcetamina ativa persiste por 4 a 6 horas, prolongando a sedação residual)',
    plasmaBinding:
      'Baixa (~12% a 15% em cães e gatos), resultando em alta fração livre ativa disponível para os tecidos',
    cnsPenetration:
      'Altíssima e imediata: A cetamina é altamente lipossolúvel (10 a 50 vezes mais lipofílica que o tiopental em pH fisiológico), com pKa de 7,5. Quase metade da molécula encontra-se não ionizada no plasma, cruzando a barreira hematoencefálica (BHE) em 30 a 60 segundos após injeção IV e atingindo razão cérebro:plasma de 4:1 a 6:1. Essa velocidade de penetração explica o início rápido da anestesia dissociativa e sua alta eficácia como resgate de emergência no estado de mal epiléptico refratário.',
    absorption:
      'A via de administração determina a biodisponibilidade e a velocidade de ação na rotina clínica:\n' +
      '• **Via Intravenosa (IV)**: Biodisponibilidade de **100%**. Início de ação em **30 a 60 segundos**, com pico imediato. Via de eleição para co-indução anestésica balanceada e infusão contínua analgésica.\n' +
      '• **Via Intramuscular (IM)**: Biodisponibilidade de **~93%** (faixa clínica de 80% a 93%). Início da imobilização em **3 a 5 minutos**, com efeito clínico máximo em 10 a 15 minutos e duração de 25 a 45 minutos. Solução ácida (pH 3,5–5,5) causa desconforto transitório à aplicação.\n' +
      '• **Via Subcutânea (SC)**: Biodisponibilidade estimada em **~64%**. Absorção mais lenta e suave (início em 15 a 30 minutos), sem pico plasmático abrupto, sendo útil em protocolos analgésicos adjuvantes de dor crônica.\n' +
      '• **Via Transmucosa Oral (OTM)**: Biodisponibilidade de **~30% a 40%** em felinos. Início em 10 a 15 minutos. Opção de resgate para contenção química de gatos reativos quando não há possibilidade de injeção parenteral segura.\n' +
      '• **Via Oral (VO)**: Baixa biodisponibilidade (**~16% a 20%** da molécula intacta) devido ao intenso metabolismo de primeira passagem hepática, gerando altas concentrações de metabólitos ativos (norcetamina).',
    distribution:
      '• **Volume de distribuição elevado (2,5 a 4,5 L/kg)**: Devido à alta lipossolubilidade e baixa ligação proteica, distribui-se amplamente e com grande rapidez para órgãos altamente vascularizados (cérebro, coração, pulmões e placenta).\n' +
      '• **Cinética bifásica (redistribuição cerebral)**: O término da anestesia dissociativa após um bolus único ocorre em 10 a 15 minutos (fase α), decorrente da redistribuição do cérebro para o músculo esquelético e tecido adiposo — e não pela eliminação hepática imediata.\n' +
      '• **Acúmulo em infusões prolongadas**: Em infusões contínuas por mais de 24 a 48 horas, ocorre saturação dos compartimentos periféricos e o tempo de despertar passa a depender da taxa de eliminação hepática.',
    metabolism:
      '• **1. N-desmetilação para Norcetamina**: Ocorre nos microssomos hepáticos pelas isoenzimas do citocromo P450 (principalmente CYP2B11 e CYP3A12 em cães; CYP3A e CYP2B em gatos). A norcetamina é um metabólito farmacologicamente ativo que conserva de 20% a 33% da potência analgésica e anestésica da molécula original.\n' +
      '• **2. Hidroxilação secundária**: A norcetamina é convertida em diastereoisômeros de hidroxinorcetamina (HNK) e dehidronorcetamina (DHNK), metabólitos que modulam a neurotransmissão glutamatérgica sem bloquear o poro do canal NMDA.\n' +
      '• **3. Particularidade felina na conjugação**: Em cães, os metabólitos são conjugados com ácido glicurônico antes da excreção. Gatos possuem deficiência constitucional de glicuroniltransferases (UGT1A6), dependendo mais da excreção renal direta de norcetamina inalterada.',
    elimination:
      '• **Excreção predominantemente renal**: Cerca de 85% a 90% da dose é eliminada na urina sob a forma de metabólitos conjugados e hidroxilados. Apenas 2% a 4% são excretados inalterados em cães.\n' +
      '• **Meia-vida de eliminação (tempo no organismo)**: ~40 a 60 minutos em cães e ~1 a 2 horas em gatos.\n' +
      '• **Alerta clínico em nefropatas**: Em gatos com insuficiência renal (estágios IRIS 3 e 4) ou obstrução uretral, a depuração de norcetamina fica comprometida, levando ao acúmulo do metabólito ativo e prolongando significativamente a sedação e ataxia pós-anestésica.',
  },

  quickIndications: [
    {
      condition: 'Co-indução Anestésica Intravenosa (com Propofol, Alfaxalona ou Benzodiazepínico)',
      species: 'both',
      clinicalContext: 'Indução balanceada poupadora de hipnótico e estabilizadora hemodinâmica',
      doseSummary: '1 a 2 mg/kg IV (co-indução) ou 2 a 5 mg/kg IV (associada a midazolam ou diazepam 0,2–0,3 mg/kg IV)',
      route: 'Via Intravenosa (lenta ao longo de 60 segundos)',
      duration: 'Bolus único de indução (permite intubação endotraqueal em 60 a 90 segundos)',
    },
    {
      condition: 'Contenção Química Intramuscular e Anestesia Dissociativa Multimodal',
      species: 'both',
      clinicalContext: 'Pacientes de difícil manipulação ou procedimentos curtos (associada a agonista alfa-2 e opioide)',
      doseSummary: 'Gatos: 2 a 5 mg/kg IM (exames) ou 5 a 10 mg/kg IM (cirúrgico) | Cães: 2 a 5 mg/kg IM em associação',
      route: 'Via Intramuscular profunda (musculatura epaxial ou quadríceps)',
      duration: 'Início em 3 a 5 minutos; efeito cirúrgico de 20 a 40 minutos',
    },
    {
      condition: 'Infusão Contínua Subanestésica Perioperatória (ICR Analgésica)',
      species: 'both',
      clinicalContext: 'Bloqueio NMDA contra somação temporal medular, sensibilização central e dor aguda',
      doseSummary: 'Ataque: 0,25 a 0,5 mg/kg IV lenta → Transoperatório: 0,12 a 0,6 mg/kg/h (2–10 µg/kg/min) → Pós-op: 0,12 a 0,3 mg/kg/h',
      route: 'Via Intravenosa em bomba de infusão contínua',
      duration: 'Durante o transoperatório e por 12 a 48 horas no pós-operatório',
    },
    {
      condition: 'Estado de Mal Epiléptico Refratário e Crises em Salva',
      species: 'both',
      clinicalContext: 'Crises refratárias a benzodiazepínicos e anticonvulsivantes de segunda linha',
      doseSummary: 'Bolus de ataque: 0,5 a 2 mg/kg IV lenta (até 5 mg/kg em casos extremos) → Infusão contínua: 0,5 a 2 mg/kg/h IV',
      route: 'Via Intravenosa (lenta seguida de infusão contínua)',
      duration: 'Manter por 12 a 24 horas após cessação das crises, com desmame gradual',
    },
    {
      condition: 'Analgesia Subanestésica Adjuvante na Dor Crônica e Neuropática',
      species: 'both',
      clinicalContext: 'Adjuvante para controle da sensibilização central em osteoartrite severa e dor neuropática',
      doseSummary: '0,5 a 1 mg/kg SC (intermitente a cada 7 a 30 dias) ou infusão hospitalar de 0,1 a 0,3 mg/kg/h IV',
      route: 'Via Subcutânea (SC) ou Intravenosa (IV)',
      duration: 'Aplicações periódicas com monitoramento clínico e renal',
    },
  ],

  detailedIndications: [
    {
      id: 'det-ind-cetamina-coinducao-iv',
      indication: 'Co-indução Anestésica Intravenosa e Indução Dissociativa Balanceada',
      clinicalContext:
        'Indução da anestesia geral para intubação orotraqueal em pacientes normovolêmicos ou com instabilidade hemodinâmica compensada, reduzindo a dose necessária de propofol ou alfaxalona e preservando a resistência vascular sistêmica.',
      species: 'both',
      dose: 'Co-indução (com propofol/alfaxalona): 1 a 2 mg/kg IV lenta | Indução dissociativa (com benzodiazepínico): 2 a 5 mg/kg IV lenta (Escetamina S+: 1 a 2,5 mg/kg IV)',
      route: 'Intravenosa (IV) administrada lentamente ao longo de 60 a 90 segundos',
      frequency: 'Dose única de indução titulada até perda do reflexo de deglutição para intubação',
      duration: 'Ação anestésica de 10 a 15 minutos (fase alfa de redistribuição)',
      mechanismOfAction:
        'Bloqueio não competitivo do canal NMDA talamocortical e inibição de canais marcapasso HCN1, produzindo inconsciência dissociativa e analgesia somática, enquanto a inibição da recaptação de noradrenalina atenua a vasodilatação e a hipotensão induzidas pelo propofol.',
      clinicalRationale:
        'Em cães e gatos, a co-indução com cetamina (1 a 2 mg/kg IV lenta, administrada após bolus parcial de 1 a 2 mg/kg de propofol ou alfaxalona) reduz em 30% a 50% a dose total do hipnótico requerida para intubação, diminuindo a incidência de hipotensão pós-indução e apneia. Na indução dissociativa com benzodiazepínico (midazolam ou diazepam 0,2 a 0,3 mg/kg IV), a dose de cetamina racêmica é de 2 a 5 mg/kg IV lenta; se utilizada a escetamina S(+), a potência analgésica e hipnótica duas vezes superior exige redução de 30% a 50% na dose (1 a 2,5 mg/kg IV). Em gatos, é obrigatório instilar lidocaína a 2% sem vasoconstritor (~0,1 mL ou 2 mg) sobre as cartilagens aritenoides 60 a 90 segundos antes da intubação orotraqueal para prevenir laringoespasmo reflexo.',
      monitoring:
        'Frequência cardíaca, eletrocardiograma contínuo, pressão arterial, capnografia, oximetria de pulso, tônus mandibular e reflexo laríngeo. Lubrificar as córneas imediatamente, pois os olhos permanecem abertos em midríase.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina', 'ref-fda-ketalar-label'],
      evidenceLevel: 'Consenso em Anestesiologia Veterinária',
      highlights: [
        'co-indução',
        'propofol',
        'alfaxalona',
        'resistência vascular sistêmica',
        'receptores NMDA',
        'laringoespasmo reflexo',
        'lidocaína a 2%',
        'cartilagens aritenoides',
        'escetamina S(+)',
        'benzodiazepínico',
      ],
    },
    {
      id: 'det-ind-cetamina-contencao-im-multimodal',
      indication: 'Contenção Química Intramuscular e Anestesia Dissociativa Multimodal',
      clinicalContext:
        'Imobilização e analgesia profunda sem estresse para procedimentos curtos, exames radiográficos, desbridamentos e suturas em gatos e cães reativos sem acesso venoso prévio.',
      species: 'both',
      dose: 'Gatos: 2 a 5 mg/kg IM (contenção/exames) ou 5 a 10 mg/kg IM (anestesia cirúrgica curta) associada a dexmedetomidina e opioide | Cães reativos: 2 a 5 mg/kg IM associada a agonista alfa-2 e opioide',
      route: 'Intramuscular profunda (musculatura epaxial lombar ou quadríceps)',
      frequency: 'Dose única (se necessário prolongar, obter acesso venoso para manutenção suplementar)',
      duration: 'Latência de 3 a 5 minutos; imobilização clínica de 25 a 45 minutos; recuperação em 1 a 3 horas',
      mechanismOfAction:
        'Sinergismo farmacodinâmico multimodal: a cetamina promove desconexão talamocortical e analgesia somática por bloqueio NMDA; o agonista alfa-2 (dexmedetomidina) e o benzodiazepínico suprimem a hipertonia muscular, a sialorreia e a taquicardia simpática; e o opioide fornece analgesia visceral.',
      clinicalRationale:
        'A cetamina isolada nunca deve ser utilizada em cães (risco de rigidez extensora e convulsões) e, mesmo em gatos, seu uso isolado requer doses excessivas com recuperação disfórica. Em protocolos multimodais balanceados, doses reduzidas (2 a 5 mg/kg IM) proporcionam sedação rápida e segura. Em gatos, o protocolo quádruplo combina cetamina (2 a 5 mg/kg IM) com dexmedetomidina (5 a 15 µg/kg IM) + metadona (0,2 a 0,3 mg/kg) ou butorfanol (0,2 a 0,4 mg/kg) ± midazolam (0,2 mg/kg). Em cães reativos, associa-se dexmedetomidina (5 a 10 µg/kg IM) + metadona (0,3 a 0,5 mg/kg) ± midazolam (0,2 a 0,3 mg/kg). Se houver necessidade de reversão com atipamezole, aguardar ao menos 30 a 45 minutos após a aplicação da cetamina para evitar excitação dissociativa residual.',
      monitoring:
        'Permeabilidade das vias aéreas, frequência respiratória, oximetria de pulso (com suplementação de oxigênio), temperatura retal (risco de hipotermia), pressão arterial e proteção corneana com colírio.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina', 'ref-shah-2019-quad-ketamine'],
      evidenceLevel: 'Ensaios Clínicos Veterinários',
      highlights: [
        'contenção química intramuscular',
        'protocolo multimodal',
        'dexmedetomidina',
        'agonista alfa-2',
        'benzodiazepínico',
        'metadona',
        'butorfanol',
        'desconexão talamocortical',
        'atipamezole',
        'rigidez extensora',
      ],
    },
    {
      id: 'det-ind-cetamina-cri-dor-aguda',
      indication: 'Infusão Contínua Subanestésica para Dor Aguda Perioperatória e Bloqueio de Wind-Up',
      clinicalContext:
        'Controle multimodal da dor moderada a intensa no trans e pós-operatório (amputações, mastectomias radicais, toracotomias, osteossínteses, laparotomias exploratórias e pancreatite aguda), extinguindo a somação temporal medular e prevenindo a hiperalgesia pós-incisional.',
      species: 'both',
      dose: 'Bolus de ataque: 0,25 a 0,5 mg/kg IV lenta (pré-incisão) → Transoperatório: 0,12 a 0,6 mg/kg/h (2–10 µg/kg/min) → Pós-operatório (12–48 h): 0,12 a 0,3 mg/kg/h (2–5 µg/kg/min)',
      route: 'Intravenosa em bomba de infusão contínua (isolada ou em protocolos analgésicos combinados)',
      frequency: 'Infusão contínua ininterrupta titulada por escalas clínicas validadas de dor',
      duration: 'Durante o procedimento cirúrgico e mantida por 12 a 48 horas de pós-operatório com redução gradual',
      mechanismOfAction:
        'Em concentrações plasmáticas subanestésicas (~100 a 200 ng/mL), a cetamina bloqueia seletivamente os receptores NMDA no corno dorsal da medula espinhal ativados pela descarga repetitiva das fibras C nociceptivas. Isso extingue o fenômeno de wind-up, impede a sensibilização central e evita a tolerância precoce a opioides.',
      clinicalRationale:
        'A infusão contínua subanestésica visa neutralizar a somação temporal medular gerada pelo bombardeio nociceptivo das fibras C durante o trauma cirúrgico. No ensaio clínico clássico em cães submetidos a cirurgia ortopédica (Wagner et al., 2002), o bolus de 0,5 mg/kg seguido de infusão transoperatória de 10 µg/kg/min (0,6 mg/kg/h) e pós-operatória de 2 µg/kg/min (0,12 mg/kg/h) reduziu acentuadamente os escores de dor, melhorou a mobilidade e diminuiu a necessidade de resgates analgésicos. Em cães e gatos, caso ocorra sedação excessiva ou vocalização disfórica no pós-operatório, reduz-se a taxa pela metade imediatamente.',
      monitoring:
        'Escores seriados de dor a cada 2 a 4 horas (Escala Composta de Glasgow para cães e Escala de Expressão Facial para gatos), sedação, frequência cardíaca e pressão arterial.',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-schwenk-2018-asra-acute-pain', 'ref-bergadano-2009-ketamine-cri'],
      evidenceLevel: 'Ensaios Clínicos Randomizados em Pequenos Animais',
      highlights: [
        'infusão contínua subanestésica',
        'somação temporal medular',
        'wind-up',
        'fibras C nociceptivas',
        'sensibilização central',
        'poupança de opioides',
        'hiperalgesia induzida por opioides',
        'corno dorsal da medula espinhal',
        'bolus de ataque',
      ],
    },
    {
      id: 'det-ind-cetamina-status-epilepticus',
      indication: 'Estado de Mal Epiléptico Refratário e Crises em Salva',
      clinicalContext:
        'Emergência neurológica crítica em cães e gatos com convulsões contínuas (>5 a 30 minutos) ou crises agrupadas que falharam aos benzodiazepínicos de primeira linha (diazepam/midazolam) e a anticonvulsivantes como levetiracetam ou fenobarbital.',
      species: 'both',
      dose: 'Bolus de ataque: 0,5 a 2 mg/kg IV lenta (até 3 a 5 mg/kg em casos graves) → Infusão contínua: 0,5 a 2 mg/kg/h IV',
      route: 'Intravenosa (lenta ao longo de 2 a 3 minutos seguida imediatamente por infusão contínua em bomba)',
      frequency: 'Infusão contínua titulada até a cessação completa das crises clínicas',
      duration: 'Manter por 12 a 24 horas após o controle das crises, realizando desmame gradual (redução de 25% a cada 4 a 6 horas)',
      mechanismOfAction:
        'Após crises convulsivas prolongadas (>15 a 30 minutos), ocorre internalização progressiva dos receptores inibitórios GABA-A (tornando os benzodiazepínicos ineficazes) e externalização maciça de receptores excitatórios NMDA na sinapse. A cetamina bloqueia diretamente esses canais NMDA abertos, estancando o influxo excessivo de cálcio, o edema citotóxico e a necrose neuronal.',
      clinicalRationale:
        'O Consenso Internacional ACVIM de Neurologia Veterinária (Charalambous et al., 2024) posiciona a cetamina como fármaco de escolha no estado de mal epiléptico refratário. Sua principal vantagem comparativa frente ao propofol ou barbitúricos em altas doses é interromper as descargas convulsivas mantendo a pressão arterial sistêmica e a pressão de perfusão cerebral, minimizando o risco de colapso hemodinâmico no paciente crítico.',
      monitoring:
        'Monitoramento neurológico contínuo, pressão arterial, capnografia, oximetria de pulso, glicemia e temperatura retal.',
      referenceIds: ['ref-charalambous-2024-acvim-se', 'ref-roynard-2021-ketamine-se', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Diretriz de Consenso Internacional (ACVIM)',
      highlights: [
        'estado de mal epiléptico refratário',
        'internalização de receptores GABA-A',
        'externalização de receptores NMDA',
        'edema citotóxico',
        'pressão de perfusão cerebral',
        'desmame escalonado',
      ],
    },
    {
      id: 'det-ind-cetamina-dor-cronica-neuropatica',
      indication: 'Dor Crônica, Neuropática e Sensibilização Central Refratária',
      clinicalContext:
        'Adjuvante de resgate em osteoartrite severa com sensibilização medular, dor neuropática, dor fantasma pós-amputação ou neoplasias osteolíticas que não respondem à terapia multimodal padrão.',
      species: 'both',
      dose: 'Protocolo ambulatorial: 0,5 a 1 mg/kg SC a cada 7 a 30 dias | Infusão hospitalar: 0,1 a 0,3 mg/kg/h IV (ciclo de 6 a 24 horas)',
      route: 'Subcutânea (SC) ou Intravenosa (IV) em infusão',
      frequency: 'Aplicações periódicas com reavaliação funcional contínua',
      duration: 'Avaliar resposta clínica após 1 a 3 aplicações; suspender se não houver ganho funcional objetivo',
      mechanismOfAction:
        'Bloqueio dos receptores NMDA contendo a subunidade GluN2B no corno dorsal medular, revertendo a potenciação de longo prazo e reduzindo a alodinia mecânica e a hiperalgesia secundária.',
      clinicalRationale:
        'Na dor crônica, a evidência veterinária é heterogênea e o tratamento deve ser rigorosamente individualizado. A administração subcutânea (biodisponibilidade de ~64%) oferece absorção gradual sem pico dissociativo, sendo bem tolerada em cães e gatos. Por envolver potencial toxicidade hepática ou urológica em administrações frequentes, deve ser reservada a pacientes refratários sob monitoramento laboratorial.',
      monitoring:
        'Enzimas hepáticas (ALT e fosfatase alcalina), sinais de trato urinário (hematúria, disúria ou polaciúria) e escores funcionais de dor.',
      referenceIds: ['ref-cohen-2018-asra-chronic-pain', 'ref-cochrane-2025-chronic-pain', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Consensos de Especialistas e Farmacologia Clínica',
      highlights: [
        'dor neuropática',
        'sensibilização central',
        'alodinia',
        'hiperalgesia',
        'subunidade GluN2B',
        'via subcutânea',
        'toxicidade urológica',
      ],
    },
  ],

  doses: [
    {
      id: 'dose-cetamina-dog-coinducao-iv',
      species: 'dog',
      indication: 'Co-indução anestésica intravenosa (associada a propofol, alfaxalona ou benzodiazepínico)',
      doseMin: 1.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 60 segundos)',
      frequency: 'Dose única de indução (co-indução: 1 a 2 mg/kg IV; com benzodiazepínico: 2 a 5 mg/kg IV)',
      duration: 'Ação de 10 a 15 minutos',
      clinicalContext: 'Indução balanceada poupadora de hipnótico e protetora hemodinâmica',
      monitoring: 'Eletrocardiograma, pressão arterial, frequência respiratória, capnografia e lubrificação corneana',
      notes:
        'Nunca administrar cetamina isolada em cães (provoca rigidez muscular severa e convulsões). Na co-indução, administrar bolus parcial de propofol (1 a 2 mg/kg IV) ou midazolam (0,2 a 0,3 mg/kg IV) seguido de cetamina 1 a 2 mg/kg IV lenta. Se utilizar escetamina S+ (50 mg/mL), reduza a dose calculada em 30% a 50%.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-cat-coinducao-iv',
      species: 'cat',
      indication: 'Co-indução anestésica intravenosa em felinos (associada a midazolam, propofol ou alfaxalona)',
      doseMin: 1.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 60 segundos)',
      frequency: 'Dose única titulada (co-indução: 1 a 2 mg/kg IV; com midazolam 0,2 mg/kg: 2 a 5 mg/kg IV)',
      duration: '10 a 20 minutos',
      clinicalContext: 'Indução anestésica geral balanceada felina',
      monitoring: 'Reflexo laríngeo (dessensibilizar com lidocaína tópica), pressão arterial, ECG e oximetria',
      notes:
        'Em gatos, os reflexos laríngeos permanecem ativos: instilar obrigatoriamente 0,1 mL de lidocaína a 2% sem vasoconstritor na glote e aguardar 60 a 90 segundos antes da intubação para evitar laringoespasmo. Evitar em gatos com cardiomiopatia hipertrófica descompensada.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-cat-contencao-im',
      species: 'cat',
      indication: 'Contenção química intramuscular e anestesia dissociativa multimodal felina',
      doseMin: 2.0,
      doseMax: 10.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IM profunda (musculatura epaxial ou quadríceps)',
      frequency: 'Dose única (2 a 5 mg/kg IM para contenção/exames; 5 a 10 mg/kg IM para procedimentos cirúrgicos curtos)',
      duration: '20 a 45 minutos de imobilização',
      clinicalContext: 'Gatos sob estresse ou de difícil contenção para procedimentos diagnósticos ou castração rápida',
      monitoring: 'Temperatura retal (evitar hipotermia), oximetria, ventilação e proteção ocular',
      notes:
        'Associar sempre a um agonista alfa-2 (dexmedetomidina 5 a 20 µg/kg IM) e um opioide (metadona 0,2 a 0,3 mg/kg ou butorfanol 0,2 a 0,4 mg/kg) ± midazolam (0,2 mg/kg IM). O pH ácido da solução (3,5 a 5,5) causa desconforto transitório à injeção intramuscular.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-shah-2019-quad-ketamine'],
      evidenceLevel: 'Ensaios Clínicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-dog-contencao-im',
      species: 'dog',
      indication: 'Contenção química intramuscular de cães reativos (associação obrigatória)',
      doseMin: 2.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IM profunda',
      frequency: 'Dose única associada a agonista alfa-2 (dexmedetomidina 5 a 15 µg/kg IM) + metadona (0,3 a 0,5 mg/kg IM)',
      duration: '25 a 45 minutos',
      clinicalContext: 'Manejo emergencial de cães agressivos sem acesso venoso',
      monitoring: 'Vias aéreas, oxigenação, temperatura corporal e pressão arterial',
      notes:
        'Nunca administrar isolada em cães. A associação com dexmedetomidina e opioide assegura relaxamento muscular confiável. Não reverter a dexmedetomidina com atipamezole nos primeiros 30 a 45 minutos para não precipitar excitação dissociativa e rigidez muscular.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-both-bolus-analgesico-ataque',
      species: 'both',
      indication: 'Bolus analgésico subanestésico de ataque (pré-incisional ou pré-infusão contínua)',
      doseMin: 0.25,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 2 a 3 minutos)',
      frequency: 'Bolus único imediatamente antes da incisão ou do início da infusão contínua',
      duration: 'Ocupação imediata dos receptores NMDA no corno dorsal medular',
      clinicalContext: 'Prevenção de sensibilização central e somação temporal (wind-up)',
      monitoring: 'Frequência cardíaca, pressão arterial e ausência de nistagmo ou disforia',
      notes:
        'Recomendado antes do início da taxa de infusão contínua para saturar prontamente os canais NMDA abertos antes do estímulo doloroso cirúrgico.',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-schwenk-2018-asra-acute-pain'],
      evidenceLevel: 'Ensaios Clínicos Randomizados em Cães',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-both-cri-transop',
      species: 'both',
      indication: 'Infusão contínua subanestésica transoperatória e pós-operatória (2 a 10 µg/kg/min)',
      doseMin: 0.12,
      doseMax: 0.6,
      doseUnit: 'mg',
      perWeightUnit: 'kg/h',
      route: 'IV em bomba de infusão contínua',
      frequency: 'Transoperatório: 0,6 mg/kg/h (10 µg/kg/min) | Pós-operatório: 0,12 a 0,3 mg/kg/h (2 a 5 µg/kg/min)',
      duration: 'Durante o transoperatório e mantida por 12 a 48 horas de pós-operatório',
      clinicalContext: 'Analgesia preventiva multimodal e redução do consumo de inalatórios em 20% a 35%',
      monitoring: 'Plano anestésico, pressão arterial, escores de dor e vigilância para disforia',
      notes:
        'Conversão prática: 2 µg/kg/min = 0,12 mg/kg/h | 5 µg/kg/min = 0,3 mg/kg/h | 10 µg/kg/min = 0,6 mg/kg/h. Regra de diluição: adicionar 60 mg de cetamina (0,6 mL da solução a 100 mg/mL) em 500 mL de NaCl 0,9% ou Ringer com Lactato (concentração = 0,12 mg/mL); a taxa de 1 mL/kg/h entrega exatamente 0,12 mg/kg/h (2 µg/kg/min).',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-bergadano-2009-ketamine-cri'],
      evidenceLevel: 'Ensaios Clínicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-both-status-epilepticus-acvim',
      species: 'both',
      indication: 'Estado de mal epiléptico refratário — Bolus de ataque e infusão contínua',
      doseMin: 0.5,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 2 a 3 minutos)',
      frequency: 'Bolus de ataque de 0,5 a 2 mg/kg IV lenta seguido de infusão contínua de 0,5 a 2 mg/kg/h',
      duration: 'Manter por 12 a 24 horas após controle das crises, realizando desmame escalonado',
      clinicalContext: 'Falha a benzodiazepínicos e anticonvulsivantes de segunda linha (Consenso ACVIM)',
      monitoring: 'Avaliação neurológica seriada, pressão arterial, saturação de oxigênio e temperatura',
      notes:
        'Interrompe a excitotoxicidade cálcio-dependente gerada pelos receptores NMDA externalizados sem causar a hipotensão acentuada característica do propofol ou pentobarbital em doses anestésicas.',
      referenceIds: ['ref-charalambous-2024-acvim-se', 'ref-roynard-2021-ketamine-se'],
      evidenceLevel: 'Diretriz de Consenso Internacional (ACVIM)',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
    {
      id: 'dose-cetamina-both-sc-dor-cronica',
      species: 'both',
      indication: 'Adjuvante subanestésico subcutâneo para dor crônica com sensibilização central',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC (Subcutânea)',
      frequency: 'Aplicações periódicas a cada 7 a 30 dias em ambiente ambulatorial supervisionado',
      duration: 'Avaliar resposta após 1 a 3 sessões; monitorar função renal e hepática',
      clinicalContext: 'Osteoartrite severa ou dor neuropática refratária com componente de alodinia',
      monitoring: 'Observação clínica por 60 minutos pós-aplicação e monitoramento de enzimas hepáticas e urinárias',
      notes:
        'A via subcutânea apresenta absorção gradual sem pico dissociativo, auxiliando na modulação da dor crônica em planos multimodais.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-cohen-2018-asra-chronic-pain'],
      evidenceLevel: 'Consensos de Dor Veterinária',
      calculatorEnabled: true,
      presentationId: 'pres-cetamina-inj-100',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'found-cetamina-entidades-receptor-nmda-hcn1',
      title: 'Quiralidade, Apresentações Veterinárias e Bloqueio dos Canais NMDA e HCN1',
      narrative:
        'Na rotina médico-veterinária, a cetamina é empregada principalmente como cloridrato de cetamina racêmica (solução injetável a 100 mg/mL ou 10%), composta por uma mistura 1:1 dos enantiômeros R(−)-cetamina e S(+)-cetamina. O enantiômero S(+) (escetamina) possui afinidade cerca de 3 a 4 vezes superior pelo poro do canal NMDA, conferindo aproximadamente o dobro da potência analgésica e hipnótica em relação à mistura racêmica — o que exige redução posológica de 30% a 50% quando formulada isoladamente.\n\n' +
        'O receptor NMDA é um canal iônico glutamatérgico heterotetramérico que conduz sódio e cálcio. Em repouso, seu poro permanece bloqueado por um íon magnésio (Mg²⁺). Com o estímulo nociceptivo intenso ou convulsões sustentadas, a membrana despolariza e expulsa o magnésio. A cetamina atua como antagonista não competitivo dependente do uso: ela penetra no poro aberto e impede a entrada maciça de cálcio. Adicionalmente, inibe os canais marcapasso neuronais HCN1, desincronizando os ritmos talamocorticais e gerando a inconsciência dissociativa com analgesia somática profunda.',
      narrativeHighlights: [
        'cetamina racêmica (100 mg/mL ou 10%)',
        'enantiômero S(+) (escetamina)',
        'afinidade cerca de 3 a 4 vezes superior',
        'antagonista não competitivo dependente do uso',
        'reduz o influxo de cálcio',
        'inibe os canais marcapasso neuronais HCN1',
        'desconexão talamocortical',
      ],
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina', 'ref-chen-2009-hcn1-ketamine'],
      studies: [
        {
          citation:
            'A inibição de canais marcapasso HCN1 contribui para o efeito hipnótico anestésico da cetamina (Chen et al., 2009)',
          referenceId: 'ref-chen-2009-hcn1-ketamine',
          sourceType: 'Estudo neurofisiológico e molecular mecanicista',
          summaryText:
            'Demonstrou que a cetamina inibe potentemente os canais marcapasso HCN1 ativados por hiperpolarização (corrente Ih) no tálamo e córtex, comprovando que a inconsciência anestésica vai além do bloqueio NMDA e envolve a desorganização dos ritmos oscilatórios talamocorticais.',
          summaryHighlights: [
            'inibe potentemente os canais marcapasso HCN1',
            'desorganização dos ritmos oscilatórios talamocorticais',
          ],
          clinicalConclusion:
            'Explica mecanisticamente a perda da percepção sensorial e a catalepsia características da anestesia dissociativa.',
        },
      ],
    },
    {
      id: 'found-cetamina-somação-temporal-wind-up',
      title: 'Mecanismo Anti-Hiperalgésico no Corno Dorsal: Bloqueio do Fenômeno de Wind-Up',
      narrative:
        'Durante agressões teciduais cirúrgicas ou traumáticas agudas, a estimulação nociceptiva contínua transmitida pelas fibras C desencadeia liberação cumulativa de glutamato e substância P no corno dorsal da medula espinhal. Isso remove o bloqueio por magnésio dos receptores NMDA pós-sinápticos e deflagra o fenômeno de somação temporal (wind-up), amplificando a mensagem dolorosa que sobe para o encéfalo e gerando sensibilização central com hiperalgesia e alodinia.\n\n' +
        'A infusão contínua de cetamina em doses subanestésicas (0,12 a 0,6 mg/kg/h) ocupa os receptores NMDA no corno dorsal medular, bloqueando a amplificação do sinal sem causar sedação profunda. Como benefício direto, reduz o consumo de anestésicos inalatórios (isoflurano/sevoflurano) em 20% a 35%, estabiliza a pressão arterial transoperatória e impede a tolerância aguda e a hiperalgesia induzida por opioides.',
      narrativeHighlights: [
        'estimulação nociceptiva contínua transmitida pelas fibras C',
        'somação temporal (wind-up)',
        'sensibilização central com hiperalgesia e alodinia',
        'infusão contínua de cetamina em doses subanestésicas (0,12 a 0,6 mg/kg/h)',
        'reduz o consumo de anestésicos inalatórios em 20% a 35%',
      ],
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-bergadano-2009-ketamine-cri', 'ref-schwenk-2018-asra-acute-pain'],
      studies: [
        {
          citation:
            'Efeitos antinociceptivos perioperatórios da infusão contínua de cetamina em cães submetidos a cirurgias ortopédicas (Wagner et al., 2002)',
          referenceId: 'ref-wagner-2002-ketamine-cri',
          sourceType: 'Ensaio clínico randomizado controlado por placebo em cães',
          summaryText:
            'Avaliou cães submetidos à amputação de membro torácico recebendo bolus de cetamina (0,5 mg/kg IV pré-incisional) seguido de infusão contínua de 10 µg/kg/min (0,6 mg/kg/h) no transoperatório e 2 µg/kg/min (0,12 mg/kg/h) por 18 horas no pós-operatório. O grupo tratado apresentou escores de dor significativamente menores entre 12 e 18 horas e recuperação motora mais ativa.',
          summaryHighlights: [
            'bolus pré-incisional de cetamina (0,5 mg/kg IV)',
            'infusão transoperatória de 10 µg/kg/min (0,6 mg/kg/h)',
            'pós-operatória de 2 µg/kg/min (0,12 mg/kg/h)',
            'escores de dor significativamente menores',
          ],
          clinicalConclusion:
            'Validou na medicina veterinária o regime de referência para prevenção da somação temporal medular em cirurgias de grande porte.',
        },
        {
          citation:
            'Efeito da infusão contínua de cetamina sobre a sensibilização central e a concentração alveolar mínima em cães (Bergadano et al., 2009)',
          referenceId: 'ref-bergadano-2009-ketamine-cri',
          sourceType: 'Ensaio clínico farmacodinâmico em cães cirúrgicos',
          summaryText:
            'Demonstrou que a infusão em taxa constante de cetamina reduz a concentração alveolar mínima do isoflurano de maneira dose-dependente e atenua os limiares mecânicos de hiperalgesia pós-operatória na área peri-incisional.',
          summaryHighlights: [
            'reduz a concentração alveolar mínima do isoflurano',
            'atenua os limiares mecânicos de hiperalgesia pós-operatória',
          ],
          clinicalConclusion:
            'Comprova o efeito poupador de anestésico inalatório e o controle objetivo da hiperalgesia secundária em cães.',
        },
      ],
    },
    {
      id: 'found-cetamina-status-epilepticus-neuroprotecao',
      title: 'Manejo Neuroprotetor no Estado de Mal Epiléptico Refratário em Pequenos Animais',
      narrative:
        'Em crises convulsivas prolongadas (>15 a 30 minutos), os neurônios sofrem endocitose progressiva dos receptores inibitórios GABA-A, o que explica por que doses repetidas de diazepam ou midazolam perdem a capacidade de conter a atividade epiléptica. Simultaneamente, receptores excitatórios NMDA são sintetizados e externalizados na membrana pós-sináptica, criando um ciclo vicioso de despolarização contínua e influxo descontrolado de cálcio.\n\n' +
        'Nesse cenário refratário, a cetamina surge como agente mecanístico ideal. Ao bloquear diretamente o poro aberto dos receptores NMDA, corta a cascata excitotóxica intracelular e o edema celular. Além disso, ao contrário dos anestésicos intravenosos convencionais (propofol e barbitúricos), a cetamina não reduz drasticamente o tônus simpático nem a pressão arterial, preservando a pressão de perfusão cerebral essencial em pacientes críticos.',
      narrativeHighlights: [
        'endocitose progressiva dos receptores inibitórios GABA-A',
        'externalização de receptores excitatórios NMDA',
        'interrompe a cascata excitotóxica',
        'preserva a pressão de perfusão cerebral',
      ],
      referenceIds: ['ref-charalambous-2024-acvim-se', 'ref-roynard-2021-ketamine-se'],
      studies: [
        {
          citation:
            'Declaração de consenso do ACVIM sobre o manejo do estado de mal epiléptico e crises em agrupamento em cães e gatos (Charalambous et al., 2024)',
          referenceId: 'ref-charalambous-2024-acvim-se',
          sourceType: 'Diretriz de consenso internacional em neurologia veterinária',
          summaryText:
            'Estabeleceu o protocolo escalonado no estado de mal epiléptico veterinário, recomendando bolus de cetamina (0,5 a 2 mg/kg IV, até 5 mg/kg) seguido de infusão contínua (0,5 a 2 mg/kg/h) na fase refratária para bloquear receptores NMDA suprarregulados.',
          summaryHighlights: [
            'bolus de cetamina (0,5 a 2 mg/kg IV)',
            'infusão contínua (0,5 a 2 mg/kg/h)',
            'bloquear receptores NMDA suprarregulados',
          ],
          clinicalConclusion:
            'Consolidou a cetamina como o anticonvulsivante de terceira linha e agente neuroprotetor de escolha no estado de mal epiléptico refratário em pequenos animais.',
        },
        {
          citation:
            'Uso da cetamina no tratamento do estado de mal epiléptico refratário em pequenos animais: revisão e evidências (Roynard et al., 2021)',
          referenceId: 'ref-roynard-2021-ketamine-se',
          sourceType: 'Revisão clínica e farmacológica veterinária',
          summaryText:
            'Revisou a base fisiopatológica do tráfego de receptores NMDA durante a refratariedade epiléptica em cães e gatos, comprovando alta eficácia no controle de crises persistentes sem induzir a depressão cardiorrespiratória dos barbitúricos.',
          summaryHighlights: [
            'eficácia no controle de crises persistentes',
            'sem induzir depressão cardiorrespiratória acentuada',
          ],
          clinicalConclusion:
            'Ressalta a importância do início precoce da infusão contínua de cetamina assim que constatada a falha aos benzodiazepínicos.',
        },
      ],
    },
    {
      id: 'found-cetamina-seguranca-multissistemica',
      title: 'Segurança Hemodinâmica, Hepática, Urológica e Peculiaridades de Espécie',
      narrative:
        'A aplicação clínica segura da cetamina exige atenção a quatro particularidades multissistêmicas:\n\n' +
        '1. Paradoxo cardiovascular: A cetamina estimula o sistema nervoso simpático central e bloqueia a recaptação de noradrenalina, elevando moderadamente a pressão arterial e o débito em animais normovolêmicos. Contudo, em estados de choque descompensado com exaustão simpática, seu efeito inotrópico negativo direto sobre a fibra miocárdica é desmascarado, podendo provocar queda abrupta da contratilidade cardíaca.\n\n' +
        '2. Laringe e via aérea em felinos: Gatos sob anestesia dissociativa mantêm reflexos laríngeos e faríngeos exacerbados. A tentativa de intubação orotraqueal sem bloqueio tópico prévio desencadeia laringoespasmo grave e hipóxia súbita, sendo mandatório dessensibilizar a glote com lidocaína a 2% sem vasoconstritor antes da intubação.\n\n' +
        '3. Metabolismo hepático e excreção renal comparada: Em cães, a biotransformação em norcetamina e derivados hidrossolúveis é rápida pelas enzimas microssomais (CYP2B11 e CYP3A12). Gatos possuem deficiência de glicuronidação (UGT1A6) e dependem da excreção renal de norcetamina inalterada — em nefropatas ou obstruções uretrais, a norcetamina acumula-se, gerando sedação prolongada por muitas horas.\n\n' +
        '4. Toxicidade em infusões repetidas: Cursos muito prolongados (>24 a 48 horas) exigem controle das enzimas hepáticas (ALT, fosfatase alcalina). O uso crônico repetido associa-se a cistite química ulcerativa pela agressão de metabólitos no urotélio.',
      narrativeHighlights: [
        'paradoxo cardiovascular',
        'depleção de catecolaminas no choque descompensado',
        'laringoespasmo grave em gatos',
        'lidocaína a 2% tópica nas aritenoides',
        'deficiência de glicuronidação em gatos',
        'acúmulo de norcetamina em nefropatas',
      ],
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-shah-2019-quad-ketamine', 'ref-noppens-2012-dili-ketamine'],
      studies: [
        {
          citation:
            'Protocolo quádruplo com cetamina para analgesia e estabilidade perioperatória em gatas (Shah et al., 2019)',
          referenceId: 'ref-shah-2019-quad-ketamine',
          sourceType: 'Ensaio clínico prospectivo em felinos cirúrgicos',
          summaryText:
            'Avaliou gatas submetidas a ovarioisterectomia recebendo protocolo anestésico quádruplo à base de cetamina intramuscular combinada a dexmedetomidina e opioide. Demonstrou excelente estabilidade hemodinâmica, ausência de complicações ventilatórias e recuperação suave.',
          summaryHighlights: [
            'protocolo anestésico quádruplo intramuscular',
            'excelente estabilidade hemodinâmica',
            'recuperação suave',
          ],
          clinicalConclusion:
            'Comprova a alta segurança e eficácia das associações multimodais com baixas doses de cetamina em pequenos animais.',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Uso de baixas doses de cetamina administradas por infusão contínua como adjuvante para analgesia pós-operatória em cães',
      authorsYear: 'Wagner AE, Walton JA, Hellyer PW, Gaynor JS, Mama KR (2002)',
      journal: 'Jornal da Associação Americana de Medicina Veterinária (JAVMA)',
      studyDesign: 'Ensaio clínico randomizado, duplo-cego, controlado por placebo em cães',
      sampleSize: '27 cães submetidos à amputação de membro torácico',
      methodology:
        'Cães anestesiados receberam opioide padronizado e foram randomizados para bolus de cetamina (0,5 mg/kg IV pré-incisional) seguido de infusão contínua de 10 µg/kg/min (0,6 mg/kg/h) no transoperatório e 2 µg/kg/min (0,12 mg/kg/h) por 18 horas no pós-operatório, ou solução salina.',
      mainFindings:
        'Cães no grupo cetamina apresentaram escores de dor significativamente inferiores entre 12 e 18 horas de pós-operatório e escores de atividade física superiores no terceiro dia.',
      clinicalTakeaway:
        'Validou na anestesiologia veterinária o protocolo padrão de bolus de ataque (0,5 mg/kg IV) seguido de infusão contínua analgésica (0,12 a 0,6 mg/kg/h) para bloqueio do fenômeno de wind-up.',
      referenceId: 'ref-wagner-2002-ketamine-cri',
    },
    {
      title: 'Declaração de consenso do ACVIM sobre o manejo do estado de mal epiléptico e crises agrupadas em cães e gatos',
      authorsYear: 'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA (2024)',
      journal: 'Jornal de Medicina Interna Veterinária (JVIM)',
      studyDesign: 'Diretriz de consenso internacional de especialistas em neurologia (ACVIM)',
      sampleSize: 'Painel internacional de neurologia veterinária (cães e gatos)',
      methodology:
        'Revisão sistemática de evidências veterinárias para estruturar o algoritmo escalonado de manejo emergencial de crises epilépticas.',
      mainFindings:
        'Constatou a perda de sensibilidade aos benzodiazepínicos após crises prolongadas pela internalização de receptores GABA-A e recomendou formalmente bolus de cetamina (0,5 a 2 mg/kg IV) seguido de infusão contínua (0,5 a 2 mg/kg/h) na fase refratária.',
      clinicalTakeaway:
        'A cetamina é o agente neuroprotetor de escolha no estado de mal epiléptico refratário, bloqueando receptores NMDA externalizados sem deprimir gravemente a hemodinâmica.',
      referenceId: 'ref-charalambous-2024-acvim-se',
    },
    {
      title: 'Comparação anestésica e analgésica em protocolo quádruplo com cetamina em gatas submetidas a ovarioisterectomia',
      authorsYear: 'Shah M, Yates D, Hunt J, Murrell J (2019)',
      journal: 'Jornal de Medicina e Cirurgia Felina (JFMS)',
      studyDesign: 'Ensaio clínico prospectivo randomizado em felinos',
      sampleSize: 'Gatas submetidas a cirurgia eletiva de esterilização',
      methodology:
        'Avaliou a associação de cetamina intramuscular (5 mg/kg) com dexmedetomidina, midazolam e opioides para contenção, indução dissociativa e analgesia transoperatória.',
      mainFindings:
        'A inclusão da cetamina proporcionou plano anestésico estável, relaxamento adequado em associação e menor necessidade de suplementação analgésica no pós-operatório.',
      clinicalTakeaway:
        'Demonstrou a eficácia e segurança da indução dissociativa multimodal por via intramuscular em pacientes felinos.',
      referenceId: 'ref-shah-2019-quad-ketamine',
    },
    {
      title: 'Uso da cetamina no tratamento do estado de mal epiléptico refratário em pequenos animais: revisão de farmacologia e evidências clínicas',
      authorsYear: 'Roynard P, Frank C, et al. (2021)',
      journal: 'Fronteiras na Ciência Veterinária (Frontiers in Veterinary Science)',
      studyDesign: 'Revisão sistemática e estudo observacional em pequenos animais',
      sampleSize: 'Cães e gatos com crises convulsivas prolongadas refratárias',
      methodology:
        'Análise da farmacodinâmica do bloqueio NMDA e do desfecho clínico em pacientes neurológicos submetidos à infusão contínua de cetamina.',
      mainFindings:
        'A infusão de cetamina interrompeu com sucesso crises convulsivas refratárias em animais onde múltiplos fármacos gabaérgicos haviam falhado, reduzindo lesão cerebral secundária.',
      clinicalTakeaway:
        'A administração de cetamina deve ser iniciada precocemente no estado de mal epiléptico refratário para evitar morte neuronal por influxo contínuo de cálcio.',
      referenceId: 'ref-roynard-2021-ketamine-se',
    },
    {
      title: 'Efeito antinociceptivo da infusão contínua de cetamina sobre a concentração alveolar mínima do isoflurano em cães',
      authorsYear: 'Bergadano A, Schatzmann U, Moens Y, Spadavecchia C (2009)',
      journal: 'Jornal de Farmacologia e Terapêutica Veterinária (JVPT)',
      studyDesign: 'Ensaio clínico controlado experimental em cães',
      sampleSize: 'Cães avaliados sob estimulação nociceptiva mecânica e térmica',
      methodology:
        'Determinou a alteração dos limiares nociceptivos e a redução na concentração alveolar mínima (CAM) do anestésico inalatório sob diferentes taxas de infusão de cetamina.',
      mainFindings:
        'A infusão contínua produziu redução marcante e dose-dependente na CAM do isoflurano (cerca de 25% a 30%) e bloqueou os reflexos motores de resposta ao estímulo doloroso.',
      clinicalTakeaway:
        'Comprova o efeito poupador de anestésico inalatório e o bloqueio da transmissão espinhal da dor com taxas subanestésicas de cetamina em cães.',
      referenceId: 'ref-bergadano-2009-ketamine-cri',
    },
  ],

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV)',
        technique:
          'Administração lenta ao longo de 60 a 90 segundos para co-indução ou indução dissociativa. Para analgesia preventiva (wind-up), administrar bolus inicial de 0,25 a 0,5 mg/kg seguido de infusão contínua em taxa constante (ICR) em bomba volumétrica ou de seringa.',
        nursingCare:
          'Injeção rápida em bolus IV pode induzir apneia imediata ou padrão apnêustico. Manter material de intubação orotraqueal e oxigênio sob fluxo contínuo.',
        limitations: 'Nunca administrar em bolus rápido em menos de 30 segundos.',
      },
      {
        route: 'Intramuscular profunda (IM)',
        technique:
          'Injeção em grandes massas musculares (quadríceps femoral ou musculatura epaxial lombar). Início de ação em 3 a 5 minutos com efeito máximo em 10 a 15 minutos.',
        nursingCare:
          'O pH ácido da solução comercial (pH 3,5 a 5,5) causa dor e ardor transitório à injeção. Fracionar volumes se necessário em animais de porte pequeno a médio.',
        limitations: 'Evitar injeção perivascular ou próxima a trajetos neurais.',
      },
      {
        route: 'Subcutânea (SC)',
        technique:
          'Injeção no tecido celular subcutâneo interescapular ou dorso-lateral. Absorção gradual (início em 15 a 30 minutos) com biodisponibilidade em torno de 64%, útil em protocolos adjuvantes de dor crônica.',
        nursingCare: 'Observar ausência de sensibilidade dolorosa local prolongada.',
        limitations: 'Início de ação mais lento, não recomendada para induções anestésicas emergenciais.',
      },
      {
        route: 'Transmucosa oral felina (OTM)',
        technique:
          'Deposição do volume da solução concentrada diretamente na cavidade oral ou mucosa gengival em felinos sob alto estresse.',
        nursingCare:
          'Manter a cabeça ligeiramente elevada para evitar deglutição imediata; atentar para sialorreia pelo sabor ácido.',
        limitations: 'Biodisponibilidade inferior e variável (~30% a 40%) comparada às vias parenterais.',
      },
      {
        route: 'Epidural / Neuroaxial',
        technique:
          'Injeção no espaço epidural lombossacro (L7-S1) utilizando exclusivamente formulações aquosas sem conservantes químicos (livres de cloreto de benzalcônio ou clorobutanol).',
        nursingCare: 'Garantir técnica estéril rigorosa e ausência de líquor ou sangue na agulha.',
        limitations: 'Proibido utilizar formulações comerciais com conservantes pelo risco de mielopatia neurotóxica.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Solução de Cloreto de Sódio 0,9% (Fisiológica)',
        'Solução de Ringer com Lactato',
        'Solução Glicosada a 5%',
      ],
      incompatibleFluids: [
        'Barbitúricos injetáveis (tiopental - precipitação imediata por pH alcalino)',
        'Diazepam injetável (risco de turvação físico-química por solventes)',
        'Bicarbonato de sódio e soluções alcalinas',
      ],
      infusionRateGuidance:
        'Para infusão contínua subanestésica analgésica (0,12 a 0,6 mg/kg/h ou 2 a 10 µg/kg/min), homogeneizar a dose em bolsa de Ringer com Lactato ou NaCl 0,9% devidamente identificada e infundir em bomba de seringa ou bomba de infusão volumétrica.',
      preparationNotes:
        'Inspecionar visualmente o frasco ou a bolsa quanto à limpidez antes da administração. Manter o frasco original fechado em temperatura ambiente (15 a 30 °C), ao abrigo da luz.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Biotransformação oxidativa rápida e necessidade imperativa de miorrelaxamento',
        description:
          'Em cães, a metabolização hepática em norcetamina é rápida (meia-vida de 40 a 60 minutos). Se administrada isolada, desencadeia hipertonia muscular severa, rigidez extensora, espasmos e tremores mioclônicos, sendo obrigatória a associação de agentes miorrelaxantes (midazolam, propofol ou agonistas alfa-2).',
        clinicalImplications:
          'Nunca utilizar cetamina isolada em cães. Associar sempre a relaxantes musculares para garantir plano cirúrgico adequado e recuperação sem disforia.',
      },
      {
        species: 'cat',
        title: 'Excreção renal de norcetamina, laringoespasmo e reflexo ocular preservado',
        description:
          'Devido à deficiência constitucional na via de glicuronidação (UGT1A6), gatos eliminam a norcetamina ativa de forma substancialmente inalterada pelos rins. Em nefropatas graves ou obstruções uretrais, o metabólito ativo acumula-se gerando sedação prolongada. Além disso, gatos mantêm reflexos laríngeos exacerbados que predisponham ao laringoespasmo e midríase paralítica fixa sob dissociação.',
        clinicalImplications:
          'Instilar obrigatoriamente lidocaína tópica a 2% na laringe antes da intubação. Aplicar colírio ou pomada oftálmica lubrificante a cada 2 horas para proteger a córnea. Reduzir doses em 30% a 50% em gatos com doença renal avançada (IRIS 3 ou 4).',
      },
    ],
    prescriptionType: {
      category: 'Medicamento Psicotrópico sob Controle Especial (Lista B1)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 676/2022',
      retentionRequired: true,
      guidelines:
        'Uso exclusivo em estabelecimentos de saúde veterinários licenciados (hospitais, clínicas e ambulatórios). Notificação de Receita B Veterinária ou Receita de Controle Especial em duas vias com retenção da primeira via. Registro obrigatório em livro oficial de psicotrópicos e guarda em armário trancado sob chave.',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Derivado da arilciclohexilamina (análogo estrutural da fenciclidina)',
      chemicalClassDescription:
        'Composto quiral que dissocia eletrofisiologicamente o córtex cerebral das estruturas límbicas e subcorticais.',
      therapeuticClass:
        'Anestésico dissociativo, analgésico preventivo modulador de wind-up e anticonvulsivante de resgate',
      therapeuticClassDescription:
        'Antagonista não competitivo dependente do uso do poro do canal de cálcio associado ao receptor NMDA.',
    },
  },

  attentionData: {
    attentionSubtitle:
      'Diretrizes de segurança clínica, contraindicações e manejo de eventos adversos na rotina veterinária',
    precautions: [
      {
        condition: 'Cardiomiopatia hipertrófica obstrutiva felina (CMH) e cardiopatias avançadas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O estímulo simpático indireto aumenta a pós-carga ventricular e o consumo miocárdico de oxigênio. Em animais com obstrução dinâmica da via de saída do ventrículo esquerdo, esse aumento na demanda miocárdica sobreposto ao efeito inotrópico negativo direto pode descompensar insuficiência cardíaca ou induzir arritmias.',
        clinicalAction:
          'Contraindicada em felinos com cardiomiopatia hipertrófica obstrutiva descompensada. Priorizar protocolos à base de opioides puros, alfaxalona ou propofol.',
      },
      {
        condition: 'Trauma cranioencefálico com hipoventilação espontânea ou hipertensão intracraniana',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Em pacientes respirando espontaneamente, doses elevadas podem induzir hipoventilação e hipercapnia, resultando em vasodilatação cerebral e elevação da pressão intracraniana. Sob ventilação mecânica controlada e normocapnia, esse efeito não ocorre.',
        clinicalAction:
          'Evitar doses anestésicas elevadas em ventilação espontânea se houver hipertensão intracraniana. No estado de mal epiléptico, manter paciente intubado e sob ventilação mecânica assistida com capnografia.',
      },
      {
        condition: 'Glaucoma agudo, descemetocele ou úlcera de córnea perfurante',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A cetamina eleva o tônus da musculatura extraocular e a pressão intraocular basal (PIO), gerando risco iminente de extrusão do conteúdo intraocular em globos fragilizados.',
        clinicalAction:
          'Contraindicada em cirurgias de perfuração corneana ou glaucoma agudo descompensado.',
      },
      {
        condition: 'Doença renal crônica avançada em felinos (Estágios IRIS 3 e 4)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Gatos dependem criticamente da excreção renal para depurar a norcetamina ativa. Em nefropatas graves com queda da filtração glomerular, ocorre retenção de metabólitos ativos com ataxia e sedação excessivamente prolongadas.',
        clinicalAction:
          'Reduzir a dose de indução e manutenção em 30% a 50% em felinos nefropatas e garantir hidratação parenteral adequada.',
      },
      {
        condition: 'Insuficiência hepática aguda ou lipidose hepática severa',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A biotransformação inicial depende das enzimas microssomais hepáticas. Hepatopatas graves exibem clearance plasmático lentificado e recuperação arrastada.',
        clinicalAction:
          'Titular doses mínimas eficazes e monitorar o nível de consciência e recuperação.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Rigidez muscular, hipertonia extensora e mioclonias',
        frequency: 'very_common',
        mechanism:
          'Dissociação das vias motoras extrapiramidais e manutenção de reflexos espinhais sem bloqueio da transmissão neuromuscular.',
        clinicalManagement:
          'Sempre coadministrar agentes relaxantes musculares: benzodiazepínicos (midazolam 0,2 mg/kg) ou agonistas alfa-2 (dexmedetomidina).',
      },
      {
        effect: 'Sialorreia e aumento de secreções traqueobrônquicas',
        frequency: 'common',
        mechanism: 'Estímulo colinérgico indireto de gânglios centrais.',
        clinicalManagement:
          'Aspirar secreções orofaríngeas durante o procedimento cirúrgico; manter a via aérea intubada.',
      },
      {
        effect: 'Despertar disfórico, vocalização e ataxia',
        frequency: 'common',
        mechanism:
          'Distorções sensoriais na transição da desconexão talamocortical para o estado de vigília.',
        clinicalManagement:
          'Acomodar o paciente em ambiente calmo, com pouca luminosidade e silencioso. Em caso de disforia marcada, administrar microdoses de dexmedetomidina (0,5 a 1 µg/kg IV).',
      },
      {
        effect: 'Manutenção da fenda palpebral aberta com midríase fixa',
        frequency: 'very_common',
        mechanism: 'Preservação de reflexos de tronco e predomínio simpático pupilar.',
        clinicalManagement:
          'Aplicação recorrente de colírio ou pomada oftálmica lubrificante a cada 2 horas até a recuperação do reflexo de piscar voluntário.',
      },
      {
        effect: 'Apneia temporária em bolus intravenoso rápido',
        frequency: 'uncommon',
        mechanism: 'Pausa respiratória inspiratória sustentada (padrão apnêustico) no centro respiratório bulbar.',
        clinicalManagement:
          'Administrar a injeção intravenosa de forma lenta e cadenciada ao longo de 60 a 90 segundos; manter suporte ventilatório disponível.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Gatos nefropatas crônicos (Estágios IRIS 3 e 4)',
        recommendedAdjustment:
          'Reduzir as doses em 30% a 50%, evitando infusões contínuas muito longas (>24 horas).',
        physiologicalRationale:
          'Excreção renal dependente da integridade da taxa de filtração para eliminar a norcetamina ativa.',
      },
      {
        clinicalCondition: 'Hepatopatas com insuficiência de síntese',
        recommendedAdjustment:
          'Reduzir a dose inicial em 25% a 50% e espaçar reavaliações clínicas.',
        physiologicalRationale:
          'Declínio da atividade microssomal do citocromo P450 e redução do clearance plasmático.',
      },
      {
        clinicalCondition: 'Choque circulatório descompensado com exaustão adrenérgica',
        recommendedAdjustment:
          'Reduzir a dose de indução para 0,5 a 1 mg/kg IV lenta, apenas após ressuscitação volêmica.',
        physiologicalRationale:
          'Ausência de tônus simpático compensatório, desmascarando a ação inotrópica negativa direta.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Anestésicos inalatórios (Isoflurano e Sevoflurano)',
        severity: 'moderate',
        clinicalEffect:
          'Redução significativa da concentração alveolar mínima (CAM) dos halogenados em até 20% a 35%.',
        pharmacologicalMechanism:
          'Sinergismo na inibição da transmissão sináptica nociceptiva espinhal e dissociação talamocortical.',
      },
      {
        drugOrClass: 'Agonistas alfa-2 adrenérgicos (Dexmedetomidina e Xilazina)',
        severity: 'informational',
        clinicalEffect:
          'Associação sinérgica de excelência: proporciona relaxamento muscular estrito, estabilidade hemodinâmica e despertar suave.',
        pharmacologicalMechanism:
          'Complementação mútua entre a sedação pré-sináptica alfa-2 e o bloqueio pós-sináptico NMDA.',
      },
      {
        drugOrClass: 'Bloqueadores adrenérgicos e vasodilatadores severos',
        severity: 'major',
        clinicalEffect:
          'Hipotensão arterial marcante por perda da resposta simpática compensatória.',
        pharmacologicalMechanism:
          'A perda do tônus simpático desmascara a ação inotrópica negativa direta da cetamina.',
      },
      {
        drugOrClass: 'Cloranfenicol injetável',
        severity: 'moderate',
        clinicalEffect:
          'Prolongamento expressivo do período de anestesia e do tempo até o despertar completo.',
        pharmacologicalMechanism:
          'Inibição enzimática competitiva do citocromo P450 microssomal hepático.',
      },
    ],
  },

  presentations: [
    {
      id: 'pres-cetamina-inj-100',
      name: 'Cloridrato de Cetamina 100 mg/mL (10%) Solução Injetável',
      brand: 'Cetamin / Dopalen / Ketamina Agener / Quetamina',
      form: 'Solução injetável estéril',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola de vidro âmbar de 10 mL ou 50 mL',
      route: 'Intravenosa, Intramuscular ou Subcutânea',
      channel: 'veterinary',
      presentation: 'Frasco-ampola com 100 mg/mL (1 mL = 100 mg)',
      commercialType: 'Uso Veterinário',
      packageDescription: 'Frasco-ampola com 100 mg/mL de cetamina racêmica de uso hospitalar veterinário',
      calculatedMlPerKgFormula: 'Dose em mg dividida por 100 mg/mL',
    },
    {
      id: 'pres-cetamina-inj-50',
      name: 'Cloridrato de Cetamina 50 mg/mL (5%) Solução Injetável',
      brand: 'Vetanarcol / Ketalex / Cetaminol',
      form: 'Solução injetável estéril',
      concentrationValue: 50,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola de 10 mL ou 50 mL',
      route: 'Intravenosa ou Intramuscular profunda',
      channel: 'veterinary',
      presentation: 'Frasco-ampola com 50 mg/mL (1 mL = 50 mg)',
      commercialType: 'Uso Veterinário',
      packageDescription: 'Frasco-ampola com 50 mg/mL de cetamina racêmica',
      calculatedMlPerKgFormula: 'Dose em mg dividida por 50 mg/mL',
    },
    {
      id: 'pres-escetamina-inj-50',
      name: 'Cloridrato de Escetamina (S-cetamina) 50 mg/mL',
      brand: 'Ketamin-S / Cristália Escetamina',
      form: 'Solução injetável com enantiômero S+ puro',
      concentrationValue: 50,
      concentrationUnit: 'mg/mL',
      packInfo: 'Ampola hospitalar de 2 mL contendo 50 mg/mL',
      route: 'Intravenosa ou Intramuscular',
      channel: 'human_pharmacy',
      presentation: 'Ampola de 2 mL com 50 mg/mL de escetamina',
      commercialType: 'Hospitalar (Uso Humano/Veterinário)',
      packageDescription: 'Formulação de alta afinidade NMDA (potência ~2 vezes superior)',
      calculatedMlPerKgFormula: 'Dose calculada reduzida pela metade em relação à racêmica',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Calibrador Posológico Prático da Solução Injetável 100 mg/mL para Bolus Analgésico Subanestésico Pré-Cirúrgico de 0,5 mg/kg IV/IM (Volume: 0,005 mL/kg)',
    headers: [
      'Peso Corporal',
      'Dose Total (mg)',
      'Cetamina 100 mg/mL (mL)',
      'Seringa Recomendada',
    ],
    rows: [
      {
        weight: '1 kg',
        totalDose: '0,5 mg',
        col1: '0,005 mL (diluir 1:10 em NaCl 0,9%)',
        col2: 'Seringa de Insulina 100 UI / 1 mL',
      },
      {
        weight: '2 kg',
        totalDose: '1,0 mg',
        col1: '0,01 mL',
        col2: 'Seringa de Insulina 100 UI / 1 mL',
      },
      {
        weight: '4 kg',
        totalDose: '2,0 mg',
        col1: '0,02 mL',
        col2: 'Seringa de Insulina 100 UI / 1 mL',
      },
      {
        weight: '5 kg',
        totalDose: '2,5 mg',
        col1: '0,025 mL',
        col2: 'Seringa de Insulina 100 UI / 1 mL',
      },
      {
        weight: '10 kg',
        totalDose: '5,0 mg',
        col1: '0,05 mL',
        col2: 'Seringa de 1 mL',
      },
      {
        weight: '20 kg',
        totalDose: '10,0 mg',
        col1: '0,10 mL',
        col2: 'Seringa de 1 mL ou 3 mL',
      },
      {
        weight: '30 kg',
        totalDose: '15,0 mg',
        col1: '0,15 mL',
        col2: 'Seringa de 3 mL',
      },
      {
        weight: '40 kg',
        totalDose: '20,0 mg',
        col1: '0,20 mL',
        col2: 'Seringa de 3 mL',
      },
    ],
  },

  genericBrandsNote:
    'Apresentações veterinárias no Brasil: Cetamin (Syntec), Dopalen (Ceva), Ketamina Agener (Agener União), Quetamina (Vetnil) e Ketalex, além da formulação hospitalar de escetamina Ketamin-S (Cristália). Medicamento psicotrópico da Lista B1 de controle especial estrito.',

  contraindications: [
    'Cardiomiopatia hipertrófica obstrutiva descompensada em felinos',
    'Hipertensão arterial sistêmica grave não controlada',
    'Trauma craniano grave com hipertensão intracraniana descompensada em ventilação espontânea',
    'Glaucoma agudo, úlcera de córnea profunda ou lesões perfurantes no globo ocular',
    'Uso como agente anestésico único em cães sem miorrelaxante associado',
    'Hipersensibilidade conhecida aos derivados de ciclohexilamina',
  ],

  cautions: [
    'Gatos idosos ou com doença renal crônica avançada (IRIS estágios 3 e 4) necessitam de redução posológica de 30% a 50%',
    'Hepatopatas graves necessitam de monitoramento da velocidade de recuperação e do nível de consciência',
    'Pacientes em choque circulatório descompensado podem apresentar hipotensão por efeito inotrópico negativo direto',
    'Aplicação obrigatória e recorrente de colírio lubrificante a cada 2 horas devido à midríase paralítica e ausência de piscar',
    'Recuperação do paciente em ambiente calmo, aquecido, com baixa luminosidade e acolchoado para prevenir disforia',
  ],

  adverseEffects: [
    'Rigidez muscular intensa, hipertonia e tremores (quando administrada sem relaxante muscular)',
    'Sialorreia e aumento de secreções respiratórias',
    'Midríase persistente com fenda palpebral aberta e risco de ceratite por dessecação',
    'Taquicardia e elevação transitória da pressão arterial',
    'Apneia temporária ou respiração apnêustica em injeção intravenosa rápida',
    'Vocalização, disforia e ataxia durante a recuperação anestésica',
  ],

  interactions: [
    'Anestésicos inalatórios (Isoflurano/Sevoflurano): redução da CAM em 20% a 35%',
    'Agonistas alfa-2 adrenérgicos (Dexmedetomidina/Xilazina): excelente sinergismo com relaxamento muscular estrito',
    'Benzodiazepínicos (Midazolam/Diazepam): neutralizam a hipertonia muscular e as mioclonias',
    'Cloranfenicol: inibição enzimática microssomal prolongando o tempo de anestesia',
    'Vasodilatadores severos ou bloqueadores adrenérgicos: podem desmascarar hipotensão por inotropismo negativo',
  ],

  routes: [
    'Intravenosa (IV)',
    'Intramuscular profunda (IM)',
    'Subcutânea (SC)',
    'Transmucosa oral felina (OTM)',
    'Epidural / Neuroaxial (sem conservantes)',
  ],

  administration: [
    'Para co-indução anestésica ou controle de crises convulsivas, administrar a solução IV de forma lenta ao longo de 60 a 90 segundos.',
    'Sempre associar relaxantes musculares (midazolam 0,2 mg/kg ou dexmedetomidina 1 a 5 µg/kg) para anular a rigidez extensora e a catalepsia.',
    'Para infusão contínua analgésica (ICR subanestésica), utilizar bomba de infusão mecânica e diluir em solução de NaCl 0,9% ou Ringer com Lactato.',
    'Aplicar colírio lubrificante em ambos os olhos imediatamente após a indução e a cada 2 horas até a recuperação do piscar voluntário.',
    'Em felinos reativos, a via intramuscular associada a agonistas alfa-2 e opioides proporciona contenção rápida e suave.',
  ],

  monitoringParameters: [
    'Frequência e ritmo cardíaco via eletrocardiograma contínuo',
    'Pressão arterial sistólica, média e diastólica (método Doppler vascular ou oscilométrico)',
    'Saturação de oxigênio (SpO2) e capnografia (EtCO2) para controle da ventilação',
    'Lubrificação da superfície corneana',
    'Temperatura corporal central (prevenção ativa de hipotermia com colchão térmico)',
    'Qualidade do despertar e tono muscular na fase pós-operatória',
  ],

  clientInformation: [
    'A cetamina é uma medicação de uso exclusivamente hospitalar e ambulatorial sob vigilância do médico-veterinário, sendo proibida para uso doméstico contínuo pelo tutor.',
    'Após o procedimento anestésico, o animal pode apresentar um despertar confuso, olhar fixo, desorientação e perda transitória de equilíbrio por algumas horas.',
    'Mantenha o animal em ambiente calmo, com pouca luminosidade, sem barulhos e em cama baixa no chão, evitando escadas e piscinas.',
    'Como o medicamento impede o piscar completo durante a anestesia, um colírio lubrificante é aplicado nos olhos para proteger a córnea contra ressecamento.',
    'Ofereça água e alimento úmido em pequenos volumes somente após o animal estar totalmente acordado, firme e com o reflexo de deglutição restabelecido.',
  ],

  references: [
    {
      id: 'ref-plumbs-10-audit-cetamina',
      citation:
        'Formulário Farmacológico Veterinário de Plumb, 10ª edição (2023). Monografia de Cetamina, pp. 684-688. Wiley-Blackwell.',
      sourceType: 'Livro / Tratado Farmacológico Veterinário',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781119853909',
      relevance:
        'Compêndio farmacológico de referência estabelecendo as doses analgésicas, anestésicas e de infusão contínua em cães e gatos, vias de administração e perfis de segurança.',
    },
    {
      id: 'ref-bsava-10-cetamina',
      citation:
        'Formulário de Pequenos Animais da BSAVA, Parte A: Caninos e Felinos, 10ª edição (2020). Monografia de Cetamina, pp. 210-212. Associação Veterinária Britânica de Pequenos Animais.',
      sourceType: 'Formulário Veterinário Internacional (BSAVA)',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      relevance:
        'Diretriz britânica padrão-ouro cobrindo protocolos de sedação multimodal, infusão contínua para analgesia e particularidades de excreção renal em gatos.',
    },
    {
      id: 'ref-wagner-2002-ketamine-cri',
      citation:
        'Efeitos antinociceptivos perioperatórios da infusão contínua de cetamina em cães submetidos a cirurgias ortopédicas. Wagner AE, Walton JA, Hellyer PW, Gaynor JS, Mama KR (2002). Jornal da Associação Americana de Medicina Veterinária, 221(9):1272-1275.',
      sourceType: 'Ensaio Clínico em Cães (Cirurgia Ortopédica)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12433140/',
      relevance:
        'Ensaio clínico seminal de infusão contínua (0,5 mg/kg bolus seguido de 10 µg/kg/min) demonstrando redução marcante do consumo pós-operatório de opioides e alívio da dor aguda.',
    },
    {
      id: 'ref-charalambous-2024-acvim-se',
      citation:
        'Declaração de Consenso do ACVIM sobre o manejo do estado de mal epiléptico e crises em agrupamento em cães e gatos. Charalambous M, Volk HA, et al. (2024). Jornal de Medicina Interna Veterinária, 38(2):450-472.',
      sourceType: 'Consenso Internacional Veterinário (ACVIM)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/38344799/',
      relevance:
        'Diretriz veterinária internacional preconizando a administração de cetamina em bolus e infusão contínua no estado de mal epiléptico refratário a benzodiazepínicos.',
    },
    {
      id: 'ref-shah-2019-quad-ketamine',
      citation:
        'Comparação entre metadona e buprenorfina no protocolo anestésico quadruplo para analgesia perioperatória em gatas submetidas a ovarioisterectomia. Shah M, Yates D, Hunt J, Murrell J (2019). Jornal de Medicina e Cirurgia Felina, 21(8):723-731.',
      sourceType: 'Ensaio Clínico em Gatas (Cirurgia Felina)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30284483/',
      relevance:
        'Ensaio clínico prospectivo validando a associação de cetamina com agonistas alfa-2, opioides e benzodiazepínicos na anestesia e analgesia multimodal em felinos.',
    },
    {
      id: 'ref-bergadano-2009-ketamine-cri',
      citation:
        'Efeito da infusão contínua de cetamina sobre a sensibilização central e a concentração alveolar mínima em cães. Bergadano A, Schatzmann U, Moens Y, Spadavecchia C (2009). Jornal de Farmacologia e Terapêutica Veterinária, 32(4):365-373.',
      sourceType: 'Ensaio Farmacodinâmico em Cães',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19645838/',
      relevance:
        'Estudo controlado comprovando a redução dose-dependente na concentração alveolar mínima (CAM) do anestésico inalatório e o bloqueio da hiperalgesia secundária.',
    },
    {
      id: 'ref-roynard-2021-ketamine-se',
      citation:
        'Uso da cetamina no tratamento do estado de mal epiléptico refratário em pequenos animais: revisão de farmacologia e evidências clínicas. Roynard P, Frank C, et al. (2021). Fronteiras na Ciência Veterinária, 8:682312.',
      sourceType: 'Revisão Sistemática Veterinária',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34307525/',
      relevance:
        'Revisão translacional comprovando a eficácia do antagonismo NMDA para interrupção de crises refratárias após o esgotamento dos receptores GABAérgicos.',
    },
    {
      id: 'ref-schwenk-2018-asra-acute-pain',
      citation:
        'Diretrizes de consenso sobre o uso de infusões intravenosas de cetamina para o manejo da dor aguda. Schwenk ES, Viscusi ER, Buvanendran A, et al. (2018). Anestesia Regional e Medicina da Dor, 43(5):456-466.',
      sourceType: 'Diretriz de Consenso em Dor Aguda',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29870468/',
      relevance:
        'Diretriz consensual multissociedades estabelecendo os parâmetros de infusão subanestésica intravenosa (0,1 a 0,5 mg/kg/h) e sua eficácia poupadora de opioides.',
    },
    {
      id: 'ref-cohen-2018-asra-chronic-pain',
      citation:
        'Diretrizes de consenso sobre o uso de infusões intravenosas de cetamina para dor crônica. Cohen SP, Bhatia A, Buvanendran A, et al. (2018). Anestesia Regional e Medicina da Dor, 43(5):521-546.',
      sourceType: 'Diretriz de Consenso em Dor Crônica',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29870467/',
      relevance:
        'Consenso estabelecendo os limites e precauções para tratamentos repetidos de dor crônica, com atenção a efeitos adversos em órgãos-alvo como fígado e trato urinário.',
    },
    {
      id: 'ref-cochrane-2025-chronic-pain',
      citation:
        'Cetamina e outros antagonistas do receptor NMDA para dor crônica. Revisão Sistemática Cochrane (2025). Biblioteca Cochrane de Revisões Sistemáticas.',
      sourceType: 'Revisão Sistemática Cochrane',
      url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD015509.pub2/full',
      relevance:
        'Avaliação sistemática contemporânea da literatura clínica sobre os limites da eficácia e a certeza da evidência na dor crônica.',
    },
    {
      id: 'ref-chen-2009-hcn1-ketamine',
      citation:
        'A inibição de canais de marca-passo HCN1 contribui para o efeito hipnótico anestésico da cetamina. Chen X, Shu S, Bayliss DA (2009). Jornal de Neurociência, 29(44):13824-13833.',
      sourceType: 'Estudo Mecanicista Neurofisiológico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19889988/',
      relevance:
        'Estudo mecanicista experimental comprovando o bloqueio dos canais dependentes de voltagem HCN1 em neurônios talâmicos corticais.',
    },
    {
      id: 'ref-noppens-2012-dili-ketamine',
      citation:
        'Lesão hepática induzida por fármacos após infusões repetidas de cetamina: relato e mecanismo fisiopatológico. Noppens RR, et al. (2012). Revista Europeia de Anestesiologia, 29(10):497-499.',
      sourceType: 'Estudo Clínico de Toxicidade Farmacológica',
      url: 'https://pubmed.ncbi.nlm.nih.gov/22907409/',
      relevance:
        'Alerta farmacológico documentando elevação de transaminases e risco de colestase química em protocolos com infusão contínua muito prolongada.',
    },
    {
      id: 'ref-fda-ketalar-label',
      citation:
        'Bula Oficial e Informações de Prescrição do Cloridrato de Cetamina (Ketalar). Food and Drug Administration (FDA) / Par Sterile Products (2021).',
      sourceType: 'Bula Regulatória Oficial (FDA)',
      url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/016812s046lbl.pdf',
      relevance:
        'Documento regulatório internacional de referência com a farmacocinética primária, biodisponibilidade por vias parenterais e advertências cardiovasculares.',
    },
  ],
  isPublished: true,
  createdAt: '2026-03-29T10:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
};
