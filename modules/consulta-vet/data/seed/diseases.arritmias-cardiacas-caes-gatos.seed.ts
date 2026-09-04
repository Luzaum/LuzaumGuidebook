import type { DiseaseRecord } from '../../types/disease';

/**
 * Arritmias cardíacas em cães e gatos — síntese editorial ConsultaVET.
 * Prioridade: Nelson & Couto 2020 > Cunningham 2020 > BSAVA ECG/Emergency/Formulary >
 * Drobatz 2019 > Plumb's 2023 > ORCA 2023/2024 > Romito 2024–2025 > Cofaru 2026 > RECOVER 2024.
 */
export const arritmiasCardiacasCaesGatosRecord: DiseaseRecord = {
  id: 'disease-arritmias-cardiacas-caes-gatos',
  slug: 'arritmias-cardiacas-caes-gatos',
  title: 'Arritmias cardíacas em cães e gatos',
  subtitle:
    'Reconhecimento eletrocardiográfico, estratificação de risco e manejo de taquiarritmias e bradiarritmias',
  synonyms: [
    'Arritmias cardíacas',
    'Distúrbios do ritmo cardíaco',
    'Taquiarritmias',
    'Bradiarritmias',
    'Eletrocardiografia clínica',
    'Cardiac arrhythmias',
  ],
  species: ['dog', 'cat'],
  category: 'cardiologia',
  tags: [
    'Arritmias',
    'ECG',
    'Holter',
    'Taquicardia ventricular',
    'Fibrilação atrial',
    'Taquicardia supraventricular',
    'Bloqueio AV',
    'Sick sinus syndrome',
    'Marcapasso',
    'Antiarrítmicos',
    'Emergência cardiovascular',
  ],
  vinReferencePending: true,
  quickSummary:
    'Arritmias cardíacas representam alterações da formação ou condução do impulso elétrico e variam de achados benignos a emergências fatais. A primeira decisão não é “qual antiarrítmico usar”, mas se o ritmo está causando repercussão hemodinâmica e qual o seu mecanismo. ECG identifica o ritmo; Holter quantifica eventos intermitentes e é fundamental em síncope, ectopia ventricular, SSS e controle da fibrilação atrial. VPCs isolados frequentemente não precisam ser tratados. VT sustentada sintomática em cães é tratada inicialmente com lidocaína IV. SVTs dependentes do nó AV podem responder a manobra vagal e diltiazem. FA canina é manejada prioritariamente por controle da frequência; média de Holter ≤125 bpm é o alvo atualmente melhor sustentado por evidência clínica. Bradiarritmias sintomáticas por SSS ou BAV avançado frequentemente necessitam marcapasso. (1)(4)(5)(10)',
  quickDecisionStrip: [
    'Antes de antiarrítmico: estabilidade hemodinâmica, pulso, PA, consciência e se a arritmia explica os sinais — síncope, choque ou edema pulmonar exigem abordagem imediata. (4)(5)',
    'Classifique o ritmo: rápido ou lento; QRS estreito ou largo; regular ou irregular; relação P–QRS — isso direciona mecanismo e conduta. (1)(2)',
    'Procure causa reversível (K⁺, Mg²⁺, Ca²⁺, hipóxia, anemia, dor, drogas, doença sistêmica) antes de escalar antiarrítmico. (4)(9)',
    'VPC isolado em paciente assintomático com função preservada frequentemente não precisa de supressão farmacológica — tratar substrato e repercussão, não só o traçado. (1)',
    'FA canina: meta preferencial de frequência cardíaca média de Holter ≤125 bpm quando tolerado — ECG de consultório não substitui monitorização de 24 h. (10)',
    'Adenosina não deve aparecer como primeira escolha padrão para SVT canina com base em extrapolação da medicina humana — Nelson & Couto relata ineficácia em cães. (1)',
    'Bradiarritmia sintomática estrutural (SSS, BAV avançado): atropina pode servir de teste/ponte, mas marcapasso permanente é tratamento definitivo na maioria dos casos. (1)(4)(5)',
    'ECG de poucos minutos não exclui arritmia intermitente — Holter ou monitor de eventos em síncope, colapso ou suspeita alta com ECG normal. (5)(14)',
    'VF e VT sem pulso são ritmos de parada — seguir RECOVER 2024, não o algoritmo ambulatorial de VT com pulso. (25)',
    'Antiarrítmicos são pró-arrítmicos: bradicardia, bloqueio AV, depressão inotrópica e prolongamento de QT são riscos reais — monitorizar ECG, PA e eletrólitos. (1)(6)(7)',
  ],
  quickSummaryRich: {
    lead:
      'Arritmias cardíacas são alterações na formação do impulso elétrico, na condução ou em ambos. Variam de achados incidentais a ritmos capazes de causar hipotensão, síncope, insuficiência cardíaca, cardiomiopatia induzida por taquicardia e morte súbita. O ECG identifica atividade elétrica, mas não prova que cada complexo gerou contração eficaz — integrar pulso, perfusão, eco e, quando necessário, Holter. A primeira pergunta não é qual fármaco usar, mas se há repercussão hemodinâmica e qual o mecanismo. (1)(2)(4)',
    leadHighlights: ['impulso elétrico', 'Holter', 'hemodinâmica', 'mecanismo'],
    pillars: [
      {
        title: 'Arritmia não significa automaticamente doença cardíaca primária',
        body:
          'Dor, hipoxemia, anemia, hipovolemia, sepse, distúrbios eletrolíticos, endocrinopatias, intoxicações e medicamentos podem desencadear alterações de ritmo sem cardiopatia estrutural de base. (1)(4)(9)',
        highlights: ['eletrolíticos', 'sepse', 'medicamentos'],
      },
      {
        title: 'ECG curto pode perder a doença',
        body:
          'Arritmias paroxísticas podem não aparecer em minutos de eletrocardiografia. Holter de 24–48 h, monitor de eventos ou loop recorder são essenciais em síncope intermitente. Em gatos saudáveis, estudo de 2026 identificou ectopia ventricular surpreendentemente frequente apesar de ECG convencional inicial sem arritmia. (5)(14)',
        highlights: ['paroxística', 'Holter', 'gatos'],
      },
      {
        title: 'A repercussão hemodinâmica é decisiva',
        body:
          'Taquicardia encurta a diástole, reduz enchimento e perfusão coronariana e eleva consumo de O₂. Bradicardia severa reduz débito cardíaco (DC = FC × VS). Tratar o traçado sem avaliar perfusão e sinais clínicos é erro frequente. (2)(8)',
        highlights: ['diástole', 'débito cardíaco', 'perfusão'],
      },
      {
        title: 'Antiarrítmicos também podem causar arritmias',
        body:
          'Bradicardia, bloqueios AV, depressão da contratilidade, prolongamento de QT e novas taquiarritmias são possíveis. Antiarrítmico é intervenção fisiológica ativa — exige monitorização de ECG, PA, eletrólitos e Holter quando indicado. (1)(6)(7)',
        highlights: ['pró-arrítmico', 'QT', 'monitorização'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Avaliação hemodinâmica',
          timing: 'Primeiro contato',
          detail:
            'Consciência, pulso, déficit de pulso, mucosas/TPC, PA, FC, padrão respiratório, congestão, temperatura e SpO₂. PA normal não exclui baixo débito compensado. (4)(5)',
        },
        {
          label: 'ECG multiderivações',
          timing: 'Imediato se arritmia suspeita',
          detail:
            'Identifica mecanismo e morfologia (sinusal, SVT, FA, VPC, VT, bloqueios). Minutos de ECG não excluem eventos intermitentes — considerar Holter se clínica discordante. (1)(3)',
        },
        {
          label: 'Pressão arterial + pulso simultâneo',
          timing: 'Durante o ECG',
          detail:
            'Relaciona evento elétrico à ejeção mecânica. Déficit de pulso pode variar ao longo do exame — documentar relação ritmo–pulso. (4)',
        },
        {
          label: 'Eletrólitos e glicemia',
          timing: 'Antes de antiarrítmico de rotina',
          detail:
            'K⁺, Mg²⁺, Ca²⁺, glicemia — detectam causas reversíveis. Mg sérico normal não exclui déficit corporal total. (4)(9)',
        },
        {
          label: 'Ecocardiograma',
          timing: 'Substrato estrutural',
          detail:
            'Responde qual cardiopatia sustenta a arritmia: DCM, CMH, MMVD, aumento atrial, obstrução, derrame. Eco normal não exclui canalopatia ou arritmia primária. (1)(15)',
        },
        {
          label: 'Holter 24–48 h',
          timing: 'Síncope, ectopia, FA, SSS',
          detail:
            'Quantifica carga ventricular, FC média/mínima/máxima, pausas, couplets, runs e correlaciona sintomas. Fundamental para controle de FA e resposta a antiarrítmicos. (1)(5)(10)',
          reassess: 'ECG curto normal com alta suspeita → Holter antes de rotular benigno.',
        },
        {
          label: 'T4 em gatos quando indicado',
          timing: 'Taquicardia persistente felina',
          detail:
            'Hipertireoidismo pode gerar taquicardia e arritmias — não solicitar indiscriminadamente, mas incluir na busca de causa reversível. (1)',
        },
        {
          label: 'Estudo eletrofisiológico',
          timing: 'Centro especializado',
          detail:
            'Define mecanismos, vias acessórias e permite ablação por radiofrequência — especialmente AVRT recorrente e taquicardias refratárias. (16)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'VT sustentada com pulso — cão',
          detail:
            'Corrigir O₂, perfusão, K⁺/Mg²⁺ e causa precipitante. Lidocaína 2 mg/kg IV lentamente, repetir até ~8 mg/kg cumulativos; se resposta, CRI 25–80 µg/kg/min. Refratária: procainamida, amiodarona ou cardioversão sincronizada conforme caso. (1)(4)(7)',
          dose: 'Lidocaína bolus 2 mg/kg IV; CRI 25–80 µg/kg/min (cão).',
          reassess: 'ECG contínuo, PA, sinais neurológicos (ataxia, convulsão).',
        },
        {
          label: 'Fibrilação atrial canina — controle de frequência',
          detail:
            'Tratar ICC/doença de base. ECG >150 bpm sugere controle inadequado; ECG <150 bpm não garante controle — realizar Holter. Meta: FC média 24 h ≤125 bpm quando tolerado. Primeira linha crônica frequentemente diltiazem + digoxina. (10)(11)(12)',
          duration: 'Contínuo com Holter seriado para titulação.',
          reassess: 'Holter após cada ajuste relevante de dose.',
        },
        {
          label: 'Bradiarritmia sintomática',
          detail:
            'ECG, K⁺, drogas, doença vagal. Atropina 0,04 mg/kg IV como teste/ponte. SSS ou BAV avançado com resposta inadequada → marcapasso temporário se necessário e permanente como tratamento definitivo. (1)(4)(5)(20)',
          dose: 'Atropina 0,01–0,04 mg/kg IV/IM; teste diagnóstico 0,04 mg/kg.',
          reassess: 'Resposta parcial à atropina não exclui SSS estrutural.',
        },
        {
          label: 'VF / VT sem pulso',
          detail:
            'Ritmos de parada cardiorrespiratória — não seguir algoritmo de VT com pulso. BLS de alta qualidade, desfibrilação e ALS segundo RECOVER 2024; minimizar interrupções de compressões. (25)',
          reassess: 'Reavaliar ritmo a cada 2 minutos durante RCP.',
        },
        {
          label: 'SVT com repercussão',
          detail:
            'Manobra vagal com ECG em ambiente controlado; se falha, diltiazem IV titulado (cão ~0,05–0,25 mg/kg IV lentamente). Evitar adenosina como padrão canino. Investigar via acessória/AVRT — ablação pode ser curativa. (1)(4)(16)',
        },
      ],
    },
  },


  etiology: {
    pontosChave: [
      'Não tratar apenas o traçado: estabilidade hemodinâmica, substrato cardíaco e causa reversível precedem a escolha do antiarrítmico. (1)(4)(5)',
      'Arritmia não implica automaticamente cardiopatia primária — distúrbios sistêmicos e eletrolíticos são causas frequentes. (1)(4)(9)',
      'ECG curto pode ser normal entre episódios paroxísticos; Holter é essencial em síncope e ectopia intermitente. (5)(14)',
      'VPC isolado assintomático frequentemente não requer supressão; VT sustentada, síncope e substrato de alto risco justificam abordagem agressiva. (1)(18)',
      'FA canina: controle de frequência com meta de Holter ≤125 bpm está entre as evidências prognósticas mais robustas disponíveis. (10)(11)',
      'Bradiarritmias estruturais sintomáticas (SSS, BAV avançado) geralmente necessitam marcapasso — farmacoterapia é ponte, não cura. (4)(5)(20)',
    ],
    conceitoFundamental:
      'Antes de prescrever antiarrítmico, determinar: (1) estabilidade hemodinâmica; (2) se a arritmia explica os sinais; (3) doença cardíaca estrutural; (4) causa extracardíaca reversível; (5) objetivo terapêutico — converter ritmo, controlar frequência, reduzir ectopia ou manter frequência por pacing. (1)(4)(5)',
    arritmiaNaoSignificaCardiopatia:
      'Dor, hipoxemia, anemia, hipovolemia, sepse, doença gastrointestinal, trauma, alterações de K⁺/Mg²⁺/Ca²⁺, endocrinopatias, intoxicações e medicamentos podem desencadear alterações de ritmo sem cardiopatia estrutural primária. (1)(4)(9)',
    ecgCurtoPodePerder:
      'Arritmias paroxísticas podem não aparecer em alguns minutos de eletrocardiografia. Holter de 24–48 h, monitor de eventos ou loop recorder tornam-se especialmente relevantes em síncope ou episódios intermitentes. Em gatos saudáveis, Cofaru et al. (2026) identificaram ectopia ventricular surpreendentemente alta apesar de ECG convencional inicial sem arritmia — tanto “ECG curto normal” quanto “VPC isolado presente” exigem contexto clínico. (5)(14)',
    repercussaoHemodinamica:
      'Taquicardia encurta diástole, reduz enchimento ventricular, volume sistólico e tempo de perfusão coronariana, elevando consumo de O₂. Bradicardia severa reduz débito cardíaco (DC = FC × VS), causando hipotensão, síncope e, em casos avançados, insuficiência cardíaca. (2)(8)',
    antiarritmicosProarritmicos:
      'Bradicardia, bloqueios AV, depressão da contratilidade, prolongamento de QT e novas taquiarritmias são possíveis com antiarrítmicos. Encarar o fármaco como intervenção fisiológica ativa, não apenas “medicamento para baixar frequência”. (1)(6)(7)',
  },
  epidemiology: {
    caes:
      'Arritmias são extremamente heterogêneas em cães. Fibrilação atrial associa-se sobretudo a cardiopatias com grande aumento atrial — MMVD avançada, CMD e cardiopatias valvares/dilatadas; raças gigantes também são predispostas. Dobermanns apresentam risco elevado de ectopia ventricular e VT antes ou durante CMD. Boxers desenvolvem ARVC com VPC, bigeminismo, VT, síncope e morte súbita. Schnauzer Miniatura, Westie e outras raças pequenas idosas predispõem a SSS. Labrador Retriever concentra grande parte das vias acessórias/AVRT em séries clínicas. (1)(10)(16)(17)(23)',
    gatos:
      'FA é bem menos comum que em cães e geralmente indica aumento atrial importante ou cardiomiopatia avançada. Taquicardia sinusal por estresse é extremamente frequente no consultório. BAV de terceiro grau pode ser melhor tolerado que em alguns cães. SSS é rara. Holter em gatos clinicamente saudáveis (Cofaru 2026) revelou ectopia ventricular em proporção relevante — VPC isolado não equivale a diagnosticar cardiomiopatia. (1)(5)(14)(15)',
    prognostico:
      'Prognóstico depende muito mais do substrato que do nome isolado da arritmia. Melhor prognóstico: SVT por via acessória tratada por ablação; arritmia secundária reversível; SSS/BAV com pacing adequado; cardiomiopatia induzida por taquicardia detectada precocemente. Maior risco: DCM + VT, ARVC, síncope arrítmica, miocardite, doença cardíaca avançada, VT sustentada, choque, VF e ICC concomitante. (1)(16)(17)(18)',
  },
  pathogenesisTransmission: {
    transmissao:
      'Não há transmissão entre animais. Arritmias refletem alterações elétricas do miocárdio ou influências sistêmicas/autonômicas — não são doenças infecciosas.',
    cascata: [
      'Automaticidade anormal ou aumentada: célula fora do nó SA atinge limiar espontaneamente por isquemia, distensão, inflamação, distúrbios eletrolíticos ou drogas — gera focos ectópicos atriais ou ventriculares. (1)(2)',
      'Atividade deflagrada (triggered activity): pós-despolarizações precoces ou tardias, frequentemente ligadas a Ca²⁺ intracelular elevado, isquemia ou drogas — podem iniciar ectopia e torsades. (1)(2)(9)',
      'Reentrada: impulso retorna ao tecido previamente ativado e estabelece circuito repetitivo — mecanismo central em muitas SVTs e taquicardias mediadas por vias acessórias (AVRT). (1)(2)(16)',
    ],
  },
  pathophysiology: {
    fisiologiaEletrica:
      'O coração funciona como sincício funcional: o nó sinoatrial inicia o impulso, que se propaga pelos átrios, sofre atraso fisiológico no nó AV e segue pelo feixe de His e sistema His–Purkinje. O atraso AV permite enchimento ventricular antes da sístole. Potencial de ação das células contráteis segue fases 0–4; células nodais apresentam despolarização espontânea na fase 4 (corrente If). Simpático β₁ aumenta cronotropismo, dromotropismo e inotropismo; parassimpático reduz FC do nó SA e desacelera condução AV. (2)',
    mecanismosArritmia:
      'Três mecanismos fundamentais: (1) automaticidade anormal — focos ectópicos fora do nó SA; (2) atividade deflagrada — pós-despolarizações precoces/tardias; (3) reentrada — circuitos repetitivos em SVT e AVRT. Influência autonômica modula todos os mecanismos e explica resposta a manobra vagal, atropina, β-bloqueadores e bloqueadores de Ca²⁺. (1)(2)',
    taquicardiaHemodinamica:
      'Quanto maior a FC: menor tempo diastólico, menor enchimento ventricular, menor volume sistólico, maior demanda miocárdica de O₂, menor perfusão coronariana (predominantemente diastólica) e maior risco de isquemia em cardiopatas. Taquicardia sustentada pode produzir cardiomiopatia induzida por taquicardia — fenótipo que mimetiza DCM, parcialmente reversível se controle precoce. (2)(8)(16)',
    bradicardiaHemodinamica:
      'Se FC cai intensamente sem compensação por aumento de volume sistólico, débito cardíaco cai (DC = FC × VS): hipotensão, menor perfusão cerebral, fraqueza, síncope, intolerância ao exercício e ICC em casos avançados. Bloqueios AV avançados e SSS reduzem frequência de escape ventricular e podem causar pausas prolongadas. (2)(8)(5)',
    classificacaoPratica:
      'Ritmos sinusais: arritmia sinusal, taqui/bradicardia sinusal, pausas, bloqueio SA, SSS. Supraventriculares: APC, taquicardia atrial, flutter/FA, SVT, AVRT por via acessória. Condução AV: BAV 1º, Mobitz I/II, BAV 3º. Ventriculares: VPC, bigeminismo, couplets/triplets, VT sustentada/não sustentada, AIVR, torsades, VF. Imitadores: bloqueio de ramo, aberrância, preexcitação, hipercalemia, artefato. (1)(2)(4)',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Taquicardia, pulso fraco ou irregular, déficit de pulso',
          mechanism:
            'Taquiarritmias encurtam diástole e reduzem volume sistólico; bradiarritmias ou pausas reduzem FC × VS. Déficit de pulso ocorre quando o complexo elétrico não gera ejeção mecânica eficaz.',
          clinicalMeaning: 'Correlacionar ECG com palpação simultânea de pulso — não tratar só o número da FC.',
          priority: 'arrhythmia',
        },
        {
          finding: 'Síncope, pré-síncope ou colapso episódico',
          mechanism:
            'Queda abrupta de débito cardíaco por taquicardia/ bradicardia/pausas reduz perfusão cerebral. Movimentos breves não excluem síncope arrítmica.',
          clinicalMeaning: 'Holter ou monitor de eventos se ECG basal normal — especialmente em cardiopatas e raças de risco.',
          priority: 'emergency',
        },
        {
          finding: 'Intolerância ao exercício, fraqueza, letargia',
          mechanism:
            'Baixo débito crônico ou intermitente por arritmia sustentada ou bradicardia — simpático compensatório pode mascarar hipotensão até descompensação.',
          clinicalMeaning: 'Investigar substrato (eco + Holter) antes de atribuir a “idade” ou descondicionamento.',
          priority: 'low-output',
        },
        {
          finding: 'Edema pulmonar ou ascite em taquiarritmia crônica',
          mechanism:
            'FA rápida ou taquicardia sustentada elevam pressões de enchimento; cardiomiopatia induzida por taquicardia agrava disfunção sistólica.',
          clinicalMeaning: 'Controle de frequência/ritmo pode melhorar congestão além do diurético isolado. (10)(11)',
          priority: 'heart-failure',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia, dispneia ou frequência respiratória elevada',
          mechanism:
            'Hipoperfusão e congestão por baixo débito ou FA rápida elevam FR; taquicardia reduz tempo diastólico e piora enchimento.',
          clinicalMeaning: 'Diferenciar ICC por arritmia de doença respiratória primária — eco e radiografia auxiliam.',
          priority: 'heart-failure',
        },
        {
          finding: 'Tosse seca ou crepitações em cardiopata taquicárdico',
          mechanism:
            'Edema cardiogênico ou compressão brônquica por átrio dilatado — FA e taquicardia sustentada precipitam descompensação.',
          clinicalMeaning: 'Estabilizar ritmo/frequência e congestão — não aumentar diurético sem reavaliar arritmia.',
          priority: 'heart-failure',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Palidez de mucosas, TPC prolongado, hipotensão',
          mechanism: 'Perfusão periférica inadequada por baixo débito relacionado ao ritmo.',
          clinicalMeaning: 'Emergência cardiovascular até estabilização — O₂, ECG, acesso IV, tratar ritmo e causa.',
          priority: 'emergency',
        },
        {
          finding: 'Ataxia, tremores ou convulsões durante lidocaína',
          mechanism:
            'Neurotoxicidade por lidocaína — especialmente em gatos e com doses cumulativas elevadas em cães.',
          clinicalMeaning: 'Suspender infusão, reduzir dose — gatos exigem frações da dose canina. (1)(7)',
          priority: 'emergency',
        },
        {
          finding: 'Anorexia, vômito ou diarreia com mexiletina/sotalol/digoxina',
          mechanism: 'Efeitos adversos gastrointestinais ou toxicidade digitálica — índice terapêutico estreito da digoxina.',
          clinicalMeaning: 'Reavaliar dose, função renal, K⁺ e concentração sérica de digoxina quando indicado. (6)(19)',
          priority: 'systemic',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'Avaliação hemodinâmica',
        purpose: 'Determinar urgência e estabilidade antes de exames demorados.',
        description:
          'Consciência, qualidade do pulso, déficit de pulso, mucosas/TPC, PA, FC, padrão respiratório, congestão, temperatura e SpO₂. Arritmia com síncope, hipotensão, choque ou edema pulmonar = potencialmente relevante até prova em contrário. (4)(5)',
        interpretation: 'Instabilidade → O₂, ECG imediato, acesso IV e tratamento simultâneo de ritmo e causa.',
        limitations: 'PA normal não exclui baixo débito compensado.',
      },
      {
        stepNumber: 2,
        title: 'ECG multiderivações',
        purpose: 'Identificar mecanismo e morfologia do ritmo.',
        description:
          'Classificar: rápido/lento, QRS estreito/largo, regular/irregular, relação P–QRS. Velocidade 25 mm/s (50 mm/s para irregularidades finas); ganho 10 mm/mV; ambiente calmo. (1)(3)',
        interpretation: 'Traçado guia conduta — FA, SVT, VT, bloqueios e preexcitação têm algoritmos distintos.',
        limitations: 'Minutos de ECG não excluem eventos intermitentes.',
      },
      {
        stepNumber: 3,
        title: 'Pressão arterial + pulso simultâneo',
        purpose: 'Relacionar evento elétrico à ejeção mecânica.',
        description: 'Palpar pulso durante ausculta/ECG; documentar déficit de pulso e hipotensão. (4)',
        interpretation: 'Déficit de pulso ou hipotensão aumentam urgência terapêutica.',
        limitations: 'Déficit de pulso pode variar ao longo do registro.',
      },
      {
        stepNumber: 4,
        title: 'Eletrólitos e glicemia',
        purpose: 'Detectar causas reversíveis antes de antiarrítmico crônico.',
        description: 'K⁺, Mg²⁺, Ca²⁺, glicemia — corrigir hipocalemia, hipomagnesemia e hipercalemia. (4)(9)',
        interpretation: 'Hipercalemia pode simular atrial standstill; hipocalemia reduz eficácia de lidocaína e aumenta risco de torsades.',
        limitations: 'Mg sérico normal não exclui déficit corporal total.',
      },
      {
        stepNumber: 5,
        title: 'Hemograma e bioquímica',
        purpose: 'Buscar anemia, inflamação e disfunção orgânica.',
        description: 'Anemia e doença sistêmica aumentam demanda simpática; azotemia orienta doses de digoxina e escolha de fármacos. (4)(9)',
        interpretation: 'Doença sistêmica pode ser causa primária de taquicardia sinusal ou ectopia.',
        limitations: 'Não diagnóstica mecanismo elétrico isoladamente.',
      },
      {
        stepNumber: 6,
        title: 'Ecocardiograma',
        purpose: 'Identificar substrato estrutural.',
        description:
          'DCM, CMH, MMVD, aumento atrial, função sistólica, obstrução, derrame, hipertensão pulmonar. No gato com colapso/síncope, consenso ACVIM recomenda avaliação cardiovascular incluindo eco. (15)',
        interpretation: 'Substrato define prognóstico e intensidade terapêutica — Boxer/Dobermann exigem Holter mesmo com eco limítrofe.',
        limitations: 'Eco normal não exclui canalopatia ou arritmia primária.',
        isGoldStandard: true,
      },
      {
        stepNumber: 7,
        title: 'Holter 24–48 h',
        purpose: 'Quantificar carga arrítmica e correlacionar sintomas.',
        description:
          'FC média/mín/máx, VPC total, complexidade, pausas, SVT, controle de FA. Indicado em síncope, Dobermann/Boxer, resposta a antiarrítmicos e meta ORCA ≤125 bpm. (1)(5)(10)',
        interpretation: 'Holter define controle de FA e eficácia de sotalol/mexiletina — comparar durações equivalentes pré/pós.',
        limitations: 'Variação circadiana exige interpretação clínica integrada.',
      },
      {
        stepNumber: 8,
        title: 'Monitor de eventos / loop recorder',
        purpose: 'Capturar arritmias muito raras.',
        description: 'Quando síncope/colapso é esporádico e Holter de 24 h foi inconclusivo. (5)',
        interpretation: 'Correlação sintoma–ritmo confirma etiologia arrítmica.',
        limitations: 'Maior custo e dependência de registro pelo tutor.',
      },
      {
        stepNumber: 9,
        title: 'Troponina I cardíaca',
        purpose: 'Detectar lesão miocárdica.',
        description: 'Miocardite, trauma, hipóxia, cardiotoxicidade — auxilia, não substitui eco/ECG. (4)',
        interpretation: 'Elevação sustenta investigação de miocardite ou lesão aguda.',
        limitations: 'Não determina etiologia elétrica específica.',
      },
      {
        stepNumber: 10,
        title: 'T4 em gatos quando indicado',
        purpose: 'Excluir hipertireoidismo como causa de taquicardia.',
        description: 'Solicitar quando taquicardia persistente, perda ponderal, hiperatividade ou contexto compatível — não pedir indiscriminadamente. (1)',
        interpretation: 'Tratar tireoide pode resolver taquiarritmia secundária.',
        limitations: 'T4 normal não exclui hipertireoidismo limítrofe sem T4 livre/contexto.',
      },
      {
        stepNumber: 11,
        title: 'Estudo eletrofisiológico',
        purpose: 'Definir mecanismo e tratar por ablação.',
        description:
          'Vias acessórias, AVRT, taquicardias refratárias — centro especializado. Wright et al.: sucesso ~95% após um procedimento em AVRT canina. (16)',
        interpretation: 'AVRT recorrente pode ser curável — não assumir terapia antiarrítmica vitalícia.',
        limitations: 'Disponibilidade limitada; requer estabilização prévia.',
      },
    ],
    tabelaLeituraRapidaECG: {
      kind: 'clinicalTable' as const,
      title: 'Leitura rápida do ECG',
      headers: ['Padrão', 'Principal hipótese', 'Como reconhecer', 'Próximo passo'],
      rows: [
        [
          'FC alta, P antes de cada QRS, início/variação gradual',
          'Taquicardia sinusal',
          'P sinusal + relação 1:1',
          'Procurar dor, febre, estresse, hipovolemia, anemia, hipóxia',
        ],
        [
          'Taquicardia regular, QRS estreito, muito rápida',
          'SVT',
          'P pode estar escondida, retrógrada ou fundida à T',
          'Manobra vagal + investigar mecanismo',
        ],
        [
          'Irregularmente irregular + P ausente',
          'Fibrilação atrial',
          'Intervalos R–R caóticos; fibrillation waves possíveis',
          'Eco + Holter + controle de frequência',
        ],
        [
          'QRS prematuro, largo e morfologia anormal',
          'VPC',
          'Geralmente sem P condutora antes',
          'Quantificar frequência/complexidade + procurar causa',
        ],
        [
          'Sequência rápida de complexos ventriculares',
          'VT',
          'QRS largos de origem ventricular',
          'Avaliar pulso/PA/perfusão imediatamente',
        ],
        [
          'P normal + PR aumentando até QRS falhar',
          'Mobitz I (Wenckebach)',
          'PR progressivo',
          'Avaliar influência vagal',
        ],
        [
          'PR constante e P ocasional não conduzida',
          'Mobitz II',
          'Falha súbita de condução',
          'Investigar doença de condução; considerar pacing',
        ],
        [
          'P e QRS sem relação',
          'BAV 3º grau',
          'Dissociação AV',
          'Considerar marcapasso se sintomático',
        ],
        [
          'Sem P + bradicardia em hipercalêmico',
          'Ritmo sinoventricular / atrial standstill funcional',
          'P desaparece com K alto',
          'Tratar hipercalemia antes de diagnosticar standstill permanente',
        ],
        [
          'PR curto + delta wave',
          'Preexcitação',
          'Ativação ventricular precoce',
          'Investigar via acessória/AVRT — evitar digoxina',
        ],
      ],
    },
    tabelaJornadaDiagnostica: {
      kind: 'clinicalTable' as const,
      title: 'Jornada diagnóstica — arritmias cardíacas',
      headers: ['Etapa', 'Exame/decisão', 'Por que fazer', 'Limitações'],
      rows: [
        ['1', 'Avaliação hemodinâmica', 'Determina urgência', 'PA normal não exclui baixo débito compensado'],
        ['2', 'ECG multiderivações', 'Identifica mecanismo/morfologia', 'Minutos de ECG não excluem eventos intermitentes'],
        ['3', 'Pressão + pulso simultâneo', 'Relaciona evento elétrico à ejeção', 'Déficit de pulso pode variar'],
        ['4', 'Eletrólitos/glicemia', 'Detecta causas reversíveis', 'Mg sérico normal não exclui déficit corporal'],
        ['5', 'Hemograma/bioquímica', 'Anemia, inflamação, disfunção orgânica', 'Não diagnóstica mecanismo elétrico'],
        ['6', 'Ecocardiograma', 'Identifica substrato estrutural', 'Eco normal não exclui canalopatia'],
        ['7', 'Holter 24–48 h', 'Quantifica carga e correlaciona sintomas', 'Variação diária exige interpretação'],
        ['8', 'Event monitor/loop recorder', 'Eventos muito raros', 'Maior custo/invasividade'],
        ['9', 'Troponina I', 'Lesão miocárdica/miocardite', 'Não específica para etiologia'],
        ['10', 'T4 em gatos quando indicado', 'Hipertireoidismo → taquicardia', 'Não pedir indiscriminadamente'],
        ['11', 'Estudo eletrofisiológico', 'Mecanismo + ablação', 'Centro especializado'],
      ],
    },
    holterIndicacoes:
      'Holter especialmente indicado em: síncope ou colapso episódico; ECG curto normal com alta suspeita; Dobermann/Boxer conforme protocolo de cardiomiopatia; quantificar carga ventricular; SSS e pausas; resposta a sotalol/mexiletina; controle de FC na fibrilação atrial (meta ORCA ≤125 bpm); correlacionar evento clínico e ritmo. Holter não é só “contador de VPC” — avaliar FC média/mín/máx, complexidade, pausas e arritmias supraventriculares. (1)(5)(10)',
    ecgQualidade:
      'Padronizar ECG conforme BSAVA Guide to Procedures: paciente calmo, ambiente silencioso, minimizar contenção, posição lateral direita quando tolerada, eletrodos corretos, documentar velocidade (25 mm/s; 50 mm/s para medidas finas) e ganho (10 mm/mV). Registrar espécie, peso, data, medicamentos, posição, velocidade e ganho. (3)',
    figuraHolterGatosSaudaveis: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/arritmias-cardiacas-caes-gatos/holter-gatos-saudáveis-cofaru-2026.png',
      alt: 'Exemplos de ectopia ventricular em gatos clinicamente saudáveis durante Holter de 24 horas — couplets, bigeminismo e taquicardia ventricular breve.',
      caption:
        'Ectopia ventricular registrada em gatos saudáveis durante Holter de 24 h — VPC isolado ou complexo não equivale automaticamente a cardiomiopatia; interpretar no contexto clínico e ecocardiográfico. Cofaru et al., 2026. (14)',
      display: 'wide',
    },
    arrAtualizacao2026Gatos:
      'Cofaru et al. (2026) monitoraram gatos clinicamente saudáveis por Holter de 24 h e identificaram ectopia ventricular (incluindo couplets, bigeminismo e episódios de VT breve) com frequência surpreendentemente alta apesar de ECG convencional inicial sem arritmia. Implicações clínicas: (1) ECG curto normal não exclui ectopia relevante; (2) VPC isolado em gato não autoriza diagnosticar cardiomiopatia sem integrar eco, clínica e evolução; (3) Holter ganha papel em síncope felina, cardiopatas e investigação de carga arrítmica. (14)(15)',
  },

  treatment: {
    arrNotaEstratificacao:
      'Não existe sistema universal validado de “estágios de arritmia” comparável ao ACVIM da doença valvar. A estratificação de urgência abaixo é organização clínica do ConsultaVET — verde: monitorar/investigar (VPC/APC isolado assintomático, AIVR estável); amarelo: avaliação prioritária (ectopia frequente, nova arritmia em cardiopata, síncope leve); laranja: urgente (VT com pulso, SVT muito rápida com baixo débito, FA descompensada, BAV avançado sintomático); vermelho: emergência RECOVER (VF, VT sem pulso, PEA, assistolia). (4)(25)',
    arrFaCaninaOrca:
      'Pedro et al. (ORCA, 2023) demonstraram associação forte entre frequência cardíaca média de Holter e prognóstico em cães com FA secundária: FC média 24 h ≤125 bpm associou-se a mediana de sobrevida ~608 dias versus ~33 dias acima desse alvo no estudo — risco de morte substancialmente menor no grupo controlado. Trata-se de associação observacional, não prova causal universal. Meta prática preferencial: FC média de Holter ≤125 bpm quando clinicamente tolerado. ECG hospitalar >150 bpm → alta suspeita de controle inadequado; ECG <150 bpm → realizar Holter; Holter >125 bpm → intensificar terapia; Holter ≤125 bpm → controle adequado pelo critério do estudo. (10)(11)',
    arrAdenosinaAlerta:
      'Adenosina não deve aparecer como primeira escolha padrão para SVT canina com base em extrapolação da medicina humana. Nelson & Couto relata que adenosina foi ineficaz para terminar SVTs em cães e não a coloca como tratamento-padrão da SVT canina. (1)',
    arrVtAgudaCao:
      'VT sustentada com pulso em cão: estabilizar O₂/perfusão, corrigir K⁺/Mg²⁺/causa precipitante. Lidocaína 2 mg/kg IV lentamente; repetir incrementos de ~2 mg/kg até dose cumulativa ~8 mg/kg em ≥10 min. Se resposta: CRI 25–80 µg/kg/min. Monitorar ECG contínuo, PA, ataxia, convulsões. Refratária: procainamida 2–4 mg/kg IV (cumulativo até ~20 mg/kg) → CRI 20–50 µg/kg/min; amiodarona, sotalol ou cardioversão sincronizada conforme substrato. (1)(4)(7)',
    arrVtAgudaGato:
      '⚠️ ALERTA: NÃO utilizar dose canina de lidocaína em gatos. Gatos: 0,25–0,5 mg/kg IV lentamente; CRI ~10–20 µg/kg/min se eficaz. Toxicidade: convulsões, bradicardia, depressão cardiovascular/respiratória, morte. Procainamida 1–2 mg/kg IV lentamente se refratário — extrema monitorização. (1)(4)(7)',
    arrAivr:
      'Ritmo idioventricular acelerado (AIVR): frequência ventricular moderada (cães ~60–160 bpm; gatos até ~240 bpm), QRS largos, dissociação AV incompleta possível. Frequentemente estável, autolimitante, melhora ao tratar doença de base — não suprimir apenas porque QRS é ventricular. (4)',
    arrBradiarritmias:
      'Bradicardia sintomática: ECG, K⁺, temperatura, drogas, doença vagal. Atropina 0,04 mg/kg IV como teste (reavaliar ECG em 5–15 min). Resposta parcial não exclui SSS estrutural. Terapia-ponte: glicopirrolato 0,005–0,01 mg/kg IV/IM; isoproterenol ~0,04–0,09 µg/kg/min IV titulado. Doença avançada de condução → marcapasso temporário se necessário e permanente como definitivo. (1)(4)(5)(20)',
    arrSss:
      'Sick sinus syndrome: bradicardia sinusal, pausas, sinus arrest, síndrome bradicardia–taquicardia. Predispostos: Schnauzer Miniatura, Westie, Dachshund, Cocker; rara em gatos. ECG basal pode ser normal — Holter essencial; pausas >6–7 s em cão acordado são fortemente sugestivas. Sintomático + resposta inadequada à atropina → marcapasso permanente. (1)(4)(5)',
    arrBloqueiosAv:
      'Mobitz I (Wenckebach): frequentemente vagal — investigar causa se assintomático. Mobitz II e BAV 3º grau: doença estrutural de condução; sintomático → marcapasso. Atropina produz pouca melhora em bloqueio estrutural avançado. Antes de atrial standstill permanente, excluir hipercalemia — atividade atrial pode retornar após normalizar K⁺. (1)(4)(8)',
    arrAvrtPreexcitacao:
      'Via acessória pode causar PR curto, delta wave (preexcitação) ou ser oculta. AVRT: taquicardia reentrante rápida. Digoxina deve ser evitada em preexcitação/AVRT com risco de condução pela via acessória — bloquear nó AV pode favorecer condução anterógrada pela via e desencadear arritmia ventricular grave. (1)(16)',
    arrAblationAvrt:
      'Wright et al.: 89 cães com vias acessórias — Labrador ~metade dos casos; ablação por radiofrequência com sucesso ~95% após um procedimento e ~99% considerando repetição em centro experiente. Cardiomiopatia induzida por taquicardia identificada em parcela relevante — disfunção pode regredir após ablação. AVRT recorrente pode ser tratamento potencialmente curativo, não terapia antiarrítmica vitalícia. Figura de referência externa (CC BY-NC): https://pmc.ncbi.nlm.nih.gov/articles/PMC6189389/ (16)',
    arrTorsades:
      'Torsades de pointes: VT polimórfica com QT longo. Suspender drogas desencadeadoras; corrigir K⁺ e Mg²⁺; monitorização contínua. Sulfato de magnésio 25–40 mg/kg IV lentamente diluído — considerado em torsades, hipomagnesemia e algumas arritmias digitálicas. (1)(6)(9)',
    arrVfVtSemPulso:
      '🚨 VF e VT sem pulso são ritmos de parada cardiorrespiratória — NÃO seguir algoritmo de VT com pulso. Conduta: BLS de alta qualidade, reconhecimento do ritmo, desfibrilação, ALS segundo RECOVER 2024; minimizar interrupções de compressões. https://recoverinitiative.org/2024-guidelines/ (25)',
    farmacos: {
      kind: 'clinicalTable',
      title: 'Antiarrítmicos — doses e monitorização',
      headers: [
        'Fármaco',
        'Espécie / via',
        'Dose',
        'Contexto',
        'Contraindicações',
        'Monitorização',
        'Fonte',
      ],
      rows: [
        [
          'Lidocaína',
          'Cão IV',
          'Bolus 2 mg/kg IV; repetir até ~8 mg/kg cumulativo; CRI 25–80 µg/kg/min',
          'VT sustentada com pulso — primeira escolha canina',
          'Hepatopatia grave, bloqueio AV avançado, hipocalemia (↓ eficácia)',
          'ECG contínuo, PA, sinais neurológicos',
          '(1)(4)(7)',
        ],
        [
          'Lidocaína',
          'Gato IV',
          '0,25–0,5 mg/kg IV lentamente; CRI 10–20 µg/kg/min',
          'VT refratária — dose MUITO menor que cão',
          'NÃO usar dose canina — neuro/cardiotoxicidade',
          'ECG, PA, convulsões',
          '(1)(4)(7)',
        ],
        [
          'Procainamida',
          'Cão IV',
          '2–4 mg/kg IV lento; cumulativo até ~20 mg/kg; CRI 20–50 µg/kg/min',
          'VT refratária à lidocaína',
          'Hipotensão se bolus rápido, ICC descompensada',
          'ECG, PA',
          '(4)(7)',
        ],
        [
          'Mexiletina',
          'Cão VO',
          '5–8 mg/kg q8h (titular)',
          'Arritmias ventriculares crônicas; ARVC/Boxer',
          'Hepatopatia, vômito/diarreia',
          'Holter pré/pós, função hepática',
          '(6)(19)',
        ],
        [
          'Sotalol',
          'Cão VO',
          '0,5–3 mg/kg q12h',
          'VT, SVT selecionada, ARVC',
          'ICC aguda, bloqueio AV, QT longo, hipocalemia',
          'ECG/QTc, K⁺, Holter',
          '(6)(18)',
        ],
        [
          'Sotalol',
          'Gato VO',
          '2 mg/kg q12h (início; titular)',
          'Taquiarritmias selecionadas',
          'CMH descompensada, bradicardia',
          'ECG, PA, Holter',
          '(6)',
        ],
        [
          'Amiodarona',
          'Cão VO',
          'Carga 10–15 mg/kg q12h ~7 d → 5–7,5 mg/kg q12h ~2 sem → manutenção 5–7,5 mg/kg q24h',
          'Arritmias refratárias — cardiologista',
          'Hepatopatia, tireoide, interações',
          'ALT/AST, T4/TSH, ECG/QT',
          '(6)(7)(18)',
        ],
        [
          'Diltiazem',
          'Cão VO / IV',
          'VO 0,5–2 mg/kg q8h (IR) ou LP q12h; IV agudo 0,05–0,25 mg/kg lentamente',
          'SVT, controle AV na FA',
          'DCM/disfunção sistólica, hipotensão, BAV',
          'FC, PA, PR, sinais ICC',
          '(6)(7)(12)',
        ],
        [
          'Digoxina',
          'Cão VO',
          '2,5–5 µg/kg q12h; máx ~0,25 mg/cão q12h',
          'Controle AV na FA — frequentemente com diltiazem',
          'Via acessória/preexcitação, DRC, hipocalemia',
          'Creatinina, K⁺, ECG, nível sérico 6–8 h pós-dose',
          '(1)(6)(12)',
        ],
        [
          'Atenolol',
          'Cão VO',
          '0,2–2 mg/kg q12h titulado',
          'SVT, ectopia catecolaminérgica, rate control selecionado',
          'ICC aguda, choque, BAV, SSS',
          'FC, PA, PR',
          '(6)',
        ],
        [
          'Esmolol',
          'Cão/gato IV',
          'Bolus 0,05–0,5 mg/kg IV; CRI 25–200 µg/kg/min',
          'SVT aguda, taquicardia catecolaminérgica',
          'DCM, ICC descompensada, bloqueio AV',
          'ECG, PA contínuos',
          '(4)(6)',
        ],
        [
          'Atropina',
          'Cão/gato IV/IM',
          '0,01–0,04 mg/kg; teste 0,04 mg/kg',
          'Bradicardia vagal, teste diagnóstico SSS/BAV',
          'Taquicardia, glaucoma',
          'ECG 5–15 min pós-dose',
          '(1)(5)(7)',
        ],
        [
          'Verapamil',
          'Cão/gato IV/VO',
          'Cão IV 0,05 mg/kg lento; gato IV 0,025 mg/kg; VO cão 0,5–3 mg/kg q8h',
          'SVT selecionada — 2ª linha vs diltiazem em muitos casos',
          'DCM, ICC, BAV, combinação IV com β-bloqueador',
          'ECG, PA, inotropismo',
          '(6)',
        ],
      ],
    },
    tabelaClassesAntiarritmicos: {
      kind: 'clinicalTable',
      title: 'Classes antiarrítmicas (Vaughan-Williams) — mecanismo',
      headers: ['Classe', 'Principal mecanismo', 'Exemplos', 'Utilização típica'],
      rows: [
        ['IA', 'Bloqueio Na⁺ + prolongamento repolarização', 'Procainamida', 'VT refratária, algumas SVTs'],
        ['IB', 'Bloqueio Na⁺ em tecido ventricular doente', 'Lidocaína, mexiletina', 'Arritmias ventriculares'],
        ['IC', 'Bloqueio intenso condução', 'Flecainida, propafenona', 'Casos selecionados/especialista'],
        ['II', 'Bloqueio β-adrenérgico', 'Atenolol, esmolol, propranolol', 'SVT, ectopia catecolaminérgica, rate control'],
        ['III', 'Bloqueio K⁺ / prolongamento refratariedade', 'Sotalol, amiodarona', 'Arritmias ventriculares e algumas SVTs'],
        ['IV', 'Bloqueio Ca²⁺ L nodal', 'Diltiazem, verapamil', 'SVT e controle AV'],
        ['Outros', 'Aumento vagal', 'Digoxina', 'Controle AV na FA'],
        ['Outros', 'Vagólise', 'Atropina', 'Bradicardia vagal'],
        ['Dispositivo', 'Estimulação artificial', 'Marcapasso', 'SSS/BAV avançado'],
        ['Intervenção', 'Destruição seletiva circuito', 'Ablação RF', 'Via acessória/foco selecionado'],
      ],
    },
    arrInteracoesAltoRisco:
      'Antes de combinar antiarrítmicos: diltiazem/verapamil + β-bloqueador → bradicardia, BAV, hipotensão, depressão inotrópica (usar só com justificativa e monitorização). Digoxina + hipocalemia → toxicidade digitálica. Digoxina + DRC → concentração elevada. Sotalol + hipocalemia/QT longo → torsades. Múltiplas drogas que prolongam QT → somação pró-arrítmica. Lidocaína em hepatopatia/baixo débito → clearance reduzido. (6)(7)',
    alertasSeguranca: [
      '⚠️ Lidocaína em gatos: doses muito menores que em cães — neuro e cardiotoxicidade. (1)(7)',
      '⚠️ β-bloqueador + diltiazem/verapamil: depressão cardíaca, hipotensão e BAV grave. (6)(7)',
      '⚠️ Digoxina + preexcitação/via acessória: risco de condução pela via acessória e arritmia ventricular grave. (1)',
      '⚠️ Hipocalemia + sotalol/QT longo: maior risco de torsades. (6)(9)',
      '⚠️ VF/VT sem pulso: algoritmo RECOVER/desfibrilação — não antiarrítmico ambulatorial. (25)',
      '⚠️ Redução de VPC no Holter não prova automaticamente menor risco de morte súbita. (1)(18)',
    ],
    errosComuns: [
      '“Todo VPC precisa de lidocaína” — falso; VPC isolado assintomático frequentemente não requer supressão. (1)',
      '“ECG normal de 5 minutos exclui arritmia” — falso; eventos paroxísticos exigem Holter. (5)',
      '“VPC em gato significa cardiomiopatia” — falso; ectopia ocorre em gatos saudáveis no Holter. (14)',
      '“Frequência de consultório basta para acompanhar FA” — Holter fornece avaliação superior; meta ORCA ≤125 bpm. (10)',
      '“Adenosina é primeira escolha porque funciona em humanos” — não sustentado como padrão em cães. (1)',
      '“Digoxina é segura em paciente com via acessória” — pode ser perigosa. (1)(16)',
      '“BAV completo vai melhorar porque demos atropina” — doença estrutural avançada geralmente necessita pacing. (4)(5)',
      '“Reduzir VPC no Holter prova menor risco de morte súbita” — endpoint substituto, não necessariamente sobrevida. (1)(18)',
      'Tratar taquicardia sinusal com antiarrítmico em vez de corrigir dor, febre, anemia ou hipovolemia. (1)',
      'Equivaler dose canina de lidocaína em gatos — erro potencialmente fatal. (1)(7)',
    ],
    monitoramento: [
      'Sotalol: ECG, FC, QT/QTc, K⁺, creatinina, PA, Holter pré/pós-terapia.',
      'Mexiletina: Holter, apetite, vômito/diarreia, função hepática quando indicado.',
      'Digoxina: função renal, K⁺, sinais GI, ECG, concentração sérica 6–8 h pós-dose após equilíbrio.',
      'Amiodarona: ECG/QT, enzimas hepáticas, função tireoidiana, sinais GI, interações.',
      'Diltiazem/β-bloqueadores: FC, PA, PR/condução AV, sinais de baixo débito/ICC.',
      'Lidocaína IV: ECG contínuo, PA, ataxia, tremores, convulsões.',
      'FA canina: Holter seriado para meta ≤125 bpm; spot-check ECG portátil pode complementar, não substituir Holter automaticamente. (10)(13)',
      'Pacing: telemetria, limiares, revisão de gerador conforme protocolo do centro. (20)(21)',
    ],
    arrParticularidadesCaes:
      'Dobermann: DCM oculta, VPC/VT antes de dilatação, síncope, morte súbita — Holter essencial. Boxer: ARVC com VPC, bigeminismo, VT — mas síncope reflexa/bradiarrítmica também ocorre; colapso não é automaticamente VT. Schnauzer Miniatura/Westie: SSS. Labrador: predisposição a vias acessórias/AVRT em grandes séries. FA secundária a MMVD/DCM: controle de frequência com evidência ORCA. (1)(10)(16)(17)(23)',
    arrParticularidadesGatos:
      'FC elevada por estresse extremamente comum no consultório. BAV 3º grau pode ser melhor tolerado que em cães. SSS rara. FA acompanha doença atrial/cardiomiopatia importante — não copiar metas caninas. Lidocaína exige doses muito menores. VPC isolado ≠ cardiomiopatia (Cofaru 2026). CMH felina: avaliar segundo consenso ACVIM; digoxina frequentemente inadequada. (1)(5)(14)(15)',
    preclinica: [
      'Raças de risco (Dobermann, Boxer): rastreio combinado eco + Holter conforme protocolo racial — ectopia ventricular pode preceder dilatação. (1)(17)(23)',
      'VPC isolado assintomático com função preservada: investigar causa e monitorar — supressão farmacológica nem sempre indicada. (1)(14)',
      'FA canina recém-diagnosticada: ecocardiograma, tratar doença de base, iniciar controle de frequência e planear Holter para meta ≤125 bpm. (10)(12)',
    ],
    aguda: [
      'Instabilidade hemodinâmica: O₂, ECG imediato, PA, acesso IV, tratar ritmo e causa simultaneamente — minimizar manipulação. (4)(5)',
      'VT com pulso (cão): lidocaína IV titulada; corrigir eletrólitos; procainamida se refratária. (1)(4)(7)',
      'VT com pulso (gato): lidocaína em dose felina reduzida apenas com monitorização intensiva. (1)(7)',
      'SVT com repercussão: manobra vagal + diltiazem IV; evitar adenosina como padrão canino. (1)(4)',
      'VF/VT sem pulso: RECOVER 2024 — desfibrilação, compressões, ALS. (25)',
      'Hipercalemia com alteração ECG: gluconato de cálcio 10% 0,5–1,5 mL/kg IV lento (estabiliza membrana; NÃO reduz K⁺ sérico). (8)',
    ],
    cronica: [
      'FA canina: diltiazem + digoxina frequentemente primeira linha crônica; titular com Holter (meta ≤125 bpm). Romito 2025: combinação superior a monoterapias em estudo clínico. (10)(12)',
      'Arritmias ventriculares crônicas: sotalol, mexiletina ± atenolol conforme substrato (Boxer/ARVC, Pastor Alemão); confirmar eficácia por Holter — redução ≥80–85% de VPC é endpoint de estudo, não prova de sobrevida. (18)(19)(24)',
      'SSS/BAV avançado sintomático: marcapasso permanente — farmacoterapia como ponte. (4)(5)(20)',
      'AVRT recorrente: considerar ablação por radiofrequência — potencialmente curativa. (16)',
    ],
  },
  prevention: {
    rastreio:
      'Rastrear raças predispostas (Dobermann, Boxer, Schnauzer Miniatura, Westie, Labrador) com eco e Holter conforme protocolo de cardiomiopatia e idade. Sopro ou arritmia detectada → investigação completa, não supressão automática de VPC. (1)(17)(23)',
    monitorizacaoEletrólitos:
      'Monitorar K⁺ e Mg²⁺ em cardiopatas, UTI e pacientes em diuréticos/antiarrítmicos — hipocalemia e hipomagnesemia predisponem ectopia e torsades. (9)',
    farmacovigilancia:
      'Evitar associações pró-arrítmicas (múltiplos agentes que prolongam QT; β-bloqueador + bloqueador de Ca²⁺ sem monitorização). Revisar lista completa de medicamentos antes de classificar arritmia como idiopática. (6)(7)',
    taquicardiaPersistente:
      'Tratar SVT persistente e FA não controlada antes de cardiomiopatia induzida por taquicardia — parte da disfunção pode regredir após controle definitivo. (16)',
    tutor:
      'Ensinar reconhecimento de colapso/síncope e urgência — movimentos breves não excluem síncope arrítmica. Episódios relacionados a exercício/excitação com recuperação rápida sugerem causa cardíaca até prova em contrário. (5)',
  },
  relatedConsensusSlugs: ['acvim-mmvd-canina-2019'],
  relatedDiseaseSlugs: [
    'cardiomiopatia-dilatada-caes-gatos',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'doenca-valvar-mitral-degenerativa-caes',
    'hipertensao-arterial-sistemica-caes-gatos',
    'hipertireoidismo-felino',
    'colapso-traqueal-canino',
  ],
  relatedMedicationSlugs: [
    'diltiazem',
    'digoxina',
    'atenolol',
    'propranolol',
    'esmolol',
    'sotalol',
    'atropina',
    'lidocaina',
    'betabloqueadores',
  ],
  references: [
    {
      id: 'ref-nelson-arrhythmias',
      citationText:
        'Ware WA, Ward JL. Cardiac Arrhythmias and Antiarrhythmic Therapy. In: Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier, 2020. Cap. 4, p. 77–99.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Fonte principal — fisiopatologia clínica, interpretação e manejo geral das arritmias.',
    },
    {
      id: 'ref-cunningham-ecg',
      citationText:
        'Klein BG. Cunningham\'s Textbook of Veterinary Physiology. 6th ed. Elsevier, 2020. Cap. 19–20, Electrical Activity of the Heart and The Electrocardiogram.',
      sourceType: 'Fisiologia',
      url: null,
      evidenceLevel: 'Didático',
      notes: 'Automaticidade, potenciais de ação, condução e correlação ECG.',
    },
    {
      id: 'ref-bsava-ecg',
      citationText:
        'Bexfield N, Riggs J (eds.). BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. BSAVA, 2024. Electrocardiography, from p. 142.',
      sourceType: 'Guia de procedimento',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Padronização técnica da obtenção do ECG.',
    },
    {
      id: 'ref-bsava-emergency',
      citationText:
        'King LG, Boag A (eds.). BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA, 2018. Cap. 6, Cardiovascular Emergencies, p. 55–92.',
      sourceType: 'Emergência',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'SVT, VT, AIVR, bloqueios e estabilização emergencial.',
    },
    {
      id: 'ref-drobatz-arrhythmias',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.). Textbook of Small Animal Emergency Medicine. Wiley Blackwell, 2019. Cap. 5, 53, 60 — ventricular ectopy, arrhythmias, bradyarrhythmias and pacemakers.',
      sourceType: 'Emergência',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Monitorização prolongada, síncope, SSS e pacing.',
    },
    {
      id: 'ref-bsava-formulary',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. BSAVA, 2020.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Monografias de antiarrítmicos veterinários.',
    },
    {
      id: 'ref-plumbs',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley, 2023.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Doses e interações farmacológicas.',
    },
    {
      id: 'ref-lumb-jones',
      citationText:
        'Lamont L et al. (eds.). Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Wiley, 2024. Cap. 33–36.',
      sourceType: 'Fisiologia',
      url: null,
      evidenceLevel: 'Didático',
      notes: 'Consequências hemodinâmicas da taquicardia e alterações eletrolíticas.',
    },
    {
      id: 'ref-dibartola',
      citationText:
        'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. Elsevier.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Potássio, magnésio, hipercalemia e arritmias.',
    },
    {
      id: 'ref-orca-2023',
      citationText:
        'Pedro B, Mavropoulou A, Oyama MA, et al. Optimal rate control in dogs with atrial fibrillation—ORCA study. J Vet Intern Med. 2023;37:887–899.',
      sourceType: 'Estudo clínico',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10229328/',
      evidenceLevel: 'Alta',
      notes: 'Meta FC média Holter ≤125 bpm em FA secundária canina.',
    },
    {
      id: 'ref-orca-ii',
      citationText:
        'Pedro B, et al. Cardiac remodeling associated with achievement of rate control in dogs with atrial fibrillation: ORCA II. J Vet Intern Med. 2024;38:2076–2088.',
      sourceType: 'Estudo clínico',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256134/',
      evidenceLevel: 'Alta',
      notes: 'Remodelamento cardíaco associado ao controle de frequência na FA.',
    },
    {
      id: 'ref-romito-diltiazem-digoxin-2025',
      citationText:
        'Romito G, et al. Clinical efficacy and safety of diltiazem, digoxin and their combination for ventricular rate control in dogs with secondary atrial fibrillation. J Vet Cardiol. 2025. DOI: 10.1016/j.jvc.2024.10.006.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39591830/',
      evidenceLevel: 'Alta',
      notes: 'Combinação diltiazem + digoxina vs monoterapias na FA canina.',
    },
    {
      id: 'ref-oliveira-spot-check-2026',
      citationText:
        'Oliveira MI, et al. Use of a spot-check protocol to measure ventricular response rate in dogs with atrial fibrillation. J Vet Cardiol. 2026;63:16–27.',
      sourceType: 'Estudo clínico',
      url: 'https://www.sciencedirect.com/science/article/pii/S1760273425001092',
      evidenceLevel: 'Moderada',
      notes: 'ECG portátil/spot-check complementar ao Holter na FA.',
    },
    {
      id: 'ref-cofaru-holter-cats-2026',
      citationText:
        'Cofaru A, Murariu R, Scurtu IC. Assessment of arrhythmias in healthy cats using 24-hour Holter monitoring: a cross-sectional study. BMC Vet Res. 2026;22:289.',
      sourceType: 'Estudo clínico',
      url: 'https://link.springer.com/article/10.1186/s12917-026-05364-4',
      evidenceLevel: 'Moderada',
      notes: 'Ectopia ventricular em gatos saudáveis no Holter.',
    },
    {
      id: 'ref-acvim-feline-cm',
      citationText:
        'Luis Fuentes V, et al. ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. J Vet Intern Med. 2020.',
      sourceType: 'Consenso',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7255676/',
      evidenceLevel: 'Alta',
      notes: 'Avaliação cardiovascular felina incluindo eco, ECG e monitorização.',
    },
    {
      id: 'ref-wright-avrt',
      citationText:
        'Wright KN, Connor CE, Irvin HM, et al. Atrioventricular accessory pathways in 89 dogs: clinical features and outcome after radiofrequency catheter ablation. J Vet Intern Med. 2018;32:1517–1529.',
      sourceType: 'Estudo clínico',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6189389/',
      evidenceLevel: 'Alta',
      notes: 'Ablação por radiofrequência em AVRT canina.',
    },
    {
      id: 'ref-oyama-arvc',
      citationText:
        'Oyama MA, Reiken S, Lehnart SE, et al. Arrhythmogenic right ventricular cardiomyopathy in Boxer dogs is associated with calstabin2 deficiency. Clin Transl Sci. 2008.',
      sourceType: 'Estudo',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2904305/',
      evidenceLevel: 'Moderada',
      notes: 'ARVC em Boxer — substrato de arritmias ventriculares.',
    },
    {
      id: 'ref-romito-sotalol-amiodarone-2024',
      citationText:
        'Romito G, et al. Efficacy and safety of antiarrhythmic therapy with amiodarone or sotalol in dogs with tachyarrhythmias. J Vet Cardiol. 2024;53:20–35.',
      sourceType: 'Estudo clínico',
      url: 'https://www.sciencedirect.com/science/article/pii/S1760273424000250',
      evidenceLevel: 'Moderada',
      notes: 'Sotalol vs amiodarona — controle eletrocardiográfico, não morte súbita.',
    },
    {
      id: 'ref-romito-mexiletine-2025',
      citationText:
        'Romito G, et al. Evaluation of mexiletine for treatment of ventricular arrhythmias in dogs. J Am Vet Med Assoc. 2025. DOI: 10.2460/javma.25.02.0088.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40523634/',
      evidenceLevel: 'Moderada',
      notes: 'Mexiletina em arritmias ventriculares caninas.',
    },
    {
      id: 'ref-pacing-review',
      citationText:
        'Review: pacing indications and techniques in small animals. Open access review.',
      sourceType: 'Revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7185536/',
      evidenceLevel: 'Moderada',
      notes: 'Indicações e técnicas de marcapasso.',
    },
    {
      id: 'ref-pacemaker-104-dogs',
      citationText:
        'Retrospective study of permanent pacemaker implantation in 104 dogs (BAV, SSS and related indications).',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17212742/',
      evidenceLevel: 'Moderada',
      notes: 'Prognóstico contextual pós-marcapasso — não universalizar resultados históricos.',
    },
    {
      id: 'ref-acvim-mmvd',
      citationText:
        'Keene BW, Atkins CE, Bonagura JD, et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33:1127–1140.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.15488',
      evidenceLevel: 'Alta',
      notes: 'FA e cardiopatia valvar concomitante.',
    },
    {
      id: 'ref-meurs-boxer-2002',
      citationText:
        'Meurs KM, et al. Comparison of the effects of four antiarrhythmic treatments for familial ventricular arrhythmias in Boxers. J Am Vet Med Assoc. 2002;221:522–527.',
      sourceType: 'Estudo clínico',
      url: null,
      evidenceLevel: 'Moderada',
      notes: 'Sotalol e combinações com mexiletina em Boxer.',
    },
    {
      id: 'ref-gelzer-gsd-2010',
      citationText:
        'Gelzer AR, et al. Combination therapy with mexiletine and sotalol suppresses inherited ventricular arrhythmias in German Shepherd dogs better than either drug alone. J Vet Cardiol. 2010;12:93–106.',
      sourceType: 'Estudo clínico',
      url: null,
      evidenceLevel: 'Moderada',
      notes: 'Combinação mexiletina + sotalol em Pastor Alemão.',
    },
    {
      id: 'ref-recover-2024',
      citationText:
        'RECOVER Initiative. 2024 Veterinary CPR Guidelines.',
      sourceType: 'Diretriz',
      url: 'https://recoverinitiative.org/2024-guidelines/',
      evidenceLevel: 'Alta',
      notes: 'VF, VT sem pulso e parada cardiorrespiratória.',
    },
    {
      id: 'ref-walker-hcm-holter-2022',
      citationText:
        'Walker AL, Ueda Y, Crofton AE, Harris SP, Stern JA. Ambulatory electrocardiography, heart rate variability and pharmacologic stress testing in cats with subclinical hypertrophic cardiomyopathy. Sci Rep. 2022;12:1963.',
      sourceType: 'Estudo clínico',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8817045/',
      evidenceLevel: 'Moderada',
      notes: 'Holter e monitorização em CMH felina subclínica.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
