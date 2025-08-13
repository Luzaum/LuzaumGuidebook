import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number; // tempo mínimo para suavizar
  assetsToPreload?: string[]; // urls de imagens/recursos
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, durationMs = 600, assetsToPreload = [] }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const minEnd = Date.now() + durationMs; // mantém um tempo mínimo

    const totalSteps = Math.max(assetsToPreload.length + 1, 1); // +1 para passo de boot
    let completed = 0;

    const update = () => {
      if (isCancelled) return;
      const pct = Math.round((completed / totalSteps) * 100);
      setProgress((prev) => (pct > prev ? pct : prev));
    };

    // Passo de boot inicial
    completed += 1;
    update();

    // Pré-carregar imagens/assets
    if (assetsToPreload.length === 0) {
      completed = totalSteps;
      update();
    } else {
      assetsToPreload.forEach((url) => {
        const img = new Image();
        const done = () => {
          completed += 1;
          update();
        };
        img.onload = done;
        img.onerror = done;
        img.src = url;
      });
    }

    const tryFinish = () => {
      if (isCancelled) return;
      const now = Date.now();
      const waitMs = Math.max(0, minEnd - now);
      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(onComplete, 150);
      }, waitMs);
    };

    // Observa quando todas as etapas foram concluídas
    const observer = window.setInterval(() => {
      if (completed >= totalSteps) {
        window.clearInterval(observer);
        tryFinish();
      }
    }, 50);

    return () => {
      isCancelled = true;
      window.clearInterval(observer);
    };
  }, [assetsToPreload, durationMs, onComplete]);

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


