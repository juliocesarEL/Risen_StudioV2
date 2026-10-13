import { useLayoutEffect } from 'react'

import { formatBrazilianPhone } from '@/lib/phone'
import type { ContactFormData, ContactFormValues } from '@/lib/schemas/contact'

import type { RefObject } from 'react'
import type { UseFormReturn } from 'react-hook-form'

/** Campos de texto que podem ter sido preenchidos antes de o formulário ficar interativo. */
const TYPED_FIELDS = ['name', 'email', 'phone', 'company', 'message'] as const

/**
 * O HTML do formulário chega antes do código (hidratação sob demanda). Se a
 * pessoa já tiver digitado algo, o valor é levado para o estado do formulário
 * assim que ele fica interativo, em vez de se perder.
 */
export function useEarlyInput(
  formRef: RefObject<HTMLFormElement | null>,
  form: UseFormReturn<ContactFormValues, unknown, ContactFormData>,
) {
  useLayoutEffect(() => {
    const elements = formRef.current?.elements
    TYPED_FIELDS.forEach((name) => {
      const input = elements?.namedItem(name)
      const isTextInput = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement
      if (!isTextInput || input.value === '' || input.value === form.getValues(name)) return
      const value = name === 'phone' ? formatBrazilianPhone(input.value) : input.value
      form.setValue(name, value, { shouldDirty: true })
    })
  }, [formRef, form])
}
