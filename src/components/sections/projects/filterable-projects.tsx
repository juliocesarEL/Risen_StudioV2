'use client'

import { useState } from 'react'

import { type ProjectCardCopy, ProjectCard } from '@/components/sections/projects/project-card'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Button } from '@/components/ui/button'
import type { Project, ServiceCategoryId } from '@/types/content'

const ALL = 'todos'

type FilterId = ServiceCategoryId | typeof ALL

interface FilterableProjectsProps {
  projects: Project[]
  categories: { id: ServiceCategoryId; label: string }[]
  copy: {
    filterLabel: string
    filterAll: string
    filterResult: { one: string; other: string }
  }
  cardCopy: ProjectCardCopy
}

const pluralRules = new Intl.PluralRules('pt-BR')

/** Grade com filtros por categoria (exibida a partir de 6 projetos). */
export function FilterableProjects({
  projects,
  categories,
  copy,
  cardCopy,
}: FilterableProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>(ALL)
  const visibleProjects =
    activeFilter === ALL
      ? projects
      : projects.filter((project) => project.category === activeFilter)
  const filters: { id: FilterId; label: string }[] = [
    { id: ALL, label: copy.filterAll },
    ...categories,
  ]
  const resultLabel =
    pluralRules.select(visibleProjects.length) === 'one'
      ? copy.filterResult.one
      : copy.filterResult.other

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={copy.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id
          return (
            <Button
              key={filter.id}
              type="button"
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          )
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visibleProjects.length} {resultLabel}
      </p>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * REVEAL_STAGGER} className="h-full">
              <ProjectCard
                project={project}
                copy={cardCopy}
                categoryLabel={
                  categories.find((category) => category.id === project.category)?.label ?? ''
                }
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
