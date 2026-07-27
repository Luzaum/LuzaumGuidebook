/**
 * Renames Consulta Vet consensus documents, publishes them globally, and fills
 * shared clinical summaries. Requires SUPABASE_SERVICE_ROLE_KEY for remote writes.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/sync-consulta-vet-consensos.ts
 *
 * Optional:
 *   CONSENSUS_TARGET_LOGIN=luishvet25
 *   CONSENSUS_DRY_RUN=1
 */
import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import { resolveSupabaseAuthEmail } from '../src/lib/authIdentifier'

type PreparedConsensus = {
  slug: string
  title: string
  organization: string | null
  year: number | null
  category: string | null
  species: 'dog' | 'cat' | 'both'
  description: string
  summaryText: string
  keyPointsText: string
  practicalApplicationText: string
  appNotesText: string
  reference: {
    citationText: string
    sourceType: string
    url: string | null
    notes: string
  }
}

function loadEnvLocal(): Record<string, string> {
  const out: Record<string, string> = {}
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      const text = line.trim()
      if (!text || text.startsWith('#')) continue
      const index = text.indexOf('=')
      if (index <= 0) continue
      out[text.slice(0, index).trim()] = text.slice(index + 1).trim()
    }
  } catch {
    // env file is optional
  }
  return out
}

function required(value: string | undefined, label: string): string {
  if (!value) {
    throw new Error(`Defina ${label} no ambiente ou no .env.local.`)
  }
  return value
}

function normalizeLogin(raw: string | undefined): string {
  return String(raw || 'luishvet25').trim().toLowerCase()
}

function resolveTargetEmail(targetLogin: string): string {
  if (targetLogin === 'luishvet25') return 'luishvet25@gmail.com'
  return resolveSupabaseAuthEmail(targetLogin)
}

function sqlLiteral(value: string | number | null): string {
  if (value === null) return 'null'
  if (typeof value === 'number') return String(value)
  return `'${value.replace(/'/g, "''")}'`
}

const compactDetailsBySlug: Record<
  string,
  Pick<PreparedConsensus, 'title' | 'category' | 'description' | 'summaryText' | 'keyPointsText' | 'practicalApplicationText' | 'appNotesText'>
> = {
  leptospirose: {
    title: 'Leptospirose em cães',
    category: 'infectologia',
    description:
      'Consenso ACVIM 2024 para abordagem de leptospirose em cães, com foco em suspeita clínica, diagnóstico, tratamento, suporte, vacinação e biossegurança.',
    summaryText:
      'Consenso ACVIM 2024 para abordagem de leptospirose em cães, com foco em suspeita clínica, diagnóstico por MAT/PCR, tratamento antimicrobiano, suporte renal/hepático, vacinação e biossegurança.',
    keyPointsText: '• Suspeitar diante de doença febril sistêmica, injúria renal aguda, alteração hepática, trombocitopenia ou hemorragia pulmonar.\n• Combinar PCR e sorologia; um único MAT não confirma nem exclui a doença.\n• Colher sangue e urina antes do antimicrobiano quando possível, sem atrasar o tratamento do paciente grave.\n• Associar antimicrobiano ao suporte renal, hepático, respiratório e à biossegurança no manejo da urina.',
    practicalApplicationText: 'Na triagem, registrar vacinação, exposição a roedores, água parada e enchentes. Em suspeita consistente, isolar o manejo da urina, colher amostras, iniciar tratamento e monitorar diurese, função renal, eletrólitos e complicações respiratórias.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Leptospirose deve entrar cedo no diferencial de cães com injúria renal aguda e doença sistêmica febril. Não descarte por MAT negativo inicial; combine sorologia, PCR e contexto clínico, e trate pacientes suspeitos graves antes da confirmação.</p>',
  },
  'consenso-de-epilepsia': {
    title: 'Status epilepticus e crises em cluster',
    category: 'neurologia',
    description:
      'Consenso ACVIM 2024 para manejo de status epilepticus e crises em cluster em cães e gatos.',
    summaryText:
      'Consenso ACVIM 2024 para manejo de status epilepticus e crises em cluster em cães e gatos, com foco em intervenção precoce, benzodiazepínicos, terapias de segunda linha e controle de complicações.',
    keyPointsText: '• Status epilepticus é crise com mais de 5 minutos ou crises repetidas sem recuperação completa.\n• Benzodiazepínico é a primeira linha; tratar cedo reduz refratariedade.\n• Associar fármaco de ação mais longa se houver recorrência.\n• Corrigir simultaneamente hipoglicemia, hipertermia, hipóxia, distúrbios eletrolíticos e a causa de base.',
    practicalApplicationText: 'Usar como fluxo de emergência: ABC, glicemia e temperatura; benzodiazepínico imediato; terapia de ação mais longa se recidivar; infusão/anestesia e monitorização intensiva se refratário. Não tratar apenas a crise: pesquisar intoxicação, doença metabólica e lesão intracraniana.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Crise com mais de 5 minutos ou crises repetidas sem recuperação completa devem ser conduzidas como emergência. Não repita benzodiazepínicos indefinidamente sem escalar para terapia de ação mais longa e suporte intensivo.</p>',
  },
  'iris-drc-2023': {
    title: 'Estadiamento da doença renal crônica',
    category: 'nefrologia-urologia',
    description:
      'Guia IRIS 2023 para estadiamento da doença renal crônica em cães e gatos.',
    summaryText:
      'Guia IRIS 2023 para estadiamento da doença renal crônica em cães e gatos, com foco em creatinina/SDMA, subestadiamento por proteinúria e pressão arterial, e monitorização clínica.',
    keyPointsText: '• Estadiar somente DRC estável, com creatinina e/ou SDMA persistentes.\n• Subestadiar por proteinúria e pressão arterial.\n• Excluir causas pré-renais, pós-renais e injúria renal aguda.\n• Reavaliar o estágio e subestágios após tratamento ou mudança clínica.',
    practicalApplicationText: 'Confirmar estabilidade clínica e hidratação antes de classificar. Registrar creatinina, SDMA, urinálise, UPC e pressão arterial; usar o estágio para organizar monitorização, dieta, controle de proteinúria, hipertensão e complicações.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Não classifique DRC de forma definitiva em paciente desidratado, instável ou com injúria renal aguda sem reavaliação. Proteinúria e hipertensão mudam conduta mesmo dentro do mesmo estágio.</p>',
  },
  'ddiv-em-caes': {
    title: 'Extrusão discal toracolombar aguda em cães',
    category: 'neurologia',
    description:
      'Consenso ACVIM 2022 para diagnóstico e manejo da extrusão discal toracolombar aguda em cães.',
    summaryText:
      'Consenso ACVIM 2022 para diagnóstico e manejo da extrusão discal toracolombar aguda em cães, com foco em imagem, decisão médico-cirúrgica, prognóstico, analgesia e reabilitação.',
    keyPointsText: '• A gravidade neurológica direciona prognóstico e decisão médico-cirúrgica.\n• Ressonância é a técnica mais completa para diagnóstico e prognóstico, quando disponível.\n• Restrição de atividade e analgesia são pilares do manejo clínico.\n• Corticosteroides não são recomendados como neuroproteção de rotina.\n• Paraplegia, piora rápida, dor intensa ou suspeita de mielomalácia exigem avaliação urgente.',
    practicalApplicationText: 'Classificar locomoção, dor profunda, controle urinário e progressão desde a admissão. Encaminhar rapidamente os déficits graves para avaliação cirúrgica; no manejo clínico, estruturar analgesia, repouso, enfermagem urinária e reabilitação.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> A conduta deve ser guiada pelo grau neurológico. Cão não ambulatório, paraplégico ou com dor profunda ausente exige avaliação urgente; corticosteroides não são recomendados como rotina neuroprotetora.</p>',
  },
  'leishmaniose-brasileiro-2020': {
    title: 'Leishmaniose visceral canina',
    category: 'infectologia',
    description:
      'Diretrizes Brasileish 2025 para diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina.',
    summaryText:
      'Diretrizes Brasileish 2025 para diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina, com foco em diagnóstico integrado, avaliação renal, tratamento, monitorização e controle vetorial.',
    keyPointsText: '• O diagnóstico deve integrar clínica, exames laboratoriais e testes específicos.\n• O estadiamento depende de sinais clínicos, hemograma, bioquímica, urinálise, proteinúria e função renal.\n• Tratamento, seguimento e controle vetorial são indissociáveis.\n• A resposta clínica não equivale a eliminação parasitária definitiva.',
    practicalApplicationText: 'Antes do protocolo, registrar estágio, creatinina, UPC, pressão arterial e comorbidades. Planejar tratamento individualizado, monitorização renal longitudinal, adesão do tutor e medidas de redução da exposição ao vetor.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Não inicie protocolo sem avaliar rim, proteinúria e pressão arterial. O manejo deve combinar tratamento, acompanhamento longitudinal e controle de vetor; controle clínico não equivale a cura parasitológica definitiva.</p>',
  },
  'consenso-doenca-mixomatosa-de-miltral': {
    title: 'Doença valvar mixomatosa mitral em cães',
    category: 'cardiologia',
    description:
      'Consenso ACVIM 2019 para diagnóstico e tratamento da doença valvar mixomatosa mitral em cães.',
    summaryText:
      'Consenso ACVIM 2019 para diagnóstico e tratamento da doença valvar mixomatosa mitral em cães, com foco em estadiamento A/B1/B2/C/D, pimobendan em B2, manejo da ICC e doença refratária.',
    keyPointsText: '• Diferenciar B1 de B2 por remodelamento cardíaco, não apenas pelo sopro.\n• Pimobendan é indicado no estágio B2 com cardiomegalia documentada.\n• Estágio C exige manejo de insuficiência cardíaca congestiva e monitorização estreita.\n• Estágio D requer ajuste individualizado de diurético e investigação de fatores de refratariedade.',
    practicalApplicationText: 'Confirmar o estágio com exame, radiografia/ecocardiografia e avaliação de congestão. Usar o consenso para separar prevenção de progressão em B2 do tratamento da insuficiência cardíaca em C/D; tosse isolada não confirma edema pulmonar.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Sopro mitral não basta para indicar pimobendan. Diferencie B1 de B2 por evidência de remodelamento; tosse em cão com MMVD não confirma edema pulmonar sem avaliação clínica e imagem.</p>',
  },
  'hipertensao-sistemica': {
    title: 'Hipertensão sistêmica em cães e gatos',
    category: 'cardiologia',
    description:
      'Consenso ACVIM 2018 para identificação, avaliação e manejo da hipertensão sistêmica em cães e gatos.',
    summaryText:
      'Consenso ACVIM 2018 para identificação, avaliação e manejo da hipertensão sistêmica em cães e gatos, com foco em mensuração padronizada, risco por pressão sistólica, dano a órgão-alvo e tratamento.',
    keyPointsText: '• Medir pressão com técnica padronizada e repetir quando necessário.\n• Classificar risco pelo valor sistólico e pela presença de dano a órgão-alvo.\n• Fundo de olho, rim, cérebro e coração devem ser avaliados.\n• Investigar doença renal, endocrinopatias e efeito de medicamentos; considerar hipertensão situacional.',
    practicalApplicationText: 'Fazer série de medidas em ambiente calmo e registrar método, manguito e comportamento do paciente. Se houver pressão muito elevada ou dano a órgão-alvo, confirmar rapidamente, iniciar conduta individualizada e programar reavaliação da resposta.',
    appNotesText:
      '<p><strong>Alerta editorial:</strong> Não diagnostique hipertensão por medida isolada mal colhida. Pressão sistólica >=180 mmHg ou dano a órgão-alvo exige confirmação rápida e conduta; hipertensão situacional deve ser considerada.</p>',
  },
}

const clinicalAppendixBySlug: Record<
  string,
  { keyPointsText: string; practicalApplicationText: string }
> = {
  leptospirose: {
    keyPointsText:
      'DOSES E INDICACOES DO CONSENSO\n- Doxiciclina: 5 mg/kg VO q12h por 14 dias; esquema recomendado para eliminar a colonizacao renal.\n- Se vomito ou intolerancia impedirem doxiciclina VO: ampicilina 20-30 mg/kg IV q6-8h, amoxicilina 20-30 mg/kg IV q6-8h ou penicilina G 25.000-40.000 U/kg IV q6-8h, migrando para doxiciclina assim que tolerada.\n- Em AKI IRIS grau 4 ou superior, ampliar o intervalo das penicilinas.\n- Hipertensao persistente apos analgesia e correcao volemica: amlodipina 0,25-0,75 mg/kg/dia VO, titulada pela resposta.\n- Opioides sao apropriados para dor; AINEs nao sao recomendados no paciente com lesao renal.',
    practicalApplicationText:
      'MONITORIZACAO\nAcompanhar diurese, creatinina/SDMA, fosforo, potassio, sodio, pressao arterial, UPC, hemograma, coagulacao, bilirrubina/enzimas hepaticas e sinais pulmonares. Considerar terapia renal substitutiva em oliguria/anuria, sobrecarga de volume, hipercalemia ou uremia refrataria. Manter precaucoes com urina e orientar o tutor sobre risco ambiental compartilhado.',
  },
  'consenso-de-epilepsia': {
    keyPointsText:
      'CLASSIFICACAO E DOSES\n- Status epilepticus: crise continua >5 minutos ou crises repetidas sem recuperacao completa. Crises em cluster: mais de 2 crises autolimitadas em 24 horas, com recuperacao entre elas.\n- Midazolam 0,2 mg/kg IV ou intranasal e o regime avaliado nos estudos clinicos citados pelo consenso.\n- Se nao cessar, repetir um segundo bolus apos intervalo minimo de 2 minutos. Persistencia apos 2 bolus exige CRI de benzodiazepinico ou progressao imediata para segunda linha.\n- Levetiracetam IV e fenobarbital IV sao as principais opcoes de segunda linha. Levetiracetam 30-60 mg/kg IV foi avaliado em estudo controlado; cargas devem ser individualizadas.\n- Fenobarbital pode ser carregado no paciente sem hepatopatia e que ainda nao o recebe; em uso cronico, verificar a concentracao serica antes de aumentar.\n- Refratario: ketamina e/ou dexmedetomidina IV/CRI; depois propofol, barbiturico anestesico e anestesia inalatoria.\n- Em gatos, evitar diazepam em CRI e limitar bolus repetidos ou CRI prolongada de propofol.',
    practicalApplicationText:
      'FLUXO E DESMAME\n1. ABC, glicemia, temperatura, oxigenacao, acesso venoso e investigacao metabolica/toxica.\n2. Benzodiazepinico imediato; avaliar cessacao em ate 5 minutos e recidiva em 10-60 minutos.\n3. Apos falha de 2 bolus, iniciar CRI ou segunda linha sem atraso.\n4. Refratario exige anestesia, monitorizacao cardiorrespiratoria e capacidade de ventilacao.\n5. Depois do controle, manter sem crises por 24-48 horas (minimo 12 horas). Reduzir uma infusao por vez, 25-50% a cada 4-6 horas.\nMonitorar hipertermia, hipoglicemia, hipoxemia, hipotensao, aspiracao, rabdomiolise, acidose e lesao renal.',
  },
  'iris-drc-2023': {
    keyPointsText:
      'CLASSIFICACAO IRIS 2023\n- Creatinina (mg/dL), cao: estagio 1 <1,4; 2 = 1,4-2,8; 3 = 2,9-5,0; 4 >5,0. Gato: estagio 1 <1,6; 2 = 1,6-2,8; 3 = 2,9-5,0; 4 >5,0.\n- SDMA persistentemente discordante pode elevar o estagio. Caes: >18, >35 e >54 mcg/dL direcionam respectivamente aos estagios 2, 3 e 4. Gatos: >18, >25 e >38 mcg/dL.\n- UPC depois de excluir causas pre e pos-renais: caes nao proteinuricos <0,2; limitrofes 0,2-0,5; proteinuricos >0,5. Gatos nao proteinuricos <0,2; limitrofes 0,2-0,4; proteinuricos >0,4.\n- Pressao sistolica: <140 risco minimo; 140-159 baixo; 160-179 moderado; >=180 alto risco de dano a orgao-alvo.\n- Creatinina pode subestimar gravidade em paciente sarcopenico; interpretar tendencia, SDMA, urina e imagem.',
    practicalApplicationText:
      'CONDUTA POR EIXO\n- Estagios 1-2: investigar causa tratavel, evitar nefrotoxicos, manter hidratacao e instituir dieta renal conforme indicacao.\n- Estagios 2-4: controlar fosforo, nausea, apetite, potassio, acidose, hidratacao e perda de massa muscular conforme resultados.\n- Proteinuria persistente: confirmar origem renal, tratar e reavaliar UPC; o subestagio deve refletir o valor atual sob tratamento.\n- Hipertensao: tratar conforme risco e dano a orgao-alvo, independentemente do estagio de creatinina.\n- Estagios 3-4: procurar anemia, desnutricao, sinais uremicos e necessidade de suporte intensivo.\nOs limites classificam a DRC; as doses terapeuticas dependem da especie, exames e recomendacao IRIS de tratamento correspondente.',
  },
  'ddiv-em-caes': {
    keyPointsText:
      'CLASSIFICACAO FUNCIONAL\n1. Dor apenas, neurologicamente normal.\n2. Paraparesia ambulatoria.\n3. Paraparesia nao ambulatoria.\n4. Paraplegia com nocicepcao profunda preservada.\n5. Paraplegia sem nocicepcao profunda, com prognostico reservado e risco de mielomalacia progressiva.\n\nMANEJO E DOSES CITADAS\n- Manejo conservador: confinamento/restricao rigorosa por pelo menos 4 semanas, analgesia e reavaliacao se houver piora.\n- AINE por 5-7 dias pode ser usado se nao houver contraindicacao. Nao associar AINE com corticosteroide; corticosteroide nao e neuroprotecao de rotina.\n- Pregabalina 4 mg/kg q8h por 5 dias melhorou analgesia pos-operatoria no estudo citado; gabapentina 10 mg/kg q12h nao superou placebo nesse cenario especifico.\n- Dor que exige opioide favorece hospitalizacao. O painel propoe opioide IV/SC por 24-48 horas no pos-operatorio e AINE por cerca de 7 dias quando permitido.',
    practicalApplicationText:
      'DECISAO MEDICO-CIRURGICA\nPacientes ambulatorios podem ser manejados clinicamente em casos selecionados. Deficits nao ambulatorios, progressao, dor refrataria ou recorrencia favorecem imagem avancada e descompressao cirurgica. A ausencia de nocicepcao profunda piora o prognostico, mas nao elimina toda possibilidade de recuperacao. Monitorar bexiga, pele, infeccao urinaria, dor e sinais ascendentes de mielomalacia; piora do reflexo cutaneo do tronco, flacidez ascendente, hipertermia ou comprometimento respiratorio exigem emergencia.',
  },
  'leishmaniose-brasileiro-2020': {
    keyPointsText:
      'CLASSIFICACAO E TRATAMENTO\n- Classificar em infeccao subclinica ou doenca leve, moderada, grave ou muito grave conforme sinais, hemograma/bioquimica, proteinuria e comprometimento renal.\n- Miltefosina: 2 mg/kg VO q24h por 28 dias, preferencialmente com alimento para reduzir efeitos gastrointestinais.\n- Alopurinol: 10 mg/kg VO q12h por 6-12 meses; monitorar cristaluria, urolitiase por xantina e mineralizacao renal.\n- Avaliar creatinina/SDMA, urinalise, UPC e pressao antes do protocolo; doenca renal avancada pode exigir estabilizacao e ajuste da estrategia.\n- Controle clinico nao equivale a cura parasitologica; persistencia e recidiva sao possiveis.',
    practicalApplicationText:
      'SEGUIMENTO\nConfirmar infeccao com metodo adequado ao contexto, quantificar sorologia quando disponivel e excluir diferenciais. Reavaliar sinais, hemograma, rim, figado, proteinas, UPC e urina nas primeiras semanas e depois periodicamente. Tratar simultaneamente proteinuria, hipertensao, lesoes oculares, dermatopatia e outras complicacoes. Manter repelente/coleira, controle ambiental e orientacao de saude unica durante todo o seguimento.',
  },
  'consenso-doenca-mixomatosa-de-miltral': {
    keyPointsText:
      'CLASSIFICACAO E DOSES\n- A: risco sem doenca estrutural. B1: doenca sem remodelamento suficiente, sem tratamento cardiaco especifico de rotina. B2: cardiomegalia documentada; pimobendan 0,25-0,3 mg/kg VO q12h.\n- C agudo: furosemida 2 mg/kg IV/IM, repetindo a cada hora ate melhora ou total de 8 mg/kg em 4 horas. Edema grave pode exigir CRI 0,66-1 mg/kg/h.\n- C cronico: furosemida VO frequentemente 2 mg/kg q12h ajustada ao efeito; pimobendan 0,25-0,3 mg/kg q12h; enalapril/benazepril 0,5 mg/kg q12h; espironolactona 2 mg/kg q12-24h.\n- D: refratario ao esquema C, frequentemente exigindo furosemida >=8 mg/kg/dia ou equivalente. Torsemida 0,1-0,2 mg/kg q12-24h e opcao sob monitorizacao.\n- Sildenafil 1-2 mg/kg q8h pode ser considerado com hipertensao pulmonar clinicamente relevante.\n- Pimobendan q8h e outras estrategias de estagio D sao off-label e exigem supervisao cardiologica.',
    practicalApplicationText:
      'MONITORIZACAO POR ESTAGIO\nConfirmar B1 versus B2 com ecocardiografia e/ou radiografia; sopro ou tosse isolados nao confirmam B2 ou edema. No C agudo, acompanhar esforco respiratorio, pressao, perfusao, diurese, creatinina e eletrolitos. No C domiciliar, usar a menor dose diuretica que mantenha conforto e reavaliar rim/eletrolitos 3-14 dias apos ajustes. No D, revisar adesao, sodio, dose real, funcao renal, arritmia e hipertensao pulmonar antes de rotular refratariedade.',
  },
  'hipertensao-sistemica': {
    keyPointsText:
      'CLASSIFICACAO E DOSES\n- PAS <140 mmHg: risco minimo; 140-159: baixo; 160-179: moderado; >=180: alto risco de dano a orgao-alvo.\n- Gatos: amlodipina 0,625-1,25 mg/gato VO q24h (ou 0,1-0,25 mg/kg q24h); PAS >200 mmHg pode justificar inicio em 1,25 mg/gato.\n- Caes: benazepril ou enalapril 0,5 mg/kg q12-24h sao opcoes iniciais frequentes; telmisartana 1 mg/kg q24h e alternativa, sobretudo com proteinuria.\n- Hipertensao canina grave >200 mmHg: bloqueador do SRAA associado a amlodipina 0,1-0,5 mg/kg q24h pode ser apropriado.\n- Hipertensao aguda com dano: hidralazina 0,5-2 mg/kg VO q12h ou amlodipina 0,2-0,4 mg/kg q24h sao opcoes citadas; terapia parenteral exige UTI e titulacao.',
    practicalApplicationText:
      'PROTOCOLO DE MEDIDA E SEGUIMENTO\nUsar ambiente calmo, aclimatacao, manguito de 30-40% da circunferencia, descartar a primeira medida e calcular a media de 5-7 leituras consistentes. Registrar metodo, manguito, local, posicao e comportamento. Com dano ocular, neurologico, renal ou cardiaco, uma sessao confiavel pode justificar tratamento imediato. Sem dano, confirmar persistencia conforme o risco. Reavaliar PAS, creatinina, eletrolitos, fundo de olho e UPC apos cada ajuste, buscando reduzir ao menos uma categoria sem causar hipotensao.',
  },
}

function compactForApp(item: PreparedConsensus): PreparedConsensus {
  const display = compactDetailsBySlug[item.slug]
  const appendix = clinicalAppendixBySlug[item.slug]
  return {
    ...item,
    title: display?.title || item.title,
    category: display?.category || item.category,
    keyPointsText: appendix
      ? `${item.keyPointsText}\n\n${appendix.keyPointsText}`
      : item.keyPointsText,
    practicalApplicationText: appendix
      ? `${item.practicalApplicationText}\n\n${appendix.practicalApplicationText}`
      : item.practicalApplicationText,
  }
}

function buildSql(targetLogin: string, targetEmail: string): string {
  const chunks = [
    `do $$`,
    `declare`,
    `  v_target_user_id uuid;`,
    `begin`,
    `  select u.id into v_target_user_id`,
    `  from auth.users u`,
    `  where lower(coalesce(u.email, '')) = ${sqlLiteral(targetEmail)}`,
    `     or lower(coalesce(u.raw_user_meta_data->>'login', '')) = ${sqlLiteral(targetLogin)}`,
    `     or lower(coalesce(u.raw_user_meta_data->>'username', '')) = ${sqlLiteral(targetLogin)}`,
    `  order by u.created_at asc`,
    `  limit 1;`,
    ``,
    `  if v_target_user_id is null then`,
    `    raise exception 'Usuario % (%) nao encontrado no Supabase Auth.', ${sqlLiteral(targetLogin)}, ${sqlLiteral(targetEmail)};`,
    `  end if;`,
    ``,
    `  update public.consensus_documents`,
    `  set is_published = true, updated_by = v_target_user_id`,
    `  where created_by = v_target_user_id or updated_by = v_target_user_id;`,
    ``,
  ]

  for (const rawItem of prepared) {
    const item = compactForApp(rawItem)
    const referenceJson = JSON.stringify([{ id: `ref-${item.slug}`, ...item.reference }])
    chunks.push(
      `  update public.consensus_documents`,
      `  set`,
      `    title = ${sqlLiteral(item.title)},`,
      `    organization = ${sqlLiteral(item.organization)},`,
      `    year = ${sqlLiteral(item.year)},`,
      `    category = ${sqlLiteral(item.category)},`,
      `    species = ${sqlLiteral(item.species)},`,
      `    description = ${sqlLiteral(item.description)},`,
      `    is_published = true,`,
      `    updated_by = v_target_user_id`,
      `  where slug = ${sqlLiteral(item.slug)};`,
      ``,
      `  insert into public.consensus_document_details (`,
      `    consensus_document_id,`,
      `    summary_text,`,
      `    key_points_text,`,
      `    practical_application_text,`,
      `    app_notes_text,`,
      `    "references",`,
      `    created_by,`,
      `    updated_by`,
      `  )`,
      `  select`,
      `    cd.id,`,
      `    ${sqlLiteral(item.summaryText)},`,
      `    ${sqlLiteral(item.keyPointsText)},`,
      `    ${sqlLiteral(item.practicalApplicationText)},`,
      `    ${sqlLiteral(item.appNotesText)},`,
      `    ${sqlLiteral(referenceJson)}::jsonb,`,
      `    v_target_user_id,`,
      `    v_target_user_id`,
      `  from public.consensus_documents cd`,
      `  where cd.slug = ${sqlLiteral(item.slug)}`,
      `  on conflict (consensus_document_id) do update set`,
      `    summary_text = excluded.summary_text,`,
      `    key_points_text = excluded.key_points_text,`,
      `    practical_application_text = excluded.practical_application_text,`,
      `    app_notes_text = excluded.app_notes_text,`,
      `    "references" = excluded."references",`,
      `    updated_by = excluded.updated_by;`,
      ``,
    )
  }

  chunks.push(`end $$;`, ``)
  return chunks.join('\n')
}

const prepared: PreparedConsensus[] = [
  {
    slug: 'leptospirose',
    title: 'ACVIM Consensus Statement on Leptospirosis in Dogs',
    organization: 'ACVIM',
    year: 2024,
    category: 'Infecciosas',
    species: 'dog',
    description:
      'Consenso ACVIM atualizado para suspeita, diagnostico, tratamento, prevencao e manejo zoonotico da leptospirose em caes.',
    summaryText:
      'A leptospirose canina deve ser considerada em qualquer cao com doenca sistemica aguda, especialmente quando ha injuria renal aguda, alteracoes hepaticas, sinais hemorrágicos, trombocitopenia, febre, vomito, letargia, poliuria/polidipsia, oliguria/anuria ou achados pulmonares compativeis com hemorragia. O consenso reforca que todos os caes podem estar em risco, incluindo caes urbanos, de pequeno porte, filhotes, idosos e animais inadequadamente vacinados.\n\nO diagnostico ideal combina suspeita clinica, exames clinicopatologicos, sorologia e testes de deteccao do organismo. MAT isolado tem limitacoes: pode ser negativo no inicio, positivo por vacinacao/exposicao previa e raramente identifica com seguranca o sorogrupo infectante. NAAT/PCR em sangue e urina deve ser interpretado no contexto clinico e, quando possivel, amostras devem ser coletadas antes de antimicrobianos.\n\nO tratamento combina antimicrobiano e suporte intensivo dos orgaos afetados. A estrategia tradicional usa penicilina IV inicialmente quando sinais gastrointestinais ou estado critico dificultam doxiciclina oral, seguida por doxiciclina para reduzir persistencia renal. O consenso destaca suporte renal, nutricional, respiratorio, controle de dor e monitorizacao cuidadosa. A prevencao depende de vacinas de amplo espectro disponiveis, controle ambiental e orientacao de biosseguranca.',
    keyPointsText:
      '- Suspeitar em caes com AKI, doenca hepatorenal, febre, hemorragia, trombocitopenia ou sinais pulmonares.\n- Um unico MAT positivo ou negativo nao fecha nem exclui o diagnostico em todos os cenarios.\n- Combinar sorologia e NAAT/PCR em sangue e urina aumenta o rendimento diagnostico.\n- Coletar amostras antes de antibiotico quando possivel.\n- Doxiciclina e central para eliminar colonizacao renal; penicilina IV pode ser usada na fase inicial em pacientes vomitando ou graves.\n- NSAIDs nao sao recomendados em pacientes com AKI ou risco renal.\n- Pacientes com AKI grave podem precisar de terapia renal substitutiva quando disponivel.\n- Vacinar caes apos recuperacao e manter vacinacao de rotina para reduzir risco individual e zoonotico.\n- O risco de transmissao direta ao tutor/equipe e baixo com precaucoes basicas, mas urina deve ser manipulada com cuidado.',
    practicalApplicationText:
      'No app, este consenso deve orientar uma ficha rapida de triagem: paciente com AKI + sinais sistemicos = perguntar vacinacao, exposicao a agua/enchente/roedores, ambiente coletivo e contato com outros animais. Na suspeita, iniciar isolamento operacional simples de urina, usar EPI, colher sangue/urina para PCR e sorologia antes de antibiotico quando possivel, e iniciar terapia sem esperar confirmacao se o quadro for compativel.\n\nA conduta pratica deve separar tres frentes: antimicrobiano, suporte renal/hepatico/respiratorio e biosseguranca. Para antimicrobiano, usar penicilina IV inicialmente se o paciente esta critico ou nao tolera VO, e completar com doxiciclina VO por 14 dias quando possivel. Para suporte, acompanhar creatinina/SDMA, eletrólitos, diurese, pressao, UPC, hemograma, coagulacao e radiografia/ultrassom conforme sinais. Para casa, orientar evitar contato com urina ate pelo menos 48 horas de doxiciclina, usar luvas e limpar areas contaminadas.',
    appNotesText:
      '- Nao descartar leptospirose por vacinacao previa, especialmente se a vacina foi incompleta, antiga ou de espectro limitado.\n- Nao usar MAT isolado como unico criterio em fase inicial.\n- Nao esperar confirmacao laboratorial para tratar paciente critico com suspeita forte.\n- Evitar NSAIDs em paciente com AKI, desidratacao ou suspeita de lesao renal.\n- O app deve destacar zoonose sem alarmismo: precaucoes padrao e cuidado com urina sao suficientes na maioria dos cenarios.\n- Gatos podem eliminar leptospiras em algumas regioes, mas este consenso e voltado a caes.',
    reference: {
      citationText: 'Sykes JE et al. Updated ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37:1966-1982.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.16903',
      notes: 'PDF lido localmente a partir do bucket consulta-consensos.',
    },
  },
  {
    slug: 'consenso-de-epilepsia',
    title: 'ACVIM Consensus Statement on Status Epilepticus and Cluster Seizures in Dogs and Cats',
    organization: 'ACVIM',
    year: 2023,
    category: 'Neurologia',
    species: 'both',
    description:
      'Consenso ACVIM para manejo emergencial de status epilepticus e crises em cluster em caes e gatos.',
    summaryText:
      'O documento organiza o manejo de emergencias convulsivas em caes e gatos, com foco em status epilepticus (SE) e crises em cluster (CS). SE deve ser tratado como urgencia quando a crise dura mais de 5 minutos ou ha crises repetidas sem recuperacao completa; crises em cluster sao geralmente mais de duas crises em 24 horas. A ideia central e agir cedo, de forma rapida e escalonada, porque a duracao da crise reduz a resposta aos farmacos e aumenta complicacoes sistemicas e neurologicas.\n\nA primeira linha e benzodiazepinica, com enfase em midazolam por vias IV/IN/IM conforme acesso e especie. Diazepam IV pode ser alternativa em caes, mas ha cautela em gatos. Se ha recorrencia ou controle incompleto, o consenso recomenda introduzir farmacos de acao mais longa, especialmente levetiracetam, e escalar para infusoes/anestesicos nos casos refratarios. O manejo nunca deve ser apenas anticonvulsivante: temperatura, glicose, oxigenacao, pressao, eletrolitos, causa de base, aspiracao, rabdomiolise e lesao renal precisam ser acompanhados.',
    keyPointsText:
      '- Iniciar tratamento quando a crise ultrapassa 5 minutos ou quando ha crises repetidas sem recuperacao completa.\n- Benzodiazepinicos sao primeira linha; midazolam e muito util quando IV ainda nao esta disponivel.\n- Atraso no tratamento favorece SE refratario.\n- Levetiracetam e opcao segura como pulso/terapia de acao mais longa em caes e gatos.\n- Fenobarbital pode ser considerado como carga ou ajuste de terapia cronica, conforme paciente e contexto.\n- SE refratario pode exigir ketamina, dexmedetomidina, propofol, barbituricos ou anestesia inalatoria em ambiente monitorado.\n- Em gatos, usar propofol com cautela, especialmente bolus repetidos ou CRI prolongada.\n- Procurar e tratar causa de base: intoxicacao, hipoglicemia, distúrbios metabolicos, encefalopatia, epilepsia idiopatica, lesao estrutural.\n- Monitorar complicacoes: hipertermia, hipoxemia, acidose, rabdomiolise, aspiracao, hipotensao e lesao renal.',
    practicalApplicationText:
      'Transformar em fluxo de emergencia no app: primeiro estabilizar ABC, checar glicemia, acesso venoso e temperatura; depois benzodiazepinico imediato; em seguida, se houver recorrencia, associar levetiracetam/fenobarbital conforme caso; se persistir, tratar como refratario com CRI/anestesico e monitorizacao intensiva.\n\nPara uso rapido, separar cenarios: sem acesso IV, usar via intranasal ou IM quando indicada; com acesso IV, midazolam IV e opcao preferencial. Em crises em cluster, nao esperar evoluir para SE: usar medicacao de resgate e acao mais longa cedo, orientar internacao quando ha recorrencia, causa toxica/metabolica, hipertermia, alteracao persistente de consciencia ou necessidade de CRI.',
    appNotesText:
      '- Este conteudo deve aparecer como protocolo de emergencia, nao como guia de epilepsia cronica.\n- Doses devem ser conferidas no modulo de calculo/farmacos antes de prescrever.\n- Nao repetir benzodiazepinico indefinidamente sem escalar a terapia.\n- Gato nao e cao pequeno: cautela com diazepam e propofol prolongado.\n- Sempre pesquisar causa de base e complicacoes, mesmo quando a crise para.',
    reference: {
      citationText: 'Charalambous M et al. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38:20-48.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.16928',
      notes: 'PDF lido localmente a partir do bucket consulta-consensos.',
    },
  },
  {
    slug: 'iris-drc-2023',
    title: 'IRIS Staging of Chronic Kidney Disease in Dogs and Cats',
    organization: 'IRIS',
    year: 2023,
    category: 'Nefrologia',
    species: 'both',
    description:
      'Guia IRIS para estadiamento e subestadiamento da doenca renal cronica em caes e gatos.',
    summaryText:
      'O guia IRIS e a referencia operacional para classificar DRC em caes e gatos. O estadiamento deve ser feito em paciente clinicamente estavel, preferencialmente bem hidratado, usando creatinina e/ou SDMA em conjunto com urinalise, densidade urinaria, imagem quando indicada e contexto clinico. Apos definir o estagio, o paciente deve ser subestadiado por proteinuria e pressao arterial sistemica, porque esses fatores modificam prognostico e conduta.\n\nA aplicacao correta evita dois erros comuns: classificar um paciente agudo/desidratado como DRC definitiva e ignorar proteinuria/hipertensao apos olhar apenas creatinina. O guia deve funcionar no app como trilho de decisao para diagnostico, acompanhamento, metas de monitorizacao e comunicacao com tutor.',
    keyPointsText:
      '- Estadiar apenas quando o paciente estiver estavel e hidratacao corrigida.\n- Creatinina e SDMA devem ser interpretados com especie, massa muscular e tendencia temporal.\n- Subestadiar sempre por UPC/proteinuria.\n- Subestadiar sempre por pressao arterial e risco de dano a orgao-alvo.\n- DRC pode existir com creatinina pouco alterada quando SDMA, urina e imagem sustentam o quadro.\n- O estagio nao substitui investigacao de causa, complicacoes e comorbidades.\n- Reavaliar tendencias importa mais do que um unico valor isolado.',
    practicalApplicationText:
      'No app, usar o IRIS como calculadora/roteiro: confirmar persistencia de alteracoes renais, classificar por creatinina/SDMA, adicionar UPC, adicionar pressao arterial, e gerar plano de monitorizacao. O resultado deve indicar proximos passos: dieta renal quando apropriada, controle de fosforo, controle de pressao, manejo de proteinuria, hidratacao, nausea/apetite, anemia e seguimento laboratorial.',
    appNotesText:
      '- Nao estadiar DRC definitiva durante AKI, desidratacao ou obstrucao sem reavaliacao.\n- Cuidado com creatinina falsamente baixa em paciente sarcopenico.\n- O app deve destacar que proteinuria e hipertensao mudam conduta mesmo dentro do mesmo estagio.',
    reference: {
      citationText: 'International Renal Interest Society. IRIS Staging of CKD, modified 2023.',
      sourceType: 'Guideline',
      url: 'http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf',
      notes: 'Link original cadastrado no banco retornou 404 durante esta execucao; resumo preparado a partir do conteudo IRIS conhecido e metadados do app.',
    },
  },
  {
    slug: 'ddiv-em-caes',
    title: 'ACVIM Consensus Statement on Acute Canine Thoracolumbar Intervertebral Disc Extrusion',
    organization: 'ACVIM',
    year: 2023,
    category: 'Neurologia',
    species: 'dog',
    description:
      'Consenso ACVIM sobre diagnostico, tratamento medico/cirurgico, prognostico e reabilitacao da extrusao discal toracolombar aguda em caes.',
    summaryText:
      'A extrusao discal toracolombar aguda e uma das principais causas de dor, paraparesia e paraplegia em caes. O consenso estrutura a decisao entre manejo medico e cirurgico conforme gravidade neurologica, dor, progressao, imagem, risco de recorrencia e disponibilidade de cirurgia. MRI, TC, mielo-TC e mielografia podem confirmar o diagnostico e orientar planejamento, com MRI oferecendo melhor informacao prognostica em casos graves.\n\nCaes ambulatórios podem ser tratados clinicamente com restricao de atividade, analgesia e acompanhamento, considerando risco de recorrencia. Caes nao ambulatórios, especialmente parapareticos graves ou paraplegicos com dor profunda preservada, tendem a ter melhor recuperacao com cirurgia. Mesmo caes sem dor profunda nao devem ser automaticamente excluidos de cirurgia, porque recuperacao pode ocorrer, embora o prognostico seja pior e haja risco de mielomalacia progressiva.\n\nO consenso desencoraja corticosteroides de rotina na fase aguda e valoriza analgesia adequada, controle urinario, cuidados de enfermagem e reabilitacao. Fenestracao no disco herniado durante descompressao e recomendada para reduzir recorrencia local; fenestracao profilatica deve ser individualizada.',
    keyPointsText:
      '- Graduar neurologicamente antes de decidir conduta.\n- MRI e preferivel quando disponivel, especialmente para prognostico em pacientes paraplegicos.\n- Caes ambulatórios podem responder ao manejo conservador.\n- Nao ambulatórios DPP geralmente se beneficiam de cirurgia.\n- DPN tem prognostico reservado, mas paralisia prolongada nao elimina automaticamente possibilidade de recuperacao.\n- Corticosteroides nao sao recomendados de rotina para manejo agudo presumido de TL-IVDE.\n- Evitar combinacao de corticosteroide com NSAID.\n- Dor intensa que exige opioide ou dor persistente apesar de repouso/analgesia favorece internacao e reavaliacao.\n- Monitorar sinais de mielomalacia progressiva: piora ascendente, perda de reflexos, progressao do cutoff do paniculo, perda de tono, hipertermia ou ventilacao comprometida.\n- Reabilitacao basica e segura como parte do cuidado pos-operatorio e de recuperacao.',
    practicalApplicationText:
      'No app, organizar como algoritmo: 1) dor apenas/ambulatório; 2) paraparesia nao ambulatória; 3) paraplegia DPP; 4) paraplegia DPN; 5) suspeita de mielomalacia. Para cada grupo, mostrar indicacao de imagem, necessidade de referencia, analgesia, cuidados urinarios e expectativas.\n\nEm manejo conservador, deixar claro: restricao de atividade, analgesia, retorno se dor persiste, sinais pioram ou controle urinario falha. Em cirurgico, indicar que descompressao deve ser considerada cedo nos deficits substanciais, mas sem afirmar janela rigida unica como criterio absoluto. No pos-operatorio, incluir reabilitacao basica, cuidado de pele/bexiga e acompanhamento neurologico.',
    appNotesText:
      '- Nao usar corticosteroide como neuroprotecao de rotina.\n- Nao misturar NSAID e corticoide.\n- DPN exige conversa franca de prognostico e risco de mielomalacia, mas nao significa sempre prognostico zero.\n- Sinais progressivos apos atendimento/cirurgia exigem reavaliacao urgente.\n- O app deve separar conduta por grau neurologico; uma recomendacao unica para toda DDIV fica perigosa.',
    reference: {
      citationText: 'Olby NJ et al. ACVIM consensus statement on diagnosis and management of acute canine thoracolumbar intervertebral disc extrusion. J Vet Intern Med. 2022;36:1570-1596.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.16480',
      notes: 'PDF lido localmente a partir do bucket consulta-consensos.',
    },
  },
  {
    slug: 'leishmaniose-brasileiro-2020',
    title: 'Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina',
    organization: 'Brasileish',
    year: 2025,
    category: 'Infecciosas',
    species: 'dog',
    description:
      'Diretrizes brasileiras para diagnostico, estadiamento, tratamento e seguimento da leishmaniose visceral canina.',
    summaryText:
      'As diretrizes Brasileish organizam a abordagem da leishmaniose visceral canina no contexto brasileiro, com foco em diagnostico integrado, estadiamento clinico-laboratorial, avaliacao renal e tratamento individualizado. A doenca deve ser interpretada como infecciosa e imunomediada, com ampla variacao clinica: de animais assintomaticos a pacientes com dermatopatia, linfadenomegalia, perda de peso, onicogrifose, alteracoes oculares, anemia, hiperglobulinemia, proteinuria e DRC.\n\nA decisao terapeutica depende de estagio, condicao renal, proteinuria, comorbidades, adesao do tutor e medidas de controle vetorial. O tratamento com miltefosina e alopurinol e uma base frequente, mas nao substitui monitorizacao renal e acompanhamento prolongado. O app deve transformar esse consenso em roteiro de estratificacao e seguimento, nao em prescricao unica.',
    keyPointsText:
      '- Diagnostico combina clinica, epidemiologia, sorologia/testes parasitologicos ou moleculares e exclusao de diferenciais.\n- Avaliar rim sempre: creatinina/SDMA, urinalise, UPC e pressao arterial.\n- Proteinuria muda prognostico e conduta.\n- Tratamento e controle vetorial devem caminhar juntos.\n- Miltefosina + alopurinol e esquema central em muitos pacientes, mas exige acompanhamento.\n- Doenca renal grave ou comorbidades podem limitar escolhas terapeuticas.\n- Tutor precisa entender que controle clinico nao equivale a cura parasitologica definitiva.\n- Seguimento deve monitorar sinais clinicos, hemograma, bioquimica, proteinas, rim e proteinuria.',
    practicalApplicationText:
      'No app, usar como checklist: confirmar suspeita, documentar sinais, fazer perfil laboratorial, classificar gravidade, avaliar rim/proteinuria/PA, discutir terapia antileishmania, controle de vetor e monitorizacao. O acompanhamento deve ser longitudinal, com metas clinicas e laboratoriais, e nao apenas uma receita inicial.',
    appNotesText:
      '- Nao iniciar protocolo sem avaliar rim e proteinuria.\n- Nao prometer cura; falar em controle clinico e reducao de carga/risco.\n- Exigir coleira/repelente e controle ambiental como parte do plano.\n- Este consenso e brasileiro, portanto e particularmente relevante para o Vetius.',
    reference: {
      citationText: 'Brasileish. Diretrizes para o diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina. Edição Brasileish 2025.',
      sourceType: 'Diretriz',
      url: 'https://www.brasileish.com.br/_files/ugd/3079c5_c9f6f53d47f945bc800026c78ecb7628.pdf',
      notes: 'PDF oficial Brasileish 2025 validado e incluído localmente no Vetius para visualização estável.',
    },
  },
  {
    slug: 'consenso-doenca-mixomatosa-de-miltral',
    title: 'ACVIM Consensus Guidelines for Myxomatous Mitral Valve Disease in Dogs',
    organization: 'ACVIM',
    year: 2019,
    category: 'Cardiologia',
    species: 'dog',
    description:
      'Consenso ACVIM para diagnostico, estadiamento e tratamento da doenca valvar mixomatosa mitral em caes.',
    summaryText:
      'Este consenso atualiza a classificacao e o manejo da doenca valvar mixomatosa mitral (MMVD/DVMM) em caes. O ponto mais importante para a rotina e separar B1 de B2: B1 tem doenca estrutural sem remodelamento cardiaco relevante e nao recebe terapia cardiaca de rotina; B2 tem remodelamento cardiaco significativo e se beneficia de pimobendan antes da insuficiencia cardiaca congestiva.\n\nO documento tambem organiza manejo de estagios C e D. No estagio C, ha insuficiencia cardiaca congestiva atual ou previa e a conduta combina diuretico, pimobendan, IECA/RAAS conforme caso, espironolactona e monitorizacao. No estagio D, o paciente e refratario ao tratamento padrao e pode exigir torsemida, ajuste de diureticos, vasodilatadores, suporte intensivo, controle de arritmias, manejo de hipertensao pulmonar e consideracao de terapias avancadas.',
    keyPointsText:
      '- A decisao central e estadiamento: A, B1, B2, C ou D.\n- B1: sem tratamento cardiaco especifico de rotina.\n- B2 verdadeiro: pimobendan 0,25-0,3 mg/kg VO q12h e indicado para atrasar ICC.\n- Tosse em cao com sopro nao confirma ICC; investigar vias aereas e imagem toracica.\n- Estagio C agudo: oxigenio, reduzir estresse, furosemida, pimobendan e suporte.\n- Estagio C cronico: diuretico, pimobendan, IECA/RAAS conforme caso, espironolactona e controle domiciliar.\n- Estagio D: revisar aderencia, sodio, rim, arritmia, hipertensao pulmonar e resistencia a diuretico.\n- Frequencia respiratoria de repouso e ferramenta central para tutor.',
    practicalApplicationText:
      'No app, exibir como tomada de decisao por estadio. Para sopro assintomatico, pedir eco/radiografia para separar B1/B2. Para B2, mostrar criterio de remodelamento antes de sugerir pimobendan. Para C e D, separar atendimento agudo de plano domiciliar, incluir monitorizacao renal/eletrólitos, frequencia respiratoria de repouso e sinais de retorno.',
    appNotesText:
      '- Corrigir o titulo antigo com erro de digitacao: "Miltral" deve sair.\n- Nao recomendar pimobendan para qualquer sopro sem confirmar B2.\n- Nao confundir tosse respiratoria com edema pulmonar.\n- Estrategias de estagio D frequentemente sao off-label e exigem monitorizacao estreita.',
    reference: {
      citationText: 'Keene BW et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33:1127-1140.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.15488',
      notes: 'PDF lido localmente a partir do bucket consulta-consensos.',
    },
  },
  {
    slug: 'hipertensao-sistemica',
    title: 'ACVIM Consensus Statement on Systemic Hypertension in Dogs and Cats',
    organization: 'ACVIM',
    year: 2018,
    category: 'Cardiologia',
    species: 'both',
    description:
      'Consenso ACVIM para identificacao, avaliacao e manejo da hipertensao sistemica em caes e gatos.',
    summaryText:
      'O consenso define hipertensao sistemica como aumento sustentado da pressao arterial, geralmente avaliado pela pressao sistolica, e orienta diagnostico baseado em mensuracao padronizada, repeticao quando necessario e busca de dano em orgaos-alvo. A classificacao de risco usa SBP: <140 mmHg minimo risco, 140-159 baixo risco, 160-179 risco moderado e >=180 alto risco. Lesao ocular, neurologica, renal e cardiaca pode justificar inicio mais rapido de tratamento.\n\nA hipertensao pode ser situacional, secundaria ou idiopatica. O documento reforca que ansiedade e tecnica inadequada causam erro diagnostico, portanto o protocolo de afericao e parte do diagnostico. Em gatos, amlodipina e geralmente o farmaco de primeira escolha; em caes, IECA/ARB e escolha frequente, especialmente quando ha proteinuria ou DRC, mas tratamento deve ser individualizado. A meta pratica e reduzir risco de dano em orgaos-alvo, evitando quedas bruscas desnecessarias.',
    keyPointsText:
      '- Medir PA com protocolo: ambiente calmo, manguito adequado, descartar primeira medida e usar media de leituras consistentes.\n- Classificacao por SBP: <140, 140-159, 160-179, >=180 mmHg.\n- Procurar dano em orgaos-alvo: retina, SNC, rim e coracao.\n- Com TOD, tratar apos uma sessao confiavel pode ser justificado.\n- Sem TOD, confirmar persistencia em mais de uma ocasiao, conforme gravidade.\n- Investigar causas secundarias: DRC, endocrinopatias, fármacos, toxicos e outras doencas.\n- Gatos: amlodipina e primeira escolha comum.\n- Caes: IECA/ARB podem ser apropriados, especialmente com proteinuria; amlodipina pode ser necessaria em casos selecionados.\n- Reavaliar PA e ajustar terapia ate reduzir pelo menos uma categoria de risco, evitando hipotensao.',
    practicalApplicationText:
      'No app, criar fluxo por valor de SBP e presenca de TOD. Se SBP >=180 ou ha lesao ocular/neurologica/renal/cardiaca, orientar confirmacao rapida e inicio de terapia. Se 160-179 sem TOD, repetir medidas em curto prazo e procurar causa secundaria. Se 140-159, acompanhar e reavaliar risco. O detalhe deve incluir checklist de exame de fundo de olho, renal/UPC, auscultacao/eco quando indicado e revisao medicamentosa.',
    appNotesText:
      '- Nao diagnosticar hipertensao com uma medida isolada mal colhida.\n- Situacional/estresse pode simular hipertensao verdadeira.\n- Nao adiar tratamento quando ha TOD importante esperando controlar a doenca de base.\n- Evitar reducao agressiva demais em pacientes cronicos sem emergencia.\n- Registrar tecnica, local do manguito, tamanho, posicao e comportamento do paciente.',
    reference: {
      citationText: 'Acierno MJ et al. ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32:1803-1822.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.15331',
      notes: 'PDF lido localmente a partir do bucket consulta-consensos.',
    },
  },
]

async function main() {
  const fileEnv = loadEnvLocal()
  const url = required(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || fileEnv.VITE_SUPABASE_URL, 'SUPABASE_URL ou VITE_SUPABASE_URL')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fileEnv.SUPABASE_SERVICE_ROLE_KEY
  const dryRun = process.env.CONSENSUS_DRY_RUN === '1'
  const targetLogin = normalizeLogin(process.env.CONSENSUS_TARGET_LOGIN)
  const targetEmail = resolveTargetEmail(targetLogin)
  const sqlFile = process.env.CONSENSUS_SQL_FILE

  if (sqlFile) {
    writeFileSync(sqlFile, buildSql(targetLogin, targetEmail), 'utf8')
    console.log(`SQL gerado em ${sqlFile}`)
    return
  }

  if (!serviceRoleKey && !dryRun) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY ausente. Use CONSENSUS_DRY_RUN=1 para validar sem escrever.')
  }

  if (dryRun) {
    console.log(`[dry-run] target=${targetLogin} email=${targetEmail}`)
    console.log(`[dry-run] prepared_consensus_count=${prepared.length}`)
    for (const item of prepared) {
      console.log(`[dry-run] ${item.slug} -> ${item.title}`)
    }
    return
  }

  const admin = createClient(url, serviceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: userPage, error: userError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  if (userError) throw userError

  const targetUser = (userPage.users || []).find((user) => {
    const email = String(user.email || '').toLowerCase()
    const metadata = user.user_metadata || {}
    const login = String(metadata.login || metadata.username || '').toLowerCase()
    return email === targetEmail || login === targetLogin
  })

  if (!targetUser) {
    throw new Error(`Usuario ${targetLogin} (${targetEmail}) nao encontrado no Supabase Auth.`)
  }

  const { error: publishError } = await admin
    .from('consensus_documents')
    .update({ is_published: true, updated_by: targetUser.id })
    .or(`created_by.eq.${targetUser.id},updated_by.eq.${targetUser.id}`)

  if (publishError) throw publishError

  for (const rawItem of prepared) {
    const item = compactForApp(rawItem)
    const { data: doc, error: docError } = await admin
      .from('consensus_documents')
      .update({
        title: item.title,
        organization: item.organization,
        year: item.year,
        category: item.category,
        species: item.species,
        description: item.description,
        is_published: true,
        updated_by: targetUser.id,
      })
      .eq('slug', item.slug)
      .select('id,slug,title')
      .maybeSingle()

    if (docError) throw docError
    if (!doc) {
      console.warn(`[skip] consenso nao encontrado: ${item.slug}`)
      continue
    }

    const { error: detailsError } = await admin
      .from('consensus_document_details')
      .upsert(
        {
          consensus_document_id: doc.id,
          summary_text: item.summaryText,
          key_points_text: item.keyPointsText,
          practical_application_text: item.practicalApplicationText,
          app_notes_text: item.appNotesText,
          references: [
            {
              id: `ref-${item.slug}`,
              ...item.reference,
            },
          ],
          created_by: targetUser.id,
          updated_by: targetUser.id,
        },
        { onConflict: 'consensus_document_id' },
      )

    if (detailsError) throw detailsError
    console.log(`[ok] ${item.slug}`)
  }

  console.log(`Concluido: consensos preparados e publicados para ${targetLogin}.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
