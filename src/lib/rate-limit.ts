interface RateLimitOptions {
  /** Quantidade de tentativas permitidas por janela. */
  limit: number
  /** Duração da janela, em milissegundos. */
  windowMs: number
  now?: () => number
}

interface RateLimitResult {
  allowed: boolean
  retryAfterMs: number
}

/** Acima deste tamanho, entradas expiradas são descartadas para o mapa não crescer sem limite. */
const PRUNE_THRESHOLD = 500

/**
 * Rate limiting simples, em memória, por janela fixa.
 *
 * Em ambientes serverless cada instância tem a própria memória, então o limite
 * é aproximado: serve para conter abusos básicos. Para um limite global, troque
 * por um armazenamento compartilhado (ex.: Upstash Redis).
 */
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimitOptions) {
  const windows = new Map<string, { count: number; resetAt: number }>()

  function pruneExpired(currentTime: number) {
    for (const [key, entry] of windows) {
      if (entry.resetAt <= currentTime) windows.delete(key)
    }
  }

  return {
    consume(key: string): RateLimitResult {
      const currentTime = now()
      if (windows.size > PRUNE_THRESHOLD) pruneExpired(currentTime)

      const entry = windows.get(key)
      if (!entry || entry.resetAt <= currentTime) {
        windows.set(key, { count: 1, resetAt: currentTime + windowMs })
        return { allowed: true, retryAfterMs: 0 }
      }

      if (entry.count >= limit) {
        return { allowed: false, retryAfterMs: entry.resetAt - currentTime }
      }

      entry.count += 1
      return { allowed: true, retryAfterMs: 0 }
    },
  }
}
