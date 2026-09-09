// src/routes/AuthCallback.tsx
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { jsx } from "react/jsx-runtime";
function AuthCallback() {
  const nav = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get("next") || "/app";
    return target.startsWith("/") ? target : "/app";
  }, [location.search]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!alive) return;
        if (data.session) {
          nav(nextPath, { replace: true });
        } else {
          nav("/login", { replace: true });
        }
      } catch {
        if (!alive) return;
        nav("/login", { replace: true });
      }
    })();
    return () => {
      alive = false;
    };
  }, [nav, nextPath]);
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: "Finalizando autentica\xE7\xE3o..." });
}
export {
  AuthCallback as default
};
