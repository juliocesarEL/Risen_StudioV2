import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { ImageAsset } from '@/types/content'

interface BrowserFrameProps {
  image: ImageAsset
  /** Valor de `sizes` do next/image para cada breakpoint. */
  sizes: string
  /** Carrega a imagem com prioridade (apenas para imagens acima da dobra). */
  preload?: boolean
  /** Texto decorativo na barra de endereço. */
  address?: string
  className?: string
  imageClassName?: string
}

/**
 * Janela no estilo macOS para mockups e capturas de projetos. A proporção é
 * fixa (16:10), então a imagem nunca distorce: ela é recortada a partir do canto
 * superior esquerdo, onde ficam o logo e o menu na maioria das telas.
 */
export function BrowserFrame({
  image,
  sizes,
  preload = false,
  address,
  className,
  imageClassName,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-bg2 shadow-window',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-8 items-center gap-1.5 border-b border-line bg-bg3/70 px-3 sm:h-9 sm:gap-2"
      >
        <span className="size-2.5 rounded-full bg-window-red" />
        <span className="size-2.5 rounded-full bg-window-yellow" />
        <span className="size-2.5 rounded-full bg-window-green" />
        {address ? (
          <span className="ml-2 hidden min-w-0 truncate rounded-md bg-chip px-2.5 py-0.5 font-mono text-[0.625rem] text-subtle sm:block">
            {address}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-16/10 bg-bg3">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn('object-cover object-left-top', imageClassName)}
        />
      </div>
    </div>
  )
}
