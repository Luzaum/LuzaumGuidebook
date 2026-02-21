import React from 'react';

interface ModalProps {
    content: {
        title: string;
        content: string;
    } | null;
    onClose: () => void;
}

export const Modal = React.memo(function Modal({ content, onClose }: ModalProps) {
    if (!content) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-foreground mb-4">{content.title}</h3>
                <div className="text-muted-foreground space-y-4" dangerouslySetInnerHTML={{ __html: content.content }} />
                <button onClick={onClose} className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Fechar</button>
            </div>
        </div>
    );
});
