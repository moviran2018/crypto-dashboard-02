import { TopNavbar } from '@/components/features/layout'
import { PromoBanner } from '@/components/features/layout'
import { CryptoTable } from '@/components/features/prices'
import { WalletHub } from '@/components/features/wallet'
import { ErrorBoundary } from '@/components/error-boundary'

export default function Page() {
  return (
    <div className="min-h-svh cyber-grid">
      <ErrorBoundary name="Promo">
        <PromoBanner />
      </ErrorBoundary>
      <ErrorBoundary name="Navbar">
        <TopNavbar />
      </ErrorBoundary>

      <main className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Multi-Chain Portfolio Tracker
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time markets, wallet insights, and AI risk analysis in one neon hub.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="min-w-0 lg:h-[calc(100svh-13rem)]">
            <ErrorBoundary name="Price Table">
              <CryptoTable />
            </ErrorBoundary>
          </div>
          <ErrorBoundary name="Wallet Hub">
            <WalletHub />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  )
}
