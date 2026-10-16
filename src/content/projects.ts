import type { Project } from '@/types/content'

/**
 * Portfólio.
 *
 * - `kind` define o selo exibido: "autoral" (produto próprio), "colaboracao"
 *   (feito junto com outra pessoa), "cliente" (trabalho contratado) ou
 *   "conceito". Nunca apresente um projeto autoral ou conceito como trabalho
 *   para terceiros.
 * - `hasCaseStudy: true` exige o arquivo src/content/projects/<slug>.mdx.
 * - Imagens provisórias devem usar os placeholders neutros de
 *   /public/images/placeholders (nunca capturas inventadas).
 * - `placeholder: true` marca conteúdo de exemplo: aparece só em
 *   desenvolvimento. Substitua por projetos reais ou apague esses itens.
 */
export const projects: Project[] = [
  {
    slug: 'nutri-plus',
    name: 'Nutri+',
    kind: 'autoral',
    category: 'sistemas',
    cover: {
      src: '/images/projects/nutri-plus/landing.png',
      alt: 'Página de apresentação do Nutri+, com o título "Organize sua clínica de nutrição em um só lugar" e uma tela do sistema ao lado',
    },
    logo: '/images/projects/nutri-plus/logo.png',
    caseStudyCover: {
      src: '/images/projects/nutri-plus/dashboard.png',
      alt: 'Dashboard do Nutri+: pacientes ativos, planos ativos e consultas do dia em destaque, a lista de consultas de hoje e a atividade recente do consultório',
    },
    summary:
      'A rotina inteira do consultório de nutrição em um só lugar: pacientes, avaliações, evolução, planos alimentares, agenda e financeiro. Produto próprio, em desenvolvimento.',
    problem:
      'Nutricionistas dividem o dia entre planilhas, aplicativos de agenda, conversas no WhatsApp e arquivos soltos. Os dados de cada paciente ficam espalhados, montar um plano alimentar toma tempo e acompanhar pagamentos e retornos vira trabalho manual.',
    solution:
      'Um sistema web que centraliza o consultório: o dashboard mostra o dia e quem precisa de atenção, a ficha reúne avaliações, medidas e a evolução em gráficos, os planos alimentares calculam os macronutrientes pela Tabela TACO e viram PDF, e agenda e financeiro andam junto com os atendimentos.',
    features: [
      'Dashboard com as consultas do dia, a atividade recente e os pacientes que precisam de atenção',
      'Ficha do paciente com avaliações, medidas, percentual de gordura, histórico clínico e notas',
      'Gráficos de evolução do peso e da composição corporal, com meta e progresso',
      'Planos alimentares com macronutrientes calculados pela Tabela TACO, exportados em PDF',
      'Agenda semanal com o valor de cada consulta e emissão de recibo do atendimento',
      'Financeiro com faturamento mensal, pagamentos pendentes e cobrança por e-mail a quem está em atraso',
      'Dados dos pacientes criptografados, com login protegido por verificação em duas etapas',
      'Exportação dos dados do paciente e backup completo em arquivo .zip',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Recharts', 'PostgreSQL'],
    gallery: [
      {
        src: '/images/projects/nutri-plus/evolucao-peso.png',
        alt: 'Evolução de uma paciente no Nutri+: peso inicial, peso atual, meta e progresso, gráfico do peso ao longo de quatro meses e histórico de registros',
      },
      {
        src: '/images/projects/nutri-plus/financeiro.png',
        alt: 'Tela financeira do Nutri+: valores recebidos e pendentes do mês, gráfico de faturamento do ano e lista de pagamentos pendentes com aviso de cobrança',
      },
      {
        src: '/images/projects/nutri-plus/pacientes.png',
        alt: 'Lista de pacientes do Nutri+ em cartões, cada um com objetivo, restrições, peso e IMC',
      },
      {
        src: '/images/projects/nutri-plus/paciente-ficha.png',
        alt: 'Ficha de uma paciente no Nutri+: altura, peso, IMC, percentual de gordura, última avaliação, notas clínicas e seções de avaliações, histórico, plano alimentar e evolução',
      },
      {
        src: '/images/projects/nutri-plus/avaliacoes-medidas.png',
        alt: 'Avaliações de uma paciente no Nutri+: gráfico do percentual de gordura e a lista de avaliações com peso, IMC, gordura, massa magra e medidas de cintura, abdômen e quadril',
      },
      {
        src: '/images/projects/nutri-plus/plano-alimentar.png',
        alt: 'Plano alimentar no Nutri+, organizado por refeição e horário, com calorias e macronutrientes de cada alimento, total calculado e botão para baixar em PDF',
      },
      {
        src: '/images/projects/nutri-plus/agenda.png',
        alt: 'Agenda do Nutri+: dias da semana com o número de consultas, os atendimentos do dia com horário e valor, resumo da semana e lembretes',
      },
      {
        src: '/images/projects/nutri-plus/landing.png',
        alt: 'Página de apresentação do Nutri+, com o título "Organize sua clínica de nutrição em um só lugar" e uma tela do sistema ao lado',
      },
    ],
    hasCaseStudy: true,
    featured: true,
  },
  {
    slug: 'portfolio-ellen-danieli',
    name: 'Portfólio Ellen Danieli',
    kind: 'colaboracao',
    category: 'sites',
    cover: {
      src: '/images/projects/ellen-danieli/capa.png',
      alt: 'Página inicial do portfólio de Ellen Danieli: o título "Design que traduz delicadeza, presença e intenção" em serifa larga, ao lado de um retrato da designer',
    },
    summary:
      'Portfólio da designer gráfica Ellen Danieli, com domínio próprio. Uma vitrine de leitura editorial, em que tipografia e imagens conduzem a apresentação dos trabalhos, leve e rápida em qualquer tela.',
    problem:
      'Uma designer gráfica precisa de um portfólio que seja, ele mesmo, uma prova do seu olhar: os trabalhos têm de aparecer com destaque, sem que o site concorra com eles.',
    solution:
      'Um site com estrutura editorial, tipografia expressiva e paleta suave, que apresenta cada trabalho como uma peça e carrega rápido mesmo com muitas imagens.',
    features: [
      'Apresentação editorial dos trabalhos, com a tipografia como protagonista',
      'Imagens otimizadas para carregar rápido sem perder a qualidade',
      'Leitura confortável do celular ao desktop',
      'Domínio próprio e contato direto para pedidos de orçamento',
    ],
    liveUrl: 'https://ellendanieliportfolio.com/',
    hasCaseStudy: false,
    featured: false,
  },
  {
    slug: 'notas-de-cafe',
    name: 'Notas de Café',
    kind: 'cliente',
    category: 'sites',
    cover: {
      src: '/images/projects/notas-de-cafe/capa.png',
      alt: 'Página inicial do Notas de Café: o título "Uma marca que transforma café em experiência sensorial" em serifa elegante, ao lado de um painel verde-escuro sobre a essência da marca',
    },
    summary:
      'Site completo para uma marca autoral que une café e música. Storytelling sensorial, catálogo com carrinho e pedido finalizado direto no WhatsApp, com identidade visual criada do zero.',
    problem:
      'Uma marca nova de café precisava de presença própria: contar sua história, apresentar os grãos e vender sem depender de marketplace nem de um checkout complicado.',
    solution:
      'Um site com narrativa sensorial, que conduz da história da marca ao catálogo, com carrinho e finalização do pedido pelo WhatsApp, sobre uma identidade visual construída do zero.',
    features: [
      'Identidade visual criada do zero, da tipografia à paleta',
      'Storytelling sensorial que apresenta a marca e os grãos',
      'Catálogo com carrinho de compras',
      'Pedido finalizado direto no WhatsApp',
    ],
    liveUrl: 'https://www.notasdecaféoficial.com.br/',
    hasCaseStudy: false,
    featured: false,
  },
]
