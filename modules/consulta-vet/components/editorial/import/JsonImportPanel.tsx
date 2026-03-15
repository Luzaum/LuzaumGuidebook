import React, { useRef, useState } from 'react';
import { Download, FileJson, Upload } from 'lucide-react';

interface JsonImportPanelProps {
    onValidate: (jsonString: string) => void;
    isLoading: boolean;
    exampleUrl: string;
}

export function JsonImportPanel({ onValidate, isLoading, exampleUrl }: JsonImportPanelProps) {
    const [rawJson, setRawJson] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const content = ev.target?.result as string;
            setRawJson(content);
            onValidate(content);
        };
        reader.readAsText(file);

        // Clear the input so the same file can be uploaded again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onValidate(rawJson);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                    Cole o conteúdo JSON abaixo ou faça upload de um arquivo <code>.json</code>.
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
                        Baixar modelo JSON
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
                            Upload .json
                        </button>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={rawJson}
                    onChange={(e) => setRawJson(e.target.value)}
                    placeholder="[{&#10;  &quot;slug&quot;: &quot;...&quot;,&#10;  &quot;title&quot;: &quot;...&quot;&#10;}]"
                    className="h-64 w-full cursor-text resize-y rounded-2xl border border-border bg-muted/20 p-4 font-mono text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    spellCheck={false}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!rawJson.trim() || isLoading}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FileJson className="h-4 w-4" />
                        {isLoading ? 'Validando...' : 'Validar JSON'}
                    </button>
                </div>
            </form>
        </div>
    );
}
