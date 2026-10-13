import { siteConfig } from '@/content/site'
import type { Service } from '@/types/content'

/** Lojas virtuais aparecem nos serviços apenas se o tipo estiver ativo no formulário (site.ts). */
const onlineStoreEnabled = siteConfig.contactForm.projectTypes.some(
  (type) => type.id === 'loja-virtual' && type.enabled,
)

export const services: Service[] = [
  {
    id: 'sites',
    title: 'Sites e experiências digitais',
    shortTitle: 'Sites e landing pages',
    description:
      'Presença online profissional, rápida e pensada para transformar visitas em contatos.',
    icon: 'layout',
    benefits: [
      'Design próprio, alinhado à sua marca',
      'Carregamento rápido e boa base de SEO',
      'Leitura confortável em qualquer tela',
    ],
    examples: [
      { label: 'Sites institucionais' },
      { label: 'Landing pages' },
      { label: 'Portfólios profissionais' },
      { label: 'Lojas virtuais', enabled: onlineStoreEnabled },
    ],
    cta: { label: 'Quero um site', projectType: 'site-institucional' },
  },
  {
    id: 'sistemas',
    title: 'Sistemas e plataformas web',
    shortTitle: 'Sistemas e SaaS',
    description:
      'Ferramentas sob medida para organizar a operação, atender clientes e lançar produtos digitais.',
    icon: 'layers',
    benefits: [
      'Feito para o seu fluxo de trabalho, e não o contrário',
      'Acesso pelo navegador, de qualquer lugar',
      'Estrutura preparada para crescer',
    ],
    examples: [
      { label: 'Sistemas personalizados' },
      { label: 'Dashboards' },
      { label: 'Plataformas SaaS' },
      { label: 'Painéis administrativos' },
      { label: 'Áreas de clientes' },
    ],
    cta: { label: 'Quero um sistema', projectType: 'sistema-web' },
  },
  {
    id: 'integracoes',
    title: 'Integrações e evolução digital',
    shortTitle: 'Integrações e automações',
    description:
      'Conectamos ferramentas, automatizamos tarefas repetitivas e mantemos seus sistemas evoluindo.',
    icon: 'workflow',
    benefits: [
      'Menos trabalho manual e menos retrabalho',
      'Dados circulando entre as ferramentas que você já usa',
      'Manutenção contínua, quando contratada',
    ],
    examples: [
      { label: 'Integrações com APIs' },
      { label: 'Automações de processos' },
      { label: 'Integrações de pagamento' },
      { label: 'Manutenção e evolução de sistemas' },
    ],
    cta: { label: 'Quero integrar ou automatizar', projectType: 'automacao-integracao' },
  },
]
