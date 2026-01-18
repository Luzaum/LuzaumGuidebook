import type { HelpContent } from '../types/help'

export const remifentanilTooltips: Record<string, HelpContent> = {
  concept: {
    title: 'Remifentanil: desligou a bomba, acabou',
    sections: [
      {
        level: 'IMPORTANT',
        items: [{ text: 'Quebrado por esterases; independe de figado ou rim.' }],
      },
      {
        level: 'INFO',
        items: [{ text: 'Efeito some em 3-5 min apos parar.' }],
      },
    ],
  },
  unit: {
    title: 'Unidade obrigatoria: mcg/kg/min',
    sections: [
      {
        level: 'CRITICAL',
        items: [{ text: 'Usar mcg/kg/min; nao padronizar /h.', highlight: 'red' }],
      },
      {
        level: 'INFO',
        items: [{ text: 'Titule minuto a minuto.', highlight: 'green' }],
      },
    ],
  },
  transition: {
    title: 'Analgesia de transicao (critico)',
    sections: [
      {
        level: 'CRITICAL',
        items: [{ text: 'Planejar analgesia antes de desligar; sem residual.', highlight: 'red' }],
      },
      {
        level: 'IMPORTANT',
        items: [{ text: 'Sem transicao, paciente acorda com dor intensa.' }],
      },
      {
        level: 'INFO',
        items: [{ text: 'Sugestao: alerta ~30 min antes do fim.', highlight: 'green' }],
      },
    ],
  },
  reconstitution: {
    title: 'Reconstituicao e diluicao',
    sections: [
      {
        level: 'CRITICAL',
        items: [{ text: 'Nunca administrar solucao-mae direto.', highlight: 'red' }],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Reconstituir 1 mL por 1 mg -> 1 mg/mL.' },
          { text: 'Diluir para 50 mcg/mL (padrao) ou 20 mcg/mL (pequenos/gatos).' },
        ],
      },
    ],
  },
}
