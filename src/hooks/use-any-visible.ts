import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Ignora os últimos 10% da altura da tela: um elemento só conta como visível
 * depois de entrar de fato (encostar na borda inferior não basta).
 */
const VISIBILITY_MARGIN = '0px 0px -10% 0px'

/** true enquanto algum elemento que corresponde a `selector` estiver visível na tela. */
export function useAnyVisible(selector: string): boolean {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(selector))
    if (targets.length === 0) return

    const intersecting = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target)
          else intersecting.delete(entry.target)
        })
        setVisible(intersecting.size > 0)
      },
      { rootMargin: VISIBILITY_MARGIN },
    )
    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      setVisible(false)
    }
    // Os elementos mudam a cada página: reconectamos quando a rota muda.
  }, [selector, pathname])

  return visible
}
