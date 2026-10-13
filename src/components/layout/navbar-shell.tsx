'use client'

import { useScrolled } from '@/hooks/use-scrolled'

import type { ReactNode } from 'react'

const SCROLL_THRESHOLD = 8

/** Cabeçalho fixo que ganha fundo translúcido quando a página é rolada. */
export function NavbarShell({ children }: { children: ReactNode }) {
  const scrolled = useScrolled(SCROLL_THRESHOLD)

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-40 border-b border-transparent pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-line/70 data-[scrolled=true]:bg-nav data-[scrolled=true]:backdrop-blur-xl"
    >
      {children}
    </header>
  )
}
