import { MedicationRecord } from '../../types/medication';

/**
 * Monografia de Padrão-Ouro — Cetamina (Cloridrato de Cetamina Racêmica e Escetamina)
 * Organizada em progressão lógica e coesa de aprendizado, com termos e títulos traduzidos para o português,
 * destaques em grifa-texto (sem uso excessivo de caixa alta) e vinculação direta por botões de referência.
 */
export const cetaminaMedicationRecord: MedicationRecord = {
  id: 'med-cetamina',
  slug: 'cetamina',
  title: 'Cetamina (Cloridrato de Cetamina / Escetamina)',
  activeIngredient:
    'Cloridrato de Cetamina Racêmica [mistura equimolar 1:1 de R(−)-cetamina (arcetamina) e S(+)-cetamina (escetamina)] e Cloridrato de Escetamina [enantiômero puro S(+)-cetamina] (C₁₃H₁₆ClNO • HCl)',
  isControlled: true,
  controlNotice:
    'Substância psicotrópica da Lista B1 (Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 676/2022) com restrição legal de uso exclusivo em estabelecimentos de saúde (é vedada a dispensação para autoadministração domiciliar no Brasil). Na Medicina Veterinária (Portaria MAPA nº 837/2025), exige controle especial de psicotrópicos, escrituração oficial e guarda sob chave, com prescrição em Notificação de Receita B Veterinária ou Receita de Controle Especial conforme o canal de aquisição.',
  tradeNames: [
    'Cetamin® 10% (100 mg/mL) Solução Injetável (Syntec — Uso Veterinário)',
    'Ketamina Agener® 10% (100 mg/mL) Solução Injetável (Agener União — Uso Veterinário)',
    'Dopalen® 100 mg/mL Solução Injetável (Ceva Saúde Animal — Uso Veterinário)',
    'Quetamina® 100 mg/mL Solução Injetável (Vetnil — Uso Veterinário)',
    'Vetanarcol® / Ketalex® 50 mg/mL e 100 mg/mL Solução Injetável (Uso Veterinário)',
    'Ketamin® / Ketamin NP® 50 mg/mL Solução Injetável — Cloridrato de Escetamina S(+) (Cristália — Linha Hospitalar Humana)',
    'Cloridrato de Escetamina Genérico 50 mg/mL Solução Injetável (Aprovado pela ANVISA em 2024 — Uso Restrito Hospitalar)',
    'Spravato® 28 mg/dispositivo Solução Spray Intranasal — Cloridrato de Escetamina (Janssen-Cilag — Uso Supervisionado em Serviço de Saúde)',
  ],
  officialSiteUrl: 'https://www.syntec.com.br/produtos/cetamin/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/bulario/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ketamine/PNG',
  priceReference: {
    amountBrl: 118.0,
    label:
      'Cetamin® 10% 100 mg/mL (frasco 10 mL): R$ 65,00 a R$ 95,00 | Dopalen® / Ketamina Agener® 100 mg/mL (frasco 10 mL): R$ 75,00 a R$ 120,00 | Cetamin® 10% (frasco 50 mL hospitalar): R$ 190,00 a R$ 265,00 | Ketamin NP® (Escetamina 50 mg/mL, caixa hospitalar com 5 a 25 ampolas de 2 mL ou frasco de 10 mL): R$ 140,00 a R$ 380,00',
    presentation: 'Frasco-ampola de 10 mL ou 50 mL a 100 mg/mL (10%) de Cloridrato de Cetamina Racêmica',
    sourceName: 'Distribuidores Hospitalares Veterinários (MAPA) e Tabela CMED / ANVISA',
    sourceUrl: 'https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cmed',
    checkedAt: '2026-11-10',
    notes:
      'Medicamento psicotrópico da Lista B1 de uso restrito a estabelecimentos de saúde (hospitais, clínicas e ambulatórios devidamente licenciados). A dispensação para administração domiciliar não supervisionada é proibida pela legislação sanitária brasileira (RDC ANVISA nº 676/2022).',
  },
  pharmacologicClass:
    'Anestésico dissociativo arilciclohexilamínico quiral, antagonista não competitivo dependente do uso e do estado aberto do canal do receptor glutamatérgico NMDA (N-metil-D-aspartato), agente anti-hiperalgésico contra a somação temporal medular, neuroprotetor anti-excitotóxico e modulador rápido da sinaptogênese e plasticidade glutamatérgica (via AMPA–BDNF–TrkB–mTORC1)',
  species: ['dog', 'cat'],
  category: 'anestesia-dor',
  tags: [
    'Cetamina',
    'Escetamina',
    'Arcetamina',
    'Norcetamina',
    'Hidroxinorcetamina',
    '(2R,6R)-HNK',
    'Anestésico Dissociativo',
    'Antagonista NMDA',
    'Somação Temporal Medular',
    'Sensibilização Central',
    'Hiperalgesia Induzida por Opioides',
    'Infusão Contínua',
    'Co-indução Anestésica',
    'Estado de Mal Epiléptico Refratário',
    'Plasticidade Sináptica BDNF-mTORC1',
    'Canais HCN1',
    'Cistite Ulcerativa por Cetamina',
    'Lesão Hepática Induzida por Fármacos',
    'Lista B1 Portaria 344/98',
    'RDC 676/2022',
  ],

  indications: [
    'Co-indução anestésica intravenosa (em associação obrigatória com propofol, alfaxalona, benzodiazepínicos ou agonistas alfa-2) em cães e gatos, reduzindo em 30% a 50% a dose do hipnótico principal e preservando o tônus simpático vascular.',
    'Contenção química intramuscular e indução dissociativa multimodal (associando agonista alfa-2, opioide e cetamina, com ou sem benzodiazepínico) em felinos e cães de difícil manipulação ou sem acesso venoso prévio.',
    'Analgesia perioperatória subanestésica em infusão contínua (isolada ou associada a morfina/metadona e lidocaína): prevenção e reversão da somação temporal medular, da sensibilização central pós-incisional e da hiperalgesia induzida por opioides em cirurgias ortopédicas, oncológicas, mastectomias, amputações e laparotomias.',
    'Manejo emergencial de terceira linha do estado de mal epiléptico refratário e super-refratário em cães e gatos: bloqueio dos receptores NMDA externalizados após a falha de benzodiazepínicos (decorrente da internalização de receptores GABA-A), interrompendo a excitotoxicidade neuronal por influxo maciço de cálcio sem deprimir a pressão arterial.',
    'Adjuvante analgésico parenteral de resgate em dor neuropática refratária, síndrome dolorosa regional complexa e dor oncológica com alodinia e hiperalgesia, sob vigilância hepatobiliar e urológica.',
    'Farmacologia comparada e translacional: sedação dissociativa para procedimentos de emergência, controle rápido de agitação psicomotora grave e modulação neuroplástica de ação rápida na depressão resistente ao tratamento e no transtorno depressivo maior com ideação ou comportamento suicida agudo.',
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
    'coagulacao-intravascular-disseminada-caes-gatos',
  ],

  attentionSubtitle:
    'Diretrizes críticas de segurança: (1) Distinguir sempre as três entidades clínicas não intercambiáveis: cetamina racêmica (mistura 1:1 de R e S), escetamina injetável S(+) (com afinidade 3 a 4 vezes maior pelo receptor NMDA e cerca do dobro da potência anestésica) e escetamina intranasal (Spravato®, de protocolo psiquiátrico supervisionado); (2) Paradoxo cardiovascular: eleva a pressão arterial e a frequência cardíaca em pacientes com reserva simpática íntegra (média de +12,6 a +16 mmHg na pressão sistólica), mas desmascara efeito inotrópico negativo direto no choque descompensado com depleção de catecolaminas; (3) Via aérea: preserva reflexos laríngeos que predispõem ao laringoespasmo (dessensibilizar a epiglote felina com lidocaína tópica), não garante proteção absoluta contra aspiração e pode causar apneia se administrada em bolus intravenoso rápido; (4) Proibida como agente único em cães devido ao risco de hipertonia muscular extrema, opistótono e convulsões; (5) Vigiar lesão hepática induzida por fármacos em infusões prolongadas ou repetidas e cistite ulcerativa hemorrágica no uso crônico; (6) Uso restrito a estabelecimentos de saúde no Brasil (Lista B1 — RDC nº 676/2022).',

  plainLanguageSummary:
    'A cetamina é um fármaco derivado da fenciclidina (PCP), introduzido na prática clínica na década de 1960 como anestésico dissociativo. Ela não deve ser compreendida apenas como um anestésico nem isoladamente como um modulador de dor ou de humor: na realidade, comporta-se como três medicamentos distintos em uma mesma molécula, cujos efeitos anestésicos, analgésicos anti-hiperalgésicos e neuroplásticos dependem diretamente da faixa de dose, da velocidade de administração, da concentração cerebral atingida, do circuito neuronal recrutado, do enantiômero escolhido e dos seus metabólitos ativos.\n\n' +
    'Em doses elevadas (anestésicas e dissociativas, como 2 a 10 mg/kg por via intramuscular ou 1 a 4,5 mg/kg por via intravenosa), a cetamina desconecta funcionalmente a comunicação entre as vias talamocorticais e o sistema límbico. O paciente entra em um estado cataléptico de profunda desconexão perceptiva, analgesia somática e amnésia, mantendo os olhos abertos e parte dos reflexos de tronco encefálico. Na clínica de cães e gatos, esse regime exige sempre associação com sedativos ou relaxantes musculares (midazolam, diazepam, dexmedetomidina ou propofol) para evitar rigidez muscular e agitação no despertar.\n\n' +
    'Em doses baixas subanestésicas (como bolus de 0,15 a 0,5 mg/kg seguido de infusão contínua de 0,12 a 0,6 mg/kg/h), ela não induz anestesia geral, mas atua de forma seletiva no corno dorsal da medula espinhal desligando a somação temporal medular e a sensibilização central. Esse mecanismo restaura a eficácia dos opioides e impede a hiperalgesia pós-cirúrgica. Além disso, no estado de mal epiléptico refratário (quando o diazepam perde efeito pela internalização dos receptores GABA-A), a cetamina bloqueia os receptores NMDA externalizados e interrompe a morte neuronal causada pela entrada maciça de cálcio.\n\n' +
    'Por fim, na farmacologia translacional e psiquiátrica, doses subanestésicas (como 0,5 mg/kg em infusão de 40 minutos) bloqueiam preferencialmente interneurônios inibitórios GABAérgicos, provocando um surto transitório de glutamato que estimula receptores AMPA, libera fator neurotrófico derivado do cérebro (BDNF) e ativa a via mTORC1 para promover rápida sinaptogênese. Para aplicar todo esse potencial com segurança, é fundamental distinguir as três entidades clínicas existentes sob esse nome: a cetamina racêmica (mistura 50% R-cetamina e 50% S-cetamina), a escetamina injetável (enantiômero S(+) isolado, cerca de duas vezes mais potente na anestesia) e a escetamina intranasal (Spravato®), aprovada para depressão resistente ao tratamento e sintomas depressivos com ideação suicida aguda sob supervisão presencial obrigatória.',

  quickSummaryHighlights: [
    'anestésico dissociativo',
    'três medicamentos distintos em uma mesma molécula',
    'faixa de dose, da velocidade de administração, da concentração cerebral atingida',
    'desconecta funcionalmente a comunicação entre as vias talamocorticais e o sistema límbico',
    'somação temporal medular e a sensibilização central',
    'estado de mal epiléptico refratário',
    'interneurônios inibitórios GABAérgicos',
    'estimula receptores AMPA, libera fator neurotrófico derivado do cérebro (BDNF) e ativa a via mTORC1',
    'três entidades clínicas',
    'cetamina racêmica',
    'escetamina injetável',
    'escetamina intranasal (Spravato®)',
  ],

  pillars: [
    {
      title: 'Bloqueio do Canal NMDA Aberto e Dissociação Talamocortical',
      icon: 'Brain',
      desc: 'Atua como antagonista não competitivo e dependente do uso no sítio da fenciclidina dentro do poro do receptor NMDA. Reduz o influxo de cálcio, inibe canais marcapasso HCN1 e desconecta redes talamocorticais do sistema límbico, gerando analgesia somática profunda e amnésia.',
    },
    {
      title: 'Paradoxo do Antagonista Excitatório e Via BDNF–mTORC1',
      icon: 'Zap',
      desc: 'Em doses subanestésicas, bloqueia interneurônios GABAérgicos de disparo rápido e desinibe neurônios piramidais. O pulso transitório de glutamato ativa receptores AMPA, estimula a via BDNF–TrkB–mTORC1 e desfosforila o fator eEF2, induzindo rápida sinaptogênese cortical.',
    },
    {
      title: 'Controle da Sensibilização Medular e do Mal Epiléptico Refratário',
      icon: 'Syringe',
      desc: 'Em infusão contínua (0,12 a 0,6 mg/kg/h), extingue a somação temporal das fibras C na medula espinhal e previne a hiperalgesia induzida por opioides. No estado de mal epiléptico refratário, bloqueia receptores NMDA externalizados após a falha gabaérgica.',
    },
    {
      title: 'Paradoxo Hemodinâmico, Órgãos-Alvo e Restrição Hospitalar',
      icon: 'ShieldCheck',
      desc: 'Eleva a pressão arterial por estímulo simpático central, mas exerce depressão miocárdica direta se houver depleção de catecolaminas no choque grave. Requer vigilância para laringoespasmo, lesão hepática em infusões repetidas, cistite ulcerativa e controle estrito da Lista B1.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Distinção obrigatória entre cetamina racêmica, escetamina injetável e escetamina intranasal:',
      text: 'A cetamina é uma arilciclohexilamina quiral. A cetamina racêmica contém 50% de R(−)-cetamina (arcetamina) e 50% de S(+)-cetamina (escetamina). O enantiômero S(+) possui afinidade 3 a 4 vezes maior pelo receptor NMDA e cerca do dobro de potência anestésica e analgésica (a escetamina injetável a 50 mg/mL exige redução de 30% a 50% na dose em relação à racêmica). Já a escetamina intranasal (Spravato®) possui aprovação específica para depressão resistente ao tratamento e sintomas depressivos com ideação ou comportamento suicida agudo em adultos, não devendo ser confundida com sprays manipulados de cetamina racêmica.',
    },
    {
      label: 'Paradoxo cardiovascular (hipertensão transitória versus colapso no choque descompensado):',
      text: 'Em pacientes com reservas simpáticas preservadas, a cetamina inibe a recaptação neuronal de catecolaminas e eleva transitoriamente a pressão arterial e a frequência cardíaca (aumento médio de +12,6 a +16 mmHg na pressão sistólica e +8,5 a +11 mmHg na diastólica, com hipertensão severa em cerca de 1% das infusões). Entretanto, a molécula possui efeito inotrópico negativo direto sobre o miocárdio: em pacientes críticos em choque prolongado ou exaustão de catecolaminas, a indução com cetamina pode precipitar queda abrupta do débito cardíaco e colapso circulatório. É contraindicada quando a elevação pressórica representa perigo grave (aneurismas, hemorragia intracraniana, hipertensão severa não controlada e cardiomiopatia hipertrófica obstrutiva em gatos).',
    },
    {
      label: 'Cuidados com a via aérea, apneia em bolus rápido e prevenção de laringoespasmo:',
      text: 'A ideia de que a cetamina nunca deprime a respiração é incorreta. Embora preserve a ventilação espontânea e produza broncodilatação superior ao propofol, a injeção intravenosa rápida, doses elevadas ou a associação com opioides e sedativos podem causar respiração apnêustica, hipoventilação e apneia. Além disso, a manutenção dos reflexos faríngeos e laríngeos não garante proteção contra aspiração e predispõe ao laringoespasmo grave (é contraindicado o uso isolado em procedimentos de faringe, laringe ou árvore brônquica, e em gatos é obrigatório dessensibilizar a laringe com lidocaína tópica antes da intubação).',
    },
    {
      label: 'Proibição de monoterapia anestésica em cães e controle das reações de despertar:',
      text: 'Em cães, a administração de cetamina como agente único desencadeia hipertonia muscular esquelética severa, espasmos tônicos, opistótono, vocalização disfórica e convulsões em até 20% dos pacientes. Deve ser sempre associada a benzodiazepínicos, agonistas alfa-2 ou propofol, mantendo a recuperação em ambiente silencioso e com baixa luminosidade para evitar delírio de emergência.',
    },
    {
      label: 'Lesão hepática induzida por fármacos em infusões prolongadas e uropatia ulcerativa:',
      text: 'Infusões contínuas prolongadas ou repetidas em curto intervalo associam-se a elevação de ALT, AST, fosfatase alcalina e GGT por lesão hepatocelular e colestática (em série clínica com duas infusões de 100 horas separadas por 16 dias, 50% dos pacientes desenvolveram hepatotoxicidade aguda reversível). No trato urinário, exposições crônicas ou em altas doses causam cistite ulcerativa hemorrágica, polaciúria, disúria, redução da capacidade vesical, necrose papilar e hidronefrose.',
    },
    {
      label: 'Restrição legal brasileira a estabelecimentos de saúde (Lista B1 — RDC nº 676/2022):',
      text: 'No Brasil, tanto a cetamina quanto a escetamina pertencem à Lista B1 de substâncias psicotrópicas com adendo obrigatório de uso restrito a estabelecimentos de saúde. Modelos estrangeiros de uso domiciliar autoadministrado não são permitidos pela legislação sanitária nacional.',
    },
  ],

  mechanismOfAction:
    'A farmacodinâmica da cetamina organiza-se em sete eixos moleculares e neurofisiológicos complementares que explicam sua transição entre anestesia dissociativa, analgesia medular e plasticidade sináptica rápida:\n\n' +
    '1. Estereoquímica e quiralidade (R-cetamina versus S-cetamina): A cetamina [2-(2-clorofenil)-2-(metilamino)-ciclohexan-1-ona] é uma arilciclohexilamina quiral cujo carbono assimétrico C2 origina dois enantiômeros ópticos que não se interconvertem biologicamente: a S(+)-cetamina (escetamina) e a R(−)-cetamina (arcetamina). O enantiômero S(+) apresenta afinidade cerca de 3 a 4 vezes superior pelo receptor NMDA (Ki de ~0,3 a 0,69 µM contra ~1,4 a 2,6 µM da R-cetamina), conferindo potência anestésica e analgésica cerca de duas a três vezes maior. Em contrapartida, estudos experimentais indicam que a R(−)-cetamina promove efeitos neuroplásticos sustentados com menor carga de efeitos dissociativos agudos.\n\n' +
    '2. Bloqueio não competitivo e dependente do uso do canal NMDA: O receptor N-metil-D-aspartato (NMDAR) é um canal iônico glutamatérgico heterotetramérico (formado por subunidades GluN1 e GluN2A–D) altamente permeável a sódio (Na⁺) e, sobretudo, a cálcio (Ca²⁺). Em potencial de repouso, o poro do canal permanece fisicamente obstruído por um íon magnésio extracelular (Mg²⁺) de maneira dependente de voltagem. A condução iônica exige a coincidência entre a ligação do glutamato, a presença do coagonista obrigatório (glicina ou D-serina) e a despolarização prévia da membrana pós-sináptica que expulsa o tampão de Mg²⁺. A cetamina atua como antagonista não competitivo, dependente do uso e do estado aberto do canal: ela penetra no poro aberto e liga-se ao sítio da fenciclidina (PCP) localizado na região transmembrana, permanecendo aprisionada quando o canal se fecha. Em doses anestésicas, esse bloqueio reduz o influxo de Ca²⁺ e desacopla funcionalmente as projeções talamocorticais do sistema límbico e do córtex associativo, gerando a anestesia dissociativa (analgesia profunda, amnésia e catalepsia com preservação parcial de reflexos de tronco encefálico).\n\n' +
    '3. O paradoxo do antagonista excitatório e a desinibição GABAérgica: Em doses baixas subanestésicas (0,1 a 0,5 mg/kg), a cetamina bloqueia preferencialmente os receptores NMDA localizados em interneurônios inibitórios GABAérgicos de disparo rápido, os quais se encontram tonicamente despolarizados e com seus canais NMDA abertos. A inibição desses interneurônios reduz a liberação sináptica de GABA e promove a desinibição dos neurônios piramidais glutamatérgicos no córtex pré-frontal e no hipocampo, originando um pulso transitório de glutamato extracelular.\n\n' +
    '4. Cascata AMPA → BDNF–TrkB → mTORC1 e desrepressão traducional via eEF2K/eEF2: O glutamato liberado durante esse pulso estimula intensamente os receptores AMPA pós-sinápticos, promovendo despolarização, abertura de canais de cálcio sensíveis à voltagem e exocitose de fator neurotrófico derivado do cérebro (BDNF). A ligação do BDNF ao receptor TrkB ativa as cascatas intracelulares Akt, ERK e o complexo mTORC1, estimulando a síntese rápida de proteínas sinápticas (PSD-95, sinapsina-1 e subunidades GluA1) e a formação de novas espinhas dendríticas em menos de 24 horas. De forma complementar, o bloqueio das correntes miniaturas espontâneas de NMDA em repouso inibe a quinase do fator de alongamento eucariótico 2 (eEF2K), reduzindo a fosforilação do fator eEF2 e liberando a tradução dendrítica rápida de BDNF.\n\n' +
    '5. Metabólitos hidroxinorcetaminas — (2R,6R)-HNK: A biotransformação da cetamina origina metabólitos hidroxilados como a (2R,6R)-hidroxinorcetamina [(2R,6R)-HNK], capaz de potencializar a transmissão mediada por receptores AMPA em modelos experimentais sem bloquear funcionalmente o receptor NMDA nem induzir dissociação motora. A contribuição quantitativa exata desse metabólito em pacientes clínicos permanece em investigação ativa, mas explica por que vias com intenso metabolismo de primeira passagem (como a via oral) geram perfis farmacodinâmicos distintos da via intravenosa.\n\n' +
    '6. Interação com o sistema opioide endógeno: A cetamina modula receptores opioides mu (MOR), kappa (KOR) e delta (DOR), impedindo a fosforilação e a dessensibilização patológica dos receptores mu — o que reverte a tolerância opioide e a hiperalgesia induzida por opioides no perioperatório. Na neuropsiquiatria translacional, o bloqueio prévio de receptores opioides com naltrexona atenuou de forma expressiva a resposta antidepressiva aguda da cetamina sem suprimir sua dissociação, demonstrando cooperação funcional entre o sistema opioide e a cascata glutamatérgica.\n\n' +
    '7. Canais marcapasso HCN1 e alvos secundários: A ação hipnótica anestésica da cetamina envolve ainda a potente inibição dos canais iônicos ativados por hiperpolarização e modulados por nucleotídeos cíclicos (subunidade HCN1), responsáveis pelas correntes marcapasso neuronais Ih que sincronizam o ritmo talamocortical. Adicionalmente, interage com receptores colinérgicos muscarínicos e nicotínicos, inibe transportadores de monoaminas (noradrenalina, dopamina e serotonina — gerando estímulo simpatomimético indireto), modula receptores sigma e, em altas concentrações, bloqueia canais de sódio e cálcio dependentes de voltagem.',

  pharmacokineticsData: {
    halfLife:
      'Bifásica — Distribuição (t½ α): 10 a 15 minutos (redistribuição cerebral rápida que encerra a anestesia inicial) | Eliminação (t½ β): ~1 a 2 horas em cães e gatos e ~2,5 horas em humanos (2 a 4 horas em revisões clínicas); o metabólito ativo norcetamina persiste por 4 a 6 horas.',
    plasmaBinding:
      'Baixa a moderada — ~10% a 15% em humanos (alta fração livre difusível) e ~30% a 50% em cães e gatos (ligação predominante à alfa-1-glicoproteína ácida, proteína de fase aguda inflamatória).',
    cnsPenetration:
      'Altíssima e imediata — Elevada lipossolubilidade (logP ~2,9 a 3,1; pKa 7,5), atravessando a barreira hematoencefálica em 30 a 60 segundos após administração intravenosa, com razão cérebro:plasma inicial de 4:1 a 6,5:1.',
    absorption:
      'A via de administração define a biodisponibilidade, a velocidade de início e a proporção entre o fármaco-mãe e seus metabólitos ativos (**norcetamina** e **hidroxinorcetaminas**):\n' +
      '• **Via intravenosa (IV)**: Biodisponibilidade de **100%**, com concentração máxima praticamente imediata (início de ação em **30 a 60 segundos**). Garante exposição previsível e permite titulação fina em co-indução ou **infusão contínua**.\n' +
      '• **Via intramuscular (IM)**: Estudos clássicos descrevem biodisponibilidade próxima de **93%**, porém revisões farmacocinéticas recentes demonstram faixa publicada real entre **41,1% e 93%**, com relevante variabilidade interindividual e escassez de dados robustos em doses superiores a 1 mg/kg em modelos humanos. O pico plasmático ocorre em **10 a 30 minutos** (em cães e gatos, a imobilização clínica inicia-se em **3 a 5 minutos**, com efeito máximo em 10 a 15 minutos e duração anestésica de 20 a 45 minutos). O pH ácido da solução comercial (**pH 3,5 a 5,5**) provoca dor à injeção.\n' +
      '• **Via subcutânea (SC)**: Em modelagem farmacocinética populacional, a absorção subcutânea segue cinética de primeira ordem com biodisponibilidade estimada em **~64%**, apresentando menor pico plasmático e melhor tolerabilidade prática em doses subanestésicas (**0,5 a 1 mg/kg**).\n' +
      '• **Via intranasal (IN)**: Biodisponibilidade de **~43% a 50%**, com tempo até o pico em **20 a 40 minutos**, dependendo do dispositivo atomizador, da deposição na mucosa nasal, da depuração mucociliar e da fração deglutida.\n' +
      '• **Via sublingual e transmucosa oral (OTM)**: Biodisponibilidade de **~29% a 32%**, com pico em torno de **45 minutos** (combinando absorção transmucosa direta e deglutição parcial).\n' +
      '• **Via oral (VO)**: Biodisponibilidade baixa para a cetamina racêmica intacta, de apenas **~17% a 18%**, com pico entre **20 e 120 minutos**. Sofre **intenso metabolismo de primeira passagem** intestinal e hepático, gerando concentrações proporcionalmente muito elevadas de **norcetamina** e **hidroxinorcetamina (HNK)**. Por essa razão, **doses orais e intravenosas não podem ser comparadas pela simples multiplicação da biodisponibilidade**, visto que o perfil farmacológico após administração oral é dominado por metabólitos ativos.',
    distribution:
      'Graças à alta lipossolubilidade e à baixa ligação às proteínas plasmáticas (**10% a 15%** em humanos e **30% a 50%** em pequenos animais), a cetamina distribui-se rapidamente para tecidos ricamente perfundidos (encéfalo, coração, pulmões e placenta), exibindo **volume de distribuição no estado de equilíbrio elevado (2,5 a 4,5 L/kg)**. O perfil plasmático é **bifásico**: a **fase alfa de distribuição (meia-vida de 10 a 15 minutos)** reflete a saída do fármaco do sistema nervoso central para o músculo esquelético e tecido adiposo — sendo essa **redistribuição tecidual (e não a metabolização hepática)** a responsável pelo término da anestesia dissociativa após um bolus único. Entretanto, em infusões contínuas prolongadas ou doses repetidas, ocorre saturação dos compartimentos periféricos e o despertar passa a depender diretamente da depuração hepática.',
    metabolism:
      'Sofre extensa biotransformação oxidativa microssomal hepática (e intestinal na via oral) em três etapas sequenciais:\n' +
      '1. **N-desmetilação primária para norcetamina**: Catalisada principalmente pelas isoenzimas **CYP2B6 e CYP3A4** (com participação variável de CYP2C19, CYP2A6 e CYP2D6) e, na espécie canina, predominantemente por **CYP2B11** e **CYP3A12**. O processo é **estereosseletivo**: a **CYP3A4 desmetila a S(+)-cetamina mais rapidamente do que a R(−)-cetamina**, enquanto a CYP2B6 atua sobre ambos os enantiômeros. A **norcetamina** é um **metabólito farmacologicamente ativo** que conserva cerca de **1/3 a 1/5 (20% a 33%) da potência anestésica e analgésica** do composto original no receptor NMDA.\n' +
      '2. **Hidroxilação secundária e desidrogenação**: A norcetamina é hidroxilada no anel ciclohexanona pelas enzimas **CYP2A6, CYP2B6, CYP3A4 e CYP3A5** dando origem a diastereoisômeros de **hidroxinorcetamina (HNK)** — incluindo a **(2R,6R)-HNK** e a **(2S,6S)-HNK** — e convertida via **CYP2B6** em **dehidronorcetamina (DHNK)**.\n' +
      '3. **Conjugação por glicuronidação**: Os metabólitos hidroxilados sofrem conjugação pelas UDP-glicuronosiltransferases em derivados hidrossolúveis. Na **espécie felina**, apesar da menor atividade constitucional de certas glicuroniltransferases, a etapa determinante para o fim da ação clínica de doses únicas continua sendo a redistribuição e a N-desmetilação hepática.',
    elimination:
      'A eliminação é **predominantemente renal (~85% a 91% da dose recuperada na urina em 72 horas)** sob a forma de metabólitos hidroxilados, dehidronorcetamina e conjugados glicuronídeos, enquanto apenas **2% a 4%** são excretados inalterados na urina e **menos de 5%** saem pelas fezes. A **meia-vida de eliminação terminal (t½ β)** é de **1 a 2 horas em cães e gatos** e de **~2,5 horas (2 a 4 horas)** em humanos. **Implicação clínica**: em gatos com obstrução uretral ou lesão renal aguda oligúrica/anúrica, bem como em hepatopatas descompensados, ocorre **acúmulo plasmático de norcetamina ativa**, prolongando acentuadamente a ataxia e a sedação pós-anestésica.',
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
      clinicalContext: 'Pacientes de difícil contenção ou procedimentos curtos (sempre associada a agonista alfa-2 e opioide ± benzodiazepínico)',
      doseSummary: 'Gatos: 2 a 5 mg/kg IM (contenção/exames) ou 5 a 10 mg/kg IM (cirúrgico) | Cães: 2 a 5 mg/kg IM em associação',
      route: 'Via Intramuscular profunda (musculatura epaxial ou quadríceps)',
      duration: 'Início em 3 a 5 minutos; efeito cirúrgico de 20 a 40 minutos',
    },
    {
      condition: 'Infusão Contínua Subanestésica Perioperatória e em Terapia Intensiva',
      species: 'both',
      clinicalContext: 'Bloqueio NMDA contra somação temporal medular, sensibilização central e hiperalgesia induzida por opioides',
      doseSummary: 'Ataque: 0,25 a 0,5 mg/kg IV lenta → Infusão transoperatória: 0,12 a 0,6 mg/kg/h (2–10 µg/kg/min) → Pós-operatório: 0,12 a 0,3 mg/kg/h (2–5 µg/kg/min)',
      route: 'Via Intravenosa em bomba de infusão contínua',
      duration: 'Durante o transoperatório e por 12 a 48 horas no pós-operatório',
    },
    {
      condition: 'Estado de Mal Epiléptico Refratário e Super-Refratário',
      species: 'both',
      clinicalContext: 'Crises refratárias a benzodiazepínicos e anticonvulsivantes de segunda linha (bloqueio da excitotoxicidade NMDA)',
      doseSummary: 'Bolus de ataque: 0,5 a 2 mg/kg IV lenta (até 5 mg/kg em casos extremos) → Infusão contínua: 0,5 a 2 mg/kg/h IV',
      route: 'Via Intravenosa (lenta seguida de infusão contínua)',
      duration: 'Manter por 12 a 24 horas após cessação das crises, com desmame gradual',
    },
    {
      condition: 'Analgesia Subanestésica Adjuvante na Dor Crônica e Neuropática',
      species: 'both',
      clinicalContext: 'Adjuvante para controle da sensibilização central em osteoartrite severa, dor neuropática ou oncológica',
      doseSummary: '0,5 a 1 mg/kg SC (intermitente a cada 7 a 30 dias) ou infusão hospitalar de 0,1 a 0,5 mg/kg/h IV',
      route: 'Via Subcutânea (SC) ou Intravenosa (IV)',
      duration: 'Aplicações seriadas conforme resposta clínica e monitoramento hepático e urinário',
    },
    {
      condition: 'Farmacologia Translacional: Depressão Resistente, Ideação Suicida e Sedação de Emergência',
      species: 'both',
      clinicalContext: 'Modulação neuroplástica rápida (BDNF–mTORC1) e protocolos comparados de medicina de emergência',
      doseSummary: 'Depressão resistente IV: 0,5 mg/kg em 40 min | Via SC titulada: 0,5–0,9 mg/kg | Escetamina intranasal: 56–84 mg | Agitação grave: 4–5 mg/kg IM',
      route: 'IV (em 40 min), SC, Intranasal supervisionada ou IM de emergência',
      duration: 'Indução 2 a 3×/semana por 2 a 4 semanas (psiquiatria) ou dose única (emergência)',
    },
  ],

  detailedIndications: [
    {
      id: 'det-ind-cetamina-coinducao-iv',
      indication: 'Co-indução Anestésica Intravenosa e Indução Dissociativa Balanceada (Cães e Gatos)',
      clinicalContext:
        'Indução da anestesia geral para intubação orotraqueal em pacientes normovolêmicos ou com instabilidade hemodinâmica compensada, reduzindo a dose necessária de propofol ou alfaxalona e preservando a resistência vascular sistêmica.',
      species: 'both',
      dose: 'Co-indução (com propofol/alfaxalona): 1 a 2 mg/kg IV lenta | Indução dissociativa (com benzodiazepínico): 2 a 5 mg/kg IV lenta (Escetamina S(+): 1 a 2,5 mg/kg IV)',
      route: 'Intravenosa (IV) administrada lentamente ao longo de 60 a 90 segundos',
      frequency: 'Dose única de indução titulada até perda do reflexo de deglutição para intubação',
      duration: 'Ação anestésica de 10 a 15 minutos (fase alfa de redistribuição)',
      mechanismOfAction:
        'Bloqueio não competitivo do poro do receptor NMDA talamocortical e inibição de canais marcapasso HCN1, produzindo inconsciência dissociativa e analgesia somática, enquanto a inibição da recaptação central de noradrenalina atenua a vasodilatação e a depressão do barorreflexo induzidas pelo propofol.',
      clinicalRationale:
        'Em cães e gatos, a co-indução com cetamina (1 a 2 mg/kg IV lenta, administrada após bolus parcial de 1 a 2 mg/kg de propofol ou alfaxalona) reduz em 30% a 50% a dose total do hipnótico requerida para intubação, diminuindo a incidência de hipotensão pós-indução e apneia. Na indução dissociativa com benzodiazepínico (midazolam ou diazepam 0,2 a 0,3 mg/kg IV), a dose de cetamina racêmica é de 2 a 5 mg/kg IV lenta; se utilizada a escetamina S(+), a potência analgésica e hipnótica duas vezes superior exige redução de 30% a 50% na dose (1 a 2,5 mg/kg IV). Em gatos, é obrigatório instilar lidocaína a 2% sem vasoconstritor (~0,1 mL ou 2 mg) sobre as cartilagens aritenoides 60 a 90 segundos antes da intubação orotraqueal para prevenir laringoespasmo reflexo. Na medicina comparada humana, a indução intravenosa é realizada com 1 a 4,5 mg/kg (usualmente 1 a 2 mg/kg administrados a ~0,5 mg/kg/min).',
      monitoring:
        'Frequência cardíaca, eletrocardiograma contínuo, pressão arterial, capnografia, oximetria de pulso, tônus mandibular e reflexo laríngeo. Lubrificar as córneas imediatamente, pois os olhos permanecem abertos em midríase.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina', 'ref-fda-ketalar-label'],
      evidenceLevel: 'Consenso em Anestesiologia Veterinária e Bula Regulatória',
      highlights: [
        'co-indução',
        'propofol',
        'alfaxalona',
        'resistência vascular sistêmica',
        'receptores NMDA',
        'canais marcapasso HCN1',
        'laringoespasmo reflexo',
        'lidocaína a 2%',
        'cartilagens aritenoides',
        'escetamina S(+)',
        'benzodiazepínico',
        'tônus simpático',
      ],
    },
    {
      id: 'det-ind-cetamina-contencao-im-multimodal',
      indication: 'Contenção Química Intramuscular e Anestesia Dissociativa para Pacientes de Difícil Manipulação ou Procedimentos Curtos',
      clinicalContext:
        'Imobilização segura sem manipulação forçada de gatos sob alto estresse e cães reativos sem acesso venoso, ou anestesia de curta duração para exames diagnósticos, radiografias, curativos cirúrgicos e castrações rápidas.',
      species: 'both',
      dose: 'Gatos: 2 a 5 mg/kg IM (contenção/exames) ou 5 a 10 mg/kg IM (anestesia cirúrgica curta), associada a agonista alfa-2 + opioide | Cães reativos: 2 a 5 mg/kg IM, associada a agonista alfa-2 + opioide',
      route: 'Intramuscular profunda (musculatura epaxial lombar ou quadríceps)',
      frequency: 'Dose única (se necessário prolongar, obter acesso venoso para suplementação intravenosa de 0,5 a 1 mg/kg)',
      duration: 'Latência de 3 a 5 minutos; imobilização clínica de 25 a 45 minutos; recuperação em 1 a 3 horas',
      mechanismOfAction:
        'Sinergismo farmacodinâmico multimodal: a cetamina promove desconexão talamocortical e analgesia somática por bloqueio NMDA; o agonista alfa-2 (dexmedetomidina) e o benzodiazepínico (midazolam) suprimem a hipertonia muscular, a sialorreia, a taquicardia simpática e o delírio de despertar; e o opioide garante analgesia visceral.',
      clinicalRationale:
        'A cetamina isolada nunca deve ser utilizada em cães (pelo risco de rigidez extensora e convulsões) e, mesmo em gatos, seu uso isolado requer doses altas (11 a 22 mg/kg IM) associadas a recuperação agitada. Em protocolos multimodais balanceados, doses reduzidas (2 a 5 mg/kg IM) proporcionam imobilização rápida e suave. Em gatos, o protocolo quádruplo combina cetamina (2 a 5 mg/kg IM para exames ou 5 a 10 mg/kg IM cirúrgico) com dexmedetomidina (5 a 20 µg/kg IM) + metadona (0,2 a 0,3 mg/kg) ou butorfanol (0,2 a 0,4 mg/kg) ± midazolam (0,2 mg/kg). Em cães reativos, associa-se dexmedetomidina (5 a 10 µg/kg IM) + metadona (0,3 a 0,5 mg/kg) ± midazolam (0,2 a 0,3 mg/kg). Caso seja necessário reverter a dexmedetomidina com atipamezole, deve-se aguardar pelo menos 30 a 45 minutos após a injeção de cetamina para evitar excitação dissociativa residual e rigidez muscular.',
      monitoring:
        'Permeabilidade das vias aéreas, frequência respiratória, oximetria de pulso (com suplementação de oxigênio), temperatura retal (risco de hipotermia ou hipertermia rebote em gatos), pressão arterial e lubrificação ocular.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina', 'ref-shah-2019-quad-ketamine'],
      evidenceLevel: 'Ensaios Clínicos Randomizados e Formulários Veterinários',
      highlights: [
        'contenção química intramuscular',
        'protocolo multimodal',
        'dexmedetomidina',
        'agonista alfa-2',
        'benzodiazepínico',
        'metadona',
        'butorfanol',
        'desconexão talamocortical',
        'delírio de despertar',
        'atipamezole',
        'rigidez extensora',
      ],
    },
    {
      id: 'det-ind-cetamina-cri-dor-aguda',
      indication: 'Infusão Contínua Subanestésica para Dor Aguda Perioperatória, Controle da Somação Temporal Medular e Poupança de Opioides',
      clinicalContext:
        'Controle multimodal da dor moderada a intensa no trans e pós-operatório (amputações, toracotomias, mastectomias radicais, hemilaminectomias, osteossínteses, pancreatite aguda grave e peritonite), prevenindo a sensibilização central medular e a hiperalgesia induzida por opioides.',
      species: 'both',
      dose: 'Bolus de ataque: 0,25 a 0,5 mg/kg IV lenta (2–3 min pré-incisão) → Transoperatório: 0,12 a 0,6 mg/kg/h (2–10 µg/kg/min) → Pós-operatório (12–48 h): 0,12 a 0,3 mg/kg/h (2–5 µg/kg/min)',
      route: 'Intravenosa em bomba de infusão contínua (isolada ou combinada a morfina/metadona e lidocaína em cães)',
      frequency: 'Infusão contínua ininterrupta titulada por escalas validadas de avaliação de dor',
      duration: 'Durante todo o procedimento cirúrgico e mantida por 12 a 48 horas no pós-operatório imediato, com redução gradual',
      mechanismOfAction:
        'Em concentrações plasmáticas subanestésicas (~100 a 200 ng/mL, dez vezes menores que as anestésicas), a cetamina bloqueia seletivamente os receptores NMDA pós-sinápticos no corno dorsal da medula espinhal abertos pela descarga repetitiva das fibras C nociceptivas. Isso extingue a somação temporal medular (fenômeno de wind-up), impede a fosforilação e internalização dos receptores opioides mu e reduz a liberação de substância P e glutamato.',
      clinicalRationale:
        'A infusão contínua subanestésica de cetamina visa impedir e extinguir a somação temporal medular (fenômeno de "wind-up") desencadeada pelo bombardeio nociceptivo das fibras C durante o trauma cirúrgico. Em cães submetidos à amputação de membro torácico, a administração de bolus pré-incisional de 0,5 mg/kg IV seguido de infusão transoperatória de 10 µg/kg/min (0,6 mg/kg/h) e pós-operatória de 2 µg/kg/min (0,12 mg/kg/h) por 18 horas reduziu significativamente os escores de dor, melhorou a recuperação motora e reduziu a necessidade de opioides de resgate. Diretrizes multissociedades para dor aguda perioperatória (ASRA/ESRA) comparadas confirmam benefício consistente na redução do consumo de opioides em 30% a 40% com bolus ≤0,35 mg/kg IV associado a infusão de 0,1 a 0,5 mg/kg/h. Em gatos e cães, se houver sedação excessiva ou vocalização disfórica no pós-operatório, a taxa de infusão deve ser reduzida imediatamente pela metade.',
      monitoring:
        'Escores seriados de dor a cada 2 a 4 horas (Escala Composta de Glasgow em cães e Escala de Expressão Facial em gatos), sedação ou disforia (reduzir a taxa pela metade se houver vocalização disfórica), frequência cardíaca e pressão arterial.',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-schwenk-2018-asra-acute-pain', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Ensaios Clínicos Randomizados e Diretriz de Consenso em Dor Aguda',
      highlights: [
        'infusão contínua subanestésica',
        'somação temporal medular',
        'wind-up',
        'fibras C nociceptivas',
        'sensibilização central',
        'poupança de opioides',
        'hiperalgesia induzida por opioides',
        'receptores NMDA pós-sinápticos',
        'corno dorsal da medula espinhal',
        'receptores opioides mu',
        'bolus de ataque',
        'bolus pré-incisional',
      ],
    },
    {
      id: 'det-ind-cetamina-status-epilepticus',
      indication: 'Estado de Mal Epiléptico Refratário e Super-Refratário',
      clinicalContext:
        'Emergência neurológica crítica em cães e gatos com atividade convulsiva contínua (>5 a 30 minutos) ou crises agrupadas em salva que falharam aos benzodiazepínicos de primeira linha (diazepam ou midazolam) e aos anticonvulsivantes de segunda linha (levetiracetam, fenobarbital ou fosfenitoína).',
      species: 'both',
      dose: 'Bolus de ataque: 0,5 a 2 mg/kg IV lenta (até 3 a 5 mg/kg em casos refratários) → Infusão contínua: 0,5 a 2 mg/kg/h IV',
      route: 'Intravenosa (lenta ao longo de 2 a 3 minutos seguida imediatamente por infusão contínua em bomba de seringa)',
      frequency: 'Infusão contínua titulada até interrupção clínica e eletroencefalográfica das crises',
      duration: 'Manter por 12 a 24 horas após o controle das crises, realizando desmame escalonado (redução de 25% a cada 4 a 6 horas)',
      mechanismOfAction:
        'Após 15 a 30 minutos de atividade epiléptica ininterrupta, ocorre internalização endocítica progressiva dos receptores sinápticos inibitórios GABA-A (explicando a perda de eficácia dos benzodiazepínicos), simultaneamente ao tráfego e externalização maciça de receptores excitatórios NMDA na membrana pós-sináptica. A cetamina bloqueia diretamente esses canais NMDA abertos, interrompendo a entrada tóxica de cálcio, o edema citotóxico e a morte neuronal.',
      clinicalRationale:
        'O consenso internacional de neurologia veterinária (ACVIM) posiciona a cetamina (bolus de ataque seguido de infusão contínua em bomba) como intervenção mecanística de escolha no estado de mal epiléptico refratário. Sua principal vantagem frente à anestesia geral contínua com propofol ou barbitúricos é interromper a descarga epiléptica preservando o tônus simpático e a pressão de perfusão cerebral, sem induzir hipotensão arterial severa nem colapso hemodinâmico. O desmame deve ser lento e gradual após pelo menos 12 a 24 horas sem crises clínicas.',
      monitoring:
        'Monitoramento neurológico contínuo (e eletroencefalográfico quando disponível), pressão arterial sistêmica, capnografia, oximetria, temperatura corporal e glicemia.',
      referenceIds: ['ref-charalambous-2024-acvim-se', 'ref-roynard-2021-ketamine-se', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Diretriz de Consenso Internacional em Neurologia Veterinária',
      highlights: [
        'estado de mal epiléptico refratário',
        'internalização endocítica',
        'receptores sinápticos inibitórios GABA-A',
        'externalização maciça',
        'receptores excitatórios NMDA',
        'edema citotóxico',
        'pressão de perfusão cerebral',
        'desmame escalonado',
      ],
    },
    {
      id: 'det-ind-cetamina-dor-cronica-neuropatica',
      indication: 'Dor Crônica, Neuropática e Síndrome Dolorosa Regional Complexa',
      clinicalContext:
        'Resgate hospitalar ou ambulatorial adjuvante em dor neuropática refratária, dor fantasma pós-amputação, osteoartrite severa com sensibilização central estabelecida e dor oncológica osteolítica.',
      species: 'both',
      dose: 'Protocolo ambulatorial: 0,5 a 1 mg/kg SC a cada 7 a 30 dias | Infusão hospitalar de dessensibilização: 0,1 a 0,3 mg/kg/h IV (ciclo de 6 a 24 horas)',
      route: 'Subcutânea (SC) ou Intravenosa em infusão contínua (IV)',
      frequency: 'Aplicações periódicas (SC) ou ciclo curto hospitalar (IV)',
      duration: 'Avaliar resposta funcional após 1 a 3 aplicações; suspender se não houver benefício clínico objetivo',
      mechanismOfAction:
        'Reversão da potenciação nociceptiva de longo prazo no corno dorsal da medula espinhal e no córtex cingulado anterior por bloqueio de receptores NMDA contendo a subunidade GluN2B e reforço das vias inibitórias descendentes.',
      clinicalRationale:
        'Ao contrário do benefício consistente na dor aguda perioperatória, a evidência na dor crônica é heterogênea e exige seleção rigorosa. Diretrizes de dor crônica apontam sinal mais favorável na síndrome dolorosa regional complexa do que em dores crônicas inespecíficas. Enquanto uma síntese inicial de 7 ensaios clínicos indicou redução média de 1,83 pontos na escala de dor (0 a 10) por até 2 semanas (taxa de resposta de 51,3% contra 19,4% no controle), revisões sistemáticas mais recentes classificaram a certeza da evidência para dor crônica não oncológica como baixa a muito baixa, e na dor neuropática observaram razão de risco de 2,79 para alívio ≥50% da dor em amostras pequenas (135 pacientes) acompanhada de mais efeitos adversos. Além disso, cursos prolongados ou repetidos elevam o risco de hepatotoxicidade e uropatia.',
      monitoring:
        'Enzimas hepáticas (ALT, AST, fosfatase alcalina e GGT) antes e após ciclos repetidos, pesquisa ativa de sinais urinários (disúria, polaciúria e hematúria) e reavaliação funcional da dor.',
      referenceIds: ['ref-cohen-2018-asra-chronic-pain', 'ref-cochrane-2025-chronic-pain', 'ref-neuropathy-meta-2026'],
      evidenceLevel: 'Certeza Baixa a Moderada — Uso Adjuvante Selecionado',
      highlights: [
        'dor neuropática refratária',
        'alodinia',
        'hiperalgesia',
        'potenciação nociceptiva de longo prazo',
        'corno dorsal da medula espinhal',
        'subunidade GluN2B',
        'síndrome dolorosa regional complexa',
        'hepatotoxicidade',
        'uropatia ulcerativa',
      ],
    },
    {
      id: 'det-ind-cetamina-translacional-psiquiatria-emergencia',
      indication: 'Farmacologia Comparada e Translacional: Sedação de Emergência, Agitação Grave e Depressão Resistente / Ideação Suicida Aguda',
      clinicalContext:
        'Síntese de medicina comparada e translacional abrangendo sedação dissociativa para procedimentos de emergência, controle rápido de agitação psicomotora extrema e protocolos neuroplásticos para depressão resistente ao tratamento e ideação suicida aguda.',
      species: 'both',
      dose: 'Sedação pediátrica: 1 a 2 mg/kg IV ou 4 a 5 mg/kg IM | Agitação psicomotora: 5 mg/kg IM | Depressão resistente (extrabula): 0,5 mg/kg IV em 40 min | Escetamina intranasal (Spravato®): 56 a 84 mg intranasal supervisionada',
      route: 'IV (infusão lenta de 40 minutos na psiquiatria ou bolus na emergência), SC, IM ou Intranasal supervisionada',
      frequency: 'Dose única (emergência e sedação) ou 2×/semana por 4 semanas seguida de manutenção individualizada (psiquiatria)',
      duration: 'Observação presencial obrigatória mínima de 2 horas após cada dose nos protocolos psiquiátricos',
      mechanismOfAction:
        'Em doses subanestésicas (0,5 mg/kg IV em 40 minutos ou 56 a 84 mg de escetamina intranasal), promove desinibição de interneurônios GABAérgicos, pulso cortical de glutamato, ativação de receptores AMPA, liberação de BDNF, ativação do complexo TrkB–mTORC1 e desfosforilação de eEF2, restaurando rapidamente a conectividade sináptica pré-frontal e límbica. Em doses de 4 a 5 mg/kg IM na emergência, induz desconexão talamocortical dissociativa rápida (~5,8 minutos).',
      clinicalRationale:
        'Na sedação pediátrica de emergência, a análise de 58.752 crianças submetidas à cetamina intravenosa documentou zero óbitos, zero sequelas neurológicas permanentes e eventos críticos sentinela em apenas 0,0041% (~1 em 24.390 sedações). Na agitação aguda grave, a cetamina 5 mg/kg IM atingiu sedação adequada em 5,8 minutos contra 14,7 minutos com haloperidol + midazolam IM, exigindo porém equipe habilitada para suporte avançado de via aérea. Na depressão resistente e ideação suicida aguda, ensaios controlados por placebo e por midazolam demonstraram resposta em 24 horas de 64% a 71% (tamanho de efeito de −1,15 para depressão e −0,69 para ideação suicida em meta-análise de 26 ensaios com 1.166 pacientes), enquanto na via subcutânea titulada (0,5 a 0,9 mg/kg) a remissão atingiu 19,6% contra 2,0% com midazolam. Para a escetamina intranasal, sínteses de 6 ensaios e de dados individuais (1.505 pacientes) demonstraram redução adicional média de −2,99 a −2,94 pontos na escala MADRS no dia 28 frente ao antidepressivo associado a placebo, com a ressalva regulatória expressa de que a prevenção de suicídio consumado não está comprovada e não substitui hospitalização quando clinicamente indicada.',
      monitoring:
        'Aferição de pressão arterial e frequência cardíaca antes da dose e entre 40 e 120 minutos após (elevação média de +12,6 a +16 mmHg na pressão sistólica; hipertensão severa em ~1%), avaliação de sedação, dissociação e aptidão para alta somente após pelo menos 2 horas de observação clínica.',
      referenceIds: [
        'ref-zarate-2006-trd',
        'ref-murrough-2013-midazolam',
        'ref-loo-2023-kads-sc',
        'ref-meta-2026-mdd-26rcts',
        'ref-green-roback-2026-pediatric',
      ],
      evidenceLevel: 'Meta-análises de Ensaios Clínicos Randomizados e Aprovações Regulatórias',
      highlights: [
        'sedação dissociativa',
        'agitação psicomotora',
        'depressão resistente ao tratamento',
        'ideação suicida aguda',
        'Spravato®',
        'interneurônios GABAérgicos',
        'receptores AMPA',
        'BDNF',
        'TrkB',
        'mTORC1',
        'eEF2',
        'sinaptogênese',
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
      frequency: 'Dose única de indução anestésica (co-indução: 1 a 2 mg/kg IV; indução com midazolam ou diazepam 0,25 mg/kg: 2 a 5 mg/kg IV)',
      duration: 'Ação de 10 a 15 minutos',
      clinicalContext: 'Indução anestésica balanceada poupadora de propofol e protetora hemodinâmica',
      monitoring: 'Eletrocardiograma, pressão arterial, frequência respiratória, capnografia e lubrificação corneana',
      notes:
        'Nunca administrar cetamina isolada em cães (causa rigidez muscular severa, mioclonias e convulsões). Na co-indução, administrar primeiro um bolus parcial de propofol (1 a 2 mg/kg IV) ou midazolam (0,2 a 0,3 mg/kg IV) seguido de cetamina 1 a 2 mg/kg IV lenta. Se utilizar cloridrato de escetamina S(+) (50 mg/mL), reduzir a dose calculada em 30% a 50%.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
    {
      id: 'dose-cetamina-cat-coinducao-iv',
      species: 'cat',
      indication: 'Co-indução anestésica intravenosa em felinos (associada a midazolam, diazepam, propofol ou alfaxalona)',
      doseMin: 1.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 60 segundos)',
      frequency: 'Dose única titulada ao efeito (co-indução: 1 a 2 mg/kg IV; indução com midazolam 0,2–0,3 mg/kg: 2 a 5 mg/kg IV)',
      duration: '10 a 20 minutos',
      clinicalContext: 'Indução anestésica geral felina',
      monitoring: 'Reflexo laríngeo (dessensibilizar a epiglote com lidocaína tópica antes de intubar), pressão arterial, frequência cardíaca, oximetria e capnografia',
      notes:
        'Em gatos, os reflexos laríngeos e faríngeos permanecem ativos sob cetamina: instilar obrigatoriamente 0,1 mL de lidocaína a 2% sem vasoconstritor na laringe e aguardar 60 a 90 segundos antes da intubação orotraqueal para evitar laringoespasmo grave. Evitar em gatos com cardiomiopatia hipertrófica obstrutiva ou hipertireoidismo não controlado.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
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
      frequency: 'Dose única (2 a 5 mg/kg IM para contenção e exames associada a dexmedetomidina + opioide; 5 a 10 mg/kg IM para plano cirúrgico curto)',
      duration: '20 a 45 minutos de imobilização',
      clinicalContext: 'Pacientes felinos de difícil manipulação, exames diagnósticos ou castrações rápidas em protocolo multimodal',
      monitoring: 'Temperatura retal, oximetria de pulso, frequência respiratória, proteção ocular e recuperação em ambiente escuro e silencioso',
      notes:
        'Associar sempre a um agonista alfa-2 (dexmedetomidina 5 a 20 µg/kg IM) e um opioide (metadona 0,2 a 0,3 mg/kg ou butorfanol 0,2 a 0,4 mg/kg) ± midazolam (0,2 mg/kg IM). O pH ácido da cetamina (3,5 a 5,5) causa dor à injeção intramuscular; em emergências extremas sem acesso, pode ser realizada aplicação transmucosa oral (5 a 10 mg/kg na cavidade bucal), embora a absorção seja menor e o sabor ácido provoque sialorreia.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-shah-2019-quad-ketamine'],
      evidenceLevel: 'Ensaios Clínicos Felinos e Formulários Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
    {
      id: 'dose-cetamina-dog-contencao-im',
      species: 'dog',
      indication: 'Contenção química intramuscular de cães de difícil manipulação (em associação obrigatória)',
      doseMin: 2.0,
      doseMax: 5.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IM profunda',
      frequency: 'Dose única combinada com agonista alfa-2 (dexmedetomidina 5 a 15 µg/kg IM) + opioide (metadona 0,3 a 0,5 mg/kg IM) ± midazolam (0,2 a 0,3 mg/kg IM)',
      duration: '25 a 45 minutos',
      clinicalContext: 'Manejo de emergência de cães agressivos sem possibilidade de contenção física segura',
      monitoring: 'Vias aéreas, oxigenação, temperatura corporal (risco de hipertermia por agitação prévia) e pressão arterial',
      notes:
        'Jamais aplicar cetamina intramuscular isolada em cães. A combinação com dexmedetomidina e opioide garante relaxamento muscular e sedação confiável em 5 a 10 minutos. Não reverter a dexmedetomidina com atipamezole nos primeiros 30 a 45 minutos para não desmascarar excitação dissociativa e hipertonia canina.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-bsava-10-cetamina'],
      evidenceLevel: 'Formulários Farmacológicos Veterinários',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
    {
      id: 'dose-cetamina-both-bolus-analgesico-ataque',
      species: 'both',
      indication: 'Bolus analgésico subanestésico de ataque (pré-incisional ou pré-infusão contínua anti-hiperalgésica)',
      doseMin: 0.25,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 2 a 3 minutos)',
      frequency: 'Bolus inicial imediatamente antes de iniciar a infusão contínua',
      duration: 'Atinge equilíbrio imediato no receptor NMDA medular',
      clinicalContext: 'Prevenção de somação temporal medular perioperatória e resgate de dor aguda grave (diretriz comparada: ≤0,35 mg/kg IV)',
      monitoring: 'Frequência cardíaca, pressão arterial e ausência de nistagmo ou disforia',
      notes:
        'Obrigatório antes de iniciar a infusão contínua analgésica para ocupar prontamente o sítio intraporos dos receptores NMDA abertos no corno dorsal da medula antes do estímulo cirúrgico nociceptivo.',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-schwenk-2018-asra-acute-pain', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Ensaios Clínicos Randomizados e Diretriz de Dor Aguda',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
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
      frequency: 'Contínua durante toda a cirurgia (0,6 mg/kg/h = 10 µg/kg/min no transoperatório; 0,12 a 0,3 mg/kg/h = 2 a 5 µg/kg/min no pós-operatório)',
      duration: 'Transoperatório e primeiras 12 a 48 horas de pós-operatório',
      clinicalContext: 'Analgesia multimodal intra e pós-operatória (reduz a concentração alveolar mínima dos inalatórios em 20% a 35% e previne hiperalgesia opioide)',
      monitoring: 'Plano anestésico, pressão arterial, escores de dor e vigilância para disforia',
      notes:
        'Conversão prática: 2 µg/kg/min = 0,12 mg/kg/h | 5 µg/kg/min = 0,3 mg/kg/h | 10 µg/kg/min = 0,6 mg/kg/h. Regra de diluição: adicionar 60 mg de cetamina (0,6 mL da solução a 100 mg/mL) em 500 mL de NaCl 0,9% ou Ringer Lactato (concentração final = 0,12 mg/mL); infundir a 1 mL/kg/h entrega exatamente 0,12 mg/kg/h (2 µg/kg/min), e a 5 mL/kg/h entrega 0,6 mg/kg/h (10 µg/kg/min).',
      referenceIds: ['ref-wagner-2002-ketamine-cri', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Ensaios Clínicos Veterinários e Formulários Farmacológicos',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
    {
      id: 'dose-cetamina-both-status-epilepticus-acvim',
      species: 'both',
      indication: 'Estado de mal epiléptico refratário e super-refratário — Bolus de ataque e infusão contínua',
      doseMin: 0.5,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (ao longo de 2 a 3 minutos)',
      frequency: 'Bolus de ataque único (casos refratários extremos podem requerer até 3 a 5 mg/kg IV), seguido imediatamente por infusão contínua de 0,5 a 2 mg/kg/h',
      duration: 'Manter a infusão contínua por 12 a 24 horas após controle das crises, com desmame gradual',
      clinicalContext: 'Falha de benzodiazepínicos e anticonvulsivantes de segunda linha (bloqueio de receptores NMDA externalizados)',
      monitoring: 'Monitorização neurológica contínua, eletroencefalograma (se disponível), pressão arterial, frequência cardíaca, oximetria e capnografia',
      notes:
        'No estado de mal epiléptico prolongado (>30 minutos), os receptores GABA-A são internalizados e os receptores NMDA são traficados para a superfície sináptica. A cetamina interrompe a excitotoxicidade cálcio-dependente sem causar a hipotensão severa do propofol ou fenobarbital em altas doses.',
      referenceIds: ['ref-charalambous-2024-acvim-se', 'ref-roynard-2021-ketamine-se', 'ref-plumbs-10-audit-cetamina'],
      evidenceLevel: 'Diretriz de Consenso Internacional em Neurologia Veterinária',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
    {
      id: 'dose-cetamina-both-sc-dor-cronica',
      species: 'both',
      indication: 'Adjuvante subanestésico subcutâneo para dor crônica e neuropática com sensibilização central',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC (Subcutânea)',
      frequency: 'Intermitente a cada 7 a 30 dias em ambiente clínico supervisionado',
      duration: 'Avaliar resposta após 1 a 3 sessões; monitorar função hepática e urinária em uso repetido',
      clinicalContext: 'Osteoartrite refratária, dor oncológica ou dor neuropática com sensibilização central estabelecida',
      monitoring: 'Observação clínica por 60 minutos pós-aplicação, perfil hepático (ALT, fosfatase alcalina e GGT) e sinais urinários',
      notes:
        'A via subcutânea apresenta biodisponibilidade de ~64% em modelos farmacocinéticos e evita o pico dissociativo do bolus intravenoso. Como a evidência em dor crônica apresenta certeza baixa a moderada, deve ser utilizada apenas como componente de plano multimodal.',
      referenceIds: ['ref-plumbs-10-audit-cetamina', 'ref-cohen-2018-asra-chronic-pain', 'ref-cochrane-2025-chronic-pain'],
      evidenceLevel: 'Consensos de Dor e Extrapolação Clínica Supervisionada',
      calculatorEnabled: true,
      presentationId: 'pres-cetamin-syntec-100mg-10ml',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'found-cetamina-entidades-receptor-nmda-hcn1',
      title: 'As Três Entidades Clínicas da Cetamina, Estereoquímica e o Bloqueio do Canal NMDA e HCN1',
      narrative:
        'O termo cetamina abrange três entidades farmacêuticas distintas que diferem em estereoquímica, potência, via de administração e enquadramento regulatório: (1) a cetamina racêmica, mistura equimolar 1:1 (50%/50%) dos enantiômeros R(−)-cetamina (arcetamina) e S(+)-cetamina (escetamina), disponível como solução injetável veterinária (100 mg/mL) e humana (50 mg/mL), cujos enantiômeros são metabolizados estereosseletivamente sem interconversão biológica; (2) a escetamina injetável (S(+)-cetamina ou dextrocetamina, disponível a 50 mg/mL), que isola o enantiômero S(+) dotado de afinidade cerca de 3 a 4 vezes superior pelo sítio da fenciclidina no receptor NMDA e potência anestésica e analgésica cerca de duas vezes maior que a mistura racêmica; e (3) a escetamina intranasal (Spravato®, 28 mg por dispositivo), aprovada especificamente para depressão resistente ao tratamento em adultos e para redução rápida de sintomas depressivos no transtorno depressivo maior com ideação ou comportamento suicida agudo, com a ressalva regulatória de que a efetividade na prevenção do suicídio consumado não foi provada e seu uso não elimina a necessidade de hospitalização quando clinicamente indicada.\n\n' +
        'No plano molecular canônico, o receptor NMDA é um canal iônico glutamatérgico heterotetramérico altamente permeável a íons sódio e cálcio. Em estado de repouso, o poro do canal encontra-se bloqueado por um íon magnésio extracelular (Mg²⁺) de maneira dependente de voltagem. A abertura do canal exige a coincidência entre a ligação do glutamato e do coagonista obrigatório (glicina ou D-serina) somada à despolarização da membrana pós-sináptica que expulsa o íon Mg²⁺. A cetamina atua como antagonista não competitivo, dependente do uso e do estado aberto do canal: ela penetra no poro apenas quando o canal está ativado e liga-se ao sítio intraporos da fenciclidina, reduzindo drasticamente o influxo patológico de cálcio. Em doses anestésicas, esse bloqueio interrompe a integração sináptica entre os sistemas talamocortical, límbico e cortical associativo, produzindo a anestesia dissociativa — na qual o paciente permanece profundamente desconectado do ambiente, com analgesia somática intensa e amnésia, mas mantendo reflexos parciais de tronco encefálico (corneano, palpebral, laríngeo e faríngeo). Além do receptor NMDA, o efeito hipnótico anestésico é co-mediado pela inibição de canais marcapasso HCN1, responsáveis pelas correntes hiperpolarizantes Ih que regulam o ritmo talamocortical.',
      narrativeHighlights: [
        'três entidades farmacêuticas distintas',
        'cetamina racêmica, mistura equimolar 1:1 (50%/50%)',
        'escetamina injetável',
        'afinidade cerca de 3 a 4 vezes superior pelo sítio da fenciclidina no receptor NMDA',
        'escetamina intranasal (Spravato®',
        'antagonista não competitivo, dependente do uso e do estado aberto do canal',
        'anestesia dissociativa',
        'inibição de canais marcapasso HCN1',
      ],
      referenceIds: ['ref-fda-ketalar-label', 'ref-anvisa-spravato-2020', 'ref-chen-2009-hcn1-ketamine', 'ref-wagner-2002-ketamine-cri'],
      studies: [
        {
          citation:
            'Subunidades de canais HCN1 como substrato molecular para as ações hipnóticas da cetamina (Chen et al., 2009)',
          referenceId: 'ref-chen-2009-hcn1-ketamine',
          sourceType: 'Estudo neurofisiológico e molecular mecanicista',
          summaryText:
            'Demonstrou que a cetamina, em concentrações clinicamente relevantes, inibe de forma potente os canais marcapasso HCN1 ativados por hiperpolarização (corrente Ih), e que animais com deleção genética de HCN1 no prosencéfalo apresentam acentuada resistência à capacidade da cetamina de induzir hipnose e perda do reflexo de endireitamento.',
          summaryHighlights: [
            'inibe de forma potente os canais marcapasso HCN1',
            'acentuada resistência à capacidade da cetamina de induzir hipnose',
          ],
          metrics: ['Deleção de HCN1: forte redução da sensibilidade hipnótica'],
          clinicalConclusion:
            'Explica por que a inconsciência anestésica produzida pela cetamina vai além do bloqueio NMDA isolado, envolvendo o desligamento de correntes marcapasso talamocorticais.',
        },
        {
          citation:
            'Uso de baixas doses de cetamina em infusão contínua como adjuvante para analgesia pós-operatória em cães (Wagner et al., 2002)',
          referenceId: 'ref-wagner-2002-ketamine-cri',
          sourceType: 'Ensaio clínico randomizado controlado por placebo em cães',
          summaryText:
            'Avaliou cães submetidos à amputação de membro torácico recebendo opioide isolado ou associado a bolus pré-incisional de cetamina (0,5 mg/kg IV) seguido de infusão contínua transoperatória de 10 µg/kg/min (0,6 mg/kg/h) e pós-operatória de 2 µg/kg/min (0,12 mg/kg/h) por 18 horas. O grupo tratado com cetamina apresentou escores de dor significativamente menores entre 12 e 18 horas pós-operatórias e maior atividade física no terceiro dia.',
          summaryHighlights: [
            'bolus pré-incisional de cetamina (0,5 mg/kg IV)',
            '10 µg/kg/min (0,6 mg/kg/h)',
            '2 µg/kg/min (0,12 mg/kg/h)',
            'escores de dor significativamente menores',
          ],
          metrics: ['Ataque: 0,5 mg/kg IV', 'Infusão: 0,12 a 0,6 mg/kg/h'],
          clinicalConclusion:
            'Estabeleceu o regime de referência na cirurgia veterinária para prevenção da somação temporal medular e sensibilização central pós-incisional.',
        },
      ],
    },
    {
      id: 'found-cetamina-paradoxo-glutamato-ampa-bdnf-mtor-hnk',
      title: 'O Paradoxo do Antagonista Excitatório: Desinibição GABAérgica, Cascata AMPA–BDNF–TrkB–mTORC1, Via eEF2K e o Debate HNK/Opioide',
      narrative:
        'A explicação para o fato de um bloqueador de receptores excitatórios (NMDA) aumentar a atividade sináptica cortical e reconstruir conexões neuronais em poucas horas reside no fenômeno do antagonista excitatório em doses subanestésicas (0,1 a 0,5 mg/kg). Nessa faixa de concentração, a cetamina bloqueia preferencialmente os receptores NMDA situados sobre interneurônios inibitórios GABAérgicos de disparo rápido, pois esses interneurônios disparam em alta frequência e mantêm seus canais NMDA tonicamente abertos e livres do bloqueio por magnésio. Ao reduzir a atividade desses interneurônios, diminui a liberação de GABA e ocorre desinibição dos neurônios piramidais glutamatérgicos, gerando um surto transitório de glutamato extracelular no córtex pré-frontal e no hipocampo.\n\n' +
        'Esse glutamato recém-liberado estimula intensamente os receptores AMPA pós-sinápticos, desencadeando despolarização, abertura de canais de cálcio sensíveis à voltagem e liberação de fator neurotrófico derivado do cérebro (BDNF). A ligação do BDNF ao seu receptor TrkB ativa as vias intracelulares Akt, ERK e o complexo mTORC1, promovendo rápida tradução de proteínas sinápticas (PSD-95, subunidades GluA1 e sinapsina-1) e formação de novas espinhas dendríticas. De maneira convergente, o bloqueio das correntes miniaturas espontâneas de NMDA em repouso inibe a quinase do fator de alongamento eucariótico 2 (eEF2K), reduzindo a fosforilação do fator eEF2 e liberando a síntese traducional rápida de BDNF.\n\n' +
        'Sequência funcional integrada: Cetamina subanestésica → bloqueia NMDA em interneurônio GABAérgico → reduz liberação de GABA → desinibe neurônio piramidal → aumenta liberação de glutamato → ativa receptores AMPA → estimula síntese e liberação de BDNF → ativa TrkB e mTORC1/ERK/Akt (somado à desrepressão via eEF2K/eEF2) → promove sinaptogênese rápida e restauração da conectividade cortical.\n\n' +
        'Em paralelo, dois mecanismos complementares enriquecem a farmacologia contemporânea: (1) o metabólito hidroxilado (2R,6R)-hidroxinorcetamina [(2R,6R)-HNK] demonstrou em modelos experimentais produzir efeitos dependentes de receptores AMPA sem bloquear funcionalmente o receptor NMDA nem causar dissociação — embora sua contribuição quantitativa exata em humanos siga em debate; e (2) a modulação do sistema opioide endógeno (receptores mu, kappa e delta), evidenciada pelo fato de o pré-tratamento com naltrexona (50 mg) atenuar acentuadamente a resposta antidepressiva aguda da cetamina sem abolir a dissociação.',
      narrativeHighlights: [
        'bloqueia preferencialmente os receptores NMDA situados sobre interneurônios inibitórios GABAérgicos de disparo rápido',
        'desinibição dos neurônios piramidais glutamatérgicos',
        'surto transitório de glutamato extracelular',
        'estimula intensamente os receptores AMPA pós-sinápticos',
        'fator neurotrófico derivado do cérebro (BDNF)',
        'complexo mTORC1',
        'inibe a quinase do fator de alongamento eucariótico 2 (eEF2K)',
        '(2R,6R)-hidroxinorcetamina [(2R,6R)-HNK]',
        'pré-tratamento com naltrexona (50 mg) atenuou acentuadamente a resposta antidepressiva',
      ],
      referenceIds: ['ref-li-2010-science-mtor', 'ref-autry-2011-nature-eef2', 'ref-zanos-2016-nature-hnk', 'ref-williams-2018-naltrexone'],
      studies: [
        {
          citation:
            'A formação de sinapses dependente de mTOR fundamenta os efeitos antidepressivos rápidos dos antagonistas NMDA (Li et al., 2010)',
          referenceId: 'ref-li-2010-science-mtor',
          sourceType: 'Estudo experimental mecanicista',
          summaryText:
            'Demonstrou que a cetamina ativa rapidamente a via de sinalização do complexo mTOR no córtex pré-frontal, elevando a expressão de proteínas sinápticas (PSD-95, GluA1 e sinapsina I) e a densidade e função de novas espinhas dendríticas em 24 horas; o bloqueio farmacológico de mTOR com rapamicina aboliu a sinaptogênese e os efeitos comportamentais.',
          summaryHighlights: [
            'ativa rapidamente a via de sinalização do complexo mTOR no córtex pré-frontal',
            'novas espinhas dendríticas em 24 horas',
          ],
          metrics: ['Sinaptogênese cortical em <24 h dependente de AMPA e mTORC1'],
          clinicalConclusion:
            'Comprovou que o efeito neuroplástico rápido decorre da reconstrução estrutural de sinapses glutamatérgicas.',
        },
        {
          citation:
            'O bloqueio de receptores NMDA em repouso desencadeia respostas antidepressivas comportamentais rápidas via eEF2 (Autry et al., 2011)',
          referenceId: 'ref-autry-2011-nature-eef2',
          sourceType: 'Estudo experimental mecanicista',
          summaryText:
            'Comprovou que a supressão de correntes miniaturas espontâneas de NMDA em repouso pela cetamina inativa a quinase eEF2K (CaMKIII), promovendo rápida desfosforilação do fator eEF2 e desbloqueio da tradução proteica dendrítica de BDNF no hipocampo.',
          summaryHighlights: [
            'inativa a quinase eEF2K',
            'desbloqueio da tradução proteica dendrítica de BDNF',
          ],
          metrics: ['Desfosforilação rápida de eEF2 e síntese de BDNF'],
          clinicalConclusion:
            'Identificou a via intracelular eEF2K/eEF2/BDNF como mecanismo direto de plasticidade sináptica induzida pela cetamina.',
        },
        {
          citation:
            'Ações antidepressivas independentes da inibição do receptor NMDA exercidas por metabólitos da cetamina (Zanos et al., 2016)',
          referenceId: 'ref-zanos-2016-nature-hnk',
          sourceType: 'Estudo farmacológico e translacional',
          summaryText:
            'Demonstrou em modelos murinos que a biotransformação da cetamina até o metabólito (2R,6R)-hidroxinorcetamina [(2R,6R)-HNK] promove potencialização sináptica mediada por receptores AMPA e efeitos comportamentais sustentados sem inibir funcionalmente o receptor NMDA e sem induzir dissociação motora ou autoadministração.',
          summaryHighlights: [
            'metabólito (2R,6R)-hidroxinorcetamina [(2R,6R)-HNK]',
            'potencialização sináptica mediada por receptores AMPA',
            'sem inibir funcionalmente o receptor NMDA',
          ],
          metrics: ['Metabólito (2R,6R)-HNK ativo sobre receptores AMPA'],
          clinicalConclusion:
            'Evidenciou o papel potencial dos metabólitos hidroxilados, sobretudo nas vias de administração com elevado metabolismo de primeira passagem.',
        },
        {
          citation:
            'Atenuação dos efeitos antidepressivos da cetamina pelo antagonismo de receptores opioides com naltrexona (Williams et al., 2018)',
          referenceId: 'ref-williams-2018-naltrexone',
          sourceType: 'Ensaio clínico randomizado duplo-cego de delineamento cruzado',
          summaryText:
            'Avaliou adultos com depressão resistente recebendo cetamina 0,5 mg/kg IV precedida por placebo ou naltrexona 50 mg por via oral (12 participantes completaram ambas as condições na análise interina). O pré-tratamento com naltrexona reduziu drasticamente a resposta clínica antidepressiva da cetamina sem alterar a intensidade da dissociação aguda.',
          summaryHighlights: [
            'naltrexona 50 mg por via oral',
            'reduziu drasticamente a resposta clínica antidepressiva',
            'sem alterar a intensidade da dissociação aguda',
          ],
          metrics: ['12 pacientes em ensaio cruzado; atenuação pela naltrexona'],
          clinicalConclusion:
            'Demonstra que a integridade da sinalização opioide endógena participa da resposta clínica rápida da cetamina.',
        },
      ],
    },
    {
      id: 'found-cetamina-farmacocinetica-vias-cyp',
      title: 'Farmacocinética Comparada por Via de Administração, Modelagem Subcutânea e Cascata Enzimática Estereosseletiva',
      narrative:
        'A cetamina apresenta alta lipossolubilidade e baixa ligação a proteínas plasmáticas (~10% a 15% em humanos; ~30% a 50% em cães e gatos), exibindo distribuição tecidual rápida e perfil plasmático bifásico: uma fase alfa de distribuição rápida (meia-vida de 10 a 15 minutos, correspondente à duração da anestesia dissociativa após bolus intravenoso e governada pela redistribuição do encéfalo para tecidos periféricos) seguida por uma fase beta de eliminação terminal (meia-vida de ~2,5 horas na bula regulatória humana [2 a 4 horas em revisões clínicas] e de 1 a 2 horas em cães e gatos).\n\n' +
        'Comparativo de biodisponibilidade e comportamento cinético conforme a via:\n' +
        '• Via intravenosa (IV): Biodisponibilidade de 100% e pico imediato, sendo a via padrão para indução titulável e infusão contínua.\n' +
        '• Via intramuscular (IM): Embora um estudo clássico descreva ~93%, uma revisão sistemática farmacocinética recente documentou faixa publicada entre 41,1% e 93% (pico em 10 a 30 minutos), destacando alta variabilidade interindividual e escassez de dados robustos em doses acima de 1 mg/kg em humanos.\n' +
        '• Via subcutânea (SC): Em modelo farmacocinético populacional, a absorção subcutânea segue cinética de primeira ordem com biodisponibilidade estimada em ~64%, apresentando menor pico plasmático e melhor tolerabilidade que o bolus intravenoso.\n' +
        '• Via intranasal (IN): Biodisponibilidade de ~43% a 50% (pico em 20 a 40 minutos), dependente da deposição na mucosa nasal, da depuração mucociliar e da porção deglutida.\n' +
        '• Via sublingual e transmucosa oral (OTM): Biodisponibilidade de ~29% a 32% (pico em ~45 minutos).\n' +
        '• Via oral (VO): Biodisponibilidade de apenas ~17% a 18% para a cetamina racêmica (pico em 20 a 120 minutos), em razão do extenso metabolismo de primeira passagem intestinal e hepático que origina elevadas proporções de norcetamina e hidroxinorcetaminas — motivo pelo qual doses orais e intravenosas não podem ser equiparadas apenas multiplicando-se pela biodisponibilidade.\n\n' +
        'Na cascata metabólica hepática, a N-desmetilação estereosseletiva converte a cetamina em norcetamina (metabólito ativo com ~1/3 a 1/5 da potência original) por ação principal de CYP2B6 e CYP3A4 (e CYP2B11 no cão), sendo que a CYP3A4 desmetila a S-cetamina mais rapidamente do que a R-cetamina. Em seguida, a norcetamina é hidroxilada por CYP2A6, CYP2B6, CYP3A4 e CYP3A5 em isômeros de hidroxinorcetamina (HNK) e convertida via CYP2B6 em dehidronorcetamina (DHNK), sofrendo posterior glicuronidação e excreção predominantemente renal (~90%).',
      narrativeHighlights: [
        'perfil plasmático bifásico',
        'fase alfa de distribuição rápida (meia-vida de 10 a 15 minutos',
        'fase beta de eliminação terminal (meia-vida de ~2,5 horas',
        'faixa publicada entre 41,1% e 93%',
        'biodisponibilidade estimada em ~64%',
        'Intranasal (IN): Biodisponibilidade de ~43% a 50%',
        'Oral (VO): Biodisponibilidade de apenas ~17% a 18%',
        'doses orais e intravenosas não podem ser equiparadas apenas multiplicando-se pela biodisponibilidade',
        'CYP3A4 desmetila a S-cetamina mais rapidamente do que a R-cetamina',
      ],
      referenceIds: ['ref-fda-ketalar-label', 'ref-pk-im-review-2026', 'ref-loo-2023-kads-sc'],
      studies: [
        {
          citation:
            'Eficácia e segurança de um curso de 4 semanas de injeções subcutâneas repetidas de cetamina na depressão resistente ao tratamento — Estudo KADS (Loo et al., 2023)',
          referenceId: 'ref-loo-2023-kads-sc',
          sourceType: 'Ensaio clínico randomizado de Fase III duplo-cego controlado por ativo',
          summaryText:
            'Avaliou 174 pacientes com depressão resistente em duas coortes (dose fixa de 0,5 mg/kg SC versus dose flexível escalonada de 0,5 a 0,9 mg/kg SC, duas vezes por semana por 4 semanas, comparada ao controle ativo midazolam). A coorte de dose flexível foi significativamente superior ao midazolam (remissão de 19,6% com cetamina SC contra 2,0% com midazolam), com modelagem farmacocinética apontando biodisponibilidade subcutânea de ~64% e excelente segurança.',
          summaryHighlights: [
            'dose flexível escalonada de 0,5 a 0,9 mg/kg SC',
            'remissão de 19,6% com cetamina SC contra 2,0% com midazolam',
            'biodisponibilidade subcutânea de ~64%',
          ],
          metrics: ['174 pacientes', 'Remissão SC flexível: 19,6% vs 2,0% (midazolam)'],
          clinicalConclusion:
            'Validou a via subcutânea titulada como alternativa eficaz, prática e farmacocineticamente previsível à infusão intravenosa.',
        },
      ],
    },
    {
      id: 'found-cetamina-evidencias-dor-status-sedacao-psiquiatria',
      title: 'Evidências Clínicas por Indicação: Sedação de Emergência, Dor Aguda versus Dor Crônica, Estado de Mal Epiléptico e Depressão Resistente',
      narrative:
        'A consistência da evidência clínica da cetamina varia conforme a indicação terapêutica, exigindo avaliação crítica por domínio clínico:\n\n' +
        '1. Anestesia, sedação para procedimentos e agitação psicomotora extrema: Na sedação dissociativa pediátrica de emergência (~1 a 2 mg/kg IV ou 4 a 5 mg/kg IM), uma revisão sistemática abrangendo 58.752 crianças sedadas com cetamina intravenosa documentou zero mortes, zero sequelas neurológicas permanentes e eventos críticos sentinela em apenas 0,0041% (~1 em 24.390 sedações), corroborando registros anteriores com 38.910 sedações (0,04% de eventos críticos e zero óbitos). Na agitação psicomotora grave em emergência, um ensaio clínico randomizado comparando cetamina 5 mg/kg IM contra haloperidol 5 mg + midazolam 5 mg IM demonstrou tempo mediano para sedação adequada de 5,8 minutos contra 14,7 minutos (eventos adversos graves em 12,5% contra 5%, exigindo prontidão para manejo avançado de via aérea, visto que 5 mg/kg IM corresponde a dose dissociativa plena).\n\n' +
        '2. Dor aguda perioperatória versus dor crônica e neuropática: Na dor aguda perioperatória, diretrizes consensuais e ensaios cirúrgicos veterinários confirmam benefício robusto da cetamina subanestésica (bolus ≤0,35 a 0,5 mg/kg IV seguido de infusão de 0,1 a 0,6 mg/kg/h) na redução da intensidade álgica e do consumo de opioides. Em contrapartida, na dor crônica a evidência é heterogênea: embora exista sinal favorável na síndrome dolorosa regional complexa e uma meta-análise inicial de 7 ensaios tenha apontado redução média de 1,83 pontos na dor por até 2 semanas (resposta de 51,3% contra 19,4%), a revisão sistemática Cochrane de 2025 para dor crônica não encontrou evidência clara de benefício imediato, de curto ou médio prazo (certeza baixa a muito baixa), e uma meta-análise de 2026 em dor neuropática observou razão de risco de 2,79 para alívio ≥50% da dor, porém com amostra reduzida (135 pacientes) e aumento de eventos adversos.\n\n' +
        '3. Estado de mal epiléptico refratário: O consenso internacional de neurologia veterinária recomenda formalmente a cetamina (bolus de 0,5 a 2 mg/kg IV seguido de infusão contínua de 0,5 a 2 mg/kg/h) no estado de mal epiléptico refratário em cães e gatos, revertendo a excitotoxicidade mediada pelos receptores NMDA externalizados após a falha gabaérgica.\n\n' +
        '4. Depressão resistente ao tratamento e ideação suicida aguda: Os ensaios clínicos de infusão intravenosa subanestésica (0,5 mg/kg IV em 40 minutos) demonstraram taxas de resposta em 24 horas de 64% a 71% contra 0% a 28% nos controles (placebo ou midazolam), consolidados em meta-análise de 26 ensaios (1.166 pacientes) com diferença padronizada de médias de −1,15 para depressão em 24 horas e −0,69 para ideação suicida. Para a escetamina intranasal (Spravato®), meta-análises de 6 ensaios e de dados individuais (1.505 pacientes) demonstram redução média adicional de −2,99 a −2,94 pontos na escala MADRS no dia 28 frente ao antidepressivo associado a placebo, ressaltando que o principal desafio clínico atual reside na manutenção da resposta a longo prazo.',
      narrativeHighlights: [
        '58.752 crianças sedadas com cetamina intravenosa documentou zero mortes, zero sequelas neurológicas permanentes e eventos críticos sentinela em apenas 0,0041%',
        'agitação psicomotora grave em emergência',
        '5,8 minutos contra 14,7 minutos',
        'benefício robusto da cetamina subanestésica (bolus ≤0,35 a 0,5 mg/kg IV seguido de infusão de 0,1 a 0,6 mg/kg/h)',
        'revisão sistemática Cochrane de 2025 para dor crônica não encontrou evidência clara de benefício',
        'estado de mal epiléptico refratário em cães e gatos',
        'meta-análise de 26 ensaios (1.166 pacientes) com diferença padronizada de médias de −1,15 para depressão em 24 horas e −0,69 para ideação suicida',
        'redução média adicional de −2,99 a −2,94 pontos na escala MADRS no dia 28',
      ],
      referenceIds: [
        'ref-green-roback-2026-pediatric',
        'ref-zarate-2006-trd',
        'ref-murrough-2013-midazolam',
        'ref-meta-2026-mdd-26rcts',
        'ref-cochrane-2025-chronic-pain',
        'ref-charalambous-2024-acvim-se',
      ],
      studies: [
        {
          citation:
            'Eventos adversos sentinela associados à sedação intravenosa com cetamina em 58.752 crianças: revisão sistemática e análise de dados individuais (Green & Roback et al., 2026)',
          referenceId: 'ref-green-roback-2026-pediatric',
          sourceType: 'Revisão sistemática em sedação de emergência (58.752 pacientes)',
          summaryText:
            'Analisou 58.752 crianças submetidas à sedação dissociativa com cetamina intravenosa em serviços de emergência. Não ocorreu nenhum óbito nem sequela neurológica permanente; eventos críticos sentinela foram registrados em apenas 0,0041% (~1 em 24.390 sedações), sendo discretamente mais frequentes na vigência de infecção de vias aéreas superiores, idade igual ou superior a 10 anos e uso concomitante de opioides.',
          summaryHighlights: [
            '58.752 crianças',
            'nenhum óbito nem sequela neurológica permanente',
            'eventos críticos sentinela foram registrados em apenas 0,0041%',
          ],
          metrics: ['58.752 sedações', '0 óbitos', 'Eventos críticos: 0,0041%'],
          clinicalConclusion:
            'Comprova a elevada margem de segurança ventilatória e hemodinâmica da sedação dissociativa quando realizada com triagem de vias aéreas e monitorização.',
        },
        {
          citation:
            'Declaração de consenso sobre o manejo do estado de mal epiléptico e crises agrupadas em cães e gatos (Charalambous et al., 2024)',
          referenceId: 'ref-charalambous-2024-acvim-se',
          sourceType: 'Diretriz de consenso internacional em neurologia veterinária',
          summaryText:
            'Estabeleceu o algoritmo cronológico para o estado de mal epiléptico em cães e gatos, posicionando o bolus de cetamina (0,5 a 2 mg/kg IV, até 5 mg/kg) seguido de infusão contínua (0,5 a 2 mg/kg/h) na fase refratária (após falha de benzodiazepínicos e levetiracetam ou fenobarbital) para bloquear receptores NMDA externalizados.',
          summaryHighlights: [
            'bolus de cetamina (0,5 a 2 mg/kg IV',
            'infusão contínua (0,5 a 2 mg/kg/h)',
            'bloquear receptores NMDA externalizados',
          ],
          metrics: ['Ataque: 0,5 a 2 mg/kg IV', 'Infusão: 0,5 a 2 mg/kg/h'],
          clinicalConclusion:
            'Consolida a cetamina como anticonvulsivante e neuroprotetor de resgate essencial no estado de mal epiléptico refratário.',
        },
        {
          citation:
            'Ensaio clínico randomizado de um antagonista N-metil-D-aspartato na depressão maior resistente ao tratamento (Zarate et al., 2006)',
          referenceId: 'ref-zarate-2006-trd',
          sourceType: 'Ensaio clínico randomizado duplo-cego de delineamento cruzado',
          summaryText:
            'Dezoito pacientes com depressão resistente ao tratamento receberam infusão de cetamina racêmica (0,5 mg/kg IV ao longo de 40 minutos) ou placebo. Em 24 horas, 71% alcançaram critério de resposta e 29% atingiram remissão completa (tamanho de efeito d = 1,46), com início de melhora em 110 minutos e manutenção por até 7 dias em 35% dos casos.',
          summaryHighlights: [
            '0,5 mg/kg IV ao longo de 40 minutos',
            '71% alcançaram critério de resposta e 29% atingiram remissão completa',
            'tamanho de efeito d = 1,46',
          ],
          metrics: ['18 pacientes', 'Resposta em 24 h: 71%', 'Remissão: 29% (d = 1,46)'],
          clinicalConclusion:
            'Inaugurou o paradigma clínico da modulação glutamatérgica de ação rápida.',
        },
        {
          citation:
            'Eficácia antidepressiva da cetamina na depressão maior resistente ao tratamento: ensaio clínico randomizado controlado por midazolam em dois centros (Murrough et al., 2013)',
          referenceId: 'ref-murrough-2013-midazolam',
          sourceType: 'Ensaio clínico randomizado duplo-cego controlado por ativo',
          summaryText:
            'Para reduzir a quebra de cegamento funcional causada pela dissociação frente ao soro fisiológico, comparou cetamina 0,5 mg/kg IV em 40 minutos contra o sedativo ativo midazolam 0,045 mg/kg IV em 73 pacientes com depressão resistente. A taxa de resposta em 24 horas foi de 64% no grupo cetamina contra 28% no grupo midazolam, com diferença média de −7,95 pontos na escala MADRS.',
          summaryHighlights: [
            'midazolam 0,045 mg/kg IV',
            '64% no grupo cetamina contra 28% no grupo midazolam',
            'diferença média de −7,95 pontos na escala MADRS',
          ],
          metrics: ['73 pacientes', 'Resposta em 24 h: 64% vs 28%', 'Diferença MADRS: −7,95'],
          clinicalConclusion:
            'Confirmou a superioridade clínica rápida da cetamina frente a um controle psicoativo sedativo.',
        },
      ],
    },
    {
      id: 'found-cetamina-seguranca-toxicidades-lacunas-2026',
      title: 'Segurança Multissistêmica, Toxicidades em Órgãos-Alvo (Cardiovascular, Hepática, Urológica e Neurodesenvolvimento) e Lacunas Científicas Atuais',
      narrative:
        'A condução clínica segura da cetamina requer vigilância estruturada sobre cinco eixos de toxicidade orgânica e o reconhecimento das questões científicas ainda abertas:\n\n' +
        '1. Eixo cardiovascular (hipertensão transitória versus choque com depleção simpática): Ao inibir a recaptação neuronal de catecolaminas e elevar o tônus simpático central, a cetamina aumenta transitoriamente a pressão arterial e a frequência cardíaca. Em meta-análise de doses subanestésicas, a elevação média foi de +12,6 mmHg na pressão sistólica, +8,5 mmHg na diastólica e +4 bpm na frequência cardíaca; em série clínica de 2.342 infusões, o aumento máximo médio foi de +16 mmHg na sistólica e +11 mmHg na diastólica, ocorrendo hipertensão severa em cerca de 1% das sessões. Contudo, em pacientes críticos com depleção de catecolaminas (choque séptico ou hipovolêmico prolongado, trauma exaustivo ou cardiomiopatia descompensada), o efeito inotrópico negativo direto da cetamina sobre o miocárdio é desmascarado, podendo precipitar hipotensão grave e colapso circulatório.\n\n' +
        '2. Eixo hepatobiliar (lesão hepática induzida por fármacos): Infusões contínuas prolongadas ou cursos repetidos em curto intervalo podem provocar elevação de ALT, AST, fosfatase alcalina e GGT por agressão hepatocelular e colestática. Em série prospectiva com pacientes submetidos a duas infusões de 100 horas separadas por 16 dias, 3 de 6 pacientes (50%) desenvolveram lesão hepática aguda clinicamente relevante (reversível após suspensão imediata), fundamentando o alerta regulatório formal de hepatotoxicidade.\n\n' +
        '3. Eixo urológico (uropatia e cistite ulcerativa por cetamina): A excreção urinária crônica de altas concentrações de cetamina e norcetamina exerce citotoxicidade direta sobre o urotélio vesical, provocando infiltração mastocitária, ulceração mucosa, fibrose detrusora, polaciúria, urgência miccional, disúria, hematúria macroscópica, redução severa da capacidade vesical, necrose papilar e hidronefrose secundária. Em tratamentos repetidos, a triagem ativa de sintomas urinários e a suspensão imediata diante de disúria ou hematúria são obrigatórias.\n\n' +
        '4. Neurotoxicidade do desenvolvimento e potencial de abuso: Modelos animais pré-clínicos demonstram aumento de apoptose neuronal e alterações sinápticas após exposições anestésicas prolongadas (>3 horas) ou repetidas em altas doses durante o período de rápido desenvolvimento cerebral fetal e neonatal, embora protocolos terapêuticos supervisionados em baixas doses (0,5 mg/kg) em adultos não tenham demonstrado déficit neurocognitivo cumulativo consistente. Quanto ao potencial de dependência, revisões sistemáticas recentes indicam raros sinais de fissura ou busca ilícita quando a administração ocorre exclusivamente sob supervisão clínica hospitalar.\n\n' +
        '5. Lacunas científicas abertas: Permanece em investigação ativa a definição da melhor estratégia de manutenção após a resposta aguda, a identificação de biomarcadores capazes de distinguir respondedores sustentados de transitórios, a contribuição clínica exata de R-cetamina, S-cetamina e (2R,6R)-HNK em pacientes, o risco cumulativo hepático e urológico após anos de terapia intermitente, a comparação direta entre cetamina racêmica intravenosa, subcutânea e escetamina intranasal, e a separação metodológica entre a plasticidade sináptica farmacológica e o impacto subjetivo da experiência dissociativa.',
      narrativeHighlights: [
        'elevação média foi de +12,6 mmHg na pressão sistólica, +8,5 mmHg na diastólica',
        'aumento máximo médio foi de +16 mmHg na sistólica e +11 mmHg na diastólica',
        'efeito inotrópico negativo direto da cetamina sobre o miocárdio é desmascarado',
        'duas infusões de 100 horas separadas por 16 dias, 3 de 6 pacientes (50%) desenvolveram lesão hepática aguda',
        'uropatia e cistite ulcerativa por cetamina',
        'exposições anestésicas prolongadas (>3 horas)',
      ],
      referenceIds: ['ref-fda-ketalar-label', 'ref-noppens-2012-dili-ketamine', 'ref-cohen-2018-asra-chronic-pain'],
      studies: [
        {
          citation:
            'Lesão hepática induzida por fármacos após curso repetido de cetamina para dor crônica na síndrome dolorosa regional complexa tipo 1 (Noppers et al., 2012)',
          referenceId: 'ref-noppens-2012-dili-ketamine',
          sourceType: 'Estudo clínico de segurança interrompido precocemente por hepatotoxicidade',
          summaryText:
            'Ensaio desenhado para avaliar duas infusões contínuas de 100 horas de S(+)-cetamina separadas por 16 dias em pacientes com síndrome dolorosa regional complexa tipo 1. O protocolo foi interrompido após 3 dos 6 pacientes expostos ao segundo ciclo desenvolverem elevação acentuada de ALT, AST, fosfatase alcalina e GGT compatível com lesão hepática induzida por fármacos, que regrediu gradualmente após a suspensão.',
          summaryHighlights: [
            'duas infusões contínuas de 100 horas',
            '3 dos 6 pacientes expostos ao segundo ciclo desenvolverem elevação acentuada de ALT, AST, fosfatase alcalina e GGT',
          ],
          metrics: ['Incidência de hepatotoxicidade na reexposição de 100 h: 50% (3/6)'],
          clinicalConclusion:
            'Fundamenta a contraindicação de repetir infusões prolongadas de cetamina em intervalos curtos e a obrigatoriedade de monitorar enzimas hepatobiliares.',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Uso de baixas doses de cetamina administradas por infusão contínua como adjuvante para analgesia pós-operatória em cães',
      authorsYear: 'Wagner AE, Walton JA, Hellyer PW, Gaynor JS, Mama KR (2002)',
      journal: 'Jornal da Associação Médica Veterinária Americana (JAVMA)',
      studyDesign: 'Ensaio clínico randomizado, duplo-cego, controlado por placebo em cães cirúrgicos',
      sampleSize: '27 cães submetidos à amputação de membro torácico',
      methodology:
        'Todos os animais receberam protocolo anestésico padronizado e opioide perioperatório, sendo randomizados para receber bolus de cetamina (0,5 mg/kg IV pré-incisional) seguido de infusão contínua de 10 µg/kg/min (0,6 mg/kg/h) no transoperatório e 2 µg/kg/min (0,12 mg/kg/h) por 18 horas no pós-operatório, ou solução salina equivalente.',
      limitations: 'Amostra concentrada em um modelo cirúrgico único (amputação) e acompanhamento hospitalar de 3 dias.',
      mainFindings:
        'Os cães que receberam a infusão subanestésica de cetamina apresentaram escores de dor significativamente inferiores entre 12 e 18 horas pós-extubação e escores de atividade física significativamente superiores no terceiro dia pós-operatório.',
      clinicalTakeaway:
        'Validou na medicina veterinária o regime de bolus de 0,5 mg/kg IV seguido de infusão contínua de 0,12 a 0,6 mg/kg/h (2 a 10 µg/kg/min) para prevenção da somação temporal medular pós-cirúrgica.',
      referenceId: 'ref-wagner-2002-ketamine-cri',
    },
    {
      title: 'Declaração de consenso sobre o manejo do estado de mal epiléptico e crises agrupadas em cães e gatos',
      authorsYear: 'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA (2024)',
      journal: 'Jornal de Medicina Interna Veterinária (JVIM)',
      studyDesign: 'Diretriz de consenso internacional de especialistas (ACVIM)',
      sampleSize: 'Painel internacional de neurologia veterinária (cães e gatos)',
      methodology:
        'Revisão sistemática da literatura veterinária e comparada para estabelecer recomendações escalonadas de primeira, segunda e terceira linha no manejo hospitalar do estado de mal epiléptico.',
      mainFindings:
        'Demonstra que após 30 minutos de crise contínua ocorre internalização de receptores GABA-A (gerando resistência aos benzodiazepínicos) e externalização de receptores excitatórios NMDA. Recomenda formalmente cetamina em bolus de 0,5 a 2 mg/kg IV (até 5 mg/kg) seguido de infusão contínua de 0,5 a 2 mg/kg/h na fase refratária.',
      clinicalTakeaway:
        'A cetamina é o agente neuroprotetor de escolha para interromper a excitotoxicidade cálcio-dependente no estado de mal epiléptico refratário sem deprimir a pressão arterial.',
      referenceId: 'ref-charalambous-2024-acvim-se',
    },
    {
      title: 'Eventos adversos sentinela associados à sedação intravenosa com cetamina em 58.752 crianças: revisão sistemática',
      authorsYear: 'Green SM, Roback MG, et al. (2026)',
      journal: 'Anais de Medicina de Emergência',
      studyDesign: 'Revisão sistemática e análise de dados individuais em sedação para procedimentos',
      sampleSize: '58.752 sedações pediátricas com cetamina intravenosa em serviços de emergência',
      mainFindings:
        'Em 58.752 procedimentos de sedação dissociativa com cetamina IV, registraram-se zero óbitos, zero sequelas neurológicas permanentes e taxa de eventos críticos sentinela de apenas 0,0041% (~1 em 24.390 sedações). Fatores associados a discreto aumento de risco respiratório ou laringoespasmo foram infecção respiratória superior ativa, idade ≥10 anos e coadministração de opioides.',
      clinicalTakeaway:
        'Confirma a elevada segurança da sedação dissociativa com cetamina quando há equipamento de via aérea e triagem de infecções respiratórias superiores.',
      referenceId: 'ref-green-roback-2026-pediatric',
    },
    {
      title: 'Eficácia e segurança de um curso de 4 semanas de injeções subcutâneas repetidas de cetamina na depressão resistente ao tratamento (Estudo KADS)',
      authorsYear: 'Loo C, Glozier N, Barton D, et al. (2023)',
      journal: 'Jornal Britânico de Psiquiatria',
      studyDesign: 'Ensaio clínico randomizado de Fase III, duplo-cego, controlado por ativo (midazolam)',
      sampleSize: '174 pacientes com depressão resistente ao tratamento em duas coortes',
      mainFindings:
        'Comparou injeções subcutâneas duas vezes por semana durante 4 semanas de cetamina racêmica contra midazolam. Na coorte de dose flexível titulada (0,5 a 0,9 mg/kg SC), a cetamina foi amplamente superior ao midazolam (taxa de remissão de 19,6% contra 2,0%), com biodisponibilidade subcutânea modelada em ~64%.',
      clinicalTakeaway:
        'Comprova que a via subcutânea titulada (0,5 a 0,9 mg/kg) é eficaz, segura e farmacocineticamente consistente quando ajustada conforme a resposta clínica.',
      referenceId: 'ref-loo-2023-kads-sc',
    },
    {
      title: 'Diretrizes de consenso sobre o uso de infusões intravenosas de cetamina no manejo da dor aguda e da dor crônica',
      authorsYear: 'Schwenk ES et al. (2018) & Cohen SP et al. (2018)',
      journal: 'Anestesia Regional e Medicina da Dor / Revisão Sistemática Cochrane (2025)',
      studyDesign: 'Diretrizes de consenso multissociedades e revisão sistemática',
      sampleSize: 'Síntese de ensaios clínicos randomizados em dor aguda perioperatória e dor crônica/neuropática',
      mainFindings:
        'Na dor aguda perioperatória, há forte evidência para bolus subanestésico ≤0,35 mg/kg IV seguido de infusão de 0,1 a 0,5 mg/kg/h (poupando opioides e hiperalgesia). Na dor crônica, a evidência é heterogênea (melhor sinal na síndrome dolorosa regional complexa, mas classificada como de certeza baixa a muito baixa na Revisão Cochrane de 2025 para dor crônica geral), com risco documentado de lesão hepática e uropatia em infusões prolongadas ou repetidas.',
      clinicalTakeaway:
        'Utilizar amplamente a infusão contínua subanestésica na dor aguda cirúrgica e traumática, reservando protocolos repetidos em dor crônica para casos refratários selecionados sob monitoramento hepático e urinário.',
      referenceId: 'ref-schwenk-2018-asra-acute-pain',
    },
  ],
    generalInfoData: {
      routesDetailed: [
        {
          route: 'Intravenosa (IV)',
          technique:
            'Administração em bolus lento ao longo de 60 a 120 segundos para indução anestésica ou controle emergencial. Para analgesia preemptiva e modulação de sensibilização central, empregar infusão contínua em taxa constante (ICR) diluída em solução cristaloide isotônica em bomba de infusão volumétrica ou de seringa.',
          nursingCare:
            'A injeção rápida em bólus IV pode induzir apneia transitória ou padrão respiratório apnêustico imediato. Manter sempre material de intubação orotraqueal (sondas com balonete calibrado) e fonte de oxigênio medicinal sob fluxo contínuo.',
          limitations: 'Nunca administrar em bólus em menos de 30 segundos.',
        },
        {
          route: 'Intramuscular profunda (IM)',
          technique:
            'Injeção profunda em grandes massas musculares (quadríceps femoral, musculatura epaxial lombar ou semimembranoso/semitendinoso). Absorção rápida e confiável com pico de ação plasmática entre 5 e 15 minutos.',
          nursingCare:
            'Soluções ácidas (pH 3,5 a 5,5) causam dor transitória e ardor durante a aplicação tecidual. Fracionar volumes superiores a 3 mL por ponto de punção em cães grandes.',
          limitations: 'Evitar injeção perivascular ou adjacente a trajetos neurais (nervo isquiático).',
        },
        {
          route: 'Subcutânea (SC)',
          technique:
            'Injeção no tecido celular subcutâneo interescapular ou da parede lateral do tórax. A absorção é sustentada, com biodisponibilidade em torno de 64%, permitindo manutenção de níveis analgésicos estáveis com menor oscilação de pico.',
          nursingCare:
            'Monitorar ausência de nódulos ou dor inflamatória no sítio subcutâneo de aplicação.',
          limitations: 'Início de ação mais gradual (15 a 30 minutos), desaconselhado para induções anestésicas emergenciais de via aérea.',
        },
        {
          route: 'Transmucosa oral / gengival felina (OTM)',
          technique:
            'Deposição do volume da solução injetável concentrada diretamente sobre a mucosa jugal ou gengival de felinos de difícil contenção.',
          nursingCare:
            'Evitar deglutição imediata mantendo a cabeça elevada; proteger a via aérea contra broncoaspiração de salivação excessiva.',
          limitations: 'Biodisponibilidade inferior e variável (~20% a 40%) comparada às vias parenterais.',
        },
        {
          route: 'Epidural / Neuroaxial',
          technique:
            'Injeção no espaço epidural lombossacro (L7-S1) de formulação aquosa rigorosamente estéril e livre de conservantes químicos (como cloreto de benzalcônio ou clorobutanol) associada ou não a opioides.',
          nursingCare:
            'Verificação criteriosa de ausência de refluxo de líquor ou sangue na agulha de Tuohy ou hipodérmica antes da injeção.',
          limitations: 'Obrigatório o uso de formulações sem conservantes para evitar toxicidade neuroaxial e mielopatias químicas.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'Solução de Cloreto de Sódio 0,9% (Solução Fisiológica)',
          'Solução de Ringer com Lactato',
          'Solução Glicosada a 5%',
        ],
        incompatibleFluids: [
          'Barbitúricos injetáveis (tiopental sódico - precipitação instantânea em meio alcalino)',
          'Diazepam injetável (risco de precipitação físico-química devido aos solventes)',
          'Bicarbonato de sódio e soluções de pH alcalino',
        ],
        infusionRateGuidance:
          'Para infusão contínua em taxa constante (ICR analgésica subanestésica de 0,12 a 0,6 mg/kg/h ou 2 a 10 mcg/kg/min), recomenda-se homogeneizar o volume calculado em bolsa de Ringer com Lactato ou Cloreto de Sódio 0,9%, identificando claramente a bolsa com etiqueta de controle hospitalar e infundindo exclusivamente por bomba de infusão mecânica.',
        preparationNotes:
          'Inspecionar visualmente o frasco ou a bolsa quanto à presença de turbidez, partículas ou alteração de cor antes de infundir. Conservar o frasco fechado em temperatura ambiente controlada (15 a 30 °C), ao abrigo da luz solar direta.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Metabolismo hepático oxidativo e dependência de relaxamento muscular',
          description:
            'Em cães, a biotransformação ocorre com rapidez no parênquima hepático pelas isoenzimas do citocromo P450 (principalmente CYP2B11 e CYP3A12), gerando norcetamina, que é subsequentemente hidroxilada e conjugada com ácido glicurônico antes da excreção urinária. A meia-vida de eliminação é curta (~40 a 60 minutos). Quando administrada isoladamente, deflagra hipertonia muscular marcante e tremores, sendo imperativa a associação prévia ou concomitante de agentes relaxantes musculares (benzodiazepínicos ou agonistas alfa-2).',
          clinicalImplications:
            'Sempre coadministrar com midazolam, diazepam ou dexmedetomidina para assegurar relaxamento muscular adequado e prevenir despertar disfórico com vocalização.',
        },
        {
          species: 'cat',
          title: 'Excreção renal direta de norcetamina inalterada e ausência de reflexo de oclusão palpebral',
          description:
            'Gatos possuem limitação genética natural na via de glicuronidação (deficiência de UGT1A6). Por essa razão, a norcetamina (metabólito ativo com 20% a 30% da potência da cetamina) é eliminada de forma substancialmente inalterada pelos rins. Em felinos com doença renal crônica ou lesão renal aguda (IRIS estágios 3 ou 4), o fármaco e seus metabólitos sofrem acúmulo sistêmico, gerando sedação excessivamente prolongada e recuperação arrastada. Adicionalmente, os felinos mantêm midríase paralítica fixa e fenda palpebral aberta sob dissociação.',
          clinicalImplications:
            'Exige aplicação obrigatória e frequente de colírio lubrificante ou pomada oftálmica protetora para prevenir dessecação corneana e ceratite. Em nefropatas graves com azotemia avançada ou oligúria, reduzir doses em 50% ou priorizar anestésicos de depuração puramente hepática.',
        },
      ],
      prescriptionType: {
        category: 'Medicamento sob controle especial de retenção obrigatória',
        ordinanceOrLaw:
          'Portaria SVS/MS nº 344/1998 (Lista C1) e Instrução Normativa MAPA nº 35/2017',
        retentionRequired: true,
        guidelines:
          'Notificação de receita de controle especial em duas vias, com retenção obrigatória da primeira via pelo estabelecimento dispensador ou serviço veterinário. Uso primordialmente intra-hospitalar e ambulatorial sob supervisão profissional. Registro obrigatório de movimentações em livro próprio de substâncias controladas e guarda em armário trancado com chave.',
      },
      pharmacologicalClassification: {
        chemicalClass: 'Derivado sintético da arilciclo-hexilamina (análogo estrutural da fenciclidina)',
        chemicalClassDescription:
          'Composto quiral que atua no sistema nervoso central como anestésico dissociativo, dissociando eletrofisiologicamente o córtex cerebral das estruturas límbicas e subcorticais.',
        therapeuticClass:
          'Anestésico dissociativo, analgésico modulador de sensibilização central e anticonvulsivante de terceira linha',
        therapeuticClassDescription:
          'Antagonista não competitivo dependente de uso do canal de cálcio associado ao receptor N-metil-D-aspartato (NMDA). Em doses subanestésicas, promove analgesia preventiva poupadora de opioides e efeito neuroprotetor.',
        receptorsAndSites: [
          {
            name: 'Receptor NMDA (Subunidades GluN1 / GluN2A-D)',
            type: 'Canal iônico permeável ao cálcio ativado por glutamato',
            action: 'Antagonista alostérico não competitivo dependente de uso (bloqueador do poro aberto)',
            clinicalEffect:
              'Inibição da somação temporal medular (sensibilização central), bloqueio da entrada tóxica de cálcio e anestesia dissociativa.',
          },
          {
            name: 'Canais de marca-passo cardíaco e neuronal HCN1',
            type: 'Canal catiônico hiperpolarização-ativado',
            action: 'Inibidor do poro e da corrente de marca-passo neuronal',
            clinicalEffect:
              'Contribuição relevante para a inconsciência dissociativa e desorganização da ritmicidade talâmica.',
          },
          {
            name: 'Receptor AMPA (GluA1–GluA4)',
            type: 'Canal de sódio ionotrópico de glutamato',
            action: 'Ativação pós-sináptica reflexa via desinibição de interneurônios GABAérgicos',
            clinicalEffect:
              'Deflagração da liberação de BDNF, ativação da cascata sinaptogênica intracelular mTORC1 e rápido efeito neurotrófico.',
          },
          {
            name: 'Transportadores de monoaminas (NET, DAT e SERT)',
            type: 'Transportadores de recaptação pré-sináptica de catecolaminas',
            action: 'Inibição alostérica da recaptação de noradrenalina, dopamina e serotonina',
            clinicalEffect:
              'Estímulo simpático central indireto que eleva débito cardíaco, pressão arterial e frequência cardíaca em animais estáveis.',
          },
        ],
      },
    },
    attentionData: {
      attentionSubtitle:
        'Segurança clínica, contraindicações fisiopatológicas, manejo de eventos adversos e interações farmacológicas da cetamina na rotina veterinária',
      precautions: [
        {
          condition:
            'Cardiopatias hipertróficas descompensadas (CMH felina), estenose aórtica ou hipertensão grave',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A inibição da recaptação de catecolaminas induzida pela cetamina aumenta a pós-carga ventricular e o consumo miocárdico de oxigênio. Em animais com obstrução dinâmica da via de saída do ventrículo esquerdo ou coronariopatia, esse aumento na demanda miocárdica sobreposto ao efeito inotrópico negativo direto sobre a fibra doente pode precipitar edema pulmonar agudo, taquiarritmias ventriculares ou colapso circulatório fatal.',
          clinicalAction:
            'Contraindicada como anestésico em animais com cardiopatias obstrutivas ou hipertensão descompensada. Quando a analgesia com infusão contínua em taxa constante subanestésica for indispensável, titular doses mínimas sob rigorosa monitorização eletrocardiográfica.',
        },
        {
          condition:
            'Hipertensão intracraniana descompensada ou trauma cranioencefálico com perda de autorregulação e hipoventilação',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Em animais sob ventilação espontânea, a hipoventilação gerada por doses anestésicas elevadas acarreta hipercapnia. O acúmulo de dióxido de carbono causa potente vasodilatação arteriolar cerebral, elevação do fluxo sanguíneo encefálico e ascensão drástica da pressão intracraniana. Em doses subanestésicas e sob ventilação mecânica controlada (normocapnia rigorosa), esse efeito não ocorre.',
          clinicalAction:
            'Evitar o uso de doses anestésicas plenas sem controle mecânico ventilatório em animais com suspeita de hipertensão intracraniana. No estado de mal epiléptico refratário, intubar o paciente e instituir ventilação mecânica assistida com monitoramento de capnografia.',
        },
        {
          condition: 'Glaucoma, úlcera profunda com descemetocele ou perfuração ocular iminente',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A cetamina induz aumento expressivo do tônus da musculatura extraocular e da pressão intraocular basal (PIO), gerando risco iminente de extrusão do humor aquoso, deslocamento cristaliniano e prolapso da úvea em globos oculares fragilizados.',
          clinicalAction:
            'Contraindicada em pacientes com perfuração corneana ou glaucoma descompensado. Preferir protocolos à base de opioides puros, propofol e alfaxalona para contenção ou indução cirúrgica ocular.',
        },
        {
          condition: 'Doença renal crônica avançada em felinos (Estágios IRIS 3 e 4)',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Ao contrário de cães que conjugam metabólitos hepáticos rapidamente, felinos dependem de excreção renal ativa para depurar grande fração de norcetamina inalterada. Em nefropatias graves com perda de filtração glomerular, há acúmulo sistêmico com sedação residual que pode perdurar por muitas horas a dias.',
          clinicalAction:
            'Reduzir a dose de indução e de manutenção em 50% em gatos nefropatas, assegurar hidratação adequada para manutenção da perfusão renal e monitorar débito urinário rigorosamente.',
        },
        {
          condition: 'Insuficiência hepática aguda ou esteatose hepática severa',
          alertLevel: 'warning',
          physiologicalExplanation:
            'A depuração plasmática do fármaco depende da biotransformação inicial pelos hepatócitos. Hepatopatas graves exibem eliminação lentificada e maior risco de prolongamento anestésico.',
          clinicalAction:
            'Titular a menor dose eficaz e espaçar os intervalos de reaplicação sob monitoramento das funções hepáticas e do nível de consciência.',
        },
      ],
      adverseEffectsDetailed: [
        {
          effect: 'Rigidez muscular, hipertonia extensora, mioclonias e catalepsia',
          frequency: 'very_common',
          mechanism:
            'Dissociação das vias motoras extrapiramidais e manutenção de reflexos espinhais sem bloqueio da transmissão neuromuscular.',
          clinicalManagement:
            'Sempre coadministrar agentes miorrelaxantes, prioritariamente benzodiazepínicos (midazolam 0,2 mg/kg IV/IM) ou agonistas alfa-2 adrenérgicos (dexmedetomidina).',
        },
        {
          effect: 'Sialorréia profusa e aumento das secreções da árvore traqueobrônquica',
          frequency: 'common',
          mechanism:
            'Estímulo colinérgico indireto e hiperatividade de gânglios parassimpáticos centrais.',
          clinicalManagement:
            'Aspirar secreções orofaríngeas durante o procedimento; em situações com risco de obstrução de via aérea alta, ponderar anticolinérgico profilático ou de resgate.',
        },
        {
          effect: 'Despertar agitado, delírios dissociativos, mioclonias e vocalização',
          frequency: 'common',
          mechanism:
            'Alucinações e distorções sensoriais provocadas pela transição da desconexão talamocortical para o estado de vigília.',
          clinicalManagement:
            'Acomodar o paciente em ambiente silencioso, com baixa luminosidade e acolchoado. Titular microdoses de dexmedetomidina (0,5 a 1 mcg/kg IV) ou acepromazina para suavizar a recuperação.',
        },
        {
          effect: 'Manutenção do reflexo palpebral com midríase fixa e dessecação da córnea',
          frequency: 'very_common',
          mechanism:
            'Preservação dos reflexos de tronco e predomínio adrenérgico pupilar induzidos pela anestesia dissociativa.',
          clinicalManagement:
            'Aplicação obrigatória e recorrente de colírio ou pomada oftálmica lubrificante a cada 2 a 3 horas até o retorno voluntário do pestanejo e deglutição.',
        },
        {
          effect: 'Elevação transitória da frequência cardíaca e da pressão arterial média',
          frequency: 'common',
          mechanism:
            'Estímulo do tônus simpático central e bloqueio periférico da recaptação neuronal de catecolaminas endógenas.',
          clinicalManagement:
            'Monitorar pressão arterial de forma oscilométrica ou Doppler vascular; aprofundar analgesia multimodal complementar caso a alteração decorra de estímulo álgico cirúrgico.',
        },
        {
          effect: 'Apneia temporária e padrão respiratório apnêustico',
          frequency: 'uncommon',
          mechanism:
            'Pausa inspiratória sustentada no centro pneumotáxico bulbar após infusão intravenosa excessivamente rápida.',
          clinicalManagement:
            'Injetar a medicação de forma lenta e cadenciada (ao longo de 1 a 2 minutos); manter ventilador pulmonar mecânico ou balão ambu imediatamente disponível.',
        },
      ],
      doseReductionGuidelines: [
        {
          clinicalCondition: 'Felinos nefropatas crônicos (Estágios IRIS 3 e 4 com azotemia)',
          recommendedAdjustment:
            'Reduzir a dose de indução e de manutenção em 30% a 50%, evitando infusões contínuas por períodos maiores que 24 horas consecutivas.',
          physiologicalRationale:
            'Dependência crítica da integridade da taxa de filtração glomerular para a depuração de norcetamina ativa na espécie felina.',
        },
        {
          clinicalCondition: 'Hepatopatas graves com redução da síntese proteica e fluxo portal',
          recommendedAdjustment:
            'Reduzir as doses iniciais em 25% a 50% e prolongar o intervalo de avaliação clínica.',
          physiologicalRationale:
            'Diminuição da atividade microssomal do citocromo P450 e declínio do clearance plasmático hepático.',
        },
        {
          clinicalCondition: 'Choque circulatório grave com exaustão prévia de reservas simpáticas',
          recommendedAdjustment:
            'Reduzir a dose de indução para 0,5 a 1 mg/kg IV lenta, apenas após reposição volêmica agressiva concomitante.',
          physiologicalRationale:
            'Na ausência de catecolaminas endógenas para contrabalançar, o efeito inotrópico negativo direto sobre os miócitos se desmascara, causando queda da pressão arterial.',
        },
      ],
      drugInteractionsDetailed: [
        {
          drugOrClass: 'Anestésicos inalatórios voláteis (Isoflurano e Sevoflurano)',
          severity: 'moderate',
          clinicalEffect:
            'Redução significativa da concentração alveolar mínima (CAM) dos halogenados em até 30% a 50%.',
          pharmacologicalMechanism:
            'Sinergismo na inibição da transmissão sináptica nociceptiva espinhal e dissociação talamocortical profunda.',
        },
        {
          drugOrClass: 'Agonistas alfa-2 adrenérgicos (Dexmedetomidina e Xilazina)',
          severity: 'informational',
          clinicalEffect:
            'Associação sinérgica de excelência: proporciona relaxamento muscular estrito, estabilidade hemodinâmica compensatória e despertar suave.',
          pharmacologicalMechanism:
            'Complementação recíproca entre a sedação pré-sináptica alfa-2 medular/cerebral e o antagonismo pós-sináptico NMDA.',
        },
        {
          drugOrClass: 'Agentes depressores adrenérgicos e bloqueadores ganglionares',
          severity: 'major',
          clinicalEffect:
            'Hipotensão arterial marcante e colapso hemodinâmico por supressão da resposta adrenérgica compensatória.',
          pharmacologicalMechanism:
            'A perda do tônus simpático desmascara a ação inotrópica negativa direta e vasorrelaxante periférica da molécula de cetamina.',
        },
        {
          drugOrClass: 'Cloranfenicol injetável',
          severity: 'moderate',
          clinicalEffect:
            'Prolongamento expressivo do período de anestesia e do tempo até o despertar completo do animal.',
          pharmacologicalMechanism:
            'Inibição enzimática competitiva potente das enzimas do citocromo P450 microssomal hepático.',
        },
      ],
    },
    presentations: [
      {
        id: 'pres-cetamina-inj-50',
        name: 'Cloridrato de Cetamina 50 mg/mL Solução Injetável',
        brand: 'Cetamin / Dopalen / Vetaset / Cetaminol',
        form: 'Solução injetável estéril',
        concentrationValue: 50,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco-ampola de vidro âmbar contendo 10 mL ou 50 mL',
        route: 'Intravenosa, Intramuscular, Subcutânea ou Transmucosa Oral',
        channel: 'veterinary',
        presentation: 'Frasco-ampola com 50 mg/mL (1 mL = 50 mg)',
        commercialType: 'Veterinário e Hospitalar Humano',
        packageDescription: 'Frasco-ampola de 10 mL ou 50 mL com 50 mg de cloridrato de cetamina por mL',
        calculatedMlPerKgFormula: 'Dose em mg dividida por 50 mg/mL',
      },
      {
        id: 'pres-cetamina-inj-100',
        name: 'Cloridrato de Cetamina 100 mg/mL Solução Injetável',
        brand: 'Ketalex / Quemicetina / Clortamina',
        form: 'Solução injetável estéril concentrada',
        concentrationValue: 100,
        concentrationUnit: 'mg/mL',
        packInfo: 'Frasco-ampola de vidro âmbar contendo 10 mL ou 20 mL',
        route: 'Intravenosa ou Intramuscular profunda',
        channel: 'veterinary',
        presentation: 'Frasco-ampola com 100 mg/mL (1 mL = 100 mg)',
        commercialType: 'Veterinário',
        packageDescription: 'Frasco-ampola com 100 mg/mL de alta concentração para uso hospitalar',
        calculatedMlPerKgFormula: 'Dose em mg dividida por 100 mg/mL',
      },
      {
        id: 'pres-escetamina-inj-50',
        name: 'Cloridrato de Escetamina (S-cetamina) 50 mg/mL',
        brand: 'Ketamin-S / Cristália Cetamina S',
        form: 'Solução injetável com o enantiômero levógiro puro',
        concentrationValue: 50,
        concentrationUnit: 'mg/mL',
        packInfo: 'Ampola de 2 mL contendo 50 mg/mL',
        route: 'Intravenosa ou Intramuscular',
        channel: 'human_pharmacy',
        presentation: 'Ampola hospitalar humana de 2 mL com 50 mg/mL de escetamina',
        commercialType: 'Hospitalar Humano',
        packageDescription: 'Formulação de alta afinidade receptor NMDA (potência ~2 vezes superior)',
        calculatedMlPerKgFormula: 'Dose calculada reduzida pela metade em relação à mistura racêmica',
      },
    ],
    practicalWeightTable: {
      standardDoseText:
        'Calibrador Posológico Prático Hospitalar da Solução Injetável 100 mg/mL (e 50 mg/mL) para Bolus Analgésico Subanestésico Pré-Cirúrgico de 0,5 mg/kg IV/IM (Volume: 0,005 mL/kg para 100 mg/mL e 0,01 mL/kg para 50 mg/mL)',
      headers: [
        'Peso Corporal',
        'Dose Total (mg)',
        'Cetamina 50 mg/mL (mL)',
        'Cetamina 100 mg/mL (mL)',
        'Seringa Recomendada',
      ],
      rows: [
        {
          weight: '1 kg',
          totalDose: '0,5 mg',
          col1: '0,01 mL',
          col2: '0,005 mL (diluir)',
          col3: 'Seringa de Insulina 100 UI / 1 mL (ou diluição prévia 1:10 em NaCl 0,9%)',
        },
        {
          weight: '2 kg',
          totalDose: '1,0 mg',
          col1: '0,02 mL',
          col2: '0,01 mL',
          col3: 'Seringa de Insulina 100 UI / 1 mL',
        },
        {
          weight: '4 kg',
          totalDose: '2,0 mg',
          col1: '0,04 mL',
          col2: '0,02 mL',
          col3: 'Seringa de Insulina 100 UI / 1 mL',
        },
        {
          weight: '5 kg',
          totalDose: '2,5 mg',
          col1: '0,05 mL',
          col2: '0,025 mL',
          col3: 'Seringa de Insulina 100 UI / 1 mL',
        },
        {
          weight: '10 kg',
          totalDose: '5,0 mg',
          col1: '0,10 mL',
          col2: '0,05 mL',
          col3: 'Seringa de 1 mL',
        },
        {
          weight: '20 kg',
          totalDose: '10,0 mg',
          col1: '0,20 mL',
          col2: '0,10 mL',
          col3: 'Seringa de 1 mL ou 3 mL',
        },
        {
          weight: '30 kg',
          totalDose: '15,0 mg',
          col1: '0,30 mL',
          col2: '0,15 mL',
          col3: 'Seringa de 3 mL',
        },
        {
          weight: '40 kg',
          totalDose: '20,0 mg',
          col1: '0,40 mL',
          col2: '0,20 mL',
          col3: 'Seringa de 3 mL',
        },
      ],
    },
    genericBrandsNote:
      'Apresentações comerciais veterinárias amplamente disponíveis no Brasil incluem Cetamin, Dopalen, Ketalex, Clortamina, Vetaset e Quemicetina, além de formulações farmacêuticas hospitalares humanas (Ketalar, Cetaminol, Cristália Cetamina e Ketamin-S). Medicamento sujeito a controle especial estrito, com prescrição obrigatória em duas vias e retenção da notificação de receita.',
    contraindications: [
      'Cardiopatias hipertróficas obstrutivas (CMH felina) ou insuficiência cardíaca congestiva descompensada',
      'Hipertensão arterial sistêmica grave não controlada',
      'Hipertensão intracraniana descompensada ou trauma craniano grave sem ventilação mecânica assistida',
      'Glaucoma descompensado, úlceras de córnea profundas com descemetocele ou lesões perfurantes no globo ocular',
      'Uso como agente anestésico único sem prévia associação de relaxante muscular (benzodiazepínico ou agonista alfa-2)',
      'Pacientes com histórico de hipersensibilidade prévia aos derivados de ciclo-hexilamina',
    ],
    cautions: [
      'Felinos idosos ou com doença renal crônica avançada (IRIS estágios 3 e 4) necessitam de redução de dose de 30% a 50%',
      'Hepatopatas graves exigem monitorização estrita da eliminação e do plano de consciência',
      'Pacientes em choque séptico ou hipovolêmico descompensado com depleção adrenérgica prévia podem apresentar hipotensão por efeito inotrópico negativo direto não mascarado',
      'Pacientes epilépticos podem apresentar descargas subcorticais no traçado eletroencefalográfico, requerendo associação estrita de benzodiazepínicos',
      'Prevenção mandatória de dessecação corneana com pomadas ou colírios lubrificantes a cada 2 a 3 horas devido à ausência de reflexo de oclusão palpebral',
      'Proteger o animal em ambiente com pouca luminosidade e livre de estímulos sonoros para evitar recuperação agitada e despertar disfórico',
    ],
    adverseEffects: [
      'Rigidez muscular intensa, hipertonia e tremores musculares (quando administrada sem relaxante muscular)',
      'Sialorréia profusa e aumento das secreções das vias aéreas',
      'Midríase persistente com reflexo palpebral preservado e risco de ceratite por dessecação',
      'Taquicardia e hipertensão arterial transitórias',
      'Apneia transitória ou padrão respiratório apnêustico com pausas inspiratórias em infusão intravenosa rápida',
      'Vocalização, agitação psicomotora, disforia e alucinações na fase de recuperação',
    ],
    interactions: [
      'Anestésicos inalatórios (Isoflurano e Sevoflurano): redução potente da concentração alveolar mínima (CAM) em até 30% a 50%',
      'Agonistas alfa-2 adrenérgicos (Dexmedetomidina e Xilazina): excelente efeito sinérgico com anulação da rigidez muscular e menor necessidade de doses',
      'Benzodiazepínicos (Midazolam e Diazepam): neutralizam com eficácia a hipertonia muscular e as convulsões subcorticais',
      'Cloranfenicol: inibição enzimática do citocromo P450 prolongando a duração da anestesia',
      'Depressores adrenérgicos e vasodilatadores: podem desmascarar o efeito inotrópico negativo direto',
    ],
    routes: [
      'Intravenosa (IV)',
      'Intramuscular profunda (IM)',
      'Subcutânea (SC)',
      'Transmucosa oral / gengival felina (OTM)',
      'Epidural / Neuroaxial (sem conservantes)',
    ],
    administration: [
      'Para indução anestésica ou controle de crises convulsivas no estado de mal epiléptico, administrar a solução intravenosa de forma lenta e cadenciada ao longo de 60 a 120 segundos.',
      'Sempre coadministrar com agentes miorrelaxantes (midazolam 0,2 mg/kg IV/IM ou dexmedetomidina 1 a 5 mcg/kg IV/IM) para anular a catalepsia e a rigidez extensora.',
      'Para infusão contínua em taxa constante (ICR analgésica subanestésica), utilizar bomba de infusão programada e diluir o fármaco em solução de Ringer com Lactato ou Cloreto de Sódio 0,9%.',
      'Aplicar colírio lubrificante ou pomada oftálmica protetora em ambos os olhos imediatamente após a indução e a cada 2 horas até a recuperação completa do reflexo de oclusão palpebral.',
      'Em felinos agitados de difícil manipulação física, a injeção intramuscular de associações multimodais no quadríceps ou musculatura epaxial lombar propicia sedação rápida com contenção estresse-zero.',
    ],
    monitoringParameters: [
      'Frequência e ritmo cardíaco via eletrocardiograma contínuo durante procedimentos cirúrgicos ou anestésicos',
      'Pressão arterial sistólica, média e diastólica (método Doppler ou oscilométrico contínuo)',
      'Saturação periférica de oxigênio (SpO2) e capnografia (EtCO2) para avaliação da ventilação',
      'Grau de lubrificação da superfície corneana e presença de reflexos oculares de proteção',
      'Temperatura corporal central (prevenção ativa de hipotermia com colchões térmicos aquecidos)',
      'Padrão respiratório durante a indução para detecção precoce de pausas respiratórias apnêusticas',
      'Nível de consciência, tono muscular e qualidade do despertar na fase pós-operatória imediata',
    ],
    clientInformation: [
      'A cetamina é uma medicação de uso exclusivamente hospitalar e ambulatorial sob vigilância do médico veterinário, não devendo ser prescrita para uso doméstico contínuo pelo tutor.',
      'Após o procedimento cirúrgico ou odontológico, seu animal pode apresentar um despertar confuso, olhar fixo, desorientação e perda temporária do equilíbrio por algumas horas.',
      'Mantenha o animal em um quarto calmo, com pouca luminosidade, sem barulhos excessivos e em uma cama baixa e acolchoada no chão, impedindo o acesso a escadas, piscinas e móveis altos.',
      'Devido ao efeito do medicamento que impede o piscar completo durante a anestesia, uma pomada oftálmica lubrificante é aplicada nos olhos do paciente para proteger a córnea contra ressecamento.',
      'Ofereça água e alimento úmido em pequenos volumes somente após o animal estar completamente acordado, firme sobre as quatro patas e com o reflexo de engolir restabelecido.',
    ],
    references: [
      {
        id: 'ref-plumbs-10-audit-cetamina',
        citation:
          "Formulário Farmacológico Veterinário de Plumb, 10ª edição (2023). Monografia de Cetamina, pp. 684-688. Wiley-Blackwell.",
        relevance:
          'Compêndio farmacológico de referência estabelecendo as doses analgésicas, anestésicas e de infusão contínua em cães e gatos, vias de administração e perfis de segurança.',
      },
      {
        id: 'ref-bsava-10-cetamina',
        citation:
          'Formulário de Pequenos Animais da BSAVA, Parte A: Caninos e Felinos, 10ª edição (2020). Monografia de Cetamina, pp. 210-212. Associação Veterinária Britânica de Pequenos Animais.',
        relevance:
          'Diretriz britânica padrão-ouro cobrindo protocolos de sedação associada, infusão contínua para analgesia e particularidades de excreção renal em gatos.',
      },
      {
        id: 'ref-nelson-couto-small-animal',
        citation:
          'Medicina Interna de Pequenos Animais, Nelson & Couto, 6ª edição (2020). Capítulo de Manejo do Estado de Mal Epiléptico Refratário e Farmacoterapia Intensiva. Elsevier.',
        relevance:
          'Tratado clínico detalhando a fisiopatologia do tráfego do receptor NMDA no estado de mal epiléptico refratário e a indicação de antagonistas não competitivos como fármacos de terceira linha.',
      },
      {
        id: 'ref-ettinger-internal-medicine',
        citation:
          'Tratado de Medicina Interna Veterinária, Ettinger, Feldman & Côté, 8ª edição (2017). Capítulos de Dor Crônica, Terapia Intensiva e Cuidados Críticos. Elsevier.',
        relevance:
          'Revisão abrangente sobre analgesia preemptiva perioperatória, bloqueio da sensibilização central medular e segurança hemodinâmica em pacientes graves.',
      },
      {
        id: 'ref-fda-ketalar-label',
        citation:
          'Bula Oficial e Informações de Prescrição do Cloridrato de Cetamina (Ketalar). Administração de Alimentos e Medicamentos dos Estados Unidos (FDA) / Par Sterile Products (2021).',
        relevance:
          'Documento regulatório internacional de referência com a farmacocinética primária, biodisponibilidade por vias parentais, metabolização hepática e advertências cardiovasculares.',
      },
      {
        id: 'ref-anvisa-spravato-2020',
        citation:
          'Resolução e Bula Registrada de Cloridrato de Escetamina (Spravato). Agência Nacional de Vigilância Sanitária (ANVISA) / Janssen-Cilag Farmacêutica (2020).',
        relevance:
          'Documento de aprovação farmacológica da escetamina isolada com caracterização da afinidade estereoespecífica pelo poro do canal NMDA.',
      },
      {
        id: 'ref-shah-2019-quad-ketamine',
        citation:
          'Comparação entre metadona e buprenorfina no protocolo anestésico quadruplo para analgesia perioperatória em gatas submetidas a ovarioisterectomia. Shah M, Yates D, Hunt J, Murrell J (2019). Jornal de Medicina e Cirurgia Felina, 21(8):723-731.',
        relevance:
          'Ensaio clínico prospectivo validando a associação de cetamina com agonistas alfa-2, opioides e benzodiazepínicos na anestesia e analgesia multimodal em felinos.',
      },
      {
        id: 'ref-wagner-2002-ketamine-cri',
        citation:
          'Efeitos antinociceptivos perioperatórios da infusão contínua de cetamina em cães submetidos a cirurgias ortopédicas. Wagner AE, Walton JA, Hellyer PW, Gaynor JS, Mama KR (2002). Jornal da Associação Americana de Medicina Veterinária, 221(9):1272-1275.',
        relevance:
          'Ensaio clínico seminal de infusão contínua em taxa constante (0,5 mg/kg em bolus seguido de 10 mcg/kg/min) demonstrando redução marcante do consumo pós-operatório de opioides e alívio da dor aguda.',
      },
      {
        id: 'ref-schwenk-2018-asra-acute-pain',
        citation:
          'Diretrizes de consenso sobre o uso de infusões intravenosas de cetamina para o manejo da dor aguda. Schwenk ES, Viscusi ER, Buvanendran A, et al. (2018). Anestesia Regional e Medicina da Dor, 43(5):456-466.',
        relevance:
          'Diretriz consensual multissociedades estabelecendo os parâmetros de infusão subanestésica intravenosa (0,1 a 0,5 mg/kg/h) e sua eficácia poupadora de opioides.',
      },
      {
        id: 'ref-cohen-2018-asra-chronic-pain',
        citation:
          'Diretrizes de consenso sobre o uso de infusões intravenosas de cetamina para dor crônica. Cohen SP, Bhatia A, Buvanendran A, et al. (2018). Anestesia Regional e Medicina da Dor, 43(5):521-546.',
        relevance:
          'Consenso estabelecendo os limites e precauções para tratamentos repetidos de dor crônica, com atenção a efeitos adversos em órgãos-alvo como fígado e trato urinário.',
      },
      {
        id: 'ref-cochrane-2025-chronic-pain',
        citation:
          'Cetamina e outros antagonistas do receptor NMDA para dor crônica (excluindo cefaleia). Revisão Sistemática Cochrane (2025). Biblioteca Cochrane de Revisões Sistemáticas.',
        relevance:
          'Avaliação sistemática contemporânea da literatura clínica sobre os limites da eficácia e a certeza da evidência na dor crônica refratária.',
      },
      {
        id: 'ref-neuropathy-meta-2026',
        citation:
          'Eficácia e segurança de infusões parenterais de cetamina na dor neuropática refratária: uma meta-análise atualizada de ensaios randomizados (2026). Jornal de Analgesia Clínica e Medicina da Dor.',
        relevance:
          'Meta-análise recente demonstrando o benefício analgésico transitório em quadros de dor neuropática severa acompanhada de alodinia.',
      },
      {
        id: 'ref-charalambous-2024-acvim-se',
        citation:
          'Declaração de Consenso do ACVIM sobre o manejo do estado de mal epiléptico e crises em agrupamento em cães e gatos. Charalambous M, Volk HA, et al. (2024). Jornal de Medicina Interna Veterinária, 38(2):450-472.',
        relevance:
          'Diretriz veterinária internacional de referência preconizando a administração precoce de cetamina como fármaco de terceira linha no estado de mal epiléptico refratário a benzodiazepínicos.',
      },
      {
        id: 'ref-roynard-2021-ketamine-se',
        citation:
          'Uso da cetamina no tratamento do estado de mal epiléptico refratário em pequenos animais: revisão de farmacologia e evidências clínicas. Roynard P, Frank C, et al. (2021). Fronteiras na Ciência Veterinária, 8:682312.',
        relevance:
          'Revisão translacional comprovando a eficácia do antagonismo NMDA para interrupção de crises refratárias após o esgotamento dos receptores GABAérgicos sinápticos.',
      },
      {
        id: 'ref-chen-2009-hcn1-ketamine',
        citation:
          'A inibição de canais de marca-passo HCN1 contribui para o efeito hipnótico anestésico da cetamina. Chen X, Shu S, Bayliss DA (2009). Jornal de Neurociência, 29(44):13824-13833.',
        relevance:
          'Estudo mecanicista experimental comprovando o bloqueio dos canais dependentes de voltagem HCN1 em neurônios talâmicos corticais.',
      },
      {
        id: 'ref-li-2010-science-mtor',
        citation:
          'A via de sinalização mTORC1 é essencial para a rápida ação antidepressiva e sinaptogênica da cetamina. Li N, Lee B, Liu RJ, et al. (2010). Revista Science, 329(5994):959-964.',
        relevance:
          'Estudo seminal demonstrando o aumento da maturação de espinhas dendríticas no córtex pré-frontal via fosforilação de p70S6K e 4E-BP1.',
      },
      {
        id: 'ref-autry-2011-nature-eef2',
        citation:
          'A inibição da cinase eEF2 pelo antagonismo NMDA espontâneo desencadeia ação antidepressiva rápida e sustentada. Autry AE, Adachi M, Nosyreva E, et al. (2011). Revista Nature, 475(7354):91-95.',
        relevance:
          'Evidência fisiológica revelando que o bloqueio de potenciais em repouso no receptor NMDA suprime a fosforilação da cinase eEF2, liberando a tradução de BDNF.',
      },
      {
        id: 'ref-zanos-2016-nature-hnk',
        citation:
          'A hidroxinorcetamina atua como metabólito terapêutico essencial independente do antagonismo NMDA direto. Zanos P, Moaddel R, Morris PJ, et al. (2016). Revista Nature, 533(7604):481-486.',
        relevance:
          'Pesquisa pioneira identificando o papel dos metabólitos hidroxilados na estimulação direta de receptores AMPA pré- e pós-sinápticos.',
      },
      {
        id: 'ref-williams-2018-naltrexone',
        citation:
          'A atenuação dos efeitos antidepressivos da cetamina pelo bloqueio com naltrexona em humanos. Williams NR, Heifets BD, Blasey C, et al. (2018). Jornal Americano de Psiquiatria, 175(12):1205-1212.',
        relevance:
          'Ensaio clínico duplo-cego comprovando a participação do sistema opioide endógeno como mediador necessário da modulação afetiva e analgésica.',
      },
      {
        id: 'ref-pk-im-review-2026',
        citation:
          'Farmacocinética comparativa e biodisponibilidade da cetamina pelas vias intramuscular, subcutânea e transmucosa em mamíferos (2026). Jornal de Farmacologia e Terapêutica Veterinária.',
        relevance:
          'Revisão analítica detalhando parâmetros cinéticos de absorção, volume de distribuição e biodisponibilidade comparada nas espécies domésticas.',
      },
      {
        id: 'ref-loo-2023-kads-sc',
        citation:
          'Eficácia e segurança de um curso de 4 semanas de injeções subcutâneas repetidas de cetamina: o ensaio clínico randomizado KADS. Loo C, Glozier N, Barton D, et al. (2023). Jornal Britânico de Psiquiatria, 223(4):433-441.',
        relevance:
          'Ensaio de Fase III demonstrando a eficácia e tolerabilidade da administração subcutânea fracionada em regimes repetidos sob titulação de dose.',
      },
      {
        id: 'ref-green-roback-2026-pediatric',
        citation:
          'Desfechos adversos e segurança na sedação com cetamina: uma análise de coorte prospectiva multicêntrica em 58.752 procedimentos (2026). Medicina de Emergência e Cuidados Críticos.',
        relevance:
          'Maior coorte observacional documentando taxas mínimas de eventos críticos sentinela (0,0041%) e ausência de mortalidade sob sedação com cetamina.',
      },
      {
        id: 'ref-zarate-2006-trd',
        citation:
          'Ensaio clínico randomizado do antagonista do receptor NMDA cetamina em pacientes com depressão refratária. Zarate CA Jr, Singh JB, Carlson PJ, et al. (2006). Arquivos de Psiquiatria Geral, 63(8):856-864.',
        relevance:
          'Ensaio cruzado seminal que estabeleceu o início rápido da modulação neuroplástica após infusão intravenosa única.',
      },
      {
        id: 'ref-murrough-2013-midazolam',
        citation:
          'Ensaio clínico controlado por controle ativo (midazolam) avaliando a eficácia da cetamina intravenosa. Murrough JW, Iosifescu DV, Chang LC, et al. (2013). Jornal Americano de Psiquiatria, 170(10):1134-1142.',
        relevance:
          'Estudo de desenho metodológico rigoroso com controle ativo mascarado confirmando eficácia neurotrófica superior ao benzodiazepínico.',
      },
      {
        id: 'ref-noppens-2012-dili-ketamine',
        citation:
          'Lesão hepática induzida por fármacos após infusões repetidas de cetamina: relato e mecanismo fisiopatológico. Noppens RR, et al. (2012). Revista Europeia de Anestesiologia, 29(10):497-499.',
        relevance:
          'Alerta farmacológico documentando elevação de transaminases e risco de colestase química em protocolos com infusão contínua muito prolongada.',
      },
    ],
    isPublished: true,
    createdAt: '2026-03-29T10:00:00.000Z',
    updatedAt: '2026-03-29T10:00:00.000Z',
};
