// src/routes/Signup.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TravelConnectSignIn from "@/components/ui/travel-connect-signin";
import { getSession, signInWithGoogle, signUp } from "../lib/auth";
import { jsx } from "react/jsx-runtime";
function normalizeTargetPath(value) {
  const target = String(value || "").trim();
  if (!target) return null;
  if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/signup")) return "/hub";
  return target;
}
function Signup() {
  const nav = useNavigate();
  const location = useLocation();
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const queryTarget = normalizeTargetPath(params.get("next"));
    const stateTarget = typeof location.state?.from === "string" ? normalizeTargetPath(location.state.from) : null;
    return queryTarget ?? stateTarget ?? "/hub";
  }, [location.search, location.state]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const session = await getSession();
        if (!alive) return;
        if (session) {
          nav(nextPath, { replace: true });
          return;
        }
      } catch {
      } finally {
        if (alive) {
          setCheckingSession(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [nav, nextPath]);
  async function handleSubmit(payload) {
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      await signUp(payload.email, payload.password);
      setMsg("Conta criada! Verifique seu e-mail para confirmar o acesso.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao criar conta.";
      setErr(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }
  async function handleGoogleSignIn() {
    setErr("");
    setMsg("");
    await signInWithGoogle(nextPath);
  }
  if (checkingSession) {
    return /* @__PURE__ */ jsx("div", { className: "p-6", children: "Carregando autenticacao..." });
  }
  return /* @__PURE__ */ jsx(
    TravelConnectSignIn,
    {
      mode: "signup",
      loading,
      errorMessage: err,
      successMessage: msg,
      onSubmit: handleSubmit,
      onGoogleSignIn: handleGoogleSignIn,
      onGoToLogin: () => nav(`/login?next=${encodeURIComponent(nextPath)}`),
      onBackToVetius: () => nav("/")
    }
  );
}
export {
  Signup as default
};
