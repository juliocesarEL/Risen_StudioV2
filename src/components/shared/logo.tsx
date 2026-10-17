import Link from 'next/link'

import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { brandMark } from '@/lib/brand-mark'
import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

const MARK_GRADIENT_ID = 'risen-mark-gradient'

/**
 * Gradiente do monograma. Renderizado uma única vez no layout para que todas
 * as instâncias do logotipo reutilizem o mesmo id.
 */
export function BrandSvgDefs() {
  const { x1, y1, x2, y2 } = brandMark.gradient

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        <linearGradient
          id={MARK_GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
          <stop offset="0%" style={{ stopColor: 'var(--gradient-primary-from)' }} />
          <stop offset="50%" style={{ stopColor: 'var(--gradient-primary-via)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--gradient-primary-to)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Monograma "R" oficial da Risen: curva em gradiente e perna dividida. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={brandMark.viewBox} aria-hidden="true" className={cn('size-7', className)}>
      <path d={brandMark.gradientPath} fill={`url(#${MARK_GRADIENT_ID})`} />
      <path d={brandMark.strokePath} className="fill-foreground" />
    </svg>
  )
}

/**
 * O R só em contorno, grande e discreto: o mesmo recurso da imagem oficial da
 * marca (og-image), usado como marca d'água em campos de cor.
 */
export function GhostMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={brandMark.viewBox}
      aria-hidden="true"
      className={cn('fill-none stroke-current', className)}
      // O traço acompanha o tamanho do desenho (346 unidades): ~1px numa marca de 18rem.
      strokeWidth={1.25}
      vectorEffect="non-scaling-stroke"
    >
      <path d={brandMark.gradientPath} vectorEffect="non-scaling-stroke" />
      <path d={brandMark.strokePath} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Logotipo completo com link para a página inicial. */
/**
 * Aceita as props de um link (exceto o destino), para poder fechar o menu ao navegar.
 * `compact`: em celulares estreitos (até 399px), mostra só "RISEN", para a
 * barra de navegação caber inteira.
 */
export function Logo({
  className,
  compact = false,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { compact?: boolean }) {
  const [firstWord, ...rest] = siteConfig.name.split(' ')

  return (
    <Link
      href="/"
      aria-label={uiCopy.homeLink}
      {...props}
      className={cn(
        'group inline-flex min-h-11 items-center gap-3 rounded-md text-foreground',
        className,
      )}
    >
      <LogoMark className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
      <span className="flex items-baseline gap-2 font-display leading-none font-stretch-display">
        <span className="text-lg font-semibold tracking-[0.2em] uppercase">{firstWord}</span>
        {rest.length > 0 ? (
          <span
            className={cn(
              'text-xs font-medium tracking-[0.32em] text-subtle uppercase',
              compact && 'max-[24.9375rem]:hidden',
            )}
          >
            {rest.join(' ')}
          </span>
        ) : null}
      </span>
    </Link>
  )
}
