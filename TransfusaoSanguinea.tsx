import React, { useState, useEffect, useMemo, useCallback } from 'react';

const knowledgeBase = {
    pcv: {
        title: '💡 Volume Globular (VG) / Hematócrito (Ht)',
        content: `<p>O Volume Globular (VG), ou Hematócrito (Ht), representa a porcentagem do volume sanguíneo ocupado pelos eritrócitos. É o principal indicador da capacidade de transporte de oxigênio do sangue.</p><p><strong>Importância Clínica:</strong> A decisão de transfundir não deve se basear apenas em um valor de VG. Sinais clínicos de hipóxia (taquicardia, taquipneia, fraqueza) são indicadores mais importantes. Um paciente com anemia crônica pode estar bem compensado com um VG baixo, enquanto um paciente com perda aguda pode estar em choque com um VG moderado.</p>`
    },
    desired_pcv: {
        title: '🎯 Escolhendo o VG/Ht Desejado e a Fórmula',
        content: `<p>A meta da transfusão não é normalizar o VG/Ht, mas sim <strong>resolver os sinais clínicos de hipóxia</strong> (fraqueza, taquicardia, taquipneia).</p><h4>Parâmetros Comuns:</h4><ul><li><strong>Cães:</strong> Um alvo de 25-28% é geralmente suficiente.</li><li><strong>Gatos:</strong> Um alvo de 20-25% é geralmente suficiente.</li></ul><p>Atingir valores normais (>35%) com uma única transfusão é raramente necessário e aumenta o risco de sobrecarga de volume.</p><h4>Fórmula de Cálculo:</h4><p>O volume necessário é calculado usando a seguinte fórmula:</p><div class="bg-slate-200 p-2 rounded text-center font-mono">Volume (mL) = Vol. Sanguíneo Total × (VG Desejado - VG Atual) / VG da Bolsa</div><p>Onde o <strong>Volume Sanguíneo Total</strong> é estimado como:</p><ul><li><strong>Cães:</strong> 90 mL/kg</li><li><strong>Gatos:</strong> 60 mL/kg</li></ul>`
    },
    phys_state: {
        title: '🧑‍⚕️ Influência do Estado Fisiológico',
        content: `<p>O estado fisiológico do receptor afeta diretamente sua capacidade de tolerar o volume de fluido infundido.</p><ul><li><strong>Filhotes/Pediátricos:</strong> Possuem sistema cardiovascular imaturo e menor reserva funcional.</li><li><strong>Idosos/Geriátricos:</strong> Frequentemente possuem comorbidades subclínicas (cardíacas, renais) e menor elasticidade vascular.</li><li><strong>Obesos:</strong> O excesso de peso aumenta a carga de trabalho cardíaca.</li></ul><p>Para todos esses grupos, o risco de <strong>Sobrecarga Circulatória Associada à Transfusão (TACO)</strong> é significativamente maior. Por isso, a calculadora adota taxas de infusão mais conservadoras (lentas) para garantir a segurança.</p>`
    },
    risk_conditions: {
        title: '⚠️ Entendendo as Condições de Risco',
        content: `<p>Estas condições se referem ao <strong>RECEPTOR</strong> e aumentam criticamente o risco de complicações, exigindo monitoramento e taxas de infusão ajustadas.</p><ul><li><strong>Doença Cardíaca/Renal:</strong> Pacientes com função cardíaca ou renal comprometida têm dificuldade em lidar com o volume adicional. O risco de TACO (edema pulmonar) é altíssimo. As taxas de infusão devem ser as mais baixas possíveis (1-2 mL/kg/h).</li><li><strong>Hemorragia Aguda Ativa:</strong> O paciente está perdendo volume e hemácias simultaneamente. Aqui, o objetivo é repor ambos rapidamente. Taxas mais altas são necessárias para estabilizar o paciente. O uso de Sangue Total é preferível.</li><li><strong>Primeira Transfusão (Cão):</strong> Refere-se a um cão que nunca foi transfundido antes. Embora o risco de uma reação aguda na primeira vez seja baixo (devido à ausência de aloanticorpos pré-formados contra DEA 1), esta transfusão pode <strong>sensibilizar</strong> um cão DEA 1 negativo. Uma futura transfusão com sangue DEA 1 positivo pode ser fatal. É um fator de risco para a <strong>vida futura</strong> do paciente.</li></ul>`
    },
    components: {
        title: '🩸 Terapia com Hemocomponentes',
        content: `<p>A prática moderna preconiza o uso de componentes específicos em vez de sangue total, para maximizar a eficácia e minimizar os riscos.</p><ul><li><strong>Concentrado de Hemácias (CH):</strong> Ideal para anemia em pacientes normovolêmicos ou com risco de sobrecarga de volume (cardiopatas, nefropatas).</li><li><strong>Sangue Total (ST):</strong> Indicado para pacientes com anemia e hipovolemia (perda de volume), como em hemorragias agudas.</li><li><strong>Plasma (PFC/PC):</strong> Usado para repor fatores de coagulação e proteínas. Não corrige anemia.</li></ul>`
    },
    bag_pcv: {
        title: '🎒 VG da Bolsa',
        content: `<p>É o Volume Globular do produto que será transfundido. Este valor é crucial para o cálculo preciso do volume necessário.</p><p><strong>Valores Típicos:</strong></p><ul><li><strong>Concentrado de Hemácias (CH):</strong> 70-80%</li><li><strong>Sangue Total (ST):</strong> 35-45%</li></ul><p>Utilizar o VG real da bolsa, se medido, aumenta a precisão do cálculo.</p>`
    },
    first_transfusion: {
        title: '☝️ O Mito da "Segurança da Primeira Transfusão" em Cães',
        content: `<p>Cães não possuem aloanticorpos naturais clinicamente significativos contra o antígeno mais importante, o DEA 1. Por isso, uma primeira transfusão de sangue DEA 1 positivo para um cão DEA 1 negativo geralmente não causa uma reação aguda.</p><p><strong>O Perigo Oculto:</strong> Esta primeira transfusão atua como um evento de <strong>sensibilização</strong>. O sistema imune do receptor produzirá anticorpos potentes anti-DEA 1. Uma transfusão futura com sangue DEA 1 positivo, mesmo anos depois, causará uma reação hemolítica aguda e potencialmente fatal.</p><p><strong>Conclusão:</strong> A tipagem sanguínea é fortemente recomendada em TODOS os cães para evitar a sensibilização e garantir a segurança a longo prazo.</p>`
    },
    initial_rate_why: {
        title: '🤔 Por que a Taxa Inicial é Lenta?',
        content: `<p>A transfusão começa com uma taxa de teste lenta (ex: 0.25-1 mL/kg/h) nos primeiros 15-30 minutos como uma medida de segurança crítica.</p><p><strong>Fisiologia da Reação:</strong> A maioria das reações transfusionais agudas graves, como a hemolítica ou anafilática, ocorre rapidamente. Iniciar lentamente permite:</p><ul><li><strong>Detecção Precoce:</strong> Observar o paciente para detectar os primeiros sinais de reação (febre, taquicardia, prurido).</li><li><strong>Minimização do Dano:</strong> Se uma reação ocorrer, o volume de hemocomponente incompatível administrado será mínimo, reduzindo a severidade da reação.</li></ul><p>É uma janela de oportunidade para interromper o procedimento antes que danos significativos ocorram.</p><p class="text-sm text-slate-500"><em>Fonte: Consenso TRACS.</em></p>`
    },
    maintenance_rate_why: {
        title: '🤔 Por que a Taxa de Manutenção é Mais Alta?',
        content: `<p>Após o período de teste inicial sem reações, a taxa de infusão é aumentada para garantir que a transfusão seja concluída dentro de um prazo seguro, que não deve exceder <strong>4 horas</strong>.</p><p><strong>O Risco do Tempo:</strong></p><ul><li><strong>Risco de Contaminação Bacteriana:</strong> O sangue à temperatura ambiente é um excelente meio de cultura. O risco de sepse transfusional aumenta significativamente após 4 horas.</li><li><strong>Viabilidade Celular:</strong> A qualidade dos componentes pode se deteriorar com o tempo fora da refrigeração.</li></ul><p>A taxa de manutenção é um equilíbrio entre rapidez e segurança (evitar sobrecarga circulatória).</p><p class="text-sm text-slate-500"><em>Fonte: Davidow, B. (2013). Veterinary Clinics: Small Animal Practice.</em></p>`
    },
    anticoagulants: {
        title: '🧪 Anticoagulantes na Coleta',
        content: `<p>O anticoagulante previne a coagulação quelando o cálcio. A proporção correta é crucial.</p><ul><li><strong>CPDA-1:</strong> Padrão para bolsas de sangue, contém preservativos. Proporção: <strong>1 mL de CPDA-1 para cada 7-9 mL de sangue</strong>.</li><li><strong>Citrato de Sódio (3.2-3.8%):</strong> Para coletas em seringa. Não possui preservativos. Proporção rigorosa: <strong>1 parte de citrato para 9 partes de sangue</strong>.</li></ul>`
    },
    visual_inspection: {
        title: '🧐 Inspeção Visual da Bolsa',
        content: `<p>É um passo vital de controle de qualidade. Uma bolsa com qualquer uma das seguintes alterações <strong>não deve ser utilizada</strong>:</p><ul><li><strong>Descoloração:</strong> Cor roxa/escura ou plasma rosado (hemólise) pode indicar contaminação bacteriana ou dano aos eritrócitos.</li><li><strong>Coágulos:</strong> Indicam falha na anticoagulação e risco de embolia.</li><li><strong>Vazamentos:</strong> Comprometem a esterilidade.</li></ul>`
    },
    warming_blood: {
        title: '🌡️ Aquecimento do Hemocomponente',
        content: `<p>A administração de sangue refrigerado pode causar hipotermia (arritmias, coagulopatias) e dificultar a liberação de oxigênio para os tecidos.</p><p>Aqueça gradualmente a ~37°C. <strong>Cuidado:</strong> O superaquecimento (>40°C) causa hemólise e desnatura proteínas, tornando o produto perigoso.</p>`
    },
    filter_use: {
        title: '🧬 Uso Obrigatório do Filtro',
        content: `<p>O filtro de transfusão (170-260 mícrons) remove "microagregados" (plaquetas, leucócitos, fibrina) que se formam durante o armazenamento.</p><p><strong>Fisiopatologia:</strong> Se infundidos, esses agregados podem causar <strong>embolia pulmonar não trombótica</strong>, levando a dispneia e hipoxemia. O filtro protege a microcirculação pulmonar do paciente.</p>`
    },
    fluid_compatibility: {
        title: '💧 Compatibilidade de Fluidos',
        content: `<p>A escolha do fluido é crítica:</p><ul><li><strong>NaCl 0.9% (Seguro):</strong> Isotônico e sem aditivos que interfiram com o sangue.</li><li><strong>Ringer com Lactato (Contraindicado):</strong> Contém cálcio, que reverte o efeito do anticoagulante citrato, causando a formação de coágulos <strong>dentro do equipo</strong>.</li><li><strong>Soluções Hipotônicas (ex: Dextrose 5%):</strong> Causam lise osmótica (explosão) dos eritrócitos.</li></ul>`
    }
};

const drugsData = [
    { name: 'Difenidramina', indication: 'Reações alérgicas (urticária, prurido).', dose: '1-2 mg/kg, via IM.' },
    { name: 'Prometazina', indication: 'Alternativa à difenidramina para reações alérgicas. Uso controverso, pode causar sedação mais profunda.', dose: '0.2-0.5 mg/kg, via IM ou IV lenta.' },
    { name: 'Epinefrina (Adrenalina)', indication: 'Anafilaxia (choque, dispneia grave).', dose: '0.01 mg/kg, via IV ou IM.' },
    { name: 'Dexametasona', indication: 'Reações alérgicas graves/anafilaxia, suporte em reação hemolítica.', dose: '0.5-1 mg/kg, via IV.' },
    { name: 'Furosemida', indication: 'Sobrecarga circulatória (TACO), suporte em reação hemolítica.', dose: '2-4 mg/kg (TACO) ou 2 mg/kg (hemólise), via IV.' },
    { name: 'Gluconato de Cálcio 10%', indication: 'Toxicidade por citrato (hipocalcemia).', dose: '0.5-1.5 mL/kg (50-150 mg/kg), IV LENTAMENTE (10-20 min) com monitoramento de ECG.' }
];

const reactionsData = [
    { name: 'Reação Hemolítica Aguda (Imunológica)', signs: 'Febre, taquicardia, hipotensão, dispneia, vômito, hemoglobinemia/úria, colapso.', treatment: 'Fluidoterapia IV agressiva para manter a perfusão renal. Furosemida (2 mg/kg IV) se oligúria. Suporte pressor (dopamina/dobutamina).', prevention: 'Tipagem sanguínea e prova de compatibilidade cruzada rigorosas.' },
    { name: 'Reação Alérgica / Anafilática (Imunológica)', signs: 'Urticária, prurido, eritema, edema facial. Em casos graves (anafilaxia): dispneia, hipotensão, vômito.', treatment: 'Leve/Moderada: Difenidramina (1-2 mg/kg IM). Grave/Anafilaxia: Epinefrina (0.01 mg/kg IV ou IM), corticosteroides (Dexametasona 0.5-1 mg/kg IV), fluidoterapia para choque.', prevention: 'Pré-medicação apenas em pacientes com histórico de reação.' },
    { name: 'Reação Febril Não Hemolítica (FNHTR)', signs: 'Aumento da temperatura (>1°C) sem outros sinais de reação grave.', treatment: 'Diminuir a velocidade da transfusão. Administrar antipirético (ex: Dipirona 25 mg/kg em cães). Pode ser reiniciada lentamente se a febre resolver.', prevention: 'Uso de hemocomponentes leucorreduzidos.' },
    { name: 'Sobrecarga Circulatória (TACO)', signs: 'Taquipneia, dispneia, tosse, crepitações pulmonares, distensão da veia jugular.', treatment: 'Furosemida (2-4 mg/kg IV). Oxigenoterapia. Nitroglicerina tópica pode ser considerada.', prevention: 'Taxas de infusão lentas (1-4 mL/kg/h) em pacientes de risco. Uso de CH em vez de sangue total.' },
    { name: 'Contaminação Bacteriana / Sepse', signs: 'Febre alta, tremores, hipotensão, taquicardia, colapso (choque séptico).', treatment: 'Terapia de choque agressiva (fluidos, vasopressores). Antibióticos de amplo espectro IV. Coletar amostras para cultura.', prevention: 'Técnica estritamente asséptica. Não exceder 4 horas de transfusão.' },
    { name: 'Toxicidade por Citrato (Hipocalcemia)', signs: 'Tremores musculares, fasciculações, arritmias cardíacas, hipotensão.', treatment: 'Diminuir drasticamente a velocidade. Gluconato de cálcio 10% (0.5-1.5 mL/kg IV LENTAMENTE) com monitoramento de ECG.', prevention: 'Raro. Infusão lenta, especialmente em neonatos, hepatopatas ou transfusões maciças.' }
];


const TransfusaoSanguinea = ({ onBack }: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState('calculator');
    const [modalTerm, setModalTerm] = useState<string | null>(null);
    
    // --- State for Calculator ---
    const [species, setSpecies] = useState('dog');
    const [weight, setWeight] = useState('');
    const [currentPcv, setCurrentPcv] = useState('');
    const [desiredPcv, setDesiredPcv] = useState('');
    const [product, setProduct] = useState('whole_blood');
    const [bagPcv, setBagPcv] = useState('40');
    const [physState, setPhysState] = useState('adult');
    const [isHighRisk, setIsHighRisk] = useState(false);
    const [isActiveHemorrhage, setIsActiveHemorrhage] = useState(false);
    const [isFirstTransfusionDog, setIsFirstTransfusionDog] = useState(false);
    const [results, setResults] = useState<{ totalVolume: string; initialRate: string; maintenanceRate: string; alerts: any[] } | null>(null);
    const [plasmaDose, setPlasmaDose] = useState<string | null>(null);

    // --- State for Anticoagulant Calculator ---
    const [collectionVolume, setCollectionVolume] = useState('');
    const [anticoagulantType, setAnticoagulantType] = useState('cpda1');
    const [anticoagulantResult, setAnticoagulantResult] = useState<string | null>(null);

    // --- Effects ---
    useEffect(() => {
        const productPcvs = { rbc: '80', whole_blood: '40', plasma: '0' };
        setBagPcv(productPcvs[product]);
    }, [product]);

    useEffect(() => {
        if(species === 'cat') {
            setIsFirstTransfusionDog(false);
        }
    }, [species]);

    // --- Handlers ---
    const handleCalculateTransfusion = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0) {
            alert('Por favor, insira um peso válido.');
            return;
        }

        if (product === 'plasma') {
            const minDose = (10 * w).toFixed(1);
            const maxDose = (20 * w).toFixed(1);
            setPlasmaDose(`${minDose} - ${maxDose} mL`);
            setResults(null);
            return;
        }

        setPlasmaDose(null);
        const cPcv = parseFloat(currentPcv);
        const dPcv = parseFloat(desiredPcv);
        const bPcv = parseFloat(bagPcv);

        if (isNaN(cPcv) || isNaN(dPcv) || isNaN(bPcv) || bPcv <= 0 || cPcv >= dPcv) {
            alert('Por favor, verifique os valores de VG/Ht. O VG desejado deve ser maior que o atual e o VG da bolsa deve ser maior que zero.');
            return;
        }
        
        const bloodVolumePerKg = species === 'dog' ? 90 : 60;
        const totalVolume = bloodVolumePerKg * w * ((dPcv - cPcv) / bPcv);

        const highRiskChecked = isHighRisk || ['pediatric', 'senior', 'obese'].includes(physState);

        let initialRateRange, maintenanceRateRange;
        if (isActiveHemorrhage) {
            initialRateRange = [5, 10];
            maintenanceRateRange = [10, 22];
        } else if (highRiskChecked) {
            initialRateRange = [0.25, 0.5];
            maintenanceRateRange = [1, 4];
        } else {
            initialRateRange = [0.25, 1];
            maintenanceRateRange = [5, 10];
        }

        const initialRate = (initialRateRange[1] * w).toFixed(1);
        const maintenanceRate = (maintenanceRateRange[1] * w).toFixed(1);

        const alerts = [];
        if(highRiskChecked) {
            alerts.push({type: 'warning', text: `<strong>Paciente de Alto Risco:</strong> Taxas de infusão conservadoras (${maintenanceRateRange.join('-')} mL/kg/h) recomendadas devido à condição. Monitore de perto os sinais respiratórios e cardiovasculares.`});
        }
        if(species === 'cat') {
            alerts.push({type: 'danger', text: `<strong>Atenção Felinos:</strong> Tipagem sanguínea é <strong>MANDATÓRIA</strong>. Prova cruzada é fortemente recomendada devido à presença de aloanticorpos naturais potentes e antígenos como o Mik.`});
        }
        if(species === 'dog' && isFirstTransfusionDog) {
            alerts.push({type: 'warning', text: `<strong>Alerta de Sensibilização (Cão):</strong> Esta primeira transfusão sensibilizará um cão DEA 1 negativo. A tipagem sanguínea é fortemente recomendada para preservar futuras opções de transfusão.`});
        }
        
        const finalTotalVolume = totalVolume.toFixed(1);

        setResults({
            totalVolume: finalTotalVolume,
            initialRate,
            maintenanceRate,
            alerts
        });
        
        setCollectionVolume(finalTotalVolume);
    };

    const handleCalculateAnticoagulant = () => {
        const vol = parseFloat(collectionVolume);
        if (!vol || vol <= 0) {
            alert('Insira um volume de coleta válido.');
            return;
        }
        const ratio = anticoagulantType === 'cpda1' ? 7 : 9;
        const anticoagulantVolume = vol / ratio;
        setAnticoagulantResult(`${anticoagulantVolume.toFixed(1)} mL`);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'prep': return <PrepGuideTab openModal={setModalTerm} />;
            case 'crossmatch': return <CrossmatchGuideTab />;
            case 'reactions': return <ReactionsGuideTab />;
            case 'drugs': return <DrugsGuideTab />;
            default: return <CalculatorTab />;
        }
    };

    const HelpIcon = ({ term }) => (
        <span className="help-icon" onClick={(e) => { e.stopPropagation(); setModalTerm(term); }}>?</span>
    );
    
    const Modal = ({ term, onClose }) => {
        if (!term) return null;
        const data = knowledgeBase[term];
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 items-center justify-center p-4 z-50 flex" onClick={onClose}>
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: data.title }}></h3>
                        <button onClick={onClose} className="text-3xl text-slate-500 hover:text-slate-800">&times;</button>
                    </div>
                    <div className="p-6 prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </div>
            </div>
        );
    };

    const CalculatorTab = () => (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 border-b pb-2">Calculadora de Volume e Taxas</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Paciente 🐾</label>
                            <select value={species} onChange={e => setSpecies(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900">
                                <option value="dog">Cão 🐶</option>
                                <option value="cat">Gato 🐱</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-slate-700">Peso (kg)</label>
                            <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900" placeholder="25" />
                        </div>
                        <div>
                            <label htmlFor="current-pcv" className="block text-sm font-medium text-slate-700">VG/Ht Atual (%)<HelpIcon term="pcv" /></label>
                            <input type="number" id="current-pcv" value={currentPcv} onChange={e => setCurrentPcv(e.target.value)} disabled={product === 'plasma'} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900" placeholder="15" />
                        </div>
                        <div>
                            <label htmlFor="desired-pcv" className="block text-sm font-medium text-slate-700">VG/Ht Desejado (%)<HelpIcon term="desired_pcv" /></label>
                            <input type="number" id="desired-pcv" value={desiredPcv} onChange={e => setDesiredPcv(e.target.value)} disabled={product === 'plasma'} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900" placeholder="25" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Hemocomponente 🩸<HelpIcon term="components" /></label>
                            <select id="product" value={product} onChange={e => setProduct(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900">
                                <option value="whole_blood">Sangue Total (ST)</option>
                                <option value="rbc">Concentrado de Hemácias (CH)</option>
                                <option value="plasma">Plasma (PFC/PC)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bag-pcv" className="block text-sm font-medium text-slate-700">VG da Bolsa (%)<HelpIcon term="bag_pcv" /></label>
                            <input type="number" id="bag-pcv" value={bagPcv} onChange={e => setBagPcv(e.target.value)} disabled={product === 'plasma'} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900" placeholder="80" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <fieldset>
                             <label className="text-base font-medium text-slate-800 flex items-center">Estado Fisiológico do Receptor <HelpIcon term="phys_state" /></label>
                            <select value={physState} onChange={e => setPhysState(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900">
                                <option value="adult">Adulto Hígido</option>
                                <option value="pediatric">Filhote/Pediátrico</option>
                                <option value="senior">Idoso/Geriátrico</option>
                                <option value="obese">Obeso</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <legend className="text-base font-medium text-slate-800 flex items-center">Condições de Risco Adicionais <HelpIcon term="risk_conditions" /></legend>
                            <div className="mt-2 space-y-2">
                                <div className="relative flex items-start"><div className="flex h-5 items-center"><input id="cardiac-renal" type="checkbox" checked={isHighRisk} onChange={e => setIsHighRisk(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" /></div><div className="ml-3 text-sm"><label htmlFor="cardiac-renal" className="font-medium text-slate-700">Doença Cardíaca/Renal ❤️</label></div></div>
                                <div className="relative flex items-start"><div className="flex h-5 items-center"><input id="active-hemorrhage" type="checkbox" checked={isActiveHemorrhage} onChange={e => setIsActiveHemorrhage(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" /></div><div className="ml-3 text-sm"><label htmlFor="active-hemorrhage" className="font-medium text-slate-700">Hemorragia Aguda Ativa</label></div></div>
                                {species === 'dog' && <div className="relative flex items-start"><div className="flex h-5 items-center"><input id="first-transfusion-dog" type="checkbox" checked={isFirstTransfusionDog} onChange={e => setIsFirstTransfusionDog(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" /></div><div className="ml-3 text-sm"><label htmlFor="first-transfusion-dog" className="font-medium text-slate-700">Primeira Transfusão (Cão) ☝️<HelpIcon term="first_transfusion" /></label></div></div>}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <button onClick={handleCalculateTransfusion} className="w-full md:w-2/3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-lg">Calcular Volume e Taxas</button>
                </div>
            </div>
            
            {results && (
                <div className="bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-4">Resultados da Transfusão 📈</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg shadow"><p className="text-sm text-slate-500">Volume Total</p><p className="text-3xl font-bold text-blue-600">{results.totalVolume} mL</p></div>
                        <div className="bg-white p-4 rounded-lg shadow"><p className="text-sm text-slate-500 flex items-center justify-center">Taxa Inicial (15-30min)<HelpIcon term="initial_rate_why" /></p><p className="text-2xl font-bold text-blue-600">{results.initialRate} mL/h</p></div>
                        <div className="bg-white p-4 rounded-lg shadow"><p className="text-sm text-slate-500 flex items-center justify-center">Taxa de Manutenção<HelpIcon term="maintenance_rate_why" /></p><p className="text-2xl font-bold text-blue-600">{results.maintenanceRate} mL/h</p></div>
                    </div>
                    {results.alerts.length > 0 && <div className="mt-6">
                        <h4 className="font-semibold text-lg text-amber-800 mb-2">⚠️ Alertas de Segurança</h4>
                        <div className="space-y-2">
                            {results.alerts.map((alert, i) => (
                                <div key={i} className={`p-3 rounded-r-md ${alert.type === 'danger' ? 'bg-red-50 border-l-4 border-red-500 text-red-800' : 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800'}`} dangerouslySetInnerHTML={{ __html: alert.text }}></div>
                            ))}
                        </div>
                    </div>}
                </div>
            )}
            {plasmaDose && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg"><p className="font-bold">💡 Dosagem de Plasma:</p><p>A dose inicial padrão para coagulopatias ou hipoproteinemia é de <strong>10 a 20 mL/kg</strong>. O volume calculado de <strong><span>{plasmaDose}</span></strong> é uma sugestão inicial. Ajuste conforme a resposta clínica e laboratorial.</p></div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-2xl font-semibold text-slate-800 border-b pb-2">Calculadora de Anticoagulante (Coleta)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div><label htmlFor="collection-volume" className="block text-sm font-medium text-slate-700">Volume de Sangue a Coletar (mL)</label><input type="number" id="collection-volume" value={collectionVolume} onChange={e => setCollectionVolume(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900" placeholder="50" /></div>
                    <div><label htmlFor="anticoagulant-type" className="block text-sm font-medium text-slate-700">Tipo de Anticoagulante<HelpIcon term="anticoagulants" /></label><select id="anticoagulant-type" value={anticoagulantType} onChange={e => setAnticoagulantType(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-slate-900"><option value="cpda1">CPDA-1</option><option value="citrate">Citrato de Sódio (3.2-3.8%)</option></select></div>
                    <div><button onClick={handleCalculateAnticoagulant} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">Calcular</button></div>
                </div>
                {anticoagulantResult && <div className="text-center bg-green-50 text-green-800 p-4 mt-4 rounded-lg"><p className="text-lg">Volume de anticoagulante necessário: <strong className="text-xl">{anticoagulantResult}</strong></p></div>}
            </div>
        </div>
    );
    
    return (
        <div className='bg-slate-100 min-h-screen'>
        <style>{`
           .tab-button.active {
                border-bottom-color: #f59e0b;
                color: #f59e0b;
                font-weight: 600;
            }
            .help-icon {
                cursor: pointer;
                font-weight: bold;
                color: #3b82f6;
                margin-left: 5px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background-color: #eff6ff;
                font-size: 14px;
                transition: all 0.2s ease;
                flex-shrink: 0;
            }
            .help-icon:hover {
                background-color: #dbeafe;
                transform: scale(1.1);
            }
            .prose p, .prose ul, .prose ol, .prose blockquote { margin-bottom: 1em; }
            .prose h4 { margin-top: 1.5em; margin-bottom: 0.5em; }
            .prose ul, .prose ol { padding-left: 1.5em; }
            .prose strong { color: #1e293b; }
            .monitoring-item p {
                margin-top: 0.5rem;
                color: #475569;
                font-size: 0.95rem;
            }
        `}</style>
         <Modal term={modalTerm} onClose={() => setModalTerm(null)} />
         <div className="container mx-auto max-w-5xl p-4 sm:p-6 text-slate-800">
             <button onClick={onBack} className="mb-6 bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
                &larr; Voltar para a Lista
            </button>
            <header className="text-center mb-8">
                <img
                    src="https://res.cloudinary.com/dwta1roq1/image/upload/w_200,q_auto,f_auto/logo/transfusao-sanguinea"
                    alt="Logo do aplicativo de banco de sangue veterinário, mostrando um cão e um gato dentro de uma gota de sangue com um eletrocardiograma"
                    className="mx-auto mb-4"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">HemoVet Companion</h1>
                <p className="text-slate-600 mt-2 text-lg">O seu guia clínico completo para a medicina transfusional.</p>
            </header>

            <div className="mb-6 border-b border-slate-200 sticky top-0 bg-slate-100 z-10">
                <nav className="flex -mb-px space-x-4 md:space-x-8 overflow-x-auto">
                    {['calculator', 'prep', 'crossmatch', 'reactions', 'drugs'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-button text-base md:text-lg py-3 px-2 border-b-2 border-transparent font-medium text-slate-600 hover:text-amber-600 hover:border-amber-400 whitespace-nowrap ${activeTab === tab ? 'active' : ''}`}>
                                { {calculator: 'Calculadora 🧮', prep: 'Preparo e Guias 📋', crossmatch: 'Prova Cruzada 🔬', reactions: 'Reações 🚨', drugs: 'Fármacos 💊'}[tab] }
                        </button>
                    ))}
                </nav>
            </div>
            
            <main>
                {renderTabContent()}
            </main>
         </div>
         </div>
    );
};

// --- SUB-COMPONENTS for TABS ---

const PrepGuideTab = ({ openModal }) => {
    const HelpIcon = ({ term }) => <span className="help-icon" onClick={(e) => { e.stopPropagation(); openModal(term); }}>?</span>;
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Guia Prático de Preparo para Transfusão</h3>
                <div className="prose max-w-none">
                    <p>A segurança transfusional começa muito antes da primeira gota. Cada passo é um ponto de controle crítico para prevenir complicações.</p>
                    <h4>1. Verificação e Compatibilidade</h4>
                    <p>Realize uma verificação cruzada rigorosa: confirme a identidade do paciente, o tipo sanguíneo do receptor e da bolsa, e o resultado da prova cruzada. Inspecione visualmente a bolsa: procure por vazamentos, descoloração (tons roxos/escuros podem indicar hemólise ou contaminação bacteriana) e a presença de coágulos grosseiros.<HelpIcon term="visual_inspection" /></p>
                    
                    <div className="mt-6 p-4 border border-slate-200 rounded-lg">
                        <h2 className="text-xl font-semibold text-slate-700 text-center mb-2">Princípios da Transfusão Sanguínea em Caninos</h2>
                        <img src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusao/cao" alt="Infográfico resumindo a transfusão de sangue em cães, com ênfase no sistema DEA 1 e na sensibilização após a primeira transfusão incompatível" style={{width: '100%', borderRadius: '0.5rem'}} />
                    </div>

                    <div className="mt-6 p-4 border border-slate-200 rounded-lg">
                        <h2 className="text-xl font-semibold text-slate-700 text-center mb-2">Princípios da Transfusão Sanguínea em Felinos</h2>
                        <img src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/transfusao/gato" alt="Infográfico resumindo a transfusão de sangue em gatos, com ênfase nos tipos sanguíneos A, B e AB e a importância dos aloanticorpos" style={{width: '100%', borderRadius: '0.5rem'}} />
                    </div>

                    <h4>2. Aquecimento do Hemocomponente</h4>
                    <p>Produtos contendo eritrócitos (CH, ST) devem ser aquecidos gradualmente até a temperatura corporal (~37°C). Use um banho-maria com termômetro ou um aquecedor de fluidos em linha. <strong>NUNCA</strong> use micro-ondas ou água fervente.<HelpIcon term="warming_blood" /></p>
                    <h4>3. Acesso Venoso e Equipamento</h4>
                    <p>Utilize um cateter intravenoso dedicado, de calibre apropriado para o paciente e para a velocidade da infusão. Todos os hemocomponentes devem, obrigatoriamente, ser administrados através de um <strong>equipo de transfusão com filtro</strong> (poro padrão de 170-260 mícrons).<HelpIcon term="filter_use" /></p>
                    <h4>4. Compatibilidade de Fluidos</h4>
                    <p>A única solução cristaloide segura para administrar na mesma linha de uma transfusão é <strong>NaCl 0.9% (solução salina isotônica)</strong>. Fluidos contendo cálcio (ex: Ringer com Lactato) são <strong>absolutamente contraindicados</strong>.<HelpIcon term="fluid_compatibility" /></p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Monitoramento Detalhado do Paciente 🩺</h3>
                <p className="mb-4">Monitore a cada 15 min na 1ª hora, depois a cada 30-60 min até o final.</p>
                <div className="space-y-4 divide-y divide-slate-200">
                     <div className="monitoring-item pt-4 first:pt-0">
                        <strong className="text-lg text-slate-700">🌡️ Temperatura Retal</strong>
                        <p><strong>Como medir:</strong> Use um termômetro retal digital lubrificado.</p>
                        <p><strong>Valores Normais:</strong> Cães e Gatos: 38.0°C a 39.2°C.</p>
                        <p><strong>Relevância na Transfusão:</strong> Um aumento &gt;1°C em relação ao basal é o sinal mais comum de uma reação transfusional (FNHTR, hemolítica, sepse). Hipotermia pode ocorrer com a infusão rápida de sangue frio.</p>
                    </div>
                    <div className="monitoring-item pt-4">
                        <strong className="text-lg text-slate-700">❤️ Frequência Cardíaca (FC) e Qualidade do Pulso</strong>
                        <p><strong>Como medir:</strong> Ausculte o tórax com um estetoscópio ou palpe o pulso femoral (conte as batidas em 15s e multiplique por 4). Avalie a qualidade do pulso (ex: forte, fraco, filiforme).</p>
                        <p><strong>Valores Normais (repouso):</strong> Cães: 60-140 bpm (varia com porte); Gatos: 140-220 bpm.</p>
                        <p><strong>Relevância na Transfusão:</strong> Taquicardia é um sinal precoce de reação hemolítica, anafilaxia ou sobrecarga de volume (TACO). Bradicardia é rara, mas pode ocorrer em colapso.</p>
                    </div>
                    <div className="monitoring-item pt-4">
                        <strong className="text-lg text-slate-700">💨 Frequência e Padrão Respiratório (FR)</strong>
                        <p><strong>Como medir:</strong> Observe os movimentos do tórax (conte em 15s e multiplique por 4). Note o esforço (dispneia) ou sons anormais (tosse).</p>
                        <p><strong>Valores Normais (repouso):</strong> Cães: 10-30 mpm; Gatos: 20-40 mpm.</p>
                        <p><strong>Relevância na Transfusão:</strong> Taquipneia/Dispneia é um sinal crítico de <strong>sobrecarga circulatória (TACO)</strong> ou lesão pulmonar (TRALI). Ausculte o pulmão para detectar crepitações.</p>
                    </div>
                    <div className="monitoring-item pt-4">
                        <strong className="text-lg text-slate-700">👄 Cor das Mucosas e TPC</strong>
                        <p><strong>Como medir:</strong> Levante o lábio e observe a cor da gengiva. Pressione firmemente e conte o tempo para a cor retornar (Tempo de Preenchimento Capilar).</p>
                        <p><strong>Valores Normais:</strong> Mucosas róseas e úmidas; TPC &lt; 2 segundos.</p>
                        <p><strong>Relevância na Transfusão:</strong> Palidez (choque), hiperemia (sepse/anafilaxia), icterícia (hemólise) ou TPC aumentado (&gt;2s) são sinais de alerta importantes.</p>
                    </div>
                    <div className="monitoring-item pt-4">
                        <strong className="text-lg text-slate-700">🩸 Pressão Arterial (PA)</strong>
                        <p><strong>Como medir:</strong> Use métodos Doppler ou oscilométricos com manguito de largura apropriada (40% da circunferência do membro).</p>
                        <p><strong>Valores Normais (Sistólica):</strong> 110-160 mmHg.</p>
                        <p><strong>Relevância na Transfusão:</strong> Hipotensão (PA &lt; 90 mmHg sistólica) é um sinal grave de reação hemolítica, anafilaxia ou sepse. Hipertensão pode ser vista em TACO.</p>
                    </div>
                    <div className="monitoring-item pt-4">
                        <strong className="text-lg text-slate-700">🧠 Estado Mental e Comportamento</strong>
                        <p><strong>Como avaliar:</strong> Observe a interação do paciente com o ambiente. Mudanças sutis como inquietação, ansiedade ou letargia podem ser os primeiros sinais de uma complicação, precedendo alterações nos sinais vitais.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CrossmatchGuideTab = () => (
    <div className="prose max-w-none bg-white p-6 rounded-xl shadow-lg text-gray-900">
        <h3 className="text-2xl font-semibold text-slate-800">Guia Aprofundado: Prova de Compatibilidade Cruzada (Cross-match)</h3>
        <p>A prova cruzada é a sua rede de segurança final. Este guia detalha o método em tubo, considerado o padrão-ouro.</p>
        
        <h4>Materiais Necessários:</h4>
        <ul>
            <li>Amostras de sangue em tubo com EDTA (tampa roxa) e tubo seco (tampa vermelha) do <strong>DOADOR</strong> e do <strong>RECEPTOR</strong>.</li>
            <li>Tubos de ensaio de vidro (12x75 mm), pipetas Pasteur ou micropipetas, centrífuga, microscópio e lâminas.</li>
            <li>Solução salina (NaCl 0.9%).</li>
        </ul>

        <h4>Passo 1: Preparo das Hemácias Lavadas (para Doador e Receptor)</h4>
        <ol>
            <li>Centrifugue o sangue do tubo de EDTA para separar o plasma das hemácias. Descarte o plasma.</li>
            <li>Adicione 2-3 gotas do concentrado de hemácias a um tubo de ensaio.</li>
            <li><strong>Lave as hemácias:</strong> Encha o tubo com salina, tampe e inverta suavemente. Centrifugue a ~1000g (ou ~3000 RPM numa centrífuga padrão) por 1 minuto.</li>
            <li>Aspire cuidadosamente o sobrenadante. Repita a lavagem mais duas vezes (total de 3 lavagens). A lavagem remove proteínas plasmáticas que podem causar pseudoaglutinação.</li>
            <li>Após a última lavagem, prepare uma <strong>suspensão de hemácias a 3-5%</strong>: adicione 0.1 mL do botão de hemácias lavadas a 2 mL de salina. A solução deve ter uma cor vermelho-cereja transparente.</li>
        </ol>

        <h4>Passo 2: Realização das Provas e Controles</h4>
        <p>Para cada tubo, adicione os componentes na ordem listada:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded"><strong>Prova Maior (CRÍTICA):</strong><br/>2 gotas de <strong>soro/plasma do RECEPTOR</strong><br/>+ 1 gota de <strong>suspensão de hemácias do DOADOR</strong></div>
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"><strong>Prova Menor:</strong><br/>2 gotas de <strong>soro/plasma do DOADOR</strong><br/>+ 1 gota de <strong>suspensão de hemácias do RECEPTOR</strong></div>
            <div className="border-l-4 border-gray-400 bg-gray-50 p-4 rounded"><strong>Controle do Receptor:</strong><br/>2 gotas de <strong>soro/plasma do RECEPTOR</strong><br/>+ 1 gota de <strong>suspensão de hemácias do RECEPTOR</strong></div>
            <div className="border-l-4 border-gray-400 bg-gray-50 p-4 rounded"><strong>Controle do Doador:</strong><br/>2 gotas de <strong>soro/plasma do DOADOR</strong><br/>+ 1 gota de <strong>suspensão de hemácias do DOADOR</strong></div>
        </div>
        <p className="mt-4">Os tubos de controle servem para detectar autoaglutinação. Se algum controle for positivo, a interpretação das provas principais é invalidada.</p>

        <h4>Passo 3: Incubação e Leitura</h4>
        <ol>
            <li>Misture e incube todos os tubos por 15-30 minutos à temperatura ambiente.</li>
            <li>Centrifugue levemente (ex: 1000g por 15 segundos) para facilitar a visualização do botão celular.</li>
            <li>
                <strong>Leitura Macroscópica:</strong>
                <p>Examine o sobrenadante e o botão de hemácias. A incompatibilidade é indicada por:</p>
                <ul>
                    <li><strong>Hemólise:</strong> Sobrenadante rosado/vermelho.</li>
                    <li><strong>Aglutinação:</strong> O botão de hemácias não se ressuspende suavemente, formando agregados sólidos ou "grãos de areia".</li>
                </ul>
                <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="text-lg font-semibold text-slate-700">Exemplos de Graus de Aglutinação</h3>
                    <p>A imagem abaixo demonstra os graus de reação. Uma reação de 2+ ou superior é considerada uma incompatibilidade significativa.</p>
                    <img src="https://res.cloudinary.com/dwta1roq1/image/upload/q_auto,f_auto/aglutinacao/transfusao-2" alt="Imagem ilustrando quatro graus de aglutinação macroscópica em testes de compatibilidade sanguínea, de ausente a severa" style={{width: '100%', borderRadius: '0.5rem', marginTop: '1rem'}} />
                </div>
            </li>
            <li><strong>Leitura Microscópica:</strong> Coloque uma gota da mistura em uma lâmina e examine em menor aumento. Procure por cachos de hemácias (como "cachos de uva") para confirmar a microaglutinação. Não confunda com *rouleaux* (empilhamento de moedas), que geralmente se dispersa com uma gota de salina.</li>
        </ol>

        <h4>Passo 4: Interpretação Final</h4>
        <ul>
            <li>✅ <strong>Compatível:</strong> Nenhuma aglutinação ou hemólise na Prova Maior e Menor. Os controles devem ser negativos. A transfusão é considerada segura.</li>
            <li>🚨 <strong>Incompatível:</strong> Presença de aglutinação e/ou hemólise na Prova Maior. <strong>NÃO TRANSFUNDIR!</strong> Isso prediz uma reação hemolítica aguda grave.</li>
            <li>⚠️ <strong>Incompatibilidade Menor:</strong> Uma reação positiva apenas na Prova Menor indica que o plasma do doador tem anticorpos contra as hemácias do receptor. O risco é menor (os anticorpos são diluídos), mas a transfusão deve ser feita com cautela e lentamente, ou um doador diferente deve ser considerado.</li>
        </ul>
        <p className="text-sm text-slate-500"><em>Fonte: Baseado em diretrizes do ACVIM e do livro "Small Animal Transfusion Medicine" (2ª ed.) de Plumb.</em></p>
    </div>
);

const ReactionsGuideTab = () => (
    <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3 text-slate-800">Gerenciador de Reações Agudas 🚨</h3>
            <p className="text-slate-600 mb-4 text-lg">Ao suspeitar de qualquer reação, a primeira ação é <strong>SEMPRE PARAR A TRANSFUSÃO</strong> e manter o acesso IV com NaCl 0.9%.</p>
            <div className="space-y-4">
                {reactionsData.map(reaction => (
                    <div key={reaction.name} className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-semibold text-lg text-red-600">{reaction.name}</h4>
                        <p className="mt-1"><strong>Sinais Clínicos:</strong> {reaction.signs}</p>
                        <p className="mt-1"><strong>Tratamento Específico:</strong> {reaction.treatment}</p>
                        <p className="mt-1"><strong>Prevenção:</strong> {reaction.prevention}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const DrugsGuideTab = () => (
    <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3 text-slate-800">Guia Rápido de Fármacos 💊</h3>
            <div className="divide-y divide-slate-200">
                {drugsData.map(drug => (
                    <div key={drug.name} className="py-4">
                        <h4 className="font-semibold text-lg text-slate-800">{drug.name}</h4>
                        <p className="text-slate-600"><strong>Indicação:</strong> {drug.indication}</p>
                        <p className="text-slate-600"><strong>Dose:</strong> {drug.dose}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default TransfusaoSanguinea;
