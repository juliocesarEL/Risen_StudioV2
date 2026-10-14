'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import {
  SubmitContactRequest,
  type SubmitContactRequestCommand,
  type SubmitContactRequestFailure,
} from '@/core/contact/application/submit-contact-request'
import { createContactNotifier } from '@/core/contact/infrastructure/create-contact-notifier'
import { createRateLimiter } from '@/lib/rate-limit'
import {
  budgetRangeOptions,
  type ContactFieldName,
  type ContactFormData,
  type ContactFormValues,
  contactSchema,
  projectTypeOptions,
} from '@/lib/schemas/contact'

export type ContactActionErrorCode =
  'validation' | 'rate-limited' | 'unavailable' | 'delivery-failed' | 'rejected'

export type ContactActionResult =
  | { status: 'success' }
  | {
      status: 'error'
      code: 'validation'
      fieldErrors: Partial<Record<ContactFieldName, string>>
    }
  | { status: 'error'; code: Exclude<ContactActionErrorCode, 'validation'> }

const MAX_SUBMISSIONS_PER_WINDOW = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

const rateLimiter = createRateLimiter({
  limit: MAX_SUBMISSIONS_PER_WINDOW,
  windowMs: RATE_LIMIT_WINDOW_MS,
})

const failureCodes: Record<
  SubmitContactRequestFailure,
  Exclude<ContactActionErrorCode, 'validation'>
> = {
  spam: 'rejected',
  invalid: 'rejected',
  unavailable: 'unavailable',
  'delivery-failed': 'delivery-failed',
}

/**
 * Recebe o formulário de orçamento. Os dados vindos do navegador nunca são
 * confiáveis: tudo é revalidado aqui com o mesmo schema do cliente.
 */
export async function submitContactForm(values: ContactFormValues): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return { status: 'error', code: 'validation', fieldErrors: firstErrorByField(parsed.error) }
  }

  const { allowed } = rateLimiter.consume(getClientKey(await headers()))
  if (!allowed) {
    return { status: 'error', code: 'rate-limited' }
  }

  const submitContactRequest = new SubmitContactRequest({ notifier: createContactNotifier() })
  const result = await submitContactRequest.execute(toCommand(parsed.data))

  return result.ok ? { status: 'success' } : { status: 'error', code: failureCodes[result.reason] }
}

function firstErrorByField(error: z.ZodError<ContactFormValues>) {
  const { fieldErrors } = z.flattenError(error)
  const entries = Object.entries(fieldErrors) as [ContactFieldName, string[] | undefined][]
  return Object.fromEntries(
    entries.flatMap(([field, messages]) => (messages?.[0] ? [[field, messages[0]]] : [])),
  ) as Partial<Record<ContactFieldName, string>>
}

/**
 * Identifica quem envia para o rate limiting.
 *
 * Usa o último IP de x-forwarded-for: é o que o proxy da hospedagem acrescentou,
 * enquanto os primeiros podem ser enviados pelo próprio visitante para escapar
 * do limite. Na Vercel o cabeçalho é reescrito pela plataforma e tem um só IP.
 */
function getClientKey(requestHeaders: Headers): string {
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',').at(-1)?.trim()
  return forwardedFor || requestHeaders.get('x-real-ip')?.trim() || 'desconhecido'
}

function toCommand(data: ContactFormData): SubmitContactRequestCommand {
  const projectType = projectTypeOptions.find((option) => option.id === data.projectType)
  const budget = budgetRangeOptions.find((option) => option.id === data.budget)

  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    projectType: { id: data.projectType, label: projectType?.label ?? data.projectType },
    budget: budget ? { id: budget.id, label: budget.label } : undefined,
    message: data.message,
    consent: data.consent,
    honeypot: data.hpCampo,
  }
}
