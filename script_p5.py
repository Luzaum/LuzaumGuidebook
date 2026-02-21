import sys
from script_p4 import new_component4

new_component5 = """
                {activeTab === 'quiz' && quizCase && (
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-border-dark mt-6">
                        <div className="flex justify-between items-center mb-6 text-slate-900 dark:text-white">
                            <h2 className="text-2xl font-bold">Caso Clínico Interativo</h2>
                            <button type="button" onClick={handleNewQuizCase} className="bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary/20 transition">Gerar Novo Caso</button>
                        </div>
                        <div className="bg-slate-50 dark:bg-input-dark p-4 rounded-lg mb-6 border border-slate-200 dark:border-border-dark">
                            <p className="font-bold text-slate-900 dark:text-white"><strong>Espécie:</strong> {quizCase.inputs.species === 'dog' ? 'Cão 🐕' : 'Gato 🐈'}</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 text-center">
                                {numericQuizKeys.map(key => (
                                    <div key={key} className="bg-white dark:bg-card-dark p-3 rounded-lg border border-slate-200 dark:border-border-dark shadow-sm text-slate-900 dark:text-white font-medium">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide">{key}</div>
                                        <div className="text-lg">{(quizCase.inputs[key as keyof QuizInputs] as number).toFixed(key === 'ph' ? 2 : 1)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <form onSubmit={handleQuizSubmit} className="space-y-8">
                            <QuizQuestion qKey="sampleType" text="1. Qual a origem mais provável da amostra?" options={['arterial', 'venous', 'mista/indeterminada']} {...{quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal}} />
                            <QuizQuestion qKey="diagnosis" text="2. Qual o distúrbio ácido-básico primário?" options={['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória', 'Distúrbio Misto Compensado']} {...{quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal}} />
                            {quizCase.inputs.species === 'dog' && <QuizQuestion qKey="compensation" text="3. Como você classifica a compensação?" options={['Compensado', 'Descompensado (Distúrbio Misto)']} {...{quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal}} />}
                            {Object.entries(quizTherapyOptions).map(([disorderKey, therapy]) => {
                                 if (quizCase.correctAnswers[disorderKey]) {
                                    const qNum = 4 + Object.keys(userAnswers).filter((k: string) => Object.keys(quizTherapyOptions).includes(k)).length;
                                    return <QuizQuestion 
                                        key={disorderKey} 
                                        qKey={disorderKey}
                                        text={`${qNum}. Este paciente tem ${disorderKey.charAt(0).toUpperCase() + disorderKey.slice(1)}. Qual a conduta?`} 
                                        options={[...therapy.incorrect, therapy.correct].sort(() => Math.random() - 0.5)} 
                                        {...{quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal}} 
                                    />;
                                 }
                                 return null;
                            })}
                            <div className="flex justify-center pt-6">
                                <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform">Corrigir Exercício</button>
                            </div>
                        </form>
                    </div>
                )}
            </main>

            {modalData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] transition-opacity p-4" onClick={() => setModalData(null)}>
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-border-dark transform transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-border-dark">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_library</span>
                                {modalData.title}
                            </h3>
                            <button type="button" onClick={() => setModalData(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-input-dark">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: modalData.content }} />
                    </div>
                </div>
            )}
        </div>
    );
};

// --- SUB-COMPONENTS ---
const ResultCard = ({ title, content, emoji, dataKey, openModal, delay }: any) => (
    <div className={`bg-white dark:bg-card-dark p-5 rounded-xl shadow-sm border border-slate-200 dark:border-border-dark flex items-start space-x-4`} style={{animation: `sweep 0.3s ease-in-out ${delay}ms forwards`, opacity: 0}}>
        <div className="text-3xl bg-slate-50 dark:bg-input-dark p-3 rounded-xl border border-slate-100 dark:border-border-dark">{emoji}</div>
        <div className="flex-grow pt-1">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{title}</h3>
                {dataKey && <button type="button" onClick={() => openModal(dataKey)} className="text-xl text-slate-400 hover:text-primary transition-colors ml-2">❓</button>}
            </div>
            <div className="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
);

const ElectrolyteCard = ({ electrolyteStatus, openModal, delay }: any) => {
    if (electrolyteStatus.length === 0) return null;
    return (
        <div className={`bg-white dark:bg-card-dark p-5 rounded-xl shadow-sm border border-slate-200 dark:border-border-dark flex items-start space-x-4`} style={{animation: `sweep 0.3s ease-in-out ${delay}ms forwards`, opacity: 0}}>
            <div className="text-3xl bg-amber-50 dark:bg-amber-900/10 text-amber-500 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">⚡</div>
            <div className="flex-grow pt-1 w-full">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight mb-3">7. Eletrólitos e Proteínas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {electrolyteStatus.map((e: any) => {
                        const isNormal = e.status === 'Normal';
                        const colorClass = isNormal ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30';
                        return (
                            <div key={e.name} className={`p-3 rounded-lg border ${colorClass} flex items-center justify-between text-sm`}>
                                <div>
                                    <div className="font-semibold text-slate-700 dark:text-slate-200">{e.name}</div>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="font-bold text-lg text-slate-900 dark:text-white">{e.value}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{e.unit}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">Ref: {e.ref}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`font-bold text-xs uppercase tracking-wide px-2 py-1 rounded-md bg-white/50 dark:bg-black/20 ${isNormal ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>{e.status}</span>
                                    <button type="button" onClick={() => openModal(e.status.toLowerCase())} className="mt-2 text-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">❓</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const QuizQuestion = ({ qKey, text, options, quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }: any) => {
    const handleSelect = (option: string) => {
        if (quizSubmitted) return;
        setUserAnswers((prev: any) => ({ ...prev, [qKey]: option }));
    };

    const selectedValue = userAnswers[qKey];
    const correctAnswer = quizCase.correctAnswers[qKey];
    const isCorrect = selectedValue === correctAnswer;
    
    const getExplanation = () => {
        let explanationStart = `A resposta correta é <strong>${correctAnswer}</strong>. `;
        if(isCorrect) explanationStart = '';

        switch(qKey) {
            case 'sampleType': return `${explanationStart}O valor de pO₂ (${quizCase.inputs.po2.toFixed(1)} mmHg) é característico de uma amostra <strong>${correctAnswer === 'arterial' ? 'Arterial' : 'Venosa'}</strong>.`;
            case 'diagnosis': return `${explanationStart}A combinação de <strong>${quizCase.inputs.ph < 7.35 ? 'Acidemia' : 'Alcalemia'}</strong> com a alteração primária em ${correctAnswer.includes('Metabólica') ? 'HCO₃⁻' : 'pCO₂'} caracteriza <strong>${correctAnswer}</strong>.`;
            case 'compensation': return `${explanationStart}A análise da resposta compensatória indica um quadro <strong>${correctAnswer}</strong>.`;
            default: return explanationStart;
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark">
            <p className="font-semibold text-slate-800 dark:text-white mb-4 text-lg">{text}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((opt: string) => {
                    let classes = 'text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-border-dark p-4 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-input-dark transition-all font-medium flex items-center gap-3';
                    let icon = <div className="size-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0"></div>;
                    
                    if (quizSubmitted) {
                        if (opt === correctAnswer) {
                            classes = 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300 font-bold p-4 rounded-xl flex items-center gap-3';
                            icon = <span className="material-symbols-outlined text-green-500 text-xl flex-shrink-0">check_circle</span>;
                        } else if (opt === selectedValue && !isCorrect) {
                            classes = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300 font-bold p-4 rounded-xl flex items-center gap-3';
                            icon = <span className="material-symbols-outlined text-red-500 text-xl flex-shrink-0">cancel</span>;
                        }
                    } else if (opt === selectedValue) {
                        classes = 'bg-blue-50 dark:bg-primary/10 border-primary text-primary font-bold p-4 rounded-xl flex items-center gap-3';
                        icon = <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">radio_button_checked</span>;
                    }
                    return <div key={opt} className={classes} onClick={() => handleSelect(opt)}>{icon}{opt}</div>;
                })}
            </div>
            {quizSubmitted && (
                 <div className="mt-4 animate-[sweep_0.3s_ease-in-out]">
                    <div className={`p-4 rounded-lg flex items-start gap-4 ${isCorrect ? 'bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'}`}>
                        <span className="material-symbols-outlined text-2xl mt-1">{isCorrect ? 'task_alt' : 'error'}</span>
                        <div className="flex-grow">
                            <p className="font-bold mb-1">{isCorrect ? 'Correto!' : 'Incorreto.'}</p>
                            <p className="text-sm opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: getExplanation() }} />
                        </div>
                        {explanationData[qKey as keyof typeof explanationData] && <button type="button" onClick={() => openModal(qKey)} className="p-2 bg-white/50 dark:bg-black/20 rounded-lg hover:bg-white dark:hover:bg-black/40 transition-colors tooltip flex-shrink-0" title="Ler mais sobre isso"><span className="material-symbols-outlined">menu_book</span></button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hemogasometria;
"""

try:
    with open(r"c:\PROJETOS VET\Vetius\Hemogasometria.tsx", "r", encoding="utf-8") as f:
        original = f.read()

    start_idx = original.find('const Hemogasometria = ({ onBack }')
    if start_idx == -1:
        print("Could not find start index")
        sys.exit()

    with open(r"c:\PROJETOS VET\Vetius\p1.txt", "r", encoding="utf-8") as f: p1 = f.read()
    with open(r"c:\PROJETOS VET\Vetius\p2.txt", "r", encoding="utf-8") as f: p2 = f.read()
    with open(r"c:\PROJETOS VET\Vetius\p3.txt", "r", encoding="utf-8") as f: p3 = f.read()

    replaced_content = original[:start_idx] + p1 + p2 + p3 + new_component4 + new_component5

    with open(r"c:\PROJETOS VET\Vetius\Hemogasometria.tsx", "w", encoding="utf-8") as f:
        f.write(replaced_content)

    print("Replacement complete")

except Exception as e:
    print(f"Error: {e}")
