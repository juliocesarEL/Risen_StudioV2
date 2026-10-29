import { describe, expect, it } from 'vitest'

import { faq } from '@/content/faq'
import { services } from '@/content/services'
import { siteConfig } from '@/content/site'
import { getPublishedProjects } from '@/lib/projects'
import { buildFounderJsonLd, buildOrganizationJsonLd } from '@/lib/seo/json-ld'
import { buildLlmsTxt } from '@/lib/seo/llms-txt'

const urlOf = (icon: string) => siteConfig.social.find((network) => network.icon === icon)?.url

describe('dados estruturados', () => {
  const organization = buildOrganizationJsonLd()
  const founder = buildFounderJsonLd()

  it('liga a empresa ao fundador pelo mesmo @id', () => {
    expect(organization.founder).toEqual({ '@id': founder['@id'] })
    expect(founder.worksFor).toEqual({ '@id': organization['@id'] })
  })

  it('separa os perfis: LinkedIn e GitHub são do fundador, Instagram é da empresa', () => {
    expect(founder.sameAs).toEqual([urlOf('linkedin'), urlOf('github')])
    expect(organization.sameAs).toEqual([urlOf('instagram')])
  })

  it('descreve cada frente de serviço como um Service', () => {
    const catalog = organization.hasOfferCatalog as {
      itemListElement: { itemOffered: { '@type': string; name: string } }[]
    }
    expect(catalog.itemListElement.map((offer) => offer.itemOffered.name)).toEqual(
      services.map((service) => service.title),
    )
    expect(catalog.itemListElement.every((offer) => offer.itemOffered['@type'] === 'Service')).toBe(
      true,
    )
  })
})

describe('llms.txt', () => {
  const text = buildLlmsTxt()

  it('segue o formato: título, resumo e seções', () => {
    expect(text.startsWith(`# ${siteConfig.name}\n\n> `)).toBe(true)
    for (const heading of ['## Serviços', '## Projetos', '## Perguntas frequentes', '## Contato']) {
      expect(text).toContain(heading)
    }
  })

  it('traz os serviços, os projetos publicados, a FAQ e o contato', () => {
    for (const service of services) expect(text).toContain(service.title)
    for (const project of getPublishedProjects()) expect(text).toContain(project.name)
    for (const item of faq) expect(text).toContain(item.question)
    expect(text).toContain(siteConfig.contact.whatsapp.display)
  })

  it('não tem campos vazios', () => {
    expect(text).not.toMatch(/undefined|null/)
  })
})
