import { ArrowUpRight, MapPin } from 'lucide-react'

import { hideWhatsAppFloatProps } from '@/components/layout/layout-markers'
import { SpotlightCard } from '@/components/reactbits/spotlight-card'
import { CopyEmailButton } from '@/components/sections/contact/copy-email-button'
import { DeferredContactForm } from '@/components/sections/contact/deferred-contact-form'
import { Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import type { contactFormCopy, contactSection } from '@/content/contact'
import type { SocialLink } from '@/types/content'

interface ContactProps {
  id: string
  copy: typeof contactSection
  formCopy: typeof contactFormCopy
  projectTypes: { id: string; label: string }[]
  budgetRanges: { id: string; label: string }[]
  privacyHref: string
  newTabHint: string
  email: string
  social: SocialLink[]
  location: { title: string; description: string }
  whatsappHrefs: { section: string; afterSubmit: string; afterError: string }
}

export function Contact({
  id,
  copy,
  formCopy,
  projectTypes,
  budgetRanges,
  privacyHref,
  newTabHint,
  email,
  social,
  location,
  whatsappHrefs,
}: ContactProps) {
  const titleId = `${id}-titulo`
  const { directContact } = copy

  return (
    <Section id={id} labelledBy={titleId} {...hideWhatsAppFloatProps}>
      <Container className="flex flex-col gap-12 sm:gap-16">
        <SectionHeading copy={copy.heading} titleId={titleId} focusTarget />

        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <DeferredContactForm
              copy={formCopy}
              projectTypes={projectTypes}
              budgetRanges={budgetRanges}
              privacyHref={privacyHref}
              newTabHint={newTabHint}
              email={email}
              whatsappHrefs={whatsappHrefs}
              labelledBy={titleId}
            />
          </div>

          <aside aria-labelledby={`${id}-direto`} className="lg:col-span-5">
            <SpotlightCard className="flex flex-col gap-7 p-6 sm:p-8 lg:sticky lg:top-28">
              <div className="flex flex-col gap-2">
                <h3
                  id={`${id}-direto`}
                  className="font-display text-h3 font-semibold text-foreground font-stretch-semi"
                >
                  {directContact.title}
                </h3>
                <p className="text-body">{directContact.description}</p>
              </div>

              <WhatsAppButton
                href={whatsappHrefs.section}
                source="contato"
                label={directContact.whatsappCta}
                variant="whatsapp"
                size="lg"
                className="w-full"
              />

              <div className="flex flex-col gap-2">
                <p className="eyebrow text-subtle">{directContact.emailLabel}</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex min-h-11 min-w-0 items-center truncate text-foreground underline-offset-4 hover:underline"
                  >
                    {email}
                  </a>
                  <CopyEmailButton
                    email={email}
                    copy={{
                      label: directContact.copyEmail,
                      success: directContact.emailCopied,
                      failure: directContact.emailCopyFailed,
                    }}
                  />
                </div>
              </div>

              {social.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <p className="eyebrow text-subtle">{directContact.socialTitle}</p>
                  <ul className="flex flex-wrap gap-x-5">
                    {social.map((network) => (
                      <li key={network.url}>
                        <a
                          href={network.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 text-body transition-colors hover:text-foreground"
                        >
                          {network.label}
                          <ArrowUpRight aria-hidden="true" className="size-4 text-subtle" />
                          <span className="sr-only"> {newTabHint}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex gap-3 border-t border-line pt-6">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-foreground">{location.title}</p>
                  <p className="text-sm">{location.description}</p>
                </div>
              </div>
            </SpotlightCard>
          </aside>
        </Reveal>
      </Container>
    </Section>
  )
}
