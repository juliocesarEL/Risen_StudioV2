import { ArrowDown } from 'lucide-react'

import { GradientText } from '@/components/reactbits/gradient-text'
import { HeroScene } from '@/components/reactbits/hero-scene'
import { CTAButton, CTALink } from '@/components/shared/cta-button'
import { Container } from '@/components/shared/section'
import { Eyebrow } from '@/components/shared/section-heading'
import type { heroContent } from '@/content/sections'

interface HeroProps {
  id: string
  content: typeof heroContent
  /** Âncora da seção de projetos (CTA secundário). */
  projectsHref: string
  /** Frentes de trabalho exibidas na base do hero. */
  highlights: string[]
}

export function Hero({ id, content, projectsHref, highlights }: HeroProps) {
  const titleId = `${id}-titulo`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <HeroScene className="-z-10" />
      {/* Esmaece o fundo atrás do texto e na transição para a próxima seção. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--bg)_0%,color-mix(in_srgb,var(--bg)_70%,transparent)_38%,transparent_70%),linear-gradient(0deg,var(--bg)_0%,transparent_28%)]"
      />

      <Container className="flex flex-1 flex-col justify-center gap-7 pt-[calc(var(--nav-height)+3rem)] pb-12 sm:gap-8">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h1
          id={titleId}
          className="max-w-[7.4em] font-display text-display font-bold font-stretch-display"
        >
          {content.title.lead} <GradientText>{content.title.highlight}</GradientText>
        </h1>
        <p className="max-w-xl text-lead text-body">{content.subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CTAButton source="hero" label={content.primaryCta} size="lg" />
          <CTALink source="hero" label={content.secondaryCta} href={projectsHref} size="lg" />
        </div>
        <p className="text-sm text-subtle">{content.locationNote}</p>
      </Container>

      <Container className="pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-6 border-t border-line/70 pt-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="eyebrow text-body">
                {highlight}
              </li>
            ))}
          </ul>
          <ArrowDown aria-hidden="true" className="hidden size-4 shrink-0 text-subtle sm:block" />
        </div>
      </Container>
    </section>
  )
}
