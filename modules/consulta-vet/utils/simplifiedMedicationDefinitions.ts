export type SimplifiedMedicationDefinition = {
  whatItDoes: string;
  keyPoints: string[];
};

/**
 * Camada de leitura simples. O mecanismo técnico continua sendo a fonte detalhada
 * na monografia; este texto serve como porta de entrada para leitores não especialistas.
 */
const DEFINITIONS: Record<string, SimplifiedMedicationDefinition> = {
  prednisolona: {
    whatItDoes: 'A prednisolona imita a ação do cortisol e diminui a inflamação e a atividade exagerada do sistema de defesa. A intensidade do efeito muda bastante conforme a dose: doses baixas podem repor hormônio, enquanto doses maiores controlam inflamação ou suprimem a imunidade.',
    keyPoints: ['A finalidade clínica define a dose.', 'Tratamentos prolongados geralmente exigem retirada gradual.', 'Infecções, diabetes e uso junto com anti-inflamatórios exigem cautela.'],
  },
  'sulfametoxazol-trimetoprima': {
    whatItDoes: 'A associação bloqueia duas etapas consecutivas que as bactérias usam para produzir ácido fólico. Esse bloqueio duplo dificulta a multiplicação bacteriana e torna o tratamento mais eficaz do que cada componente isolado.',
    keyPoints: ['O foco da infecção e a cultura orientam o uso.', 'Cães podem apresentar reações idiossincráticas importantes.', 'Hidratação e monitoramento são relevantes em tratamentos mais longos.'],
  },
  'amoxicilina-clavulanato': {
    whatItDoes: 'A amoxicilina impede a formação da parede da bactéria. O clavulanato protege a amoxicilina de algumas enzimas bacterianas que tentariam inativá-la, ampliando a ação contra microrganismos produtores de beta-lactamase.',
    keyPoints: ['Não substitui cultura em infecções complicadas.', 'A dose varia conforme local e gravidade da infecção.', 'Vômito e diarreia estão entre os efeitos mais comuns.'],
  },
  pregabalina: {
    whatItDoes: 'A pregabalina reduz a liberação de sinais excitatórios entre os neurônios. Com menos estímulos exagerados circulando, pode diminuir dor neuropática, ansiedade situacional e, em alguns contextos, auxiliar no controle de convulsões.',
    keyPoints: ['Sedação e falta de coordenação podem ocorrer.', 'Ajustes podem ser necessários em doença renal.', 'A indicação determina frequência e duração.'],
  },
  maropitant: {
    whatItDoes: 'O maropitant bloqueia o receptor NK1, usado pela substância P no centro do vômito. Assim, interrompe uma das principais vias finais que desencadeiam náusea e vômito por diferentes causas.',
    keyPoints: ['Controlar o vômito não elimina sua causa.', 'A via e a duração dependem do quadro clínico.', 'Dor à aplicação pode ocorrer com a formulação injetável.'],
  },
  ondansetron: {
    whatItDoes: 'A ondansetrona bloqueia receptores 5-HT₃ envolvidos na náusea e no vômito por vias vagais e centrais. É complementar ao maropitant — não substitui a mesma via.',
    keyPoints: ['Em cães, VO tem biodisponibilidade baixa — preferir IV/SC quando efeito previsível é necessário.', 'Útil quando náusea persiste apesar de maropitant.', 'Cautela em hepatopatia, QT longo e distúrbios eletrolíticos.'],
  },
  dipirona: {
    whatItDoes: 'A dipirona é convertida em metabólitos ativos que reduzem sinais de dor, febre e espasmo por mecanismos múltiplos. Funciona melhor como parte de analgesia multimodal.',
    keyPoints: ['Não substitui opioide ou anestesia regional em dor intensa.', 'Evidência de analgesia isolada insuficiente em estudos perioperatórios caninos.', 'Faz sentido quando há componente visceral ou espasmo.'],
  },
  'ampicilina-sulbactam': {
    whatItDoes: 'A ampicilina impede a formação da parede bacteriana; o sulbactam protege contra algumas enzimas que inativariam a ampicilina. Muito usada em internação, mas a cobertura depende da sensibilidade e da função renal.',
    keyPoints: ['Dose de 30 mg/kg IV q8h não cobre automaticamente Enterobacterales resistentes.', 'Azotemia prolonga exposição — considerar intervalo maior.', 'Sempre expressar dose da associação total.'],
  },
  ampicilina: {
    whatItDoes: 'A ampicilina impede a formação da parede bacteriana. É sobretudo medicamento injetável em pequenos animais; a eliminação renal é importante.',
    keyPoints: ['Azotemia aumenta muito a exposição — ajustar intervalo.', 'Baixa penetração prostática na prostatite crônica.', 'Na leptospirose, não substitui o curso de doxiciclina.'],
  },
  budesonida: {
    whatItDoes: 'A budesonida é um corticosteroide potente que age principalmente no local onde é aplicado — intestino ou vias aéreas — porque boa parte do medicamento é metabolizada antes de atingir a circulação. Isso reduz, mas não elimina, os efeitos sistêmicos.',
    keyPoints: ['Não é corticosteroide “sem efeitos sistêmicos”.', 'Doses variam muito conforme fonte — BSAVA, estudos e mg/m² não são intercambiáveis.', 'Formulação entérica não deve ser triturada sem orientação farmacotécnica.'],
  },
  clorambucil: {
    whatItDoes: 'O clorambucil liga-se ao DNA das células em divisão, impedindo sua multiplicação. É um quimioterápico oral usado em linfomas indolentes e algumas doenças imunomediadas, com efeito que pode demorar semanas.',
    keyPoints: ['Medicamento citotóxico — não triturar ou manipular em casa.', 'Protocolos em mg/m² não devem ser convertidos automaticamente para mg/kg.', 'Monitorar hemograma regularmente.'],
  },
  'desoxicorticosterona-pivalato': {
    whatItDoes: 'O DOCP repõe a aldosterona deficiente na doença de Addison, ajudando o rim a reter sódio e água e eliminar potássio em excesso. Não substitui o cortisol — cães com deficiência dupla precisam também de prednisona ou prednisolona.',
    keyPoints: ['Zycortal® é marca/apresentação; princípio ativo = DOCP.', 'Bula (2,2 mg/kg) e guideline AAHA (1,1–1,5 mg/kg) são protocolos distintos.', 'Monitorar sódio, potássio e sinais clínicos ~10 e ~25 dias após aplicação.'],
  },
  metimazol: {
    whatItDoes: 'O metimazol bloqueia a produção de novos hormônios tireoidianos na glândula, controlando o hipertireoidismo felino. Não remove o tecido doente — a dose pode precisar aumentar com o tempo.',
    keyPoints: ['Dose por gato, não mg/kg.', 'FDA e AAHA recomendam regimes diferentes — não misturar.', 'Monitorar T4, rim, fígado e hemograma; prurido facial exige reavaliação urgente.'],
  },
  'levotiroxina-sodica': {
    whatItDoes: 'A levotiroxina repõe o hormônio tireoidiano T4, restaurando o metabolismo normal em animais com hipotireoidismo confirmado. O corpo converte parte do T4 em T3, a forma mais ativa.',
    keyPoints: ['0,02 mg/kg = 20 µg/kg — cuidado com conversão.', 'AAHA e bula Thyro-Tabs usam estratégias de dose diferentes.', 'Em cães, coletar T4 ~4–6 h após o comprimido para monitorar.'],
  },
  diltiazem: {
    whatItDoes: 'O diltiazem bloqueia canais de cálcio no nó AV, desacelerando a condução elétrica e reduzindo a frequência ventricular em taquiarritmias supraventriculares como a fibrilação atrial.',
    keyPoints: ['Objetivo na FA: controlar FC, não converter ritmo.', 'Combinação com digoxina tem evidência canina.', 'Não misturar formulações IR, SR e XR/CD.'],
  },
  digoxina: {
    whatItDoes: 'A digoxina aumenta levemente o tônus vagal e desacelera a condução AV, controlando a frequência ventricular na fibrilação atrial. Não é mais o inotrópico principal de ICC.',
    keyPoints: ['Margem terapêutica estreita — monitorar digoxinemia.', 'Usar peso magro em obesos.', 'Evitar em preexcitação/via acessória e HCM felina.'],
  },
  betabloqueadores: {
    whatItDoes: 'Os betabloqueadores reduzem a ação do sistema nervoso simpático no coração, diminuindo frequência, contratilidade e condução AV. Cada fármaco tem seletividade e duração diferentes.',
    keyPoints: ['Página de classe — ver atenolol, propranolol, esmolol, sotalol.', 'Sotalol também bloqueia potássio (classe III).', 'Cautela com diltiazem/verapamil — efeitos aditivos.'],
  },
  atenolol: {
    whatItDoes: 'O atenolol bloqueia principalmente receptores β1 do coração, reduzindo frequência e contratilidade com menos efeito brônquico que propranolol.',
    keyPoints: ['Eliminação renal — ajustar em DRC.', 'HCM pré-clínica: não benefício universal de sobrevida.', 'Dose felina frequentemente fixa por gato.'],
  },
  propranolol: {
    whatItDoes: 'O propranolol bloqueia β1 e β2, reduzindo taquicardia e consumo de oxigênio miocárdico. Útil em tireotoxicose, mas pior escolha em asma.',
    keyPoints: ['Não seletivo — broncoconstrição possível.', 'Reduz clearance de lidocaína.', 'Cautela com bloqueadores de cálcio.'],
  },
  esmolol: {
    whatItDoes: 'O esmolol é betabloqueador ultracurto — ideal para titular bloqueio β em paciente instável porque o efeito desaparece minutos após parar a infusão.',
    keyPoints: ['Bolus + CRI — atenção µg/kg/min.', 'Interromper infusão reverte efeito rapidamente.', 'Duas faixas de titulação publicadas — não fundir.'],
  },
  sotalol: {
    whatItDoes: 'O sotalol combina bloqueio β com bloqueio de canais de potássio, prolongando repolarização. Muito usado em arritmias ventriculares como ARVC em Boxers.',
    keyPoints: ['Monitorar QT/QTc e potássio.', 'Risco de torsades com hipocalemia.', 'Acumula em DRC.'],
  },
  atropina: {
    whatItDoes: 'A atropina bloqueia a ação parassimpática no coração, aumentando frequência sinusal e condução AV — útil em bradicardia vagal e como teste diagnóstico.',
    keyPoints: ['RECOVER 2024: dose única na RCP.', 'Não atropinizar automaticamente bradicardia por α2.', 'Doses muito baixas podem piorar bradicardia temporariamente.'],
  },
  lidocaina: {
    whatItDoes: 'A lidocaína bloqueia canais de sódio em tecido ventricular irritável (antiarrítmico) ou em nervos (anestesia local). São usos clínicos distintos com doses diferentes.',
    keyPoints: ['VT sintomática canina: 1ª linha IV.', 'Gatos: doses sistêmicas muito menores.', 'Não tratar VPC/AIVR estável automaticamente.'],
  },
  benazepril: {
    whatItDoes: 'O benazepril reduz a formação de angiotensina II, substância que contrai vasos e favorece retenção de sal e água. Isso ajuda a diminuir a pressão sobre o coração e, em contextos selecionados, a perda de proteína pelos rins.',
    keyPoints: ['Pressão, creatinina e potássio precisam ser acompanhados.', 'Desidratação aumenta o risco de queda da função renal.', 'O benefício depende da doença e do estágio.'],
  },
  pimobendan: {
    whatItDoes: 'O pimobendan ajuda o coração a contrair com mais eficiência e, ao mesmo tempo, relaxa vasos sanguíneos. Com isso, pode melhorar o fluxo de sangue sem aumentar proporcionalmente o consumo de energia pelo músculo cardíaco.',
    keyPoints: ['A indicação depende do tipo e estágio da cardiopatia.', 'Não é apropriado para toda doença cardíaca.', 'Ecocardiograma e reavaliações orientam o uso.'],
  },
  benzafibrato: {
    whatItDoes: 'O bezafibrato ativa reguladores do metabolismo de gorduras, ajudando o organismo a reduzir triglicérides e modificar o transporte de lipídios. Na veterinária, seu uso exige seleção e acompanhamento do paciente.',
    keyPoints: ['Confirmar a grafia e o princípio ativo da apresentação.', 'Perfil lipídico e enzimas hepáticas orientam a resposta.', 'Pode haver uso extrabula em medicina veterinária.'],
  },
  'same-sadenosilmetionina': {
    whatItDoes: 'A S-adenosil-L-metionina participa do metabolismo da metionina e ajuda a manter glutationa e reações de metilação no fígado. É usada como adjuvante antioxidante, não como tratamento da causa da hepatopatia.',
    keyPoints: ['Cães: ~20 mg/kg/dia em jejum; gatos: 20 mg/kg com faixas publicadas maiores.', 'Formulações diferentes não são equivalentes mg por mg.', 'Não substitui N-acetilcisteína na intoxicação por paracetamol.'],
  },
  'suplementos-hepaticos-silimarina': {
    whatItDoes: 'Silimarina é extrato complexo do cardo-mariano; silibina é o componente ativo principal. Podem atuar como antioxidantes hepáticos, mas a dose depende totalmente da formulação — extrato, silibina pura e silibina-fosfatidilcolina não são intercambiáveis.',
    keyPoints: ['5–15 mg/kg de extrato ≠ 1–2 mg/kg de silibina isolada.', 'Fitossoma silibina-fosfatidilcolina tem biodisponibilidade muito maior.', 'Produtos mistos comerciais: seguir rótulo, não literatura de silimarina pura.'],
  },
  'acido-ursodesoxicolico': {
    whatItDoes: 'O ácido ursodesoxicólico torna a bile menos agressiva e favorece seu fluxo. Também pode exercer efeitos protetores sobre células do fígado e das vias biliares em doenças nas quais não existe obstrução completa.',
    keyPoints: ['Obstrução biliar completa deve ser descartada.', 'A administração com alimento costuma ser útil.', 'Exames e imagem orientam duração e resposta.'],
  },
  'n-acetilcisteina': {
    whatItDoes: 'A N-acetilcisteína ajuda a repor glutationa, importante defesa antioxidante do organismo. Também quebra ligações do muco, deixando secreções respiratórias menos espessas, e tem papel específico em algumas intoxicações.',
    keyPoints: ['O protocolo muda conforme a indicação.', 'Intoxicações podem exigir dose de ataque e manutenção.', 'A via intravenosa requer administração e monitoramento cuidadosos.'],
  },
  clindamicina: {
    whatItDoes: 'A clindamicina impede a síntese de proteínas bacterianas ao se ligar ao ribossomo. Penetra bem em osso, abscessos e tecidos intracelulares, sendo útil contra cocos Gram-positivos, anaeróbios e protozoários como Toxoplasma e Neospora.',
    keyPoints: ['Não cobre bacilos Gram-negativos aeróbios — evitar monoterapia quando estes são prováveis.', 'Gatos: nunca dar comprimido ou cápsula “a seco”.', 'Piodermite superficial: terapia tópica costuma ser prioridade (ISCAID 2025).'],
  },
  metronidazol: {
    whatItDoes: 'O metronidazol age contra anaeróbios e alguns protozoários ao danificar o ácido desoxirribonucleico bacteriano após redução do grupo nitro dentro da célula. Também altera o microbioma intestinal.',
    keyPoints: ['Não usar rotineiramente em todo cão com diarreia aguda leve.', 'Neurotoxicidade pode ocorrer em doses menores que as antigas consideradas “seguras”.', 'Diferenciar metronidazol base de metronidazol benzoato no calculador.'],
  },
  fenbendazol: {
    whatItDoes: 'O fenbendazol bloqueia a formação de microtúbulos nos parasitas, prejudicando transporte interno e uso de energia. É um dos vermífugos com maior margem de segurança em cães e gatos.',
    keyPoints: ['Giardíase: 50 mg/kg uma vez ao dia (CAPC 2026).', 'Administrar preferencialmente com alimento.', 'Não é escolha confiável para Dipylidium — preferir praziquantel e controle de pulgas.'],
  },
  praziquantel: {
    whatItDoes: 'O praziquantel provoca alteração rápida do fluxo de cálcio na superfície dos platelmintos, levando a contração muscular, dano tegumentar e eliminação do parasita. É o principal cestocida em pequenos animais.',
    keyPoints: ['Cestódeos intestinais: 5 mg/kg por via oral em dose única.', 'Dipylidium exige controle simultâneo de pulgas.', 'Não extrapolar segurança de produtos combinados (febantel, emodepside).'],
  },
  enrofloxacina: {
    whatItDoes: 'A enrofloxacina impede a replicação do ácido desoxirribonucleico bacteriano ao bloquear enzimas essenciais (girase e topoisomerase). É bactericida dependente da concentração, com boa penetração tecidual.',
    keyPoints: ['Gatos: nunca exceder 5 mg/kg por dia — risco de degeneração retiniana irreversível.', 'Reservar para infecções realmente indicadas; não é primeira linha em cistite simples ou piodermite superficial.', 'Separar de ferro, cálcio e antiácidos por ~2 horas.'],
  },
  marbofloxacina: {
    whatItDoes: 'A marbofloxacina também bloqueia a replicação do ácido desoxirribonucleico bacteriano, com excelente biodisponibilidade oral e meia-vida longa que favorece administração uma vez ao dia.',
    keyPoints: ['Doses de bula (2,75–5,5 mg/kg) e BSAVA (2 mg/kg) não devem ser fundidas automaticamente.', 'Piodermite estafilocócica quando fluoroquinolona é necessária: ~5,5 mg/kg uma vez ao dia (ISCAID 2025).', 'Evitar em filhotes em rápido crescimento.'],
  },
  ciprofloxacina: {
    whatItDoes: 'A ciprofloxacina é uma fluoroquinolona humana que também pode ser metabólito ativo da enrofloxacina. Em cães e gatos, a absorção oral é baixa e imprevisível — não substitui fluoroquinolonas veterinárias mg por mg.',
    keyPoints: ['Alerta no topo: não tratar como “enrofloxacina barata”.', 'Oral em cães: só confiável para isolados extremamente suscetíveis (concentração inibitória mínima ≤0,06 µg/mL).', 'Via oral felina: biodisponibilidade muito baixa — evitar como padrão.'],
  },
  selegilina: {
    whatItDoes: 'A selegilina bloqueia de forma irreversível a monoamina oxidase tipo B, aumentando dopamina no cérebro. É aprovada para disfunção cognitiva canina, mas não trata adequadamente o hiperadrenocorticismo.',
    keyPoints: ['0,5–1 mg/kg uma vez ao dia, preferencialmente pela manhã.', 'Não combinar com fluoxetina ou amitriptilina.', 'Após fluoxetina: aguardar 6 semanas antes de iniciar selegilina.'],
  },
  fluoxetina: {
    whatItDoes: 'A fluoxetina impede a recaptação de serotonina, mas o efeito comportamental completo demora semanas. Para ansiedade de separação canina, funciona melhor junto com modificação comportamental estruturada.',
    keyPoints: ['Cães: 1–2 mg/kg/dia; doses de 2–4 mg/kg aumentam efeitos adversos.', 'Não substitui terapia comportamental.', 'Contraindicada em cães com epilepsia (bula Reconcile).'],
  },
  amitriptilina: {
    whatItDoes: 'A amitriptilina é um antidepressivo tricíclico que age em serotonina, noradrenalina e vários outros receptores — causa mais sedação e efeitos anticolinérgicos que a fluoxetina.',
    keyPoints: ['Cistite idiopática aguda: ensaios negativos — não usar rotineiramente.', 'Transdérmica em gatos: absorção ruim vs oral.', 'Evitar combinação com selegilina ou fluoxetina.'],
  },
  amantadina: {
    whatItDoes: 'A amantadina reduz a sensibilização central da dor ao bloquear parcialmente receptores N-metil-D-aspartato. Funciona como adjuvante antihiperalgésico, não como analgésico forte isolado.',
    keyPoints: ['Osteoartrite canina refratária: 3–5 mg/kg/dia com anti-inflamatório.', 'Lombossacral: 3 mg/kg a cada 12 horas estudado em 2025.', 'Meia-vida ~5 h — debate uma vs duas vezes ao dia.'],
  },
};

export function getSimplifiedMedicationDefinition(slug: string): SimplifiedMedicationDefinition | null {
  return DEFINITIONS[slug] || null;
}
