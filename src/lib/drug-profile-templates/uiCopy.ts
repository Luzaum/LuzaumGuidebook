// src/lib/drug-profile-templates/uiCopy.ts
import { badge, hl } from './textMarkup'

export type UiCopy = {
    display_name?: string
    banner?: string
    alert_messages?: {
        short?: string[]
        long?: string[]
    }
    block_message?: string
    common_errors: string[]
}

export function buildBaseUiCopy(params: { drugName: string; commonErrors?: string[] }): UiCopy {
    return {
        banner: `${hl('blue', params.drugName)} — usar titulado ao efeito e monitorização contínua.`,
        common_errors: params.commonErrors ?? [
            'Unidade errada (mg vs mcg) levando a dose 10–1000× maior.',
            'Usar concentração do frasco em vez da concentração preparada para CRI.',
            'Não reavaliar alvo clínico após cada ajuste de dose.',
        ],
    }
}

export function buildBlockMessage(text: string) {
    return `${badge('BLOCK', 'BLOQUEADO')} ${text}`
}
