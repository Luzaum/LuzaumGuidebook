import React from 'react';
import { cn } from '../../../../lib/utils';

interface SummaryListItem {
  text: string;
  children: SummaryListItem[];
}

type SummaryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'ul'; items: SummaryListItem[] }
  | { type: 'ol'; items: SummaryListItem[] };

const UNORDERED_ITEM_RE = /^(\s*)([-•*])\s+(.*)$/;
const ORDERED_ITEM_RE = /^(\s*)(\d+[.)])\s+(.*)$/;
const LEAD_LABEL_RE = /^([^.:!?]{2,70}):\s+(.+)$/;

function pushNestedItem(rootItems: SummaryListItem[], indent: number, text: string) {
  const newItem: SummaryListItem = { text: text.trim(), children: [] };
  if (indent >= 2 && rootItems.length > 0) {
    rootItems[rootItems.length - 1].children.push(newItem);
    return;
  }
  rootItems.push(newItem);
}

export function parseStructuredSummaryBlocks(rawText: string): SummaryBlock[] {
  const normalized = String(rawText || '').replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const lines = normalized.split('\n');
  const blocks: SummaryBlock[] = [];
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    const joined = paragraphLines.map((line) => line.trim()).filter(Boolean).join(' ');
    if (joined) {
      blocks.push({ type: 'paragraph', text: joined });
    }
    paragraphLines = [];
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const ulMatch = rawLine.match(UNORDERED_ITEM_RE);
    if (ulMatch) {
      flushParagraph();
      const indent = ulMatch[1].length;
      const itemText = ulMatch[3].trim();
      const lastBlock = blocks[blocks.length - 1];
      if (lastBlock && lastBlock.type === 'ul') {
        pushNestedItem(lastBlock.items, indent, itemText);
      } else {
        blocks.push({ type: 'ul', items: [{ text: itemText, children: [] }] });
      }
      continue;
    }

    const olMatch = rawLine.match(ORDERED_ITEM_RE);
    if (olMatch) {
      flushParagraph();
      const indent = olMatch[1].length;
      const itemText = olMatch[3].trim();
      const lastBlock = blocks[blocks.length - 1];
      if (lastBlock && lastBlock.type === 'ol') {
        pushNestedItem(lastBlock.items, indent, itemText);
      } else {
        blocks.push({ type: 'ol', items: [{ text: itemText, children: [] }] });
      }
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function renderInlineWithMarkdownBold(
  text: string,
  renderInline: (chunk: string) => React.ReactNode
): React.ReactNode {
  if (!text.includes('**')) {
    return renderInline(text);
  }

  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          const inner = part.slice(2, -2);
          return (
            <strong key={idx} className="font-semibold text-foreground">
              {renderInline(inner)}
            </strong>
          );
        }
        return <React.Fragment key={idx}>{renderInline(part)}</React.Fragment>;
      })}
    </>
  );
}

function renderListItemContent(
  text: string,
  renderInline: (chunk: string) => React.ReactNode,
  boldLeadLabels: boolean
): React.ReactNode {
  if (!boldLeadLabels) {
    return renderInlineWithMarkdownBold(text, renderInline);
  }

  // Handle explicit markdown bold label at start: "**Label**: rest"
  const mdLabelMatch = text.match(/^\*\*([^*\n]{2,80})\*\*:\s+(.+)$/);
  if (mdLabelMatch) {
    return (
      <>
        <strong className="font-semibold text-foreground">
          {renderInline(mdLabelMatch[1])}:
        </strong>{' '}
        {renderInlineWithMarkdownBold(mdLabelMatch[2], renderInline)}
      </>
    );
  }

  // Handle plain "Label: rest" prefix when not already formatted with markdown bold and not a URL
  if (!text.startsWith('**')) {
    const labelMatch = text.match(LEAD_LABEL_RE);
    if (labelMatch && !/^https?$/i.test(labelMatch[1].trim())) {
      return (
        <>
          <strong className="font-semibold text-foreground">
            {renderInline(labelMatch[1])}:
          </strong>{' '}
          {renderInlineWithMarkdownBold(labelMatch[2], renderInline)}
        </>
      );
    }
  }

  return renderInlineWithMarkdownBold(text, renderInline);
}

interface StructuredSummaryTextProps {
  text: string;
  renderInline?: (chunk: string) => React.ReactNode;
  className?: string;
  paragraphClassName?: string;
  listClassName?: string;
  orderedListClassName?: string;
  listItemClassName?: string;
  boldLeadLabels?: boolean;
}

/**
 * Renderiza resumos clínicos e textos em linguagem simples convertendo marcadores
 * (`- `, `• `, `* `, subníveis indentados e listas numeradas `1. `) em listas semânticas.
 */
export function StructuredSummaryText({
  text,
  renderInline = (chunk) => chunk,
  className,
  paragraphClassName,
  listClassName,
  orderedListClassName,
  listItemClassName,
  boldLeadLabels = true,
}: StructuredSummaryTextProps) {
  const blocks = parseStructuredSummaryBlocks(text);
  if (blocks.length === 0) return null;

  return (
    <div className={cn('space-y-2.5', className)}>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className={paragraphClassName}>
              {renderInlineWithMarkdownBold(block.text, renderInline)}
            </p>
          );
        }

        const ListTag = block.type === 'ol' ? 'ol' : 'ul';
        const listStyleClass =
          block.type === 'ol'
            ? cn('list-decimal pl-5 space-y-1.5 font-normal', orderedListClassName)
            : cn('list-disc pl-5 space-y-1.5 font-normal', listClassName);

        return (
          <ListTag key={index} className={listStyleClass}>
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx} className={cn('pl-0.5', listItemClassName)}>
                {renderListItemContent(item.text, renderInline, boldLeadLabels)}
                {item.children.length > 0 && (
                  <ul className="mt-1.5 list-[circle] pl-5 space-y-1">
                    {item.children.map((child, childIdx) => (
                      <li key={childIdx}>
                        {renderListItemContent(child.text, renderInline, boldLeadLabels)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
}
