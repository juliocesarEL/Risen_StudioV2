import { projects as allProjects } from '@/content/projects'
import { services } from '@/content/services'
import type { Project, ProjectTypeId, ServiceCategoryId } from '@/types/content'

export { countOpenSlots, PROJECT_COLUMNS } from '@/lib/project-slots'

/** Conteúdo de exemplo (`placeholder: true`) nunca é publicado em produção. */
const showPlaceholders = process.env.NODE_ENV !== 'production'

/** A partir desta quantidade de projetos, os filtros por categoria aparecem (página /projetos). */
export const MIN_PROJECTS_FOR_FILTERS = 6
/**
 * Projetos na página inicial: duas fileiras de três. Os demais ficam na página
 * /projetos. Para escolher quais aparecem, marque `featured` ou mude a ordem
 * em src/content/projects.ts.
 */
export const HOME_PROJECTS_LIMIT = 6
/** A página /projetos sempre mostra ao menos 12 espaços (projetos + vagas abertas). */
export const PROJECTS_PAGE_MIN_SLOTS = 12

export function getPublishedProjects(): Project[] {
  const visible = allProjects.filter((project) => showPlaceholders || !project.placeholder)
  // Destaques primeiro, mantendo a ordem do arquivo de conteúdo.
  return [...visible].sort((a, b) => Number(b.featured) - Number(a.featured))
}

export function getHomeProjects(projects: Project[]): Project[] {
  return projects.slice(0, HOME_PROJECTS_LIMIT)
}

/** Projetos que não cabem na página inicial: são os que a página /projetos mostra. */
export function getMoreProjects(projects: Project[]): Project[] {
  return projects.slice(HOME_PROJECTS_LIMIT)
}

/** O link para a página /projetos só aparece quando a página inicial não mostra todos. */
export function hasMoreProjects(projects: Project[]): boolean {
  return projects.length > HOME_PROJECTS_LIMIT
}

export function shouldShowProjectFilters(count: number): boolean {
  return count >= MIN_PROJECTS_FOR_FILTERS
}

export function getCaseStudies(): Project[] {
  return getPublishedProjects().filter((project) => project.hasCaseStudy)
}

/**
 * Parâmetros estáticos de /projetos/[slug]. Com Cache Components, a lista não
 * pode ser vazia: sem estudos de caso, um marcador gera apenas uma página 404.
 */
export const NO_CASE_STUDY_SLUG = 'sem-estudos-de-caso'

export function getCaseStudyStaticParams(): { slug: string }[] {
  const params = getCaseStudies().map((project) => ({ slug: project.slug }))
  return params.length > 0 ? params : [{ slug: NO_CASE_STUDY_SLUG }]
}

export function getCaseStudyBySlug(slug: string): Project | undefined {
  return getCaseStudies().find((project) => project.slug === slug)
}

/** Próximo estudo de caso (em ciclo). Retorna undefined quando só existe um. */
export function getNextCaseStudy(slug: string): Project | undefined {
  const caseStudies = getCaseStudies()
  if (caseStudies.length < 2) return undefined
  const index = caseStudies.findIndex((project) => project.slug === slug)
  return caseStudies[(index + 1) % caseStudies.length]
}

/** Tipo de projeto sugerido no orçamento a partir da categoria (o mesmo do CTA do serviço). */
export function getProjectTypeForCategory(category: ServiceCategoryId): ProjectTypeId {
  return services.find((service) => service.id === category)?.cta.projectType ?? 'outro'
}

/** Tipo de projeto do orçamento para cada frente de serviço (usado pelas vagas abertas). */
export function getProjectTypesByCategory(): Record<ServiceCategoryId, ProjectTypeId> {
  return Object.fromEntries(
    services.map((service) => [service.id, service.cta.projectType]),
  ) as Record<ServiceCategoryId, ProjectTypeId>
}

export function getCategoryLabel(category: ServiceCategoryId): string {
  return services.find((service) => service.id === category)?.shortTitle ?? category
}

/** Categorias presentes nos projetos publicados, na ordem dos serviços. */
export function getProjectCategories(projects: Project[]): ServiceCategoryId[] {
  return services
    .map((service) => service.id)
    .filter((id) => projects.some((project) => project.category === id))
}
