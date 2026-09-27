import { MedicationRecord } from '../../types/medication';

export const diazepamMedicationRecord: MedicationRecord = {
  id: 'med-diazepam',
  slug: 'diazepam',
  title: 'Diazepam',
  activeIngredient: 'Diazepam (7-cloro-1-metil-5-fenil-1,3-di-hidro-2H-1,4-benzodiazepin-2-ona)',
  isControlled: true,
  tradeNames: [
    'Valium® 5 mg e 10 mg Comprimidos (Produtos Roche — Referência Humana Extrabula)',
    'Uni-Diazepax® 5 mg/mL (10 mg/2 mL) Solução Injetável (União Química — Referência Hospitalar Extrabula)',
    'Diazepam União Química 5 mg e 10 mg Comprimidos Sulcados (União Química)',
    'Diazepam Teuto 5 mg/mL Solução Injetável Ampola 2 mL (Teuto Brasileiro)',
    'Diazepam Eurofarma 5 mg e 10 mg Comprimidos (Eurofarma)',
    'Diazepam Hipolabor 5 mg/mL Solução Injetável Ampola 2 mL (Hipolabor)',
    'Compaz® 5 mg e 10 mg Comprimidos (Cristália Produtos Químicos Farmacêuticos)',
    'Diazepan® 5 mg/mL Solução Injetável Ampola 2 mL (Cristália)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/diazepam/PNG',
  pharmacologicClass:
    'Benzodiazepínico de 1ª geração; modulador alostérico positivo do receptor GABA-A com propriedades anticonvulsivantes, sedativas, ansiolíticas e miorrelaxantes centrais',
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Diazepam',
    'Valium',
    'Uni-Diazepax',
    'Benzodiazepínico',
    'GABA-A',
    'Status Epilepticus',
    'Crises Convulsivas',
    'Resgate Anticonvulsivante',
    'Intoxicação por Metronidazol',
    'Relaxante Muscular Central',
    'Sedativo',
    'Pré-Anestésico',
    'ACVIM 2024',
    'Notificação de Receita B VET (Lista B1)',
  ],

  mechanismOfAction:
    'O diazepam é um derivado benzodiazepínico sintético pertencente à subclasse das 1,4-benzodiazepin-2-onas. Farmacodinamicamente, atua como modulador alostérico positivo (PAM) do receptor do ácido gama-aminobutírico do tipo A (GABA-A), o principal complexo receptor-canal iônico inibitório do sistema nervoso central. O diazepam não atua como agonista direto: não substitui o GABA nem promove abertura autônoma do poro iônico em concentrações clínicas. Ele liga-se estereoespecificamente ao sítio alostérico benzodiazepínico situado na interface entre as subunidades alfa e gama (particularmente alfa1, alfa2, alfa3 e alfa5) do receptor pentamérico. Essa ligação induz uma alteração conformacional que potencializa a afinidade do receptor pelo GABA endógeno, aumentando acentuadamente a frequência e a probabilidade de abertura do canal central de cloreto. O influxo resultante de íons cloreto (Cl-) promove hiperpolarização da membrana neuronal pós-sináptica, afastando o potencial de repouso do limiar de despolarização e tornando os neurônios resistentes à deflagração e à propagação de potenciais de ação patológicos. A diversidade de ações clínicas correlaciona-se com as isoformas de subunidades: receptores contendo alfa1 medeiam sedação, hipnose e amnésia anterógrada; receptores com alfa2 e alfa3 medeiam ansiólise e potente supressão da hiperexcitabilidade epileptogênica; e circuitos interneuronais espinhais medeiam relaxamento muscular central. Por depender da presença de GABA endógeno para exercer seu efeito inibitório, o diazepam possui ampla margem de segurança contra depressão cardiorrespiratória grave quando utilizado isoladamente, diferentemente de barbitúricos ou propofol. O fármaco não possui propriedades analgésicas intrínsecas.',

  plainLanguageSummary:
    'O diazepam é um dos fármacos mais tradicionais e amplamente empregados da classe dos benzodiazepínicos na medicina veterinária de cães e gatos, atuando como um potente modulador alostérico positivo dos receptores GABA-A no sistema nervoso central para promover rápida inibição neuronal, relaxamento muscular e cessação de descargas paroxísticas. Por sua marcante lipofilicidade, atravessa a barreira hematoencefálica em questão de segundos e atinge o encéfalo quase instantaneamente por via intravenosa, constituindo a primeira linha absoluta para o controle emergencial de crises convulsivas agudas e status epilepticus na sala de emergência. Todavia, seu emprego clínico moderno exige rigor técnico e limites bem definidos: no cão, seu efeito anticonvulsivante tem curta duração e induz rápida tolerância farmacodinâmica em uma a duas semanas, inviabilizando seu uso como antiepiléptico de manutenção crônica; na espécie felina, a administração oral repetida deve ser estritamente evitada devido ao risco de necrose hepática fulminante idiossincrática fatal; e na infusão contínua em pacientes críticos, formulações com propilenoglicol e adsorção plástica ao PVC tornam o midazolam frequentemente preferível, devendo o diazepam ser compreendido como um recurso inestimável de resgate imediato para cessar o evento convulsivo agudo enquanto fármacos de sustentação de longa duração são prontamente instituídos.',

  pillars: [
    {
      title: 'Modulação Alostérica Positiva do Receptor GABA-A',
      icon: 'Brain',
      desc: 'Liga-se à interface entre subunidades alfa e gama do receptor GABA-A, elevando a frequência de abertura do poro de cloreto dependente de GABA e promovendo hiperpolarização inibitória pós-sináptica imediata.',
    },
    {
      title: 'Transposição Ultrarrápida da Barreira Hematoencefálica',
      icon: 'Zap',
      desc: 'Elevada lipofilicidade que proporciona início de ação anticonvulsivante em 1 a 3 minutos por via intravenosa, tornando-o o padrão-ouro de primeira linha para cessar convulsões ativas na sala de emergência.',
    },
    {
      title: 'Relaxamento Muscular Central e Ação Pré-Anestésica Sinergista',
      icon: 'Activity',
      desc: 'Facilita a inibição sináptica em interneurônios espinhais e motores, combatendo a rigidez muscular induzida por cetamina, espasmos reflexos e promovendo efeito poupador de anestésicos gerais.',
    },
    {
      title: 'Fármaco de Resgate Agudo com Limitação em Manutenção',
      icon: 'Clock',
      desc: 'Ação anticonvulsivante canina fugaz (cerca de 20 minutos) e rápido desenvolvimento de tolerância funcional em 1 a 2 semanas, exigindo rápida transição para antiepilépticos de sustentação prolongada.',
    },
  ],

  quickSummaryHighlights: [
    'Modulador alostérico positivo (PAM) do receptor GABA-A de ação ultrarrápida (1 a 3 minutos IV); primeira linha no controle imediato de crises convulsivas ativas.',
    'Ação anticonvulsivante de curta duração no cão (~20 min) e tolerância em 1 a 2 semanas; não deve ser utilizado como monoterapia de manutenção em cães epilépticos.',
    'Contraindicação crítica: NÃO prescrever diazepam oral repetido em gatos pelo risco raro, porém devastador e quase invariavelmente fatal, de necrose hepática fulminante idiossincrática.',
    'No status epilepticus moderno (ACVIM 2024), não repetir bolus indefinidamente: avançar para segunda linha (levetiracetam/fenobarbital) se persistir após 2 bolus. Em gatos, evitar diazepam em CRI (preferir midazolam).',
    'Indicação específica notável: tratamento de escolha com reversão acelerada na neurotoxicose por metronidazol em cães (0,43 mg/kg IV seguido de VO).',
    'Medicamento sujeito a controle especial no Brasil: Portaria SVS/MS 344/98 - Lista B1 (Psicotrópicos), dispensado sob Notificação de Receita B VET com retenção da notificação e validade de 30 dias.',
  ],

  clinicalWarningItems: [
    {
      label: 'Contraindicação Crítica de Diazepam Oral Repetido em Felinos (Risco de Falência Hepática Fulminante)',
      text: 'A administração oral continuada de diazepam em gatos pode desencadear necrose hepática centrolobular fulminante aguda com mortalidade descrita próxima a 90% (Center et al., 1996). O quadro não é puramente dose-dependente, refletindo susceptibilidade idiossincrática felina ligada à deficiência de glicuronidação e inibição da bomba BSEP biliar. Não prescrever diazepam oral continuado para gatos em hipótese alguma (nem para ansiedade nem para estimulação de apetite, onde mirtazapina e capromorelina são amplamente seguras).',
    },
    {
      label: 'Status Epilepticus e Limites da Repetição de Bolus (Consenso ACVIM 2024)',
      text: 'Administrar 0,5 a 1 mg/kg IV lento. Se a crise persistir, um segundo bolus pode ser repetido a partir de 2 minutos. Se não houver cessação após 2 doses, NÃO insistir em repetidos bolus de benzodiazepínico; iniciar imediatamente fármacos de 2ª linha (levetiracetam 60 mg/kg IV ou fenobarbital 16-20 mg/kg IV). A repetição cega esgota a inibição GABAérgica por internalização de receptores. Em gatos, o ACVIM 2024 contraindica expressamente CRI de diazepam (recomendação D; preferir midazolam).',
    },
    {
      label: 'Adsorção Significativa ao Plástico PVC e Incompatibilidades Físico-Químicas',
      text: 'O diazepam sofre intensa adsorção a equipos e bolsas de PVC (perda de 55% da concentração em 2h e até 70% em 24h), além de precipitar em contato com soluções aquosas e ser incompatível em Y-site com Ringer Lactato. Em infusões contínuas (CRI), utilizar recipientes de vidro ou poliolefina/polietileno e linhas curtas, ou preferir o midazolam hidrossolúvel.',
    },
    {
      label: 'Risco de Injeção Intramuscular (IM) e Toxicidade pelo Propilenoglicol',
      text: 'A via IM é contraindicada: é extremamente dolorosa, causa necrose tecidual e apresenta absorção errática e retardada devido ao solvente propilenoglicol. Por via IV, a injeção deve ser obrigatoriamente lenta (pelo menos 1 minuto para cada 5 mg) para evitar hipotensão, bradicardia, irritação endotelial e tromboflebite provocadas pelo propilenoglicol.',
    },
  ],

  indications: [
    'Tratamento de emergência de primeira linha para interrupção de crises convulsivas ativas, crises em salvas (cluster seizures) e status epilepticus por via intravenosa lenta ou retal.',
    'Tratamento de escolha para reversão acelerada dos sinais neurológicos vestibulares e cerebelares na toxicose por metronidazol em cães.',
    'Componente adjuvante da medicação pré-anestésica (MPA) e coadjuvante de indução anestésica em cães e gatos debilitados ou cardiopatas (anesthetic-sparing).',
    'Miorrelaxamento central coadjuvante em hipertonia espástica muscular, intoxicação por estricnina, tétano e alívio do espasmo do esfíncter uretral externo na dissinergia miccional canina.',
    'Manejo de resgate extravascular retal domiciliar para cães epilépticos em crises quando não houver acesso venoso imediato disponível.',
  ],

  quickIndications: [
    {
      condition: 'Status Epilepticus e Crises Convulsivas Agudas em Cães e Gatos (Bolus IV)',
      species: 'both',
      doseSummary: '0,5 a 1,0 mg/kg IV lento (mínimo de 1 minuto por ampola de 10 mg); repetir uma vez após 2 min se persistir',
      route: 'Intravenosa (IV lenta)',
      duration: 'Dose única de emergência; no máximo 2 bolus antes de avançar para 2ª linha',
      clinicalContext: 'Cessação imediata da atividade paroxística; preparar levetiracetam ou fenobarbital concomitante.',
    },
    {
      condition: 'Crises em Salvas Caninas sem Acesso Venoso (Resgate Retal Domiciliar)',
      species: 'dog',
      doseSummary: '0,5 a 2,0 mg/kg por via retal (PR) utilizando a solução injetável pura com sonda flexível lubrificada',
      route: 'Retal (PR)',
      duration: 'Dose única de resgate emergencial domiciliar até chegada à clínica veterinária',
      clinicalContext: 'Pacientes em crise contínua em casa; se o cão usar fenobarbital cronicamente, utilizar a dose superior de 2 mg/kg.',
    },
    {
      condition: 'Neurotoxicose por Metronidazol em Cães (Protocolo Evans et al. 2003)',
      species: 'dog',
      doseSummary: '0,43 mg/kg IV lento em dose única, seguido de 0,43 mg/kg VO a cada 8 horas durante 3 dias',
      route: 'Intravenosa (IV) seguida de Oral (VO)',
      duration: 'Dose IV inicial + 3 dias de tratamento oral',
      clinicalContext: 'Cães com ataxia vestibular, nistagmo, tremores ou opistótono após uso terapêutico ou acidental de metronidazol.',
    },
    {
      condition: 'Adjuvante na Medicação Pré-Anestésica e Indução Anestésica',
      species: 'both',
      doseSummary: '0,1 a 0,5 mg/kg IV lento imediatamente antes ou associado a cetamina, propofol ou alfaxalona',
      route: 'Intravenosa (IV lenta)',
      duration: 'Dose única pré-operatória imediata',
      clinicalContext: 'Promove excelente miorrelaxamento com cetamina e reduz a dose requerida do agente de indução.',
    },
    {
      condition: 'Hipertonia do Esfíncter Uretral Externo / Dissinergia Reflexa em Cães',
      species: 'dog',
      doseSummary: '0,25 a 1,0 mg/kg VO a cada 8 a 12 horas (ou 2 a 10 mg/cão VO q8-12h)',
      route: 'Oral (VO com comprimidos sulcados)',
      duration: '3 a 7 dias durante o pós-obstrutivo imediato',
      clinicalContext: 'Redução do espasmo do músculo estriado periuretral após desobstrução mecânica de urólitos em machos.',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-diaz-status-emergency',
      indication: 'Interrupção de Emergência de Crises Convulsivas Agudas e Status Epilepticus',
      clinicalContext:
        'Cães e gatos admitidos na sala de emergência apresentando atividade convulsiva contínua há mais de 5 minutos ou crises repetitivas em salvas sem recuperação de consciência entre os episódios.',
      species: 'both',
      dose: '0,5 a 1,0 mg/kg IV lento administrado em linha venosa exclusiva ao longo de 1 a 2 minutos. Se a crise persistir após 2 minutos, pode-se repetir um segundo bolus de 0,5 mg/kg. Se a crise não cessar após 2 doses, avançar para fármacos de 2ª linha (levetiracetam ou fenobarbital).',
      route: 'Intravenosa (IV lenta pura)',
      frequency: 'Dose única de emergência; reavaliação em 2 minutos; máximo de 2 doses antes do escalonamento',
      duration: 'Fase aguda imediata (primeiros minutos do atendimento emergencial).',
      mechanismOfAction:
        'Penetra quase instantaneamente no encéfalo por lipossolubilidade, ligando-se a sítios alostéricos do GABA-A em neurônios corticais e tálamo-corticais, deflagrando influxo maciço de cloreto e hiperpolarização que extingue os trens de disparo paroxístico.',
      clinicalRationale:
        'Consenso ACVIM 2024 classifica diazepam IV como recomendação classe A em cães e classe B em gatos para a primeira linha de tratamento do status epilepticus. Cessar a crise nos primeiros 5 minutos previne dano neuronal excitotóxico irreversível.',
      monitoring:
        'Cessação dos abalos motores em até 5 minutos, ausência de recorrência em 10 minutos, permeabilidade de vias aéreas, saturação de oxigênio (SpO2), frequência cardíaca, pressão arterial média e glicemia capilar.',
      referenceIds: ['ref-acvim-status-2024', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional ACVIM 2024 e Diretrizes Mundiais de Emergência',
    },
    {
      id: 'ind-diaz-rectal-canine-rescue',
      indication: 'Resgate Extravascular Retal Domiciliar para Crises em Salvas Caninas',
      clinicalContext:
        'Cães epilépticos apresentando crises em salvas no ambiente domiciliar onde não há médico-veterinário ou acesso vascular disponível e a via oral é estritamente contraindicada pelo risco de broncoaspiração.',
      species: 'dog',
      dose: '0,5 a 2,0 mg/kg por via retal (PR). Se o cão estiver recebendo fenobarbital de manutenção cronicamente, utilizar a dose superior de 2 mg/kg PR devido à indução enzimática do clearance.',
      route: 'Retal (PR utilizando a ampola injetável de 5 mg/mL com sonda flexível lubrificada)',
      frequency: 'Dose única no episódio convulsivo; encaminhar à clínica se não cessar em 5 minutos',
      duration: 'Dose de resgate imediata pré-hospitalar.',
      mechanismOfAction:
        'Absorção pela rica rede venosa hemorroidária retal, atingindo concentrações encefálicas protetoras em aproximadamente 5 a 10 minutos.',
      clinicalRationale:
        'Recomendação classe C do ACVIM 2024 para uso extra-hospitalar. Embora o midazolam intranasal tenha demonstrado superioridade em ensaios randomizados (Charalambous et al., 2017), a via retal com diazepam permanece como recurso clássico difundido.',
      monitoring:
        'Observar relaxamento do tônus muscular; manter pelve elevada por 2 minutos para evitar ejeção retal; levar imediatamente ao hospital se houver recorrência.',
      referenceIds: ['ref-acvim-status-2024', 'ref-charalambous-2017', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado e Diretrizes de Especialistas',
    },
    {
      id: 'ind-diaz-metro-toxicosis-dog',
      indication: 'Tratamento de Escolha na Neurotoxicose por Metronidazol em Cães',
      clinicalContext:
        'Cães apresentando síndrome cerebelar e vestibular aguda (ataxia incapacitante, nistagmo vertical ou posicional, rigidez extensora, tremores e opistótono) associada à intoxicação crônica ou aguda por metronidazol.',
      species: 'dog',
      dose: 'Dose de ataque: 0,43 mg/kg IV lento em dose única, seguido imediatamente por 0,43 mg/kg VO a cada 8 horas (TID) durante 3 dias consecutivos.',
      route: 'Intravenosa (IV lenta) na fase inicial, seguida de Oral (VO com comprimidos sulcados)',
      frequency: 'A cada 8 horas (q8h) por 3 dias',
      duration: '3 dias consecutivos após a suspensão imediata do metronidazol.',
      mechanismOfAction:
        'O metronidazol inibe competitivamente a neurotransmissão gabaérgica nos núcleos cerebelares e vestibulares; o diazepam modula positivamente o receptor GABA-A, restaurando funcionalmente o tônus inibitório e acelerando a recuperação celular.',
      clinicalRationale:
        'O ensaio de Evans et al. (2003) demonstrou redução dramática no tempo de melhora neurológica inicial (13,4 horas com diazepam vs 4,25 dias com suporte) e no tempo para recuperação completa (38,8 horas com diazepam vs 11 dias sem diazepam).',
      monitoring:
        'Remissão do nistagmo, melhora da propriocepção e coordenação motora, retorno da capacidade de deambulação sem apoio e apetite.',
      referenceIds: ['ref-evans-2003', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2a — Estudo de Coorte Controlado com Redução Significativa do Tempo de Cura',
    },
    {
      id: 'ind-diaz-preanesthesia-induction',
      indication: 'Componente Adjuvante na Medicação Pré-Anestésica e Indução Anestésica',
      clinicalContext:
        'Pacientes caninos e felinos idosos, debilitados ou com comprometimento hemodinâmico submetidos à anestesia geral, ou em protocolos dissociativos associados à cetamina.',
      species: 'both',
      dose: '0,1 a 0,5 mg/kg IV lento na MPA; ou 0,1 a 0,3 mg/kg IV lento imediatamente antes ou associado a agentes indutores (cetamina, propofol, alfaxalona ou etomidato).',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única pré-operatória',
      duration: 'Procedimento anestésico agudo.',
      mechanismOfAction:
        'Contrapõe a hipertonia e os tremores musculares característicos da cetamina através de relaxamento medular central; proporciona potente efeito poupador de indutor e estabilidade cardiovascular.',
      clinicalRationale:
        'Combinação consagrada em anestesiologia veterinária (Grimm et al. Lumb & Jones). Evitar em animais jovens e hígidos em monoterapia devido ao risco de excitação paradoxal e desinibição agressiva.',
      monitoring:
        'Grau de relaxamento da mandíbula, facilidade de intubação orotraqueal, frequência respiratória, pressão arterial média e eletrocardiograma.',
      referenceIds: ['ref-bsava-10', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Consensos Internacionais de Anestesiologia Veterinária',
    },
    {
      id: 'ind-diaz-urethral-hypertonia-dog',
      indication: 'Miorrelaxamento Central na Hipertonia de Esfíncter Uretral em Cães',
      clinicalContext:
        'Cães machos no período pós-desobstrução mecânica de urólitos apresentando retenção funcional por dissinergia miccional ou espasmo doloroso do músculo estriado periuretral.',
      species: 'dog',
      dose: '0,25 a 1,0 mg/kg VO a cada 8 a 12 horas (ou dose empírica de 2 a 10 mg/cão VO q8-12h conforme o porte), frequentemente associado a um bloqueador alfa-1 (prazosina ou fenoxibenzamina).',
      route: 'Oral (VO com comprimidos sulcados)',
      frequency: 'A cada 8 a 12 horas',
      duration: '3 a 5 dias durante o período agudo pós-traumático uretral.',
      mechanismOfAction:
        'Deprime a atividade dos motoneurônios e arcos reflexos espinhais sacrais que inervam o esfíncter uretral externo estriado via nervo pudendo, reduzindo a resistência outflow.',
      clinicalRationale:
        'Uso adjuvante clássico descrito em nefrologia e urologia veterinária para facilitar o esvaziamento vesical espontâneo sem exigir cateterismos traumáticos repetidos.',
      monitoring:
        'Presença de jato urinário contínuo e sem esforço excessivo, palpação vesical pós-miccional para verificar volume residual e observação de sedação excessiva.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Literatura Farmacológica Especializada e Diretrizes Urológicas',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Por via intravenosa, a biodisponibilidade é de 100% com início de ação cerebral ultrarrápido entre 1 e 3 minutos. Por via oral no cão, o diazepam é rapidamente absorvido com concentração plasmática máxima (Cmax) entre 30 minutos e 2 horas, sofrendo extenso metabolismo de primeira passagem hepática com geração de metabólitos ativos. Por via intranasal em cães na dose de 0,5 mg/kg, atinge concentrações terapêuticas cerebrais (> 300 ng/mL) em menos de 5 minutos, com biodisponibilidade de cerca de 41 a 42% para o fármaco inalterado (Musulin et al., 2011) e até 80% para benzodiazepínicos totais (Platt et al., 2000). Por via retal, a absorção é rápida (início clínico em 5 a 10 minutos), com biodisponibilidade estimada em cerca de 65%, embora com maior variabilidade individual e eficácia inferior ao midazolam intranasal em status epilepticus.',
    distribution:
      'Composto altamente lipofílico com logP entre 2,8 e 3,0 e pKa de aproximadamente 3,4. Apresenta transposição imediata da barreira hematoencefálica, seguida de uma rápida fase de redistribuição inicial dos tecidos ricamente perfundidos (encéfalo e coração) para o tecido adiposo e muscular periférico. Essa redistribuição rápida é o motivo biológico pelo qual a duração do efeito anticonvulsivante no cão cessa em cerca de 20 a 30 minutos, apesar de sua meia-vida plasmática ser mais longa. O volume de distribuição aparente (Vd) é amplo e multicompartimental, variando de 0,9 a 6,0 L/kg em cães conforme o modelo farmacocinético. A ligação às proteínas plasmáticas (sobretudo à albumina sérica) é extremamente alta, em torno de 96% a 98%, fazendo com que estados de hipoalbuminemia severa aumentem marcadamente a fração livre farmacologicamente ativa. Atravessa prontamente a placenta e acumula-se no leite materno.',
    metabolism:
      'Metabolização estritamente hepática. Em cães, sofre desmetilação oxidativa microssomal gerando nordiazepam (desmetildiazepam), seguido de hidroxilação em temazepam e oxazepam, todos metabólitos com potente atividade farmacológica anticonvulsivante e sedativa que prolongam a depressão central. Na espécie felina, a biotransformação oxidativa é marcadamente distinta da canina, com predomínio de temazepam, menor capacidade global de conjugação por glicuronidação e inibição in vitro da bomba de efluxo de sais biliares (BSEP), fatores que fundamentam a suscetibilidade singular da espécie felina à necrose hepatocelular fulminante idiossincrática.',
    elimination:
      'A depuração ocorre quase que exclusivamente após transformação hepática e conjugação, com excreção dos metabólitos conjugados inativos predominantemente por via urinária renal e menor fração biliar/fecal. A meia-vida de eliminação plasmática terminal (t1/2) do diazepam inalterado no cão varia de 1,0 a 3,2 horas (com seu metabólito ativo nordiazepam persistindo de 2 a 10 horas). No gato, a meia-vida do diazepam inalterado varia de 3,5 a 5,5 horas, enquanto o nordiazepam atinge meia-vida prolongada de até 21,3 horas. A depuração corporal total no cão situa-se entre 11 e 28 mL/kg/min e no gato em torno de 4,7 mL/kg/min.',
    cnsPenetration:
      'Extremamente rápida e maciça em virtude da ausência de ionização em pH fisiológico e da alta lipofilicidade, atingindo o compartimento liquórico cerebral quase simultaneamente à administração venosa.',
    plasmaBinding:
      'Aproximadamente 96% a 98% ligado à albumina sérica. Hipoalbuminemia (< 2,0 g/dL) duplica a fração livre circulante, exigindo redução posológica e titulação cuidadosa.',
    halfLife:
      'No cão: diazepam parental ~1,0 a 3,2 h (nordiazepam ativo de 2 a 10 h); no gato: diazepam parental ~3,5 a 5,5 h (nordiazepam ativo de até 21,3 h).',
  },

  administration: [
    'Via Intravenosa (IV) - Regra de Ouro: administrar lentamente na velocidade mínima de 1 minuto para cada 5 mg (1 mL) de solução injetável, preferencialmente em acesso venoso exclusivo sem misturas.',
    'Incompatibilidade de Y-site: não infundir diazepam na mesma linha venosa ou em equipo contendo Ringer com Lactato ou soluções com eletrólitos concentrados sob risco de precipitação microcristalina imediata.',
    'Via Retal (PR): instilar a solução injetável pura utilizando sonda uretral flexível lubrificada (número 6 a 8 Fr) introduzida de 3 a 5 cm no reto; manter a pelve elevada por 2 minutos para evitar ejeção.',
    'Contraindicação da via Intramuscular (IM): evitar rigorosamente o uso IM; aplicação extremamente dolorosa, irritante ao tecido muscular e com absorção errática e retardada pelo solvente propilenoglicol.',
    'Contraindicação em Felinos por Via Oral: não prescrever formulações orais repetidas para gatos devido ao risco letal de insuficiência hepática fulminante idiossincrática.',
    'Adsorção a Plásticos: se empregado em infusão contínua (CRI), utilizar recipientes de vidro ou polipropileno e linhas curtas para minimizar a perda do princípio ativo adsorvido ao PVC.',
  ],

  contraindications: [
    'Administração oral repetida em gatos domésticos (contraindicação absoluta de rotina devido ao risco documentado de necrose hepática fulminante fatal).',
    'Insuficiência hepática grave descompensada e encefalopatia hepática (o diazepam potencializa a inibição gabaérgica endógena que induz o coma hepático).',
    'Hipersensibilidade prévia conhecida ao diazepam ou a outros derivados da classe dos benzodiazepínicos.',
    'Depressão respiratória grave não assistida ou coma profundo sem ventilação mecânica.',
    'Monoterapia anticonvulsivante de manutenção crônica em cães epilépticos (desenvolvimento de tolerância funcional completa em 1 a 2 semanas).',
    'Administração intramuscular (IM) rotineira (absorção errática, necrose tecidual e dor severa).',
    'Fêmeas gestantes ou lactantes (risco de depressão respiratória neonatal, hipotonia e fenda palatina).',
  ],

  cautions: [
    'Animais jovens e sadios em monoterapia: risco frequente de desinibição paradoxal com hiperatividade, vocalização incoercível, inquietação e agressividade.',
    'Doença renal crônica avançada (IRIS estágios 3 e 4): redução da depuração dos metabólitos ativos; titular por resposta clínica.',
    'Hipoalbuminemia moderada a severa (albumina sérica < 2,0 g/dL): aumento da fração livre farmacologicamente ativa com maior sensibilidade depressora.',
    'Infusão intravenosa rápida em bolus: risco agudo de hipotensão arterial severa, bradicardia reflexa e tromboflebite endotelial provocada pelo solvente propilenoglicol.',
    'Interrupção abrupta após uso diário por mais de 7 a 14 dias: risco de síndrome de abstinência, ansiedade de rebote, tremores e convulsões por descontinuação.',
  ],

  adverseEffects: [
    'Sedação, sonolência profunda e letargia transitória (efeito comum, dose-dependente).',
    'Ataxia, incoordenação motora e fraqueza de membros pélvicos (comum nas primeiras horas).',
    'Desinibição comportamental e excitação paradoxal (frequente em cães e gatos jovens hígidos recebendo o fármaco isolado).',
    'Hipotensão arterial, bradicardia e dor vascular (associadas à injeção intravenosa rápida do solvente propilenoglicol).',
    'Hepatotoxicidade felina fulminante aguda com necrose centrolobular maciça e icterícia (rara, porém devastadora em uso oral continuado).',
    'Agressividade transitória por perda de freios inibitórios corticais (incomum).',
    'Tromboflebite no sítio de injeção venosa provocada por solventes da formulação injetável.',
    'Tolerância aos efeitos anticonvulsivantes e dependência física com crises de rebote após descontinuação abrupta.',
  ],

  interactions: [
    'Opioides (Morfina, Metadona, Fentanil, Buprenorfina): sinergismo depressor sobre o sistema nervoso central e centro respiratório; monitorar ventilação.',
    'Anestésicos Gerais de Indução (Propofol, Cetamina, Alfaxalona): efeito poupador benéfico marcante (anesthetic-sparing), diminuindo a dose do indutor em 20% a 40%.',
    'Alfa-2 Agonistas (Dexmedetomidina, Xilazina): potencialização sedativa profunda e risco acentuado de bradicardia e hipotensão.',
    'Fenobarbital de Manutenção Crônica: induz enzimas hepáticas aumentando o clearance do diazepam e reduzindo sua eficácia anticonvulsivante de resgate.',
    'Inibidores do Citocromo P450 (Cimetidina, Omeprazol, Cetoconazol, Fluconazol): retardam a biotransformação do diazepam, prolongando a duração da sedação.',
    'Teofilina e Aminofilina: antagonismo farmacodinâmico central por bloqueio de receptores de adenosina, reduzindo a resposta aos benzodiazepínicos.',
  ],

  attentionSubtitle:
    'Rigor na velocidade de injeção IV, contraindicação oral felina, tolerância rápida em cães e manejo no status epilepticus.',

  attentionData: {
    precautions: [
      {
        condition: 'Administração Oral Continuada em Gatos (Necrose Hepática Fulminante)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Em gatos, o diazepam oral administrado por vários dias consecutivos pode desencadear necrose centrolobular hepática fulminante de etiologia idiossincrática com colapso funcional rápido e mortalidade de aproximadamente 90% (Center et al., 1996). A deficiência felina de glicuronidação e a inibição da bomba de sais biliares (BSEP) promovem acúmulo de metabólitos hepatotóxicos.',
        clinicalAction:
          'Contraindicação absoluta de rotina. Nunca prescrever diazepam oral contínuo para gatos. Para estimulação de apetite, utilizar mirtazapina; para ansiedade, optar por gabapentina.',
      },
      {
        condition: 'Hepatopatia Descompensada e Encefalopatia Hepática',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O diazepam depende de depuração hepática oxidativa. Em pacientes com insuficiência hepatocelular e cirrose, a depuração cai acentuadamente. Além disso, a encefalopatia hepática envolve hipersensibilidade intrínseca dos receptores GABA-A e aumento de substâncias endógenas benzodiazepine-like; administrar diazepam aprofunda o coma hepático.',
        clinicalAction:
          'Contraindicado em pacientes com hepatopatia grave descompensada, shunt portossistêmico ou sinais de encefalopatia hepática.',
      },
      {
        condition: 'Status Epilepticus Refratário a Duas Doses de Benzodiazepínicos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'No status epilepticus prolongado, ocorre internalização e downregulation dos receptores GABA-A na fenda sináptica acompanhada de upregulation de receptores excitatórios glutamatérgicos NMDA. A insistência em múltiplos bolus de diazepam torna-se progressivamente ineficaz e acumula solventes tóxicos.',
        clinicalAction:
          'Se a crise persistir após 2 bolus de diazepam (ou midazolam), não repetir benzodiazepínicos. Instituir imediatamente anticonvulsivantes de 2ª linha (levetiracetam 60 mg/kg IV lento ou fenobarbital 16 a 20 mg/kg IV) conforme o Consenso ACVIM 2024.',
      },
      {
        condition: 'Velocidade de Injeção Intravenosa e Toxicidade do Propilenoglicol',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A formulação injetável clássica de 5 mg/mL contém propilenoglicol e etanol a 40-50% para solubilização. A injeção intravenosa rápida em bolus induz vasodilatação periférica reflexa abrupta, hipotensão arterial, bradicardia e necrose endotelial com flebite.',
        clinicalAction:
          'Administrar estritamente por injeção intravenosa lenta, respeitando o tempo mínimo de 1 a 2 minutos para cada ampola de 10 mg (2 mL). Monitorar pulso e pressão arterial.',
      },
      {
        condition: 'Adsorção Plástica ao PVC em Infusões Contínuas (CRI)',
        alertLevel: 'caution',
        physiologicalExplanation:
          'O diazepam possui alta afinidade química por materiais termoplásticos de cloreto de polivinila (PVC), sofrendo adsorção à parede de bolsas e equipos com perda documentada de 55% a 70% da concentração disponível na solução ao longo do tempo.',
        clinicalAction:
          'Se CRI for realizada em cães, utilizar seringas de polipropileno/polietileno ou frascos de vidro com equipes curtas e sem PVC. Em gatos, o Consenso ACVIM 2024 contraindica CRI de diazepam (preferir midazolam).',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Sedação Profunda e Depressão do Sensório',
        frequency: 'common',
        mechanism: 'Potenciação da inibição gabaérgica em circuitos reticulares e tálamo-corticais contendo a subunidade alfa1.',
        clinicalManagement:
          'Geralmente transitória. Manter o animal aquecido, em decúbito protegido e monitorar permeabilidade de vias aéreas até a recuperação.',
      },
      {
        effect: 'Ataxia e Incoordenação Motora',
        frequency: 'common',
        mechanism: 'Depressão sináptica nos núcleos cerebelares e interneurônios proprioceptivos espinhais.',
        clinicalManagement:
          'Evitar pisos lisos e quedas. Em animais ambulatoriais, alertar o tutor para proteger o animal nas primeiras horas.',
      },
      {
        effect: 'Excitação Paradoxal e Agressividade por Desinibição',
        frequency: 'common',
        mechanism: 'Retirada transitória de freios inibitórios corticais em animais jovens hígidos sob tônus prévio de ansiedade.',
        clinicalManagement:
          'Interromper a administração isolada. Se necessário, associar um opioide pleno (metadona) ou sedativo com outro mecanismo; o antagonista flumazenil pode ser empregado.',
      },
      {
        effect: 'Hipotensão e Bradicardia Transitória',
        frequency: 'uncommon',
        mechanism: 'Efeito vasodilatador direto do solvente propilenoglicol sobre a musculatura lisa vascular associado à injeção rápida.',
        clinicalManagement:
          'Reduzir imediatamente a velocidade de injeção. Fornecer fluidoterapia de suporte com cristaloide e manter o paciente em monitoramento pressórico.',
      },
      {
        effect: 'Necrose Hepática Fulminante em Gatos',
        frequency: 'rare',
        mechanism: 'Reação idiossincrática hepatocelular grave associada ao uso oral continuado com apoptose maciça de hepatócitos.',
        clinicalManagement:
          'Emergência médica crítica. Suspender o diazepam imediatamente. Instituir fluidoterapia intensiva, antioxidantes hepatoprotetores (N-acetilcisteína e SAMe), suporte nutricional enteral e monitorar coagulograma.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Pacientes Geriátricos, Caquéticos ou Criticamente Enfermos',
        recommendedAdjustment:
          'Reduzir a dose inicial em 50% (administrar 0,25 a 0,5 mg/kg IV) e titular lentamente a efeito.',
        physiologicalRationale:
          'Menor reserva funcional hepática, menor massa muscular de redistribuição e maior sensibilidade intrínseca dos receptores do sistema nervoso central.',
      },
      {
        clinicalCondition: 'Hipoalbuminemia Significativa (Albumina sérica < 2,0 g/dL)',
        recommendedAdjustment:
          'Reduzir a dose em 30% a 50% e titular lentamente pela resposta clínica.',
        physiologicalRationale:
          'Com 96-98% de ligação à albumina normal, a queda proteica duplica a fração livre circulante ativa do fármaco, potencializando a sedação.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica Avançada (IRIS Estágios 3 e 4)',
        recommendedAdjustment:
          'Na emergência manter a dose de ataque; se necessária repetição, estender os intervalos e monitorar sedação prolongada.',
        physiologicalRationale:
          'Diminuição da filtração glomerular prolonga a depuração dos metabólitos conjugados ativos (nordiazepam e oxazepam).',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Opioides (Morfina, Metadona, Fentanil, Buprenorfina)',
        severity: 'major',
        clinicalEffect: 'Depressão ventilatória aditiva e sedação profunda sinérgica.',
        pharmacologicalMechanism:
          'Ação combinada em receptores opioides mu e receptores GABA-A nos centros respiratórios bulbares.',
      },
      {
        drugOrClass: 'Anestésicos Gerais de Indução (Propofol, Cetamina, Alfaxalona)',
        severity: 'major',
        clinicalEffect: 'Redução expressiva na dose necessária para indução anestésica (efeito poupador benéfico).',
        pharmacologicalMechanism:
          'Somação de mecanismos depressores de vias tálamo-corticais e inibição da transmissão sináptica central.',
      },
      {
        drugOrClass: 'Fenobarbital Crônico de Manutenção',
        severity: 'major',
        clinicalEffect: 'Redução na eficácia e menor tempo de ação do diazepam em crises de escape.',
        pharmacologicalMechanism:
          'Indução enzimática microssomal hepática crônica acelerando a depuração e o clearance do diazepam.',
      },
      {
        drugOrClass: 'Inibidores Enzimáticos (Cimetidina, Omeprazol, Fluconazol, Cetoconazol)',
        severity: 'moderate',
        clinicalEffect: 'Prolongamento acentuado do período de sedação e sonolência residual.',
        pharmacologicalMechanism:
          'Inibição de enzimas oxidativas hepáticas responsáveis pela clivagem do diazepam em metabólitos secundários.',
      },
      {
        drugOrClass: 'Teofilina e Aminofilina',
        severity: 'moderate',
        clinicalEffect: 'Redução da eficácia anticonvulsivante e sedativa do diazepam.',
        pharmacologicalMechanism:
          'Antagonismo competitivo dos receptores centrais de adenosina promovendo estímulo cortical oposto.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Solução de Cloreto de Sódio a 0,9% (SF 0,9%) em concentrações baixas e frascos de vidro',
        'Glicose a 5% em Água (SG 5%) para infusão imediata em vidro',
      ],
      incompatibleFluids: [
        'Ringer com Lactato (incompatibilidade química e risco de precipitação em Y-site)',
        'Soluções com eletrólitos concentrados alcalinos',
        'Outros fármacos misturados na mesma seringa',
      ],
      infusionRateGuidance:
        'Administrar em injeção intravenosa lenta direta na velocidade máxima de 5 mg/minuto (cerca de 1 mL a cada 60 a 90 segundos). Para infusão contínua em cães refratários, utilizar bomba de infusão volumétrica com recipiente de vidro ou poliolefina a 0,1 a 2 mg/kg/h.',
      preparationNotes:
        'Inspecionar visualmente o líquido antes da injeção: deve estar límpido e sem turbidez. Descartar se houver cristais. Não misturar na mesma seringa com outros medicamentos.',
      diluentsCompatible: ['SF 0,9%', 'SG 5%'],
      incompatibilities: ['Ringer Lactato em Y-site', 'Misturas na mesma seringa com barbitúricos ou opioides'],
      infusionRate: '5 mg/minuto em injeção venosa lenta; 0,1 a 2 mg/kg/h em CRI canina',
      storageRequirements:
        'Conservar as ampolas e comprimidos em temperatura ambiente entre 15°C e 30°C, rigorosamente protegidos da luz solar direta. Não armazenar frações injetáveis em seringas plásticas pré-carregadas por tempo prolongado devido à adsorção.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV)',
        technique:
          'Via de escolha primária na sala de emergência. Administrar lentamente em linha venosa pérvia ao longo de 1 a 2 minutos por ampola, sem misturar com outros fármacos.',
        nursingCare:
          'Monitorar traçado de eletrocardiograma e frequência respiratória durante a injeção. Inspecionar o vaso para prevenir flebite química.',
        limitations:
          'Injeção rápida pode desencadear hipotensão arterial, bradicardia reflexa e tromboflebite induzida pelo solvente.',
      },
      {
        route: 'Retal (PR)',
        technique:
          'Instilar a solução injetável pura de 5 mg/mL utilizando seringa sem agulha acoplada a sonda uretral flexível lubrificada (número 6 ou 8 Fr) introduzida de 3 a 5 cm no reto.',
        nursingCare:
          'Manter a cauda abaixada e a pelve do cão discretamente elevada por 2 minutos para assegurar a retenção e absorção do volume.',
        limitations:
          'Início de ação ligeiramente mais lento (5 a 10 minutos) e presença de fezes na ampola retal que podem retardar a absorção.',
      },
      {
        route: 'Intranasal (IN)',
        technique:
          'Instilar metade da dose calculada em cada narina através de atomizador mucosal nasal (MAD) ou seringa sem agulha com a cabeça discretamente elevada.',
        nursingCare:
          'Limpar secreções nasais prévias antes da instilação; absorção transmucosa rápida em menos de 5 minutos.',
        limitations:
          'Volume superior a 0,5 mL por narina pode escorrer para a orofaringe; midazolam intranasal possui evidência clínica superior.',
      },
      {
        route: 'Oral (VO)',
        technique:
          'Administrar os comprimidos sulcados com pequena porção de alimento palatável úmido em cães.',
        nursingCare:
          'Garantir deglutição completa; monitorar ataxia e sedação nas primeiras horas após o uso.',
        limitations:
          'Estritamente contraindicada para uso continuado em gatos devido ao risco letal de necrose hepática fulminante.',
      },
      {
        route: 'Intramuscular (IM)',
        technique:
          'Não recomendada. Se excepcionalmente utilizada na ausência absoluta de outras vias, aplicar profundamente em musculatura volumosa.',
        nursingCare:
          'Observar dor intensa local e necrose tecidual; monitorar tempo de absorção imprevisível.',
        limitations:
          'Via contraindicada clinicamente por provocar dor severa e absorção errática e tardia.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Benzodiazepínico 1,4-substituído',
      chemicalClassDescription:
        'Estrutura monocíclica contendo um anel benzeno fundido a um anel diazepina de 7 membros com substituintes fenila e cloro, de fórmula molecular C16H13ClN2O e massa 284,74 g/mol.',
      therapeuticClass: 'Anticonvulsivante de Resgate, Sedativo e Relaxante Muscular Central',
      therapeuticClassDescription:
        'Modulador alostérico positivo do receptor GABA-A com potente atividade anticonvulsivante de emergência, miorrelaxamento central e ação sedativa.',
      atcCode: 'QN05BA01',
      receptorTargets: [
        'Receptor GABA-A (Interface das Subunidades Alfa e Gama)',
        'Subunidade Alfa1 do GABA-A (Sedação e Hipnose)',
        'Subunidades Alfa2 e Alfa3 do GABA-A (Anticonvulsão e Ansiólise)',
      ],
      receptorsAndSites: [
        {
          name: 'Sítio Benzodiazepínico do Receptor GABA-A',
          type: 'Sítio alostérico em canal iônico pentamérico de cloreto',
          action: 'Modulação alostérica positiva com aumento da frequência de abertura',
          clinicalEffect:
            'Hiperpolarização neuronal por influxo de cloreto com supressão imediata de descargas epileptiformes corticais.',
        },
        {
          name: 'Interneurônios Inibitórios Espinhais',
          type: 'Circuitos reflexos motores medulares sacrais e lombares',
          action: 'Facilitação da transmissão gabaérgica inibitória',
          clinicalEffect:
            'Relaxamento do músculo esquelético e redução do tônus espástico do esfíncter uretral externo.',
        },
      ],
      detailedTargets: [
        {
          target: 'Receptor GABA-A (Alfa2/Alfa3)',
          action: 'Modulação alostérica positiva',
          clinicalSignificance:
            'Principal responsável pela cessação rápida de crises generalizadas e status epilepticus.',
        },
        {
          target: 'Receptor GABA-A (Alfa1)',
          action: 'Modulação alostérica positiva',
          clinicalSignificance:
            'Responsável pelo efeito sedativo, amnésia e ataxia motora transitória.',
        },
      ],
    },

    prescriptionType: {
      category: 'Notificação de Receita B VET (Lista B1 - Cor Azul)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 1.036/2026 (Substâncias Psicotrópicas)',
      retentionRequired: true,
      guidelines:
        'Prescrição ambulatorial privativa em talonário padronizado de Notificação de Receita B VET (Versão 2 vigente em 2026). A Notificação de Receita B fica retida obrigatoriamente pela farmácia ou drogaria no momento da dispensação, acompanhada da receita médica-veterinária que é devolvida carimbada ao tutor. Validade de 30 dias contados da emissão em todo o território nacional. Quantidade máxima permitida de até 5 ampolas injetáveis ou quantidade de comprimidos para até 60 dias de tratamento. Para administração em animais hospitalizados internados, a notificação externa não é exigida, utilizando-se a prescrição interna do prontuário hospitalar.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Tolerância Anticonvulsivante Rápida, Meia-Vida Curta e Resgate no Metronidazol',
        description:
          'No cão, o efeito anticonvulsivante é fugaz (cerca de 20 minutos) devido à rápida redistribuição corporal. Além disso, cães desenvolvem tolerância farmacodinâmica pronunciada aos efeitos anticonvulsivantes dentro de 1 a 2 semanas de uso repetido, tornando-o inadequado para monoterapia crônica. O fenobarbital concomitante acelera consideravelmente sua depuração. Por outro lado, o cão apresenta uma indicação clássica única: reversão acelerada da neurotoxicose por metronidazol.',
        clinicalImplications:
          'Utilizar diazepam exclusivamente como fármaco de resgate de emergência na crise ativa. Introduzir antiepilépticos de longa duração precocemente no status epilepticus.',
      },
      {
        species: 'cat',
        title: 'Necrose Hepática Fulminante por Via Oral e Restrição de CRI segundo ACVIM 2024',
        description:
          'Gatos possuem biotransformação peculiar com predomínio do metabólito temazepam, menor capacidade de glicuronidação e inibição da bomba BSEP, predispondo à falência hepática fulminante com necrose centrolobular após uso oral repetido (mortalidade descrita de até 90%). Por via intravenosa de emergência em dose única ou bolus imediato, o diazepam é seguro e eficaz. Todavia, em infusões contínuas (CRI), o Consenso ACVIM 2024 contraindica diazepam em gatos (recomendação D; preferir midazolam).',
        clinicalImplications:
          'Nunca prescrever diazepam oral de uso contínuo para felinos. Para status epilepticus felino, utilizar diazepam em bolus IV único ou midazolam em CRI.',
      },
    ],

    curiositiesAndHistory: [
      'Sintetizado pelo químico Leo Sternbach nos laboratórios da Hoffmann-La Roche em Nova Jersey e introduzido clinicamente em 1963 sob o nome comercial Valium, tornando-se um dos medicamentos mais prescritos da história.',
      'Sua elevadíssima lipofilicidade, que o torna tão espetacular para invadir o cérebro em 60 segundos, é exatamente a mesma razão pela qual sua formulação injetável exigiu solventes agressivos como o propilenoglicol, motivando a invenção posterior do midazolam solúvel em água.',
      'O clássico artigo de Sharon Center et al. (JAVMA 1996) descrevendo a morte de 10 entre 11 gatos por necrose hepática fulminante após diazepam oral transformou radicalmente a prática médica felina em todo o mundo.',
      'A aplicação fascinante do diazepam na reversão da toxicose por metronidazol foi elucidada em estudo clássico de Evans et al. (2003), demonstrando que a ação moduladora positiva no GABA-A reverte o bloqueio funcional das vias cerebelares em menos de 24 horas.',
      'O flumazenil, antagonista específico do sítio benzodiazepínico descoberto na década de 1980, reverte a sedação em 1 a 2 minutos, mas pode desencadear crises imediatas em pacientes tratados para status epilepticus ou dependentes crônicos.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Dose Padrão de Emergência: 0,5 mg/kg IV lento (ou PR em cães). Solução Injetável 5 mg/mL (1 mL = 5 mg; atalho prático: exatamente 0,1 mL por kg para 0,5 mg/kg e 0,2 mL por kg para 1,0 mg/kg).',
    headers: [
      'Peso Corporal (kg)',
      'Dose 0,5 mg/kg (mg)',
      'Volume Injetável 5 mg/mL (0,5 mg/kg)',
      'Dose 1,0 mg/kg (mg)',
      'Volume Injetável 5 mg/mL (1,0 mg/kg)',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '1,0 mg',
        col1: '0,2 mL',
        col2: '2,0 mg',
        col3: '0,4 mL',
      },
      {
        weight: '4 kg',
        totalDose: '2,0 mg',
        col1: '0,4 mL',
        col2: '4,0 mg',
        col3: '0,8 mL',
      },
      {
        weight: '5 kg',
        totalDose: '2,5 mg',
        col1: '0,5 mL',
        col2: '5,0 mg',
        col3: '1,0 mL',
      },
      {
        weight: '10 kg',
        totalDose: '5,0 mg',
        col1: '1,0 mL',
        col2: '10,0 mg',
        col3: '2,0 mL',
      },
      {
        weight: '15 kg',
        totalDose: '7,5 mg',
        col1: '1,5 mL',
        col2: '15,0 mg',
        col3: '3,0 mL',
      },
      {
        weight: '20 kg',
        totalDose: '10,0 mg',
        col1: '2,0 mL',
        col2: '20,0 mg',
        col3: '4,0 mL',
      },
      {
        weight: '30 kg',
        totalDose: '15,0 mg',
        col1: '3,0 mL',
        col2: '30,0 mg',
        col3: '6,0 mL',
      },
      {
        weight: '40 kg',
        totalDose: '20,0 mg',
        col1: '4,0 mL',
        col2: '40,0 mg',
        col3: '8,0 mL',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador Volumétrico para Diazepam Injetável 5 mg/mL (Uni-Diazepax / Ampolas)',
      concentration: '5 mg/mL (cada ampola de 2 mL contém exatamente 10 mg de diazepam)',
      dropletRatio: 'Volume por dose (mL) = [Peso do animal (kg) x Dose desejada (mg/kg)] / 5 mg/mL',
      practicalRule:
        'Para dose de 0,5 mg/kg: aspirar exatamente 0,1 mL para cada 1 kg de peso. Para dose de 1,0 mg/kg: aspirar 0,2 mL para cada 1 kg de peso corporal.',
      note: 'Nunca calibrar diazepam em gotas: formulações comerciais orais líquidas em gotas não possuem padronização farmacotécnica veterinária segura no Brasil e o veículo oleoso altera o gotejador. Utilizar exclusivamente seringas milimetradas graduadas (seringa de 1 mL para pequenos animais até 5 kg e de 3 a 5 mL para portes maiores).',
    },
  },

  samplePrescriptionText:
    'MODELO 1 — RESGATE DOMICILIAR RETAL EM CÃO COM CRISES EM SALVAS (CLUSTERS):\nNOTIFICAÇÃO DE RECEITA B VET (COR AZUL) + RECEITA ACOMPANHANTE EM DUAS VIAS\nUSO RETAL\n1. UNI-DIAZEPAX® (diazepam) 5 mg/mL — ampolas com 2 mL (10 mg)......... 3 ampolas\n2. Sondas uretrais flexíveis nº 6 ou 8 Fr e seringas de 3 mL estéreis......... 3 unidades de cada\nAdministrar por via retal 1,0 mL (dose de 5 mg para cão de 10 kg, equivalente a 0,5 mg/kg) ao início de uma crise convulsiva em salva que não cesse espontaneamente:\n- Aspirar o volume prescrito na seringa, acoplar à sonda lubrificada, introduzir de 3 a 5 cm no reto e injetar o líquido.\n- Manter a pelve do animal discretamente elevada por 2 minutos.\nORIENTAÇÕES AO TUTOR: Encaminhar o animal imediatamente ao serviço de emergência veterinária se a crise não cessar em até 5 minutos, se houver nova convulsão nas horas seguintes ou se o animal apresentar dificuldade respiratória persistente. Manter ampolas protegidas da luz solar e fora do alcance de crianças.\n\n--------------------------------------------------------------------------------\n\nMODELO 2 — CÃO COM NEUROTOXICOSE POR METRONIDAZOL (FASE ORAL):\nNOTIFICAÇÃO DE RECEITA B VET (COR AZUL) + RECEITA ACOMPANHANTE EM DUAS VIAS\nUSO ORAL\n1. COMPAZ® (diazepam) 5 mg — comprimidos sulcados......... 1 cartucho com 20 comprimidos\nAdministrar por via oral 1/2 comprimido (dose de 2,5 mg para cão de 6 kg, equivalente a ~0,42 mg/kg) a cada 8 horas (TID — às 07h, 15h e 23h), durante 3 dias consecutivos.\nORIENTAÇÕES AO TUTOR: Suspender imediatamente todo e qualquer uso de metronidazol. Fornecer o comprimido junto a um petisco úmido. Observar melhora gradativa da coordenação motora e do nistagmo nos olhos. Retorno para avaliação neurológica em 72 horas.\n\n--------------------------------------------------------------------------------\n\nMODELO 3 — PRESCRIÇÃO HOSPITALAR INTERNA (SALA DE EMERGÊNCIA / UTI):\nPRESCRIÇÃO INTERNA EM PRONTUÁRIO MÉDICO-HOSPITALAR\nUSO INTRAVENOSO\n1. Diazepam 5 mg/mL solução injetável — administrar 0,5 mg/kg IV lento ao longo de 1 a 2 minutos em acesso venoso periférico exclusivo, sob monitoramento eletrocardiográfico contínuo.\n2. Se a crise persistir após 2 minutos da injeção, repetir bolus único de 0,5 mg/kg IV.\n3. Se refratário após 2 doses, iniciar imediatamente Levetiracetam na dose de 60 mg/kg IV diluído em 15 minutos e comunicar o médico-veterinário intensivista de plantão.',

  genericBrandsNote:
    'No mercado farmacêutico brasileiro, o diazepam é comercializado sob marcas de referência humana como Valium (comprimidos de 5 mg e 10 mg da Produtos Roche) e Uni-Diazepax (solução injetável de 5 mg/mL em ampolas de 2 mL da União Química), além de similares e genéricos certificados pela ANVISA (Compaz da Cristália, Diazepam Teuto, Diazepam Eurofarma, Diazepam Hipolabor). Não há, no momento, produto comercial com registro veterinário exclusivo aprovado pelo MAPA para pequenos animais no Brasil, sendo o medicamento empregado amplamente na rotina clínica e hospitalar sob o regime de uso extrabula (off-label) regulamentado pela Portaria SVS/MS nº 344/1998 (Lista B1 - Psicotrópicos) sob Notificação de Receita B VET.',

  clinicalFoundationsData: [
    {
      id: 'foundations-status-acvim-2024',
      title: 'O Manejo Contemporâneo do Status Epilepticus e o Papel do Diazepam',
      narrative:
        'O status epilepticus constitui a mais dramática e frequente emergência neurológica na clínica de pequenos animais. O Consenso Internacional ACVIM 2024 sobre o manejo do status epilepticus e crises em salvas estabeleceu um novo paradigma de atendimento escalonado no tempo. O diazepam intravenoso (0,5 a 1,0 mg/kg IV) permanece como recomendação classe A em cães e classe B em gatos como fármaco de resgate de primeira linha para cessar imediatamente a crise paroxística. No entanto, o consenso alertou expressamente contra a repetição indefinida de bolus: se a crise persistir após 2 aplicações, deve-se avançar imediatamente para fármacos de segunda linha (levetiracetam ou fenobarbital), pois o status prolongado promove a internalização dos receptores GABA-A e hiperativação de receptores glutamatérgicos excitatórios NMDA. Em cães sem acesso venoso imediato, o ensaio clínico randomizado multicêntrico de Charalambous et al. (2017) demonstrou que o midazolam intranasal alcança 70% de sucesso frente a apenas 20% do diazepam retal (p = 0,0059), posicionando o midazolam intranasal como alternativa preferencial extravascular quando disponível. Além disso, no paciente felino crítico, o ACVIM 2024 desaconselha expressamente a infusão contínua (CRI) de diazepam (recomendação D; preferir midazolam CRI).',
      narrativeHighlights: [
        'Consenso ACVIM 2024: Diazepam IV classificado como recomendação classe A (cão) e B (gato) para primeira linha no status epilepticus.',
        'Regra de avanço precoce: máximo de 2 bolus de benzodiazepínicos antes de progredir para levetiracetam ou fenobarbital.',
        'Ensaio de Charalambous et al. (2017): Midazolam intranasal obteve 70% de sucesso contra 20% do diazepam retal no status canino.',
        'Gatos em emergência: diazepam IV em bolus é válido, mas CRI deve ser evitada segundo o ACVIM 2024 (preferir midazolam).',
      ],
      studies: [
        {
          citation:
            'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med 2024; 38(1): 19-40.',
          referenceId: 'ref-acvim-status-2024',
          sourceType: 'Consenso Internacional de Diretrizes Clínicas Especializadas',
          summaryText:
            'Diretrizes internacionais baseadas em evidências para o tratamento emergencial de status epilepticus e cluster seizures em cães e gatos. Define o diazepam IV como primeira linha padrão, estabelece o limite de reavaliação precoce em 2 minutos após o bolus, orienta o início imediato de drogas antiepilépticas de longa ação e desaconselha a infusão contínua de diazepam na espécie felina.',
          summaryHighlights: [
            'Classificação de recomendação classe A para diazepam IV inicial em cães e B em gatos.',
            'Enfatiza a necessidade de transição precoce para levetiracetam ou fenobarbital.',
            'Contraindica CRI de diazepam em felinos (recomendação D; preferir midazolam).',
          ],
          metrics: [
            'Recomendação Primária: Diazepam IV 0,5 a 1,0 mg/kg em bolus lento',
            'Intervalo de reavaliação: 2 minutos para segundo bolus se a crise persistir',
            'Classificação de Evidência: Recomendação A (cães) / B (gatos)',
          ],
          clinicalConclusion:
            'O diazepam IV permanece indispensável no controle imediato da crise na sala de emergência, devendo ser integrado a um plano sequencial com transição rápida para fármacos de manutenção.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/37921621/',
        },
        {
          citation:
            'Charalambous M, Volk HA, Van Ham L, Bhatti SFM. Intranasal Midazolam versus Rectal Diazepam for the Management of Canine Status Epilepticus: A Multicenter Randomized Parallel-Group Clinical Trial. J Vet Intern Med 2017; 31(4): 1149-1158.',
          referenceId: 'ref-charalambous-2017',
          sourceType: 'Ensaio Clínico Randomizado Paralelo Multicêntrico',
          summaryText:
            'Comparou a eficácia do midazolam intranasal (0,2 mg/kg) versus diazepam retal (0,5 mg/kg) no controle de status epilepticus canino em 35 cães na ausência de acesso intravenoso. O sucesso clínico (cessação da crise em até 5 minutos sem recorrência nos 10 minutos seguintes) foi de 70% (14/20) no grupo midazolam intranasal contra apenas 20% (3/15) no grupo diazepam retal (p = 0,0059).',
          summaryHighlights: [
            '35 cães em status epilepticus randomizados em ambiente hospitalar.',
            'Taxa de sucesso de 70% com midazolam IN contra 20% com diazepam PR (p = 0,0059).',
            'Início de ação mais rápido e maior facilidade técnica de administração com atomizador nasal.',
          ],
          metrics: [
            'Amostra: 35 cães em status epilepticus',
            'Desfecho Primário: Sucesso de 70% (Midazolam IN) vs 20% (Diazepam PR)',
            'Significância Estatística: p = 0,0059 a favor do midazolam intranasal',
          ],
          clinicalConclusion:
            'Quando o acesso intravenoso não estiver disponível de imediato, o midazolam intranasal apresenta eficácia clínica comprovadamente superior ao diazepam por via retal.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/28543780/',
        },
      ],
    },
    {
      id: 'foundations-toxicology-metro-hepatic',
      title: 'Peculiaridades Toxicológicas e Clínicas: Hepatotoxicidade Felina e Toxicose por Metronidazol',
      narrative:
        'O diazepam exibe duas interações fisiopatológicas de extrema relevância clínica na rotina veterinária. A primeira refere-se à toxicose por metronidazol em cães: em estudo clássico retrospectivo de Evans et al. (2003) envolvendo 21 cães intoxicados por metronidazol, a administração de diazepam (0,43 mg/kg IV seguido de VO q8h por 3 dias) reduziu o tempo médio para melhora clínica expressiva de 4,25 dias para apenas 13,4 horas, e o tempo para resolução completa de 11 dias para 38,8 horas. O mecanismo baseia-se na restauração funcional da neurotransmissão gabaérgica inibitória nos núcleos vestibulares e cerebelares antagonizados pelo metronidazol. A segunda peculiaridade constitui o alerta toxicológico mais severo da medicina felina: o estudo seminal de Center et al. (1996) descreveu 11 gatos submetidos à administração oral continuada de diazepam (1,25 a 2,0 mg/gato VO q12-24h) que desenvolveram necrose centrolobular hepática fulminante aguda com icterícia maciça, resultando na morte ou eutanásia de 10 dos 11 felinos tratados. Esse risco idiossincrático aboliu o emprego de diazepam oral continuado na espécie felina em âmbito mundial.',
      narrativeHighlights: [
        'Ensaio de Evans et al. (2003): Diazepam acelerou a cura da toxicose por metronidazol em cães de 11 dias para 38,8 horas.',
        'Estudo de Center et al. (1996): 10 de 11 gatos morreram após desenvolver insuficiência hepática fulminante por diazepam oral.',
        'O diazepam oral continuado em gatos foi formalmente proscrito da medicina felina moderna.',
        'A toxicose por metronidazol em cães responde de forma rápida e espetacular ao diazepam.',
      ],
      studies: [
        {
          citation:
            'Evans J, Levesque D, Knowles K, Longshore R, Plummer S. Diazepam as a treatment for metronidazole toxicosis in dogs: a retrospective study of 21 cases. J Vet Intern Med 2003; 17(3): 304-310.',
          referenceId: 'ref-evans-2003',
          sourceType: 'Estudo Clínico Controlado Retrospectivo',
          summaryText:
            'Avaliou 21 cães apresentando manifestações neurológicas vestibulares e cerebelares graves decorrentes de toxicose por metronidazol. Treze cães receberam diazepam (~0,43 mg/kg IV seguido de VO a cada 8 horas por 3 dias) e oito receberam apenas cuidados de suporte convencionais. Os cães tratados com diazepam alcançaram melhora clínica inicial em 13,4 horas (versus 4,25 dias no controle) e recuperação completa em 38,8 horas (versus 11 dias no controle).',
          summaryHighlights: [
            '21 cães intoxicados por metronidazol avaliados.',
            'Melhora inicial em 13,4 horas com diazepam vs 102 horas com suporte isolado.',
            'Resolução neurológica completa em 38,8 horas vs 264 horas (11 dias).',
          ],
          metrics: [
            'Amostra: 21 cães com neurotoxicose por metronidazol',
            'Dose: 0,43 mg/kg IV seguido de VO q8h por 3 dias',
            'Tempo até Cura: 38,8 h (Diazepam) vs 264 h (Suporte isolado)',
          ],
          clinicalConclusion:
            'O diazepam é o tratamento de escolha para abreviar e reverter a toxicose cerebelar e vestibular induzida por metronidazol em cães.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/12774970/',
        },
        {
          citation:
            'Center SA, Elston TH, Rowland PH, et al. Fulminant hepatic failure associated with oral administration of diazepam in 11 cats. J Am Vet Med Assoc 1996; 209(3): 618-625.',
          referenceId: 'ref-center-1996',
          sourceType: 'Série de Casos Clínicos Toxicológicos e Histopatológicos',
          summaryText:
            'Documentou 11 gatos domésticos que desenvolveram insuficiência hepática fulminante aguda após receberem diazepam por via oral (1,25 a 2,0 mg/gato a cada 12 a 24 horas por 5 a 11 dias) para tratamento de ansiedade ou estimulação de apetite. Os felinos apresentaram anorexia, letargia profunda, ataxia, icterícia severa e elevações extremas de transaminases hepáticas (ALT e AST). Dez dos 11 gatos vieram a óbito ou foram eutanasiados devido à necrose centrolobular hepática maciça.',
          summaryHighlights: [
            '11 gatos com falência hepática fulminante aguda após diazepam oral.',
            'Taxa de mortalidade de 90,9% (10 de 11 felinos morreram).',
            'Histopatologia confirmou necrose centrolobular grave e inflamação ductular.',
          ],
          metrics: [
            'Amostra: 11 gatos domésticos sob diazepam oral',
            'Dose: 1,25 a 2,0 mg/gato/dia por 5 a 11 dias',
            'Mortalidade: 10/11 gatos (90,9%)',
          ],
          clinicalConclusion:
            'A administração oral de diazepam em felinos associa-se a risco inaceitável de necrose hepática fulminante fatal, devendo ser estritamente proscrita da rotina médica felina.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/8755982/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Consenso ACVIM no Manejo do Status Epilepticus e Crises em Salvas em Cães e Gatos',
      authorsYear: 'Charalambous M, Muñana K, Patterson EE, et al. (2024)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Consenso Internacional de Especialistas Baseado em Evidências',
      sampleSize: 'Diretrizes mundiais para cães e gatos em emergência convulsiva',
      mainFindings:
        'Classifica o diazepam IV como recomendação primária de classe A em cães e B em gatos para a primeira linha da crise aguda, desaconselha repetição indefinida de bolus e contraindica a infusão contínua (CRI) de diazepam em gatos.',
      clinicalTakeaway:
        'Padrão-ouro que norteia o emprego do diazepam na sala de emergência e define a transição precoce para levetiracetam ou fenobarbital.',
      referenceId: 'ref-acvim-status-2024',
    },
    {
      title: 'Midazolam Intranasal versus Diazepam Retal no Manejo do Status Epilepticus Canino',
      authorsYear: 'Charalambous M, Volk HA, Van Ham L, Bhatti SFM (2017)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Ensaio clínico multicêntrico, prospectivo, randomizado e controlado',
      sampleSize: '35 cães em emergência convulsiva sem acesso intravenoso',
      mainFindings:
        'O midazolam intranasal alcançou 70% de eficácia na cessação da crise em até 5 minutos frente a apenas 20% do diazepam retal (p = 0,0059).',
      clinicalTakeaway:
        'Comprova a superioridade clínica do midazolam intranasal frente ao diazepam retal quando não houver acesso venoso periférico estabelecido.',
      referenceId: 'ref-charalambous-2017',
    },
    {
      title: 'Diazepam como Tratamento da Toxicose por Metronidazol em Cães',
      authorsYear: 'Evans J, Levesque D, Knowles K, Longshore R, Plummer S (2003)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Estudo clínico retrospectivo controlado',
      sampleSize: '21 cães intoxicados por metronidazol',
      mainFindings:
        'O diazepam reduziu o tempo para melhora clínica de 4,25 dias para 13,4 horas e o tempo para resolução completa de 11 dias para 38,8 horas.',
      clinicalTakeaway:
        'Tratamento padrão-ouro indispensável na rotina de emergência e neurologia para reverter rapidamente a neurotoxicose por metronidazol.',
      referenceId: 'ref-evans-2003',
    },
    {
      title: 'Falência Hepática Fulminante Associada à Administração Oral de Diazepam em 11 Gatos',
      authorsYear: 'Center SA, Elston TH, Rowland PH, et al. (1996)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Série de casos clínicos toxicológicos e anatomopatológicos',
      sampleSize: '11 gatos domésticos',
      mainFindings:
        'A administração oral de diazepam por 5 a 11 dias desencadeou falência hepática fulminante com necrose centrolobular maciça e 90,9% de óbito.',
      clinicalTakeaway:
        'Marco toxicológico que eliminou o uso de diazepam oral continuado na medicina felina mundial.',
      referenceId: 'ref-center-1996',
    },
    {
      title: 'Farmacocinética do Diazepam após Administração Intranasal em Gotas e Atomizada em Cães',
      authorsYear: 'Musulin SE, Mariani CL, Papich MG (2011)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics (JVPT)',
      studyDesign: 'Ensaio clínico prospectivo randomizado e cruzado (crossover)',
      sampleSize: '6 cães saudáveis',
      mainFindings:
        'O diazepam intranasal alcançou concentrações terapêuticas cerebrais (> 300 ng/mL) em menos de 5 minutos, com biodisponibilidade de 41% a 42%.',
      clinicalTakeaway:
        'Demonstra que a velocidade de absorção nasal compensa a menor biodisponibilidade em emergências agudas.',
      referenceId: 'ref-musulin-2011',
    },
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citation:
        'Plumb DC. Plumb’s Veterinary Drug Handbook, 10th edition. Wiley-Blackwell, 2023. Monografia Diazepam, pp. 379–382.',
    },
    {
      id: 'ref-bsava-10',
      citation:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition. BSAVA, 2020. Monografias Diazepam, pp. 119–121 e Flumazenil, p. 170.',
    },
    {
      id: 'ref-acvim-status-2024',
      citation:
        'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. Journal of Veterinary Internal Medicine 2024; 38(1): 19–40.',
      url: 'https://doi.org/10.1111/jvim.16987',
    },
    {
      id: 'ref-charalambous-2017',
      citation:
        'Charalambous M, Volk HA, Van Ham L, Bhatti SFM. Intranasal Midazolam versus Rectal Diazepam for the Management of Canine Status Epilepticus: A Multicenter Randomized Parallel-Group Clinical Trial. Journal of Veterinary Internal Medicine 2017; 31(4): 1149–1158.',
    },
    {
      id: 'ref-evans-2003',
      citation:
        'Evans J, Levesque D, Knowles K, Longshore R, Plummer S. Diazepam as a treatment for metronidazole toxicosis in dogs: a retrospective study of 21 cases. Journal of Veterinary Internal Medicine 2003; 17(3): 304–310.',
    },
    {
      id: 'ref-center-1996',
      citation:
        'Center SA, Elston TH, Rowland PH, et al. Fulminant hepatic failure associated with oral administration of diazepam in 11 cats. Journal of the American Veterinary Medical Association 1996; 209(3): 618–625.',
    },
    {
      id: 'ref-musulin-2011',
      citation:
        'Musulin SE, Mariani CL, Papich MG. Diazepam pharmacokinetics after nasal drop and atomized nasal administration in dogs. Journal of Veterinary Pharmacology and Therapeutics 2011; 34(1): 17–24.',
    },
    {
      id: 'ref-van-beusekom-2015',
      citation:
        'van Beusekom CD, Fink-Gremmels J, Schrickx JA. Feline hepatic biotransformation of diazepam: Differences between cats and dogs. Research in Veterinary Science 2015; 103: 119–125.',
    },
    {
      id: 'ref-cagnotti-2022',
      citation:
        'Cagnotti G, Ferrini S, Bellino C, et al. Constant rate infusion of diazepam or propofol for the management of canine cluster seizures or status epilepticus. Frontiers in Veterinary Science 2022; 9: 1005948.',
    },
  ],

  presentations: [
    {
      id: 'pres-uni-diazepax-inj-5',
      name: 'Uni-Diazepax® 5 mg/mL Solução Injetável',
      brand: 'União Química / Referência Hospitalar Extrabula',
      form: 'Solução injetável estéril em ampola de vidro',
      concentrationValue: 5.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Caixa com 5 ampolas de vidro âmbar com 2 mL (10 mg por ampola)',
      route: 'Intravenosa (IV lenta) ou Retal (PR)',
      scoringInfo: 'Solução estéril pura límpida; 1 mL contém 5 mg de diazepam (0,1 mL/kg na dose de 0,5 mg/kg)',
      channel: 'human_pharmacy',
      commercialType: 'Referência Hospitalar Extrabula (Lista B1)',
      packageDescription: 'Caixa com 5 ampolas de 2 mL (10 mg cada)',
    },
    {
      id: 'pres-valium-comp-5',
      name: 'Valium® 5 mg Comprimidos Sulcados',
      brand: 'Produtos Roche / Referência Humana Extrabula',
      form: 'Comprimido sulcado',
      concentrationValue: 5.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos sulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível em duas metades de 2,5 mg',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista B1)',
      packageDescription: 'Cartucho com 30 comprimidos de 5 mg',
    },
    {
      id: 'pres-valium-comp-10',
      name: 'Valium® 10 mg Comprimidos Sulcados',
      brand: 'Produtos Roche / Referência Humana Extrabula',
      form: 'Comprimido sulcado',
      concentrationValue: 10.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos sulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido com vinco central divisível em metades de 5 mg',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista B1)',
      packageDescription: 'Cartucho com 30 comprimidos de 10 mg',
    },
    {
      id: 'pres-diazepam-teuto-inj-5',
      name: 'Diazepam Teuto 5 mg/mL Solução Injetável',
      brand: 'Teuto Brasileiro / Genérico Hospitalar Extrabula',
      form: 'Solução injetável estéril em ampola de vidro',
      concentrationValue: 5.0,
      concentrationUnit: 'mg/mL',
      packInfo: 'Ampola de vidro âmbar com 2 mL contendo 10 mg de diazepam',
      route: 'Intravenosa (IV lenta) ou Retal (PR)',
      scoringInfo: '1 mL = 5 mg de diazepam (1 ampola de 2 mL = 10 mg)',
      channel: 'human_pharmacy',
      commercialType: 'Genérico Hospitalar Extrabula (Lista B1)',
      packageDescription: 'Ampola com 2 mL contendo 10 mg de diazepam',
    },
    {
      id: 'pres-compaz-comp-5',
      name: 'Compaz® 5 mg Comprimidos Sulcados',
      brand: 'Cristália Produtos Químicos Farmacêuticos',
      form: 'Comprimido sulcado',
      concentrationValue: 5.0,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 20 ou 30 comprimidos',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível em metades de 2,5 mg',
      channel: 'human_pharmacy',
      commercialType: 'Similar Humano Extrabula (Lista B1)',
      packageDescription: 'Cartucho com 20 comprimidos de 5 mg',
    },
  ],

  doses: [
    {
      id: 'dose-diaz-dog-status-iv',
      species: 'dog',
      indication: 'Status Epilepticus e Crises Convulsivas Agudas em Cães (Bolus IV de Resgate)',
      clinicalContext: 'Interrupção imediata de convulsões ativas na sala de emergência.',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única de emergência; pode repetir 1 vez após 2 min se a crise persistir',
      duration: 'Máximo de 2 bolus na fase aguda',
      notes:
        'Injetar lentamente ao longo de 1 a 2 minutos em acesso exclusivo. Se a crise não cessar após o segundo bolus, avançar imediatamente para segunda linha com levetiracetam (60 mg/kg IV) ou fenobarbital (16-20 mg/kg IV) conforme ACVIM 2024.',
      monitoring: 'Cessação dos abalos motores, permeabilidade de vias aéreas, ECG, SpO2 e pressão arterial média.',
      referenceIds: ['ref-acvim-status-2024', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional ACVIM 2024 (Recomendação Classe A em Cães)',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
    },
    {
      id: 'dose-diaz-dog-rectal',
      species: 'dog',
      indication: 'Crises em Salvas Caninas sem Acesso Venoso (Resgate Retal Domiciliar)',
      clinicalContext: 'Uso pré-hospitalar ou domiciliar de resgate para cães em crises em salvas.',
      doseMin: 0.5,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Retal (PR)',
      frequency: 'Dose única no episódio de crise',
      duration: 'Dose de resgate imediata',
      notes:
        'Instilar a solução injetável de 5 mg/mL com sonda uretral flexível lubrificada introduzida de 3 a 5 cm no reto. Se o cão estiver recebendo fenobarbital de manutenção cronicamente, usar a dose de 2,0 mg/kg PR.',
      monitoring: 'Cessação das contrações, manter pelve elevada por 2 minutos e transportar à emergência.',
      referenceIds: ['ref-acvim-status-2024', 'ref-charalambous-2017', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado e Consenso ACVIM 2024 (Recomendação Classe C)',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
    },
    {
      id: 'dose-diaz-dog-cri',
      species: 'dog',
      indication: 'Infusão Contínua (CRI) em Cães com Crises em Salvas Refratárias',
      clinicalContext: 'Manutenção de inibição em cães internados com status epilepticus recorrente após bolus inicial.',
      doseMin: 0.1,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (CRI)',
      frequency: 'Infusão contínua em taxa por hora (mg/kg/h)',
      duration: '12 a 24 horas sob vigilância em UTI',
      notes:
        'Titular a dose entre 0,1 e 2,0 mg/kg/h (frequentemente 0,5 mg/kg/h) em bomba de infusão. Utilizar frascos de vidro e linhas curtas sem PVC devido à adsorção plástica. Introduzir antiepilépticos de longa ação concomitantemente.',
      monitoring: 'Nível de sedação, ausência de crises no EEG ou monitoramento clínico, pressão arterial e oximetria.',
      referenceIds: ['ref-cagnotti-2022', 'ref-acvim-status-2024', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2b — Consenso ACVIM 2024 (Recomendação B em Cães) e Estudos Observacionais',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
    },
    {
      id: 'dose-diaz-dog-metro-iv',
      species: 'dog',
      indication: 'Neurotoxicose por Metronidazol em Cães (Dose de Ataque IV)',
      clinicalContext: 'Sinais vestibulares e cerebelares agudos decorrentes de intoxicação por metronidazol.',
      doseMin: 0.43,
      doseMax: 0.43,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única inicial',
      duration: 'Dose única de ataque hospitalar',
      notes:
        'Administrar 0,43 mg/kg IV lento na admissão hospitalar, suspendendo imediatamente o metronidazol. Seguir com o protocolo oral por 3 dias (Evans et al., 2003).',
      monitoring: 'Regressão de nistagmo, melhora do equilíbrio postural e propriocepção.',
      referenceIds: ['ref-evans-2003', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2a — Estudo Controlado com Redução Significativa do Tempo de Cura',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
      followUpPhases: [
        {
          doseValue: 0.43,
          frequency: 'A cada 8 horas (q8h)',
          duration: '3 dias consecutivos',
          route: 'Oral (VO)',
        },
      ],
    },
    {
      id: 'dose-diaz-dog-metro-po',
      species: 'dog',
      indication: 'Neurotoxicose por Metronidazol em Cães (Fase de Manutenção Oral)',
      clinicalContext: 'Continuidade do tratamento após a dose de ataque IV na neurotoxicose por metronidazol.',
      doseMin: 0.43,
      doseMax: 0.43,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: '3 dias consecutivos',
      notes:
        'Administrar 0,43 mg/kg VO a cada 8 horas utilizando comprimidos sulcados divididos. A cura completa é alcançada em média em 38,8 horas (Evans et al., 2003).',
      monitoring: 'Recuperação completa da deambulação e coordenação cerebelar.',
      referenceIds: ['ref-evans-2003', 'ref-plumb-10'],
      evidenceLevel: 'Nível 2a — Estudo Clínico Controlado',
      calculatorEnabled: true,
      presentationId: 'pres-valium-comp-5',
    },
    {
      id: 'dose-diaz-dog-preanest',
      species: 'both',
      indication: 'Medicação Pré-Anestésica e Coadjuvante de Indução Anestésica',
      clinicalContext: 'Promover relaxamento muscular com cetamina e reduzir a dose de agentes indutores em cães e gatos.',
      doseMin: 0.1,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única pré-operatória',
      duration: 'Procedimento anestésico agudo',
      notes:
        'Injetar lentamente por via IV logo antes ou associado à cetamina ou propofol. Evitar em animais jovens sadios desacompanhado de opioide pelo risco de desinibição excitatória.',
      monitoring: 'Profundidade anestésica, tônus mandibular, frequência respiratória e pressão arterial.',
      referenceIds: ['ref-bsava-10', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1a — Consensos de Anestesiologia Veterinária',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
    },
    {
      id: 'dose-diaz-cat-status-iv',
      species: 'cat',
      indication: 'Status Epilepticus e Crises Convulsivas Agudas em Felinos (Bolus IV de Resgate)',
      clinicalContext: 'Interrupção imediata de convulsões ativas em felinos admitidos na sala de emergência.',
      doseMin: 0.5,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única de emergência; reavaliar em 2 minutos',
      duration: 'Fase aguda hospitalar',
      notes:
        'Injetar lentamente por via venosa. Em gatos, o ACVIM 2024 contraindica CRI continuada de diazepam (preferir midazolam CRI). Nunca administrar diazepam oral continuado após a alta.',
      monitoring: 'Cessação imediata da crise, respiração, frequência cardíaca e ausência de hipotensão.',
      referenceIds: ['ref-acvim-status-2024', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1a — Consenso Internacional ACVIM 2024 (Recomendação Classe B em Gatos)',
      calculatorEnabled: true,
      presentationId: 'pres-uni-diazepax-inj-5',
    },
    {
      id: 'dose-diaz-dog-urethral',
      species: 'dog',
      indication: 'Hipertonia do Esfíncter Uretral Externo Estriado / Dissinergia em Cães',
      clinicalContext: 'Alívio do espasmo muscular pós-desobstrução uretral mecânica por urólitos em cães machos.',
      doseMin: 0.25,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 a 12 horas',
      duration: '3 a 5 dias durante a fase inflamatória pós-desobstrutiva',
      notes:
        'Administrar 0,25 a 1,0 mg/kg VO q8-12h (ou 2 a 10 mg por cão). Relaxa o músculo estriado periuretral inervado pelo nervo pudendo. Pode ser associado a prazosina.',
      monitoring: 'Esvaziamento vesical espontâneo sem disúria ou esforço miccional excessivo.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2b — Literatura Urológica Veterinária Especializada',
      calculatorEnabled: true,
      presentationId: 'pres-valium-comp-5',
    },
  ],

  relatedDiseaseSlugs: [
    'discinesia-paroxistica-caes-gatos',
  ],
};
