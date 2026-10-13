import { privacyLink } from '@/content/navigation'
import { getCaseStudies } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site-url'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    ...getCaseStudies().map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: absoluteUrl(privacyLink.href), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
