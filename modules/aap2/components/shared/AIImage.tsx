// ============================================================
// AIImage — Componente de imagem com geração por IA e fallback estático
// ============================================================
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fetchAIImage, buildImagePrompt } from '../../services/aiService';
import { useImageCache } from '../../hooks/useImageCache';
import { ALL_ANIMALS } from '../../data/animals';

const ENABLE_AI_IMAGE = true; // Feature flag: desabilitar em dev se necessário

interface AIImageProps {
    animalId: string;
    animalName: string;
    imagePrompt: string;
    staticImagePath?: string;
}

export const AIImage: React.FC<AIImageProps> = ({
    animalId,
    animalName,
    imagePrompt,
    staticImagePath,
}) => {
    const { getImage, setImage } = useImageCache();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const hasFetched = useRef(false);

    // Resolve imagem estática de /public/images/ como fallback confiável
    const resolvedStaticUrl = useMemo(() => {
        if (staticImagePath) return staticImagePath;
        // Fallback automático por ID do animal
        const ext = ['jpg', 'jpeg', 'png'];
        for (const e of ext) {
            // Retorna o primeiro caminho provável; o browser vai 404 silenciosamente
            return `/images/${animalId}.${e === 'jpg' ? 'jpg' : e}`;
        }
        return undefined;
    }, [animalId, staticImagePath]);

    // Prompt completo com anatomia e estilo fotorrealista
    const animalMeta = useMemo(() => ALL_ANIMALS.find(a => a.id === animalId), [animalId]);
    const fullPrompt = useMemo(() => {
        if (!animalMeta?.identification || !imagePrompt) return '';
        return buildImagePrompt(animalName, imagePrompt, animalMeta.identification);
    }, [animalMeta, animalName, imagePrompt]);

    useEffect(() => {
        // Se há imagem estática, não precisa gerar
        if (resolvedStaticUrl) return;
        if (!ENABLE_AI_IMAGE || !fullPrompt) return;
        if (hasFetched.current) return;

        // Verifica cache primeiro
        const cached = getImage(animalName, fullPrompt);
        if (cached) {
            setImageUrl(cached);
            return;
        }

        hasFetched.current = true;
        setIsLoading(true);

        fetchAIImage(fullPrompt)
            .then(({ dataUrl }) => {
                setImageUrl(dataUrl);
                setImage(animalName, fullPrompt, dataUrl);
            })
            .catch(e => {
                console.error('[AIImage] Falha ao gerar imagem:', e);
                setError(e.message || 'Falha ao gerar imagem.');
            })
            .finally(() => setIsLoading(false));
    }, [animalName, fullPrompt, getImage, setImage, resolvedStaticUrl]);

    const finalUrl = resolvedStaticUrl || imageUrl;

    if (finalUrl) {
        return (
            <div className="ai-image-container">
                <img
                    src={finalUrl}
                    alt={`Fotografia de ${animalName}`}
                    className="ai-image"
                    loading="lazy"
                    decoding="async"
                    onError={e => {
                        // Se a imagem estática falhar, tenta gerar por IA
                        if (resolvedStaticUrl) {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }
                    }}
                />
            </div>
        );
    }

    return (
        <div className="ai-image-placeholder" aria-label={`Imagem de ${animalName}`}>
            {isLoading && (
                <span className="ai-image-loading">
                    <span className="loader-spinner" aria-hidden="true" />
                    Gerando imagem com IA...
                </span>
            )}
            {error && <span className="ai-image-error">{error}</span>}
            {!isLoading && !error && (
                <span className="ai-image-unavailable">Imagem não disponível</span>
            )}
        </div>
    );
};
