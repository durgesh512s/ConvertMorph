'use client'
import React, { useLayoutEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

type Tab = { key: string; label: string }

export default function CategoryTabs({ tabs, active, setActive }: {
  tabs: Tab[];
  active: string;
  setActive: (k:string)=>void;
}){
  const railRef = useRef<HTMLDivElement|null>(null)
  const btnRefs = useRef<(HTMLButtonElement|null)[]>([])
  const [style, setStyle] = useState<{left:number;width:number;top?:number;height?:number}>({ left:0, width:0 })

  // FDRIFT-1: Use offset metrics (no rect math)
  const measure = useCallback(() => {
    const i = Math.max(0, tabs.findIndex(t => t.key === active))
    const btn = btnRefs.current[i]
    const rail = railRef.current
    if(!btn || !rail) return

    // Calculate position relative to the rail's content area
    // btn.offsetLeft is relative to the rail's content box (excluding padding)
    const left = btn.offsetLeft
    const width = btn.offsetWidth

    // Do NOT clamp unless absolutely needed; clamping near the right edge causes the pill to stop early.
    setStyle({ left, width, top: 4, height: rail.clientHeight - 8 })
  }, [tabs, active])

  // FDRIFT-2: Helper to re-measure after auto-scroll completes
  const afterScroll = (fn: () => void) => {
    // Two RAFs + a short timeout let layout settle across browsers
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(fn, 16)))
  }

  const scrollIntoViewIfNeeded = useCallback((btn: HTMLButtonElement, rail: HTMLDivElement) => {
    const bLeft = btn.offsetLeft
    const bRight = bLeft + btn.offsetWidth
    const viewLeft = rail.scrollLeft
    const viewRight = viewLeft + rail.clientWidth
    if (bLeft < viewLeft || bRight > viewRight) {
      const target = Math.max(0, bLeft - Math.max(0, (rail.clientWidth - btn.offsetWidth) / 2))
      rail.scrollTo({ left: target, behavior: 'smooth' })
      afterScroll(measure)
      return
    }
    measure()
  }, [measure])

  useLayoutEffect(() => {
    const i = Math.max(0, tabs.findIndex(t => t.key === active))
    const btn = btnRefs.current[i]
    const rail = railRef.current
    if(btn && rail) scrollIntoViewIfNeeded(btn, rail)
  }, [active, tabs, scrollIntoViewIfNeeded])

  useLayoutEffect(() => {
    const ro = new ResizeObserver(measure)
    const rail = railRef.current
    if(rail) ro.observe(rail)
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    rail?.addEventListener('scroll', measure, { passive: true })
    document.fonts?.ready?.then(measure).catch(()=>{})
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
      rail?.removeEventListener('scroll', measure)
    }
  }, [measure])

  return (
    // GLASS-1: OUTER SHELL with overflow-hidden to clip blur, ring instead of border+shadow
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 dark:bg-gray-900/40">
      {/* GLASS-1: Clip the blur using an absolutely-positioned layer inside the rounded shell */}
      <div aria-hidden className="pointer-events-none absolute inset-0 backdrop-blur-sm rounded-2xl" />

      {/* GLASS-1: Content padding moved to an inner wrapper to avoid ring offsets */}
      <div className="relative px-3 py-2">
        {/* FDRIFT-3: RAIL classes (ensure no transforms on parent chain) */}
        <div
          ref={railRef}
          className="tabs-rail relative isolate flex items-center gap-1 overflow-x-auto no-scrollbar rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 pr-2"
        >
          {/* MFIX-1: Start spacer for reliable intrinsics */}
          <div aria-hidden className="shrink-0 w-2" />
          
          {/* Moving blue pill, absolutely positioned INSIDE the rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 rounded-xl bg-blue-600 transition-all duration-200 ease-out will-change-[left,width]"
            style={{ left: style.left, width: style.width }}
          />

          {tabs.map((t, i) => (
            <button
              key={t.key}
              ref={el => { btnRefs.current[i] = el }}
              onClick={() => setActive(t.key)}
              className={cn(
                // MFIX-4: Clean button spacing (no external margins)
                'relative z-10 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap text-center transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0',
                active === t.key ? 'text-white' : 'text-gray-700 dark:text-gray-200'
              )}
            >
              {t.label}
            </button>
          ))}
          
          {/* FDRIFT-4: Optional snap + end spacer (if still kissing the edge) */}
          <div aria-hidden className="shrink-0 w-2" />
        </div>
      </div>
    </div>
  )
}

// Named export for backward compatibility
export { CategoryTabs }
