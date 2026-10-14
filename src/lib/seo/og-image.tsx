import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { siteConfig } from '@/content/site'
import { brandMark } from '@/lib/brand-mark'
import { brandColors, brandGradients } from '@/styles/brand-colors'

/**
 * Imagens de compartilhamento dos estudos de caso, geradas no build no estilo
 * da imagem oficial da marca (public/images/og-image.jpeg, usada no restante
 * do site). O gerador não entende variáveis CSS: as cores vêm de
 * brand-colors.ts, que é testado contra os tokens de globals.css.
 */

export const ogImageSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const fontsDir = join(process.cwd(), 'assets/fonts')
const [displayFont, bodyFont] = await Promise.all([
  readFile(join(fontsDir, 'archivo-expanded-bold.ttf')),
  readFile(join(fontsDir, 'archivo-medium.ttf')),
])

const fonts = [
  { name: 'Display', data: displayFont, weight: 700 as const, style: 'normal' as const },
  { name: 'Body', data: bodyFont, weight: 500 as const, style: 'normal' as const },
]

const { x1, y1, x2, y2 } = brandMark.gradient
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMark.viewBox}"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${brandColors.gradientPrimaryFrom}"/><stop offset=".5" stop-color="${brandColors.gradientPrimaryVia}"/><stop offset="1" stop-color="${brandColors.gradientPrimaryTo}"/></linearGradient></defs><path fill="url(#g)" d="${brandMark.gradientPath}"/><path fill="${brandColors.text}" d="${brandMark.strokePath}"/></svg>`
const logoMarkSrc = `data:image/svg+xml;base64,${Buffer.from(logoMarkSvg).toString('base64')}`

interface ProjectOgImageData {
  name: string
  summary: string
  kindLabel: string
  categoryLabel: string
}

/** Imagem de um estudo de caso. */
export function renderProjectOgImage({
  name,
  summary,
  kindLabel,
  categoryLabel,
}: ProjectOgImageData) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        backgroundColor: brandColors.bg,
        backgroundImage: `radial-gradient(circle at 0% 0%, ${brandColors.fieldBlue}, transparent 42%), radial-gradient(circle at 100% 100%, ${brandColors.fieldViolet}, transparent 45%)`,
        color: brandColors.text,
        fontFamily: 'Body',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og só renderiza <img>, não next/image */}
          <img src={logoMarkSrc} width={56} height={56} alt="" />
          <span style={{ fontFamily: 'Display', fontSize: 30, letterSpacing: 8 }}>
            {siteConfig.name.toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: 22, color: brandColors.textBody, letterSpacing: 4 }}>
          {`${kindLabel} · ${categoryLabel}`.toUpperCase()}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={{ fontFamily: 'Display', fontSize: 80, lineHeight: 1.02, letterSpacing: -2 }}>
          {name}
        </span>
        <span style={{ fontSize: 30, lineHeight: 1.4, color: brandColors.textBody, maxWidth: 940 }}>
          {summary}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          height: 6,
          borderRadius: 6,
          backgroundImage: brandGradients.primary,
        }}
      />
    </div>,
    { ...ogImageSize, fonts },
  )
}
