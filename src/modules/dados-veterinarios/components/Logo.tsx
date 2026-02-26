import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <rect width="100" height="100" rx="24" fill="url(#logo-gradient)" />
    
    {/* Paw Print Pads */}
    <circle cx="30" cy="35" r="8" fill="white" fillOpacity="0.9" />
    <circle cx="50" cy="25" r="8" fill="white" fillOpacity="0.9" />
    <circle cx="70" cy="35" r="8" fill="white" fillOpacity="0.9" />
    
    {/* Main Pad with Pulse */}
    <path 
      d="M50 85C65 85 75 75 75 60C75 50 65 45 50 45C35 45 25 50 25 60C25 75 35 85 50 85Z" 
      fill="white" 
      fillOpacity="0.9" 
    />
    
    {/* Heartbeat Pulse Line */}
    <path 
      d="M30 60H40L45 50L55 70L60 60H70" 
      stroke="#10B981" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);
