'use client'

import { useEffect } from 'react'

import { trackCaseStudyOpen } from '@/lib/analytics'

/** Registra a abertura do estudo de caso (inclusive em acessos diretos). */
export function TrackCaseStudyView({ slug }: { slug: string }) {
  useEffect(() => {
    trackCaseStudyOpen(slug)
  }, [slug])

  return null
}
