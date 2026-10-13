import { siWhatsapp } from 'simple-icons'

import { cn } from '@/lib/utils'

/** Símbolo do WhatsApp (usa a cor do texto ao redor). */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('size-4 fill-current', className)}
    >
      <path d={siWhatsapp.path} />
    </svg>
  )
}
