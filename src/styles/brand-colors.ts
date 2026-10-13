/**
 * Espelho dos tokens de cor de globals.css para ambientes que não entendem
 * variáveis CSS: imagens Open Graph (next/og) e e-mails.
 *
 * Os componentes do site não devem usar este arquivo: lá, use os tokens CSS.
 * O teste brand-colors.test.ts garante que os valores continuam iguais aos de
 * globals.css.
 */
export const brandColors = {
  bg: '#0a0a0f',
  bg2: '#13131a',
  bg3: '#1c1c24',
  text: '#f4f4f5',
  textBody: '#a1a1aa',
  textQuote: '#d4d4d8',
  textMuted: '#71717a',
  accent: '#c084fc',
  line: '#27272a',
  line2: '#3f3f46',
  gradientPrimaryFrom: '#3b82f6',
  gradientPrimaryVia: '#8b5cf6',
  gradientPrimaryTo: '#ec4899',
  gradientTextFrom: '#60a5fa',
  gradientTextVia: '#a78bfa',
  gradientTextTo: '#c084fc',
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
  gradientPrimaryFrom: '--gradient-primary-from',
  gradientPrimaryVia: '--gradient-primary-via',
  gradientPrimaryTo: '--gradient-primary-to',
  gradientTextFrom: '--gradient-text-from',
  gradientTextVia: '--gradient-text-via',
  gradientTextTo: '--gradient-text-to',
  windowRed: '--window-red',
  windowYellow: '--window-yellow',
  windowGreen: '--window-green',
}

export const brandGradients = {
  primary: `linear-gradient(90deg, ${brandColors.gradientPrimaryFrom}, ${brandColors.gradientPrimaryVia}, ${brandColors.gradientPrimaryTo})`,
  text: `linear-gradient(90deg, ${brandColors.gradientTextFrom}, ${brandColors.gradientTextVia}, ${brandColors.gradientTextTo})`,
} as const
