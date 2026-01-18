import React from 'react'
import type { RichContent, RichTextSpan } from '../../types/helpTopics'

interface Props {
    content: string | RichContent[]
    isDark: boolean
    className?: string
}

export function RichTextRenderer({ content, isDark, className = '' }: Props) {
    // LEGACY SUPPORT: If string, just render nicely wrapped text
    if (typeof content === 'string') {
        return (
            <div
                className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? 'opacity-90 text-neutral-100' : 'text-neutral-700'
                    } ${className}`}
            >
                {content}
            </div>
        )
    }

    // RICH TEXT RENDERER
    return (
        <div className={`space-y-3 ${className}`}>
            {content.map((block, idx) => {
                if (block.type === 'paragraph') {
                    return (
                        <p key={idx} className={`text-sm leading-relaxed ${isDark ? 'text-neutral-100' : 'text-neutral-700'}`}>
                            <RenderSpans spans={block.content} isDark={isDark} />
                        </p>
                    )
                }
                if (block.type === 'bullet') {
                    return (
                        <div key={idx} className="flex gap-2 items-start">
                            <span className={`text-sm mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-neutral-500' : 'bg-neutral-400'}`} />
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-100' : 'text-neutral-700'}`}>
                                <RenderSpans spans={block.content} isDark={isDark} />
                            </p>
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}

function RenderSpans({ spans, isDark }: { spans: RichTextSpan[]; isDark: boolean }) {
    return (
        <>
            {spans.map((span, idx) => {
                if (span.type === 'text') {
                    return <span key={idx}>{span.value}</span>
                }
                if (span.type === 'bold') {
                    return <strong key={idx} className="font-bold text-current">{span.value}</strong>
                }
                if (span.type === 'underline') {
                    return <u key={idx} className="decoration-current underline-offset-2">{span.value}</u>
                }
                if (span.type === 'highlight') {
                    const colors = getHighlightColors(span.color, isDark)
                    return (
                        <span
                            key={idx}
                            className={`px-1 rounded mx-0.5 font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                            {span.value}
                        </span>
                    )
                }
                return null
            })}
        </>
    )
}

function getHighlightColors(color: string, isDark: boolean) {
    // Semantic Colors System
    switch (color) {
        case 'yellow': // Key Concepts
            return {
                bg: isDark ? 'bg-yellow-900/40' : 'bg-yellow-100',
                text: isDark ? 'text-yellow-200' : 'text-yellow-800',
                border: ''
            }
        case 'red': // Alerts & Emergency
            return {
                bg: isDark ? 'bg-red-900/40' : 'bg-red-100',
                text: isDark ? 'text-red-200' : 'text-red-800',
                border: ''
            }
        case 'green': // Good Practice
            return {
                bg: isDark ? 'bg-green-900/40' : 'bg-green-100',
                text: isDark ? 'text-green-200' : 'text-green-800',
                border: ''
            }
        case 'orange': // Pitfalls
            return {
                bg: isDark ? 'bg-orange-900/40' : 'bg-orange-100',
                text: isDark ? 'text-orange-200' : 'text-orange-800',
                border: ''
            }
        case 'blue': // Neuroanatomy
            return {
                bg: isDark ? 'bg-blue-900/40' : 'bg-blue-100',
                text: isDark ? 'text-blue-200' : 'text-blue-800',
                border: ''
            }
        default:
            return { bg: '', text: '', border: '' }
    }
}
