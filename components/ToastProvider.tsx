import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';
export type Toast = { id: string; message: string; type: ToastType };

type ToastCtx = {
  toasts: Toast[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
};

const Ctx = createContext<ToastCtx | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 3000);
  }, [dismiss]);

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
}


