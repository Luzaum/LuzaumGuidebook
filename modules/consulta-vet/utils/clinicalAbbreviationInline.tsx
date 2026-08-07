import React from 'react';

/** Mantido por compatibilidade; siglas devem aparecer por extenso no conteúdo editorial. */
export const AbbreviationExpandedContext = React.createContext<Set<string> | null>(null);

export function lookupClinicalAbbreviation(_term: string) {
  return null;
}

export function ClinicalAbbreviationText({ text }: { text: string }) {
  if (!text) return null;
  return <>{text}</>;
}
