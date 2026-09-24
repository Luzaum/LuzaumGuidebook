import { MedicationRecord } from '../../types/medication';

export const levetiracetamMedicationRecord: MedicationRecord = {
  id: 'med-levetiracetam',
  slug: 'levetiracetam',
  title: 'Levetiracetam',
  activeIngredient: 'Levetiracetam ((2S)-2-(2-oxopirrolidin-1-il)butanamida)',
  isControlled: true,
  tradeNames: [
    'Keppra® 250 mg e 750 mg Comprimidos Revestidos (UCB Biopharma — Referência Humana Extrabula)',
    'Keppra® 100 mg/mL Solução Oral Frasco 300 mL com Seringa Dosadora (UCB Biopharma — Extrabula)',
    'Keppra XR® 500 mg e 750 mg Comprimidos de Liberação Prolongada (UCB Biopharma — Uso Canino Extrabula)',
    'Antara IV® 100 mg/mL Solução para Diluição e Infusão Frasco-ampola 5 mL (Injetável Hospitalar)',
    'Levetiracetam Genérico 250 mg e 750 mg Comprimidos (EMS, Eurofarma, Medley, Aché — Farmácia Humana)',
    'Levetiracetam Genérico 100 mg/mL Solução Oral Frasco 100 mL e 150 mL (Eurofarma, Cristália)',
    'Desitrend® 250 mg, 500 mg e 1000 mg Comprimidos / Grânulos Revestidos (Referência Europeia)',
  ],
  officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/levetiracetam/PNG',
  pharmacologicClass:
    'Anticonvulsivante / Antiepiléptico de 2ª geração da classe das pirrolidonas; modulador pré-sináptico da proteína de vesícula sináptica SV2A',
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Levetiracetam',
    'Keppra',
    'Anticonvulsivante',
    'Antiepiléptico',
    'SV2A',
    'Epilepsia Canina',
    'Epilepsia Felina',
    'Status Epilepticus',
    'Cluster Seizures',
    'FARS Felina',
    'Crises Mioclônicas',
    'Neurologia Veterinária',
    'ACVIM 2024',
    'IVETF',
    'Receita de Controle Especial (Lista C1)',
  ],

  mechanismOfAction:
    'O levetiracetam é um antiepiléptico de segunda geração derivado da pirrolidona e estruturalmente relacionado aos racetams, composto quimicamente pelo enantiômero S puro (2S)-2-(2-oxopirrolidin-1-il)butanamida. Seu mecanismo de ação primário difere fundamentalmente dos anticonvulsivantes convencionais (que bloqueiam canais de sódio voltagem-dependentes ou potenciam alostericamente o receptor GABA-A): atua pré-sinapticamente ligando-se de forma estereoespecífica e de alta afinidade à proteína de vesícula sináptica 2A (SV2A), uma glicoproteína transmembrana neuronal expressa nas vesículas sinápticas excitatórias e inibitórias do encéfalo. A ligação à SV2A modula a dinâmica vesicular pré-sináptica, regulando o priming, a velocidade de exocitose e a disponibilidade do pool de vesículas prontamente liberáveis (RRP). Com isso, o levetiracetam restringe a liberação excessiva e descontrolada de neurotransmissores excitatórios (principalmente o glutamato) durante descargas neuronais repetitivas e paroxísticas de alta frequência, impedindo a sincronização em rede (hiperssincronização) e a propagação da crise epileptógena através das vias corticais e tálamo-corticais. Crucialmente, em potenciais de ação basais e taxas fisiológicas de disparo, a transmissão sináptica permanece praticamente inalterada, explicando a ausência de depressão cortical profunda e o excelente perfil de tolerabilidade neurológica. Em nível secundário, ensaios eletrofisiológicos revelam que o levetiracetam inibe seletivamente correntes de cálcio de alta voltagem através de canais de Ca2+ pré-sinápticos do tipo N (com redução máxima de até aproximadamente 37%), diminui a mobilização de cálcio dos reservatórios intracelulares do retículo endoplasmático mediados por receptores de rianodina (RyR) e IP3R, e atenua a inibição alostérica exercida por moduladores negativos (como zinco e beta-carbolinas) sobre correntes gabaérgicas e glicinérgicas. O levetiracetam não depende do citocromo P450 hepático para sua depuração, sendo metabolizado por hidrólise plasmática não microssomal e eliminado primariamente intacto por filtração glomerular renal.',

  plainLanguageSummary:
    'O levetiracetam é um dos medicamentos anticonvulsivantes e antiepilépticos mais modernos e seguros utilizados na medicina veterinária de cães e gatos, pertencente à classe dos derivados da pirrolidona e caracterizado por um mecanismo de ação pré-sináptico inovador centrado na ligação à proteína de vesícula sináptica SV2A, o que reduz seletivamente a liberação excessiva e hiperssincronizada de neurotransmissores excitatórios durante as crises sem deprimir a atividade fisiológica basal do sistema nervoso central. Apresenta absorção oral rápida com pico plasmático em menos de duas horas, ligação proteica mínima, ausência de dependência do citocromo P450 hepático e eliminação predominantemente renal, o que lhe confere um perfil de segurança ímpar em animais hepatopatas ou em uso de múltiplas medicações. Embora a monoterapia canina crônica apresente eficácia inferior à do fenobarbital em cães recém-diagnosticados, o fármaco destaca-se com extraordinário valor terapêutico como adjuvante em casos refratários, em protocolos de emergência para controle de crises em salvas e status epilepticus, e de maneira especialmente notável no tratamento das crises mioclônicas audiogênicas felinas (FARS), devendo-se atentar estritamente para a meia-vida curta que exige intervalos de oito horas para a formulação de liberação imediata e para a interação com o fenobarbital, capaz de acelerar expressivamente sua depuração plasmática.',

  pillars: [
    {
      title: 'Modulação Pré-Sináptica da Proteína Vesicular SV2A',
      icon: 'Brain',
      desc: 'Liga-se seletivamente à glicoproteína SV2A das vesículas sinápticas, reduzindo a exocitose massiva e hiperssincronizada de glutamato durante as descargas epileptiformes patológicas sem deprimir a transmissão fisiológica basal.',
    },
    {
      title: 'Ação Rápida e Previsível com Pico Plasmático em Menos de 2 Horas',
      icon: 'Zap',
      desc: 'Absorção gastrointestinal praticamente completa e rápida difusão para o sistema nervoso central, permitindo início de ação acelerado e estado de equilíbrio em 48 horas, pilar indispensável para pulse therapy.',
    },
    {
      title: 'Mínima Sobrecarga Hepática e Independência do Citocromo P450',
      icon: 'ShieldCheck',
      desc: 'Metabolizado por hidrólise enzimática não-microssomal da acetamida no sangue e tecidos, sem sobrecarregar o fígado e sem depender de vias de glicuronidação, conferindo extrema segurança em pacientes hepatopatas.',
    },
    {
      title: 'Depuração e Eliminação Renal Previsível com Baixa Ligação Proteica',
      icon: 'Activity',
      desc: 'Aproximadamente 90% da dose é eliminada inalterada pelos rins com menos de 10% de ligação a proteínas plasmáticas, proporcionando farmacocinética limpa, embora exigindo calibração posológica em nefropatias graves.',
    },
  ],

  quickSummaryHighlights: [
    'Antiepiléptico de 2ª geração com mecanismo pré-sináptico inovador na proteína SV2A, controlando a hiperssincronização neuronal sem sedação severa.',
    'Meia-vida ultracurta (2 a 4 horas em cães, ~3 horas em gatos) exigindo rigorosamente posologia a cada 8 horas (q8h) para formulações de liberação imediata.',
    'Interação farmacocinética marcante: o fenobarbital concomitante praticamente dobra o clearance oral de levetiracetam em cães, reduzindo sua meia-vida para ~1,7 horas.',
    'Papel de destaque padrão-ouro: pulse therapy para crises em salvas (cluster seizures), adjuvante na epilepsia refratária e controle de FARS felina (resposta favorável no ensaio disponível, sem garantia individual).',
    'Substância sob controle especial no Brasil (Portaria SVS/MS 344/1998 — Lista C1; Receita de Controle Especial em 2 vias com retenção da 1ª via e validade de 30 dias).',
  ],

  clinicalWarningItems: [
    {
      label: 'Frequência Rígida de Liberação Imediata (IR) vs Liberação Prolongada (XR)',
      text: 'Comprimidos convencionais e solução oral possuem meia-vida curta (2 a 4 horas no cão e cerca de 3 horas no gato) e devem ser administrados estritamente a cada 8 horas (q8h / TID). A administração q12h com formulação imediata acarreta longos períodos de vale subterapêutico e recidiva convulsiva. Formulações XR de liberação prolongada permitem uso q12h em cães, porém nunca devem ser partidas, trituradas ou mastigadas sob risco de perda do perfil de liberação controlada.',
    },
    {
      label: 'Interação Farmacocinética Relevante com Fenobarbital em Cães',
      text: 'O uso crônico de fenobarbital acelera marcantemente o clearance de levetiracetam no cão (de ~125 para ~253 mL/kg/h) e reduz sua meia-vida de 3,4 h para 1,7 h. A recidiva de crises em cães recebendo a associação fenobarbital + levetiracetam reflete com frequência subexposição farmacocinética; nesses pacientes, doses mais elevadas (30 a 40 mg/kg q8h) ou rigoroso cumprimento do intervalo de 8 horas são mandatórios.',
    },
    {
      label: 'Eliminação Renal Mandatória e Manejo em Nefropatas (DRC)',
      text: 'Cerca de 90% do fármaco é eliminado pelos rins. Em pacientes com DRC estável (IRIS estágios 2 a 4), a depuração está reduzida, prolongando a meia-vida e elevando a exposição sistêmica. Na emergência por status epilepticus, a dose de ataque (30 a 60 mg/kg IV) não deve ser reduzida; contudo, a dose de manutenção deve ser reavaliada e espaçada (ex.: q12h) conforme a taxa de filtração glomerular para evitar sedação profunda e ataxia.',
    },
    {
      label: 'Eficácia em Monoterapia Canina vs Destaque em Emergência e FARS Felina',
      text: 'Em cães com epilepsia idiopática recém-diagnosticada, a monoterapia com levetiracetam é significativamente inferior ao fenobarbital, com alta taxa de abandono por falha terapêutica (Fredsø et al., 2016). Seu valor clínico reside como terapia adjuvante em casos refratários, em emergências para cessar clusters/status epilepticus e, com máxima evidência científica, nas crises mioclônicas audiogênicas felinas (FARS), onde supera amplamente o fenobarbital.',
    },
  ],

  indications: [
    'Terapia adjuvante na epilepsia idiopática canina e felina farmacorresistente refratária a fármacos de primeira linha (fenobarbital e brometo).',
    'Tratamento de emergência no status epilepticus e em crises convulsivas repetitivas agudas (cluster seizures) por via intravenosa lenta, retal ou pulse therapy oral.',
    'Tratamento padrão-ouro de crises mioclônicas audiogênicas felinas (FARS - Feline Audiogenic Reflex Seizures).',
    'Terapia anticonvulsivante alternativa em monoterapia para cães e gatos com hepatopatias prévias graves, disfunção hepática induzida por fenobarbital ou hipoalbuminemia.',
    'Profilaxia de crises epileptiformes em pacientes com lesões intracranianas estruturais (tumores encefálicos, meningoencefalites, traumatismo cranioencefálico).',
  ],

  quickIndications: [
    {
      condition: 'Epilepsia Canina Refratária (Terapia Adjuvante ao Fenobarbital / Brometo)',
      species: 'dog',
      doseSummary: '20 a 30 mg/kg VO a cada 8 horas (podendo escalar até 40 a 60 mg/kg q8h em refratários)',
      route: 'Oral (VO)',
      duration: 'Uso contínuo crônico sob acompanhamento neurológico',
      clinicalContext: 'Cães com controle inadequado de crises ou toxicidade por fenobarbital; manter intervalo estrito de 8 horas.',
    },
    {
      condition: 'Status Epilepticus e Crises Convulsivas Agudas em Salvas (Carga de Emergência)',
      species: 'both',
      doseSummary: '30 a 60 mg/kg IV lento diluído em 5 a 15 minutos (taxa recomendada de 2 a 4 mg/kg/min)',
      route: 'Intravenosa (IV lenta)',
      duration: 'Dose única de ataque hospitalar na sala de emergência; seguir com manutenção parenteral ou oral',
      clinicalContext: 'Segunda linha após controle inicial com benzodiazepínico (ACVIM 2024); cães e gatos em crises repetitivas.',
    },
    {
      condition: 'Pulse Therapy Domiciliar para Cluster Seizures Caninos',
      species: 'dog',
      doseSummary: '30 mg/kg VO a cada 8 horas (ou q6h em casos selecionados) iniciado logo após a 1ª crise',
      route: 'Oral (VO)',
      duration: '48 horas após a última crise do cluster, seguido de redução gradual para a dose basal',
      clinicalContext: 'Protocolo de resgate orientado pelo neurologista para abortar novos episódios convulsivos no mesmo dia.',
    },
    {
      condition: 'Crises Mioclônicas Audiogênicas Felinas (FARS - Feline Audiogenic Reflex Seizures)',
      species: 'cat',
      doseSummary: '20 a 25 mg/kg VO a cada 8 horas (totalizando 60 a 75 mg/kg/dia)',
      route: 'Oral (VO com solução oral 100 mg/mL)',
      duration: 'Uso contínuo de longo prazo',
      clinicalContext: 'Gatos idosos com sobressaltos e mioclonias desencadeados por sons agudos de alta frequência (papel alumínio, chaves).',
    },
    {
      condition: 'Emergência Convulsiva por Via Retal em Cães sem Acesso Venoso',
      species: 'dog',
      doseSummary: '40 mg/kg por via retal (PR) utilizando a solução oral ou injetável pura com sonda flexível',
      route: 'Retal (PR)',
      duration: 'Dose de resgate imediata até obtenção de acesso venoso pérvio',
      clinicalContext: 'Pacientes em crise contínua domiciliar ou ambulatorial sem acesso intravenoso estabelecido (Cagnotti et al., 2019).',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-lev-dog-adj-refractory',
      indication: 'Terapia Adjuvante na Epilepsia Idiopática Farmacorresistente em Cães',
      clinicalContext:
        'Cães epilépticos que continuam apresentando frequência inaceitável de crises convulsivas ou episódios em salvas apesar de concentrações séricas terapêuticas de fenobarbital e/ou brometo de potássio, ou naqueles que desenvolveram sinais intoleráveis de sedação, ataxia ou hepatotoxicidade.',
      species: 'dog',
      dose: 'Inicial: 20 mg/kg VO a cada 8 horas. Se o controle permanecer inadequado após 2 a 4 semanas e houver boa tolerância clínica, titular para 30 mg/kg VO q8h, podendo atingir até 40 a 60 mg/kg VO q8h em casos selecionados.',
      route: 'Oral (VO com alimento ou diretamente na boca)',
      frequency: 'A cada 8 horas (q8h / TID) para formulações de liberação imediata; a cada 12 horas (q12h / BID) para formulações XR',
      duration: 'Tratamento continuado de longo prazo sob vigilância neurológica periódica.',
      mechanismOfAction:
        'Aumenta o limiar convulsivo ao ligar-se à proteína pré-sináptica SV2A nas sinapses glutamatérgicas, atenuando a propagação de descargas síncronas paroxísticas através de um mecanismo independente dos canais de sódio e dos receptores GABA-A.',
      clinicalRationale:
        'Ensaio clínico duplo-cego cruzado de Muñana et al. (2012) e diretrizes do IVETF recomendam o levetiracetam como adjuvante de segunda linha. Em animais recebendo fenobarbital concomitante, o clearance é acelerado e a dose frequentemente demanda titulação para a faixa superior (30 mg/kg TID).',
      monitoring:
        'Diário de crises pelo tutor (data, horário, duração e intensidade); monitoramento de sedação e ataxia nas primeiras 2 semanas; avaliação periódica de ureia, creatinina e urinálise semestrais.',
      referenceIds: ['ref-munana-2012', 'ref-moore-2011', 'ref-plumb-10', 'ref-bsava-10', 'ref-ivetf-2015'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego Cruzado e Consenso IVETF',
    },
    {
      id: 'ind-lev-status-cluster-emergency',
      indication: 'Manejo de Emergência em Status Epilepticus e Crises Repetitivas em Salvas (Cluster Seizures)',
      clinicalContext:
        'Pacientes caninos e felinos admitidos na sala de emergência em convulsão contínua com duração superior a 5 minutos (status epilepticus) ou apresentando duas ou mais crises no mesmo intervalo de 24 horas (clusters), imediatamente após a primeira linha com benzodiazepínico.',
      species: 'both',
      dose: 'Dose de ataque intravenosa: 30 a 60 mg/kg IV lento administrado ao longo de 5 a 15 minutos (velocidade recomendada de 2 a 4 mg/kg/min; diluir em SF 0,9% ou SG 5% na proporção 1:1). Em cães refratários, pode ser seguido por infusão contínua (CRI) de 8 mg/kg/h.',
      route: 'Intravenosa (IV lenta ou infusão diluída)',
      frequency: 'Dose única de ataque hospitalar; se crises persistirem, manutenção parenteral q8h ou CRI.',
      duration: 'Fase aguda de emergência hospitalar nas primeiras 24 a 48 horas.',
      mechanismOfAction:
        'Bloqueia a amplificação paroxística nas redes tálamo-corticais e interrompe o recrutamento neuronal maciço no foco epileptogênico através da ligação estereosseletiva à SV2A e inibição da entrada pré-sináptica de cálcio tipo N.',
      clinicalRationale:
        'O Consenso ACVIM (2024) sobre Status Epilepticus posiciona o levetiracetam como fármaco de segunda linha prioritário. O ensaio clínico de Hardy et al. (2012) demonstrou 56% de controle sem recidiva frente a 10% no grupo controle em cães em crises repetitivas.',
      monitoring:
        'Eletrocardiograma contínuo, oximetria de pulso, pressão arterial média (PAM), frequência respiratória e temperatura corporal; verificar permeabilidade de vias aéreas e gasometria.',
      referenceIds: ['ref-hardy-2012', 'ref-acvim-status-2024', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego e Consenso ACVIM 2024',
    },
    {
      id: 'ind-lev-pulse-cluster-canine',
      indication: 'Protocolo de Pulse Therapy Domiciliar para Crises em Salvas (Clusters Caninos)',
      clinicalContext:
        'Cães com histórico confirmado de crises em salvas que apresentam uma crise isolada no ambiente doméstico, com o objetivo de abortar precocemente a deflagração de novas convulsões nas 24 a 48 horas seguintes.',
      species: 'dog',
      dose: '30 mg/kg VO a cada 8 horas (ou q6h em casos graves selecionados), administrando a primeira dose imediatamente após o restabelecimento do reflexo de deglutição pós-ictal, mantendo por 48 horas após a última crise do cluster.',
      route: 'Oral (VO com solução oral ou comprimidos)',
      frequency: 'A cada 8 horas (q8h) durante o episódio de cluster',
      duration: '48 horas após a última crise, retornando em seguida à posologia basal de manutenção crônica.',
      mechanismOfAction:
        'Eleva agudamente a saturação dos sítios de ligação da SV2A no sistema nervoso central, impedindo o fenômeno de facilitação pós-tetânica e o recrutamento de novos circuitos reverberantes excitatórios.',
      clinicalRationale:
        'Protocolo de resgate oral amplamente validado em diretrizes internacionais (Plumb e BSAVA) e recomendado por neurologistas veterinários para reduzir significativamente a necessidade de hospitalizações de urgência.',
      monitoring:
        'Observar nível de consciência, grau de sedação, ataxia transitória e orientar o tutor a nunca forçar a medicação líquida pela boca se o animal estiver em período pós-ictal com torpor ou sem reflexo de deglutição.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-ivetf-2015'],
      evidenceLevel: 'Nível 2a — Diretrizes de Especialistas e Estudos Observacionais de Coorte Prospectiva',
    },
    {
      id: 'ind-lev-cat-fars',
      indication: 'Crises Mioclônicas Audiogênicas Felinas (FARS - Feline Audiogenic Reflex Seizures)',
      clinicalContext:
        'Gatos idosos (geralmente com mais de 10 a 14 anos) que apresentam abalos mioclônicos súbitos, mioclonias cervicais, episódios atônicos ou crises tônico-clônicas generalizadas precipitadas por ruídos acústicos específicos de alta frequência (amassar papel alumínio, estalar de língua, digitação em teclado, tilintar de talheres ou moedas).',
      species: 'cat',
      dose: '20 a 25 mg/kg VO a cada 8 horas (totalizando 60 a 75 mg/kg/dia), utilizando preferencialmente a solução oral de 100 mg/mL com seringa milimetrada graduada.',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: 'Tratamento continuado por tempo indeterminado com monitoramento geriátrico.',
      mechanismOfAction:
        'Inibe a hiperexcitabilidade das vias auditivas centrais no tronco encefálico e núcleos cocleares, bloqueando a transmissão hiperssíncrona que desencadeia as mioclonias reflexas auditivas.',
      clinicalRationale:
        'No ensaio clínico randomizado controlado de Lowrie et al. (2017) com 57 gatos, o levetiracetam proporcionou redução de pelo menos 50% nos dias com crises em 100% dos felinos tratados (contra apenas 3% com fenobarbital) e aboliu completamente as mioclonias em 50% dos gatos.',
      monitoring:
        'Avaliação clínica neurológica, contagem dos episódios de sobressalto pelo tutor, monitoramento de apetite e creatinina sérica semestral.',
      referenceIds: ['ref-lowrie-2017', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Aberto com Superioridade Estatística Marcante (p < 0,001)',
    },
    {
      id: 'ind-lev-rectal-canine-emergency',
      indication: 'Administração Retal de Emergência para Interrupção de Crises em Cães',
      clinicalContext:
        'Cães apresentando crises em salvas agudas no ambiente ambulatorial ou pré-hospitalar sem acesso venoso estabelecido e nos quais a via oral é perigosa pelo risco de broncoaspiração.',
      species: 'dog',
      dose: '40 mg/kg por via retal (PR) em dose única de resgate, utilizando a solução oral ou a solução injetável não diluída através de sonda uretral flexível ou cateter lubrificado introduzido cerca de 3 a 5 cm no reto.',
      route: 'Retal (PR)',
      frequency: 'Dose única de emergência no evento convulsivo',
      duration: 'Até obtenção de acesso intravenoso seguro.',
      mechanismOfAction:
        'Absorção pela vascularização hemorroidária e capilares da mucosa retal com rápida distribuição sistêmica e transposição da barreira hematoencefálica.',
      clinicalRationale:
        'Ensaio prospectivo de Cagnotti et al. (2019) com 57 cães comprovou resposta de 94% no grupo levetiracetam retal versus 48% no protocolo convencional para controle de crises em salvas (p < 0,001).',
      monitoring:
        'Tempo até a cessação dos abalos motores; manter o animal em decúbito lateral com pelve discretamente elevada por 2 minutos; obter acesso venoso assim que os movimentos cessarem.',
      referenceIds: ['ref-cagnotti-2019', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Prospectivo Controlado',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Em cães e gatos, o levetiracetam de liberação imediata (IR) é rápida e quase completamente absorvido pelo trato gastrointestinal, com biodisponibilidade oral próxima de 100%. Em cães, a concentração plasmática máxima (Cmax de ~30 a 35 µg/mL após 20 mg/kg) é atingida precocemente entre 0,6 e 2,2 horas (mediana de ~1,0 a 1,5 h). Em gatos, a biodisponibilidade é de aproximadamente 100% e o Tmax oral ocorre tipicamente em menos de 2 horas. A presença de alimento na formulação convencional pode atrasar discretamente o Tmax, mas não altera a extensão total da absorção (AUC). A formulação de liberação prolongada (XR) administrada a cães na dose de 30 mg/kg apresenta Tmax de aproximadamente 3,4 horas em jejum e cerca de 6,6 horas quando fornecida com alimento, permitindo intervalos de 12 horas.',
    distribution:
      'Apresenta volume de distribuição aparente (Vd) moderado de 0,5 a 0,7 L/kg em cães e valores semelhantes em gatos, compatível com a distribuição livre pela água corporal total. A ligação às proteínas plasmáticas é desprezível (inferior a 10%), o que reduz drasticamente o potencial de interações por deslocamento de ligação proteica com fármacos ácidos ou básicos. O levetiracetam atravessa facilmente a barreira hematoencefálica, com concentrações liquóricas no líquor cefalorraquidiano que acompanham de perto as concentrações séricas livres, assegurando rápida exposição dos circuitos epileptogênicos centrais.',
    metabolism:
      'Ao contrário dos anticonvulsivantes tradicionais (como fenobarbital), o levetiracetam não depende do sistema microssomal hepático do citocromo P450 (CYP450) para sua depuração e não sofre glucuronidação relevante. Cerca de 70 a 90% da dose administrada não sofre metabolização prévia. A fração restante sofre hidrólise enzimática não microssomal do grupo acetamida nos eritrócitos e tecidos sistêmicos por esterases plasmáticas solúveis, gerando o ácido carboxílico inativo (metabólito ucb L057), sem atividade anticonvulsivante intrínseca.',
    elimination:
      'A excreção é predominantemente renal (cerca de 85 a 90% da dose eliminada inalterada na urina através de filtração glomerular). A meia-vida de eliminação plasmática terminal (t1/2) é marcadamente curta em ambas as espécies: cerca de 2,2 a 4,4 horas em cães saudáveis (média de ~3,5 h) e aproximadamente 3,0 horas em gatos domésticos. O clearance corporal total em cães é de aproximadamente 90 a 125 mL/kg/h. O estado de equilíbrio (steady-state) é alcançado com rapidez em aproximadamente 24 a 48 horas. A meia-vida curta da formulação de liberação imediata justifica plenamente a necessidade estrita de administração a cada 8 horas (q8h / TID).',
    cnsPenetration:
      'Excelente distribuição e rápida penetração no sistema nervoso central através de difusão transcapilar facilitada pela ausência de ligação proteica plasmática significativa, atingindo equilíbrio dinâmico entre o compartimento sérico e o líquor em poucos minutos.',
    plasmaBinding:
      'Mínima a insignificante (inferior a 10%). Hipoalbuminemia não altera de forma relevante as frações livres ativas do fármaco nem exige ajustes empíricos por ligação proteica.',
    halfLife:
      'Aproximadamente 2,2 a 4,4 horas em cães recebendo levetiracetam isoladamente; encurta para cerca de 1,7 horas em cães sob coadministração crônica de fenobarbital. Em gatos domésticos, a meia-vida plasmática média é de aproximadamente 3,0 horas.',
  },

  administration: [
    'Via Oral (VO) - Liberação Imediata (IR): administrar diretamente na boca ou homogeneizado com pequena porção de alimento palatável a cada 8 horas.',
    'Via Oral (VO) - Liberação Prolongada (XR): administrar os comprimidos inteiros a cada 12 horas; nunca partir, esmagar ou triturar os comprimidos XR.',
    'Via Intravenosa (IV) - Emergência: aplicar lentamente por infusão ao longo de 5 a 15 minutos; diluir a dose em SF 0,9% ou SG 5% (proporção 1:1) e evitar bolus rápido sem diluição.',
    'Via Retal (PR) - Resgate: instilar a dose de 40 mg/kg através de sonda uretral flexível lubrificada introduzida de 3 a 5 cm no reto do cão quando o acesso venoso não estiver disponível.',
    'Via Subcutânea (SC) ou Intramuscular (IM): absorção adequada comprovada farmacocineticamente em cães, utilizável em situações ambulatoriais excepcionais.',
    'Adesão aos horários: orientar rigorosamente os tutores a respeitarem a janela de 8 horas para formulações convencionais, evitando atrasos que deflagrem crises de escape.',
  ],

  contraindications: [
    'Hipersensibilidade conhecida prévia ao levetiracetam ou a outros derivados da pirrolidona.',
    'Comprimidos de liberação prolongada (XR) fracionados, partidos ou triturados (perda das propriedades cinéticas e risco de sobredose imediata com vale precoce).',
    'Interrupção abrupta da terapia crônica continuada (risco crítico de crises convulsivas de rebote / status epilepticus por retirada).',
    'Fêmeas gestantes ou lactantes (avaliação estrita de risco-benefício; excreção demonstrada no leite materno).',
    'Uso isolado em monoterapia de primeira linha na epilepsia idiopática canina recém-diagnosticada quando fenobarbital for plenamente viável.',
  ],

  cautions: [
    'Insuficiência renal crônica e nefropatias moderadas a graves (estágios IRIS 2 a 4): redução da TFG prolonga a depuração do fármaco; requer redução da dose diária ou espaçamento para q12h.',
    'Coadministração com fenobarbital em cães: a indução enzimática acelera o clearance e encurta a meia-vida do levetiracetam; avaliar aumento da dose para 30 a 40 mg/kg q8h se houver falha de controle.',
    'Efeito Lua-de-Mel (Honeymoon Effect): perda parcial ou progressiva da eficácia clínica após 4 a 8 meses de uso continuado decorrente de tolerância farmacodinâmica funcional.',
    'Pacientes recebendo múltiplos sedativos ou moduladores do SNC (gabapentina, pregabalina, benzodiazepínicos): somação de efeitos sedativos e ataxia.',
    'Administração por via oral durante o período pós-ictal: risco de aspiração broncopulmonar se os reflexos protetores de tosse e deglutição não estiverem plenamente recuperados.',
  ],

  adverseEffects: [
    'Sedação, sonolência e letargia transitória (efeito comum, frequentemente autolimitado nos primeiros 7 a 14 dias).',
    'Ataxia, incoordenação motora e fraqueza de membros pélvicos (comum nas primeiras semanas ou com doses acima de 40 mg/kg).',
    'Hiporexia, recusa alimentar transitória e náusea.',
    'Vômitos esporádicos e amolecimento fecal (incomum).',
    'Hipersalivação em gatos (incomum, transitória).',
    'Alterações comportamentais paradoxais, inquietação, hiperatividade ou agressividade (raro, descrito em menos de 2 a 5% dos cães e gatos).',
  ],

  interactions: [
    'Fenobarbital: induz marcantemente o clearance de levetiracetam em cães, quase duplicando sua depuração e diminuindo a meia-vida para ~1,7 horas; requer monitoramento e possíveis ajustes de dose.',
    'Benzodiazepínicos (Diazepam, Midazolam): somação farmacodinâmica depressora sobre o SNC, aumentando a sonolência e ataxia no período peri-crise.',
    'Gabapentina e Pregabalina: potencialização de efeitos sedativos e incoordenação motora; ajuste de horário pode ser necessário.',
    'Opioides e Analgésicos Centrais: intensificação da sedação e depressão respiratória se associados a altas doses intravenosas de levetiracetam.',
    'Carbamazepina: relatos de aumento da toxicidade no SNC com ataxia exacerbada e tontura motora.',
    'Metotrexato: relatos de redução da depuração renal de metotrexato com aumento do risco de mielotoxicidade em humanos.',
  ],

  attentionSubtitle:
    'Rigor na frequência posológica de 8 horas, manejo renal em nefropatas, interação com fenobarbital e tolerância farmacodinâmica.',

  attentionData: {
    precautions: [
      {
        condition: 'Doença Renal Crônica (DRC) e Insuficiência Renal Aguda',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O levetiracetam é eliminado em cerca de 90% por filtração glomerular renal sob a forma de molécula intacta. A redução na taxa de filtração glomerular (TFG) diminui a depuração corporal total do fármaco, prolongando sua meia-vida plasmática e promovendo acúmulo sistêmico, o que intensifica a sedação, ataxia e hiporexia.',
        clinicalAction:
          'Não reduzir a dose inicial de carga na emergência. Na manutenção crônica de animais em estágios IRIS 3 e 4, reduzir a dose total diária em cerca de 30% a 50% ou estender o intervalo posológico para q12h a q24h, monitorando creatinina, SDMA e escore neurológico.',
      },
      {
        condition: 'Coadministração com Fenobarbital em Cães',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O uso continuado de fenobarbital estimula sistemas enzimáticos e mecanismos de depuração hepática/extra-hepática que quase duplicam o clearance oral de levetiracetam (de ~125 para ~253 mL/kg/h) e reduzem a meia-vida plasmática de 3,4 para 1,7 horas em cães, gerando concentrações de vale subterapêuticas com q8h.',
        clinicalAction:
          'Em cães recebendo fenobarbital que apresentarem escape convulsivo, não assumir ineficácia intrínseca do levetiracetam: titular a dose para 30 a 40 mg/kg q8h e assegurar que o tutor cumpra estritamente o intervalo de 8 horas sem atrasos.',
      },
      {
        condition: 'Interrupção Abrupta da Terapia Crônica Continuada',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A suspensão repentina do fármaco após semanas ou meses de uso remove de forma abrupta a modulação inibitória sobre a proteína SV2A, desencadeando hiperexcitabilidade de rebote nas redes neurais e precipitando status epilepticus ou crises em salvas potencialmente fatais.',
        clinicalAction:
          'Nunca interromper bruscamente. Realizar desmame gradual com reduções escalonadas de 20% a 25% da dose a cada 5 a 7 dias sob rigoroso monitoramento clínico.',
      },
      {
        condition: 'Manipulação ou Fracionamento de Comprimidos XR (Liberação Prolongada)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A tecnologia XR baseia-se em uma matriz polimérica hidrofílica que modula a difusão gradual do princípio ativo ao longo do trato digestivo. Partir, cortar ou triturar o comprimido rompe essa matriz, liberando toda a carga farmacológica de forma súbita (dose-dumping) seguida por queda precoce e ineficácia terapêutica.',
        clinicalAction:
          'Administrar os comprimidos XR exclusivamente inteiros. Para animais pequenos onde a dose requer frações, prescrever formulações de liberação imediata (solução oral de 100 mg/mL ou comprimidos convencionais de 250 mg) a cada 8 horas.',
      },
      {
        condition: 'Efeito Lua-de-Mel (Honeymoon Effect) e Tolerância Funcional',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Em uma fração significativa de cães epilépticos refratários, observa-se excelente controle inicial nos primeiros meses seguido por perda progressiva da resposta terapêutica após 4 a 8 meses, decorrente de adaptação molecular e regulação alostérica funcional da SV2A ou proliferação de vias epileptogênicas alternativas.',
        clinicalAction:
          'Alertar o tutor sobre essa possibilidade. Diante de perda gradual de eficácia após meses de estabilidade, considerar aumento posológico, inclusão de novo adjuvante (como brometo ou gabapentina) ou reavaliação do protocolo.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Sedação e Sonolência Transitória',
        frequency: 'common',
        mechanism: 'Depressão leve da hiperssincronização cortical e modulação da transmissão monoaminérgica.',
        clinicalManagement:
          'Geralmente autolimitado com resolução espontânea em 7 a 14 dias. Orientar o tutor a manter o paciente em ambiente seguro e não reduzir a dose prematuramente sem avaliação médica.',
      },
      {
        effect: 'Ataxia e Incoordenação Motora',
        frequency: 'common',
        mechanism: 'Efeito transitório no cerebelo e nas vias proprioceptivas espinhais nas primeiras semanas ou com doses elevadas (> 40 mg/kg).',
        clinicalManagement:
          'Proteger o animal de escadas e pisos escorregadios. Se a ataxia for incapacitante ou persistir após 2 semanas, reduzir a dose temporariamente em 25% e progredir mais lentamente.',
      },
      {
        effect: 'Hiporexia e Náusea',
        frequency: 'uncommon',
        mechanism: 'Desconforto gástrico leve decorrente de irritação osmótica ou efeito central na área postrema.',
        clinicalManagement:
          'Fornecer o medicamento junto com pequenas porções de alimento palatável úmido. Se persistir, avaliar uso concomitante de maropitant ou ondansetrona.',
      },
      {
        effect: 'Hipersalivação em Gatos',
        frequency: 'uncommon',
        mechanism: 'Sabor amargo residual da solução oral ou reação neurovegetativa transitória.',
        clinicalManagement:
          'Administrar cápsulas gelatinosas ou diluir a solução oral em veículo palatável; oferecer petisco logo após a administração.',
      },
      {
        effect: 'Alterações Comportamentais Paradoxais e Hiperatividade',
        frequency: 'rare',
        mechanism: 'Desinibição comportamental de circuitos límbicos ou disfunção serotoninérgica/noradrenérgica induzida.',
        clinicalManagement:
          'Avaliar se o paciente apresenta agressividade, vocalização ou inquietação extrema. Se os sinais forem graves e incompatíveis com o convívio, programar desmame e substituição por outro fármaco.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica Estável (IRIS Estágios 2 e 3)',
        recommendedAdjustment:
          'Reduzir a dose diária em 25% a 35% ou manter a dose individual de 20 mg/kg espaçando o intervalo de q8h para q12h (totalizando 40 mg/kg/dia).',
        physiologicalRationale:
          'Compensa a redução na taxa de filtração glomerular e evita o acúmulo sérico progressivo do fármaco livre, prevenindo sedação crônica e perda motora.',
      },
      {
        clinicalCondition: 'Insuficiência Renal Grave ou Estágio IRIS 4 (TFG criticamente reduzida)',
        recommendedAdjustment:
          'Administrar 10 a 15 mg/kg VO a cada 12 ou 24 horas, guiado estritamente pela resposta clínica e monitoramento de creatinina sérica.',
        physiologicalRationale:
          'O clearance renal de levetiracetam cai até 60% em disfunções renais graves, elevando exponencialmente a meia-vida plasmática.',
      },
      {
        clinicalCondition: 'Sedação Intensa ou Ataxia Grave no Início do Tratamento',
        recommendedAdjustment:
          'Iniciar com dose reduzida de 10 a 15 mg/kg VO a cada 8 horas nos primeiros 5 a 7 dias, aumentando progressivamente para 20 mg/kg q8h conforme tolerância.',
        physiologicalRationale:
          'Permite acomodação farmacodinâmica dos receptores neurais centrais, mitigando a intensidade dos efeitos colaterais iniciais sem comprometer a eficácia a médio prazo.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Fenobarbital (Barbitúrico)',
        severity: 'major',
        clinicalEffect:
          'Queda acentuada da concentração sérica e encurtamento da meia-vida do levetiracetam com risco de falha no controle das crises.',
        pharmacologicalMechanism:
          'O fenobarbital induz vias de depuração e transporte que aumentam o clearance oral de levetiracetam em até 100% em cães, reduzindo a t1/2 de 3,4 para 1,7 horas.',
      },
      {
        drugOrClass: 'Benzodiazepínicos (Diazepam, Midazolam, Clonazepam)',
        severity: 'moderate',
        clinicalEffect: 'Potencialização aditiva de sedação, fraqueza muscular e ataxia.',
        pharmacologicalMechanism:
          'Sinergismo farmacodinâmico no sistema nervoso central entre a modulação vesicular da SV2A e a potenciação gabaérgica pós-sináptica.',
      },
      {
        drugOrClass: 'Gabapentina e Pregabalina (Gabapentinoides)',
        severity: 'moderate',
        clinicalEffect: 'Aumento expressivo da sonolência, ataxia e hipotonia muscular.',
        pharmacologicalMechanism:
          'Ação concomitante sobre a subunidade alfa-2-delta de canais de cálcio voltagem-dependentes e sobre a proteína SV2A.',
      },
      {
        drugOrClass: 'Opioides (Morfina, Metadona, Fentanil, Buprenorfina, Tramadol)',
        severity: 'moderate',
        clinicalEffect: 'Depressão aditiva do sensório e maior sonolência perioperatória.',
        pharmacologicalMechanism:
          'Sinergia na depressão da neurotransmissão central nos circuitos talâmicos e corno dorsal da medula.',
      },
      {
        drugOrClass: 'Carbamazepina',
        severity: 'moderate',
        clinicalEffect: 'Maior incidência de neurotoxicidade, tremores e ataxia.',
        pharmacologicalMechanism:
          'Saturação da capacidade adaptativa de circuitos motores e possível modulação concorrente de correntes iônicas.',
      },
      {
        drugOrClass: 'Metotrexato (Quimioterápico)',
        severity: 'major',
        clinicalEffect: 'Elevação da concentração sérica de metotrexato e toxicidade hematológica/gastrointestinal.',
        pharmacologicalMechanism:
          'Competição pela secreção tubular renal mediada por transportadores de ânions orgânicos.',
      },
    ],

    dilutionGuide: {
      compatibleFluids: [
        'Cloreto de Sódio a 0,9% (Solução Fisiológica)',
        'Ringer com Lactato',
        'Glicose a 5% em Água (SG 5%)',
      ],
      incompatibleFluids: [
        'Soluções com eletrólitos altamente alcalinos sem teste de compatibilidade',
        'Outros fármacos injetáveis administrados na mesma seringa',
      ],
      infusionRateGuidance:
        'Para infusão de emergência (dose de ataque de 30 a 60 mg/kg), diluir na proporção mínima de 1:1 com SF 0,9% ou SG 5% e infundir ao longo de 10 a 15 minutos (taxa de 2 a 4 mg/kg/min). Evitar push intravenoso rápido não diluído pelo risco de bradicardia e depressão respiratória transitória.',
      preparationNotes:
        'A solução injetável é límpida e incolor. Descartar sobras de ampolas abertas sem conservantes. Inspecionar visualmente para partículas antes da administração.',
      diluentsCompatible: ['NaCl 0,9%', 'Ringer Lactato', 'SG 5%'],
      incompatibilities: ['Não misturar com diazepam ou fenobarbital na mesma seringa'],
      infusionRate: '2 a 4 mg/kg/min em infusão intermitente; 8 mg/kg/h em CRI de manutenção contínua',
      storageRequirements:
        'Conservar os comprimidos e solução oral em temperatura ambiente (15°C a 30°C), protegidos da luz e da umidade. Soluções manipuladas em Ora-Blend possuem estabilidade documentada por 91 dias sob refrigeração ou temperatura ambiente.',
    },
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Oral (VO)',
        technique:
          'Administrar diretamente na boca ou homogeneizado com pequenas porções de alimento palatável úmido. Formulações convencionais (IR) exigem rigoroso intervalo a cada 8 horas. Formulações XR devem ser engolidas inteiras a cada 12 horas.',
        nursingCare:
          'Certificar-se da completa deglutição. Manter diário de adesão horária e instruir o tutor a nunca compensar doses esquecidas dobrando a dose seguinte.',
        limitations:
          'Não utilizar por via oral em pacientes em estado comatoso, comatoso pós-ictal ou sem reflexo de deglutição.',
      },
      {
        route: 'Intravenosa (IV)',
        technique:
          'Administrar por via venosa periférica através de infusão intermitente diluída ao longo de 5 a 15 minutos utilizando equipo com controle de fluxo ou bomba de infusão.',
        nursingCare:
          'Monitorar traçado eletrocardiográfico e saturação de oxigênio durante a infusão de ataque. Assegurar permeabilidade do acesso venoso.',
        limitations:
          'Evitar injeção em bolus rápido não diluído (menor que 2 minutos) pelo risco de depressão respiratória reflexa transitória.',
      },
      {
        route: 'Retal (PR)',
        technique:
          'Instilar a dose de 40 mg/kg utilizando seringa conectada a sonda uretral flexível lubrificada (número 6 ou 8 Fr) introduzida cerca de 3 a 5 cm no reto.',
        nursingCare:
          'Manter a pelve do cão discretamente elevada e conter a cauda por 2 minutos para evitar refluxo da solução.',
        limitations:
          'Presença de fezes volumosas na ampola retal pode retardar a absorção; eficácia em gatos menos documentada.',
      },
      {
        route: 'Subcutânea (SC)',
        technique:
          'Injeção no tecido subcutâneo da região interescapular ou flanco com agulha estéril hipodérmica.',
        nursingCare:
          'Massagear suavemente o local; absorção rápida similar à via oral descrita em ensaios caninos preliminares.',
        limitations: 'Volume expressivo pode causar desconforto local transitório.',
      },
      {
        route: 'Intramuscular (IM)',
        technique:
          'Injeção profunda na musculatura epaxial lombar com aspiração prévia negativa para sangue.',
        nursingCare: 'Alternar sítios de aplicação; bem tolerada com farmacocinética comprovada em cães.',
        limitations: 'Desconforto mecânico transitório na musculatura.',
      },
    ],

    pharmacologicalClassification: {
      chemicalClass: 'Derivado da pirrolidona / Pirrolidinona quiral (enantiômero S)',
      chemicalClassDescription:
        'Molécula monocíclica formada por um anel lactâmico de 5 membros (2-oxopirrolidina) ligado a uma cadeia butanamida, com fórmula C8H14N2O2 e peso molecular de 170,21 g/mol.',
      therapeuticClass: 'Anticonvulsivante / Antiepiléptico de Ação Pré-Sináptica',
      therapeuticClassDescription:
        'Fármaco antiepiléptico de segunda geração que modula o maquinário de exocitose vesicular sináptica, inibindo seletivamente a hiperssincronização neuronal em redes epileptogênicas.',
      atcCode: 'QN03AX14',
      receptorTargets: [
        'Proteína de Vesícula Sináptica 2A (SV2A)',
        'Canais de Cálcio Voltagem-Dependentes do Tipo N (Cav2.2)',
        'Receptores Intracelulares de Rianodina (RyR) e IP3R',
      ],
      receptorsAndSites: [
        {
          name: 'Proteína de Vesícula Sináptica 2A (SV2A)',
          type: 'Glicoproteína transmembrana pré-sináptica',
          action: 'Ligação estereoespecífica de alta afinidade',
          clinicalEffect:
            'Modula a velocidade de exocitose vesicular e esgota a liberação síncrona patológica de glutamato durante crises epilépticas.',
        },
        {
          name: 'Canais de Ca2+ Tipo N (Cav2.2)',
          type: 'Canal iônico de cálcio voltagem-dependente de alta voltagem',
          action: 'Inibição parcial seletiva pré-sináptica',
          clinicalEffect:
            'Reduz a entrada de cálcio nos terminais axônicos, diminuindo a fosforilação de proteínas do maquinário SNARE.',
        },
        {
          name: 'Receptores GABA-A e Glicina (Modulação Indireta)',
          type: 'Receptores de canais de cloreto pós-sinápticos',
          action: 'Reversão de inibição por ligantes alostéricos negativos (zinco)',
          clinicalEffect:
            'Preserva a neurotransmissão inibitória gabaérgica fisiológica frente a substâncias pró-epileptogênicas endógenas.',
        },
      ],
      detailedTargets: [
        {
          target: 'SV2A',
          action: 'Modulação de docking e exocitose vesicular',
          clinicalSignificance:
            'Principal responsável pela supressão de crises focais, generalizadas, mioclonias e interrupção de status epilepticus.',
        },
        {
          target: 'Canais Ca2+ Tipo N',
          action: 'Bloqueio parcial de ~37% da corrente de alta voltagem',
          clinicalSignificance:
            'Atenua a transmissão excitatória rápida no hipocampo e córtex cerebral sob estresse convulsivo.',
        },
      ],
    },

    prescriptionType: {
      category: 'Receita de Controle Especial (Lista C1 - 2 vias)',
      ordinanceOrLaw: 'Portaria SVS/MS nº 344/1998 e RDC ANVISA nº 44/2014 (Substâncias Sujeitas a Controle Especial)',
      retentionRequired: true,
      guidelines:
        'Prescrição em receituário branco de duas vias (Receita de Controle Especial). A 1ª via é obrigatoriamente retida pela farmácia/drogaria no momento da dispensação e a 2ª via é devolvida carimbada ao tutor como comprovante e orientação. Validade de 30 dias a partir da data de emissão. Por ser medicamento de uso contínuo para epilepsia, a regulamentação autoriza a prescrição de quantidade suficiente para até 6 meses de tratamento contínuo.',
    },

    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Meia-Vida Ultracurta, Dependência de q8h e Indução Marcante por Fenobarbital',
        description:
          'O cão apresenta depuração extremamente rápida com meia-vida plasmática de 2,2 a 4,4 horas para a formulação convencional, demandando estritamente intervalo a cada 8 horas (TID). A coadministração de fenobarbital praticamente dobra o clearance oral do levetiracetam (de 125 para 253 mL/kg/h) e encurta a meia-vida para ~1,7 horas. Além disso, a monoterapia canina inicial é amplamente inferior ao fenobarbital, devendo o fármaco ser priorizado como adjuvante em casos refratários ou em pulse therapy para crises em salvas.',
        clinicalImplications:
          'Nunca prescrever levetiracetam IR a cada 12 horas para cães. Em animais recebendo fenobarbital que apresentem escape de crises, considerar doses mais altas (30 a 40 mg/kg q8h).',
      },
      {
        species: 'cat',
        title: 'Eficácia Padrão-Ouro em FARS, Excelente Tolerabilidade e Cinética Própria',
        description:
          'Na espécie felina, o levetiracetam exibe um perfil de excelência: é o tratamento mais eficaz conhecido para as crises mioclônicas audiogênicas felinas (FARS), com 100% de melhora frente a 3% do fenobarbital. Apresenta meia-vida de cerca de 3 horas e excelente tolerabilidade, com ausência de alterações hepáticas ou hematológicas severas, sendo a letargia e a hiporexia transitórias os efeitos mais comuns.',
        clinicalImplications:
          'Opção com evidência favorável para gatos idosos com mioclonias desencadeadas por ruídos de alta frequência. A solução oral líquida de 100 mg/mL permite dosificação milimétrica rigorosa.',
      },
    ],

    curiositiesAndHistory: [
      'O levetiracetam foi sintetizado na década de 1980 pela empresa farmacêutica belga UCB como um análogo do nootrópico piracetam, buscando melhorar a cognição.',
      'Durante os testes pré-clínicos clássicos de modelos animais de epilepsia (como choque eletroconvulsivo máximo), o levetiracetam foi inicialmente considerado ineficaz porque não bloqueia canais de sódio; somente quando testado no modelo de kindling (abrasamento epiléptico) revelou sua extraordinária capacidade de suprimir o desenvolvimento de circuitos epileptogênicos.',
      'Em 2004, pesquisadores identificaram finalmente que o sítio de ligação exclusivo de alta afinidade do levetiracetam no cérebro era a proteína de vesícula sináptica SV2A, inaugurando uma classe inteiramente nova de drogas antiepilépticas.',
      'O fenômeno do Efeito Lua-de-Mel (Honeymoon Effect) foi descrito em cães por Volk et al. (2008), observando que cerca de dois terços dos cães que respondiam inicialmente ao fármaco sofriam perda parcial do controle após 4 a 8 meses, provavelmente por tolerância farmacodinâmica sináptica.',
      'Tutores de cães tratados com Keppra XR frequentemente entram em pânico ao encontrar o comprimido aparentemente intacto nas fezes do animal; trata-se de um fenômeno inofensivo conhecido como comprimido fantasma, onde a matriz polimérica esgotada e sem fármaco é eliminada inalterada após a absorção total da substância ativa.',
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Dose Padrão: 20 mg/kg VO a cada 8 horas (q8h / TID). Solução Oral 100 mg/mL (1 mL = 100 mg; 0,2 mL/kg por dose) e Comprimidos Revestidos de 250 mg e 750 mg.',
    headers: [
      'Peso Corporal (kg)',
      'Dose Alvo (20 mg/kg)',
      'Solução Oral 100 mg/mL (0,2 mL/kg)',
      'Comprimidos de 250 mg',
      'Comprimidos de 750 mg',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '40 mg',
        col1: '0,4 mL',
        col2: 'Inviável (preferir solução)',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '4 kg',
        totalDose: '80 mg',
        col1: '0,8 mL',
        col2: 'Inviável (preferir solução)',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '5 kg',
        totalDose: '100 mg',
        col1: '1,0 mL',
        col2: '1/2 comprimido (125 mg)*',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '10 kg',
        totalDose: '200 mg',
        col1: '2,0 mL',
        col2: '1 comprimido de 250 mg*',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '15 kg',
        totalDose: '300 mg',
        col1: '3,0 mL',
        col2: '1 e 1/4 comprimido (312,5 mg)*',
        col3: 'Inviável (sobredose)',
      },
      {
        weight: '20 kg',
        totalDose: '400 mg',
        col1: '4,0 mL',
        col2: '1 e 1/2 comprimido (375 mg)*',
        col3: '1/2 comprimido de 750 mg*',
      },
      {
        weight: '30 kg',
        totalDose: '600 mg',
        col1: '6,0 mL',
        col2: '2 e 1/2 comprimidos (625 mg)*',
        col3: '3/4 comprimido de 750 mg*',
      },
      {
        weight: '40 kg',
        totalDose: '800 mg',
        col1: '8,0 mL',
        col2: 'Inviável (muitos comprimidos)',
        col3: '1 comprimido de 750 mg*',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador de Precisão com Solução Oral 100 mg/mL para Cães e Gatos',
      concentration: '100 mg/mL (1 mL contém exatamente 100 mg de levetiracetam)',
      dropletRatio: 'Volume por dose (mL) = [Peso do animal (kg) x Dose desejada (mg/kg)] / 100 mg/mL',
      practicalRule:
        'Para a dose clássica de 20 mg/kg, o cálculo prático é exatamente 0,2 mL por kg de peso corporal a cada 8 horas. Para a dose de pulse therapy de 30 mg/kg, administrar 0,3 mL por kg a cada 8 horas.',
      note: 'Nunca dosar levetiracetam em gotas livres: a densidade e viscosidade da solução oral humana variam e a relação de gotas por mL não é padronizada entre fabricantes. Utilizar exclusivamente a seringa dosadora milimetrada original que acompanha o frasco ou seringa de 1 mL / 3 mL / 5 mL graduada.',
    },
  },

  samplePrescriptionText:
    'MODELO 1 — CÃO COM EPILEPSIA IDIOPÁTICA (TERAPIA ADJUVANTE CONTÍNUA):\nRECEITA DE CONTROLE ESPECIAL (2 VIAS)\nUSO ORAL\n1. KEPPRA® (levetiracetam) 100 mg/mL — solução oral, frasco com 300 mL e seringa dosadora......... 2 frascos\nAdministrar por via oral 0,2 mL para cada 1 kg de peso corporal (dose de 20 mg/kg; ex.: para cão de 10 kg administrar exatamente 2,0 mL), a cada 8 horas (TID — rigorosamente às 06h, 14h e 22h), por tempo indeterminado sob acompanhamento neurológico contínuo.\nORIENTAÇÕES AO TUTOR: Pode ser administrado com ou sem alimento. Nunca atrasar ou omitir doses. Não suspender a medicação de forma abrupta sob risco de convulsões graves por abstinência. Observar sonolência ou ataxia nas primeiras semanas. Manter diário de crises detalhado.\n\n--------------------------------------------------------------------------------\n\nMODELO 2 — CÃO COM CRISES EM SALVAS (PULSE THERAPY DOMICILIAR DE RESGATE):\nRECEITA DE CONTROLE ESPECIAL (2 VIAS)\nUSO ORAL\n1. KEPPRA® (levetiracetam) 250 mg — comprimidos revestidos......... 1 caixa com 30 comprimidos\nAdministrar por via oral logo após o término da primeira crise convulsiva do dia:\n- Administrar 30 mg/kg (ex.: cão de 8 kg = 1 comprimido de 250 mg) a cada 8 horas (TID), durante 48 horas consecutivas após a última crise.\n- Após completar 48 horas sem novas crises, retornar à dosagem habitual de manutenção.\nORIENTAÇÕES AO TUTOR: Somente administrar após o animal recuperar plenamente a consciência e a capacidade de deglutição pós-ictal. Se o cão apresentar 3 ou mais crises no mesmo dia ou crise contínua por mais de 5 minutos, encaminhar imediatamente ao hospital veterinário.\n\n--------------------------------------------------------------------------------\n\nMODELO 3 — GATO COM FARS / CRISES MIOCLÔNICAS AUDIOGÊNICAS:\nRECEITA DE CONTROLE ESPECIAL (2 VIAS)\nUSO ORAL\n1. KEPPRA® (levetiracetam) 100 mg/mL — solução oral, frasco com 300 mL com seringa dosadora......... 1 frasco\nAdministrar por via oral 0,2 mL para cada 1 kg de peso corporal (dose de 20 mg/kg; ex.: para gato de 4 kg administrar 0,8 mL), a cada 8 horas (TID), pela manhã, tarde e noite, uso continuado.\nORIENTAÇÕES AO TUTOR: Utilizar exclusivamente a seringa milimetrada de precisão. Evitar na medida do possível fontes domésticas de ruídos agudos de alta frequência (papel alumínio, tilintar de talheres). Retorno trimestral para reavaliação.',

  genericBrandsNote:
    'No mercado farmacêutico brasileiro, o levetiracetam é comercializado sob a marca de referência Keppra (comprimidos de 250 mg e 750 mg, solução oral 100 mg/mL e comprimidos de liberação prolongada Keppra XR 500 mg e 750 mg da UCB Biopharma), a solução injetável hospitalar Antara IV (100 mg/mL em frasco-ampola de 5 mL) e diversas marcas conceituadas de medicamentos genéricos certificados pela ANVISA (Eurofarma, EMS, Medley, Cristália, Aché). Não há, até o presente momento, apresentações comerciais de uso veterinário exclusivo registradas junto ao MAPA no Brasil, sendo o fármaco amplamente prescrito na rotina de neurologia de pequenos animais sob o regime de uso extrabula (off-label).',

  clinicalFoundationsData: [
    {
      id: 'foundations-status-clusters',
      title: 'Manejo de Emergência em Status Epilepticus e Cluster Seizures Caninos',
      narrative:
        'O levetiracetam consolidou-se como um dos fármacos de segunda linha mais importantes na medicina veterinária intensiva para controle de crises em salvas e status epilepticus. No ensaio clínico prospectivo duplo-cego randomizado e placebo-controlado conduzido por Hardy et al. (2012), 19 cães admitidos em crises convulsivas repetitivas agudas receberam levetiracetam intravenoso (30 ou 60 mg/kg) ou placebo após o controle inicial com diazepam. O grupo tratado com levetiracetam alcançou controle sustentado sem novas crises em 56% dos cães, contra apenas 10% no grupo placebo. Esses achados motivaram a inclusão do levetiracetam como recomendação prioritária no Consenso ACVIM 2024 sobre Status Epilepticus. Adicionalmente, o estudo de Cagnotti et al. (2019) com 57 cães comprovou que a administração por via retal na dose de 40 mg/kg produz 94% de controle de crises em salvas frente a 48% com protocolo padrão, oferecendo uma rota de resgate inestimável na ausência de acesso venoso.',
      narrativeHighlights: [
        'Ensaio duplo-cego de Hardy et al. (2012): 56% de controle de crises repetitivas com levetiracetam IV versus 10% com placebo.',
        'Consenso ACVIM 2024: levetiracetam posicionado como fármaco de 2ª linha prioritário após benzodiazepínicos no status epilepticus.',
        'Ensaio de Cagnotti et al. (2019): via retal a 40 mg/kg alcançou 94% de eficácia no bloqueio de crises em salvas em cães.',
        'Infusão IV lenta ao longo de 10 a 15 minutos evita depressão respiratória transitória decorrente de bolus rápido.',
      ],
      studies: [
        {
          citation:
            'Hardy BT, Patterson EE, Cloyd JM, Hardy RM, Leppik IE. Double-masked, placebo-controlled study of intravenous levetiracetam for the treatment of status epilepticus and acute repetitive seizures in dogs. J Vet Intern Med 2012; 26(2): 334-340.',
          referenceId: 'ref-hardy-2012',
          sourceType: 'Ensaio Clínico Randomizado Duplo-Cego Placebo-Controlado',
          summaryText:
            'Avaliou a eficácia do levetiracetam intravenoso (30 ou 60 mg/kg IV) administrado logo após diazepam em 19 cães hospitalizados com status epilepticus ou crises em salvas. O tratamento resultou em ausência de novas convulsões durante a internação em 56% dos cães tratados com levetiracetam contra apenas 10% dos animais no grupo placebo.',
          summaryHighlights: [
            '19 cães em ambiente de terapia intensiva neurológica.',
            'Taxa de sucesso de 56% no grupo levetiracetam vs 10% no grupo controle (p = 0,06).',
            'Ausência de efeitos cardiovasculares ou hipotensão clinicamente relevantes.',
          ],
          metrics: [
            'Amostra: 19 cães em status epilepticus / clusters',
            'Dose: 30 a 60 mg/kg IV lento',
            'Desfecho Primário: Redução marcante da recidiva convulsiva hospitalar',
          ],
          clinicalConclusion:
            'O levetiracetam intravenoso é seguro e eficaz como fármaco de segunda linha para interrupção de crises repetitivas e status epilepticus em cães.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22295898/',
        },
        {
          citation:
            'Cagnotti G, Odore R, Bertone I, et al. Open-label clinical trial of rectally administered levetiracetam as an add-on treatment for cluster seizures in dogs with idiopathic epilepsy. J Vet Intern Med 2019; 33(4): 1714-1718.',
          referenceId: 'ref-cagnotti-2019',
          sourceType: 'Ensaio Clínico Prospectivo Controlado',
          summaryText:
            'Investigou a administração retal de levetiracetam (40 mg/kg PR) em 57 cães com epilepsia idiopática e crises em salvas. O grupo que recebeu levetiracetam retal alcançou 94% de interrupção do cluster nas primeiras 24 horas, comparado a 48% nos cães submetidos apenas ao manejo padrão.',
          summaryHighlights: [
            '57 cães avaliados prospectivamente em episódios agudos de crises em salvas.',
            'Taxa de resposta de 94% no grupo levetiracetam retal versus 48% no controle (p < 0,001).',
            'Excelente opção não invasiva de resgate imediato quando não há acesso intravenoso pérvio.',
          ],
          metrics: [
            'Amostra: 57 cães com crises em salvas',
            'Dose: 40 mg/kg por via retal (PR)',
            'Significância: p < 0,001 a favor do levetiracetam',
          ],
          clinicalConclusion:
            'A administração retal de levetiracetam a 40 mg/kg constitui uma rota alternativa altamente eficaz e prática para abortar crises em salvas em cães.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/31218767/',
        },
      ],
    },
    {
      id: 'foundations-fars-epilepsia-refrataria',
      title: 'A Revolução no Manejo da FARS Felina e Epilepsia Farmacorresistente',
      narrative:
        'A indicação clínica mais robusta e expressiva do levetiracetam em toda a medicina veterinária foi documentada na espécie felina: as crises mioclônicas audiogênicas felinas (FARS). No estudo seminal de Lowrie et al. (2017) envolvendo 57 gatos idosos com FARS, o levetiracetam foi comparado diretamente ao fenobarbital em ensaio randomizado controlado. O levetiracetam produziu redução superior a 50% nos dias com crises em 100% dos felinos (versus 3% com fenobarbital) e aboliu integralmente as crises em metade da população tratada, demonstrando superioridade estatística contundente (p < 0,001). Na epilepsia canina crônica refratária, o estudo duplo-cego cruzado de Muñana et al. (2012) avaliou 34 cães e observou redução significativa da frequência semanal de crises em relação ao baseline basal individual (de 1,9 para 1,1 crises/semana), ressaltando que, embora a superioridade sobre o placebo não tenha atingido significância isolada, o fármaco oferece ganho clínico individual substancial com mínima incidência de efeitos colaterais.',
      narrativeHighlights: [
        'Ensaio randomizado de Lowrie et al. (2017): 100% de resposta em FARS felina com levetiracetam vs 3% com fenobarbital (p < 0,001).',
        '50% dos felinos com crises mioclônicas audiogênicas alcançaram remissão completa com levetiracetam.',
        'Estudo cruzado de Muñana et al. (2012): redução de crises de 1,9 para 1,1 por semana frente ao baseline em cães refratários.',
        'Estudo de Bailey et al. (2008): redução de 2,1 para 0,42 crises/mês como adjuvante em gatos epilépticos.',
      ],
      studies: [
        {
          citation:
            'Lowrie M, Thomson S, Bessant C, Sparkes A, Harvey RJ, Garosi L. Levetiracetam in the management of feline audiogenic reflex seizures: a randomised, controlled, open-label study. J Feline Med Surg 2017; 19(2): 200-206.',
          referenceId: 'ref-lowrie-2017',
          sourceType: 'Ensaio Clínico Randomizado Controlado de Superioridade',
          summaryText:
            'Comparou a eficácia de levetiracetam (20 mg/kg VO q8h) versus fenobarbital em 57 gatos portadores de crises mioclônicas audiogênicas (FARS). Todos os gatos tratados com levetiracetam (100%) apresentaram redução de pelo menos 50% dos dias com mioclonias, comparados a apenas 3% no grupo fenobarbital. Metade dos gatos sob levetiracetam ficou completamente livre de crises.',
          summaryHighlights: [
            '57 gatos com FARS acompanhados em ensaio randomizado controlado.',
            'Taxa de resposta de 100% com levetiracetam versus 3% com fenobarbital (p < 0,001).',
            '50% dos gatos alcançaram abolição total das mioclonias reflexas acústicas.',
          ],
          metrics: [
            'Amostra: 57 gatos idosos com FARS',
            'Dose: 20 mg/kg VO a cada 8 horas',
            'Desfecho: Superioridade contundente frente ao fenobarbital (p < 0,001)',
          ],
          clinicalConclusion:
            'O levetiracetam é o tratamento de primeira escolha e padrão-ouro inequívoco para crises mioclônicas audiogênicas felinas (FARS).',
          url: 'https://pubmed.ncbi.nlm.nih.gov/26690830/',
        },
        {
          citation:
            'Bailey KS, Dewey CW, Boothe DM, Barone G, Kortz GD. Levetiracetam as an adjunct to phenobarbital treatment in cats with suspected idiopathic epilepsy. J Am Vet Med Assoc 2008; 232(6): 867-872.',
          referenceId: 'ref-bailey-2008',
          sourceType: 'Ensaio Clínico Prospectivo de Coorte Aberta',
          summaryText:
            'Avaliou 12 gatos com epilepsia idiopática não controlada por fenobarbital tratados com levetiracetam adjuvante a 20 mg/kg VO q8h. Dos 10 gatos com seguimento completo, 7 (70%) apresentaram redução superior a 50% na frequência de crises, com queda da mediana de crises de 2,1 para 0,42 eventos por mês.',
          summaryHighlights: [
            '12 gatos com epilepsia farmacorresistente acompanhados prospectivamente.',
            '70% de taxa de resposta com redução clinicamente expressiva de crises.',
            'Queda da frequência mediana de convulsões de 2,1 para 0,42 crises/mês.',
          ],
          metrics: [
            'Amostra: 12 gatos epilépticos',
            'Dose: 20 mg/kg VO q8h',
            'Tolerabilidade: Alta, com letargia transitória autolimitada',
          ],
          clinicalConclusion:
            'O levetiracetam oral a 20 mg/kg q8h é um adjuvante eficaz e bem tolerado para felinos com epilepsia idiopática refratária.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/18341442/',
        },
        {
          citation:
            'Muñana KR, Thomas WB, Inzana KD, et al. Evaluation of levetiracetam as adjunctive treatment for refractory canine epilepsy: a randomized, placebo-controlled, crossover trial. J Vet Intern Med 2012; 26(2): 341-348.',
          referenceId: 'ref-munana-2012',
          sourceType: 'Ensaio Clínico Randomizado Duplo-Cego Placebo-Controlado Cruzado',
          summaryText:
            'Avaliou o efeito de levetiracetam (20 mg/kg VO q8h) versus placebo em 34 cães epilépticos refratários a fenobarbital e brometo de potássio em desenho cruzado. Houve redução estatisticamente significativa na frequência semanal de crises em relação ao baseline inicial (1,9 para 1,1 crises/semana; p = 0,015).',
          summaryHighlights: [
            '34 cães com epilepsia canina farmacorresistente grave.',
            'Redução significativa de crises em relação ao período basal inicial.',
            'Excelente perfil de segurança hematológica e ausência de toxicidade de órgãos-alvo.',
          ],
          metrics: [
            'Amostra: 34 cães epilépticos refratários',
            'Dose: 20 mg/kg VO q8h em estudo cruzado',
            'Frequência de crises: Queda de 1,9 para 1,1 crises/semana frente ao baseline',
          ],
          clinicalConclusion:
            'O levetiracetam fornece benefício anticonvulsivante adicional seguro em cães com epilepsia idiopática refratária.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22295869/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      title: 'Estudo Duplo-Cego de Levetiracetam Intravenoso para Status Epilepticus e Crises Repetitivas em Cães',
      authorsYear: 'Hardy BT, Patterson EE, Cloyd JM, Hardy RM, Leppik IE (2012)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e placebo-controlado',
      sampleSize: '19 cães em emergência convulsiva',
      mainFindings:
        'A administração de 30 a 60 mg/kg IV de levetiracetam após diazepam preveniu novas convulsões hospitalares em 56% dos cães tratados contra apenas 10% no grupo placebo, sem instabilidade hemodinâmica.',
      clinicalTakeaway:
        'Fundamenta a indicação prioritária de levetiracetam intravenoso como segunda linha no manejo agudo de emergência de status epilepticus e cluster seizures em cães.',
      referenceId: 'ref-hardy-2012',
    },
    {
      title: 'Avaliação de Levetiracetam como Tratamento Adjuvante na Epilepsia Canina Refratária',
      authorsYear: 'Muñana KR, Thomas WB, Inzana KD, et al. (2012)',
      journal: 'Journal of Veterinary Internal Medicine (JVIM)',
      studyDesign: 'Ensaio clínico randomizado, duplo-cego, placebo-controlado e cruzado',
      sampleSize: '34 cães com epilepsia farmacorresistente',
      mainFindings:
        'O levetiracetam a 20 mg/kg q8h reduziu significativamente a frequência semanal de crises em relação ao baseline basal (1,9 para 1,1 crises/semana; p = 0,015), com perfil de segurança favorável.',
      clinicalTakeaway:
        'Demonstra que o levetiracetam é um adjuvante útil na politerapia de cães epilépticos refratários, embora a superioridade isolada frente ao placebo tenha variado entre indivíduos.',
      referenceId: 'ref-munana-2012',
    },
    {
      title: 'Ensaio Controlado de Monoterapia Inicial de Levetiracetam versus Fenobarbital em Cães Recém-Diagnosticados',
      authorsYear: 'Fredsø N, Sabers A, Toft N, Møller A, Berendt M (2016)',
      journal: 'The Veterinary Journal',
      studyDesign: 'Ensaio clínico randomizado, simples-cego e controlado',
      sampleSize: '12 cães recém-diagnosticados com epilepsia idiopática',
      mainFindings:
        '5 dos 6 cães no grupo levetiracetam saíram do estudo prematuramente por controle convulsivo insatisfatório, enquanto 5 dos 6 cães tratados com fenobarbital alcançaram controle terapêutico adequado.',
      clinicalTakeaway:
        'Alerta crucial contra a utilização indiscriminada de levetiracetam como monoterapia de primeira linha em cães com epilepsia idiopática quando fenobarbital puder ser utilizado.',
      referenceId: 'ref-fredso-2016',
    },
    {
      title: 'Levetiracetam no Manejo das Crises Mioclônicas Audiogênicas Felinas (FARS)',
      authorsYear: 'Lowrie M, Thomson S, Bessant C, Sparkes A, Harvey RJ, Garosi L (2017)',
      journal: 'Journal of Feline Medicine and Surgery (JFMS)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado e controlado de superioridade',
      sampleSize: '57 gatos portadores de FARS',
      mainFindings:
        'O levetiracetam alcançou taxa de resposta de 100% (redução maior que 50% dos dias com mioclonia) versus apenas 3% com fenobarbital (p < 0,001), abolindo totalmente as crises em 50% dos felinos.',
      clinicalTakeaway:
        'O estudo favorece o levetiracetam para FARS em gatos idosos; o resultado da amostra não garante resposta em todos os pacientes.',
      referenceId: 'ref-lowrie-2017',
    },
    {
      title: 'Levetiracetam como Adjuvante ao Fenobarbital na Epilepsia Idiopática Felina',
      authorsYear: 'Bailey KS, Dewey CW, Boothe DM, Barone G, Kortz GD (2008)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico prospectivo de coorte aberta',
      sampleSize: '12 gatos epilépticos refratários',
      mainFindings:
        'O acréscimo de 20 mg/kg q8h de levetiracetam reduziu em mais de 50% a frequência de crises em 70% dos felinos, diminuindo a mediana mensal de crises de 2,1 para 0,42.',
      clinicalTakeaway:
        'Sustenta a indicação do levetiracetam como adjuvante de alta eficácia e excelente tolerabilidade para felinos com epilepsia refratária.',
      referenceId: 'ref-bailey-2008',
    },
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citation:
        'Plumb DC. Plumb’s Veterinary Drug Handbook, 10th edition. Wiley-Blackwell, 2023. Monografia Levetiracetam, pp. 746–748.',
    },
    {
      id: 'ref-bsava-10',
      citation:
        'British Small Animal Veterinary Association. BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition. BSAVA, 2020. Monografia Levetiracetam, pp. 227–228.',
    },
    {
      id: 'ref-acvim-status-2024',
      citation:
        'Charalambous M, Muñana KR, Volk HA, et al. ACVIM Consensus Statement on the Management of Status Epilepticus and Cluster Seizures in Dogs and Cats. Journal of Veterinary Internal Medicine 2024; 38(1): 19–41.',
    },
    {
      id: 'ref-ivetf-2015',
      citation:
        'Bhatti SFM, De Risio L, Muñana K, et al. International Veterinary Epilepsy Task Force consensus proposal: medical treatment of canine epilepsy in Europe. BMC Veterinary Research 2015; 11: 176.',
    },
    {
      id: 'ref-hardy-2012',
      citation:
        'Hardy BT, Patterson EE, Cloyd JM, Hardy RM, Leppik IE. Double-masked, placebo-controlled study of intravenous levetiracetam for the treatment of status epilepticus and acute repetitive seizures in dogs. Journal of Veterinary Internal Medicine 2012; 26(2): 334–340.',
    },
    {
      id: 'ref-munana-2012',
      citation:
        'Muñana KR, Thomas WB, Inzana KD, et al. Evaluation of levetiracetam as adjunctive treatment for refractory canine epilepsy: a randomized, placebo-controlled, crossover trial. Journal of Veterinary Internal Medicine 2012; 26(2): 341–348.',
    },
    {
      id: 'ref-fredso-2016',
      citation:
        'Fredsø N, Sabers A, Toft N, Møller A, Berendt M. A single-blinded phenobarbital-controlled trial of levetiracetam as mono-therapy in dogs with newly diagnosed epilepsy. The Veterinary Journal 2016; 208: 44–49.',
    },
    {
      id: 'ref-lowrie-2017',
      citation:
        'Lowrie M, Thomson S, Bessant C, Sparkes A, Harvey RJ, Garosi L. Levetiracetam in the management of feline audiogenic reflex seizures: a randomised, controlled, open-label study. Journal of Feline Medicine and Surgery 2017; 19(2): 200–206.',
    },
    {
      id: 'ref-bailey-2008',
      citation:
        'Bailey KS, Dewey CW, Boothe DM, Barone G, Kortz GD. Levetiracetam as an adjunct to phenobarbital treatment in cats with suspected idiopathic epilepsy. Journal of the American Veterinary Medical Association 2008; 232(6): 867–872.',
    },
    {
      id: 'ref-moore-2011',
      citation:
        'Moore SA, Muñana KR, Papich MG, Nettifee-Osborne JA. The pharmacokinetics of levetiracetam in healthy dogs concurrently treated with phenobarbital. Journal of Veterinary Pharmacology and Therapeutics 2011; 34(1): 31–34.',
    },
    {
      id: 'ref-cagnotti-2019',
      citation:
        'Cagnotti G, Odore R, Bertone I, et al. Open-label clinical trial of rectally administered levetiracetam as an add-on treatment for cluster seizures in dogs with idiopathic epilepsy. Journal of Veterinary Internal Medicine 2019; 33(4): 1714–1718.',
    },
    {
      id: 'ref-volk-2008',
      citation:
        'Volk HA, Matiasek LA, Feliu-Pascual AL, Platt SR, Chandler KE. The efficacy and tolerability of levetiracetam in pharmacoresistant epileptic dogs. The Veterinary Journal 2008; 176(3): 310–319.',
    },
  ],

  presentations: [
    {
      id: 'pres-keppra-comp-250',
      name: 'Keppra® 250 mg Comprimidos Revestidos',
      brand: 'UCB Biopharma / Farmácia Humana Extrabula',
      form: 'Comprimido revestido sulcado',
      concentrationValue: 250,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos revestidos sulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível em 2 metades de 125 mg',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos de 250 mg',
    },
    {
      id: 'pres-keppra-comp-750',
      name: 'Keppra® 750 mg Comprimidos Revestidos',
      brand: 'UCB Biopharma / Farmácia Humana Extrabula',
      form: 'Comprimido revestido sulcado',
      concentrationValue: 750,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos revestidos sulcados',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado divisível em metades de 375 mg para cães grandes',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos de 750 mg',
    },
    {
      id: 'pres-keppra-sol-100',
      name: 'Keppra® 100 mg/mL Solução Oral',
      brand: 'UCB Biopharma / Farmácia Humana Extrabula',
      form: 'Solução oral líquida com seringa dosadora',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco de vidro âmbar com 300 mL acompanhado de seringa graduada',
      route: 'Oral (VO)',
      scoringInfo: 'Líquido límpido incolor; 1 mL contém 100 mg de levetiracetam (0,2 mL/kg na dose de 20 mg/kg)',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista C1)',
      packageDescription: 'Frasco de 300 mL de solução oral a 10% com seringa dosadora',
    },
    {
      id: 'pres-keppra-xr-500',
      name: 'Keppra XR® 500 mg Comprimidos de Liberação Prolongada',
      brand: 'UCB Biopharma / Farmácia Humana Extrabula',
      form: 'Comprimido revestido de liberação prolongada',
      concentrationValue: 500,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos de liberação prolongada',
      route: 'Oral (VO)',
      scoringInfo: 'Não partir, triturar ou mastigar; administrar inteiro exclusivamente a cada 12 horas',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos XR de 500 mg',
    },
    {
      id: 'pres-keppra-xr-750',
      name: 'Keppra XR® 750 mg Comprimidos de Liberação Prolongada',
      brand: 'UCB Biopharma / Farmácia Humana Extrabula',
      form: 'Comprimido revestido de liberação prolongada',
      concentrationValue: 750,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos de liberação prolongada',
      route: 'Oral (VO)',
      scoringInfo: 'Não partir, triturar ou mastigar; uso a cada 12 horas em cães grandes',
      channel: 'human_pharmacy',
      commercialType: 'Referência Humana Extrabula (Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos XR de 750 mg',
    },
    {
      id: 'pres-antara-iv-100',
      name: 'Antara IV® 100 mg/mL Solução para Diluição e Infusão',
      brand: 'Injetável Hospitalar Extrabula',
      form: 'Solução injetável estéril para infusão',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Caixa com 10 frascos-ampola com 5 mL (500 mg por frasco)',
      route: 'Intravenosa (IV)',
      scoringInfo: 'Solução concentrada estéril; diluir em 1:1 com SF 0,9% antes da infusão',
      channel: 'human_pharmacy',
      commercialType: 'Injetável Hospitalar Extrabula (Lista C1)',
      packageDescription: 'Frasco-ampola com 5 mL contendo 500 mg de levetiracetam',
    },
    {
      id: 'pres-levetiracetam-gen-comp',
      name: 'Levetiracetam Genérico 250 mg e 750 mg Comprimidos',
      brand: 'Medicamento Genérico (EMS / Eurofarma / Medley / Aché)',
      form: 'Comprimido revestido sulcado',
      concentrationValue: 250,
      concentrationUnit: 'mg',
      packInfo: 'Cartucho com 30 comprimidos',
      route: 'Oral (VO)',
      scoringInfo: 'Comprimido sulcado',
      channel: 'human_pharmacy',
      commercialType: 'Genérico Humano Extrabula (Lista C1)',
      packageDescription: 'Cartucho com 30 comprimidos revestidos de 250 mg',
    },
    {
      id: 'pres-levetiracetam-gen-sol',
      name: 'Levetiracetam Genérico 100 mg/mL Solução Oral',
      brand: 'Medicamento Genérico (Eurofarma / Cristália)',
      form: 'Solução oral líquida com seringa dosadora',
      concentrationValue: 100,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco com 100 mL ou 150 mL com seringa graduada',
      route: 'Oral (VO)',
      scoringInfo: '1 mL = 100 mg de levetiracetam',
      channel: 'human_pharmacy',
      commercialType: 'Genérico Humano Extrabula (Lista C1)',
      packageDescription: 'Frasco com 100 mL de solução oral de 100 mg/mL',
    },
  ],

  doses: [
    {
      id: 'dose-lev-dog-adj-ir',
      species: 'dog',
      indication: 'Epilepsia Canina Farmacorresistente (Terapia Adjuvante IR)',
      clinicalContext: 'Cães epilépticos com controle incompleto por fenobarbital ou brometo de potássio.',
      doseMin: 20,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: 'Uso contínuo de longo prazo',
      notes:
        'Iniciar com 20 mg/kg VO a cada 8 horas. Se necessário e bem tolerado, aumentar progressivamente para 30 mg/kg q8h, podendo atingir até 40 a 60 mg/kg q8h em pacientes refratários graves sob uso concomitante de fenobarbital.',
      monitoring: 'Diário de crises, avaliação clínica neurológica, bioquímica renal e hepática semestrais.',
      referenceIds: ['ref-munana-2012', 'ref-moore-2011', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-sol-100',
    },
    {
      id: 'dose-lev-dog-mono-ir',
      species: 'dog',
      indication: 'Monoterapia Alternativa em Cães Hepatopatas ou Intolerantes a Fenobarbital',
      clinicalContext: 'Cães com hepatopatias prévias graves, disfunção hepática por fenobarbital ou hipoalbuminemia severa.',
      doseMin: 20,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: 'Uso contínuo',
      notes:
        'Não é a primeira escolha para cães sadios recém-diagnosticados devido à superioridade comprovada do fenobarbital (Fredsø et al., 2016). Reservar para animais com contraindicação formal a barbitúricos.',
      monitoring: 'Frequência de crises, enzimas hepáticas e função renal.',
      referenceIds: ['ref-fredso-2016', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-comp-250',
    },
    {
      id: 'dose-lev-dog-xr',
      species: 'dog',
      indication: 'Manutenção Canina com Formulação de Liberação Prolongada (XR)',
      clinicalContext: 'Cães sob tratamento crônico nos quais o intervalo a cada 8 horas é inviável para o tutor.',
      doseMin: 30,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 12 horas (q12h / BID)',
      duration: 'Uso contínuo',
      notes:
        'Administrar 30 mg/kg VO a cada 12 horas. Os comprimidos devem ser engolidos inteiros com alimento. Nunca partir, mastigar ou triturar os comprimidos XR.',
      monitoring: 'Controle de crises e observação de matrizes fecais esgotadas inofensivas nas fezes.',
      referenceIds: ['ref-plumb-10'],
      evidenceLevel: 'Nível 2b — Estudos Farmacocinéticos e Clínicos em Cães',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-xr-500',
    },
    {
      id: 'dose-lev-dog-status-iv',
      species: 'both',
      indication: 'Status Epilepticus e Crises Convulsivas em Salvas (Carga de Emergência IV)',
      clinicalContext: 'Tratamento imediato de emergência hospitalar após benzodiazepínico inicial (Consenso ACVIM 2024).',
      doseMin: 30,
      doseMax: 60,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Intravenosa (IV lenta)',
      frequency: 'Dose única de ataque; se necessário manutenção a cada 8 horas',
      duration: 'Fase aguda hospitalar (primeiras 24 a 48 horas)',
      notes:
        'Infundir 30 a 60 mg/kg IV diluído em SF 0,9% ao longo de 5 a 15 minutos (taxa de 2 a 4 mg/kg/min). Para crises refratárias extremas em cães, pode ser continuado em infusão contínua (CRI) a 8 mg/kg/h.',
      monitoring: 'ECG contínuo, pressão arterial média, oximetria de pulso e frequência respiratória.',
      referenceIds: ['ref-hardy-2012', 'ref-acvim-status-2024', 'ref-plumb-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado Duplo-Cego e Consenso ACVIM 2024',
      calculatorEnabled: true,
      presentationId: 'pres-antara-iv-100',
    },
    {
      id: 'dose-lev-dog-pulse-po',
      species: 'dog',
      indication: 'Pulse Therapy para Crises em Salvas (Clusters Caninos)',
      clinicalContext: 'Protocolo de resgate oral iniciado pelo tutor logo após a primeira crise convulsiva do dia.',
      doseMin: 30,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: '48 horas consecutivas após a última crise do cluster',
      notes:
        'Administrar 30 mg/kg VO q8h assim que o reflexo de deglutição estiver recuperado. Manter por 48 horas após a última crise e retornar à dose basal de manutenção.',
      monitoring: 'Vigilância de consciência, reflexo de deglutição e grau de ataxia transitória.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-ivetf-2015'],
      evidenceLevel: 'Nível 2a — Diretrizes Clínicas e Consensos Internacionais',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-sol-100',
    },
    {
      id: 'dose-lev-dog-rectal',
      species: 'dog',
      indication: 'Emergência Convulsiva por Via Retal em Cães com Clusters',
      clinicalContext: 'Cães com crises em salvas sem acesso venoso e com via oral contraindicada por torpor.',
      doseMin: 40,
      doseMax: 40,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Retal (PR)',
      frequency: 'Dose única de resgate',
      duration: 'Dose única até obtenção de acesso intravenoso',
      notes:
        'Instilar 40 mg/kg por via retal utilizando solução oral ou injetável pura conectada a sonda uretral flexível lubrificada introduzida de 3 a 5 cm no reto.',
      monitoring: 'Tempo de latência até parada dos abalos motores; manter pelve elevada por 2 minutos.',
      referenceIds: ['ref-cagnotti-2019', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Prospectivo Controlado',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-sol-100',
    },
    {
      id: 'dose-lev-cat-adj-ir',
      species: 'cat',
      indication: 'Epilepsia Idiopática Felina (Terapia Adjuvante ao Fenobarbital)',
      clinicalContext: 'Gatos epilépticos refratários ou com efeitos colaterais indesejáveis ao fenobarbital.',
      doseMin: 20,
      doseMax: 20,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: 'Uso contínuo',
      notes:
        'Administrar 20 mg/kg VO a cada 8 horas utilizando a solução oral de 100 mg/mL com seringa dosadora. Se necessário, aumentar em incrementos de 10 a 20 mg/kg até 40 mg/kg q8h.',
      monitoring: 'Controle de frequência de crises, apetite e comportamento geral.',
      referenceIds: ['ref-bailey-2008', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 2a — Ensaio Clínico Prospectivo de Coorte',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-sol-100',
    },
    {
      id: 'dose-lev-cat-fars',
      species: 'cat',
      indication: 'Crises Mioclônicas Audiogênicas Felinas (FARS)',
      clinicalContext: 'Gatos idosos com crises reflexas auditivas desencadeadas por ruídos de alta frequência.',
      doseMin: 20,
      doseMax: 25,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Oral (VO)',
      frequency: 'A cada 8 horas (q8h / TID)',
      duration: 'Uso contínuo por tempo indeterminado',
      notes:
        'Regime utilizado para FARS. Administrar 20 a 25 mg/kg VO a cada 8 horas com solução oral de 100 mg/mL (0,2 a 0,25 mL/kg por dose). Lowrie et al. (2017) relatam resposta favorável na amostra estudada; não se trata de garantia individual.',
      monitoring: 'Redução e abolição das mioclonias auditivas, monitoramento de apetite e exames geriátricos semestrais.',
      referenceIds: ['ref-lowrie-2017', 'ref-plumb-10', 'ref-bsava-10'],
      evidenceLevel: 'Nível 1b — Ensaio Clínico Randomizado Controlado de Superioridade',
      calculatorEnabled: true,
      presentationId: 'pres-keppra-sol-100',
    },
  ],

  relatedDiseaseSlugs: [
    'discinesia-paroxistica-caes-gatos',
    'doenca-renal-cronica-caes-gatos',
  ],
};

/** Compatibilidade com o catálogo arquivado. */
export const levetiracetamMedicationsSeed: MedicationRecord[] = [levetiracetamMedicationRecord];
