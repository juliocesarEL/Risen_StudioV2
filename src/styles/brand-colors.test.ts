import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { brandColors, brandColorTokens } from '@/styles/brand-colors'

const globalsCss = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

function readCssToken(name: string): string | undefined {
  const match = globalsCss.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`))
  return match?.[1]?.toLowerCase()
}

describe('brandColors', () => {
  it.each(Object.entries(brandColorTokens))('espelha o token %s de globals.css', (key, cssName) => {
    expect(readCssToken(cssName)).toBe(brandColors[key as keyof typeof brandColors])
  })
})
