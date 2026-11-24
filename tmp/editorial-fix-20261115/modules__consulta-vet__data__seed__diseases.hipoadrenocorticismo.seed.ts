import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const hipoadrenocorticismoAddisonRecord: DiseaseRecord = {
  id: 'disease-hipoadrenocorticismo-addison',
  slug: 'hipoadrenocorticismo-addison',
  title: 'Hipoadrenocorticismo (Doença de Addison)',
  subtitle:
    'Síndrome endócrina em cães e gatos causada por deficiência de cortisol, aldosterona ou ambos — por lesão adrenocortical primária, deficiência hipofisária de ACTH ou supressão iatrogênica — capaz de evoluir de sinais gastrointestinais intermitentes para crise addisoniana com choque circulatório, hiponatremia, hipercalemia e bloqueios cardíacos graves.',
  synonyms: [
    'Hypoadrenocorticism',
    'Doença de Addison',
    'Insuficiência adrenocortical',
    'Crise addisoniana',
    'Hipoadrenocorticismo eunatrêmico-eucalêmico',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  categories: ['endocrinologia', 'urgencia-emergencia', 'terapia-intensiva'],
  tags: ['Cães e Gatos'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipoadrenocorticismo-addison'],

  quickSummary:
    'O hipoadrenocorticismo (HACo) decorre da produção insuficiente de glicocorticoides (cortisol), mineralocorticoides (aldosterona) ou ambos. O consenso ALIVE 2025 substituiu os termos vagos "típico" e "atípico" por definições que separam a localização anatômica (primário vs. secundário) do fenótipo eletrolítico (hiponatrêmico/hipercalêmico vs. eunatrêmico-eucalêmico). Como Na:K normais não garantem produção preservada de aldosterona, todo suspeito estável deve passar por triagem com cortisol basal e confirmação via teste de estimulação por ACTH. Na crise addisoniana, a estabilização volêmica, o manejo da hipercalemia cardiotóxica, o controle da velocidade de correção do sódio e a dexametasona IV precedem a confirmação hormonal; na manutenção, busca-se a menor dose eficaz de glicocorticoide somada a DOCP ou fludrocortisona quando há deficiência mineralocorticoide.',

  quickDecisionStrip: [
    'Crise addisoniana (choque, bradicardia relativa, hipercalemia ou hipoglicemia) exige ressuscitação imediata: colete cortisol basal/pré-ACTH se não atrasar o atendimento e use dexametasona na emergência.',
    'Em cães, cortisol basal > 2 µg/dL tem alto valor para exclusão (VPN ~99,8% em estudo de 2026), mas não é infalível; valores ≤ 2 µg/dL NÃO confirmam Addison e exigem teste de estimulação por ACTH.',
    'Eletrólitos normais (Na e K dentro da referência) não excluem hipoadrenocorticismo nem provam secreção normal de aldosterona (consenso ALIVE 2025).',
    'Na hipercalemia com alteração eletrocardiográfica (ondas P ausentes, BAV, QRS largo), proteja o miocárdio imediatamente com gluconato de cálcio 10% IV sob ECG contínuo antes de reduzir o potássio.',
    'Na hiponatremia crônica ou de duração desconhecida, limite a elevação do sódio a ≤ 0,5 mmol/L/h (≤ 10–12 mmol/L em 24 h; ≤ 8–10 mmol/L/24 h em alto risco) para prevenir desmielinização osmótica.',
    'Em gatos, embora raro, o estudo multicêntrico de 2025 (41 casos) confirmou existência do fenótipo eunatrêmico-eucalêmico, maior necessidade de manutenção de prednisolona e resposta clínica mais lenta à crise.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Conhecido como "o grande imitador" da clínica médica, o hipoadrenocorticismo pode simular gastroenteropatias crônicas, enteropatia perdedora de proteínas, lesão renal aguda e sepse. O raciocínio moderno exige ==separar o diagnóstico hormonal do fenótipo eletrolítico (ALIVE 2025)==, coletar amostras antes de corticoides que interfiram no ensaio, evitar elevação rápida da natremia na emergência e individualizar doses de glicocorticoide e DOCP/fludrocortisona para alcançar sobrevida e qualidade de vida excelentes em cães e gatos.',
    leadHighlights: [
      'separar o diagnóstico hormonal do fenótipo eletrolítico (ALIVE 2025)',
      'cortisol basal > 2 µg/dL',
      'teste de estimulação por ACTH',
      'gluconato de cálcio 10% IV',
      '≤ 0,5 mmol/L/h',
      'desmielinização osmótica',
      '41 casos',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Do Plantão à Caracterização Hormonal',
      steps: [
        {
          label: '1. Suspeita clínica e coleta antes de glicocorticoides interferentes',
          timing: 'Minutos 0 a 15',
          detail:
            'Pensar em HACo diante de vômitos/diarreia intermitentes, choque sem causa evidente, ausência de leucograma de estresse, bradicardia relativa, hipoglicemia, hipoalbuminemia/hipocolesterolemia ou azotemia com densidade urinária baixa (< 1,030). Se o paciente estiver instável, colher soro/plasma antes de administrar dexametasona e iniciar estabilização sem atraso.',
        },
        {
          label: '2. Triagem com cortisol basal (em cães estáveis)',
          timing: 'Triagem inicial',
          detail:
            'Cortisol basal > 2 µg/dL reduz fortemente a probabilidade da doença em cães (VPN 99,8% em Da Silva et al., 2026), mas não tem corte equivalente validado em gatos e não é 100% infalível em suspeita clínica extrema. Cortisol ≤ 2 µg/dL nunca confirma Addison (VPP baixo).',
        },
        {
          label: '3. Teste de estimulação por ACTH (confirmação)',
          timing: 'Confirmação diagnóstica',
          detail:
            'Cães: cosintropina 5 µg/kg IV/IM (máx. 250 µg; ou 1 µg/kg IV em protocolo validado) com recoleta em ~60 min. Gatos: protocolo histórico 125 µg/gato ou 5 µg/kg IV com recoleta em 60–75 min. Sempre investigar uso prévio de corticoides sistêmicos, tópicos, otológicos ou oftálmicos para não confundir supressão iatrogênica com lesão primária.',
        },
        {
          label: '4. Caracterização etiológica e mineralocorticoide (ALIVE 2025)',
          timing: 'Após confirmação',
          detail:
            'Integrar eletrólitos, ACTH endógeno (alto no primário, baixo/normal no secundário ou suprimido no iatrogênico), histórico de trilostano/mitotano e, quando disponível, aldosterona ou atividade de renina plasmática (PRA). Nunca presumir "aldosterona normal" apenas porque Na⁺ e K⁺ estão dentro da referência.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Crise Addisoniana e Manutenção Crônica',
      steps: [
        {
          label: '1. Ressuscitação volêmica titulada e controle da natremia',
          timing: 'Minutos 0 a 60',
          detail:
            'Cães: bolus cristaloide isotônico de 15–20 mL/kg IV em 15–30 min; Gatos: 5–10 mL/kg IV em 15–30 min (AAHA 2024), reavaliando perfusão após cada etapa. Em hiponatremia grave crônica, monitorar Na⁺ a cada 2–4 h e limitar a correção a ≤ 0,5 mmol/L/h (≤ 10–12 mmol/L/24 h).',
        },
        {
          label: '2. Proteção miocárdica e redução do potássio na hipercalemia',
          timing: 'Se alterações no ECG',
          detail:
            'Se houver bloqueio AV, ausência de onda P ou QRS alargado, administrar gluconato de cálcio 10% (0,5–1 mL/kg IV em 10–20 min sob ECG contínuo). Associar redução intracelular de K⁺ com insulina regular (0,2–0,25 UI/kg IV) + dextrose em bolus e infusão contínua com glicemia horária; reservar bicarbonato apenas para acidemia extrema (pH < 7,1 ou HCO₃⁻ < 10 mEq/L).',
        },
        {
          label: '3. Reposição glicocorticoide aguda',
          timing: 'Após coleta hormonal',
          detail:
            'Administrar dexametasona fosfato sódico (0,1 mg/kg IV q12–24h; não reage de modo relevante no ensaio de cortisol) ou hidrocortisona em infusão contínua (0,3–0,625 mg/kg/h) somente após concluída a coleta para teste de ACTH.',
        },
        {
          label: '4. Transição e manutenção individualizada (DOCP/Fludrocortisona + Prednisolona)',
          timing: 'Estabilização e longo prazo',
          detail:
            'Iniciar DOCP quando o paciente estiver estável e idealmente com Na⁺ > 130 mmol/L (AAHA 2023). Manutenção canina: prednisolona/prednisona (< 0,1 a 0,25 mg/kg/dia) + DOCP (1,1–1,5 mg/kg SC/IM inicial AAHA ou 2,2 mg/kg bula) ou fludrocortisona (0,01 mg/kg VO q12h). Gatos frequentemente requerem mais prednisolona (0,2–0,4 mg/kg VO q24h) + DOCP 2,2 mg/kg SC/mês ou fludrocortisona.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Consulta rápida (30–60 segundos) — Decisões críticas no hipoadrenocorticismo',
      headers: ['Situação clínica', 'Conduta objetiva baseada em evidência'],
      rows: [
        [
          'Choque com bradicardia relativa ou relação Na:K < 27',
          '==Gatilho de investigação imediata== (não diagnóstico definitivo). Tratar choque e hipercalemia sem esperar resultado hormonal.',
        ],
        [
          'Qual corticoide usar antes do teste de ACTH?',
          '==Dexametasona fosfato sódico (0,1 mg/kg IV)==: não produz reação cruzada relevante nos ensaios de cortisol (ao contrário de hidrocortisona ou prednisolona) {{ref:ref-aaha-endo-2023}}.',
        ],
        [
          'Cortisol basal ≤ 2 µg/dL vs > 2 µg/dL (em cães)',
          '≤ 2 µg/dL exige estimulação por ACTH (VPP baixo: 14,6% em 982 cães); > 2 µg/dL quase sempre exclui (VPN 99,8%), mas houve 1 caso com 2,3 µg/dL {{ref:ref-dasilva-2026}}.',
        ],
        [
          'Fluido ideal na crise com hipercalemia e hiponatremia',
          '==Cristaloide isotônico individualizado (AAHA 2024)==: restaurar perfusão renal importa mais que evitar traços de K⁺ em solução balanceada; vigiar velocidade do Na⁺ {{ref:ref-aaha-fluid-2024}}.',
        ],
        [
          'Quando checar retorno do DOCP no início?',
          'Avaliação clínica e de Na⁺/K⁺ nos dias ==10–14 e 25== após a aplicação para titular dose (1,1–2,2 mg/kg) e intervalo {{ref:ref-aaha-endo-2023}} {{ref:ref-langlois-2026}}.',
        ],
        [
          'Particularidade felina principal',
          'Resposta clínica inicial costuma ser ==mais lenta que em cães==, adrenais podem ter tamanho normal ou aumentado (linfoma) e manutenção exige prednisolona mais alta {{ref:ref-boretti-2026}}.',
        ],
      ],
    },
  },

  etiology: {
    hacoDefinicaoETerminologiaAlive2025:
      'O córtex adrenal sintetiza hormônios esteroides vitais para estabilidade hemodinâmica, equilíbrio hidroeletrolítico, gliconeogênese e resposta ao estresse. É fundamental distinguir três termos que frequentemente se confundem na prática:\n\n' +
      '- ==Hipoadrenocorticismo (HACo)==: síndrome clínica resultante da produção insuficiente de hormônios adrenocorticais, seja de origem espontânea ou iatrogênica.\n' +
      '- ==Doença de Addison==: designação clássica reservada preferencialmente ao ==hipoadrenocorticismo primário==, quando a falha reside na própria glândula adrenal.\n' +
      '- ==Crise addisoniana==: descompensação aguda potencialmente fatal caracterizada por hipovolemia, hipotensão, distúrbios eletrolíticos/ácido-básicos e colapso cardiovascular — podendo ser a apresentação inicial ou ocorrer em pacientes já tratados diante de estresse ou falha terapêutica.\n\n' +
      '==Atualização terminológica do consenso ALIVE (Niessen et al., 2025)==: historicamente, dividia-se a doença em "típica" e "atípica" conforme a presença ou ausência de desvios em Na⁺ e K⁺. Por metodologia Delphi modificada, o consenso ALIVE recomendou abandonar essa dicotomia por misturar fenótipo eletrolítico com capacidade secretória real {{ref:ref-alive-2025}}. Um cão pode exibir sódio e potássio séricos normais (==hipoadrenocorticismo eunatrêmico-eucalêmico==) e ainda assim já possuir deficiência parcial de aldosterona compensada transitoriamente. Portanto, nunca se deve registrar "produção normal de aldosterona" no prontuário apenas porque Na⁺ e K⁺ estão dentro da referência {{ref:ref-alive-2025}}.',
    hacoTabelaClassificacaoAnatomicaEAlive: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação anatômica, hormonal e nomenclatura ALIVE 2025',
      headers: ['Classificação', 'Sítio da falha e nomenclatura ALIVE', 'Cortisol / Aldosterona', 'ACTH endógeno esperado'],
      rows: [
        [
          'Primário com desvios eletrolíticos',
          'Córtex adrenal · ==Hipoadrenocorticismo hiponatrêmico e/ou hipercalêmico==',
          'Cortisol baixo; aldosterona baixa ou inadequada',
          'Geralmente elevado (perda de feedback negativo)',
        ],
        [
          'Primário sem desvios eletrolíticos',
          'Córtex adrenal · ==Hipoadrenocorticismo eunatrêmico-eucalêmico==',
          'Cortisol baixo; aldosterona preservada OU já deficiente',
          'Geralmente elevado',
        ],
        [
          'Secundário / Central',
          'Hipófise ou hipotálamo (deficiência de ACTH ou CRH)',
          'Cortisol baixo; ==aldosterona geralmente preservada==',
          'Baixo ou inadequadamente normal',
        ],
        [
          'Iatrogênico por supressão do eixo',
          'Atrofia funcional da zona fasciculada após glicocorticoides exógenos',
          'Produção endógena suprimida; aldosterona preservada',
          'Suprimido',
        ],
        [
          'Iatrogênico por lesão adrenal',
          'Destruição ou inibição enzimática por mitotano, trilostano, cetoconazol ou adrenalectomia',
          'Cortisol baixo; aldosterona pode estar reduzida',
          'Elevado se houver destruição primária',
        ],
      ],
    },
    hacoCausasPrimariasSecundariasEIatrogenicas:
      'A forma primária espontânea em cães é atribuída principalmente à ==destruição adrenocortical imunomediada==, sustentada por achados histopatológicos de infiltrado inflamatório linfoplasmocitário e fibrose próximos ao diagnóstico. Os sinais clínicos costumam emergir quando cerca de 85–90% do córtex adrenal foi comprometido — estimativa conceitual fisiopatológica, e não um limiar histológico individual rígido.\n\n' +
      '- ==Outras causas primárias (cães e gatos)==: atrofia idiopática, ==infiltração neoplásica bilateral== (com destaque para linfoma em gatos, podendo inclusive aumentar o volume adrenal ao ultrassom), hemorragia ou infarto adrenal bilateral por trauma/coagulopatia, e doenças granulomatosas ou infecciosas sistêmicas raras.\n' +
      '- ==Causas iatrogênicas==: uso de ==trilostano== ou ==mitotano== no tratamento do hiperadrenocorticismo (ou cetoconazol em altas doses em gatos), adrenalectomia bilateral e retirada abrupta de glicocorticoides sistêmicos, tópicos, otológicos ou oftálmicos após supressão crônica de CRH/ACTH.',
  },

  epidemiology: {
    hacoEpidemiologiaCaesEGatos:
      'Embora relativamente incomum na população geral, o hipoadrenocorticismo tem alta relevância clínica pela gravidade aguda e pela frequência com que simula gastroenterites e doença renal:\n\n' +
      '- ==Cães==: estudos europeus em atendimento primário e populações seguradas estimam prevalência populacional geral entre ==0,06% e 0,09%== (números que variam conforme definição de caso e não devem ser transpostos diretamente ao Brasil). O diagnóstico concentra-se em cães jovens a adultos de meia-idade, mas pode atingir filhotes e idosos. Observam-se prevalências raciais bem superiores e ==herdabilidades altas== em raças específicas — ==Nova Scotia Duck Tolling Retriever (0,98)==, ==Bearded Collie (0,76)==, ==Poodle Standard (0,75)== e ==Cão de Água Português (0,49)== — além de predisposição descrita em Leonberger, Dogue Alemão, Rottweiler, West Highland White Terrier e Soft Coated Wheaten Terrier.\n' +
      '- ==Gatos==: diagnosticado com frequência muito menor que em cães, historicamente restrito a relatos isolados. Em 2025, Roberts et al. publicaram o ==maior estudo multicêntrico felino (41 casos)==: mediana de idade de ~5,7 anos, sendo ==36 gatos com alterações eletrolíticas e 5 eunatrêmicos-eucalêmicos==, demonstrando definitivamente que o fenótipo com eletrólitos normais também ocorre em gatos {{ref:ref-roberts-2025}}.',
  },

  pathogenesisTransmission: {
    hacoFatoresDesencadeantesDaCrise:
      'Por não ser doença transmissível, o equivalente epidemiológico crítico na cinética clínica do Addison são os ==fatores precipitantes da crise addisoniana==. Em repouso e ambiente protegido, pacientes com reserva cortical mínima podem parecer compensados, porém qualquer evento que eleve a demanda fisiológica por cortisol (cirurgia, anestesia, infecção, gastroenterite, transporte, trauma ou dor) precipita choque circulatório.\n\n' +
      '- ==Em pacientes já diagnosticados==: as causas mais comuns de descompensação são interrupção da medicação pelo tutor, perda de comprimidos orais durante episódios de vômito, intervalo excessivo entre doses de DOCP ou ausência de suplementação temporária de glicocorticoide frente a estresse previsível ou doença intercorrente {{ref:ref-aaha-endo-2023}}.',
  },

  pathophysiology: {
    hacoAnatomiaFisiologiaAdrenalESraa:
      'As glândulas adrenais localizam-se no espaço retroperitoneal cranialmente aos rins e dividem-se em cápsula, ==córtex (~75% da glândula)== e medula interna. A esteroidogênese cortical ocorre em zonas anatomicamente distintas e reguladas por eixos parcialmente independentes:\n\n' +
      '- ==Zona glomerulosa (externa)==: produz ==aldosterona== sob controle principal do sistema renina–angiotensina–aldosterona (SRAA) e da concentração extracelular de potássio — por isso uma deficiência hipofisária isolada de ACTH poupa em grande parte a secreção mineralocorticoide.\n' +
      '- ==Zona fasciculada (média) e zona reticular (interna)==: sintetizam ==cortisol== (e precursores gonadocorticoides na reticular) sob comando direto do eixo hipotálamo (CRH) → adeno-hipófise (ACTH), com retroalimentação negativa pelo cortisol circulante.\n' +
      '- ==Medula adrenal==: sintetiza adrenalina e noradrenalina, permanecendo habitualmente poupada na destruição cortical imunomediada clássica.\n\n' +
      'No néfron distal (túbulo conector e ducto coletor cortical), a aldosterona ativa receptores mineralocorticoides que aumentam canais apicais de sódio (==ENaC==) e a bomba basolateral ==Na⁺/K⁺-ATPase==, promovendo reabsorção de Na⁺ e água e secreção de K⁺ e íons H⁺. Paralelamente, o cortisol mantém gliconeogênese hepática, integridade da mucosa gastrointestinal e ==responsividade da musculatura lisa vascular às catecolaminas==.',
    hacoViasFisiopatologicasAldosteronaECortisol:
      'As manifestações clínicas emergem da soma ou dissociação entre duas cascatas hormonais principais:\n\n' +
      '- ==Via A — Deficiência de aldosterona==: a perda renal obrigatória de Na⁺ e Cl⁻ arrasta água e contrai o volume extracelular (hipovolemia, hipotensão e queda da taxa de filtração glomerular com azotemia pré-renal). Como a contração volêmica estimula liberação não osmótica de vasopressina (ADH), o rim retém água livre apesar de continuar perdendo sódio — ==intensificando paradoxalmente a hiponatremia==. Simultaneamente, a baixa entrega distal de Na⁺ e a ausência de estímulo aos canais secretores provocam ==hipercalemia e acidose metabólica== (presente em ~60% dos cães).\n' +
      '- ==Via B — Deficiência de cortisol==: mesmo com eletrólitos normais (forma eunatrêmica-eucalêmica ou secundária), a falta de cortisol reduz a resposta vascular às catecolaminas (vasodilatação relativa e hipotensão), prejudica a gliconeogênese (==hipoglicemia== especialmente em animais pequenos/jovens ou sob jejum) e altera motilidade, barreira mucosa e perfusão gastrointestinal (vômitos, diarreia, hiporexia, melena e perda de peso).',
    hacoWashoutMedularEExcitabilidadeCardiaca:
      'Duas armadilhas fisiopatológicas explicam os erros diagnósticos mais fatais no pronto-socorro:\n\n' +
      '- ==Via C — Por que a urina fica diluída mesmo na desidratação grave (*washout* medular)==: normalmente, hipovolemia estimula concentração urinária máxima (> 1,035). No Addison com perda crônica de sódio renal, ocorre ==depleção dos solutos do interstício medular renal (*medullary washout*)==, destruindo o gradiente osmótico que a vasopressina utiliza para reabsorver água. Resultado: ==azotemia pré-renal associada à densidade urinária baixa (< 1,030 ou isostenúrica)==, simulando perfeitamente lesão renal intrínseca.\n' +
      '- ==Via D — Hipercalemia e bloqueios cardíacos==: o K⁺ extracelular elevado torna o potencial de repouso miocárdico menos negativo. Inicialmente acelera a repolarização (ondas T altas e apiculadas); com elevações adicionais, inativa continuamente os canais rápidos de sódio e lentifica a condução — causando achatamento ou desaparecimento de onda P, prolongamento de PR, bradicardia sinusal/juncional, ==bloqueio atrioventricular completo==, alargamento do QRS, ritmo sinusoidal e assistolia {{ref:ref-pasca-2025}}. Como a gravidade do ECG nem sempre acompanha linearmente o K⁺ sérico, ambos devem ser avaliados juntos.',
    hacoFiguraEcgHipercalemia: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/hipoadrenocorticismo/pasca-2025-ecg-bav3.png',
      alt: 'Eletrocardiograma de seis derivações de cão em crise hipercalêmica com bloqueio atrioventricular de terceiro grau e ausência de condução efetiva',
      shortCaption: 'Fig. 1 — Bloqueio AV completo na crise hipercalêmica (K⁺ 7,9 mmol/L; Pașca et al., 2025).',
      caption:
        'Figura 1 — Traçado eletrocardiográfico de cão com K⁺ sérico de 7,9 mmol/L durante crise compatível com hipoadrenocorticismo, evidenciando dissociação atrioventricular completa (BAV de 3º grau). Ressalva do relato: os autores não realizaram estimulação por ACTH por indisponibilidade do análogo no momento. Fonte: Pașca et al. (2025), Veterinary Sciences 12(1):63 (CC BY 4.0).',
      display: 'default',
    },
  },

  clinicalSignsPathophysiology: {
    presentationForms: [
      {
        title: 'Forma crônica ou intermitente ("o grande imitador")',
        clinicalMeaning:
          'Episódios recorrentes de hiporexia, vômitos, diarreia, letargia e perda de peso que melhoram transitoriamente com soro e sintomáticos em consultas prévias antes de nova recaída.',
      },
      {
        title: 'Crise addisoniana aguda (emergência)',
        clinicalMeaning:
          'Colapso circulatório, hipovolemia, hipotensão, hipotermia, bradicardia relativa ou taquicardia de choque, tremores por hipoglicemia/hipercalemia e hematoquezia/melena em apresentações graves.',
      },
      {
        title: 'Fenótipo eunatrêmico-eucalêmico (ALIVE 2025)',
        clinicalMeaning:
          'Sinais gastrointestinais crônicos, fraqueza, hipoglicemia, hipocolesterolemia e hipoalbuminemia com Na⁺ e K⁺ dentro da referência — presente tanto em cães quanto em gatos (5 de 41 casos em Roberts et al., 2025) {{ref:ref-alive-2025}} {{ref:ref-roberts-2025}}.',
      },
    ],
    findingsBySystem: [
      {
        system: 'gastrointestinal',
        finding: 'Hiporexia, vômitos, diarreia, perda de peso e melena/hematoquezia',
        frequency: 'Muito frequente (crônica e aguda)',
        clinicalMeaning:
          'Disfunção de barreira mucosa, motilidade e perfusão esplâncnica por hipocortisolismo; ==sangramento digestivo pode elevar desproporcionalmente a ureia frente à creatinina==.',
      },
      {
        system: 'cardiovascular',
        finding: 'Hipotensão, pulsos fracos, choque e bradicardia relativa (ou taquicardia)',
        frequency: 'Crítica na crise',
        clinicalMeaning:
          'Combinação de hipovolemia mineralocorticoide com menor vasorreatividade às catecolaminas; bradicardia apesar de choque hipovolêmico sinaliza ==cardiotoxicidade por hipercalemia==.',
      },
      {
        system: 'urinary',
        finding: 'Azotemia com densidade urinária baixa (< 1,030) ou isostenúrica',
        frequency: 'Armadilha clássica',
        clinicalMeaning:
          '*Washout* medular pela perda crônica de sódio impede concentração urinária máxima apesar da desidratação, simulando LRA/DRC.',
      },
      {
        system: 'neurologic',
        finding: 'Fraqueza muscular severa, tremores, estupor e convulsões',
        frequency: 'Variável / grave na crise',
        clinicalMeaning:
          'Decorre de hipoglicemia (falha de gliconeogênese), hipoperfusão cerebral, hipercalemia grave ou distúrbios osmóticos do Na⁺.',
      },
      {
        system: 'general',
        finding: 'Hipotermia e colapso ao estresse',
        frequency: 'Comum na descompensação',
        clinicalMeaning:
          'Hipoperfusão periférica, queda metabólica e ausência de reserva glicocorticoide diante de infecção, cirurgia ou manipulação.',
      },
    ],
    physicalExamFindings: [
      'Avaliação cardiovascular imediata: palpar pulso femoral, verificar TPC, mucosas, pressão arterial e checar se há bradicardia paradoxal em paciente hipovolêmico (indica ECG imediato).',
      'Hidratação e temperatura: hipotermia associada à desidratação e colapso é fortemente sugestiva de descompensação aguda em cães e gatos.',
      'Abdome e fezes: investigar melena/hematoquezia ao exame retal (pode agravar anemia e hipovolemia e elevar ureia).',
      'Avaliação neurológica e metabólica: checar glicemia capilar imediata diante de fraqueza extrema, tremores ou rebaixamento de consciência.',
    ],
    particularidadesCaninasEFelinas:
      '- Cães: raças com forte base genética incluem Nova Scotia Duck Tolling Retriever, Bearded Collie, Poodle Standard e Cão de Água Português; bradicardia no choque hipovolêmico e hipoalbuminemia/hipocolesterolemia na forma eunatrêmica-eucalêmica são pistas-chave.\n' +
      '- Gatos: diagnóstico muito mais raro, mas série multicêntrica de 41 casos (Roberts et al., 2025) confirmou mediana de ~5,7 anos, predominância de letargia, anorexia, desidratação e hipotermia, presença do fenótipo eunatrêmico-eucalêmico (5/41), hipercalcemia (~31,7%) e associação ocasional com ==insuficiência pancreática exócrina e deficiência de cobalamina== (4/7 testados) {{ref:ref-roberts-2025}}. Além disso, ==gatos respondem mais lentamente à fluidoterapia e reposição na crise do que cães== (podendo levar vários dias para melhora substancial) e linfoma infiltrativo pode manter adrenais com tamanho normal ou até aumentado ao ultrassom.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico interativo — Triagem à confirmação hormonal',
      subtitle: 'Clique nas etapas para consultar pontos de corte de 2025–2026, protocolos por espécie e armadilhas.',
      steps: [
        {
          id: 'haco-diag-1',
          stepNumber: 1,
          title: 'Triagem hematológica, relação Na:K e proteção pré-analítica',
          badge: 'ADMISSÃO · TRIAGEM',
          summary:
            'Buscar ausência de leucograma de estresse, Na:K < 27 e colher soro antes de corticoides interferentes.',
          metrics: [
            { label: 'Relação Na:K', value: '< 27 = gatilho (não confirma)' },
            { label: 'Corticoide seguro', value: 'Dexametasona (após coleta)' },
          ],
          highlights: [
            'Linfócitos e eosinófilos normais ou elevados em paciente gravemente doente sinalizam ausência de cortisol endógeno, embora infecções ou fármacos possam mascarar essa pista.',
          ],
          details: [
            'Avaliar hemoconcentração (pode mascarar anemia não regenerativa pré-reidratação) e densidade urinária antes do soro (azotemia com DU < 1,030 pode simular LRA/DRC por washout medular).',
          ],
        },
        {
          id: 'haco-diag-2',
          stepNumber: 2,
          title: 'Cortisol basal em cães estáveis (dados de 2025–2026)',
          badge: 'TRIAGEM DE EXCLUSÃO · CÃES',
          summary:
            'Cortisol basal > 2 µg/dL reduz drasticamente a probabilidade em cães, mas não possui corte validado equivalente em gatos.',
          metrics: [
            { label: 'Da Silva 2026 (n=982)', value: 'S 98,2% · E 65,8% · VPN 99,8%' },
            { label: 'Sánchez-Lara 2025', value: 'S 93% · E 77% · VPP 25%' },
          ],
          highlights: [
            'VPP de apenas 14,6% em Da Silva et al. (2026): ==cortisol basal ≤ 2 µg/dL NÃO confirma Addison== (317 cães sem a doença tinham cortisol ≤ 2 µg/dL) {{ref:ref-dasilva-2026}}.',
          ],
          details: [
            'Em Da Silva et al. (2026), um cão com Addison apresentou cortisol basal de 2,3 µg/dL — logo o ponto de corte de 2 µg/dL é excelente para triagem, não garantia absoluta de 100% {{ref:ref-dasilva-2026}}.',
            'Cortisol urinário e relação cortisol:creatinina urinária mostraram sensibilidade promissora em Fracassi et al. (2025), mas com amostra pequena; teste rápido SNAP teve boa concordância em Torrano Guillamón et al. (2025) {{ref:ref-fracassi-2025}} {{ref:ref-torrano-2025}}.',
          ],
        },
        {
          id: 'haco-diag-3',
          stepNumber: 3,
          title: 'Teste de estimulação por ACTH (Padrão de confirmação)',
          badge: 'CONFIRMAÇÃO · CÃES E GATOS',
          summary:
            'Mede a reserva funcional do córtex adrenal após cosintropina exógena.',
          metrics: [
            { label: 'Cães (Cosintropina)', value: '5 µg/kg IV/IM (máx. 250 µg)' },
            { label: 'Gatos (Cosintropina)', value: '125 µg/gato ou 5 µg/kg IV' },
          ],
          highlights: [
            'Resposta pós-ACTH tipicamente < 2 µg/dL confirma hipocortisolismo desde que ==excluída supressão prévia por glicocorticoides (inclusive tópicos/otológicos)== {{ref:ref-dasilva-2026}}.',
          ],
          details: [
            'Em cães, também há protocolo alternativo de baixa dose (1 µg/kg IV); com formulação depot (Synacthen Depot IM), a recoleta ocorre em 1–2 horas.',
            'Em gatos, a revisão de Boretti & Sieber-Ruckstuhl (2026) reforça que o ACTH permanece o padrão confirmatório e que cortes basais caninos não se aplicam automaticamente {{ref:ref-boretti-2026}}.',
          ],
        },
        {
          id: 'haco-diag-4',
          stepNumber: 4,
          title: 'Caracterização etiológica (ACTH endógeno, aldosterona e USG)',
          badge: 'FENOTIPAGEM ALIVE 2025',
          summary:
            'Diferenciar forma primária de secundária/iatrogênica e avaliar necessidade mineralocorticoide.',
          metrics: [
            { label: 'ACTH endógeno', value: 'Alto = primário · Baixo = central' },
            { label: 'USG adrenal', value: 'Apoio (não exclui nem confirma)' },
          ],
          highlights: [
            'Coletar ACTH endógeno antes de glicocorticoides e respeitando resfriamento/envio rigorosos pela alta instabilidade da molécula.',
          ],
          details: [
            'Na ultrassonografia, adrenais atrofiadas reforçam a suspeita, mas espessura normal (ou aumentada em linfoma felino) jamais exclui hipoadrenocorticismo {{ref:ref-pasca-2025}}.',
          ],
        },
      ],
    },
    hacoHemogramaBioquimicaEUrinalise:
      'A interpretação integrada do laboratório básico evita confundir Addison com doença renal primária ou enteropatia:\n\n' +
      '- ==Hemograma==: a ==ausência de leucograma de estresse== (linfócitos e eosinófilos preservados em animal gravemente enfermo) é pista clássica, mas tem três limitações: não é exclusiva, pode ser mascarada por infecção bacteriana concomitante e não é obrigatória. Anemia normocítica normocrômica não regenerativa costuma aparecer apenas após correção da hemoconcentração.\n' +
      '- ==Bioquímica e eletrólitos==: hiponatremia, hipercalemia e hipocloremia elevam a suspeita, usando a relação ==Na:K < 27== como gatilho investigativo (lembrando que uroabdome, obstrução uretral, LRA oligoanúrica, tricuríase, pancreatite, CAD e efusões também reduzem Na:K). Azotemia, hiperfosfatemia e acidose metabólica são comuns na crise; ==hipoalbuminemia e hipocolesterolemia== destacam-se na forma eunatrêmica-eucalêmica (simulando enteropatia perdedora de proteínas); ==hipercalcemia== (especialmente em gatos hipercalêmicos, ~31,7% em Roberts et al., 2025) exige preferência pelo cálcio ionizado {{ref:ref-roberts-2025}}.\n' +
      '- ==Urinálise==: densidade urinária < 1,030 apesar de azotemia e desidratação reflete perda do gradiente osmótico medular; a normalização da azotemia com fluidos confirma o componente pré-renal predominante.',
    hacoDiagnosticoHormonalEAnaliseCritica:
      'Os estudos de 2025–2026 refinaram o raciocínio probabilístico no diagnóstico endócrino:\n\n' +
      '- ==Cortisol basal (Sánchez-Lara et al., 2025; Da Silva et al., 2026)==: em 878 testes avaliados por Sánchez-Lara et al. (2025), cortisol basal ≤ 2 µg/dL teve sensibilidade de 93%, especificidade de 77%, VPP de 25% e VPN de 99% no grupo de referência (n=170) {{ref:ref-sanchez-lara-2025}}. Em 982 cães analisados por Da Silva et al. (2026; 55 com Addison), obteve sensibilidade de 98,2%, especificidade de 65,8%, VPP de 14,6% e VPN de 99,8%, registrando 1 falso-negativo com basal de 2,3 µg/dL e 11 falso-positivos na estimulação por exposição prévia a glicocorticoides {{ref:ref-dasilva-2026}}.\n' +
      '- ==Triagem alternativa e clínica rápida (2025)==: cortisol urinário (< 2 µg/dL; S 100%, E 90%) e UCCR (< 8,5 × 10⁻⁶; S 100%, E 71,7%) em Fracassi et al. (2025) são promissores, porém baseados em amostra pequena {{ref:ref-fracassi-2025}}. O teste rápido SNAP (Torrano Guillamón et al., 2025; n=96, 21 com Addison) mostrou sensibilidade basal de 100% (< 2 µg/dL) e especificidade pós-ACTH de 100% (sensibilidade 95,2%), útil quando não há laboratório imediato {{ref:ref-torrano-2025}}.\n' +
      '- ==Interferentes vs. supressão fisiológica==: glicocorticoides (prednisolona, hidrocortisona) causam ==reação cruzada analítica== (falso aumento de cortisol), enquanto uso crônico (inclusive otológico/oftálmico) causa ==supressão do eixo HHA== (falso-positivo de resposta achatada ao ACTH). A dexametasona não cruza de maneira relevante com o ensaio, mas uso crônico também suprime o eixo.\n' +
      '- ==ACTH endógeno, aldosterona e renina==: diferenciam primário (ACTH alto) de secundário (ACTH baixo/normal). Embora aldosterona e atividade de renina plasmática (PRA) revelem insuficiência mineralocorticoide oculta mesmo com Na/K normais, sua coleta pré-analítica estrita e escassez de referência universal impedem o uso obrigatório na rotina ambulatorial {{ref:ref-alive-2025}}.',
    hacoImagemAdrenalEUltrassonografia:
      'Os exames de imagem complementam a investigação, mas jamais substituem o teste de estimulação por ACTH:\n\n' +
      '- ==Radiografia torácica==: pode evidenciar microcardia e redução da silhueta da veia cava caudal por hipovolemia, além de ==megaesôfago== ocasional (frequentemente reversível após estabilização endócrina).\n' +
      '- ==Ultrassonografia adrenal==: redução bilateral da espessura adrenal apoia atrofia cortical, porém espessura preservada não descarta a doença (como demonstrado por Pașca et al., 2025 na figura abaixo). Em gatos, inclusive, glândulas podem ter tamanho normal ou estar aumentadas no linfoma infiltrativo {{ref:ref-pasca-2025}}.',
    hacoFiguraUsgAdrenal: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/hipoadrenocorticismo/pasca-2025-usg-adrenais.png',
      alt: 'Ultrassonografia longitudinal das glândulas adrenais esquerda e direita em cão com suspeita clínica de crise addisoniana',
      shortCaption: 'Fig. 2 — USG adrenal assimétrica: esquerda 3 mm (A) e direita 5,6 mm (B) (Pașca et al., 2025).',
      caption:
        'Figura 2 — Ultrassonografia longitudinal das adrenais em cão com crise hipercalêmica: adrenal esquerda reduzida (3 mm; A) e adrenal direita com espessura preservada (5,6 mm; B). Demonstra concretamente que dimensão adrenal preservada ao ultrassom não exclui hipoadrenocorticismo e não substitui o teste hormonal. Fonte: Pașca et al. (2025), Veterinary Sciences 12(1):63 (CC BY 4.0).',
      display: 'default',
    },
    hacoTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Diagnósticos diferenciais prioritários no plantão',
      headers: ['Diferencial', 'Semelhanças com Addison', 'Dado que favorece o diferencial', 'Como distinguir'],
      rows: [
        [
          'Lesão renal aguda (LRA)',
          'Azotemia, hipercalemia, fraqueza, vômitos',
          'Oligúria/anúria persistente após volume, sedimento ativo, nefrotoxina',
          'Ultrassom renal, urinálise pré-fluido, evolução da creatinina e ACTH.',
        ],
        [
          'Uroabdome / Obstrução uretral',
          'Hiponatremia, hipercalemia (Na:K baixo), bradicardia, azotemia',
          'Efusão abdominal (potássio/creatinina do líquido > soro) ou bexiga distendida',
          'POCUS, paracentese comparativa e desobstrução uretral.',
        ],
        [
          'Gastroenterite grave / Tricuríase canina',
          'Vômito, diarreia, hipovolemia e até Na:K baixo (pseudo-Addison)',
          'Agente identificado ou ovos de Trichuris vulpis ao exame fecal',
          'Coproparasitológico, painel infeccioso e teste de estimulação por ACTH.',
        ],
        [
          'Sepse / Choque distributivo / Pancreatite',
          'Hipotensão, hipoperfusão, hipoalbuminemia, vômitos',
          'Foco infeccioso, neutrofilia/desvio à esquerda ou achado pancreático',
          'Cultura, imagem, resposta hemodinâmica e cortisol/ACTH.',
        ],
        [
          'Enteropatia perdedora de proteínas (EPP)',
          'Diarreia crônica, perda de peso, hipoalbuminemia e hipocolesterolemia',
          'Alteração ultrassonográfica intestinal difusa com reserva adrenal normal',
          'Cortisol basal / ACTH obrigatório antes de concluir EPP idiopática.',
        ],
        [
          'Hipoadrenocorticismo iatrogênico',
          'Clínica e laboratório indistinguíveis da forma primária',
          'Uso de trilostano, mitotano, cetoconazol ou corticoide crônico',
          'Revisão rigorosa de prescrições (incl. colírios e otológicos).',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico interativo — Crise aguda e controle crônico',
      subtitle: 'Selecione cada fase para metas de Na⁺/K⁺, doses auditadas e evidências de 2021–2026.',
      steps: [
        {
          id: 'haco-tx-1',
          stepNumber: 1,
          title: 'Ressuscitação volêmica titulada e proteção osmótica do Na⁺',
          badge: 'HORA 0 · EMERGÊNCIA',
          summary:
            'Corrigir hipovolemia sem provocar elevação excessiva da natremia.',
          metrics: [
            { label: 'Bolus Cães (AAHA 2024)', value: '15–20 mL/kg IV (15–30 min)' },
            { label: 'Bolus Gatos (AAHA 2024)', value: '5–10 mL/kg IV (15–30 min)' },
            { label: 'Teto elevação Na⁺', value: '≤ 0,5 mmol/L/h (≤ 10–12/24 h)' },
          ],
          highlights: [
            'A restauração da perfusão renal muitas vezes corrige a hipercalemia mais rápido do que evitar pequenos traços de K⁺ presentes em soluções balanceadas {{ref:ref-aaha-fluid-2024}}.',
          ],
          details: [
            'Em hiponatremia grave crônica (ex.: Na⁺ 112 mmol/L), grandes volumes de NaCl 0,9% (154 mmol/L de Na⁺) somados à queda da vasopressina pós-expansão podem elevar o Na⁺ rápido demais e precipitar desmielinização osmótica; checar Na⁺ a cada 2–4 h e mirar ≤ 8–10 mmol/L/24 h em alto risco {{ref:ref-aaha-fluid-2024}}.',
          ],
        },
        {
          id: 'haco-tx-2',
          stepNumber: 2,
          title: 'Hipercalemia cardiotóxica e hipoglicemia',
          badge: 'ECG ALTERADO · UTI',
          summary:
            'Proteger membrana miocárdica com cálcio antes de redistribuir o potássio intracelularmente.',
          metrics: [
            { label: 'Gluconato Ca²⁺ 10%', value: '0,5–1 mL/kg IV (10–20 min)' },
            { label: 'Insulina regular', value: '0,2–0,25 UI/kg IV + dextrose' },
          ],
          highlights: [
            'Gluconato de cálcio NÃO reduz o K⁺ sérico — ele antagoniza temporariamente a toxicidade elétrica enquanto fluidos e insulina reduzem o potássio extracelular.',
          ],
          details: [
            'Associar 1 g de dextrose por UI de insulina em bolus seguido de 1–2 g/UI em infusão por 6 h com glicemia horária; bicarbonato de sódio fica restrito a acidemia grave (pH < 7,1 ou HCO₃⁻ < 10 mEq/L) pelo risco osmótico sobre o Na⁺.',
          ],
        },
        {
          id: 'haco-tx-3',
          stepNumber: 3,
          title: 'Reposição glicocorticoide aguda (Dexametasona vs. Hidrocortisona)',
          badge: 'APÓS COLETA · CRISE',
          summary:
            'Restaurar tônus vascular e gliconeogênese sem invalidar o diagnóstico.',
          metrics: [
            { label: 'Dexametasona fosfato', value: '0,1 mg/kg IV q12–24h' },
            { label: 'Hidrocortisona CRI', value: '0,3–0,625 mg/kg/h IV' },
          ],
          highlights: [
            'Use dexametasona se o teste de ACTH ainda for concluído; hidrocortisona oferece atividade dupla (glico + mineralocorticoide), porém interfere nos ensaios de cortisol {{ref:ref-aaha-endo-2023}}.',
          ],
          details: [
            'As faixas de infusão contínua descritas para hidrocortisona variam de 0,3 a 0,625 mg/kg/h IV — ambas exigem coleta hormonal prévia e monitorização glicêmica/eletrolítica.',
          ],
        },
        {
          id: 'haco-tx-4',
          stepNumber: 4,
          title: 'Manutenção crônica e revisão DOCP (2021–2026)',
          badge: 'LONGO PRAZO · CÃES E GATOS',
          summary:
            'Menor dose eficaz de glicocorticoide + mineralocorticoide quando há deficiência.',
          metrics: [
            { label: 'Prednisolona Cães', value: '< 0,1 a 0,25 mg/kg/dia VO' },
            { label: 'Prednisolona Gatos', value: '0,2–0,4 mg/kg q24h VO' },
            { label: 'DOCP inicial', value: '1,1–1,5 (AAHA) vs 2,2 mg/kg (bula)' },
          ],
          highlights: [
            'Iniciar DOCP idealmente após estabilização e com Na⁺ > 130 mmol/L (AAHA 2023). No ensaio de Langlois et al. (2026; n=21), 1,1 mg/kg durou 45 ± 12 d vs 55 ± 16 d com 2,2 mg/kg pela PRA (p = 0,2), porém eletrólitos superestimaram a duração em ~10 dias {{ref:ref-langlois-2026}}.',
          ],
          details: [
            'Não prolongar o intervalo de DOCP além de 7–8 semanas baseando-se apenas em eletrólitos normais {{ref:ref-langlois-2026}}. Em gatos, Boretti & Sieber-Ruckstuhl (2026) recomendam DOCP 2,2 mg/kg SC/mês inicial ou fludrocortisona 0,01–0,02 mg/kg/dia VO e maior suporte de prednisolona {{ref:ref-boretti-2026}}.',
          ],
        },
      ],
    },
    hacoTratamentoCriseFluidoHipercalemiaENa:
      'O tratamento da crise addisoniana equilibra ressuscitação hemodinâmica agressiva o bastante para restaurar a perfusão renal, mas controlada o suficiente para não causar lesão osmótica cerebral:\n\n' +
      '- ==Escolha do fluido e velocidade do Na⁺ (AAHA 2024)==: embora o NaCl 0,9% (154 mmol/L de Na⁺) tenha sido o padrão histórico por não conter potássio, em pacientes com hiponatremia severa crônica (ex.: 112 mmol/L) grandes volumes de NaCl 0,9% — somados à diurese aquosa livre quando a perfusão normaliza e inibe a vasopressina — podem elevar a natremia rápido demais {{ref:ref-aaha-fluid-2024}}. Diretrizes ==AAHA 2024== recomendam ressuscitação titulada com cristaloide isotônico individualizado (bolus de ==15–20 mL/kg IV em cães== e ==5–10 mL/kg IV em gatos== ao longo de 15–30 min), lembrando que pequenas quantidades de K⁺ em cristaloides balanceados não são automaticamente contraindicadas quando restauram a taxa de filtração glomerular. Monitorar Na⁺ a cada 2–4 h, mantendo elevação ≤ 0,5 mmol/L/h e ≤ 10–12 mmol/L/24 h (ou ≤ 8–10 mmol/L/24 h em risco elevado) {{ref:ref-aaha-fluid-2024}}.\n' +
      '- ==Hipercalemia cardiotóxica e reversão eletrocardiográfica==: o manejo divide-se em (1) ==antagonismo elétrico miocárdico imediato== com gluconato de cálcio 10% (0,5–1 mL/kg IV em 10–20 min sob ECG contínuo); (2) ==deslocamento intracelular de K⁺== com insulina regular (0,2–0,25 UI/kg IV) associada a 1 g de dextrose/UI em bolus + 1–2 g/UI em infusão por 6 h sob glicemia horária; e (3) ==excreção renal== via fluidoterapia. Bicarbonato de sódio fica reservado para acidemia severa (pH < 7,1 ou bicarbonato < 10 mEq/L, corrigindo 50% do déficit em 2–4 h) para não agravar o desvio de sódio.',
    hacoFiguraReversaoEcg: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/hipoadrenocorticismo/pasca-2025-ecg-reversao-24h.png',
      alt: 'Eletrocardiograma 24 horas após correção metabólica da hipercalemia demonstrando retorno ao ritmo sinusal a cerca de 110 bpm',
      shortCaption: 'Fig. 3 — Reversão ao ritmo sinusal após 24 h (K⁺ reduzido a 4,8 mmol/L; Pașca et al., 2025).',
      caption:
        'Figura 3 — Mesmo paciente da Figura 1 após 24 horas de tratamento médico e redução do K⁺ sérico de 7,9 para 4,8 mmol/L, demonstrando restauração completa da condução atrioventricular (~110 bpm em ritmo sinusal) sem necessidade de marcapasso permanente. Fonte: Pașca et al. (2025), Veterinary Sciences 12(1):63 (CC BY 4.0).',
      display: 'default',
    },
    hacoTratamentoCronicoDocpEFludrocortisona:
      'Após resolução da crise (idealmente com sódio > 130 mmol/L antes da primeira dose de DOCP segundo AAHA 2023), a manutenção visa a menor dose eficaz para evitar hipercortisolismo iatrogênico e sobrecarga mineralocorticoide {{ref:ref-aaha-endo-2023}}:\n\n' +
      '- ==Glicocorticoides em cães==: AAHA 2023 indica que muitos cães estáveis são mantidos com ==< 0,1 mg/kg/dia== de prednisona/prednisolona, sendo 0,25 mg/kg/dia geralmente suficiente {{ref:ref-aaha-endo-2023}}.\n' +
      '- ==DOCP — dose de bula vs. dose reduzida (Vincent 2021; Langlois 2026)==: além da bula tradicional (2,2 mg/kg SC/IM q25d), a AAHA 2023 sugere início com ==1,1–1,5 mg/kg==, apoiada pelo ensaio duplo-cego de Vincent et al. (2021; n=37), que manteve Na⁺/K⁺ normais por 90 dias com 1,1 mg/kg vs 2,2 mg/kg (embora a PRA e a densidade urinária diferissem entre grupos) {{ref:ref-vincent-2021}}. Em 2026, Langlois et al. (n=21 cães) mostraram duração estimada pela PRA de ==45 ± 12 dias (1,1 mg/kg)== vs ==55 ± 16 dias (2,2 mg/kg)== (p = 0,2), porém alertaram que ==Na⁺ e K⁺ superestimaram a duração de efeito em ~10 dias em relação à PRA== — logo eletrólitos normais não equivalem a supressão mineralocorticoide ótima em todo o intervalo {{ref:ref-langlois-2026}}.\n' +
      '- ==Fludrocortisona==: alternativa oral (0,01 mg/kg VO q12h ou 0,02 mg/kg/dia), podendo dispensar prednisona adicional em alguns cães devido à atividade glicocorticoide intrínseca, desde que monitorado clinicamente.\n' +
      '- ==Particularidades em gatos (Boretti & Sieber-Ruckstuhl, 2026)==: felinos frequentemente requerem doses proporcionais maiores de prednisolona (0,2–0,4 mg/kg VO q24h), somadas a DOCP 2,2 mg/kg SC mensal inicial ou fludrocortisona 0,01–0,02 mg/kg/dia VO (prevalecendo a faixa de 2026 sobre extrapolações antigas) {{ref:ref-boretti-2026}}.',
    hacoTabelaMestreDoses: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Auditoria de doses diagnósticas, de crise e de manutenção (Cães × Gatos)',
      headers: ['Fármaco / Intervenção', 'Espécie e Indicação', 'Dose documentada', 'Via e Frequência', 'Alertas e Fontes'],
      rows: [
        [
          'Cosintropina (ACTH sintético)',
          'Cães · Teste diagnóstico',
          '5 µg/kg (máx. 250 µg/cão) ou 1 µg/kg em protocolo validado',
          'IV ou IM; amostra pós ~60 min',
          'Protocolo de baixa dose (1 µg/kg IV) também é aceito em cães; com Synacthen Depot IM, recoletar em 1–2 h.',
        ],
        [
          'Cosintropina (ACTH sintético)',
          'Gatos · Teste diagnóstico',
          '125 µg/gato (histórico) ou 5 µg/kg',
          'IV ou IM; amostra ~60–75 min',
          'Confirmar protocolo e tempo de recoleta com laboratório de referência {{ref:ref-boretti-2026}}.',
        ],
        [
          'Dexametasona fosfato sódico',
          'Cães e Gatos · Crise (segura pré-ACTH)',
          '0,1 mg/kg',
          'IV q12–24h até tolerar via oral',
          'Não reage de forma relevante no ensaio de cortisol {{ref:ref-aaha-endo-2023}}.',
        ],
        [
          'Hidrocortisona (succinato)',
          'Cães (extrapolação cautelosa em gatos) · Crise',
          '0,3 a 0,625 mg/kg/h',
          'IV em infusão contínua',
          'Atividade dupla glico+mineralo; usar apenas APÓS coleta hormonal.',
        ],
        [
          'Gluconato de cálcio 10%',
          'Cães e Gatos · Hipercalemia com ECG alterado',
          '0,5–1 mL/kg',
          'IV lento (10–20 min) sob ECG contínuo',
          'Protege condução cardíaca; não reduz K⁺ sérico.',
        ],
        [
          'Insulina regular + Dextrose',
          'Cães e Gatos · Redução aguda de K⁺',
          '0,2–0,25 UI/kg insulina + 1 g/UI bolus + 1–2 g/UI por 6 h',
          'IV com monitorização horária de glicemia',
          'Alto risco de hipoglicemia tardia; nunca aplicar sem dextrose.',
        ],
        [
          'Prednisona / Prednisolona',
          'Cães · Manutenção crônica',
          '< 0,1 a 0,25 mg/kg/dia (ajustar à menor dose)',
          'VO q24h',
          'Duplicar/triplicar temporariamente em estresse (AAHA 2023) {{ref:ref-aaha-endo-2023}}.',
        ],
        [
          'Prednisolona',
          'Gatos · Manutenção crônica',
          '0,2–0,4 mg/kg/dia',
          'VO q24h',
          'Gatos exigem dose de manutenção maior que cães {{ref:ref-boretti-2026}}.',
        ],
        [
          'DOCP (Pivalato de desoxicorticosterona)',
          'Cães · Manutenção mineralocorticoide',
          '1,1–1,5 mg/kg (AAHA) ou 2,2 mg/kg (bula)',
          'SC ou IM a cada ~25–30 dias (ajustar por Na/K)',
          'Requer corticoide oral associado; reavaliar Na⁺/K⁺ nos dias 10–14 e 25 {{ref:ref-langlois-2026}}.',
        ],
        [
          'DOCP',
          'Gatos · Manutenção mineralocorticoide',
          '2,2 mg/kg inicial',
          'SC aproximadamente mensal (individualizado)',
          'Revisão felina de Boretti & Sieber-Ruckstuhl (2026) {{ref:ref-boretti-2026}}.',
        ],
        [
          'Fludrocortisona',
          'Cães / Gatos · Alternativa mineralocorticoide oral',
          'Cães: 0,01 mg/kg q12h (ou 0,02/d); Gatos: 0,01–0,02 mg/kg/d',
          'VO q12–24h',
          'Ajustar por Na⁺/K⁺ (revisão felina 2026); vigiar hipernatremia, hipocalemia e hipertensão arterial {{ref:ref-boretti-2026}}.',
        ],
      ],
    },
  },

  prevention: {
    hacoPrevencaoDeCrisesEEducacao:
      'Não há medida comprovada capaz de prevenir a forma primária imunomediada espontânea (além de seleção reprodutiva criteriosa em raças de alta herdabilidade); portanto, ==a prevenção clínica concentra-se em evitar crises addisonianas iatrogênicas ou por subdose==:\n\n' +
      '- ==Suplementação em situações de estresse==: em cães estáveis, a AAHA 2023 orienta duplicar ou triplicar temporariamente a dose diária de prednisona/prednisolona antes de cirurgias, anestesias, viagens estressantes ou doenças intercorrentes, retornando à dose basal assim que o estresse terminar {{ref:ref-aaha-endo-2023}}. Em gatos, a revisão de 2026 reforça o mesmo princípio de reforço glicocorticoide adicional no estresse {{ref:ref-boretti-2026}}.\n' +
      '- ==Alerta de vômitos em casa==: se o paciente vomitar persistentemente, pode não absorver o comprimido oral exatamente quando precisa de mais cortisol — exigindo atendimento rápido para dose parenteral.\n' +
      '- ==Monitoramento estruturado==: após iniciar DOCP, reavaliar clinicamente e dosar Na⁺/K⁺ por volta dos ==dias 10–14 e 25== para ajustar dose e intervalo {{ref:ref-aaha-endo-2023}}. ==Não repetir o teste de estimulação por ACTH== apenas para titular prednisolona de manutenção: o ajuste glicocorticoide é clínico (apetite, energia, peso e ausência de poliúria/polidipsia).',
  },

  complications: {
    hacoTabelaComplicacoesUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Complicações graves, sinais de alarme e prioridade imediata de UTI',
      headers: ['Complicação / Emergência', 'Mecanismo e sinais precoces', 'Prioridade imediata de UTI', 'Impacto prognóstico'],
      rows: [
        [
          'Choque hipovolêmico e distributivo',
          'Perda renal de NaCl + baixa resposta vascular às catecolaminas; TPC lento, pulso fraco, hipotermia',
          'Bolus cristaloide titulado (15–20 mL/kg cães; 5–10 mL/kg gatos) + dexametasona IV',
          'Potencialmente fatal sem ressuscitação precoce.',
        ],
        [
          'Bradicardia e BAV por hipercalemia',
          'Despolarização de repouso e inativação de canais Na⁺; ondas P ausentes, BAV 3º grau, QRS largo',
          'ECG contínuo + gluconato de cálcio 10% IV + insulina regular com dextrose + fluidos',
          'Risco iminente de assistolia; totalmente reversível se tratado a tempo {{ref:ref-pasca-2025}}.',
        ],
        [
          'Síndrome de desmielinização osmótica',
          'Elevação do Na⁺ > 0,5 mmol/L/h em hiponatremia crônica causando desidratação neuronal',
          'Monitorar Na⁺ a cada 2–4 h; ajustar composição e taxa hídrica imediatamente',
          'Sequelas neurológicas graves potencialmente persistentes {{ref:ref-aaha-fluid-2024}}.',
        ],
        [
          'Hipoglicemia aguda',
          'Deficiência de glicocorticoide e falha na gliconeogênese; tremores, torpor, convulsões',
          'Dextrose IV em bolus + infusão contínua monitorada (atenção dobrada se usar insulina)',
          'Reversível quando detectada imediatamente.',
        ],
        [
          'Excesso glicocorticoide ou mineralocorticoide crônico',
          'Sobredose mantida (PU/PD, polifagia, ganho de peso, hipertensão, hipocalemia/hipernatremia)',
          'Reduzir gradualmente prednisolona à menor dose eficaz e revisar DOCP/fludrocortisona/PA',
          'Compromete qualidade de vida e favorece comorbidades {{ref:ref-sherrod-2025}}.',
        ],
      ],
    },
    hacoPrognosticoCaesEGatos:
      'Quando diagnosticado antes do colapso irreversível e acompanhado regularmente, o hipoadrenocorticismo possui prognóstico favorável a longo prazo nas duas espécies:\n\n' +
      '- ==Prognóstico em cães (Sherrod et al., 2025)==: em coorte retrospectiva com 141 cães (125 espontâneos e 16 iatrogênicos), o tempo mediano de sobrevida pós-diagnóstico foi de ==5,7 anos no fenótipo hiponatrêmico/hipercalêmico (n = 47)== e ==5,6 anos no fenótipo eunatrêmico-eucalêmico (n = 9)==, sem diferença estatística entre grupos, com mediana de idade ao óbito em torno de ==11 anos== {{ref:ref-sherrod-2025}}. Os autores também documentaram alta taxa de sinais de excesso de corticoide, reforçando o uso da menor dose eficaz.\n' +
      '- ==Prognóstico em gatos (Roberts et al., 2025)==: no estudo multicêntrico de 41 gatos, ==85,4% (35/41) sobreviveram até a alta hospitalar==, com sobrevida mediana global (todas as causas) de ==2035 dias== (nota: dois casos decorreram de linfoma adrenal e houve heterogeneidade no seguimento pós-alta) {{ref:ref-roberts-2025}}.',
    hacoArmadilhasEMitosClinicos:
      '- ==Mito 1: "Addison sempre cursa com Na⁺ baixo e K⁺ alto"== → Falso. Tanto cães quanto gatos apresentam fenótipo eunatrêmico-eucalêmico (ALIVE 2025), inclusive com possível perda parcial de aldosterona compensada {{ref:ref-alive-2025}} {{ref:ref-roberts-2025}}.\n' +
      '- ==Mito 2: "Cortisol basal ≤ 2 µg/dL confirma ou > 2 µg/dL exclui 100% em qualquer espécie"== → Falso. VPP do cortisol basal é baixo (exige estimulação por ACTH); em cães já se documentou caso positivo com basal de 2,3 µg/dL {{ref:ref-dasilva-2026}}, e em gatos o ponto de corte basal canino não está validado {{ref:ref-boretti-2026}}.\n' +
      '- ==Mito 3: "Eletrólitos normais garantem reposição mineralocorticoide perfeita e na crise só existe NaCl 0,9%"== → Falso. Estudos com PRA mostram que eletrólitos superestimam a duração do DOCP em ~10 dias {{ref:ref-langlois-2026}}, e na crise o NaCl 0,9% em excesso pode corrigir a hiponatremia rápido demais segundo AAHA 2024 {{ref:ref-aaha-fluid-2024}}.',
  },

  references: [
    {
      id: 'ref-aaha-endo-2023',
      authors: 'AAHA',
      title: '2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines',
      journal: 'Journal of the American Animal Hospital Association',
      year: 2023,
      volume: '59',
      pages: '113-135',
      doi: '10.5326/JAAHA-MS-7368',
      url: 'https://doi.org/10.5326/JAAHA-MS-7368',
      sourceType: 'Consenso / Diretriz clínica',
      evidenceLevel: 'Diretriz internacional',
    },
    {
      id: 'ref-alive-2025',
      authors: 'Niessen SJM, et al.',
      title: "Agreeing Language in Veterinary Endocrinology (ALIVE): Cushing's Syndrome and Hypoadrenocorticism — A Modified Delphi-Method-Based System to Create Consensus Definitions",
      journal: 'Veterinary Sciences',
      year: 2025,
      volume: '12',
      issue: '8',
      pages: '761',
      doi: '10.3390/vetsci12080761',
      url: 'https://doi.org/10.3390/vetsci12080761',
      sourceType: 'Consenso internacional ALIVE',
      evidenceLevel: 'Consenso Delphi modificado',
    },
    {
      id: 'ref-aaha-fluid-2024',
      authors: 'Pardo M, et al.',
      title: '2024 AAHA Fluid Therapy Guidelines for Dogs and Cats',
      journal: 'Journal of the American Animal Hospital Association',
      year: 2024,
      volume: '60',
      pages: '131-163',
      doi: '10.5326/JAAHA-MS-7444',
      url: 'https://doi.org/10.5326/JAAHA-MS-7444',
      sourceType: 'Diretriz clínica',
    },
    {
      id: 'ref-bsava-endo-5ed',
      authors: 'Boag A; Fowlie S, Ramsey IK (In: Mooney CT, Peterson ME, Shiel RE, eds.)',
      title: 'Cap. 28 (Canine hypoadrenocorticism) & Cap. 31 (Feline hypoadrenocorticism) — BSAVA Manual of Canine and Feline Endocrinology (5th Edition)',
      journal: 'BSAVA',
      year: 2023,
      pages: 'pp. 258-270; 303-308',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Cap. 50: Disorders of the Adrenal Gland — Small Animal Internal Medicine (6th Edition)',
      journal: 'Elsevier',
      year: 2020,
      pages: 'pp. 883-889',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-dibartola-4ed',
      authors: 'DiBartola SP (ed.)',
      title: 'Fluid Therapy in Endocrine and Metabolic Disorders — Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Edition)',
      journal: 'Saunders Elsevier',
      year: 2012,
      pages: 'pp. 506-509',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-feline-ecc-2ed',
      authors: 'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.)',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 369-370',
      sourceType: 'Livro-texto de emergência felina (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Cosyntropin; Desoxycorticosterone Pivalate",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 313-315; 355-357',
      sourceType: 'Formulário farmacológico (acervo local)',
    },
    {
      id: 'ref-bsava-10ed',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition) — Fludrocortisone; Hydrocortisone',
      journal: 'BSAVA',
      year: 2020,
      pages: 'pp. 168-169; 196-197',
      sourceType: 'Formulário farmacológico (acervo local)',
    },
    {
      id: 'ref-macintire-2ed',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Cardiac Emergencies (Hyperkalemia)',
      journal: 'Wiley-Blackwell',
      year: 2012,
      pages: 'pp. 222-223',
      sourceType: 'Livro-texto de emergência (acervo local)',
    },
    {
      id: 'ref-sanchez-lara-2025',
      authors: 'Sánchez-Lara D, et al.',
      title: 'Reassessing the role of basal cortisol in ACTH stimulation testing for canine hypoadrenocorticism',
      journal: 'Frontiers in Veterinary Science',
      year: 2025,
      volume: '12',
      pages: '1686045',
      doi: '10.3389/fvets.2025.1686045',
      url: 'https://doi.org/10.3389/fvets.2025.1686045',
      sourceType: 'Estudo diagnóstico retrospectivo (878 testes)',
    },
    {
      id: 'ref-dasilva-2026',
      authors: 'Da Silva, et al.',
      title: 'Evaluation of basal cortisol and the adrenocorticotropic hormone stimulation test in 982 dogs undergoing investigation for hypoadrenocorticism',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2026,
      volume: '40',
      issue: '5',
      pages: 'aalag188',
      doi: '10.1093/jvimsj/aalag188',
      url: 'https://doi.org/10.1093/jvimsj/aalag188',
      sourceType: 'Estudo diagnóstico retrospectivo (982 cães)',
    },
    {
      id: 'ref-fracassi-2025',
      authors: 'Fracassi F, et al.',
      title: 'Comparison of urinary cortisol, urinary cortisol-to-creatinine ratio, and basal serum cortisol as screening tests for hypoadrenocorticism in dogs',
      journal: 'American Journal of Veterinary Research',
      year: 2025,
      volume: '86',
      issue: '3',
      doi: '10.2460/ajvr.24.10.0296',
      url: 'https://doi.org/10.2460/ajvr.24.10.0296',
      sourceType: 'Estudo diagnóstico multicêntrico',
    },
    {
      id: 'ref-torrano-2025',
      authors: 'Torrano Guillamón A, et al.',
      title: 'Diagnostic performance of an in-clinic cortisol assay in dogs with suspected hypoadrenocorticism',
      journal: 'American Journal of Veterinary Research',
      year: 2025,
      doi: '10.2460/ajvr.25.04.0132',
      url: 'https://doi.org/10.2460/ajvr.25.04.0132',
      sourceType: 'Estudo diagnóstico prospectivo (SNAP)',
    },
    {
      id: 'ref-vincent-2021',
      authors: 'Vincent AM, et al.',
      title: 'Low-dose desoxycorticosterone pivalate treatment of hypoadrenocorticism in dogs: a randomized controlled clinical trial',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2021,
      volume: '35',
      pages: '1720-1728',
      doi: '10.1111/jvim.16195',
      url: 'https://doi.org/10.1111/jvim.16195',
      sourceType: 'Ensaio clínico randomizado duplo-cego',
    },
    {
      id: 'ref-langlois-2026',
      authors: 'Langlois DK, et al.',
      title: 'Pharmacokinetics and pharmacodynamics of desoxycorticosterone pivalate in dogs with hypoadrenocorticism',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2026,
      volume: '40',
      issue: '1',
      pages: 'aalaf003',
      doi: '10.1093/jvimsj/aalaf003',
      url: 'https://doi.org/10.1093/jvimsj/aalaf003',
      sourceType: 'Ensaio prospectivo randomizado PK/PD (21 cães)',
    },
    {
      id: 'ref-sherrod-2025',
      authors: 'Sherrod TN, Lashnits E, Lunn KF',
      title: 'Clinical characteristics, treatment, and outcomes of hypoadrenocorticism in dogs',
      journal: 'Journal of Small Animal Practice',
      year: 2025,
      volume: '66',
      pages: '627-635',
      doi: '10.1111/jsap.13870',
      url: 'https://doi.org/10.1111/jsap.13870',
      sourceType: 'Estudo retrospectivo de sobrevida (141 cães)',
    },
    {
      id: 'ref-roberts-2025',
      authors: 'Roberts, et al.',
      title: 'Clinical findings, treatment, and outcomes in cats with naturally occurring hypoadrenocorticism: 41 cases',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2025,
      doi: '10.1111/jvim.17243',
      url: 'https://doi.org/10.1111/jvim.17243',
      sourceType: 'Estudo multicêntrico felino (41 gatos)',
    },
    {
      id: 'ref-boretti-2026',
      authors: 'Boretti FS, Sieber-Ruckstuhl NS',
      title: 'Feline hypoadrenocorticism: Emerging insights into clinical features, diagnosis, and treatment',
      journal: 'Schweizer Archiv für Tierheilkunde',
      year: 2026,
      volume: '168',
      pages: '96-108',
      doi: '10.17236/sat00479',
      url: 'https://doi.org/10.17236/sat00479',
      sourceType: 'Revisão clínica felina recente',
    },
    {
      id: 'ref-pasca-2025',
      authors: 'Pașca PM, et al.',
      title: 'Transient Third-Degree Atrioventricular Block in a Dog with Addisonian Crisis',
      journal: 'Veterinary Sciences',
      year: 2025,
      volume: '12',
      issue: '1',
      pages: '63',
      doi: '10.3390/vetsci12010063',
      url: 'https://doi.org/10.3390/vetsci12010063',
      sourceType: 'Relato de caso e acervo visual (Figs. 1–3, CC BY 4.0)',
    },
    {
      id: 'ref-msd-addison',
      authors: 'MSD / Merck Veterinary Manual',
      title: 'Addison Disease (Hypoadrenocorticism) in Animals',
      journal: 'Merck & Co.',
      year: 2024,
      url: 'https://www.merckvetmanual.com/endocrine-system/the-adrenal-glands/addison-disease-hypoadrenocorticism-in-animals',
      sourceType: 'Fonte institucional',
    },
  ],
};
