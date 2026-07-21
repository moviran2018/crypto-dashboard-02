import { Flame, ArrowRight } from 'lucide-react'

export function AffiliateWidget() {
  return (
    <div className="animate-neon-pulse relative overflow-hidden rounded-xl border border-primary/60 bg-gradient-to-br from-primary/15 via-card to-card p-4">
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/50">
          <Flame className="size-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Special Offer</p>
          <p className="text-pretty text-sm font-medium text-foreground">
            Get 50% Off Trading Fees via our Partner Exchange!
          </p>
        </div>
      </div>
      <button
        type="button"
        className="group mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Trade Now
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
