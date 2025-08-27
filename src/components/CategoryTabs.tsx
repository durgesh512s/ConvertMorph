import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CategoryTabs({ tabs, active, setActive }: {
  tabs: { key: string; label: string }[];
  active: string;
  setActive: (k: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [style, setStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const update = () => {
    const i = Math.max(0, tabs.findIndex(t => t.key === active));
    const btn = btnRefs.current[i];
    const container = containerRef.current;
    if (!btn || !container) return;
    const b = btn.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    // account for container padding (Tailwind p-1) and any gap-1 between buttons
    const PAD = 4; // px → p-1
    setStyle({ left: Math.max(0, b.left - c.left + PAD), width: Math.max(0, b.width - PAD * 2) });
  };

  useLayoutEffect(() => {
    update();
    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [active, tabs.map(t => t.key).join('|')]);

  return (
    <div
      ref={containerRef}
      className="relative isolate flex items-center gap-1 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 overflow-hidden"
      role="tablist"
      aria-label="Tool categories"
    >
      <span
        className="pointer-events-none absolute top-1 bottom-1 rounded-xl bg-blue-600 transition-all duration-200 ease-out"
        style={{ left: style.left, width: style.width }}
      />
      {tabs.map((t, i) => (
        <button
          key={t.key}
          ref={el => { btnRefs.current[i] = el; }}
          onClick={() => setActive(t.key)}
          className={cn(
            'relative z-10 rounded-xl px-4 py-2 text-sm font-medium text-center transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600',
            active === t.key ? 'text-white' : 'text-gray-700 dark:text-gray-200'
          )}
          role="tab"
          aria-selected={active === t.key}
          aria-controls={`${t.key}-panel`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
