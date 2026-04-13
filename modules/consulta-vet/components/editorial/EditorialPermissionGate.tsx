import React from 'react';
import { Lock } from 'lucide-react';

interface EditorialPermissionGateProps {
  isLoading: boolean;
  canManage: boolean;
  children: React.ReactNode;
}

export function EditorialPermissionGate({
  isLoading,
  canManage,
  children,
}: EditorialPermissionGateProps) {
  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-border bg-card p-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!canManage) {
    return (
      <div className="rounded-[28px] border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Acesso restrito</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Apenas perfis owner podem gerenciar o conteúdo editorial do ConsultaVET.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
