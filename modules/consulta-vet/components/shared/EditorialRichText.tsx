import React from 'react';
import { cn } from '../../../../lib/utils';
import { useDiseaseReferences } from '../../context/DiseaseReferenceContext';
import { splitEditorialRichText } from '../../utils/editorialReferenceMarkers';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';
import { InlineReferenceMarker } from './InlineReferenceMarker';

const CLINICAL_METRIC_RE =
  /(\b\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/kg|mg\/gato|mg\/m²|µg\/kg|μg\/kg|mEq\/kg|UI\/kg|dias?|semanas?|meses?|horas?|minutos?|mm|cm|gatos?|cães?|cadelas?)\b)/gi;
const CLINICAL_METRIC_EXACT_RE =
  /^\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/kg|mg\/gato|mg\/m²|µg\/kg|μg\/kg|mEq\/kg|UI\/kg|dias?|semanas?|meses?|horas?|minutos?|mm|cm|gatos?|cães?|cadelas?)$/i;

function FormattedInline({ value, visual }: { value: string; visual?: DiseaseSectionVisual }) {
  if (!visual) {
    return <ClinicalAbbreviationText text={value} />;
  }

  return (
    <>
      {value.split(CLINICAL_METRIC_RE).map((part, index) =>
        CLINICAL_METRIC_EXACT_RE.test(part) ? (
          <mark
            key={`${part}-${index}`}
            className={cn(
              'inline whitespace-nowrap rounded-sm px-1 py-px font-bold leading-[inherit] text-inherit [box-decoration-break:clone]',
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

function MetricTextInner({ value, visual }: { value: string; visual?: DiseaseSectionVisual }) {
  const italicParts = value.split(/(\*[^*\n]+\*)/g);

  return (
    <>
      {italicParts.map((iPart, iIdx) => {
        if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length >= 3) {
          const inner = iPart.slice(1, -1);
          return (
            <em key={`i-${iIdx}`} className="italic">
              <FormattedInline value={inner} visual={visual} />
            </em>
          );
        }
        return <FormattedInline key={`p-${iIdx}`} value={iPart} visual={visual} />;
      })}
    </>
  );
}

function MetricText({ value, visual }: { value: string; visual?: DiseaseSectionVisual }) {
  const boldParts = value.split(/(\b\*\*[^*]+(?:\*[^*]+)*\*\*|\*\*[^*]+(?:\*[^*]+)*\*\*)/g);

  return (
    <>
      {boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length >= 4) {
          const inner = bPart.slice(2, -2);
          return (
            <strong key={`b-${bIdx}`} className="font-semibold text-foreground">
              <MetricTextInner value={inner} visual={visual} />
            </strong>
          );
        }
        const cleanPart = bPart.replace(/\*\*/g, '');
        return <MetricTextInner key={`t-${bIdx}`} value={cleanPart} visual={visual} />;
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
  const segments = splitEditorialRichText(value, references);

  if (segments.length === 0) return null;

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <MetricText key={`text-${index}`} value={segment.value} visual={visual} />;
        }

        const reference = references[segment.index];
        if (!reference) {
          return <MetricText key={`missing-ref-${index}`} value={`(${segment.index + 1})`} visual={visual} />;
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
