import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CTAButton } from '@/components/shared/cta-button'
import { Reveal } from '@/components/shared/reveal'
import { Container } from '@/components/shared/section'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import type { caseStudyCopy } from '@/content/case-study'
import type { Project, ProjectTypeId } from '@/types/content'

interface CaseStudyCtaProps {
  copy: (typeof caseStudyCopy)['cta']
  projectType: ProjectTypeId
  whatsappHref: string
}

/** Convite final para pedir um orçamento parecido. */
export function CaseStudyCta({ copy, projectType, whatsappHref }: CaseStudyCtaProps) {
  return (
    <section aria-labelledby="cta-titulo" className="py-12 sm:py-16">
      <Container>
        <Reveal className="relative isolate flex flex-col gap-8 overflow-hidden rounded-card border border-line bg-bg2 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_0%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)]"
          />
          <div className="flex max-w-xl flex-col gap-4">
            <h2
              id="cta-titulo"
              className="font-display text-h2 font-semibold text-foreground font-stretch-display"
            >
              {copy.title}
            </h2>
            <p className="text-lead text-body">{copy.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton
              source="estudo-de-caso"
              label={copy.quote}
              projectType={projectType}
              size="lg"
            />
            <WhatsAppButton
              href={whatsappHref}
              source="estudo-de-caso"
              label={copy.whatsapp}
              size="lg"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

interface NextProjectNavProps {
  next?: Project
  allProjectsHref: string
  copy: { nextProject: string; portfolioLabel: string; allProjects: string }
}

/** Navegação para o próximo estudo de caso (ou de volta ao portfólio). */
export function NextProjectNav({ next, allProjectsHref, copy }: NextProjectNavProps) {
  return (
    <nav aria-label={next ? copy.nextProject : copy.portfolioLabel} className="pt-4 pb-section">
      <Container>
        <Link
          href={next ? `/projetos/${next.slug}` : allProjectsHref}
          prefetch={next ? true : undefined}
          className="group flex items-center justify-between gap-6 border-t border-line pt-8"
        >
          <span className="flex flex-col gap-2">
            <span className="group-label text-subtle">
              {next ? copy.nextProject : copy.portfolioLabel}
            </span>
            <span className="font-display text-h3 font-semibold text-foreground font-stretch-semi transition-colors group-hover:text-accent sm:text-title">
              {next ? next.name : copy.allProjects}
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-6 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </nav>
  )
}
