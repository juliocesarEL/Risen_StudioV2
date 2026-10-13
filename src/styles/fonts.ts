import { Bricolage_Grotesque, Figtree, Martian_Mono } from 'next/font/google'

/**
 * Fontes do site, carregadas com next/font (auto-hospedadas, sem layout shift).
 *
 * Para trocar uma família, altere apenas este arquivo: os tokens
 * --font-display, --font-body e --font-mono (globals.css) apontam para as
 * variáveis CSS definidas aqui.
 */

/** Títulos: grotesca de largura variável, usada condensada (eixo wdth). */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth', 'opsz'],
  display: 'swap',
  variable: '--font-family-display',
})

/** Texto corrido. */
const body = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-body',
})

/** Rótulos, numeração e detalhes técnicos. */
const mono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-mono',
})

export const fontVariables = [display.variable, body.variable, mono.variable].join(' ')
