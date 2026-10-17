'use client'

import { animate } from 'motion/mini'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Curva de saída suave, usada em todas as entradas. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Só transform e opacity: animações sem custo de layout. */
const ENTRANCE = { duration: 0.7, distance: '1.5rem' }
/** Trilhos que se "desenham" (data-reveal="draw"). */
const DRAW = { duration: 1.4 }
/**
 * Títulos (data-reveal="title"): se alargam até a largura final, saindo do
 * desfoque, como as letras largas do logotipo. Só transform, opacity e filter:
 * nenhuma mudança de layout.
 */
const TITLE = { duration: 1.1, fromScale: 0.84, fromBlur: '8px' }

/**
 * Cards (data-reveal="card"): sobem inclinados, como uma carta pousando na
 * mesa; a imagem dentro deles se revela de cima para baixo, saindo de um zoom.
 * A imagem é animada por transform e o recorte por clip-path, que não disputam
 * com o zoom do hover (feito pela propriedade scale).
 */
const CARD = {
  duration: 1,
  distance: '3.5rem',
  tilt: '14deg',
  media: { delay: 0.18, duration: 1.2, fromScale: 1.22 },
}

/** A entrada começa quando o elemento passa 10% da altura da tela. */
const VIEWPORT_MARGIN = '0px 0px -10% 0px'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const PENDING_SELECTOR = '[data-reveal]:not([data-revealed])'

function reveal(element: HTMLElement) {
  // A partir daqui o CSS deixa de esconder o elemento; a animação assume o
  // primeiro quadro imediatamente (Motion usa fill: "both"), sem piscar.
  element.setAttribute('data-revealed', '')

  if (element.dataset.reveal === 'draw') {
    animate(
      element,
      { transform: ['scale(0)', 'scale(1)'] },
      { duration: DRAW.duration, ease: EASE_OUT },
    )
    return
  }

  if (element.dataset.reveal === 'title') {
    element.style.transformOrigin = 'left center'
    animate(
      element,
      {
        opacity: [0, 1],
        transform: [`scaleX(${TITLE.fromScale})`, 'none'],
        filter: [`blur(${TITLE.fromBlur})`, 'blur(0px)'],
      },
      { duration: TITLE.duration, ease: EASE_OUT },
    )
    return
  }

  const delay = Number(element.dataset.revealDelay ?? 0)

  if (element.dataset.reveal === 'card') {
    animate(
      element,
      {
        opacity: [0, 1],
        transform: [
          `perspective(1400px) translateY(${CARD.distance}) rotateX(${CARD.tilt})`,
          'perspective(1400px) translateY(0) rotateX(0deg)',
        ],
      },
      { duration: CARD.duration, delay, ease: EASE_OUT },
    )
    const image = element.querySelector('img')
    const frame = image?.parentElement
    if (image && frame) {
      const media = {
        duration: CARD.media.duration,
        delay: delay + CARD.media.delay,
        ease: EASE_OUT,
      }
      animate(frame, { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, media)
      animate(image, { transform: [`scale(${CARD.media.fromScale})`, 'none'] }, media)
    }
    return
  }

  animate(
    element,
    { opacity: [0, 1], transform: [`translateY(${ENTRANCE.distance})`, 'none'] },
    { duration: ENTRANCE.duration, delay, ease: EASE_OUT },
  )
}

/**
 * Anima as entradas marcadas com <Reveal> (Motion). Um único observador
 * cuida da página inteira, inclusive de elementos que aparecem depois
 * (troca de rota ou filtros).
 */
export function RevealController() {
  const pathname = usePathname()

  useEffect(() => {
    const pending = () => document.querySelectorAll<HTMLElement>(PENDING_SELECTOR)

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      pending().forEach((element) => element.setAttribute('data-revealed', ''))
      return
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          intersection.unobserve(entry.target)
          reveal(entry.target as HTMLElement)
        })
      },
      { rootMargin: VIEWPORT_MARGIN },
    )
    const observePending = () => pending().forEach((element) => intersection.observe(element))
    observePending()

    // Elementos novos (ex.: grade de projetos filtrada) também entram animados.
    const mutations = new MutationObserver(observePending)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersection.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  return null
}
