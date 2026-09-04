import type { DiseaseRecord } from '../../types/disease';

/**
 * Cetoacidose diabética (CAD/DKA), Cetose diabética (DK), CAD euglicêmica (eDKA)
 * e Guia Clínico de Cetonemia (β-hidroxibutirato / BHB) em cães e gatos — ConsultaVET / Vetius.
 *
 * Estrutura e evidências integradas:
 * - ALIVE 2026 (Consenso Internacional de Endocrinologia Veterinária)
 * - AAHA 2026 Diabetes Management Guidelines for Cats (DKA, SGLT2 & BHB monitoring)
 * - iCatCare 2025 Consensus Guidelines on Feline Diabetes Mellitus
 * - AAHA 2018 / 2022 Diabetes Guidelines (Caninos e Felinos)
 * - AAHA 2024 Fluid Therapy Guidelines (Tabela 11 — Suplementação de Potássio)
 * - Estudos de BHB: Di Tommaso et al. 2009, Duarte et al. 2002, Bresciani et al. 2014,
 *   Weingart et al. 2012, Zeugswetter & Rebuzzi 2012, Zeugswetter et al. 2021.
 * - Livros de referência: Canine and Feline Endocrinology (Feldman et al., 4ª ed.),
 *   Basic Monitoring in Canine and Feline Emergency Patients, August's Consultations in Feline Internal Medicine (Vol. 7).
 */
export const cetoacidoseDiabeticaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-cetoacidose-diabetica-caes-gatos',
  slug: 'cetoacidose-diabetica-caes-gatos',
  title: 'Cetoacidose diabética em cães e gatos',
  subtitle:
    'Guia clínico de cetonemia (β-hidroxibutirato / BHB), cetose diabética (DK), cetoacidose diabética (CAD/DKA) e CAD euglicêmica (eDKA) em cães e gatos',
  synonyms: [
    'β-hidroxibutirato',
    'Beta-hidroxibutirato',
    'BHB',
    'β-OHB',
    '3-HB',
    'Cetonemia sanguínea',
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
    'Cetonemia',
    'Beta-hidroxibutirato',
    'BHB',
    'Emergência metabólica',
    'eDKA',
    'SGLT2',
    'Insulina regular',
    'Fluidoterapia',
    'Potássio',
    'Acidose metabólica',
    'Pancreatite',
    'ITU',
  ],
  vinReferencePending: true,
  quickSummary:
    'A cetoacidose diabética (CAD/DKA) é uma emergência metabólica decorrente da deficiência insulínica grave acompanhada do excesso de hormônios contrarreguladores. Caracteriza-se pela tríade diagnóstica obrigatória (Consenso ALIVE 2026): **Diabetes Mellitus** (hiperglicemia ou eDKA) + **Cetose patológica** (cetonemia / BHB sanguíneo elevado) + **Acidose metabólica** (pH venoso/arterial **<7,35** e HCO₃⁻ reduzido). 🚨 **REGRA CARDINAL:** BHB elevado NÃO é sinônimo de CAD/DKA. Cetose diabética (DK) define o paciente com diabetes e cetonemia mas **sem acidose metabólica** (clinicamente estável); a DKA exige acidose metabólica confirmada (clinicamente doente). Pontos de corte de triagem em medidor portátil (POC): no cão, BHB ≥2,3 mmol/L (100% sensibilidade para rastreio de DKA; ≥3,5–3,8 mmol/L fortemente sugestivo; ≥4,3 mmol/L 100% específico); no gato, faixa normal 0–0,1 mmol/L, zona de alerta 1,0–2,4 mmol/L e BHB >2,4 mmol/L (100% sensibilidade, 87% especificidade para DKA/eDKA — Weingart 2012 / iCatCare 2025). Em gatos tratados com inibidores de SGLT2 (bexagliflozina, velagliflozina) ou sob insulinoterapia, a DKA pode cursar com glicemia normal ou pouco elevada (<250 mg/dL), configurando a **CAD euglicêmica (eDKA)**. O BHB sanguíneo é amplamente superior à fita urinária de nitroprussiato (que só detecta acetoacetato e pode dar falsos negativos iniciais ou falsos positivos durante a melhora). A abordagem terapêutica segue a sequência: 1) Expansão volêmica com cristaloide isotônico; 2) Suplementação imediata de K⁺ (máx 0,5 mEq/kg/h) antes de qualquer insulina se K⁺ <3,5 mEq/L; 3) Insulinização gradual iniciada após 2–4 h de hidratação e K⁺ seguro; 4) Adição de Dextrose 2,5–5% ao fluido ao atingir glicemia ≤250 mg/dL para manter a supressão de cetonas sem induzir hipoglicemia; 5) Identificação e controle do fator precipitante (pancreatite, ITU, piometra). (1)(2)(3)(4)(5)(6)(7)(10)(11)(12)(14)(15)(16)(17)(18)(19)(20)(21)',
  quickDecisionStrip: [
    '🚨 REGRA DE OURO ALIVE 2026: BHB elevado NÃO confirma DKA isoladamente — DKA exige a tríade DM + Cetonemia/Cetonúria + Acidose Metabólica (pH <7,35, HCO₃⁻ reduzido). (3)(4)(5)',
    '🐶 Cutoffs BHB Canino: Normal <0,32 mmol/L | Alerta/Triagem ≥2,3 mmol/L (100% sensibilidade Di Tommaso) | DKA Provável ≥3,5 mmol/L (LR+ 13,16) e ≥3,8 mmol/L | Específico ≥4,3 mmol/L (100% esp). (17)(18)(19)',
    '🐱 Cutoffs BHB Felino: Normal 0–0,1 mmol/L | Discreta >0,1–<1,0 mmol/L | Zona de Alerta 1,0–2,4 mmol/L | Triagem DKA/eDKA >2,4 mmol/L (100% sensibilidade, 87% especificidade Weingart). (3)(4)(20)(21)',
    '🐱 Critérios DKA Felina (iCatCare 2025): Glicose >250 mg/dL (>14 mmol/L), BHB >2,4 mmol/L, pH <7,35, HCO₃⁻ <15 mmol/L (ou cetonúria >15 mg/dL). (4)',
    '⚠️ eDKA Felina & iSGLT2: Glicemia <250 mg/dL NÃO exclui DKA em gatos (especialmente sob bexagliflozina/velagliflozina); havendo BHB >2,4 e acidose, suspender SGLT2 e tratar com insulina + dextrose. (3)(4)(5)',
    '💊 Monitorização SGLT2 Felino (AAHA 2026): Checar BHB nos dias 2–3, 7 e 14. BHB <1,0 é tranquilizador; 1,0–2,4 reavaliar em 2–3 dias; >2,4 migrar para insulina / investigar DKA-eDKA. (3)',
    '🧪 BHB Sanguíneo (POC) >>> Fita Urinária: Nitroprussiato mede acetoacetato e NÃO detecta BHB (relação habitual no gato ~3:1). Fita urinária pode parecer piorar enquanto o paciente melhora (BHB → acetoacetato). (17)(18)(19)',
    '⚠️ BHB Não é Específico de DM: Cetonemia ocorre em lipidose hepática felina (BHB até 2,78 mmol/L), inanição prolongada e balanço energético negativo. (8)',
    'Fluidoterapia em Primeiro Lugar: Expandir volemia e restaurar perfusão com cristaloide isotônico antes de iniciar a insulinização; calcular Na⁺ corrigido. (6)(7)(10)',
    'Potássio é Prioridade Vital: Suplementar KCl antes da insulina conforme AAHA 2024 (máx 0,5 mEq/kg/h); NUNCA dar insulina se K⁺ <3,0 mEq/L sem reposição prévia. (6)(7)(11)',
    'Insulina Gradual Após 2–4 h: Iniciar insulina regular (CRI ou IM) ou glargina em gatos após perfusão restaurada e K⁺ seguro; meta de queda ~50 mg/dL/h. (7)(8)(10)(12)(22)',
    'Associação Insulina + Dextrose: Adicionar Dextrose 2,5–5% ao fluido assim que a glicemia for ≤250 mg/dL para manter a supressão de cetonas sem causar hipoglicemia. (7)(8)(10)(12)',
    'Bicarbonato de Sódio NÃO é Rotina: Reservar HCO₃⁻ estritamente para acidemia profunda e refratária (pH <7,0 ou HCO₃⁻ <8 mEq/L) com instabilidade hemodinâmica. (7)(8)(9)(10)',
    'Investigação Ativa do Fator Precipitante: Buscar e tratar pancreatite (~70% cães, ~90% gatos), ITU, piometra, pneumonia e endocrinopatias com urocultura e imagem. (1)(2)(7)(10)',
    'Nutrição Enteral Precoce no Gato: Iniciar alimentação logo que vômitos cessem para prevenir lipidose hepática secundária. (3)(4)(22)(23)',
    'Critérios de Resolução da CAD: BHB <1,0–1,5 mmol/L, pH >7,35, HCO₃⁻ normalizado e ingestão alimentar voluntária restabelecida. (3)(12)(22)',
  ],
  quickSummaryRich: {
    lead:
      'Guia clínico de interpretação laboratorial/POC e conduta emergencial na Cetoacidose Diabética (CAD/DKA), Cetose Diabética (DK) e CAD Euglicêmica (eDKA) em cães e gatos. A abordagem estruturada baseia-se na sequência: **1) Reconhecimento e triagem por BHB POC → 2) Avaliação do estado ácido-base (gasometria venosa) → 3) Expansão volêmica e reposição de K⁺ → 4) Insulinização gradual associada à dextrose → 5) Controle da causa precipitante**. (1)(2)(3)(4)(5)(6)(7)(10)(11)',
    leadHighlights: [
      'BHB POC',
      'estado ácido-base',
      'reposição de K⁺',
      'insulina + dextrose',
      'causa precipitante',
    ],
    pillars: [
      {
        title: '1. Regra de Ouro & Definições (ALIVE 2026)',
        body:
          'BHB elevado identifica e quantifica cetose, mas NÃO confirma DKA isoladamente. **Cetose Diabética (DK)** = DM + cetonemia sem acidose (clinicamente estável). **Cetoacidose Diabética (DKA)** = DM + cetonemia + acidose metabólica (pH <7,35, HCO₃⁻ reduzido) (clinicamente doente). (5)',
        highlights: ['BHB não confirma DKA sozinho', 'DK sem acidose', 'DKA com acidose pH <7,35'],
      },
      {
        title: '2. Pontos de Corte BHB por Espécie',
        body:
          '**Cão:** Normal <0,32; Alerta/Triagem ≥2,3 mmol/L (100% sensibilidade Di Tommaso); DKA provável ≥3,5–3,8 mmol/L; 100% especificidade ≥4,3 mmol/L. **Gato:** Normal 0–0,1; Alerta 1,0–2,4; DKA/eDKA >2,4 mmol/L (100% sensibilidade, 87% especificidade Weingart / iCatCare 2025). (4)(17)(18)(20)',
        highlights: ['Cão triagem ≥2,3 mmol/L', 'Gato alerta 1,0–2,4 mmol/L', 'Gato DKA >2,4 mmol/L'],
      },
      {
        title: '3. eDKA Felina & Inibidores de SGLT2',
        body:
          'Glicemia normal ou pouco elevada (<250 mg/dL / <14 mmol/L) NÃO exclui DKA em gatos (especialmente com bexagliflozina/velagliflozina ou insulina). Monitorar BHB nos dias 2–3, 7 e 14 sob SGLT2 (AAHA 2026). Suspender SGLT2 e associar insulina + dextrose se BHB >2,4 com acidose. (3)(4)(5)',
        highlights: ['eDKA <250 mg/dL', 'SGLT2 dias 2–3, 7, 14', 'insulina + dextrose'],
      },
      {
        title: '4. BHB Sanguíneo POC vs Fita Urinária',
        body:
          'BHB sanguíneo é muito superior à fita de nitroprussiato, que só detecta acetoacetato (relação felina habitual ~3:1). A fita urinária pode continuar positiva ou parecer piorar durante a melhora metabólica, pois o BHB converte-se em acetoacetato conforme a perfusão melhora. (8)(9)(17)(18)(19)',
        highlights: ['POC BHB > Fita Urinária', 'nitroprussiato mede acetoacetato', 'fita urinária pode piorar na melhora'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano Diagnóstico — Sequência de Pensamento Clínico',
      steps: [
        {
          label: '1. Triagem Clínica & Suspeita',
          timing: 'Imediato (0–15 min)',
          detail:
            'Paciente diabético (ou histórico de PU/PD/perda de peso) com anorexia, vômitos, desidratação, prostração ou respiração profunda de Kussmaul. (1)(2)(7)(10)',
        },
        {
          label: '2. Triagem Glicêmica & BHB Sanguíneo (POC)',
          timing: 'Imediato (POC)',
          detail:
            'Confirmar hiperglicemia (ou eDKA se <250 mg/dL sob SGLT2) e dosar BHB por medidor portátil. Cutoff de triagem: Cão ≥2,3 mmol/L (100% sensibilidade); Gato >2,4 mmol/L (100% sensibilidade, 87% especificidade; zona alerta 1,0–2,4 mmol/L). (3)(4)(17)(18)(20)',
        },
        {
          label: '3. Avaliação Ácido-Base & Gasometria Venosa',
          timing: '30–60 min',
          detail:
            'Demonstrar acidose metabólica: pH venoso ou arterial <7,35, bicarbonato reduzido (<15 mEq/L) e Ânion Gap elevado confirmam DKA. Ausência de acidose define Cetose Diabética (DK). (5)(7)(8)(10)',
        },
        {
          label: '4. Perfil Eletrolítico & Osmolalidade',
          timing: '30–60 min',
          detail:
            'Dosar K⁺, Na⁺ (calcular Na⁺ corrigido = Na⁺ medido + 1,6 × [(Glicose − 100) / 100]), Cl⁻, Fósforo e Magnésio. Reconhecer o déficit corporal total universal de K⁺. (6)(7)(10)(11)',
        },
        {
          label: '5. Classificação da Síndrome Metabólica',
          timing: 'Integração inicial',
          detail:
            'Diferenciar CAD/DKA clássica, Cetose Diabética (DK — sem acidose), eDKA (gatos sob iSGLT2 ou insulina com glicemia <250 mg/dL) e Estado Hiperglicêmico Hiperosmolar (EHH — glicose >600 mg/dL sem cetonemia marcada). (3)(4)(5)(7)(10)',
        },
        {
          label: '6. Investigação do Fator Precipitante',
          timing: 'Primeiras 6–24 h',
          detail:
            'Hemograma, perfil renal/hepático, cPL/fPL para pancreatite, urinálise com urocultura por cistocentese, ultrassom abdominal e avaliação hormonal (T4 em gatos idosos, cortisol/HAC em cães). (1)(2)(7)(10)(23)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano Terapêutico — Passo a Passo Clínico Emergencial',
      steps: [
        {
          label: 'Passo 1: Estabilização de Volemia & Perfusão',
          timing: '0–2 h',
          detail:
            'Acesso venoso e infusão de cristaloide isotônico (NaCl 0,9% se Na⁺ corrigido <130 mEq/L; Ringer Lactato ou Plasma-Lyte se Na⁺ ≥130 mEq/L). Repor o déficit volêmico em 4 a 24 horas. (6)(7)(10)',
          dose: 'Déficit (mL) = Peso (kg) × % desidratação × 10. Somar manutenção e perdas contínuas.',
        },
        {
          label: 'Passo 2: Suplementação Imediata de Potássio (K⁺)',
          timing: 'Antes da insulina',
          detail:
            'Adicionar KCl ao fluido conforme o K⁺ sérico (Tabela 11 AAHA Fluid Guidelines 2024). NUNCA administrar insulina se K⁺ <3,0 mEq/L sem suplementação prévia. Taxa máxima de segurança: 0,5 mEq/kg/h. (6)(7)(11)',
          dose: 'K⁺ 2,5–2,9 mEq/L → 0,3 mEq/kg/h (aprox. 40–60 mEq/L de fluido conforme taxa de infusão).',
        },
        {
          label: 'Passo 3: Insulinização Gradual (2–4 h pós-fluido)',
          timing: 'Após perfusão e K⁺ seguros',
          detail:
            'Iniciar insulina regular via CRI contínua (0,05–0,1 UI/kg/h) ou doses IM fracionadas (0,1 UI/kg q1–2h em cães; 0,1 UI/kg IM ou Glargina em gatos conforme AAHA 2026). Alvo de queda glicêmica: ~50 mg/dL/h. (7)(8)(10)(12)(22)',
          dose: 'CRI Regular: 2,2 UI/kg em 250 mL NaCl 0,9% (1 mL/h = 0,0088 UI/kg/h). Titular conforme glicemia.',
        },
        {
          label: 'Passo 4: Associação de Dextrose ao Fluido',
          timing: 'Quando glicemia ≤250 mg/dL',
          detail:
            'Ao atingir glicemia ≤250 mg/dL, adicionar Dextrose 2,5% a 5% ao cristaloide mantendo a infusão de insulina. O objetivo é permitir o efeito anticetogênico contínuo da insulina sem gerar hipoglicemia até o BHB normalizar. (7)(8)(10)(12)',
          dose: 'SG 5% adicionado ao cristaloide. Manter glicemia alvo entre 150–250 mg/dL até o BHB atingir <1,0–1,5 mmol/L.',
        },
        {
          label: 'Passo 5: Controle do Fator Precipitante & Nutrição',
          timing: '24–48 h',
          detail:
            'Tratar infecções dirigidas por cultura, gerenciar pancreatite e promover nutrição enteral precoce no felino (assim que cessarem os vômitos) para evitar lipidose hepática secundária. (1)(2)(3)(4)(7)(23)',
        },
        {
          label: 'Passo 6: Monitorização Seriada & Transição para Insulina SC',
          timing: '48–72 h (Resolução)',
          detail:
            'Critérios de resolução: BHB <1,0–1,5 mmol/L, pH >7,35, HCO₃⁻ normalizado e paciente alimentando-se voluntariamente. Iniciar insulina de longa ação SC (NPH/Caninsulin em cães; Glargina/Detemir em gatos). (3)(4)(7)(12)(22)',
        },
      ],
    },
  },

  etiology: {
    pontosChave: [
      'CAD resulta da deficiência insulínica grave (relativa ou absoluta) associada ao excesso de glucagon, cortisol, adrenalina e GH. (1)(2)(7)(9)',
      'A escassez de insulina desinibe a lipase sensível a hormônio no tecido adiposo, liberando ácidos graxos livres para β-oxidação hepática e cetogênese acelerada. (7)(9)(10)',
      'Os corpos cetônicos formados são acetoacetato, β-hidroxibutirato (BHB) e acetona. O BHB é o corpo cetônico predominante no sangue na CAD descompensada. (7)(9)(10)(18)(19)',
      'Fatores precipitantes agudos (pancreatite, ITU/pielonefrite, piometra, lipidose, neoplasia) estão presentes em ~70% dos cães e ~90% dos gatos com CAD. (7)(10)(23)',
      'eDKA Felina: em gatos sob uso de inibidores de SGLT2 (bexagliflozina/velagliflozina), a glicosúria farmacológica maciça pode manter a glicemia <250 mg/dL apesar da cetogênese e acidose ativas. (3)(4)(5)',
    ],
    deficienciaInsulina:
      'Sem insulina suficiente para inibir a lipase tecidual, grandes quantidades de ácidos graxos livres chegam aos hepatócitos. O excesso de glucagon ativa a carnitina palmitoiltransferase I (CPT-1), desviando os ácidos graxos para a mitocôndria, onde a β-oxidação produz acetoacetil-CoA e acetoacetato, que é reduzido a β-hidroxibutirato (BHB) pela BHB-desidrogenase. Em condições de hipoperfusão e acidose celular, o equilíbrio redox NADH/NAD⁺ favorece fortemente a conversão em BHB. (7)(9)(10)(18)(19)',
    gatilhosPrecipitantes: {
      caes: 'Pancreatite aguda (~40–50%), ITU/pielonefrite, piometra, hiperadrenocorticismo (HAC), neoplasias, cardiopatias, omissão ou dose inadequada de insulina. (1)(7)(10)',
      gatos: 'Pancreatite aguda/crônica (~50–60%), ITU/pielonefrite, lipidose hepática, doença renal crônica (DRC), hipertireoidismo, neoplasias, infecções sistêmicas, uso de inibidores de SGLT2 com estresse/anorexia associados. (2)(3)(4)(5)(7)(23)',
    },
  },

  epidemiology: {
    caes:
      'A CAD ocorre em aproximadamente 30–40% dos cães no momento do diagnóstico inicial de DM ou como descompensação aguda secundária a comorbidades inflamatórias/infecciosas. (1)(7)(10)',
    gatos:
      'Presente em 10–30% dos felinos diabéticos na admissão hospitalar. Com o advento dos inibidores de SGLT2, a eDKA emergiu como uma complicação crítica exigindo triagem sistemática de BHB nos primeiros 14 dias de tratamento. (2)(3)(4)(5)(23)',
    comparativoEspecies: {
      kind: 'clinicalTable' as const,
      caption: 'Comparativo Clínico e Laboratorial: CAD em Cães vs Gatos',
      headers: ['Aspecto Clínico / Laboratorial', 'Cão', 'Gato'],
      rows: [
        ['Frequência no DM', '30–40% na apresentação inicial', '10–30% na apresentação inicial'],
        ['Glicemia Típica na CAD', 'Elevada (>250–450 mg/dL)', 'Elevada (>250 mg/dL) ou normal/pouco elevada (<250 mg/dL) na eDKA'],
        ['Padrão BHB Fisiológico', '<0,32 mmol/L (Basic Monitoring)', '0–0,1 mmol/L (Weingart 2012; ~0,11 Basic Monitoring)'],
        ['Cutoff BHB Alerta / Triagem DKA', '≥2,3 mmol/L (100% sensibilidade Di Tommaso)', '1,0–2,4 mmol/L (zona de alerta); >2,4 mmol/L (triagem DKA/eDKA)'],
        ['Cutoff BHB Clássico / Forte Evidência', '≥3,5 mmol/L (LR+ 13,16) e ≥3,8 mmol/L (Duarte/Bresciani)', '>2,4 mmol/L + pH <7,35 + HCO₃⁻ <15 mmol/L (iCatCare 2025)'],
        ['Doença Concomitante Precipitante', 'Presente em ~70% dos casos', 'Presente em ~90% dos casos'],
        ['Risco de eDKA (SGLT2)', 'Raro / Não aplicável na rotina atual', 'Risco relevante em uso de Bexagliflozina/Velagliflozina'],
        ['Insulinoterapia Inicial', 'Insulina Regular (CRI ou IM fracionada)', 'Insulina Regular IM ou Glargina IV/IM (AAHA 2026)'],
        ['Manejo Nutricional', 'Iniciar após reidratação e estabilização', 'Nutrição enteral precoce essencial (prevenção de lipidose)'],
      ],
    },
    tabelaDefinicoes: {
      kind: 'clinicalTable' as const,
      caption: 'Terminologia & Definições Práticas dos Estados Cetóticos (Consenso ALIVE 2026 / iCatCare 2025)',
      headers: ['Entidade Clínica', 'Glicemia (mg/dL)', 'BHB Sanguíneo (mmol/L)', 'Acidose Metabólica (pH / HCO₃⁻)', 'Condição Clínica do Paciente'],
      rows: [
        ['Cetose Diabética — DK', 'Elevada (>250)', 'Elevado (>1,5 no cão; >1,0 no gato)', 'Ausente (pH ≥7,35 / HCO₃⁻ normal)', 'Clinicamente estável, alerta, pode estar alimentando-se'],
        ['Cetoacidose Diabética — DKA', 'Elevada (>250)', '≥2,3 (cão) / >2,4 (gato)', 'Presente (pH <7,35 e HCO₃⁻ <15)', 'Clinicamente doente: prostrado, desidratado, vômitos, taquipneia'],
        ['CAD Euglicêmica — eDKA', 'Normal ou pouco elevada (<250)', '>2,4 no gato', 'Presente (pH <7,35 e HCO₃⁻ <15)', 'Doente; comum em gatos tratados com iSGLT2 ou insulina'],
        ['Estado Hiperosmolar — EHH/HHS', 'Muito elevada (>600)', 'Normal ou discreta (<1,5)', 'Ausente ou discreta (pH >7,30)', 'Grave desidratação, estupor/coma, osmolalidade >320 mOsm/kg'],
      ],
    },
  },

  pathogenesisTransmission: {
    cascataMetabolica: [
      '1) Deficiência absoluta ou relativa de insulina + elevação massiva de hormônios contrarreguladores (glucagon, cortisol, catecolaminas, GH). (7)(9)(10)',
      '2) Lipólise acentuada no tecido adiposo pela ativação da lipase sensível a hormônio → liberação maciça de ácidos graxos livres na circulação. (7)(9)',
      '3) Cetogênese acelerada no fígado via CPT-1 mitocondrial → acúmulo de acetoacetato e sua redução preferencial a β-hidroxibutirato (BHB). (7)(9)(10)(18)(19)',
      '4) Os corpos cetônicos dissociam-se em ânions e íons H⁺, consumindo as reservas de bicarbonato corporal → acidose metabólica com ânion gap elevado. (7)(8)(10)',
      '5) Diurese osmótica induzida pela hiperglicemia e glicosúria/cetonúria → desidratação progressiva, hipovolemia, perda de Na⁺, K⁺, Cl⁻, Fósforo e Magnésio. (6)(7)(10)',
      '6) Déficit universal de potássio mascarado inicialmente pela acidemia; a infusão de insulina e a reidratação deslocam K⁺ para o intracelular gerando risco de hipocalemia fatal. (6)(7)(11)',
    ],
    transmissao: 'Distúrbio metabólico endógeno grave não transmissível. (1)(2)(7)',
    fluxoFisiologico: {
      titulo: 'Cascata Fisiopatológica da CAD',
      etapas: [
        { fase: 'Deficiência Insulínica', evento: 'Lipólise maciça e liberação de ácidos graxos livres' },
        { fase: 'Fígado', evento: 'Ativação de CPT-1, β-oxidação e cetogênese (BHB predomina)' },
        { fase: 'Circulação', evento: 'Hiperglicemia (ou euglicemia sob SGLT2) + Cetonemia patológica' },
        { fase: 'Rim', evento: 'Diurese osmótica, desidratação e espoliação eletrolítica grave' },
        { fase: 'Tampão Bicarbonato', evento: 'Acidose metabólica com ânion gap elevado (pH <7,35, HCO₃⁻ <15)' },
        { fase: 'Terapia Emergencial', evento: 'Fluido + K⁺ antes da insulina para prevenir colapso e hipocalemia' },
      ],
    },
  },

  pathophysiology: {
    fisiologiaBasica:
      'A falta de insulina impede a utilização periférica de glicose e desinibe a lipólise. No fígado, a β-oxidação gera acetil-CoA em excesso, sintetizando corpos cetônicos (acetoacetato ⇄ β-hidroxibutirato → acetona). Em estados de hipoperfusão e acidose, a relação NADH/NAD⁺ mitocondrial aumenta acentuadamente, desviando o equilíbrio para a formação maciça de **β-hidroxibutirato (BHB)**. Por essa razão, o BHB é o corpo cetônico predominante na fase aguda e grave da CAD. (7)(9)(10)(18)(19)',
    paradoxoPotassio:
      'O potássio sérico na admissão pode apresentar-se normal ou mesmo discretamente elevado devido ao efluxo celular de K⁺ causado pela acidemia e pelo déficit insulínico. Contudo, o **déficit corporal total de potássio é quase universal** devido às perdas urinárias na diurese osmótica. A fluidoterapia e a insulina promovem a rápida entrada de K⁺ nas células; sem suplementação agressiva prévia, desenvolve-se hipocalemia grave com arritmias, fraqueza muscular, hipoventilação e parada respiratória. (6)(7)(11)',
    acidobase:
      'A CAD cursa com acidose metabólica de ânion gap elevado decorrente do acúmulo dos ânions cetônicos não mensurados (BHB⁻ e acetoacetato⁻) que consomem tampão bicarbonato. A compensação respiratória imediata envolve hiperventilação (padrão respiratório profundo de Kussmaul) para eliminar CO₂. (7)(8)(9)(10)',
    alertaEdkaSglT2_2026:
      '⚠️ **CAD Euglicêmica (eDKA) & Inibidores de SGLT2 (ALIVE 2026 / AAHA 2026):** A glicemia normal ou pouco elevada (<250 mg/dL / <14 mmol/L) NÃO descarta CAD. Gatos tratados com inibidores de SGLT2 (bexagliflozina, velagliflozina) que desenvolvam anorexia, pancreatite ou estresse metabólico continuam excretando glicose na urina, mas sofrem lipólise e cetogênese aceleradas, gerando eDKA grave. Conduta: suspender imediatamente o SGLT2, internar, iniciar fluidoterapia com reposição de K⁺ e administrar insulina regular associada à infusão contínua de dextrose 2,5–5%. (3)(4)(5)',
    alertaBhbPreferencial:
      '⚡ **Cetonemia Sanguínea (BHB POC) >>> Fita Urinária de Nitroprussiato:** Medidores portáteis de BHB em sangue total são o padrão-ouro de triagem e monitorização. O BHB eleva-se no sangue horas antes do aparecimento de cetonúria significativa e quantifica com precisão a magnitude da cetose. (3)(4)(17)(18)(20)',
    alertaCetonuriaArmadilha:
      '⚠️ **Armadilha da Fita Urinária de Nitroprussiato:** A fita urinária detecta apenas acetoacetato (e fracamente acetona), sendo **incapaz de detectar β-hidroxibutirato (BHB)**. Como a proporção BHB:acetoacetato no sangue pode chegar a 3:1 ou mais no gato em hipoperfusão (August’s Consultations in Feline Internal Medicine), a cetonúria negativa NÃO exclui CAD. Além disso, durante o tratamento bem-sucedido, o BHB é oxidado de volta a acetoacetato, fazendo com que a fita urinária continue "mais positiva" enquanto o paciente está clinicamente melhorando. (8)(9)(17)(18)(19)',
    alertaBhbNaoEspecifico:
      '⚠️ **BHB Não é Específico de Diabetes Mellitus:** A cetonemia reflete aumento de cetogênese e pode ocorrer em qualquer estado de balanço energético negativo acentuado, jejum prolongado, anorexia sustentada e doenças hepáticas. No gato, a lipidose hepática felina pode elevar o BHB sérico a valores de até ~2,78 mmol/L na ausência de diabetes. Por isso, a interpretação do BHB exige integração rigorosa com a glicemia, o estado clínico e a gasometria. (8)',
    alertaLimitacaoPoc:
      '⚠️ **Limitações dos Medidores Portáteis Point-of-Care (POC):** Estudos de validação em felinos (Zeugswetter & Rebuzzi 2012) demonstram excelente correlação (r = 0,97) com métodos laboratoriais, mas evidenciam viés negativo em concentrações muito elevadas de BHB (o aparelho portátil pode subestimar valores extremamente altos). Não obstante, seu valor para triagem rápida e monitorização da tendência é insubstituível. (21)',
    tabelaBhbCutoffs: {
      kind: 'clinicalTable' as const,
      caption: 'Valores de Referência e Pontos de Corte de BHB Sanguíneo por Espécie (ALIVE 2026 / AAHA 2026 / iCatCare 2025)',
      headers: ['Espécie / Estado Clínico', 'BHB Sanguíneo (mmol/L)', 'Interpretação e Conduta Prática Recomendada'],
      rows: [
        ['Cão Saudável (Normal)', '< 0,32', 'Sem cetonemia significativa (Basic Monitoring).'],
        ['Cão — Cetonemia Discreta', '≥ 0,32 e < 2,3', 'Cetonemia acima do normal; interpretar com quadro clínico, alimentação e comorbidades.'],
        ['Cão — Triagem DKA (Cutoff)', '≥ 2,3', '100% de sensibilidade para DKA (Di Tommaso 2009). Solicitar gasometria venosa imediata.'],
        ['Cão — DKA Provável / Clássico', '≥ 3,5 a 3,8', 'Forte evidência de DKA (LR+ 13,16 a 14,8; Duarte 2002, Bresciani 2014).'],
        ['Cão — Altamente Específico', '≥ 4,3', '100% de especificidade para DKA no estudo de Di Tommaso com medidor portátil.'],
        ['Gato Saudável (Normal)', '0 – 0,1', 'Faixa observada em gatos saudáveis (Weingart 2012; ~0,11 Basic Monitoring).'],
        ['Gato — Cetonemia Discreta', '> 0,1 e < 1,0', 'Pode ocorrer em jejum ou DM não cetótico; interpretar no contexto clínico.'],
        ['Gato — Zona de Alerta', '1,0 – 2,4', 'Monitorização seriada próxima; investigar se houver inapetência, letargia ou vômitos.'],
        ['Gato — Triagem DKA / eDKA', '> 2,4', 'Cutoff principal felino (sensibilidade 100%, especificidade 87% — Weingart 2012 / iCatCare 2025).'],
        ['Meta de Resolução (Cão e Gato)', '< 1,0 – 1,5', 'Cetonemia controlada; transicionar para insulina SC se pH >7,35 e paciente alimentando-se.'],
      ],
    },
    tabelaBhbCutoffsCaes: {
      kind: 'clinicalTable' as const,
      caption: 'Interpretação da Cetonemia (BHB Sanguíneo) no Cão — Valores de Referência e Pontos de Corte',
      headers: ['BHB Sanguíneo (mmol/L)', 'Interpretação Clínica', 'Evidência Científica / Conduta Prática Recomendada'],
      rows: [
        ['< 0,32', 'Valor esperado em cães saudáveis', 'Sem cetonemia significativa. Limite fisiológico normal (Basic Monitoring).'],
        ['≥ 0,32 e < 2,3', 'Cetonemia discreta a moderada', 'Acima do esperado, mas abaixo do cutoff de triagem de DKA. Interpretar com quadro clínico, glicemia, ingestão alimentar e comorbidades.'],
        ['≥ 2,3', '🚨 Cutoff de triagem para DKA', '100% de sensibilidade para DKA no estudo de Di Tommaso et al. (2009). Solicitar gasometria venosa imediata, HCO₃⁻, eletrólitos e calcular ânion gap.'],
        ['≥ 2,8', 'DKA progressivamente mais provável', 'Razão de verossimilhança negativa (LR−) de aproximadamente 0,05 no estudo de Di Tommaso.'],
        ['≥ 3,5', '🔴 Forte evidência favorável a DKA', 'Razão de verossimilhança positiva (LR+) de 13,16 (Di Tommaso et al., 2009).'],
        ['≥ 3,8', '🔴 Cutoff clássico de equilíbrio sensibilidade/especificidade', 'Estudo Duarte et al. (2002): sensibilidade 72%, especificidade 95%, LR+ 14,8. Bresciani et al. (2014) em sangue capilar: sensibilidade 70%, especificidade 92%.'],
        ['≥ 4,3', '🔴🔴 Altíssima especificidade para DKA', '100% de especificidade para DKA no estudo de Di Tommaso et al. com medidor portátil.'],
        ['BHB elevado + Acidose metabólica (pH <7,35)', 'Cetoacidose Diabética (DKA) confirmada', 'Emergência metabólica: hospitalizar, fluidoterapia, reposição de K⁺ e insulinização gradual.'],
      ],
    },
    tabelaBhbCutoffsGatos: {
      kind: 'clinicalTable' as const,
      caption: 'Interpretação da Cetonemia (BHB Sanguíneo) no Gato — Valores de Referência e Pontos de Corte',
      headers: ['BHB Sanguíneo (mmol/L)', 'Interpretação Clínica', 'Evidência Científica / Conduta Prática Recomendada'],
      rows: [
        ['0 – 0,1', '🟢 Faixa esperada em gatos saudáveis', 'Normal. Limite de higidez felina sustentado por Weingart et al. (2012) e Basic Monitoring (~0,11 mmol/L).'],
        ['> 0,1 e < 1,0', 'Cetonemia discreta', 'Pode ocorrer em jejum ou DM sem descompensação. Interpretar no contexto clínico e nutricional.'],
        ['1,0 – 2,4', '🟠 Zona de Alerta', 'Monitorização seriada próxima; avaliar progressão e sinais clínicos, especialmente se o gato estiver inapetente, letárgico ou vomitando.'],
        ['> 2,4', '🔴 Cetonemia clinicamente importante', 'Cutoff principal felino (Weingart et al. 2012: sensibilidade 100%, especificidade 87%; iCatCare 2025). Investigar DKA / eDKA imediatamente.'],
        ['> 2,4 + pH <7,35 + HCO₃⁻ <15 mmol/L', '🔴🔴 Compatível com DKA / eDKA', 'Emergência metabólica. Confirmar DKA se glicemia >250 mg/dL ou eDKA se glicemia <250 mg/dL (especialmente sob iSGLT2).'],
        ['> 2,4 sem acidose e paciente bem', 'Cetose Diabética (DK), não DKA', 'Investigar causa precipitante, monitorar tendência e ajustar insulinoterapia sem protocolo de UTI para DKA.'],
      ],
    },
    tabelaCriteriosiCatCare2025: {
      kind: 'clinicalTable' as const,
      caption: 'Critérios Diagnósticos de DKA Felina (iCatCare Consensus Guidelines 2025)',
      headers: ['Parâmetro Laboratorial', 'Critério Definidor de DKA Felina', 'Notas de Interpretação Clínica'],
      rows: [
        ['Glicemia', '> 250 mg/dL (> 14 mmol/L)', 'Se glicemia < 250 mg/dL com os demais critérios presentes, classificar como eDKA (comum sob SGLT2).'],
        ['BHB Sanguíneo', '> 2,4 mmol/L', 'Principal ponto de decisão; faixa 1,0–2,4 mmol/L é zona de alerta em felinos doentes.'],
        ['pH venoso ou arterial', '< 7,35', 'Demonstração obrigatória de acidose metabólica para caracterizar DKA.'],
        ['Bicarbonato (HCO₃⁻)', '< 15 mmol/L', 'Consumo da reserva alcalina pelo excesso de ânions cetônicos.'],
        ['Cetonúria (quando utilizada)', '> 15 mg/dL', 'Fita de nitroprussiato mede apenas acetoacetato; BHB sanguíneo é preferível.'],
      ],
    },
    tabelaBhbSglt2Aaha2026: {
      kind: 'clinicalTable' as const,
      caption: 'Monitorização de BHB em Gatos Tratados com Inibidores de SGLT2 (AAHA 2026 Guidelines)',
      headers: ['BHB Sanguíneo Medido', 'Conduta Prática Recomendada pela Diretriz AAHA 2026'],
      rows: [
        ['< 1,0 mmol/L', 'Geralmente tranquilizador se o felino estiver clinicamente bem e alimentando-se.'],
        ['1,0 – 2,4 mmol/L', 'Reavaliar clinicamente e redosar BHB em aproximadamente 2 a 3 dias (imediatamente se surgirem sinais clínicos).'],
        ['> 2,4 mmol/L', 'Em regra, suspender o inibidor de SGLT2, migrar para insulinoterapia e investigar DKA / eDKA.'],
        ['BHB aumentando progressivamente', '🚨 Aumenta a preocupação clínica mesmo antes de surgir acidemia evidente; intervir precocemente.'],
        ['Gato inapetente, vomitando ou letárgico', '🚨 Não depender apenas do valor absoluto de BHB; solicitar gasometria e investigar DKA/eDKA imediatamente.'],
      ],
    },
    tabelaPotassioAaha2024: {
      kind: 'clinicalTable' as const,
      caption: 'Suplementação de Potássio (K⁺) no Fluido — AAHA Fluid Therapy Guidelines 2024 (Tabela 11)',
      headers: ['K⁺ Sérico Medido (mEq/L)', 'Taxa de Suplementação Sugerida (mEq/kg/h)', 'Adição Estimada de KCl por Litro de Cristaloide*'],
      rows: [
        ['< 2,0', '0,5 (máximo absoluto de segurança)', '80 – 200 mEq/L (ajustar conforme taxa de infusão em mL/kg/h)'],
        ['2,0 – 2,5', '0,3 – 0,4', '60 – 80 mEq/L'],
        ['2,6 – 3,0', '0,2 – 0,25', '40 – 60 mEq/L'],
        ['3,1 – 3,5', '0,1 – 0,15', '20 – 40 mEq/L'],
        ['> 3,5', '0,05', '14 – 20 mEq/L'],
      ],
    },
    notaPotassio:
      '*A quantidade exata de KCl adicionada ao frasco de fluido depende da taxa de infusão programada (mL/kg/h). A taxa limite de segurança biológica é de **0,5 mEq/kg/h**. NUNCA administrar cloreto de potássio em bolus IV não diluído. (6)(11)',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Anorexia, prostração grave, letargia e fraqueza muscular generalizada',
          mechanism: 'Acidemia cetônica profunda, desidratação osmótica e espoliação de potássio, fósforo e magnésio.',
          clinicalMeaning: 'Sinais cardinais de descompensação metabólica exigindo triagem imediata de BHB e gasometria. (1)(2)(7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Desidratação moderada a grave (5–12%), hipotensão e tempo de preenchimento capilar prolongado',
          mechanism: 'Diurese osmótica maciça provocada por glicosúria e cetonúria somada a perdas gastrointestinais (vômitos).',
          clinicalMeaning: 'Indica urgência de expansão volêmica antes de qualquer insulina. (6)(7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Histórico prévio de poliúria, polidipsia, polifagia e perda de peso progressiva',
          mechanism: 'Diabetes mellitus subjacente novo ou descompensado por resistência insulínica.',
          clinicalMeaning: 'Caracteriza a síndrome metabólica de base. (1)(2)(7)',
          priority: 'common',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Padrão respiratório profundo e hiperpneico (Respiração de Kussmaul)',
          mechanism: 'Compensação respiratória reflexa (hiperventilação) para eliminar CO₂ em resposta à acidose metabólica.',
          clinicalMeaning: 'Forte indício de acidemia grave (pH <7,20) — gasometria urgente. (7)(10)',
          priority: 'emergency',
        },
        {
          finding: 'Odor cetônico no hálito (frutado / adocicado)',
          mechanism: 'Eliminação pulmonar de acetona volátil derivada da descarboxilação espontânea do acetoacetato.',
          clinicalMeaning: 'Achado clássico, porém subjetivo e inconstante; ausência não descarta DKA. (7)(10)',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Vômitos agudos, náusea e dor à palpação do abdômen cranial',
          mechanism: 'Efeito emetogênico da cetonemia/acidose no centro do vômito e frequente presença de pancreatite aguda associada.',
          clinicalMeaning: 'Obriga à dosagem de cPL/fPL e ultrassonografia abdominal para identificar pancreatite precipitante. (2)(7)(23)',
          priority: 'common',
          context: ['Gatos', 'Cães'],
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Depressão mental progressiva, estupor ou coma',
          mechanism: 'Hipoperfusão cerebral, hiperosmolalidade plasmática grave e acidose liquórica.',
          clinicalMeaning: 'Alerta para coexistência de Estado Hiperosmolar (EHH) ou risco de edema cerebral osmótico. (7)(10)',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'Hiperglicemia (ou euglicemia na eDKA) + BHB sanguíneo elevado + Acidose metabólica',
          mechanism: 'Deficiência insulínica severa com cetogênese descontrolada e consumo de bicarbonato.',
          clinicalMeaning: 'Tríade confirmatória de CAD/DKA. (3)(4)(5)(17)(18)(20)',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: {
    tabelaComparativaEntidades: {
      kind: 'clinicalTable' as const,
      caption: 'Diagnóstico Diferencial: CAD/DKA × Cetose Diabética (DK) × eDKA × Estado Hiperosmolar (EHH)',
      headers: ['Entidade Clínica', 'Glicemia (mg/dL)', 'BHB Sanguíneo (POC)', 'Acidose (pH / HCO₃⁻)', 'Conduta Principal'],
      rows: [
        ['CAD / DKA Clássica', 'Alta (>250)', '≥2,3 (cão) / >2,4 (gato)', 'pH <7,35 / HCO₃⁻ <15', 'Hospitalização UTI: Fluido + K⁺ + Insulina regular/glargina + Dextrose'],
        ['Cetose Diabética (DK)', 'Alta (>250)', '1,5–2,5 (cão) / 1,0–2,4 (gato)', 'Normal (pH ≥7,35 / HCO₃⁻ >18)', 'Manejo ambulatorial ou internação leve; ajuste de insulina de longa ação'],
        ['CAD Euglicêmica (eDKA)', 'Normal ou <250', '>2,4 no gato', 'pH <7,35 / HCO₃⁻ <15', 'Suspender iSGLT2 imediatamente + Internação com Insulina e Dextrose'],
        ['Estado Hiperosmolar (EHH)', 'Muito alta (>600)', '<1,5 (mínima)', 'Normal ou discreta (pH >7,30)', 'Reidratação gradual e lenta (24–48h) + Cautela extrema com insulina'],
      ],
    },
    diagnosticReasoning:
      'O raciocínio diagnóstico da CAD/DKA estrutura-se em cinco etapas lógicas: 1) Reconhecer o diabetes descompensado (ou suspeitar de eDKA em felinos sob SGLT2 com glicemia <250 mg/dL); 2) Quantificar a cetonemia pelo BHB sanguíneo em medidor portátil (cutoffs: cão ≥2,3 mmol/L; gato >2,4 mmol/L); 3) Demonstrar a acidose metabólica via gasometria venosa (pH <7,35, HCO₃⁻ <15 mEq/L) para diferenciar DKA de Cetose Diabética (DK); 4) Mapear eletrólitos (K⁺, Na⁺ corrigido, P, Mg²⁺) para direcionar fluidoterapia e suplementação; 5) Investigar agressivamente o fator precipitante (pancreatite, ITU, piometra, neoplasia). (3)(4)(5)(6)(7)(10)(17)(18)(20)(23)',
    cardAlertaVetius:
      '⚠️ **CARD DE ALERTA CLÍNICO VETIUS — REGRAS DE DECISÃO:**\n• **BHB NÃO CONFIRMA DKA ISOLADAMENTE:** Cetonemia isolada sem acidose é **Cetose Diabética (DK)**. DKA requer a tríade: Diabetes + Cetonemia/Cetonúria + Acidose metabólica (pH <7,35).\n• **CÃO:** BHB ≥2,3 mmol/L → solicitar gasometria venosa e eletrólitos imediatamente (100% sensibilidade). BHB ≥3,5–3,8 mmol/L → DKA fortemente provável no cão doente. BHB ≥4,3 mmol/L → 100% específico.\n• **GATO:** BHB 1,0–2,4 mmol/L → zona de alerta. BHB >2,4 mmol/L → investigar DKA/eDKA imediatamente (100% sensibilidade, 87% especificidade).\n• **eDKA:** Glicemia normal ou pouco elevada (<250 mg/dL) **NÃO exclui DKA**, especialmente em gatos em uso de inibidores de SGLT2 (bexagliflozina/velagliflozina) ou sob insulinoterapia.',
    algoritmoCao:
      '🐶 **Algoritmo Prático de Decisão no Cão:**\n1. **BHB <0,32 mmol/L:** Dentro do esperado para cães saudáveis; sem cetonemia significativa.\n2. **BHB 0,32 a 2,29 mmol/L:** Cetonemia acima do normal; avaliar diabetes, jejum/anorexia, doenças concomitantes e monitorar tendência seriada.\n3. **BHB ≥2,3 mmol/L:** 🚨 **Avaliar DKA imediatamente.** Solicitar gasometria venosa, bicarbonato, Na⁺, K⁺, Cl⁻, Fósforo, glicemia, função renal, urinálise com urocultura e calcular ânion gap.\n4. **BHB ≥3,5 mmol/L:** DKA torna-se fortemente provável se o cão estiver clinicamente doente (LR+ 13,16).\n5. **BHB ≥4,3 mmol/L:** Valor de altíssima especificidade (100%) para DKA no estudo de Di Tommaso et al.\n6. **BHB elevado sem acidose (pH ≥7,35):** Diagnóstico de Cetose Diabética (DK), não DKA. Tratar diabetes ambulatorialmente/hospitalar leve sem protocolo agressivo de UTI.',
    algoritmoGato:
      '🐱 **Algoritmo Prático de Decisão no Gato:**\n1. **BHB ≤0,1 mmol/L:** Faixa esperada em gatos saudáveis (Weingart 2012; ~0,11 Basic Monitoring).\n2. **BHB >0,1 a <1,0 mmol/L:** Discreta elevação; contextualizar com alimentação e estado clínico.\n3. **BHB 1,0 a 2,4 mmol/L:** 🟠 **Zona de Alerta.** Se o gato estiver inapetente, letárgico, vomitando ou desidratado → realizar gasometria e investigação de DKA/eDKA. Se estiver bem → acompanhar tendência seriada.\n4. **BHB >2,4 mmol/L:** 🔴 **Investigar DKA / eDKA imediatamente** (solicitar gasometria, eletrólitos e comorbidades).\n5. **BHB >2,4 + pH <7,35 + HCO₃⁻ <15 mmol/L:** DKA ou eDKA confirmada conforme a glicemia:\n   • Glicemia >250 mg/dL → **DKA hiperglicêmica clássica**.\n   • Glicemia <250 mg/dL → **CAD euglicêmica (eDKA)**, especialmente em gatos sob uso de inibidores de SGLT2 (AAHA 2026 / iCatCare 2025).',
    steps: [
      {
        stepNumber: 1,
        title: 'Triagem Glicêmica e Cetonemia Sanguínea (BHB POC)',
        purpose: 'Identificar hiperglicemia e quantificar cetonemia com medidor portátil de sangue total.',
        description:
          'Aferir glicemia capilar e BHB sanguíneo em ponta de dedo ou sangue venoso total. Cutoffs de triagem: Cão ≥2,3 mmol/L (100% sensibilidade Di Tommaso); Gato >2,4 mmol/L (100% sensibilidade Weingart; zona alerta 1,0–2,4 mmol/L). (3)(4)(17)(18)(20)',
        interpretation:
          'BHB elevado confirma cetose e exige gasometria venosa imediata. Glicemia <250 mg/dL não descarta DKA em gatos sob SGLT2 (eDKA).',
        isGoldStandard: true,
      },
      {
        stepNumber: 2,
        title: 'Gasometria Venosa ou Arterial',
        purpose: 'Demonstrar acidose metabólica para diferenciar DKA de Cetose Diabética (DK).',
        description:
          'Avaliar pH venoso/arterial, bicarbonato (HCO₃⁻), PaCO₂/PvCO₂ e calcular o Ânion Gap = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻). (5)(7)(8)(10)',
        interpretation:
          'pH <7,35 associado a HCO₃⁻ <15 mEq/L e Ânion Gap elevado confirma DKA. pH ≥7,35 com HCO₃⁻ normal define Cetose Diabética (DK).',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Painel Eletrolítico Completo & Cálculo do Na⁺ Corrigido',
        purpose: 'Guiar a fluidoterapia de ressuscitação e a suplementação obrigatória de potássio.',
        description:
          'Dosar K⁺, Na⁺, Cl⁻, Fósforo inorgânico e Magnésio. Calcular: Na⁺ corrigido = Na⁺ medido + 1,6 × [(Glicose − 100) / 100]. (6)(7)(10)(11)',
        interpretation:
          'K⁺ sérico baixo (<3,5 mEq/L) na admissão indica depleção corporal crítica de potássio e obriga à reposição de KCl antes de iniciar insulina.',
      },
      {
        stepNumber: 4,
        title: 'Hemograma e Bioquímica Renal e Hepática',
        purpose: 'Avaliar a gravidade sistêmica, azotemia, lesão hepatobiliar e resposta inflamatória.',
        description:
          'Avaliar hematócrito, proteínas totais, leucograma com contagem de bastonetes, ureia, creatinina, ALT, FA, bilirrubinas e albumina. (1)(2)(7)',
        interpretation:
          'Azotemia pré-renal frequente por desidratação; leucocitose com desvio à esquerda e bandas aumentadas sugere foco infeccioso precipitante.',
      },
      {
        stepNumber: 5,
        title: 'Urinálise Completa e Urocultura por Cistocentese',
        purpose: 'Identificar infecção do trato urinário (ITU) oculta e avaliar função tubular renal.',
        description:
          'Coletar urina por cistocentese antes da primeira dose de antimicrobiano; realizar densidade urinária, sedimentoscopia e urocultura quantitativa com antibiograma. (1)(2)(7)(10)',
        interpretation:
          'ITU está presente em até 30% dos pacientes com CAD e frequentemente apresenta sedimento urinário inativo pela baixa resposta imune.',
      },
      {
        stepNumber: 6,
        title: 'Pesquisa Ativa do Fator Precipitante (Pancreatite e Imagem Abdominal)',
        purpose: 'Identificar a causa descompensante primária responsável pela resistência insulínica.',
        description:
          'Dosagem de cPL (cão) / fPL (gato) para pancreatite aguda e ultrassonografia abdominal completa para investigar pancreatite, piometra, nefropatia e neoplasias. (1)(2)(4)(7)(23)',
        interpretation:
          'Pancreatite e infecções são os fatores descompensantes mais prevalentes em cães e gatos com CAD.',
      },
    ],
    diferenciais: [
      'Cetose de jejum prolongado / inanição (BHB geralmente discreto <1,5 mmol/L, sem acidose metabólica grave). (7)(10)(18)',
      'Lipidose hepática felina primária (cetonemia discreta a moderada com BHB de até ~2,78 mmol/L sem diabetes ou acidose grave). (8)',
      'Acidose láctica pura por sepse ou choque circulatório (lactato elevado com BHB normal). (7)(10)',
      'Insuficiência renal aguda / crônica descompensada com uremia (acidose metabólica de ânion gap elevado sem cetonemia diabética). (7)(9)',
      'Intoxicação por etilenoglicol (acidose metabólica profunda com ânion gap e osmolal gap extremos sem cetonemia patológica). (8)(10)',
    ],
    jornadaDiagnostica: [
      { etapa: 'Triagem Inicial', acao: 'Glicemia POC + BHB portátil no sangue total em todo paciente diabético doente ou sob SGLT2.', nota: '(3)(4)(17)(18)(20)' },
      { etapa: 'Confirmação Ácido-Base', acao: 'Gasometria venosa (pH <7,35, HCO₃⁻ <15) e dosagem de eletrólitos (K⁺, Na⁺, Cl⁻, P).', nota: '(5)(7)(10)(11)' },
      { etapa: 'Classificação Editorial', acao: 'Diferenciar DKA clássica de Cetose Diabética (DK), CAD Euglicêmica (eDKA) e Estado Hiperosmolar (EHH).', nota: '(3)(4)(5)(7)' },
      { etapa: 'Pesquisa do Fator Precipitante', acao: 'cPL/fPL (pancreatite), urocultura por cistocentese, hemograma, bioquímica e ultrassom abdominal.', nota: '(1)(2)(7)(23)' },
      { etapa: 'Monitorização da Resolução', acao: 'BHB seriado <1,0–1,5 mmol/L, pH >7,35 normalizado e ingestão alimentar voluntária restabelecida.', nota: '(3)(12)(22)' },
    ],
  },

  treatment: {
    objetivos: [
      'Restabelecer a volemia efetiva e a perfusão tecidual por meio de fluidoterapia isotônica balanceada individualizada. (6)(7)(10)',
      'Prevenir e corrigir a hipocalemia arritmogênica antes e durante a insulinização (suplementar K⁺ antes da insulina se K⁺ <3,5 mEq/L). (6)(7)(11)',
      'Interromper a lipólise e a cetogênese com insulinoterapia gradual, sustentando a glicemia entre 150–250 mg/dL via infusão de dextrose. (7)(10)(12)',
      'Corrigir desequilíbrios de fósforo, magnésio e equilíbrio ácido-base sem uso rotineiro de bicarbonato de sódio. (6)(7)(8)(10)',
      'Diagnosticar e tratar agressivamente o fator desencadeante subjacente (pancreatite, ITU, piometra, etc.). (1)(2)(7)(10)',
      'Transicionar com segurança para insulina de longa ação subcutânea assim que a acidose resolver e o paciente estiver alimentando-se. (3)(4)(7)(22)',
    ],
    condutaImediata: {
      titulo: '🚨 Conduta Imediata no Atendimento Emergencial (Primeira Hora)',
      passos: [
        '1) Avaliação ABC, oxigenoterapia de suporte se necessário e estabilização de choque hemodinâmico.',
        '2) Obtenção de acesso venoso calibroso e coleta de sangue para: Glicemia, BHB POC, Gasometria venosa, Eletrólitos (Na⁺, K⁺, Cl⁻, P, Mg²⁺), Hemograma e Bioquímica.',
        '3) Iniciar fluidoterapia de expansão volêmica imediatamente com cristaloide isotônico (não aguardar todos os resultados de bioquímica).',
        '4) Calcular Na⁺ corrigido = Na⁺ medido + 1,6 × [(Glicose − 100) / 100] para orientar a solução (NaCl 0,9% se Na⁺ <130 mEq/L; Ringer Lactato ou Plasma-Lyte se Na⁺ ≥130 mEq/L).',
        '5) Avaliar K⁺ sérico e iniciar suplementação de KCl no fluido ANTES da insulinização se K⁺ <3,5 mEq/L (máx 0,5 mEq/kg/h).',
        '6) Iniciar insulinização gradual (Regular CRI ou IM; Glargina em gatos) somente após 2 a 4 horas de fluidoterapia e após K⁺ estar seguro (≥3,0–3,5 mEq/L).',
      ],
    },
    potassioFundamental:
      '🧂 **Manejo Rigoroso do Potássio (K⁺) — Prioridade Vital:** Embora o K⁺ sérico na admissão possa estar normal ou alto devido à acidemia, o **déficit corporal total de potássio é quase universal**. A expansão volêmica e a ação da insulina provocam a rápida translocação de K⁺ para o meio intracelular. A hipocalemia aguda causa fraqueza muscular severa, paralisia respiratória e arritmias cardíacas fatais. Suplementar KCl no fluido conforme a Tabela 11 da AAHA Fluid Therapy Guidelines 2024 (taxa máxima absoluta de **0,5 mEq/kg/h**). NUNCA administrar insulina se K⁺ <3,0 mEq/L sem suplementação prévia. (6)(7)(11)',
    bicarbonatoNaoRotina:
      '⚗️ **Uso de Bicarbonato de Sódio NÃO é Rotineiro:** A acidose metabólica da CAD é corrigida pela hidratação e pela insulina (que cessa a síntese de novos corpos cetônicos). O uso de HCO₃⁻ é reservado **exclusivamente para acidemia profunda e refratária (pH <7,0 ou HCO₃⁻ <8 mEq/L)** com hipotensão grave ou arritmias após ressuscitação volêmica adequada. O uso inadvertido provoca hipocalemia paradoxal, acidose liquórica paradoxal (por difusão rápida de CO₂ para o SNC), deslocamento da curva de dissociação da hemoglobina para a esquerda (hipóxia tecidual) e hipocalcemia ionizada. (7)(8)(9)(10)',
    antibioticosNaoAutomaticos:
      '💊 **Antibioticoterapia Racional:** Antibióticos não devem ser prescritos empiricamente de forma indiscriminada. Coletar urina por cistocentese para urocultura e indicar antimicrobianos apenas quando houver evidência clínica, laboratorial ou de imagem de infecção (ITU, pielonefrite, piometra, pneumonia, sepse). (1)(2)(7)(10)',
    nutricaoPrecoceFelino:
      '🍽️ **Suporte Nutricional Precoce no Gato:** Tão logo os vômitos sejam controlados com antieméticos (maropitant, ondansetrona) e o felino esteja hidratado, iniciar suporte nutricional enteral precoce (voluntário ou por sonda esofágica/nasoesofágica) para interromper o catabolismo hepático e prevenir lipidose hepática secundária. (3)(4)(22)(23)',
    fluidoterapia: {
      principios:
        'Repor o déficit volêmico calculado em 4 a 24 horas; reavaliar perfusão e parâmetros hemodinâmicos a cada 2–4 horas. Em pacientes cardiopatas ou renais crônicos, individualizar a velocidade de infusão com cautela redobrada. (6)(7)(10)',
      formulaNaCorrigido:
        'Na⁺ corrigido = Na⁺ medido + 1,6 × [(Glicose medido − 100) / 100]. Guia a escolha do cristaloide: NaCl 0,9% se Na⁺ corrigido <130 mEq/L; fluidos balanceados (Ringer Lactato, Plasma-Lyte 148) se Na⁺ corrigido ≥130 mEq/L. (6)(7)',
    },
    protocoloEdkaSglT2Aaha2026: {
      titulo: 'Manejo de CAD Euglicêmica (eDKA) em Gatos sob Uso de iSGLT2 (AAHA 2026)',
      passos: [
        '1) Suspender o inibidor de SGLT2 (bexagliflozina ou velagliflozina) imediatamente.',
        '2) Hospitalizar o felino e iniciar expansão volêmica com cristaloide isotônico balanceado e suplementação de K⁺.',
        '3) Iniciar insulina regular (CRI ou IM) ou glargina associada à infusão contínua de Dextrose 2,5% a 5% no fluido para manter a glicemia entre 150–250 mg/dL e reverter a cetogênese.',
        '4) Monitorar BHB sanguíneo a cada 4 a 8 horas até normalização (<1,0–1,5 mmol/L).',
        '5) Não reiniciar o inibidor de SGLT2; transicionar permanentemente para insulinoterapia subcutânea de longa ação (Glargina/Detemir/ProZinc).',
      ],
    },
    protocoloFelinoRegularIM: {
      titulo: 'Protocolo de Insulina Regular IM — Gatos (AAHA 2026)',
      dose: 'Após 2–4 h de fluidoterapia e K⁺ seguro: Insulina Regular **0,1 UI/kg IM** a cada 1–2 horas até a glicemia atingir ≤250 mg/dL. Adicionar Dextrose 2,5–5% ao fluido mantendo a insulina regular a cada 2–4 h. (3)(7)(8)(10)',
      monitorizacao: 'Glicemia horária; BHB a cada 4–8 h; eletrólitos e gasometria a cada 4–6 h.',
    },
    protocoloFelinoGlargina: {
      titulo: 'Protocolo de Insulina Glargina — Gatos (AAHA 2026 / Zeugswetter 2021)',
      protocolo:
        '1) Dose de ataque inicial: **1 U/gato IV**; 2) Monitoração glicêmica horária; 3) Manutenção: **0,5–1 U/gato IM** a cada 2–3 horas conforme glicemia; 4) Transição: **1–2 U/gato SC q12h** ao atingir estabilidade clínica e BHB <1,5 mmol/L. Adicionar Dextrose 2,5–5% ao fluido quando glicemia ≤250 mg/dL.',
      evidencia:
        'Ensaios clínicos randomizados demonstraram excelente taxa de sobrevida e rápida estabilização metabólica com o protocolo de glargina em gatos com DKA (Zeugswetter et al., 2021). (22)',
      nota:
        'Alternativa respaldada pela diretriz AAHA 2026 Figure 12.1.',
    },
    protocoloCaninoRegularIM: {
      titulo: 'Protocolo de Insulina Regular IM Fracionada — Cães',
      dose: 'Insulina Regular 0,1–0,2 UI/kg IM a cada 1 a 2 horas. Alvo de redução glicêmica: ~50 mg/dL/h. Adicionar Dextrose 2,5–5% ao fluido assim que a glicemia for ≤250 mg/dL. (1)(7)(8)(10)',
    },
    protocoloCaninoCRI: {
      titulo: 'Protocolo de Infusão Contínua (CRI) de Insulina Regular — Cães',
      preparo:
        'Adicionar 2,2 UI/kg de insulina regular em 250 mL de NaCl 0,9%. Desprezar os primeiros 50 mL da solução na extensão plástica para saturar os sítios de adsorção. Infundir em via venosa dedicada.',
      vri: {
        titulo: 'Taxa Variável de Infusão (VRI) Conforme Glicemia',
        tabela: {
          kind: 'clinicalTable' as const,
          caption: 'Ajuste da Taxa de Insulina Regular em CRI e Suporte de Dextrose Conforme Glicemia',
          headers: ['Glicemia Sérica (mg/dL)', 'Solução de Fluido de Manutenção', 'Taxa de Infusão da Solução de Insulina (mL/h)'],
          rows: [
            ['> 250', 'Cristaloide isotônico (sem dextrose)', '10 mL/h (cão de porte médio)'],
            ['200 – 250', 'Cristaloide + Dextrose 2,5%', '7 mL/h'],
            ['150 – 200', 'Cristaloide + Dextrose 2,5%', '5 mL/h'],
            ['100 – 150', 'Cristaloide + Dextrose 5,0%', '5 mL/h'],
            ['< 100', 'Cristaloide + Dextrose 5,0%', '0 mL/h (suspender temporariamente a insulina)'],
          ],
        },
      },
      fri: {
        titulo: 'Taxa Fixa de Infusão (FRI)',
        dose: 'Insulina regular contínua a 0,01 UI/kg/h associada à titulação de dextrose no fluido conforme a glicemia. (12)',
      },
    },
    protocoloCaninoLisproAlternativa: {
      titulo: 'Insulina Lispro IM — Protocolo Alternativo Canino (Malerba 2020)',
      status: 'EVIDÊNCIA PRELIMINAR / ALTERNATIVA — Segunda linha caso insulina regular não esteja disponível.',
      tabelaLisproMalerba: {
        kind: 'clinicalTable' as const,
        caption: 'Protocolo Alternativo: Lispro IM em Cães com CAD (Malerba et al., Front Vet Sci 2020)',
        headers: ['Fase do Tratamento', 'Conduta Terapêutica com Lispro IM', 'Monitoração Glicêmica e Cetonemia'],
        rows: [
          ['Fase Inicial', 'Lispro 0,25 U/kg via IM', 'Glicemia a cada 1 hora'],
          ['Fase de Manutenção (Glicemia ≤250 mg/dL)', 'Lispro 0,125 U/kg via IM q3h + Dextrose 2,5–5% no fluido', 'Glicemia a cada 1–2 horas; dosar BHB a cada 4–6 horas'],
        ],
      },
      nota: 'Estudo clínico controlado demonstrou tempo de resolução da cetose comparável entre Lispro IM e Insulina Regular CRI em cães.',
    },
    monitorizacao: {
      frequencia:
        'Glicemia a cada 1–2 h; BHB sanguíneo (POC) a cada 4–8 h; eletrólitos e gasometria venosa a cada 4–8 h; avaliação hemodinâmica a cada 2–4 h.',
      criteriosResolucao: [
        'BHB sanguíneo <1,0–1,5 mmol/L (cetonemia normalizada). (3)(4)(12)(22)',
        'pH >7,35 e bicarbonato >18 mEq/L (acidose metabólica resolvida). (5)(7)(10)',
        'Paciente hidratado, clinicamente alerta e alimentando-se voluntariamente sem episódios eméticos. (7)(23)',
        'Fator precipitante identificado e sob controle terapêutico. (1)(2)(7)',
      ],
    },
    errosQueMatam: [
      'Queda glicêmica excessivamente rápida (>80–100 mg/dL/h) — risco crítico de edema cerebral osmótico fatal. (7)(10)',
      'Iniciar insulina com K⁺ <3,0 mEq/L sem suplementação prévia de KCl — induz hipocalemia aguda, paralisia e arritmias fatais. (6)(7)(11)',
      'Suspender a insulina quando a glicemia cai abaixo de 250 mg/dL mas o BHB continua elevado — a cetose exige insulina contínua com adição de Dextrose ao fluido. (7)(10)(12)',
      'Confiar na fita de cetonúria (nitroprussiato) como guia de evolução — a fita não mede BHB e pode parecer "mais positiva" durante a melhora metabólica. (8)(9)(17)(18)(19)',
      'Administração rotineira de Bicarbonato de Sódio em acidose leve a moderada (pH >7,0) — risco de acidose paradoxal do SNC e hipocalemia. (7)(8)(9)(10)',
      'Ignorar a busca e o tratamento do fator desencadeante primário (pancreatite, ITU, piometra, sepse). (1)(2)(7)(10)',
    ],
    evidenciaPublicada: {
      alive2026:
        'Niessen S. J. M. et al. (ALIVE 2026 / PMC12846567): Consenso internacional de endocrinologia veterinária. Define formalmente Diabetic Ketosis (DK — DM + cetonemia/cetonúria sem acidose metabólica; paciente estável), Diabetic Ketoacidosis (DKA — DM + cetonemia/cetonúria + acidose metabólica; paciente doente), Euglycemic Diabetic Ketosis e Euglycemic Diabetic Ketoacidosis (eDKA). Estabelece que BHB elevado não diagnóstica DKA isoladamente sem demonstração de acidose metabólica. (5)',
      diTommaso2009:
        'Di Tommaso M. et al. (JVIM 2009 / PubMed 19645834): Estudo prospectivo com 72 cães diabéticos avaliando medidor portátil de BHB no sangue total. Cutoff ≥2,3 mmol/L apresentou 100% de sensibilidade para DKA; ≥3,5 mmol/L apresentou LR+ de 13,16; ≥4,3 mmol/L apresentou 100% de especificidade. A área sob a curva ROC foi 0,97 para cetonemia sanguínea contra 0,81 para cetonúria. (17)',
      duarte2002:
        'Duarte R. et al. (JVIM 2002 / PubMed 12141302): Estudo prospectivo com 116 cães diabéticos. O ponto de corte de BHB ≥3,8 mmol/L apresentou sensibilidade de 72%, especificidade de 95% e LR+ de 14,8 para diagnóstico de DKA, demonstrando sobreposição entre DK e DKA que reforça a necessidade de gasometria. (18)',
      resciani2014:
        'Bresciani F. et al. (JVS 2014 / PMC4087234): Avaliação de BHB em sangue capilar com sensor eletroquímico em cães. Cutoff >3,8 mmol/L apresentou sensibilidade de 70% e especificidade de 92%. A dosagem capilar de BHB acompanhou fielmente a recuperação do estado ácido-base durante o tratamento, superando o acetoacetato urinário. (19)',
      weingart2012:
        'Weingart C. et al. (JFMS 2012 / PubMed 22362525): Estudo em 62 gatos. BHB em gatos saudáveis 0–0,1 mmol/L; DM não cetótico 0–0,9 mmol/L (mediana 0,1); DK 0,6–6,8 mmol/L (mediana 1,7); DKA 3,8–12,2 mmol/L (mediana 7,9). O cutoff de 2,4 mmol/L apresentou sensibilidade de 100% e especificidade de 87% para triagem de DKA felina. (20)',
      zeugswetter2012:
        'Zeugswetter F. K. & Rebuzzi L. (JSAP 2012 / PubMed 22533366): Avaliação de medidor point-of-care Precision Xtra em gatos diabéticos. Cutoff >2,55 mmol/L apresentou sensibilidade de 94% e especificidade de 68% para cetoacidemia. Evidenciou excelente correlação laboratorial (r = 0,97), com viés negativo em concentrações elevadas. (21)',
      aaha2026Cats:
        'AAHA 2026 Diabetes Management Guidelines for Cats: Referência de excelência para DM felino abordando diagnóstico, insulinoterapia, inibidores de SGLT2, monitorização de BHB, DKA, eDKA e monitorização contínua de glicose. Define o esquema de monitoramento de BHB nos dias 2–3, 7 e 14 de SGLT2. (3)',
      icatcare2025:
        'iCatCare 2025 Consensus Guidelines on Diabetes Mellitus in Cats (JFMS 2025 / PMC12612538): Consenso internacional sobre critérios diagnósticos de DKA (Glicose >250 mg/dL, BHB >2,4 mmol/L, pH <7,35, HCO₃⁻ <15 mmol/L), eDKA (<250 mg/dL sob SGLT2/insulina), remissão e monitorização domiciliar. (4)',
      gant2024:
        'Gant P. et al. (JVECC 2024): Comparação de protocolos de infusão de insulina em cães e gatos com CAD. (12)',
      malerba2020:
        'Malerba E. et al. (Front Vet Sci 2020): Protocolo de Lispro IM em cães com CAD. (13)',
      zeugswetter2021:
        'Zeugswetter F. K. et al. (JVECC 2021): Uso de Glargina em gatos com CAD demonstrando eficácia e segurança comparáveis à insulina regular. (22)',
      reed2026:
        'Reed N. (JFMS 2026): Abordagem racional às emergências médicas felinas e manejo de CAD. (23)',
    },
    livrosAcervo: {
      feldmanEndocrinology4th:
        'Canine and Feline Endocrinology (Feldman, Nelson, Reusch & Scott-Moncrieff, 4ª ed., Cap. 8 — Diabetic Ketoacidosis, pp. 320–322): Fisiopatologia, diferenciação DK vs DKA, BHB, limitações diagnósticas da cetonúria e medidores portáteis.',
      basicMonitoringEmergency:
        'Basic Monitoring in Canine and Feline Emergency Patients (Cap. 1 — Physical Examination and Point-of-care Testing, pp. 7 e 16–17): Funcionamento dos medidores de BHB, limite fisiológico normal de <0,32 mmol/L em cães e ~0,11 mmol/L em gatos; elevações de até 2,78 mmol/L em lipidose hepática felina.',
      augustsFelineInternalMed7:
        'August\'s Consultations in Feline Internal Medicine (Vol. 7, Cap. 85 — Feline Diabetic Ketoacidosis, p. 837): Predomínio de BHB, relação BHB:acetoacetato de ~3:1 em felinos, limitações da fita de nitroprussiato e abordagem clínica da DKA.',
    },
    prognostico: {
      geral:
        'Com diagnóstico precoce estruturado por dosagem de BHB e manejo intensivo de fluidos e eletrólitos, a taxa de sobrevivência ultrapassa 80–85%. O prognóstico torna-se reservado a desfavorável na presença de choque refratário, acidemia profunda não responsiva (pH <7,0), insuficiência renal oligúrica ou pancreatite necrotizante grave. (7)(12)(23)',
      caes: 'Alta taxa de resolução da crise aguda; requer insulinoterapia subcutânea de manutenção vitalícia e controle de comorbidades. (1)(7)(12)',
      gatos: 'Excelente taxa de recuperação; felinos que superam a DKA possuem potencial de alcançar remissão diabética quando mantidos com dieta apropriada de baixo carboidrato e monitorização rigorosa. (3)(4)(22)(23)',
    },
    orientacaoTutor: [
      'A cetoacidose diabética é uma emergência crítica que exige hospitalização intensiva contínua em UTI veterinária; não pode ser tratada em ambiente domiciliar. (1)(2)(7)',
      'Após a alta hospitalar, a administração pontual da insulina, a dieta prescrita e a nunca omissão de doses são vitais para impedir recidivas da crise. (3)(4)(5)',
      'Tutores de gatos tratados com comprimidos para diabetes (inibidores de SGLT2) devem manter vigilância rigorosa do apetite e procurar o hospital imediatamente se houver prostração ou vômitos, mesmo com glicemia aparentemente controlada. (3)(4)',
      'Qualquer episódio de anorexia, vômitos ou apatia em um animal diabético deve ser considerado suspeita de descompensação cetótica até prova em contrário. (1)(2)(7)(10)',
    ],
  },

  prevention: {
    vigilanciaDm:
      'Monitoração periódica do paciente diabético com curvas glicêmicas ou sensores contínuos de glicose (CGM). Dosagem domiciliar ou ambulatorial de BHB portátil se houver alteração de apetite ou prostração. (3)(4)(5)',
    controleGlicemico:
      'Manter rotina estrita de aplicação de insulina, horários fixos de refeições com dietas balanceadas e nunca suspender doses sem orientação médica expressa. (1)(2)(7)',
    comorbidades:
      'Diagnóstico e manejo proativo de infecções urinárias subclínicas, doença periodontal, pancreatite e endocrinopatias secundárias (HAC, hipertireoidismo). Castração precoce recomendada de fêmeas para evitar resistência insulínica induzida por diestro. (1)(2)(7)(10)',
    caes:
      'Evitar a prescrição de glicocorticoides e progestágenos que induzem resistência insulínica severa e risco de descompensação cetótica. (1)(7)',
    gatos:
      'Manter nutrição enteral consistente para prevenir lipidose hepática; contraindicar formalmente o uso de inibidores de SGLT2 em felinos com histórico pregresso de cetose, pancreatite ou anorexia. (3)(4)(23)',
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
        'Bugbee A. et al. 2026 AAHA Diabetes Management Guidelines for Cats. J Am Anim Hosp Assoc. 2026; Sections 6 & 12 (SGLT2, BHB monitoring and Diabetic Ketoacidosis in Cats).',
      sourceType: 'Diretriz',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-12-diabetic-ketoacidosis-in-cats/',
      evidenceLevel: 'Alta',
      notes: 'Manejo de CAD felina, eDKA, monitorização de BHB sob SGLT2 e protocolo de glargina.',
    },
    {
      id: 'ref-icatcare-diabetes-2025',
      citationText:
        'Taylor S. et al. iCatCare 2025 consensus guidelines on the diagnosis and management of diabetes mellitus in cats. J Feline Med Surg. 2025;27:1–37.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1177/1098612X251399103',
      evidenceLevel: 'Alta',
      notes: 'Critérios diagnósticos de CAD felina, eDKA, cutoffs de BHB >2,4 mmol/L e comorbidades.',
    },
    {
      id: 'ref-alive-cycle-3-2026',
      citationText:
        'Niessen S. J. M. et al. Agreeing Language in Veterinary Endocrinology (ALIVE): Hypothyroidism, Hyperthyroidism, (Euglycaemic) Diabetic Ketosis/Ketoacidosis, and Diabetic Remission. Vet Sci. 2026;13:35.',
      sourceType: 'Consenso terminológico',
      url: 'https://doi.org/10.3390/vetsci13010035',
      evidenceLevel: 'Alta',
      notes: 'Definições formais internacionais de Diabetic Ketosis (DK), Diabetic Ketoacidosis (DKA), eDKA e remissão.',
    },
    {
      id: 'ref-aaha-fluid-2024',
      citationText:
        'Davis H. et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2024.',
      sourceType: 'Diretriz',
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/',
      evidenceLevel: 'Alta',
      notes: 'Tabela 11 — Suplementação de K⁺ em fluido conforme potássio sérico.',
    },
    {
      id: 'ref-feldman-endocrinology-4th-ch8',
      citationText:
        'Feldman EC, Nelson RW, Reusch CE, Scott-Moncrieff JCR. Diabetic Ketoacidosis. In: Canine and Feline Endocrinology. 4th ed. Saunders Elsevier, 2015. Chapter 8, pp. 320–322.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Fisiopatologia da CAD, predomínio de BHB, paradoxo do potássio e limitações de cetonúria.',
    },
    {
      id: 'ref-basic-monitoring-emergency-ch1',
      citationText:
        'Basic Monitoring in Canine and Feline Emergency Patients. Chapter 1 — Physical Examination and Point-of-care Testing, pp. 7 e 16–17. Wiley-Blackwell.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Valores normais de BHB (<0,32 mmol/L em cães; ~0,11 mmol/L em gatos) e elevação em lipidose.',
    },
    {
      id: 'ref-augusts-feline-internal-med-vol7-ch85',
      citationText:
        "August's Consultations in Feline Internal Medicine, Volume 7. Chapter 85 — Feline Diabetic Ketoacidosis, p. 837. Elsevier.",
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Predomínio de BHB (relação ~3:1 BHB:acetoacetato), limitações do nitroprussiato e manejo de CAD.',
    },
    {
      id: 'ref-nelson-couto-ch49',
      citationText:
        'Nelson RW, Couto CG. Diabetes Mellitus. In: Small Animal Internal Medicine. 6th ed. Elsevier, 2020. Chapter 49.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Fisiopatologia e manejo intensivo da CAD em pequenos animais.',
    },
    {
      id: 'ref-bsava-ecc-ch16',
      citationText:
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA, 2018. Chapter 16.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Emergências endócrinas e manejo intensivo de CAD.',
    },
    {
      id: 'ref-dibartola-fluid',
      citationText:
        'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. Elsevier, 2012.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Distúrbios eletrolíticos e ácido-base na CAD.',
    },
    {
      id: 'ref-emergency-medicine-ch113',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell, 2019. Chapter 113 — Complicated Diabetes Mellitus.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Manejo emergencial de CAD e EHH.',
    },
    {
      id: 'ref-plumbs-10-insulin-electrolytes',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley/VetMedux, 2023.",
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Doses e protocolos de insulinas e eletrólitos.',
    },
    {
      id: 'ref-gant-2024',
      citationText:
        'Gant P, Barfield D, Florey J. Comparison of insulin infusion protocols for management of canine and feline diabetic ketoacidosis. J Vet Emerg Crit Care. 2024;34(1):23–30.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/vec.13354',
      evidenceLevel: 'Moderada',
      notes: 'Protocolos de infusão contínua de insulina em pequenos animais.',
    },
    {
      id: 'ref-malerba-2020',
      citationText:
        'Malerba E, Alessandrini F, Grossi G, Giunti M, Fracassi F. Efficacy and Safety of Intramuscular Insulin Lispro vs. Continuous Intravenous Regular Insulin for the Treatment of Dogs With Diabetic Ketoacidosis. Front Vet Sci. 2020;7:559008.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.3389/fvets.2020.559008',
      evidenceLevel: 'Moderada',
      notes: 'Estudo de Lispro IM em cães com CAD.',
    },
    {
      id: 'ref-di-tommaso-2009',
      citationText:
        'Di Tommaso M, Aste G, Rocconi F, et al. Evaluation of a portable meter to measure ketonemia and comparison with ketonuria for the diagnosis of canine diabetic ketoacidosis. J Vet Intern Med. 2009;23(3):466–471.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19645834/',
      evidenceLevel: 'Moderada',
      notes: 'Medidor de BHB portátil no diagnóstico de CAD canina (cutoffs 2,3, 3,5 e 4,3 mmol/L).',
    },
    {
      id: 'ref-duarte-2002',
      citationText:
        'Duarte R, Simões DMN, Franchini ML, et al. Accuracy of serum β-hydroxybutyrate measurements for the diagnosis of diabetic ketoacidosis in 116 dogs. J Vet Intern Med. 2002;16(4):411–416.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12141302/',
      evidenceLevel: 'Moderada',
      notes: 'Mensuração de BHB em cães diabéticos (cutoff 3,8 mmol/L, sensibilidade 72%, especificidade 95%).',
    },
    {
      id: 'ref-bresciani-2014',
      citationText:
        'Bresciani F. et al. Capillary blood β-hydroxybutyrate determination in canine diabetic ketoacidosis. J Vet Sci. 2014;15(2):309–315.',
      sourceType: 'Estudo clínico',
      url: 'https://vetsci.org/DOIx.php?id=10.4142%2Fjvs.2014.15.2.309',
      evidenceLevel: 'Moderada',
      notes: 'BHB capilar no cão (cutoff 3,8 mmol/L) e acompanhamento do estado ácido-base.',
    },
    {
      id: 'ref-weingart-2012',
      citationText:
        'Weingart C, Lotz F, Kohn B. Measurement of β-hydroxybutyrate in cats with diabetes mellitus with a point-of-care meter. J Feline Med Surg. 2012;14(4):226–233.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/22362525/',
      evidenceLevel: 'Moderada',
      notes: 'Validação de BHB portátil em gatos (normal 0–0,1; cutoff DKA 2,4 mmol/L, sensibilidade 100%, especificidade 87%).',
    },
    {
      id: 'ref-zeugswetter-2012',
      citationText:
        'Zeugswetter FK, Rebuzzi L. Point-of-care β-hydroxybutyrate meter in feline diabetes mellitus: accuracy and limitations. J Small Anim Pract. 2012;53(6):328–333.',
      sourceType: 'Estudo clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/22533366/',
      evidenceLevel: 'Moderada',
      notes: 'Acurácia de medidor portátil em gatos e subestimação em concentrações elevadas.',
    },
    {
      id: 'ref-zeugswetter-2021',
      citationText:
        'Zeugswetter FK, Luckschander-Zeller N, Karlovits S, Rand JS. Glargine versus regular insulin protocol in feline diabetic ketoacidosis. J Vet Emerg Crit Care. 2021;31(4):459–468.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1111/vec.13062',
      evidenceLevel: 'Moderada',
      notes: 'Protocolo de Glargina felino.',
    },
    {
      id: 'ref-reed-2026',
      citationText:
        'Reed N. Rational approach to feline medical emergencies: part 2. J Feline Med Surg. 2026;28(4).',
      sourceType: 'Revisão clínica',
      url: 'https://doi.org/10.1177/1098612X251411055',
      evidenceLevel: 'Moderada',
      notes: 'Emergências felinas e manejo de CAD.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
