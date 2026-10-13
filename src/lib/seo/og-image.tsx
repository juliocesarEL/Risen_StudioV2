import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { heroContent } from '@/content/sections'
import { siteConfig } from '@/content/site'
import { brandColors, brandGradients } from '@/styles/brand-colors'

/**
 * Imagens de compartilhamento (Open Graph / Twitter), geradas no build.
 * O gerador não entende variáveis CSS: as cores vêm de brand-colors.ts, que é
 * testado contra os tokens de globals.css.
 */

export const ogImageSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const fontsDir = join(process.cwd(), 'assets/fonts')
const [displayFont, bodyFont] = await Promise.all([
  readFile(join(fontsDir, 'bricolage-grotesque-condensed-bold.ttf')),
  readFile(join(fontsDir, 'figtree-medium.ttf')),
])

const fonts = [
  { name: 'Display', data: displayFont, weight: 700 as const, style: 'normal' as const },
  { name: 'Body', data: bodyFont, weight: 500 as const, style: 'normal' as const },
]

/** Símbolo da marca (o mesmo de components/shared/logo.tsx) como imagem SVG. */
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="32" y2="0"><stop offset="0" stop-color="${brandColors.gradientPrimaryFrom}"/><stop offset=".55" stop-color="${brandColors.gradientPrimaryVia}"/><stop offset="1" stop-color="${brandColors.gradientPrimaryTo}"/></linearGradient></defs><rect x=".75" y=".75" width="30.5" height="30.5" rx="9.25" fill="${brandColors.bg2}" stroke="${brandColors.line2}" stroke-width="1.5"/><path d="M9 20.5a7 7 0 0 1 14 0" stroke="url(#g)" stroke-width="2.75" stroke-linecap="round"/><path d="M7 20.5h18" stroke="${brandColors.text}" stroke-width="2" stroke-linecap="round"/></svg>`
const logoMarkSrc = `data:image/svg+xml;base64,${Buffer.from(logoMarkSvg).toString('base64')}`

const location = `${siteConfig.location.city}, ${siteConfig.location.state}`

function Frame({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        backgroundColor: brandColors.bg,
        backgroundImage: `radial-gradient(circle at 85% 15%, ${brandColors.accent}33, transparent 45%), radial-gradient(circle at 10% 95%, ${brandColors.gradientPrimaryFrom}26, transparent 40%)`,
        color: brandColors.text,
        fontFamily: 'Body',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og só renderiza <img>, não next/image */}
          <img src={logoMarkSrc} width={52} height={52} alt="" />
          <span style={{ fontFamily: 'Display', fontSize: 34 }}>{siteConfig.name}</span>
        </div>
        <span style={{ fontSize: 22, color: brandColors.textBody, letterSpacing: 4 }}>
          {eyebrow.toUpperCase()}
        </span>
      </div>
      {children}
      <div
        style={{
          display: 'flex',
          height: 6,
          borderRadius: 6,
          backgroundImage: brandGradients.primary,
        }}
      />
    </div>
  )
}

/** Imagem padrão do site. */
export function renderSiteOgImage() {
  return new ImageResponse(
    <Frame eyebrow={location}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Display',
          fontSize: 92,
          lineHeight: 0.95,
        }}
      >
        <span>{heroContent.title.lead}</span>
        <span
          style={{
            backgroundImage: brandGradients.text,
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {heroContent.title.highlight}
        </span>
      </div>
    </Frame>,
    { ...ogImageSize, fonts },
  )
}

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
    <Frame eyebrow={`${kindLabel} · ${categoryLabel}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={{ fontFamily: 'Display', fontSize: 96, lineHeight: 0.95 }}>{name}</span>
        <span style={{ fontSize: 30, lineHeight: 1.4, color: brandColors.textBody, maxWidth: 940 }}>
          {summary}
        </span>
      </div>
    </Frame>,
    { ...ogImageSize, fonts },
  )
}
