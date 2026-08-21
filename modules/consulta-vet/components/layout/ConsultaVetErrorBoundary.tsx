import React from 'react';
import { AlertTriangle } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  isDynamicImportError: boolean;
};

export class ConsultaVetErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, isDynamicImportError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true, isDynamicImportError: false };
  }

  componentDidCatch(error: unknown) {
    const message = error instanceof Error ? error.message : String(error || '');
    const isDynamicImportError = /dynamically imported module|loading chunk|chunkloaderror|importing a module script failed/i.test(message);

    if (isDynamicImportError) {
      this.setState({ isDynamicImportError: true });
      const lastReload = Number(sessionStorage.getItem('dynamicImportReloader_ConsultaVet') || 0);
      if (!Number.isFinite(lastReload) || Date.now() - lastReload > 30_000) {
        sessionStorage.setItem('dynamicImportReloader_ConsultaVet', String(Date.now()));
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    if (this.state.isDynamicImportError) {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, isDynamicImportError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="mx-auto flex h-full w-full max-w-[900px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm md:p-8">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-amber-600 dark:text-amber-400" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">Não foi possível abrir esta tela</h2>
          <p className="mx-auto mb-6 max-w-[600px] text-sm text-muted-foreground">
            O conteúdo não pôde ser carregado. Tente novamente.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }
}
