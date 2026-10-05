-- Remove obsolete duplicate record 'colapso-traqueal' in favor of canonical 'colapso-traqueal-canino'
delete from public.consulta_vet_disease_medications
where disease_id in (select id from public.consulta_vet_diseases where slug = 'colapso-traqueal');

delete from public.consulta_vet_disease_consensos
where disease_id in (select id from public.consulta_vet_diseases where slug = 'colapso-traqueal');

delete from public.consulta_vet_diseases
where slug = 'colapso-traqueal';
