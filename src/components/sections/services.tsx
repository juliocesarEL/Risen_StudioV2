import { SpotlightCard } from '@/components/reactbits/spotlight-card'
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
 * As três frentes com o mesmo peso, como painéis de um mesmo editor dividido:
 * um único contêiner, separado por linhas finas, com a luz do SpotlightCard
 * passando por todos eles.
 */
export function Services({ id, copy, services }: ServicesProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />
        <SpotlightCard className="mt-12 sm:mt-16">
          <ul className="grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {services.map((service, index) => (
              <li key={service.id} className="flex">
                <Reveal delay={index * REVEAL_STAGGER} className="flex w-full">
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
        </SpotlightCard>
      </Container>
    </Section>
  )
}
