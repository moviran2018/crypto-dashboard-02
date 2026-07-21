'use client'

import { useState } from 'react'
import type { TokenHolding } from '@/lib/crypto-data'

export function DonutChart({ holdings }: { holdings: TokenHolding[] }) {
  const [active, setActive] = useState<number | null>(null)
  const total = holdings.reduce((sum, h) => sum + h.value, 0)

  const radius = 70
  const stroke = 22
  const circumference = 2 * Math.PI * radius
  let offset = 0

  const segments = holdings.map((h) => {
    const fraction = h.value / total
    const seg = { ...h, fraction, dash: fraction * circumference, offset }
    offset += fraction * circumference
    return seg
  })

  const focused = active !== null ? holdings[active] : null

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative shrink-0">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--secondary)" strokeWidth={stroke} />
          {segments.map((seg, i) => (
            <circle
              key={seg.symbol}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={active === i ? stroke + 4 : stroke}
              strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
              strokeDashoffset={-seg.offset}
              className="cursor-pointer transition-all duration-200"
              style={{ opacity: active === null || active === i ? 1 : 0.35 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {focused ? focused.symbol : 'Total'}
          </span>
          <span className="font-mono text-lg font-bold text-foreground">
            $
            {(focused ? focused.value : total).toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })}
          </span>
          {focused && (
            <span className="font-mono text-[11px] text-primary">
              {(focused.fraction * 100).toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <ul className="flex w-full flex-col gap-2">
        {segments.map((seg, i) => (
          <li key={seg.symbol}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-secondary"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">{seg.name}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{seg.amount}</span>
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-mono text-sm text-foreground">
                  ${seg.value.toLocaleString('en-US')}
                </span>
                <span className="block font-mono text-[11px] text-muted-foreground">
                  {(seg.fraction * 100).toFixed(1)}%
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
