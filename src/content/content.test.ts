import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { faq } from '@/content/faq'
import { needs } from '@/content/needs'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { siteConfig } from '@/content/site'

const publicFile = (src: string) => join(process.cwd(), 'public', src)
const enabledProjectTypes = new Set(
  siteConfig.contactForm.projectTypes.filter((type) => type.enabled).map((type) => type.id),
)

/** Integridade do conteúdo: evita links quebrados e regras de negócio violadas ao editar os dados. */
describe('conteúdo', () => {
  it('cada projeto tem slug único', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(projects.filter((project) => project.hasCaseStudy))(
    'o estudo de caso "$slug" tem um arquivo MDX',
    (project) => {
      expect(existsSync(join(process.cwd(), 'src/content/projects', `${project.slug}.mdx`))).toBe(
        true,
      )
    },
  )

  it.each(projects)('as imagens de "$slug" existem e têm texto alternativo', (project) => {
    for (const image of [project.cover, ...(project.gallery ?? [])]) {
      expect(existsSync(publicFile(image.src)), image.src).toBe(true)
      expect(image.alt.trim().length).toBeGreaterThan(10)
    }
  })

  it('projetos de exemplo nunca se apresentam como trabalho de cliente', () => {
    const placeholders = projects.filter((project) => project.placeholder)
    expect(placeholders.every((project) => project.kind !== 'cliente')).toBe(true)
  })

  it('os CTAs de serviços e de necessidades usam tipos de projeto ativos no formulário', () => {
    const projectTypes = [
      ...services.map((service) => service.cta.projectType),
      ...needs.map((need) => need.projectType),
    ]
    for (const projectType of projectTypes) {
      expect(enabledProjectTypes.has(projectType), projectType).toBe(true)
    }
  })

  it('o FAQ não fixa preços nem prazos', () => {
    for (const item of faq) {
      expect(item.answer, item.question).not.toMatch(/R\$|\d+\s*(dias|semanas|meses|horas)/i)
    }
  })

  it('o número de WhatsApp tem apenas dígitos, com DDI', () => {
    expect(siteConfig.contact.whatsapp.number).toMatch(/^\d{12,13}$/)
  })
})
