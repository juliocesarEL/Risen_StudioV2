import { siteConfig } from '@/content/site'
import { ogContentType, ogImageSize, renderSiteOgImage } from '@/lib/seo/og-image'

export const alt = siteConfig.seo.title
export const size = ogImageSize
export const contentType = ogContentType

export default function Image() {
  return renderSiteOgImage()
}
