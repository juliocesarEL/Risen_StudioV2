import { faq } from '@/content/faq'
import { privacyLink } from '@/content/navigation'
import { processSteps } from '@/content/process'
import { projectsSection } from '@/content/sections'
import { services } from '@/content/services'
import { siteConfig } from '@/content/site'
import { getPublishedProjects } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site-url'
import type { Project } from '@/types/content'

/** O destino que o site oferece para cada projeto: a página dele ou o site no ar. */
function projectUrl(project: Project): string | undefined {
  return project.hasCaseStudy ? absoluteUrl(`/projetos/${project.slug}`) : project.liveUrl
}

const listFormat = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })

/** "sites institucionais, landing pages e portfólios profissionais" */
function formatExamples(examples: { label: string; enabled?: boolean }[]): string {
  return listFormat.format(
    examples
      .filter((example) => example.enabled !== false)
      .map(
        (example) => example.label.charAt(0).toLocaleLowerCase('pt-BR') + example.label.slice(1),
      ),
  )
}

/**
 * Conteúdo do /llms.txt (https://llmstxt.org): um resumo em Markdown para
 * assistentes de IA (ChatGPT, Claude, Perplexity, Gemini...) entenderem e
 * citarem a Risen Studio. Gerado a partir do mesmo conteúdo do site, para
 * nunca ficar desatualizado.
 */
export function buildLlmsTxt(): string {
  const { location, contact, founder, social } = siteConfig
  const areas = `${listFormat.format(location.serviceAreas)}, e de forma remota para todo o Brasil`
  const projects = getPublishedProjects()

  const sections = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.seo.description}`,
    [
      `${siteConfig.name} é um estúdio de design e desenvolvimento web em ${location.city}, ${location.state}, conduzido pelo fundador, ${founder.name}, desenvolvedor full stack formado em Ciência da Computação.`,
      `Atende empresas, profissionais liberais e prestadores de serviço em ${areas}. O cliente fala direto com quem desenha e programa o projeto, do primeiro contato à entrega.`,
    ].join(' '),

    '## Serviços',
    services
      .map(
        (service) =>
          `- **${service.title}**: ${service.description} Exemplos: ${formatExamples(service.examples)}.`,
      )
      .join('\n'),

    '## Como funciona',
    processSteps
      .map((step, index) => `${index + 1}. **${step.title}**: ${step.description}`)
      .join('\n'),

    '## Projetos',
    projects
      .map((project) => {
        const url = projectUrl(project)
        const name = url ? `[${project.name}](${url})` : project.name
        return `- ${name} (${projectsSection.kindLabels[project.kind]}): ${project.summary}`
      })
      .join('\n'),

    '## Perguntas frequentes',
    faq.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n'),

    '## Fundador',
    `**${founder.name}**, fundador da ${siteConfig.name} e desenvolvedor full stack. Nas palavras dele: “${founder.bio.join(' ')}”`,

    '## Contato',
    [
      `- Orçamento pelo site: ${absoluteUrl('/#contato')}`,
      `- WhatsApp: ${contact.whatsapp.display} (https://wa.me/${contact.whatsapp.number})`,
      ...(contact.email ? [`- E-mail: ${contact.email}`] : []),
      ...social.map((network) => `- ${network.label}: ${network.url}`),
    ].join('\n'),

    '## Páginas',
    [
      `- [Página inicial](${absoluteUrl('/')}): serviços, projetos, processo, sobre, perguntas frequentes e contato.`,
      ...projects
        .filter((project) => project.hasCaseStudy)
        .map((project) => `- [${project.name}](${absoluteUrl(`/projetos/${project.slug}`)})`),
      `- [${privacyLink.label}](${absoluteUrl(privacyLink.href)})`,
    ].join('\n'),
  ]

  return `${sections.join('\n\n')}\n`
}
