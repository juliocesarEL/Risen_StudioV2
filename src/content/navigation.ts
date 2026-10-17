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
  /** Linha curta exibida no menu do celular, abaixo do nome da seção. */
  description?: string
}

export const mainNav: NavItem[] = [
  {
    label: 'Serviços',
    sectionId: sectionIds.services,
    description: 'Sites, sistemas e integrações',
  },
  {
    label: 'Projetos',
    sectionId: sectionIds.projects,
    description: 'Trabalhos que já saíram do papel',
  },
  {
    label: 'Processo',
    sectionId: sectionIds.process,
    description: 'Do primeiro contato à entrega',
  },
  { label: 'Sobre', sectionId: sectionIds.about, description: 'Quem está por trás da Risen' },
  { label: 'FAQ', sectionId: sectionIds.faq, description: 'Respostas para as dúvidas comuns' },
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
