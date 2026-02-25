import { RxTemplateStyle } from './rxDb'

export const BUILTIN_TEMPLATES: RxTemplateStyle[] = [
    // ====================================================================
    // 1. PADRÃO CLÍNICO (azul profissional, limpo)
    // ====================================================================
    {
        id: 'rx_br_v1_clean',
        name: '🏥 Padrão Clínico',
        documentKindTarget: 'standard',
        fontFamily: 'Manrope, Arial, sans-serif',
        fontSizePt: 12,
        headingSizePt: 18,
        lineHeight: 1.5,
        accentColor: '#1d4ed8',    // azul profissional
        textColor: '#1f2937',
        paperBg: '#ffffff',
        paperSize: 'A4',
        showLetterhead: true,
        showSignature: true,
        showMapaSignature: false,
        showTimestamp: true,
        extraNotes: '',
        zoneStyles: {
            header: {
                fontSizePt: 14,
                fontWeight: 'bold',
                textColor: '#1d4ed8',
            },
        },
        updatedAt: new Date().toISOString(),
    },

    // ====================================================================
    // 2. MODERNO DARK (fundo header preto, accent verde neon)
    // ====================================================================
    {
        id: 'rx_br_v1_modern_dark',
        name: '🌑 Moderno Dark',
        documentKindTarget: 'standard',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSizePt: 11,
        headingSizePt: 22,
        lineHeight: 1.6,
        accentColor: '#16a34a',    // verde escuro
        textColor: '#111827',
        paperBg: '#f9fafb',
        paperSize: 'A4',
        showLetterhead: true,
        showSignature: true,
        showMapaSignature: false,
        showTimestamp: true,
        extraNotes: '',
        zoneStyles: {
            header: {
                fontSizePt: 16,
                fontWeight: 'bold',
                textColor: '#1a2e40',
            },
        },
        updatedAt: new Date().toISOString(),
    },

    // ====================================================================
    // 3. VERDE CLÍNICO (emerald, elegante)
    // ====================================================================
    {
        id: 'rx_br_v1_minimal_green',
        name: '🌿 Verde Clínico',
        documentKindTarget: 'standard',
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSizePt: 12,
        headingSizePt: 18,
        lineHeight: 1.45,
        accentColor: '#059669',    // emerald 600
        textColor: '#064e3b',
        paperBg: '#f0fdf4',        // leve fundo verde
        paperSize: 'A4',
        showLetterhead: true,
        showSignature: true,
        showMapaSignature: false,
        showTimestamp: true,
        extraNotes: '',
        zoneStyles: {
            header: {
                textColor: '#065f46',
                fontWeight: 'bold',
            },
            body: {
                accentColor: '#10b981',
            },
        },
        updatedAt: new Date().toISOString(),
    },

    // ====================================================================
    // 4. CLÁSSICO FORMAL (serif, marrom, estilo cartório)
    // ====================================================================
    {
        id: 'rx_br_v1_classico',
        name: '📜 Clássico Formal',
        documentKindTarget: 'standard',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSizePt: 12,
        headingSizePt: 16,
        lineHeight: 1.6,
        accentColor: '#78350f',    // marrom âmbar
        textColor: '#1c1917',
        paperBg: '#fffbeb',        // creme
        paperSize: 'A4',
        showLetterhead: true,
        showSignature: true,
        showMapaSignature: false,
        showTimestamp: true,
        extraNotes: '',
        zoneStyles: {
            header: {
                fontSizePt: 14,
                fontWeight: 'bold',
                textColor: '#92400e',
                underline: true,
            },
        },
        updatedAt: new Date().toISOString(),
    },

    // ====================================================================
    // 5. COMPACTO A5 (menor, ideal para impressora térmica ou folha A5)
    // ====================================================================
    {
        id: 'rx_br_v1_compact_a5',
        name: '📋 Compacto A5',
        documentKindTarget: 'standard',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSizePt: 10,
        headingSizePt: 14,
        lineHeight: 1.35,
        accentColor: '#7c3aed',    // roxo
        textColor: '#1e1b4b',
        paperBg: '#ffffff',
        paperSize: 'A5',
        showLetterhead: true,
        showSignature: true,
        showMapaSignature: false,
        showTimestamp: false,
        extraNotes: '',
        zoneStyles: {
            header: {
                fontSizePt: 12,
                fontWeight: 'bold',
                textColor: '#5b21b6',
            },
        },
        updatedAt: new Date().toISOString(),
    },
]
