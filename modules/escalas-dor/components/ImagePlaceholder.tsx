import React from 'react';
import { Camera } from 'lucide-react';

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text = 'Foto da parte da escala aqui',
  className = '',
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 rounded-xl min-h-[140px] px-4 text-center cursor-default transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/70 ${className}`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 mb-2">
        <Camera className="w-5 h-5" />
      </div>
      <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
        {text}
      </span>
      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
        Ilustração a ser enviada pelo tutor/veterinário
      </span>
    </div>
  );
};

export default ImagePlaceholder;
