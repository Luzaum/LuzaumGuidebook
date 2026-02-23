# Sincronização de Tema entre VETIUS e Apps Externos

Este documento explica como os apps externos (analgesiavet.netlify.app e emergências-vet.netlify.app) devem escutar mensagens do VETIUS para sincronizar o tema.

## Como funciona

O VETIUS envia mensagens via `postMessage` para os iframes quando:
1. O iframe carrega pela primeira vez
2. O usuário alterna o tema (dark/light) no VETIUS

## Implementação no App Externo

### Listener Padrão (15 linhas)

Adicione este código no seu app externo (preferencialmente no arquivo principal, como `main.tsx`, `App.tsx` ou `index.tsx`):

```typescript
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
```

### Versão com React (useEffect)

Se preferir usar React hooks:

```typescript
useEffect(() => {
  function applyTheme(theme: "dark" | "light") {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  // Tema inicial
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") applyTheme(saved);

  // Listener
  const handleMessage = (event: MessageEvent) => {
    if (!event?.data) return;
    if (event.data.type === "VETIUS_THEME") {
      const theme = event.data.theme;
      if (theme === "dark" || theme === "light") applyTheme(theme);
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);
```

## Versão Vanilla JavaScript (sem React)

Se seu app não usa React, adicione no HTML principal:

```javascript
<script>
  (function() {
    function handleMessage(event) {
      if (event.data?.type === 'VETIUS_THEME') {
        const { theme } = event.data
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        localStorage.setItem('theme', theme)
      }
    }

    window.addEventListener('message', handleMessage)

    // Enviar tema atual ao carregar (opcional)
    if (window.parent !== window) {
      const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      
      window.parent.postMessage(
        { type: 'IFRAME_THEME_REQUEST', theme: currentTheme },
        '*'
      )
    }
  })()
</script>
```

## Requisitos

1. **Tailwind CSS com dark mode via class**: Seu app deve usar `dark:` classes do Tailwind
2. **Configuração do Tailwind**: No `tailwind.config.js`, certifique-se de ter:
   ```js
   module.exports = {
     darkMode: 'class', // Importante: usar 'class', não 'media'
     // ... resto da config
   }
   ```

## Formato da Mensagem

O VETIUS envia mensagens no formato:

```typescript
{
  type: 'VETIUS_THEME',
  theme: 'dark' | 'light'
}
```

## Segurança

- O VETIUS envia mensagens apenas para a origem correta do iframe
- Os apps externos podem validar a origem se necessário
- Em produção, adicione validação de origem para maior segurança

## Testando

1. Abra o VETIUS com um módulo iframe
2. Altere o tema no VETIUS (botão de tema)
3. O iframe deve mudar o tema automaticamente

## Apps que precisam implementar

- ⏳ https://analgesiavet.netlify.app
- ⏳ https://emergências-vet.netlify.app
- ⏳ https://aapvet.netlify.app (Animais Peçonhentos)
- ⏳ https://antibioticoterapia.netlify.app
- ⏳ https://crivet.netlify.app

## Checklist de Compatibilidade

Antes de adicionar o listener, verifique:

- [ ] `tailwind.config.js` tem `darkMode: 'class'` (não `'media'`)
- [ ] O app usa classes `dark:` do Tailwind
- [ ] Teste: abrir no iframe do VETIUS e alternar tema
