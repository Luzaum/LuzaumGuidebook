export type ImportEntityType = 'diseases' | 'medications';

export interface ImportValidationError {
    index: number;
    slug?: string;
    field?: string;
    message: string;
}

export interface ImportPreviewItem {
    index: number;
    slug: string;
    title: string;
    entityType: ImportEntityType;
    action: 'create' | 'update';
    warnings: string[];
    data: any; // O item já processado e pronto para o upsert
}

export interface ImportEnvelope<T> {
    type: ImportEntityType;
    version: number;
    items: T[];
}

export interface ImportResult {
    created: number;
    updated: number;
    failed: number;
    errors: ImportValidationError[];
}
