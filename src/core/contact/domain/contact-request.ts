import { InvalidContactRequestError } from '@/core/contact/domain/errors'

/** Uma opção escolhida no formulário: identificador estável e rótulo legível. */
export interface Choice {
  id: string
  label: string
}

/** Solicitação de orçamento recebida pelo estúdio. */
export interface ContactRequest {
  readonly name: string
  readonly email: string
  readonly phone?: string
  readonly company?: string
  readonly projectType: Choice
  readonly budget?: Choice
  readonly message: string
  /** Momento em que o consentimento (LGPD) foi registrado. */
  readonly consentedAt: Date
  readonly receivedAt: Date
}

export interface ContactRequestInput {
  name: string
  email: string
  phone?: string
  company?: string
  projectType: Choice
  budget?: Choice
  message: string
  consent: boolean
}

const collapseWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim()

const optionalText = (value: string | undefined) => {
  const text = value ? collapseWhitespace(value) : ''
  return text === '' ? undefined : text
}

/**
 * Cria uma solicitação válida.
 *
 * Regras: sem consentimento não existe solicitação (LGPD), e nome, e-mail,
 * tipo de projeto e mensagem são obrigatórios. Textos são normalizados.
 */
export function createContactRequest(input: ContactRequestInput, now: Date): ContactRequest {
  if (!input.consent) {
    throw new InvalidContactRequestError('missing-consent')
  }

  const name = collapseWhitespace(input.name)
  const email = input.email.trim().toLowerCase()
  const message = input.message.trim()

  const missingField = [
    ['name', name],
    ['email', email],
    ['message', message],
    ['projectType', input.projectType.id],
  ].find(([, value]) => !value)

  if (missingField) {
    throw new InvalidContactRequestError('missing-required-field', missingField[0])
  }

  return Object.freeze({
    name,
    email,
    phone: optionalText(input.phone),
    company: optionalText(input.company),
    projectType: input.projectType,
    budget: input.budget,
    message,
    consentedAt: now,
    receivedAt: now,
  })
}
