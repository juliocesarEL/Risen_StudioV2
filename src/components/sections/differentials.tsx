import { Icon } from '@/components/shared/icon'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { differentialsSection } from '@/content/sections'
import type { Differential } from '@/types/content'

interface DifferentialsProps {
  id: string
  copy: typeof differentialsSection
  differentials: Differential[]
}

export function Differentials({ id, copy, differentials }: DifferentialsProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId} className="border-y border-line/60 bg-bg2/40">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            copy={copy.heading}
            titleId={titleId}
            layout="stacked"
            className="lg:sticky lg:top-32"
          />
        </div>

        <ul className="flex flex-col lg:col-span-7">
          {differentials.map((differential, index) => (
            <li
              key={differential.title}
              className="border-t border-line py-7 first:border-t-0 first:pt-0 sm:py-8 lg:first:pt-2"
            >
              <Reveal delay={index * REVEAL_STAGGER} className="flex gap-5 sm:gap-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-2 bg-bg3 text-accent">
                  <Icon name={differential.icon} className="size-5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
                    {differential.title}
                  </h3>
                  <p className="text-body">{differential.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
