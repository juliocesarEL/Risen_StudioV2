import { projectsSection } from '@/content/sections'
import { siteConfig } from '@/content/site'
import { getCaseStudyBySlug, getCaseStudyStaticParams, getCategoryLabel } from '@/lib/projects'
import {
  ogContentType,
  ogImageSize,
  renderProjectOgImage,
  renderSiteOgImage,
} from '@/lib/seo/og-image'

export const alt = `Estudo de caso — ${siteConfig.name}`
export const size = ogImageSize
export const contentType = ogContentType

export function generateStaticParams() {
  return getCaseStudyStaticParams()
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getCaseStudyBySlug(slug)
  if (!project) return renderSiteOgImage()

  return renderProjectOgImage({
    name: project.name,
    summary: project.summary,
    kindLabel: projectsSection.kindLabels[project.kind],
    categoryLabel: getCategoryLabel(project.category),
  })
}
