import { type OpenSlotCopy, OpenSlotCard } from '@/components/sections/projects/open-slot-card'
import { type ProjectCardCopy, ProjectCard } from '@/components/sections/projects/project-card'
import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import type { Project, ProjectTypeId, ServiceCategoryId } from '@/types/content'

/** Ordem em que as vagas abertas alternam entre as frentes de serviço. */
const OPEN_SLOT_ROTATION: ServiceCategoryId[] = ['sites', 'sistemas', 'integracoes']

interface ProjectGridProps {
  projects: Project[]
  categories: { id: ServiceCategoryId; label: string }[]
  cardCopy: ProjectCardCopy
  headingLevel?: 'h2' | 'h3'
  /** Cards de "vaga aberta" depois dos projetos. */
  openSlots?: number
  openSlotCopy?: Omit<OpenSlotCopy, 'title'> & {
    titles: Record<ServiceCategoryId, string>
    /** Tipo de projeto de cada frente (vem do servidor: a grade também roda no navegador). */
    projectTypes: Record<ServiceCategoryId, ProjectTypeId>
  }
  /** No celular a grade tem uma coluna e nada fica sobrando: as vagas podem sumir. */
  hideOpenSlotsOnMobile?: boolean
}

/** Intervalo entre os cards de uma mesma fileira, em segundos. */
const CARD_STAGGER = 0.12

/** Grade de projetos: 1 coluna no celular, 2 no tablet, 3 no desktop. */
export function ProjectGrid({
  projects,
  categories,
  cardCopy,
  headingLevel,
  openSlots = 0,
  openSlotCopy,
  hideOpenSlotsOnMobile = false,
}: ProjectGridProps) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Reveal variant="card" delay={(index % 3) * CARD_STAGGER} className="h-full">
            <ProjectCard
              project={project}
              copy={cardCopy}
              headingLevel={headingLevel}
              categoryLabel={
                categories.find((category) => category.id === project.category)?.label ?? ''
              }
            />
          </Reveal>
        </li>
      ))}
      {openSlotCopy
        ? Array.from({ length: openSlots }, (_, slot) => {
            const index = projects.length + slot
            const category = OPEN_SLOT_ROTATION[slot % OPEN_SLOT_ROTATION.length] ?? 'sites'
            return (
              <li key={`vaga-${slot}`} className={cn(hideOpenSlotsOnMobile && 'max-md:hidden')}>
                <Reveal variant="card" delay={(index % 3) * CARD_STAGGER} className="h-full">
                  <OpenSlotCard
                    projectType={openSlotCopy.projectTypes[category]}
                    copy={{ ...openSlotCopy, title: openSlotCopy.titles[category] }}
                  />
                </Reveal>
              </li>
            )
          })
        : null}
    </ul>
  )
}
