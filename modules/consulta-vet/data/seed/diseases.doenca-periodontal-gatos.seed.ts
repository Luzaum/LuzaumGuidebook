import type { DiseaseRecord } from '../../types/disease';

export const doencaPeriodontalGatosRecord: DiseaseRecord = {
  id: 'disease-doenca-periodontal-gatos',
  slug: 'doenca-periodontal-gatos',
  title: 'Doença Periodontal Felina',
  synonyms: [
    'Periodontite felina',
    'Gengivite e periodontite em gatos',
    'Periodontal disease in cats',
    'Enfermidade periodontal felina',
  ],
  species: ['cat'],
  category: 'odontologia',
  tags: [
    'Biofilme',
    'Disbiose felina',
    'Sulco 0-1 mm',
    'Tooth Resorption',
    'FCGS',
    'Early-Onset Periodontitis',
    'VetCompass Feline',
    'Radiografia intraoral',
    'Dor oculta',
    '1-TDC',
  ],
  quickSummary:
    'A doença periodontal felina é uma enfermidade inflamatória multifatorial impulsionada pelo biofilme dental e disbiose subgengival, na qual a gengivite é inflamação reversível sem perda de inserção, enquanto a periodontite resulta em destruição irreversível do ligamento periodontal e do osso alveolar (Pavlovsky, 2023; Bellows et al., 2019; Niemiec et al., 2020; Rodrigues et al., 2019). O diagnóstico é frequentemente subestimado porque os gatos mascaram sinais de dor oral e lesões subgengivais graves permanecem ocultas ao exame acordado (Palmeira et al., 2022; Soltero-Rivera et al., 2023; Verstraete et al., 1998). É fundamental não confundir periodontite com reabsorção dentária (Tooth Resorption) nem com gengivoestomatite crônica felina (FCGS), que possuem etiopatogenias e tratamentos completamente distintos (Pavlovsky, 2023; Bellows et al., 2019).',
  quickDecisionStrip: [
    'A profundidade fisiológica do sulco periodontal no gato é de 0 a 1 mm (0,5 a 1 mm na prática clínica); sondagem ≥1 mm com sangramento ou recessão aponta patologia.',
    'Gatos mascaram ativamente a dor oral: comer normalmente não exclui doença periodontal avançada ou lesões dolorosas.',
    'NÃO CONFUNDIR: Periodontite (origem no biofilme/sulco) ≠ Tooth Resorption (destruição odontoclástica) ≠ FCGS (mucosite ulcerosa caudal/linfoplasmocitária).',
    'Exame visual no gato acordado é apenas triagem; radiografias intraorais de boca inteira revelam lesões ocultas em 42% dos dentes felinos aparentemente normais.',
    'Gengivite severa em gatos jovens deve levantar suspeita de doença periodontal de início precoce (Early-Onset Periodontitis), que exige radiografias aos 6 meses.',
    'Dente ausente ao exame visual exige radiografia obrigatória para descartar raízes retidas (presentes em até 92,8% dos gatos pós-extração sem RX) ou reabsorções.',
    'Antibiótico não substitui debridamento subgengival mecânico ou extrações e não deve ser prescrito rotineiramente por halitose isolada ou gengivite.',
    'Estadiamento AVDC por dente: PD0 (normal), PD1 (gengivite), PD2 (<25% perda / F1), PD3 (25–50% perda / F2), PD4 (>50% perda / F3).',
    'A associação entre periodontite e doença renal crônica (DRC) em gatos é observacional e dose-dependente, sem prova de causalidade direta.',
    'Escovação diária é o método mecânico ideal de home care quando tolerada; dietas e produtos VOHC para gatos são alternativas adjuvantes.',
  ],
  quickSummaryRich: {
    lead:
      'No gato, a doença periodontal evolui em silêncio. Gatos raramente vocalizam ou recusam alimento por dor dentária — adaptam a mastigação e engolem croquetes inteiros. A profundidade normal do sulco periodontal no felino é extremamente rasa (0 a 1 mm). Qualquer profundidade acima de 1 mm acompanhada de sangramento ou lise cristas alveolar indica destruição periodontal. Diferenciar periodontite de tooth resorption e FCGS é o divisor de águas da odontologia felina moderna.',
    leadHighlights: ['sulco 0-1 mm', 'gato esconde dor', 'Tooth Resorption', 'FCGS', 'Early-Onset'],
    pillars: [
      {
        title: 'Tríade de Diferenciação Felina',
        body:
          'Periodontite é doença do suporte periodontal iniciada por biofilme. Tooth Resorption é reabsorção odontoclástica do dente. FCGS é inflamação mucosa hiperimune caudal. Cada uma tem tratamento cirúrgico/médico próprio.',
        highlights: ['Periodontite', 'Tooth Resorption', 'FCGS'],
      },
      {
        title: 'Dor Felina Silenciosa',
        body:
          'Estudo de Palmeira et al. (2022) provou que alterações periodontais e dentes ausentes correlacionam-se diretamente com escores elevados de dor, mesmo quando o tutor relata que o gato "come normalmente".',
        highlights: ['Palmeira 2022', 'escores de dor'],
      },
      {
        title: 'Raízes Retidas e RX Obrigatório',
        body:
          'Em gatos submetidos a extração prévia sem radiografia de controle pós-operatório, raízes retidas são identificadas em 92,8% dos casos, com patologia periapical associada em 64,3%.',
        highlights: ['92,8% raízes retidas', 'RX pós-extração'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico em Felinos',
      steps: [
        {
          label: '1. Triagem consciente e sinais sutis',
          detail:
            'Investigar halitose, salivação, preferência por patê, mastigação unilateral, movimentos involuntários de mandíbula (chattering) e agressividade ao toque facial.',
        },
        {
          label: '2. Anestesia geral com tubo endotraqueal apropriado',
          detail:
            'Procedimento sob anestesia inalatória com via aérea vedada, monitorização contínua e analgesia por bloqueio regional maxilar/mandibular.',
        },
        {
          label: '3. Radiografias intraorais de boca inteira (Full-Mouth)',
          detail:
            'Essencial em gatos devido à altíssima concomitância de Tooth Resorption subgengival e lesões periodontais ocultas em 42% dos dentes com coroa normal.',
        },
        {
          label: '4. Sondagem fina e charting (6 pontos/dente)',
          detail:
            'Sonda periodontal delicada. Limiar de anormalidade: profundidade ≥1 mm. Mapear perda de inserção, furcas e lesões reabsorvidas tipo 1 ou tipo 2.',
        },
        {
          label: '5. Diagnóstico diferencial e plano terapêutico',
          detail:
            'Separar dentes com periodontite puras de dentes com Tooth Resorption associada e definir preservação versus extração com radiografia pós-extração.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano Terapêutico Felino por Estágio',
      steps: [
        {
          label: 'PD0 / PD1 (Gengivite Felina)',
          detail:
            'Profilaxia periodontal sob anestesia: raspagem supra e subgengival delicada, polimento e irrigação. Home care com escovação ou produtos VOHC felinos.',
        },
        {
          label: 'PD2 (Periodontite Inicial)',
          detail:
            'Debridamento subgengival minucioso + polimento + tratamento de bolsas periodontais rasas. Antimicrobianos locais são opcionais.',
        },
        {
          label: 'PD3 (Periodontite Moderada 25–50% perda)',
          detail:
            'Preservação do dente apenas se houver viabilidade anatômica e cooperação para home care domiciliar. Em gatos, a extração costuma ter maior taxa de cura da dor.',
        },
        {
          label: 'PD4 (Periodontite Avançada >50% perda ou F3)',
          detail:
            'Extração cirúrgica com retalhos e alinhamento dos bordos ósseos. Confirmação radiográfica pós-extração da remoção radicular completa.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Processo inflamatório destrutivo do periodonto felino deflagrado pelo biofilme dental subgengival em um hospedeiro imunitariamente susceptível (Pavlovsky, 2023; Bellows et al., 2019).',
    disbioseFelina:
      'Estudo de sequenciamento de microbioma subgengival por Rodrigues et al. (2019, Nature Sci Rep) demonstrou que gatos saudáveis apresentam predominância de Proteobacteria (Moraxella, Capnocytophaga, Enhydrobacter), enquanto gatos com periodontite crônica e agressiva exibem expansão acentuada de Bacteroidetes, Fusobacteria e Spirochaetes, com alta abundância do gênero Treponema.',
    doencaInícioPrecoce:
      'Gengivite e periodontite de início precoce (Early-Onset Periodontitis) acometem gatos jovens de 6 a 24 meses. Soltero-Rivera et al. (2023) demonstraram que 78% desses felinos apresentam periodontite moderada a grave ao exame radiográfico, embora o exame visual acordado identificasse doença em apenas 30% deles.',
    fivFelv:
      'A infecção por FIV e FeLV pode estar associada a maior gravidade de doença periodontal por alteração da imunidade celular, mas a periodontite decorre diretamente da disbiose do biofilme e não é causada pelo vírus por si só (Pavlovsky, 2023).',
  },
  epidemiology: {
    gatos:
      'Prevalência epidemiológica de 15,2% em prontuários de atenção primária no Reino Unido (n=18.249, VetCompass Feline 2023), com maior frequência em Siamês (18,7%) e Maine Coon (16,7%) (O\'Neill et al., 2023). Exames sob anestesia revelam alterações em até 98% dos gatos adultos (Pavlovsky, 2023).',
    idadeEBraquicefalia:
      'O risco aumenta exponencialmente com a idade. Dados de seguros japoneses (n=185.782 gatos) demonstram elevação constante de claims periodontais a partir de 2 anos, com inclinação marcada em raças braquicefálicas (Persian, Exotic, Himalayan) devido a apinhamento e maloclusão (Akiyama et al., 2026).',
    associacaoDRC:
      'Estudo de coorte com 169.242 gatos demonstrou que a gravidade da doença periodontal (PD3/PD4) está associada a maior risco subsequente de diagnóstico de doença renal crônica azotêmica (Trevejo et al., 2018). Trata-se de associação epidemiológica que não estabelece causalidade direta nem garante prevenção de DRC pelo tratamento periodontal.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Formação da película adquirida sobre o esmalte limpo a partir de glicoproteínas salivares em minutos.',
      'Adesão colonizadora primária de bactérias aeróbias gram-positivas (Moraxella, Capnocytophaga, Enhydrobacter).',
      'Maturação e multiplicação bacteriana com secreção de matriz extracelular (biofilme tridimensional organizado em 24h).',
      'Migração apical do biofilme para o sulco gengival (profundidade fisiológica felina ≤1 mm) e depleção de oxigênio.',
      'Disbiose subgengival felina com proliferação de anaeróbios gram-negativos proteolíticos (Bacteroidetes, Fusobacteria e gênero Treponema abundante) (Rodrigues et al., 2019).',
      'Ativação do sistema imune inato (neutrófilos) e adaptativo (Th1/Th17) gengival com liberação de IL-1β, TNF-α e IL-17.',
      'Liberação tecidual de MMPs e ROS → degradação do ligamento periodontal.',
      'Desequilíbrio do eixo RANKL/OPG → ativação de osteoclastos → reabsorção do osso alveolar (perda de inserção irreversível).',
      'Bolsa periodontal profunda (≥1 mm), furca exposta, mobilidade dentária, dor e perda da unidade dentária.',
    ],
    transmissao:
      'Doença endógena multifatorial. Não transmissível por contato.',
  },
  pathophysiology:
    'O sulco periodontal fisiológico no gato é extremamente raso (0 a 1 mm). Quando o biofilme penetra o sulco, a resposta inflamatória causa hiperemia gengival, edema e migração apical do epitélio de junção. A destruição das fibras do ligamento periodontal leva à perda da crista alveolar. Em gatos, a perda periodontal frequentemente coexiste no mesmo dente com reabsorções dentárias odontoclásticas (Tooth Resorption) ou com lesões endodônticas puras. A reabsorção de osso alveolar em caninos maxilares felinos pode causar fenestração para a cavidade nasal (fístula oronasal), gerando espirros e secreção nasal unilateral.',
  clinicalSignsPathophysiology: [
    {
      system: 'oral',
      findings: [
        {
          finding: 'Halitose e ptialismo (salivação espessa)',
          mechanism:
            'Atividade proteolítica bacteriana com liberação de compostos sulfurados voláteis e sialorreia reflexa à dor oral.',
          clinicalMeaning: 'Sinal cardinal relatado pelo tutor; exige exame sob anestesia.',
          priority: 'common',
        },
        {
          finding: 'Sangramento gengival à exploração ou ao alimento',
          mechanism:
            'Gengivite com ulceração do epitélio sulcular e neovascularização frágil.',
          clinicalMeaning: 'Indica gengivite ativa ou periodontite no sulco (profundidade ≥1 mm).',
          priority: 'common',
        },
        {
          finding: 'Gengivite intensa em gato jovem (6–24 meses)',
          mechanism:
            'Doença periodontal de início precoce (Early-Onset Periodontitis) com rápida perda óssea horizontal.',
          clinicalMeaning: 'Requer radiografia intraoral precoce para evitar perda dentária extensa (Soltero-Rivera et al., 2023).',
          priority: 'common',
        },
        {
          finding: 'Recessão gengival e bolsas periodontais ≥1 mm',
          mechanism:
            'Destruição irreversível do ligamento periodontal e reabsorção da crista alveolar.',
          clinicalMeaning: 'Base para o estadiamento AVDC felino (PD1 a PD4).',
          priority: 'common',
        },
        {
          finding: 'Mobilidade dentária e dentes soltos/ausentes',
          mechanism:
            'Perda de mais de 50% da inserção óssea alveolar radicular.',
          clinicalMeaning: 'Geralmente indicação de extração cirúrgica delicada.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'behavioral',
      findings: [
        {
          finding: 'Mudanças discretas de comportamento (grooming reduzido, isolamento, chattering)',
          mechanism:
            'Manifestação comportamental silenciosa de dor nociceptiva crônica na cavidade oral (Palmeira et al., 2022).',
          clinicalMeaning: 'Gatos não recusam comida facilmente; dor manifesta-se em escores sutis.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem consciente e anamnese focada',
      purpose: 'Identificar sinais sutis de dor oral, alterações de apetite e mastigação.',
      description:
        'Inspeção externa da face, palpação de linfonodos e rápida abertura de boca sem estressar o gato.',
      interpretation: 'Sinaliza a necessidade de procedimento anestésico; não permite estadiar.',
      limitations: 'Gatos não cooperam para sondagem ou abertura oral consciente detalhada.',
    },
    {
      stepNumber: 2,
      title: 'Anestesia geral e intubação endotraqueal',
      purpose: 'Garantir proteção das vias aéreas e ausência de dor para o procedimento completo.',
      description:
        'Intubação endotraqueal delicada (risco de espasmo lático), monitorização e analgesia com bloqueio loco-regional.',
      interpretation: 'Condição indispensável para odontologia felina segura (Bellows et al., 2019).',
      isGoldStandard: true,
    },
    {
      stepNumber: 3,
      title: 'Radiografia intraoral de boca inteira (Full-Mouth)',
      purpose: 'Mapear perda óssea, raízes retidas e diferenciar Tooth Resorption de Periodontite.',
      description:
        'Tomadas radiográficas de todas as arcadas dentárias felinas.',
      interpretation: 'Identifica alterações clinicamente relevantes em 42% dos dentes aparentemente normais (Verstraete et al., 1998).',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Sondagem periodontal delicada (6 pontos/dente) e Charting',
      purpose: 'Medir a profundidade do sulco (limiar fisiológico ≤1 mm em gatos).',
      description:
        'Sondagem com sonda milimetrada periodontal fina ao redor de cada raiz.',
      interpretation: 'Profundidade ≥1 mm indica bolsa periodontal ou perda de inserção.',
      isGoldStandard: true,
    },
  ],
  treatment: {
    estadiamentoAVDC: [
      'PD0 (Normal): Sulco 0–1 mm, sem gengivite ou perda óssea. Conduta: prevenção domiciliar.',
      'PD1 (Gengivite Felina): Hiperemia gengival sem perda de inserção. Conduta: profilaxia sob anestesia (raspagem supra/subgengival, polimento, irrigação) + home care.',
      'PD2 (Periodontite Inicial): Perda de inserção <25% ou bolsa ≥1 mm rasa. Conduta: debridamento subgengival delicado e polimento.',
      'PD3 (Periodontite Moderada): Perda de inserção de 25% a 50%. Conduta: extração cirúrgica é frequentemente a conduta mais resolutiva da dor no gato; preservação exige tutor altamente aderente.',
      'PD4 (Periodontite Avançada): Perda de inserção >50% ou furca F3. Conduta: extração cirúrgica com retalho e sutura sem tensão.',
    ],
    diferenciacaoTerapeutica: [
      'Periodontite: foco no debridamento subgengival ou extração conforme o suporte ósseo.',
      'Tooth Resorption (TR): extração ou amputação de coroa (apenas em TR Tipo 2 com reabsorção radicular completa e sem osteíte/periodontite associada, guiada por radiografia).',
      'FCGS (Estomatite): extração dentária ampla (PME ou FME) de primeira linha; não responder com antibiótico crônico.',
    ],
    stewardshipAntimicrobiano: [
      'Antibióticos não são monoterapia nem tratamento primário da doença periodontal em gatos (Pavlovsky, 2023; Davis & Weese, 2022).',
      'Reservados para osteomielite, extensão de abscesso para tecidos moles ou imunocomprometimento grave.',
    ],
    terapiasEmergentesAdjuvantes: [
      '1-TDC (topical oral 1-tetradecanol complex): descrito no VIN (2023) como terapia adjuvante emergente que demonstrou redução na profundidade de bolsa e inflamação gengival em ensaios felinos curtos de 6 semanas; não substitui o debridamento nem as extrações cirúrgicas.',
    ],
    analgesiaEAnestesia: [
      'Bloqueios regionais maxilares e infraorbitários / alveolares inferiores com bupivacaína garantem analgesia trans e pós-operatória de excelência (Lumb & Jones, 6ª ed.).',
    ],
    homeCareFelino: [
      'Escovação diária quando o temperamento do gato permitir e a boca estiver completamente sem dor.',
      'Nunca forçar escovação sobre gengiva severamente ulcerada ou dolorosa.',
      'Utilizar dietas e petiscos aprovados pelo VOHC felino como métodos complementares (vohc.org).',
    ],
  },
  prevention: {
    homeCareHigiene:
      'Higiene bucal diária adaptada, enxaguantes veterinários sem álcool ou produtos aprovados pelo VOHC.',
    exameDentalPrecoce:
      'Avaliação periodontal anestesiada com radiografias em gatos com gengivite aos 6 a 12 meses de idade.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['doenca-periodontal-caes', 'gengivoestomatite-cronica-felina', 'imunodeficiencia-felina-fiv', 'leucemia-viral-felina'],
  relatedMedicationSlugs: ['amoxicilina-clavulanato'],
  references: [
    {
      id: 'ref-vin-feline-periodontal-2023',
      citationText:
        'Pavlovsky G. Periodontal Disease (Feline). VINcyclopedia of Diseases. Veterinary Information Network. Published February 6, 2023.',
      sourceType: 'Base de conhecimento veterinário',
      evidenceLevel: 'A/B — Revisão de especialista',
    },
    {
      id: 'ref-aaha-dental-2019-cat',
      citationText:
        'Bellows J, Berg ML, Dennis S, et al. 2019 AAHA Dental Care Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2019;55(2):49–69.',
      sourceType: 'Consenso de especialista / Diretriz internacional',
      url: 'https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/',
      evidenceLevel: 'A — Diretriz de Sociedade',
    },
    {
      id: 'ref-wsava-dental-2020-cat',
      citationText:
        'Niemiec BA, Gawor J, Nemec A, et al. WSAVA Global Dental Guidelines. J Small Anim Pract. 2020;61(7):E36–E161.',
      sourceType: 'Diretriz Global',
      url: 'https://wsava.org/global-guidelines/dental-guidelines/',
      evidenceLevel: 'A — Diretriz Global',
    },
    {
      id: 'ref-avdc-nomenclature-cat',
      citationText:
        'American Veterinary Dental College. AVDC Nomenclature — Periodontal Disease Stages, Furcation Index and Mobility Index. 2020.',
      sourceType: 'Nomenclatura oficial',
      url: 'https://avdc.org/avdc-nomenclature/',
      evidenceLevel: 'A — Padrão Oficial',
    },
    {
      id: 'ref-verstraete-feline-1998',
      citationText:
        'Verstraete FJM, Kass PH, Terpak CH. Diagnostic value of full-mouth radiography in cats. Am J Vet Res. 1998;59(6):692–695.',
      sourceType: 'Estudo diagnóstico clássico',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-oneill-feline-2023',
      citationText:
        'O\'Neill DG, et al. Periodontal disease in cats under primary veterinary care in the UK: frequency and risk factors. J Feline Med Surg. 2023;25(3):1098612X231158154.',
      sourceType: 'Estudo epidemiológico (VetCompass Feline)',
      url: 'https://doi.org/10.1177/1098612X231158154',
      evidenceLevel: 'A — Amostra populacional (n=18.249)',
    },
    {
      id: 'ref-soltero-rivera-2023',
      citationText:
        'Soltero-Rivera M, Vapniarsky N, Rivas IL, Arzi B. Clinical, radiographic and histopathologic features of early-onset gingivitis and periodontitis in cats (1997–2022). J Feline Med Surg. 2023;25(1):1098612X221148577.',
      sourceType: 'Estudo descritivo de coorte',
      url: 'https://doi.org/10.1177/1098612X221148577',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-perry-tutt-2015',
      citationText:
        'Perry R, Tutt C. Periodontal disease in cats: back to basics—with an eye on the future. J Feline Med Surg. 2015;17(1):45–65.',
      sourceType: 'Revisão narrativa aprofundada',
      url: 'https://doi.org/10.1177/1098612X14560099',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-rodrigues-2019',
      citationText:
        'Rodrigues MX, Bicalho RC, Fiani N, et al. The subgingival microbial community of feline periodontitis and gingivostomatitis: characterization and comparison between diseased and healthy cats. Sci Rep. 2019;9:12340.',
      sourceType: 'Estudo microbiômico por sequenciamento (Nature)',
      url: 'https://doi.org/10.1038/s41598-019-48852-4',
      evidenceLevel: 'A/B — Open Access (CC BY 4.0)',
    },
    {
      id: 'ref-palmeira-2022',
      citationText:
        'Palmeira I, Fonseca MJ, Lafont-Lecuelle C, et al. Dental Pain in Cats: A Prospective 6-Month Study. J Vet Dent. 2022;39(4):369–375.',
      sourceType: 'Estudo prospectivo de dor dental',
      url: 'https://doi.org/10.1177/08987564221103142',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-trevejo-2018',
      citationText:
        'Trevejo RT, Lefebvre SL, Yang M, et al. Survival analysis to evaluate associations between periodontal disease and the risk of development of chronic azotemic kidney disease in cats. J Am Vet Med Assoc. 2018;252(6):710–720.',
      sourceType: 'Estudo de coorte retrospectivo',
      url: 'https://doi.org/10.2460/javma.252.6.710',
      evidenceLevel: 'A/B — Coorte maciça (n=169.242)',
    },
    {
      id: 'ref-akiyama-2026-cat',
      citationText:
        'Akiyama N, Matsumoto Y, Horie R. Species- and breed-associated heterogeneity in age-related increases in periodontal disease risk among dogs and cats based on Japanese insurance claim data. Front Vet Sci. 2026;13:1764413.',
      sourceType: 'Estudo populacional recente',
      url: 'https://doi.org/10.3389/fvets.2026.1764413',
      evidenceLevel: 'A — Coorte felina (n=185.782 gatos)',
    },
    {
      id: 'ref-moore-niemiec-2014-cat',
      citationText:
        'Moore JI, Niemiec B. Evaluation of extraction sites for evidence of retained tooth roots and periapical pathology. J Am Anim Hosp Assoc. 2014;50(2):77–82.',
      sourceType: 'Estudo retrospectivo',
      evidenceLevel: 'B — Raízes retidas felinas (92,8%)',
    },
    {
      id: 'ref-vohc-accepted-2026-cat',
      citationText:
        'Veterinary Oral Health Council. VOHC Accepted Products for Cats. Table updated 2026.',
      sourceType: 'Lista oficial',
      url: 'https://vohc.org/accepted-products/',
      evidenceLevel: 'A — Selo Oficial',
    },
    {
      id: 'ref-davis-weese-2022-cat',
      citationText:
        'Davis EM, Weese JS. Oral Microbiome in Dogs and Cats: Dysbiosis and the Utility of Antimicrobial Therapy in the Treatment of Periodontal Disease. Vet Clin North Am Small Anim Pract. 2022;52(1):107–119.',
      sourceType: 'Revisão narrativa / Stewardship',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
