import { expect, type Page, test } from '@playwright/test'

/**
 * O formulário é hidratado sob demanda (o código carrega quando ele se
 * aproxima da tela). Espera o formulário ficar interativo.
 */
async function waitForQuoteForm(page: Page) {
  await expect(page.locator('#contato [data-form-ready]')).toBeAttached({ timeout: 15_000 })
}

/** Preenche o formulário de orçamento com dados válidos. */
async function fillValidQuote(page: Page, projectType = 'Landing page') {
  await waitForQuoteForm(page)
  const form = page.locator('#contato form')
  await form.getByLabel('Nome', { exact: true }).fill('Maria Souza')
  await form.getByLabel('E-mail', { exact: true }).fill('maria@empresa.com.br')
  await form.getByLabel(/WhatsApp ou telefone/).fill('11912345678')
  await form.getByRole('combobox', { name: 'Tipo de projeto' }).click()
  await page.getByRole('option', { name: projectType }).click()
  await form
    .getByLabel('Descreva sua necessidade')
    .fill('Preciso de uma página para divulgar o lançamento de um curso.')
  await form.getByRole('checkbox').check()
}

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
}

/**
 * Cada teste (e cada nova tentativa) envia de um "IP" diferente. O formulário
 * limita os envios por IP; sem isso, os envios de todos os testes saem do mesmo
 * endereço e se acumulam, e o limite responde no lugar do erro esperado.
 */
test.beforeEach(async ({ page }, testInfo) => {
  const octet = (value: number) => Math.abs(value) % 256
  await page.setExtraHTTPHeaders({
    'x-forwarded-for': `10.${octet(testInfo.workerIndex)}.${octet(testInfo.retry)}.${octet(Math.floor(Math.random() * 256))}`,
  })
})

test.describe('fluxo de orçamento', () => {
  test('CTA de serviço leva ao formulário com o tipo de projeto pré-selecionado', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Quero um sistema', exact: true }).click()

    await expect(page).toHaveURL(/\?tipo=sistema-web#contato$/)
    await expect(
      page.getByRole('heading', { name: 'Sua ideia merece sair do papel.' }),
    ).toBeInViewport()
    await waitForQuoteForm(page)
    await expect(page.getByRole('combobox', { name: 'Tipo de projeto' })).toHaveText(
      'Sistema web personalizado',
    )
  })

  test('link direto com ?tipo= também pré-seleciona o formulário', async ({ page }) => {
    await page.goto('/?tipo=landing-page#contato')
    await waitForQuoteForm(page)

    await expect(page.getByRole('combobox', { name: 'Tipo de projeto' })).toHaveText('Landing page')
  })

  test('valida em português e liga cada erro ao seu campo', async ({ page }) => {
    await page.goto('/#contato')
    await page.getByRole('button', { name: 'Enviar solicitação' }).click()

    // O clique acontece antes de o JavaScript do formulário chegar: o envio fica
    // guardado e é repetido quando ele carrega. Daí a mesma espera de waitForQuoteForm.
    const name = page.locator('#contato form').getByLabel('Nome', { exact: true })
    await expect(name).toBeFocused({ timeout: 15_000 })
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toHaveAccessibleDescription('Informe seu nome (mínimo de 2 caracteres).')
    await expect(
      page.getByRole('combobox', { name: 'Tipo de projeto' }),
    ).toHaveAccessibleDescription('Selecione o tipo de projeto.')
    await expect(page.getByRole('checkbox')).toHaveAccessibleDescription(
      'Para enviar, é preciso concordar com a Política de Privacidade.',
    )
  })

  test('aplica a máscara brasileira ao telefone', async ({ page }) => {
    await page.goto('/#contato')
    await waitForQuoteForm(page)
    const phone = page.locator('#contato form').getByLabel(/WhatsApp ou telefone/)

    await phone.fill('11912345678')

    await expect(phone).toHaveValue('(11) 91234-5678')
  })

  test('o que for digitado antes de o formulário carregar não se perde', async ({ page }) => {
    // Segura o pacote do formulário (o único que contém o Zod) até o teste
    // liberar: a digitação acontece com certeza antes de ele carregar, por mais
    // lenta que esteja a máquina.
    let releaseFormCode = () => {}
    const formCodeReleased = new Promise<void>((resolve) => {
      releaseFormCode = resolve
    })
    await page.route('**/_next/static/chunks/*.js', async (route) => {
      const response = await route.fetch()
      const body = await response.text()
      if (body.includes('ZodError')) await formCodeReleased
      await route.fulfill({ response, body })
    })
    await page.goto('/#contato')
    const form = page.locator('#contato form')
    const name = form.getByLabel('Nome', { exact: true })
    const phone = form.getByLabel(/WhatsApp ou telefone/)

    await name.fill('Maria Souza')
    await phone.fill('11912345678')
    await expect(page.locator('#contato [data-form-ready]')).toHaveCount(0)

    releaseFormCode()
    await waitForQuoteForm(page)
    await expect(name).toHaveValue('Maria Souza')
    await expect(phone).toHaveValue('(11) 91234-5678')
  })

  test('sem provedor de e-mail configurado, mostra um erro honesto (nunca um sucesso simulado)', async ({
    page,
  }) => {
    await page.goto('/#contato')
    await fillValidQuote(page)

    const submit = page.getByRole('button', { name: 'Enviar solicitação' })
    await submit.click()

    const alert = page.locator('#contato').getByRole('alert')
    await expect(alert).toContainText('indisponível', { timeout: 15_000 })
    await expect(alert.getByRole('link', { name: /Falar no WhatsApp/ })).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/\d+\?text=/,
    )
    // Com e-mail comercial definido em site.ts, o endereço aparece escrito, com
    // link já preenchido (assunto e a mensagem digitada) e botão de copiar.
    const emailLink = alert.locator('a[href^="mailto:"]')
    if ((await emailLink.count()) > 0) {
      await expect(emailLink).toHaveAttribute('href', /\?subject=.+&body=Preciso/)
      await expect(alert.getByRole('button', { name: 'Copiar e-mail' })).toBeVisible()
    }
    await expect(page.getByText('Recebemos sua solicitação!')).toHaveCount(0)
    await expect(submit).toBeEnabled()
  })
})

test.describe('celular', () => {
  test.skip(({ isMobile }) => !isMobile, 'cenário exclusivo para viewport móvel')

  test('menu acessível, CTA de orçamento e formulário sem cobrir o envio', async ({ page }) => {
    await page.goto('/')
    await expectNoHorizontalScroll(page)

    // Menu: abre, fecha com Esc e devolve o foco ao botão.
    const menuButton = page.getByRole('button', { name: 'Abrir menu' })
    await menuButton.click()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(menuButton).toBeFocused()

    // Um item do menu leva à seção (o menu fecha antes de rolar).
    await menuButton.click()
    await menu.getByRole('link', { name: /^Processo/ }).click()
    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/#processo$/)
    await expect(page.locator('#processo')).toBeInViewport()
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))

    // CTA dentro do menu leva ao formulário.
    await menuButton.click()
    await menu.getByRole('link', { name: 'Solicitar orçamento' }).click()
    await expect(menu).toBeHidden()
    await expect(
      page.getByRole('heading', { name: 'Sua ideia merece sair do papel.' }),
    ).toBeInViewport()

    // Com o formulário na tela, o botão flutuante some (fica inert, fora da
    // árvore de acessibilidade) para não cobrir o envio.
    const floatingWhatsApp = page.locator('a[aria-label="Conversar no WhatsApp"][data-hidden]')
    await page.getByRole('button', { name: 'Enviar solicitação' }).scrollIntoViewIfNeeded()
    await expect(floatingWhatsApp).toHaveAttribute('data-hidden', 'true')

    await fillValidQuote(page, 'Site institucional')
    await page.getByRole('button', { name: 'Enviar solicitação' }).click()
    await expect(page.locator('#contato').getByRole('alert')).toContainText('indisponível', {
      timeout: 15_000,
    })
    await expectNoHorizontalScroll(page)
  })
})
