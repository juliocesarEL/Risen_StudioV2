'use client'

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

import type { ContactFormProps } from '@/components/sections/contact/contact-form'
import { subscribeToQuoteIntent } from '@/lib/quote-intent'

/** O código do formulário começa a carregar quando ele está a até uma tela de distância. */
const PRELOAD_MARGIN = '100% 0px'
/** Interações dentro do formulário que antecipam o carregamento. */
const INTENT_EVENTS = ['pointerdown', 'focusin'] as const
/**
 * Interações em qualquer lugar da página que também carregam o formulário.
 *
 * Enquanto o formulário não carrega, a parte dele vinda do servidor ainda não
 * foi hidratada, e o React segura qualquer navegação do Next (links de âncora,
 * do menu, dos cards de projeto) até ela hidratar. Carregar na primeira
 * interação faz o link funcionar no mesmo clique: o pointerdown e o keydown
 * chegam antes do click, e a navegação só espera o pacote do formulário baixar.
 */
const PAGE_INTENT_EVENTS = ['pointerdown', 'keydown'] as const
/**
 * Garantia final: sem nenhum dos gatilhos acima, o formulário carrega quando o
 * navegador fica ocioso depois de abrir a página (no máximo neste prazo, em ms).
 * O carregamento inicial continua leve e o formulário nunca fica pendente.
 */
const IDLE_LOAD_TIMEOUT_MS = 5000

function loadContactForm() {
  return import('@/components/sections/contact/contact-form').then((module) => ({
    default: module.ContactForm,
  }))
}

/** Uma promessa que só se resolve quando `open` é chamado. */
function createGate() {
  let open = () => {}
  const promise = new Promise<void>((resolve) => {
    open = resolve
  })
  return { promise, open }
}

/** Chama `onNeeded` quando o formulário se aproxima da tela ou quando a pessoa interage com a página. */
function watchForNeed(container: HTMLElement, onNeeded: () => void): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) onNeeded()
    },
    { rootMargin: PRELOAD_MARGIN },
  )
  observer.observe(container)
  INTENT_EVENTS.forEach((type) => container.addEventListener(type, onNeeded))
  PAGE_INTENT_EVENTS.forEach((type) =>
    document.addEventListener(type, onNeeded, { capture: true, passive: true }),
  )
  // Voltar e avançar do navegador também são navegações do Next.
  window.addEventListener('popstate', onNeeded)
  const idle =
    'requestIdleCallback' in window
      ? window.requestIdleCallback(onNeeded, { timeout: IDLE_LOAD_TIMEOUT_MS })
      : undefined
  const fallback =
    idle === undefined ? window.setTimeout(onNeeded, IDLE_LOAD_TIMEOUT_MS) : undefined
  const unsubscribe = subscribeToQuoteIntent(onNeeded)

  return () => {
    observer.disconnect()
    INTENT_EVENTS.forEach((type) => container.removeEventListener(type, onNeeded))
    PAGE_INTENT_EVENTS.forEach((type) =>
      document.removeEventListener(type, onNeeded, { capture: true }),
    )
    window.removeEventListener('popstate', onNeeded)
    if (idle !== undefined) window.cancelIdleCallback(idle)
    window.clearTimeout(fallback)
    unsubscribe()
  }
}

/**
 * Formulário de orçamento com hidratação sob demanda.
 *
 * O HTML do formulário vem pronto do servidor, mas o JavaScript (React Hook
 * Form, Zod, Select...) só é baixado quando o formulário se aproxima da tela
 * ou recebe interação. Assim ele não disputa a abertura da página com o
 * conteúdo do topo. Um envio feito antes de o código chegar é retido e
 * repetido assim que o formulário fica interativo.
 */
export function DeferredContactForm(props: Omit<ContactFormProps, 'onReady'>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)
  const pendingSubmitRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [gate] = useState(createGate)
  // No servidor, carrega na hora (o HTML sai completo); no navegador, espera o portão abrir.
  const [Form] = useState(() =>
    lazy(() =>
      typeof window === 'undefined' ? loadContactForm() : gate.promise.then(loadContactForm),
    ),
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    // Navegação dentro do site: não há HTML do servidor para exibir, então carrega já.
    if (!container.querySelector('form')) {
      gate.open()
      return undefined
    }

    const holdEarlySubmit = (event: Event) => {
      if (readyRef.current) return
      event.preventDefault()
      pendingSubmitRef.current = true
      gate.open()
    }
    container.addEventListener('submit', holdEarlySubmit)
    const stopWatching = watchForNeed(container, gate.open)

    return () => {
      container.removeEventListener('submit', holdEarlySubmit)
      stopWatching()
    }
  }, [gate])

  const handleReady = useCallback(() => {
    readyRef.current = true
    setReady(true)
    if (!pendingSubmitRef.current) return
    pendingSubmitRef.current = false
    containerRef.current?.querySelector('form')?.requestSubmit()
  }, [])

  return (
    <div ref={containerRef} data-form-ready={ready ? '' : undefined}>
      <Suspense fallback={null}>
        <Form {...props} onReady={handleReady} />
      </Suspense>
    </div>
  )
}
