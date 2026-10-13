import Link from 'next/link'

import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { cn } from '@/lib/utils'

const BRAND_GRADIENT_ID = 'risen-brand-gradient'

/**
 * Gradiente da marca para SVGs. Renderizado uma única vez no layout para que
 * todas as instâncias do logotipo reutilizem o mesmo id.
 */
export function BrandSvgDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        {/* userSpaceOnUse: com objectBoundingBox, o traço vertical (caixa de largura zero) não seria pintado. */}
        <linearGradient
          id={BRAND_GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="32"
          x2="32"
          y2="0"
        >
          <stop offset="0%" style={{ stopColor: 'var(--gradient-primary-from)' }} />
          <stop offset="55%" style={{ stopColor: 'var(--gradient-primary-via)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--gradient-primary-to)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

/**
 * Símbolo provisório: um arco que nasce sobre a linha do horizonte ("risen").
 * Substitua pelo símbolo oficial quando houver.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('size-8', className)}>
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="9.25"
        className="fill-bg2 stroke-line-2"
        strokeWidth="1.5"
      />
      <path
        d="M9 20.5a7 7 0 0 1 14 0"
        stroke={`url(#${BRAND_GRADIENT_ID})`}
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path d="M7 20.5h18" className="stroke-foreground" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Logotipo completo com link para a página inicial. */
export function Logo({ className }: { className?: string }) {
  const [firstWord, ...rest] = siteConfig.name.split(' ')

  return (
    <Link
      href="/"
      aria-label={uiCopy.homeLink}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2.5 rounded-md text-foreground',
        className,
      )}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="font-display text-xl leading-none font-bold tracking-tight font-stretch-display">
        {firstWord}
        {rest.length > 0 ? (
          <span className="font-medium text-subtle"> {rest.join(' ')}</span>
        ) : null}
      </span>
    </Link>
  )
}
