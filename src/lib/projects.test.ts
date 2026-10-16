import { describe, expect, it } from 'vitest'

import {
  MIN_PROJECTS_FOR_FILTERS,
  shouldShowNextProjectInvite,
  shouldShowProjectFilters,
} from '@/lib/projects'

describe('layout do portfólio', () => {
  it('o convite ao próximo projeto completa a última fileira', () => {
    expect(shouldShowNextProjectInvite(0)).toBe(true)
    expect(shouldShowNextProjectInvite(1)).toBe(true)
    expect(shouldShowNextProjectInvite(2)).toBe(true)
    expect(shouldShowNextProjectInvite(4)).toBe(true)
  })

  it('sem convite quando as fileiras fecham', () => {
    expect(shouldShowNextProjectInvite(3)).toBe(false)
    expect(shouldShowNextProjectInvite(6)).toBe(false)
  })

  it('mostra filtros apenas a partir de 6 projetos', () => {
    expect(MIN_PROJECTS_FOR_FILTERS).toBe(6)
    expect(shouldShowProjectFilters(5)).toBe(false)
    expect(shouldShowProjectFilters(6)).toBe(true)
  })
})
