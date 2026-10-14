import { describe, expect, it } from 'vitest'

import { buildMailtoUrl, MAILTO_BODY_MAX } from '@/lib/mailto'

describe('buildMailtoUrl', () => {
  it('codifica assunto e texto', () => {
    expect(
      buildMailtoUrl('a@b.com', { subject: 'Orçamento & site', body: 'Olá!\nTudo bem?' }),
    ).toBe('mailto:a@b.com?subject=Or%C3%A7amento%20%26%20site&body=Ol%C3%A1!%0ATudo%20bem%3F')
  })

  it('omite o texto quando ele está vazio', () => {
    expect(buildMailtoUrl('a@b.com', { subject: 'Oi', body: '   ' })).toBe(
      'mailto:a@b.com?subject=Oi',
    )
  })

  it('corta textos longos', () => {
    const url = buildMailtoUrl('a@b.com', {
      subject: 'Oi',
      body: 'x'.repeat(MAILTO_BODY_MAX + 500),
    })
    expect(url.endsWith('x'.repeat(MAILTO_BODY_MAX))).toBe(true)
    expect(url).not.toContain('x'.repeat(MAILTO_BODY_MAX + 1))
  })
})
