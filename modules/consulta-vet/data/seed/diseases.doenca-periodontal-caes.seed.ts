import type { DiseaseRecord } from '../../types/disease';

export const doencaPeriodontalCaesRecord: DiseaseRecord = {
  id: 'disease-doenca-periodontal-caes',
  slug: 'doenca-periodontal-caes',
  title: 'Doença Periodontal Canina',
  synonyms: [
    'Periodontite canina',
    'Gengivite e periodontite em cães',
    'Periodontal disease in dogs',
    'Enfermidade periodontal canina',
  ],
  species: ['dog'],
  category: 'odontologia',
  tags: [
    'Biofilme',
    'Disbiose',
    'AVDC PD0-PD4',
    'WSAVA Guidelines',
    'AAHA Dental Guidelines 2019',
    'Radiografia intraoral',
    'Sondagem periodontal',
    'Escovação diária',
    'RANKL OPG',
    'Toy breeds',
  ],
  quickSummary:
    'A doença periodontal em cães é uma enfermidade inflamatória crônica provocada por biofilme dental disbiótico e pela resposta imuno-inflamatória destrutiva do hospedeiro. Manifesta-se inicialmente como gengivite reversível e, se não tratada, evolui para periodontite, produzindo perda irreversível de inserção periodontal, ligamento periodontal, cemento e osso alveolar (Pavlovsky, 2023; Bellows et al., 2019; Niemiec et al., 2020; Yang & Moon, 2026; Hendy et al., 2026). O acúmulo visível de cálculo dental não se correlaciona obrigatoriamente com o estágio da periodontite (Pavlovsky, 2023; Bellows et al., 2019). O diagnóstico estadiado (PD0 a PD4) exige anestesia geral com intubação endotraqueal, sondagem de 6 pontos por dente e radiografia intraoral de boca inteira (Bellows et al., 2019; Niemiec et al., 2020; AVDC, 2020). Antimicrobianos sistêmicos não substituem o debridamento mecânico e não devem ser prescrevidos como monoterapia (Pavlovsky, 2023; Bellows et al., 2019; Davis & Weese, 2022).',
  quickDecisionStrip: [
    'Gengivite é inflamação reversível sem perda óssea/inserção; periodontite implica perda estrutural irreversível do periodonto.',
    'A doença é impulsionada por disbiose do biofilme e destruição tecidual mediada pelo próprio hospedeiro (neutrófilos, MMPs, Th1/Th17, RANKL/OPG).',
    'Tártaro visível não mede gravidade: dente limpo na coroa pode ocultar perda óssea subgengival grave; dente com muito cálculo pode ter periodonto preservado.',
    'Exame acordado é apenas triagem (apenas 41,57% de concordância com o padrão ouro); estadiamento exige anestesia geral, intubação, sondagem 6 pontos/dente e radiografias de boca inteira.',
    'Limpeza dentária sem anestesia é clinicamente inadequada pois impede sondagem subgengival, radiografia, analgesia e proteção das vias aéreas.',
    'Profundidade normal do sulco periodontal no cão é de 0 a 3 mm; avaliar sempre juntamente com a recessão gengival para calcular a perda total de inserção (CAL).',
    'Estadiamento AVDC por dente: PD0 (normal), PD1 (gengivite), PD2 (<25% perda / F1), PD3 (25–50% perda / F2), PD4 (>50% perda / F3).',
    'Antibiótico NÃO é tratamento primário da doença periodontal: não remove biofilme nem restaura inserção; reservado a infecções profundas, osteomielite ou imunossupressão.',
    'Cães de pequeno porte (toy/miniature) têm risco substancialmente maior (até 5× maior em cães <6,5 kg) e alto risco de fratura mandibular patológica nos molares/caninos.',
    'A escovação dentária diária é o padrão-ouro de home care mecânico; produtos VOHC são auxiliares e não substituem debridamento profissional.',
  ],
  quickSummaryRich: {
    lead:
      'A doença periodontal canina transita da gengivite reversível para a destruição irreversível dos tecidos de sustentação dentária. O erro clínico mais comum é julgar a boca pela quantidade de cálculo ou pela tolerância alimentar do cão. O paradigma moderno é a disbiose comunitária do biofilme associada à inflamação desregulada do hospedeiro. Sem exame oral anestesiado com intubação, sondagem sistemática e radiografias intraorais, mais de 28% das lesões clinicamente relevantes permanecem ocultas.',
    leadHighlights: ['disbiose', 'hospedeiro', 'estadiamento anestesiado', 'radiografia intraoral', 'home care'],
    pillars: [
      {
        title: 'Modelo da Disbiose',
        body:
          'A transição da saúde para a periodontite ocorre por enriquecimento anaeróbico proteolítico (Porphyromonas gulae, Prevotella, Treponema) e degradação tecidual mediada por MMPs e osteoclastogênese via RANKL.',
        highlights: ['Porphyromonas gulae', 'MMPs', 'RANKL'],
      },
      {
        title: 'Triagem vs Estadiamento',
        body:
          'Exame visual acordado concorda com a realidade anestesiada em apenas 41,57% dos casos. Radiografia de boca inteira identifica patologias ocultas em dentes macroscopicamente normais.',
        highlights: ['41,57% concordância', 'radiografia de boca inteira'],
      },
      {
        title: 'Stewardship Antimicrobiano',
        body:
          'Antibióticos sistêmicos não removem cálculo nem biofilme e não substituem o debridamento mecânico subgengival ou a extração de dentes PD4.',
        highlights: ['não substituem debridamento', 'monoterapia inadequada'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Padronizado',
      steps: [
        {
          label: '1. Triagem consciente (consultório)',
          detail:
            'Avaliar halitose, cálculo visível, sangramento gengival, assimetria facial, perda dentária e sinais de dor. Alertar o tutor de que o exame definitivo exige anestesia.',
        },
        {
          label: '2. Anestesia geral e intubação endotraqueal',
          detail:
            'Garantir via aérea protegida com tubo endotraqueal de cuff insuflado, monitorização fisiológica e analgesia multimodal (bloqueios anestésicos loco-regionais).',
        },
        {
          label: '3. Radiografia intraoral de boca inteira',
          detail:
            'Realizar radiografias de todos os quadrantes ANTES da limpeza final para avaliar perda óssea cristas/furcas, lesões endo-periodontais e fraturas.',
        },
        {
          label: '4. Sondagem periodontal e charting (6 pontos/dente)',
          detail:
            'Sondar 6 pontos por dente com sonda milimetrada (profundidade normal ≤3 mm). Registrar PPD, recessão gengival (GR), CAL, envolvimento de furca (F1–F3) e mobilidade (M0–M3).',
        },
        {
          label: '5. Estadiamento dente por dente e conduta',
          detail:
            'Determinar o estágio AVDC individual de cada dente (PD0 a PD4) e executar debridamento, root planing ou extração cirúrgica com radiografia pós-extração.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Conduta Terapêutica por Estágio AVDC',
      steps: [
        {
          label: 'PD0 / PD1 (Gengivite)',
          detail:
            'Profilaxia profissional: raspagem supragengival e subgengival, polimento com pasta profilática, irrigação do sulco com clorexidina 0,12% e início de escovação diária em casa.',
        },
        {
          label: 'PD2 (Periodontite Inicial <25% perda de inserção)',
          detail:
            'Limpeza profissional completa + raspagem e debridamento subgengival cuidadoso + fechamento de bolsas com terapia periodontal (root planing). Antimicrobianos locais são opcionais/caso a caso.',
        },
        {
          label: 'PD3 (Periodontite Moderada 25–50% perda de inserção)',
          detail:
            'Avaliar preservação versus extração: closed/open root planing, retalhos mucoperiósteos em dentes estratégicos SE houver cooperação para escovação diária. Caso contrário, extração cirúrgica.',
        },
        {
          label: 'PD4 (Periodontite Avançada >50% perda de inserção ou F3)',
          detail:
            'Extração cirúrgica com elevação de retalho e sutura sem tensão é o tratamento mais previsível e curativo da dor. Radiografia pós-extração é obrigatória para confirmar remoção radicular completa.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Enfermidade inflamatória multifatorial iniciada pelo biofilme bacteriano aderido às superfícies dentárias e perpetuada pela resposta imuno-inflamatória do hospedeiro (Pavlovsky, 2023; Bellows et al., 2019).',
    modeloDisbiose:
      'A visão histórica de "infecção bacteriana simples por patógeno único" foi substituída pelo modelo de disbiose ecológica: o acúmulo de placa e a estagnação do sulco gengival alteram o microambiente (menor pO₂, maior pH, consumo de glicose), selecionando bactérias anaeróbias proteolíticas em detrimento dos comensais aeróbios (Yang & Moon, 2026; Davis & Weese, 2022).',
    respostaHospedeiro:
      'Bactérias do biofilme ativam receptores de reconhecimento de padrão (PRRs/TLRs) no epitélio gengival e neutrófilos, recrutando macrófagos e linfócitos T (Th1/Th17). A liberação de metaloproteinases de matriz (MMPs), espécies reativas de oxigênio (ROS), IL-1β, TNF-α e IL-17 leva à degradação do colágeno do ligamento periodontal. A elevação do mediador RANKL em relação à osteoprotegerina (OPG) estimula a maturação de osteoclastos e a reabsorção do osso alveolar (Tizard, 2020; Hendy et al., 2026).',
    catalaseDeficiency:
      'Acatalasemia canina (mutação no gene CAT c.979G>A): condição hereditária rara descrita em Beagles e outras raças húngaras/poodles, na qual a incapacidade de degradar o peróxido de hidrogênio (H₂O₂) gerado na boca resulta em úlceração gangrenosa grave, necrose óssea e perda dentária precoce desproporcional à quantidade de placa (Pavlovsky, 2023).',
  },
  epidemiology: {
    caes:
      'É a doença crônica mais prevalente em cães adultos e idosos. Estudos epidemiológicos de atenção primária registram prevalências diagnósticas entre 9,3% e 18,2%, enquanto exames sob anestesia com radiografias revelam prevalências de 44% a 100% (Wallis & Holcombe, 2020). O estudo VetCompass no Reino Unido (n=22.333) encontrou prevalência anual registrada de 12,52%, com forte predileção por raças Toy (Toy Poodle OR 3,97; King Charles Spaniel OR 2,63; Greyhound OR 2,58; Cavalier King Charles OR 2,39; cães braquicefálicos OR 1,25) e correlação inversa com a massa corporal (O\'Neill et al., 2021).',
    porteEAnatomia:
      'Cães <6,5 kg apresentam risco até 5 vezes maior de diagnóstico de periodontite avançada em comparação com cães >25 kg (Pavlovsky, 2023). O apinhamento dentário, rotação de pré-molares, maloclusão e volume ósseo mandibular reduzido ao redor de raízes grandes explicam a susceptibilidade exacerbada das raças toy (Pavlovsky, 2023; Wallis & Holcombe, 2020).',
    atualizacao2026:
      'Estudo epidemiológico de 2026 analisando 688.665 cães em dados de seguro no Japão confirmou aumento progressivo da frequência de claims de doença periodontal com a idade, com aceleração precoce acentuada em raças miniatura e braquicefálicas (Akiyama et al., 2026).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Formação da película adquirida sobre o esmalte limpo a partir de glicoproteínas salivares em minutos.',
      'Adesão colonizadora primária de bactérias aeróbias gram-positivas (Moraxella, Capnocytophaga, Neisseriaceae).',
      'Maturação e multiplicação bacteriana com secreção de matriz extracelular (biofilme tridimensional organizado em 24h).',
      'Migração apical do biofilme para o sulco gengival e depleção de oxigênio.',
      'Disbiose subgengival e proliferação de anaeróbios gram-negativos proteolíticos (Porphyromonas gulae, Prevotella spp., Treponema spp.).',
      'Ativação do sistema imune inato (neutrófilos) e adaptativo (Th1/Th17) gengival.',
      'Liberação tecidual de MMPs e ROS → degradação do ligamento periodontal.',
      'Desequilíbrio do eixo RANKL/OPG → ativação de osteoclastos → reabsorção do osso alveolar (perda de inserção irreversível).',
      'Bolsa periodontal profunda, furca exposta, mobilidade dentária e perda da unidade dentária.',
    ],
    transmissao:
      'Doença endógena decorrente de disbiose do microbioma oral em hospedeiro susceptível. Não é infecção contagiosa direta entre indivíduos.',
  },
  pathophysiology:
    'A gengiva normal adere firmemente ao dente através do epitélio de junção na base do sulco periodontal (profundidade de 0–3 mm no cão). O ligamento periodontal ancora o cemento radicular ao osso alveolar. A presença de biofilme disbiótico na margem gengival induz gengivite (vasodilatação, edema, exsudação de fluido crevicular e migração neutrofílica), sem perda de suporte. Quando o processo progride para periodontite, a lâmina basal migra apicalmente à junção cemento-esmalte (CEJ), formando bolsa periodontal profunda (verdadeira) ou acompanhando a recessão gengival. A inflamação crônica estimula a via RANK/RANKL/OPG: células estromais e linfócitos expressam RANKL, que se liga ao receptor RANK em pré-osteoclastos, promovendo sua maturação e reabsorção lacunar do osso alveolar. Em dentes multirradiculares, a perda óssea alcança as áreas de bifurcação/trifurcação (furcas F1 a F3). Em cães de pequeno porte, a reabsorção óssea profunda nos primeiros molares e caninos mandibulares deixa uma ponte óssea cortical tão tênue que traumas mínimos ou tentativas de extração intempestivas podem levar a fratura mandibular patológica ou iatrogênica.',
  clinicalSignsPathophysiology: [
    {
      system: 'oral',
      findings: [
        {
          finding: 'Halitose acentuada',
          mechanism:
            'Produção de compostos sulfurados voláteis (sulfeto de hidrogênio, metilmercaptana) pelo metabolismo proteolítico de anaeróbios no biofilme subgengival.',
          clinicalMeaning: 'Sinal primário de consulta, porém não específico de periodontite (excluir necrose, corpo estranho, uremia).',
          priority: 'common',
        },
        {
          finding: 'Sangramento gengival à manipulação ou escovação',
          mechanism:
            'Úlceração do epitélio sulcular e neovascularização frágil associadas à gengivite hiperêmica.',
          clinicalMeaning: 'Indica inflamação ativa do sulco gengival (Índice Gengival elevado).',
          priority: 'common',
        },
        {
          finding: 'Recessão gengival e exposição da raiz dentária',
          mechanism:
            'Migração apical da margem gengival secundária à destruição do osso alveolar e do ligamento periodontal.',
          clinicalMeaning: 'Contribui diretamente para a perda total de inserção (CAL = PPD + GR).',
          priority: 'common',
        },
        {
          finding: 'Mobilidade dentária (M1 a M3)',
          mechanism:
            'Destruição avançada do ligamento periodontal e reabsorção de mais de 50% do suporte ósseo alveolar.',
          clinicalMeaning: 'Indica periodontite moderada a grave; M3 costuma ser indicação direta de extração.',
          priority: 'common',
        },
        {
          finding: 'Descarga nasal unilateral ou espirros crônicos',
          mechanism:
            'Perda óssea destrutiva na face palatina dos caninos maxilares, criando fístula oronasal comunicante.',
          clinicalMeaning: 'Diferencial importante de rinite unilateral em cães idosos.',
          priority: 'systemic',
        },
        {
          finding: 'Edema ou abscesso facial infraorbitário / mandibular',
          mechanism:
            'Acúmulo de exsudato purulento em bolsa periodontal profunda fechada (abscesso periodontal) ou extensão periapical.',
          clinicalMeaning: 'Exige descompressão, debridamento mecânico e drenagem sob anestesia.',
          priority: 'emergency',
        },
        {
          finding: 'Fratura mandibular sem trauma relevante',
          mechanism:
            'Perda óssea periodontal extrema ao redor de raízes volumosas (caninos ou 1ºs molares mandibulares) em cães toy.',
          clinicalMeaning: 'Complicação grave que exige radiografia prévia e fixação cirúrgica especializada.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Mastigação unilateral, queda de alimento ou relutância a alimentos duros',
          mechanism:
            'Dor nociceptiva à pressão oclusal sobre dentes com periodontite avançada, mobilidade ou abscesso.',
          clinicalMeaning: 'Indica desconforto oral importante; notar que a maioria dos cães mantém apetite apesar da dor.',
          priority: 'common',
        },
        {
          finding: 'Carga inflamatória sistêmica crônica',
          mechanism:
            'Bacteremia transitória e translocação repetida de endotoxinas/citocinas pró-inflamatórias (IL-1, IL-6, TNF-α) para a circulação.',
          clinicalMeaning: 'Pode exacerbar comorbidades sistêmicas (DRC, diabetes); não provada como causa direta isolada de endocardite.',
          priority: 'systemic',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem consciente (exame físico inicial)',
      purpose: 'Identificar queixas, cálculo visível, lesões grossas e planejar intervenção anestésica.',
      description:
        'Inspeção da cavidade oral em cão acordado, avaliação de assimetria, halitose e linfoadenomegalia submandibular.',
      interpretation: 'Detecta alteração óbvia, mas subestima severidade em 58% dos cães (Bauer et al., 2018).',
      limitations: 'Não substitui exame anestesiado nem permite estadiamento periodontal.',
    },
    {
      stepNumber: 2,
      title: 'Exame oral sob anestesia geral e intubação',
      purpose: 'Permitir inspeção de 360°, sondagem e radiografia sem dor ou risco de aspiração.',
      description:
        'Paciente intubado com cuff vedado, sob monitorização e analgesia. Limpeza e avaliação de cada dente.',
      interpretation: 'Padrão exigido pelas diretrizes AAHA e WSAVA (Bellows et al., 2019; Niemiec et al., 2020).',
      isGoldStandard: true,
    },
    {
      stepNumber: 3,
      title: 'Radiografia intraoral de boca inteira (Full-Mouth)',
      purpose: 'Identificar perda óssea subgengival, lesões de furca, reabsorções e defeitos radiculares.',
      description:
        'Tomadas radiográficas bissetrizes e paralelas de todas as arcadas dentárias.',
      interpretation: 'Identifica alterações clinicamente relevantes em 28% dos dentes macroscopicamente normais (Verstraete et al., 1998).',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Sondagem periodontal de 6 pontos e Charting',
      purpose: 'Medir a profundidade do sulco (PPD), recessão (GR) e perda total de inserção (CAL).',
      description:
        'Inserção suave da sonda milimetrada paralela à raiz em 6 pontos por dente (mesio-bucal, médio-bucal, disto-bucal, mesio-palatino, médio-palatino, disto-palatino).',
      interpretation: 'Cão: profundidade normal ≤3 mm. Registra-se também furca (F1–F3) e mobilidade (M0–M3).',
      isGoldStandard: true,
    },
  ],
  treatment: {
    estadiamentoAVDC: [
      'PD0 (Normal): Profundidade de sondagem ≤3 mm, ausência de gengivite e sem perda óssea. Conduta: prevenção e higiene domiciliar diária.',
      'PD1 (Gengivite): Inflamação gengival sem perda de inserção ou perda óssea. Conduta: profilaxia periodontal profissional completa (raspagem supra/subgengival, polimento, irrigação) + escovação diária.',
      'PD2 (Periodontite Inicial): Perda de inserção <25% ou envolvimento de furca F1. Conduta: profilaxia + raspagem e root planing subgengival + fechamento de bolsas. Agentes antimicrobianos locais são opcionais.',
      'PD3 (Periodontite Moderada): Perda de inserção de 25% a 50% ou envolvimento de furca F2. Conduta: debridamento avançado/root planing aberto com retalhos em dentes viáveis sob rigoroso home care; caso contrário, extração cirúrgica.',
      'PD4 (Periodontite Avançada): Perda de inserção >50% ou envolvimento de furca F3. Conduta: extração cirúrgica na grande maioria dos casos. Técnicas regenerativas são extremamente reservadas e têm prognóstico incerto.',
    ],
    stewardshipAntimicrobiano: [
      '⚠️ ANTIBIÓTICO NÃO É TRATAMENTO PRIMÁRIO DA DOENÇA PERIODONTAL.',
      'Antibióticos sistêmicos não removem cálculo, não destroem o biofilme estruturado e não revertem a perda de inserção (Pavlovsky, 2023; Bellows et al., 2019; Davis & Weese, 2022).',
      'Indicações restritas: osteomielite confirmada, abscesso periodontal com envolvimento de tecidos moles profundos/fistulização, pacientes severamente imunocomprometidos ou com comorbidades sistêmicas não controladas.',
      'Não prescrever amoxicilina/clavulanato ou clindamicina empiricamente apenas por presença de tártaro ou halitose.',
    ],
    analgesiaEAnestesia: [
      'Procedimentos odontológicos e extrações são dolorosos. Utilizar analgesia multimodal.',
      'Bloqueios anestésicos loco-regionais (bloqueio maxilar e bloqueio alveolar inferior/mandibular com bupivacaína ou lidocaína) reduzem o requerimento de anestésico inalatório e garantem conforto pós-operatório excelente (Lumb & Jones, 6ª ed.).',
    ],
     homeCare: [
      'Escovação dentária diária: técnica mecânica mais eficaz para remoção da placa bacteriana (Bellows et al., 2019; Niemiec et al., 2020).',
      'A placa bacteriana se reorganiza em aproximadamente 24 horas após a limpeza e pode mineralizar em cálculo em 72 horas (Pavlovsky, 2023).',
      'Produtos aprovados pelo Veterinary Oral Health Council (VOHC) podem ser utilizados como adjuvantes, verificando a lista atualizada no site oficial (vohc.org).',
      'Evitar ossos bovinos muito duros, cascos, chifres ou pedras, pois apresentam alto risco de fratura de esmalte e cúspides de premolares (PM4) (Pavlovsky, 2023).',
    ],
  },
  prevention: {
    homeCareDiario:
      'Iniciar a adaptação à escovação dentária diária desde filhote, utilizando cremes dentais de uso veterinário (sem flúor ou sabão humano).',
    produtosVOHC:
      'Selecionar petiscos, enxaguantes ou dietas com selo VOHC comprovado para redução de placa e cálculo.',
    consultasRegulares:
      'Avaliação oral por médico veterinário a cada 6 a 12 meses, programando limpezas profissionais sob anestesia antes que ocorra destruição periodontal irreversível.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['doenca-periodontal-gatos', 'gengivoestomatite-cronica-felina'],
  relatedMedicationSlugs: ['amoxicilina-clavulanato'],
  references: [
    {
      id: 'ref-vin-canine-periodontal-2023',
      citationText:
        'Pavlovsky G. Periodontal Disease (Canine). VINcyclopedia of Diseases. Veterinary Information Network. Published February 6, 2023.',
      sourceType: 'Base de conhecimento veterinário',
      evidenceLevel: 'A/B — Revisão de especialista',
    },
    {
      id: 'ref-aaha-dental-2019',
      citationText:
        'Bellows J, Berg ML, Dennis S, et al. 2019 AAHA Dental Care Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2019;55(2):49–69.',
      sourceType: 'Consenso de especialista / Diretriz internacional',
      url: 'https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/',
      evidenceLevel: 'A — Diretriz de Sociedade',
    },
    {
      id: 'ref-wsava-dental-2020',
      citationText:
        'Niemiec BA, Gawor J, Nemec A, et al. WSAVA Global Dental Guidelines. J Small Anim Pract. 2020;61(7):E36–E161.',
      sourceType: 'Diretriz Global',
      url: 'https://wsava.org/global-guidelines/dental-guidelines/',
      evidenceLevel: 'A — Diretriz Global',
    },
    {
      id: 'ref-avdc-nomenclature',
      citationText:
        'American Veterinary Dental College. AVDC Nomenclature — Periodontal Disease Stages, Furcation Index and Mobility Index. 2020.',
      sourceType: 'Nomenclatura oficial',
      url: 'https://avdc.org/avdc-nomenclature/',
      evidenceLevel: 'A — Padrão Oficial',
    },
    {
      id: 'ref-wallis-2020',
      citationText:
        'Wallis C, Holcombe LJ. A review of the frequency and impact of periodontal disease in dogs. J Small Anim Pract. 2020;61(9):529–540.',
      sourceType: 'Revisão sistemática',
      url: 'https://doi.org/10.1111/jsap.13218',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-oneill-2021',
      citationText:
        'O\'Neill DG, Mitchell CE, Humphrey J, et al. Epidemiology of periodontal disease in dogs in the UK primary-care veterinary setting. J Small Anim Pract. 2021;62(12):1051–1061.',
      sourceType: 'Estudo epidemiológico (VetCompass)',
      url: 'https://doi.org/10.1111/jsap.13405',
      evidenceLevel: 'A — Amostra populacional (n=22.333)',
    },
    {
      id: 'ref-bauer-2018',
      citationText:
        'Bauer AE, Stella J, Lemmons M, Croney CC. Evaluating the validity and reliability of a visual dental scale for detection of periodontal disease in non-anesthetized dogs. PLoS One. 2018;13(9):e0203930.',
      sourceType: 'Estudo de acurácia diagnóstica',
      url: 'https://doi.org/10.1371/journal.pone.0203930',
      evidenceLevel: 'B — Validação diagnóstica (CC0)',
    },
    {
      id: 'ref-verstraete-canine-1998',
      citationText:
        'Verstraete FJM, Kass PH, Terpak CH. Diagnostic value of full-mouth radiography in dogs. Am J Vet Res. 1998;59(6):686–691.',
      sourceType: 'Estudo diagnóstico clássico',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-yang-moon-2026',
      citationText:
        'Yang SB, Moon JH. Microbial therapeutics for canine periodontal disease: current status and future perspectives. Front Vet Sci. 2026;12:1748968.',
      sourceType: 'Revisão sistemática contemporânea',
      url: 'https://doi.org/10.3389/fvets.2025.1748968',
      evidenceLevel: 'A/B — Open Access (CC BY)',
    },
    {
      id: 'ref-hendy-2026',
      citationText:
        'Hendy E, Behery AE, Gomaa M, et al. Overview of Periodontal Disease in Dogs and Cats. J Vet Dent. 2026;43(4):332–341.',
      sourceType: 'Revisão narrativa recente',
      url: 'https://doi.org/10.1177/08987564261424349',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-akiyama-2026',
      citationText:
        'Akiyama N, Matsumoto Y, Horie R. Species- and breed-associated heterogeneity in age-related increases in periodontal disease risk among dogs and cats based on Japanese insurance claim data. Front Vet Sci. 2026;13:1764413.',
      sourceType: 'Estudo populacional recente',
      url: 'https://doi.org/10.3389/fvets.2026.1764413',
      evidenceLevel: 'A — Coorte populacional (n=688.665 cães)',
    },
    {
      id: 'ref-tizard-immunology-11th',
      citationText:
        'Tizard IR. Veterinary Immunology. 11th ed. Elsevier; 2020. Cap. Periodontal Disease Immunopathogenesis.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Base imunológica',
    },
    {
      id: 'ref-bsava-canine-practice',
      citationText:
        'BSAVA Manual of Canine Practice: A Foundation Manual. 1st ed. BSAVA. Cap. 20 Oral and Dental Problems.',
      sourceType: 'Manual prático',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-lumb-jones-6th',
      citationText:
        'Grimm KA, et al., eds. Lumb and Jones’ Veterinary Anesthesia and Analgesia. 6th ed. Wiley Blackwell; 2023. Seção Regional Anesthesia of the Head.',
      sourceType: 'Livro-texto de anestesia',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-vohc-accepted-2026',
      citationText:
        'Veterinary Oral Health Council. VOHC Accepted Products for Dogs. Updated 2026.',
      sourceType: 'Lista oficial',
      url: 'https://vohc.org/accepted-products/',
      evidenceLevel: 'A — Selo Oficial',
    },
    {
      id: 'ref-moore-niemiec-2014',
      citationText:
        'Moore JI, Niemiec B. Evaluation of extraction sites for evidence of retained tooth roots and periapical pathology. J Am Anim Hosp Assoc. 2014;50(2):77–82.',
      sourceType: 'Estudo retrospectivo',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-davis-weese-2022',
      citationText:
        'Davis EM, Weese JS. Oral Microbiome in Dogs and Cats: Dysbiosis and the Utility of Antimicrobial Therapy in the Treatment of Periodontal Disease. Vet Clin North Am Small Anim Pract. 2022;52(1):107–119.',
      sourceType: 'Revisão narrativa / Stewardship',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-harvey-2022',
      citationText:
        'Harvey C. The Relationship Between Periodontal Infection and Systemic and Distant Organ Disease in Dogs. Vet Clin North Am Small Anim Pract. 2022;52(1):121–137.',
      sourceType: 'Revisão crítica',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
