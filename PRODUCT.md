# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O site precisa convencer três públicos a pedir orçamento:

- **Negócios locais.** Comércios e empresas de Salto, Itu, Indaiatuba e região, que procuram alguém próximo para colocar ou renovar a presença online.
- **Profissionais liberais e prestadores de serviço.** Médicos, advogados, consultores e afins, que precisam de um site profissional para gerar contatos.
- **Empresas com processos para organizar.** Negócios que precisam de um sistema web sob medida, de uma plataforma SaaS ou de integrações entre ferramentas.

O atendimento é presencial na região e remoto para todo o Brasil. Infoprodutores e lançamentos não são o público prioritário.

A visita típica é de quem chega pelo celular, por indicação, Instagram ou busca local. A pessoa avalia se a Risen é confiável e capaz antes de chamar.

## Product Purpose

O site comercial da Risen Studio transforma visitantes em contatos, pelo formulário de orçamento ou pelo WhatsApp.

Sucesso é a pessoa entender, em poucos segundos, o que a Risen faz e confiar em quem faz. Depois disso, ela pede um orçamento sem fricção.

## Positioning

A Risen é um estúdio conduzido pelo próprio fundador, **Julio César Lavras**, desenvolvedor full stack formado em Ciência da Computação.

- **Quem atende é quem constrói.** O cliente fala direto com quem faz o design e o código, do primeiro contato à entrega.
- **Ponta a ponta.** O estúdio cobre do site institucional ao sistema web.
- **Três frentes com o mesmo peso:**
  1. sites e landing pages;
  2. sistemas web e SaaS;
  3. integrações, automações e evolução de sistemas.
- **Diferença de uma agência genérica.** Proximidade, contato direto com o desenvolvedor e cuidado técnico real (desempenho, acessibilidade, código próprio).

## Operating Context

- Contato pelo formulário (Server Action com Resend, ainda não configurado) ou pelo WhatsApp (11) 98958-7895.
- Instagram: https://www.instagram.com/risenstudio.dev/. LinkedIn e GitHub pessoais do fundador entram depois.
- Domínio: risenstudio.com.br. Ele já hospeda o site atual e será usado por este.
- Deploy previsto na Vercel.

## Capabilities and Constraints

- **Stack:** Next.js (App Router), Tailwind v4, shadcn/ui, React Bits, Motion, React Hook Form e Zod, Resend e React Email, conteúdo em arquivos TS e MDX. Não há banco de dados, autenticação nem CMS.
- **Serviços:** lojas virtuais **não** são oferecidas.
- **Preços e prazos:** nada de valores ou prazos fixos.
- **Envio do formulário:** nunca simular. Sem a chave do Resend, o site mostra um erro honesto.
- **Projetos:** todo projeto exibe o selo obrigatório "Cliente", "Projeto autoral" ou "Conceito". Os filtros só aparecem com 6 ou mais projetos.
- **Em aberto:**
  - projetos reais de clientes;
  - e-mail comercial;
  - configuração do Resend;
  - links do LinkedIn e do GitHub;
  - dados do controlador para a política de privacidade.

## Brand Commitments

- **Nome:** Risen Studio.
- **Ativos oficiais:**
  - o monograma "R", com a curva em gradiente e a perna dividida em um traço branco e outro em gradiente;
  - o logotipo "RISΞN", com o E em três barras.
  - Arquivos: `public/images/favicon.jpeg` e `public/images/og-image.jpeg`.
- **Cores da marca:** o site deve seguir as cores do logo, um gradiente azul-elétrico → índigo → violeta sobre um fundo quase preto azulado. O usuário pediu explicitamente para "puxar a paleta da Risen".
- **Voz:** português do Brasil, direta e próxima, sem jargão de agência.
- **O que evitar:** cara de template. É o que faria o resultado parecer errado para o usuário.

## Evidence on Hand

- **Projetos reais:** Nutri+ (autoral, em desenvolvimento), Portfólio Ellen Danieli (colaboração) e Notas de Café (cliente), com capturas em `public/images/projects/`.
- **Fundador:** Julio César Lavras, formado em Ciência da Computação, desenvolvedor full stack.
- **Tecnologias do fundador:** JavaScript, TypeScript, React, Node.js, Express, SQLite e PostgreSQL.
- **Não existem e não podem ser inventados:**
  - projetos de clientes;
  - depoimentos;
  - números, estatísticas ou clientes atendidos;
  - preços e prazos.

## Product Principles

1. **Provar em vez de prometer.** O próprio site é a primeira demonstração de capacidade.
2. **A pessoa por trás aparece.** A confiança vem do contato direto com quem constrói.
3. **Conversão sem fricção.** O orçamento e o WhatsApp estão sempre a um passo, e o formulário pré-seleciona o tipo de projeto.
4. **Honestidade antes de impacto.** Nada de números, clientes ou envios simulados.

## Accessibility & Inclusion

- **Padrão:** WCAG 2.2 AA.
- **Movimento:** respeitar a preferência por movimento reduzido.
- **Toque:** alvos de pelo menos 44 px e área segura em celulares.
- **Larguras de referência:** de 320 px a 1920 px ou mais.
- **Desempenho:** Lighthouse mobile ≥ 90 em todas as categorias, como meta.
