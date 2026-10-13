import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { BrowserFrame } from '@/components/shared/browser-frame'
import { ProjectKindBadge } from '@/components/shared/project-kind-badge'
import { Container } from '@/components/shared/section'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types/content'

interface CaseStudyHeroProps {
  project: Project
  categoryLabel: string
  backHref: string
  copy: { backToProjects: string; liveCta: string; newTabHint: string }
}

export function CaseStudyHero({ project, categoryLabel, backHref, copy }: CaseStudyHeroProps) {
  return (
    <header className="pt-[calc(var(--nav-height)+2.5rem)] pb-12 sm:pb-16">
      <Container className="flex flex-col gap-8">
        <Link
          href={backHref}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-sm text-body transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {copy.backToProjects}
        </Link>

        <div className="flex max-w-4xl flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <ProjectKindBadge kind={project.kind} />
            <span className="text-sm text-subtle">{categoryLabel}</span>
          </div>
          <h1 className="font-display text-page-title font-bold text-foreground font-stretch-display">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lead text-body">{project.summary}</p>
          {project.liveUrl ? (
            <Button asChild variant="outline" size="lg" className="w-fit">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {copy.liveCta}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {copy.newTabHint}</span>
              </a>
            </Button>
          ) : null}
        </div>

        <BrowserFrame
          image={project.cover}
          preload
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="mt-4"
        />
      </Container>
    </header>
  )
}
