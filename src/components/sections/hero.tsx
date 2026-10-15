import { MapPin } from 'lucide-react'

import { GradientText } from '@/components/reactbits/gradient-text'
import { HeroScene } from '@/components/reactbits/hero-scene'
import { Workbench } from '@/components/sections/hero/workbench'
import { CTAButton, CTALink } from '@/components/shared/cta-button'
import { Container } from '@/components/shared/section'
import type { heroContent } from '@/content/sections'

interface HeroProps {
  id: string
  content: typeof heroContent
  /** Âncora da seção de projetos (CTA secundário). */
  projectsHref: string
}

/**
 * Hero: o título largo (como o logotipo) abre a página; abaixo, a proposta e
 * os CTAs ao lado da bancada ao vivo, onde um projeto se constrói. Em telas
 * largas, a bancada sobe até a última linha do título, a mais curta, e as
 * duas peças se encaixam em diagonal.
 */
export function Hero({ id, content, projectsHref }: HeroProps) {
  const titleId = `${id}-titulo`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <HeroScene className="-z-10" />
      {/* Campos de cor da marca nos cantos (como na imagem oficial) e esmaecimento na base. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_0%_0%,color-mix(in_srgb,var(--field-blue)_32%,transparent),transparent_70%),radial-gradient(50%_45%_at_100%_100%,color-mix(in_srgb,var(--field-violet)_38%,transparent),transparent_70%),linear-gradient(0deg,var(--bg)_0%,transparent_22%)]"
      />

      <Container className="flex flex-1 flex-col justify-center pt-[calc(var(--nav-height)+2.5rem)] pb-16 lg:pb-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          <h1
            id={titleId}
            className="max-w-[14em] font-display text-display font-bold font-stretch-display lg:col-span-12"
          >
            {content.title.lead} <GradientText>{content.title.highlight}</GradientText>
          </h1>

          {/* min-w-0: a coluna não alarga para caber o código do editor. */}
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-5 lg:pt-2">
            <p className="max-w-xl text-lead text-body">{content.subtitle}</p>
            {/* Lado a lado no celular grande e a partir de 1280px; empilhados de propósito
                entre 1024 e 1279px, onde a coluna é estreita demais para os dois. */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-start xl:flex-row xl:flex-nowrap">
              <CTAButton source="hero" label={content.primaryCta} size="lg" className="px-5" />
              <CTALink
                source="hero"
                label={content.secondaryCta}
                href={projectsHref}
                size="lg"
                className="px-5"
              />
            </div>
            <p className="flex items-start gap-2 text-sm text-subtle">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              {content.locationNote}
            </p>
          </div>

          {/* A partir de 1280px: colunas 7–12, subindo uma linha do título mais o espaço
              entre as linhas da grade. A última linha do título termina antes da coluna 7. */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-6 xl:col-start-7 xl:mt-[calc(-0.88*var(--font-size-display)-2.5rem)]">
            <Workbench />
          </div>
        </div>
      </Container>
    </section>
  )
}
