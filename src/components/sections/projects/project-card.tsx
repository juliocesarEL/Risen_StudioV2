import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { BrowserFrame } from '@/components/shared/browser-frame'
import { ProjectKindBadge } from '@/components/shared/project-kind-badge'
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
  headingLevel?: 'h3' | 'h4'
}

const stretchedLinkClass =
  "outline-none after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"

const imageSizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw'

export function ProjectCard({
  project,
  categoryLabel,
  copy,
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  const caseStudyHref = project.hasCaseStudy ? `/projetos/${project.slug}` : undefined
  // Destino do card: o estudo de caso, se houver; senão, o site no ar (nova aba).
  const primaryHref = caseStudyHref ?? project.liveUrl
  const opensLiveSite = !caseStudyHref && Boolean(project.liveUrl)

  return (
    <article className="group relative flex h-full flex-col gap-6 rounded-card border border-line bg-surface-card p-3 shadow-card transition-colors duration-300 hover:border-line-2 sm:p-4">
      <BrowserFrame
        image={project.cover}
        sizes={imageSizes}
        imageClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />

      <div className="flex flex-1 flex-col gap-4 px-2 pb-3 sm:px-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <ProjectKindBadge kind={project.kind} />
          <span className="text-sm text-subtle">{categoryLabel}</span>
        </div>

        <Heading className="flex items-center gap-3 font-display text-h3 font-semibold text-foreground font-stretch-semi">
          {project.logo ? (
            <Image src={project.logo} alt="" width={36} height={36} className="size-9 shrink-0" />
          ) : null}
          {primaryHref ? (
            // O link "estica" sobre o card inteiro: um único destino para mouse, toque e teclado.
            opensLiveSite ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className={stretchedLinkClass}
              >
                {project.name}
                <span className="sr-only">
                  {' '}
                  — {copy.liveCta} {copy.newTabHint}
                </span>
              </a>
            ) : (
              <Link
                href={primaryHref}
                // Pré-carrega a página inteira (estática) para a navegação ser instantânea.
                prefetch
                className={stretchedLinkClass}
              >
                {project.name}
                <span className="sr-only"> — {copy.caseStudyCta}</span>
              </Link>
            )
          ) : (
            project.name
          )}
        </Heading>

        <p className="text-body">{project.summary}</p>

        {primaryHref ? (
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm font-medium">
            <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-accent">
              {opensLiveSite ? copy.liveCta : copy.caseStudyCta}
              {opensLiveSite ? (
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              ) : (
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </span>
            {/* Com estudo de caso, o site no ar fica como link secundário. */}
            {caseStudyHref && project.liveUrl ? (
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
