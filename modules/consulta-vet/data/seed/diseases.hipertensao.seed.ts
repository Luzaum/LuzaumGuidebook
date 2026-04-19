import type { DiseaseRecord } from '../../types/disease';

/** Hipertensão arterial sistêmica — cães e gatos (síntese aprofundada; Nelson & Couto, IRIS, BSAVA nefro/uro, Plumb’s). */
export const hipertensaoArterialSistemicaRecord: DiseaseRecord = {
  id: 'disease-hipertensao-sistemica',
  slug: 'hipertensao-arterial-sistemica-caes-gatos',
  title: 'Hipertensão arterial sistêmica (HAS)',
  synonyms: [
    'HAS',
    'Hipertensão sistêmica',
    'Systemic hypertension',
    'Pressão alta',
    'Hipertensão secundária',
    'Hipertensão essencial (idiopática felina)',
  ],
  species: ['dog', 'cat'],
  category: 'cardiologia',
  tags: [
    'Pressão arterial',
    'Amlodipino',
    'IECA',
    'BRA',
    'DRC',
    'Lesão-orgão-alvo',
    'Ocular',
    'Renal',
    'IRIS',
  ],
  quickSummary:
    'A HAS é definida clinicamente pela elevação sustentada da pressão arterial sistêmica (PAS) com capacidade de lesar órgãos-alvo — retina, encéfalo, rins e coração — ou pela coexistência de PAS elevada com doença renal crônica (DRC) estadiada pela IRIS, onde a pressão entra no subestadiamento. Não basta um número isolado: o diagnóstico exige repetição de medições em condições padronizadas (animal acalmado, manguito correto, técnica consistente) ou evidência de lesão atribuível à pressão. Em gatos, a hipertensão secundária à DRC e ao hipertireoidismo é frequente; existe ainda um grupo com hipertensão idiopática (diagnóstico de exclusão após investigação). Em cães, a HAS “essencial” idiopática é incomum — desconfie de causas secundárias (renal, endócrinas, iatrogenia, feocromocitoma). O tratamento combina reversão de fatores precipitantes, bloqueio do canal de cálcio (muito utilizado em felinos), modulação do RAAS (IECA/BRA) quando indicado, e metas pressóricas alinhadas às guidelines IRIS na DRC.',
  quickDecisionStrip: [
    'Cegueira súbita ou hemorragia intraocular em gato idoso: trate como urgência oftálmica e meça PA — horas contam.',
    'Nunca diagnostique HAS com uma única leitura em animal tenso, com dor ou sem manguito adequado.',
    'Em gato com DRC IRIS: a PA sistólica define subestádio (normo / borderline / hipertenso / grave) e muda metas terapêuticas.',
    'Amlodipino é espinha dorsal em muitos gatos; IECA/BRA associam-se por lógica RAAS e proteinúria — vigiar creatinina e K⁺.',
    'Antes de “idiopático felino”, exclua hipertireoidismo (T4/TSH), DRC e medicações (corticoides, mineralocorticoides).',
  ],
  quickSummaryRich: {
    lead:
      'HAS não é um número de sphygmomanómetro: é a integração entre pressão medida, tempo de exposição, órgãos-alvo e causa de base. O mesmo valor pode ser benigno num animal calmo e repetido, e maligno se associado a hemorragia retiniana. Em felinos geriátricos, o raciocínio passa quase sempre por rim e/ou tireoide; em cães, por doença sistêmica identificável.',
    leadHighlights: ['órgãos-alvo', 'repetição', 'IRIS', 'causa de base'],
    pillars: [
      {
        title: 'Por que medir mal equivale a tratar mal',
        body:
          'Manguito largo demais subestima a PA; estreito demais superestima. O animal deve estar acostumado ao procedimento; “efeito de bata branca” existe em cães e gatos. Idealmente: várias leituras em visitas distintas ou monitor domiciliar quando disponível.',
        highlights: ['manguito', 'visitas distintas'],
      },
      {
        title: 'Gato vs cão (lógica clínica)',
        body:
          'Gato: olho e cérebro são alvos dramáticos; hipertireoidismo e DRC explicam grande parte dos casos. Cão: lista de diferenciais é mais longa — renal, hipoadrenocorticismo com hipertensão em alguns cenários, feocromocitoma, iatrogenia, anemia com hipervolemia.',
        highlights: ['tireoide', 'iatrogenia'],
      },
      {
        title: 'Integração IRIS',
        body:
          'Se há DRC estável, a PAS sistólica integra o subestádio de pressão arterial. Isso não é cosmético: orienta agressividade terapêutica e frequência de seguimento.',
        highlights: ['subestádio', 'DRC estável'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (consultório)',
      steps: [
        {
          label: '1. Suspeita',
          detail:
            'Lesão-orgão-alvo (ocular, neurológico), azotemia com proteinúria, soplo + dispneia atípica, ou rastreio geriátrico de alto risco.',
        },
        {
          label: '2. Medição séria',
          detail:
            'Repouso ≥5–10 min; manguito = 40% da circunferência do membro; registo de posição e aparelho; idealmente ≥2 visitas ou série domiciliar.',
        },
        {
          label: '3. Confirmar e quantificar',
          detail:
            'Classificar faixa IRIS se DRC; documentar tendência (subir/desceu com terapia).',
        },
        {
          label: '4. Investigar causa',
          detail:
            'Bioquímica completa, SDMA, urinálise, UPC, T4/TSH (gato idoso), imagem se massa abdominal; rever fármacos.',
        },
        {
          label: '5. Tratar e reavaliar',
          detail:
            'Meta pressórica individualizada; creatinina e eletrólitos 5–7 dias após IECA/BRA; fundo de olho seriado se lesão.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento (lógica por camadas)',
      steps: [
        {
          label: 'Camada 0 — Causa reversível',
          detail: 'Corrigir hipertireoidismo, suspender/ajustar corticoide, otimizar hidratação do nefropata antes de RAAS.',
        },
        {
          label: 'Camada 1 — Anti-hipertensivo de base',
          detail:
            'Em muitos gatos: bloqueador do canal de cálcio (anlodipino é o mais citado) — titular até meta ou tolerância.',
        },
        {
          label: 'Camada 2 — RAAS',
          detail: 'IECA ou BRA quando proteinúria, ICC com contexto, ou combinação necessária — monitorizar função renal.',
        },
        {
          label: 'Camada 3 — Urgência',
          detail: 'Crise neurológica ou olho com ameaça visual: abordagem hospitalar com fármacos de curta duração e vigilância intensiva.',
        },
      ],
    },
  },
  etiology: {
    visaoGeral:
      'A pressão arterial sistêmica reflete o produto hemodinâmico (débito cardíaco × resistência vascular periférica) e modulações neuro-humorais (simpático, RAAS, ADH). HAS surge quando um ou mais destes eixos permanece desregulado: vasoconstrição excessiva, retenção volémica, ou ambos. A lesão endotelial crônica perpetua remodelação vascular e reduz compliance — o que torna o controle mais difícil se o tratamento for tardio.',
    causasRenais:
      'DRC por perda de néfrons, ativação do RAAS, disfunção endotelial e alteração do manejo de sódio/água. Hipertensão pode acelerar proteinúria e nefroesclerose — ciclo vicioso com a HAS. Em agudo renal, fluidos e toxinas podem alterar a PA; estadiar só com paciente estável.',
    causasEndocrinas:
      'Hipertireoidismo felino (aumento do débito, sensibilidade adrenérgica); hiperadrenocorticismo canino (volume, resistência); feocromocitoma (crises de catecolaminas); diabetes mellitus (comorbidades vasculares e renal); hiperaldosteronismo primário ou secundário em cenários selecionados.',
    causasHematologicasVolume:
      'Anemia severa compensada com hipervolemia; politransfusão; eritropoietina exógena — mecanismo de “excesso de fluido para o circuito” ou alteração da viscosidade.',
    causasIatrogenicas:
      'Glicocorticoides sistémicos ou tópicos absorvíveis em dose elevada; mineralocorticoides; descongestionantes simpaticomiméticos; certos anabolizantes ou eritropoietina; excesso de fluidos IV em cardiopata ou nefropata sem ajuste.',
    causasCao:
      'Resumo prático: renal (crônico ou agudo complicado), endócrino (Cushing, feocromocitoma, tireoide), volume (anemia, transfusão), iatrogenia. HAS essencial idiopática no cão é diagnóstico raro e de exclusão cuidadosa.',
    causasGato:
      'DRC e hipertireoidismo cobrem a maioria dos casos com explicação fisiopatológica. Hipertensão idiopática permanece diagnóstico de exclusão: rastreio negativo para rim e tireoide, repetidas medições elevadas, ou lesão-orgão-alvo com padrão compatível. Alguns gatos apresentam hipertensão antes de creatinina anormal — vigilância renal contínua.',
  },
  epidemiology: {
    resumo:
      'A HAS documentada é particularmente relevante em gatos idosos com DRC — prevalência variável conforme população, mas suficientemente alta para justificar rastreio pressórico na geriatria felina com azotemia ou proteinúria. Em cães, a HAS costuma ser “sinal de outra doença”; a prevalência de hipertensão essencial isolada é baixa comparativamente.',
    notaRastreio:
      'Rastreio ativo (PA em consulta) em: gato geriátrico com DRC IRIS; gato com hipertireoidismo tratado ou suspeita; qualquer animal com alterações de fundo de olho inexplicadas; cão com proteinúria glomerular ou doença endócrina compatível.',
  },
  pathogenesisTransmission: {
    neurohumoral:
      'Ativação crônica do RAAS e do simpático eleva resistência vascular e retenção de sódio/água. Em nefropatas, a redução da perfusão renal percebida reforça angiotensina II e aldosterona — mesmo quando a creatinina ainda é limítrofe.',
    endotelio:
      'Disfunção endotelial reduz óxido nítrico, aumenta endotelina e favorece vasoconstrição e inflamação de parede — contribuindo para rigidez arterial.',
    orgaoAlvo:
      'Microvasculatura retiniana e encefálica têm autorregulação limitada quando a PAS ultrapassa limitares; ocorre extravasamento, edema e isquemia. No rim, elevação da pressão glomerular agrava proteinúria.',
    nota:
      'Não é doença contagiosa. Mecanismos são multifatoriais e sobrepostos — o mesmo animal pode ter DRC + tireoide + medicação parcialmente contributiva.',
  },
  pathophysiology:
    'Olho: a barreira hemato-retiniana e a autoregulação falham; hemorragias intra-retinianas, descolamento seroso ou rhegmatógeno, edema de papila e, em extremos, amaurose súbita. Encéfalo: edema vasogênico ou hemorragia em crise hipertensiva (convulsões, alteração do nível de consciência, déficits focais). Rim: hiperfiltração, proteinúria e progressão de fibrose. Coração: sobrecarga de pressão e, em comorbidades, pior tolerância à ICC pré-existente. A gravidade depende da magnitude da PA, da rapidez de instalação e da vulnerabilidade individual (idade, comorbidades).',
  clinicalSignsPathophysiology: [
    {
      system: 'ocular',
      findings: [
        'Agudo: hemorragias retinianas em múltiplos quadrantes, descolamento de retina, hemorragia vítrea, edema papilar — amaurose se não tratado de imediato.',
        'Subagudo/crônico: alterações hipertensivas de fundo de olho, perda visual progressiva; dor ocular variável.',
        'Miopia secundária a alterações lenticulares foi descrita em humanos; em veterinária o foco é retina e papila.',
      ],
    },
    {
      system: 'renal',
      findings: [
        'Proteinúria que pode agravar com HAS; piora da função renal se hipoperfusão ou nefrotoxicidade associada.',
        'PU/PD podem refletir DRC de base mais do que a HAS isoladamente.',
      ],
    },
    {
      system: 'neurologic',
      findings: [
        'Crise hipertensiva: convulsões, ataxia, cegueira súbita, alteração comportamental, coma em casos extremos.',
        'Diferencial obrigatório: hipoglicemia, toxinas, SHU felina, massa intracraniana — a PA ajuda mas não substitui neuroimagem quando indicada.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Sopro funcional ou taquicardia por hipertireoidismo ou dor; sobrecarga de VE em comorbidades cardíacas.',
        'Hemorragia nasal epistaxe rara como único sinal — pensar coagulopatia ou trauma.',
      ],
    },
    {
      system: 'endocrine',
      findings: [
        'Em hipertireoidismo: emagrecimento com apetite aumentado, hiperactividade, pelagem pobre; em Cushing canino: polifagia, alterações de pele, hepatomegalia.',
      ],
    },
  ],
  diagnosis: {
    criteriosMedicao:
      'Utilizar manguito com largura ≈ 30–40% da circunferência do membro no ponto de medição; posição consistente (lateral vs dorsal conforme protocolo do serviço). Doppler sobre artéria medialmente (ex.: radial, palmar) com sensor adequado ao tamanho. Oscilometria pode ser útil em cães de porte médio/grande com algoritmo validado — em gatos, conferir confiabilidade do aparelho. Repetir em ≥2 ocasiões antes de rotular hipertensão “estável”; documentar horário e medicações.',
    tabelaIrisFaixasPressao: {
      kind: 'clinicalTable',
      headers: ['PAS sistólica (mmHg)', 'Subestádio IRIS (DRC)', 'Significado clínico (síntese)'],
      rows: [
        [
          '< 140',
          'Normotenso',
          'Sem subestadiamento por PA; continuar vigilância se DRC.',
        ],
        [
          '140–159',
          'Borderline',
          'Risco aumentado; repetir medições; considerar intervenção conforme proteinúria e lesão-orgão-alvo.',
        ],
        [
          '160–179',
          'Hipertenso',
          'Tratamento anti-hipertensivo habitualmente indicado; metas de redução conforme guideline.',
        ],
        [
          '≥ 180',
          'Gravemente hipertenso',
          'Risco alto de lesão-orgão-alvo; intervenção mais urgente; frequentemente combinação terapêutica.',
        ],
      ],
    },
    notaTabelaIris:
      'Valores orientativos segundo consenso IRIS para classificação em DRC estável; confirmar sempre a edição vigente do guideline no site IRIS. Em animais sem DRC, a mesma gravidade de números exige interpretação clínica (lesão-orgão-alvo vs variabilidade).',
    tabelaMetasIris: {
      kind: 'clinicalTable',
      headers: ['Contexto', 'Interpretação prática'],
      rows: [
        [
          'DRC estável — sem lesão-orgão-alvo',
          'Objetivo: reduzir PAS para faixa compatível com guideline; integrar com controle de proteinúria e fósforo.',
        ],
        [
          'Com lesão-orgão-alvo (olho, SNC)',
          'Tratamento prioritário da PA; reavaliação oftálmica/neurológica seriada; não adiar por “valores limítrofes”.',
        ],
        [
          'Monitor domiciliar (felino)',
          'Correlacionar com consultório; útil para “efeito hospital” e titulação de anlodipino.',
        ],
      ],
    },
    diferencialDiagnostico: {
      kind: 'clinicalTable',
      headers: ['Situação', 'Pode mimetizar ou coexistir com HAS'],
      rows: [
        ['Stress / dor / luta no consultório', 'PA artificialmente elevada — repetir em casa ou sedar com critério para outros exames'],
        ['Hipertireoidismo não diagnosticado', 'Taquicardia, perda de peso; T4/TSH'],
        ['Doença cardíaca primária', 'ICC por outras causas — ecocardiografia'],
        ['Anemia severa', 'Murmúrio funcional, taquicardia compensatória — hemograma'],
        ['Intoxicações (ex.: teofilina, estimulantes)', 'História de exposição, outros sinais sistémicos'],
      ],
    },
    investigacaoCausa:
      'Mínimo: hemograma, bioquímica (ureia, creatinina, SDMA, eletrólitos), urinálise com sedimento, razão UPC se proteinúria dipstick. Gato idoso: T4 e, se indicado, TSH livre / painel tireoidiano conforme laboratório. Imagem: abdômen se massa ou azotemia desproporcional. Revisão de fármacos: corticoides, AINEs, descongestionantes, suplementos. Oftalmologia: fundo de olho indireto após midríase quando seguro; pressão intraocular se protocolo.',
  },
  treatment: {
    farmacosResumo: {
      kind: 'clinicalTable',
      headers: ['Classe', 'Papel típico', 'Cautelas principais'],
      rows: [
        [
          'Bloqueador canal de cálcio (p.ex. anlodipino)',
          'Eixo central em muitos gatos; reduz resistência vascular periférica',
          'Hipotensão postural, bradicardia relativa; titular; ver monografia no app',
        ],
        [
          'IECA (p.ex. benazepril)',
          'RAAS; proteinúria; alguns protocolos cardiorrenais',
          'Creatinina e K⁺ 5–7 d após início; evitar em desidratação aguda',
        ],
        ['BRA', 'Alternativa IECA ou combinação selecionada', 'Mesmas vigilâncias; gravidez'],
        [
          'Outros (prazosina, hidralazina, fenoldopam IV)',
          'Crises, hospitalização, casos refratários',
          'Monitorização contínua; seguir centro de referência',
        ],
      ],
    },
    estrategiaTitulacao:
      'Começar com monoterapia de efeito comprovado no espécime (muitas vezes anlodipino no gato); reavaliar PA em 1–2 semanas. Se meta não atingida e função renal estável, associar IECA/BRA com plano laboratorial. Em nefropata azotêmico, introduzir RAAS com cautela e hidratação adequada. Documentar peso, apetite e creatinina a cada escalada.',
    urgenciaOftalmologica:
      'Hemorragia retiniana extensa ou descolamento com visão ameaçada: estabilizar PA rapidamente (protocolo hospitalar), envolver oftalmologia veterinária, informar tutor sobre prognóstico visual mesmo com terapia correta.',
    abordagem:
      'Tratar sempre a causa de base em paralelo (tireoidectomia / metimazol, controle de diabetes, suspensão de fármaco precipitante). Integrar doses com as monografias do aplicativo (anlodipino, benazepril, etc.). HAS + DRC: o tratamento é longitudinal — ajustar metas quando a função renal oscila.',
  },
  prevention:
    'Rastreio pressórico em gatos geriátricos com DRC ou em risco tireoidiano; controle de peso; evitar nefrotóxicos desnecessários; em animais em IECA/BRA, tutores devem reconhecer sinais de desidratação (vómito, diarreia) e procurar assistência precoce. Não há “profilaxia farmacológica” universal sem indicação.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['benazepril'],
  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
  references: [
    {
      id: 'ref-nelson-has',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — distúrbios cardiovasculares, hipertensão sistêmica e abordagem por órgão.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-iris-bp',
      citationText:
        'IRIS Kidney. IRIS Guidelines — staging of CKD, blood pressure assessment and management (edição vigente no site).',
      sourceType: 'Diretriz',
      url: 'http://iris-kidney.com/guidelines/',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-bsava-nu-htn',
      citationText:
        'Elliott J, Grauer GF, Westropp JL (eds). BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd ed., 2017 — hipertensão sistêmica e interação com doença renal.',
      sourceType: 'Manual',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-plumb-antihtn',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — anlodipino, benazepril, bloqueadores do RAAS, anti-hipertensivos.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta (doses)',
    },
    {
      id: 'ref-klein-vascular',
      citationText:
        'Klein BG. Cunningham’s Textbook of Veterinary Physiology, 6th ed., 2020 — regulação da pressão arterial e débito.',
      sourceType: 'Fisiologia',
      url: null,
      evidenceLevel: 'Didático',
    },
  ],
  isPublished: true,
  source: 'seed',
};
