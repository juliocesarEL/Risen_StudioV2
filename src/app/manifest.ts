import { siteConfig } from '@/content/site'
import { brandColors } from '@/styles/brand-colors'

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    lang: siteConfig.locale,
    start_url: '/',
    display: 'standalone',
    background_color: brandColors.bg,
    theme_color: brandColors.bg,
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
