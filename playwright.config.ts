import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    navigationTimeout: 45_000,
    trace: 'retain-on-failure',
    locale: 'pt-BR',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Testa o build de produção, como será publicado.
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: BASE_URL,
    timeout: 300_000,
    // Servidor novo a cada execução: o rate limiting em memória começa zerado.
    reuseExistingServer: false,
    // Sem provedor de e-mail: os testes nunca enviam mensagens reais, mesmo
    // que exista um .env.local configurado.
    env: { RESEND_API_KEY: '', CONTACT_TO_EMAIL: '' },
  },
})
