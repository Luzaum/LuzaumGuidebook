/**
 * Normaliza o status reprodutivo para booleano (compatível com Supabase BIT/BOOLEAN)
 */
export function normalizeNeutered(value: any): boolean | null {
    if (value === null || value === undefined) return null

    // Já é boolean
    if (typeof value === 'boolean') return value

    // Se veio string, normaliza
    const s = String(value).trim().toLowerCase()

    // Castrado / Neutered
    if (['castrado', 'castrada', 'neutered', 'spayed', 'spay', 'neuter', 'sim', 'yes', 'true', '1'].includes(s)) {
        return true
    }

    // Não castrado / Fértil
    if (['fértil', 'fertil', 'inteiro', 'inteira', 'não', 'nao', 'no', 'false', '0'].includes(s)) {
        return false
    }

    return null
}

/**
 * Normaliza texto removendo acentos e espaços extras
 */
export function normalizeLooseText(value: string): string {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}
