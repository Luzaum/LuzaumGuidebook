import React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  state = { error: null }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any) {
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
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#f8fafc", color: "#0f172a" }}>
          <div style={{ maxWidth: 480, textAlign: "center" }}>
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>Não foi possível carregar esta página</h1>
            <p style={{ marginTop: 12, color: "#475569", lineHeight: 1.6 }}>
              Recarregue a página para tentar novamente.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ marginTop: 20, border: 0, borderRadius: 8, background: "#0f766e", color: "#fff", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}
            >
              Recarregar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
