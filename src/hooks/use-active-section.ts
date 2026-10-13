import { useEffect, useState } from 'react'

/**
 * Faixa central da tela usada para decidir a seção ativa: uma seção é
 * considerada "atual" quando cruza a região entre 40% e 55% da altura.
 */
const ACTIVE_BAND = '-40% 0px -45% 0px'

/**
 * Retorna o id da seção (entre `sectionIds`) que está no meio da tela, ou null
 * quando a faixa central mostra outra parte da página.
 */
export function useActiveSection(sectionIds: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)
  const idsKey = sectionIds.join('|')

  useEffect(() => {
    if (!enabled) return

    const ids = idsKey.split('|')
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const intersecting = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        })
        setActiveId(ids.find((id) => intersecting.has(id)) ?? null)
      },
      { rootMargin: ACTIVE_BAND },
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      setActiveId(null)
    }
  }, [idsKey, enabled])

  return enabled ? activeId : null
}
