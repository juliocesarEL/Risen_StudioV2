/**
 * Configuração do `cn` (junção de classes + resolução de conflitos do Tailwind).
 *
 * As tabelas de merge são compiladas no build a partir deste arquivo e do
 * globals.css (`withCn` em next.config.ts gera src/lib/cn-tables.ts). Assim o
 * navegador recebe só as tabelas prontas, sem o compilador.
 *
 * Os tokens próprios do tema (tamanhos fluidos, sombras, raios, espaçamentos e
 * larguras de fonte definidos em globals.css) precisam ser registrados: sem
 * isso, `text-display` seria tratado como cor e `font-stretch-semi` como
 * família de fonte, e classes válidas seriam descartadas no merge.
 */
const cnConfig = {
  extend: {
    theme: {
      text: ['display', 'page-title', 'h2', 'title', 'h3', 'lead'],
      shadow: ['card', 'glow', 'glow-strong', 'whatsapp', 'window'],
      radius: ['card', 'pill'],
      spacing: ['section', 'gutter', 'nav'],
      container: ['content'],
    },
    classGroups: {
      'font-stretch': [{ 'font-stretch': ['display', 'semi'] }],
    },
  },
}

export default cnConfig
