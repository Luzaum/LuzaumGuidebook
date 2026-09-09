import type { Disease } from '../../types'

export const outrasZoonosesDiseases: Disease[] = [
  {
    name: 'Leptospirose Canina',
    pathogens:
      'Spirochaetes do gênero Leptospira interrogans sensu lato, com sorovares patogênicos caninos de alta virulência: Icterohaemorrhagiae, Canicola, Grippotyphosa, Pomona, Bratislava, Copenhageni e Australis.',
    firstLine: {
      title: '1ª linha bifásica (Parenteral aguda → Oral de eliminação renal)',
      presentation:
        'O tratamento deve ser estratificado pela fase clínica: controle imediato da bacteremia e preservação hepatorrenal na fase aguda, seguido de eliminação do estado de portador nos túbulos renais.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Penicilina G',
              rationale:
                'FASE AGUDA (paciente com êmese, azotemia, icterícia ou instabilidade): Penicilina G (Benzilpenicilina potássica/sódica 25.000 a 40.000 UI/kg IV a cada 12h) ou Ampicilina IV (20-22 mg/kg IV a cada 8h) para interrupção imediata da replicação leptospírica sérica e da lesão endotelial vascular.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Alternativa parenteral de escolha na fase inicial com disfunção hepatorrenal ou intolerância gástrica.',
            },
            {
              name: 'Doxiciclina',
              rationale:
                'FASE DE ELIMINAÇÃO RENAL (assim que o paciente tolerar via oral e cessarem os vômitos): Doxiciclina (5 mg/kg VO a cada 12h ou 10 mg/kg VO a cada 24h por 14 dias consecutivos). É O ÚNICO FÁRMACO CAPAZ DE ERRADICAR O ESTADO DE CARREADOR / PORTADOR NOS TÚBULOS RENAIS e impedir a eliminação bacteriana na urina.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (intolerância persistente à doxiciclina)',
      presentation:
        'Se o paciente mantiver vômitos incoercíveis ou esofagite impedindo o uso de tetraciclinas orais.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Opção oral de suporte até que o paciente consiga receber e tolerar Doxiciclina para o protocolo de eliminação renal.',
            },
          ],
        },
      ],
    },
    duration:
      '14 dias ininterruptos de Doxiciclina para completa erradicação da colonização dos túbulos renais e eliminação do estado de portador crônico.',
    notes:
      'ALERTA ZOONÓTICO MÁXIMO E BIOSSEGURANÇA HOSPITALAR:\n1. NOTIFICAÇÃO COMPULSÓRIA: Doença zoonótica bacteriana grave transmitida pelo contato com urina de roedores infectados ou de cães portadores através de pele lesada ou mucosas.\n2. BIOSSEGURANÇA DA EQUIPE: Todos os veterinários, estagiários e enfermeiros DEVEM utilizar EPI completo (luvas de procedimento, avental impermeável descartável, máscara e óculos de proteção) para manipular o animal e suas excretas.\n3. ISOLAMENTO URINÁRIO: O paciente deve ficar em canil isolado, forrado com tapetes higiênicos descartáveis; desinfetar baias e pisos exclusivamente com Hipoclorito de Sódio a 1% a 2% (água sanitária diluída), que inativa as espiroquetas em segundos.\n4. NÃO UTILIZAR fluoroquinolonas como primeira escolha para leptospirose canina.',
  },
  {
    name: 'Erliquiose Canina e Anaplasmose',
    pathogens:
      'Bactérias intracelulares obrigatórias da família Anaplasmataceae: Ehrlichia canis (tropismo por monócitos/macrófagos), Anaplasma phagocytophilum (tropismo por neutrófilos) e Anaplasma platys (tropismo por plaquetas), transmitidas pelo carrapato marrom do cão (Rhipicephalus sanguineus).',
    firstLine: {
      title: '1ª linha padrão ouro (Doxiciclina por 28 dias)',
      presentation:
        'Monoterapia oral de primeira escolha recomendada por todos os consensos mundiais de infectologia veterinária (ACVIM).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Doxiciclina',
              rationale:
                'TRATAMENTO PADRÃO OURO CURATIVO: 5 mg/kg VO a cada 12 horas (ou 10 mg/kg VO a cada 24 horas) por exatamente 28 DIAS (4 semanas consecutivas). Alta capacidade de penetração intracelular nos leucócitos infectados.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (intolerância gástrica refratária / falha)',
      presentation:
        'Alternativas reservadas para cães que não toleram doxiciclina mesmo quando administrada com alimento, ou suspeita de coinfecções transmitidas por carrapato.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cloranfenicol',
              rationale:
                'Anfenicol lipofílico com penetração intracelular eficaz (dose conservadora, monitorar leucograma pelo risco de aplasia medular reversível em cães).',
            },
            {
              name: 'Imidocarb',
              rationale:
                'Dipropionato de Imidocarb (5 a 6,6 mg/kg SC ou IM, duas doses com intervalo de 14 dias): indicado primariamente para o tratamento de coinfecção por Babesia canis / Babesia vogeli associada à erliquiose.',
            },
          ],
        },
      ],
    },
    duration:
      '**EXATAMENTE 28 DIAS (4 semanas)** ininterruptos. Cursos encurtados de 10 a 14 ou 21 dias deixam bactérias intracelulares residuais na medula óssea e no baço, levando o cão à fase crônica grave com aplasia medular irreversível (pancitopenia).',
    notes:
      'ORIENTAÇÕES FARMACOLÓGICAS E MONITORIZAÇÃO:\n1. ADMINISTRAÇÃO: A Doxiciclina DEVE ser administrada SEMPRE junto com refeições ou petiscos para minimizar a náusea e a êmese gástrica.\n2. COINFECÇÕES: Sempre investigar coinfecção com Babesia spp., Mycoplasma haemocanis e Leishmania infantum em áreas endêmicas.\n3. CONTROLE DE ECTOPARASITAS: O uso contínuo de isoxazolinas orais (sarolaner, afoxolaner, fluralaner) é indispensável para evitar que novas picadas de carrapatos re-infectem o cão imediatamente após a cura.',
  },
  {
    name: 'Esporotricose Felina',
    pathogens:
      'Fungo dimórfico termo-dependente altamente virulento do complexo Sporothrix: Sporothrix brasiliensis (predominante em epizootias urbanas felinas e zoonóticas no Brasil), Sporothrix schenckii sensu stricto.',
    firstLine: {
      title: '1ª linha de escolha (Itraconazol oral diário)',
      presentation:
        'Terapia antifúngica sistêmica oral com alta segurança e concentração no estrato córneo cutâneo e tecido subcutâneo.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Itraconazol',
              rationale:
                'PRIMEIRA ESCOLHA ABSOLUTA: 10 mg/kg VO a cada 24 horas (ou 50 a 100 mg/gato VO uma vez ao dia). Administrar SEMPRE na forma de microgrânulos em cápsula ou suspensão oral junto com alimentos úmidos gordurosos (patê, atum, sachê) para maximizar a biodisponibilidade e absorção gástrica.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Casos Refratários / Acometimento Nasal Severo)',
      presentation:
        'Associação medicamentosa em gatos com lesões ulceradas extensas, nódulos crônicos ou deformidade nasal ("nariz de palhaço").',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Itraconazol',
              rationale:
                'Manter a base antifúngica do triazol com monitorização das enzimas hepáticas (ALT/FA).',
            },
            {
              name: 'Iodeto de Potássio',
              rationale:
                'Associação de Iodeto de Potássio (solução saturada ou cápsulas manipuladas em doses escalonadas de 2,5 a 20 mg/kg SID): efeito imunomodulador e adjuvante espetacular em lesões refratárias ao itraconazol isolado.',
            },
          ],
        },
      ],
    },
    duration:
      'Manter o tratamento ininterrupto por pelo menos **30 a 60 DIAS APÓS A CURA CLÍNICA COMPLETA** (cicatrização total de todas as úlceras, alopecia resolvida e ausência de leveduras pleomórficas em citologia de controle). Tempo total médio: 3 a 6 meses.',
    notes:
      'ALERTA ZOONÓTICO EPIDÊMICO MÁXIMO:\n1. RISCO DE TRANSMISSÃO A HUMANOS: O felino infectado abriga carga fúngica astronômica em suas úlceras, unhas e cavidade nasal. A transmissão ocorre por mordedura, arranhadura ou contato direto do exsudato com a pele humana.\n2. MANEJO PROTETOR: O tutor e os profissionais devem utilizar luvas de látex ou nitrílicas grossas para manipular e medicar o gato, além de lavar imediatamente as mãos com água e sabão.\n3. ISOLAMENTO DOMICILIAR: Manter o gato estritamente domiciliado em cômodo fechado (quarentena doméstica), sem acesso à rua ou a outros animais da casa até a alta veterinária formal.',
  },
  {
    name: 'Meningite Bacteriana',
    pathogens:
      'Bactérias capazes de transpor a barreira hematoencefálica inflamada: Streptococcus spp., Staphylococcus pseudintermedius, Pasteurella multocida, Escherichia coli, Klebsiella pneumoniae e Actinomyces spp.',
    firstLine: {
      title: '1ª linha parenteral com alta penetração liquórica',
      presentation:
        'Emergência neurológica que exige início intravenoso imediato com fármacos de excelente passagem pela barreira hematoencefálica.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Beta-lactâmico com penetração liquórica expressiva na vigência de meninges inflamadas, cobrindo cocos Gram-positivos e Pasteurella.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Molécula lipofílica de alta penetração no líquido cefalorraquidiano (LCR) e parênquima cerebral.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Infecção Grave Hospitalar / Patógenos Resistentes)',
      presentation:
        'Cefalosporinas de 3ª geração ou carbapenêmicos de amplo espectro neurológico.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ceftriaxona (IV)',
              rationale:
                'Cefalosporina de 3ª geração parenteral com excelente concentração terapêutica no LCR para meningites agudas.',
            },
            {
              name: 'Meropenem',
              rationale:
                'Carbapenêmico de escolha neurológica parenteral quando há isolamento de bactérias Gram-negativas multirresistentes (menor potencial pró-convulsivante que o imipenem).',
            },
          ],
        },
      ],
    },
    duration:
      '2 a 4 semanas após a resolução completa de todos os sinais clínicos neurológicos e normalização dos parâmetros celulares e proteicos do LCR.',
    notes:
      'CONDUTA NEUROLÓGICA DE EMERGÊNCIA:\n1. EXAME LIQUÓRICO (LCR): Coleta de líquor por punção cisternal ou lombar antes de iniciar a primeira dose do antibiótico, desde que o paciente não apresente sinais de hipertensão intracraniana descompensada ou risco iminente de herniação cerebelar.\n2. CORTICOTERAPIA ADJUVANTE: A administração inicial precoce de glicocorticoide em dose anti-inflamatória suave atenua a resposta inflamatória fulminante gerada pela lise bacteriana no espaço subaracnóideo, reduzindo o risco de sequelas neurológicas motoras permanentes.',
  },
]
