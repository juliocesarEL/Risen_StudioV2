import type { JsonLdObject } from '@/lib/seo/json-ld'

/**
 * Dados estruturados (schema.org). O "<" é escapado para que nenhum texto do
 * conteúdo consiga fechar a tag <script>.
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
