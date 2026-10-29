import { buildLlmsTxt } from '@/lib/seo/llms-txt'

/**
 * /llms.txt: resumo do site para assistentes de IA (ver lib/seo/llms-txt.ts).
 * Só lê o conteúdo do site, então é gerado no build como arquivo estático.
 */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
