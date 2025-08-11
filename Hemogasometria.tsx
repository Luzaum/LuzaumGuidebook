
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- DATA & CONFIGURATION ---

const ref = {
    dog: {
        arterial: { pco2: { min: 30.8, max: 42.8 }, po2: { min: 80.9, max: 103.3 } },
        venous: { pco2: { min: 33.6, max: 41.2 }, po2: { min: 49, max: 67 } },
        na: { min: 140, max: 150 }, k: { min: 3.9, max: 5.1 }, cl: { min: 110, max: 124 },
        albumin: { min: 2.3, max: 3.1, ideal: 2.7 }, anionGap: { min: 12, max: 25 },
        hco3: {min: 18.8, max: 25.6, ideal: 22.2}, pco2_comp: 36.8, temp: {min: 38.0, max: 39.2}
    },
    cat: {
        arterial: { pco2: { min: 25.2, max: 36.8 }, po2: { min: 95.4, max: 118.2 } },
        venous: { pco2: { min: 32.7, max: 44.7 }, po2: { min: 49, max: 67 } },
        na: { min: 145, max: 155 }, k: { min: 3.5, max: 5.1 }, cl: { min: 110, max: 124 },
        albumin: { min: 2.9, max: 4.2, ideal: 3.5 }, anionGap: { min: 13, max: 31 },
        hco3: {min: 14.4, max: 21.6, ideal: 18.0}, pco2_comp: 31.0, temp: {min: 38.0, max: 39.2}
    }
};

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
    diagnosis: { title: 'Identificação do Distúrbio Primário', content: `<p>A abordagem sistemática para identificar o distúrbio primário segue a relação entre o pH e os componentes metabólico (HCO₃⁻) e respiratório (pCO₂).</p><div class="flowchart-box">1. Avaliar o pH: Acidemia (<7.35) ou Alcalemia (>7.45)?</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">2. Verificar qual componente (pCO₂ ou HCO₃⁻) justifica a alteração do pH.</div><p><strong>Exemplo em Acidemia (pH baixo):</strong></p><ul class="list-disc list-inside"><li>Se o <strong>pCO₂ estiver alto</strong>, a causa é respiratória (hipoventilação retém CO₂ ácido). → <strong>Acidose Respiratória</strong>.</li><li>Se o <strong>HCO₃⁻ estiver baixo</strong>, a causa é metabólica (perda de base ou ganho de ácido). → <strong>Acidose Metabólica</strong>.</li></ul><p>O mesmo raciocínio se aplica à alcalemia, mas com as alterações inversas.</p>`},
    compensation: { title: 'Fisiologia da Compensação Ácido-Base', content: `<p>O corpo tenta manter o pH sanguíneo em uma faixa estreita (7.35-7.45) usando dois sistemas principais: o respiratório (pulmões) e o metabólico (rins).</p><p>Quando um sistema causa um distúrbio (ex: acidose <strong>metabólica</strong> por perda de bicarbonato), o outro sistema tenta compensar para normalizar o pH.</p><div class="flowchart-box">Distúrbio Primário: Acidose Metabólica (↓ HCO₃⁻) → ↓ pH</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Resposta Compensatória: O centro respiratório é estimulado → Aumento da frequência respiratória (hiperventilação)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Resultado: Mais CO₂ é eliminado → ↓ pCO₂ → Tenta aumentar o pH de volta ao normal</div><p>Um distúrbio é <strong>compensado</strong> se a resposta do sistema oposto for a esperada (calculada por fórmulas). Se a resposta for maior ou menor que o esperado, indica que há um <strong>segundo distúrbio ocorrendo simultaneamente</strong> (distúrbio misto), e a condição é considerada <strong>descompensada</strong>.</p>` },
    hipernatremia: { title: 'Correção da Hipernatremia', content: `<p>A hipernatremia indica um excesso de sódio em relação à água corporal, resultando em hipertonicidade do plasma.</p><div class="flowchart-box">Hipernatremia (↑ Na⁺) → Aumento da Osmolalidade Plasmática</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Água sai das células (especialmente neurônios) por osmose → Desidratação celular</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Sinais neurológicos (letargia, convulsões)</div><p>O objetivo do tratamento é <strong>reduzir a tonicidade plasmática de forma lenta e controlada</strong>. Isso é feito administrando "água livre" (água sem excesso de solutos), que diluirá o sódio sérico e reidratará as células. <strong>Soluções hipotônicas como Dextrose 5% em água (D5W)</strong> são ideais, pois a glicose é rapidamente metabolizada, restando apenas água. A correção rápida demais pode causar edema cerebral, sendo uma complicação grave.</p>` },
    hiponatremia: { title: 'Correção da Hiponatremia', content: `<p>A hiponatremia sintomática (especialmente a aguda) é uma emergência neurológica. O tratamento visa aumentar o sódio sérico de forma controlada para evitar a mielinólise pontina.</p><p>A fórmula para calcular o déficit de sódio é: <strong>Déficit de Na⁺ (mEq) = (Na⁺ desejado - Na⁺ do paciente) x 0.6 x Peso (kg)</strong>.</p><p>Este déficit é então reposto lentamente ao longo de várias horas, geralmente utilizando soluções salinas hipertônicas (NaCl 3% ou 7.5%). A velocidade de correção não deve exceder 0.5 mEq/L/hora para evitar danos neurológicos.</p>`},
    hipercalemia: { title: 'Correção da Hipercalemia', content: `<p>A hipercalemia é uma emergência médica devido ao seu efeito sobre o potencial de membrana das células cardíacas, aumentando o risco de arritmias fatais.</p><div class="flowchart-box">Hipercalemia (↑ K⁺) → Reduz o gradiente de potássio transmembrana</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Despolarização parcial da célula cardíaca → Inativação dos canais de sódio</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Condução elétrica lenta → Bradicardia, bloqueios, parada cardíaca</div><p>O tratamento tem dois objetivos imediatos:</p><ol class="list-decimal list-inside"><li><strong>Cardioproteção:</strong> Administrar <strong>Gluconato de Cálcio 10%</strong>. O cálcio não baixa o potássio, mas antagoniza seus efeitos na membrana cardíaca, estabilizando o coração.</li><li><strong>Redução do K⁺ sérico:</strong> Administrar <strong>Insulina + Glicose</strong>. A insulina empurra o potássio para dentro das células, removendo-o rapidamente do plasma. A glicose é dada junto para prevenir hipoglicemia.</li></ol>`},
    hipocalemia: { title: 'Correção da Hipocalemia', content: `<p>A hipocalemia causa hiperpolarização das células musculares e nervosas, levando à fraqueza muscular (incluindo ventroflexão cervical em gatos e fraqueza dos músculos respiratórios) e íleo paralítico.</p><p>A reposição deve ser feita de forma cautelosa para evitar hipercalemia iatrogênica. A regra geral é <strong>nunca exceder a taxa de infusão de 0.5 mEq de K⁺/kg/hora</strong>. O potássio (KCl) é sempre diluído em fluidos de manutenção e nunca administrado em bolus.</p><p>A quantidade a ser adicionada na bolsa de fluido depende da severidade da hipocalemia, seguindo tabelas de reposição padrão.</p>`},
    hipocloremia: { title: 'Correção da Hipocloremia', content: `<p>A hipocloremia (↓ Cl⁻) está frequentemente associada à <strong>alcalose metabólica</strong>, especialmente em casos de vômito (perda de HCl). O cloro é necessário para que os rins possam excretar o excesso de bicarbonato (HCO₃⁻) e corrigir a alcalose.</p><div class="flowchart-box">Vômito → Perda de HCl</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">↓ Cl⁻ e ↑ HCO₃⁻ no plasma (Alcalose Metabólica)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Rim tenta reabsorver Na⁺, mas sem Cl⁻ suficiente para acompanhar, reabsorve HCO₃⁻ no lugar</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Perpetuação da Alcalose Metabólica</div><p>O tratamento consiste em fornecer uma fonte de cloro. A <strong>fluidoterapia com Cloreto de Sódio 0.9% (NaCl 0.9%)</strong> é a escolha ideal, pois repõe tanto o volume quanto o cloro, permitindo que os rins excretem o bicarbonato e corrijam o pH.</p>`},
    hipoalbuminemia: { title: 'Manejo da Hipoalbuminemia', content: `<p>A albumina é a principal proteína responsável pela pressão oncótica coloidal (POC), a força que mantém os fluidos dentro dos vasos sanguíneos.</p><div class="flowchart-box">Hipoalbuminemia (↓ Albumina) → ↓ Pressão Oncótica Coloidal</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Forças de Starling desequilibradas → Pressão hidrostática supera a oncótica</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Extravasamento de fluido para o interstício → Edema e Efusões (ascite, derrame pleural)</div><p>O tratamento definitivo é corrigir a causa base (perda renal, hepática, gastrointestinal). Para suporte, a reposição da POC é crucial. A <strong>transfusão de plasma fresco congelado</strong> fornece albumina e outros fatores. A <strong>albumina humana 25%</strong> é mais concentrada, mas carrega risco de reações de hipersensibilidade e deve ser usada com extrema cautela e monitoramento intensivo. Cristaloides em excesso podem piorar o edema.</p>`},
    hipertermia: { title: 'Manejo da Hipertermia', content: `<p>A hipertermia (>39.2°C) grave pode levar à desnaturação de proteínas, falência de múltiplos órgãos e coagulação intravascular disseminada (CIVD).</p><p>O objetivo é o <strong>resfriamento controlado</strong> para evitar uma queda brusca para hipotermia iatrogênica.</p><div class="flowchart-box">Superaquecimento → Temperatura central > 41°C</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Dano celular direto e resposta inflamatória sistêmica</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">Falência de múltiplos órgãos</div><p><strong>Métodos de resfriamento:</strong></p><ul class="list-disc list-inside"><li><strong>Ativos:</strong> Usar ventoinhas e borrifar o paciente com água em temperatura ambiente (a evaporação é o método mais eficaz). Aplicar compressas úmidas em áreas de grandes vasos (axilas, virilha, pescoço). Fluidos IV em temperatura ambiente também ajudam.</li><li><strong>Monitoramento:</strong> A temperatura deve ser aferida continuamente. O resfriamento ativo deve ser <strong>interrompido quando a temperatura atingir 39.5°C</strong> para evitar que o paciente continue a esfriar e entre em hipotermia.</li><li><strong>Evitar:</strong> Imersão em água gelada (causa vasoconstrição periférica, que impede a perda de calor) e uso de álcool (risco de intoxicação e resfriamento muito rápido).</li></ul>`},
    hipotermia: { title: 'Manejo da Hipotermia', content: `<p>A hipotermia (<38.0°C) reduz a taxa metabólica, o débito cardíaco e pode levar a arritmias, coagulopatias e depressão do sistema nervoso central.</p><p>O reaquecimento deve ser gradual para evitar vasodilatação periférica súbita, que pode causar uma "queda de pressão de rebote" e piorar o choque.</p><p><strong>Métodos de reaquecimento:</strong></p><ul class="list-disc list-inside"><li><strong>Passivo (Hipotermia Leve):</strong> Isolar o paciente do ambiente frio com cobertores secos.</li><li><strong>Ativo Externo (Hipotermia Moderada):</strong> Utilizar mantas de ar aquecido (Bair Hugger), bolsas de água quente enroladas em toalhas ou luvas com água morna. Evitar contato direto de fontes de calor com a pele para prevenir queimaduras.</li><li><strong>Ativo Interno (Hipotermia Grave):</strong> Administrar fluidos intravenosos aquecidos (39-40°C) e, em casos extremos, lavagem peritoneal ou pleural com fluidos aquecidos.</li></ul>`},
    anionGap: { title: 'Ânion Gap (AG)', content: `<p>O Ânion Gap representa os ânions não mensurados no plasma (albumina, fosfatos, sulfatos, ânions orgânicos). É uma ferramenta crucial para o diagnóstico diferencial da acidose metabólica.</p><p><strong>Cálculo:</strong> AG = (Na⁺ + K⁺) - (Cl⁻ + HCO₃⁻)</p><p>Como a hipoalbuminemia pode mascarar um AG elevado, ele deve ser corrigido: <strong>AG Corrigido = AG + 0.42 x (Albumina Normal - Albumina do Paciente)</strong>.</p><div class="flowchart-box">Acidose Metabólica (↓ HCO₃⁻)</div><div class="flowchart-arrow">↓</div><div class="flowchart-box">AG está Alto ou Normal?</div><div class="grid grid-cols-2 gap-4"><div class="text-center"><strong>AG Alto</strong><br>↓<br>Ganho de Ácido<br>(Cetoacidose, Uremia, Lactato, Intoxicação)</div><div class="text-center"><strong>AG Normal (Hiperclorêmica)</strong><br>↓<br>Perda de Bicarbonato<br>(Diarreia, Acidose Tubular Renal)</div></div>`},
    oxygenation: { title: 'Avaliação da Oxigenação (Gradiente A-a)', content: `<p>O Gradiente Alvéolo-arterial de O₂ (Gradiente A-a) avalia a eficiência da transferência de oxigênio dos alvéolos para o sangue arterial. É útil para diferenciar as causas de hipoxemia (baixa PaO₂).</p><p><strong>Cálculo:</strong> Gradiente A-a = PAO₂ - PaO₂</p><p>Onde a Pressão Alveolar de O₂ (PAO₂) é calculada como: <strong>PAO₂ = [FiO₂ x (Patm - PH₂O)] - (PaCO₂ / 0.8)</strong>.</p><p>Um gradiente <strong>normal (< 15 mmHg)</strong> com hipoxemia sugere uma causa extra-pulmonar, como hipoventilação. Um gradiente <strong>alargado (> 15 mmHg)</strong> indica uma doença pulmonar intrínseca (desequilíbrio V/Q, shunt, barreira de difusão).</p>`},
    ventilation: { title: 'Avaliação da Ventilação (pCO₂)', content: `<p>A pressão parcial de CO₂ no sangue arterial (PaCO₂) é o indicador mais direto da adequação da ventilação alveolar (a troca de gases nos pulmões).</p><ul class="list-disc list-inside"><li><strong>Hipoventilação (Hipercapnia):</strong> PaCO₂ alta. Ocorre quando a ventilação é insuficiente para eliminar o CO₂ produzido pelo metabolismo. Causas: obstrução de vias aéreas, doença pleural, depressão do SNC. Leva à <strong>acidose respiratória</strong>.</li><li><strong>Hiperventilação (Hipocapnia):</strong> PaCO₂ baixa. Ocorre quando a ventilação é excessiva em relação à produção de CO₂. Causas: dor, estresse, hipoxemia, febre. Leva à <strong>alcalose respiratória</strong>.</li></ul>`}
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
    anionGap: { value: string; correctedValue: string; interpretation: string; };
    differentials: string[];
}

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
    const { species, ph, pco2, hco3, po2, temp, fio2, na, k, cl, albumin } = inputs;
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
        results.compensation = evaluateCompensation(pco2, hco3, results.primaryDisorder.disorder, {hco3: currentRef.hco3.ideal, pco2: currentRef.pco2_comp});
    }
    
    results.ventilationStatus = analyzeVentilation(pco2, species, currentRef, probableSampleType);
    results.oxygenation = analyzeOxygenation(po2, pco2, fio2, probableSampleType);
    results.electrolyteStatus = analyzeElectrolytes(na, k, cl, albumin, species, currentRef);

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
         message += `<br><small class="text-gray-900">Nota: A análise assume que os valores foram corrigidos para a temperatura do paciente de ${temp}°C.</small>`;
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

    switch(primaryDisorder) {
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

const Hemogasometria = ({ onBack }: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState('analyzer');
    const [modalData, setModalData] = useState<{title: string, content: string} | null>(null);
    
    // --- Analyzer State ---
    const [inputs, setInputs] = useState({
        species: 'dog', declaredSampleType: 'arterial', fio2: '21',
        ph: '', pco2: '', hco3: '', po2: '', temp: '', na: '', k: '', cl: '', albumin: ''
    });
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [showResults, setShowResults] = useState(false);

    // --- Quiz State ---
    const [quizCase, setQuizCase] = useState<QuizCase | null>(null);
    const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    useEffect(() => {
        handleNewQuizCase();
    }, []);

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

    const handleAnalyzerSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const numericInputs: any = {};
        for(const key in inputs) {
            const parsed = parseFloat(inputs[key]);
            numericInputs[key] = isNaN(parsed) ? (key === 'species' || key === 'declaredSampleType' ? inputs[key] : null) : parsed;
        }
        const analysis = analyzeBloodGas(numericInputs);
        setAnalysisResult(analysis);
        setShowResults(true);
    }, [inputs]);

    const handleQuizSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setQuizSubmitted(true);
    }, []);

    const openModal = useCallback((key: string) => {
        if (explanationData[key]) {
            setModalData(explanationData[key]);
        }
    }, []);
    
    const alerts = useMemo(() => {
        if (!showResults || !analysisResult) return [];
        const alertsList = [];
        const { anionGap, compensation, electrolyteStatus, sampleCheck } = analysisResult;

        if (anionGap.interpretation === 'Alto Anion Gap (Normoclorêmico)') alertsList.push({type: 'warning', msg: `O Ânion Gap corrigido está elevado (<strong>${anionGap.correctedValue}</strong>), indicando acúmulo de ânions não mensurados.`, key: 'anionGap'});
        if (compensation.mixedDisorder) alertsList.push({type: 'warning', msg: `A compensação parece inadequada, sugerindo um <strong>distúrbio misto</strong>: ${compensation.mixedDisorder}.`, key: 'compensation'});
        
        electrolyteStatus.forEach(e => { 
            if (e.alert && !e.status.toLowerCase().includes('hipercalemia')) {
                alertsList.push({type: 'warning', msg: e.alert, key: e.status.toLowerCase()});
            }
        });

        if (sampleCheck.probableType !== inputs.declaredSampleType && sampleCheck.probableType !== 'mista/indeterminada') alertsList.push({type: 'critical', msg: `A amostra foi declarada como <strong>${inputs.declaredSampleType}</strong>, mas a pO₂ sugere que a origem é <strong>${sampleCheck.probableType}</strong>. A interpretação deve ser ajustada.`, key: 'sampleType'});
        const phValue = parseFloat(inputs.ph);
        if (phValue < 7.2 || phValue > 7.6) alertsList.push({type: 'critical', msg: `O pH de <strong>${phValue}</strong> está em um nível crítico e representa risco de vida.`, key: 'diagnosis'});
        electrolyteStatus.forEach(e => { 
            if (e.status.toLowerCase().includes('hipercalemia')) {
                alertsList.push({type: 'critical', msg: e.alert, key: 'hipercalemia'});
            }
        });
        return alertsList;
    }, [showResults, analysisResult, inputs]);
    
    const numericQuizKeys: (keyof QuizInputs)[] = ['ph', 'pco2', 'hco3', 'po2', 'temp', 'na', 'k', 'cl', 'albumin', 'fio2'];

    return (
        <>
        <style>{`
            :root { --main-bg: #f9fafb; }
            body { font-family: 'Inter', sans-serif; background-color: var(--main-bg); }
            .result-card, .quiz-feedback { transition: all 0.3s ease-in-out; transform: translateY(20px); opacity: 0; }
            .result-card.visible, .quiz-feedback.visible { transform: translateY(0); opacity: 1; }
            .input-group label { transition: all 0.2s ease; }
            .input-group input:focus + label, .input-group input:not(:placeholder-shown) + label { transform: translateY(-1.5rem) scale(0.8); color: #111827; }
            .input-group input:not(:placeholder-shown) + label { color: #111827; }
            .tab-button { transition: all 0.3s; color: #111827; }
            .tab-button.active { border-color: #4f46e5; color: #111827; background-color: #eef2ff; }
            .quiz-option.selected { background-color: #dbeafe; border-color: #3b82f6; }
            .quiz-option.correct { background-color: #dcfce7 !important; border-color: #22c55e !important; }
            .quiz-option.incorrect { background-color: #fee2e2 !important; border-color: #ef4444 !important; }
            .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
            .modal-overlay.visible { opacity: 1; visibility: visible; }
            .modal-content { background: white; padding: 2rem; border-radius: 1rem; max-width: 90%; width: 600px; max-height: 90vh; overflow-y: auto; transform: scale(0.9); transition: transform 0.3s; }
            .flowchart-box { border: 1px solid #9ca3af; padding: 0.5rem; border-radius: 0.5rem; background-color: #f3f4f6; text-align: center; margin: 0.5rem 0; color: #111827; }
            .flowchart-arrow { text-align: center; font-size: 1.5rem; color: #111827; }
        `}</style>
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
             <button onClick={onBack} className="mb-6 bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
                &larr; Voltar para a Lista
            </button>
            <header className="text-center mb-8">
                <img 
                    src="https://res.cloudinary.com/dwta1roq1/image/upload/w_120,q_auto,f_auto/logo/hemogasometria" 
                    alt="Ícone do aplicativo de Hemogasometria Veterinária, com um cão, uma gota de sangue e uma fita de DNA"
                    className="mx-auto mb-4"
                />
                <h1 className="text-4xl font-bold text-gray-900 mb-2">HemoGaso Vet 🩸</h1>
                <p className="text-lg text-gray-900">Análise Inteligente de Hemogasometria para Cães e Gatos</p>
            </header>
            
            <div className="mb-6 border-b border-gray-200">
                 <nav className="flex space-x-4" aria-label="Tabs">
                    <button className={`tab-button font-medium py-3 px-4 border-b-2 border-transparent hover:border-indigo-600 ${activeTab === 'analyzer' ? 'active' : ''}`} onClick={() => setActiveTab('analyzer')}>Analisador Clínico</button>
                    <button className={`tab-button font-medium py-3 px-4 border-b-2 border-transparent hover:border-indigo-600 ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧠 Modo Quiz</button>
                 </nav>
            </div>
            
            {activeTab === 'analyzer' && (
                <div>
                    <main className="bg-white p-6 rounded-2xl shadow-lg">
                        <form onSubmit={handleAnalyzerSubmit} className="space-y-6">
                            {/* Input fields */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="species" className="block text-sm font-medium text-gray-900 mb-2">Espécie 🐾</label>
                                    <select id="species" value={inputs.species} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900">
                                        <option value="dog">Cão</option>
                                        <option value="cat">Gato</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="declaredSampleType" className="block text-sm font-medium text-gray-900 mb-2">Tipo de Amostra (declarado) 💉</label>
                                    <select id="declaredSampleType" value={inputs.declaredSampleType} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900">
                                        <option value="arterial">Arterial</option>
                                        <option value="venous">Venosa</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                                <div className="relative input-group"><input type="number" step="0.01" id="ph" placeholder=" " value={inputs.ph} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="ph" className="absolute left-3 top-4 text-gray-900 pointer-events-none">pH 🧪</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="pco2" placeholder=" " value={inputs.pco2} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="pco2" className="absolute left-3 top-4 text-gray-900 pointer-events-none">pCO₂ (mmHg) 💨</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="hco3" placeholder=" " value={inputs.hco3} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="hco3" className="absolute left-3 top-4 text-gray-900 pointer-events-none">HCO₃⁻ (mEq/L) 🛡️</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="po2" placeholder=" " value={inputs.po2} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="po2" className="absolute left-3 top-4 text-gray-900 pointer-events-none">pO₂ (mmHg) 😮‍💨</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="temp" placeholder=" " value={inputs.temp} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="temp" className="absolute left-3 top-4 text-gray-900 pointer-events-none">Temperatura (°C) 🌡️</label></div>
                                <div className="relative input-group"><input type="number" step="1" id="fio2" placeholder=" " value={inputs.fio2} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" required /><label htmlFor="fio2" className="absolute left-3 top-4 text-gray-900 pointer-events-none">FiO₂ (%) 🌬️</label></div>
                            </div>

                             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                                 <div className="relative input-group"><input type="number" step="0.1" id="na" placeholder=" " value={inputs.na} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" /><label htmlFor="na" className="absolute left-3 top-4 text-gray-900 pointer-events-none">Na⁺ (mEq/L) 🧂</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="k" placeholder=" " value={inputs.k} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" /><label htmlFor="k" className="absolute left-3 top-4 text-gray-900 pointer-events-none">K⁺ (mEq/L) 🍌</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="cl" placeholder=" " value={inputs.cl} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" /><label htmlFor="cl" className="absolute left-3 top-4 text-gray-900 pointer-events-none">Cl⁻ (mEq/L)</label></div>
                                <div className="relative input-group"><input type="number" step="0.1" id="albumin" placeholder=" " value={inputs.albumin} onChange={handleInputChange} className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg peer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pt-6 text-gray-900" /><label htmlFor="albumin" className="absolute left-3 top-4 text-gray-900 pointer-events-none">Albumina (g/dL)</label></div>
                            </div>
                            <div className="flex justify-center pt-4">
                                <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform">Analisar Resultados</button>
                            </div>
                        </form>
                    </main>

                    {showResults && analysisResult && (
                        <div className="mt-8 space-y-4">
                            {alerts.length > 0 && (
                                <div className="mt-8 space-y-3">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Alertas Clínicos</h2>
                                    {alerts.map((alert, index) => {
                                        const colors = { critical: 'bg-red-100 border-red-500 text-red-900', warning: 'bg-yellow-100 border-yellow-500 text-yellow-900' };
                                        return (
                                            <div key={index} className={`p-4 border-l-4 rounded-r-lg ${colors[alert.type]} flex items-center justify-between result-card ${showResults ? 'visible' : ''}`} style={{ transitionDelay: `${index * 100}ms`}} role="alert">
                                                <div>
                                                    <p className="font-bold">{alert.type === 'critical' ? '🔴 Alerta Crítico' : '🟡 Atenção'}</p>
                                                    <p dangerouslySetInnerHTML={{ __html: alert.msg }} />
                                                </div>
                                                {alert.key && <button onClick={() => openModal(alert.key)} className="ml-2 text-xl">❓</button>}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                             <ResultCard title="1. Verificação da Amostra" content={analysisResult.sampleCheck.message} emoji={analysisResult.sampleCheck.emoji} dataKey="sampleType" openModal={openModal} delay={0} />
                             <ResultCard title="2. Status do pH" content={`pH ${analysisResult.phStatus.state}`} emoji={analysisResult.phStatus.emoji} dataKey="diagnosis" openModal={openModal} delay={100} />
                             <ResultCard title="3. Distúrbio Primário" content={`${analysisResult.primaryDisorder.disorder} <br/><small class="text-gray-900">Causa: ${analysisResult.primaryDisorder.cause}</small>`} emoji={analysisResult.primaryDisorder.emoji} dataKey="diagnosis" openModal={openModal} delay={200} />
                             <ResultCard title="4. Análise Ventilatoria" content={analysisResult.ventilationStatus.state} emoji={analysisResult.ventilationStatus.emoji} dataKey="ventilation" openModal={openModal} delay={300} />
                             <ResultCard title="5. Avaliação da Compensação (Cães)" content={`Status: ${analysisResult.compensation.status}<br><small class="text-gray-900">Esperado: ${JSON.stringify(analysisResult.compensation.expected)}</small>${analysisResult.compensation.mixedDisorder ? `<br><strong class="text-gray-900">Distúrbio Misto Sugerido: ${analysisResult.compensation.mixedDisorder}</strong>` : ''}`} emoji='⚖️' dataKey="compensation" openModal={openModal} delay={400} />
                             <ResultCard title="6. Avaliação da Oxigenação" content={analysisResult.oxygenation.content} emoji={analysisResult.oxygenation.emoji} dataKey="oxygenation" openModal={openModal} delay={500} />
                             <ElectrolyteCard electrolyteStatus={analysisResult.electrolyteStatus} openModal={openModal} delay={600} />
                             <ResultCard title="8. Anion Gap (AG)" content={`AG: ${analysisResult.anionGap.value} mEq/L<br>AG Corrigido: ${analysisResult.anionGap.correctedValue} mEq/L<br><strong>Interpretação: ${analysisResult.anionGap.interpretation}</strong>`} emoji=' Gap ' dataKey="anionGap" openModal={openModal} delay={700} />
                             <ResultCard title="9. Principais Diagnósticos Diferenciais" content={`<ul>${analysisResult.differentials.map(d => `<li class="ml-4 list-disc">${d}</li>`).join('')}</ul>`} emoji='🩺' dataKey="differentials" openModal={openModal} delay={800} />
                        </div>
                    )}
                     <div className="mt-8 text-gray-900">
                        <details className="bg-gray-100 border border-gray-200 rounded-lg">
                            <summary className="font-semibold p-3 cursor-pointer hover:bg-gray-200 rounded-t-lg">📖 Guia de Boas Práticas de Coleta</summary>
                            <div className="p-4 border-t border-gray-300 space-y-3 text-sm">
                                <p><strong>Origem da Amostra:</strong> Amostra arterial é essencial para avaliar oxigenação. A venosa é útil para o componente metabólico.</p>
                                <p><strong>Bolhas de Ar:</strong> Remova bolhas da seringa imediatamente. Elas alteram drasticamente pCO₂ e pO₂.</p>
                                <p><strong>Tempo de Análise:</strong> Analise em até 5 minutos. Se não, armazene em gelo (4°C) por no máximo 4 horas.</p>
                                <p><strong>Anticoagulante:</strong> Use apenas heparina lítica na quantidade mínima. Excesso de heparina dilui a amostra.</p>
                                <p><strong>Temperatura do Paciente:</strong> Sempre registre a temperatura para a correção correta dos gases pelo analisador.</p>
                                <p><strong>Contaminação e Hemólise:</strong> Coleta asséptica e atraumática é crucial. Hemólise ou coágulos falseiam os resultados.</p>
                                <p><strong>Estase Venosa:</strong> Obtenha um fluxo livre de sangue. Estase ou atividade muscular podem elevar o lactato e alterar o pH.</p>
                            </div>
                        </details>
                    </div>
                </div>
            )}
            
            {activeTab === 'quiz' && quizCase && (
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-6 text-gray-900">
                        <h2 className="text-2xl font-bold">Caso Clínico Interativo</h2>
                        <button onClick={handleNewQuizCase} className="bg-indigo-100 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition">Gerar Novo Caso</button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-gray-900 font-bold"><strong>Espécie:</strong> {quizCase.inputs.species === 'dog' ? 'Cão 🐕' : 'Gato 🐈'}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-center">
                            {numericQuizKeys.map(key => (
                                <div key={key} className="bg-indigo-50 p-2 rounded text-gray-900 font-medium">
                                    <strong>{key.toUpperCase()}:</strong> {(quizCase.inputs[key] as number).toFixed(key === 'ph' ? 2 : 1)}
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
                                const qNum = 4 + Object.keys(userAnswers).filter(k => Object.keys(quizTherapyOptions).includes(k)).length;
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
                            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-transform">Corrigir Exercício</button>
                        </div>
                    </form>
                </div>
            )}

            {modalData && (
                <div className="modal-overlay visible" onClick={() => setModalData(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">{modalData.title}</h3>
                            <button onClick={() => setModalData(null)} className="text-gray-900 hover:text-black text-2xl">&times;</button>
                        </div>
                        <div className="text-gray-900 space-y-4" dangerouslySetInnerHTML={{ __html: modalData.content }} />
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

// --- SUB-COMPONENTS ---
const ResultCard = ({ title, content, emoji, dataKey, openModal, delay }) => (
    <div className={`result-card bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-start space-x-4 visible`} style={{transitionDelay: `${delay}ms`}}>
        <div className="text-3xl">{emoji}</div>
        <div className="flex-grow">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                {dataKey && <button onClick={() => openModal(dataKey)} className="text-xl">❓</button>}
            </div>
            <div className="text-gray-900 mt-1" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
);

const ElectrolyteCard = ({ electrolyteStatus, openModal, delay }) => {
    if (electrolyteStatus.length === 0) return null;
    return (
        <div className={`result-card bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-start space-x-4 visible`} style={{transitionDelay: `${delay}ms`}}>
            <div className="text-3xl">⚡</div>
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-900">7. Análise de Eletrólitos e Albumina</h3>
                {electrolyteStatus.map(e => {
                    const colorClass = e.status === 'Normal' ? 'text-green-700' : 'text-red-700';
                    return (
                        <div key={e.name} className="py-1 flex items-center justify-between text-gray-900">
                            <span><strong>{e.name}:</strong> {e.value} {e.unit} <span className={`${colorClass} font-bold`}>({e.status})</span> <small>Ref: {e.ref}</small></span>
                            <button onClick={() => openModal(e.status.toLowerCase())} className="ml-2 text-xl">❓</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const QuizQuestion = ({ qKey, text, options, quizCase, userAnswers, setUserAnswers, quizSubmitted, openModal }) => {
    const handleSelect = (option) => {
        if (quizSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [qKey]: option }));
    };

    const selectedValue = userAnswers[qKey];
    const correctAnswer = quizCase.correctAnswers[qKey];
    const isCorrect = selectedValue === correctAnswer;
    
    const getExplanation = () => {
        let explanationStart = `A resposta correta é <strong>${correctAnswer}</strong>. `;
        if(isCorrect) explanationStart = '';

        switch(qKey) {
            case 'sampleType': return `${explanationStart}O valor de pO₂ (${quizCase.inputs.po2.toFixed(1)} mmHg) é característico de uma amostra <strong>${correctAnswer}</strong>.`;
            case 'diagnosis': return `${explanationStart}A combinação de <strong>${quizCase.inputs.ph < 7.35 ? 'Acidemia' : 'Alcalemia'}</strong> com a alteração primária em ${correctAnswer.includes('Metabólica') ? 'HCO₃⁻' : 'pCO₂'} caracteriza <strong>${correctAnswer}</strong>.`;
            case 'compensation': return `${explanationStart}A análise da resposta compensatória indica um quadro <strong>${correctAnswer}</strong>.`;
            default: return explanationStart;
        }
    }

    return (
        <div>
            <p className="font-semibold text-gray-900 mb-3">{text}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map(opt => {
                    let classes = 'quiz-option text-gray-900 border-2 border-gray-300 p-3 rounded-lg cursor-pointer hover:bg-gray-100';
                    if (quizSubmitted) {
                        if (opt === correctAnswer) classes += ' correct';
                        if (opt === selectedValue && !isCorrect) classes += ' incorrect';
                    } else {
                        if (opt === selectedValue) classes += ' selected';
                    }
                    return <div key={opt} className={classes} onClick={() => handleSelect(opt)}>{opt}</div>;
                })}
            </div>
            {quizSubmitted && (
                 <div className="mt-2">
                    <div className={`quiz-feedback visible p-3 rounded-lg flex items-center justify-between text-gray-900 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                        <span dangerouslySetInnerHTML={{ __html: `${isCorrect ? '✔️ <strong>Correto!</strong>' : '❌ <strong>Incorreto.</strong>'} ${getExplanation()}` }} />
                        {explanationData[qKey] && <button onClick={() => openModal(qKey)} className="ml-2 text-xl">❓</button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hemogasometria;
