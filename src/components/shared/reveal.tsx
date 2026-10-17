import type { ReactNode } from 'react'

/** Intervalo entre itens de uma lista que entram em sequência, em segundos. */
export const REVEAL_STAGGER = 0.08

interface RevealProps {
  children: ReactNode
  className?: string
  /** Atraso em segundos (para itens em sequência). */
  delay?: number
  /**
   * "card": o bloco sobe inclinado em 3D e a imagem dentro dele se revela de
   * cima para baixo (cards de projeto). Padrão: sobe e aparece.
   */
  variant?: 'card'
}

/**
 * Marca um bloco para entrar suavemente ao rolar a página. É só HTML: a
 * animação é feita por um único controlador (RevealController, com Motion),
 * sem custo de hidratação por elemento.
 *
 * O estado inicial (oculto) só vale com JavaScript ativo e sem preferência por
 * movimento reduzido — nos demais casos o conteúdo aparece direto (globals.css).
 */
export function Reveal({ children, className, delay = 0, variant }: RevealProps) {
  return (
    <div
      data-reveal={variant ?? ''}
      data-reveal-delay={delay > 0 ? delay : undefined}
      className={className}
    >
      {children}
    </div>
  )
}
