import { expect, test } from '@playwright/test'

/**
 * Links usados logo ao abrir a página, antes de o formulário de orçamento
 * carregar (ele só carrega perto da tela ou na primeira interação). Enquanto
 * ele não carregava, o React segurava as navegações do Next e esses links não
 * faziam nada.
 *
 * Cada teste espera a rede ficar ociosa antes de clicar: com o JavaScript da
 * página já ativo, o link passa pelo Next (onde estava o defeito). Clicando
 * antes disso, o navegador navega sozinho e o teste passaria por acaso.
 */
test.describe('navegação a partir do topo da página', () => {
  test('"Explorar projetos" leva à seção de projetos', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Explorar projetos' }).click()

    await expect(page).toHaveURL(/#projetos$/)
    await expect(page.locator('#projetos')).toBeInViewport()
  })

  test('o menu do topo leva à seção escolhida', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no celular o menu é outro (coberto em quote-flow.spec.ts)')
    await page.goto('/', { waitUntil: 'networkidle' })
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Processo' })
      .click()

    await expect(page).toHaveURL(/#processo$/)
    await expect(page.locator('#processo')).toBeInViewport()
  })

  test('o card de um projeto abre a página do projeto', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page
      .locator('#projetos')
      .getByRole('link', { name: /Nutri\+/ })
      .click()

    // Outra página: o servidor de teste pode demorar a responder com a máquina ocupada.
    await expect(page).toHaveURL(/\/projetos\/nutri-plus$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { level: 1, name: /Nutri\+/ })).toBeVisible()
  })
})
