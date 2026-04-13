
import React from 'react';

interface IconProps {
  name: 'back' | 'help' | 'pill' | 'paw' | 'close' | 'open';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "h-5 w-5" }) => {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case 'back': return (<svg viewBox="0 0 24 24" {...commonProps}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
    case 'help': return (<svg viewBox="0 0 24 24" {...commonProps}><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
    case 'pill': return (<svg viewBox="0 0 24 24" {...commonProps}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>);
    case 'paw': return (<svg viewBox="0 0 24 24" {...commonProps}><circle cx="11" cy="11" r="2"/><circle cx="18" cy="12" r="2"/><path d="M11 18.5c-2 0-4.1-1.03-5-3.5-1.22-3.4.16-7.2 3.5-8.5"/><path d="m18.5 11.5.5-3.5c-1.22-3.4-5.16-5.2-8.5-4-3.4 1.22-5.2 5.16-4 8.5"/></svg>);
    case 'close': return (<svg viewBox="0 0 24 24" {...commonProps}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
    case 'open': return (<svg viewBox="0 0 24 24" {...commonProps}><path d="M18 13V6a2 2 0 0 0-2-2H6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
    default: return null;
  }
};

export default Icon;
