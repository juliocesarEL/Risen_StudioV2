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
                className="group relative inline-flex h-11 items-center rounded-pill px-4 text-sm text-body transition-colors hover:text-foreground aria-[current=true]:text-foreground"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-gradient-primary transition-transform duration-300 group-aria-[current=true]:scale-x-100"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
