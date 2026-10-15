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
  /**
   * "split" (padrão): título à esquerda e descrição à direita, para seções de
   * largura total. "stacked": um sob o outro, para cabeçalhos numa coluna lateral.
   */
  layout?: 'split' | 'stacked'
  /** Conteúdo extra abaixo da descrição (ex.: um link). */
  children?: ReactNode
}

/**
 * Título de seção. Ele entra "se alargando" (data-reveal="title"), como as
 * letras largas do logotipo; a descrição chega logo depois. No layout "split",
 * uma linha fina fecha o cabeçalho, com um trecho do gradiente do R que se desenha.
 */
export function SectionHeading({
  copy,
  titleId,
  className,
  focusTarget = false,
  layout = 'split',
  children,
}: SectionHeadingProps) {
  const split = layout === 'split'
  const hasDetails = Boolean(copy.description || children)

  return (
    <header
      className={cn(
        split
          ? 'relative grid gap-5 border-b border-line pb-10 sm:pb-12 lg:grid-cols-12 lg:items-end lg:gap-12'
          : 'flex max-w-3xl flex-col gap-5',
        className,
      )}
    >
      <h2
        id={titleId}
        tabIndex={focusTarget ? -1 : undefined}
        data-quote-focus={focusTarget ? '' : undefined}
        data-reveal="title"
        className={cn(
          'font-display text-h2 font-semibold text-foreground font-stretch-display',
          split && 'lg:col-span-7',
        )}
      >
        {copy.title}
      </h2>
      {hasDetails ? (
        <Reveal
          delay={0.12}
          className={cn('flex flex-col gap-5', split && 'lg:col-span-5 lg:pb-1.5')}
        >
          {copy.description ? (
            <p className="max-w-2xl text-lead text-body">{copy.description}</p>
          ) : null}
          {children}
        </Reveal>
      ) : null}
      {split ? (
        <span
          aria-hidden="true"
          data-reveal="draw"
          className="absolute -bottom-px left-0 h-px w-24 origin-left bg-gradient-primary"
        />
      ) : null}
    </header>
  )
}
