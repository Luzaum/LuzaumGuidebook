import { DiseaseRecord } from '../../types/disease';

export const prolapsoRetalCaesGatosRecord: DiseaseRecord = {
  id: 'disease-prolapso-retal-caes-gatos',
  slug: 'prolapso-retal-caes-gatos',
  title: 'Prolapso retal em cães e gatos',
  synonyms: [
    'Rectal prolapse',
    'Prolapso de mucosa retal',
    'Prolapso retal completo',
    'Eversão retal',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: [
    'gastroenterologia',
    'cirurgia-tecidos-moles',
    'emergencia-intensivismo',
    'anestesia-dor',
  ],
  tags: [
    'Prolapso retal',
    'Tenesmo',
    'Disquesia',
    'Intussuscepção',
    'Colopexia',
    'Bolsa de tabaco',
    'Ressecção retal',
    'Epidural sacrococcígea',
    'Emergência GI',
    'Hérnia perineal',
    'Parasitismo intestinal',
    'Obstrução uretral',
    'ENOVAT 2025',
  ],
  isPublished: true,
  source: 'seed',
  quickSummary:
    'Exteriorização parcial (mucosa) ou completa (espessura total) da parede retal através do orifício anal, secundária a tenesmo persistente, dismotilidade ou perda de sustentação pélvica — jamais uma enfermidade primária isolada. A prioridade absoluta nos primeiros minutos é proteger a mucosa com solução isotônica, diferenciar o prolapso verdadeiro de uma intussuscepção ileocólica ou colocolônica exteriorizada (ausência de fórnice lateral ao exame rombo), graduar a viabilidade tecidual e investigar a causa desencadeante (enterocolite e parasitismo em jovens; obstrução uretral/constipação em gatos; prostatopatia, neoplasias ou hérnia perineal em cães idosos).',
  quickDecisionStrip: [
    'Tecido escuro (roxo, negro, friável ou fétido) sugere necrose: NÃO realizar redução forçada.',
    'Intussuscepção exteriorizada imita prolapso: pesquisar o fórnice com sonda romba e usar ultrassom na menor dúvida.',
    'Manter a mucosa sempre umedecida com salina isotônica 0,9% morna e protegida contra lambedura.',
    'Bolsa de tabaco frouxa (sobre seringa de 3 mL/cateter): o ânus precisa permitir saída de fezes macias (5–7 dias práticos).',
    'Apenas recolocar o reto não corrige a doença primária: tenesmo persistente causa recidiva.',
    'Em gatos com esforço supostamente fecal, palpar a bexiga imediatamente para não perder obstrução uretral fatal.',
    'Epidural sacrococcígea (S–Co1) em gatos preserva motricidade pélvica e evita punção medular em S1.',
    'Prolapso recorrente com tecido viável = colopexia (preservar reto); tecido inviável = ressecção e anastomose.',
    'Nunca utilizar enema com fosfato de sódio (Fleet) em gatos ou cães pequenos: risco letal de hiperfosfatemia e hipocalcemia.',
    'ENOVAT 2025/2026: redução manual simples sem cirurgia NÃO exige antibiótico sistêmico; ressecção usa apenas profilaxia perioperatória.',
  ],
  quickSummaryRich: {
    lead: 'O prolapso retal é uma manifestação anatômica secundária à elevação repetida da pressão intra-abdominal, inflamação colorretal ou falência dos mecanismos de continência e sustentação do diafragma pélvico. Em cães e gatos, o desfecho clínico depende menos do comprimento do cilindro exteriorizado do que de quatro variáveis decisivas: diferenciação com intussuscepção invaginada, tempo de exposição com integridade microvascular, sucesso na contenção atraumática (ou cirurgia definitiva quando indicado) e resolução real da causa de base.',
    leadHighlights: [
      'A urgência não é definida apenas pelo tamanho da massa: perfusão, friabilidade, possibilidade de redução sem força e obstrução intestinal ou uretral concomitante comandam o atendimento.',
      'Prolapso completo designa eversão de todas as camadas da parede retal (mucosa, submucosa, muscular e serosa/adventícia), sendo mais frequente e mais propenso a estrangulamento venoso do que o prolapso parcial mucoso.',
      'Em filhotes lideram enterocolite e endoparasitoses (inclusive infecções pré-patentes por Trichuris vulpis ou protozoários como Giardia e Tritrichomonas foetus); em gatos adultos nunca presumir origem fecal sem palpar a bexiga; em machos idosos não castrados investigar próstata e hérnia perineal.',
      'O prognóstico costuma ser favorável quando o tecido permanece viável e a causa é corrigida; na necrose exigindo ressecção, crescem os riscos de estenose cicatricial e deiscência anastomótica com peritonite séptica.',
    ],
    pillars: [
      {
        title: 'Pilar 1 — Anatomia, Fisiologia e Classificação por Espessura',
        body:
          'Separar prolapso mucoso parcial do prolapso completo (todas as camadas da parede retal) muda o risco vascular e a conduta:\n\n' +
          '- Prolapso completo refere-se à espessura total evertida, e não simplesmente ao comprimento exteriorizado.\n' +
          '- A continência fecal depende principalmente do esfíncter anal externo (EAE, músculo estriado via nervo pudendo), cuja inervação também alcança bexiga e uretra.\n' +
          '- retroalimentação positiva do tenesmo: uma vez exposta e ressecada, a mucosa retal inflamada retroalimenta o reflexo expulsivo mesmo após atenuação do gatilho inicial.',
        highlights: ['Parcial vs. Completo', 'Nervo pudendo e EAE', 'Ciclo vicioso do tenesmo'],
      },
      {
        title: 'Pilar 2 — Diferenciação Crítica e Investigação Etiológica',
        body:
          'Duas armadilhas definem o diagnóstico no plantão veterinário:\n\n' +
          '- Teste do fórnice (prolapso vs. intussuscepção): sonda romba lubrificada barra na junção mucocutânea no prolapso verdadeiro, mas desliza lateralmente ao longo da alça na intussuscepção prolapsada.\n' +
          '- Estratificação por paciente: filhotes/gatis → coproparasitológico centrífugo, Giardia (CAPC 2026) e T. foetus; gatos adultos → palpação vesical obrigatória (DTUIF/obstrução uretral); cães machos idosos → toque perineal lateral imediato (1ª–2ª falange) e próstata.',
        highlights: ['Teste do fórnice', 'Ultrassom em alvo', 'Bexiga vs. fezes em gatos'],
      },
      {
        title: 'Pilar 3 — Estabilização, Redução Atraumática e Contenção',
        body:
          'Proteger, desinchar osmotica e farmacologicamente e conter sem obstruir:\n\n' +
          '- Proteção imediata com salina isotônica 0,9% morna; ressuscitação volêmica se hipovolemia (AAHA 2024: cães 15–20 mL/kg, gatos 5–10 mL/kg).\n' +
          '- Edema irredutível viável responde a dextrose 50% ou manitol 70% tópicos sob sedação/anestesia ou epidural sacrococcígea.\n' +
          '- Bolsa de tabaco calibrada sobre seringa de 3 mL/cateter para permitir fezes pastosas (janela prática de 5–7 dias, variando conforme evolução clínica de 1–14 dias).',
        highlights: ['Dextrose 50% tópica', 'Epidural sacrococcígea', 'Bolsa de tabaco folgada'],
      },
      {
        title: 'Pilar 4 — Decisão Cirúrgica, Farmacologia Segura e Stewardship',
        body:
          'Viabilidade tecidual e evidência atual orientam cirurgia e fármacos:\n\n' +
          '- Tecido viável porém recorrente → colopexia aberta ou laparoscópica (preservar o reto funcional).\n' +
          '- Tecido inviável (roxo-escuro/negro, friável, fétido) → ressecção e anastomose (maior risco de estenose e deiscência).\n' +
          '- ENOVAT 2025/2026: não prescrever antibióticos em redução simples nem prolongar profilaxia pós-operatória em cirurgia limpa-contaminada; veto absoluto a enemas de fosfato de sódio (Fleet).',
        highlights: ['Colopexia vs. Ressecção', 'Stewardship ENOVAT 2025', 'Veto ao enema Fleet'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial no Plantão',
      steps: [
        {
          label: '1. Triagem e proteção da mucosa (0–5 min)',
          detail:
            'Checar perfusão, dor, hidratação e palpar a bexiga. Envolver imediatamente a massa exposta em compressa umedecida com solução salina isotônica 0,9% morna e colocar colar elisabetano.',
        },
        {
          label: '2. Prolapso verdadeiro vs. Intussuscepção exteriorizada',
          detail:
            'Sob analgesia, pesquisar suavemente o fórnice com sonda romba lubrificada. Na menor dúvida, progressão lateral, vômitos ou dor abdominal, realizar ultrassonografia abdominal imediata.',
        },
        {
          label: '3. Graduação de viabilidade vascular',
          detail:
            'Diferenciar edema congestivo firme (viável) de segmento roxo-enegrecido, opaco, friável ou fétido (necrose → contraindicação formal à redução manual).',
        },
        {
          label: '4. Investigação etiológica dirigida',
          detail:
            'Diarreia/filhote → flotação centrífuga seriada, Giardia/T. foetus; estrangúria/gato → POCUS vesical/urinálise/eletrólitos; idoso/crônico → toque perineal lateral, próstata, radiografia e proctoscopia com biópsia submucosa.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico por Fenótipo Clínico',
      steps: [
        {
          label: 'Fenótipo A — Tecido viável e primeiro episódio agudo',
          detail:
            'Limpeza salina morna → analgesia/anestesia (ou epidural S–Co1) → dextrose 50% tópica se edema → redução manual gentil → bolsa de tabaco frouxa sobre cateter/seringa 3 mL (5–7 dias práticos) → tratar causa primária.',
        },
        {
          label: 'Fenótipo B — Tecido viável, porém recorrente',
          detail:
            'Reinvestigar causas ocultas (hérnia perineal, T. vulpis pré-patente, próstata, massa, DTUIF) e indicar colopexia aberta ou laparoscópica preservando o reto íntegro.',
        },
        {
          label: 'Fenótipo C — Tecido necrótico ou irredutível gravemente traumatizado',
          detail:
            'Estabilização hemodinâmica (AAHA 2024) + profilaxia cirúrgica perioperatória (cefazolina ± metronidazol conforme ENOVAT) + ressecção e anastomose retal em margens viáveis sangrantes.',
        },
        {
          label: 'Fenótipo D — Intussuscepção ou obstrução uretral concomitante',
          detail:
            'Priorizar desobstrução uretral/correção de hipercalemia em felinos ou cirurgia abdominal direcionada à alça invaginada em vez de tentar reduzir pelo ânus às cegas.',
        },
      ],
    },
  },
  etiology: {
    anatomiaTiposProlapso:
      'O prolapso retal não representa uma entidade etiopatogênica única, mas o desfecho mecânico final da perda de equilíbrio entre pressão expulsiva abdominal e contenção anatômica pélvica. ==Classificar corretamente a espessura da parede exteriorizada e a viabilidade vascular é indispensável antes de qualquer manobra terapêutica==, pois a quantidade de camadas evertidas altera o risco de estrangulamento venoso, a facilidade de redução e a necessidade de intervenção cirúrgica.\n\n' +
      'REGRA DE OURO: A denominação "prolapso completo" refere-se exclusivamente ao envolvimento de todas as camadas histológicas da parede retal (mucosa, submucosa, muscular própria e serosa/adventícia), e não ao comprimento em centímetros exteriorizado pelo ânus. De modo semelhante, "prolapso recorrente" descreve comportamento evolutivo após redução prévia e não define por si só inviabilidade vascular: um prolapso recorrente pode chegar plenamente viável, ao passo que um primeiro episódio negligenciado pode apresentar necrose em poucas horas.',
    tabelaClassificacaoAnatomica: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação anatômica e evolutiva do prolapso retal em cães e gatos',
      headers: [
        'Tipo clínico-anatômico',
        'Anatomia envolvida',
        'Aspecto clínico observado',
        'Importância diagnóstica e terapêutica',
      ],
      rows: [
        [
          'Prolapso parcial (mucoso)',
          'Eversão predominante da mucosa e submucosa retal distal, sem exteriorização da túnica muscular própria',
          'Protrusão discreta em anel ou prega rósea, frequentemente intermitente durante a defecação ou o pico do esforço',
          'Costuma reduzir espontaneamente ou com manipulação gentil se o estímulo de tenesmo e a inflamação mucosa forem controlados precocemente',
        ],
        [
          'Prolapso completo (espessura total)',
          'Todas as camadas da parede retal sofrem eversão dupla (cilindro com mucosa externa voltada para o meio ambiente e serosa interna)',
          'Cilindro tubular robusto, geralmente circunferencial, úmido e persistente além do canal anal (forma mais comum na rotina clínica)',
          'Maior risco de compressão venolinfática pelo anel anal, edema progressivo, isquemia e necessidade de contenção por sutura ou cirurgia',
        ],
        [
          'Prolapso complicado',
          'Prolapso parcial ou completo cursando com ulceração profunda, autotraumatismo, estase vascular grave ou necrose transmural',
          'Massa intensamente edemaciada, vermelho-violácea, enegrecida, friável, com exsudato sanguinolento ou odor fétido',
          'Contraindicação formal à redução forçada; exige estabilização sistêmica e ressecção com anastomose dos segmentos viáveis',
        ],
        [
          'Prolapso recorrente',
          'Reexteriorização após redução manual e/ou retirada de sutura em bolsa de tabaco prévia',
          'Episódios repetidos de protrusão, muitas vezes com fibrose crônica superficial ou falha contínua de sustentação pélvica',
          'Obriga reinvestigação etiológica completa (parasitismo oculto, hérnia perineal, próstata, massa, DTUIF) e avaliação de colopexia se tecido viável',
        ],
      ],
    },
    causasPrimariasMecanismos:
      'A imensa maioria dos casos decorre de afecções que desencadeiam esforço expulsivo repetido (tenesmo ou disquesia), inflamação retal direta (proctite) ou fragilização estrutural do assoalho pélvico. Na literatura médica veterinária, causas congênitas raras também são documentadas em cães jovens, como duplicação colônica e polipose colorretal com ganglioneuromatose.\n\n' +
      'ATENÇÃO CLÍNICA: Embora as endoparasitoses liderem a casuística pediátrica, detectar ovos ou cistos em um exame fecal não comprova causalidade isolada automática. Um filhote pode albergar parasitismo intestinal subclínico e prolapsar por enterite viral concomitante, corpo estranho ou intussuscepção — razão pela qual o diagnóstico etiológico exige correlação com idade, consistência fecal, palpação abdominal e exames de imagem.',
    tabelaEtiologiasMecanismos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Grupos etiológicos primários, fisiopatogenia do deslocamento retal e contextos clínicos de suspeita',
      headers: [
        'Grupo etiológico',
        'Exemplos em cães e gatos',
        'Mecanismo desencadeante do prolapso',
        'Cenário clínico de maior suspeita',
      ],
      rows: [
        [
          'Enterites e colites infecciosas ou inflamatórias',
          'Parvovirose, enterites bacterianas, doença inflamatória intestinal (colite), histoplasmose/prototecose, Tritrichomonas foetus em gatos',
          'Inflamação da mucosa e submucosa sensibiliza mecanorreceptores retais → urgência evacuatória constante e tenesmo vigoroso → deslocamento caudal',
          'Filhotes, abrigos, gatos jovens de raça pura em gatis (T. foetus), diarreia mucosa ou hematoquezia',
        ],
        [
          'Endoparasitoses intestinais',
          'Ascarídeos (Toxocara), ancilostomídeos, Trichuris vulpis em cães; coccídios (Cystoisospora) e Giardia duodenalis',
          'Lesão direta à mucosa cecal/colônica (especialmente Trichuris), hipersecreção e contrações colônicas gigantes repetidas mesmo com reto vazio',
          'Filhotes sem protocolo antiparasitário adequado; atenção ao longo período pré-patente de T. vulpis (74–90 dias)',
        ],
        [
          'Constipação e obstipação',
          'Desidratação sistêmica, megacólon idiopático felino, pseudocoprostase, estenoses pélvicas pós-trauma ou dieta pobre/hipercalcêmica',
          'Fezes ressecadas e impactadas elevam drasticamente a resistência ao trânsito distal, exigindo prensagem abdominal repetida e prolongada',
          'Gatos adultos/idosos, histórico de dor ou vocalização na caixa de areia, fezes endurecidas ou ausência de evacuação',
        ],
        [
          'Doenças retais e colônicas focais',
          'Proctite grave, corpos estranhos lineares ou ósseos, pólipos adenomatosos retais, adenocarcinomas, estenoses e saculações',
          'Estímulo contínuo ao reflexo de defecação pela massa intraluminal (mesmo sem fezes), associado a estreitamento ou tração caudal',
          'Tenesmo crônico persistente, hematoquezia viva, fezes em fita (ribbon-like), emagrecimento progressivo em adultos/idosos',
        ],
        [
          'Doenças do trato urinário inferior (DTUIF / ITU / Urolitíase)',
          'Cistite idiopática felina, tampões uretrais, urolitíase uretral ou vesical, infecções bacterianas urinárias graves',
          'Como o nervo pudendo compartilha fibras para o esfíncter anal externo e a bexiga/uretra, a estrangúria intensa eleva a pressão intra-abdominal de forma explosiva',
          'Gatos machos (ou fêmeas) com esforço frequente interpretado erroneamente pelo tutor como constipação ou diarreia, bexiga distendida',
        ],
        [
          'Doenças prostáticas',
          'Hiperplasia prostática benigna (HPB), prostatite, cistos paraprostáticos ou adenocarcinoma prostático',
          'Prostatomegalia comprime dorsalmente o reto contra o canal pélvico, gerando disquesia mecânica e tenesmo crônico compensatório',
          'Cães machos adultos a geriátricos, sobretudo não castrados, com fezes achatadas ou esforço improdutivo',
        ],
        [
          'Doenças do diafragma pélvico',
          'Hérnia perineal (atrofia de levantador do ânus e coccígeo mediada por relaxina prostática/hormônios), saculação ou desvio retal',
          'Perda da parede muscular de contenção lateral permite desvio retal e reduz a resistência mecânica durante a prensa abdominal',
          'Cães machos idosos não castrados; também ocorre como complicação pós-operatória precoce após herniorrafia perineal',
        ],
        [
          'Doenças reprodutivas e obstétricas',
          'Distocia obstrutiva ou inércia uterina prolongada',
          'Aumento sustentado e intenso da pressão intra-abdominal durante contrações expulsivas prolongadas',
          'Fêmeas parturientes em trabalho de parto complicado ou prolongado',
        ],
        [
          'Alterações neuromusculares e malformações caudais',
          'Neuropatias sacrais/caudais, estenose lombossacral degenerativa, lesões de nervos pélvicos ou pudendos, disgenesia sacrococcígea',
          'Descoordenação do reflexo retoesfincteriano, hipotonia do esfíncter anal externo e perda do suporte neurogênico do períneo',
          'Gatos da raça Manx, pacientes com trauma pélvico/caudal ou déficits concomitantes de cauda e micção',
        ],
      ],
    },
    especificidadesPorEspecie:
      'A abordagem clínica inicial deve ser imediatamente estratificada por espécie e faixa etária:\n' +
      '- Cães: Em filhotes (< 4 meses), enterocolites infecciosas e endoparasitoses (Toxocara, Ancylostoma, Trichuris vulpis, coccídios e Giardia) respondem pela maior parcela dos episódios, exigindo atenção redobrada à diferenciação com intussuscepção ileocólica secundária à enterite. Em adultos jovens e de meia-idade, considerar corpos estranhos, colites crônicas e pólipos retais (com predisposição descrita para Dachshund Miniatura, Collie e West Highland White Terrier). Em machos idosos não castrados, prostatomegalia, neoplasias retais e hérnia perineal passam ao topo da lista diferencial, especialmente na presença de fezes em fita.\n' +
      '- Gatos: Embora filhotes também apresentem alta incidência associada a parasitas e enterites agudas ou crônicas — destacando-se Tritrichomonas foetus em gatos jovens de raça pura ou ambientes populosos como uma das causas felinas mais comuns de prolapso retal —, o clínico deve manter vigilância extrema para doenças do trato urinário inferior felino (DTUIF) e obstrução uretral. Tutores frequentemente confundem estrangúria urinária com tentativa infrutífera de defecação; uma pista semiológica útil é que gatos defecando mantêm a cauda erguida pelo músculo retococcígeo, enquanto na disúria/estrangúria urinária a cauda tende a permanecer abaixada.\n' +
      '- Gatos Manx e malformações sacrococcígeas: A predisposição de gatos Manx ao prolapso retal decorre provavelmente da disgenesia sacral/caudal e comprometimento neurogênico da inervação pélvica e esfincteriana. Contudo, os dados disponíveis não quantificam o risco relativo nem definem penetrância genética exata — devendo ser interpretada como associação anatômico-neurológica plausível, sem extrapolação estatística.\n' +
      '- Perda anatômica ou esfincteriana sem tenesmo intestinal primário: Em casos atípicos ou refratários à colopexia, avaliar integridade do esfíncter anal externo; Corgozinho et al. (2010 — Can Vet J, PMC2857430, referência externa sob direitos da CVMA) documentaram prolapso recorrente em gato adulto secundário à destruição esfincteriana pós-miíase e ampliação anormal da abertura anal, sem diarreia ou constipação concomitantes.',
    figuraHerniaPerinealSaculacao: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/hernia-perineal-saculacao-park-2026.webp',
      alt: 'Hérnia perineal em cão idoso demonstrando aumento de volume perineal e achados radiográficos de acúmulo fecal em saculação retal predispondo ao prolapso',
      display: 'wide',
      shortCaption:
        'Hérnia perineal canina com aumento de volume perineal e saculação retal associada (Park, Lee & Kim, 2026 · CC BY 4.0).',
      caption:
        'Hérnia perineal em cão idoso, evidenciando deformação e aumento de volume perineal associados a imagens radiográficas de retenção e acúmulo fecal em saculação retal. O enfraquecimento dos músculos levantador do ânus e coccígeo (diafragma pélvico) permite desvio retal e disquesia crônica; o esforço evacuatório persistente resultante pode desencadear ou perpetuar a recorrência do prolapso retal — conectando falha de sustentação pélvica, estase fecal e eversão anal, além de lembrar que nem todo prolapso nasce de colite. Autoria: Park, Lee & Kim (2026), Frontiers in Veterinary Science, 13:1858804 (Figura 1). Licença: CC BY 4.0.',
    },
  },
  epidemiology: {
    frequenciaCasuistica:
      'Não existem levantamentos populacionais brasileiros validados que estabeleçam a incidência ou prevalência geral do prolapso retal em cães e gatos na população domiciliada. As informações quantitativas disponíveis provêm de séries hospitalares universitárias retrospectivas, cuja interpretação exige cautela quanto ao viés de encaminhamento.\n\n' +
      'No estudo retrospectivo de ==Igna et al. (2021)==, conduzido em um serviço universitário de cirurgia veterinária na Romênia entre 1993 e 2020, foram identificados ==53 casos em 25.852 atendimentos cirúrgicos/clínicos do período (0,2% da casuística hospitalar)== — dado que expressa a participação proporcional naquele hospital universitário, e não a prevalência populacional real da doença.',
    tabelaEpidemiologiaIgna2021: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Síntese epidemiológica da série clínica de Igna et al. (2021) (n = 53) e sua interpretação crítica',
      headers: [
        'Parâmetro avaliado',
        'Cães (n = 33)',
        'Gatos (n = 20)',
        'Limitações metodológicas e leitura crítica',
      ],
      rows: [
        [
          'Distribuição etária',
          'Média de 31 meses (extremos de 1 mês a 12 anos no conjunto da coorte)',
          'Média de 12 meses; forte predomínio de animais jovens',
          'Mediana global de 11 meses; filhotes concentram grande parte dos casos agudos redutíveis',
        ],
        [
          'Parasitismo intestinal atribuído',
          '6 casos (18,2%)',
          '16 casos (80%)',
          'Ausência de vermifugação registrada não comprova causalidade única sem protocolo diagnóstico padronizado',
        ],
        [
          'Enterocolite / enterite',
          '5 casos (15,2%)',
          '4 casos (20%)',
          'Série retrospectiva unicêntrica abrangendo quase três décadas com heterogeneidade etiológica',
        ],
        [
          'Alterações retais e corpos estranhos',
          '14 casos (42,4% — grupo combinado)',
          'Não detalhado na série como categoria dominante',
          'Reflete maior exposição canina a corpos estranhos lineares/ósseos, saculações e lesões retais',
        ],
        [
          'Doenças prostáticas, tumores e distocia',
          'Doenças prostáticas: 4; neoplasias: 2; distocia: 2',
          'Não registrados nesse grupo felino',
          'Amostra pequena e de serviço cirúrgico impede calcular fatores de risco independentes ou incidência populacional',
        ],
      ],
    },
    idadeRacaAmbienteTransmissao:
      '- Perfil etário e sexual: Animais jovens (< 4–12 meses) apresentam vulnerabilidade acentuada devido à maior frequência de enterites agudas e infecções parasitárias e menor resistência conjuntiva dos tecidos de fixação pélvica. Como ilustração clínica brasileira em paciente pediátrico muito jovem, relato externo (Dr. Vet, 2025 — direitos reservados ao autor) documentou filhote felino de ~60 dias e 840 g com prolapso retal recorrente e tecido ainda viável, motivando colopexia após falha de contenção prévia. Em adultos e idosos, ganham protagonismo afecções obstrutivas, prostáticas (machos caninos inteiros), neoplásicas e constipação crônica. Não existe predisposição sexual ou racial universal confirmada para o prolapso retal em si, embora raças como Manx em gatos e Boston Terrier em cães sejam citadas em relatos e capítulos clínicos por condições anatômicas predisponentes.\n' +
      '- Fatores ambientais: Abrigos, gatis densamente povoados, canis coletivos e ambientes sem higiene rigorosa ou controle antiparasitário aumentam expressivamente a circulação de enteropatógenos (ancilostomídeos, áscaris, tricúridos, Giardia, coccídios, parvovírus e Tritrichomonas foetus), elevando indiretamente a ocorrência de prolapsos secundários ao tenesmo.\n' +
      '- Risco biológico e não contagiosidade: O prolapso retal constitui uma alteração mecânica e anatômica não transmissível entre indivíduos. Contudo, caso seja secundário a enteropatógenos transmissíveis (vírus, bactérias, helmintos ou protozoários como Giardia e Cryptosporidium — alguns com potencial zoonótico), as medidas de isolamento sanitário e desinfecção ambiental aplicam-se integralmente ao agente causador.',
  },
  pathogenesisTransmission: {
    mecanismosAnatomofisiologicos:
      'A continência e a evacuação normal dependem da integração precisa entre três compartimentos anatômico-funcionais:\n' +
      '1. Parede retal estratificada\n' +
      '   - O reto inicia-se na entrada pélvica (aproximadamente 5 cm em cães médios) e possui quatro camadas: mucosa (epitélio colunar rico em células caliciformes secretoras de muco lubrificante, que transita para epitélio escamoso na linha anorretal do canal anal), submucosa (rica em tecido conjuntivo e plexos vasculares que ancoram a mucosa à muscular), muscular própria e serosa/adventícia.\n' +
      '2. Esfíncteres anais e diafragma pélvico\n' +
      '   - O esfíncter anal interno (EAI), composto por musculatura lisa involuntária contínua à camada circular da muscular retal, atua principalmente como marco anatômico e apresenta participação mínima na continência.\n' +
      '   - O esfíncter anal externo (EAE), faixa de ~1–1,5 cm de músculo estriado voluntário, é o determinante principal da continência fecal.\n' +
      '   - Os músculos levantador do ânus e coccígeo constituem o diafragma pélvico, resistindo mecanicamente às pressões intra-abdominais; o músculo retococcígeo origina-se da muscular longitudinal retal distal para elevar a cauda durante a evacuação.\n' +
      '3. Inervação coordenada e reflexos\n' +
      '   - Reflexo gastrocólico (pós-prandial) e reflexo de inibição retoesfincteriana (acomodação retal com relaxamento do EAI durante a fase de armazenamento). Na evacuação voluntária, contrações colônicas gigantes migrantes (CGMCs) impulsionadas por fibras parassimpáticas do nervo pélvico associam-se ao relaxamento do EAE via nervo pudendo somático e contração coordenada do diafragma e parede abdominal.\n' +
      '   - Como fibras parassimpáticas sacrais e somáticas pudendas também inervam a bexiga urinária e a uretra, lesões ou estímulos álgicos em um compartimento desencadeiam frequentemente tenesmo cruzado no outro.',
    cicloTenesmoFeedbackPositivo:
      'O mecanismo fisiopatológico central que sustenta o prolapso é um circuito de retroalimentação positiva:\n\n' +
      'Estímulo primário (colite, parasitismo, constipação, urolitíase, corpo estranho ou massa) → ativação persistente dos mecanorreceptores e nociceptores retais → tenesmo intenso com elevações repetidas da pressão intra-abdominal → deslizamento da mucosa sobre a submucosa frouxa (prolapso parcial) ou eversão completa da parede retal através do EAE.\n\n' +
      'Uma vez exteriorizada, a mucosa retal perde a lubrificação fisiológica protegida do lúmen pélvico, sofre ressecamento, atrito mecânico contra superfícies, lambedura e contaminação fecal. Essa agressão local gera proctite química e mecânica intensa que continua estimulando os receptores aferentes sacrais — de modo que ==o próprio reto prolapsado passa a gerar tenesmo suficiente para perpetuar sua exteriorização mesmo depois de a diarreia ou causa inicial terem diminuído==. Sem analgesia local/sistêmica e remoção do contato irritativo, a simples recolocação digital tende ao fracasso precoce.',
  },
  pathophysiology: {
    cascataVascularIsquemica:
      'O fator que transforma uma emergência manejável em necrose cirúrgica é o comportamento estrangulante do anel anal e do EAE em torno da base do cilindro prolapsado. Compreender essa sequência evita decisões precipitadas baseadas apenas na cor superficial:\n\n' +
      '1. Compressão venosa e linfática inicial\n' +
      '   - Ao atravessar o canal anal tônico, os vasos de parede delgada (vênulas submucosas e linfáticos mesorretais) são comprimidos antes das arteríolas de maior pressão.\n' +
      '2. Congestão passiva\n' +
      '   - O aporte arterial mantém a entrada de sangue enquanto a drenagem venosa cai drasticamente; a mucosa assume tonalidade vermelho-escura a vinhosa.\n' +
      '3. Edema intersticial progressivo\n' +
      '   - A hipertensão capilar força a transudação de líquido para o interstício da submucosa e mucosa, aumentando o diâmetro e a rigidez do cilindro — criando um "gargalo" mecânico que impede a redução manual.\n' +
      '4. Colapso microvascular e hipóxia tecidual\n' +
      '   - O edema acentuado amplia a distância de difusão do oxigênio e eleva a pressão tecidual até superar a pressão de perfusão arteriolar.\n' +
      '5. Desvitalização epitelial, ulceração e necrose transmural\n' +
      '   - Falência da bomba Na⁺/K⁺-ATPase, ruptura da barreira epitelial de junções oclusivas, trombose microvascular, friabilidade tissular extrema e necrose enegrecida com odor fétido.\n\n' +
      'ATENÇÃO CLÍNICA: A mucosa retal exposta é naturalmente colonizada por microbiota fecal e desenvolve edema inflamatório rapidamente; portanto, presença de bactérias superficiais ou hiperemia intensa não equivalem automaticamente à sepse nem à morte tecidual irreversível. Por outro lado, mucosa com aspecto moderadamente avermelhado pode esconder isquemia profunda na base de estrangulamento — devendo-se julgar consistência (túrgida vs. friável/papirácea), sangramento capilar vivo vs. trombose escura, dor, tempo de exposição e resposta após desidratação osmótica.',
    tabelaCascataVascular: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Progressão fisiopatológica da lesão vascular no prolapso retal e sua tradução na decisão clínica',
      headers: [
        'Estágio evolutivo',
        'Alteração microvascular predominante',
        'Achados macroscópicos',
        'Impacto na conduta imediata',
      ],
      rows: [
        [
          'Inicial / intermitente',
          'Deslizamento mucoso reversível sem estrangulamento mantido',
          'Mucosa rósea, úmida, brilhante e flexível; retrai-se após cessar o esforço',
          'Tratar tenesmo e causa primária; avaliar proteção e lubrificação; evitar manipulações traumáticas',
        ],
        [
          'Congestivo edematoso (viável)',
          'Estase venolinfática pelo anel anal com perfusão arterial ainda preservada',
          'Cilindro vermelho-vivo ou vermelho-escuro, tenso e edemaciado, mas firme e sem friabilidade',
          'Proteger com salina, desidratar edema com solução hiperosmolar (dextrose 50%), anestesiar/analgesiar e reduzir gentilmente',
        ],
        [
          'Erosivo / ulcerado limítrofe',
          'Trauma mecânico somado à hipóxia capilar localizada',
          'Escoriações mucosas, placas fibrinoides, sangramento superficial discreto, edema severo',
          'Avaliação criteriosa sob sedação/anestesia; tentar descompressão osmótica suave; se bordas viáveis duvidosas ou irredutível, planejar cirurgia',
        ],
        [
          'Isquêmico avançado / necrótico',
          'Trombose arteriovenosa e falência energética celular transmural',
          'Cor roxo-enegrecida, cinzenta ou negra, superfície opaca, friabilidade ao toque, sangue escuro cianótico à incisão, odor fétido',
          'CONTRAINDICAÇÃO FORMAL à redução manual pelo risco de perfuração intraperitoneal/peritonite: indicar ressecção e anastomose imediata',
        ],
      ],
    },
    figuraProlapsoNecroseGatoBermani: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/bermani-2025-panel-a-necrose.jpg',
      alt: 'Prolapso retal completo em gata Persa adulta após seis dias de exposição, com seta branca apontando área necrótica superficial',
      display: 'default',
      shortCaption:
        'Prolapso retal felino após 6 dias de exteriorização com área descrita como necrótica (seta branca) — Bermani & Septiyani (2025) · CC BY-SA 4.0.',
      caption:
        'Prolapso retal completo em gata Persa adulta após seis dias de exteriorização persistente; a seta branca identifica região descrita pelos autores como necrótica. A constrição venosa e a congestão no anel anal comprometem progressivamente o retorno sanguíneo e linfático, favorecendo edema intersticial, isquemia e perda da barreira epitelial mucosa. Quadros dessa natureza ilustram a progressão de uma lesão inicialmente edematosa para desvitalização potencial, exigindo avaliação cirúrgica rigorosa de viabilidade antes de decidir entre redução e ressecção — sem julgar a gravidade apenas pelo comprimento exteriorizado. Autoria: Bermani & Septiyani (2025), ARSHI Veterinary Letters, 9(2):33–34 (Figura 1A). Licença: CC BY-SA 4.0 (reutilização permitida com atribuição e compartilhamento sob licença compatível).',
    },
    repercussoesHidroeletroliticas:
      'As alterações sistêmicas e hidroeletrolíticas não derivam diretamente da eversão anatômica, mas das afecções gastrointestinais ou urinárias subjacentes e do eventual comprometimento isquêmico:\n' +
      '- Enterocolites diarreicas: Fisiologicamente, o cólon reabsorve cerca de 90% do sódio e cloreto que chegam pelo íleo e secreta ativamente bicarbonato (via troca Cl⁻/HCO₃⁻) e potássio sob influência mineralocorticoide (aldosterona). Na colite grave ou enterite associada, a depleção de volume extracelular ativa o eixo renina-angiotensina-aldosterona, intensificando a ==espoliação renal e colônica de potássio (hipocalemia)== — a qual, por sua vez, reduz a excitabilidade da musculatura lisa intestinal, agravando a dismotilidade e o íleo secundário — além de poder gerar acidose metabólica hiperclorêmica por perda de bicarbonato fecal.\n' +
      '- Constipação e desidratação: A redução da ingestão hídrica ou desidratação subclínica intensifica a absorção colônica de água, endurecendo o bolo fecal no cólon descendente e reto, amplificando o atrito mucoso e o esforço expulsivo.\n' +
      '- Armadilha ácido-base: Nem todo paciente com prolapso e diarreia apresenta acidose metabólica simples. Vômitos concorrentes (por obstrução proximal/intussuscepção) podem mascarar perdas alcalinas ou produzir distúrbios mistos complexos com alcalose hipoclorêmica sobreposta à acidose lática hipovolêmica.',
  },
  clinicalSignsPathophysiology: {
    sinalCaracteristicoAnorretal:
      'A apresentação clínica é dominada pela exteriorização de um cilindro mucoso tubular pelo canal anal, acompanhada de sinais gastrointestinais, perineais ou urinários que denunciam a causa primária do esforço:\n' +
      '- Sinal cardinal anorretal: massa cilíndrica avermelhada, úmida e circunferencial emergindo pelo orifício anal; quanto maior o tempo sem proteção isotônica, maior o edema congestivo, exsudação serossanguinolenta, ulceração e risco de necrose.\n' +
      '- Reconhecimento visual de viabilidade vs. tamanho: o comprimento exteriorizado não define isoladamente se o tecido morreu — cilindros volumosos e edemaciados podem permanecer viáveis quando a perfusão capilar e a integridade mural são preservadas, como documentado clinicamente em filhotes atendidos precocemente.',
    figuraProlapsoCompletoCaoJovem: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/prolapso-completo-cao-jovem-wvs.jpg',
      alt: 'Fotografia clínica de prolapso retal completo em cadela jovem SRD exibindo cilindro tubular circunferencial de mucosa avermelhada ainda viável',
      display: 'wide',
      shortCaption:
        'Prolapso retal completo em cadela jovem (~4–5 meses): cilindro avermelhado viável apesar do volume exteriorizado (Anupat Tanseree / WVS Academy · CC BY-NC-SA 4.0).',
      caption:
        'Prolapso retal completo em cadela jovem (~4–5 meses, caso Hoo Kwang). Observe a exteriorização circunferencial de uma estrutura tubular revestida por mucosa avermelhada e brilhante, correspondente à eversão da parede retal através do canal anal. Neste caso, apesar do volume e do tempo de exposição, o tecido foi avaliado como viável — demonstrando que o tamanho da protrusão isoladamente não determina necrose e que coloração e edema devem ser interpretados junto à integridade mucosa, perfusão e possibilidade de redução. Autoria: Anupat Tanseree / WVS Academy (wvs.academy/case-reports/hoo-kwang-rectal-prolapse). Licença: CC BY-NC-SA 4.0 (uso educacional não comercial com atribuição; utilização comercial requer autorização específica do detentor).',
    },
    sinaisGastrointestinaisEGeniturinarios:
      '- Sinais gastrointestinais desencadeantes: tenesmo persistente e disquesia (muitas vezes perpetuados pelo próprio reto edemaciado), diarreia mucosa ou hematoquezia em enterocolites/parasitoses, ou constipação e fezes em fita (ribbon-like) em megacólon, massas e prostatopatia. Vômitos e dor abdominal são sinais de alerta vermelho para intussuscepção exteriorizada.\n' +
      '- Sinais geniturinários e sistêmicos: estrangúria, disúria ou bexiga distendida e firme (alerta máximo em gatos machos, em que obstrução uretral simula esforço fecal pelo compartilhamento pudendo); apatia, taquicardia, desidratação ou febre/hipotermia nas complicações obstrutivas e sépticas.\n' +
      '- Suporte pélvico alterado: abaulamento lateral ao ânus e saculação retal perceptível ao toque digital imediatamente após ultrapassar o esfíncter anal externo indicam hérnia perineal.',
    tabelaSinaisPorSistema: {
      kind: 'clinicalTable',
      caption: 'Tabela 4B — Achados clínicos por sistema acometido, mecanismo fisiopatológico e implicação imediata no plantão',
      headers: [
        'Sistema / região',
        'Achado clínico',
        'Frequência e relevância',
        'Mecanismo fisiopatológico',
        'Implicação clínica imediata',
      ],
      rows: [
        [
          'Anorretal e Perineal',
          'Massa tubular avermelhada exteriorizada pelo ânus',
          'Sinal cardinal obrigatório',
          'Eversão parcial da mucosa ou completa de todas as camadas retais por prensa abdominal acima da contenção do EAE',
          'Medir relação com o fórnice, manter úmida em salina isotônica e graduar viabilidade vascular antes de reduzir',
        ],
        [
          'Anorretal e Perineal',
          'Edema progressivo, ulceração, sangramento ou coloração roxo-negra',
          'Progressivo conforme tempo exposto',
          'Constrição venolinfática pelo anel anal somada a ressecamento, perda do filme mucoso e isquemia microvascular',
          'Diferencia redução após osmótico (viável) de ressecção cirúrgica obrigatória (necrótico)',
        ],
        [
          'Anorretal e Perineal',
          'Abaulamento perineal lateral ou saculação retal palpável',
          'Comum em cães machos idosos não castrados',
          'Atrofia de levantador do ânus e coccígeo (relaxina/idade) causando falha mecânica do diafragma pélvico',
          'Indica hérnia perineal concomitante (18–25% com retroflexão vesical); exige herniorrafia associada',
        ],
        [
          'Gastrointestinal',
          'Tenesmo persistente e disquesia dolorosa',
          'Muito relevante (motor e ciclo perpétuo)',
          'Sensibilização inflamatória/mecânica retal; após eversão, o próprio tecido edemaciado retroalimenta o arco reflexo',
          'Exige analgesia/anestesia e remoção do gatilho para impedir recidiva imediata após redução',
        ],
        [
          'Gastrointestinal',
          'Diarreia mucosa ou hematoquezia',
          'Predomina em filhotes e colites agudas',
          'Inflamação colorretal infecciosa ou parasitária (helmintos, coccídios, Giardia, T. foetus)',
          'Flotação centrífuga seriada / antígeno / PCR; contraindica laxativos enquanto houver diarreia ativa',
        ],
        [
          'Gastrointestinal',
          'Constipação ou fezes em fita (ribbon-like)',
          'Predomina em megacólon felino e prostatopatia/massas',
          'Desidratação fecal com estase ou compressão luminal/extraluminal na pelve',
          'Toque retal dirigido, radiografia pélvica e amolecedores fecais somente após excluir obstrução completa',
        ],
        [
          'Gastrointestinal',
          'Vômitos, anorexia e dor abdominal aguda',
          'Sinal de alarme vermelho',
          'Envolvimento entérico proximal ou intussuscepção ileocólica/colocolônica estrangulada exteriorizada',
          'Contraindica redução cega; indicar ultrassonografia abdominal imediatamente',
        ],
        [
          'Geniturinário e Sistêmico',
          'Estrangúria, oligúria, bexiga túrgida, apatia ou choque',
          'Emergência sobretudo em gatos machos',
          'Inervação pudenda compartilhada com uretra/bexiga; hipercalemia obstrutiva, hipovolemia ou sepse',
          'Palpar bexiga na triagem e estabilizar volemia (AAHA 2024) ou desobstruir uretra prioritariamente',
        ],
      ],
    },
  },
  diagnosis: {
    abordagemClinicaEDiferenciacaoFornice:
      'O reconhecimento visual de uma massa cilíndrica avermelhada protruindo pelo ânus estabelece o cenário clínico, mas ==a primeira obrigação diagnóstica é provar que se trata de prolapso retal verdadeiro e não de uma intussuscepção intestinal invaginada exteriorizada==.\n\n' +
      'Como realizar o teste anatômico do fórnice (sonda romba ou exploração digital): sob analgesia e contenção adequadas (nunca à força em paciente consciente com dor extrema), lubrifique generosamente um termômetro rombo, uma sonda macia de ponta arredondada ou o dedo mínimo enluvado e insira-o delicadamente entre a margem interna da pele anal (junção mucocutânea) e a parede externa da massa exteriorizada:\n' +
      '- Prolapso retal verdadeiro: a mucosa retal evagina diretamente na transição anocutânea formando um fundo de saco anatômico (fórnice). A sonda encontra resistência física imediata em poucos milímetros/centímetros e não progride ao longo da massa.\n' +
      '- Intussuscepção ileocólica ou colocolônica exteriorizada: o segmento invaginado (intussuscepto) desceu livremente pelo lúmen do cólon e reto sem que a mucosa retal distal esteja evertida na junção anal. Por isso, não há fórnice imediato e a sonda ou dedo lubrificado avança profundamente no espaço lateral entre a alça prolapsada e a parede do reto.\n\n' +
      'ATENÇÃO CLÍNICA: Embora seja uma manobra semiológica consagrada nos livros-texto, a exploração com sonda não possui sensibilidade nem especificidade validadas formalmente e pode sofrer falsos negativos ou falsos positivos diante de edema circunferencial grave ou aderências inflamatórias. Jamais forçar a progressão do instrumento pelo risco de perfuração retal; na menor dúvida, diante de vômitos ou dor abdominal, realizar ultrassonografia abdominal antes de tentar reduzir a massa.\n\n' +
      'Toque retal dirigido para hérnia perineal: em cães adultos/idosos após redução ou durante a investigação, o dedo indicador deve ser flexionado lateralmente logo após ultrapassar o anel anal (não além da primeira ou segunda articulação interfalangeana) para pesquisar perda do suporte muscular lateral do diafragma pélvico — inserir o dedo profundamente demais ultrapassa a pelve e deixa passar hérnias perineais pequenas ou unilaterais.',
    figuraProlapsoVsIntussuscepcaoFornice: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/prolapso-retal-vs-intussuscepcao-fornice.png',
      alt: 'Esquema anatômico comparativo entre prolapso retal verdadeiro (parede retal evertida formando fórnice junto ao anel anal) e intussuscepção exteriorizada (alça invaginada dentro do reto com espaço lateral)',
      display: 'wide',
      shortCaption:
        'Diferenciação anatômica entre prolapso retal verdadeiro (fórnice fechado na junção anal) e intussuscepção exteriorizada (espaço lateral livre ao teste da sonda romba).',
      caption:
        'Figura 1 — Diferenciação anatômica entre prolapso retal verdadeiro e intussuscepção intestinal exteriorizada (esquema conceitual simplificado, fora de escala anatômica). À esquerda, no prolapso retal verdadeiro, a própria parede retal sofre eversão contínua a partir da transição anocutânea (linha escura), formando um fundo de saco anatômico (fórnice) que interrompe rapidamente a progressão de uma sonda romba ou dedo lubrificado. À direita, na intussuscepção exteriorizada (ileocólica ou colocolônica), um segmento intestinal proximal invaginado atravessa o lúmen do reto mantendo um espaço lateral franco entre o intussuscepto e a parede retal (tracejado); a sonda romba progride livremente por esse espaço sem encontrar fórnice imediato — achado que contraindica redução digital cega e exige confirmação ultrassonográfica imediata.',
    },
    algoritmoDiagnosticoPlantao:
      'Sequência decisória prática para triagem, diferenciação e investigação etiológica:\n\n' +
      '1. Confirmar emergência e proteger o tecido — primeiros minutos\n' +
      '   - Avaliar FC, pulso, TPC, pressão arterial, mucosas, temperatura, escore de dor e palpar a bexiga.\n' +
      '   - Envolver imediatamente o segmento exposto em compressa estéril embebida em solução salina isotônica 0,9% ou Ringer lactato morno; impedir lambedura.\n' +
      '2. Determinar se é prolapso verdadeiro ou intussuscepção — avaliação anatômica inicial\n' +
      '   - Inspecionar circunferência, base de implantação (pedunculada focal vs. cilíndrica circunferencial) e pesquisar o fórnice com sonda romba bem lubrificada sob analgesia.\n' +
      '   - Havendo progressão lateral da sonda, vômitos, distensão ou dor abdominal, realizar ultrassonografia abdominal imediata.\n' +
      '3. Graduar viabilidade tecidual — antes de tentar reduzir\n' +
      '   - Avaliar coloração, consistência, integridade superficial, sangramento ativo e redutibilidade sem força bruta.\n' +
      '   - Suspeita de tecido necrótico/friável transfere o caso diretamente para planejamento cirúrgico (ressecção e anastomose).\n' +
      '4. Direcionar o gatilho primário conforme espécie, idade e fezes\n' +
      '   - Filhotes com diarreia/muco → investigação coproparasitológica e infecciosa.\n' +
      '   - Gatos com esforço e pouca urina / cauda baixa → avaliar uretra, bexiga (POCUS/urinálise) antes de presumir constipação.\n' +
      '   - Idosos ou crônicos com disquesia / fezes em fita → toque retal prostático e perineal, radiografia pélvica e endoscopia.\n' +
      '5. Solicitar exames laboratoriais e pré-anestésicos conforme risco\n' +
      '   - Não existe painel universal obrigatório em paciente estável com episódio mucoso agudo simples; em pacientes desidratados, anêmicos, sépticos ou cirúrgicos, checar hematócrito/PPT, leucograma, eletrólitos, função renal, albumina, lactato e gasometria.\n' +
      '6. Documentar evolução e primeira evacuação — primeiras 24–72 horas\n' +
      '   - Registrar frequência fecal, persistência de tenesmo, aspecto perianal, micção e sinais abdominais de alarme.',
    perfilLaboratorialExplicado:
      'O prolapso retal isolado não gera assinatura hematológica ou bioquímica específica. As alterações laboratoriais refletem a doença de base (enteropatia perdedora de proteínas, parasitismo espoliativo, obstrução urinária), o grau de desidratação e a eventual presença de isquemia ou sepse.',
    tabelaPerfilLaboratorial: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Interpretação mecanística do perfil laboratorial em cães e gatos com prolapso retal',
      headers: [
        'Exame / analito',
        'Achado possível',
        'Mecanismo fisiopatológico e armadilhas de interpretação',
      ],
      rows: [
        [
          'Hematócrito (VG) e Proteínas Plasmáticas Totais (PPT)',
          'Elevação paralela (hemoconcentração) ou anemia após reidratação',
          'Perda hídrica enteral reduz o volume plasmático concentrando eritrócitos e proteínas; anemia ferropênica crônica por ancilostomídeos/Trichuris ou sangramento retal pode ficar mascarada até expandir a volemia',
        ],
        [
          'Série vermelha completa',
          'Anemia normocítica ou microcítica hipocrômica em quadros crônicos',
          'Hemorragia mucosocutânea prolongada, parasitismo hematófago ou anemia da doença inflamatória; sangramento agudo discreto raramente derruba o VG de imediato',
        ],
        [
          'Leucograma',
          'Leucocitose neutrofílica (com ou sem desvio à esquerda) ou neutropenia em parvovirose/sepse',
          'Resposta à enterocolite, trauma mucosal ou contaminação cirúrgica; atenção: leucograma normal não exclui necrose focal do segmento retal exteriorizado',
        ],
        [
          'Albumina sérica',
          'Hipoalbuminemia leve a grave',
          'Perda proteica entérica (enteropatia inflamatória/parasitária) ou desnutrição; queda da pressão oncótica coloidal intensifica a formação de edema na parede retal evertida',
        ],
        [
          'Potássio (K⁺)',
          'Hipocalemia (diarreia/aldosteronismo) ou hipercalemia (se obstrução uretral associada)',
          'O cólon secreta K⁺ sob estímulo da aldosterona na depleção volêmica; hipocalemia agrava atonia/íleo intestinal. Em gato com obstrução uretral associada, hipercalemia representa risco arrítmico imediato',
        ],
        [
          'Sódio (Na⁺) e Cloro (Cl⁻)',
          'Hipo ou hipernatremia; hipo ou hipercloremia',
          'Dependem da relação entre perdas hipotônicas/isotônicas, ingestão hídrica e eventual iatrogenia (p. ex., enema com fosfato de sódio eleva Na⁺ e P e derruba Ca²⁺ ionizado)',
        ],
        [
          'Ureia e Creatinina',
          'Azotemia pré-renal (hipovolemia) ou pós-renal (obstrução uretral / retroflexão vesical)',
          'Avaliar em conjunto com densidade urinária antes de fluidoterapia e patência uretral em machos ou cães com hérnia perineal',
        ],
        [
          'Gasometria e Lactato',
          'Acidose metabólica, distúrbios mistos ou hiperlactatemia',
          'Perda colônica de HCO₃⁻ na diarreia grave gera acidose metabólica, mas vômitos de obstrução podem causar alcalose mista. Lactato normal não exclui isquemia restrita ao segmento prolapsado',
        ],
        [
          'Urinálise completa',
          'Hematúria, piúria, cristalúria ou alteração de densidade',
          'Auxilia na identificação de DTUIF/cistite/ITU associadas ao tenesmo urinário; interpretar sempre com ultrassonografia vesical e cultura quando pertinente',
        ],
      ],
    },
    imagemEndoscopiaParasitologia:
      'Os métodos de imagem e os exames fecais resolvem dois nós críticos: afastar uma intussuscepção proximal mascarada e documentar o agente ou lesão estrutural responsável pelo tenesmo.\n\n' +
      '- Diagnóstico parasitológico em filhotes e gatos (CAPC 2026): A flotação fecal com centrifugação (preferencialmente com sulfato de zinco ou açúcar de Sheather) aumenta muito a recuperação de oocistos de coccídios, cistos de Giardia e ovos de helmintos em relação à flotação passiva. Para Giardia duodenalis, o CAPC recomenda combinar esfregaço fecal direto, flotação centrífuga e ensaio de antígeno (ELISA) ou PCR em amostras seriadas devido à eliminação intermitente. Dois parasitas merecem alerta especial:\n' +
      '  • Trichuris vulpis em cães tem eliminação intermitente de ovos e período pré-patente longo de 74 a 90 dias, podendo causar colite hemorrágica grave e síndrome semelhante a hipoadrenocorticismo (pseudoaddisonismo) com coproparasitológico único falso-negativo.\n' +
      '  • Tritrichomonas foetus em gatos exige exame direto em salina morna (não refrigerar a amostra), cultivo em meio específico (InPouch TF) ou PCR fecal — o exame de flotação rotina destrói os trofozoítos e não o detecta.\n' +
      '- Limites de VPP e VPN: O valor preditivo positivo (VPP) de um teste fecal depende diretamente da probabilidade pré-teste clínica: encontrar cistos em um filhote assintomático tem peso etiológico muito distinto do achado em um filhote com colite aguda mucoide. O valor preditivo negativo (VPN) de uma única amostra negativa não descarta parasitose pré-patente ou de eliminação intermitente.\n' +
      '- Biópsias retais profundas: Em cães adultos/idosos com pólipo retal protruído ou suspeita neoplásica, adenocarcinomas podem assumir aspecto macroscópico polipoide idêntico a pólipos benignos; a biópsia endoscópica ou cirúrgica deve obrigatoriamente atingir a camada submucosa para caracterização histopatológica confiável.',
    tabelaImagemTestesComplementares: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Indicação, achados esperados e limitações dos exames complementares de imagem, endoscopia e laboratório específico',
      headers: [
        'Método diagnóstico',
        'Achados esperados relevantes',
        'Melhor indicação clínica',
        'Limitações e cuidados',
      ],
      rows: [
        [
          'Ultrassonografia abdominal completa',
          'Sinal do alvo (anéis concêntricos de parede sobreposta) na intussuscepção; espessamento em camadas do cólon; massas; próstata; bexiga e cálculos',
          'Dúvida no teste do fórnice, vômitos, dor abdominal, suspeita de intussuscepção, neoplasia ou doença prostática/vesical',
          'Operador-dependente; gás intraluminal pode prejudicar janela retal intrapélvica; não há sensibilidade universal validada para todas as massas perianais',
        ],
        [
          'POCUS abdominal / vesical',
          'Bexiga repleta/túrgida, líquido livre peritoneal ou distensão líquida de alças',
          'Triagem rápida na emergência em gatos com suspeita de obstrução uretral ou pacientes instáveis',
          'Não substitui ultrassonografia abdominal detalhada para rastrear intussuscepção distal ou massas pequenas',
        ],
        [
          'Radiografia abdominal e pélvica',
          'Retenção de fezes mineralizadas (obstipação/megacólon), corpos estranhos radiopacos, prostatomegalia, estreitamento pélvico ou retroflexão vesical/hérnia perineal',
          'Constipação/obstipação, trauma pélvico prévio, corpo estranho, suspeita de hérnia perineal',
          'Baixa sensibilidade isolada para intussuscepção distal não obstrutiva e para lesões mucosas não mineralizadas',
        ],
        [
          'Proctoscopia / Colonoscopia',
          'Proctite ulcerativa, corpo estranho oculto, estenose anorretal, pólipos pedunculados ou tumores sésseis/anulares',
          'Prolapso recorrente sem causa esclarecida, hematoquezia crônica ou massas focais após estabilização',
          'Requer preparo colônico e anestesia geral; contraindicada no paciente com necrose aguda antes da ressecção',
        ],
        [
          'Histopatologia (biópsia profunda ou peça cirúrgica)',
          'Diferenciação entre inflamação linfoplasmocítica/granulomatosa, pólipo adenomatoso e adenocarcinoma/linfoma; confirmação de extensão necrótica',
          'Toda massa retal ressecada/biopsiada e todo segmento submetido à ressecção e anastomose',
          'Amostras muito superficiais restritas à mucosa frequentemente perdem invasão submucosa de adenocarcinomas',
        ],
        [
          'Coproparasitológico seriado + Antígeno/PCR fecal',
          'Ovos de helmintos, oocistos de coccídios, cistos/antígeno de Giardia, DNA de T. foetus ou enteropatógenos virais/bacterianos',
          'Filhotes, gatos jovens de gatis, diarreia aguda ou crônica e animais sem vermifugação recente',
          'Eliminação intermitente; detecção de patógeno (p. ex. Clostridium ou Giardia) exige correlação clínica para provar causalidade',
        ],
      ],
    },
    tabelaDiagnosticosDiferenciais: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Diagnósticos diferenciais prioritários no plantão para massas perianais e tenesmo agudo',
      headers: [
        'Diagnóstico diferencial',
        'Por que confunde no exame rápido',
        'Achados que favorecem o diferencial',
        'Achados que desfavorecem prolapso simples',
        'Estratégia prática para diferenciar',
      ],
      rows: [
        [
          'Intussuscepção intestinal prolapsada (ileocólica / colocolônica)',
          'Exterioriza um cilindro tubular mucoso vermelho pelo orifício anal com aspecto quase idêntico',
          'Vômitos, anorexia, dor ou massa tubular palpável no abdome; ausência de fórnice na junção anal (sonda avança lateralmente)',
          'Continuidade direta da mucosa evertida com a junção mucocutânea anal bloqueando a sonda',
          'Teste cuidadoso da sonda romba lubrificada + ultrassonografia abdominal imediata (sinal do alvo)',
        ],
        [
          'Pólipo retal prolapsado',
          'Massa avermelhada e lobulada que protrui durante ou após a defecação',
          'Massa focal pedunculada ou multinodular em "framboesa", não circunferencial; hematoquezia crônica; raças como Dachshund Miniatura/WHWT/Bulldog Francês',
          'Cilindro simétrico e circunferencial envolvendo toda a parede retal',
          'Toque retal sob sedação, proctoscopia e excisão/biópsia com histopatologia incluindo base',
        ],
        [
          'Neoplasia anorretal (adenocarcinoma, linfoma, plasmocitoma)',
          'Sangramento vivo, tenesmo e protrusão parcial através do ânus',
          'Animal adulto/idoso, perda ponderal, lesão focal infiltrativa/anular, fezes em fita e ulceração endurecida',
          'Início súbito em filhote com enterocolite responsiva',
          'Palpação retal, proctoscopia com biópsia submucosa, estadiamento torácico/abdominal',
        ],
        [
          'Hérnia perineal (com ou sem retroflexão vesical)',
          'Deformação perineal evidente acompanhada de disquesia e tenesmo persistente',
          'Abaulamento subcutâneo lateral ao ânus (ou bilateral), desvio/saculação retal detectado logo após passar o anel anal',
          'Orifício anal central protruindo tubo mucoso sem defeito lateral do diafragma pélvico',
          'Toque retal lateralizado na 1ª–2ª falange + radiografia pélvica / ultrassom perineal (verificar posição da bexiga)',
        ],
        [
          'Doença / abscesso de sacos anais',
          'Dor perianal aguda, lambedura intensa, tenesmo e secreção purulenta/hemorrágica',
          'Edema ou fístula posicionados lateralmente às 4 e 7–8 horas; dor à palpação bidigital dos sacos anais',
          'Cilindro mucoso emergindo centralmente do canal anal',
          'Inspeção da abertura dos ductos e palpação interna/externa dos sacos anais sob analgesia',
        ],
        [
          'Corpo estranho retal / linear',
          'Material ou mucosa edemaciada projetada pelo ânus acompanhada de esforço doloroso',
          'Histórico de ingestão de ossos/brinquedos/linhas, estrutura rígida ou fio ancorado sublingualmente em gatos',
          'Mucosa retal circunferencial contínua sem material sólido ou fio intraluminal',
          'Exame oral (base da língua em gatos!), inspeção delicada e radiografia abdominal',
        ],
        [
          'Obstrução uretral / DTUIF (sobretudo felinos)',
          'Tutor descreve esforço incessante na caixa sanitária confundido com "tentativa de evacuar"',
          'Bexiga globosa e pétrea, oligúria/anúria, cauda mantida baixa durante o esforço, gotejamento urinário',
          'Micção normal volumosa e fezes diarreicas copiosas',
          'Palpação vesical obrigatória em TODO gato com tenesmo + POCUS e avaliação eletrolítica',
        ],
        [
          'Prolapso uretral (machos braquicefálicos)',
          'Pequena protrusão mucosa vermelho-escura na região urogenital sangrando aos pingos',
          'Lesão na extremidade distal do pênis em Bulldogs Ingleses/Boston Terriers inteiros',
          'Protrusão anatomicamente originada do canal anal',
          'Inspeção anatômica direta do prepúcio/pênis versus períneo/ânus',
        ],
      ],
    },
  },
  treatment: {
    estabilizacaoInicialEPrimeirosMinutos:
      'O plano terapêutico responde simultaneamente a três frentes indissociáveis: (1) proteger e restaurar ou ressecar o tecido exteriorizado, (2) interromper o arco reflexo dor-espasmo-tenesmo e (3) tratar a enfermidade desencadeante. ==A presença de um prolapso retal não justifica automaticamente bolus de fluidos, antibióticos ou cirurgia de ressecção; cada intervenção deve obedecer à estratificação clínica real.==\n\n' +
      'Conduta imediata na triagem (0–15 minutos):\n' +
      '1. Proteger e hidratar a mucosa exposta\n' +
      '   - Lavar detritos fecais delicadamente com solução fisiológica 0,9% ou Ringer lactato morno sem friccionar a mucosa friável; cobrir com gaze umedecida em salina isotônica estéril e aplicar colar elisabetano para impedir autotraumatismo.\n' +
      '2. Checar prioridades de risco imediato à vida\n' +
      '   - Avaliar perfusão sistêmica (choque hipovolêmico por enterite ou sepse), patência uretral (bexiga túrgida em felinos), vômitos/sinais de intussuscepção invaginada e coloração/friabilidade indicativa de necrose retal.',
    fluidoterapiaERessuscitacao:
      'Em pacientes normovolêmicos sem perdas sistêmicas relevantes, não se deve forçar expansão volêmica agressiva; a hidratação de manutenção corrigirá déficits brandos. Já nos animais hipovolêmicos (filhotes com enterite hemorrágica grave, intussuscepção ou sepse), a correção da perfusão sistêmica é pré-requisito obrigatório antes da sedação ou anestesia, melhorando também a oferta de oxigênio aos tecidos retais viáveis — embora jamais desfaça mecanicamente um estrangulamento anorretal estabelecido.',
    tabelaFluidoterapiaAaha2024: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Ressuscitação volêmica em hipovolemia conforme diretrizes AAHA 2024 de Fluidoterapia em Cães e Gatos',
      headers: [
        'Espécie',
        'Bolus inicial (cristaloide isotônico tamponado)',
        'Tempo de infusão',
        'Parâmetros de reavaliação obrigatória após cada bolus',
      ],
      rows: [
        [
          'Cães',
          '15–20 mL/kg IV (titular à resposta clínica)',
          '15–30 minutos',
          'FC, qualidade de pulso, cor de mucosas, TPC, pressão arterial, lactato, mentação e ausculta cardiopulmonar',
        ],
        [
          'Gatos',
          '5–10 mL/kg IV (cautela redobrada pelo menor volume sanguíneo e risco de sobrecarga)',
          '15–30 minutos',
          'Mesmos parâmetros hemodinâmicos + frequência respiratória, esforço inspiratório e detecção precoce de sobrecarga hídrica/derrame',
        ],
      ],
    },
    reducaoManualEControleEdema:
      'Para segmentos comprovadamente viáveis e após excluir intussuscepção exteriorizada, a redução manual atraumática constitui a primeira linha terapêutica:\n\n' +
      '1. Analgesia, relaxamento anal e contenção adequados\n' +
      '   - Realizar sob sedação profunda, anestesia geral inalatória/total intravenosa ou analgesia sistêmica associada a bloqueio locorregional (ver papel da epidural abaixo), eliminando a contração involuntária de defesa e a prensagem abdominal.\n' +
      '2. Limpeza atraumática\n' +
      '   - Irrigar abundantemente com solução salina isotônica 0,9% morna para remover fezes, areia sanitária ou coágulos superficiais.\n' +
      '3. Redução osmótica do edema (quando o edema impede a passagem pelo canal anal)\n' +
      '   - Aplicar topicamente solução hiperosmolar estéril — dextrose a 50% ou manitol a 70% — durante alguns minutos sobre a mucosa evertida para criar gradiente osmótico que drena líquido intersticial da submucosa, reduzindo visivelmente o volume do cilindro; enxaguar gentilmente antes ou após o retorno conforme protocolo local.\n' +
      '   - Nota sobre resfriamento local: bolsas frias protegidas de curta duração são ocasionalmente descritas, mas carecem de ensaios comparativos robustos e exigem cautela para não induzir vasoconstrição excessiva ou lesão térmica.\n' +
      '4. Lubrificação e reposicionamento progressivo\n' +
      '   - Aplicar gel lubrificante hidrossolúvel estéril em toda a circunferência e exercer pressão digital delicada, constante e concêntrica com os dedos protegidos por gaze/luva lubrificada, empurrando o ápice do prolapso de volta ao lúmen pélvico sem rasgar a mucosa friável.\n' +
      '   - Nota sobre protetores de mucosa: quando a mucosa reduzida permanece intensamente inflamada desencadeando tenesmo refratário pós-redução, enemas de retenção suaves com caulim-pectina ou sulfato de bário foram tradicionalmente citados para revestir e acalmar a mucosa — hoje preteridos ou usados apenas com extrema parcimônia diante de boas opções analgésicas sistêmicas/epidurais.\n' +
      '5. Verificação anatômica pós-redução\n' +
      '   - Introduzir delicadamente um dedo bem lubrificado (ou cateter macio em pacientes miniatura) para confirmar que toda a parede retal retornou à posição intrapélvica sem dobras ou invaginação residual no canal anal.',
    suturaBolsaDeTabaco:
      'Após redução completa de um prolapso completo ou propenso à recorrência imediata, uma sutura anal temporária em bolsa de tabaco (purse-string suture) com fio monofilamentar não absorvível (p. ex., náilon 2-0 a 4-0 conforme o porte) é posicionada ao redor do orifício anal para conter mecanicamente a parede retal enquanto se trata a inflamação primária.\n\n' +
      'REGRA DE OURO: Calibração segura — atar a sutura sobre um guia cilíndrico inserido no canal anal (seringa de 3 mL em gatos/cães pequenos, cateter uretral flexível tipo red rubber ou dedo mínimo lubrificado proporcional ao paciente) e retirar o guia em seguida garante que o orifício remanescente impeça nova eversão da parede total, mas ==permaneça pérvio para passagem livre de fezes pastosas==.\n\n' +
      'ALERTA CLÍNICO SOBRE DURAÇÃO: Os livros-texto tradicionais divergem acentuadamente quanto ao tempo de permanência da bolsa de tabaco (Tabela 9), refletindo diferenças de escola cirúrgica e ausência de ensaios clínicos randomizados comparativos. Como regra prática contemporânea, uma janela inicial de ==5 a 7 dias== é amplamente utilizada (Igna et al., 2021), mas o ponto deve ser reavaliado diariamente e removido ou refeito precocemente se surgir constipação funcional, dor ao evacuar ou infecção local.',
    tabelaTempoBolsaDeTabaco: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Faixas descritas para o tempo de manutenção da sutura em bolsa de tabaco conforme contexto clínico',
      headers: [
        'Abordagem / referência clínica',
        'Tempo descrito',
        'Contexto clínico de interpretação',
      ],
      rows: [
        [
          'Contenção curta em colite aguda responsiva',
          '1–3 dias',
          'Foco em conter recorrência imediata pós-redução enquanto o tenesmo agudo cede com o tratamento da causa de base',
        ],
        [
          'Conduta clínica padrão contemporânea',
          '5–7 dias',
          'Equilíbrio prático entre tempo de desinflamação mucosa e baixo risco de retenção fecal',
        ],
        [
          'Igna et al., 2021 (série retrospectiva de 53 cães e gatos)',
          '5–7 dias',
          'Aplicada aos 41 casos agudos reduzidos manualmente na casuística cirúrgica descrita',
        ],
        [
          'Protocolo conservador para edema extenso ou lento a regredir',
          '10–14 dias',
          'Contenção mais prolongada reservada a prolapsos extensos; exige monitoramento rígido da evacuação diária',
        ],
      ],
    },
    figuraReducaoBolsaTabacoBermani: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/bermani-2025-panels-bcd-reducao-tabaco.jpg',
      alt: 'Sequência terapêutica de redução retal manual, sutura perianal em bolsa de tabaco sobre seringa guia e evacuação fecal pós-procedimento em gato',
      display: 'full',
      shortCaption:
        'Etapas de reposicionamento (B), bolsa de tabaco calibrada (C) e patência fecal pós-operatória (D) — Bermani & Septiyani (2025) · CC BY-SA 4.0.',
      caption:
        'Sequência documentada de redução e contenção temporária em prolapso retal felino: (B) lavagem e reposicionamento digital delicado da mucosa lubrificada; (C) posicionamento de sutura perianal em bolsa de tabaco utilizando seringa como guia luminal para evitar estenose iatrogênica; (D) eliminação de fezes no pós-procedimento, confirmando abertura anal patente. Nota crítica: embora os autores tenham obtido êxito após redução nesse caso isolado, isso não autoriza reduzir segmentos comprovadamente necróticos em espessura total. Autoria: Bermani & Septiyani (2025), ARSHI Veterinary Letters, 9(2):33–34 (Figura 1B–D). Licença: CC BY-SA 4.0 (com ressalva de que o inset esquemático no painel C foi adaptado de fonte terceira citada no artigo original).',
    },
    papelDaEpiduralEAnestesia:
      'A anestesia/analgesia locorregional do eixo caudal desempenha papel estratégico em dois momentos: facilitar a redução sem tensão esfincteriana e quebrar temporariamente o arco reflexo nociceptivo do tenesmo pós-redução.\n\n' +
      '- Por que preferir bloqueio sacrococcígeo (S–Co1) ou intercoccígeo (Co1–Co2) em gatos e filhotes? Anatômica e clinicamente, o cone medular em gatos frequentemente estende-se até aproximadamente S1 (diferente do cão adulto médio, no qual termina próximo a L6–L7), fazendo com que a punção lombossacra em felinos ou filhotes apresente maior risco de punção subaracnóidea acidental. A epidural sacrococcígea (agulha 25G inserida a 30–45° com 0,1 mg/kg de morfina sem conservantes associada a 0,22 mg/kg de bupivacaína 0,5%, volume total máximo ≤ 0,2 mL/kg) anestesia exclusivamente o nervo pudendo e raízes pélvicas/caudais — produzindo excelente analgesia perineal, relaxamento do EAE e controle do tenesmo em ≤ 5 minutos **sem causar bloqueio motor dos membros pélvicos**.\n' +
      '- Cuidados e limitações da epidural: Exige assepsia cirúrgica rigorosa (contraindicada se houver piodermite ou celulite sobre o local de punção; risco raro de abscesso epidural/discoespondilite) e está contraindicada em hipovolemia não corrigida ou coagulopatia. Ao empregar morfina epidural (duração de 12–24 h), monitorar ativamente o esvaziamento vesical nas primeiras 24 horas pelo risco conhecido de retenção urinária opioide-induzida; lembrar também que o bloqueio alivia o reflexo doloroso por horas, mas nunca elimina a causa etiológica se ela permanecer sem tratamento.',
    colopexiaIndicacoesETecnicas:
      'Quando o prolapso retal viável recidiva após redução e sutura temporária — ou apresenta comprimento/frouxidão tal que não se sustenta no interior da pelve mesmo após resolução aparente da causa — a ==colopexia cirúrgica== é a técnica definitiva de escolha para preservar a anatomia funcional do reto sem amputá-lo (inclusive em filhotes felinos jovens com recidiva, conforme caso externo Dr. Vet, 2025).\n\n' +
      'Princípio mecânico e biológico: traciona-se gentilmente o cólon descendente em sentido cranial até o reto retornar por completo ao canal pélvico e ancora-se a borda antimesentérica do cólon descendente à parede abdominal lateral esquerda (tipicamente com 4 a 5 pontos de sutura não absorvível em camada seromuscular/submucosa sem jamais penetrar o lúmen colônico). A resposta inflamatória reparativa gera adesão fibrosa permanente que impede novo deslizamento aboral sob prensa abdominal — evitando tensão excessiva ou acotovelamento que causem estenose luminal.',
    tabelaModalidadesColopexia: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Comparação prática entre as abordagens cirúrgicas de colopexia em prolapso retal viável',
      headers: [
        'Modalidade cirúrgica',
        'Princípio técnico',
        'Vantagens clínicas potenciais',
        'Limitações e pontos críticos',
      ],
      rows: [
        [
          'Colopexia aberta não incisional',
          'Fixação direta da camada seromuscular do cólon descendente (e escarificação serosal opcional) à parede abdominal esquerda via celiotomia',
          'Execução direta, ampla visualização da cavidade abdominal (útil se necessário revisar alças ou próstata)',
          'Maior trauma de acesso pela laparotomia; requer cuidado absoluto para não transfixar a luz colônica com a sutura',
        ],
        [
          'Colopexia aberta incisional',
          'Incisão seromuscular superficial do cólon descendente e da parede muscular transversa abdominal com sutura borda a borda',
          'Cria ampla superfície de contato cruento promovendo adesão fibrosa teoricamente mais robusta',
          'Maior risco técnico de perfuração luminal inadvertida durante dissecção e deiscência local da parede se houver tensão excessiva',
        ],
        [
          'Colopexia laparoscópica assistida',
          'Inspeção videolaparoscópica por portais (p. ex., 2 portais, Secchi et al., 2012) com exteriorização parcial da parede para sutura sob menor ferida cirúrgica',
          'Menor incisão parietal que laparotomia clássica mantendo sutura extracorpórea tecnicamente acessível',
          'Pode exigir leve ampliação de portal; necessita equipamento laparoscópico e treinamento',
        ],
        [
          'Colopexia totalmente laparoscópica',
          'Preparo superficial e sutura intracorpórea (inclusive com fio farpado, Guadalupi et al., 2024; 2 portais, Cifuentes Laponio, 2026) sem abertura parietal ampla',
          'Acesso minimamente invasivo com menor dor parietal inicial e retorno precoce à alimentação nas séries descritas',
          'Exige curva de aprendizado avançada em sutura intracorpórea; evidência baseada em pequenas séries/relatos sem ensaios randomizados contra técnica aberta',
        ],
      ],
    },
    figuraPortaisColopexiaGuadalupi: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/colopexia-portais-guadalupi-2024.png',
      alt: 'Posicionamento cirúrgico de três portais laparoscópicos de 5 mm para colopexia totalmente laparoscópica em gato com prolapso retal recorrente',
      display: 'wide',
      shortCaption:
        'Disposição de três portais de 5 mm em colopexia totalmente laparoscópica felina (Guadalupi et al., 2024 · CC BY 4.0).',
      caption:
        'Posicionamento dos três portais de 5 mm para colopexia totalmente laparoscópica em gato. O portal óptico permite visibilização da cavidade abdominal e da transição colorretal, enquanto os portais instrumentais possibilitam tração cranial controlada do cólon descendente e execução da sutura intracorpórea junto à parede abdominal esquerda — ensinando como a disposição ergonômica dos acessos minimamente invasivos viabiliza alinhamento sem celiotomia ampla. Autoria: Guadalupi et al. (2024), Veterinary Sciences, 11(8):355 (Figura 1). Licença: CC BY 4.0.',
    },
    figuraColopexiaImediataGuadalupi: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/colopexia-sutura-imediata-guadalupi-2024.png',
      alt: 'Aspecto laparoscópico da colopexia recém-concluída com sutura seromuscular intracorpórea fixando o cólon descendente à parede abdominal em gato',
      display: 'wide',
      shortCaption:
        'Colopexia laparoscópica felina recém-concluída: aposição seromuscular sem penetração luminal (Guadalupi et al., 2024, Fig. 3 · CC BY 4.0).',
      caption:
        'Aspecto intraoperatório imediatamente após a confecção da sutura na colopexia laparoscópica felina. A aproximação seromuscular entre o cólon descendente e a parede abdominal esquerda estabelece contenção mecânica imediata enquanto preserva o lúmen intestinal íntegro e livre de transfixação da mucosa (prevenindo contaminação e abscessos). Autoria: Guadalupi et al. (2024), Veterinary Sciences, 11(8):355 (Figura 3). Licença: CC BY 4.0.',
    },
    figuraColopexiaAderenciaGuadalupi: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/colopexia-aderencia-4sem-guadalupi-2024.png',
      alt: 'Visão laparoscópica quatro semanas após colopexia demonstrando formação de aderência fibrosa madura e estável entre o cólon e a parede abdominal',
      display: 'wide',
      shortCaption:
        'Aderência fibrosa estável observada após 4 semanas em segunda laparoscopia (Guadalupi et al., 2024, Fig. 4 · CC BY 4.0).',
      caption:
        'Avaliação laparoscópica de segunda visão realizada quatro semanas após a colopexia felina, demonstrando formação de aderência fibrosa biológica madura e estável entre a serosa colônica e a parede abdominal. Comparada à fixação mecânica imediata (figura anterior), ilustra o verdadeiro mecanismo fisiopatológico de longo prazo da colopexia: a cicatrização controlada impede novo deslocamento caudal sem tensão excessiva nem angulação intestinal. Autoria: Guadalupi et al. (2024), Veterinary Sciences, 11(8):355 (Figura 4). Licença: CC BY 4.0.',
    },
    figuraColopexiaCaoPark: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/colopexia-laparoscopica-cao-park-2026.webp',
      alt: 'Sequência intraoperatória da colopexia laparoscópica em cão demonstrando tração cranial do cólon, preparo parietal e sutura seromuscular após correção de hérnia perineal',
      display: 'full',
      shortCaption:
        'Sequência intraoperatória de colopexia laparoscópica em cão com prolapso pós-hérnia perineal (Park, Lee & Kim, 2026, Fig. 3 · CC BY 4.0).',
      caption:
        'Sequência intraoperatória da colopexia laparoscópica em cão que desenvolveu prolapso retal após reparação de hérnia perineal crônica. Os quadros demonstram identificação e tração cranial do cólon distal, preparação controlada das superfícies de fixação e aplicação de suturas seromusculares na parede abdominal esquerda — reforçando que a fixação deve impedir eversão caudal sem provocar angulação, estenose ou perfuração do lúmen colônico. Autoria: Park, Lee & Kim (2026), Frontiers in Veterinary Science, 13:1858804 (Figura 3). Licença: CC BY 4.0.',
    },
    resseccaoEAnastomose:
      'A ressecção retal com anastomose término-terminal fica estritamente reservada aos casos com ==necrose franca, desvitalização vascular irreversível ou laceração extensa que inviabiliza a recuperação tecidual e impede redução segura==.\n\n' +
      'Fundamentos cirúrgicos críticos: o cirurgião deve ressecar todo o segmento isquêmico identificando margens francamente sangrantes (sangue vermelho vivo na submucosa/muscular), preservar ao máximo o canal anal e o esfíncter anal externo para evitar incontinência permanente, realizar sutura de aposição cuidadosa sem tensão anastomótica nem inversão excessiva que reduza o diâmetro luminal (alto risco de estenose anorretal cicatricial — razão do pior prognóstico funcional nos casos que necessitam ressecção) e avaliar abordagem perineal versus celiotomia combinada conforme a extensão proximal da necrose.',
    algoritmoTerapeuticoPorFenotipo:
      'Decisão cirúrgica e clínica estratificada por fenótipo à admissão:\n\n' +
      '1. Tecido viável, redutível e primeiro episódio agudo\n' +
      '   - Proteção salina → analgesia/sedação → redução osmótica do edema se preciso → redução manual atraumática → bolsa de tabaco frouxa se tendência à reexteriorização → tratar causa primária.\n' +
      '2. Tecido viável, porém recorrente ou não contido por sutura anal\n' +
      '   - Reinvestigar causas ocultas (hérnia perineal, T. vulpis, T. foetus, próstata, pólipo/tumor, uretra) → colopexia aberta ou laparoscópica (preservar o reto viável!) + correção simultânea da causa (p. ex. herniorrafia/orquiectomia).\n' +
      '3. Tecido inviável (roxo-escuro/negro, friável, fétido) ou irredutível gravemente traumatizado\n' +
      '   - Estabilização hemodinâmica → profilaxia antimicrobiana perioperatória racional → ressecção e anastomose retal em margens viáveis → vigilância intensiva de peritonite/deiscência/estenose.\n' +
      '4. Suspeita ou confirmação de intussuscepção exteriorizada\n' +
      '   - Não forçar redução anal cega → ultrassonografia abdominal → laparotomia exploratória para redução cirúrgica ou enterectomia/enteroanastomose (com exceções raras relatadas na literatura em filhotes selecionados sem isquemia, Moores et al., 2021).',
    tratamentoDaCausaDeBase:
      'Sem remover a fonte de tenesmo ou resistência mecânica, qualquer procedimento retal falhará:\n' +
      '- Enterocolites e parasitoses: Hidratação, dieta altamente digestível ou modulação de fibras, antiparasitário dirigido após exame/suspeita fundamentada (p. ex., fenbendazol 50 mg/kg VO q24h por 3–5 dias com alimento para aumentar biodisponibilidade em helmintoses e giardíase conforme indicação clínica, repetindo em 2–3 semanas e aos 3 meses em Trichuris vulpis devido ao ciclo longo). Não utilizar metronidazol empiricamente em diarreia aguda simples pelo risco de disbiose sustentada e neurotoxicidade dose-dependente.\n' +
      '- Constipação e obstipação: Corrigir primeiramente hidratação e descartar obstrução mecânica completa antes de prescrever laxantes osmóticos como lactulose. Em felinos constipados crônicos, formulações cristalinas ou mistura em alimento úmido superam a recusa do xarope; nunca utilizar enemas comerciais de fosfato de sódio (Fleet) pelo risco de choque iônico letal.\n' +
      '- Obstrução uretral / DTUIF: Desobstrução uretral imediata, correção de hipercalemia/acidose e analgesia multimodal assumem prioridade vital absoluta antes ou concomitantemente à redução retal.\n' +
      '- Hérnia perineal e doença prostática: Orquiectomia nos machos inteiros (reduz volume prostático e relaxina) e reconstrução cirúrgica do diafragma pélvico associada ou sequencial à colopexia quando o prolapso retal coexiste ou se desenvolve após herniorrafia (Park, Lee & Kim, 2026).',
    tabelaFarmacologiaAplicada: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Tabela mestre de farmacologia aplicada ao prolapso retal (alinhada ao consenso ENOVAT 2025/2026)',
      headers: [
        'Fármaco / terapia',
        'Espécie',
        'Indicação específica',
        'Dose documentada',
        'Via e intervalo',
        'Evidência e alertas farmacológicos críticos',
      ],
      rows: [
        [
          'Dextrose 50% (estéril)',
          'Cães e gatos',
          'Redução osmótica temporária de edema mucoso pré-redução',
          'Aplicação tópica localizada cobrindo a mucosa por alguns minutos',
          'Uso tópico pontual antes da redução (enxaguar suavemente)',
          'Apenas medida auxiliar para edema — NUNCA substitui avaliação cirúrgica de necrose',
        ],
        [
          'Manitol 70%',
          'Cães e gatos',
          'Alternativa tópica hiperosmolar ao edema retal',
          'Aplicação tópica localizada pontual',
          'Uso tópico durante tentativa de redução',
          'Evitar contato prolongado excessivo e jamais aplicar sobre tecido claramente desvitalizado ou necrosado',
        ],
        [
          'Buprenorfina',
          'Cães e gatos',
          'Analgesia de dor leve a moderada',
          'Cães: 0,02 mg/kg · Gatos: 0,02–0,03 mg/kg',
          'IV, IM ou transmucosa oral (gatos) q6–8h',
          'Agonista parcial µ (início lento > 15 min, duração ~6 h). EVITAR via SC pela baixa absorção/eficácia; pode ser insuficiente em dor pós-ressecção (preferir agonista puro como metadona)',
        ],
        [
          'Morfina + Bupivacaína 0,5% (epidural sacrococcígea)',
          'Gatos (e cães pequenos)',
          'Anestesia perineal/anal para redução refratária e alívio do tenesmo sem paralisia pélvica',
          'Morfina s/ preservativo 0,1 mg/kg + Bupivacaína 0,5% 0,22 mg/kg (vol. total ≤ 0,2 mL/kg)',
          'Epidural sacrococcígea (S–Co1 / Co1–Co2) dose única',
          'Evita punção medular em gatos (medula até S1); monitorar retenção urinária por até 24 h pela morfina',
        ],
        [
          'Lactulose (faixa conservadora)',
          'Cães e gatos',
          'Constipação associada após redução (amolecimento fecal)',
          'Cães: 0,25–0,5 mL/kg · Gatos: 0,5 mL/kg (≈ 2–3 mL/gato)',
          'VO q6–8h (cães) / q8–12h (gatos)',
          'CONTRAINDICADA em obstrução GI ou diarreia ativa; requer bactérias colônicas (antibióticos reduzem fermentação); titular para 2–3 fezes macias/dia',
        ],
        [
          'Lactulose (titulação clínica ampla)',
          'Cães e gatos',
          'Constipação associada (titulação clínica)',
          'Cães: 0,5–1 mL/kg · Gatos: 0,5–5 mL/gato',
          'VO q8–12h ajustando à resposta',
          'Variação entre protocolos de referência: faixa canina mais ampla exige titulação individual para evitar diarreia e hipocalemia',
        ],
        [
          'Fenbendazol',
          'Cães e gatos',
          'Helmintíases (Toxocara, Ancylostoma, Trichuris) e Giardia conforme indicação',
          '50 mg/kg (doses felinas específicas variam conforme agente/diretriz)',
          'VO q24h por 3–5 dias sempre com alimento',
          'Alimento melhora absorção; para Trichuris vulpis repetir em 2–3 semanas e 3 meses devido ao período pré-patente longo',
        ],
        [
          'Cefazolina (ENOVAT 2025/2026)',
          'Cães e gatos',
          'Profilaxia perioperatória em cirurgia limpa-contaminada (colopexia/ressecção)',
          '22–25 mg/kg',
          'IV 30–60 min antes da incisão; redose a cada 2 h no transoperatório se cirurgia longa',
          'NÃO indicada em redução manual simples; cobrir Gram+ e parte de Gram-; associar metronidazol se abertura de cólon/reto',
        ],
        [
          'Metronidazol (ENOVAT 2025/2026)',
          'Cães e gatos',
          'Cobertura anaeróbia complementar quando há entrada cirúrgica no lúmen colorretal',
          '15 mg/kg',
          'IV lento (30–60 min) pré-operatório; redose q8h se indicado no perioperatório',
          'NÃO usar como profilaxia isolada nem em diarreia aguda não complicada (risco de disbiose e neurotoxicidade cerebelar/vestibular em doses altas/prolongadas)',
        ],
      ],
    },
    particularidadesEContraindicacoesFarmacologicas:
      'ALERTA FARMACOLÓGICO: Particularidades essenciais para prescrição segura:\n' +
      '- Enemas de fosfato de sódio (Fleet): CONTRAINDICAÇÃO FORMAL em gatos e cães pequenos (< 5 kg) pelo risco de hiperfosfatemia maciça, hipernatremia, hipocalcemia tetânica aguda e óbito. Para enemas desimpactantes usar exclusivamente água morna ou salina isotônica 0,9% lubrificada (5–10 mL/kg) ou docusato sódico diluído.\n' +
      '- Anti-inflamatórios não esteroidais (AINEs): Devem ser rigorosamente evitados antes da restauração completa da volemia, função renal e hidratação — além de apresentarem risco gastrintestinal agravado caso o paciente curse com enteropatia erosiva ou colite ulcerativa.\n' +
      '- Opioides agonistas puros vs. parciais: Embora opioides possam reduzir transitoriamente a motilidade propulsiva colônica, o controle álgico adequado reduz o esforço visceral reflexo e viabiliza a manipulação sem sofrimento; após cirurgias dolorosas (ressecção/anastomose ou colopexia), agonistas µ puros como metadona ou fentanil superam a buprenorfina em eficácia analgésica, enquanto em gatos a via subcutânea de buprenorfina deve ser evitada em favor das vias IV, IM ou OTM.',
    stewardshipAntibioticosEnovat:
      'MITO: "Todo reto prolapsado ficou exposto às fezes, então todo paciente precisa de 7 a 14 dias de antibiótico sistêmico." — Essa prática histórica conflita frontalmente com os princípios modernos de uso racional de antimicrobianos.\n\n' +
      'A luz retal alberga normalmente elevada carga bacteriana comensal; exposição mucosa externa ou colonização superficial sem invasão tecidual não caracteriza infecção invasiva nem sepse. A redução manual de tecido viável sem quebra da integridade cirúrgica não exige antibioticoprofilaxia.\n\n' +
      'Seguindo a diretriz ==ENOVAT 2025/2026== (publicada em dezembro de 2025 e consolidada no Journal of Small Animal Practice em maio de 2026):\n' +
      '- Em cirurgias gastrointestinais limpas-contaminadas (como ressecção retal controlada sem extravasamento), recomenda-se condicionalmente profilaxia exclusivamente perioperatória (cefazolina IV com cobertura anaeróbia complementar como metronidazol quando há abertura colorretal), recomendando-se ==contra a manutenção rotineira de antibióticos no pós-operatório== quando não existe infecção estabelecida.\n' +
      '- Apenas em procedimentos francamente contaminados por extravasamento fecal intrapélvico ou abdominal admite-se antibioticoterapia pós-operatória curta (3–5 dias) com reavaliação clínica diária, ao passo que peritonite séptica instalada passa a ser guiada por controle do foco, ressuscitação e cultura/antibiograma.',
    protocoloPlantaoPassos:
      'O que fazer no plantão — raciocínio sequencial em 6 atos:\n' +
      '1. Triagem imediata e proteção do cilindro\n' +
      '   - Avaliar perfusão, dor, hidratação e bexiga antes de tocar na massa; umedecer continuamente com salina isotônica 0,9% morna e colocar colar elisabetano.\n' +
      '2. Teste anatômico diferencial (prolapso vs. intussuscepção)\n' +
      '   - Analgesiar/sedar de forma segura e testar delicadamente o fórnice com sonda romba bem lubrificada. Suspeitou de espaço lateral, vômitos ou abdome doloroso? Ultrassonografia abdominal antes de reduzir.\n' +
      '3. Julgar viabilidade antes de empurrar\n' +
      '   - Vermelho/edematoso firme → viável: enxaguar, usar dextrose 50% tópica se o edema bloquear o anel anal e reduzir sem força.\n' +
      '   - Roxo-escuro/negro, friável ou fétido → inviável: interromper redução e acionar equipe cirúrgica para ressecção/anastomose.\n' +
      '4. Contenção inteligente e sem obstrução\n' +
      '   - Quando indicar bolsa de tabaco, amarrar sobre seringa de 3 mL ou cateter uretral flexível garantindo passagem de fezes macias (planejar 5–7 dias com checagem diária de evacuação).\n' +
      '5. Tratar a causa do tenesmo na mesma internação\n' +
      '   - Coproparasitológico seriado/antígeno em jovens; patência uretral/POCUS em gatos; avaliação prostática, retal e perineal em cães idosos.\n' +
      '6. Recorreu com tecido saudável?\n' +
      '   - Não amputar um reto viável apenas pela recorrência: investigar gatilho oculto e realizar colopexia.',
  },
  complications: {
    vigilanciaEComplicacoesCriticas:
      'As complicações diferem profundamente em gravidade conforme a técnica executada: uma redução manual atraumática carrega risco mecânico baixo quando a bolsa de tabaco não estrangula o canal anal, ao passo que a ressecção e anastomose retal concentra os maiores riscos de mortalidade pós-operatória.',
    tabelaComplicacoes: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Complicações graves do prolapso retal e seu manejo prioritário em internação/UTI',
      headers: [
        'Complicação / emergência',
        'Mecanismo e sinais precoces',
        'Prioridade imediata de conduta',
        'Impacto prognóstico',
      ],
      rows: [
        [
          'Necrose e gangrena retal',
          'Compressão vascular prolongada pelo EAE, trombose e falência isquêmica; tecido roxo-escuro/negro, friável e com odor fétido',
          'Estabilização sistêmica, veto absoluto à redução manual e planejamento imediato de ressecção e anastomose',
          'Eleva complexidade cirúrgica e risco de sepse/estenose',
        ],
        [
          'Hemorragia ulcerativa significativa',
          'Erosão profunda da mucosa traumatizada ou coagulopatia associada; sangramento vivo persistente',
          'Checar perfusão, hematócrito/PPT e compressão suave úmida; redução ou hemostasia cirúrgica conforme origem',
          'Proporcional à perda volêmica e anemia resultante',
        ],
        [
          'Obstrução fecal iatrogênica',
          'Sutura em bolsa de tabaco excessivamente apertada ou fezes ressecadas impactadas cranialmente ao ponto',
          'Cortar/ajustar imediatamente a sutura anal sob analgesia, hidratar e ajustar consistência fecal',
          'Se não reconhecida precocemente, perpetua tenesmo feroz e gera ruptura ou recidiva',
        ],
        [
          'Recidiva aguda pós-redução',
          'Tenesmo persistente não controlado, infecção parasitária não resolvida ou falha de suporte pélvico',
          'Reavaliar viabilidade e investigar novamente a causa primária; se estável e recorrente, indicar colopexia',
          'Obriga mudança para fixação anatômica definitiva',
        ],
        [
          'Deiscência anastomótica',
          'Falha de cicatrização por isquemia de borda, tensão excessiva na linha de sutura ou infecção local',
          'Avaliação cirúrgica emergencial, ultrassom/abdominocentese e suporte intensivo',
          'Complicação pós-operatória potencialmente fatal',
        ],
        [
          'Peritonite séptica (ou celulite pélvica profunda)',
          'Extravasamento fecal pela anastomose ou penetração do lúmen colônico por sutura de colopexia (Popovitch et al., 1994); febre/hipotermia, dor abdominal, líquido livre com neutrófilos tóxicos/bactérias',
          'Ressuscitação hemodinâmica (AAHA 2024), antibioticoterapia empírica ampla baseada em cultura e reintervenção cirúrgica de controle de foco',
          'Prognóstico reservado a grave exigindo UTI',
        ],
        [
          'Estenose anorretal cicatricial',
          'Retração fibrosa anular sobretudo após ressecção e anastomose; disquesia, tenesmo crônico e fezes em fita',
          'Toque retal diagnóstico, dilatadores por balão/bougienage e infiltração intralesional ou cirurgia revisional',
          'Principal limitante da qualidade de vida tardia pós-ressecção',
        ],
        [
          'Incontinência fecal',
          'Lesão direta ao esfíncter anal externo ou ramos do nervo pudendo durante trauma prolongado ou ressecção agressiva',
          'Avaliação neurológica perineal, manejo dietético para fezes firmes e higiene local',
          'Pode persistir como déficit funcional permanente nos casos com ressecção extensa',
        ],
      ],
    },
    figuraProlapsoIrredutivelOber: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/prolapso-retal-caes-gatos/prolapso-irredutivel-necrose-ober-2016.jpg',
      alt: 'Prolapso retal grave, intensamente edemaciado e irredutível associado a áreas de necrose superficial em cadela, exigindo ressecção retal com anastomose',
      display: 'default',
      shortCaption:
        'Prolapso retal canino grave e irredutível com edema severo e necrose superficial indicando ressecção e anastomose (Ober et al., 2016 · CC BY 4.0).',
      caption:
        'Prolapso retal grave e irredutível em cadela, com espessamento mural acentuado decorrente de congestão venolinfática e edema intersticial progressivo, associado a áreas de necrose superficial e ulceração (no caso clínico, concomitante a prolapso vaginal e encarceramento vesical). Ilustra um fenótipo avançado em que o aprisionamento vascular impede o retorno seguro por manobra conservadora, motivando ressecção cirúrgica com anastomose em margens viáveis. Autoria: Ober et al. (2016), Acta Veterinaria Scandinavica, 58:54 (Figura 2). Licença: CC BY 4.0 (reutilização comercial permitida mediante atribuição).',
    },
    prognosticoPorEspecieECirurgia:
      'Não existe taxa populacional universal de cura ou mortalidade aplicável a todos os casos; o prognóstico reflete três pilares: viabilidade tecidual inicial, natureza da doença primária e adequação técnica da intervenção:\n' +
      '- Cães: Excelente a bom quando tratados precocemente antes da isquemia e com erradicação da enterocolite, parasitoses ou correção prostática/perineal associada. A série de Igna et al. (2021) ilustrou que recidivas ocorreram justamente no grupo canino e foram controladas após colopexia, ao passo que Park, Lee & Kim (2026) documentaram evolução livre de recidiva por 27 meses após correção combinada de hérnia perineal recorrente seguida de colopexia laparoscópica.\n' +
      '- Gatos: Favorável nos episódios viáveis manejados com resolução da enterite/parasitose ou desobstrução uretral. Nos episódios recorrentes, séries pequenas demonstraram boa exequibilidade da colopexia aberta (Popovitch et al., 1994) e totalmente laparoscópica (Guadalupi et al., 2024; Cifuentes Laponio, 2026), mas a dimensão amostral reduzida impede afirmar taxas estatísticas universais de sucesso.\n' +
      '- Impacto da ressecção retal: Quando o segmento exige ressecção e anastomose, o prognóstico cai de bom para reservado devido ao risco substancial de estenose pós-operatória, deiscência e incontinência fecal.',
    evidenciasCientificasEControversias:
      'Leitura crítica dos estudos-chave e atualização das controvérsias até 2026:\n' +
      '1. Série de 53 casos (Igna et al., 2021)\n' +
      '   - 33 cães e 20 gatos entre 1993–2020: 41 casos agudos reduzidos manualmente com bolsa de tabaco por 5–7 dias e 12 irredutíveis submetidos à ressecção/anastomose; 12 cães recidivaram e passaram por colopexia sem novas recidivas descritas. Mostra a utilidade prática do escalonamento anatômico, mas é série unicêntrica retrospectiva sem padronização etiológica rigorosa.\n' +
      '2. Colopexia clássica em 14 casos (Popovitch, Holt & Bright, 1994)\n' +
      '   - 8 cães e 6 gatos submetidos à colopexia não incisional ou incisional sem recidiva registrada, porém com duas deiscências incisionais — alertando para o risco de infecção grave se uma sutura transfixar a mucosa colônica.\n' +
      '3. Colopexia laparoscópica em felinos (Secchi et al., 2012; Guadalupi et al., 2024; Cifuentes Laponio, 2026)\n' +
      '   - O relato brasileiro de Secchi et al. (2012) com 2 portais assistidos e as séries totalmente laparoscópicas de 2024 (3 gatos, 30 min, adesão confirmada por laparoscopia às 4 semanas) e 2026 (2 portais de 5 mm, 43 min, adesão ultrassonográfica aos 30 dias) provam factibilidade técnica e baixa dor imediata em mãos experientes, mas **não comprovam superioridade clínica sobre a colopexia aberta** por falta de ensaios comparativos randomizados.\n' +
      '4. Controvérsias resolvidas pela clínica baseada em evidências\n' +
      '   - Colopexia vs. ressecção na recorrência: prolapso recorrente com parede saudável NÃO deve sofrer amputação — preserva-se o reto funcional com colopexia.\n' +
      '   - Bolsa de tabaco apertada não reduz recidivas: fechar demais gera obstrução funcional e agrava tenesmo.\n' +
      '   - Exposição fecal não indica antibiótico prolongado: ENOVAT 2025/2026 contraindica uso pós-operatório rotineiro em cirurgia limpa-contaminada não complicada.\n' +
      '   - Síntese de conduta cirúrgica: proteção/redução nos segmentos viáveis, colopexia nos recorrentes e ressecção apenas nos desvitalizados.',
  },
  prevention: {
    prevencaoPrimariaESecundaria:
      'A prevenção do prolapso retal equivale diretamente à prevenção e ao tratamento precoce das causas de tenesmo crônico e fraqueza do diafragma pélvico:\n' +
      '- Prevenção primária em jovens: Programas antiparasitários individualizados desde as primeiras semanas de vida conforme o risco ambiental e diretrizes CAPC 2026 (com exames coproparasitológicos frequentes no primeiro ano), vacinação contra gastroenterites virais, manejo sanitário rigoroso em abrigos/gatis e investigação imediata de diarreias mucoides persistentes antes que o ciclo tenesmo-eversão se instale.\n' +
      '- Prevenção primária em adultos e idosos: Hidratação adequada e manejo nutricional de gatos predispostos à constipação/megacólon; prevenção de episódios obstrutivos de DTUIF; avaliação prostática periódica e castração eletiva em cães machos quando indicada (reduzindo prostatomegalia e relaxina ligada à hérnia perineal).\n' +
      '- Prevenção secundária de recidivas: Corrigir integralmente o mecanismo etiológico antes da retirada da sutura em bolsa de tabaco; acompanhar consistência fecal e padrão de micção; evitar dietas hiper-restritivas em longo prazo sem justificativa clínica (dietas altamente digestíveis de baixo resíduo auxiliam nos primeiros dias pós-cirúrgicos, mas constipados precisam de estratégias distintas de fibras solúveis e hidratação).\n' +
      '- Rastreabilidade bibliográfica: Todas as posologias, limites anestésicos e condutas cirúrgicas desta monografia estão lastreadas nos tratados, formulários e consensos listados na seção de referências ao final do documento.',
    monitoramentoEOrientacoesAlta:
      'Checklist de alta e monitoramento obrigatório nas primeiras 24–72 horas:\n' +
      '1. Vigilância da primeira evacuação\n' +
      '   - Documentar capacidade de eliminar fezes macias sem esforço extenuante após redução ou colocação de bolsa de tabaco; a incapacidade de evacuar exige inspeção imediata da folga da sutura.\n' +
      '2. Vigilância urinária (especialmente após bloqueio epidural com morfina ou em felinos)\n' +
      '   - Confirmar jato urinário espontâneo e ausência de distensão vesical dolorosa nas primeiras 12–24 horas.\n' +
      '3. Sinais de alerta pós-cirúrgicos após ressecção/anastomose ou colopexia\n' +
      '   - Retorno imediato em caso de febre ou hipotermia, prostração aguda, vômitos, dor à palpação abdominal, edema perineal progressivo, secreção purulenta fétida ou nova protrusão mucosa.',
  },
  relatedMedicationSlugs: [
    'buprenorfina',
    'metadona',
    'tramadol',
    'dipirona',
    'lidocaina',
    'fenbendazol',
    'metronidazol',
    'amoxicilina-clavulanato',
    'ampicilina-sulbactam',
    'maropitant',
  ],
  relatedDiseaseSlugs: [
    'megacolon-caes-gatos',
    'prostatite-caes-gatos',
    'giardiase-caes-gatos',
    'coccidiose-caes-gatos',
    'enteropatia-inflamatoria-cronica-canina',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'cistite-idiopatica-felina',
    'fistula-perianal-furunculose-anal',
  ],
  relatedConsensusSlugs: [
    'icatcare-dtuif-felina-2025',
    'acvim-cie-caes-2026',
    'iscaid-itu-caes-gatos-2019',
    'veccs-sepse-definicao-caes-gatos-2026',
  ],
  references: [
    {
      citation:
        'NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier, 2020. Cap. 31 — Disorders of the Intestinal Tract, pp. 501, 504; e p. 992.',
    },
    {
      citation:
        'GOULD, E. N. Rectoanal Diseases (Cap. 264). In: ETTINGER, S. J.; FELDMAN, E. C.; CÔTÉ, E. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Philadelphia: Elsevier, 2024. pp. 1754–1760 (e Cap. 3, p. 23).',
    },
    {
      citation:
        'DROBATZ, K. J. et al. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell, 2023. Cap. 20 (pp. 197–208, espec. p. 204) e Cap. 40.14 (pp. 536–538).',
    },
    {
      citation:
        'MACINTIRE, D. K. et al. Manual of Small Animal Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell, 2012. Cap. 11 — Gastrointestinal Emergencies, pp. 253–254.',
    },
    {
      citation:
        'HALL, E. J.; WILLIAMS, D. A.; KATHRANI, A. (Eds.). BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. Quedgeley: BSAVA, 2020. pp. 105–108, 136–137, 224–230.',
    },
    {
      citation:
        'DIBARTOLA, S. P. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. St. Louis: Elsevier, 2012. Cap. 4, 5 e Cap. 18 (pp. 437–441).',
    },
    {
      citation:
        'BUDDE, J. A.; McCLUSKEY, D. M. Plumb’s Veterinary Drug Handbook. 10th ed. Stockholm: PharmaVet / Wiley-Blackwell, 2023. Monografias Buprenorphine (pp. 150–152), Cefazolin (pp. 201–203), Fenbendazole (pp. 505–507), Lactulose (pp. 735–736) e Metronidazole (pp. 873–875).',
    },
    {
      citation:
        'BSAVA. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. Quedgeley: BSAVA, 2020. Buprenorphine (pp. 53–54), Fenbendazole (pp. 159–160), Lactulose (p. 222), Metronidazole (p. 262) e Phosphate enema (p. 324).',
    },
    {
      citation:
        'BEXFIELD, N.; RIGGS, K. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. Quedgeley: BSAVA, 2024. Epidural analgesia and anaesthesia, pp. 211–213; e GRIMM, K. A. et al. Essentials of Small Animal Anesthesia and Analgesia, p. 562.',
    },
    {
      citation:
        'TOBIAS, K. Rectal prolapse. In: Manual of Small Animal Soft Tissue Surgery. 3rd ed., Cap. 50. Hoboken: Wiley, 2026.',
      url: 'https://doi.org/10.1002/9781394242825.ch50',
    },
    {
      citation:
        'ENOVAT. European Network for Optimization of Veterinary Antimicrobial Therapy 2025 guidelines for surgical antimicrobial prophylaxis in dogs and cats. Journal of Small Animal Practice, v. 67, n. 5, pp. 383–405, 2026.',
      url: 'https://doi.org/10.1111/jsap.70072',
    },
    {
      citation:
        'AAHA. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats (Section 5: Fluid Therapy in Ill Patients). American Animal Hospital Association, 2024.',
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-5-fluid-therapy-in-ill-patients/',
    },
    {
      citation:
        'CAPC. Companion Animal Parasite Council Guidelines: Giardia & General Guidelines for Dogs and Cats. Atualização 2026.',
      url: 'https://capcvet.org/guidelines/giardia',
    },
    {
      citation:
        'GALLAGHER, A. Rectal Prolapse in Animals. MSD / Merck Veterinary Manual. Revisão de agosto de 2025.',
      url: 'https://www.merckvetmanual.com/digestive-system/diseases-of-the-rectum-and-anus/rectal-prolapse-in-animals',
    },
    {
      citation:
        'IGNA, C. et al. Retrospective study of the rectal prolapse — 53 cases of dogs and cats. Lucrări Ştiinţifice Medicină Veterinară, v. 54, n. 2, pp. 68–74, 2021.',
    },
    {
      citation:
        'POPOVITCH, C. A.; HOLT, D.; BRIGHT, R. Colopexy as a treatment for rectal prolapse in dogs and cats: a retrospective study of 14 cases. Veterinary Surgery, v. 23, n. 2, pp. 115–118, 1994.',
      url: 'https://doi.org/10.1111/j.1532-950X.1994.tb00455.x',
    },
    {
      citation:
        'GUADALUPI, M. et al. Total laparoscopic colopexy for the treatment of recurrent rectal prolapses in three cats. Veterinary Sciences, v. 11, n. 8, art. 355, 2024.',
      url: 'https://doi.org/10.3390/vetsci11080355',
    },
    {
      citation:
        'CIFUENTES LAPONIO, M. A. Two-port totally laparoscopic colonopexy for the treatment of recurrent rectal prolapse in a cat: a case report. Veterinary Medicine and Science, v. 12, n. 4, e71011, 2026.',
      url: 'https://doi.org/10.1002/vms3.71011',
    },
    {
      citation:
        'PARK, J.; LEE, W.-J.; KIM, D.-H. Case report: Fascia lata transposition for chronic recurrent perineal hernia followed by laparoscopic colopexy for subsequent rectal prolapse in a dog. Frontiers in Veterinary Science, v. 13, art. 1858804, 2026.',
      url: 'https://doi.org/10.3389/fvets.2026.1858804',
    },
    {
      citation:
        'MOORES, A. L. et al. Nonsurgical reduction of prolapsed colocolic intussusception in 2 puppies. Journal of Veterinary Emergency and Critical Care, v. 31, pp. 656–660, 2021.',
      url: 'https://doi.org/10.1111/vec.13086',
    },
    {
      citation:
        'SECCHI, P. et al. Laparoscopic-assisted incisional colopexy by two portals access in a domestic cat with recurrent rectal prolapse. Journal of Feline Medicine and Surgery, v. 14, n. 2, pp. 169–170, 2012.',
      url: 'https://doi.org/10.1177/1098612X11429230',
    },
    {
      citation:
        'BERMANI, F.; SEPTIYANI. Emergency management of necrotic rectal prolapse in a domestic cat. ARSHI Veterinary Letters, v. 9, n. 2, pp. 33–34, 2025. (Licença CC BY-SA 4.0)',
      url: 'https://doi.org/10.29244/avl.9.2.33-34',
    },
    {
      citation:
        'OBER, C.-A. et al. Vaginal prolapse with urinary bladder incarceration and consecutive irreducible rectal prolapse in a dog. Acta Veterinaria Scandinavica, v. 58, art. 54, 2016. (Licença CC BY 4.0)',
      url: 'https://doi.org/10.1186/s13028-016-0235-2',
    },
    {
      citation:
        'TANSEREE, A. / WVS Academy. Clinical case report: Hoo Kwang, rectal prolapse (4–5 month-old mixed breed puppy). WVS Academy, acesso clínico educativo. (Licença CC BY-NC-SA 4.0)',
      url: 'https://wvs.academy/case-reports/hoo-kwang-rectal-prolapse',
    },
    {
      citation:
        'DR. VET. Colopexia para correção de prolapso retal em filhote felino (60 dias, 840 g). Relato clínico externo, 2025. (Referência externa — direitos reservados ao autor).',
      url: 'https://www.dr.vet.br/post/colopexia-para-corre%C3%A7%C3%A3o-de-prolapso-retal',
    },
    {
      citation:
        'CORGOZINHO, K. B. et al. Silicone elastomer sling for rectal prolapse in cats. Canadian Veterinary Journal, v. 51, n. 5, pp. 506–510, 2010. (Referência externa PMC2857430 — direitos vinculados à CVMA).',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2857430/',
    },
  ],
};
