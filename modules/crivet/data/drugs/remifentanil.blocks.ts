import type { UnitSafetyBlock } from '../../types/drug'

export const remifentanilSafetyBlocks: UnitSafetyBlock[] = [
    {
        block_if_unit: ['mcg/kg/h', 'mg/kg/h'],
        message: 'Remifentanil deve ser titulado em mcg/kg/min (ultracurto). Unidades por hora induzem a erro.',
    },
]
