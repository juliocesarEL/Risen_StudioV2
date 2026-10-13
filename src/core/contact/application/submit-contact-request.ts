import {
  type ContactNotifier,
  NotifierUnavailableError,
} from '@/core/contact/application/contact-notifier'
import {
  type ContactRequest,
  type ContactRequestInput,
  createContactRequest,
} from '@/core/contact/domain/contact-request'
import { InvalidContactRequestError } from '@/core/contact/domain/errors'
import { isLikelySpam } from '@/core/contact/domain/spam-policy'

export interface SubmitContactRequestCommand extends ContactRequestInput {
  /** Valor do campo honeypot do formulário. */
  honeypot?: string
}

export type SubmitContactRequestFailure =
  /** O honeypot veio preenchido. */
  | 'spam'
  /** Os dados violam uma regra do domínio. */
  | 'invalid'
  /** O canal de entrega não está configurado. */
  | 'unavailable'
  /** A entrega falhou; uma nova tentativa pode funcionar. */
  | 'delivery-failed'

export type SubmitContactRequestResult =
  { ok: true; request: ContactRequest } | { ok: false; reason: SubmitContactRequestFailure }

type Logger = Pick<Console, 'error' | 'warn'>

interface Dependencies {
  notifier: ContactNotifier
  now?: () => Date
  logger?: Logger
}

/**
 * Caso de uso: registrar uma solicitação de orçamento e entregá-la ao estúdio.
 *
 * Nunca simula sucesso: se a entrega não acontece, o resultado diz o porquê.
 * Os logs não incluem dados pessoais de quem enviou.
 */
export class SubmitContactRequest {
  private readonly notifier: ContactNotifier
  private readonly now: () => Date
  private readonly logger: Logger

  constructor({ notifier, now = () => new Date(), logger = console }: Dependencies) {
    this.notifier = notifier
    this.now = now
    this.logger = logger
  }

  async execute(command: SubmitContactRequestCommand): Promise<SubmitContactRequestResult> {
    if (isLikelySpam(command)) {
      this.logger.warn('[contato] Envio descartado: honeypot preenchido.')
      return { ok: false, reason: 'spam' }
    }

    let request: ContactRequest
    try {
      request = createContactRequest(command, this.now())
    } catch (error) {
      if (error instanceof InvalidContactRequestError) {
        this.logger.warn(`[contato] Solicitação inválida: ${error.reason}.`)
        return { ok: false, reason: 'invalid' }
      }
      throw error
    }

    try {
      await this.notifier.notify(request)
      return { ok: true, request }
    } catch (error) {
      if (error instanceof NotifierUnavailableError) {
        this.logger.error(`[contato] Canal de entrega indisponível: ${error.message}`)
        return { ok: false, reason: 'unavailable' }
      }
      this.logger.error('[contato] Falha ao entregar a solicitação.', error)
      return { ok: false, reason: 'delivery-failed' }
    }
  }
}
