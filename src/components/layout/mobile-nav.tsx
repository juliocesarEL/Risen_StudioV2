'use client'

import { ArrowRight, MapPin, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import '@/components/layout/mobile-nav.css'
import { CTAButton } from '@/components/shared/cta-button'
import { GhostMark, Logo } from '@/components/shared/logo'
import { SocialGlyph } from '@/components/shared/social-glyph'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { NavItem } from '@/content/navigation'
import { useActiveSection } from '@/hooks/use-active-section'
import type { SocialLink } from '@/types/content'

import type { CSSProperties, MouseEvent } from 'react'

interface MobileNavProps {
  items: NavItem[]
  social: SocialLink[]
  copy: {
    navLabel: string
    openMenu: string
    closeMenu: string
    menuTitle: string
    menuDescription: string
    contactNote: string
    quoteCta: string
    whatsappCta: string
    newTabHint: string
  }
  whatsappHref: string
}

/** Cliques com Ctrl/Cmd/Shift ou botão do meio ficam com o navegador (nova aba, etc.). */
function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Posição de cada peça na cascata de entrada (mobile-nav.css). */
const stagger = (index: number) => ({ '--i': index }) as CSSProperties

/**
 * Menu para telas menores, em tela cheia (Sheet do shadcn/ui): prende o foco
 * enquanto aberto, fecha com Esc e devolve o foco ao botão — exceto quando um
 * link leva a outra parte da página, caso em que o foco segue o destino.
 *
 * Os links não navegam no clique: o menu fecha primeiro e só depois a página
 * rola até a seção. Navegar no mesmo clique não funciona: o link some com o
 * menu, o Link do Next cancela a navegação e a rolagem fica travada pelo menu.
 *
 * Visual: os campos de cor da marca nos cantos e o R em contorno ao fundo,
 * como no hero; seções grandes, cada uma com uma linha do que tem lá; a seção
 * em que a pessoa está fica marcada; contato e redes no rodapé.
 */
export function MobileNav({ items, social, copy, whatsappHref }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const navigatingRef = useRef(false)
  /** Destino escolhido no menu, seguido assim que o menu termina de fechar. */
  const pendingHrefRef = useRef<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = useActiveSection(
    items.map((item) => item.sectionId),
    pathname === '/',
  )

  function closeForNavigation() {
    navigatingRef.current = true
    setOpen(false)
  }

  /** Clique num link do menu: guarda o destino (o href do próprio link) e fecha o menu. */
  function handleNavClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedClick(event)) return
    event.preventDefault()
    pendingHrefRef.current = event.currentTarget.getAttribute('href')
    closeForNavigation()
  }

  /** Com o menu fechado (e a rolagem liberada): rola até a seção ou troca de página. */
  function followPendingHref() {
    const href = pendingHrefRef.current
    pendingHrefRef.current = null
    if (!href) return

    const [path = '/', hash] = href.split('#')
    if (pathname !== (path || '/')) {
      router.push(href)
      return
    }

    const target = hash ? document.getElementById(hash) : null
    window.history.pushState(null, '', hash ? `#${hash}` : path)
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      })
      // O foco segue o destino, para leitores de tela anunciarem a seção.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={copy.openMenu}>
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        // A largura repete o seletor do Sheet base (data-[side=right]) para substituí-lo.
        className="mnav isolate gap-0 overflow-hidden border-line bg-background pb-[env(safe-area-inset-bottom)] data-[side=right]:w-full data-[side=right]:sm:max-w-md"
        onCloseAutoFocus={(event) => {
          if (navigatingRef.current) event.preventDefault()
          navigatingRef.current = false
          // Um quadro depois: a trava de rolagem do menu já saiu da página.
          requestAnimationFrame(followPendingHref)
        }}
      >
        {/* Fundo: campos de cor da marca nos cantos e o R em contorno, como no hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_40%_at_0%_0%,color-mix(in_srgb,var(--field-blue)_30%,transparent),transparent_70%),radial-gradient(80%_45%_at_100%_100%,color-mix(in_srgb,var(--field-violet)_40%,transparent),transparent_70%)]"
        />
        <GhostMark className="mnav-mark pointer-events-none absolute -right-24 -bottom-20 -z-10 size-[26rem] text-foreground/[0.06]" />

        <div className="flex h-nav items-center justify-between gap-3 px-5">
          <Logo onClick={handleNavClick} />
          <SheetClose asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label={copy.closeMenu}
              className="size-11 rounded-pill border-line-2 bg-transparent"
            >
              <X aria-hidden="true" className="size-5" />
            </Button>
          </SheetClose>
        </div>

        <SheetTitle className="sr-only">{copy.menuTitle}</SheetTitle>
        <SheetDescription className="sr-only">{copy.menuDescription}</SheetDescription>

        <nav aria-label={copy.navLabel} className="flex-1 overflow-y-auto px-5 pt-2">
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const isActive = activeSection === item.sectionId
              return (
                <li key={item.sectionId} className="mnav-stagger relative" style={stagger(index)}>
                  <Link
                    href={`/#${item.sectionId}`}
                    onClick={handleNavClick}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex min-h-16 items-center justify-between gap-4 py-2.5"
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-center gap-3 font-display text-[1.75rem] leading-none font-semibold text-foreground font-stretch-display group-aria-current:bg-gradient-primary group-aria-current:bg-clip-text group-aria-current:text-transparent">
                        {item.label}
                      </span>
                      {item.description ? (
                        // Em telas baixas, só os nomes: o menu inteiro cabe sem rolar.
                        <span className="truncate text-sm text-subtle [@media(max-height:44rem)]:hidden">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-pill border border-line-2 text-body transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-on-accent group-aria-current:border-transparent group-aria-current:bg-accent group-aria-current:text-on-accent"
                    >
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  <span
                    aria-hidden="true"
                    className="mnav-rule absolute inset-x-0 bottom-0 h-px origin-left bg-line"
                    style={stagger(index)}
                  />
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 px-5 pt-6 pb-7">
          <div className="mnav-stagger flex flex-col gap-3" style={stagger(items.length)}>
            <CTAButton
              source="menu-mobile"
              label={copy.quoteCta}
              size="lg"
              className="w-full"
              onNavigate={closeForNavigation}
            />
            <WhatsAppButton
              href={whatsappHref}
              source="menu-mobile"
              label={copy.whatsappCta}
              size="lg"
              className="w-full"
            />
          </div>

          <div
            // Telas muito baixas (iPhone SE): sem esta linha, os 5 itens cabem sem rolar.
            className="mnav-stagger flex items-center justify-between gap-4 [@media(max-height:37.5rem)]:hidden"
            style={stagger(items.length + 1)}
          >
            <p className="flex items-start gap-2 text-xs text-subtle">
              <MapPin aria-hidden="true" className="mt-px size-3.5 shrink-0 text-accent" />
              {copy.contactNote}
            </p>
            <ul className="flex shrink-0 gap-1.5">
              {social.map((network) => (
                <li key={network.url}>
                  <a
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-line bg-chip text-body transition-colors hover:border-line-2 hover:text-foreground"
                  >
                    <SocialGlyph icon={network.icon} />
                    <span className="sr-only">
                      {network.label} {copy.newTabHint}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
