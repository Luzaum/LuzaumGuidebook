import React from 'react';
import { cn } from '../../../../lib/utils';
import { useDiseaseReferences } from '../../context/DiseaseReferenceContext';
import { resolveReferenceIndex, splitEditorialRichText } from '../../utils/editorialReferenceMarkers';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';
import { InlineReferenceMarker } from './InlineReferenceMarker';

const CLINICAL_METRIC_RE =
  /(\b\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/kg|mg\/gato|mg\/m²|µg\/kg|μg\/kg|mEq\/kg|UI\/kg|dias?|semanas?|meses?|horas?|minutos?|mm|cm|gatos?|cães?|cadelas?)\b)/gi;
const CLINICAL_METRIC_EXACT_RE =
  /^\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/kg|mg\/gato|mg\/m²|µg\/kg|μg\/kg|mEq\/kg|UI\/kg|dias?|semanas?|meses?|horas?|minutos?|mm|cm|gatos?|cães?|cadelas?)$/i;

function FormattedInline({
  value,
  visual,
  insideMark = false,
}: {
  value: string;
  visual?: DiseaseSectionVisual;
  insideMark?: boolean;
}) {
  if (!visual || insideMark) {
    return <ClinicalAbbreviationText text={value} />;
  }

  return (
    <>
      {value.split(CLINICAL_METRIC_RE).map((part, index) =>
        CLINICAL_METRIC_EXACT_RE.test(part) ? (
          <mark
            key={`${part}-${index}`}
            className={cn(
              'consulta-vet-readable-highlight inline whitespace-nowrap rounded-sm px-1 py-px font-bold leading-[inherit] text-inherit [box-decoration-break:clone]',
              visual.headerTintClass,
              visual.titleClass
            )}
          >
            {part}
          </mark>
        ) : (
          <ClinicalAbbreviationText key={`${part}-${index}`} text={part} />
        )
      )}
    </>
  );
}

function HighlightSpan({
  value,
  visual,
  insideMark = false,
}: {
  value: string;
  visual?: DiseaseSectionVisual;
  insideMark?: boolean;
}) {
  const italicParts = value.split(/(\*[^*\n]+\*)/g);

  return (
    <>
      {italicParts.map((iPart, iIdx) => {
        if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length >= 3) {
          const inner = iPart.slice(1, -1);
          return (
            <em key={`i-${iIdx}`} className="italic">
              <FormattedInline value={inner} visual={visual} insideMark={insideMark} />
            </em>
          );
        }
        return <FormattedInline key={`p-${iIdx}`} value={iPart} visual={visual} insideMark={insideMark} />;
      })}
    </>
  );
}

function BoldAndInline({
  value,
  visual,
  insideMark = false,
}: {
  value: string;
  visual?: DiseaseSectionVisual;
  insideMark?: boolean;
}) {
  const boldParts = value.split(/(\b\*\*[^*]+(?:\*[^*]+)*\*\*|\*\*[^*]+(?:\*[^*]+)*\*\*)/g);

  return (
    <>
      {boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length >= 4) {
          const inner = bPart.slice(2, -2);
          return (
            <strong key={`b-${bIdx}`} className="font-semibold text-foreground">
              <HighlightSpan value={inner} visual={visual} insideMark={insideMark} />
            </strong>
          );
        }
        const cleanPart = bPart.replace(/\*\*/g, '');
        return <HighlightSpan key={`t-${bIdx}`} value={cleanPart} visual={visual} insideMark={insideMark} />;
      })}
    </>
  );
}

function RichSegments({
  value,
  references,
  scrollToReference,
  visual,
  variant = 'default',
  insideMark = false,
}: {
  value: string;
  references: ReturnType<typeof useDiseaseReferences>['references'];
  scrollToReference: ReturnType<typeof useDiseaseReferences>['scrollToReference'];
  visual?: DiseaseSectionVisual;
  variant?: 'default' | 'dark';
  insideMark?: boolean;
}) {
  const segments = splitEditorialRichText(value, references);
  if (segments.length === 0) return null;

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <BoldAndInline key={`text-${index}`} value={segment.value} visual={visual} insideMark={insideMark} />;
        }

        const reference = references[segment.index];
        if (!reference) {
          return <BoldAndInline key={`missing-ref-${index}`} value={`(${segment.index + 1})`} visual={visual} insideMark={insideMark} />;
        }

        return (
          <InlineReferenceMarker
            key={`ref-${segment.index}-${index}`}
            index={segment.index}
            citationText={reference.citationText}
            onClick={() => scrollToReference(segment.index)}
            tone={variant}
          />
        );
      })}
    </>
  );
}

export function EditorialRichText({
  value,
  visual,
  variant = 'default',
}: {
  value: string;
  visual?: DiseaseSectionVisual;
  variant?: 'default' | 'dark';
}) {
  const { references, scrollToReference } = useDiseaseReferences();
  const input = String(value || '');
  if (!input) return null;

  const markParts = input.split(/(==[^=\n]+==)/g);

  return (
    <>
      {markParts.map((mPart, mIdx) => {
        if (mPart.startsWith('==') && mPart.endsWith('==') && mPart.length >= 5) {
          const inner = mPart.slice(2, -2).replace(/==/g, '');
          return (
            <mark
              key={`mark-${mIdx}`}
              className={cn(
                'consulta-vet-readable-highlight inline rounded px-1 py-px font-semibold [box-decoration-break:clone]',
                variant === 'dark'
                  ? 'bg-amber-300/95 text-slate-950 font-bold shadow-xs'
                  : 'bg-amber-200/75 text-amber-950 dark:bg-amber-400/25 dark:text-amber-100'
              )}
            >
              <RichSegments
                value={inner}
                references={references}
                scrollToReference={scrollToReference}
                visual={visual}
                variant={variant}
                insideMark
              />
            </mark>
          );
        }

        const clean = mPart.replace(/==/g, '');
        if (!clean) return null;

        return (
          <RichSegments
            key={`seg-${mIdx}`}
            value={clean}
            references={references}
            scrollToReference={scrollToReference}
            visual={visual}
            variant={variant}
          />
        );
      })}
    </>
  );
}

// Re-export untouched symbol check safety
export { resolveReferenceIndex };
