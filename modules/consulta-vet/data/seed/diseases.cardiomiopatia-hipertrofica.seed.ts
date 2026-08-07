import type { DiseaseRecord } from '../../types/disease';

export const cardiomiopatiaHipertroficaRecord: DiseaseRecord = {
  id: 'disease-cardiomiopatia-hipertrofica',
  slug: 'cardiomiopatia-hipertrofica-caes-gatos',
  title: 'Cardiomiopatia hipertrófica (CMH)',
  synonyms: [
    'CMH',
    'Cardiomiopatia hipertrófica felina',
    'Cardiomiopatia hipertrófica obstrutiva',
  ],
  species: ['cat', 'dog'],
  category: 'cardiologia',
  tags: ['CMH', 'Ecocardiografia', 'Gato', 'Átrio esquerdo', 'Tromboembolismo', 'Sirolimo', 'Clopidogrel'],
  quickSummary:
    'A cardiomiopatia hipertrófica (CMH) é definida por espessamento do ventrículo esquerdo que não pode ser explicado apenas por hipertensão, hipertireoidismo, acromegalia, desidratação ou outra sobrecarga. É o fenótipo miocárdico mais comum em gatos; em cães, a forma primária é rara. O músculo espessado relaxa mal, eleva a pressão de enchimento, dilata o átrio esquerdo e pode culminar em edema pulmonar, efusão pleural, tromboembolismo arterial ou morte súbita. A ecocardiografia é o exame de referência para confirmar o fenótipo, excluir mimetizadores e estratificar risco. O tratamento depende do estágio: muitos gatos subclínicos apenas são monitorados; pacientes de alto risco podem precisar de tromboprofilaxia; insuficiência cardíaca exige diurese e suporte; e o sirolimo de liberação retardada tornou-se, em 2025, o primeiro produto com aprovação condicional nos EUA para controlar hipertrofia ventricular em gatos com CMH subclínica criteriosamente selecionados.',
  quickDecisionStrip: [
    'Sopro não confirma CMH e sua ausência não a exclui; galope ou arritmia aumentam a suspeita.',
    'Ecocardiografia é o exame de referência; pressão arterial e T4 total ajudam a excluir hipertrofia secundária.',
    'Átrio esquerdo aumentado, contraste espontâneo ou trombo intracardíaco elevam o risco de tromboembolismo.',
    'Dispneia felina: minimizar estresse, fornecer oxigênio, usar ultrassonografia à beira do leito e tratar a congestão antes de exames demorados.',
    'Atenolol não é tratamento automático para toda CMH; priorizar obstrução dinâmica relevante ou taquiarritmia.',
    'Sirolimo de liberação retardada: apenas CMH subclínica selecionada; não extrapolar para insuficiência cardíaca, diabetes ou hepatopatia.',
  ],
  quickSummaryRich: {
    lead:
      'Na CMH, a parede grossa é apenas o começo do raciocínio. O problema clínico central é o relaxamento diastólico: o ventrículo recebe sangue sob pressão, o átrio esquerdo passa a funcionar como reservatório de alta pressão e surgem congestão e estase. Por isso, espessura isolada não define prognóstico; tamanho e função atrial, obstrução da via de saída, arritmias, contraste espontâneo e histórico de congestão ou tromboembolismo pesam mais na decisão.',
    leadHighlights: ['relaxamento diastólico', 'átrio esquerdo', 'congestão', 'tromboembolismo'],
    pillars: [
      {
        title: 'Fenótipo, não causa única',
        body:
          'CMH descreve hipertrofia ventricular. Antes de chamá-la de primária, exclua hipertensão sistêmica, hipertireoidismo, hipersomatotropismo, desidratação e doença infiltrativa.',
        highlights: ['exclua hipertensão', 'hipertireoidismo'],
      },
      {
        title: 'Risco guiado pelo átrio',
        body:
          'Dilatação atrial esquerda, função atrial reduzida, contraste espontâneo e trombo indicam estase e maior risco de insuficiência cardíaca e tromboembolismo; o estágio é mais útil que o rótulo isolado.',
        highlights: ['Dilatação atrial esquerda', 'contraste espontâneo'],
      },
      {
        title: 'Tratamento por estágio',
        body:
          'Não há um protocolo universal. O estágio B1 costuma ser acompanhado; B2 exige análise de risco; C trata congestão e trombose; D individualiza a doença refratária.',
        highlights: ['B1', 'B2', 'C', 'D'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Estabilizar se houver dispneia',
          timing: 'Primeira avaliação',
          detail:
            'Pouco manuseio, oxigênio e ultrassom focado; toracocentese se efusão pleural comprometer ventilação; radiografia somente quando tolerado (Luis Fuentes et al., ACVIM 2020; Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Confirmar o fenótipo',
          timing: 'Após estabilização',
          detail:
            'Ecocardiografia 2D, M-mode e Doppler: espessura regional, tamanho e função atrial, relaxamento, SAM, gradiente de VVE e trombo — padrão ouro (Luis Fuentes et al., ACVIM 2020).',
        },
        {
          label: 'Excluir causas secundárias',
          timing: 'Antes de rotular primária',
          detail:
            'Pressão arterial, T4 total e contexto clínico; IGF-1 se hipersomatotropismo; reavaliar após hidratação se pseudohipertrofia plausível (Nelson & Couto, 6ª ed.; Luis Fuentes et al., ACVIM 2020).',
        },
        {
          label: 'Estimar risco',
          timing: 'Na ecocardiografia inicial',
          detail:
            'Integrar átrio esquerdo, contraste espontâneo ou trombo, função sistólica, arritmias, NT-proBNP e histórico de ICC ou tromboembolismo (Luis Fuentes et al., ACVIM 2020).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'B1 — baixo risco',
          detail:
            'Sem sinais e sem dilatação atrial relevante: monitorar; não há benefício comprovado de atenolol, IECA ou clopidogrel universais (Luis Fuentes et al., ACVIM 2020).',
          duration: 'Eco a cada 6–12 meses no subclínico.',
          reassess: 'Reavaliar mais cedo se átrio aumentar, arritmia ou nova sintomatologia.',
        },
        {
          label: 'B2 — maior risco',
          detail:
            'Considerar clopidogrel quando risco trombótico alto; tratar obstrução/taquiarritmia selecionada; sirolimo de liberação retardada em CMH subclínica selecionada (Hogan et al., FAT CAT 2015; Kaplan et al., RAPACAT 2023; FDA Felycin 2025).',
          dose: 'Clopidogrel 18,75 mg/gato VO q24h. Atenolol 6,25 mg/gato VO q12h titulado se obstrução/taquiarritmia. Sirolimo 0,3 mg/kg VO q7d (aprovação condicional EUA).',
          duration: 'Clopidogrel contínuo se indicado; sirolimo conforme protocolo regulatório.',
          reassess: 'Monitorar sangramento, função hepática e glicemia com sirolimo.',
        },
        {
          label: 'C — insuficiência cardíaca ou tromboembolismo',
          detail:
            'Furosemida e suporte para congestão; toracocentese quando indicada; analgesia opioide e antitrombóticos no TEA (Hogan et al., FAT CAT 2015; Plumb\'s, 10ª ed.).',
          dose: 'Furosemida titulada à resposta. Clopidogrel 18,75 mg/gato q24h na prevenção secundária de TEA.',
          duration: 'Diurético na menor dose eficaz; antitrombótico conforme risco.',
          reassess: 'FR dormindo >30–35/min ou ganho de peso = reavaliar congestão.',
        },
        {
          label: 'D — refratária',
          detail:
            'Ajustar diurético, considerar torsemida e combinações especializadas; revisar perfusão renal e qualidade de vida (Nelson & Couto, 6ª ed.; Plumb\'s, 10ª ed.).',
          reassess: 'Creatinina e eletrólitos após intensificar diurético.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'Na maioria dos gatos, a etiologia individual permanece desconhecida. Variantes em MYBPC3 foram associadas à CMH em Maine Coon e Ragdoll, com penetrância incompleta; teste genético positivo indica risco, não gravidade, e teste negativo não exclui CMH causada por outras variantes.',
    secundaria:
      'Hipertensão sistêmica, hipertireoidismo, hipersomatotropismo, estenose subaórtica e infiltração miocárdica podem produzir hipertrofia secundária. A desidratação reduz a cavidade ventricular e pode criar pseudohipertrofia transitória.',
    caes:
      'A CMH primária canina é incomum e descrita sobretudo de forma esporádica. Em cão com parede espessa, exclua primeiro sobrecarga pressórica, endocrinopatia, doença infiltrativa e variação racial.',
  },
  epidemiology: {
    felinos:
      'Luis Fuentes et al. (2020) reuniram estudos ecocardiográficos que estimam prevalência próxima de 15% na população felina geral e de até cerca de 29% em gatos idosos, mesmo após excluir hipertensão e hipertireoidismo. Muitos permanecem subclínicos por anos.',
    perfil:
      'Machos são representados com maior frequência e podem desenvolver hipertrofia mais acentuada. Maine Coon, Ragdoll, Sphynx, British Shorthair e Persa aparecem em coortes e linhagens familiares, mas gatos sem raça definida também são frequentemente afetados.',
    desfechos:
      'Entre os gatos que descompensam, insuficiência cardíaca congestiva é a apresentação clínica mais comum, seguida por tromboembolismo arterial; morte súbita ocorre em uma minoria. Dilatação atrial, ritmo de galope, arritmia e disfunção sistólica elevam o risco.',
  },
  pathogenesisTransmission: {
    progressao: [
      'Alteração sarcomérica ou estímulo secundário aumenta a espessura e a desorganização dos cardiomiócitos; fibrose intersticial piora relaxamento e reserva coronariana.',
      'Relaxamento lento e baixa complacência elevam a pressão diastólica do ventrículo esquerdo; o átrio esquerdo dilata para acomodar o gradiente de enchimento.',
      'A pressão atrial elevada é transmitida às veias pulmonares, causando edema pulmonar e/ou derrame pleural.',
      'Dilatação e hipocontratilidade atriais geram estase; com hipercoagulabilidade e lesão endotelial, forma-se trombo, geralmente no apêndice atrial esquerdo, que pode embolizar para a trifurcação aórtica.',
    ],
    obstrucao:
      'O movimento anterior sistólico da valva mitral aproxima o folheto do septo, estreita dinamicamente a via de saída e causa regurgitação mitral. Taquicardia, baixa pré-carga e aumento da contratilidade intensificam o gradiente; fluidoterapia, estresse e vasodilatação devem ser individualizados.',
    transmissao:
      'Não é contagiosa. Em famílias com mutação conhecida, há risco hereditário; o rastreio deve combinar genótipo e ecocardiografia seriada.',
  },
  pathophysiology:
    'A CMH é predominantemente uma doença diastólica: a parede hipertrofiada e fibrosada relaxa mal, reduz o enchimento e eleva a pressão atrial. A taquicardia encurta ainda mais a diástole; por isso um ritmo de galope ou uma taquiarritmia pode precipitar congestão. A baixa reserva coronariana favorece isquemia, troponina elevada, arritmias e áreas de adelgaçamento. Quando a pressão hidrostática pulmonar supera a capacidade linfática, surge edema; quando predomina estase atrial, cresce o risco de tromboembolismo.',
  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Sopro sistólico em foco mitral ou paraesternal',
          mechanism:
            'O movimento anterior sistólico da valva mitral aproxima o folheto do septo interventricular, estreitando dinamicamente a via de saída do ventrículo esquerdo e gerando turbulência audível; regurgitação mitral funcional pode coexistir.',
          clinicalMeaning: 'A intensidade varia com estresse e pré-carga; sopro isolado não mede gravidade nem substitui ecocardiografia.',
          priority: 'common',
        },
        {
          finding: 'Som de galope (terceira bulha)',
          mechanism:
            'O enchimento ventricular rápido contra parede pouco complacente produz vibração audível na fase diastólica precoce.',
          clinicalMeaning: 'Aumenta a suspeita de cardiomiopatia com disfunção diastólica ou congestão incipiente.',
          priority: 'common',
        },
        {
          finding: 'Arritmias, síncope ou morte súbita',
          mechanism:
            'Fibrose, isquemia subendocárdica e distensão atrial criam substrato elétrico instável; taquiarritmias ou queda abrupta de débito reduzem perfusão cerebral.',
          clinicalMeaning: 'Exige ECG prolongado ou Holter; tratar como marcador de alto risco.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia, dispneia e ortopneia',
          mechanism:
            'A elevação da pressão de enchimento esquerda transmite-se às veias pulmonares; quando a pressão capilar supera a capacidade linfática, extravasa líquido para interstício e alvéolos. Efusão pleural restringe expansão pulmonar.',
          clinicalMeaning: 'Emergência cardiopulmonar em gatos — estabilizar antes de exames estressantes.',
          priority: 'heart-failure',
        },
        {
          finding: 'Tosse (menos típica que em cães)',
          mechanism:
            'Bronquios principais comprimidos por átrio esquerdo muito dilatado ou edema peribrônquico podem provocar tosse; muitas vezes o gato apresenta apenas dispneia.',
          clinicalMeaning: 'Não atribuir tosse isolada à CMH sem imagem; dispneia felina tem prioridade sobre tosse como sinal guia.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Dor aguda, paresia ou paralisia de membros pélvicos, extremidades frias, pulsos femorais ausentes',
          mechanism:
            'Tromboembolismo aórtico interrompe fluxo arterial distal à trifurcação; isquemia muscular e nervosa produz dor intensa e déficit motor.',
          clinicalMeaning: 'Emergência — analgesia imediata, antitrombóticos e avaliação de reperfusão; prognóstico reservado mesmo com tratamento.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Hipotermia, azotemia pré-renal e fraqueza',
          mechanism:
            'Baixo débito cardíaco ativa vasoconstrição periférica e reduz perfusão renal; hipotermia reflete baixo fluxo cutâneo em insuficiência cardíaca avançada.',
          clinicalMeaning: 'Sugere descompensação grave ou choque cardiogênico — priorizar perfusão e diurese titulada.',
          priority: 'low-output',
        },
        {
          finding: 'Assintomático ou ausculta normal',
          mechanism:
            'Muitos gatos permanecem subclínicos por anos; obstrução dinâmica e dilatação atrial podem existir sem sopro audível em consultório calmo.',
          clinicalMeaning: 'Ausculta normal não exclui CMH — ecocardiografia é necessária em raças de risco ou quando há dispneia/tromboembolismo.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem clínica e estabilidade',
      purpose: 'Distinguir congestão, tromboembolismo e baixo débito antes de exames demorados.',
      description:
        'Avalie padrão respiratório, temperatura, perfusão, pulso e ritmo. Em dispneia felina: mínimo manuseio, oxigênio e ultrassom focal à beira do leito; adie radiografia completa se o posicionamento aumentar estresse (Luis Fuentes et al., ACVIM 2020; Nelson & Couto, 6ª ed.).',
      interpretation:
        'Taquipneia com edema ou efusão aponta para insuficiência cardíaca; membros pélvicos frios e dolorosos sugerem tromboembolismo arterial.',
      limitations: 'Exame físico normal não exclui CMH subclínica ou obstrução dinâmica intermitente.',
    },
    {
      stepNumber: 2,
      title: 'Ecocardiografia completa com Doppler',
      purpose: 'Confirmar o fenótipo estrutural, quantificar hipertrofia e estratificar risco.',
      description:
        'Medir espessura em múltiplos segmentos, tamanho e função atrial, padrão de enchimento, SAM, gradiente de VVE, regurgitação mitral e presença de trombo ou contraste espontâneo. Luis Fuentes et al. (2020) consideram espessura máxima ≥6 mm compatível com hipertrofia no gato adulto.',
      interpretation: 'Hipertrofia com átrio esquerdo aumentado, obstrução dinâmica ou trombo eleva risco de insuficiência cardíaca e tromboembolismo.',
      limitations: 'Zona cinzenta, tamanho corporal, desidratação e variabilidade interobservador exigem interpretação por cardiologista quando possível.',
      isGoldStandard: true,
    },
    {
      stepNumber: 3,
      title: 'Pressão arterial, T4 total e mimetizadores',
      purpose: 'Excluir hipertrofia secundária antes de rotular CMH primária.',
      description:
        'Pressão arterial e T4 total são obrigatórios em gato adulto ou idoso. Solicite IGF-1 se houver diabetes resistente, crescimento de tecidos moles ou organomegalia. Repita ecocardiograma após corrigir desidratação se pseudohipertrofia for plausível.',
      interpretation: 'Hipertensão ou hipertireoidismo explicam parte dos casos; tratar a causa pode reduzir espessura.',
      limitations: 'Normalidade de T4 isolado não exclui hipertireoidismo limítrofe — repetir se suspeita clínica persistir.',
    },
    {
      stepNumber: 4,
      title: 'Radiografia torácica ou ultrassonografia à beira do leito',
      purpose: 'Documentar congestão pulmonar ou efusão pleural.',
      description:
        'Radiografia confirma edema, derrame e cardiomegalia, mas não classifica fenótipo com segurança. Ultrassom à beira do leito reduz manipulação em paciente instável.',
      interpretation: 'Veias pulmonares distendidas e padrão intersticial/alveolar sustentam insuficiência cardíaca esquerda.',
      limitations: 'Radiografia normal não exclui CMH; adiar se posicionamento piorar dispneia.',
    },
    {
      stepNumber: 5,
      title: 'NT-proBNP e troponina I',
      purpose: 'Triagem e apoio prognóstico; separar dispneia cardíaca de não cardíaca.',
      description:
        'NT-proBNP auxilia triagem; troponina I indica lesão miocárdica. Nenhum substitui ecocardiografia.',
      interpretation: 'BNP elevado aumenta suspeita cardíaca; troponina alta sugere lesão aguda ou isquemia.',
      limitations: 'Resultado normal não exclui doença leve; comorbidades renais alteram BNP.',
    },
    {
      stepNumber: 6,
      title: 'ECG e Holter',
      purpose: 'Identificar arritmias que precipitam congestão, síncope ou morte súbita.',
      description:
        'Indicado em síncope, pulso irregular ou taquicardia persistente. Holter quantifica ectopia intermitente.',
      interpretation: 'Taquiarritmia ou fibrilação atrial muda conduta de frequência e antitrombótico.',
      limitations: 'ECG curto normal não exclui arritmia episódica.',
    },
    {
      stepNumber: 7,
      title: 'Genética (MYBPC3)',
      purpose: 'Rastreio reprodutivo e vigilância em raças predispostas.',
      description:
        'Teste útil em Maine Coon e Ragdoll para seleção reprodutiva; penetrância incompleta.',
      interpretation: 'Positivo indica risco, não gravidade; negativo não exclui CMH por outras variantes.',
      limitations: 'Não substitui ecocardiografia seriada nem define tratamento isoladamente.',
    },
  ],
  treatment: {
    preclinica: [
      'Luis Fuentes et al. (2020), no consenso ACVIM sobre cardiomiopatias felinas, não recomendam atenolol, IECA ou clopidogrel universais em estágio B1 (subclínico sem dilatação atrial relevante). Conclusão: monitorar com ecocardiografia a cada 6–12 meses.',
      'Kaplan et al. (2023), no ensaio RAPACAT com gatos com CMH subclínica não obstrutiva, estudaram sirolimo de liberação retardada 0,3 mg/kg semanal por 180 dias e observaram interrupção da progressão da hipertrofia na dose baixa. Conclusão: não houve prevenção comprovada de insuficiência cardíaca, tromboembolismo ou morte; a FDA concedeu aprovação condicional nos EUA em 2025 apenas para subgrupo selecionado, com triagem de diabetes e hepatopatia.',
      'Em estágio B2 com risco trombótico elevado (átrio esquerdo grande, contraste espontâneo ou trombo), considerar clopidogrel 18,75 mg/gato por via oral a cada 24 horas conforme estratificação individual (Luis Fuentes et al., ACVIM 2020).',
    ],
    aguda: [
      'Insuficiência cardíaca congestiva aguda: ambiente calmo, oxigênio, furosemida parenteral titulada à resposta e toracocentese se efusão pleural comprometer ventilação. Evite fluidoterapia empírica antes de avaliar congestão (Nelson & Couto, 6ª ed.; Plumb\'s, 10ª ed.).',
      'Tromboembolismo arterial agudo: analgesia opioide imediata, suporte térmico prudente, avaliação de potássio e lesão de reperfusão, clopidogrel e anticoagulação individualizada. Trombolítico não é rotina por risco de reperfusão e benefício incerto (Hogan et al., FAT CAT, 2015).',
    ],
    cronica: [
      'Schober et al. (2021), em ensaio com gatos com CMH e insuficiência cardíaca recente, compararam pimobendan e placebo por 180 dias e não encontraram benefício no desfecho primário. Conclusão: uso individualizado apenas para disfunção sistólica ou baixo débito, especialmente sem obstrução dinâmica importante.',
      'Hogan et al. (2015), no ensaio FAT CAT com 75 gatos sobreviventes de tromboembolismo, compararam clopidogrel 18,75 mg/gato ao dia com ácido acetilsalicílico. A mediana até recorrência foi 443 dias com clopidogrel e 192 dias com ácido acetilsalicílico. Conclusão: clopidogrel é base da prevenção secundária.',
      'Obstrução dinâmica ou taquiarritmia selecionada: atenolol 6,25 mg/gato por via oral a cada 12 horas, titulado por frequência, pressão e ecocardiograma. Evitar em insuficiência cardíaca descompensada, choque ou bradicardia (Plumb\'s, 10ª ed.).',
      'Diltiazem para taquiarritmia supraventricular em casos selecionados; Budde e McCluskey (2023) descrevem 7,5–15 mg/gato VO duas a três vezes ao dia (imediato) ou 30–45 mg/gato VO q24h (prolongado). Evidência de modificação estrutural da CMH é fraca.',
      'Rivaroxabana 0,5–1 mg/kg VO q12–24 h ou 2,5 mg/gato ao dia em associação com clopidogrel: uso extra-bula com evidência limitada; monitorar função renal, hepática e sangramento (Plumb\'s, 10ª ed.; Jaturanratsamee et al., 2024).',
    ],
    monitoramento: [
      'Frequência respiratória dormindo: tendência sustentada acima do basal ou >30–35/min merece contato e reavaliação.',
      'Peso, apetite, pressão arterial, ureia/creatinina e eletrólitos 3–7 dias após mudanças relevantes de diurético, depois conforme estabilidade.',
      'Ecocardiografia em 6–12 meses no subclínico, mais cedo se átrio aumentado, progressão, arritmia ou nova sintomatologia.',
      'Hemograma, função renal/hepática e sangramento em terapia antitrombótica; função hepática e glicemia para sirolimo.',
    ],
    alertas:
      'Evite combinar atenolol e diltiazem sem supervisão cardiológica por risco de bradicardia, bloqueio e hipotensão. Vasodilatadores e inotrópicos podem intensificar a obstrução da via de saída do ventrículo esquerdo em alguns gatos. Todas as doses são decisões veterinárias individualizadas e várias são extra-bula.',
  },
  prevention: {
    rastreio:
      'Não há prevenção garantida para a forma idiopática. Em raças e famílias de risco, ecocardiografia reprodutiva seriada e teste genético específico, quando validado, ajudam a reduzir a propagação de variantes conhecidas; um único ecocardiograma normal em animal jovem não garante ausência futura.',
    secundaria:
      'Controle de pressão arterial, hipertireoidismo e hipersomatotropismo previne ou reduz hipertrofia secundária. Manter hidratação adequada evita pseudohipertrofia e interpretações equivocadas.',
    tutor:
      'Ensinar contagem respiratória em repouso e sinais de tromboembolismo arterial permite atendimento precoce. Não prescreva antitrombótico preventivo apenas por sopro sem estratificação.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['hipertensao-arterial-sistemica-caes-gatos', 'hipertireoidismo-felino'],
  relatedMedicationSlugs: ['pimobendan', 'benazepril'],
  references: [
    {
      id: 'ref-nelson-couto-hcm',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 7–8, Myocardial Diseases of the Dog and Cat; PDF anexado, pp. 171–202.',
      sourceType: 'Livro-texto',
      notes: 'Etiologia, fisiopatologia, sinais, diagnóstico e manejo clássico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-acvim-feline-cardiomyopathy-2020',
      citationText:
        'Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for classification, diagnosis, and management of cardiomyopathies in cats. JVIM. 2020;34:1062–1077.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15745',
      evidenceLevel: 'Consenso baseado em evidência',
    },
    {
      id: 'ref-plumbs-hcm-drugs',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Atenolol, Clopidogrel, Diltiazem, Furosemide, Pimobendan e Rivaroxaban.',
      sourceType: 'Formulário veterinário',
      notes: 'Doses, contraindicações, interações e monitoramento.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-rapacat-2023',
      citationText:
        'Kaplan JL, et al. Delayed-release rapamycin halts progression of left ventricular hypertrophy in subclinical feline HCM: RAPACAT trial. JAVMA. 2023;261:1628–1637.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.2460/javma.23.04.0187',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fda-felycin-2025',
      citationText:
        'US FDA. Conditional approval of Felycin-CA1 for management of ventricular hypertrophy in cats with subclinical HCM. 2025.',
      sourceType: 'Fonte regulatória',
      url: 'https://www.fda.gov/animal-veterinary/cvm-updates/fda-conditionally-approves-drug-management-ventricular-hypertrophy-cats',
      notes: 'Aprovação condicional nos EUA; não equivale a comprovação de melhora de sobrevida.',
      evidenceLevel: 'Regulatório',
    },
    {
      id: 'ref-fat-cat',
      citationText:
        'Hogan DF, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: FAT CAT trial. J Vet Cardiol. 2015;17 Suppl 1:S306–S317.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.1016/j.jvc.2015.10.004',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-rivaroxaban-hcm-2024',
      citationText:
        'Jaturanratsamee K, et al. Rivaroxaban versus enoxaparin plus clopidogrel for HCM-associated thromboembolism in cats. Vet World. 2024;17:796–803.',
      sourceType: 'Ensaio clínico pequeno',
      url: 'https://doi.org/10.14202/vetworld.2024.796-803',
      notes: 'Amostra pequena; interpretar como evidência emergente.',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
