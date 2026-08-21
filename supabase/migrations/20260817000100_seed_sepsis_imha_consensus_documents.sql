-- Consensos de sepse (2026) e AHIM/IMHA (2019) do ConsultaVet.
insert into public.consensus_documents (
  slug, title, description, organization, year, category, species,
  file_path, file_url, is_published, related_disease_slugs, related_medication_slugs
)
values
  ('veccs-sepse-definicao-caes-gatos-2026', 'Sepse em cães e gatos — definição e critérios clínicos',
   'Consenso 2026: sepse requer infecção associada a disfunção orgânica; SIRS isoladamente não define sepse.',
   'VECCS / JVECC', 2026, 'infectologia', 'both', 'external/doi-10.1111-vec.70129',
   'https://onlinelibrary.wiley.com/doi/10.1111/vec.70129', true,
   '["babesiose-canina","mastite-caes-gatos"]'::jsonb, '["amoxicilina-clavulanato"]'::jsonb),
  ('veccs-choque-septico-prognostico-2026', 'Choque séptico e prognóstico em cães e gatos com sepse',
   'Complemento do consenso de sepse: choque séptico, disfunção cardiovascular, hipoperfusão e prognóstico.',
   'VECCS / JVECC', 2026, 'emergencia-terapia-intensiva', 'both', 'external/doi-10.1111-vec.70130',
   'https://onlinelibrary.wiley.com/doi/10.1111/vec.70130', true,
   '["babesiose-canina","mastite-caes-gatos"]'::jsonb, '[]'::jsonb),
  ('acvim-ahim-diagnostico-caes-gatos-2019', 'Diagnóstico da anemia hemolítica imunomediada em cães e gatos',
   'Consenso ACVIM vigente: combinar anemia, evidência de hemólise e evidência de destruição imunomediada.',
   'ACVIM', 2019, 'hematologia-imunologia', 'both', 'external/doi-10.1111-jvim.15441',
   'https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15441', true,
   '["babesiose-canina","micoplasmoses-hemotropicas"]'::jsonb, '["prednisolona"]'::jsonb),
  ('acvim-ahim-tratamento-canino-2019', 'Tratamento da anemia hemolítica imunomediada em cães',
   'Consenso ACVIM com 46 recomendações sobre imunossupressão, transfusão, tromboprofilaxia, monitorização e recaída.',
   'ACVIM', 2019, 'hematologia-imunologia', 'dog', 'external/doi-10.1111-jvim.15463',
   'https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15463', true,
   '["babesiose-canina"]'::jsonb, '["prednisolona"]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description, organization = excluded.organization,
  year = excluded.year, category = excluded.category, species = excluded.species,
  file_path = excluded.file_path, file_url = excluded.file_url, is_published = excluded.is_published,
  related_disease_slugs = excluded.related_disease_slugs,
  related_medication_slugs = excluded.related_medication_slugs, updated_at = now();

insert into public.consensus_document_details (
  consensus_document_id, summary_text, key_points_text, practical_application_text, app_notes_text, references
)
select d.id, v.summary_text, v.key_points_text, v.practical_application_text, v.app_notes_text, v.references
from (values
  ('veccs-sepse-definicao-caes-gatos-2026',
   'Sepse é a síndrome potencialmente fatal decorrente de resposta desregulada do hospedeiro à infecção, com disfunção orgânica. Infecção mais SIRS não é suficiente sem demonstrar disfunção orgânica.',
   '• Exigir infecção e disfunção orgânica.\n• SIRS é alerta de triagem, não definição.\n• Avaliar sistemas cardiovascular, respiratório, renal, neurológico, hepático, hematológico e coagulação.\n• Usar escores estruturados e medidas seriadas.',
   'Identificar foco; colher amostras sem atrasar estabilização; avaliar perfusão, pressão, consciência, oxigenação, diurese, lactato e exames; documentar e reavaliar disfunções.',
   'Relaciona-se a doenças infecciosas e ao Manejo emergencial. Substitui a equivalência antiga “SIRS + infecção = sepse”.',
   '[{"id":"ref-veccs-sepse-2026","citationText":"Goggs R, Cortellini S, DeClue AE, et al. Sepsis in Dogs and Cats—Consensus Definition and Clinical Criteria. J Vet Emerg Crit Care. 2026. doi:10.1111/vec.70129.","sourceType":"Consenso / revisão sistemática","url":"https://pubmed.ncbi.nlm.nih.gov/42438185/","evidenceLevel":"Consenso de especialistas"}]'::jsonb),
  ('veccs-choque-septico-prognostico-2026',
   'Choque séptico é o subconjunto de sepse de maior mortalidade, com instabilidade cardiovascular e anormalidades metabólicas de hipoperfusão apesar de ressuscitação volêmica adequada.',
   '• Procurar hipotensão persistente, suporte vasoativo, hiperlactatemia e progressão orgânica.\n• Interpretar lactato em contexto e tendência.\n• Integrar hemograma, bioquímica, coagulação e escores de gravidade.',
   'Registrar resposta a fluidos, pressão, lactato seriado, perfusão, diurese, consciência, oxigenação e evolução das disfunções; reavaliar foco e necessidade de vasopressor.',
   'Continuação obrigatória da ficha de definição de sepse; um valor isolado de lactato ou pressão não fecha o diagnóstico.',
   '[{"id":"ref-veccs-choque-2026","citationText":"Goggs R, Cortellini S, DeClue AE, et al. Septic Shock and Prognosis in Dogs and Cats With Sepsis—Consensus Definition and Clinical Criteria. J Vet Emerg Crit Care. 2026. doi:10.1111/vec.70130.","sourceType":"Consenso / revisão sistemática","url":"https://pubmed.ncbi.nlm.nih.gov/42438321/","evidenceLevel":"Consenso de especialistas"}]'::jsonb),
  ('acvim-ahim-diagnostico-caes-gatos-2019',
   'O diagnóstico de AHIM combina confirmação da anemia, evidência de hemólise e evidência de destruição imunomediada, seguida da busca de causas infecciosas, neoplásicas, farmacológicas e inflamatórias.',
   '• Confirmar anemia e regeneração.\n• Demonstrar hemólise.\n• Demonstrar imunomediação por esferócitos, aglutinação persistente, Coombs/DAT ou citometria.\n• Investigar causas associadas antes de classificar como não associativa.',
   'Aplicar o checklist anemia → hemólise → imunomediação → causa associada. Em babesiose e hemoplasmas, não chamar automaticamente toda anemia regenerativa de AHIM primária.',
   'Abrange cães e gatos e se relaciona às fichas de babesiose e micoplasmoses hemotrópicas.',
   '[{"id":"ref-acvim-ahim-dx-2019","citationText":"Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33:313-334. doi:10.1111/jvim.15441.","sourceType":"Consenso ACVIM","url":"https://pubmed.ncbi.nlm.nih.gov/30806491/","evidenceLevel":"Consenso de especialistas"}]'::jsonb),
  ('acvim-ahim-tratamento-canino-2019',
   'As 46 recomendações cobrem transfusão, glicocorticoides, segundo imunossupressor, tromboprofilaxia, monitorização, redução gradual, recaída, toxicidade e resgate.',
   '• Transfundir pela necessidade clínica, não por número isolado.\n• Individualizar imunossupressão e segundo agente.\n• Avaliar tromboprofilaxia.\n• Monitorar resposta, infecção e toxicidade; reduzir gradualmente após controle sustentado.',
   'Usar após confirmar AHIM e investigar o gatilho. Integrar com Transfusão sanguínea e prednisolona; registrar PCV/hematócrito, hemólise, tromboprofilaxia, eventos adversos e desmame.',
   'Consenso terapêutico específico para cães; não extrapolar automaticamente para gatos.',
   '[{"id":"ref-acvim-ahim-tx-2019","citationText":"Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33:1141-1172. doi:10.1111/jvim.15463.","sourceType":"Consenso ACVIM","url":"https://pubmed.ncbi.nlm.nih.gov/30847984/","evidenceLevel":"Consenso de especialistas"}]'::jsonb)
) as v(slug, summary_text, key_points_text, practical_application_text, app_notes_text, references)
join public.consensus_documents d on d.slug = v.slug
on conflict (consensus_document_id) do update set
  summary_text = excluded.summary_text, key_points_text = excluded.key_points_text,
  practical_application_text = excluded.practical_application_text,
  app_notes_text = excluded.app_notes_text, references = excluded.references, updated_at = now();
