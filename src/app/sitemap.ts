import { privacyLink } from '@/content/navigation'
import { getCaseStudies, getMoreProjects, getPublishedProjects } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site-url'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    // /projetos só entra quando tem projetos (antes disso, só vagas abertas e noindex).
    ...(getMoreProjects(getPublishedProjects()).length > 0
      ? [{ url: absoluteUrl('/projetos'), changeFrequency: 'monthly' as const, priority: 0.8 }]
      : []),
    ...getCaseStudies().map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: absoluteUrl(privacyLink.href), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
