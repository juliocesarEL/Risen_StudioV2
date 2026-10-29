import { services } from '@/content/services'
import { siteConfig } from '@/content/site'
import { absoluteUrl } from '@/lib/site-url'
import type { FAQItem, Project } from '@/types/content'

export type JsonLdObject = { '@context'?: string; '@type': string } & Record<string, unknown>

const SCHEMA_CONTEXT = 'https://schema.org'
const ORGANIZATION_ID_FRAGMENT = '#organizacao'

const organizationId = () => absoluteUrl(`/${ORGANIZATION_ID_FRAGMENT}`)
const founderId = () => absoluteUrl('/#fundador')

/** Perfis pessoais do fundador; os demais (Instagram) são da empresa. */
const FOUNDER_PROFILES = new Set(['linkedin', 'github'])

/**
 * O site em si. O Google usa o `name` daqui como nome do site nos resultados
 * de busca (no lugar do endereço "risenstudio.com.br").
 */
export function buildWebSiteJsonLd(): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': absoluteUrl('/#site'),
    name: siteConfig.name,
    alternateName: ['Risen', 'risenstudio.com.br'],
    url: absoluteUrl('/'),
    inLanguage: siteConfig.locale,
    publisher: { '@id': organizationId() },
  }
}

/** Estúdio como negócio local (ProfessionalService é um tipo de LocalBusiness). */
export function buildOrganizationJsonLd(): JsonLdObject {
  const { location, contact, social } = siteConfig
  const areaServed = [
    ...location.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    { '@type': 'Country', name: 'Brasil' },
  ]

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ProfessionalService',
    '@id': organizationId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.seo.description,
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/og-image.jpeg'),
    logo: absoluteUrl('/brand/icon-512.png'),
    ...(contact.email ? { email: contact.email } : {}),
    telephone: `+${contact.whatsapp.number}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: location.country,
    },
    areaServed,
    founder: { '@id': founderId() },
    // As três frentes de serviço, cada uma descrita como um Service.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          serviceType: service.shortTitle,
          description: service.description,
          areaServed,
          provider: { '@id': organizationId() },
        },
      })),
    },
    knowsAbout: services.flatMap((service) => [
      service.title,
      ...service.examples
        .filter((example) => example.enabled !== false)
        .map((example) => example.label),
    ]),
    sameAs: social
      .filter((network) => !FOUNDER_PROFILES.has(network.icon))
      .map((network) => network.url),
  }
}

/**
 * O fundador como pessoa: quem está por trás do estúdio, com o LinkedIn e o
 * GitHub dele. Assistentes de IA e o Google usam isso para ligar a marca à
 * pessoa que a conduz.
 */
export function buildFounderJsonLd(): JsonLdObject {
  const { founder, social, technologies } = siteConfig

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Person',
    '@id': founderId(),
    name: founder.name,
    jobTitle: 'Desenvolvedor full stack',
    description: founder.bio.join(' '),
    image: absoluteUrl(founder.photo.src),
    worksFor: { '@id': organizationId() },
    knowsAbout: ['Ciência da Computação', ...technologies.map((technology) => technology.name)],
    sameAs: social
      .filter((network) => FOUNDER_PROFILES.has(network.icon))
      .map((network) => network.url),
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
