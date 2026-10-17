import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { FilterableProjects } from '@/components/sections/projects/filterable-projects'
import type { ProjectCardCopy } from '@/components/sections/projects/project-card'
import { ProjectGrid } from '@/components/sections/projects/project-grid'
import { Container } from '@/components/shared/section'
import { projectsPage, projectsSection } from '@/content/sections'
import { uiCopy } from '@/content/ui'
import {
  countOpenSlots,
  getCategoryLabel,
  getMoreProjects,
  getProjectCategories,
  getProjectTypesByCategory,
  getPublishedProjects,
  PROJECTS_PAGE_MIN_SLOTS,
  shouldShowProjectFilters,
} from '@/lib/projects'

import type { Metadata } from 'next'

const moreProjects = getMoreProjects(getPublishedProjects())

export const metadata: Metadata = {
  title: projectsPage.title,
  description: projectsPage.description,
  alternates: { canonical: '/projetos' },
  // Só com vagas abertas, a página não tem o que mostrar na busca do Google.
  ...(moreProjects.length === 0 ? { robots: { index: false, follow: true } } : {}),
}

/**
 * Mais projetos: os que não cabem nas duas fileiras da página inicial (do 7º
 * em diante). Vagas abertas completam ao menos 12 espaços, então a página
 * nunca fica vazia: o próximo projeto entra no lugar da primeira vaga.
 */
export default function ProjectsPage() {
  const categories = getProjectCategories(moreProjects).map((id) => ({
    id,
    label: getCategoryLabel(id),
  }))
  const cardCopy: ProjectCardCopy = {
    caseStudyCta: projectsSection.caseStudyCta,
    liveCta: projectsSection.liveCta,
    newTabHint: uiCopy.newTabHint,
  }
  const openSlotCopy = { ...projectsSection.openSlot, projectTypes: getProjectTypesByCategory() }
  const showFilters = shouldShowProjectFilters(moreProjects.length) && categories.length > 1

  return (
    <div className="pt-[calc(var(--nav-height)+2.5rem)] pb-section">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm text-body transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {projectsPage.backToHome}
          </Link>
          <div className="flex max-w-3xl flex-col gap-5">
            <h1 className="font-display text-page-title font-bold text-foreground font-stretch-display">
              {projectsPage.title}
            </h1>
            <p className="text-lead text-body">{projectsPage.description}</p>
          </div>
        </header>

        {showFilters ? (
          <FilterableProjects
            projects={moreProjects}
            categories={categories}
            cardCopy={cardCopy}
            headingLevel="h2"
            openSlotCopy={openSlotCopy}
            minSlots={PROJECTS_PAGE_MIN_SLOTS}
            copy={{
              filterLabel: projectsSection.filterLabel,
              filterAll: projectsSection.filterAll,
              filterResult: projectsSection.filterResult,
            }}
          />
        ) : (
          <ProjectGrid
            projects={moreProjects}
            categories={categories}
            cardCopy={cardCopy}
            headingLevel="h2"
            openSlots={countOpenSlots(moreProjects.length, PROJECTS_PAGE_MIN_SLOTS)}
            openSlotCopy={openSlotCopy}
          />
        )}
      </Container>
    </div>
  )
}
