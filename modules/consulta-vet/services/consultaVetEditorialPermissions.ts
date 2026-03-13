import { supabase } from '@/src/lib/supabaseClient';

type MembershipRow = {
  role: string;
};

export async function canManageConsultaVetEditorial(): Promise<boolean> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return false;
  }

  const { data, error } = await supabase
    .from('memberships')
    .select('role')
    .eq('user_id', authData.user.id)
    .eq('role', 'owner')
    .limit(1);

  if (error) {
    return false;
  }

  return Boolean((data as MembershipRow[] | null)?.length);
}
