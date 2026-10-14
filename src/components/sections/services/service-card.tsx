import { Check } from 'lucide-react'

import { CTAButton } from '@/components/shared/cta-button'
import { Icon } from '@/components/shared/icon'
import type { Service } from '@/types/content'

interface ServiceCardProps {
  service: Service
  labels: { benefitsTitle: string; examplesTitle: string }
}

/** Um painel de serviço: o traço do gradiente do R se desenha no topo ao entrar. */
export function ServiceCard({ service, labels }: ServiceCardProps) {
  const titleId = `servico-${service.id}`
  const examples = service.examples.filter((example) => example.enabled !== false)

  return (
    <article aria-labelledby={titleId} className="relative flex w-full flex-col p-6 sm:p-8 lg:p-10">
      <span
        aria-hidden="true"
        data-reveal="draw"
        className="absolute inset-x-6 top-0 h-0.5 origin-left bg-gradient-primary sm:inset-x-8 lg:inset-x-10"
      />

      <Icon name={service.icon} className="mb-8 size-7 text-accent" />

      <h3
        id={titleId}
        className="font-display text-h3 font-semibold text-foreground font-stretch-semi"
      >
        {service.title}
      </h3>
      <p className="mt-3 text-body">{service.description}</p>

      <h4 className="mt-8 group-label text-subtle">{labels.benefitsTitle}</h4>
      <ul className="mt-3 flex flex-col gap-2.5">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-quote">
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <h4 className="mt-8 group-label text-subtle">{labels.examplesTitle}</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {examples.map((example) => (
          <li
            key={example.label}
            className="rounded-pill border border-line bg-chip px-3 py-1 text-sm text-quote"
          >
            {example.label}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <CTAButton
          source="servico"
          label={service.cta.label}
          projectType={service.cta.projectType}
          variant="outline"
          // Rótulos longos quebram linha em telas estreitas (320px) em vez de alargar o painel.
          className="h-auto min-h-11 w-full py-2.5 text-center whitespace-normal sm:w-auto"
        />
      </div>
    </article>
  )
}
