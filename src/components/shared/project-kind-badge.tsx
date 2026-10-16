import { Badge } from '@/components/ui/badge'
import { projectsSection } from '@/content/sections'
import { cn } from '@/lib/utils'
import type { ProjectKind } from '@/types/content'

/**
 * O estilo comunica a origem do projeto: preenchido para cliente, contorno em
 * destaque para colaboração, fundo suave para autoral e tracejado para conceito.
 */
const kindStyles: Record<ProjectKind, string> = {
  autoral: 'border-accent/45 bg-accent-soft text-foreground',
  colaboracao: 'border-accent bg-transparent text-accent',
  cliente: 'border-transparent bg-accent text-on-accent',
  conceito: 'border-dashed border-line-2 bg-transparent text-quote',
}

export function ProjectKindBadge({ kind, className }: { kind: ProjectKind; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-6 px-2.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase',
        kindStyles[kind],
        className,
      )}
    >
      {projectsSection.kindLabels[kind]}
    </Badge>
  )
}
