import { Archivo, Martian_Mono } from 'next/font/google'

/**
 * Fontes do site, carregadas com next/font (auto-hospedadas, sem layout shift).
 *
 * Para trocar uma família, altere apenas este arquivo: os tokens
 * --font-display, --font-body e --font-mono (globals.css) apontam para as
 * variáveis CSS definidas aqui.
 */

/**
 * Títulos e texto: Archivo, uma única fonte variável. Nos títulos ela é usada
 * larga (eixo wdth em 125%), ecoando as letras largas do logotipo "RISΞN";
 * no texto corrido, na largura normal.
 */
const sans = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-family-sans',
})

/** Código (bancada do hero), rótulos e dados. Não bloqueia a primeira pintura. */
const mono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-family-mono',
})

export const fontVariables = [sans.variable, mono.variable].join(' ')
