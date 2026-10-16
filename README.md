# Risen Studio — site comercial

Site da Risen Studio, estúdio de design e desenvolvimento em Salto/SP. O objetivo
do site é transformar visitantes em contatos: pelo formulário de orçamento ou pelo
WhatsApp.

- **Home** com 11 seções: hero, serviços, projetos, diferenciais, processo,
  soluções, sobre, FAQ, contato, rodapé e o botão flutuante de WhatsApp.
- **Estudos de caso** em `/projetos/[slug]`, escritos em MDX.
- **Política de privacidade** (LGPD) em `/privacidade`.

Sem banco de dados, autenticação ou CMS: todo o conteúdo fica em arquivos
TypeScript e MDX dentro de `src/content`.

## Sumário

- [Requisitos](#requisitos)
- [Primeiros passos](#primeiros-passos)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Editar o conteúdo](#editar-o-conteúdo)
- [Adicionar um projeto](#adicionar-um-projeto)
- [Arquitetura](#arquitetura)
- [Cores, fontes e tokens](#cores-fontes-e-tokens)
- [Desempenho](#desempenho)
- [Testes](#testes)
- [Deploy na Vercel](#deploy-na-vercel)
- [Solução de problemas](#solução-de-problemas)

## Requisitos

- Node.js 22 ou mais recente
- pnpm 12 (`corepack enable` instala a versão certa)

## Primeiros passos

```bash
pnpm install
cp .env.example .env.local   # preencha as variáveis (ver abaixo)
pnpm dev                     # http://localhost:3000
```

Sem as variáveis do Resend, o site funciona normalmente. Só o envio do formulário
fica indisponível, e ele avisa isso com honestidade (nunca simula sucesso),
oferecendo WhatsApp e e-mail como alternativa.

## Variáveis de ambiente

| Variável               | Obrigatória       | Para quê                                                                                                                              |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | para o formulário | Chave de API do [Resend](https://resend.com).                                                                                         |
| `CONTACT_TO_EMAIL`     | para o formulário | E-mail que recebe as solicitações de orçamento.                                                                                       |
| `CONTACT_FROM_EMAIL`   | recomendada       | Remetente, de um domínio verificado no Resend. Sem domínio verificado, o remetente de teste só entrega para o e-mail da conta Resend. |
| `NEXT_PUBLIC_SITE_URL` | recomendada       | URL pública, sem barra no final. Usada em canonical, sitemap e Open Graph. Na Vercel, se vazia, usa o domínio de produção do projeto. |

O modelo comentado está em [`.env.example`](.env.example).

## Scripts

| Comando                       | O que faz                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`                    | Servidor de desenvolvimento.                                                   |
| `pnpm build` / `pnpm start`   | Build de produção e servidor de produção.                                      |
| `pnpm check`                  | Tipos + lint + formatação + testes unitários. Rode antes de publicar.          |
| `pnpm typecheck`              | Gera os tipos de rota do Next e roda o TypeScript.                             |
| `pnpm lint` / `pnpm lint:fix` | ESLint (inclui as regras de fronteira da arquitetura).                         |
| `pnpm format`                 | Prettier (inclui a ordenação de classes do Tailwind).                          |
| `pnpm test`                   | Testes unitários (Vitest).                                                     |
| `pnpm test:e2e`               | Testes ponta a ponta e de acessibilidade (Playwright), em desktop e celular.   |
| `pnpm screenshots`            | Capturas nas larguras de referência (320 a 1920 px); acusa rolagem horizontal. |
| `pnpm generate:icons`         | Gera favicon, ícone da Apple e ícones do manifesto a partir do logo.           |

Exemplo de capturas: `pnpm screenshots --url=http://localhost:3000 --paths=/,/privacidade --full`.

## Editar o conteúdo

Nenhum texto fica dentro dos componentes: tudo está em `src/content`.

| Arquivo                          | Conteúdo                                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `site.ts`                        | Contato (e-mail, WhatsApp e mensagens), redes, SEO, fundador, tecnologias e opções do formulário.          |
| `sections.ts`                    | Títulos e textos das seções da home (hero, serviços, projetos...).                                         |
| `services.ts`                    | As três frentes de serviço.                                                                                |
| `projects.ts` + `projects/*.mdx` | Projetos e estudos de caso.                                                                                |
| `differentials.ts`, `process.ts` | Diferenciais e etapas do processo.                                                                         |
| `needs.ts`                       | "Qual é a sua necessidade?" (cada item leva ao formulário ou ao WhatsApp).                                 |
| `faq.ts`                         | Perguntas frequentes (também geram os dados estruturados de FAQ).                                          |
| `contact.ts`                     | Textos do formulário, validação, sucesso e erros, e o e-mail de notificação.                               |
| `workbench.ts`                   | Bancada ao vivo do hero: o código digitado em cada aba (site, sistema, integração) e os textos do preview. |
| `navigation.ts`, `ui.ts`         | Menu, rodapé e textos de interface.                                                                        |
| `legal/privacidade.mdx`          | Política de privacidade.                                                                                   |

**Itens provisórios.** O que ainda precisa de dado real está marcado com
`SUBSTITUIR` em `src/content/site.ts`: o e-mail comercial, os links do LinkedIn
e do GitHub e a foto do fundador.

**Formulário.** Para tirar um tipo de projeto do formulário, use `enabled: false`
em `site.ts` (`contactForm.projectTypes`). O tipo "Loja virtual" está desligado
(a Risen não oferece esse serviço) e também controla o exemplo "Lojas virtuais"
no painel de serviços.

## Adicionar um projeto

1. Coloque as imagens em `public/images/projects/<slug>/`, com a capa em 16:10.
2. Adicione o projeto em `src/content/projects.ts`. Os campos obrigatórios são:
   - `slug`, `name`, `summary`, `problem`, `solution` e `features`;
   - `kind`: `'cliente'`, `'autoral'` ou `'conceito'`. Vira o selo obrigatório no
     card. Não use `'cliente'` para trabalhos que não foram feitos para um cliente real;
   - `category`: a frente de serviço;
   - `cover`: imagem de capa, com `src` e `alt`. O `alt` descreve o que a imagem mostra;
   - `hasCaseStudy` e `featured`.
3. Se `hasCaseStudy: true`, crie `src/content/projects/<slug>.mdx`. A página
   `/projetos/<slug>` passa a existir no próximo build, com imagem de
   compartilhamento, dados estruturados e entrada no sitemap.

A seção de projetos se adapta à quantidade publicada:

| Projetos publicados | Layout                          |
| ------------------- | ------------------------------- |
| menos de 3          | Layout de destaque              |
| 3 ou mais           | Grade                           |
| 6 ou mais           | Grade com filtros por categoria |

Projetos com `placeholder: true` aparecem só em desenvolvimento, nunca em produção.

## Arquitetura

```text
src/
  app/                 rotas (App Router), metadata, OG, sitemap, robots, Server Action
  components/
    layout/            navbar, menu mobile, rodapé, WhatsApp flutuante
    sections/          seções da home (uma pasta por seção quando há subcomponentes)
    case-study/        página de estudo de caso
    shared/            botões de CTA, ícones, logo, entradas animadas...
    reactbits/         componentes React Bits (vendor/ = código original, mínimo alterado)
    ui/                shadcn/ui
  content/             todo o conteúdo do site
  core/contact/        envio de orçamento (Clean Architecture)
    domain/            regras: solicitação de contato, política anti-spam
    application/       caso de uso SubmitContactRequest + porta ContactNotifier
    infrastructure/    Resend + React Email; notificador "indisponível" sem chave
  lib/                 utilitários (WhatsApp, telefone, analytics, schema Zod, SEO...)
  styles/              fontes e espelho das cores para OG e e-mail
```

Como funciona o envio de um orçamento:

1. O formulário valida com o **mesmo schema Zod** do servidor
   (`src/lib/schemas/contact.ts`).
2. A Server Action (`src/app/actions/contact.ts`) aplica um limite de 5 envios
   a cada 10 minutos por IP e chama o caso de uso.
3. O caso de uso (`SubmitContactRequest`) conversa só com a porta
   `ContactNotifier`.
4. Sem a chave do Resend, entra o notificador "indisponível". O resultado
   chega ao usuário como um erro honesto, nunca como sucesso.

O ESLint impede que o domínio e a aplicação importem Next, React, Resend ou Zod.

## Cores, fontes e tokens

- **Fonte única dos tokens:** `src/app/globals.css`. Inclui as cores da marca, os
  tokens derivados, os tamanhos fluidos, os espaçamentos e o mapeamento para o
  shadcn/ui. Componentes não usam valores hexadecimais.
- **Paleta:** extraída do logotipo oficial (`public/images/favicon.jpeg` e
  `og-image.jpeg`):
  - o gradiente do R: azul `#3386FE` → índigo `#5658F8` → violeta `#8457FC`;
  - o fundo azul-noite;
  - o branco frio do logotipo.

  Os botões principais usam uma versão um pouco mais profunda do gradiente, para
  o texto branco manter o contraste.

- **Espelho em hexadecimal:** `src/styles/brand-colors.ts`, para imagens Open Graph,
  ícones e o e-mail. Um teste garante que ele continua igual ao CSS.
- **Monograma:** o R oficial redesenhado em vetor fica em `src/lib/brand-mark.ts`.
  O logo do site, os ícones (`pnpm generate:icons`) e as imagens de compartilhamento
  dos estudos de caso usam esse mesmo desenho. A imagem de compartilhamento do
  site é a oficial (`src/app/opengraph-image.jpg`).
- **Fontes:** `src/styles/fonts.ts`, via `next/font`.
  - **Archivo:** uma fonte variável, larga (125%) nos títulos, como o logotipo,
    e normal no texto.
  - **Martian Mono:** código e rótulos.
- **Merge de classes (`cn`):** as tabelas são compiladas no build a partir de
  `cn.config.mjs` e do tema do CSS, e gravadas em `src/lib/cn-tables.ts`.
  - Esse arquivo é gerado: não edite à mão.
  - Ao criar um token novo de tamanho de texto, sombra, raio ou espaçamento,
    registre-o em `cn.config.mjs`.

## Desempenho

Decisões tomadas para o celular:

- **Formulário de contato hidratado sob demanda.** O HTML vem pronto do servidor,
  mas o JavaScript (React Hook Form, Zod, Select) só carrega quando o formulário
  está a uma tela de distância ou recebe interação. Se a pessoa digitar ou enviar
  antes disso, nada se perde: o texto é aproveitado e o envio é repetido quando o
  formulário fica pronto.
- **Cena 3D do hero (React Bits Particles) só com GPU.**
  - Ela carrega depois que a página fica ociosa, em um pacote separado.
  - A checagem de GPU roda num Web Worker, sem travar a página.
  - Com movimento reduzido, economia de dados, aparelho modesto ou renderização
    por software, fica a versão estática.
- **Bancada ao vivo (hero):** o código é digitado e o preview se monta em CSS
  puro, com os tempos calculados em `src/lib/workbench-timing.ts`.
  - A animação começa na primeira pintura, sem esperar o JavaScript.
  - Ela percorre as três abas uma vez, só enquanto está visível, e tem botão
    de pausa.
  - Com movimento reduzido, aparece montada.
- **Entradas animadas** com um único observador e animações da Motion (`motion/mini`).
  Os títulos das seções entram "se alargando", como as letras largas do logotipo,
  usando só transform, opacity e filter, sem mudança de layout.
- **Vercel Analytics e Speed Insights** só são incluídos quando o site roda na Vercel.

**Sobre o Lighthouse.**

- **Medição oficial:** use o [PageSpeed Insights](https://pagespeed.web.dev)
  na URL publicada.
- **Por que a medição local não serve:** em máquinas sem GPU disponível para o
  Chromium headless, a pintura passa por renderização por software, e o trace do
  próprio Lighthouse atrasa o primeiro quadro. O LCP simulado sobe e varia muito
  entre execuções.
- **Se precisar medir localmente:** rode várias vezes, com a máquina sem outras
  tarefas pesadas, e olhe a mediana.

## Testes

- **Unitários** (`pnpm test`):
  - schema do formulário;
  - caso de uso com notificador falso, incluindo o cenário sem chave;
  - helpers de WhatsApp e telefone;
  - `cn` com os tokens do tema;
  - regras de layout dos projetos;
  - e-mail e integridade do conteúdo.
- **Ponta a ponta** (`pnpm test:e2e`), em desktop e celular (Pixel 7):
  - CTA → formulário com o tipo de projeto pré-selecionado;
  - validação acessível;
  - máscara de telefone;
  - texto digitado antes de o formulário carregar;
  - erro honesto sem provedor de e-mail;
  - menu mobile;
  - ausência de rolagem horizontal.
- **Acessibilidade** (dentro do `test:e2e`):
  - axe (WCAG 2.0 a 2.2, A e AA) nas três páginas;
  - um único `h1` e hierarquia de títulos;
  - link "Pular para o conteúdo".

Os testes e2e fazem o build, sobem o servidor na porta 3100 e forçam
`RESEND_API_KEY` vazia: nunca enviam e-mails reais.

## Deploy na Vercel

1. Importe o repositório na Vercel. Framework, pnpm e Node são detectados
   automaticamente.
2. Em **Settings → Environment Variables**, cadastre as variáveis da tabela acima.
3. No Resend:
   - verifique o domínio do e-mail remetente;
   - use um remetente desse domínio em `CONTACT_FROM_EMAIL`.
4. Em **Analytics** e **Speed Insights**, ative os dois produtos no painel do projeto.
   - Os eventos personalizados (cliques em CTA e WhatsApp, envio e erro do
     orçamento, estudo de caso aberto) exigem o plano Pro.
   - Sem o Pro, as visitas continuam sendo contadas.
5. Depois do deploy:
   - teste o formulário com a chave configurada;
   - meça no PageSpeed Insights.
6. **Retenção de dados (política de privacidade):** a política não fixa prazo.
   Ela diz que os dados de quem não fechou negócio são excluídos quando deixam
   de ser necessários. Na prática, apague de tempos em tempos os e-mails e as
   conversas de orçamento que não viraram projeto. O texto fica na seção "Por
   quanto tempo guardamos" de `src/content/legal/privacidade.mdx`.

**Limite de envios.** O limite do formulário fica em memória, separado em cada
instância do servidor. Para um limite global, troque por um armazenamento
compartilhado (por exemplo, Vercel KV ou Upstash).

## Solução de problemas

- **Uma classe nova do Tailwind (ou uma mudança no `globals.css`) não aparece
  no dev:** o cache do `@tailwindcss/turbopack` às vezes não percebe a mudança.
  Pare e rode `pnpm dev` de novo.
- **`src/lib/cn-tables.ts` desatualizado:** é regenerado por `pnpm dev`,
  `pnpm build` e `pnpm typecheck`.
- **Testes e2e falham ao iniciar:** a porta 3100 precisa estar livre.
- **Git Bash e caminhos:** no Git Bash do Windows, argumentos que começam com "/"
  viram caminhos de arquivo. Em `--paths`, escreva sem a barra inicial
  (`--paths=privacidade`).
- **Formulário mostra "envio indisponível":** confira `RESEND_API_KEY` e
  `CONTACT_TO_EMAIL`.
  - O motivo exato aparece no log do servidor, sem dados pessoais.
  - Um remetente sem domínio verificado só entrega para o e-mail da conta Resend.
