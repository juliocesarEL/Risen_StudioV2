import { CTAButton } from '@/components/shared/cta-button'
import { GhostMark } from '@/components/shared/logo'

interface NextProjectBandProps {
  copy: { title: string; description: string; cta: string }
}

/**
 * Convite ao próximo projeto, numa faixa baixa abaixo da grade: o gradiente do
 * R ocupa a faixa inteira, com o R em contorno ao fundo, como na imagem oficial
 * da marca. Fica fora da grade para nunca esticar nem sobrar espaço vazio.
 */
export function NextProjectBand({ copy }: NextProjectBandProps) {
  return (
    <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-card bg-gradient-action p-6 text-on-gradient sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-10">
      <GhostMark className="absolute -top-10 right-6 -z-10 size-56 text-on-gradient/20 md:right-64" />
      <div className="flex max-w-xl flex-col gap-2">
        <p className="font-display text-title font-semibold font-stretch-semi">{copy.title}</p>
        <p className="text-on-gradient/90">{copy.description}</p>
      </div>
      <CTAButton
        source="projetos"
        label={copy.cta}
        variant="inverse"
        size="lg"
        className="self-start md:self-auto"
      />
    </div>
  )
}
