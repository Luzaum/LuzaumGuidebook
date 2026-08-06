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
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem clínica',
          timing: 'Primeira consulta',
          detail:
            'Tosse crônica intermitente, sibilos expiratórios, esforço respiratório com padrão expiratório ("abdominal press"); história de gatilhos ambientais reforça suspeita (Dye et al., 1996; Nelson & Couto, 6ª ed.).',
          reassess: 'Se crise aguda, estabilizar antes de radiografia ou BAL — ver plano de tratamento.',
        },
        {
          label: 'Excluir diferenciais obrigatórios',
          timing: 'Antes de rotular "asma idiopática"',
          detail:
            'Teste combinado antígeno + anticorpo para dirofilariose (HARD); Baermann fecal seriado (3 amostras) para Aelurostrongylus; ecocardiograma se sopro, galope ou suspeita cardíaca (Trzil & Reinero, 2014; Johnson, Respiratory Medicine 2ª ed.).',
          reassess: 'Repetir Baermann se história de caça/acesso externo e primeira amostra negativa.',
        },
        {
          label: 'Radiografia torácica',
          timing: 'Após estabilização clínica',
          detail:
            'Padrão broncointersticial ("donuts" em corte transversal, "trilhos de trem" em longitudinal), hiperinsuflação com achatamento diafragmático; atelectasia do lobo médio direito pode ocorrer. Radiografia normal não exclui asma (Dye et al., 1996).',
        },
        {
          label: 'Lavado broncoalveolar (quando seguro)',
          timing: 'Paciente estável, sem hipoxemia grave',
          detail:
            'Eosinofilia >17–25% no diferencial sustenta fortemente asma; citologia e cultura excluem infecção concomitante. Coleta adiada se FR elevada, ortopneia ou obnubilação (Johnson, Respiratory Medicine 2ª ed.; Reinero, 2019).',
          reassess: 'Considerar BAL de controle em casos refratários após 8–12 semanas de terapia otimizada.',
        },
        {
          label: 'Resposta terapêutica',
          timing: 'Quando investigação completa não é viável',
          detail:
            'Melhora clínica objetiva após corticoide sistêmico ou inalatório reforça o diagnóstico retrospectivamente — não substitui exclusão de HARD/parasitas na primeira avaliação (Trzil & Reinero, 2014).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Estabilizar crise aguda',
          detail:
            'Oxigênio suplementar, manuseio mínimo, sedação leve se estresse piorar broncoespasmo. Nenhum exame estressante antes da estabilização (Trzil & Reinero, 2014; Nelson & Couto, 6ª ed.).',
          dose: 'Terbutalina 0,01 mg/kg SC/IM (repetir conforme resposta); dexametasona sódica fosfato 0,1–0,2 mg/kg IV/IM/SC ou 1–2 mg/gato IM (dose única ou repetir em 24 h). Oxigênio por gaiola ou máscara conforme tolerância.',
          duration: 'Até FR e esforço respiratório normalizarem — tipicamente horas, não dias.',
          reassess: 'Reavaliar a cada 30–60 min na emergência; FR em repouso alvo <30–40 irpm quando estável.',
        },
        {
          label: 'Indução anti-inflamatória sistêmica',
          detail:
            'Prednisolona oral (preferir sobre prednisona em gatos). Dose anti-inflamatória para leve/moderado; imunossupressora (até 2–4 mg/kg/dia divididos) se crise grave ou refratária (Johnson, Respiratory Medicine 2ª ed.; Nelson & Couto, 6ª ed.).',
          dose: 'Leve/moderado: prednisolona 1 mg/kg VO q12h. Grave: 2 mg/kg VO q12h. Protocolo de transição típico: 1 mg/kg q12h × 5 dias → 1 mg/kg q24h × 5 dias → desmame gradual.',
          duration: 'Indução 5–14 dias; desmame por semanas se uso prolongado ou dose imunossupressora.',
          reassess: 'Revisão clínica em 7–14 dias; reduzir 25–50% a cada 5–7 dias somente se assintomático.',
        },
        {
          label: 'Manutenção inalatória',
          detail:
            'Fluticasona ou budesonida via câmara espaçadora felina (AeroKat ou equivalente). Manter prednisolona oral sobreposta na transição para evitar rebote clínico (Galler et al., 2013; Johnson, Respiratory Medicine 2ª ed.).',
          dose: 'Fluticasona propionato: 125 mcg/gato inalatório q12h (leve/moderado) ou 250 mcg/gato q12h (moderado/grave). Budesonida: 400 mcg/gato inalatório q12h. 7–10 respirações completas por jato com máscara vedada.',
          duration: 'Contínuo na manutenção; sobrepor VO por 1–2 semanas ao iniciar inalatório. Efeito pleno da fluticasona em 7–10 dias.',
          reassess: 'Reavaliar em 2–4 semanas; tentar menor dose eficaz de corticoide sistêmico após controle inalatório.',
        },
        {
          label: 'Broncodilatador de resgate',
          detail:
            'Adjuvante para broncoespasmo agudo em casa — nunca monoterapia crônica. Sempre com anti-inflamatório de base ativo (Trzil & Reinero, 2014; Nelson & Couto, 6ª ed.).',
          dose: 'Salbutamol/albuterol: 100 mcg/gato (1 jato) inalatório PRN; repetir 1× após 20–30 min se necessário. Terbutalina oral adjuvante: 0,01–0,02 mg/kg VO q12h em casos selecionados.',
          duration: 'Salbutamol: uso pontual na crise. Terbutalina oral: curto prazo enquanto ajusta corticoide.',
          reassess: 'Uso de salbutamol >2–3×/semana indica controle inadequado — intensificar anti-inflamatório.',
        },
        {
          label: 'Controle ambiental',
          detail:
            'Areia sanitária sem perfume e de baixa poeira; eliminar fumaça, incenso, aerossóis e perfumes; purificador HEPA quando aplicável; controle de peso (Reinero, 2019; Nelson & Couto, 6ª ed.).',
          duration: 'Permanente — medida de custo-benefício alto e subutilizada.',
          reassess: 'Registrar crises, tosse e uso de resgate no diário do tutor a cada revisão.',
        },
        {
          label: 'Reavaliação e casos refratários',
          detail:
            'Buscar menor dose eficaz de corticoide; confirmar técnica inalatória com o tutor. Broncoscopia/BAL de controle se persistência de sinais apesar de adesão (Johnson, Respiratory Medicine 2ª ed.; Reinero, 2019).',
          reassess: 'Consultas a cada 4–8 semanas na manutenção; FR noturna em repouso semanalmente em casa (alvo <30 irpm).',
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
    ordemDePrioridadeEstruturada: [
      {
        title: 'Estabilizar crise aguda',
        summary:
          'Oxigênio suplementar, manuseio mínimo e sedação leve se o estresse piorar broncoespasmo. Nenhum exame estressante (radiografia, BAL) antes da estabilização (Trzil & Reinero, 2014).',
        dose: 'Terbutalina 0,01 mg/kg SC/IM (repetir conforme resposta). Dexametasona sódica fosfato 0,1–0,2 mg/kg IV/IM/SC ou 1–2 mg/gato IM. Oxigênio por gaiola ou máscara.',
        duration: 'Horas até normalizar FR e esforço respiratório.',
        reassess: 'Monitorar a cada 30–60 min na emergência; alvo FR <30–40 irpm em repouso quando estável.',
      },
      {
        title: 'Indução anti-inflamatória sistêmica',
        summary:
          'Prednisolona oral (preferir sobre prednisona). Dose anti-inflamatória para leve/moderado; imunossupressora se crise grave ou refratária, com desmame gradual conforme resposta (Johnson, Canine and Feline Respiratory Medicine 2ª ed.; Nelson & Couto, 6ª ed.).',
        dose: 'Leve/moderado: 1 mg/kg VO q12h. Grave: 2 mg/kg VO q12h. Transição típica: 1 mg/kg q12h × 5 d → 1 mg/kg q24h × 5 d → desmame.',
        duration: 'Indução 5–14 dias; desmame por semanas se dose imunossupressora ou uso >2 semanas.',
        reassess: 'Revisão em 7–14 dias; reduzir 25–50% a cada 5–7 dias apenas se clinicamente controlado.',
      },
      {
        title: 'Transição para corticoide inalatório de manutenção',
        summary:
          'Fluticasona ou budesonida via câmara espaçadora felina (AeroKat) reduz exposição sistêmica crônica. Sobrepor corticoide oral evita rebote durante a transição (Galler et al., 2013).',
        dose: 'Fluticasona: 125 mcg/gato inalatório q12h (leve/moderado) ou 250 mcg/gato q12h (moderado/grave). Budesonida: 400 mcg/gato inalatório q12h. Manter prednisolona VO na transição.',
        duration: 'Inalatório contínuo; sobrepor VO por 1–2 semanas. Efeito pleno da fluticasona em 7–10 dias.',
        reassess: 'Reavaliar em 2–4 semanas; reduzir/suspender sistêmico quando controlado inalatoriamente.',
      },
      {
        title: 'Broncodilatador de resgate',
        summary:
          'Salbutamol/albuterol inalatório para crises leves a moderadas; terbutalina oral como adjuvante selecionado. Sempre associado ao anti-inflamatório — nunca monoterapia crônica (Trzil & Reinero, 2014).',
        dose: 'Salbutamol 100 mcg/gato (1 jato) inalatório PRN; repetir 1× após 20–30 min. Terbutalina oral 0,01–0,02 mg/kg VO q12h (adjuvante).',
        duration: 'Salbutamol: uso pontual. Terbutalina oral: curto prazo enquanto ajusta corticoide.',
        reassess: 'Salbutamol >2–3×/semana = controle inadequado; intensificar anti-inflamatório.',
      },
      {
        title: 'Controle ambiental permanente',
        summary:
          'Areia sanitária de baixa poeira sem perfume, eliminar fumaça/aerossóis/perfumes, purificador HEPA quando aplicável, controle de peso (Reinero, 2019; Nelson & Couto, 6ª ed.).',
        duration: 'Permanente.',
        reassess: 'Diário de crises, tosse e uso de resgate a cada consulta.',
      },
      {
        title: 'Reavaliação periódica e casos refratários',
        summary:
          'Tentativa de menor dose eficaz de corticoide; confirmar técnica inalatória. Broncoscopia/BAL de controle se refratário apesar de adesão (Johnson, Canine and Feline Respiratory Medicine 2ª ed.).',
        reassess: 'Consultas a cada 4–8 semanas na manutenção; FR noturna semanal em casa (alvo <30 irpm).',
      },
    ],
    protocoloTerapeutico: [
      {
        drug: 'Terbutalina',
        indication: 'Crise aguda — broncodilatação imediata',
        dose: '0,01 mg/kg',
        frequency: 'SC/IM; repetir conforme resposta clínica',
        route: 'SC/IM',
        duration: 'Dose única ou repetida na crise',
        notes: 'Associar oxigênio e corticoide injetável. Evitar contenção prolongada.',
        cautions: 'Taquicardia, tremores, agitação em overdose.',
      },
      {
        drug: 'Dexametasona sódica fosfato',
        indication: 'Crise aguda — anti-inflamatório de ação rápida',
        dose: '0,1–0,2 mg/kg ou 1–2 mg/gato',
        frequency: 'IV/IM/SC; dose única ou repetir em 24 h',
        route: 'IV/IM/SC',
        duration: 'Crise aguda apenas — não substitui manutenção',
        notes: 'Não confundir com protocolo de manutenção oral/inalatória.',
        cautions: 'Hiperglicemia e poliúria se uso repetido; preferir transição para prednisolona/inalatório.',
      },
      {
        drug: 'Prednisolona',
        indication: 'Indução sistêmica e transição',
        dose: '1 mg/kg (leve/moderado) ou 2 mg/kg (grave)',
        frequency: 'VO q12h na indução; q24h na fase de transição',
        route: 'VO',
        duration: '5–14 dias indução + desmame gradual (semanas se imunossupressora)',
        notes: 'Preferir prednisolona sobre prednisona (biodisponibilidade felina). Sobrepor 1–2 semanas ao iniciar inalatório.',
        cautions: 'Diabetes, poliúria/polidipsia, infecção oportunista com uso prolongado.',
      },
      {
        drug: 'Fluticasona propionato (Flixotide)',
        indication: 'Manutenção crônica — controle anti-inflamatório local',
        dose: '125 mcg/gato (leve/moderado) ou 250 mcg/gato (moderado/grave)',
        frequency: 'Inalatório q12h via AeroKat',
        route: 'Inalatória (câmara espaçadora)',
        duration: 'Contínuo na manutenção',
        notes: '7–10 respirações por jato; efeito pleno em 7–10 dias. Não é medicação de resgate.',
        cautions: 'Falha aparente comum por técnica inadequada — treinar tutor.',
      },
      {
        drug: 'Budesonida inalatória',
        indication: 'Manutenção crônica — alternativa à fluticasona',
        dose: '400 mcg/gato',
        frequency: 'Inalatório q12h via AeroKat',
        route: 'Inalatória (câmara espaçadora)',
        duration: 'Contínuo na manutenção',
        notes: 'Melhora clínica e funcional com baixo efeito adverso sistêmico (Galler et al., 2013).',
        cautions: 'Escolher apenas um corticoide inalatório contínuo (não combinar com fluticasona).',
      },
      {
        drug: 'Salbutamol (albuterol)',
        indication: 'Resgate agudo domiciliar',
        dose: '100 mcg/gato (1 jato)',
        frequency: 'PRN no broncoespasmo; repetir 1× após 20–30 min',
        route: 'Inalatória (câmara espaçadora)',
        duration: 'Uso pontual',
        notes: 'Não substitui corticoide de base. Uso frequente indica controle inadequado.',
        cautions: 'Taquicardia se uso excessivo; não usar salmeterol (Seretide) como resgate.',
      },
      {
        drug: 'Terbutalina oral',
        indication: 'Adjuvante broncodilatador selecionado',
        dose: '0,01–0,02 mg/kg',
        frequency: 'VO q12h',
        route: 'VO',
        duration: 'Curto prazo enquanto ajusta anti-inflamatório',
        notes: 'Reservada a broncoespasmo residual documentado.',
        cautions: 'Nunca monoterapia crônica.',
      },
    ],
    monitoramento: [
      'Frequência respiratória em repouso a cada revisão — alvo <30 irpm durante o sono em gatos controlados.',
      'Frequência de salbutamol de resgate: >2–3×/semana indica controle inadequado do anti-inflamatório de base.',
      'Efeitos adversos do corticoide sistêmico prolongado (poliúria/polidipsia, ganho de peso, diabetes secundária, infecção).',
      'Técnica inalatória com o tutor — falha de técnica é causa comum de "falha terapêutica" aparente (7–10 respirações/jato, vedação da máscara).',
      'Diário domiciliar: crises, tosse, chiado e uso de broncodilatador entre consultas.',
    ],
    tcCriseAguda:
      'Oxigênio (gaiola ou máscara conforme tolerância), mínimo estresse físico, terbutalina 0,01 mg/kg SC/IM (repetir se necessário conforme resposta) e dexametasona sódica fosfato 0,1–0,2 mg/kg IV/IM/SC ou 1–2 mg/gato IM. Evitar contenção prolongada e exames que aumentem estresse antes da estabilização (Trzil & Reinero, 2014).',
    tcCorticosteroides: {
      kind: 'clinicalTable',
      headers: ['Fase', 'Fármaco, dose e via', 'Duração / reavaliação'],
      rows: [
        [
          'Indução sistêmica',
          'Prednisolona 1 mg/kg VO q12h (leve/moderado) ou 2 mg/kg VO q12h (grave)',
          '5–14 dias → transição q24h × 5 d → desmame 25–50%/5–7 d. Revisão em 7–14 d.',
        ],
        [
          'Manutenção inalatória',
          'Fluticasona 125–250 mcg/gato inalatório q12h ou budesonida 400 mcg/gato q12h (AeroKat)',
          'Contínuo; sobrepor VO 1–2 sem. Efeito pleno em 7–10 d. Reavaliar em 2–4 sem (Galler et al., 2013).',
        ],
        [
          'Crise aguda',
          'Dexametasona 0,1–0,2 mg/kg IV/IM/SC ou 1–2 mg/gato IM + terbutalina 0,01 mg/kg SC/IM',
          'Dose única ou repetir em 24 h; não substitui manutenção crônica.',
        ],
      ],
    },
    tcBroncodilatadores:
      'Salbutamol 100 mcg/gato (1 jato) inalatório PRN via câmara espaçadora; repetir 1× após 20–30 min se necessário. Terbutalina oral 0,01–0,02 mg/kg VO q12h como adjuvante em casos selecionados. Uso isolado sem anti-inflamatório mascara progressão da doença (Trzil & Reinero, 2014).',
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
