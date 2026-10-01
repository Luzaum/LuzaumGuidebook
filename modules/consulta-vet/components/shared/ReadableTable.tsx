import React from 'react';

/** Keeps table semantics and column relationships intact at every viewport width. */
export function ReadableTable({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  const viewport = React.useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = React.useState(false);
  const hintId = React.useId();

  React.useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const measure = () => setOverflowing(element.scrollWidth > element.clientWidth + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    measure();
    return () => observer.disconnect();
  }, [children]);

  return (
    <div className="cv-table-frame">
      {overflowing && <p id={hintId} className="cv-table-hint">↔ Deslize para ver todas as colunas. No teclado, use as setas.</p>}
      <div ref={viewport} className="cv-table-scroll" role="region"
        aria-label={props['aria-label'] || 'Tabela com rolagem horizontal'}
        aria-describedby={overflowing ? hintId : undefined} tabIndex={overflowing ? 0 : undefined}>
        <table {...props}>{children}</table>
      </div>
    </div>
  );
}
