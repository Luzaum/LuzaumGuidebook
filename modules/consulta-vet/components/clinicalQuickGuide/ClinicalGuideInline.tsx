import React from 'react';
import ReactMarkdown from 'react-markdown';

/** Inline Markdown only. Raw HTML is never interpreted. */
export function ClinicalGuideInline({ text }: { text: string }) {
  const markdown = (value: string) => <ReactMarkdown allowedElements={['p', 'strong', 'em', 'a', 'code']} unwrapDisallowed components={{
    p: ({ children }) => <>{children}</>,
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-700 underline underline-offset-2 dark:text-sky-300">{children}</a>,
  }}>{value.replace(/^(\d+)\. /gm, '$1\\. ')}</ReactMarkdown>;
  const line = (value: string) => value.split(/(==[^=]+==)/g).map((part, index) => part.startsWith('==') && part.endsWith('==')
    ? <mark key={index} className="consulta-vet-readable-highlight rounded bg-amber-200/60 px-1 font-semibold text-amber-950">{markdown(part.slice(2, -2))}</mark>
    : <React.Fragment key={index}>{markdown(part)}</React.Fragment>);
  // This component is used inside paragraphs and table cells. Keep explicit
  // line breaks without introducing nested paragraphs or Markdown list blocks.
  return <>{text.split(/\r?\n/).map((value, index) => <React.Fragment key={index}>
    {index > 0 && <br />}{line(value)}
  </React.Fragment>)}</>;
}
