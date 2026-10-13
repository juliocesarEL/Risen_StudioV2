const LOCAL_URL = 'http://localhost:3000'

/**
 * URL pública do site, usada em canonical, sitemap, robots e Open Graph.
 * Ordem: NEXT_PUBLIC_SITE_URL → domínio de produção da Vercel → localhost.
 */
export function getSiteUrl(): URL {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicitUrl) return new URL(explicitUrl)

  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelProductionHost) return new URL(`https://${vercelProductionHost}`)

  return new URL(LOCAL_URL)
}

/** URL absoluta para um caminho do site. */
export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString()
}
