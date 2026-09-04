import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Gengivoestomatite crônica felina (GECF) — síntese editorial Vetius.
 * Prioridade: Lobprise et al. FelineVMA 2025 > Soltero-Rivera et al. 2023 > Sánchez-Vallejo et al. 2025 > Jennings et al. 2015.
 */
export const gengivoestomatiteCronicaFelinaRecord: DiseaseRecord = {
  id: 'disease-gengivoestomatite-cronica-felina',
  slug: 'gengivoestomatite-cronica-felina',
  title: 'Gengivoestomatite crônica felina (GECF)',
  synonyms: [
    'GECF',
    'Estomatite felina',
    'Gengivite-estomatite crônica felina',
    'Mucosite caudal felina',
    'Estomatite linfoplasmocitária',
    'Caudal stomatitis',
    'Plasma-cell stomatitis',
    'Contact mucositis',
  ],
  species: ['cat'],
  category: 'odontologia',
  tags: [
    'GECF',
    'Estomatite',
    'Extração dentária',
    'PME',
    'FME',
    'Calicivírus felino',
    'FCV',
    'Ciclosporina',
    'SDAI',
    'Odontologia',
    'FelineVMA',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['gengivoestomatite-cronica-felina'],
  quickSummary:
    'A gengivoestomatite crônica felina (GECF) é síndrome inflamatória oral intensamente dolorosa e provavelmente multifatorial, com resposta imune persistente contra estímulos antigênicos na cavidade oral — a inflamação ultrapassa a gengiva e acomete mucosa alveolar, bucal, sublingual e/ou região caudal. Calicivírus felino (FCV), disbiose oral, doença periodontal e características imunológicas do hospedeiro participam, mas nenhum agente isolado explica todos os casos (Soltero-Rivera et al., 2023; Sánchez-Vallejo et al., 2025). Tratamento de primeira linha: extrações dentárias (extração parcial da boca — PME ou extração de boca inteira — FME) + analgesia multimodal + radiografias intraorais de boca inteira — não antibiótico ou corticoide crônico como substituto (Lobprise et al., 2025). Após extrações adequadas: ~28% resolução completa, ~39% melhora substancial e ~33% resposta inadequada (Jennings et al., 2015). Ciclosporina 2,5 mg/kg q12h para refratários pós-extração possui ensaio randomizado duplo-cego (Lommer, 2013).',
  quickDecisionStrip: [
    'GECF não é gengivite — a inflamação ultrapassa a margem gengival e atinge mucosa alveolar, bucal e caudal (Lobprise et al., 2025; Soltero-Rivera et al., 2023).',
    'Estomatite caudal (mucosite ulcerada/proliferativa caudal) é o achado mais característico (Lobprise et al., 2025; Soltero-Rivera et al., 2023).',
    'Tratamento de 1ª linha: extração dentária ampla (PME/FME) + radiografia intraoral + analgesia (Lobprise et al., 2025; Jennings et al., 2015).',
    'Ciclosporina (2,5 mg/kg q12h) é opção de 2ª linha para refratários pós-extração com suporte em RCT (Lommer, 2013).',
    'Radiografias intraorais de boca inteira são OBRIGATÓRIAS para identificar raízes retidas e perda óssea (Lobprise et al., 2025).',
    'Antibiótico NÃO é tratamento da GECF — melhora transitória possível, recidiva ao suspender; não substitui odontologia (Lobprise et al., 2025).',
    'Corticosteroide de depósito (triamcinolona/depo-medrol) é refugio temporário com alta taxa de refratariedade secundária e efeitos adversos — não usar como 1ª linha (Soltero-Rivera et al., 2023).',
    'Calicivírus felino (FCV) positivo por PCR ≠ diagnóstico de GECF — associação epidemiológica, não etiologia única (Soltero-Rivera et al., 2023).',
    'Biopsiar lesões focais, assimétricas, endurecidas ou proliferativas — GECF e carcinoma de células escamosas (SCC) podem coexistir (Tsugawa et al., 2025).',
    'Laser CO2 e células-tronco mesenquimais (MSC) são terapias adjuvantes/avançadas em centros especializados para refratários (Arzi et al., 2016).',
  ],
  quickSummaryRich: {
    lead:
      'GECF não é “gengivite forte”. Pergunte: a dor impede comer? A inflamação vai além da gengiva? O erro mais caro é alternar antibiótico e corticoide por meses sem radiografias, extrações completas e analgesia — enquanto se ignora raiz retida ou neoplasia focal.',
    leadHighlights: ['além da gengiva', 'extrações', 'radiografia', 'analgesia', 'FeLV/FIV'],
    pillars: [
      {
        title: 'Diagnóstico odontológico',
        body:
          'Predominantemente clínico sob anestesia: odontograma, sondagem, radiografias intraorais de boca inteira, FeLV/FIV. Índice de atividade da estomatite (SDAI) para acompanhar resposta (Lobprise et al., 2025; Soltero-Rivera et al., 2023).',
        highlights: ['SDAI', 'radiografia', 'anestesia'],
      },
      {
        title: 'PME × FME',
        body:
          'Extração parcial da boca (PME): todos pré-molares e molares — razoável se incisivos/caninos sem mucosite relevante. Extração de boca inteira (FME): toda dentição — preferir se doença rostral/difusa ou falha de PME (Lobprise et al., 2025; Jennings et al., 2015).',
        highlights: ['PME', 'FME', 'intervenção precoce'],
      },
      {
        title: 'Refratários',
        body:
          'Após extração adequada: ciclosporina 2,5 mg/kg q12h (RCT), interferon-ω felino recombinante 100.000 UI/gato q24h ×90 dias (FCV+), células mesenquimais estromais (MSC) — nunca MSC antes da extração (Lommer, 2013; Hennet et al., 2011; Soltero-Rivera et al., 2023).',
        highlights: ['ciclosporina', 'interferon', 'MSC'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Consulta',
          detail:
            'Dor oral, ptialismo, hiporexia, inflamação além da gengiva — exame consciente limitado à tolerância (Soltero-Rivera et al., 2023).',
        },
        {
          label: 'Pré-anestesia',
          timing: 'Antes da cirurgia',
          detail:
            'Hemograma, bioquímica, FeLV/FIV, peso, SDAI basal, fotografias seriadas (Lobprise et al., 2025).',
        },
        {
          label: 'Anestesia + imagem',
          timing: 'Padrão-ouro',
          detail:
            'Exame oral completo, odontograma, radiografias intraorais de boca inteira — identificar periodontite, reabsorção, raízes retidas (Farcas et al., 2014).',
        },
        {
          label: 'Biópsia se atípico',
          timing: 'Selecionado',
          detail:
            'Lesão unilateral, focal, endurecida, proliferativa ou não cicatrizante — excluir carcinoma de células escamosas (Tsugawa et al., 2025).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terapêutico',
      steps: [
        {
          label: 'Extrações + analgesia',
          dose: 'PME ou FME conforme distribuição + buprenorfina 0,02–0,03 mg/kg q6h perioperatório',
          duration: 'Cirurgia única com reavaliação 2–3 meses',
          detail:
            'Alveoloplastia, remoção de raízes, fechamento sem tensão, analgesia multimodal — nunca extração sem radiografia (Lobprise et al., 2025).',
        },
        {
          label: 'Reavaliar SDAI',
          timing: '2 semanas, 2–3 meses, 6 meses',
          reassess: 'Peso, grooming, ingestão, fotos seriadas',
          detail:
            'Não classificar refratário em 2 semanas — inflamação leva tempo para regredir (Soltero-Rivera et al., 2023).',
        },
        {
          label: 'Refratário pós-extração',
          detail:
            'Confirmar raízes ausentes radiograficamente → ciclosporina / interferon-ω / MSC conforme fenótipo (Lommer, 2013; Soltero-Rivera et al., 2023).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'FCGS é síndrome inflamatória oral crônica imunomediada na qual o equilíbrio entre tolerância mucosa e defesa antimicrobiana se perde — resposta desproporcional e persistente a estímulos normalmente tolerados (antígenos dentários, biofilme, vírus, microbiota) (Soltero-Rivera et al., 2023; Sánchez-Vallejo et al., 2025).',
    diferencaGengivite:
      'Gengivite: inflamação limitada à gengiva marginal. Periodontite: perda de ligamento periodontal e osso. FCGS: inflamação ultrapassa gengiva — mucosa alveolar, bucal, sublingual e caudal (Lobprise et al., 2025). Abandonar termo “faucite” — nomenclatura anatomicamente imprecisa (Lobprise et al., 2025).',
    fatoresAssociados: [
      'Calicivírus felino (FCV): associação viral mais consistente — não causa única; PCR positivo não confirma etiologia no indivíduo (Soltero-Rivera et al., 2023; Sánchez-Vallejo et al., 2025).',
      'Vírus da imunodeficiência felina (FIV) e leucemia felina (FeLV): alteram imunidade e prognóstico — FeLV ≈7,5× falha pós-extração (Silva et al., 2021).',
      'Disbiose oral: Porphyromonas, Fusobacterium, Tannerella e outros — perpetuador, não patógeno único (Anderson et al., 2023; Sánchez-Vallejo et al., 2025).',
      'Doença periodontal, reabsorção dentária e biofilme dentário: fontes antigênicas persistentes (Soltero-Rivera et al., 2023).',
      'Bartonella: associação conflitante — não tratar empiricamente FCGS como bartonelose (Soltero-Rivera et al., 2023).',
    ],
  },
  epidemiology: {
    prevalencia:
      'Prevalência exata variável; FCGS é causa importante de dor oral crônica felina em prática de referência odontológica. Revisão sistemática 2025 (17 estudos): natureza multifatorial confirmada (Sánchez-Vallejo et al., 2025).',
    retrovirus:
      'FeLV positivo associado a pior resposta após extrações dentárias — testar antes de terapia definitiva (Silva et al., 2021; Lobprise et al., 2025).',
  },
  pathogenesisTransmission: {
    cascata: [
      'Antígenos orais persistentes (dente–biofilme–periodonto–vírus) → barreira mucosa alterada (Soltero-Rivera et al., 2023).',
      'Ativação imune inapropriada → células T CD8+ efetoras ↑, citocinas inflamatórias ↑ (Soltero-Rivera et al., 2023).',
      'Ativação de linfócitos B/plasmócitos → hiperglobulinemia possível → inflamação mucosa persistente (Soltero-Rivera et al., 2023).',
      'Úlceração + proliferação + dor → barreira epitelial pior → maior exposição antigênica → ciclo auto-perpetuante.',
      'Antibiótico melhora temporariamente carga bacteriana mas não corrige resposta T anormal — recidiva ao suspender (Soltero-Rivera et al., 2023).',
    ],
    porQueExtracaoFunciona:
      'Extração reduz superfície para biofilme, bolsa periodontal, periodontite, reabsorção dentária e carga antigênica global — ~2/3 respondem, mas ~1/3 permanece refratário porque fisiopatologia imunológica persiste (Jennings et al., 2015; Soltero-Rivera et al., 2023).',
  },
  pathophysiology: {
    figuraFenotipos: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/gengivoestomatite-cronica-felina/fcgs-fenotipos-soltero-rivera-2023.jpg',
      alt: 'Fenótipos clínicos da FCGS — ulcerativo, proliferativo e misto',
      caption:
        'Apresentação heterogênea da gengivoestomatite crônica felina (FCGS): úlceração e proliferação podem coexistir e envolver mucosa bucal, alveolar, sublingual e caudal. Soltero-Rivera M, Goldschmidt S, Arzi B. J Feline Med Surg. 2023. Licença CC BY-NC 4.0.',
    },
    figuraImunologia: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/gengivoestomatite-cronica-felina/fcgs-imuno-histoquimica-arzi-2020.jpg',
      alt: 'Imuno-histoquímica da mucosa oral em FCGS',
      caption:
        'Infiltração de células T e B na mucosa de gatos com FCGS — processo imunoinflamatório organizado, não infecção bacteriana simples. Arzi B et al. Front Vet Sci. 2020.',
    },
    tabelaPMEFME: {
      kind: 'clinicalTable' as const,
      title: 'Extração parcial (PME) × extração de boca inteira (FME)',
      headers: ['Estratégia', 'Dentes extraídos', 'Preferir quando'],
      rows: [
        ['PME — partial mouth extraction', 'Todos pré-molares e molares', 'Inflamação caudal; incisivos/caninos sem mucosite relevante (Lobprise et al., 2025)'],
        ['FME — full mouth extraction', 'Toda dentição', 'Doença rostral/difusa; envolvimento incisivos/caninos; PME falhou (Lobprise et al., 2025; Jennings et al., 2015)'],
      ],
    },
    tabelaDesfechoExtracao: {
      kind: 'clinicalTable' as const,
      title: 'Desfecho após extrações (Jennings et al., 2015 — 95 gatos)',
      headers: ['Desfecho', 'Frequência', 'Interpretação'],
      rows: [
        ['Resolução completa', '28%', 'Cura clínica possível, não garantida'],
        ['Melhora substancial', '39%', 'Resposta clínica importante'],
        ['Resposta inadequada', '~33%', 'Refratário — investigar raízes, neoplasia, imunomodulação'],
        ['PME × FME', 'Sem diferença estatística global', 'Escolha pela distribuição da inflamação, não por superioridade automática de FME'],
      ],
    },
    tabelaHierarquiaTerapeutica: {
      kind: 'clinicalTable' as const,
      title: 'Hierarquia terapêutica — evidência',
      headers: ['Terapia', 'Papel', 'Evidência', 'Status'],
      rows: [
        ['PME/FME + analgesia', 'Primeira linha', 'Maior evidência disponível', 'Fundamental'],
        ['Antibiótico sistêmico', 'Infecção secundária selecionada', 'Melhora transitória', 'Não rotina'],
        ['Prednisolona crônica', 'Resgate limitado', 'Remissão ~7%', 'Não primeira linha'],
        ['Ciclosporina 2,5 mg/kg q12h', 'Pós-extração refratária', 'RCT duplo-cego (Lommer, 2013)', 'Segunda linha'],
        ['Interferon-ω 100.000 UI q24h ×90d', 'Refratário/FCV+', 'RCT (Hennet et al., 2011)', 'Imunomodulação selecionada'],
        ['Células mesenquimais (MSC)', 'Refratário pós-extração', 'Séries prospectivas', 'Especialista'],
        ['Canabidiol (CBD) 4 mg q12h', 'Adjuvante pós-extração', 'RCT pequeno (Coelho et al., 2023)', 'Preliminar'],
        ['Molnupiravir/EIDD-1931', 'Antiviral sistêmico', 'Sem evidência FCGS', 'Não recomendar rotineiramente'],
      ],
    },
    sdaI:
      'Índice de atividade da estomatite (SDAI): avaliar gengiva maxilar/mandibular, mucosa bucal, arco palatoglossal, sublingual e molar flap (0–3 por região). Lobprise et al. (2025) recomendam SDAI para monitorar resposta e comunicar prognóstico.',
    dor:
      'Mucosa ulcerada produz prostaglandinas, citocinas e sensibilização de nociceptores — pseudoanorexia por dor oral comum; “ainda come” não exclui dor intensa (Soltero-Rivera et al., 2023).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'oral',
      findings: [
        {
          finding: 'Inflamação além da gengiva — mucosa alveolar, bucal, caudal, sublingual',
          mechanism: 'Resposta imune desproporcional a antígenos orais persistentes — não limitada ao periodonto.',
          clinicalMeaning: 'Diagnóstico clínico-odontológico; diferenciar de gengivite/periodontite isolada (Lobprise et al., 2025).',
          priority: 'common',
        },
        {
          finding: 'Fenótipo ulcerativo, proliferativo ou misto',
          mechanism: 'Infiltrado linfoplasmocitário + destruição epitelial ou hiperplasia reativa.',
          clinicalMeaning: 'Documentar fotograficamente; SDAI seriado (Soltero-Rivera et al., 2023).',
          priority: 'common',
        },
        {
          finding: 'Sangramento espontâneo e halitose intensa',
          mechanism: 'Úlceração friável e colonização bacteriana secundária.',
          clinicalMeaning: 'Analgesia obrigatória; não tratar só com antibiótico tópico/sistêmico (Lobprise et al., 2025).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Hiporexia, perda de peso, grooming reduzido',
          mechanism: 'Dor oral crônica → evita mastigação; pseudoanorexia.',
          clinicalMeaning: 'Suporte nutricional (dieta úmida, tubo esofágico se grave); analgesia antes de julgar “inapetência” (Lobprise et al., 2025).',
          priority: 'common',
        },
        {
          finding: 'Ptialismo e vocalização ao comer',
          mechanism: 'Estimulação nociceptiva ao apreender/mastigar.',
          clinicalMeaning: 'Perguntar: interesse pela comida com recusa ao morder? (Soltero-Rivera et al., 2023).',
          priority: 'common',
        },
        {
          finding: 'Hiperglobulinemia possível',
          mechanism: 'Ativação crônica de células B/plasmócitos.',
          clinicalMeaning: 'Inespecífico — também FeLV, FIV, FIP, neoplasia; não confirma FCGS (Soltero-Rivera et al., 2023).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'lymphatic',
      findings: [
        {
          finding: 'Linfadenomegalia submandibular',
          mechanism: 'Drenagem de inflamação oral crônica.',
          clinicalMeaning: 'Achado de suporte; biopsiar linfonodo apenas se atípico.',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'Diagnóstico predominantemente clínico e odontológico sob anestesia — não depende de histopatologia de rotina (Lobprise et al., 2025). Histologia mostra infiltrado linfoplasmocitário, mas não é patognomônica. Biópsia fortemente recomendada se lesão focal, assimétrica, endurecida ou proliferativa — FCGS e carcinoma de células escamosas (SCC) podem coexistir (Tsugawa et al., 2025). PCR para calicivírus felino (FCV) tem valor epidemiológico/prognóstico, não confirmatório isolado (Soltero-Rivera et al., 2023).',
    tabelaDiferencial: {
      kind: 'clinicalTable' as const,
      title: 'Principais diagnósticos diferenciais',
      headers: ['Condição', 'Pista distintiva'],
      rows: [
        ['Periodontite grave', 'Inflamação predominantemente marginal/periodontal com perda óssea localizada'],
        ['Reabsorção dentária', 'Dor localizada; alteração coronária ou só radicular ao raio-X'],
        ['Carcinoma de células escamosas (SCC)', 'Massa focal, induração, assimetria, osteólise progressiva'],
        ['Linfoma oral', 'Infiltração/massa; contexto compatível'],
        ['Complexo granuloma eosinofílico', 'Morfológias típicas (úlcera labial, placa, linear)'],
        ['Estomatite urêmica', 'Doença renal avançada + hálito urêmico'],
        ['Calicivírus agudo', 'Úlceração aguda + sinais respiratórios upper'],
        ['Maloclusão traumática caudal', 'Mucosite localizada por contato mecânico (Lobprise et al., 2025)'],
      ],
    },
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Exame oral consciente',
        purpose: 'Triagem de dor e localização geral.',
        description:
          'Identificar halitose, ptialismo, sangramento, assimetria — não forçar abertura se dor severa (Soltero-Rivera et al., 2023).',
        interpretation: 'Inflamação além da gengiva eleva suspeita de FCGS.',
        limitations: 'Exame incompleto — anestesia necessária.',
      },
      {
        stepNumber: 2,
        title: 'FeLV/FIV + laboratório basal',
        purpose: 'Prognóstico e planejamento terapêutico.',
        description:
          'Hemograma, bioquímica (renal/hepático antes de AINE/ciclosporina), FeLV/FIV se status desconhecido (Lobprise et al., 2025; Silva et al., 2021).',
        interpretation: 'FeLV positivo: maior risco de falha pós-extração.',
        limitations: 'Laboratório normal não exclui FCGS.',
      },
      {
        stepNumber: 3,
        title: 'Anestesia + exame oral completo + radiografias intraorais',
        purpose: 'Diagnóstico definitivo operacional e planejamento cirúrgico.',
        description:
          'Odontograma, sondagem, radiografias de boca inteira — reabsorção, raízes retidas, periodontite (Farcas et al., 2014; Lobprise et al., 2025).',
        interpretation: 'Doença dentária oculta frequente — radiografia não é opcional.',
        limitations: 'Achados radiográficos isolados não explicam toda FCGS.',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'Biópsia incisional se indicada',
        purpose: 'Excluir neoplasia ou confirmar lesão atípica.',
        description:
          'Unilateral, focal, endurecida, proliferativa, não cicatrizante, osteólise (Tsugawa et al., 2025; Soltero-Rivera et al., 2023).',
        interpretation: 'Infiltrado linfoplasmocitário compatível com FCGS, mas não patognomônico.',
        limitations: 'Não obrigatória para fenótipo clássico difuso.',
      },
      {
        stepNumber: 5,
        title: 'PCR calicivírus felino (FCV) — selecionado',
        purpose: 'Informação prognóstica/terapêutica em refratários.',
        description:
          'Orofaringe/conjuntiva; combinar métodos aumenta detecção (Soltero-Rivera et al., 2023).',
        interpretation: 'Positivo não confirma causa; negativo não exclui FCGS.',
        limitations: 'Não exame obrigatório de rotina.',
      },
    ],
  },
  treatment: {
    extracaoDentaria: [
      'Primeira linha: PME ou FME conforme distribuição da inflamação — intervenção precoce preferida (Lobprise et al., 2025).',
      'Requisitos: radiografias pré e pós-operatórias, remoção de raízes retidas, alveoloplastia, fechamento sem tensão, analgesia multimodal (Lobprise et al., 2025).',
      'Nunca extração parcial “visual” em doença difusa sem radiografia completa.',
      'Considerar tubo esofágico preemptivo se extração extensa e hiporexia grave (Lobprise et al., 2025).',
    ],
    tabelaAnalgesia: {
      kind: 'clinicalTable' as const,
      title: 'Analgesia multimodal na FCGS',
      headers: ['Fármaco', 'Dose (gato)', 'Observações'],
      rows: [
        ['Buprenorfina', '0,02–0,03 mg/kg IV/IM q6h', 'Preferir parenteral perioperatório; OTM tem menor biodisponibilidade em mucosa doente (Stathopoulou et al., 2018; Allerton, BSAVA Formulary 2020)'],
        ['Gabapentina', '5–10 mg/kg VO q8–12h', 'Adjuvante; evidência indireta — não trata FCGS (Soltero-Rivera et al., 2023)'],
        ['Meloxicam', '0,01–0,05 mg/kg VO q24h', 'Somente se hidratado, renal OK, sem corticoide concomitante'],
        ['Robenacoxib', '1–2 mg/kg VO q24h', 'Mesmas cautelas renais/hidratacionais'],
        ['Amantadina', '3–5 mg/kg VO q24h', 'Adjuvante dor centralizada — evidência de OA felina, não FCGS (Soltero-Rivera et al., 2023)'],
      ],
    },
    antimicrobianos:
      'Antibióticos sistêmicos geralmente NÃO necessários após extrações; não substituem cirurgia. Considerar apenas infecção secundária, osteomielite, tecido de má qualidade ou imunossupressão grave (Lobprise et al., 2025). Se necessário: amoxicilina + clavulanato 13,75 mg/kg q12h ou clindamicina 5–11 mg/kg q12h por curto curso — guideline 2025 mais conservadora que práticas históricas (Soltero-Rivera et al., 2023).',
    corticoides:
      'Prednisolona 1 mg/kg q24h com desmame ~3 semanas: ~23% melhora, ~7% remissão — NÃO primeira linha; não substituir extrações (Soltero-Rivera et al., 2023). Risco diabetes, imunossupressão. Nunca AINE + corticoide simultâneos.',
    ciclosporina:
      'Indicação: FCGS clinicamente significativa após extração adequada. Dose estudada: 2,5 mg/kg VO q12h, formulação microemulsionada modificada (Lommer, 2013). RCT: 77,8% melhora vs 14,3% placebo; concentração >300 ng/mL associada a maior resposta. Desaconselhar imunossupressão sem intervenção cirúrgica prévia (Soltero-Rivera et al., 2023).',
    interferonOmega:
      'Interferon-ω felino recombinante: 100.000 UI/gato q24h oromucoso ×90 dias — RCT em refratários FCV+ (Hennet et al., 2011; Plumb\'s 2023). Disponibilidade limitada em alguns mercados.',
    msc:
      'Células mesenquimais estromais (MSC): terapia especializada pós-extração refratária — resposta positiva ~65,5% em longo prazo; NÃO usar antes da extração (Soltero-Rivera et al., 2023).',
    experimental:
      'Canabidiol (CBD) 4 mg/gato q12h ×15 dias: adjuvante pós-extração — evidência preliminar (Coelho et al., 2023). PSSNa tópico 2026: redução carga FCV, experimental. Molnupiravir/EIDD-1931: sem evidência robusta para FCGS — não rotina.',
    monitoramento: [
      'SDAI seriado + fotografias + peso + avaliação do tutor (apetite, grooming, dor).',
      '2 semanas: cicatrização — não rotular refratário.',
      '2–3 meses: decisão FME após PME, raízes retidas, terapia adjunta.',
      '≥6 meses sem resposta após extração adequada: refratário verdadeiro (Lobprise et al., 2025).',
    ],
  },
  prevention: {
    odontologiaPreventiva: [
      'Controle periodontal precoce e profilaxia dentária reduzem estímulo antigênico — não previne toda FCGS (Lobprise et al., 2025).',
      'Ambiente multicat com FCV endêmico: manejo populacional e vacinação conforme protocolo local.',
    ],
    orientacaoTutor: [
      'Gatos vivem bem sem dentes após cicatrização — dor crônica oral é mais incapacitante que edentulismo.',
      'Extração não é “extremo desnecessário” quando FCGS confirmada — é tratamento com melhor evidência.',
    ],
    errosComuns: [
      'Meses de antibiótico empírico sem planejar odontologia.',
      'Corticoide repetido como primeira linha.',
      'Extrair apenas dentes “feios” sem radiografia de boca inteira.',
      'Extração sem confirmar remoção de raízes retidas.',
      'PCR FCV positivo = causa confirmada.',
      'Tratar Bartonella empiricamente por FCGS.',
      'Lesão focal crescente = estomatite refratária sem biópsia.',
      'Ciclosporina antes de extração adequada.',
      'Ignorar dor porque o gato “ainda come”.',
      'AINE + corticoide simultâneos.',
      'Terapia experimental no mesmo nível de evidência que extrações.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'imunodeficiencia-felina-fiv',
    'leucemia-viral-felina',
    'granuloma-eosinofilico-felino',
    'doenca-periodontal-gatos',
  ],
  relatedMedicationSlugs: ['amoxicilina-clavulanato'],
  references: [
    {
      id: 'ref-fcgs-lobprise-2025',
      citationText:
        'Lobprise H, St Denis K, Anderson JG, Hoyer N, Fiani N, Yaroslav J. 2025 FelineVMA feline oral health and dental care guidelines. J Feline Med Surg. 2025.',
      sourceType: 'Diretriz FelineVMA',
      url: 'https://doi.org/10.1177/1098612X251398793',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fcgs-soltero-rivera-2023',
      citationText:
        'Soltero-Rivera M, Goldschmidt S, Arzi B. Feline chronic gingivostomatitis: current concepts in clinical management. J Feline Med Surg. 2023;25(8):1098612X231186834.',
      sourceType: 'Revisão narrativa',
      url: 'https://doi.org/10.1177/1098612X231186834',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fcgs-sanchez-vallejo-2025',
      citationText:
        'Sánchez-Vallejo et al. Feline chronic gingivostomatitis: a thorough systematic review of associated factors. J Feline Med Surg. 2025;27(4).',
      sourceType: 'Revisão sistemática',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40231602/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fcgs-jennings-2015',
      citationText:
        'Jennings MW, Lewis JR, Soltero-Rivera MM, et al. Effect of tooth extraction on stomatitis in cats: 95 cases (2000–2013). J Am Vet Med Assoc. 2015;246(6):654–660.',
      sourceType: 'Estudo retrospectivo',
      url: 'https://doi.org/10.2460/javma.246.6.654',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fcgs-farcas-2014',
      citationText:
        'Farcas N, Lommer MJ, Kass PH, et al. Dental radiographic findings in cats with chronic gingivostomatitis (2002–2012). J Am Vet Med Assoc. 2014;244(3):339–345.',
      sourceType: 'Estudo radiográfico',
      url: 'https://doi.org/10.2460/javma.244.3.339',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fcgs-lommer-2013',
      citationText:
        'Lommer ML. Efficacy of cyclosporine for chronic, refractory stomatitis in cats: a randomized, placebo-controlled, double-blinded clinical study. J Vet Dent. 2013;30(1):8–17.',
      sourceType: 'Ensaio clínico randomizado',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-fcgs-hennet-2011',
      citationText:
        'Hennet PR, Camy GAL, McGahie DM, et al. Comparative efficacy of a recombinant feline interferon omega in refractory cases of calicivirus-positive cats with caudal stomatitis. J Feline Med Surg. 2011;13(8):577–587.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.1016/j.jfms.2011.05.012',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fcgs-silva-2021',
      citationText:
        'Silva M, Fernandes M, Fialho M, et al. A case series analysis of dental extractions outcome in cats with chronic gingivostomatitis carrying retroviral disease. Animals. 2021;11(11).',
      sourceType: 'Série de casos',
      url: 'https://doi.org/10.3390/ani11113045',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-fcgs-stathopoulou-2018',
      citationText:
        'Stathopoulou TR, Kouki M, Pypendop BH, et al. Evaluation of analgesic effect and absorption of buprenorphine after buccal administration in cats with oral disease. J Feline Med Surg. 2018;20(8):704–710.',
      sourceType: 'Estudo farmacocinético',
      url: 'https://doi.org/10.1177/1098612X17719474',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fcgs-tsugawa-2025',
      citationText:
        'Tsugawa AJ, Soltero-Rivera MM, Goldschmidt S, Arzi B, et al. Co-occurrence of feline chronic gingivostomatitis and oral squamous cell carcinoma in 4 cats (2014–2024). Front Vet Sci. 2025;12:1564674.',
      sourceType: 'Série de casos',
      url: 'https://doi.org/10.3389/fvets.2025.1564674',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-fcgs-coelho-2023',
      citationText:
        'Coelho J, Duarte N, da Silva AB, et al. Placebo-controlled trial of daily oral cannabidiol as adjunctive treatment for cats with chronic gingivostomatitis. Animals. 2023;13(17).',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://doi.org/10.3390/ani13172798',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-fcgs-anderson-2023',
      citationText:
        'Anderson JG, Rojas CA, Scarsella E, et al. The oral microbiome across oral sites in cats with chronic gingivostomatitis, periodontal disease, and tooth resorption compared with healthy cats. Animals. 2023;13(22).',
      sourceType: 'Estudo microbioma',
      url: 'https://doi.org/10.3390/ani13223345',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
