import { describe, expect, it } from 'vitest'

import {
  countOpenSlots,
  getHomeProjects,
  getMoreProjects,
  hasMoreProjects,
  HOME_PROJECTS_LIMIT,
  MIN_PROJECTS_FOR_FILTERS,
  shouldShowProjectFilters,
} from '@/lib/projects'
import type { Project } from '@/types/content'

describe('layout do portfólio', () => {
  const fakeProjects = (count: number) =>
    Array.from({ length: count }, (_, index) => ({ slug: `p${index}` }) as Project)

  it('a página inicial mostra no máximo duas fileiras de projetos', () => {
    expect(HOME_PROJECTS_LIMIT).toBe(6)
    expect(getHomeProjects(fakeProjects(4))).toHaveLength(4)
    expect(getHomeProjects(fakeProjects(12)).map((project) => project.slug)).toEqual([
      'p0',
      'p1',
      'p2',
      'p3',
      'p4',
      'p5',
    ])
  })

  it('a página /projetos recebe os projetos que não cabem na inicial', () => {
    expect(getMoreProjects(fakeProjects(4))).toHaveLength(0)
    expect(getMoreProjects(fakeProjects(9)).map((project) => project.slug)).toEqual([
      'p6',
      'p7',
      'p8',
    ])
  })

  it('as vagas abertas completam a última fileira e o mínimo da página', () => {
    expect(countOpenSlots(4)).toBe(2)
    expect(countOpenSlots(5)).toBe(1)
    expect(countOpenSlots(6)).toBe(0)
    expect(countOpenSlots(0, 12)).toBe(12)
    expect(countOpenSlots(7, 12)).toBe(5)
    expect(countOpenSlots(13, 12)).toBe(2)
  })

  it('o link para mais projetos só aparece quando sobram projetos', () => {
    expect(hasMoreProjects(fakeProjects(6))).toBe(false)
    expect(hasMoreProjects(fakeProjects(7))).toBe(true)
  })

  it('mostra filtros apenas a partir de 6 projetos', () => {
    expect(MIN_PROJECTS_FOR_FILTERS).toBe(6)
    expect(shouldShowProjectFilters(5)).toBe(false)
    expect(shouldShowProjectFilters(6)).toBe(true)
  })
})
