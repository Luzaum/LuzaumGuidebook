import type { Disease } from '../../types'

export const gastrointestinalDiseases: Disease[] = [
  {
    name: 'Procedimentos em Cavidade Oral e Extração Dentária',
    pathogens:
      'Microbiota comensal oral complexa mista: Porphyromonas spp., Prevotella spp., Streptococcus spp., Fusobacterium spp., Peptostreptococcus spp.',
    firstLine: {
      title: 'Conduta Primária em Pacientes Saudáveis (ASA I/II)',
      presentation:
        'Procedimentos odontológicos de rotina e extrações em animais hígidos não necessitam de antibioticoterapia profilática ou pós-operatória.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'PACIENTES SAUDÁVEIS (ASA I/II): NÃO ADMINISTRAR ANTIMICROBIANOS SISTÊMICOS. Realizar antissepsia da cavidade oral com bochecho / gaze embebida em Clorexidina a 0,12% antes e após o procedimento mecânico. A bacteremia transitória pós-extração é resolvida rapidamente pelo sistema imune do hospedeiro.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Indicação Restrita em Pacientes de Alto Risco',
      presentation:
        'Profilaxia cirúrgica reservada estritamente para animais com osteomielite maxilar/mandibular, imunossupressão severa, cardiopatias com estenose subaórtica/risco de endocardite ou nefropatas crônicos descompensados.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Lincosamida de escolha para microbiota periodontal e penetração óssea; administrar dose pré-operatória 20 a 30 minutos antes do procedimento.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Alternativa de amplo espectro com excelente cobertura para bactérias anaeróbias orais.',
            },
          ],
        },
      ],
    },
    duration:
      'Pacientes saudáveis: ZERO dias. Pacientes de alto risco com profilaxia: dose única pré-operatória (máx. 24h). Se osteomielite maxilar/mandibular com necrose: 14 a 21 dias.',
    notes:
      'USO RACIONAL: A prescrição automática de antimicrobianos após tartarectomia ou extrações dentárias em animais sadios não previne infecções de sítio cirúrgico, destrói o microbioma digestivo benéfico e induz resistência bacteriana nosocomiais.',
  },
  {
    name: 'Gengivite e Periodontite',
    pathogens:
      'Bactérias anaeróbias periodontopatogênicas formadoras de biofilme subgengival: Porphyromonas gingivalis, Treponema denticola, Tannerella forsythia, Prevotella intermedia.',
    firstLine: {
      title: 'Conduta Primária: Intervenção Odontológica Mecânica',
      presentation:
        'O tratamento curativo e padrão ouro da doença periodontal é mecânico, sob anestesia geral e intubação orotraqueal.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'TRATAMENTO EXCLUSIVAMENTE MECÂNICO: Raspagem supragengival, curetagem subgengival, aplainamento radicular e polimento dentário associados a gel de Clorexidina a 0,12%. NÃO USAR ANTIMICROBIANOS SISTÊMICOS de rotina.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Indicação em Complicações Graves (Abscessos / Osteomielite)',
      presentation:
        'Terapia antimicrobiana adjuvante indicada apenas quando há supuração profunda extensa, abscessos de bifurcação radicular ou risco de fratura patológica mandibular.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Primeira escolha terapêutica por concentrar-se no biofilme ósseo e na gengiva inflamada.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Opção de amplo espectro eficaz contra enterobactérias secundárias e anaeróbios periodontais.',
            },
          ],
        },
      ],
    },
    duration:
      'Doença periodontal de rotina: ZERO dias de antibiótico. Infecção profunda com osteomielite: 7 a 10 dias (osteomielite crônica: 21 a 28 dias).',
    notes:
      'STEWARDSHIP: NENHUM ANTIBIÓTICO PENETRA OU ELIMINA O BIOFILME DENTÁRIO MINERALIZADO (cálculo). O uso empírico de antibióticos sistêmicos apenas melhora transitoriamente o odor da cavidade oral por alguns dias, gerando falsa impressão de cura, enquanto a perda óssea alveolar progride silenciosamente.',
  },
  {
    name: 'Gengivoestomatite Crônica Felina (FCGS)',
    pathogens:
      'Resposta imune e inflamatória linfoplasmocitária desregulada a antígenos bacterianos da placa, com frequência associada ao Calicivírus Felino (FCV) crônico.',
    firstLine: {
      title: 'Abordagem Cirúrgica Padrão Ouro',
      presentation:
        'A FCGS é uma enfermidade imunomediada reativa grave; a antibioticoterapia isolada jamais atinge a cura.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'PADRÃO OURO CURATIVO É CIRÚRGICO: Extração de todos os dentes pré-molares e molares (ou extração total de todos os dentes). O antibiótico sistêmico oral é usado APENAS como suporte pós-operatório imediato por 5 a 7 dias para alívio do processo inflamatório agudo.',
            },
            {
              name: 'Clindamicina',
              rationale:
                'Alternativa pós-operatória de suporte periodontal com atividade anti-anaeróbia vigorosa.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Terapia Imunomoduladora em Felinos Refratários',
      presentation:
        'Para os 20 a 30% dos gatos que mantêm estomatite cáustica mesmo após extração dentária total.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ciclosporina',
              rationale:
                'Imunomodulador inibidor de calcineurina para controle linfocitário crônico sob acompanhamento veterinário estrito.',
            },
          ],
        },
      ],
    },
    duration:
      'Suporte pós-extração: 5 a 7 dias no máximo. CONTRAINDICADO o uso contínuo crônico de antibióticos.',
    notes:
      'MENSAGEM INSTITUCIONAL: A antibioticoterapia cíclica repetida (como cursos mensais de amoxicilina ou convenia) na gengivoestomatite crônica felina é ineficaz a médio prazo, seleciona bactérias orais multirresistentes e adia o tratamento cirúrgico definitivo que é o único que proporciona cura ou alívio permanente.',
  },
  {
    name: 'Gastroenterite Aguda / Diarreia Sanguinolenta (Graus 1, 2 e 3)',
    pathogens:
      'Etiologia multifatorial: vírus entéricos (Parvovírus, Coronavírus), indiscreções alimentares, parasitas intestinais, disbiose aguda da microbiota. Bactérias oportunistas: E. coli, Clostridium perfringens, Salmonella.',
    firstLine: {
      title: 'Manejo Estratificado por Gravidade (AHDS / GEA)',
      presentation:
        'A imensa maioria das diarreias agudas em cães e gatos NÃO requer antimicrobianos, mesmo quando há presença de sangue vivo nas fezes (hematoquezia).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'GRAUS 1 e 2 (paciente alerta, afebril, hemodinamicamente estável, com ou sem sangue nas fezes): NÃO ADMINISTRAR ANTIMICROBIANOS. Terapia de suporte (fluidoterapia, dieta hiperdigerível com baixo teor de gordura, probióticos e antieméticos). GRAU 3 (Síndrome da Diarreia Hemorrágica Aguda - AHDS com choque hipovolêmico/séptico, hipotermia, leucopenia ou febre): prescrever Ampicilina IV para conter a translocação de Gram-positivos e anaeróbios.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Grau 3 Grave com Sepse / Choque Refratário',
      presentation:
        'Associação intravenosa rápida em pacientes em terapia intensiva com choque séptico secundário à perda de barreira mucosa.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base beta-lactâmica intravenosa contra translocação da microbiota intestinal.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Cobertura vigorosa de Gram-negativos coliformes translocados (administrar apenas após prévia hidratação volêmica adequada).',
            },
          ],
        },
      ],
    },
    duration:
      'Graus 1 e 2: ZERO dias. Grau 3 (choque séptico / AHDS complicado): 5 a 7 dias.',
    notes:
      'EVIDÊNCIA CIENTÍFICA CLARA: Ensaios clínicos randomizados duplo-cegos (Unterer et al.) demonstraram categoricamente que cães com gastroenterite hemorrágica tratados com antibióticos (como metronidazol ou amoxicilina-clavulanato) têm o MESMO tempo de recuperação dos que recebem apenas suporte e probióticos, porém desenvolvem disbiose prolongada que persiste por meses.',
  },
  {
    name: 'Parvovirose Canina',
    pathogens:
      'Parvovírus Canino tipo 2 (CPV-2a, 2b, 2c) com destruição das criptas intestinais e destruição precursora na medula óssea, levando a translocação bacteriana maciça de Escherichia coli, Clostridium spp. e Enterococcus spp. na vigência de neutropenia crítica.',
    firstLine: {
      title: '1ª linha parenteral preventiva de sepse',
      presentation:
        'A morte na parvovirose é decorrente de choque hipovolêmico e sepse bacteriana por translocação durante a neutropenia grave. A via oral está contraindicada na fase aguda de vômitos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Beta-lactâmico parenteral de eleição na admissão hospitalar, profilático contra sepse por translocação de enterococos e coliformes.',
            },
            {
              name: 'Cefazolina (IV)',
              rationale:
                'Cefalosporina de 1ª geração alternativa intravenosa segura.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (neutropenia profunda < 1000/µL / sepse iminente)',
      presentation:
        'Esquema combinado intravenoso amplo em pacientes hipotérmicos, toxêmicos ou com colapso circulatório.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base para Gram-positivos e anaeróbios entéricos.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Reforço de Gram-negativos em sepse fulminante (risco-benefício aceito em filhotes graves frente à ameaça iminente de morte; usar dose parenteral conservadora e hidratar rigorosamente).',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 7 dias (descontinuar assim que houver recuperação da contagem de neutrófilos, ausência de febre e tolerância à nutrição enteral).',
    notes:
      'PILARES DO TRATAMENTO: Fluidoterapia balanceada vigorosa para restauração volemica, maropitant (antiemético), analgesia (metadona), nutrição enteral precoce por sonda nasoesofágica (restaura as junções de oclusão das vilosidades) e correção de hipoglicemia e hipocalemia.',
  },
  {
    name: 'Infecção por Campylobacter spp.',
    pathogens:
      'Campylobacter jejuni, Campylobacter upsaliensis, Campylobacter coli.',
    firstLine: {
      title: 'Indicação Restrita a Pacientes Sistemicamente Doentes',
      presentation:
        'Portadores assintomáticos ou cães e gatos com diarreia branda NÃO DEVEM SER TRATADOS com antibióticos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Eritromicina',
              rationale:
                'Macrolídeo de primeira escolha em cães e gatos gravemente enfermos com febre, leucocitose ou diarreia mucoide profusa.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (resistência ou intolerância)',
      presentation:
        'Alternativas com atividade contra Campylobacter conforme antibiograma.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Azitromicina',
              rationale:
                'Alternativa com boa comodidade posológica (SID) e acúmulo celular nos enterócitos.',
            },
            {
              name: 'Doxiciclina',
              rationale:
                'Opção oral em casos de sensibilidade documentada em antibiograma.',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 10 dias em animais com quadro clínico severo.',
    notes:
      'ALERTA ZOONÓTICO E INTERPRETAÇÃO: Campylobacter faz parte da microbiota intestinal comensal de até 40% dos cães e gatos saudáveis. A simples detecção por cultura ou PCR em animais com diarreia não comprova nexo causal. O tratamento de animais assintomáticos é contraindicado pois seleciona cepas resistentes a macrolídeos e quinolonas.',
  },
  {
    name: 'Infecção por Clostridium perfringens Tipo F (netF+)',
    pathogens:
      'Clostridium perfringens produtor da toxina netF (enterotoxina necrosante).',
    firstLine: {
      title: 'Tratamento Direcionado por Confirmação Diagnóstica',
      presentation:
        'A presença de esporos na citologia fecal é achado comum e normal em animais saudáveis. Tratar APENAS diarreia aguda severa associada a PCR positivo para a toxina netF.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Penicilina oral bactericida de escolha com alta eficácia contra clostrídios e menor impacto deletério sobre a microbiota comensal do que o metronidazol.',
            },
            {
              name: 'Metronidazol',
              rationale:
                'Antimicrobiano anaerobicida de segunda intenção na dose conservadora de 10 a 15 mg/kg BID.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (casos refratários ou crônicos)',
      presentation:
        'Macrolídeo direcionado para clostridioses intestinais.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Tilosina',
              rationale:
                'Macrolídeo oral com boa segurança e atividade inibitória sobre espécies toxigênicas de Clostridium.',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 7 dias (descontinuar assim que houver melhora das fezes).',
    notes:
      'DIAGNÓSTICO CORRETO: Jamais prescrever antibióticos baseado apenas na visualização de esporos "em forma de alfinete" na citologia fecal. Mais de 80% dos cães saudáveis albergam Clostridium perfringens no cólon. Exigir PCR para genes toxigênicos netF ou cpe.',
  },
  {
    name: 'Infecção por Salmonella sp.',
    pathogens:
      'Salmonella enterica (sorovares Typhimurium, Enteritidis, Newport, Heidelberg, etc.).',
    firstLine: {
      title: 'Indicação Exclusiva em Casos com Febre / Bacteremia / Sepse',
      presentation:
        'Diarreia não complicada por Salmonella NÃO DEVE SER TRATADA COM ANTIMICROBIANOS (o tratamento prolonga a eliminação fecal de bactérias e não acelera a cura clínica).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'INDICADO APENAS se houver febre alta (> 39,8 °C), letargia grave, leucocitose com desvio à esquerda degenerativo ou sinais de sepse/bacteremia.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha parenteral / guiada por antibiograma',
      presentation:
        'Reservar para sepse hospitalar ou resistência comprovada a aminopenicilinas.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Opção de espectro enterobacteriano com boa distribuição tecidual em pacientes estáveis.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona bactericida intracelular potente para quadros sistêmicos graves.',
            },
          ],
        },
      ],
    },
    duration:
      '7 a 10 dias em animais com doença sistêmica/bacterêmica.',
    notes:
      'ALERTA ZOONÓTICO MÁXIMO: Cães e gatos infectados podem transmitir Salmonella para os tutores através das fezes e da saliva. O risco é dramaticamente superior em animais alimentados com dietas cruas (BARF / alimentação crua com ossos). Usar luvas, desinfetar utensílios e isolar de crianças e imunossuprimidos.',
  },
  {
    name: 'Giardíase Canina e Felina',
    pathogens:
      'Giardia duodenalis (sin. Giardia lamblia / Giardia intestinalis), trofozoítos e cistos infectantes de alta resistência ambiental.',
    firstLine: {
      title: '1ª linha de escolha padrão ouro (Fenbendazol / Febantel)',
      presentation:
        'Antiparasitários benzimidazóis são a PRIMEIRA ESCOLHA ABSOLUTA. NÃO USAR METRONIDAZOL COMO 1ª LINHA!',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Fenbendazol',
              rationale:
                'PRIMEIRA ESCOLHA RECOMENDADA EM CONSENSOS MUNDIAIS: 50 mg/kg VO a cada 24 horas por 5 dias consecutivos. Eficácia superior a 90-95%, altíssima segurança (inclusive em gestantes e filhotes jovens) e sem risco de indução de disbiose grave.',
            },
            {
              name: 'Febantel + Pirantel + Praziquantel',
              rationale:
                'Associação de vermífugo comercial com Febantel (pró-droga que se converte em fenbendazol no fígado). Administrar dose padrão da bula VO a cada 24 horas por 3 dias consecutivos.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (apenas se falha aos benzimidazóis)',
      presentation:
        'Metronidazol é opção de segunda linha reservada para casos de resistência comprovada.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Metronidazol',
              rationale:
                'Reservar para falhas terapêuticas aos benzimidazóis. Dose: 25 mg/kg VO a cada 12 horas por 5 dias (atenção ao risco de neurotoxicidade em doses > 30 mg/kg/dia ou em animais debilitados).',
            },
          ],
        },
      ],
    },
    duration:
      'Fenbendazol: 5 dias consecutivos. Febantel/Pirantel: 3 dias consecutivos. Metronidazol: 5 dias.',
    notes:
      'STEWARDSHIP E MANEJO AMBIENTAL OBRIGATÓRIO:\n1. Por que NÃO usar Metronidazol como primeira linha? O metronidazol apresenta eficácia de apenas 50 a 70% contra Giardia, causa alterações profundas e duradouras no microbioma intestinal e tem potencial neurotóxico (ataxia, nistagmo, convulsões).\n2. HIGIENE DO PACIENTE: É OBRIGATÓRIO dar banho completo com xampu no cão/gato no 1º e no último dia do tratamento para remover cistos aderidos aos pelos da região perianal (principal causa de "reinfecção imediata").\n3. AMBIENTE: Desinfetar o ambiente com solução de amônia quaternária ou água fervente.',
  },
  {
    name: 'Gastrite Aguda e Crônica',
    pathogens:
      'Helicobacter spp. gástricos de grandes dimensões (H. heilmannii, H. bizzozeronii, H. felis, H. salomonis).',
    firstLine: {
      title: 'Conduta Primária: Inibição Ácida e Suporte de Mucosa',
      presentation:
        'A presença de Helicobacter no estômago de cães e gatos é um achado comensal fisiológico na vasta maioria dos indivíduos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Omeprazol',
              rationale:
                'NÃO USAR ANTIMICROBIANOS. O tratamento de gastrites agudas e crônicas é clínico com Inibidor da Bomba de Prótons (Omeprazol 1 mg/kg VO SID), antieméticos (Maropitant) e manejo dietético com alimento úmido fracionado.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Terapia Tripla com Confirmação Histopatológica',
      presentation:
        'Indicada estritamente em pacientes com gastrite crônica erosiva/ulcerativa severa com biópsia endoscópica comprovando invasão e inflamação linfoplasmocitária induzida por Helicobacter.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Penicilina oral estável no pH gástrico como parte do esquema triplo.',
            },
            {
              name: 'Metronidazol',
              rationale:
                'Atividade bactericida luminal contra bacilos espiralados gástricos.',
            },
          ],
        },
      ],
    },
    duration:
      'Gastrite habitual: ZERO dias de antibiótico. Terapia tripla com biópsia comprovada: 14 dias.',
    notes:
      'CONSENSO GASTROENTEROLÓGICO: Mais de 90 a 100% dos cães e gatos assintomáticos saudáveis são colonizados por Helicobacter spp. no fundo e corpo gástrico. Prescrever antibióticos para gastrite sem prévia endoscopia e biópsia histopatológica é uma conduta desprovida de respaldo científico.',
  },
  {
    name: 'Doença Inflamatória Intestinal (DII) e Disbiose',
    pathogens:
      'Disfunção imunológica da mucosa intestinal, perda de tolerância a antígenos alimentares, colapso da barreira epitelial e disbiose secundária grave.',
    firstLine: {
      title: '1ª linha: Manejo Dietético e Probióticos',
      presentation:
        'Antibióticos NÃO DEVEM ser usados como primeira escolha na enteropatia inflamatória crônica / DII.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'NÃO USAR ANTIMICROBIANOS de rotina. A conduta de 1ª linha consiste em ensaio dietético rigoroso com dieta hidrolisada ou proteína inédita por 4 a 6 semanas, associada a prebióticos e probióticos com cepas veterinárias comprovadas. Antibióticos perpetuam a disbiose.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Terapia Imunossupressora e Tilosina em Casos Selecionados)',
      presentation:
        'Pacientes refratários à dieta hidrolisada requerem imunossupressores (prednisolona, budesonida ou ciclosporina). A Tilosina é reservada exclusivamente para a síndrome da diarreia responsiva a antibióticos (ARD).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Tilosina',
              rationale:
                'Macrolídeo de ação luminal para cães com diarreia responsiva a antibióticos (ARD); buscar desmame gradual após controle.',
            },
          ],
        },
      ],
    },
    duration:
      'DII padrão: ZERO dias de antibióticos. Tilosina em ARD: titular na menor dose eficaz e tentar retirada progressiva.',
    notes:
      'ALERTA CONTRA O USO CRÔNICO DE METRONIDAZOL: O uso contínuo de metronidazol para DII não tem eficácia superior a corticoides, causa quebras na estrutura do DNA mitocondrial, diminui irreversivelmente populações benéficas de Faecalibacterium e Clostridium cluster XIVa e favorece o surgimento de patógenos entéricos multirresistentes.',
  },
  {
    name: 'Colite Ulcerativa Histiocítica / Granulomatosa',
    pathogens:
      'Escherichia coli enteroinvasiva e aderente (AIEC), capaz de invadir e replicar-se no interior dos macrófagos colônicos (PAS-positivos).',
    firstLine: {
      title: '1ª linha de escolha (Fluoroquinolonas de penetração intracelular)',
      presentation:
        'Enfermidade primária genética de cães das raças Boxer e Buldogue Francês que responde espetacularmente a fluoroquinolonas.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Enrofloxacina',
              rationale:
                'FÁRMACO DE ESCOLHA PRIMÁRIA: 5 mg/kg VO a cada 24 horas. As fluoroquinolonas conseguem atravessar a membrana celular dos macrófagos colônicos e erradicar a AIEC intracelular, promovendo remissão clínica e histopatológica completa.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (resistência comprovada em antibiograma)',
      presentation:
        'Fluoroquinolonas de nova geração ou sulfonamidas lipofílicas conforme testes de suscetibilidade da AIEC isolada.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Marbofloxacina',
              rationale:
                'Alternativa com excelente biodisponibilidade e penetração fagocítica.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Opção oral em casos com cepas resistentes às fluoroquinolonas.',
            },
          ],
        },
      ],
    },
    duration:
      '4 a 6 semanas consecutivas (mínimo de 28 a 42 dias). Interrupções precoces levam à recidiva rápida.',
    notes:
      'CRITÉRIO DIAGNÓSTICO: O diagnóstico requer colonoscopia com biópsias da mucosa colônica e coloração por PAS (ácido periódico de Schiff) demonstrando acúmulo de macrófagos gigantes espumosos repletos de restos bacterianos, ou hibridização in situ por fluorescência (FISH) para E. coli.',
  },
  {
    name: 'Pancreatite Aguda',
    pathogens:
      'Inflamação primária estéril por ativação precoce das enzimas acinares pancreáticas (tripsina) e autodigestão tecidual. Infecção bacteriana secundária é rara (< 5% em cães e gatos).',
    firstLine: {
      title: 'Conduta Primária: Terapia Intensiva de Suporte',
      presentation:
        'Pancreatite aguda canina e felina NÃO complicada NÃO deve receber antimicrobianos profiláticos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'PANCREATITE AGUDA NÃO COMPLICADA: NÃO USAR ANTIMICROBIANOS. Terapia de suporte (analgesia com opioides potentes como fentanil/metadona, fluidoterapia com cristaloides balanceados, antieméticos e nutrição enteral precoce por sonda nasogástrica). INDICAÇÃO RESTRITA: Apenas se houver febre persistente, leucocitose com desvio à esquerda degenerativo, translocação bacteriana intestinal ou necrose pancreática infectada/abscesso pancreático comprovado por imagem.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Necrose Pancreática Infectada / Sepse Pancreatogênica',
      presentation:
        'Esquema parenteral com alta penetração no tecido pancreático necrótico e cobertura de enterobactérias translocadas.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base para Gram-positivos e anaeróbios secundários.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona com penetração comprovada no parênquima e no fluido pancreático inflamado.',
            },
          ],
        },
      ],
    },
    duration:
      'Pancreatite não complicada: ZERO dias. Sepse ou necrose infectada confirmada: 7 a 10 dias.',
    notes:
      'STEWARDSHIP: Metanálises e ensaios prospectivos em medicina veterinária e humana comprovaram que a antibioticoprofilaxia não previne infecções de tecido necrótico, não diminui a taxa de sobrevida e apenas seleciona patógenos resistentes nosocomiais no leito da UTI.',
  },
]
