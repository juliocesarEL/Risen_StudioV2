/**
 * Espelho dos tokens de cor de globals.css para ambientes que não entendem
 * variáveis CSS: imagens Open Graph (next/og), ícones e e-mails.
 *
 * Os componentes do site não devem usar este arquivo: lá, use os tokens CSS.
 * O teste brand-colors.test.ts garante que os valores continuam iguais aos de
 * globals.css.
 */
export const brandColors = {
  bg: '#03040b',
  bg2: '#090b19',
  bg3: '#11142b',
  text: '#ececef',
  textBody: '#a4a9c6',
  textQuote: '#cdd0e4',
  textMuted: '#7a80a6',
  accent: '#9c7cff',
  line: '#191c35',
  line2: '#282c4f',
  brandBlue: '#3386fe',
  brandIndigo: '#5658f8',
  brandViolet: '#8457fc',
  fieldBlue: '#0119c3',
  fieldViolet: '#3310ac',
  gradientPrimaryFrom: '#3386fe',
  gradientPrimaryVia: '#5658f8',
  gradientPrimaryTo: '#8457fc',
  gradientActionFrom: '#2a62ee',
  gradientActionVia: '#4f50ee',
  gradientActionTo: '#7448f0',
  gradientTextFrom: '#4f94ff',
  gradientTextVia: '#7d7dff',
  gradientTextTo: '#a585ff',
  onGradient: '#ffffff',
  windowRed: '#ff5f57',
  windowYellow: '#febc2e',
  windowGreen: '#28c840',
} as const

/** Nome de cada chave acima no globals.css. */
export const brandColorTokens: Record<keyof typeof brandColors, string> = {
  bg: '--bg',
  bg2: '--bg2',
  bg3: '--bg3',
  text: '--text',
  textBody: '--text-body',
  textQuote: '--text-quote',
  textMuted: '--text-muted',
  accent: '--accent',
  line: '--line',
  line2: '--line2',
  brandBlue: '--brand-blue',
  brandIndigo: '--brand-indigo',
  brandViolet: '--brand-violet',
  fieldBlue: '--field-blue',
  fieldViolet: '--field-violet',
  gradientPrimaryFrom: '--gradient-primary-from',
  gradientPrimaryVia: '--gradient-primary-via',
  gradientPrimaryTo: '--gradient-primary-to',
  gradientActionFrom: '--gradient-action-from',
  gradientActionVia: '--gradient-action-via',
  gradientActionTo: '--gradient-action-to',
  gradientTextFrom: '--gradient-text-from',
  gradientTextVia: '--gradient-text-via',
  gradientTextTo: '--gradient-text-to',
  onGradient: '--on-gradient',
  windowRed: '--window-red',
  windowYellow: '--window-yellow',
  windowGreen: '--window-green',
}

export const brandGradients = {
  primary: `linear-gradient(90deg, ${brandColors.gradientPrimaryFrom}, ${brandColors.gradientPrimaryVia}, ${brandColors.gradientPrimaryTo})`,
  action: `linear-gradient(90deg, ${brandColors.gradientActionFrom}, ${brandColors.gradientActionVia}, ${brandColors.gradientActionTo})`,
  text: `linear-gradient(90deg, ${brandColors.gradientTextFrom}, ${brandColors.gradientTextVia}, ${brandColors.gradientTextTo})`,
} as const
