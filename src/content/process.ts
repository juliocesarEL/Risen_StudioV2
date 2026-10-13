import type { ProcessStep } from '@/types/content'

/** Etapas na ordem em que acontecem (a numeração é gerada a partir da posição). */
export const processSteps: ProcessStep[] = [
  {
    title: 'Descoberta e entendimento da necessidade',
    description:
      'Conversamos sobre o seu negócio, o público e o problema a resolver. É aqui que definimos o que realmente importa.',
  },
  {
    title: 'Planejamento, escopo e proposta',
    description:
      'Organizamos funcionalidades, prioridades e etapas em uma proposta clara, com o escopo bem definido.',
  },
  {
    title: 'Design e desenvolvimento',
    description:
      'Desenhamos as telas, validamos com você e desenvolvemos com entregas parciais para acompanhamento.',
  },
  {
    title: 'Testes, validação e lançamento',
    description:
      'Testamos em diferentes telas e navegadores, ajustamos os detalhes e colocamos o projeto no ar.',
  },
  {
    title: 'Suporte e evolução',
    description:
      'Quando contratados, seguimos ao seu lado com manutenção, melhorias e novas funcionalidades.',
  },
]
