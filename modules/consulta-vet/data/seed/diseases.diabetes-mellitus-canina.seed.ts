import { DiseaseRecord } from '../../types/disease';

/** Diabetes mellitus canina - ficha editorial para ConsultaVET. */
export const diabetesMellitusCaninaRecord: DiseaseRecord = {
  id: 'disease-diabetes-mellitus-canina',
  slug: 'diabetes-mellitus-canina',
  title: 'Diabetes Mellitus em Cães',
  synonyms: ['Diabetes canina', 'DM canina', 'Diabetes mellitus canina', 'Canine diabetes mellitus'],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Insulina',
    'PU/PD',
    'Hiperglicemia',
    'Glicosuria',
    'Catarata',
    'Cetoacidose',
    'Pancreatite',
    'HAC',
    'Hipotireoidismo',
    'Diestrus',
  ],
  quickSummary:
    'Diabetes mellitus canina é uma síndrome endócrino-metabólica causada por deficiência absoluta ou relativa de ação da insulina. A consequência é hiperglicemia persistente; quando a glicose ultrapassa o limiar renal, surge glicosúria com diurese osmótica, poliúria, polidipsia, desidratação e perda calórica urinária. O cão típico apresenta poliúria/polidipsia, polifagia, perda de peso, fraqueza e catarata bilateral de instalação rápida. Diferentemente do gato, a maioria dos cães apresenta perda funcional importante de células beta e precisa de insulinoterapia por toda a vida, exceto quando há diabetes secundária reversível reconhecida muito cedo. O manejo clínico combina confirmação diagnóstica, insulinoterapia segura, dieta e exercício consistentes, controle de comorbidades e monitoramento para evitar hipoglicemia, cetoacidose diabética e complicações infecciosas.',
  quickDecisionStrip: [
    'Diagnóstico: sinais compatíveis + hiperglicemia persistente + glicosúria; fructosamina ajuda quando há dúvida.',
    'Meta clínica: resolver poliúria/polidipsia, estabilizar peso e energia, sem hipoglicemia.',
    'Meta glicêmica prática: nadir geralmente em torno de 80–150 mg/dL e maior parte do dia abaixo do limiar renal, evitando quedas rápidas.',
    'Primeira linha em cão estável: insulina lente porcina ou NPH, geralmente 0,25–0,5 U/kg SC a cada 12 h, com duas refeições iguais.',
    'Cetonas, vômitos, anorexia, desidratação ou depressão = investigar cetoacidose diabética e considerar internação.',
  ],
  quickSummaryRich: {
    lead:
      'Diabetes mellitus canina é uma doença de deficiência de ação insulinica que leva a hiperglicemia persistente, glicosuria, perda de água e calorias pela urina e catabolismo. O fenótipo canino clássico é insulinodependente, crônico e com risco alto de catarata diabética; o sucesso do tratamento é medido por controle de sinais clínicos e segurança, não por “normalizar” todos os valores de glicose.',
    leadHighlights: ['hiperglicemia persistente', 'glicosuria', 'insulinodependente', 'catarata diabética'],
    pillars: [
      {
        title: 'Definição clínica',
        body: 'Hiperglicemia sustentada por deficiência de insulina, com glicosúria e sinais de diurese osmótica. A maioria dos cães exige insulina por toda a vida.',
        highlights: ['Hiperglicemia', 'glicosúria', 'insulina'],
      },
      {
        title: 'Alvos úteis',
        body: 'Melhora de PU/PD, ganho ou estabilização de peso, apetite controlado, ausência de cetonas e ausência de hipoglicemia. Em curvas, buscar nadir seguro e duração adequada da insulina.',
        highlights: ['PU/PD', 'cetonas', 'hipoglicemia'],
      },
      {
        title: 'Complicações principais',
        body: 'Catarata, infecção urinária, pancreatite, cetoacidose diabética, hipoglicemia iatrogênica e resistência insulinica por HAC, hipotireoidismo, diestrus, obesidade ou infecção.',
        highlights: ['Catarata', 'cetoacidose', 'resistência insulinica'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico',
      steps: [
        {
          label: '1. Reconhecer síndrome diabética',
          detail: 'PU/PD, polifagia, perda de peso, catarata, fraqueza, infecção urinária recorrente, histórico de glicocorticoide/progestágeno ou cadela em diestrus.',
        },
        {
          label: '2. Confirmar hiperglicemia persistente',
          detail: 'Glicemia elevada em mais de uma ocasião ou claramente persistente no contexto clínico; associar urinálise com glicosúria. Fructosamina documenta média glicêmica recente.',
        },
        {
          label: '3. Estadiar gravidade',
          detail: 'Pesquisar cetonúria/cetonemia, desidratação, acidose, hipocalemia/hipofosfatemia, azotemia, pancreatite, infecção e capacidade de alimentação.',
        },
        {
          label: '4. Procurar causa de resistência',
          detail: 'HAC, hipotireoidismo, diestrus, gestação, piometra, pancreatite, infecção urinária, doença dental, obesidade e fármacos diabetogênicos.',
        },
        {
          label: '5. Planejar monitoramento',
          detail: 'Curva domiciliar, CGM ou curva hospitalar com cautela; correlacionar nadir, duração, sinais clínicos, peso, água ingerida e eventos de hipoglicemia.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico',
      steps: [
        {
          label: '1. Paciente estável',
          detail: 'Iniciar insulina basal/intermediária, dieta consistente, exercício previsível e retorno em 7–14 dias para ajuste.',
        },
        {
          label: '2. Paciente cetótico ou doente',
          detail: 'Internar se houver anorexia, vômito, desidratação, depressão, acidose ou distúrbio eletrolítico; priorizar fluido, eletrólitos e insulina regular/lispro conforme protocolo.',
        },
        {
          label: '3. Ajuste de dose',
          detail: 'Ajustar com base em sinais clínicos, peso, nadir e duração. Evitar aumentos por um valor isolado alto.',
        },
        {
          label: '4. Caso não regulado',
          detail: 'Auditar seringa, concentração, armazenamento, técnica, refeições, petiscos, exercício e comorbidades antes de trocar a insulina.',
        },
        {
          label: '5. Seguimento crônico',
          detail: 'Revisões periódicas com peso, exame físico, urinálise/cultura se indicado, fructosamina ou curva/CGM, pressão arterial e rastreio de complicações.',
        },
      ],
    },
  },
  etiology: {
    mecanismos:
      'A DM canina geralmente decorre de perda ou falência importante das células beta pancreáticas, levando a deficiência absoluta de insulina. Pancreatite crônica recidivante, destruição imunomediada suspeita, degeneração de ilhotas e fatores genéticos são mecanismos descritos. Diabetes secundária pode ocorrer quando resistência insulinica intensa supera a reserva beta.',
    fatoresPredisponentes: [
      'Pancreatite aguda ou crônica: pode destruir tecido endócrino e precipitar cetoacidose.',
      'Hiperadrenocorticismo: cortisol antagoniza insulina e é causa clássica de diabetes difícil.',
      'Diestrus, gestação e progestágenos: progesterona induz hormônio do crescimento mamário em cadelas, aumentando resistência insulinica.',
      'Glicocorticoides sistêmicos, tópicos extensos ou de depósito podem precipitar diabetes em cães predispostos.',
      'Hipotireoidismo, obesidade, infecção urinária, doença periodontal e inflamação crônica aumentam resistência insulinica.',
      'Predisposição racial descrita em populações inclui Poodle, Schnauzer, Samoieda, Terrier, Beagle, Bichon Frise, Yorkshire Terrier e West Highland White Terrier, mas qualquer raça pode ser acometida.',
    ],
  },
  epidemiology: {
    perfil:
      'Afeta principalmente cães adultos a idosos. Fêmeas inteiras têm risco particular por diestrus/progesterona. A doença é frequentemente diagnosticada em consulta por PU/PD ou no atendimento de urgência por cetoacidose.',
    comparacaoComGatos:
      'No gato, a resistência insulinica e a toxicidade glicêmica podem ser revertidas com remissão. No cão, a recuperação beta sustentada é incomum; a expectativa clínica deve ser tratamento crônico com insulina.',
  },
  pathogenesisTransmission: {
    patogenese: [
      'Insulina insuficiente reduz captação periférica de glicose e aumenta gliconeogênese/glicogenólise hepática.',
      'Hiperglicemia sustentada ultrapassa o limiar renal e causa glicosúria.',
      'Glicosúria gera diurese osmótica, perda de água e eletrólitos, poliúria e polidipsia.',
      'Perda de glicose pela urina e catabolismo proteico/lipídico causam perda de peso e fraqueza.',
      'Lipólise sem freio insulinico aumenta produção de corpos cetônicos; desidratação e doença intercurrente favorecem cetoacidose.',
      'No cristalino, glicose em excesso vira sorbitol, provocando edema osmótico e catarata diabética.',
    ],
    transmissao:
      'Não é doença contagiosa nem zoonose. O risco é metabólico, endócrino, inflamatório, medicamentoso e genético.',
  },
  pathophysiology:
    'A falta de insulina impede o uso adequado da glicose e favorece hiperglicemia persistente. Quando a glicose passa do limiar renal, o rim elimina glicose e água, levando a PU/PD, desidratação e perda de eletrólitos. Como o animal perde calorias na urina e não consegue usar glicose adequadamente, ocorre polifagia com emagrecimento. A lipólise aumenta ácidos graxos livres e cetogênese; se houver acidose, desidratação e distúrbios eletrolíticos, instala-se cetoacidose diabética. A catarata canina é particularmente importante e pode surgir rapidamente por acúmulo de sorbitol no cristalino.',
  clinicalSignsPathophysiology: [
    {
      system: 'metabolic',
      findings: [
        'Poliúria e polidipsia por glicosúria e diurese osmótica.',
        'Polifagia com perda de peso por perda calórica urinária e catabolismo.',
        'Letargia e perda muscular por proteólise e desidratação.',
      ],
    },
    {
      system: 'ocular',
      findings: [
        'Catarata bilateral de instalação rápida; pode ser a queixa inicial.',
        'Uveíte facolítica secundária exige avaliação oftalmológica e controle inflamatório.',
      ],
    },
    {
      system: 'urinary-infectious',
      findings: [
        'Glicosúria favorece infecção urinária; cultura é indicada em pacientes sintomáticos, difíceis de regular ou com sedimento sugestivo.',
        'Infecções cutâneas, dentais ou urinárias aumentam resistência insulinica.',
      ],
    },
    {
      system: 'emergency',
      findings: [
        'Cetoacidose: anorexia, vômitos, desidratação, dor abdominal, taquipneia, hálito cetônico, depressão e colapso.',
        'Hipoglicemia: fome, inquietação, fraqueza, ataxia, tremores, convulsão ou coma.',
      ],
    },
  ],
  diagnosis: {
    criterios:
      'Confirmar com sinais clínicos compatíveis, hiperglicemia persistente e glicosúria. Em cães sintomáticos, glicemias repetidamente acima do intervalo de referência associadas a glicosúria sustentam o diagnóstico. Fructosamina elevada reforça hiperglicemia dos últimos dias/semanas e ajuda quando há dúvida.',
    examesIniciais: [
      'Glicemia, urinálise completa, cetonas urinárias ou beta-hidroxibutirato quando disponível.',
      'Hemograma, bioquímica, eletrólitos, albumina/proteínas, colesterol/triglicerídeos.',
      'Fructosamina como linha de base e suporte diagnóstico.',
      'Cultura urinária quando há piúria/bacteriúria, sinais urinários, controle ruim ou recorrência.',
      'cPLI/ultrassom se pancreatite for provável; pressão arterial e UPC se houver DRC/proteinúria/hipertensão.',
      'Testes para HAC ou hipotireoidismo apenas quando há sinais e dados laboratoriais compatíveis.',
    ],
    metasTabela: {
      kind: 'clinicalTable' as const,
      headers: ['Parâmetro', 'Meta prática', 'Como usar'],
      rows: [
        ['Sinais clínicos', 'PU/PD controladas, apetite menos voraz, peso estável ou subindo se estava magro.', 'É o principal indicador de sucesso junto com segurança.'],
        ['Glicemia pré-insulina', 'Frequentemente ainda elevada; interpretar com curva e sinais.', 'Não ajustar dose só pelo valor pré-aplicação.'],
        ['Nadir da curva', 'Aproximadamente 80–150 mg/dL em muitos protocolos; evitar <80 mg/dL.', 'Define segurança e magnitude do ajuste.'],
        ['Duração da insulina', 'Idealmente cobre a maior parte do intervalo de 12 h.', 'Se duração curta, considerar ajuste ou troca de tipo.'],
        ['Fructosamina', 'Tendência compatível com melhora clínica, sem buscar normalidade absoluta.', 'Útil para média, mas não detecta hipoglicemia pontual.'],
        ['Cetonas', 'Negativas em paciente ambulatorial estável.', 'Positivas com sinais sistêmicos indicam urgência.'],
      ],
    },
    diagnosticosDiferenciaisEComorbidades: {
      kind: 'clinicalTable' as const,
      headers: ['Condição', 'Por que importa', 'Pista prática'],
      rows: [
        ['Hiperadrenocorticismo', 'Causa PU/PD, polifagia e resistência insulinica.', 'Abdômen pendular, FA alta, pele fina, alopecia, controle difícil.'],
        ['Hipotireoidismo', 'Pode causar dislipidemia e resistência insulinica.', 'Ganho de peso, letargia, dermatopatia, T4L baixo + cTSH alto.'],
        ['Pancreatite', 'Precipita diabetes e CAD.', 'Vômitos, dor abdominal, anorexia, cPLI/ultrassom compatíveis.'],
        ['Diestrus/piometra', 'Progesterona e inflamação antagonizam insulina.', 'Fêmea inteira, histórico reprodutivo, secreção, útero alterado.'],
        ['Infecção urinária', 'Comum por glicosúria e pode ser subclínica.', 'Sedimento, cultura, controle glicêmico instável.'],
      ],
    },
    criteriosInternacao: [
      'Anorexia, vômitos, desidratação, depressão, dor abdominal ou alteração respiratória.',
      'Cetonemia/cetonúria moderada a intensa, acidose ou distúrbios de potássio/fósforo.',
      'Hipoglicemia sintomática, convulsão ou incapacidade de manejo domiciliar seguro.',
      'Suspeita de pancreatite grave, sepse, piometra, AKI ou HHS.',
    ],
  },
  treatment: {
    objetivo:
      'O objetivo é controlar sinais clínicos e prevenir complicações, mantendo margem de segurança contra hipoglicemia. Em cães, o tratamento padrão é insulina + dieta/rotina + manejo de comorbidades.',
    ambulatorialInicial: [
      'Insulina: NPH ou lente porcina são escolhas iniciais comuns. Dose inicial usual: 0,25–0,5 U/kg SC a cada 12 h, individualizando risco de hipoglicemia, porte, alimentação e gravidade.',
      'Alimentação: duas refeições de calorias semelhantes, dadas imediatamente antes ou junto da aplicação quando o cão está comendo bem.',
      'Dieta: evitar açúcares simples e alimentos semiúmidos; usar dieta com fibra/complexos carboidratos conforme escore corporal, pancreatite, palatabilidade e condição nutricional.',
      'Exercício: rotina diária previsível; exercício intenso inesperado pode precipitar hipoglicemia.',
      'Primeiro retorno: geralmente em 7–14 dias, mais cedo se sinais de hipoglicemia, cetonas, vômito ou anorexia.',
    ],
    insulinoterapiaTabela: {
      kind: 'clinicalTable' as const,
      headers: ['Insulina', 'Uso no cão', 'Pontos críticos'],
      rows: [
        ['Lente porcina', 'Opção veterinária comum de primeira linha; geralmente q12h.', 'Usar seringa correta para a concentração; agitar conforme bula; avaliar nadir/duração.'],
        ['NPH', 'Alternativa amplamente usada; geralmente q12h.', 'Pode ter duração insuficiente em alguns cães; monitorar curva.'],
        ['Detemir', 'Opção para controle ruim com NPH/lente.', 'Mais potente; iniciar baixo, por exemplo 0,1 U/kg q12h em muitas referências.'],
        ['Glargina/PZI', 'Podem ser usadas em casos selecionados.', 'Menos padronizadas como primeira linha canina; usar com monitoramento próximo.'],
        ['Regular/lispro', 'Hospitalar para CAD/HHS.', 'Não é manutenção domiciliar; exige glicemia e eletrólitos seriados.'],
      ],
    },
    ajusteDose: [
      'Não aumentar dose por uma glicemia isolada alta.',
      'Se nadir <80 mg/dL ou houver sinais de hipoglicemia: reduzir dose e revisar alimentação/exercício.',
      'Se nadir adequado mas hiperglicemia retorna cedo: duração curta; considerar troca de insulina ou estratégia com especialista.',
      'Se nadir alto e sinais persistem: aumentar em incrementos conservadores, geralmente 10–25%, reavaliando em 1–2 semanas.',
      'Se dose ultrapassa cerca de 1,5 U/kg q12h sem controle: auditar técnica e pesquisar resistência insulinica antes de escalar.',
    ],
    monitoramento: [
      'Casa: ingestão de água, volume urinário, apetite, peso semanal, energia, vômitos, sinais neurológicos e episódios de fraqueza.',
      'Clínica: peso, exame físico, curva glicêmica ou CGM, fructosamina, urinálise/cultura se indicado, eletrólitos e avaliação de comorbidades.',
      'Curva: medir antes da refeição/insulina e a cada 2 h por 10–12 h quando possível; identificar nadir, duração e hipoglicemia.',
      'CGM: útil para padrões e hipoglicemia oculta; confirmar leituras baixas com glicosímetro quando houver discordância clínica.',
      'Paciente estável: reavaliar periodicamente a cada 3–6 meses ou antes se sinais retornarem.',
    ],
    hipoglicemia: {
      kind: 'clinicalTable' as const,
      headers: ['Situação', 'Conduta'],
      rows: [
        ['Consciente e consegue engolir', 'Oferecer alimento; se sinais persistirem, mel/glicose na mucosa e atendimento.'],
        ['Convulsão, coma ou não consegue engolir', 'Glicose/mel na mucosa sem forçar deglutição e emergência imediata.'],
        ['Após episódio', 'Reduzir dose, revisar refeições, exercício, técnica, perda de peso recente e possibilidade de erro de seringa.'],
      ],
    },
    cetoacidose:
      'CAD é emergência. Prioridades: restauração de perfusão com cristaloide, correção gradual de desidratação, potássio e fósforo, controle de vômito/dor, insulina regular em CRI ou protocolo intermitente, monitoramento de glicose a cada 1–2 h, cetonas, eletrólitos e acidose. Evitar queda glicêmica >50–100 mg/dL/h; adicionar dextrose quando glicose cai para faixas intermediárias para permitir continuidade da insulina até controlar cetose.',
    altaPosCad: [
      'Transicionar para insulina de manutenção quando hidratado, comendo e sem piora de cetose/acidemia.',
      'Rever fator precipitante: pancreatite, infecção, piometra, omissão de insulina, erro de dose, HAC, doença renal.',
      'Ensinar plano escrito de hipoglicemia, armazenamento e aplicação antes da alta.',
    ],
  },
  prevention:
    'Não há prevenção garantida para a forma primária. Reduzir risco modificável: manter escore corporal adequado, evitar glicocorticoides/progestágenos sem necessidade, tratar pancreatite e infecções, castrar cadelas diabéticas após estabilização quando apropriado, controlar HAC/hipotireoidismo e orientar busca precoce diante de PU/PD, emagrecimento ou catarata súbita.',
  relatedDiseaseSlugs: [
    'hiperadrenocorticismo-sindrome-cushing',
    'hipotireoidismo-canino',
    'doenca-renal-cronica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: [],
  relatedConsensusSlugs: [],
  references: [
    {
      id: 'ref-aaha-diabetes-2018-2022',
      citationText: 'Behrend E et al. 2018 AAHA Diabetes Management Guidelines for Dogs and Cats. JAAHA. 2018;54(1):1-21.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/',
      notes: 'Diretriz central para cães e gatos; algoritmos de monitoramento, hipoglicemia e troubleshooting.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-merck-dm-dogs-cats',
      citationText: 'Merck Veterinary Manual. Diabetes Mellitus in Dogs and Cats. Reviewed/Revised May 2024; Modified May 2025.',
      sourceType: 'Revisão clínica',
      url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats',
      notes: 'Etiologia, insulinas, dieta, monitoramento, DKA e HHS.',
      evidenceLevel: 'B - referência prática',
    },
    {
      id: 'ref-vin-wsava-dog-dm-2018',
      citationText: 'Fleeman L. Tips from the Experts for the Approach and Management of Diabetes Mellitus in Dogs. WSAVA Congress Proceedings via VIN, 2018.',
      sourceType: 'VIN / congresso',
      url: 'https://veterinarypartner.vin.com/doc/?id=8896629&pid=22915',
      notes: 'Conteúdo público do ecossistema VIN; páginas VIN de membros podem exigir autenticação.',
      evidenceLevel: 'B/C - revisão especializada',
    },
    {
      id: 'ref-monitoring-dm-pmc',
      citationText: 'Cook AK. Monitoring methods for dogs and cats with diabetes mellitus. J Diabetes Sci Technol. 2012.',
      sourceType: 'Artigo de revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3440050/',
      notes: 'Curvas, fructosamina e monitoramento domiciliar.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-nelson-couto-dm',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Disorders of the Endocrine Pancreas.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Base clínica e fisiopatológica.',
      evidenceLevel: 'Referência secundária',
    },
    {
      id: 'ref-feldman-endocrinology-dm',
      citationText: 'Feldman EC, Nelson RW, Reusch CE, Scott-Moncrieff JCR. Canine and Feline Endocrinology, 4th ed., 2015.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Endocrinologia comparada, resistência insulinica e insulinoterapia.',
      evidenceLevel: 'Referência secundária',
    },
    {
      id: 'ref-plumb-insulins',
      citationText: "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook, 10th ed., 2023. Insulin monographs.",
      sourceType: 'Formulário',
      url: null,
      notes: 'Farmacologia, concentrações, seringas e segurança.',
      evidenceLevel: 'Referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
