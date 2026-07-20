import { ArrowRight, Sparkles } from 'lucide-react'

export function PromoBanner() {
  return (
    <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background/40 to-accent/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row md:px-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="hidden size-8 shrink-0 items-center justify-center rounded-md bg-accent/15 ring-1 ring-accent/40 sm:flex">
            <Sparkles className="size-4 text-accent" />
          </div>
          <p className="text-pretty text-sm text-foreground/90">
            Want this dashboard with your{' '}
            <span className="font-semibold text-primary">Telegram Channel&apos;s logo</span>,
            domain, and colors?
          </p>
        </div>
        <button
          type="button"
          className="group flex shrink-0 items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Get White-Label Version
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
