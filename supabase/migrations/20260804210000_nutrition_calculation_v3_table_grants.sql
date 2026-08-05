-- NutriçãoVET v3: grants explícitos para roles Supabase (instalação local limpa)
-- Alinha com padrão de 20260801120000_create_receituario_simplified_tables.sql
-- NÃO aplicar no remoto nesta fase.

-- nutrition_calculation_runs + dependentes (migration 180000)
grant select, insert on table public.nutrition_calculation_runs to authenticated;
grant select, insert on table public.nutrition_patient_assessments to authenticated;
grant select, insert on table public.nutrition_monitoring_events to authenticated;
grant select on table public.nutrition_formula_versions to authenticated;

grant all on table public.nutrition_calculation_runs to service_role;
grant all on table public.nutrition_patient_assessments to service_role;
grant all on table public.nutrition_monitoring_events to service_role;
grant all on table public.nutrition_formula_versions to service_role;

-- snapshots sync (migration 190000)
grant select, insert, update on table public.nutrition_calculation_snapshots to authenticated;
grant select, insert on table public.nutrition_calculation_inputs to authenticated;
grant select, insert on table public.nutrition_calculation_outputs to authenticated;
grant select, insert on table public.nutrition_clinician_overrides to authenticated;
grant select, insert on table public.nutrition_data_quality_issues to authenticated;

grant all on table public.nutrition_calculation_snapshots to service_role;
grant all on table public.nutrition_calculation_inputs to service_role;
grant all on table public.nutrition_calculation_outputs to service_role;
grant all on table public.nutrition_clinician_overrides to service_role;
grant all on table public.nutrition_data_quality_issues to service_role;
