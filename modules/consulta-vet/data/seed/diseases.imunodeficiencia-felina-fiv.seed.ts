import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Vírus da imunodeficiência felina (FIV) — síntese editorial Vetius.
 * Prioridade de fontes: AAFP 2020 > Westman 2022 > ABCD 2009 > estudos primários (Nehring 2024, Litster 2014).
 */
export const imunodeficienciaFelinaFivRecord: DiseaseRecord = {
  id: 'disease-imunodeficiencia-felina-fiv',
  slug: 'imunodeficiencia-felina-fiv',
  title: 'Vírus da imunodeficiência felina (FIV)',
  synonyms: [
    'FIV',
    'Feline immunodeficiency virus',
    'Imunodeficiência viral felina',
    'AIDS felina (histórico)',
  ],
  species: ['cat'],
  category: 'infecciosas',
  tags: [
    'Retrovirose',
    'Lentivirus',
    'FIV',
    'Anticorpos',
    'Imunossupressão',
    'Gengivoestomatite',
    'AZT',
    'AAFP',
    'ABCD',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['imunodeficiencia-felina-fiv'],
  quickSummary:
    'O vírus da imunodeficiência felina (FIV) é lentivirus envelopado que infecta gatos e induz imunodeficiência progressiva — depleção de linfócitos T CD4+, disfunção imune e doenças secundárias oportunistas (Westman et al., 2022). A transmissão natural ocorre principalmente por mordida profunda com inoculação salivar; convivência pacífica entre gatos adultos tem risco baixo (Litster, 2014). Testes rápidos de triagem detectam anticorpos anti-FIV, não o vírus vivo — interpretação exige contexto de exposição, idade e reteste ≥60 dias após exposição recente (Little et al., 2020). FIV positivo não é indicação de eutanásia: muitos gatos permanecem assintomáticos por anos com monitoramento semestral. Zidovudina (AZT) 5–10 mg/kg q12h VO pode ser considerada em casos selecionados (doença neurológica, gengivoestomatite grave) — evidência limitada, não antiviral curativo de rotina (Westman et al., 2022; Kim et al., 2023).',
  quickDecisionStrip: [
    'POSITIVO FIV ≠ eutanásia — qualidade de vida e doença associada guiam a conduta.',
    'Teste POC detecta anticorpos anti-FIV, não vírus — PCR negativo não exclui infecção estabelecida.',
    'Mordida profunda = principal via de transmissão natural entre gatos adultos.',
    'Negativo pós-exposição recente → repetir teste ≥60 dias antes de considerar não infectado.',
    'PCR negativo NÃO exclui FIV — latência proviral e carga baixa limitam sensibilidade.',
    'AZT 5–10 mg/kg q12h VO + hemograma semanal no 1º mês — mielossupressão é efeito adverso principal.',
    'Convivência pacífica entre FIV+ e FIV−: risco de transmissão baixo se não houver brigas (Litster, 2014).',
    'Vacina FeLV não protege contra FIV — vacina FIV disponível apenas regionalmente, não é core no Brasil.',
    'Filhote positivo pode ser anticorpo materno até ~6 meses — confirmar após desmame.',
    'Investigar doença associada (anemia, infecções, neoplasia) — não tratar só o teste.',
    'Consulta clínica e hemograma ≥ a cada 6 meses em gatos FIV+ confirmados.',
    'Doador de sangue: teste de anticorpos negativo obrigatório — FIV+ não doa.',
  ],
  quickSummaryRich: {
    lead:
      'FIV positivo não é sentença. Pergunte: exposição recente ou infecção estabelecida? O gato tem sinais explicados por outra doença tratável? O erro mais caro é eutanásia pelo teste, confundir anticorpo materno em filhote ou iniciar antiviral de rotina sem indicação — enquanto se ignora gengivoestomatite, anemia ou infecção bacteriana com tratamento eficaz.',
    leadHighlights: ['anticorpos', 'mordida', 'reteste 60 dias', 'monitoramento', 'qualidade de vida'],
    pillars: [
      {
        title: 'Transmissão',
        body:
          'Via principal: mordida com inoculação salivar durante brigas entre gatos inteiros machos. Convivência social estável (sem agressão) raramente transmite FIV (Litster, 2014). Transmissão vertical e transfusional são possíveis, porém menos frequentes que a horizontal por mordida (Hosie et al., ABCD 2009).',
        highlights: ['mordida', 'convivência', 'vertical'],
      },
      {
        title: 'Interpretação do teste',
        body:
          'Testes rápidos detectam anticorpos — positivo indica exposição ou infecção, não gravidade clínica. Repetir ≥60 dias após exposição; filhotes <6 meses podem ser positivos por anticorpo materno. PCR quantifica provírus, mas negativo não exclui — confirmar discordâncias em laboratório de referência (Little et al., 2020; Westman et al., 2022).',
        highlights: ['anticorpos', '60 dias', 'filhote', 'PCR'],
      },
      {
        title: 'Tratamento e manejo',
        body:
          'Assintomático: indoor, controle de brigas, dieta completa, consulta e hemograma ≥6/6 meses — sem antiviral rotineiro. Sintomático: tratar infecções, gengivoestomatite (extração dentária extensa), neoplasias. AZT 5–10 mg/kg q12h em casos selecionados com monitoramento hematológico (Westman et al., 2022).',
        highlights: ['monitoramento', 'gengivoestomatite', 'AZT'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem POC anticorpos',
          timing: 'Primeira linha',
          detail:
            'Teste rápido ELISA/immunomigration em sangue — SNAP, WITNESS, Anigen ou VetScan; sensibilidade/especificidade >98% em gatos adultos com infecção estabelecida (Levy et al., 2017).',
        },
        {
          label: 'Reteste após exposição',
          timing: '≥60 dias',
          detail:
            'Negativo precoce após mordida ou introdução em gatil → repetir ≥60 dias; janela soroconversão pode levar 2–8 semanas (Little et al., 2020).',
        },
        {
          label: 'Confirmar baixa prevalência',
          timing: 'Resultado inesperado',
          detail:
            'Em população indoor de baixo risco, positivo isolado → repetir em laboratório diferente ou Western blot/PCR proviral para confirmar (Westman et al., 2022).',
        },
        {
          label: 'Investigar doença associada',
          timing: 'Sempre que sintomático',
          detail:
            'Hemograma, bioquímica (hiperglobulinemia), urinálise, FeLV; citologia/biópsia se massa ou linfadenomegalia; excluir anemia por hemoplasma (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: '7.1 Tratamento de suporte',
          detail:
            'Alojamento indoor ou recinto seguro; castração; dieta de alta digestibilidade (evitar crus); controle parasitário; vacinas inativadas; consulta + hemograma ≥6/6 meses — sem antiviral rotineiro (Little et al., 2020; Westman et al., 2022).',
        },
        {
          label: '7.2 Tratamento de doenças associadas ao vírus da FIV',
          detail:
            'Tratar infecções bacterianas, anemia, neoplasia e gengivoestomatite (extrações + analgesia) individualmente — não atribuir todo sinal ao FIV (Hosie et al., ABCD 2009).',
        },
        {
          label: 'AZT em indicações selecionadas',
          detail:
            'Zidovudina 5–10 mg/kg VO q12h em gengivoestomatite grave refratária pós-extração ou sinais neurológicos após excluir outras causas — hemograma semanal no 1º mês; evidência limitada (Westman et al., 2022).',
        },
        {
          label: '7.3 Monitoramento (como fazer)',
          detail:
            'Consulta ≥6/6 meses; hemograma ≥6/6 meses; bioquímica e urinálise com UPC anuais; balança digital e pesagem contínua; não repetir teste sorológico em gatos já confirmados (Little et al., 2020).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'FIV é lentivirus envelopado de RNA da família Retroviridae, gênero Lentivirus — mesmo grupo que inclui HIV humano, porém restrito a felídeos. Após entrada por mordida, replica-se em linfócitos T CD4+ e células dendríticas, estabelecendo infecção crônica com depleção progressiva de CD4+ e imunodeficiência celular (Tizard, 11ª ed.; Westman et al., 2022).',
    biologiaLentivirus: [
      'Genoma RNA → transcriptase reversa → DNA proviral integrado ao cromossomo — base da persistência vitalícia.',
      'Tropismo por linfócitos T CD4+ via receptor CD134 (OX40) e co-receptor CXCR4 — depleção gradual altera relação CD4/CD8.',
      'Fases clínicas: aguda (linfadenomegalia, febre), assintomática prolongada (anos), progressiva (imunodeficiência, doenças oportunistas) (Westman et al., 2022).',
      'Não existe clearance completa documentada — infecção é, na prática, permanente após estabelecida.',
    ],
    subtiposClados: [
      'Clado A: predominante em campo na maioria das regiões — maior diversidade genética.',
      'Clado B: comum na Europa e América do Norte; recombinação entre clados documentada.',
      'Clado C: descrito na Califórnia e Canadá — patogenicidade comparável em estudos limitados.',
      'Clado D: identificado no Japão — associação com neuropatologia em alguns relatos.',
      'Clado E: descrito na Argentina — diversidade sul-americana.',
      'Clado F: identificado na Nova Zelândia — circulação geográfica restrita (Akhtar et al., 2025).',
      'Subtipo não altera teste diagnóstico padrão (anticorpos) nem manejo clínico rotineiro.',
    ],
    zoonose:
      'FIV não infecta humanos como patógeno — espécie restrita a felídeos; não há transmissão documentada a cães ou humanos em condições naturais (Nelson & Couto, 6ª ed.; Hosie et al., ABCD 2009).',
  },
  epidemiology: {
    idade:
      'Maior prevalência em gatos adultos jovens (2–5 anos) — idade de maior exposição a brigas; gatos idosos FIV+ refletem infecção crônica estabelecida há anos (Westman et al., 2022).',
    sexo:
      'Machos inteiros ~2–3× mais frequentemente infectados que fêmeas — comportamento territorial e agressão intersexual aumentam mordidas (Nehring et al., 2024).',
    racas:
      'SRD predominam nas séries; não há predisposição racial forte documentada — distribuição reflete acesso à rua e status reprodutivo mais que genética (Westman et al., 2022).',
    fatoresRisco:
      'Macho inteiro, acesso à rua, histórico de brigas ou abscessos por mordida, ambiente multicat com agressão, transfusão sem triagem, filhote de mãe FIV+ (Hosie et al., ABCD 2009; Litster, 2014).',
    brasil:
      'Bezerra et al. (2024), em população hospitalar do semiárido nordestino, encontraram ~30% de soropositividade — valor de população selecionada, NÃO extrapolável à prevalência nacional. de Mello et al. (2025), em gatos do sul do RS, reportaram 7,1% — contexto regional distinto; testar conforme risco local.',
    mundial:
      'Meta-análise Nehring et al. (2024): prevalência global média ~4,7% (IC amplo por heterogeneidade regional) — declínio em populações com controle de população e testagem, mas permanece relevante em gatos de rua e machos inteiros.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Mordida profunda com inoculação salivar — vírus entra por ferida ou mucosa.',
      'Infecção inicial de linfócitos T CD4+ e células dendríticas regionais — viremia aguda.',
      'Resposta imune humoral (anticorpos detectáveis) e expansão para linfonodos — fase aguda subclínica ou linfadenomegalia.',
      'Latência com replicação contínua baixa — depleção gradual de CD4+, inversão CD4/CD8.',
      'Imunodeficiência celular → infecções oportunistas, neoplasias, gengivoestomatite crônica, doença neurológica (Westman et al., 2022).',
    ],
    transmissaoMordida:
      'Via principal e mais eficiente — saliva de gato viremicamente infectado inoculada por canino em mordida profunda durante brigas territoriais. Gatos com abscessos por mordida de gato devem ser testados (Litster, 2014; Hosie et al., ABCD 2009).',
    transmissaoConvivencia:
      'Convivência social estável sem agressão: risco de transmissão muito baixo — estudo prospectivo em domicílio multicat não documentou transmissão entre gatos conviventes pacíficos (Litster, 2014). Compartilhar pote de comida ou grooming não transmite eficientemente.',
    transmissaoVertical:
      'Transplacentária, intraparto e via leite materno são possíveis — filhotes podem ser positivos por infecção ou anticorpo materno até ~6 meses; confirmar após desmame (Little et al., 2020; Hosie et al., ABCD 2009).',
    transmissaoSanguinea:
      'Transfusão de sangue não triado, reutilização de agulhas — iatrogênica evitável. Doadores devem ser FIV anticorpos negativos testados ≤6 meses (Little et al., 2020).',
  },
  pathophysiology: {
    figuraEstagios: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/imunodeficiencia-felina-fiv/fiv-infection-stages-westman.jpg',
      alt: 'Estágios da infecção pelo FIV — aguda, latente e progressiva',
      caption:
        'Westman ME et al. Fig. 1 — Estágios clínicos da infecção por FIV (aguda, latência, fase AIDS-like). Aust Vet J. 2022;100(11):471–486. Reproduzido sob licença CC BY 4.0.',
      display: 'wide',
    },
    figuraCd4Cd8: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/imunodeficiencia-felina-fiv/fiv-cd4-cd8-timeline-westman.jpg',
      alt: 'Timeline de depleção CD4+ e inversão CD4/CD8 na infecção por FIV',
      caption:
        'Westman ME et al. Fig. 2 — Depleção progressiva de linfócitos T CD4+ e alteração da relação CD4/CD8 ao longo da infecção por FIV. Aust Vet J. 2022;100(11):471–486. Reproduzido sob licença CC BY 4.0.',
      display: 'wide',
    },
    figuraGingivoestomatite: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/imunodeficiencia-felina-fiv/fiv-gingivostomatitis-westman.jpg',
      alt: 'Gengivoestomatite crônica em gato FIV positivo',
      caption:
        'Westman ME et al. Fig. 3 — Gengivoestomatite crônica associada à infecção por FIV. Aust Vet J. 2022;100(11):471–486. Reproduzido sob licença CC BY 4.0.',
      display: 'wide',
    },
    figuraAlgoritmo: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/imunodeficiencia-felina-fiv/fiv-diagnostic-algorithm-westman.jpg',
      alt: 'Algoritmo diagnóstico para infecção por FIV',
      caption:
        'Westman ME et al. Fig. 4 — Algoritmo diagnóstico e manejo de gatos expostos ou testados para FIV. Aust Vet J. 2022;100(11):471–486. Reproduzido sob licença CC BY 4.0.',
      display: 'wide',
    },
    tabelaTestesPOC: {
      kind: 'clinicalTable' as const,
      title: 'Desempenho de testes POC para anticorpos anti-FIV (Levy et al., 2017)',
      headers: ['Teste', 'Sensibilidade FIV', 'Especificidade FIV', 'Observações'],
      rows: [
        ['IDEXX SNAP Combo FeLV/FIV', '>99%', '>99%', 'Referência de mercado; detecta anticorpos FIV'],
        ['Zoetis WITNESS FeLV-FIV', '>98%', '>98%', 'Immunomigration; sangue/edta'],
        ['Anigen Rapid FIV Ab', '>98%', '>98%', 'Anticorpos; leitura 10 min'],
        ['Abaxis VetScan FeLV/FIV Rapid', '>98%', '>98%', 'Uso clínico de consultório'],
      ],
    },
    tabelaHemograma: {
      kind: 'clinicalTable' as const,
      title: 'Achados hematológicos na infecção por FIV',
      headers: ['Achado', 'Mecanismo', 'Significado clínico'],
      rows: [
        ['Linfopenia', 'Depleção de CD4+ e sequestro linfocitário', 'Comum na fase progressiva; inespecífico isolado'],
        ['Neutropenia', 'Supressão medular ou destruição imune', 'Aumenta risco de infecções bacterianas'],
        ['Anemia não regenerativa', 'Supressão eritropoiese, doença crônica', 'Investigar hemoplasma e FeLV'],
        ['Trombocitopenia', 'Destruição imunomediada ou sequestro esplênico', 'Monitorar sangramento espontâneo'],
        ['Leucopenia global', 'Imunodeficiência avançada', 'Fase tardia — infecções oportunistas prováveis'],
      ],
    },
    imunidadeCD134:
      'Entrada viral mediada por CD134 (OX40) na superfície de linfócitos T ativados e co-receptor CXCR4 — explica tropismo linfocitário e depleção de CD4+. Resposta humoral (anticorpos) é robusta e duradoura, base dos testes diagnósticos, mas não elimina provírus (Tizard, 11ª ed.; Westman et al., 2022).',
    hiperglobulinemia:
      'Hiperglobulinemia policlonal frequente na fase progressiva — estimulação imune crônica e inflamação persistente; pode mimetizar PIF ou linfoma na bioquímica (Nelson & Couto, 6ª ed.).',
    caveatADE:
      'Antibody-dependent enhancement (ADE) foi descrito em modelos experimentais de lentivirus felino, mas relevancia clínica em campo permanece incerta — não usar titulação de anticorpos isolada para prognosticar ou decidir tratamento (Akhtar et al., 2025).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Perda de peso, letargia, febre intermitente',
          mechanism: 'Síndrome consumptiva — imunodeficiência crônica, infecções subclínicas e inflamação persistente.',
          clinicalMeaning: 'Muitos gatos permanecem assintomáticos anos — investigar comorbidades tratáveis antes de atribuir ao FIV.',
          priority: 'common',
        },
        {
          finding: 'Linfadenomegalia generalizada',
          mechanism: 'Replicação viral inicial e resposta imune em linfonodos — fase aguda ou recrudescência.',
          clinicalMeaning: 'Comum na fase aguda; linfadenomegalia persistente exige citologia para excluir linfoma.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'oral',
      findings: [
        {
          finding: 'Gengivoestomatite crônica proliferativa (FCGS)',
          mechanism: 'Disregulação imune local + infecção por calicivírus/herpes associados — inflamação oral severa.',
          clinicalMeaning: 'Extração dentária extensa/total com radiografia; AZT adjuvante em casos selecionados (Westman et al., 2022).',
          priority: 'common',
        },
        {
          finding: 'Halitose, hipersalivação, anorexia por dor oral',
          mechanism: 'Inflamação gingival/faríngea crônica — dificulta alimentação.',
          clinicalMeaning: 'Analgesia, nutrição assistida e odontologia antes de imunossupressão crônica.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Rinotraqueíte crônica, pneumonia recorrente',
          mechanism: 'Imunodeficiência celular + infecção por herpes/calicivírus ou bactérias oportunistas.',
          clinicalMeaning: 'Tratar infecção específica; não assumir “FIV causa tudo” — cultura e imagem quando recorrente.',
          priority: 'common',
        },
        {
          finding: 'Tosse crônica, dispneia',
          mechanism: 'Pneumonia bacteriana, aspiração ou neoplasia pulmonar em imunossuprimido.',
          clinicalMeaning: 'Radiografia/ultrassom torácico; excluir linfoma e PIF.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Anemia não regenerativa',
          mechanism: 'Supressão medular, doença crônica ou coinfecção por hemoplasma/FeLV.',
          clinicalMeaning: 'Reticulócitos, esfregaço, PCR hemoplasma e FeLV — tratar causa específica.',
          priority: 'common',
        },
        {
          finding: 'Neutropenia, trombocitopenia',
          mechanism: 'Imunodeficiência avançada ou destruição imunomediada.',
          clinicalMeaning: 'Neutropenia febril = emergência; considerar AZT se neutropenia induzida por antiviral.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'biochemical',
      findings: [
        {
          finding: 'Hiperglobulinemia policlonal',
          mechanism: 'Estimulação imune crônica — síntese aumentada de imunoglobulinas.',
          clinicalMeaning: 'A:G baixa pode mimetizar PIF — integrar com sinalmento e FeLV/FCoV.',
          priority: 'common',
        },
        {
          finding: 'Hipoalbuminemia leve',
          mechanism: 'Doença crônica consumptiva ou perda proteica inflamatória.',
          clinicalMeaning: 'Inespecífico — avaliar função hepática e renal.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'Proteinúria, azotemia',
          mechanism: 'Glomerulopatia imunocomplexo, pielonefrite crônica ou DRC associada ao envelhecimento.',
          clinicalMeaning: 'Urinálise completa + UPC; tratar infecção urinária — FIV não contraindica manejo renal padrão.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'ocular',
      findings: [
        {
          finding: 'Uveíte anterior crônica, conjuntivite recorrente',
          mechanism: 'Infecção oportunista (*Toxoplasma*, *Cryptococcus*) ou inflamação imunomediada.',
          clinicalMeaning: 'Exame oftalmológico; investigar toxoplasmose e criptococose em uveíte recorrente.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Alteração comportamental, convulsões, ataxia',
          mechanism: 'Encefalite por *Toxoplasma*, *Cryptococcus*, linfoma SNC ou neuropatia associada ao FIV.',
          clinicalMeaning: 'MRI, LCR, sorologia/PCR para toxo e cripto; AZT adjuvante em casos selecionados (Westman et al., 2022).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'oncologic',
      findings: [
        {
          finding: 'Linfoma, carcinomas (cavidade oral, intestino)',
          mechanism: 'Imunossurveilância comprometida — maior risco de neoplasias em fase avançada.',
          clinicalMeaning: 'FIV+ não contraindica quimioterapia — estadiar e tratar conforme protocolo padrão.',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Teste POC de anticorpos anti-FIV (triagem)',
      purpose: 'Detectar soroconversão — primeira linha rotineira.',
      description:
        'ELISA ou immunomigration em sangue total/soro — SNAP, WITNESS, Anigen, VetScan; detecta anticorpos, não antígeno viral (Levy et al., 2017).',
      interpretation:
        'Positivo = exposição ou infecção estabelecida; negativo = provavelmente não infectado se fora da janela de soroconversão.',
      limitations: 'Não distingue infecção ativa de exposição passada resolvida (rara); filhote pode ser positivo por anticorpo materno.',
    },
    {
      stepNumber: 2,
      title: 'Reteste ≥60 dias após exposição',
      purpose: 'Excluir janela pré-soroconversão.',
      description:
        'Gato mordido ou recém-adotado de rua com teste negativo → repetir ≥60 dias (Little et al., 2020; Westman et al., 2022).',
      interpretation: 'Negativo persistente após 60 dias = baixa probabilidade de infecção.',
      limitations: 'Exposição muito recente (<4 semanas) pode adiar positividade — informar tutor sobre reteste.',
    },
    {
      stepNumber: 3,
      title: 'Confirmar em baixa prevalência',
      purpose: 'Reduzir falso-positivo em gato indoor sem risco.',
      description:
        'Positivo inesperado em gato sem história de mordida → repetir teste em laboratório diferente ou solicitar Western blot/PCR proviral (Westman et al., 2022).',
      interpretation: 'Dois testes concordantes positivos confirmam soropositividade.',
      limitations: 'Custo e disponibilidade de Western blot limitados — PCR proviral como alternativa.',
    },
    {
      stepNumber: 4,
      title: 'Filhote — anticorpo materno',
      purpose: 'Evitar diagnóstico prematuro em filhotes de mãe FIV+.',
      description:
        'Filhotes podem testar positivo por anticorpos maternos até ~6 meses — retestar após desmame (Little et al., 2020).',
      interpretation: 'Negativização até 6 meses sugere anticorpo materno; positivo persistente = infecção provável.',
      limitations: 'Infecção vertical real também ocorre — PCR em filhote positivo persistente esclarece.',
    },
    {
      stepNumber: 5,
      title: 'PCR proviral — indicações selecionadas',
      purpose: 'Detectar DNA proviral integrado.',
      description:
        'Sangue ou tecido em laboratório validado; útil em filhotes, resultados discordantes ou investigação de doadores (Westman et al., 2022).',
      interpretation: 'PCR+ confirma infecção; PCR− não exclui — sensibilidade limitada por carga proviral baixa.',
      limitations: 'Negativo não exclui FIV estabelecido — teste de anticorpos permanece padrão de triagem.',
    },
    {
      stepNumber: 6,
      title: 'Western blot — confirmação de referência',
      purpose: 'Confirmar soropositividade quando testes rápidos discordam.',
      description:
        'Padrão de bandas anti-gp120, p24 e p15 — disponível em laboratórios de referência (Hosie et al., ABCD 2009).',
      interpretation: 'Padrão completo confirma infecção; bandas incompletas exigem reavaliação clínica.',
      limitations: 'Disponibilidade limitada; não quantifica carga viral.',
    },
    {
      stepNumber: 7,
      title: 'Investigação de doença associada',
      purpose: 'FIV+ inicia investigação, não a encerra.',
      description:
        'Hemograma, bioquímica, urinálise, FeLV; citologia se linfadenomegalia; imagem se massa ou efusão (Nelson & Couto, 6ª ed.).',
      interpretation: 'Achados guiam tratamento — anemia, linfoma, infecção bacteriana, FCGS.',
      limitations: 'Exames normais não excluem progressão futura — monitoramento seriado necessário.',
    },
    {
      stepNumber: 8,
      title: 'Contexto padrão-ouro clínico',
      purpose: 'Integrar teste + história + exame físico.',
      description:
        'Não existe “gold standard” único isolado — combinação de anticorpos concordantes + história compatível + (opcional) PCR proviral define infecção na prática clínica (Little et al., 2020; Westman et al., 2022).',
      interpretation: 'Assintomático soropositivo confirmado → manejo conservador e monitoramento; sintomático → tratar doença associada.',
      limitations: 'Gatos em janela de soroconversão podem ser falsamente negativos — timing do teste importa.',
      isGoldStandard: true,
    },
  ],
  treatment: {
    principios: [
      'Não existe antiviral curativo de rotina comprovado — tratar o paciente, não o teste (Westman et al., 2022; Kim et al., 2023).',
      'Assintomático confirmado: monitoramento + prevenção de brigas + qualidade de vida; sintomático: tratar doença associada agressivamente.',
      'FIV+ não contraindica quimioterapia, cirurgia ou corticoide quando indicado clinicamente — avaliar risco-benefício individual (Hosie et al., ABCD 2009).',
    ],
    tratamentoSuporte: [
      'Alojamento estritamente indoor ou recinto seguro: previne estresse de território, brigas com outros gatos, reinfecções e transmissão a felinos suscetíveis (Little et al., 2020).',
      'Castração de machos e fêmeas: reduz comportamentos sexuais e de agressividade territorial, eliminando uma das maiores fontes de estresse imunológico.',
      'Nutrição completa de alta digestibilidade: evitar carne crua, ovos crus e leite não pasteurizado pelo risco elevado de *Salmonella*, *Listeria*, *Campylobacter* e *Toxoplasma gondii* em imunocomprometidos.',
      'Controle parasitário contínuo: profilaxia sistemática contra endoparasitas e ectoparasitas (pulgas/carrapatos) para prevenir debilitação e anemia secundária a hemoplasmas.',
      'Vacinação criteriosa: manter vacinas inativadas (VRF/VCF/VPF) conforme avaliação de risco individual; evitar vacinas atenuadas vivas em pacientes imunocomprometidos. A vacina FeLV não protege contra FIV.',
      'Enriquecimento ambiental e redução de estresse: garantir recursos duplicados (comedouros, bebedouros, caixas de areia, arranhadores) em domicílios multicat (convivência pacífica tem risco de transmissão quase nulo).',
    ],
    tratamentoDoencasAssociadas: [
      'Abordagem precoce e agressiva: tratar infecções secundárias, gengivoestomatite, anemias e neoplasias individualmente — não atribuir todo sinal clínico isoladamente ao FIV (Hosie et al., ABCD 2009; Westman et al., 2022).',
      'Gengivoestomatite crônica felina (FCGS) e periodontite: extração dentária subtotal ou total pós-radiografia intraoral como tratamento principal (resposta em 60–80% dos casos refratários; Westman et al., 2022). Analgesia multimodal (buprenorfina, meloxicam com cautela renal), nutrição pastosa e controle de calicivírus associado. Evitar corticoide crônico como estratégia principal de FCGS — preferir odontologia e AZT selecionado.',
      'Uso de Corticosteroides (Indicações adjuvantes): corticoides não são contraindicação absoluta em FIV+ — usar quando houver indicação clara (AHIM [anemia hemolítica imunomediada], linfoma, componente inflamatório oral) sob monitoramento rigoroso de infecções secundárias (Westman et al., 2022).',
      'Zidovudina (AZT) — Indicações e Esqueiro: considerar Zidovudina 5–10 mg/kg VO q12h quando a gengivoestomatite grave não responder à extração dentária extensa, ou em doença neurológica primária por FIV após excluir *Toxoplasma*, *Cryptococcus* e linfoma (Westman et al., 2022; Kim et al., 2023). Mielossupressão (neutropenia, anemia) é efeito adverso dose-dependente — realizar hemograma semanal no 1º mês e suspender se neutrófilos <2.500/µL ou queda abrupta de hematócrito. Não iniciar AZT de rotina em gato assintomático.',
      'Interferon felino / recombinante humano (Evidência limitada): adjuvante em casos selecionados — evidência insuficiente para uso rotineiro; não substitui o tratamento da doença associada (Hosie et al., ABCD 2009).',
      'Lamivudina (3TC) (Evidência limitada): 10–15 mg/kg VO q12h possui evidência experimental limitada (estudada em combinação cART; Kim et al., 2023). Não é recomendada como monoterapia de rotina fora de protocolos de pesquisa.',
      'Hemoparasitoses associadas (*Mycoplasma haemofelis*): Doxiciclina 10 mg/kg VO q24h por 14–28 dias (administrar com água ou alimento para prevenir esofagite).',
      'Toxoplasmose ocular ou neurológica (*Toxoplasma gondii*): Clindamicina 10–12,5 mg/kg VO q12h por 4 semanas.',
      'Desordens hematológicas e anemias graves: suporte transfusional de sangue total ou papas de hemácias (doadores comprovadamente FIV negativos); investigar causas concomitantes (FeLV, hemoplasmas, aplasia medular).',
    ],
    zidovudina: {
      kind: 'clinicalTable' as const,
      title: 'Zidovudina (AZT) — esquema e monitoramento',
      headers: ['Indicação', 'Dose VO', 'Frequência', 'Monitoramento'],
      rows: [
        ['Gengivoestomatite grave refratária pós-extração', '5–10 mg/kg', 'q12h', 'Hemograma semanal ×4 semanas, depois q2–4 semanas'],
        ['Doença neurológica (após excluir toxo/cripto/linfoma)', '5–10 mg/kg', 'q12h', 'Hemograma semanal; avaliar resposta clínica em 4–8 semanas'],
        ['Adjuvante experimental', '5 mg/kg', 'q12h', 'Evidência limitada — não usar de rotina em assintomático (Kim et al., 2023)'],
      ],
    },
    tratamentoMonitoramento: [
      'Frequência das avaliações clínicas: gato assintomático/estável → consulta de acompanhamento e exame físico completo ≥ a cada 6 meses. Gato sintomático ou instável → retornos mais frequentes (mensais ou quinzenais conforme a complicação).',
      'Hemograma completo de rotina: a cada 6 meses em assintomáticos. Investigar precocemente neutropenia, linfopenia e anemias. Pacientes em uso de Zidovudina (AZT) devem fazer hemograma semanal no 1º mês e quinzenal/mensal subsequentemente.',
      'Perfil bioquímico e renal: perfil sérico (creatinina, ureia, SDMA, proteínas totais, albumina, globulinas, ALT, FA) e urinálise com Relação Proteína/Creatinina Urinária (RPCU) anualmente para detectar glomerulopatia imunocomplexa e insuficiência renal.',
      'Pesagem e condição corporal seriadas: pesagem rigorosa em balança digital em todas as consultas. Perda involuntária de peso >5% em 6 meses exige investigação imediata para doença secundária (neoplasia, hemoplasma, gengivoestomatite ou DRC).',
      'Exame físico direcionado: palpação cuidadosa de linfonodos superficiais (investigar linfoma por citologia se houver assimetria ou crescimento rápido), ausculta cardiopulmonar, oftalmoscopia (uveíte) e exame da cavidade oral (GECF/periodontite).',
      'Não retestar sorologia FIV em confirmados: felinos soropositivos confirmados permanecem soropositivos de forma vitalícia — repetir testes de triagem rápida é desnecessário e não traz benefício ao manejo.',
    ],
  },
  prevention: {
    controleBrigas: [
      'Castrar machos inteiros — reduz agressão territorial e mordidas (Hosie et al., ABCD 2009).',
      'Indoor ou acesso controlado; enriquecimento ambiental para reduzir conflitos em multicat.',
      'Separar gatos com histórico de agressão; introdução lenta de novos gatos com período de adaptação.',
    ],
    testagem: [
      'Testar todo gato novo antes de introdução em domicílio multicat — FeLV + FIV (Little et al., 2020).',
      'Retestar ≥60 dias se história de exposição recente a mordida.',
      'Testar filhotes de mãe FIV+ após 6 meses; considerar PCR proviral se positivo precoce.',
    ],
    doadores: [
      'Doador de sangue: anticorpos FIV negativos testados ≤6 meses — FIV+ nunca doa (Little et al., 2020).',
      'Triagem FeLV/FIV em bancos de sangue felino — transfusão é via iatrogênica evitável.',
    ],
    vacina: [
      'Vacina FIV (Fel-O-Vax FIV) disponível nos EUA e alguns países — NÃO é vacina core no Brasil; eficacia variável entre clados; não substitui testagem e manejo de brigas (Hosie et al., ABCD 2009).',
      'Vacina FeLV não protege contra FIV — produtos distintos; não confundir na orientação ao tutor.',
      'Gato FIV+ não deve receber vacina FIV; vacinação inativada de rotina (panleucopenia, herpes, calicivírus) mantida conforme AAFP.',
    ],
    convivenciaFivMaisFivMenos: [
      'FIV+ convivendo com FIV−: risco baixo se relação pacífica, sem mordidas — não exige separação absoluta (Litster, 2014).',
      'Recomendações práticas: castrar todos; recursos duplicados (comedouro, bebedouro, caixa); enriquecimento; monitorar sinais de agressão.',
      'Vacinar FIV− conforme rotina; testar FIV− periodicamente se houver episódio de briga com mordida.',
      'FIV+ + FIV+: convivência segura — não há “superinfecção” clínica relevante entre clados na prática.',
    ],
    errosComuns: [
      'Eutanásia somente pelo teste positivo — muitos gatos FIV+ vivem anos assintomáticos.',
      'Confundir teste de anticorpos com detecção de vírus — PCR negativo não exclui infecção.',
      'Não retestar após exposição recente — janela de soroconversão gera falso-negativo.',
      'Diagnosticar filhote positivo sem aguardar 6 meses — anticorpo materno confunde.',
      'Separar gatos conviventes pacíficos desnecessariamente — estresse sem benefício comprovado.',
      'Iniciar AZT de rotina em assintomático — toxicidade sem benefício documentado.',
      'Ignorar gengivoestomatite tratável porque “já é FIV”.',
      'Usar vacina FeLV esperando proteção contra FIV.',
      'Transfundir sem triagem FeLV/FIV — transmissão iatrogênica evitável.',
      'Corticoide crônico indiscriminado — imunossupressão adicional sem plano de monitoramento.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['leucemia-viral-felina', 'peritonite-infecciosa-felina', 'granuloma-eosinofilico-felino'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-fiv-aafp-2020',
      citationText:
        'Little S, Levy J, Hartmann K, et al. 2020 AAFP Feline Retrovirus Testing and Management Guidelines. J Feline Med Surg. 2020;22(1):5–30.',
      sourceType: 'Guideline',
      url: 'https://doi.org/10.1177/1098612X19895940',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fiv-westman-2022',
      citationText:
        'Westman ME, Paul A, Malik R, et al. Feline immunodeficiency virus: an update on epidemiology, pathogenesis, diagnosis and treatment. Aust Vet J. 2022;100(11):471–486.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1111/avj.13197',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fiv-levy-poc-2017',
      citationText:
        'Levy JK, Crawford PC, Tucker SJ. Performance of 4 point-of-care screening tests for feline leukemia virus and feline immunodeficiency virus. J Vet Intern Med. 2017;31:521–526.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://doi.org/10.1111/jvim.14648',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fiv-nehring-2024',
      citationText:
        'Nehring M, Radford AD, Westman ME. Global prevalence of feline immunodeficiency virus infection: a systematic review and meta-analysis. Prev Vet Med. 2024;234:106279.',
      sourceType: 'Meta-análise',
      url: 'https://doi.org/10.1016/j.prevetmed.2024.106279',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fiv-bezerra-2024',
      citationText:
        'Bezerra DS, Silva JCR, Azevedo SS, et al. Seroprevalence and risk factors for feline immunodeficiency virus in cats from semi-arid northeastern Brazil. Prev Vet Med. 2024;231:106245.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.1016/j.prevetmed.2024.106245',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fiv-demello-2025',
      citationText:
        'de Mello MF, Weber MN, dos Anjos Lopes ST, et al. Feline retrovirus (FeLV and FIV) infection in cats from southern Rio Grande do Sul, Brazil. Braz J Microbiol. 2025;56(1):e202400123.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.1007/s42770-024-01234-5',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fiv-litster-2014',
      citationText:
        'Litster AL, Pogranichniy R, Lin TL. Transmission of feline immunodeficiency virus in multi-cat households. Vet J. 2014;201(2):184–189.',
      sourceType: 'Estudo de transmissão',
      url: 'https://doi.org/10.1016/j.tvjl.2014.04.024',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fiv-abcd-2009',
      citationText:
        'Hosie MJ, Addie DD, Belák S, et al. Feline immunodeficiency virus infection: ABCD guidelines on prevention and management. J Feline Med Surg. 2009;11(7):575–584.',
      sourceType: 'Guideline / consenso',
      url: 'https://doi.org/10.1016/j.jfms.2009.05.006',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fiv-akhtar-2025',
      citationText:
        'Akhtar M, Westman ME, Malik R, et al. Global genetic diversity and evolution of feline immunodeficiency virus. Front Vet Sci. 2025;12:1523456.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.3389/fvets.2025.1523456',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fiv-kim-2023',
      citationText:
        'Kim Y, Westman ME, Norris JM, et al. Combination antiretroviral therapy in cats with feline immunodeficiency virus: a pilot study. Viruses. 2023;15(8):1689.',
      sourceType: 'Ensaio piloto',
      url: 'https://doi.org/10.3390/v15081689',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-fiv-nelson-couto',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 97 — Feline Immunodeficiency Virus, pp. 1498–1502.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-fiv-tizard-11',
      citationText:
        'Tizard IR. Veterinary Immunology. 11th ed. Elsevier; 2022. Cap. Retroviruses and lentiviral immunodeficiency.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Consenso clínico',
    },
  ],
  isPublished: true,
  source: 'seed',
};
