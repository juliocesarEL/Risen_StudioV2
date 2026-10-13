import 'server-only'

import type { ContactNotifier } from '@/core/contact/application/contact-notifier'
import { ResendNotifier } from '@/core/contact/infrastructure/resend-notifier'
import { UnavailableNotifier } from '@/core/contact/infrastructure/unavailable-notifier'

/** Remetente de testes do Resend: só entrega para o e-mail dono da conta. */
const RESEND_TEST_SENDER = 'Risen Studio <onboarding@resend.dev>'

type Env = Record<string, string | undefined>

/**
 * Monta o notificador a partir das variáveis de ambiente
 * RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.
 */
export function createContactNotifier(env: Env = process.env): ContactNotifier {
  const apiKey = env.RESEND_API_KEY?.trim()
  const to = env.CONTACT_TO_EMAIL?.trim()

  if (!apiKey || !to) {
    return new UnavailableNotifier('RESEND_API_KEY e/ou CONTACT_TO_EMAIL não configurados.')
  }

  const from = env.CONTACT_FROM_EMAIL?.trim() || RESEND_TEST_SENDER
  return new ResendNotifier({ apiKey, to, from })
}
