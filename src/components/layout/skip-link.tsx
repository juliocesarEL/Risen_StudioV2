import { MAIN_CONTENT_ID } from '@/components/layout/layout-markers'
import { uiCopy } from '@/content/ui'

/** Primeiro item focável da página: pula a navegação direto para o conteúdo. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-pill bg-foreground px-5 py-3 text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {uiCopy.skipLink}
    </a>
  )
}
