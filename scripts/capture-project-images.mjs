/**
 * Gera as imagens do projeto "Site da Risen Studio" (capa e galeria) a partir
 * de capturas reais do site rodando localmente.
 *
 * Uso: com `pnpm dev` rodando em outro terminal (o parâmetro ?cena só vale em desenvolvimento):
 *      pnpm capture:project-images [--url=http://localhost:3000]
 * Ou, numa máquina com placa de vídeo, a partir do servidor de produção:
 *      pnpm capture:project-images --gpu --url=http://localhost:3100
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
 * A capa espera a bancada do hero terminar a primeira aba (~6,6 s desde a
 * abertura) e a cena WebGL carregar, mas não a troca automática de aba (~10 s).
 */
const COVER_WAIT_MS = 7000

const shots = [
  { file: 'capa.png', selector: null, waitMs: COVER_WAIT_MS },
  { file: 'servicos.png', selector: '#servicos', waitMs: 2500 },
  { file: 'processo.png', selector: '#processo', waitMs: 2500 },
  { file: 'contato.png', selector: '#contato', waitMs: 2500 },
]

const HIDE_OVERLAYS =
  'nextjs-portal, [aria-label="Conversar no WhatsApp"] { visibility: hidden !important; }'

/**
 * --gpu: usa a placa de vídeo da máquina (Windows/Direct3D). Assim a cena WebGL
 * carrega como num aparelho real e a captura pode vir do servidor de produção.
 * Sem a opção, o navegador renderiza por software e precisa do ?cena (só no dev).
 */
const useGpu = args.gpu === 'true'
const gpuArgs = useGpu
  ? ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist']
  : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ args: gpuArgs })
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
await page.goto(new URL(useGpu ? '/' : '/?cena', baseUrl).toString(), { waitUntil: 'networkidle' })
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
