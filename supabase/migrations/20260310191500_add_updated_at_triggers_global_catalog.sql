do $$
begin
  if to_regproc('public.set_updated_at') is null then
    create function public.set_updated_at()
    returns trigger
    language plpgsql
    as $fn$
    begin
      new.updated_at = now();
      return new;
    end;
    $fn$;
  end if;
end $$;

drop trigger if exists trg_global_medications_set_updated_at on public.global_medications;
create trigger trg_global_medications_set_updated_at
before update on public.global_medications
for each row
execute function public.set_updated_at();

drop trigger if exists trg_global_medication_presentations_set_updated_at on public.global_medication_presentations;
create trigger trg_global_medication_presentations_set_updated_at
before update on public.global_medication_presentations
for each row
execute function public.set_updated_at();

drop trigger if exists trg_global_medication_recommended_doses_set_updated_at on public.global_medication_recommended_doses;
create trigger trg_global_medication_recommended_doses_set_updated_at
before update on public.global_medication_recommended_doses
for each row
execute function public.set_updated_at();
