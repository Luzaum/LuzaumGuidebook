import type { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/insulinoma-caes-gatos';

/**
 * Insulinoma em cães e gatos — síntese editorial ConsultaVET.
 * Regra central: hipoglicemia + insulina inadequadamente normal/elevada → tumor secretor de insulina.
 * Prioridade: Kraai 2026/2025 > Nelson & Couto > Buishand/Coss/Camosci (imagem) > cirurgia/oncologia.
 */
export const insulinomaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-insulinoma-caes-gatos',
  slug: 'insulinoma-caes-gatos',
  title: 'Insulinoma em cães e gatos',
  subtitle:
    'Tumor neuroendócrino pancreático secretor de insulina — hipoglicemia, neuroglicopenia, estadiamento TNM e manejo cirúrgico, médico e oncológico',
  synonyms: [
    'Insulinoma',
    'Tumor de células beta',
    'Neoplasia de ilhotas pancreáticas',
    'Tumor secretor de insulina',
    'Neoplasia neuroendócrina pancreática',
    'Islet cell tumor',
    'Beta-cell tumor',
    'PanNEN funcional',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  categories: ['oncologia', 'neurologia', 'emergencia-intensivismo'],
  tags: [
    'Hipoglicemia',
    'Insulina',
    'Neuroglicopenia',
    'Pâncreas',
    'TNM',
    'Parcial pancreatectomia',
    'Diazóxido',
    'Octreotida',
    'Glucagon',
    'Estreptozotocina',
    'Toceranibe',
    'TC contrastada',
    'Crise hipoglicêmica',
    'Prednisolona',
  ],
  vinReferencePending: true,
  quickSummary:
    'Insulinoma é neoplasia maligna funcional das células beta pancreáticas que secreta insulina de forma autônoma, causando **hipoglicemia crônica ou episódica** com neuroglicopenia (convulsões, ataxia, colapso, alteração de consciência) e sinais adrenérgicos (tremores, taquicardia, sudorese). A pergunta diagnóstica não é “glicemia baixa?”, e sim: **hipoglicemia + insulina inadequadamente normal ou elevada** na mesma amostra — razões insulina:glicose têm baixa utilidade clínica. Em cães é o tumor endócrino pancreático mais comum (mediana ~10 anos); em gatos é **raro** (mediana ~13 anos), com evidência cirúrgica limitada. Estadiamento TNM (I = pâncreas; II = linfonodos regionais; III = metástase à distância) guia prognóstico — **TC contrastada multiphase** supera ultrassom para localização e estadiamento; US tem sensibilidade ~36–56% e não substitui TC para metástases linfonodais. **Cirurgia (partial pancreatectomia)** oferece melhor sobrevida que manejo exclusivamente médico; crise aguda: dextrose titulada (evitar bolus grandes), glucagon CRI se refratário, dieta fracionada rica em proteína. Adjuvantes: prednisolona, diazóxido ± hidroclorotiazida, octreotida; estreptozotocina e toceranibe reservados a centros especializados/oncologia. (1)(2)(8)(9)(10)(12)(15)(20)',
  quickDecisionStrip: [
    'Hipoglicemia + insulina normal/elevada na mesma amostra → insulinoma altamente provável — não usar só razão insulina:glicose. (2)(11)(14)',
    'Glicemia normal no consultório **não exclui** — sinais episódicos; considerar jejum supervisionado ou amostra durante crise. (1)(9)(11)',
    'Primeira medida na crise neurológica: estabilizar glicemia **antes** de exames demorados — mas coletar insulina se possível durante hipoglicemia. (5)(7)(22)',
    'Evitar bolus grandes de dextrose 50% em suspeita de insulinoma — pode estimular mais secreção e rebound; preferir 0,5 g/kg diluído ou CRI 2,5–5% com monitorização. (5)(7)(22)',
    'Glucagon refratário: bolus 50 ng/kg por via intravenosa, depois infusão contínua 5–40 ng/kg/min titulada — glicemia seriada. (4)(5)(7)(22)',
    'Jejum prolongado antes de cirurgia é perigoso — alimento úmido até 6 h; dextrose IV intraoperatória; manipulação tumoral pode causar hipoglicemia rebote. (4)(13)(25)',
    'TC contrastada multiphase/dual-phase é modalidade preferencial de estadiamento — US sozinho perde metástases linfonodais. (8)(18)(19)(24)(25)',
    'Insulina sérica “normal” com glicemia <60 mg/dL (<3,3 mmol/L) é **fisiologicamente anormal** — deveria estar suprimida. (2)(11)(14)',
    'Não usar concentração absoluta de insulina como marcador de metástase ou prognóstico — Petrelli et al. (2023) não encontraram utilidade clínica para estadiamento. (14)',
    'Estágio I–II cirúrgico: sobrevida mediana substancialmente maior que estágio III ou manejo exclusivamente médico. (9)(11)(12)(15)',
    'Pós-operatório: hipoglicemia persistente = células residuais/metástase (prognóstico reservado); hiperglicemia pode ser transitória ou diabetes permanente (~19%). (13)(12)',
    'Pancreatite pós-ressecção até ~10% — monitorar vômito, dor, lipase; complicação relevante em gatos. (13)(16)',
    'Prednisona/prednisolona 0,25 mg/kg por via oral a cada 12 horas = dose inicial preferencial quando cirurgia não é opção; faixa de emergência 0,25–0,5 mg/kg q12h. (1)(2)(5)(6)',
    'Diazóxido 5 mg/kg PO q12h titulando até 30 mg/kg — salivar, vômito, retenção hídrica; combinar com HCTZ se refratário. (7)(23)',
    'Estreptozotocina 500 mg/m² IV q3 sem com diurese salina agressiva — **somente** cão, recorrente/metastático, histologia confirmada, centro oncologia. (7)(20)(21)',
    'Toceranibe 2,4–2,75 mg/kg PO q48h — terapia alvo em metastático/recorrente; evidência retrospectiva promissora, não substitui cirurgia quando ressecável. (7)(15)(18)',
    'Felino: evidência limitada — cirurgia é principal opção curativa descrita; não extrapolar protocolos caninos sem ressalva. (16)(17)(23)',
    'Diferenciais obrigatórios: hipoadrenocorticismo, sepse, hepatopatia, shunt, neoplasia extrapancreática paraneoplásica, overdose insulina, xilitol (cães). (2)(5)(6)',
  ],
  quickSummaryRich: {
    lead:
      'Insulinoma transforma o pâncreas endócrino em fonte autônoma de insulina: a glicemia cai, o cérebro perde substrato energético e o paciente colapsa, convulsiona ou “anda bêbado” — muitas vezes de forma episódica e confundida com epilepsia idiopática ou cardiopatia. O diagnóstico exige demonstrar hipoglicemia real com insulina inadequadamente não suprimida; a TC contrastada define estadiamento TNM e planeja cirurgia. A crise hipoglicêmica mata antes do estadiamento completo — estabilizar primeiro, investigar depois. (1)(2)(9)(11)(19)(25)',
    leadHighlights: ['insulina inapropriada', 'neuroglicopenia', 'TNM', 'TC multiphase', 'crise primeiro'],
    pillars: [
      {
        title: 'Fisiopatologia — excesso de insulina',
        body:
          'Células beta neoplásicas secretam insulina independentemente da glicemia → transporte acelerado de glicose para tecidos → hipoglicemia sérica → neuroglicopenia (SNC) e resposta adrenérgica compensatória. Tumores são considerados malignos em cães/gatos pela alta taxa de metástase, mesmo quando primário é pequeno. (2)(3)(23)',
        highlights: ['secreção autônoma', 'neuroglicopenia', 'metástase frequente'],
      },
      {
        title: 'Diagnóstico relacional glicose × insulina',
        body:
          'Padrão: glicemia baixa (<60 mg/dL ou <3,3 mmol/L) + insulina dentro ou acima do intervalo de referência. Insulina “normal” na hipoglicemia é inapropriada. Frutosamina baixa corrobora hipoglicemia crônica. Amostra durante crise ou após jejum supervisionado. (2)(11)(14)(23)',
        highlights: ['amostra pareada', 'insulina não suprimida', 'frutosamina'],
      },
      {
        title: 'Estadiamento e imagem',
        body:
          'TNM: I confinado ao pâncreas; II linfonodos regionais; III fígado/distância. US detecta ~36–56% primários e falha em metástases linfonodais; TC dual-phase/perfusão 4D tem sensibilidade superior (até ~94% em centros especializados). Exploração cirúrgica palpa pâncreas completo. (8)(18)(19)(24)(25)',
        highlights: ['TNM', 'TC > US', 'exploração completa'],
      },
      {
        title: 'Tratamento escalonado',
        body:
          'Crise: dextrose + glucagon CRI se necessário. Definitivo: partial pancreatectomia ou enucleação conforme localização. Crônico: dieta fracionada, prednisolona, diazóxido, octreotida. Metastático/recorrente: toceranibe; estreptozotocina em protocolo especializado. (2)(7)(12)(15)(20)(22)(23)',
        highlights: ['cirurgia', 'prednisolona', 'toceranibe', 'estreptozotocina'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico — da crise ao estadiamento',
      steps: [
        {
          label: 'Reconhecer emergência neuroglicopenica',
          timing: 'Primeiros minutos',
          detail:
            'Convulsão, colapso, ataxia, cegueira, alteração de consciência → tratar hipoglicemia imediatamente; coletar glicemia + insulina **antes** ou durante correção se viável. (5)(7)(11)',
        },
        {
          label: 'Confirmar hipoglicemia real',
          timing: 'Laboratório',
          detail:
            'Glicemia venosa; repetir se limítrofe; frutosamina baixa sugere hipoglicemia crônica; descartar artefato (hemólise, atraso separação). Jejum supervisionado 8–12 h em cães suspeitos se glicemia normal entre crises. (2)(11)(23)',
        },
        {
          label: 'Insulina sérica pareada',
          timing: 'Com glicemia baixa',
          detail:
            'Insulina normal ou elevada na hipoglicemia confirma hiperinsulinismo — não confiar isoladamente em razões. Intensidade da insulina **não** substitui estadiamento por imagem. (2)(11)(14)(23)',
        },
        {
          label: 'Excluir diferenciais sistêmicos',
          timing: 'Paralelo',
          detail:
            'Hemograma, bioquímica, cortisol/ACTH se Addison, função hepática, cetonas, toxicologia (xilitol), história de insulina exógena; imagem abdominal para massa extrapancreática. (2)(5)(6)(23)',
        },
        {
          label: 'Imagem abdominal — estadiamento',
          timing: 'Antes da cirurgia eletiva',
          detail:
            'TC contrastada multiphase/dual-phase preferencial; US útil quando TC indisponível ou para PAAF guiada de lesões hepáticas/linfonodais. Radiografia torácica para metástase pulmonar (rara). (8)(18)(19)(24)(25)',
          reassess: 'US negativo não exclui — encaminhar TC se suspeita persistente. (19)(24)',
        },
        {
          label: 'Classificar TNM e planejar conduta',
          timing: 'Pré-operatório',
          detail:
            'Integrar imagem + achados intraoperatórios; linfonodos regionais e fígado determinam estágio II–III. Histopatologia confirma diagnóstico definitivo. (2)(12)(18)(23)',
        },
        {
          label: 'Felino — ressalva de evidência',
          timing: 'Espécie gato',
          detail:
            'Mesmo algoritmo bioquímico; base cirúrgica pequena (casos/séries limitadas); CEUS descrito; não usar figuras US felinas proprietárias CC BY-NC sem licença. (16)(17)(23)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico — crise, cirurgia e manejo crônico',
      steps: [
        {
          label: 'Crise hipoglicêmica aguda',
          detail:
            'Via oral se consciente: mel/xarope de glicose no mucosa. IV: dextrose 50% 0,5 g/kg diluída 1:3–1:4 em NaCl 0,9% lentamente; depois CRI 2,5–5% em cristaloide balanceado — **não** D5W como fluido único (hiponatremia). Se refratário: glucagon CRI. (5)(7)(22)',
          dose: 'Dextrose 50%: 0,5 g/kg IV diluída. Glucagon: 1 mg reconstituído em 1000 mL NaCl 0,9%; CRI 5–15 ng/kg/min. (7)(22)',
          duration: 'Até alimentação oral estável ou transição para manejo definitivo.',
          reassess: 'Glicemia q30–60 min na crise; evitar hiperglicemia iatrogênica rebound. (5)(7)',
        },
        {
          label: 'Estabilização pré-cirúrgica',
          detail:
            'Dieta fracionada rica em proteína/fibra; prednisolona iniciar se hipoglicemia recorrente; corrigir hipocalemia induzida por dextrose. Jejum: ração seca 12 h, úmida até 6 h; dextrose IV peroperatória. (4)(13)(23)',
          dose: 'Prednisolona 0,5–1 mg/kg PO q12–24h. (7)(23)',
        },
        {
          label: 'Cirurgia — partial pancreatectomia',
          detail:
            'Exploração completa do pâncreas, linfonodos e fígado; partial pancreatectomia (fratura por sutura ou selador bipolar) para tumores em lobo; enucleação se corpo. Sobrevida superior ao manejo médico isolado. (2)(12)(13)(23)',
          reassess: 'Glicemia intra e pós-op q30–60 min; manipulação tumoral pode causar queda abrupta. (4)(13)',
        },
        {
          label: 'Manejo médico crônico',
          detail:
            'Refeições pequenas e frequentes; prednisolona (glicogenólise/gluconeogênese); diazóxido inibe secreção insulínica; octreotida adjuvante (resposta variável); levetiracetam se convulsões residuais. (2)(7)(11)(23)',
          dose: 'Diazóxido 5 mg/kg PO q12h até 30 mg/kg. Octreotida 2–4 µg/kg SC q8–12h ou 10–40 µg/cão SC q8–12h. (7)(23)',
          duration: 'Contínuo enquanto hipoglicemia persistir; titular pela glicemia domiciliar.',
        },
        {
          label: 'Oncologia — estreptozotocina',
          detail:
            'Recorrente/metastático pós-cirurgia, histologia confirmada, cão apenas. Diurese salina agressiva obrigatória; nefrotoxicidade, vômito, diabetes iatrogênico possíveis. (7)(20)(21)',
          dose: '500 mg/m² IV em 2 h q3 sem; NaCl 0,9% 18–20 mL/kg/h CRI 7–8 h (protocolo institucional). (7)(20)(21)',
          reassess: 'Proteinúria = sinal precoce nefrotoxicidade; glicemia e química antes de cada ciclo. (20)(21)',
        },
        {
          label: 'Terapia alvo — toceranibe',
          detail:
            'Metastático/recurrente ou adjuvante em centros com experiência; suspender 3 dias antes e 2 semanas após cirurgia se uso crônico. Estudos retrospectivos: benefício clínico em subset; ensaio prospectivo em andamento. (7)(15)(18)',
          dose: '2,4–2,75 mg/kg PO q48h (doses menores reduzem toxidade vs rotulo MCT). (7)(15)',
          duration: 'Até progressão ou intolerância; PFI mediana ~561 dias em série multicêntrica. (15)',
        },
        {
          label: 'Monitorização e prognóstico',
          detail:
            'Glicemia seriada, peso, clínica neurológica; recorrência hipoglicemia comum em meses–anos. Estágio III e hipoglicemia pós-op persistente pioram prognóstico. Encaminhamento melhora sobrevida (Kraai 2026). (9)(11)(12)(13)',
        },
      ],
    },
  },

  etiology: {
    pontosChave: [
      'Insulinoma = neoplasia funcional das células beta das ilhotas de Langerhans com secreção autônoma de insulina. (2)(23)',
      'Em cães e gatos considera-se **maligno por comportamento** — metástase linfonodal/hepática frequente mesmo com primário pequeno. (2)(12)(23)',
      'Cães: tumor endócrino pancreático mais comum; idade mediana ~10 anos (faixa 3–16). (2)(9)(10)(23)',
      'Gatos: raro; idade mediana ~13 anos; série cirúrgica recente expande base (evidência ainda limitada). (16)(17)(23)',
      'Predisposição racial em cães: Boxer, WHWT, Pointer alemão, Flat-Coated Retriever, Dogue de Bordeaux, terriers (Kraai 2025). (10)',
      'MEN1/CEN documentado raramente em cães — maioria esporádica. (10)(23)',
      'Gastrinomas e glucagonomas são diferenciais de tumores de ilhotas — insulinoma é o funcional mais comum em cães. (2)(23)',
      'Não confundir com hipoglicemia paraneoplásica por neoplasia mesenquimal (IGF-2) — insulina suprimida nesses casos. (2)(5)',
    ],
    celulaBeta:
      'Células beta normais respondem à glicemia via metabolismo glucosídeo, canais KATP e influxo de Ca²⁺ — grânulos de insulina liberam insulina proporcionalmente. No insulinoma, essa cascata de acoplamento glicose-secreção está desregulada: o tumor secreta insulina independentemente da glicemia circulante. (3)(23)',
    anatomiaPancreas:
      'Tumor primário pode localizar-se em qualquer porção do pâncreas (lobo esquerdo, direito ou corpo/ângulo); em gatos, série cirúrgica descreve predomínio do lobo esquerdo — não usar como regra absoluta. (16)(17)(23)',
  },

  epidemiology: {
    caes:
      'Incidência anual ~0,003% em atendimento primário UK (VetCompass 2019) — doença reconhecida como subdiagnosticada por hipoglicemia intermitente e sinais inespecíficos. Mediana idade diagnóstico ~10,4 anos. Fêmeas castradas e peso acima da mediana racial associados a maior risco. Raças predisponentes: Boxer, WHWT, German Pointer, Flat-Coated Retriever, Dogue de Bordeaux; Labrador com odds reduzidas. (9)(10)',
    gatos:
      'Muito raro — dezenas de casos publicados vs centenas em cães. Apresentação neurológica predomina; polifagia descrita. Evidência terapêutica baseada em casos e pequenas séries cirúrgicas — selo de evidência felina limitada. (16)(17)(23)',
    sinaisMaisComunsKraai2026:
      'Em 278 cães UK atendimento primário: convulsões epiléptiformes, fraqueza, colapso/síncope e fasciculações musculares foram os sinais mais frequentes; cães encaminhados e operados tiveram sobrevida mediana maior (673 vs 275 dias). (9)',
    figuraSinaisClinicos: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/kraai-2026-clinical-signs.jpeg`,
      alt: 'Distribuição de sinais clínicos em cães com insulinoma — estudo VetCompass UK.',
      caption:
        'Sinais clínicos mais reportados em cães com insulinoma sob atendimento primário — Kraai et al., J Vet Intern Med 2026, CC BY. DOI: 10.1093/jvimsj/aalag045. (9)',
      display: 'wide',
    },
    figuraPredisposicaoRacial: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/kraai-2025-breed-prevalence.png`,
      alt: 'Predisposição racial e fatores demográficos para insulinoma canino — VetCompass UK 2019.',
      caption:
        'Incidência e fatores de risco (raça, idade, peso) para insulinoma canino — Kraai et al., Sci Rep 2025, CC BY. DOI: 10.1038/s41598-025-86782-6. (10)',
      display: 'wide',
    },
    comparativoEspecies: {
      kind: 'clinicalTable' as const,
      title: 'Cão × gato — insulinoma',
      headers: ['Aspecto', 'Cão', 'Gato'],
      rows: [
        ['Frequência', 'Mais comum tumor endócrino pancreático', 'Raro'],
        ['Idade mediana', '~10 anos', '~13 anos'],
        ['Malignidade/metástase', 'Quase invariável', 'Descrita na maioria dos casos'],
        ['Sinais dominantes', 'Convulsão, fraqueza, colapso', 'Neurológicos, polifagia possível'],
        ['Evidência cirúrgica', 'Séries grandes', 'Casos e séries pequenas'],
        ['TC estadiamento', 'Padrão em centros de referência', 'Descrita; base menor'],
        ['Toceranibe/estreptozotocina', 'Relatos caninos', 'Não estabelecido'],
      ],
    },
  },

  pathogenesisTransmission: {
    cascataHipoglicemia: [
      'Secreção autônoma de insulina pelo tumor. (2)(3)',
      '↑ Captação periférica de glicose e ↓ glicogenólise/gluconeogênese hepática efetiva. (3)(23)',
      'Glicemia sérica ↓ → neuroglicopenia (disfunção neuronal por falta de substrato). (2)(11)',
      'Ativação adrenérgica compensatória → tremores, taquicardia, sudorese, agitação. (2)(11)',
      'Episódios podem ser desencadeados por jejum, exercício ou estresse — alimentação corrige transientemente. (1)(9)(23)',
      'Metástases funcionais mantêm ou pioram hipoglicemia após ressecção parcial. (12)(14)(19)',
    ],
    transmissao:
      'Não contagioso. Sem transmissão horizontal ou vertical documentada — neoplasia esporádica, com possível predisposição racial/genética ainda em investigação. (10)(23)',
  },

  pathophysiology: {
    fisiologiaBetaNormal:
      'Célula beta: glicose entra via GLUT2 (cão) → metabolismo glicolítico ↑ ATP → fechamento canais KATP → despolarização → influxo Ca²⁺ → exocitose de insulina. Insulina promove captação de glicose em músculo/adiposo e suprime produção hepática de glicose. (3)(23)',
    cascataBetaNeoplasica: {
      titulo: 'Cascata fisiopatológica — célula beta neoplásica',
      passos: [
        'Desregulação intrínseca da maquinaria secretora — insulina liberada independentemente da glicemia plasmática. (3)(23)',
        'Hiperinsulinemia persistente ou episódica → hipoglicemia sistêmica. (2)(11)',
        'Neuroglicopenia: alteração de consciência, convulsão, cegueira, ataxia, comportamento anormal. (2)(9)(11)',
        'Resposta adrenérgica a hipoglicemia → tremores, taquicardia, sudorese, fraqueza. (2)(11)',
        'Alimentação ou dextrose exógena eleva glicemia temporariamente — ciclo clínico recorrente. (1)(23)',
        'Metástases hepáticas/linfonodais funcionais perpetuam hipoglicemia pós-cirurgia parcial. (12)(19)(20)',
      ],
    },
    fluxoDiagnosticoFisiologico: {
      titulo: 'Fluxo fisiológico — da secreção à crise',
      etapas: [
        { fase: 'Tumor', evento: 'Secreção autônoma de insulina' },
        { fase: 'Periferia', evento: '↑ captação de glicose tecidual' },
        { fase: 'Hepático', evento: '↓ produção de glicose' },
        { fase: 'SNC', evento: 'Neuroglicopenia se glicemia < limiar individual' },
        { fase: 'Compensação', evento: 'Adrenérgica + ingestão alimentar' },
        { fase: 'Crise', evento: 'Convulsão/colapso se compensação falha' },
      ],
    },
    neuroglicopeniaVsAdrenergica:
      'Neuroglicopenia predomina em hipoglicemia crônica/gradual (alteração mentação, cegueira, convulsão). Sinais adrenérgicos predominam em quedas agudas (tremores, taquicardia). Anestesia mascara neuroglicopenia — monitorar glicemia peroperatória. (2)(4)(11)(13)',
    alertaRelacaoInsulinaGlicose:
      '⚠️ **ALERTA CLÍNICO:** razões insulina:glicose ou glicose:insulina têm **baixa sensibilidade/especificidade** — usar interpretação **relacional** (insulina inapropriadamente normal/elevada na hipoglicemia). (2)(11)(14)(23)',
    alertaInsulinaNormalHipoglicemia:
      '⚠️ Com glicemia <60 mg/dL (<3,3 mmol/L), insulina dentro do intervalo de referência é **fisiologicamente inapropriada** — deveria estar suprimida. Não descartar insulinoma por “insulina normal”. (2)(11)(14)',
    tabelaRelacaoGlicoseInsulina: {
      kind: 'clinicalTable' as const,
      title: 'Interpretação — glicemia × insulina',
      headers: ['Glicemia', 'Insulina', 'Interpretação'],
      rows: [
        ['Baixa', 'Normal-alta', 'Insulinoma altamente provável'],
        ['Baixa', 'Baixa', 'Outras causas — Addison, sepse, hepatopatia, paraneoplásico'],
        ['Normal', 'Normal', 'Não exclui — testar com jejum/crise'],
        ['Baixa', 'Muito elevada', 'Insulinoma provável — intensidade não estadia metástase (14)'],
      ],
    },
  },

  clinicalSignsPathophysiology: [
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Convulsões epiléptiformes',
          mechanism: 'Neuroglicopenia severa reduz ATP neuronal e desregula excitabilidade cortical.',
          clinicalMeaning: 'Sinal mais reportado em cães UK — tratar hipoglicemia antes de anticonvulsivante de manutenção. (9)(11)',
          priority: 'emergency',
        },
        {
          finding: 'Ataxia, marcha “embriagada”, cegueira',
          mechanism: 'Hipoglicemia afeta tronco cerebral, cerebelo e córtex visual.',
          clinicalMeaning: 'Episódios post-prandiais ou com jejum; melhora rápida com glicose sugere hipoglicemia. (2)(11)(23)',
          priority: 'common',
        },
        {
          finding: 'Colapso / síncope / fraqueza',
          mechanism: 'Falta de substrato para musculatura esquelética e SNC.',
          clinicalMeaning: 'Confundido com cardiopatia — glicemia é triagem barata. (9)(11)',
          priority: 'emergency',
        },
        {
          finding: 'Alteração de consciência, desorientação',
          mechanism: 'Neuroglicopenia cortical.',
          clinicalMeaning: 'Tutor pode relatar “episódios estranhos” — investigar hipoglicemia. (2)(11)',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        {
          finding: 'Fasciculações musculares, tremores',
          mechanism: 'Resposta adrenérgica à hipoglicemia.',
          clinicalMeaning: 'Sinal frequente na coorte Kraai 2026 — pode preceder colapso. (9)(11)',
          priority: 'common',
        },
        {
          finding: 'Fraqueza de membros posteriores / intolerância ao exercício',
          mechanism: 'Hipoglicemia muscular durante esforço.',
          clinicalMeaning: 'Sinais desencadeados por atividade ou jejum. (2)(11)(23)',
          priority: 'common',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Polifagia / comportamento alimentar voraz (gatos)',
          mechanism: 'Resposta compensatória à hipoglicemia crônica.',
          clinicalMeaning: 'Descrito em casos felinos — não específico, mas reforça investigação metabólica. (16)(17)',
          priority: 'uncommon',
          context: ['Gatos'],
        },
        {
          finding: 'Náusea, vômito (pós-operatório ou pancreatite)',
          mechanism: 'Manipulação pancreática / pancreatite pós-ressecção.',
          clinicalMeaning: 'Até ~10% pancreatite pós-cirurgia canina; monitorar lipase e clínica. (13)(16)',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Ganho de peso (subset de cães)',
          mechanism: 'Efeito anabólico crônico da hiperinsulinemia.',
          clinicalMeaning: 'Paradoxo clínico — obesidade não exclui insulinoma. (2)(23)',
          priority: 'uncommon',
          context: ['Cães'],
        },
        {
          finding: 'Exame físico normal entre crises',
          mechanism: 'Hipoglicemia intermitente.',
          clinicalMeaning: 'Normalidade no consultório não exclui — orientar tutor a medir/capturar crise. (1)(9)(11)',
          priority: 'common',
        },
      ],
    },
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'Hipoglicemia laboratorial com insulina inapropriada',
          mechanism: 'Secreção autônoma tumoral.',
          clinicalMeaning: 'Achado bioquímico cardinal — estadiar antes de tratamento paliativo prolongado. (2)(14)(23)',
          priority: 'common',
        },
        {
          finding: 'Frutosamina baixa',
          mechanism: 'Hipoglicemia crônica reduz glicação sérica.',
          clinicalMeaning: 'Corrobora hipoglicemia sustentada vs episódio isolado. (2)(23)',
          priority: 'uncommon',
        },
      ],
    },
  ],

  diagnosis: {
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable' as const,
      title: 'Decisão clínica rápida — insulinoma',
      headers: ['Situação', 'Conduta', 'Armadilha'],
      rows: [
        ['Convulsão + glicemia baixa', 'Dextrose + insulina na mesma amostra', 'Rotular epilepsia sem glicemia'],
        ['Glicemia normal, crises episódicas', 'Jejum supervisionado / tutor traz amostra', 'Alta sem investigar'],
        ['Insulina “normal” + hipoglicemia', 'Insulinoma provável', 'Achar que “normal” exclui'],
        ['US sem massa', 'TC contrastada / encaminhar', 'US negativo = excluído'],
        ['Estágio I–II ressecável', 'Cirurgia preferencial', 'Só prednisolona quando operável'],
        ['Metastático hepático', 'Debulking + médico ± toceranibe', 'Prometer cura'],
        ['Crise refratária a dextrose', 'Glucagon CRI + prednisolona', 'Bolus repetidos de 50%'],
        ['Pós-op hipoglicemia persistente', 'Residual/metástase — replanejar', 'Esperar normalizar espontaneamente'],
        ['Pós-op hiperglicemia', 'Monitorar — pode ser transitório', 'Insulinoterapia imediata permanente'],
        ['Gato com massa pancreática', 'Cirurgia ± médico; evidência limitada', 'Copiar protocolo canino sem ressalva'],
      ],
    },
    diagnosticReasoning:
      'Confirmar hipoglicemia real + insulina inapropriadamente normal/elevada → estadiar com TC contrastada → excluir diferenciais (Addison, hepatopatia, sepse, paraneoplásico, insulina exógena). Histopatologia confirma. (2)(8)(11)(19)(23)',
    alertaInsulinaAbsolutaEstadiamento:
      '🧠 **EVIDÊNCIA:** Petrelli et al. (2023), em 59 cães, **não** encontraram utilidade clínica suficiente da insulina sérica para distinguir doença localizada de metastática nem para predizer sobrevida. **Não usar “insulina muito alta” como sinônimo de tumor maior, metástase ou pior prognóstico** — estadiamento exige imagem/cirurgia/histopatologia. (14)',
    seloEvidenciaFelinaLimitada:
      '🐱 **Evidência felina limitada:** algoritmo diagnóstico extrapolado de cães; séries cirúrgicas pequenas; validar condutas caso a caso e documentar desfecho. (16)(17)(23)',
    limitacaoTomografia:
      'TC requer contraste, anestesia/sedação e centro equipado — sensibilidade varia com protocolo (dual-phase vs perfusão 4D). US permanece útil para PAAF e triagem inicial, mas **não** estadia completamente. (8)(18)(19)(24)(25)',
    steps: [
      {
        stepNumber: 1,
        title: 'Glicemia + clínica compatível',
        purpose: 'Suspeita clínica.',
        description: 'Documentar hipoglicemia (<60 mg/dL ou <3,3 mmol/L) com sinais neuroglicopênicos ou adrenérgicos. (2)(11)',
        interpretation: 'Hipoglicemia real → investigar hiperinsulinismo.',
        limitations: 'Glicemia normal entre crises.',
        isGoldStandard: false,
      },
      {
        stepNumber: 2,
        title: 'Insulina sérica pareada',
        purpose: 'Confirmar hiperinsulinismo.',
        description: 'Coletar na hipoglicemia; insulina normal/elevada confirma. (2)(11)(14)',
        interpretation: 'Relacional — não usar razões isoladas.',
        limitations: 'Assay-dependent; hemólise.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Frutosamina / investigação diferencial',
        purpose: 'Contexto e exclusões.',
        description: 'Frutosamina baixa; cortisol, bioquímica hepática, ACTH stim se Addison; toxicologia. (2)(5)(6)',
        interpretation: 'Insulina suprimida → buscar outras causas.',
        limitations: '—',
      },
      {
        stepNumber: 4,
        title: 'TC contrastada multiphase',
        purpose: 'Localização + TNM.',
        description: 'Dual-phase ou perfusão 4D — fase arterial crucial; sensibilidade superior ao US. (8)(18)(25)',
        interpretation: 'Massa pancreática + metástases.',
        limitations: 'Disponibilidade; tumores muito pequenos.',
        isGoldStandard: true,
      },
      {
        stepNumber: 5,
        title: 'Ultrassom abdominal',
        purpose: 'Triagem / PAAF.',
        description: 'Detecta subset de primários; guiar PAAF hepática/linfonodal; sensibilidade ~36–56%. (19)(24)',
        interpretation: 'Massa hipoecóica pancreática.',
        limitations: 'Metástases linfonodais frequentemente não vistas.',
      },
      {
        stepNumber: 6,
        title: 'Exploração cirúrgica + histopatologia',
        purpose: 'Diagnóstico definitivo.',
        description: 'Palpação completa do pâncreas, linfonodos, fígado; partial pancreatectomia ou enucleação. (2)(12)(23)',
        interpretation: 'Carcinoma de ilhotas / insulinoma.',
        limitations: 'Lesões microscópicas múltiplas.',
        isGoldStandard: true,
      },
    ],
    diferenciaisHipoglicemia: [
      'Insulinoma (insulina inapropriada). (2)(23)',
      'Hipoadrenocorticismo (cortisol baixo). (2)(5)(6)',
      'Hepatopatia grave / shunt portossistêmico. (2)(5)',
      'Sepse / inanition / filhotes. (5)(6)',
      'Neoplasia extrapancreática paraneoplásica (IGF-2 — insulina baixa). (2)(5)',
      'Overdose insulina exógena / xilitol (cães). (5)(7)',
      'Hipoglicemia idiopática toy breeds (diagnóstico de exclusão). (2)(15)',
    ],
    imaging: {
      ultrassom:
        'Disponível amplamente; massa pancreática hipoecóica bem definida em subset; sensibilidade limitada; útil para PAAF de metástases. Não incluir figuras US felinas CC BY-NC sem licença apropriada. (19)(24)',
      tomografia:
        'Modalidade preferencial — dual-phase CT angiography, TC trifásica ou perfusão 4D (Camosci 2025: TPR/CNR superiores na fase arterial tardia ~34–44 s). Estadiamento linfonodal e hepático. (8)(18)(25)',
      citologia:
        'PAFF guiada por US/TC de metástases hepáticas ou linfonodais pode corroborar antes da cirurgia — histopatologia do primário ressecado é padrão. (2)(16)',
    },
    tabelaEstadiamentoTNM: {
      kind: 'clinicalTable' as const,
      title: 'Estadiamento TNM — insulinoma (adaptado WHO)',
      headers: ['Estágio', 'Definição', 'Implicação clínica'],
      rows: [
        ['I', 'Tumor confinado ao pâncreas', 'Melhor prognóstico cirúrgico; mediana ST prolongada'],
        ['II', 'Metástase linfonodal regional', 'Cirurgia + debulking; considerar adjuvante'],
        ['III', 'Metástase hepática/distante', 'Prognóstico reservado; manejo paliativo/oncológico'],
        ['Recorrente', 'Hipoglicemia após remissão', 'Toceranibe, estreptozotocina, médico intensificado'],
      ],
    },
    jornadaDiagnostica: [
      { etapa: 'Triagem', acao: 'Glicemia em todo paciente com convulsão/ataxia/colapso geriátrico.', nota: '(11)(23)' },
      { etapa: 'Confirmar', acao: 'Insulina na hipoglicemia + frutosamina.', nota: '(2)(14)' },
      { etapa: 'Excluir', acao: 'Addison, fígado, sepse, toxinas.', nota: '(5)(6)' },
      { etapa: 'Estadiar', acao: 'TC contrastada > US.', nota: '(8)(19)(25)' },
      { etapa: 'Intervir', acao: 'Cirurgia vs paliativo conforme TNM e comorbidades.', nota: '(12)(15)' },
    ],
  },

  treatment: {
    objetivos: [
      'Corrigir e prevenir hipoglicemia — prioridade sobre estadiamento completo na crise.',
      'Ressecar tumor primário e debulking de metástases quando possível.',
      'Controlar hipoglicemia residual com dieta + prednisolona ± diazóxido ± octreotida.',
      'Oncologia especializada para recorrente/metastático (estreptozotocina, toceranibe). (2)(7)(12)(15)(20)(23)',
    ],
    condutaImediataCrise: {
      titulo: '🚨 Conduta imediata — crise hipoglicêmica',
      passos: [
        '1) Via oral se consciente: mel, xarope de glicose ou Nutrical® no mucosa — **não** forçar se convulsionando (aspiração). (5)(7)',
        '2) IV: dextrose 50% **0,5 g/kg** diluída 1:3–1:4 em NaCl 0,9% lentamente — evitar bolus repetidos grandes. (5)(7)(22)',
        '3) CRI: cristaloide balanceado com 2,5–5% dextrose — titular glicemia alvo 80–120 mg/dL (4,4–6,7 mmol/L). (5)(7)',
        '4) Se refratário: glucagon 50 ng/kg por via intravenosa, depois infusão contínua 5–40 ng/kg/min; monitorar glicemia seriada. (4)(5)(7)(22)',
        '5) Após estabilização: prednisona/prednisolona 0,25–0,5 mg/kg por via oral a cada 12 horas; dieta imediata; investigar causa. (1)(5)(6)',
        '6) Convulsão persistente após glicemia normalizada: considerar edema cerebral / anticonvulsivante. (5)(6)',
      ],
      alerta:
        'Anestesia e sedação mascaram sinais de neuroglicopenia — glicemia capilar seriada obrigatória. (4)(13)',
    },
    cirurgia: {
      indicacao:
        'Paciente estável com insulinoma confirmado ou altamente provável — partial pancreatectomia para tumores em lobos; enucleação cuidadosa se corpo (risco ductal). Exploração completa mesmo se imagem unifocal. (2)(12)(13)(23)',
      tecnica:
        'Fratura por sutura ou selador bipolar (preferido em lesões profundas); laparoscopia possível em lobos distais em centros experientes. (12)(23)',
      posOperatorio:
        'Hipoglicemia persistente → residual/metástase (ST mediana ~90 dias vs ~680 dias se normoglicemia). Hiperglicemia em 33% — diabetes permanente ~19%. Pancreatite ~10%. (12)(13)',
    },
    manejoMedico: {
      dieta:
        'Refeições pequenas e frequentes; dieta rica em proteína, baixa carboidrato simples, fibras complexas; evitar jejum prolongado. (2)(23)',
      prednisolona:
        '0,25 mg/kg por via oral a cada 12 horas — dose inicial preferencial; faixa de emergência/endocrinologia 0,25–0,5 mg/kg q12h; titular pela glicemia e efeitos adversos. Não iniciar rotineiramente em 4–6 mg/kg/dia. (1)(2)(5)(6)(7)',
      diazoxido:
        '5 mg/kg PO q12h, titular até 30 mg/kg q12h; administrar com alimento; salivar, vômito, retenção hídrica. Se refratário: hidroclorotiazida 1–2 mg/kg PO q12h. (7)(23)',
      octreotida:
        '2–4 µg/kg SC q8–12h ou 10–40 µg/cão SC q8–12h — resposta variável e possível taquifilaxia; receptores somatostatina em subset tumoral. (7)(19)(23)',
      glucagonCRI:
        'Ponte em crise ou pré-operatório — bolus 50 ng/kg IV, depois infusão contínua 5–40 ng/kg/min titulada; desmame gradual. (4)(5)(7)(22)',
    },
    estreptozotocinaOncologia: {
      titulo: '⚗️ Estreptozotocina — protocolo de oncologia especializada',
      indicacao:
        'Cão com insulinoma recorrente/metastático pós-cirurgia, histologia confirmada, hipoglicemia refratária a manejo médico. **Não** rotina de primeira linha. (7)(20)(21)',
      protocolo:
        '500 mg/m² (NÃO mg/kg) por via intravenosa em ~2 h, repetida a cada 2–3 semanas conforme protocolo; diurese salina agressiva: cloreto de sódio 0,9% ~18,3–20 mL/kg/h por 3 h antes, manter durante e ~2 h após a infusão; antiemético; monitorar proteinúria, creatinina, hemograma, glicemia. (1)(7)(20)(21)',
      toxicidades:
        'Nefrotoxicidade (Fanconi-like), vômito severo, diabetes mellitus permanente, hipoglicemia paradoxal pós-dose (liberação de insulina tumoral). Dose cumulativa nefrotóxica. (7)(20)(21)',
      alerta:
        'Medicamento hazardous — EPI, diurese obrigatória, centro oncologia; glicocorticoide adjuvante 0,5–1 mg/kg prednisolona se hipoglicemia persistente. (7)(20)(21)',
    },
    toceranibTerapiaAlvo: {
      titulo: '🎯 Toceranibe — terapia alvo',
      indicacao:
        'Metastático/recorrente ou adjuvante em centros com experiência; 30 cães multicêntricos: PFI mediana 561 dias, ST 656 dias — benefício clínico na maioria, mas estudos retrospectivos. (15)(18)',
      dose: '2,4–2,75 mg/kg PO q48h (doses menores vs rótulo MCT 3,25 mg/kg reduzem toxidade). (7)(15)',
      suspensaoCirurgica:
        'Descontinuar ≥3 dias antes e 2 semanas após cirurgia (risco tromboembólico/cicatrização). (7)',
      efeitosAdversos:
        'Diarreia, inapetência, lameness, hematochezia — monitorar PA (pode elevar). (7)(15)',
      alerta:
        'Evidência promissora porém **não** substitui ressecção quando tumor operável; ensaio prospectivo RVC em andamento. (15)(18)',
    },
    anestesia: {
      preparo:
        'Ração seca retirada 12 h; úmida até 6 h; líquidos digestíveis 1–2 h se hipoglicemia clínica; dextrose 50% 0,5–1,5 mL/kg IV lento se necessário pré-indução. (4)(13)(23)',
      intraoperatorio:
        'CRI cristaloide com 2,5–5% dextrose; glicemia q30 min; manipulação tumoral pode exigir ↑ taxa dextrose. Após ressecção, suspender dextrose — normoglicemia ou hiperglicemia em minutos. (4)(13)(25)',
      protocolo:
        'Pré-medicação opioide ± benzodiazepínico; evitar hipotensão; recuperação calma com monitorização glicêmica. (4)(13)',
    },
    prognostico: {
      cirurgico:
        'Estágio I–II: mediana ST ~12–24+ meses em séries; hipoglicemia resolvida pós-op → ST mediana ~746 dias (Cleland). Metástase ao diagnóstico piora desfecho. (9)(11)(12)',
      medico:
        'ST mediana ~8 meses em manejo exclusivamente médico (Ryan 2021). Encaminhamento e cirurgia associados a melhor sobrevida na coorte primária UK. (9)(11)',
      felino:
        'Remissão clínica possível pós-cirurgia — meses a >2 anos em casos; base pequena; metástase comum. (16)(17)',
    },
    errosComuns: [
      'Rotular epilepsia primária sem glicemia em paciente geriátrico. (11)(23)',
      'Confiar em razão insulina:glicose isolada. (2)(11)(14)',
      'US negativo = excluir insulinoma. (19)(24)',
      'Bolus grandes repetidos de dextrose 50% causando rebound hipoglicêmico. (5)(7)(22)',
      'Jejum prolongado pré-cirúrgico em paciente hipoglicemiante. (4)(13)',
      'Operar sem estadiamento TC quando disponível — surpresa metastática intra-op. (8)(19)',
      'Estreptozotocina sem diurese/histologia/oncologia. (20)(21)',
      'Toceranibe como substituto de cirurgia em tumor ressecável estágio I. (15)(23)',
      'Extrapolar protocolo canino completo para gato sem ressalva. (16)(17)',
      'Usar valor absoluto da insulina como marcador de metástase ou prognóstico. (14)',
      'Insulinoterapia imediata permanente na hiperglicemia pós-op transitória. (13)',
    ],
    evidenciaPublicada: {
      kraai2026:
        'Kraai et al., JVIM 2026 — 278 cães UK: convulsões, fraqueza, colapso e fasciculações predominam; cirurgia e encaminhamento associados a melhor sobrevida (HR 0,49). DOI: 10.1093/jvimsj/aalag045. (9)',
      kraai2025:
        'Kraai et al., Sci Rep 2025 — incidência 0,003%/ano; predisposição Boxer, WHWT, Pointer, FCR, Dogue de Bordeaux. DOI: 10.1038/s41598-025-86782-6. (10)',
      sheppardOlivares2022:
        'Sheppard-Olivares et al., Vet Rec Open 2022 — 30 cães toceranibe: PFI 561 dias, ST 656 dias; benefício clínico na maioria. DOI: 10.1002/vro2.27. (15)',
      cleland2021:
        'Cleland et al., Vet Comp Oncol 2021 — 49 cães cirurgia: estágio patológico prediz hipoglicemia persistente pós-op e ST. DOI: 10.1111/vco.12628. (12)',
      delBusto2020:
        'Del Busto et al., JVIM 2020 — 48 cães: complicações pós-op incluem hiperglicemia (33%) e DM permanente (19%). DOI: 10.1111/jvim.15751. (13)',
    },
    tabelaFarmacos: {
      kind: 'clinicalTable' as const,
      title: 'Medicamentos — doses práticas',
      headers: ['Fármaco', 'Espécie', 'Dose', 'Contexto', 'Ref'],
      rows: [
        ['Dextrose 50%', 'cão/gato', '0,5 g/kg IV diluída', 'Crise hipoglicêmica', '(7)(22)'],
        ['Glucagon', 'cão/gato', '50 ng/kg IV → 5–40 ng/kg/min IV', 'Crise refratária', '(4)(5)(7)(22)'],
        ['Prednisolona', 'cão/gato', '0,25 mg/kg PO q12h (até 0,5)', 'Manejo crônico/crise', '(1)(2)(5)(6)'],
        ['Diazóxido', 'cão', '5–30 mg/kg PO q12h', 'Refratário a prednisolona', '(7)(23)'],
        ['HCTZ', 'cão', '1–2 mg/kg PO q12h', 'Adjuvante diazóxido', '(7)'],
        ['Octreotida', 'cão', '2–4 µg/kg SC q8–12h', 'Adjuvante', '(7)(23)'],
        ['Estreptozotocina', 'cão', '500 mg/m² IV q3 sem', 'Metastático/recorrente', '(7)(20)(21)'],
        ['Toceranibe', 'cão', '2,4–2,75 mg/kg PO q48h', 'Terapia alvo', '(7)(15)'],
      ],
    },
    orientacaoTutor: [
      'Hipoglicemia pode matar — orientar mel/xarope domiciliar e retorno imediato se convulsão ou colapso. (5)(7)',
      'Alimentação fracionada e evitar jejum prolongado — especialmente antes de consultas/cirurgia. (2)(23)',
      'Glicemia capilar domiciliar serial ajuda ajuste de prednisolona/diazóxido. (2)(7)',
      'Cirurgia não garante cura — recorrência comum; plano de monitorização longo prazo. (12)(15)',
      'Pós-operatório: hiperglicemia transitória ≠ diabetes permanente imediato — seguir orientação veterinária. (13)',
    ],
    orientacaoTutorCrise:
      'Se o animal parece desorientado, tremendo ou convulsionando: aplicar mel/xarope na mucosa **se seguro**, não colocar dedos na boca se convulsionando, e procurar veterinário imediatamente. Severa hipoglicemia não tratada é fatal. (5)(7)(1)',
  },

  prevention: {
    vigilanciaRacial:
      'Cães de raças predisponentes (Boxer, WHWT, terriers, Pointer, FCR) com convulsão ou colapso episódico → glicemia antes de iniciar anticonvulsivante crônico. (9)(10)(11)',
    triagemGeriatrica:
      'Incluir glicemia em painel geriátrico de cães médios/grandes com sinais neurológicos intermitentes. (9)(11)',
    posOperatorio:
      'Monitorar glicemia pós-pancreatectomia por dias–semanas; orientar tutor sobre sinais de hipoglicemia e hiperglicemia. (12)(13)',
    felino:
      'Sem prevenção primária conhecida — reconhecimento precoce em gatos idosos com polifagia + sinais neurológicos. (16)(17)',
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'diabetes-mellitus-canina',
    'diabetes-mellitus-felina',
    'hipoadrenocorticismo-addison',
    'sindrome-cushing-caes',
    'sindrome-cushing-gatos',
  ],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-vin-insulinoma-synth',
      citationText:
        'Reconciliação editorial VIN — Insulinoma em cães e gatos (síntese clínica ConsultaVET, 2026).',
      sourceType: 'Reconciliação interna / VIN',
      url: 'https://veterinarypartner.vin.com/default.aspx?catId=254058&id=4952990',
      evidenceLevel: 'Moderada',
      notes: 'Algoritmo clínico integrado — vinReferencePending.',
    },
    {
      id: 'ref-nelson-couto-insulinoma',
      citationText:
        'Nelson RW, Couto CG. Disorders of the Pancreas. In: Small Animal Internal Medicine. 6th ed. Elsevier, 2020.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Insulinoma — diagnóstico e manejo.',
    },
    {
      id: 'ref-cunningham-physiology',
      citationText:
        "Klein BG. Cunningham's Textbook of Veterinary Physiology. 6th ed. Elsevier, 2020.",
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Fisiologia glicêmica e secreção de insulina.',
    },
    {
      id: 'ref-lumb-jones-6',
      citationText:
        'Lamont LA, Grimm KA, Robertson SA, et al. Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Wiley, 2024.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Anestesia em pacientes endócrinos/metabólicos.',
    },
    {
      id: 'ref-emergency-medicine-txt',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell, 2019.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Manejo de hipoglicemia e crises metabólicas.',
    },
    {
      id: 'ref-bsava-ecc-3',
      citationText:
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA, 2018.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Emergências endócrinas e metabólicas.',
    },
    {
      id: 'ref-plumbs-10-insulinoma',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley/VetMedux, 2023.",
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Diazóxido, glucagon, octreotida, estreptozotocina, toceranibe.',
    },
    {
      id: 'ref-buishand-2022-review',
      citationText:
        'Buishand FO. Current Trends in Diagnosis, Treatment and Prognosis of Canine Insulinoma. Vet Sci. 2022;9(10):540.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.3390/vetsci9100540',
      evidenceLevel: 'Alta',
      notes: 'Revisão contemporânea — diagnóstico, imagem, cirurgia, prognóstico. Open access PMC9611890.',
    },
    {
      id: 'ref-kraai-2026-jvim',
      citationText:
        'Kraai K, O\'Neill DG, Davison LJ, Brodbelt DC, Galac S, Buishand FO. Clinical signs, management, and survival of 278 dogs diagnosed with insulinoma under primary veterinary care in the United Kingdom. J Vet Intern Med. 2026;40(2):aalag045.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1093/jvimsj/aalag045',
      evidenceLevel: 'Alta',
      notes: 'Sinais clínicos, manejo e sobrevida — atendimento primário UK.',
    },
    {
      id: 'ref-kraai-2025-scirep',
      citationText:
        'Kraai K, O\'Neill DG, Davison LJ, Brodbelt DC, Galac S, Buishand FO. Incidence and risk factors for insulinoma diagnosed in dogs under primary veterinary care in the UK. Sci Rep. 2025;15:2463.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.1038/s41598-025-86782-6',
      evidenceLevel: 'Alta',
      notes: 'Incidência, raça, idade — VetCompass 2019.',
    },
    {
      id: 'ref-ryan-2021-jsap',
      citationText:
        'Ryan D, Pérez-Accino J, Gonçalves R, et al. Clinical findings, neurological manifestations and survival of dogs with insulinoma: 116 cases (2009-2020). J Small Anim Pract. 2021;62(9):531-539.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jsap.13318',
      evidenceLevel: 'Alta',
      notes: 'Manifestações neurológicas e sobrevida cirúrgica vs médica.',
    },
    {
      id: 'ref-cleland-2021-vco',
      citationText:
        'Cleland NT, Morton J, Delisser PJ. Outcome after surgical management of canine insulinoma in 49 cases. Vet Comp Oncol. 2021;19(3):428-441.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/vco.12628',
      evidenceLevel: 'Alta',
      notes: 'Estágio patológico e hipoglicemia persistente pós-op.',
    },
    {
      id: 'ref-del-busto-2020-jvim',
      citationText:
        'Del Busto I, German AJ, Treggiari E. Incidence of postoperative complications and outcome of 48 dogs undergoing surgical management of insulinoma. J Vet Intern Med. 2020;34(3):1135-1143.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jvim.15751',
      evidenceLevel: 'Alta',
      notes: 'Complicações pós-operatórias — hiperglicemia e DM.',
    },
    {
      id: 'ref-petrelli-2023-jvim',
      citationText:
        'Petrelli A, German AJ, O\'Connell EM, Silvestrini P. Serum insulin concentration in dogs with insulinoma as a clinical marker for presence of metastasis at the time of diagnosis. J Vet Intern Med. 2023;37(4):1139-1145.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jvim.16789',
      evidenceLevel: 'Moderada',
      notes: 'Insulina absoluta e metástase ao diagnóstico.',
    },
    {
      id: 'ref-sheppard-olivares-2022',
      citationText:
        'Sheppard-Olivares S, Bello NM, Johannes CM, et al. Toceranib phosphate in the management of canine insulinoma: a retrospective multicentre study of 30 cases (2009-2019). Vet Rec Open. 2022;9(1):e27.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1002/vro2.27',
      evidenceLevel: 'Moderada',
      notes: 'Toceranibe — PFI e ST.',
    },
    {
      id: 'ref-gifford-2020-jfms',
      citationText:
        'Gifford CH, Morris AP, Kenney KJ, Estep JS. Diagnosis of insulinoma in a Maine Coon cat. J Feline Med Surg Open Reports. 2020;6(1):2055116919894782.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1177/2055116919894782',
      evidenceLevel: 'Baixa',
      notes: 'Insulinoma felino — US, FNA, cirurgia.',
    },
    {
      id: 'ref-cervone-2019-ceus',
      citationText:
        'Cervone M, Harel M, Ségard-Weisse E, Krafft E. Use of contrast-enhanced ultrasonography for the detection of a feline insulinoma. J Feline Med Surg Open Reports. 2019;5(2):2055116919876140.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.1177/2055116919876140',
      evidenceLevel: 'Baixa',
      notes: 'CEUS felino — não usar imagens CC BY-NC proprietárias.',
    },
    {
      id: 'ref-coss-2021-jsap',
      citationText:
        'Coss P, Gilman O, Warren-Smith C, Major AC. The appearance of canine insulinoma on dual phase computed tomographic angiography. J Small Anim Pract. 2021;62(7):540-546.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jsap.13336',
      evidenceLevel: 'Moderada',
      notes: 'TC dual-phase — aparência tumoral.',
    },
    {
      id: 'ref-robben-2005-jvim',
      citationText:
        'Robben JH, Pollak YW, Kirpensteijn J, et al. Comparison of ultrasonography, computed tomography, and single-photon emission computed tomography for the detection and localization of canine insulinoma. J Vet Intern Med. 2005;19(1):15-22.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1892/0891-6640(2005)19<15:COUCAT>2.0.CO;2',
      evidenceLevel: 'Moderada',
      notes: 'Comparativo US vs TC vs cintilografia.',
    },
    {
      id: 'ref-moore-2002-javma',
      citationText:
        'Moore AS, Nelson RW, Henry CJ, et al. Streptozocin for treatment of pancreatic islet cell tumors in dogs: 17 cases (1989-1999). J Am Vet Med Assoc. 2002;221(6):811-818.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.2460/javma.2002.221.811',
      evidenceLevel: 'Moderada',
      notes: 'Estreptozotocina — eficácia e toxicidade.',
    },
    {
      id: 'ref-northrup-2013-jvim',
      citationText:
        'Northrup NC, Rassnick KM, Gieger TL, et al. Prospective evaluation of biweekly streptozotocin in 19 dogs with insulinoma. J Vet Intern Med. 2013;27(3):483-490.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jvim.12071',
      evidenceLevel: 'Moderada',
      notes: 'Estreptozotocina quinzenal — protocolo prospectivo.',
    },
    {
      id: 'ref-fischer-2000-jaaha',
      citationText:
        'Fischer JR, Smith SA, Harkin KR. Glucagon constant-rate infusion: a novel strategy for the management of hyperinsulinemic-hypoglycemic crisis in the dog. J Am Anim Hosp Assoc. 2000;36(1):27-32.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.5326/15473317-36-1-27',
      evidenceLevel: 'Moderada',
      notes: 'Glucagon CRI na crise hipoglicêmica.',
    },
    {
      id: 'ref-goutal-2012-jaaha',
      citationText:
        'Goutal CM, Brugmann BL, Ryan KA. Insulinoma in dogs: a review. J Am Anim Hosp Assoc. 2012;48(3):151-163.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.5326/JAAHA-MS-5745',
      evidenceLevel: 'Alta',
      notes: 'Revisão clássica canina.',
    },
    {
      id: 'ref-idowu-heading-2018',
      citationText:
        'Idowu O, Heading K. Hypoglycemia in dogs: causes, management, and diagnosis. Can Vet J. 2018;59(6):642-649.',
      sourceType: 'Revisão',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29881377/',
      evidenceLevel: 'Moderada',
      notes: 'Hipoglicemia — diferenciais, manejo e diagnóstico.',
    },
    {
      id: 'ref-camosci-2025-vetsci',
      citationText:
        'Camosci V, Canton C, Ventura L, Bertolini G. Quantitative conspicuity of pancreatic canine insulinoma: a comparison of dynamic 4D CT and dual-source, dual-energy bolus-triggered multiphase CT imaging. Vet Sci. 2025;12(11):1102.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.3390/vetsci12111102',
      evidenceLevel: 'Moderada',
      notes: 'Perfusão 4D vs DECT — detecção tumoral.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
