import type { Need } from '@/types/content'

export const needs: Need[] = [
  {
    id: 'apresentar-empresa',
    statement: 'Preciso apresentar minha empresa profissionalmente.',
    solution: 'Site institucional',
    reply:
      'Para isso, o caminho é um site institucional: uma vitrine que apresenta sua empresa com cara profissional, aparece no Google e leva o visitante direto ao contato.',
    projectType: 'site-institucional',
    whatsappMessage:
      'Olá! Preciso apresentar minha empresa profissionalmente e quero saber mais sobre a criação de um site institucional.',
  },
  {
    id: 'captar-clientes',
    statement: 'Quero divulgar uma oferta e captar clientes.',
    solution: 'Landing page',
    reply:
      'Aqui o ideal é uma landing page: uma página focada em uma única oferta, com tudo pensado para o visitante dar o próximo passo e falar com você.',
    projectType: 'landing-page',
    whatsappMessage:
      'Olá! Quero divulgar uma oferta e captar clientes. Podemos conversar sobre uma landing page?',
  },
  {
    id: 'automatizar-processos',
    statement: 'Preciso automatizar tarefas e organizar processos.',
    solution: 'Automação ou sistema sob medida',
    reply:
      'Dá para resolver com uma automação ou um sistema sob medida: as tarefas repetitivas passam a rodar sozinhas e as informações ficam organizadas em um só lugar.',
    projectType: 'automacao-integracao',
    whatsappMessage:
      'Olá! Preciso automatizar tarefas e organizar processos na minha empresa. Podemos conversar?',
  },
  {
    id: 'criar-plataforma',
    statement: 'Quero desenvolver meu próprio sistema ou plataforma.',
    solution: 'Sistema web ou plataforma SaaS',
    reply:
      'Então o caminho é um sistema web ou uma plataforma SaaS, desenhado com você do escopo ao lançamento e pensado para crescer junto com o negócio.',
    projectType: 'plataforma-saas',
    whatsappMessage:
      'Olá! Quero desenvolver meu próprio sistema ou plataforma e gostaria de entender como começar.',
  },
]
