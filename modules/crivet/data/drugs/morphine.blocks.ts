import type { UnitSafetyBlock } from '../../types/drug'

export const morphineSafetyBlocks: UnitSafetyBlock[] = [
    {
        block_if_unit: ['mcg/kg/min'],
        message: 'Não usar mcg/kg/min como unidade padrão de CRI de morfina. Use mg/kg/h. (mcg/kg/min aparece apenas em protocolos combinados como MLK).',
    },
]
