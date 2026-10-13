import type { FullConfig } from '@playwright/test'

/**
 * Aquece o servidor antes dos testes: baixa a página e os arquivos estáticos
 * uma vez. Logo após o build, a primeira leitura desses arquivos pode ser lenta
 * (cache do sistema, antivírus), o que deixava testes paralelos instáveis.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL
  if (!baseURL) return

  const html = await (await fetch(baseURL)).text()
  const assets = new Set(
    [...html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+)"/g)].map((match) => match[1]),
  )

  await Promise.all(
    [...assets].map(async (asset) => {
      const response = await fetch(new URL(asset ?? '', baseURL))
      await response.arrayBuffer()
    }),
  )
}
