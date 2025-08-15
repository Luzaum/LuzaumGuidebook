import { useCallback, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';
export type Toast = { id: string; message: string; type: ToastType };

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return { toasts, show, dismiss };
}


