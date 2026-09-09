// src/components/AuthSessionProvider.tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { signOut as supabaseSignOut } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";
import { jsx } from "react/jsx-runtime";
var AuthSessionContext = createContext(void 0);
var LEGACY_USER_STORAGE_KEY = "luzaum-user";
var AUTH_PROFILE_STORAGE_KEY = "vetius:auth:profile";
function safeEmailFromUser(user) {
  return String(user.email || "").trim();
}
function safeDisplayNameFromUser(user) {
  const metadata = user.user_metadata || {};
  const fullName = String(metadata.full_name || metadata.name || "").trim();
  if (fullName) return fullName;
  const email = safeEmailFromUser(user);
  if (!email.includes("@")) return "Usu\xE1rio";
  return email.split("@")[0];
}
function fallbackAvatarFromName(name) {
  return `https://ui-avatars.com/api/?background=0f172a&color=ffffff&name=${encodeURIComponent(name)}`;
}
function safeAvatarFromUser(user, name) {
  const metadata = user.user_metadata || {};
  const provided = String(metadata.avatar_url || metadata.picture || "").trim();
  if (provided) return provided;
  return fallbackAvatarFromName(name);
}
function toAuthProfile(user) {
  const name = safeDisplayNameFromUser(user);
  return {
    id: user.id,
    email: safeEmailFromUser(user),
    name,
    avatarUrl: safeAvatarFromUser(user, name)
  };
}
function persistProfile(profile) {
  try {
    if (!profile) {
      localStorage.removeItem(AUTH_PROFILE_STORAGE_KEY);
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
      return;
    }
    localStorage.setItem(AUTH_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(
      LEGACY_USER_STORAGE_KEY,
      JSON.stringify({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        avatarUrl: profile.avatarUrl
      })
    );
  } catch {
  }
}
function readProfileFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const id = String(parsed.id || "").trim();
    const email = String(parsed.email || "").trim();
    if (!id || !email) return null;
    const name = String(parsed.name || "").trim() || "Usu\xE1rio";
    const avatarUrl = String(parsed.avatarUrl || "").trim() || fallbackAvatarFromName(name);
    return { id, email, name, avatarUrl };
  } catch {
    return null;
  }
}
function AuthSessionProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(() => readProfileFromStorage());
  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const nextSession = data.session || null;
      setSession(nextSession);
      const nextProfile = nextSession?.user ? toAuthProfile(nextSession.user) : null;
      setProfile(nextProfile);
      persistProfile(nextProfile);
    } finally {
      setLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    await supabaseSignOut();
    setSession(null);
    setProfile(null);
    persistProfile(null);
  }, []);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!alive) return;
        if (error) throw error;
        const nextSession = data.session || null;
        setSession(nextSession);
        const nextProfile = nextSession?.user ? toAuthProfile(nextSession.user) : null;
        setProfile(nextProfile);
        persistProfile(nextProfile);
      } catch {
        if (!alive) return;
        setSession(null);
        setProfile(null);
        persistProfile(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!alive) return;
      setSession(nextSession || null);
      const nextProfile = nextSession?.user ? toAuthProfile(nextSession.user) : null;
      setProfile(nextProfile);
      persistProfile(nextProfile);
      setLoading(false);
    });
    return () => {
      alive = false;
      authListener.subscription.unsubscribe();
    };
  }, []);
  const value = useMemo(
    () => ({
      loading,
      session,
      user: session?.user || null,
      profile,
      isAuthenticated: Boolean(session?.user),
      refreshSession,
      logout
    }),
    [loading, session, profile, refreshSession, logout]
  );
  return /* @__PURE__ */ jsx(AuthSessionContext.Provider, { value, children });
}
function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error("useAuthSession deve ser usado dentro de AuthSessionProvider");
  }
  return context;
}
export {
  AuthSessionProvider,
  useAuthSession
};
