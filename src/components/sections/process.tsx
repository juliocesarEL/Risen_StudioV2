import { TimelineRail } from '@/components/sections/process/timeline-rail'
import { Reveal } from '@/components/shared/reveal'
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

/** Intervalo entre as etapas na entrada, em segundos (acompanha o desenho do trilho). */
const STEP_STAGGER = 0.15

const formatStepNumber = (index: number) => String(index + 1).padStart(2, '0')

/**
 * Linha do tempo: vertical no celular e no tablet, horizontal a partir do desktop.
 * --steps define as colunas (vem dos dados); --dot é o diâmetro do marcador,
 * e o trilho passa exatamente pelo centro dele.
 */
export function Process({ id, copy, steps }: ProcessProps) {
  const titleId = `${id}-titulo`
  const timelineVars = { '--steps': steps.length, '--dot': '0.9375rem' } as CSSProperties

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />

        <div style={timelineVars} className="relative mt-12 sm:mt-16">
          <TimelineRail className="top-0 bottom-0 left-[calc(var(--dot)/2)] w-px bg-linear-to-b from-accent/70 via-line-2 to-transparent lg:top-[calc(var(--dot)/2)] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-linear-to-r" />

          <ol className="relative grid gap-10 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-6">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal
                  delay={index * STEP_STAGGER}
                  className="relative grid content-start gap-3 pl-10 lg:pt-12 lg:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 left-0 grid size-(--dot) place-items-center rounded-full border border-accent/70 bg-background lg:top-0"
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="font-mono text-xs text-accent">
                    <span className="sr-only">{copy.stepLabel} </span>
                    {formatStepNumber(index)}
                  </p>
                  <h3 className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
                    {step.title}
                  </h3>
                  <p className="text-body">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
