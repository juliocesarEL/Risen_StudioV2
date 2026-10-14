'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Send } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form'

import {
  ContactFields,
  type ContactFieldsProps,
} from '@/components/sections/contact/contact-fields'
import { SubmissionError, SubmissionSuccess } from '@/components/sections/contact/form-status'
import { useContactSubmission } from '@/components/sections/contact/use-contact-submission'
import { useEarlyInput } from '@/components/sections/contact/use-early-input'
import { useQuotePreselection } from '@/components/sections/contact/use-quote-preselection'
import { Button } from '@/components/ui/button'
import { type ContactFormData, type ContactFormValues, contactSchema } from '@/lib/schemas/contact'

export interface ContactFormProps extends ContactFieldsProps {
  email: string | null
  whatsappHrefs: { afterSubmit: string; afterError: string }
  /** id do título da seção (nomeia o formulário para leitores de tela). */
  labelledBy: string
  /** Chamado quando o formulário fica interativo (código carregado e hidratado). */
  onReady?: () => void
}

const defaultValues: DefaultValues<ContactFormValues> = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: undefined,
  budget: undefined,
  message: '',
  consent: false,
  website: '',
}

/**
 * Formulário de orçamento: valida em tempo real (mesmo schema do servidor),
 * envia pela Server Action e mostra o resultado real do envio, nunca simulado.
 */
export function ContactForm({
  email,
  whatsappHrefs,
  labelledBy,
  onReady,
  ...fieldsProps
}: ContactFormProps) {
  const { copy, projectTypes } = fieldsProps
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<ContactFormValues, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues,
  })
  const { isSubmitting, isSubmitted } = form.formState
  const { status, setStatus, submit } = useContactSubmission(form, defaultValues)

  useEarlyInput(formRef, form)

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useQuotePreselection(
    projectTypes.map((type) => type.id),
    (projectType) => {
      setStatus((current) => (current.kind === 'success' ? { kind: 'editing' } : current))
      form.setValue('projectType', projectType as ContactFormValues['projectType'], {
        shouldDirty: true,
        shouldValidate: isSubmitted,
      })
    },
  )

  const handleSubmit = form.handleSubmit(submit)

  if (status.kind === 'success') {
    return (
      <SubmissionSuccess
        copy={copy.success}
        whatsappHref={whatsappHrefs.afterSubmit}
        onReset={() => setStatus({ kind: 'editing' })}
      />
    )
  }

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        noValidate
        aria-labelledby={labelledBy}
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-6"
      >
        <ContactFields {...fieldsProps} />

        {status.kind === 'error' ? (
          <SubmissionError
            code={status.code}
            copy={copy.errors}
            whatsappHref={whatsappHrefs.afterError}
            email={email}
            onRetry={() => void handleSubmit()}
            retrying={isSubmitting}
          />
        ) : null}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:self-start"
        >
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {isSubmitting ? copy.submit.pending : copy.submit.idle}
        </Button>
      </form>
    </FormProvider>
  )
}
