import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthContextShape = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  openExternalApp: (url: string) => void;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

const STORAGE_KEY = 'luzaum-user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Simula autenticação local; em produção, troque por chamada de API
    const displayName = email.split('@')[0] || 'Usuário';
    const fakeUser: AuthUser = {
      id: `uid_${Math.random().toString(36).slice(2)}`,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email,
      avatarUrl: `https://ui-avatars.com/api/?background=2ecc71&color=ffffff&name=${encodeURIComponent(displayName)}`,
    };
    setUser(fakeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const openExternalApp = useCallback((url: string) => {
    if (!url) return;
    if (!user) {
      window.location.href = '#login-required';
      return;
    }
    const u = new URL(url, window.location.origin);
    u.searchParams.set('source', 'guidebook');
    u.searchParams.set('uid', user.id);
    u.searchParams.set('name', user.name);
    u.searchParams.set('email', user.email);
    window.location.href = u.toString();
  }, [user]);

  const value = useMemo<AuthContextShape>(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    openExternalApp,
  }), [user, login, logout, openExternalApp]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextShape {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}


