import type { WorkbenchTab } from '@/types/content'

/**
 * Bancada ao vivo (hero): o código de cada tipo de projeto é digitado e o
 * preview ao lado se monta junto. É uma demonstração ilustrativa, não um
 * projeto real: os nomes no código e no preview são exemplos.
 *
 * Mantenha cada linha curta (até ~34 caracteres com o recuo) para caber na
 * coluna do editor. `builds` liga a linha à peça do preview que ela "cria".
 */
export const workbenchTabs: WorkbenchTab[] = [
  {
    id: 'site',
    file: 'site.tsx',
    label: 'Site',
    projectType: 'site-institucional',
    summary: 'Exemplo: o código de um site sendo escrito e a página se montando ao lado.',
    quoteLabel: 'Quero um site assim',
    code: [
      {
        indent: 0,
        tokens: [
          ['keyword', 'export function '],
          ['component', 'SeuSite'],
          ['punctuation', '() {'],
        ],
      },
      {
        indent: 1,
        tokens: [
          ['keyword', 'return'],
          ['punctuation', ' ('],
        ],
      },
      {
        indent: 2,
        builds: 'frame',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Pagina'],
          ['attribute', ' tema'],
          ['punctuation', '='],
          ['string', '"risen"'],
          ['punctuation', '>'],
        ],
      },
      {
        indent: 3,
        builds: 'nav',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Menu'],
          ['punctuation', ' />'],
        ],
      },
      {
        indent: 3,
        builds: 'hero',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Destaque'],
          ['attribute', ' titulo'],
          ['punctuation', '={'],
          ['plain', 'frase'],
          ['punctuation', '} />'],
        ],
      },
      {
        indent: 3,
        builds: 'cta',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Botao'],
          ['attribute', ' para'],
          ['punctuation', '='],
          ['string', '"/orcamento"'],
          ['punctuation', ' />'],
        ],
      },
      {
        indent: 3,
        builds: 'grid',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Vitrine'],
          ['attribute', ' itens'],
          ['punctuation', '={'],
          ['plain', 'servicos'],
          ['punctuation', '} />'],
        ],
      },
      {
        indent: 2,
        tokens: [
          ['punctuation', '</'],
          ['component', 'Pagina'],
          ['punctuation', '>'],
        ],
      },
      { indent: 1, tokens: [['punctuation', ')']] },
      { indent: 0, tokens: [['punctuation', '}']] },
    ],
  },
  {
    id: 'sistema',
    file: 'sistema.tsx',
    label: 'Sistema',
    projectType: 'sistema-web',
    summary:
      'Exemplo: o código de um painel de gestão sendo escrito e o sistema se montando ao lado.',
    quoteLabel: 'Quero um sistema assim',
    code: [
      {
        indent: 0,
        tokens: [
          ['keyword', 'export function '],
          ['component', 'Painel'],
          ['punctuation', '() {'],
        ],
      },
      {
        indent: 1,
        tokens: [
          ['keyword', 'const '],
          ['plain', 'pedidos'],
          ['punctuation', ' = '],
          ['component', 'usePedidos'],
          ['punctuation', '()'],
        ],
      },
      {
        indent: 1,
        tokens: [
          ['keyword', 'return'],
          ['punctuation', ' ('],
        ],
      },
      {
        indent: 2,
        builds: 'frame',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Sistema'],
          ['punctuation', '>'],
        ],
      },
      {
        indent: 3,
        builds: 'sidebar',
        tokens: [
          ['punctuation', '<'],
          ['component', 'MenuLateral'],
          ['punctuation', ' />'],
        ],
      },
      {
        indent: 3,
        builds: 'kpis',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Resumo'],
          ['attribute', ' de'],
          ['punctuation', '={'],
          ['plain', 'pedidos'],
          ['punctuation', '} />'],
        ],
      },
      {
        indent: 3,
        builds: 'chart',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Grafico'],
          ['attribute', ' serie'],
          ['punctuation', '='],
          ['string', '"mensal"'],
          ['punctuation', ' />'],
        ],
      },
      {
        indent: 3,
        builds: 'table',
        tokens: [
          ['punctuation', '<'],
          ['component', 'Tabela'],
          ['attribute', ' de'],
          ['punctuation', '={'],
          ['plain', 'pedidos'],
          ['punctuation', '} />'],
        ],
      },
      {
        indent: 2,
        tokens: [
          ['punctuation', '</'],
          ['component', 'Sistema'],
          ['punctuation', '>'],
        ],
      },
      { indent: 1, tokens: [['punctuation', ')']] },
      { indent: 0, tokens: [['punctuation', '}']] },
    ],
  },
  {
    id: 'integracao',
    file: 'integracao.ts',
    label: 'Integração',
    projectType: 'automacao-integracao',
    summary:
      'Exemplo: o código de uma integração sendo escrito e um pedido passando sozinho pelo CRM, pela planilha e pelo WhatsApp.',
    quoteLabel: 'Quero integrar assim',
    code: [
      // Só caracteres da fonte mono: a digitação conta 1ch por caractere.
      { indent: 0, tokens: [['comment', '// pedido novo: tudo em dia']] },
      {
        indent: 0,
        builds: 'source',
        tokens: [
          ['keyword', 'async function '],
          ['component', 'sincronizar'],
          ['punctuation', '('],
          ['plain', 'p'],
          ['punctuation', ') {'],
        ],
      },
      {
        indent: 1,
        builds: 'crm',
        tokens: [
          ['keyword', 'const '],
          ['plain', 'c'],
          ['punctuation', ' = '],
          ['keyword', 'await '],
          ['plain', 'crm'],
          ['punctuation', '.'],
          ['component', 'salvar'],
          ['punctuation', '('],
          ['plain', 'p'],
          ['punctuation', ')'],
        ],
      },
      {
        indent: 1,
        builds: 'sheet',
        tokens: [
          ['keyword', 'await '],
          ['plain', 'planilha'],
          ['punctuation', '.'],
          ['component', 'adicionar'],
          ['punctuation', '('],
          ['plain', 'c'],
          ['punctuation', ')'],
        ],
      },
      {
        indent: 1,
        builds: 'whatsapp',
        tokens: [
          ['keyword', 'await '],
          ['plain', 'whatsapp'],
          ['punctuation', '.'],
          ['component', 'avisar'],
          ['punctuation', '('],
          ['plain', 'c'],
          ['punctuation', ')'],
        ],
      },
      {
        indent: 1,
        builds: 'done',
        tokens: [
          ['keyword', 'return '],
          ['string', "'sincronizado'"],
        ],
      },
      { indent: 0, tokens: [['punctuation', '}']] },
    ],
  },
]

/**
 * Textos do preview (a página, o sistema e o fluxo que se montam). São dados de
 * exemplo de uma demonstração: nenhum deles representa cliente ou número real.
 */
export const workbenchPreview = {
  site: {
    brand: 'Sua marca',
    links: ['Início', 'Serviços', 'Contato'],
    headline: 'Seu negócio, online',
    subline: 'Mostre o que você faz e receba pedidos pelo site.',
    cta: 'Pedir orçamento',
    tiles: ['Serviços', 'Sobre nós', 'Fale com a gente'],
  },
  sistema: {
    title: 'Pedidos',
    menu: ['Painel', 'Pedidos', 'Clientes', 'Estoque'],
    kpis: [
      { label: 'Hoje', value: '42' },
      { label: 'Clientes', value: '318' },
      { label: 'Entregues', value: '96%' },
    ],
    rows: [
      { id: '#1042', status: 'Pago' },
      { id: '#1041', status: 'Separando' },
      { id: '#1040', status: 'Enviado' },
    ],
  },
  integracao: {
    nodes: {
      source: { label: 'Site', detail: 'novo pedido' },
      crm: { label: 'CRM', detail: 'cliente salvo' },
      sheet: { label: 'Planilha', detail: 'linha adicionada' },
      whatsapp: { label: 'WhatsApp', detail: 'equipe avisada' },
    },
    done: 'sincronizado',
  },
}

export const workbenchCopy = {
  label: 'Demonstração: um projeto sendo construído ao vivo',
  tablistLabel: 'Tipo de projeto',
  path: '~/risen/projetos',
  building: 'compilando…',
  done: 'pronto',
  pause: 'Pausar animação',
  resume: 'Continuar animação',
}
