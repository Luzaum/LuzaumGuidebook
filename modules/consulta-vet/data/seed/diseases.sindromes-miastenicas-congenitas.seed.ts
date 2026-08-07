import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndromes miastênicas congênitas (CMS) — entidade separada da MG adquirida (Mignan et al., 2020).
 */
export const sindromesMiastenicasCongenitasRecord: DiseaseRecord = {
  id: 'disease-sindromes-miastenicas-congenitas',
  slug: 'sindromes-miastenicas-congenitas-caes-gatos',
  title: 'Síndromes miastênicas congênitas (cão e gato)',
  synonyms: [
    'CMS',
    'Congenital myasthenic syndromes',
    'Junctionopatia genética',
    'Miastenia congênita (termo legado — evitar confundir com MG adquirida)',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Genética',
    'Junção neuromuscular',
    'Filhote',
    'AChR-Ab negativo',
    'CHAT',
    'COLQ',
    'CHRNE',
    'Hereditário',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindromes-miastenicas-congenitas-caes-gatos'],
  quickSummary:
    'Síndromes miastênicas congênitas (CMS) são doenças genéticas heterogêneas que alteram componentes pré-sinápticos, sinápticos ou pós-sinápticos da transmissão neuromuscular, sem autoimunidade primária. Mignan et al. (2020) separam formalmente CMS de miastenia gravis adquirida: AChR-Ab costuma ser negativo, imunossupressão não trata a causa, e teste genético orienta subtipo, prognóstico e resposta a anticolinesterásico. Surge tipicamente em filhotes com fraqueza fatigável, colapso pós-exercício e, em algumas linhagens, megaesôfago.',
  quickDecisionStrip: [
    'Filhote fatigável + AChR-Ab negativo → pense CMS, não MG adquirida.',
    'Histórico familiar ou raça predisposta reforça suspeita genética.',
    'Não iniciar imunossupressão como tratamento etiológico.',
    'Anticolinesterásico pode ajudar ou piorar conforme subtipo molecular.',
    'Aconselhamento reprodutivo: não cruzar afetados ou portadores conhecidos.',
    'Investigação neuromuscular avançada (eletrofisiologia, genética) quando disponível.',
  ],
  quickSummaryRich: {
    lead:
      'CMS não é “miastenia gravis de filhote”. É grupo de mutações que nascem com a junção neuromuscular mal montada. Por isso o painel sorológico típico da MG adquirida falha, corticoide não corrige o defeito, e o prognóstico depende do gene — alguns subtipos são fatais cedo, outros permitem vida longa com manejo específico.',
    leadHighlights: ['genética', 'AChR-Ab negativo', 'subtipo', 'reprodução'],
    pillars: [
      {
        title: 'Diferença da MG adquirida',
        body:
          'MG adquirida = autoanticorpos anti-AChR. CMS = mutação em proteínas da JNM (CHAT, COLQ, CHRNE, etc.) — Mignan et al. (2020).',
        highlights: ['autoimune', 'genética'],
      },
      {
        title: 'Quando suspeitar',
        body:
          'Início próximo ao desmame, fraqueza fatigável, bunny hopping, ventroflexão cervical, colapso com exercício, recuperação parcial com repouso.',
        highlights: ['desmame', 'fatigável'],
      },
      {
        title: 'Conduta',
        body:
          'Confirmar subtipo quando possível; piridostigmina só se subtipo compatível; genética e pedigree para reprodução.',
        highlights: ['genética', 'piridostigmina'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Excluir MG adquirida e toxinas',
          timing: 'Primeira linha',
          detail:
            'AChR-Ab; história sem curso autoimune típico; excluir organofosforados e bloqueios adquiridos (Penderis & Martin-Vaquero, 2016).',
        },
        {
          label: 'Eletrofisiologia / teste farmacológico',
          timing: 'Especialista',
          detail:
            'Estimulação repetitiva, jitter ou resposta a anticolinesterásico variam conforme defeito pré-, sináptico ou pós-sináptico (Shelton, 2010).',
        },
        {
          label: 'Teste genético e pedigree',
          timing: 'Confirmação',
          detail:
            'Painéis por raça/linhagem quando disponíveis; Mignan et al. (2020) listam associações (Smooth Fox Terrier, Jack Russell, Sphynx, Devon Rex, Miniature Dachshund, entre outros).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Individualizar por subtipo',
          timing: 'Após investigação',
          detail:
            'Alguns defeitos respondem a piridostigmina; outros pioram ou não se beneficiam — decisão genética, não protocolo único (Mignan et al., 2020).',
        },
        {
          label: 'Suporte nutricional/esofágico',
          timing: 'Conforme fenótipo',
          detail:
            'Megaesôfago em subtipos selecionados: mesmas medidas de verticalização e prevenção de aspiração da MG adquirida (Hall et al., BSAVA GI, 3ª ed.).',
        },
        {
          label: 'Reprodução',
          timing: 'Longo prazo',
          detail:
            'Não reproduzir afetados; evitar portador × portador; rastrear linhagem (Mignan et al., 2020).',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'CMS são junctionopatias hereditárias monogênicas ou oligogênicas que comprometem liberação de acetilcolina, organização da fenda sináptica ou função do receptor nicotínico. Mignan et al. (2020), em revisão de classificação, enfatizam que o termo “miastenia gravis congênita” mistura entidades distintas e deve ser substituído por CMS quando o mecanismo é genético.',
    subtipos: [
      'Pré-sinápticos (lado do nervo, antes da fenda): defeitos na produção ou reciclagem de acetilcolina (ACh), o neurotransmissor que aciona o músculo. Exemplo: mutação no gene CHAT (colina acetiltransferase — enzima que fabrica ACh).',
      'Sinápticos (fenda entre nervo e músculo): alterações na matriz extracelular que organiza o receptor na placa motora. Exemplo: COLQ (colágeno Q — proteína que ancora a acetilcolinesterase).',
      'Pós-sinápticos (lado do músculo): mutações nas subunidades do receptor nicotínico de acetilcolina (AChR). Exemplo: CHRNE (subunidade épsilon do AChR).',
    ],
    heranca:
      'Predominantemente autossômica recessiva em muitas linhagens descritas; penetrance e expressividade variam. Agrupamentos familiares orientam teste genético direcionado.',
  },
  epidemiology: {
    caes:
      'Descrito em Smooth Fox Terrier, Jack/Parson Russell Terrier, Old Danish Pointing Dog, Miniature Dachshund e outras linhagens (Mignan et al., 2020). Alguns subtipos em Dachshund miniatura podem melhorar espontaneamente por volta de 6 meses.',
    gatos:
      'Relatos em Sphynx, Devon Rex e outras linhagens; menos séries populacionais que em cães.',
    nota:
      'Prevalência exata desconhecida — suspeita aumenta em filhotes fatigáveis com AChR-Ab negativo e história compatível.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Mutação altera proteína essencial da placa motora ou terminal pré-sináptico.',
      'Transmissão neuromuscular nasce ineficiente ou instável.',
      'Fatigabilidade aparece cedo, muitas vezes com exercício ou alimentação.',
      'Não é contagiosa nem autoimune; transmissão é genética vertical.',
    ],
  },
  pathophysiology: {
    margemDeSeguranca:
      'Como na MG adquirida, a fraqueza fatigável reflete perda da margem de segurança da transmissão — porém aqui a causa é estrutural/genética, não destruição imune de receptores (Klein, Cunningham\'s Physiology, 6ª ed.).',
    respostaAnticolinesterasico:
      'Defeitos pós-sinápticos podem responder a piridostigmina; defeitos pré-sinápticos de liberação podem não responder ou exigir abordagem distinta — subtipo define conduta (Mignan et al., 2020).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Fraqueza fatigável desde filhote',
          mechanism:
            'Junção neuromuscular funcionalmente incompleta desde o nascimento; estímulos repetidos esgotam reserva já reduzida.',
          clinicalMeaning: 'Idade de início diferencia de MG adquirida na maioria dos casos.',
          priority: 'common',
        },
        {
          finding: 'Bunny hopping, colapso pós-exercício, ventroflexão cervical',
          mechanism:
            'Grupos musculares proximais e cervicais fatigam com atividade; repouso restaura parcialmente a transmissão.',
          clinicalMeaning: 'Padrão semelhante à MG adquirida — não usar só fenótipo para classificar.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Megaesôfago ou regurgitação (subtipos selecionados)',
          mechanism:
            'Musculatura esofágica estriada depende de transmissão eficaz; defeito congênito pode manifestar-se como dismotilidade precoce.',
          clinicalMeaning: 'Megaesôfogo em filhote: incluir CMS no diferencial além de MG adquirida.',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem etária e sorológica',
      purpose: 'Separar CMS de MG adquirida precocemente.',
      description:
        'Filhote ou juvenil jovem com fraqueza fatigável; AChR-Ab negativo; ausência de curso autoimune típico.',
      interpretation: 'AChR-Ab negativo em filhote fatigável mantém CMS na lista — não exclui junctionopatia.',
      limitations: 'MG adquirida muito precoce ou focal pode ser seronegativa — integrar idade e pedigree.',
    },
    {
      stepNumber: 2,
      title: 'Eletrodiagnóstico especializado',
      purpose: 'Caracterizar defeito pré-, sináptico ou pós-sináptico.',
      description:
        'Estimulação repetitiva, EMG de fibra única ou teste farmacológico em centro de referência (Shelton, 2010).',
      interpretation: 'Padrão decremental ou jitter aumentado apoia junctionopatia congênita.',
      limitations: 'Disponibilidade e sedação limitam uso rotineiro.',
    },
    {
      stepNumber: 3,
      title: 'Teste genético',
      purpose: 'Confirmar subtipo e orientar terapia/reprodução.',
      description:
        'Painéis com CHAT, COLQ, CHRNE e outros conforme raça; analisar pedigree (Mignan et al., 2020).',
      interpretation: 'Mutação patogênica confirma CMS e define prognóstico parcial.',
      limitations: 'Nem todos os subtipos têm teste comercial; resultado negativo não exclui CMS rara.',
      isGoldStandard: true,
    },
  ],
  treatment: {
    individualizado: [
      'Mignan et al. (2020) enfatizam que CMS exige terapia orientada por subtipo molecular — não existe protocolo único equivalente à piridostigmina universal da MG adquirida.',
      'Piridostigmina pode beneficiar defeitos pós-sinápticos selecionados; em outros subtipos pode ser ineficaz ou contraindicada — teste terapêutico cauteloso sob supervisão especializada.',
    ],
    imunossupressao: [
      'Não tratar causa genética. Corticoide, azatioprina ou micofenolato não corrigem defeito estrutural da JNM (Mignan et al., 2020).',
    ],
    suporte: [
      'Megaesôfago: verticalização alimentar, consistência individual, prevenção de aspiração — mesmos princípios da MG adquirida quando fenótipo esofágico presente.',
    ],
    reproducao: [
      'Aconselhamento genético obrigatório: não reproduzir afetados; identificar portadores; documentar linhagem (Mignan et al., 2020).',
    ],
    monitoramento: [
      'Evolução de força, capacidade de alimentação, crescimento e qualidade de vida.',
      'Reavaliar necessidade de piridostigmina conforme subtipo e resposta — alguns animais melhoram espontaneamente (ex.: subset de Miniature Dachshund).',
    ],
  },
  prevention: {
    genetica:
      'Teste de portadores quando disponível; evitar cruzamentos portador × portador; retirar reprodutores afetados de programas de criação.',
    nomenclatura:
      'Usar “síndrome miastênica congênita (CMS)” em comunicação com tutores — evitar “miastenia gravis congênita” como sinônimo da MG adquirida (Mignan et al., 2020).',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['miastenia-gravis-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-cms-mignan-2020',
      citationText:
        'Mignan T, Targett M, Lowrie M. Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats. JVIM. 2020;34(5):1707–1717.',
      sourceType: 'Revisão / classificação',
      url: 'https://doi.org/10.1111/jvim.15855',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-cms-dewey-junction',
      citationText:
        'Penderis J, Martin-Vaquero P. Junctionopathies. In: Dewey CW, da Costa RC, eds. Practical Guide to Canine and Feline Neurology. 3rd ed. 2016. Cap. 19.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-cms-shelton-lab',
      citationText:
        'Shelton GD. Routine and specialized laboratory testing for neuromuscular diseases. Vet Clin Pathol. 2010;39(3):278–295.',
      sourceType: 'Revisão laboratorial',
      evidenceLevel: 'Referência diagnóstica',
    },
  ],
  isPublished: true,
  source: 'seed',
};
