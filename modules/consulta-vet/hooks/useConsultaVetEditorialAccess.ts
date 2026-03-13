import { useEffect, useState } from 'react';
import { canManageConsultaVetEditorial } from '../services/consultaVetEditorialPermissions';

export function useConsultaVetEditorialAccess() {
  const [isLoading, setIsLoading] = useState(true);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setIsLoading(true);
      const next = await canManageConsultaVetEditorial();
      if (!isMounted) return;
      setCanManage(next);
      setIsLoading(false);
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, canManage };
}
