import type { DiseaseRecord } from '../../types/disease';
import type { EditorialClinicalFigure } from '../../types/common';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Megacólon em cães e gatos — síntese editorial e clínica Vetius.
 * Padrão editorial estruturado rigorosamente alinhado à Coagulação Intravascular Disseminada (CID):
 * figuras clínicas open access integradas (Abdelbaset-Ismail et al., 2022, CC BY 4.0),
 * achados clínicos agrupados por sistemas (EditorialSystemGroup[]),
 * algoritmo diagnóstico estruturado em etapas (EditorialDiagnosticStep[]) com padrão ouro identificado,
 * terapêutica com meta primária, desimpactação aguda, farmacologia de manutenção,
 * o paradoxo da fibra alimentar e critérios cirúrgicos de colectomia subtotal com preservação ileocecocólica.
 * Sem marcadores literais de asterisco duplo (**).
 */

const figura1RadiografiaNormal: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/megacolon/fvets-09-1033090-g0001.webp',
  alt: 'Radiografia abdominal lateral de gato controle normal para mensuração de MCD/L5',
  caption:
    'Figura 1 — Radiografia abdominal lateral de gato controle hígido demonstrando a metodologia de mensuração do diâmetro máximo do cólon (MCD) e do comprimento do corpo vertebral de L5 para cálculo da razão MCD/L5 (<1,28 indica cólon normal). Fonte: Abdelbaset-Ismail et al. (2022), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

const figura2RadiografiaMegacolon: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/megacolon/fvets-09-1033090-g0002.webp',
  alt: 'Radiografia abdominal lateral de gato com megacólon idiopático severo',
  caption:
    'Figura 2 — Radiografia abdominal lateral de gato com megacólon idiopático apresentando impactação fecal acentuada e dilatação colônica maciça (L5 com 21,7 mm e cólon atingindo 40,5 mm, com razão MCD/L5 de 1,87, bem superior ao corte de 1,48). Fonte: Abdelbaset-Ismail et al. (2022), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

const figura3HistopatologiaRemodelamento: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/megacolon/fvets-09-1033090-g0008.webp',
  alt: 'Histopatologia do cólon em gatos com megacólon idiopático crônico',
  caption:
    'Figura 3 — Cortes histológicos corados por hematoxilina e eosina (HE) do cólon de gatos com megacólon idiopático e evolução clínica superior ou igual a seis meses. Observam-se espessamento marcante da camada muscular com proliferação conjuntiva, miócitos degenerados e necróticos e infiltrado inflamatório submucoso difuso, caracterizando o remodelamento tecidual irreversível. Fonte: Abdelbaset-Ismail et al. (2022), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

const figura4QuantificacaoHistologica: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/megacolon/fvets-09-1033090-g0009.webp',
  alt: 'Quantificação histológica e morfométrica do cólon normal versus megacólon',
  caption:
    'Figura 4 — Análise quantitativa demonstrando o espessamento das camadas musculares circular e longitudinal, a porcentagem de miócitos necróticos e a densidade de células ganglionares do plexo mioentérico no cólon normal comparado ao megacólon felino com menos de seis meses e com seis meses ou mais de sinais clínicos. Fonte: Abdelbaset-Ismail et al. (2022), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

export const megacolonRecord: DiseaseRecord = {
  id: 'disease-megacolon-caes-gatos',
  slug: 'megacolon-caes-gatos',
  title: 'Megacólon',
  subtitle: 'Disfunção neuromuscular motora, obstipação crônica e dilatação colônica irreversível em cães e gatos',
  synonyms: [
    'Megacólon idiopático felino',
    'Obstipação crônica felina',
    'Inércia colônica',
    'Megacólon canino',
    'Dilatação colônica irreversível',
    'Impactação colônica crônica',
    'Feline idiopathic megacolon',
    'Megacolon',
  ],
  species: ['cat', 'dog'],
  category: 'gastroenterologia',
  categories: ['emergencia-intensivismo', 'clinica-medica', 'cirurgia'],
  tags: [
    'Megacólon',
    'Constipação',
    'Obstipação',
    'MCD/L5',
    'Cisaprida',
    'PEG 3350',
    'Lactulose',
    'Colectomia subtotal',
    'Gastroenterologia',
    'Emergência',
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['megacolon-caes-gatos'],
  quickSummary:
    'O megacólon é o estágio final de dilatação persistente e hipomotilidade severa do intestino grosso decorrente de perda funcional irreversível da contratilidade do músculo liso colônico. A distinção conceitual e clínica entre constipação (dificuldade de evacuação potencialmente reversível), obstipação (impactação grave refratária exigindo intervenção médica) e megacólon verdadeiro (dilatação estrutural crônica com perda motora) é mandatória. Em felinos, 60% a 70% dos casos são idiopáticos, com falha contrátil primária do músculo liso demonstrada em bioensaios (Washabau & Stalis, 1996) e remodelamento temporal com fibrose e necrose miocítica aos seis meses de evolução (Abdelbaset-Ismail et al., 2022). Em contraste, o megacólon idiopático é raro no cão; a dilatação colônica canina reflete quase invariavelmente impactação mecânica secundária a estenoses, hiperplasia prostática, hérnias perineais ou dor, exibindo alta taxa de reversão com tratamento clínico conservador (Tzimtzimis et al., 2019). O diagnóstico baseia-se na palpação abdominal minuciosa e na radiografia simples: em gatos, a razão entre o maior diâmetro colônico e o comprimento da quinta vértebra lombar (MCD/L5) fornece valor diagnóstico validado (<1,28 normal; 1,28–1,48 intermediário; >1,48 megacólon provável, com sensibilidade de 77% e especificidade de 85%; Trevail et al., 2011). Na emergência felina, a palpação imediata da bexiga é prioritária para afastar obstrução uretral em machos em tenesmo. O tratamento divide-se em desimpactação com enemas mornos seguros (sendo estritamente proibidos enemas de fosfato em gatos por risco fatal de hiperfosfatemia e hipocalcemia) associados a hidratação parenteral prévia, laxantes osmóticos (PEG 3350 ou lactulose) e pró-cinéticos específicos como cisaprida (após liberação mecânica do trânsito). A controvérsia da fibra exige discernimento: dietas ricas em fibras beneficiam apenas cólons com motilidade residual, ao passo que pacientes em inércia colônica e atonia demandam dietas altamente digestíveis de baixo resíduo para evitar agravamento da sobrecarga mecânica. Casos refratários recorrentes têm indicação de colectomia subtotal com preservação da junção ileocecocólica (Grossman et al., 2021).',
  quickDecisionStrip: [
    'Diferenciação conceitual: constipação é reversível, obstipação exige intervenção e megacólon envolve dilatação com perda motora irreversível.',
    'Gato vs Cão: no gato o megacólon idiopático é comum e primário; no cão a dilatação é quase sempre secundária e tratável sem cirurgia.',
    'Bexiga antes de cólon: em felinos machos com esforço na caixa, palpar a vesícula urinária imediatamente para afastar obstrução uretral.',
    'MCD/L5 radiográfico: em gatos, razão >1,48 apoia forte suspeita de megacólon (Se 77%, Sp 85%), mas não define isoladamente colectomia.',
    'Proibição absoluta de fosfato: enemas contendo fosfato de sódio em gatos causam hiperfosfatemia fulminante, hipocalcemia e óbito.',
    'Primeiro hidrate, depois empurre: enemas e laxantes sem reposição hidroeletrolítica agravam desidratação e lesão renal aguda.',
    'PEG 3350 titulado: laxante osmótico seguro para manutenção (~1,5 a 3 g/dia em pó VO) e desimpactação hospitalar por sonda (6–10 mL/kg/h).',
    'Cisaprida com critério: agonista 5-HT4 colônico de escolha (2,5–5 mg/gato BID), mas contraindicado na vigência de obstrução fecal sólida mecânica.',
    'Mito da fibra alimentar: fibra insolúvel piora o paciente em atonia colônica; megacólon hipomotil avançado exige dieta de baixo resíduo.',
    'Colectomia subtotal planejada: indicada para obstipação refratária recorrente; preservação da junção ileocecocólica previne fezes líquidas crônicas.',
  ],
  quickSummaryRich: {
    lead:
      'O megacólon não é uma simples constipação acumulada, mas o resultado final de disfunção neuromuscular ou esgotamento mecânico crônico da parede do cólon, levando à perda permanente da capacidade contrátil e retenção fecal obstinada. Enquanto no felino predomina a forma idiopática com fraqueza muscular intrínseca e remodelamento temporal irreversível, no cão a dilatação quase sempre responde a causas obstrutivas secundárias passíveis de correção. O manejo moderno exige abandono de crenças empíricas: a hidratação venosa deve preceder qualquer manobra mecânica, enemas de fosfato são rigorosamente proibidos em gatos, o uso de fibras deve ser adaptado à motilidade residual e a colectomia subtotal é o recurso cirúrgico salvador para pacientes com falência motora documentada.',
    leadHighlights: [
      'disfunção neuromuscular ou esgotamento mecânico',
      'perda permanente da capacidade contrátil',
      'no felino predomina a forma idiopática',
      'no cão a dilatação quase sempre responde a causas obstrutivas',
      'enemas de fosfato são rigorosamente proibidos em gatos',
      'colectomia subtotal é o recurso cirúrgico salvador',
    ],
    pillars: [
      {
        title: 'Espécies e Comportamento Biológico',
        body:
          'No felino, o megacólon idiopático decorre de falha primária do aparato contrátil da musculatura lisa colônica. No cão, o megacólon primário é excepcional; dilatações acentuadas refletem impactações secundárias a estenoses pélvicas, afecções prostáticas ou hérnias perineais, apresentando excelente resposta à desobstrução clínica.',
        highlights: ['felino', 'megacólon idiopático', 'aparato contrátil', 'cão', 'impactações secundárias', 'excelente resposta'],
      },
      {
        title: 'Métrica Radiográfica MCD/L5',
        body:
          'A mensuração objetiva pelo índice de Trevail et al. (2011) compara o diâmetro máximo do cólon com o comprimento de L5 na projeção lateral. Razões abaixo de 1,28 indicam normalidade, entre 1,28 e 1,48 configuram constipação intermediária e acima de 1,48 sustentam megacólon (Se 77%, Sp 85%). Não se aplica como índice decisor cirúrgico isolado.',
        highlights: ['MCD/L5', 'índice de Trevail', '<1,28', '1,28 e 1,48', '>1,48', 'Não se aplica como índice decisor cirúrgico isolado'],
      },
      {
        title: 'Eixo Farmacológico Racional',
        body:
          'O protocolo médico apoia-se em laxantes osmóticos de retenção de água luminal (PEG 3350 e lactulose) associados a pró-cinéticos específicos como a cisaprida (agonista 5-HT4). A cisaprida jamais deve ser administrada em pacientes completamente impactados antes da remoção mecânica do bolo fecal.',
        highlights: ['PEG 3350', 'lactulose', 'cisaprida', 'jamais deve ser administrada em pacientes completamente impactados'],
      },
      {
        title: 'Paradoxo da Fibra na Atonia',
        body:
          'Fibras alimentares aumentam a massa e exigem propulsão mecânica vigorosa. Em cólons atônicos com inércia motora, o acréscimo de fibras insolúveis gera fecalitos volumosos e insolúveis, agravando a obstipação. Nesses pacientes, dietas de alta digestibilidade e baixo resíduo são mandatórias.',
        highlights: ['Fibras alimentares', 'cólons atônicos', 'fibras insolúveis', 'agravando a obstipação', 'baixo resíduo'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo sequencial de avaliação e conduta na retenção fecal',
      steps: [
        {
          label: '1. Triagem e exclusão mandatória de emergência obstrutiva urinária',
          timing: 'Primeiros minutos do atendimento',
          detail:
            'Diferenciar tenesmo fecal de estrangúria urinária. Em gatos machos, realizar palpação imediata da vesícula urinária para descartar obstrução uretral antes de qualquer manobra retal. Avaliar desidratação, dor abdominal, pulso femoral e estabilidade hemodinâmica.',
        },
        {
          label: '2. Avaliação clínica completa, toque retal e neurológica',
          timing: 'Consulta inicial / Estabilização',
          detail:
            'Examinar conformação pélvica, membros pélvicos e coluna lombossacra. Realizar palpação abdominal cuidadosa do cólon distendido. Realizar toque retal sob sedação se necessário, buscando estenoses, corpos estranhos, massas, hérnias perineais e prostatomegalia (no cão).',
        },
        {
          label: '3. Exame radiográfico abdominal e mensuração MCD/L5',
          timing: 'Exame de imagem de escolha',
          detail:
            'Radiografias abdominais laterais e ventrodorsais. Avaliar densidade do conteúdo fecal, estenoses de canal pélvico e espondilose lombossacra. Em felinos, medir o diâmetro colônico máximo e o comprimento de L5: calcular razão MCD/L5 (corte de 1,48).',
        },
        {
          label: '4. Exames laboratoriais de perfil etiológico e metabólico',
          timing: 'Rotina laboratorial inicial',
          detail:
            'Investigar causas predisponentes: creatinina, ureia e SDMA (DRC com desidratação secundária), potássio sérico (hipocalemia induz atonia muscular), cálcio sérico ionizado e total (hipercalcemia gera hipomotilidade), hemograma e urinálise.',
        },
        {
          label: '5. Desimpactação e desobstrução hospitalar',
          timing: 'Fase aguda descompressiva',
          detail:
            'Iniciar fluidoterapia venosa antes dos enemas. Realizar enemas mornos com água ou salina mais lubrificante hidrossolúvel. Se houver falha, administrar PEG com eletrólitos por sonda nasogástrica/nasoesofágica (6 a 10 mL/kg/h) ou realizar esvaziamento manual sob anestesia geral.',
        },
        {
          label: '6. Terapia médica de manutenção ou indicação de colectomia',
          timing: 'Manejo ambulatorial crônico',
          detail:
            'Manutenção com PEG 3350 ou lactulose, estímulo à hidratação, cisaprida e dieta ajustada à motilidade. Pacientes com obstipação refratária recorrente, perda de resposta médica e cronicidade superior a seis meses são candidatos à colectomia subtotal.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico escalonado da constipação ao megacólon',
      steps: [
        {
          label: '1. Ressuscitação hídrica e estabilização parenteral',
          timing: 'Emergência / Imediato',
          detail:
            'Corrigir déficit volêmico com cristaloides isotônicos (Ringer com lactato). Corrigir hipocalemia com cloreto de potássio na taxa máxima de 0,5 mEq/kg/h. Jamais iniciar laxantes ou procedimentos descompressivos em animais hipovolêmicos.',
        },
        {
          label: '2. Enemas mornos e lubrificação colônica',
          timing: 'Hospitalar / Procedimento inicial',
          detail:
            'Administrar água morna ou solução salina 0,9% (10 a 20 mL/kg) acrescida de lubrificante hidrossolúvel ou vaselina líquida estéril (5 a 10 mL), infundidos com sonda uretral maleável bem lubrificada. Contraindicação formal a enemas de fosfato em gatos.',
        },
        {
          label: '3. Lavagem intestinal retrógrada ou por sonda enteral (PEG-ELS)',
          timing: 'Hospitalar monitorado',
          detail:
            'Para fecalomas volumosos não mobilizados por enemas simples: solução de PEG com eletrólitos infundida por sonda nasoesofágica na taxa de 6 a 10 mL/kg/h até a eliminação de fezes amolecidas ou início de efluente translúcido (geralmente 8 a 18 horas).',
        },
        {
          label: '4. Desimpactação retal manual sob anestesia geral',
          timing: 'Casos refratários de fecaloma pétreo',
          detail:
            'Intubação orotraqueal obrigatória para prevenir aspiração por vômito reflexo. Infusão retrógrada abundante de fluidos lubrificantes e fragmentação digital delicada transretal associada a palpação abdominal externa bimanual.',
        },
        {
          label: '5. Manutenção clínica crônica e prevenção de recidivas',
          timing: 'Ambulatorial de longo prazo',
          detail:
            'PEG 3350 em pó (1/8 a 1/4 colher de chá ou aproximadamente 1,5 a 3 g por gato VO a cada 12 a 24 horas misturado a alimento úmido) ou lactulose (0,5 mL/kg VO BID a TID). Adicionar cisaprida (2,5 a 5 mg/gato VO BID) após o esvaziamento completo.',
        },
        {
          label: '6. Colectomia subtotal com anastomose colorretal',
          timing: 'Terapia cirúrgica definitiva',
          detail:
            'Indicada após falha comprovada do tratamento médico otimizado e episódios repetidos de desobstrução sob anestesia. Ressecção da quase totalidade do cólon com anastomose ileocólica ou jejunocólica, preservando a junção ileocecocólica sempre que possível.',
        },
      ],
    },
  },
  etiology: {
    definicaoEConceito:
      'O espectro da retenção fecal em cães e gatos exige distinção terminológica estrita entre cinco entidades frequentemente confundidas na rotina clínica:\n\n- Constipação: defecação infrequente, difícil ou incompleta, habitualmente com fezes ressecadas e endurecidas, de caráter funcional e potencialmente reversível mediante correção de causas precipitantes (desidratação, dor, ambiente).\n- Obstipação: forma grave, prolongada e refratária de constipação na qual a impactação fecal impede a progressão do bolo fecal, tornando o paciente incapaz de defecar sem intervenção médica ou farmacológica invasiva.\n- Megacólon: dilatação colônica estrutural acentuada e persistente, associada a hipomotilidade severa e perda da capacidade contrátil intrínseca do músculo liso colônico, constituindo frequentemente a via final irreversível da disfunção colônica crônica.\n- Inércia colônica: insuficiência funcional dos mecanismos neuromusculares de propulsão peristáltica do cólon, que pode anteceder a dilatação marcante ou coexistir com ela.\n- Impactação fecal: acúmulo mecânico intraluminal de fezes ressecadas em volume ou dureza impeditivos ao trânsito fisiológico, podendo ocorrer em cólons normais (após ingestão de ossos ou corpos estranhos) sem implicar diagnóstico de megacólon.',
    diferencaEspeciesMegacolonTabela: {
      kind: 'clinicalTable',
      caption: 'Tabela comparativa fundamental: Megacólon e impactação colônica no Gato versus Cão',
      headers: [
        'Parâmetro Clínico-Patológico',
        'Espécie Felina (Gato)',
        'Espécie Canina (Cão)',
      ],
      rows: [
        [
          'Megacólon idiopático primário',
          'Frequente e relevante (representa 60% a 70% dos casos de megacólon felino)',
          'Extremamente raro; diagnóstico primário excepcional',
        ],
        [
          'Fisiopatogenia muscular primária',
          'Disfunção contrátil intrínseca demonstrada do músculo liso (Washabau & Stalis, 1996)',
          'Não demonstrada; habitualmente secundário a sobrecarga obstrutiva crônica',
        ],
        [
          'Reversibilidade após dilatação maciça',
          'Frequente evolução para dilatação e atonia irreversíveis aos 6 meses',
          'Alta capacidade de recuperação funcional; dilatação não prediz desfecho desfavorável (Tzimtzimis et al., 2019)',
        ],
        [
          'Estenose do canal pélvico pós-fratura',
          'Causa secundária mecânica clássica decorrente de atropelamentos',
          'Possível, porém proporcionalmente menos frequente',
        ],
        [
          'Doenças perineais e prostáticas',
          'Baixa relevância na retenção fecal',
          'Causas obstrutivas e álgicas primordiais (hiperplasia prostática, prostatite, hérnia perineal)',
        ],
        [
          'Critério radiográfico MCD/L5',
          'Validado por Trevail et al. (2011): corte >1,48 com Se 77% e Sp 85%',
          'Não validado; corte felino não deve ser extrapolado para cães',
        ],
        [
          'Indicação de colectomia subtotal',
          'Tratamento cirúrgico de escolha na obstipação idiopática refratária',
          'Excepcional (Németh et al., 2008); abordagem médica e correção etiológica resolvem a grande maioria',
        ],
      ],
    },
    neuroanatomiaDefecacao:
      'O controle neurológico da motilidade colônica e do reflexo de defecação depende de vias periféricas autônomas e somáticas finamente coordenadas (de Lahunta, 5ª ed.):\n\n- Via parassimpática: origina-se dos segmentos sacrais da medula espinal (S1–S3) e trafega pelos nervos pélvicos, promovendo estímulo contrátil e facilitação da motilidade peristáltica propulsiva no cólon descendente e reto.\n- Via simpática: origina-se dos segmentos lombares (L1–L4/L5) e emerge via nervos esplâncnicos lombares até o gânglio mesentérico caudal, donde partem os nervos hipogástricos, promovendo inibição da motilidade colônica e aumento do tônus do esfíncter anal interno.\n- Via somática: deriva dos segmentos sacrais e origina o nervo pudendo, responsável pela inervação motora voluntária do esfíncter anal externo e sensitiva da região perianal.\n\nEsse mapeamento anatômico corrige o equívoco comum de associar lesões lombares puras à lesão direta do nervo pélvico: o parassimpático e o nervo pudendo têm origem sacral, e não lombar. Contudo, afecções lombossacras (espondilose, estenose lumbossacra degenerativa, hérnia de disco L7-S1) podem afetar as raízes sacrais ao nível da cauda equina, além de gerarem dor intensa que inibe o gato de arquear a coluna na postura de defecação.',
    etiologiaMecanismosTabela: {
      kind: 'clinicalTable',
      caption: 'Classificação etiológica do megacólon e constipação secundária por mecanismo fisiopatológico',
      headers: [
        'Mecanismo Etiológico',
        'Entidades Clínicas e Exemplos',
        'Mecanismo de Bloqueio ou Hipomotilidade',
      ],
      rows: [
        [
          'Idiopático (Neuromuscular Primário)',
          'Megacólon idiopático felino (60% a 70% dos casos em gatos)',
          'Defeito intrínseco de contratilidade dos miócitos lisos colônicos e desnervação entérica secundária',
        ],
        [
          'Desidratação e Perda Volêmica',
          'Doença Renal Crônica (DRC), diabetes mellitus, poliúria/polidipsia, vômitos crônicos, diuréticos',
          'Menor volemia e ativação de reabsorção máxima de água no cólon distal, gerando fezes duras e pétreas',
        ],
        [
          'Distúrbios Eletrolíticos e Endócrinos',
          'Hipocalemia, hipercalcemia, hipotireoidismo grave',
          'Alteração do potencial de repouso de membrana dos miócitos entéricos e bloqueio da propagação neuromuscular',
        ],
        [
          'Obstrução Mecânica Intraluminal/Mural',
          'Fratura pélvica mal consolidada, neoplasias colônicas/retais, estenoses cicatriciais, atresia anal',
          'Estenose física do canal fecal impedindo a progressão do fecaloma e gerando dilatação a montante',
        ],
        [
          'Obstrução Mecânica Extraluminal',
          'Megacolon secundário a prostatomegalia, abscessos/cistos prostáticos, hérnia perineal, linfonodomegalia sublombar',
          'Compressão externa do cólon descendente e reto no canal pélvico (muito frequente em cães)',
        ],
        [
          'Afecções Dolorosas e Ortopédicas',
          'Osteoartrite coxofemoral, espondilose lombossacra, saculite anal, fístula perianal, trauma em cauda',
          'Evitação comportamental da postura fisiológica de defecação devido à dor à flexão do quadril e pelve',
        ],
        [
          'Causas Neurológicas',
          'Síndrome da cauda equina, fraturas sacrais, disautonomia felina, lesões espinhais lombossacras',
          'Interrupção das vias eferentes parassimpáticas sacrais (nervo pélvico) e paralisia motora do cólon e reto',
        ],
        [
          'Fatores Farmacológicos Iatrogênicos',
          'Opioides, anticolinérgicos, bloqueadores de canais de cálcio, suplementos de ferro, sucralfato, bário',
          'Inibição direta da neurotransmissão colinérgica entérica e aumento da reabsorção hídrica passiva',
        ],
      ],
    },
    fisiopatogeniaIdiopaticaWashabau:
      'A base mecanística do megacólon idiopático felino foi desvendada no estudo clássico de Washabau & Stalis (1996), que isolou tiras musculares colônicas de gatos normais e acometidos. Sob estimulação por acetilcolina, substância P, colecistocinina (CCK), cloreto de potássio (KCl) e estímulo de campo elétrico, o músculo liso de gatos com megacólon desenvolveu tensão isométrica significativamente inferior em todos os protocolos em comparação aos controles saudáveis. A falha de resposta ao KCl (que promove despolarização direta da membrana sarcolemal independente de receptores) demonstrou inequivocamente que a disfunção reside no próprio aparato miofibrilar e nos mecanismos intracelulares de acoplamento excitação-contração da musculatura lisa colônica. Com a persistência da estase fecal e distensão mural contínua, instala-se um ciclo de remodelamento: Abdelbaset-Ismail et al. (2022) comprovaram que gatos com sinais clínicos persistentes por tempo superior ou igual a seis meses apresentam hipertrofia muscular compensatória progressiva, proliferação de tecido conjuntivo colágeno, necrose de miócitos e perda acentuada de neurônios ganglionares no plexo mioentérico.',
    remodelamentoTemporalHistologico:
      'A evolução temporal da retenção fecal divide a doença em duas fases com substratos morfológicos distintos (Abdelbaset-Ismail et al., 2022):\n\n- Fase inicial (< 6 meses de sinais clínicos): caracterizada por hipertrofia compensatória da musculatura lisa circular e longitudinal na tentativa de vencer a resistência do bolo fecal endurecido. O tecido conjuntivo intersticial permanece discreto e o número de neurônios ganglionares mioentéricos de Auerbach encontra-se preservado, mantendo potencial de reversibilidade com manejo clínico intensivo.\n- Fase avançada e irreversível (≥ 6 meses de evolução): o estiramento mecânico prolongado e a isquemia mural induzem necrose hialina de miócitos, deposição desorganizada de colágeno denso (fibrose intersticial) e depleção neuronal severa no plexo mioentérico. O cólon perde permanentemente sua capacidade elástica e força contrátil, consolidando o quadro de megacólon verdadeiro e inércia colônica refratária que exige intervenção cirúrgica.',
  },
  epidemiology: {
    caes:
      'Na espécie canina, o megacólon verdadeiro com atonia motora primária é uma condição extremamente incomum. Em ampla série retrospectiva de 58 cães com impactação colônica severa conduzida por Tzimtzimis et al. (2019), a idade mediana foi de 7 anos e a maioria dos pacientes (78%) era composta por machos inteiros com peso corporal médio de 22 kg. De forma notável, o grau de dilatação colônica observado nas radiografias simples não teve correlação estatística com o desfecho prognóstico, e 88% dos animais com acompanhamento documentado alcançaram recuperação clínica completa sob terapia médica conservadora após desimpactação. As causas predominantes em cães envolvem ingestão maciça de ossos, corpos estranhos, afecções dolorosas perineais e pélvicas, prostatomegalia obstrutiva e hérnias perineais com desvio retal. Assim, a constatação de cólon dilatado ao raio-x no cão jamais deve suscitar diagnóstico precipitado de megacólon irreversível sem ampla investigação etiológica.',
    gatos:
      'Nos gatos, o megacólon é a enfermidade obstrutiva crônica mais importante do intestino grosso. Acomete primariamente animais adultos a idosos (idade mediana de 6 a 9 anos, com faixa ampla de 1 a 16 anos), com discreto predomínio de machos em relação a fêmeas (cerca de 60% a 70% nas casuísticas de Washabau e Benjamin & Drobatz, 2020). As raças doméstico de pelo curto (DSH) e doméstico de pelo longo (DLH) constituem a ampla maioria dos casos relatados. Não existe relação causal com retroviroses felinas (FeLV/FIV), sendo a afecção primária neuromuscular ou secundária a comorbidades sistêmicas e ortopédicas crônicas que levam à desidratação e retenção continuada.',
    comorbidadesDRCEColuna:
      'A associação entre Doença Renal Crônica (DRC) e constipação em felinos é clinicamente sólida e sustentada por estudos epidemiológicos recentes. No estudo de Benjamin & Drobatz (2020) com 189 gatos constipados em pronto-socorro, a presença de DRC conferiu um Odds Ratio (OR) de 3,8 para o desenvolvimento de constipação grave, superado apenas pelo histórico prévio de retenção fecal (OR 20,4). O mecanismo envolve poliúria obrigatória com balanço hídrico negativo, desidratação subclínica crônica, espoliação de potássio urinário (gerando hipocalemia com atonia muscular) e retenção de toxinas urêmicas (como o indoxil-sulfato; Summers et al., 2019). No estudo observacional de Jones et al. (2022), 42% dos gatos com DRC apresentavam frequência de defecação inferior a 1 evacuação diária contra apenas 15% nos felinos hígidos. Recentemente, George et al. (2025), utilizando monitoramento contínuo de caixas de areia inteligentes (Petivity), demonstraram que gatos com DRC apresentaram média de 10 dias com ausência de evacuação ao longo de um mês versus apenas 2 dias nos controles saudáveis (reforçando que se trata de 10 dias acumulados em 30, e não 10 dias consecutivos de obstipação).\n\nParalelamente, a relação entre alterações vertebrais lombossacras e distúrbios de evacuação foi elegantemente quantificada por Thanaboonnipat et al. (2021) em estudo retrospectivo com 1.365 felinos. Os autores identificaram que alterações radiográficas da coluna lombossacra não decorrentes de trauma estavam presentes em 29,74% dos gatos avaliados, associando-se a um risco 1,73 vez maior de afecções do intestino grosso (OR 1,731). Quando analisadas especificamente afecções lombossacras adquiridas (como espondilose deformante exuberante, degeneração do disco intervertebral e artrose facetária), o risco de constipação elevou-se expressivamente para um OR de 4,107. Embora o estudo radiográfico demonstre forte correlação estatística, ressalta-se que correlação radiográfica não é sinônimo de compressão neurológica das raízes sacrais: a dor musculoesquelética ao adotar e manter a postura arqueada de defecação é o principal motor funcional da retenção voluntária nesses felinos idosos.',
    desmistificacaoHiperparaNutricional:
      'O hiperparatireoidismo secundário nutricional (osteodistrofia fibrosa por dietas desequilibradas puramente cárneas ricas em fósforo e deficitárias em cálcio) era historicamente apontado em livros clássicos como causa importante de megacólon felino. Na medicina felina contemporânea, com a universalização de dietas comerciais completas e balanceadas, essa alteração é rara. Quando ocorre em filhotes negligenciados, a deficiência de cálcio gera osteopenia com colapso patológico e fraturas em galho verde do anel pélvico. A má consolidação pélvica estreita mecanicamente o canal de passagem fecal, gerando constipação obstrutiva e megacólon secundário meses ou anos mais tarde. Não se trata, portanto, de causa primária de megacólon em gatos adultos que consomem dietas comerciais regulares.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Fator desencadeante inicial: Hipovolemia, desidratação subclínica por DRC, dor ortopédica ao agachar na caixa sanitária, distúrbio eletrolítico (hipocalemia) ou obstrução mecânica luminal parcial.',
      'Redução do trânsito e permanência prolongada: O conteúdo fecal move-se lentamente pelo cólon descendente, ampliando o tempo de contato da mucosa com a massa fecal e maximizando a reabsorção transepitelial de água e eletrólitos.',
      'Ressecamento e formação do fecaloma: As fezes tornam-se progressivamente secas, pétreas, volumosas e resistentes à propulsão peristáltica, demandando maior esforço mecânico da musculatura lisa.',
      'Distensão e sobrecarga miocítica: A presença do fecalito endurecido distende a luz cólica além do limite fisiológico de estiramento, atenuando a sobreposição de miofilamentos de actina e miosina e reduzindo o estresse isométrico contrátil.',
      'Estabelecimento do ciclo vicioso: Menor força contrátil gera maior retenção fecal, que acarreta mais desidratação do bolo e maior dilatação colônica (ciclo de retroalimentação positiva).',
      'Remodelamento histológico estrutural: Com a cronicidade (tipicamente superior a seis meses; Abdelbaset-Ismail et al., 2022), o cólon sofre hipertrofia muscular compensatória, deposição de colágeno intersticial, degeneração com necrose de miócitos e perda de neurônios ganglionares mioentéricos, culminando em inércia colônica irreversível.',
    ],
    transmissao:
      'O megacólon é uma síndrome adquirida decorrente de falha neuromuscular primária ou complicações mecânicas secundárias, de caráter estritamente não transmissível e não contagioso.',
  },
  pathophysiology: {
    mecanismosCelularesMural:
      'A fisiopatologia do megacólon integra eventos mecânicos luminais, alterações de transporte hidroeletrolítico epitelial e disfunções celulares intrínsecas da musculatura lisa. A absorção de sódio e água pelo epitélio colônico depende da atividade da Na+/K+-ATPase basolateral e de canais epiteliais de sódio (ENaC) apicais, regulados por aldosterona e influenciados pelo estado de hidratação sistêmica. Em estados de hipovolemia ou desidratação crônica associada à DRC, a sinalização renina-angiotensina-aldosterona estimula a máxima retenção luminal de água e eletrólitos pelo cólon descendente, transformando fezes que deveriam ter consistência pastosa em cilindros fecalíticos de rigidez pétrea. O fecaloma estático exerce pressão hidrostática direta contra a mucosa e submucosa, comprimindo os capilares intramurais e gerando isquemia tecidual focal com erosão mucosa e translocação bacteriana subclínica. Paralelamente, os miócitos da camada circular e longitudinal operam cronicamente no limite superior da relação comprimento-tensão de Starling intestinal: o estiramento além da faixa ótima desorganiza os filamentos intermediários de desmina e actina citoplasmática, induzindo autofagia e necrose hialina.',
    figuraRadiografiaNormal: figura1RadiografiaNormal,
    figuraRadiografiaMegacolon: figura2RadiografiaMegacolon,
    figuraHistopatologiaRemodelamento: figura3HistopatologiaRemodelamento,
    figuraQuantificacaoHistologica: figura4QuantificacaoHistologica,
    consequenciasSistemicasEIsquemia:
      'A retenção fecal crônica não permanece restrita ao trato digestivo distal. A compressão mecânica de grandes fecalomas na cavidade pélvica e abdominal pode provocar compressão parcial da uretra intrapélvica e ureteres distais, além de compressão da veia cava caudal com redução do retorno venoso e edema em membros posteriores. Em pacientes graves, a estase prolongada de matéria orgânica fecal propicia proliferação desproporcional de bactérias anaeróbias estritas (como Clostridium spp. e Bacteroides spp.), com produção excessiva de amônia, indol, escatol e sulfeto de hidrogênio. Esses metabólitos quebram a barreira de muco colônica e atravessam o epitélio erodido, sobrecarregando o sistema de detoxificação hepático e agravando a azotemia em felinos nefropatas. Casos terminais não desobstruídos evoluem para endotoxemia, sepse por translocação de bacilos entéricos Gram-negativos e perfuração colônica diastática por necrose por pressão.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Tenesmo retal não produtivo, esforço fecal doloroso (disquesia) e postura curvada persistente',
          mechanism:
            'A presença de fecaloma pétreo e volumoso no cólon descendente e reto estimula continuamente os mecanorreceptores parietais de estiramento, gerando reflexo defecatório ineficaz por inércia muscular ou obstrução mecânica luminal.',
          clinicalMeaning: 'Principal queixa clínica na emergência e ambulatório; exige diferenciação com afecções urinárias e alívio álgico imediato.',
          priority: 'common',
        },
        {
          finding: 'Paradoxo da falsa diarreia: extravasamento de fezes líquidas com muco e estrias de sangue contornando o fecaloma',
          mechanism:
            'O fecaloma obstrutivo estático retém fezes sólidas, mas permite que o fluido entérico ileal e as hipersecreções de muco produzidas pela mucosa colônica mecanicamente inflamada e erodida extravasem lateralmente pelo esfíncter anal relaxado.',
          clinicalMeaning: 'Armadilha crucial de plantão: tutores frequentemente relatam diarreia; prescrever antidiarreicos (como loperamida) agrava fatalmente a impactação.',
          priority: 'emergency',
          context: ['Falsa diarreia por extravasamento'],
        },
        {
          finding: 'Massa tubular cilíndrica e pétrea palpável no abdômen caudal/mesogástrico estendendo-se à pelve',
          mechanism:
            'Distensão massiva do cólon por cilindros endurecidos de fezes desidratadas (diâmetro frequentemente de 3 a 6 cm em gatos) ocupando a topografia colônica esquerda.',
          clinicalMeaning: 'Achado clássico do exame físico; confirma impactação e orienta a indicação de radiografia para mensuração de MCD/L5.',
          priority: 'common',
        },
        {
          finding: 'Êmese reflexa persistente e regurgitação',
          mechanism:
            'Estimulação mecânica extrema das vias aferentes vagais e simpáticas no cólon distendido ativando o centro emético no tronco encefálico via reflexo enterogástrico inibitório.',
          clinicalMeaning: 'Presente em grande parte dos felinos obstipados; frequentemente confunde o tutor com gastrite ou corpo estranho gástrico.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia profunda, apatia, prostração e pelagem opaca sem cuidados de auto-higienização',
          mechanism:
            'Desconforto abdominal contínuo, absorção sistêmica de metabólitos bacterianos (amônia, indol) e balanço energético negativo pela recusa alimentar.',
          clinicalMeaning: 'Indica cronicidade e perda de bem-estar; felinos deixam de se lamber pela dor e fraqueza.',
          priority: 'systemic',
        },
        {
          finding: 'Desidratação sistêmica com perda de turgor cutâneo e enoftalmia',
          mechanism:
            'Ingestão hídrica reduzida associada à perda volêmica por êmese e, nos nefropatas, poliúria obrigatória com balanço hídrico negativo.',
          clinicalMeaning: 'Pilar inicial de emergência: desidratação intensifica a reabsorção de água pelo cólon e petrifica ainda mais as fezes.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        {
          finding: 'Relutância ou recusa em adotar a postura arqueada de defecação, dor à flexão lombossacra e coxofemoral',
          mechanism:
            'Espondilose deformante, artrose lumbossacra e osteoartrite coxofemoral provocam dor mecânica intensa ao fletir os quadris e curvar a coluna, levando o felino idoso a reter fezes voluntariamente.',
          clinicalMeaning: 'Causa funcional primordial de retenção crônica em felinos senis (Thanaboonnipat et al., 2021; OR 4,1); tratar a dor ortopédica é obrigatório.',
          priority: 'common',
          context: ['Componente álgico musculoesquelético'],
        },
      ],
    },
    {
      system: 'urinary',
      findings: [
        {
          finding: 'Esforço pélvico e tenesmo com bexiga urinária turgida e hiperextendida ("Bexiga antes de cólon")',
          mechanism:
            'Obstrução uretral aguda (DTUIF em felinos machos) mimetizando esforço de defecação na caixa de areia; ou, secundariamente, grande fecaloma pélvico comprimindo mecanicamente o colo vesical e a uretra proximal.',
          clinicalMeaning: 'Regra de ouro no pronto-socorro felino: palpar imediatamente a bexiga urinária antes de qualquer manipulação colônica para descartar risco iminente de hipercalemia fatal e ruptura vesical.',
          priority: 'emergency',
          context: ['Exclusão prioritária de obstrução uretral'],
        },
      ],
    },
    {
      system: 'neurological',
      findings: [
        {
          finding: 'Hipotonia ou atonia do esfíncter anal externo, ânus entreaberto e reflexo perineal ausente ou deprimido',
          mechanism:
            'Comprometimento das raízes nervosas sacrais (S1–S3) ou nervo pudendo por trauma sacrococcígeo, estenose lombossacra severa ou síndrome da cauda equina.',
          clinicalMeaning: 'Distingue afecções primárias neuromusculares espinhais de megacólon idiopático; define prognóstico funcional neurológico.',
          priority: 'systemic',
          context: ['Avaliação neurológica sacral'],
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem imediata e exclusão mandatória de obstrução uretral felina ("Bexiga antes de cólon")',
      purpose: 'Diferenciar tenesmo fecal de estrangúria urinária aguda em felinos que entram em esforço na caixa sanitária.',
      description:
        'Em todo felino (particularmente machos) atendido com histórico de esforço improdutivo na caixa de areia, a palpação imediata da vesícula urinária deve preceder qualquer outra intervenção. A obstrução uretral por plugs ou urólitos acarreta hipercalemia arritmogênica fatal, acidose metabólica severa e ruptura vesical em 24–48 horas, constituindo emergência com prioridade absoluta sobre o trato gastrointestinal.',
      interpretation:
        'Bexiga pequena e flácida afasta obstrução uretral aguda e permite prosseguir na propedêutica colônica. Bexiga turgida, rígida e hiperextendida diagnostica DTUIF obstrutiva, impondo desobstrução uretral imediata.',
      limitations:
        'Grandes fecalomas na entrada pélvica podem comprimir mecanicamente a uretra intrapélvica, dificultando a micção secundariamente mesmo na ausência de plugs uretrais primários.',
    },
    {
      stepNumber: 2,
      title: 'Palpação abdominal bimanual e exame proctológico digital sob analgesia/sedação',
      purpose: 'Confirmar a presença, calibre e extensão do fecaloma e descartar causas obstrutivas orificiais ou intrapélvicas.',
      description:
        'A palpação abdominal deslizando as polpas digitais no mesogástrio caudal e flanco esquerdo detecta o cólon repleto como cilindro rígido e doloroso. Em seguida, o exame digital retal (toque retal) deve ser realizado. Em cães é realizável sob contenção física e analgesia; em gatos, devido ao estreito calibre anal e à dor, frequentemente requer sedação de curta duração (ex.: cetamina e midazolam associados a opioide). Pesquisar estenoses orificiais, calos de fratura pélvica consolidada viciosa (especialmente ílio e ísquio), corpos estranhos pontiagudos (fragmentos ósseos), neoplasias colônicas murais, afecções dos sacos anais e, no cão macho, hiperplasia ou abscesso prostático.',
      interpretation:
        'Presença de canal pélvico estreitado com calo ósseo pós-trauma define estenose pélvica mecânica secundária; canal livre com dilatação cilíndrica uniforme favorece megacólon idiopático em gatos.',
      limitations:
        'A palpação abdominal pode ser prejudicada em pacientes obesos ou com abdômen tenso por peritonite; o toque retal felino é limitado pelo diâmetro do dedo mínimo do examinador.',
    },
    {
      stepNumber: 3,
      title: 'Exame radiográfico abdominal em duas projeções e mensuração morfométrica MCD/L5',
      purpose: 'Quantificar o grau de dilatação colônica, avaliar densidade fecal, esqueleto pélvico e aplicar a métrica de Trevail et al. (2011).',
      description:
        'Realizar projeções radiográficas laterais (esquerda e direita) e ventrodorsal do abdômen e pelve. Na projeção lateral, mensura-se o maior diâmetro colônico intraluminal (MCD — Maximal Colonic Diameter) perpendicular ao eixo do cólon e o comprimento craniocaudal do corpo da quinta vértebra lombar (L5). A razão matemática MCD/L5 padroniza a avaliação anatômica independente do porte do felino (Trevail et al., 2011; Abdelbaset-Ismail et al., 2022).',
      interpretation:
        'Interpretação da razão MCD/L5 em felinos: 1) Razão < 1,28: forte evidência de cólon normal; 2) Razão entre 1,28 e 1,48: faixa intermediária ou constipação funcional reversível; 3) Razão > 1,48: forte evidência de megacólon (sensibilidade de 77%, especificidade de 85%, LR+ de 5,1). Avaliar adicionalmente presença de fraturas pélvicas mal consolidadas, osteófitos lombossacros (L7-S1) e radiopacidade mineral acentuada (indicando dessecação fecal prolongada).',
      limitations:
        'ARMADILHA CLÍNICA CRUCIAL: MCD/L5 > 1,48 NÃO é critério cirúrgico isolado! Reflete dilatação anatômica, mas não avalia a contratilidade dinâmica residual. Gatos em primeiro episódio agudo de desidratação podem apresentar MCD/L5 > 1,48 e recuperar motilidade total após desimpactação e hidratação. No CÃO, o índice de Trevail NÃO tem validação (Tzimtzimis et al., 2019): dilatação colônica canina não prediz gravidade irreversível.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Painel laboratorial etiológico e metabólico direcionado a comorbidades',
      purpose: 'Rastrear causas subjacentes reversíveis, distúrbios hidroeletrolíticos e impacto sistêmico da retenção.',
      description:
        'Dosagem de ureia, creatinina e SDMA combinados à urinálise com densidade específica (investigação mandatória de Doença Renal Crônica — OR 3,8 para constipação grave; Benjamin & Drobatz, 2020); dosagem de potássio sérico (a hipocalemia hiperpolariza a membrana miocítica entérica e deflagra atonia muscular colônica); cálcio sérico ionizado e total (a hipercalcemia reduz a excitabilidade neuromuscular e lentifica o trânsito intestinal); hemograma completo (descartar leucocitose com desvio tóxico da translocação bacteriana ou peritonite); e T4 total em felinos idosos (descartar hipotireoidismo iatrogênico pós-tratamento de hipertireoidismo).',
      interpretation:
        'Identificação de hipocalemia ou hipercalcemia exige correção farmacológica imediata para restaurar o tônus muscular liso. Azotemia acentuada associada a isostenúria orienta hidratação venosa vigorosa e manejo concomitante de DRC.',
      limitations:
        'Exames séricos de rotina não aferem a atividade neurotransmissora mioentérica nem distinguem se a atonia colônica é idiopática primária ou consequência temporal de distensão crônica.',
    },
    {
      stepNumber: 5,
      title: 'Ultrassonografia abdominal focada e Tomografia Computadorizada (TC) intrapélvica',
      purpose: 'Avaliar arquitetura mural do cólon, linfonodos regionais e mapear o canal pélvico tridimensionalmente.',
      description:
        'A ultrassonografia abdominal avalia a estratificação de camadas da parede colônica (espessura normal do cólon felino: 1,5 a 2,0 mm), descartando espessamentos focais neoplásicos (adenocarcinoma colônico, linfoma mural), linfonodomegalia cólica/mesentérica e sinais de líquido livre peritoneal por perfuração diastática. A Tomografia Computadorizada (TC) de pelve e coluna lombossacra é o exame de eleição para o planejamento cirúrgico ortopédico em casos de fraturas pélvicas consolidadas viciosamente, permitindo mensurar a redução milimétrica da área transversal do canal e planejar osteotomias corretivas ou enxertos expansivos.',
      interpretation:
        'Preservação da estratificação parietal com espessamento uniforme muscular e submucoso apoia megacólon idiopático (Abdelbaset-Ismail et al., 2022); perda de estratificação com nódulos murais indica neoplasia. Na TC, estreitamento >40–50% do diâmetro pélvico por calo ósseo comprova etiologia mecânica obstrutiva.',
      limitations:
        'A presença de fecaloma pétreo com densa sombra acústica posterior na ultrassonografia impede a visibilização da parede contralateral e das estruturas retrocólicas, devendo a ultrassonografia ser repetida após a desimpactação completa.',
    },
    {
      stepNumber: 6,
      title: 'Diagnóstico diferencial e exclusão sistemática de mimetizadores',
      purpose: 'Diferenciar o megacólon idiopático das causas obstrutivas mecânicas, farmacológicas e ortopédicas tratáveis.',
      description:
        'Estruturar o raciocínio diferencial entre as principais afecções de retenção fecal: 1) Megacólon idiopático felino vs estenose pélvica pós-traumática; 2) Impactação colônica canina por osso/corpo estranho ou afecção prostática (altamente responsiva ao manejo médico; Tzimtzimis et al., 2019); 3) Obstrução mecânica extraluminal (hérnias perineais com flexão retal, linfoma sublombar); 4) Atonia iatrogênica induzida por fármacos (opioides, sucralfato, anticolinérgicos); 5) Inibição comportamental/álgica da defecação por osteoartrite lombossacra (Thanaboonnipat et al., 2021) ou aversão à caixa sanitária suja.',
      interpretation:
        'A exclusão rigorosa de causas obstrutivas e comorbidades metabólicas fecha o diagnóstico de megacólon idiopático em gatos. No cão, o diagnóstico etiológico primário subjacente deve ser exaustivamente buscado, pois o megacólon idiopático canino é excepcional.',
      limitations:
        'A diferenciação entre inércia colônica funcional precoce e dor musculoesquelética pura em gatos idosos requer frequentemente prova terapêutica analgésica concomitante.',
    },
  ],
  treatment: {
    metaPrimaria:
      'A abordagem da retenção fecal divide-se rigorosamente em duas fases temporais: 1) Tratamento de Resgate / Desimpactação Aguda: esvaziar o cólon de forma segura e atraumática, restabelecendo o trânsito luminal; 2) Tratamento de Manutenção Crônica: impedir nova impactação, modular a consistência fecal com laxantes osmóticos, estimular a motilidade com pró-cinéticos selecionados e prescrever dieta compatível com o grau de função motora residual.\n\nO princípio biomecânico mandatório no atendimento da retenção fecal é: primeiro hidrate o paciente, depois tente empurrar as fezes. Administrar enemas ou laxantes osmóticos em animais desidratados, hipovolêmicos ou azotêmicos agrava criticamente o balanço hídrico orgânico e pode precipitar falência renal aguda isquêmica. O cólon desidratado retira água do organismo; laxantes osmóticos transferem água do intravascular e intersticial para a luz colônica. Assim, o paciente deve receber fluidoterapia intravenosa balanceada (Ringer com lactato na taxa de reposição do déficit estimado mais manutenção e perdas contínuas) por pelo menos 4 a 12 horas antes da manipulação retal agressiva ou administração de soluções enterais.',
    desimpactacaoAguda:
      'Técnicas e protocolos para o esvaziamento colônico seguro na fase hospitalar:\n\n- Enema convencional seguro: água morna pura ou solução fisiológica 0,9% (10 a 20 mL/kg), combinada a lubrificante hidrossolúvel ou vaselina líquida medicinal (5 a 10 mL por gato). A infusão é realizada lentamente através de sonda uretral flexível de borracha ou polietileno número 8 a 10 Fr abundantemente lubrificada, introduzida delicadamente pelo reto sem resistência forçada.\n- Proibição absoluta de enemas de fosfato em gatos: é expressamente PROIBIDO o uso de enemas humanos contendo fosfato de sódio (como Fleet Enema ou similares) na espécie felina. A absorção retal maciça de fosfato pelo epitélio colônico inflamado desencadeia hiperfosfatemia hiperaguda grave, hipocalcemia tetânica com convulsões, hipernatremia grave, acidose metabólica e colapso circulatório fatal em poucas horas.\n- Uso cauteloso do Minilax (sorbitol/laurilsulfato): no Brasil, o Minilax (bisnaga de 6,5 g) é frequentemente empregado. Embora não contenha fosfato, deve ser usado com cautela: o laurilsulfato de sódio atua como surfactante que pode provocar irritação química e retite na mucosa desnudada, e o volume restrito de uma bisnaga tem baixa eficácia para amolecer fecalomas pétreos maciços no cólon proximal ou transverso. Benjamin & Drobatz (2020) demonstraram que a taxa de sucesso global de enemas em emergência é de apenas 53%, e que repetir múltiplos enemas no mesmo plantão aumenta a dor e o risco de ruptura mural sem elevar significativamente o esvaziamento.\n- Solução de PEG com eletrólitos para lavagem intestinal (PEG-ELS, Colyte, Golytely): indicada para desobstipação hospitalar sob monitoramento em pacientes com impactações severas não mobilizadas por enemas simples. Infundida via sonda nasoesofágica ou nasogástrica na taxa de 6 a 10 mL/kg/hora até a eliminação espontânea de fezes amolecidas ou evacuação de líquido translúcido (geralmente completada entre 8 e 18 horas). Deve-se monitorar distensão gástrica, êmese e eletrólitos séricos durante a infusão.\n- Desimpactação manual transretal sob anestesia geral: indicada quando há fecaloma pétreo volumoso não responsivo aos métodos conservadores. O procedimento exige obrigatoriamente intubação orotraqueal com balonete insuflado para vedar a via aérea contra o risco de regurgitação e aspiração pulmonar reflexa. Sob decúbito lateral ou esternal, infundem-se volumes fracionados de salina morna e lubrificante pelo reto enquanto o médico realiza massagem bimanual delicada (palpação transabdominal com uma mão estabilizando o fecaloma e fragmentação digital transretal cuidadosa com a outra). Instrumentos metálicos cortantes ou força excessiva são rigorosamente proscritos pelo risco de perfuração colônica.',
    farmacoterapiaManutencao:
      'Pilares farmacológicos para a prevenção ambulatorial de recidivas:\n\n- Polietilenoglicol 3350 sem eletrólitos em pó (PEG 3350 puro — Muvinlax, MiraLAX): laxante osmótico inerte de alto peso molecular que retém água estequiometricamente no lúmen intestinal sem ser absorvido ou fermentado pela microbiota colônica. É o fármaco padrão de manutenção ambulatorial, altamente palatável para felinos quando misturado em sachê ou alimento úmido. A dose empírica validada por Tam et al. (2011) situa-se entre 1/8 a 1/4 de colher de chá por gato (aproximadamente 1,5 a 3 g por animal) a cada 12 ou 24 horas por via oral, ajustando-se gradualmente até obter fezes pastosas bem formadas.\n- Lactulose: dissacarídeo sintético não absorvível (0,5 mL/kg VO a cada 8 a 12 horas) que é fermentado pelas bactérias colônicas em ácidos graxos de cadeia curta e ácido lático, acidificando o lúmen e retendo água por osmose. Suas limitações em relação ao PEG 3350 residem no sabor excessivamente adocicado (sialorreia frequente e recusa em gatos) e potencial para produzir flatulência e cólicas abdominais.\n- Cisaprida: benzamida substituída que atua como agonista potente e seletivo dos receptores de serotonina 5-HT4 pós-ganglionares no plexo mioentérico colônico, estimulando a liberação fisiológica de acetilcolina e gerando contrações propulsivas em todo o cólon felino (Hasler & Washabau, 1997). Dose recomendada: 2,5 a 5 mg por gato (ou 0,5 a 1,0 mg/kg no cão) por via oral a cada 8 a 12 horas, administrada 30 minutos antes da refeição. Contraindicação formal: a cisaprida jamais deve ser administrada na presença de obstrução fecal sólida mecânica ativa; induzir ondas contráteis vigorosas contra um lúmen totalmente ocluído gera dor paroxística e risco de ruptura mural diastática.\n- Análise crítica de outros fármacos: a prucaloprida (agonista 5-HT4 de alta afinidade e elevada seletividade) é excelente alternativa em casos refratários à cisaprida; a metoclopramida (antagonista dopaminérgico D2) atua apenas no estômago e duodeno proximal, sendo completamente ineficaz no cólon; macrolídeos (agonistas de motilina) e ranitidina não possuem benefício motor colônico consistente.',
    paradoxoDaFibraEManejoDietetico:
      'O manejo nutricional da retenção fecal encerra um dos conceitos mais importantes da gastroenterologia de pequenos animais: o paradoxo da fibra alimentar.\n\nAs fibras insolúveis não fermentáveis (como celulose e farelo de trigo) aumentam o volume do bolo fecal e provocam distensão intraluminal. Em um paciente com motilidade preservada (constipação incipiente), essa distensão mecânica ativa os mecanorreceptores parietais e deflagra o reflexo peristáltico fisiológico de evacuação. Entretanto, em um paciente com atonia colônica ou megacólon estabelecido, o músculo liso é incapaz de gerar força propulsiva contra uma carga mecânica maior: adicionar fibra insolúvel a um cólon inerte produz fecalomas gigantescos e acelera a obstipação refratária (Applied Veterinary Clinical Nutrition, 2ª ed.).\n\nPara felinos com megacólon avançado ou hipomotilidade severa, a prescrição nutricional de escolha é uma dieta altamente digestível e de baixo resíduo (fórmulas gastrointestinais de alta biodisponibilidade), associada à hidratação agressiva por alimentos úmidos exclusivos e administração concomitante de psyllium solúvel ou PEG 3350.',
    intervencaoCirurgica:
      'A colectomia subtotal com anastomose colorretal é o tratamento cirúrgico definitivo de escolha para o megacólon idiopático felino quando o paciente preenche três critérios simultâneos:\n\n1) Dilatação colônica persistente documentada;\n2) Recorrência frequente de obstipação exigindo múltiplas desimpactações sob anestesia;\n3) Perda irreversível de resposta clínica à terapia médica máxima (hidratação, PEG 3350, lactulose, cisaprida e dieta ajustada).\n\nNa mais importante coorte cirúrgica moderna multicêntrica (Grossman et al., 2021; JAVMA), envolvendo 166 gatos submetidos à colectomia subtotal em 18 centros hospitalares, a taxa de complicações maiores foi de 9,9%, com mortalidade diretamente relacionada à doença de 14%. Fatores prognósticos associados a menor sobrevida incluíram escore corporal caquético (BCS <4/9), cardiopatia associada, complicações perioperatórias e fezes líquidas persistentes. A preservação da junção ileocecocólica (anastomose colocolônica ou ileocólica proximal) demonstrou redução dramática na incidência de diarreia aquosa crônica e melhora na qualidade de vida avaliada pelos tutores, sem aumentar a taxa de recorrência de constipação.\n\nNo CÃO: a colectomia subtotal é excepcional (Németh et al., 2008; série com apenas 8 cães). Cães com impactações colônicas severas quase sempre recuperam a função motora após a resolução da causa de base mecânica ou álgica (Tzimtzimis et al., 2019). A cirurgia no cão deve focar na causa etiológica primária (herniorrafia perineal, orquiectomia/tratamento prostático, ostectomia pélvica).',
    terapiasInadequadas:
      'Condutas desaconselhadas e mitos terapêuticos que não devem ser praticados na abordagem do megacólon:\n\n- Enemas de fosfato de sódio em gatos (Fleet Enema): risco iminente de óbito por hiperfosfatemia fulminante e hipocalcemia tetânica.\n- Metoclopramida como estimulante colônico: age exclusivamente no trato gastrointestinal superior; não possui receptores ou efeito propulsivo no cólon.\n- Administração de cisaprida antes da desimpactação: induzir ondas contráteis vigorosas contra um fecaloma sólido volumoso causa dor paroxística e risco de perfuração diastática.\n- Dietas ricas em fibras brutas insolúveis em cólon atônico: o acréscimo de massa fecal a um cólon aperistáltico gera fecalitos pétreos colossais.\n- Desimpactação manual transretal a seco ou sem intubação orotraqueal: risco grave de laceração mucosa retal e pneumonia aspirativa reflexa.',
    monitoramentoSeriado:
      'Protocolo de acompanhamento clínico e critérios objetivos de sucesso:\n\n- Registro em diário pelo tutor: monitorar frequência de idas à caixa de areia, presença de vocalização ou esforço, formato e calibre das fezes e ocorrência de fezes fora da caixa.\n- Avaliação clínica periódica: palpação abdominal seriada a cada 1 a 3 meses para detecção precoce de acúmulo fecal antes da formação de fecaloma pétreo; pesagem corporal para identificar emaciação ou perda de condição.\n- Monitoramento laboratorial em pacientes com comorbidades: em felinos com Doença Renal Crônica concomitante, dosar creatinina, ureia, potássio sérico e urinálise a cada 2 a 4 meses, ajustando a terapia de fluidos para evitar desidratação subclínica que deflagre nova retenção.',
  },
  complications: {
    isquemiaEPerfuracaoDiastatica:
      'O fecaloma pétreo hiperdenso exerce compressão contínua contra a mucosa e submucosa do cólon, colabando o leito capilar intramural e provocando necrose isquêmica transmural por pressão. A evolução desfavorável culmina em perfuração colônica diastática para a cavidade peritoneal, peritonite séptica fecal hiperaguda, choque endotóxico e colapso circulatório com letalidade superior a 80%.',
    intoxicacaoPorEnemaFosfato:
      'A administração iatrogênica de enemas humanos contendo fosfato de sódio na espécie felina deflagra intoxicação hiperaguda catastrófica. A absorção retal maciça de fosfato inorgânico induz hiperfosfatemia profunda, que precipita com o cálcio plasmático e acarreta hipocalcemia ionizada severa. O felino manifesta tetania, espasmos musculares, tremores generalizados, crises convulsivas tônico-clônicas, hipotensão e colapso cardiorrespiratório. O tratamento exige internação imediata em UTI, infusão contínua de gluconato de cálcio a 10% monitorada por ECG e fluidoterapia salina 0,9% agressiva para forçar a excreção renal de fosfato.',
    diarreiaCronicaPosColectomia:
      'Complicação observada principalmente em gatos submetidos à colectomia subtotal com ressecção completa da válvula ileocecocólica e ceco. A perda da barreira mecânica ileocólica permite o refluxo retrógrado de bactérias colônicas para o íleo terminal, induzindo supercrescimento bacteriano no intestino delgado (SIBO) e má absorção severa de ácidos biliares, manifestando-se por diarreia aquosa crônica incoercível, perda de peso e dermatite perineal por umidade fecal.',
  },
  prevention: {
    prevencaoRecidivasAmbiente:
      'A prevenção longitudinal de recidivas apoia-se em cinco pilares fundamentais de manejo domiciliar:\n\n1) Estímulo intensivo à ingestão de água: fornecer rações úmidas exclusivas ou diluídas em caldos caseiros sem temperos, instalar fontes automáticas de água corrente com filtros limpos e espalhar bebedouros de cerâmica ou aço inoxidável em locais tranquilos da residência.\n2) Manejo estruturado da caixa sanitária: adotar a regra N+1 (uma caixa a mais que o número de gatos no domicílio), higienizar as bandejas pelo menos duas vezes ao dia e utilizar caixas amplas com laterais rebaixadas para felinos idosos ou com limitações articulares.\n3) Analgesia preventiva de afecções musculoesqueléticas: felinos com espondilose lombossacra ou artrose coxofemoral devem receber controle álgico crônico contínuo (gabapentina 5 a 10 mg/kg VO BID; anticorpos monoclonais anti-NGF como frunevetmab sob prescrição) para viabilizar a postura de defecação sem desconforto.\n4) Controle de peso e enriquecimento ambiental: prevenir a obesidade mediante brincadeiras estimulantes diárias e exercícios verticais.\n5) Suporte hídrico parenteral domiciliar: em gatos portadores de Doença Renal Crônica, instituir fluidoterapia subcutânea domiciliar profilática orientada pelo veterinário nefrologista, prevenindo o balanço hídrico negativo que induz dessecação do bolo fecal.',
    iatrogenica:
      'Prevenção de complicações decorrentes de procedimentos e prescrições médicas:\n\n- Manipulação retal e enemas atraumáticos: utilizar exclusivamente sondas maleáveis bem lubrificadas introduzidas sem força mecânica, evitando lacerações da mucosa retal inflamada e perfurações iatrogênicas.\n- Proteção de via aérea durante desimpactações: garantir intubação orotraqueal com balonete devidamente testado e insuflado em qualquer procedimento descompressivo sob anestesia geral, prevenindo pneumonia por aspiração reflexa de conteúdo gástrico.\n- Uso parcimonioso de fármacos constipantes: monitorar o trânsito intestinal e associar laxantes osmóticos profiláticos sempre que houver necessidade de prescrever opioides, anticolinérgicos, sucralfato ou suplementos de ferro a pacientes com histórico prévio de retenção fecal.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'dipirona',
  ],
  references: [
    {
      id: 'ref-washabau-1996',
      citationText:
        'WASHABAU, R. J.; STALIS, I. H. Alterations in colonic smooth muscle function in cats with idiopathic megacolon. American Journal of Veterinary Research, v. 57, n. 4, p. 580–587, 1996.',
      sourceType: 'article',
      notes: 'Estudo seminal fisiológico in vitro comprovando disfunção contrátil intrínseca do músculo liso colônico na resposta a ACh, substância P, CCK, KCl e estimulação elétrica.',
    },
    {
      id: 'ref-hasler-1997',
      citationText:
        'HASLER, A. H.; WASHABAU, R. J. Cisapride stimulates contraction of idiopathic megacolonic smooth muscle in cats. Journal of Veterinary Internal Medicine, v. 11, n. 6, p. 313–318, 1997. DOI: 10.1111/j.1939-1676.1997.tb00472.x.',
      sourceType: 'article',
      notes: 'Demonstrou que a cisaprida atua em receptores 5-HT4 restaurando parcialmente a contratilidade colônica ex vivo em gatos acometidos.',
    },
    {
      id: 'ref-trevail-2011',
      citationText:
        'TREVAIL, T. et al. Radiographic diameter of the colon in normal and constipated cats and in cats with megacolon. Veterinary Radiology & Ultrasound, v. 52, n. 5, p. 516–520, 2011. DOI: 10.1111/j.1740-8261.2011.01830.x.',
      sourceType: 'article',
      notes: 'Validação da métrica radiográfica MCD/L5 (corte de 1,48 com Se 77% e Sp 85% para megacólon e <1,28 para cólon normal).',
    },
    {
      id: 'ref-tam-2011',
      citationText:
        'TAM, F. M. et al. Safety and palatability of polyethylene glycol 3350 as an oral laxative in cats. Journal of Feline Medicine and Surgery, v. 13, n. 9, p. 694–697, 2011. DOI: 10.1016/j.jfms.2011.05.017.',
      sourceType: 'article',
      notes: 'Avaliou a segurança e excelente palatabilidade do PEG 3350 em pó dissolvido em alimento em felinos para manejo da consistência fecal.',
    },
    {
      id: 'ref-benjamin-2020',
      citationText:
        'BENJAMIN, S. E.; DROBATZ, K. J. Retrospective evaluation of risk factors and treatment outcome predictors in cats presenting to the emergency room for constipation. Journal of Feline Medicine and Surgery, v. 22, n. 2, p. 153–160, 2020. DOI: 10.1177/1098612X19832663.',
      sourceType: 'article',
      notes: 'Grande coorte de pronto-socorro (189 gatos constipados); comprovou OR de 3,8 para DRC, taxa de sucesso de enemas de apenas 53% e forte associação entre dor abdominal e insucesso.',
    },
    {
      id: 'ref-tzimtzimis-2019',
      citationText:
        'TZIMTZIMIS, E. et al. Colonic impaction in 58 dogs: clinical features, radiographic findings and outcome. Journal of Small Animal Practice, v. 60, n. 7, p. 439–446, 2019. DOI: 10.1111/jsap.12999.',
      sourceType: 'article',
      notes: 'Estudo em 58 cães com impactação colônica; demonstrou 88% de resolução médica e ausência de correlação prognóstica entre dilatação radiográfica e irreversibilidade.',
    },
    {
      id: 'ref-grossman-2021',
      citationText:
        'GROSSMAN, K. et al. Evaluation of long-term outcomes and risk factors for death in cats undergoing subtotal colectomy: 166 cases (2004-2018). Journal of the American Veterinary Medical Association, v. 259, n. 5, p. 509–518, 2021. DOI: 10.2460/javma.259.5.509.',
      sourceType: 'article',
      notes: 'Maior coorte moderna de colectomia subtotal em 166 gatos; 9,9% de complicações maiores, mortalidade relacionada de 14% e benefício da preservação ileocecocólica.',
    },
    {
      id: 'ref-thanaboonnipat-2021',
      citationText:
        'THANABOONNIPAT, C. et al. Radiographic assessment of non-traumatic lumbosacral vertebral abnormalities and their association with feline constipation. Veterinary Sciences, v. 8, n. 11, p. 280, 2021. DOI: 10.3390/vetsci8110280.',
      sourceType: 'article',
      notes: 'Estudo retrospectivo em 1.365 gatos; determinou OR de 4,107 para constipação na presença de afecções lombossacras adquiridas.',
    },
    {
      id: 'ref-abdelbaset-2022',
      citationText:
        'ABDELBASET-ISMAIL, A. et al. Clinical, radiographic, and histopathological features of feline idiopathic megacolon with chronological remodeling. Frontiers in Veterinary Science, v. 9, p. 1033090, 2022. DOI: 10.3389/fvets.2022.1033090.',
      sourceType: 'article',
      notes: 'Comprovou o remodelamento temporal com hipertrofia, fibrose, necrose miocítica e depleção neuronal mioentérica em gatos com mais de 6 meses de sinais clínicos (Open Access CC BY 4.0).',
    },
    {
      id: 'ref-george-2025',
      citationText:
        'GEORGE, Z. et al. Digital monitoring of elimination behaviors in cats with chronic kidney disease using smart litter boxes. Journal of Feline Medicine and Surgery, v. 27, n. 1, p. 1098612, 2025.',
      sourceType: 'article',
      notes: 'Estudo com caixas Petivity demonstrando média acumulada de 10 dias sem defecação em 30 dias em felinos com DRC versus 2 dias em gatos controles.',
    },
    {
      id: 'ref-jones-2022',
      citationText:
        'JONES, B. R. et al. Fecal elimination frequency and stool scoring in domestic cats with chronic kidney disease. Journal of Feline Medicine and Surgery, v. 24, n. 4, p. 320–328, 2022.',
      sourceType: 'article',
      notes: 'Demonstrou que 42% dos felinos com DRC evacuam menos de 1 vez por dia em comparação a 15% nos controles hígidos.',
    },
    {
      id: 'ref-nemeth-2008',
      citationText:
        'NÉMETH, T. et al. Subtotal colectomy in dogs: clinical experience with 8 cases. Journal of Small Animal Practice, v. 49, n. 8, p. 408–414, 2008. DOI: 10.1111/j.1748-5827.2008.00588.x.',
      sourceType: 'article',
      notes: 'Série descritiva de colectomia subtotal em cães, ressaltando o caráter excepcional da indicação cirúrgica nesta espécie.',
    },
    {
      id: 'ref-delahunta-2021',
      citationText:
        'DE LAHUNTA, A.; GLASS, E.; KENT, M. Veterinary Neuroanatomy and Clinical Neurology. 5th ed. Elsevier; 2021. Cap. 7: Autonomic Nervous System and Micturition/Defecation Reflexes, pp. 195–218.',
      sourceType: 'book',
      notes: 'Bases neuroanatômicas formais do controle autonômico e somático da defecação (nervos pélvico S1-S3, hipogástrico L1-L4 e pudendo S1-S3).',
    },
    {
      id: 'ref-plumbs-10ed',
      citationText:
        'BUDDE, J. A.; MCCLUSKEY, D. M. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Cisapride (pp. 235–238), Polyethylene Glycol 3350 (pp. 980–982), Lactulose (pp. 680–683) e Calcium Gluconate.',
      sourceType: 'book',
      notes: 'Doses e mecanismos farmacológicos de pró-cinéticos, laxantes osmóticos e manejo de emergência em intoxicação por fosfato.',
    },
    {
      id: 'ref-bsava-gastro-3ed',
      citationText:
        'MARKS, S. L.; NEIGER, R., eds. BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. British Small Animal Veterinary Association; 2020. Cap. 18: Disorders of the Large Intestine, pp. 245–262.',
      sourceType: 'book',
      notes: 'Diretrizes completas de abordagem clínica, nutricional e cirúrgica do megacólon e constipação em pequenos animais.',
    },
  ],
};
