import { cn } from '@/lib/utils'

/**
 * Trilho da linha do tempo que se "desenha" ao entrar na tela (data-reveal="draw",
 * animado pelo RevealController). Escalar a partir do canto superior esquerdo
 * funciona nas duas orientações: no trilho vertical (celular) cresce a altura;
 * no horizontal (desktop), a largura.
 */
export function TimelineRail({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-reveal="draw"
      className={cn('pointer-events-none absolute origin-top-left', className)}
    />
  )
}
