
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- DATA & CONFIGURATION ---

const ref = {
    dog: {
        arterial: { pco2: { min: 30.8, max: 42.8 }, po2: { min: 80.9, max: 103.3 } },
        venous: { pco2: { min: 33.6, max: 41.2 }, po2: { min: 49, max: 67 } },
        na: { min: 140, max: 150 }, k: { min: 3.9, max: 5.1 }, cl: { min: 110, max: 124 },
        albumin: { min: 2.3, max: 3.1, ideal: 2.7 }, anionGap: { min: 12, max: 25 },
        hco3: { min: 18.8, max: 25.6, ideal: 22.2 }, pco2_comp: 36.8, temp: { min: 38.0, max: 39.2 },
        glucose: { min: 86, max: 118 }, lactate: { min: 0.3, max: 2.5 }, ionizedCalcium: { min: 1.12, max: 1.40 },
        magnesium: { min: 1.9, max: 2.5 }, tco2: { min: 20, max: 29 }, hematocrit: { min: 40, max: 55 },
        hemoglobin: { min: 14, max: 19 }, so2: { min: 90, max: 100 }, be: { min: -4, max: 4 }
    },
    cat: {
        arterial: { pco2: { min: 25.2, max: 36.8 }, po2: { min: 95.4, max: 118.2 } },
        venous: { pco2: { min: 32.7, max: 44.7 }, po2: { min: 49, max: 67 } },
        na: { min: 145, max: 155 }, k: { min: 3.5, max: 5.1 }, cl: { min: 110, max: 124 },
        albumin: { min: 2.9, max: 4.2, ideal: 3.5 }, anionGap: { min: 13, max: 31 },
        hco3: { min: 14.4, max: 21.6, ideal: 18.0 }, pco2_comp: 31.0, temp: { min: 38.0, max: 39.2 },
        glucose: { min: 63, max: 118 }, lactate: { min: 0.4, max: 2.4 }, ionizedCalcium: { min: 1.20, max: 1.32 },
        magnesium: { min: 1.5, max: 2.5 }, tco2: { min: 15, max: 21 }, hematocrit: { min: 30, max: 50 },
        hemoglobin: { min: 10, max: 16 }, so2: { min: 90, max: 100 }, be: { min: -5, max: 3 }
    }
};

const normalInputPresets = {
    dog: {
        species: 'dog',
        declaredSampleType: 'arterial',
        fio2: '21',
        ph: '7.40',
        pco2: '36.8',
        hco3: '22.2',
        po2: '95.0',
        temp: '38.5',
        na: '145',
        k: '4.5',
        cl: '117',
        albumin: '2.7',
        glucose: '100',
        lactate: '1.2',
        be: '0',
        so2: '98',
        tco2: '24',
        ionizedCalcium: '1.25',
        magnesium: '2.2',
        hematocrit: '45',
        hemoglobin: '15'
    },
    cat: {
        species: 'cat',
        declaredSampleType: 'arterial',
        fio2: '21',
        ph: '7.39',
        pco2: '31.0',
        hco3: '18.0',
        po2: '108.0',
        temp: '38.4',
        na: '152',
        k: '4.2',
        cl: '120',
        albumin: '3.5',
        glucose: '92',
        lactate: '1.1',
        be: '0',
        so2: '98',
        tco2: '18',
        ionizedCalcium: '1.24',
        magnesium: '2.0',
        hematocrit: '37',
        hemoglobin: '13'
    }
} as const;

const analyzerSections = [
    { id: 'overview', label: 'Visao geral', icon: 'space_dashboard' },
    { id: 'patient-card', label: 'Parametros iniciais', icon: 'monitor_heart' },
    { id: 'results-panel', label: 'Resultados', icon: 'analytics' },
    { id: 'quiz-panel', label: 'Modo quiz', icon: 'school' },
    { id: 'collection-guide', label: 'Boas praticas', icon: 'menu_book' }
];

const quizTherapyOptions = {
    hipernatremia: { correct: 'Fluidoterapia com solução hipotônica (ex: Dextrose 5%)', incorrect: ['Fluidoterapia com NaCl 0.9%', 'Administrar Furosemida', 'Administrar solução salina hipertônica', 'Restrição hídrica'] },
    hiponatremia: { correct: 'Cálculo do déficit de Na⁺ e reposição com NaCl 3% ou 7.5%', incorrect: ['Fluidoterapia com Dextrose 5%', 'Administrar Espironolactona', 'Reposição rápida com bolus de salina hipertônica', 'Restrição hídrica'] },
    hipocalemia: { correct: 'Adicionar KCl à fluidoterapia (taxa máxima de 0.5 mEq/kg/h)', incorrect: ['Administrar Gluconato de Cálcio', 'Administrar Furosemida em bolus', 'Administrar Insulina + Glicose', 'Administrar KCl em bolus EV'] },
    hipercalemia: { correct: 'Administrar Gluconato de Cálcio 10% e/ou Insulina + Glicose', incorrect: ['Adicionar KCl à fluidoterapia', 'Administrar Espironolactona', 'Fluidoterapia com Ringer com Lactato', 'Administrar AINEs'] },
    hipocloremia: { correct: 'Fluidoterapia com NaCl 0.9% para repor Cl⁻', incorrect: ['Fluidoterapia com Ringer com Lactato', 'Administrar Bicarbonato de Sódio', 'Administrar Furosemida', 'Restrição de sal'] },
    hipoalbuminemia: { correct: 'Transfusão de plasma fresco congelado ou albumina humana (com cautela)', incorrect: ['Administrar Furosemida para tratar edema', 'Fluidoterapia com cristaloides em altas taxas', 'Administrar Hetastarch sem reposição de albumina', 'Dieta hiperproteica como única medida'] },
    hipertermia: { correct: 'Resfriamento ativo (fluidos IV, ventoinhas, compressas úmidas) até 39.5°C', incorrect: ['Administrar AINEs imediatamente', 'Banhos em álcool', 'Imersão em água gelada', 'Esperar resolução espontânea'] },
    hipotermia: { correct: 'Reaquecimento passivo (cobertores) ou ativo (mantas térmicas, fluidos aquecidos)', incorrect: ['Reaquecimento rápido com fontes de calor radiante direto na pele', 'Administrar antitérmicos', 'Banhos quentes', 'Não intervir'] }
};

const explanationData = {
    sampleType: { title: 'Fisiologia da Origem da Amostra', content: `<p>A principal diferença entre o sangue arterial e o venoso reside na troca gasosa que ocorre nos tecidos.</p><div class="flowchart-box">Sangue Arterial chega aos tecidos (rico em O₂, pobre em CO₂)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Células consomem O₂ e produzem CO₂ (metabolismo)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Sangue Venoso deixa os tecidos (pobre em O₂, rico em CO₂)</div><p>Portanto, uma <strong>pO₂ alta (>80 mmHg)</strong> indica que o sangue acabou de passar pelos pulmões e ainda não entregou oxigênio, sendo característico de uma <strong>amostra arterial</strong>. Uma <strong>pO₂ baixa (<60 mmHg)</strong> indica que o sangue já passou pelos tecidos, sendo uma <strong>amostra venosa</strong>.</p>` },
    diagnosis: { title: 'Identificação do Distúrbio Primário', content: `<p>A abordagem sistemática para identificar o distúrbio primário segue a relação entre o pH e os componentes metabólico (HCO₃⁻) e respiratório (pCO₂).</p><div class="flowchart-box">1. Avaliar o pH: Acidemia (<7.35) ou Alcalemia (>7.45)?</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">2. Verificar qual componente (pCO₂ ou HCO₃⁻) justifica a alteração do pH.</div><p><strong>Exemplo em Acidemia (pH baixo):</strong></p><ul class="list-disc list-inside"><li>Se o <strong>pCO₂ estiver alto</strong>, a causa é respiratória (hipoventilação retém CO₂ ácido). → <strong>Acidose Respiratória</strong>.</li><li>Se o <strong>HCO₃⁻ estiver baixo</strong>, a causa é metabólica (perda de base ou ganho de ácido). → <strong>Acidose Metabólica</strong>.</li></ul><p>O mesmo raciocínio se aplica à alcalemia, mas com as alterações inversas.</p>` },
    compensation: { title: 'Fisiologia da Compensação Ácido-Base', content: `<p>O corpo tenta manter o pH sanguíneo em uma faixa estreita (7.35-7.45) usando dois sistemas principais: o respiratório (pulmões) e o metabólico (rins).</p><p>Quando um sistema causa um distúrbio (ex: acidose <strong>metabólica</strong> por perda de bicarbonato), o outro sistema tenta compensar para normalizar o pH.</p><div class="flowchart-box">Distúrbio Primário: Acidose Metabólica (↓ HCO₃⁻) → ↓ pH</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Resposta Compensatória: O centro respiratório é estimulado → Aumento da frequência respiratória (hiperventilação)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Resultado: Mais CO₂ é eliminado → ↓ pCO₂ → Tenta aumentar o pH de volta ao normal</div><p>Um distúrbio é <strong>compensado</strong> se a resposta do sistema oposto for a esperada (calculada por fórmulas). Se a resposta for maior ou menor que o esperado, indica que há um <strong>segundo distúrbio ocorrendo simultaneamente</strong> (distúrbio misto), e a condição é considerada <strong>descompensada</strong>.</p>` },
    hipernatremia: { title: 'Correção da Hipernatremia', content: `<p>A hipernatremia indica um excesso de sódio em relação à água corporal, resultando em hipertonicidade do plasma.</p><div class="flowchart-box">Hipernatremia (↑ Na⁺) → Aumento da Osmolalidade Plasmática</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Água sai das células (especialmente neurônios) por osmose → Desidratação celular</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Sinais neurológicos (letargia, convulsões)</div><p>O objetivo do tratamento é <strong>reduzir a tonicidade plasmática de forma lenta e controlada</strong>. Isso é feito administrando "água livre" (água sem excesso de solutos), que diluirá o sódio sérico e reidratará as células. <strong>Soluções hipotônicas como Dextrose 5% em água (D5W)</strong> são ideais, pois a glicose é rapidamente metabolizada, restando apenas água. A correção rápida demais pode causar edema cerebral, sendo uma complicação grave.</p>` },
    hiponatremia: { title: 'Correção da Hiponatremia', content: `<p>A hiponatremia sintomática (especialmente a aguda) é uma emergência neurológica. O tratamento visa aumentar o sódio sérico de forma controlada para evitar a mielinólise pontina.</p><p>A fórmula para calcular o déficit de sódio é: <strong>Déficit de Na⁺ (mEq) = (Na⁺ desejado - Na⁺ do paciente) x 0.6 x Peso (kg)</strong>.</p><p>Este déficit é então reposto lentamente ao longo de várias horas, geralmente utilizando soluções salinas hipertônicas (NaCl 3% ou 7.5%). A velocidade de correção não deve exceder 0.5 mEq/L/hora para evitar danos neurológicos.</p>` },
    hipercalemia: { title: 'Correção da Hipercalemia', content: `<p>A hipercalemia é uma emergência médica devido ao seu efeito sobre o potencial de membrana das células cardíacas, aumentando o risco de arritmias fatais.</p><div class="flowchart-box">Hipercalemia (↑ K⁺) → Reduz o gradiente de potássio transmembrana</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Despolarização parcial da célula cardíaca → Inativação dos canais de sódio</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Condução elétrica lenta → Bradicardia, bloqueios, parada cardíaca</div><p>O tratamento tem dois objetivos imediatos:</p><ol class="list-decimal list-inside"><li><strong>Cardioproteção:</strong> Administrar <strong>Gluconato de Cálcio 10%</strong>. O cálcio não baixa o potássio, mas antagoniza seus efeitos na membrana cardíaca, estabilizando o coração.</li><li><strong>Redução do K⁺ sérico:</strong> Administrar <strong>Insulina + Glicose</strong>. A insulina empurra o potássio para dentro das células, removendo-o rapidamente do plasma. A glicose é dada junto para prevenir hipoglicemia.</li></ol>` },
    hipocalemia: { title: 'Correção da Hipocalemia', content: `<p>A hipocalemia causa hiperpolarização das células musculares e nervosas, levando à fraqueza muscular (incluindo ventroflexão cervical em gatos e fraqueza dos músculos respiratórios) e íleo paralítico.</p><p>A reposição deve ser feita de forma cautelosa para evitar hipercalemia iatrogênica. A regra geral é <strong>nunca exceder a taxa de infusão de 0.5 mEq de K⁺/kg/hora</strong>. O potássio (KCl) é sempre diluído em fluidos de manutenção e nunca administrado em bolus.</p><p>A quantidade a ser adicionada na bolsa de fluido depende da severidade da hipocalemia, seguindo tabelas de reposição padrão.</p>` },
    hipocloremia: { title: 'Correção da Hipocloremia', content: `<p>A hipocloremia (↓ Cl⁻) está frequentemente associada à <strong>alcalose metabólica</strong>, especialmente em casos de vômito (perda de HCl). O cloro é necessário para que os rins possam excretar o excesso de bicarbonato (HCO₃⁻) e corrigir a alcalose.</p><div class="flowchart-box">Vômito → Perda de HCl</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">↓ Cl⁻ e ↑ HCO₃⁻ no plasma (Alcalose Metabólica)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Rim tenta reabsorver Na⁺, mas sem Cl⁻ suficiente para acompanhar, reabsorve HCO₃⁻ no lugar</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Perpetuação da Alcalose Metabólica</div><p>O tratamento consiste em fornecer uma fonte de cloro. A <strong>fluidoterapia com Cloreto de Sódio 0.9% (NaCl 0.9%)</strong> é a escolha ideal, pois repõe tanto o volume quanto o cloro, permitindo que os rins excretem o bicarbonato e corrijam o pH.</p>` },
    hipoalbuminemia: { title: 'Manejo da Hipoalbuminemia', content: `<p>A albumina é a principal proteína responsável pela pressão oncótica coloidal (POC), a força que mantém os fluidos dentro dos vasos sanguíneos.</p><div class="flowchart-box">Hipoalbuminemia (↓ Albumina) → ↓ Pressão Oncótica Coloidal</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Forças de Starling desequilibradas → Pressão hidrostática supera a oncótica</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Extravasamento de fluido para o interstício → Edema e Efusões (ascite, derrame pleural)</div><p>O tratamento definitivo é corrigir a causa base (perda renal, hepática, gastrointestinal). Para suporte, a reposição da POC é crucial. A <strong>transfusão de plasma fresco congelado</strong> fornece albumina e outros fatores. A <strong>albumina humana 25%</strong> é mais concentrada, mas carrega risco de reações de hipersensibilidade e deve ser usada com extrema cautela e monitoramento intensivo. Cristaloides em excesso podem piorar o edema.</p>` },
    hipertermia: { title: 'Manejo da Hipertermia', content: `<p>A hipertermia (>39.2°C) grave pode levar à desnaturação de proteínas, falência de múltiplos órgãos e coagulação intravascular disseminada (CIVD).</p><p>O objetivo é o <strong>resfriamento controlado</strong> para evitar uma queda brusca para hipotermia iatrogênica.</p><div class="flowchart-box">Superaquecimento → Temperatura central > 41°C</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Dano celular direto e resposta inflamatória sistêmica</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Falência de múltiplos órgãos</div><p><strong>Métodos de resfriamento:</strong></p><ul class="list-disc list-inside"><li><strong>Ativos:</strong> Usar ventoinhas e borrifar o paciente com água em temperatura ambiente (a evaporação é o método mais eficaz). Aplicar compressas úmidas em áreas de grandes vasos (axilas, virilha, pescoço). Fluidos IV em temperatura ambiente também ajudam.</li><li><strong>Monitoramento:</strong> A temperatura deve ser aferida continuamente. O resfriamento ativo deve ser <strong>interrompido quando a temperatura atingir 39.5°C</strong> para evitar que o paciente continue a esfriar e entre em hipotermia.</li><li><strong>Evitar:</strong> Imersão em água gelada (causa vasoconstrição periférica, que impede a perda de calor) e uso de álcool (risco de intoxicação e resfriamento muito rápido).</li></ul>` },
    hipotermia: { title: 'Manejo da Hipotermia', content: `<p>A hipotermia (<38.0°C) reduz a taxa metabólica, o débito cardíaco e pode levar a arritmias, coagulopatias e depressão do sistema nervoso central.</p><p>O reaquecimento deve ser gradual para evitar vasodilatação periférica súbita, que pode causar uma "queda de pressão de rebote" e piorar o choque.</p><p><strong>Métodos de reaquecimento:</strong></p><ul class="list-disc list-inside"><li><strong>Passivo (Hipotermia Leve):</strong> Isolar o paciente do ambiente frio com cobertores secos.</li><li><strong>Ativo Externo (Hipotermia Moderada):</strong> Utilizar mantas de ar aquecido (Bair Hugger), bolsas de água quente enroladas em toalhas ou luvas com água morna. Evitar contato direto de fontes de calor com a pele para prevenir queimaduras.</li><li><strong>Ativo Interno (Hipotermia Grave):</strong> Administrar fluidos intravenosos aquecidos (39-40°C) e, em casos extremos, lavagem peritoneal ou pleural com fluidos aquecidos.</li></ul>` },
    anionGap: { title: 'Ânion Gap (AG)', content: `<p>O Ânion Gap representa os ânions não mensurados no plasma (albumina, fosfatos, sulfatos, ânions orgânicos). É uma ferramenta crucial para o diagnóstico diferencial da acidose metabólica.</p><p><strong>Cálculo:</strong> AG = (Na⁺ + K⁺) - (Cl⁻ + HCO₃⁻)</p><p>Como a hipoalbuminemia pode mascarar um AG elevado, ele deve ser corrigido: <strong>AG Corrigido = AG + 0.42 x (Albumina Normal - Albumina do Paciente)</strong>.</p><div class="flowchart-box">Acidose Metabólica (↓ HCO₃⁻)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">AG está Alto ou Normal?</div><div class="grid grid-cols-2 gap-4"><div class="text-center"><strong>AG Alto</strong><br>↓<br>Ganho de Ácido<br>(Cetoacidose, Uremia, Lactato, Intoxicação)</div><div class="text-center"><strong>AG Normal (Hiperclorêmica)</strong><br>↓<br>Perda de Bicarbonato<br>(Diarreia, Acidose Tubular Renal)</div></div>` },
    oxygenation: { title: 'Avaliação da Oxigenação (Gradiente A-a)', content: `<p>O Gradiente Alvéolo-arterial de O₂ (Gradiente A-a) avalia a eficiência da transferência de oxigênio dos alvéolos para o sangue arterial. É útil para diferenciar as causas de hipoxemia (baixa PaO₂).</p><p><strong>Cálculo:</strong> Gradiente A-a = PAO₂ - PaO₂</p><p>Onde a Pressão Alveolar de O₂ (PAO₂) é calculada como: <strong>PAO₂ = [FiO₂ x (Patm - PH₂O)] - (PaCO₂ / 0.8)</strong>.</p><p>Um gradiente <strong>normal (< 15 mmHg)</strong> com hipoxemia sugere uma causa extra-pulmonar, como hipoventilação. Um gradiente <strong>alargado (> 15 mmHg)</strong> indica uma doença pulmonar intrínseca (desequilíbrio V/Q, shunt, barreira de difusão).</p>` },
    ventilation: { title: 'Avaliação da Ventilação (pCO₂)', content: `<p>A pressão parcial de CO₂ no sangue arterial (PaCO₂) é o indicador mais direto da adequação da ventilação alveolar (a troca de gases nos pulmões).</p><ul class="list-disc list-inside"><li><strong>Hipoventilação (Hipercapnia):</strong> PaCO₂ alta. Ocorre quando a ventilação é insuficiente para eliminar o CO₂ produzido pelo metabolismo. Causas: obstrução de vias aéreas, doença pleural, depressão do SNC. Leva à <strong>acidose respiratória</strong>.</li><li><strong>Hiperventilação (Hipocapnia):</strong> PaCO₂ baixa. Ocorre quando a ventilação é excessiva em relação à produção de CO₂. Causas: dor, estresse, hipoxemia, febre. Leva à <strong>alcalose respiratória</strong>.</li></ul>` }
};

// --- TYPE DEFINITIONS ---
interface AnalysisResult {
    sampleCheck: { probableType: string; message: string; emoji: string; };
    phStatus: { state: string; emoji: string; };
    primaryDisorder: { disorder: string; cause: string; emoji: string; };
    compensation: { status: string; expected: any; isCompensated: any; mixedDisorder: string | null; };
    ventilationStatus: { state: string; emoji: string; };
    oxygenation: { content: string; emoji: string; };
    electrolyteStatus: Array<{ name: string; value: number; unit: string; status: string; alert: string; ref: string; }>;
    extraParameterStatus: Array<{ name: string; value: number; unit: string; status: string; alert: string; ref: string; key: string; }>;
    anionGap: { value: string; correctedValue: string; interpretation: string; };
    differentials: string[];
}

type Species = 'dog' | 'cat';

type AnalyzerInputs = {
    species: Species;
    declaredSampleType: 'arterial' | 'venous';
    fio2: string;
    ph: string;
    pco2: string;
    hco3: string;
    po2: string;
    temp: string;
    na: string;
    k: string;
    cl: string;
    albumin: string;
    glucose: string;
    lactate: string;
    be: string;
    so2: string;
    tco2: string;
    ionizedCalcium: string;
    magnesium: string;
    hematocrit: string;
    hemoglobin: string;
};

interface QuizInputs {
    species: 'dog' | 'cat';
    ph: number;
    pco2: number;
    hco3: number;
    po2: number;
    na: number;
    k: number;
    cl: number;
    albumin: number;
    fio2: number;
    temp: number;
    declaredSampleType: 'arterial' | 'venous';
}

interface CorrectAnswers {
    sampleType?: string;
    diagnosis?: string;
    compensation?: string;
    na_status?: string;
    k_status?: string;
    cl_status?: string;
    albumin_status?: string;
    temp_status?: string;
    [key: string]: string | undefined;
}

interface QuizCase {
    inputs: QuizInputs;
    correctAnswers: CorrectAnswers;
}


// --- ANALYSIS FUNCTIONS ---

function analyzeBloodGas(inputs: any): AnalysisResult {
    const { species, ph, pco2, hco3, po2, temp, fio2, na, k, cl, albumin, glucose, lactate, be, so2, tco2, ionizedCalcium, magnesium, hematocrit, hemoglobin } = inputs;
    const results: Partial<AnalysisResult> = {};
    const currentRef = ref[species];

    results.sampleCheck = checkSampleType(po2, temp);
    const probableSampleType = results.sampleCheck.probableType;

    if (ph < 7.35) results.phStatus = { state: 'Acidemia', emoji: '📉' };
    else if (ph > 7.45) results.phStatus = { state: 'Alcalemia', emoji: '📈' };
    else results.phStatus = { state: 'pH Normal', emoji: '👌' };

    results.primaryDisorder = identifyPrimaryDisorder(ph, pco2, hco3, species, currentRef);

    results.compensation = { status: "Não aplicável para gatos ou distúrbio simples.", expected: "N/A", isCompensated: "N/A", mixedDisorder: null };
    if (species === 'dog' && results.primaryDisorder.disorder !== 'Normal') {
        results.compensation = evaluateCompensation(pco2, hco3, results.primaryDisorder.disorder, { hco3: currentRef.hco3.ideal, pco2: currentRef.pco2_comp });
    }

    results.ventilationStatus = analyzeVentilation(pco2, species, currentRef, probableSampleType);
    results.oxygenation = analyzeOxygenation(po2, pco2, fio2, probableSampleType);
    results.electrolyteStatus = analyzeElectrolytes(na, k, cl, albumin, species, currentRef);
    results.extraParameterStatus = analyzeAdditionalParameters({ glucose, lactate, be, so2, tco2, ionizedCalcium, magnesium, hematocrit, hemoglobin }, currentRef);

    results.anionGap = { value: 'Não calculado', correctedValue: 'Não calculado', interpretation: 'Eletrólitos não fornecidos.' };
    if (na && k && cl && hco3) {
        results.anionGap = calculateAnionGap(na, k, cl, hco3, albumin, species, currentRef);
    }

    results.differentials = getDifferentials(results.primaryDisorder.disorder, results.anionGap.interpretation);
    return results as AnalysisResult;
}

function checkSampleType(po2, temp) {
    let probableType = 'indeterminado';
    let message = '';
    let emoji = '🤔';

    if (po2 > 80) {
        probableType = 'arterial';
        message = `A pO₂ de ${po2} mmHg é fortemente sugestiva de sangue arterial.`;
        emoji = '🩸';
    } else if (po2 < 60) {
        probableType = 'venous';
        message = `A pO₂ de ${po2} mmHg é fortemente sugestiva de sangue venoso.`;
        emoji = '🔵';
    } else {
        probableType = 'mista/indeterminada';
        message = `A pO₂ de ${po2} mmHg está em uma faixa ambígua. A interpretação deve ser cautelosa.`;
        emoji = '❓';
    }
    if (temp) {
        message += `<br><small class="text-muted-foreground">Nota: A análise assume que os valores foram corrigidos para a temperatura do paciente de ${temp}°C.</small>`;
    }
    return { probableType, message, emoji };
}

function identifyPrimaryDisorder(ph, pco2, hco3, species, currentRef) {
    const pco2_ref = currentRef.pco2_comp;
    const hco3_ref = currentRef.hco3.ideal;

    if (ph < 7.35) {
        if (pco2 > pco2_ref + 2) return { disorder: 'Acidose Respiratória', cause: 'pCO₂ alta', emoji: '💨⬆️' };
        if (hco3 < hco3_ref - 2) return { disorder: 'Acidose Metabólica', cause: 'HCO₃⁻ baixo', emoji: '🛡️⬇️' };
        return { disorder: 'Distúrbio Misto (Acidose)', cause: 'Ambos contribuem', emoji: '🔄' };
    } else if (ph > 7.45) {
        if (pco2 < pco2_ref - 2) return { disorder: 'Alcalose Respiratória', cause: 'pCO₂ baixa', emoji: '💨⬇️' };
        if (hco3 > hco3_ref + 2) return { disorder: 'Alcalose Metabólica', cause: 'HCO₃⁻ alto', emoji: '🛡️⬆️' };
        return { disorder: 'Distúrbio Misto (Alcalose)', cause: 'Ambos contribuem', emoji: '🔄' };
    } else {
        if ((pco2 > pco2_ref + 2 && hco3 > hco3_ref + 2) || (pco2 < pco2_ref - 2 && hco3 < hco3_ref - 2)) return { disorder: 'Distúrbio Misto Compensado', cause: 'Alterações opostas', emoji: '⚖️' };
        return { disorder: 'Normal', cause: 'Dentro dos limites da normalidade', emoji: '✅' };
    }
}

function evaluateCompensation(pco2, hco3, primaryDisorder, refValues) {
    let expected, status, isCompensated, mixedDisorder = null;
    const delta_hco3 = hco3 - refValues.hco3;
    const delta_pco2 = pco2 - refValues.pco2;

    switch (primaryDisorder) {
        case 'Acidose Metabólica':
            expected = { pco2: (refValues.pco2 + (delta_hco3 * 0.7)).toFixed(1) };
            isCompensated = Math.abs(pco2 - expected.pco2) <= 3;
            if (pco2 > expected.pco2 + 3) mixedDisorder = 'Acidose Respiratória Concomitante';
            if (pco2 < expected.pco2 - 3) mixedDisorder = 'Alcalose Respiratória Concomitante';
            break;
        case 'Alcalose Metabólica':
            expected = { pco2: (refValues.pco2 + (delta_hco3 * 0.5)).toFixed(1) };
            isCompensated = Math.abs(pco2 - expected.pco2) <= 3;
            if (pco2 < expected.pco2 - 3) mixedDisorder = 'Alcalose Respiratória Concomitante';
            if (pco2 > expected.pco2 + 3) mixedDisorder = 'Acidose Respiratória Concomitante';
            break;
        case 'Acidose Respiratória': // Agudo
            expected = { hco3: (refValues.hco3 + ((delta_pco2 / 10) * 1)).toFixed(1) };
            isCompensated = Math.abs(hco3 - expected.hco3) <= 2;
            if (hco3 > expected.hco3 + 2) mixedDisorder = 'Alcalose Metabólica Concomitante';
            if (hco3 < expected.hco3 - 2) mixedDisorder = 'Acidose Metabólica Concomitante';
            break;
        case 'Alcalose Respiratória': // Agudo
            expected = { hco3: (refValues.hco3 + ((delta_pco2 / 10) * 2)).toFixed(1) };
            isCompensated = Math.abs(hco3 - expected.hco3) <= 2;
            if (hco3 < expected.hco3 - 2) mixedDisorder = 'Acidose Metabólica Concomitante';
            if (hco3 > expected.hco3 + 2) mixedDisorder = 'Alcalose Metabólica Concomitante';
            break;
        default:
            return { status: "Não aplicável", expected: "N/A", isCompensated: "N/A", mixedDisorder: null };
    }
    status = isCompensated ? "Compensado" : "Descompensado (Distúrbio Misto)";
    return { status, expected, isCompensated, mixedDisorder };
}

function analyzeVentilation(pco2, species, currentRef, sampleType) {
    const pco2_ref = currentRef[sampleType]?.pco2 || currentRef.arterial.pco2;
    if (pco2 > pco2_ref.max) return { state: 'Hipoventilação (Hipercapnia)', emoji: '😮‍💨⬇️' };
    if (pco2 < pco2_ref.min) return { state: 'Hiperventilação (Hipocapnia)', emoji: '😮‍💨⬆️' };
    return { state: 'Ventilação Normal (Eucapnia)', emoji: '👍' };
}

function analyzeOxygenation(paO2, paCO2, fio2, probableSampleType) {
    if (probableSampleType !== 'arterial') {
        return { content: "Cálculo do Gradiente A-a não aplicável para amostras venosas ou indeterminadas.", emoji: '🚫' };
    }
    const Patm = 760, PH2O = 47, R = 0.8;
    const PAO2 = ((fio2 / 100) * (Patm - PH2O)) - (paCO2 / R);
    const AaGradient = PAO2 - paO2;

    let interpretation = AaGradient > 15
        ? 'Gradiente A-a alargado. Sugere hipoxemia por distúrbio de V/Q, shunt ou barreira de difusão.'
        : 'Gradiente A-a normal. Se houver hipoxemia, pode ser por hipoventilação ou baixa FiO₂.';

    const content = `Gradiente A-a: <strong>${AaGradient.toFixed(2)} mmHg</strong><br>
                     <small>(PAO₂: ${PAO2.toFixed(2)}, PaO₂: ${paO2})</small><br>
                     Interpretação: ${interpretation}`;
    return { content, emoji: '🫁' };
}

function analyzeElectrolytes(na, k, cl, albumin, species, currentRef) {
    const results = [];
    const ref_species = currentRef;

    if (na !== null && !isNaN(na)) {
        let status = 'Normal'; let alert = '';
        if (na < ref_species.na.min) { status = 'Hiponatremia'; alert = 'Nível de Sódio baixo. Investigar balanço hídrico.'; }
        if (na > ref_species.na.max) { status = 'Hipernatremia'; alert = 'Nível de Sódio alto. Investigar desidratação ou perda de água livre.'; }
        results.push({ name: 'Sódio (Na⁺)', value: na, unit: 'mEq/L', status, alert, ref: `${ref_species.na.min}-${ref_species.na.max}` });
    }
    if (k !== null && !isNaN(k)) {
        let status = 'Normal'; let alert = '';
        if (k < ref_species.k.min) { status = 'Hipocalemia'; alert = 'Nível de Potássio baixo. Considerar reposição de potássio.'; }
        if (k > ref_species.k.max) { status = 'Hipercalemia'; alert = 'Nível de Potássio alto. Risco de arritmias cardíacas.'; }
        results.push({ name: 'Potássio (K⁺)', value: k, unit: 'mEq/L', status, alert, ref: `${ref_species.k.min}-${ref_species.k.max}` });
    }
    if (cl !== null && !isNaN(cl)) {
        let status = 'Normal'; let alert = '';
        if (cl < ref_species.cl.min) { status = 'Hipocloremia'; alert = 'Nível de Cloro baixo. Frequentemente associado a alcalose metabólica.'; }
        if (cl > ref_species.cl.max) { status = 'Hipercloremia'; alert = 'Nível de Cloro alto. Frequentemente associado a acidose metabólica.'; }
        results.push({ name: 'Cloro (Cl⁻)', value: cl, unit: 'mEq/L', status, alert, ref: `${ref_species.cl.min}-${ref_species.cl.max}` });
    }
    if (albumin !== null && !isNaN(albumin)) {
        let status = 'Normal'; let alert = '';
        if (albumin < ref_species.albumin.min) { status = 'Hipoalbuminemia'; alert = 'Nível de Albumina baixo. Afeta a pressão oncótica e o cálculo do Anion Gap.'; }
        if (albumin > ref_species.albumin.max) { status = 'Hiperalbuminemia'; alert = 'Nível de Albumina alto. Geralmente associado a desidratação hemoconcentração.'; }
        results.push({ name: 'Albumina', value: albumin, unit: 'g/dL', status, alert, ref: `${ref_species.albumin.min}-${ref_species.albumin.max}` });
    }
    return results;
}

function analyzeAdditionalParameters(values: any, currentRef: any) {
    const parameterConfig = [
        { key: 'glucose', label: 'Glicose', unit: 'mg/dL', refKey: 'glucose', low: 'Hipoglicemia', high: 'Hiperglicemia', lowAlert: 'Glicose abaixo da faixa de referÃªncia.', highAlert: 'Glicose acima da faixa de referÃªncia.' },
        { key: 'lactate', label: 'Lactato', unit: 'mmol/L', refKey: 'lactate', low: 'Baixo', high: 'Hiperlactatemia', lowAlert: 'Lactato abaixo do esperado para o equipamento.', highAlert: 'Lactato elevado. Correlacionar com hipoperfusÃ£o e gravidade clÃ­nica.' },
        { key: 'be', label: 'BE', unit: 'mEq/L', refKey: 'be', low: 'Base deficit', high: 'Base excess', lowAlert: 'Base excess negativo sugere componente metabÃ³lico Ã¡cido.', highAlert: 'Base excess positivo sugere componente metabÃ³lico alcalino.' },
        { key: 'so2', label: 'sO2', unit: '%', refKey: 'so2', low: 'DessaturaÃ§Ã£o', high: 'Alta', lowAlert: 'SaturaÃ§Ã£o de oxigÃªnio abaixo do intervalo esperado.', highAlert: 'SaturaÃ§Ã£o acima da faixa configurada.' },
        { key: 'tco2', label: 'cTCO2', unit: 'mmol/L', refKey: 'tco2', low: 'Baixo', high: 'Alto', lowAlert: 'cTCO2 reduzido, compatÃ­vel com perda de base ou acidose metabÃ³lica.', highAlert: 'cTCO2 aumentado, compatÃ­vel com retenÃ§Ã£o de base.' },
        { key: 'ionizedCalcium', label: 'Ca2+ ionizado', unit: 'mmol/L', refKey: 'ionizedCalcium', low: 'Hipocalcemia ionizada', high: 'Hipercalcemia ionizada', lowAlert: 'CÃ¡lcio ionizado abaixo da faixa de referÃªncia.', highAlert: 'CÃ¡lcio ionizado acima da faixa de referÃªncia.' },
        { key: 'magnesium', label: 'MagnÃ©sio', unit: 'mg/dL', refKey: 'magnesium', low: 'Hipomagnesemia', high: 'Hipermagnesemia', lowAlert: 'MagnÃ©sio abaixo da faixa de referÃªncia.', highAlert: 'MagnÃ©sio acima da faixa de referÃªncia.' },
        { key: 'hematocrit', label: 'HematÃ³crito', unit: '%', refKey: 'hematocrit', low: 'HematÃ³crito baixo', high: 'HematÃ³crito alto', lowAlert: 'HematÃ³crito abaixo da faixa de referÃªncia.', highAlert: 'HematÃ³crito acima da faixa de referÃªncia.' },
        { key: 'hemoglobin', label: 'Hemoglobina', unit: 'g/dL', refKey: 'hemoglobin', low: 'Hemoglobina baixa', high: 'Hemoglobina alta', lowAlert: 'Hemoglobina abaixo da faixa de referÃªncia.', highAlert: 'Hemoglobina acima da faixa de referÃªncia.' }
    ];

    return parameterConfig.reduce((acc: any[], parameter) => {
        const value = values[parameter.key];
        if (value === null || value === undefined || Number.isNaN(value)) {
            return acc;
        }

        const reference = currentRef[parameter.refKey];
        let status = 'Normal';
        let alert = '';

        if (value < reference.min) {
            status = parameter.low;
            alert = parameter.lowAlert;
        } else if (value > reference.max) {
            status = parameter.high;
            alert = parameter.highAlert;
        }

        acc.push({
            key: parameter.key,
            name: parameter.label,
            value,
            unit: parameter.unit,
            status,
            alert,
            ref: `${reference.min}-${reference.max}`
        });

        return acc;
    }, []);
}

function calculateAnionGap(na, k, cl, hco3, albumin, species, currentRef) {
    const ag = (na + k) - (cl + hco3);
    let ag_corrected = ag;
    const ag_ref = currentRef.anionGap;
    const albumin_ideal = currentRef.albumin.ideal;

    if (albumin !== null && !isNaN(albumin)) {
        ag_corrected = ag + (species === 'dog' ? 0.42 : 0.41) * (albumin_ideal - albumin);
    }

    let interpretation = 'Baixo Anion Gap';
    if (ag_corrected > ag_ref.max) interpretation = 'Alto Anion Gap (Normoclorêmico)';
    else if (ag_corrected >= ag_ref.min) interpretation = 'Anion Gap Normal (Hiperclorêmico)';

    return { value: ag.toFixed(2), correctedValue: ag_corrected.toFixed(2), interpretation };
}

function getDifferentials(disorder, agInterpretation) {
    const diffs = {
        'Acidose Metabólica': {
            'Alto Anion Gap (Normoclorêmico)': ["Cetoacidose Diabética", "Acidose Lática", "Insuficiência Renal", "Intoxicações"],
            'Anion Gap Normal (Hiperclorêmico)': ["Diarreia", "Acidose Tubular Renal", "Acidose Dilucional", "Hipoaldosteronismo"]
        },
        'Alcalose Metabólica': ["Vômito Crônico", "Uso de Diuréticos", "Hiperaldosteronismo", "Terapia com álcalis"],
        'Acidose Respiratória': ["Obstrução de Vias Aéreas", "Doença do Espaço Pleural", "Depressão do SNC", "Doença Parenquimatosa"],
        'Alcalose Respiratória': ["Hipoxemia", "Dor, Ansiedade, Estresse", "Sepse, Febre", "Ventilação Mecânica Excessiva"]
    };
    if (disorder === 'Acidose Metabólica') return diffs[disorder][agInterpretation] || ["Causa indeterminada sem AG."];
    return diffs[disorder] || ["Sem diferenciais específicos."];
}

// --- QUIZ FUNCTIONS ---

function generateRandomValue(min, max, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateQuizCase(): QuizCase {
    const species = Math.random() < 0.5 ? 'dog' : 'cat';
    const currentRef = ref[species];
    const disorders = ['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória'];
    const primaryDisorder = disorders[Math.floor(Math.random() * disorders.length)];

    let ph, pco2, hco3, po2, na, k, cl, albumin, temp;
    const sampleType = (Math.random() < 0.7 ? 'arterial' : 'venous') as 'arterial' | 'venous';

    switch (primaryDisorder) {
        case 'Acidose Metabólica':
            ph = generateRandomValue(7.15, 7.34, 2); hco3 = generateRandomValue(currentRef.hco3.min - 12, currentRef.hco3.min - 3, 1);
            pco2 = generateRandomValue(currentRef.pco2_comp - 15, currentRef.pco2_comp - 5, 1);
            break;
        case 'Alcalose Metabólica':
            ph = generateRandomValue(7.46, 7.60, 2); hco3 = generateRandomValue(currentRef.hco3.max + 5, currentRef.hco3.max + 15, 1);
            pco2 = generateRandomValue(currentRef.pco2_comp + 3, currentRef.pco2_comp + 8, 1);
            break;
        case 'Acidose Respiratória':
            ph = generateRandomValue(7.15, 7.34, 2); pco2 = generateRandomValue(currentRef.pco2_comp + 10, currentRef.pco2_comp + 30, 1);
            hco3 = generateRandomValue(currentRef.hco3.ideal + 1, currentRef.hco3.ideal + 4, 1);
            break;
        case 'Alcalose Respiratória':
            ph = generateRandomValue(7.46, 7.60, 2); pco2 = generateRandomValue(currentRef.pco2_comp - 20, currentRef.pco2_comp - 5, 1);
            hco3 = generateRandomValue(currentRef.hco3.ideal - 4, currentRef.hco3.ideal - 1, 1);
            break;
    }

    if (sampleType === 'arterial') po2 = generateRandomValue(currentRef.arterial.po2.min, currentRef.arterial.po2.max);
    else { po2 = generateRandomValue(currentRef.venous.po2.min, currentRef.venous.po2.max); pco2 += generateRandomValue(3, 5); }

    const forceDisorder = Math.random();
    if (forceDisorder < 0.15) na = generateRandomValue(currentRef.na.max + 1, currentRef.na.max + 10); // Hipernatremia
    else if (forceDisorder < 0.3) na = generateRandomValue(currentRef.na.min - 10, currentRef.na.min - 1); // Hiponatremia
    else na = generateRandomValue(currentRef.na.min, currentRef.na.max);

    if (forceDisorder > 0.85) k = generateRandomValue(currentRef.k.max + 0.5, currentRef.k.max + 2); // Hipercalemia
    else if (forceDisorder > 0.7) k = generateRandomValue(currentRef.k.min - 1, currentRef.k.min - 0.1); // Hipocalemia
    else k = generateRandomValue(currentRef.k.min, currentRef.k.max);

    if (forceDisorder < 0.2) cl = generateRandomValue(currentRef.cl.min - 10, currentRef.cl.min - 1); // Hipocloremia
    else cl = generateRandomValue(currentRef.cl.min, currentRef.cl.max);

    if (forceDisorder > 0.8) albumin = generateRandomValue(currentRef.albumin.min - 1, currentRef.albumin.min - 0.1); // Hipoalbuminemia
    else albumin = generateRandomValue(currentRef.albumin.min, currentRef.albumin.max);

    if (forceDisorder < 0.1) temp = generateRandomValue(currentRef.temp.max + 0.5, currentRef.temp.max + 2); // Hipertermia
    else if (forceDisorder < 0.2) temp = generateRandomValue(currentRef.temp.min - 2, currentRef.temp.min - 0.5); // Hipotermia
    else temp = generateRandomValue(currentRef.temp.min, currentRef.temp.max);

    const quizCase: QuizCase = {
        inputs: { species, ph, pco2, hco3, po2, na, k, cl, albumin, fio2: 21, temp, declaredSampleType: sampleType },
        correctAnswers: {}
    };

    const analysis = analyzeBloodGas(quizCase.inputs);
    quizCase.correctAnswers.sampleType = analysis.sampleCheck.probableType;
    quizCase.correctAnswers.diagnosis = analysis.primaryDisorder.disorder;
    quizCase.correctAnswers.compensation = analysis.compensation.status;

    const electrolyteAnalysis = analyzeElectrolytes(na, k, cl, albumin, species, currentRef);
    quizCase.correctAnswers.na_status = electrolyteAnalysis.find(e => e.name.includes('Sódio'))?.status;
    quizCase.correctAnswers.k_status = electrolyteAnalysis.find(e => e.name.includes('Potássio'))?.status;
    quizCase.correctAnswers.cl_status = electrolyteAnalysis.find(e => e.name.includes('Cloro'))?.status;
    quizCase.correctAnswers.albumin_status = electrolyteAnalysis.find(e => e.name.includes('Albumina'))?.status;

    if (temp < currentRef.temp.min) quizCase.correctAnswers.temp_status = 'Hipotermia';
    else if (temp > currentRef.temp.max) quizCase.correctAnswers.temp_status = 'Hipertermia';
    else quizCase.correctAnswers.temp_status = 'Normotermia';

    // Add correct therapy answers
    Object.keys(quizTherapyOptions).forEach(disorderKey => {
        const therapy = quizTherapyOptions[disorderKey];
        if (analysis.electrolyteStatus.some(e => e.status.toLowerCase() === disorderKey) ||
            (quizCase.correctAnswers.temp_status && quizCase.correctAnswers.temp_status.toLowerCase() === disorderKey)) {
            quizCase.correctAnswers[disorderKey] = therapy.correct;
        }
    });

    return quizCase;
}


// --- MAIN COMPONENT ---


// --- NEW PRESETS DATA ---

const QuickAddButtons = ({ param, setInputs, steps }: { param: string, setInputs: any, steps: number[] }) => {
    const handleAdd = (amount: number) => {
        setInputs((prev: any) => {
            const current = parseFloat(prev[param]) || 0;
            const next = current + amount;
            // Limit decimal places to avoid floating point errors
            return { ...prev, [param]: parseFloat(next.toFixed(2)).toString() };
        });
    };
    return (
        <div className="flex w-full gap-1 mt-2 justify-between">
            {steps.map(step => (
                <button 
                  key={step} 
                  type="button" 
                  onClick={() => handleAdd(step)} 
                  className={`flex-1 flex justify-center items-center text-[10px] sm:text-[11px] font-bold py-1.5 px-0.5 rounded-md border transition-all hover:scale-105 active:scale-95 whitespace-nowrap overflow-hidden shadow-sm
                  ${step > 0 
                    ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40' 
                    : 'bg-rose-50/80 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40'}`}
                >
                    {step > 0 ? '+' : ''}{step}
                </button>
            ))}
        </div>
    );
};

const buildDefaultInputs = (species: Species = 'dog'): AnalyzerInputs => ({
    ...normalInputPresets[species]
});

const parseAnalyzerInputs = (values: AnalyzerInputs) => {
    const numericInputs: any = {};
    for (const key in values) {
        const rawValue = values[key as keyof AnalyzerInputs];
        const parsed = parseFloat(rawValue);
        numericInputs[key] = Number.isNaN(parsed) ? ((key === 'species' || key === 'declaredSampleType') ? rawValue : null) : parsed;
    }
    return numericInputs;
};

// --- MAIN COMPONENT ---
const Hemogasometria = ({ onBack }: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState('analyzer');
    const [modalData, setModalData] = useState<{ title: string, content: string } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const initialInputs = useMemo(() => buildDefaultInputs('dog'), []);

    // --- Analyzer State ---
    const [inputs, setInputs] = useState<AnalyzerInputs>(initialInputs);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(() => analyzeBloodGas(parseAnalyzerInputs(initialInputs)));
    const [showResults, setShowResults] = useState(true);

    // --- Quiz State ---
    const [quizCase, setQuizCase] = useState<QuizCase | null>(null);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    useEffect(() => { handleNewQuizCase(); }, []);

    const handleNewQuizCase = useCallback(() => {
        setQuizCase(generateQuizCase());
        setUserAnswers({});
        setQuizSubmitted(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
        setShowResults(false);
    }, []);

    const updateInputs = useCallback((updater: any) => {
        setInputs(updater);
        setShowResults(false);
    }, []);

    const handleSpeciesChange = (species: Species) => {
        const nextInputs = buildDefaultInputs(species);
        setInputs(nextInputs);
        setAnalysisResult(analyzeBloodGas(parseAnalyzerInputs(nextInputs)));
        setShowResults(true);
    };

    const handleAnalyzerSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const numericInputs = parseAnalyzerInputs(inputs);
        const analysis = analyzeBloodGas(numericInputs);
        setAnalysisResult(analysis);
        setShowResults(true);
        setTimeout(() => {
            document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    }, [inputs]);

    const handleReset = () => {
        const resetInputs = buildDefaultInputs(inputs.species);
        setInputs(resetInputs);
        setAnalysisResult(analyzeBloodGas(parseAnalyzerInputs(resetInputs)));
        setShowResults(true);
    };

    const handleQuizSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setQuizSubmitted(true);
    }, []);

    const openModal = useCallback((key: string) => {
        if (explanationData[key as keyof typeof explanationData]) setModalData((explanationData as any)[key]);
    }, []);

    const scrollToSection = useCallback((sectionId: string) => {
        setSidebarOpen(false);
        if (sectionId === 'quiz-panel') {
            setActiveTab('quiz');
        } else if (activeTab !== 'analyzer') {
            setActiveTab('analyzer');
        }
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, [activeTab]);

    const alerts = useMemo(() => {
        if (!showResults || !analysisResult) return [];
        const alertsList = [];
        const { anionGap, compensation, electrolyteStatus, extraParameterStatus, sampleCheck } = analysisResult;

        if (anionGap.interpretation === 'Alto Anion Gap (Normoclorêmico)') alertsList.push({ type: 'warning', msg: `O Ânion Gap corrigido está elevado (<strong>${anionGap.correctedValue}</strong>), indicando acúmulo de ânions não mensurados.`, key: 'anionGap' });
        if (compensation.mixedDisorder) alertsList.push({ type: 'warning', msg: `A compensação parece inadequada, sugerindo um <strong>distúrbio misto</strong>: ${compensation.mixedDisorder}.`, key: 'compensation' });

        electrolyteStatus.forEach(e => {
            if (e.alert && !e.status.toLowerCase().includes('hipercalemia')) alertsList.push({ type: 'warning', msg: e.alert, key: e.status.toLowerCase() });
        });
        extraParameterStatus.forEach(param => {
            if (param.alert) alertsList.push({ type: param.key === 'lactate' && param.status === 'Hiperlactatemia' ? 'critical' : 'warning', msg: param.alert, key: param.key });
        });

        if (sampleCheck.probableType !== inputs.declaredSampleType && sampleCheck.probableType !== 'mista/indeterminada') alertsList.push({ type: 'critical', msg: `A amostra foi declarada como <strong>${inputs.declaredSampleType === 'arterial' ? 'Arterial' : 'Venosa'}</strong>, mas a pO₂ sugere que a origem é <strong>${sampleCheck.probableType === 'arterial' ? 'Arterial' : 'Venosa'}</strong>. A interpretação deve ser ajustada.`, key: 'sampleType' });
        const phValue = parseFloat(inputs.ph);
        if (phValue < 7.2 || phValue > 7.6) alertsList.push({ type: 'critical', msg: `O pH de <strong>${phValue}</strong> está em um nível crítico e representa risco de vida.`, key: 'diagnosis' });
        electrolyteStatus.forEach(e => {
            if (e.status.toLowerCase().includes('hipercalemia')) alertsList.push({ type: 'critical', msg: e.alert, key: 'hipercalemia' });
        });
        return alertsList;
    }, [showResults, analysisResult, inputs]);

    const numericQuizKeys: (keyof QuizInputs)[] = ['ph', 'pco2', 'hco3', 'po2', 'temp', 'na', 'k', 'cl', 'albumin', 'fio2'];

    return (
        <div className="flex min-h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)] font-display text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_24%),linear-gradient(180deg,_#07101d_0%,_#091122_100%)] dark:text-slate-100">
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 xl:hidden">
                    <button type="button" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu lateral" />
                    <aside className="absolute inset-y-0 left-0 w-[min(88vw,360px)] overflow-y-auto border-r border-white/50 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-[#08101d]/95">
                        <HemogasometryNav activeTab={activeTab} inputs={inputs} onReset={handleReset} onScrollToSection={scrollToSection} onBack={onBack} />
                    </aside>
                </div>
            )}

            <aside className="hidden w-[300px] shrink-0 border-r border-white/50 bg-white/80 p-5 backdrop-blur-xl xl:block dark:border-slate-800 dark:bg-[#08101d]/88">
                <div className="sticky top-6">
                    <HemogasometryNav activeTab={activeTab} inputs={inputs} onReset={handleReset} onScrollToSection={scrollToSection} onBack={onBack} />
                </div>
            </aside>

            <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
                {activeTab === 'analyzer' && (
                    <div className="flex flex-col gap-6 lg:gap-8">
                        {/* Intro Section */}
                        <div id="overview" className="overflow-hidden rounded-[30px] border border-white/70 bg-white/88 p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-[#0d1526]/92">
                            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                <div className="flex flex-1 flex-col gap-5">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => setSidebarOpen(true)} className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 xl:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" aria-label="Abrir menu lateral do modulo">
                                            <span className="material-symbols-outlined">menu</span>
                                        </button>
                                        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-lg shadow-sky-500/20">
                                            <span className="material-symbols-outlined">science</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">Analise guiada</p>
                                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Hemogasometria Veterinaria</h2>
                                        </div>
                                    </div>
                                    <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Painel clinico responsivo com presets fisiologicos, interpretacao acidobasica, eletrolitos, perfusao e oxigenacao em uma unica leitura.
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-2xl border border-sky-100 bg-sky-50/90 p-4 dark:border-sky-900/40 dark:bg-sky-500/10">
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">Perfil</div>
                                            <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{inputs.species === 'dog' ? 'Canino' : 'Felino'}</div>
                                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Preset normal carregado</div>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/90 p-4 dark:border-emerald-900/40 dark:bg-emerald-500/10">
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Amostra</div>
                                            <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{inputs.declaredSampleType === 'arterial' ? 'Arterial' : 'Venosa'}</div>
                                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Comparacao automatica com pO2</div>
                                        </div>
                                        <div className="rounded-2xl border border-violet-100 bg-violet-50/90 p-4 dark:border-violet-900/40 dark:bg-violet-500/10">
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">Status</div>
                                            <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{showResults ? 'Resultado ativo' : 'Aguardando nova analise'}</div>
                                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">O painel acompanha os parametros inseridos</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px] xl:grid-cols-1">
                                    <button type="button" className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400" onClick={() => setActiveTab('quiz')}>
                                        <span className="material-symbols-outlined text-[18px]">school</span>
                                        Modo Quiz
                                    </button>
                                    <button type="button" onClick={handleReset} className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                                        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                                        Recarregar valores normais
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleAnalyzerSubmit} className="space-y-6">
                            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                                <div className="rounded-[26px] border border-white/60 bg-white/80 p-4 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0d1526]/88">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Entrada clinica</p>
                                            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Parametros da amostra</h3>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                                            Ajuste rapido por especie, coleta e metabólitos complementares
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-[26px] border border-sky-200/70 bg-gradient-to-br from-sky-500 via-cyan-400 to-teal-300 p-[1px] shadow-[0_28px_70px_-34px_rgba(14,165,233,0.55)] dark:border-sky-500/30">
                                    <div className="rounded-[25px] bg-slate-950/95 p-5 text-white">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">Leitura imediata</p>
                                                <h3 className="mt-2 text-xl font-bold">Analisar resultados</h3>
                                                <p className="mt-2 text-sm leading-6 text-sky-100/80">Executa a interpretacao atual e atualiza os cards clinicos abaixo sem sair da tela.</p>
                                            </div>
                                            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                                                <span className="material-symbols-outlined text-sky-100">monitor_heart</span>
                                            </div>
                                        </div>
                                        <button type="submit" className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-base font-bold text-slate-950 transition hover:scale-[1.01] hover:bg-sky-50">
                                            <span className="material-symbols-outlined text-[18px]">analytics</span>
                                            Analisar Resultados
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-5 items-start">
                                {/* 1. Patient Info Card */}
                                <section id="patient-card" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 transition-all hover:shadow-lg dark:hover:shadow-black/50 hover:border-blue-400/30 dark:hover:border-blue-500/30 dark:border-slate-700 shadow-sm overflow-hidden h-full">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#151b28] flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            <span className="material-symbols-outlined">pets</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Informações do Paciente</h3>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div className="grid grid-cols-2 gap-3 mb-2">
                                            <label className="cursor-pointer group">
                                                <input checked={inputs.species === 'dog'} onChange={() => handleSpeciesChange('dog')} className="peer sr-only" name="species" type="radio" />
                                                <div className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:bg-blue-50 dark:peer-checked:bg-primary/10 transition-all">
                                                    <span className="material-symbols-outlined text-3xl mb-1 text-slate-400 dark:text-slate-500 peer-checked:text-primary dark:peer-checked:text-blue-400">sound_detection_dog_barking</span>
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Cão</span>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input checked={inputs.species === 'cat'} onChange={() => handleSpeciesChange('cat')} className="peer sr-only" name="species" type="radio" />
                                                <div className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:bg-blue-50 dark:peer-checked:bg-primary/10 transition-all">
                                                    <span className="material-symbols-outlined text-3xl mb-1 text-slate-400 dark:text-slate-500 peer-checked:text-primary dark:peer-checked:text-blue-400">cruelty_free</span>
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Gato</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Temp (°C)</label>
                                                <input id="temp" value={inputs.temp} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono font-medium" placeholder="38.5" step="0.1" type="number" required />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">FiO₂ (%)</label>
                                                <input id="fio2" value={inputs.fio2} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono font-medium" placeholder="21" step="1" type="number" required />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Tipo de Amostra</label>
                                            <select id="declaredSampleType" value={inputs.declaredSampleType} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                                <option value="arterial">Arterial</option>
                                                <option value="venous">Venosa</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* 2. Gases Card */}
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 transition-all hover:shadow-lg dark:hover:shadow-black/50 hover:border-blue-400/30 dark:hover:border-blue-500/30 dark:border-slate-700 shadow-sm overflow-hidden h-full">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#151b28] flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                                            <span className="material-symbols-outlined">air</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Gases Sanguíneos</h3>
                                    </div>
                                    <div className="p-5 space-y-5">
                                        <div className="space-y-1 relative group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">pH</label>
                                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">Ref: 7.35-7.45</span>
                                            </div>
                                            <input id="ph" value={inputs.ph} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-mono text-lg font-medium" placeholder="7.40" step="0.01" type="number" required />
                                            <QuickAddButtons param="ph" setInputs={updateInputs} steps={[-0.1, -0.01, 0.01, 0.1]} />
                                        </div>
                                        <div className="space-y-1 relative group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">pCO₂ (mmHg)</label>
                                            </div>
                                            <input id="pco2" value={inputs.pco2} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-mono text-lg font-medium" placeholder="40.0" step="0.1" type="number" required />
                                            <QuickAddButtons param="pco2" setInputs={updateInputs} steps={[-5, -1, 1, 5]} />
                                        </div>
                                        <div className="space-y-1 relative group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">pO₂ (mmHg)</label>
                                            </div>
                                            <input id="po2" value={inputs.po2} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-mono text-lg font-medium" placeholder="95.0" step="0.1" type="number" required />
                                            <QuickAddButtons param="po2" setInputs={updateInputs} steps={[-10, -1, 1, 10]} />
                                        </div>
                                        <div className="space-y-1 relative group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">sO2 (%)</label>
                                            </div>
                                            <input id="so2" value={inputs.so2} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-mono text-lg font-medium" placeholder="98" step="0.1" type="number" />
                                            <QuickAddButtons param="so2" setInputs={updateInputs} steps={[-5, -1, 1, 5]} />
                                        </div>
                                        <div className="space-y-1 relative group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">cTCO2 (mmol/L)</label>
                                            </div>
                                            <input id="tco2" value={inputs.tco2} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-mono text-lg font-medium" placeholder="24" step="0.1" type="number" />
                                            <QuickAddButtons param="tco2" setInputs={updateInputs} steps={[-2, -1, 1, 2]} />
                                        </div>
                                    </div>
                                </section>

                                {/* 3. Electrolytes Card */}
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 transition-all hover:shadow-lg dark:hover:shadow-black/50 hover:border-blue-400/30 dark:hover:border-blue-500/30 dark:border-slate-700 shadow-sm overflow-hidden h-full">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#151b28] flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                            <span className="material-symbols-outlined">bolt</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Eletrólitos</h3>
                                    </div>
                                    <div className="p-5 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Na⁺</label>
                                            <div className="relative">
                                                <input id="na" value={inputs.na} onChange={handleInputChange} className="w-full pl-3 pr-8 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono font-medium" placeholder="140" step="0.1" type="number" />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mEq/L</span>
                                            </div>
                                            <QuickAddButtons param="na" setInputs={updateInputs} steps={[-5, -1, 1, 5]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">K⁺</label>
                                            <div className="relative">
                                                <input id="k" value={inputs.k} onChange={handleInputChange} className="w-full pl-3 pr-8 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono font-medium" placeholder="4.0" step="0.1" type="number" />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mEq/L</span>
                                            </div>
                                            <QuickAddButtons param="k" setInputs={updateInputs} steps={[-1, -0.1, 0.1, 1]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cl⁻</label>
                                            <div className="relative">
                                            <input id="cl" value={inputs.cl} onChange={handleInputChange} className="w-full pl-3 pr-8 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono font-medium" placeholder="105" step="0.1" type="number" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mEq/L</span>
                                        </div>
                                        <QuickAddButtons param="cl" setInputs={updateInputs} steps={[-5, -1, 1, 5]} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ca2+ ionizado</label>
                                        <div className="relative">
                                            <input id="ionizedCalcium" value={inputs.ionizedCalcium} onChange={handleInputChange} className="w-full pl-3 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono font-medium" placeholder="1.25" step="0.01" type="number" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">mmol/L</span>
                                        </div>
                                        <QuickAddButtons param="ionizedCalcium" setInputs={updateInputs} steps={[-0.2, -0.05, 0.05, 0.2]} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Magnesio</label>
                                        <div className="relative">
                                            <input id="magnesium" value={inputs.magnesium} onChange={handleInputChange} className="w-full pl-3 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono font-medium" placeholder="2.2" step="0.1" type="number" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">mg/dL</span>
                                        </div>
                                        <QuickAddButtons param="magnesium" setInputs={updateInputs} steps={[-0.5, -0.1, 0.1, 0.5]} />
                                    </div>
                                </div>
                                </section>

                                {/* 4. Metabolites Card */}
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 transition-all hover:shadow-lg dark:hover:shadow-black/50 hover:border-blue-400/30 dark:hover:border-blue-500/30 dark:border-slate-700 shadow-sm overflow-hidden h-full">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#151b28] flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                            <span className="material-symbols-outlined">water_drop</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Metabólitos</h3>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">HCO₃⁻</label>
                                            <input id="hco3" value={inputs.hco3} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono text-lg font-medium" placeholder="24" step="0.1" type="number" required />
                                            <QuickAddButtons param="hco3" setInputs={updateInputs} steps={[-2, -1, 1, 2]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Albumina (g/dL)</label>
                                            <input id="albumin" value={inputs.albumin} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="3.0" step="0.1" type="number" />
                                            <QuickAddButtons param="albumin" setInputs={updateInputs} steps={[-1, -0.1, 0.1, 1]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">BE (Base Excess)</label>
                                            <input id="be" value={inputs.be || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="0" step="0.1" type="number" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Glicose (mg/dL)</label>
                                            <input id="glucose" value={inputs.glucose} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="100" step="1" type="number" />
                                            <QuickAddButtons param="glucose" setInputs={updateInputs} steps={[-20, -5, 5, 20]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Lactato (mmol/L)</label>
                                            <input id="lactate" value={inputs.lactate} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="1.2" step="0.1" type="number" />
                                            <QuickAddButtons param="lactate" setInputs={updateInputs} steps={[-1, -0.2, 0.2, 1]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Hematocrito (%)</label>
                                            <input id="hematocrit" value={inputs.hematocrit} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="45" step="1" type="number" />
                                            <QuickAddButtons param="hematocrit" setInputs={updateInputs} steps={[-10, -2, 2, 10]} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Hemoglobina (g/dL)</label>
                                            <input id="hemoglobin" value={inputs.hemoglobin} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono font-medium" placeholder="15" step="0.1" type="number" />
                                            <QuickAddButtons param="hemoglobin" setInputs={updateInputs} steps={[-2, -0.5, 0.5, 2]} />
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </form>

                        {showResults && analysisResult && (
                            <div id="results-panel" className="mt-8 space-y-5">
                                {alerts.length > 0 && (
                                    <div className="mt-8 rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-[#0d1526]/88">
                                        <div className="mb-4 flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Triagem imediata</p>
                                                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Alertas clínicos</h2>
                                            </div>
                                            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:border-amber-900/40 dark:bg-amber-500/10 dark:text-amber-300">
                                                {alerts.length} sinal{alerts.length > 1 ? 's' : ''}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                        {alerts.map((alert, index) => {
                                            const colors = { critical: 'border-red-200 bg-red-50/95 text-red-900 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300', warning: 'border-amber-200 bg-amber-50/95 text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300' };
                                            return (
                                                <div key={index} className={`result-card flex items-center justify-between rounded-2xl border p-4 ${colors[alert.type as keyof typeof colors]} ${showResults ? 'visible' : ''}`} style={{ transitionDelay: `${index * 100}ms` }} role="alert">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl ${alert.type === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                                                            <span className="material-symbols-outlined text-[20px]">{alert.type === 'critical' ? 'emergency_home' : 'warning'}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{alert.type === 'critical' ? 'Alerta critico' : 'Atencao'}</p>
                                                            <p className="mt-1 text-sm leading-6" dangerouslySetInnerHTML={{ __html: alert.msg }} />
                                                        </div>
                                                    </div>
                                                    {alert.key && <button type="button" onClick={() => openModal(alert.key)} className="ml-2 flex size-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-500 transition hover:scale-105 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-sky-300"><span className="material-symbols-outlined text-[18px]">help</span></button>}
                                                </div>
                                            );
                                        })}
                                        </div>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultCard title="1. Base da Amostra" content={analysisResult.sampleCheck.message} emoji={analysisResult.sampleCheck.emoji} dataKey="sampleType" openModal={openModal} delay={0} />
                                    <ResultCard title="2. Status do pH" content={`pH ${analysisResult.phStatus.state}`} emoji={analysisResult.phStatus.emoji} dataKey="diagnosis" openModal={openModal} delay={100} />
                                    <ResultCard title="3. Distúrbio Primário" content={`${analysisResult.primaryDisorder.disorder} <br/><small class="text-slate-500 dark:text-slate-400">Causa: ${analysisResult.primaryDisorder.cause}</small>`} emoji={analysisResult.primaryDisorder.emoji} dataKey="diagnosis" openModal={openModal} delay={200} />
                                    <ResultCard title="4. Ventilação" content={analysisResult.ventilationStatus.state} emoji={analysisResult.ventilationStatus.emoji} dataKey="ventilation" openModal={openModal} delay={300} />
                                </div>
                                <ResultCard title="5. Avaliação da Compensação" content={`Status: ${analysisResult.compensation.status}<br><small class="text-slate-500 dark:text-slate-400">Esperado: ${JSON.stringify(analysisResult.compensation.expected)}</small>${analysisResult.compensation.mixedDisorder ? `<br><strong class="text-slate-900 dark:text-white mt-1 block">Distúrbio Misto Sugerido: ${analysisResult.compensation.mixedDisorder}</strong>` : ''}`} emoji='⚖️' dataKey="compensation" openModal={openModal} delay={400} />
                                <ResultCard title="6. Avaliação da Oxigenação" content={analysisResult.oxygenation.content} emoji={analysisResult.oxygenation.emoji} dataKey="oxygenation" openModal={openModal} delay={500} />
                                <ElectrolyteCard electrolyteStatus={analysisResult.electrolyteStatus} openModal={openModal} delay={600} />
                                <ExtendedParameterCard items={analysisResult.extraParameterStatus} delay={700} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ResultCard title="8. Anion Gap (AG)" content={`AG: ${analysisResult.anionGap.value} mEq/L<br>AG Corrigido: ${analysisResult.anionGap.correctedValue} mEq/L<br><strong class="text-slate-900 dark:text-white mt-1 block">Interpretação: ${analysisResult.anionGap.interpretation}</strong>`} emoji='Σ' dataKey="anionGap" openModal={openModal} delay={700} />
                                    <ResultCard title="9. Diferenciais" content={`<ul class="space-y-1 mt-1">${analysisResult.differentials.map(d => `<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 leading-tight">${d}</li>`).join('')}</ul>`} emoji='🩺' dataKey="differentials" openModal={openModal} delay={800} />
                                </div>
                            </div>
                        )}

                        {/* Accordion Footer: Best Practices */}
                        <section id="collection-guide" className="w-full mt-8">
                            <details className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-all duration-300 open:ring-1 open:ring-sky-400/20 dark:border-slate-800/90 dark:bg-[#0d1526]/88">
                                <summary className="flex items-center justify-between p-5 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-[#111b31] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                                            <span className="material-symbols-outlined">menu_book</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Qualidade pre-analitica</div>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">Guia de Boas Práticas de Coleta</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined expand-icon text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="border-t border-slate-200/80 bg-white/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                                                Coleta e Armazenamento
                                            </h4>
                                            <ul className="list-disc pl-5 space-y-1 marker:text-slate-400">
                                                <li>Amostra arterial é essencial para avaliar oxigenação.</li>
                                                <li>Remova bolhas da seringa imediatamente (alteram pCO₂ e pO₂).</li>
                                                <li>Análise em até 5 minutos ou armazene em gelo (máx 1 hora).</li>
                                                <li>Sempre registre a temperatura para correção pelo analisador.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-amber-500">warning</span>
                                                Erros Comuns
                                            </h4>
                                            <ul className="list-disc pl-5 space-y-1 marker:text-slate-400">
                                                <li>Excesso de heparina dilui a amostra e reduz pCO₂/HCO₃⁻.</li>
                                                <li>Coleta traumática causa hemólise e eleva potássio falsamente.</li>
                                                <li>Estase venosa prolongada eleva o lactato e altera o pH.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </section>
                    </div>
                )}

                {activeTab === 'quiz' && quizCase && (
                    <div id="quiz-panel" className="mt-6 rounded-[30px] border border-white/70 bg-white/82 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-[#0d1526]/90">
                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-slate-900 dark:text-white">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Treinamento</p>
                                <h2 className="mt-1 text-3xl font-bold">Caso Clínico Interativo</h2>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Treine interpretação ácido-básica, eletrolítica e conduta inicial com um caso gerado automaticamente.</p>
                            </div>
                            <button type="button" onClick={handleNewQuizCase} className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">Gerar Novo Caso</button>
                        </div>
                        <div className="mb-6 rounded-[24px] border border-slate-200/80 bg-slate-50/85 p-4 dark:border-slate-700 dark:bg-slate-900/75">
                            <p className="font-bold text-slate-900 dark:text-white"><strong>Espécie:</strong> {quizCase.inputs.species === 'dog' ? 'Cão 🐕' : 'Gato 🐈'}</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 text-center">
                                {numericQuizKeys.map(key => (
                                    <div key={key} className="rounded-2xl border border-white/80 bg-white p-3 shadow-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide">{key}</div>
                                        <div className="text-lg">{(quizCase.inputs[key as keyof QuizInputs] as number).toFixed(key === 'ph' ? 2 : 1)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <form onSubmit={handleQuizSubmit} className="space-y-8">
                            <QuizQuestion qKey="sampleType" text="1. Qual a origem mais provável da amostra?" options={['arterial', 'venous', 'mista/indeterminada']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }} />
                            <QuizQuestion qKey="diagnosis" text="2. Qual o distúrbio ácido-básico primário?" options={['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória', 'Distúrbio Misto Compensado']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }} />
                            {quizCase.inputs.species === 'dog' && <QuizQuestion qKey="compensation" text="3. Como você classifica a compensação?" options={['Compensado', 'Descompensado (Distúrbio Misto)']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }} />}
                            {Object.entries(quizTherapyOptions).map(([disorderKey, therapy]) => {
                                if (quizCase.correctAnswers[disorderKey]) {
                                    const qNum = 4 + Object.keys(userAnswers).filter((k: string) => Object.keys(quizTherapyOptions).includes(k)).length;
                                    return <QuizQuestion
                                        key={disorderKey}
                                        qKey={disorderKey}
                                        text={`${qNum}. Este paciente tem ${disorderKey.charAt(0).toUpperCase() + disorderKey.slice(1)}. Qual a conduta?`}
                                        options={[...therapy.incorrect, therapy.correct].sort(() => Math.random() - 0.5)}
                                        {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }}
                                    />;
                                }
                                return null;
                            })}
                            <div className="flex justify-center pt-6">
                                <button type="submit" className="inline-flex min-h-[56px] items-center justify-center rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:scale-[1.02] hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">Corrigir Exercício</button>
                            </div>
                        </form>
                    </div>
                )
                }
            </main >

            {modalData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] transition-opacity p-4" onClick={() => setModalData(null)}>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 transform transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
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
        </div >
    );
};

// --- SUB-COMPONENTS ---
const ResultCard = ({ title, content, emoji, dataKey, openModal, delay }: any) => (
    <div className={`flex items-start space-x-4 rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/86`} style={{ animation: `sweep 0.3s ease-in-out ${delay}ms forwards`, opacity: 0 }}>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50 p-3 text-3xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">{emoji}</div>
        <div className="flex-grow pt-1">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{title}</h3>
                {dataKey && <button type="button" onClick={() => openModal(dataKey)} className="ml-2 flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-300"><span className="material-symbols-outlined text-[18px]">help</span></button>}
            </div>
            <div className="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
);

const ElectrolyteCard = ({ electrolyteStatus, openModal, delay }: any) => {
    if (electrolyteStatus.length === 0) return null;
    return (
        <div className={`flex items-start space-x-4 rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/86`} style={{ animation: `sweep 0.3s ease-in-out ${delay}ms forwards`, opacity: 0 }}>
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
                                    <button type="button" onClick={() => openModal(e.status.toLowerCase())} className="mt-2 flex size-8 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-slate-400 transition hover:text-sky-600 dark:border-white/10 dark:bg-black/10 dark:text-slate-300 dark:hover:text-sky-300"><span className="material-symbols-outlined text-[16px]">help</span></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ExtendedParameterCard = ({ items, delay }: any) => {
    if (!items?.length) return null;
    return (
        <div className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/86" style={{ animation: `sweep 0.3s ease-in-out ${delay}ms forwards`, opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-fuchsia-100 bg-fuchsia-50 p-3 text-2xl text-fuchsia-500 dark:border-fuchsia-900/30 dark:bg-fuchsia-900/10">+</div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">8. Parametros complementares</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Perfusao, oxigenacao, calcio ionizado, glicose e concentracao sanguinea.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((item: any) => {
                    const isNormal = item.status === 'Normal';
                    return (
                        <div key={item.key} className={`rounded-lg border p-3 ${isNormal ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/10' : 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10'}`}>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="font-semibold text-slate-800 dark:text-white">{item.name}</div>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.unit}</span>
                                    </div>
                                    <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Ref: {item.ref}</div>
                                </div>
                                <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${isNormal ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const HemogasometryNav = ({ activeTab, inputs, onReset, onScrollToSection, onBack }: any) => (
    <div className="flex h-full flex-col gap-5">
        <div className="rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.7)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/65">
            <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-lg shadow-sky-500/20">
                    <span className="material-symbols-outlined">science</span>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Vetius</p>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">HemogasometriaVET</h2>
                </div>
            </div>
            <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/80 px-3 py-2 text-xs font-medium text-sky-700 dark:border-sky-900/40 dark:bg-sky-500/10 dark:text-sky-200">
                {activeTab === 'quiz' ? 'Modo quiz aberto para treinamento de casos.' : 'Modo analise pronto para interpretacao imediata.'}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-3 dark:bg-slate-950/60">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Especie</div>
                    <div className="mt-1 font-semibold text-slate-900 dark:text-white">{inputs.species === 'dog' ? 'Cão' : 'Gato'}</div>
                </div>
                <div className="rounded-2xl bg-white p-3 dark:bg-slate-950/60">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Amostra</div>
                    <div className="mt-1 font-semibold text-slate-900 dark:text-white">{inputs.declaredSampleType === 'arterial' ? 'Arterial' : 'Venosa'}</div>
                </div>
            </div>
            <button type="button" onClick={onReset} className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                Recarregar valores normais
            </button>
        </div>

        <div className="space-y-2">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Navegacao do app</p>
            {analyzerSections.map((section) => (
                <button key={section.id} type="button" onClick={() => onScrollToSection(section.id)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${activeTab === 'quiz' && section.id === 'quiz-panel' ? 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-500/10 dark:text-sky-300' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900'}`}>
                    <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] text-slate-500 dark:text-slate-300">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
                </button>
            ))}
        </div>

        <button type="button" onClick={onBack} className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Voltar ao hub
        </button>
    </div>
);

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
        if (isCorrect) explanationStart = '';

        switch (qKey) {
            case 'sampleType': return `${explanationStart}O valor de pO₂ (${quizCase.inputs.po2.toFixed(1)} mmHg) é característico de uma amostra <strong>${correctAnswer === 'arterial' ? 'Arterial' : 'Venosa'}</strong>.`;
            case 'diagnosis': return `${explanationStart}A combinação de <strong>${quizCase.inputs.ph < 7.35 ? 'Acidemia' : 'Alcalemia'}</strong> com a alteração primária em ${correctAnswer.includes('Metabólica') ? 'HCO₃⁻' : 'pCO₂'} caracteriza <strong>${correctAnswer}</strong>.`;
            case 'compensation': return `${explanationStart}A análise da resposta compensatória indica um quadro <strong>${correctAnswer}</strong>.`;
            default: return explanationStart;
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-[#151b28] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-slate-800 dark:text-white mb-4 text-lg">{text}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((opt: string) => {
                    let classes = 'text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-input-dark transition-all font-medium flex items-center gap-3';
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
