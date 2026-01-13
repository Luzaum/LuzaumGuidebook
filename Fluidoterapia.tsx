
import React, { useState, useEffect, useMemo, useCallback } from 'react';

const DROPS_PER_ML_MACRO = 20;
const SECONDS_PER_HOUR = 3600;

const modalData = {
    cardiopata: { title: '❤️ Fisiopatologia do Cardiopata', content: `<p>Em um paciente com insuficiência cardíaca, o coração já opera com dificuldade para bombear o sangue (débito cardíaco reduzido). A administração rápida de grandes volumes de fluido (aumento da pré-carga) sobrecarrega o ventrículo, que não consegue ejetar o volume extra. Isso causa um "represamento" de sangue, aumentando a pressão hidrostática nos capilares pulmonares e forçando o plasma para dentro dos alvéolos, resultando em <strong>edema pulmonar agudo</strong>, uma emergência fatal.</p><p class="text-sm text-gray-900"><em>Referência: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.</em></p>`},
    renal: { title: '💧 Fisiopatologia do Doente Renal Oligúrico', content: `<p>Na doença renal oligúrica/anúrica, os rins perdem a capacidade de filtrar o sangue e produzir urina. Qualquer volume de fluido administrado que exceda as perdas insensíveis (respiração, fezes) não pode ser excretado. Esse volume se acumula na circulação, causando <strong>hipervolemia severa, hipertensão e edema pulmonar</strong>. A prova de carga é um teste para verificar se ainda há alguma função renal responsiva, mas deve ser feita com extrema cautela.</p><p class="text-sm text-gray-900"><em>Referência: 2024 AAHA Fluid Therapy Guidelines.</em></p>`},
    hipoalbuminemia: { title: '📉 Fisiopatologia da Hipoalbuminemia', content: `<p>A albumina é a principal proteína responsável pela <strong>pressão oncótica coloidal (POC)</strong>, a força que mantém o fluido dentro dos vasos sanguíneos. Quando a albumina está baixa (<2.0 g/dL), a POC diminui. A pressão hidrostática, que empurra o fluido para fora, torna-se dominante. Consequentemente, mesmo volumes normais de cristaloides extravasam facilmente para o espaço intersticial, piorando edemas e efusões (ascite, efusão pleural).</p><p class="text-sm text-gray-900"><em>Referência: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.</em></p>`},
    dka: { title: '🍬 Fisiopatologia da Cetoacidose Diabética', content: `<p>A hiperglicemia severa (>250 mg/dL) excede a capacidade de reabsorção dos túbulos renais. A glicose "puxa" água para a urina por osmose, causando uma <strong>diurese osmótica</strong> massiva, que leva à desidratação profunda e perda de eletrólitos (K+, Na+, PO₄). O uso inicial de <strong>NaCl 0.9%</strong> é vital para repor o volume intravascular e o cloreto. A transição para um fluido com dextrose é necessária quando a glicemia baixa, para evitar hipoglicemia iatrogênica enquanto a terapia com insulina continua a resolver a cetose.</p><p class="text-sm text-gray-900"><em>Referência: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.</em></p>`},
    tce: { title: '🧠 Fisiopatologia do Traumatismo Cranioencefálico', content: `<p>A barreira hematoencefálica protege o cérebro. No TCE, essa barreira pode ser rompida. Fluidos hipotônicos (como Ringer Lactato ou D5W) têm menor osmolaridade que o tecido cerebral e podem se mover para dentro das células cerebrais, piorando o <strong>edema cerebral</strong> e aumentando a pressão intracraniana (PIC). A <strong>solução salina hipertônica</strong> funciona ao contrário: ela aumenta a osmolaridade do sangue, "puxando" o excesso de água para fora do cérebro e reduzindo a PIC.</p><p class="text-sm text-gray-900"><em>Referência: 2024 AAHA Fluid Therapy Guidelines.</em></p>`},
    diarreia_hipercloremica: { title: '🚽 Fisiopatologia da Diarreia com Acidose', content: `<p>As secreções intestinais são ricas em bicarbonato (HCO₃⁻), um tampão alcalino. Na diarreia profusa, há grande perda de HCO₃⁻, levando à <strong>acidose metabólica</strong>. O corpo retém cloreto (Cl⁻) para manter a eletroneutralidade, resultando em hipercloremia. Usar NaCl 0.9% (rico em Cl⁻) pioraria a acidose. Fluidos balanceados (Ringer Lactato, Plasmalyte) contêm precursores de bicarbonato (lactato, acetato) que são metabolizados pelo fígado, ajudando a corrigir a acidose.</p><p class="text-sm text-gray-900"><em>Referência: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.</em></p>`},
    vomito_alcalose: { title: '🤮 Fisiopatologia do Vômito com Alcalose', content: `<p>O vômito por obstrução gástrica alta causa a perda de ácido clorídrico (H⁺ e Cl⁻). A perda de H⁺ leva à <strong>alcalose metabólica</strong>, enquanto a perda de Cl⁻ (hipocloremia) impede que os rins corrijam o problema. Para excretar o excesso de bicarbonato, os rins precisam excretar um cátion (como Na⁺), mas para isso precisam reabsorver um ânion. Sem Cl⁻ disponível, a reabsorção de HCO₃⁻ continua, perpetuando a alcalose. O <strong>NaCl 0.9%</strong> fornece o Cl⁻ necessário para que o rim possa excretar o bicarbonato e corrigir a alcalose.</p><p class="text-sm text-gray-900"><em>Referência: Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice, 4th Ed.</em></p>`},
    modalDesidratacao: {
        title: 'Guia Clínico de Desidratação',
        content: `<table class="w-full text-sm text-left text-gray-900"><thead class="text-xs text-gray-900 uppercase bg-gray-100"><tr><th class="px-4 py-2">% Desid.</th><th class="px-4 py-2">Sinais Clínicos</th></tr></thead><tbody><tr class="bg-white border-b"><td class="px-4 py-2 font-medium">&lt; 5%</td><td class="px-4 py-2">Não detectável clinicamente. Histórico de perdas.</td></tr><tr class="bg-gray-50 border-b"><td class="px-4 py-2 font-medium">5-8%</td><td class="px-4 py-2">Leve perda de turgor cutâneo, mucosas pegajosas.</td></tr><tr class="bg-white border-b"><td class="px-4 py-2 font-medium">8-10%</td><td class="px-4 py-2">Perda moderada de turgor, mucosas secas, enoftalmia leve, TPC 2-2.5s.</td></tr><tr class="bg-gray-50 border-b"><td class="px-4 py-2 font-medium">10-12%</td><td class="px-4 py-2">Pele sem elasticidade, enoftalmia acentuada, TPC >2.5s, taquicardia, pulsos fracos.</td></tr><tr class="bg-white"><td class="px-4 py-2 font-medium">&gt; 12%</td><td class="px-4 py-2">Sinais de choque hipovolêmico, mucosas pálidas, TPC >3s, hipotermia.</td></tr></tbody></table>`
    },
    modalPerdas: {
        title: 'Guia de Estimativa de Perdas Ativas',
        content: `<p class="mb-2 text-gray-900">A forma mais precisa é pesar os dejetos (1g ≈ 1mL). Na impossibilidade, use estimativas:</p><ul class="list-disc list-inside text-gray-900 space-y-2"><li><strong>Vômito/Regurgitação:</strong><ul class="list-disc list-inside ml-4"><li>Pequeno porte: 10-30 mL por episódio.</li><li>Médio porte: 30-100 mL por episódio.</li><li>Grande porte: 100-300+ mL por episódio.</li></ul></li><li><strong>Diarreia Líquida:</strong><ul class="list-disc list-inside ml-4"><li>Pequeno porte: 20-50 mL por episódio.</li><li>Médio porte: 50-150 mL por episódio.</li><li>Grande porte: 150-400+ mL por episódio.</li></ul></li><li><strong>Poliúria:</strong> A única forma confiável é a mensuração com cateter urinário e sistema de bolsa coletora fechada.</li></ul><p class="mt-4 text-sm text-gray-900"><strong>Lembrete:</strong> São apenas estimativas. O monitoramento clínico e laboratorial do paciente é fundamental.</p>`
    },
    modalNotasClinicas: {
        title: 'Protocolos para Pacientes de Risco',
        content: `<p class="mb-4 text-sm text-gray-900">A abordagem "low and slow" (baixa taxa e lentamente) é crucial para evitar sobrecarga de volume nestes pacientes.</p><table class="w-full text-sm text-left text-gray-900"><thead class="text-xs text-gray-900 uppercase bg-gray-100"><tr><th class="px-4 py-2">Condição de Risco</th><th class="px-4 py-2">Tempo de Reidratação</th><th class="px-4 py-2">Bolus de Ressuscitação</th></tr></thead><tbody><tr class="bg-white border-b"><td class="px-4 py-2 font-medium">❤️ Cardiopata</td><td class="px-4 py-2">18-24h (ou mais)</td><td class="px-4 py-2">2-5 mL/kg em 20-30 min</td></tr><tr class="bg-gray-50 border-b"><td class="px-4 py-2 font-medium">💧 Doente Renal (Oligúrico)</td><td class="px-4 py-2">18-24h</td><td class="px-4 py-2">5-10 mL/kg em 20-30 min</td></tr><tr class="bg-white border-b"><td class="px-4 py-2 font-medium">🐾 Filhote / Idoso</td><td class="px-4 py-2">18-24h</td><td class="px-4 py-2">5-10 mL/kg em 20-30 min</td></tr><tr class="bg-gray-50"><td class="px-4 py-2 font-medium">📉 Hipoalbuminemia</td><td class="px-4 py-2">18-24h</td><td class="px-4 py-2">Cristaloide (volume reduzido) + Coloide</td></tr></tbody></table>`
    },
    modalTempoBolus: {
        title: 'Guia de Tempo de Infusão de Bolus',
        content: `<p class="mb-4 text-sm text-gray-900">A velocidade de administração do bolus deve ser ajustada à condição do paciente.</p><ul class="list-disc list-inside text-gray-900 space-y-2"><li><strong>15-20 minutos:</strong> Tempo padrão para a maioria dos casos de choque hipovolêmico em pacientes sem comorbidades cardíacas ou renais.</li><li><strong>30 minutos (ou mais):</strong> Recomendado para pacientes de risco (cardiopatas, renais, filhotes, idosos) para permitir a reavaliação da tolerância ao volume e evitar sobrecarga hídrica aguda.</li></ul>`
    }
};

const Modal = ({ id, title, content, onClose }) => (
    <div id={id} className="modal" style={{ display: 'flex' }} role="dialog" aria-modal="true" aria-labelledby={`${id}Title`} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" role="button" aria-label="Fechar" onClick={onClose}>&times;</span>
            <h3 id={`${id}Title`} className="text-xl font-bold mb-4 text-gray-900" dangerouslySetInnerHTML={{ __html: title }}></h3>
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
    </div>
);


const Fluidoterapia = ({ onBack }: { onBack: () => void }) => {
    // --- State ---
    const [especie, setEspecie] = useState<string | null>(null);
    const [peso, setPeso] = useState('');
    const [estadoFisiologico, setEstadoFisiologico] = useState('adulto');
    const [taxaManutencao, setTaxaManutencao] = useState('50');
    const [incluirReidratacao, setIncluirReidratacao] = useState(false);
    const [desidratacao, setDesidratacao] = useState('0');
    const [tempoReidratacao, setTempoReidratacao] = useState('12');
    const [incluirPerdas, setIncluirPerdas] = useState(false);
    const [perdas, setPerdas] = useState('');
    const [comorbidade, setComorbidade] = useState('nenhuma');
    const [condicaoEspecial, setCondicaoEspecial] = useState('nenhuma');
    const [taxaBolus, setTaxaBolus] = useState('15');
    const [tempoBolus, setTempoBolus] = useState('20');
    const [targetHipertonica, setTargetHipertonica] = useState('3');
    const [baseHipertonica, setBaseHipertonica] = useState('250');
    const [doseHipertonica, setDoseHipertonica] = useState('4');

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [collapsibles, setCollapsibles] = useState({
        ressuscitacao: false,
        especificas: false,
        hipertonica: false
    });

    const toggleCollapsible = (key) => {
        setCollapsibles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // --- Memoized Calculations ---
    const manutencaoRange = useMemo(() => {
        switch (estadoFisiologico) {
            case 'filhote': return { min: 80, max: 120 };
            case 'idoso': return { min: 30, max: 50 };
            case 'gestante': return { min: 60, max: 90 };
            case 'obeso': return { min: 30, max: 50 };
            default: return { min: 40, max: 60 };
        }
    }, [estadoFisiologico]);

    useEffect(() => {
        const { min, max } = manutencaoRange;
        if (parseFloat(taxaManutencao) < min || parseFloat(taxaManutencao) > max) {
            setTaxaManutencao(String(Math.round((min + max) / 2)));
        }
    }, [manutencaoRange, taxaManutencao]);

    const results = useMemo(() => {
        const p = parseFloat(peso);
        if (isNaN(p) || p <= 0) return null;

        const tm = parseFloat(taxaManutencao);
        const vManutencao = p * tm;

        let vReidratacao = 0;
        if (incluirReidratacao) {
            const d = parseFloat(desidratacao);
            if (!isNaN(d) && d > 0) {
                vReidratacao = p * d * 1000;
            }
        }

        let vPerdas = 0;
        if (incluirPerdas) {
            const pe = parseFloat(perdas);
            if (!isNaN(pe) && pe > 0) {
                vPerdas = pe;
            }
        }
        
        const vTotal = vManutencao + vReidratacao + vPerdas;

        const tb = parseFloat(taxaBolus);
        const vBolus = p * tb;
        const tBolus = parseInt(tempoBolus, 10);
        const taxaInfusaoBolus = vBolus / (tBolus / 60);

        return { vManutencao, vReidratacao, vPerdas, vTotal, vBolus, taxaInfusaoBolus };
    }, [peso, taxaManutencao, incluirReidratacao, desidratacao, incluirPerdas, perdas, taxaBolus, tempoBolus]);

    // --- Handlers & Effects ---
    const handleSelectSpecies = useCallback((s: string) => {
        setEspecie(s);
        if (s === 'cao') {
            setTaxaBolus('15');
        } else {
            setTaxaBolus('7');
        }
    }, []);
    
    const bolusRange = useMemo(() => especie === 'cao' ? {min: 10, max: 20} : {min: 5, max: 10}, [especie]);
    
    const createRateCard = (title, rateMlHr, description) => {
        if (rateMlHr <= 0) return null;
        const gotasSeg = (rateMlHr / SECONDS_PER_HOUR) * DROPS_PER_ML_MACRO;
        const microGotasMin = rateMlHr;
        return (
            <div className="final-rate-card mt-4">
                <p className="final-rate-title">{title}</p>
                <div className="text-center my-2">
                    <span className="final-rate-value text-gray-900">{rateMlHr.toFixed(1)}</span>
                    <span className="text-gray-900 font-semibold">mL/hora</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-sm text-gray-900">
                    <div><p className="font-bold">{gotasSeg.toFixed(1)}</p><p>gotas/seg (macro)</p></div>
                    <div><p className="font-bold">{microGotasMin.toFixed(1)}</p><p>microgotas/min</p></div>
                </div>
                <p className="text-xs text-center text-gray-900 mt-2">{description}</p>
            </div>
        );
    };

    const rateCards = useMemo(() => {
        if (!results) return null;
        const { vManutencao, vReidratacao, vPerdas } = results;
        const tReidratacao = parseInt(tempoReidratacao, 10);
        const manutencaoHr = vManutencao / 24;
        const perdasHr = vPerdas / 24;
        let cards = [];

        if (vReidratacao > 0) {
            const reidratacaoHr = vReidratacao / tReidratacao;
            const taxaInicial = manutencaoHr + perdasHr + reidratacaoHr;
            const taxaSubsequente = manutencaoHr + perdasHr;
            cards.push(createRateCard(`Taxa Inicial (Primeiras ${tReidratacao} horas)`, taxaInicial, 'Ajuste a bomba de infusão para esta taxa durante o período de reidratação.'));
            if (taxaSubsequente > 0) {
                cards.push(createRateCard(`Taxa Subsequente (Após ${tReidratacao} horas)`, taxaSubsequente, 'Após completar a reidratação, ajuste a bomba para esta taxa de manutenção.'));
            } else {
                cards.push(<div key="final" className="final-rate-card mt-4 text-center"><p className="final-rate-title">Após {tReidratacao}h, a fluidoterapia pode ser descontinuada se o paciente estiver estável e hidratado.</p></div>);
            }
        } else {
            const taxaUnica = manutencaoHr + perdasHr;
            cards.push(createRateCard(`Taxa de Infusão Contínua`, taxaUnica, 'Taxa para manutenção e/ou reposição de perdas contínuas.'));
        }
        return cards;
    }, [results, tempoReidratacao]);

    const hipertonicaResults = useMemo(() => {
        const p = parseFloat(peso);
        const target = parseFloat(targetHipertonica);
        const base = baseHipertonica;
        let preparoHtml = '';
        if (base === 'flaconete') {
            let ratio = (target === 3) ? 8.1 : 1.9;
            preparoHtml = `<div class="result-row"><span class="result-row-label">Receita</span><span class="result-row-value">1 mL NaCl 20% para ${ratio.toFixed(1)} mL NaCl 0.9%</span></div><p class="text-xs text-center text-gray-900 pt-2">Misture na proporção indicada para atingir ${target}%.</p>`;
        } else {
            const baseVolume = parseFloat(base);
            let mlToAdd = (target === 3) ? (baseVolume / 100) * 12.35 : (baseVolume / 100) * 52.8;
            preparoHtml = `<div class="result-row"><span class="result-row-label">1. Remover da bolsa</span><span class="result-row-value">${mlToAdd.toFixed(1)} mL de NaCl 0.9%</span></div><div class="result-row"><span class="result-row-label">2. Adicionar à bolsa</span><span class="result-row-value">${mlToAdd.toFixed(1)} mL de NaCl 20%</span></div><p class="text-xs text-center text-gray-900 pt-2">(Equivalente a ${(mlToAdd / 10).toFixed(1)} ampolas de 10mL)</p>`;
        }

        let adminHtml = '';
        if (isNaN(p) || p <= 0) {
            adminHtml = `<p class="text-center text-gray-900">Insira o peso do paciente.</p>`;
        } else {
            const dose = parseFloat(doseHipertonica);
            const volumeTotal = p * dose;
            const taxaInfusao = volumeTotal / (20 / 60); // Padrão de 20 min
            adminHtml = `<div class="result-row"><span class="result-row-label">💉 Volume a Administrar</span><span class="result-row-value">${volumeTotal.toFixed(1)} mL</span></div><div class="result-row"><span class="result-row-label">⏱️ Taxa de Infusão</span><span class="result-row-value">${taxaInfusao.toFixed(1)} mL/h</span></div><p class="text-xs text-center text-gray-900 pt-2">(Administrar em 15-20 minutos)</p>`;
        }
        return { preparoHtml, adminHtml };
    }, [peso, targetHipertonica, baseHipertonica, doseHipertonica]);
    
    const HelpIcon = ({ modalId, ...props }: { modalId?: string; }) => (
        <span
            className="help-icon"
            role="button"
            aria-label="Abrir guia"
            onClick={(e) => {
                e.stopPropagation();
                if (modalId && modalId !== 'nenhuma' && modalId !== 'saudavel') {
                    setActiveModal(modalId);
                }
            }}
            {...props}
        >
            ?
        </span>
    );
    
    const Collapsible = ({ id, title, children }) => (
        <div className="card mt-4 p-0">
            <div
                id={`${id}Header`}
                className="collapsible-header"
                role="button"
                tabIndex={0}
                aria-expanded={collapsibles[id]}
                aria-controls={`${id}Content`}
                onClick={() => toggleCollapsible(id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCollapsible(id)}
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${collapsibles[id] ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {collapsibles[id] && (
                <div className="collapsible-content" id={`${id}Content`}>
                    {children}
                </div>
            )}
        </div>
    );

    const renderInfoCard = (type, data) => {
      if (!type || type === 'nenhuma' || !data) return <p className="text-center text-gray-900">Selecione uma opção para ver as recomendações.</p>;
      if(type === 'saudavel') {
        return <div className="alert-card alert-info"><p className="font-bold">✅ Protocolo Padrão:</p><ul className="list-disc list-inside text-sm mt-2"><li><strong>Fluido de Escolha:</strong> Cristaloide isotônico balanceado (Ringer Lactato, Plasmalyte).</li><li><strong>Cães:</strong> Bolus de 10-20 mL/kg em 15-20 min. Reavaliar.</li><li><strong>Gatos:</strong> Bolus de 5-10 mL/kg em 15-20 min. Reavaliar.</li></ul></div>
      }
      return (
        <div className={`alert-card ${data.alertClass}`}>
          <p className="font-bold">{data.title}</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            {data.points.map((point, i) => <li key={i} dangerouslySetInnerHTML={{ __html: point }} />)}
          </ul>
        </div>
      );
    };

    const ressuscitacaoInfo = useMemo(() => {
        const infoMap = {
            cardiopata: { alertClass: 'alert-danger', title: '🚨 ALERTA: ALTO RISCO DE SOBRECARGA! 🚨', points: ['<strong>Objetivo:</strong> Aumentar a pré-carga sem causar edema pulmonar.', '<strong>Taxa de Bolus Recomendada:</strong> 2-5 mL/kg. Administrar LENTAMENTE (em 20-30 min).', '<strong>Monitoramento:</strong> Ausculta pulmonar e frequência respiratória contínuas.']},
            renal: { alertClass: 'alert-danger', title: '🚨 ALERTA: RISCO DE SOBRECARGA FATAL! 🚨', points: ['<strong>Objetivo:</strong> Prova de carga para avaliar responsividade renal.', '<strong>Taxa de Bolus Recomendada:</strong> 5-10 mL/kg. Em 20-30 min.', '<strong>Monitoramento:</strong> Avaliar produção de urina. Se não houver resposta, NÃO administrar mais fluidos.']},
            hipoalbuminemia: { alertClass: 'alert-warning', title: '⚠️ Cuidado: Risco de Edema!', points: ['<strong>Objetivo:</strong> Restaurar volume intravascular minimizando extravasamento.', '<strong>Protocolo:</strong> Reduzir o volume do bolus de cristaloide em 25-50%. Considerar o uso de coloides (albumina, plasma).', '<strong>Monitoramento:</strong> Procurar por edema periférico, quimose e efusões.']}
        };
        return renderInfoCard(comorbidade, infoMap[comorbidade]);
    }, [comorbidade]);

    const especificasInfo = useMemo(() => {
        const infoMap = {
            dka: { alertClass: 'alert-info', title: '🍬 Cetoacidose Diabética (CAD)', points: ['<strong>Fluido Inicial:</strong> <strong>NaCl 0.9%</strong>.', '<strong>Protocolo:</strong> Reidratar por 1-2h ANTES de iniciar a insulina.', '<strong>Suplementação:</strong> É <strong>CRUCIAL</strong> suplementar Potássio (KCl) e Fósforo (KPO₄) precocemente.', '<strong>Transição:</strong> Quando a glicemia atingir ~250 mg/dL, trocar para um fluido com dextrose.']},
            tce: { alertClass: 'alert-danger', title: '🧠 Traumatismo Cranioencefálico (TCE) 🚨', points: ['<strong>Objetivo:</strong> Reduzir a pressão intracraniana (PIC).', '<strong>Fluido de Escolha:</strong> <strong>Solução Salina Hipertônica (3% ou 7.5%)</strong>.', '<strong>CONTRAINDICADO:</strong> Fluidos hipotônicos (Ringer Lactato, D5W) são <strong>PROIBIDOS</strong>.']},
            diarreia_hipercloremica: { alertClass: 'alert-info', title: '🚽 Acidose Metabólica Hiperclorêmica', points: ['<strong>Fluido de Escolha:</strong> Solução <strong>balanceada e alcalinizante</strong> (Ringer com Lactato, Plasmalyte).', '<strong>CONTRAINDICADO:</strong> NaCl 0.9% (pioraria a acidose).']},
            vomito_alcalose: { alertClass: 'alert-info', title: '🤮 Alcalose Metabólica Hipoclorêmica', points: ['<strong>Fluido de Escolha:</strong> <strong>NaCl 0.9%</strong>. O alto teor de cloreto é terapêutico.', '<strong>Suplementação:</strong> A suplementação com Cloreto de Potássio (KCl) é quase sempre necessária.']}
        };
        return renderInfoCard(condicaoEspecial, infoMap[condicaoEspecial]);
    }, [condicaoEspecial]);

    const activeModalData = modalData[activeModal];

    return (
        <>
            <style>{`
                .card { background-color: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
                .input-group { margin-bottom: 1.5rem; }
                .input-label { display: block; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
                .input-field { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e0; border-radius: 0.5rem; transition: border-color 0.2s, box-shadow 0.2s; background-color: #fff; color: #111827; }
                .input-field:focus { outline: none; border-color: #4299e1; box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); }
                .input-field.invalid { border-color: #f56565; }
                .input-field.invalid:focus { box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.5); }
                .result-breakdown { background-color: #edf2f7; padding: 1.5rem; border-radius: 0.75rem; margin-top: 1rem; border: 1px solid #e2e8f0; }
                .result-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #cbd5e0; }
                .result-row:last-child { border-bottom: none; }
                .result-row-label { color: #111827; }
                .result-row-value { font-weight: 600; color: #111827; font-size: 1.1rem; }
                .final-rate-card { background-color: #e0f2fe; border: 1px solid #bae6fd; padding: 1rem; border-radius: 0.75rem; margin-top: 1rem; }
                .final-rate-title { font-weight: 700; color: #111827; }
                .final-rate-value { font-size: 1.75rem; font-weight: 700; }
                .help-icon { display: inline-flex; align-items: center; justify-content: center; width: 1.25rem; height: 1.25rem; background-color: #718096; color: white; border-radius: 50%; font-weight: bold; cursor: pointer; margin-left: 0.5rem; user-select: none; transition: background-color 0.2s; }
                .help-icon:hover { background-color: #4a5568; }
                .modal { position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center; }
                .modal-content { background-color: #fefefe; margin: auto; padding: 2rem; border: 1px solid #888; width: 90%; max-width: 600px; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.3); position: relative; max-height: 90vh; overflow-y: auto; color: #111827; }
                .modal-content p { margin-bottom: 1rem; line-height: 1.5; }
                .close-button { color: #111827; position: absolute; right: 1rem; top: 1rem; font-size: 28px; font-weight: bold; cursor: pointer; line-height: 1; }
                .alert-card { padding: 1rem; border-radius: 0.75rem; margin-top: 1rem; }
                .alert-warning { background-color: #fefcbf; border: 1px solid #fef08a; color: #854d0e; }
                .alert-danger { background-color: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; }
                .alert-info { background-color: #e0f2fe; border: 1px solid #bae6fd; color: #0c4a6e; }
                .collapsible-header { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: #e2e8f0; border-radius: 0.5rem; font-weight: 600; color: #111827; }
                .collapsible-content { background-color: #f8fafc; border-radius: 0 0 0.5rem 0.5rem; padding: 1.5rem; }
                .species-btn { padding: 1rem 2rem; font-size: 1.5rem; border-radius: 0.75rem; border: 2px solid transparent; transition: all 0.2s; }
                .species-btn.selected { border-color: #3b82f6; background-color: #dbeafe; color: #111827; }
            `}</style>
             {activeModal && activeModalData && (
                <Modal id={activeModal} title={activeModalData.title} content={activeModalData.content} onClose={() => setActiveModal(null)} />
            )}
            <div>
                    <div className="card mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">1. Selecione a Espécie</h2>
                        <div className="flex justify-center gap-8">
                            <button id="btnCao" className={`species-btn text-gray-900 ${especie === 'cao' ? 'selected' : ''}`} aria-pressed={especie === 'cao'} onClick={() => handleSelectSpecies('cao')}>🐶 Cão</button>
                            <button id="btnGato" className={`species-btn text-gray-900 ${especie === 'gato' ? 'selected' : ''}`} aria-pressed={especie === 'gato'} onClick={() => handleSelectSpecies('gato')}>🐱 Gato</button>
                        </div>
                    </div>
                    {especie && (
                         <main id="mainCalculator">
                            <div className="card grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">2. Dados do Paciente</h2>
                                    <div className="input-group">
                                        <label htmlFor="peso" className="input-label">Peso do Paciente (kg)</label>
                                        <input type="number" id="peso" className={`input-field ${(peso && parseFloat(peso) <= 0) ? 'invalid' : ''}`} placeholder="Ex: 10" min="0.1" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Estado Fisiológico</label>
                                        <select id="estadoFisiologico" className="input-field" value={estadoFisiologico} onChange={e => setEstadoFisiologico(e.target.value)}>
                                            <option value="adulto">Adulto Saudável</option>
                                            <option value="filhote">Filhote / Neonato</option>
                                            <option value="idoso">Idoso</option>
                                            <option value="gestante">Gestante / Lactante</option>
                                            <option value="obeso">Obeso</option>
                                        </select>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 my-6 border-b pb-2">3. Plano de Fluidoterapia</h2>
                                    <div className="input-group">
                                        <label htmlFor="taxaManutencao" className="input-label">Taxa de Manutenção (mL/kg/dia)</label>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-mono text-gray-900">{manutencaoRange.min}</span>
                                            <input type="range" id="taxaManutencao" className="w-full" min={manutencaoRange.min} max={manutencaoRange.max} step="1" value={taxaManutencao} onChange={e => setTaxaManutencao(e.target.value)} />
                                            <span className="font-mono text-gray-900">{manutencaoRange.max}</span>
                                        </div>
                                        <div className="text-center mt-2 font-semibold text-gray-900">
                                            Selecionado: <span>{taxaManutencao}</span> mL/kg/dia
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="incluirReidratacao" className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" checked={incluirReidratacao} onChange={e => setIncluirReidratacao(e.target.checked)} />
                                            <label htmlFor="incluirReidratacao" className="ml-3 input-label cursor-pointer">Incluir Reidratação</label>
                                        </div>
                                        {incluirReidratacao && <div className="mt-4">
                                            <label htmlFor="desidratacao" className="input-label">Grau de Desidratação (%) <HelpIcon modalId="modalDesidratacao" /></label>
                                            <select id="desidratacao" className="input-field mb-4" value={desidratacao} onChange={e => setDesidratacao(e.target.value)}>
                                                <option value="0">Selecione...</option><option value="0.05">5%</option><option value="0.06">6%</option><option value="0.07">7%</option><option value="0.08">8%</option><option value="0.09">9%</option><option value="0.10">10%</option><option value="0.11">11%</option><option value="0.12">12%</option>
                                            </select>
                                            <label htmlFor="tempoReidratacao" className="input-label">Tempo de Reidratação (horas)</label>
                                            <select id="tempoReidratacao" className="input-field" value={tempoReidratacao} onChange={e => setTempoReidratacao(e.target.value)}>
                                                <option value="8">8 horas</option><option value="12">12 horas</option><option value="18">18 horas</option><option value="24">24 horas</option>
                                            </select>
                                            <div className="alert-card alert-warning mt-4 text-sm">
                                                <div className="flex items-center"><p><b>Nota Clínica:</b> Para pacientes de risco, considere estender o tempo de reidratação.</p><HelpIcon modalId="modalNotasClinicas" /></div>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="input-group">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="incluirPerdas" className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" checked={incluirPerdas} onChange={e => setIncluirPerdas(e.target.checked)} />
                                            <label htmlFor="incluirPerdas" className="ml-3 input-label cursor-pointer">Incluir Perdas Ativas</label>
                                        </div>
                                        {incluirPerdas && <div className="mt-4">
                                            <label htmlFor="perdas" className="input-label">Perdas Estimadas (mL/dia)<HelpIcon modalId="modalPerdas" /></label>
                                            <input type="number" id="perdas" className="input-field" placeholder="Ex: 200" min="0" value={perdas} onChange={e => setPerdas(e.target.value)} />
                                        </div>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">4. Plano de Infusão</h2>
                                    <div className="result-breakdown">
                                        <div className="result-row"><span className="result-row-label">💧 Manutenção (24h)</span><span className="result-row-value">{results?.vManutencao.toFixed(1) ?? '0.0'} mL</span></div>
                                        <div className="result-row"><span className="result-row-label">⏳ Reidratação</span><span className="result-row-value">{results?.vReidratacao.toFixed(1) ?? '0.0'} mL (em {tempoReidratacao}h)</span></div>
                                        <div className="result-row"><span className="result-row-label">📉 Perdas Ativas (24h)</span><span className="result-row-value">{results?.vPerdas.toFixed(1) ?? '0.0'} mL</span></div>
                                        <div className="result-row font-bold text-lg bg-gray-200 -mx-6 px-6 py-2"><span className="result-row-label">Σ Volume Total (24h)</span><span className="result-row-value">{results?.vTotal.toFixed(1) ?? '0.0'} mL</span></div>
                                    </div>
                                    <div>{rateCards}</div>
                                </div>
                            </div>
                            <Collapsible id="ressuscitacao" title="⚡ Ressuscitação Volêmica (Choque / Hipovolemia)">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculadora de Bolus</h3>
                                <div className="input-group">
                                    <label htmlFor="taxaBolus" className="input-label">Dose de Bolus (mL/kg)</label>
                                    <div className="flex items-center space-x-4"><span className="font-mono text-gray-900">{bolusRange.min}</span><input type="range" id="taxaBolus" className="w-full" min={bolusRange.min} max={bolusRange.max} step="1" value={taxaBolus} onChange={e => setTaxaBolus(e.target.value)} /><span className="font-mono text-gray-900">{bolusRange.max}</span></div>
                                    <div className="text-center mt-2 font-semibold text-gray-900">Dose Selecionada: <span>{taxaBolus}</span> mL/kg</div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="tempoBolus" className="input-label flex items-center">Tempo de Infusão (minutos) <HelpIcon modalId="modalTempoBolus" /></label>
                                    <select id="tempoBolus" className="input-field" value={tempoBolus} onChange={e => setTempoBolus(e.target.value)}><option value="15">15 minutos</option><option value="20" selected>20 minutos</option><option value="30">30 minutos</option></select>
                                </div>
                                <div className="result-breakdown mb-6">
                                    <div className="result-row"><span className="result-row-label">💉 Volume do Bolus</span><span className="result-row-value">{results?.vBolus.toFixed(1) ?? '0.0'} mL</span></div>
                                    <div className="result-row"><span className="result-row-label">⏱️ Taxa de Infusão</span><span className="result-row-value">{results?.taxaInfusaoBolus.toFixed(1) ?? '0.0'} mL/h</span></div>
                                </div>
                                <div className="alert-card alert-danger text-sm"><p><b>🚨 ATENÇÃO:</b> Pacientes com comorbidades podem ir a óbito. Selecione a comorbidade abaixo caso seu paciente apresente uma para recomendações específicas.</p></div>
                                <div className="input-group mt-6">
                                    <label htmlFor="comorbidade" className="input-label flex items-center">Selecione a Comorbidade <HelpIcon modalId={comorbidade} /></label>
                                    <select id="comorbidade" className="input-field" value={comorbidade} onChange={e => setComorbidade(e.target.value)}><option value="nenhuma">Selecione uma opção...</option><option value="saudavel">✅ Sem comorbidades / Saudável</option><option value="cardiopata">❤️ Cardiopata</option><option value="renal">💧 Doença Renal (Oligúrica)</option><option value="hipoalbuminemia">📉 Hipoalbuminemia Severa</option></select>
                                </div>
                                <div className="mt-4">{ressuscitacaoInfo}</div>
                            </Collapsible>
                            <Collapsible id="especificas" title="🔬 Fluidos para Condições Específicas">
                                <div className="input-group">
                                    <label htmlFor="condicaoEspecial" className="input-label">Selecione a condição clínica para ver as recomendações: <HelpIcon modalId={condicaoEspecial} /></label>
                                    <select id="condicaoEspecial" className="input-field" value={condicaoEspecial} onChange={e => setCondicaoEspecial(e.target.value)}><option value="nenhuma">Selecione uma condição...</option><option value="dka">🍬 Cetoacidose Diabética (CAD)</option><option value="tce">🧠 Traumatismo Cranioencefálico (TCE)</option><option value="diarreia_hipercloremica">🚽 Diarreia com Acidose Hiperclorêmica</option><option value="vomito_alcalose">🤮 Vômito com Alcalose Hipoclorêmica</option></select>
                                </div>
                                <div className="mt-4">{especificasInfo}</div>
                            </Collapsible>
                            <Collapsible id="hipertonica" title="🧪 Calculadora de Salina Hipertônica">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Preparo da Solução</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="input-group"><label htmlFor="targetHipertonica" className="input-label">Concentração Alvo</label><select id="targetHipertonica" className="input-field" value={targetHipertonica} onChange={e => setTargetHipertonica(e.target.value)}><option value="3">3%</option><option value="7.5">7.5%</option></select></div>
                                    <div className="input-group"><label htmlFor="baseHipertonica" className="input-label">Solução Base (NaCl 0.9%)</label><select id="baseHipertonica" className="input-field" value={baseHipertonica} onChange={e => setBaseHipertonica(e.target.value)}><option value="250">Bolsa 250 mL</option><option value="500">Bolsa 500 mL</option><option value="flaconete">Flaconetes 10 mL</option></select></div>
                                </div>
                                <div className="result-breakdown mb-6" dangerouslySetInnerHTML={{ __html: hipertonicaResults.preparoHtml }}></div>
                                <h3 className="text-lg font-semibold text-gray-900 my-4 pt-4 border-t">2. Cálculo de Administração</h3>
                                <div className="input-group"><label htmlFor="doseHipertonica" className="input-label">Dose (mL/kg)</label><div className="flex items-center space-x-4"><span className="font-mono text-gray-900">2</span><input type="range" id="doseHipertonica" className="w-full" min="2" max="5" step="0.5" value={doseHipertonica} onChange={e => setDoseHipertonica(e.target.value)} /><span className="font-mono text-gray-900">5</span></div><div className="text-center mt-2 font-semibold text-gray-900">Dose Selecionada: <span>{doseHipertonica}</span> mL/kg</div></div>
                                <div className="result-breakdown" dangerouslySetInnerHTML={{ __html: hipertonicaResults.adminHtml }}></div>
                                <div className="mt-6 space-y-4"><div className="alert-card alert-warning"><p className="font-bold">🚨 Recomendações e Cuidados</p><ul className="list-disc list-inside text-sm mt-2 space-y-2"><li><strong>Avaliação da PIC:</strong> Monitore sinais do reflexo de Cushing (hipertensão arterial, bradicardia, respiração irregular), anisocoria e alteração do estado mental.</li><li><strong>Administração:</strong> Infundir LENTAMENTE em 15-20 minutos. O uso de acesso venoso central é preferível, mas o periférico é aceitável em emergências.</li><li><strong>Compatibilidade:</strong> NÃO misturar com outros fluidos (especialmente Ringer Lactato) ou medicamentos na mesma linha. Administrar em via exclusiva.</li><li><strong>Desidratação:</strong> A salina hipertônica é para choque hipovolêmico, NÃO para desidratação. Ela piora transitoriamente a desidratação intersticial e deve <strong>SEMPRE</strong> ser seguida por cristaloides isotônicos para reidratar o paciente.</li></ul></div></div>
                            </Collapsible>
                        </main>
                    )}
            </div>
        </>
    );
};

export default Fluidoterapia;
