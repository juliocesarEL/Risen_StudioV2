import { describe, expect, it } from 'vitest'

import { contactEmailCopy } from '@/content/contact'
import type { ContactRequest } from '@/core/contact/domain/contact-request'
import { renderContactEmail } from '@/core/contact/infrastructure/contact-email'

const request: ContactRequest = {
  name: 'Maria Souza',
  email: 'maria@empresa.com.br',
  phone: '(11) 91234-5678',
  projectType: { id: 'landing-page', label: 'Landing page' },
  message: 'Preciso de uma página para divulgar um lançamento.',
  consentedAt: new Date('2026-05-04T13:30:00.000Z'),
  receivedAt: new Date('2026-05-04T13:30:00.000Z'),
}

describe('renderContactEmail', () => {
  it('monta assunto, HTML e texto com os dados da solicitação', async () => {
    const email = await renderContactEmail(request)

    expect(email.subject).toBe(contactEmailCopy.subject('Maria Souza', 'Landing page'))
    expect(email.html).toContain('Maria Souza')
    expect(email.html).toContain('mailto:maria@empresa.com.br')
    expect(email.html).toContain('https://wa.me/5511912345678')
    expect(email.text).toContain('Preciso de uma página para divulgar um lançamento.')
    expect(email.text).toContain(contactEmailCopy.notInformed)
  })

  it('escapa o conteúdo enviado pelo visitante', async () => {
    const email = await renderContactEmail({ ...request, message: '<script>alert(1)</script>' })

    expect(email.html).not.toContain('<script>alert(1)</script>')
    expect(email.html).toContain('&lt;script&gt;')
  })

  it('registra data e hora no fuso de São Paulo', async () => {
    const email = await renderContactEmail(request)

    // 13:30 UTC = 10:30 em São Paulo
    expect(email.text).toContain('10:30')
  })
})
