'use client'

import { CircleCheck, Mail, RotateCcw, TriangleAlert } from 'lucide-react'
import { useEffect, useRef } from 'react'

import type { ContactActionErrorCode } from '@/app/actions/contact'
import { CopyEmailButton } from '@/components/sections/contact/copy-email-button'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Button } from '@/components/ui/button'
import type { contactFormCopy } from '@/content/contact'

export type SubmissionErrorCode = ContactActionErrorCode | 'unexpected'

type ErrorCopy = (typeof contactFormCopy)['errors']

const errorMessageKey: Record<SubmissionErrorCode, keyof ErrorCopy> = {
  validation: 'validation',
  'rate-limited': 'rateLimited',
  unavailable: 'unavailable',
  'delivery-failed': 'deliveryFailed',
  rejected: 'rejected',
  unexpected: 'unexpected',
}

/** Falhas momentâneas: vale oferecer uma nova tentativa. */
const RETRYABLE_ERRORS = new Set<SubmissionErrorCode>(['delivery-failed', 'unexpected'])

interface SubmissionErrorProps {
  code: SubmissionErrorCode
  copy: ErrorCopy
  whatsappHref: string
  /** null enquanto não houver e-mail real: a alternativa por e-mail some. */
  email: string | null
  /** Link mailto com assunto e a mensagem já preenchidos. */
  emailHref?: string
  onRetry: () => void
  retrying: boolean
}

/** Erro honesto, com nova tentativa (quando faz sentido) e caminhos alternativos. */
export function SubmissionError({
  code,
  copy,
  whatsappHref,
  email,
  emailHref,
  onRetry,
  retrying,
}: SubmissionErrorProps) {
  const message = copy[errorMessageKey[code]]
  const showAlternatives = code !== 'validation'

  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-xl border border-danger/40 bg-danger/10 p-5"
    >
      <div className="flex gap-3">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-foreground">{copy.title}</p>
          <p className="text-sm text-quote">{message}</p>
        </div>
      </div>
      {showAlternatives ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {RETRYABLE_ERRORS.has(code) ? (
            <Button type="button" variant="outline" onClick={onRetry} disabled={retrying}>
              <RotateCcw aria-hidden="true" />
              {copy.retryCta}
            </Button>
          ) : null}
          <WhatsAppButton
            href={whatsappHref}
            source="formulario-erro"
            label={copy.whatsappCta}
            variant="whatsapp"
          />
        </div>
      ) : null}
      {/* O endereço fica escrito: o link mailto só abre algo quando o aparelho tem
          um programa de e-mail configurado (quem usa o Gmail no navegador não tem). */}
      {showAlternatives && email ? (
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-quote">
          <Mail aria-hidden="true" className="size-4 text-subtle" />
          {copy.emailPrompt}
          <a
            href={emailHref ?? `mailto:${email}`}
            className="inline-flex min-h-11 items-center font-medium text-foreground underline underline-offset-4"
          >
            {email}
          </a>
          <CopyEmailButton
            email={email}
            copy={{
              label: copy.copyEmail,
              success: copy.emailCopied,
              failure: copy.emailCopyFailed,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

interface SubmissionSuccessProps {
  copy: {
    title: string
    description: string
    whatsappCta: string
    resetCta: string
  }
  whatsappHref: string
  onReset: () => void
}

/** Substitui o formulário após um envio confirmado. */
export function SubmissionSuccess({ copy, whatsappHref, onReset }: SubmissionSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Leva o foco para a confirmação, para que leitores de tela a anunciem.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col items-start gap-5 rounded-card border border-success/35 bg-success/8 p-6 sm:p-8">
      <CircleCheck aria-hidden="true" className="size-8 text-success" />
      <div className="flex flex-col gap-2">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-h3 font-semibold text-foreground font-stretch-semi outline-none"
        >
          {copy.title}
        </h3>
        <p className="text-body">{copy.description}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <WhatsAppButton
          href={whatsappHref}
          source="formulario-sucesso"
          label={copy.whatsappCta}
          variant="whatsapp"
        />
        <Button type="button" variant="ghost" onClick={onReset}>
          {copy.resetCta}
        </Button>
      </div>
    </div>
  )
}
