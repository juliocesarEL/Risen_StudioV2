import { DesktopNav } from '@/components/layout/desktop-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { NavbarShell } from '@/components/layout/navbar-shell'
import { CTAButton } from '@/components/shared/cta-button'
import { Logo } from '@/components/shared/logo'
import { mainNav, quoteCtaLabel, quoteCtaShortLabel } from '@/content/navigation'
import { uiCopy } from '@/content/ui'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'

export function Navbar() {
  return (
    <NavbarShell>
      <div className="container-page flex h-nav items-center justify-between gap-3">
        <Logo />
        <DesktopNav items={mainNav} label={uiCopy.navLabel} />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CTAButton source="navbar" label={quoteCtaLabel} showArrow={false} className="px-4">
            <span className="sm:hidden">{quoteCtaShortLabel}</span>
            <span className="hidden sm:inline">{quoteCtaLabel}</span>
          </CTAButton>
          <MobileNav
            items={mainNav}
            whatsappHref={getStudioWhatsAppUrl()}
            copy={{
              navLabel: uiCopy.navLabel,
              openMenu: uiCopy.openMenu,
              menuTitle: uiCopy.menuTitle,
              menuDescription: uiCopy.menuDescription,
              quoteCta: quoteCtaLabel,
              whatsappCta: uiCopy.whatsappFloat,
            }}
          />
        </div>
      </div>
    </NavbarShell>
  )
}
