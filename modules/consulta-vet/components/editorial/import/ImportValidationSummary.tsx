import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ImportValidationError } from '../../../types/import';

interface ImportValidationSummaryProps {
    validCount: number;
    invalidCount: number;
    errors: ImportValidationError[];
}

export function ImportValidationSummary({ validCount, invalidCount, errors }: ImportValidationSummaryProps) {
    const total = validCount + invalidCount;
    const hasErrors = invalidCount > 0;

    return (
        <div className={`rounded-2xl border p-4 sm:p-5 ${hasErrors ? 'border-destructive/30 bg-destructive/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
            <div className="flex items-start gap-4">
                <div className={`mt-0.5 shrink-0 rounded-full p-1.5 ${hasErrors ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {hasErrors ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div className="flex-1 space-y-1">
                    <h4 className={`text-sm font-semibold ${hasErrors ? 'text-destructive' : 'text-emerald-700 dark:text-emerald-400'}`}>
                        {hasErrors ? 'Atenção: Há registros inválidos' : 'Validação concluída com sucesso!'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {total} itens encontrados no JSON. {validCount} válidos e {invalidCount} com erros.
                    </p>

                    {errors.length > 0 && (
                        <div className="mt-4 max-h-[300px] overflow-y-auto rounded-xl border border-destructive/20 bg-background/50 p-3">
                            <ul className="space-y-2 text-xs">
                                {errors.map((err, i) => (
                                    <li key={i} className="flex items-baseline gap-2 text-destructive">
                                        <span className="font-mono text-[10px] text-destructive/70">
                                            [Item {err.index}]
                                        </span>
                                        <span className="font-semibold">{err.field ? `${err.field}:` : ''}</span>
                                        <span>{err.message}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
