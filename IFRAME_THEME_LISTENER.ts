/**
 * LISTENER PADRÃO PARA APPS EXTERNOS
 * 
 * Copie e cole este código no arquivo principal do seu app externo
 * (ex.: main.tsx, App.tsx, index.tsx)
 * 
 * Requisitos:
 * - Tailwind configurado com darkMode: 'class'
 * - App usa classes dark: do Tailwind
 */

// Função para aplicar tema
function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

// Tema inicial pelo localStorage (opcional)
const saved = localStorage.getItem("theme");
if (saved === "dark" || saved === "light") applyTheme(saved);

// Listener para mensagens do VETIUS
window.addEventListener("message", (event) => {
  if (!event?.data) return;
  if (event.data.type === "VETIUS_THEME") {
    const theme = event.data.theme;
    if (theme === "dark" || theme === "light") applyTheme(theme);
  }
});
