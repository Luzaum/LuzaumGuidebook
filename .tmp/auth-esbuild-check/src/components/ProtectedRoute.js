// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthSession } from "./AuthSessionProvider";
import { Fragment, jsx } from "react/jsx-runtime";
function ProtectedRoute({ children }) {
  const location = useLocation();
  const { loading, isAuthenticated } = useAuthSession();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "p-6", children: "Carregando..." });
  }
  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}${location.hash}`;
    return /* @__PURE__ */ jsx(Navigate, { to: `/login?next=${encodeURIComponent(nextPath)}`, replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
export {
  ProtectedRoute
};
