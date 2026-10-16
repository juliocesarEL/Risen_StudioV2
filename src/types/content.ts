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
export type ProjectKind = 'autoral' | 'colaboracao' | 'cliente' | 'conceito'

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
  'javascript' | 'typescript' | 'react' | 'nodejs' | 'express' | 'sqlite' | 'postgresql'

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

export type SocialIconId = 'instagram' | 'linkedin' | 'github'

export interface SocialLink {
  label: string
  url: string
  icon: SocialIconId
}

export interface TechItem {
  name: string
  icon: TechIconId
}

export interface Founder {
  name: string
  role: string
  /** Usuário público (ex.: o do LinkedIn), mostrado no cartão de perfil. */
  handle: string
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
    /** E-mail comercial. null enquanto não houver um real: o site então o omite. */
    email: string | null
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
    /** Título da aba do navegador (e dos resultados de busca) na página inicial. */
    title: string
    /** Título dos links compartilhados (WhatsApp, LinkedIn...), mais descritivo. */
    shareTitle: string
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
  /** Capa do card na seção de projetos. */
  cover: ImageAsset
  /**
   * Logo do projeto (PNG ou SVG com fundo transparente), ao lado do nome no
   * card e na página do projeto. Decorativo: o nome já aparece ao lado.
   */
  logo?: string
  /** Imagem de abertura da página do projeto. Sem ela, a página usa a capa. */
  caseStudyCover?: ImageAsset
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

/* ---------------------------------------------------------------------------
 * Bancada ao vivo (hero)
 * ------------------------------------------------------------------------- */

/** Papel de um trecho de código no realce de sintaxe. */
export type SyntaxRole =
  'keyword' | 'component' | 'attribute' | 'string' | 'punctuation' | 'plain' | 'comment'

export interface CodeLine {
  /** Nível de recuo (cada nível equivale a dois espaços). */
  indent: number
  tokens: [SyntaxRole, string][]
  /** Peça do preview que surge quando esta linha termina de ser digitada. */
  builds?: string
}

export type WorkbenchTabId = 'site' | 'sistema' | 'integracao'

export interface WorkbenchTab {
  id: WorkbenchTabId
  /** Nome do arquivo exibido na aba. */
  file: string
  /** Nome acessível da aba. */
  label: string
  projectType: ProjectTypeId
  /** O que a demonstração mostra, para leitores de tela. */
  summary: string
  /** Rótulo do botão de orçamento deste tipo de projeto. */
  quoteLabel: string
  code: CodeLine[]
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
