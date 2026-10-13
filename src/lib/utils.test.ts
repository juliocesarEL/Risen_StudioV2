import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn', () => {
  it('mantém tamanhos fluidos do tema ao lado de cores', () => {
    expect(cn('text-display', 'text-foreground')).toBe('text-display text-foreground')
  })

  it('mantém a família de títulos junto da largura condensada', () => {
    expect(cn('font-display font-semibold font-stretch-semi', 'text-h3')).toBe(
      'font-display font-semibold font-stretch-semi text-h3',
    )
  })

  it('resolve conflitos entre tokens do mesmo grupo', () => {
    expect(cn('font-stretch-display', 'font-stretch-semi')).toBe('font-stretch-semi')
    expect(cn('text-h2', 'text-display')).toBe('text-display')
    expect(cn('shadow-card', 'shadow-glow')).toBe('shadow-glow')
    expect(cn('rounded-card', 'rounded-md')).toBe('rounded-md')
    expect(cn('py-section', 'py-8')).toBe('py-8')
  })

  it('junta classes condicionais', () => {
    expect(cn('base', false && 'nunca', { ativo: true, inativo: false })).toBe('base ativo')
  })
})
