import './index.css'
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./src/ErrorBoundary";

console.log("[CRITICAL] index.tsx evaluation started")

try {
  console.log("[BOOT] index.tsx carregou")

  const rootElement = document.getElementById("root");
  console.log("[BOOT] root element =", rootElement)

  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = createRoot(rootElement);
  console.log("[BOOT] React root criado");
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log("[BOOT] App renderizado");
} catch (e) {
  console.error("[FATAL] Erro no index.tsx:", e);
  if (typeof document !== 'undefined') {
    document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h1>Fatal Error: ${e}</h1>
      <pre>${e instanceof Error ? e.stack : String(e)}</pre>
    </div>`;
  }
}
