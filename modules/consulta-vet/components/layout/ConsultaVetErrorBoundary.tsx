import React from 'react';
import { AlertTriangle } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ConsultaVetErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Consulta VET crashed', error);

    const isDynamicImportError =
      error instanceof Error &&
      (error.message.includes('Failed to fetch dynamically imported module') ||
        error.message.includes('dynamically imported module'));

    if (isDynamicImportError) {
      if (!sessionStorage.getItem('dynamicImportReloader_ConsultaVet')) {
        sessionStorage.setItem('dynamicImportReloader_ConsultaVet', 'true');
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
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
            O módulo foi protegido para evitar travar o app inteiro. Tente recarregar esta seção.
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
