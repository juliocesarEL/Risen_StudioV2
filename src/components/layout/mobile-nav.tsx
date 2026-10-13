'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { CTAButton } from '@/components/shared/cta-button'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { NavItem } from '@/content/navigation'

interface MobileNavProps {
  items: NavItem[]
  copy: {
    navLabel: string
    openMenu: string
    menuTitle: string
    menuDescription: string
    quoteCta: string
    whatsappCta: string
  }
  whatsappHref: string
}

/**
 * Menu para telas menores (Sheet do shadcn/ui): prende o foco enquanto aberto,
 * fecha com Esc e devolve o foco ao botão — exceto quando um link leva a
 * outra parte da página, caso em que o foco segue o destino.
 */
export function MobileNav({ items, copy, whatsappHref }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const navigatingRef = useRef(false)

  function closeForNavigation() {
    navigatingRef.current = true
    setOpen(false)
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
        className="w-full gap-0 border-line bg-bg2 pb-[env(safe-area-inset-bottom)] sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          if (navigatingRef.current) event.preventDefault()
          navigatingRef.current = false
        }}
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="eyebrow text-subtle">{copy.menuTitle}</SheetTitle>
          <SheetDescription className="sr-only">{copy.menuDescription}</SheetDescription>
        </SheetHeader>

        <nav aria-label={copy.navLabel} className="px-6 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.sectionId} className="border-b border-line/70 last:border-b-0">
                <SheetClose asChild>
                  <Link
                    href={`/#${item.sectionId}`}
                    onClick={() => (navigatingRef.current = true)}
                    className="flex min-h-14 items-center font-display text-3xl font-semibold text-foreground font-stretch-display transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="gap-3 px-6 pb-8">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
