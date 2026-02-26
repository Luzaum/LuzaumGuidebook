import { useEffect, useRef, useState, useCallback } from 'react';

type DraftKeyParts = {
    moduleKey: string;
    clinicId: string | null;
    userId: string | null;
};

function buildDraftKey({ moduleKey, clinicId, userId }: DraftKeyParts): string | null {
    if (!moduleKey) return null;
    const parts = [moduleKey];
    if (clinicId) parts.push(clinicId);
    if (userId) parts.push(userId);
    return `draft:${parts.join(':')}`;
}

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    return ((...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), ms);
    }) as T;
}

/**
 * A hook that persists draft state to localStorage with debounced saves.
 * 
 * @param moduleKey - Identifier for the module (e.g., 'catalogo', 'protocolos')
 * @param clinicId - Current clinic ID (optional, can be null)
 * @param userId - Current user ID (optional, can be null)
 * @param initialState - Initial state if no draft is saved
 * @returns [state, setState, clearDraft] tuple
 */
export function useLocalDraft<T>(
    moduleKey: string,
    clinicId: string | null,
    userId: string | null,
    initialState: T
): [T, (updater: T | ((prev: T) => T)) => void, () => void] {
    const [state, setState] = useState<T>(initialState);
    const keyRef = useRef<string | null>(null);

    // Update the key when moduleKey, clinicId, or userId changes
    useEffect(() => {
        keyRef.current = buildDraftKey({ moduleKey, clinicId, userId });
    }, [moduleKey, clinicId, userId]);

    // Load saved draft on mount and when key changes
    useEffect(() => {
        const key = keyRef.current;
        if (!key) return;
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                const parsed = JSON.parse(saved) as T;
                setState(parsed);
            }
        } catch (err) {
            console.warn(`[useLocalDraft] Failed to load draft from ${key}:`, err);
        }
    }, [keyRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

    // Debounced save function
    const saveDraft = useCallback(
        debounce((value: T) => {
            const key = keyRef.current;
            if (!key) return;
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (err) {
                console.warn(`[useLocalDraft] Failed to save draft to ${key}:`, err);
            }
        }, 750), // 750ms debounce (between 600‑900ms as requested)
        []
    );

    // Combined setState that also triggers debounced save
    const setStateAndSave = useCallback((updater: T | ((prev: T) => T)) => {
        setState((prev) => {
            const next = typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater;
            saveDraft(next);
            return next;
        });
    }, [saveDraft]);

    // Clear draft from localStorage and reset to initialState
    const clearDraft = useCallback(() => {
        const key = keyRef.current;
        if (key) {
            localStorage.removeItem(key);
        }
        setState(initialState);
    }, [initialState]);

    return [state, setStateAndSave, clearDraft];
}