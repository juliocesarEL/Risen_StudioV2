import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  render,
  Section,
  Text,
} from 'react-email'

import { contactEmailCopy as copy } from '@/content/contact'
import type { ContactRequest } from '@/core/contact/domain/contact-request'
import { formatBrazilianPhone, toNationalDigits } from '@/lib/phone'
import { createWhatsAppUrl } from '@/lib/whatsapp'
import { brandColors } from '@/styles/brand-colors'

const MOBILE_PHONE_DIGITS = 11

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

const styles = {
  // E-mails são lidos em clientes claros: fundo claro e texto escuro, a partir da paleta.
  body: {
    backgroundColor: brandColors.text,
    color: brandColors.bg,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  container: { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' },
  accentBar: {
    height: '4px',
    borderRadius: '4px',
    backgroundColor: brandColors.gradientPrimaryVia,
  },
  heading: { fontSize: '22px', lineHeight: '1.3', margin: '24px 0 8px' },
  intro: { fontSize: '15px', color: brandColors.textMuted, margin: '0 0 24px' },
  label: {
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: brandColors.textMuted,
    margin: '16px 0 2px',
  },
  value: { fontSize: '15px', lineHeight: '1.5', margin: '0', whiteSpace: 'pre-wrap' as const },
  link: { color: brandColors.gradientPrimaryVia },
  footer: { fontSize: '13px', color: brandColors.textMuted },
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </>
  )
}

function PhoneValue({ phone }: { phone: string }) {
  const digits = toNationalDigits(phone)
  const isMobile = digits.length === MOBILE_PHONE_DIGITS
  return (
    <>
      <Link href={`tel:+55${digits}`} style={styles.link}>
        {formatBrazilianPhone(digits)}
      </Link>
      {isMobile ? (
        <>
          {' · '}
          <Link href={createWhatsAppUrl(`55${digits}`)} style={styles.link}>
            WhatsApp
          </Link>
        </>
      ) : null}
    </>
  )
}

export function ContactEmail({ request }: { request: ContactRequest }) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{copy.preview(request.name)}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.accentBar} />
          <Heading as="h1" style={styles.heading}>
            {copy.heading}
          </Heading>
          <Text style={styles.intro}>{copy.intro}</Text>

          <Field label={copy.labels.name}>{request.name}</Field>
          <Field label={copy.labels.email}>
            <Link href={`mailto:${request.email}`} style={styles.link}>
              {request.email}
            </Link>
          </Field>
          <Field label={copy.labels.phone}>
            {request.phone ? <PhoneValue phone={request.phone} /> : copy.notInformed}
          </Field>
          <Field label={copy.labels.company}>{request.company ?? copy.notInformed}</Field>
          <Field label={copy.labels.projectType}>{request.projectType.label}</Field>
          <Field label={copy.labels.budget}>{request.budget?.label ?? copy.notInformed}</Field>
          <Field label={copy.labels.message}>{request.message}</Field>
          <Field label={copy.labels.consent}>
            {`${copy.consentGiven} — ${dateFormatter.format(request.consentedAt)}`}
          </Field>
          <Field label={copy.labels.receivedAt}>{dateFormatter.format(request.receivedAt)}</Field>

          <Hr />
          <Text style={styles.footer}>{copy.replyHint}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export interface RenderedContactEmail {
  subject: string
  html: string
  text: string
}

export async function renderContactEmail(request: ContactRequest): Promise<RenderedContactEmail> {
  const email = <ContactEmail request={request} />
  const [html, text] = await Promise.all([render(email), render(email, { plainText: true })])
  return { subject: copy.subject(request.name, request.projectType.label), html, text }
}
