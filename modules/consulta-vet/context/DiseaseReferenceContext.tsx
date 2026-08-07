import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { EditorialReference } from '../types/common';
import { getReferenceAnchorId } from '../utils/editorialReferenceMarkers';

type DiseaseReferenceContextValue = {
  references: EditorialReference[];
  scrollToReference: (index: number) => void;
};

const DiseaseReferenceContext = createContext<DiseaseReferenceContextValue | null>(null);

export function DiseaseReferenceProvider({
  references,
  children,
}: {
  references?: EditorialReference[];
  children: React.ReactNode;
}) {
  const safeReferences = references ?? [];

  const scrollToReference = useCallback(
    (index: number) => {
      const reference = safeReferences[index];
      if (!reference) return;

      const anchorId = getReferenceAnchorId(reference, index);
      const element = document.getElementById(anchorId);
      if (!element) return;

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${anchorId}`);
    },
    [safeReferences]
  );

  const value = useMemo(
    () => ({
      references: safeReferences,
      scrollToReference,
    }),
    [safeReferences, scrollToReference]
  );

  return <DiseaseReferenceContext.Provider value={value}>{children}</DiseaseReferenceContext.Provider>;
}

export function useDiseaseReferences(): DiseaseReferenceContextValue {
  const context = useContext(DiseaseReferenceContext);
  return (
    context ?? {
      references: [],
      scrollToReference: () => undefined,
    }
  );
}
