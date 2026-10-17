import { siteConfig } from '@/content/site'
import type { IconName, SectionCopy } from '@/types/content'

const { city, state, serviceAreas } = siteConfig.location

/** Lista "A, B e C" em português. */
const joinWithAnd = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} e ${items.at(-1)}` : (items[0] ?? '')

export const heroContent = {
  title: {
    lead: 'Ideias extraordinárias merecem',
    highlight: 'experiências digitais à altura.',
  },
  subtitle:
    'Criamos sites e sistemas web sob medida para transformar negócios, simplificar processos e tirar projetos do papel.',
  primaryCta: 'Vamos tirar sua ideia do papel',
  secondaryCta: 'Explorar projetos',
  locationNote: `Atendimento em ${joinWithAnd(serviceAreas)} e região, e remoto para todo o Brasil.`,
}

export const servicesSection = {
  heading: {
    title: 'Do primeiro site ao sistema que sustenta a operação',
    description:
      'Três frentes de trabalho com o mesmo cuidado: entender o objetivo antes de escrever a primeira linha de código.',
  } satisfies SectionCopy,
  benefitsTitle: 'O que você ganha',
  examplesTitle: 'Exemplos',
}

export const projectsSection = {
  heading: {
    title: 'Trabalhos que mostram como pensamos e construímos',
    description:
      'Cada projeto traz um selo que indica sua origem: autoral, colaboração, cliente ou conceito.',
  } satisfies SectionCopy,
  filterLabel: 'Filtrar projetos por categoria',
  filterAll: 'Todos',
  /** Anúncio para leitores de tela após filtrar (singular e plural). */
  filterResult: { one: 'projeto exibido', other: 'projetos exibidos' },
  caseStudyCta: 'Ver projeto',
  /** Link para a página /projetos (aparece quando há mais projetos do que cabe na página inicial). */
  viewMore: 'Ver mais projetos',
  /**
   * Vaga aberta: card vazio que completa a grade. O título muda conforme a
   * frente de serviço, em rodízio, e o botão já leva ao orçamento daquele tipo.
   */
  openSlot: {
    titles: {
      sites: 'Seu site pode estar aqui',
      sistemas: 'Seu sistema pode estar aqui',
      integracoes: 'Sua automação pode estar aqui',
    },
    description: 'Conte sua ideia e vamos tirar do papel juntos.',
    badge: 'Vaga aberta',
    cta: 'Começar meu projeto',
  },
  liveCta: 'Ver site',
  kindLabels: {
    autoral: 'Projeto autoral',
    colaboracao: 'Colaboração',
    cliente: 'Cliente',
    conceito: 'Conceito',
  },
  nextProject: {
    title: 'Seu projeto pode ser o próximo.',
    description: 'Conte o que você tem em mente e vamos desenhar o caminho juntos.',
    cta: 'Solicitar orçamento',
  },
}

/** Página /projetos: o portfólio completo. */
export const projectsPage = {
  title: 'Projetos',
  description:
    'Mais trabalhos da Risen Studio. Os espaços abertos estão reservados para os próximos projetos, e um deles pode ser o seu.',
  backToHome: 'Voltar ao início',
}

export const differentialsSection = {
  heading: {
    title: 'O que você pode esperar de nós',
    description: 'Compromissos que guiam cada projeto, do primeiro esboço à entrega.',
  } satisfies SectionCopy,
}

export const processSection = {
  heading: {
    title: 'Como um projeto ganha forma',
    description: 'Etapas claras, para você saber o que acontece em cada momento.',
  } satisfies SectionCopy,
  stepLabel: 'Etapa',
}

export const needsSection = {
  heading: {
    title: 'Qual é o seu momento?',
    description: 'Escolha a situação mais parecida com a sua. A conversa já começa no ponto certo.',
  } satisfies SectionCopy,
  solutionLabel: 'Solução indicada',
  quoteCta: 'Pedir orçamento',
  whatsappCta: 'Falar no WhatsApp',
}

export const aboutSection = {
  heading: {
    title: 'Quem está por trás da Risen Studio',
  } satisfies SectionCopy,
  profileCta: 'Falar comigo',
  workingTitle: 'Como trabalhamos',
  workingStyle: [
    {
      title: 'Contato direto com quem desenvolve',
      description: 'Você fala com quem desenha e programa o seu projeto, sem intermediários.',
      icon: 'message-circle',
    },
    {
      title: 'Atendimento próximo',
      description: 'Conversas frequentes, entregas parciais e decisões tomadas junto com você.',
      icon: 'user-round',
    },
  ] satisfies { title: string; description: string; icon: IconName }[],
  locationTitle: `${city}, ${state}`,
  locationDescription: `Atendimento presencial em ${joinWithAnd(serviceAreas)} e região, e remoto para empresas de todo o Brasil.`,
  technologiesTitle: 'Tecnologias que usamos',
}

export const faqSection = {
  heading: {
    title: 'Dúvidas comuns antes de começar',
  } satisfies SectionCopy,
  moreQuestions: 'Não encontrou sua dúvida?',
  moreQuestionsCta: 'Pergunte pelo WhatsApp',
}
