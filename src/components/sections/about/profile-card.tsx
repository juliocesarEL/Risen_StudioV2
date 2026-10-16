import { MapPin } from 'lucide-react'
import Image from 'next/image'

import '@/components/sections/about/profile-card.css'
import { CTAButton } from '@/components/shared/cta-button'
import { HoloTilt } from '@/components/shared/holo-tilt'
import { brandMark } from '@/lib/brand-mark'
import { cn } from '@/lib/utils'
import type { Founder } from '@/types/content'

import type { CSSProperties } from 'react'

/** Um R da marca com folga em volta, para servir de ladrilho no padrão. */
const TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -110 566 566"><path d="${brandMark.gradientPath}"/><path d="${brandMark.strokePath}"/></svg>`
const tileStyle = {
  '--pcard-tile': `url("data:image/svg+xml,${encodeURIComponent(TILE_SVG)}")`,
} as CSSProperties

interface ProfileCardProps {
  founder: Founder
  location: string
  ctaLabel: string
  className?: string
}

/**
 * Cartão de perfil do fundador (inspirado no Profile Card do React Bits):
 * inclina com o cursor e a película holográfica brilha através do padrão de
 * R atrás da foto. No toque e com movimento reduzido, fica parado.
 */
export function ProfileCard({ founder, location, ctaLabel, className }: ProfileCardProps) {
  return (
    <HoloTilt className={cn('w-full', className)}>
      <figure className="pcard" style={tileStyle}>
        <div className="pcard-portrait">
          <Image
            src={founder.photo.src}
            alt={founder.photo.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 100vw"
            className="object-cover"
          />
          <span aria-hidden="true" className="pcard-tiles" />
          <span aria-hidden="true" className="pcard-shade" />
          <figcaption className="absolute inset-x-0 bottom-0 z-2 flex flex-col gap-1 p-5 sm:p-6">
            <span className="font-display text-h3 font-semibold text-foreground font-stretch-semi">
              {founder.name}
            </span>
            <span className="text-sm text-quote">{founder.role}</span>
          </figcaption>
        </div>

        <div className="flex items-center justify-between gap-4 px-3 pt-3.5 pb-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-semibold text-foreground">{founder.handle}</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
              <MapPin aria-hidden="true" className="size-3.5 text-accent" />
              {location}
            </span>
          </div>
          <CTAButton
            source="sobre"
            label={ctaLabel}
            variant="outline"
            size="sm"
            className="relative z-10 shrink-0"
          />
        </div>

        <span aria-hidden="true" className="holo-glitter" />
      </figure>
    </HoloTilt>
  )
}
