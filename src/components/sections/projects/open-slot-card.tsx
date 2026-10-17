import { Plus } from 'lucide-react'

import { CTAButton } from '@/components/shared/cta-button'
import { GhostMark } from '@/components/shared/logo'
import type { ProjectTypeId } from '@/types/content'

export interface OpenSlotCopy {
  title: string
  description: string
  badge: string
  cta: string
}

interface OpenSlotCardProps {
  copy: OpenSlotCopy
  /** Tipo de projeto já marcado no formulário de orçamento. */
  projectType: ProjectTypeId
}

/**
 * Vaga aberta: um card de projeto "em branco" que completa a grade. Mesmo
 * formato do card de projeto (janela + texto), com borda tracejada e a tela
 * vazia, onde só o R da marca aparece em contorno. O card inteiro leva ao
 * orçamento, com o tipo de projeto já escolhido.
 */
export function OpenSlotCard({ copy, projectType }: OpenSlotCardProps) {
  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-card border border-dashed border-line-2 p-2.5 transition-[border-color,background-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/[0.03] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* A "janela" vazia: mesma proporção da captura dos projetos. */}
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-xl border border-dashed border-line-2 transition-colors duration-300 group-hover:border-accent/40"
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-dashed border-line-2 px-3 sm:h-9 sm:gap-2">
          <span className="size-2.5 rounded-full bg-line-2" />
          <span className="size-2.5 rounded-full bg-line-2" />
          <span className="size-2.5 rounded-full bg-line-2" />
        </div>
        <div className="relative grid aspect-16/10 place-items-center bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_65%)]">
          <GhostMark className="absolute size-40 text-foreground/[0.07] transition-[color,scale] duration-500 ease-out group-hover:scale-105 group-hover:text-accent/25" />
          <span className="relative grid size-12 place-items-center rounded-pill border border-dashed border-line-2 bg-background text-subtle transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
            <Plus className="size-5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2.5 pb-3">
        <p className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
          {copy.title}
        </p>
        <p className="text-body">{copy.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="inline-flex h-6 items-center rounded-pill border border-dashed border-line-2 px-2.5 font-mono text-[0.625rem] tracking-[0.12em] text-subtle uppercase">
            {copy.badge}
          </span>
          {/* O link "estica" sobre o card inteiro, como nos cards de projeto. */}
          <CTAButton
            source="projetos"
            label={copy.cta}
            projectType={projectType}
            variant="link"
            className="h-auto text-sm after:absolute after:inset-0 after:rounded-card after:content-[''] hover:no-underline"
          />
        </div>
      </div>
    </article>
  )
}
