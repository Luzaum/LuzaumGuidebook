import React from 'react';
import { AlertTriangle, BookOpen, ShieldAlert, Stethoscope } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EditorialDiagnosticStep, EditorialDrugProtocol, EditorialSectionValue, EditorialSystemGroup } from '../../types/common';

interface DiseaseSectionRendererProps {
  id: string;
  title: string;
  data: EditorialSectionValue;
  className?: string;
}

function formatKey(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}

const KEY_TRANSLATIONS: Record<string, string> = {
  teachingOverview: 'Visão didática',
  pathophysiologyExplanation: 'Entendendo a fisiopatologia',
  diagnosticReasoning: 'Raciocínio clínico',
  diagnosticPlanStepByStep: 'Plano diagnóstico passo a passo',
  diagnosticPlanIfLimitedResources: 'Conduta com recursos limitados',
  treatmentReasoning: 'Lógica do tratamento',
  treatmentByScenario: 'Tratamento por cenário',
  drugProtocolExamples: 'Protocolos medicamentosos',
  monitoringPlan: 'Plano de monitoramento',
  ownerGuidance: 'Orientação ao tutor',
  commonClinicalMistakesExpanded: 'Erros clínicos frequentes',
  causes: 'Principais causas',
  riskFactors: 'Fatores de risco',
  clinicalSuspicion: 'Quando suspeitar',
  firstLineTests: 'Exames mínimos',
  idealTests: 'Exames ideais',
  confirmatoryTests: 'Exames confirmatórios',
  mostSensitiveTests: 'Exames mais sensíveis',
  mostSpecificTests: 'Exames mais específicos',
  falsePositiveConsiderations: 'Falsos positivos',
  falseNegativeConsiderations: 'Falsos negativos',
  limitations: 'Limitações',
  interpretation: 'Interpretação prática',
  supportiveCare: 'Tratamento de suporte',
  emergencyCare: 'Tratamento emergencial',
  longTermCare: 'Tratamento de longo prazo',
  specificTherapy: 'Tratamento específico',
  description: 'Visão geral',
  outcomes: 'Desfechos esperados',
  tissueDamage: 'Lesão tecidual',
  immuneInteraction: 'Interação inflamatória',
  possibleSystemsAffected: 'Sistemas afetados',
  agePredisposition: 'Faixa etária mais afetada',
  populationFactors: 'Perfil do paciente',
  immunologicFactors: 'Fatores biológicos',
  environmentalFactors: 'Fatores ambientais',
  susceptibleGroups: 'Pacientes mais expostos',
  mainClinicalSigns: 'Principais sinais',
  summaryDifferentials: 'Diferenciais principais',
  affectedHosts: 'Espécies afetadas',
};

function translateKey(key: string): string {
  return KEY_TRANSLATIONS[key] || formatKey(key);
}

function isSystemGroupArray(value: unknown): value is EditorialSystemGroup[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'system' in item && 'findings' in item);
}

function isDrugProtocolArray(value: unknown): value is EditorialDrugProtocol[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'drug' in item);
}

function isDiagnosticStepArray(value: unknown): value is EditorialDiagnosticStep[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item === 'object' && 'title' in item && 'description' in item);
}

function NarrativeText({ value }: { value: string }) {
  return <p className="max-w-[106ch] whitespace-pre-line text-[15px] leading-8 text-foreground/88">{value}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-foreground/86">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SystemGroupList({ groups }: { groups: EditorialSystemGroup[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {groups.map((item) => (
        <article key={item.system} className="rounded-[24px] border border-border/80 bg-background/68 px-6 py-5">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.system}</h4>
          <div className="mt-4">
            <BulletList items={item.findings} />
          </div>
        </article>
      ))}
    </div>
  );
}

function DiagnosticStepList({ steps }: { steps: EditorialDiagnosticStep[] }) {
  return (
    <div className="space-y-5">
      {steps.map((step, index) => (
        <div key={`${step.title}-${index}`} className="grid gap-4 border-t border-border/70 pt-5 first:border-t-0 first:pt-0 md:grid-cols-[64px_1fr]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.08] text-sm font-bold text-primary">
            {step.stepNumber || index + 1}
          </div>
          <div>
            <h4 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h4>
            <p className="mt-2 max-w-[98ch] text-[15px] leading-8 text-foreground/85">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DrugProtocolList({ protocols }: { protocols: EditorialDrugProtocol[] }) {
  return (
    <div className="space-y-5">
      {protocols.map((protocol, index) => (
        <article key={`${protocol.drug}-${index}`} className="rounded-[24px] border border-border/80 bg-background/72 px-6 py-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,0.7fr))]">
            <div>
              <h4 className="text-base font-semibold text-foreground">{protocol.drug}</h4>
              {protocol.indication ? <p className="mt-1 text-sm leading-7 text-muted-foreground">{protocol.indication}</p> : null}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Dose</p>
              <p className="mt-2 text-sm leading-7 text-foreground">{protocol.dose || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Frequência</p>
              <p className="mt-2 text-sm leading-7 text-foreground">{protocol.frequency || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Via</p>
              <p className="mt-2 text-sm leading-7 text-foreground">{protocol.route || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Duração</p>
              <p className="mt-2 text-sm leading-7 text-foreground">{protocol.duration || '—'}</p>
            </div>
          </div>

          {(protocol.notes || protocol.cautions || protocol.contraindications) ? (
            <div className="mt-4 grid gap-4 border-t border-border/70 pt-4 lg:grid-cols-3">
              {protocol.notes ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Observações</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{protocol.notes}</p>
                </div>
              ) : null}
              {protocol.cautions ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Cautelas</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/85">{protocol.cautions}</p>
                </div>
              ) : null}
              {protocol.contraindications ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-destructive">Contraindicações</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/85">{protocol.contraindications}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function ObjectToneBlock({
  title,
  children,
  tone = 'default',
}: {
  title: string;
  children: React.ReactNode;
  tone?: 'default' | 'warning' | 'danger' | 'teaching';
}) {
  const toneClasses = {
    default: 'border-border/70 bg-muted/[0.08]',
    warning: 'border-amber-500/18 bg-amber-500/[0.05]',
    danger: 'border-destructive/18 bg-destructive/[0.05]',
    teaching: 'border-primary/18 bg-primary/[0.05]',
  } as const;

  const iconMap = {
    default: <Stethoscope className="h-4 w-4 text-primary" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-300" />,
    danger: <ShieldAlert className="h-4 w-4 text-destructive" />,
    teaching: <BookOpen className="h-4 w-4 text-primary" />,
  } as const;

  return (
    <article className={`rounded-[24px] border px-6 py-5 ${toneClasses[tone]}`}>
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {iconMap[tone]}
        {title}
      </h4>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export function DiseaseSectionRenderer({ id, title, data, className }: DiseaseSectionRendererProps) {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) return null;

  const renderContent = (content: EditorialSectionValue | string | string[] | unknown): React.ReactNode => {
    if (typeof content === 'string') {
      return <NarrativeText value={content} />;
    }

    if (Array.isArray(content)) {
      if (content.length === 0) return null;
      if (isDrugProtocolArray(content)) return <DrugProtocolList protocols={content} />;
      if (isDiagnosticStepArray(content)) return <DiagnosticStepList steps={content} />;
      if (isSystemGroupArray(content)) return <SystemGroupList groups={content} />;
      return <BulletList items={content.filter((item): item is string => typeof item === 'string')} />;
    }

    if (content && typeof content === 'object') {
      return (
        <div className="space-y-5">
          {Object.entries(content).map(([key, value]) => {
            if (value === null || value === undefined) return null;
            if (Array.isArray(value) && value.length === 0) return null;

            const isWarning = key === 'diagnosticPlanIfLimitedResources';
            const isDanger = key === 'commonClinicalMistakesExpanded' || key === 'falsePositiveConsiderations' || key === 'falseNegativeConsiderations';
            const isTeaching = key === 'teachingOverview' || key === 'diagnosticReasoning' || key === 'treatmentReasoning';

            return (
              <ObjectToneBlock
                key={key}
                title={translateKey(key)}
                tone={isWarning ? 'warning' : isDanger ? 'danger' : isTeaching ? 'teaching' : 'default'}
              >
                {renderContent(value as EditorialSectionValue)}
              </ObjectToneBlock>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-5 border-b border-border/70 pb-3">
        <h3 className="text-[24px] font-bold tracking-tight text-foreground">{title}</h3>
      </div>
      <div className="max-w-none">{renderContent(data)}</div>
    </section>
  );
}
