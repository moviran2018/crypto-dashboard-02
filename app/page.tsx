import { TopNavbar } from '@/components/features/layout'
import { PromoBanner } from '@/components/features/layout'
import { CryptoTable } from '@/components/features/prices'
import { WalletHub } from '@/components/features/wallet'
import { ErrorBoundary } from '@/components/error-boundary'
import { WalletProvider } from '@/lib/wallet-context'

export default function Page() {
  return (
    <WalletProvider>
      <div className="min-h-svh cyber-grid">
        <div>
          <ErrorBoundary name="Promo">
            <PromoBanner />
          </ErrorBoundary>
          <ErrorBoundary name="Navbar">
            <TopNavbar />
          </ErrorBoundary>

          <main className="mx-auto max-w-[1400px] px-3 py-4 md:px-6 md:py-8 safe-bottom">
            <div className="mb-4 md:mb-6">
              <h1 className="text-balance text-xl font-bold tracking-tight text-foreground md:text-3xl text-glow-orange">
                Multi-Chain Portfolio Tracker
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                Real-time markets, wallet insights, and AI risk analysis in one neon hub.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
              <div className="min-w-0 lg:max-h-[calc(100svh-13rem)] lg:min-h-[520px] card-3d-glow rounded-2xl">
                <ErrorBoundary name="Price Table">
                  <CryptoTable />
                </ErrorBoundary>
              </div>
              <div className="card-3d-glow rounded-2xl">
                <ErrorBoundary name="Wallet Hub">
                  <WalletHub />
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </div>
      </div>
    </WalletProvider>
  )
}
