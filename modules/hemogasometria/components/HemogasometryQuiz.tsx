import React from 'react';
import { QuizCase } from '../types/hemoTypes';

interface Props {
    quizCase: QuizCase;
    userAnswers: any;
    setUserAnswers: any;
    quizSubmitted: boolean;
    onSubmit: (e: any) => void;
    onNewCase: () => void;
    onOpenModal: (key: string) => void;
}

export const HemogasometryQuiz: React.FC<Props> = ({ quizCase, onNewCase, onSubmit }) => {
    return (
        <div className="p-8 text-center bg-white/40 dark:bg-slate-900/40 rounded-2xl shadow-xl mt-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Modo Quiz (Em Desenvolvimento)</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{quizCase.description}</p>
            <button onClick={onNewCase} className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 font-bold">
                Gerar Novo Caso
            </button>
        </div>
    );
};
