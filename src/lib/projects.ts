import { projects as allProjects } from '@/content/projects'
import { services } from '@/content/services'
import type { Project, ProjectTypeId, ServiceCategoryId } from '@/types/content'

/** Conteúdo de exemplo (`placeholder: true`) nunca é publicado em produção. */
const showPlaceholders = process.env.NODE_ENV !== 'production'

/** A partir desta quantidade de projetos, os filtros por categoria aparecem. */
export const MIN_PROJECTS_FOR_FILTERS = 6
/** Colunas da grade de projetos no desktop. */
export const PROJECT_COLUMNS = 3

export function getPublishedProjects(): Project[] {
  const visible = allProjects.filter((project) => showPlaceholders || !project.placeholder)
  // Destaques primeiro, mantendo a ordem do arquivo de conteúdo.
  return [...visible].sort((a, b) => Number(b.featured) - Number(a.featured))
}

/**
 * O convite ao próximo projeto aparece quando a última fileira da grade não
 * fecha (e quando ainda não há projetos), para nenhum card ficar sozinho.
 */
export function shouldShowNextProjectInvite(count: number): boolean {
  return count === 0 || count % PROJECT_COLUMNS !== 0
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

export function getCategoryLabel(category: ServiceCategoryId): string {
  return services.find((service) => service.id === category)?.shortTitle ?? category
}

/** Categorias presentes nos projetos publicados, na ordem dos serviços. */
export function getProjectCategories(projects: Project[]): ServiceCategoryId[] {
  return services
    .map((service) => service.id)
    .filter((id) => projects.some((project) => project.category === id))
}
