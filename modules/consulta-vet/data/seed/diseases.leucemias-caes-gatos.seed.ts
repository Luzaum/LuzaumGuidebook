import type { DiseaseRecord } from '../../types/disease';

/**
 * LEUCEMIAS EM CÃES E GATOS — Monografia Clínica Completa
 * ConsultaVET / Vetius • Hematologia, Patologia Clínica e Oncologia Veterinária • Atualização: 16/11/2026
 */
export const leucemiasCaesGatosRecord: DiseaseRecord = {
  id: 'disease-leucemias-caes-gatos',
  slug: 'leucemias-caes-gatos',
  title: 'Leucemias em cães e gatos',
  subtitle:
    'Neoplasias hematopoéticas clonais agudas, crônicas e raras: diferenciação de FeLV, classificação por linhagem e imunofenótipo, diagnóstico medular/citométrico e terapêutica baseada em evidências',
  synonyms: [
    'Leucemia canina e felina',
    'Neoplasias hematopoéticas leucêmicas',
    'Leucemia linfoblástica aguda (LLA / ALL)',
    'Leucemia mieloide aguda (LMA / AML)',
    'Leucemia linfocítica crônica (LLC / CLL)',
    'Leucemia mieloide crônica (LMC / CML)',
    'Leucemia de grandes linfócitos granulares (LGL)',
    'Leucemia aguda indiferenciada (AUL)',
    'Eritroleucemia (AML-M6)',
    'Leucemia megacarioblástica (AML-M7)',
    'Leucemia mielomonocítica crônica (LMMC / CMML)',
    'Leucemia plasmocitária (PCL)',
  ],
  species: ['dog', 'cat'],
  category: 'hematologia',
  categories: ['hematologia', 'oncologia', 'clinica-medica', 'urgencia-emergencia'],
  tags: [
    'Leucemia',
    'LLA',
    'LMA',
    'LLC',
    'LMC',
    'LGL',
    'AUL',
    'Citometria de fluxo',
    'CD34',
    'CD80',
    'PARR',
    'Medula óssea',
    'Mielograma',
    'Síndrome mielodisplásica',
    'MDS',
    'FeLV',
    'Clorambucila',
    'Hidroxiureia',
    'Citarabina',
    'Neutropenia febril',
    'Transformação de Richter',
    'AAHA 2026',
  ],
  isPublished: true,
  source: 'seed',
  createdAt: '2026-11-16',
  updatedAt: '2026-11-16',

  plainLanguage: {
    whatIsIt:
      'A leucemia é um câncer originado nas células que fabricam o sangue, geralmente dentro da medula óssea. Em vez de produzir glóbulos vermelhos, plaquetas e glóbulos brancos saudáveis, um grupo alterado de células começa a se multiplicar de forma descontrolada.\n' +
      '- Leucemias agudas: formadas por células muito jovens (blastos) que crescem depressa, ocupam a medula e derrubam a produção de sangue normal — evoluem rapidamente e são muito graves.\n' +
      '- Leucemias crônicas: formadas por células mais maduras que se acumulam devagar ao longo de meses ou anos — muitos animais permanecem estáveis por longos períodos.\n' +
      '- Atenção em gatos: ter exame positivo para o vírus FeLV ("leucemia viral felina") NÃO significa automaticamente que o gato tenha câncer (leucemia neoplásica), e nem todo gato com leucemia tem FeLV.',
    keyPoints: [
      'Leucemia não significa sempre glóbulos brancos altos: formas agudas podem cursar com leucócitos normais ou baixos (leucemia aleucêmica) e anemia, falta de plaquetas ou queda de defesas.',
      'Olhar as células no microscópio geralmente não basta para saber o tipo exato: exames especializados (como citometria de fluxo e exame de medula óssea) definem a linhagem correta.',
      'Leucemia linfocítica crônica estável e sem sintomas muitas vezes é acompanhada apenas com exames periódicos (vigilância ativa), sem iniciar quimioterapia imediatamente.',
      'Leucemias agudas têm evolução rápida e prognóstico reservado; transfusões, controle de infecções e conforto são tão importantes quanto discutir quimioterapia.',
      'Nunca iniciar corticoide (como prednisolona) antes de colher os exames diagnósticos quando o paciente estiver estável, pois ele pode mascarar as células do câncer.',
    ],
    warningSigns:
      'Gengivas muito pálidas, cansaço extremo, manchas roxas ou pontinhos vermelhos na pele/gengivas, sangramento nasal ou na urina, febre, prostração súbita ou dificuldade respiratória exigem atendimento veterinário imediato.',
    diagnosis:
      'Começa pelo hemograma com revisão manual do esfregaço e avança para citometria de fluxo, aspirado/biópsia de medula óssea, exames de imagem e testes de FeLV/FIV em gatos.',
    homeCare:
      'Manter controle rigoroso de sinais clínicos, comparecer aos hemogramas seriados, usar luvas ao manipular quimioterápicos orais e excretas (urina/fezes) e evitar ambientes com grande circulação de outros animais durante períodos de baixa imunidade.',
  },

  quickSummary:
    'A leucemia é uma neoplasia hematopoética clonal originada geralmente na medula óssea, podendo infiltrar sangue periférico, baço, fígado, linfonodos e outros tecidos — sem exigir obrigatoriamente leucocitose (formas agudas podem cursar com leucopenia ou pancitopenia).\n\n' +
    '- Distinção inegociável em felinos: leucemia neoplásica (proliferação clonal maligna) NÃO é sinônimo de infecção pelo FeLV (retrovírus). O FeLV predispõe a neoplasias e mielodisplasia, mas nem todo gato FeLV+ desenvolve leucemia, nem todo gato leucêmico é FeLV+, e positividade viral isolada não indica eutanásia (AAFP, 2020).\n' +
    '- Biologia define a conduta: leucemias agudas (LLA, LMA, AUL) expandem blastos imaturos com falência medular rápida e prognóstico muito reservado (sobrevida mediana de 19 dias na LMA em Davis et al., 2018; 55 dias nos tratados em Bennett et al., 2017); leucemias crônicas (especialmente LLC-T canina, mediana 930 dias em Comazzi et al., 2011; LLC felina, 14,4 meses em Campbell et al., 2013) podem permanecer indolentes por anos.\n' +
    '- Diagnóstico integrado obrigatório: a morfologia isolada não define linhagem, CD34 marca imaturidade (não linhagem, e falta em até 25% das leucemias agudas), PARR positivo ocorre em >60% das LMA caninas (Stokol et al., 2017), ALP citoquímica (Aalto et al., 2026) e citograma LUC/MPO automatizado (Miller et al., 2026) não diferenciam LMA de LLA — a citometria de fluxo (incluindo CD80 auxiliar; Stokol et al., 2024) somada à citoquímica e à medula óssea é indispensável.\n' +
    '- Tratamento individualizado: vigilância ativa na LLC assintomática; clorambucila (± corticoide) na LLC sintomática; hidroxiureia em neoplasias mieloproliferativas selecionadas; quimioterapia combinada ou suporte/paliação nas agudas, priorizando manejo emergencial de anemia sintomática, hemorragias e neutropenia febril (AAHA, 2026).',

  quickDecisionStrip: [
    'Leucocitose não é obrigatória: leucemia aguda pode se apresentar com leucopenia ou pancitopenia (leucemia aleucêmica).',
    'Leucemia neoplásica ≠ infecção pelo FeLV: classificar o status retroviral e o diagnóstico hematopatológico separadamente.',
    'Não definir linhagem só pela morfologia, PARR (>60% das LMA caninas têm rearranjos clonais) ou ALP (Aalto et al., 2026).',
    'Evitar iniciar prednisolona antes da coleta de citometria/medula em paciente estável para não destruir células linfoides.',
    'LLC indolente assintomática não exige quimioterapia automática — tratar por sinais clínicos/citopenias, não só por linfocitose.',
    'Separar MDS (<20% blastos; mediana 384 dias em cães) de LMA (≥20% blastos; mediana 6–19 dias) — não agrupar sob o mesmo prognóstico.',
  ],

  quickSummaryRich: {
    lead:
      'As leucemias em cães e gatos abrangem desde linfocitoses crônicas indolentes compatíveis com anos de sobrevida até proliferações blásticas fulminantes com falência medular aguda. A classificação por linhagem, grau de maturação e comportamento biológico muda radicalmente o prognóstico e a terapêutica.',
    leadHighlights: [
      'Leucemia neoplásica não é sinônimo de FeLV',
      'Leucocitose não é obrigatória',
      'Morfologia, PARR e ALP isolados não definem linhagem',
      'Separar MDS de LMA e LLC indolente de leucemia aguda',
    ],
    pillars: [
      {
        title: 'Três Eixos de Classificação',
        body: 'Responder sempre: (1) linhagem celular (linfoide, granulocítica, monocítica, eritroide, megacariocítica ou rara), (2) grau de maturação (blástica ≥20% vs. madura) e (3) comportamento clínico (agudo, crônico ou transformação).',
        highlights: ['linhagem celular', 'grau de maturação', 'comportamento clínico'],
      },
      {
        title: 'Diagnóstico Hematopatológico Integrado',
        body: 'Hemograma com contagens absolutas e revisão de esfregaço + citometria de fluxo (CD45, CD34, CD3, CD21, CD79a, CD14, CD41/61, CD80) + citoquímica (MPO, CAE, ANBE) + aspirado e biópsia de medula óssea.',
        highlights: ['citometria de fluxo', 'aspirado e biópsia de medula óssea'],
      },
      {
        title: 'Conduta Guiada pela Biologia',
        body: 'LLC assintomática → vigilância ativa; LLC progressiva → clorambucila ± corticoide; LMC → hidroxiureia (imatinibe só com alvo BCR::ABL1 demonstrado); LLA/LMA → suporte intensivo + quimioterapia/paliação.',
        highlights: ['vigilância ativa', 'clorambucila', 'hidroxiureia', 'suporte intensivo'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico em 6 Passos',
      steps: [
        {
          label: '1. Triagem hematológica e revisão manual',
          detail:
            'Interpretar contagens absolutas (nunca só porcentagens), revisar esfregaço manual para blastos, displasia e agregados plaquetários felinos, e avaliar sinais de anemia, sangramento e infecção.',
        },
        {
          label: '2. Identificar o padrão predominante',
          detail:
            'Separar cinco cenários: blastos circulantes, linfocitose madura persistente, neutrofilia/monocitose extrema (excluir reação leucemoide), citopenias inexplicadas ou células atípicas raras (plasmócitos, basófilos, mastócitos).',
        },
        {
          label: '3. Imunofenotipagem por citometria de fluxo',
          detail:
            'Colher sangue periférico ou aspirado medular fresco ANTES de corticoides quando estável. Painel amplo (CD45, CD34, CD3, CD4, CD8, CD21, CD79a, CD14, CD11b/c, CD41/61 e CD80 auxiliar para LMA).',
          limitations: 'Até 25% das leucemias agudas caninas são CD34− e 20–25% podem ficar como AUL em painéis restritos.',
        },
        {
          label: '4. Medula óssea (aspirado + core biopsy) e citoquímica',
          detail:
            'Quantificar blastos (limiar contemporâneo ~20% vs. histórico 30%, registrando o denominador), celularidade, fibrose (em dry tap) e citoquímica (MPO, CAE, ANBE — não confiar isoladamente na ALP nem no citograma LUC do ADVIA).',
        },
        {
          label: '5. PARR, FeLV/FIV e diferenciação de linfoma',
          detail:
            'Usar PARR para clonabilidade linfoide (nunca para diferenciar LMA de LLA — >60% das LMA caninas têm rearranjos clonais; Stokol et al., 2017). Em gatos, testar p27 + PCR proviral (AAFP, 2020). Distinguir LLC-T de linfoma de zona T (perda de CD45).',
        },
        {
          label: '6. Estadiamento clínico e suporte orgânico',
          detail:
            'Bioquímica completa, cálcio, fósforo, potássio, eletrólitos, urinálise, hemostasia (se sangramento/suspeita de CID) e imagem (ultrassonografia abdominal, radiografia torácica; TC/RM se sinais neurológicos).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Decisão Terapêutica Estratificada por Fenótipo',
      steps: [
        {
          label: 'Estabilização imediata de complicações vitais',
          detail:
            'Antes ou em paralelo à oncologia: concentrado de hemácias (6–10 mL/kg ajustado à clínica/perfusão; tipagem AB obrigatória em gatos), culturas + antibiótico IV de amplo espectro na neutropenia febril, hemostasia e monitorização de síndrome de lise tumoral.',
        },
        {
          label: 'LLC assintomática estável',
          detail:
            'Vigilância ativa com exame físico e hemograma mensais/bimestrais iniciais. Não existe ponto de corte universal de linfócitos isolado que obrigue iniciar citotóxicos em paciente clinicamente estável.',
        },
        {
          label: 'LLC sintomática / progressiva',
          detail:
            'Clorambucila ± glicocorticoide: cães 3–6 mg/m² VO q24h (ou 0,2 mg/kg q24h × 7–14 d reduzindo para 0,1 mg/kg ou 3 mg/m² q24h / 2 mg/m² q48h) ± prednisona ~1 mg/kg q24h; gatos 0,2 mg/kg ou 2 mg/gato VO q48h (ou 20 mg/m² q14d) + prednisolona ~1 mg/kg q24h.',
          reassess: 'Hemograma q1–2 semanas no início (nadir medular pode ser tardio, 1–6 semanas).',
        },
        {
          label: 'LMC e neoplasias mieloproliferativas',
          detail:
            'Após excluir reação leucemoide, considerar citoredução com hidroxiureia (cães 30–60 mg/kg VO q24h por 1–2 sem, reduzindo para q48h; gatos ~30 mg/kg q24h ou 10–15 mg/kg q12h, depois q48h). Imatinibe apenas se BCR::ABL1 demonstrado.',
          reassess: 'Hemograma q1–2 sem até estabilidade, função renal q3–4m e vigilância de metemoglobinemia.',
        },
        {
          label: 'LLA e LMA (agudas) / Formas raras',
          detail:
            'LLA: protocolos combinados (vincristina, ciclofosfamida, doxorrubicina, L-asparaginase, corticoide — testar ABCB1-1Δ em raças predispostas) ou paliação. LMA: discutir prognóstico muito reservado (mediana 6–19 d), suporte hemoterápico e protocolos especializados com citarabina (sem padrão-ouro validado).',
        },
      ],
    },
  },

  etiology: {
    leucDefinicaoEDistincaoFeLV:
      'Conceito biológico e separação obrigatória frente ao retrovírus felino:\n' +
      '- Definição hematopatológica: neoplasia hematopoética clonal caracterizada pela proliferação autônoma de células pertencentes a uma ou mais linhagens sanguíneas, usualmente originada na medula óssea (ocasionalmente no baço), podendo infiltrar sangue periférico, baço, fígado, linfonodos e outros tecidos.\n' +
      '- Aguda versus crônica: nas leucemias agudas predomina um clone imaturo de blastos com bloqueio de diferenciação e evolução rápida; nas crônicas predominam células relativamente maduras com curso indolente de meses a anos.\n' +
      '- Leucemia não exige leucocitose: formas agudas frequentemente cursam com leucócitos normais, leucopenia ou pancitopenia, podendo até inexistir blastos detectáveis no sangue periférico (leucemia aleucêmica).\n' +
      '- Leucemia neoplásica NÃO é sinônimo de FeLV: em gatos, o termo popular "leucemia felina" confunde a infecção pelo vírus da leucemia felina (FeLV) com a neoplasia clonal. Embora o FeLV predisponha a leucemias e síndromes mielodisplásicas, nem todo gato FeLV-positivo desenvolve câncer hematopoético, nem todo gato com leucemia é FeLV-positivo (vide casos contemporâneos em gatos FeLV-negativos como Sato et al., 2026), e a positividade viral isolada nunca constitui indicação de eutanásia (AAFP, 2020). Em cães não existe equivalente retroviral comprovado como causa habitual.',

    leucTabelaNeoplasiaVsFelv: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Diferenciação Conceitual: Leucemia Neoplásica versus Infecção pelo Vírus da Leucemia Felina (FeLV)',
      headers: ['Característica', 'Leucemia Neoplásica', 'Infecção pelo FeLV'],
      rows: [
        ['Natureza', 'Neoplasia hematopoética clonal maligna', 'Infecção por gammaretrovírus'],
        ['Agente / Mecanismo', 'Transformação genética/epigenética de um clone celular', 'Vírus da leucemia felina (integração proviral)'],
        ['Espécies acometidas', 'Cães e gatos', 'Exclusivamente felinos'],
        ['Característica central', 'Proliferação autônoma de células hematopoéticas neoplásicas', 'Infecção viral com desfechos abortivo, regressivo ou progressivo'],
        ['Hemograma', 'Variável conforme linhagem e agressividade (citopenias a hiperleucocitose)', 'Pode ser normal ou apresentar citopenias, displasia e alterações secundárias'],
        ['Relação mútua', 'Pode ocorrer totalmente independente do FeLV', 'Predispõe a neoplasias hematopoéticas, mas não equivale a diagnóstico de câncer'],
      ],
    },

    leucClassificacaoGeralELimiares:
      'Arquitetura classificatória: critérios FAB históricos versus hematopatologia contemporânea:\n' +
      '- Os três pilares da classificação: (1) linhagem celular (linfoide, granulocítica, monocítica, eritroide, megacariocítica ou rara), (2) grau de maturação (blástica vs. diferenciada) e (3) comportamento clínico (agudo, crônico ou transformação).\n' +
      '- Limiar morfológico de blastos (20% vs. 30%): classificações veterinárias históricas baseadas no sistema FAB utilizavam 30% de blastos na medula ou sangue para definir LMA; propostas hematopatológicas contemporâneas adotam aproximadamente 20% (sem misturar sistemas na mesma base clínica, registrando sempre o denominador usado — células nucleadas totais vs. não eritroides nas formas eritroides).\n' +
      '- Limitação dos subtipos morfológicos FAB: as divisões M0–M7 (LMA) e L1–L3 (LLA) permanecem didáticas para morfologia, mas não equivalem à classificação molecular humana moderna nem dispensam imunofenotipagem.\n' +
      '- Fronteira leucemia versus linfoma: em determinadas neoplasias linfoides com comprometimento sanguíneo/medular, a separação entre leucemia primária e linfoma estágio V pode ser arbitrária (o ponto de corte humano de 25% de blastos medulares não foi universalmente validado em cães e gatos), justificando a terminologia integrada "neoplasia linfoblástica com comprometimento medular/sanguíneo" quando a origem primária for incerta.',

    leucTabelaVisaoGeralSubtipos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Visão Geral Taxonômica das Principais Leucemias em Cães e Gatos',
      headers: ['Tipo de Leucemia', 'Sigla', 'Linhagem Celular', 'Comportamento Biológico Predominante'],
      rows: [
        ['Leucemia linfoblástica aguda', 'LLA / ALL', 'Linfoide imatura (precursores B ou T)', 'Muito agressivo; falência medular rápida'],
        ['Leucemia mieloide aguda', 'LMA / AML', 'Mieloide imatura (M0–M7)', 'Muito agressivo; prognóstico muito reservado'],
        ['Leucemia aguda indiferenciada', 'AUL', 'Linhagem não identificada', 'Agressivo; exige descartar painel incompleto'],
        ['Leucemia linfocítica crônica', 'LLC / CLL', 'Linfócitos maduros (T ou B)', 'Frequentemente indolente (sobrevida prolongada)'],
        ['Leucemia mieloide crônica', 'LMC / CML', 'Granulocítica relativamente madura', 'Crônico, com risco de crise blástica'],
        ['Leucemia mielomonocítica crônica', 'LMMC / CMML', 'Granulócitos e monócitos', 'Variável; excluir causas inflamatórias/infecciosas'],
        ['Leucemia monocítica crônica', 'CMoL', 'Monocítica diferenciada', 'Rara; variável'],
        ['Leucemia de grandes linfócitos granulares', 'LGL', 'T citotóxica ou NK (grânulos azurófilos)', 'Indolente (LLC-LGL) ou muito agressiva (linfoma LGL)'],
        ['Eritroleucemia', 'AML-M6', 'Eritroide (± componente mieloide)', 'Geralmente agressivo; relevância histórica em gatos FeLV+'],
        ['Leucemia megacarioblástica aguda', 'AML-M7', 'Megacariocítica imatura (CD41+/CD61+)', 'Geralmente agressivo; trombocitopenia severa'],
        ['Leucemia eosinofílica crônica', 'CEL', 'Eosinofílica clonal', 'Rara; diferenciar de síndrome hipereosinofílica'],
        ['Leucemia basofílica', 'CBL', 'Basofílica', 'Excepcional; diferenciar morfologicamente de mastócitos'],
        ['Leucemia plasmocitária', 'PCL', 'Plasmócitos circulantes', 'Agressiva; ligada a hiperviscosidade/gamopatia'],
        ['Leucemia mastocitária', 'MCL', 'Mastócitos neoplásicos', 'Excepcional; diferenciar de mastocitose visceral/esplênica'],
      ],
    },

    leucAgudaLinfoblasticaLLA:
      'Leucemia linfoblástica aguda (LLA / ALL — B-ALL, T-ALL e linhagem indefinida):\n' +
      '- Biologia e apresentação: expansão clonal agressiva de linfoblastos que ocupam rapidamente a medula óssea, produzindo simultaneamente anemia não regenerativa, trombocitopenia, neutropenia e frequentemente blastemia circulante funcionalmente incompetente.\n' +
      '- Cães: evolução rápida com letargia, hiporexia, perda de peso, palidez, febre variável, hepatoesplenomegalia e eventuais sinais hemorrágicos ou neurológicos; linfadenomegalia periférica discreta ocorre em mais da metade dos cães (em geral menos exuberante que no linfoma multicêntrico, sem ser critério absoluto). T-ALL pode desencadear hipercalcemia paraneoplásica com poliúria/polidipsia. Não há predomínio consistente entre B-ALL e T-ALL caninas.\n' +
      '- Gatos: citopenias, blastos circulantes (ou leucopenia, presente em 2/6 gatos em Tomiyasu et al., 2018), sinais constitucionais e hepatoesplenomegalia; historicamente ligada ao FeLV, porém séries contemporâneas incluem casos B-ALL, T-ALL e fenótipos mistos em animais FeLV-negativos.\n' +
      '- Subtipos morfológicos FAB históricos (L1 blastos pequenos/homogêneos, L2 maiores/irregulares com nucléolos evidentes, L3 citoplasma basofílico vacuolizado tipo Burkitt): possuem baixa reprodutibilidade e valor prognóstico limitado — a imunofenotipagem é superior.',

    leucAgudaMieloideLMA:
      'Leucemia mieloide aguda (LMA / AML — subtipos M0 a M7) e leucemia aguda indiferenciada (AUL):\n' +
      '- AML-M0 (minimamente diferenciada): blastos sem características morfológicas/citoquímicas granulocíticas óbvias; atenção à armadilha de assumir linhagem mieloide apenas por CD34+ sem marcadores linfoides (CD34 marca imaturidade, não linhagem, e até 25% das leucemias agudas caninas são CD34−).\n' +
      '- AML-M1 (mieloblástica sem maturação) e AML-M2 (com maturação): expansão de mieloblastos grandes com cromatina fina e nucléolos; na M2 há diferenciação granulocítica desregulada (não confundir mielócitos/metamielócitos reativos sem prova neoplásica).\n' +
      '- AML-M3 (promielocítica aguda): a entidade humana definida pela fusão PML::RARA com coagulopatia grave NÃO está estabelecida como equivalente veterinário — proibido extrapolar automaticamente ATRA ou trióxido de arsênio para cães e gatos.\n' +
      '- AML-M4 (mielomonocítica) e AML-M5 (monoblástica M5a / monocítica M5b): representam parcela expressiva das LMA caninas; monoblastos mimetizam linfoblastos ao esfregaço e demandam esterases inespecíficas (ANBE) e marcadores monocíticos (CD14).\n' +
      '- AML-M6 (eritroleucemia): proliferação anormal de precursores eritroides com anemia grave pouco regenerativa, macrocitose, assincronia núcleo-citoplasmática e eritroblastose periférica (atenção: eritroblastos circulantes ocorrem também em hipóxia, hemólise, hemorragia e doença esplênica); relevância histórica particular em gatos FeLV+.\n' +
      '- AML-M7 (megacarioblástica aguda): precursores megacariocíticos anormais (CD41+/CD61+), micromegacariócitos, plaquetas gigantes e trombocitopenia severa mesmo com abundância de células megacariocíticas anômalas na medula.\n' +
      '- AUL e fenótipo ambíguo (MPAL): cerca de 20–25% das leucemias agudas permanecem sem linhagem definida em painéis comerciais limitados; distinguir verdadeira indiferenciação de limitação técnica do painel disponível. A categoria humana MPAL ainda carece de validação veterinária plena.',

    leucCronicasLLCeLGL:
      'Leucemia linfocítica crônica (LLC / CLL) e leucemia de grandes linfócitos granulares (LGL):\n' +
      '- LLC canina: predomina em adultos e idosos; frequentemente diagnosticada como achado incidental (linfocitose madura persistente, habitualmente >30.000/µL, podendo ultrapassar 100.000/µL mantendo estabilidade clínica por acúmulo de células longevas de baixa taxa proliferativa). Em cães destaca-se o fenótipo T-CLL (frequentemente CD3+/CD8+, sobrevida mediana de 930 dias em Comazzi et al., 2011), seguido de B-CLL (mediana 480 dias; em compilação de ~500 cães B-CLL: 50% linfadenomegalia, 50% esplenomegalia, 30% hepatomegalia, 80% hiperglobulinemia, 68% gamopatia monoclonal IgM/IgA em séries menores, 13% hipercalcemia, neutropenia rara 1% e trombocitopenia 7%, além de possíveis IMHA e aplasia eritroide paraneoplásicas) e LLC atípica (mediana 22 dias em coorte pequena).\n' +
      '- LLC felina: incomum, predomina em gatos idosos (mediana 12,5 anos; perda de peso crônica frequente) com predomínio característico do fenótipo T-helper CD4+ (contrastando com T/CD8+ canino). Em Campbell et al. (2013; n = 18), 88% responderam ao tratamento e a sobrevida mediana foi de 14,4 meses — refutando a crença de prognóstico invariavelmente sombrio.\n' +
      '- Leucemia LGL: grandes linfócitos com grânulos citoplasmáticos azurófilos (T citotóxicas ou NK). A presença de grânulos NÃO define agressividade sozinha: a LLC-LGL crônica costuma ser indolente, ao passo que o linfoma LGL agressivo com fase leucêmica tem sobrevida mediana de apenas 28 dias sob quimioterapia intensiva (n = 65 cães) — jamais misturar o prognóstico dessas duas entidades.',

    leucMieloideCronicaEFormasRaras:
      'Leucemia mieloide crônica (LMC), mielomonocítica/monocítica crônica e leucemias raras:\n' +
      '- LMC (CML): neoplasia mieloproliferativa com expansão granulocítica relativamente madura e medula hipercelular, podendo evoluir para "crise blástica" aguda. Em cães foi descrita translocação análoga ao cromossomo Filadélfia envolvendo os cromossomos caninos 9 e 26 (fusão BCR::ABL1, historicamente chamada "cromossomo de Raleigh"), inclusive na CMoL — porém sua prevalência não é universal e não autoriza prescrever imatinibe sem demonstrar o alvo molecular.\n' +
      '- LMMC (CMML) e leucemia monocítica crônica (CMoL): monocitose persistente com ou sem componente granulocítico, esplenomegalia e citopenias; exigem exclusão rigorosa de doenças infecciosas/inflamatórias crônicas regionais.\n' +
      '- Leucemia eosinofílica crônica (CEL) e basofílica (CBL): raríssimas; na CEL é obrigatório excluir parasitoses, alergopatias, gastroenteropatias felinas e síndrome hipereosinofílica; na CBL a morfologia distingue basófilos (núcleo segmentado em fita e grânulos variados) de mastócitos (núcleo redondo/oval obscurecido por grânulos metacromáticos), embora atipias exijam citoquímica/imunofenotipagem (há relato felino de AML-M5a concomitante à proliferação basofílica crônica e relato de LMA com diferenciação basofílica em gata FeLV-negativa em Sato et al., 2026).\n' +
      '- Leucemia plasmocitária (PCL) e mastocitária (MCL): a PCL envolve plasmócitos neoplásicos circulantes associados a gamopatia monoclonal, hiperviscosidade, trombopatia por revestimento plaquetário de proteínas M e lesão tubular renal por cadeias leves (Bence Jones); na MCL, mastocitemia periférica exige diferenciar neoplasia primária de mastocitose visceral/esplênica (especialmente em gatos) ou infiltração medular de mastocitoma.',

    leucDoencasMedularesRelacionadasMDS:
      'Doenças medulares e neoplasias mieloproliferativas relacionadas (NÃO são sinônimos de leucemia):\n' +
      '- Síndrome mielodisplásica (MDS): hematopoiese ineficaz clonal — medula normo ou hipercelular associada a citopenias periféricas e displasia (>10%) em uma a três linhagens (diseritropoiese com assincronia/megaloblastose, disgranulopoiese com hipogranulação/pseudo-Pelger-Huët, dismegacariopoiese com micromegacariócitos). Em gatos associa-se frequentemente ao FeLV (macrocitose, anemia não regenerativa e citopenias); nem toda MDS evolui para LMA. Em Meredith et al. (2025; coorte exclusivamente de 70 cães — não extrapolar numericamente para gatos), a sobrevida mediana foi de 384 dias na MDS contra apenas 6 dias na LMA.\n' +
      '- Mielofibrose: deposição de reticulina/colágeno na medula (primária ou reativa a MDS/leucemia); gera aspirado seco (dry tap) e exige biópsia medular com coloração para fibras reticulínicas.\n' +
      '- Policitemia vera (PV): eritrocitose absoluta primária clonal (distinguir de desidratação/eritrocitose relativa e causas secundárias); eleva viscosidade sanguínea gerando sinais neurológicos, oculares e trombose, manejada com flebotomia terapêutica e hidroxiureia.\n' +
      '- Trombocitemia essencial (ET): proliferação megacariocítica clonal com trombocitose persistente >600.000/µL sem blastos circulantes após excluir causas secundárias (ferropenia, inflamação crônica, rebote pós-hemorragia/ITP, esplenectomia); plaquetas disfuncionais podem causar tanto trombose quanto hemorragia.',

    leucTabelaAplasiaMdsLeucemias: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diferenciação Central: Aplasia Medular, Síndrome Mielodisplásica (MDS) e Leucemias',
      headers: ['Condição', 'Medula Óssea', 'Sangue Periférico', 'Mecanismo Fisiopatológico Central'],
      rows: [
        ['Aplasia medular', 'Hipocelular, substituída por tecido adiposo', 'Citopenias profundas não regenerativas', 'Perda ou supressão severa de células-tronco/progenitores'],
        ['Síndrome mielodisplásica (MDS)', 'Normo ou hipercelular com displasia (<20% blastos)', 'Citopenias e alterações morfológicas displásicas', 'Hematopoiese ineficaz clonal com apoptose intramedular'],
        ['Leucemia mieloide aguda (LMA)', 'Hipercelular com ≥20% blastos mieloides', 'Blastos variáveis (ou ausentes) + citopenias', 'Proliferação clonal mieloide imatura com bloqueio de maturação'],
        ['Leucemia linfoblástica aguda (LLA)', 'Infiltrada por linfoblastos imaturos', 'Linfoblastos variáveis (ou leucopenia) + citopenias', 'Proliferação clonal linfoide imatura com mieloftise rápida'],
        ['Leucemia mieloide crônica (LMC)', 'Hipercelular com expansão granulocítica madura', 'Leucocitose granulocítica extrema persistente', 'Proliferação mieloide crônica relativamente diferenciada'],
      ],
    },
  },

  epidemiology: {
    leucIncidenciaEDistribuicaoEtaria:
      'Frequência relativa, viés de centros de referência e perfil etário comparado:\n' +
      '- Incidência geral: as leucemias são menos comuns que os linfomas em cães e gatos, correspondendo a menos de 10% das neoplasias hemolinfáticas em séries clássicas de referência (esses números refletem populações encaminhadas a hospitais universitários e não devem ser tratados como incidência populacional brasileira).\n' +
      '- Proporção nas leucemias agudas caninas: entre os casos cuja linhagem é definida por imunofenotipagem/citoquímica, cerca de 50–55% correspondem a LLA e 45–50% a LMA.\n' +
      '- Raça e sexo: não existe predisposição racial ou sexual universal para todas as leucemias; associações pontuais por subtipo não devem ser assumidas automaticamente como predisposição genética causal.',

    leucTabelaIdadeEspecies: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Distribuição Etária e Epidemiológica por Espécie e Subtipo Hematopoético',
      headers: ['Entidade', 'Perfil em Cães', 'Perfil em Gatos'],
      rows: [
        ['LLA (ALL)', 'Adultos e animais mais jovens', 'Historicamente descrita em jovens FeLV+; ocorre também em adultos FeLV−'],
        ['LMA (AML)', 'Geralmente adultos, podendo ocorrer em jovens', 'Ligação histórica com FeLV; documentada também em gatos FeLV-negativos'],
        ['LLC (CLL)', 'Predomina em adultos de meia-idade e idosos', 'Rara; acomete principalmente gatos idosos (mediana 12,5 anos)'],
        ['LMC (CML)', 'Rara, geralmente em adultos', 'Muito rara e escassamente caracterizada'],
        ['MDS (relacionada)', 'Relativamente incomum (adultos/idosos)', 'Diferencial central de citopenias crônicas, sobretudo em FeLV+'],
      ],
    },

    leucEtiologiaMolecularEFatoresExternos:
      'Genômica contemporânea e agentes ambientais:\n' +
      '- Mutações somáticas em cães: alterações na via de sinalização RTK–RAS (genes NRAS, KRAS, FLT3 e KIT) são descritas em neoplasias mieloides e agudas caninas. Em pesquisa genômica de 2025, variantes somáticas foram identificadas em 31 de 33 amostras de leucemia aguda canina, com alterações na via RTK–RAS em ~71% dos casos — achado exploratório promissor, ainda sem painel validado para escolha terapêutica de rotina.\n' +
      '- Fatores ambientais: radiação ionizante, solventes/químicos específicos e agentes citotóxicos são leucemogênicos reconhecidos em modelos biológicos e medicina humana, porém a vasta maioria dos casos espontâneos em cães e gatos não possui agente ambiental comprovável. Não há base científica para culpar vacinação de rotina, dietas comerciais ou antiparasitários habituais.',
  },

  pathogenesisTransmission: {
    leucNichoMedularEHematopoiese:
      'Anatomia funcional da medula óssea e diferenciação das linhagens:\n' +
      '- Nicho hematopoético: em cães e gatos adultos, a hematopoiese ativa concentra-se no esqueleto axial (vértebras, costelas, esterno, pelve) e epífises proximais de ossos longos. O microambiente compreende células estromais, endoteliais, osteoblastos, macrófagos, matriz extracelular, sinusoides e citocinas reguladoras que governam (1) autorrenovação de células-tronco, (2) proliferação/diferenciação de progenitores e (3) liberação de células maduras para o sangue.\n' +
      '- Hierarquia didática das linhagens (sistemas plásticos regulados por redes de transcrição):\n' +
      '  • Célula-tronco hematopoética (autorrenovação) → Progenitor Linfoide [Linfócito B → Plasmócito | Linfócito T | Célula NK] e Progenitor Mieloide [Eritroblasto → Eritrócito | Megacarioblasto → Megacariócito → Plaquetas | Mieloblasto → Neutrófilo, Eosinófilo e Basófilo | Monoblasto → Monócito → Macrófago].\n' +
      '- Origem da diversidade tumoral: o fenótipo final da leucemia depende exatamente de qual ponto dessa árvore sofre transformação clonal — precursores linfoides geram LLA, linfócitos maduros geram LLC, mieloblastos/monoblastos geram LMA e granulócitos maduros geram LMC.',

    leucLeucemogeneseEFeLV:
      'Leucemogênese multietápica e integração retroviral (FeLV em felinos):\n' +
      '- Transformação multietápica: o clone adquire mutações que conferem vantagem proliferativa e resistência à apoptose, somadas (nas formas agudas) ao bloqueio da diferenciação terminal.\n' +
      '- Mecanismo oncogênico do FeLV: após transcrição reversa, o DNA proviral integra-se ao genoma do hospedeiro, podendo ativar proto-oncogenes ou desregular genes de diferenciação/sobrevivência celular, além de induzir imunossupressão e agressão direta ao estroma medular.\n' +
      '- Trajetórias da infecção pelo FeLV (AAFP, 2020): (1) Abortiva (eliminação antes de provírus detectável), (2) Regressiva (provírus integrado persistente sem antigenemia p27 contínua detectável em determinados momentos) e (3) Progressiva (replicação viral persistente com antigenemia e eliminação viral). Um único teste p27 negativo não exclui infecção regressiva prévia — integrar p27, PCR proviral e repetição conforme o contexto clínico.\n' +
      '- Transmissão: a leucemia neoplásica em si NÃO é contagiosa entre animais; a transmissibilidade restringe-se exclusivamente ao retrovírus FeLV entre felinos (saliva, secreções, contato próximo).',
  },

  pathophysiology: {
    leucMieloftiseEFalenciaMedular:
      'Da expansão clonal à falência medular (mieloftise) e ao paradoxo leucocitário:\n' +
      '- Paradoxo imunológico das leucemias agudas: um paciente pode apresentar >100.000 leucócitos/µL e continuar profundamente suscetível à sepse bacteriana, porque os blastos circulantes carecem de capacidade fagocítica e imune funcional.\n' +
      '- Cadeia fisiopatológica da mieloftise: a ocupação do nicho medular pelo clone neoplásico e a liberação de mediadores inibitórios reduzem simultaneamente eritropoiese (anemia não regenerativa → hipóxia tecidual), granulopoiese (neutropenia → infecção e sepse sem exsudato purulento exuberante) e megacariopoiese (trombocitopenia → hemorragias mucocutâneas e viscerais). Destruição periférica, sequestro esplênico, consumo hemostático e inflamação frequentemente coexistem.\n' +
      '- Velocidade de instalação (aguda vs. crônica): na LLC, a sobrevida prolongada de linfócitos maduros de baixa taxa mitótica permite acúmulo progressivo de dezenas ou centenas de milhares de células/µL por meses ou anos antes que ocorra supressão medular significativa.',

    leucHipoxiaHemostasiaEComplicacoesMetabolicas:
      'Oferta de oxigênio, hemostasia, hiperviscosidade, leucostase e síndrome de lise tumoral:\n' +
      '- Oferta tecidual de oxigênio (DO₂ = DC × CaO₂): como o conteúdo arterial de oxigênio (CaO₂) depende principalmente da hemoglobina, anemia grave compromete severamente a oxigenação tecidual mesmo com SpO₂ de 98%, deflagrando taquicardia compensatória para sustentar o débito cardíaco (DC).\n' +
      '- Hemostasia e paraproteínas: além da queda plaquetária quantitativa, nas neoplasias plasmocitárias e em B-CLL com gamopatia monoclonal as imunoglobulinas (proteínas M) revestem plaquetas inibindo agregação e liberação do fator plaquetário 3, enquanto cadeias leves livres (proteínas de Bence Jones) causam cilindros tubulares e nefrite intersticial.\n' +
      '- Hiperviscosidade versus leucostase: a síndrome de hiperviscosidade sérica por paraproteínas reduz o fluxo microvascular (alterações retinianas, neurológicas e hemorrágicas; responde agudamente à plasmaférese). Já a leucostase decorre do impacto microcirculatório de carga extrema de blastos pouco deformáveis/aderentes — não existem pontos de corte numéricos humanos de leucócitos validados para diagnosticar leucostase em cães e gatos; dispneia ou déficit neurológico em hiperleucocitose extrema exige excluir também anemia, hemorragia e infecção.\n' +
      '- Infiltração orgânica silenciosa: esplenomegalia e hepatomegalia ocorrem por acúmulo clonal e hematopoiese extramedular; ALT e FA normais NÃO excluem infiltração hepática leucêmica.\n' +
      '- Síndrome de lise tumoral (SLT): destruição celular maciça pós-quimioterapia libera potássio, fósforo (gerando hipocalcemia secundária) e ácidos nucleicos. Como o metabolismo de purinas/ácido úrico de cães e gatos difere do humano (uricase hepática converte urato em alantoína na maioria dos cães/gatos), não se deve transpor cegamente metas humanas de ácido úrico — priorizar monitorização seriada de K⁺, fósforo, cálcio, função renal, ECG e débito urinário.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Palidez de mucosas, intolerância ao exercício e sopro sistólico funcional de fluxo',
          mechanism: 'Redução da eritropoiese medular por mieloftise (agravada por inflamação ou perda sanguínea) diminui CaO₂ e a viscosidade sanguínea, induzindo fluxo turbulento e hipóxia tecidual mesmo com SpO₂ normal.',
          clinicalMeaning: 'Presente em ~68% dos cães com leucemia aguda (Bennett et al., 2017); avaliar taquicardia e lactato para indicação transfusional.',
          priority: 'common',
          context: ['Anemia não regenerativa', 'Critério transfusional'],
        },
        {
          finding: 'Petéquias, equimoses, epistaxe, sangramento gengival ou hematúria',
          mechanism: 'Deficiência de produção megacariocítica (trombocitopenia em até 86% das leucemias agudas caninas), podendo somar-se à trombopatia por proteínas M ou CID.',
          clinicalMeaning: 'Sinal de falha na hemostasia primária; risco de hemorragia gastrointestinal, pulmonar ou intracraniana fatal.',
          priority: 'emergency',
          context: ['Hemostasia primária', 'Risco hemorrágico'],
        },
      ],
    },
    {
      system: 'immunologic',
      findings: [
        {
          finding: 'Febre, hipotermia, infecções oportunistas recorrentes ou sepse sem exsudato purulento',
          mechanism: 'Neutropenia severa e/ou incompetência funcional de blastos circulantes (mesmo sob leucocitose extrema) anulam a contenção inicial de bactérias e fungos em mucosas e tecidos.',
          clinicalMeaning: 'Ausência de neutrofilia ou de pus NÃO exclui sepse; neutropenia febril constitui emergência oncológica imediata.',
          priority: 'emergency',
          context: ['Neutropenia febril', 'Sepse'],
        },
      ],
    },
    {
      system: 'lymphatic',
      findings: [
        {
          finding: 'Esplenomegalia, hepatomegalia e linfadenomegalia (variável)',
          mechanism: 'Infiltração difusa da polpa vermelha esplênica, sinusoides hepáticos e linfonodos pelo clone leucêmico associada à hematopoiese extramedular.',
          clinicalMeaning: 'Linfadenomegalia costuma ser discreta ou ausente na LLA/LMA (mas pode ocorrer e simular linfoma); na B-CLL canina ocorre em ~50% dos cães. Enzimas hepáticas normais não descartam infiltração.',
          priority: 'common',
          context: ['Palpação abdominal', 'Diferencial de linfoma'],
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Taquicardia compensatória, pulso hipercinético ou instabilidade hemodinâmica',
          mechanism: 'Ativação simpática para aumentar débito cardíaco (DO₂ = DC × CaO₂) frente à anemia grave, hipovolemia ou choque séptico distributivo.',
          clinicalMeaning: 'Indicador clínico direto de descompensação sistêmica com prioridade de estabilização imediata.',
          priority: 'emergency',
          context: ['Perfusão', 'Estabilização'],
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia, dispneia e intolerância ao esforço',
          mechanism: 'Compensação respiratória à anemia/acidose, pneumonia oportunista, hemorragia alveolar, derrame pleural, massa mediastinal ou suspeita de leucostase pulmonar.',
          clinicalMeaning: 'Exige diferenciação etiológica rápida (radiografia torácica, POCUS, hematócrito e oxigenação) antes de atribuir a leucostase isolada.',
          priority: 'emergency',
          context: ['Emergência respiratória'],
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Ataxia, alterações de consciência, déficits focais ou convulsões',
          mechanism: 'Infiltração leucêmica de meninges/SNC, hemorragia intracraniana por trombocitopenia, hiperviscosidade, hipoglicemia ou alterações metabólicas graves.',
          clinicalMeaning: 'Complicação de alta gravidade; requer exame neurológico, estabilização hemostática/metabólica e imagem avançada (TC/RM) se estável.',
          priority: 'emergency',
          context: ['Infiltração SNC', 'Hemorragia'],
        },
      ],
    },
    {
      system: 'ocular',
      findings: [
        {
          finding: 'Hipema, hemorragias retinianas, tortuosidade vascular ou cegueira aguda',
          mechanism: 'Sangramento intraocular por trombocitopenia, anemia severa, síndrome de hiperviscosidade (paraproteínas/policitemia) ou infiltração uveal neoplásica.',
          clinicalMeaning: 'O exame fundoscópico é ferramenta de alto valor à beira do leito para detectar hiperviscosidade e hemorragias silenciosas.',
          priority: 'systemic',
          context: ['Fundoscopia', 'Hiperviscosidade'],
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Hiporexia, vômitos, diarreia, melena ou ulcerações orais',
          mechanism: 'Doença sistêmica inflamatória, infiltração da mucosa digestiva, micro-hemorragias por trombocitopenia, infecções secundárias ou toxicidade quimioterápica.',
          clinicalMeaning: 'Sinais inespecíficos que agravam desidratação, perda proteica e translocação bacteriana.',
          priority: 'common',
          context: ['Suporte GI'],
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'Poliúria/polidipsia, azotemia, proteinúria ou distúrbios eletrolíticos',
          mechanism: 'Hipercalcemia paraneoplásica (T-ALL e ~13% das B-CLL caninas), infiltração renal neoplásica, desidratação, cilindros de cadeias leves (Bence Jones), síndrome de lise tumoral ou nefrotoxicidade.',
          clinicalMeaning: 'Condiciona ajuste de fluidoterapia, escolha de quimioterápicos (ex.: evitar agentes nefrotóxicos) e prognóstico.',
          priority: 'systemic',
          context: ['Hipercalcemia', 'Função renal'],
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        {
          finding: 'Dor óssea difusa, claudicação ou sensibilidade à palpação diafisária',
          mechanism: 'Expansão intramedular rápida com elevação da pressão intraóssea, reações periosteais ou lesões osteolíticas (particularmente em neoplasias plasmocitárias).',
          clinicalMeaning: 'Mais sugestiva em leucemias agudas e neoplasias plasmocitárias; demanda analgesia segura sem AINEs na presença de trombocitopenia.',
          priority: 'uncommon',
          context: ['Dor óssea', 'Analgesia'],
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia, prostração, perda de peso crônica e caquexia neoplásica',
          mechanism: 'Estado catabólico mediado por citocinas, elevado gasto energético do turnover tumoral e menor ingestão calórica.',
          clinicalMeaning: 'Na LLC felina, a perda de peso crônica é manifestação central (Campbell et al., 2013); na leucemia aguda a deterioração costuma ocorrer em dias.',
          priority: 'common',
          context: ['Estado geral', 'Qualidade de vida'],
        },
      ],
    },
  ],

  diagnosis: {
    leucHemogramaContagensAbsolutas:
      'Passo 1 — Hemograma completo, contagens absolutas e revisão manual obrigatória do esfregaço:\n' +
      '- Regra das contagens absolutas (jamais interpretar apenas porcentagens): um paciente com 8.000 leucócitos/µL e 80% de linfócitos possui 6.400 linfócitos/µL, enquanto outro com 150.000 leucócitos/µL e os mesmos 80% possui 120.000 linfócitos/µL — probabilidades pré-teste e condutas completamente distintas.\n' +
      '- Perfis documentados em coortes caninas: em 50 cães com leucemia aguda presumivelmente linfoide/indefinida (Bennett et al., 2017), observaram-se trombocitopenia em 86%, anemia em 68%, FA elevada em 60%, neutropenia acentuada em 22% e hipercalcemia em 12% (mediana de 73.500 células leucêmicas/µL). Em 35 cães com LMA confirmada (Davis et al., 2018), 85% exibiam blastos circulantes quantificáveis (mediana 35.700/µL), hematócrito mediano 34%, plaquetas medianas 57.000/µL, 44% bicitopenia e 44% pancitopenia.\n' +
      '- Série vermelha e plaquetas: quantificar sempre reticulócitos absolutos (anemia tipicamente não regenerativa); avaliar macrocitose (atenção a MDS/FeLV em gatos) e leucoeritroblastose (eritroblastos + granulócitos imaturos — sugere distorção medular, mas tem causas reativas). Confirmar SEMPRE trombocitopenia no esfregaço (agregados plaquetários felinos falseiam contadores automáticos); TP e TTPa podem permanecer normais mesmo na trombocitopenia severa (reservar painel completo de CID para suspeita clínica/laboratorial).',

    leucTabelaHemogramaAgudaVsCronica: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Padrões Hematológicos Comparados: Leucemia Aguda versus Leucemia Crônica',
      headers: ['Parâmetro Hematológico', 'Leucemia Aguda (LLA / LMA / AUL)', 'Leucemia Crônica (LLC / LMC)'],
      rows: [
        ['Hematócrito / Hemoglobina', 'Frequentemente diminuídos (anemia moderada a grave)', 'Normais ou discretamente alterados nas fases iniciais'],
        ['Reticulócitos absolutos', 'Resposta tipicamente inadequada / não regenerativa', 'Variável conforme progressão medular'],
        ['Leucócitos totais', 'Aumentados, normais ou diminuídos (leucopenia possível)', 'Frequentemente aumentados (muitas vezes marcados)'],
        ['Blastos circulantes', 'Comuns (>90% têm células neoplásicas), mas podem estar ausentes', 'Geralmente raros ou ausentes nas fases indolentes'],
        ['Linfócitos / Neutrófilos', 'Neutropenia frequente; blastos predominantes', 'Linfocitose madura (LLC) ou neutrofilia madura/escalonada (LMC)'],
        ['Plaquetas', 'Trombocitopenia muito frequente', 'Frequentemente normais no início (caem na doença avançada)'],
        ['Células displásicas / Eritroblastos', 'Podem coexistir, sobretudo em LMA/eritroleucemia', 'Mais marcantes em MDS e certas neoplasias mieloproliferativas'],
      ],
    },

    leucBioquimicaUrinImagem:
      'Bioquímica sérica, urinálise e diagnóstico por imagem:\n' +
      '- Bioquímica: ALT/AST e FA variam conforme infiltração, hipóxia ou corticoide (enzimas normais não afastam infiltração hepática); globulinas altas sugerem gamopatia monoclonal (B-CLL/PCL — solicitar eletroforese sérica e imunofixação); cálcio total/iônico avalia hipercalcemia paraneoplásica; potássio, fósforo, creatinina e ureia monitoram função renal e síndrome de lise tumoral; ácido úrico não deve seguir pontos de corte humanos.\n' +
      '- Urinálise: avalia densidade urinária, proteinúria (UPC + pesquisa de proteínas de Bence Jones quando indicado) e hematúria.\n' +
      '- Imagem: ultrassonografia abdominal caracteriza hepatoesplenomegalia, linfadenomegalia e alterações de ecotextura; radiografia torácica rastreia massas mediastinais e complicações pulmonares; TC/RM são indicadas em déficits neurológicos ou massas extramedulares. A imagem define extensão anatômica, jamais a linhagem celular.',

    leucMedulaOsseaAspiradoVsBiopsia:
      'Passo 2 — Aspirado e biópsia (core biopsy) de medula óssea:\n' +
      '- Complementaridade obrigatória: o aspirado destaca detalhes citomorfológicos individuais, displasia, relação mieloide:eritroide e contagem diferencial de blastos; a biópsia preserva a arquitetura medular, quantifica celularidade global real, detecta infiltração focal e confirma fibrose (mielofibrose) por coloração de reticulina.\n' +
      '- Armadilhas técnicas: hemodiluição (aspirado pobre em espículas) subestima blastos e distorce proporções celulares; aspirado seco (dry tap) ocorre em mielofibrose ou empacotamento neoplásico denso e torna obrigatória a core biopsy.\n' +
      '- Registro rigoroso da contagem de blastos: anotar sempre a porcentagem exata, o denominador utilizado (todas as células nucleadas vs. células não eritroides nas eritroleucemias) e qual limiar classificatório foi adotado (20% contemporâneo vs. 30% histórico).',

    leucTabelaAspiradoVsBiopsia: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Comparação Prática entre Aspirado Medular e Biópsia Medular (Core Biopsy)',
      headers: ['Atributo', 'Aspirado de Medula Óssea', 'Biópsia Medular (Core Biopsy)'],
      rows: [
        ['Finalidade principal', 'Citomorfologia fina e proporções celulares', 'Arquitetura medular, celularidade global e fibrose'],
        ['Contagem de blastos', 'Sim, quando há espículas representativas', 'Estimativa histológica + imuno-histoquímica (ex.: PAX5, CD3)'],
        ['Melhor avaliação', 'Displasia citológica, maturação e relação M:E', 'Hipocelularidade/aplasia, infiltração focal e mielofibrose'],
        ['Citometria de fluxo', 'Amostra fresca adequada (EDTA)', 'Não substitui amostra fresca para citometria convencional'],
        ['Principal limitação', 'Hemodiluição e dry tap (aspirado seco)', 'Menor definição de detalhes citológicos finos'],
      ],
    },

    leucCitoquimicaEAtualizacao2026:
      'Passo 3 — Citoquímica enzimática e atualizações críticas de 2026 (ALP e ADVIA MPO):\n' +
      '- Principais reações citoquímicas: mieloperoxidase (MPO) e cloroacetato esterase (CAE) sustentam diferenciação granulocítica; alfa-naftil butirato esterase (ANBE) e lipase auxiliam na linhagem monocítica; acetilcolinesterase apoia a investigação de AML-M7.\n' +
      '- ATUALIZAÇÃO 2026 — Fosfatase alcalina (ALP) NÃO diferencia LMA de LLA (Aalto et al., 2026): avaliando 64 cães com leucemia aguda CD34+, 61/64 (95,3%) apresentaram atividade de ALP sem diferença discriminatória entre LMA, LLA e AUL (enquanto controles com LLC-B e linfoma foram negativos). Logo, ALP positiva NÃO classifica uma leucemia aguda como mieloide.\n' +
      '- ATUALIZAÇÃO 2026 — Citograma automatizado ADVIA MPO NÃO substitui imunofenotipagem (Miller et al., 2026): em estudo prospectivo multicêntrico (44 cães: 30 LMA e 14 LLA/linfoma linfoblástico), o ângulo da população LUC no citograma de mieloperoxidase não diferiu entre LMA e neoplasias linfoblásticas (p = 0,9) nem correlacionou com a MPO citoquímica.',

    leucCitometriaDeFluxoEParr:
      'Passo 4 — Citometria de fluxo (padrão-ouro de imunofenotipagem), CD80, CD94 e limites do PARR:\n' +
      '- Princípio e gating: analisa milhares de células por tamanho (FSC), granularidade/complexidade (SSC) e expressão antigênica por anticorpos fluorescentes. Nunca classificar apenas pela posição FSC × SSC sem painel validado e exclusão de artefatos/células mortas.\n' +
      '- Armadilhas de marcadores: CD34 indica imaturidade (não linhagem) e pode estar ausente em até 25% das leucemias agudas caninas; ausência de marcadores linfoides em blastos CD34+ não prova LMA. Em contrapartida, CD3+/CD4−/CD8−/CD34+ ocorre em LLA-T duplamente negativa aberrante (relato canino 2026, PMID 42523662), mostrando o risco de painéis restritos a CD4/CD8.\n' +
      '- CD80 como marcador auxiliar de LMA (Stokol et al., 2024): em 39 LMA, 11 leucemias mistas, 37 neoplasias B e 35 neoplasias T caninas, CD80 foi positivo em ~72% das LMA e 36% das mistas, e negativo nos grupos linfoides testados — marcador auxiliar promissor dentro de um painel completo.\n' +
      '- Células NK e CD94 (Blockeel et al., 2025): estudo exploratório encontrou expressão de CD94 em parte das LLC-T caninas; ainda não existe painel veterinário universal para separar LLC-LGL de neoplasias NK verdadeiras.\n' +
      '- Limite crítico do PARR (Stokol et al., 2017): o PARR detecta rearranjos clonais de receptores antigênicos B/T, mas clonabilidade ≠ malignidade (ocorre em quadros reativos) e NÃO garante origem linfoide — mais de 60% dos cães com LMA apresentam rearranjos clonais ou biclonais de receptores B/T. Jamais usar PARR para diferenciar LMA de LLA.',

    leucTabelaMarcadoresCitometria: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Principais Marcadores Imunofenotípicos em Leucemias Caninas e Felinas',
      headers: ['Marcador', 'Principal Associação de Linhagem / Maturação', 'Limitações e Cautelas de Interpretação'],
      rows: [
        ['CD45', 'Antígeno pan-leucocitário', 'Não define linhagem; sua PERDA é padrão característico do linfoma de zona T (TZL) canino'],
        ['CD34', 'Marcador de imaturidade (precursores/blastos)', 'Não define linhagem; ausente em até ~25% das leucemias agudas caninas'],
        ['CD3 / CD5', 'Linhagem T', 'Expressão pode variar conforme maturação e método (CD3 intracitoplasmático vs. superfície)'],
        ['CD4 / CD8', 'Subpopulações T-helper (CD4) e T citotóxica (CD8)', 'Expressos em T normais; LLA-T aberrante pode ser CD4−/CD8− (painel sem CD3 falha)'],
        ['CD21 / CD79a / PAX5', 'Linhagem B (CD21 maduro; CD79a/PAX5 amplos)', 'CD21 pode faltar em precursores B precoces; CD79a/PAX5 exigem técnica intracelular/IHQ'],
        ['CD14 / CD11b / CD11c', 'Diferenciação monocítica (CD14) e mielomonocítica', 'Sensibilidade variável conforme grau de maturação; não são marcadores universais de LMA'],
        ['CD41 / CD61', 'Diferenciação megacariocítica', 'Indispensáveis na investigação de leucemia megacarioblástica (AML-M7)'],
        ['CD80', 'Marcador auxiliar de LMA canina (Stokol et al., 2024)', 'Positivo em ~72% das LMA no estudo; usar integrado ao painel completo'],
        ['CD94', 'Exploratório para células citotóxicas / NK (Blockeel et al., 2025)', 'Evidência veterinária preliminar; amostra pequena'],
      ],
    },

    leucFiguraStokol2017LmaCitometria: {
      kind: 'clinicalFigure',
      src: 'https://www.frontiersin.org/files/Articles/267077/fvets-04-00076-HTML/image_m/fvets-04-00076-g002.jpg',
      alt: 'Esfregaço sanguíneo e gráficos de citometria de fluxo em cão com leucemia mieloide aguda (Stokol et al., 2017)',
      shortCaption: 'Citomorfologia e citometria de fluxo na LMA canina (Stokol et al., 2017 — CC BY 4.0)',
      caption:
        'Figura 1 — LMA canina com integração de citomorfologia e citometria de fluxo (Stokol et al., 2017, Frontiers in Veterinary Science, CC BY 4.0): ilustra como blastos morfologicamente inespecíficos exigem caracterização imunofenotípica completa — e reforça que o PARR positivo não exclui LMA.',
      display: 'wide',
    },

    leucFiguraStokol2024Cd80: {
      kind: 'clinicalFigure',
      src: 'https://www.frontiersin.org/files/Articles/1405297/fvets-11-1405297-HTML/image_m/fvets-11-1405297-g005.jpg',
      alt: 'Citometria de fluxo demonstrando expressão de CD80 em leucemia mieloide aguda canina (Stokol et al., 2024)',
      shortCaption: 'Expressão de CD80 na LMA canina por citometria de fluxo (Stokol et al., 2024 — CC BY 4.0)',
      caption:
        'Figura 2 — Expressão de CD80 em neoplasias hematopoéticas caninas (Stokol et al., 2024, Frontiers in Veterinary Science, CC BY 4.0): CD80 foi detectado em ~72% das amostras de LMA e 36% das leucemias mistas, sendo ausente nos grupos de neoplasias B e T avaliados (marcador auxiliar em painel completo).',
      display: 'wide',
    },

    leucFiguraLee2022LlcSmudge: {
      kind: 'clinicalFigure',
      src: 'https://www.frontiersin.org/files/Articles/625527/xml-images/fvets-08-625527-g0001.webp',
      alt: 'Esfregaços sanguíneos e aspirado medular de cão com LLC-B mostrando linfócitos maduros e smudge cells (Lee et al., 2022)',
      shortCaption: 'Esfregaços e medula na LLC-B canina com smudge cells (Lee et al., 2022 — CC BY 4.0)',
      caption:
        'Figura 3 — Esfregaços sanguíneos e aspirado medular em cão com LLC-B antes e durante o tratamento (Lee et al., 2022, Frontiers in Veterinary Science, CC BY 4.0): predomínio de linfócitos relativamente maduros e células rompidas (smudge cells) durante o acompanhamento citológico.',
      display: 'wide',
    },

    leucDiferenciaisLinfomaEReacaoLeucemoide:
      'Diferenciais diagnósticos críticos: LLC × linfoma de zona T (TZL), LLA × linfoma linfoblástico e LMC × reação leucemoide:\n' +
      '- LLC-T versus linfoma de zona T (TZL): ambos são indolentes e cursam com linfocitose circulante; a perda de CD45 na citometria de fluxo e linfadenomegalia periférica marcante favorecem fortemente o TZL canino.\n' +
      '- LMC versus reação leucemoide: leucocitose neutrofílica extrema (mesmo >50.000–100.000/µL) pode ser puramente reativa a piometra, abscessos, necrose tecidual, infecções severas ou síndromes paraneoplásicas produtoras de G-CSF. A presença de alterações tóxicas e regressão após tratar a causa primária aponta para reação leucemoide; na LMC há persistência sem causa inflamatória, expansão clonal e eventual biópsia hepática/esplênica ou FISH citogenético (BCR::ABL1 / cromossomo de Raleigh) quando disponíveis.\n' +
      '- Referências visuais externas complementares: bancos acadêmicos como Cornell eClinpath (LMA felina em medula e sangue; LLC-LGL canina) e a revisão de morfologia leucocitária felina (PMC11129198) auxiliam o treinamento visual comparando atipias reativas e neoplásicas.',

    leucTabelaSinteseExames: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Síntese da Interpretação e Limitações de Cada Modalidade Diagnóstica',
      headers: ['Exame', 'O que Informa', 'Principal Limitação Prática'],
      rows: [
        ['Hemograma + esfregaço', 'Magnitude absoluta, citopenias, blastos, displasia e artefatos', 'Morfologia isolada não define linhagem nem prova clonabilidade'],
        ['Aspirado medular', 'Composição celular, relação M:E e contagem de blastos', 'Hemodiluição e aspirado seco (dry tap)'],
        ['Biópsia medular', 'Celularidade real, arquitetura, infiltração focal e mielofibrose', 'Menor detalhe citológico; exige processamento/IHQ especializados'],
        ['Citometria de fluxo', 'Imunofenótipo (padrão-ouro para linhagem e TZL/CD45−)', 'Depende de amostra fresca, painel de anticorpos e viabilidade; não há VPP/VPN único universal'],
        ['Citoquímica', 'Atividade enzimática (MPO, CAE, ANBE, acetilcolinesterase)', 'ALP não separa LMA de LLA (Aalto et al., 2026); disponibilidade restrita'],
        ['PARR', 'Evidência molecular de rearranjo clonal B ou T', 'Não prova malignidade e é positivo em >60% das LMA caninas (Stokol et al., 2017)'],
        ['FeLV / FIV (gatos)', 'Status retroviral (p27 + PCR proviral)', 'Positividade não confirma neoplasia; negatividade p27 não exclui regressiva'],
        ['US / RX / TC / RM', 'Extensão visceral, massas mediastinais e lesões do SNC', 'Não substitui classificação hematopatológica'],
      ],
    },
  },

  treatment: {
    leucPrincipiosEBioestratificacao:
      'Princípios terapêuticos baseados na biologia do subtipo:\n' +
      '- Regra central: o tratamento jamais deve começar apenas pelo número total de leucócitos nem aplicar protocolos de linfoma de alto grau indistintamente a todas as leucemias. Definir primeiro linhagem, maturação, citopenias, comorbidades e objetivo (vigilância, citoredução, indução combinada ou paliação).\n' +
      '- Coleta prévia obrigatória: sempre que o paciente estiver estável, colher citometria e medula ANTES de administrar glicocorticoides (prednisolona provoca apoptose rápida de células linfoides e mascaramento diagnóstico).',

    leucLlcVigilanciaEClorambucila:
      'Leucemia linfocítica crônica (LLC) — Vigilância ativa e terapia com clorambucila:\n' +
      '- Quando NÃO tratar (vigilância ativa): na LLC indolente assintomática, sem anemia clinicamente relevante, sem trombocitopenia progressiva e sem organomegalia sintomática, a vigilância com exame físico e hemograma mensais/bimestrais é preferível. Não existe ponto de corte absoluto de linfócitos validado para iniciar quimioterapia (ex.: cão estável com 80.000 linfócitos/µL pode permanecer em observação, enquanto outro com 35.000/µL, anemia e perda de peso requer terapia).\n' +
      '- LLC canina sintomática/progressiva: clorambucila (agente alquilante mostarda nitrogenada) — esquemas publicados incluem 0,2 mg/kg VO q24h por 7–14 dias (ou 3–6 mg/m² VO q24h inicialmente), reduzindo subsequentemente para 0,1 mg/kg ou 3 mg/m² VO q24h e manutenção possível com 2 mg/m² VO q48h conforme resposta e tolerância medular. Prednisona/prednisolona (~1 mg/kg VO q24h reduzindo para ~0,5 mg/kg q48h) pode ser associada historicamente, mas não é obrigatória em todos os casos. Atenção: doses em mg/kg e mg/m² NÃO são matematicamente equivalentes entre portes diferentes.\n' +
      '- LLC felina sintomática: clorambucila 0,2 mg/kg VO q48h (ou 2 mg/gato q48h, ou esquema alternativo de pulso 20 mg/m² VO a cada 14 dias — nunca combinar/alternar esquemas sem revisão oncológica) associada a prednisolona ~1 mg/kg VO q24h (preferir prednisolona à prednisona em gatos). Em Campbell et al. (2013; n = 18), 88% obtiveram resposta e a sobrevida mediana foi de 14,4 meses.\n' +
      '- Monitoramento da clorambucila: principal toxicidade é mielossupressão com nadir que pode ser retardado e prolongado (1 a 6 semanas); hemograma inicial a cada 1–2 semanas até estabilização, ajustando ou pausando conforme citopenias.',

    leucLmcHidroxiureiaEInibidoresTq:
      'Leucemia mieloide crônica (LMC) e neoplasias mieloproliferativas — Hidroxiureia e terapia dirigida:\n' +
      '- Hidroxiureia (inibidor da ribonucleotídeo redutase): reduz proliferação granulocítica, eritroide (policitemia vera) ou plaquetária sem erradicar o clone neoplásico.\n' +
      '- Regimes documentados: cães 30–60 mg/kg VO q24h (ou divididos) inicialmente por 1–2 semanas (na PV até hematócrito <60%), reduzindo depois para dias alternados conforme resposta; gatos ~30 mg/kg VO q24h ou 10–15 mg/kg VO q12h por 1–2 semanas, depois dias alternados (na eritrocitose primária felina relatou-se mediana de manutenção de 22 mg/kg VO q48h). Monitorar hemograma com plaquetas a cada 1–2 semanas inicialmente (depois q3 meses), ureia/creatinina a cada 3–4 meses e sinais de metemoglobinemia (dispneia, taquipneia, cianose).\n' +
      '- Inibidores de tirosina-quinase (imatinibe / toceranibe): na LMC canina, NÃO indicar imatinibe automaticamente apenas por suspeita hematológica — tentar demonstrar previamente a fusão BCR::ABL1 (cromossomo de Raleigh) e discutir com oncologista. Relatos isolados de imatinibe associado a clorambucila na LLC-B (Lee et al., 2022) não constituem protocolo de rotina.',

    leucAgudasLlaELma:
      'Leucemia linfoblástica aguda (LLA) e leucemia mieloide aguda (LMA) — Limites da quimioterapia:\n' +
      '- LLA (cães e gatos): protocolos combinados adaptados de neoplasias linfoides (vincristina, ciclofosfamida, doxorrubicina, L-asparaginase e prednisona/prednisolona — esquemas CHOP/COP individualizados) visam atacar múltiplas vias e reduzir resistência, mas não existe protocolo curativo universal veterinário. Antes de administrar vincristina ou doxorrubicina em raças predispostas (Collies, Pastores Australianos), testar mutação ABCB1-1Δ (MDR1). A L-asparaginase não é mielossupressora e pode atuar como ponte rápida enquanto se estabiliza o paciente. Na série retrospectiva canina (Bennett et al., 2017), 64% (23/36) responderam, porém com duração mediana de remissão de 56 dias e sobrevida mediana de 55 dias (vs. 7,5 dias sem quimioterapia — sujeito a viés de seleção). Em 6 gatos com LLA (Tomiyasu et al., 2018), sobrevida mediana foi de 55 dias (1–115 dias).\n' +
      '- LMA (citarabina / Ara-C e suporte): a citarabina é análogo de nucleosídeo fase-S específico com biodisponibilidade oral pobre, meia-vida curta em cães (~1,1–1,35 h, exigindo CRI ou doses SC seriadas para manter exposição) e boa penetração liquórica (~40% do plasma). Não existe esquema padrão-ouro validado para LMA em cães e gatos (protocolos humanos intensivos NÃO devem ser copiados diretamente) e o prognóstico global é muito reservado (sobrevida mediana de 19 dias em Davis et al., 2018; 6 dias em Meredith et al., 2025). Em pacientes já pancitopênicos, a quimioterapia agrava temporariamente neutropenia e trombocitopenia, exigindo infraestrutura hospitalar com hemoterapia e UTI.',

    leucTabelaLeucemiasRaras: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Abordagem Geral e Limitações nas Leucemias Raras e Subtipos Especiais',
      headers: ['Entidade', 'Abordagem Clínica Geral', 'Limitações da Evidência'],
      rows: [
        ['Leucemia eosinofílica crônica (CEL)', 'Confirmar clonabilidade e excluir parasitoses/alergia/SHE; considerar citoredução especializada', 'Evidência veterinária muito limitada'],
        ['Leucemia basofílica (CBL)', 'Manejo individualizado conforme diferenciação morfológica/imunofenotípica', 'Restrita a relatos de caso'],
        ['Leucemia plasmocitária (PCL)', 'Abordagem sistêmica agressiva de neoplasia plasmocitária + controle de hiperviscosidade/hipercalcemia', 'Protocolos pouco validados; plasmaférese na hiperviscosidade'],
        ['Leucemia mastocitária (MCL)', 'Definir origem primária vs. mastocitose visceral/esplênica; terapia sistêmica individualizada', 'Ausência de esquema universal'],
        ['LLC-LGL indolente vs. LGL agressiva', 'Vigilância/baixa intensidade na LLC-LGL; quimioterapia ou paliação na forma agressiva', 'Separação fenotípica complexa; prognósticos opostos'],
        ['AML-M6 e AML-M7', 'Suporte transfusional intensivo e avaliação oncológica especializada', 'Escassos estudos terapêuticos específicos'],
        ['Leucemia de fenótipo ambíguo', 'Ampliar painel de citometria/citoquímica antes de escolher protocolo', 'Alto risco de selecionar protocolo para linhagem incorreta'],
      ],
    },

    leucTabelaFarmacologicaReferencia: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Referência Farmacológica dos Principais Agentes Citados em Leucemias (Exige Individualização Oncológica)',
      headers: ['Fármaco', 'Indicação Documentada', 'Cães', 'Gatos', 'Monitoramento Principal'],
      rows: [
        ['Clorambucila', 'LLC sintomática / progressiva', '3–6 mg/m² VO q24h (ou 0,2 mg/kg q24h × 7–14 d), depois reduzir', '0,2 mg/kg (ou 2 mg/gato) VO q48h, ou 20 mg/m² q14d', 'Hemograma q1–2 sem (nadir tardio 1–6 sem); manuseio NIOSH'],
        ['Prednisona / Prednisolona', 'Adjuvante em LLC / neoplasias linfoides', 'Prednisona ~1 mg/kg VO q24h inicial, reduzindo para q48h', 'Prednisolona ~1 mg/kg VO q24h (preferível à prednisona)', 'Hiperglicemia, sinais GI, infecção; colher exames ANTES'],
        ['Hidroxiureia', 'LMC e neoplasias mieloproliferativas (PV/ET)', '30–60 mg/kg VO q24h × 1–2 sem, reduzindo para q48h', '~30 mg/kg VO q24h (ou 10–15 mg/kg q12h), depois q48h', 'Hemograma q1–2 sem, função renal q3–4m, metemoglobinemia'],
        ['Citarabina (Ara-C)', 'LMA em protocolos oncológicos especializados', 'Doses/CRI variáveis; sem padrão-ouro universal validado', 'Evidência extremamente limitada', 'Mielossupressão grave, sepse, hemorragia'],
        ['Vincristina / Ciclofosfamida / Doxorrubicina / L-asparaginase', 'Protocolos combinados (LLA / linfoma leucêmico)', 'Conforme calendário oncológico completo selecionado', 'Conforme protocolo felino e função renal/cardíaca', 'Neutrófilos (<1.000/µL adiar), ABCB1-1Δ, cardiotoxicidade, cistite'],
      ],
    },

    leucSuporteHemoterapiaNeutropeniaEDor:
      'Suporte hematológico, neutropenia febril (AAHA, 2026), cuidados com citotóxicos e paliação:\n' +
      '- Hemoterapia guiada pela clínica (não apenas por um hematócrito isolado): concentrado de hemácias (~6–10 mL/kg IV ajustado ao produto, Ht do doador e sinais de hipóxia) restaura transporte de O₂ temporariamente; sangue total não equivale a concentrado de plaquetas (especialmente se estocado); plasma fresco congelado (PFC) trata deficiência de fatores/coagulopatia, NÃO anemia nem trombocitopenia isolada; concentrado de plaquetas reserva-se a hemorragia grave ou procedimento invasivo crítico quando disponível. Em gatos, tipagem sanguínea AB é OBRIGATÓRIA mesmo na primeira transfusão (além de crossmatch conforme protocolo ISFM).\n' +
      '- Neutropenia febril (emergência oncológica): neutropenia profunda associada a febre, hipotermia, letargia ou choque exige avaliação imediata de perfusão/lactato, coleta de culturas sem atrasar terapia e antibiótico IV empírico de amplo espectro (cobrindo Gram-negativos e flora hospitalar) + suporte hemodinâmico. Não usar fatores estimuladores de colônias (filgrastim) rotineiramente na leucemia mieloide pelo risco de estimular o clone neoplásico.\n' +
      '- Diretrizes AAHA de Oncologia (2026): checar hemograma antes de cada ciclo citotóxico; contagens de neutrófilos <1.000/µL são referência usual para adiar quimioterapia citotóxica, enquanto sinais sistêmicos determinam internação e antimicrobianos parenterais.\n' +
      '- Segurança ocupacional e domiciliar: não fracionar ou esmagar comprimidos/cápsulas de clorambucila ou hidroxiureia sem avaliação farmacêutica; orientar luvas para manuseio do fármaco e excretas (urina, fezes, vômito) nos dias de excreção.\n' +
      '- Controle da dor e cuidados paliativos: paliação ativa engloba analgesia, correção de anemia sintomática, controle de náusea, nutrição e hidratação. Preferir opioides na dor moderada/intensa (e gabapentinoides como adjuvantes se dor neuropática); evitar AINEs na presença de trombocitopenia relevante, hipoperfusão, doença renal ou risco hemorrágico GI.',
  },

  complications: {
    leucDeterioracaoEUti:
      'Por que pacientes com leucemia aguda descompensam rapidamente em terapia intensiva:\n' +
      '- Sinergia de falências: hipóxia anêmica, hemorragia trombocitopênica, sepse neutropênica, distúrbios metabólicos (SLT/hipercalcemia) e mielossupressão precoce da própria quimioterapia podem coexistir em horas, exigindo suporte intensivo antes mesmo de resposta tumoral.',

    leucTabelaComplicacoesUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Complicações Críticas das Leucemias e Condutas Prioritárias em UTI',
      headers: ['Complicação', 'Mecanismo e Sinais Precoces', 'Conduta Prioritária'],
      rows: [
        ['Anemia grave sintomática', 'Queda de DO₂; taquicardia, fraqueza, taquipneia, lactato alto', 'Avaliar perfusão/tendência e transfundir concentrado de hemácias (tipagem AB em gatos)'],
        ['Neutropenia febril / Sepse', 'Falha de defesa inata; febre, hipotermia, prostração ou choque', 'Culturas sem atraso, antibiótico IV de amplo espectro e ressuscitação de sepse'],
        ['Hemorragia grave', 'Trombocitopenia severa, trombopatia (proteína M) ou CID', 'Controle local, painel hemostático e hemoterapia dirigida (pRBC/plaquetas/PFC se fatores)'],
        ['Síndrome de lise tumoral', 'Liberação maciça de K⁺ e fósforo + hipocalcemia secundária', 'ECG, K⁺, fósforo, Ca²⁺, creatinina e débito urinário seriados + fluidoterapia ajustada'],
        ['Leucostase suspeita', 'Comprometimento microvascular em hiperleucocitose extrema', 'Estabilização, descartar anemia/infecção/hemorragia e discussão oncológica imediata'],
        ['Infiltração neurológica / SNC', 'Ataxia, convulsões ou estupor (infiltração ou hemorragia)', 'Exame neurológico, estabilização hemostática e TC/RM se estável'],
        ['Lesão renal aguda', 'Hipercalcemia, hipoperfusão, infiltração, SLT ou cadeias leves', 'Avaliar volemia, eletrólitos, diurese e ajustar/suspender nefrotóxicos'],
        ['Hiperviscosidade (paraproteínas)', 'Aumento da viscosidade sérica; cegueira, hemorragia, sinais SNC', 'Confirmar gamopatia/proteínas séricas; plasmaférese como medida de alívio rápido'],
      ],
    },

    leucPrognosticoETransformacaoRichter:
      'Prognóstico comparativo por entidade e Transformação de Richter:\n' +
      '- Não existe "sobrevida média única das leucemias": somar coortes heterogêneas de LLC indolente e LMA aguda gera estimativas falsas. O prognóstico depende fundamentalmente do subtipo, imunofenótipo, presença de citopenias graves, infecção/hemorragia e resposta terapêutica.\n' +
      '- Transformação de Richter na LLC: evolução clonal de uma LLC previamente estável para neoplasia linfoide de alto grau (linfadenomegalia rápida, piora sistêmica, novas citopenias e expansão de células grandes imaturas), associada em pequena série canina a sobrevida mediana de apenas ~41 dias após reconhecimento — confirmar por nova citologia/histologia e imunofenotipagem.',

    leucTabelaPrognosticoComparativo: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Estimativas Publicadas de Sobrevida por Entidade (Não Extrapolar como Previsão Individual)',
      headers: ['Entidade', 'Espécie / Coorte Publicada', 'Desfecho Reportado', 'Interpretação Clínica'],
      rows: [
        ['LLC-T (T-CLL)', 'Cães (Comazzi et al., 2011; n = 19)', 'Sobrevida mediana: 930 dias', 'Frequentemente indolente; melhor prognóstico relativo'],
        ['LLC-B (B-CLL)', 'Cães (Comazzi et al., 2011; n = 17)', 'Sobrevida mediana: 480 dias', 'HR ~3,43 em relação à LLC-T na coorte'],
        ['LLC atípica', 'Cães (Comazzi et al., 2011; n = 7)', 'Sobrevida mediana: 22 dias', 'Grupo pequeno e biologicamente heterogêneo (HR ~19,17)'],
        ['LLC felina', 'Gatos (Campbell et al., 2013; n = 18)', 'Sobrevida mediana: 14,4 meses (88% resposta)', 'Boa resposta a clorambucila + prednisolona'],
        ['MDS (relacionada)', 'Cães (Meredith et al., 2025; n = 42 cães)', 'Sobrevida mediana: 384 dias', 'Estudo EXCLUSIVAMENTE canino; não atribuir a gatos nem agrupar com LMA'],
        ['LMA (AML)', 'Cães (Davis et al., 2018; n = 35)', 'Sobrevida mediana: 19 dias (3 respostas: 62–121 d)', 'Prognóstico global muito reservado'],
        ['LMA (AML)', 'Cães (Meredith et al., 2025; n = 28 cães)', 'Sobrevida mediana: 6 dias', 'População com letalidade muito precoce (exclusivamente cães)'],
        ['Leucemia aguda (presumida LLA/AUL)', 'Cães (Bennett et al., 2017; n = 50)', '55 dias tratados (64% resp., remissão 56 d) vs. 7,5 d paliativos', 'Retrospectivo com forte viés de seleção; remissões curtas'],
        ['LLA felina', 'Gatos (Tomiyasu et al., 2018; n = 6)', 'Sobrevida mediana: 55 dias (1–115 dias)', 'Amostra muito pequena; fenótipos B, T e misto'],
        ['Linfoma LGL agressivo', 'Cães (série n = 65)', 'Sobrevida mediana: 28 dias sob quimio intensiva', 'Entidade agressiva — NÃO confundir com LLC-LGL indolente'],
      ],
    },

    leucErrosClinicosEAtualizacoes20242026:
      'Os nove erros clínicos mais frequentes e síntese das atualizações 2024–2026:\n' +
      '- Erros críticos a evitar: (1) interpretar toda leucocitose extrema como leucemia sem excluir reação leucemoide; (2) descartar leucemia diante de leucopenia/pancitopenia (esquecer leucemia aleucêmica); (3) definir linhagem só por morfologia; (4) assumir PARR positivo como diagnóstico definitivo de LLA; (5) iniciar citotóxicos na LLC assintomática só pelo valor de linfócitos; (6) iniciar prednisolona antes de colher citometria/medula em paciente estável; (7) transpor classificações moleculares/limiares humanos sem validação veterinária; (8) confundir FeLV positivo com leucemia neoplásica; (9) usar clorambucila como terapia universal de leucemias agudas.\n' +
      '- Marcos científicos 2024–2026: CD80 como marcador auxiliar promissor para LMA canina (Stokol et al., 2024); coorte de 70 cães validando separação prognóstica MDS vs. LMA (Meredith et al., 2025); CD94 exploratório em populações citotóxicas (Blockeel et al., 2025); revisão narrativa brasileira em gatos (Ciência Rural, 2025); demonstração de que ALP (Aalto et al., 2026) e ângulo LUC/MPO do ADVIA (Miller et al., 2026) não distinguem LMA de LLA; relato de LMA basofílica em gata FeLV− (Sato et al., 2026) e LLA-T CD3+/CD4−/CD8−/CD34+ canina (2026); e Diretrizes Oncológicas AAHA (2026) reforçando monitoramento de toxicidade e segurança na quimioterapia.',
  },

  prevention: {
    leucPrevencaoFeLVePlanoDomiciliar:
      'Prevenção possível, acompanhamento longitudinal e plano domiciliar:\n' +
      '- Prevenção real em felinos: não há prevenção específica para leucemias espontâneas em cães nem para formas FeLV-negativas em gatos, porém a prevenção da infecção pelo FeLV (testagem prévia, manutenção em ambiente domiciliar, separação de portadores progressivos e vacinação baseada em risco conforme diretrizes AAFP, 2020) reduz significativamente o risco de neoplasias hematopoéticas e mielodisplasia associadas ao retrovírus.\n' +
      '- Monitoramento longitudinal estruturado: acompanhar tendências (nunca apenas uma fotografia isolada) de hematócrito, reticulócitos, neutrófilos, plaquetas, linfócitos/blastos, peso, apetite e organomegalia — diariamente/curto prazo nas leucemias agudas e a cada 1–3 meses na LLC estável.\n' +
      '- Segurança domiciliar e sinais de alarme: armazenar quimioterápicos longe de crianças e animais, utilizar luvas no manuseio de fármacos/excretas conforme orientação oncológica, restringir contato com ambientes de alta circulação animal durante neutropenia e buscar emergência diante de febre, palidez súbita, sangramentos, prostração intensa ou dispneia.\n' +
      '- Pontos essenciais para memorizar: (1) leucemia = neoplasia clonal, não sinônimo de leucocitose nem de FeLV; (2) morfologia, PARR, ALP e citograma automatizado não substituem citometria de fluxo + medula óssea; (3) LLC indolente pode viver anos em vigilância ativa ou baixa intensidade, enquanto LLA/LMA exigem discussão precoce de suporte, toxicidade e qualidade de vida.',
  },

  relatedConsensusSlugs: [
    'isfm-transfusao-felina-2021',
    'aafp-retrovirus-felino-2020',
    'veccs-sepse-definicao-caes-gatos-2026',
    'veccs-choque-septico-prognostico-2026',
  ],
  relatedDiseaseSlugs: [
    'leucemia-viral-felina',
    'sindrome-mielodisplasica-caes-gatos',
    'anemia-caes-gatos',
    'trombocitopenia-caes-gatos',
    'coagulacao-intravascular-disseminada-caes-gatos',
    'linfoma-mediastinal-caes-gatos',
    'linfoma-cutaneo-caes-gatos',
    'sepse-canina',
    'sepse-felina',
  ],
  relatedMedicationSlugs: [
    'clorambucil',
    'prednisolona',
    'ampicilina-sulbactam',
    'enrofloxacina',
    'marbofloxacina',
    'ondansetrona',
    'maropitant',
    'metadona',
    'buprenorfina',
  ],

  references: [
    {
      id: 'ref-aaha-oncology-2026',
      citationText:
        'Christensen J, et al. 2026 AAHA Oncology Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2026.',
      sourceType: 'Diretriz de Consenso AAHA (2026)',
      doi: '10.5326/JAAHA-MS-7549',
      url: 'https://www.aaha.org/resources/2026-aaha-oncology-guidelines-for-dogs-and-cats/section-5-therapeutic-interventions/therapeutic-modalities-chemotherapy/',
      evidenceLevel: 'Consenso Internacional',
    },
    {
      id: 'ref-aafp-retrovirus-2020',
      citationText:
        'Little S, Levy J, Hartmann K, et al. 2020 AAFP Feline Retrovirus Testing and Management Guidelines. J Feline Med Surg. 2020;22(1):5–30.',
      sourceType: 'Diretriz Internacional AAFP',
      doi: '10.1177/1098612X19895940',
      url: 'https://doi.org/10.1177/1098612X19895940',
      evidenceLevel: 'Consenso Internacional',
    },
    {
      id: 'ref-cornell-eclinpath',
      citationText:
        'Cornell University College of Veterinary Medicine. eClinpath: Leukemia and Hematopoietic Neoplasia (citomorfologia, LMA felina, LGL canina).',
      sourceType: 'Atlas / Referência Acadêmica de Hematopatologia',
      url: 'https://eclinpath.com/hematology/leukemia/',
      notes: 'Referência visual didática (imagens do portal não embutidas sem confirmação de licença comercial).',
    },
    {
      id: 'ref-bennett-2017',
      citationText:
        'Bennett AL, Williams LE, Ferguson MW, et al. Canine acute leukaemia: 50 cases (1989–2014). Vet Comp Oncol. 2017;15(3):1101–1114.',
      sourceType: 'Estudo Retrospectivo Multicêntrico (50 cães)',
      doi: '10.1111/vco.12251',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5233675/',
      evidenceLevel: 'Nível III — Coorte retrospectiva',
    },
    {
      id: 'ref-davis-2018',
      citationText:
        'Davis LL, Hume KR, Stokol T. A retrospective review of acute myeloid leukaemia in 35 dogs diagnosed by a combination of morphologic findings, flow cytometric immunophenotyping and cytochemical staining results. Vet Comp Oncol. 2018;16(2):268–275.',
      sourceType: 'Estudo Retrospectivo (35 cães com LMA)',
      doi: '10.1111/vco.12377',
      url: 'https://doi.org/10.1111/vco.12377',
      evidenceLevel: 'Nível III — Coorte retrospectiva',
    },
    {
      id: 'ref-comazzi-2011',
      citationText:
        'Comazzi S, Gelain ME, Martini V, et al. Immunophenotype predicts survival time in dogs with chronic lymphocytic leukemia. J Vet Intern Med. 2011;25(1):100–106.',
      sourceType: 'Estudo Observacional Prognóstico (43 cães com LLC)',
      doi: '10.1111/j.1939-1676.2010.0640.x',
      url: 'https://doi.org/10.1111/j.1939-1676.2010.0640.x',
      evidenceLevel: 'Nível II–III — Coorte prognóstica',
    },
    {
      id: 'ref-campbell-2013',
      citationText:
        'Campbell MW, Hess PR, Williams LE. Chronic lymphocytic leukaemia in the cat: 18 cases (2000–2010). Vet Comp Oncol. 2013;11(4):256–264.',
      sourceType: 'Estudo Retrospectivo Multicêntrico Felino (18 gatos)',
      doi: '10.1111/j.1476-5829.2011.00315.x',
      url: 'https://doi.org/10.1111/j.1476-5829.2011.00315.x',
      evidenceLevel: 'Nível III — Série clínica felina',
    },
    {
      id: 'ref-tomiyasu-2018',
      citationText:
        'Tomiyasu H, Fujino Y, Takahashi M, et al. Clinical and clinicopathological characteristics of acute lymphoblastic leukaemia in six cats. J Small Anim Pract. 2018;59(12):742–746.',
      sourceType: 'Série Retrospectiva Felina (6 gatos com LLA)',
      doi: '10.1111/jsap.12917',
      url: 'https://doi.org/10.1111/jsap.12917',
      evidenceLevel: 'Nível IV — Série de casos',
    },
    {
      id: 'ref-meredith-2025',
      citationText:
        'Meredith AM, et al. Standardized bone marrow assessment, risk variables, and survival in dogs with myelodysplastic syndrome and acute myeloid leukemia. Vet Pathol. 2025.',
      sourceType: 'Estudo Retrospectivo Padronizado (70 cães: 42 MDS vs. 28 LMA)',
      doi: '10.1177/03009858241277982',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11697499/',
      evidenceLevel: 'Nível II–III — Coorte prognóstica canina',
    },
    {
      id: 'ref-stokol-2017',
      citationText:
        'Stokol T, Nickerson GA, Shuman M, Belcher N. Dogs with Acute Myeloid Leukemia Have Clonal Rearrangements in T and B Cell Receptors. Front Vet Sci. 2017;4:76.',
      sourceType: 'Estudo de Hematopatologia Molecular (CC BY 4.0)',
      doi: '10.3389/fvets.2017.00076',
      url: 'https://doi.org/10.3389/fvets.2017.00076',
      evidenceLevel: 'Estudo diagnóstico laboratorial',
    },
    {
      id: 'ref-stokol-2024',
      citationText:
        'Stokol T, et al. Flow cytometric-based detection of CD80 is a useful diagnostic marker of acute myeloid leukemia in dogs. Front Vet Sci. 2024;11:1405297.',
      sourceType: 'Estudo de Imunofenotipagem por Citometria (CC BY 4.0)',
      doi: '10.3389/fvets.2024.1405297',
      url: 'https://doi.org/10.3389/fvets.2024.1405297',
      evidenceLevel: 'Estudo diagnóstico laboratorial',
    },
    {
      id: 'ref-blockeel-2025',
      citationText:
        'Blockeel E, et al. Exploratory evaluation of CD94 expression in canine lymphoid neoplasia. Front Vet Sci. 2025;12:1716800.',
      sourceType: 'Estudo Exploratório de Imunofenotipagem',
      doi: '10.3389/fvets.2025.1716800',
      url: 'https://doi.org/10.3389/fvets.2025.1716800',
      evidenceLevel: 'Estudo exploratório',
    },
    {
      id: 'ref-aalto-2026',
      citationText:
        'Aalto et al. Utility of Cytochemical and Flow Cytometry Detection of Alkaline Phosphatase for Differential Diagnosis of CD34+ Acute Leukaemia in Canines. Vet Comp Oncol. 2026.',
      sourceType: 'Estudo Diagnóstico Prospectivo/Retrospectivo (64 cães CD34+)',
      doi: '10.1111/vco.70024',
      url: 'https://doi.org/10.1111/vco.70024',
      evidenceLevel: 'Estudo diagnóstico contemporâneo',
    },
    {
      id: 'ref-miller-2026',
      citationText:
        'Miller M, et al. Analysis of ADVIA Myeloperoxidase Cytogram LUC Angle Does Not Distinguish Acute Myeloid Leukemia From Acute Lymphoblastic Leukemia or Lymphoblastic Lymphoma in Dogs. Vet Clin Pathol. 2026.',
      sourceType: 'Estudo Prospectivo Multicêntrico (44 cães)',
      doi: '10.1111/vcp.70134',
      url: 'https://doi.org/10.1111/vcp.70134',
      evidenceLevel: 'Estudo diagnóstico prospectivo',
    },
    {
      id: 'ref-sato-2026',
      citationText:
        'Sato M, et al. Acute Myeloid Leukemia With Suspected Basophilic Differentiation in a Cat Negative for Feline Leukemia Virus. Vet Clin Pathol. 2026.',
      sourceType: 'Relato de Caso Felino (FeLV-negativo)',
      doi: '10.1111/vcp.70148',
      url: 'https://doi.org/10.1111/vcp.70148',
      evidenceLevel: 'Nível V — Relato de caso',
    },
    {
      id: 'ref-aberrant-tall-2026',
      citationText:
        'The critical role of flow cytometry in diagnosing aberrant T-cell acute lymphoblastic leukemia in a dog: case report. 2026.',
      sourceType: 'Relato de Caso Canino (CD3+/CD4−/CD8−/CD34+)',
      pmid: '42523662',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42523662/',
      evidenceLevel: 'Nível V — Relato de caso',
    },
    {
      id: 'ref-lee-2022',
      citationText:
        'Lee GW, et al. Case Report: Long-Term Survival of a Dog With Chronic Lymphocytic Leukemia Treated With Chlorambucil, Prednisolone, and Imatinib. Front Vet Sci. 2022;8:625527.',
      sourceType: 'Relato de Caso com Imagens Citológicas (CC BY 4.0)',
      doi: '10.3389/fvets.2021.625527',
      url: 'https://doi.org/10.3389/fvets.2021.625527',
      evidenceLevel: 'Nível V — Relato de caso',
    },
    {
      id: 'ref-ciencia-rural-2025',
      citationText:
        'Leucemia felina: revisão. Ciência Rural. 2025;55.',
      sourceType: 'Revisão Narrativa Brasileira',
      doi: '10.1590/0103-8478cr20240001',
      url: 'https://doi.org/10.1590/0103-8478cr20240001',
      evidenceLevel: 'Revisão narrativa',
    },
    {
      id: 'ref-feline-blood-film',
      citationText:
        'The feline blood film: 2. Leukocyte and platelet morphology. J Feline Med Surg. (Acesso PubMed Central PMC11129198).',
      sourceType: 'Revisão Morfológica Felina',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11129198/',
      evidenceLevel: 'Referência de morfologia hematológica',
    },
    {
      id: 'ref-withrow-6e',
      citationText:
        'Vail DM, Thamm DH, Liptak JM. Withrow and MacEwen’s Small Animal Clinical Oncology. 6th ed. Elsevier; 2020. Cap. 33: Hematopoietic Tumors (CLL canina, leucemias felinas, LMA, MPN e MDS), pp. 712–716, 729–740 (PDF pp. 733–736, 750–761).',
      sourceType: 'Tratado de Oncologia Veterinária',
      evidenceLevel: 'Referência terciária padrão-ouro',
    },
    {
      id: 'ref-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 79 (Lymphoma, p. 1294+), Cap. 80 (Leukemias, pp. 1311–1321), Cap. 82 (Anemia), Cap. 85 (Leukopenia/Leukocytosis) e Cap. 86 (Combined Cytopenias).',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária padrão-ouro',
    },
    {
      id: 'ref-ettinger-9e',
      citationText:
        'Côté E, Ettinger SJ, Feldman EC. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 176 (Myelodysplasia, PDF pp. 964–965) e Cap. 322 (Hematopoietic Tumors — Leukemia, pp. 2249–2252 / PDF pp. 2401–2405).',
      sourceType: 'Tratado de Medicina Interna Veterinária',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-plumb-10e',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Chlorambucil (pp. 243–245 / PDF pp. 270–272), Cytarabine (pp. 330–331 / PDF pp. 357–358) e Hydroxyurea (p. 629 / PDF p. 656).',
      sourceType: 'Compêndio Farmacológico Veterinário',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-feline-ecc-2e',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC. Feline Emergency and Critical Care Medicine. 2nd ed. Wiley-Blackwell; 2023. Cap. 29: Hematologic Emergencies — Anemia, MDS e neoplasias hematopoéticas, pp. 346–348.',
      sourceType: 'Tratado de Emergência e Terapia Intensiva Felina',
      evidenceLevel: 'Referência terciária especializada',
    },
    {
      id: 'ref-bsava-oncology-3e',
      citationText:
        'Dobson JM, Lascelles BDX. BSAVA Manual of Canine and Feline Oncology. 3rd ed. BSAVA; 2011; e Allerton F (ed). BSAVA Small Animal Formulary, Part A. 10th ed. BSAVA; 2020.',
      sourceType: 'Manuais Oncológico e Farmacológico BSAVA',
      evidenceLevel: 'Referência terciária complementar',
    },
  ],
};
