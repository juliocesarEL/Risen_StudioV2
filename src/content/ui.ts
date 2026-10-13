import { siteConfig } from '@/content/site'

/** Microtextos da interface (rótulos acessíveis, avisos e textos de apoio). */
export const uiCopy = {
  skipLink: 'Pular para o conteúdo',
  homeLink: `${siteConfig.name} — página inicial`,
  navLabel: 'Navegação principal',
  openMenu: 'Abrir menu',
  menuTitle: 'Menu',
  menuDescription: 'Navegue pelas seções do site.',
  whatsappFloat: 'Conversar no WhatsApp',
  newTabHint: '(abre em nova aba)',
  provisionalImage: 'Imagem provisória',
  browserFrameAddress: 'risenstudio',
  notFound: {
    eyebrow: 'Erro 404',
    title: 'Esta página não existe (ou mudou de lugar).',
    description: 'Confira o endereço ou volte para a página inicial.',
    cta: 'Ir para a página inicial',
  },
  footer: {
    description: siteConfig.description,
    navTitle: 'Navegação',
    contactTitle: 'Contato',
    socialTitle: 'Redes',
    rights: 'Todos os direitos reservados.',
  },
}
