import React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  state = { error: null }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, info: any) {
    console.error("[ErrorBoundary] erro:", error, info)

    const isDynamicImportError =
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("dynamically imported module") ||
      error?.message?.includes("Importing a module script failed");

    if (isDynamicImportError) {
      if (!sessionStorage.getItem('dynamicImportReloader_Main')) {
        sessionStorage.setItem('dynamicImportReloader_Main', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, background: "#fee", color: "#800" }}>
          <h1>Erro em runtime ⚠️</h1>
          <pre style={{ whiteSpace: "pre-wrap", overflow: "auto", maxHeight: 300 }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
