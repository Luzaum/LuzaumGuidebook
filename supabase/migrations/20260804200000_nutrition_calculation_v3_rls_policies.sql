-- NutriçãoVET v3: políticas RLS aditivas para tabelas da migration 180000
-- NÃO aplicar no remoto nesta fase.

-- nutrition_calculation_runs — auditoria append-only por clínica
drop policy if exists nutrition_calculation_runs_select on public.nutrition_calculation_runs;
create policy nutrition_calculation_runs_select
on public.nutrition_calculation_runs for select to authenticated
using (
  clinic_id is not null
  and public.is_member_of_clinic(clinic_id)
);

drop policy if exists nutrition_calculation_runs_insert on public.nutrition_calculation_runs;
create policy nutrition_calculation_runs_insert
on public.nutrition_calculation_runs for insert to authenticated
with check (
  clinic_id is not null
  and user_id = auth.uid()
  and public.is_member_of_clinic(clinic_id)
);

-- nutrition_patient_assessments — leitura/inserção via run da clínica
drop policy if exists nutrition_patient_assessments_select on public.nutrition_patient_assessments;
create policy nutrition_patient_assessments_select
on public.nutrition_patient_assessments for select to authenticated
using (
  exists (
    select 1 from public.nutrition_calculation_runs r
    where r.id = calculation_run_id
      and r.clinic_id is not null
      and public.is_member_of_clinic(r.clinic_id)
  )
);

drop policy if exists nutrition_patient_assessments_insert on public.nutrition_patient_assessments;
create policy nutrition_patient_assessments_insert
on public.nutrition_patient_assessments for insert to authenticated
with check (
  exists (
    select 1 from public.nutrition_calculation_runs r
    where r.id = calculation_run_id
      and r.clinic_id is not null
      and r.user_id = auth.uid()
      and public.is_member_of_clinic(r.clinic_id)
  )
);

-- nutrition_monitoring_events — leitura/inserção via run da clínica
drop policy if exists nutrition_monitoring_events_select on public.nutrition_monitoring_events;
create policy nutrition_monitoring_events_select
on public.nutrition_monitoring_events for select to authenticated
using (
  calculation_run_id is null
  or exists (
    select 1 from public.nutrition_calculation_runs r
    where r.id = calculation_run_id
      and r.clinic_id is not null
      and public.is_member_of_clinic(r.clinic_id)
  )
);

drop policy if exists nutrition_monitoring_events_insert on public.nutrition_monitoring_events;
create policy nutrition_monitoring_events_insert
on public.nutrition_monitoring_events for insert to authenticated
with check (
  calculation_run_id is null
  or exists (
    select 1 from public.nutrition_calculation_runs r
    where r.id = calculation_run_id
      and r.clinic_id is not null
      and r.user_id = auth.uid()
      and public.is_member_of_clinic(r.clinic_id)
  )
);

-- nutrition_formula_versions — somente leitura para clientes autenticados
drop policy if exists nutrition_formula_versions_select on public.nutrition_formula_versions;
create policy nutrition_formula_versions_select
on public.nutrition_formula_versions for select to authenticated
using (active = true);

comment on policy nutrition_calculation_runs_select on public.nutrition_calculation_runs is
  'Membros da clínica leem execuções de cálculo da própria clínica';
comment on policy nutrition_formula_versions_select on public.nutrition_formula_versions is
  'Versões de fórmula são somente leitura — escrita apenas via migration/admin';
