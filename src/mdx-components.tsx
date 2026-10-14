import Link from 'next/link'

import type { MDXComponents } from 'mdx/types'
import type { ComponentProps } from 'react'

const linkClassName =
  'font-medium text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent'

/**
 * Links internos navegam pelo app; e-mail e telefone abrem o app do aparelho;
 * links externos abrem em nova aba.
 */
function TextLink({ href = '', children, ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} className={linkClassName} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} className={linkClassName} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName} {...props}>
      {children}
    </a>
  )
}

/**
 * Tipografia dos textos em MDX (estudos de caso e páginas institucionais). Os
 * títulos começam em h2 porque o h1 é renderizado pela página.
 * `TextLink` fica disponível no MDX para links com endereço dinâmico.
 */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 mb-6 font-display text-h3 font-semibold text-foreground font-stretch-semi first:mt-0 sm:text-title"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-10 mb-4 text-lg font-semibold text-foreground" {...props} />,
  p: (props) => <p className="mb-6 text-lead text-body" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  ul: (props) => <ul className="mb-8 flex flex-col gap-3 text-lead text-body" {...props} />,
  ol: (props) => (
    <ol className="mb-8 flex list-decimal flex-col gap-3 pl-6 text-lead text-body" {...props} />
  ),
  li: (props) => (
    <li
      className="relative pl-6 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3 before:bg-accent before:content-['']"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-10 border-l border-accent pl-6 font-display text-h3 text-quote font-stretch-semi"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
  a: TextLink,
  TextLink,
}

export function useMDXComponents(): MDXComponents {
  return components
}
