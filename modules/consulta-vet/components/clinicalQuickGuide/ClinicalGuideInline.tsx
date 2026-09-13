import React from 'react';
import ReactMarkdown from 'react-markdown';

/** Inline Markdown only. Raw HTML is never interpreted. */
export function ClinicalGuideInline({ text }: { text: string }) {
  const markdown = (value: string) => <ReactMarkdown allowedElements={['p', 'strong', 'em', 'a', 'code']} unwrapDisallowed components={{
    p: ({ children }) => <>{children}</>,
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-700 underline underline-offset-2 dark:text-sky-300">{children}</a>,
  }}>{value.replace(/^(\d+)\. /gm, '$1\\. ')}</ReactMarkdown>;
  return <>{text.split(/(==[^=]+==)/g).map((part, index) => part.startsWith('==') && part.endsWith('==')
    ? <mark key={index} className="rounded bg-amber-200/60 px-1 font-semibold text-amber-950 dark:bg-amber-400/20 dark:text-amber-100">{markdown(part.slice(2, -2))}</mark>
    : <React.Fragment key={index}>{markdown(part)}</React.Fragment>)}</>;
}
