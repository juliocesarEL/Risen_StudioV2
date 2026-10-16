/**
 * Gera os ícones do site a partir do monograma "R" oficial.
 *
 * Uso: pnpm generate:icons
 *
 * Saídas:
 *  - src/app/icon.svg          favicon vetorial (navegadores modernos)
 *  - src/app/favicon.ico       favicon 32, 48 e 96 px (navegadores e Google, que pede múltiplos de 48)
 *  - src/app/apple-icon.png    ícone de tela inicial do iOS (180×180)
 *  - public/brand/icon-*.png   ícones do manifesto e logo do JSON-LD
 *
 * A geometria vem de src/lib/brand-mark.ts e as cores de
 * src/styles/brand-colors.ts (o Node 22.18+ importa TypeScript direto).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from '@playwright/test'

import { brandMark } from '../src/lib/brand-mark.ts'
import { brandColors } from '../src/styles/brand-colors.ts'

const { x1, y1, x2, y2 } = brandMark.gradient
const defs = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${brandColors.gradientPrimaryFrom}"/><stop offset=".5" stop-color="${brandColors.gradientPrimaryVia}"/><stop offset="1" stop-color="${brandColors.gradientPrimaryTo}"/></linearGradient></defs>`
const mark = `<path fill="url(#g)" d="${brandMark.gradientPath}"/><path fill="${brandColors.text}" d="${brandMark.strokePath}"/>`

/**
 * Coloca o monograma num quadro de `frame` unidades, com `padding` de margem.
 * O viewBox do quadro é maior que o do R: a escala sai da proporção entre os dois.
 */
function framed({ frame, padding, background, radius = 0 }) {
  const scale = (frame - padding * 2) / brandMark.size
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${frame} ${frame}">${defs}<rect width="${frame}" height="${frame}" rx="${radius}" fill="${background}"/><g transform="translate(${padding} ${padding}) scale(${scale})">${mark}</g></svg>`
}

/** Favicon: bloco arredondado escuro, com o R ocupando quase todo o espaço. */
const faviconSvg = framed({ frame: 32, padding: 5, background: brandColors.bg, radius: 7 })

/** Ícones de app: quadrado cheio (o sistema aplica o próprio recorte) com margem segura. */
const appIconSvg = framed({ frame: 32, padding: 8, background: brandColors.bg })

/** Empacota PNGs ([png, tamanho]) em um arquivo .ico (formato aceito por todos os navegadores). */
function pngsToIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length + images.length * 16
  const entries = images.map(([png, size]) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size, 0)
    entry.writeUInt8(size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += png.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...images.map(([png]) => png)])
}

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })

async function renderPng(svg, size) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
  )
  return page.locator('svg').screenshot({ omitBackground: true })
}

await mkdir(join('public', 'brand'), { recursive: true })
await writeFile(join('src', 'app', 'icon.svg'), `${faviconSvg}\n`)
const faviconSizes = [32, 48, 96]
const faviconPngs = []
for (const size of faviconSizes) faviconPngs.push([await renderPng(faviconSvg, size), size])
await writeFile(join('src', 'app', 'favicon.ico'), pngsToIco(faviconPngs))
await writeFile(join('src', 'app', 'apple-icon.png'), await renderPng(appIconSvg, 180))
await writeFile(join('public', 'brand', 'icon-192.png'), await renderPng(appIconSvg, 192))
await writeFile(join('public', 'brand', 'icon-512.png'), await renderPng(appIconSvg, 512))

await browser.close()
console.log('✓ Ícones gerados')
