import { Container } from '@/components/shared/section'

/**
 * Esqueleto do estudo de caso: forma o "App Shell" da rota, exibido por um
 * instante caso a navegação aconteça antes do pré-carregamento terminar.
 */
export function CaseStudySkeleton() {
  return (
    <div aria-hidden="true" className="pt-[calc(var(--nav-height)+2.5rem)] pb-section">
      <Container className="flex flex-col gap-8 motion-safe:animate-pulse">
        <div className="h-5 w-40 rounded-md bg-bg3" />
        <div className="h-6 w-56 rounded-pill bg-bg3" />
        <div className="h-20 w-full max-w-2xl rounded-xl bg-bg3" />
        <div className="h-16 w-full max-w-xl rounded-xl bg-bg3" />
        <div className="aspect-16/10 w-full rounded-xl border border-line bg-bg2" />
      </Container>
    </div>
  )
}
