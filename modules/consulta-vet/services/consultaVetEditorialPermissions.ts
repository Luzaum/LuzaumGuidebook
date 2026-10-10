import { supabase } from '@/src/lib/supabaseClient';

export async function canManageConsultaVetEditorial(): Promise<boolean> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return false;
  }

  const { data, error } = await supabase.rpc('can_manage_consulta_vet_editorial');

  if (error) {
    return false;
  }

  return data === true;
}
