import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Miastenia gravis adquirida — síntese editorial Vetius.
 * Padrão de redação alinhado a cardiomiopatia dilatada (CMD): mecanismos dos sinais, citações inline com resumo dos estudos, sem marcadores {{ref:N}}.
 */
export const miasteniaGravisCaesGatosRecord: DiseaseRecord = {
  id: 'disease-miastenia-gravis-caes-gatos',
  slug: 'miastenia-gravis-caes-gatos',
  title: 'Miastenia gravis adquirida (cão e gato)',
  synonyms: [
    'Myasthenia gravis',
    'AMG',
    'MGA',
    'Acquired myasthenia gravis',
    'Junctionopatia autoimune',
    'Fraqueza fatigável',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Junção neuromuscular',
    'AChR-Ab',
    'Piridostigmina',
    'Megaesôfago',
    'Pneumonia aspirativa',
    'Timoma',
    'Crise colinérgica',
    'Imunomediada',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['miastenia-gravis-caes-gatos'],
  quickSummary:
    'A miastenia gravis adquirida é uma junctionopatia autoimune na qual autoanticorpos contra receptores nicotínicos de acetilcolina reduzem a margem de segurança da transmissão neuromuscular. O resultado clínico é fraqueza muscular fatigável, disfunção esofágica, faríngea e laríngea e, nos casos graves, insuficiência respiratória. Mignan et al. (2020) reforçam que ela deve ser distinguida das síndromes miastênicas congênitas — doenças genéticas sem autoimunidade primária, com sorologia, tratamento e prognóstico distintos. O anticorpo sérico contra o receptor de acetilcolina (AChR-Ab) é o teste confirmatório de referência; resultado negativo não exclui a doença. Piridostigmina é a base sintomática; imunossupressão não deve ser automática, sobretudo na presença de pneumonia aspirativa.',
  quickDecisionStrip: [
    'Fraqueza fatigável + megaesôfago/disfagia/disfonia → pense em junctionopatia.',
    'Exame neurológico pode ser normal após repouso — reprovocação com exercício controlado.',
    'Radiografe tórax: megaesôfago, pneumonia aspirativa e massa mediastinal cranial.',
    'AChR-Ab confirma MG adquirida; negativo não exclui — repita ou amplie investigação.',
    'Piridostigmina: cães 0,2–2 mg/kg VO q8–12h; gatos 0,25 mg/kg VO q8–12h — titular.',
    'Piora de fraqueza em uso de anticolinesterásico ≠ dose baixa automática — exclua crise colinérgica.',
    'Pneumonia aspirativa determina mortalidade em cães — trate antes de imunossuprimir.',
    'Todo gato com MG: investigar mediastino cranial; timoma/massa é frequente.',
    'MG adquirida ≠ síndrome miastênica congênita — não imunossuprimir CMS rotineiramente.',
    'Repetir AChR-Ab a cada 2–3 meses para distinguir remissão clínica de imunológica.',
  ],
  quickSummaryRich: {
    lead:
      'Na MG adquirida, o defeito não está no cérebro, no nervo periférico nem no músculo primário: está na conversa entre o terminal nervoso e a fibra muscular. Por isso a mentação permanece normal, os reflexos costumam estar preservados e a fraqueza aparece ou piora depois que o paciente caminha, brinca ou tenta comer. O erro mais caro é tratar megaesôfago como idiopático sem dosar AChR-Ab, ou aumentar piridostigmina diante de qualquer piora sem excluir pneumonia e crise colinérgica.',
    leadHighlights: ['junção neuromuscular', 'fatigabilidade', 'AChR-Ab', 'aspiração'],
    pillars: [
      {
        title: 'Classificação moderna',
        body:
          'MG adquirida = autoimune, anticorpos anti-AChR. Síndromes miastênicas congênitas = genéticas, sem autoimunidade primária — entidades separadas (Mignan et al., 2020).',
        highlights: ['adquirida', 'congênita'],
      },
      {
        title: 'Três apresentações',
        body:
          'Focal (esôfago/faringe/laringe/face), generalizada (membros fatigáveis) ou aguda fulminante (emergência respiratória). Megaesôfago isolado pode ser a única manifestação (Dewey et al., 1997).',
        highlights: ['focal', 'fulminante'],
      },
      {
        title: 'Conduta imediata',
        body:
          'Estabilizar vias aéreas e aspiração; radiografia torácica; coletar AChR-Ab; iniciar piridostigmina titulada; não imunossuprimir automaticamente (Platt & Garosi, 2012; Khorzad et al., 2011).',
        highlights: ['piridostigmina', 'aspiração'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Localizar na unidade motora/JNM',
          timing: 'Triagem',
          detail:
            'Fraqueza que piora com atividade e melhora com repouso; mentação normal; reflexos relativamente preservados; propriocepção normal na MG pura (Penderis & Martin-Vaquero, 2016).',
        },
        {
          label: 'Banco mínimo + CK',
          timing: 'Laboratório inicial',
          detail:
            'Hemograma, bioquímica, eletrólitos, CK, urinálise — excluir complicações e mimetizadores. CK acentuada sugere miopatia primária, não MG isolada (Hall et al., BSAVA Gastroenterology, 3ª ed.).',
        },
        {
          label: 'Radiografias torácicas',
          timing: 'Prioridade alta',
          detail:
            'Megaesôfago, pneumonia aspirativa (padrão cranioventral) e massa mediastinal cranial — especialmente em gatos (Hague et al., 2015).',
        },
        {
          label: 'AChR-Ab sérico',
          timing: 'Confirmatório',
          detail:
            'Teste de referência para MG adquirida. Positivo + fenótipo compatível confirma; negativo não exclui doença inicial, focal, seronegativa ou paciente previamente imunossuprimido (Shelton, 2010).',
          dose: 'Interpretar sempre pelo intervalo do laboratório executor.',
        },
        {
          label: 'Se negativo e suspeita alta',
          timing: 'Investigação ampliada',
          detail:
            'Repetir sorologia; edrofônio 0,1–0,2 mg/kg IV com atropina 0,02 mg/kg IV prévia (King & Boag, BSAVA ECC, 3ª ed.); estimulação repetitiva (decremento ≥10%); considerar CMS se filhote com AChR-Ab negativo (Mignan et al., 2020).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Estabilizar ABC',
          timing: 'Emergência',
          detail:
            'Dispneia, hipoxemia, hipercapnia, disfagia grave ou forma fulminante → internação, oxigênio, considerar ventilação mecânica (King & Vite, 1998; Bailey, 2012).',
        },
        {
          label: 'Piridostigmina VO',
          timing: 'Primeira linha sintomática',
          detail:
            'Inibe acetilcolinesterase e prolonga ACh na fenda sináptica; não remove autoanticorpos (Plumb\'s, 10ª ed.).',
          dose: 'Cães: 0,2–2 mg/kg q8–12h. Gatos: 0,25 mg/kg q8–12h. Iniciar baixo e titular.',
        },
        {
          label: 'Sem deglutição segura',
          timing: 'Hospitalar',
          detail:
            'Piridostigmina CRI 0,01–0,03 mg/kg/h IV ou neostigmina 0,04 mg/kg IM q6–8h (Bailey, 2012; Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Megaesôfago e aspiração',
          timing: 'Suporte obrigatório',
          detail:
            'Refeições pequenas, verticalização pós-alimentar, consistência individual; tratar pneumonia ativamente (Hall et al., BSAVA Gastroenterology, 3ª ed.).',
        },
        {
          label: 'Imunossupressão',
          timing: 'Segunda linha selecionada',
          detail:
            'Não automática; corticoide pode piorar fraqueza inicialmente; muitos cães remitem espontaneamente (Shelton & Lindstrom, 2001; Khorzad et al., 2011).',
          reassess: 'Decisão individualizada; avaliar pneumonia antes de iniciar.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'A miastenia gravis adquirida é doença imunomediada na qual IgG contra receptores nicotínicos de acetilcolina reduz a transmissão na placa motora. Mignan et al. (2020), em revisão de classificação publicada no Journal of Veterinary Internal Medicine, separam formalmente esta entidade das síndromes miastênicas congênitas — grupo genético heterogêneo sem autoimunidade primária. Conclusão prática: sorologia, imunossupressão, prognóstico e aconselhamento reprodutivo não são intercambiáveis entre MG adquirida e CMS.',
    mecanismoAutoimune:
      'Tizard (Veterinary Immunology, 11ª ed.) descreve três vias convergentes: bloqueio funcional do receptor, cross-linking com internalização acelerada e lesão pós-sináptica mediada por complemento. O resultado comum é queda do potencial de placa terminal e perda da margem de segurança — o músculo ainda contrai nos primeiros estímulos, mas falha quando o esforço se repete.',
    timo:
      'Alterações tímicas e timoma associam-se à MG. Hague et al. (2015), em coorte retrospectiva de 235 gatos com MG adquirida, documentaram massa mediastinal cranial em aproximadamente metade dos casos, frequentemente timoma. Conclusão: todo gato com MG merece investigação cuidadosa do mediastino cranial antes de fechar prognóstico.',
    associacoes: [
      'Na maioria dos cães a doença é idiopática imunomediada, mas devem ser pesquisadas neoplasias, hipotireoidismo, miosite imunomediada e disautonomia (Nelson & Couto, 6ª ed.).',
      'Em gatos, metimazol e carbimazol foram associados a MG imunomediada; a remissão pode ocorrer meses após suspensão do antitireoidiano quando a relação temporal for compatível (Nelson & Couto, 6ª ed.; Shelton, 2010).',
      'Timoma, cistos tímicos e outras neoplasias aparecem em séries clínicas; nem toda associação implica causalidade direta (Penderis & Martin-Vaquero, 2016).',
    ],
    cmsRelacionada:
      'Síndromes miastênicas congênitas decorrem de mutações em genes da transmissão neuromuscular (CHAT, COLQ, CHRNE, entre outros) e manifestam-se tipicamente em filhotes com AChR-Ab negativo. Mignan et al. (2020) enfatizam que anticolinesterásico pode ajudar alguns subtipos pós-sinápticos, mas imunossupressão não trata a causa genética.',
  },
  epidemiology: {
    caes:
      'Ocorre em qualquer raça, com distribuição etária aproximadamente bimodal: jovens (cerca de 4 meses a 4 anos) e mais velhos (aproximadamente 9–13 anos). Penderis & Martin-Vaquero (2016) citam predisposição em Akita, diversos terriers, German Shorthaired Pointer, Chihuahua, German Shepherd e Golden Retriever, além de agrupamentos familiares em Newfoundland e Great Dane — susceptibilidade à doença autoimune adquirida, distinta de CMS monogênica.',
    gatos:
      'Menos frequente que em cães, com super-representação de Abyssinian e Somali (Hague et al., 2015). Mignan et al. (2020), em coorte de 8 gatos sem massa mediastinal cranial, relataram remissão imunológica em todos em até seis meses, inclusive quatro remissões espontâneas sem tratamento. Conclusão: o prognóstico felino deve ser estratificado pela presença ou ausência de massa mediastinal/timoma.',
    notaClinica:
      'Dewey et al. (1997), em série de 25 cães, descreveram megaesôfago em ~84% e pneumonia aspirativa em ~84% — números úteis para reconhecer o fenótipo canino, mas derivados de população selecionada e não devem ser tratados como prevalências universais.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Autoanticorpos IgG ligam-se aos receptores nicotínicos pós-sinápticos.',
      'Há bloqueio funcional, internalização acelerada e dano por complemento.',
      'O potencial de placa terminal fica menor; a margem de segurança da transmissão cai.',
      'Estímulos repetidos esgotam a reserva funcional → fatigabilidade progressiva.',
      'Não é contagiosa. CMS é hereditária e não deve ser rotulada como “miastenia gravis congênita” no mesmo sentido da MG adquirida (Mignan et al., 2020).',
    ],
    formasClinicas: [
      'Focal: esôfago, faringe, laringe, palpebras ou face — membros podem permanecer normais.',
      'Generalizada: fraqueza appendicular fatigável com marcha curta, colapso pós-exercício e recuperação parcial após repouso.',
      'Aguda fulminante: tetraparesia/tetraplegia, recumbência, disfagia grave e falência respiratória em curto intervalo (King & Vite, 1998).',
    ],
  },
  pathophysiology: {
    mgFiguraBloqueioJnm: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/miastenia-gravis/mg-junction-block-illustration.bmp',
      alt: 'Ilustração comparando junção neuromuscular normal e bloqueada por autoanticorpos na miastenia gravis',
      caption:
        'PARTNERVESC. Ilustração: bloqueio da transmissão neuromuscular na miastenia gravis. Disponível em: https://partnervesc.com/wp-content/uploads/2023/11/MG-Handout-illustration.bmp. Acesso em: 7 ago. 2026.',
      display: 'wide',
    },
    margemDeSeguranca:
      'A junção neuromuscular depende de liberação de acetilcolina (ACh), ligação aos receptores nicotínicos e degradação rápida pela acetilcolinesterase. Em condições normais existe margem de segurança: há mais transmissão do que o mínimo necessário para gerar potencial de ação muscular (Klein, Cunningham\'s Physiology, 6ª ed.). Na ilustração acima, autoanticorpos (Y) bloqueiam receptores pós-sinápticos — reduzindo a área funcional de ligação da ACh.',
    fatigabilidade:
      'Na MG adquirida, menos receptores funcionais reduzem o potencial de placa. Nos primeiros estímulos a transmissão ainda pode ser suficiente; com estímulos repetidos a liberação fisiológica de ACh diminui discretamente — no paciente miastênico, junções deixam de atingir o limiar → quanto mais o músculo trabalha, mais fibras falham temporariamente.',
    piridostigmina:
      'Piridostigmina inibe acetilcolinesterase, prolonga ACh na fenda sináptica e aumenta a chance de ativar receptores restantes — tratamento sintomático, não imunológico (Plumb\'s, 10ª ed.).',
    megaesofago:
      'No cão, o esôfago possui musculatura estriada em praticamente toda a extensão; falha de transmissão gera peristalse ineficaz, dilatação, regurgitação e risco de aspiração — complicação que mais determina mortalidade (Khorzad et al., 2011). Nos gatos, a musculatura esofágica distal tem maior componente liso; megaesôfago associado à MG tende a ser menos frequente (Hague et al., 2015).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'neurologic',
      findings: [
        {
          finding: 'Fraqueza fatigável dos membros — marcha curta, bunny hopping, colapso após exercício',
          mechanism:
            'Com estímulos repetidos, o potencial de placa terminal deixa de atingir o limiar em parte das junções neuromusculares. Fibras que contraíam inicialmente deixam de responder adequadamente, reduzindo força global.',
          clinicalMeaning:
            'Recuperação parcial após repouso é pista forte de junctionopatia; o exame pode ser quase normal se o animal chegou descansado.',
          priority: 'common',
        },
        {
          finding: 'Tetraparesia flácida com mentação normal',
          mechanism:
            'O defeito está na transmissão neuromuscular, não no SNC. O impulso chega ao músculo, mas a contração falha por insuficiência pós-sináptica.',
          clinicalMeaning:
            'Diferencia MG de encefalopatias e de muitas miopatias primárias; reflexos espinhais costumam permanecer preservados.',
          priority: 'common',
        },
        {
          finding: 'Hiporreflexia palpebral, ptose, fraqueza facial, disfonia',
          mechanism:
            'Músculos cranianos ricos em placa motora também dependem de transmissão eficaz; fatigabilidade e falha de contração aparecem cedo nesses grupos.',
          clinicalMeaning:
            'Alteração de latido/miado ou voz reforça suspeita mesmo sem fraqueza dos membros.',
          priority: 'common',
        },
        {
          finding: 'Forma fulminante — recumbência rápida, fraqueza cervical, insuficiência ventilatória',
          mechanism:
            'Falha generalizada da transmissão em diafragma, intercostais, faríngeos e laríngeos reduz volume corrente e proteção das vias aéreas.',
          clinicalMeaning:
            'Emergência neuromuscular; SpO₂ inicial normal não exclui hipercapnia por hipoventilação.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Megaesôfago e regurgitação',
          mechanism:
            'Musculatura esofágica estriada (cães) depende de transmissão neuromuscular repetitiva para peristalse eficaz. Com falha de JNM, alimento e saliva permanecem no lúmen.',
          clinicalMeaning:
            'Megaesôfago “isolado” em adulto pode ser MG focal — dosar AChR-Ab antes de rotular idiopático (Dewey et al., 1997).',
          priority: 'common',
          context: ['Forma focal'],
        },
        {
          finding: 'Disfagia, engasgos, redução do reflexo de gag',
          mechanism:
            'Fraqueza faríngea impede propulsão segura do bolo alimentar; saliva e conteúdo esofágico entram em risco de aspiração.',
          clinicalMeaning:
            'Administração oral de medicamentos ou alimentação pode ser insegura — reavaliar via de administração.',
          priority: 'common',
        },
        {
          finding: 'Regurgitação passiva (não vômito)',
          mechanism:
            'Conteúdo esofágico retorna sem centro de vômito ativo — geralmente sem náusea ou contração abdominal vigorosa.',
          clinicalMeaning:
            'Tutores frequentemente descrevem regurgitação como “vômito”; vídeos e história detalhada aumentam sensibilidade diagnóstica.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Pneumonia aspirativa — taquipneia, tosse, crepitações cranioventrais, febre',
          mechanism:
            'Regurgitação e disfagia permitem entrada de material orofaríngeo ou esofágico nos alvéolos, desencadeando inflamação local.',
          clinicalMeaning:
            'Principal determinante de hospitalização e mortalidade em cães com MG (Khorzad et al., 2011).',
          priority: 'emergency',
        },
        {
          finding: 'Hipoventilação, hipercapnia, esforço respiratório',
          mechanism:
            'Fraqueza diafragmática e intercostal reduz volume corrente; retenção de CO₂ pode preceder hipoxemia importante.',
          clinicalMeaning:
            'Considerar ventilação mecânica antes da parada respiratória (Bailey, 2012).',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Perda de peso e hiporexia',
          mechanism:
            'Disfagia, regurgitação e esforço aumentado para comer reduzem ingestão calórica efetiva.',
          clinicalMeaning:
            'Pode ser a queixa principal quando fraqueza dos membros ainda é sutil.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'História dirigida e teste de exercício controlado',
      purpose: 'Identificar fatigabilidade e disfunção esofágica/faríngea antes de exames invasivos.',
      description:
        'Pergunte sobre duração, progressão, recuperação com repouso, regurgitação versus vômito, disfagia, alteração de voz, dispneia, metimazol/carbimazol, toxinas e anestesia recente. Teste clínico: registrar marcha em repouso, caminhada controlada, tempo até fraqueza e recuperação após repouso.',
      interpretation:
        'Melhora clara após repouso reforça junctionopatia; megaesôfago discreto pode ser omitido pelo tutor.',
      limitations: 'Não realizar teste intenso em pneumonia grave, dispneia ou suspeita de forma fulminante.',
    },
    {
      stepNumber: 2,
      title: 'Radiografias torácicas',
      purpose: 'Detectar megaesôfago, pneumonia aspirativa e massa mediastinal cranial simultaneamente.',
      description:
        'Procurar dilatação esofágica, padrão alveolar/broncoalveolar cranioventral e massa mediastinal. Preferir paciente consciente quando possível para reduzir sedação e risco aspirativo.',
      interpretation:
        'Achados compatíveis orientam suporte imediato e investigação de timoma, sobretudo em gatos (Hague et al., 2015).',
      limitations: 'Radiografia normal não exclui MG; megaesôfago pode ser intermitente.',
    },
    {
      stepNumber: 3,
      title: 'AChR-Ab sérico',
      purpose: 'Confirmar MG adquirida imunomediada.',
      description:
        'Dosagem de autoanticorpos contra receptor nicotínico de acetilcolina. Repetir em 2–3 meses no acompanhamento (Shelton, 2010).',
      interpretation:
        'Positivo com fenótipo compatível confirma fortemente; negativo mantém suspeita se clínica for típica.',
      limitations:
        'Falsos negativos no início, em imunossupressão, formas focais ou seronegativas; não diagnóstica CMS.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Teste com edrofônio',
      purpose: 'Suporte diagnóstico rápido quando AChR-Ab está pendente ou negativo.',
      description:
        'Edrofônio 0,1–0,2 mg/kg IV após atropina 0,02 mg/kg IV; monitorização cardíaca e suporte respiratório disponíveis (King & Boag, BSAVA ECC, 3ª ed.).',
      interpretation:
        'Melhora dramática de força por 1–2 minutos sustenta falha de transmissão neuromuscular.',
      limitations:
        'Não substitui AChR-Ab; falsos positivos/negativos e risco de crise colinérgica.',
    },
    {
      stepNumber: 5,
      title: 'Estimulação nervosa repetitiva',
      purpose: 'Documentar falha fisiológica da JNM quando sorologia é negativa.',
      description:
        'Sucessivos estímulos podem reduzir amplitude do potencial de ação muscular composto; decremento ≥10% é sugestivo (King & Boag, BSAVA ECC, 3ª ed.).',
      interpretation: 'Resposta decremental apoia junctionopatia; não define sozinha etiologia autoimune.',
      limitations: 'Exige equipamento, sedação/anestesia e protocolo padronizado; sensibilidade varia.',
    },
    {
      stepNumber: 6,
      title: 'Tomografia torácica',
      purpose: 'Caracterizar massa mediastinal e planejar timectomia.',
      description:
        'Indicada quando radiografia é inconclusiva e suspeita de doença mediastinal é relevante — limiar baixo em gatos com MG.',
      interpretation: 'Timoma ressecável muda prognóstico e conduta cirúrgica após estabilização.',
      limitations: 'Não necessária para confirmar MG; custo e anestesia em paciente de risco.',
    },
    {
      stepNumber: 7,
      title: 'Diferenciais obrigatórios',
      purpose: 'Evitar diagnóstico prematuro de MG.',
      description:
        'Botulismo, paralisia por carrapato, organofosforados, polirradiculoneurite, polimiosite, hipocalemia, hipoadrenocorticismo. MG versus polirradiculoneurite: fatigabilidade marcante e megaesôfago favorecem MG; arreflexia ascendente e LCR com dissociação albuminocitológica favorecem polirradiculoneurite (Drobatz et al., 2019).',
      interpretation: 'Recuperação rápida com repouso favorece junctionopatia, mas não é patognomônica.',
      limitations: 'Doenças podem coexistir ou mimetizar parcialmente.',
    },
  ],
  treatment: {
    sintomatico: [
      'Piridostigmina é o anticolinesterásico de manutenção mais utilizado. Budde & McCluskey (2023), no Plumb\'s Veterinary Drug Handbook (10ª ed.), descrevem para cães 0,2–2 mg/kg por via oral a cada 8–12 horas, iniciando na extremidade inferior e titulando por resposta clínica e efeitos colinérgicos. Allerton (2020), no BSAVA Formulary, cita faixa até 5 mg/kg em cães — essa faixa maior não deve ser alvo automático; reavaliar clinicamente antes de escalar.',
      'Em gatos, a dose de referência recorrente é 0,25 mg/kg por via oral a cada 8–12 horas (Allerton, BSAVA Formulary, 2020; Bailey, 2012). Gatos podem ser particularmente sensíveis a efeitos muscarínicos — monitorar hipersalivação, vômito, diarreia e bradicardia.',
      'Paciente incapaz de deglutir: piridostigmina em infusão contínua 0,01–0,03 mg/kg/h IV ou neostigmina 0,04 mg/kg IM a cada 6–8 horas (Bailey, 2012; Plumb\'s, 10ª ed.).',
    ],
    criseColinergica: [
      'Dose excessiva de anticolinesterásico também produz fraqueza, com hipersalivação, lacrimejamento, vômitos, diarreia, miose, bradicardia, broncoconstrição e fasciculações (Bailey, 2012; Plumb\'s, 10ª ed.). Conclusão clínica: piora de fraqueza em paciente em piridostigmina exige diferenciar progressão da MG, pneumonia/hipoxemia, distúrbio metabólico, dose insuficiente e excesso colinérgico — aumentar dose automaticamente pode agravar o quadro.',
    ],
    suporteEsofagico: [
      'Hall et al. (BSAVA Manual of Canine and Feline Gastroenterology, 3ª ed.) enfatizam investigação de megaesôfago adquirido com AChR-Ab e manejo individualizado de consistência alimentar. Refeições pequenas e frequentes, verticalização pós-alimentar (manter cabeça e tórax elevados por pelo menos ~10 minutos) e teste de consistência (pastoso, bolotas, líquido) reduzem regurgitação. Gastrostomia bypassa ingestão oral, mas não elimina risco aspirativo de saliva e refluxo.',
    ],
    pneumoniaAspirativa: [
      'Khorzad et al. (2011), revisando tratamento e cuidados críticos da MG canina, destacam pneumonia aspirativa como complicação central de mortalidade. Conclusão: tratar oxigenoterapia, hidratação, antimicrobiano quando indicado e monitorar FR, SpO₂ e gasometria em pacientes graves antes de considerar imunossupressão.',
    ],
    imunossupressao: [
      'Shelton & Lindstrom (2001), em estudo de 53 cães AChR-Ab positivos tratados sem imunossupressão, relataram remissão clínica e imunológica em 47 (~89%), com tempo médio de aproximadamente 6,4 meses; os seis que não remitiram apresentavam neoplasia. Conclusão: imunossupressão não deve ser reflexo automático — muitos cães não neoplásicos remitem espontaneamente se sobrevivem ao período crítico de aspiração.',
      'Khorzad et al. (2011) alertam que corticoide pode piorar transientemente a fraqueza e que pneumonia aspirativa ativa contraindica relativamente imunossupressão imediata. Prednisolona 0,5 mg/kg/dia escalonando até ~2 mg/kg/dia foi descrita historicamente em casos selecionados persistentemente graves — decisão especializada.',
      'Dewey et al. (2010), em série de 27 cães com micofenolato mofetil, não demonstraram vantagem clara de rotina sobre piridostigmina isolada em remissão e sobrevivência. Azatioprina: evidência limitada em cães; evitar em gatos pelo risco de mielotoxicidade.',
    ],
    timoma: [
      'Quando massa mediastinal compatível com timoma é identificada, estabilizar MG e pneumonia antes de estadiar e discutir ressecção e/ou radioterapia (Hague et al., 2015; Nelson & Couto, 6ª ed.). Timectomia não garante remissão imediata; anticorpos podem diminuir semanas a meses depois. Timectomia rotineira sem massa tímica identificável não tem evidência de benefício (Penderis & Martin-Vaquero, 2016).',
    ],
    drogasCautela: [
      'Aminoglicosídeos, algumas lincosamidas, macrolídeos, fluoroquinolonas, polimixinas, magnésio parenteral e bloqueadores neuromusculares podem agravar bloqueio neuromuscular (Penderis & Martin-Vaquero, 2016; Plumb\'s, 10ª ed.). Evitar quando houver alternativa clinicamente adequada; avaliar risco/benefício individual — não transformar relatos em proibição absoluta.',
      'Anestesia exige planejamento específico: risco de aspiração, resposta imprevisível a relaxantes e recuperação prolongada (Lamont et al., Veterinary Anesthesia, 6ª ed.).',
    ],
    redFlagsInternacao: [
      'Dispneia, hipoxemia, hipercapnia, progressão rápida da paresia, tetraplegia, incapacidade de proteger vias aéreas, regurgitação frequente, pneumonia aspirativa, fraqueza laríngea ou forma fulminante — internar ou manejo intensivo (Bailey, 2012; King & Vite, 1998).',
    ],
    monitoramento: [
      'Força, fatigabilidade, deglutição, regurgitação, FR, peso e sinais colinérgicos.',
      'AChR-Ab seriado a cada 2–3 meses; distinguir remissão clínica (sem sinais) de imunológica (título normalizado/negativo) (Shelton, 2010).',
      'Não suspender piridostigmina apenas porque o paciente “parece normal” — integrar exame, megaesôfago, AChR-Ab e doença associada.',
    ],
  },
  prevention: {
    diagnosticoPrecoce:
      'Suspeitar de MG diante de fraqueza fatigável, megaesôfago adquirido ou disfonia — dosar AChR-Ab antes de rotular idiopático.',
    aspiracao:
      'Verticalização alimentar, consistência individual e tratamento precoce de pneumonia reduzem mortalidade no período até remissão espontânea.',
    felinos:
      'Investigar mediastino cranial em todo gato com MG; estratificar prognóstico pela presença de massa/timoma (Hague et al., 2015; Mignan et al., 2020).',
    cms:
      'Para síndromes miastênicas congênitas: aconselhamento genético, não reproduzir afetados, testes genéticos quando disponíveis (Mignan et al., 2020).',
    metimazol:
      'Em gatos hipertireoidianos com MG temporalmente relacionada a metimazol/carbimazol, suspender o fármaco quando possível e acompanhar remissão clínica e sorológica (Nelson & Couto, 6ª ed.).',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['sindromes-miastenicas-congenitas-caes-gatos'],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-mg-mignan-2020',
      citationText:
        'Mignan T, Targett M, Lowrie M. Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats. Journal of Veterinary Internal Medicine. 2020;34(5):1707–1717.',
      sourceType: 'Revisão / classificação',
      url: 'https://doi.org/10.1111/jvim.15855',
      evidenceLevel: 'A — classificação especializada',
    },
    {
      id: 'ref-mg-dewey-junctionopathies',
      citationText:
        'Penderis J, Martin-Vaquero P. Junctionopathies. In: Dewey CW, da Costa RC, eds. Practical Guide to Canine and Feline Neurology. 3rd ed. Wiley-Blackwell; 2016. Cap. 19, pp. 521–557.',
      sourceType: 'Livro-texto neurologia',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-mg-bailey-emergency',
      citationText:
        'Bailey KS. Myasthenia Gravis. In: Platt SR, Garosi LS. Small Animal Neurological Emergencies. Manson Publishing; 2012. Cap. 24, pp. 433–445.',
      sourceType: 'Emergência neurológica',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-tizard',
      citationText:
        'Tizard IR. Veterinary Immunology. 11th ed. Elsevier. Cap. 38 — Myasthenia Gravis, p. 416.',
      sourceType: 'Imunologia',
      evidenceLevel: 'Base fisiopatológica',
    },
    {
      id: 'ref-mg-bsava-ecc',
      citationText:
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. BSAVA; 2018. Neurological Emergencies, p. 154.',
      sourceType: 'Manual ECC',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-dewey-1997',
      citationText:
        'Dewey CW, Bailey CS, Shelton GD, et al. Clinical forms of acquired myasthenia gravis in dogs: 25 cases (1988–1995). JVIM. 1997;11(2):50–57.',
      sourceType: 'Série clínica',
      url: 'https://doi.org/10.1111/j.1939-1676.1997.tb00073.x',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-king-vite-1998',
      citationText:
        'King LG, Vite CH. Acute fulminating myasthenia gravis in five dogs. JAVMA. 1998;212(6):830–834.',
      sourceType: 'Série clínica',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-shelton-2010',
      citationText:
        'Shelton GD. Routine and specialized laboratory testing for neuromuscular diseases in dogs and cats. Vet Clin Pathol. 2010;39(3):278–295.',
      sourceType: 'Revisão laboratorial',
      evidenceLevel: 'Referência diagnóstica',
    },
    {
      id: 'ref-mg-plumbs-pyridostigmine',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Pyridostigmine, pp. 1094–1096.',
      sourceType: 'Formulário',
      evidenceLevel: 'Alta — referência prática',
    },
    {
      id: 'ref-mg-bsava-formulary',
      citationText:
        'Allerton F, ed. BSAVA Small Animal Formulary. Part A. 10th ed. BSAVA; 2020. Pyridostigmine, pp. 352–353.',
      sourceType: 'Formulário',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-khorzad-2011',
      citationText:
        'Khorzad R, Whelan M, Sisson A, Shelton GD. Myasthenia gravis in dogs with an emphasis on treatment and critical care management. J Vet Emerg Crit Care. 2011;21(3):193–208.',
      sourceType: 'Revisão ECC',
      url: 'https://doi.org/10.1111/j.1476-4431.2011.00636.x',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-shelton-remission-2001',
      citationText:
        'Shelton GD, Lindstrom JM. Spontaneous remission in canine myasthenia gravis. Neurology. 2001;57(11):2139–2141.',
      sourceType: 'Coorte observacional',
      url: 'https://doi.org/10.1212/WNL.57.11.2139',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-hague-2015',
      citationText:
        'Hague DW, Humphries HD, Mitchell MA, Shelton GD. Risk factors and outcomes in cats with acquired myasthenia gravis (2001–2012). JVIM. 2015;29(5):1307–1312.',
      sourceType: 'Coorte retrospectiva',
      url: 'https://doi.org/10.1111/jvim.13596',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-mignan-cats-no-mass',
      citationText:
        'Mignan T, Garosi L, Targett M, Lowrie M. Long-term outcome of cats with acquired myasthenia gravis without cranial mediastinal mass. JVIM. 2020;34(1):247–252.',
      sourceType: 'Coorte',
      url: 'https://doi.org/10.1111/jvim.15655',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-cunningham',
      citationText:
        'Klein BG, ed. Cunningham\'s Textbook of Veterinary Physiology. 6th ed. Elsevier; 2020.',
      sourceType: 'Fisiologia',
      evidenceLevel: 'Base fisiológica',
    },
    {
      id: 'ref-mg-nelson-couto',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Cap. 66 — Disorders of the Neuromuscular Junction.',
      sourceType: 'Medicina interna',
      evidenceLevel: 'Consenso clínico',
    },
    {
      id: 'ref-mg-bsava-gi',
      citationText:
        'Hall EJ, Williams DA, Kathrani A, eds. BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. Regurgitation and megaoesophagus, pp. 69–70.',
      sourceType: 'Manual GI',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-drobatz-lmn',
      citationText:
        'Drobatz KJ, et al. Textbook of Small Animal Emergency Medicine. Wiley; 2019. Cap. 27 — Lower Motor Neuron Disease.',
      sourceType: 'Emergência',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-mmf-dewey-2010',
      citationText:
        'Dewey CW, et al. Mycophenolate mofetil in dogs with acquired myasthenia gravis: 27 cases. JAVMA. 2010;236(6):664–668.',
      sourceType: 'Série retrospectiva',
      url: 'https://doi.org/10.2460/javma.236.6.664',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mg-lumb-jones',
      citationText:
        'Lamont L, et al. Veterinary Anesthesia and Analgesia. 6th ed. Wiley; 2024.',
      sourceType: 'Anestesia',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-mg-vetsci-2026',
      citationText:
        'Cystic Thymoma-Associated Fulminant Myasthenia Gravis in a Cat. Veterinary Sciences. 2026;13(7):711.',
      sourceType: 'Relato de caso',
      url: 'https://doi.org/10.3390/vetsci13070711',
      notes: 'Ilustra forma fulminante timoma-associada em gata — evidência de caso, não prevalência.',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
