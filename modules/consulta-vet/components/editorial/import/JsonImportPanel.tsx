import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';

interface JsonImportPanelProps {
    onValidate: (jsonString: string) => void;
    isLoading: boolean;
    exampleUrl: string;
}

export function JsonImportPanel({ onValidate, isLoading, exampleUrl }: JsonImportPanelProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const content = ev.target?.result as string;
            onValidate(content);
        };
        reader.readAsText(file);

        // Clear the input so the same file can be uploaded again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                    Selecione um arquivo de importação para validar o conteúdo antes de salvar.
                </p>
                <div className="flex gap-3">
                    <a
                        href={exampleUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                        <Download className="h-4 w-4" />
                        Baixar modelo de importação
                    </a>

                    <div>
                        <input
                            type="file"
                            accept=".json,application/json"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                        >
                            <Upload className="h-4 w-4" />
                            {isLoading ? 'Validando...' : 'Selecionar arquivo'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
