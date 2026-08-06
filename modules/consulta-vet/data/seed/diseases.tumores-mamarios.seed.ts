import type { DiseaseRecord } from '../../types/disease';

export const tumoresMamariosRecord: DiseaseRecord = {
  id: 'disease-tumores-mamarios',
  slug: 'tumores-mamarios-caes-gatos',
  title: 'Tumores mamários em cães e gatos',
  synonyms: [
    'Neoplasia mamária',
    'Tumor de mama',
    'Carcinoma mamário',
    'Tumor mamário canino',
    'Carcinoma mamário felino',
    'Câncer mamário',
  ],
  species: ['dog', 'cat'],
  category: 'oncologia',
  tags: ['Mama', 'Carcinoma', 'Mastectomia', 'TNM', 'Linfonodo sentinela', 'Histopatologia', 'Oncologia'],
  quickSummary:
    'Tumores mamários formam um grupo heterogêneo de lesões benignas e malignas originadas do epitélio, mioepitélio ou estroma da glândula. Em cadelas, neoplasias benignas, malignas e tumores múltiplos de tipos diferentes coexistem com frequência; em gatas, a grande maioria dos tumores mamários é maligna e biologicamente agressiva. Toda massa deve ser medida, mapeada e estadiada antes da cirurgia. Citologia ajuda a excluir mastite, lipoma, mastocitoma e metástase linfonodal, mas a classificação definitiva e o grau dependem de histopatologia, que é o padrão ouro. Cirurgia é a principal terapia para doença localizada; o tamanho da ressecção deve equilibrar margens, distribuição das massas e morbidade, pois a evidência não mostra benefício universal da mastectomia mais radical em cadelas. Linfonodo sentinela, invasão linfovascular, tamanho, grau e estágio refinam prognóstico. Quimioterapia adjuvante permanece caso a caso, com evidência mais fraca que em muitos tumores humanos.',
  quickDecisionStrip: [
    'Mapeie e meça todas as glândulas: nódulos simultâneos podem ter histologias diferentes.',
    'Histopatologia de cada massa é o padrão ouro; citologia isolada não gradua carcinoma.',
    'Estadiar tórax e linfonodos antes de operar lesão suspeita de malignidade.',
    'Carcinoma inflamatório: não é caso de mastectomia curativa; priorizar biópsia e paliativo.',
    'Em gatas, trate massa mamária como maligna até prova histológica em contrário.',
    'Não repita números históricos de proteção da castração como certeza: a evidência é heterogênea.',
  ],
  quickSummaryRich: {
    lead:
      'A pergunta clínica não é apenas “é câncer?”. É: qual tumor, qual grau, até onde chegou e qual cirurgia controla a doença com menor morbidade? O toque identifica a massa; o estadiamento define a estratégia; a histopatologia entrega o diagnóstico que realmente prevê comportamento. Em pacientes com múltiplos nódulos, enviar apenas o maior pode esconder uma neoplasia mais agressiva em outra glândula.',
    leadHighlights: ['qual tumor', 'qual grau', 'estadiamento', 'histopatologia'],
    pillars: [
      {
        title: 'Cão e gato não são iguais',
        body:
          'Cadelas apresentam espectro benigno e maligno amplo. Em gatas, carcinomas invasivos predominam e justificam abordagem cirúrgica mais ampla quando o estadiamento permite.',
        highlights: ['não são iguais', 'carcinomas invasivos'],
      },
      {
        title: 'Padrão ouro é tecido',
        body:
          'A punção aspirativa por agulha fina ajuda na triagem, mas arquitetura, invasão, margens e grau exigem histopatologia. A biópsia por agulha grossa pode ser útil quando o resultado pré-operatório realmente mudará a cirurgia.',
        highlights: ['histopatologia', 'biópsia por agulha grossa'],
      },
      {
        title: 'Linfonodo é parte do tumor',
        body:
          'Palpação normal não exclui metástase. O mapeamento do linfonodo sentinela melhora a identificação da drenagem, mas as técnicas e os critérios ainda variam entre estudos.',
        highlights: ['Palpação normal não exclui', 'linfonodo sentinela'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Mapa mamário completo',
          timing: 'Primeira consulta',
          detail:
            'Registrar glândula, diâmetro, mobilidade, consistência, ulceração, calor, dor e fixação de cada nódulo; fotografar com escala (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Linfonodos regionais',
          timing: 'Antes da cirurgia',
          detail:
            'Palpar axilares e inguinais; PAAF de linfonodo alterado; mapear sentinela por contraste ou corante quando disponível (Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Metástase distante',
          timing: 'Antes de operar malignidade suspeita',
          detail:
            'Três projeções torácicas ou TC; imagem abdominal conforme espécie, estágio e sinais (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Diagnóstico tecidual',
          timing: 'Quando planejamento cirúrgico depende do tipo',
          detail:
            'Excisão com margens ou biópsia por agulha grossa quando carcinoma inflamatório, massa fixa ou resultado pré-operatório mudará conduta — histopatologia é padrão ouro (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Laudo oncológico completo',
          timing: 'Após ressecção',
          detail:
            'Tipo, grau, margens, invasão linfovascular, necrose, índice mitótico e linfonodo; imuno-histoquímica em casos selecionados (Plumb\'s, 10ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Doença localizada',
          detail:
            'Cirurgia com margens adequadas e remoção do linfonodo de drenagem quando indicado (Nelson & Couto, 6ª ed.).',
          reassess: 'Histopatologia de cada massa enviada separadamente se múltiplos nódulos.',
        },
        {
          label: 'Múltiplos tumores',
          detail:
            'Planejar cirurgia regional, unilateral ou bilateral em etapas; enviar todos os nódulos separadamente (Nelson & Couto, 6ª ed.).',
          reassess: 'Cada glândula pode ter histologia diferente — não enviar apenas o maior nódulo.',
        },
        {
          label: 'Alto risco histológico',
          detail:
            'Discutir oncologia, quimioterapia adjuvante (doxorrubicina, carboplatina conforme protocolo) e seguimento mais curto; benefício com incerteza (Plumb\'s, 10ª ed.).',
          dose: 'Doxorrubicina e carboplatina conforme protocolo oncológico individualizado e função cardíaca/renal.',
          reassess: 'Seguimento mais curto com imagem e linfonodos conforme grau e estágio.',
        },
        {
          label: 'Inflamatório/metastático',
          detail:
            'Paliativo multimodal, analgesia, controle de inflamação e qualidade de vida; cirurgia raramente controla a doença (Nelson & Couto, 6ª ed.).',
          reassess: 'Carcinoma inflamatório não é caso de mastectomia curativa — priorizar biópsia e paliativo.',
        },
      ],
    },
  },
  etiology: {
    hormonal:
      'Exposição a estrogênio e progesterona participa da carcinogênese mamária; receptores hormonais são mais comuns em tumores bem diferenciados. Progestágenos exógenos também aumentam a proliferação mamária e devem ser evitados sem indicação robusta.',
    molecular:
      'Instabilidade genômica, alterações em vias de proliferação e apoptose, cicloxigenase-2, HER2, p53, angiogênese e microambiente tumoral variam entre subtipos. Esses marcadores ajudam a compreender o prognóstico, mas poucos têm terapia-alvo validada na rotina veterinária.',
    fatores: [
      'Idade avançada e permanência intacta por mais ciclos ovarianos aumentam exposição hormonal e aparecem associadas em coortes.',
      'Obesidade precoce foi associada a maior risco em estudos observacionais; causalidade e magnitude variam.',
      'Em gatas, uso de progestágenos e sexo feminino intacto são fatores relevantes; gatos machos raramente podem ser afetados.',
      'Não há evidência de transmissão entre animais.',
    ],
  },
  epidemiology: {
    caes:
      'Tumores mamários estão entre as neoplasias mais frequentes de cadelas inteiras, principalmente de meia-idade a idosas. A proporção entre tumores benignos e malignos varia por população e critério histológico; não use a regra simplista de metade benigna e metade maligna como garantia individual.',
    gatos:
      'Neoplasias mamárias felinas são menos frequentes que em cadelas, porém a maioria é carcinoma maligno com invasão e metástase precoces. Siameses e raças orientais aparecem com risco aumentado em algumas séries.',
    localizacao:
      'Glândulas caudais abdominais e inguinais são frequentemente afetadas, mas qualquer glândula pode desenvolver tumor. Múltiplas massas são comuns e podem ter diagnósticos diferentes.',
  },
  pathogenesisTransmission: {
    progressao: [
      'Célula mamária adquire vantagem proliferativa e forma lesão in situ ou nódulo benigno/maligno.',
      'Carcinomas invasivos rompem membrana basal e infiltram estroma, pele, músculo e vasos linfáticos.',
      'Células alcançam linfonodos regionais e, depois, pulmões; fígado, osso e outros órgãos são sítios menos comuns.',
      'Invasão linfovascular e embolização dérmica causam carcinoma inflamatório: edema, eritema, dor e rápida disseminação.',
    ],
    especie:
      'Tumores felinos costumam apresentar maior taxa de malignidade, invasão e metástase que o espectro canino, justificando estadiamento e cirurgia mais agressivos quando o paciente é elegível.',
  },
  pathophysiology:
    'O crescimento local comprime e invade pele, ductos, vasos e tecido subcutâneo, gerando nódulo, ulceração, dor e secreção. A angiogênese sustenta o tumor, mas vasos frágeis favorecem necrose e sangramento. A invasão linfática explica edema e metástase nodal; metástase pulmonar reduz a troca gasosa e causa tosse ou dispneia tardiamente. No carcinoma inflamatório, êmbolos neoplásicos obstruem os linfáticos dérmicos; por isso a mama fica quente, eritematosa e edemaciada sem que uma infecção seja a causa primária.',
  clinicalSignsPathophysiology: [
    {
      system: 'mammary',
      findings: [
        'Nódulo único ou múltiplos: proliferação focal de epitélio, mioepitélio ou estroma.',
        'Fixação à pele/parede, irregularidade e crescimento rápido: sugerem invasão, mas não substituem histologia.',
        'Ulceração, sangramento e necrose: crescimento excede suprimento vascular e rompe barreira cutânea.',
        'Eritema difuso, calor, edema e dor sem massa delimitada: suspeitar carcinoma inflamatório e diferenciar mastite.',
      ],
    },
    {
      system: 'lymphatic',
      findings: [
        'Linfonodo aumentado, firme ou irregular: hiperplasia reativa ou metástase; somente citologia/histologia diferencia.',
        'Edema de membro ou parede abdominal: obstrução linfática por invasão tumoral.',
      ],
    },
    {
      system: 'respiratory',
      findings: [
        'Tosse, taquipneia ou dispneia em doença avançada: metástases pulmonares, efusão ou carcinomatose.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Perda de peso, hiporexia e dor: carga tumoral, inflamação e ulceração; muitos pacientes permanecem bem em estágio inicial.',
      ],
    },
  ],
  diagnosis: {
    exameClinico:
      'Palpe todas as cadeias mamárias e linfonodos, meça cada massa em três dimensões e registre ulceração e fixação. Em múltiplas massas, cada nódulo é uma unidade diagnóstica e deve ser identificado separadamente no frasco.',
    citologia:
      'A punção aspirativa por agulha fina é útil para confirmar origem epitelial, excluir inflamação, mastocitoma ou lipoma e avaliar linfonodo. A sobreposição citológica entre benigno e maligno limita classificação e grau; o resultado “compatível com tumor mamário” não encerra o caso. Pakdeesaneha et al. (2024) compararam punção aspirativa e biópsia por agulha grossa em 83 cães e 64 gatos, usando a histopatologia excisional como referência, e não demonstraram superioridade consistente da agulha grossa. A escolha pré-operatória deve considerar segurança e impacto real na cirurgia.',
    histopatologia:
      'A histopatologia excisional de todas as massas, margens e linfonodos é o padrão ouro. O laudo deve conter tipo, grau, índice mitótico, invasão linfovascular e margens. Imuno-histoquímica com receptores de estrogênio e progesterona, Ki-67 e cicloxigenase-2 pode refinar casos selecionados, sem substituir a morfologia.',
    estadiamentoTnm: {
      kind: 'clinicalTable',
      headers: ['Componente', 'Critério canino clássico', 'Implicação'],
      rows: [
        ['T1', '<3 cm', 'Menor carga local; prognóstico depende também de grau, invasão e espécie.'],
        ['T2', '3–5 cm', 'Risco intermediário; planejar margens e linfonodo.'],
        ['T3', '>5 cm', 'Associado a maior risco de malignidade/metástase.'],
        ['N0 / N1', 'Sem / com metástase nodal por cito ou histologia', 'N1 define estágio IV no sistema clássico.'],
        ['M0 / M1', 'Sem / com metástase distante', 'M1 define estágio V e muda objetivo terapêutico.'],
      ],
    },
    imagem:
      'Três projeções torácicas são o mínimo tradicional; a tomografia computadorizada é mais sensível para pequenos nódulos e útil em pacientes de alto risco. A ultrassonografia abdominal avalia órgãos e linfonodos, mas não substitui a avaliação do tórax. Imagem normal de linfonodo não exclui micrometástase.',
    linfonodoSentinela:
      'Mapeamento por corante vital, contraste ultrassonográfico, linfografia por tomografia ou outras técnicas identifica a drenagem individual. Pimentel et al. (2024), em revisão sistemática, encontraram grande variação entre técnicas e concluíram que o linfonodo removido ainda precisa de histopatologia; palpação e imagem não excluem metástase microscópica.',
    padraoOuro:
      'Padrão ouro: histopatologia. Para o estágio nodal, a histopatologia do linfonodo é superior à palpação e à imagem. Para metástase pulmonar, a tomografia computadorizada é mais sensível que a radiografia, embora disponibilidade e impacto na conduta devam ser considerados.',
  },
  treatment: {
    cirurgia: [
      'Cirurgia é primeira linha para doença ressecável sem carcinoma inflamatório. Escolher nodulectomia, mastectomia simples, regional, unilateral ou bilateral conforme tamanho, número, localização e possibilidade de margens.',
      'Hörnfeldt e Mortensen (2023) revisaram a extensão cirúrgica em cadelas e não encontraram vantagem consistente de uma operação mais radical para todos os casos. Não remova toda a cadeia automaticamente quando uma cirurgia menor consegue margens e controle adequados.',
      'Em gatas, a biologia agressiva favorece mastectomia radical unilateral e, quando bilateral, dois tempos cirúrgicos para reduzir tensão/complicações; individualizar pelo estágio e condição.',
      'Remover e identificar linfonodo sentinela/regional quando houver drenagem, suspeita ou alto risco; palpação normal não basta.',
      'Ovariectomia ou ovariohisterectomia concomitante em paciente intacta previne piometra e reprodução. O benefício oncológico após tumor já estabelecido é variável e pode depender de receptores de estrogênio, estradiol e subtipo; discuta sem prometer ganho universal.',
    ],
    quimioterapia:
      'Considere oncologista em carcinoma de alto grau, invasão linfovascular, metástase nodal ou distante, tumor felino agressivo ou recorrência. Gonzalez-Ormerod (2024) revisou a quimioterapia adjuvante após cirurgia em gatas e classificou a evidência de benefício como fraca. Budde e McCluskey (2023) descrevem doxorrubicina de 30 mg/m² por via intravenosa a cada 2–3 semanas em cães e 20–25 mg/m² a cada 3 semanas em gatos; para carboplatina, 250–300 mg/m² em cães e 240–260 mg/m² em gatos a cada 3 semanas. São referências para oncologista, com monitoramento e segurança ocupacional.',
    carcinomaInflamatorio:
      'Carcinoma mamário inflamatório geralmente não é cirúrgico por invasão linfática difusa e metástase. Biópsia confirma êmbolos dérmicos. Souza et al. (2009) trataram 12 cães com piroxicam e observaram melhora clínica ou estabilização em todos os tratados, com mediana de 171 dias sem progressão. Como era uma série pequena e sem grupo controle, o resultado apoia uma opção paliativa, não uma promessa de resposta; há risco gastrointestinal e renal.',
    suporte: [
      'Analgesia multimodal, curativo não aderente, controle de infecção secundária quando documentada e suporte nutricional.',
      'Não iniciar corticoide antes de diagnóstico tecidual sem objetivo claro; pode alterar inflamação e complicar comorbidades.',
      'Reavaliar cicatriz, cadeia contralateral, linfonodos e tórax a cada 2–3 meses inicialmente em alto risco, depois ampliar conforme evolução.',
    ],
    novidades:
      'Linfonodo sentinela, histopatologia digital, painéis moleculares e alvos de COX-2/HER2 são áreas promissoras. Até 2026, a maioria ainda refina prognóstico ou pesquisa; não substitui cirurgia e histopatologia bem executadas.',
  },
  prevention: {
    castracao:
      'Castração antes da puberdade provavelmente reduz exposição hormonal e risco mamário em parte das cadelas, mas as estimativas históricas de 0,5%, 8% e 26% derivam de estudos antigos com alto risco de viés. Guirguis e Beggs (2025), em revisão sistemática, encontraram heterogeneidade suficiente para recomendar decisão individual por raça, porte e outros riscos; não apresente esses percentuais como certeza individual.',
    manejo:
      'Evitar progestágenos para supressão de cio/controle comportamental sem indicação robusta. Manter condição corporal adequada e examinar cadeias mamárias em consultas de rotina.',
    deteccao:
      'Tutoria mensal das mamas em fêmeas adultas e avaliação rápida de qualquer nódulo permitem cirurgia em menor tamanho, fator associado a melhor prognóstico.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['mastite-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-nelson-couto-mammary',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Menções a neoplasia mamária e diferenciais mamários; PDF anexado.',
      sourceType: 'Livro-texto',
      notes: 'A obra anexada não contém capítulo terapêutico completo de tumores mamários; a ficha foi complementada com literatura oncológica.',
      evidenceLevel: 'Referência clínica complementar',
    },
    {
      id: 'ref-plumbs-mammary-oncology',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Doxorubicin, Carboplatin e Piroxicam.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-mammary-review-2024',
      citationText:
        'Mammary neoplasms in female dogs: clinical, diagnostic and therapeutic aspects. 2024.',
      sourceType: 'Revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11093647/',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-surgical-dose-2023',
      citationText:
        'Hörnfeldt MB, Mortensen JK. Surgical dose and clinical outcome in female dogs with mammary gland tumours: literature review. Acta Vet Scand. 2023;65:12.',
      sourceType: 'Revisão sistematizada',
      url: 'https://doi.org/10.1186/s13028-023-00674-1',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-sentinel-node-2024',
      citationText:
        'Pimentel PAB, et al. The role of lymph nodes and their drainage in canine mammary gland tumours: systematic review. Res Vet Sci. 2024;168:105139.',
      sourceType: 'Revisão sistemática',
      url: 'https://doi.org/10.1016/j.rvsc.2024.105139',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fna-core-2024',
      citationText:
        'Pakdeesaneha T, et al. Comparison of fine-needle aspiration and core needle biopsy for pre-operative diagnosis of canine and feline mammary gland tumours. Vet Comp Oncol. 2024;22:566–573.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://doi.org/10.1111/vco.13006',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-feline-prognostic-2025',
      citationText:
        'Prognostic insights in feline mammary carcinomas: clinicopathological factors and proposal of a new staging system. 2025.',
      sourceType: 'Coorte retrospectiva',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40150308/',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-feline-chemo-evidence-2024',
      citationText:
        'Gonzalez-Ormerod G. Adjuvant chemotherapy in cats with mammary carcinomas undergoing surgical removal. Veterinary Evidence. 2024.',
      sourceType: 'Revisão crítica',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12710393/',
      notes: 'Conclusão: evidência fraca.',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-spay-review-2025',
      citationText:
        'Guirguis P, Beggs DS. Does pre-pubertal spaying reduce the risk of canine mammary tumours? Systematic review. Animals. 2025;15:436.',
      sourceType: 'Revisão sistemática',
      url: 'https://doi.org/10.3390/ani15030436',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-inflammatory-piroxicam',
      citationText:
        'de M Souza CHM, et al. Inflammatory mammary carcinoma in 12 dogs: clinical features, COX-2 expression and response to piroxicam. Can Vet J. 2009;50:506–510.',
      sourceType: 'Série retrospectiva',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19436636/',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
