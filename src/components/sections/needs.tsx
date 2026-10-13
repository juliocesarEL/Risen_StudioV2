import { CornerDownRight } from 'lucide-react'

import { SpotlightCard } from '@/components/reactbits/spotlight-card'
import { CTAButton } from '@/components/shared/cta-button'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import type { needsSection } from '@/content/sections'
import type { Need } from '@/types/content'

export interface NeedWithLink extends Need {
  whatsappHref: string
}

interface NeedsProps {
  id: string
  copy: typeof needsSection
  needs: NeedWithLink[]
}

export function Needs({ id, copy, needs }: NeedsProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {needs.map((need, index) => (
            <li key={need.id}>
              <Reveal delay={index * REVEAL_STAGGER} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="font-display text-title font-semibold text-quote font-stretch-semi">
                    {need.statement}
                  </h3>

                  <div className="mt-6 flex flex-col gap-1.5">
                    <p className="eyebrow text-subtle">{copy.solutionLabel}</p>
                    <p className="flex items-center gap-2 font-medium text-foreground">
                      <CornerDownRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
                      {need.solution}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
                    <CTAButton
                      source="necessidade"
                      label={copy.quoteCta}
                      projectType={need.projectType}
                    />
                    <WhatsAppButton
                      href={need.whatsappHref}
                      source="necessidade"
                      label={copy.whatsappCta}
                    />
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
