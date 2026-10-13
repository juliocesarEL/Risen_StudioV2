import { describe, expect, it } from 'vitest'

import { siteConfig } from '@/content/site'
import { createWhatsAppUrl, getStudioWhatsAppUrl, InvalidWhatsAppNumberError } from '@/lib/whatsapp'

describe('createWhatsAppUrl', () => {
  it('gera o link wa.me apenas com dígitos', () => {
    expect(createWhatsAppUrl('+55 (11) 91234-5678')).toBe('https://wa.me/5511912345678')
  })

  it('codifica a mensagem com %20 (o wa.me exibe "+" literalmente)', () => {
    const url = createWhatsAppUrl('5511912345678', 'Olá! Quero um site & um sistema?')

    expect(url).toBe(
      'https://wa.me/5511912345678?text=Ol%C3%A1!%20Quero%20um%20site%20%26%20um%20sistema%3F',
    )
    expect(url).not.toContain('+')
  })

  it('preserva quebras de linha e acentos ao decodificar', () => {
    const message = 'Linha 1\nAção: orçamento'
    const url = new URL(createWhatsAppUrl('5511912345678', message))

    expect(url.searchParams.get('text')).toBe(message)
  })

  it('omite o parâmetro text quando a mensagem está vazia', () => {
    expect(createWhatsAppUrl('5511912345678', '   ')).toBe('https://wa.me/5511912345678')
  })

  it.each(['', '1234567', '1234567890123456', 'abc'])('rejeita número inválido: "%s"', (value) => {
    expect(() => createWhatsAppUrl(value)).toThrow(InvalidWhatsAppNumberError)
  })
})

describe('getStudioWhatsAppUrl', () => {
  it('usa o número e a mensagem padrão de site.ts', () => {
    const url = new URL(getStudioWhatsAppUrl())

    expect(url.pathname).toBe(`/${siteConfig.contact.whatsapp.number}`)
    expect(url.searchParams.get('text')).toBe(siteConfig.contact.whatsapp.messages.default)
  })

  it('aceita uma mensagem específica', () => {
    const url = new URL(getStudioWhatsAppUrl('Mensagem da seção de soluções'))

    expect(url.searchParams.get('text')).toBe('Mensagem da seção de soluções')
  })
})
