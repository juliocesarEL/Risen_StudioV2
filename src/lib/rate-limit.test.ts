import { describe, expect, it } from 'vitest'

import { createRateLimiter } from '@/lib/rate-limit'

function createClock(start = 0) {
  let current = start
  return {
    now: () => current,
    advance: (ms: number) => {
      current += ms
    },
  }
}

describe('createRateLimiter', () => {
  it('permite até o limite dentro da janela e bloqueia depois', () => {
    const clock = createClock()
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: clock.now })

    expect(limiter.consume('ip').allowed).toBe(true)
    expect(limiter.consume('ip').allowed).toBe(true)
    expect(limiter.consume('ip')).toEqual({ allowed: false, retryAfterMs: 1000 })
  })

  it('libera de novo quando a janela expira', () => {
    const clock = createClock()
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: clock.now })

    limiter.consume('ip')
    clock.advance(1000)

    expect(limiter.consume('ip').allowed).toBe(true)
  })

  it('conta cada origem separadamente', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: createClock().now })

    expect(limiter.consume('a').allowed).toBe(true)
    expect(limiter.consume('b').allowed).toBe(true)
    expect(limiter.consume('a').allowed).toBe(false)
  })
})
