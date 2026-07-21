import { Flame, ArrowRight } from 'lucide-react'

export function AffiliateWidget() {
  return (
    <div className="animate-neon-orange relative overflow-hidden rounded-xl border border-primary/50 bg-gradient-to-br from-primary/20 via-black/60 to-card p-4 card-3d-glow">
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-6 -bottom-6 size-20 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/60 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
          <Flame className="size-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-primary text-glow-orange">Special Offer</p>
          <p className="text-pretty text-sm font-medium text-foreground">
            Get 50% Off Trading Fees via our Partner Exchange!
          </p>
        </div>
      </div>
      <button
        type="button"
        className="group mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:brightness-110 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Trade Now
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
