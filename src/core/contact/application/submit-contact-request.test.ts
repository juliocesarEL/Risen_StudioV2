import { describe, expect, it, vi } from 'vitest'

import {
  type ContactNotifier,
  NotificationDeliveryError,
  NotifierUnavailableError,
} from '@/core/contact/application/contact-notifier'
import {
  SubmitContactRequest,
  type SubmitContactRequestCommand,
} from '@/core/contact/application/submit-contact-request'
import type { ContactRequest } from '@/core/contact/domain/contact-request'
import { createContactNotifier } from '@/core/contact/infrastructure/create-contact-notifier'

/** Notificador falso: guarda o que recebeu e pode simular falhas. */
class FakeNotifier implements ContactNotifier {
  readonly received: ContactRequest[] = []
  failure?: Error

  async notify(request: ContactRequest): Promise<void> {
    if (this.failure) throw this.failure
    this.received.push(request)
  }
}

const NOW = new Date('2026-05-04T13:30:00.000Z')

const command: SubmitContactRequestCommand = {
  name: '  Maria   Souza ',
  email: ' Maria@Empresa.com.BR ',
  phone: '(11) 91234-5678',
  company: '   ',
  projectType: { id: 'landing-page', label: 'Landing page' },
  budget: { id: '2k-5k', label: 'R$ 2.000 – R$ 5.000' },
  message: '  Preciso de uma página para divulgar um lançamento.  ',
  consent: true,
  honeypot: '',
}

function setup() {
  const notifier = new FakeNotifier()
  const logger = { error: vi.fn(), warn: vi.fn() }
  const useCase = new SubmitContactRequest({ notifier, now: () => NOW, logger })
  return { notifier, logger, useCase }
}

describe('SubmitContactRequest', () => {
  it('entrega a solicitação normalizada ao notificador', async () => {
    const { notifier, useCase } = setup()

    const result = await useCase.execute(command)

    expect(result.ok).toBe(true)
    expect(notifier.received).toHaveLength(1)
    expect(notifier.received[0]).toEqual({
      name: 'Maria Souza',
      email: 'maria@empresa.com.br',
      phone: '(11) 91234-5678',
      company: undefined,
      projectType: { id: 'landing-page', label: 'Landing page' },
      budget: { id: '2k-5k', label: 'R$ 2.000 – R$ 5.000' },
      message: 'Preciso de uma página para divulgar um lançamento.',
      consentedAt: NOW,
      receivedAt: NOW,
    })
  })

  it('descarta envios com o honeypot preenchido, sem notificar', async () => {
    const { notifier, useCase, logger } = setup()

    const result = await useCase.execute({ ...command, honeypot: 'https://spam.example' })

    expect(result).toEqual({ ok: false, reason: 'spam' })
    expect(notifier.received).toHaveLength(0)
    expect(logger.warn).toHaveBeenCalled()
  })

  it('recusa solicitações sem consentimento (LGPD)', async () => {
    const { notifier, useCase } = setup()

    const result = await useCase.execute({ ...command, consent: false })

    expect(result).toEqual({ ok: false, reason: 'invalid' })
    expect(notifier.received).toHaveLength(0)
  })

  it('recusa solicitações sem campos obrigatórios', async () => {
    const { notifier, useCase } = setup()

    const result = await useCase.execute({ ...command, message: '   ' })

    expect(result).toEqual({ ok: false, reason: 'invalid' })
    expect(notifier.received).toHaveLength(0)
  })

  it('informa quando o canal de entrega está indisponível', async () => {
    const { notifier, useCase, logger } = setup()
    notifier.failure = new NotifierUnavailableError('sem chave')

    const result = await useCase.execute(command)

    expect(result).toEqual({ ok: false, reason: 'unavailable' })
    expect(logger.error).toHaveBeenCalled()
  })

  it('informa falhas de entrega sem fingir sucesso', async () => {
    const { notifier, useCase, logger } = setup()
    notifier.failure = new NotificationDeliveryError('timeout')

    const result = await useCase.execute(command)

    expect(result).toEqual({ ok: false, reason: 'delivery-failed' })
    expect(logger.error).toHaveBeenCalled()
  })

  it('trata erros inesperados do notificador como falha de entrega', async () => {
    const { notifier, useCase } = setup()
    notifier.failure = new TypeError('fetch failed')

    expect(await useCase.execute(command)).toEqual({ ok: false, reason: 'delivery-failed' })
  })

  it('não registra dados pessoais nos logs', async () => {
    const { notifier, useCase, logger } = setup()
    notifier.failure = new NotifierUnavailableError('sem chave')

    await useCase.execute(command)

    const logged = JSON.stringify([...logger.error.mock.calls, ...logger.warn.mock.calls])
    expect(logged).not.toContain('maria')
    expect(logged).not.toContain('91234')
  })
})

describe('sem RESEND_API_KEY configurada', () => {
  it('o envio falha de forma honesta ("unavailable"), nunca com sucesso simulado', async () => {
    const useCase = new SubmitContactRequest({
      notifier: createContactNotifier({}),
      logger: { error: vi.fn(), warn: vi.fn() },
    })

    expect(await useCase.execute(command)).toEqual({ ok: false, reason: 'unavailable' })
  })

  it('também falha quando falta o destinatário', async () => {
    const useCase = new SubmitContactRequest({
      notifier: createContactNotifier({ RESEND_API_KEY: 're_teste' }),
      logger: { error: vi.fn(), warn: vi.fn() },
    })

    expect(await useCase.execute(command)).toEqual({ ok: false, reason: 'unavailable' })
  })
})
