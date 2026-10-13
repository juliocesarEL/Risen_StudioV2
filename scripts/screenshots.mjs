/**
 * Verificação visual nas larguras de referência.
 *
 * Uso: pnpm screenshots [--url=http://localhost:3000] [--paths=/,/privacidade]
 *                       [--widths=320,375,1440] [--full] [--sections] [--out=.screenshots]
 *
 * --full      captura a página inteira
 * --sections  captura cada <section>, o cabeçalho e o rodapé separadamente
 *
 * Em todos os modos, avisa se a página tem rolagem horizontal (elementos
 * vazando da tela) e termina com código de erro nesse caso.
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from '@playwright/test'

const REFERENCE_WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920]
const VIEWPORT_HEIGHT = { mobile: 760, desktop: 900 }
const MOBILE_BREAKPOINT = 768

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = 'true'] = arg.replace(/^--/, '').split('=')
    return [key, value]
  }),
)

const baseUrl = args.url ?? 'http://localhost:3000'
// Aceita caminhos com ou sem "/" inicial (no Git Bash, prefira sem: ele converte "/x" em caminho de arquivo).
const paths = (args.paths ?? '/')
  .split(',')
  .map((path) => (path.startsWith('/') ? path : `/${path}`))
const widths = args.widths ? args.widths.split(',').map(Number) : REFERENCE_WIDTHS
const fullPage = args.full === 'true'
const bySection = args.sections === 'true'
const outDir = args.out ?? '.screenshots'

/** Rola a página até o fim (sem animação) para disparar entradas e carregamentos tardios. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

async function findOverflow(page) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth
    if (docWidth <= window.innerWidth) return null
    const offenders = [...document.querySelectorAll('body *')]
      .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 5)
      .map(
        (element) =>
          `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 3).join('.')}`,
      )
    return { docWidth, offenders }
  })
}

const slug = (path) => (path === '/' ? 'home' : path.replace(/\//g, '_').replace(/^_/, ''))

const browser = await chromium.launch()
await mkdir(outDir, { recursive: true })
let overflowCount = 0

for (const path of paths) {
  for (const width of widths) {
    const height = width < MOBILE_BREAKPOINT ? VIEWPORT_HEIGHT.mobile : VIEWPORT_HEIGHT.desktop
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    await page.goto(new URL(path, baseUrl).toString(), { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    if (fullPage || bySection) await scrollThrough(page)
    await page.waitForTimeout(400)

    const overflow = await findOverflow(page)
    if (overflow) {
      overflowCount += 1
      console.warn(
        `⚠ ${path} @ ${width}px: rolagem horizontal (${overflow.docWidth}px)`,
        overflow.offenders,
      )
    }

    if (bySection) {
      // Primeiro a tela inicial (com a navbar); depois cada região sem os elementos
      // fixos (navbar, botão flutuante, indicador de dev), que se sobrepõem às capturas.
      await page.screenshot({ path: join(outDir, `${slug(path)}-${width}-topo.png`) })
      await page.addStyleTag({
        content:
          'body > header, nextjs-portal, [aria-label="Conversar no WhatsApp"] { visibility: hidden !important; }',
      })
      const regions = page.locator('main section, footer')
      const count = await regions.count()
      for (let index = 0; index < count; index += 1) {
        const region = regions.nth(index)
        const id = (await region.getAttribute('id')) ?? (await region.evaluate((el) => el.tagName))
        const name = `${slug(path)}-${width}-${String(index).padStart(2, '0')}-${id.toLowerCase()}.png`
        await region.screenshot({ path: join(outDir, name) })
      }
      console.log(`✓ ${path} @ ${width}px → ${count} regiões`)
    } else {
      const name = `${slug(path)}-${width}.png`
      await page.screenshot({ path: join(outDir, name), fullPage })
      if (!overflow) console.log(`✓ ${path} @ ${width}px → ${name}`)
    }
    await page.close()
  }
}

await browser.close()
if (overflowCount > 0) process.exitCode = 1
