import VendorSpotlightCard from '@/components/reactbits/vendor/SpotlightCard'

import type { ComponentProps } from 'react'

/** Ajustes do efeito, iguais em todos os cards do site. */
const SPOTLIGHT = {
  intensity: 0.11,
  spotlightSize: 300,
  softness: 0.8,
  borderGlow: 0.65,
  /** Distância (px) em que a luz começa a "vazar" para cards vizinhos. */
  proximity: 48,
}

/**
 * Card com luz que acompanha o cursor (React Bits — SpotlightCard), usado do
 * mesmo jeito em todos os cards.
 *
 * - Sem JavaScript: o card aparece estático, com fundo e borda do tema.
 * - Em telas de toque: a luz aparece no ponto tocado, como retorno ao toque.
 * - Com movimento reduzido: a luz acompanha o cursor sem suavização animada.
 */
export function SpotlightCard({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <VendorSpotlightCard
      intensity={SPOTLIGHT.intensity}
      spotlightSize={SPOTLIGHT.spotlightSize}
      softness={SPOTLIGHT.softness}
      borderGlow={SPOTLIGHT.borderGlow}
      proximity={SPOTLIGHT.proximity}
      className={className}
      {...props}
    >
      {children}
    </VendorSpotlightCard>
  )
}
