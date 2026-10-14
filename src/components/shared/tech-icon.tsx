import {
  type SimpleIcon,
  siExpress,
  siJavascript,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSqlite,
  siTypescript,
} from 'simple-icons'

import { cn } from '@/lib/utils'
import type { TechIconId } from '@/types/content'

const techIcons: Record<TechIconId, SimpleIcon> = {
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  nodejs: siNodedotjs,
  express: siExpress,
  sqlite: siSqlite,
  postgresql: siPostgresql,
}

/** Abaixo desta luminância, a cor oficial some sobre o fundo escuro do site. */
const MIN_LUMINANCE = 0.06
/** Quanto da cor oficial fica quando ela precisa ser clareada. */
const DARK_BRAND_SHARE = '35%'

function relativeLuminance(hex: string): number {
  const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const [r = 0, g = 0, b = 0] = channels.map((value) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Cor oficial da tecnologia (vinda do simple-icons). Marcas muito escuras
 * (Express, SQLite) são misturadas ao branco do texto para continuarem legíveis.
 */
function brandColor(id: TechIconId): string {
  const { hex } = techIcons[id]
  return relativeLuminance(hex) < MIN_LUMINANCE
    ? `color-mix(in srgb, #${hex} ${DARK_BRAND_SHARE}, var(--text))`
    : `#${hex}`
}

interface TechIconProps {
  id: TechIconId
  className?: string
  /** Usa a cor oficial da marca em vez da cor do texto ao redor. */
  tinted?: boolean
}

/** Logotipo de uma tecnologia. */
export function TechIcon({ id, className, tinted = false }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('size-5 fill-current', className)}
      style={tinted ? { color: brandColor(id) } : undefined}
    >
      <path d={techIcons[id].path} />
    </svg>
  )
}
