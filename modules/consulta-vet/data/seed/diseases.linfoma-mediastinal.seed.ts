import type { DiseaseRecord } from '../../types/disease';
import type { EditorialClinicalFigure } from '../../types/common';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Linfoma Mediastinal em Cães e Gatos — síntese editorial e clínica Vetius.
 * Padrão editorial estruturado rigorosamente alinhado às diretrizes de excelência acadêmica:
 * integração de literatura contemporânea (Machado et al., 2026; Fabrizio et al., 2014; Bernardi et al., 2020;
 * Yu et al., 2022; Sunpongsri et al., 2022; Reeve et al., 2020; Patterson & Marolf, 2014; Moore et al., 2018; Lana et al., 2006),
 * cruzamento com Withrow & MacEwen 6ª ed., Nelson & Couto 6ª ed., Ettinger 9ª ed., BSAVA Oncology 3ª ed.,
 * e Plumb's Veterinary Drug Handbook 10ª ed.
 * Figuras clínicas abertas integradas, sistema visual sem marcadores de asterisco duplo.
 */

const figura1CitometriaFluxo: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/linfoma-mediastinal/citometria-fluxo-linfoma-vs-timoma.webp',
  alt: 'Citometria de fluxo de massas mediastinais felinas demonstrando células CD4+CD8+ duplo-positivas',
  caption:
    'Figura 1 — Citometria de fluxo de massas mediastinais em gatos. Painéis A–B: lesão não linfomatosa exibindo distribuição polimórfica de subpopulações T normais. Painéis C–D: linfoma T mediastinal felino exibindo expansão clonal homogênea de linfócitos CD4+CD8+ duplo-positivos (67% dos linfomas mediastinais felinos apresentam esse fenótipo). O achado demonstra que a dupla positividade CD4/CD8 não é específica de timoma na espécie felina, exigindo análise citomorfológica e PARR associados. Fonte: Bernardi et al. (2020), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

const figura2RadiografiaToracica: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/linfoma-mediastinal/radiografia-linfoma-mediastinal-yu2022.png',
  alt: 'Radiografias torácicas laterolateral e ventrodorsal de gato com linfoma mediastinal cranial volumoso',
  caption:
    'Figura 2 — Radiografias torácicas de felino jovem com linfoma mediastinal cranial de células T de alto grau. Observam-se volumosa opacidade de tecidos moles ocupando o mediastino cranial, acentuado deslocamento dorsal da traqueia, atenuação da silhueta cardíaca cranial e compressão acentuada dos lobos pulmonares craniais com atelectasia e derrame pleural associado. Fonte: Yu et al. (2022), Veterinární Medicína (CC BY-NC 4.0).',
  display: 'wide',
};

const figura3TomografiaComputadorizada: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/linfoma-mediastinal/tomografia-linfoma-mediastinal-yu2022.png',
  alt: 'Tomografia computadorizada torácica demonstrando massa mediastinal, atelectasia pulmonar e efusão pleural e pericárdica',
  caption:
    'Figura 3 — Tomografia computadorizada torácica pré e pós-contraste de gato com linfoma mediastinal de alto grau. Cortes axiais e reconstruções dorsais revelam grande massa sólida atenuada no mediastino cranial envolvendo vasos da base e veia cava cranial, associada a colapso compressivo dos lobos pulmonares, efusão pleural e derrame pericárdico concomitante. Fonte: Yu et al. (2022), Veterinární Medicína (CC BY-NC 4.0).',
  display: 'wide',
};

const figura4CitologiaEImunocitoquimica: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/linfoma-mediastinal/citologia-linfoma-mediastinal-yu2022.png',
  alt: 'Citopatologia de aspirado de massa mediastinal e imunocitoquímica CD3 positiva',
  caption:
    'Figura 4 — Características citopatológicas e imunocitoquímicas do linfoma mediastinal felino. A citopatologia (coloração de Giemsa) revela proliferação monomórfica de grandes linfócitos atípicos (linfoblastos) com cromatina frouxa, múltiplos nucléolos evidentes, basofilia citoplasmática e mitoses frequentes no aspirado da massa e efusão pleural. A imunocitoquímica (painel inferior) exibe intensa imunorreatividade membranar para CD3, confirmando linhagem T. Fonte: Yu et al. (2022), Veterinární Medicína (CC BY-NC 4.0).',
  display: 'wide',
};

const figura5EvolucaoQuimioterapica: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/linfoma-mediastinal/evolucao-radiografica-quimioterapia-yu2022.png',
  alt: 'Radiografias torácicas seriadas demonstrando rápida remissão tumoral após quimioterapia multiagente L-CHOP',
  caption:
    'Figura 5 — Evolução radiográfica seriada de gato com linfoma mediastinal tratado com protocolo multiagente (L-CHOP). Da esquerda para a direita: radiografia inicial na apresentação de emergência; exame após apenas 48 horas da indução demonstrando acentuada redução da massa mediastinal e rápida reexpansão pulmonar; e remissão radiográfica completa aos 7 dias de tratamento, ilustrando a alta quimiossensibilidade tumoral e contraindicando formalmente cirurgias ressectivas desnecessárias. Fonte: Yu et al. (2022), Veterinární Medicína (CC BY-NC 4.0).',
  display: 'wide',
};

export const linfomaMediastinalRecord: DiseaseRecord = {
  id: 'linfoma-mediastinal-caes-gatos',
  slug: 'linfoma-mediastinal-caes-gatos',
  title: 'Linfoma Mediastinal em Cães e Gatos',
  subtitle:
    'Neoplasia linfoide intratorácica primária, síndrome precaval, hipercalcemia paraneoplásica e protocolos quimioterápicos',
  synonyms: [
    'Linfoma T mediastinal',
    'Linfoma tímico',
    'Linfossarcoma mediastinal cranial',
    'Neoplasia linfoide intratorácica',
  ],
  species: ['canine', 'feline'],
  category: 'oncologia',
  categories: ['oncologia', 'urgencia-emergencia', 'pneumologia', 'medicina-felina'],
  tags: [
    'linfoma',
    'mediastino',
    'oncologia',
    'timo',
    'hipercalcemia',
    'felv',
    'dispneia',
    'quimioterapia',
    'chop',
    'cop',
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['linfoma-mediastinal-caes-gatos'],
  quickSummary: {
    simples:
      'Neoplasia maligna de linfócitos que se desenvolve no mediastino cranial, envolvendo o timo e linfonodos torácicos. Em cães, caracteriza-se por quase 96% de linhagem T e alta frequência de hipercalcemia paraneoplásica grave com poliúria/polidipsia. Em gatos, manifesta-se tipicamente como emergência respiratória restritiva com efusão pleural e perda de compressibilidade do tórax cranial. O tratamento definitivo de escolha é a quimioterapia sistêmica multiagente, devendo-se evitar cirurgia primária e o uso empírico precoce de corticosteroides antes da confirmação citológica.',
    discernimento:
      'Diferencial crítico com timoma: linfoma é uma afecção sistêmica quimiossensível tratada clinicamente, enquanto o timoma não invasivo é cirúrgico. No cão, imunofenotipagem com células CD4+CD8+ apoiava classicamente timoma, mas dados recentes confirmam variantes linfomatosas duplo-positivas agressivas. No gato, a citometria de fluxo revela que até 67% dos linfomas mediastinais são naturalmente CD4+CD8+, tornando a regra canina inaplicável em felinos. A toracocentese deve sempre preceder radiografias estressantes em animais dispneicos.',
  },
  quickDecisionStrip: [
    'Emergência respiratória: oxigenioterapia e toracocentese imediata com mínimo estresse antes de qualquer radiografia forçada.',
    'Quimiossensibilidade vs Cirurgia: linfoma mediastinal é doença sistêmica tratada com quimioterapia; toracotomia ressectiva primária é contraindicada.',
    'Cuidado com corticoide prévio: prednisona ou dexametasona antes da punção induz citólise rápida, mascara o diagnóstico e seleciona clones resistentes por glicoproteína P.',
    'Cão com massa cranial: 95,6% são de células T e 69,1% cursam com hipercalcemia de malignidade sintomática com PU/PD (Machado et al., 2026).',
    'Gato e FeLV: infecção retroviral continua fator etiológico clássico, mas coortes contemporâneas mostram alta proporção de gatos FeLV-negativos (Fabrizio et al., 2014).',
    'Armadilha CD4+CD8+ no Gato: 67% dos linfomas felinos expressam dupla positividade; não use a regra canina de timoma para felinos (Bernardi et al., 2020).',
    'Síndrome da veia cava cranial: compressão vascular venosa torácica gera edema em cabeça, pescoço e membros torácicos (síndrome precaval).',
    'Lise tumoral aguda: massas volumosas altamente quimiossensíveis exigem pré-hidratação vigorosa e controle rigoroso de K, P e Ca nas primeiras 48h.',
    'Protocolo de indução: CHOP (Madison-Wisconsin) continua padrão de referência; protocolos com lomustina (LOP/LOPP) são alternativas em T-cell com atenção à hepatotoxicidade.',
    'Profundidade da resposta felina: gatos que atingem remissão completa apresentam mediana de sobrevida de 980 dias vs apenas 42 dias na remissão parcial (Fabrizio et al., 2014).',
  ],
  quickSummaryRich: {
    lead:
      'O linfoma mediastinal primário representa uma das mais dramáticas e desafiadoras apresentações oncológicas em pequenos animais, concentrando a maior carga tumoral no timo e linfonodos mediastinais craniais e esternais. Apresenta comportamento clínico agudo ou subagudo devido à compressão direta dos lobos pulmonares, efusão pleural concomitante e síndrome da veia cava cranial com edema de cabeça e pescoço. Enquanto em cães a afecção é maciçamente de linhagem T (95,6%) e fortemente associada à hipercalcemia paraneoplásica por secreção ectópica de PTHrP, em gatos ela se manifesta predominantemente como desconforto respiratório restritivo severo, onde a toracocentese de alívio deve obrigatoriamente preceder investigações radiológicas avançadas. O reconhecimento precoce de que o linfoma mediastinal é uma entidade hematolinfoide extremamente quimiossensível — e não um nódulo de indicação cirúrgica — salva vidas, desde que o clínico evite a armadilha de administrar corticosteroides antes da confirmação citológica e proteja o paciente dos riscos metabólicos da síndrome de lise tumoral.',
    leadHighlights: [
      'maior carga tumoral no timo e linfonodos mediastinais',
      'compressão direta dos lobos pulmonares e efusão pleural',
      'síndrome da veia cava cranial com edema de cabeça e pescoço',
      'em cães a afecção é maciçamente de linhagem T (95,6%)',
      'hipercalcemia paraneoplásica por secreção de PTHrP',
      'toracocentese de alívio deve preceder investigações radiológicas',
      'extremamente quimiossensível e não cirúrgico',
      'evitar corticosteroides antes da confirmação citológica',
      'síndrome de lise tumoral',
    ],
    pillars: [
      {
        title: 'Biologia Celular e a Grande Encruzilhada: Linfoma vs Timoma',
        body:
          'O timo é o sítio fisiológico da maturação e seleção de linfócitos T, abrigando naturalmente timócitos imaturos duplo-positivos CD4+CD8+. Em timomas (neoplasias de epitélio tímico), a pobre exfoliação epitelial faz com que a PAAF colete predominantemente esses timócitos normais, mimetizando uma neoplasia linfoide. A distinção exige citopatologia refinada, citometria de fluxo criteriosa e PARR/histopatologia quando necessário.',
        highlights: ['timo', 'linfócitos T', 'CD4+CD8+', 'timomas', 'epitélio tímico', 'PAAF', 'citometria de fluxo', 'PARR'],
      },
      {
        title: 'Fisiopatogenia Mecânica, Efusão Pleural e Síndrome Precaval',
        body:
          'O confinamento anatômico da massa no estreito mediastino cranial desencadeia colapso compressivo pulmonar, perda de complacência torácica, desvio traqueal dorsal e compressão esofágica com disfagia e regurgitação. A obstrução das vias linfáticas e veias craniais precipita efusão pleural (transudato modificado, exsudato neoplásico ou quilotórax) e síndrome da veia cava cranial com edema facial e de membros anteriores.',
        highlights: ['colapso compressivo pulmonar', 'perda de complacência', 'compressão esofágica', 'efusão pleural', 'quilotórax', 'síndrome da veia cava cranial', 'edema facial'],
      },
      {
        title: 'Eixo Paraneoplásico: Hipercalcemia de Malignidade e PTHrP',
        body:
          'No cão com linfoma mediastinal, 69,1% desenvolvem hipercalcemia de malignidade decorrente da produção de PTHrP e citocinas osteoclásticas pelo clone T neoplásico. A hipercalcemia induz diabetes insipidus nefrogênico secundário (bloqueio de receptores de ADH nos túbulos coletores), gerando poliúria e polidipsia compensatória precoces, além de nefrotoxicidade e vasoconstrição renal.',
        highlights: ['69,1%', 'hipercalcemia de malignidade', 'PTHrP', 'clone T', 'diabetes insipidus nefrogênico', 'bloqueio de receptores de ADH', 'poliúria e polidipsia'],
      },
      {
        title: 'Pilares Farmacológicos: Quimioterapia Multiagente e Segurança',
        body:
          'O tratamento apoia-se em protocolos multiagente (CHOP ou COP) com indução rápida. Protocolos contendo lomustina (LOP/LOPP) mostram-se alternativas defensáveis em linfomas T caninos, mas exigem vigilância estrita contra hepatotoxicidade (28,6% de elevações ALT graus 3–4). A hidratação profilática protege contra a lise tumoral aguda, e o corticoide só entra após a colheita celular diagnóstica.',
        highlights: ['CHOP', 'COP', 'lomustina', 'LOP/LOPP', 'hepatotoxicidade', 'lise tumoral aguda', 'corticoide só entra após colheita celular'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxograma sequencial de abordagem diagnóstica e emergencial da massa mediastinal cranial',
      steps: [
        {
          label: '1. Estabilização respiratória de emergência e triagem por POCUS/TFAST',
          timing: 'Primeiros minutos do atendimento',
          detail:
            'Oxigenioterapia passiva ou por fluxo contínuo sob mínimo estresse. Em pacientes com respiração restritiva e padrão toracoabdominal paradoxal, realizar TFAST focado na linha pleural e espaço mediastinal. Se houver efusão pleural significativa, realizar toracocentese bilateral de alívio imediatamente antes de posicionamentos radiográficos forçados.',
        },
        {
          label: '2. Análise citológica e bioquímica imediata do líquido pleural',
          timing: 'Imediatamente após a toracocentese',
          detail:
            'Avaliação física (turvação, coloração), densidade e concentração proteica por refratometria. Confecção de esfregaços corados para citologia: quantificar contagem de células nucleadas totais (TNCC) e pesquisar população dominante monomórfica de blastos atípicos (linfócitos intermediários a grandes). Se leitoso, mensurar triglicérides séricos e pleurais para diagnóstico de quilotórax compressivo.',
        },
        {
          label: '3. Exame radiográfico torácico em três projeções após descompressão',
          timing: 'Após estabilização do padrão respiratório',
          detail:
            'Projeções laterolateral direita, laterolateral esquerda e ventrodorsal. Avaliar opacidade de tecidos moles no mediastino cranial, deslocamento dorsal da traqueia e carina, deslocamento caudal da silhueta cardíaca, compressão e atenuação de lobos pulmonares craniais e presença de linfadenopatia esternal associada.',
        },
        {
          label: '4. Ultrassonografia torácica e PAAF da massa guiada por imagem',
          timing: 'Fase de confirmação tecidual primária',
          detail:
            'A ultrassonografia diferencia componentes sólidos homogêneos (típicos de linfoma) de massas císticas ou heterogêneas (mais sugestivas de timoma). Executar punção aspirativa por agulha fina (PAAF) guiada com agulhas 22–25G, priorizando a periferia e áreas sólidas não necróticas. Amostras para citopatologia e citometria de fluxo.',
        },
        {
          label: '5. Imunofenotipagem por citometria de fluxo e teste PARR',
          timing: 'Caracterização fenotípica e molecular',
          detail:
            'Avaliação de marcadores de membrana (CD3, CD4, CD8, CD21, CD79a, MHC-II). Em cães, confirmar linhagem T (95% dos casos). Em felinos, interpretar com cautela a expressão CD4+CD8+ (fenótipo presente em 67% dos linfomas mediastinais felinos). Em casos inconclusivos ou de pequenas células, submeter amostra a PARR para determinação de clonalidade linfoide.',
        },
        {
          label: '6. Perfil laboratorial completo, estadiamento e testagem retroviral',
          timing: 'Concomitante à investigação anatomopatológica',
          detail:
            'Hemograma completo, cálcio ionizado (essencial em cães), fósforo, ureia, creatinina, ALT, fosfatase alcalina, urinálise e ultrassonografia abdominal para estadiamento (linfonodos retroperitoneais, baço, fígado). Em felinos, testagem sorológica obrigatória para FeLV (antígeno p27) e FIV (anticorpos). Aspirado de medula óssea reservado para citopenias periféricas inexplicáveis.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma sequencial de conduta terapêutica no linfoma mediastinal',
      steps: [
        {
          label: '1. Descompressão torácica, fluidoterapia e correção da hipercalcemia',
          timing: 'Horas 0 a 6 do atendimento de emergência',
          detail:
            'Toracocentese de alívio se dispneia restritiva por derrame. Em cães com hipercalcemia de malignidade, instituir fluidoterapia intensiva com NaCl 0,9% (2 a 3 vezes a taxa de manutenção) para restauração da volemia e natriurese/calciurese renal. Se cálcio ionizado criticamente elevado (>1,8 mmol/L) e paciente hidratado, considerar pamidronato dissódico (1–1,5 mg/kg IV diluído em NaCl 0,9% infundido em 2 a 4 horas).',
        },
        {
          label: '2. Prevenção ativa da síndrome de lise tumoral aguda',
          timing: 'Pré-indução quimioterápica em massas volumosas',
          detail:
            'Hiper-hidratação venosa por pelo menos 4 a 6 horas antes da quimioterapia. Estabelecer valores basais de potássio, fósforo, cálcio e creatinina séricos. Garantir débito urinário adequado (>2 mL/kg/h) e planejar reavaliação bioquímica às 12h, 24h e 48h após a primeira dose quimioterápica.',
        },
        {
          label: '3. Quimioterapia multiagente sistêmica de indução',
          timing: 'Tratamento oncológico de primeira linha',
          detail:
            'Iniciar protocolo quimioterápico após colheita de todas as amostras diagnósticas. No cão: protocolo CHOP (Madison-Wisconsin UW-19) com vincristina, ciclofosfamida, doxorrubicina e prednisona escalonada; ou protocolos com lomustina (LOP/LOPP) sob supervisão especializada. No gato: protocolo COP ou Madison felino (com ou sem L-asparaginase na indução). Jamais realizar toracotomia para ressecção primária.',
        },
        {
          label: '4. Monitorização seriada de toxicidades e órgãos-alvo',
          timing: 'Ao longo do ciclo de manutenção quimioterápica',
          detail:
            'Hemograma completo prévio a cada sessão de quimioterapia: adiar administração se contagem de neutrófilos segmentados estiver abaixo de 1.500/µL ou plaquetas <75.000/µL. Monitorar ALT a cada ciclo se usando lomustina (risco de hepatotoxicidade de 28,6%). Monitorar dose cumulativa de doxorrubicina em cães (<180–240 mg/m²) com ecocardiograma prévio e função renal em felinos. Urinálise seriada para vigilância de cistite hemorrágica estéril por ciclofosfamida.',
        },
      ],
    },
  },
  etiology: {
    definicaoEConceito:
      'O linfoma mediastinal representa a proliferação clonal neoplásica maligna de linfócitos que se desenvolve primariamente nas estruturas linfoides do mediastino cranial, envolvendo fundamentalmente o timo e os linfonodos mediastinais craniais e esternais.

Na prática clínica oncológica, é imprescindível estabelecer a distinção terminológica estrita entre cinco afecções do compartimento torácico cranial:

- Linfoma mediastinal primário: neoplasia na qual a imensa maioria da carga tumoral reside no mediastino cranial, sem linfadenomegalia periférica generalizada primária e com manifestações clínicas decorrentes do efeito compressivo torácico e de síndromes paraneoplásicas. No estudo multicêntrico de Machado et al. (2026) com 70 cães, a presença de linfadenomegalia periférica marcante foi critério de exclusão para caracterizar a entidade mediastinal primária.
- Linfadenomegalia mediastinal em linfoma multicêntrico: aumento reativo ou metastático dos linfonodos intratorácicos no contexto de um linfoma multicêntrico periférico avançado (frequentemente estágio V da OMS), no qual a massa torácica é apenas um dos componentes da doença disseminada.
- Timoma: neoplasia derivada das células epiteliais do timo. Embora seja um tumor de epitélio tímico, é intensamente infiltrado por populações exuberantes de linfócitos T residentes não neoplásicos (timócitos), gerando grande armadilha diagnóstica na citopatologia aspirativa.
- Hiperplasia tímica e cistos mediastinais: processos proliferativos ou congênitos não neoplásicos, benignos, que podem mimetizar massas no exame radiográfico em animais jovens.
- Massa mediastinal cranial: descrição sindrômica e anatômica ampla que abrange linfoma, timoma, carcinomas e adenomas de tireoide ectópica, carcinomas paratireoidianos, sarcomas histiocíticos, hemangiossarcomas, neurofibrossarcomas, granulomas e abscessos fúngicos ou bacterianos.',
    diferencaFundamentalLinfomaTimomaTabela: {
      kind: 'clinicalTable',
      caption: 'Tabela comparativa fundamental: Linfoma Mediastinal versus Timoma em Cães e Gatos',
      headers: [
        'Parâmetro Clínico-Patológico',
        'Linfoma Mediastinal Cranial',
        'Timoma (Neoplasia Epitelial Tímica)',
      ],
      rows: [
        [
          'Origem celular neoplásica',
          'Linfócitos clonais transformados (população clonal maligna)',
          'Células epiteliais tímicas neoplásicas (linfócitos são reativos e normais)',
        ],
        [
          'Celularidade citológica no aspirado',
          'População monomórfica de blastos linfoides (linfócitos intermediários a grandes)',
          'População mista com predomínio de pequenos linfócitos maduros normais e raros epitélios',
        ],
        [
          'Exfoliação de células epiteliais',
          'Ausente',
          'Frequente escassez de células epiteliais pela má exfoliação; pode conter mastócitos',
        ],
        [
          'Aspecto ultrassonográfico',
          'Massa tipicamente sólida, hipoecoica e relativamente homogênea (80% sólida)',
          'Massa marcadamente heterogênea e frequentemente cística (57% cística, 94% heterogênea)',
        ],
        [
          'Padrão tomográfico (TC)',
          'Massa homogênea que circunda/envolve a veia cava cranial (Reeve et al., 2020)',
          'Massa heterogênea (desvio-padrão de atenuação pós-contraste >17 HU indica timoma)',
        ],
        [
          'Hipercalcemia paraneoplásica',
          'Muito comum no cão (69,1% dos casos; Machado et al., 2026; mediada por PTHrP)',
          'Possível, porém muito menos frequente em cães',
        ],
        [
          'Síndromes neuromusculares associadas',
          'Excepcional',
          'Frequente associação com Miastenia Gravis e megaesôfago paraneoplásico',
        ],
        [
          'Dermatite esfoliativa em gatos',
          'Não associada',
          'Síndrome paraneoplásica cutânea clássica do timoma felino',
        ],
        [
          'Citometria de fluxo CD4+CD8+ no CÃO',
          'Historicamente <2% duplo-positivos; timoma clássico >10% (Lana et al., 2006)',
          'População dominante de timócitos normais CD4+CD8+ maduros',
        ],
        [
          'Citometria de fluxo CD4+CD8+ no GATO',
          'Até 67% dos linfomas felinos são CD4+CD8+ (Bernardi et al., 2020); armadilha!',
          'Também apresenta timócitos CD4+CD8+; citometria não diferencia isoladamente',
        ],
        [
          'Tratamento primário de escolha',
          'Quimioterapia sistêmica multiagente (CHOP / COP); afecção não cirúrgica',
          'Ressecção cirúrgica por esternotomia/toracotomia (quando ressecável)',
        ],
      ],
    },
    anatomiaEBasesFisiopatologicas:
      'O mediastino cranial é um compartimento anatômico estreito e inextensível situado entre as duas pleuras mediastinais craniais, contendo estruturas viscerais, vasculares e neurais vitais para a homeostase cardiorrespiratória:

- Traqueia torácica e carina traqueobrônquica: situadas dorsalmente, sofrem compressão e desvio dorsal precoce à medida que a massa linfoide se expande no mediastino pré-cardíaco.
- Esôfago cranial e gânglios autonômicos: a compressão esofágica luminal provoca disfagia progressiva, retenção alimentar no esôfago cervical e regurgitação crônica, estabelecendo elevado risco de pneumonia aspirativa secundária.
- Tronco simpático torácico e gânglio cervicotorácico: as fibras simpáticas que emergem dos segmentos medulares T1–T3 trafegam no mediastino cranial em direção ao olho e anexos oculares. A compressão ou invasão tumoral dessas fibras desencadeia a clássica Síndrome de Horner (miose, ptose palpebral, enoftalmia e protrusão da membrana nictitante), observada principalmente em felinos com grandes massas craniais.
- Grandes vasos venosos e linfáticos: a veia cava cranial e o ducto torácico atravessam esse compartimento sob baixas pressões transmurais. O envolvimento ou compressão circunferencial por linfoma obstrui a drenagem venosa da cabeça, pescoço e membros torácicos (Síndrome da Veia Cava Cranial) e bloqueia o fluxo quilífero torácico, precipitando efusões pleurais sero-hemorrágicas ou quilotórax secundário maciço.',
    biologiaDoTimoEArmadilhaDiagnostica:
      'O timo é o sítio primário de desenvolvimento, maturação e seleção dos linfócitos T. Durante o processo de diferenciação ontogenética intra-tímica normal, os timócitos passam por estágios fenotípicos sucessivos e rigorosamente regulados:

1) Fase Duplo-Negativa: timócitos imaturos precoces não expressam receptores CD4 nem CD8 (CD4-CD8-).
2) Fase Duplo-Positiva: sob a influência do microambiente cortical tímico, ocorre recombinação dos genes do TCR e as células passam a expressar simultaneamente tanto CD4 quanto CD8 na superfície (células CD4+CD8+).
3) Seleção Positiva e Negativa: os timócitos que reconhecem adequadamente o complexo MHC próprio amadurecem e desligam um dos receptores, tornando-se células Simples-Positivas (CD4+CD8- ou CD4-CD8+), prontas para migrar aos linfonodos periféricos.

Essa ontogenia explica as duas maiores armadilhas no diagnóstico diferencial do mediastino:

- No cão: o trabalho clássico de Lana et al. (2006) estabeleceu que a presença de mais de 10% de linfócitos pequenos CD4+CD8+ na citometria de fluxo favorecia amplamente timoma, enquanto linfomas tipicamente apresentavam menos de 2% de células duplo-positivas. Contudo, a recente coorte de Machado et al. (2026) demonstrou que verdadeiros linfomas de células T de alto grau podem derivar de clones interrompidos no estágio tímico duplo-positivo, apresentando células tumorais CD4+CD8+ e cursando inclusive com curso clínico mais agressivo.
- No gato: a armadilha é ainda mais contundente. Bernardi et al. (2020) demonstraram que 8 em cada 12 gatos (66,7%) com linfoma mediastinal apresentavam fenótipo dominante CD4+CD8+ duplo-positivo. Portanto, na espécie felina, a identificação de linfócitos CD4+CD8+ na citometria NÃO diagnostica timoma, sendo indispensável correlacionar o tamanho celular (razão de Forward Scatter - FSC > 1,30 sugere linfoma de grandes células) e clonabilidade por PARR.',
    figura1CitometriaFluxo,
  },
  epidemiology: {
    distribuicaoPorEspecieETabela: {
      kind: 'clinicalTable',
      caption: 'Características epidemiológicas e biológicas comparadas: Cães versus Gatos no Linfoma Mediastinal',
      headers: [
        'Variável Epidemiológica',
        'Espécie Canina (Cão)',
        'Espécie Felina (Gato)',
      ],
      rows: [
        [
          'Frequência relativa de linfoma mediastinal',
          'Relativamente incomum (<5% a 10% de todos os linfomas caninos)',
          'Historicamente muito frequente (terceiro sítio anatômico mais comum)',
        ],
        [
          'Idade mediana na apresentação',
          '6 anos (amplitude de 0,8 a 12 anos; Machado et al., 2026)',
          '3 anos (amplitude de 0,5 a 15 anos; Fabrizio et al., 2014)',
        ],
        [
          'Predisposição racial documentada',
          'Labrador Retriever (24,3%), Boxer (15,7%), Golden Retriever',
          'Siamês e raças orientais relacionadas (OR significativamente elevado)',
        ],
        [
          'Linhagem imunofenotípica predominante',
          'Maciçamente Linfócitos T (95,6% dos casos imunofenotipados)',
          'Predomínio de Linfócitos T (frequentemente CD4+CD8+)',
        ],
        [
          'Frequência de hipercalcemia de malignidade',
          '69,1% dos casos (Machado et al., 2026); marcador clínico primordial',
          'Incomum a rara (<5% dos casos de linfoma mediastinal felino)',
        ],
        [
          'Associação com retroviroses (FeLV / FIV)',
          'Não aplicável na espécie canina',
          'Historicamente >80% FeLV+; em coortes modernas britânicas ~10% (Fabrizio et al.)',
        ],
        [
          'Subestágio clínico na apresentação inicial',
          '90% chegam em subestágio b (sintomáticos, doença sistêmica franca)',
          'Praticamente todos chegam sintomáticos (dispneia aguda restritiva)',
        ],
      ],
    },
    oncogeneseERetrovirusFelino:
      'Em gatos, a oncogênese retroviral induzida pelo vírus da leucemia felina (FeLV) permanece o modelo clássico de transformação neoplásica linfoide. O vírus integra seu DNA proviral no genoma do linfócito hospedeiro, podendo provocar mutagênese insercional ativando proto-oncogenes celulares (como c-myc) ou desregulando pontos de checagem do ciclo celular. Contudo, nas últimas duas décadas, programas rigorosos de testagem, isolamento e vacinação contra FeLV alteraram profundamente o perfil epidemiológico mundial:

- Coortes modernas (como Fabrizio et al., 2014) revelaram que a maioria dos gatos atendidos com linfoma mediastinal no Reino Unido era FeLV-negativa (apenas 5 de 55 eram positivos para o antígeno p27).
- Constatou-se uma predisposição genética marcante em gatos da raça Siamês e correlatas (compreendendo 21,8% da casuística de Fabrizio et al.), que desenvolvem a doença em idades jovens independentemente do status retroviral.
- Paralelamente, em regiões onde o FeLV ainda é hiperendêmico, o estudo de Sunpongsri et al. (2022) com 92 gatos FeLV-antígeno positivos comprovou que esses animais, quando submetidos a quimioterapia adequada (protocolo COP), alcançam resposta global de 96,7% e mediana de sobrevida de 338 dias, superando as estimativas históricas pessimistas de apenas 2 a 3 meses de vida.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Dispneia restritiva com respiração curta e superficial e taquipneia marcante',
          mechanism:
            'A massa mediastinal volumosa ocupa fisicamente o espaço intratorácico cranial, promovendo compressão extrínseca dos lobos pulmonares craniais, colapso alveolar (atelectasia compressiva), redução drástica do volume corrente e grave incompatibilidade ventilação-perfusão (desequilíbrio V/Q com efeito shunt intrapulmonar).',
          clinicalMeaning: 'Manifestação clínica primordial e motivo de atendimento de emergência; exige estabilização imediata em ambiente enriquecido de oxigênio.',
          priority: 'emergency',
          context: ['Desconforto respiratório restritivo agudo'],
        },
        {
          finding: 'Efusão pleural bilateral com abafamento sonoro à auscultação torácica ventral',
          mechanism:
            'Obstrução dos vasos linfáticos mediastinais drenantes e da veia cava cranial pelo tumor, aumento da pressão hidrostática capilar e infiltração neoplásica direta das superfícies pleurais. Nos casos com compressão do ducto torácico, precipita-se quilotórax com acúmulo de líquido leitoso rico em quilomícrons.',
          clinicalMeaning: 'Achado de alta prevalência (cerca de metade dos gatos com massa mediastinal); impõe toracocentese diagnóstica e terapêutica imediata.',
          priority: 'emergency',
          context: ['Derrame pleural / Quilotórax neoplásico'],
        },
        {
          finding: 'Diminuição acentuada da compressibilidade do tórax cranial em felinos à palpação',
          mechanism:
            'Substituição do parênquima pulmonar elástico normal no terço cranial da cavidade torácica por uma massa tumoral sólida volumosa, rígida e inextensível preenchendo o mediastino anterior.',
          clinicalMeaning: 'Sinal propedêutico semiológico clássico da medicina felina (Nelson & Couto 6ª ed., p. 364); sugere massa mediastinal mesmo antes da realização de radiografias.',
          priority: 'common',
        },
        {
          finding: 'Tosse paroxística seca e não produtiva',
          mechanism:
            'Compressão mecânica extrínseca sobre a parede ventral da traqueia torácica e sobre a carina e brônquios principais, ativando receptores de tosse epiteliais vagais.',
          clinicalMeaning: 'Mais comum em cães do que em gatos; frequentemente confundida com afecção de vias aéreas inferiores ou colapso traqueal.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Síndrome da Veia Cava Cranial (Síndrome Precaval) com edema facial, cervical e de membros torácicos',
          mechanism:
            'Compressão extrínseca ou trombose/invasão neoplásica da veia cava cranial pela massa mediastinal, impedindo o retorno venoso normal da porção cranial do corpo e gerando estase venosa craniolateral, aumento da pressão hidrostática e extravasamento de fluido para o interstício cefálico.',
          clinicalMeaning: 'Sinal patognomônico de localização anatômica mediastinal cranial; requer diferenciação de anafilaxia ou celulite cervical.',
          priority: 'emergency',
          context: ['Síndrome precaval vascular'],
        },
        {
          finding: 'Ingurgitamento jugular persistente e circulação colateral cutânea subcutânea visível',
          mechanism:
            'Bloqueio do fluxo cavocranial transmitindo hipertensão retrógrada para as veias jugulares e rede venosa torácica superficial e toracoepigástrica.',
          clinicalMeaning: 'Confirma comprometimento hemodinâmico por compressão vascular intratorácica grave.',
          priority: 'emergency',
        },
        {
          finding: 'Abafamento das bulhas cardíacas e efusão pericárdica associada',
          mechanism:
            'Deslocamento caudal e dorsal da silhueta cardíaca pelo tumor mediastinal, atenuação acústica gerada pelo derrame pleural interposto e, em casos invasivos, transudação ou invasão neoplásica direta do saco pericárdico (Yu et al., 2022).',
          clinicalMeaning: 'Exige avaliação por ecocardiograma e monitoramento de débito cardíaco para descartar tamponamento cardíaco concomitante.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Apresentação em subestágio b da OMS (anorexia, caquexia neoplásica e depressão intensa)',
          mechanism:
            'Liberação maciça de citocinas inflamatórias tumorais (TNF-alfa, IL-1, IL-6), aumento do catabolismo proteico-energético, dor torácica compressiva e sofrimento respiratório sustentado. No estudo de Machado et al. (2026), 90% dos cães apresentavam-se no subestágio b.',
          clinicalMeaning: 'Demonstra a gravidade sistêmica da apresentação primária e fundamenta prognóstico reservado se não houver indução quimioterápica rápida.',
          priority: 'systemic',
        },
        {
          finding: 'Perda de peso progressiva e atrofia muscular temporal',
          mechanism:
            'Síndrome consuntiva oncológica crônica associada à hiporexia reflexa e aumento do consumo energético pelos blastos tumorais em rápida proliferação.',
          clinicalMeaning: 'Avaliar escore de condição corporal e muscular; orientar suporte nutricional precoce.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Regurgitação pós-prandial imediata e disfagia mecânica',
          mechanism:
            'Compressão extrínseca circunferencial do esôfago cranial pela massa mediastinal, estreitando a luz esofágica e gerando retenção intraluminal do bolo alimentar e dilatação esofágica proximal por refluxo mecânico.',
          clinicalMeaning: 'Diferencial vital com megaesôfago generalizado de timoma (miastenia gravis); alerta para o risco iminente de pneumonia aspirativa.',
          priority: 'emergency',
          context: ['Compressão esofágica mecânica'],
        },
        {
          finding: 'Êmese reflexa e náusea contínua',
          mechanism:
            'Estimulação de receptores vagais esofágicos e gástricos por efeito de massa torácica e, nos animais hipercalcêmicos, estímulo direto na quimiorreceptora da zona de gatilho (CRTZ) pela hipercalcemia sérica.',
          clinicalMeaning: 'Presente em até 30% dos cães (Machado et al., 2026); manejar com antieméticos de ação central (maropitant) e hidratação.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neurological',
      findings: [
        {
          finding: 'Síndrome de Horner unilateral (miose, ptose palpebral, enoftalmia e prolapso de terceira pálpebra)',
          mechanism:
            'Compressão ou infiltração direta das fibras simpáticas pré-ganglionares do tronco simpático torácico cervical enquanto estas atravessam o mediastino cranial.',
          clinicalMeaning: 'Achado neurológico clássico de grande valor topográfico; confirma invasão ou compressão no compartimento torácico cranial (mais comum em felinos).',
          priority: 'systemic',
          context: ['Compressão da via simpática torácica'],
        },
      ],
    },
    {
      system: 'metabolic',
      findings: [
        {
          finding: 'Poliúria e polidipsia (PU/PD) marcantes e persistentes',
          mechanism:
            'Hipercalcemia paraneoplásica induzida por secreção tumoral ectópica de peptídeo relacionado ao paratormônio (PTHrP) atuando nos túbulos renais: antagoniza a ação do hormônio antidiurético (ADH/vasopressina) nos receptores V2 dos ductos coletores (diabetes insipidus nefrogênico secundário) e inibe a reabsorção tubular de sódio e cloreto no ramo ascendente espesso da alça de Henle.',
          clinicalMeaning: 'Sinal revelador de extrema importância diagnóstica no cão; cerca de metade dos cães com linfoma mediastinal tem queixa primária de PU/PD antes da dispneia.',
          priority: 'emergency',
          context: ['Eixo paraneoplásico hipercalcêmico'],
        },
        {
          finding: 'Fraqueza muscular generalizada, tremores, arritmias cardíacas e letargia extrema',
          mechanism:
            'Efeito estabilizador de membrana da hipercalcemia severa sobre neurônios e junções neuromusculares, redução do intervalo QT cardíaco, vasoconstrição arteriolar renal e nefrotoxicidade direta.',
          clinicalMeaning: 'Condição crítica de emergência metabólica com risco de parada cardíaca ou lesão renal aguda irreversível se o cálcio não for corrigido rapidamente.',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Estabilização de emergência e toracocentese ecoguiada prévia ("Toracocentese antes de radiografia")',
      purpose: 'Aliviar imediatamente o colapso respiratório e obter amostra de efusão pleural para análise sem expor o paciente ao estresse fatal do decúbito forçado.',
      description:
        'Em todo cão ou gato com dispneia restritiva, respiração de boca aberta ou padrão paradoxal, o posicionamento em decúbito para radiografias torácicas de três projeções está formalmente proscrito antes da estabilização. Fornecer oxigênio por fluxo direto ou gaiola de oxigênio sob mínimo estresse. Realizar ultrassonografia rápida à beira do leito (POCUS/TFAST) em estação para confirmar efusão pleural. Executar toracocentese terapêutica bilateral no 7º ou 8º espaço intercostal, na junção costocondral, acoplando agulha/cateter 21–23G conectado a equipo com torneira de três vias e seringa. Drenar o máximo volume possível de líquido com técnica estéril e armazenar alíquotas em tubos com EDTA e sem anticoagulante.',
      interpretation:
        'Alívio imediato do padrão respiratório comprova componente restritivo por derrame pleural. Amostra obtida subsidia análise física, bioquímica e citológica imediata.',
      limitations:
        'A ausência de efusão pleural no TFAST indica que o desconforto respiratório decorre exclusivamente da massa tumoral sólida e atelectasia compressiva, exigindo continuidade do oxigênio e imagem em decúbito esternal mínimo.',
    },
    {
      stepNumber: 2,
      title: 'Análise físico-química e citopatologia imediata do líquido pleural',
      purpose: 'Caracterizar a natureza da efusão e obter diagnóstico definitivo ou presuntivo de neoplasia linfoide sem punção intratorácica invasiva.',
      description:
        'Avaliar coloração, aspecto (límpido, turvo, hemorrágico, quiloso) e mensurar proteína total por refratometria e contagem celular de leucócitos nucleados totais (TNCC). Confeccionar lâminas de esfregaço imediatamente para citologia. O líquido do linfoma mediastinal pode variar entre transudato modificado, exsudato neoplásico ou quilotórax secundário à compressão mecânica do ducto torácico (Nelson & Couto 6ª ed., p. 374). Se quiloso, dosar triglicérides e colesterol na efusão comparando com o soro (triglicérides na efusão maiores que no soro confirmam quilotórax).',
      interpretation:
        'A identificação de uma população monomórfica exuberante de linfócitos intermediários a grandes (linfoblastos com cromatina frouxa, nucléolos proeminentes e frequentes figuras de mitose) no sedimento pleural confirma o diagnóstico de linfoma sem a necessidade de puncionar diretamente a massa torácica.',
      limitations:
        'Em quilotórax crônico não neoplásico puro, há abundância de pequenos linfócitos maduros normais que podem induzir confusão se o examinador não diferenciar linfócitos maduros de blastos neoplásicos.',
    },
    {
      stepNumber: 3,
      title: 'Exame radiográfico torácico em três projeções após descompressão torácica',
      purpose: 'Identificar a massa mediastinal cranial, avaliar sua extensão volumétrica, desvios anatômicos e investigar metástases pleuropulmonares.',
      description:
        'Após a toracocentese e restabelecimento de ventilação segura, realizar radiografias torácicas nas projeções laterolateral direita, laterolateral esquerda e ventrodorsal (ou dorsoventral se houver qualquer instabilidade residual). Avaliar opacidade de tecidos moles homogênea ocupando o mediastino cranial, acentuada elevação e deslocamento dorsal da traqueia, afastamento caudal da silhueta cardíaca, lobos pulmonares craniais retraídos e atelectásicos, alargamento do mediastino cranial na projeção ventrodorsal e linfadenopatia esternal associada.',
      interpretation:
        'Massa homogênea com desvio dorsal traqueal confirma afecção de mediastino cranial. Repetir as projeções após drenagem completa de derrames abundantes para não subestimar o volume tumoral.',
      limitations:
        'A radiografia torácica localiza e quantifica a massa, mas é incapaz de diferenciar com segurança linfoma de timoma, cistos branquiais ou neoplasias tireoidianas ectópicas.',
    },
    {
      stepNumber: 4,
      title: 'Ultrassonografia torácica e Tomografia Computadorizada (TC)',
      purpose: 'Mapear a arquitetura interna da massa, vascularização, invasão de grandes vasos e planejar punção ou biópsia segura.',
      description:
        'A ultrassonografia torácica avalia a ecotextura da massa: linfomas mediastinais apresentam-se tipicamente como massas sólidas (80%), hipoecoicas e relativamente homogêneas, enquanto timomas exibem ecotextura heterogênea (94%) e múltiplas áreas císticas anecoicas intralesionais (57%; Patterson & Marolf, 2014). A tomografia computadorizada multislice com contraste iodado intravenoso detalha a invasão da veia cava cranial (mais comum no linfoma; Reeve et al., 2020) e avalia a heterogeneidade tumoral (desvio-padrão de atenuação pós-contraste >17 HU favorece timoma com Se 72% e Sp 79%).',
      interpretation:
        'Massa sólida hipoecoica com envolvimento da veia cava favorece fortemente linfoma mediastinal; massa heterogênea com cavidades císticas favorece timoma.',
      limitations:
        'A sobreposição de achados imagiológicos impede diagnóstico confirmatório isolado; a confirmação histocitológica é estritamente mandatória.',
    },
    {
      stepNumber: 5,
      isGoldStandard: true,
      title: 'Punção Aspirativa por Agulha Fina (PAAF) guiada por imagem e Citopatologia',
      purpose: 'Padrão ouro para diagnóstico confirmatório celular de linfoma mediastinal de grandes células.',
      description:
        'Realizada sob visualização ultrassonográfica em tempo real, utilizando agulhas finas de calibre 22 a 25G acopladas a seringas de 5 a 10 mL (ou técnica de capilaridade pura sem aspiração para minimizar contaminação hemática). Puncionar as porções sólidas e periféricas da massa, evitando áreas necróticas centrais e grandes vasos da base cardíaca. Confeccionar esfregaços por deslizamento delicado e corar por panótico rápido ou Giemsa para leitura citopatológica imediata. A citopatologia revela população monomórfica maciça de linfoblastos intermediários a grandes, com núcleo 1,5 a 3 vezes o diâmetro de uma hemácia, cromatina nuclear frouxa rendilhada, múltiplos nucléolos volumosos, figuras de mitose atípicas e basofilia citoplasmática marcante com corpúsculos linfoglandulares de fundo.',
      interpretation:
        'População monomórfica dominante de linfoblastos atípicos fecha o diagnóstico citopatológico de linfoma de alto grau, autorizando o início da quimioterapia sistêmica.',
      limitations:
        'Em linfomas de pequenas a intermediárias células, a citologia pode sobrepor-se ao aspirado de timoma (rico em pequenos timócitos reativos), exigindo imunofenotipagem e PARR.',
    },
    {
      stepNumber: 6,
      title: 'Imunofenotipagem por Citometria de Fluxo e PCR para Rearranjo Antigênico (PARR)',
      purpose: 'Determinar a linhagem celular (T versus B), avaliar imunofenótipo específico e confirmar clonalidade linfoide neoplásica.',
      description:
        'Encaminhar aspirado celular recente em meio de transporte celular para citometria de fluxo com painel completo de anticorpos monoclonais (CD3, CD4, CD8, CD21, CD79a, MHC-II). No cão, confirma linhagem T em aproximadamente 95,6% dos casos (Machado et al., 2026). No gato, Bernardi et al. (2020) demonstraram que 67% dos linfomas mediastinais são duplo-positivos CD4+CD8+; portanto, avaliar a razão de Forward Scatter (FSC > 1,30 reflete blastos volumosos) para corroborar neoplasia. O teste PARR pesquisa a clonalidade molecular dos receptores de células T (TCR-gama) e imunoglobulinas (IgH): padrão monoclonal clonal confirma malignidade e afasta populações reativas policlonais.',
      interpretation:
        'Monoclonalidade T e expansão homogênea fenotípica confirmam linfoma T de alto grau. População policlonal mista com predominância de pequenas células favorece timoma.',
      limitations:
        'Falsos negativos no PARR podem ocorrer em até 10% a 15% dos casos por degradação do DNA ou falha de hibridização dos iniciadores; a clínica e a citopatologia prevalecem.',
    },
    {
      stepNumber: 7,
      title: 'Triagem paraneoplásica metabólica (cálcio ionizado), perfil hematológico e retroviral felino',
      purpose: 'Identificar hipercalcemia de malignidade, monitorar órgãos-alvo basais, estadiar e definir status infeccioso por FeLV/FIV.',
      description:
        'Coleta de sangue venoso para dosagem de cálcio ionizado (padrão ouro em cães, detectando hipercalcemia real biologicamente ativa), cálcio total, fósforo, ureia, creatinina, eletrólitos (Na, K, Cl), proteínas totais e frações, ALT, fosfatase alcalina e urinálise completa com densidade refratométrica. Em cães hipercalcêmicos, documentar o produto cálcio x fósforo (se >60–70 mg²/dL², risco crítico de mineralização metastática de tecidos moles). Realizar hemograma com contagem de plaquetas e esfregaço de sangue periférico para avaliar fase leucêmica circulante ou citopenias medulares. Em todos os felinos, realizar teste sorológico obrigatório de ELISA para antígeno p27 de FeLV e anticorpos anti-FIV.',
      interpretation:
        'Hipercalcemia ionizada em cão com massa torácica cranial é altamente preditiva de linfoma T mediastinal (69,1% dos casos). Neutropenia e trombocitopenia basais constituem fatores de pior prognóstico e alertam para infiltração de medula óssea.',
      limitations:
        'Cálcio total pode subestimar ou superestimar a fração biologicamente ativa na presença de hipoalbuminemia ou alterações ácido-básicas; o cálcio ionizado deve ser sempre priorizado.',
    },
  ],
  treatment: {
    metaPrimaria:
      'O linfoma mediastinal é uma neoplasia hematolinfoide de comportamento biológico sistêmico e extrema sensibilidade aos agentes quimioterápicos citotóxicos. O objetivo primário imediato consiste em obter citoredução tumoral massiva e rápida, restaurar a expansão pulmonar e desobstruir as vias venosas e linfáticas intratorácicas, prevenindo a morte por insuficiência respiratória restritiva ou tamponamento vascular.

Princípios oncológicos inegociáveis no manejo do linfoma mediastinal:

- Contraindicação formal de toracotomia ressectiva primária: a excisão cirúrgica não erradica clones microscópicos circulantes ou nodais e impõe morbimortalidade anestésico-cirúrgica proibitiva a um paciente com excelente resposta farmacológica esperada. Massas gigantescas reduzem de volume em 48 a 72 horas após quimioterapia (Figura 5).
- Proibição do uso empírico precoce de corticosteroides: administrar prednisona, prednisolona ou dexametasona antes da realização da PAAF e citometria de fluxo induz citólise tumoral maciça, altera a morfologia celular, pode tornar a citologia falso-negativa e seleciona clones neoplásicos resistentes através da superexpressão de bombas de efluxo de glicoproteína P (MDR1), reduzindo drasticamente a eficácia dos protocolos quimioterápicos subsequentes.
- Pré-hidratação mandatória contra lise tumoral: em massas de grande volume, a morte síncrona de bilhões de células neoplásicas após quimioterapia desencadeia liberação aguda de potássio, fosfato e ácidos nucleicos na circulação, exigindo fluidoterapia preventiva para proteger a função tubular renal.',
    protocoloCHOPCanino:
      'Protocolo de Madison-Wisconsin (UW-19 canino) — Referência de primeira linha em cães com linfoma mediastinal de células intermediárias a grandes (Withrow & MacEwen 6ª ed., p. 705; Moore et al., 2018):

- Semana 1: Vincristina 0,7 mg/m² IV estrito em bólus lento (assegurar perviedade vascular absoluta devido ao risco de necrose tecidual por extravasamento) + Prednisona 2 mg/kg/dia VO por 7 dias.
- Semana 2: Ciclofosfamida 200 a 250 mg/m² IV (em infusão de 15–30 min) ou VO fracionada + Prednisona 1,5 mg/kg/dia VO por 7 dias. Estimular diurese hídrica abundante e micção frequente para prevenir cistite hemorrágica estéril por acroleína.
- Semana 3: Vincristina 0,7 mg/m² IV + Prednisona 1,0 mg/kg/dia VO por 7 dias.
- Semana 4: Doxorrubicina 30 mg/m² IV em cães pesando acima de 15 kg (ou 1,0 mg/kg IV para cães com peso inferior ou igual a 15 kg) infundida lentamente diluída em NaCl 0,9% ao longo de 20 a 30 minutos, sob monitoração eletrocardiográfica estrita + Prednisona 0,5 mg/kg/dia VO por 7 dias.
- Semana 5: Intervalo sem quimioterapia (descanso medular e avaliação clínica).
- Semanas 6 a 19: Repetição alternada dos ciclos conforme o cronograma do protocolo UW-19, totalizando 4 doses de doxorrubicina ao final da semana 19 (dose cumulativa total de 120 mg/m², amplamente segura em relação ao limite cardiotóxico canino de 180–240 mg/m²).
- Critério de interrupção ou adiamento de sessão: realizar hemograma antes de cada aplicação; adiar a quimioterapia por 5 a 7 dias se a contagem de neutrófilos segmentados estiver abaixo de 1.500/µL ou plaquetas inferiores a 75.000/µL.',
    protocoloCOPFelino:
      'Protocolos quimioterápicos para Linfoma Mediastinal Felino (Withrow & MacEwen 6ª ed., p. 722; Sunpongsri et al., 2022; Fabrizio et al., 2014):

1) Protocolo COP Felino (Indução e Manutenção):
- Ciclofosfamida: 200 a 300 mg/m² PO a cada 3 a 4 semanas (ou 50 mg/m² PO em dias alternados por 8 semanas, adaptado à tolerância individual).
- Vincristina: 0,5 a 0,7 mg/m² IV a cada 7 a 14 dias nas primeiras 4 a 6 semanas, passando para quinzenal.
- Prednisolona: 2,0 mg/kg/dia VO durante as primeiras 2 a 4 semanas, reduzindo progressivamente para 1,0 mg/kg em dias alternados conforme a resposta tumoral.
- Eficácia em gatos FeLV-positivos: Sunpongsri et al. (2022) demonstraram que gatos naturalmente infectados por FeLV tratados com protocolo COP atingiram taxa de resposta global de 96,7% (remissão completa de 81,5%), com mediana de sobrevida de 338 dias, demonstrando excelente tolerância e eficácia clínica.

2) Protocolo Multiagente Felino baseado em Doxorrubicina (L-CHOP Felino):
- Empregado quando se busca a máxima probabilidade de remissão completa sustentada (Fabrizio et al., 2014; Yu et al., 2022).
- Vincristina 0,5–0,7 mg/m² IV + L-asparaginase 400 UI/kg SC/IM na primeira semana, seguido de Ciclofosfamida 200 mg/m² PO na semana 2, Vincristina na semana 3 e Doxorrubicina 20 a 25 mg/m² IV lenta (ou 1 mg/kg para gatos <3 kg) na semana 4 associada a prednisolona contínua. Em gatos, monitorar ureia, creatinina e urinálise devido ao potencial nefrotóxico cumulativo da doxorrubicina nesta espécie.',
    protocolosAlternativosLomustina:
      'Protocolos à base de Alquilantes Nitrosoureias (Lomustina / CCNU) e Linfoma T Canino:

- Fundamento farmacológico: linfócitos T neoplásicos exibem elevada quimiossensibilidade a agentes lipofílicos alquilantes que penetram barreiras teciduais, como a lomustina (CCNU), associada a alcaloides da vinca e procarbazina (protocolos LOP, LOPP ou CEOP).
- Análise crítica do estudo multicêntrico de Machado et al. (2026): avaliando 70 cães com linfoma mediastinal primário, os autores compararam protocolos baseados em antraciclinas (CHOP/CEOP) contra protocolos baseados em lomustina (LOP/LOPP). Não houve diferença estatisticamente significativa entre os regimes quanto à taxa de resposta objetiva (97,9%), sobrevida livre de progressão (mediana de 132 dias) ou sobrevida global (mediana de 223 dias).
- Risco hepatotóxico mandatório da Lomustina: o estudo de 2026 alertou que 28,6% dos cães tratados com lomustina desenvolveram hepatotoxicidade grave com elevação de ALT graus 3 a 4 do VCOG-CTCAE (>5 a 20 vezes o limite superior), sendo a lesão hepática responsável por 7 das 9 interrupções prematuras do tratamento com lomustina. Portanto, regimes com lomustina (60 a 70 mg/m² PO a cada 3 a 4 semanas) exigem suplementação hepatoprotetora profilática com S-adenosilmetionina (SAMe 20 mg/kg/dia) e monitoração estrita de ALT antes de cada ciclo.',
    manejoHipercalcemiaMalignidade:
      'Abordagem emergencial da Hipercalcemia de Malignidade no cão com Linfoma Mediastinal (Nelson & Couto 6ª ed., p. 1294; Ettinger 9ª ed.; Fluid, Electrolyte and Acid-Base Disorders 5ª ed.):

1) Expansão volêmica com fluidoterapia de NaCl 0,9% (Pilar Inicial Absoluto):
- O sódio compete diretamente com o cálcio pelos sítios de reabsorção passiva no ramo ascendente da alça de Henle. A administração de NaCl 0,9% na taxa de 2 a 3 vezes a manutenção (60 a 90 mL/kg/dia) restaura a filtração glomerular, expande o intravascular e promove natriurese e calciurese acentuadas.
- Evitar fluidos contendo cálcio (como Ringer com lactato).

2) Uso criterioso de diuréticos de alça (Furosemida):
- A furosemida inibe o cotransportador Na+/K+/2Cl- na alça de Henle, bloqueando o potencial positivo intraluminal e impedindo a reabsorção de cálcio, promovendo calciurese vigorosa.
- Regra crítica de segurança: JAMAIS administrar furosemida antes de corrigir completamente o déficit de volume intravascular do paciente. Em animais desidratados, o diurético agrava a hipovolemia, reduz o ritmo de filtração glomerular e piora drasticamente a lesão renal hipercalcêmica. Dose após hidratação: 1 a 2 mg/kg IV a cada 8 a 12 horas.

3) Terapia anti-reabsortiva óssea com Bisfosfonatos:
- Indicada na hipercalcemia refratária sintomática severa (cálcio ionizado >1,8 mmol/L ou produto Ca x P >60). O pamidronato dissódico atua inibindo os osteoclastos e bloqueando a reabsorção óssea paraneoplásica induzida por PTHrP.
- Dose: 1,0 a 1,5 mg/kg em cães, diluído em 250 a 500 mL de NaCl 0,9% e infundido lentamente por via intravenosa durante 2 a 4 horas. Monitorar creatinina e eletrólitos.

4) Resolução definitiva da causa:
- O início da quimioterapia sistêmica multiagente constitui o tratamento definitivo: a destruição dos linfoblastos secretores de PTHrP normaliza a calcemia nas primeiras 24 a 48 horas após a indução.',
    sindromeLiseTumoralPrevencao:
      'Prevenção ativa da Síndrome de Lise Tumoral Aguda (ATLS - Acute Tumor Lysis Syndrome):

- Fisiopatologia: afecção metabólica de emergência decorrente da destruição em massa e lise celular de linfoblastos altamente quimiossensíveis após a primeira dose de quimioterapia. A liberação maciça de constituintes intracelulares na circulação desencadeia a tétrade clássica: 1) Hipercalemia arritmogênica; 2) Hiperfosfatemia aguda; 3) Hipocalcemia secundária por precipitação tecidual de fosfato de cálcio; e 4) Azotemia com lesão renal aguda decorrente da deposição tubular intratubular de cristais de fosfato de cálcio e ácido úrico.
- População de altíssimo risco: pacientes com grandes massas mediastinais craniais palpáveis ou radiográficas, carga tumoral volumosa, envolvimento de linfonodos torácicos múltiplos e azotemia pré-existente.
- Protocolo de prevenção pré-indução: hiper-hidratação intravenosa com solução cristaloide isotônica balanceada na taxa de 60 a 90 mL/kg/dia iniciada pelo menos 4 a 6 horas antes da administração do primeiro agente antineoplásico, assegurando débito urinário copioso (>2 a 3 mL/kg/h). Dosar eletrólitos basais (K, P, Ca total e ionizado) e creatinina antes da quimioterapia e reavaliar obrigatoriamente às 12, 24 e 48 horas pós-tratamento.',
    terapiasInadequadasECirurgia:
      'Condutas formalmente contraindicadas e armadilhas terapêuticas que devem ser evitadas:

- Toracotomia exploratória ou ressecção primária da massa mediastinal: o linfoma mediastinal primário não é uma doença de abordagem cirúrgica. A cirurgia não melhora a sobrevida, possui alta mortalidade transoperatória devido ao encarceramento de grandes vasos e expõe o paciente a dor torácica severa e risco de insuficiência respiratória aguda. A quimioterapia é comprovadamente capaz de promover remissão radiográfica quase total em menos de uma semana (Yu et al., 2022).
- Corticoterapia em monoterapia pré-diagnóstica: prescrever prednisona ou dexametasona antes da conclusão dos exames citológicos e citométricos destrói as evidências morfológicas e induz resistência farmacológica cruzada irreversível via glicoproteína P.
- Drenagem torácica de repetição sem quimioterapia: toracocenteses evacuatórias diárias sem tratamento antineoplásico causam depleção proteica e linfocitária sistêmica severa no paciente com quilotórax ou efusão neoplásica.
- Administração de cisplatina em felinos: a cisplatina é absolutamente contraindicada em gatos por causar edema pulmonar fulminante e óbito por asfixia ("Cisplatina em gatos causa edema fatal").',
    monitoramentoSeriadoEOrgaosAlvo:
      'Vigilância oncológica e monitoramento de órgãos-alvo ao longo dos ciclos de tratamento:

- Avaliação clínica respiratória: mensuração da frequência respiratória em repouso domiciliar pelo tutor (alerta de recidiva se FR > 30–35 mpm em repouso) e auscultação torácica ambulatorial a cada visita.
- Hemograma completo pré-quimioterapia: realizar obrigatoriamente 24 horas antes ou no dia de cada sessão quimioterápica. Adiar se neutrófilos segmentados <1.500/µL ou plaquetas <75.000/µL.
- Perfil hepático (ALT e FA): vigilância seriada mandatória em protocolos contendo lomustina a cada ciclo, suspendendo o fármaco diante de elevações superiores a 5 vezes o limite de referência.
- Função renal e urinálise: avaliação de densidade urinária, sedimentoscopia e proteinúria a cada ciclo em gatos em uso de doxorrubicina; monitorar hematúria na urinálise em cães recebendo ciclofosfamida para detecção precoce de cistite hemorrágica estéril.
- Monitoramento radiográfico e ecocardiográfico: radiografias torácicas de controle na semana 4, 8, 12 e ao término do protocolo para quantificação objetiva da remissão tumoral (Figura 5). Ecocardiograma em cães com dose cumulativa de doxorrubicina aproximando-se de 180 mg/m² para monitorar fração de encurtamento miocárdico.',
    figura5EvolucaoQuimioterapica,
  },
  complications: {
    sindromeLiseTumoralAguda:
      'A lise tumoral maciça pós-indução quimioterápica rápida precipita hipercalemia grave, arritmias ventriculares, fibrilação ventricular e lesão renal aguda obstrutiva por cristais intratubulares de fosfato de cálcio.',
    tamponamentoCardiacoPorEfusao:
      'Efusão pericárdica hemorrágica ou neoplásica volumosa concomitante (Yu et al., 2022) gerando colapso diastólico do átrio direito, choque obstrutivo e hipotensão sistêmica refratária.',
    tromboembolismoDaVeiaCavaCranial:
      'Invasão e estase endotelial grave no mediastino anterior predispondo à trombose venosa profunda da veia cava cranial, com piora aguda do edema facial e cianose de mucosas.',
    pneumoniaAspirativaGrave:
      'Megaesôfago focal compressivo ou paralisia faringoesofágica induzindo aspiração pulmonar do conteúdo alimentar regurgitado, estabelecendo broncopneumonia bacteriana aguda grave sobre parênquima pulmonar já atelectásico.',
  },
  prognosis: {
    expectativaDeVidaCanina2026:
      'Dados de referência em cães com Linfoma Mediastinal Primário (Machado et al., 2026; Moore et al., 2018):

- No maior estudo multicêntrico conduzido até o momento com 70 cães tratados com quimioterapia multiagente sistêmica (Machado et al., 2026):
  - Taxa de resposta objetiva global: 97,9% (resposta clínica em 92,7% dos cães, com remissão completa documentada em 76,6% a 77,0%).
  - Sobrevida livre de progressão (PFS) mediana: 132 dias (aproximadamente 4,4 meses).
  - Sobrevida global (OS) mediana: 223 dias (aproximadamente 7,4 meses).
  - Taxas de sobrevida cumulativa: 55,7% vivos aos 6 meses, 22,9% aos 12 meses e 15,7% vivos aos 2 anos de acompanhamento.
- Desmistificação da hipercalcemia no prognóstico canino: classicamente assumia-se que a hipercalcemia paraneoplásica representava marcador de pior desfecho. Contudo, na coorte de Machado et al. (2026), a presença de hipercalcemia de malignidade no diagnóstico esteve significativamente associada a uma sobrevida livre de progressão mais longa (PFS de 145 dias vs 99 dias nos normocalcêmicos), possivelmente refletindo busca veterinária mais precoce pelos tutores motivada pela poliúria e polidipsia ou maior quimiossensibilidade intrínseca do subtipo celular secretor de PTHrP.',
    expectativaDeVidaFelina:
      'Dados de referência em gatos com Linfoma Mediastinal (Fabrizio et al., 2014; Sunpongsri et al., 2022):

- Impacto decisivo da profundidade da resposta (Fabrizio et al., 2014; 55 gatos):
  - Mediana de sobrevida global: 373 dias nos animais tratados com quimioterapia multiagente.
  - O fator prognóstico mais determinante foi a obtenção de Remissão Completa (CR): gatos que atingiram remissão completa apresentaram mediana de sobrevida extraordinária de 980 dias (cerca de 2,7 anos), em contraste dramático com gatos que obtiveram apenas Remissão Parcial (PR), cuja mediana de sobrevida foi de meros 42 dias (p < 0,0001).
  - Assim, no paciente felino, não basta avaliar se houve resposta inicial; a persistência de massa residual impõe desfecho significativamente inferior, justificando protocolos robustos de resgate.
- Gatos FeLV-positivos: o estudo de Sunpongsri et al. (2022) demonstrou que a infecção por FeLV não é uma sentença de óbito precoce: quando tratados com protocolo COP, alcançaram mediana de sobrevida de 338 dias, demonstrando que a quimioterapia é plenamente justificável e benéfica nesta população.',
  },
  prevention: {
    prevencaoFelineRetrovirus:
      'A profilaxia primária do linfoma mediastinal em gatos apoia-se no controle da transmissão do vírus da leucemia felina (FeLV): vacinação sistemática na fase de filhote com reforço no primeiro ano de vida, manutenção de felinos exclusivamente em ambiente estritamente indoor e triagem sorológica obrigatória de qualquer novo gato introduzido no ambiente domiciliar.',
    vigilanciaClinicaEDomiciliar:
      'Em cães de raças predispostas (Labrador Retriever, Boxer) ou com histórico de poliúria/polidipsia nova e inexplicada, a investigação imediata com palpação cervical, dosagem de cálcio ionizado e triagem radiográfica torácica permite identificar a neoplasia em estágios iniciais, antes da instalação de colapso respiratório ou síndrome precaval avançada.',
  },
  clinicalCases: [
    {
      title: 'Caso Clínico 1 — Cão Boxer, 5 anos: Massa mediastinal volumosa com hipercalcemia severa de malignidade',
      description:
        'Um cão Boxer macho de 5 anos foi atendido com queixa primária de poliúria, polidipsia intensa e hiporexia há 12 dias, evoluindo nas últimas 48 horas com taquipneia em repouso e edema facial discreto. Ao exame físico, apresentava turgor cutâneo diminuído (desidratação estimada em 7%), frequência respiratória de 48 mpm com respiração restritiva e abafamento dos sons pulmonares craniais. A bioquímica sérica revelou cálcio total de 18,4 mg/dL e cálcio ionizado de 1,96 mmol/L (hipercalcemia grave de malignidade). Radiografias torácicas demonstraram grande massa radiopaca no mediastino cranial promovendo desvio dorsal acentuado da traqueia e pequena efusão pleural associada. O paciente foi imediatamente internado para expansão volêmica com NaCl 0,9% (3 vezes a manutenção) e realizada PAAF ecoguiada da massa. A citopatologia confirmou linfoma de grandes células com frequentes figuras de mitose, e a citometria de fluxo caracterizou fenótipo de células T (CD3+). Após 6 horas de fluidoterapia e micção abundante, instituiu-se o protocolo UW-19 com vincristina e prednisona. O cálcio ionizado normalizou para 1,22 mmol/L em 36 horas, o edema facial regrediu completamente e a radiografia de controle no 7º dia revelou remissão tumoral superior a 80%, atingindo remissão completa na semana 4.',
    },
    {
      title: 'Caso Clínico 2 — Gato Siamês, 2 anos: Dispneia de boca aberta, quilotórax e linfoma T duplo-positivo CD4+CD8+',
      description:
        'Um felino Siamês macho castrado de 2 anos e 8 meses de idade, negativo para FeLV e FIV em teste de triagem rápida, foi trazido em colapso respiratório agudo, com respiração em boca aberta, ortopneia, cianose de mucosas e tórax cranial rígido e pouco compressível. O paciente foi posicionado imediatamente em gaiola de oxigênio a 50% sob estrito mínimo manuseio. O TFAST à beira do leito confirmou efusão pleural bilateral severa. Realizou-se toracocentese de emergência em estação, drenando 140 mL de líquido turvo de coloração leitosa, com alívio imediato do padrão respiratório. A dosagem de triglicérides no líquido pleural foi de 860 mg/dL (versus 78 mg/dL no soro), confirmando quilotórax. A citopatologia da efusão e da PAAF da massa mediastinal cranial revelou população monomórfica de blastos atípicos com basofilia citoplasmática exuberante. A citometria de fluxo demonstrou expansão dominante de linfócitos T expressando simultaneamente CD4 e CD8 (68% de células duplo-positivas com FSC elevado), consistente com os achados de Bernardi et al. (2020) e Yu et al. (2022). O paciente iniciou protocolo quimioterápico multiagente (L-CHOP felino). Radiografias no 2º dia já exibiam drástica redução tumoral (Figura 5), e a reavaliação aos 14 dias demonstrou remissão completa do tumor e da efusão pleural, permanecendo em remissão sustentada por mais de 2 anos.',
    },
  ],
  figures: [
    figura1CitometriaFluxo,
    figura2RadiografiaToracica,
    figura3TomografiaComputadorizada,
    figura4CitologiaEImunocitoquimica,
    figura5EvolucaoQuimioterapica,
  ],
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'dipirona',
  ],
  references: [
    {
      id: 'ref-machado-2026',
      citationText:
        'MACHADO, L. et al. Mediastinal Lymphoma in 70 Dogs Treated With Lomustine or Anthracycline-Based Multi-Agent Chemotherapy. Veterinary and Comparative Oncology, 2026. DOI: 10.1111/vco.70062.',
      sourceType: 'article',
      notes: 'Maior coorte multicêntrica canina específica; comprovou 95,6% de imunofenótipo T, 69,1% de hipercalcemia, PFS mediana de 132 dias, OS mediana de 223 dias, ausência de diferença entre protocolos com antraciclina vs lomustina e alta frequência de hepatotoxicidade por lomustina (28,6% ALT graus 3–4).',
    },
    {
      id: 'ref-fabrizio-2014',
      citationText:
        'FABRIZIO, F. et al. Feline mediastinal lymphoma: a retrospective study of signalment, retroviral status, response to chemotherapy and prognostic indicators. Journal of Feline Medicine and Surgery, v. 16, n. 8, p. 637–644, 2014. DOI: 10.1177/1098612X13516621.',
      sourceType: 'article',
      notes: 'Coorte britânica de 55 gatos; demonstrou idade mediana de 3 anos, 21,8% siameses, apenas 10% FeLV+, MST global de 373 dias e impacto dramático da remissão completa (MST de 980 dias) versus parcial (MST de 42 dias).',
    },
    {
      id: 'ref-bernardi-2020',
      citationText:
        'BERNARDI, S. et al. Flow cytometric analysis of mediastinal masses in cats: a retrospective study. Frontiers in Veterinary Science, v. 7, art. 444, 2020. DOI: 10.3389/fvets.2020.00444.',
      sourceType: 'article',
      notes: 'Estudo em felinos demonstrando que 67% dos linfomas mediastinais são naturalmente CD4+CD8+ duplo-positivos, desmistificando a extrapolação da regra canina para gatos (Open Access CC BY 4.0).',
    },
    {
      id: 'ref-yu-2022',
      citationText:
        'YU, S. J. et al. Successful management of feline CD4+ CD8+ T-cell mediastinal lymphoma with pericardial effusion. Veterinární Medicína, v. 67, n. 10, p. 544–551, 2022. DOI: 10.17221/70/2021-VETMED.',
      sourceType: 'article',
      notes: 'Relato de caso detalhado com radiografia, tomografia, citologia CD3+ e remissão radiográfica rápida em 48h e 7 dias sob protocolo L-CHOP em felino com efusão pleural e pericárdica (Open Access CC BY-NC 4.0).',
    },
    {
      id: 'ref-sunpongsri-2022',
      citationText:
        'SUNPONGSRI, S. et al. Effectiveness and adverse events of cyclophosphamide, vincristine, and prednisolone chemotherapy in feline mediastinal lymphoma naturally infected with feline leukemia virus. Animals, v. 12, n. 7, p. 900, 2022. DOI: 10.3390/ani12070900.',
      sourceType: 'article',
      notes: 'Avaliou 92 gatos FeLV-antígeno positivos tratados com protocolo COP; resposta global de 96,7% (CR 81,5%) e sobrevida mediana de 338 dias, comprovando eficácia do tratamento na vigência de FeLV.',
    },
    {
      id: 'ref-moore-2018',
      citationText:
        'MOORE, A. S. et al. Patient characteristics, prognostic factors and outcome of dogs with high-grade primary mediastinal lymphoma. Veterinary and Comparative Oncology, v. 16, n. 1, p. E45–E51, 2018. DOI: 10.1111/vco.12331.',
      sourceType: 'article',
      notes: 'Coorte canina retrospectiva de 42 cães com linfoma mediastinal primário de alto grau; consolidou o protocolo CHOP com sobrevida mediana de 194 dias versus outros esquemas.',
    },
    {
      id: 'ref-reeve-2020',
      citationText:
        'REEVE, O. et al. Mediastinal lymphoma in dogs is homogeneous compared to thymic epithelial neoplasia and is more likely to envelop the cranial vena cava in CT images. Veterinary Radiology & Ultrasound, v. 61, n. 1, p. 25–32, 2020. DOI: 10.1111/vru.12812.',
      sourceType: 'article',
      notes: 'Estudo tomográfico em 62 cães; linfomas envolveram a veia cava cranial mais frequentemente e foram mais homogêneos, enquanto desvio-padrão de atenuação >17 HU apontou neoplasia epitelial tímica.',
    },
    {
      id: 'ref-patterson-2014',
      citationText:
        'PATTERSON: D.; MAROLF, V. Sonographic characteristics of thymoma compared with mediastinal lymphoma. Journal of the American Animal Hospital Association, v. 50, n. 6, p. 409–413, 2014. DOI: 10.5326/JAAHA-MS-6132.',
      sourceType: 'article',
      notes: 'Avaliou 50 animais com massa mediastinal; timomas foram heterogêneos em 94% e císticos em 57%, enquanto linfomas foram sólidos em 80% e hipoecoicos/homogêneos.',
    },
    {
      id: 'ref-lana-2006',
      citationText:
        'LANA, S. et al. Diagnosis of mediastinal masses in dogs by flow cytometry. Journal of Veterinary Internal Medicine, v. 20, n. 5, p. 1161–1165, 2006. DOI: 10.1111/j.1939-1676.2006.tb00717.x.',
      sourceType: 'article',
      notes: 'Estudo canino pioneiro definindo a regra histórica de que timócitos normais em timoma exibem >10% de células duplo-positivas CD4+CD8+, enquanto linfomas caninos tinham tipicamente <2%.',
    },
    {
      id: 'ref-withrow-6ed',
      citationText:
        'VAIL, D. M.; THAMM, D. H.; LIPTAK, J. M. Withrow & MacEwen’s Small Animal Clinical Oncology. 6th ed. Elsevier; 2020. Cap. 33: Hematopoietic Tumors, pp. 688–725; e Cap. 34: Tumors of the Respiratory System and Mediastinum, pp. 779–782.',
      sourceType: 'book',
      notes: 'Referência clássica para estadiamento, protocolo de Madison-Wisconsin canino (Box 33.3, p. 705), protocolo CHOP felino (Table 33.11, p. 722) e diferenciação diagnóstica de massas tímicas.',
    },
    {
      id: 'ref-nelson-couto-6ed',
      citationText:
        'NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 23–24: Pleural and Mediastinal Disorders, pp. 360–378; Cap. 77: Complications of Chemotherapy, pp. 1276–1287; e Cap. 79: Lymphoma, pp. 1294–1310.',
      sourceType: 'book',
      notes: 'Bases de toracocentese emergencial, perda de compressibilidade torácica em gatos, citopatologia de efusões e manejo de hipercalcemia e lise tumoral.',
    },
    {
      id: 'ref-ettinger-9ed',
      citationText:
        'ETTINGER, S. J.; FELDMAN, E. C.; CÔTÉ, E. Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 298: Mediastinal Masses and Thymic Disorders.',
      sourceType: 'book',
      notes: 'Abordagem propedêutica e terapêutica integrada de doenças mediastinais e oncologia de pequenos animais.',
    },
    {
      id: 'ref-bsava-onco-3ed',
      citationText:
        'ARGHYLE, D. J. et al., eds. BSAVA Manual of Canine and Feline Oncology. 3rd ed. British Small Animal Veterinary Association; 2020. Cap. 18: Thoracic Cavity, pp. 265–284; e Cap. 19a: Haemopoietic Tumours, pp. 285–304.',
      sourceType: 'book',
      notes: 'Diretrizes britânicas de imagem, estadiamento e quimioterapia multiagente no linfoma e massas torácicas.',
    },
    {
      id: 'ref-plumbs-10ed-onco',
      citationText:
        'BUDDE, J. A.; MCCLUSKEY, D. M. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Doxorubicin (pp. 410–414), Cyclophosphamide (pp. 312–316), Vincristine (pp. 1250–1254), Lomustine (pp. 715–718), Pamidronate e Prednisone.',
      sourceType: 'book',
      notes: 'Doses rigorosas em mg/m² e mg/kg, toxicidades específicas, cuidados com extravasamento tecidual e manejo farmacológico antiemético.',
    },
  ],
};
