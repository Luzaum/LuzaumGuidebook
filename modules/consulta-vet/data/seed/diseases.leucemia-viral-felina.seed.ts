import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Leucemia viral felina (FeLV) — síntese editorial Vetius.
 * Prioridade de fontes: ABCD 2025 > AAFP 2020 > estudos primários (Westman 2024, Biezus 2023).
 */
export const leucemiaViralFelinaRecord: DiseaseRecord = {
  id: 'disease-leucemia-viral-felina',
  slug: 'leucemia-viral-felina',
  title: 'Leucemia viral felina (FeLV)',
  synonyms: [
    'FeLV',
    'Feline leukemia virus',
    'Feline leukaemia virus',
    'Retrovirose felina',
    'Leucemia felina',
    'Vírus da leucemia felina',
  ],
  species: ['cat'],
  category: 'infecciosas',
  tags: [
    'Retrovirose',
    'p27',
    'PCR proviral',
    'Imunossupressão',
    'Linfoma',
    'Anemia',
    'Vacina FeLV',
    'Indoor',
    'ABCD',
    'AAFP',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['leucemia-viral-felina'],
  quickSummary:
    'A leucemia viral felina (FeLV) é infecção sistêmica por gammaretrovírus envelopado que integra DNA proviral ao genoma celular — persistência, reativação e oncogênese dependem desse mecanismo (Hofmann-Lehmann & Hartmann, ABCD 2025). Apesar do nome, FeLV positivo não significa leucemia: o vírus associa-se a imunossupressão, citopenias, linfoma, infecções secundárias e doença reprodutiva. A conduta exige classificar o desfecho biológico — abortiva, regressiva, progressiva ou focal — antes de prever transmissão ou prognóstico. Um teste rápido de antígeno p27 isolado não define infecção progressiva; confirmação com PCR proviral e reavaliação ≥6 semanas orientam manejo (Hofmann-Lehmann & Hartmann, 2020). Não existe antiviral comprovado para curar infecção progressiva (Westman et al., 2024); o tratamento eficaz trata a doença associada e mantém qualidade de vida com monitoramento semestral.',
  quickDecisionStrip: [
    'Teste p27 positivo isolado ≠ infecção progressiva — confirmar e repetir ≥6 semanas.',
    'PCR proviral positivo + p27 negativo = infecção regressiva provável — não tratar como contagioso habitual.',
    'Não indicar eutanásia só pelo resultado positivo; não iniciar antiviral de rotina em assintomático.',
    'Hemograma, esfregaço, bioquímica e urinálise na investigação inicial — tratar a doença, não o teste.',
    'Separar gato progressivo de suscetíveis; indoor, castração e vacinação baseada em risco nos demais.',
    'Filhotes e gatos jovens são mais susceptíveis à infecção progressiva — testar antes de vacinar.',
    'Anemia: sempre classificar regenerativa versus não regenerativa antes de atribuir ao FeLV.',
    'Antivirais (AZT, raltegravir, RetroMAD1): evidência insuficiente para uso rotineiro (Westman et al., 2024).',
    'Monitorar clinicamente e laboratorialmente ≥ a cada 6 meses em infectados.',
    'Doador de sangue: p27 isolado não basta — incluir PCR proviral na triagem (ABCD 2025).',
  ],
  quickSummaryRich: {
    lead:
      'FeLV positivo não é um diagnóstico clínico completo. Pergunte: infecção progressiva, regressiva, abortiva ou focal? Qual doença explica os sinais — anemia, linfoma, infecção bacteriana ou outra causa independente? O erro mais caro é rotular SNAP positivo como sentença de morte, iniciar antiviral sem evidência ou ignorar citopenia tratável porque “já é FeLV”.',
    leadHighlights: ['p27', 'PCR proviral', 'progressiva', 'regressiva', 'doença associada'],
    pillars: [
      {
        title: 'Quatro desfechos',
        body:
          'Abortiva: imunidade elimina antes da integração persistente. Regressiva: provírus integrado, p27 geralmente negativo, transmissão improvável. Progressiva: viremia persistente, alta eliminação salivar. Focal: rara, testes discordantes (ABCD 2025).',
        highlights: ['abortiva', 'regressiva', 'progressiva'],
      },
      {
        title: 'Diagnóstico',
        body:
          'p27 detecta antigenemia, não anticorpos — vacina não torna p27 positivo. PCR proviral detecta DNA integrado. Repetir p27 ≥6 semanas se positivo inicial; resultados discordantes exigem laboratório de referência (Hofmann-Lehmann & Hartmann, 2020).',
        highlights: ['p27', 'PCR', '6 semanas'],
      },
      {
        title: 'Tratamento',
        body:
          'Assintomático: monitoramento + prevenção, sem antiviral rotineiro. Sintomático: tratar anemia, linfoma, infecções e FCGS conforme indicação — quimioterapia não é contraindicada por FeLV positivo (ABCD 2025; Westman et al., 2024).',
        highlights: ['monitoramento', 'linfoma', 'anemia'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem p27',
          timing: 'Primeira linha',
          detail:
            'Teste rápido ou ELISA de antígeno p27 em sangue; interpretar com prevalência local e história de exposição — PPV cai em populações de baixa prevalência (Levy et al., 2017).',
        },
        {
          label: 'Confirmar e PCR proviral',
          timing: 'Resultado inesperado ou positivo',
          detail:
            'Repetir p27 em método/laboratório diferente; PCR proviral para DNA integrado; RT-PCR de RNA se disponível para replicação ativa (Hofmann-Lehmann & Hartmann, 2020).',
        },
        {
          label: 'Classificar longitudinalmente',
          timing: '≥6 semanas',
          detail:
            'p27 persistentemente positivo → infecção progressiva provável; p27 negativiza com PCR+ → regressiva (ABCD 2025).',
        },
        {
          label: 'Investigar doença associada',
          timing: 'Sempre que sintomático',
          detail:
            'Hemograma, reticulócitos, esfregaço, bioquímica, urinálise; aspirado medular se anemia não regenerativa ou pancitopenia (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Assintomático progressivo',
          detail:
            'Indoor, dieta completa (evitar cru), controle parasitário, consulta e hemograma ≥6/6 meses — sem antiviral rotineiro (ABCD 2025; Westman et al., 2024).',
        },
        {
          label: 'Doença associada',
          detail:
            'Tratar infecção bacteriana, linfoma, anemia, FCGS e neoplasias individualmente; não atribuir automaticamente todo sinal ao FeLV (Little et al., 2020).',
        },
        {
          label: 'Adjuvantes selecionados',
          detail:
            'Interferon-ω felino ou AZT apenas em casos muito selecionados — evidência limitada; raltegravir e RetroMAD1 não recomendados rotineiramente (Westman et al., 2024).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'FeLV é retrovírus envelopado de RNA da família Retroviridae, gênero Gammaretrovirus. Após entrada celular, a transcriptase reversa converte RNA viral em DNA que integra-se ao genoma como provírus — base da persistência, reativação e oncogênese (Tizard, Veterinary Immunology, 11ª ed.; Nelson & Couto, 6ª ed.).',
    felvExogenoEndogeno: [
      'FeLV exógeno: vírus infeccioso adquirido horizontal ou verticalmente — causa clínica relevante.',
      'FeLV endógeno (enFeLV): sequências ancestrais no genoma felino; pode recombinar com FeLV-A gerando subtipo B; PCR deve discriminar FeLV exógeno (ABCD 2025).',
    ],
    subgruposVirais: [
      'FeLV-A: único subtipo transmitido naturalmente; imunossupressão, anemia, linfoma.',
      'FeLV-B: recombinação FeLV-A + enFeLV; maior virulência e associação neoplásica.',
      'FeLV-C: mutações de FeLV-A; tropismo eritroide — anemia não regenerativa, aplasia eritroide.',
      'FeLV-T: tropismo por linfócitos T; imunodeficiência intensa (FeLV-FAIDS).',
    ],
    zoonose:
      'FeLV não é zoonose reconhecida; não infecta cães como doença natural (Nelson & Couto, 6ª ed.).',
  },
  epidemiology: {
    distribuicao:
      'Prevalência mundial caiu com testagem, separação e vacinação, mas permanece relevante em colônias, gatos de rua e filhotes (ABCD 2025; Little et al., 2020).',
    brasil:
      'Biezus et al. (2023), em população selecionada do sul do Brasil, encontraram 34,4% de infecção progressiva e 10,4% regressiva — valores não extrapoláveis à prevalência nacional; machos tiveram ~3× maior chance de infecção progressiva.',
    fatoresRisco:
      'Filhotes, acesso à rua, machos não castrados, ambientes multicat, convivência com progressivamente infectado, filhotes de mãe infectada, ausência de vacinação em expostos (ABCD 2025).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Exposição oronasal — principal via saliva em contato social prolongado (grooming, potes compartilhados, mordidas).',
      'Replicação em tecidos linfoides orofaríngeos e linfonodos regionais.',
      'Viremia primária e resposta imune — “decisão biológica”: abortiva, regressiva ou progressiva.',
      'Infecção de medula óssea em progressivos → citopenias, neoplasia, viremia secundária.',
      'Eliminação viral por glândulas salivares e epitélios — gato progressivo torna-se reservatório.',
    ],
    transmissaoVertical:
      'Transplacentária, parto, leite e lambedura materna — aborto, natimorto ou filhote infectado (England & von Heimendahl, BSAVA Reproduction, 2ª ed.).',
    transmissaoIatrogenica:
      'Transfusão, agulhas reutilizadas — triagem de doadores exige PCR proviral além de p27 (ABCD 2025).',
    sobrevivenciaAmbiente:
      'Vírus envelopado frágil — inativado por detergentes e desinfetantes comuns; até ~48 h em ambiente úmido experimental; limpeza adequada basta antes de novo gato (ABCD 2025).',
  },
  pathophysiology: {
    figuraPatogenese: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/leucemia-viral-felina/felv-pathophysiology-infection.jpg',
      alt: 'Diagrama da patogenese da infecção pelo vírus da leucemia felina',
      caption:
        'ABCD. Fig. 7 — Patogenese da infecção por FeLV (via oral-nasal, viremia primária e secundária, eliminação viral). European Advisory Board on Cat Diseases, 2021. Adaptado de Hartmann K. Viruses. 2012;4(11):2684–2710.',
      display: 'wide',
    },
    figuraRespostaImune: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/leucemia-viral-felina/felv-immune-response-outcomes.jpg',
      alt: 'Resposta imune ao FeLV e impacto nos desfechos',
      caption:
        'Hofmann-Lehmann R, Hartmann K. Fig. 2 — Equilíbrio hospedeiro–vírus: resposta imune, integração do provírus, replicação viral e doença associada por desfecho. J Feline Med Surg. 2020;22(9):831–846. Reproduzido sob licença CC BY-NC 4.0 (PMC).',
      display: 'wide',
    },
    desfechosInfeccao: {
      kind: 'clinicalTable' as const,
      title: 'Quatro desfechos da infecção por FeLV',
      headers: ['Desfecho', 'p27', 'PCR proviral', 'Transmissão', 'Prognóstico'],
      rows: [
        ['Abortiva', 'Negativo', 'Negativo', 'Não', 'Excelente'],
        ['Regressiva', 'Geralmente negativo', 'Positivo', 'Improvável (estável)', 'Bom a excelente'],
        ['Progressiva', 'Persistentemente positivo', 'Positivo', 'Alta (saliva)', 'Reservado, variável'],
        ['Focal/atípica', 'Intermitente', 'Variável', 'Rara/localizada', 'Depende do tecido'],
      ],
    },
    imunopatogenese:
      'FeLV depleta linfócitos T CD4+, altera relação CD4/CD8, atrofia tímica e função neutrofílica — imunossupressão + citopenias + oncogênese + infecções secundárias (Tizard, 11ª ed.; ABCD 2025).',
    oncogenese:
      'Integração proviral próxima a proto-oncogenes favorece linfoma e leucemias — linfoma mediastinal T em gatos jovens tem associação histórica forte com FeLV (Nelson & Couto, 6ª ed.).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Anemia não regenerativa',
          mechanism:
            'Infecção ou supressão de precursores eritroides na medula; aplasia, mielodisplasia ou FeLV-C.',
          clinicalMeaning:
            'Investigar reticulócitos e medula; anemia regenerativa exige hemoplasma, AHIM ou hemorragia.',
          priority: 'common',
        },
        {
          finding: 'Neutropenia, trombocitopenia ou pancitopenia',
          mechanism: 'Hipoplasia mieloide, infiltração neoplásica ou destruição imunomediada.',
          clinicalMeaning: 'Pancitopenia = investigar medula precocemente; neutropenia febril é emergência.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'oncologic',
      findings: [
        {
          finding: 'Linfadenomegalia, massa mediastinal, organomegalia',
          mechanism: 'Linfoma associado ao provírus integrado; FeLV-B aumenta virulência neoplásica.',
          clinicalMeaning: 'Citologia/histopatologia e imunofenotipagem — quimioterapia indicada quando apropriado.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Anorexia, vômitos, perda de peso, linfoma intestinal',
          mechanism: 'Imunossupressão + infecções secundárias ou neoplasia infiltrativa.',
          clinicalMeaning: 'Não rotular “enterite do FeLV” sem investigar coinfecções e neoplasia.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Ataxia pélvica progressiva, paresia, incontinência',
          mechanism:
            'Mielopatia associada ao FeLV ou linfoma espinal — neurotoxicidade de proteínas do envelope (Carmichael et al., 2002).',
          clinicalMeaning: 'Excluir PIF, toxoplasmose, criptococose e trauma; prognóstico reservado.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Perda de peso, letargia, linfadenomegalia inespecífica',
          mechanism: 'Síndrome multissistêmica — imunossupressão crônica e doença associada.',
          clinicalMeaning: 'Muitos gatos permanecem assintomáticos anos — investigar comorbidades tratáveis.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Fluxograma Inicial: Triagem PoC p27 e Confirmação por PCR (Westman et al., 2019 adaptado)',
      purpose: 'Orientar a conduta diagnóstica sequencial em gatos expostos ou suspeitos.',
      description:
        'Iniciar com teste rápido PoC antígeno p27 em sangue total ou plasma. Um resultado positivo NUNCA deve levar à eutanásia isolada; obrigatoriamente realizar confirmação com PCR proviral para DNA integrado. Em caso de discordância (p27+/PCR- ou p27-/PCR+), reavaliar clinicamente e retestar em 6–12 semanas (Westman et al., 2019 adaptado; Hofmann-Lehmann & Hartmann, 2020).',
      interpretation:
        'p27+/PCR+ = Infecção Progressiva confirmada (viremia ativa, contagioso). p27-/PCR+ = Infecção Regressiva (provírus integrado, sem viremia ativa). p27+/PCR- = Discordante (falso-positivo p27 ou viremia transitória).',
      limitations: 'Valores preditivos positivos dependem da prevalência populacional.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Teste de antígeno p27 (triagem PoC)',
      purpose: 'Detectar antigenemia — primeira linha rotineira.',
      description:
        'ELISA ou teste rápido em sangue; detecta antígeno livre p27, não anticorpos. Vacina FeLV não gera positividade.',
      interpretation:
        'Positivo indica antigenemia, mas um único teste não confirma infecção progressiva persistente (Westman et al., 2019; Hofmann-Lehmann & Hartmann, 2020).',
      limitations:
        'Falso-positivo em baixa prevalência; negativo em infecção precoce, regressiva ou abortiva.',
    },
    {
      stepNumber: 3,
      title: 'PCR proviral (confirmação)',
      purpose: 'Detectar DNA proviral integrado; esclarecer discordâncias.',
      description:
        'Sangue ou tecido em laboratório validado para FeLV exógeno; essencial em doadores e resultados PoC positivos (Westman et al., 2019).',
      interpretation:
        'Positivo = infecção progressiva ou regressiva; negativo com p27+ exige retestagem longitudinal.',
      limitations: 'Não distingue sozinho infecção progressiva de regressiva sem integrar p27 e clínica.',
    },
    {
      stepNumber: 4,
      title: 'Reavaliação longitudinal ≥6 semanas',
      purpose: 'Diferenciar antigenemia transitória de infecção progressiva persistente.',
      description:
        'Repetir p27 e PCR proviral após 6–12 semanas em pacientes discordantes ou com exposição recente (Westman et al., 2019; ABCD 2025).',
      interpretation:
        'p27 persistentemente positivo em 6–12 semanas → infecção progressiva confirmada; p27 negativiza com PCR+ → infecção regressiva.',
      limitations: 'Exposição recente (<30 dias) pode exigir reteste em janela mais ampla.',
      isGoldStandard: true,
    },
    {
      stepNumber: 5,
      title: 'RT-PCR para RNA viral',
      purpose: 'Documentar replicação ativa quando disponível.',
      description: 'Plasma, sangue ou saliva conforme laboratório; RNA positivo precoce na infecção experimental.',
      interpretation: 'Carga de RNA elevada no diagnóstico associou-se a menor sobrevida (Westman et al., 2024).',
      limitations: 'Disponibilidade limitada; não substitui p27 + PCR proviral na rotina.',
    },
    {
      stepNumber: 6,
      title: 'Investigação de doença associada',
      purpose: 'FeLV positivo inicia investigação, não a encerra.',
      description:
        'Hemograma, reticulócitos, esfregaço, bioquímica, urinálise; aspirado medular se citopenia inexplicada; imagem se massa/efusão.',
      interpretation: 'Achados guiam tratamento específico — anemia, linfoma, infecção bacteriana.',
      limitations: 'Hemograma normal não exclui infecção progressiva.',
    },
  ],
  treatment: {
    principios: [
      'Não tratar o teste — tratar o paciente. Assintomático progressivo: monitoramento + prevenção, sem antiviral rotineiro (ABCD 2025; Westman et al., 2024).',
      'Identificar precocemente complicações; tratar agressivamente doenças tratáveis; preservar qualidade de vida.',
    ],
    estadiamentoERotinaWestman: [
      'Fluxograma de rotina e estadiamento do gato FeLV+ (Westman et al., 2019 adaptado):',
      '1. Estadiamento Inicial Obrigatório: Hemograma completo com contagem de reticulócitos e esfregaço sanguíneo; perfil bioquímico (função renal, hepática, relação Albumina:Globulina); urinálise completa; triagem de coinfecções (FIV, Mycoplasma hemofelis); exames de imagem (ultrassonografia abdominal e radiografia torácica para rastreamento de linfoma mediastinal/abdominal ou linfoadenopatia).',
      '2. Medidas Preventivas e de Bem-Estar: Manutenção estritamente indoor, isolamento de gatos suscetíveis (p27-), vacinação de contactantes, castração de rotina, dieta cozida/balanceada (evitar carnes cruas) e controle ecto/endoparasitário rigoroso.',
      '3. Protocolo de Monitoramento Periódico: Consulta clínica + hemograma completo a cada 6 meses. Perfil bioquímico, urinálise e ultrassonografia de rastreio anualmente (ou imediatamente se houver febre, prostração, linfoadenopatia, citopenia ou perda de peso).',
    ],
    assintomatico: [
      'Indoor; evitar contato com suscetíveis; castração; dieta completa balanceada; evitar alimentos crus; controle ectop/endoparasitário; consulta e hemograma ≥6/6 meses; bioquímica e urinálise ≥anual (Westman et al., 2019; Little et al., 2020).',
    ],
    infeccoesSecundarias: [
      'Investigar etiologia; cultura e antibiograma quando aplicável; não usar antibiótico profilático crônico só por FeLV+ (ABCD 2025).',
    ],
    anemia: [
      'Classificar regenerativa versus não regenerativa. Transfusão quando hipóxia ou queda rápida do hematócrito. Darbepoetina 0,25–0,5 µg/kg SC semanal em casos selecionados de anemia não regenerativa — evidência limitada (ABCD 2025). Ferro só se deficiência comprovada.',
    ],
    linfoma: [
      'FeLV+ não contraindica quimioterapia. Protocolos adequados ao subtipo; citopenias limitam intensidade. Estudo LOPH em FeLV+: resposta completa ~81%, mediana ~171 dias — não extrapolar como prognóstico universal (ABCD 2025).',
    ],
    gengivoestomatite: [
      'FCGS grave: extração dentária extensa/total com radiografia confirmando raízes — evitar corticoide crônico como estratégia principal (ABCD 2025).',
    ],
    antiviraisEvidencia: [
      'Westman et al. (2024), em 18 gatos progressivamente infectados, não encontraram benefício convincente de AZT, raltegravir ou RetroMAD1 na carga viral ou sobrevida — não recomendar como terapia padrão.',
      'Zidovudina (AZT) 5 mg/kg VO q12h: evidência baixa; mielossupressão — apenas casos neurológicos selecionados após excluir outras causas (Plumb\'s, 10ª ed.; ABCD 2025).',
      'Interferon-ω felino 1 MU/kg SC q24h ×5 dias nos dias 0, 14 e 60: adjuvante em casos selecionados — evidência limitada, não cura (Plumb\'s, 10ª ed.).',
      'Raltegravir, RetroMAD1, ribavirina (contraindicada em gatos), imunoestimulantes inespecíficos: não rotina.',
    ],
    glicocorticoides: [
      'Evitar uso indiscriminado — imunossupressão adicional e risco de reativação de infecção regressiva. Usar quando indicação clara (AHIM comprovada, componente oncológico) (ABCD 2025).',
    ],
    monitoramento: [
      'Estadiamento inicial completo no diagnóstico (hemograma, reticulócitos, esfregaço, bioquímica, urinálise e imagem torácica/abdominal). Consulta e hemograma a cada 6 meses; bioquímica, urinálise e ultrassonografia anuais (Westman et al., 2019 adaptado; ABCD 2025).',
    ],
  },
  prevention: {
    testagemVacinacao: [
      'Testar antes de vacinar; vacina não trata infecção existente nem elimina provírus (Little et al., 2020).',
      'Filhotes <1 ano: vacina FeLV core — 2 doses a partir de 8 semanas, intervalo 3–4 semanas, reforço 12 meses (AAHA/AAFP 2020).',
      'Adultos: vacina dependente de risco — rua, multicat, contato com FeLV+ (ABCD 2025).',
      'Aplicação na porção distal do membro pélvico esquerdo (ABCD 2025). Vacina reduz infecção progressiva, não garante imunidade esterilizante.',
    ],
    manejoMulticat: [
      'Progressivo + suscetível: separação física é opção mais segura. Se convivência: testar todos, vacinar suscetíveis, monitorar — vacina não elimina risco (ABCD 2025).',
    ],
    criadores: [
      'Testar antes de introdução; não reproduzir infectados; testar matrizes — FeLV causa aborto e filhotes debilitados (England & von Heimendahl, BSAVA Reproduction, 2ª ed.).',
    ],
    hospital: [
      'Não exige ala de isolamento tipo panleucopenia — separar de outros gatos, higiene de gaiola, evitar colocar junto a pacientes altamente contagiosos porque o FeLV+ pode ser imunocomprometido (ABCD 2025).',
    ],
    eutanasia: [
      'Nunca indicar eutanásia somente pelo teste positivo — considerar qualidade de vida como em qualquer paciente (Westman et al., 2019; Little et al., 2020; Westman et al., 2024).',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['micoplasmoses-hemotropicas', 'granuloma-eosinofilico-felino', 'peritonite-infecciosa-felina', 'imunodeficiencia-felina-fiv'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-felv-westman-2019',
      citationText:
        'Westman ME, Malik R, Norris JM. Diagnosing feline immunodeficiency virus (FIV) and feline leukaemia virus (FeLV) infection: An update for clinicians. Aust Vet J. 2019;97(5):134–142.',
      sourceType: 'Guideline / Revisão prática',
      url: 'https://doi.org/10.1111/avj.12803',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-felv-abcd-2025',
      citationText:
        'Hofmann-Lehmann R, Hartmann K, ABCD colleagues. Guideline for Feline Leukaemia Virus Infection. European Advisory Board on Cat Diseases. Atualizada 27 mar. 2025; revisada 19 nov. 2025.',
      sourceType: 'Guideline / consenso',
      url: 'https://www.abcdcatsvets.org/guideline-for-feline-leukaemia-virus-infection/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-felv-aafp-2020',
      citationText:
        'Little S, Levy J, Hartmann K, et al. 2020 AAFP Feline Retrovirus Testing and Management Guidelines. J Feline Med Surg. 2020;22(1):5–30.',
      sourceType: 'Guideline',
      url: 'https://doi.org/10.1177/1098612X19895940',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-felv-diagnostico-2020',
      citationText:
        'Hofmann-Lehmann R, Hartmann K. Feline leukaemia virus infection: a practical approach to diagnosis. J Feline Med Surg. 2020;22(9):831–846.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1177/1098612X20941785',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-felv-biezus-2023',
      citationText:
        'Biezus G, de Cristo TG, da Silva Casa M, et al. Progressive and regressive infection with feline leukemia virus in cats in southern Brazil. Prev Vet Med. 2023;216:105945.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.1016/j.prevetmed.2023.105945',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-felv-westman-2024',
      citationText:
        'Westman ME, Hall E, Norris JM, et al. Antiviral therapy in cats progressively infected with feline leukaemia virus: lessons from 18 consecutive cases. Aust Vet J. 2024;102(9):453–465.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1111/avj.13363',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-felv-nelson-couto',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 96 — Feline Leukemia Virus, pp. 1494–1498.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-felv-kornya-2023',
      citationText:
        'Kornya M, Bienzle D, Beeler-Marfisi J. Discordant FeLV p27 immunoassay and PCR test results in cats with hematologic disorders. J Feline Med Surg. 2023;25(7).',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1177/1098612X231168234',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
