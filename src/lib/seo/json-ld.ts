import { services } from '@/content/services'
import { siteConfig } from '@/content/site'
import { absoluteUrl } from '@/lib/site-url'
import type { FAQItem, Project } from '@/types/content'

export type JsonLdObject = { '@context'?: string; '@type': string } & Record<string, unknown>

const SCHEMA_CONTEXT = 'https://schema.org'
const ORGANIZATION_ID_FRAGMENT = '#organizacao'

const organizationId = () => absoluteUrl(`/${ORGANIZATION_ID_FRAGMENT}`)

/** Estúdio como negócio local (ProfessionalService é um tipo de LocalBusiness). */
export function buildOrganizationJsonLd(): JsonLdObject {
  const { location, contact, social } = siteConfig

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ProfessionalService',
    '@id': organizationId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.seo.description,
    url: absoluteUrl('/'),
    image: absoluteUrl('/opengraph-image'),
    logo: absoluteUrl('/icon.png'),
    email: contact.email,
    telephone: `+${contact.whatsapp.number}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: location.country,
    },
    areaServed: [
      ...location.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
      { '@type': 'Country', name: 'Brasil' },
    ],
    knowsAbout: services.flatMap((service) => [
      service.title,
      ...service.examples
        .filter((example) => example.enabled !== false)
        .map((example) => example.label),
    ]),
    sameAs: social.map((network) => network.url),
  }
}

export function buildFaqPageJsonLd(items: FAQItem[]): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildCaseStudyJsonLd(project: Project): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'CreativeWork',
    name: project.name,
    abstract: project.summary,
    url: absoluteUrl(`/projetos/${project.slug}`),
    image: absoluteUrl(project.cover.src),
    creator: { '@id': organizationId() },
    keywords: project.stack?.join(', '),
  }
}
