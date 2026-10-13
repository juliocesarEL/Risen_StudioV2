import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/app/globals.css'
import { Footer } from '@/components/layout/footer'
import { MAIN_CONTENT_ID } from '@/components/layout/layout-markers'
import { Navbar } from '@/components/layout/navbar'
import { SkipLink } from '@/components/layout/skip-link'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { BrandSvgDefs } from '@/components/shared/logo'
import { RevealController } from '@/components/shared/reveal-controller'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { getSiteUrl } from '@/lib/site-url'
import { cn } from '@/lib/utils'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'
import { brandColors } from '@/styles/brand-colors'
import { fontVariables } from '@/styles/fonts'

import type { Metadata, Viewport } from 'next'

/** O site inteiro é pré-renderizado: o build falha se algo passar a depender da requisição. */
export const ensureStatic = 'navigation'

const JS_ENABLED_SCRIPT = "document.documentElement.classList.add('js')"

/**
 * Os scripts da Vercel Analytics e do Speed Insights só existem quando o site
 * roda na Vercel (a variável VERCEL é definida lá, já no build). Em outro
 * servidor, eles responderiam 404 e gerariam erros no console.
 */
const isVercel = Boolean(process.env.VERCEL)

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: siteConfig.seo.title, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: brandColors.bg,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: o script abaixo adiciona a classe "js" antes da hidratação.
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={cn('dark', fontVariables)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip">
        {/* Executa antes de pintar o conteúdo: só com JS as entradas animadas começam ocultas. */}
        <script dangerouslySetInnerHTML={{ __html: JS_ENABLED_SCRIPT }} />
        <SkipLink />
        <BrandSvgDefs />
        <Navbar />
        <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealController />
        <WhatsAppFloat href={getStudioWhatsAppUrl()} label={uiCopy.whatsappFloat} />
        <Toaster position="bottom-center" />
        {isVercel ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  )
}
