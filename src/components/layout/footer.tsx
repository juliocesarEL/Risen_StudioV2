import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { cacheLife } from 'next/cache'
import Link from 'next/link'

import { hideWhatsAppFloatProps } from '@/components/layout/layout-markers'
import { Logo } from '@/components/shared/logo'
import { WhatsAppLink } from '@/components/shared/whatsapp-button'
import { WhatsAppGlyph } from '@/components/shared/whatsapp-glyph'
import { footerNav, privacyLink } from '@/content/navigation'
import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'

/**
 * O ano fica em cache e é revalidado diariamente: a página continua estática
 * e o ano muda sozinho na virada.
 */
async function CurrentYear() {
  'use cache'
  cacheLife('days')
  return <>{new Date().getFullYear()}</>
}

const linkClass =
  'inline-flex min-h-11 items-center gap-2 text-body transition-colors hover:text-foreground'

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="eyebrow text-subtle">{title}</h2>
      <ul className="flex flex-col">{children}</ul>
    </div>
  )
}

export function Footer() {
  const { contact, social, location } = siteConfig

  return (
    <footer {...hideWhatsAppFloatProps} className="border-t border-line bg-bg2/50">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr] lg:gap-10">
        <div className="flex max-w-sm flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="text-sm">{uiCopy.footer.description}</p>
        </div>

        <nav aria-label={uiCopy.footer.navTitle}>
          <FooterColumn title={uiCopy.footer.navTitle}>
            {footerNav.map((item) => (
              <li key={item.sectionId}>
                <Link href={`/#${item.sectionId}`} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </nav>

        <FooterColumn title={uiCopy.footer.contactTitle}>
          <li>
            <WhatsAppLink href={getStudioWhatsAppUrl()} source="rodape" className={linkClass}>
              <WhatsAppGlyph className="text-subtle" />
              {contact.whatsapp.display}
            </WhatsAppLink>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              <Mail aria-hidden="true" className="size-4 text-subtle" />
              {contact.email}
            </a>
          </li>
          <li className="inline-flex min-h-11 items-center gap-2 text-body">
            <MapPin aria-hidden="true" className="size-4 text-subtle" />
            {location.city}, {location.state}
          </li>
        </FooterColumn>

        <FooterColumn title={uiCopy.footer.socialTitle}>
          {social.map((network) => (
            <li key={network.url}>
              <a href={network.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {network.label}
                <ArrowUpRight aria-hidden="true" className="size-4 text-subtle" />
                <span className="sr-only"> {uiCopy.newTabHint}</span>
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. {uiCopy.footer.rights}
          </p>
          <Link href={privacyLink.href} className={linkClass}>
            {privacyLink.label}
          </Link>
        </div>
      </div>
    </footer>
  )
}
