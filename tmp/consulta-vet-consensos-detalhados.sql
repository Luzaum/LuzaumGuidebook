do $$
declare
  v_target_user_id uuid;
begin
  select u.id into v_target_user_id
  from auth.users u
  where lower(coalesce(u.email, '')) = 'luishvet25@gmail.com'
     or lower(coalesce(u.raw_user_meta_data->>'login', '')) = 'luishvet25'
     or lower(coalesce(u.raw_user_meta_data->>'username', '')) = 'luishvet25'
  order by u.created_at asc
  limit 1;

  if v_target_user_id is null then
    raise exception 'Usuario % (%) nao encontrado no Supabase Auth.', 'luishvet25', 'luishvet25@gmail.com';
  end if;

  update public.consensus_documents
  set is_published = true, updated_by = v_target_user_id
  where created_by = v_target_user_id or updated_by = v_target_user_id;

  update public.consensus_documents
  set
    title = 'Leptospirose em cães',
    organization = 'ACVIM',
    year = 2024,
    category = 'infectologia',
    species = 'dog',
    description = 'Consenso ACVIM atualizado para suspeita, diagnostico, tratamento, prevencao e manejo zoonotico da leptospirose em caes.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'leptospirose';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'A leptospirose canina deve ser considerada em qualquer cao com doenca sistemica aguda, especialmente quando ha injuria renal aguda, alteracoes hepaticas, sinais hemorrágicos, trombocitopenia, febre, vomito, letargia, poliuria/polidipsia, oliguria/anuria ou achados pulmonares compativeis com hemorragia. O consenso reforca que todos os caes podem estar em risco, incluindo caes urbanos, de pequeno porte, filhotes, idosos e animais inadequadamente vacinados.

O diagnostico ideal combina suspeita clinica, exames clinicopatologicos, sorologia e testes de deteccao do organismo. MAT isolado tem limitacoes: pode ser negativo no inicio, positivo por vacinacao/exposicao previa e raramente identifica com seguranca o sorogrupo infectante. NAAT/PCR em sangue e urina deve ser interpretado no contexto clinico e, quando possivel, amostras devem ser coletadas antes de antimicrobianos.

O tratamento combina antimicrobiano e suporte intensivo dos orgaos afetados. A estrategia tradicional usa penicilina IV inicialmente quando sinais gastrointestinais ou estado critico dificultam doxiciclina oral, seguida por doxiciclina para reduzir persistencia renal. O consenso destaca suporte renal, nutricional, respiratorio, controle de dor e monitorizacao cuidadosa. A prevencao depende de vacinas de amplo espectro disponiveis, controle ambiental e orientacao de biosseguranca.',
    '- Suspeitar em caes com AKI, doenca hepatorenal, febre, hemorragia, trombocitopenia ou sinais pulmonares.
- Um unico MAT positivo ou negativo nao fecha nem exclui o diagnostico em todos os cenarios.
- Combinar sorologia e NAAT/PCR em sangue e urina aumenta o rendimento diagnostico.
- Coletar amostras antes de antibiotico quando possivel.
- Doxiciclina e central para eliminar colonizacao renal; penicilina IV pode ser usada na fase inicial em pacientes vomitando ou graves.
- NSAIDs nao sao recomendados em pacientes com AKI ou risco renal.
- Pacientes com AKI grave podem precisar de terapia renal substitutiva quando disponivel.
- Vacinar caes apos recuperacao e manter vacinacao de rotina para reduzir risco individual e zoonotico.
- O risco de transmissao direta ao tutor/equipe e baixo com precaucoes basicas, mas urina deve ser manipulada com cuidado.

DOSES E INDICACOES DO CONSENSO
- Doxiciclina: 5 mg/kg VO q12h por 14 dias; esquema recomendado para eliminar a colonizacao renal.
- Se vomito ou intolerancia impedirem doxiciclina VO: ampicilina 20-30 mg/kg IV q6-8h, amoxicilina 20-30 mg/kg IV q6-8h ou penicilina G 25.000-40.000 U/kg IV q6-8h, migrando para doxiciclina assim que tolerada.
- Em AKI IRIS grau 4 ou superior, ampliar o intervalo das penicilinas.
- Hipertensao persistente apos analgesia e correcao volemica: amlodipina 0,25-0,75 mg/kg/dia VO, titulada pela resposta.
- Opioides sao apropriados para dor; AINEs nao sao recomendados no paciente com lesao renal.',
    'No app, este consenso deve orientar uma ficha rapida de triagem: paciente com AKI + sinais sistemicos = perguntar vacinacao, exposicao a agua/enchente/roedores, ambiente coletivo e contato com outros animais. Na suspeita, iniciar isolamento operacional simples de urina, usar EPI, colher sangue/urina para PCR e sorologia antes de antibiotico quando possivel, e iniciar terapia sem esperar confirmacao se o quadro for compativel.

A conduta pratica deve separar tres frentes: antimicrobiano, suporte renal/hepatico/respiratorio e biosseguranca. Para antimicrobiano, usar penicilina IV inicialmente se o paciente esta critico ou nao tolera VO, e completar com doxiciclina VO por 14 dias quando possivel. Para suporte, acompanhar creatinina/SDMA, eletrólitos, diurese, pressao, UPC, hemograma, coagulacao e radiografia/ultrassom conforme sinais. Para casa, orientar evitar contato com urina ate pelo menos 48 horas de doxiciclina, usar luvas e limpar areas contaminadas.

MONITORIZACAO
Acompanhar diurese, creatinina/SDMA, fosforo, potassio, sodio, pressao arterial, UPC, hemograma, coagulacao, bilirrubina/enzimas hepaticas e sinais pulmonares. Considerar terapia renal substitutiva em oliguria/anuria, sobrecarga de volume, hipercalemia ou uremia refrataria. Manter precaucoes com urina e orientar o tutor sobre risco ambiental compartilhado.',
    '- Nao descartar leptospirose por vacinacao previa, especialmente se a vacina foi incompleta, antiga ou de espectro limitado.
- Nao usar MAT isolado como unico criterio em fase inicial.
- Nao esperar confirmacao laboratorial para tratar paciente critico com suspeita forte.
- Evitar NSAIDs em paciente com AKI, desidratacao ou suspeita de lesao renal.
- O app deve destacar zoonose sem alarmismo: precaucoes padrao e cuidado com urina sao suficientes na maioria dos cenarios.
- Gatos podem eliminar leptospiras em algumas regioes, mas este consenso e voltado a caes.',
    '[{"id":"ref-leptospirose","citationText":"Sykes JE et al. Updated ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37:1966-1982.","sourceType":"Consenso","url":"https://doi.org/10.1111/jvim.16903","notes":"PDF lido localmente a partir do bucket consulta-consensos."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'leptospirose'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Status epilepticus e crises em cluster',
    organization = 'ACVIM',
    year = 2023,
    category = 'neurologia',
    species = 'both',
    description = 'Consenso ACVIM para manejo emergencial de status epilepticus e crises em cluster em caes e gatos.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'consenso-de-epilepsia';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'O documento organiza o manejo de emergencias convulsivas em caes e gatos, com foco em status epilepticus (SE) e crises em cluster (CS). SE deve ser tratado como urgencia quando a crise dura mais de 5 minutos ou ha crises repetidas sem recuperacao completa; crises em cluster sao geralmente mais de duas crises em 24 horas. A ideia central e agir cedo, de forma rapida e escalonada, porque a duracao da crise reduz a resposta aos farmacos e aumenta complicacoes sistemicas e neurologicas.

A primeira linha e benzodiazepinica, com enfase em midazolam por vias IV/IN/IM conforme acesso e especie. Diazepam IV pode ser alternativa em caes, mas ha cautela em gatos. Se ha recorrencia ou controle incompleto, o consenso recomenda introduzir farmacos de acao mais longa, especialmente levetiracetam, e escalar para infusoes/anestesicos nos casos refratarios. O manejo nunca deve ser apenas anticonvulsivante: temperatura, glicose, oxigenacao, pressao, eletrolitos, causa de base, aspiracao, rabdomiolise e lesao renal precisam ser acompanhados.',
    '- Iniciar tratamento quando a crise ultrapassa 5 minutos ou quando ha crises repetidas sem recuperacao completa.
- Benzodiazepinicos sao primeira linha; midazolam e muito util quando IV ainda nao esta disponivel.
- Atraso no tratamento favorece SE refratario.
- Levetiracetam e opcao segura como pulso/terapia de acao mais longa em caes e gatos.
- Fenobarbital pode ser considerado como carga ou ajuste de terapia cronica, conforme paciente e contexto.
- SE refratario pode exigir ketamina, dexmedetomidina, propofol, barbituricos ou anestesia inalatoria em ambiente monitorado.
- Em gatos, usar propofol com cautela, especialmente bolus repetidos ou CRI prolongada.
- Procurar e tratar causa de base: intoxicacao, hipoglicemia, distúrbios metabolicos, encefalopatia, epilepsia idiopatica, lesao estrutural.
- Monitorar complicacoes: hipertermia, hipoxemia, acidose, rabdomiolise, aspiracao, hipotensao e lesao renal.

CLASSIFICACAO E DOSES
- Status epilepticus: crise continua >5 minutos ou crises repetidas sem recuperacao completa. Crises em cluster: mais de 2 crises autolimitadas em 24 horas, com recuperacao entre elas.
- Midazolam 0,2 mg/kg IV ou intranasal e o regime avaliado nos estudos clinicos citados pelo consenso.
- Se nao cessar, repetir um segundo bolus apos intervalo minimo de 2 minutos. Persistencia apos 2 bolus exige CRI de benzodiazepinico ou progressao imediata para segunda linha.
- Levetiracetam IV e fenobarbital IV sao as principais opcoes de segunda linha. Levetiracetam 30-60 mg/kg IV foi avaliado em estudo controlado; cargas devem ser individualizadas.
- Fenobarbital pode ser carregado no paciente sem hepatopatia e que ainda nao o recebe; em uso cronico, verificar a concentracao serica antes de aumentar.
- Refratario: ketamina e/ou dexmedetomidina IV/CRI; depois propofol, barbiturico anestesico e anestesia inalatoria.
- Em gatos, evitar diazepam em CRI e limitar bolus repetidos ou CRI prolongada de propofol.',
    'Transformar em fluxo de emergencia no app: primeiro estabilizar ABC, checar glicemia, acesso venoso e temperatura; depois benzodiazepinico imediato; em seguida, se houver recorrencia, associar levetiracetam/fenobarbital conforme caso; se persistir, tratar como refratario com CRI/anestesico e monitorizacao intensiva.

Para uso rapido, separar cenarios: sem acesso IV, usar via intranasal ou IM quando indicada; com acesso IV, midazolam IV e opcao preferencial. Em crises em cluster, nao esperar evoluir para SE: usar medicacao de resgate e acao mais longa cedo, orientar internacao quando ha recorrencia, causa toxica/metabolica, hipertermia, alteracao persistente de consciencia ou necessidade de CRI.

FLUXO E DESMAME
1. ABC, glicemia, temperatura, oxigenacao, acesso venoso e investigacao metabolica/toxica.
2. Benzodiazepinico imediato; avaliar cessacao em ate 5 minutos e recidiva em 10-60 minutos.
3. Apos falha de 2 bolus, iniciar CRI ou segunda linha sem atraso.
4. Refratario exige anestesia, monitorizacao cardiorrespiratoria e capacidade de ventilacao.
5. Depois do controle, manter sem crises por 24-48 horas (minimo 12 horas). Reduzir uma infusao por vez, 25-50% a cada 4-6 horas.
Monitorar hipertermia, hipoglicemia, hipoxemia, hipotensao, aspiracao, rabdomiolise, acidose e lesao renal.',
    '- Este conteudo deve aparecer como protocolo de emergencia, nao como guia de epilepsia cronica.
- Doses devem ser conferidas no modulo de calculo/farmacos antes de prescrever.
- Nao repetir benzodiazepinico indefinidamente sem escalar a terapia.
- Gato nao e cao pequeno: cautela com diazepam e propofol prolongado.
- Sempre pesquisar causa de base e complicacoes, mesmo quando a crise para.',
    '[{"id":"ref-consenso-de-epilepsia","citationText":"Charalambous M et al. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38:20-48.","sourceType":"Consenso","url":"https://doi.org/10.1111/jvim.16928","notes":"PDF lido localmente a partir do bucket consulta-consensos."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'consenso-de-epilepsia'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Estadiamento da doença renal crônica',
    organization = 'IRIS',
    year = 2023,
    category = 'nefrologia-urologia',
    species = 'both',
    description = 'Guia IRIS para estadiamento e subestadiamento da doenca renal cronica em caes e gatos.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'iris-drc-2023';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'O guia IRIS e a referencia operacional para classificar DRC em caes e gatos. O estadiamento deve ser feito em paciente clinicamente estavel, preferencialmente bem hidratado, usando creatinina e/ou SDMA em conjunto com urinalise, densidade urinaria, imagem quando indicada e contexto clinico. Apos definir o estagio, o paciente deve ser subestadiado por proteinuria e pressao arterial sistemica, porque esses fatores modificam prognostico e conduta.

A aplicacao correta evita dois erros comuns: classificar um paciente agudo/desidratado como DRC definitiva e ignorar proteinuria/hipertensao apos olhar apenas creatinina. O guia deve funcionar no app como trilho de decisao para diagnostico, acompanhamento, metas de monitorizacao e comunicacao com tutor.',
    '- Estadiar apenas quando o paciente estiver estavel e hidratacao corrigida.
- Creatinina e SDMA devem ser interpretados com especie, massa muscular e tendencia temporal.
- Subestadiar sempre por UPC/proteinuria.
- Subestadiar sempre por pressao arterial e risco de dano a orgao-alvo.
- DRC pode existir com creatinina pouco alterada quando SDMA, urina e imagem sustentam o quadro.
- O estagio nao substitui investigacao de causa, complicacoes e comorbidades.
- Reavaliar tendencias importa mais do que um unico valor isolado.

CLASSIFICACAO IRIS 2023
- Creatinina (mg/dL), cao: estagio 1 <1,4; 2 = 1,4-2,8; 3 = 2,9-5,0; 4 >5,0. Gato: estagio 1 <1,6; 2 = 1,6-2,8; 3 = 2,9-5,0; 4 >5,0.
- SDMA persistentemente discordante pode elevar o estagio. Caes: >18, >35 e >54 mcg/dL direcionam respectivamente aos estagios 2, 3 e 4. Gatos: >18, >25 e >38 mcg/dL.
- UPC depois de excluir causas pre e pos-renais: caes nao proteinuricos <0,2; limitrofes 0,2-0,5; proteinuricos >0,5. Gatos nao proteinuricos <0,2; limitrofes 0,2-0,4; proteinuricos >0,4.
- Pressao sistolica: <140 risco minimo; 140-159 baixo; 160-179 moderado; >=180 alto risco de dano a orgao-alvo.
- Creatinina pode subestimar gravidade em paciente sarcopenico; interpretar tendencia, SDMA, urina e imagem.',
    'No app, usar o IRIS como calculadora/roteiro: confirmar persistencia de alteracoes renais, classificar por creatinina/SDMA, adicionar UPC, adicionar pressao arterial, e gerar plano de monitorizacao. O resultado deve indicar proximos passos: dieta renal quando apropriada, controle de fosforo, controle de pressao, manejo de proteinuria, hidratacao, nausea/apetite, anemia e seguimento laboratorial.

CONDUTA POR EIXO
- Estagios 1-2: investigar causa tratavel, evitar nefrotoxicos, manter hidratacao e instituir dieta renal conforme indicacao.
- Estagios 2-4: controlar fosforo, nausea, apetite, potassio, acidose, hidratacao e perda de massa muscular conforme resultados.
- Proteinuria persistente: confirmar origem renal, tratar e reavaliar UPC; o subestagio deve refletir o valor atual sob tratamento.
- Hipertensao: tratar conforme risco e dano a orgao-alvo, independentemente do estagio de creatinina.
- Estagios 3-4: procurar anemia, desnutricao, sinais uremicos e necessidade de suporte intensivo.
Os limites classificam a DRC; as doses terapeuticas dependem da especie, exames e recomendacao IRIS de tratamento correspondente.',
    '- Nao estadiar DRC definitiva durante AKI, desidratacao ou obstrucao sem reavaliacao.
- Cuidado com creatinina falsamente baixa em paciente sarcopenico.
- O app deve destacar que proteinuria e hipertensao mudam conduta mesmo dentro do mesmo estagio.',
    '[{"id":"ref-iris-drc-2023","citationText":"International Renal Interest Society. IRIS Staging of CKD, modified 2023.","sourceType":"Guideline","url":"http://www.iris-kidney.com/pdf/IRIS_Staging_of_CKD_modified_2023.pdf","notes":"Link original cadastrado no banco retornou 404 durante esta execucao; resumo preparado a partir do conteudo IRIS conhecido e metadados do app."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'iris-drc-2023'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Extrusão discal toracolombar aguda em cães',
    organization = 'ACVIM',
    year = 2023,
    category = 'neurologia',
    species = 'dog',
    description = 'Consenso ACVIM sobre diagnostico, tratamento medico/cirurgico, prognostico e reabilitacao da extrusao discal toracolombar aguda em caes.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'ddiv-em-caes';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'A extrusao discal toracolombar aguda e uma das principais causas de dor, paraparesia e paraplegia em caes. O consenso estrutura a decisao entre manejo medico e cirurgico conforme gravidade neurologica, dor, progressao, imagem, risco de recorrencia e disponibilidade de cirurgia. MRI, TC, mielo-TC e mielografia podem confirmar o diagnostico e orientar planejamento, com MRI oferecendo melhor informacao prognostica em casos graves.

Caes ambulatórios podem ser tratados clinicamente com restricao de atividade, analgesia e acompanhamento, considerando risco de recorrencia. Caes nao ambulatórios, especialmente parapareticos graves ou paraplegicos com dor profunda preservada, tendem a ter melhor recuperacao com cirurgia. Mesmo caes sem dor profunda nao devem ser automaticamente excluidos de cirurgia, porque recuperacao pode ocorrer, embora o prognostico seja pior e haja risco de mielomalacia progressiva.

O consenso desencoraja corticosteroides de rotina na fase aguda e valoriza analgesia adequada, controle urinario, cuidados de enfermagem e reabilitacao. Fenestracao no disco herniado durante descompressao e recomendada para reduzir recorrencia local; fenestracao profilatica deve ser individualizada.',
    '- Graduar neurologicamente antes de decidir conduta.
- MRI e preferivel quando disponivel, especialmente para prognostico em pacientes paraplegicos.
- Caes ambulatórios podem responder ao manejo conservador.
- Nao ambulatórios DPP geralmente se beneficiam de cirurgia.
- DPN tem prognostico reservado, mas paralisia prolongada nao elimina automaticamente possibilidade de recuperacao.
- Corticosteroides nao sao recomendados de rotina para manejo agudo presumido de TL-IVDE.
- Evitar combinacao de corticosteroide com NSAID.
- Dor intensa que exige opioide ou dor persistente apesar de repouso/analgesia favorece internacao e reavaliacao.
- Monitorar sinais de mielomalacia progressiva: piora ascendente, perda de reflexos, progressao do cutoff do paniculo, perda de tono, hipertermia ou ventilacao comprometida.
- Reabilitacao basica e segura como parte do cuidado pos-operatorio e de recuperacao.

CLASSIFICACAO FUNCIONAL
1. Dor apenas, neurologicamente normal.
2. Paraparesia ambulatoria.
3. Paraparesia nao ambulatoria.
4. Paraplegia com nocicepcao profunda preservada.
5. Paraplegia sem nocicepcao profunda, com prognostico reservado e risco de mielomalacia progressiva.

MANEJO E DOSES CITADAS
- Manejo conservador: confinamento/restricao rigorosa por pelo menos 4 semanas, analgesia e reavaliacao se houver piora.
- AINE por 5-7 dias pode ser usado se nao houver contraindicacao. Nao associar AINE com corticosteroide; corticosteroide nao e neuroprotecao de rotina.
- Pregabalina 4 mg/kg q8h por 5 dias melhorou analgesia pos-operatoria no estudo citado; gabapentina 10 mg/kg q12h nao superou placebo nesse cenario especifico.
- Dor que exige opioide favorece hospitalizacao. O painel propoe opioide IV/SC por 24-48 horas no pos-operatorio e AINE por cerca de 7 dias quando permitido.',
    'No app, organizar como algoritmo: 1) dor apenas/ambulatório; 2) paraparesia nao ambulatória; 3) paraplegia DPP; 4) paraplegia DPN; 5) suspeita de mielomalacia. Para cada grupo, mostrar indicacao de imagem, necessidade de referencia, analgesia, cuidados urinarios e expectativas.

Em manejo conservador, deixar claro: restricao de atividade, analgesia, retorno se dor persiste, sinais pioram ou controle urinario falha. Em cirurgico, indicar que descompressao deve ser considerada cedo nos deficits substanciais, mas sem afirmar janela rigida unica como criterio absoluto. No pos-operatorio, incluir reabilitacao basica, cuidado de pele/bexiga e acompanhamento neurologico.

DECISAO MEDICO-CIRURGICA
Pacientes ambulatorios podem ser manejados clinicamente em casos selecionados. Deficits nao ambulatorios, progressao, dor refrataria ou recorrencia favorecem imagem avancada e descompressao cirurgica. A ausencia de nocicepcao profunda piora o prognostico, mas nao elimina toda possibilidade de recuperacao. Monitorar bexiga, pele, infeccao urinaria, dor e sinais ascendentes de mielomalacia; piora do reflexo cutaneo do tronco, flacidez ascendente, hipertermia ou comprometimento respiratorio exigem emergencia.',
    '- Nao usar corticosteroide como neuroprotecao de rotina.
- Nao misturar NSAID e corticoide.
- DPN exige conversa franca de prognostico e risco de mielomalacia, mas nao significa sempre prognostico zero.
- Sinais progressivos apos atendimento/cirurgia exigem reavaliacao urgente.
- O app deve separar conduta por grau neurologico; uma recomendacao unica para toda DDIV fica perigosa.',
    '[{"id":"ref-ddiv-em-caes","citationText":"Olby NJ et al. ACVIM consensus statement on diagnosis and management of acute canine thoracolumbar intervertebral disc extrusion. J Vet Intern Med. 2022;36:1570-1596.","sourceType":"Consenso","url":"https://doi.org/10.1111/jvim.16480","notes":"PDF lido localmente a partir do bucket consulta-consensos."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'ddiv-em-caes'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Leishmaniose visceral canina',
    organization = 'Brasileish',
    year = 2020,
    category = 'infectologia',
    species = 'dog',
    description = 'Diretrizes brasileiras para diagnostico, estadiamento, tratamento e seguimento da leishmaniose visceral canina.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'leishmaniose-brasileiro-2020';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'As diretrizes Brasileish organizam a abordagem da leishmaniose visceral canina no contexto brasileiro, com foco em diagnostico integrado, estadiamento clinico-laboratorial, avaliacao renal e tratamento individualizado. A doenca deve ser interpretada como infecciosa e imunomediada, com ampla variacao clinica: de animais assintomaticos a pacientes com dermatopatia, linfadenomegalia, perda de peso, onicogrifose, alteracoes oculares, anemia, hiperglobulinemia, proteinuria e DRC.

A decisao terapeutica depende de estagio, condicao renal, proteinuria, comorbidades, adesao do tutor e medidas de controle vetorial. O tratamento com miltefosina e alopurinol e uma base frequente, mas nao substitui monitorizacao renal e acompanhamento prolongado. O app deve transformar esse consenso em roteiro de estratificacao e seguimento, nao em prescricao unica.',
    '- Diagnostico combina clinica, epidemiologia, sorologia/testes parasitologicos ou moleculares e exclusao de diferenciais.
- Avaliar rim sempre: creatinina/SDMA, urinalise, UPC e pressao arterial.
- Proteinuria muda prognostico e conduta.
- Tratamento e controle vetorial devem caminhar juntos.
- Miltefosina + alopurinol e esquema central em muitos pacientes, mas exige acompanhamento.
- Doenca renal grave ou comorbidades podem limitar escolhas terapeuticas.
- Tutor precisa entender que controle clinico nao equivale a cura parasitologica definitiva.
- Seguimento deve monitorar sinais clinicos, hemograma, bioquimica, proteinas, rim e proteinuria.

CLASSIFICACAO E TRATAMENTO
- Classificar em infeccao subclinica ou doenca leve, moderada, grave ou muito grave conforme sinais, hemograma/bioquimica, proteinuria e comprometimento renal.
- Miltefosina: 2 mg/kg VO q24h por 28 dias, preferencialmente com alimento para reduzir efeitos gastrointestinais.
- Alopurinol: 10 mg/kg VO q12h por 6-12 meses; monitorar cristaluria, urolitiase por xantina e mineralizacao renal.
- Avaliar creatinina/SDMA, urinalise, UPC e pressao antes do protocolo; doenca renal avancada pode exigir estabilizacao e ajuste da estrategia.
- Controle clinico nao equivale a cura parasitologica; persistencia e recidiva sao possiveis.',
    'No app, usar como checklist: confirmar suspeita, documentar sinais, fazer perfil laboratorial, classificar gravidade, avaliar rim/proteinuria/PA, discutir terapia antileishmania, controle de vetor e monitorizacao. O acompanhamento deve ser longitudinal, com metas clinicas e laboratoriais, e nao apenas uma receita inicial.

SEGUIMENTO
Confirmar infeccao com metodo adequado ao contexto, quantificar sorologia quando disponivel e excluir diferenciais. Reavaliar sinais, hemograma, rim, figado, proteinas, UPC e urina nas primeiras semanas e depois periodicamente. Tratar simultaneamente proteinuria, hipertensao, lesoes oculares, dermatopatia e outras complicacoes. Manter repelente/coleira, controle ambiental e orientacao de saude unica durante todo o seguimento.',
    '- Nao iniciar protocolo sem avaliar rim e proteinuria.
- Nao prometer cura; falar em controle clinico e reducao de carga/risco.
- Exigir coleira/repelente e controle ambiental como parte do plano.
- Este consenso e brasileiro, portanto e particularmente relevante para o Vetius.',
    '[{"id":"ref-leishmaniose-brasileiro-2020","citationText":"Brasileish. Diretrizes Brasileiras para o Manejo da Leishmaniose Visceral Canina. 2020.","sourceType":"Diretriz","url":"https://www.brasileish.com.br/wp-content/uploads/2020/12/Diretrizes-Brasileish-2020.pdf","notes":"Link original cadastrado no banco retornou 404 durante esta execucao; resumo preparado a partir da diretriz cadastrada e escopo clinico."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'leishmaniose-brasileiro-2020'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Doença valvar mixomatosa mitral em cães',
    organization = 'ACVIM',
    year = 2019,
    category = 'cardiologia',
    species = 'dog',
    description = 'Consenso ACVIM para diagnostico, estadiamento e tratamento da doenca valvar mixomatosa mitral em caes.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'consenso-doenca-mixomatosa-de-miltral';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'Este consenso atualiza a classificacao e o manejo da doenca valvar mixomatosa mitral (MMVD/DVMM) em caes. O ponto mais importante para a rotina e separar B1 de B2: B1 tem doenca estrutural sem remodelamento cardiaco relevante e nao recebe terapia cardiaca de rotina; B2 tem remodelamento cardiaco significativo e se beneficia de pimobendan antes da insuficiencia cardiaca congestiva.

O documento tambem organiza manejo de estagios C e D. No estagio C, ha insuficiencia cardiaca congestiva atual ou previa e a conduta combina diuretico, pimobendan, IECA/RAAS conforme caso, espironolactona e monitorizacao. No estagio D, o paciente e refratario ao tratamento padrao e pode exigir torsemida, ajuste de diureticos, vasodilatadores, suporte intensivo, controle de arritmias, manejo de hipertensao pulmonar e consideracao de terapias avancadas.',
    '- A decisao central e estadiamento: A, B1, B2, C ou D.
- B1: sem tratamento cardiaco especifico de rotina.
- B2 verdadeiro: pimobendan 0,25-0,3 mg/kg VO q12h e indicado para atrasar ICC.
- Tosse em cao com sopro nao confirma ICC; investigar vias aereas e imagem toracica.
- Estagio C agudo: oxigenio, reduzir estresse, furosemida, pimobendan e suporte.
- Estagio C cronico: diuretico, pimobendan, IECA/RAAS conforme caso, espironolactona e controle domiciliar.
- Estagio D: revisar aderencia, sodio, rim, arritmia, hipertensao pulmonar e resistencia a diuretico.
- Frequencia respiratoria de repouso e ferramenta central para tutor.

CLASSIFICACAO E DOSES
- A: risco sem doenca estrutural. B1: doenca sem remodelamento suficiente, sem tratamento cardiaco especifico de rotina. B2: cardiomegalia documentada; pimobendan 0,25-0,3 mg/kg VO q12h.
- C agudo: furosemida 2 mg/kg IV/IM, repetindo a cada hora ate melhora ou total de 8 mg/kg em 4 horas. Edema grave pode exigir CRI 0,66-1 mg/kg/h.
- C cronico: furosemida VO frequentemente 2 mg/kg q12h ajustada ao efeito; pimobendan 0,25-0,3 mg/kg q12h; enalapril/benazepril 0,5 mg/kg q12h; espironolactona 2 mg/kg q12-24h.
- D: refratario ao esquema C, frequentemente exigindo furosemida >=8 mg/kg/dia ou equivalente. Torsemida 0,1-0,2 mg/kg q12-24h e opcao sob monitorizacao.
- Sildenafil 1-2 mg/kg q8h pode ser considerado com hipertensao pulmonar clinicamente relevante.
- Pimobendan q8h e outras estrategias de estagio D sao off-label e exigem supervisao cardiologica.',
    'No app, exibir como tomada de decisao por estadio. Para sopro assintomatico, pedir eco/radiografia para separar B1/B2. Para B2, mostrar criterio de remodelamento antes de sugerir pimobendan. Para C e D, separar atendimento agudo de plano domiciliar, incluir monitorizacao renal/eletrólitos, frequencia respiratoria de repouso e sinais de retorno.

MONITORIZACAO POR ESTAGIO
Confirmar B1 versus B2 com ecocardiografia e/ou radiografia; sopro ou tosse isolados nao confirmam B2 ou edema. No C agudo, acompanhar esforco respiratorio, pressao, perfusao, diurese, creatinina e eletrolitos. No C domiciliar, usar a menor dose diuretica que mantenha conforto e reavaliar rim/eletrolitos 3-14 dias apos ajustes. No D, revisar adesao, sodio, dose real, funcao renal, arritmia e hipertensao pulmonar antes de rotular refratariedade.',
    '- Corrigir o titulo antigo com erro de digitacao: "Miltral" deve sair.
- Nao recomendar pimobendan para qualquer sopro sem confirmar B2.
- Nao confundir tosse respiratoria com edema pulmonar.
- Estrategias de estagio D frequentemente sao off-label e exigem monitorizacao estreita.',
    '[{"id":"ref-consenso-doenca-mixomatosa-de-miltral","citationText":"Keene BW et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33:1127-1140.","sourceType":"Consenso","url":"https://doi.org/10.1111/jvim.15488","notes":"PDF lido localmente a partir do bucket consulta-consensos."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'consenso-doenca-mixomatosa-de-miltral'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

  update public.consensus_documents
  set
    title = 'Hipertensão sistêmica em cães e gatos',
    organization = 'ACVIM',
    year = 2018,
    category = 'cardiologia',
    species = 'both',
    description = 'Consenso ACVIM para identificacao, avaliacao e manejo da hipertensao sistemica em caes e gatos.',
    is_published = true,
    updated_by = v_target_user_id
  where slug = 'hipertensao-sistemica';

  insert into public.consensus_document_details (
    consensus_document_id,
    summary_text,
    key_points_text,
    practical_application_text,
    app_notes_text,
    "references",
    created_by,
    updated_by
  )
  select
    cd.id,
    'O consenso define hipertensao sistemica como aumento sustentado da pressao arterial, geralmente avaliado pela pressao sistolica, e orienta diagnostico baseado em mensuracao padronizada, repeticao quando necessario e busca de dano em orgaos-alvo. A classificacao de risco usa SBP: <140 mmHg minimo risco, 140-159 baixo risco, 160-179 risco moderado e >=180 alto risco. Lesao ocular, neurologica, renal e cardiaca pode justificar inicio mais rapido de tratamento.

A hipertensao pode ser situacional, secundaria ou idiopatica. O documento reforca que ansiedade e tecnica inadequada causam erro diagnostico, portanto o protocolo de afericao e parte do diagnostico. Em gatos, amlodipina e geralmente o farmaco de primeira escolha; em caes, IECA/ARB e escolha frequente, especialmente quando ha proteinuria ou DRC, mas tratamento deve ser individualizado. A meta pratica e reduzir risco de dano em orgaos-alvo, evitando quedas bruscas desnecessarias.',
    '- Medir PA com protocolo: ambiente calmo, manguito adequado, descartar primeira medida e usar media de leituras consistentes.
- Classificacao por SBP: <140, 140-159, 160-179, >=180 mmHg.
- Procurar dano em orgaos-alvo: retina, SNC, rim e coracao.
- Com TOD, tratar apos uma sessao confiavel pode ser justificado.
- Sem TOD, confirmar persistencia em mais de uma ocasiao, conforme gravidade.
- Investigar causas secundarias: DRC, endocrinopatias, fármacos, toxicos e outras doencas.
- Gatos: amlodipina e primeira escolha comum.
- Caes: IECA/ARB podem ser apropriados, especialmente com proteinuria; amlodipina pode ser necessaria em casos selecionados.
- Reavaliar PA e ajustar terapia ate reduzir pelo menos uma categoria de risco, evitando hipotensao.

CLASSIFICACAO E DOSES
- PAS <140 mmHg: risco minimo; 140-159: baixo; 160-179: moderado; >=180: alto risco de dano a orgao-alvo.
- Gatos: amlodipina 0,625-1,25 mg/gato VO q24h (ou 0,1-0,25 mg/kg q24h); PAS >200 mmHg pode justificar inicio em 1,25 mg/gato.
- Caes: benazepril ou enalapril 0,5 mg/kg q12-24h sao opcoes iniciais frequentes; telmisartana 1 mg/kg q24h e alternativa, sobretudo com proteinuria.
- Hipertensao canina grave >200 mmHg: bloqueador do SRAA associado a amlodipina 0,1-0,5 mg/kg q24h pode ser apropriado.
- Hipertensao aguda com dano: hidralazina 0,5-2 mg/kg VO q12h ou amlodipina 0,2-0,4 mg/kg q24h sao opcoes citadas; terapia parenteral exige UTI e titulacao.',
    'No app, criar fluxo por valor de SBP e presenca de TOD. Se SBP >=180 ou ha lesao ocular/neurologica/renal/cardiaca, orientar confirmacao rapida e inicio de terapia. Se 160-179 sem TOD, repetir medidas em curto prazo e procurar causa secundaria. Se 140-159, acompanhar e reavaliar risco. O detalhe deve incluir checklist de exame de fundo de olho, renal/UPC, auscultacao/eco quando indicado e revisao medicamentosa.

PROTOCOLO DE MEDIDA E SEGUIMENTO
Usar ambiente calmo, aclimatacao, manguito de 30-40% da circunferencia, descartar a primeira medida e calcular a media de 5-7 leituras consistentes. Registrar metodo, manguito, local, posicao e comportamento. Com dano ocular, neurologico, renal ou cardiaco, uma sessao confiavel pode justificar tratamento imediato. Sem dano, confirmar persistencia conforme o risco. Reavaliar PAS, creatinina, eletrolitos, fundo de olho e UPC apos cada ajuste, buscando reduzir ao menos uma categoria sem causar hipotensao.',
    '- Nao diagnosticar hipertensao com uma medida isolada mal colhida.
- Situacional/estresse pode simular hipertensao verdadeira.
- Nao adiar tratamento quando ha TOD importante esperando controlar a doenca de base.
- Evitar reducao agressiva demais em pacientes cronicos sem emergencia.
- Registrar tecnica, local do manguito, tamanho, posicao e comportamento do paciente.',
    '[{"id":"ref-hipertensao-sistemica","citationText":"Acierno MJ et al. ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32:1803-1822.","sourceType":"Consenso","url":"https://doi.org/10.1111/jvim.15331","notes":"PDF lido localmente a partir do bucket consulta-consensos."}]'::jsonb,
    v_target_user_id,
    v_target_user_id
  from public.consensus_documents cd
  where cd.slug = 'hipertensao-sistemica'
  on conflict (consensus_document_id) do update set
    summary_text = excluded.summary_text,
    key_points_text = excluded.key_points_text,
    practical_application_text = excluded.practical_application_text,
    app_notes_text = excluded.app_notes_text,
    "references" = excluded."references",
    updated_by = excluded.updated_by;

end $$;
