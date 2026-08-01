import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed left-3 right-3 top-3 z-[100] max-w-sm rounded-lg border p-4 shadow-lg sm:left-auto sm:right-4 sm:top-4 ${getTypeStyles()}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-black/5 hover:text-gray-700"
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
