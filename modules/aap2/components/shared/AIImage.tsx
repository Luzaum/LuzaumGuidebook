import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchAIImage, buildImagePrompt } from '../../services/aiService';
import { useImageCache } from '../../hooks/useImageCache';
import { ALL_ANIMALS } from '../../data/animals';

const ENABLE_AI_IMAGE = true;

interface AIImageProps {
    animalId: string;
    animalName: string;
    imagePrompt: string;
    staticImagePath?: string;
    className?: string;
}

export const AIImage: React.FC<AIImageProps> = ({
    animalId,
    animalName,
    imagePrompt,
    staticImagePath,
    className = '',
}) => {
    const { getImage, setImage } = useImageCache();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [staticFailed, setStaticFailed] = useState(false);
    const hasFetched = useRef(false);

    const resolvedStaticUrl = useMemo(() => staticImagePath, [staticImagePath]);

    const animalMeta = useMemo(() => ALL_ANIMALS.find(a => a.id === animalId), [animalId]);
    const fullPrompt = useMemo(() => {
        if (!animalMeta?.identification || !imagePrompt) return '';
        return buildImagePrompt(animalName, imagePrompt, animalMeta.identification);
    }, [animalMeta, animalName, imagePrompt]);

    useEffect(() => {
        if (resolvedStaticUrl && !staticFailed) return;
        if (!ENABLE_AI_IMAGE || !fullPrompt) return;
        if (hasFetched.current) return;

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
                setError(e.message || 'Falha ao gerar imagem.');
            })
            .finally(() => setIsLoading(false));
    }, [animalName, fullPrompt, getImage, setImage, resolvedStaticUrl, staticFailed]);

    const finalUrl = resolvedStaticUrl && !staticFailed ? resolvedStaticUrl : imageUrl;

    if (finalUrl) {
        return (
            <div className="ai-image-container">
                <img
                    src={finalUrl}
                    alt={`Fotografia de ${animalName}`}
                    className={`ai-image ${className}`}
                    loading="lazy"
                    decoding="async"
                    onError={e => {
                        if (resolvedStaticUrl) {
                            setStaticFailed(true);
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
                <span className="ai-image-unavailable">Imagem nao disponivel</span>
            )}
        </div>
    );
};
