import React, { useEffect, useRef } from 'react';
import { useAuth } from './AuthProvider';

declare global {
  interface Window {
    google?: any;
  }
}

function decodeJwt(token: string): any {
  const payload = token.split('.')[1];
  const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodeURIComponent(escape(json)));
}

const GoogleSignIn: React.FC = () => {
  const { loginWithProfile } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId) return;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: any) => {
          try {
            const payload = decodeJwt(response.credential);
            const email = payload.email as string;
            const name = payload.name as string;
            const picture = payload.picture as string | undefined;
            await loginWithProfile({ email, name, avatarUrl: picture });
          } catch (e) {
            // ignore
          }
        },
      });
      if (containerRef.current) {
        window.google.accounts.id.renderButton(containerRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, loginWithProfile]);

  if (!clientId) return null;
  return <div ref={containerRef} aria-label="Entrar com Google" />;
};

export default GoogleSignIn;


