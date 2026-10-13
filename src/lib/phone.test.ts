import { describe, expect, it } from 'vitest'

import { formatBrazilianPhone, isValidBrazilianPhone, toNationalDigits } from '@/lib/phone'

describe('formatBrazilianPhone', () => {
  it.each([
    ['', ''],
    ['1', '(1'],
    ['11', '(11'],
    ['119', '(11) 9'],
    ['1191234', '(11) 9123-4'],
    ['1112345678', '(11) 1234-5678'],
    ['11912345678', '(11) 91234-5678'],
  ])('aplica a máscara progressiva: "%s" → "%s"', (input, expected) => {
    expect(formatBrazilianPhone(input)).toBe(expected)
  })

  it('ignora caracteres que não são dígitos e o excesso', () => {
    expect(formatBrazilianPhone('(11) 9-1234-5678 ramal 2')).toBe('(11) 91234-5678')
  })

  it('remove o DDI 55 de números colados com código do país', () => {
    expect(formatBrazilianPhone('+55 11 91234-5678')).toBe('(11) 91234-5678')
  })
})

describe('isValidBrazilianPhone', () => {
  it.each(['(11) 91234-5678', '(11) 1234-5678', '+55 11 91234-5678'])('aceita "%s"', (value) => {
    expect(isValidBrazilianPhone(value)).toBe(true)
  })

  it.each(['', '91234-5678', '(01) 91234-5678', '11 912345'])('rejeita "%s"', (value) => {
    expect(isValidBrazilianPhone(value)).toBe(false)
  })
})

describe('toNationalDigits', () => {
  it('mantém números sem DDI', () => {
    expect(toNationalDigits('(55) 91234-5678')).toBe('55912345678')
  })
})
