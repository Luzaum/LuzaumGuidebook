
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
