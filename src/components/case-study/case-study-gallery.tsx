'use client'

import { Maximize2 } from 'lucide-react'
import Image from 'next/image'

import { BrowserFrame } from '@/components/shared/browser-frame'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { ImageAsset } from '@/types/content'

interface CaseStudyGalleryProps {
  images: ImageAsset[]
  /** Início do rótulo do botão que amplia cada imagem (seguido do texto alternativo). */
  openLabelPrefix: string
}

const sizes = {
  wide: '(min-width: 1280px) 1216px, 100vw',
  half: '(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw',
}

/** Galeria em janelas do navegador; cada imagem pode ser ampliada em um diálogo. */
export function CaseStudyGallery({ images, openLabelPrefix }: CaseStudyGalleryProps) {
  // Com quantidade ímpar, a primeira imagem ocupa a largura toda e as demais formam pares.
  const firstIsWide = images.length % 2 === 1

  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {images.map((image, index) => {
        const isWide = firstIsWide && index === 0
        return (
          <li key={image.src} className={isWide ? 'md:col-span-2' : undefined}>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`${openLabelPrefix} ${image.alt}`}
                  className="group relative block w-full rounded-xl text-left"
                >
                  <BrowserFrame
                    image={image}
                    sizes={isWide ? sizes.wide : sizes.half}
                    className="transition-colors duration-300 group-hover:border-line-2"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full border border-line-2 bg-glass text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[min(92vw,1280px)] gap-0 border-none bg-transparent p-0 ring-0 sm:max-w-[min(92vw,1280px)]">
                <DialogTitle className="sr-only">{image.alt}</DialogTitle>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-line bg-bg2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 1280px, 92vw"
                    className="object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </li>
        )
      })}
    </ul>
  )
}
