import {
  ClipboardList,
  Code,
  Compass,
  Layers,
  LifeBuoy,
  type LucideIcon,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Workflow,
} from 'lucide-react'

import type { IconName } from '@/types/content'

const icons: Record<IconName, LucideIcon> = {
  layout: PanelsTopLeft,
  layers: Layers,
  workflow: Workflow,
  compass: Compass,
  'pen-tool': PenTool,
  code: Code,
  'shield-check': ShieldCheck,
  'trending-up': TrendingUp,
  rocket: Rocket,
  'life-buoy': LifeBuoy,
  search: Search,
  'clipboard-list': ClipboardList,
  'message-circle': MessageCircle,
  'map-pin': MapPin,
  'user-round': UserRound,
}

/** Ícone decorativo referenciado por nome nos arquivos de conteúdo. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name]
  return <Component aria-hidden="true" className={className} />
}
