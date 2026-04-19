import React from 'react';
import { AlertTriangle, Flag, Info } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EditorialClinicalTableBlock } from '../editorial/EditorialClinicalTableBlock';
import type { EditorialClinicalTable } from '../../types/common';
import type { MedicationClinicalCallout } from '../../types/medication';

function isClinicalTable(
  block: EditorialClinicalTable | MedicationClinicalCallout
): block is EditorialClinicalTable {
  return block.kind === 'clinicalTable';
}

function isCallout(
  block: EditorialClinicalTable | MedicationClinicalCallout
): block is MedicationClinicalCallout {
  return block.kind === 'clinicalCallout';
}

function CalloutCard({ callout }: { callout: MedicationClinicalCallout }) {
  const variant = callout.variant;
  const Icon = variant === 'caution' ? AlertTriangle : variant === 'brazil' ? Flag : Info;
  const styles = {
    info: 'border-emerald-500/35 bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08]',
    caution: 'border-amber-500/40 bg-amber-500/[0.07] dark:bg-amber-500/[0.09]',
    brazil: 'border-green-600/35 bg-green-600/[0.06] dark:bg-green-500/[0.08]',
  } as const;
  const iconStyles = {
    info: 'text-emerald-700 dark:text-emerald-300',
    caution: 'text-amber-700 dark:text-amber-300',
    brazil: 'text-green-800 dark:text-green-300',
  } as const;

  return (
    <aside
      className={cn(
        'rounded-2xl border px-5 py-4 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
        styles[variant]
      )}
    >
      <h4 className="flex items-start gap-2 text-sm font-bold leading-snug text-foreground">
        <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', iconStyles[variant])} aria-hidden />
        {callout.title}
      </h4>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-foreground/88">{callout.body}</p>
    </aside>
  );
}

export function MedicationStructuredBlocks({
  blocks,
}: {
  blocks: Array<EditorialClinicalTable | MedicationClinicalCallout>;
}) {
  if (!blocks.length) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (isClinicalTable(block)) {
          return <EditorialClinicalTableBlock key={i} table={block} />;
        }
        if (isCallout(block)) {
          return <CalloutCard key={i} callout={block} />;
        }
        return null;
      })}
    </div>
  );
}
