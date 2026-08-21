insert into public.consulta_vet_medications (
  category_id, slug, title, active_ingredient, is_controlled, trade_names,
  pharmacologic_class, species, tags, mechanism_of_action, plain_language_summary,
  indications, contraindications, cautions, adverse_effects, interactions, routes,
  doses, presentations, clinical_notes_rich_text, admin_notes_text, "references", is_published
)
values (
  (select id from public.consulta_vet_categories where slug = 'emergencia-intensivismo'),
  'manitol',
  'Manitol',
  'Manitol',
  false,
  array['Manitol 20% e 25% — soluções intravenosas hospitalares']::text[],
  'Diurético osmótico; agente hiperosmolar',
  array['dog', 'cat']::text[],
  array['Hipertensão intracraniana', 'Edema cerebral', 'Glaucoma', 'Diurético osmótico', 'LRA', 'Hospitalar']::text[],
  'Eleva a osmolalidade plasmática e desloca água do cérebro e do humor vítreo para a circulação quando as barreiras estão íntegras. É livremente filtrado e pouco reabsorvido, aumentando a osmolalidade tubular e promovendo diurese osmótica; depende de perfusão e filtração renal suficientes.',
  'Agente hiperosmolar usado principalmente para reduzir de forma aguda a pressão intracraniana e o edema cerebral e, em casos selecionados, a pressão intraocular. Na lesão renal aguda pode aumentar temporariamente a urina, mas não demonstrou recuperar a função renal nem melhorar o prognóstico.',
  array[
    'Hipertensão intracraniana ou edema cerebral com deterioração neurológica compatível.',
    'TCE grave com suspeita de aumento da pressão intracraniana; não usar automaticamente em todo TCE.',
    'Glaucoma agudo refratário, como adjuvante.',
    'Desafio osmótico na LRA oligúrica apenas em paciente euvolêmico, adequadamente hidratado e não anúrico.'
  ]::text[],
  array[
    'Anúria verdadeira ou incapacidade de excretar a carga osmótica.',
    'Hipovolemia grave ou desidratação não corrigida.',
    'Hipervolemia, congestão ou edema pulmonar.',
    'Insuficiência cardíaca descompensada.'
  ]::text[],
  array[
    'Para edema cerebral, preferir bolus intermitentes e evitar CRI rotineiramente devido ao risco de edema de rebote.',
    'Na LRA, aumento da diurese não significa melhora da TFG ou recuperação renal e não deve atrasar terapia renal substitutiva.',
    'Não repetir indiscriminadamente se não houver resposta urinária; evitar em hipervolemia ou hipertensão não controlada.',
    'Em TCE com hipovolemia ou hipotensão, considerar salina hipertônica.',
    'Cautela em cardiopatia, azotemia, distúrbios de sódio e potássio, estados hiperosmolares e ruptura da barreira hematoaquosa.'
  ]::text[],
  array[
    'Expansão intravascular transitória, congestão ou edema pulmonar e descompensação cardíaca.',
    'Diurese osmótica seguida de hipovolemia e hipotensão.',
    'Hiponatremia hipertônica inicial ou hipernatremia tardia, hipocalemia e alterações ácido-base.',
    'Hiperosmolalidade, piora da azotemia, LRA e nefrose osmótica.',
    'Extravasamento pode causar lesão tecidual grave e necrose.'
  ]::text[],
  array[
    'Aminoglicosídeos, ciclosporina e outros nefrotóxicos podem aumentar o risco renal.',
    'Furosemida e outros diuréticos podem causar diurese excessiva, hipovolemia e hipotensão; não associar rotineiramente no TCE.',
    'Aumenta a eliminação urinária de brometo.',
    'Não administrar simultaneamente com sangue ou hemocomponentes pelo mesmo equipo.'
  ]::text[],
  array['IV', 'IO (em contexto emergencial quando acesso IV não é possível)']::text[],
  '[
    {"id":"dose-manitol-both-icp","species":"both","indication":"Hipertensão intracraniana / edema cerebral","doseMin":0.5,"doseMax":1,"doseUnit":"g","perWeightUnit":"kg","route":"IV","frequency":"bolus em 15–20 minutos; repetir somente após reavaliação","duration":"Uso hospitalar agudo; evitar CRI para esta indicação.","notes":"Algumas referências descrevem até 1,5 g/kg. Solução 20%: 2,5–5 mL/kg; solução 25%: 2–4 mL/kg.","monitoring":"Estado neurológico, PA, débito urinário, eletrólitos, osmolalidade, função renal, volemia e congestão.","referenceIds":["ref-manitol-plumbs10","ref-manitol-bsava-emergency","ref-manitol-ballocco-2019"],"evidenceLevel":"Formulários e manual; evidência clínica comparativa limitada","calculatorEnabled":true,"presentationId":"pres-manitol-20"},
    {"id":"dose-manitol-both-tce-severe","species":"both","indication":"TCE grave com suspeita de aumento da pressão intracraniana","doseMin":0.5,"doseMax":1,"doseUnit":"g","perWeightUnit":"kg","route":"IV","frequency":"em 15–20 minutos; titular à resposta","duration":"Uso hospitalar agudo.","notes":"Nelson & Couto descreve 1–1,5 g/kg; August descreve 0,5–1,5 g/kg em gatos. Preferir salina hipertônica se houver hipovolemia/hipotensão.","referenceIds":["ref-manitol-nelson6","ref-manitol-august-feline"],"calculatorEnabled":true,"presentationId":"pres-manitol-20"},
    {"id":"dose-manitol-both-glaucoma","species":"both","indication":"Glaucoma agudo refratário — adjuvante","doseMin":0.5,"doseMax":1,"doseUnit":"g","perWeightUnit":"kg","route":"IV","frequency":"em 10–20 minutos","duration":"Dose aguda; reavaliar pressão intraocular e volemia.","notes":"Outras referências descrevem até 1–2 g/kg. Cautela quando houver uveíte ou ruptura da barreira hematoaquosa.","referenceIds":["ref-manitol-plumbs10","ref-manitol-bsava-emergency"],"calculatorEnabled":true,"presentationId":"pres-manitol-20"},
    {"id":"dose-manitol-both-aki-challenge","species":"both","indication":"LRA oligúrica — desafio osmótico controverso","doseMin":0.25,"doseMax":0.5,"doseUnit":"g","perWeightUnit":"kg","route":"IV","frequency":"em 10–20 minutos; avaliar resposta em 30–60 minutos","duration":"Não repetir indiscriminadamente se não houver resposta.","notes":"Somente após euvolemia e exclusão de anúria. A diurese não prova recuperação renal nem melhora prognóstica.","monitoring":"Débito urinário, balanço hídrico, creatinina, ureia, eletrólitos, osmolalidade, PA e congestão.","maximumDose":"Referências históricas citam máximo de 2 g/kg/dia; não interpretar como meta.","referenceIds":["ref-manitol-plumbs10","ref-manitol-iris-aki-2024","ref-manitol-segev-2019"],"evidenceLevel":"Consenso IRIS 2024; evidência renal direta limitada","calculatorEnabled":true,"presentationId":"pres-manitol-20"}
  ]'::jsonb,
  '[
    {"id":"pres-manitol-20","label":"Manitol 20% — solução intravenosa 200 mg/mL","form":"Solução intravenosa","concentrationValue":200,"concentrationUnit":"mg/mL","route":"IV","channel":"human_pharmacy","packInfo":"20 g/100 mL; verificar cristais e integridade"},
    {"id":"pres-manitol-25","label":"Manitol 25% — solução intravenosa 250 mg/mL","form":"Solução intravenosa","concentrationValue":250,"concentrationUnit":"mg/mL","route":"IV","channel":"human_pharmacy","packInfo":"25 g/100 mL; seguir orientação do fabricante"}
  ]'::jsonb,
  '<p><strong>⚠️ LRA:</strong> aumento temporário da urina não demonstra melhora da TFG, recuperação renal ou prognóstico. Não repetir em anúria e não atrasar terapia renal substitutiva.</p><p><strong>Neurologia:</strong> usar bolus intermitente e evitar CRI para edema cerebral pelo risco de rebote.</p><p><strong>Administração:</strong> inspecionar cristais, usar cateter pérvio e filtro IV apropriado. Não infundir pelo mesmo equipo de sangue.</p><p><strong>Conversões:</strong> 20% = 200 mg/mL; 25% = 250 mg/mL. Exemplo: 10 kg a 0,5 g/kg com solução 20% = 25 mL.</p>',
  'Uso exclusivamente hospitalar sob monitorização. Interromper diante de congestão pulmonar, insuficiência cardíaca, piora da azotemia, oligúria progressiva ou anúria.',
  '[
    {"id":"ref-manitol-plumbs10","citationText":"Plumb''s Veterinary Drug Handbook, 10th ed. — Mannitol, pp. 793–795.","sourceType":"Formulário","evidenceLevel":"Alta"},
    {"id":"ref-manitol-bsava-emergency","citationText":"BSAVA Manual of Canine and Feline Emergency and Critical Care, 3rd ed. — emergências renais, neurológicas e oftálmicas.","sourceType":"Manual","evidenceLevel":"Alta"},
    {"id":"ref-manitol-nelson6","citationText":"Nelson & Couto, 6th ed. — Acute Kidney Injury e Intracranial Disorders.","sourceType":"Livro-texto","evidenceLevel":"Alta"},
    {"id":"ref-manitol-august-feline","citationText":"August''s Consultations in Feline Internal Medicine, vol. 7.","sourceType":"Livro-texto","evidenceLevel":"Moderada a alta"},
    {"id":"ref-manitol-iris-aki-2024","citationText":"Segev G et al. IRIS best practice consensus guidelines for AKI in cats and dogs. Vet J. 2024;305:106068.","sourceType":"Consenso","url":"https://doi.org/10.1016/j.tvjl.2024.106068","evidenceLevel":"Alta"},
    {"id":"ref-manitol-segev-2019","citationText":"Segev G et al. Sequential changes after mannitol administration. JVIM. 2019;33:1362–1367.","sourceType":"Estudo prospectivo cruzado","url":"https://doi.org/10.1111/jvim.15490","evidenceLevel":"Moderada; seis cães saudáveis"},
    {"id":"ref-manitol-ballocco-2019","citationText":"Ballocco I et al. Mannitol and hypertonic saline in spontaneous TBI. JVECC. 2019;29:578–584.","sourceType":"Estudo piloto","url":"https://pubmed.ncbi.nlm.nih.gov/31448527/","evidenceLevel":"Baixa; dois gatos e um cão"},
    {"id":"ref-manitol-yao-2025","citationText":"Yao J, Aoki T. Impact of Mannitol on Left Atrial Pressure in Dogs With Mitral Regurgitation. Vet Med Sci. 2025;11:e70274.","sourceType":"Estudo experimental","url":"https://doi.org/10.1002/vms3.70274","evidenceLevel":"Baixa a moderada; cinco cães"}
  ]'::jsonb,
  true
)
on conflict (slug) do update set
  category_id = excluded.category_id,
  title = excluded.title,
  active_ingredient = excluded.active_ingredient,
  is_controlled = excluded.is_controlled,
  trade_names = excluded.trade_names,
  pharmacologic_class = excluded.pharmacologic_class,
  species = excluded.species,
  tags = excluded.tags,
  mechanism_of_action = excluded.mechanism_of_action,
  plain_language_summary = excluded.plain_language_summary,
  indications = excluded.indications,
  contraindications = excluded.contraindications,
  cautions = excluded.cautions,
  adverse_effects = excluded.adverse_effects,
  interactions = excluded.interactions,
  routes = excluded.routes,
  doses = excluded.doses,
  presentations = excluded.presentations,
  clinical_notes_rich_text = excluded.clinical_notes_rich_text,
  admin_notes_text = excluded.admin_notes_text,
  "references" = excluded."references",
  is_published = excluded.is_published,
  updated_at = now();
