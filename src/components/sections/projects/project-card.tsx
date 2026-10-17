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
  /** h3 dentro de uma seção (página inicial); h2 direto abaixo do h1 (página /projetos). */
  headingLevel?: 'h2' | 'h3'
}

const stretchedLinkClass =
  "outline-none after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"

const imageSizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw'

/**
 * Card de galeria: a capa é a protagonista; abaixo, o nome, o resumo e o selo
 * de origem. O card inteiro é o link: para a página do projeto ou, sem ela,
 * para o site no ar (nova aba).
 */
export function ProjectCard({
  project,
  categoryLabel,
  copy,
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  const caseStudyHref = project.hasCaseStudy ? `/projetos/${project.slug}` : undefined
  const primaryHref = caseStudyHref ?? project.liveUrl
  const opensLiveSite = !caseStudyHref && Boolean(project.liveUrl)
  const Arrow = opensLiveSite ? ArrowUpRight : ArrowRight

  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-card border border-line bg-surface-card p-2.5 shadow-card transition-[border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-line-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <BrowserFrame
        image={project.cover}
        sizes={imageSizes}
        imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
      />

      <div className="flex flex-1 flex-col gap-3 px-2.5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <Heading className="flex min-w-0 items-center gap-2.5 font-display text-h3 font-semibold text-foreground font-stretch-semi">
            {project.logo ? (
              <Image src={project.logo} alt="" width={32} height={32} className="size-8 shrink-0" />
            ) : null}
            {primaryHref ? (
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

          {primaryHref ? (
            // A seta diz para onde o card leva: → página do projeto; ↗ site externo.
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-pill border border-line-2 text-body transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-on-accent"
            >
              <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          ) : null}
        </div>

        <p className="text-body">{project.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
          <ProjectKindBadge kind={project.kind} />
          <span className="text-sm text-subtle">{categoryLabel}</span>
        </div>
      </div>
    </article>
  )
}
