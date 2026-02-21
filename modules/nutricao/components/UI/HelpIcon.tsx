import React from 'react';
import { knowledgeBase } from '../../data/nutritionKnowledge';

interface HelpIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    term: string;
    onOpenModal: (content: any) => void;
}

export const HelpIcon = React.memo(function HelpIcon({ term, onOpenModal, ...props }: HelpIconProps) {
    return (
        <span
            className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-bold text-white dark:text-gray-900 bg-indigo-600 dark:bg-indigo-300 rounded-full cursor-pointer transition-colors hover:bg-indigo-700 dark:hover:bg-indigo-400 shrink-0"
            role="button"
            aria-label="Abrir guia"
            onClick={(e) => { e.stopPropagation(); onOpenModal(knowledgeBase[term]); }}
            {...props}
        >?</span>
    );
});
