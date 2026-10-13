import type { Need } from '@/types/content'

export const needs: Need[] = [
  {
    id: 'apresentar-empresa',
    statement: 'Preciso apresentar minha empresa profissionalmente.',
    solution: 'Site institucional',
    projectType: 'site-institucional',
    whatsappMessage:
      'Olá! Preciso apresentar minha empresa profissionalmente e quero saber mais sobre a criação de um site institucional.',
  },
  {
    id: 'captar-clientes',
    statement: 'Quero divulgar uma oferta e captar clientes.',
    solution: 'Landing page',
    projectType: 'landing-page',
    whatsappMessage:
      'Olá! Quero divulgar uma oferta e captar clientes. Podemos conversar sobre uma landing page?',
  },
  {
    id: 'automatizar-processos',
    statement: 'Preciso automatizar tarefas e organizar processos.',
    solution: 'Automação ou sistema sob medida',
    projectType: 'automacao-integracao',
    whatsappMessage:
      'Olá! Preciso automatizar tarefas e organizar processos na minha empresa. Podemos conversar?',
  },
  {
    id: 'criar-plataforma',
    statement: 'Quero desenvolver meu próprio sistema ou plataforma.',
    solution: 'Sistema web ou plataforma SaaS',
    projectType: 'plataforma-saas',
    whatsappMessage:
      'Olá! Quero desenvolver meu próprio sistema ou plataforma e gostaria de entender como começar.',
  },
]
