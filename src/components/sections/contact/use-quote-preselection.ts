import { useEffect, useEffectEvent } from 'react'

import { readProjectTypeFromUrl, subscribeToQuoteIntent } from '@/lib/quote-intent'

/**
 * Aplica o tipo de projeto vindo da URL (`?tipo=`) ao abrir a página e o que
 * for escolhido depois pelos CTAs da própria página.
 */
export function useQuotePreselection(
  validProjectTypes: readonly string[],
  onSelect: (projectType: string) => void,
) {
  const select = useEffectEvent((projectType: string | null | undefined) => {
    if (projectType && validProjectTypes.includes(projectType)) onSelect(projectType)
  })

  useEffect(() => {
    select(readProjectTypeFromUrl())
    return subscribeToQuoteIntent((projectType) => select(projectType))
  }, [])
}
