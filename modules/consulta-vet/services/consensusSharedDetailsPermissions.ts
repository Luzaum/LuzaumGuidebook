import { canManageConsultaVetEditorial } from './consultaVetEditorialPermissions';

export async function canManageConsensusSharedDetails(): Promise<boolean> {
  return canManageConsultaVetEditorial();
}
