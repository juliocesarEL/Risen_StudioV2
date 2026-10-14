'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavItem } from '@/content/navigation'
import { useActiveSection } from '@/hooks/use-active-section'

interface DesktopNavProps {
  items: NavItem[]
  label: string
}

export function DesktopNav({ items, label }: DesktopNavProps) {
  const pathname = usePathname()
  const activeSection = useActiveSection(
    items.map((item) => item.sectionId),
    pathname === '/',
  )

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeSection === item.sectionId
          return (
            <li key={item.sectionId}>
              <Link
                href={`/#${item.sectionId}`}
                aria-current={isActive ? 'true' : undefined}
                // A seção atual vira uma "aba" aberta, como as abas da bancada do hero.
                className="group relative inline-flex h-11 items-center rounded-lg px-4 text-sm text-body transition-colors duration-300 hover:text-foreground aria-current:bg-surface-hover aria-current:text-foreground"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-primary transition-transform duration-500 ease-out group-hover:scale-x-40 group-aria-current:scale-x-100"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
