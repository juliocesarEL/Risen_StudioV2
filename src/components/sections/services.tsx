import { ServiceCard } from '@/components/sections/services/service-card'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { servicesSection } from '@/content/sections'
import type { Service } from '@/types/content'

interface ServicesProps {
  id: string
  copy: typeof servicesSection
  services: Service[]
}

/**
 * As três frentes com o mesmo peso. Cada card abre com o artefato que a
 * bancada do hero monta para aquela frente (página, painel, integração).
 */
export function Services({ id, copy, services }: ServicesProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />
        <ul className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * REVEAL_STAGGER} className="h-full">
                <ServiceCard
                  service={service}
                  labels={{
                    benefitsTitle: copy.benefitsTitle,
                    examplesTitle: copy.examplesTitle,
                  }}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
