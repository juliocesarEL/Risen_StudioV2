'use client'

import { HIDE_WHATSAPP_FLOAT_ATTRIBUTE } from '@/components/layout/layout-markers'
import { WhatsAppLink } from '@/components/shared/whatsapp-button'
import { WhatsAppGlyph } from '@/components/shared/whatsapp-glyph'
import { useAnyVisible } from '@/hooks/use-any-visible'

/**
 * Botão flutuante de WhatsApp, presente em todas as páginas. Some quando o
 * formulário ou o rodapé estão visíveis, para não cobrir o botão de envio
 * nem links importantes no celular.
 */
export function WhatsAppFloat({ href, label }: { href: string; label: string }) {
  const hidden = useAnyVisible(`[${HIDE_WHATSAPP_FLOAT_ATTRIBUTE}]`)

  return (
    <WhatsAppLink
      href={href}
      source="botao-flutuante"
      aria-label={label}
      inert={hidden}
      data-hidden={hidden}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-on-accent shadow-card ring-4 ring-background/60 transition-[opacity,transform,filter] duration-300 hover:brightness-110 focus-visible:outline-offset-4 data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-3 data-[hidden=true]:opacity-0 motion-reduce:transition-none"
    >
      <WhatsAppGlyph className="size-7" />
    </WhatsAppLink>
  )
}
