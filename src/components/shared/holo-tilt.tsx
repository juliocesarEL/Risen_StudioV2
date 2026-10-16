'use client'

import { useEffect, useRef } from 'react'

import '@/components/shared/holo.css'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

/** Inclinação máxima, em graus, com o cursor na borda do card. */
const MAX_TILT = 6

/**
 * Card que inclina com o cursor e passa as coordenadas para a película
 * holográfica (<HoloFoil />, dentro dele). Só com mouse e sem preferência por
 * movimento reduzido; no toque e sem JavaScript, o card fica como sempre foi.
 */
export function HoloTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const canTilt = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    if (!canTilt.matches) return undefined

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.dataset.holo = ''
        root.style.setProperty('--holo-x', `${(x * 100).toFixed(1)}%`)
        root.style.setProperty('--holo-y', `${(y * 100).toFixed(1)}%`)
        root.style.setProperty('--tilt-x', `${((x - 0.5) * MAX_TILT * 2).toFixed(2)}deg`)
        root.style.setProperty('--tilt-y', `${(-(y - 0.5) * MAX_TILT * 2).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      delete root.dataset.holo
      root.style.setProperty('--tilt-x', '0deg')
      root.style.setProperty('--tilt-y', '0deg')
    }

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={cn('holo', className)}>
      <div className="holo-card h-full">{children}</div>
    </div>
  )
}

/** A película (cores da marca) e a purpurina; vai dentro do card, por cima do conteúdo. */
export function HoloFoil() {
  return (
    <>
      <span aria-hidden="true" className="holo-foil" />
      <span aria-hidden="true" className="holo-glitter" />
    </>
  )
}
