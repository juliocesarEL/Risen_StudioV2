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
