import { canManageConsultaVetEditorial } from './consultaVetEditorialPermissions';
import { supabase } from '@/src/lib/supabaseClient';

export async function getConsensusEditorialAccess() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { canManage: false, isGlobalEditor: false, userId: null as string | null };
  return { canManage: true, isGlobalEditor: await canManageConsultaVetEditorial(), userId: data.user.id };
}

export async function canManageConsensusSharedDetails(consensusId?: string): Promise<boolean> {
  const access = await getConsensusEditorialAccess();
  if (access.isGlobalEditor) return true;
  if (!access.userId || !consensusId) return false;
  const { data, error } = await supabase.from('consensus_documents').select('created_by').eq('id', consensusId).maybeSingle();
  return !error && data?.created_by === access.userId;
}
