import { Check } from 'lucide-react'

import { Reveal } from '@/components/shared/reveal'
import { Container } from '@/components/shared/section'

import type { ReactNode } from 'react'

/** Bloco de conteúdo do estudo de caso, com título e espaçamento padrão. */
export function CaseStudyBlock({
  title,
  titleId,
  children,
}: {
  title: string
  titleId: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={titleId} className="py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col gap-8">
          <h2
            id={titleId}
            className="font-display text-h3 font-semibold text-foreground font-stretch-semi sm:text-title"
          >
            {title}
          </h2>
          {children}
        </Reveal>
      </Container>
    </section>
  )
}

interface OverviewProps {
  problem: string
  solution: string
  copy: { title: string; problem: string; solution: string }
}

/** Resumo rápido (problema e solução) para quem só quer passar os olhos. */
export function CaseStudyOverview({ problem, solution, copy }: OverviewProps) {
  return (
    <section aria-label={copy.title} className="pb-4">
      <Container>
        <Reveal className="grid gap-4 md:grid-cols-2">
          {[
            { label: copy.problem, text: problem },
            { label: copy.solution, text: solution },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-card border border-line bg-ghost p-6 sm:p-8"
            >
              <h2 className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
                {item.label}
              </h2>
              <p className="text-lead text-quote">{item.text}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

export function CaseStudyFeatures({ features, title }: { features: string[]; title: string }) {
  return (
    <CaseStudyBlock title={title} titleId="funcionalidades">
      <ul className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-3 rounded-xl border border-line bg-ghost p-5 text-quote"
          >
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CaseStudyBlock>
  )
}

export function CaseStudyStack({ stack, title }: { stack: string[]; title: string }) {
  return (
    <CaseStudyBlock title={title} titleId="tecnologias">
      <ul className="flex flex-wrap gap-2">
        {stack.map((technology) => (
          <li
            key={technology}
            className="rounded-pill border border-line bg-chip px-4 py-1.5 text-sm text-quote"
          >
            {technology}
          </li>
        ))}
      </ul>
    </CaseStudyBlock>
  )
}
