import { createCn } from 'cn/engine'

import tables from '@/lib/cn-tables'

/**
 * Junta classes condicionalmente e resolve conflitos do Tailwind.
 *
 * As tabelas vêm prontas do build (cn.config.mjs + globals.css, gerado por
 * `withCn` em next.config.ts): o navegador não precisa compilar a configuração
 * do Tailwind ao abrir a página.
 */
export const cn = createCn(tables)
