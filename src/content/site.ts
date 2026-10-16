import type { SiteConfig } from '@/types/content'

/**
 * Dados gerais da Risen Studio: contatos, WhatsApp, redes, SEO e formulário.
 *
 * ⚠ Itens marcados com SUBSTITUIR são provisórios e precisam receber dados reais
 * antes da publicação.
 */
export const siteConfig = {
  name: 'Risen Studio',
  legalName: 'Risen Studio',
  description:
    'Estúdio de design e desenvolvimento em Salto, SP. Criamos sites, landing pages, sistemas web sob medida e plataformas SaaS.',
  locale: 'pt-BR',
  location: {
    city: 'Salto',
    state: 'SP',
    stateName: 'São Paulo',
    country: 'BR',
    serviceAreas: ['Salto', 'Itu', 'Indaiatuba'],
  },
  contact: {
    // E-mail comercial. Se for null, o site não mostra e-mail e usa o WhatsApp
    // como canal de contato.
    email: 'risenstudiooficial@gmail.com',
    whatsapp: {
      // Apenas dígitos, com DDI 55 + DDD + número.
      number: '5511989587895',
      display: '(11) 98958-7895',
      messages: {
        default: 'Olá! Vim pelo site da Risen Studio e gostaria de conversar sobre um projeto.',
        contactSection: 'Olá! Prefiro conversar por aqui sobre o meu projeto.',
        afterSubmit: 'Olá! Acabei de enviar uma solicitação de orçamento pelo site.',
        afterError:
          'Olá! Tentei enviar o formulário de orçamento pelo site, mas não consegui. Podemos conversar por aqui?',
        caseStudy:
          // {projeto} é substituído pelo nome do projeto.
          'Olá! Vi o projeto "{projeto}" no site da Risen Studio e quero conversar sobre algo parecido.',
      },
    },
  },
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/risenstudio.dev/', icon: 'instagram' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/juliocesarel/', icon: 'linkedin' },
    { label: 'GitHub', url: 'https://github.com/juliocesarEL', icon: 'github' },
  ],
  seo: {
    title: 'Risen Studio — Criação de sites e sistemas web em Salto, SP',
    titleTemplate: '%s | Risen Studio',
    description:
      'Criação de sites, landing pages, sistemas web sob medida e plataformas SaaS para empresas e profissionais de Salto, Itu, Indaiatuba e região, com atendimento local e remoto.',
    keywords: [
      'criação de sites em Salto',
      'criação de sites em Itu',
      'criação de sites em Indaiatuba',
      'desenvolvimento de sistemas web',
      'sistema sob medida',
      'landing page',
      'plataforma SaaS',
      'estúdio de design e desenvolvimento',
    ],
  },
  founder: {
    name: 'Julio César Lavras',
    role: 'Fundador · desenvolvedor full stack',
    handle: '@juliocesarel',
    bio: [
      'Sou desenvolvedor full stack, formado em Ciência da Computação. À frente da Risen Studio, acompanho cada projeto do primeiro contato à entrega: entendo a necessidade, desenho a experiência e desenvolvo a solução.',
      'Na prática, você conversa diretamente com quem constrói o seu produto, sem intermediários e sem perder detalhes pelo caminho.',
    ],
    // Preenche o retrato do cartão de perfil (4:5), centralizada.
    photo: {
      src: '/images/fundador/julio-cesar-lavras.jpeg',
      alt: 'Retrato de Julio César Lavras, fundador da Risen Studio, de camiseta preta, ao ar livre',
    },
  },
  technologies: [
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React', icon: 'react' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express', icon: 'express' },
    { name: 'SQLite', icon: 'sqlite' },
    { name: 'PostgreSQL', icon: 'postgresql' },
  ],
  contactForm: {
    projectTypes: [
      { id: 'site-institucional', label: 'Site institucional', enabled: true },
      { id: 'landing-page', label: 'Landing page', enabled: true },
      { id: 'portfolio', label: 'Portfólio profissional', enabled: true },
      // A Risen não oferece lojas virtuais: desligado aqui, também some do card de serviços.
      { id: 'loja-virtual', label: 'Loja virtual', enabled: false },
      { id: 'sistema-web', label: 'Sistema web personalizado', enabled: true },
      { id: 'plataforma-saas', label: 'Plataforma SaaS', enabled: true },
      { id: 'automacao-integracao', label: 'Automação ou integração', enabled: true },
      { id: 'manutencao', label: 'Manutenção ou evolução de sistema', enabled: true },
      { id: 'outro', label: 'Outro / ainda não sei', enabled: true },
    ],
    // Faixas exibidas no formulário. Edite à vontade: o formulário e a validação
    // usam esta lista automaticamente.
    budgetRanges: [
      { id: 'ate-2k', label: 'Até R$ 2.000' },
      { id: '2k-5k', label: 'R$ 2.000 – R$ 5.000' },
      { id: '5k-15k', label: 'R$ 5.000 – R$ 15.000' },
      { id: 'acima-15k', label: 'Acima de R$ 15.000' },
      { id: 'nao-sei', label: 'Ainda não sei' },
    ],
  },
} satisfies SiteConfig
