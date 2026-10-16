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
 * Linha do tempo: vertical até 1279px (cinco colunas não cabem antes disso),
 * horizontal a partir daí. As estações numeradas se interligam em sequência ao entrar na tela,
 * e depois da última a linha segue e se esvai, porque o suporte continua
 * (process.css).
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
          <ol className="grid gap-(--gap-y) xl:grid-cols-[repeat(var(--steps),minmax(0,1fr))] xl:gap-x-(--gap-x) xl:gap-y-0">
            {steps.map((step, index) => {
              const isLast = index === lastIndex
              return (
                <li
                  key={step.title}
                  className="process-step"
                  style={{ '--i': index } as CSSProperties}
                >
                  <span aria-hidden="true" className="process-node">
                    {formatStepNumber(index)}
                  </span>
                  {/* Entre as estações, a ligação; depois da última, a linha que segue e se esvai. */}
                  <span
                    aria-hidden="true"
                    className={isLast ? 'process-link process-link-tail' : 'process-link'}
                  >
                    <span className="process-link-fill" />
                    <span className={isLast ? 'process-link-pulse' : 'process-link-head'} />
                  </span>
                  <div className="process-content">
                    {/* Em cinco colunas (xl), um pouco menor para "escopo e proposta" caber numa linha. */}
                    <h3 className="font-display text-h3 font-semibold text-foreground font-stretch-semi xl:text-[1.3125rem]">
                      <span className="sr-only">
                        {copy.stepLabel} {index + 1}:{' '}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-body">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </ProcessTimeline>
      </Container>
    </Section>
  )
}
