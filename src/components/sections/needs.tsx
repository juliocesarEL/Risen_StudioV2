import { type NeedWithLink, NeedsChat } from '@/components/sections/needs/needs-chat'
import { Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { needsSection } from '@/content/sections'

interface NeedsProps {
  id: string
  copy: typeof needsSection
  needs: NeedWithLink[]
}

/** "Qual é o seu momento?": a pessoa escolhe a situação e a conversa começa (needs-chat.tsx). */
export function Needs({ id, copy, needs }: NeedsProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />
        <Reveal className="mt-12 sm:mt-16">
          <NeedsChat needs={needs} copy={copy} />
        </Reveal>
      </Container>
    </Section>
  )
}
