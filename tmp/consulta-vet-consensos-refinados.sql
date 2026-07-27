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
    description = 'Consenso ACVIM 2024 para abordagem de leptospirose em cães, com foco em suspeita clínica, diagnóstico, tratamento, suporte, vacinação e biossegurança.',
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
    'Consenso ACVIM 2024 para abordagem de leptospirose em cães, com foco em suspeita clínica, diagnóstico por MAT/PCR, tratamento antimicrobiano, suporte renal/hepático, vacinação e biossegurança.',
    '• Suspeitar diante de doença febril sistêmica, injúria renal aguda, alteração hepática, trombocitopenia ou hemorragia pulmonar.
• Combinar PCR e sorologia; um único MAT não confirma nem exclui a doença.
• Colher sangue e urina antes do antimicrobiano quando possível, sem atrasar o tratamento do paciente grave.
• Associar antimicrobiano ao suporte renal, hepático, respiratório e à biossegurança no manejo da urina.',
    'Na triagem, registrar vacinação, exposição a roedores, água parada e enchentes. Em suspeita consistente, isolar o manejo da urina, colher amostras, iniciar tratamento e monitorar diurese, função renal, eletrólitos e complicações respiratórias.',
    '<p><strong>Alerta editorial:</strong> Leptospirose deve entrar cedo no diferencial de cães com injúria renal aguda e doença sistêmica febril. Não descarte por MAT negativo inicial; combine sorologia, PCR e contexto clínico, e trate pacientes suspeitos graves antes da confirmação.</p>',
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
    description = 'Consenso ACVIM 2024 para manejo de status epilepticus e crises em cluster em cães e gatos.',
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
    'Consenso ACVIM 2024 para manejo de status epilepticus e crises em cluster em cães e gatos, com foco em intervenção precoce, benzodiazepínicos, terapias de segunda linha e controle de complicações.',
    '• Status epilepticus é crise com mais de 5 minutos ou crises repetidas sem recuperação completa.
• Benzodiazepínico é a primeira linha; tratar cedo reduz refratariedade.
• Associar fármaco de ação mais longa se houver recorrência.
• Corrigir simultaneamente hipoglicemia, hipertermia, hipóxia, distúrbios eletrolíticos e a causa de base.',
    'Usar como fluxo de emergência: ABC, glicemia e temperatura; benzodiazepínico imediato; terapia de ação mais longa se recidivar; infusão/anestesia e monitorização intensiva se refratário. Não tratar apenas a crise: pesquisar intoxicação, doença metabólica e lesão intracraniana.',
    '<p><strong>Alerta editorial:</strong> Crise com mais de 5 minutos ou crises repetidas sem recuperação completa devem ser conduzidas como emergência. Não repita benzodiazepínicos indefinidamente sem escalar para terapia de ação mais longa e suporte intensivo.</p>',
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
    description = 'Guia IRIS 2023 para estadiamento da doença renal crônica em cães e gatos.',
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
    'Guia IRIS 2023 para estadiamento da doença renal crônica em cães e gatos, com foco em creatinina/SDMA, subestadiamento por proteinúria e pressão arterial, e monitorização clínica.',
    '• Estadiar somente DRC estável, com creatinina e/ou SDMA persistentes.
• Subestadiar por proteinúria e pressão arterial.
• Excluir causas pré-renais, pós-renais e injúria renal aguda.
• Reavaliar o estágio e subestágios após tratamento ou mudança clínica.',
    'Confirmar estabilidade clínica e hidratação antes de classificar. Registrar creatinina, SDMA, urinálise, UPC e pressão arterial; usar o estágio para organizar monitorização, dieta, controle de proteinúria, hipertensão e complicações.',
    '<p><strong>Alerta editorial:</strong> Não classifique DRC de forma definitiva em paciente desidratado, instável ou com injúria renal aguda sem reavaliação. Proteinúria e hipertensão mudam conduta mesmo dentro do mesmo estágio.</p>',
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
    description = 'Consenso ACVIM 2022 para diagnóstico e manejo da extrusão discal toracolombar aguda em cães.',
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
    'Consenso ACVIM 2022 para diagnóstico e manejo da extrusão discal toracolombar aguda em cães, com foco em imagem, decisão médico-cirúrgica, prognóstico, analgesia e reabilitação.',
    '• A gravidade neurológica direciona prognóstico e decisão médico-cirúrgica.
• Ressonância é a técnica mais completa para diagnóstico e prognóstico, quando disponível.
• Restrição de atividade e analgesia são pilares do manejo clínico.
• Corticosteroides não são recomendados como neuroproteção de rotina.
• Paraplegia, piora rápida, dor intensa ou suspeita de mielomalácia exigem avaliação urgente.',
    'Classificar locomoção, dor profunda, controle urinário e progressão desde a admissão. Encaminhar rapidamente os déficits graves para avaliação cirúrgica; no manejo clínico, estruturar analgesia, repouso, enfermagem urinária e reabilitação.',
    '<p><strong>Alerta editorial:</strong> A conduta deve ser guiada pelo grau neurológico. Cão não ambulatório, paraplégico ou com dor profunda ausente exige avaliação urgente; corticosteroides não são recomendados como rotina neuroprotetora.</p>',
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
    description = 'Diretrizes Brasileiras 2020 para manejo da leishmaniose visceral canina.',
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
    'Diretrizes Brasileiras 2020 para manejo da leishmaniose visceral canina, com foco em diagnóstico integrado, estadiamento clínico-laboratorial, avaliação renal, tratamento e controle vetorial.',
    '• O diagnóstico deve integrar clínica, exames laboratoriais e testes específicos.
• O estadiamento depende de sinais clínicos, hemograma, bioquímica, urinálise, proteinúria e função renal.
• Tratamento, seguimento e controle vetorial são indissociáveis.
• A resposta clínica não equivale a eliminação parasitária definitiva.',
    'Antes do protocolo, registrar estágio, creatinina, UPC, pressão arterial e comorbidades. Planejar tratamento individualizado, monitorização renal longitudinal, adesão do tutor e medidas de redução da exposição ao vetor.',
    '<p><strong>Alerta editorial:</strong> Não inicie protocolo sem avaliar rim, proteinúria e pressão arterial. O manejo deve combinar tratamento, acompanhamento longitudinal e controle de vetor; controle clínico não equivale a cura parasitológica definitiva.</p>',
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
    description = 'Consenso ACVIM 2019 para diagnóstico e tratamento da doença valvar mixomatosa mitral em cães.',
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
    'Consenso ACVIM 2019 para diagnóstico e tratamento da doença valvar mixomatosa mitral em cães, com foco em estadiamento A/B1/B2/C/D, pimobendan em B2, manejo da ICC e doença refratária.',
    '• Diferenciar B1 de B2 por remodelamento cardíaco, não apenas pelo sopro.
• Pimobendan é indicado no estágio B2 com cardiomegalia documentada.
• Estágio C exige manejo de insuficiência cardíaca congestiva e monitorização estreita.
• Estágio D requer ajuste individualizado de diurético e investigação de fatores de refratariedade.',
    'Confirmar o estágio com exame, radiografia/ecocardiografia e avaliação de congestão. Usar o consenso para separar prevenção de progressão em B2 do tratamento da insuficiência cardíaca em C/D; tosse isolada não confirma edema pulmonar.',
    '<p><strong>Alerta editorial:</strong> Sopro mitral não basta para indicar pimobendan. Diferencie B1 de B2 por evidência de remodelamento; tosse em cão com MMVD não confirma edema pulmonar sem avaliação clínica e imagem.</p>',
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
    description = 'Consenso ACVIM 2018 para identificação, avaliação e manejo da hipertensão sistêmica em cães e gatos.',
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
    'Consenso ACVIM 2018 para identificação, avaliação e manejo da hipertensão sistêmica em cães e gatos, com foco em mensuração padronizada, risco por pressão sistólica, dano a órgão-alvo e tratamento.',
    '• Medir pressão com técnica padronizada e repetir quando necessário.
• Classificar risco pelo valor sistólico e pela presença de dano a órgão-alvo.
• Fundo de olho, rim, cérebro e coração devem ser avaliados.
• Investigar doença renal, endocrinopatias e efeito de medicamentos; considerar hipertensão situacional.',
    'Fazer série de medidas em ambiente calmo e registrar método, manguito e comportamento do paciente. Se houver pressão muito elevada ou dano a órgão-alvo, confirmar rapidamente, iniciar conduta individualizada e programar reavaliação da resposta.',
    '<p><strong>Alerta editorial:</strong> Não diagnostique hipertensão por medida isolada mal colhida. Pressão sistólica >=180 mmHg ou dano a órgão-alvo exige confirmação rápida e conduta; hipertensão situacional deve ser considerada.</p>',
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
