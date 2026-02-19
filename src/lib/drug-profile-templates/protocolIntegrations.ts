// src/lib/drug-profile-templates/protocolIntegrations.ts
import { badge, hl, u } from './textMarkup'

export type IntegrationRuleLevel = 'SAFE' | 'MONITOR' | 'WARNING' | 'CRITICAL' | 'BLOCK'

export type ProtocolIntegrationRule = {
    id: string
    title: string
    level: IntegrationRuleLevel
    trigger: string
    rationale: string
    actions: string[]
    tags?: string[]
}

export type ProtocolIntegrations = {
    overview: string
    rules: ProtocolIntegrationRule[]
}

export function buildBasicIntegrations(params: {
    drugName: string
    defaultRules?: ProtocolIntegrationRule[]
}): ProtocolIntegrations {
    return {
        overview:
            `Integrações do ${u(params.drugName)} com protocolos/estado do paciente. Estas regras alimentam o motor Droga×Doença e o UI banner.`,
        rules: params.defaultRules ?? [
            {
                id: 'check-line',
                title: 'Checar acesso e compatibilidade',
                level: 'MONITOR',
                trigger: 'Antes de iniciar CRI/bolus, especialmente em UTI.',
                rationale: 'Evita incompatibilidade, extravasamento e falhas de infusão.',
                actions: [
                    'Confirmar via (central vs periférica) conforme risco do fármaco.',
                    'Confirmar compatibilidade com soluções em Y-site.',
                    'Garantir bomba programada em unidade correta (mL/h).',
                ],
                tags: ['safety', 'line'],
            },
        ],
    }
}

export function ruleBlockHypovolemia(drugName: string): ProtocolIntegrationRule {
    return {
        id: 'block-hypovolemia',
        title: `${drugName}: evitar bolus/altas doses em hipovolemia`,
        level: 'BLOCK',
        trigger: 'Paciente com hipovolemia não corrigida / choque hemorrágico sem ressuscitação adequada.',
        rationale:
            `Em hipovolemia, efeitos hemodinâmicos podem ser imprevisíveis e piorar perfusão. ${hl('red', 'Corrigir volemia primeiro')} sempre que possível.`,
        actions: [
            `${badge('BLOCK', 'BLOQUEAR')} Bolus rápido / escalonamento agressivo.`,
            'Reavaliar volemia (cristaloide/coloide/sangue conforme caso) e perfusão.',
            'Retomar com titulação lenta e dose reduzida após estabilização.',
        ],
        tags: ['hypovolemia', 'shock'],
    }
}

export function ruleMonitorRenal(drugName: string): ProtocolIntegrationRule {
    return {
        id: 'monitor-renal',
        title: `${drugName}: monitorar em disfunção renal`,
        level: 'WARNING',
        trigger: 'Paciente com DRC, IRA ou creatinina elevada.',
        rationale:
            `Disfunção renal altera excreção e pode causar acúmulo do fármaco ou metabólitos ativos. ${hl('orange', 'Ajuste de dose e monitoração intensa')} são necessários.`,
        actions: [
            'Reduzir dose ou aumentar intervalo conforme grau de disfunção.',
            'Monitorar resposta clínica, sinais de acúmulo e EA.',
            'Consultar referência para ajuste em IRIS stage 3–4.',
        ],
        tags: ['renal', 'drc', 'ira'],
    }
}
