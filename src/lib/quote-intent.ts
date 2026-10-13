import { sectionIds } from '@/content/navigation'
import type { ProjectTypeId } from '@/types/content'

/**
 * Pré-seleção do tipo de projeto no formulário de orçamento.
 *
 * Funciona de duas formas complementares:
 * - Pela URL (`/?tipo=landing-page#contato`): vale para links vindos de outras
 *   páginas e para quem abre o link direto.
 * - Por um evento no navegador: na própria home, o CTA rola até o formulário
 *   sem recarregar a página e o formulário reage na hora.
 */

export const PROJECT_TYPE_PARAM = 'tipo'

const QUOTE_INTENT_EVENT = 'risen:quote-intent'

interface QuoteIntentDetail {
  projectType?: ProjectTypeId
}

/** Endereço do formulário, com o tipo de projeto já indicado. */
export function buildQuoteHref(projectType?: ProjectTypeId): string {
  const query = projectType ? `?${PROJECT_TYPE_PARAM}=${projectType}` : ''
  return `/${query}#${sectionIds.contact}`
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Na home: atualiza a URL, avisa o formulário e rola até ele. */
export function requestQuote(projectType?: ProjectTypeId): void {
  const url = new URL(window.location.href)
  if (projectType) url.searchParams.set(PROJECT_TYPE_PARAM, projectType)
  url.hash = sectionIds.contact
  window.history.replaceState(window.history.state, '', url)

  window.dispatchEvent(
    new CustomEvent<QuoteIntentDetail>(QUOTE_INTENT_EVENT, { detail: { projectType } }),
  )

  const section = document.getElementById(sectionIds.contact)
  section?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  // Leva o foco para o início do formulário sem interromper a rolagem suave,
  // para que leitores de tela anunciem o destino.
  section?.querySelector<HTMLElement>('[data-quote-focus]')?.focus({ preventScroll: true })
}

export function subscribeToQuoteIntent(
  listener: (projectType: ProjectTypeId | undefined) => void,
): () => void {
  const handler = (event: Event) => {
    listener((event as CustomEvent<QuoteIntentDetail>).detail.projectType)
  }
  window.addEventListener(QUOTE_INTENT_EVENT, handler)
  return () => window.removeEventListener(QUOTE_INTENT_EVENT, handler)
}

export function readProjectTypeFromUrl(): string | null {
  return new URL(window.location.href).searchParams.get(PROJECT_TYPE_PARAM)
}
