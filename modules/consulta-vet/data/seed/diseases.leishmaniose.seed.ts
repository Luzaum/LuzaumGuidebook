import { DiseaseRecord } from '../../types/disease';

/** Conteúdo editorial alinhado às Diretrizes Brasileish 2025 (PDF edição 2025). */
export const leishmanioseVisceralCaninaRecord: DiseaseRecord = {
  id: 'disease-leishmaniose-visceral-canina',
  slug: 'leishmaniose-visceral-canina',
  title: 'Leishmaniose visceral canina (leishmaniose canina por L. infantum)',
  synonyms: [
    'LCan',
    'LV canina',
    'Leishmaniose canina',
    'Leishmaniose visceral em cães',
    'Canine visceral leishmaniasis',
    'Leishmania infantum (cão)',
  ],
  species: ['dog'],
  category: 'infecciosas',
  tags: [
    'Leishmania infantum',
    'Flebotomíneo',
    'Zoonose',
    'Brasileish',
    'Miltefosina',
    'Marbofloxacina',
    'Alopurinol',
    'Estadiamento I–VI',
  ],
  quickSummary:
    'A leishmaniose visceral canina por Leishmania infantum é zoonose de ciclo vetorial cujo principal elo urbano e periurbano no Brasil são flebotomíneos (ex.: Lutzomyia longipalpis), com transmissão secundária documentada por transfusão, vertical e venérea em cães. O espectro clínico vai do cão infectado assintomático (importante reservatório parasitológico) ao quadro multissistêmico com dermatopatia, uveíte, linfadenomegalia, anemia, proteinúria e insuficiência renal progressiva — nefropatia e IRIS avançado são determinantes centrais de morbimortalidade. Não existe sinal patognomônico isolado: a sorologia indica exposição e memória humoral, mas positividade cruzada, vacinas e tratamentos prévios exigem confirmação direta (amastigotas em citologia/histologia) ou molecular (PCR) com interpretação integrada ao estádio clínico-laboratorial. O estadiamento I–VI (Brasileish e adaptações clínicas) organiza leishmanicidas registrados no país (miltefosina, associações com marbofloxacina conforme bula), leishmaniostáticos como alopurinol e imunomodulação quando indicada, sempre com monitorização renal, hematológica e oftálmica. Prevenção combina produtos com efeito comprovado contra flebotomíneos, manejo ambiental (reduzir criadouros), testagem em áreas endêmicas e educação sobre limites de vacinas e sorologia em campanhas.',
  quickDecisionStrip: [
    'Área endêmica ou viagem + perda de peso, dermatopatia, linfonodomegalia ou proteinúria = investigar LCan.',
    'Citologia com amastigotas em medula, linfonodo ou pele lesada é confirmação direta; PCR útil e quantitativa ajuda seguimento.',
    'Sorologia positiva ≠ sempre doença ativa: cruzar com parasitológico/molecular e quadro clínico-laboratorial.',
    'Estadiamento I–VI (Brasileish/LeishVet adaptado) define leishmanicida, leishmaniostático e imunomodulação.',
    'Prevenção: produtos com efeito repelente/inseticida contra flebotomíneos; evitar atividade no crepúsculo/noite.',
  ],
  quickSummaryRich: {
    lead:
      'LCan é doença de interface: interface vetor–cão–humano em saúde pública, e interface sorologia–PCR–citologia na clínica individual. Tutores ouvem “positivo” e assumem tratamento imediato; o médico veterinário precisa separar infecção documentada, estágio clínico e dano renal antes de escolher miltefosina, alopurinol ou apenas vigilância. No Brasil, a bula e o MAPA importam tanto quanto o artigo científico.',
    leadHighlights: ['L. infantum', 'flebotomíneos', 'PCR', 'estadiamento', 'Brasileish'],
    pillars: [
      {
        title: 'Vetor e risco',
        body:
          'Principal transmissão: fêmeas de flebotomíneos infectadas. Lutzomyia longipalpis é o principal vetor de L. infantum no Brasil; espécies variam regionalmente. Reduzir exposição no período crepuscular/noturno e usar coleiras/pipetas/comprimidos com efeito comprovado contra flebotomíneos quando disponível.',
        highlights: ['longipalpis', 'crepuscular'],
      },
      {
        title: 'Confirmar antes de rotular',
        body:
          'Não há sinal patognomônico. Sorologia indica exposição/imunidade humoral; confirmação de infecção em cães soropositivos reforça-se com parasitológico e/ou molecular, como recomenda o documento.',
        highlights: ['sorologia', 'PCR', 'citologia'],
      },
      {
        title: 'Renal e IRIS',
        body:
          'Nefropatia é causa importante de morbimortalidade. A partir do estádio IV, o manejo renal segue lógica IRIS quando há alterações de RPC, creatinina, SDMA e proteinúria.',
        highlights: ['RPC', 'IRIS'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (resumo expandido)',
      steps: [
        {
          label: '1. Probabilidade pré-laboratorial',
          detail:
            'Residir/viajar para área endêmica + perda de peso, dermatopatia sugestiva, linfonodos, uveíte ou proteinúria coloca LCan no topo do diferencial; coinfecção por Ehrlichia canis pode somar plaquetopenia e confundir gravidade.',
        },
        {
          label: '2. Confirmação parasitológica direta',
          detail:
            'Citologia ou histopatologia com amastigotas em linfonodo, medula óssea, pele lesada ou outro tecido adequado — prova de infecção ativa quando a morfologia é típica e o contexto compatível.',
        },
        {
          label: '3. PCR e quantificação',
          detail:
            'Sangue, tecido ou fluidos conforme protocolo; útil para seguimento em serviços que padronizam ciclos de amplificação; interpretar carga junto à clínica (não é “jogo de números” isolado).',
        },
        {
          label: '4. Sorologia (IFAT, ELISA, testes rápidos)',
          detail:
            'Indica exposição/imunidade humoral; títulos altos apoiam mas não substituem confirmação direta em muitos protocolos oficiais; vacinas e tratamentos prévios alteram leitura.',
        },
        {
          label: '5. Estadiamento e dano orgânico',
          detail:
            'Hemograma, creatinina, SDMA, urinálise, RPC, fundo de olho, peso e escore corporal; estádios IV–VI exigem lógica nefroproteção IRIS paralela.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Lógica terapêutica (Brasil)',
      steps: [
        {
          label: '1. Estadiar antes de prescrever',
          detail:
            'I–VI orientam intensidade: cão I assintomático soropositivo não se trata como estádio VI renal — evite politoxicidade desnecessária.',
        },
        {
          label: '2. Leishmanicidas registrados',
          detail:
            'Miltefosina e esquemas com marbofloxacina conforme registro ANVISA e bula vigente; respeitar contraindicações reprodutivas e monitorização hepática/renal.',
        },
        {
          label: '3. Alopurinol e eixo purinas',
          detail:
            'Papel consolidado como leishmaniostático; atenção a urolitíase por xantina — hidratação, urinálise e ultrassom quando indicado.',
        },
        {
          label: '4. Imunomoduladores e adjuvantes',
          detail:
            'Domperidona e outras classes entram em protocolos específicos; integrar com estado imune e legislação local.',
        },
        {
          label: '5. Seguimento objetivo',
          detail:
            'Repetir painel clínico-laboratorial em intervalos definidos (vide tabelas Brasileish); ajustar terapia por resposta renal e não só por sorologia.',
        },
      ],
    },
  },
  etiology: {
    visaoGeralLeishmanioses:
      'As leishmanioses são doenças parasitárias causadas por protozoários do gênero Leishmania (Trypanosomatidae), transmitidos biologicamente por fêmeas de flebotomíneos (Phlebotominae) durante o repasto sanguíneo. Na leishmaniose visceral (LV), formas secundárias de transmissão também são relatadas: transfusão sanguínea, compartilhamento de agulhas, transmissão congênita e venérea (em cães). Em humanos, a LV é sistêmica grave; em cães, conforme espécie de Leishmania e resposta imune, o espectro vai de lesões cutâneas localizadas a sinais sistêmicos (hepatoesplenomegalia e outros). Nas Américas, L. infantum e L. braziliensis são frequentemente relatadas em cães; o foco destas diretrizes é L. infantum pela relevância clínica e zoonótica.',
    especiesAgentesAmericas:
      'Várias espécies já foram descritas em cães nas Américas: L. amazonensis, L. braziliensis, L. guyanensis, L. infantum, L. mexicana, L. panamensis, L. peruviana e L. naiffi. L. braziliensis e L. infantum são as mais frequentemente relatadas; em alguns países outras espécies predominam (ex.: Colômbia — L. panamensis e L. braziliensis). Infecções por L. amazonensis têm se tornado mais frequentes no Brasil.',
    cicloVetorialFlebotomineos:
      'Os flebotomíneos (“mosquito-palha”, tatuquiras etc.) adquirem infecção ao se alimentar de hospedeiro infectado, ingerindo amastigotas presentes em células do sistema fagocítico mononuclear. No vetor ocorre diferenciação e multiplicação até promastigotas metacíclicas infectantes, transmitidas no novo repasto. A taxonomia dos flebotomíneos americanos foi reorganizada (ex.: antes Lutzomyia, agora múltiplos gêneros). Vetores podem ser específicos (uma espécie de Leishmania) ou permissivos (várias espécies) — exemplos permissivos citados: Lutzomyia longipalpis e Migonemyia migonei. No Brasil, L. longipalpis é o principal vetor de L. infantum; outras espécies podem participar regionalmente (ex.: L. cruzi no Mato Grosso do Sul). Para L. braziliensis, citam-se vetores como Nyssomyia intermedia, N. neivai, N. whitmani, M. migonei, Psychodopygus wellcomei e P. complexus, com predominância variável por foco.',
    transmissaoSecundariaCaes:
      'Em cães, descrevem-se transmissão vertical (transplacentária), venérea e por transfusão sanguínea. Filhotes infectados por essas vias podem desenvolver sinais clínicos e infectar flebotomíneos, relevante para controle. Outras vias (mordedura, carrapatos) carecem de evidência robusta.',
  },
  epidemiology: {
    distribuicaoMundialEAmericas:
      'As leishmanioses humanas concentram-se em quatro grandes regiões (Américas, África Oriental, Norte da África, Oeste/Sudeste Asiático). O Brasil, com Etiópia, Quênia e Sudão, concentra cerca de 60% dos casos mundiais de LV humana. A LCan expandiu-se nas Américas, inclusive Cone Sul; registros vão do Uruguai a EUA/Canadá. L. infantum foi relatada em cães em 17 países e L. braziliensis em nove; a ausência aparente em alguns territórios pode refletir falta de publicações.',
    leishmanioseNoBrasil:
      'No Brasil a LCan está amplamente distribuída, inclusive na região Sul, antes considerada livre. L. infantum e L. braziliensis estão amplamente difundidas; infecções por outras espécies podem estar subestimadas quando a vigilância em humanos existe mas a casuística canina é escassa.',
    prevalenciaIncidencia:
      'A prevalência de infecção por Leishmania spp. em cães varia regionalmente; estudos mostram valores altos em partes da Argentina, Brasil e Paraguai. Em Sobral (CE), em foco tradicional de LV humana, a soroprevalência média em 73.964 cães (2008–2017) foi 3,8% (1,6–13,1% entre bairros), com picos anuais >50% em alguns bairros. A soroprevalência depende do teste (ELISA vs RIFI vs intradermorrea) e pode haver reatividade cruzada com outros tripanossomatídeos. Há poucos dados de incidência anual na América Latina; estudos em PE e MG mostraram incidências brutas anuais de soroconversão/positividade de 19,6% e 43,8% em coortes de áreas selecionadas — ou seja, proporção elevada de animais que se tornam positivos ao longo do tempo em áreas intensamente expostas.',
  },
  pathogenesisTransmission: {
    imunopatogeneseEOrganos:
      'Lesões decorrem da multiplicação parasitária e da resposta imune humoral exacerbada. Parasitos em órgãos linfoides e não linfoides induzem proliferação de linfócitos B, histiócitos, macrófagos e plasmócitos — linfadenomegalia generalizada e hepatoesplenomegalia. Coinfecções vetoriais (ex.: Ehrlichia canis) podem agravar o quadro. Cães com resposta imune celular eficiente podem permanecer assintomáticos (ver classificação geral / estágio II).',
    formasClinicasDidaticas:
      'Manifestações podem ser predominantes em um sistema — dermatopatias (“dermatoleish”), olhos (“oftalmoleish”), rins (“nefroleish”), locomotor (“ortoleish”), hematológico (“hematoleish”) — ou associadas e disseminadas.',
    transmissaoResumo:
      'Transmissão primária: flebotomíneo infectado. Secundária em cães: vertical, venérea, transfusional — relevante para biossegurança (reprodução, doação de sangue) e controle.\n\n' +
      'Dica de estudo: memorize o par “vetor principal (flebotomíneo)” + “transfusão como via iatrogênica” — é padrão em questões de biossegurança em banco de sangue.',
  },
  pathophysiology:
    'A deposição de imunocomplexos e a inflamação contribuem para glomerulonefrite, uveíte e outros sinais de doença imunomediada; a proteinúria e a azotemia são marcas frequentes de gravidade. Discrasias (anemia, trombocitopenia, hiperviscosidade) e vasculites podem ocorrer. Dermatopatias incluem dermatite descamativa seca (periocular, dorso nasal, pavilhão, saliências ósseas), úlceras, pústulas, onicopatias e outros. Nefropatias incluem proteinúria, azotemia, hematúria e progressão para DRC. O comprometimento locomotor inclui poliartrite, miosite e alterações ósseas. Manifestações neurológicas são raras mas descritas; trato gastrointestinal frequentemente com diarreia crônica ou colite; cardiopatias descritas com miocardite ou vasculite.\n\n' +
    'Dica de estudo: organize mentalmente por “sistemas” — pele, olhos, rins, sangue — porque a banca costuma cobrar a forma “dermato‑/oftalmo‑/nefro‑leish” como eixos mnemônicos.',
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [
        'Dermatite descamativa seca (furfurácea) em face, dorso nasal, margens auriculares e saliências ósseas.',
        'Dermatite ulcerativa em mucocutâneas, focinho, interdigital; papular, pustular, nodular; alopecia, vasculite de ponta de orelha, hiperqueratose nasal/digital, onicopatias.',
      ],
    },
    {
      system: 'ocular',
      findings: [
        'Conjuntivite folicular/membranosa; ceratites com neovascularização; uveítes; blefarites; em casos graves, glaucoma e perda ocular.',
      ],
    },
    {
      system: 'renal',
      findings: [
        'Proteinúria, azotemia, hematúria, IRA e evolução para DRC — importante causa de óbito.',
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        'Poliartrite erosiva, polimiosite, osteomielite; caquexia e atrofia de mastigatórios.',
      ],
    },
    {
      system: 'hematologic',
      findings: [
        'Anemia não regenerativa ou IMHA, trombocitopenia, hipergammaglobulinemia, sangramentos/epistaxe, síndrome de hiperviscosidade.',
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        'Diarreia crônica; colite granulomatosa hemorrágica; parasitos documentados em mucosa cólica em alguns casos.',
      ],
    },
    {
      system: 'neurologic',
      findings: [
        'Raras: convulsões, ataxia, paresias por envolvimento do SNC/PNS.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Miocardite, vasculite — mecanismos diretos/indiretos descritos.',
      ],
    },
  ],
  diagnosis: {
    tabelaClassificacaoExposicaoInfeccao: {
      kind: 'clinicalTable',
      headers: ['Classificação', 'Características (Tabela 1 — Brasileish 2025)'],
      rows: [
        [
          'Exposto (estádio I)',
          'Sem manifestações clínicas nem alterações laboratoriais; sorologia positiva; exames parasitológicos e/ou moleculares negativos.',
        ],
        [
          'Infectado sadio (estádio II)',
          'Sem manifestações clínicas nem alterações laboratoriais; sorologia positiva ou negativa; parasitológico e/ou molecular positivo.',
        ],
        [
          'Infectado doente (estágios III a VI)',
          'Com manifestações clínicas e/ou alterações laboratoriais; sorologia positiva ou negativa; parasitológico e/ou molecular positivo.',
        ],
      ],
    },
    fundamentosDiagnosticoLCan:
      'O diagnóstico baseia-se em sinais clínicos e alterações laboratoriais compatíveis, com confirmação por métodos parasitológicos, sorológicos e/ou moleculares. Não existe sinal patognomônico; alterações laboratoriais são inespecíficas. A confirmação laboratorial é fundamental.',
    citologiaFormasAmastigotas:
      'A citologia para pesquisa de amastigotas é o exame mais simples e definitivo. Principais amostras: medula óssea, linfonodo e pele lesionada. Sensibilidade depende do tipo de amostra e da carga parasitária; sangue não é a amostra preferencial apesar de descrições de detecção.',
    testesMolecularesPcr:
      'PCR e métodos de amplificação tornaram-se mais acessíveis. Sensibilidade e especificidade dependem de amostra e protocolo — o clínico deve solicitar dados ao laboratório. Amostras preferenciais: como na citologia (medula, linfonodo, pele). Swab conjuntival ou sangue são alternativas menos invasivas com menor carga de DNA; nesses casos, PCR em tempo real é preferível por maior sensibilidade e permite quantificar carga parasitária (útil para monitorar tratamento). Testes moleculares rápidos (point-of-care) existem mas ainda não estão amplamente disponíveis.',
    sorologiaEInterpretacao:
      'Sorologia é amplamente usada; sensibilidade e especificidade variam. Há reações cruzadas com outras Leishmania e tripanossomatídeos. Em geral, sorologia indica exposição, não necessariamente infecção ativa — especialmente em testes qualitativos rápidos. Em testes quantitativos, títulos altos sugerem infecção ativa ou doença em suspeitos clínicos. Na RIFI, níveis duas a quatro vezes acima do ponto de corte são considerados altos. Exemplo didático do texto: se o corte for 1:40, 1:40 sugere exposição, 1:160 infecção e 1:320 doença em cães suspeitos — sempre integrar ao exame físico, outros exames e carga parasitária. Em cães soropositivos, a infecção deve ser confirmada por parasitológico e/ou molecular quando aplicável.',
  },
  treatment: {
    arquiteturaTerapeuticaTresClasses:
      'O tratamento combina leishmanicidas, leishmaniostáticos e imunomoduladores conforme confirmação da infecção e gravidade (estadiamento). A escolha segue critérios clínico-laboratoriais (Tabela 3).',
    farmacosRegistradosBrasil:
      'No Brasil, os únicos fármacos registrados e autorizados citados são miltefosina (Milteforan, SP 000175-9.000003) e marbofloxacina (Marbox Leish, SP 000022-0.000020). Estudos citam melhora clínica, redução de carga parasitária e infecciosidade com miltefosina; marbofloxacina com eficácia demonstrada inclusive em cenários com doença renal em trabalhos internacionais.',
    tabelaFarmacosBrasil2025: {
      kind: 'clinicalTable',
      headers: ['Fármaco', 'Dose (diretrizes Brasileish 2025)', 'Efeitos adversos / observações'],
      rows: [
        [
          'Miltefosina',
          '2 mg/kg SID, 28 dias',
          'Vômito, diarreia, disorexia. Milteforan registrado no Brasil para LCan.',
        ],
        [
          'Marbofloxacina',
          '2 mg/kg SID, 28 dias',
          'Possibilidade de seleção de resistência bacteriana (considerar uso racional). Marbox Leish registrado.',
        ],
        [
          'Alopurinol',
          '10 mg/kg BID, 6–12 meses (leishmaniostático; uso frequente em combinação)',
          'Urolitíase de xantina, mineralização renal; monitorar trato urinário e função renal.',
        ],
        [
          'Domperidona',
          '0,5 mg/kg SID, 30 dias (imunomodulação)',
          'Galactorréia entre efeitos possíveis.',
        ],
      ],
    },
    alopurinolImunomoduladoresECorticoides:
      'Alopurinol potencializa esquemas com leishmanicidas e ajuda a manter carga baixa, com risco de recidiva se suspenso de forma inadequada. Imunomoduladores citados incluem domperidona, nucleotídeos e AHCC (suplemento). Corticoides (prednisona, prednisolona, dexametasona) têm sido usados pelo efeito imunossupressor em situações específicas, com cautela. Terapias alternativas (betaglucanas, spirulina, etc.) carecem de evidência ampla para recomendação de rotina.',
    estadiamentoClinicoBrasileish: {
      kind: 'clinicalTable',
      headers: [
        'Estádio',
        'Critérios (sorologia / parasitológico / molecular)',
        'Sinais clínicos',
        'Achados laboratoriais',
        'Conduta terapêutica (orientação)',
        'Prognóstico',
      ],
      rows: [
        [
          'I — Exposto',
          'Anticorpos presentes; parasitológico e/ou molecular negativo.',
          'Ausentes.',
          'Sem anormalidades laboratoriais.',
          'Monitoramento ou imunomodulação (sem ensaios clínicos específicos para “tratar” infectado assintomático).',
          'Bom.',
        ],
        [
          'II — Infectado sadio',
          'Anticorpos presentes ou ausentes; parasitológico e/ou molecular positivo.',
          'Ausentes.',
          'Sem anormalidades laboratoriais.',
          'Monitoramento ou imunomodulação; uso de leishmaniostático/leishmanicida conforme decisão profissional.',
          'Bom.',
        ],
        [
          'III — Doença leve',
          'Anticorpos presentes ou ausentes; parasitológico e/ou molecular positivo.',
          'Linfadenopatia, dermatite papular, emagrecimento discreto.',
          'Sem anormalidades ou perfil renal (morfologia, urinálise, RPC, SDMA, ureia/creatinina) normal.',
          'Imunomodulação + leishmaniostático + leishmanicida.',
          'Bom.',
        ],
        [
          'IV — Doença moderada',
          'Anticorpos em faixa variável; parasitológico e/ou molecular positivo.',
          'Sinais do III + lesões cutâneas difusas/simétricas, onicogrifose, úlceras, anorexia, emagrecimento.',
          'Anemia leve não regenerativa ou IMHA discreta; elevação de gamaglobulina e PCR; hipalbuminemia. Subestádios renais: (a) perfil normal; (b) alterações leves (densidade urinária, SDMA, proteinúria discreta RPC 0,5–1).',
          'Imunomodulação + leishmaniostático + leishmanicida; no subestádio renal (b), seguir IRIS.',
          'Bom a reservado.',
        ],
        [
          'V — Doença grave',
          'Anticorpos geralmente elevados; parasitológico e/ou molecular positivo.',
          'Sinais do IV + depósito de imunocomplexos (ex.: glomerulonefrite, uveíte).',
          'Anemia evidente, hipergamaglobulinemia, hipoalbuminemia, PCR elevada; DRC IRIS estádio 1 ou 2 (creatinina 1,4–2,8 mg/dl) ou equivalentes.',
          'Imunomodulação + leishmaniostático + leishmanicida; manejo renal pela IRIS.',
          'Reservado a pobre.',
        ],
        [
          'VI — Muito grave',
          'Anticorpos geralmente elevados; parasitológico e/ou molecular positivo.',
          'Sinais do V + tromboembolismo pulmonar ou síndrome nefrótica / IRF.',
          'Como V; DRC IRIS estádio 3 (creatinina 2,9–5) ou 4 (>5); proteinúria nefrótica (ex.: RPC >5).',
          'Imunomodulação + leishmaniostático + leishmanicida; IRIS; considerar diálise quando indicado.',
          'Pobre.',
        ],
      ],
    },
    notasRodapeEstadiamento:
      'Abreviações usadas no documento: RPC (razão proteína/creatinina urinárias), DRC, SDMA, IRIS. Notas do texto: (1) Em soropositivos, confirmar infecção por parasitológico e/ou molecular. (2) Se o laboratório define positivo RIFI ≥1:40, título ≥1:320 = “alto”. (3) Monitorar com sorologia, parasitológico/molecular e exames gerais para revisão terapêutica. (4) Em infectado sadio, uso de leishmaniostático/leishmanicida depende de decisão profissional; não há ensaios clínicos específicos para tratar “infectado assintomático”. Tabela adaptada de LeishVet com protocolos disponíveis no Brasil.',
    tabelaMonitoramentoBrasileish4: {
      kind: 'clinicalTable',
      headers: [
        'Parâmetro / exame',
        'Cão infectado doente (frequência sugerida)',
        'Cão infectado sadio (frequência sugerida)',
      ],
      rows: [
        [
          'Exame físico',
          'Após 1 mês de tratamento; depois a cada 3–4 meses no primeiro ano; a cada 6–12 meses quando clinicamente recuperado.',
          'A cada 6–12 meses.',
        ],
        [
          'Hemograma e perfil bioquímico (renal/hepático)',
          'A cada 6–12 meses (marcadores específicos a critério do responsável).',
          'A cada 6–12 meses.',
        ],
        [
          'Proteínas séricas (albumina, globulinas, relação A/G, PCR)',
          'A cada 6–12 meses.',
          'A cada 6–12 meses.',
        ],
        [
          'Urinálise e RPC',
          'A cada 3–6 meses.',
          'A cada 6–12 meses.',
        ],
        [
          'Sorologia quantitativa',
          'A cada 3–6 meses.',
          'A cada 6–12 meses.',
        ],
        [
          'PCR quantitativo',
          'A cada 3–6 meses.',
          'A cada 6–12 meses.',
        ],
        [
          'Ultrassom abdominal',
          'A cada 6–12 meses.',
          'A cada 6–12 meses.',
        ],
      ],
    },
    notasMonitoramento:
      'Radiografia e ultrassom podem auxiliar em complicações; em uso prolongado de alopurinol, imagem pode ajudar a monitorar cálculos. A escolha exata de marcadores renais/hepáticos fica a critério do médico veterinário (nota das diretrizes).',
  },
  prevention: {
    principiosPrevencao:
      'Parasitos raramente são eliminados completamente; prevenção reduz reinfecção e dispersão. Estratégias devem reduzir contato com o vetor. Eliminação de cães soropositivos como única medida de controle da LV humana é considerada ineficiente. Recomendam-se repelentes, manejo ambiental e reduzir atividade no crepúsculo/noite. Mosquiteiros impregnados com deltametrina reduziram picadas de L. longipalpis na Amazônia, mas impacto na infecção canina no Brasil nem sempre está demonstrado.',
    produtosRegistradosEvidenciaCampo:
      'A principal prevenção da infecção por L. infantum em cães é uso tópico com efeito repelente e/ou inseticida. Piretróides sintéticos e combinações são citados (ex.: coleira deltametrina 4%; combinações permetrina + fipronil + piriproxifen; imidacloprida + flumetrina; pipetas permetrina + imidacloprida). Isoxazolinas têm efeito inseticida contra flebotomíneos em estudos, mas ensaios de campo randomizados adicionais são necessários para muitos produtos. A tabela abaixo resume produtos citados com efeito repelente/inseticida e evidência de campo para L. infantum quando existente.',
    tabelaProdutosRepelentes2025: {
      kind: 'clinicalTable',
      headers: [
        'Produto (forma)',
        'Repelente',
        'Inseticida',
        'Estudo de campo para L. infantum em cães',
        'Idade mínima',
        'Período de eficácia indicado',
      ],
      rows: [
        [
          'Permetrina 65% (Pulvex) — pipeta',
          'Sim',
          'Sim',
          'Não',
          '≥4 semanas',
          '1 mês',
        ],
        [
          'Permetrina 50% + imidacloprida 10% (Advantage Max-3) — pipeta',
          'Sim',
          'Sim',
          'Sim',
          '≥7 semanas',
          '1 mês',
        ],
        [
          'Permetrina 36% + dinotefuran + piriproxifen (Vectra 3D) — pipeta',
          'Sim',
          'Sim',
          'Não',
          '≥7 semanas',
          '1 mês',
        ],
        [
          'Imidacloprida + permetrina + fluazuron (Efipet 3+) — pipeta',
          'Sim',
          'Sim',
          'Não',
          '≥8 semanas',
          '1 mês',
        ],
        [
          'Deltametrina 4% + propoxur (Leevre) — colar',
          'Sim',
          'Sim',
          'Sim',
          '≥12 semanas',
          'Até 4 meses',
        ],
        [
          'Permetrina + fipronil + piriproxifen (Frontmax) — colar',
          'Sim',
          'Sim',
          'Não',
          '≥40 semanas',
          'Até 8 meses',
        ],
        [
          'Imidacloprida 10% + flumetrina 4,5% (Seresto) — colar',
          'Sim',
          'Sim',
          'Sim',
          '≥7 semanas',
          'Até 8 meses',
        ],
        [
          'Afoxolaner (NexGard) — oral',
          'Não',
          'Sim',
          'Sim (inclui estudo não randomizado citado)',
          '≥8 semanas',
          '1 mês',
        ],
        [
          'Fluralaner (Bravecto) — oral',
          'Não',
          'Sim',
          'Não',
          '≥8 semanas',
          'Até 5 meses',
        ],
        [
          'Deltametrina 4% (Ectofend) — colar',
          'Sim',
          'Sim',
          'Não',
          '≥10 semanas',
          'Até 7 meses',
        ],
        [
          'Deltametrina 4% (Scalibor) — colar',
          'Sim',
          'Sim',
          'Sim',
          '≥40 semanas',
          'Até 6 meses',
        ],
      ],
    },
    notasRodapeTabela5:
      'Rodapé do documento: (1) Ensaios clínicos randomizados para eficácia na transmissão de L. infantum. (2) Registrados no Brasil com indicação em bula contra flebotomíneos. (3) Registrados no Brasil sem indicação em bula para flebotomíneos, mas com eficácia em laboratório ou estudos de campo. (4) Estudo de campo não randomizado com redução de risco com afoxolaner mensal na Itália.',
    gatosEManejo:
      'Em áreas endêmicas, cães não infectados e infectados devem usar proteção tópica; recomenda-se também para gatos, com ressalva de sensibilidade a piretroides — exceção citada: imidacloprida 10% + flumetrina 4,5% com estudo em felinos. Coleiras com deltametrina 4% têm estudos de impacto em saúde pública. Cães infectados devem ser excluídos de doação de sangue e reprodução. Tutores podem optar por tratamento ou eutanásia conforme legislação; se tratamento, proteção vetorial contínua. Populações errantes reforçam transmissão — esterilização e posse responsável são estratégias de médio prazo. Vacinação contra LCan não está disponível na América Latina ao tempo das diretrizes; estudos em curso.',
    controleAbrigosEAmbiental:
      'Piretroides em superfícies têm efeito residual ~3 meses; recomendam-se dois ciclos anuais de borrifação (fim do período chuvoso e 3–4 meses após), por profissional capacitado (referência MS/Brasil 2014 no texto). Em abrigos, triagem sorológica na admissão, separação de soropositivos para confirmação parasitológica/molecular, vigilância periódica e manejo por estadiamento com uso de repelentes. Controle químico residual ambiental pode complementar, conforme normas sanitárias.',
  },
  relatedConsensusSlugs: ['leishmaniose-brasileiro-2020'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-brasileish-2025-pdf',
      citationText:
        'Brasileish. Diretrizes para o diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina — edição Brasileish 2025.',
      sourceType: 'Diretriz / consenso',
      url: null,
      notes: 'Documento-base desta ficha (tabelas 1–5, estadiamento, fármacos registrados no Brasil, prevenção).',
      evidenceLevel: 'Consenso nacional-regional',
    },
    {
      id: 'ref-nelson-leish-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — leishmaniose e parasitoses sistêmicas (quadro clínico e abordagem).',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Complemento clínico às diretrizes regionais.',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-plumb-leish-drugs',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — miltefosina, alopurinol, antimicrobianos associados (conferir monografias).',
      sourceType: 'Formulário',
      url: null,
      notes: 'Doses e interações — cruzar com bulas BR.',
      evidenceLevel: 'Alta (referência prática)',
    },
    {
      id: 'ref-bsava-nu-proteinuria',
      citationText:
        'BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd ed., 2017 — proteinúria e comorbidades renais em doenças sistêmicas.',
      sourceType: 'Manual',
      url: null,
      notes: 'Contexto nefrológico quando há proteinúria/IRIS.',
      evidenceLevel: 'Alta',
    },
  ],
  isPublished: true,
  source: 'seed',
};
