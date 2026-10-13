/**
 * Gera as imagens do projeto "Site da Risen Studio" (capa e galeria) a partir
 * de capturas reais do site rodando localmente.
 *
 * Uso: com `pnpm dev` rodando em outro terminal (o parâmetro ?cena só vale em desenvolvimento):
 *      pnpm capture:project-images [--url=http://localhost:3000]
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from '@playwright/test'

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = 'true'] = arg.replace(/^--/, '').split('=')
    return [key, value]
  }),
)

const baseUrl = args.url ?? 'http://localhost:3000'
const outDir = join('public', 'images', 'projects', 'site-risen-studio')
const viewport = { width: 1600, height: 1000 }

/**
 * Captura -> seletor da seção (null = topo da página) e espera antes de capturar.
 * A capa espera mais: a cena WebGL carrega quando o navegador fica ocioso e tem
 * uma entrada animada (mais lenta no navegador sem GPU usado aqui).
 */
const shots = [
  { file: 'capa.png', selector: null, waitMs: 9000 },
  { file: 'servicos.png', selector: '#servicos', waitMs: 2500 },
  { file: 'processo.png', selector: '#processo', waitMs: 2500 },
  { file: 'contato.png', selector: '#contato', waitMs: 2500 },
]

const HIDE_OVERLAYS =
  'nextjs-portal, [aria-label="Conversar no WhatsApp"] { visibility: hidden !important; }'

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
// ?cena força a cena WebGL no modo de desenvolvimento (este navegador não tem GPU).
await page.goto(new URL('/?cena', baseUrl).toString(), { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.addStyleTag({ content: HIDE_OVERLAYS })

for (const shot of shots) {
  if (shot.selector) {
    await page.evaluate((selector) => {
      const top = document.querySelector(selector).getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'instant' })
    }, shot.selector)
  } else {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  }
  await page.waitForTimeout(shot.waitMs)
  await page.screenshot({ path: join(outDir, shot.file) })
  console.log(`✓ ${shot.file}`)
}

await browser.close()
