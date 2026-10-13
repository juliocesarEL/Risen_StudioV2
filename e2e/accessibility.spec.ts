import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

const PAGES = ['/', '/projetos/site-risen-studio', '/privacidade']

/** Critérios avaliados: WCAG 2.0, 2.1 e 2.2 níveis A e AA (inclui contraste de cores). */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/** Rola a página inteira para que as entradas animadas terminem antes da análise. */
async function revealEverything(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 80))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1000)
}

for (const path of PAGES) {
  test(`${path} não tem violações de acessibilidade (WCAG A/AA)`, async ({ page }) => {
    await page.goto(path)
    await revealEverything(page)

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    const violations = results.violations.map((violation) => ({
      regra: violation.id,
      impacto: violation.impact,
      elementos: violation.nodes.map((node) => node.target.join(' ')).slice(0, 5),
    }))

    expect(violations).toEqual([])
  })
}

test('a página tem um único h1 e títulos sem saltos de nível', async ({ page }) => {
  await page.goto('/')
  const levels = await page
    .locator('h1, h2, h3, h4')
    .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))))

  expect(levels.filter((level) => level === 1)).toHaveLength(1)
  levels.forEach((level, index) => {
    if (index > 0) expect(level - (levels[index - 1] ?? 1)).toBeLessThanOrEqual(1)
  })
})

test('o link "Pular para o conteúdo" é o primeiro foco e leva ao conteúdo', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'navegação por teclado verificada no desktop')
  await page.goto('/')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()

  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})
