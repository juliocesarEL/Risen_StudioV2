import { ServiceCard } from '@/components/sections/services/service-card'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { servicesSection } from '@/content/sections'
import { cn } from '@/lib/utils'
import type { Service } from '@/types/content'

interface ServicesProps {
  id: string
  copy: typeof servicesSection
  services: Service[]
}

export function Services({ id, copy, services }: ServicesProps) {
  const titleId = `${id}-titulo`
  // No tablet (2 colunas), um último card sozinho ocupa a linha inteira.
  const hasOddCount = services.length % 2 === 1

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />
        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.id}
              className={cn(
                hasOddCount && index === services.length - 1 && 'md:col-span-2 lg:col-span-1',
              )}
            >
              <Reveal delay={index * REVEAL_STAGGER} className="h-full">
                <ServiceCard
                  service={service}
                  labels={{ benefitsTitle: copy.benefitsTitle, examplesTitle: copy.examplesTitle }}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
