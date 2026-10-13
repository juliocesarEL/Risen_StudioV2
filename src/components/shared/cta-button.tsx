'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { type CtaSource, trackCtaClick } from '@/lib/analytics'
import { buildQuoteHref, requestQuote } from '@/lib/quote-intent'
import { cn } from '@/lib/utils'
import type { ProjectTypeId } from '@/types/content'

import type { ComponentProps, MouseEvent, ReactNode } from 'react'

type ButtonStyleProps = Pick<ComponentProps<typeof Button>, 'variant' | 'size' | 'className'>

/** Cliques com Ctrl/Cmd/Shift ou botão do meio ficam com o navegador (nova aba, etc.). */
function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

interface CTAButtonProps extends ButtonStyleProps {
  /** Texto do botão (também enviado ao analytics). */
  label: string
  source: CtaSource
  /** Tipo de projeto já selecionado no formulário. */
  projectType?: ProjectTypeId
  /** Conteúdo visual alternativo (ex.: rótulo curto em telas pequenas). */
  children?: ReactNode
  showArrow?: boolean
  onNavigate?: () => void
}

/**
 * CTA de orçamento. Leva ao formulário com o tipo de projeto pré-selecionado:
 * na home, rola até ele sem recarregar; em outras páginas, navega para a home.
 */
export function CTAButton({
  label,
  source,
  projectType,
  children,
  showArrow = true,
  onNavigate,
  variant = 'gradient',
  size,
  className,
}: CTAButtonProps) {
  const pathname = usePathname()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackCtaClick(source, { label, projectType })
    onNavigate?.()
    if (pathname !== '/' || isModifiedClick(event)) return
    event.preventDefault()
    requestQuote(projectType)
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={buildQuoteHref(projectType)} onClick={handleClick}>
        {children ?? label}
        {showArrow ? (
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/button:translate-x-0.5"
          />
        ) : null}
      </Link>
    </Button>
  )
}

interface CTALinkProps extends ButtonStyleProps {
  label: string
  href: string
  source: CtaSource
  children?: ReactNode
}

/** CTA de navegação comum (ex.: "Explorar projetos"), com registro no analytics. */
export function CTALink({
  label,
  href,
  source,
  children,
  variant = 'outline',
  size,
  className,
}: CTALinkProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={href} onClick={() => trackCtaClick(source, { label })}>
        {children ?? label}
      </Link>
    </Button>
  )
}
