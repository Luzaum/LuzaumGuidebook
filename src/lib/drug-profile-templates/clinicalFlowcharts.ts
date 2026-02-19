// src/lib/drug-profile-templates/clinicalFlowcharts.ts
import { badge, hl, u } from './textMarkup'

export type FlowNodeType = 'START' | 'CHECK' | 'ACTION' | 'DECISION' | 'END' | 'NOTE'

export type FlowEdge = {
    to: string
    condition?: string
}

export type FlowNode = {
    id: string
    type: FlowNodeType
    title: string
    body: string[]
    next?: FlowEdge[]
}

export type ClinicalFlowchart = {
    id: string
    title: string
    indication: string
    nodes: FlowNode[]
}

export function buildSafeInductionFlow(params: {
    id: string
    drugName: string
}): ClinicalFlowchart {
    return {
        id: params.id,
        title: `Indução segura com ${params.drugName}`,
        indication: 'Indução anestésica/controle de via aérea com titulação segura.',
        nodes: [
            {
                id: 'start',
                type: 'START',
                title: 'Início',
                body: [
                    `${badge('INFO', 'ALVO')} indução titulado ao efeito, minimizando hipotensão/apneia.`,
                ],
                next: [{ to: 'check-volume' }],
            },
            {
                id: 'check-volume',
                type: 'CHECK',
                title: 'Checar volemia e risco hemodinâmico',
                body: [
                    `${hl('yellow', 'Perguntas rápidas')}: PA? sinais de hipovolemia? lactato? perfusão?`,
                    `${hl('orange', 'Se instável')}: reduzir dose, titular lento e considerar suporte hemodinâmico.`,
                ],
                next: [
                    { to: 'dose-plan', condition: 'Volemia/PA aceitáveis' },
                    { to: 'stabilize-first', condition: 'Hipovolemia/choque' },
                ],
            },
            {
                id: 'stabilize-first',
                type: 'ACTION',
                title: 'Estabilizar antes da indução agressiva',
                body: [
                    `${badge('CRITICAL', 'PRIORIDADE')} Ressuscitação guiada por perfusão e metas.`,
                    'Oxigênio + acesso confiável + fluidos/hemoderivados conforme indicação.',
                    'Retornar ao plano com dose reduzida e titulação.',
                ],
                next: [{ to: 'dose-plan' }],
            },
            {
                id: 'dose-plan',
                type: 'ACTION',
                title: 'Planejar dose e titulação',
                body: [
                    `Preparar ${u('seringa/linha')} e calcular bolus em mL.`,
                    `${hl('green', 'Titular lentamente')} até efeito desejado.`,
                    'Monitorar PA/FC/SpO2/ETCO2 continuamente.',
                ],
                next: [{ to: 'end' }],
            },
            {
                id: 'end',
                type: 'END',
                title: 'Fim',
                body: [
                    `${badge('INFO', 'REGISTRAR')} dose total, resposta hemodinâmica/ventilatória, e ajustes feitos.`,
                ],
            },
        ],
    }
}

export function buildShockVasopressorFlow(params: {
    id: string
    drugName: string
}): ClinicalFlowchart {
    return {
        id: params.id,
        title: `Choque: iniciar e titular ${params.drugName}`,
        indication: 'Choque vasodilatado/hipotensão refratária após ressuscitação inicial.',
        nodes: [
            {
                id: 'start',
                type: 'START',
                title: 'Início',
                body: [
                    `${badge('INFO', 'ALVO')} restaurar perfusão (PAM, perfusão periférica, lactato, diurese).`,
                ],
                next: [{ to: 'check-volume' }],
            },
            {
                id: 'check-volume',
                type: 'CHECK',
                title: 'Checar se volemia foi abordada',
                body: [
                    `${hl('yellow', 'Checagem')}: fluidos guiados por perfusão já iniciados?`,
                    `${hl('red', 'Alerta')}: vasopressor sem volemia pode piorar perfusão periférica/renal.`,
                ],
                next: [
                    { to: 'access-check', condition: 'Volemia ok ou ressuscitação em andamento' },
                    { to: 'volume-first', condition: 'Hipovolemia não abordada' },
                ],
            },
            {
                id: 'volume-first',
                type: 'ACTION',
                title: 'Abordar volemia primeiro',
                body: [
                    `${badge('CRITICAL', 'PRIORIDADE')} fluidos/hemoderivados conforme cenário.`,
                    'Reavaliar a cada intervenção (PAM, CRT, temperatura, lactato).',
                ],
                next: [{ to: 'access-check' }],
            },
            {
                id: 'access-check',
                type: 'CHECK',
                title: 'Checar acesso vascular',
                body: [
                    'Preferir acesso central quando possível.',
                    `${hl('orange', 'Periférico')} apenas veia grande + vigilância de extravasamento.`,
                ],
                next: [{ to: 'start-infusion' }],
            },
            {
                id: 'start-infusion',
                type: 'ACTION',
                title: 'Iniciar infusão e titular',
                body: [
                    'Iniciar na menor dose efetiva e titular em intervalos curtos.',
                    `${u('Metas')}: PAM + perfusão + lactato.`,
                    `${hl('yellow', 'Registrar')}: dose → resposta → próximo ajuste.`,
                ],
                next: [{ to: 'extravasation' }],
            },
            {
                id: 'extravasation',
                type: 'NOTE',
                title: 'Se suspeita de extravasamento',
                body: [
                    `${badge('WARN', 'AÇÃO')} pausar infusão local, manter cateter para antídoto se aplicável, elevar membro.`,
                    'Documentar e monitorar necrose/isquemia.',
                ],
                next: [{ to: 'end' }],
            },
            {
                id: 'end',
                type: 'END',
                title: 'Fim',
                body: [
                    `${badge('INFO', 'REAVALIAR')} se refratário: considerar 2º agente conforme protocolo.`,
                ],
            },
        ],
    }
}
