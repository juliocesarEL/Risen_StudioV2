'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { HeroBackdrop } from '@/components/reactbits/hero-backdrop'
import { cn } from '@/lib/utils'

/** WebGL só no navegador, em um pacote separado, carregado depois da página. */
const Particles = dynamic(() => import('@/components/reactbits/vendor/Particles'), { ssr: false })

type SceneQuality = 'static' | 'light' | 'full'

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const SMALL_SCREEN_QUERY = '(max-width: 767px)'
/** Aparelhos no limite ou abaixo destes valores recebem só a versão estática. */
const LOW_END = { cores: 2, memoryGb: 2 }
/** Aparelhos modestos recebem a cena com menos partículas. */
const MODEST = { cores: 4, memoryGb: 4 }
/** Espera máxima pelo navegador ocioso antes de carregar a cena. */
const IDLE_TIMEOUT_MS = 1500

/**
 * Tokens de globals.css usados como cores das partículas. O acento aparece
 * duas vezes para predominar sobre as demais cores.
 */
const COLOR_TOKENS = [
  '--accent',
  '--accent',
  '--gradient-text-from',
  '--gradient-text-via',
  '--gradient-primary-to',
  '--text-quote',
]

/**
 * A câmera da cena tem campo de visão estreito e o volume é profundo: boa parte
 * das partículas fica fora do quadro ou ao fundo. Por isso a contagem é alta;
 * o custo por partícula na GPU é baixo (quads instanciados, sem trabalho na CPU).
 */
const QUALITY_SETTINGS = {
  full: { particleCount: 840, pixelRatio: 2 },
  light: { particleCount: 420, pixelRatio: 1.5 },
} as const

/** Partículas que sobem devagar ("risen") e se afastam do cursor. */
const SCENE_SETTINGS = {
  particleSpread: 10,
  speed: 0.05,
  particleBaseSize: 150,
  sizeRandomness: 1,
  glow: 0.7,
  twinkle: 0.4,
  drift: 'up',
  driftSpeed: 0.3,
  hoverEffect: 'repel',
  hoverRadius: 170,
  particleHoverFactor: 1.1,
  clickBurst: false,
  disableRotation: true,
} as const

/** Renderizadores WebGL sem GPU: a cena custaria caro para a CPU e a bateria. */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i

/**
 * Verifica se há WebGL2 com aceleração por GPU. O teste roda em um worker
 * (webgl-probe.worker.ts): criar o contexto pode esperar a GPU, e na thread
 * principal essa espera travaria a página. Sem suporte a worker com
 * OffscreenCanvas, a cena fica na versão estática.
 */
function hasHardwareWebGL2(): Promise<boolean> {
  if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') {
    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    const worker = new Worker(new URL('./webgl-probe.worker.ts', import.meta.url))
    const finish = (renderer: unknown) => {
      worker.terminate()
      resolve(typeof renderer === 'string' && !SOFTWARE_RENDERER.test(renderer))
    }
    worker.onmessage = (event: MessageEvent<unknown>) => finish(event.data)
    worker.onerror = () => finish(null)
  })
}

/**
 * Só em desenvolvimento: `?cena` força a cena mesmo sem GPU (usado pelos scripts
 * de captura, que rodam em um navegador com renderização por software).
 */
const FORCE_SCENE_PARAM = 'cena'

function isSceneForced(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    new URLSearchParams(window.location.search).has(FORCE_SCENE_PARAM)
  )
}

async function detectQuality(): Promise<SceneQuality> {
  if (isSceneForced()) return 'light'
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return 'static'

  const hints = navigator as NavigatorWithHints
  if (hints.connection?.saveData) return 'static'

  const cores = hints.hardwareConcurrency || MODEST.cores
  const memory = hints.deviceMemory ?? MODEST.memoryGb
  if (cores <= LOW_END.cores || memory <= LOW_END.memoryGb) return 'static'
  if (!(await hasHardwareWebGL2())) return 'static'

  const isSmallScreen = window.matchMedia(SMALL_SCREEN_QUERY).matches
  const isModest = cores <= MODEST.cores || memory <= MODEST.memoryGb
  return isSmallScreen || isModest ? 'light' : 'full'
}

function readTokenColors(): string[] {
  const styles = getComputedStyle(document.documentElement)
  return COLOR_TOKENS.map((token) => styles.getPropertyValue(token).trim()).filter(Boolean)
}

/** Agenda uma tarefa para quando o navegador estiver ocioso. Retorna o cancelamento. */
function whenIdle(task: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(task, { timeout: IDLE_TIMEOUT_MS })
    return () => window.cancelIdleCallback(id)
  }
  const timer = setTimeout(task, IDLE_TIMEOUT_MS)
  return () => clearTimeout(timer)
}

/**
 * Cena interativa do hero (React Bits — Particles), sempre decorativa.
 *
 * Começa com a versão estática (HeroBackdrop) e só troca para WebGL quando o
 * navegador fica ocioso e o primeiro quadro é desenhado. Com movimento
 * reduzido, economia de dados, aparelhos fracos, sem WebGL2 ou com WebGL sem
 * GPU (renderização por software), a versão estática permanece. A própria
 * cena pausa quando sai da tela ou a aba fica oculta.
 */
export function HeroScene({ className }: { className?: string }) {
  const [quality, setQuality] = useState<SceneQuality>('static')
  const [colors, setColors] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
    let active = true
    const evaluate = async () => {
      const nextQuality = await detectQuality()
      if (!active) return
      setColors(readTokenColors())
      setQuality(nextQuality)
    }
    const cancel = whenIdle(() => void evaluate())
    const onMotionChange = () => void evaluate()
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      active = false
      cancel()
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  // Se a GPU perder o contexto (driver, economia de energia...), volta à versão estática.
  useEffect(() => {
    const canvas = ready ? sceneRef.current?.querySelector('canvas') : null
    if (!canvas) return

    const fallBackToStatic = () => {
      setReady(false)
      setQuality('static')
    }
    canvas.addEventListener('webglcontextlost', fallBackToStatic)
    return () => canvas.removeEventListener('webglcontextlost', fallBackToStatic)
  }, [ready])

  const showScene = quality !== 'static' && colors.length > 0

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <HeroBackdrop hideDots={showScene && ready} />
      {showScene ? (
        <div
          ref={sceneRef}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-out',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Particles
            {...SCENE_SETTINGS}
            {...QUALITY_SETTINGS[quality]}
            particleColors={colors}
            onReady={() => setReady(true)}
          />
        </div>
      ) : null}
    </div>
  )
}
