// src/lib/drug-profile-templates/textMarkup.ts

export type Hl = 'yellow' | 'green' | 'red' | 'orange' | 'blue'

export function hl(color: Hl, text: string) {
    return `<hl-${color}>${text}</hl-${color}>`
}

export function u(text: string) {
    return `<u>${text}</u>`
}

export function badge(kind: 'INFO' | 'WARN' | 'CRITICAL' | 'BLOCK', text: string) {
    return `<badge-${kind.toLowerCase()}>${text}</badge-${kind.toLowerCase()}>`
}
