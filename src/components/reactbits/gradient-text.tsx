import VendorGradientText from '@/components/reactbits/vendor/GradientText'

import type { ReactNode } from 'react'

/** Cores do token --gradient-text (globals.css). */
const GRADIENT_TEXT_COLORS = [
  'var(--gradient-text-from)',
  'var(--gradient-text-via)',
  'var(--gradient-text-to)',
]

/** Duração de um ciclo da varredura do gradiente, em segundos. */
const SWEEP_SECONDS = 9

/**
 * Texto com o gradiente da marca em movimento lento (React Bits — GradientText).
 *
 * - Sem JavaScript, ou antes de carregar: o gradiente aparece estático (estilo
 *   inline renderizado no servidor), então o texto nunca fica invisível.
 * - Com movimento reduzido, o componente desenha um quadro e não anima.
 * - Fora da tela, a animação pausa.
 */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <VendorGradientText
      colors={GRADIENT_TEXT_COLORS}
      animationSpeed={SWEEP_SECONDS}
      scale={2}
      className={className}
    >
      {children}
    </VendorGradientText>
  )
}
