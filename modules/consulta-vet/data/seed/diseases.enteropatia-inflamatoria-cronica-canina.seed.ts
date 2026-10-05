import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Enteropatias Inflamatórias Crônicas em Cães (CIE) — Monografia Clínica Padrão Ouro.
 * Atualizado com base no Consenso ACVIM 2026 (Heilmann et al.), Consenso CURATIVE 2022,
 * literatura especializada de gastroenterologia canina (Jablonski 2022 e 2026; Dor et al., 2024; Myers et al., 2023;
 * Caulfield et al., 2026; Hanifeh et al., 2026), Nelson & Couto 6ª ed. (cap. 31),
 * Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice, Withrow & MacEwen 6ª ed. e Plumb's 10ª ed.
 */
export const enteropatiaInflamatoriaCronicaCaninaRecord: DiseaseRecord = {
  id: 'disease-enteropatia-inflamatoria-cronica-canina',
  slug: 'enteropatia-inflamatoria-cronica-canina',
  title: 'Enteropatias inflamatórias crônicas em cães (CIE / antiga IBD)',
  subtitle:
    'Guia clínico avançado: nova nomenclatura e fenotipagem ACVIM 2026, protagonismo da terapia dietética sequencial, abolição de antibióticos empíricos, graduação por CCECAI e imunomodulação racional',
  synonyms: [
    'Enteropatias inflamatórias crônicas caninas',
    'Chronic inflammatory enteropathy (CIE)',
    'CIE canina',
    'Doença inflamatória intestinal canina (antiga IBD canina)',
    'Enteropatia crônica em cães',
    'Enteropatia responsiva à dieta (CIE-FR)',
    'Enteropatia responsiva a imunossupressores (CIE-IR)',
    'Enteropatia não responsiva (CIE-NR)',
  ],
  species: ['dog'],
  category: 'gastroenterologia',
  categories: [
    'gastroenterologia',
    'clinica-medica',
    'nutricao-clinica',
    'imunologia',
    'farmacologia-terapeutica',
  ],
  tags: [
    'Enteropatia Inflamatória Crônica',
    'CIE Canina',
    'ACVIM 2026',
    'IBD Canina',
    'CIE-FR',
    'CIE-IR',
    'CCECAI',
    'CIBDAI',
    'Dieta Hidrolisada',
    'Veto a Antibióticos Empíricos',
    'Cobalamina Oral',
    'Budesonida',
    'Ciclosporina',
    'Clorambucil',
    'Nelson & Couto',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['enteropatia-inflamatoria-cronica-canina'],

  quickSummary:
    'As enteropatias inflamatórias crônicas em cães (CIE) compreendem um grupo heterogêneo de distúrbios digestivos persistentes ou recorrentes caracterizados por inflamação mucosa, cuja abordagem foi completamente revolucionada pelo consenso ACVIM 2026:\n\n' +
    '- Mudança paradigmática de nomenclatura: o termo Chronic Inflammatory Enteropathy (CIE) substitui definitivamente a designação genérica de IBD (termo reservado à doença inflamatória intestinal humana, biologicamente distinta).\n' +
    '- Superação da escada terapêutica clássica: abandona-se o antigo algoritmo sequencial "dieta -> antibiótico -> corticoide", substituindo-o por fenotipagem clínica guiada por gravidade, escore CCECAI e resposta terapêutica documentada.\n' +
    '- Protagonismo absoluto da nutrição: a dieta é atualmente uma ferramenta diagnóstica e terapêutica de primeira linha; entre 38% e 89% dos cães com CIE são responsivos exclusivamente à intervenção dietética (CIE-FR).\n' +
    '- Fim do ensaio antimicrobiano empírico: recomendação consensual forte contra o uso rotineiro de metronidazol ou tilosina, pelo risco grave de disbiose persistente e indução de resistência antimicrobiana.\n' +
    '- Exceção formal para antibióticos: a colite granulomatosa ulcerativa ligada à Escherichia coli aderente-invasiva (AIEC) em Boxers e Bulldogs Franceses exige biópsia mucosa, cultura bacteriana e fluoroquinolona guiada por antibiograma.\n' +
    '- Imunomodulação racional e desmame: reservada a pacientes refratários aos ensaios dietéticos ou com apresentações inflamatórias de alta gravidade (CIE-IR), mantendo monitoramento estrito de efeitos catabólicos e sarcopenia.',

  quickDecisionStrip: [
    'Substitua o termo IBD por CIE: o consenso ACVIM 2026 define a afecção canina como enteropatia inflamatória crônica, classificada fenotipicamente pela resposta terapêutica.',
    'Dieta é a primeira linha indispensável: realize até três ensaios dietéticos diferentes (hidrolisada, proteína nova, altamente digestível), com duração de pelo menos 2 semanas cada, em cães clinicamente estáveis.',
    'Veto a antibióticos empíricos: metronidazol e tilosina não devem ser usados como teste terapêutico rotineiro; resposta transitória não prova infecção e causa disbiose duradoura.',
    'Colite granulomatosa em Boxer e Bulldog Francês é a exceção: requer colonoscopia, biópsia com histologia e cultura de mucosa para AIEC antes de iniciar enrofloxacina.',
    'Balanço de gravidade pelo CCECAI: mensure albumina, cobalamina, escore fecal e perda ponderal para graduar atividade da doença e guiar a urgência de biópsia.',
    'Cobalamina oral tem eficácia comprovada: cianocobalamina oral (25 mcg/kg VO q24h por 84 dias) normaliza os níveis séricos e marcadores intracelulares (MMA) tão eficientemente quanto a via parenteral.',
    'Budesonida não é isenta de efeitos sistêmicos: embora sofra extenso metabolismo de primeira passagem hepática, suprime o eixo hipotálamo-hipófise-adrenal (HPA) e não tem menos efeitos adversos que a prednisona.',
    'Biópsia não é obrigatória de imediato em cão estável: reserve endoscopia precoce para cães com CCECAI alto, perda de peso acentuada (>5%), hipoalbuminemia ou suspeita de neoplasia.',
    'Não confunda disbiose com infecção: a alteração bacteriana na CIE decorre de inflamação e alteração do microambiente luminal, não justificando bactericidas de amplo espectro.',
    'Falha terapêutica exige reabrir o diagnóstico: antes de aumentar imunossupressores em cão refratário, descarte linfoma alimentar, hipoadrenocorticismo, EPI, infecções fúngicas e quebra de adesão dietética.',
  ],

  quickSummaryRich: {
    lead:
      'As enteropatias inflamatórias crônicas (CIE) representam a causa mais prevalente de sinais digestivos prolongados em cães, exigindo abandono de condutas empíricas ultrapassadas em favor da medicina baseada em evidências:\n\n' +
      '- Fisiopatologia multifatorial integrada: desbalanço dinâmico entre barreira mucosa, microbiota entérica, antígenos dietéticos e imunidade inata e adaptativa da lâmina própria.\n' +
      '- Mudança estrutural de conduta: eliminação da antibioticoterapia empírica e centralização em ensaios nutricionais sequenciais antes de qualquer imunossupressão.',
    leadHighlights: [
      'Nomenclatura contemporânea CIE em substituição formal ao termo IBD',
      'Classificação fenotípica funcional em CIE-FR, CIE-IR e CIE-NR',
      'Recomendação contra o uso empírico de metronidazol e tilosina',
      'Protocolo sequencial de até três ensaios dietéticos de no mínimo duas semanas',
      'Suplementação oral diária de cobalamina validada por ensaios randomizados',
    ],
    pillars: [
      {
        title: 'Pilar 1: Nova Nomenclatura e Classificação Fenotípica',
        body:
          'Superação do conceito histórico de IBD pela definição de CIE (ACVIM 2026):\n\n' +
          '- Distinção biológica: a IBD humana possui bases imunogenéticas distintas da doença canina, tornando o termo CIE tecnicamente mais acurado.\n' +
          '- Classificação funcional por resposta: subdivisão prática em CIE-FR (dietorresponsiva, representando 38% a 89% dos casos), CIE-IR (imunossupressor-responsiva) e CIE-NR (não responsiva ou refratária).\n' +
          '- Fenótipos especiais integrados: a enteropatia perdedora de proteínas (PLE) e a colite granulomatosa (GC) são reconhecidas como fenótipos de gravidade dentro do espectro da CIE.',
        highlights: ['CIE substitui IBD', 'CIE-FR é o fenótipo mais comum (até 89%)', 'PLE e colite granulomatosa como fenótipos'],
      },
      {
        title: 'Pilar 2: Protagonismo Nutricional e Abolição de Antibióticos Empíricos',
        body:
          'Transformação radical da abordagem diagnóstica e terapêutica de primeira linha:\n\n' +
          '- Dieta como intervenção primária: fornecimento exclusivo de dieta terapêutica por no mínimo 2 semanas; cães estáveis sem resposta inicial devem receber até três dietas diferentes antes de assumir falha dietética.\n' +
          '- Veto ao teste antimicrobiano: o ACVIM 2026 contraindica formalmente metronidazol e tilosina empíricos, pois causam disbiose persistente e resistência bacteriana sem curar a etiologia de base.\n' +
          '- Exceção na colite granulomatosa: em Boxers e Bulldogs Franceses com colite invasiva por AIEC, a fluoroquinolona é mandatória, guiada exclusivamente por biópsia e antibiograma.',
        highlights: ['Até três ensaios dietéticos exclusivos', 'Contraindicação formal de antibiótico empírico', 'AIEC em Boxers como única exceção'],
      },
      {
        title: 'Pilar 3: Estratificação por Índices de Atividade e Momento da Biópsia',
        body:
          'Critérios objetivos para estadiamento clínico e indicação de procedimentos invasivos:\n\n' +
          '- Índices clínicos validados: aplicação do CIBDAI e preferencialmente do CCECAI, que agrega albumina, cobalamina e prurido para monitoramento objetivo da remissão (>75% de redução).\n' +
          '- Desmistificação do padrão-ouro histológico: infiltrado inflamatório linfoplasmocítico deve ser correlacionado com a clínica e resposta dietética, não fechando diagnóstico isoladamente.\n' +
          '- Indicações de endoscopia precoce: reservada para perda de peso grave (>5%), CCECAI elevado, hipoalbuminemia, anorexia profunda ou suspeita de neoplasia infiltrativa.',
        highlights: ['CCECAI como métrica de remissão', 'Histologia integrada à clínica', 'Critérios para biópsia precoce versus tardia'],
      },
      {
        title: 'Pilar 4: Manejo Metabólico, Cobalamina e Imunomodulação Racional',
        body:
          'Correção de carências funcionais e escalonamento farmacológico seguro:\n\n' +
          '- Terapia de reposição de cobalamina: cianocobalamina oral (25 mcg/kg VO q24h por 84 dias) atinge eficácia metabólica equivalente à reposição parenteral semanal, restaurando o ácido metilmalônico celular.\n' +
          '- Glicocorticoides protocolados: prednisolona (1 a 2 mg/kg VO q24h) com desmame em 2 a 3 semanas após resposta em CIE-IR; budesonida (3 mg/m² VO q24h) com vigilância de supressão do eixo HPA.\n' +
          '- Imunossupressores de resgate: ciclosporina (3 a 5 mg/kg VO q12-24h) e clorambucil (2 a 4 mg/m² VO q24h) indicados perante resposta parcial ou córtico-resistência.',
        highlights: ['Cobalamina oral diária eficaz', 'Budesonida suprime eixo adrenal', 'Ciclosporina e clorambucil para resgate'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Estruturado por Níveis (Tiers) — ACVIM 2026',
      steps: [
        {
          label: 'Tier 1: Triagem Básica e Exclusão de Doenças Parasitárias e Sistêmicas',
          detail:
            'Investigação diagnóstica preliminar obrigatória em todo paciente:\n\n' +
            '- Histórico e exame físico minucioso: registro de escores corporais (BCS), musculares (MCS), evolução de peso e cálculo do CIBDAI/CCECAI inicial.\n' +
            '- Exames laboratoriais de base: hemograma completo, perfil bioquímico sérico (com albumina e eletrólitos), urinálise com UPC e parasitológico fecal seriado com pesquisa de Giardia.',
        },
        {
          label: 'Tier 2: Avaliação Funcional Gastrointestinal, Pâncreas e Adrenal',
          detail:
            'Painel laboratorial especializado antes de procedimentos invasivos:\n\n' +
            '- Rastreio de absorção ileal e proximal: dosagem sérica de cobalamina (vitamina B12) e folato sérico.\n' +
            '- Exclusão de causas pancreáticas e hormonais: dosagem de TLI sérico (exclusão de EPI), cPL canina (pancreatite concomitante) e cortisol basal (exclusão de hipoadrenocorticismo atípico se >2 mcg/dL).\n' +
            '- Imagem abdominal: ultrassonografia com avaliação metódica de estratificação parietal, espessura de camadas e estriações mucosas de lacteais.',
        },
        {
          label: 'Tier 3: Ensaios Dietéticos Sequenciais em Pacientes Estáveis',
          detail:
            'Intervenção dietética como teste diagnóstico e terapêutico (CIE-FR):\n\n' +
            '- Primeiro ensaio dietético: introdução de ração hidrolisada ou proteína novel exclusiva por 2 a 4 semanas.\n' +
            '- Falha inicial sem gravidade: transição sucessiva para um segundo e terceiro ensaio dietético com perfis nutricionais distintos (ex: hidrolisada de soja, hidrolisada de penas, altamente digestível ou com fibras).\n' +
            '- Avaliação de resposta: redução >75% no escore CCECAI consolida o diagnóstico de enteropatia dietorresponsiva (CIE-FR).',
        },
        {
          label: 'Tier 4: Endoscopia Digestiva com Biópsias Múltiplas e Histopatologia',
          detail:
            'Amostragem tecidual mucosa em pacientes graves ou não responsivos à dieta:\n\n' +
            '- Vias e segmentos: endoscopia alta e baixa com amostragem sistemática de estômago (~6 fragmentos), duodeno (~10-15 fragmentos), íleo terminal (~3-5 fragmentos) e cólon (~9-12 fragmentos).\n' +
            '- Inspeção macroscópica: documentação de hiperemia, friabilidade, granularidade e vilosidades dilatadas esbranquiçadas (linfangiectasia).\n' +
            '- Avaliação histológica padronizada: classificação histopatológica segundo o consenso WSAVA/ACVIM para tipo celular e distorção arquitetural.',
        },
        {
          label: 'Tier 5: Diagnóstico Molecular Avançado e Exclusão de Neoplasias',
          detail:
            'Diferenciação de processos inflamatórios severos versus linfoma de pequenas células:\n\n' +
            '- Imuno-histoquímica tecidual: marcação fenotípica por CD3 (linfócitos T intraepiteliais e mucosos) e CD20/Pax5 (linfócitos B foliculares).\n' +
            '- Proliferação e clonalidade: índice Ki-67 e teste PARR para clonalidade de TCR-gama e IgH em casos de sobreposição diagnóstica dúbia.\n' +
            '- Cultura de mucosa e FISH: pesquisa obrigatória de E. coli invasiva (AIEC) na suspeita de colite granulomatosa em Boxers ou Bulldogs Franceses.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico Fisiopatológico Escalonado — ACVIM 2026',
      steps: [
        {
          label: 'Fase 1: Intervenção Nutricional Sequencial Obrigatória',
          detail:
            'Terapia primordial instituída antes de qualquer imunossupressão em cães sem PLE:\n\n' +
            '- Dieta inicial: escolha entre dieta hidrolisada (peptídeos de baixo peso molecular) ou proteína inédita baseada em histórico alimentar minucioso.\n' +
            '- Conduta perante não resposta: realizar até três tentativas dietéticas completas (mínimo de 2 semanas cada) com rigor absoluto contra petiscos ou alimentos humanos.\n' +
            '- Fenótipo PLE associado: transição mandatória para dieta com baixo ou ultrabaixo teor de gordura (<2 g de gordura/100 kcal) para reduzir a sobrecarga linfática.',
        },
        {
          label: 'Fase 2: Suplementação de Cobalamina e Correção de Micronutrientes',
          detail:
            'Reposição metabólica em cães com hipocobalaminemia ou níveis limítrofes:\n\n' +
            '- Protocolo oral contemporâneo: cianocobalamina 25 mcg/kg VO a cada 24 horas por 84 dias consecutivos, com reavaliação sérica no término.\n' +
            '- Protocolo parenteral opcional: hidroxocobalamina (0,25 a 1,2 mg SC por cão) ou cianocobalamina (25 mcg/kg SC) semanal por 6 semanas.\n' +
            '- Suporte hidroeletrolítico: correção ativa de hipocalemia, hipomagnesemia e desidratação associadas à diarreia crônica.',
        },
        {
          label: 'Fase 3: Imunomodulação de Primeira Linha para CIE-IR',
          detail:
            'Indicação em pacientes com falha dietética documentada ou doença grave:\n\n' +
            '- Prednisolona oral: 1 a 2 mg/kg VO q24h (ou 20 a 40 mg/m² q24h para cães acima de 25 kg) por 2 a 3 semanas.\n' +
            '- Desmame progressivo: redução gradual de 25% da dose a cada 2 a 4 semanas, monitorando a manutenção da resposta clínica pelo CCECAI.\n' +
            '- Alternativa tópica entérica: budesonida na dose de 3 mg/m² VO q24h (0,5 a 5 mg/cão conforme porte), monitorando sinais de hipoadrenocorticismo iatrogênico na retirada.',
        },
        {
          label: 'Fase 4: Imunossupressão de Segunda Linha e Protocolos de Resgate',
          detail:
            'Instituída perante dependência esteroidal, resposta parcial ou córtico-resistência:\n\n' +
            '- Ciclosporina microemulsionada: 3 a 5 mg/kg VO a cada 12 a 24 horas por pelo menos 6 a 10 semanas como poupador de corticoide ou monoterapia.\n' +
            '- Clorambucil oral: 2 a 4 mg/m² VO q24h associado à prednisolona em casos refratários graves ou fenótipo PLE, com monitoramento hematológico bissemanal.\n' +
            '- Descontinuação da azatioprina: fármaco historicamente popular que perdeu espaço pelo início de ação lento, hepatotoxicidade e mielotoxicidade.',
        },
        {
          label: 'Fase 5: Manejo Específico da Colite Granulomatosa e Reavaliação Refratária',
          detail:
            'Tratamento direcionado em fenótipos atípicos e investigação de falhas:\n\n' +
            '- Protocolo para AIEC: enrofloxacina (5 a 10 mg/kg VO q24h) ou fluoroquinolona guiada por antibiograma por 6 a 8 semanas consecutivas.\n' +
            '- Reabertura diagnóstica na refratariedade (CIE-NR): investigar linfoma intestinal difuso, infecções fúngicas ocultas (histoplasmose/pitiose), insuficiência pancreática e falhas de adesão do tutor.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualCIEeFimDoTermoIBD:
      'Revolução terminológica e conceitual chancelada pelo consenso ACVIM 2026:\n\n' +
      '- Substituição formal do termo IBD: a doença inflamatória intestinal humana (doença de Crohn e retocolite ulcerativa) é imunologicamente distinta da condição canina, tornando impróprio o uso continuado de IBD em medicina veterinária.\n' +
      '- Nova definição consensual: enteropatia inflamatória crônica (CIE) compreende um grupo heterogêneo de distúrbios digestivos caninos com sinais persistentes ou recorrentes e inflamação mucosa, classificados pela resposta clínica a terapias sequenciais.\n' +
      '- Supressão de testes empíricos com antibióticos: o antigo rótulo de enteropatia responsiva a antibióticos (ARE) deixa de ser considerado uma etapa sequencial aceitável no algoritmo padrão.',
    classificacaoModernaPorFenotipoTerapeutico:
      'Estratificação funcional dos pacientes caninos conforme a resposta terapêutica documentada:\n\n' +
      '- CIE responsiva à dieta (CIE-FR): fenótipo mais frequente (38% a 89% dos casos em diversas coortes), apresentando remissão completa exclusivamente com manejo nutricional terapêutico.\n' +
      '- CIE responsiva a imunossupressores (CIE-IR): pacientes que não obtêm resposta satisfatória a ensaios dietéticos múltiplos, exigindo glicocorticoides ou imunomoduladores de segunda linha.\n' +
      '- CIE não responsiva (CIE-NR): pacientes que persistem clinicamente ativos apesar de dietas rigorosas e imunossupressão adequada, demandando reavaliação diagnóstica ampla.',
    fenotipoColiteGranulomatosaAIEC:
      'Fenótipo infeccioso-inflamatório específico do intestino grosso e íleo terminal:\n\n' +
      '- Patógeno associado: Escherichia coli aderente-invasiva (AIEC), capaz de colonizar o epitélio e sobreviver intracelularmente em macrófagos da mucosa colônica.\n' +
      '- Predisposição racial marcante: afeta predominantemente cães jovens das raças Boxer e Bulldog Francês.\n' +
      '- Exceção às diretrizes antimicrobianas: única enteropatia crônica em que a antibioticoterapia direcionada por biópsia e antibiograma é mandatória.',
    fenotipoEnteropatiaPerdedoraDeProteinas:
      'Síndrome clínica e funcional de perda proteica entérica massiva (PLE):\n\n' +
      '- Relação com a CIE: a inflamação mucosa grave com infiltração linfoplasmocítica e a linfangiectasia intestinal secundária são as causas mais comuns de PLE no cão.\n' +
      '- Fisiopatologia de perda: ruptura de lacteais dilatados e aumento da permeabilidade paracelular superando a capacidade de síntese hepática compensatória, gerando hipoalbuminemia e ascite.\n' +
      '- Eixo terapêutico lipídico: necessita de restrição mecânica profunda de gordura na dieta (<2 g de gordura/100 kcal) para reduzir a pressão linfática intraluminal.',
    predisposicoesGeneticasERaciais:
      'Bases hereditárias e perfis genéticos documentados em raças puras:\n\n' +
      '- Pastor Alemão: polimorfismos genéticos em receptores imunes inatos (TLR4 e TLR5) associados a hiper-reatividade contra antígenos bacterianos da microbiota luminal.\n' +
      '- Soft-Coated Wheaten Terrier: afecção genética caracterizada pela manifestação de enteropatia perdedora de proteínas, nefropatia perdedora de proteínas (PLN) ou síndrome mista.\n' +
      '- Outras raças predispostas: Yorkshire Terrier (linfangiectasia e lesões de cripta), Chinese Shar-Pei (enteropatia associada a hipocobalaminemia grave), Norwegian Lundehund e Basenji.',
    tabelaComparativaParadigmas: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Comparação Paradigmática: Abordagem Tradicional versus Consenso ACVIM 2026',
      headers: ['Aspecto Clínico / Diagnóstico', 'Paradigma Tradicional (VIN / Livros Anteriores)', 'Consenso Atualizado ACVIM 2026'],
      rows: [
        ['Nomenclatura principal', 'Inflammatory Bowel Disease (IBD)', 'Chronic Inflammatory Enteropathy (CIE)'],
        ['Critério temporal', 'Sinais gastrointestinais > 3 semanas isoladamente', 'Sinais persistentes/recorrentes associados à inflamação e exclusão metódica'],
        ['Papel dos antibióticos empíricos', 'Teste terapêutico rotineiro com metronidazol ou tilosina', 'Contraindicação formal de uso empírico (risco de disbiose duradoura)'],
        ['Abordagem dietética', 'Tentativa de uma única dieta hipoalergênica', 'Recomendação de até 3 dietas diferentes (hidrolisada, novel, fibras) ≥2 semanas'],
        ['Frequência de resposta dietética', 'Considerada minoria frente ao uso de esteroides', 'Maioria dos pacientes: 38% a 89% dos casos respondem exclusivamente à dieta'],
        ['Biópsia e histopatologia', 'Padrão-ouro absoluto exigido precocemente', 'Referência morfológica integrada à resposta clínica e exclusão metódica'],
        ['Suplementação de cobalamina', 'Reposição quase que exclusivamente parenteral (SC)', 'Reposição oral diária (25 mcg/kg VO q24h por 84 dias) validada por RCTs'],
        ['Budesonida entérica', 'Considerada corticoide local sem efeitos sistêmicos', 'Reconhecimento de supressão do eixo adrenal (HPA) e efeitos sistêmicos reais'],
        ['Transplante fecal (FMT)', 'Promessa de restauração rápida do microbioma', 'Evidência clínica ainda fraca em RCTs; papel estritamente experimental'],
      ],
    },
  },

  epidemiology: {
    distribuicaoEtariaEDemografica:
      'Perfil etário e epidemiológico dos pacientes caninos acometidos:\n\n' +
      '- Faixa etária predominante: cães de meia-idade a idosos (mediana de 5 a 8 anos) compreendem a grande maioria dos casos de CIE-IR e PLE associada.\n' +
      '- Apresentações em cães jovens: pacientes jovens (menos de 2 a 3 anos) manifestam predominantemente o fenótipo responsivo à dieta (CIE-FR) ou colite granulomatosa por AIEC.\n' +
      '- Ausência de predisposição sexual: os ensaios clínicos sistemáticos avaliados pelo ACVIM 2026 não demonstraram predileção estatística consistente por machos ou fêmeas.',
    predisposicoesRaciaisCaninasEstruturadas:
      'Distribuição epidemiológica por raça e fenótipos clínicos associados:\n\n' +
      '- Cães sem raça definida (SRD) e raças puras: a afecção acomete cães de todas as conformações raciais, mas raças puras concentram fenótipos específicos de maior morbidade.\n' +
      '- Pastor Alemão: alta prevalência de CIE com predisposição imunogenética e resposta dietética variável.\n' +
      '- Boxer e Bulldog Francês: raças de risco primordial para colite granulomatosa ulcerativa associada a AIEC invasiva.\n' +
      '- Yorkshire Terrier, Maltês e Rottweiler: forte propensão a linfangiectasia intestinal secundária com desenvolvimento de PLE e ascite.\n' +
      '- Shiba Inu e Chinese Shar-Pei: fenótipos graves caracterizados por hipocobalaminemia refratária e necessidade precoce de imunomodulação.',
    amplitudeDeRespostaDieteticaCIEFR:
      'Proporção de pacientes responsivos à nutrição na literatura contemporânea:\n\n' +
      '- Taxa de remissão dietética: coortes avaliadas no consenso ACVIM 2026 demonstraram que 38% a 89% dos cães com CIE atingem remissão estável apenas com ajuste alimentar.\n' +
      '- Variabilidade da literatura: a ampla variação deve-se a critérios de inclusão distintos entre centros terciários (com maior proporção de CIE-IR) e clínicas de atenção primária.',
    ausenciaDePredisposicaoSexual:
      'Dados demográficos sobre gênero e status reprodutivo:\n\n' +
      '- Equivalência entre sexos: machos e fêmeas são afetados em proporções equivalentes sem influência hormonal direta comprovada na gênese da doença.\n' +
      '- Efeito da castração: não há evidência científica demonstrando que a esterilização cirúrgica atue como fator de risco ou de proteção para a CIE canina.',
  },

  pathogenesisTransmission: {
    barreiraMucosaEJuncoesDeOclusao:
      'Fisiologia da barreira intestinal e mecanismos de quebra de tolerância:\n\n' +
      '- Arquitetura de quatro níveis: o lúmen, a camada de muco superficial, o epitélio enterocítico contínuo e o sistema imune da lâmina própria formam a barreira de contenção.\n' +
      '- Junções de oclusão (tight junctions): complexos proteicos (claudinas, ocludina e ZO-1) regulam rigorosamente o trânsito paracelular de solutos e macromoléculas.\n' +
      '- Quebra da integridade epitelial: citocinas inflamatórias pró-inflamatórias (TNF-alfa e IFN-gama) promovem desestruturação das tight junctions, gerando hiperpermeabilidade e fluxo desregulado de antígenos luminais.',
    desregulacaoImunologicaMucosa:
      'Ativação anômala do sistema imune inato e adaptativo na lâmina própria:\n\n' +
      '- Reconhecimento antigênico deficiente: receptores de reconhecimento de padrões (TLRs e NOD2) reconhecem antígenos comensais inofensivos como alvos imunogênicos.\n' +
      '- Infiltrado inflamatório mucosal: recrutamento de linfócitos T, plasmócitos secretores de imunoglobulinas, macrófagos e eosinófilos que amplificam a lesão tecidual.\n' +
      '- Heterogeneidade molecular: o ACVIM 2026 enfatiza que não existe um único perfil imunológico universal (Th1 vs Th2 vs Th17), variando conforme o fenótipo e a gravidade tecidual.',
    disbioseMicrobianaEAcidosBiliares:
      'Alterações do ecossistema microbiano e do metaboloma luminal intestinal:\n\n' +
      '- Desvio da diversidade bacteriana: redução acentuada de filos comensais benéficos (Clostridia e Bacteroidetes) com expansão relativa de Proteobacteria (Enterobacteriaceae).\n' +
      '- Metabolismo de ácidos biliares: queda na população de Clostridium hiranonis reduz a conversão de ácidos biliares primários em secundários, alterando a sinalização de receptores FXR e TGR5.\n' +
      '- Ciclo bidirecional autoperpetuante: a inflamação tecidual altera o oxigênio e os nutrientes luminais deflagrando a disbiose, a qual, por sua vez, priva os enterócitos de ácidos graxos de cadeia curta (SCFA) e alimenta a inflamação.',
    papelDaDietaNaPatogenese:
      'A alimentação como determinante biológico e mecânico do processo inflamatório:\n\n' +
      '- Estímulo antigênico alimentar: glicoproteínas intactas de alto peso molecular funcionam como imunógenos que deflagram reações inflamatórias na mucosa hiperpermeável.\n' +
      '- Carga osmótica e fermentação: ingredientes de baixa digestibilidade alcançam o cólon intactos, provocando fermentação bacteriana excessiva e diarreia osmótica.\n' +
      '- Gordura de cadeia longa e linfa: a ingestão lipídica estimula a formação de quilomícrons e eleva a pressão intralacteal, promovendo extravasamento proteico e lipogranulomas em cães com ectasia linfática.',
  },

  pathophysiology: {
    mecanismosDaDiarreiaMalabsortivaExsudativa:
      'Fisiopatologia multifatorial da perda hídrica e eletrolítica entérica:\n\n' +
      '- Má absorção osmótica: atrofia vilositária e perda de enzimas de borda em escova reduzem a superfície de absorção, retendo solutos no lúmen e atraindo água passivamente.\n' +
      '- Exsudação mucosal: inflamação erosiva e aumento da permeabilidade paracelular geram extravasamento contínuo de fluidos teciduais, muco e proteínas plasmáticas.\n' +
      '- Secreção ativa de eletrólitos: produtos microbianos e mediadores inflamatórios estimulam a secreção de cloreto e água através dos canais CFTR nas criptas.\n' +
      '- Dismotilidade reflexa: alteração do sistema nervoso entérico provocando trânsito acelerado (que impede a absorção adequada) ou estase segmentar (que favorece supercrescimento bacteriano).',
    fisiopatologiaDoVomitoProximal:
      'Mecanismos reflexos e humorais do vômito na enteropatia proximal:\n\n' +
      '- Estimulação vagal visceral: a inflamação da mucosa duodenal e jejunal proximal ativa mecanorreceptores e quimiorreceptores aferentes que projetam estímulos ao centro do vômito.\n' +
      '- Gastroparesia e refluxo duodenogástrico: dismotilidade gastroduodenal com retardo do esvaziamento gástrico, provocando náusea crônica, ptialismo e vômitos biliares matinais.',
    consequenciasDaLinfangiectasiaESobrecargaLipidica:
      'Disfunção do sistema linfático entérico e síndrome de perda proteica:\n\n' +
      '- Dilatação e ruptura de lacteais: obstrução inflamatória transmural eleva a pressão nos capilares linfáticos centrais dos vilos, culminando em extravasamento mecânico de linfa rica em albumina.\n' +
      '- Pan-hipoproteinemia e ascite: queda profunda da albumina plasmática (<1,5 g/dL) reduz a pressão coloidosmótica, promovendo transudação cavitária para o peritônio e pleura.\n' +
      '- Hipocolesterolemia e perda celular: espoliação de quilomícrons, colesterol e linfócitos T para as fezes, gerando linfopenia periférica e emaciação.',
    metabolismoDaCobalaminaEAbsorcaoIleal:
      'Comprometimento da via de captação ileal da cobalamina (vitamina B12):\n\n' +
      '- Fisiologia do receptor CUBAM: a cobalamina ligada ao fator intrínseco pancreático depende de enterócitos ileais saudáveis para endocitose mediada pelo complexo cubilina-amnionless.\n' +
      '- Consequências clínicas da deficiência: atrofia enterocítica secundária, bloqueio metabólico intracelular com elevação do ácido metilmalônico e piora expressiva do prognóstico.',
    disturbiosEletroliticosEAcidoBase:
      'Repercussões hidroeletrolíticas decorrentes das perdas digestivas prolongadas:\n\n' +
      '- Hipocalemia por perda fecal e renal: espoliação entérica contínua somada à ativação secundária da aldosterona pela hipovolemia, provocando fraqueza e íleo paralítico.\n' +
      '- Distúrbios ácido-base fenotípicos: acidose metabólica hiperclorêmica em cães com diarreia profusa (perda de bicarbonato) ou alcalose metabólica hipoclorêmica em vômitos gástricos frequentes (perda de HCl).\n' +
      '- Distúrbios minerais na PLE: hipocalcemia total pela queda da albumina carreadora e hipocalcemia ionizada verdadeira decorrente de má absorção de vitamina D e hipomagnesemia inibitória de PTH.',
    tabelaMecanismosDiarreiaCIE: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Fisiopatologia e Mecanismos da Diarreia nas Enteropatias Crônicas',
      headers: ['Mecanismo Fisiopatológico', 'Origem Celular / Molecular', 'Manifestação Clínica Típica', 'Achado Laboratorial / Resposta'],
      rows: [
        ['Má absorção osmótica', 'Atrofia vilositária e perda de enzimas de borda em escova', 'Fezes volumosas, aquosas a pastosas, que pioram após ingestão', 'Cessa ou atenua com o jejum; fezes com restos não digeridos'],
        ['Exsudação mucosal', 'Aumento de permeabilidade por TNF-alfa e perda de tight junctions', 'Fezes com muco, proteínas e exsudato plasmático contínuo', 'Hipoalbuminemia progressiva; presença de α1-PI nas fezes'],
        ['Secreção ativa de água e cloro', 'Estimulação bacteriana/inflamatória dos canais de cloro em criptas', 'Diarreia aquosa profusa e contínua independente da alimentação', 'Não cessa com jejum; desidratação e perda rápida de potássio'],
        ['Dismotilidade entérica', 'Inflamação neuromuscular da parede e do plexo mioentérico', 'Alternância entre diarreia rápida e borborigmos com cólica', 'Resposta a pró-cinéticos e controle da inflamação mucosa'],
        ['Extravasamento linfático', 'Ruptura mecânica de lacteais dilatados por sobrecarga lipídica', 'Fezes esteatorreicas, líquido cavitário (ascite) e emaciação', 'Pan-hipoproteinemia, hipocolesterolemia e hipocalcemia ionizada'],
      ],
    },
  },

  clinicalSignsPathophysiology: {
    sinaisIntestinoDelgadoVsGrosso:
      'Semiologia clínica diferencial baseada na localização anatômica predominante:\n\n' +
      '- Padrão de intestino delgado: diarreia de grande volume com frequência normal ou discretamente aumentada, ausência de urgência intensa, flatulência acentuada, vômitos e perda de peso progressiva.\n' +
      '- Padrão de intestino grosso (colite crônica): aumento expressivo da frequência defecatória com fezes de pequeno volume, presença de muco abundante, hematoquezia (sangue vivo), tenesmo e disquezia marcantes.\n' +
      '- Apresentação mista (enterocolite): coexistência de perda ponderal e vômitos com episódios de urgência fecal e muco, comum em processos inflamatórios difusos.',
    sinaisSistemicosECatabolicos:
      'Repercussões metabólicas e consumo de massas orgânicas na doença crônica:\n\n' +
      '- Desnutrição calórico-proteica: perda de peso insidiosa ou acelerada, queda acentuada do escore de massa muscular (sarcopenia epaxial e temporal) e pelagem opaca/quebradiça.\n' +
      '- Apetite paradoxal: variação entre polifagia compensatória inicial (tentativa de suprir a má absorção) e hiporexia/anorexia profunda nas fases inflamatórias descompensadas.\n' +
      '- Fraqueza muscular e letargia: fadiga aos passeios decorrente de balanço nitrogenado negativo, anemia de doença crônica e hipocalemia.',
    graduacaoClinicaCIBDAIeCCECAI:
      'Índices objetivos de atividade clínica recomendados pelo consenso ACVIM 2026:\n\n' +
      '- Canine IBD Activity Index (CIBDAI): gradua 6 parâmetros clínicos (atitude, vômito, consistência fecal, frequência fecal, perda de peso e apetite) de 0 a 3, totalizando 0 a 18 pontos.\n' +
      '- Canine Chronic Enteropathy Clinical Activity Index (CCECAI): amplia o CIBDAI adicionando escore de ascite/edema periférico (0 a 3), hipoalbuminemia sérica (0 a 3) e prurido cutâneo (0 a 3), atingindo até 27 pontos.\n' +
      '- Critérios objetivos de resposta terapêutica: redução <25% no escore indica ausência de resposta; redução de 25% a 75% indica resposta parcial; redução >75% estabelece remissão clínica completa.',
    achadosSemiologicosAoExameFisico:
      'Avaliação física sistemática à beira do leito em cães com suspeita de CIE:\n\n' +
      '- Parâmetros gerais e mucosas: avaliação de hidratação, tempo de preenchimento capilar, palidez de mucosas e presença de caquexia ou atrofia muscular temporal.\n' +
      '- Palpação abdominal minuciosa: detecção de alças intestinais espessadas, dor abdominal difusa à palpação profunda, borborigmos audíveis e linfadenomegalia mesentérica palpável.\n' +
      '- Pesquisa ativa de terceiro espaço: detecção de onda de choque peritoneal (ascite) e edema compressível com sinal de cacifo em membros pélvicos, prepúcio e barbela nos casos com PLE associada.',
  },

  diagnosis: {
    raciocinioDiagnosticoSequencialPorTiers:
      'Abordagem metódica estruturada por níveis recomendada pelo consenso ACVIM 2026:\n\n' +
      '- Tier 1 (Exclusão básica): confirmação da cronicidade dos sinais (>3 semanas) e eliminação de parasitoses, infecções primárias e disfunções renais ou hepáticas.\n' +
      '- Tier 2 (Avaliação funcional): quantificação de cobalamina, folato, TLI, cPL, cortisol sérico basal e ultrassonografia abdominal para afastar diagnósticos diferenciais mimics.\n' +
      '- Tier 3 (Ensaios dietéticos sequenciais): instituição de até 3 dietas terapêuticas exclusivas antes de indicar procedimentos invasivos em cães estáveis.\n' +
      '- Tier 4 (Investigação tecidual): endoscopia digestiva com biópsias múltiplas de duodeno e íleo quando houver sinais de alarme ou falha dietética documentada.\n' +
      '- Tier 5 (Patologia molecular): imuno-histoquímica (CD3/CD20), Ki-67 e PARR para distinção entre enterite linfoplasmocítica severa e linfoma intestinal de pequenas células.',
    tabelaDiagnosticoDiferencialCIE: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diagnóstico Diferencial Metódico das Enteropatias Crônicas em Cães',
      headers: ['Diagnóstico Diferencial', 'Mecanismo Fisiopatológico', 'Sinais Distintivos Principais', 'Exame Diagnóstico Confirmatório'],
      rows: [
        ['Enteropatia Responsiva à Dieta (CIE-FR)', 'Hipersensibilidade ou intolerância alimentar', 'Cão jovem a meia-idade, estável, sem hipoalbuminemia grave', 'Remissão clínica completa (>75% queda CCECAI) com dieta terapêutica'],
        ['Insuficiência Pancreática Exócrina (EPI)', 'Perda de tecido acinar pancreático e enzimas digestivas', 'Polifagia extrema, perda acentuada de peso, fezes volumosas acinzentadas', 'Dosagem de TLI sérico canino < 2,5 mcg/L'],
        ['Hipoadrenocorticismo Atípico (Addison)', 'Deficiência isolada de glicocorticoides sem desbalanço mineral', 'Vômitos, hiporexia oscilante, letargia, ausência de leucograma de estresse', 'Cortisol basal < 2 mcg/dL confirmado por Teste de Estimulação com ACTH'],
        ['Linfoma Alimentar de Pequenas Células', 'Neoplasia linfocítica infiltrativa transmural ou mucosa', 'Cão idoso, espessamento de muscularis ao US, perda de peso contínua', 'Histopatologia com amostragem ileal, imuno-histoquímica e PARR'],
        ['Enteropatia Perdedora de Proteínas (PLE)', 'Dilatação/ruptura linfática e hiperpermeabilidade grave', 'Ascite volumosa, edema periférico, pan-hipoproteinemia, estriações no US', 'Hipoalbuminemia <2 g/dL, exclusão de PLN (UPC normal) e função hepática íntegra'],
        ['Colite Granulomatosa por AIEC', 'Infecção intracelular por E. coli aderente-invasiva', 'Tenesmo severo, sangue vivo nas fezes, perda ponderal em Boxer/Bulldog', 'Biópsia colônica com macrófagos PAS-positivos e cultura de mucosa com antibiograma'],
        ['Parasitismo Crônico (Giardia / Ancylostoma)', 'Infestação parasitária entérica com espoliação mucosa', 'Fezes pastosas intermitentes, flatulência, potencial anemia ferropriva', 'Parasitológico fecal seriado por centrifugação em sulfato de zinco e coproantígenos'],
        ['Pancreatite Crônica Concomitante', 'Inflamação pancreática persistente com dor e náusea', 'Vômitos pós-prandiais, desconforto cranial, hiporexia oscilante', 'Dosagem de cPL canina quantitativa e ultrassonografia de parênquima pancreático'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Hemograma Completo, Perfil Bioquímico Sérico e Eletrólitos',
        description:
          'Triagem laboratorial abrangente para avaliação da gravidade inflamatória e sistêmica:\n\n' +
          '- Hemograma: pesquisa de anemia de inflamação crônica (normocítica normocrômica não regenerativa em 12-19%), microcitose por perda crônica de ferro, trombocitose reativa e relação neutrófilo-linfócito.\n' +
          '- Bioquímica: quantificação de albumina sérica (fator prognóstico crítico), globulinas totais, colesterol (hipocolesterolemia na perda linfática), enzimas hepáticas e ureia/creatinina.\n' +
          '- Eletrólitos: dosagem de potássio, sódio, cloro, cálcio total e ionizado (iCa) e magnésio sérico.',
        purpose: 'Avaliar repercussões sistêmicas, identificar hipoalbuminemia e afastar causas extraintestinais.',
        interpretation: 'Hipoalbuminemia <2 g/dL sugere fenótipo PLE; hipocalemia e hipomagnesemia exigem reposição imediata.',
        limitations: 'O hemograma e a bioquímica podem apresentar-se inteiramente normais em cães com CIE leve a moderada.',
        isGoldStandard: false,
      },
      {
        stepNumber: 2,
        title: 'Urinálise Completa com Relação Proteína:Creatinina Urinária (UPC)',
        description:
          'Avaliação renal mandatória na presença de hipoalbuminemia:\n\n' +
          '- Análise físico-química e de sedimento: colheita por cistocentese para afastar inflamação ou hematúria ativa.\n' +
          '- Quantificação por UPC: cálculo da relação proteína:creatinina urinária em amostra centrifugada.',
        purpose: 'Excluir formalmente nefropatia perdedora de proteínas (PLN) antes de atribuir a hipoalbuminemia exclusivamente ao trato gastrointestinal.',
        interpretation: 'UPC <0,5 em cães afasta perda glomerular relevante; valores >0,5 exigem investigação de PLN associada (especialmente no Soft-Coated Wheaten Terrier).',
        limitations: 'Sedimento urinário ativo (piúria ou bacteriúria) invalida a interpretação do UPC.',
        isGoldStandard: false,
      },
      {
        stepNumber: 3,
        title: 'Parasitológico Fecal Seriado e Coproantígenos de Giardia',
        description:
          'Rastreio metódico de patógenos entéricos e protozoários:\n\n' +
          '- Exame coproparasitológico: análise seriada de três amostras fecais por técnicas de flutuação em sulfato de zinco e sedimentação.\n' +
          '- Testes imunológicos: pesquisa de coproantígenos por ELISA para Giardia lamblia e Cryptosporidium.',
        purpose: 'Eliminar parasitoses subclínicas como causa primária ou gatilho da inflamação entérica.',
        interpretation: 'Presença de cistos ou antígenos de Giardia exige tratamento direcionado; todavia, cães saudáveis podem albergar antígenos sem nexo causal direto.',
        limitations: 'Eliminação intermitente de cistos parasitários requer múltiplas coletas.',
        isGoldStandard: false,
      },
      {
        stepNumber: 4,
        title: 'Dosagem de Cobalamina (B12), Folato, TLI, cPL e Cortisol Basal',
        description:
          'Painel funcional de exclusão endocrinológica, pancreática e de absorção ileal:\n\n' +
          '- Cobalamina sérica: avaliação da função ileal (hipocobalaminemia ocorre em 19% a 61% dos casos de CIE e constitui fator prognóstico negativo).\n' +
          '- Folato sérico: marcador de mucosa duodenal e jejunal proximal.\n' +
          '- TLI sérico canino: exclusão inequívoca de insuficiência pancreática exócrina (EPI).\n' +
          '- Cortisol sérico basal: triagem de hipoadrenocorticismo atípico (valores >2,0 mcg/dL excluem Addison com 99% de sensibilidade).',
        purpose: 'Identificar carências de vitaminas entéricas e afastar comorbidades pancreáticas e hormonais mimicantes.',
        interpretation: 'Cobalamina baixa exige reposição imediata; TLI normal afasta EPI; cortisol basal <2,0 mcg/dL exige teste de estimulação com ACTH.',
        limitations: 'Níveis de folato são instáveis e podem ser falseados por disbiose ou hemólise na amostra.',
        isGoldStandard: false,
      },
      {
        stepNumber: 5,
        title: 'Ultrassonografia Abdominal Especializada de Alta Resolução',
        description:
          'Varredura imaginológica detalhada de todo o tubo digestivo e linfonodos regionais:\n\n' +
          '- Avaliação parietal: mensuração da espessura de camadas (duodeno, jejuno, íleo e cólon) e integridade da estratificação mucosa-muscular.\n' +
          '- Marcadores de linfangiectasia: detecção de estriações hiperecogênicas na camada mucosa (sensibilidade de ~75% e especificidade de ~96% para linfangiectasia intestinal associada a PLE).\n' +
          '- Rastreio de linfonodos e cavidades: linfadenomegalia mesentérica e pesquisa de líquido livre peritoneal (ascite).',
        purpose: 'Detectar afecções cirúrgicas focais, corpos estranhos, intussuscepções, neoplasias obstrutivas e evidências de linfangiectasia.',
        interpretation: 'Espessamento difuso é comum na CIE, mas não prediz o grau histológico; estriações lineares brilhantes suportam forte componente linfático.',
        limitations: 'O exame ultrassonográfico pode ser inteiramente normal em cães com inflamação mucosal comprovada.',
        isGoldStandard: false,
      },
      {
        stepNumber: 6,
        title: 'Ensaios Dietéticos Sequenciais Controlados (Tier 3)',
        description:
          'Intervenção nutricional diagnóstica protocolada em cães clinicamente estáveis:\n\n' +
          '- Protocolo de execução: fornecimento de dieta comercial hidrolisada ou proteína novel com rigor absoluto por pelo menos 2 a 4 semanas.\n' +
          '- Tentativas sucessivas: em casos estáveis sem resposta inicial, transicionar para uma segunda e terceira formulação dietética (ex: hidrolisada de soja vs penas vs altamente digestível).\n' +
          '- Acompanhamento objetivo: aplicação seriada do escore CCECAI aos 14 e 28 dias.',
        purpose: 'Confirmar ou descartar o fenótipo CIE-FR (responsivo à dieta), evitando imunossupressão ou biópsias desnecessárias.',
        interpretation: 'Queda >75% no escore CCECAI fecha o diagnóstico funcional de CIE-FR e estabelece o tratamento de manutenção.',
        limitations: 'Qualquer petisco, medicação palatável ou contaminação alimentar quebra o teste e produz falsos negativos.',
        isGoldStandard: false,
      },
      {
        stepNumber: 7,
        title: 'Endoscopia Digestiva Alta e Baixa com Amostragem Duodenal e Ileal',
        description:
          'Inspeção videoendoscópica de mucosas com pinçamento de biópsias múltiplas:\n\n' +
          '- Critérios de indicação: falha comprovada de ≥3 dietas terapêuticas, hipoalbuminemia/PLE, perda de peso severa (>5%), CCECAI alto ou suspeita neoplásica.\n' +
          '- Protocolo de amostragem recomendado: obtenção sistemática de ~6 fragmentos no estômago, ~10 a 15 no duodeno, ~3 a 5 no íleo terminal e ~9 a 12 no cólon.\n' +
          '- Avaliação macroscópica: documentação de hiperemia, friabilidade, aspecto em casca de laranja e vilosidades dilatadas esbranquiçadas.',
        purpose: 'Obter amostras representativas da mucosa para caracterização histológica da inflamação e arquitetura vilositária.',
        interpretation: 'Amostragem isolada de duodeno pode falhar em até 30% dos pacientes com lesões predominantemente ileais.',
        limitations: 'Avalia apenas as camadas mucosa e superficial da submucosa; não atinge lesões musculares profundas ou jejunais distantes.',
        isGoldStandard: false,
      },
      {
        stepNumber: 8,
        title: 'Histopatologia Integrada, Imuno-histoquímica e Teste PARR',
        description:
          'Painel anatomopatológico e molecular completo segundo diretrizes WSAVA/ACVIM:\n\n' +
          '- Coloração H&E: quantificação de infiltrado linfoplasmocítico, eosinofílico ou neutrofílico, fusão vilositária e abscessos de criptas.\n' +
          '- Imuno-histoquímica (CD3 e CD20): fenotipagem de populações celulares T e B na lâmina própria e epitélio.\n' +
          '- Biologia molecular PARR: ensaio de reação em cadeia da polimerase para rearranjos clonais de receptores de antígenos (TCR-gama e IgH).',
        purpose: 'Diferenciação categórica entre enterite linfoplasmocítica grave (CIE-IR) e linfoma alimentar de pequenas células (LGITL).',
        interpretation: 'Infiltrado inflamatório com clonalidade no PARR deve ser interpretado com cautela, pois processos inflamatórios graves podem exibir pseudoclonalidade.',
        limitations: 'A histologia não deve ser avaliada isoladamente sem correlação estreita com a resposta terapêutica clínica.',
        isGoldStandard: true,
      },
    ],
  },

  treatment: {
    dietaComoIntervencaoDiagnosticaETerapeutica:
      'A revolução paradigmática da nutrição como terapia de primeira linha (ACVIM 2026):\n\n' +
      '- Mudança de status: a dieta deixa de ser vista como medida de suporte e assume protagonismo central como ferramenta diagnóstica e terapêutica prioritária.\n' +
      '- Taxa expressiva de sucesso: estudos seminais demonstram que a vasta maioria dos cães com CIE (38% a 89%) atinge remissão clínica sustentada unicamente com intervenção alimentar.\n' +
      '- Ausência de efeitos deletérios: previne o catabolismo muscular, a osteopenia e os distúrbios metabólicos iatrogênicos associados à corticoterapia precoce desnecessária.',
    protocoloDosTresEnsaiosDieteticos:
      'Recomendação consensual forte para manejo nutricional sequencial estruturado:\n\n' +
      '- Diretriz formal do ACVIM 2026: em cães clinicamente estáveis, recomenda-se realizar até três ensaios dietéticos diferentes antes de categorizar o paciente como córtico-dependente ou resistente.\n' +
      '- Duração mínima: cada dieta terapêutica deve ser fornecida exclusivamente por pelo menos 2 a 4 semanas consecutivas.\n' +
      '- Variedade de perfis dietéticos: transição racional entre ração hidrolisada (peptídeos purificados), formulação de proteína novel/inédita baseada em histórico rígido, e dietas altamente digestíveis com perfil específico de fibras.',
    abandonoFormalDeAntibioticosEmpiricos:
      'Diretriz categórica contra o uso de antimicrobianos no algoritmo de rotina:\n\n' +
      '- Veto consensual do ACVIM 2026: recomendação forte CONTRA o uso empírico de metronidazol, tilosina ou oxitetraciclina em cães com suspeita de enteropatia crônica.\n' +
      '- Falácia da melhora transitória: respostas clínicas temporárias a antibióticos decorrem de modulação imunológica e redução de biomassa, não provando a existência de infecção bacteriana primária.\n' +
      '- Consequências deletérias graves: antibióticos promovem colapso da diversidade do microbioma (disbiose iatrogênica), depleção de bactérias produtoras de SCFA e seleção alarmante de cepas resistentes.',
    manejoExcepcionalDaColiteGranulomatosa:
      'Abordagem terapêutica específica e orientada por biologia molecular:\n\n' +
      '- Diagnóstico microbiológico obrigatório: a colite granulomatosa por AIEC em Boxers e Bulldogs Franceses não deve receber antibióticos empíricos sem biópsia colônica e cultura de mucosa com antibiograma.\n' +
      '- Esquema farmacológico direcionado: enrofloxacina na dose de 5 a 10 mg/kg VO q24h por 6 a 8 semanas consecutivas, selecionada exclusivamente se comprovada sensibilidade in vitro.\n' +
      '- Alerta de resistência: o surgimento de cepas de AIEC multirresistentes a fluoroquinolonas exige stewardship rigoroso.',
    suplementacaoContemporaneaDeCobalaminaOral:
      'Quebra de paradigma na rota de administração de cobalamina (B12):\n\n' +
      '- Validação em ensaios randomizados (Dor et al., 2024 / ACVIM 2026): a via oral diária normaliza a cobalamina sérica e reduz o ácido metilmalônico celular tão eficazmente quanto as injeções parenterais semanais.\n' +
      '- Protocolo oral padrão: cianocobalamina na dose de 25 mcg/kg VO a cada 24 horas por 84 dias consecutivos (12 semanas).\n' +
      '- Mecanismo da via oral: mesmo com atrofia mucosal e perda de receptores ileais CUBAM, cerca de 1% a 2% de doses massivas de cobalamina livre são absorvidos passivamente ao longo de todo o intestino por difusão simples.',
    terapiaImunomoduladoraRacionalPrednisolona:
      'Glicocorticoides de primeira linha para o fenótipo CIE-IR documentado:\n\n' +
      '- Critérios de introdução: reservada para cães com falha comprovada de ensaios dietéticos, CCECAI alto com risco iminente de descompensação ou inflamação mucosal grave confirmada por biópsia.\n' +
      '- Esquema de indução: prednisolona 1 a 2 mg/kg VO q24h (ou 20 a 40 mg/m² q24h para cães >25 kg) por 2 a 3 semanas.\n' +
      '- Protocolo de desmame gradual: redução decrescente de aproximadamente 25% da dose a cada 2 a 4 semanas, monitorando o CCECAI para estabelecer a menor dose de manutenção em dias alternados.',
    farmacologiaDaBudesonidaESupressaoHPA:
      'Análise crítica do corticoide de ação tópica entérica:\n\n' +
      '- Posologia recomendada: 3 mg/m² VO q24h (ou 0,5 a 1 mg SID em 3-7 kg; 1 a 2 mg em 7-15 kg; 2 a 3 mg em 15-30 kg; 3 a 5 mg em >30 kg) por 3 a 4 semanas, seguida de redução gradual.\n' +
      '- Alerta farmacológico máximo (Plumb 10ª ed.): a budesonida sofre intenso metabolismo hepático de primeira passagem, mas NÃO É ISENTA de efeitos sistêmicos; estudos comprovam supressão real do eixo hipotálamo-hipófise-adrenal (HPA).\n' +
      '- Ausência de superioridade em efeitos adversos: ensaios randomizados comparando budesonida com prednisona não demonstraram redução significativa na incidência de efeitos colaterais clínicos.',
    imunossupressoresDeSegundaLinhaCiclosporinaClorambucil:
      'Manejo de resgate perante falha esteroidal, córtico-dependência ou PLE associada:\n\n' +
      '- Ciclosporina microemulsionada: 3 a 5 mg/kg VO a cada 12 a 24 horas por no mínimo 6 a 10 semanas; inibe a calcineurina e a transcrição de IL-2 por linfócitos T, servindo como poupador de corticoide.\n' +
      '- Clorambucil oral: agente alquilante na dose de 2 a 4 mg/m² VO q24h associado à prednisolona; opção de resgate prioritária em enteropatias graves e PLE refratária, exigindo hemograma seriado quinzenal por risco de mielossupressão.\n' +
      '- Desuso da azatioprina: abandonada progressivamente pelo início de ação demorado (4 a 6 semanas), ausência de benefício superior em ensaios controlados e riscos elevados de hepatotoxicidade e aplasia medular.',
    avaliacaoCriticaDeProbioticosEFMT:
      'Posicionamento atual sobre manipulação da microbiota entérica (ACVIM 2026):\n\n' +
      '- Papel limitado dos probióticos: prebióticos, probióticos e simbióticos possuem evidência clínica modesta e produto-específica (ex: formulação de De Simone), não substituindo a dieta ou a imunomodulação.\n' +
      '- Transplante de microbiota fecal (FMT): ensaios clínicos recentes duplo-cegos randomizados (Hanifeh et al., 2026) demonstraram benefício clínico e microbiológico limitado e transitório em cães com enteropatia crônica, mantendo-se como modalidade experimental.',
    tabelaResumoFarmacosECIE: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Protocolos Farmacológicos e Nutricionais na CIE Canina (Consenso ACVIM 2026)',
      headers: ['Modalidade / Fármaco', 'Indicação Primária na CIE', 'Dose e Esquema Posológico', 'Alertas Toxicológicos e Cuidados'],
      rows: [
        ['Dieta Hidrolisada / Novel', 'Primeira linha em todos os cães estáveis (CIE-FR)', 'Alimento terapêutico exclusivo por ≥2 a 4 semanas', 'Rigor absoluto: proibir petiscos, medicamentos palatáveis e restos'],
        ['Dieta Low-Fat (<2g/100 kcal)', 'Terapia primordial no fenótipo PLE / linfangiectasia', 'Teor de gordura <2 g/100 kcal na matéria seca', 'Reduz fluxo e pressão linfática; formulação caseira exige nutrólogo'],
        ['Cianocobalamina Oral', 'Hipocobalaminemia secundária a má absorção ileal', '25 mcg/kg VO a cada 24 horas por 84 dias', 'Eficácia idêntica à via parenteral comprovada em ensaios clínicos'],
        ['Prednisolona', 'Imunossupressão de primeira linha em CIE-IR documentada', '1 a 2 mg/kg VO q24h (20 a 40 mg/m² se >25 kg)', 'Agrava sarcopenia; desmame decrescente de 25% a cada 2-4 semanas'],
        ['Budesonida', 'Alternativa em cães com intolerância a glicocorticoides sistêmicos', '3 mg/m² VO q24h (0,5 a 5 mg/cão conforme peso)', 'Suprime o eixo HPA; não assumir ausência de efeitos sistêmicos'],
        ['Ciclosporina (microemulsão)', 'Segunda linha em córtico-dependência ou falha inicial', '3 a 5 mg/kg VO a cada 12 a 24 horas (mínimo 6-10 sem)', 'Monitorar náusea e anorexia inicial; formulações não são bioequivalentes'],
        ['Clorambucil', 'Terapia de resgate associada a corticoide em PLE refratária', '2 a 4 mg/m² VO a cada 24 horas', 'Mielossupressão dose-dependente; exige hemograma completo bissemanal'],
        ['Enrofloxacina', 'Exclusivo para Colite Granulomatosa por AIEC em Boxer/Bulldog', '5 a 10 mg/kg VO q24h por 6 a 8 semanas', 'Uso apenas se comprovada sensibilidade em cultura e antibiograma de mucosa'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Cianocobalamina (Vitamina B12)',
        indication: 'Tratamento de hipocobalaminemia decorrente de má absorção ileal na CIE.',
        dose: '25 mcg/kg VO a cada 24 horas por 84 dias consecutivos (protocolo consensual ACVIM 2026).',
        frequency: 'q24h',
        duration: '84 dias contínuos, com reavaliação laboratorial sérica posterior.',
        mechanism: 'Cofator celular da metionina sintase e metilmalonil-CoA mutase, permitindo regeneração da mucosa entérica e normalização do ácido metilmalônico.',
        notes: 'Ensaio clínico randomizado de Dor et al. (2024) comprovou equivalência clínica e metabólica absoluta em relação à via parenteral.',
      },
      {
        drug: 'Prednisolona',
        indication: 'Imunomodulação de primeira linha para cães com fenótipo CIE-IR ou gravidade elevada.',
        dose: '1 a 2 mg/kg VO a cada 24 horas (ou 20 a 40 mg/m² q24h para cães acima de 25 kg).',
        frequency: 'q24h',
        duration: 'Indução por 2 a 3 semanas; desmame gradual de 25% da dose a cada 2 a 4 semanas até a menor dose efetiva em dias alternados.',
        mechanism: 'Supressão da transcrição de citocinas inflamatórias nucleares (NF-kB), inibindo migração celular, edema e hiperpermeabilidade mucosa.',
        cautions: 'Potencializa catabolismo proteico em pacientes sarcopênicos; absorção entérica comprovadamente preservada na enteropatia.',
        contraindications: 'Doenças infecciosas fúngicas/bacterianas sistêmicas ativas ou ulceração gastrointestinal sem tratamento de barreira.',
      },
      {
        drug: 'Budesonida',
        indication: 'Glicocorticoide alternativo para cães que manifestam efeitos adversos intoleráveis à prednisolona.',
        dose: '3 mg/m² VO a cada 24 horas (cães de 3-7 kg: 0,5 a 1 mg; 7-15 kg: 1 a 2 mg; 15-30 kg: 2 a 3 mg; >30 kg: 3 a 5 mg SID).',
        frequency: 'q24h',
        duration: 'Tratamento inicial de 3 a 4 semanas, seguido de redução progressiva.',
        mechanism: 'Glicocorticoide sintético de alta afinidade receptor com extenso metabolismo de primeira passagem hepática (~90%).',
        cautions: 'Não é isenta de toxicidade; induz supressão demonstrada do eixo hipotálamo-hipófise-adrenal (HPA), exigindo desmame cauteloso.',
      },
      {
        drug: 'Ciclosporina (microemulsionada)',
        indication: 'Imunossupressor de segunda linha poupador de corticoide em CIE-IR refratária.',
        dose: '3 a 5 mg/kg VO a cada 12 a 24 horas (formulação microemulsionada/modificada).',
        frequency: 'q12h ou q24h',
        duration: 'No mínimo 6 a 10 semanas para avaliação adequada da resposta biológica.',
        mechanism: 'Inibição da calcineurina celular, bloqueando a desfosforilação do fator nuclear NFAT e suprimindo a transcrição de IL-2 e expansão de linfócitos T.',
        cautions: 'Monitorar vômitos e anorexia iniciais transitórios; utilizar exclusivamente formulações microemulsionadas de alta biodisponibilidade.',
      },
      {
        drug: 'Clorambucil',
        indication: 'Terapia de resgate associada a corticoide em enteropatias graves e fenótipo PLE refratário.',
        dose: '2 a 4 mg/m² VO a cada 24 horas (ou esquemas em dias alternados conforme tolerância).',
        frequency: 'q24h',
        duration: 'Tratamento contínuo sob estrita vigilância hematológica até remissão clínica estável.',
        mechanism: 'Agente alquilante nitrogenado que promove ligações cruzadas no DNA, ativando apoptose de clones linfocíticos hiper-reativos.',
        cautions: 'Exige monitoramento hematológico bissemanal por risco de mielossupressão (neutropenia e trombocitopenia cumulativa).',
      },
      {
        drug: 'Enrofloxacina',
        indication: 'Terapia antimicrobiana exclusiva para Colite Granulomatosa invasiva por AIEC em Boxers e Bulldogs Franceses.',
        dose: '5 a 10 mg/kg VO a cada 24 horas.',
        frequency: 'q24h',
        duration: 'Tratamento prolongado de 6 a 8 semanas consecutivas para erradicação de bactérias intramacrofágicas.',
        mechanism: 'Inibição da DNA girase e topoisomerase IV bacteriana com excelente penetração intracelular em macrófagos mucosos.',
        cautions: 'Uso formalmente condicionado à comprovação de susceptibilidade em cultura e antibiograma de mucosa colônica por biópsia.',
        contraindications: 'Uso empírico em cães sem diagnóstico histológico e microbiológico prévio de colite por AIEC.',
      },
    ],
  },

  complications: {
    sarcopeniaPerdaMuscularEFragilidade:
      'Consumo catabólico acelerado e fragilidade orgânica na enteropatia crônica:\n\n' +
      '- Balanço nitrogenado negativo: má digestão e perda luminal contínua de aminoácidos forçam a quebra de proteínas musculares esqueléticas.\n' +
      '- Agravamento iatrogênico por esteroides: glicocorticoides amplificam a proteólise muscular, resultando em sarcopenia severa, fraqueza e pior prognóstico longitudinal.\n' +
      '- Monitoramento sistemático do MCS: avaliação regular do escore de massa muscular em fossa temporal, escápula e epaxiais em toda consulta de acompanhamento.',
    riscoTromboembolicoNoFenotipoPLE:
      'Complicação vascular oclusiva de altíssima letalidade em cães com perda proteica:\n\n' +
      '- Hipercoagulabilidade multifatorial: perda entérica de antitrombina (AT), ativação plaquetária inflamatória, hiperfibrinogenemia e estase vascular.\n' +
      '- Tromboembolismo pulmonar e aórtico: estudos do consenso indicam que 63% a 100% dos cães com PLE exibem perfil pró-trombótico laboratorial, justificando tromboprofilaxia de rotina (CURATIVE 2022).',
    refratariedadeFalsaVersusVerdadeira:
      'Armadilhas diagnósticas perante a falha de resposta clínica inicial:\n\n' +
      '- Quebra oculta de adesão dietética: ingestão de petiscos proteicos, pastas dentárias com sabor ou alimentos de outros animais pelo cão.\n' +
      '- Diagnósticos imitadores não identificados: presença de linfoma alimentar de baixo grau, hipoadrenocorticismo atípico não diagnosticado ou insuficiência pancreática exócrina (EPI).\n' +
      '- Doença linfática não controlada: linfangiectasia primária grave que foi tratada com imunossupressores sem a devida restrição ultrabaixa de gordura na dieta.',
    efeitosAdversosIatrogenicosDeCorticoides:
      'Morbilidades desencadeadas pela corticoterapia prolongada ou em altas doses:\n\n' +
      '- Efeitos metabólicos e comportamentais: poliúria, polidipsia intensa, polifagia voraz, respiração ofegante (panting) e susceptibilidade a infecções bacterianas urinárias.\n' +
      '- Hepatopatia por esteroides e atrofia cutânea: lipidose hepatocelular induzida por glicocorticoide com elevação marcante de fosfatase alcalina (ALP) e fragilidade vascular dérmica.',
    prognosticoEEstratificacaoPorFenotipo:
      'Heterogeneidade de desfechos conforme o fenótipo de resposta clínica:\n\n' +
      '- Fenótipo dietorresponsivo (CIE-FR): prognóstico muito favorável a excelente, com expectativa de vida normal e remissão prolongada sob manejo nutricional contínuo.\n' +
      '- Fenótipo imunossupressor-responsivo (CIE-IR): prognóstico reservado a bom; a grande maioria responde nas primeiras semanas, mas requer desmame meticuloso e vigilância de recidivas.\n' +
      '- Fenótipo não responsivo (CIE-NR) e PLE: prognóstico cauteloso a desfavorável; mortalidade hospitalar substancial associada a complicações trombóticas, ascite refratária e desnutrição extrema.',
  },

  prevention: {
    vigilanciaNutricionalEPrevencaoDeRecidivas:
      'Estratégias de acompanhamento a longo prazo para sustentação da remissão:\n\n' +
      '- Manutenção estrita da dieta de sucesso: orientar o tutor a manter indefinidamente a formulação dietética que gerou a remissão clínica, evitando testes alimentares caseiros desnecessários.\n' +
      '- Monitoramento laboratorial seriado: pesagem quinzenal a mensal, mensuração seriada de albumina sérica a cada 1 a 3 meses e reavaliação de cobalamina após o término do protocolo de 84 dias.\n' +
      '- Aplicação longitudinal do CCECAI: comparação periódica dos escores clínicos para detectar recaídas subclínicas antes de perdas ponderais acentuadas.',
    instrucoesInegociaveisParaOTutor:
      'Diretrizes essenciais de adesão e segurança para o tutor no ambiente doméstico:\n\n' +
      '- Tolerância zero a petiscos: explicar enfaticamente que um único biscoito, queijo, osso de couro ou resto de mesa pode reativar a inflamação mucosal e invalidar meses de tratamento.\n' +
      '- Cuidados com medicação palatável: verificar se comprimidos palatáveis (como antiparasitários orais mastigáveis) contêm carnes ou proteínas alergênicas, optando por apresentações em gotas spot-on ou comprimidos puros insípidos.\n' +
      '- Vigilância de sinais de alarme: orientar a procurar o veterinário imediatamente se notar aumento do volume abdominal (barriga d\'água), respiração acelerada em repouso (>30 mpm) ou fraqueza súbita em patas traseiras.',
    errosComuns: [
      'Rotular precocemente o paciente como portador de "IBD resistente a corticoides" sem antes ter realizado pelo menos três ensaios dietéticos terapêuticos adequados.',
      'Prescrever rotineiramente metronidazol ou tilosina como "teste diagnóstico empírico", deflagrando disbiose duradoura e seleção de bactérias resistentes.',
      'Assumir que a melhora clínica temporária após o uso de antibióticos prova que o cão apresentava uma infecção bacteriana primária tratável.',
      'Acreditar que a budesonida é um fármaco estritamente tópico entérico sem efeitos sistêmicos: a budesonida suprime o eixo hipotálamo-hipófise-adrenal de maneira real.',
      'Iniciar imunossupressão agressiva precoce em cão estável sem antes documentar a doença por exclusão metódica ou biópsia tecidual.',
      'Interpretar um laudo de biópsia mucosal com infiltrado linfoplasmocítico como prova absoluta e isolada de doença inflamatória crônica idiopática.',
      'Suspender a suplementação de cobalamina oral precocemente antes de completar o ciclo validado de 84 dias consecutivos.',
      'Ignorar a pesquisa de hipoadrenocorticismo atípico (Addison com eletrólitos normais) em cães jovens com vômitos e diarreia crônica oscilante.',
      'Prescrever enrofloxacina para colite crônica em Boxer ou Bulldog Francês sem antes obter biópsia com cultura e antibiograma comprovando AIEC sensível.',
      'Tratar a disbiose intestinal como uma infecção bacteriana que precisa ser erradicada com antibióticos de amplo espectro.',
    ],
    redFlags: [
      'Hipoalbuminemia acentuada (<1,5 g/dL) com desenvolvimento de ascite progressiva e edema periférico (descompensação do fenótipo PLE).',
      'Taquipneia súbita, dispneia restritiva e hipoxemia em cão com PLE (suspeita iminente de tromboembolismo pulmonar).',
      'Paraparesia aguda simétrica extremamente dolorosa com extremidades frias e perda de pulso femoral (tromboembolismo aórtico distal).',
      'Perda de peso rápida superior a 10% do peso corporal associada a anorexia refratária e sarcopenia severa.',
      'Deterioração clínica súbita com dor abdominal intensa à palpação, febre e choque distributivo (suspeita de perfuração intestinal ou sepse).',
    ],
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'enteropatia-perdedora-de-proteinas-caes-gatos',
    'doenca-renal-cronica-caes-gatos',
    'hipoadrenocorticismo-addison',
    'insuficiencia-pancreatica-exocrina-caes-gatos',
    'linfoma-mediastinal-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'prednisolona',
    'ciclosporina',
    'clorambucil',
  ],

  references: [
    {
      id: 'ref-heilmann-acvim-cie-2026',
      title: 'ACVIM-endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs',
      citationText: 'Heilmann RM, Jergens AE, Kathrani A, et al. ACVIM-endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs. Journal of Veterinary Internal Medicine. 2026;40(1):aalaf017.',
      authors: 'Heilmann RM, Jergens AE, Kathrani A, et al.',
      year: 2026,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '40',
      pages: 'aalaf017',
      sourceType: 'Consenso de Especialistas ACVIM',
      url: 'https://doi.org/10.1093/jvimsj/aalaf017',
      doi: '10.1093/jvimsj/aalaf017',
      evidenceLevel: 'A',
      notes: 'Consenso contemporâneo e revisão sistemática definindo o termo CIE, prioridade da dieta sobre imunossupressores, veto formal a antibióticos empíricos e padronização diagnóstica.',
    },
    {
      id: 'ref-dor-cobalamin-oral-2024',
      title: 'Efficacy and tolerance of oral versus parenteral cyanocobalamin supplement in hypocobalaminaemic dogs with chronic enteropathy: a controlled randomised open-label trial',
      citationText: 'Dor C, Nixon S, Salavati Schmitz S, et al. Efficacy and tolerance of oral versus parenteral cyanocobalamin supplement in hypocobalaminaemic dogs with chronic enteropathy: a controlled randomised open-label trial. Journal of Small Animal Practice. 2024;65(5):317-328.',
      authors: 'Dor C, Nixon S, Salavati Schmitz S, et al.',
      year: 2024,
      journal: 'Journal of Small Animal Practice',
      volume: '65',
      pages: '317-328',
      sourceType: 'Ensaio Clínico Randomizado (RCT)',
      url: 'https://doi.org/10.1111/jsap.13705',
      doi: '10.1111/jsap.13705',
      evidenceLevel: 'A',
      notes: 'Comprova equivalência biológica absoluta e normalização metabólica de MMA entre reposição oral diária (25 mcg/kg) e parenteral de cianocobalamina em cães com enteropatia crônica.',
    },
    {
      id: 'ref-caulfield-cie-outcome-2026',
      title: 'Chronic inflammatory enteropathy without moderate to severe hypoalbuminemia: long-term outcome in 60 dogs',
      citationText: 'Caulfield S, Priestnall SL, Lawson J, Kathrani A. Chronic inflammatory enteropathy without moderate to severe hypoalbuminemia: long-term outcome in 60 dogs. Journal of Veterinary Internal Medicine. 2026;40(1):aalaf060.',
      authors: 'Caulfield S, Priestnall SL, Lawson J, Kathrani A.',
      year: 2026,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '40',
      pages: 'aalaf060',
      sourceType: 'Estudo de Coorte Longitudinal',
      url: 'https://doi.org/10.1093/jvimsj/aalaf060',
      doi: '10.1093/jvimsj/aalaf060',
      evidenceLevel: 'B',
      notes: 'Avalia o desfecho longitudinal em cães com CIE sem hipoalbuminemia grave, confirmando evolução significativamente superior dos cães responsivos à dieta (CIE-FR).',
    },
    {
      id: 'ref-myers-lowfat-ple-2023',
      title: 'Prospective Evaluation of Low-Fat Diet Monotherapy in Dogs with Presumptive Protein-Losing Enteropathy',
      citationText: 'Myers M, Martinez SA, Shiroma JT, et al. Prospective Evaluation of Low-Fat Diet Monotherapy in Dogs with Presumptive Protein-Losing Enteropathy. Journal of the American Animal Hospital Association. 2023;59(2):74-84.',
      authors: 'Myers M, Martinez SA, Shiroma JT, et al.',
      year: 2023,
      journal: 'Journal of the American Animal Hospital Association',
      volume: '59',
      pages: '74-84',
      sourceType: 'Estudo Prospectivo',
      url: 'https://doi.org/10.5326/JAAHA-MS-7248',
      doi: '10.5326/JAAHA-MS-7248',
      evidenceLevel: 'B',
      notes: 'Demonstra remissão clínica completa com dieta com teor ultrabaixo de gordura em cães com PLE e linfangiectasia presumida, sem necessidade de corticoterapia em 43% dos respondedores.',
    },
    {
      id: 'ref-hanifeh-fmt-tylosin-2026',
      title: 'Clinical trial reveals limited clinical and microbiome effects following oral fecal microbiota transplantation in dogs with chronic enteropathy responsive to tylosin',
      citationText: 'Hanifeh M, et al. Clinical trial reveals limited clinical and microbiome effects following oral fecal microbiota transplantation in dogs with chronic enteropathy responsive to tylosin. Journal of the American Veterinary Medical Association. 2026;264(3):178-186.',
      authors: 'Hanifeh M, et al.',
      year: 2026,
      journal: 'Journal of the American Veterinary Medical Association',
      volume: '264',
      pages: '178-186',
      sourceType: 'Ensaio Clínico Randomizado Duplo-Cego',
      url: 'https://doi.org/10.2460/javma.26.03.0178',
      doi: '10.2460/javma.26.03.0178',
      evidenceLevel: 'A',
      notes: 'Demonstra efeitos clínicos e microbiológicos limitados e transitórios do FMT oral versus placebo em cães com enteropatia crônica, refutando seu uso rotineiro.',
    },
    {
      id: 'ref-jablonski-ple-review-2026',
      title: 'Emerging Concepts in the Understanding and Treatment of Canine Protein-Losing Enteropathy',
      citationText: 'Jablonski SA. Emerging Concepts in the Understanding and Treatment of Canine Protein-Losing Enteropathy. Veterinary Clinics of North America: Small Animal Practice. 2026;56(3):715-729.',
      authors: 'Jablonski SA.',
      year: 2026,
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      volume: '56',
      pages: '715-729',
      sourceType: 'Revisão Temática',
      url: 'https://doi.org/10.1016/j.cvsm.2026.01.011',
      doi: '10.1016/j.cvsm.2026.01.011',
      evidenceLevel: 'B',
      notes: 'Atualização abrangente sobre a relação entre CIE, disfunção linfática mecânica, absorção preservada de prednisolona oral e tromboprofilaxia baseada no CURATIVE.',
    },
    {
      id: 'ref-volkmann-multicenter-cie-2021',
      title: 'Multicentre prospective evaluation of dogs with chronic enteropathy (CIE-IR and CIE-NR)',
      citationText: 'Volkmann M, Steiner JM, Fosgate GT, et al. Multicentre prospective evaluation of dogs with chronic enteropathy (CIE-IR and CIE-NR). Journal of Veterinary Internal Medicine. 2021;35(5):2205-2216.',
      authors: 'Volkmann M, Steiner JM, Fosgate GT, et al.',
      year: 2021,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '35',
      pages: '2205-2216',
      sourceType: 'Estudo Prospectivo Multicêntrico',
      url: 'https://doi.org/10.1111/jvim.16246',
      doi: '10.1111/jvim.16246',
      evidenceLevel: 'B',
      notes: 'Estudo multicêntrico com 165 cães; identifica baixo escore corporal, hipoalbuminemia e dilatação lacteal como preditores independentes de pior resposta a imunossupressores.',
    },
    {
      id: 'ref-serafini-vitamins-ce-2024',
      title: 'Dysregulated serum concentrations of fat-soluble vitamins in dogs with chronic enteropathy',
      citationText: 'Serafini F, Maxwell KM, Zhu X, et al. Dysregulated serum concentrations of fat-soluble vitamins in dogs with chronic enteropathy. Journal of Veterinary Internal Medicine. 2024;38(5):2612-2619.',
      authors: 'Serafini F, Maxwell KM, Zhu X, et al.',
      year: 2024,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '38',
      pages: '2612-2619',
      sourceType: 'Estudo Clínico Observacional',
      url: 'https://doi.org/10.1111/jvim.17107',
      doi: '10.1111/jvim.17107',
      evidenceLevel: 'B',
      notes: 'Documenta desregulação marcante das vitaminas lipossolúveis (A, D e E) na enteropatia crônica, correlacionando deficiências à gravidade inflamatória e perda linfática.',
    },
    {
      id: 'ref-nelson-couto-cie-2020',
      title: 'Small Animal Internal Medicine (6th ed.): Disorders of the Intestinal Tract',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 31, pp. 493-497.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (Elsevier)',
      volume: '6ª Edição',
      pages: '493-497',
      sourceType: 'Livro-Texto de Referência',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
      evidenceLevel: 'B',
      notes: 'Capítulo fundamental do acervo abordando imunopatogenia mucosa, sobreposição entre enterite crônica e linfoma, fisiologia dos lacteais e diagnóstico diferencial metódico.',
    },
    {
      id: 'ref-plumb-drug-handbook-10e',
      title: "Plumb's Veterinary Drug Handbook (10th ed.)",
      citationText: "Plumb DC. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      authors: 'Plumb DC.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook (Wiley-Blackwell)",
      volume: '10ª Edição',
      pages: '142-331',
      sourceType: 'Manual Farmacológico Veterinário',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119859239',
      evidenceLevel: 'B',
      notes: 'Monografias detalhadas de budesonida (supressão do eixo adrenal HPA), ciclosporina (biodisponibilidade microemulsionada), clorambucil e protocolos de cianocobalamina.',
    },
    {
      id: 'ref-dibartola-fluids-2017',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (5th ed.)',
      citationText: 'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 5th ed. St. Louis: Elsevier; 2017.',
      authors: 'DiBartola SP.',
      year: 2017,
      journal: 'Fluid, Electrolyte, and Acid-Base Disorders (Elsevier)',
      volume: '5ª Edição',
      pages: '168-657',
      sourceType: 'Livro-Texto de Referência',
      url: 'https://www.elsevier.com/books/fluid-electrolyte-and-acid-base-disorders-in-small-animal-practice/dibartola/978-0-323-31464-0',
      evidenceLevel: 'B',
      notes: 'Base fisiológica para perdas eletrolíticas entéricas (potássio, magnésio e bicarbonato), bloqueio de PTH por hipomagnesemia e equilíbrio ácido-base em enteropatias.',
    },
    {
      id: 'ref-withrow-macewen-oncology-6e',
      title: "Withrow & MacEwen's Small Animal Clinical Oncology (6th ed.): Alimentary Tract Tumors",
      citationText: "Vail DM, Thamm DH, Liptak JM. Withrow & MacEwen's Small Animal Clinical Oncology. 6th ed. St. Louis: Elsevier; 2020. Cap. 33.",
      authors: 'Vail DM, Thamm DH, Liptak JM.',
      year: 2020,
      journal: "Withrow & MacEwen's Small Animal Clinical Oncology (Elsevier)",
      volume: '6ª Edição',
      pages: '445-478',
      sourceType: 'Livro-Texto de Referência Oncológica',
      url: 'https://www.elsevier.com/books/withrow-and-macewens-small-animal-clinical-oncology/vail/978-0-323-59496-7',
      evidenceLevel: 'B',
      notes: 'Referência oncológica do acervo para critérios histopatológicos, imuno-histoquímicos e moleculares (PARR) na diferenciação entre enterite linfoplasmocítica e linfoma intestinal.',
    },
  ],
};
