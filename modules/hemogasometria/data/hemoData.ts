export const HEMO_REF = {
    dog: {
        ph: { min: 7.35, max: 7.45, ideal: 7.40 },
        pco2: { min: 35, max: 45, ideal: 40 },
        hco3: { min: 20, max: 24, ideal: 22 },
        po2: { min: 90, max: 100, ideal: 95 },
        na: { min: 141, max: 152, ideal: 146 },
        k: { min: 3.5, max: 5.0, ideal: 4.2 },
        cl: { min: 105, max: 117, ideal: 111 },
        albumin: { ideal: 3.0 }
    },
    cat: {
        ph: { min: 7.35, max: 7.45, ideal: 7.40 },
        pco2: { min: 28, max: 34, ideal: 31 },
        hco3: { min: 17, max: 21, ideal: 19 },
        po2: { min: 90, max: 100, ideal: 95 },
        na: { min: 149, max: 162, ideal: 155 },
        k: { min: 3.5, max: 5.0, ideal: 4.2 },
        cl: { min: 117, max: 123, ideal: 120 },
        albumin: { ideal: 3.0 }
    }
};

export const EXPLANATION_DATA: Record<string, { title: string; content: string }> = {
    ph: { title: 'O que é o pH?', content: 'O pH mede a acidez ou alcalinidade do sangue. Valores normais são estritamente mantidos entre 7.35 e 7.45.' },
    pco2: { title: 'PCO2', content: 'Pressão parcial de dióxido de carbono. Reflete a ventilação alveolar (componente respiratório).' },
    hco3: { title: 'Bicarbonato (HCO3)', content: 'Reflete o componente metabólico do equilíbrio ácido-base, regulado pelos rins.' },
    po2: { title: 'PO2', content: 'A pressão parcial de oxigênio no sangue arterial.' }
};
