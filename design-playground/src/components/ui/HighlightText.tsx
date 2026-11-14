import type { ReactNode } from 'react';

export type HighlightVariant = 'soft' | 'tint' | 'mint' | 'dark';

interface HighlightTextProps {
  text: string;
  variant?: HighlightVariant;
  className?: string;
}

const TOKEN_SPLIT_RE = /(\*\*[^*\n]+\*\*)/g;

const MARK_VARIANT_CLASSES: Record<HighlightVariant, string> = {
  soft: 'font-semibold text-ink',
  tint: 'font-semibold text-ink',
  mint: 'font-semibold text-ink',
  dark: 'font-semibold text-ink',
};

export function stripHighlights(text: string): string {
  return text.replace(/\*\*([^*\n]+)\*\*/g, '$1');
}

export function renderHighlightedText(
  text: string,
  variant: HighlightVariant = 'soft'
): ReactNode[] {
  const parts = text.split(TOKEN_SPLIT_RE);
  const tokenClass = MARK_VARIANT_CLASSES[variant] || 'font-semibold text-ink';

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const inner = part.slice(2, -2);
      if (!inner.trim()) {
        return part;
      }
      return (
        <strong key={index} className={tokenClass}>
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export function HighlightText({
  text,
  variant = 'soft',
  className,
}: HighlightTextProps) {
  return <span className={className}>{renderHighlightedText(text, variant)}</span>;
}

