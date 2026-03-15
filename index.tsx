
import './index.css'
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./src/ErrorBoundary";

console.log("[BOOT] index.tsx carregou")

const rootElement = document.getElementById("root");
console.log("[BOOT] root element =", rootElement)

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite preload error (missing chunk), reloading page...', event);
  if (!sessionStorage.getItem('dynamicImportReloader_VitePreload')) {
    sessionStorage.setItem('dynamicImportReloader_VitePreload', 'true');
    window.location.reload();
  }
});

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
