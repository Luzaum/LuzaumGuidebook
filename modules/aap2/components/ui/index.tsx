// ============================================================
// UI COMPONENTS — Componentes reutilizáveis de interface
// ============================================================

// --- Modal.tsx ---
// Overlay com foco preso e fechamento por ESC ou clique fora.

import React, { useEffect } from 'react';

export const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">×</button>
                {children}
            </div>
        </div>
    );
};

// --- HelpButton.tsx ---
// Botão "?" inline que abre modal de explicação fisiopatológica.

export const HelpButton: React.FC<{
    onClick: (e: React.MouseEvent) => void;
    className?: string;
}> = ({ onClick, className }) => (
    <button
        className={`help-btn ${className ?? ''}`}
        onClick={e => { e.stopPropagation(); onClick(e); }}
        aria-label="Ver explicação"
    >
        ?
    </button>
);

// --- EnrichedText.tsx ---
// Renderiza texto com botões de ajuda inline para termos do glossário.

import { useMemo } from 'react';
import { EXPLANATIONS } from '../../data/explanations';

export const EnrichedText: React.FC<{
    text: string;
    onHelpClick: (term: string) => void;
}> = ({ text, onHelpClick }) => {
    const nodes = useMemo(() => {
        if (typeof text !== 'string') return [text];

        const escapedKeys = Object.keys(EXPLANATIONS).map(k =>
            k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );
        const regex = new RegExp(`\\b(${escapedKeys.join('|')})\\b`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) => {
            const originalTerm = Object.keys(EXPLANATIONS).find(
                t => t.toLowerCase() === part.toLowerCase()
            );
            if (originalTerm) {
                return (
                    <React.Fragment key={i}>
                        {part}
                        <HelpButton onClick={() => onHelpClick(originalTerm)} />
                    </React.Fragment>
                );
            }
            return <React.Fragment key={i}>{part}</React.Fragment>;
        });
    }, [text, onHelpClick]);

    return <>{nodes}</>;
};

// --- Loader.tsx ---
// Spinner de carregamento acessível.

export const Loader: React.FC<{ label?: string }> = ({ label = 'Carregando...' }) => (
    <span className="loader-wrapper" role="status" aria-label={label}>
        <span className="loader-spinner" aria-hidden="true" />
        {label}
    </span>
);

// --- SignificanceBadge.tsx ---
// Badge colorido para nível de significância de sinal clínico.

export type SignificanceLevel = 'pathognomonic' | 'characteristic' | 'general';

const SIGNIFICANCE_LABELS: Record<SignificanceLevel, string> = {
    pathognomonic: 'Patognomônico',
    characteristic: 'Característico',
    general: 'Geral',
};

export const SignificanceBadge: React.FC<{ level: SignificanceLevel; name: string }> = ({ level, name }) => (
    <span className={`significance-badge significance-badge--${level}`}>
        {name}
    </span>
);
