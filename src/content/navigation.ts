/** Âncoras das seções da home (usadas nos links, na navbar e nos CTAs). */
export const sectionIds = {
  hero: 'inicio',
  services: 'servicos',
  projects: 'projetos',
  differentials: 'diferenciais',
  process: 'processo',
  needs: 'solucoes',
  about: 'sobre',
  faq: 'faq',
  contact: 'contato',
} as const

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds]

export interface NavItem {
  label: string
  sectionId: SectionId
}

export const mainNav: NavItem[] = [
  { label: 'Serviços', sectionId: sectionIds.services },
  { label: 'Projetos', sectionId: sectionIds.projects },
  { label: 'Processo', sectionId: sectionIds.process },
  { label: 'Sobre', sectionId: sectionIds.about },
  { label: 'FAQ', sectionId: sectionIds.faq },
]

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: 'Soluções', sectionId: sectionIds.needs },
  { label: 'Contato', sectionId: sectionIds.contact },
]

export const quoteCtaLabel = 'Solicitar orçamento'
/** Versão curta do CTA para celulares pequenos. */
export const quoteCtaShortLabel = 'Orçamento'

export const privacyLink = { label: 'Política de Privacidade', href: '/privacidade' }
