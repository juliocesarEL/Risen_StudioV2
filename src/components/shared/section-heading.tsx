import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import type { SectionCopy } from '@/types/content'

import type { ReactNode } from 'react'

interface SectionHeadingProps {
  copy: SectionCopy
  /** id aplicado ao título (referenciado pelo aria-labelledby da seção). */
  titleId: string
  className?: string
  /** Permite que o título receba foco ao chegar pela navegação de orçamento. */
  focusTarget?: boolean
  /** Conteúdo extra abaixo da descrição (ex.: um link). */
  children?: ReactNode
}

/**
 * Título de seção. Ele entra "se alargando" (data-reveal="title"), como as
 * letras largas do logotipo; a descrição chega logo depois.
 */
export function SectionHeading({
  copy,
  titleId,
  className,
  focusTarget = false,
  children,
}: SectionHeadingProps) {
  return (
    <header className={cn('flex max-w-3xl flex-col gap-5', className)}>
      <h2
        id={titleId}
        tabIndex={focusTarget ? -1 : undefined}
        data-quote-focus={focusTarget ? '' : undefined}
        data-reveal="title"
        className="font-display text-h2 font-semibold text-foreground font-stretch-display"
      >
        {copy.title}
      </h2>
      {copy.description || children ? (
        <Reveal delay={0.12} className="flex flex-col gap-5">
          {copy.description ? (
            <p className="max-w-2xl text-lead text-body">{copy.description}</p>
          ) : null}
          {children}
        </Reveal>
      ) : null}
    </header>
  )
}
