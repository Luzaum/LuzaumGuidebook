import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, durationMs = 1800 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const tickMs = 20;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(interval);
        // Small delay to allow users to see 100%
        window.setTimeout(onComplete, 150);
      }
    }, tickMs);

    return () => window.clearInterval(interval);
  }, [durationMs, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="flex flex-col items-center w-full max-w-sm px-8">
        <img
          src="https://res.cloudinary.com/dwta1roq1/image/upload/w_240,q_auto/LOGOAPP"
          alt="Logo Luzaum's Guidebook"
          className="h-32 w-32 md:h-40 md:w-40 drop-shadow-lg mb-8 select-none"
          draggable={false}
        />

        <div className="w-full">
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;


