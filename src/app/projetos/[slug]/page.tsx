import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { CaseStudyCta, NextProjectNav } from '@/components/case-study/case-study-footer'
import { CaseStudyGallery } from '@/components/case-study/case-study-gallery'
import { CaseStudyHero } from '@/components/case-study/case-study-hero'
import {
  CaseStudyBlock,
  CaseStudyFeatures,
  CaseStudyOverview,
  CaseStudyStack,
} from '@/components/case-study/case-study-sections'
import { CaseStudySkeleton } from '@/components/case-study/case-study-skeleton'
import { TrackCaseStudyView } from '@/components/case-study/track-case-study-view'
import { JsonLd } from '@/components/shared/json-ld'
import { Reveal } from '@/components/shared/reveal'
import { Container } from '@/components/shared/section'
import { caseStudyCopy } from '@/content/case-study'
import { sectionIds } from '@/content/navigation'
import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { fillTemplate } from '@/lib/format'
import {
  getCaseStudyBySlug,
  getCaseStudyStaticParams,
  getCategoryLabel,
  getNextCaseStudy,
  getProjectTypeForCategory,
} from '@/lib/projects'
import { buildBreadcrumbJsonLd, buildCaseStudyJsonLd } from '@/lib/seo/json-ld'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'

import type { Metadata } from 'next'

const projectsHref = `/#${sectionIds.projects}`

export function generateStaticParams() {
  return getCaseStudyStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/projetos/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getCaseStudyBySlug(slug)
  if (!project) return {}

  const path = `/projetos/${project.slug}`
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: project.name, description: project.summary, url: path },
    twitter: { card: 'summary_large_image', title: project.name, description: project.summary },
  }
}

/**
 * O esqueleto forma o App Shell da rota (navegação instantânea); o conteúdo,
 * que depende do slug, é pré-renderizado no build e pré-carregado pelos links.
 */
export default function CaseStudyPage({ params }: PageProps<'/projetos/[slug]'>) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudy params={params} />
    </Suspense>
  )
}

async function CaseStudy({ params }: { params: PageProps<'/projetos/[slug]'>['params'] }) {
  const { slug } = await params
  const project = getCaseStudyBySlug(slug)
  if (!project) notFound()

  const { default: CaseStudyContent } = await import(`@/content/projects/${project.slug}.mdx`)
  const whatsappMessage = fillTemplate(siteConfig.contact.whatsapp.messages.caseStudy, {
    projeto: project.name,
  })

  return (
    <>
      <JsonLd
        data={[
          buildCaseStudyJsonLd(project),
          buildBreadcrumbJsonLd([
            { name: caseStudyCopy.breadcrumb.home, path: '/' },
            { name: caseStudyCopy.breadcrumb.projects, path: projectsHref },
            { name: project.name, path: `/projetos/${project.slug}` },
          ]),
        ]}
      />
      <TrackCaseStudyView slug={project.slug} />

      <article>
        <CaseStudyHero
          project={project}
          categoryLabel={getCategoryLabel(project.category)}
          backHref={projectsHref}
          copy={{
            backToProjects: caseStudyCopy.backToProjects,
            liveCta: caseStudyCopy.liveCta,
            newTabHint: uiCopy.newTabHint,
          }}
        />

        <CaseStudyOverview
          problem={project.problem}
          solution={project.solution}
          copy={caseStudyCopy.overview}
        />

        <section className="py-12 sm:py-16">
          <Container>
            <Reveal className="max-w-3xl">
              <CaseStudyContent />
            </Reveal>
          </Container>
        </section>

        <CaseStudyFeatures features={project.features} title={caseStudyCopy.featuresTitle} />

        {project.gallery && project.gallery.length > 0 ? (
          <CaseStudyBlock title={caseStudyCopy.galleryTitle} titleId="galeria">
            <CaseStudyGallery
              images={project.gallery}
              openLabelPrefix={caseStudyCopy.galleryOpenPrefix}
            />
          </CaseStudyBlock>
        ) : null}

        {project.stack && project.stack.length > 0 ? (
          <CaseStudyStack stack={project.stack} title={caseStudyCopy.technologiesTitle} />
        ) : null}
      </article>

      <CaseStudyCta
        copy={caseStudyCopy.cta}
        projectType={getProjectTypeForCategory(project.category)}
        whatsappHref={getStudioWhatsAppUrl(whatsappMessage)}
      />
      <NextProjectNav
        next={getNextCaseStudy(project.slug)}
        allProjectsHref={projectsHref}
        copy={caseStudyCopy}
      />
    </>
  )
}
