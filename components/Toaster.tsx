import React from 'react';
import { useToast } from './ToastProvider';

const ToastItem: React.FC<{ id: string; message: string; type: 'success'|'error'|'info'; onClose: (id: string)=>void }>=({ id, message, type, onClose })=>{
  const color = type==='success' ? 'bg-green-600' : type==='error' ? 'bg-red-600' : 'bg-slate-700';
  return (
    <div className={`${color} text-white rounded-md shadow px-4 py-2`}>{message}</div>
  );
};

export const Toaster: React.FC = () => {
  const { toasts, dismiss } = useToast();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <ToastItem key={t.id} id={t.id} message={t.message} type={t.type} onClose={dismiss} />
      ))}
    </div>
  );
};

export default Toaster;


