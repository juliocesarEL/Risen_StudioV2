import { cn } from '@/lib/utils'

/**
 * Versão estática da cena do hero: brilhos radiais e um "quadro congelado" de
 * partículas. É exibida enquanto a cena WebGL carrega e permanece como versão
 * definitiva com movimento reduzido ou em aparelhos mais modestos.
 */

const DOT_COUNT = 96
const DOT_COLORS = [
  'var(--accent)',
  'var(--gradient-text-from)',
  'var(--gradient-text-via)',
  'var(--gradient-primary-to)',
  'var(--text-quote)',
]

/** Gerador pseudoaleatório com semente fixa: o mesmo desenho no servidor e no navegador. */
function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const random = createRandom(20251)
const dots = Array.from({ length: DOT_COUNT }, () => {
  // Concentra as partículas à direita e no alto, longe do bloco de texto.
  const x = 28 + Math.pow(random(), 0.7) * 72
  const y = Math.pow(random(), 1.15) * 100
  const depth = random()
  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    radius: Number((0.6 + depth * 2.2).toFixed(2)),
    opacity: Number((0.25 + depth * 0.65).toFixed(2)),
    color: DOT_COLORS[Math.floor(random() * DOT_COLORS.length)] ?? 'var(--accent)',
  }
})

interface HeroBackdropProps {
  className?: string
  /** Esconde as partículas estáticas (quando a cena animada assume o lugar delas). */
  hideDots?: boolean
}

export function HeroBackdrop({ className, hideDots = false }: HeroBackdropProps) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_32%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%),radial-gradient(45%_40%_at_12%_88%,color-mix(in_srgb,var(--gradient-primary-from)_12%,transparent),transparent_70%)]" />
      <svg
        className={cn(
          'absolute inset-0 size-full transition-opacity duration-1000 ease-out',
          hideDots && 'opacity-0',
        )}
        preserveAspectRatio="none"
      >
        {/* fill-opacity (e não opacity): mesmo resultado sem uma camada de composição por ponto. */}
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r={dot.radius}
            style={{ fill: dot.color, fillOpacity: dot.opacity }}
          />
        ))}
      </svg>
    </div>
  )
}
