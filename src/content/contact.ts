import type { SectionCopy } from '@/types/content'

/** Textos da seção de contato e do formulário de orçamento. */
export const contactSection = {
  heading: {
    title: 'Sua ideia merece sair do papel.',
    description:
      'Conte um pouco sobre o seu projeto e vamos entender como transformá-lo em uma solução digital.',
  } satisfies SectionCopy,

  directContact: {
    title: 'Prefere falar direto?',
    description: 'Também respondemos pelo WhatsApp e por e-mail.',
    /** Usada enquanto não houver e-mail comercial definido (site.ts). */
    descriptionWithoutEmail: 'Também respondemos pelo WhatsApp.',
    whatsappCta: 'Chamar no WhatsApp',
    emailLabel: 'E-mail comercial',
    copyEmail: 'Copiar e-mail',
    emailCopied: 'E-mail copiado.',
    emailCopyFailed: 'Não foi possível copiar. Selecione o endereço e copie manualmente.',
    socialTitle: 'Redes',
  },
}

export const contactFormCopy = {
  optionalTag: 'opcional',
  fields: {
    name: { label: 'Nome', placeholder: 'Como podemos te chamar?' },
    email: { label: 'E-mail', placeholder: 'voce@empresa.com.br' },
    phone: { label: 'WhatsApp ou telefone', placeholder: '(00) 00000-0000' },
    company: { label: 'Empresa', placeholder: 'Nome da empresa' },
    projectType: { label: 'Tipo de projeto', placeholder: 'Selecione uma opção' },
    budget: { label: 'Faixa de investimento', placeholder: 'Selecione uma faixa' },
    message: {
      label: 'Descreva sua necessidade',
      placeholder: 'Conte o que você precisa, para quem é e o que espera alcançar.',
      // {count} e {min} são substituídos pelo formulário.
      counterBelowMin: '{count} de no mínimo {min} caracteres',
      counter: '{count} caracteres',
    },
    consent: {
      before:
        'Concordo com o uso dos meus dados para receber o retorno da Risen Studio, conforme a ',
      link: 'Política de Privacidade',
      after: '.',
    },
    honeypot: 'Deixe este campo em branco',
  },
  submit: { idle: 'Enviar solicitação', pending: 'Enviando…' },

  validation: {
    nameMin: 'Informe seu nome (mínimo de 2 caracteres).',
    nameMax: 'Use no máximo 120 caracteres.',
    emailRequired: 'Informe seu e-mail.',
    emailInvalid: 'Informe um e-mail válido, como nome@empresa.com.br.',
    phoneInvalid: 'Informe o número com DDD (10 ou 11 dígitos).',
    companyMax: 'Use no máximo 120 caracteres.',
    projectTypeRequired: 'Selecione o tipo de projeto.',
    budgetInvalid: 'Selecione uma das faixas disponíveis.',
    messageMin: 'Conte um pouco mais: mínimo de 20 caracteres.',
    messageMax: 'Use no máximo 4.000 caracteres.',
    consentRequired: 'Para enviar, é preciso concordar com a Política de Privacidade.',
  },

  success: {
    title: 'Recebemos sua solicitação!',
    description:
      'Vamos ler o que você contou e responder pelo e-mail ou telefone informado. Se preferir adiantar a conversa, chame no WhatsApp.',
    whatsappCta: 'Falar no WhatsApp',
    resetCta: 'Enviar outra solicitação',
  },

  errors: {
    title: 'Não foi possível enviar',
    validation: 'Revise os campos destacados e tente novamente.',
    rateLimited:
      'Recebemos muitas tentativas seguidas. Aguarde alguns minutos e tente de novo, ou fale com a gente pelo WhatsApp.',
    unavailable:
      'O envio pelo formulário está indisponível no momento. Fale com a gente pelo WhatsApp ou por e-mail.',
    deliveryFailed:
      'Não conseguimos enviar sua mensagem agora. Tente de novo em instantes ou use o WhatsApp ou o e-mail.',
    rejected:
      'Não foi possível enviar sua mensagem. Se o problema continuar, fale com a gente pelo WhatsApp ou por e-mail.',
    unexpected:
      'Algo deu errado no envio. Verifique sua conexão e tente novamente, ou use o WhatsApp ou o e-mail.',
    retryCta: 'Tentar novamente',
    whatsappCta: 'Falar no WhatsApp',
    emailCta: 'Enviar e-mail',
  },
}

/** Assunto e textos do e-mail enviado ao estúdio. */
export const contactEmailCopy = {
  subject: (name: string, projectType: string) => `Novo orçamento: ${projectType} — ${name}`,
  preview: (name: string) => `${name} enviou uma solicitação de orçamento pelo site.`,
  heading: 'Nova solicitação de orçamento',
  intro: 'Uma nova solicitação chegou pelo formulário do site.',
  labels: {
    name: 'Nome',
    email: 'E-mail',
    phone: 'WhatsApp/telefone',
    company: 'Empresa',
    projectType: 'Tipo de projeto',
    budget: 'Faixa de investimento',
    message: 'Necessidade',
    consent: 'Consentimento LGPD',
    receivedAt: 'Recebido em',
  },
  notInformed: 'Não informado',
  consentGiven: 'Aceito pelo visitante',
  replyHint: 'Responda este e-mail para falar diretamente com quem enviou.',
}
