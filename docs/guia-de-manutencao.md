# Guia de manutenção

Como editar o conteúdo, adicionar projetos, publicar e resolver problemas.
A visão geral do projeto está no [README](../README.md).

## Sumário

- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Editar o conteúdo](#editar-o-conteúdo)
- [Adicionar um projeto](#adicionar-um-projeto)
- [Cores, fontes e tokens](#cores-fontes-e-tokens)
- [Deploy](#deploy)
- [Solução de problemas](#solução-de-problemas)

## Variáveis de ambiente

| Variável               | Obrigatória       | Para quê                                                                                                                              |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | para o formulário | Chave de API do [Resend](https://resend.com). Fica só no servidor (sem o prefixo `NEXT_PUBLIC_`).                                     |
| `CONTACT_TO_EMAIL`     | para o formulário | E-mail que recebe as solicitações de orçamento.                                                                                       |
| `CONTACT_FROM_EMAIL`   | recomendada       | Remetente, de um domínio verificado no Resend. Sem domínio verificado, o remetente de teste só entrega para o e-mail da conta Resend. |
| `NEXT_PUBLIC_SITE_URL` | recomendada       | URL pública, sem barra no final. Usada em canonical, sitemap e Open Graph. Na Vercel, se vazia, usa o domínio de produção do projeto. |

O modelo comentado está em [`.env.example`](../.env.example). Os valores reais
ficam em `.env.local` (ignorado pelo git) e no painel da Vercel. Nunca
coloque uma chave no repositório.

Sem as variáveis do Resend, o site funciona normalmente. Só o envio do formulário
fica indisponível, e ele avisa isso com honestidade (nunca simula sucesso),
oferecendo WhatsApp e e-mail como alternativa.

## Editar o conteúdo

Nenhum texto fica dentro dos componentes: tudo está em `src/content`.

| Arquivo                          | Conteúdo                                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `site.ts`                        | Contato (e-mail, WhatsApp e mensagens), redes, SEO, fundador, tecnologias e opções do formulário.          |
| `sections.ts`                    | Títulos e textos das seções da página inicial e da página `/projetos`.                                     |
| `services.ts`                    | As três frentes de serviço.                                                                                |
| `projects.ts` + `projects/*.mdx` | Projetos e páginas de projeto.                                                                             |
| `differentials.ts`, `process.ts` | Diferenciais e etapas do processo.                                                                         |
| `needs.ts`                       | "Qual é o seu momento?": cada situação, a solução indicada e a resposta da conversa.                       |
| `faq.ts`                         | Perguntas frequentes (também geram os dados estruturados de FAQ).                                          |
| `contact.ts`                     | Textos do formulário, validação, sucesso e erros, e o e-mail de notificação.                               |
| `workbench.ts`                   | Bancada ao vivo do hero: o código digitado em cada aba (site, sistema, integração) e os textos do preview. |
| `navigation.ts`, `ui.ts`         | Menu, rodapé e textos de interface.                                                                        |
| `legal/privacidade.mdx`          | Política de privacidade. Ao mudar o texto, atualize `lastUpdated` em `legal/privacy.ts`.                   |

**Formulário.** Para tirar um tipo de projeto do formulário, use `enabled: false`
em `site.ts` (`contactForm.projectTypes`). O tipo "Loja virtual" está desligado
(a Risen não oferece esse serviço).

## Adicionar um projeto

1. Coloque as imagens em `public/images/projects/<slug>/`. A capa fica melhor em
   16:10 (por exemplo, 1600 × 1000). Para sites no ar, uma captura direto do
   site funciona bem.
2. Adicione o projeto em `src/content/projects.ts`. Os campos principais são:
   - `slug`, `name`, `summary`, `problem`, `solution` e `features`;
   - `kind`, o selo de origem: `'autoral'`, `'colaboracao'`, `'cliente'` ou
     `'conceito'`. Só use `'cliente'` para trabalho contratado por um cliente real;
   - `category`: a frente de serviço;
   - `cover`: imagem do card, com `src` e `alt` (o `alt` descreve o que a imagem mostra);
   - opcionais: `logo` (PNG/SVG transparente), `caseStudyCover` (abertura da
     página do projeto), `gallery`, `stack` e `liveUrl` (sempre `https`).
3. Escolha o destino do card:
   - **com página própria:** `hasCaseStudy: true` e um arquivo
     `src/content/projects/<slug>.mdx`. A página `/projetos/<slug>` passa a
     existir no próximo build, com imagem de compartilhamento, dados
     estruturados e entrada no sitemap;
   - **sem página própria:** `hasCaseStudy: false` e `liveUrl`. O card abre o
     site em nova aba.

Os testes de conteúdo (`pnpm test`) conferem que as imagens existem, que o
`alt` foi preenchido, que o MDX existe e que o `liveUrl` usa https.

**Como a seção se organiza:**

- A página inicial mostra os 6 primeiros projetos (duas fileiras). Cards de
  "vaga aberta" completam a última fileira.
- Do 7º projeto em diante, eles vão para a página `/projetos`, e aparece na
  página inicial o botão "Ver mais projetos". A página `/projetos` sempre
  mostra ao menos 12 espaços, completados por vagas abertas.
- Enquanto `/projetos` não tiver projetos, ela fica fora do Google (`noindex`) e
  do sitemap. Ela entra sozinha quando ganhar o primeiro.

Ao publicar um projeto novo, peça a indexação da página no Google Search Console
(Inspeção de URL → Solicitar indexação).

## Cores, fontes e tokens

- **Fonte única dos tokens:** `src/app/globals.css`. Inclui as cores da marca, os
  tokens derivados, os tamanhos fluidos, os espaçamentos e o mapeamento para o
  shadcn/ui. Componentes não usam valores hexadecimais.
- **Paleta:** extraída do logotipo oficial. O gradiente do R vai do azul
  `#3386FE` ao índigo `#5658F8` e ao violeta `#8457FC`, sobre um fundo azul-noite.
- **Espelho em hexadecimal:** `src/styles/brand-colors.ts`, para imagens Open
  Graph, ícones e o e-mail. Um teste garante que ele continua igual ao CSS.
- **Monograma:** o R oficial em vetor fica em `src/lib/brand-mark.ts`. O logo,
  os ícones (`pnpm generate:icons`) e as imagens de compartilhamento usam esse
  mesmo desenho.
- **Fontes:** `src/styles/fonts.ts`, via `next/font`.
  - **Archivo:** fonte variável, larga nos títulos (como o logotipo) e normal
    no texto. Os títulos têm fontes reservas com a mesma largura
    (`globals.css`), para a página não "pular" quando a fonte carrega.
  - **Martian Mono:** código e rótulos.
- **Merge de classes (`cn`):** as tabelas são compiladas no build a partir de
  `cn.config.mjs` e do tema do CSS, e gravadas em `src/lib/cn-tables.ts` (arquivo
  gerado, não edite à mão). Ao criar um token novo de tamanho de texto, sombra,
  raio ou espaçamento, registre-o em `cn.config.mjs`.

## Deploy

O deploy é contínuo pela Vercel, ligada ao repositório do GitHub:

- **push na `main`:** vai para produção (`risenstudio.com.br`);
- **pull request:** ganha um link de pré-visualização.

O GitHub Actions (`.github/workflows/ci.yml`) roda tipos, lint, formatação,
testes unitários, build e testes ponta a ponta em cada push e pull request.

**Configuração na Vercel:**

1. As variáveis da tabela acima ficam em **Settings → Environments →
   Production**. A `RESEND_API_KEY` como **Secret**.
2. Uma variável nova só vale depois de um novo deploy (Deployments → ⋯ →
   Redeploy).
3. Domínio: `risenstudio.com.br` em Production; `www` redireciona (308) para ele.
   O DNS está na Vercel.
4. Analytics e Speed Insights ativos no painel. Os eventos personalizados
   (cliques em CTA e WhatsApp, envios do formulário) só aparecem no plano Pro.

**Resend:** o domínio está verificado (região São Paulo), com os registros DNS
criados na Vercel. O remetente é `contato@risenstudio.com.br` e as respostas vão
direto para o e-mail do cliente (Reply-To).

**Retenção de dados:** a política de privacidade não fixa prazo. Os dados de
quem não fechou negócio são excluídos quando deixam de ser necessários: apague
de tempos em tempos os e-mails e as conversas de orçamento que não viraram
projeto.

**Limite de envios:** o limite do formulário fica em memória, separado em cada
instância do servidor. Para um limite global, troque por um armazenamento
compartilhado (por exemplo, Vercel KV ou Upstash).

**Desempenho:** meça no [PageSpeed Insights](https://pagespeed.web.dev) com a URL
publicada. A medição local (Lighthouse em Chromium headless) não serve como
referência: sem GPU, a pintura passa por renderização por software e o LCP
simulado sobe e varia muito.

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
  `CONTACT_TO_EMAIL` na Vercel e faça um Redeploy. O motivo exato aparece no log
  do servidor, sem dados pessoais.
