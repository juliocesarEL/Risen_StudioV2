'use client'

import { Check, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { WorkbenchCode } from '@/components/sections/hero/workbench-code'
import { WorkbenchPreview } from '@/components/sections/hero/workbench-preview'
import '@/components/sections/hero/workbench.css'
import { CTAButton } from '@/components/shared/cta-button'
import { workbenchCopy, workbenchTabs } from '@/content/workbench'
import { scheduleTyping, typingRhythm } from '@/lib/workbench-timing'

import type { CSSProperties, KeyboardEvent } from 'react'

/** Tempo que o resultado fica na tela antes de a próxima aba começar sozinha. */
const HOLD_SECONDS = 3.5
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const schedules = workbenchTabs.map((tab) => scheduleTyping(tab.code))
const lastIndex = workbenchTabs.length - 1

const tabId = (id: string) => `bancada-aba-${id}`
const panelId = (id: string) => `bancada-painel-${id}`

/**
 * Bancada ao vivo: o código de um projeto é digitado e o resultado se monta
 * ao lado, provando que quem atende é quem constrói. Percorre sozinha as três
 * frentes (site, sistema, integração) uma vez, enquanto está visível; tocar
 * numa aba ou pausar devolve o controle a quem visita.
 */
export function Workbench() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const windowRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const total = schedules[activeIndex]?.total ?? 0

  useEffect(() => {
    const element = windowRef.current
    if (!element || !autoplay || paused || activeIndex >= lastIndex) return undefined
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return undefined

    let timer: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(timer)
      if (!entry?.isIntersecting) return
      timer = window.setTimeout(
        () => setActiveIndex((index) => Math.min(index + 1, lastIndex)),
        (total + HOLD_SECONDS) * 1000,
      )
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [autoplay, paused, activeIndex, total])

  function select(index: number) {
    setAutoplay(false)
    setPaused(false)
    setActiveIndex(index)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeys(event: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: (activeIndex + 1) % workbenchTabs.length,
      ArrowLeft: (activeIndex - 1 + workbenchTabs.length) % workbenchTabs.length,
      Home: 0,
      End: lastIndex,
    }
    const next = moves[event.key]
    if (next === undefined) return
    event.preventDefault()
    select(next)
  }

  const tab = workbenchTabs[activeIndex]
  const schedule = schedules[activeIndex]
  if (!tab || !schedule) return null

  const timing = { '--per-char': typingRhythm.perChar, '--total': schedule.total } as CSSProperties

  return (
    <div
      ref={windowRef}
      role="group"
      aria-label={workbenchCopy.label}
      data-paused={paused ? '' : undefined}
      className="wb-window"
      style={timing}
    >
      <div className="wb-titlebar">
        <span className="wb-lights" aria-hidden="true">
          <span className="bg-window-red" />
          <span className="bg-window-yellow" />
          <span className="bg-window-green" />
        </span>
        <span className="wb-path" aria-hidden="true">
          {workbenchCopy.path}
        </span>
        <button
          type="button"
          onClick={() => {
            setAutoplay(false)
            setPaused((value) => !value)
          }}
          aria-label={paused ? workbenchCopy.resume : workbenchCopy.pause}
          className="grid size-11 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>

      <div
        role="tablist"
        aria-label={workbenchCopy.tablistLabel}
        className="wb-tabs"
        onKeyDown={handleTabKeys}
      >
        {workbenchTabs.map((item, index) => {
          const selected = index === activeIndex
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={tabId(item.id)}
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              aria-label={`${item.label}: ${item.file}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className="wb-tab"
            >
              <span className="wb-tab-dot" aria-hidden="true" />
              {item.file}
            </button>
          )
        })}
      </div>

      {/* A troca de chave reinicia a coreografia ao mudar de aba. */}
      <div
        key={tab.id}
        role="tabpanel"
        id={panelId(tab.id)}
        aria-labelledby={tabId(tab.id)}
        className="wb-body"
      >
        <p className="sr-only">{tab.summary}</p>
        <WorkbenchCode code={tab.code} lines={schedule.lines} />
        <div className="wb-preview" aria-hidden="true">
          <WorkbenchPreview tab={tab.id} builds={schedule.builds} />
        </div>
      </div>

      <div className="wb-status">
        <span key={tab.id} className="wb-state" aria-hidden="true">
          <span className="wb-building">{workbenchCopy.building}</span>
          <span className="wb-done">
            <Check className="size-3.5" />
            {workbenchCopy.done}
          </span>
        </span>
        <CTAButton
          source="bancada"
          label={tab.quoteLabel}
          projectType={tab.projectType}
          variant="ghost"
          className="text-xs"
        />
      </div>
    </div>
  )
}
