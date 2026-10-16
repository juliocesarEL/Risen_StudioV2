import { MapPin } from 'lucide-react'

import { ProfileCard } from '@/components/sections/about/profile-card'
import { Icon } from '@/components/shared/icon'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { TechIcon } from '@/components/shared/tech-icon'
import type { aboutSection } from '@/content/sections'
import type { Founder, TechItem } from '@/types/content'

interface AboutProps {
  id: string
  copy: typeof aboutSection
  founder: Founder
  /** Cidade e estado, para o cartão de perfil. */
  location: string
  technologies: TechItem[]
}

export function About({ id, copy, founder, location, technologies }: AboutProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId} className="border-y border-line/60 bg-bg2/40">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* O cartão acompanha a leitura no desktop (sticky) enquanto o texto ao lado rola. */}
        <Reveal className="lg:col-span-5">
          <ProfileCard
            founder={founder}
            location={location}
            ctaLabel={copy.profileCta}
            className="mx-auto max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-md"
          />
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <SectionHeading copy={copy.heading} titleId={titleId} layout="stacked">
            <div className="flex flex-col gap-4 text-lead">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </SectionHeading>

          <Reveal className="flex flex-col gap-5">
            <h3 className="group-label text-subtle">{copy.workingTitle}</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {copy.workingStyle.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-2 rounded-xl border border-line bg-ghost p-5"
                >
                  <Icon name={item.icon} className="size-5 text-accent" />
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={REVEAL_STAGGER}
            className="flex gap-4 rounded-xl border border-line bg-ghost p-5"
          >
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-foreground">{copy.locationTitle}</h3>
              <p className="text-sm">{copy.locationDescription}</p>
            </div>
          </Reveal>

          <Reveal delay={REVEAL_STAGGER * 2} className="flex flex-col gap-4">
            <h3 className="group-label text-subtle">{copy.technologiesTitle}</h3>
            <ul className="flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <li
                  key={technology.name}
                  className="group flex w-18 flex-col items-center gap-2 text-center text-xs text-subtle"
                >
                  <span className="grid size-14 place-items-center rounded-xl border border-line bg-bg2 transition-[border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-line-2">
                    <TechIcon id={technology.icon} tinted className="size-6" />
                  </span>
                  {technology.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
