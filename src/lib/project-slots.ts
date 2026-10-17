/**
 * Conta das vagas abertas da grade de projetos. Fica num módulo sem dados de
 * conteúdo porque também roda no navegador (grade com filtros).
 */

/** Colunas da grade de projetos no desktop. */
export const PROJECT_COLUMNS = 3

/**
 * Quantos cards de "vaga aberta" completam a grade: até o mínimo pedido e,
 * depois, até fechar a última fileira (nenhum card fica sozinho na linha).
 */
export function countOpenSlots(count: number, minimum = 0): number {
  const filled = Math.max(count, minimum)
  const rowGap = (PROJECT_COLUMNS - (filled % PROJECT_COLUMNS)) % PROJECT_COLUMNS
  return filled - count + rowGap
}
