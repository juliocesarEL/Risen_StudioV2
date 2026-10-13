import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import type { SectionCopy } from '@/types/content'

import type { ReactNode } from 'react'

/** Rótulo curto em fonte mono, acima de títulos. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-2.5 eyebrow text-subtle', className)}>
      <span aria-hidden="true" className="h-px w-6 bg-gradient-primary" />
      {children}
    </p>
  )
}

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

export function SectionHeading({
  copy,
  titleId,
  className,
  focusTarget = false,
  children,
}: SectionHeadingProps) {
  return (
    // A entrada animada fica dentro do <header> para não quebrar cabeçalhos "sticky".
    <header className={cn('max-w-3xl', className)}>
      <Reveal className="flex flex-col gap-5">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2
          id={titleId}
          tabIndex={focusTarget ? -1 : undefined}
          data-quote-focus={focusTarget ? '' : undefined}
          className="font-display text-h2 font-semibold text-foreground font-stretch-display"
        >
          {copy.title}
        </h2>
        {copy.description ? (
          <p className="max-w-2xl text-lead text-body">{copy.description}</p>
        ) : null}
        {children}
      </Reveal>
    </header>
  )
}
