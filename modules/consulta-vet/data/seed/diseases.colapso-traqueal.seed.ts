import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Colapso traqueal canino — síntese editorial ConsultaVET.
 * Prioridade: Wolfe et al. VINcyclopedia 06/08/2026 > Johnson 2020 > Drobatz et al. 2019 >
 * Lumb & Jones 6ª ed. > BSAVA Emergency > Nelson & Couto 2020 > Kim 2024 > Robin 2024.
 */
export const colapsoTraquealCaninoRecord: DiseaseRecord = {
  id: 'disease-colapso-traqueal-canino',
  slug: 'colapso-traqueal-canino',
  title: 'Colapso Traqueal — Cães',
  synonyms: [
    'Colapso traqueal canino',
    'Traqueobroncomalácia',
    'Tracheal collapse',
    'TBM',
    'Traqueomalácia',
    'Tosse em grasnado de ganso',
    'Goose honk',
  ],
  species: ['dog'],
  category: 'respiratorio',
  tags: [
    'Toy',
    'Yorkshire',
    'Tosse',
    'Honking',
    'Fluoroscopia',
    'Broncoscopia',
    'Stent',
    'Hidrocodona',
    'Peitoral',
    'Broncomalácia',
    'ACVS',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['colapso-traqueal-canino'],
  quickSummary:
    'O colapso traqueal é doença obstrutiva, progressiva e estrutural das vias aéreas: perda de rigidez cartilaginosa, redundância da membrana dorsal e/ou malformação dos anéis reduzem o lúmen de forma dinâmica ou estática, evoluindo de tosse paroxística crônica (“goose honk”) a obstrução grave com hipoxemia, cianose e síncope. Colapso cervical/extratorácico predomina na inspiração; colapso intratorácico e bronquial na expiração forçada e na tosse. Radiografia é triagem que frequentemente subestima a doença; fluoroscopia documenta o comportamento dinâmico; broncoscopia gradua severidade (ACVS I–IV). Manejo conservador — peso, peitoral, antitussígenos, controle de inflamação e comorbidades — deve ser esgotado antes de stent ou anéis; stent trata melhor obstrução do que tosse isolada (Wolfe et al., VIN 2026; Johnson, 2020; Kim et al., 2024; Robin et al., 2024).',
  quickDecisionStrip: [
    'Colapso cervical/extratorácico piora principalmente na inspiração; intratorácico/brônquico na expiração e na tosse (Wolfe et al., VIN 2026; Johnson, 2020).',
    'Radiografia normal não exclui colapso traqueal — exame estático subestima doença dinâmica (Wolfe et al., VIN 2026; Suematsu et al., 2025).',
    'Grau anatômico (ACVS I–IV) não é sinônimo de gravidade clínica — fenótipo clínico guia conduta (Kim et al., 2024).',
    'Stent é muito mais previsível para aliviar obstrução respiratória do que para “curar tosse” — tosse tardia clinicamente relevante ~46–52% pós-stent (Robin et al., 2024).',
    'Perda de peso e peitoral (nunca coleira cervical) são terapia respiratória central, não recomendação opcional (Kim et al., 2024; Wolfe et al., VIN 2026).',
    'Toy breed + tosse seca “honking” + piora com excitação/coleira: alta suspeita — palpação traqueal sensível pode induzir paroxismo, mas não confirma isoladamente (Johnson, 2020).',
    'Broncomalácia coexiste em ~68% dos casos fluoroscópicos — stent traqueal isolado não corrige componente distal dominante (Kim et al., 2024).',
    'Dexametasona na crise: faixas divergem entre VIN (até 0,2 mg/kg q12h) e textbook de emergência (0,05–0,1 mg/kg) — usar menor dose anti-inflamatória efetiva (Wolfe et al., VIN 2026; Drobatz et al., 2019).',
    'Broncodilatador não endurece cartilagem traqueal — reservar a broncomalácia/bronquite, não ao colapso “puro” (Wolfe et al., VIN 2026).',
    'Antibiótico não é rotina; cultura positiva isolada não prova pneumonia — interpretar com citologia e clínica (Wolfe et al., VIN 2026; Drobatz et al., 2019).',
    'Síncope na tosse é multifatorial (hipoxemia, pressão intratorácica, reflexo vagal) — não rotular automaticamente como vagal (Johnson, 2020).',
    'MMVD com átrio esquerdo grande pode comprimir brônquio esquerdo — não atribuir toda tosse ao coração nem rotular colapso isolado sem avaliar cardiopatia (Nelson & Couto, 2020; BSAVA Emergency).',
  ],
  quickSummaryRich: {
    lead:
      'Colapso traqueal é física aplicada à clínica: o mesmo cão pode ter componente cervical inspiratório e intratorácico expiratório — o ruído muda conforme a fase respiratória. “RX normal” não tranquiliza se a história é clássica; stent não “cura” broncomalácia distal dominante. O núcleo do manejo é quebrar o ciclo tosse–inflamação–colapso, retirar cargas mecânicas (peso, coleira, irritantes) e fenotipar antes de intervir: tosse-dominante versus obstrução-dominante (Wolfe et al., VIN 2026; Kim et al., 2024).',
    leadHighlights: ['inspiração', 'expiração', 'RX normal', 'stent', 'peso', 'fenótipo'],
    pillars: [
      {
        title: 'Dinâmica inspiratória/expiratória',
        body:
          'Cervical colapsa na inspiração (pressão intraluminal ↓); intratorácico/brônquico na expiração forçada e tosse (pressão pleural ↑). A fase do ruído ajuda a localizar o segmento (Johnson, 2020; Wolfe et al., VIN 2026).',
        highlights: ['inspiração', 'expiração', 'tosse'],
      },
      {
        title: 'Peso, peitoral e ciclo da tosse',
        body:
          'Obesidade agrava trabalho respiratório e panting. Peitoral reduz estímulo por tração cervical. Antitussígenos interrompem cough → trauma → inflamação → cough quando tosse seca e improdutiva (Kim et al., 2024; Wolfe et al., VIN 2026).',
        highlights: ['peso', 'peitoral', 'antitussígeno'],
      },
      {
        title: 'Imagem e fenótipo clínico',
        body:
          'Radiografia triagem; fluoroscopia mostra colapso funcional; broncoscopia gradua ACVS I–IV. Grau anatômico ≠ intensidade da tosse — tratar fenótipo clínico, não apenas percentual de colapso (Kim et al., 2024; Suematsu et al., 2025).',
        highlights: ['fluoroscopia', 'ACVS', 'fenótipo'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'História e exame físico',
          timing: 'Primeira consulta',
          detail:
            'Toy com tosse seca “honking”, gagging, piora com coleira, excitação, calor e alimentação; palpação traqueal sensível pode induzir paroxismo — útil, não patognomônico; evitar provocar tosse em dispneico (Johnson, 2020; Wolfe et al., VIN 2026).',
        },
        {
          label: 'Triagem cardíaca e laboratorial',
          timing: 'Antes de rotular colapso isolado',
          detail:
            'Ausculta cardíaca, FR repouso, bioquímica para suporte medicamentoso; DMVD com átrio esquerdo grande pode comprimir brônquio esquerdo (Nelson & Couto, 2020; BSAVA Emergency).',
        },
        {
          label: 'Radiografia cervical + torácica',
          timing: 'Triagem inicial',
          detail:
            'Inspiração favorece visualização cervical; expiração favorece intratorácico — exame estático subestima gravidade; RX normal não exclui (Johnson, 2020; Suematsu et al., 2025).',
          reassess: 'Discordância clínico-radiológica → fluoroscopia.',
        },
        {
          label: 'Fluoroscopia dinâmica',
          timing: 'Quando RX e clínica discordam ou antes de stent',
          detail:
            'Documenta colapso durante respiração natural e tosse; avalia carina, brônquios, colapso faríngeo; pode ser feita acordado em centros experientes (Kim et al., 2024; Johnson, 2020).',
        },
        {
          label: 'Laringoscopia + traqueobroncoscopia',
          timing: 'Padrão ouro anatômico / planejamento invasivo',
          detail:
            'Gradua ACVS I–IV, identifica malformação em W, bronchomalacia, permite BAL/citologia/cultura; avaliar função laríngea antes de anestesia profunda (ACVS; Wolfe et al., VIN 2026).',
          reassess: 'Grau III–IV + obstrução funcional → discutir stent/anéis após falha médica.',
        },
        {
          label: 'Fenotipar e tratar',
          timing: 'Após caracterização',
          detail:
            'Tosse-dominante: médico multimodal. Obstrução-dominante (dispneia, cianose, síncope): estabilizar e considerar intervenção. Misto: tratar inflamação/comorbidades e reavaliar (Wolfe et al., VIN 2026; Congiusta et al., 2021).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Medidas mecânicas e ambientais',
          detail:
            'Perda de peso agressiva se BCS elevado; peitoral em vez de coleira; evitar calor, umidade, fumaça, excitação; tratar bronquite, BOAS e cardiopatia concomitantes (Kim et al., 2024; Wolfe et al., VIN 2026).',
          duration: 'Permanente — medida central.',
          reassess: 'Peso/BCS e FR repouso a cada revisão.',
        },
        {
          label: 'Antitussígenos',
          detail:
            'Hidrocodona, butorfanol ou diphenoxylate quando tosse seca autoperpetuante — escolher apenas um opioide; não suprimir agressivamente se pneumonia/secreção retida (Johnson, 2020; Drobatz et al., 2019).',
          dose: 'Hidrocodona ~0,2–0,5 mg/kg VO q8–12h (Wolfe et al., VIN 2026) ou 0,25–0,5 mg/kg q6–8h (Drobatz et al., 2019). Butorfanol 0,5–1 mg/kg VO q6–12h.',
          duration: 'Crônico conforme frequência; titular à menor dose eficaz.',
          reassess: 'Sedação, constipação ou depressão respiratória → reduzir dose.',
        },
        {
          label: 'Anti-inflamatório',
          detail:
            'Crise: dexametasona 0,05–0,1 mg/kg IV/IM/SC (Drobatz et al., 2019) — VIN cita até 0,2 mg/kg; prednisona curta 0,25–0,5 mg/kg q12h ou 0,5–1 mg/kg q24h com desmame. Manutenção: fluticasona inalatória 110 µg/puff, 1 puff q12h via espaçador (Talavera-López et al., 2023; Wolfe et al., VIN 2026).',
          duration: 'Sistêmico: curso curto (5–7 dias típico); evitar cronicidade.',
          reassess: 'Ganho ponderal/panting → transicionar para inalatório ou desmame.',
        },
        {
          label: 'Broncodilatadores (selecionados)',
          detail:
            'Reservados a bronchomalacia/bronquite/broncoespasmo — teofilina 10–20 mg/kg VO q12h, terbutalina 0,625–5 mg/cão VO q12h; não tratam cartilagem traqueal (Wolfe et al., VIN 2026; Drobatz et al., 2019).',
        },
        {
          label: 'Crise aguda',
          detail:
            'O₂ + mínima manipulação + sedação titulada (butorfanol 0,05–0,2 mg/kg SC q4–6h; acepromazina 0,01–0,1 mg/kg SC) + antitussígeno ± corticoide curto; intubar se hipoxemia refratária (Wolfe et al., VIN 2026; Drobatz et al., 2019).',
          reassess: 'Estabilização antes de exames demorados.',
        },
        {
          label: 'Intervenção (anéis ou stent)',
          detail:
            'Anéis extraluminais: colapso cervical/inlet. Stent intraluminal: obstrução severa/refratária após manejo médico máximo — consentimento sobre tosse e complicações frequentes (Robin et al., 2024; Nelson & Couto, 2020).',
          reassess: 'Pós-stent: tosse, febre, padrão torácico novo, migração/fratura.',
        },
      ],
    },
  },
  etiology: {
    pontosChave: [
      'Colapso cervical/extratorácico piora principalmente durante a inspiração (Wolfe et al., VIN 2026; Johnson, 2020).',
      'Colapso intratorácico e bronquial pioram principalmente durante a expiração/expiração forçada e na tosse (Wolfe et al., VIN 2026; Johnson, 2020).',
      'Radiografia normal não exclui colapso traqueal — processo dinâmico subestimado em exame estático (Suematsu et al., 2025; Wolfe et al., VIN 2026).',
      'Grau anatômico ACVS I–IV não é sinônimo de gravidade clínica — fenótipo clínico guia tratamento (Kim et al., 2024).',
      'Stent trata melhor obstrução respiratória do que tosse isolada — tosse tardia clinicamente relevante é frequente (Robin et al., 2024).',
    ],
    consultaRapidaTable: {
      kind: 'clinicalTable' as const,
      title: 'Consulta rápida — colapso traqueal canino',
      headers: ['Item', 'Informação'],
      rows: [
        ['Espécie', 'Principalmente cães; gatos: extremamente raro (relatos de caso)'],
        ['Raças clássicas', 'Yorkshire, Pomeranian, Chihuahua, Maltês, Toy/Mini Poodle, Shih-tzu, Pug, Pekingese'],
        ['Idade', 'Meia-idade/idosos frequentes; início pode ser precoce'],
        ['Sinal clássico', 'Tosse seca/paroxística tipo “goose honk”'],
        ['Outros sinais', 'Gagging, retching, stertor, stridor, wheezing, dispneia, cianose, síncope'],
        ['Exacerbadores', 'Excitação, exercício, calor, umidade, obesidade, coleira, irritantes'],
        ['RX', 'Triagem; pode subestimar ou perder a doença'],
        ['Fluoroscopia', 'Melhor exame fisiológico/dinâmico'],
        ['Broncoscopia', 'Padrão de referência para visualização e graduação anatômica'],
        ['Tratamento inicial', 'Peso + peitoral + gatilhos + antitussígeno/inflamação/comorbidades'],
        ['Stent', 'Obstrução severa/refratária — não primeira linha para tosse isolada'],
        ['Cura estrutural', 'Não — manejo paliativo da expressão clínica'],
        ['Prognóstico', 'Frequentemente controlável; variável nas formas graves (Wolfe et al., VIN 2026)'],
      ],
    },
    definicao:
      'Colapso traqueal é doença obstrutiva, progressiva e estrutural das vias aéreas, caracterizada por perda de rigidez da cartilagem traqueal, redundância da membrana dorsal e/ou malformação dos anéis, resultando em redução dinâmica ou estática do lúmen — de tosse paroxística crônica a obstrução grave com hipoxemia, cianose e síncope. O processo estrutural subjacente é geralmente irreversível, mas os sinais podem ser controlados por longos períodos (Wolfe et al., VIN 2026; ACVS).',
    fenotiposAnatomicos: [
      'Traqueomalácia / colapso dinâmico: fraqueza dos anéis com achatamento dorsoventral e protrusão da membrana dorsal (Wolfe et al., VIN 2026).',
      'Redundância da membrana dorsal: membrana alargada e pendular invadindo o lúmen em momentos respiratórios específicos.',
      'Malformação traqueal (configuração em “W”): anéis invaginados produzindo obstrução mais estática — fenótipo distinto, não sinônimo de grau IV simples (Suematsu et al., 2026).',
      'Forma mista: malformação + componente dinâmico no mesmo paciente.',
      'Traqueobroncomalácia: comprometimento traqueal + brônquico; bronchomalacia: colapso predominantemente bronquial (Johnson, 2020).',
    ],
    colapsoWShaped:
      'Malformação em W: cartilagem invaginada em direção ao lúmen, obstrução mais estática, frequentemente na entrada torácica — particularmente em Yorkshire Terriers. Pode coexistir com colapso dinâmico. Suematsu et al. (2026): cães W-shaped apresentaram maior estridor/esforço respiratório pré-operatório, mas bons resultados pós-prótese extraluminal em centro experiente — não é automaticamente “sem tratamento” (Wolfe et al., VIN 2026).',
    etiologiaMultifatorial:
      'Predisposição estrutural/genética em raças toy + progressão degenerativa + modificadores ambientais/inflamatórios (obesidade, bronquite, irritantes, BOAS, cardiopatia). Não reduzir a “doença genética” — etiologia multifatorial ainda incompletamente definida (Wolfe et al., VIN 2026; Johnson, 2020).',
    geneticaZfyve16:
      'Evidência genética emergente: variante do gene ZFYVE16 (endofina) associada a colapso traqueal em Yorkshire Terriers em estudo ACVIM — presente em 7/8 afetados inicialmente, com associação estatística ampliada na raça. Classificar como associação/emergente — não mutação causal estabelecida, não teste diagnóstico de rotina (Wolfe et al., VIN 2026).',
    anatomiaNormal:
      'Traqueia normal: ~35–45 anéis cartilaginosos em C unidos por ligamentos anulares fibroelásticos; abertura dorsal fechada por tecido conjuntivo, mucosa, músculo traqueal e membrana dorsal. Cartilagem saudável mantém calibre relativamente estável na respiração tranquila (Johnson, 2020; Wolfe et al., VIN 2026).',
    alteracoesCartilagem:
      'Histologia: redução de GAG, sulfato de condroitina, glicoproteínas, celularidade; perda de cartilagem hialina com substituição por fibrocartilagem/colágeno → cartilagem mole → achatamento → membrana dorsal prolapsa → estreitamento do lúmen (Johnson, 2020; Nelson & Couto, 2020).',
    gatoRaro:
      'Colapso traqueal primário degenerativo típico do toy é raro em gatos. Quando ocorre, costuma ser secundário a tumor, corpo estranho ou trauma — raciocínio de causa estrutural/obstrutiva. Evidência: relatos Viñeta et al. (2023) manejo médico; Tanaka & Uemura (2022) stent felino — não extrapolar doses/protocolos caninos (Wolfe et al., VIN 2026).',
  },
  epidemiology: {
    tcPerfilRacas:
      'Predominância em cães pequenos/toy: Yorkshire, Pomeranian, Chihuahua, Maltês, Poodle miniatura, Shih-tzu, Pug, Pekingese; meia-idade a idosos, mas componente estrutural pode preceder sinais por anos (Johnson, 2020; Wolfe et al., VIN 2026).',
    tcBroncomalacia:
      'Broncomalácia/tracheobroncomalácia frequentes — Kim et al. (2024): colapso de brônquios principais em 68,1% de 110 cães; impacta prognóstico e resposta a stent traqueal isolado.',
    tcObesidade:
      'Sobrepeso extremamente comum em casuísticas recentes; perda ponderal é terapia respiratória central (Kim et al., 2024; Wolfe et al., VIN 2026).',
    tcWeisse2026:
      'Weisse et al. (2026): em 11.061 Yorkshire Terriers de um hospital, colapso traqueal severo (≥50%) em 6,7% (739 cães); mediana idade diagnóstico 10 anos (IQR 8–13) — viés de referência institucional.',
  },
  pathogenesisTransmission: {
    cicloAutoperpetuante: [
      'Fraqueza cartilaginosa → estreitamento do lúmen → turbulência + tosse.',
      'Contato repetido membrana dorsal × parede ventral → trauma epitelial → edema + inflamação.',
      'Hipersecreção / disfunção mucociliar → maior sensibilidade à tosse → mais tosse.',
      'Maior pressão dinâmica sobre traqueia → mais colapso — ciclo vicioso (Wolfe et al., VIN 2026; Johnson, 2020).',
    ],
    fisiologiaPoiseuille:
      'Em fluxo laminar simplificado, resistência ∝ 1/r⁴ — reduzir raio pela metade aumenta resistência ~16×. Explica por que pequena redução luminal produz aumento desproporcional do esforço respiratório. Atenção: via aérea real é complacente, fluxo frequentemente turbulento — Poiseuille é aproximação didática, não modelo perfeito (Wolfe et al., VIN 2026; Johnson, 2020).',
    tcComplicacoesGraves:
      'Crises: hipoxemia, cianose, síncope (obstrução, pressão intratorácica na tosse, reflexo vagal, hipertensão pulmonar); raramente morte súbita (Johnson, 2020; Drobatz et al., 2019).',
  },
  pathophysiology:
    'Colapso cervical na inspiração ocorre quando pressão intraluminal cai abaixo da pressão externa sobre segmento extratorácico; colapso intratorácico/brônquico predomina na expiração forçada e tosse, quando pressão pleural positiva comprime vias aéreas com parede enfraquecida. Trauma repetido da membrana dorsal gera edema e inflamação; obstrução dinâmica aumenta esforço respiratório. Broncomalácia associada reduz previsibilidade se apenas traqueia for tratada. Comorbidades (MMVD, obesidade, BOAS) somam ou mimetizam ruído e dispneia — avaliar independentemente (Johnson, 2020; Wolfe et al., VIN 2026; Kim et al., 2024).',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Tosse seca paroxística “goose honk”; piora com excitação, calor, umidade, coleira, comer/beber',
          mechanism:
            'Colapso dinâmico estreita lúmen → turbulência → tosse reflexa → trauma mucoso → edema → ciclo autoperpetuante.',
          clinicalMeaning: 'História clássica em toy breed; palpação traqueal sensível pode induzir paroxismo — não patognomônico.',
          priority: 'common',
        },
        {
          finding: 'Gagging / retching pós-tosse (“tosse e tenta vomitar”)',
          mechanism: 'Tosse paroxística estimula reflexo faríngeo — nem sempre vômito gastrointestinal.',
          clinicalMeaning: 'Perguntar se movimento começa com honking ou esforço abdominal de vômito.',
          priority: 'common',
        },
        {
          finding: 'Stertor/stridor inspiratório (cervical) ou wheezing/expiratory effort (intratorácico/brônquico)',
          mechanism: 'Fase respiratória do ruído reflete segmento colapsado — cervical inspiração vs intratorácico expiração.',
          clinicalMeaning: 'Padrão respiratório ajuda localizar; bifásico sugere doença extensa ou obstrução severa.',
          priority: 'common',
        },
        {
          finding: 'Cianose, síncope, colapso em crises',
          mechanism:
            'Obstrução grave → hipoxemia; tosse → ↑ pressão intratorácica → ↓ retorno venoso/débito; reflexo vagal possível; hipertensão pulmonar contribui.',
          clinicalMeaning: 'Emergência — O₂, mínimo estresse, sedação/antitussígeno; “cough syncope” não é apenas vagal.',
          priority: 'emergency',
        },
        {
          finding: 'Ruído musical/wheeze sobre traqueia; “end-expiratory snap”',
          mechanism: 'Turbulência local e colapso brônquico/expiratório.',
          clinicalMeaning: 'Crackles expiratórios podem sugerir bronquite; inspiratórios+expiratórios → bronchomalacia.',
          priority: 'uncommon',
        },
        {
          finding: 'Palpação traqueal reproduz tosse',
          mechanism: 'Hiperresponsividade traqueal e colapso dinâmico.',
          clinicalMeaning: 'Teste positivo não confirma colapso; evitar provocar em dispneico — risco hipoxemia/síncope.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Sopro cardíaco ou cardiomegalia concomitantes (~42–43% em séries citadas pelo VIN)',
          mechanism: 'MMVD comprime brônquio esquerdo; tosse pode ser cardíaca, traqueal ou mista.',
          clinicalMeaning: 'Não presumir causa única — ecocardiografia e imagem torácica integradas.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'História estruturada e exame físico',
        purpose: 'Estabelecer suspeita e fenótipo clínico.',
        description:
          'Tosse honking, gatilhos (coleira, excitação, calor), gagging, padrão inspiratório vs expiratório; FR repouso; evitar provocar tosse em grave (Wolfe et al., VIN 2026).',
        interpretation: 'Alta suspeita em toy com quadro clássico.',
        limitations: 'Não patognomônico — bronquite, laríngeo, cardíaco mimetizam.',
      },
      {
        stepNumber: 2,
        title: 'Radiografia cervical + torácica',
        purpose: 'Triagem estática e comorbidades.',
        description: 'Inspiração para cervical, expiração para intratorácico quando possível; VHS, padrão bronquial, cardiomegalia (Johnson, 2020).',
        interpretation: 'Achados sugerem colapso mas subestimam gravidade dinâmica.',
        limitations: 'RX normal não exclui — 14,1% grau IV broncoscópico com RX discreto/ausente (Suematsu et al., 2025).',
      },
      {
        stepNumber: 3,
        title: 'Fluoroscopia dinâmica',
        purpose: 'Documentar colapso funcional.',
        description: 'Respiração natural + tosse; segmentos cervical, intratorácico, carina, brônquios (Kim et al., 2024).',
        interpretation: 'Carina frequentemente severamente comprometida.',
        limitations: '2D, subjetividade, provocação de tosse altera padrão.',
      },
      {
        stepNumber: 4,
        title: 'Laringoscopia + traqueobroncoscopia',
        purpose: 'Graduação anatômica e planejamento terapêutico.',
        description: 'ACVS I–IV, malformação W, bronchomalacia, BAL/citologia/cultura; função laríngea (ACVS; Wolfe et al., VIN 2026).',
        interpretation: 'Padrão de referência anatômico.',
        limitations: 'Anestesia modifica dinâmica; risco em obstrução grave.',
        isGoldStandard: true,
      },
      {
        stepNumber: 5,
        title: 'Fenotipar e excluir comorbidades',
        purpose: 'Orientar tratamento médico vs invasivo.',
        description: 'Tosse-dominante vs obstrução-dominante vs misto; MMVD, BOAS, pneumonia (Kim et al., 2024; Congiusta et al., 2021).',
        interpretation: 'Grau anatômico isolado não decide stent.',
        limitations: 'Múltiplos níveis frequentes.',
      },
    ],
    tabelaGrauI_IV: {
      kind: 'clinicalTable' as const,
      title: 'Classificação ACVS — graus I–IV',
      headers: ['Grau', 'Redução do lúmen', 'Cartilagem / membrana'],
      rows: [
        ['I', '~25%', 'Cartilagem quase normal; membrana discretamente pendular'],
        ['II', '~50%', 'Cartilagem parcialmente achatada; membrana alargada'],
        ['III', '~75%', 'Cartilagem quase plana; membrana quase toca parede ventral'],
        ['IV', '~90–100%', 'Cartilagem achatada/invertida; membrana encosta na parede — obstrução severa'],
      ],
    },
    alertaRxNormal:
      'RX NORMAL ≠ SEM COLAPSO TRAQUEAL. Processo dinâmico; radiografia estática subestima. VIN: RX detectou colapso em ~76% dos casos com fluoroscopia positiva; concordância exata de grau ~19%. Suematsu et al. (2025): 14,1% grau IV broncoscópico com RX discreto/ausente (Wolfe et al., VIN 2026; Suematsu et al., 2025).',
    tabelaDiferenciais: {
      kind: 'clinicalTable' as const,
      title: 'Diagnósticos diferenciais',
      headers: ['Diferencial', 'Dica clínica'],
      rows: [
        ['Bronquite crônica', 'Tosse crônica, padrão bronquial, BAL'],
        ['Bronchomalacia', 'Colapso expiratório, broncoscopia/fluoroscopia'],
        ['MMVD/ICC', 'AE aumentado, edema, taquipneia repouso'],
        ['Compressão brônquio esquerdo', 'AE grande sem edema franco'],
        ['Paralisia laríngea', 'Estridor inspiratório + laringoscopia'],
        ['BOAS', 'Braquicefalia + vias aéreas superiores'],
        ['Colapso faríngeo dinâmico', 'Fluoroscopia'],
        ['Hipoplasia/estenose traqueal', 'Estreitamento estático persistente'],
        ['Corpo estranho / neoplasia', 'Início abrupto ou massa focal'],
        ['Pneumonia / CIRDC', 'Febre, infiltrado, citologia'],
        ['Bronquiectasia', 'Imagem + doença crônica'],
      ],
    },
    kim2024:
      'Kim et al. (2024) — n=110 cães pequenos, TC confirmado por fluoroscopia. Colapso de brônquios principais 68,1%; localização/grau fluoroscópico não associou-se significativamente à gravidade da tosse; manejo multimodal (peso, ambiente, farmacoterapia) melhorou 86,6%. Mensagem: fenótipo clínico > grau isolado. DOI: 10.3389/fvets.2024.1448249.',
    suematsu2025:
      'Suematsu et al. (2025) — n=78 cães grau IV broncoscópico; 14,1% (11/78) RX discreto/ausente. Concordância regional: inlet 87,2%, mid-thoracic 76,9%, carina 66,7%, mid-cervical 47,4%. Mensagem: RX estático perigoso para excluir/graduar definitivamente.',
    robin2024:
      'Robin et al. (2024) meta-análise JVIM — complicações pós-stent: tosse precoce 99%, tardia 75%, tardia clinicamente relevante 46% (IC95% 34–59%; sensibilidade ~52%), infecção 24%, granuloma 20%, fratura 12%, recollapse 10%, migração 5%. Stent não é cura da tosse. DOI: 10.1111/jvim.17117.',
    congiusta2021:
      'Congiusta et al. (2021) — n=159: médico 84 vs stent 75; mediana sobrevida global médico ~3,7 anos vs stent ~5,2 anos (retrospectivo, não randomizado). Severamente comprometidos: médico mediana ~12 dias vs stent ~1.338 dias — stent life-saving em obstrução real. DOI: 10.2460/javma.258.3.279.',
    weisse2026:
      'Weisse et al. (2026) — 11.061 Yorkshire Terriers, CTCS severa 6,7%, mediana idade diagnóstico 10 anos. Reforça predisposição racial; viés institucional.',
    talavera2023:
      'Talavera-López et al. (2023) — RCT n=30, prednisona oral vs fluticasona inalatória: ambos melhoraram; fluticasona menos poliúria/polidipsia. Alternativa racional ao corticoide oral crônico. DOI: 10.3390/vetsci10090548.',
    tcRadiografia: {
      kind: 'clinicalTable' as const,
      headers: ['Papel da radiografia', 'Detalhe'],
      rows: [
        ['Triagem', 'Calibre traqueal, cardiomegalia, bronquite, pneumonia, edema'],
        ['Limite', 'Estático para doença dinâmica — discordância frequente vs fluoroscopia'],
        ['Técnica', 'Cervical inspiração; intratorácico expiração quando possível'],
      ],
    },
    tcFluoroscopia:
      'Melhor imagem funcional — respiração, expiração forçada, tosse; avalia carina, brônquios, colapso faríngeo; pode ser acordado (Kim et al., 2024; Johnson, 2020).',
    tcTraqueoBroncoscopia:
      'Padrão de referência anatômico ACVS I–IV; malformação W; bronchomalacia; BAL. Planejar anestesia experiente — Lumb & Jones: opioide pré-med, intubação suave, recuperação calma.',
    tcLavadoCultura:
      'BAL quando secreção, febre, infiltrado, refratariedade ou pré-stent. Cultura positiva isolada ≠ pneumonia — citologia + clínica (Wolfe et al., VIN 2026).',
  },
  treatment: {
    fenotiposCards: {
      kind: 'clinicalTable' as const,
      title: 'Fenótipos clínicos — conduta',
      headers: ['Fenótipo', 'Características', 'Prioridade terapêutica'],
      rows: [
        ['Tosse-dominante', 'Honking frequente, pouca dispneia, sem cianose/síncope', 'Antitussígeno + peso + peitoral + anti-inflamatório se indicado; stent geralmente não 1ª linha'],
        ['Obstrução-dominante', 'Dispneia, cianose, síncope, air hunger', 'Estabilização + caracterização anatômica + considerar stent/anéis após falha médica'],
        ['Misto', 'Tosse importante + episódios obstrutivos', 'Tratar inflamação/comorbidades + reavaliar intervenção conforme resposta'],
      ],
    },
    criseAguda: [
      'Mínima manipulação — excitação piora ciclo ventilação→tosse→colapso→hipoxemia (Wolfe et al., VIN 2026).',
      'O₂ pelo método menos estressante (gaiola, flow-by); FiO₂ menor com paciente calmo > luta por máscara.',
      'Sedação titulada: butorfanol 0,05–0,2 mg/kg SC q4–6h; acepromazina 0,01–0,1 mg/kg SC — menor dose eficaz (Wolfe et al., VIN 2026).',
      'Antitussígeno + corticoide curto se edema/inflamação — dexametasona 0,05–0,1 mg/kg (Drobatz et al., 2019); VIN até 0,2 mg/kg — não usar automaticamente dose alta.',
      'Intubação/ventilação se hipoxemia refratária; traqueostomia raramente resolve colapso difuso (BSAVA Emergency).',
    ],
    tcPrincipioConservador:
      'Tratamento médico é paliativo da expressão clínica — não reconstrói cartilagem. Efetivo em 71–93% por ≥1 ano em séries citadas pelo VIN quando multimodal (Wolfe et al., VIN 2026; Kim et al., 2024).',
    tcMedidasNaoFarmacologicas: [
      'Perda de peso — terapia respiratória central se BCS elevado.',
      'Peitoral em vez de coleira cervical.',
      'Evitar calor, umidade, fumaça, perfumes, excitação.',
      'Tratar bronquite, BOAS, cardiopatia, doença periodontal.',
    ],
    tabelaFarmacologica: {
      kind: 'clinicalTable' as const,
      title: 'Terapia farmacológica — consulta rápida',
      headers: ['Fármaco', 'Dose publicada', 'Situação', 'Observação / fonte'],
      rows: [
        ['Butorfanol', '0,05–0,2 mg/kg SC q4–6h', 'Sedação/crise', 'VIN 2026 — titular'],
        ['Acepromazina', '0,01–0,1 mg/kg SC', 'Sedação/crise', 'VIN 2026 — cautela cardiovascular'],
        ['Dexametasona', '0,05–0,1 mg/kg IV/IM/SC q12–24h', 'Crise inflamatória', 'Drobatz et al., 2019 — preferir faixa conservadora'],
        ['Dexametasona', '0,2 mg/kg IV/IM/SC q12h', 'Crise (faixa VIN)', 'Wolfe et al., VIN 2026 — não interpretar como obrigatória'],
        ['Hidrocodona', '0,2–0,5 mg/kg VO q8–12h', 'Antitussígeno', 'VIN 2026'],
        ['Hidrocodona', '0,25–0,5 mg/kg VO q6–8h', 'Antitussígeno', 'Drobatz et al., 2019'],
        ['Butorfanol', '0,5–1 mg/kg VO q6–12h', 'Antitussígeno crônico', 'VIN 2026'],
        ['Diphenoxylate', '0,2–0,5 mg/kg VO q8–12h', 'Alternativa antitussígena', 'VIN 2026 — dose do diphenoxylate'],
        ['Prednisona/prednisolona', '0,5–1 mg/kg VO q24h', 'Curso curto', 'VIN 2026 — evitar cronicidade'],
        ['Prednisona', '0,25–0,5 mg/kg q12h ou 0,5–1 mg/kg q24h', 'Inflamação', 'Drobatz et al., 2019 — desmame progressivo'],
        ['Fluticasona inalatória', '110 µg/puff, 1 puff q12h', 'Manutenção anti-inflamatória', 'VIN 2026; Talavera-López et al., 2023'],
        ['Teofilina', '10–20 mg/kg VO q12h', 'Lower airway selecionado', 'Drobatz et al., 2019 — farmacocinética variável'],
        ['Aminofilina', '5–10 mg/kg IM/IV q8h', 'Hospitalar', 'Drobatz et al., 2019'],
        ['Terbutalina', '0,625–5 mg/cão VO q12h', 'Componente bronquial', 'VIN 2026 — cautela cardíaca'],
        ['Maropitant', '2 mg/kg VO q48h ×14d', 'Antitussígeno experimental', 'fora da bula; evidência indireta bronquite — VIN 2026'],
        ['Stanozolol', '0,15 mg/kg VO q12h ×2 meses', 'Experimental/limitado', 'Pequeno RCT 2011 — não rotina'],
      ],
    },
    notaDexametasona:
      'Discrepância de dose na crise: VIN 2026 cita dexametasona até 0,2 mg/kg q12h; Drobatz et al. (2019) 0,05–0,1 mg/kg. Priorizar menor dose anti-inflamatória efetiva e curta duração — evidência específica sobre dose ótima limitada (Wolfe et al., VIN 2026; Drobatz et al., 2019).',
    tcAntitussigenosTabela: {
      kind: 'clinicalTable' as const,
      title: 'Antitussígenos — doses',
      headers: ['Fármaco', 'Faixa', 'Notas'],
      rows: [
        ['Hidrocodona', '0,2–0,5 mg/kg PO q8–12h (VIN); 0,25–0,5 q6–8h (emergência)', '1ª linha; escolher apenas um opioide'],
        ['Butorfanol', '0,5–1 mg/kg PO q6–12h', 'Opioide misto; sedação possível'],
        ['Diphenoxylate', '0,2–0,5 mg/kg PO q8–12h', 'Alternativa; dose do diphenoxylate'],
      ],
    },
    tcCorticosteroides:
      'Crise: dexametasona conforme nota de discrepância; prednisona curta. Manutenção: budesonida/fluticasona inalatória preferível a cronicidade oral — ganho ponderal/panting pioram colapso (Talavera-López et al., 2023; Johnson, 2020).',
    tcBroncodilatadores:
      'Não dilatam traqueia cartilaginosa — teofilina, terbutalina, albuterol quando bronchomalacia/bronquite. Controversos no colapso “puro” (Wolfe et al., VIN 2026).',
    tcStentIntraluminal:
      'Considerar obstrução respiratória relevante persistente após manejo médico máximo documentado. Stent trata calibre, não bronchomalacia/laringe/bronquite. Complicações frequentes — ver Robin et al. (2024). Sobrevida mediana ~502 dias em série com eventos adversos (Nelson & Couto, 2020).',
    tcTabelaComplicacoesStent2024: {
      kind: 'clinicalTable' as const,
      title: 'Complicações após stent (Robin et al., 2024)',
      headers: ['Complicação', 'Prevalência agrupada'],
      rows: [
        ['Tosse precoce', '~99%'],
        ['Tosse tardia', '~75%'],
        ['Tosse tardia clinicamente relevante', '~46% (IC95% 34–59%)'],
        ['Infecção traqueobrônquica', '~24%'],
        ['Granuloma', '~20%'],
        ['Fratura do stent', '~12%'],
        ['Recollapse/shortening', '~10%'],
        ['Migração', '~5%'],
      ],
    },
    tcAnéisExtraluminais:
      'Indicação clássica colapso cervical/thoracic inlet; sem corpo estranho intraluminal. Riscos: paralisia laríngea iatrogênica (nervo laríngeo recorrente), pneumonia, necrose, pneumotórax (Johnson, 2020; BSAVA Emergency). Suematsu et al. (2026): W-shaped pode responder a prótese extraluminal contínua em centro experiente.',
    principiosAnestesia: [
      'Alto risco: tosse pós-extubação, edema, hipoxemia — manter antitussígeno prévio quando indicado (Lumb & Jones, 6ª ed.).',
      'Pré-medicação com opioide; evitar intubação superficial; lidocaína IV 1,5–2 mg/kg citada para atenuar resposta — evidência indireta, não RCT em TC.',
      'Recuperação calma: O₂, antitussígeno, sedação, plano reintubação; monitorar pneumotórax pós-stent (Lumb & Jones, 6ª ed.; Wolfe et al., VIN 2026).',
    ],
    escoreControleConsultaVet: {
      kind: 'clinicalTable' as const,
      title: 'Escore de controle ConsultaVET (ferramenta longitudinal interna — não validado)',
      headers: ['Domínio', 'Escala'],
      rows: [
        ['Tosse', '0=nenhuma; 1=ocasional; 2=diária; 3=múltiplos paroxismos/dia; 4=incapacitante/noturna'],
        ['Dispneia', '0=nenhuma; 1=exercício intenso; 2=exercício leve/excitação; 3=repouso episódico; 4=repouso persistente/crises'],
        ['Síncope', '0=nenhuma; 1=rara; 2=recorrente'],
        ['Cianose', '0=nenhuma; 1=em crise'],
        ['Qualidade de vida', '0–10 (tutor)'],
      ],
    },
    monitoramento: [
      'Frequência/intensidade tosse, síncope, cianose, tolerância exercício — diário pelo tutor.',
      'Peso/ECC, FR repouso, ausculta, comorbidades cardíacas a cada revisão.',
      'Pós-stent: tosse nova, febre, piora respiratória — investigar migração, fratura, granuloma, infecção.',
    ],
    prognostico:
      'Doença estruturalmente progressiva e não curável, mas irreversível ≠ prognóstico ruim — muitos cães mantêm boa qualidade de vida por anos com peso, ambiente, antitussígenos e comorbidades tratadas. Manejo médico efetivo ≥1 ano em 71–93% em séries citadas (Wolfe et al., VIN 2026). Objetivo: conforto respiratorio, não abolir cada tosse. Severamente obstrutivos: stent pode prolongar sobrevida (Congiusta et al., 2021).',
    errosComuns: [
      '“RX normal, então não tem colapso” — errado; exame dinâmico necessário.',
      '“Grau IV = stent obrigatório” — errado; sintomas + refratariedade + obstrução importam.',
      '“Stent vai acabar com a tosse” — errado; tosse tardia ~75%, clinicamente relevante ~46%.',
      '“Broncodilatador abre a traqueia” — errado; atua em músculo liso brônquico.',
      '“Todo colapso precisa antibiótico” — errado; usar só com infecção sustentada.',
      '“Sopro = tosse cardíaca” — errado; avaliar MMVD e TC independentemente.',
      '“Toda síncope é vagal” — errado; hipoxemia e hemodinâmica participam.',
      '“Maior grau = maior tosse” — não sustentado (Kim et al., 2024).',
      '“Prednisona crônica inofensiva” — errado; ganho ponderal/panting pioram TC.',
      '“Colapso é só cervical” — errado; avaliar carina e brônquios.',
    ],
    cronica: [
      'Kim et al. (2024): perda ponderal + peitoral + ambiente + farmacoterapia → melhora 86,6% com seguimento.',
      'Talavera-López et al. (2023): fluticasona inalatória alternativa racional ao prednisolona oral prolongado.',
    ],
    aguda: [
      'Drobatz et al. (2019): O₂, mínimo estresse, sedação/antitussígenos, corticoide curto; excluir pneumonia/edema.',
    ],
    preclinica: [
      'Robin et al. (2024): consentimento informado sobre complicações pós-stent antes de procedimento eletivo.',
    ],
  },
  prevention: {
    pesoPeitoralAmbiente:
      'Controle ponderal, peitoral (nunca coleira cervical), redução de calor/umidade/irritantes e tratamento de comorbidades respiratórias/cardíacas — “prevenção” de descompensação e cirurgia de resgate (Wolfe et al., VIN 2026; ACVS).',
    tcPrevencaoDescompensacao:
      'Identificação precoce de piora (FR repouso, tosse noturna, síncope) e plano de crise com tutor — evitar tração cervical e obesidade.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['bronquite-cronica-caes-gatos', 'cardiomiopatia-dilatada-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-2026',
      citationText:
        'Wolfe TM, Rothrock K, Shell L. Tracheal Collapse (Canine). VINcyclopedia of Diseases. Veterinary Information Network. Revised August 6, 2026.',
      sourceType: 'VINcyclopedia',
      url: null,
      notes: 'Fonte-âncora: definição, classificação, doses, emergência, prognóstico.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-johnson-resp-2020',
      citationText: 'Johnson LR. Canine and Feline Respiratory Medicine. 2nd ed. Wiley-Blackwell; 2020. Cap. Diseases of Airways.',
      sourceType: 'Livro especialidade',
      url: null,
      notes: 'Dinâmica pressões, fluoroscopia, broncomalácia, tratamento.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-drobatz-emerg-2019',
      citationText:
        'Clarke DL. Tracheobronchial Injury and Collapse. In: Drobatz KJ et al. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019.',
      sourceType: 'Emergência',
      url: null,
      notes: 'Crise aguda, antitussígenos, dexametasona conservadora.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-lumb-jones-6',
      citationText:
        'Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Wiley-Blackwell; 2024. Cap. 38 — doença respiratória/anestesia.',
      sourceType: 'Anestesiologia',
      url: null,
      notes: 'Anestesia e recuperação em TC.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-bsava-emergency',
      citationText: 'BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA; 2018. Seção Tracheal Collapse.',
      sourceType: 'Emergência',
      url: null,
      notes: 'Anéis extraluminais, traqueostomia, compressão brônquica.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-nelson-2020',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Disorders of the Trachea and Bronchi.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'TBM, stent, sobrevida.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-kim-2024',
      citationText:
        'Kim MR, Kim SH, Ryu MO, Youn HY, Choi JH, Seo KW. A retrospective study of tracheal collapse in small-breed dogs: 110 cases (2022–2024). Front Vet Sci. 2024;11:1448249.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1448249/full',
      notes: 'Broncomalácia 68,1%; grau ≠ tosse; melhora multimodal 86,6%. CC BY.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-robin-2024',
      citationText:
        'Robin T, Robin E, Le Boedec K, et al. A systematic review and meta-analysis of prevalence of complications after tracheal stenting in dogs. J Vet Intern Med. 2024;38(4):2034–2048.',
      sourceType: 'Meta-análise',
      url: 'https://doi.org/10.1111/jvim.17117',
      notes: 'Complicações pós-stent.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-congiusta-2021',
      citationText:
        'Congiusta M, Weisse C, Berent AC, Tozier E. Comparison of medical management alone and tracheal endoluminal stent placement in dogs with tracheal collapse. J Am Vet Med Assoc. 2021;258(3):279–289.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://doi.org/10.2460/javma.258.3.279',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-suematsu-2025',
      citationText:
        'Suematsu M, et al. Radiography underestimates the severity of tracheobronchoscopy-confirmed grade IV tracheal collapse in dogs. Am J Vet Res. 2025;86(9).',
      sourceType: 'Estudo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40466662/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-weisse-2026',
      citationText:
        'Weisse C, Kwok SY, Berent AC, et al. Prevalence of tracheal collapse syndrome in Yorkshire Terriers at one veterinary hospital. J Vet Intern Med. 2026;40(3).',
      sourceType: 'Estudo retrospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42132355/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-talavera-2023',
      citationText:
        'Talavera-López J, Sáez-Mengual O, Fernández-del-Palacio MJ. Comparative Study of Inhaled Fluticasone Versus Oral Prednisone in 30 Dogs with Cough and Tracheal Collapse. Vet Sci. 2023;10:548.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.3390/vetsci10090548',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-acvs',
      citationText: 'American College of Veterinary Surgeons (ACVS). Tracheal Collapse.',
      sourceType: 'Revisão especializada',
      url: 'https://www.acvs.org/small-animal/tracheal-collapse/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-suematsu-2026-w',
      citationText:
        'Suematsu M, Minamoto T, Suematsu H, et al. Long-term outcomes of dogs with W-shaped or traditional tracheal collapse treated with continuous extraluminal tracheal prosthesis. Vet Surg. 2026;55(1):118–130.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://doi.org/10.1111/vsu.70046',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-toone-2024',
      citationText:
        'Toone E, Grobman M, Lascola K, et al. Assessment of the circulating inflammatory mediator interleukin-8 in dogs with tracheal collapse. Can Vet J. 2024;65:1055–1060.',
      sourceType: 'Estudo prospectivo',
      url: null,
      evidenceLevel: 'C',
    },
    {
      id: 'ref-jung-2024',
      citationText:
        'Jung DY, Park SM, Lim GH, et al. Assessment of MMP-9 and clinical characteristics in dogs with tracheal collapse. BMC Vet Res. 2024;20:52.',
      sourceType: 'Estudo',
      url: 'https://doi.org/10.1186/s12917-023-03872-1',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
