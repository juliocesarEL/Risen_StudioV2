import createMDX from '@next/mdx'
import { withCn } from 'cn/next'

import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  // Política de conteúdo mínima, que não depende de nonce (o site é estático):
  // impede <base> e envio de formulários para outros domínios, embutir o site em
  // iframes e plugins (<object>/<embed>).
  {
    key: 'Content-Security-Policy',
    value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  },
  // Isola a janela do site de páginas abertas a partir dele (e vice-versa).
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

// Os arquivos MDX ficam em src/content e são importados pelas páginas;
// por isso não incluímos "mdx" em pageExtensions.
const withMDX = createMDX({})

/**
 * Compila as tabelas do `cn` (src/lib/cn-tables.ts) a cada build e dev, a
 * partir de cn.config.mjs e do tema em globals.css. `full` mantém todos os
 * grupos de classes, para que classes montadas dinamicamente também funcionem.
 */
export default withCn(withMDX(nextConfig), {
  config: 'cn.config.mjs',
  css: 'src/app/globals.css',
  out: 'src/lib/cn-tables.ts',
  full: true,
})
