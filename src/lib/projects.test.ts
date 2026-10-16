import { describe, expect, it } from 'vitest'

import {
  getProjectsLayout,
  MIN_PROJECTS_FOR_FILTERS,
  MIN_PROJECTS_FOR_GRID,
  shouldShowProjectFilters,
} from '@/lib/projects'

describe('layout do portfólio', () => {
  it('com poucos projetos, o convite ao próximo completa a grade', () => {
    expect(getProjectsLayout(0)).toBe('with-invite')
    expect(getProjectsLayout(MIN_PROJECTS_FOR_GRID - 1)).toBe('with-invite')
  })

  it('usa a grade a partir de 3 projetos', () => {
    expect(getProjectsLayout(MIN_PROJECTS_FOR_GRID)).toBe('grid')
    expect(getProjectsLayout(12)).toBe('grid')
  })

  it('mostra filtros apenas a partir de 6 projetos', () => {
    expect(MIN_PROJECTS_FOR_FILTERS).toBe(6)
    expect(shouldShowProjectFilters(5)).toBe(false)
    expect(shouldShowProjectFilters(6)).toBe(true)
  })
})
