import type { DiseaseRecord } from '../../types/disease';

/**
 * Cetoacidose diabética (CAD/DKA) em cães e gatos — síntese editorial ConsultaVET.
 * Regra central: diabetes + cetose + acidose metabólica → emergência com fluido, K⁺ e insulina gradual.
 * Prioridade: AAHA 2026 (gato) > ALIVE Cycle 3 > AAHA Fluid 2024 > VIN/ECC > BHB (Di Tommaso, Duarte).
 * Figuras CC BY-NC (iCatCare, Reed) não hospedadas — fluxos textuais e clinicalTable.
 */
export const cetoacidoseDiabeticaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-cetoacidose-diabetica-caes-gatos',
  slug: 'cetoacidose-diabetica-caes-gatos',
  title: 'Cetoacidose diabética em cães e gatos',
  subtitle:
    'Complicação metabólica emergencial do diabetes mellitus em cães e gatos — cetose, acidose, hipovolemia, distúrbios eletrolíticos e doença precipitante',
  synonyms: [
    'CAD',
    'DKA',
    'Diabetic ketoacidosis',
    'Cetoacidose diabética',
    'Cetose diabética',
    'CAD euglicêmica',
    'eDKA',
    'EDKA',
    'Estado hiperglicêmico hiperosmolar',
    'EHH',
    'HHS',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  categories: ['emergencia-intensivismo'],
  tags: [
    'Emergência metabólica',
    'Beta-hidroxibutirato',
    'BHB',
    'Insulina regular',
    'Fluidoterapia',
    'Potássio',
    'Acidose metabólica',
    'eDKA',
    'SGLT2',
    'Pancreatite',
    'ITU',
    'Hiperadrenocorticismo',
  ],
  vinReferencePending: true,
  quickSummary:
    'A cetoacidose diabética (CAD) é diabetes mellitus complicado por **cetose significativa e acidose metabólica** — não trate só a glicose: hipovolemia, K⁺ paradoxal, queda osmótica rápida e doença concomitante matam antes da hiperglicemia isolada. Tríade: diabetes/hiperglicemia (ou eDKA com glicemia aparentemente normal em gatos com iSGLT2) + cetonemia (BHB preferencial) + acidose (pH **<7,35** com bicarbonato reduzido — ALIVE 2026). **Cetose diabética (DK)** = cetose sem acidose — monitorar de perto. **eDKA/EDKA** = cetose + acidose com glicemia <250 mg/dL — suspender iSGLT2, insulina + dextrose. Fluido primeiro; insulina após perfusão e K⁺ seguros; meta glicêmica 150–300 mg/dL com queda ~50 mg/dL/h enquanto BHB cai; bicarbonato e antibióticos **não** são rotina. (1)(2)(3)(5)(6)(7)(10)(12)(13)',
  quickDecisionStrip: [
    'Diabetes doente + BHB elevado + acidose = CAD — tratar como CAD mesmo se gasometria completa demorar; estabilizar perfusão primeiro. (1)(2)(7)(10)',
    'eDKA/EDKA (gato com iSGLT2): glicemia pode estar <250 mg/dL com BHB alto e acidose — **suspender iSGLT2**, insulina + dextrose hospitalar; não confiar na glicemia aparente. (3)(4)(5)',
    'BHB sanguíneo > cetonúria — fita urinária mede acetoacetato e pode subestimar CAD grave; ter medidor POC na clínica. (3)(4)(14)(15)',
    'BHB <2,3 mmol/L (cão, Di Tommaso) aumenta sensibilidade para não perder CAD; >4,3 mmol/L aumenta especificidade; Duarte: 3,8 mmol/L equilíbrio sens/esp em cães. (14)(15)',
    'DK (cetose sem acidose): não é CAD completa, mas pode evoluir — tratar cetose e monitorar pH/HCO₃⁻ seriadamente. (5)(7)',
    'K⁺ sérico “normal” ou alto pode mascarar **déficit corporal total** — suplementar antes/durante insulina conforme AAHA Fluid 2024 Tabela 11; máx. 0,5 mEq/kg/h. (6)(7)(11)',
    'Insulina só após fluido inicial e K⁺ ≥2,5–3,0 mEq/L (ou já suplementado) — hipocalemia iatrogênica é arritmogênica. (6)(7)(8)(10)',
    'Meta glicêmica inicial 150–300 mg/dL; queda alvo ~50 mg/dL/h — adicionar dextrose ao fluido antes de suspender insulina enquanto BHB ainda alto. (7)(8)(10)(12)',
    'Bicarbonato **não** é rotina — reservar HCO₃⁻ <11 mEq/L ou CO₂ total <12 com acidose severa/neurológica; risco de hipocalemia paradoxal. (7)(8)(9)(10)',
    'Antibióticos **não** automáticos — urocultura sim; tratar infecção documentada/suspeita forte (ITU, piometra, pneumonia), não profilaxia universal. (1)(2)(7)(10)',
    'Nutrição precoce no gato estável — alimentação enteral (NE/PO) reduz catabolismo; não forçar se vômito/ileus; lipidose é gatilho. (4)(16)(17)',
    'Investigar gatilho nas primeiras horas: pancreatite, ITU, HAC, cio/piometra, DRC, lipidose (gato), sepse, pancreatite, medicamentos. (1)(2)(7)(10)',
    'CAD vs EHH: EHH = hiperosmolalidade extrema, cetonas ausentes/discretas, neurológico proporcional à osmolalidade — reidratação ainda mais lenta. (7)(10)',
    'Cão: insulinoterapia vitalícia usual — CAD frequentemente em DM novo ou descompensado; catarata não é foco agudo. (1)(7)',
    'Gato: glargina basal-bolus pode substituir CRI regular em subset (Zeugswetter 2021); lispro IM é alternativa **canina** preliminar (Malerba 2020). (13)(16)(17)',
    'FRI 0,01 UI/kg/h vs VRI — Gant 2024: sem diferença no tempo de resolução da cetose; FRI pode encurtar internação canina. (12)',
    'Resolução = BHB caindo (<0,6–2,55 mmol/L conforme protocolo), acidose corrigindo, comendo — não apenas glicemia normal. (3)(12)(13)(16)',
    'Erros fatais: queda glicêmica rápida, insulina com K⁺ baixo, confiar em cetonúria negativa, ignorar eDKA em iSGLT2, bicarbonato rotineiro. (3)(6)(7)(10)(14)',
  ],
  quickSummaryRich: {
    lead:
      'CAD transforma a deficiência insulínica em tempestade metabólica: lipólise descontrolada gera cetonas ácidas, a diurese osmótica esvazia volume e eletrólitos, e a acidose deprime perfusão e mentação. O paciente chega desidratado, vomitando, respirando fundo — muitas vezes com diabetes já conhecido ou nunca diagnosticado. O tratamento vence quando **perfusão, potássio e insulina gradual** convergem enquanto a doença precipitante é tratada; perder essa sequência mata. (1)(2)(7)(10)',
    leadHighlights: ['fluido primeiro', 'BHB', 'K⁺ paradoxal', 'insulina gradual', 'eDKA'],
    pillars: [
      {
        title: 'Definição — CAD × DK × eDKA × EHH',
        body:
          'CAD = diabetes + cetose + acidose metabólica. DK = cetose sem acidose (pH/HCO₃⁻ preservados). eDKA = cetose + acidose com glicemia normal/discretamente elevada (iSGLT2 felino). EHH = hiperglicemia extrema + desidratação/osmolalidade alta, cetonas mínimas. (3)(5)(7)(10)',
        highlights: ['tríade CAD', 'eDKA', 'EHH'],
      },
      {
        title: 'Diagnóstico — BHB preferencial',
        body:
          'Medidor POC de BHB supera cetonúria para diagnóstico, gravidade e resolução. Cutoffs cão (Di Tommaso): 2,3 mmol/L sensibilidade 100%; 4,3 mmol/L especificidade 100%; Duarte — 3,8 mmol/L equilíbrio sens/esp. Gato/iCatCare: BHB >2,4 mmol/L no contexto eDKA/SGLT2; resolução ~2,4–2,55 mmol/L conforme protocolo. (14)(15)(16)(17)',
        highlights: ['BHB > fita urinária', 'cutoffs espécie'],
      },
      {
        title: 'Tratamento — sequência que salva',
        body:
          'ABC → acesso venoso + coleta → fluidoterapia (Na⁺ corrigido guia cristaloide) → K⁺ (Tabela 11 AAHA 2024) → insulina após 4–6 h → dextrose quando glicemia ≤250 mg/dL mantendo insulina até BHB resolver → tratar gatilho → transição insulina prolongada. (6)(7)(8)(10)(12)',
        highlights: ['fluido', 'K⁺', 'insulina gradual', 'dextrose + insulina'],
      },
      {
        title: 'Espécie — divergências práticas',
        body:
          'Cão: CAD clássica hiperglicêmica; insulinoterapia vitalícia usual; regular IM ou CRI/VRI/FRI. Gato: AAHA 2026 — regular IM 0,1 U/kg ou glargina (alternativa Zeugswetter); eDKA com iSGLT2 exige BHB domiciliar; lispro IM é alternativa **canina** preliminar (Malerba). Nutrição enteral precoce quando possível. (2)(3)(4)(13)(16)(17)',
        highlights: ['glargina gato', 'eDKA SGLT2', 'nutrição felina'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico — da suspeita à gravidade',
      steps: [
        {
          label: 'Reconhecer emergência metabólica',
          timing: 'Triagem',
          detail:
            'Diabetes conhecido ou PU/PD/perda de peso + vômito, anorexia, desidratação, respiração de Kussmaul, alteração mental — tratar enquanto confirma. (1)(2)(7)(10)',
        },
        {
          label: 'Glicemia + contexto clínico',
          timing: 'POC imediato',
          detail:
            'Hiperglicemia >200 mg/dL (cão) ou >300 mg/dL sustentada (gato) com sinais; **eDKA**: glicemia pode ser <250 mg/dL em gato com iSGLT2 — dosar BHB sempre. (2)(3)(4)(5)',
        },
        {
          label: 'Cetonemia — BHB preferencial',
          timing: 'POC/laboratório',
          detail:
            'BHB por medidor POC; cetonúria (AcAc) como triagem — negativa não exclui. Interpretar cutoffs Di Tommaso (cão) e Duarte/Zeugswetter (gato). (14)(15)(16)(17)',
        },
        {
          label: 'Acidose — gasometria venosa',
          timing: '1–2 h',
          detail:
            'pH **<7,35** com bicarbonato reduzido fecha CAD (ALIVE 2026); lactato/uremia podem somar acidose mista. (5)(7)(8)(10)',
        },
        {
          label: 'Eletrólitos e osmolalidade',
          timing: 'Paralelo',
          detail:
            'Na⁺ corrigido pela glicemia, K⁺, Cl⁻, fósforo, Mg²⁺, Ca²⁺; calcular osmolalidade efetiva — diferenciar EHH/misto. (6)(7)(10)',
        },
        {
          label: 'Classificar CAD × DK × eDKA × EHH',
          timing: 'Integração',
          detail:
            'Usar tabela comparativa; quadro misto CAD+EHH exige reidratação ainda mais lenta e monitorização neurológica intensiva. (5)(7)(10)',
        },
        {
          label: 'Buscar doença precipitante',
          timing: 'Primeiras 6–24 h',
          detail:
            'Hemograma, bioquímica, urinálise + urocultura, lipase/fPL, imagem abdominal, T4 (gato idoso), progesterona/cio, cortisol/HAC se suspeita. (1)(2)(7)(10)(17)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico — estabilização à transição',
      steps: [
        {
          label: 'Estabilização ABC e acesso',
          detail:
            'Oxigenar se necessário; 2 acessos venosos se possível; coleta inicial completa antes de fluido se não atrasar perfusão. (7)(8)(10)',
          timing: '0–15 min',
        },
        {
          label: 'Fluidoterapia — primeiro pilar',
          detail:
            'Na⁺ <130 → NaCl 0,9%; Na⁺ ≥130 → balanceado (RL/Plasma-Lyte); repor déficit 4–24 h conforme choque; Na⁺ corrigido = Na + 1,6×[(Glic−100)/100]. (6)(7)(10)',
          dose: 'Déficit mL = peso × 1000 × % desidratação/100 + manutenção + perdas.',
          duration: 'Reavaliar perfusão q2–4 h.',
        },
        {
          label: 'Potássio — antes e durante insulina',
          detail:
            'Suplementar conforme Tabela 11 AAHA 2024; nunca bolus de KCl; máx. 0,5 mEq/kg/h; checar Mg se hipoK refratária. (6)(7)(11)',
          dose: 'Ex.: K 2,5–2,9 mEq/L → 0,3 mEq/kg/h.',
          reassess: 'K⁺ seriado q4–6 h mínimo durante insulinoterapia.',
        },
        {
          label: 'Insulina — após 4–6 h de fluido',
          detail:
            'Iniciar quando perfusão melhorando e K⁺ ≥2,5–3,0 mEq/L ou suplementado; regular IM ~0,1–0,2 UI/kg q2–4 h **ou** CRI/VRI **ou** glargina/lispro (gato). (7)(8)(10)(12)(13)(16)',
          dose: 'Cão: regular IM 0,1–0,2 UI/kg q1–2 h ou CRI ~0,05–0,1 UI/kg/h; gato AAHA 2026: regular IM 0,1 UI/kg ou glargina 1 UI IV inicial → 0,5–1 UI IM q2–3 h.',
          duration: 'Manter até BHB resolver — não parar só porque glicemia caiu.',
        },
        {
          label: 'Dextrose + insulina — controle da cetose',
          detail:
            'Quando glicemia ≤250 mg/dL, adicionar SG 2,5–5% ao fluido e **continuar** insulina titulada — cetose resolve com insulina, não com hipoglicemia iatrogênica. (7)(10)(12)(13)',
          reassess: 'Glicemia q1–2 h; BHB q4–8 h.',
        },
        {
          label: 'Bicarbonato — exceção',
          detail:
            'Somente pH <7,0–7,1 (ou pH <7,1 e HCO₃⁻ <8) com acidemia profunda persistente e comprometimento clínico — após fluido e eletrólitos. (7)(8)(9)(10)',
        },
        {
          label: 'Tratar gatilho e suporte',
          detail:
            'Antibióticos dirigidos se infecção; OVH piometra; trilostano/manejo HAC; suporte pancreatite; **nutrição enteral precoce** gato quando estável. (1)(2)(4)(7)(10)(17)',
        },
        {
          label: 'Monitorização e critérios de resolução',
          detail:
            'BHB caindo (<0,6–2,55 mmol/L conforme protocolo), pH/HCO₃⁻ normalizando, comendo, sem vômito — então desmame insulina regular → insulina prolongada ambulatorial. (3)(12)(13)(16)',
          duration: 'Internação típica 2–5 dias (variável).',
        },
      ],
    },
  },

  etiology: {
    pontosChave: [
      'CAD resulta de deficiência insulínica **relativa ou absoluta** suficiente para permitir hiperglucagonemia → lipólise → cetogênese hepática. (1)(2)(7)(9)',
      'Gatilhos aumentam hormônios contrarreguladores (cortisol, GH, glucagon, catecolaminas) → insulinorresistência aguda sobre DM pré-existente ou subclínico. (1)(2)(7)(10)',
      'Cães: ~70% têm doença concomitante ao diagnóstico de CAD; gatos ~90% — pancreatite, ITU, HAC, cio/piometra, DRC, lipidose, sepse. (7)(10)(17)',
      'eDKA felina: iSGLT2 induz glicosúria com deficiência insulínica residual → cetose com glicemia aparentemente normal. (3)(4)(5)',
      'Medicamentos: glucocorticoides, progestágenos, diuréticos tiazídicos, iSGLT2 (gato) podem precipitar ou mascarar. (2)(3)(4)(7)',
      'CAD clássica ≠ hiperglicemia isolada — pequenas doses de insulina endógena/exógena podem prevenir CAD mantendo cetose subclínica. (7)(9)(10)',
    ],
    deficienciaInsulina:
      'Sem insulina adequada, o tecido adiposo libera ácidos graxos livres; o fígado β-oxida e produz acetoacetato, BHB e acetona — corpos cetônicos ácidos que consumem tampão bicarbonato. (7)(9)(10)',
    gatilhosPrecipitantes: {
      caes: 'Pancreatite, ITU/pielonefrite, piometra/cio, HAC, neoplasia, DRC, sepse, omissão de insulina, estresse cirúrgico. (1)(7)(10)',
      gatos:
        'Pancreatite, ITU, HAC, lipidose hepática, DRC, hipertireoidismo descompensado, infecção respiratória, iSGLT2, omissão insulina. (2)(4)(7)(17)',
    },
  },

  epidemiology: {
    caes:
      'CAD ocorre em ~30–40% dos cães recém-diagnosticados com DM e em diabéticos estabilizados com gatilho; mediana idade ~8–10 anos; sem predileção sexual clara; raças variadas. (1)(7)(10)',
    gatos:
      'CAD em ~10–30% dos gatos diabéticos na apresentação; gatos inteiros historicamente; eDKA emergente com iSGLT2 em ~5% dos ensaios clínicos — exige BHB rotineiro. (2)(3)(4)(5)(17)',
    comparativoEspecies: {
      kind: 'clinicalTable' as const,
      title: 'Cão × gato — CAD',
      headers: ['Aspecto', 'Cão', 'Gato'],
      rows: [
        ['Frequência em DM', 'Comum na apresentação', 'Comum; eDKA com iSGLT2'],
        ['Glicemia típica CAD', 'Alta (>250–400 mg/dL)', 'Alta; estresse pode confundir'],
        ['eDKA', 'Rara', 'Associada a iSGLT2 (Bexacat/Senvelgo)'],
        ['Doença concomitante', '~70%', '~90%'],
        ['Insulina pós-CAD', 'Vitalícia usual', 'Remissão possível após controle'],
        ['Protocolos alternativos', 'Regular IM ou CRI/VRI/FRI', 'Regular IM ou glargina (AAHA 2026)'],
        ['Nutrição aguda', 'Alimentar quando estável', 'Enteral precoce enfatizada'],
      ],
    },
    tabelaDefinicoes: {
      kind: 'clinicalTable' as const,
      title: 'CAD × DK × eDKA × EHH — definições práticas',
      caption: 'Terminologia ALIVE Cycle 3 integrada à prática clínica. (5)(7)(10)',
      headers: ['Entidade', 'Glicemia', 'Cetose (BHB)', 'Acidose', 'Clínica'],
      rows: [
        ['CAD (DKA)', 'Alta (cão >200; gato >300 mg/dL)*', 'Elevada', 'pH <7,35 + HCO₃⁻ ↓', 'Doente, desidratado'],
        ['DK (cetose diabética)', 'Alta', 'Elevada', 'Ausente/leve', 'Pode estar alerta/comendo'],
        ['eDKA/EDKA', 'Normal ou <250 mg/dL', 'Elevada', 'Presente', 'iSGLT2 ou insulinopenia relativa'],
        ['EHH/HHS', 'Muito alta (>600 mg/dL)', 'Ausente/discreta', 'Variável', 'Neurológico + osmolalidade alta'],
      ],
    },
  },

  pathogenesisTransmission: {
    cascataMetabolica: [
      '1) Deficiência insulínica relativa/absoluta + hormônios contrarreguladores ↑. (7)(9)(10)',
      '2) Lipólise adiposa → ácidos graxos livres circulantes ↑. (7)(9)',
      '3) β-oxidação hepática → excesso de acetyl-CoA → cetogênese (AcAc, BHB, acetona). (7)(9)(10)',
      '4) Acúmulo de cetonas ácidas → consumo de bicarbonato → acidose metabólica (anion gap ↑). (7)(8)(10)',
      '5) Hiperglicemia osmótica → diurese → desidratação, perda Na⁺/K⁺/P/Mg + hipovolemia. (6)(7)(10)',
      '6) Hipoperfusão + acidose → lactato ↑, azotemia pré-renal, alteração mental. (7)(10)',
      '7) Tratamento com insulina/fluido → deslocamento K⁺ intracelular → **hipocalemia iatrogênica** se não suplementado. (6)(7)(11)',
    ],
    transmissao: 'Não contagioso. Processo metabólico desencadeado por deficiência insulínica e fatores precipitantes — não há transmissão entre animais. (1)(2)(7)',
    fluxoFisiologico: {
      titulo: 'Cascata fisiopatológica — texto (sem figura CC BY-NC)',
      etapas: [
        { fase: 'Insulina ↓ / glucagon ↑', evento: 'Mobilização lipídica' },
        { fase: 'Fígado', evento: 'Cetogênese hepática' },
        { fase: 'Sangue', evento: 'Cetonemia + hiperglicemia' },
        { fase: 'Rim', evento: 'Osmodiurese + perda eletrolítica' },
        { fase: 'Tampão', evento: 'Acidose metabólica' },
        { fase: 'Perfusão', evento: 'Choque + disfunção orgânica' },
        { fase: 'Tratamento', evento: 'Risco osmótico + hipoK se mal conduzido' },
      ],
    },
  },

  pathophysiology: {
    fisiologiaBasica:
      'Insulina suprime lipólise e cetogênese; glucagon e cortisol estimulam produção hepática de glicose e corpos cetônicos. CAD = desequilíbrio extremo favorável à cetogênese. (7)(9)(10)',
    paradoxoPotassio:
      'K⁺ sérico pode estar normal ou **elevado** na apresentação por acidemia e deficiência de insulina (deslocamento extracelular), mas déficit corporal total é comum — insulina e alcalinização revelam hipocalemia grave. (6)(7)(11)',
    acidobase:
      'Acidose metabólica hiperclorêmica ou com anion gap ↑ (cetonas + lactato + uremia); compensação respiratória (PaCO₂ ↓); bicarbonato consumido. Acidose mista frequente em choque. (7)(8)(9)(10)',
    alertaEdkaSglT2_2026:
      '🚨 **eDKA/EDKA (AAHA 2026):** gatos em iSGLT2 podem apresentar cetose + acidose com glicemia <250 mg/dL — efeito glicosúrico persiste dias após suspensão, especialmente com lipidose. **Suspender iSGLT2**, hospitalizar, insulina + dextrose, BHB seriado. Nunca assumir controle pelo valor de glicemia capilar isolado. (3)(4)(5)',
    alertaBhbPreferencial:
      '⚠️ **BHB preferencial:** medidor POC de β-hidroxibutirato supera cetonúria para diagnóstico, estratificação e resolução — BHB predomina sobre acetoacetato na CAD grave. (3)(4)(14)(15)(16)',
    alertaCetonuriaArmadilha:
      '⚠️ **Armadilha da cetonúria:** fita nitroprussiato reage principalmente com acetoacetato; cetonúria negativa **não exclui** CAD; durante tratamento, conversão BHB→AcAc pode manter fita positiva após melhora clínica. (14)(15)(17)',
    tabelaBhbCutoffs: {
      kind: 'clinicalTable' as const,
      title: 'Cutoffs de BHB — Di Tommaso (cão) e Duarte/Zeugswetter (gato)',
      caption:
        'Interpretação integrada à acidose e clínica; valores isolados não substituem gasometria. (14)(15)(16)(17)',
      headers: ['Espécie / estudo', 'BHB (mmol/L)', 'Interpretação'],
      rows: [
        ['Cão — Di Tommaso 2009', '2,3', 'Sensibilidade 100% (cutoff sensível)'],
        ['Cão — Di Tommaso 2009', '4,3', 'Especificidade 100% (cutoff específico)'],
        ['Cão — Duarte 2002', '3,8', 'Melhor equilíbrio sens/esp (72%/95%)'],
        ['Cão — Duarte 2002', '1,9–4,8', 'Faixa de sobreposição DK vs DKA'],
        ['Gato — Duarte/Zeugswetter', '<2,55', 'DKA improvável (excluir)'],
        ['Gato — AAHA/iCatCare SGLT2', '>2,4', 'Suspender iSGLT2; tratar cetose'],
        ['Ambos — resolução terapêutica', '<0,6–2,55', 'Conforme protocolo escolhido (Gant/Malerba/Zeugswetter)'],
        ['Referência normal', '<0,6', 'Sem cetose significativa'],
      ],
    },
    tabelaPotassioAaha2024: {
      kind: 'clinicalTable' as const,
      title: 'Suplementação de K⁺ — AAHA Fluid Therapy Guidelines 2024 (Tabela 11)',
      caption: 'Taxa máxima 0,5 mEq/kg/h; nunca bolus de fluido com KCl; misturar saco antes de infundir. (6)(11)',
      headers: ['K⁺ sérico (mEq/L)', 'Taxa sugerida (mEq/kg/h)', 'KCl em cristaloide isotônico*'],
      rows: [
        ['<2,0', '0,5 (máximo)', '200 mEq/L'],
        ['2,0–2,5', '0,3–0,4', '120–160 mEq/L'],
        ['2,6–3,0', '0,2–0,25', '80–100 mEq/L'],
        ['3,1–3,5', '0,1–0,15', '40–60 mEq/L'],
        ['>3,5', '0,05', '20 mEq/L'],
      ],
    },
    notaPotassio:
      '*Concentração no saco depende da taxa de infusão total do paciente — recalcular se fluxo ≠ 60 mL/kg/dia. KCl 19,1% = 2,56 mEq/mL. Persistência de hipoK → dosar Mg²⁺. (6)(11)',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Anorexia, vômito, letargia, fraqueza',
          mechanism: 'Acidose cetônica + hipovolemia + efeito central das cetonas no CTZ.',
          clinicalMeaning: 'Sinais inespecíficos — suspeitar CAD em todo diabético doente. (1)(2)(7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Desidratação 5–12%, hipovolemia, choque',
          mechanism: 'Osmodiurese glucosúrica + vômitos/diarreia.',
          clinicalMeaning: 'Fluido é prioridade absoluta antes de insulinização agressiva. (6)(7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Perda de peso recente, PU/PD/PP',
          mechanism: 'Hiperglicemia crônica ou aguda descompensada.',
          clinicalMeaning: 'História de DM novo ou controle inadequado. (1)(2)(7)',
          priority: 'common',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Respiração profunda/rápida (Kussmaul)',
          mechanism: 'Compensação respiratória da acidose metabólica.',
          clinicalMeaning: 'Acidose significativa — gasometria urgente. (7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Hálito cetônico (doce/frutado)',
          mechanism: 'Acetona exalada.',
          clinicalMeaning: 'Suporta cetose; **ausência não exclui** CAD. (7)(10)(14)',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Depressão, estupor, coma',
          mechanism: 'Acidose + hipoperfusão + hiperosmolalidade (CAD/EHH/misto).',
          clinicalMeaning: 'Avaliar osmolalidade; evitar queda glicêmica/osmótica rápida. (7)(10)',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Dor abdominal',
          mechanism: 'Pancreatite concomitante ou acidose.',
          clinicalMeaning: 'Investigar pancreatite — gatilho frequente, especialmente gato. (2)(7)(17)',
          priority: 'common',
          context: ['Gatos', 'Cães'],
        },
      ],
    },
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'Hiperglicemia + glicosúria + cetonemia',
          mechanism: 'Deficiência insulínica + cetogênese.',
          clinicalMeaning: 'Tríade bioquímica CAD clássica. (7)(10)(14)(15)',
          priority: 'common',
        },
        {
          finding: 'eDKA — glicemia normal/discreta + BHB alto',
          mechanism: 'iSGLT2 → glicosúria sem supressão de cetogênese.',
          clinicalMeaning: 'Emergência mascarada — BHB obrigatório em gatos com iSGLT2. (3)(4)(5)',
          priority: 'emergency',
          context: ['Gatos'],
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Taquicardia, pulsos finos, hipotensão',
          mechanism: 'Hipovolemia + acidose + hipocalemia (fase tardia/tratamento).',
          clinicalMeaning: 'Corrigir volume e K⁺ antes/durante insulina. (6)(7)(10)',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: {
    tabelaComparativaEntidades: {
      kind: 'clinicalTable' as const,
      title: 'CAD × DK × eDKA × EHH — diagnóstico diferencial',
      headers: ['', 'CAD', 'DK', 'eDKA', 'EHH'],
      rows: [
        ['Glicemia', 'Alta', 'Alta', 'Normal/<250', 'Muito alta'],
        ['BHB', '↑↑', '↑', '↑↑', 'Normal/↑ leve'],
        ['pH / HCO₃⁻', '↓', 'Normal', '↓', 'Normal/↓ leve'],
        ['Cetonúria', '+ a ++++', '+', '+ a +++', '−/trace'],
        ['Desidratação', 'Moderada-grave', 'Leve-moderada', 'Variável', 'Grave'],
        ['Neurológico', 'Proporcional acidose', 'Raro', 'Variável', 'Marcado (osmolalidade)'],
        ['Conduta', 'Internação CAD', 'Monitorar/insulina', 'Internação + suspender iSGLT2', 'Reidratação lenta ± insulina cauta'],
      ],
    },
    diagnosticReasoning:
      'Confirmar diabetes + cetose (BHB preferencial) + acidose → classificar gravidade → buscar precipitante → diferenciar EHH/misto. Gato bem com cetonúria isolada ≠ CAD. (3)(5)(7)(10)(14)(15)',
    steps: [
      {
        stepNumber: 1,
        title: 'Glicemia capilar/venosa + clínica',
        purpose: 'Triagem.',
        description: 'Documentar hiperglicemia sustentada com sinais; em iSGLT2 felino, dosar BHB mesmo se glicemia normal. (2)(3)(4)',
        interpretation: 'Hiperglicemia + doença = investigar cetose imediatamente.',
        isGoldStandard: false,
      },
      {
        stepNumber: 2,
        title: 'β-hidroxibutirato (BHB) sanguíneo',
        purpose: 'Confirmar cetose.',
        description: 'Medidor POC ou laboratório; interpretar cutoffs Di Tommaso/Duarte/Zeugswetter. (14)(15)(16)',
        interpretation: 'BHB elevado + acidose = CAD; BHB elevado sem acidose = DK.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Gasometria venosa/arterial',
        purpose: 'Confirmar acidose.',
        description: 'pH, HCO₃⁻, PaCO₂, lactato, anion gap. (7)(8)(10)',
        interpretation: 'pH <7,35 com bicarbonato reduzido fecha CAD (ALIVE 2026).',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'Eletrólitos + Na⁺ corrigido + osmolalidade',
        purpose: 'Planejar fluido e diferenciar EHH.',
        description: 'Na⁺ corrigido, K⁺, P, Mg, Ca; calcular osmolalidade efetiva. (6)(7)(10)',
        interpretation: 'Osmolalidade >350 mOsm/kg com cetonas mínimas → pensar EHH.',
      },
      {
        stepNumber: 5,
        title: 'Hemograma, bioquímica, urinálise',
        purpose: 'Gatilhos e comorbidades.',
        description: 'Azotemia, lipase/fPL, T4, proteínas; sedimento urinário. (1)(2)(7)(17)',
        interpretation: 'ITU/pancreatite/HAC/lipidose comuns.',
      },
      {
        stepNumber: 6,
        title: 'Urocultura e imagem',
        purpose: 'Fonte infecciosa / pancreatite / piometra.',
        description: 'Urocultura mesmo se sedimento normal; US abdominal. (1)(2)(7)(10)',
        interpretation: 'Tratar foco identificado — CAD não resolve se gatilho persistir.',
      },
    ],
    diferenciais: [
      'Cetose por jejum/inanition (BHB geralmente <2 mmol/L, sem acidose diabética). (7)(10)',
      'Acidose láctica por choque/sepse (cetose ausente ou discreta). (7)(10)',
      'Uremia grave (acidose com BHB normal). (7)(9)',
      'Intoxicação por etilenoglicol/metanol (anion gap ↑, osmolalidade ↑, sem cetose diabética). (8)(10)',
      'Hipoadrenocorticismo (hiponatremia, hipercalemia — diferenciar eletrolítico). (7)(10)',
    ],
    jornadaDiagnostica: [
      { etapa: 'Triagem', acao: 'Glicemia + BHB em todo diabético doente.', nota: '(3)(14)(15)' },
      { etapa: 'Confirmar', acao: 'Gasometria + eletrólitos.', nota: '(7)(10)' },
      { etapa: 'Classificar', acao: 'CAD vs DK vs eDKA vs EHH.', nota: '(5)(7)' },
      { etapa: 'Precipitante', acao: 'Urocultura, lipase, imagem, hormônios se indicado.', nota: '(1)(2)(17)' },
      { etapa: 'Monitorar', acao: 'BHB seriado até resolução.', nota: '(12)(13)(16)' },
    ],
  },

  treatment: {
    objetivos: [
      'Restaurar perfusão e volemia — fluidoterapia individualizada. (6)(7)(10)',
      'Corrigir distúrbios eletrolíticos — K⁺ prioritário antes/durante insulina. (6)(7)(11)',
      'Interromper cetogênese com insulina **gradual** mantendo glicemia 150–300 mg/dL. (7)(10)(12)',
      'Identificar e tratar doença precipitante. (1)(2)(7)(10)',
      'Transição segura para insulina prolongada ambulatorial. (3)(7)(16)',
    ],
    condutaImediata: {
      titulo: '🚨 Conduta imediata — primeiros 15–60 minutos',
      passos: [
        '1) ABC, oxigênio se necessário, avaliar perfusão/PA/ECG se hipoK suspeita. (7)(10)',
        '2) Acesso venoso (idealmente 2) + coleta: glicemia, BHB, gasometria, Na/K/Cl/P/Mg/Ca, lactato, hemograma, bioquímica, urina. (7)(10)',
        '3) Iniciar fluidoterapia — **não** aguardar todos os resultados se hipovolêmico. (6)(7)(10)',
        '4) Calcular Na⁺ corrigido; escolher cristaloide (NaCl 0,9% se Na <130; balanceado se Na ≥130). (6)(7)',
        '5) Suplementar K⁺ conforme Tabela 11 AAHA 2024 assim que K⁺ conhecido — antes de insulina se K <3,5. (6)(11)',
        '6) Adiar insulina 4–6 h até perfusão melhorando, salvo CAD grave com protocolo institucional. (7)(8)(10)',
        '7) Suspender iSGLT2 imediatamente se eDKA; iniciar insulina + dextrose. (3)(4)(5)',
      ],
    },
    potassioFundamental:
      '🧂 **Potássio é fundamental:** déficit corporal comum apesar de K⁺ sérico normal/alto; insulina precipita hipocalemia arritmogênica. Seguir AAHA 2024 — máx. 0,5 mEq/kg/h; nunca bolus KCl; misturar saco; monitorar ECG se K <2,5. (6)(7)(11)',
    bicarbonatoNaoRotina:
      '⚗️ **Bicarbonato não é rotina:** acidose melhora com fluido + insulina na maioria. Considerar apenas acidemia profunda persistente — tipicamente **pH <7,0–7,1** (ou pH <7,1 e HCO₃⁻ <8 mmol/L) com hipotensão refratária, arritmias ou estupor/coma — **após** fluidoterapia e correção eletrolítica. Risco: hipocalemia paradoxal, Ca²⁺ ionizado ↓, CO₂ cerebral ↑. (7)(8)(9)(10)',
    antibioticosNaoAutomaticos:
      '💊 **Antibióticos não automáticos:** coletar urocultura; iniciar antibiótico empírico apenas se ITU complicada, piometra, pneumonia ou sepse provável — não profilaxia universal em CAD. (1)(2)(7)(10)',
    nutricaoPrecoceFelino:
      '🍽️ **Nutrição precoce (felino):** quando vômito controlado e perfusão estável, iniciar alimentação enteral (NE ou PO) para reduzir catabolismo e risco de lipidose — gato anorético é gatilho de CAD recorrente. (4)(16)(17)',
    fluidoterapia: {
      principios:
        'Repor déficit 4–24 h conforme choque; meta queda osmótica lenta; evitar sobrecarga em DRC/cardiopata. (6)(7)(10)',
      formulaNaCorrigido:
        'Na corrigido = Na medido + 1,6 × [(glicose − 100)/100] — guia escolha de cristaloide e interpretação hiponatremia. (6)(7)',
    },
    protocoloEdkaSglT2Aaha2026: {
      titulo: 'Protocolo eDKA/EDKA — AAHA 2026 (gato com iSGLT2)',
      passos: [
        'Suspender iSGLT2 imediatamente; efeito pode persistir dias (hepatopatia/lipidose). (3)(4)(5)',
        'Hospitalizar; fluido + K⁺ conforme Tabela 11. (6)(7)',
        'Insulina regular CRI ou IM + dextrose no fluido — cetose não resolve sem insulina apesar de glicemia baixa. (3)(5)(7)',
        'Monitorar BHB q4–8 h até normalizar; só então reavaliar terapia antidiabética ambulatorial (insulina, não iSGLT2 até estabilidade prolongada). (3)(4)(5)',
      ],
    },
    protocoloFelinoRegularIM: {
      titulo: 'Insulina regular IM — gato (AAHA 2026 preferencial)',
      dose: 'Após reidratação e K⁺ seguro: **0,1 U/kg IM**; repetir q1–2 h conforme glicemia; adicionar dextrose 2,5–5% quando glicemia ~150–250 mg/dL mantendo insulina anticetogênica. (3)(7)(8)(10)',
      monitorizacao: 'Glicemia q1–2 h; BHB q12–24 h (eDKA q8–12 h); eletrólitos q4–6 h.',
    },
    protocoloFelinoGlargina: {
      titulo: 'Glargina U100 — gato (alternativa AAHA 2026 + Zeugswetter 2021)',
      protocolo:
        '1) **1 U/gato IV** inicialmente; 2) glicemia ~q1 h; 3) **0,5–1 U/gato IM q2–3 h** enquanto necessário; 4) transição **1–2 U/gato SC q12 h** quando estabilizado. Adicionar dextrose conforme glicemia. (3)(16)(17)',
      evidencia:
        'RCT Zeugswetter (20 gatos): sobrevida 85%; glargina reduziu glicemia inicial mais rápido e encurtou alta, sem superioridade consistente em todos os desfechos de resolução da CAD — alternativa respaldada, não padrão único. (16)',
      nota:
        'AAHA 2026 Figure 12.1 (PDF oficial — link em referências, não reproduzida aqui por licença). (3)',
    },
    protocoloCaninoRegularIM: {
      titulo: 'Insulina regular IM — cão',
      dose: '0,1–0,2 UI/kg IM q2–4 h; titular queda ~50 mg/dL/h; SG 2,5–5% quando glicemia ≤250 mg/dL. (1)(7)(8)(10)',
    },
    protocoloCaninoCRI: {
      titulo: 'CRI insulina regular — cão (VRI/FRI)',
      preparo:
        'Regular 2,2 UI/kg em 240 mL NaCl 0,9%; desprezar ~50 mL (adesão); linha separada do fluido principal. (7)(8)(10)(12)',
      vri: {
        titulo: 'Taxa variável (VRI) por glicemia',
        tabela: {
          kind: 'clinicalTable' as const,
          title: 'VRI — insulina regular cão/gato (adaptado ECC)',
          headers: ['Glicemia (mg/dL)', 'Fluido', 'Taxa solução insulina (mL/h)'],
          rows: [
            ['>250', 'NaCl 0,9%', '10 (cão) / titular (gato)'],
            ['200–250', 'NaCl 0,9% + SG 2,5%', '7'],
            ['150–200', 'NaCl 0,9% + SG 2,5%', '5'],
            ['100–150', 'NaCl 0,9% + SG 5%', '5'],
            ['<100', 'NaCl 0,9% + SG 5%', '0 — suspender insulina'],
          ],
        },
      },
      fri: {
        titulo: 'Taxa fixa (FRI) — Gant 2024',
        dose: '0,01 UI/kg/h IV contínua independente de glicemia + dextrose conforme necessário; não acelera resolução de cetose vs VRI, mas pode reduzir LOH canina. (12)',
      },
    },
    protocoloCaninoLisproAlternativa: {
      titulo: 'Insulina lispro IM — alternativa canina (Malerba 2020) — CC BY',
      status:
        'ALTERNATIVA / EVIDÊNCIA PRELIMINAR — não protocolo padrão universal. Estudo prospectivo preliminar vs CRI de insulina regular. (13)',
      tabelaLisproMalerba: {
        kind: 'clinicalTable' as const,
        title: 'Lispro IM — protocolo Malerba (cães com CAD)',
        caption:
          'Adaptado de Malerba E et al. Front Vet Sci. 2020;7:559008 — CC BY 4.0. DOI: 10.3389/fvets.2020.559008. Meta glicêmica durante resolução: 150–300 mg/dL. (13)',
        headers: ['Etapa', 'Conduta', 'Monitorização'],
        rows: [
          ['Inicial', 'Lispro 0,25 U/kg por via intramuscular', 'Glicemia a cada 1 h'],
          ['Sem queda ≥10% em 1 h', 'Repetir dose inicial', 'Glicemia horária'],
          ['Meta de queda atingida', 'Pode postergar nova dose até 3 h', 'Glicemia horária'],
          ['Glicemia ≤250 mg/dL', 'Lispro 0,125 U/kg IM a cada 3 h', 'Adicionar dextrose 2,5%'],
          ['Manutenção anticetogênica', 'Titular dextrose para 5–7,5% conforme necessário', 'Manter 150–300 mg/dL'],
        ],
      },
      nota:
        'A cetose resolveu mais rapidamente com lispro no pequeno estudo, porém tempo de hospitalização, resolução global da CAD e eventos adversos não mostraram superioridade robusta. (13)',
    },
    monitorizacao: {
      frequencia:
        'Glicemia q1–2 h; BHB q4–8 h; eletrólitos/gasometria q4–8 h; perfusão q2–4 h; PA/diurese seriadas. (7)(10)(12)',
      criteriosResolucao: [
        'BHB <0,6–2,55 mmol/L (conforme protocolo). (12)(13)(16)',
        'pH >7,35 e bicarbonato normalizando. (5)(7)(10)',
        'Comendo sem vômito significativo. (7)(17)',
        'Gatilho identificado e tratado. (1)(2)(7)',
      ],
    },
    errosQueMatam: [
      'Queda glicêmica >80–100 mg/dL/h — risco edema cerebral/osmótico. (7)(10)',
      'Insulina com K⁺ <2,5 mEq/L não suplementado — arritmias/parada. (6)(7)(11)',
      'Suspender insulina quando glicemia cai mas BHB ainda alto — cetose persiste. (7)(10)(12)',
      'Confiar em cetonúria negativa e atrasar tratamento. (14)(15)(17)',
      'Ignorar eDKA em gato com iSGLT2 porque glicemia está “normal”. (3)(4)(5)',
      'Bicarbonato rotineiro — piora K⁺ e CO₂ cerebral. (7)(8)(9)(10)',
      'Antibiótico empírico universal sem foco — resistência e reações. (7)(10)',
      'Não tratar pancreatite/ITU/piometra concomitante — CAD recidiva. (1)(2)(7)(17)',
    ],
    evidenciaPublicada: {
      gant2024:
        'Gant P et al., JVECC 2024 — FRI 0,01 UI/kg/h vs VRI: sem diferença no tempo de resolução de cetose (cães 95%, gatos 56%); FRI encurtou internação canina. DOI: 10.1111/vec.13354. (12)',
      malerba2020:
        'Malerba E et al., Front Vet Sci 2020 — lispro IM vs CRI regular em **cães** com CAD; cetose resolveu mais rápido, sem superioridade robusta em desfechos globais; CC BY. DOI: 10.3389/fvets.2020.559008. (13)',
      zeugswetter2021:
        'Zeugswetter FK et al., JVECC 2021 — glargina basal-bolus vs CRI regular: alternativa eficaz, menor tempo até melhora glicêmica e alta. DOI: 10.1111/vec.13062. (16)',
      diTommaso2009:
        'Di Tommaso M et al., JVIM 2009 — BHB cão: 2,3 mmol/L sens 100%; 4,3 mmol/L esp 100%; ROC superior à cetonúria. DOI: 10.1111/j.1939-1676.2009.0302.x. (14)',
      duarte2002:
        'Duarte R et al., JVIM 2002 — BHB cão: cutoff 3,8 mmol/L equilibra sens/esp; base para extrapolação felina. DOI: 10.1111/j.1939-1676.2002.tb01258.x. (15)',
    },
    prognostico: {
      geral:
        'Com tratamento agressivo precoce, muitos pacientes sobrevivem; mortalidade maior se choque, acidose severa pH <7,1, comorbidades não tratadas ou queda osmótica iatrogênica. Gatos com CAD não resolutiva (BHB persistente) têm pior desfecho (Gant 2024). (12)(17)',
      caes: 'Resolução cetose alta com protocolos modernos; transição para Caninsulin/NPH conforme DM canino. (1)(7)(12)',
      gatos: 'Remissão diabética possível após CAD — planejar monitorização e evitar iSGLT2 até estabilidade comprovada. (3)(4)(16)(17)',
    },
    orientacaoTutor: [
      'CAD é emergência — não tentar tratar em casa com ajuste de dose oral. (1)(2)(7)',
      'Após alta, insulina e monitorização rigorosa; gatos com iSGLT2 precisam medidor BHB domiciliar. (3)(4)(5)',
      'Retornar imediatamente se vômito, anorexia ou apatia recorrem no diabético. (1)(2)(7)(10)',
      'Investigar e tratar doença concomitante — CAD frequentemente volta se gatilho persistir. (7)(10)(17)',
    ],
  },

  prevention: {
    vigilanciaDm:
      'Todo diabético: orientar sinais de descompensação; medidor BHB domiciliar em gatos com iSGLT2; nunca iniciar iSGLT2 se BHB >2,4 mmol/L ou cetose. (3)(4)(5)',
    controleGlicemico:
      'Aderência insulínica, dieta consistente (cão), técnica correta — omissão de doses precipita CAD. (1)(2)(7)',
    comorbidades:
      'Tratar ITU, pancreatite, HAC, cio/piometra proativamente; castração cadelas/gatas inteiras. (1)(2)(7)(10)',
    caes:
      'Evitar corticoides desnecessários; monitorar DM descompensado antes que progrida a CAD. (1)(7)',
    gatos:
      'Evitar iSGLT2 em instáveis/cetóticos; nutrição adequada prevenindo lipidose; ALIVE DCS para monitorização clínica. (3)(4)(17)',
  },

  relatedConsensusSlugs: [
    'aaha-diabetes-felino-2026',
    'icatcare-diabetes-felino-2025',
    'alive-tireoide-cycle-3-2026',
    'alive-diabetes-cycle-1-2022',
    'aaha-diabetes-caes-gatos-2018-2022',
  ],
  relatedDiseaseSlugs: [
    'diabetes-mellitus-canina',
    'diabetes-mellitus-felina',
    'sindrome-cushing-caes',
    'sindrome-cushing-gatos',
    'hipoadrenocorticismo-addison',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-dka-canine-synth',
      citationText:
        'Reconciliação editorial VIN — Cetoacidose diabética canina (síntese clínica ConsultaVET, 2026).',
      sourceType: 'Reconciliação interna / VIN',
      url: 'https://www.vin.com/vin/default.aspx',
      evidenceLevel: 'Moderada',
      notes: 'Algoritmo clínico integrado canino — vinReferencePending.',
    },
    {
      id: 'ref-vin-dka-feline-synth',
      citationText:
        'Reconciliação editorial VIN — Cetoacidose diabética felina (síntese clínica ConsultaVET, 2026).',
      sourceType: 'Reconciliação interna / VIN',
      url: 'https://www.vin.com/vin/default.aspx',
      evidenceLevel: 'Moderada',
      notes: 'Algoritmo clínico integrado felino — vinReferencePending.',
    },
    {
      id: 'ref-aaha-diabetes-felino-2026-sec12',
      citationText:
        'Bugbee A. et al. 2026 AAHA Diabetes Management Guidelines for Cats — Section 12: Diabetic Ketoacidosis in Cats. J Am Anim Hosp Assoc. 2026.',
      sourceType: 'Diretriz',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-12-diabetic-ketoacidosis-in-cats/',
      evidenceLevel: 'Alta',
      notes:
        'eDKA/EDKA, BHB POC, glargina — Figura 12.1 (fluxograma insulina felina) disponível apenas no PDF oficial AAHA 2026: https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/ — não reproduzida como imagem hospedada.',
    },
    {
      id: 'ref-icatcare-diabetes-2025',
      citationText:
        'Taylor S. et al. iCatCare 2025 consensus guidelines on the diagnosis and management of diabetes mellitus in cats. J Feline Med Surg. 2025;27:1–37.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1177/1098612X251399103',
      evidenceLevel: 'Alta',
      notes: 'CAD, eDKA, SGLT2, comorbidades — figuras CC BY-NC não hospedadas.',
    },
    {
      id: 'ref-alive-cycle-3-2026',
      citationText:
        'Niessen S. J. M. et al. Agreeing Language in Veterinary Endocrinology (ALIVE): Hypothyroidism, Hyperthyroidism, (Euglycaemic) Diabetic Ketosis/Ketoacidosis, and Diabetic Remission. Vet Sci. 2026;13:35.',
      sourceType: 'Consenso terminológico',
      url: 'https://doi.org/10.3390/vetsci13010035',
      evidenceLevel: 'Alta',
      notes: 'Definições CAD, DK, eDKA/EDKA, remissão.',
    },
    {
      id: 'ref-aaha-fluid-2024',
      citationText:
        'Davis H. et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2024.',
      sourceType: 'Diretriz',
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/',
      evidenceLevel: 'Alta',
      notes: 'Tabela 11 — suplementação de K⁺; hipovolemia, hiponatremia.',
    },
    {
      id: 'ref-nelson-couto-ch49',
      citationText:
        'Nelson RW, Couto CG. Diabetes Mellitus. In: Small Animal Internal Medicine. 6th ed. Elsevier, 2020. Chapter 49.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'CAD/DKA — fisiopatologia e manejo.',
    },
    {
      id: 'ref-bsava-ecc-ch16',
      citationText:
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA, 2018. Chapter 16.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Emergências endócrinas — CAD.',
    },
    {
      id: 'ref-dibartola-fluid',
      citationText:
        'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. Elsevier, 2012.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Distúrbios ácido-base e fluidoterapia.',
    },
    {
      id: 'ref-emergency-medicine-ch113',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell, 2019. Chapter 113 — Complicated Diabetes Mellitus.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'CAD/EHH — diagnóstico e tratamento.',
    },
    {
      id: 'ref-plumbs-10-insulin-electrolytes',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley/VetMedux, 2023.",
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Insulina regular, lispro, KCl, protocolos CRI.',
    },
    {
      id: 'ref-gant-2024',
      citationText:
        'Gant P, Barfield D, Florey J. Comparison of insulin infusion protocols for management of canine and feline diabetic ketoacidosis. J Vet Emerg Crit Care (San Antonio). 2024;34(1):23–30.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/vec.13354',
      evidenceLevel: 'Moderada',
      notes: 'FRI vs VRI — resolução cetose e LOH.',
    },
    {
      id: 'ref-malerba-2020',
      citationText:
        'Malerba E, Alessandrini F, Grossi G, Giunti M, Fracassi F. Efficacy and Safety of Intramuscular Insulin Lispro vs. Continuous Intravenous Regular Insulin for the Treatment of Dogs With Diabetic Ketoacidosis. Front Vet Sci. 2020;7:559008.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.3389/fvets.2020.559008',
      evidenceLevel: 'Moderada',
      notes: 'Protocolo lispro IM canino — CC BY 4.0; evidência preliminar.',
    },
    {
      id: 'ref-di-tommaso-2009',
      citationText:
        'Di Tommaso M, Aste G, Rocconi F, et al. Evaluation of a portable meter to measure ketonemia and comparison with ketonuria for the diagnosis of canine diabetic ketoacidosis. J Vet Intern Med. 2009;23(3):466–471.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/j.1939-1676.2009.0302.x',
      evidenceLevel: 'Moderada',
      notes: 'Cutoffs BHB canino — 2,3 / 4,3 mmol/L (Di Tommaso).',
    },
    {
      id: 'ref-duarte-2002',
      citationText:
        'Duarte R, Simões DMN, Franchini ML, et al. Accuracy of serum β-hydroxybutyrate measurements for the diagnosis of diabetic ketoacidosis in 116 dogs. J Vet Intern Med. 2002;16(4):411–416.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/j.1939-1676.2002.tb01258.x',
      evidenceLevel: 'Moderada',
      notes: 'Cutoff BHB 3,8 mmol/L cães; base comparativa felina.',
    },
    {
      id: 'ref-zeugswetter-2021',
      citationText:
        'Zeugswetter FK, Luckschander-Zeller N, Karlovits S, Rand JS. Glargine versus regular insulin protocol in feline diabetic ketoacidosis. J Vet Emerg Crit Care (San Antonio). 2021;31(4):459–468.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/vec.13062',
      evidenceLevel: 'Moderada',
      notes: 'Glargina basal-bolus vs CRI regular — resolução BHB <2,55 mmol/L.',
    },
    {
      id: 'ref-reed-2026',
      citationText:
        'Reed N. Rational approach to feline medical emergencies: part 2. J Feline Med Surg. 2026;28(4).',
      sourceType: 'Revisão clínica',
      url: 'https://doi.org/10.1177/1098612X251411055',
      evidenceLevel: 'Moderada',
      notes: 'CAD felina, eDKA com iSGLT2 — abordagem prática consultório; figuras CC BY-NC não hospedadas.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
