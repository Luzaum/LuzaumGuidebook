/**
 * Dicionário de definições simplificadas para as doenças do Consulta Vet.
 * Fornece uma linguagem clara, humana e acessível antes de entrar nos detalhes técnicos.
 */
export const SIMPLIFIED_DISEASE_DEFINITIONS: Record<string, {
  whatIsIt: string;
  keyPoints: string[];
}> = {
  'colapso-traqueal-canino': {
    whatIsIt: 'O colapso traqueal é o amolecimento e enfraquecimento progressivo dos anéis cartilaginosos da traqueia. Isso faz com que ela perda o formato tubular e se achate durante a respiração, provocando uma tosse seca e alta, muito parecida com o som de um ganso ("goose honk").',
    keyPoints: [
      'Afeta principalmente cães de raças pequenas e miniaturas (como Yorkshire e Poodle).',
      'A tosse é desencadeada por excitação, exercício físico, calor ou tração na coleira.',
      'O controle do peso corporal e o uso de peitoral (nunca coleira de pescoço) são fundamentais.',
    ],
  },
  'fistula-perianal-furunculose-anal': {
    whatIsIt: 'A fístula perianal (ou furunculose anal) é uma ferida profunda, dolorosa e inflamada na região ao redor do ânus. É causada por uma resposta desregulada do próprio sistema de defesa do animal (doença imunomediada) que ataca os tecidos locais.',
    keyPoints: [
      'Altamente frequente e clássica em cães da raça Pastor Alemão.',
      'Causa muita dor ao evacuar, lambedura constante da região e sangramentos.',
      'O tratamento baseia-se em medicamentos moduladores da imunidade (como a ciclosporina).',
    ],
  },
  'erliquiose-monocitica-canina': {
    whatIsIt: 'A erliquiose é uma doença infecciosa grave transmitida pela picada do carrapato. A bactéria infecta os glóbulos brancos e afeta a produção de plaquetas, comprometendo a coagulação do sangue e a imunidade do cão.',
    keyPoints: [
      'Pode causar febre, perda de apetite, sangramento nasal e manchas avermelhadas na pele.',
      'Possui fases aguda, subclínica (silenciosa) e crônica.',
      'O diagnóstico precoce e o tratamento com antibióticos específicos (doxiciclina) oferecem cura.',
    ],
  },
  'micoplasmoses-hemotropicas': {
    whatIsIt: 'A micoplasmose hemotrópica (antigamente chamada de hemobartonelose) é uma infecção causada por bactérias que se fixam na superfície dos glóbulos vermelhos do sangue. Isso faz com que o próprio corpo do animal destrua essas células, gerando anemia grave.',
    keyPoints: [
      'Muito comum em gatos ("Anemia Infecciosa Felina"), frequentemente transmitida por pulgas.',
      'Os principais sinais são palidez na boca, fraqueza, febre e apatia extrema.',
      'Gatos positivos para FeLV ou FIV têm maior risco de descompensação.',
    ],
  },
  'leishmaniose-visceral-canina': {
    whatIsIt: 'A leishmaniose é uma doença parasitária sistêmica crônica transmitida pela picada do mosquito-palha infectado. O parasita se espalha pelo organismo do animal, danificando múltiplos órgãos (como rins, pele, fígado e baço).',
    keyPoints: [
      'Gera lesões de pele típicas (descamação, feridas na orelha e focinho) e crescimento exagerado das unhas.',
      'É uma zoonose (pode ser transmitida a seres humanos através do mosquito).',
      'Exige monitoramento e tratamento contínuos para manter o cão estável e sem transmitir.',
    ],
  },
  'doenca-renal-cronica-caes-gatos': {
    whatIsIt: 'A Doença Renal Crônica (DRC) é a perda lenta, progressiva e irreversível da função dos rins. Os rins perdem a capacidade de filtrar as toxinas do sangue e de concentrar a urina, acumulando resíduos metabólicos no corpo.',
    keyPoints: [
      'Extremamente comum em cães e gatos idosos.',
      'Os sinais típicos são aumento na ingestão de água, urina muito clara e frequente, vômitos e perda de peso.',
      'O controle é feito com alimentação especial (dieta renal), hidratação adequada e manejo de pressão.',
    ],
  },
  'hipertensao-arterial-sistemica': {
    whatIsIt: 'A hipertensão arterial é a elevação persistente da pressão sanguínea nas artérias do cão ou gato. Geralmente ocorre como consequência de outras doenças (como doença renal crônica ou Cushing) e ataca órgãos vitais de forma silenciosa.',
    keyPoints: [
      'Conhecida como "inimiga silenciosa" pois não apresenta sintomas visíveis no início.',
      'Pode causar lesões súbitas e graves nos olhos (cegueira repentina), rins, coração e cérebro.',
      'A aferição preventiva da pressão é obrigatória em pacientes geriatras ou nefropatas.',
    ],
  },
  'doenca-valvar-mitral-degenerativa': {
    whatIsIt: 'A Doença Valvar Mitral Degenerativa (DMVD) é o desgaste e a deformação progressiva de uma das válvulas do coração. Isso impede o fechamento correto da válvula, provocando um refluxo de sangue (que gera o "sopro" cardíaco) e forçando o coração a trabalhar mais.',
    keyPoints: [
      'A doença cardíaca mais comum em cães, principalmente de pequeno porte (como Poodle e Pinscher).',
      'Pode evoluir para acúmulo de líquido nos pulmões (edema pulmonar / insuficiência cardíaca).',
      'Monitorada com exames de ecocardiograma e tratada com medicamentos cardioprotetores e diuréticos.',
    ],
  },
  'hiperadrenocorticismo-cushing': {
    whatIsIt: 'O hiperadrenocorticismo (ou Síndrome de Cushing) é o excesso crônico do hormônio cortisol no sangue. Geralmente é provocado por um pequeno tumor benigno na glândula hipófise ou nas glândulas adrenais, acelerando o metabolismo de forma desregulada.',
    keyPoints: [
      'Cães afetados bebem muita água, urinam em excesso e têm fome constante (apetite voraz).',
      'Provoca aumento característico da barriga ("abdômen penduloso") e queda de pelos simétrica.',
      'O controle é medicamentoso para reduzir a produção de cortisol e restaurar a qualidade de vida.',
    ],
  },
  'hipoadrenocorticismo-addison': {
    whatIsIt: 'O hipoadrenocorticismo (ou Doença de Addison) é a falta de produção dos hormônios cortisol e aldosterona pelas glândulas adrenais. Sem eles, o organismo do cão não consegue lidar com situações de estresse e perde o controle da hidratação e dos sais minerais do corpo.',
    keyPoints: [
      'Conhecido como "o grande imitador" por apresentar sintomas vagos que parecem outras doenças.',
      'Causa episódios cíclicos de fraqueza, tremores, vômitos, diarreias e colapso circulatório repentino.',
      'O tratamento é a reposição hormonal diária e controle rigoroso de eletrólitos (sódio e potássio).',
    ],
  },
  'hipertireoidismo-felino': {
    whatIsIt: 'O hipertireoidismo é a produção excessiva e descontrolada de hormônios pela glândula tireoide. Isso deixa o metabolismo do gato extremamente acelerado, fazendo com que o organismo funcione em "alta rotação" constantemente.',
    keyPoints: [
      'Gatos afetados perdem peso rapidamente mesmo comendo muito mais que o normal (polifagia).',
      'Causa hiperatividade, agitação, miados noturnos e pelagem opaca/emaranhada.',
      'Pode mascarar problemas nos rins (DRC); restabelecer o equilíbrio da tireoide exige atenção renal.',
    ],
  },
  'hipotireoidismo-canino': {
    whatIsIt: 'O hipotireoidismo é a produção insuficiente de hormônios pela glândula tireoide em cães. Com a falta desses hormônios, o ritmo do metabolismo diminui drasticamente, deixando o organismo do animal lento e preguiçoso.',
    keyPoints: [
      'Gera ganho de peso sem aumento na alimentação, desânimo, fraqueza e busca por locais quentes.',
      'Causa alterações na pele, infecções e a característica "expressão facial trágica".',
      'O tratamento é simples e extremamente eficaz, baseado na reposição oral diária do hormônio tireoidiano.',
    ],
  },
};

/**
 * Retorna a definição simplificada para o slug fornecido.
 */
export function getSimplifiedDiseaseDefinition(slug: string) {
  return SIMPLIFIED_DISEASE_DEFINITIONS[slug] || null;
}
