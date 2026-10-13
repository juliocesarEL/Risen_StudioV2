/** Substitui marcadores `{nome}` de um texto pelos valores informados. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (marker, key: string) =>
    key in values ? String(values[key]) : marker,
  )
}
