import { Check } from 'lucide-react'

import { SpotlightCard } from '@/components/reactbits/spotlight-card'
import { WorkbenchPreview } from '@/components/sections/hero/workbench-preview'
import { CTAButton } from '@/components/shared/cta-button'
import { HoloFoil, HoloTilt } from '@/components/shared/holo-tilt'
import type { Service, ServiceCategoryId, WorkbenchTabId } from '@/types/content'

interface ServiceCardProps {
  service: Service
  labels: { benefitsTitle: string; examplesTitle: string }
}

/** Cada frente mostra o mesmo artefato que a bancada do hero monta para ela. */
const previewByService: Record<ServiceCategoryId, WorkbenchTabId> = {
  sites: 'site',
  sistemas: 'sistema',
  integracoes: 'integracao',
}

/** Sem cronograma: no card, o artefato aparece já montado. */
const NO_TIMING = {}

const listFormat = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })

/** Depois de "Exemplos:", uma frase só: "sites institucionais, landing pages e portfólios profissionais." */
function formatExamples(labels: string[]): string {
  const lowered = labels.map((label) => label.charAt(0).toLocaleLowerCase('pt-BR') + label.slice(1))
  return `${listFormat.format(lowered)}.`
}

export function ServiceCard({ service, labels }: ServiceCardProps) {
  const titleId = `servico-${service.id}`
  const examples = service.examples.filter((example) => example.enabled !== false)

  return (
    <HoloTilt className="h-full">
      <SpotlightCard className="flex h-full flex-col overflow-hidden">
        {/* Altura fixa e base esmaecida: o artefato "afunda" no card em vez de ditar a altura dele. */}
        <div
          aria-hidden="true"
          className="h-48 border-b border-line bg-background bg-[radial-gradient(120%_80%_at_0%_0%,color-mix(in_srgb,var(--field-blue)_30%,transparent),transparent_60%),radial-gradient(120%_90%_at_100%_100%,color-mix(in_srgb,var(--field-violet)_45%,transparent),transparent_60%)] px-5 pt-5"
        >
          <div className="h-full overflow-hidden mask-b-from-65%">
            <WorkbenchPreview tab={previewByService[service.id]} builds={NO_TIMING} />
          </div>
        </div>

        <article aria-labelledby={titleId} className="flex flex-1 flex-col p-6">
          <h3
            id={titleId}
            className="font-display text-h3 font-semibold text-foreground font-stretch-semi"
          >
            {service.title}
          </h3>
          <p className="mt-2.5 text-body">{service.description}</p>

          {/* Os marcadores já dizem o que é a lista; o rótulo fica para leitores de tela. */}
          <h4 className="sr-only">{labels.benefitsTitle}</h4>
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2.5 text-quote">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-subtle">
            <span className="font-semibold">{labels.examplesTitle}:</span>{' '}
            {formatExamples(examples.map((example) => example.label))}
          </p>

          <div className="mt-auto pt-6">
            <CTAButton
              source="servico"
              label={service.cta.label}
              projectType={service.cta.projectType}
              variant="outline"
              // Rótulos longos quebram linha em telas estreitas (320px) em vez de alargar o card.
              className="h-auto min-h-11 w-full py-2.5 text-center whitespace-normal sm:w-auto"
            />
          </div>
        </article>
        <HoloFoil />
      </SpotlightCard>
    </HoloTilt>
  )
}
