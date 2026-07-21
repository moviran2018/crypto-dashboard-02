'use client'

import { useEffect, useState } from 'react'
import { Check, Crown, Lock, Sparkles, X } from 'lucide-react'

const PERKS = [
  'AI-driven portfolio risk scoring & health checks',
  'Smart rebalancing & diversification alerts',
  'Whale movement and liquidation tracking',
  'Priority multi-chain data with zero rate limits',
]

export function AiPremium() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-accent/50 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 px-4 py-4 text-base font-bold text-accent transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent card-3d-glow"
      >
        <Crown className="size-5" />
        Generate AI Portfolio Risk Analysis
        <Lock className="size-4 opacity-70" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="premium-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-accent/40 bg-card/95 backdrop-blur-sm p-6 shadow-[0_0_60px_rgba(251,191,36,0.3),0_0_120px_rgba(251,191,36,0.1)] card-3d">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 -bottom-10 size-32 rounded-full bg-accent/10 blur-3xl" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <div className="relative flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent/50 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <Crown className="size-7 text-accent" />
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent text-glow-gold">
                <Lock className="size-3" /> Premium Locked
              </span>
              <h3 id="premium-title" className="mt-3 text-xl font-bold text-foreground">
                Unlock AI Risk Analysis
              </h3>
              <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
                Upgrade to NeonChain Pro to run deep, AI-powered risk analysis across your entire
                multi-chain portfolio.
              </p>
            </div>

            <ul className="relative mt-5 flex flex-col gap-2.5">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent shadow-[0_0_8px_rgba(251,191,36,0.2)]">
                    <Check className="size-3.5" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-base font-bold text-accent-foreground shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Sparkles className="size-4" />
              Upgrade to Pro — $19/mo
            </button>
            <p className="mt-2.5 text-center text-xs text-muted-foreground">
              Cancel anytime · 7-day money-back guarantee
            </p>
          </div>
        </div>
      )}
    </>
  )
}
