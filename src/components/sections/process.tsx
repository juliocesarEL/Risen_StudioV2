import { ProcessTimeline } from '@/components/sections/process/process-timeline'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { processSection } from '@/content/sections'
import type { ProcessStep } from '@/types/content'

import type { CSSProperties } from 'react'

interface ProcessProps {
  id: string
  copy: typeof processSection
  steps: ProcessStep[]
}

const formatStepNumber = (index: number) => String(index + 1).padStart(2, '0')

/**
 * Linha do tempo: vertical no celular e no tablet, horizontal a partir do
 * desktop. Os pontos se interligam em sequência ao entrar na tela (process.css).
 */
export function Process({ id, copy, steps }: ProcessProps) {
  const titleId = `${id}-titulo`
  const lastIndex = steps.length - 1

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />

        <ProcessTimeline
          className="mt-12 sm:mt-16"
          style={{ '--steps': steps.length } as CSSProperties}
        >
          {/* O espaçamento vem de process.css (--gap-y/--gap-x): a ligação entre os pontos depende dele. */}
          <ol className="grid gap-(--gap-y) lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-(--gap-x)">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="process-step"
                style={{ '--i': index } as CSSProperties}
              >
                <span aria-hidden="true" className="process-node">
                  <span className="process-node-core" />
                </span>
                {index < lastIndex ? (
                  <span aria-hidden="true" className="process-link">
                    <span className="process-link-fill" />
                    <span className="process-link-head" />
                  </span>
                ) : null}
                <div className="process-content grid content-start gap-3">
                  <p className="font-mono text-xs text-accent">
                    <span className="sr-only">{copy.stepLabel} </span>
                    {formatStepNumber(index)}
                  </p>
                  <h3 className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
                    {step.title}
                  </h3>
                  <p className="text-body">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </ProcessTimeline>
      </Container>
    </Section>
  )
}
