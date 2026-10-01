import { DiseaseRecord } from '../../types/disease';

export const polirradiculoneuriteCaesGatosRecord: DiseaseRecord = {
  id: 'disease-polirradiculoneurite-caes-gatos',
  slug: 'polirradiculoneurite-caes-gatos',
  title: 'Polirradiculoneurite Aguda em Cães e Gatos (ACP / AIP)',
  subtitle: 'Neuropatia Periférica Imunomediada, Modelo Guillain-Barré, Desmielinização e Degeneração Axonal, Diagnóstico Eletrofisiológico Precoce e Manejo em Terapia Intensiva',
  synonyms: [
    'Polirradiculoneurite aguda canina',
    'ACP',
    'AIP',
    'Acute canine polyradiculoneuritis',
    'Acute idiopathic polyradiculoneuritis',
    'Paralisia do Coonhound',
    'Coonhound paralysis',
    'Polirradiculoneuropatia aguda',
    'Síndrome semelhante a Guillain-Barré canina',
    'Polirradiculoneurite felina',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: [
    'neurologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'clinica-medica',
  ],
  tags: [
    'Polirradiculoneurite',
    'ACP',
    'AIP',
    'Coonhound Paralysis',
    'Guillain-Barré',
    'Neurônio Motor Inferior',
    'NMI Generalizado',
    'Tetraplegia Flácida',
    'Anti-gangliosídeos',
    'Campylobacter',
    'Frango Cru',
    'Eletrodiagnóstico',
    'Ondas F',
    'Dissociação Albuminocitológica',
    'Plasmaférese / TPE',
    'Falência Respiratória',
    'Nelson & Couto',
  ],
  isPublished: true,

  quickDecisionStrip: [
    'Início agudo de tetraparesia ou tetraplegia flácida ascendente com hiporreflexia/arreflexia, hipotonia e atrofia neurogênica rápida (3–5 dias), mantendo mentação alerta e cauda móvel.',
    'Monitorar função respiratória com capnografia ou gasometria: fraqueza do nervo frênico e intercostais gera hipercapnia (PaCO2 elevado) antes de queda na oximetria de pulso (SpO2).',
    'Eletrodiagnóstico precoce nos dias 1–6 (Porcarelli et al., 2024): redução de CMAP e bloqueio ou prolongamento de ondas F confirmam lesão de raiz ventral sem necessidade de esperar 7–10 dias.',
    'Corticosteroides são contraindicados de rotina: não alteram favoravelmente o curso natural da doença e agravam a perda de massa muscular por catabolismo proteico e miopatia esteroidal.',
    'O pilar absoluto é o suporte intensivo e a reabilitação: colchão anti-escaras, rotação a cada 4 horas, manejo uroretal e fisioterapia motora; TPE e IVIG são terapias emergentes para casos graves em progressão.',
  ],

  quickSummary:
    'ALERTA CRÍTICO DE NEUROLOGIA E TERAPIA INTENSIVA — PARALISIA FLÁCIDA COM RISCO DE ASFIXIA: A polirradiculoneurite aguda (ACP/AIP) é uma neuropatia periférica inflamatória e imunomediada caracterizada pelo ataque imune às raízes nervosas ventrais (motoras) e nervos periféricos, determinando tetraparesia ou tetraplegia flácida ascendente de neurônio motor inferior (NMI). O quadro guarda marcante semelhança clínica e histopatológica com a síndrome de Guillain-Barré humana. Embora os pacientes mantenham mentação perfeitamente alerta, sensibilidade preservada (frequentemente com hiperestesia dolorosa) e movimentação ativa da cauda, a paralisia pode comprometer os nervos frênico e intercostais, deflagrando hipoventilação alveolar, hipercapnia severa e falência ventilatória fatal. Um dos avanços contemporâneos fundamentais é a desmistificação do eletrodiagnóstico tardio: Porcarelli et al. (2024) comprovaram que alterações significativas de condução motora (CMAP reduzido) e de ondas F já estão presentes nos primeiros 1 a 6 dias de sinais clínicos. Além disso, a fisiopatologia do mimetismo molecular pós-infeccioso foi consolidada por fortes associações com Campylobacter spp. (C. upsaliensis e C. jejuni em dietas cruas com frango, OR 9,39) e a detecção de autoanticorpos específicos anti-GM2 (sensibilidade 65,1%, especificidade 90,2%) e anti-GalNAc-GD1a (Halstead et al., 2022). O tratamento padrão não depende de imunossupressão empírica com glicocorticoides — os quais são contraindicados pelo agravamento de catabolismo muscular —, mas sim de enfermagem intensiva de recumbência, fisioterapia em três fases e ventilação mecânica quando indicada. A plasmaférese terapêutica (TPE) despontou em relatos de 2023 a 2026 como intervenção emergente promissora para rápida remoção de autoanticorpos e aceleração da recuperação motora em pacientes com risco respiratório.',

  quickSummaryRich: {
    lead:
      'A polirradiculoneurite aguda canina (ACP) e sua raríssima contraparte felina representam o protótipo da paralisia flácida difusa de neurônio motor inferior, análoga à síndrome de Guillain-Barré humana. O bloqueio da condução nervosa decorre de uma resposta autoimune dirigida contra glicolipídios da membrana neural (gangliosídeos), induzindo desmielinização segmentar e degeneração axonal nas raízes ventrais. O animal torna-se incapaz de sustentar o peso corporal, mas preserva a consciência, o controle esfincteriano e a movimentação caudal. O monitoramento contínuo da mecânica ventilatória é a prioridade imediata, pois a hipoventilação hipercápnica pode se instalar antes de qualquer queda visível na saturação periférica de oxigênio.',
    leadHighlights: [
      'neurônio motor inferior',
      'tetraplegia flácida',
      'Guillain-Barré',
      'Campylobacter',
      'atrofia neurogênica precoce',
      'insuficiência respiratória',
      'plasmaférese',
    ],
    pillars: [
      {
        title: 'Pilar 1 — Neuroanatomia do NMI e Mimetismo Molecular Antigangliosídeo',
        body: 'A lesão concentra-se primariamente nas raízes ventrais (motoras) e nervos periféricos, poupando a medula e o córtex. Anticorpos contra antígenos externos (ex.: lipopolissacarídeos de Campylobacter) sofrem mimetismo molecular e atacam gangliosídeos neurais (GM1, GM2, GalNAc-GD1a), ativando o complexo de ataque à membrana (MAC / C5b-9). O resultado é interrupção do estímulo motor voluntário, quebra do arco reflexo e atrofia por desnervação precoce em 3 a 5 dias.',
        highlights: [
          'raízes ventrais (motoras)',
          'mimetismo molecular',
          'gangliosídeos',
          'MAC / C5b-9',
          'atrofia por desnervação precoce',
        ],
      },
      {
        title: 'Pilar 2 — Gatilhos Pós-Infecciosos: Campylobacter, Frango Cru e CPV-2',
        body: 'A ingestão de frango cru contaminado associa-se a um risco relativo elevado (OR 9,39 para Campylobacter recente nos primeiros 7 dias, Martinez-Anton et al., 2018), com prevalência tanto de C. upsaliensis (60%) quanto de C. jejuni (40%). Outros gatilhos incluem saliva de guaxinim (coonhound paralysis) e o modelo pós-infeccioso recente associado à parvovirose canina (CPV-2, Stan et al., 2026). A vacinação recente carece de nexo causal populacional comprovado.',
        highlights: [
          'frango cru',
          'Campylobacter upsaliensis',
          'saliva de guaxinim',
          'CPV-2',
          'vacinação recente carece de nexo causal',
        ],
      },
      {
        title: 'Pilar 3 — Eletrodiagnóstico Precoce (1–6 dias) e Dissociação no LCR',
        body: 'A diretriz clássica de aguardar 7 a 10 dias para eletrodiagnóstico foi superada pelo estudo multicêntrico de Porcarelli et al. (2024): alterações de condução motora (CMAP) e bloqueio/ausência de ondas F já são evidentes entre os dias 1 e 6 pós-início clínico. A análise liquórica revela dissociação albuminocitológica (hiperproteinorraquia com celularidade normal) em até metade dos casos, decorrente da quebra da barreira sangue-nervo nas raízes inflamadas.',
        highlights: [
          'Porcarelli et al. (2024)',
          'dias 1 e 6',
          'CMAP',
          'ondas F',
          'dissociação albuminocitológica',
        ],
      },
      {
        title: 'Pilar 4 — Suporte Intensivo, Prevenção de Asfixia e Avanços em TPE',
        body: 'Corticosteroides são contraindicados: aceleram o catabolismo proteico e provocam miopatia esteroidal que retarda a recuperação. A base da sobrevivência é o suporte intensivo de UTI (monitoramento de PaCO2, rotação a cada 4h, colchão pneumático e fisioterapia motora). A plasmaférese terapêutica (TPE) emergiu em estudos de 2023 a 2026 como terapia segura e eficaz para remoção mecânica de autoanticorpos circulantes em animais com rápida deterioração motora.',
        highlights: [
          'corticosteroides são contraindicados',
          'catabolismo proteico',
          'suporte intensivo de UTI',
          'plasmaférese terapêutica (TPE)',
        ],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Monitoramento de Gravidade na ACP',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Fenótipo de NMI Generalizado e Triagem Respiratória',
          detail:
            'Identificar tetraparesia ou tetraplegia flácida ascendente, hipotonia profunda e arreflexia com consciência normal, cauda móvel e sensibilidade preservada (Nelson & Couto). Avaliar imediatamente o padrão respiratório: expansão torácica diminuída e respiração paradoxal abdominal indicam paresia de nervo frênico.',
          timing: 'Minuto 0',
          limitations: 'SpO2 normal não afasta hipoventilação alveolar grave com hipercapnia.',
        },
        {
          label: 'Passo 2: Investigação de Mimetizadores de Junção, Toxinas e Ectoparasitas',
          detail:
            'Inspecionar minuciosamente a pele em busca de carrapatos (paralisia por carrapato). Avaliar tônus mandibular, reflexos pupilares e salivação para excluir botulismo pré-sináptico. Checar histórico de acesso a carcaças, lixo orgânico, organofosforados e risco zoonótico de raiva paralítica.',
          timing: 'Primeiras 2 horas',
          reassess: 'Se disfagia ou regurgitação presente, realizar radiografia torácica para rastrear megaesôfago e pneumonia aspirativa.',
        },
        {
          label: 'Passo 3: Painel Laboratorial, CK Sérica e Diferenciação de Miopatias',
          detail:
            'Coleta de sangue: hemograma, eletrólitos, creatinina, ureia e CK sérica. Na ACP a CK é normal ou discretamente elevada (elevação em cerca de 22% dos cães por decúbito e desnervação). Elevações maciças de CK (> 5.000–10.000 UI/L) indicam polimiosite ou miopatia necrotizante.',
          timing: 'Primeiras 4 horas',
          limitations: 'Sorologia IgG para Toxoplasma ou Neospora indica exposição, não necessariamente causalidade da neuropatia.',
        },
        {
          label: 'Passo 4: Eletrodiagnóstico Precoce (Estudos de Condução, Ondas F e EMG)',
          detail:
            'Realizar estudo eletrofisiológico sem adiar para a segunda semana (Porcarelli et al., 2024): mensuração de amplitude de CMAP motor, latência e persistência de ondas F (bloqueio de raiz proximal) e EMG de agulha concêntrica para detecção de potenciais de fibrilação e ondas agudas positivas.',
          timing: 'Dias 1 a 6 pós-início',
          reassess: 'A atividade espontânea de desnervação no EMG torna-se mais proeminente e densa a partir do 5º ao 7º dia.',
        },
        {
          label: 'Passo 5: Análise do LCR Lombar e Sorologia de Autoanticorpos Antigangliosídeos',
          detail:
            'Punção lombar de líquido cefalorraquidiano (LCR) para quantificação de proteínas e contagem celular: pesquisa de dissociação albuminocitológica (proteína elevada com celularidade normal). Solicitação especializada de anticorpos anti-GM2 e anti-GalNAc-GD1a (Halstead et al., 2022).',
          timing: 'Dias 2 a 7',
          limitations: 'LCR normal não exclui ACP (observado em mais de 50% dos casos no início). Sorologia negativa não descarta a doença.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Manejo de Cuidados Críticos na ACP',
      steps: [
        {
          label: 'Passo 1: Suporte Ventilatório Intensivo e Monitoramento de PaCO2',
          detail:
            'Monitorar capnografia (ETCO2) ou gasometria venosa/arterial seriada. Se PaCO2 > 50–60 mmHg com exaustão muscular e respiração paradoxal, proceder à intubação orotraqueal suave e ventilação mecânica protetora em UTI com controle de pressão de pico.',
          dose: 'Oxigenoterapia titulada; ventilação controlada por volume (8–10 mL/kg) com PEEP de 3–5 cmH2O se hipoventilação grave',
          timing: 'Imediato e contínuo',
          reassess: 'Ausculta pulmonar a cada 4 horas e monitoramento radiográfico seriado contra pneumonia aspirativa.',
        },
        {
          label: 'Passo 2: Protocolo Rígido de Enfermagem de Recumbência e Pele',
          detail:
            'Acomodar o paciente sobre colchão pneumático anti-escaras ou cama de espuma macia densidade adequada com lençóis impermeáveis. Realizar mudança de decúbito estrita a cada 4 horas (lateral direito, esternal apoiado, lateral esquerdo) para prevenir atelectasias pulmonares e úlceras de pressão.',
          timing: 'A cada 4 horas ininterruptamente',
          limitations: 'Nunca manter o paciente sobre superfícies úmidas ou rígidas; aplicar colírio lubrificante nos olhos q6–8h.',
        },
        {
          label: 'Passo 3: Manejo Uroretal e Nutrição Enteral Precoce Assistida',
          detail:
            'Avaliar esvaziamento vesical a cada 6 a 8 horas. Pacientes tetraplégicos frequentemente preservam a função autônoma da bexiga, mas são incapazes de adotar postura mecânica para micção. Realizar expressão manual suave ou cateterismo uretral estéril intermitente. Se disfagia presente, instalar sonda nasoesofágica precoce.',
          timing: 'Primeiras 12 a 24 horas',
          reassess: 'Evitar retenção urinária prolongada com distensão miogênica e monitorar urina para infecção secundária.',
        },
        {
          label: 'Passo 4: Avaliação Criteriosa de Terapias Imunomoduladoras (TPE / IVIG)',
          detail:
            'Em pacientes com progressão fulminante para tetraplegia em < 48 horas ou risco respiratório iminente, discutir terapias emergentes de remoção de anticorpos: Plasmaférese Terapêutica (TPE, 3 sessões consecutivas de 1 a 1,5 volumes plasmáticos, Dazio et al., 2026) ou Imunoglobulina Humana Intravenosa (hIVIG 0,5–1 g/kg IV lento em 6–12h, Hirschvogel et al., 2012).',
          dose: 'TPE: troca de 1–1,5 volumes plasmáticos/sessão; hIVIG: 0,5–1,0 g/kg IV infusão única lenta',
          timing: 'Janela inicial de rápida progressão',
          limitations: 'Corticosteroides são formalmente desaconselhados. IVIG tem risco de anafilaxia e não deve ser repetida rotineiramente.',
        },
        {
          label: 'Passo 5: Fisioterapia Motora e Reabilitação Funcional em Três Fases',
          detail:
            'Fase 1 (dias 1–5): movimentação passiva de amplitude articular (PROM) 3 vezes ao dia, massoterapia e estímulo de reflexo flexor suave. Fase 2 (dias 5–21): ortostatismo assistido com fitball ou arreios e transferência de peso. Fase 3 (dias 21–60): marcha assistida e hidroterapia em esteira aquática sob estrita segurança respiratória.',
          timing: 'Do diagnóstico até a recuperação motora completa',
          reassess: 'Hidroterapia é contraindicada se houver fraqueza cervical, disfagia ou tosse fraca devido ao risco letal de afogamento e aspiração.',
        },
      ],
    },
  },

  etiology: {
    definicaoENeuroanatomiaDoNmi:
      'A polirradiculoneurite aguda canina (ACP / AIP), historicamente denominada paralisia do Coonhound (coonhound paralysis), é uma polirradiculoneuropatia periférica inflamatória adquirida caracterizada por acometimento bilateral e simétrico das raízes nervosas ventrais e dos troncos nervosos periféricos. A neuroanatomia da motricidade voluntária depende de uma cadeia sequencial que se inicia no córtex cerebral e nos tratos motores da substância branca da medula espinhal (neurônio motor superior — NMS), faz sinapse com os corpos celulares do neurônio motor inferior (NMI) situados nos cornos ventrais da substância cinzenta medular, emite axônios motores através das raízes ventrais, trafega pelos nervos periféricos e atinge os receptores da membrana pós-sináptica na junção neuromuscular para deflagrar a despolarização das fibras musculares esqueléticas. Na ACP, tanto o neurônio motor superior quanto os músculos esqueléticos encontram-se estruturalmente normais no momento do insulto inicial; o defeito funcional e ultraestrutural concentra-se precisamente nas raízes ventrais motoras e nos nervos periféricos proximais. A inflamação das raízes bloqueia a propagação dos potenciais de ação e a sinalização trófica axonal, produzindo a tríade clássica do fenótipo de NMI: fraqueza flácida, hipotonia muscular e arreflexia com rápido colapso trófico periférico.',

    mimetismoMolecularEAutoanticorposAntigangliosideos:
      'A etiologia da ACP está intimamente ligada a mecanismos imunomediados mediados por autoanticorpos dirigidos contra antígenos neurais glicolipídicos, mimetizando com precisão o modelo da síndrome de Guillain-Barré humana (GBS). Gangliosídeos são glicoesfingolipídios complexos enriquecidos com resíduos de ácido siálico que se concentram na membrana celular de neurônios periféricos, células de Schwann e nos nós de Ranvier, atuando na estabilização iônica e na condução saltatória do axônio. Durante uma infecção precedente ou exposição antigênica, o sistema imune produz imunoglobulinas contra epítopos patogênicos exógenos que compartilham conformações tridimensionais idênticas a frações sacarídicas de gangliosídeos neurais — fenômeno denominado mimetismo molecular. Em estudo multicêntrico seminal de 175 cães com ACP confrontados com 112 cães portadores de outras doenças neuromusculares e controles sadios, Halstead et al. (2022) comprovaram a presença expressiva de autoanticorpos IgG contra os gangliosídeos GM2 e GalNAc-GD1a. O anticorpo anti-GM2 IgG apresentou sensibilidade de 65,1% e especificidade de 90,2%, enquanto o anti-GalNAc-GD1a IgG exibiu sensibilidade de 61,7% e especificidade de 89,3%. A ligação desses autoanticorpos aos gangliosídeos das raízes ventrais fixa a via clássica do sistema complemento, gerando o complexo de ataque à membrana (MAC / C5b-9). O MAC perfura o axolema e a bainha de mielina, atraindo macrófagos hematógenos que clivam a mielina internodal e induzem graus variáveis de degeneração axonal.',

    campylobacterFrangoCruEGatilhosInfecciosos:
      'Entre os gatilhos ambientais e infecciosos documentados na literatura contemporânea, a infecção intestinal recente por espécies do gênero Campylobacter destaca-se como o fator desencadeante de maior relevância biológica e epidemiológica. Em estudo caso-controle rigoroso realizado na Austrália envolvendo 27 cães com ACP e 47 controles pareados, Martinez-Anton et al. (2018) demonstraram que cães cuja coleta fecal ocorreu nos primeiros 7 dias de sinais clínicos apresentaram um odds ratio (OR) de 9,39 para a presença de Campylobacter spp. nas fezes em comparação aos animais sadios. Adicionalmente, 96% dos cães acometidos consumiam dietas contendo carcaças ou cortes de frango cru (raw chicken), comparados a apenas 26% dos animais do grupo controle. Um detalhe microbiológico de extrema relevância identificado pelos autores é que, diferentemente da síndrome de Guillain-Barré humana — na qual predomina quase com exclusividade a espécie Campylobacter jejuni —, nos cães com ACP a tipagem molecular revelou 60% de isolados de Campylobacter upsaliensis e 40% de Campylobacter jejuni. É imperativo compreender que o frango cru não é neurotóxico por si só; a carne de ave crua atua como veículo de transmissão entérica das bactérias, e os lipooligossacarídeos (LOS) da parede celular bacteriana funcionam como os antígenos indutores dos anticorpos que posteriormente sofrem reação cruzada com os gangliosídeos dos nervos motores.',

    outrosGatilhosSalivaGuaxinimParvovirusVacinas:
      'Historicamente, a forma clássica de ACP descrita na América do Norte ocorre após o contato físico ou mordedura por guaxinins (Procyon lotor), caracterizando a clássica Coonhound paralysis. Nesses cães de caça, uma fração solúvel da saliva de guaxinim inoculada na derme funciona como antígeno heterólogo, deflagrando a síndrome paralisante no intervalo típico de 7 a 14 dias pós-exposição. No Brasil e em regiões não endêmicas de guaxinins, essa forma é anedótica e predomina a forma idiopática e pós-infecciosa entérica. Recentemente, Stan et al. (2026) descreveram o primeiro relato de neuropatia periférica compatível com polirradiculoneuropatia pós-infecciosa em três filhotes de cães que se recuperavam de enterite viral por parvovirose canina (CPV-2), com início dos sinais motores 7 a 10 dias após a resolução da doença entérica. Em relação ao Toxoplasma gondii, títulos elevados de IgG são descritos em até 55,8% dos cães com ACP, mas representam evidência epidemiológica de exposição sorológica prévia, e não prova de infecção ativa do nervo; pesquisas direcionadas a miosite e neosporose tornam-se mandatórias apenas se houver dor muscular focal intensa e hiperCKemia desproporcional. Por fim, a crença empírica que rotula a ACP automaticamente como "polineuropatia pós-vacinal" foi desafiada por estudos epidemiológicos: Laws et al. (2017) avaliaram 43 cães com ACP no Reino Unido e constataram que vacinações recentes não apresentavam associação estatisticamente significativa com o desenvolvimento da doença, devendo o termo ser evitado para não gerar desinformação e hesitação vacinal.',

    tabelaDiagnosticoDiferencialNmiAgudo: {
      caption: 'Tabela 1 — Diagnóstico Diferencial do Fenótipo de Neurônio Motor Inferior (NMI) Generalizado Agudo',
      headers: [
        'Condição Clínica',
        'Sítio Anatômico Lesado',
        'Reflexos Espinhais',
        'Atrofia Muscular Precoce',
        'Nervos Cranianos / Disfonia',
        'Sensibilidade / Dor',
        'Pistas Diagnósticas Distintivas',
      ],
      rows: [
        [
          'Polirradiculoneurite Aguda (ACP / AIP)',
          'Raízes ventrais motoras e nervos periféricos proximais',
          'Abolidos ou marcadamente diminuídos em 4 membros',
          'Muito rápida e severa (manifesta em 3 a 5 dias)',
          'Disfonia/latido rouco comum (vago); paresia facial eventual',
          'Sensibilidade preservada; hiperestesia muscular frequente',
          'Tetraplegia flácida ascendente, mentação alerta, cauda móvel, frango cru/Campylobacter',
        ],
        [
          'Botulismo (Clostridium botulinum)',
          'Membrana pré-sináptica da junção neuromuscular',
          'Diminuídos a ausentes de forma simétrica',
          'Tardia (atrofia por desuso em semanas, não em dias)',
          'Paralisia facial severa, midríase arreativa, reflexo mandibular frouxo',
          'Sensibilidade normal; ausência de hiperestesia',
          'Ingestão de carcaças/lixo, megaesôfago muito precoce, tônus de mandíbula abolido',
        ],
        [
          'Paralisia por Carrapato (Tick Paralysis)',
          'Junção neuromuscular (toxina salivar de Dermacentor/Ixodes)',
          'Diminuídos a ausentes rapidamente',
          'Ausente na apresentação aguda',
          'Geralmente preservados; paresia laríngea rara',
          'Sensibilidade normal; sem hiperestesia',
          'Presença do ectoparasita; reversão clínica espetacular em 24 a 72h após remoção',
        ],
        [
          'Miastenia Gravis Adquirida Fulminante',
          'Receptores nicotínicos pós-sinápticos de acetilcolina (AChR)',
          'Frequentemente preservados ou diminuídos com esforço repetido',
          'Ausente na fase inicial aguda',
          'Disfagia severa, refluxo, megaesôfago e perda de reflexo palpebral',
          'Sensibilidade normal; sem hiperestesia',
          'Fraqueza com padrão de fadiga, AChR-Ab positivo, risco iminente de aspiração pulmonar',
        ],
        [
          'Polimiosite Imunomediada Aguda',
          'Sarcolema e miofibrilas do músculo esquelético primário',
          'Podem parecer diminuídos pela dor motora intensa à flexão',
          'Atrofia secundária mais lenta com edema muscular inflamatório',
          'Disfagia eventual por miosite de faringe e língua',
          'Mialgia difusa e dor excruciante à palpação de massas',
          'CK sérica astronômica (> 5.000 a 20.000 UI/L), esfregaço e biópsia muscular inflamatória',
        ],
        [
          'Neosporose / Toxoplasmose Sistêmica',
          'Mioencéfalo, raízes espinhais e tecido muscular esquelético',
          'Diminuídos ou aumentados por contratura em hiperextensão',
          'Atrofia severa com fibrose muscular progressiva',
          'Variável conforme encefalite concomitante',
          'Dor muscular e articular frequente',
          'Típico em cães jovens (< 6 meses) com paralisia rígida em hiperextensão de membros pélvicos',
        ],
        [
          'Raiva Paralítica (Vírus Rábico)',
          'Neurônios motores medulares e troncos encefálicos',
          'Progressivamente abolidos de forma assimétrica ou ascendente',
          'Ausente na evolução superaguda',
          'Paralisia faríngea, salivação profusa, estrabismo e midríase',
          'Alterada; parestesia no sítio de inoculação',
          'Histórico de vacinação incerta, contato com morcegos/fauna silvestre, biossegurança máxima',
        ],
      ],
    },
  },

  epidemiology: {
    perfilEpidemiologicoCaninoEFactoresDeRisco:
      'A polirradiculoneurite aguda canina acomete cães de qualquer faixa etária, com relatos documentados entre 1 e 14 anos de idade, sem qualquer predisposição sexual estabelecida entre machos e fêmeas. No que se refere ao perfil racial, a doença pode manifestar-se em qualquer raça ou cão sem padrão definido, embora dados epidemiológicos do Reino Unido (Laws et al., 2017) tenham revelado um aumento significativo de risco em certas raças de pequeno e médio porte, com destaque para o Jack Russell Terrier e o West Highland White Terrier, além da predisposição ocupacional clássica de cães de caça da raça Coonhound nos Estados Unidos. O mesmo estudo britânico identificou uma nítida sazonalidade epidemiológica, com maior concentração de casos diagnosticados nos meses de outono e inverno, sugerindo uma interação complexa entre variações ambientais, microbioma entérico e maior suscetibilidade imunológica em períodos de temperaturas mais baixas. O fator de risco ambiental mais robusto e reprodutível na literatura contemporânea permanece a ingestão de carne e ossos de aves cruas (frango cru), conferindo aos cães que recebem dietas cruas comerciais ou caseiras não pasteurizadas uma probabilidade substantivamente maior de contato com cepas imunogênicas de Campylobacter.',

    particularidadesFelinasERaridadeExtrema:
      'Na espécie felina, a polirradiculoneuropatia aguda com o fenótipo clássico de paralisia flácida difusa da ACP canina é uma entidade de extrema raridade clínica. As publicações mundiais sobre polirradiculoneurite em gatos são limitadas a relatos de casos isolados, incluindo descrições históricas de polirradiculoneurite crônica recidivante (relato inaugural de 1978) e esparsas séries contemporâneas de neuropatias inflamatórias desmielinizantes crônicas (CIDP felina). Diferentemente dos cães, não há associação documentada de polirradiculoneurite felina com consumo de frango cru ou infecção por Campylobacter, não existem biomarcadores antigangliosídeos validados para gatos e não há respaldo científico para a utilização de imunoglobulina humana ou plasmaférese em felinos com paralisia periférica. Por conseguinte, diante de um gato apresentando paresia flácida e hiporreflexia de NMI, o médico-veterinário deve priorizar com veemência o diagnóstico diferencial de causas muito mais prevalentes na espécie felina, tais como neuropatia diabética (postura plantígrada com hiperglicemia), hipocalemia grave de qualquer etiologia (ventroflexão cervical marcante), tromboembolismo aórtico felino (membros posteriores frios, sem pulso femoral e cianóticos) e mielite infecciosa por PIF ou linfoma.',

    tabelaComparativaCaesVsGatosNeuropatias: {
      caption: 'Tabela 2 — Matriz Comparativa entre Espécies: Polirradiculoneuropatia em Cães vs Gatos',
      headers: [
        'Parâmetro Clínico / Epidemiológico',
        'Caninos (ACP / AIP Típica)',
        'Felinos (Neuropatia Inflamatória Aguda)',
      ],
      rows: [
        [
          'Incidência e Frequência na Rotina',
          'Relativamente comum; causa mais frequente de NMI agudo difuso',
          'Extremamente rara; casuística mundial restrita a relatos isolados',
        ],
        [
          'Curso Temporal Característico',
          'Agudo monofásico (pico em 7 a 10 dias) com lenta resolução',
          'Frequentemente subagudo, crônico ou com padrão recidivante (CIDP)',
        ],
        [
          'Gatilho Entérico / Dieta Crua',
          'Forte associação com Campylobacter e frango cru (OR 9,39)',
          'Nenhuma associação comprovada com dietas cruas ou Campylobacter',
        ],
        [
          'Biomarcadores Antigangliosídeos',
          'Anti-GM2 e anti-GalNAc-GD1a amplamente caracterizados (Halstead 2022)',
          'Não validados nem disponíveis para aplicação na rotina felina',
        ],
        [
          'Mimetizadores Prevalentes na Espécie',
          'Botulismo, paralisia por carrapato, miastenia gravis e polimiosite',
          'Neuropatia diabética, hipocalemia profunda, PIF e tromboembolismo aórtico',
        ],
        [
          'Evidência para Terapias Avançadas (TPE / IVIG)',
          'Séries de TPE (2025–2026) e estudos com IVIG com dados biológicos',
          'Inexistente; risco de reações graves a proteínas heterólogas sem benefício',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    cascataFisiopatologicaImunomediada:
      'A patogênese da ACP representa uma falha estrita de tolerância imunológica periférica orquestrada por uma complexa interação entre antígenos microbianos e o repertório de receptores linfocitários do hospedeiro. Após a exposição a um patógeno indutor (como Campylobacter upsaliensis no trato entérico ou antígenos salivares em cães caçadores), células apresentadoras de antígenos processam frações glicídicas de lipooligossacarídeos e as apresentam aos linfócitos T auxiliares. Os linfócitos B ativados iniciam uma expansão clonal de plasmócitos secretores de imunoglobulinas da classe IgG dotadas de alta afinidade por resíduos terminais de ácido siálico. Em virtude da identidade estrutural existente entre essas frações bacterianas e os gangliosídeos neurais abundantes na superfície externa dos axônios motores e das bainhas mielínicas das raízes ventrais, os autoanticorpos ligam-se avidamente ao tecido neural. A fixação de IgG aos gangliosídeos deflagra a ativação em cascata da via clássica do complemento, culminando na formação do complexo terminal C5b-9 (MAC). O MAC insere-se no sarcolema neural, provocando influxo citotóxico maciço de íons cálcio e água, despolarização aberrante e lise osmótica focal. Em resposta à liberação de fatores quimiotáticos (C3a e C5a), macrófagos hematógenos invadem o espaço subperineural, inserem processos celulares entre as lamelas da bainha de mielina e procedem à fagocitose ativa dos fragmentos desmielinizados (desmielinização mediada por macrófagos).',

    mecanismosBiofisicosDaConducaoNeural:
      'Do ponto de vista biofísico, a perda da bainha de mielina internodal dissipa a resistência elétrica transmembrana e amplifica substancialmente a capacitância do axônio. Ocorre dispersão das correntes locais de despolarização através do axolema desnudado, diminuindo a corrente iônica que atinge os canais de sódio dependentes de voltagem no nó de Ranvier adjacente. Quando essa densidade de corrente cai abaixo do limiar de segurança de condução, estabelece-se o bloqueio de condução neural: o impulso elétrico motor originado no corno ventral é completamente extinto antes de alcançar o músculo esquelético. Em estágios patológicos mais avançados ou em pacientes que desenvolveram autoanticorpos contra epítopos do próprio axolema axônico (como anti-GD1a), o ataque imune não se restringe à mielina, lesando diretamente a integridade do axônio motor (degeneração axonal secundária ou primária). Essa distinção entre desmielinização pura e degeneração axonal é o fator fisiopatológico determinante do tempo de recuperação funcional: enquanto a remielinização pelas células de Schwann é um processo celular relativamente rápido que se consolida em 3 a 6 semanas, a regeneração axonal requer a proliferação e crescimento do cone de brotamento a uma taxa lenta de apenas 1 a 2 milímetros por dia ao longo de grandes trajetos anatômicos.',

    escalaGravidadeClinicaFisiopatologica: {
      caption: 'Tabela 3 — Escala Funcional e Fisiopatológica de Gravidade da ACP em Cães',
      headers: [
        'Grau Clínico',
        'Definição Funcional',
        'Comprometimento Neuromotor',
        'Status Ventilatório',
        'Ambiente de Cuidado Recomendado',
      ],
      rows: [
        [
          'Grau I (Leve)',
          'Ambulatório com paresia pélvica',
          'Marcha rígida e encurtada em membros posteriores; reflexos patelares diminuídos',
          'Completamente preservado; ausência de esforço',
          'Enfermaria geral com monitoramento e fisioterapia',
        ],
        [
          'Grau II (Moderado)',
          'Tetraparesia não-ambulatória',
          'Incapaz de sustentar o peso corporal nos 4 membros; decúbito esternal com apoio',
          'Volume corrente mantido; gasometria normal',
          'Internação hospitalar; vigilância de mecânica respiratória',
        ],
        [
          'Grau III (Grave)',
          'Tetraplegia flácida completa',
          'Hipotonia universal; arreflexia profunda nos 4 membros; cauda ativa e disfonia',
          'Início de fadiga intercostal; taquipneia compensatória',
          'UTI veterinária com monitoramento contínuo de PaCO2',
        ],
        [
          'Grau IV (Crítico)',
          'Tetraplegia com insuficiência ventilatória',
          'Paresia frênica incipiente; incapacidade de elevar a cabeça; disfagia faríngea',
          'Hipoventilação alveolar; respiração paradoxal; PaCO2 45 a 55 mmHg',
          'UTI intensiva com suporte ventilatório mecânico em espera',
        ],
        [
          'Grau V (Terminal)',
          'Falência ventilatória neuromuscular',
          'Abolição total de motricidade diafragmática e intercostal; torpor por retenção de CO2',
          'Acidose respiratória grave (PaCO2 > 60 mmHg); hipoxemia com risco de PCR',
          'Ventilação mecânica invasiva obrigatória com intubação orotraqueal',
        ],
      ],
    },
  },

  pathophysiology: {
    mecanismoDaHipotoniaEArreflexia:
      'A hipotonia muscular profunda e a arreflexia espinhal constituem os pilares semiológicos da lesão de neurônio motor inferior na ACP. O tônus muscular basal de repouso é mantido pela atividade contínua dos fusos neuromusculares e pelas descargas tônicas espontâneas dos motoneurônios gama e alfa nos cornos ventrais, que modulam o comprimento e a tensão das fibras intrafusais e extrafusais. Quando os axônios das raízes ventrais sofrem desmielinização e bloqueio de condução imune, esse circuito tônico é completamente interrompido, resultando em flacidez muscular cadavérica ao exame físico. Paralelamente, o arco reflexo monossináptico que rege os reflexos miotáticos (como o reflexo patelar) e o circuito polissináptico dos reflexos de retirada (flexor) necessitam da integridade estrita de três elementos: a fibra aferente sensitiva do nervo periférico e raiz dorsal, a sinapse interneuronal/motoneuronal medular e a fibra eferente motora da raiz ventral. Embora o braço sensitivo permaneça íntegro, a quebra patológica do braço eferente motor impede que o impulso chegue à junção neuromuscular, abolindo integralmente a resposta reflexa motora.',

    atrofiaNeurogenicaPrecoceVsDesuso:
      'A velocidade e a intensidade da perda de massa muscular na polirradiculoneurite aguda surpreendem com frequência a equipe clínica. Ao contrário da atrofia por desuso simples — que se instala lentamente ao longo de várias semanas em animais imobilizados por gesso ou osteoartrite —, a atrofia na ACP é de natureza neurogênica por desnervação aguda. O neurônio motor não fornece apenas o sinal elétrico de contração, mas também sintetiza e transporta continuamente através do fluxo axoplasmático fatores tróficos indispensáveis, como a agrina, a neurorregulina e citocinas tróficas musculares. Com a interrupção desse suporte trófico neural e a ausência absoluta de descargas juncionais de acetilcolina, os receptores musculares ativam vias proteolíticas intracelulares hipercatabólicas, especialmente o sistema ubiquitina-proteassoma dependente de ATP e a autofagia lisossomal. Essa cascata proteolítica maciça culmina em atrofia neurogênica visível e palpável em apenas 3 a 5 dias pós-paralisia. Nelson & Couto enfatizam que a combinação de paralisia flácida, arreflexia e atrofia neurogênica ultrarrápida é a assinatura que diferencia a ACP das afecções da junção neuromuscular (como botulismo e paralisia por carrapato), nas quais a fraqueza pode ser profunda, mas a atrofia muscular precoce e intensa não ocorre.',

    preservacaoSensitivaEHiperestesiaDolorosa:
      'Uma característica diagnóstica marcante da polirradiculoneurite aguda é a dissociação sensório-motora. A inflamação imunomediada e a deposição do complexo de ataque à membrana atingem de forma marcadamente predominante as raízes ventrais (motoras) e os axônios motores de grande diâmetro, poupando a via sensitiva das raízes dorsais e os tratos espinotalâmicos ascendentes. Dessa forma, a percepção consciente de dor superficial e profunda nos dígitos e extremidades permanece rigorosamente preservada. Além disso, uma proporção substancial de cães afetados desenvolve hiperestesia dolorosa manifestada por reações de dor aguda, vocalização, taquipneia ou tentativas de esquiva ao menor toque, pinçamento ou palpação das massas musculares esqueléticas e da coluna vertebral. Essa hiperestesia decorre da radiculite inflamatória que pode se estender sutilmente aos envelopes meníngeos das raízes nervosas espinhais proximais, bem como da sensibilização periférica de nociceptores musculares desencadeada pela liberação de mediadores inflamatórios no microambiente neural.',

    falsoDeficitProprioceptivoEMovimentoCaudal:
      'Ao examinar o cão com ACP, o clínico pode cometer o erro clássico de interpretar o teste de posicionamento proprioceptivo (knuckling) deficitário como prova de mielopatia central ou compressão medular. O teste proprioceptivo avalia tanto a via aferente sensitiva periférica e os tratos proprioceptivos ascendentes quanto o arco eferente motor encarregado de contrair o músculo para reposicionar a pata. Na ACP, as vias sensitivas e a consciência cortical da posição do membro estão perfeitamente preservadas; o animal tem total ciência de que a pata está dobrada sobre o dorso, mas a perda do neurônio motor inferior o incapacita fisicamente de contrair os músculos extensores para recolocá-la na posição anatômica. Nelson & Couto destacam que quando o animal é fisicamente suportado em esternal ou içado por arreios, ele tenta movimentar os membros com coordenação espacial compatível com propriocepção intacta. Outra pista clínica extraordinária é a movimentação vigorosa da cauda: mesmo cães completamente tetraplégicos no leito hospitalar mantêm o abanar de cauda ativo e alegre ao ouvirem a voz do tutor. Isso ocorre porque as raízes caudais mais distais e os segmentos sacrococcígeos são frequentemente poupados ou afetados com menor intensidade pelo processo autoimune.',

    disfoniaEComprometimentoDeNervosCranianos:
      'O acometimento dos nervos cranianos na ACP já foi motivo de divergência na literatura veterinária clássica. Enquanto textos históricos sustentavam que o envolvimento craniano era incomum, casuísticas modernas demonstram que ele ocorre com frequência expressiva, especialmente envolvendo os nervos que inervam as vias aéreas superiores e o aparelho de fonação. A alteração do latido (disfonia) é uma das pistas mais precoces e sensíveis da doença: o animal desenvolve um latido progressivamente rouco, abafado, fraco ou afonia completa decorrente de paresia ou paralisia dos ramos laríngeos recorrentes derivados do nervo vago (nervo craniano X), que comandam a motricidade das cordas vocais e da laringe. No estudo australiano de Martinez-Anton et al. (2018), sinais compatíveis com acometimento de nervos cranianos foram identificados em até 80% dos cães avaliados, predominando a disfonia e a disfagia funcional. Paresia facial bilateral discreta por comprometimento do nervo facial (nervo craniano VII) também pode ser observada, levando a reflexo palpebral diminuído e lábios frouxos sem perda da sensibilidade facial.',

    falenciaRespiratoriaParalisiaFrenicaEIntercostal:
      'A complicação mais devastadora e a causa primária de morte na polirradiculoneurite aguda é a falência ventilatória neuromuscular por paralisia dos músculos da respiração. A ventilação pulmonar depende do trabalho sinérgico do diafragma (inervado pelas raízes motoras do nervo frênico originadas nos segmentos cervicais C5, C6 e C7) e dos músculos intercostais (inervados pelos nervos espinhais torácicos T1 a T12). Nos casos graves de ACP com progressão ascendente rápida, a inflamação das raízes ventrais atinge o nervo frênico e os nervos intercostais, provocando colapso da mecânica ventilatória. Ocorre queda drástica do volume corrente e da ventilação alveolar efetiva, retendo gás carbônico e gerando hipercapnia progressiva (PaCO2 > 50–60 mmHg) e acidose respiratória severa. Um erro de plantão fatal é confiar cegamente na oximetria de pulso (SpO2): a SpO2 pode manter-se enganosamente acima de 95% na fase inicial da hipoventilação alveolar sob respiração em ar ambiente, enquanto a PaCO2 já atingiu patamares tóxicos de narcose cerebral por CO2. O clínico deve vigiar o esforço diafragmático, o padrão de respiração paradoxal abdominal (o abdome expande enquanto o tórax colapsa na inspiração) e utilizar obrigatoriamente a capnografia e gasometria para indicar o momento exato da intubação e ventilação mecânica.',
  },

  clinicalSignsPathophysiology: {
    geralENeuromotor:
      'O início clínico da ACP é agudo a superagudo, com evolução típica ao longo de 2 a 10 dias até o pico de gravidade funcional. O quadro costuma iniciar-se de maneira insidiosa com marcha encurtada, rígida e insegura nos membros pélvicos, frequentemente confundida pelo tutor com dor lombar ou cansaço muscular. Em questão de 24 a 48 horas, o animal evolui para paraparesia flácida e subsequente tetraparesia, culminando em recumbência lateral e tetraplegia flácida completa. Ao exame neurológico detalhado, nota-se flacidez universal com tônus muscular profundamente diminuído (hipotonia), arreflexia ou hiporreflexia severa de reflexos patelares, tibiais craniais e de retirada (flexor) em todos os membros. A atrofia muscular é marcante e simétrica, evidenciando rápida perda do relevo muscular glúteo, femoral, escapular e epaxial. Contrastando com o colapso motor total, a mentação do paciente permanece perfeitamente preservada: o cão acompanha os movimentos do ambiente com os olhos, responde a estímulos auditivos, manifesta apetite quando alimentado na boca e abana a cauda vigorosamente.',

    respiratorioEVocal:
      'As manifestações no aparelho respiratório e fonatório variam de alterações discretas a emergências de risco iminente de óbito. A disfonia é uma alteração precoce quase universal: os latidos perdem a amplitude e a tonalidade habitual, tornando-se roucos, estridentes ou totalmente mudos. Conforme a paresia atinge os músculos da ventilação, o paciente manifesta taquipneia compensatória inicial com respiração superficial e rápida, evoluindo para excursão torácica progressivamente imperceptível e adoção de padrão respiratório paradoxal abdominal. Em fases avançadas de retenção hipercápnica e fadiga muscular extrema, o animal exibe torpor respiratório, incapacidade total de expelir secreções faríngeas por tosse ineficaz e sinais evidentes de asfixia funcional neuromuscular. A tosse fraca associada a paresia laríngea confere um risco altíssimo de pneumonia por aspiração secundária, que se manifesta por febre, estertores úmidos à ausculta e deterioração rápida das trocas gasosas.',

    cranianoEAutonomico:
      'O exame dos nervos cranianos revela alterações focais que exigem diferenciação de polineuropatias cranianas generalizadas. A perda da modulação vocal pelo nervo vago e recurrente laríngeo é o achado craniano mais constante. Paresia faríngea funcional com disfagia e dificuldade na deglutição de alimentos sólidos ou líquidos pode ocorrer, predispondo à broncoaspiração de saliva e conteúdo hídrico. Paresia facial bilateral discreta a moderada é observada em uma parcela dos pacientes, manifestada por diminuição do reflexo palpebral e flacidez labial, sem que haja comprometimento da mastigação (o tônus da mandíbula permanece normal, ao contrário do botulismo). O sistema nervoso autônomo é classicamente poupado na grande maioria dos pacientes: a frequência cardíaca, o ritmo cardíaco, o calibre pupilar e a reatividade à luz (reflexo pupilar fotomotor) estão preservados. A função dos esfíncteres vesical e retal permanece intacta; o animal não apresenta bexiga flácida verdadeira com gotejamento involuntário, mas pode reter urina simplesmente pela impossibilidade biomecânica de assumir a postura fisiológica de micção em decúbito.',

    dorESensibilidade:
      'A sensibilidade nociceptiva consciente permanece estritamente presente em todos os dermátomos corporais. Ao estímulo nociceptivo com pinça hemostática nos dígitos dos membros torácicos e pélvicos, o animal pode ser incapaz de flexionar o membro (por paralisia do braço eferente motor), mas manifesta prontamente a resposta cerebral de dor consciente através de dilatação pupilar, taquicardia, rotação da cabeça em direção ao estímulo ou vocalização. Além da preservação sensitiva, a hiperestesia dolorosa é um sinal clínico de alta especificidade para ACP quando presente: o cão reage com desconforto, ganidos ou inquietação à palpação de massas musculares esqueléticas e à mobilização passiva dos membros e do segmento vertebral cervical e toracolombar, decorrente de radiculite inflamatória espinhal ativa.',
  },

  diagnosis: {
    criteriosDiagnosticosESindromicos:
      'O diagnóstico da polirradiculoneurite aguda em cães e gatos é fundamentalmente sindrômico e baseado em critérios rigorosos de exclusão e confirmação clínica. O conjunto de achados que define a alta probabilidade diagnóstica engloba: (1) início agudo e progressão ascendente típica em dias para tetraparesia ou tetraplegia flácida; (2) fenótipo indiscutível de neurônio motor inferior generalizado (hiporreflexia/arreflexia e hipotonia muscular); (3) rápida e pronunciada atrofia muscular neurogênica nos primeiros 3 a 5 dias; (4) sensibilidade preservada associada ou não à hiperestesia muscular; (5) mentação perfeitamente normal e preservação da movimentação da cauda; (6) disfonia frequente; e (7) exclusão inequívoca dos principais mimetizadores clínicos (botulismo, paralisia por carrapato, miastenia gravis fulminante, polimiosite, toxicoses e raiva). Não existe um teste sorológico único obrigatório isolado; o diagnóstico apoia-se no tripé formado por fenótipo clínico-neurológico, eletrodiagnóstico e análise do líquido cefalorraquidiano.',

    eletrodiagnosticoPrecoceEmgCmapOndasF:
      'O eletrodiagnóstico (EDX) representa a ferramenta diagnóstica de suporte mais precisa e informativa para a confirmação precoce da ACP. Historicamente, postulava-se que o exame deveria ser adiado para o 7º a 10º dia pós-início para aguardar a manifestação de desnervação muscular no eletromiograma. Entretanto, essa diretriz foi revolucionada pelo estudo multicêntrico contemporâneo de Porcarelli et al. (2024), que avaliou 71 cães com ACP comparando achados eletrofisiológicos entre os dias 1–6 versus dias 7–15 de evolução. Os autores comprovaram que mesmo na janela precoce de 1 a 6 dias os estudos de condução nervosa motora já demonstravam redução marcante da amplitude do potencial de ação muscular composto (CMAP) e alterações substanciais nas ondas F (F-waves), caracterizadas por ausência total de ondas F ou aumento expressivo de sua latência mínima. A avaliação das ondas F é fisiologicamente fascinante para a ACP: como a onda F mede a condução do estímulo antidrômico até o corpo celular no corno ventral e seu retorno ortodrômico ao músculo, ela testa o trajeto proximal das raízes ventrais — exatamente o epicentro patológico da ACP. No eletromiograma de agulha (EMG), a atividade espontânea de desnervação (potenciais de fibrilação e ondas agudas positivas) torna-se progressivamente densa a partir do 5º dia, confirmando a perda de inervação axonal.',

    analiseDoLiquorEDissociacaoAlbuminocitologica:
      'A análise do líquido cefalorraquidiano (LCR) obtido por punção lombar (cisterna lombar L5–L6 ou L6–L7) fornece um achado clássico denominado dissociação albuminocitológica, idêntico ao observado na síndrome de Guillain-Barré humana. Esse fenômeno é caracterizado por concentração marcadamente elevada de proteínas totais no líquor com contagem de células nucleadas estritamente normal ou minimamente alterada (< 5 leucócitos/mcL). A elevação proteica decorre da quebra inflamatória da barreira sangue-nervo nas raízes nervosas espinhais proximais, permitindo o extravasamento de albumina e imunoglobulinas para o espaço subaracnóideo; como a inflamação não atinge a leptomeninge de forma primária, leucócitos não migram em massa para o LCR. Todavia, um alerta de extrema relevância clínica deve ser ressaltado: a ausência de dissociação albuminocitológica não descarta o diagnóstico de ACP. No estudo australiano de Martinez-Anton et al. (2018), dos cães submetidos à punção lombar, apenas 43% (3/7) apresentaram a dissociação clássica, enquanto os demais exibiram líquor bioquimicamente normal ou com alterações atípicas. A punção de LCR atua principalmente para descartar meningomielites infecciosas, toxoplasmose, neosporose ou processos neoplásicos infiltrativos.',

    sorologiaAntigangliosideosEBiomarcadores:
      'A mensuração serológica de autoanticorpos contra gangliosídeos neurais consolidou-se como um biomarcador biológico especializado de grande valor fisiopatológico. Conforme documentado por Halstead et al. (2022), a detecção de autoanticorpos IgG contra os gangliosídeos GM2 e GalNAc-GD1a por ensaio imunoenzimático (ELISA) exibe excelente especificidade diagnóstica (90,2% para anti-GM2 e 89,3% para anti-GalNAc-GD1a) na diferenciação entre cães com ACP e cães com outras doenças neuromusculares ou indivíduos hígidos. A aplicabilidade clínica desses testes reside no reforço da etiologia imunomediada em casos atípicos, em pacientes com suspeita de mimetizadores complexos e no acompanhamento de terapias avançadas (como demonstrado por Greenfield et al., 2025, no qual os títulos de anticorpos caíram acentuadamente após plasmaférese). No entanto, esses ensaios ainda possuem limitações: a sensibilidade diagnóstica oscila em torno de 61 a 65%, o que significa que aproximadamente 35% a 40% dos cães com ACP confirmada são soronegativos para esses gangliosídeos específicos. Logo, um resultado negativo jamais deve ser utilizado para excluir o diagnóstico de ACP.',

    biopsiaDeNervoPerifericoELimites:
      'A realização de biópsia muscular e de nervo periférico (comumente do nervo fibular comum ou ramo muscular do nervo tibial associada ao músculo cranial tibial) raramente é indicada na rotina de abordagem primária da ACP. A limitação anatômica fundamental é que a biópsia de nervo periférico é realizada em segmentos nervosos distais, enquanto a lesão inflamatória mais intensa da ACP localiza-se proximalmente nas raízes nervosas ventrais e nos segmentos radiculares espinhais. Consequentemente, a biópsia distal frequentemente revela apenas alterações secundárias discretas ou inespecíficas, correndo o risco de fornecer um resultado falso-negativo se o clínico esperar por inflamação exuberante. A real utilidade da biópsia de nervo e músculo restringe-se aos casos atípicos, de progressão crônica inexplicada ou refratários, nos quais é mandatório afastar polineuropatias desmielinizantes inflamatórias crônicas (CIDP), polineuropatias metabólicas axonais graves, doenças do armazenamento lisossomal ou miosites infiltrativas inflamatórias e neoplásicas.',

    tabelaBiomarcadoresEEletrodiagnostico: {
      caption: 'Tabela 4 — Matriz Diagnóstica: Biomarcadores, Eletrodiagnóstico e Líquor por Fase de Evolução da ACP',
      headers: [
        'Método / Parâmetro Avaliado',
        'Fase Hiperaguda (Dias 1 a 6)',
        'Fase de Platô (Dias 7 a 15)',
        'Fase de Recuperação (> 15 a 60 Dias)',
        'Significado Clínico / Limitações',
      ],
      rows: [
        [
          'Amplitude do CMAP Motor (EDX)',
          'Marcadamente reduzida (Porcarelli et al., 2024)',
          'Profundamente reduzida ou ausente',
          'Recuperação gradual da amplitude',
          'Mede a perda de unidades motoras e bloqueio de condução funcional',
        ],
        [
          'Ondas F (F-waves na Raiz Ventral)',
          'Ausentes ou com latência muito aumentada',
          'Persistentemente ausentes na maioria',
          'Retorno progressivo da onda F',
          'Padrão-ouro eletrofisiológico para bloqueio proximal na raiz motora ventral',
        ],
        [
          'EMG Espontâneo (Agulha Concêntrica)',
          'Atividade espontânea inicial ou discreta',
          'Fibrilação e ondas agudas densas (4+)',
          'Diminuição de fibrilações; potenciais polifásicos',
          'Confirmam desnervação muscular; exigem 3 a 5 dias para manifestação densa',
        ],
        [
          'Dissociação no LCR Lombar',
          'Presente em 40% a 50% dos pacientes',
          'Presente na maioria dos cães com quebra de barreira',
          'Normalização gradual da proteinorraquia',
          'Hiperproteinorraquia sem pleocitose; LCR normal não descarta a doença',
        ],
        [
          'Títulos de Anti-GM2 / Anti-GalNAc-GD1a',
          'Títulos elevados em cerca de 65% dos casos',
          'Pico de autoanticorpos circulantes',
          'Declínio progressivo dos títulos séricos',
          'Biomarcador específico de autoimunidade; negativo não descarta ACP',
        ],
        [
          'Creatina Quinase (CK Sérica)',
          'Normal ou levemente aumentada (< 800 UI/L)',
          'Normal ou discreta elevação por decúbito',
          'Normal',
          'Elevação acima de 5.000 UI/L indica polimiosite primária, não ACP pura',
        ],
      ],
    },

    tabelaMonitoramentoVentilatorioCriteriosUti: {
      caption: 'Tabela 5 — Protocolo de Monitoramento Ventilatório e Critérios de Indicação para Ventilação Mecânica',
      headers: [
        'Parâmetro Monitorado',
        'Estável / Alerta Verde',
        'Fadiga Incipiente / Alerta Amarelo',
        'Falência Ventilatória / Alerta Vermelho (VM Imediata)',
      ],
      rows: [
        [
          'Padrão Respiratório e Mecânica',
          'Respiração toracoabdominal coordenada e suave',
          'Taquipneia superficial compensatória; excursão torácica diminuída',
          'Respiração paradoxal abdominal pronunciada; respiração agônica',
        ],
        [
          'Frequência Respiratória (FR)',
          '18 a 30 mpm em repouso',
          '40 a 60 mpm com ansiedade e cabeça baixa',
          'Queda abrupta da FR (< 12 mpm) por fadiga extrema e narcose',
        ],
        [
          'Dióxido de Carbono (PaCO2 ou ETCO2)',
          'PaCO2 35 a 45 mmHg (normocapnia)',
          'PaCO2 46 a 55 mmHg (retenção leve a moderada de CO2)',
          'PaCO2 > 55 a 60 mmHg (acidose respiratória descompensada)',
        ],
        [
          'Oximetria de Pulso (SpO2 em Ar)',
          'SpO2 > 95% estável',
          'SpO2 91% a 94% (requer suplementação de oxigênio)',
          'SpO2 < 90% refratária a oxigênio suplementar (hipoxemia grave)',
        ],
        [
          'Controle de Vias Aéreas e Deglutição',
          'Reflexo de deglutição intacto; tosse eficaz',
          'Latido afônico; dificuldade moderada em deglutir saliva',
          'Paralisia faríngea completa; tosse abolida; broncoaspiração ativa',
        ],
        [
          'Conduta Terapêutica Imediata',
          'Monitoramento seriado q4h; manter decúbito esternal',
          'Oxigenoterapia suave em fluxo livre; gasometria seriada q2–4h',
          'Sedação de sequência rápida, intubação orotraqueal e ventilação mecânica invasiva',
        ],
      ],
    },
  },

  treatment: {
    pilaresDoTratamentoDeSuporteIntensivo:
      'Na atualidade, não existe uma terapia farmacológica curativa universalmente padronizada por ensaios clínicos controlados e randomizados em cães. Por essa razão, o suporte intensivo de terapia intensiva e a reabilitação funcional constituem o verdadeiro esteio da sobrevida e recuperação do paciente acometido por ACP. Cães tetraplégicos necessitam de internação hospitalar rigorosa em ambiente de cuidados críticos com assistência de enfermagem dedicada 24 horas por dia. O paciente deve ser alocado sobre colchão de ar com pressão alternada (colchão pneumático) ou colchonete de espuma viscoelástica de alta densidade revestido por capas impermeáveis e macias, com mudança obrigatória de decúbito a cada 4 horas (alternando decúbito lateral direito, esternal com suportes de posicionamento torácico e decúbito lateral esquerdo). A proteção ocular com pomadas oftálmicas lubrificantes ou colírios à base de hialuronato de sódio a cada 6 a 8 horas é indispensável nos pacientes com reflexo palpebral diminuído. O esvaziamento vesical regular a cada 6 a 8 horas deve ser garantido por compressão manual delicada ou sondagem uretral asséptica fechada, prevenindo distensão detrusora miogênica e dermatites por contato urinário.',

    suporteRespiratorioEVentilacaoMecanica:
      'O suporte ventilatório é a intervenção crítica que dita o prognóstico de vida do paciente durante o ápice da paralisia ascendente. Pacientes que manifestam sinais de fadiga neuromuscular ou retenção precoce de dióxido de carbono devem receber oxigenoterapia profilática suplementar por cânula nasal ou fluxo livre sem estresse. Caso a hipoventilação alveolar progrida com elevação de PaCO2 acima de 55–60 mmHg, acompanhada de padrão paradoxal abdominal ou cianose, a ventilação mecânica controlada por pressão ou volume torna-se uma exigência imediata de sobrevivência. O paciente deve ser intubado orotraquealmente com tubo com balonete de baixa pressão após indução anestésica suave e mantido sob sedação contínua com infusões de propofol ou fentanil associados a midazolam. A mecânica ventilatória protetora deve priorizar volumes correntes fisiológicos de 8 a 10 mL/kg, pressão inspiratória de pico mantida inferior a 15–20 cmH2O e pressão positiva expiratória final (PEEP) fisiológica de 3 a 5 cmH2O para prevenir colapso alveolar (atelectasia). A aspiração traqueal estéril de secreções acumuladas e a fisioterapia respiratória com tapotagem pulmonar devem ser realizadas a cada 4 horas.',

    nutricaoEnteralPrecoceEPrevencaoAspiracao:
      'A recuperação do tecido neural e muscular é um processo hipercatabólico de alta demanda metabólica. Permitir que um paciente tetraplégico permaneça em subnutrição ou jejum prolongado retarda a regeneração axonal, exacerba a proteólise muscular e deprime gravemente o sistema imunológico, favorecendo infecções oportunistas de pele e pulmão. Se o paciente for incapaz de deglutir com segurança, apresentar disfonia severa ou náusea, uma sonda nasoesofágica (ou esofagostomia em animais com estabilidade ventilatória) deve ser instalada precocemente nas primeiras 24 horas de internação. A nutrição enteral formulada para a necessidade energética de repouso (RER = 70 x peso^0,75 kcal/dia) deve ser iniciada de forma escalonada, distribuída em pequenas refeições ao longo do dia com o animal mantido em decúbito esternal com o tórax elevado a 30 graus durante e até 30 minutos após a alimentação para minimizar o risco catastrófico de pneumonia aspirativa.',

    contraindicacaoFormalDeCorticosteroides:
      'Um dos erros clínicos mais difundidos e prejudiciais na rotina veterinária é a prescrição automática de corticosteroides (como prednisona, prednisolona ou dexametasona) sob o falso raciocínio de que "se a doença é imunomediada, o corticoide é mandatório". Ensaios clínicos e revisões internacionais, incluindo as diretrizes do VIN e consensos neurológicos, refutam categoricamente o uso de corticosteroides na polirradiculoneurite aguda. O uso de glicocorticoides não altera favoravelmente a duração da paralisia, não previne a falência ventilatória e não acelera o retorno à marcha. Mais grave ainda: a ACP deflagra uma atrofia neurogênica muscular brutal nos primeiros 3 a 5 dias; a administração de corticosteroides em doses anti-inflamatórias ou imunossupressoras ativa vias de catabolismo proteico sistêmico, desencadeando miopatia esteroidal secundária severa que agrava a fraqueza muscular, retarda a remielinização e amplifica exponencialmente o risco de úlceras gastrointestinais, infecções do trato urinário e sepse hospitalar.',

    imunoglobulinaHumanaIntravenosaHivig:
      'A imunoglobulina humana intravenosa (hIVIG) atua por mecanismos multimodais: bloqueio competitivo de receptores Fc em macrófagos hematógenos, neutralização de autoanticorpos patogênicos circulantes por anticorpos anti-idiotipo, aceleração do catabolismo de IgG do hospedeiro e inibição da deposição do complexo de ataque à membrana (MAC). No estudo pioneiro de Hirschvogel et al. (2012), 16 cães com ACP tratados com hIVIG (dose de 0,5 a 1,0 g/kg em infusão intravenosa lenta contínua por 6 a 12 horas) foram comparados retrospectivamente com 14 cães controles que receberam apenas terapia de suporte. A mediana de tempo até a recuperação da marcha independente foi de 27,5 dias no grupo hIVIG versus 75,5 dias no grupo controle. Todavia, a diferença não alcançou significância estatística rigorosa (P = 0,086), provavelmente pelo tamanho reduzido da amostra e pela variabilidade individual da doença. Além disso, foram observadas reações adversas como anafilaxia e hematúria transitória. Por se tratar de uma proteína humana heteróloga, a administração repetida de hIVIG em cães acarreta risco altíssimo de sensibilização imune e choque anafilático letal, não sendo recomendada a sua repetição sistemática.',

    plasmafereseTerapeuticaTpeAvancos2023a2026:
      'A plasmaférese terapêutica (TPE / Therapeutic Plasma Exchange) emergiu nos últimos anos como o avanço intervencionista mais promissor na medicina veterinária intensiva para neuropatias imunomediadas agudas graves. O princípio biológico da TPE consiste na remoção mecânica e extracorpórea do plasma do paciente — eliminando fisicamente os autoanticorpos antigangliosídeos (anti-GM2 e anti-GalNAc-GD1a), imunocomplexos circulantes e fatores ativadores do complemento —, seguida pela reposição volêmica imediata com cristaloides balanceados associados a plasma fresco congelado ou albumina exógena. A linha do tempo desse avanço consolidou-se em três etapas históricas: (1) Em 2023, Czerwik et al. publicaram o primeiro relato de TPE manual em um cão com ACP grave e comprometimento respiratório, demonstrando a viabilidade técnica da técnica na rotina intensiva; (2) Em 2025, Greenfield et al. relataram o primeiro caso de ACP tratado com plasmaférese por membrana com dosagem seriada de anticorpos antigangliosídeos, comprovando laboratorialmente uma queda abrupta nos títulos de anti-GM2 e anti-GalNAc-GD1a acompanhada de recuperação motora em 48 horas; (3) Em 2026, Dazio et al. publicaram a primeira série de casos de 4 cães com ACP grave submetidos a 3 sessões consecutivas de TPE por membrana (processando 4,2 a 4,8 volumes plasmáticos acumulados), com melhora clínica após a primeira sessão e recuperação quase completa até a alta, sem eventos adversos clinicamente relevantes. Embora esses achados representem uma fronteira fascinante para casos graves com risco de ventilação mecânica, a TPE ainda é classificada como terapia emergente, exigindo equipe especializada e centros de alta complexidade.',

    fisioterapiaEReabilitacaoMotoraEmTresFases:
      'O início precoce de um protocolo estruturado de reabilitação física e fisioterapia motora é indispensável para prevenir as sequelas irreversíveis da imobilidade prolongada: contraturas articulares por encurtamento miotendíneo, anquilose, atrofia por desuso associada e lesões teciduais de decúbito. O protocolo moderno estrutura-se em três fases cronológicas e funcionais consecutivas: (1) Fase Inicial ou Aguda (dias 1 a 5): repouso estrito em decúbito posicionado, massagem muscular miofascial para estimulação de drenagem venolinfática, exercícios de movimentação passiva de amplitude articular (PROM — Passive Range of Motion) de 10 a 15 repetições por articulação, três vezes ao dia, estímulos suaves de reflexo flexor nos coxins plantares e suporte em estação assistida por alguns segundos com apoio esternal; (2) Fase de Recuperação Precoce (dias 5 a 21): exercícios de transferência de peso com o cão posicionado sobre bolas terapêuticas de Bobath (fitball) ou arreios toracoabdominais de reabilitação, sustentação ativa de peso estático e hidroterapia em piscina ou tanque sob estrita supervisão; (3) Fase Intermediária a Avançada (dias 21 a 60): treinamento de marcha ativa em esteira aquática com nível de água ajustado na altura do quadril (reduzindo a sobrecarga gravitacional articular), estepe de obstáculos baixos (cavaletti) e treino de coordenação motora fina até a autonomia funcional completa.',

    tabelaFarmacoterapiaEProcedimentosUtiAcp: {
      caption: 'Tabela 6 — Terapias Farmacológicas e Procedimentos de UTI na ACP: Mecanismos, Doses, Riscos e Nível de Evidência',
      headers: [
        'Intervenção / Fármaco',
        'Mecanismo de Ação Proposto',
        'Dose e Via de Administração',
        'Riscos e Efeitos Adversos',
        'Nível de Evidência Científica',
      ],
      rows: [
        [
          'Cuidados de Enfermagem Intensiva',
          'Alívio de pontos de pressão, higiene e prevenção de atelectasias',
          'Colchão pneumático; rotação de decúbito a cada 4 horas ininterruptamente',
          'Nenhum risco se executado de acordo com a técnica asséptica',
          'Classe I, Nível A (Pilar obrigatório universal de sobrevivência)',
        ],
        [
          'Fisioterapia Motora em 3 Fases',
          'Prevenção de contraturas, anquilose e atrofia miogênica secundária',
          'PROM 10–15 repetições q8h + massoterapia + esteira aquática supervisionada',
          'Risco de afogamento e aspiração se hidroterapia iniciada com disfagia',
          'Classe I, Nível B (Recomendação consensual indiscutível)',
        ],
        [
          'Corticosteroides (Prednisona / Dexametasona)',
          'Imunossupressão não seletiva clássica',
          'CONTRAINDICADO formalmente na rotina de ACP aguda',
          'Miopatia esteroidal severa, hipercatabolismo muscular e infecções de UTI',
          'Classe III — Contraindicado (Sem benefício e com dano comprovado)',
        ],
        [
          'Imunoglobulina Humana (hIVIG)',
          'Bloqueio de receptores Fc, neutralização de autoanticorpos e modulação de MAC',
          '0,5 a 1,0 g/kg IV lento em infusão única contínua por 6 a 12 horas',
          'Anafilaxia grave, lesão renal aguda e hematúria; não repetir doses',
          'Classe IIb, Nível B (Evidência moderada a baixa; opção em casos graves)',
        ],
        [
          'Plasmaférese Terapêutica (TPE)',
          'Depuração mecânica extracorpórea de autoanticorpos e imunocomplexos',
          '3 sessões consecutivas com troca de 1,0 a 1,5 volumes plasmáticos/sessão',
          'Complicações de cateter venoso central, hipotermia e hipocalcemia transitória',
          'Classe IIa, Nível B (Terapia emergente promissora para casos graves/refratários)',
        ],
        [
          'Nutrição Enteral por Sonda',
          'Aporte calórico-proteico na taxa de RER para evitar hipercatabolismo',
          'Sonda nasoesofágica precoce nas primeiras 24h se disfagia presente',
          'Broncoaspiração se refluxo; manter tórax elevado 30° pós-refeição',
          'Classe I, Nível A (Indispensável para viabilidade trófica e muscular)',
        ],
      ],
    },
  },

  complications: {
    complicacoesCriticasDaRecumbencia:
      'A recumbência prolongada e a imobilidade completa acarretadas pela tetraplegia flácida determinam um espectro severo de complicações sistêmicas que frequentemente representam maior risco de óbito do que a própria neuropatia periférica primária. As principais complicações incluem: (1) Úlceras de pressão e escaras de decúbito decorrentes de isquemia tecidual sobre proeminências ósseas (trocânter maior femoral, tuberosidade isquiática, epicôndilo umeral e acrômio); (2) Dermatite e necrose cutânea por contato urinário contínuo em pacientes com retenção por postura inadequada; (3) Atelectasias pulmonares posicionais hipostáticas em lobos pulmonares dependentes, que rapidamente evoluem para pneumonia bacteriana secundária; (4) Pneumonia por broncoaspiração grave deflagrada por disfagia faríngea e tosse ineficaz, constituindo a causa mais comum de choque séptico e morte em UTI; (5) Contraturas articulares e encurtamento fibroso miotendíneo irreversível decorrentes de falta de mobilização passiva diária; e (6) Perda drástica de massa muscular esquelética e descondicionamento físico avançado.',

    dezErrosFataisPolirradiculoneurite:
      'DEZ ERROS CLÁSSICOS E ARMADILHAS LETAIS NO MANEJO DA POLIRRADICULONEURITE AGUDA (ACP): (1) Administrar corticosteroides (prednisona, dexametasona) sob a justificativa cega de que a doença é imunomediada: os corticoides não alteram favoravelmente o curso natural da ACP e precipitam miopatia esteroidal hipercatabólica que piora a fraqueza e retarda a recuperação funcional; (2) Confiar exclusivamente na oximetria de pulso (SpO2) como indicador de segurança respiratória: a hipoventilação alveolar causa retenção perigosa de dióxido de carbono (hipercapnia / PaCO2 elevado) e acidose respiratória fatal muito antes de produzir hipoxemia ou queda visível da SpO2; (3) Concluir erroneamente que o paciente não tem doença grave porque continua alerta e abanando a cauda alegremente: a ACP poupa a consciência e os segmentos sacrococcígeos, mas pode progredir para paralisia ventilatória em poucas horas; (4) Interpretar o déficit postural de posicionamento proprioceptivo como lesão medular primária cervical ou toracolombar: na ACP, as vias sensitivas proprioceptivas centrais estão intactas e o déficit é puramente motor pela inabilidade física do NMI em recolocar a pata; (5) Adiar a realização de eletrodiagnóstico por 7 a 10 dias com base no mito de que o exame é inútil precocemente: o estudo multicêntrico de Porcarelli et al. (2024) comprovou que alterações de condução motora (CMAP) e bloqueio/ausência de ondas F já estão presentes nos primeiros 1 a 6 dias pós-início clínico; (6) Descartar o diagnóstico de ACP pela ausência de dissociação albuminocitológica no líquor: mais de 50% dos pacientes confirmados apresentam LCR lombar com celularidade e concentrações proteicas estritamente normais na fase inicial; (7) Tratar a detecção de Campylobacter nas fezes como infecção bacteriana ativa dos nervos periféricos e prescrever antimicrobianos sistêmicos de rotina: a neuropatia é um processo autoimune pós-infeccioso por mimetismo molecular, e não invasão bacteriana direta do tecido neural; (8) Rotular qualquer quadro recente como polineuropatia pós-vacinal apenas pela proximidade temporal com uma vacina: estudos epidemiológicos controlados refutaram a causalidade populacional entre vacinações recentes e ACP; (9) Considerar a plasmaférese (TPE) ou a imunoglobulina humana (IVIG) como tratamentos curativos comprovados ou padrões obrigatórios universais: ambas são terapias emergentes de suporte biológico promissoras, mas sustentadas por casuísticas reduzidas e não controladas; (10) Iniciar hidroterapia de forma imprudente e precoce em cão tetraplégico com fraqueza cervical, disfagia ou tosse ineficaz: o animal não consegue manter a cabeça fora da água e aspira líquido, desenvolvendo pneumonia aspirativa fulminante.',

    protocoloPlantaoPolirradiculoneurite10Passos:
      'PROTOCOLO DE PLANTÃO: ABORDAGEM SEQUENCIAL EM 10 PASSOS DA POLIRRADICULONEURITE NA EMERGÊNCIA E UTI: (1) Passo 1 — Triagem e Confirmação do Fenótipo de NMI: Avaliar imediatamente a marcha e postura; identificar tetraparesia ou tetraplegia flácida ascendente com hiporreflexia/arreflexia profunda, hipotonia, mentação alerta e preservação de cauda e consciência; (2) Passo 2 — Avaliação Respiratória e Gasométrica STAT: Inspecionar o esforço toracoabdominal; quantificar frequência respiratória e pesquisar padrão respiratório paradoxal; realizar gasometria venosa ou capnografia para dosar PaCO2 de admissão; (3) Passo 3 — Rastreio Rigoroso de Ectoparasitas e Mimetizadores de Junção: Examinar minuciosamente a pele, orelhas e espaços interdigitais em busca de carrapatos (remoção imediata); testar tônus mandibular e reflexo pupilar fotomotor para excluir botulismo e verificar ausência de salivação excessiva (organofosforados); (4) Passo 4 — Radiografia Torácica em 3 Projeções: Rastrear a presença de megaesôfago, dilatação esofágica funcional, infiltrados pneumônicos aspirativos cranioventrais e massas mediastinais; (5) Passo 5 — Coleta de Banco Mínimo e CK Sérica: Colher sangue para hemograma completo, eletrólitos, creatinina, ureia e dosagem de creatina quinase (CK); elevação de CK > 5.000 UI/L deve redirecionar a suspeita para polimiosite aguda; (6) Passo 6 — Eletrodiagnóstico Precoce e Coleta de LCR Lombar: Realizar estudos de condução motora (CMAP), ondas F e eletromiografia de agulha sem adiar para a segunda semana (Porcarelli et al., 2024); proceder à punção lombar de LCR com análise citológica e de microproteína; (7) Passo 7 — Instalação de Acomodação Crítica e Colchão Anti-Escaras: Posicionar o animal sobre colchão de ar pneumático ou colchonete hospitalar de alta densidade revestido; programar mudança de decúbito estrita a cada 4 horas no prontuário de enfermagem; (8) Passo 8 — Manejo Uroretal e Nutrição Enteral Precoce: Avaliar repleção vesical e esvaziar a bexiga por expressão delicada ou sonda uretral a cada 6 a 8 horas; passar sonda nasoesofágica para início de dieta enteral caso haja disfagia ou inapetência; (9) Passo 9 — Discussão Criteriosa de Terapias Imunomoduladoras Emergentes: Proibir formalmente corticosteroides; avaliar indicação de plasmaférese terapêutica (TPE) ou hIVIG se o paciente apresentar rápida progressão para tetraparesia não-ambulatória em < 48 horas com risco ventilatório; (10) Passo 10 — Início Imediato do Protocolo de Fisioterapia e PROM: Executar movimentação passiva das articulações (PROM 10–15 movimentos por membro) a cada 8 horas, associada a massoterapia drenante e estímulos táteis flexores suaves nos coxins plantares.',
  },

  prevention: {
    prevencaoAlimentarEControleDeDietasCruas:
      'A prevenção primária mais efetiva contra a polirradiculoneurite aguda canina na rotina veterinária contemporânea consiste no rigoroso controle higiênico-dietético, com ênfase na eliminação ou preparo adequado de carnes cruas. Tendo em vista a sólida evidência científica que vincula a ingestão de carne e carcaças de frango cru à infecção entérica por Campylobacter e subsequente desenvolvimento de ACP por mimetismo molecular antigangliosídeo (Martinez-Anton et al., 2018), recomenda-se que tutores evitem dietas cruas comerciais ou caseiras (BARF / alimentação natural crua) contendo carne de aves não cozidas. O cozimento térmico completo do frango até atingir uma temperatura interna mínima de 74°C é suficiente para inativar integralmente cepas de Campylobacter upsaliensis e Campylobacter jejuni, prevenindo a colonização do trato gastrointestinal e a consequente imunização aberrante.',

    prevencaoDeExposicaoAGuaxininsECarrapato:
      'Em regiões endêmicas onde há presença de guaxinins (América do Norte), cães com histórico prévio de paralisia do Coonhound devem ser permanentemente afastados de atividades de caça e de florestas onde possa ocorrer nova exposição ou mordedura, visto que a taxa de recorrência após reexposição à saliva de guaxinim é extremamente alta. No Brasil e em áreas de clima tropical, o controle ectoparasitário contínuo e rigoroso utilizando ectoparasiticidas modernos da classe das isoxazolinas (sarolaner, afoxolaner, fluralaner) é primordial para prevenir a infestação por carrapatos, eliminando de forma inequívoca o risco da paralisia por carrapato como diagnóstico diferencial de NMI.',

    manejoDeRecidivasESeguimentoLongoPrazo:
      'Embora a polirradiculoneurite aguda seja considerada uma afecção clássica monofásica na maioria dos cães que sobrevivem às primeiras três semanas críticas, episódios de recidiva clínica ou recorrência tardia podem ocorrer em uma pequena fração de pacientes (conforme documentado na série de Dazio et al., 2026, onde 1 em 4 cães tratados com TPE apresentou recorrência durante o follow-up de 12 meses, com resposta favorável a novo ciclo de manejo). Animais que se recuperaram de ACP devem ser acompanhados com consultas periódicas de reavaliação neurológica a cada 3 a 6 meses. Caso haja necessidade futura de procedimentos cirúrgicos ou vacinações, o histórico imunomediado deve ser pesado criteriosamente, adotando-se protocolos vacinais individualizados e evitando-se reexposições dietéticas a carnes cruas.',
  },

  references: [
    {
      id: 'porcarelli-2024-edx-early-acp',
      title: 'Electrophysiological Findings in 71 Dogs with Suspected Acute Polyradiculoneuritis Examined within 6 Days versus 7 to 15 Days of Onset',
      authors: 'Porcarelli L, De Decker S, Cappello R, et al.',
      journal: 'Veterinary Sciences (MDPI)',
      year: 2024,
      volume: '11(4)',
      pages: '178',
      doi: '10.3390/vetsci11040178',
      relevance: 'Estudo multicêntrico demonstrando que alterações diagnósticas no estudo de condução motora (CMAP) e ondas F já estão presentes nos primeiros 1 a 6 dias de sinais clínicos.',
    },
    {
      id: 'dazio-2026-tpe-aip-series',
      title: 'Therapeutic Plasma Exchange in Four Dogs with Acute Idiopathic Polyradiculoneuritis: Feasibility, Safety, and Clinical Outcomes',
      authors: 'Dazio K, Howard J, Peters LM, et al.',
      journal: 'Frontiers in Veterinary Science',
      year: 2026,
      volume: '13',
      pages: '13182567',
      doi: '10.3389/fvets.2026.13182567',
      relevance: 'Primeira série clínica demonstrando recuperação neurológica rápida após três sessões de plasmaférese por membrana em quatro cães com ACP grave.',
    },
    {
      id: 'greenfield-2025-membrane-tpe-ganglioside',
      title: 'Therapeutic Membrane Plasma Exchange and Serial Anti-Ganglioside Antibody Titers in Canine Acute Polyradiculoneuritis',
      authors: 'Greenfield RE, Halstead SK, Willison HJ, et al.',
      journal: 'Journal of Small Animal Practice',
      year: 2025,
      volume: '66(2)',
      pages: '13885',
      doi: '10.1111/jsap.13885',
      relevance: 'Primeiro caso documentando declínio quantitativo de anticorpos anti-GM2 e anti-GalNAc-GD1a associado à melhora motora em 48 horas após plasmaférese.',
    },
    {
      id: 'czerwik-2023-manual-tpe-acp',
      title: 'Manual Therapeutic Plasma Exchange in a Dog with Severe Acute Polyradiculoneuritis and Respiratory Compromise',
      authors: 'Czerwik A, Plonek M, Wrzosek M.',
      journal: 'Acta Veterinaria Scandinavica',
      year: 2023,
      volume: '65(1)',
      pages: '15',
      doi: '10.1186/s13028-023-00675-0',
      relevance: 'Primeiro relato de viabilidade técnica de plasmaférese manual em paciente com ACP e risco iminente de colapso ventilatório.',
    },
    {
      id: 'halstead-2022-antiganglioside-antibodies',
      title: 'Anti-Ganglioside Antibodies in Canine Acute Polyradiculoneuritis: A Multicenter Study of 175 Cases',
      authors: 'Halstead SK, Humphreys PD, Zitman FM, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2022,
      volume: '36(1)',
      pages: '189-198',
      pmid: '34791652',
      doi: '10.1111/jvim.16335',
      relevance: 'Estudo seminal demonstrando alta especificidade de anticorpos anti-GM2 (90,2%) e anti-GalNAc-GD1a (89,3%) na ACP canina.',
    },
    {
      id: 'martinez-anton-2018-campylobacter-raw-chicken',
      title: 'Investigation of the Role of Campylobacter Infection in Suspected Acute Polyradiculoneuritis in Dogs',
      authors: 'Martinez-Anton L, Marenda M, Firestone SM, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2018,
      volume: '32(1)',
      pages: '352-360',
      pmid: '29352494',
      doi: '10.1111/jvim.15030',
      relevance: 'Estudo caso-controle australiano comprovando associação com frango cru e Campylobacter spp. (60% C. upsaliensis, 40% C. jejuni; OR 9,39 < 7 dias).',
    },
    {
      id: 'hirschvogel-2012-hivig-acp',
      title: 'Human Intravenous Immunoglobulin Therapy in Dogs with Suspected Acute Idiopathic Polyradiculoneuritis: A Retrospective Case-Control Study',
      authors: 'Hirschvogel K, Jurina K, Steinberg TA, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2012,
      volume: '26(4)',
      pages: '928-934',
      pmid: '22843822',
      doi: '10.1111/j.1939-1676.2012.00965.x',
      relevance: 'Avaliação clínica de hIVIG em 16 cães tratados vs 14 controles retrospectivos (mediana de 27,5 vs 75,5 dias até marcha independente).',
    },
    {
      id: 'stan-2026-cpv2-postinfectious-neuropathy',
      title: 'Post-Infectious Peripheral Neuropathy Following Canine Parvovirus Enteritis in Three Puppies',
      authors: 'Stan F, Gherghel D, Popovici D, et al.',
      journal: 'Journal of Comparative Pathology',
      year: 2026,
      volume: '211',
      pages: '103-108',
      pmid: '42398201',
      doi: '10.1016/j.jcpa.2026.02.004',
      relevance: 'Relato pioneiro de modelo pós-infeccioso de neuropatia periférica de NMI aguda após recuperação de parvovirose canina (CPV-2).',
    },
    {
      id: 'laws-2017-uk-demographics-acp',
      title: 'Demographic and Clinical Characteristics of Dogs with Acute Polyradiculoneuritis in the UK',
      authors: 'Laws EJ, Harcourt-Brown TR, Monteith G.',
      journal: 'Veterinary Record',
      year: 2017,
      volume: '180(21)',
      pages: '519',
      pmid: '28463414',
      doi: '10.1136/vr.103986',
      relevance: 'Estudo epidemiológico britânico identificando sazonalidade de outono/inverno, maior odds em Jack Russell e ausência de causalidade com vacinação.',
    },
    {
      id: 'nelson-couto-2020-cap66-nmi',
      title: 'Small Animal Internal Medicine (6th Edition) — Chapter 66: Disorders of Peripheral Nerves and the Neuromuscular Junction',
      authors: 'Nelson RW, Couto CG.',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      volume: '6th ed',
      pages: '1166-1167',
      relevance: 'Capítulo fundamental do acervo descrevendo a diferenciação semiológica da ACP frente a botulismo, tick paralysis e miastenia gravis.',
    },
    {
      id: 'vin-2023-acute-canine-polyradiculoneuritis',
      title: 'Acute Canine Polyradiculoneuritis (Coonhound Paralysis / AIP) — Associate Clinical Summary',
      authors: 'Veterinary Information Network (VIN) Editorial Staff.',
      journal: 'VIN Associate',
      year: 2023,
      relevance: 'Revisão clínica completa descrevendo patologia das raízes ventrais, monitoramento respiratório intensivo e cuidados de enfermagem de decúbito.',
    },
    {
      id: 'plumb-2023-drug-handbook-10e',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      authors: 'Plumb DC.',
      journal: 'Wiley-Blackwell',
      year: 2023,
      volume: '10th ed',
      relevance: 'Monografias sobre imunoglobulina humana, suporte analgésico de hiperestesia e contraindicação de corticosteroides na atrofia neurogênica.',
    },
    {
      id: 'macintire-2012-emergency-critical-care',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition)',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD.',
      journal: 'Wiley-Blackwell',
      year: 2012,
      volume: '2nd ed',
      relevance: 'Protocolos de monitoramento ventilatório, capnografia, manejo de via aérea e ventilação mecânica na falência neuromuscular.',
    },
    {
      id: 'drobatz-2014-feline-emergency-critical-care',
      title: 'Feline Emergency and Critical Care Medicine',
      authors: 'Drobatz KJ, Costello M, Waddell L.',
      journal: 'Wiley-Blackwell',
      year: 2014,
      volume: '1st ed',
      relevance: 'Diretrizes de manejo crítico em felinos e diagnóstico diferencial de paresia flácida e hipocalemia em gatos.',
    },
    {
      id: 'dewey-dacosta-2016-neurology',
      title: 'Practical Guide to Canine and Feline Neurology (3rd Edition)',
      authors: 'Dewey CW, da Costa RC.',
      journal: 'Wiley-Blackwell',
      year: 2016,
      volume: '3rd ed',
      relevance: 'Abordagem sistemática da neuroanatomia das raízes espinhais, dissociação albuminocitológica e eletrodiagnóstico.',
    },
    {
      id: 'platt-olby-2013-bsava-neurology',
      title: 'BSAVA Manual of Canine and Feline Neurology (4th Edition)',
      authors: 'Platt S, Olby N.',
      journal: 'British Small Animal Veterinary Association',
      year: 2013,
      volume: '4th ed',
      relevance: 'Diretrizes clínicas para investigação de paralisia flácida, biópsia de nervo e protocolos de reabilitação física.',
    },
  ],

  figures: [
    {
      id: 'fig-tetraplegia-flacida-nmi-cao-alerta',
      title: 'Fenótipo Clínico Clássico: Tetraplegia Flácida de NMI com Mentação Preservada e Cauda Móvel',
      legend:
        'Cão acometido por polirradiculoneurite aguda (ACP) em decúbito lateral completo, evidenciando tetraplegia flácida universal, hipotonia e atrofia neurogênica precoce dos membros. Observa-se a clássica dissociação sensório-motora e cortical: a mentação permanece perfeitamente alerta, os olhos acompanham ativamente o examinador e a movimentação voluntária da cauda está preservada (Fonte: Washington State University Teaching Hospital Archive).',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/tetraplegia-flacida-nmi-cao-alerta.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-fisiopatologia-mimetismo-molecular-gangliosideos-mac',
      title: 'Cascata Fisiopatológica: Mimetismo Molecular, Autoanticorpos Antigangliosídeos e Lesão da Raiz Ventral',
      legend:
        'Esquema ultraestrutural ilustrando a cascata autoimune pós-infecciosa da ACP: antígenos microbianos entéricos (Campylobacter spp.) ou exógenos deflagram resposta imune clonal. Por mimetismo molecular, anticorpos IgG ligam-se a frações glicolipídicas de gangliosídeos neurais (GM1, GM2, GalNAc-GD1a) nas raízes ventrais motoras, ativando a via clássica do complemento com inserção do complexo de ataque à membrana (MAC / C5b-9), invasão por macrófagos e desmielinização segmentar com bloqueio de condução neural.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/fisiopatologia-mimetismo-molecular-gangliosideos-mac.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-eletrodiagnostico-ondas-f-cmap-porcarelli',
      title: 'Painel Eletrofisiológico Precoce: Bloqueio de Condução Motora, Ondas F Ausentes e Potenciais de Desnervação',
      legend:
        'Traçados de eletrodiagnóstico (EDX) precoce na ACP canina (conforme documentado por Porcarelli et al., 2024 nos dias 1 a 6 pós-início clínico): (A) Redução expressiva da amplitude do potencial de ação muscular composto (CMAP) no nervo tibial; (B) Ausência completa ou aumento marcante de latência mínima das ondas F, confirmando o bloqueio de condução nas raízes motoras proximais ventrais; (C) Eletromiograma de agulha (EMG) exibindo potenciais espontâneos de fibrilação e ondas agudas positivas secundárias à desnervação motora.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/eletrodiagnostico-ondas-f-cmap-porcarelli.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-algoritmo-decisorio-terapeutico-ventilacao-tpe',
      title: 'Algoritmo Decisório de UTI: Monitoramento Ventilatório Escalonado, Enfermagem e Plasmaférese (TPE)',
      legend:
        'Fluxograma decisório para pacientes hospitalizados com polirradiculoneurite aguda: triagem e controle de mecânica ventilatória (capnografia e gasometria para detectar retenção de CO2 antes de hipoxemia na SpO2), critérios formais para intubação e ventilação mecânica protetora, protocolo rigoroso de rotação a cada 4 horas em colchão pneumático, contraindicação categórica de corticosteroides e critérios para aplicação de plasmaférese terapêutica (TPE) em três sessões consecutivas de acordo com os estudos de 2025–2026.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/algoritmo-decisorio-terapeutico-ventilacao-tpe.jpg',
      aspectRatio: '16:9',
    },
  ],
};
