import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const babesioseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-babesiose-caes-gatos',
  slug: 'babesiose-caes-gatos',
  title: 'Babesiose em cães e gatos',
  subtitle:
    'Doença causada por protozoários intraeritrocitários do gênero Babesia, transmitida principalmente por carrapatos ixodídeos (além de transfusões e mordeduras), responsável por hemólise, trombocitopenia e inflamação multissistêmica com conduta estritamente guiada pela espécie.',
  synonyms: [
    'Piroplasmose canina e felina',
    'Babesia vogeli',
    'Babesia canis vogeli',
    'Babesia canis canis',
    'Babesia canis rossi',
    'Babesia gibsoni',
    'Babesia felis',
    'Babesia galileei',
    'Babesia conradae',
    'Babesia vulpes',
  ],
  species: ['dog', 'cat'],
  category: 'infectologia',
  categories: [
    'infectologia',
    'parasitologia',
    'hematologia',
    'imunologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'farmacologia-terapeutica',
  ],
  tags: [
    'Babesiose',
    'Babesia vogeli',
    'Babesia gibsoni',
    'Babesia felis',
    'Babesia galileei',
    'Imidocarb',
    'Atovaquona e Azitromicina',
    'Primaquina',
    'Tromboinflamação',
    'Anemia Hemolítica',
    'Hemotransfusão',
    'ESCCAP 2024',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['babesiose-caes-gatos'],

  quickSummary:
    'A babesiose é causada por protozoários intraeritrocitários do gênero Babesia cuja gravidade resulta da soma entre ruptura direta das hemácias, hemólise imunomediada secundária, estresse oxidativo, resposta inflamatória sistêmica e tromboinflamação. No Brasil predomina Babesia vogeli em cães, mas B. gibsoni também circula e exige atovaquona + azitromicina. Em gatos, B. felis cursa frequentemente afebril, B. galileei amplia o espectro clínico e detecções incidentais de DNA exigem interpretação cautelosa antes de prescrever antiprotozoários tóxicos.',

  quickDecisionStrip: [
    'Identifique a espécie por PCR: dipropionato de imidocarb trata grandes Babesia (B. vogeli, B. canis), mas NÃO cura B. gibsoni nem B. felis.',
    'O hematócrito isolado não mede gravidade: tromboinflamação, lactato > 40 mg/dL, hipoglicemia e lesão renal matam mesmo antes de anemia extrema.',
    'Esfregaço sanguíneo negativo (mesmo de ponta de orelha) não exclui babesiose, e PCR positiva em gato hígido não prova doença clínica ativa.',
    'Antes de diagnosticar AHIM primária ou iniciar corticoides em anemia com trombocitopenia, exclua Babesia, Ehrlichia canis, hemoplasmas e Rangelia vitalii.',
    'Imidocarb (5–6,6 mg/kg IM/SC q14d) nunca pode ser dado IV: confira sempre base (85 mg/mL) versus sal (121,15 mg/mL) e atropina correta (0,02–0,05 mg/kg SC, jamais 0,5 mg/kg).',
    'Primaquina felina > 1 mg/kg pode ser fatal (1 mg fosfato = 0,57 mg base) e atovaquona oral exige alimento gorduroso sem metoclopramida ou tetraciclinas.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Na prática hospitalar e ambulatorial brasileira, a conduta correta começa evitando tratar toda anemia com queda de plaquetas como "erliquiose ou babesiose genérica". Grandes Babesia caninas (B. vogeli, B. canis) respondem ao dipropionato de imidocarb, enquanto pequenas espécies (B. gibsoni, B. conradae, B. vulpes, B. felis) requerem atovaquona associada à azitromicina ou primaquina sob conferência rigorosa, sempre após estabilizar oferta tecidual de oxigênio (DO₂) sem provocar hemodiluição por excesso de cristaloides.',
    leadHighlights: [
      'anemia hemolítica, queda de plaquetas e resposta inflamatória sistêmica',
      'Babesia vogeli',
      'dipropionato de imidocarb',
      'B. gibsoni',
      'atovaquona + azitromicina',
      'atovaquona associada à azitromicina',
      'B. felis',
      'anemia crônica silenciosa sem febre',
      'PCR com especiação',
      'NÃO cura B. gibsoni nem B. felis',
      'tromboinflamação, lactato > 40 mg/dL, hipoglicemia e lesão renal',
      'PCR positiva em gato hígido não prova doença clínica ativa',
      'AHIM primária',
      'Rangelia vitalii',
      'nunca pode ser dado IV',
      'base (85 mg/mL) versus sal (121,15 mg/mL)',
      '0,02–0,05 mg/kg SC, jamais 0,5 mg/kg',
      '> 1 mg/kg pode ser fatal',
      '1 mg fosfato = 0,57 mg base',
      'alimento gorduroso',
      'DO₂',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico e Investigação Diferencial de Plantão',
      steps: [
        {
          label: '1. Triagem imediata de perfusão, glicemia e gravidade',
          timing: 'Minutos 0 a 15',
          detail:
            'Correlacionar nível de consciência, PA, lactato, glicemia, hematócrito e proteínas totais antes de qualquer procedimento demorado.\n\n' +
            '- Lembrar que cães desidratados apresentam hemoconcentração transitória que mascara o hematócrito real até a reidratação.',
        },
        {
          label: '2. Coleta basal completa antes de antiprotozoários',
          timing: 'Admissão (Pré-terapia)',
          detail:
            'Colher sangue EDTA (hemograma, reticulócitos, esfregaço imediato e PCR), soro/heparina (bilirrubinas, perfil renal/hepático, albumina, CK) e urina antes da depuração parasitária.',
        },
        {
          label: '3. Esfregaço sanguíneo periférico e capilar',
          timing: 'Primeiras horas',
          detail:
            'Avaliar lâmina de ponta de orelha ou leito ungueal corada por Giemsa/Wright buscando piroplasmas grandes (> 2,5 µm) ou pequenos (~1–2,5 µm), esferócitos, autoaglutinação e agregados plaquetários.',
          limitations: 'Sensibilidade baixa em baixa parasitemia e incapacidade de especiar morfologicamente.',
        },
        {
          label: '4. PCR com identificação da espécie e painel de coinfecções',
          timing: 'Primeiras 24 a 72 horas',
          detail:
            'Solicitar ensaio direcionado para 18S rRNA, cytb ou cox com sequenciamento/primers específicos, incluindo pesquisa simultânea de Ehrlichia, Anaplasma, hemoplasmas e Rangelia vitalii.',
        },
        {
          label: '5. Imagem cavitária (POCUS/USG) e hemostasia em graves',
          timing: 'Conforme estabilidade',
          detail:
            'Descartar hemoabdome/massas esplênicas na anemia aguda e avaliar lactato, gasometria e coagulograma (lembrando que TP/TTPa normais não excluem tromboinflamação).',
        },
        {
          label: '6. Correlação clínico-causal antes da terapia definitiva',
          timing: 'Revisão diagnóstica',
          detail:
            'Responder se a síndrome clínica é explicada pelo agente identificado, evitando tratar portadores felinos assintomáticos e evitando imunossupressão precoce antes da exclusão infecciosa.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico de Urgência, Antiprotozoário por Espécie e Seguimento',
      steps: [
        {
          label: '1. Estabilização hemodinâmica e metabólica imediata',
          timing: 'Minutos 0 a 15',
          detail:
            'Corrigir hipovolemia com provas conservadoras (5–10 mL/kg cães; 3–5 mL/kg gatos) evitando hemodiluição e tratar imediatamente hipoglicemia.',
        },
        {
          label: '2. Hemotransfusão seletiva para restaurar DO₂',
          timing: 'Concomitante à triagem',
          detail:
            'Indicar concentrado de hemácias em normovolêmicos hipóxicos com filtro de 170–260 µm em até 4 h, linha exclusiva com NaCl 0,9% e tipagem/prova cruzada rigorosa.',
        },
        {
          label: '3. Antiprotozoário guiado pela espécie (Cães)',
          timing: 'Após confirmação ou alta suspeita',
          detail:
            'Grandes Babesia: imidocarb 5–6,6 mg/kg IM/SC repetido em 14 dias. B. gibsoni: atovaquona 13,3 mg/kg VO q8h (com gordura) + azitromicina 10 mg/kg VO q24h por 10 dias.',
        },
        {
          label: '4. Antiprotozoário guiado pela espécie (Gatos sintomáticos)',
          timing: 'Apenas com doença clínica atribuível',
          detail:
            'B. felis: primaquina com conferência dupla sal (fosfato) vs base (1 mg fosfato = 0,57 mg base; > 1 mg/kg pode ser fatal). Grandes Babesia suscetíveis: imidocarb conforme peso de evidência limitada.',
        },
        {
          label: '5. Vetar iatrogenias e manejar coinfecções comprovadas',
          timing: 'Durante toda a internação',
          detail:
            'Evitar corticoides de rotina, doxiciclina como falsa monoterapia antibabesiana e suplementação empírica de ferro.',
        },
        {
          label: '6. Retornos hematológicos e PCR tardia',
          timing: '48–72 h, 14 dias e 60–90 dias',
          detail:
            'Acompanhar hematócrito/plaquetas seriados, programar PCR dupla aos 60 e 90 dias em B. gibsoni e manter acaricidas espécie-específicos contínuos.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Consulta rápida (30–60 segundos) — Perguntas essenciais à beira do leito',
      headers: ['Pergunta clínica', 'Conduta objetiva'],
      rows: [
        [
          'Quando suspeitar?',
          '==Anemia, trombocitopenia, febre, icterícia ou hemoglobinúria== com histórico de carrapatos ou mordeduras — lembrando que gatos com B. felis costumam ser ==afebris==.',
        ],
        [
          'O hemograma confirma?',
          'Não. Quantifica anemia, resposta medular e plaquetopenia, mas ==não separa babesiose de rangeliose, erliquiose ou AHMI primária==.',
        ],
        [
          'Melhor exame etiológico?',
          '==PCR espécie-específica (18S rRNA, cytb, cox)== associada ao ==esfregaço imediato== (sangue venoso e capilar de ponta de orelha).',
        ],
        [
          'Tratamento canino de B. vogeli / B. canis?',
          '==Dipropionato de imidocarb 5–6,6 mg/kg IM ou SC==, repetido em 14 dias (NUNCA IV; conferir frasco base vs sal).',
        ],
        [
          'Tratamento canino de B. gibsoni?',
          '==Atovaquona 13,3 mg/kg VO q8h (com alimento gorduroso) + azitromicina 10 mg/kg VO q24h== por 10 dias.',
        ],
        [
          'Tratamento felino de B. felis?',
          '==Primaquina sob dupla conferência sal vs base== (1 mg fosfato = 0,57 mg base; ==doses > 1 mg/kg podem ser letais==).',
        ],
      ],
    },
  },

  etiology: {
    conceitoBaseETaxonomia:
      'A babesiose é uma hemoparasitose causada por protozoários intraeritrocitários do gênero Babesia (filo Apicomplexa, ordem Piroplasmida). Na prática clínica, o primeiro passo é separar três conceitos distintos: ==infecção== (presença do parasito ou de seu DNA), ==babesiose clínica== (síndrome patológica atribuível após excluir coinfecções) e ==portador subclínico== (animal sem sinais ativos, porém epidemiologicamente relevante como doador de sangue ou sob risco de recrudescência pós-esplenectomia) {{ref:ref-greene-5ed-cap97}}.\n\n' +
      'Historicamente, os piroplasmas foram divididos pelo tamanho intraeritrocitário no esfregaço sanguíneo em ==grandes Babesia (> 2,5 µm)== — formas piriformes frequentemente pareadas como B. vogeli, B. canis e B. rossi — e ==pequenas Babesia (~1–2,5 µm)== — formas anelares ou arredondadas como B. gibsoni, B. conradae, B. vulpes, B. felis e B. galileei. Embora essa separação ajude na triagem inicial (grandes respondem em geral ao imidocarb; pequenas costumam falhar ao imidocarb), existe sobreposição morfológica durante a replicação intracelular {{ref:ref-greene-5ed-cap97}} {{ref:ref-esccap-gl5-2024}}.\n\n' +
      'A taxonomia molecular moderna corrige um equívoco comum na literatura antiga: ==B. vogeli, B. canis sensu stricto e B. rossi são espécies independentes==, e não subespécies intercambiáveis. De modo semelhante, ==Theileria, Cytauxzoon e Rangelia vitalii pertencem a grupos distintos== e não devem ser tratados com os mesmos protocolos empíricos de Babesia. Hoje, a confirmação definitiva exige marcadores moleculares como ==18S rRNA, citocromo b (cytb), cox1/cox3 e região espaçadora interna (ITS)== {{ref:ref-greene-5ed-cap97}} {{ref:ref-duarte-2026}}.',
    tabelaEspeciesClinicasImportancia: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Principais espécies de Babesia de importância clínica em cães e gatos',
      headers: ['Espécie e grupo', 'Hospedeiros e distribuição', 'Perfil clínico e impacto terapêutico'],
      rows: [
        [
          'Babesia vogeli (Grande)',
          'Cães (detecções ocasionais em gatos); mundial, ==predominante no Brasil==',
          'Transmitida por Rhipicephalus sanguineus s.l.; varia de portador assintomático a anemia fatal em ==filhotes, imunossuprimidos e coinfectados==. Responde ao imidocarb.',
        ],
        [
          'Babesia canis s.s. (Grande)',
          'Cães; sobretudo Europa (vetor Dermacentor reticulatus)',
          'Provoca anemia hemolítica, febre, SRIS, lesão renal aguda e pancreatite secundária em quadros complicados.',
        ],
        [
          'Babesia rossi (Grande)',
          'Cães; África subsaariana (Haemaphysalis elliptica)',
          'Altamente virulenta: choque distributivo, hipoglicemia, "síndrome biliar vermelha" e ==tromboinflamação multiorgânica grave==.',
        ],
        [
          'Babesia gibsoni (Pequena)',
          'Cães; global e ==já caracterizada por múltiplos loci no Brasil==',
          'Transmissão por carrapatos, mordeduras e transfusão; forte hemólise imunomediada (esferócitos). ==Não responde ao imidocarb; exige atovaquona + azitromicina==.',
        ],
        [
          'Babesia conradae (Pequena)',
          'Cães; sobretudo oeste da América do Norte',
          'Pequeno piroplasma altamente patogênico associado a hemólise severa e alta mortalidade sem terapia combinada tipo atovaquona + azitromicina.',
        ],
        [
          'Babesia vulpes (Pequena)',
          'Canídeos; Europa, Ásia e América do Norte (ex-T. annae)',
          'Associada a anemia grave, azotemia importante e ==alta persistência molecular pós-tratamento==.',
        ],
        [
          'Babesia felis s.s. (Pequena)',
          'Gatos; sobretudo litoral da África do Sul',
          'Causa anemia crônica progressiva ==frequentemente afebril e sem icterícia==, com descompensação abrupta após estresse; tratada com primaquina.',
        ],
        [
          'Babesia galileei (Pequena)',
          'Gatos domésticos; descrita em Israel (2024)',
          'Associada a anemia, trombocitopenia, febre e icterícia; possível vínculo com Haemaphysalis adleri.',
        ],
        [
          'Detecções incidentais felinas (ex.: B. vogeli)',
          'Gatos em áreas hiperendêmicas caninas, incluindo o Brasil',
          'Detectada por PCR em ==gatos clinicamente sadios sem alterações hematológicas==; positividade isolada não justifica terapia tóxica automática.',
        ],
      ],
    },
    descobertaRecenteBabesiaGalileei:
      'Um marco recente na parasitologia felina ilustra por que a caracterização molecular é indispensável antes de generalizar condutas:\n\n' +
      '- ==O que estudou Baneth et al. (2024)==: descrição taxonômica e série clínica prospectiva envolvendo três gatos domésticos machos naturalmente doentes em Israel, combinando microscopia morfológica, sequenciamento multilocus e pesquisa vetorial em carrapatos coletados {{ref:ref-baneth-2024}}.\n' +
      '- ==Principais achados==: os três gatos apresentaram anemia e trombocitopenia (dois com febre, um com icterícia e alterações renais), identificando-se uma nova espécie filogeneticamente distinta denominada ==Babesia galileei sp. nov.== Todos recuperaram sinais clínicos após protocolo incluindo dipropionato de imidocarb (3,5 mg/kg SC), porém ==um gato manteve PCR positiva no dia 9==; DNA compatível também foi detectado em glândulas salivares de Haemaphysalis adleri {{ref:ref-baneth-2024}}.\n' +
      '- ==Impacto clínico e motivo da inclusão==: amplia formalmente o diagnóstico diferencial de babesiose clínica em felinos além de B. felis e reforça duas regras universais — morfologia isolada não define espécie e ==melhora clínica precoce não significa cura parasitológica==, embora n = 3 não valide posologia universal nem competência vetorial definitiva {{ref:ref-baneth-2024}}.',
    figurasMorfologiaEspecie: [
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/babesia-vogeli-dantas-torres-2008.jpg',
        alt: 'Formas piriformes pareadas intraeritrocitárias de Babesia vogeli em esfregaço sanguíneo canino no Brasil',
        shortCaption: 'Fig. 1 — Babesia vogeli em hemácia canina no Brasil (> 2,5 µm; formas piriformes pareadas).',
        caption:
          'Figura 1 — Merozoítos piriformes pareados de Babesia vogeli (> 2,5 µm) em esfregaço sanguíneo de cão brasileiro; embora característico dos piroplasmas grandes, exige PCR para diferenciar de outras espécies grandes e de Rangelia vitalii. Fonte: Dantas-Torres (2008), Parasites & Vectors 1:25 (CC BY 2.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/babesia-canis-walker.jpg',
        alt: 'Fotomicrografia em Giemsa de merozoítos grandes e formas em anel de Babesia canis em eritrócitos de cão',
        shortCaption: 'Fig. 2 — Babesia canis (Giemsa): pares piriformes grandes ao lado de formas anelares.',
        caption:
          'Figura 2 — Piroplasmas de Babesia canis sensu stricto em esfregaço sanguíneo canino corado por Giemsa, evidenciando merozoítos piriformes pareados junto a trofozoítos em anel individuais. Crédito: Alan R. Walker, Wikimedia Commons (CC BY-SA 3.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/babesia-gibsoni-he-2017.webp',
        alt: 'Esfregaço sanguíneo corado por Giemsa demonstrando pequenos trofozoítos anelares de Babesia gibsoni indicados por setas',
        shortCaption: 'Fig. 3 — Babesia gibsoni (setas): pequenos anéis (~1–2,5 µm) difíceis de ver no esfregaço.',
        caption:
          'Figura 3 — Pequenos trofozoítos anelares intraeritrocitários de Babesia gibsoni (setas 1 e 2) em esfregaço canino por Giemsa; parasitemias baixas exigem PCR para diagnóstico seguro e não respondem ao imidocarb isolado. Fonte: He et al. (2017), Frontiers in Microbiology 8:1577 (CC BY 4.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/babesia-galileei-baneth-2024.jpg',
        alt: 'Prancha microscópica a–j com barras de 10 µm ilustrando o desenvolvimento intraeritrocitário de Babesia galileei em gatos',
        shortCaption: 'Fig. 4 — Babesia galileei (a–j, 10 µm): anéis, pares e tétrades em eritrócitos felinos.',
        caption:
          'Figura 4 — Estágios intraeritrocitários de Babesia galileei sp. nov. em eritrócitos de gatos domésticos (painéis a–j, barra de 10 µm), mostrando pequenos anéis, merozoítos pareados e divisões em tétrade. Fonte: Baneth et al. (2024), Parasites & Vectors 17:297 (CC BY 4.0).',
        display: 'default',
      },
    ],
  },

  epidemiology: {
    vetoresDistribuicaoEEvidencias:
      'A epidemiologia da babesiose é moldada pela distribuição do carrapato vetor competente e pelas vias não vetoriais (transfusão e mordeduras). Na América do Sul, o complexo ==Rhipicephalus sanguineus sensu lato== (carrapato-marrom-do-cão), altamente adaptado a frestas domiciliares e canis, sustenta o ciclo endêmico de ==Babesia vogeli== durante todo o ano. Na Europa, ==Dermacentor reticulatus== transmite B. canis sensu stricto em padrões sazonais, enquanto na África do Sul ==Haemaphysalis elliptica== transmite a virulenta B. rossi e espécies asiáticas de Haemaphysalis transmitem B. gibsoni {{ref:ref-esccap-gl5-2024}} {{ref:ref-greene-5ed-cap97}}.\n\n' +
      'Os estudos moleculares e meta-analíticos que fundamentam a epidemiologia contemporânea esclarecem armadilhas diagnósticas críticas:\n\n' +
      '- ==Revisão sistemática e meta-análise global (Abdoli et al., 2024)==: rastrearam 23.864 publicações e sintetizaram 229 estudos elegíveis em cães no mundo todo. Encontraram ==prevalência combinada de 12,0% (IC 95%: 9,7%–14,6%)==, com heterogeneidade extrema ligada ao método diagnóstico e região. ==Impacto==: demonstra que valores médios globais não substituem a vigilância molecular regional para orientar a suspeita inicial {{ref:ref-abdoli-2024}}.\n' +
      '- ==Correção histórica brasileira (Passos et al., 2005; Dantas-Torres, 2008)==: sequenciamento molecular de cães naturalmente infectados de Belo Horizonte, Lavras, Uberlândia (MG), São Paulo e Rio de Janeiro (onde 33/407 cães positivos foram confirmados como B. vogeli) comprovou que ==a espécie predominante de grande porte no Brasil é B. vogeli==, corrigindo décadas de nomenclatura imprecisa como "B. canis" {{ref:ref-passos-2005}} {{ref:ref-dantas-torres-2008}}.\n' +
      '- ==Sorologia versus infecção ativa no Brasil (Dantas-Torres et al., 2021)==: estudo transversal em 630 cães de dois focos hiperendêmicos brasileiros (417 em Goiana/PE e 213 em São Joaquim de Bicas/MG) comparou IFA para IgG contra dois protocolos de PCR. Embora ==82,4% (519/630) apresentassem anticorpos IgG==, apenas ==5,4% (34/630) a 14,0% (88/630)== tinham DNA circulante detectável conforme o alvo molecular (incluindo B. vogeli e Hepatozoon canis). ==Impacto==: prova que sorologia positiva em cão brasileiro reflete exposição endêmica passada e NÃO confirma babesiose aguda {{ref:ref-dantas-torres-2021}}.\n' +
      '- ==Caracterização brasileira recente de B. gibsoni (Duarte et al., 2026)==: caracterizou por múltiplos marcadores genéticos (18S rRNA, cytb, cox3 e hsp70) a infecção natural por B. gibsoni em um Dachshund com febre e anemia persistente no Distrito Federal. ==Impacto==: comprova circulação autóctone no Brasil Central e obriga o clínico a suspeitar de B. gibsoni diante de falha ao imidocarb {{ref:ref-duarte-2026}}.',
    fatoresRiscoHospedeiroEPapelFelino:
      'A manifestação clínica varia amplamente conforme idade, reserva esplênica, coinfecções e espécie hospedeira:\n\n' +
      '- ==Filhotes e coinfecções caninas==: embora B. vogeli frequentemente gere infecções brandas ou subclínicas em adultos saudáveis, ==filhotes, cães imunossuprimidos e coinfectados== (Ehrlichia canis, Anaplasma platys ou helmintoses espoliativas) evoluem com hemólise aguda severa e risco de óbito {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==Risco dramático da esplenectomia==: o baço remove seletivamente eritrócitos parasitados e pouco deformáveis (culling e pitting). Cães e gatos ==esplenectomizados ou com asplenia funcional== correm alto risco de hiperparasitemia fulminante e recrudescência de infecções latentes; quando uma esplenectomia eletiva for inevitável em paciente previamente positivo, recomenda-se adiar idealmente ==≥ 60 dias após tratamento eficaz== {{ref:ref-nelson-couto-6ed}} {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==O paradoxo da babesiose felina brasileira (Oliveira et al., 2022)==: estudo transversal em 166 gatos amostrados em Brasília (DF) investigou piroplasmas por PCR associada a hemograma e bioquímica completa. Encontrou ==21,7% (36/166) de gatos PCR-positivos== (19 B. vogeli e 12 Cytauxzoon felis), porém ==sem nenhuma diferença estatística hematológica ou bioquímica== frente aos animais negativos. ==Impacto==: alerta o clínico brasileiro contra iniciar fármacos tóxicos (como primaquina ou imidocarb) diante de PCR positiva isolada em gato saudável, mantendo abertas três perguntas de pesquisa: quais cepas causam doença clínica primária no Brasil, quais cofatores (FIV/FeLV, hemoplasmas, corticoides) disparam descompensação e qual regime felino é seguro {{ref:ref-oliveira-2022}} {{ref:ref-abcd-feline-babesiosis-2020}}.',
    figurasVetoresECiclo: [
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/rhipicephalus-sanguineus-female-male.jpg',
        alt: 'Vista dorsal comparativa de fêmea e macho adultos de Rhipicephalus sanguineus sensu lato',
        shortCaption: 'Fig. 5 — Rhipicephalus sanguineus s.l.: principal vetor de B. vogeli no Brasil.',
        caption:
          'Figura 5 — Fêmea e macho adultos de Rhipicephalus sanguineus sensu lato (carrapato-marrom-do-cão), vetor principal de Babesia vogeli no Brasil e altamente adaptado a frestas intradomiciliares e canis. Acervo educativo VETIUS.',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/dermacentor-reticulatus-altenkamp.jpg',
        alt: 'Vista dorsal de macho adulto de Dermacentor reticulatus com escudo ornamentado',
        shortCaption: 'Fig. 6 — Dermacentor reticulatus: vetor europeu de B. canis (transmissão ~8 h).',
        caption:
          'Figura 6 — Macho adulto de Dermacentor reticulatus com escudo dorsal ornamentado, vetor estabelecido de Babesia canis sensu stricto na Europa e modelo experimental de transmissão acelerada (~8 h de fixação). Crédito: Rainer Altenkamp, Wikimedia Commons (CC BY-SA 3.0).',
        display: 'default',
      },
      {
        kind: 'clinicalFigure',
        src: '/consulta-vet/babesiose/ciclo-rhipicephalus-sanguineus.jpg',
        alt: 'Diagrama ilustrativo do ciclo biológico de três hospedeiros de Rhipicephalus sanguineus entre cão e ambiente domiciliar',
        shortCaption: 'Fig. 7 — Ciclo de três hospedeiros de R. sanguineus no domicílio.',
        caption:
          'Figura 7 — Ciclo evolutivo de três hospedeiros de Rhipicephalus sanguineus sensu lato entre o animal e abrigos domésticos, explicando por que o controle exige acaricidas contínuos o ano inteiro e manejo ambiental. Acervo educativo VETIUS.',
        display: 'default',
      },
    ],
  },

  pathogenesisTransmission: {
    tabelaViasDeTransmissao: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Vias de transmissão e reativação de Babesia em cães e gatos',
      headers: ['Via de transmissão', 'Mecanismo biológico', 'Impacto na conduta clínica'],
      rows: [
        [
          'Vetorial (carrapatos ixodídeos)',
          'Inoculação de esporozoítos ativados na saliva durante a hematofagia',
          'Principal via de B. vogeli, B. canis e B. rossi. ==Ausência de carrapatos na consulta NÃO exclui a doença== (pode ter se desprendido semanas antes).',
        ],
        [
          'Transfusão sanguínea',
          'Transferência direta de eritrócitos com merozoítos viáveis de doador portador subclínico',
          'Transmite grandes e pequenas Babesia com alto risco de quadro agudo grave; impõe ==PCR negativa obrigatória em doadores==.',
        ],
        [
          'Mordeduras e sangue fresco',
          'Inoculação percutânea direta de hemácias infectadas em brigas ou fômites contaminados',
          'Via decisiva para disseminação de ==B. gibsoni== entre cães adultos mesmo na ausência de carrapatos.',
        ],
        [
          'Transplacentária / vertical',
          'Passagem transplacentária de eritrócitos parasitados para neonatos',
          'Documentada para B. gibsoni e B. canis; não extrapolar indistintamente a todas as espécies sem evidência.',
        ],
        [
          'Reativação endógena',
          'Quebra da premunição imune após esplenectomia, corticoides ou quimioterapia',
          'Causa anemia hemolítica súbita sem exposição recente ao vetor.',
        ],
      ],
    },
    cicloBiologicoNoHospedeiroENoVetor:
      'Compreender a biologia de transmissão orienta decisões de prevenção e evita diagnósticos apressados {{ref:ref-esccap-gl5-2024}} {{ref:ref-greene-5ed-cap97}}:\n\n' +
      '- ==No cão e no gato (sem fase hepática)==: ao contrário da malária ou de Cytauxzoon felis (que possuem esquizogonia tecidual antes de invadir hemácias), os esporozoítos de Babesia inoculados pelo carrapato penetram ==diretamente os eritrócitos== por endocitose mediada por receptores. No interior da hemácia, diferenciam-se em trofozoítos e dividem-se assexuadamente por merogonia (fissão binária), originando merozoítos que rompem ou deixam a célula para infectar novas hemácias, enquanto parte forma gametócitos.\n' +
      '- ==No carrapato ixodídeo==: ao ingerir sangue infectado, os gametócitos fundem-se no intestino médio em um oocineto móvel que invade tecidos internos e alcança as glândulas salivares (mantido entre estágios via transmissão ==transestadial== e, em certas espécies/carrapatos, para a progênie via ==transovariana==).\n' +
      '- ==Janela de tempo até inoculação==: os esporozoítos exigem maturação nas glândulas salivares após o início da alimentação do vetor, demorando classicamente ==24 a 72 horas== para transmissão efetiva; contudo, ensaios experimentais com Dermacentor reticulatus demonstraram inoculação de B. canis em apenas ==~8 horas de fixação== — razão pela qual produtos que matam lentamente não garantem proteção absoluta sem ação repelente ou morte ultrarrápida {{ref:ref-greene-5ed-cap97}}.',
  },

  pathophysiology: {
    fisiologiaEritrocitariaEHipoxia:
      'Para interpretar a descompensação clínica, é essencial recordar que o eritrócito maduro carece de núcleo e mitocôndrias, dependendo integralmente da glicólise anaeróbia (ATP) e de sistemas antioxidantes (glutationa/NADPH) para manter sua flexibilidade através dos sinusoides esplênicos e conservar o ferro heme no estado ferroso funcional (Fe²⁺) {{ref:ref-nelson-couto-6ed}} {{ref:ref-ettinger-9ed}}.\n\n' +
      'A oxigenação tecidual obedece à relação:\n' +
      '- ==CaO₂ ≈ (1,34 × Hb × SaO₂) + (0,003 × PaO₂)== e ==DO₂ = Débito Cardíaco × CaO₂==.\n\n' +
      'Como o oxigênio dissolvido no plasma (0,003 × PaO₂) representa parcela mínima frente ao oxigênio ligado à hemoglobina, ==um paciente severamente anêmico pode apresentar SpO₂ de 98% no oxímetro e PaO₂ arterial normal na gasometria enquanto sofre hipóxia tecidual crítica e acidose láctica==. A taquicardia compensatória esgota rapidamente sua reserva; por isso, ==oxigenoterapia isolada nunca substitui reposição de massa eritrocitária por concentrado de hemácias== {{ref:ref-dibartola-4ed}} {{ref:ref-nelson-couto-6ed}}.',
    mecanismosHemoliseETromboinflamacao:
      'A destruição sanguínea e a falência multiorgânica frequentemente superam a parasitemia visível no esfregaço porque cinco mecanismos atuam em paralelo:\n\n' +
      '- ==1. Lise direta==: multiplicação intraeritrocitária altera proteínas de membrana e citoesqueleto, rompendo hemácias e liberando hemoglobina livre no plasma (hemoglobinemia e hemoglobinúria).\n' +
      '- ==2. Hemólise imunomediada secundária (Zygner et al., 2023)==: revisão fisiopatológica detalhada da literatura canina e comparada demonstrou que ==anticorpos anti-eritrocitários (IgG/IgM) e fração C3 do complemento opsonizam tanto hemácias parasitadas quanto hemácias não infectadas==, promovendo fagocitose esplênica, esferocitose marcante (sobretudo em B. gibsoni), autoaglutinação e teste de Coombs positivo. ==Impacto==: explica por que babesiose simula perfeitamente AHMI primária e alerta contra imunossupressão precoce antes de descartar infecção {{ref:ref-zygner-2023}} {{ref:ref-nelson-couto-6ed}}.\n' +
      '- ==3. Estresse oxidativo e fragilidade da hemoglobina felina==: espécies reativas de oxigênio oxidam lipídios e hemoglobina. A hemoglobina dos gatos possui ==8 a 10 grupos sulfidrila reativos== (contra apenas 2 a 4 em cães) e sistemas de glutationa mais lábeis, tornando felinos altamente vulneráveis a corpúsculos de Heinz e metemoglobinemia oxidativa (tanto pela infecção quanto por fármacos como primaquina) {{ref:ref-ettinger-9ed}}.\n' +
      '- ==4. Tempestade de citocinas==: TNF-α, IL-6, IL-8/CXCL8 e IFN-γ amplificam febre, vasodilatação distributiva, resposta hepática de fase aguda e recrutamento neutrofílico endotelial {{ref:ref-zygner-2023}}.\n' +
      '- ==5. Tromboinflamação e sludging microvascular (Goddard et al., 2026)==: além de proteases parasitárias que ativam calicreína e geram estase capilar ("hemácias pegajosas") {{ref:ref-greene-5ed-cap97}}, estudo clínico observacional prospectivo em ==97 cães naturalmente infectados por B. rossi versus 15 controles saudáveis== utilizou tromboelastografia (TEG), marcadores inflamatórios e exame post-mortem (12 óbitos = 12,4%). Os autores comprovaram ==microtrombos orgânicos disseminados, consumo de fatores e dissociação hemostática na TEG== (atraso no início da coagulação coexistindo com firmeza preservada do coágulo). ==Impacto==: prova que testes plasmáticos convencionais (TP/TTPa) subestimam o estado tromboinflamatório e fundamenta o conceito moderno de lesão orgânica microvascular {{ref:ref-goddard-2026}}.',
    tabelaCitocinasEMediadores: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Principais mediadores inflamatórios e microvasculares na babesiose',
      headers: ['Mediador', 'Função fisiológica basal', 'Papel na patogenia e gravidade clínica'],
      rows: [
        ['TNF-α', 'Sinalização pró-inflamatória e endotelial', 'Induz febre, ativação vascular, vasodilatação distributiva e choque séptico-like'],
        ['IL-6', 'Estímulo de fase aguda hepática', 'Eleva PCR/SAA e amplifica inflamação sistêmica multiorgânica'],
        ['IL-8 / CXCL8', 'Quimiotaxia neutrofílica', 'Recruta neutrófilos para capilares renais, pulmonares e hepáticos'],
        ['IFN-γ', 'Ativação macrofágica Th1', 'Auxilia eliminação fagocítica do protozoário, mas potencializa dano tecidual colateral'],
        ['Mediadores regulatórios (ex.: IL-10)', 'Contenção anti-inflamatória', 'Equilibram controle da parasitemia versus dano endotelial e imunopatológico'],
      ],
    },
    disfuncaoOrganicaEPremunicao:
      '- ==Trombocitopenia multifatorial==: resulta de consumo microtrombótico, destruição imunomediada, sequestro esplênico e possíveis coinfecções (Ehrlichia/Anaplasma) — explicando quedas acentuadas (< 30.000/µL) mesmo antes de anemia grave {{ref:ref-nelson-couto-6ed}} {{ref:ref-goddard-2026}}.\n' +
      '- ==Lesão renal aguda (LRA) e "síndrome biliar vermelha"==: sinergia de hipoperfusão, lesão oxidativa tubular por hemoglobina livre filtrada, microtrombos glomerulares e desidratação. Em apresentações graves, observa-se a paradoxal ==síndrome biliar vermelha==: hemólise intravascular maciça associada a extravasamento capilar que eleva falsamente o hematócrito, fortemente ligada a necrose tubular aguda, SARA e CID {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==Encefalopatia versus "babesiose cerebral"==: estupor, ataxia e convulsões decorrem frequentemente de ==hipoglicemia severa, hipóxia anêmica e acidose láctica== antes de sludging vascular cerebral; causas metabólicas reversíveis devem ser corrigidas primeiro.\n' +
      '- ==Premunição crônica e biomarcadores==: após a fase aguda, hospedeiro e protozoário atingem equilíbrio imunológico dinâmico (==premunicão==) com baixa parasitemia residual — portanto ==melhora clínica não equivale à eliminação do parasito== {{ref:ref-greene-5ed-cap97}}. Proteínas de fase aguda (CRP/SAA) e marcadores de degradação do glicocálix endotelial refletem inflamação, mas ainda carecem de pontos de corte universais para orientar transfusão.',
  },

  clinicalSignsPathophysiology: {
    sinaisClinicosPorSistema: [
      {
        system: 'general',
        findings: [
          {
            finding: 'Febre',
            mechanism: 'Ação hipotalâmica de citocinas pirogênicas (==TNF-α e IL-6==) liberadas durante lise eritrocitária e resposta imune {{ref:ref-zygner-2023}}.',
            clinicalMeaning: 'Frequente na fase aguda canina, porém ==frequentemente ausente em gatos com B. felis== (apirexia jamais exclui babesiose) {{ref:ref-abcd-feline-babesiosis-2020}} {{ref:ref-feline-ecc-2ed}}.',
            priority: 'common',
          },
          {
            finding: 'Prostração, anorexia e intolerância ao exercício',
            mechanism: 'Queda crítica da oferta de oxigênio (==DO₂==), acidose metabólica precoce e resposta inflamatória sistêmica {{ref:ref-dibartola-4ed}}.',
            clinicalMeaning: 'Em gatos com B. felis, pode ser a única pista até hematócrito crítico (< 14%) por adaptação comportamental progressiva {{ref:ref-feline-ecc-2ed}}.',
            priority: 'common',
          },
        ],
      },
      {
        system: 'hematologic',
        findings: [
          {
            finding: 'Mucosas hipocoradas a porcelânicas',
            mechanism: 'Redução abrupta da concentração de hemoglobina somada à vasoconstrição periférica compensatória {{ref:ref-nelson-couto-6ed}}.',
            clinicalMeaning: 'Pode parecer atenuada pela desidratação inicial e acentuar-se rapidamente logo após reposição volêmica.',
            priority: 'common',
          },
          {
            finding: 'Icterícia (mucosas, esclera e pele)',
            mechanism: 'Sobrecarga hepática de bilirrubina pela degradação maciça do heme somada à ==colestase inflamatória e hipóxia centrolobular== {{ref:ref-nelson-couto-6ed}}.',
            clinicalMeaning: 'Comum em apresentações moderadas a graves em cães; incomum em gatos não complicados por B. felis {{ref:ref-abcd-feline-babesiosis-2020}}.',
            priority: 'common',
          },
          {
            finding: 'Esplenomegalia e hepatomegalia',
            mechanism: 'Hiperplasia fagocítica e linfoide reativa com congestão por retenção de hemácias parasitadas ou opsonizadas {{ref:ref-greene-5ed-cap97}}.',
            clinicalMeaning: 'Achado clássico no exame físico e ultrassonográfico, porém inespecífico frente a erliquiose, hemoplasmose e neoplasias.',
            priority: 'common',
          },
          {
            finding: 'Petéquias, equimoses ou sangramento mucoso',
            mechanism: 'Trombocitopenia multifatorial, disfunção endotelial, CID ou coinfecções por Ehrlichia / Rangelia vitalii {{ref:ref-goddard-2026}}.',
            clinicalMeaning: 'Muitos cães com < 30.000 plaquetas/µL não sangram; ==hemorragia franca exige investigar CID e rangeliose==.',
            priority: 'systemic',
          },
        ],
      },
      {
        system: 'cardiovascular',
        findings: [
          {
            finding: 'Taquicardia compensatória e sopro sistólico anêmico',
            mechanism: 'Elevação reflexa do débito cardíaco e redução da viscosidade sanguínea para sustentar ==DO₂== {{ref:ref-nelson-couto-6ed}}.',
            clinicalMeaning: 'Taquicardia mantida em repouso após correção volêmica aponta necessidade de transfusão de hemácias.',
            priority: 'low-output',
          },
          {
            finding: 'Pulsos fracos, hipotensão e TPC prolongado',
            mechanism: 'Choque distributivo/inflamatório por citocinas, hipovolemia ou disfunção miocárdica inflamatória {{ref:ref-goddard-2026}}.',
            clinicalMeaning: '==Emergência absoluta== típica de formas complicadas com alta mortalidade se não estabilizada imediatamente.',
            priority: 'emergency',
          },
        ],
      },
      {
        system: 'respiratory',
        findings: [
          {
            finding: 'Taquipneia e dispneia',
            mechanism: 'Compensação de acidose láctica, hipóxia anêmica severa, dor, febre ou ==edema pulmonar não cardiogênico / SARA== {{ref:ref-greene-5ed-cap97}}.',
            clinicalMeaning: 'Risco extremo de confundir dispneia anêmica com hipovolemia e agravar congestão com excesso de fluidos.',
            priority: 'emergency',
          },
        ],
      },
      {
        system: 'gastrointestinal',
        findings: [
          {
            finding: 'Vômito, diarreia e pica (ocasional em gatos)',
            mechanism: 'Hipoperfusão esplâncnica, inflamação sistêmica e ==pancreatite aguda secundária==; pica associada à anemia crônica felina {{ref:ref-feline-ecc-2ed}}.',
            clinicalMeaning: 'Vômitos inviabilizam retenção oral de atovaquona e podem sinalizar pancreatite (alta letalidade em séries de B. canis).',
            priority: 'systemic',
          },
        ],
      },
      {
        system: 'urinary',
        findings: [
          {
            finding: 'Urina avermelhada ou castanho-escura (pigmentúria)',
            mechanism: 'Saturação da haptoglobina por ==hemoglobina livre plasmática== na hemólise intravascular com filtração glomerular {{ref:ref-nelson-couto-6ed}}.',
            clinicalMeaning: 'Exige centrifugação para separar hemoglobinúria de hematúria e correlação com CK para excluir mioglobinúria.',
            priority: 'systemic',
          },
        ],
      },
      {
        system: 'renal',
        findings: [
          {
            finding: 'Oligúria / anúria e azotemia aguda',
            mechanism: 'Sinergia entre hipoperfusão renal, toxicidade tubular oxidativa por heme e ==microtrombose glomerular== {{ref:ref-goddard-2026}}.',
            clinicalMeaning: '==Creatinina > 5 mg/dL é indicador crítico de mortalidade== e requer vigilância rigorosa do balanço hídrico.',
            priority: 'emergency',
          },
        ],
      },
      {
        system: 'neurologic',
        findings: [
          {
            finding: 'Estupor, ataxia e convulsões',
            mechanism: '==Hipoglicemia severa==, hipóxia anêmica, acidose metabólica ou estase/microtrombos na microcirculação encefálica {{ref:ref-greene-5ed-cap97}}.',
            clinicalMeaning: 'Checar glicemia, PA e lactato antes de rotular o quadro como babesiose cerebral.',
            priority: 'emergency',
          },
        ],
      },
      {
        system: 'ocular',
        findings: [
          {
            finding: 'Hemorragias retinianas ou déficit visual agudo',
            mechanism: 'Trombocitopenia severa somada à anemia profunda e lesão vascular endotelial {{ref:ref-nelson-couto-6ed}}.',
            clinicalMeaning: 'Achado menos comum, porém relevante no exame fundoscópico de pacientes críticos.',
            priority: 'uncommon',
          },
        ],
      },
    ],
    particularidadesCaninasEFelinas:
      '- Cães: B. vogeli varia de portador assintomático a crise hemolítica grave em filhotes; ==B. gibsoni gera anemia crônica ou refratária ao imidocarb== com forte componente imunomediado (esferocitose); B. rossi exemplifica falência inflamatória e tromboinflamação desproporcional ao grau de anemia {{ref:ref-greene-5ed-cap97}} {{ref:ref-goddard-2026}}.\n' +
      '- Gatos: em B. felis, a anemia instala-se lentamente até descompensar bruscamente após estresse ou contenção, sendo ==febre e icterícia raras na forma não complicada== (quando há febre intensa, pesquisar coinfecções); além disso, cerca de ==30% dos gatos críticos== albergam outro agente eritrocitário ou retrovírus (Mycoplasma haemofelis, FIV/FeLV) {{ref:ref-abcd-feline-babesiosis-2020}} {{ref:ref-feline-ecc-2ed}}.',
    tabelaFasesEvolutivas: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Espectro evolutivo temporal da babesiose (sem cronologia fixa universal)',
      headers: ['Fase clínica', 'Apresentação possível', 'Correlação fisiopatológica'],
      rows: [
        ['Incubação', 'Assintomática (dias a semanas após picada)', 'Ciclos iniciais de multiplicação eritrocitária antes de atingir limiar inflamatório'],
        ['Inicial', 'Febre, hiporexia e trombocitopenia precoce', 'Citocinas pirogênicas e consumo/sequestro plaquetário antes de hemólise evidente'],
        ['Aguda clássica', 'Anemia, mucosas pálidas, icterícia, esplenomegalia e pigmentúria', 'Aceleração da hemólise intra e extravascular com opsonização imune'],
        ['Grave / complicada', 'Choque, hipoglicemia, LRA oligúrica, dispneia, convulsões, CID', '==Falência de DO₂, tromboinflamação microvascular e acidose láctica=='],
        ['Subclínica / portador', 'Sem sinais clínicos ou alterações mínimas', 'Equilíbrio imunológico esplênico (premunição)'],
        ['Recrudescência', 'Retorno súbito de anemia grave e parasitemia', '==Quebra da premunição== por esplenectomia, corticoides ou comorbidades'],
      ],
    },
    tabelaFenotiposDeGravidade: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Fenótipos clínicos de gravidade e indicações prioritárias de UTI',
      headers: ['Fenótipo clínico', 'Critérios de reconhecimento', 'Conduta imediata e prioridade'],
      rows: [
        ['Portador subclínico', 'Exame físico e hemograma normais; apenas PCR+', 'Confirmar espécie e relevância clínica; ==não tratar gato brasileiro hígido com B. vogeli por reflexo=='],
        ['Não complicada', 'Anemia leve/moderada estável (cão 18–36%; gato 15–24%), normoperfundido', 'Diagnóstico etiológico completo (esfregaço + PCR) e antiprotozoário específico'],
        ['Anemia hemolítica grave', 'Queda rápida de Ht (==cão < 18%, gato < 14%==), taquicardia em repouso, prostração extrema', '==Concentrado de hemácias (pRBC)== sem sobrecarga de cristaloides'],
        ['Hemólise intravascular / pigmentúrica', 'Hemoglobinemia, hemoglobinúria ou suspeita de síndrome biliar vermelha', 'Vigilância estrita de creatinina/SDMA, eletrólitos e diurese'],
        ['Complicada (UTI)', 'Choque, ==lactato > 40 mg/dL, Cr > 5 mg/dL, albumina < 2,2 g/dL==, hipoglicemia, SARA ou CID', 'Internação intensiva imediata: oxigênio, correção glicêmica/pressórica, pRBC e monitorização seriada'],
      ],
    },
  },

  diagnosis: {
    algoritmoDiagnostico: {
      kind: 'interactiveAlgorithm',
      mode: 'diagnosis',
      title: 'Algoritmo Diagnóstico Interativo — Da Chegada no Plantão à Confirmação Etiológica',
      subtitle: 'Clique em cada etapa para abrir o racional clínico daquela fase, limites de confiabilidade, técnica de coleta/interpretação e evidências científicas.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Minutos 0–15 · Triagem',
          speciesTag: 'both',
          title: 'Estabilização inicial + Hemograma com reticulócitos e plaquetas (pré-terapia)',
          quickSummary:
            'Colher EDTA antes de qualquer antiprotozoário para graduar gravidade (==cão < 18%, gato < 14% = grave==), proteína total (hemólise vs hemorragia) e responder às ==3 perguntas diagnósticas==.',
          quickFacts: [
            { label: 'Indicação nesta fase', value: 'Todo paciente anêmico/ictérico/prostrado' },
            { label: 'Confiabilidade etiológica', value: 'Nula isoladamente (avalia síndrome, não causa)' },
            { label: 'Armadilha #1', value: 'Janela pré-regenerativa de 48–96 h' },
          ],
          details: [
            {
              label: 'Por que esta etapa é obrigatória antes de tratar',
              tone: 'default',
              content:
                'Todo raciocínio clínico precisa responder separadamente às ==3 perguntas obrigatórias==: (1) Há síndrome hemolítica/inflamatória? (2) Há comprovação de Babesia? (3) Essa infecção explica todo o quadro ou há coinfecções/diferenciais? {{ref:ref-greene-5ed-cap97}} Além disso, coletar sangue EDTA antes da primeira dose impede que o fármaco reduza a parasitemia e gere falso-negativo nos exames seguintes.',
            },
            {
              label: 'Confiabilidade e armadilhas fisiológicas do hemograma',
              tone: 'warning',
              content:
                '- ==Desidratação e hemodiluição==: paciente desidratado tem hemoconcentração transitória que mascara o hematócrito real até a reidratação; excesso de fluidos derruba falsamente o PCV.\n' +
                '- ==Janela pré-regenerativa (48–96 h)==: nos primeiros 2 a 4 dias de hemólise hiperaguda, a medula ainda não lançou reticulócitos no sangue periférico — portanto ==anemia normocítica normocrômica arregenerativa inicial NÃO exclui babesiose==. Em gatos, contar apenas ==reticulócitos agregados== (pontilhados permanecem semanas) {{ref:ref-nelson-couto-6ed}}.\n' +
                '- ==Proteínas plasmáticas totais==: hemólise mantém proteínas normais ou aumentadas, enquanto hemorragia aguda reduz proteínas totais.\n' +
                '- ==CHCM e plaquetas==: autoaglutinação ou hemólise elevam falsamente a CHCM; ==agregados plaquetários felinos derrubam falsamente a contagem eletrônica==, exigindo conferência em lâmina {{ref:ref-nelson-couto-6ed}}.',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Primeiras horas · Microscopia',
          speciesTag: 'both',
          title: 'Esfregaço sanguíneo imediato (sangue venoso + ponta de orelha/leito ungueal)',
          quickSummary:
            'Exame microscópico em imersão (1000x) na monocamada buscando ==piroplasmas grandes (> 2,5 µm) versus pequenos (~1–2,5 µm)==, esferócitos, autoaglutinação e mórulas.',
          quickFacts: [
            { label: 'Indicação nesta fase', value: 'Triagem rápida à beira do leito' },
            { label: 'Sensibilidade (Punia 2026)', value: '13% microscopia vs 29% PCR 18S' },
            { label: 'Regra de ouro', value: 'Negativo NÃO descarta a doença' },
          ],
          details: [
            {
              label: 'Por que fazer imediatamente e preferir ponta de orelha',
              tone: 'tip',
              content:
                'Confecionar a lâmina na hora evita artefatos por exposição prolongada ao EDTA. Coletar gota capilar na ==borda da orelha ou leito ungueal== e examinar a ==borda emplumada e a monocamada== eleva a chance de visualizar grandes Babesia (frequentemente sequestradas em capilares periféricos), além de detectar ==esferócitos== (hemólise imune secundária) e agentes coinfectantes como mórulas de Ehrlichia e hemoplasmas {{ref:ref-greene-5ed-cap97}} {{ref:ref-feline-ecc-2ed}}.',
            },
            {
              label: 'Confiabilidade e evidência científica (Punia et al., 2026)',
              tone: 'evidence',
              content:
                '- ==O que estudou Punia et al. (2026)==: compararam microscopia direta contra protocolos de PCR (incluindo semi-nested PCR para 18S rRNA e alvos mitocondriais) em ==100 cães clinicamente suspeitos== na Índia {{ref:ref-punia-2026}}.\n' +
                '- ==Principais achados==: a microscopia detectou ==13% (13/100)== de positivos, enquanto a semi-nested PCR 18S detectou ==29% (29/100)== (25 B. gibsoni e 4 B. vogeli). Além disso, testes mitocondriais variaram de sensibilidade entre alvos.\n' +
                '- ==Impacto clínico==: comprova que mais da metade dos cães infectados escapa ao esfregaço — logo ==esfregaço negativo jamais autoriza descartar babesiose==, e mesmo quando positivo o esfregaço não diferencia com segurança espécies dentro do mesmo grupo morfológico (ex.: B. vogeli versus Rangelia vitalii) {{ref:ref-punia-2026}}.',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Admissão / UTI · Órgãos e Urina',
          speciesTag: 'both',
          title: 'Bioquímica sérica, lactato/gasometria e urinálise com centrifugação',
          quickSummary:
            'Investigar falência multiorgânica (bilirrubinas, Cr/SDMA, ALT/FA, albumina, glicose, CK) e centrifugar urina para separar ==hematúria de hemoglobinúria==.',
          quickFacts: [
            { label: 'Indicação nesta fase', value: 'Avaliar LRA, hipoglicemia, CaO₂ e choque' },
            { label: 'Marcadores de alerta', value: 'Lactato > 40 mg/dL · Cr > 5 · Alb < 2,2' },
            { label: 'Diferencial pigmentúria', value: 'Centrifugação + CK sérica' },
          ],
          details: [
            {
              label: 'Como interpretar pigmentúria, bilirrubina, glicose e CK',
              tone: 'default',
              content:
                '- ==Urinálise com centrifugação==: fita reagente positiva para "sangue" não distingue hemácias de pigmentos livres. Ao centrifugar, se o ==sobrenadante clareia== há hematúria; se permanece ==vermelho/castanho sem hemácias no sedimento== trata-se de ==hemoglobinúria== (com plasma hemolisado) ou ==mioglobinúria== (plasma límpido e CK extremamente alta) {{ref:ref-nelson-couto-6ed}}.\n' +
                '- ==Glicose e lactato==: hipoglicemia e lactato > 40 mg/dL definem fenótipo grave de emergência neurológica/perfusional {{ref:ref-greene-5ed-cap97}}. Lembrar sempre da armadilha de ==SpO₂/PaO₂ normais coexistindo com déficit grave de CaO₂/DO₂== na anemia profunda {{ref:ref-dibartola-4ed}}.\n' +
                '- ==CK pós-imidocarb==: injeções IM de dipropionato de imidocarb elevam intensamente a creatina quinase muscular, não devendo ser confundidas com rabdomiólise sistêmica primária {{ref:ref-plumbs-10ed}}.',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Casos moderados/graves · Coagulação',
          speciesTag: 'both',
          title: 'Perfil hemostático e viscoelasticidade (TP, TTPa, fibrinogênio, D-dímero e TEG)',
          quickSummary:
            'Detectar coagulopatia de consumo e entender por que ==TP e TTPa normais NÃO excluem tromboinflamação microvascular ativa==.',
          quickFacts: [
            { label: 'Indicação nesta fase', value: 'Icterícia intensa, choque, petéquias ou UTI' },
            { label: 'Limite de TP/TTPa', value: 'Subestimam trombose e ação plaquetária' },
            { label: 'Base científica', value: 'Goddard et al. (2026) — TEG em 97 cães' },
          ],
          details: [
            {
              label: 'Por que testes plasmáticos convencionais falham na tromboinflamação (Goddard 2026)',
              tone: 'evidence',
              content:
                '- ==O que estudou Goddard et al. (2026)==: avaliaram coagulação convencional, tromboelastografia (TEG), marcadores endoteliais/inflamatórios e necropsia em ==97 cães naturalmente infectados por B. rossi comparados a 15 controles saudáveis== {{ref:ref-goddard-2026}}.\n' +
                '- ==Principais achados==: embora muitos cães não mostrassem alargamento franco de TP/TTPa suficientes para CID clássica isolada, a TEG revelou ==dissociação hemostática complexa== (atraso na fase de iniciação concomitante à firmeza máxima preservada) associada à ==presença de microtrombos de fibrina em múltiplos órgãos nos 12 cães que foram a óbito== {{ref:ref-goddard-2026}}.\n' +
                '- ==Impacto clínico==: D-dímero e TP/TTPa precisam ser interpretados em tendência evolutiva junto às plaquetas e fibrinogênio; testes convencionais normais não afastam trombose microvascular orgânica {{ref:ref-goddard-2026}}.',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: '24–72 h · Padrão-Ouro Molecular',
          speciesTag: 'both',
          title: 'PCR espécie-específica (18S rRNA, cytb, cox) versus Sorologia (IFA)',
          quickSummary:
            'Único método rotineiro capaz de separar ==B. vogeli, B. gibsoni, B. felis, B. galileei e Rangelia vitalii== e pesquisar mutações de resistência ==cytb M121I==.',
          quickFacts: [
            { label: 'Alvos recomendados', value: '18S rRNA + cytb + cox1/cox3 + ITS' },
            { label: 'Armadilha felina (VPP)', value: '21,7% gatos sadios PCR+ em Brasília' },
            { label: 'Controle pós-terapia', value: '2 PCRs tardias (60 e 90 dias em B. gibsoni)' },
          ],
          details: [
            {
              label: 'Confiabilidade e quando NÃO confiar em sorologia nem em PCR isolada',
              tone: 'danger',
              content:
                '- ==Sorologia (IFA IgG) NÃO confirma doença aguda==: em áreas hiperendêmicas brasileiras (PE e MG), ==82,4% (519/630)== dos cães tinham IgG positiva, mas apenas ==5,4% a 14,0%== eram positivos na PCR {{ref:ref-dantas-torres-2021}}. Além disso, animais hiperagudos podem ser soronegativos antes da soroconversão.\n' +
                '- ==Armadilha de VPP/VPN em gatos sadios (Oliveira et al., 2022)==: em Brasília, ==21,7% (36/166)== dos gatos sem sinais apresentaram DNA de piroplasmas sem alteração laboratorial {{ref:ref-oliveira-2022}}. A mesma PCR positiva tem altíssimo valor preditivo positivo em cão anêmico febril, mas ==significado causal frágil em gato saudável de check-up==.\n' +
                '- ==Quando testar após o tratamento==: não repetir PCR nos primeiros dias esperando cura (DNA residual pode positivar ou supressão temporária causar falso negativo). Para B. gibsoni, realizar ==duas PCRs seriadas aos 60 e 90 dias== (ou 30 e 60 dias) pós-término {{ref:ref-greene-5ed-cap97}} {{ref:ref-kirk-2017}}.',
            },
          ],
        },
        {
          stepNumber: 6,
          phaseBadge: 'Estabilidade · Diferenciais & Imagem',
          speciesTag: 'both',
          title: 'POCUS/Ultrassonografia e exclusão de coinfecções e Rangelia vitalii',
          quickSummary:
            'Descartar hemoabdome e neoplasias esplênicas no ultrassom, e rodar painel regional para ==Ehrlichia canis, Anaplasma, Mycoplasma spp., FeLV/FIV e Rangelia vitalii==.',
          quickFacts: [
            { label: 'Papel do POCUS/USG', value: 'Excluir hemorragia interna e massas' },
            { label: 'Diferencial crítico BR', value: 'Rangelia vitalii mimetiza B. vogeli' },
            { label: 'Coinfecção felina', value: '~30% com outro agente eritrocitário' },
          ],
          details: [
            {
              label: 'Por que nenhum achado ecográfico fecha o diagnóstico — mas muda a conduta',
              tone: 'tip',
              content:
                'Esplenomegalia e hepatomegalia ecográficas são esperadas na hemólise, porém inespecíficas. A grande contribuição imediata da ultrassonografia / POCUS é ==excluir hemorragia cavitária oculta (ex.: ruptura de hemangiossarcoma esplênico)== antes de rotular anemia aguda como hemolítica e orientar fluidoterapia sem edema pulmonar {{ref:ref-nelson-couto-6ed}} {{ref:ref-dibartola-4ed}}.\n\n' +
                'No Brasil, é obrigatório incluir ==Rangelia vitalii== no painel molecular de cães com anemia hemolítica, icterícia e sangramentos (inclusive pelas margens auriculares), assim como ==Mycoplasma haemofelis, FIV e FeLV== em todo gato anêmico antes de fechar o diagnóstico etiológico definitivo {{ref:ref-feline-ecc-2ed}}.',
            },
          ],
        },
      ],
    },

    tabelaMestreExamesLaboratoriais: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Síntese diagnóstica: rendimento temporal e limitações laboratoriais',
      headers: ['Exame', 'Achado esperado', 'Momento ideal', 'Principal limitação'],
      rows: [
        ['Hematócrito / PT', 'Anemia com proteína total normal/alta', 'Admissão e seriado', 'Desidratação mascara queda; excesso de fluido hemodilui'],
        ['Reticulócitos', 'Regeneração medular ativa (agregados em gatos)', 'Seriado após 48–96 h', '==Fase pré-regenerativa inicial simula arregeneração=='],
        ['Plaquetas + Lâmina', 'Trombocitopenia (conferir agregados)', 'Inicial e seriado', 'Agregados felinos falseiam contagem automática'],
        ['Esfregaço capilar', 'Piroplasmas grandes vs pequenos; esferócitos', 'Antes do tratamento', '==Baixa sensibilidade (13% em Punia 2026); não especia=='],
        ['Bilirrubina / Enzimas', 'Hiperbilirrubinemia; ALT/AST/FA variáveis', 'Inicial e evolução', 'Não separa hemólise de colestase/lesão hepática isoladamente'],
        ['Ureia / Cr / SDMA', 'Azotemia pré-renal ou LRA intrínseca', 'Inicial e pós-reidratação', 'Exige diferenciar pré-renal de necrose tubular'],
        ['Urinálise centrifugada', 'Hemoglobinúria sem hemácias no sedimento', 'Admissão', 'Fita positiva para sangue não diferencia hematúria/mioglobina'],
        ['Lactato / Gasometria', 'Hiperlactatemia (> 40 mg/dL); distúrbios mistos', 'Paciente crítico', 'PaO₂/SpO₂ normais não afastam hipóxia anêmica grave'],
        ['Hemostasia / TEG', 'TP/TTPa variáveis; TEG dissociação (Goddard 2026)', 'Fenótipo complicado', '==TP/TTPa normais não excluem microtrombose=='],
        ['PCR espécie-específica', 'Identificação 18S/cytb/cox + resistência', 'Pré-terapia e 60–90 d', 'Positividade em animal hígido não prova doença ativa'],
      ],
    },
    tabelaLeucograma: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Alterações do leucograma e armadilha da resposta inflamatória estéril',
      headers: ['Achado', 'Mecanismo fisiológico', 'Interpretação prática'],
      rows: [
        ['Neutrofilia', 'Resposta inflamatória sistêmica a citocinas / cortisol', '==NÃO comprova infecção bacteriana nem obriga antibiótico empírico=='],
        ['Desvio à esquerda', 'Demanda medular acelerada diante de inflamação aguda', 'Pesquisar toxicidade neutrofílica e complicações orgânicas'],
        ['Neutropenia / leucopenia', 'Marginação endotelial aguda ou coinfecção por Ehrlichia', 'Monitorar seriamente e rastrear erliquiose'],
        ['Linfopenia e eosinopenia', 'Leucograma clássico de estresse endógeno', 'Inespecífico, sem valor etiológico'],
        ['Monocitose', 'Estímulo fagocítico e remoção de restos eritrocitários', 'Apoia processo hemolítico/inflamatório subagudo'],
      ],
    },
    tabelaBioquimicaSerica: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Painel bioquímico sérico e implicações orgânicas',
      headers: ['Parâmetro', 'Comportamento típico', 'Mecanismo e alerta interpretativo'],
      rows: [
        ['Bilirrubina total', 'Elevação', 'Destruição acelerada do heme + colestase inflamatória/hipóxica'],
        ['ALT / AST', 'Elevação variável', 'Hipóxia centrolobular hepática; AST também sobe por lesão muscular (checar CK)'],
        ['FA (ALP) e GGT', 'Elevação variável', 'Colestase intra-hepática induzida por citocinas inflamatórias'],
        ['Ureia / Creatinina / SDMA', 'Elevação', 'Azotemia pré-renal versus LRA intrínseca (==Cr > 5 mg/dL eleva mortalidade==)'],
        ['Albumina', 'Redução', 'Proteína de fase aguda negativa e extravasamento endotelial (==< 2,2 g/dL = pior prognóstico==)'],
        ['Glicose', 'Hiper ou hipoglicemia', 'Hiperglicemia por estresse em gatos; ==hipoglicemia grave típica de B. rossi / sepse=='],
        ['Lactato', 'Elevação', 'Hipoperfusão e metabolismo anaeróbio por queda de DO₂ (==> 40 mg/dL grave==)'],
        ['CK', 'Elevação', 'Decúbito, hipóxia muscular ou ==aplicação IM de dipropionato de imidocarb=='],
      ],
    },
    tabelaUrinaliseEPigmenturia: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Diferenciação prática de pigmentúrias após fita reagente positiva para sangue',
      headers: ['Característica', 'Hematúria', 'Hemoglobinúria', 'Mioglobinúria'],
      rows: [
        ['Origem', 'Hemácias no trato urinário', 'Hemoglobina plasmática livre filtrada', 'Mioglobina por rabdomiólise'],
        ['Sedimento microscópico', 'Rico em hemácias (cuidado: densidade < 1,008 lisa)', 'Ausência ou raras hemácias', 'Ausência ou raras hemácias'],
        ['Sobrenadante centrifugado', '==Clareia completamente==', '==Permanece vermelho/castanho + plasma rosado==', 'Permanece escuro + plasma límpido e ==CK muito alta=='],
      ],
    },
    tabelaHemostasia: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Hemostasia convencional (TP/TTPa) versus viscoelasticidade (TEG/ROTEM)',
      headers: ['Teste', 'O que avalia', 'Limitação e interpretação na babesiose'],
      rows: [
        ['Plaquetas', 'Número circulante', 'Queda precoce e comum; sempre confirmar agregados felinos em lâmina'],
        ['TP / TTPa', 'Fatores plasmáticos solúveis', '==Normais NÃO afastam microtrombose e tromboinflamação orgânica=='],
        ['Fibrinogênio', 'Proteína de fase aguda / substrato', 'Sobe na inflamação aguda ou cai no consumo avançado da CID'],
        ['D-dímero / FDP', 'Lise de fibrina', 'Eleva-se na inflamação e trombose local; baixa especificidade isolada para CID'],
        ['TEG / ROTEM', 'Cinética global sangue total', 'Revela hipo e hipercoagulabilidade simultâneas e microtrombose (Goddard 2026)'],
      ],
    },
    imagemEAnatomopatologia:
      'Métodos de imagem complementam o estadiamento, embora não substituam confirmação etiológica:\n\n' +
      '- ==Ultrassonografia abdominal e POCUS==: úteis para afastar hemoabdome, hemangiossarcoma esplênico e efusões cavitárias na anemia aguda, bem como monitorar congestão volêmica à beira do leito {{ref:ref-nelson-couto-6ed}} {{ref:ref-dibartola-4ed}}.\n' +
      '- ==Radiografia torácica e TC/RM==: radiografia identifica edema pulmonar não cardiogênico/SARA em dispneicos; TC/RM encefálicas restringem-se a sinais neurológicos refratários após correção de glicemia, perfusão e oxigenação.\n' +
      '- ==Necropsia e histopatologia==: revelam congestão esplênica, necrose tubular pigmentar, necrose hepática centrolobular e microtrombos de fibrina multiorgânicos, exigindo confirmação por PCR tecidual {{ref:ref-goddard-2026}}.',
    tabelaDiagnosticosDiferenciaisCaes: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Diagnósticos diferenciais prioritários em cães no Brasil',
      headers: ['Diferencial', 'Sobreposição clínica', 'Como diferenciar na rotina'],
      rows: [
        ['AHIM primária', 'Anemia regenerativa, esferócitos, icterícia, Coombs+', '==Obrigatório excluir Babesia, Ehrlichia e hemoplasmas por PCR antes de assumir primária=='],
        ['Erliquiose (E. canis)', 'Febre, prostração, trombocitopenia e anemia', 'Mórulas, sorologia e PCR; ==doxiciclina NÃO cura Babesia=='],
        ['Rangelia vitalii', 'Anemia hemolítica, icterícia, febre e sangramento auricular/cavidades', 'Altamente prevalente no Sul/Sudeste/Centro-Oeste BR; ==exige PCR/sequenciamento específico=='],
        ['Anaplasmose (A. platys)', 'Trombocitopenia cíclica (frecuentemente em coinfecção)', 'Inclusões intraplaquetárias e PCR espécie-específica'],
        ['Leptospirose', 'Febre, icterícia, LRA aguda, trombocitopenia e hemorragias', 'PCR sangue/urina e sorologia MAT pareada'],
        ['Hemorragia cavitária', 'Anemia súbita, palidez e choque', '==Proteínas totais baixas== e POCUS revelando hemoabdome/massa'],
        ['Hemólise oxidativa / tóxica', 'Anemia aguda, pigmentúria e icterícia', 'Histórico (cebola, zinco, paracetamol) e corpúsculos de Heinz / excentrócitos'],
      ],
    },
    diferenciaisFelinosERangeliose:
      '- ==Diferenciais prioritários em gatos anêmicos==: micoplasmoses hemotrópicas (Mycoplasma haemofelis e correlatos — principal diferencial infeccioso no Brasil), retroviroses ==FeLV e FIV== (testar sempre), cytauxzoonose (==Cytauxzoon felis== é outro piroplasma muito mais letal e não deve ser confundido com Babesia nos protocolos de tratamento), AHIM felina, hemólise oxidativa e doenças mieloproliferativas {{ref:ref-nelson-couto-6ed}} {{ref:ref-abcd-feline-babesiosis-2020}} {{ref:ref-feline-ecc-2ed}}.\n' +
      '- ==Importância estratégica de Rangelia vitalii no Brasil==: muitos casos rotulados empiricamente apenas pelo esfregaço como "babesiose canina hemorrágica" são na realidade rangeliose (ou coinfecção). Por apresentar sangramentos mucocutâneos marcantes somados à hemólise, painéis moleculares caninos brasileiros devem contemplar B. vogeli, B. gibsoni e R. vitalii em paralelo.',
  },

  treatment: {
    algoritmoTerapeuticoBabesiose: {
      kind: 'interactiveAlgorithm',
      mode: 'treatment',
      title: 'Algoritmo Terapêutico Interativo — Do Suporte Crítico ao Protocolo por Espécie',
      subtitle: 'Clique em cada etapa para visualizar mecanismo de ação, indicações exatas, doses e conversões de sal, vias, duração, avaliação de melhora/cura, evidências científicas e alertas letais.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Etapa 1 · Minutos 0–15',
          speciesTag: 'both',
          title: 'Estabilização hemodinâmica conservadora e Hemotransfusão criteriosa',
          quickSummary:
            'Corrigir choque e hipoglicemia sem hemodiluição e repor massa eritrocitária via ==concentrado de hemácias (pRBC)== guiado por sinais de hipóxia e DO₂.',
          quickFacts: [
            { label: 'Prova volêmica (só se choque)', value: 'Cão 5–10 mL/kg · Gato 3–5 mL/kg' },
            { label: 'Linha e filtro', value: 'NaCl 0,9% exclusiva · Filtro 170–260 µm' },
            { label: 'Tempo máximo infusão', value: 'Até 4 horas por unidade' },
          ],
          details: [
            {
              label: 'Por que evitar excesso de cristaloides e quando transfundir',
              tone: 'default',
              content:
                '- ==Anemia não é hipovolemia==: pacientes normovolêmicos com anemia grave pioram abruptamente se receberem fluidoterapia de ressuscitação agressiva (queda adicional de hemoglobina por hemodiluição e risco de edema pulmonar) {{ref:ref-dibartola-4ed}}.\n' +
                '- ==Indicação de pRBC==: taquicardia/taquipneia em repouso refratárias, fraqueza extrema, hiperlactatemia persistente ou queda aguda rápida do hematócrito. Calcular volume estimado por ==V = Vs × (Ht_alvo − Ht_atual) / Ht_produto== {{ref:ref-dibartola-4ed}}.\n' +
                '- ==Regras imuno-hematológicas obrigatórias==: usar ==exclusivamente NaCl 0,9%== para diluição (jamais Ringer com lactato por coagulação cálcica do citrato nem glicose 5% por lise osmótica), ==filtro de 170–260 µm== e concluir em até 4 horas. Em cães, tipar DEA 1.1 e fazer prova cruzada se transfusão prévia > 4 dias; ==em gatos, tipagem A/B/Mik + prova cruzada (crossmatch) são OBRIGATÓRIAS mesmo na 1ª transfusão== pelo risco fatal de aloanticorpos naturais anti-A {{ref:ref-dibartola-4ed}} {{ref:ref-feline-ecc-2ed}}.',
            },
            {
              label: 'Como avaliar melhora clínica imediata',
              tone: 'tip',
              content:
                'Redução da frequência cardíaca e respiratória de repouso, normalização do lactato (< 2,5 mmol/L ou < 22 mg/dL), estabilização da glicemia e ganho efetivo de hematócrito após 1–4 horas do término da transfusão, sem febre nem hemoglobinúria pós-transfusional {{ref:ref-dibartola-4ed}}.',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Etapa 2 · Grandes Babesia Caninas',
          speciesTag: 'dog',
          title: 'Dipropionato de imidocarb — Primeira linha para B. vogeli, B. canis e B. rossi',
          quickSummary:
            'Antiprotozoário de escolha para grandes piroplasmas caninos (==5–6,6 mg/kg IM ou SC, repetido em 14 dias==). ==Proibição absoluta da via IV==.',
          quickFacts: [
            { label: 'Mecanismo', value: 'Carbanilida · Bloqueio poliaminas/DNA' },
            { label: 'Dose e intervalo', value: '5–6,6 mg/kg IM ou SC · D1 e D14' },
            { label: 'Conferência química', value: '85 mg/mL base = 121,15 mg/mL sal' },
          ],
          details: [
            {
              label: 'Mecanismo, indicação, dose exata e duração',
              tone: 'default',
              content:
                '- ==Mecanismo de ação==: derivado diamidínico/carbanilida que interfere no metabolismo de poliaminas e reparo de ácidos nucleicos do piroplasma, reduzindo drasticamente a parasitemia para depuração esplênica {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Posologia==: ==5–6 mg/kg== {{ref:ref-esccap-gl5-2024}} a ==6,6 mg/kg== {{ref:ref-plumbs-10ed}} {{ref:ref-bsava-10ed}} via ==IM profunda ou SC== em 2 aplicações com intervalo de ==14 dias==. Não adotar "subdose de 2 mg/kg para premunição", prática contraindicada pelo risco de falha clínica e seleção de resistência {{ref:ref-greene-5ed-cap97}}.\n' +
                '- ==Avaliação de resposta==: defervescência e recuperação energética costumam ocorrer em 24–72 horas, acompanhadas de estabilização/aumento do hematócrito e plaquetas em 48–96 h (a elevação isolada de CK sérica é esperada pela dor/irritação muscular local pós-IM) {{ref:ref-plumbs-10ed}}.',
            },
            {
              label: 'ALERTAS LETAIS: base versus sal, via IV proibida e erro decimal da atropina',
              tone: 'danger',
              content:
                '- ==Concentração comercial==: certos produtos rotulam ==85 mg/mL de imidocarb-base==, que equivalem a ==121,15 mg/mL de dipropionato de imidocarb== (120 mg/mL em outras bulas) {{ref:ref-bsava-10ed}}. Nunca calcular volume automaticamente sem checar em qual forma química o rótulo está expresso!\n' +
                '- ==VIA IV PROIBIDA==: administração intravenosa provoca toxicidade colinérgica e morte aguda.\n' +
                '- ==Erro decimal clássico da atropina==: quando necessária pré-medicação anticolinérgica para controlar hipersalivação, vômitos, diarreia ou bradicardia muscarínica, a dose correta é ==0,02–0,05 mg/kg SC== — ==JAMAIS 0,5 mg/kg== (superdosagem de 10x que gera toxicidade anticolinérgica severa) {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Contraindicações/Interações==: associação com organofosforados, carbamatos ou inibidores de colinesterase; usar com extrema cautela em insuficiência renal, hepática ou pulmonar grave.',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Etapa 3 · Babesia gibsoni Canina',
          speciesTag: 'dog',
          title: 'Atovaquona + Azitromicina — Padrão-ouro para B. gibsoni, B. conradae e B. vulpes',
          quickSummary:
            '==Atovaquona 13,3 mg/kg VO q8h (com alimento gorduroso)== + ==Azitromicina 10 mg/kg VO q24h== por ==10 dias==. Nunca usar atovaquona isolada nem Malarone.',
          quickFacts: [
            { label: 'Mecanismo sinérgico', value: 'Complexo bc₁ + Ribossomo apicoplasto' },
            { label: 'Eficácia (Kirk 2017)', value: '93% (39/42) 2 PCRs negativas' },
            { label: 'Interações críticas', value: 'Evitar metoclopramida e doxiciclina' },
          ],
          details: [
            {
              label: 'Mecanismo, posologia, farmacocinética lipídica e interações',
              tone: 'default',
              content:
                '- ==Mecanismos complementares==: atovaquona inibe o complexo citocromo bc₁ mitocondrial (bloqueando síntese de pirimidinas), enquanto a azitromicina bloqueia a tradução proteica no apicoplasto do protozoário {{ref:ref-plumbs-10ed}} {{ref:ref-greene-5ed-cap97}}.\n' +
                '- ==Dose, via e duração==: ==Atovaquona 13,3 mg/kg (13,3–13,4 mg/kg) VO q8h== + ==Azitromicina 10 mg/kg VO q24h== por ==10 dias==.\n' +
                '- ==Alimento gorduroso é obrigatório==: a biodisponibilidade oral basal da atovaquona é baixa (23–47%), mas ==dobra ou triplica quando administrada com refeição rica em gordura== {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Por que NÃO usar Malarone (atovaquona/proguanil)==: o proguanil causa vômitos intensos em cães e expulsa o fármaco antes da absorção {{ref:ref-greene-5ed-cap97}}.\n' +
                '- ==Interações medicamentosas críticas==: ==metoclopramida, tetraciclinas (inclusive doxiciclina!) e rifampicina reduzem os níveis plasmáticos da atovaquona==; além disso, a azitromicina inibe glicoproteína-P e pode ==prolongar intervalo QT== quando associada a ondansetrona, cisaprida, azólicos ou fluoroquinolonas {{ref:ref-plumbs-10ed}}.',
            },
            {
              label: 'Estudos de eficácia (Kirk et al., 2017) e avaliação de cura',
              tone: 'evidence',
              content:
                '- ==O que estudou Kirk, Levy & Crawford (2017)==: coorte clínica prospectiva em ==42 cães Pit Bull resgatados naturalmente infectados por B. gibsoni== tratados com suspensão manipulada de atovaquona (13,4 mg/kg VO q8h com alimento gorduroso) + azitromicina (10 mg/kg VO q24h) por 10 dias {{ref:ref-kirk-2017}}.\n' +
                '- ==Principais achados e impacto==: ==93% (39/42) alcançaram duas PCRs negativas seriadas separadas por 30 dias== após o término (embora sem grupo controle paralelo). Demonstra na prática que a manipulação de qualidade associada à gordura garante altíssima taxa de depuração molecular {{ref:ref-kirk-2017}}.\n' +
                '- ==Como avaliar cura==: acompanhar hematócrito em 7–14 dias e confirmar ==duas PCRs negativas tardias aos 60 e 90 dias== pós-terapia (evitando falso-negativo precoce e pesquisando mutação ==cytb M121I== se recidivar) {{ref:ref-greene-5ed-cap97}} {{ref:ref-lin-2012}}.',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Etapa 4 · B. gibsoni Refratária (M121I)',
          speciesTag: 'dog',
          title: 'Protocolo de resgate CDI e armadilhas da resistência molecular',
          quickSummary:
            'Reservado para ==falha molecular documentada à atovaquona + azitromicina== (mutação ==cytb M121I/M128I==): protocolo ==CDI== (clindamicina + diminazeno + imidocarb).',
          quickFacts: [
            { label: 'Indicação restrita', value: 'Recidiva / mutação cytb M121I confirmada' },
            { label: 'Evidência (Lin 2012)', value: 'CDI 11/13 recuperados (2/13 recidiva)' },
            { label: 'Risco limitante', value: 'Neurotoxicidade grave do diminazeno' },
          ],
          details: [
            {
              label: 'Estudo de Lin et al. (2012), regime CDI e contraindicações prévias',
              tone: 'warning',
              content:
                '- ==O que estudou Lin et al. (2012)==: ensaio clínico prospectivo não mascarado comparando ==30 cães naturalmente infectados por B. gibsoni== alocados entre atovaquona + azitromicina (AA, n = 17) versus esquema tríplice ==CDI (n = 13)==: clindamicina 30 mg/kg VO q12h + aceturato de diminazeno 3,5 mg/kg IM no dia 1 + dipropionato de imidocarb 6 mg/kg SC no dia 2 {{ref:ref-lin-2012}}.\n' +
                '- ==Achados e impacto==: no grupo AA houve 9/17 recuperações e 7/17 recidivas associadas a ==mutações pontuais M121I no gene mitocondrial cytb== (tempo médio 23,3 dias), enquanto no grupo CDI 11/13 recuperaram com apenas 2/13 recidivas (média 41,7 dias). ==Impacto clínico==: explica o mecanismo molecular de resistência à atovaquona e posiciona o CDI como ==terapia de resgate especializado==, jamais como primeira escolha rotineira devido ao risco de neurotoxicidade do diminazeno {{ref:ref-lin-2012}} {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Erro prévio fatal para o tratamento==: ==NUNCA usar clindamicina em monoterapia antes da atovaquona + azitromicina==, pois induz resistência cruzada aos macrolídeos e inutiliza a azitromicina depois {{ref:ref-greene-5ed-cap97}}.',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Etapa 5 · Babesiose Felina (Alto Risco)',
          speciesTag: 'cat',
          title: 'Primaquina em B. felis versus Imidocarb em grandes Babesia felinas',
          quickSummary:
            'Indicado ==apenas em gatos com síndrome clínica atribuível==. ==Primaquina tem janela terapêutica estreitíssima (> 1 mg/kg pode ser fatal)== — exigir checagem química dupla sal vs base.',
          quickFacts: [
            { label: 'Conversão química', value: '1 mg fosfato = 0,57 mg primaquina-base' },
            { label: 'Limiar letal felino', value: 'Doses > 1 mg/kg podem ser FATAIS' },
            { label: 'Regra Brasil (Oliveira 2022)', value: 'Não tratar gato hígido só por PCR+' },
          ],
          details: [
            {
              label: 'ALERTA DE SEGURANÇA MÁXIMA: Primaquina para B. felis (base vs fosfato vs mg/gato)',
              tone: 'danger',
              content:
                '- ==Mecanismo e indicação==: 8-aminoquinolina com ação oxidativa intraeritrocitária contra ==Babesia felis sensu stricto== (espécie resistente ao imidocarb). NUNCA extrapolar para B. felis o esquema de Cytauxzoon felis {{ref:ref-nelson-couto-6ed}} {{ref:ref-abcd-feline-babesiosis-2020}}.\n' +
                '- ==Armadilha mortal de conversão química==: ==1 mg de fosfato de primaquina = 0,57 mg de primaquina-base== (comprimido de 26,3 mg de fosfato = 15 mg de base). Fontes distintas expressam o regime de formas diferentes e ==JAMAIS podem ser somadas==: (a) ==0,5 mg/kg de fosfato VO/IM== (1–3 doses q72h + semanais) {{ref:ref-abcd-feline-babesiosis-2020}}; (b) ==0,5–1 mg/kg de base VO== (dose única ou por 3 dias) {{ref:ref-plumbs-10ed}}; ou (c) ==1 mg/GATO de fosfato== (q36h x 4 doses + semanal x 4) {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Por que doses > 1 mg/kg matam gatos==: devido aos 8–10 grupos sulfidrila reativos da hemoglobina felina, o excesso desencadeia ==metemoglobinemia severa, corpúsculos de Heinz, hemólise oxidativa paradoxal, vômitos incoercíveis e óbito== {{ref:ref-plumbs-10ed}} {{ref:ref-feline-ecc-2ed}} {{ref:ref-ettinger-9ed}}. Taxa descrita de recidiva de B. felis é de 20–80%, exigindo hematócrito semanal e vigilância de cianose.',
            },
            {
              label: 'Imidocarb em grandes Babesia felinas e B. galileei',
              tone: 'evidence',
              content:
                '- Em grandes Babesia felinas suscetíveis, cita-se ==dipropionato de imidocarb 2,5 mg/kg IM dose única== {{ref:ref-bsava-10ed}}; na série de ==Baneth et al. (2024)== para B. galileei (n = 3), utilizou-se ==3,5 mg/kg SC== com recuperação clínica (porém 1/3 permaneceu PCR+ no D9) {{ref:ref-baneth-2024}}.\n' +
                '- Em gatos assintomáticos do Brasil com DNA de B. vogeli (==21,7% em Oliveira et al., 2022==), não há indicação rotineira de expor o felino à toxicidade medicamentosa sem evidência clínica {{ref:ref-oliveira-2022}}.',
            },
          ],
        },
        {
          stepNumber: 6,
          phaseBadge: 'Etapa 6 · Iatrogenias, Adjuvantes e Seguimento',
          speciesTag: 'both',
          title: 'Condutas proibidas, manejo de coinfecções e cronograma de cura molecular',
          quickSummary:
            'Vetar ==corticoides rotineiros, doxiciclina como monoterapia antibabesiana e ferro empírico==; programar retorno hematológico (48–72 h / 7–14 d) e ==PCR dupla aos 60 e 90 dias==.',
          quickFacts: [
            { label: 'Corticoides', value: 'Vetados de rotina (pioram parasitemia)' },
            { label: 'Doxiciclina', value: 'Só p/ coinfecção (não coadministrar c/ AA)' },
            { label: 'Esplenectomia eletiva', value: 'Aguardar ≥ 60 dias pós-terapia eficaz' },
          ],
          details: [
            {
              label: 'Contraindicações críticas na prática clínica',
              tone: 'warning',
              content:
                '- ==Corticosteroides rotineiros==: diretrizes internacionais vetam corticoterapia empírica na babesiose porque imunossupressão compromete o controle da parasitemia {{ref:ref-troccap-babesia}}. Reservar apenas para hemólise imunomediada secundária refratária ameaçadora à vida ==já sob antiprotozoário específico==.\n' +
                '- ==Doxiciclina isolada==: trata Ehrlichia, Anaplasma e hemoplasmas coinfectantes, porém ==não elimina Babesia== e ainda pode reduzir níveis plasmáticos da atovaquona se administrada concomitantemente {{ref:ref-plumbs-10ed}}.\n' +
                '- ==Suplementação empírica de ferro==: na hemólise há reciclagem e sobrecarga esplênica de ferro; administrar ferro parenteral/oral sem ferroprivia real promove toxicidade oxidativa {{ref:ref-nelson-couto-6ed}}.',
            },
            {
              label: 'Critérios objetivos de cura clínica versus cura molecular',
              tone: 'tip',
              content:
                '- ==48–72 horas e 7–14 dias==: avaliar elevação progressiva de reticulócitos, subida do hematócrito, normalização de plaquetas e queda da bilirrubina (realizando a 2ª dose de imidocarb no D14 quando aplicável).\n' +
                '- ==60 e 90 dias pós-tratamento (especialmente B. gibsoni)==: solicitar ==duas PCRs seriadas== nesse intervalo tardio para diferenciar remissão clínica temporária de depuração molecular real, lembrando que mesmo após 2 PCRs negativas o animal deve permanecer excluído de doação de sangue {{ref:ref-greene-5ed-cap97}} {{ref:ref-esccap-gl5-2024}}.',
            },
          ],
        },
      ],
    },

    tabelaProtocolosPorEspecie: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Protocolos antiprotozoários documentados por espécie de Babesia',
      headers: ['Hospedeiro e espécie', 'Protocolo de referência', 'Evidência e alerta essencial'],
      rows: [
        [
          'Cão — B. vogeli, B. canis, B. rossi',
          '==Dipropionato de imidocarb 5–6,6 mg/kg IM ou SC== (repetir em 14 d)',
          'Diretriz padrão; ==NUNCA via IV==. Conferir concentração do rótulo (85 mg/mL base = 121,15 mg/mL sal).',
        ],
        [
          'Cão — B. gibsoni (1ª escolha)',
          '==Atovaquona 13,3 mg/kg VO q8h + Azitromicina 10 mg/kg VO q24h== por 10 dias',
          '93% de sucesso molecular em Kirk et al. (2017); dar atovaquona com ==alimento gorduroso== e sem metoclopramida/doxiciclina.',
        ],
        [
          'Cão — B. gibsoni refratária (M121I)',
          'CDI: Clindamicina 30 mg/kg VO q12h + Diminazeno 3,5 mg/kg IM (D1) + Imidocarb 6 mg/kg SC (D2)',
          'Resgate especializado (Lin et al., 2012); diminazeno acarreta risco grave de neurotoxicidade.',
        ],
        [
          'Cão — B. conradae / B. vulpes',
          'Atovaquona 13,3 mg/kg VO q8h + Azitromicina 10 mg/kg VO q24h por 10 dias',
          'Resposta variável em B. vulpes com persistência molecular frequente; acompanhar por PCR.',
        ],
        [
          'Gato — B. felis sensu stricto',
          '==Primaquina== (ver Tabela 13 — checar sal vs base e mg/kg vs mg/gato)',
          '==Janela estreitíssima: > 1 mg/kg pode ser FATAL==; risco de metemoglobinemia e corpúsculos de Heinz.',
        ],
        [
          'Gato — Grandes Babesia / B. galileei',
          'Dipropionato de imidocarb 2,5 mg/kg IM (dose única) ou 3,5 mg/kg SC (série 2024)',
          'Evidência ainda limitada (Baneth et al., 2024, n = 3); não usar em portadores assintomáticos.',
        ],
      ],
    },
    tabelaPrimaquinaFelinaAlertaAltoRisco: {
      kind: 'clinicalTable',
      caption: 'Tabela 13 — Primaquina em gatos: alerta de risco letal (NÃO somar esquemas)',
      headers: ['Protocolo descrito na literatura', 'Base química e unidade exatas', 'Vigilância obrigatória'],
      rows: [
        [
          'Regime baseado no sal fosfato',
          '==Fosfato de primaquina 0,5 mg/kg== VO/IM (1–3 doses q72h + semanais)',
          'Equivale a ~0,285 mg/kg de primaquina-base; monitorar vômitos, cianose e hematócrito.',
        ],
        [
          'Regime baseado na molécula-base',
          '==Primaquina-base 0,5–1 mg/kg VO== (dose única ou por 3 dias)',
          'Conversão obrigatória: ==1 mg fosfato = 0,57 mg base==; ==doses > 1 mg/kg podem ser fatais==.',
        ],
        [
          'Regime fixo por animal',
          '==Fosfato de primaquina 1 mg/GATO== VO q36h x 4 doses, depois semanal x 4',
          'Dose FIXA por gato (==jamais confundir mg/gato com mg/kg==!).',
        ],
      ],
    },
    terapiasControversasOuContraindicadas:
      'Condutas que aumentam morbidade ou comprometem o controle parasitário:\n\n' +
      '- ==Corticosteroides de rotina==: ausência de benefício e piora do controle parasitário; restringir apenas à AHIM secundária refratária grave já sob terapia antiprotozoária eficaz {{ref:ref-troccap-babesia}}.\n' +
      '- ==Doxiciclina isolada==: não trata Babesia e ainda reduz níveis plasmáticos da atovaquona se coadministrada nos 10 dias {{ref:ref-plumbs-10ed}}.\n' +
      '- ==Clindamicina prévia em monoterapia para B. gibsoni==: seleciona resistência cruzada a macrolídeos e compromete o esquema atovaquona + azitromicina {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==Anticoagulação profilática universal sem critério ou suplementação rotineira de ferro==: sem respaldo clínico na literatura veterinária atual {{ref:ref-goddard-2026}} {{ref:ref-nelson-couto-6ed}}.',
    tabelaMonitoramentoEFalhaTerapeutica: {
      kind: 'clinicalTable',
      caption: 'Tabela 14 — Cronograma de monitorização clínica, hematológica e molecular',
      headers: ['Momento', 'Parâmetros acompanhados', 'Objetivo prático'],
      rows: [
        ['Admissão', 'Exame físico, PCV/PT, glicemia, lactato, bioquímica, esfregaço e PCR', 'Estabilizar paciente e garantir coleta antes de antiparasitários'],
        ['12–24 h (UTI)', 'PA, FC, FR, glicemia, débito urinário e PCV pós-transfusão', 'Detectar choque refratário, hipoglicemia e reações transfusionais'],
        ['48–72 horas', 'Hemograma, plaquetas, bilirrubina, creatinina e tolerância medicamentosa', 'Confirmar desaceleração da hemólise e resposta plaquetária inicial'],
        ['7–14 dias', 'Hemograma com reticulócitos, bioquímica e 2ª dose de imidocarb', 'Confirmar regeneração medular, checar toxicidade e concluir esquema'],
        ['60 e 90 dias (tardio)', 'Hemograma e ==duas PCRs seriadas== (obrigatório em B. gibsoni)', 'Distinguir cura clínica de persistência; aguardar ≥ 60 d se esplenectomia'],
      ],
    },
  },

  complications: {
    complicacoesOrganicasESinaisDeAlerta:
      '- ==Hipóxia anêmica e choque distributivo==: queda abrupta de DO₂ com hiperlactatemia (> 40 mg/dL), colapso vascular e disfunção miocárdica inflamatória.\n' +
      '- ==Lesão renal aguda (LRA) e síndrome biliar vermelha==: necrose tubular aguda oxidativa e isquêmica combinada à hemoconcentração paradoxal por extravasamento capilar, elevando risco de SARA e CID {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==Tromboinflamação e microtrombose multiorgânica==: formação disseminada de microtrombos de fibrina e consumo plaquetário documentados em formas virulentas {{ref:ref-goddard-2026}}.\n' +
      '- ==Pancreatite aguda secundária e hipoglicemia grave==: toxicidade endotelial por hemoglobina livre sobre pâncreas e consumo metabólico intenso.\n' +
      '- ==Toxicidades medicamentosas evitáveis==: crise colinérgica ou erro decimal de atropina (0,5 mg/kg) no imidocarb; metemoglobinemia/hemólise fatal por primaquina (> 1 mg/kg); neurotoxicidade por diminazeno; e intoxicação neurológica letal em gatos por permetrina {{ref:ref-plumbs-10ed}}.',
    fatoresPrognosticosEMortalidade:
      '- ==Indicadores quantitativos de alto risco==: ==lactato plasmático > 40 mg/dL, creatinina sérica > 5 mg/dL e albumina < 2,2 g/dL== associam-se fortemente à mortalidade {{ref:ref-greene-5ed-cap97}}.\n' +
      '- ==Mortalidade por disfunção orgânica==: em série clínica europeia com ==240 cães infectados por B. canis==, lesão renal aguda elevou a mortalidade para ==34%== e pancreatite aguda concomitante atingiu ==40%== {{ref:ref-greene-5ed-cap97}}; já em coorte de ==97 cães com B. rossi==, registraram-se ==12 óbitos (12,4%)== correlacionados à falência orgânica e microtrombose {{ref:ref-goddard-2026}}.\n' +
      '- ==Prognóstico por espécie e resposta terapêutica==: B. vogeli não complicada tem bom prognóstico com estabilização e imidocarb precoces; B. gibsoni e B. felis apresentam maior risco de recidiva ou persistência molecular exigindo acompanhamento hematológico e PCR tardia {{ref:ref-kirk-2017}} {{ref:ref-feline-ecc-2ed}}.',
    tabelaComplicacoesECondutaUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 15 — Complicações graves, sinais de alarme e conduta prioritária de UTI',
      headers: ['Complicação', 'Sinais de alarme clínico/laboratorial', 'Prioridade imediata'],
      rows: [
        ['Hipóxia anêmica descompensada', 'Taquicardia/taquipneia em repouso, letargia extrema, ==lactato > 40 mg/dL==', 'Concentrado de hemácias (pRBC) sem hemodiluição por excesso de cristaloides'],
        ['LRA / síndrome biliar vermelha', 'Oligúria, ==creatinina > 5 mg/dL==, urina vinho com PCV paradoxalmente alto', 'Monitorizar diurese, evitar nefrotóxicos e sobrecarga hídrica'],
        ['Tromboinflamação e CID', 'Hemorragias mucosas, ==albumina < 2,2 g/dL==, alterações seriadas de hemostasia/TEG', 'Suporte perfusional, pRBC e vigilância de disfunção orgânica múltipla'],
        ['Pancreatite secundária', 'Vômitos incoercíveis, dor abdominal cranial, elevação de lipase/imagem', 'Antieméticos (evitando metoclopramida c/ atovaquona), analgesia e suporte enteral'],
        ['Hipoglicemia / encefalopatia', 'Estupor, ataxia, convulsões, glicemia baixa à beira do leito', 'Correção glicêmica imediata e restauração de perfusão antes de assumir lesão primária'],
      ],
    },
  },

  prevention: {
    controleVetorialEVelocidadeDeTransmissao:
      'No Brasil, o ciclo domiciliar contínuo de ==Rhipicephalus sanguineus sensu lato== exige prevenção ectoparasitária ininterrupta durante todos os meses do ano, associada ao manejo ambiental de frestas, canis e abrigos {{ref:ref-esccap-gl5-2024}}.\n\n' +
      'Embora a maturação salivar dos esporozoítos demore classicamente 48–72 horas após a fixação do carrapato, estudos experimentais com Dermacentor reticulatus comprovaram transmissão de B. canis em apenas ==~8 horas de alimentação== {{ref:ref-greene-5ed-cap97}}. Por isso, deve-se priorizar acaricidas de ação rápida (como isoxazolinas sistêmicas e/ou coleiras e formulações repelentes) orientando o tutor de que carrapaticidas reduzem drasticamente, mas não bloqueiam 100% das picadas se houver alta carga ambiental.',
    alertaPermetrinaEPrevencaoNaoVetorial:
      '- ==PROIBIÇÃO ABSOLUTA DE PERMETRINA EM GATOS==: produtos spot-on, sprays ou coleiras com permetrina formulados para cães causam ==neurotoxicidade felina grave e frequentemente fatal== (tremores, convulsões e hipertermia), inclusive por contato íntimo com cães recém-tratados na mesma casa. Utilizar apenas ectoparasiticidas aprovados especificamente para felinos {{ref:ref-esccap-gl5-2024}} {{ref:ref-abcd-feline-babesiosis-2020}}.\n' +
      '- ==Bloqueio transfusional e de mordeduras==: todo cão ou gato doador de sangue precisa de ==triagem negativa por PCR== para Babesia spp. e demais hemoparasitas; cães com histórico de B. gibsoni devem ser excluídos de doação, reprodução e manejo com risco de brigas {{ref:ref-dibartola-4ed}} {{ref:ref-capc-babesia}}.',
    vacinacaoQuimioprofilaxiaEZoonose:
      '- ==Vacinação e quimioprofilaxia==: vacinas disponíveis em mercados externos reduzem apenas gravidade clínica de cepas europeias (B. canis), não geram imunidade esterilizante e não protegem contra B. gibsoni, B. vogeli nem espécies felinas. Quimioprofilaxia fica restrita a situações excepcionais (como cães esplenectomizados inevitavelmente expostos), nunca em substituição a carrapaticidas {{ref:ref-esccap-gl5-2024}}.\n' +
      '- ==Orientação zoonótica ao tutor==: espécies distintas como B. microti e B. divergens causam babesiose humana, mas ==os agentes caninos e felinos (B. vogeli, B. gibsoni, B. felis) NÃO são transmitidos diretamente do cão ou gato para as pessoas da casa== — devendo-se apenas manter combate ao carrapato ambiental pelo risco de outras zoonoses vetoriais {{ref:ref-esccap-gl5-2024}} {{ref:ref-capc-babesia}}.',
  },

  relatedConsensusSlugs: [
    'veccs-sepse-definicao-caes-gatos-2026',
    'veccs-choque-septico-prognostico-2026',
    'acvim-ahim-diagnostico-caes-gatos-2019',
    'acvim-ahim-tratamento-canino-2019',
    'curative-risco-trombotico-2022',
    'isfm-transfusao-felina-2021',
  ],
  relatedDiseaseSlugs: [
    'anemia-hemolitica-imunomediada-canina',
    'micoplasmoses-hemotropicas',
    'erliquiose-monocitica-canina',
    'coagulacao-intravascular-disseminada-caes-gatos',
    'sepse-canina',
    'sepse-felina',
    'lesao-renal-aguda-canina',
    'anemia-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'clindamicina',
    'atropina',
    'doxiciclina',
    'prednisolona',
    'maropitant',
    'ondansetrona',
  ],

  references: [
    {
      id: 'ref-esccap-gl5-2024',
      authors: 'ESCCAP',
      title: 'Control of Vector-Borne Diseases in Dogs and Cats — Guideline 05 (5th Edition)',
      journal: 'European Scientific Counsel Companion Animal Parasites',
      year: 2024,
      sourceType: 'Diretriz internacional',
      url: 'https://www.esccap.org/uploads/docs/32ir16g1_0775_ESCCAP_Guideline_GL5_20241203_1p.pdf',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-abcd-feline-babesiosis-2020',
      authors: 'ABCD (European Advisory Board on Cat Diseases)',
      title: 'Guideline for Babesiosis in Cats',
      journal: 'ABCD Cats & Vets',
      year: 2020,
      sourceType: 'Diretriz felina',
      url: 'https://www.abcdcatsvets.org/guideline-for-babesiosis/',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-capc-babesia',
      authors: 'CAPC (Companion Animal Parasite Council)',
      title: 'Babesia spp. Guidelines for Dogs and Cats',
      journal: 'Companion Animal Parasite Council',
      year: 2024,
      sourceType: 'Diretriz clínica',
      url: 'https://capcvet.org/guidelines/babesia',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-troccap-babesia',
      authors: 'TroCCAP (Tropical Council for Companion Animal Parasites)',
      title: 'Canine Guidelines: Babesia spp.',
      journal: 'TroCCAP',
      year: 2024,
      sourceType: 'Diretriz tropical',
      url: 'https://www.troccap.com/canine-guidelines/other-systems/babesia/',
      evidenceLevel: 'Consenso de especialistas',
    },
    {
      id: 'ref-zygner-2023',
      authors: 'Zygner W, Gójska-Zygner O, Norbury LJ',
      title: 'Pathogenesis of Anemia in Canine Babesiosis: Possible Contribution of Pro-Inflammatory Cytokines and Chemokines—A Review',
      journal: 'Pathogens',
      year: 2023,
      volume: '12',
      issue: '2',
      pages: '166',
      doi: '10.3390/pathogens12020166',
      url: 'https://doi.org/10.3390/pathogens12020166',
      sourceType: 'Revisão fisiopatológica',
    },
    {
      id: 'ref-goddard-2026',
      authors: 'Goddard A, et al.',
      title: 'Thromboinflammation in dogs with virulent babesiosis',
      journal: 'Frontiers in Veterinary Science',
      year: 2026,
      doi: '10.3389/fvets.2026.1712262',
      url: 'https://doi.org/10.3389/fvets.2026.1712262',
      sourceType: 'Estudo observacional clínico',
    },
    {
      id: 'ref-lin-2012',
      authors: 'Lin EC, Chueh LL, Lin CN, Hsieh LE, Su BL',
      title: 'The therapeutic efficacy of two antibabesial strategies against Babesia gibsoni',
      journal: 'Veterinary Parasitology',
      year: 2012,
      volume: '186',
      issue: '3-4',
      pages: '159-164',
      doi: '10.1016/j.vetpar.2011.11.073',
      url: 'https://doi.org/10.1016/j.vetpar.2011.11.073',
      sourceType: 'Ensaio clínico prospectivo',
    },
    {
      id: 'ref-kirk-2017',
      authors: 'Kirk SK, Levy JK, Crawford PC',
      title: 'Efficacy of Azithromycin and Compounded Atovaquone for Treatment of Babesia gibsoni in Dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2017,
      volume: '31',
      issue: '4',
      pages: '1108-1112',
      doi: '10.1111/jvim.14777',
      url: 'https://doi.org/10.1111/jvim.14777',
      sourceType: 'Estudo clínico prospectivo',
    },
    {
      id: 'ref-oliveira-2022',
      authors: 'Oliveira RF, et al.',
      title: 'Piroplasmid infection is not associated with clinicopathological and laboratory abnormalities in cats from Midwestern Brazil',
      journal: 'Parasitology Research',
      year: 2022,
      doi: '10.1007/s00436-022-07602-8',
      url: 'https://doi.org/10.1007/s00436-022-07602-8',
      sourceType: 'Estudo transversal brasileiro',
    },
    {
      id: 'ref-baneth-2024',
      authors: 'Baneth G, et al.',
      title: 'Description of Babesia galileei sp. nov. A piroplasmid species causing severe disease in domestic cats',
      journal: 'Parasites & Vectors',
      year: 2024,
      volume: '17',
      pages: '297',
      doi: '10.1186/s13071-024-06371-w',
      url: 'https://doi.org/10.1186/s13071-024-06371-w',
      sourceType: 'Descrição taxonômica e série de casos',
    },
    {
      id: 'ref-punia-2026',
      authors: 'Punia A, et al.',
      title: 'Comparative diagnostic performance of microscopy and PCR assays with preliminary mitochondrial sequence analysis of Babesia species infecting dogs in Jabalpur, central India',
      journal: 'Molecular Biology Reports',
      year: 2026,
      doi: '10.1007/s11033-026-11457-y',
      url: 'https://doi.org/10.1007/s11033-026-11457-y',
      sourceType: 'Estudo comparativo diagnóstico',
    },
    {
      id: 'ref-dantas-torres-2021',
      authors: 'Dantas-Torres F, et al.',
      title: 'Molecular epidemiology and prevalence of babesial infections in dogs in two hyperendemic foci in Brazil',
      journal: 'Parasitology Research',
      year: 2021,
      pmid: '34110503',
      doi: '10.1007/s00436-021-07195-8',
      url: 'https://doi.org/10.1007/s00436-021-07195-8',
      sourceType: 'Estudo epidemiológico brasileiro',
    },
    {
      id: 'ref-abdoli-2024',
      authors: 'Abdoli A, et al.',
      title: 'A global systematic review and meta-analysis on the babesiosis in dogs with special reference to Babesia canis',
      journal: 'Veterinary Medicine and Science',
      year: 2024,
      doi: '10.1002/vms3.1427',
      url: 'https://doi.org/10.1002/vms3.1427',
      sourceType: 'Revisão sistemática e meta-análise',
    },
    {
      id: 'ref-duarte-2026',
      authors: 'Duarte et al.',
      title: 'Multilocus molecular characterization of Babesia gibsoni in a naturally infected dog in Brazil',
      journal: 'Veterinary Parasitology: Regional Studies and Reports',
      year: 2026,
      doi: '10.1016/j.vprsr.2026.101499',
      url: 'https://doi.org/10.1016/j.vprsr.2026.101499',
      sourceType: 'Relato molecular brasileiro',
    },
    {
      id: 'ref-dantas-torres-2008',
      authors: 'Dantas-Torres F',
      title: 'Canine vector-borne diseases in Brazil',
      journal: 'Parasites & Vectors',
      year: 2008,
      volume: '1',
      pages: '25',
      doi: '10.1186/1756-3305-1-25',
      url: 'https://doi.org/10.1186/1756-3305-1-25',
      sourceType: 'Revisão brasileira e acervo visual (Fig. 1)',
    },
    {
      id: 'ref-passos-2005',
      authors: 'Passos LMF, Geiger SM, Ribeiro MFB, Pfister K, Zahler-Rinder M',
      title: 'First molecular detection of Babesia vogeli in dogs from Brazil',
      journal: 'Veterinary Parasitology',
      year: 2005,
      volume: '127',
      pages: '81-85',
      sourceType: 'Estudo molecular seminal brasileiro',
    },
    {
      id: 'ref-he-2017',
      authors: 'He L, et al.',
      title: 'First molecular detection of Babesia gibsoni in dogs from Wuhan, China',
      journal: 'Frontiers in Microbiology',
      year: 2017,
      volume: '8',
      pages: '1577',
      doi: '10.3389/fmicb.2017.01577',
      url: 'https://doi.org/10.3389/fmicb.2017.01577',
      sourceType: 'Estudo molecular e acervo visual (Fig. 3)',
    },
    {
      id: 'ref-greene-5ed-cap97',
      authors: 'Birkenheuer AJ (In: Sykes JE, Greene CE)',
      title: "Greene's Infectious Diseases of the Dog and Cat (5th Edition)",
      journal: 'Elsevier',
      year: 2023,
      sourceType: 'Livro-texto de referência',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition)',
      journal: 'Elsevier',
      year: 2020,
      sourceType: 'Livro-texto de referência',
    },
    {
      id: 'ref-plumbs-10ed',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Formulário farmacológico',
    },
    {
      id: 'ref-bsava-10ed',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition)',
      journal: 'BSAVA',
      year: 2020,
      sourceType: 'Formulário farmacológico',
    },
    {
      id: 'ref-feline-ecc-2ed',
      authors: 'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.)',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Livro-texto de referência',
    },
    {
      id: 'ref-dibartola-4ed',
      authors: 'DiBartola SP (ed.)',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Edition)',
      journal: 'Saunders Elsevier',
      year: 2012,
      sourceType: 'Livro-texto de referência',
    },
    {
      id: 'ref-ettinger-9ed',
      authors: 'Ettinger SJ, Feldman EC, Côté E (eds.)',
      title: "Ettinger's Textbook of Veterinary Internal Medicine (9th Edition)",
      journal: 'Elsevier',
      year: 2024,
      sourceType: 'Livro-texto de referência',
    },
  ],
};
