/**
 * Tipos dos arquivos de conteúdo (src/content).
 *
 * Os componentes recebem estes dados por props e não sabem de onde vêm:
 * adicionar ou remover um item é só editar o arquivo de dados.
 */

/* ---------------------------------------------------------------------------
 * Identificadores
 * ------------------------------------------------------------------------- */

/** Categorias de serviço (também usadas para classificar projetos). */
export type ServiceCategoryId = 'sites' | 'sistemas' | 'integracoes'

/** Tipos de projeto aceitos pelo formulário de orçamento (ver site.ts). */
export type ProjectTypeId =
  | 'site-institucional'
  | 'landing-page'
  | 'portfolio'
  | 'loja-virtual'
  | 'sistema-web'
  | 'plataforma-saas'
  | 'automacao-integracao'
  | 'manutencao'
  | 'outro'

/** Origem de um projeto. O selo é obrigatório e nunca pode ser omitido. */
export type ProjectKind = 'cliente' | 'autoral' | 'conceito'

/** Ícones de interface disponíveis para o conteúdo (mapeados em components/shared/icon.tsx). */
export type IconName =
  | 'layout'
  | 'layers'
  | 'workflow'
  | 'compass'
  | 'pen-tool'
  | 'code'
  | 'shield-check'
  | 'trending-up'
  | 'rocket'
  | 'life-buoy'
  | 'search'
  | 'clipboard-list'
  | 'message-circle'
  | 'map-pin'
  | 'user-round'

/** Ícones de tecnologias (mapeados em components/shared/tech-icon.tsx). */
export type TechIconId =
  'nextjs' | 'react' | 'typescript' | 'tailwindcss' | 'nodejs' | 'postgresql' | 'figma' | 'vercel'

/* ---------------------------------------------------------------------------
 * Blocos reutilizáveis
 * ------------------------------------------------------------------------- */

export interface ImageAsset {
  /** Caminho em /public ou URL permitida. */
  src: string
  /** Texto alternativo. Obrigatório: descreve o que a imagem mostra. */
  alt: string
}

export interface Link {
  label: string
  href: string
}

export interface SectionCopy {
  /** Rótulo curto acima do título. */
  eyebrow: string
  title: string
  description?: string
}

/* ---------------------------------------------------------------------------
 * Site
 * ------------------------------------------------------------------------- */

export interface ProjectTypeOption {
  id: ProjectTypeId
  label: string
  /** Quando false, o tipo não aparece no formulário. */
  enabled: boolean
}

export interface BudgetRange {
  id: string
  label: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface TechItem {
  name: string
  icon: TechIconId
}

export interface Founder {
  name: string
  role: string
  bio: string[]
  photo: ImageAsset
}

export interface SiteConfig {
  name: string
  legalName: string
  description: string
  locale: string
  location: {
    city: string
    state: string
    stateName: string
    country: string
    /** Cidades da região, usadas em textos e SEO local. */
    serviceAreas: string[]
  }
  contact: {
    email: string
    whatsapp: {
      /** Apenas dígitos, com DDI e DDD (ex.: 55 + DDD + número). */
      number: string
      /** Número formatado para exibição. */
      display: string
      messages: {
        default: string
        contactSection: string
        afterSubmit: string
        afterError: string
        caseStudy: string
      }
    }
  }
  social: SocialLink[]
  seo: {
    title: string
    titleTemplate: string
    description: string
    keywords: string[]
  }
  founder: Founder
  technologies: TechItem[]
  contactForm: {
    projectTypes: ProjectTypeOption[]
    budgetRanges: BudgetRange[]
  }
}

/* ---------------------------------------------------------------------------
 * Seções
 * ------------------------------------------------------------------------- */

export interface ServiceExample {
  label: string
  /** Quando false, o item não é exibido (ex.: lojas virtuais). Padrão: true. */
  enabled?: boolean
}

export interface Service {
  id: ServiceCategoryId
  title: string
  /** Versão curta do título, usada em selos e listas compactas. */
  shortTitle: string
  description: string
  icon: IconName
  benefits: string[]
  examples: ServiceExample[]
  cta: { label: string; projectType: ProjectTypeId }
}

export interface Project {
  slug: string
  name: string
  kind: ProjectKind
  category: ServiceCategoryId
  cover: ImageAsset
  summary: string
  problem: string
  solution: string
  features: string[]
  stack?: string[]
  liveUrl?: string
  /** Imagens exibidas na galeria do estudo de caso. */
  gallery?: ImageAsset[]
  /** Quando true, existe src/content/projects/<slug>.mdx. */
  hasCaseStudy: boolean
  featured: boolean
  /**
   * Conteúdo de exemplo para visualizar o layout. Aparece apenas em
   * desenvolvimento e nunca é publicado em produção.
   */
  placeholder?: boolean
}

export interface Differential {
  title: string
  description: string
  icon: IconName
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Need {
  id: string
  statement: string
  solution: string
  projectType: ProjectTypeId
  whatsappMessage: string
}

export interface FAQItem {
  question: string
  answer: string
}
