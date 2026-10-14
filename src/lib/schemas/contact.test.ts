import { describe, expect, it } from 'vitest'

import { contactFormCopy } from '@/content/contact'
import {
  budgetRangeOptions,
  type ContactFormValues,
  contactSchema,
  projectTypeOptions,
} from '@/lib/schemas/contact'

const messages = contactFormCopy.validation

const validValues: ContactFormValues = {
  name: 'Maria Souza',
  email: 'maria@empresa.com.br',
  phone: '(11) 91234-5678',
  company: 'Empresa Exemplo',
  projectType: 'landing-page',
  budget: '2k-5k',
  message: 'Preciso de uma página para divulgar o lançamento de um curso.',
  consent: true,
  hpCampo: '',
}

/** Primeira mensagem de erro do campo (ou undefined quando o campo é válido). */
function errorFor(values: Partial<ContactFormValues>, field: keyof ContactFormValues) {
  const result = contactSchema.safeParse({ ...validValues, ...values })
  if (result.success) return undefined
  return result.error.issues.find((issue) => issue.path[0] === field)?.message
}

describe('contactSchema', () => {
  it('aceita um formulário completo e válido', () => {
    expect(contactSchema.safeParse(validValues).success).toBe(true)
  })

  it('aceita os campos opcionais vazios', () => {
    const result = contactSchema.safeParse({
      ...validValues,
      phone: '',
      company: '',
      budget: undefined,
    })
    expect(result.success).toBe(true)
  })

  it('remove espaços extras do começo e do fim', () => {
    const result = contactSchema.parse({
      ...validValues,
      name: '  Maria  ',
      email: ' maria@empresa.com.br ',
    })
    expect(result.name).toBe('Maria')
    expect(result.email).toBe('maria@empresa.com.br')
  })

  describe('nome', () => {
    it('exige no mínimo 2 caracteres', () => {
      expect(errorFor({ name: 'M' }, 'name')).toBe(messages.nameMin)
      expect(errorFor({ name: '   ' }, 'name')).toBe(messages.nameMin)
    })

    it('limita o tamanho', () => {
      expect(errorFor({ name: 'a'.repeat(121) }, 'name')).toBe(messages.nameMax)
    })
  })

  describe('e-mail', () => {
    it('é obrigatório', () => {
      expect(errorFor({ email: '' }, 'email')).toBe(messages.emailRequired)
    })

    it.each(['maria', 'maria@', 'maria@empresa', '@empresa.com'])('rejeita "%s"', (email) => {
      expect(errorFor({ email }, 'email')).toBe(messages.emailInvalid)
    })
  })

  describe('telefone', () => {
    it('é opcional', () => {
      expect(errorFor({ phone: '' }, 'phone')).toBeUndefined()
      expect(errorFor({ phone: undefined }, 'phone')).toBeUndefined()
    })

    it('exige DDD quando informado', () => {
      expect(errorFor({ phone: '91234-5678' }, 'phone')).toBe(messages.phoneInvalid)
    })

    it('aceita fixo e celular com DDD', () => {
      expect(errorFor({ phone: '(11) 1234-5678' }, 'phone')).toBeUndefined()
      expect(errorFor({ phone: '11912345678' }, 'phone')).toBeUndefined()
    })
  })

  describe('tipo de projeto', () => {
    it('é obrigatório', () => {
      expect(errorFor({ projectType: undefined }, 'projectType')).toBe(messages.projectTypeRequired)
    })

    it('só aceita os tipos ativos em site.ts', () => {
      const invalid = { projectType: 'aplicativo-de-celular' } as unknown as ContactFormValues
      expect(errorFor(invalid, 'projectType')).toBe(messages.projectTypeRequired)

      for (const option of projectTypeOptions) {
        expect(errorFor({ projectType: option.id }, 'projectType')).toBeUndefined()
      }
    })
  })

  describe('faixa de investimento', () => {
    it('é opcional, mas precisa ser uma das faixas de site.ts', () => {
      expect(errorFor({ budget: undefined }, 'budget')).toBeUndefined()
      expect(errorFor({ budget: 'um-milhao' }, 'budget')).toBe(messages.budgetInvalid)

      for (const option of budgetRangeOptions) {
        expect(errorFor({ budget: option.id }, 'budget')).toBeUndefined()
      }
    })
  })

  describe('descrição da necessidade', () => {
    it('exige no mínimo 20 caracteres, sem contar espaços nas pontas', () => {
      expect(errorFor({ message: 'Quero um site.' }, 'message')).toBe(messages.messageMin)
      expect(errorFor({ message: `   ${'a'.repeat(19)}   ` }, 'message')).toBe(messages.messageMin)
      expect(errorFor({ message: 'a'.repeat(20) }, 'message')).toBeUndefined()
    })

    it('limita o tamanho', () => {
      expect(errorFor({ message: 'a'.repeat(4001) }, 'message')).toBe(messages.messageMax)
    })
  })

  it('exige o consentimento da LGPD', () => {
    expect(errorFor({ consent: false }, 'consent')).toBe(messages.consentRequired)
  })

  it('deixa a decisão sobre o honeypot para o caso de uso', () => {
    expect(
      contactSchema.safeParse({ ...validValues, hpCampo: 'https://spam.example' }).success,
    ).toBe(true)
  })
})
