'use client'

import { useEffect, useRef, useState } from 'react'

import '@/components/sections/process/process.css'
import { cn } from '@/lib/utils'

import type { CSSProperties, ReactNode } from 'react'

/** A sequência começa quando a linha do tempo passa 20% da altura da tela. */
const VIEWPORT_MARGIN = '0px 0px -20% 0px'

interface ProcessTimelineProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Liga a animação da linha do tempo (process.css) uma única vez, quando ela
 * entra na tela. O conteúdo vem pronto do servidor; aqui só se marca
 * data-active.
 */
export function ProcessTimeline({ children, className, style }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setActive(true)
        observer.disconnect()
      },
      { rootMargin: VIEWPORT_MARGIN },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-active={active ? '' : undefined}
      className={cn('process-timeline', className)}
      style={style}
    >
      {children}
    </div>
  )
}
