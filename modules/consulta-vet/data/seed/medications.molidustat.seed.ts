import { MedicationRecord } from '../../types/medication';

export const molidustatMedicationRecord: MedicationRecord = {
  id: 'med-molidustat',
  slug: 'molidustat',
  title: 'Molidustat',
  activeIngredient: 'Molidustat sódico (BAY 85-3934)',
  isControlled: false,
  tradeNames: [
    'Varenzin™ 25 mg/mL Suspensão Oral para Gatos Frasco 27 mL com Seringa Dosadora (Elanco Saúde Animal Brasil — Registro MAPA nº SP 000626-2.000045)',
    'Varenzin-CA1™ 25 mg/mL Oral Suspension for Cats (Elanco US Inc. — FDA Conditional Approval)',
    'Varenzin™ 25 mg/mL Oral Suspension (Elanco Europe — Autorização EMA janeiro/2026)',
  ],
  officialSiteUrl: 'https://vet.elanco.com/br/produtos/varenzin',
  leafletUrl: 'https://vet.elanco.com/br/produtos/varenzin',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/molidustat/PNG',
  priceReference: {
    amountBrl: 480.0,
    label:
      'Frasco 27 mL (25 mg/mL com seringa graduada): R$ 420,00 a R$ 560,00',
    presentation: 'Varenzin™ 25 mg/mL suspensão oral frasco 27 mL (Elanco Brasil)',
    sourceName: 'Distribuidores Veterinários Credenciados Elanco / Varejo Especializado',
    sourceUrl: 'https://vet.elanco.com/br',
    checkedAt: '2026-10-04',
    notes:
      'Medicamento veterinário inovador registrado no MAPA em 25/04/2025 para uso exclusivo na espécie felina. Venda sob prescrição veterinária em Receituário Simples em 1 via (não sujeito a controle especial). Após aberto, utilizar o conteúdo do frasco em até 28 dias.',
  },
  pharmacologicClass:
    'Inibidor da prolil-hidroxilase do fator induzível por hipóxia (HIF-PHI / HIF-PH inhibitor); estimulador da síntese endógena de eritropoietina felina (EPO); antianêmico renal específico para felinos',
  species: ['cat'],
  category: 'nefrologia',
  tags: [
    'Molidustat',
    'Varenzin',
    'BAY 85-3934',
    'HIF-PHI',
    'Prolil-hidroxilase',
    'Fator Induzível por Hipóxia',
    'DRC Felina',
    'Doença Renal Crônica',
    'Anemia Renal',
    'Eritropoietina Endógena',
    'IRIS 2026',
    'Schmidt 2026',
    'Boegel 2024',
    'Elanco',
    'Receituário Simples',
    'Exclusivo Felinos',
  ],

  plainLanguageSummary:
    'O molidustat (Varenzin™) é uma das maiores inovações da nefrologia veterinária moderna, sendo o primeiro medicamento aprovado especificamente para tratar a anemia da doença renal crônica em gatos por via oral. Ao contrário das injeções tradicionais de eritropoietina humana (que com o tempo podiam fazer o organismo do gato criar anticorpos contra o próprio sangue), o molidustat age como um "simulador de altitude": ele bloqueia temporariamente as enzimas que degradam o fator de resposta à hipóxia (HIF), fazendo o próprio rim e fígado do gato voltarem a produzir eritropoietina felina natural. Os estudos clínicos comprovam que cerca de 68% dos gatos com doença renal recuperam o hematócrito em um ciclo de 28 dias. O medicamento é um líquido oleoso palatável fornecido na dose de 0,2 mL por quilo de peso uma vez ao dia diretamente na boca. Três regras de ouro: 1) O gato deve fazer exames de sangue periódicos (a partir do 14º dia) e o remédio deve ser suspenso se o hematócrito passar do normal para não engrossar demais o sangue (policitemia); 2) Se o gato vomitar o remédio, NUNCA dê outra dose no mesmo dia; 3) Se o gato toma suplemento de ferro ou quelante de fósforo no alimento, dê o Varenzin com pelo menos 1 hora de diferença para não cortar a absorção.',

  mechanismOfAction:
    'O molidustat sódico (sal monossódico do 2-[6-(morfolin-4-il)pirimidin-4-il]-4-(1H-1,2,3-triazol-1-il)-1,2-di-hidro-3H-pirazol-3-ona / BAY 85-3934) é uma molécula sintética de baixo peso molecular que atua como inibidor pan-específico, competitivo e reversível das prolil-hidroxilases do fator induzível por hipóxia (HIF-PHD1, HIF-PHD2 e HIF-PHD3), com maior afinidade pelo eixo catalítico PHD2 (IC50 ~280 nM). Seus fundamentos moleculares desdobram-se nas seguintes etapas biológicas:\n' +
    '1. A MAQUINÁRIA FISIOLÓGICA DE SENSIBIILIDADE AO OXIGÊNIO (EIXO HIF-PHD-VHL): Em condições normais de oxigenação tecidual (normóxia), as prolil-hidroxilases (PHD2) utilizam oxigênio molecular (O2), ferro ferroso (Fe2+) e 2-oxoglutarato para hidroxilar resíduos específicos de prolina (Pro402 e Pro564) na subunidade alfa do fator induzível por hipóxia (HIF-1α e HIF-2α). A hidroxilação permite o reconhecimento físico pela proteína supressora de tumor von Hippel-Lindau (pVHL), que atua como ligase de ubiquitina E3, marcando o HIF-α para destruição proteolítica imediata no proteassoma 26S. Esse mecanismo assegura que o HIF-α tenha meia-vida intracelular de minutos em normóxia, mantendo a transcrição basal de eritropoietina reprimida.\n' +
    '2. A DISFUNÇÃO NA DOENÇA RENAL CRÔNICA: Na DRC felina avançada, a perda de néfrons, a fibrose intersticial peritubular e o menor consumo de oxigênio pelo epitélio tubular geram um paradoxo: as células intersticiais sofrem desdiferenciação miofibroblástica e a maquinaria celular percebe a região como "relativamente oxigenada", mantendo as PHDs ativas e suprimindo inadequadamente a síntese de EPO para o grau de anemia instalada.\n' +
    '3. BLOQUEIO DAS PROLIL-HIDROXILASES E PSEUDO-HIPÓXIA MOLECULAR: O molidustat liga-se competitivamente ao sítio de 2-oxoglutarato das enzimas PHD (especialmente PHD2), inibindo a hidroxilação dos resíduos de prolina de HIF-2α mesmo na presença abundante de O2 celular. Incapaz de ser reconhecido pelo complexo pVHL, o HIF-2α acumula-se no citosol e transloca-se para o núcleo celular.\n' +
    '4. TRANSCRIÇÃO GÊNICA DE ERITROPOIETINA FELINA AUTÓLOGA: No núcleo, o HIF-2α dimeriza-se com a subunidade constitutiva estável HIF-1β (ARNT) e liga-se a sequências regulatórias específicas no DNA denominadas Elementos de Resposta à Hipóxia (HREs) localizadas no gene da eritropoietina. Essa ligação deflagra o recrutamento de coativadores transcricionais (p300/CBP) e estimula a transcrição maciça de RNAm de eritropoietina autóloga pelas células peritubulares renais remanescentes e hepatócitos.\n' +
    '5. DIFERENCIAÇÃO MEDULAR E AUSÊNCIA DE PRCA: A EPO felina nativa secretada liga-se aos receptores de eritropoietina (EPOR) nos progenitores eritroides (CFU-E e proeritroblastos) na medula óssea, ativando as vias intracelulares JAK2/STAT5 e PI3K/Akt, inibindo a apoptose e estimulando a diferenciação em reticulócitos e eritrócitos maduros. Por estimular a síntese de EPO felina autêntica e nativa em vez de introduzir uma glicoproteína recombinante humana heteróloga exógena (como epoetina alfa ou darbepoetina), o molidustat NÃO induz a formação de anticorpos neutralizantes anti-EPO, eliminando o risco de aplasia pura de série vermelha (PRCA).\n' +
    '6. MODULAÇÃO COMPLEMENTAR DO METABOLISMO DE FERRO: Modelos de inibição de HIF demonstram redução na transcrição de hepcidina hepática e elevação de ferroportina e receptor de transferrina, favorecendo a mobilização de reservas reticuloendoteliais de ferro para a hemoglobina, embora o benefício clínico isolado sobre hepcidina em gatos com DRC permaneça sob investigação contínua.',

  pillars: [
    {
      title: 'Pseudo-Hipóxia Molecular Controlada',
      icon: '🧬',
      desc: 'Inibe reversivelmente as enzimas PHD (especialmente PHD2), impedindo a hidroxilação de HIF-2α e sua destruição proteassômica por pVHL, simulando o sinal de hipóxia celular mesmo na presença de oxigênio.',
    },
    {
      title: 'Reativação da EPO Felina Autóloga (Sem PRCA)',
      icon: '🛡️',
      desc: 'Induz o próprio rim e fígado do gato a transcreverem eritropoietina felina nativa, superando o principal risco imunológico das terapias anteriores com proteínas humanas recombinantes (darbepoetina/epoetina).',
    },
    {
      title: 'Eritropoiese Fisiológica e Ordenada',
      icon: '🩸',
      desc: 'Estimula a sobrevida e maturação de progenitores eritroides medulares: pico de reticulócitos na 1ª a 2ª semana, seguido de elevação progressiva e sustentada do HCT/PCV (67,5% de resposta em 28 dias).',
    },
    {
      title: 'Ciclos Monitorados de até 28 Dias',
      icon: '⏳',
      desc: 'A meia-vida de ~5 h gera histerese biológica que persiste por semanas; exige ciclos intermitentes de até 28 dias com pausa mínima de 7 dias e interrupção se o PCV ultrapassar o limite de referência.',
    },
  ],

  quickSummaryHighlights: [
    'Primeiro inibidor oral de prolil-hidroxilase do HIF (HIF-PHI) veterinário aprovado para anemia não regenerativa associada à DRC em gatos.',
    'Dose registrada padrão ouro: 5 mg/kg por via oral uma vez ao dia (q24h) por até 28 dias consecutivos (com Varenzin™ 25 mg/mL: 0,2 mL/kg q24h; frasco de 27 mL com seringa dosadora).',
    'Evidência Clínica de Alto Nível (Schmidt et al. 2026): ensaio clínico multicêntrico randomizado duplo-cego demonstrou 67,5% de taxa de resposta hematológica aos 28 dias (vs 17,1% no placebo; p < 0,001), com aumento médio de +5,25 pontos no hematócrito.',
    'Não é Terapia de Emergência: em anemias graves descompensadas com sinais de hipóxia aguda (PCV <12–14%, taquicardia, prostração), o tratamento inicial obrigatório é a hemotransfusão; o molidustat atua na manutenção eritroide ao longo das semanas.',
    'Regra Estrita do Vômito: se o felino vomitar qualquer fração da dose após a administração, NUNCA redosar no mesmo dia para evitar superdosagem e picos plasmáticos supraterapêuticos.',
    'Separação de Cátions e Ferro: administrar quelantes de fósforo (cálcio, alumínio, magnésio) e suplementos de ferro com intervalo mínimo de 1 hora para evitar quelação intraluminal e falha de absorção.',
    'Espécie Canina: CONTRAINDICADO NA ROTINA CLÍNICA; não existem estudos de eficácia, segurança posológica ou regime aprovado para cães.',
  ],

  quickIndications: [
    {
      condition: 'Anemia Não Regenerativa na Doença Renal Crônica Felina (Gatos)',
      species: 'cat',
      doseSummary: '5 mg/kg VO a cada 24 horas (0,2 mL/kg q24h da suspensão 25 mg/mL) por até 28 dias',
      route: 'Exclusivamente Oral (VO) com seringa dosadora graduada fornecida',
      duration: 'Ciclo máximo de 28 dias consecutivos; pausa obrigatória de no mínimo 7 dias entre ciclos',
      clinicalContext: 'Gatos com DRC estágios IRIS 2 a 4 com PCV < 28%; suspender se PCV > 45%; separar de quelantes por 1–2h',
    },
    {
      condition: 'Uso na Espécie Canina (CONTRAINDICADO)',
      species: 'dog',
      doseSummary: 'CONTRAINDICADO: inexiste dose clínica validada ou segurança estabelecida para cães',
      route: 'Não administrar',
      duration: 'Não utilizar',
      clinicalContext: 'Fisiopatologia de HIF e tolerância espécie-específica divergente; uso restrito a felinos',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-moli-cat-ckd-anemia',
      indication: 'Tratamento da anemia não regenerativa associada à Doença Renal Crônica em gatos',
      clinicalContext: 'Felinos nefropatas estágios IRIS 2 a 4 com hematócrito/PCV persistentemente inferior a 28%',
      species: 'cat',
      dose: '5 mg/kg (0,2 mL/kg da suspensão oral 25 mg/mL)',
      route: 'VO',
      frequency: 'a cada 24 horas (uma vez ao dia)',
      duration: 'até 28 dias consecutivos',
      mechanismOfAction: 'Inibição reversível de prolil-hidroxilases (PHD2 IC50 ~280 nM), estabilização de HIF-2α e ativação da transcrição do gene da eritropoietina nativa felina.',
      clinicalRationale: 'Estimula a eritropoiese endógena autóloga sem induzir anticorpos neutralizantes e PRCA.',
      monitoring: 'PCV/hematócrito nos dias 14, 21 e 28 (suspender se PCV > 45%), pressão arterial sistólica e ferro sérico.',
      referenceIds: ['ref-moli-schmidt-2026', 'ref-moli-fda-varenzin-2023'],
      evidenceLevel: 'Nível 1b — Ensaio clínico multicêntrico randomizado duplo-cego (Schmidt et al. 2026)',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'NÃO É TERAPIA DE RESGATE EMERGÊNCIAL (HEMOTRANSFUSÃO vs MOLIDUSTAT)',
      text: 'O molidustat depende da transcrição gênica de eritropoietina, recrutamento de precursores eritroides na medula óssea e maturação reticulocitária, processo fisiológico que demanda de 14 a 21 dias para promover aumento mensurável do hematócrito. Gatos em crise anêmica grave sintomática (hematócrito < 12–14%, taquicardia, taquipneia, hipotermia ou síncope) necessitam de restauração imediata da capacidade de transporte de oxigênio por HEMOTRANSFUSÃO com sangue total ou concentrado de hemácias compatível. O molidustat deve ser utilizado na fase de estabilização pós-transfusional ou em anemia crônica moderada estável.',
    },
    {
      label: 'RISCO DE POLICITEMIA, HIPERVISCOSIDADE E TROMBOSE (MONITORAMENTO DE PCV)',
      text: 'A estimulação excessiva da prolil-hidroxilase pode desencadear eritropoiese exagerada. Em ensaios experimentais (Boegel et al. 2024), doses elevadas elevaram o hematócrito acima de 60%, predispondo a hiperviscosidade sanguínea, estase circulatória, hipertensão e tromboembolismo arterial. O hematócrito/PCV deve ser aferido obrigatoriamente a partir do dia 14 (D14, D21 e D28). Se o PCV ultrapassar o limite superior do intervalo de referência da espécie (geralmente > 45%), o medicamento DEVE SER INTERROMPIDO IMEDIATAMENTE e o ciclo encerrado.',
    },
    {
      label: 'REGRA OBRIGATÓRIA: NÃO REDOSAR APÓS EPISÓDIOS DE VÔMITO',
      text: 'O vômito é o efeito colateral mais frequente observado no tratamento (cerca de 20% a 40% dos animais). Caso o gato vomite imediatamente ou minutos após a administração de qualquer porção da dose, a orientação da bula oficial e dos consensos internacionais é NÃO REPETIR A DOSE naquele dia. Uma fração desconhecida do fármaco pode ter sido absorvida rapidamente pela mucosa gástrica; redosar acarreta risco de sobre-exposição plasmática cumulativa.',
    },
    {
      label: 'INVESTIGAÇÃO DE FALHA TERAPÊUTICA: DEFICIÊNCIA DE FERRO E PERDA SANGUÍNEA',
      text: 'Caso o gato não apresente elevação reticulocitária ou aumento do hematócrito após 21 dias de tratamento contínuo, NÃO aumentar a dose. É imperativo investigar causas de resistência eritropoiética: deficiência de ferro (absoluta ou funcional induzida por hepcidina), perda oculta de sangue gastrintestinal por gastrite urêmica, hemoparasitoses (Mycoplasma haemofelis), infecções ativas (pielonefrite) ou inflamação sistêmica descompensada.',
    },
    {
      label: 'SEPARAÇÃO OBRIGATÓRIA DE QUELANTES DE FÓSFORO E SUPLEMENTOS DE FERRO',
      text: 'O molidustat é uma molécula suscetível à quelação e complexação físico-química com cátions metálicos multivalentes no lúmen gastrointestinal. A administração simultânea com carbonato de cálcio, hidróxido de alumínio, carbonato de magnésio ou suplementos orais de ferro reduz acentuadamente sua biodisponibilidade oral. Deve-se assegurar um intervalo mínimo de pelo menos 1 HORA (preferencialmente 2 horas) entre o Varenzin e esses compostos.',
    },
    {
      label: 'EXCLUSIVIDADE FELINA: NÃO UTILIZAR EM CÃES',
      text: 'Não existe posologia clínica, dados de segurança a longo prazo ou registro veterinário de molidustat para cães. A fisiopatologia da resposta a inibidores de HIF exibe particularidades espécie-específicas marcantes. A extrapolação empírica da dose de 5 mg/kg para a espécie canina é formalmente desaconselhada.',
    },
  ],

  indications: [
    'Tratamento e controle da anemia não regenerativa associada à Doença Renal Crônica (DRC) em gatos nos estágios IRIS 2, 3 e 4 (aprovado oficialmente para felinos no Brasil pelo MAPA, nos EUA pela FDA e na Europa pela EMA).',
    'Reativação e estimulação da síntese endógena de eritropoietina (EPO) autóloga felina em gatos nefropatas com hematócrito/PCV persistentemente reduzido (tipicamente < 28%), promovendo expansão da massa de hemácias e alívio dos sinais clínicos de letargia, hiporexia e fraqueza associados à anemia crônica.',
    'Alternativa terapêutica oral aos agentes estimuladores da eritropoiese recombinantes humanos (ESAs — darbepoetina alfa e epoetina alfa), com a vantagem de não deflagrar aplasia pura de série vermelha imunomediada (PRCA).',
  ],

  contraindications: [
    'Uso em cães: inexiste dose, regime terapêutico validado ou perfil de segurança estabelecido para a espécie canina.',
    'Gatas gestantes, fêmeas lactantes ou animais destinados à reprodução: estudos laboratoriais comprovaram malformações oculares e anomalias de organogênese decorrentes da manipulação de vias de hipóxia celular fetal.',
    'Gatos com menos de 1 ano de idade ou com peso corporal inferior a 2,0 kg (segurança e farmacocinética não estabelecidas formalmente).',
    'Gatos com hematócrito ou volume globular (PCV) já situado no limite superior ou acima do intervalo de referência da espécie (risco imediato de policitemia e hiperviscosidade).',
    'Hipersensibilidade conhecida ao molidustat sódico ou a qualquer um dos componentes do veículo da formulação (contém óleo de girassol e óleo de peixe).',
    'Anemia hemolítica imunomediada aguda ou perda hemorrágica volumosa não controlada (nestas afecções a resposta medular já se encontra sob máxima estimulação e o fármaco não substitui hemostasia ou transfusão).',
  ],

  cautions: [
    'Gatos cardiopatas com cardiomiopatia hipertrófica (CMH), dilatação atrial esquerda grave ou histórico de tromboembolismo arterial (ATE): o aumento do hematócrito e da viscosidade sanguínea pode sobrecarregar a pós-carga ventricular e amplificar o risco de trombogênese.',
    'Gatos com histórico de convulsões ou distúrbios neurológicos encefálicos: relatos esporádicos de eventos convulsivos em estudos pré-aprovação recomendam cautela e monitoramento neurológico.',
    'Hipertensão arterial sistêmica concomitante: gatos renais anêmicos frequentemente sofrem de hipertensão subjacente; monitorar a pressão arterial sistólica (PAS) por Doppler vascular antes e durante o tratamento com Varenzin.',
    'Monitoramento seriado obrigatório do hematócrito/PCV: iniciar aferição no dia 14 (D14), repetindo no D21 e ao término do ciclo no D28. Suspender o medicamento se o PCV ultrapassar os limites superiores da normalidade.',
    'Gatos gravemente desidratados ou hipovolêmicos: corrigir o déficit hídrico antes de interpretar o valor do hematócrito basal; a hemoconcentração mascara a real gravidade da anemia.',
    'Uso concomitante com outros agentes estimuladores da eritropoiese (darbepoetina, epoetina): associação não estudada e contraindicada pelo risco extremo de hiperestimulação medular e policitemia.',
  ],

  adverseEffects: [
    'Distúrbios gastrintestinais (muito comuns a comuns): êmese transitória (evento mais relatado em cerca de 20% a 40% dos gatos), hiporexia passageira, diarreia leve e salivação após administração.',
    'Policitemia e síndrome de hiperviscosidade (farmacodinâmica exagerada): aumento do hematócrito acima de 55%–60%, eritema de mucosas, taquicardia de esforço e risco potencial de trombose microvascular e congestão tecidual.',
    'Complicações tromboembólicas potenciais: relatos isolados de tromboembolismo arterial em felinos com cardiopatia ou policitemia pré-existente.',
    'Alterações da pressão arterial: elevações discretas a moderadas da pressão arterial sistólica durante a expansão da massa de hemácias circulantes.',
    'Eventos neurológicos esporádicos: letargia, ataxia transitória ou convulsões ocasionais em gatos com uremia avançada e hipertensão.',
  ],

  administration: [
    'Via exclusivamente oral (VO). A formulação veterinária Varenzin™ 25 mg/mL NUNCA deve ser administrada por via parenteral (SC, IM ou IV).',
    'Apresentação líquida oleosa palatável: administrar diretamente na cavidade oral do felino com a seringa dosadora graduada fornecida na embalagem.',
    'Técnica correta de administração: 1) Pesar o felino com balança digital precisa no dia inicial do ciclo; 2) Agitar vigorosamente o frasco antes de cada uso para homogeneizar a suspensão; 3) Encaixar a seringa dosadora no adaptador do bocal; 4) Inverter o frasco e aspirar exatamente o volume correspondente a 0,2 mL para cada 1 kg de peso vivo; 5) Retornar o frasco à posição normal, retirar a seringa e injetar suavemente no canto da boca do gato.',
    'CUIDADOS COM A SERINGA DOSADORA: não desmontar nem lavar a seringa com água e detergente; limpar a ponta externa com papel toalha seco limpo após o uso. O contato do veículo oleoso com a parte externa pode apagar a graduação volumétrica se não for higienizada a seco.',
    'REGRA FUNDAMENTAL EM CASO DE VÔMITO: se o felino regurgitar ou vomitar após a administração, NÃO REPETIR A DOSE naquele dia. Fornecer apenas a dose programada do dia seguinte no horário habitual.',
    'Interação com Alimentos e Outros Medicamentos: a presença de alimento reduz discretamente o pico plasmático (Cmax) sem alterar a absorção total (AUC). Contudo, suplementos de ferro oral e quelantes de fósforo (cálcio, alumínio, magnésio) DEVEM ser separados por um intervalo mínimo de pelo menos 1 a 2 horas em relação ao Varenzin.',
    'Conservação do produto: conservar em temperatura ambiente (15°C a 30°C), em local seco e protegido da luz solar direta. Após aberto, descartar o frasco após 28 dias de uso.',
  ],

  doses: [
    {
      id: 'dose-moli-cat-ckd-anemia',
      species: 'cat',
      indication: 'Anemia não regenerativa associada à Doença Renal Crônica (DRC) felina — protocolo registrado mundial',
      doseMin: 5,
      doseMax: 5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'a cada 24 horas (uma vez ao dia)',
      duration: 'até 28 dias consecutivos (interromper se PCV atingir limite superior do RI)',
      notes:
        'Protocolo de referência aprovado pelo MAPA no Brasil, FDA (Varenzin-CA1) e EMA na Europa. Dose de 5 mg/kg VO q24h equivale a exatamente 0,2 mL/kg da suspensão oral 25 mg/mL (ex.: gato de 4 kg recebe 0,8 mL ao dia). Realizar controle de hematócrito/PCV nos dias 14, 21 e 28. O ciclo deve ser suspenso antes do 28º dia se o PCV ultrapassar o limite de referência da espécie. Caso seja indicado novo ciclo, respeitar uma pausa mínima de 7 dias entre o término de um ciclo e o início do próximo, reiniciando apenas quando a anemia retornar (PCV < 28%).',
      calculatorEnabled: true,
      presentationId: 'pres-varenzin-25mgml',
      evidenceLevel: 'Ensaio clínico multicêntrico randomizado duplo-cego (Schmidt et al. 2026); Bula registrada MAPA',
    },
    {
      id: 'dose-moli-dog-contraindicated',
      species: 'dog',
      indication: 'Uso em cães — CONTRAINDICADO NA PRÁTICA CLÍNICA VETERINÁRIA',
      doseMin: 0,
      doseMax: 0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'CONTRAINDICADO',
      duration: 'NÃO UTILIZAR',
      notes:
        'CONTRAINDICAÇÃO FORMAL: não existe dose clínica validada, indicação aprovada ou ensaios clínicos controlados de eficácia e segurança terapêutica de molidustat na espécie canina. A extrapolação empírica a partir de dados de felinos ou de modelos toxicológicos de roedores é expressamente desaconselhada.',
      calculatorEnabled: false,
      evidenceLevel: 'Ausência de evidência clínica veterinária em cães',
    },
  ],

  presentations: [
    {
      id: 'pres-varenzin-25mgml',
      name: 'Varenzin™ 25 mg/mL Suspensão Oral para Gatos Frasco 27 mL com Seringa (Elanco)',
      brand: 'Varenzin™ (Elanco Saúde Animal)',
      form: 'suspensão oral',
      concentrationValue: 25,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frasco plástico contendo 27 mL de suspensão oral oleosa amarelada a marrom clara, com bocal adaptador e seringa dosadora graduada em incrementos de 0,1 mL.',
      route: 'VO',
      channel: 'veterinary',
      commercialProductSlug: 'varenzin-elanco',
      commercialType: 'Veterinário registrado no MAPA nº SP 000626-2.000045',
      packageDescription:
        'Cada 1 mL contém 25 mg de molidustat sódico em veículo oleoso enriquecido com óleo de girassol e óleo de peixe palatabilizante.',
      calculatedMlPerKgFormula: '0.2 mL/kg q24h',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção oral rápida e altamente eficiente na espécie felina após administração direta da suspensão oleosa na cavidade oral. Em gatos saudáveis, a concentração plasmática máxima (Cmax) situa-se entre 3,6 e 5,1 µg/mL, sendo atingida no tempo de pico (Tmax) entre 1,0 e 1,5 horas após a ingestão. A biodisponibilidade oral absoluta (F) situa-se entre 63% e mais de 84% quando comparada à administração intravenosa. A administração concomitante de alimento diminui discretamente o pico de concentração plasmática (Cmax), porém a exposição sistêmica total mensurada pela área sob a curva (AUC) permanece virtualmente inalterada.',
    distribution:
      'A taxa de ligação a proteínas plasmáticas em felinos é surpreendentemente baixa, fixada entre 18% e 19,8%, o que significa que mais de 80% do molidustat circula sob a forma livre ativa no plasma. O volume de distribuição no estado de equilíbrio (Vss) varia entre 0,75 e 1,01 L/kg em gatos (com Vd terminal após dose IV de 2,57 a 4,82 L/kg), indicando penetração extravascular eficiente em órgãos altamente vascularizados como rins, fígado e glândulas adrenais. Estudos em modelos experimentais demonstraram baixa travessia da barreira hematoencefálica intacta.',
    metabolism:
      'Biotransformação metabólica predominantemente hepática na espécie felina através de duas rotas principais: glicuronidação (formando o metabólito principal conjugado M-1) e glicosilação enzimática (formando o metabólito M-2). O turnover metabólico in vitro atinge cerca de 47% em 4 horas. Ao contrário de mitos históricos que afirmavam que gatos não realizam glicuronidação, o metabolismo do molidustat comprova a existência de vias funcionais de UGT para esse substrato em felinos. Nem o molidustat nem seu metabólito M-1 comportam-se como substratos ou inibidores relevantes da P-glicoproteína (ABCB1).',
    elimination:
      'O clearance plasmático sistêmico em gatos é de aproximadamente 0,32 L/kg/h, com meia-vida de eliminação plasmática terminal (t1/2) variando entre 4,2 e 7,8 horas (média em torno de 5,0 horas). A droga-mãe inalterada é eliminada majoritariamente por via biliar e fecal, enquanto o metabólito polar glicuronídeo M-1 é depurado pela urina. Não há acúmulo plasmático progressivo tóxico sob administração diária de 28 dias (fator de acúmulo discreto de ~1,5 vezes). Ocorre histerese farmacodinâmica marcante: o pico de EPO endógena ocorre cerca de 6 horas após a dose e retorna aos níveis basais em 24 horas, mas o estímulo sobre os progenitores eritroides medulares persiste por semanas.',
    cnsPenetration:
      'Penetração reduzida na barreira hematoencefálica intacta demonstrada em modelos pré-clínicos; tropismo predominante por tecido renal, hepático e adrenais.',
    halfLife: 'Gatos: 4,2 a 7,8 horas (média ~5 h).',
    plasmaBinding: 'Baixa ligação a proteínas plasmáticas (18% a 19,8% livre em gatos).',
  },

  practicalWeightTable: {
    standardDoseText:
      'Referência prática de cálculo para Varenzin™ 25 mg/mL na dose de 5 mg/kg VO q24h. Fórmula matemática simples: Peso do gato (kg) × 0,2 = Volume diário a ser administrado (mL). Seringa dosadora graduada de 0,1 em 0,1 mL.',
    headers: ['Peso do Gato', 'Dose Diária (mg)', 'Volume Diário (mL)', 'Rendimento do Frasco (27 mL)'],
    rows: [
      { weight: '2,0 kg', totalDose: '10,0 mg', col1: '0,4 mL', col2: 'Dura mais de 2 ciclos completos (67 doses)' },
      { weight: '2,5 kg', totalDose: '12,5 mg', col1: '0,5 mL', col2: 'Dura quase 2 ciclos completos (54 doses)' },
      { weight: '3,0 kg', totalDose: '15,0 mg', col1: '0,6 mL', col2: 'Dura 1 ciclo e meio (45 doses)' },
      { weight: '3,5 kg', totalDose: '17,5 mg', col1: '0,7 mL', col2: 'Dura 1 ciclo e sobram 13 doses (38 doses)' },
      { weight: '4,0 kg', totalDose: '20,0 mg', col1: '0,8 mL', col2: 'Dura 1 ciclo completo de 28 dias e sobram 4 mL (33 doses)' },
      { weight: '4,5 kg', totalDose: '22,5 mg', col1: '0,9 mL', col2: 'Dura 1 ciclo completo de 28 dias (30 doses)' },
      { weight: '5,0 kg', totalDose: '25,0 mg', col1: '1,0 mL', col2: 'Dura 1 ciclo completo de 27 dias (27 doses)' },
      { weight: '5,5 kg', totalDose: '27,5 mg', col1: '1,1 mL', col2: '1 frasco dura 24 dias (pode requerer 2º frasco)' },
      { weight: '6,0 kg', totalDose: '30,0 mg', col1: '1,2 mL', col2: '1 frasco dura 22 dias' },
      { weight: '7,0 kg', totalDose: '35,0 mg', col1: '1,4 mL', col2: '1 frasco dura 19 dias' },
      { weight: '8,0 kg', totalDose: '40,0 mg', col1: '1,6 mL', col2: '1 frasco dura 16 dias' },
      { weight: '10,0 kg', totalDose: '50,0 mg', col1: '2,0 mL', col2: '1 frasco dura 13 dias' },
    ],
  },

  samplePrescriptionText:
    'RECEITUÁRIO SIMPLES DE USO VETERINÁRIO (MEDICAMENTO NÃO CONTROLADO)\n' +
    'EMITIDO EM 1 VIA PARA DISPENSAÇÃO EM FARMÁCIA VETERINÁRIA\n\n' +
    'CLÍNICA VETERINÁRIA [NOME DA CLÍNICA] — Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\n' +
    'Endereço: [Logradouro, Bairro, Cidade, UF] — Tel: [(XX) XXXXX-XXXX]\n\n' +
    'PACIENTE: [Nome do Gato], Espécie: Felina, Raça: [Raça], Sexo: [M/F], Idade: [Anos], Peso Atual: [4,0 kg]\n' +
    'TUTOR: [Nome Completo do Tutor], CPF: [000.000.000-00], Endereço: [Logradouro, Cidade, UF]\n\n' +
    'PRESCRIÇÃO:\n' +
    '1. VARENZIN™ 25 mg/mL (molidustat sódico) suspensão oral para gatos ----------- 1 frasco de 27 mL\n' +
    '   (Acompanha seringa dosadora graduada em mililitros)\n' +
    '   Posologia: Administrar 0,8 mL (equivalente a 20 mg de molidustat, na dose de 5 mg/kg) por via oral, uma vez ao dia (a cada 24 horas), durante até 28 dias consecutivos ininterruptos.\n\n' +
    'ORIENTAÇÕES E CUIDADOS OBRIGATÓRIOS AO TUTOR:\n' +
    '1. Agitar vigorosamente o frasco antes de aspirar cada dose com a seringa fornecida.\n' +
    '2. Administrar o líquido diretamente no canto da boca do gato.\n' +
    '3. NÃO desmontar nem lavar a seringa com água e detergente. Limpar apenas a ponta externa com papel toalha seco limpo.\n' +
    '4. REGRA DO VÔMITO: Se o gato vomitar logo após tomar o remédio, NÃO repetir a dose no mesmo dia. Administrar apenas a próxima dose no horário normal do dia seguinte.\n' +
    '5. SEPARAÇÃO DE REMÉDIOS: Se o gato toma suplemento de ferro ou quelante de fósforo no alimento (como hidróxido de alumínio ou carbonato de cálcio), fornecer esses medicamentos com pelo menos 1 a 2 horas de intervalo em relação ao Varenzin.\n' +
    '6. CALENDÁRIO DE EXAMES: Trazer o gato para coleta de sangue e contagem de hematócrito (PCV) nos DIAS 14, 21 e 28 do tratamento. O medicamento será suspenso imediatamente caso o hematócrito ultrapasse os limites normais.\n' +
    '7. Caso seja necessário um novo ciclo no futuro, deve-se aguardar um intervalo de descanso de no mínimo 7 dias entre os ciclos.\n' +
    '8. Descartar o restante do frasco 28 dias após a primeira abertura.\n\n' +
    '[Localidade - UF], [Data do Atendimento]\n' +
    '________________________________________________________\n' +
    'Dr(a). [Nome do Médico Veterinário] — CRMV-[UF] nº [XXXXX]',

  clinicalStudiesCommented: [
    {
      title:
        'Effectiveness and long-term safety of repeated oral administrations of molidustat in the management of anemia associated with chronic kidney disease in cats',
      authorsYear: 'Schmidt et al. (2026)',
      journal: 'Journal of Veterinary Internal Medicine',
      studyDesign:
        'Ensaio clínico prospectivo multicêntrico, randomizado, duplo-cego e placebo-controlado, seguido de extensão aberta de longo prazo',
      sampleSize: '95 gatos com DRC na análise inicial; 75 avaliáveis quanto à efetividade aos 28 dias; 64 na fase de longo prazo',
      mainFindings:
        'Avaliou gatos acometidos por DRC em estágios IRIS 2 a 4 (mediana IRIS 3) com anemia não regenerativa (PCV basal médio de 22,5%). Aos 28 dias de tratamento com molidustat (5 mg/kg VO q24h), a taxa de sucesso hematológico (definida por elevação de >= 4 pontos percentuais no hematócrito ou aumento relativo >= 25%) foi de 67,5% no grupo molidustat contra apenas 17,1% no grupo placebo (p < 0,001). O hematócrito médio subiu de 22,5% para 27,8% (+5,25 pontos no molidustat vs -0,21 ponto no controle). Na extensão de longo prazo por 6 meses com ciclos repetidos condicionados ao PCV < 28% (pausas medianas de 11 a 18 dias), nenhum gato desenvolveu aplasia pura de série vermelha (PRCA) e nenhum animal atingiu PCV patológico >= 45%.',
      clinicalTakeaway:
        'Constitui o estudo clínico definitivo que comprova a superioridade marcante, a eficácia estatística e a tolerabilidade de ciclos repetidos de molidustat na espécie felina, consolidando a mudança de paradigma no tratamento da anemia renal em gatos.',
      referenceId: 'ref-moli-schmidt-2026',
    },
    {
      title: 'Pharmacodynamic effects of molidustat on erythropoiesis in healthy cats',
      authorsYear: 'Boegel et al. (2024)',
      journal: 'Journal of Veterinary Internal Medicine',
      studyDesign: 'Ensaio clínico prospectivo farmacodinâmico experimental controlado por placebo',
      sampleSize: '17 gatos domésticos saudáveis alocados em 3 grupos (placebo n=6, 5 mg/kg n=6, 10 mg/kg n=5)',
      mainFindings:
        'Comprovou que a inibição de prolil-hidroxilase pelo molidustat é fortemente dose-dependente em felinos. No 14º dia de tratamento, o hematócrito médio no grupo de 5 mg/kg atingiu 54,4% contra 40,3% no grupo placebo (p < 0,001). No grupo de 10 mg/kg, o hematócrito ultrapassou o patamar de segurança de 60% logo no 14º dia, exigindo a interrupção precoce programada. O pico sérico de eritropoietina felina endógena ocorreu aproximadamente 6 horas pós-dose.',
      clinicalTakeaway:
        'Evidencia que o mecanismo molecular de estabilização do HIF estimula intensamente a eritropoiese na espécie felina e estabelece que a policitemia é um efeito farmacodinâmico previsível quando há superdosagem ou ausência de monitoramento.',
      referenceId: 'ref-moli-boegel-2024',
    },
    {
      title:
        'Use of molidustat, a hypoxia-inducible factor prolyl hydroxylase inhibitor, in chronic kidney disease-associated anemia in cats',
      authorsYear: 'Charles et al. (2024)',
      journal: 'Journal of Veterinary Internal Medicine',
      studyDesign: 'Ensaio clínico piloto prospectivo randomizado, mascarado e placebo-controlado',
      sampleSize: '21 gatos com DRC e anemia não regenerativa (15 no grupo molidustat e 6 no grupo placebo)',
      mainFindings:
        'Estudo pioneiro que fundamentou a aprovação condicional inicial pela FDA nos EUA (Varenzin-CA1). Aos 28 dias de terapia com 5 mg/kg q24h, 50% dos gatos tratados com molidustat alcançaram o critério de sucesso hematológico em comparação com 17% no grupo placebo. O vômito foi o evento adverso mais comum (observado em 40% dos tratados vs 0% no controle).',
      clinicalTakeaway:
        'Primeiro estudo em pacientes felinos com DRC a demonstrar a viabilidade clínica do conceito de pseudo-hipóxia molecular controlada por via oral.',
      referenceId: 'ref-moli-charles-2024',
    },
    {
      title: 'Palatability of sunflower oil-based vs aqueous verum formulations of molidustat in healthy cats',
      authorsYear: 'Mangold-Gehring et al. (2026)',
      journal: 'Journal of Feline Medicine and Surgery',
      studyDesign: 'Estudo cruzado comparativo de aceitação voluntária e palatabilidade',
      sampleSize: '16 gatos adultos sadios',
      mainFindings:
        'Comparou o consumo voluntário espontâneo de duas formulações de molidustat (0,2 mL/kg): uma suspensão em veículo lipídico de óleo de girassol e óleo de peixe versus uma solução aquosa convencional. A formulação oleosa foi consumida voluntariamente com escores de aceitação excelentes, enquanto a solução aquosa foi amplamente rejeitada pelos felinos.',
      clinicalTakeaway:
        'Explica a tecnologia farmacêutica da apresentação comercial do Varenzin™: o veículo oleoso palatabilizado é elemento determinante para o sucesso da adesão terapêutica a longo prazo pelo tutor em gatos com doença renal crônica.',
      referenceId: 'ref-moli-mangold-2026',
    },
    {
      title:
        'Hematologic and Renal Trends in Cats Undergoing Continuous Renal Replacement Therapy: A Retrospective Case Series with Molidustat Use',
      authorsYear: 'Lee, Lee & Song (setembro/2026)',
      journal: 'Veterinary Sciences',
      studyDesign: 'Série retrospectiva de casos clínicos observacionais',
      sampleSize: '3 gatos com Injúria Renal Aguda grave sobreposta a DRC submetidos à hemodiálise contínua (CRRT)',
      mainFindings:
        'Descreve o uso adjuvante de molidustat associado a hemotransfusões e suporte intensivo em gatos criticamente enfermos sob terapia de substituição renal. Os autores observaram estabilização transitória dos parâmetros hematológicos, sem efeitos adversos graves aparentes atribuíveis ao fármaco.',
      clinicalTakeaway:
        'Ilustra o emprego empírico emergente em terapia intensiva nefrológica, mas a amostra minúscula (n=3) e a polifarmácia extrema não sustentam indicação formal de molidustat em LRA isolada ou durante hemodiálise.',
      referenceId: 'ref-moli-lee-2026',
    },
    {
      title:
        'Mimicking Hypoxia to Treat Anemia: HIF-Stabilizer BAY 85-3934 (Molidustat) Stimulates Erythropoietin Production without Hypertensive Effects',
      authorsYear: 'Flamme et al. (2014)',
      journal: 'PLoS ONE',
      studyDesign: 'Estudo pré-clínico experimental mecanístico e farmacológico in vitro e in vivo',
      sampleSize: 'Ensaios enzimáticos com enzimas humanas recombinantes e modelos animais de insuficiência renal',
      mainFindings:
        'Caracterizou o perfil de inibição seletiva de BAY 85-3934 sobre PHD1 (IC50 480 nM), PHD2 (IC50 280 nM) e PHD3 (IC50 450 nM). Demonstrou que a estabilização transitória de HIF induz produção equilibrada de EPO renal sem deflagrar picos pressóricos arteriais sustentados.',
      clinicalTakeaway:
        'Base mecanicista seminal que elucidou a seletividade e o perfil farmacológico da molécula do molidustat.',
      referenceId: 'ref-moli-flamme-2014',
    },
  ],

  attentionData: {
    attentionSubtitle:
      'Monitoramento rigoroso de hematócrito (PCV) para prevenção de policitemia, manejo de vômitos sem redosagem, separação de quelantes minerais e contraindicação absoluta na espécie canina',
    precautions: [
      {
        condition: 'Eritrocitose excessiva ou hematócrito atingindo o limite superior do intervalo de referência',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A superestimulação medular crônica eleva o volume globular além da faixa fisiológica (PCV > 45%–55%), aumentando exponencialmente a viscosidade sanguínea, a resistência vascular periférica e o estresse de cisalhamento endotelial, predispondo a eventos tromboembólicos fatais e isquemia tecidual.',
        clinicalAction:
          'Interromper imediatamente o tratamento e encerrar o ciclo. Monitorar PCV semanalmente até retorno à faixa anêmica antes de considerar qualquer novo ciclo.',
      },
      {
        condition: 'Episódios de vômito após a administração da dose oral',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O vômito é o efeito colateral mais frequente da formulação; contudo, a absorção gastrointestinal de molidustat é rápida (Tmax ~1 h) e uma porção indeterminada da dose pode já ter alcançado a circulação sistêmica.',
        clinicalAction:
          'NUNCA redosar o animal no mesmo dia. Administrar apenas a dose programada do dia subsequente. Se o vômito persistir, associar suporte antiemético com maropitant ou ondansetrona.',
      },
      {
        condition: 'Administração simultânea com quelantes de fósforo ou suplementos minerais de ferro',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A molécula de molidustat forma complexos insolúveis inabsorvíveis com cátions multivalentes (Ca2+, Al3+, Mg2+, Fe2+/Fe3+) na luz intestinal, reduzindo criticamente sua absorção e resultando em falha terapêutica.',
        clinicalAction:
          'Espaçar a administração do Varenzin em pelo menos 1 a 2 horas de qualquer produto que contenha cálcio, magnésio, alumínio ou ferro.',
      },
      {
        condition: 'Prescrição em pacientes da espécie canina',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Inexistem ensaios clínicos controlados de posologia, eficácia ou segurança terapêutica de molidustat em cães. A extrapolação empírica acarreta riscos toxicológicos desconhecidos.',
        clinicalAction:
          'Contraindicação absoluta. Prescrever molidustat exclusivamente para gatos com doença renal crônica.',
      },
      {
        condition: 'Cardiomiopatia hipertrófica felina (CMH) com aumento atrial esquerdo ou histórico de tromboembolismo',
        alertLevel: 'caution',
        physiologicalExplanation:
          'O aumento da massa eritrocitária e da viscosidade pode acentuar a estase sanguínea atrial e precipitar a formação de trombos no átrio esquerdo.',
        clinicalAction:
          'Avaliar ecocardiograma prévio, manter terapia antitrombótica com clopidogrel quando indicada e monitorar PCV com frequência semanal estrita.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Quelantes entéricos de fósforo (Carbonato de cálcio, Acetato de cálcio, Hidróxido de alumínio, Carbonato de magnésio)',
        severity: 'major',
        clinicalEffect:
          'Redução drástica na absorção oral e biodisponibilidade do molidustat, com falha na estimulação de EPO e persistência da anemia.',
        pharmacologicalMechanism:
          'Formação de complexos de quelação insolúveis e precipitados inabsorvíveis entre o molidustat e cátions metálicos bivalentes e trivalentes no lúmen gastrointestinal.',
      },
      {
        drugOrClass: 'Suplementos orais de ferro (Sulfato ferroso, Quelato de ferro, Hidróxido de ferro polimaltosado)',
        severity: 'major',
        clinicalEffect:
          'Diminuição mútua da absorção gastrointestinal de ambos os fármacos.',
        pharmacologicalMechanism:
          'Quelação físico-química intraluminal direta com os íons ferro. Separar as administrações em pelo menos 1 a 2 horas.',
      },
      {
        drugOrClass: 'Agentes Estimuladores da Eritropoiese recombinantes humanos (Darbepoetina alfa, Epoetina alfa)',
        severity: 'contraindicated',
        clinicalEffect:
          'Risco severo de hiperestimulação eritropoiética aditiva, policitemia fulminante, hipertensão descompensada e tromboembolismo.',
        pharmacologicalMechanism:
          'Sinergismo farmacodinâmico excessivo: o molidustat eleva a EPO endógena e o ESA exógeno ativa diretamente os receptores EPOR medulares.',
      },
      {
        drugOrClass: 'Anti-hipertensivos e vasodilatadores (Amlodipina, Telmisartana, Benazepril)',
        severity: 'minor',
        clinicalEffect:
          'Possível necessidade de ajuste posológico do anti-hipertensivo durante a expansão da massa globular.',
        pharmacologicalMechanism:
          'A recuperação do hematócrito eleva a viscosidade e pode influenciar a hemodinâmica glomerular e sistêmica. Monitorar pressão arterial regularmente.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Vômito após a administração',
        frequency: 'common',
        mechanism:
          'Irritação local mucosa pelo veículo lipídico ou efeito reflexo gástrico em felinos urêmicos sensíveis.',
        clinicalManagement:
          'NÃO redosar. Fornecer uma pequena quantidade de petisco palatável previamente se tolerado ou associar antiemético (maropitant ou ondansetrona).',
      },
      {
        effect: 'Policitemia / Eritrocitose (PCV > 45%)',
        frequency: 'uncommon',
        mechanism:
          'Estimulação eritropoiética excessiva por doses repetidas sem monitoramento da resposta tecidual.',
        clinicalManagement:
          'Interromper o tratamento imediatamente. Em casos graves com hiperviscosidade sintomática, realizar fluidoterapia intravenosa dilucional ou sangria terapêutica com reposição de coloides.',
      },
      {
        effect: 'Hipertensão arterial sistêmica discreta a moderada',
        frequency: 'uncommon',
        mechanism:
          'Aumento da resistência vascular periférica e viscosidade sanguínea decorrente da maior massa de glóbulos vermelhos.',
        clinicalManagement:
          'Aferir pressão arterial por Doppler vascular e ajustar dose de anlodipino ou telmisartana conforme necessário.',
      },
      {
        effect: 'Hiporexia e perda ponderal transitória',
        frequency: 'common',
        mechanism:
          'Distúrbio gastrointestinal inespecífico associado ao quadro crônico de DRC avançada.',
        clinicalManagement:
          'Suporte nutricional com rações renais úmidas palatáveis e uso de orexígenos (mirtazapina ou capromorelina).',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Elevação Rápida do Hematócrito (Aumento > 6 a 8 pontos percentuais em menos de 14 dias)',
        recommendedAdjustment:
          'Suspender temporariamente a administração por 5 a 7 dias e reavaliar o PCV antes de completar o ciclo.',
        physiologicalRationale:
          'Prevenção de policitemia súbita e hiperviscosidade em gatos hiporresponsivos que subitamente experimentam expansão clonal eritroide maciça.',
      },
      {
        clinicalCondition: 'Estágios Avançados da Doença Renal Crônica (IRIS 3 e 4)',
        recommendedAdjustment:
          'Manter a posologia padrão de 5 mg/kg (0,2 mL/kg q24h); NÃO reduzir a dose empiricamente, pois o fármaco foi formulado e testado especificamente em gatos renais.',
        physiologicalRationale:
          'O clearance do fármaco inalterado é predominantemente fecal/biliar; reduções arbitrárias de dose causam falha terapêutica na indução de EPO.',
      },
    ],
  },

  generalInfoData: {
    pharmacologicalClassification: {
      chemicalClass: 'Derivado pirimidinil-pirazolônico (BAY 85-3934)',
      chemicalClassDescription:
        'Composto heterocíclico sintético de baixo peso molecular contendo núcleos de pirimidina, morfolina, triazol e pirazolato, formulado como sal sódico solúvel (PM 336,28 g/mol).',
      therapeuticClass: 'Estimulador da síntese de eritropoietina endógena; inibidor de prolil-hidroxilase do HIF (HIF-PHI)',
      atcCode: 'B03XA06 (classe correlata)',
      receptorTargets: [
        'HIF Prolil-Hidroxilase 2 / PHD2 (EGLN1) — alvo primário',
        'HIF Prolil-Hidroxilase 1 / PHD1 (EGLN2)',
        'HIF Prolil-Hidroxilase 3 / PHD3 (EGLN3)',
      ],
    },
    prescriptionType: {
      category: 'Medicamento de Venda sob Prescrição Veterinária (Receituário Simples)',
      ordinanceOrLaw: 'Produto veterinário registrado no MAPA sob nº SP 000626-2.000045.',
      retentionRequired: false,
      guidelines:
        'Prescrever em receituário simples em 1 via para aquisição em distribuidores e farmácias veterinárias.',
    },
    speciesPeculiarities: [
      {
        species: 'cat',
        title: 'Espécie exclusiva de desenvolvimento e validação clínica do Varenzin™',
        description:
          'A espécie felina possui susceptibilidade peculiar à formação de anticorpos neutralizantes contra eritropoietina recombinante humana (PRCA por darbepoetina). O molidustat soluciona essa limitação por reativar a síntese de EPO felina autóloga nativa.',
        clinicalImplications:
          'Tratamento padrão ouro de primeira linha para anemia da DRC em gatos com hematócrito <28%, evitando terapias heterólogas.',
      },
    ],
    curiositiesAndHistory: [
      'A descoberta dos mecanismos moleculares de sensoriamento de oxigênio celular envolvendo o Fator Induzível por Hipóxia (HIF) e as prolil-hidroxilases (PHD) foi laureada com o Prêmio Nobel de Fisiologia ou Medicina de 2019, concedido aos cientistas William Kaelin Jr., Sir Peter Ratcliffe e Gregg Semenza.',
      'O molidustat (originalmente sintetizado pela Bayer Healthcare como BAY 85-3934) foi adaptado para a medicina veterinária pela Elanco Saúde Animal sob o nome comercial Varenzin™, tornando-se o primeiro medicamento da classe HIF-PHI do mundo aprovado para uso veterinário.',
      'Diferente da crença popular histórica de que "gatos não realizam glicuronidação", o molidustat é depurado em felinos principalmente através da formação do metabólito glicuronídeo M-1, demonstrando a presença funcional de vias de glicuronidação específicas na espécie.',
    ],
  },

  monitoringParameters: [
    'Hematócrito / Volume Globular (PCV): mensuração obrigatória no dia basal (D0), no D14, D21 e D28 de cada ciclo. Interromper se ultrapassar o limite de referência da espécie.',
    'Contagem absoluta de reticulócitos: marcador precoce de resposta farmacodinâmica medular (elevação esperada a partir de 7 a 14 dias pós-início).',
    'Avaliação do perfil de ferro (ferro sérico, saturação de transferrina / TSAT, ferritina ou RET-He): se não houver resposta após 21 dias, investigar deficiência funcional de ferro.',
    'Pressão arterial sistólica (PAS) por Doppler vascular: monitorar periodicamente para descartar hipertensão sistêmica secundária à melhora do hematócrito.',
    'Bioquímica renal (creatinina, SDMA, ureia e fósforo) e urinálise com UPC: acompanhamento da progressão basal da DRC felina.',
  ],

  clientInformation: [
    'O Varenzin™ é um medicamento inovador desenvolvido exclusivamente para gatos com doença renal crônica que estão com anemia (poucos glóbulos vermelhos no sangue).',
    'Ele age fazendo o próprio rim e fígado do gato voltarem a produzir eritropoietina natural, o hormônio que estimula a medula óssea a fabricar sangue novo.',
    'MODO DE USAR: Administre o líquido diretamente na boca do gato uma vez ao dia com a seringa fornecida. O frasco deve ser bem agitado antes de cada retirada.',
    'CUIDADO COM A SERINGA: Não lave a seringa com água e sabão. Limpe a ponta por fora apenas com um papel toalha seco para que os números não apaguem.',
    'SE O GATO VOMITAR: Nunca dê outra dose no mesmo dia se ele vomitar o remédio. Dê apenas a dose normal no dia seguinte.',
    'SEPARAÇÃO DE OUTROS REMÉDIOS: Se o gato toma suplemento de ferro ou remédio para diminuir o fósforo na comida (como hidróxido de alumínio ou carbonato de cálcio), dê o Varenzin com pelo menos 1 a 2 horas de diferença.',
    'EXAMES DE SANGUE: O gato precisará fazer exames de sangue no 14º, 21º e 28º dias para conferir se o hematócrito subiu e garantir que não suba demais.',
    'Após abrir o frasco, ele deve ser utilizado em até 28 dias.',
  ],

  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos', 'anemia-caes-gatos'],
};
