import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { BrowserFrame } from '@/components/shared/browser-frame'
import { ProjectKindBadge } from '@/components/shared/project-kind-badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/content'

export interface ProjectCardCopy {
  caseStudyCta: string
  liveCta: string
  newTabHint: string
}

interface ProjectCardProps {
  project: Project
  categoryLabel: string
  copy: ProjectCardCopy
  /** "featured": imagem e texto lado a lado no desktop. */
  variant?: 'featured' | 'default'
  headingLevel?: 'h3' | 'h4'
}

const imageSizes = {
  featured: '(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw',
  default: '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw',
}

export function ProjectCard({
  project,
  categoryLabel,
  copy,
  variant = 'default',
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  const caseStudyHref = project.hasCaseStudy ? `/projetos/${project.slug}` : undefined
  const isFeatured = variant === 'featured'

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-6 rounded-card border border-line bg-surface-card p-3 shadow-card transition-colors duration-300 hover:border-line-2 sm:p-4',
        isFeatured && 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-5',
      )}
    >
      <BrowserFrame
        image={project.cover}
        sizes={imageSizes[variant]}
        className={cn(isFeatured && 'lg:col-span-7')}
        imageClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />

      <div
        className={cn(
          'flex flex-1 flex-col gap-4 px-2 pb-3 sm:px-3',
          isFeatured && 'lg:col-span-5 lg:px-0 lg:pr-4',
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <ProjectKindBadge kind={project.kind} />
          <span className="text-sm text-subtle">{categoryLabel}</span>
        </div>

        <Heading
          className={cn(
            'font-display font-semibold text-foreground font-stretch-semi',
            isFeatured ? 'text-h3 lg:text-title' : 'text-h3',
          )}
        >
          {caseStudyHref ? (
            // O link "estica" sobre o card inteiro: um único destino para mouse, toque e teclado.
            <Link
              href={caseStudyHref}
              // Pré-carrega a página inteira (estática) para a navegação ser instantânea.
              prefetch
              className="outline-none after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
            >
              {project.name}
              <span className="sr-only"> — {copy.caseStudyCta}</span>
            </Link>
          ) : (
            project.name
          )}
        </Heading>

        <p className="text-body">{project.summary}</p>

        {caseStudyHref || project.liveUrl ? (
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm font-medium">
            {caseStudyHref ? (
              <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-accent">
                {copy.caseStudyCta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
              >
                {copy.liveCta}
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> {copy.newTabHint}</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
