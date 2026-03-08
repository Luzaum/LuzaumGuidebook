import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Species, PainType, Scale, Question, Option, QuestionType, Drug, Presentation, AgeGroup, Comorbidity } from './types';
import { PAIN_DATA, DRUG_DATA } from './constants';
import { PawIcon, GuideIcon, CalculatorIcon } from './components/Icons';
import { Menu, X, Home, Stethoscope, ListChecks, ClipboardCheck, BarChart3, BookOpenCheck, ShieldCheck, Calculator, Moon, Sun, Dog, Cat } from 'lucide-react';
import './theme.css';


type Screen = 'home' | 'painType' | 'scaleSelect' | 'assessment' | 'results' | 'guide' | 'clinicalGuidelines' | 'calculator';

const SCREEN_TITLES: Record<Screen, string> = {
    home: 'Início',
    painType: 'Cenário',
    scaleSelect: 'Escalas',
    assessment: 'Avaliação',
    results: 'Resultados',
    guide: 'Guias',
    clinicalGuidelines: 'Diretrizes',
    calculator: 'Calculadora',
};

const SCREEN_ICONS: Record<Screen, React.ComponentType<{ className?: string }>> = {
    home: Home,
    painType: Stethoscope,
    scaleSelect: ListChecks,
    assessment: ClipboardCheck,
    results: BarChart3,
    guide: BookOpenCheck,
    clinicalGuidelines: ShieldCheck,
    calculator: Calculator,
};

// Helper Components defined outside the main App component
const Header = ({ title, onBack, onHome }: { title: string; onBack?: () => void; onHome?: () => void; }) => (
    <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
            {onBack && <button onClick={onBack} className="text-slate-700 hover:text-slate-900 mr-4 p-2 rounded-full hover:bg-slate-100 font-semibold">&larr; Voltar</button>}
            <PawIcon className="h-8 w-8 text-teal-600 mr-3" />
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        </div>
        {onHome && <button onClick={onHome} className="text-slate-700 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 font-semibold">Início</button>}
    </header>
);

const Card = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
        {children}
    </div>
);

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
                    <h2 id="modal-title" className="text-xl font-bold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 font-bold text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100" aria-label="Fechar">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};


// Screen Components
interface HomeScreenProps {
    onSelectSpecies: (species: Species) => void;
    onShowGuide: () => void;
    onShowClinicalGuidelines: () => void;
    onShowCalculator: () => void;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectSpecies, onShowGuide, onShowClinicalGuidelines, onShowCalculator }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Analgesia e controle de dor veterinária</h1>
            <p className="text-slate-600 mt-2 text-lg">Avaliação e Manejo da Dor em Cães e Gatos</p>
        </div>
        <div className="w-full max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Comece por aqui</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onClick={() => onSelectSpecies(Species.Dog)} className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48">
                    <Dog className="h-14 w-14 mb-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-2xl font-semibold text-slate-800">Cão</span>
                </button>
                <button onClick={() => onSelectSpecies(Species.Cat)} className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48">
                    <Cat className="h-14 w-14 mb-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-2xl font-semibold text-slate-800">Gato</span>
                </button>
            </div>
             <div className="mt-8 flex flex-col space-y-4">
                <button onClick={onShowCalculator} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                    <CalculatorIcon className="h-6 w-6" />
                    <span>Calculadora de Doses</span>
                </button>
                <button onClick={onShowGuide} className="w-full bg-white text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                    <GuideIcon className="h-6 w-6 text-teal-600" />
                    <span>Guias de Manejo da Dor</span>
                </button>
                <button onClick={onShowClinicalGuidelines} className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors">
                    Diretrizes Clínicas de Manejo da Dor
                </button>
            </div>
        </div>
    </div>
);


interface PainTypeScreenProps {
    species: Species;
    onSelectPainType: (painType: PainType) => void;
    onBack: () => void;
}
const PainTypeScreen: React.FC<PainTypeScreenProps> = ({ species, onSelectPainType, onBack }) => (
    <>
        <Header title={`Espécie: ${species === Species.Dog ? 'Cão' : 'Gato'}`} onBack={onBack} onHome={onBack} />
        <main className="p-4 md:p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Selecione o Cenário</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <button onClick={() => onSelectPainType(PainType.Acute)} className="p-8 w-full h-full text-left flex flex-col">
                        <h3 className="text-2xl font-bold text-teal-700">Dor Aguda (Uso Clínico)</h3>
                        <p className="text-slate-600 mt-2 flex-grow">Para avaliação hospitalar pela equipe veterinária (pós-operatório, trauma). Foco em intervenção imediata.</p>
                    </button>
                </Card>
                <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <button onClick={() => onSelectPainType(PainType.Chronic)} className="p-8 w-full h-full text-left flex flex-col">
                        <h3 className="text-2xl font-bold text-teal-700">Dor Crônica (Uso pelo Tutor)</h3>
                        <p className="text-slate-600 mt-2 flex-grow">Para monitoramento em casa pelo tutor (osteoartrite, etc.). Foco no impacto na qualidade de vida ao longo do tempo.</p>
                    </button>
                </Card>
            </div>
        </main>
    </>
);

interface ScaleSelectionScreenProps {
    species: Species;
    painType: PainType;
    onSelectScale: (scale: Scale) => void;
    onShowDetails: (scale: Scale) => void;
    onBack: () => void;
}
const ScaleSelectionScreen: React.FC<ScaleSelectionScreenProps> = ({ species, painType, onSelectScale, onShowDetails, onBack }) => {
    const scales = PAIN_DATA[species]?.[painType]?.scales || [];
    return (
        <>
            <Header title={`Tipo de Dor: ${painType === PainType.Acute ? 'Aguda' : 'Crônica'}`} onBack={onBack} onHome={onBack}/>
            <main className="p-4 md:p-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Selecione a Escala de Avaliação</h2>
                <div className="max-w-5xl mx-auto space-y-4">
                    {scales.map(scale => (
                        <Card key={scale.id} className={`transition-all duration-300 border-2 ${scale.questions.length > 0 ? 'border-transparent hover:shadow-xl hover:border-teal-500' : 'border-dashed border-slate-300 bg-slate-50'}`}>
                            <button onClick={() => onSelectScale(scale)} className="p-6 text-left w-full" disabled={scale.questions.length === 0}>
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="text-xl font-bold text-slate-800 flex-grow">{scale.name}</h3>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                      {scale.recommended && <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-1 rounded-full">Recomendada</span>}
                                      {scale.details && (
                                          <div
                                              onClick={(e) => { e.stopPropagation(); onShowDetails(scale); }}
                                              className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-teal-200 hover:text-teal-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                                              aria-label={`Mais informações sobre ${scale.name}`}
                                              role="button"
                                          >
                                              ?
                                          </div>
                                      )}
                                    </div>
                                </div>
                                {scale.description && <p className="text-slate-600 mt-2 text-sm">{scale.description}</p>}
                                 {scale.questions.length === 0 && <p className="text-sm text-red-600 mt-2 font-semibold">Esta escala é apenas informativa e não está disponível para avaliação direta.</p>}
                            </button>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
};

// Generic component for image-based radio button questions (FGS)
const ImageBasedQuestion = ({ question, value, onChange }: { question: Question, value: number | undefined, onChange: (value: number) => void }) => {
    const options = question.options || [];

    return (
        <div className="avaliacao-container text-center">
            <h4 className="font-semibold text-slate-800 mb-4 text-lg">{question.text}</h4>
            {question.compositeImageUrl && (
                <img 
                    src={question.compositeImageUrl} 
                    alt={`Guia visual para ${question.text.toLowerCase()}`} 
                    className="w-full rounded-lg shadow-md mb-4"
                />
            )}
            <div className="opcoes-escolha grid grid-cols-3 gap-2 mt-4" role="radiogroup">
                {options.map(option => (
                    <button
                        key={option.score}
                        onClick={() => onChange(option.score)}
                        role="radio"
                        aria-checked={value === option.score}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${value === option.score ? 'bg-teal-600 border-teal-700 text-white font-bold shadow-inner' : 'bg-white border-slate-300 hover:border-teal-400 text-slate-700'}`}
                    >
                        {option.imageUrl ? <img src={option.imageUrl} alt={`Opção ${option.score}`} className="h-20 w-auto mx-auto rounded-md" /> : `Escore ${option.score}`}
                    </button>
                ))}
            </div>
            {value !== undefined && options.find(o => o.score === value) && (
                <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-left">
                     <p><span className="font-bold">Descrição (Escore {value}):</span> {options.find(o => o.score === value)?.text}</p>
                </div>
            )}
        </div>
    );
};

// Component for the CSU-CAP holistic scale
const CSUCAPQuestion = ({ question, value, onChange }: { question: Question, value: number | undefined, onChange: (value: number) => void }) => {
    return (
        <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-lg">{question.text}</h4>
            {question.compositeImageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                    <img 
                        src={question.compositeImageUrl} 
                        alt={`Guia visual para ${question.text}`} 
                        className="w-full h-auto"
                    />
                </div>
            )}
            <div className="space-y-4">
                {(question.options || []).map(option => (
                    <button
                        key={option.score}
                        onClick={() => onChange(option.score)}
                        className={`w-full text-left p-4 rounded-lg border-2 flex items-start gap-4 transition-all duration-200 ${value === option.score ? 'bg-teal-50 border-teal-500 shadow-lg' : 'bg-white border-slate-300 hover:border-teal-400'}`}
                    >
                        {option.imageUrl && <img src={option.imageUrl} alt={`Ilustração para escore ${option.score}`} className="w-24 h-24 rounded-md object-cover flex-shrink-0" />}
                        <div className="flex-grow">
                            <p className="font-bold text-teal-800">Escore {option.score}</p>
                            <p className="text-slate-700 text-sm">{option.text}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const CMPSFAssessment = ({ scale, answers, onAnswerChange, onSubmit, isComplete }: {
    scale: Scale;
    answers: Record<string, number | string>;
    onAnswerChange: (questionId: string, value: number) => void;
    onSubmit: () => void;
    isComplete: boolean;
}) => {
    const totalScore = useMemo(() => 
        Object.values(answers).reduce((sum: number, val) => sum + Number(val || 0), 0),
        [answers]
    );

    return (
        <main className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Card className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Avaliação de Dor Aguda em Cães (Escala de Glasgow)</h2>
                    <img 
                        src="https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-glasgow/caes"
                        alt="Escala de Dor Composta de Glasgow (CMPS-SF) para avaliação de dor em cães"
                        className="w-full rounded-lg shadow-md mb-8"
                    />
                    
                    <form>
                        <div className="space-y-8">
                            {scale.questions.map(question => (
                                <fieldset key={question.id}>
                                    <legend className="font-bold text-lg text-slate-800 mb-3">{question.text}</legend>
                                    <div className="space-y-2">
                                        {question.options?.map(option => (
                                            <label key={option.score} className="flex items-center p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200 transition-colors">
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    value={option.score}
                                                    checked={answers[question.id] === option.score}
                                                    onChange={() => onAnswerChange(question.id, option.score)}
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
                                                />
                                                <span className="ml-3 text-slate-700"><span className="font-bold">{option.score}:</span> {option.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            ))}
                        </div>
                    </form>

                    <div className="pt-6 border-t mt-8 text-center">
                        <h3 className="text-xl font-bold">Resultado da Avaliação</h3>
                        <p className="text-3xl font-bold my-2">
                            Escore Total: <span id="escore-final-glasgow" className="text-teal-600">{totalScore}</span>
                        </p>
                        <p className="p-3 bg-amber-100 text-amber-800 rounded-md">
                            Lembrete: Escore total ≥ 5/18 (ou ≥ 6/24 na forma longa) indica necessidade de resgate analgésico.
                        </p>
                    </div>
                </Card>
                
                <div className="flex justify-end mt-8">
                    <button
                        onClick={onSubmit}
                        disabled={!isComplete}
                        className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Salvar Avaliação
                    </button>
                </div>
            </div>
        </main>
    );
};


const UCAPSAssessment = ({ scale, answers, onAnswerChange, onSubmit, isComplete }: {
    scale: Scale;
    answers: Record<string, number | string>;
    onAnswerChange: (questionId: string, value: number) => void;
    onSubmit: () => void;
    isComplete: boolean;
}) => {
    const totalScore = useMemo(() => 
        Object.values(answers).reduce((sum: number, val) => sum + Number(val || 0), 0),
        [answers]
    );

    return (
        <main className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Card className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Avaliação de Dor Aguda em Gatos (Escala UNESP-Botucatu)</h2>
                    
                    {scale.compositeImageUrl && (
                        <img 
                            src={scale.compositeImageUrl} 
                            alt="Escala Curta de Dor Multidimensional da UNESP-Botucatu para gatos"
                            className="w-full rounded-lg shadow-md mb-8"
                        />
                    )}
                    
                    <form>
                        <div className="space-y-8">
                            {scale.questions.map(question => (
                                <fieldset key={question.id}>
                                    <legend className="font-bold text-lg text-slate-800 mb-3">{question.text}</legend>
                                    <div className="space-y-2">
                                        {question.options?.map(option => (
                                            <label key={option.score} className="flex items-center p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200 transition-colors">
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    value={option.score}
                                                    checked={answers[question.id] === option.score}
                                                    onChange={() => onAnswerChange(question.id, option.score)}
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
                                                />
                                                <span className="ml-3 text-slate-700">{option.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            ))}
                        </div>
                    </form>

                    <div className="pt-6 border-t mt-8 text-center">
                        <h3 className="text-xl font-bold">Resultado da Avaliação</h3>
                        <p className="text-3xl font-bold my-2">
                            Escore Total: <span id="escore-final" className="text-teal-600">{totalScore}</span>
                        </p>
                        <p className="p-3 bg-amber-100 text-amber-800 rounded-md">
                            Lembrete: Escore total ≥ 4 indica necessidade de resgate analgésico.
                        </p>
                    </div>
                </Card>
                
                <div className="flex justify-end mt-8">
                    <button
                        onClick={onSubmit}
                        disabled={!isComplete}
                        className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Salvar Avaliação
                    </button>
                </div>
            </div>
        </main>
    );
};

interface AssessmentScreenProps {
    scale: Scale;
    onSubmit: (answers: Record<string, number | string>) => void;
    onBack: () => void;
}
const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ scale, onSubmit, onBack }) => {
    const [answers, setAnswers] = useState<Record<string, number | string>>(() => {
        // Initialize sliders to their minimum value to avoid them being undefined
        const initialAnswers: Record<string, number | string> = {};
        scale.questions.forEach(q => {
            if (q.type === QuestionType.Slider) {
                initialAnswers[q.id] = q.min ?? 0;
            }
        });
        return initialAnswers;
    });

    const handleAnswerChange = (questionId: string, value: number | string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };
    
    const isComplete = useMemo(() => {
        if (scale.id === 'csom') {
            const name1 = answers['activity_1_name'];
            const score1 = answers['activity_1_score'];
            // Complete if at least the first activity name is filled and its score is set
            return name1 && typeof name1 === 'string' && name1.trim() !== '' && score1 !== undefined;
        }
        return scale.questions.every(q => answers[q.id] !== undefined && answers[q.id] !== '');
    }, [answers, scale]);

    if (scale.id === 'ucaps') {
        return (
            <>
                <Header title={scale.name} onBack={onBack} onHome={onBack}/>
                <UCAPSAssessment
                    scale={scale}
                    answers={answers}
                    onAnswerChange={(qid, val) => handleAnswerChange(qid, val)}
                    onSubmit={() => onSubmit(answers)}
                    isComplete={isComplete}
                />
            </>
        )
    }
    
    if (scale.id === 'cmps-sf') {
         return (
            <>
                <Header title={scale.name} onBack={onBack} onHome={onBack}/>
                <CMPSFAssessment
                    scale={scale}
                    answers={answers}
                    onAnswerChange={(qid, val) => handleAnswerChange(qid, val)}
                    onSubmit={() => onSubmit(answers)}
                    isComplete={isComplete}
                />
            </>
        )
    }

    const renderQuestion = (question: Question) => {
        const value = answers[question.id];

        if (question.type === QuestionType.Custom) {
            if (scale.id === 'fgs') {
                return <ImageBasedQuestion question={question} value={value as number} onChange={(val) => handleAnswerChange(question.id, val)} />;
            }
            if (scale.id === 'csu-cap' || scale.id === 'csu-faps') {
                return <CSUCAPQuestion question={question} value={value as number} onChange={(val) => handleAnswerChange(question.id, val)} />;
            }
        }

        switch (question.type) {
            case QuestionType.Text:
                 return (
                    <div>
                        <label htmlFor={question.id} className="block font-semibold text-slate-800 mb-2">{question.text}</label>
                        <input
                            id={question.id}
                            type="text"
                            value={(answers[question.id] as string) || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Escreva aqui..."
                        />
                    </div>
                );
            case QuestionType.Radio:
                return (
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2">{question.text}</h4>
                        <div className="space-y-2">
                            {question.options?.map(option => (
                                <label key={option.score} className="flex items-center p-3 rounded-md hover:bg-slate-100 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200">
                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={option.score}
                                        checked={answers[question.id] === option.score}
                                        onChange={() => handleAnswerChange(question.id, option.score)}
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
                                    />
                                    <span className="ml-3 text-slate-700">{option.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case QuestionType.Slider:
                const min = question.min ?? 0;
                const max = question.max ?? 10;
                const currentValue = (answers[question.id] as number) ?? min;
                const sliderLabels = scale.id === 'fmpi' ? ['Normal', 'Leve', 'Moderado', 'Severo', 'Máximo'] : [];

                return (
                    <div>
                        <label htmlFor={question.id} className="block font-semibold text-slate-800 mb-2">{question.text}</label>
                        <div className="flex items-center gap-4">
                           <span className="text-sm text-slate-600 w-20 text-right">{question.labelMin}</span>
                            <input
                                id={question.id}
                                type="range"
                                min={min}
                                max={max}
                                step={question.step}
                                value={currentValue}
                                onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                             <span className="text-sm text-slate-600 w-24">{question.labelMax}</span>
                            <span className="font-bold text-teal-700 text-lg w-12 text-center">{currentValue}</span>
                        </div>
                         {sliderLabels.length > 0 && (
                             <div className="flex justify-between text-xs text-slate-500 mt-1 px-2">
                                {sliderLabels.map((label, index) => <span key={index}>{label}</span>)}
                            </div>
                         )}
                    </div>
                );
            default: return null;
        }
    };
    
    const questionsByCat = scale.questions.reduce<Record<string, Question[]>>((acc, q) => {
        const cat = q.category || 'default';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(q);
        return acc;
    }, {});


    return (
        <>
            <Header title={scale.name} onBack={onBack} onHome={onBack}/>
            <main className="p-4 md:p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {Object.entries(questionsByCat).map(([category, questions]) => (
                        <Card key={category} className="p-6 md:p-8">
                            {category !== 'default' && <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">{category}</h3>}
                            <div className="space-y-8">
                                {questions.map(q => <div key={q.id}>{renderQuestion(q)}</div>)}
                            </div>
                        </Card>
                    ))}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={() => onSubmit(answers)}
                            disabled={!isComplete}
                            className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            Ver Resultado
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

interface ResultScreenProps {
    result: { score: string; analysis: string; needsIntervention: boolean; };
    scaleName: string;
    painType: PainType;
    species: Species | null;
    onRestart: () => void;
    onShowGuide: (painType: PainType) => void;
}
const ResultScreen: React.FC<ResultScreenProps> = ({ result, scaleName, painType, species, onRestart, onShowGuide }) => {
    const actionSteps = useMemo(() => {
        if (!result.needsIntervention) {
            return [
                'Manter plano atual e reavaliar de forma seriada.',
                'Registrar escore e comportamento para comparação em 12-24h.',
                'Orientar tutor/equipe sobre sinais de piora.',
            ];
        }

        if (painType === PainType.Acute) {
            if (species === Species.Cat) {
                return [
                    'Iniciar resgate com opioide apropriado para felinos e monitorar temperatura.',
                    'Evitar escalonamento sem reavaliação clínica e hemodinâmica.',
                    'Reavaliar escore em 30-60 minutos após intervenção.',
                ];
            }
            return [
                'Aplicar resgate analgésico multimodal de acordo com o protocolo institucional.',
                'Associar anti-inflamatório apenas se não houver contraindicação.',
                'Reavaliar escore em 30-60 minutos após intervenção.',
            ];
        }

        return [
            'Revisar adesão, dose e intervalo do protocolo crônico.',
            'Ajustar estratégia multimodal com foco em funcionalidade e conforto.',
            'Definir reavaliação estruturada (escore + impacto funcional).',
        ];
    }, [painType, result.needsIntervention, species]);

    return (
    <>
        <Header title="Resultado da Avaliação" onHome={onRestart} />
        <main className="p-4 md:p-8 flex items-center justify-center" style={{ minHeight: 'calc(100dvh - 9rem)' }}>
            <Card className="max-w-6xl w-full text-center p-8">
                <h2 className="text-lg font-semibold text-slate-700">{scaleName}</h2>
                <p className="text-6xl font-extrabold text-slate-800 my-4">{result.score}</p>
                <div className={`p-4 rounded-lg my-6 ${result.needsIntervention ? 'bg-red-100' : 'bg-green-100'}`}>
                    <h3 className={`font-bold text-lg mb-2 ${result.needsIntervention ? 'text-red-900' : 'text-green-900'}`}>
                        {result.needsIntervention ? (painType === PainType.Acute ? 'Resgate Analgésico Indicado' : 'Manejo da Dor Crônica Indicado') : 'Dor Controlada ou Ausente'}
                    </h3>
                    <p className={result.needsIntervention ? 'text-red-800' : 'text-green-800'}>{result.analysis}</p>
                </div>

                <div className="text-left bg-white/70 border border-slate-200 rounded-xl p-4 md:p-5 mb-6">
                    <h4 className="text-base font-bold text-slate-800 mb-3">Conduta sugerida</h4>
                    <ul className="list-disc ml-5 space-y-1 text-slate-700">
                        {actionSteps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={onRestart} className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors flex-1">
                            Fazer Nova Avaliação
                        </button>
                        <button onClick={() => onShowGuide(painType)} className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex-1">
                            Ver Guias de Manejo
                        </button>
                    </div>

                    <div className="relative flex py-3 items-center">
                        <div className="flex-grow border-t border-slate-300"></div>
                        <span className="flex-shrink mx-4 text-slate-500 text-sm">EM BREVE</span>
                        <div className="flex-grow border-t border-slate-300"></div>
                    </div>

                    <button
                        type="button"
                        disabled
                        className="w-full bg-slate-500/70 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed opacity-80"
                        aria-label="Segunda opinião com IA em breve"
                    >
                        Segunda opinião com IA será implementada em breve
                    </button>
                </div>
            </Card>
        </main>
    </>
    );
};

// --- START: GuideScreen and its helper components ---

const InfoButton = ({ title, content, onInfoClick }: { title: string; content: React.ReactNode; onInfoClick: (title: string, content: React.ReactNode) => void; }) => (
    <button 
        onClick={() => onInfoClick(title, content)}
        className="ml-2 inline-block w-5 h-5 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 text-sm font-bold align-middle transition-transform hover:scale-110"
        aria-label={`Mais informações sobre ${title}`}
    >
        ?
    </button>
);

const GuideSection = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <Card className="p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">{title}</h3>
        <div className="space-y-4 text-slate-700 leading-relaxed">{children}</div>
    </Card>
);

const CRICalculator = ({ species, onInfoClick }: { species: Species, onInfoClick: (title: string, content: React.ReactNode) => void }) => {
    const [deliveryMethod, setDeliveryMethod] = useState<'bag' | 'syringe'>('bag');
    const [weight, setWeight] = useState('');
    
    // Bag state
    const [fluidRate, setFluidRate] = useState('');
    const [bagVolume, setBagVolume] = useState('1000');
    
    // Syringe state
    const [syringeVolume, setSyringeVolume] = useState('60');
    const [desiredConcentration, setDesiredConcentration] = useState('');

    const [drug, setDrug] = useState('fentanyl');
    const [result, setResult] = useState<React.ReactNode | null>(null);

    const drugData: Record<string, { name: string; doseRange: string; doseMcgKgMin: number; concentrationMgMl: number; concentrationLabel: string; defaultTargetConcentrationMgMl: number; }> = {
        fentanyl: { name: "Fentanil", doseRange: "3-10 µg/kg/h", doseMcgKgMin: 5/60, concentrationMgMl: 0.05, concentrationLabel: "50 µg/ml", defaultTargetConcentrationMgMl: 0.01 },
        lidocaine: { name: "Lidocaína", doseRange: "30-50 µg/kg/min", doseMcgKgMin: 40, concentrationMgMl: 20, concentrationLabel: "20 mg/ml (2%)", defaultTargetConcentrationMgMl: 2 },
        ketamine: { name: "Cetamina", doseRange: "2-10 µg/kg/min", doseMcgKgMin: 5, concentrationMgMl: 100, concentrationLabel: "100 mg/ml", defaultTargetConcentrationMgMl: 1 },
    };

    useEffect(() => {
        if (deliveryMethod === 'syringe') {
            const defaultConc = drugData[drug]?.defaultTargetConcentrationMgMl;
            if (defaultConc) {
                setDesiredConcentration(defaultConc.toString());
            } else {
                setDesiredConcentration('');
            }
        }
        setResult(null); // Clear result when drug or method changes
    }, [drug, deliveryMethod]);
    
    const calculateCRI = () => {
        const w = parseFloat(weight);
        if (isNaN(w) || w <= 0) {
            setResult(<p className="text-red-700">Por favor, preencha o peso do paciente com um valor válido.</p>);
            return;
        }

        const { doseMcgKgMin, concentrationMgMl, name: drugName, concentrationLabel } = drugData[drug];

        if (deliveryMethod === 'bag') {
            const fr = parseFloat(fluidRate);
            const bv = parseFloat(bagVolume);
            if (isNaN(fr) || isNaN(bv) || fr <= 0) {
                setResult(<p className="text-red-700">Por favor, preencha todos os campos da bolsa de fluido com valores válidos.</p>);
                return;
            }
            const doseMgPerHour = (doseMcgKgMin * 60) / 1000;
            const totalMgNeededPerHour = doseMgPerHour * w;
            const requiredConcentrationInBag = totalMgNeededPerHour / fr;
            const totalMgToAdd = requiredConcentrationInBag * bv;
            const volumeMlNeeded = totalMgToAdd / concentrationMgMl;

            if (volumeMlNeeded > bv) {
                 setResult(<p className="text-red-700">O volume de fármaco a adicionar excede o volume da bolsa. Verifique os valores.</p>);
                 return;
            }

            setResult(
                <div className="text-left space-y-2">
                    <p className="font-bold">Instruções para a Bolsa de Fluido:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-800">
                        <li><span className="font-semibold">Concentração Alvo na Bolsa:</span> {requiredConcentrationInBag.toFixed(3)} mg/ml.</li>
                        <li><span className="font-semibold">Total de Fármaco Necessário:</span> {totalMgToAdd.toFixed(2)} mg para a bolsa de {bv} ml.</li>
                        <li className="font-bold text-teal-900 bg-teal-200 p-2 mt-2 rounded-md">Adicione <span className="underline">{volumeMlNeeded.toFixed(2)} ml</span> de {drugName} na bolsa de fluido.</li>
                    </ol>
                    <p className="text-xs text-slate-500 pt-2">Este cálculo assume que a adição deste volume à bolsa é desprezível para o volume total.</p>
                </div>
            );

        } else { // Syringe
            const sv = parseFloat(syringeVolume);
            const dc = parseFloat(desiredConcentration);
             if (isNaN(sv) || isNaN(dc) || sv <= 0 || dc <= 0) {
                 setResult(<p className="text-red-700">Por favor, preencha o volume da seringa e a concentração desejada com valores válidos.</p>);
                return;
            }

            if (dc > concentrationMgMl) {
                 setResult(
                    <div className="text-red-800 bg-red-100 p-3 rounded-md">
                        <p className="font-bold">Concentração Inválida!</p>
                        <p>A concentração desejada ({dc} mg/ml) não pode ser maior que a do fármaco original ({concentrationMgMl} mg/ml).</p>
                    </div>
                );
                return;
            }

            const totalMgToAdd = dc * sv;
            const volumeOfDrugToAdd = totalMgToAdd / concentrationMgMl;
            const volumeOfDiluent = sv - volumeOfDrugToAdd;

            if (volumeOfDiluent < 0) {
                 setResult(<p className="text-red-700">Erro: O volume do diluente é negativo. A concentração desejada é muito alta.</p>);
                return;
            }

            const doseMgPerHour = (doseMcgKgMin * 60) / 1000;
            const totalMgNeededPerHour = doseMgPerHour * w;
            const requiredInfusionRate = totalMgNeededPerHour / dc;

            let rateWarning = null;
            if (requiredInfusionRate > 50) {
                rateWarning = "A taxa de infusão calculada é muito alta (>50 ml/h). A seringa se esgotará rapidamente. Considere usar uma diluição mais concentrada.";
            } else if (requiredInfusionRate < 0.1) {
                rateWarning = "A taxa de infusão calculada é muito baixa (&lt;0.1 ml/h) e pode não ser precisa em algumas bombas. Considere usar uma diluição menos concentrada (mais diluída).";
            }

            setResult(
                 <div className="text-left space-y-2">
                    <p className="font-bold">Instruções para a Bomba de Seringa (diluição de {dc} mg/ml):</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-800">
                        <li>Aspire <span className="font-bold">{volumeOfDrugToAdd.toFixed(2)} ml</span> de {drugName} (de {concentrationLabel}).</li>
                        <li>Complete com <span className="font-bold">{volumeOfDiluent.toFixed(2)} ml</span> de diluente (ex: NaCl 0.9%) para um volume total de <span className="font-bold">{sv} ml</span>.</li>
                        <li className="font-bold text-teal-900 bg-teal-200 p-2 mt-2 rounded-md">Programe a bomba de infusão para <span className="underline">{requiredInfusionRate.toFixed(2)} ml/h</span>.</li>
                    </ol>
                    {rateWarning && <div className="mt-3 p-2 bg-amber-100 text-amber-900 border border-amber-300 rounded-md text-sm">{rateWarning}</div>}
                 </div>
            );
        }
    };

    const Bold = ({ children }: React.PropsWithChildren) => <strong className="font-semibold text-slate-800">{children}</strong>;

    const fluidRateInfoContent = (
         <div>
            <p className="mb-4">
                O objetivo da infusão contínua (CRI) em bolsa de fluido é enriquecer a solução de fluidoterapia para que o paciente receba uma dose terapêutica constante do medicamento. Este guia detalha a lógica por trás do cálculo.
            </p>

            <h4 className="font-bold text-lg text-slate-800 mb-2">Cenário de Exemplo:</h4>
            <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
                <li><Bold>Paciente:</Bold> Cão de 10 kg</li>
                <li><Bold>Taxa de Fluido:</Bold> 21 ml/h</li>
                <li><Bold>Bolsa de Fluido:</Bold> 250 ml</li>
                <li><Bold>Fármaco:</Bold> Lidocaína (frasco a 20 mg/ml)</li>
                <li><Bold>Dose Alvo:</Bold> 40 µg/kg/min (equivalente a 2.4 mg/kg/h)</li>
            </ul>

            {/* Step 1 */}
            <h4 className="font-bold text-lg text-slate-800 mb-2">Passo 1: Calcular a Necessidade de Fármaco por Hora (mg/h)</h4>
            <p className="mb-2">Primeiro, determinamos a massa total de fármaco que o paciente precisa a cada hora.</p>
            <div className="bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center">
                Dose (mg/kg/h) &times; Peso (kg) = Necessidade por Hora (mg/h)
            </div>
            <div className="bg-teal-50 border-l-4 border-teal-400 p-3 my-2">
                <p className="font-mono text-sm">2.4 mg/kg/h &times; 10 kg = <Bold>24 mg/h</Bold></p>
            </div>
            <p className="text-sm text-slate-600 mb-4"><em>Conclusão: Este paciente precisa de 24 mg de Lidocaína por hora.</em></p>

            {/* Step 2 */}
            <h4 className="font-bold text-lg text-slate-800 mb-2">Passo 2: Calcular a Concentração Alvo na Bolsa (mg/ml)</h4>
            <p className="mb-2">Para que os 24 mg sejam entregues em 21 ml de fluido a cada hora, cada ml da bolsa deve ter uma concentração específica.</p>
            <div className="bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center">
                Necessidade por Hora (mg/h) &divide; Taxa de Fluido (ml/h) = Concentração Alvo (mg/ml)
            </div>
            <div className="bg-teal-50 border-l-4 border-teal-400 p-3 my-2">
                 <p className="font-mono text-sm">24 mg/h &divide; 21 ml/h &asymp; <Bold>1.14 mg/ml</Bold></p>
            </div>
            <p className="text-sm text-slate-600 mb-4"><em>Conclusão: Cada ml da bolsa precisa conter 1.14 mg de Lidocaína.</em></p>

            {/* Step 3 */}
            <h4 className="font-bold text-lg text-slate-800 mb-2">Passo 3: Calcular o Total de Fármaco para a Bolsa (mg)</h4>
            <p className="mb-2">Agora, calculamos a massa total de fármaco para enriquecer a bolsa inteira de 250 ml.</p>
             <div className="bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center">
                Concentração Alvo (mg/ml) &times; Volume da Bolsa (ml) = Total de Fármaco (mg)
            </div>
            <div className="bg-teal-50 border-l-4 border-teal-400 p-3 my-2">
                <p className="font-mono text-sm">1.14 mg/ml &times; 250 ml = <Bold>285 mg</Bold></p>
            </div>
             <p className="text-sm text-slate-600 mb-4"><em>Conclusão: Precisamos adicionar um total de 285 mg de Lidocaína.</em></p>

            {/* Step 4 */}
             <h4 className="font-bold text-lg text-slate-800 mb-2">Passo 4: Converter Massa (mg) em Volume (ml)</h4>
            <p className="mb-2">Finalmente, convertemos a massa em um volume mensurável, usando a concentração do frasco original do fármaco (20 mg/ml).</p>
             <div className="bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center">
                Total de Fármaco (mg) &divide; Concentração Original (mg/ml) = Volume a Adicionar (ml)
            </div>
             <div className="bg-teal-50 border-l-4 border-teal-400 p-3 my-2">
                <p className="font-mono text-sm">285 mg &divide; 20 mg/ml = <Bold>14.25 ml</Bold></p>
            </div>

            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                <p className="text-green-900 font-bold text-lg">Resultado: Adicione <span className="underline">14.25 ml</span> de Lidocaína (20 mg/ml) à bolsa de 250 ml.</p>
            </div>
        </div>
    );
    
    const syringeConcentrationInfoContent = (
        <div>
            <p className="mb-2">Definir uma <Bold>concentração alvo</Bold> (ex: 1 mg/ml) permite criar diluições padronizadas e fáceis de preparar. Esta abordagem tem várias vantagens:</p>
            <ul className="list-disc list-inside mb-3 space-y-1">
                <li><Bold>Reduz erros de cálculo:</Bold> Fazer uma diluição para um número "redondo" é menos propenso a erros.</li>
                <li><Bold>Otimiza o uso de fármacos:</Bold> Permite criar a diluição mais econômica para a situação.</li>
                <li><Bold>Aumenta a segurança:</Bold> Evita concentrações excessivamente altas ou baixas.</li>
            </ul>
            <p className="font-semibold">A calculadora determinará a <Bold>taxa de infusão (ml/h)</Bold> necessária para administrar a dose correta ao paciente com base na sua diluição. Este método é frequentemente preferido em ambientes clínicos movimentados.</p>
        </div>
    );


    return (
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-6">
            <h4 className="text-xl font-semibold text-teal-800 mb-4">Calculadora de Infusão Contínua</h4>
            
            <div className="mb-4">
                 <label className="block text-sm font-medium text-slate-700 mb-2">Método de Administração</label>
                 <div className="flex rounded-md shadow-sm">
                    <button onClick={() => setDeliveryMethod('bag')} className={`px-4 py-2 text-sm font-medium border border-slate-300 rounded-l-md flex-1 ${deliveryMethod === 'bag' ? 'bg-teal-600 text-white border-teal-600 z-10' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>
                        Bolsa de Fluido
                    </button>
                    <button onClick={() => setDeliveryMethod('syringe')} className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-slate-300 rounded-r-md flex-1 ${deliveryMethod === 'syringe' ? 'bg-teal-600 text-white border-teal-600 z-10' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>
                        Bomba de Seringa
                    </button>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Peso do Paciente (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 10" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Fármaco (Conc.)</label>
                    <select value={drug} onChange={e => {setDrug(e.target.value); setResult(null);}} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                        <option value="fentanyl">{drugData.fentanyl.name} ({drugData.fentanyl.concentrationLabel})</option>
                        {species === Species.Dog && <option value="lidocaine">{drugData.lidocaine.name} ({drugData.lidocaine.concentrationLabel})</option>}
                        <option value="ketamine">{drugData.ketamine.name} ({drugData.ketamine.concentrationLabel})</option>
                    </select>
                </div>
                
                {deliveryMethod === 'bag' && (
                    <>
                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-700">
                                Taxa de Fluido (ml/h)
                                <InfoButton title="Como Calcular a Adição à Bolsa de Fluido" content={fluidRateInfoContent} onInfoClick={onInfoClick} />
                            </label>
                            <input type="number" value={fluidRate} onChange={e => setFluidRate(e.target.value)} placeholder="Ex: 21" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Volume da Bolsa (ml)</label>
                            <select value={bagVolume} onChange={e => setBagVolume(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                                <option value="250">250 ml</option>
                                <option value="500">500 ml</option>
                                <option value="1000">1000 ml</option>
                            </select>
                        </div>
                    </>
                )}

                {deliveryMethod === 'syringe' && (
                    <>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Volume da Seringa (ml)</label>
                             <select value={syringeVolume} onChange={e => setSyringeVolume(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                                <option value="20">20 ml</option>
                                <option value="50">50 ml</option>
                                <option value="60">60 ml</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-700">
                                Concentração Desejada (mg/ml)
                                <InfoButton title="Por que Definir uma Concentração?" content={syringeConcentrationInfoContent} onInfoClick={onInfoClick} />
                            </label>
                            <input type="number" value={desiredConcentration} onChange={e => setDesiredConcentration(e.target.value)} placeholder="Ex: 1" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                        </div>
                    </>
                )}
            </div>
            <button onClick={calculateCRI} className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors w-full">Calcular</button>
            {result && <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-md font-semibold text-center">{result}</div>}
        </div>
    );
};


const DogAcuteGuideContent = ({ onInfoClick }: { onInfoClick: (title: string, content: React.ReactNode) => void }) => (
    <div className="max-w-6xl mx-auto">
        <GuideSection title="Princípios de Analgesia de Resgate em Cães">
            <p>Cães geralmente toleram bem uma variedade de analgésicos. A abordagem multimodal é o padrão-ouro, combinando fármacos que atuam em diferentes pontos da via da dor para maximizar a eficácia e minimizar efeitos adversos. A avaliação da função renal e hepática antes de iniciar a terapia, especialmente com AINEs, é crucial.</p>
        </GuideSection>

        <GuideSection title="Classes de Fármacos e Doses para Dor Aguda">
            <h4 className="text-xl font-semibold text-teal-800 mb-2">Opioides</h4>
            <p>A base para dor moderada a severa.
                <InfoButton title="Mecanismo dos Opioides" content={<p>Opioides atuam ligando-se a receptores específicos (μ, κ, δ) no cérebro e medula espinhal, inibindo a transmissão e percepção dos sinais de dor. Agonistas puros (morfina, metadona) têm alta afinidade e eficácia nos receptores μ, provendo analgesia potente.</p>} onInfoClick={onInfoClick} />
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Metadona:</span> 0.2-0.5 mg/kg IV, IM, SC a cada 4-6h.</li>
                <li><span className="font-semibold">Hidromorfona:</span> 0.05-0.1 mg/kg IV, IM, SC a cada 4-6h.</li>
                <li><span className="font-semibold">Morfina:</span> 0.2-0.5 mg/kg IM, SC a cada 4-6h.</li>
                <li><span className="font-semibold">Buprenorfina:</span> 0.01-0.02 mg/kg IV, IM, OTM a cada 6-8h (para dor leve a moderada).</li>
            </ul>
             <p className="mt-4 font-semibold text-red-700">Complicações Comuns:
                <InfoButton title="Complicações de Opioides" content={<div><p>Os principais efeitos adversos incluem sedação, depressão respiratória, bradicardia, vômito (especialmente morfina) e constipação. A monitorização da frequência respiratória e cardíaca é essencial. O vômito pode ser mitigado com antieméticos como o maropitant.</p></div>} onInfoClick={onInfoClick} />
            </p>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Anti-inflamatórios Não Esteroidais (AINEs)</h4>
            <p>Excelentes para dor inflamatória, especialmente em quadros ortopédicos e pós-operatórios.
                <InfoButton title="Mecanismo e Riscos dos AINEs" content={<div><p>AINEs inibem as enzimas COX, reduzindo a produção de prostaglandinas inflamatórias. No entanto, prostaglandinas mediadas pela COX-1 são vitais para a proteção da mucosa gástrica e para o fluxo sanguíneo renal. A inibição da COX-1 é a principal causa dos efeitos adversos gastrointestinais e renais.</p><p>Sempre use a menor dose eficaz pelo menor tempo possível. Garanta que o paciente esteja hidratado e normotenso.</p></div>} onInfoClick={onInfoClick} />
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Carprofeno:</span> 4.4 mg/kg SID ou 2.2 mg/kg BID, PO, SC.</li>
                <li><span className="font-semibold">Meloxicam:</span> 0.2 mg/kg no primeiro dia, seguido de 0.1 mg/kg SID, PO, SC.</li>
                <li><span className="font-semibold">Robenacoxib:</span> 1-2 mg/kg SID, PO.</li>
            </ul>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Analgésicos Adjuvantes</h4>
            <p>Úteis para dor crônica, neuropática ou para potencializar outros analgésicos.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Gabapentina:</span> 10-20 mg/kg BID ou TID, PO. Essencial para dor neuropática.</li>
                <li><span className="font-semibold">Cetamina:</span> Pode ser usada em protocolos multimodais para prevenir sensibilização central.
                    <InfoButton title="Cetamina e Sensibilização Central" content={<p>A dor intensa e persistente pode levar a uma hipersensibilidade do sistema nervoso (sensibilização central), mediada por receptores NMDA. A cetamina, como antagonista NMDA, bloqueia esse processo, "resetando" o sistema e tornando os opioides mais eficazes.</p>} onInfoClick={onInfoClick} />
                </li>
            </ul>
        </GuideSection>
    </div>
);

const DogChronicGuideContent = ({ onInfoClick }: { onInfoClick: (title: string, content: React.ReactNode) => void }) => (
    <div className="max-w-6xl mx-auto">
        <GuideSection title="Princípios do Manejo da Dor Crônica em Casa">
            <p>O manejo da dor crônica, como na osteoartrite, é um compromisso de longo prazo que visa melhorar a qualidade de vida. A abordagem deve ser multimodal, combinando fármacos, suplementos, modificações ambientais e controle de peso.</p>
            <p className="font-semibold text-teal-800">O objetivo não é a ausência total de dor, mas sim a funcionalidade e o conforto do animal. O monitoramento contínuo pelo tutor, com ferramentas como o CBPI, é fundamental.</p>
        </GuideSection>

        <GuideSection title="Terapia Farmacológica (Requer Prescrição Veterinária)">
             <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-800">
                <p className="font-bold">Atenção!</p>
                <p>Todos os medicamentos listados abaixo exigem prescrição e acompanhamento de um médico veterinário. A automedicação é perigosa.</p>
            </div>
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">1. Anti-inflamatórios Não Esteroidais (AINEs)</h4>
            <p>São a base do tratamento para dor de osteoartrite. É crucial o monitoramento da função renal e hepática.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Carprofeno:</span> 4.4 mg/kg SID ou 2.2 mg/kg BID, PO.</li>
                <li><span className="font-semibold">Meloxicam:</span> 0.1 mg/kg SID, PO (após dose de ataque de 0.2 mg/kg).</li>
                <li><span className="font-semibold">Grapiprant (Galliprant®):</span> 2 mg/kg SID, PO. Atua em um receptor específico da dor (EP4), poupando as vias da COX.</li>
                <li><span className="font-semibold">Robenacoxib:</span> 1-2 mg/kg SID, PO.</li>
            </ul>
            <div className="mt-3 p-3 bg-red-100 text-red-900 border border-red-300 rounded-md text-sm font-bold">NUNCA associe AINEs com Corticosteroides. Risco altíssimo de ulceração gastrointestinal.</div>
            
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">2. Neuromoduladores e Outros Analgésicos</h4>
            <p>Essenciais para dor neuropática ou quando os AINEs são insuficientes ou contraindicados.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Gabapentina:</span> 10-20 mg/kg, a cada 8-12h, PO. Analgésico e ansiolítico.</li>
                <li><span className="font-semibold">Pregabalina:</span> 2-4 mg/kg, a cada 12h, PO. Mais potente que a gabapentina.</li>
                 <li><span className="font-semibold">Amantadina:</span> 3-5 mg/kg, a cada 12-24h, PO. Ajuda a combater a sensibilização central (wind-up).</li>
                <li><span className="font-semibold">Trazodona:</span> 3-7 mg/kg, a cada 8-12h, PO. Útil para ansiedade e agitação que podem exacerbar a dor.</li>
            </ul>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">3. Corticosteroides</h4>
            <p>Usados com cautela para crises inflamatórias severas, quando AINEs não são uma opção. O uso crônico deve ser evitado.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Prednisona/Prednisolona:</span> 0.5-1 mg/kg SID, PO, com desmame gradual.</li>
            </ul>
        </GuideSection>

         <GuideSection title="Suplementos e Terapias Adjuvantes">
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Condroprotetores e Nutracêuticos</h4>
            <p>Ajudam a dar suporte à saúde articular, embora a evidência de eficácia analgésica varie.</p>
             <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Glicosaminoglicanos (GAGs):</span> Glicosamina e Condroitina.</li>
                <li><span className="font-semibold">Ácidos Graxos Ômega-3 (EPA/DHA):</span> Ação anti-inflamatória natural. Encontrado em óleo de peixe.</li>
                <li><span className="font-semibold">Colágeno não desnaturado tipo II (UC-II):</span> Ajuda a modular a resposta imune na articulação.</li>
            </ul>

             <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Manejo Não Farmacológico</h4>
             <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Controle de Peso:</span> O passo mais importante. Perder peso reduz drasticamente a carga sobre as articulações.</li>
                <li><span className="font-semibold">Fisioterapia e Exercícios de Baixo Impacto:</span> Natação e caminhadas controladas fortalecem a musculatura de suporte.</li>
                 <li><span className="font-semibold">Modificações Ambientais:</span> Rampas, escadas para móveis e pisos antiderrapantes.</li>
            </ul>
        </GuideSection>
    </div>
);

const CatAcuteGuideContent = ({ onInfoClick }: { onInfoClick: (title: string, content: React.ReactNode) => void }) => (
     <div className="max-w-6xl mx-auto">
        <GuideSection title="Princípios de Analgesia de Resgate em Gatos">
            <p>O manejo da dor em gatos requer atenção especial devido às suas particularidades metabólicas.
            <InfoButton title="Metabolismo Felino" content={<div><p>Gatos possuem uma deficiência na via de conjugação hepática por glicuronidação. Esta é uma via metabólica crucial para a eliminação de muitos fármacos, incluindo AINEs e paracetamol (que é altamente tóxico).</p><p>Essa deficiência resulta em uma meia-vida prolongada para muitos medicamentos, aumentando o risco de toxicidade se as doses e intervalos não forem estritamente ajustados para a espécie.</p></div>} onInfoClick={onInfoClick} />
            A analgesia multimodal é vital, mas a seleção de fármacos e doses deve ser extremamente cuidadosa. A avaliação da função renal é mandatória antes do uso de AINEs.</p>
        </GuideSection>

        <GuideSection title="Classes de Fármacos e Doses para Dor Aguda">
            <h4 className="text-xl font-semibold text-teal-800 mb-2">Opioides</h4>
            <p>Seguros e eficazes em gatos. A buprenorfina é uma excelente opção para dor leve a moderada.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Buprenorfina:</span> 0.02-0.04 mg/kg IV, IM, TMO a cada 6-8h. A via transmucosa oral (TMO) é muito eficaz.</li>
                <li><span className="font-semibold">Metadona:</span> 0.2-0.4 mg/kg IV, IM a cada 4-6h. Boa escolha para dor severa.</li>
                <li><span className="font-semibold">Hidromorfona:</span> 0.025-0.05 mg/kg IV, IM a cada 4-6h. Monitorar para hipertermia.
                    <InfoButton title="Hipertermia por Opioides em Gatos" content={<p>Gatos podem desenvolver hipertermia (aumento da temperatura corporal) como um efeito adverso idiossincrático a certos opioides, especialmente a hidromorfona. O mecanismo não é totalmente elucidado, mas parece envolver a modulação dos centros termorregulatórios no hipotálamo. A monitorização da temperatura é crucial por várias horas após a administração.</p>} onInfoClick={onInfoClick} />
                </li>
            </ul>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Anti-inflamatórios Não Esteroidais (AINEs)</h4>
            <p>Usar com extrema cautela e apenas fármacos licenciados para a espécie.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Meloxicam:</span> Dose única de 0.2-0.3 mg/kg SC, ou 0.1 mg/kg PO SID por poucos dias.</li>
                <li><span className="font-semibold">Robenacoxib:</span> 1-2 mg/kg SID PO ou SC, por no máximo 3-6 dias.</li>
            </ul>
             <p className="mt-4 font-semibold text-red-700">Riscos em Gatos:
                <InfoButton title="Riscos de AINEs em Gatos" content={<div><p>Devido ao seu metabolismo e à alta prevalência de doença renal crônica subclínica, os gatos são mais suscetíveis à toxicidade renal e gastrointestinal dos AINEs. O uso deve ser de curto prazo, com a menor dose eficaz, e apenas em pacientes hígidos, normotensos e bem hidratados. A triagem com exames de sangue é fortemente recomendada.</p></div>} onInfoClick={onInfoClick} />
            </p>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Analgésicos Adjuvantes</h4>
            <p>Essenciais para o manejo multimodal, especialmente em dor crônica.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Gabapentina:</span> 10-20 mg/kg (ou 50-100 mg/gato) BID ou TID, PO. Excelente para dor crônica e para reduzir estresse pré-visita.</li>
                <li><span className="font-semibold">Maropitant:</span> 1 mg/kg SC, IV, SID. Além de antiemético, possui propriedades analgésicas viscerais.</li>
            </ul>
        </GuideSection>
        
    </div>
);

const CatChronicGuideContent = ({ onInfoClick }: { onInfoClick: (title: string, content: React.ReactNode) => void }) => (
    <div className="max-w-6xl mx-auto">
        <GuideSection title="Particularidades do Manejo da Dor Crônica Felina">
            <p>Gatos são mestres em esconder a dor crônica. Mudanças sutis de comportamento, como relutância em pular, menor interação e higiene diminuída, são sinais importantes. A abordagem deve ser gentil e focada no bem-estar e enriquecimento ambiental.</p>
        </GuideSection>

        <GuideSection title="Terapia Farmacológica (Requer Prescrição Veterinária)">
             <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-800">
                <p className="font-bold">Atenção!</p>
                <p>Todos os medicamentos listados abaixo exigem prescrição e acompanhamento de um médico veterinário. A automedicação é perigosa e pode ser fatal para gatos.</p>
            </div>
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">1. Anticorpo Monoclonal - A Revolução no Manejo</h4>
            <p>A terapia mais moderna e segura para dor de osteoartrite em gatos.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Frunevetmab (Solensia®):</span> 2.8 mg/kg, SC, a cada 28 dias. Atua bloqueando o Fator de Crescimento Neural (NGF), um mediador chave da dor. É altamente específico e tem perfil de segurança excelente.</li>
            </ul>

            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">2. Anti-inflamatórios Não Esteroidais (AINEs)</h4>
            <p>Uso criterioso e de curto prazo, apenas em pacientes selecionados e monitorados.</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Robenacoxib:</span> 1-2 mg/kg SID, PO, por no máximo 6 dias.</li>
                <li><span className="font-semibold">Meloxicam:</span> Uso controverso para longo prazo. Doses muito baixas (ex: 0.01-0.03 mg/kg SID) podem ser consideradas por um especialista.</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">3. Neuromoduladores e Outros Analgésicos</h4>
             <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Gabapentina:</span> 10-20 mg/kg (ou 50-100 mg/gato), a cada 8-12h, PO. Peça-chave no manejo da dor crônica, especialmente a de origem neuropática. Também ajuda a reduzir a ansiedade associada à dor.</li>
                <li><span className="font-semibold">Trazodona:</span> 5-10 mg/kg (ou ~50mg/gato), a cada 12-24h, PO. Útil para o componente de ansiedade da dor crônica e para facilitar o manejo do paciente, especialmente em gatos mais reativos.</li>
                <li><span className="font-semibold">Amantadina:</span> 3-5 mg/kg SID, PO. Para sensibilização central.</li>
                <li><span className="font-semibold">Buprenorfina:</span> 0.02-0.04 mg/kg, a cada 8-12h, via transmucosa oral. Ótima opção para o tutor administrar em casa para picos de dor.</li>
            </ul>
        </GuideSection>

         <GuideSection title="Suplementos e Manejo Ambiental">
            <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Nutracêuticos e Suplementos</h4>
             <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Glicosamina / Condroitina:</span> Podem oferecer suporte articular.</li>
                <li><span className="font-semibold">Ômega-3 (EPA/DHA):</span> Ação anti-inflamatória. Prefira formulações líquidas ou palatáveis para gatos.</li>
            </ul>

             <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">Enriquecimento Ambiental e Físico</h4>
             <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-semibold">Acessibilidade:</span> Escadas ou rampas para locais altos, caixas de areia com bordas baixas.</li>
                <li><span className="font-semibold">Conforto:</span> Camas macias e aquecidas.</li>
                 <li><span className="font-semibold">Atividade Leve:</span> Brincadeiras com varinhas para estimular movimento sem impacto.</li>
            </ul>
        </GuideSection>
    </div>
);


interface GuideScreenProps {
    onBack: () => void;
    onHome: () => void;
    setModal: (title: string, content: React.ReactNode) => void;
    initialPainType: PainType | null;
    initialSpecies: Species | null;
}
const GuideScreen: React.FC<GuideScreenProps> = ({ onBack, onHome, setModal, initialPainType, initialSpecies }) => {
    const [context, setContext] = useState<PainType | null>(initialPainType);
    const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(initialSpecies);

    useEffect(() => {
        setContext(initialPainType);
        setSelectedSpecies(initialSpecies);
    }, [initialPainType, initialSpecies]);

    const handleBackToContext = () => {
        setSelectedSpecies(null);
        if (initialPainType === null) {
            setContext(null);
        }
    };

    if (!context) {
        return (
            <>
                <Header title="Guias de Manejo da Dor" onBack={onBack} onHome={onHome}/>
                <div className="flex flex-col items-center justify-center p-4" style={{ minHeight: 'calc(100dvh - 9rem)' }}>
                    <div className="w-full max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-slate-700 mb-8">Qual o Contexto Clínico?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <button onClick={() => setContext(PainType.Acute)} className="p-8 w-full h-full text-left flex flex-col">
                                    <h3 className="text-2xl font-bold text-teal-700">Resgate Analgésico</h3>
                                    <p className="text-slate-600 mt-2 flex-grow">Protocolos para dor aguda, pós-operatório e uso hospitalar.</p>
                                </button>
                            </Card>
                            <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <button onClick={() => setContext(PainType.Chronic)} className="p-8 w-full h-full text-left flex flex-col">
                                    <h3 className="text-2xl font-bold text-teal-700">Manejo da Dor Crônica</h3>
                                    <p className="text-slate-600 mt-2 flex-grow">Estratégias e fármacos para o tratamento domiciliar de longo prazo (ex: osteoartrite).</p>
                                </button>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!selectedSpecies) {
        return (
            <>
                <Header title={`Guia: ${context === PainType.Acute ? 'Resgate Analgésico' : 'Dor Crônica'}`} onBack={handleBackToContext} onHome={onHome}/>
                <div className="flex flex-col items-center justify-center p-4" style={{ minHeight: 'calc(100dvh - 9rem)' }}>
                    <div className="w-full max-w-5xl text-center">
                        <h2 className="text-3xl font-bold text-slate-700 mb-8">Para Qual Espécie?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button onClick={() => setSelectedSpecies(Species.Dog)} className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48">
                                <Dog className="h-14 w-14 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-2xl font-semibold text-slate-800">Cão</span>
                            </button>
                            <button onClick={() => setSelectedSpecies(Species.Cat)} className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48">
                                <Cat className="h-14 w-14 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-2xl font-semibold text-slate-800">Gato</span>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const speciesName = selectedSpecies === Species.Dog ? 'Cães' : 'Gatos';
    const contextName = context === PainType.Acute ? 'Resgate Analgésico' : 'Dor Crônica';

    return (
        <>
            <Header title={`${contextName} para ${speciesName}`} onBack={() => setSelectedSpecies(null)} onHome={onHome}/>
            <main className="p-4 md:p-8">
                 {context === PainType.Acute && selectedSpecies === Species.Dog && <DogAcuteGuideContent onInfoClick={setModal} />}
                 {context === PainType.Acute && selectedSpecies === Species.Cat && <CatAcuteGuideContent onInfoClick={setModal} />}
                 {context === PainType.Chronic && selectedSpecies === Species.Dog && <DogChronicGuideContent onInfoClick={setModal} />}
                 {context === PainType.Chronic && selectedSpecies === Species.Cat && <CatChronicGuideContent onInfoClick={setModal} />}
            </main>
        </>
    );
};
// --- END: GuideScreen ---



// Helper components for Clinical Guidelines Screen
const SectionTitle = ({ children }: React.PropsWithChildren) => <h2 className="text-3xl font-bold text-slate-800 mt-10 mb-4 border-b-2 border-teal-500 pb-2">{children}</h2>;
const SubSectionTitle = ({ children }: React.PropsWithChildren) => <h3 className="text-2xl font-semibold text-slate-700 mt-8 mb-3">{children}</h3>;
const SubSubSectionTitle = ({ children }: React.PropsWithChildren) => <h4 className="text-xl font-semibold text-teal-800 mt-6 mb-2">{children}</h4>;
const Paragraph = ({ children }: React.PropsWithChildren) => <p className="text-slate-700 leading-relaxed mb-4">{children}</p>;
const Bold = ({ children }: React.PropsWithChildren) => <strong className="font-semibold text-slate-800">{children}</strong>;

const GuidelineTable = ({ headers, rows }: { headers: string[], rows: (string[])[] }) => (
    <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm border border-slate-300">
            <thead className="bg-slate-100">
                <tr>
                    {headers.map((header, i) => <th key={i} className="px-4 py-3 font-semibold text-left border-b border-slate-300">{header}</th>)}
                </tr>
            </thead>
            <tbody className="bg-white">
                {rows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
                        {row.map((cell, j) => <td key={j} className="px-4 py-3 align-top" dangerouslySetInnerHTML={{ __html: cell }}></td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ClinicalGuidelinesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <>
        <Header title="Diretrizes Clínicas" onBack={onBack} onHome={onBack} />
        <main className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-teal-700 text-center mb-6">Diretrizes Clínicas para o Manejo da Dor em Cães e Gatos</h1>
                <p className="text-center text-slate-600 mb-10 italic">Uma Base Farmacológica e Estratégica para Aplicações de Suporte à Decisão Clínica</p>

                <SectionTitle>Seção 1: Princípios Fundamentais</SectionTitle>
                <SubSectionTitle>1.1. O Imperativo do Reconhecimento da Dor</SubSectionTitle>
                <Paragraph>O manejo da dor é um pilar fundamental da medicina veterinária moderna. A dor não tratada não é apenas uma questão de bem-estar; é um estado de doença com consequências fisiopatológicas significativas, incluindo atraso na cicatrização, supressão do sistema imunológico e alterações comportamentais. A consideração da dor como o "quarto sinal vital" reflete sua importância crucial no atendimento ao paciente.</Paragraph>
                <Paragraph>A abordagem histórica, baseada na interpretação subjetiva, é inadequada. A ausência de sinais óbvios não significa ausência de dor, especialmente em felinos. A medicina baseada em evidências utiliza instrumentos de avaliação validados para transformar observações em dados semi-quantitativos, permitindo uma avaliação mais objetiva e a monitorização da resposta à terapia.</Paragraph>

                <SubSectionTitle>1.2. Instrumentos Validados de Avaliação da Dor</SubSectionTitle>
                <Paragraph>A transição para uma abordagem estruturada requer o uso de escalas de dor validadas psicometricamente. Essas ferramentas são confiáveis (resultados consistentes) e válidas (medem de fato a dor). A atribuição de autoria é essencial para a integridade clínica.</Paragraph>
                <GuidelineTable
                    headers={['Nome da Escala', 'Espécie(s)', 'Uso Principal', 'Autoria Completa e Ano']}
                    rows={[
                        ['Escala de Dor Composta de Glasgow - Formulário Curto (CMPS-SF)', 'Cães', 'Dor Aguda', 'J. Reid, A.M. Nolan, J.M.L. Hughes, et al. (2007)'],
                        ['Escala de Dor da Universidade de Melbourne (UMPS)', 'Cães', 'Dor Aguda', 'A. M. Firth & S. L. Haldane (1999)'],
                        ['Escala Multidimensional Composta de Dor UNESP-Botucatu (MCPS)', 'Gatos', 'Dor Aguda', 'Juliana T. Brondani, Khursheed R. Mama, Stelio P. L. Luna, et al. (2013)'],
                        ['Escala de Expressão Facial Felina (FGS)', 'Gatos', 'Dor Aguda', 'Marina C. Evangelista, Ryota Watanabe, Vivian S. Y. Leung, et al. (2019)'],
                        ['Escala de Dor Aguda Felina da Universidade Estadual do Colorado (CSU-FAPS)', 'Gatos', 'Dor Aguda', 'Hilary Shipley, Alonso Guedes, Lynelle Graham, et al. (2019/2021)'],
                        ['Medidas de Resultado Específicas do Cliente (CSOM)', 'Cães, Gatos', 'Dor Crônica', 'Adaptado para gatos por B. Duncan X. Lascelles et al. (2007)'],
                    ]}
                />

                <SubSectionTitle>1.3. Integrando Escores de Dor no Fluxo de Trabalho Clínico</SubSectionTitle>
                <Paragraph>A utilidade de um escore de dor reside na sua capacidade de guiar a ação terapêutica através de um "limiar de intervenção analgésica". Este valor de corte transforma a avaliação em um componente ativo do manejo do paciente.</Paragraph>
                <Paragraph>Exemplos de limiares:</Paragraph>
                <ul className="list-disc ml-6 mb-4 space-y-1 text-slate-700">
                    <li><Bold>CMPS-SF (Cães):</Bold> ≥6/24 (ou ≥5/20 sem mobilidade).</li>
                    <li><Bold>Feline Grimace Scale (FGS):</Bold> ≥4/10.</li>
                    <li><Bold>UNESP-Botucatu (UCAPS):</Bold> ≥4/12.</li>
                </ul>
                <Paragraph>A aplicação desses limiares estabelece um ciclo de feedback essencial: <Bold>Avaliar → Intervir → Reavaliar</Bold>. Este processo dinâmico garante que a analgesia seja adaptada às necessidades individuais, melhorando significativamente os resultados e o bem-estar.</Paragraph>
                 <SectionTitle>Seção 2: A Base Fisiológica e Farmacológica</SectionTitle>
                 <SubSectionTitle>2.1. A Via Nociceptiva: Uma Jornada em Quatro Estágios</SubSectionTitle>
                 <Paragraph><Bold>Transdução:</Bold> Conversão de um estímulo nocivo em sinal elétrico nos nociceptores.</Paragraph>
                 <Paragraph><Bold>Transmissão:</Bold> Condução do sinal ao longo das fibras nervosas até a medula espinhal.</Paragraph>
                 <Paragraph><Bold>Modulação:</Bold> Amplificação ou supressão do sinal na medula espinhal.</Paragraph>
                 <Paragraph><Bold>Percepção:</Bold> Processamento do sinal no cérebro como a experiência consciente da dor.</Paragraph>

                 <SubSectionTitle>2.2. Classes de Fármacos e Seus Alvos</SubSectionTitle>
                 <Paragraph>A analgesia multimodal utiliza diferentes classes de fármacos para intervir em múltiplos pontos ao longo da via da dor.</Paragraph>
                 <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
                    <li><Bold>AINEs:</Bold> Alvo na <Bold>Transdução</Bold>, inibindo as prostaglandinas no local da lesão.</li>
                    <li><Bold>Anestésicos Locais:</Bold> Alvo na <Bold>Transmissão</Bold>, bloqueando os canais de sódio nos nervos.</li>
                    <li><Bold>Opioides:</Bold> Alvo na <Bold>Modulação e Percepção</Bold>, atuando em receptores no SNC.</li>
                    <li><Bold>Agonistas α2-Adrenérgicos:</Bold> Alvo na <Bold>Modulação e Percepção</Bold>, inibindo a liberação de neurotransmissores.</li>
                    <li><Bold>Antagonistas do Receptor NMDA (Cetamina):</Bold> Alvo na <Bold>Modulação</Bold>, prevenindo a sensibilização central.</li>
                    <li><Bold>Gabapentinoides:</Bold> Alvo na <Bold>Modulação</Bold>, reduzindo a liberação de neurotransmissores excitatórios.</li>
                 </ul>
                 
                 <SectionTitle>Seção 3: Formulários de Analgesia para Caninos</SectionTitle>
                <SubSubSectionTitle>Fase 1: Analgesia Pré-emptiva</SubSubSectionTitle>
                <GuidelineTable headers={['Nível de Dor', 'Fármaco', 'Dose']} rows={[
                    ['Leve a Moderado', 'Butorfanol<br>Buprenorfina<br>Carprofeno/Meloxicam', '0.2-0.4 mg/kg<br>0.01-0.02 mg/kg<br>Doses padrão'],
                    ['Moderado a Severo', 'Metadona<br>Hidromorfona<br>Morfina<br>Dexmedetomidina (Adjuvante)<br>Gabapentina (Adjuvante)', '0.2-0.5 mg/kg<br>0.05-0.1 mg/kg<br>0.3-0.5 mg/kg<br>1-5 µg/kg<br>10-20 mg/kg'],
                ]}/>
                <SubSubSectionTitle>Fase 2: Manutenção Intraoperatória (ITC)</SubSubSectionTitle>
                <GuidelineTable headers={['Técnica', 'Fármaco(s)', 'Taxa de Infusão']} rows={[
                    ['ITC de Opioide', 'Fentanil<br>Remifentanil', '3-10 µg/kg/hora<br>6-18 µg/kg/hora'],
                    ['ITC Multimodal (FLK)', 'Fentanil + Lidocaína + Cetamina', 'Doses variáveis (ver texto completo)'],
                    ['Bloqueios Regionais', 'Bupivacaína 0.5%<br>Ropivacaína 0.5%', 'Dose máxima total: 2 mg/kg<br>Dose máxima total: 3 mg/kg'],
                ]}/>
                <SubSubSectionTitle>Fase 4: Protocolos de Resgate Analgésico</SubSubSectionTitle>
                 <GuidelineTable headers={['Cenário Clínico', 'Ação de Resgate Recomendada']} rows={[
                    ['Paciente em AINE apenas', 'Adicionar Buprenorfina (leve/mod) ou Metadona (mod/severo).'],
                    ['Paciente em Buprenorfina', 'Escalonar para um agonista µ puro (Metadona/Hidromorfona).'],
                    ['Paciente em Agonista µ Puro', 'Re-dosar agonista ou adicionar ITC de Cetamina para dor refratária.'],
                    ['Dor Neuropática/Ortopédica', 'Adicionar Gabapentina ou ITC de Lidocaína.'],
                ]}/>

                 <SectionTitle>Seção 4: Formulários de Analgesia para Felinos</SectionTitle>
                 <SubSubSectionTitle>Fase 1: Analgesia Pré-emptiva</SubSubSectionTitle>
                <GuidelineTable headers={['Nível de Dor', 'Fármaco', 'Dose']} rows={[
                    ['Leve a Moderado', 'Buprenorfina<br>Butorfanol<br>Meloxicam/Robenacoxib', '0.02-0.04 mg/kg<br>0.2-0.4 mg/kg<br>Doses padrão'],
                    ['Moderado a Severo', 'Metadona<br>Hidromorfona<br>Dexmedetomidina (Adjuvante)<br>Gabapentina (Adjuvante)', '0.3-0.5 mg/kg<br>0.025-0.05 mg/kg<br>2-5 µg/kg<br>10-20 mg/kg'],
                ]}/>
                <SubSubSectionTitle>Fase 2: Manutenção Intraoperatória (ITC)</SubSubSectionTitle>
                 <GuidelineTable headers={['Técnica', 'Fármaco(s)', 'Notas Clínicas']} rows={[
                    ['ITC de Opioide', 'Fentanil<br>Remifentanil', 'Monitorar depressão respiratória.<br>Ideal para pacientes críticos.'],
                    ['ITC Multimodal (MLK/FLK)', 'Metadona/Fentanil + Lidocaína + Cetamina', 'USAR LIDOCAÍNA COM EXTREMA CAUTELA EM GATOS.'],
                    ['Bloqueios Regionais', 'Bupivacaína 0.5%', 'Dose máxima total: 1.5 mg/kg. Risco de toxicidade.'],
                ]}/>
                <SubSubSectionTitle>Fase 4: Protocolos de Resgate Analgésico</SubSubSectionTitle>
                 <GuidelineTable headers={['Cenário Clínico', 'Ação de Resgate Recomendada']} rows={[
                    ['Paciente em AINE apenas', 'Adicionar Buprenorfina (leve/mod) ou Metadona (mod/severo).'],
                    ['Paciente em Buprenorfina', 'Escalonar para Metadona; pode ser desafiador.'],
                    ['Paciente em Agonista µ Puro', 'Re-dosar Metadona ou adicionar "microdose" de Dexmedetomidina (1-2 µg/kg IM).'],
                    ['Dor Neuropática', 'Adicionar Gabapentina.'],
                ]}/>
            </div>
        </main>
    </>
);


// --- START: CalculatorScreen ---
interface CalculatorScreenProps {
    onBack: () => void;
    onHome: () => void;
    onInfoClick: (title: string, content: React.ReactNode) => void;
}
const CalculatorScreen: React.FC<CalculatorScreenProps> = ({ onBack, onHome, onInfoClick }) => {
    const [species, setSpecies] = useState<Species | null>(null);
    const [weight, setWeight] = useState('');
    const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
    const [comorbidities, setComorbidities] = useState<Record<Comorbidity, boolean>>({
        liver: false, kidney: false, heart: false, gastro: false
    });
    const [selectedDrugId, setSelectedDrugId] = useState<string>('');
    const [selectedPresentationId, setSelectedPresentationId] = useState<string>('');
    const [selectedDose, setSelectedDose] = useState<number>(0);
    
    const availableDrugs = useMemo(() => {
        if (!species) return [];
        return DRUG_DATA.filter(d => d.species.includes(species));
    }, [species]);

    const selectedDrug = useMemo(() => {
        return DRUG_DATA.find(d => d.id === selectedDrugId);
    }, [selectedDrugId]);
    
    const selectedPresentation = useMemo(() => {
        return selectedDrug?.presentations.find(p => p.id === selectedPresentationId);
    }, [selectedDrug, selectedPresentationId]);

    // Reset drug and presentation when species changes
    useEffect(() => {
        setSelectedDrugId('');
        setSelectedPresentationId('');
    }, [species]);

    // Update dose and presentation when drug changes
    useEffect(() => {
        if (selectedDrug) {
            setSelectedDose(selectedDrug.doseRange.default);
            if (selectedDrug.presentations.length > 0) {
                setSelectedPresentationId(selectedDrug.presentations[0].id);
            } else {
                setSelectedPresentationId('');
            }
        }
    }, [selectedDrug]);

    const handleComorbidityChange = (comorbidity: Comorbidity) => {
        setComorbidities(prev => ({ ...prev, [comorbidity]: !prev[comorbidity] }));
    };

    const calculationResult = useMemo(() => {
        const w = parseFloat(weight);
        if (!w || w <= 0 || !selectedDrug || !selectedPresentation) {
            return null;
        }

        const totalMg = w * selectedDose;
        let finalAmount: number | string;
        let finalUnit: string;

        if (selectedPresentation.concentration.unit === 'mg/tablet') {
            finalAmount = totalMg / selectedPresentation.concentration.value;
            finalUnit = finalAmount > 1 ? 'comprimidos' : 'comprimido';
            finalAmount = finalAmount.toFixed(2);
        } else { // mg/ml
            finalAmount = totalMg / selectedPresentation.concentration.value;
            finalUnit = 'ml';
            finalAmount = finalAmount.toFixed(2);
        }
        
        const adjustmentNotes: { title: string; text: string }[] = [];
        if (selectedDrug.adjustmentFactors) {
            const factors = selectedDrug.adjustmentFactors;
            if (ageGroup !== 'adult' && factors[ageGroup]) {
                adjustmentNotes.push({ title: `Paciente ${ageGroup === 'senior' ? 'Idoso' : ageGroup === 'puppy_kitten' ? 'Filhote' : 'Gestante/Lactante'}`, text: factors[ageGroup]!});
            }
            Object.entries(comorbidities).forEach(([key, value]) => {
                if (value && factors[key as Comorbidity]) {
                    const titleMap: Record<string, string> = { liver: 'Hepatopatia', kidney: 'Nefropatia', heart: 'Cardiopatia', gastro: 'Doença Gastrointestinal' };
                    adjustmentNotes.push({ title: `Comorbidade: ${titleMap[key]}`, text: factors[key as Comorbidity]! });
                }
            });
        }

        return {
            totalMg: totalMg.toFixed(2),
            finalAmount,
            finalUnit,
            adjustmentNotes,
            administrationNotes: selectedDrug.administrationNotes
        };
    }, [weight, selectedDose, selectedDrug, selectedPresentation, ageGroup, comorbidities]);

    const comorbidityInfo = {
        kidney: {
            title: "Considerações para Doença Renal",
            content: (
                <div className="space-y-3">
                    <p><Bold>Risco Principal:</Bold> A maioria dos AINEs pode reduzir o fluxo sanguíneo para os rins, agravando a doença renal existente. Gatos são especialmente sensíveis.</p>
                    <p><Bold>Boas Práticas:</Bold></p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        <li><Bold>Sempre</Bold> realize exames de sangue (Ureia, Creatinina, SDMA) e urinálise antes de iniciar um AINE.</li>
                        <li>Evite AINEs em pacientes com doença renal instável ou desidratados.</li>
                        <li>Opte por analgésicos com menor impacto renal, como opioides (Buprenorfina, Metadona), Gabapentina, ou anticorpos monoclonais (Solensia® para gatos).</li>
                    </ul>
                    <p><Bold>Monitoramento:</Bold> Reavaliar a função renal e a pressão arterial 15-30 dias após iniciar a terapia e, em seguida, a cada 3-6 meses em pacientes crônicos.</p>
                </div>
            )
        },
        liver: {
            title: "Considerações para Doença Hepática",
            content: (
                <div className="space-y-3">
                    <p><Bold>Risco Principal:</Bold> Muitos analgésicos, incluindo AINEs e opioides, são metabolizados pelo fígado. Uma função hepática comprometida pode levar ao acúmulo do fármaco e toxicidade.</p>
                    <p><Bold>Boas Práticas:</Bold></p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Realize um painel bioquímico completo (ALT, AST, FA, GGT, Albumina) antes de iniciar a terapia.</li>
                        <li>Escolha fármacos com menor metabolismo hepático (ex: Gabapentina, Pregabalina) ou que possam ser dosados com menos frequência.</li>
                        <li>Em cães, prefira usar Prednisolona em vez de Prednisona, pois a conversão ocorre no fígado.</li>
                        <li>Reduza a dose ou aumente o intervalo entre as doses para fármacos metabolizados hepaticamente.</li>
                    </ul>
                    <p><Bold>Monitoramento:</Bold> Reavaliar as enzimas hepáticas 30 dias após o início do tratamento e depois periodicamente.</p>
                </div>
            )
        },
        heart: {
            title: "Considerações para Doença Cardíaca",
            content: (
                 <div className="space-y-3">
                    <p><Bold>Risco Principal:</Bold> AINEs podem causar retenção de sódio e água, o que pode descompensar um paciente com Insuficiência Cardíaca Congestiva (ICC). Opioides podem causar bradicardia.</p>
                    <p><Bold>Boas Práticas:</Bold></p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Use AINEs com extrema cautela em pacientes com ICC. Monitore de perto por sinais de edema ou dificuldade respiratória.</li>
                        <li>Evite o uso de AINEs em pacientes que recebem altas doses de diuréticos (ex: furosemida), pois o risco de lesão renal aumenta.</li>
                        <li>Para opioides, use doses mais baixas e monitore a frequência cardíaca. O uso de um anticolinérgico pode ser necessário.</li>
                        <li>Trazodona deve ser usada com muita cautela devido ao risco de arritmias.</li>
                    </ul>
                    <p><Bold>Monitoramento:</Bold> Monitoramento clínico da frequência respiratória em repouso, ausculta cardíaca/pulmonar e pressão arterial.</p>
                </div>
            )
        },
        gastro: {
            title: "Considerações para Doença Gastrointestinal",
            content: (
                <div className="space-y-3">
                    <p><Bold>Risco Principal:</Bold> AINEs inibem prostaglandinas que protegem a mucosa do estômago, aumentando o risco de gastrite, úlceras e sangramento.</p>
                    <p><Bold>Boas Práticas:</Bold></p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        <li><Bold>Contraindicado:</Bold> Não use AINEs em animais com histórico de úlcera ou sangramento gastrointestinal ativo.</li>
                        <li><Bold>Proibido:</Bold> Nunca combine AINEs com corticosteroides (ex: Prednisolona). O risco de perfuração gástrica é altíssimo.</li>
                        <li>Administre sempre os AINEs com uma refeição para minimizar a irritação direta.</li>
                        <li>Considere o uso de AINEs mais seletivos para COX-2 ou alternativas como o Grapiprant.</li>
                        <li>Gastroprotetores (ex: omeprazol) podem ser úteis, mas não eliminam o risco de toxicidade sistêmica.</li>
                    </ul>
                    <p><Bold>Monitoramento:</Bold> O tutor deve ser instruído a observar sinais como vômito, diarreia, fezes escuras (melena) ou perda de apetite e contatar o veterinário imediatamente.</p>
                </div>
            )
        },
    };

    return (
        <>
        <Header title="Calculadora de Doses" onBack={onBack} onHome={onHome}/>
        <main className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <Card className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">1. Dados do Paciente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Espécie</label>
                            <div className="flex rounded-md shadow-sm">
                                <button onClick={() => setSpecies(Species.Dog)} className={`px-4 py-2 text-sm font-medium border border-slate-300 rounded-l-md flex-1 inline-flex items-center justify-center gap-2 ${species === 'dog' ? 'bg-teal-600 text-white border-teal-600 z-10' : 'bg-white text-slate-700 hover:bg-slate-50'}`}><Dog className="h-4 w-4" /> Cão</button>
                                <button onClick={() => setSpecies(Species.Cat)} className={`px-4 py-2 text-sm font-medium border-r border-t border-b border-slate-300 rounded-r-md flex-1 inline-flex items-center justify-center gap-2 ${species === 'cat' ? 'bg-teal-600 text-white border-teal-600 z-10' : 'bg-white text-slate-700 hover:bg-slate-50'}`}><Cat className="h-4 w-4" /> Gato</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-1">Peso (kg)</label>
                            <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 10.5" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                        </div>
                         <div>
                            <label htmlFor="ageGroup" className="block text-sm font-medium text-slate-700 mb-1">Faixa Etária</label>
                            <select id="ageGroup" value={ageGroup} onChange={e => setAgeGroup(e.target.value as AgeGroup)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                                <option value="adult">Adulto</option>
                                <option value="senior">Idoso</option>
                                <option value="puppy_kitten">Filhote</option>
                                <option value="pregnant_lactating">Gestante / Lactante</option>
                            </select>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">Comorbidades</label>
                             <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {(Object.keys(comorbidities) as Comorbidity[]).map(key => {
                                    const comorbidityName = {liver: 'Hepática', kidney: 'Renal', heart: 'Cardíaca', gastro: 'Gástrica'}[key];
                                    const info = comorbidityInfo[key];
                                    return (
                                        <div key={key} className="flex items-center space-x-1">
                                            <input type="checkbox" id={`comorbidity_${key}`} checked={comorbidities[key]} onChange={() => handleComorbidityChange(key)} className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                                            <label htmlFor={`comorbidity_${key}`} className="text-sm cursor-pointer">{comorbidityName}</label>
                                            <InfoButton title={info.title} content={info.content} onInfoClick={onInfoClick} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Card>

                {species && (
                    <Card className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">2. Seleção de Fármaco e Dose</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="drug" className="block text-sm font-medium text-slate-700 mb-1">Fármaco</label>
                                <select id="drug" value={selectedDrugId} onChange={e => setSelectedDrugId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" disabled={!species}>
                                    <option value="" disabled>Selecione um fármaco</option>
                                    {availableDrugs.map(drug => <option key={drug.id} value={drug.id}>{drug.name}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="presentation" className="block text-sm font-medium text-slate-700 mb-1">Apresentação Comercial</label>
                                <select id="presentation" value={selectedPresentationId} onChange={e => setSelectedPresentationId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" disabled={!selectedDrug}>
                                    {selectedDrug?.presentations.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                        </div>
                         {selectedDrug && (
                            <div className="mt-6">
                                <label htmlFor="dose" className="block text-sm font-medium text-slate-700 mb-1">Dose ({selectedDrug.doseRange.unit})</label>
                                 <div className="flex items-center gap-4">
                                   <span className="text-sm text-slate-600">{selectedDrug.doseRange.min}</span>
                                    <input
                                        id="dose"
                                        type="range"
                                        min={selectedDrug.doseRange.min}
                                        max={selectedDrug.doseRange.max}
                                        step={(selectedDrug.doseRange.max - selectedDrug.doseRange.min) / 100}
                                        value={selectedDose}
                                        onChange={(e) => setSelectedDose(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                    />
                                     <span className="text-sm text-slate-600">{selectedDrug.doseRange.max}</span>
                                    <span className="font-bold text-teal-700 text-lg w-20 text-center">{selectedDose.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </Card>
                )}

                {calculationResult && (
                    <Card className="p-6 md:p-8 bg-teal-50 border border-teal-200">
                         <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">3. Resultado</h2>
                         <div className="text-center">
                            <p className="text-slate-600">Dose Total Calculada</p>
                            <p className="text-3xl font-extrabold text-teal-700 my-1">{calculationResult.totalMg} mg</p>
                            <p className="text-slate-600">Administrar</p>
                            <p className="text-5xl font-extrabold text-teal-900 my-2">{calculationResult.finalAmount} <span className="text-3xl font-bold">{calculationResult.finalUnit}</span></p>
                         </div>

                         {calculationResult.adjustmentNotes.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-amber-800 mb-2">⚠️ Atenção: Considerações Clínicas</h3>
                                <div className="space-y-3">
                                {calculationResult.adjustmentNotes.map((note, index) => (
                                    <div key={index} className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-3 rounded-r-lg">
                                        <p className="font-semibold">{note.title}</p>
                                        <p className="text-sm">{note.text}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                         )}

                         <div className="mt-6">
                             <h3 className="text-lg font-bold text-slate-800 mb-2">Notas de Administração</h3>
                             <p className="text-slate-700 bg-slate-100 p-3 rounded-md">{calculationResult.administrationNotes}</p>
                         </div>
                         <div className="mt-6 text-xs text-center p-3 bg-red-100 text-red-800 rounded-lg">
                             <p className="font-bold">AVISO IMPORTANTE</p>
                             <p>Esta calculadora é uma ferramenta de apoio e NÃO substitui o julgamento clínico do Médico Veterinário. As doses devem ser ajustadas com base na avaliação individual do paciente e sua resposta à terapia.</p>
                         </div>
                    </Card>
                )}
            </div>
        </main>
        </>
    );
};
// --- END: CalculatorScreen ---


// Main App Component
const App = () => {
    const [screen, setScreen] = useState<Screen>('home');
    const [species, setSpecies] = useState<Species | null>(null);
    const [painType, setPainType] = useState<PainType | null>(null);
    const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
    const [answers, setAnswers] = useState<Record<string, number | string>>({});
    const [modalScale, setModalScale] = useState<Scale | null>(null);
    const [infoModalContent, setInfoModalContent] = useState<{title: string, content: React.ReactNode} | null>(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
        if (typeof window === 'undefined') return 'dark';
        const saved = window.localStorage.getItem('dorvet-theme-mode');
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('dorvet-theme-mode', themeMode);
        }
    }, [themeMode]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [screen]);


    const handleSelectSpecies = useCallback((s: Species) => {
        setSpecies(s);
        setScreen('painType');
    }, []);

    const handleSelectPainType = useCallback((pt: PainType) => {
        setPainType(pt);
        setScreen('scaleSelect');
    }, []);

    const handleSelectScale = useCallback((sc: Scale) => {
        if (sc.questions.length > 0) {
            setSelectedScale(sc);
            setAnswers({});
            setScreen('assessment');
        }
    }, []);
    
    const handleSubmitAssessment = useCallback((ans: Record<string, number | string>) => {
        setAnswers(ans);
        setScreen('results');
    }, []);

    const handleBack = useCallback(() => {
        setScreen(prev => {
            if (prev === 'results') return 'assessment';
            if (prev === 'assessment') return 'scaleSelect';
            if (prev === 'scaleSelect') return 'painType';
            if (prev === 'painType') return 'home';
            if (prev === 'guide') return 'home';
            if (prev === 'clinicalGuidelines') return 'home';
            if (prev === 'calculator') return 'home';
            return 'home';
        });
    }, []);
    
    const handleRestart = useCallback(() => {
        setScreen('home');
        setSpecies(null);
        setPainType(null);
        setSelectedScale(null);
        setAnswers({});
    }, []);
    
    const handleShowGuide = useCallback((pt: PainType | null) => {
        setPainType(pt); // Set painType context for the guide
        setScreen('guide');
    }, []);
    
    const handleShowClinicalGuidelines = useCallback(() => {
        setScreen('clinicalGuidelines');
    }, []);

    const handleShowCalculator = useCallback(() => {
        setScreen('calculator');
    }, []);
    
    const handleShowDetails = useCallback((scale: Scale) => {
        setModalScale(scale);
    }, []);

    const handleCloseDetailsModal = useCallback(() => {
        setModalScale(null);
    }, []);

    const handleSetInfoModal = useCallback((title: string, content: React.ReactNode) => {
        setInfoModalContent({ title, content });
    }, []);

    const handleCloseInfoModal = useCallback(() => {
        setInfoModalContent(null);
    }, []);

    const result = useMemo(() => {
        if (screen === 'results' && selectedScale) {
            return selectedScale.interpretation(answers);
        }
        return null;
    }, [screen, selectedScale, answers]);

    const navItems = useMemo(() => [
        { screen: 'home' as Screen, disabled: false },
        { screen: 'painType' as Screen, disabled: !species },
        { screen: 'scaleSelect' as Screen, disabled: !species || !painType },
        { screen: 'assessment' as Screen, disabled: !selectedScale },
        { screen: 'results' as Screen, disabled: !result },
        { screen: 'guide' as Screen, disabled: false },
        { screen: 'clinicalGuidelines' as Screen, disabled: false },
        { screen: 'calculator' as Screen, disabled: false },
    ], [species, painType, selectedScale, result]);

    const handleNavigateScreen = useCallback((target: Screen) => {
        const selected = navItems.find((item) => item.screen === target);
        if (selected?.disabled) {
            return;
        }
        setScreen(target);
    }, [navItems]);

    const renderScreen = () => {
        switch (screen) {
            case 'painType':
                return <PainTypeScreen species={species!} onSelectPainType={handleSelectPainType} onBack={handleRestart} />;
            case 'scaleSelect':
                return <ScaleSelectionScreen species={species!} painType={painType!} onSelectScale={handleSelectScale} onShowDetails={handleShowDetails} onBack={handleBack} />;
            case 'assessment':
                return <AssessmentScreen scale={selectedScale!} onSubmit={handleSubmitAssessment} onBack={handleBack} />;
            case 'results':
                return <ResultScreen result={result!} scaleName={selectedScale!.name} painType={painType!} species={species} onRestart={handleRestart} onShowGuide={handleShowGuide} />;
            case 'guide':
                return <GuideScreen onBack={handleRestart} onHome={handleRestart} setModal={handleSetInfoModal} initialPainType={painType} initialSpecies={species} />;
            case 'clinicalGuidelines':
                return <ClinicalGuidelinesScreen onBack={handleRestart} />;
            case 'calculator':
                return <CalculatorScreen onBack={handleBack} onHome={handleRestart} onInfoClick={handleSetInfoModal} />;
            default:
                return <HomeScreen onSelectSpecies={handleSelectSpecies} onShowGuide={() => handleShowGuide(null)} onShowClinicalGuidelines={handleShowClinicalGuidelines} onShowCalculator={handleShowCalculator} />;
        }
    };

    return (
        <div className={`dorvet-shell ${themeMode === 'dark' ? 'dorvet-dark' : 'dorvet-light'}`}>
            <div className="dorvet-aurora" aria-hidden />

            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="dorvet-mobile-menu lg:hidden"
                aria-label="Abrir navegação"
            >
                <Menu className="h-5 w-5" />
            </button>

            <button
                type="button"
                onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                className="dorvet-theme-toggle"
                aria-label={themeMode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
                {themeMode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <aside className="dorvet-sidebar hidden lg:flex">
                <div className="dorvet-sidebar-header">
                    <div className="dorvet-sidebar-logo">
                        <PawIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="dorvet-sidebar-title">Painel Analgesia</p>
                        <p className="dorvet-sidebar-subtitle">Controle de Dor Vet</p>
                    </div>
                </div>

                <nav className="dorvet-sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = SCREEN_ICONS[item.screen];
                        return (
                            <button
                                key={item.screen}
                                type="button"
                                onClick={() => handleNavigateScreen(item.screen)}
                                disabled={item.disabled}
                                className={`dorvet-nav-item ${screen === item.screen ? 'dorvet-nav-item-active' : ''}`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{SCREEN_TITLES[item.screen]}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {sidebarOpen && (
                <div className="dorvet-drawer lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="dorvet-drawer-overlay"
                        aria-label="Fechar navegação"
                    />
                    <aside className="dorvet-drawer-panel">
                        <div className="dorvet-sidebar-header">
                            <div className="dorvet-sidebar-logo">
                                <PawIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="dorvet-sidebar-title">Navegação</p>
                                <p className="dorvet-sidebar-subtitle">Módulo Dor</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                                className="dorvet-drawer-close"
                                aria-label="Fechar menu"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <nav className="dorvet-sidebar-nav">
                            {navItems.map((item) => {
                                const Icon = SCREEN_ICONS[item.screen];
                                return (
                                    <button
                                        key={item.screen}
                                        type="button"
                                        onClick={() => handleNavigateScreen(item.screen)}
                                        disabled={item.disabled}
                                        className={`dorvet-nav-item ${screen === item.screen ? 'dorvet-nav-item-active' : ''}`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{SCREEN_TITLES[item.screen]}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}

            <div className="dorvet-content-wrap">
                <div key={screen} className="dorvet-screen-frame">
                    {renderScreen()}
                </div>
            </div>
            <Modal isOpen={!!modalScale} onClose={handleCloseDetailsModal} title={modalScale?.name}>
                {modalScale?.details && (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Origem e Desenvolvimento</h4>
                            <p className="text-slate-700">{modalScale.details.origin}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Indicações Clínicas</h4>
                            <p className="text-slate-700">{modalScale.details.indications}</p>
                        </div>
                         {modalScale.details.reliability && (
                            <div>
                                <h4 className="font-bold text-lg text-slate-800">Confiabilidade</h4>
                                <p className="text-slate-700">{modalScale.details.reliability}</p>
                            </div>
                        )}
                        {modalScale.details.accuracy && (
                            <div>
                                <h4 className="font-bold text-lg text-slate-800">Acurácia</h4>
                                <p className="text-slate-700">{modalScale.details.accuracy}</p>
                            </div>
                        )}
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Validação e Estudos</h4>
                            <p className="text-slate-700">{modalScale.details.studies}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Qualidade e Pontos Fortes</h4>
                            <p className="text-slate-700">{modalScale.details.quality}</p>
                        </div>
                    </div>
                )}
            </Modal>
             <Modal isOpen={!!infoModalContent} onClose={handleCloseInfoModal} title={infoModalContent?.title}>
                {infoModalContent?.content}
            </Modal>
        </div>
    );
};

export default App;



