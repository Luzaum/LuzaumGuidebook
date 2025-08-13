import React, { useCallback, useMemo } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

type Resolved = "light" | "dark";

function getSystemTheme(): Resolved {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Tema efetivo (quando em "system")
  const resolved: Resolved = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  // Clique único: alterna claro/escuro. Duplo clique: volta para "system".
  const handleClick = useCallback(() => {
    const next = resolved === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolved, setTheme]);

  const handleDoubleClick = useCallback(() => {
    setTheme("system");
  }, [setTheme]);

  const title = useMemo(() => {
    if (theme === "system") return "Seguindo o tema do sistema (duplo clique para alternar manualmente)";
    return resolved === "dark" ? "Tema escuro (clique para claro)" : "Tema claro (clique para escuro)";
  }, [theme, resolved]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      aria-label={title}
      title={title}
      className="relative h-9 w-9 rounded-lg border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/10 focus-visible:ring-primary"
    >
      {/* Ícone de estado atual */}
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      {/* Indicador de 'system' (aparece como um pequeno laptop no canto) */}
      {theme === "system" && (
        <Laptop className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-primary opacity-80" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}

export default ThemeToggle;

import React, { useCallback, useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const resolved = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = resolved === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolved, setTheme]);

  const label = resolved === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative border-primary/30 text-primary hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-primary"
    >
      <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
