import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

interface SectionProps extends ComponentProps<'section'> {
  id: string
  /** id do título da seção, para nomear a região para leitores de tela. */
  labelledBy: string
}

/** Seção da página com espaçamento vertical padrão. */
export function Section({ id, labelledBy, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative py-section', className)}
      {...props}
    >
      {children}
    </section>
  )
}

/** Largura máxima centralizada, com respiro lateral que cresce com a tela. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('container-page', className)} {...props} />
}
