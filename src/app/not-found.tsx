import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/section'
import { Button } from '@/components/ui/button'
import { uiCopy } from '@/content/ui'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: uiCopy.notFound.title,
  robots: { index: false },
}

export default function NotFound() {
  const copy = uiCopy.notFound

  return (
    <Container className="flex min-h-[80svh] flex-col justify-center gap-6 pt-[calc(var(--nav-height)+3rem)] pb-section">
      <h1 className="max-w-3xl font-display text-page-title font-bold text-foreground font-stretch-display">
        {copy.title}
      </h1>
      <p className="max-w-xl text-lead text-body">{copy.description}</p>
      <Button asChild size="lg" variant="outline" className="w-fit">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          {copy.cta}
        </Link>
      </Button>
    </Container>
  )
}
