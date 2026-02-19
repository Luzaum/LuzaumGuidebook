import React from 'react';

export function renderSafeFormattedText(text: string): React.ReactNode[] {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={`line-${lineIndex}`}>
                {parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={`part-${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
                    }
                    return <React.Fragment key={`part-${lineIndex}-${partIndex}`}>{part}</React.Fragment>;
                })}
            </p>
        );
    });
}
