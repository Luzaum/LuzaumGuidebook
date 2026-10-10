import { useEffect, useState } from 'react';
import { getConsensusEditorialAccess } from '../services/consensusSharedDetailsPermissions';

export function useConsensusEditorialAccess() {
  const [access, setAccess] = useState({ isLoading: true, canManage: false, isGlobalEditor: false, userId: null as string | null });
  useEffect(() => {
    let active = true;
    void getConsensusEditorialAccess().then(result => { if (active) setAccess({ ...result, isLoading: false }); })
      .catch(() => { if (active) setAccess({ isLoading: false, canManage: false, isGlobalEditor: false, userId: null }); });
    return () => { active = false; };
  }, []);
  return access;
}
