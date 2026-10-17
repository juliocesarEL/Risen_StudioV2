import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { NextProjectBand } from '@/components/sections/projects/next-project-band'
import type { ProjectCardCopy } from '@/components/sections/projects/project-card'
import { ProjectGrid } from '@/components/sections/projects/project-grid'
import { Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import type { projectsSection } from '@/content/sections'
import {
  countOpenSlots,
  getHomeProjects,
  getMoreProjects,
  getProjectTypesByCategory,
  hasMoreProjects,
} from '@/lib/projects'
import type { Project, ServiceCategoryId } from '@/types/content'

interface ProjectsProps {
  id: string
  copy: typeof projectsSection
  /** Todos os projetos publicados; a seção mostra só os primeiros. */
  projects: Project[]
  categories: { id: ServiceCategoryId; label: string }[]
  newTabHint: string
  /** Página com os projetos que não cabem aqui (do 7º em diante). */
  moreProjectsHref: string
}

/**
 * Projetos na página inicial: no máximo duas fileiras, para a seção ter sempre
 * o mesmo tamanho. Vagas abertas completam a última fileira no tablet e no
 * desktop. Quando há mais projetos, um link leva à página /projetos; abaixo,
 * a faixa de convite ao próximo projeto.
 */
export function Projects({
  id,
  copy,
  projects,
  categories,
  newTabHint,
  moreProjectsHref,
}: ProjectsProps) {
  const titleId = `${id}-titulo`
  const homeProjects = getHomeProjects(projects)
  const cardCopy: ProjectCardCopy = {
    caseStudyCta: copy.caseStudyCta,
    liveCta: copy.liveCta,
    newTabHint,
  }

  return (
    <Section id={id} labelledBy={titleId}>
      <Container className="flex flex-col gap-12 sm:gap-16">
        <SectionHeading copy={copy.heading} titleId={titleId} />

        <div className="flex flex-col gap-8">
          <ProjectGrid
            projects={homeProjects}
            categories={categories}
            cardCopy={cardCopy}
            openSlots={countOpenSlots(homeProjects.length)}
            openSlotCopy={{ ...copy.openSlot, projectTypes: getProjectTypesByCategory() }}
            hideOpenSlotsOnMobile
          />

          {hasMoreProjects(projects) ? (
            <Reveal className="flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href={moreProjectsHref}>
                  {copy.viewMore} (+{getMoreProjects(projects).length})
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Reveal>
          ) : null}

          <Reveal>
            <NextProjectBand copy={copy.nextProject} />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
