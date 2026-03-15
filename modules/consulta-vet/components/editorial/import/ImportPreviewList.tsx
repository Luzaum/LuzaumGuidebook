import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImportPreviewItem } from '../../../types/import';

interface ImportPreviewListProps {
    items: ImportPreviewItem[];
}

export function ImportPreviewList({ items }: ImportPreviewListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    if (items.length === 0) return null;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Preview da Importação ({items.length} itens)</h3>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-border bg-card p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-xs text-muted-foreground">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-border bg-card p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <ul className="divide-y divide-border max-h-[500px] overflow-y-auto">
                    {paginatedItems.map((item, i) => (
                        <li
                            key={`${item.slug}-${i}`}
                            className="flex flex-col gap-2 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.action === 'create'
                                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                            }`}
                                    >
                                        {item.action === 'create' ? 'Novo' : 'Atualizar'}
                                    </span>
                                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                                </div>
                                <div className="mx-2 mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-mono">{item.slug}</span>
                                    <span className="h-1 w-1 rounded-full bg-border" />
                                    <span className="capitalize">{item.entityType === 'diseases' ? 'Doença' : 'Medicamento'}</span>
                                </div>

                                {item.warnings.length > 0 && (
                                    <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-2.5 py-1.5">
                                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-500" />
                                        <ul className="space-y-0.5 text-xs text-amber-700 dark:text-amber-400">
                                            {item.warnings.map((w, wIndex) => (
                                                <li key={wIndex}>{w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex shrink-0 items-center justify-end">
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
