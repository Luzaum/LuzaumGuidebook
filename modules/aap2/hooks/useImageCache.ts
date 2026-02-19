// ============================================================
// useImageCache — Hook para cache de imagens geradas por IA
// Persiste em localStorage com TTL de 7 dias.
// ============================================================
import { useState, useCallback } from 'react';
import type { ImageCacheEntry } from '../types';

const CACHE_VERSION = 'v4';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

function makeCacheKey(animalName: string, promptHash: number): string {
    // Prefixo namespace para evitar conflitos no Vetius
    return `vetius:aap2:img:${CACHE_VERSION}:${animalName}:${promptHash}`;
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

function readFromStorage(key: string): string | null {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const entry: ImageCacheEntry = JSON.parse(raw);
        if (Date.now() - entry.timestamp > MAX_AGE_MS) {
            localStorage.removeItem(key);
            return null;
        }
        return entry.dataUrl;
    } catch {
        return null;
    }
}

function writeToStorage(key: string, dataUrl: string): void {
    try {
        const entry: ImageCacheEntry = { dataUrl, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(entry));
    } catch {
        // localStorage pode estar cheio; ignora silenciosamente
    }
}

export interface UseImageCacheReturn {
    /** Busca imagem do cache em memória ou localStorage. Retorna null se não encontrada. */
    getImage: (animalName: string, prompt: string) => string | null;
    /** Salva imagem no cache em memória e localStorage. */
    setImage: (animalName: string, prompt: string, dataUrl: string) => void;
}

export function useImageCache(): UseImageCacheReturn {
    // Cache em memória para evitar re-leituras do localStorage
    const [memCache, setMemCache] = useState<Map<string, string>>(new Map());

    const getImage = useCallback((animalName: string, prompt: string): string | null => {
        const key = makeCacheKey(animalName, hashString(prompt));

        // 1. Verifica cache em memória
        if (memCache.has(key)) return memCache.get(key)!;

        // 2. Verifica localStorage
        const stored = readFromStorage(key);
        if (stored) {
            setMemCache(prev => new Map(prev).set(key, stored));
            return stored;
        }

        return null;
    }, [memCache]);

    const setImage = useCallback((animalName: string, prompt: string, dataUrl: string): void => {
        const key = makeCacheKey(animalName, hashString(prompt));
        setMemCache(prev => new Map(prev).set(key, dataUrl));
        writeToStorage(key, dataUrl);
    }, []);

    return { getImage, setImage };
}
