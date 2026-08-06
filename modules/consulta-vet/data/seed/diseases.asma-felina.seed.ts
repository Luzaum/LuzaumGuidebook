import { DiseaseRecord } from '../../types/disease';

/** Asma felina; síntese Padrid, Reinero, Trzil & Reinero 2014, Galler et al. 2013, Dye et al. 1996, Nelson & Couto, Johnson Canine and Feline Respiratory Medicine 2020. */
export const asmaFelinaRecord: DiseaseRecord = {
  id: 'disease-asma-felina',
  slug: 'asma-felina',
  title: 'Asma felina',
  synonyms: [
    'Feline asthma',
    'Bronquite alérgica felina',
    'Doença de vias aéreas inferiores felina eosinofílica',
    'Broncopneumopatia alérgica do gato',
  ],
  species: ['cat'],
  category: 'respiratorio',
  tags: [
    'Eosinófilos',
    'Broncoespasmo',
    'Corticoide inalatório',
    'Siamês',
    'Terbutalina',
    'Padrão broncointersticial',
  ],
  quickSummary:
    'A asma felina é uma reação de hipersensibilidade tipo I (mediada por Th2/IgE) das vias aéreas inferiores frente a alérgenos inalados (poeira de areia sanitária, fumaça, aerossóis domésticos, pólen, ácaros): mastócitos e eosinófilos ativados liberam mediadores que provocam broncoconstrição aguda, edema de mucosa, hipersecreção de muco e, com a cronicidade, remodelamento da parede brônquica (hipertrofia de músculo liso, hiperplasia de células caliciformes, fibrose subepitelial). Acomete predominantemente gatos jovens a de meia-idade, com sobrerrepresentação de Siamês e raças orientais. O quadro clínico varia de tosse crônica intermitente a crises agudas de dispneia expiratória com sibilos audíveis — estas últimas são emergência respiratória verdadeira. O diagnóstico não tem teste único confirmatório: exige excluir diferenciais importantes (doença respiratória associada à dirofilariose — HARD, bronquite parasitária por Aelurostrongylus abstrusus, bronquite crônica neutrofílica, insuficiência cardíaca) e integrar radiografia (padrão broncointersticial, hiperinsuflação), quando seguro lavado broncoalveolar com eosinofilia, e resposta terapêutica ao corticoide. O tratamento tem dois eixos permanentes: controle anti-inflamatório (corticoide sistêmico para indução/crise, inalatório para manutenção crônica) e broncodilatador de resgate — nunca o inverso, pois broncodilatador isolado mascara sintomas sem tratar a inflamação subjacente.',
  quickDecisionStrip: [
    'Gato jovem a adulto, sobretudo Siamês/oriental, com tosse crônica ou sibilos expiratórios: pense asma felina.',
    'Crise respiratória aguda é emergência — manuseio mínimo, oxigênio e broncodilatador antes de qualquer exame estressante.',
    'Sempre excluir dirofilariose (HARD) e parasitos pulmonares antes de rotular como "asma idiopática".',
    'Radiografia com padrão broncointersticial ("donuts e trilhos de trem") e hiperinsuflação apoia, mas não fecha diagnóstico isoladamente.',
    'Lavado broncoalveolar com eosinofilia é o achado mais específico quando é seguro coletar.',
    'Corticoide é a base do tratamento; inalatório reduz efeitos sistêmicos na manutenção crônica.',
    'Broncodilatador é resgate/adjuvante — nunca substitui o anti-inflamatório de base.',
    'Reduzir poeira de areia sanitária, fumaça e aerossóis diminui frequência e gravidade das crises.',
  ],
  quickSummaryRich: {
    lead:
      'Asma felina é doença eosinofílica de via aérea pequena — o gato não "tem bronquite como cão", ele monta uma resposta alérgica clássica tipo I contra algo que respira todo dia. O ponto prático que mais evita erro é lembrar que broncodilatador alivia sintoma na hora, mas quem trata a doença é o anti-inflamatório; e que toda "asma" merece, ao menos uma vez, checagem de dirofilariose e parasito pulmonar antes de virar rótulo permanente.',
      leadHighlights: ['eosinofílica', 'crise respiratória', 'corticoide', 'HARD', 'gatilhos'],
    pillars: [
      {
        title: 'Mecanismo',
        body:
          'Hipersensibilidade tipo I: IgE sensibiliza mastócitos contra alérgeno inalado; degranulação libera histamina, leucotrienos e outros mediadores que broncoconstringem e recrutam eosinófilos — inflamação crônica remodela a parede das vias aéreas pequenas.',
        highlights: ['IgE', 'eosinófilos'],
      },
      {
        title: 'População',
        body:
          'Gatos jovens a meia-idade; Siamês e raças orientais sobrerrepresentados na maioria das séries clínicas. Ambiente urbano fechado com irritantes inalados é fator agravante recorrente.',
        highlights: ['Siamês'],
      },
      {
        title: 'Conduta imediata',
        body:
          'Crise: oxigênio, mínimo estresse, broncodilatador de resgate e corticoide injetável — investigação completa só depois de estabilizar.',
        highlights: ['oxigênio', 'broncodilatador'],
      },
    ],
    diagnosticFlow: {
      title: 'Diagnóstico (ordem prática)',
      steps: [
        {
          label: '1. Triagem clínica',
          detail:
            'Tosse crônica intermitente, sibilos expiratórios, esforço respiratório com padrão expiratório ("abdominal press"); história de gatilhos ambientais reforça suspeita.',
        },
        {
          label: '2. Excluir diferenciais obrigatórios',
          detail:
            'Teste para dirofilariose (antígeno + anticorpo, considerando limitações em carga baixa/machos), exame fecal de Baermann para Aelurostrongylus, avaliação cardíaca se sopro/galope.',
        },
        {
          label: '3. Radiografia torácica',
          detail:
            'Padrão broncointersticial ("donuts" em corte transversal, "trilhos de trem" em corte longitudinal), hiperinsuflação com achatamento diafragmático; áreas de atelectasia (lobo médio direito) podem ocorrer.',
        },
        {
          label: '4. Lavado broncoalveolar (quando seguro)',
          detail:
            'Eosinofilia >17-25% no diferencial sustenta fortemente asma; permite também citologia/cultura para excluir infecção concomitante — só realizar com paciente estabilizado.',
        },
        {
          label: '5. Resposta terapêutica',
          detail:
            'Melhora clínica objetiva após corticoide sistêmico/inalatório reforça o diagnóstico retrospectivamente quando a investigação completa não é viável.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento (prioridades)',
      steps: [
        {
          label: 'Camada 1 — Crise aguda',
          detail:
            'Oxigênio, mínimo manuseio, terbutalina SC/IM e corticoide injetável de ação rápida; considerar sedação leve se estresse piorar broncoespasmo.',
        },
        {
          label: 'Camada 2 — Indução anti-inflamatória',
          detail:
            'Prednisolona oral em dose anti-inflamatória a imunossupressora conforme gravidade, com desmame gradual após controle.',
        },
        {
          label: 'Camada 3 — Manutenção inalatória',
          detail:
            'Fluticasona ou budesonida inalatória via câmara espaçadora felina (ex.: AeroKat) permite reduzir/parar corticoide sistêmico com menos efeito adverso — requer sobreposição durante a transição.',
        },
        {
          label: 'Camada 4 — Broncodilatador de resgate',
          detail:
            'Albuterol/salbutamol inalatório para crises leves a moderadas em casa; terbutalina oral como adjuvante em casos selecionados — nunca como monoterapia crônica.',
        },
        {
          label: 'Camada 5 — Controle ambiental',
          detail:
            'Areia sanitária com baixa poeira, ausência de fumaça/aerossóis/velas perfumadas, purificador de ar; medida de custo-benefício alto e subutilizada.',
        },
      ],
    },
  },
  etiology: {
    tcMecanismoImune:
      'Reação de hipersensibilidade tipo I mediada por IgE contra alérgenos ambientais inalados (poeira doméstica, ácaros, pólen, fumaça de cigarro, aerossóis, poeira de areia sanitária). Sensibilização prévia gera mastócitos armados; nova exposição desencadeia degranulação com liberação de histamina, leucotrienos, prostaglandinas e citocinas Th2 (IL-4, IL-5, IL-13) que recrutam e ativam eosinófilos (Padrid; Reinero).',
    tcGatilhosComuns: [
      'Poeira de areia sanitária, especialmente perfumada ou com partículas finas.',
      'Fumaça de cigarro e lareira; aerossóis domésticos, perfumes e velas.',
      'Ácaros de poeira doméstica e mofo em ambientes fechados.',
      'Estresse e exercício intenso como fatores agravantes, não causais isolados.',
    ],
    tcRemodelamento:
      'Inflamação eosinofílica persistente induz hipertrofia de músculo liso brônquico, hiperplasia de células caliciformes com hipersecreção de muco espesso e fibrose subepitelial — mudanças estruturais que tornam a via aérea hiper-reativa mesmo fora de crise (Trzil & Reinero, 2014).',
  },
  epidemiology: {
    tcPerfilPopulacional:
      'Gatos jovens a de meia-idade (média de aparecimento entre 2 e 8 anos em séries clínicas); Siamês e raças orientais aparecem sobrerrepresentados em várias casuísticas, sugerindo componente de predisposição racial/genética.',
    tcAmbiente:
      'Gatos exclusivamente domiciliados em ambientes com irritantes inalados frequentes (fumantes na casa, areia com poeira fina) parecem ter maior frequência e gravidade de crises — associação consistente na literatura clínica, sem implicar causalidade única.',
  },
  pathogenesisTransmission: {
    tcCascataInflamatoria:
      'Exposição ao alérgeno → ativação de mastócitos sensibilizados por IgE → liberação de mediadores (histamina, leucotrienos cisteínicos, prostaglandina D2) → broncoconstrição imediata + vasodilatação/edema de mucosa → recrutamento de eosinófilos via IL-5 → segunda onda inflamatória horas depois, perpetuando hiper-reatividade brônquica.',
    tcConsequenciasFuncionais:
      'Estreitamento difuso do lúmen de vias aéreas pequenas aumenta a resistência ao fluxo aéreo, sobretudo na expiração (colapso dinâmico de vias já estreitadas) — daí o padrão clássico de esforço expiratório e sibilos ao final da expiração.',
    tcTransmissao:
      'Não é doença contagiosa nem transmissível entre animais; determinantes são predisposição individual (genética, atopia) e exposição ambiental a alérgenos.',
  },
  pathophysiology:
    'A via aérea asmática combina três componentes simultâneos: broncoespasmo agudo (reversível com broncodilatador), edema/inflamação de mucosa (reversível com corticoide, mais lentamente) e, na doença crônica não controlada, remodelamento estrutural (parcialmente irreversível). Isso explica por que crises recorrentes mal tratadas evoluem para hiper-reatividade basal mesmo em períodos assintomáticos, e por que o tratamento crônico precisa mirar a inflamação, não apenas aliviar o broncoespasmo do momento.',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        'Tosse crônica intermitente, às vezes confundida pelo tutor com tentativa de vômito de bola de pelo.',
        'Sibilos expiratórios audíveis, esforço respiratório com padrão expiratório prolongado ("abdominal press").',
        'Crise aguda: taquipneia, ortopneia, respiração de boca aberta, cianose — sinais de emergência respiratória.',
      ],
    },
    {
      system: 'general',
      findings: ['Letargia e redução de atividade durante crises; entre crises muitos gatos parecem clinicamente normais.'],
    },
    {
      system: 'emergency',
      findings: [
        'Colapso respiratório, cianose franca e obnubilação indicam obstrução funcional grave — manuseio mínimo e oxigênio imediatos.',
      ],
    },
  ],
  diagnosis: {
    tcHistoriaEFisico:
      'Tosse crônica ou episódios de dispneia expiratória em gato jovem a meia-idade, muitas vezes com padrão sazonal ou ligado a gatilho ambiental identificável pelo tutor. Ausculta pode revelar sibilos ou estar normal entre crises.',
    tcDiferenciaisObrigatorios:
      'Doença respiratória associada à dirofilariose (HARD), bronquite parasitária (Aelurostrongylus abstrusus, menos comumente Capillaria/Eucoleus aerophilus), bronquite crônica neutrofílica, insuficiência cardíaca congestiva com edema pulmonar, pneumonia, neoplasia intratorácica, corpo estranho.',
    tcRadiografia: {
      kind: 'clinicalTable',
      headers: ['Achado radiográfico', 'Interpretação'],
      rows: [
        ['Padrão broncointersticial ("donuts"/"trilhos de trem")', 'Espessamento de parede brônquica por inflamação e edema — sugestivo, não exclusivo de asma.'],
        ['Hiperinsuflação pulmonar / diafragma achatado', 'Aprisionamento de ar por obstrução expiratória das vias aéreas pequenas.'],
        ['Atelectasia do lobo médio direito', 'Achado clássico descrito em gatos asmáticos, relacionado a rolha de muco/broncoespasmo localizado.'],
        ['Radiografia normal', 'Não exclui asma — sensibilidade limitada, sobretudo entre crises.'],
      ],
    },
    tcLavadoBroncoalveolar:
      'Padrão citológico mais específico: eosinofilia elevada no diferencial (tipicamente acima de 17-25%, com variação entre laboratórios e protocolos). Também permite cultura para excluir infecção secundária. Coleta deve ser adiada até estabilização respiratória — risco de descompensação sob sedação/anestesia em paciente hipoxêmico.',
    tcExamesComplementares:
      'Teste combinado antígeno/anticorpo para dirofilariose; Baermann fecal seriado (3 amostras) para Aelurostrongylus; ecocardiograma se sopro, galope ou suspeita de componente cardíaco; hemograma pode mostrar eosinofilia periférica, mas ausência não exclui doença.',
    tcTabelaDiferenciais: {
      kind: 'clinicalTable',
      headers: ['Condição', 'Pista diferenciadora principal'],
      rows: [
        ['HARD (dirofilariose)', 'Sorologia/antigenemia, região endêmica, padrão radiográfico com artéria pulmonar aumentada/tortuosa.'],
        ['Bronquite parasitária', 'Baermann fecal positivo; história de acesso a ambiente externo/caça.'],
        ['Bronquite crônica neutrofílica', 'BAL com predomínio neutrofílico não-séptico em vez de eosinofílico.'],
        ['Insuficiência cardíaca', 'Sopro/galope, cardiomegalia, edema pulmonar perihilar, resposta a diurético.'],
      ],
    },
  },
  treatment: {
    ordemDePrioridade: [
      '1) Estabilizar crise aguda: oxigênio suplementar, manuseio mínimo, terbutalina SC/IM e corticoide injetável de ação rápida antes de qualquer exame estressante (Trzil & Reinero, 2014).',
      '2) Indução anti-inflamatória sistêmica: prednisolona oral em dose anti-inflamatória a imunossupressora conforme gravidade, com desmame gradual conforme resposta clínica.',
      '3) Transição para corticoide inalatório de manutenção (fluticasona ou budesonida via câmara espaçadora felina) para reduzir exposição sistêmica crônica — a sobreposição com corticoide oral durante a transição evita rebote (Galler et al., 2013).',
      '4) Broncodilatador de resgate (albuterol/salbutamol inalatório, terbutalina oral) para crises leves a moderadas — sempre associado ao anti-inflamatório, nunca isolado como terapia crônica.',
      '5) Controle ambiental permanente: areia sanitária de baixa poeira, eliminar fumaça/aerossóis/perfumes, purificador de ar — reduz frequência e gravidade das crises com risco mínimo.',
      '6) Reavaliação periódica com tentativa de menor dose eficaz de corticoide; considerar broncoscopia/BAL de controle em casos refratários para reconfirmar diagnóstico e excluir infecção.',
    ],
    monitoramento: [
      'Frequência e padrão respiratório em repouso a cada revisão — objetivo é normalizar entre crises.',
      'Frequência de uso do broncodilatador de resgate: aumento sinaliza controle inadequado do anti-inflamatório de base.',
      'Efeitos adversos do corticoide sistêmico prolongado (poliúria/polidipsia, ganho de peso, predisposição a infecção, diabetes secundária).',
      'Técnica de aplicação inalatória com o tutor — falha de técnica é causa comum de "falha terapêutica" aparente.',
    ],
    tcCriseAguda:
      'Oxigênio (gaiola ou máscara conforme tolerância), mínimo estresse físico, terbutalina 0,01 mg/kg SC/IM (repetir se necessário conforme resposta) e corticoide injetável de ação rápida (ex.: dexametasona sódica fosfato). Evitar contenção prolongada e exames que aumentem estresse antes da estabilização.',
    tcCorticosteroides: {
      kind: 'clinicalTable',
      headers: ['Fase', 'Fármaco e via', 'Notas'],
      rows: [
        ['Indução sistêmica', 'Prednisolona oral, dose anti-inflamatória a imunossupressora conforme gravidade, com desmame gradual', 'Prednisona tem biodisponibilidade inferior em gatos — preferir prednisolona.'],
        ['Manutenção inalatória', 'Fluticasona ou budesonida via câmara espaçadora felina (ex.: AeroKat), 1-2x/dia', 'Sobrepor com corticoide oral por 1-2 semanas na transição; reduz efeitos sistêmicos a longo prazo (Galler et al., 2013).'],
        ['Crise aguda', 'Corticoide injetável de ação rápida (ex.: dexametasona)', 'Associado a oxigênio e broncodilatador; não substitui manutenção crônica.'],
      ],
    },
    tcBroncodilatadores:
      'Albuterol/salbutamol inalatório para resgate agudo em casa (câmara espaçadora); terbutalina oral 0,01-0,02 mg/kg BID como adjuvante em casos selecionados com broncoespasmo residual. Uso isolado sem anti-inflamatório de base é insuficiente e mascara progressão da doença.',
    tcMedidasAmbientais: [
      'Trocar para areia sanitária de baixa poeira, sem perfume.',
      'Eliminar exposição a fumaça de cigarro, lareira, velas perfumadas e aerossóis domésticos.',
      'Considerar purificador de ar com filtro HEPA em casas com múltiplos gatos ou fumantes.',
      'Controle de peso — obesidade agrava mecânica respiratória e piora prognóstico funcional.',
    ],
  },
  prevention: {
    tcReducaoDeCrises:
      'Não há prevenção primária da sensibilização alérgica, mas controle ambiental consistente (areia de baixa poeira, ausência de irritantes inalados) e adesão à manutenção anti-inflamatória inalatória reduzem substancialmente frequência e gravidade das crises, evitando remodelamento progressivo da via aérea.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-galler-budesonide-2013',
      citationText:
        'Galler A, Shibly S, Bilek A, Hirt RA. Inhaled budesonide therapy in cats with naturally occurring chronic bronchial disease (feline asthma and chronic bronchitis). J Small Anim Pract. 2013;54(10):531-536.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1111/jsap.12133',
      notes: 'Budesonida inalatória a longo prazo; melhora clínica e funcional, baixo efeito adverso sistêmico.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-trzil-reinero-2014',
      citationText: 'Trzil JE, Reinero CR. Update on feline asthma. Vet Clin North Am Small Anim Pract. 2014;44(1):91-105.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1016/j.cvsm.2013.09.002',
      notes: 'Fisiopatologia, diagnóstico e manejo terapêutico atualizado.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-reinero-2019',
      citationText: 'Reinero C. Feline asthma: what\'s new and where might clinical practice be heading? J Feline Med Surg. 2019;21(9):817-827.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1177/1098612X19867097',
      notes: 'Perspectivas diagnósticas e terapêuticas contemporâneas.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-dye-1996',
      citationText:
        'Dye JA, McKiernan BC, Rozanski EA, et al. Bronchopulmonary disease in the cat: historical, physical, radiographic, clinicopathologic, and pulmonary functional evaluation of 24 affected and 15 healthy cats. J Vet Intern Med. 1996;10(6):385-400.',
      sourceType: 'Estudo clínico',
      url: null,
      notes: 'Caracterização clínica e radiográfica clássica da doença brônquica felina.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-nelson-couto-2020-asma',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — Disorders of the Trachea and Bronchi / Feline Asthma.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Diagnóstico diferencial, exames complementares e princípios de tratamento.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-johnson-resp-2020-asma',
      citationText: 'Johnson LR. Canine and Feline Respiratory Medicine, 2nd ed., 2020. Wiley — cap. asma felina.',
      sourceType: 'Livro especialidade',
      url: null,
      notes: 'Fisiopatologia, lavado broncoalveolar, protocolos de corticoide inalatório.',
      evidenceLevel: 'A/B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
