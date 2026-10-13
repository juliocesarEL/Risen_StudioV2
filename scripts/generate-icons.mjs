/**
 * Gera os ícones do site a partir do símbolo da marca.
 *
 * Uso: pnpm generate:icons
 *
 * Saídas:
 *  - src/app/icon.svg          favicon vetorial (navegadores modernos)
 *  - src/app/favicon.ico       favicon 32×32 (navegadores e robôs antigos)
 *  - src/app/apple-icon.png    ícone de tela inicial do iOS (180×180)
 *  - public/brand/icon-*.png   ícones do manifesto e logo do JSON-LD
 *
 * Ao trocar o logotipo, ajuste os desenhos abaixo e rode o script de novo.
 * As cores espelham os tokens de globals.css (ver src/styles/brand-colors.ts).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from '@playwright/test'

const colors = {
  bg: '#0a0a0f',
  bg2: '#13131a',
  text: '#f4f4f5',
  from: '#3b82f6',
  via: '#8b5cf6',
  to: '#ec4899',
}

const gradient = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="32" y2="0"><stop offset="0" stop-color="${colors.from}"/><stop offset=".55" stop-color="${colors.via}"/><stop offset="1" stop-color="${colors.to}"/></linearGradient></defs>`

/** Símbolo: sol nascendo (arco sobre o horizonte), com traços mais grossos para tamanhos pequenos. */
const mark = `<path d="M8.5 21a7.5 7.5 0 0 1 15 0" fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linecap="round"/><path d="M6.5 21h19" stroke="${colors.text}" stroke-width="2.4" stroke-linecap="round"/>`

/** Favicon: bloco arredondado. */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${gradient}<rect width="32" height="32" rx="8" fill="${colors.bg2}"/>${mark}</svg>`

/** Ícones de app: quadrado cheio (o sistema aplica o próprio recorte) com margem segura. */
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${gradient}<rect width="32" height="32" fill="${colors.bg}"/><g transform="translate(4.8 4.8) scale(.7)">${mark}</g></svg>`

/** Empacota um PNG em um arquivo .ico (formato aceito por todos os navegadores). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size, 0)
  entry.writeUInt8(size, 1)
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(header.length + entry.length, 12)
  return Buffer.concat([header, entry, png])
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
await writeFile(join('src', 'app', 'favicon.ico'), pngToIco(await renderPng(faviconSvg, 32), 32))
await writeFile(join('src', 'app', 'apple-icon.png'), await renderPng(appIconSvg, 180))
await writeFile(join('public', 'brand', 'icon-192.png'), await renderPng(appIconSvg, 192))
await writeFile(join('public', 'brand', 'icon-512.png'), await renderPng(appIconSvg, 512))

await browser.close()
console.log('✓ Ícones gerados')
