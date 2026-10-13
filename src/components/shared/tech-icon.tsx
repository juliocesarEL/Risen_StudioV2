import {
  type SimpleIcon,
  siFigma,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons'

import { cn } from '@/lib/utils'
import type { TechIconId } from '@/types/content'

const techIcons: Record<TechIconId, SimpleIcon> = {
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  figma: siFigma,
  vercel: siVercel,
}

/** Logotipo monocromático de uma tecnologia (usa a cor do texto ao redor). */
export function TechIcon({ id, className }: { id: TechIconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('size-5 fill-current', className)}
    >
      <path d={techIcons[id].path} />
    </svg>
  )
}
