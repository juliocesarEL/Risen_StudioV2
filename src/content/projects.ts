import type { Project } from '@/types/content'

/**
 * Portfólio.
 *
 * - `kind` define o selo exibido: "cliente", "autoral" ou "conceito". Nunca
 *   apresente um projeto autoral ou conceito como trabalho feito para cliente.
 * - `hasCaseStudy: true` exige o arquivo src/content/projects/<slug>.mdx.
 * - Imagens provisórias devem usar os placeholders neutros de
 *   /public/images/placeholders (nunca capturas inventadas).
 * - `placeholder: true` marca conteúdo de exemplo: aparece só em
 *   desenvolvimento. Substitua por projetos reais ou apague esses itens.
 */
export const projects: Project[] = [
  {
    slug: 'site-risen-studio',
    name: 'Site da Risen Studio',
    kind: 'autoral',
    category: 'sites',
    cover: {
      src: '/images/projects/site-risen-studio/capa.png',
      alt: 'Página inicial do site da Risen Studio, com o título em destaque sobre a cena de partículas',
    },
    summary:
      'O site que você está navegando: cena interativa em WebGL, conteúdo editável em arquivos tipados e um fluxo de orçamento pensado para gerar conversas.',
    problem:
      'O estúdio precisava de uma presença que mostrasse, na prática, o nível de design e de engenharia que entrega, e que transformasse visitas em pedidos de orçamento.',
    solution:
      'Um site em Next.js com conteúdo centralizado, cena de partículas leve no topo, formulário validado no navegador e no servidor e arquitetura em camadas no fluxo de contato.',
    features: [
      'Cena de partículas em WebGL que reage ao cursor, com versão estática para quem prefere menos movimento',
      'Formulário de orçamento com validação em tempo real, proteção contra spam e envio por e-mail',
      'Conteúdo centralizado em arquivos tipados e estudos de caso escritos em MDX',
      'SEO técnico com metadados, imagens de compartilhamento geradas automaticamente e dados estruturados',
      'Navegação completa por teclado e contraste adequado em todos os textos',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'React Bits',
      'Motion',
      'Zod',
      'Resend',
      'Vercel',
    ],
    gallery: [
      {
        src: '/images/projects/site-risen-studio/servicos.png',
        alt: 'Seção de serviços com três cards: sites, sistemas e integrações',
      },
      {
        src: '/images/projects/site-risen-studio/processo.png',
        alt: 'Linha do tempo com as cinco etapas do processo de trabalho',
      },
      {
        src: '/images/projects/site-risen-studio/contato.png',
        alt: 'Formulário de orçamento ao lado do bloco de contato direto',
      },
    ],
    hasCaseStudy: true,
    featured: true,
  },
  {
    slug: 'painel-de-gestao',
    name: 'Painel de gestão para pequenos negócios',
    kind: 'conceito',
    category: 'sistemas',
    cover: {
      src: '/images/placeholders/projeto.svg',
      alt: 'Imagem provisória do projeto Painel de gestão para pequenos negócios',
    },
    summary:
      'Estudo de interface para um painel que reúne pedidos, clientes e indicadores do dia em uma única tela.',
    problem:
      'Pequenos negócios costumam controlar pedidos e clientes em planilhas e conversas espalhadas.',
    solution:
      'Um painel web com visão geral do dia, cadastro de clientes e acompanhamento de pedidos por etapa.',
    features: ['Visão geral do dia', 'Cadastro de clientes', 'Pedidos organizados por etapa'],
    hasCaseStudy: false,
    featured: false,
    placeholder: true,
  },
  {
    slug: 'landing-page-de-lancamento',
    name: 'Landing page de lançamento',
    kind: 'conceito',
    category: 'sites',
    cover: {
      src: '/images/placeholders/projeto.svg',
      alt: 'Imagem provisória do projeto Landing page de lançamento',
    },
    summary:
      'Estudo de estrutura e narrativa para uma página de captação focada em uma única oferta.',
    problem: 'Páginas de lançamento perdem conversões quando tentam falar de tudo ao mesmo tempo.',
    solution:
      'Uma página enxuta, com hierarquia clara, argumentos em ordem de importância e uma única chamada para ação.',
    features: ['Hierarquia de conteúdo', 'Chamada única para ação', 'Formulário de captação'],
    hasCaseStudy: false,
    featured: false,
    placeholder: true,
  },
]
