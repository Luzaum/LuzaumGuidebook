import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Registro canônico de colapso traqueal canino.
 *
 * Organização editorial:
 * - uma decisão clínica por bloco;
 * - livros-texto para fundamentos e artigos recentes para pontos que mudaram a prática;
 * - doses, duração, mecanismo e reavaliação aparecem no ponto de decisão clínica;
 * - ACVS é identificado como revisão especializada, não como consenso.
 */
export const colapsoTraquealCaninoRecord: DiseaseRecord = {
  id: 'disease-colapso-traqueal-canino',
  slug: 'colapso-traqueal-canino',
  title: 'Colapso Traqueal — Cães',
  subtitle: 'Doença dinâmica das vias aéreas centrais: reconhecimento, diagnóstico e tratamento',
  synonyms: [
    'Colapso traqueal canino',
    'Traqueomalácia',
    'Traqueobroncomalácia',
    'Tracheal collapse',
    'Collapsing trachea',
    'Canine tracheal collapse syndrome',
    'Tosse em grasnado de ganso',
    'Goose honk',
  ],
  species: ['dog'],
  category: 'respiratorio',
  tags: [
    'Tosse crônica',
    'Via aérea central',
    'Cães de pequeno porte',
    'Fluoroscopia',
    'Traqueobroncoscopia',
    'Broncomalácia',
    'Stent traqueal',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['colapso-traqueal-canino'],
  quickSummary:
    'Doença crônica em que a traqueia perde rigidez e estreita de forma dinâmica ou fixa. A manifestação mais comum é tosse seca paroxística, mas dispneia, cianose e síncope indicam obstrução grave. O diagnóstico combina fenótipo clínico, radiografias e avaliação dinâmica; o tratamento começa por controle de peso, peitoral, redução de gatilhos e terapia médica individualizada. Intervenção é reservada principalmente a obstrução respiratória refratária.',
  quickDecisionStrip: [
    'Dispneia, cianose, exaustão ou síncope: oxigênio, ambiente calmo e mínima manipulação antes de exames.',
    'Radiografia sem colapso não exclui doença dinâmica; fluoroscopia e broncoscopia esclarecem casos discordantes.',
    'Tratar o fenótipo e as comorbidades — não o percentual de colapso isoladamente.',
    'Peso adequado, peitoral e afastamento de fumaça, calor e excitação são parte central do tratamento.',
    'Stent ou prótese extraluminal: considerar em centro experiente quando a obstrução permanece grave apesar do manejo médico.',
  ],
  quickSummaryRich: {
    lead:
      'A pergunta que organiza o caso é: predomina tosse crônica ou obstrução respiratória? Tosse sem instabilidade costuma permitir investigação e manejo médico graduais. Dispneia, cianose, exaustão ou síncope mudam a prioridade para estabilização. A localização também importa: o segmento cervical tende a estreitar na inspiração; a traqueia intratorácica e os brônquios, na expiração e na tosse.',
    leadHighlights: ['tosse crônica', 'obstrução respiratória', 'estabilização', 'inspiração', 'expiração'],
    pillars: [
      {
        title: 'Defina o fenótipo',
        body:
          'Tosse-dominante, obstrução-dominante ou misto. Intensidade da tosse e grau anatômico podem divergir; a decisão deve integrar qualidade de vida, ventilação, anatomia e doenças concomitantes.',
        highlights: ['Tosse-dominante', 'obstrução-dominante', 'podem divergir'],
      },
      {
        title: 'Use imagem dinâmica',
        body:
          'Radiografias são úteis para triagem e diferenciais, mas registram um instante. Fluoroscopia mostra a variação durante o ciclo respiratório e a tosse; broncoscopia detalha traqueia, brônquios e mucosa.',
        highlights: ['Radiografias', 'Fluoroscopia', 'broncoscopia'],
      },
      {
        title: 'Comece pelo que modifica carga',
        body:
          'Perda de peso quando necessária, peitoral, redução de irritantes e controle das comorbidades diminuem o trabalho respiratório e os gatilhos da tosse. Fármacos são escolhidos conforme o componente dominante.',
        highlights: ['Perda de peso', 'peitoral', 'comorbidades'],
      },
    ],
    diagnosticFlow: {
      title: 'Rota diagnóstica',
      steps: [
        {
          label: '1. Estabilidade primeiro',
          timing: 'Imediato',
          detail:
            'Se houver cianose, exaustão ou esforço respiratório intenso, fornecer oxigênio, reduzir estímulos e adiar contenção, radiografias ou indução de tosse até estabilizar.',
        },
        {
          label: '2. Fenótipo e localização provável',
          timing: 'Consulta inicial',
          detail:
            'Caracterizar tosse, ruído, gatilhos, síncope e fase respiratória predominante. Auscultar vias aéreas e coração e pesquisar obesidade, doença laríngea, bronquite e cardiopatia.',
        },
        {
          label: '3. Radiografias direcionadas',
          timing: 'Triagem',
          detail:
            'Obter pescoço e tórax, idealmente com fases inspiratória e expiratória úteis. Avaliar também parênquima, coração e diagnósticos diferenciais.',
          limitations: 'Exame estático: pode subestimar ou não registrar o ponto de maior colapso.',
        },
        {
          label: '4. Avaliação dinâmica',
          timing: 'Discordância ou planejamento',
          detail:
            'Fluoroscopia durante respiração espontânea e, quando seguro, tosse provocada, para mapear traqueia e brônquios. Radiografia negativa não encerra a investigação se a suspeita permanece alta.',
        },
        {
          label: '5. Endoscopia selecionada',
          timing: 'Estadiamento e comorbidades',
          detail:
            'Laringoscopia e traqueobroncoscopia permitem inspeção direta, graduação, avaliação de broncomalácia e coleta de amostras quando inflamação ou infecção são suspeitas.',
          limitations: 'Exige anestesia e planejamento cuidadoso, especialmente em obstrução grave.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Rota terapêutica',
      steps: [
        {
          label: '1. Reduzir carga e gatilhos',
          detail:
            'Peso saudável, peitoral, ambiente fresco, afastamento de fumaça/aerossóis e redução de excitação. Tratar doença laríngea, bronquite, infecção documentada e cardiopatia quando presentes.',
          duration: 'Permanente.',
        },
        {
          label: '2. Interromper o ciclo da tosse',
          detail:
            'Em tosse seca e improdutiva, escolher um único antitussígeno opioide: butorfanol VO (0,55 mg/kg q6–12h), hidrocodona VO (0,2–0,5 mg/kg q6–12h) ou codeína VO (1–2 mg/kg q6–12h). A codeína é alternativa de menor evidência e resposta menos previsível. Evitar supressão quando há secreção abundante, pneumonia ou depuração mucociliar comprometida.',
          reassess: 'Contato em 48–72 horas; consulta em até 7–14 dias. Verificar paroxismos, sono, exercício, sedação e constipação.',
        },
        {
          label: '3. Tratar o componente coexistente',
          detail:
            'Corticosteroide curto é reservado a inflamação de mucosa. Broncodilatador não corrige a cartilagem: usar apenas em doença de vias aéreas inferiores/broncoespasmo. Antimicrobiano somente quando citologia, cultura e quadro sustentarem infecção.',
          reassess: 'Corticosteroide: 7–14 dias. Broncodilatador: teste de 1–2 semanas e manter apenas se houver benefício objetivo.',
        },
        {
          label: '4. Reavaliar resposta',
          detail:
            'Usar diário de tosse, tolerância ao exercício, eventos de cianose/síncope, peso e efeitos adversos. Exacerbação persistente exige revisar diagnóstico e comorbidades antes de apenas escalar fármacos.',
        },
        {
          label: '5. Encaminhar se obstrução refratária',
          detail:
            'Discutir prótese extraluminal ou stent conforme localização, extensão, anatomia e experiência do centro. Tosse isolada é indicação menos previsível do que falha ventilatória.',
          reassess: 'Consentimento deve incluir tosse persistente e complicações do implante.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Colapso traqueal é redução excessiva do lúmen por perda de sustentação da parede: condromalácia e achatamento dos anéis, redundância/prolapso da membrana dorsal ou, em alguns cães, malformação mais fixa dos anéis com configuração em W. “Traqueobroncomalácia” é o termo mais amplo quando os brônquios também participam.',
    classificacaoAnatomica: {
      kind: 'clinicalTable' as const,
      caption: 'Localização e comportamento esperado',
      headers: ['Componente', 'Fase em que tende a piorar', 'Implicação clínica'],
      rows: [
        ['Cervical / extratorácico', 'Inspiração', 'Esforço inspiratório e ruído de via aérea superior podem predominar.'],
        ['Intratorácico', 'Expiração e tosse', 'Esforço expiratório, tosse e fechamento dinâmico ganham importância.'],
        ['Bronquial', 'Expiração e tosse', 'Pode manter sinais mesmo após tratamento apenas da traqueia.'],
        ['Malformação estática', 'Menos dependente da fase', 'Estreitamento pode persistir ao longo do ciclo respiratório.'],
      ],
    },
    fatoresAgravantes: [
      'Obesidade, calor, excitação e esforço aumentam demanda ventilatória e podem precipitar sinais.',
      'Tração cervical, fumaça, aerossóis e outros irritantes favorecem tosse e inflamação.',
      'Infecção respiratória, intubação recente, doença periodontal, bronquite e obstrução de via aérea superior podem desencadear exacerbações.',
      'Cardiopatia pode coexistir na mesma população; tosse não deve ser atribuída automaticamente ao coração nem à traqueia.',
    ],
    limitesDoConceito:
      'Colapso traqueal, broncomalácia, hipoplasia traqueal, compressão extrínseca e estenose fixa não são sinônimos. A conduta e o prognóstico dependem do mecanismo e do segmento realmente demonstrados.',
  },
  epidemiology: {
    perfilClassico:
      'O fenótipo clássico ocorre em cães toy e miniatura, frequentemente de meia-idade a idosos. Yorkshire Terrier, Pomeranian, Poodle, Maltês, Chihuahua e Pug aparecem repetidamente nos livros-texto e séries clínicas, mas qualquer raça pode ser afetada.',
    evidenciaRecente: [
      'Kim et al. (2024): entre 110 cães de pequeno porte avaliados por fluoroscopia, 68,1% tinham colapso de brônquio principal; menor porte, idade maior e obesidade associaram-se a maior risco, e o grau fluoroscópico correlacionou-se mal com a intensidade da tosse.',
      'Weisse et al. (2026): em uma única instituição, 739 de 11.061 Yorkshire Terriers (6,7%) tinham síndrome grave documentada, com mediana de 10 anos ao diagnóstico. O desenho de centro único impede extrapolar esse número para toda a raça.',
    ],
    notaSobreGatos:
      'Colapso traqueal primário é raro em gatos. Quando houver estreitamento traqueal felino, investigar primeiro massa, corpo estranho, trauma, intubação e outras causas de obstrução. Doses e protocolos definidos para cães não devem ser extrapolados ao gato.',
  },
  pathogenesisTransmission: {
    cascataMecanica: [
      'Predisposição estrutural ou dano adquirido reduz a rigidez dos anéis e/ou aumenta a flacidez da membrana dorsal.',
      'As variações de pressão do ciclo respiratório estreitam o lúmen vulnerável.',
      'Fluxo turbulento e contato da mucosa provocam tosse e inflamação.',
      'Tosse eleva pressões, traumatiza a mucosa e piora o fechamento dinâmico.',
      'Depuração mucociliar deficiente, secreção e doenças concomitantes perpetuam o ciclo.',
    ],
    pontoChave:
      'A doença é multifatorial e geralmente progressiva. Não há agente transmissível: infecções respiratórias podem agravar um paciente predisposto, mas não constituem a causa única da síndrome estrutural.',
  },
  pathophysiology: {
    mecanicaRespiratoria:
      'Quando a pressão fora da via aérea supera a pressão intraluminal, a parede vulnerável se desloca para dentro. No segmento cervical, isso tende a ocorrer na inspiração; dentro do tórax, na expiração e sobretudo na tosse. O ponto de maior estreitamento pode mudar entre fases e posições.',
    consequencias: [
      'Aumento da resistência e do trabalho respiratório, especialmente quando o lúmen se reduz muito.',
      'Turbulência, vibração da membrana dorsal e estímulo de receptores da tosse.',
      'Hipoxemia, cianose e exaustão nos episódios obstrutivos graves.',
      'Síncope potencialmente multifatorial: hipoxemia, alterações hemodinâmicas da tosse, reflexos vagais ou hipertensão pulmonar concomitante.',
      'Broncomalácia, colapso faríngeo/laríngeo e inflamação de vias aéreas podem limitar a resposta a uma intervenção apenas traqueal.',
    ],
  },
  clinicalSignsPathophysiology: {
    sinais: [
      {
        system: 'Apresentação típica',
        findings: [
          {
            finding: 'Tosse seca, áspera e paroxística (“grasnado de ganso”)',
            mechanism: 'Turbulência e trauma da mucosa em uma via aérea instável.',
            clinicalMeaning: 'Característica, mas não patognomônica.',
            priority: 'common',
          },
          {
            finding: 'Ânsia ou engasgo ao final do paroxismo',
            mechanism: 'Estimulação traqueal intensa e sequência prolongada de tosse.',
            priority: 'common',
          },
          {
            finding: 'Piora com excitação, exercício, calor, ingestão ou coleira',
            mechanism: 'Maior fluxo, pressão e estímulo mecânico da traqueia.',
            priority: 'common',
          },
        ],
      },
      {
        system: 'Obstrução avançada',
        findings: [
          {
            finding: 'Dispneia, estridor/estertor ou esforço respiratório',
            mechanism: 'Estreitamento crítico da via aérea central.',
            clinicalMeaning: 'Distinguir fase inspiratória de expiratória ajuda a localizar o componente dominante.',
            priority: 'emergency',
          },
          {
            finding: 'Cianose, exaustão ou síncope',
            mechanism: 'Falha ventilatória e/ou consequências hemodinâmicas da tosse.',
            clinicalMeaning: 'Emergência; estabilizar antes de provocar tosse ou obter imagem.',
            priority: 'emergency',
          },
        ],
      },
    ],
    gatilhosComuns: ['Excitação', 'Exercício', 'Calor', 'Fumaça e aerossóis', 'Tração na coleira', 'Alimentação ou ingestão de água'],
    diagnosticosDiferenciais: [
      'Bronquite crônica e outras doenças inflamatórias de vias aéreas inferiores.',
      'Complexo respiratório infeccioso canino, pneumonia e parasitos respiratórios conforme epidemiologia.',
      'Doença laríngea, síndrome obstrutiva dos braquicefálicos e colapso faríngeo.',
      'Doença valvar mitral com ou sem insuficiência cardíaca; tosse e sopro podem coexistir sem edema pulmonar.',
      'Massa, corpo estranho, estenose, hipoplasia traqueal ou compressão extrínseca.',
    ],
  },
  diagnosis: {
    abordagem: [
      {
        stepNumber: 1,
        title: 'Estabilizar e definir o problema dominante',
        description:
          'Diferenciar tosse crônica estável de obstrução aguda. Em dispneia importante, priorizar oxigênio e mínima manipulação; não provocar tosse para “confirmar” o diagnóstico.',
        purpose: 'Segurança e triagem do fenótipo.',
      },
      {
        stepNumber: 2,
        title: 'História e exame cardiorrespiratório completos',
        description:
          'Registrar gatilhos, fase do ruído, tolerância ao exercício, cianose/síncope, peso e fármacos. Avaliar laringe/vias aéreas superiores quando indicado e auscultar coração e pulmões.',
        purpose: 'Identificar fatores agravantes e diagnósticos concorrentes.',
      },
      {
        stepNumber: 3,
        title: 'Radiografias cervicais e torácicas',
        description:
          'Usar projeções que incluam pescoço, entrada torácica e tórax, com fases inspiratória/expiratória quando tecnicamente possíveis. Avaliar parênquima, brônquios e silhueta cardíaca.',
        purpose: 'Triagem do colapso e dos diferenciais.',
        limitations:
          'Radiografia é estática. Macready et al. e estudos posteriores demonstram subestimação; Suematsu et al. (2025) encontraram radiografias discretas ou sem colapso em 14,1% de cães com grau IV confirmado por broncoscopia.',
      },
      {
        stepNumber: 4,
        title: 'Fluoroscopia dinâmica',
        description:
          'Avaliar vários ciclos respiratórios e, quando seguro, tosse induzida, mapeando traqueia, carina e brônquios principais.',
        purpose: 'Demonstrar localização, fase e extensão do colapso funcional.',
        limitations: 'Disponibilidade, radiação, posicionamento e cooperação influenciam o exame.',
      },
      {
        stepNumber: 5,
        title: 'Laringoscopia e traqueobroncoscopia',
        description:
          'Inspecionar laringe, membrana dorsal, anéis, carina e árvore brônquica; coletar lavado/escovado quando a investigação de inflamação ou infecção mudar a conduta.',
        purpose: 'Caracterização anatômica direta e pesquisa de comorbidades.',
        limitations: 'Anestesia modifica a dinâmica e acrescenta risco em obstrução grave; requer equipe preparada para recuperação.',
        isGoldStandard: true,
      },
    ],
    graduacaoEndoscopica: {
      kind: 'clinicalTable' as const,
      caption: 'Graduação anatômica tradicional — interpretar junto ao quadro clínico',
      headers: ['Grau', 'Redução aproximada do lúmen', 'Leitura prática'],
      rows: [
        ['I', '25%', 'Alteração leve; pequena variação pode ocorrer fisiologicamente.'],
        ['II', '50%', 'Colapso moderado.'],
        ['III', '75%', 'Colapso acentuado.'],
        ['IV', '90–100%', 'Aposição quase completa ou completa.'],
      ],
    },
    interpretacaoIntegrada:
      'Não transformar a graduação em indicação automática de stent. Kim et al. (2024) observaram correlação fraca entre grau fluoroscópico e tosse; a indicação deve integrar obstrução, qualidade de vida, extensão brônquica, comorbidades e resposta ao tratamento.',
    examesComplementares:
      'Hemograma, bioquímica, investigação infecciosa/parasitária, ecocardiografia e avaliação de hipertensão pulmonar são selecionados pela história, exame e imagem — não como painel obrigatório idêntico para todos.',
  },
  treatment: {
    decisaoInicial:
      'A primeira decisão é estabilidade. Crise obstrutiva exige oxigênio com mínimo estresse, ambiente fresco e controle rápido da tosse/agitação; falha ventilatória pode exigir intubação e ventilação. Evitar radiografias, contenção intensa e indução de tosse até recuperar ventilação e coloração de mucosas.',
    ordemDePrioridadeEstruturada: [
      {
        title: '1. Medidas mecânicas e ambientais',
        summary:
          'Substituir coleira por peitoral, instituir perda de peso se necessário e reduzir calor, fumaça, aerossóis e excitação. Corrigir doenças de via aérea superior e tratar comorbidades demonstradas.',
        duration: 'Contínua.',
        reassess: 'Revisão em 2–4 semanas; depois a cada 3–6 meses quando estável. Registrar peso, escore corporal, paroxismos e tolerância ao exercício.',
        evidence: 'Ettinger 9ª ed.; Nelson & Couto 6ª ed.; ACVS.',
      },
      {
        title: '2. Controlar tosse seca e inflamação quando presentes',
        summary:
          'Antitussígeno pode quebrar o ciclo tosse–trauma–inflamação. Corticosteroide sistêmico deve ser curto e individualizado; via inalatória é alternativa quando há componente inflamatório e necessidade de reduzir exposição sistêmica.',
        options:
          'Antitussígeno — escolher apenas um:\n• butorfanol 0,55 mg/kg VO q6–12h (até 1,1 mg/kg se necessário)\n• hidrocodona 0,2–0,5 mg/kg VO q6–12h\n• codeína 1–2 mg/kg VO q6–12h (alternativa de menor evidência)\nInflamação de mucosa:\n• prednisona/prednisolona em curso com desmame\n• fluticasona 110–220 µg/puff, 1 puff por via inalatória q6–12h',
        duration:
          '• Antitussígeno: teste curto e menor frequência eficaz\n• Corticosteroide sistêmico: curso limitado com desmame\n• Fluticasona: avaliar resposta em 2–4 semanas',
        reassess:
          '• Contato em 48–72h para tosse intensa\n• Consulta em até 7–14 dias: avaliar paroxismos, sono, exercício, sedação, constipação, polifagia e PU/PD',
        evidence: 'Ettinger 9ª ed.; Nelson & Couto 6ª ed.; Talavera-López et al. (2023).',
      },
      {
        title: '3. Tratar apenas o componente comprovado',
        summary:
          'Broncodilatador é selecionado para doença de vias aéreas inferiores/broncoespasmo, não para “endurecer” a traqueia. Antimicrobiano não é rotina: usar quando citologia, cultura e quadro clínico sustentarem infecção.',
        options:
          'Broncoespasmo ou pequenas vias aéreas:\n• terbutalina 0,625–5 mg/cão VO q8–12h\n• teofilina de liberação prolongada 10 mg/kg VO q12h\n• Nota: Não associar automaticamente e não usar como tratamento isolado',
        duration: 'Teste terapêutico de 1–2 semanas; manter somente se houver melhora objetiva.',
        reassess:
          'Em 7–14 dias: frequência cardíaca e ritmo, tremores/agitação, sinais gastrointestinais, esforço respiratório e diário de tosse.',
        evidence: 'Nelson & Couto 6ª ed.; Ettinger 9ª ed.',
      },
      {
        title: '4. Encaminhar obstrução grave refratária',
        summary:
          'Prótese extraluminal é opção sobretudo para segmentos cervicais acessíveis; stent intraluminal pode abranger doença extensa ou intratorácica. Seleção depende da anatomia, experiência do centro e capacidade de seguimento.',
        reassess: 'Tosse, infecção, tecido de granulação, fratura, migração e colapso fora do segmento tratado.',
        evidence: 'ACVS; Robin et al. (2024); Suematsu et al. (2026).',
      },
    ],
    terapiaFarmacologica:
      'Escolher fármaco pelo problema dominante: antitussígeno para tosse seca e improdutiva; corticosteroide para inflamação de mucosa; sedativo apenas quando ansiedade/agitação amplia a obstrução; broncodilatador somente com doença de pequenas vias aéreas ou broncoespasmo. Não associar empiricamente butorfanol, hidrocodona e codeína: selecionar um opioide, começar pela menor dose eficaz, definir prazo de resposta e retirar o que não demonstrar benefício.',
    protocolosCriseObstrutiva: [
      {
        drug: 'Butorfanol — crise obstrutiva',
        indication: 'Tosse seca paroxística com agitação ou dispneia, após iniciar oxigênio e mínima manipulação.',
        dose: '0,05–0,2 mg/kg',
        frequency: 'q4–6h, conforme resposta',
        route: 'SC',
        duration: 'Durante a estabilização; não converter automaticamente em uso crônico.',
        mechanism:
          'Agonismo opioide κ com antagonismo/agonismo parcial μ; eleva o limiar central da tosse e fornece sedação de curta duração.',
        reassess:
          'Monitorização contínua de esforço, SpO₂, coloração, nível de consciência e capacidade de eliminar secreções. Escalonar via aérea se houver fadiga, hipoxemia ou obstrução persistente.',
        cautions:
          'Pode causar sedação, ataxia, bradicardia e depressão respiratória. Reduzir dose com outros depressores do SNC e em cães MDR1; evitar supressão da tosse quando há secreção abundante.',
        contraindications: 'Hipersensibilidade; extrema cautela em disfunção hepática/renal grave e doença respiratória secretória.',
        notes: 'Ettinger 9ª ed. descreve esta faixa para estabilização aguda. Naloxona pode reverter efeitos opioides clinicamente importantes.',
      },
      {
        drug: 'Acepromazina — adjuvante para agitação',
        indication: 'Agitação que aumenta esforço e fechamento dinâmico, somente se perfusão e pressão arterial forem adequadas.',
        dose: '0,01–0,05 mg/kg; faixa publicada até 0,1 mg/kg',
        frequency: 'Dose única; aguardar 15–30 min antes de considerar reforço',
        route: 'SC, IM ou IV lenta',
        duration: 'Efeito usual 3–4h; pode persistir 6–8h.',
        mechanism:
          'Fenotiazínico com bloqueio dopaminérgico central e α₁-adrenérgico; reduz excitação, mas não produz analgesia e não possui reversor específico.',
        reassess: 'Pressão arterial, temperatura, ventilação e sedação após 5–15 minutos e até recuperação.',
        cautions:
          'Preferir a extremidade baixa da faixa, sobretudo com opioide. Pode causar hipotensão, hipotermia e sedação prolongada; maior sensibilidade em MDR1.',
        contraindications: 'Evitar em choque, hipotensão, hipovolemia/desidratação, anemia importante ou disfunção hepática grave.',
        notes: 'Não substitui oxigênio nem controle da tosse. Epinefrina não é o vasopressor de escolha na hipotensão por fenotiazínico.',
      },
    ],
    protocolosAmbulatoriais: [
      {
        drug: 'Butorfanol — antitussígeno oral',
        indication: 'Tosse seca, áspera e improdutiva que interrompe sono, exercício ou perpetua irritação traqueal.',
        dose: '0,55 mg/kg; se necessário, até 1,1 mg/kg',
        frequency: 'q6–12h',
        route: 'VO',
        duration: 'Curso curto; o Plumb’s orienta que normalmente não ultrapasse 7 dias.',
        mechanism:
          'Modulação opioide central do reflexo da tosse; a baixa biodisponibilidade oral ainda permite efeito antitussígeno.',
        reassess: 'Contato em 48–72h e consulta em até 7 dias; reduzir dose ou intervalo assim que o ciclo da tosse estiver controlado.',
        cautions: 'Sedação, ataxia, constipação/bradicardia e retenção de muco; efeitos somam-se aos de outros sedativos.',
        contraindications: 'Não usar para tosse produtiva com secreção copiosa ou quando a depuração de secreções é necessária.',
      },
      {
        drug: 'Hidrocodona — antitussígeno oral',
        indication: 'Alternativa para tosse seca e improdutiva intensa ou refratária; não é escolha para tosse produtiva.',
        dose: '0,2–0,5 mg/kg (Ettinger: 0,22 mg/kg)',
        frequency: 'q6–12h (Ettinger: q12h)',
        route: 'VO',
        duration: 'Até controlar a exacerbação; reavaliar antes de prolongar.',
        mechanism: 'Agonista μ-opioide que suprime diretamente o centro medular da tosse e reduz excitabilidade neuronal.',
        reassess: 'Em 48–72h se tosse intensa; formalmente em até 7 dias. Titular para controle sem sedação excessiva.',
        cautions:
          'Sedação, constipação, vômito e depressão respiratória. Opioide controlado; disponibilidade e regras de prescrição variam.',
        contraindications:
          'Evitar em depressão respiratória importante, obstrução GI e secreção respiratória aumentada. Não usar combinações com ibuprofeno em cães; produtos com paracetamol nunca em gatos.',
      },
      {
        drug: 'Codeína — antitussígeno oral (alternativa)',
        indication:
          'Tosse seca e improdutiva quando um produto de codeína isolada está disponível e as opções preferenciais não estão disponíveis, não foram toleradas ou não produziram resposta adequada.',
        dose: '1–2 mg/kg',
        frequency: 'q6–12h',
        route: 'VO',
        duration: 'Teste curto, com reavaliação precoce; manter somente se houver benefício clínico objetivo sem sedação excessiva.',
        mechanism:
          'Atividade agonista em receptores μ-opioides com modulação central do reflexo da tosse. Em cães, o principal metabólito é codeína-6-glicuronídeo, cuja contribuição antitussígena permanece incerta.',
        reassess:
          'Contato em 48–72h e consulta em até 7 dias; comparar frequência/intensidade dos paroxismos, sono e tolerância ao exercício com sedação, ventilação e trânsito intestinal.',
        cautions:
          'Biodisponibilidade oral em cães é muito baixa (aproximadamente 4–6%) e a resposta pode ser imprevisível. Sedação, vômito, constipação, íleo e depressão respiratória são possíveis; outros depressores do SNC aumentam esses riscos.',
        contraindications:
          'Não usar em depressão respiratória importante, obstrução GI suspeita ou tosse produtiva que exige depuração de secreções. Contraindicada com inibidor da monoaminoxidase durante o uso e por 14 dias após sua suspensão.',
        notes:
          'Uso extrabula. O Plumb’s não identifica estudos que comprovem definitivamente eficácia antitussígena oral em pacientes veterinários e considera a hidrocodona mais potente. Preferir codeína isolada; em produtos de associação, calcular e avaliar separadamente a segurança de cada princípio ativo. Medicamento sujeito a controle especial conforme a legislação vigente.',
      },
      {
        drug: 'Prednisona ou prednisolona — curso anti-inflamatório',
        indication: 'Exacerbação com inflamação/edema de mucosa; não corrige condromalácia e não deve ser automática em todo cão.',
        dose: '0,5 mg/kg por dose → 0,25 mg/kg por dose',
        frequency: 'q12h × 3d; 0,25 mg/kg q12h × 5d; q24h × 10d; q48h × 12d',
        route: 'VO',
        duration: '30 dias no protocolo prospectivo publicado.',
        mechanism:
          'Ativação do receptor glicocorticoide reduz citocinas, permeabilidade vascular, edema e hipersensibilidade da mucosa.',
        reassess: 'Em 7–14 dias e ao final de 4 semanas; verificar tosse, esforço, peso, PU/PD, polifagia, ofegação e infecção.',
        cautions:
          'Usar a menor exposição eficaz. Diabetes, cardiopatia avançada, doença renal, infecção e obesidade aumentam o risco; evitar associação com AINE.',
        contraindications: 'Infecção fúngica sistêmica; cautela forte em diabetes descompensado, úlcera GI e infecção não controlada.',
        notes:
          'Regime testado em apenas 30 cães. Ettinger também descreve 0,2 mg/kg q24h por 1–2 semanas como opção de baixa dose; Nelson & Couto admite 0,5–1 mg/kg q12h na exacerbação, com desmame em 3–4 semanas.',
      },
      {
        drug: 'Fluticasona — corticosteroide inalatório',
        indication: 'Inflamação traqueobrônquica quando se deseja reduzir efeitos sistêmicos ou há resposta prévia a glicocorticoide.',
        dose: 'Plumb’s: 110–220 µg/puff, 1 puff por dose',
        frequency: 'q6–12h, ajustando à resposta',
        route: 'Inalatória por MDI + espaçador e máscara',
        duration: 'Reavaliar em 2 e 4 semanas; manutenção depende do fenótipo e da resposta.',
        mechanism:
          'Glicocorticoide de alta potência com ação predominantemente local; reduz inflamação da mucosa sem efeito de resgate imediato.',
        reassess: 'Semanas 2 e 4. Conferir técnica, vedação da máscara, tosse, esforço, PU/PD e sinais de hipercortisolismo.',
        cautions:
          'Manter máscara por 7–10 respirações após o jato. Ao migrar de corticoide sistêmico, sobrepor e desmamar por 10–14 dias para evitar insuficiência adrenal.',
        contraindications: 'Não usar como broncodilatador de resgate em crise aguda; evitar em hipersensibilidade ao produto.',
        notes:
          'No ensaio de 30 cães: 100 µg/cão q8h × 5d, q12h × 5d, q24h × 5d, q48h × 5d; depois 50 µg/cão q48h × 10d. Foi eficaz com menos PU/PD que prednisona.',
      },
    ],
    adjuvantesViasAereasInferiores: [
      {
        drug: 'Terbutalina — teste terapêutico selecionado',
        indication: 'Broncoespasmo ou colapso/doença de pequenas vias aéreas concomitante; benefício no colapso traqueal isolado é controverso.',
        dose: '0,625–5 mg/cão (dose total, não mg/kg)',
        frequency: 'q8–12h',
        route: 'VO',
        duration: 'Teste de 1–2 semanas; continuar apenas com melhora objetiva.',
        mechanism:
          'Agonista β₂-adrenérgico: relaxa músculo liso brônquico, reduz resistência das pequenas vias e pode diminuir pressões intratorácicas.',
        reassess: 'Em 7–14 dias; frequência cardíaca, ritmo, esforço, ausculta, tremores e resposta do diário de tosse.',
        cautions: 'Pode causar taquicardia, tremor, excitação, hipotensão, hiperglicemia e hipocalemia.',
        contraindications: 'Cautela em arritmia/cardiopatia, hipertensão, hipertireoidismo, diabetes, glaucoma ou convulsões.',
      },
      {
        drug: 'Teofilina de liberação prolongada — teste selecionado',
        indication: 'Doença/colapso de pequenas vias aéreas ou bronquite crônica concomitante; não fortalece a cartilagem traqueal.',
        dose: 'Inicial 10 mg/kg; faixa 5–20 mg/kg conforme tolerância e formulação',
        frequency: 'q12h inicialmente; faixa publicada q12–24h',
        route: 'VO, liberação prolongada',
        duration: 'Teste de 1–2 semanas; manutenção somente se benefício superar efeitos adversos.',
        mechanism:
          'Inibe PDE III/IV, antagoniza adenosina, aumenta cAMP, relaxa músculo liso, melhora depuração mucociliar e contratilidade diafragmática.',
        reassess: 'Em 7–14 dias; antes se vômito, agitação, tremor ou taquicardia. Considerar nível sérico se falha ou toxicidade.',
        cautions:
          'Índice terapêutico estreito e absorção variável. Calcular pelo peso magro em obesos; não triturar formulação de liberação prolongada.',
        contraindications:
          'Contraindicada em cães com histórico de convulsões; cautela em taquiarritmia, cardiopatia grave, úlcera GI, hepatopatia e hipoxemia grave.',
        notes: 'Enrofloxacina pode reduzir a depuração em cerca de 50%; macrolídeos, cimetidina e outros fármacos também podem elevar a exposição.',
      },
    ],
    evidenciaCorticoideInalatorio:
      'Talavera-López et al. (2023) randomizaram 30 cães com tosse e colapso traqueal para fluticasona inalatória ou prednisona oral por quatro semanas. Ambos os grupos melhoraram; ao final, o grupo inalatório apresentou escore clínico discretamente menor e menos poliúria/polidipsia. O tamanho amostral pequeno limita a precisão e não demonstra superioridade para todos os fenótipos.',
    planoDeReavaliacao: {
      kind: 'clinicalTable' as const,
      caption: 'Seguimento orientado pelo risco e pela resposta',
      headers: ['Momento', 'O que verificar', 'Decisão esperada'],
      rows: [
        ['Durante a crise', 'Esforço, SpO₂, mucosas, fadiga, temperatura, pressão e sedação.', 'Manter mínima manipulação; intubar/ventilar se oxigenação ou ventilação falhar.'],
        ['48–72 horas', 'Paroxismos, sono, alimentação, secreção, sedação, vômito/constipação.', 'Ajustar antitussígeno; antecipar retorno se piora, cianose ou síncope.'],
        ['7–14 dias', 'Diário de tosse, peso, exercício, técnica inalatória e efeitos dos fármacos.', 'Manter apenas o que trouxe benefício; iniciar/continuar desmame do corticoide.'],
        ['4 semanas', 'Resposta global, necessidade diária de resgate e comorbidades não controladas.', 'Redefinir fenótipo; discutir imagem dinâmica/endoscopia se resposta insuficiente.'],
        ['Estável: a cada 3–6 meses', 'Peso/BCS, tosse, exercício, síncope, efeitos crônicos e adesão ambiental.', 'Usar a menor carga medicamentosa eficaz e atualizar plano de crise.'],
        ['Após stent/prótese', 'Tosse, febre, secreção, dispneia, migração/fratura e tecido de granulação.', 'Seguir o calendário do centro intervencionista; sinais novos exigem avaliação imediata.'],
      ],
    },
    criteriosIntervencao: [
      'Obstrução respiratória importante, recorrente ou incapacitante apesar de manejo médico bem executado.',
      'Anatomia e extensão documentadas por avaliação dinâmica e/ou endoscópica.',
      'Comorbidades potencialmente tratáveis avaliadas antes do implante.',
      'Tutor compreende que tosse e medicamentos podem persistir e aceita seguimento prolongado.',
    ],
    oQueEvitar: [
      'Indicar stent apenas por grau anatômico alto em cão clinicamente controlado.',
      'Usar antibiótico empiricamente em toda exacerbação sem evidência de infecção.',
      'Prescrever broncodilatador como tratamento estrutural da cartilagem traqueal.',
      'Manter glicocorticoide sistêmico crônico sem reavaliar peso, efeitos adversos e alternativas.',
      'Provocar tosse ou realizar contenção intensa em paciente cianótico ou exausto.',
    ],
    monitoramento: [
      'Diário semanal: frequência e duração dos paroxismos, sono interrompido, esforço respiratório e gatilhos.',
      'Peso e escore corporal em toda revisão.',
      'Eventos de cianose, síncope ou queda de tolerância ao exercício exigem reavaliação precoce.',
      'Após implante: tosse nova/pior, febre, secreção, dispneia ou alteração radiográfica justificam investigação de complicação.',
    ],
    prognosticoResumo:
      'Muitos cães mantêm boa qualidade de vida com manejo multimodal, mas a alteração estrutural é crônica e pode progredir. Em doença leve/moderada, tratamento médico costuma ser a primeira escolha. Intervenções podem aliviar obstrução grave, porém não corrigem broncomalácia distal nem eliminam necessariamente tosse e medicações.',
  },
  complications: {
    doencaNatural: [
      'Progressão da obstrução, broncomalácia, inflamação crônica, depuração mucociliar prejudicada e infecção secundária selecionada.',
      'Cianose, síncope, exaustão respiratória e possível hipertensão pulmonar em doença avançada ou multissegmentar.',
    ],
    aposStent: {
      kind: 'clinicalTable' as const,
      caption: 'Meta-análise de 15 estudos de stent traqueal em cães (Robin et al., 2024)',
      headers: ['Desfecho', 'Estimativa combinada'],
      rows: [
        ['Tosse precoce', '99%'],
        ['Tosse tardia', '75%'],
        ['Tosse tardia clinicamente relevante', '52%'],
        ['Infecção', '24%'],
        ['Tecido de granulação', '20%'],
        ['Fratura', '12%'],
        ['Recorrência do colapso', '10%'],
        ['Migração', '5%'],
      ],
    },
    leituraDaEvidencia:
      'As estimativas pós-stent vêm de estudos heterogêneos e centros especializados. Servem para consentimento e vigilância, não para prever exatamente o risco de um cão individual.',
  },
  prevention: {
    prevencaoPrimaria:
      'Não há método comprovado para impedir a alteração estrutural em um cão predisposto. O objetivo prático é reduzir gatilhos e evitar que obesidade, irritantes e doenças respiratórias amplifiquem os sinais.',
    planoDomiciliar: [
      'Usar peitoral bem ajustado; evitar pressão no pescoço.',
      'Manter peso e condição corporal adequados.',
      'Evitar fumaça, incensos, sprays, poeira e ambientes quentes/abafados.',
      'Planejar exercício leve em horários frescos e reduzir excitação intensa.',
      'Filmar episódios e registrar frequência, duração e contexto para as revisões.',
    ],
    sinaisDeUrgencia:
      'Respiração difícil em repouso, língua ou mucosas azuladas, colapso/síncope, incapacidade de interromper o paroxismo ou exaustão exigem atendimento imediato.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['bronquite-cronica-caes-gatos', 'doenca-valvar-mitral-degenerativa-caes'],
  relatedMedicationSlugs: ['butorfanol', 'prednisolona'],
  references: [
    {
      id: 'ref-plumbs-10e',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: acepromazina, butorfanol, codeína, fluticasona, hidrocodona, terbutalina, teofilina e prednisolona/prednisona.',
      sourceType: 'Manual farmacológico do acervo',
      notes: 'Doses, mecanismos, contraindicações, interações, duração e monitorização dos fármacos.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-ettinger-9e',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E, eds. Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Chapter 215: Large Airway Diseases, “Tracheal Collapse (Dogs)”, pp. 1158–1160.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Fundamentos, apresentação, diagnóstico, manejo e prognóstico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 21: Disorders of the Trachea and Bronchi, “Tracheobronchomalacia (Collapsing Trachea)”, pp. 333–337.',
      sourceType: 'Livro-texto do acervo',
      notes: 'Terminologia, diagnóstico, tratamento médico, stent e prognóstico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-thrall-8e',
      citationText:
        'Thrall DE, ed. Textbook of Veterinary Diagnostic Radiology. 8th ed. Elsevier. Chapter 29: Canine and Feline Larynx and Trachea, “Tracheal and Bronchial Collapse”, pp. 602–603.',
      sourceType: 'Livro de diagnóstico por imagem do acervo',
      notes: 'Radiografia, fluoroscopia, graduação e planejamento de stent.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-endoscopy-2e',
      citationText:
        'McCarthy TC, ed. Veterinary Endoscopy for the Small Animal Practitioner. 2nd ed. Wiley-Blackwell; 2021. Chapter 5: Bronchoscopy, pp. 195–214.',
      sourceType: 'Livro de endoscopia do acervo',
      notes: 'Achados broncoscópicos, amostragem e segurança anestésica.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-kim-2024',
      citationText:
        'Kim MR, Kim SH, Ryu MO, et al. A retrospective study of tracheal collapse in small-breed dogs: 110 cases (2022–2024). Front Vet Sci. 2024;11:1448249.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1448249/full',
      notes: 'Fatores associados, broncomalácia e dissociação entre grau e tosse.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-robin-2024',
      citationText:
        'Robin T, Robin E, Le Boedec K, et al. A systematic review and meta-analysis of prevalence of complications after tracheal stenting in dogs. J Vet Intern Med. 2024;38(4):2034–2048.',
      sourceType: 'Revisão sistemática e meta-análise',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256162/',
      notes: 'Estimativas combinadas de complicações pós-stent.',
      evidenceLevel: 'Síntese de estudos observacionais',
    },
    {
      id: 'ref-carr-2022',
      citationText:
        'Carr SV, Reinero C, Rishniw M, Pritchard JC. Specialists’ approach to tracheal collapse: survey-based opinions on diagnostics, medical management, and comorbid diseases. J Am Vet Med Assoc. 2023;261(1):80–86.',
      sourceType: 'Levantamento internacional com especialistas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36166502/',
      notes: '180 especialistas de 22 países; descreve prática contemporânea e lacunas de evidência, sem constituir guideline.',
      evidenceLevel: 'Survey clínico',
    },
    {
      id: 'ref-talavera-2023',
      citationText:
        'Talavera-López J, Sáez-Mengual O, Fernández-del-Palacio MJ. Comparative Study of Inhaled Fluticasone Versus Oral Prednisone in 30 Dogs with Cough and Tracheal Collapse. Vet Sci. 2023;10:548.',
      sourceType: 'Estudo prospectivo randomizado',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10535501/',
      notes: 'Amostra pequena; fornece esquema de quatro semanas, resposta clínica e eventos adversos comparativos.',
      evidenceLevel: 'Ensaio clínico pequeno',
    },
    {
      id: 'ref-congiusta-2021',
      citationText:
        'Congiusta M, Weisse C, Berent AC, Tozier E. Comparison of medical management alone and tracheal endoluminal stent placement in dogs with tracheal collapse. J Am Vet Med Assoc. 2021;258(3):279–289.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33496623/',
      notes: 'Seleção de casos médicos versus stent; comparação não randomizada.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-suematsu-radiography-2025',
      citationText:
        'Suematsu M, et al. Radiography underestimates the severity of tracheobronchoscopy-confirmed grade IV tracheal collapse in dogs. Am J Vet Res. 2025;86(9).',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40466662/',
      notes: 'Limitações da radiografia para excluir ou graduar doença grave.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-suematsu-prosthesis-2026',
      citationText:
        'Suematsu M, Minamoto T, Suematsu H, et al. Long-term outcomes of dogs with W-shaped or traditional tracheal collapse treated with a continuous extraluminal tracheal prosthesis. Vet Surg. 2026;55(1):118–130.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41148950/',
      notes: 'Resultados de centro especializado; não comparar diretamente com stent sem ajuste de seleção.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-weisse-2026',
      citationText:
        'Weisse C, Kwok SY, Berent A, Andy C. Prevalence of tracheal collapse syndrome, congenital portosystemic shunts, or both in Yorkshire Terriers at one veterinary hospital. J Vet Intern Med. 2026;40(3):aalag094.',
      sourceType: 'Estudo transversal de centro único',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42132355/',
      notes: 'Estimativa institucional em Yorkshire Terriers; não representa prevalência populacional global.',
      evidenceLevel: 'Observacional',
    },
    {
      id: 'ref-acvs',
      citationText: 'American College of Veterinary Surgeons. Tracheal Collapse. Animal Health Topics.',
      sourceType: 'Revisão técnica especializada',
      url: 'https://www.acvs.org/small-animal/tracheal-collapse/',
      notes: 'Material educacional de especialista; não é consenso formal.',
      evidenceLevel: 'Revisão especializada',
    },
  ],
  isPublished: true,
  source: 'seed',
};
