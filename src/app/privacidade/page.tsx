import { FilePenLine } from 'lucide-react'

import { Container } from '@/components/shared/section'
import { Eyebrow } from '@/components/shared/section-heading'
import PrivacyPolicy from '@/content/legal/privacidade.mdx'
import { privacyPage } from '@/content/legal/privacy'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: privacyPage.title,
  description: privacyPage.description,
  alternates: { canonical: '/privacidade' },
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })

export default function PrivacyPage() {
  const { draftNotice } = privacyPage

  return (
    <article className="pt-[calc(var(--nav-height)+3rem)] pb-section">
      <Container className="flex flex-col gap-10">
        <header className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>{privacyPage.eyebrow}</Eyebrow>
          <h1 className="font-display text-page-title font-bold text-foreground font-stretch-display">
            {privacyPage.title}
          </h1>
          <p className="text-lead text-body">{privacyPage.description}</p>
          <p className="text-sm text-subtle">
            {privacyPage.lastUpdatedLabel}:{' '}
            <time dateTime={privacyPage.lastUpdated}>
              {dateFormatter.format(new Date(privacyPage.lastUpdated))}
            </time>
          </p>
        </header>

        <aside
          aria-label={draftNotice.title}
          className="flex max-w-3xl gap-4 rounded-xl border border-dashed border-accent/40 bg-accent-soft p-5"
        >
          <FilePenLine aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-foreground">{draftNotice.title}</p>
            <p className="text-sm text-quote">{draftNotice.description}</p>
          </div>
        </aside>

        <div className="max-w-3xl">
          <PrivacyPolicy />
        </div>
      </Container>
    </article>
  )
}
