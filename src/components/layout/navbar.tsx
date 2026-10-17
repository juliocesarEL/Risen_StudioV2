import { DesktopNav } from '@/components/layout/desktop-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { NavbarShell } from '@/components/layout/navbar-shell'
import { CTAButton } from '@/components/shared/cta-button'
import { Logo } from '@/components/shared/logo'
import { mainNav, quoteCtaLabel, quoteCtaShortLabel } from '@/content/navigation'
import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'

export function Navbar() {
  return (
    <NavbarShell>
      <div className="container-page flex h-nav items-center justify-between gap-3">
        {/* Abaixo de 400px, o logo fica só "RISEN" e, abaixo de 360px, o orçamento sai da
            barra (continua no menu e no topo da página): o botão do menu nunca sai da tela. */}
        <Logo compact />
        <DesktopNav items={mainNav} label={uiCopy.navLabel} />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CTAButton
            source="navbar"
            label={quoteCtaLabel}
            showArrow={false}
            className="px-4 max-[22.4375rem]:hidden"
          >
            <span className="sm:hidden">{quoteCtaShortLabel}</span>
            <span className="hidden sm:inline">{quoteCtaLabel}</span>
          </CTAButton>
          <MobileNav
            items={mainNav}
            social={siteConfig.social}
            whatsappHref={getStudioWhatsAppUrl()}
            copy={{
              navLabel: uiCopy.navLabel,
              openMenu: uiCopy.openMenu,
              closeMenu: uiCopy.closeMenu,
              menuTitle: uiCopy.menuTitle,
              menuDescription: uiCopy.menuDescription,
              contactNote: uiCopy.menuContactNote,
              quoteCta: quoteCtaLabel,
              whatsappCta: uiCopy.whatsappFloat,
              newTabHint: uiCopy.newTabHint,
            }}
          />
        </div>
      </div>
    </NavbarShell>
  )
}
