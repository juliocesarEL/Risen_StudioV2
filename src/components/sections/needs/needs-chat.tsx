'use client'

import { ArrowRight, CornerDownRight } from 'lucide-react'
import { useEffect, useEffectEvent, useId, useRef, useState } from 'react'

import { hideWhatsAppFloatProps } from '@/components/layout/layout-markers'
import '@/components/sections/needs/needs-chat.css'
import { CTAButton } from '@/components/shared/cta-button'
import { LogoMark } from '@/components/shared/logo'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import type { needsSection } from '@/content/sections'
import { cn } from '@/lib/utils'
import type { Need } from '@/types/content'

export interface NeedWithLink extends Need {
  whatsappHref: string
}

interface NeedsChatProps {
  needs: NeedWithLink[]
  copy: typeof needsSection
}

/** Etapas da conversa depois de escolher uma situação. */
type Phase = 'visitor' | 'typing' | 'replying' | 'done'

/** Ritmo da conversa, em milissegundos. */
const TIMING = {
  /** Da mensagem do visitante até a Risen começar a digitar. */
  beforeTyping: 450,
  /** Quanto tempo os três pontinhos aparecem. */
  typing: 900,
  /** Intervalo entre as palavras da resposta. */
  perWord: 45,
}

/** A conversa começa quando a seção passa 25% da altura da tela. */
const VIEWPORT_MARGIN = '0px 0px -25% 0px'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * "Qual é o seu momento?" como uma conversa: as situações são respostas
 * rápidas e, ao escolher uma, a mensagem aparece, a Risen digita e responde
 * com a solução indicada e os dois caminhos (orçamento ou WhatsApp, com a
 * mensagem daquela situação já escrita).
 *
 * O espaço de cada balão é reservado desde o início: a página não "pula"
 * enquanto a resposta chega. Sem JavaScript ou com movimento reduzido, a
 * conversa aparece pronta.
 */
export function NeedsChat({ needs, copy }: NeedsChatProps) {
  const [selectedId, setSelectedId] = useState(needs[0]?.id)
  const [phase, setPhase] = useState<Phase>('done')
  const [typedWords, setTypedWords] = useState(0)
  const [played, setPlayed] = useState(false)
  /** Muda a cada conversa, para os balões entrarem de novo. */
  const [run, setRun] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const baseId = useId()
  const optionsLabelId = `${baseId}-opcoes`
  const chatId = `${baseId}-conversa`

  const selected = needs.find((need) => need.id === selectedId) ?? needs[0]

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }

  function later(callback: () => void, delay: number) {
    timersRef.current.push(window.setTimeout(callback, delay))
  }

  function play(needId: string) {
    const need = needs.find((item) => item.id === needId)
    if (!need) return
    clearTimers()
    setSelectedId(needId)
    setPlayed(true)
    setRun((value) => value + 1)

    if (prefersReducedMotion()) {
      setPhase('done')
      return
    }

    const wordCount = need.reply.split(' ').length
    const replyStart = TIMING.beforeTyping + TIMING.typing
    setPhase('visitor')
    setTypedWords(0)
    later(() => setPhase('typing'), TIMING.beforeTyping)
    later(() => setPhase('replying'), replyStart)
    for (let word = 1; word <= wordCount; word += 1) {
      later(() => setTypedWords(word), replyStart + word * TIMING.perWord)
    }
    later(() => setPhase('done'), replyStart + wordCount * TIMING.perWord + 150)
  }

  function choose(needId: string) {
    play(needId)
    // No celular, a conversa fica abaixo das opções: traz para a tela, se preciso.
    chatRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  // A primeira conversa é encenada quando a seção entra na tela (se a pessoa
  // ainda não escolheu nada).
  const onFirstView = useEffectEvent(() => {
    if (!played && selected) play(selected.id)
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        onFirstView()
      },
      { rootMargin: VIEWPORT_MARGIN },
    )
    observer.observe(root)
    return () => {
      observer.disconnect()
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  if (!selected) return null

  const replyVisible = phase === 'replying' || phase === 'done'
  const typedReply =
    phase === 'done' ? selected.reply : selected.reply.split(' ').slice(0, typedWords).join(' ')

  return (
    <div
      ref={rootRef}
      data-played={played ? '' : undefined}
      className="nchat grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10"
    >
      {/* Respostas rápidas */}
      <div className="flex flex-col gap-4 lg:col-span-5">
        <p id={optionsLabelId} className="group-label text-subtle">
          {copy.chat.optionsLabel}
        </p>
        <ul aria-labelledby={optionsLabelId} className="flex flex-col gap-3">
          {needs.map((need) => {
            const isSelected = need.id === selected.id
            return (
              <li key={need.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls={chatId}
                  onClick={() => choose(need.id)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-surface-card px-5 py-4 text-left transition-[border-color,background-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:border-accent/70 aria-pressed:bg-accent/10 motion-reduce:hover:translate-y-0"
                >
                  <span className="font-display text-lg leading-snug font-semibold text-quote font-stretch-semi group-aria-pressed:text-foreground">
                    {need.statement}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-pill border border-line-2 text-body transition-colors duration-300 group-hover:text-foreground group-aria-pressed:border-transparent group-aria-pressed:bg-accent group-aria-pressed:text-on-accent"
                  >
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* A conversa */}
      {/* A conversa tem o próprio botão de WhatsApp: o flutuante some enquanto ela está na tela. */}
      <div
        ref={chatRef}
        id={chatId}
        {...hideWhatsAppFloatProps}
        className="flex flex-col overflow-hidden rounded-card border border-line-2 bg-bg2 shadow-window lg:col-span-7"
      >
        <div className="flex items-center gap-3 border-b border-line bg-bg3/60 px-5 py-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-pill border border-line-2 bg-background">
            <LogoMark className="size-5" />
          </span>
          <div className="flex min-w-0 flex-col">
            <p className="text-sm font-semibold text-foreground">{copy.chat.title}</p>
            <p className="truncate text-xs text-subtle">{copy.chat.subtitle}</p>
          </div>
        </div>

        <div
          role="log"
          aria-live="polite"
          className="flex flex-col gap-3 bg-[radial-gradient(80%_60%_at_100%_0%,color-mix(in_srgb,var(--field-violet)_14%,transparent),transparent_70%)] px-4 py-5 sm:px-6 sm:py-6"
        >
          <Bubble from="risen">{copy.chat.greeting}</Bubble>

          <div key={run} className="nchat-exchange flex flex-col gap-3">
            <p className="sr-only">{copy.chat.visitor}:</p>
            <Bubble from="visitor" animate={played}>
              {selected.statement}
            </Bubble>

            {/* Lugar da resposta: reservado desde o início; os pontinhos ocupam o mesmo canto. */}
            <div className="relative">
              {phase === 'typing' ? (
                <div
                  aria-hidden="true"
                  title={copy.chat.typing}
                  data-from="risen"
                  className="nchat-in absolute top-0 left-0 flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-bg3 px-4 py-3.5"
                >
                  <span className="nchat-dot size-1.5 rounded-pill bg-body" />
                  <span className="nchat-dot size-1.5 rounded-pill bg-body" />
                  <span className="nchat-dot size-1.5 rounded-pill bg-body" />
                </div>
              ) : null}

              <div
                data-from="risen"
                className={cn(
                  'max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-bg3 px-4 py-3.5 sm:px-5 sm:py-4',
                  replyVisible ? played && 'nchat-in' : 'invisible',
                )}
              >
                <p className="group-label text-xs text-subtle">{copy.solutionLabel}</p>
                <p className="mt-1 flex items-center gap-2 font-display font-semibold text-foreground font-stretch-semi">
                  <CornerDownRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  {selected.solution}
                </p>

                <p className="relative mt-2 text-body">
                  <span className="sr-only">{selected.reply}</span>
                  {/* Texto invisível reserva o tamanho final; por cima, a resposta sendo digitada. */}
                  <span aria-hidden="true" className="invisible">
                    {selected.reply}
                  </span>
                  <span aria-hidden="true" className="absolute inset-0">
                    {typedReply}
                    {phase === 'replying' ? (
                      <span className="nchat-caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 bg-accent" />
                    ) : null}
                  </span>
                </p>

                <div
                  data-hidden={phase === 'done' ? undefined : ''}
                  className="nchat-actions mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
                >
                  <CTAButton
                    source="necessidade"
                    label={copy.quoteCta}
                    projectType={selected.projectType}
                  />
                  <WhatsAppButton
                    href={selected.whatsappHref}
                    source="necessidade"
                    label={copy.whatsappCta}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({
  from,
  animate = false,
  children,
}: {
  from: 'risen' | 'visitor'
  animate?: boolean
  children: React.ReactNode
}) {
  return (
    <p
      data-from={from}
      className={cn(
        'max-w-[85%] rounded-2xl px-4 py-2.5',
        from === 'risen'
          ? 'self-start rounded-bl-md border border-line bg-bg3 text-quote'
          : 'self-end rounded-br-md bg-gradient-action font-medium text-on-gradient',
        animate && 'nchat-in',
      )}
    >
      {children}
    </p>
  )
}
