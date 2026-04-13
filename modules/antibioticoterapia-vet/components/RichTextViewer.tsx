import React from 'react';

/** Destaques inline alinhados ao tema do módulo (tokens --primary / --secondary / charts). */
function bgHighlightStyle(bgName: string): React.CSSProperties {
  switch (bgName) {
    case 'green-100':
      return {
        background: 'color-mix(in srgb, var(--primary) 20%, var(--card))',
        color: 'var(--foreground)',
      };
    case 'blue-100':
      return {
        background: 'color-mix(in srgb, var(--secondary) 22%, var(--card))',
        color: 'var(--foreground)',
      };
    case 'yellow-100':
      return {
        background: 'color-mix(in srgb, var(--chart-5) 28%, var(--card))',
        color: 'var(--foreground)',
      };
    case 'red-100':
      return {
        background: 'color-mix(in srgb, var(--destructive) 18%, var(--card))',
        color: 'var(--foreground)',
      };
    case 'purple-100':
      return {
        background: 'color-mix(in srgb, var(--chart-4) 22%, var(--card))',
        color: 'var(--foreground)',
      };
    default:
      return {
        background: 'color-mix(in srgb, var(--foreground) 8%, var(--card))',
        color: 'var(--foreground)',
      };
  }
}

function textAccentStyle(colorName: string): React.CSSProperties {
  switch (colorName) {
    case 'green-700':
      return { color: 'var(--primary)' };
    case 'blue-700':
      return { color: 'var(--secondary)' };
    case 'purple-700':
      return { color: 'var(--chart-4)' };
    case 'rose-700':
      return { color: 'var(--chart-4)' };
    case 'red-700':
    case 'red-600':
      return { color: 'var(--destructive)' };
    case 'orange-700':
      return { color: 'var(--chart-5)' };
    default:
      return { color: 'var(--foreground)' };
  }
}

const MIND_BORDER = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--chart-4)'] as const;
const MIND_DOT = [
  'color-mix(in srgb, var(--primary) 40%, var(--card))',
  'color-mix(in srgb, var(--secondary) 40%, var(--card))',
  'color-mix(in srgb, var(--accent) 45%, var(--card))',
  'color-mix(in srgb, var(--chart-4) 40%, var(--card))',
] as const;

const parseInline = (line: string): React.ReactNode => {
  // Guard for non-string, null, or undefined inputs
  if (typeof line !== 'string') return line;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  // Regex without an outer capturing group. Captures content of each tag type.
  const regex = /\*\*(.*?)\*\*|\[color:([^\]]+)\](.*?)\[\/color\]|\[bg:([^\]]+)\](.*?)\[\/bg\]/g;
  let match;

  while ((match = regex.exec(line)) !== null) {
    const [, boldText, colorName, colorText, bgName, bgText] = match;

    // Push the text that came before this match
    if (match.index > lastIndex) {
      parts.push(line.substring(lastIndex, match.index));
    }

    const key = `${match.index}`; // Simplified key
    
    if (boldText !== undefined) {
      parts.push(
        <strong key={key} className="font-semibold" style={{ color: 'var(--foreground)' }}>
          {parseInline(boldText)}
        </strong>,
      );
    } else if (colorText !== undefined) {
      parts.push(
        <span key={key} className="font-semibold" style={textAccentStyle(colorName)}>
          {parseInline(colorText)}
        </span>,
      );
    } else if (bgText !== undefined) {
      parts.push(
        <span key={key} className="rounded-md px-1.5 py-0.5 font-medium" style={bgHighlightStyle(bgName)}>
          {parseInline(bgText)}
        </span>,
      );
    }
    
    lastIndex = regex.lastIndex;
  }
  
  // Push the remaining text after the last match
  if (lastIndex < line.length) {
    parts.push(line.substring(lastIndex));
  }
  
  // If only one part and it's a string, return just the string to avoid unnecessary <></> wrapper.
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
};


const Flowchart: React.FC<{ content: string }> = ({ content }) => {
  const steps = content.split('->').map(s => s.trim());
  return (
    <div className="flex items-center justify-center flex-wrap my-4 -mx-1">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className="m-1 flex-grow rounded-lg border-2 px-4 py-2 text-center font-semibold shadow-sm sm:flex-grow-0"
            style={{
              borderColor: 'var(--primary)',
              background: 'color-mix(in srgb, var(--primary) 12%, var(--card))',
              color: 'var(--foreground)',
            }}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <svg className="hidden h-6 w-8 sm:block" style={{ color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const AlertBox: React.FC<{ type: string; children: React.ReactNode }> = ({ type, children }) => {
  const base = 'my-3 p-3 border-l-4 rounded-r-lg text-sm';
  const palette: { [key: string]: React.CSSProperties } = {
    info: {
      borderColor: 'var(--secondary)',
      background: 'color-mix(in srgb, var(--secondary) 10%, var(--card))',
      color: 'var(--foreground)',
    },
    success: {
      borderColor: 'var(--primary)',
      background: 'var(--card)',
      color: 'var(--foreground)',
    },
    warning: {
      borderColor: 'var(--chart-5)',
      background: 'color-mix(in srgb, var(--chart-5) 14%, var(--card))',
      color: 'var(--foreground)',
    },
    danger: {
      borderColor: 'var(--destructive)',
      background: 'color-mix(in srgb, var(--destructive) 12%, var(--card))',
      color: 'var(--foreground)',
    },
  };
  const style = palette[type] || palette.info;
  return (
    <div className={base} style={style}>
      <div>{children}</div>
    </div>
  );
};

const MindMap: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const renderNode = (line: string, index: number) => {
    const level = (line.match(/^\s*/)?.[0].length || 0) / 2;
    const [title, ...descParts] = line.trim().split(':');
    const description = descParts.join(':').trim();
    
    const i = level % MIND_BORDER.length;

    return (
      <div
        key={index}
        className="relative my-2 border-l-2 py-1 pl-4"
        style={{ marginLeft: `${level * 1.5}rem`, borderColor: MIND_BORDER[i] }}
      >
        <span
          className="absolute -left-[5px] top-3 h-2 w-2 rounded-full"
          style={{ background: MIND_DOT[i] }}
        />
        <p className="font-bold" style={{ color: 'var(--foreground)' }}>
          {parseInline(title)}
        </p>
        {description && (
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {parseInline(description)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className="my-4 rounded-lg border p-4"
      style={{
        borderColor: 'var(--border)',
        background: 'color-mix(in srgb, var(--foreground) 4%, var(--card))',
      }}
    >
      {lines.map(renderNode)}
    </div>
  );
};

const RichTextViewer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const blocks = text.split(/(\[flow\][\s\S]*?\[\/flow\]|\[map\][\s\S]*?\[\/map\]|\[alert:.*?\][\s\S]*?\[\/alert\])/g).filter(Boolean);

  return (
    <div>
      {blocks.map((block, i) => {
        if (block.startsWith('[flow]')) {
          const content = block.replace(/\[\/?flow\]/g, '').trim();
          return <Flowchart key={i} content={content} />;
        }
        if (block.startsWith('[map]')) {
          const content = block.replace(/\[\/?map\]/g, '').trim();
          return <MindMap key={i} content={content} />;
        }
        if (block.startsWith('[alert:')) {
          const type = block.match(/\[alert:([^\]]+)\]/)?.[1] || 'info';
          const content = block.replace(/^\[alert:[^\]]+\]/, '').replace(/\[\/alert\]$/, '').trim();
          const parsedContent = content.split('\n').map((line, idx) => (
            <p key={idx} className="my-1">{parseInline(line)}</p>
          ));
          return <AlertBox key={i} type={type}>{parsedContent}</AlertBox>;
        }
        
        return block.split('\n').map((line, j) => {
          if (line.trim() === '') return <div key={`${i}-${j}`} className="h-2"></div>;
          if (line.startsWith('##')) {
            return (
              <h4
                key={`${i}-${j}`}
                className="mt-4 mb-2 border-b pb-1 text-lg font-bold"
                style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}
              >
                {line.replace(/##/g, '').trim()}
              </h4>
            );
          }
          if (line.startsWith('--')) {
            return <li key={`${i}-${j}`} className="ml-5 list-disc my-1">{parseInline(line.substring(2).trim())}</li>;
          }
          return <p key={`${i}-${j}`} className="my-1">{parseInline(line)}</p>;
        });
      })}
    </div>
  );
};

export default RichTextViewer;