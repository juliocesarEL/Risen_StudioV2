import { track } from '@vercel/analytics'

/**
 * Eventos personalizados (Vercel Analytics). Todos os nomes ficam aqui para
 * que o painel não acumule variações do mesmo evento.
 */
export const analyticsEvents = {
  ctaClick: 'Clique em CTA',
  whatsappClick: 'Clique no WhatsApp',
  formSubmitSuccess: 'Orçamento enviado',
  formSubmitError: 'Erro no envio do orçamento',
  caseStudyOpen: 'Estudo de caso aberto',
} as const

/** Onde o CTA de orçamento foi clicado. */
export type CtaSource =
  | 'navbar'
  | 'menu-mobile'
  | 'hero'
  | 'bancada'
  | 'servico'
  | 'projetos'
  | 'sobre'
  | 'necessidade'
  | 'estudo-de-caso'

/** Onde o botão de WhatsApp foi clicado. */
export type WhatsAppSource =
  | 'botao-flutuante'
  | 'menu-mobile'
  | 'necessidade'
  | 'contato'
  | 'formulario-sucesso'
  | 'formulario-erro'
  | 'faq'
  | 'rodape'
  | 'estudo-de-caso'

export function trackCtaClick(source: CtaSource, details: { label: string; projectType?: string }) {
  track(analyticsEvents.ctaClick, {
    origem: source,
    rotulo: details.label,
    tipo_projeto: details.projectType ?? null,
  })
}

export function trackWhatsAppClick(source: WhatsAppSource) {
  track(analyticsEvents.whatsappClick, { origem: source })
}

export function trackFormSubmitSuccess(projectType: string) {
  track(analyticsEvents.formSubmitSuccess, { tipo_projeto: projectType })
}

export function trackFormSubmitError(reason: string) {
  track(analyticsEvents.formSubmitError, { motivo: reason })
}

export function trackCaseStudyOpen(slug: string) {
  track(analyticsEvents.caseStudyOpen, { projeto: slug })
}
