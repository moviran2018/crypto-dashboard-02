const KEY_PREFIX = 'nc_'

function now() { return Date.now() }

export function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key)
    if (!raw) return null
    const { data, ttl } = JSON.parse(raw)
    if (now() > ttl) { localStorage.removeItem(KEY_PREFIX + key); return null }
    return data as T
  } catch { return null }
}

export function cacheSet<T>(key: string, data: T, ttlMs: number): void {
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify({ data, ttl: now() + ttlMs }))
  } catch { /* storage full */ }
}

export async function withCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
): Promise<{ data: T; fromCache: boolean }> {
  const cached = cacheGet<T>(key)
  if (cached !== null) return { data: cached, fromCache: true }

  const fresh = await fetcher()
  cacheSet(key, fresh, ttlMs)
  return { data: fresh, fromCache: false }
}

/**
 * Stale-while-revalidate: show cache immediately, refresh in background.
 * Returns cached data instantly (or null), then updates cache + calls onFresh.
 */
export async function staleWhileRevalidate<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
  onFresh: (data: T) => void,
): Promise<T | null> {
  const cached = cacheGet<T>(key)
  if (cached !== null) {
    fetcher().then((fresh) => {
      cacheSet(key, fresh, ttlMs)
      onFresh(fresh)
    }).catch(() => {})
    return cached
  }
  try {
    const fresh = await fetcher()
    cacheSet(key, fresh, ttlMs)
    onFresh(fresh)
    return fresh
  } catch {
    return null
  }
}
