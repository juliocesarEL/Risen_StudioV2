import { useState } from 'react'

import { type ContactActionResult, submitContactForm } from '@/app/actions/contact'
import type { SubmissionErrorCode } from '@/components/sections/contact/form-status'
import { trackFormSubmitError, trackFormSubmitSuccess } from '@/lib/analytics'
import type { ContactFieldName, ContactFormData, ContactFormValues } from '@/lib/schemas/contact'

import type { DefaultValues, UseFormReturn } from 'react-hook-form'

export type SubmissionStatus =
  { kind: 'editing' } | { kind: 'success' } | { kind: 'error'; code: SubmissionErrorCode }

/**
 * Envio do formulário pela Server Action. O status reflete o resultado real
 * do servidor, nunca um sucesso simulado; erros de campo apontados pelo
 * servidor voltam para os campos correspondentes.
 */
export function useContactSubmission(
  form: UseFormReturn<ContactFormValues, unknown, ContactFormData>,
  defaultValues: DefaultValues<ContactFormValues>,
) {
  const [status, setStatus] = useState<SubmissionStatus>({ kind: 'editing' })

  function fail(code: SubmissionErrorCode) {
    trackFormSubmitError(code)
    setStatus({ kind: 'error', code })
  }

  function applyServerErrors(fieldErrors: Partial<Record<ContactFieldName, string>>) {
    const fields = Object.entries(fieldErrors) as [ContactFieldName, string][]
    fields.forEach(([field, message]) => form.setError(field, { type: 'server', message }))
    const [firstField] = fields[0] ?? []
    if (firstField) form.setFocus(firstField)
  }

  async function submit(values: ContactFormData) {
    setStatus({ kind: 'editing' })

    let result: ContactActionResult
    try {
      result = await submitContactForm(values)
    } catch (error) {
      console.error('[contato] Falha ao chamar o servidor.', error)
      fail('unexpected')
      return
    }

    if (result.status === 'success') {
      trackFormSubmitSuccess(values.projectType)
      form.reset(defaultValues)
      setStatus({ kind: 'success' })
      return
    }

    if (result.code === 'validation') applyServerErrors(result.fieldErrors)
    fail(result.code)
  }

  return { status, setStatus, submit }
}
