import { FilterableProjects } from '@/components/sections/projects/filterable-projects'
import { type ProjectCardCopy, ProjectCard } from '@/components/sections/projects/project-card'
import { CTAButton } from '@/components/shared/cta-button'
import { GhostMark } from '@/components/shared/logo'
import { REVEAL_STAGGER, Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { projectsSection } from '@/content/sections'
import { shouldShowNextProjectInvite, shouldShowProjectFilters } from '@/lib/projects'
import { cn } from '@/lib/utils'
import type { Project, ServiceCategoryId } from '@/types/content'

interface ProjectsProps {
  id: string
  copy: typeof projectsSection
  projects: Project[]
  categories: { id: ServiceCategoryId; label: string }[]
  newTabHint: string
}

/**
 * O convite ao próximo projeto é a região que o gradiente do R ocupa por
 * inteiro, com o R em contorno ao fundo, como na imagem oficial da marca.
 */
function NextProjectCard({ copy }: { copy: (typeof projectsSection)['nextProject'] }) {
  return (
    <div className="relative isolate flex h-full flex-col justify-between gap-8 overflow-hidden rounded-card bg-gradient-action p-6 text-on-gradient sm:p-8 lg:p-10">
      <GhostMark className="absolute -right-10 -bottom-16 -z-10 size-72 text-on-gradient/25 sm:size-80" />
      <div className="flex max-w-xl flex-col gap-3">
        <p className="font-display text-title font-semibold font-stretch-semi">{copy.title}</p>
        <p className="text-on-gradient/90">{copy.description}</p>
      </div>
      <CTAButton source="projetos" label={copy.cta} variant="inverse" className="self-start" />
    </div>
  )
}

/** Desktop (3 colunas): o convite ocupa as colunas que sobram na última fileira. */
const inviteSpanDesktop = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'] as const

/** Colunas do convite: no tablet (2 colunas), largura toda se a quantidade de projetos for par. */
function inviteSpan(count: number) {
  return cn(inviteSpanDesktop[count % 3], count % 2 === 0 && 'md:col-span-2')
}

export function Projects({ id, copy, projects, categories, newTabHint }: ProjectsProps) {
  const titleId = `${id}-titulo`
  const showInvite = shouldShowNextProjectInvite(projects.length)
  const cardCopy: ProjectCardCopy = {
    caseStudyCta: copy.caseStudyCta,
    liveCta: copy.liveCta,
    newTabHint,
  }
  const labelFor = (category: ServiceCategoryId) =>
    categories.find((item) => item.id === category)?.label ?? category

  return (
    <Section id={id} labelledBy={titleId}>
      <Container>
        <SectionHeading copy={copy.heading} titleId={titleId} />

        <div className="mt-12 sm:mt-16">
          {shouldShowProjectFilters(projects.length) ? (
            <FilterableProjects
              projects={projects}
              categories={categories}
              cardCopy={cardCopy}
              copy={{
                filterLabel: copy.filterLabel,
                filterAll: copy.filterAll,
                filterResult: copy.filterResult,
              }}
            />
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <li key={project.slug}>
                  <Reveal delay={index * REVEAL_STAGGER} className="h-full">
                    <ProjectCard
                      project={project}
                      categoryLabel={labelFor(project.category)}
                      copy={cardCopy}
                    />
                  </Reveal>
                </li>
              ))}
              {/* A última fileira não fecha: o convite ao próximo completa. */}
              {showInvite ? (
                <li className={inviteSpan(projects.length)}>
                  <Reveal delay={projects.length * REVEAL_STAGGER} className="h-full">
                    <NextProjectCard copy={copy.nextProject} />
                  </Reveal>
                </li>
              ) : null}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  )
}
