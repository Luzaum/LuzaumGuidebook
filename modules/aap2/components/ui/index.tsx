import React, { useEffect, useMemo, useRef } from 'react';
import { EXPLANATIONS } from '../../data/explanations';

export const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = dialogRef.current;
        if (!container) return;

        const focusable = container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
            focusable[0].focus();
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;

            const items = container.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (items.length === 0) return;

            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" ref={dialogRef} onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">x</button>
                {children}
            </div>
        </div>
    );
};

export const HelpButton: React.FC<{
    onClick: (e: React.MouseEvent) => void;
    className?: string;
}> = ({ onClick, className }) => (
    <button
        className={`help-btn ${className ?? ''}`}
        onClick={e => {
            e.stopPropagation();
            onClick(e);
        }}
        aria-label="Ver explicacao"
        type="button"
    >
        ?
    </button>
);

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
            if (!originalTerm) {
                return <React.Fragment key={i}>{part}</React.Fragment>;
            }
            return (
                <React.Fragment key={i}>
                    {part}
                    <HelpButton onClick={() => onHelpClick(originalTerm)} />
                </React.Fragment>
            );
        });
    }, [text, onHelpClick]);

    return <>{nodes}</>;
};

export const Loader: React.FC<{ label?: string }> = ({ label = 'Carregando...' }) => (
    <span className="loader-wrapper" role="status" aria-label={label}>
        <span className="loader-spinner" aria-hidden="true" />
        {label}
    </span>
);

export type SignificanceLevel = 'pathognomonic' | 'characteristic' | 'general';

export const SignificanceBadge: React.FC<{ level: SignificanceLevel; name: string }> = ({ level, name }) => (
    <span className={`significance-badge significance-badge--${level}`}>
        {name}
    </span>
);
