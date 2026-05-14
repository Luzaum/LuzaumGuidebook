export function normalizeString(value: any, defaultValue: string = ''): string {
    if (value === null || value === undefined) return defaultValue;
    if (typeof value === 'string') return value.trim() || defaultValue;
    return String(value).trim() || defaultValue;
}

export function normalizeArray<T>(value: any, mapper?: (item: any) => T): T[] {
    if (!Array.isArray(value)) return [];
    const mapped = mapper ? value.map(mapper) : value;
    return mapped.filter((item: any) => {
        if (typeof item === 'string') return item.trim() !== '';
        return item !== null && item !== undefined;
    }) as T[];
}

export function normalizeBoolean(value: any, defaultValue: boolean = false): boolean {
    if (typeof value === 'boolean') return value;
    if (value === 'true' || value === 1) return true;
    if (value === 'false' || value === 0) return false;
    return defaultValue;
}

export function normalizeSpeciesList(value: any): Array<'dog' | 'cat'> {
    const rawValues = Array.isArray(value) ? value : [value];
    const normalized = rawValues
        .map((item) => normalizeString(item).toLowerCase())
        .flatMap((item) => item === 'both' ? ['dog', 'cat'] : [item])
        .filter((item): item is 'dog' | 'cat' => item === 'dog' || item === 'cat');

    return Array.from(new Set(normalized));
}

export function normalizeMedicationDoseArray(value: any) {
    return normalizeArray(value, (item) => ({
        id: normalizeString(item?.id, `dose-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        species: normalizeMedicationDoseSpecies(item?.species),
        indication: normalizeString(item?.indication),
        doseMin: Number(item?.doseMin ?? 0),
        doseMax: item?.doseMax === null || item?.doseMax === undefined || item?.doseMax === ''
            ? undefined
            : Number(item.doseMax),
        doseUnit: normalizeString(item?.doseUnit, 'mg'),
        perWeightUnit: normalizeString(item?.perWeightUnit, 'kg'),
        route: normalizeString(item?.route),
        frequency: normalizeString(item?.frequency),
        duration: normalizeString(item?.duration),
        notes: normalizeString(item?.notes),
        calculatorEnabled: normalizeBoolean(item?.calculatorEnabled, true),
        presentationId: normalizeString(item?.presentationId).trim() || undefined,
    }));
}

function normalizeMedicationDoseSpecies(value: any): 'dog' | 'cat' | 'both' {
    const species = normalizeString(value, 'both').toLowerCase();
    return species === 'dog' || species === 'cat' || species === 'both' ? species : 'both';
}

export function normalizeMedicationPresentationArray(value: any) {
    return normalizeArray(value, (item) => ({
        id: normalizeString(item?.id, `presentation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        label: normalizeString(item?.label),
        form: normalizeString(item?.form),
        concentrationValue: item?.concentrationValue === null || item?.concentrationValue === undefined || item?.concentrationValue === ''
            ? undefined
            : Number(item.concentrationValue),
        concentrationUnit: normalizeString(item?.concentrationUnit),
        packInfo: normalizeString(item?.packInfo),
        route: normalizeString(item?.route),
        scoringInfo: normalizeString(item?.scoringInfo),
        channel: ['human_pharmacy', 'veterinary', 'compounded'].includes(String(item?.channel))
            ? (String(item.channel) as 'human_pharmacy' | 'veterinary' | 'compounded')
            : 'veterinary',
    }));
}

export function generateSafeSlug(text: string): string {
    return String(text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function parseImportPayload(rawSource: string | object) {
    let parsed: any;
    if (typeof rawSource === 'string') {
        try {
            parsed = JSON.parse(rawSource);
        } catch {
            throw new Error('Falha no parse do JSON. Verifique a sintaxe.');
        }
    } else {
        parsed = rawSource;
    }

    if (Array.isArray(parsed)) {
        return parsed;
    } else if (parsed && typeof parsed === 'object') {
        if (Array.isArray(parsed.items)) {
            return parsed.items;
        }
        return [parsed];
    }

    throw new Error('Formato JSON não reconhecido. Forneça um array ou objeto válido.');
}

const CATEGORY_ALIASES: Record<string, string> = {
    'dor': 'anestesia-dor',
    'analgesia': 'anestesia-dor',
    'anestesia': 'anestesia-dor',
    'cirurgia': 'procedimentos',
    'cirurgico': 'procedimentos',
    'cirurgica': 'procedimentos',
    'cirurgia-geral': 'procedimentos',
    'cirurgia-pequenos-animais': 'procedimentos',
    'cirurgia-de-tecidos-moles': 'cirurgia-tecidos-moles',
    'tecidos-moles': 'cirurgia-tecidos-moles',
    'cirurgia-ortopedica': 'cirurgia-ortopedica-traumatologia',
    'traumatologia': 'cirurgia-ortopedica-traumatologia',
    'cirurgia-neurologica': 'cirurgia-neurologica',
    'neurocirurgia': 'cirurgia-neurologica',
    'infeccioso': 'infectologia',
    'infecciosa': 'infectologia',
    'infecciosas': 'infectologia',
    'infecto': 'infectologia',
    'parasitologia': 'parasitologia',
    'parasitario': 'parasitologia',
    'parasitarios': 'parasitologia',
    'hematologico': 'hematologia',
    'gastro': 'gastroenterologia',
    'gastrointestinal': 'gastroenterologia',
    'neuro': 'neurologia',
    'dermato': 'dermatologia',
    'dermatologia': 'dermatologia',
    'otologia': 'otologia',
    'oto': 'otologia',
    'oftalmo': 'oftalmologia',
    'oftalmologia': 'oftalmologia',
    'ortopedia': 'ortopedia',
    'ortopedica': 'ortopedia',
    'respiratoria': 'respiratorio',
    'pneumologia': 'respiratorio',
    'cardio': 'cardiologia',
    'endocrino': 'endocrinologia',
    'metabolico': 'endocrinologia',
    'nefro': 'nefrologia-urologia',
    'nefrologia': 'nefrologia-urologia',
    'urologia': 'nefrologia-urologia',
    'renal': 'nefrologia-urologia',
    'hepatico': 'hepatologia-pancreas',
    'hepatologia': 'hepatologia-pancreas',
    'pancreas': 'hepatologia-pancreas',
    'emergencia': 'emergencia-intensivismo',
    'intensivismo': 'emergencia-intensivismo',
    'uti': 'emergencia-intensivismo',
    'reproducao': 'reproducao-neonatologia',
    'neonatologia': 'reproducao-neonatologia',
    'imuno': 'imunologia',
    'onco': 'oncologia',
    'fluidoterapia': 'fluidoterapia-disturbios-hidroeletroliticos',
    'fluido': 'fluidoterapia-disturbios-hidroeletroliticos',
    'imagem': 'diagnostico-por-imagem',
    'diagnostico-por-imagem': 'diagnostico-por-imagem',
    'radiologia': 'diagnostico-por-imagem',
    'ultrassonografia': 'diagnostico-por-imagem',
    'tomografia': 'diagnostico-por-imagem',
    'ressonancia': 'diagnostico-por-imagem',
    'odontologia': 'odontologia-odontostomatologia',
    'odontostomatologia': 'odontologia-odontostomatologia',
    'toxicologia': 'toxicologia',
    'toxico': 'toxicologia',
    'comportamento': 'comportamento',
    'comportamental': 'comportamento',
    'nutricao': 'nutricao-clinica',
    'nutrologia': 'nutricao-clinica',
    'nutricao-clinica': 'nutricao-clinica',
    'preventiva': 'medicina-preventiva',
    'medicina-preventiva': 'medicina-preventiva',
    'paliativos': 'cuidados-paliativos',
    'cuidados-paliativos': 'cuidados-paliativos',
    'clinica': 'clinica-medica',
    'clinico': 'clinica-medica'
};

export function normalizeCategoryName(rawCategory: string): string {
    if (!rawCategory || typeof rawCategory !== 'string') return '';

    let base = generateSafeSlug(rawCategory);

    if (CATEGORY_ALIASES[base]) return CATEGORY_ALIASES[base];

    const parts = base.split('-');
    for (const part of parts) {
        if (CATEGORY_ALIASES[part]) return CATEGORY_ALIASES[part];
    }

    return base;
}
