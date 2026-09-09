// src/routes/Login.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TravelConnectSignIn from "@/components/ui/travel-connect-signin";
import { getSession, signIn } from "../lib/auth";
import { jsx } from "react/jsx-runtime";
function normalizeTargetPath(value) {
  const target = String(value || "").trim();
  if (!target) return null;
  if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/login")) return "/hub";
  return target;
}
function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const queryTarget = normalizeTargetPath(params.get("next"));
    const stateTarget = typeof location.state?.from === "string" ? normalizeTargetPath(location.state.from) : null;
    return queryTarget ?? stateTarget ?? "/hub";
  }, [location.search, location.state]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawError = params.get("error_description") || params.get("error");
    if (rawError) {
      setError(decodeURIComponent(rawError));
    }
  }, [location.search]);
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
    setError("");
    try {
      await signIn(payload.email, payload.password);
      nav(nextPath, { replace: true });
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : "";
      const message = /invalid login credentials/i.test(rawMessage) ? "Usu\xE1rio ou senha incorretos." : rawMessage || "Falha ao entrar.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }
  if (checkingSession) {
    return /* @__PURE__ */ jsx("div", { className: "p-6", children: "Carregando autenticacao..." });
  }
  return /* @__PURE__ */ jsx(
    TravelConnectSignIn,
    {
      mode: "login",
      loading,
      errorMessage: error,
      onSubmit: handleSubmit,
      restrictedAccess: true,
      onBackToVetius: () => nav("/")
    }
  );
}
export {
  Login as default
};
