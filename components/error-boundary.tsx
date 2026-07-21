'use client'

import { Component, type ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

type Props = { children: ReactNode; name: string; fallback?: ReactNode }
type State = { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <AlertCircle className="size-8 text-destructive/60" />
          <div>
            <p className="text-sm font-semibold text-destructive">{this.props.name} crashed</p>
            <p className="mt-1 text-xs text-muted-foreground">{this.state.error?.message}</p>
          </div>
          <button
            type="button"
            onClick={this.handleRetry}
            className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <RefreshCw className="size-3.5" /> Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
