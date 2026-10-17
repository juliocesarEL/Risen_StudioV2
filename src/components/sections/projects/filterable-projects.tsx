'use client'

import { useState } from 'react'

import type { ProjectCardCopy } from '@/components/sections/projects/project-card'
import { ProjectGrid } from '@/components/sections/projects/project-grid'
import { Button } from '@/components/ui/button'
import { countOpenSlots } from '@/lib/project-slots'
import type { Project, ServiceCategoryId } from '@/types/content'

import type { ComponentProps } from 'react'

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
  headingLevel?: 'h2' | 'h3'
  openSlotCopy?: ComponentProps<typeof ProjectGrid>['openSlotCopy']
  /** Mínimo de espaços na grade (projetos + vagas abertas). */
  minSlots?: number
}

const pluralRules = new Intl.PluralRules('pt-BR')

/** Grade com filtros por categoria (página /projetos, a partir de 6 projetos). */
export function FilterableProjects({
  projects,
  categories,
  copy,
  cardCopy,
  headingLevel,
  openSlotCopy,
  minSlots = 0,
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

      <ProjectGrid
        projects={visibleProjects}
        categories={categories}
        cardCopy={cardCopy}
        headingLevel={headingLevel}
        openSlotCopy={openSlotCopy}
        openSlots={openSlotCopy ? countOpenSlots(visibleProjects.length, minSlots) : 0}
      />
    </div>
  )
}
