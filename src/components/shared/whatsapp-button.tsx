'use client'

import { WhatsAppGlyph } from '@/components/shared/whatsapp-glyph'
import { Button } from '@/components/ui/button'
import { uiCopy } from '@/content/ui'
import { trackWhatsAppClick, type WhatsAppSource } from '@/lib/analytics'

import type { ComponentProps, ReactNode } from 'react'

interface WhatsAppLinkProps extends Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> {
  /** Link wa.me já montado (ver lib/whatsapp.ts). */
  href: string
  source: WhatsAppSource
}

/** Link para o WhatsApp que abre em nova aba e registra o clique. */
export function WhatsAppLink({ href, source, onClick, children, ...props }: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackWhatsAppClick(source)
        onClick?.(event)
      }}
      {...props}
    >
      {children}
      <span className="sr-only"> {uiCopy.newTabHint}</span>
    </a>
  )
}

interface WhatsAppButtonProps extends Pick<
  ComponentProps<typeof Button>,
  'variant' | 'size' | 'className'
> {
  href: string
  source: WhatsAppSource
  label: ReactNode
}

export function WhatsAppButton({
  href,
  source,
  label,
  variant = 'outline',
  size,
  className,
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <WhatsAppLink href={href} source={source}>
        <WhatsAppGlyph />
        {label}
      </WhatsAppLink>
    </Button>
  )
}
