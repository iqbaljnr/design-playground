import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );
  const baseId = useId();

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div
      className={`divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated ${className}`}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-canvas cursor-pointer"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {item.tag && (
                      <span className="rounded-full border border-border-strong bg-surface px-2.5 py-0.5 font-display text-xs font-semibold text-ink tabular-nums">
                        {item.tag}
                      </span>
                    )}
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.title}
                    </span>
                  </div>
                  {item.subtitle && (
                    <span className="text-sm text-muted">{item.subtitle}</span>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-magenta' : 'rotate-0'
                    }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border-subtle bg-canvas px-5 py-4 text-sm leading-relaxed text-ink sm:text-base">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
