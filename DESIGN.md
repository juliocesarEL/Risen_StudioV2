---
name: Risen Studio
description: Bancada ao vivo — o site se escreve na frente de quem visita, sobre a noite azul da marca.
colors:
  night: '#03040b'
  night-raised: '#090b19'
  night-deep-panel: '#11142b'
  logo-white: '#ececef'
  body-mist: '#a4a9c6'
  quote-mist: '#cdd0e4'
  muted-slate: '#7a80a6'
  dim-slate: '#4d5274'
  faint-slate: '#2e3253'
  line: '#191c35'
  line-strong: '#282c4f'
  accent-violet: '#9c7cff'
  brand-blue: '#3386fe'
  brand-indigo: '#5658f8'
  brand-violet: '#8457fc'
  field-blue: '#0119c3'
  field-violet: '#3310ac'
  action-from: '#2a62ee'
  action-via: '#4f50ee'
  action-to: '#7448f0'
  text-gradient-from: '#4f94ff'
  text-gradient-via: '#7d7dff'
  text-gradient-to: '#a585ff'
  on-gradient: '#ffffff'
  window-red: '#ff5f57'
  window-yellow: '#febc2e'
  window-green: '#28c840'
  syntax-component: '#5c9bff'
  syntax-attribute: '#8f90ff'
  syntax-string: '#c4b4ff'
  syntax-comment: '#6b7196'
typography:
  display:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.125rem, 1.35rem + 3.3vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: '-0.03em'
    fontVariation: "'wdth' 125"
  page-title:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 1.35rem + 2.6vw, 3.75rem)'
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: '-0.025em'
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.875rem, 1.3rem + 2.3vw, 3.375rem)'
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: '-0.025em'
    fontVariation: "'wdth' 125"
  title:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 1.15rem + 1.1vw, 2.125rem)'
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: '-0.015em'
    fontVariation: "'wdth' 112"
  title-small:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.1875rem, 1.08rem + 0.45vw, 1.4375rem)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.01em'
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.0625rem, 0.99rem + 0.36vw, 1.25rem)'
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Archivo, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.4
  label-mono:
    fontFamily: 'Martian Mono, ui-monospace, SFMono-Regular, monospace'
    fontSize: '0.6875rem'
    fontWeight: 400
    lineHeight: 1.4
  code:
    fontFamily: 'Martian Mono, ui-monospace, SFMono-Regular, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.85
rounded:
  sm: '0.525rem'
  md: '0.7rem'
  lg: '0.875rem'
  xl: '1.225rem'
  window: '1.25rem'
  card: '1.5rem'
  pill: '999px'
spacing:
  section: 'clamp(5rem, 3.6rem + 6vw, 9.5rem)'
  gutter: 'clamp(1rem, 0.35rem + 3vw, 3rem)'
  nav: '4.5rem'
  container: '76rem'
components:
  button-gradient:
    backgroundColor: '{colors.action-via}'
    textColor: '{colors.on-gradient}'
    typography: '{typography.label}'
    rounded: '{rounded.pill}'
    padding: '0 20px'
    height: '44px'
  button-gradient-large:
    backgroundColor: '{colors.action-via}'
    textColor: '{colors.on-gradient}'
    rounded: '{rounded.pill}'
    padding: '0 24px'
    height: '48px'
  button-inverse:
    backgroundColor: '{colors.logo-white}'
    textColor: '{colors.night}'
    rounded: '{rounded.pill}'
    padding: '0 20px'
    height: '44px'
  button-inverse-hover:
    backgroundColor: '{colors.on-gradient}'
  button-outline:
    textColor: '{colors.logo-white}'
    rounded: '{rounded.pill}'
    padding: '0 20px'
    height: '44px'
  button-whatsapp:
    backgroundColor: '{colors.window-green}'
    textColor: '{colors.night}'
    rounded: '{rounded.pill}'
    height: '44px'
  input:
    textColor: '{colors.logo-white}'
    rounded: '{rounded.md}'
    padding: '8px 14px'
    height: '44px'
  chip:
    textColor: '{colors.quote-mist}'
    rounded: '{rounded.pill}'
    padding: '4px 12px'
  nav-link:
    textColor: '{colors.body-mist}'
    rounded: '{rounded.lg}'
    padding: '0 16px'
    height: '44px'
  nav-link-active:
    textColor: '{colors.logo-white}'
  card-project:
    backgroundColor: '{colors.night-raised}'
    rounded: '{rounded.card}'
    padding: '16px'
  badge-kind:
    typography: '{typography.label-mono}'
    rounded: '{rounded.pill}'
    padding: '0 10px'
    height: '24px'
  workbench-window:
    backgroundColor: '{colors.night-raised}'
    rounded: '{rounded.window}'
---

# Design System: Risen Studio

## Overview

**Creative North Star: "A Bancada ao Vivo"**

O site é a bancada do Julio: painéis de editor sobre a noite azul da marca, onde o código vira página em tempo real. O mundo vem inteiro do logotipo oficial: o fundo quase preto azulado, o branco frio do "RISΞN" e o gradiente do R (azul-elétrico → índigo → violeta). Nada é cor inventada; tudo é derivado dessas três fontes em `src/app/globals.css`, espelhadas em `src/styles/brand-colors.ts`.

A hierarquia vem da profundidade, não de caixas: o que importa fica à frente e mais claro, o resto recua em camadas translúcidas da mesma noite. Os títulos são largos como o logotipo (Archivo com o eixo de largura em 125%) e entram "se alargando". A gramática do editor (abas, barra de status, fonte mono, realce de sintaxe) aparece no hero, na aba ativa do menu, na barra de status do rodapé e nos selos; as demais seções herdam paleta, tipografia e movimento sem virar um editor. Densidade média, ritmo vertical generoso.

O mundo recusa a landing de agência escura com título centralizado inteiro em gradiente, cards de vidro em grade e brilho genérico. O gradiente é material da marca, usado em traços finos ou em regiões inteiras, nunca como verniz.

**Key Characteristics:**

- Paleta total do logotipo: noite azul, branco frio, gradiente do R; sem cores fora da marca exceto os semáforos da janela do editor (que também servem a sucesso, perigo e WhatsApp).
- Archivo variável: larga (125%) nos títulos, normal (100%) no texto; Martian Mono no código, nos rótulos de status e nos selos.
- O gradiente aparece de três formas: traço de 2px que se desenha, região inteira (convite de projeto, preview da bancada) e, uma única vez, texto no destaque do hero.
- Profundidade por camadas translúcidas da noite e sombras longas e escuras; brilho colorido só sob ações em gradiente e sob a janela do editor.
- Um único relógio de movimento com curva de saída suave; com movimento reduzido, tudo aparece montado.

## Colors

Uma noite azul quase preta, um branco frio e um gradiente elétrico de três paradas: a paleta é o logotipo, e nada mais.

### Primary

- **Gradiente do R** (brand-blue → brand-indigo → brand-violet, 90deg): o gradiente exato do monograma. Usado em traços e grafismos: a linha da aba ativa, o sublinhado do menu, o traço que se desenha no topo de cada painel de serviço, o ponto da barra de status e o próprio monograma. Nunca como fundo de texto.
- **Gradiente de ação** (action-from → action-via → action-to): o mesmo gradiente um pouco mais profundo, para o texto branco manter ≥ 5,1:1 em toda a extensão. Fundo dos botões principais e da região inteira do convite "Seu projeto pode ser o próximo".
- **Gradiente de texto** (text-gradient-from → via → to): as mesmas cores clareadas (≥ 6:1 sobre a noite). Exclusivo do destaque do H1 do hero.

### Secondary

- **Violeta de Acento** (accent-violet): o violeta da marca clareado para texto (6,6:1). Links ("Ver estudo de caso"), ícones de serviço, checks de benefício, cursor de texto, anel de foco e o caret da bancada. É o `--primary` do shadcn.

### Tertiary

- **Campos Profundos** (field-blue, field-violet): os brilhos dos cantos da imagem OG. Só aparecem misturados com transparência em gradientes radiais: cantos do hero (32% e 38%), fundo do preview da bancada (38% e 55%) e a sombra azulada sob a janela do editor.
- **Semáforos do Editor** (window-red, window-yellow, window-green): as três luzes da barra de título. Também são `--danger`, o pulso "compilando" e `--success` / `--whatsapp`.
- **Realce de Sintaxe** (syntax-component, syntax-attribute, syntax-string, syntax-comment; keyword = accent-violet, punctuation = muted-slate, plain = quote-mist): só dentro do código da bancada, todos ≥ 4,5:1 sobre night-raised.

### Neutral

- **Noite** (night): fundo da página, texto sobre acento claro e sobre o verde do WhatsApp.
- **Noite Elevada** (night-raised): janela do editor, cards, popovers, rodapé (a 50–60%).
- **Painel Profundo** (night-deep-panel): superfícies secundárias e aba selecionada da bancada (a 70%).
- **Branco do Logotipo** (logo-white): títulos e texto principal; fundo do botão inverso.
- **Névoa de Texto** (body-mist): parágrafos (8,8:1 sobre a noite).
- **Névoa Clara** (quote-mist): destaques, benefícios, chips, código comum.
- **Ardósia** (muted-slate): rótulos mono, números de linha, metadados (≥ 4,7:1 em todas as noites). Texto pequeno secundário usa `--text-subtle`, mistura 50/50 de body-mist e muted-slate (≥ 6:1).
- **Ardósia Apagada / Esmaecida** (dim-slate, faint-slate): apenas decorativas, nunca para texto que precise ser lido.
- **Linhas** (line, line-strong): divisórias, bordas de card e de campo; line-strong no contorno da janela, botões outline e hover de cards.
- Superfícies translúcidas derivadas por `color-mix`: vidro (night-raised 64%), card (82%), chip (branco 5%), hover (branco 7%), ghost (branco 3%), acento suave (violeta 12%), barra de navegação (noite 78%), borda de vidro (branco 9%).

### Named Rules

**The Logo Palette Rule.** Toda cor sai do logotipo ou é derivada dele por `color-mix`. Componentes nunca escrevem hex: usam utilitários do Tailwind ou `var(--token)`. Um tema novo redefine só a paleta base e as superfícies.

**The Three Gradients Rule.** O gradiente do R é para traços; o de ação é para fundos com texto branco; o de texto é para letras sobre a noite. Nunca troque um pelo outro: cada um existe por causa do contraste.

**The Earned Gradient Text Rule.** Texto em gradiente aparece uma única vez: no destaque do H1 do hero ("experiências digitais à altura."). Nenhum outro título, número ou rótulo recebe gradiente.

## Typography

**Display Font:** Archivo variável, eixo `wdth` em 125% (112% abaixo de 640px), com fallback ui-sans-serif, system-ui
**Body Font:** Archivo variável, largura normal (100%)
**Label/Mono Font:** Martian Mono (ui-monospace, SFMono-Regular)

**Character:** Uma única família variável em duas larguras: larga e firme nos títulos, ecoando as letras do "RISΞN", e neutra no texto corrido. A mono técnica fala a língua do editor e só aparece onde o editor aparece.

### Hierarchy

- **Display** (700, clamp 34–72px, 1.02, -0.03em, largura 125%): só o H1 do hero, com no máximo ~14em de largura.
- **Page Title** (700, clamp 32–60px, 1.04): H1 das páginas internas (estudo de caso, privacidade).
- **Headline** (600, clamp 30–54px, 1.06, largura 125%): H2 de cada seção, via o cabeçalho de seção.
- **Title** (600, clamp 24–34px, 1.12, largura semi 112%): destaque entre H2 e H3, como o convite de projeto e o card de projeto em destaque.
- **Title Small** (600, clamp 19–23px, 1.2, largura semi 112%): H3 de serviços, projetos e itens.
- **Lead** (400, clamp 17–20px, 1.6): subtítulo do hero e descrição das seções, até ~42rem.
- **Body** (400, 16px, 1.65): parágrafos em body-mist, `text-wrap: pretty`; títulos com `text-wrap: balance`.
- **Label** (600, 14px, 1.4, caixa de frase): o utilitário de rótulo de grupo para títulos de grupos ("Benefícios", "Exemplos", colunas do rodapé), em text-subtle.
- **Label Mono** (400, 11px; 10–12px na bancada): caminho do arquivo, abas, barra de status da bancada e do rodapé.
- **Code** (400, 10–12px conforme a largura, 1.85): linhas da bancada.

### Named Rules

**The Wide Title Rule.** Todo título de seção usa a Archivo larga (`font-stretch-display`); subtítulos e títulos de card usam a semi-larga (`font-stretch-semi`). Texto corrido nunca é largo.

**The No Eyebrow Rule.** Nenhum rótulo pequeno em caixa alta acima de títulos. Grupos de itens recebem o rótulo de grupo, em caixa de frase, na fonte do texto. A caixa alta espaçada fica restrita ao logotipo e aos selos de tipo de projeto.

## Layout

Contêiner central de 76rem com respiro lateral fluido (16–48px, respeitando a área segura). Seções separadas por um ritmo vertical fluido de 80–152px. A barra de navegação fixa tem 72px, e as âncoras compensam essa altura mais 16px.

O hero ocupa a altura da tela: o H1 largo atravessa a linha inteira; abaixo, uma grade de 12 colunas põe proposta e CTAs em 5 colunas e a bancada em 7. No celular tudo empilha (H1, CTAs, bancada compacta). Os CTAs ficam lado a lado no celular grande e a partir de 1280px, e empilham de propósito entre 1024 e 1279px.

Serviços são um único contêiner dividido em três painéis por linhas finas (empilhados no celular, três colunas a partir de 1024px), como um editor dividido: mesmo peso para as três frentes. Projetos usam um card em destaque (7 + 5 colunas no desktop) e, abaixo, uma grade de duas colunas que termina no convite em gradiente. O rodapé usa quatro colunas (1.6fr 1fr 1.2fr 1fr) e fecha com a barra de status.

Pontos de quebra observados: 640px (largura da fonte, bancada em duas colunas), 768px, 1024px (menu de desktop, grades), 1280px. Alvos de toque mínimos de 44px em todo lugar.

## Elevation & Depth

Profundidade por camadas, não por caixas. A noite tem três níveis (night, night-raised, night-deep-panel) e superfícies translúcidas misturadas com a própria noite; o que importa fica mais claro e à frente. As sombras são longas, deslocadas para baixo e escuras (a cor da noite a 90–95%), com um filete de luz interno de 1px no topo. Só dois elementos recebem luz colorida: os botões em gradiente (brilho índigo, que vira violeta no hover) e a janela do editor (sombra azul do field-blue).

### Shadow Vocabulary

- **Card** (`inset 0 1px 0 0 color-mix(in srgb, var(--text) 5%, transparent), 0 24px 48px -28px color-mix(in srgb, var(--bg) 90%, transparent)`): cards de projeto.
- **Glow** (`inset 0 1px 0 0 color-mix(in srgb, var(--on-gradient) 22%, transparent), 0 14px 36px -14px color-mix(in srgb, var(--brand-indigo) 70%, transparent)`): botão em gradiente em repouso.
- **Glow Strong** (`inset 0 1px 0 0 color-mix(in srgb, var(--on-gradient) 30%, transparent), 0 20px 44px -14px color-mix(in srgb, var(--brand-violet) 75%, transparent)`): botão em gradiente no hover.
- **Window** (`0 40px 80px -40px color-mix(in srgb, var(--bg) 95%, transparent)`): janelas e molduras de navegador.
- **Bancada** (`inset 0 1px 0 0 color-mix(in srgb, var(--text) 7%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--field-blue) 45%, transparent), 0 24px 48px -24px color-mix(in srgb, var(--bg) 90%, transparent)`): só a janela do editor do hero.

### Named Rules

**The Colored Light Is Earned Rule.** Brilho colorido só sob a ação principal e sob a bancada. Cards e painéis recuam com sombra escura; nada de halos de neon em superfícies comuns.

**The Spotlight Rule.** A luz que segue o cursor (SpotlightCard, intensidade 0,11, raio 300px) é a única luz interativa sobre superfícies, configurada igual em todo o site.

## Shapes

Cantos suaves e consistentes, derivados de um raio base de 14px: 8,4px, 11,2px, 14px e 19,6px para controles e itens; 20px na janela do editor; 24px em cards e regiões de gradiente; pílula em botões, chips e selos. Bordas de 1px nas linhas da noite; a aba ativa e os traços de seção são filetes de 2px em gradiente. Os pontos de status são quadrados quase retos (2px), em contraste com as luzes redondas da janela. O monograma R em contorno (GhostMark, traço de ~1px que não escala) aparece grande e cortado no canto das regiões em gradiente, como marca d'água a 25%.

## Components

### Buttons

Pílulas confiantes, com o gradiente da marca como única ação principal.

- **Shape:** pílula (999px); altura 44px (padrão), 36px (pequeno), 48px (grande).
- **Gradient (principal):** gradiente de ação com texto branco semibold e sombra Glow. No hover o gradiente desliza do azul ao violeta (fundo a 180%, posição esquerda → direita, 500ms) e o brilho vira Glow Strong.
- **Inverse:** branco do logotipo com texto na cor da noite; só sobre regiões em gradiente, onde o botão em gradiente sumiria. Hover: branco puro.
- **Outline:** contorno line-strong sobre superfície ghost, texto branco; hover clareia a borda e o fundo. CTAs de serviço e o CTA secundário do hero.
- **Ghost:** sem fundo; hover em superfície translúcida. Usado no CTA da barra de status da bancada.
- **WhatsApp:** verde dos semáforos com texto na cor da noite; hover com brilho de 110%.
- **Hover / Focus:** anel de foco violeta (3px a 60%, deslocado 2px da noite); ao pressionar, desce 1px.

### Chips

- **Style:** pílula, borda line, fundo chip (branco 5%), texto quote-mist 14px, 4px × 12px. Exemplos dentro dos painéis de serviço; não são interativos.

### Selos de tipo de projeto

- **Style:** pílula de 24px, Martian Mono 10px em caixa alta com espaçamento de 0,12em. Obrigatórios em todo projeto. "Cliente": preenchido em violeta com texto na cor da noite; "Projeto autoral": contorno violeta a 45% sobre acento suave; "Conceito": contorno tracejado line-strong.

### Cards / Containers

- **Corner Style:** 24px.
- **Background:** superfície card (night-raised a 82%).
- **Shadow Strategy:** Card (ver Elevation & Depth).
- **Border:** 1px line; hover em line-strong. A imagem dentro da moldura de navegador cresce 2% no hover.
- **Internal Padding:** 12–20px no card de projeto; 24–40px nos painéis de serviço e no convite em gradiente.
- **Card de projeto:** o link do título se estica sobre o card inteiro (um único destino para mouse, toque e teclado).
- **Região em gradiente (convite de projeto):** fundo inteiro no gradiente de ação, texto branco, GhostMark no canto e botão inverso.

### Inputs / Fields

- **Style:** 44px de altura, cantos de 11,2px, borda line, fundo ghost (branco 3%), texto branco 16px, placeholder text-subtle, cursor de texto violeta.
- **Focus:** borda violeta e anel violeta de 3px a 50%.
- **Error / Disabled:** borda e anel no vermelho do semáforo; desabilitado a 50% de opacidade.

### Navigation

- **Style:** barra fixa de 72px sobre a noite a 78%, logotipo à esquerda, links no centro, botão em gradiente à direita. Links em 14px, body-mist, 44px de altura.
- **Hover:** texto branco e o sublinhado em gradiente se desenha até 40%.
- **Active (aba aberta):** a seção atual vira uma aba: fundo de hover translúcido, cantos de 14px, texto branco e o sublinhado em gradiente completo, desenhado em 500ms. Marcado com `aria-current`.
- **Mobile:** abaixo de 1024px o menu vai para uma gaveta lateral.

### Barra de status (rodapé)

O rodapé fecha a página como a barra de status fecha o editor: faixa sobre night-raised a 60%, Martian Mono 11px em text-subtle, com um ponto quadrado em gradiente, a cidade, os direitos e o link de privacidade.

### Bancada ao vivo (assinatura)

A janela do editor do hero. Barra de título com as três luzes, caminho em mono e botão de pausa; três abas de arquivo (`site.tsx`, `sistema.tsx`, `integracao.ts`) com a linha de gradiente se desenhando sobre a aba selecionada; corpo dividido em código (números de linha em ardósia, realce de sintaxe) e preview num campo profundo com os cantos field-blue e field-violet. O código digita em steps, com caret violeta; cada peça do preview surge quando sua linha termina (650ms, saindo de desfoque e escala 0,96, com um contorno azul de "hot reload"); ao final, uma varredura de luz atravessa o preview e o status troca de "compilando" (pulso amarelo) para "pronto" (check verde). Percorre as três abas uma vez enquanto visível; tocar numa aba ou pausar devolve o controle. Cada aba leva ao orçamento daquele tipo. Toda a coreografia é CSS, com os tempos vindos de `lib/workbench-timing.ts`.

### Movimento

Um único relógio, curva de saída `cubic-bezier(0.22, 1, 0.36, 1)` em tudo. Blocos sobem 1,5rem e aparecem em 700ms; listas entram com 80ms de intervalo; traços se desenham em 1,4s; títulos de seção "se alargam" (de scaleX 0,84 e desfoque de 8px até o normal, 1,1s, a partir da esquerda). Só transform, opacity e filter. O gradiente do texto do hero varre devagar (ciclo de 9s) e pausa fora da tela; partículas sobem devagar atrás do hero. Com movimento reduzido, durações e atrasos vão a zero e todo conteúdo aparece montado; sem JavaScript, nada fica escondido.

## Do's and Don'ts

### Do:

- **Do** tirar toda cor dos tokens de `globals.css` (utilitários do Tailwind ou `var(--token)`); para uma cor nova, derive da paleta por `color-mix`.
- **Do** usar o gradiente de ação, com texto branco, em todo botão principal (≥ 5,1:1); sobre uma região em gradiente, use o botão inverso.
- **Do** usar a Archivo larga (125%) em títulos de seção e a semi-larga (112%) em títulos de card.
- **Do** marcar títulos de seção com a entrada que "se alarga" e manter todo movimento na curva de saída única, só com transform, opacity e filter.
- **Do** rotular grupos de itens com o rótulo de grupo (14px, 600, caixa de frase) em text-subtle.
- **Do** usar a gramática do editor (mono, abas, barra de status) como acento pontual: hoje ela vive na bancada, na aba ativa do menu, no rodapé e nos selos.
- **Do** manter alvos de toque de pelo menos 44px e o anel de foco violeta visível.
- **Do** manter todo texto visível em `src/content`; componentes recebem a cópia por props.

### Don't:

- **Don't** colocar rótulos pequenos em caixa alta acima de títulos (eyebrows).
- **Don't** aplicar texto em gradiente fora do destaque do H1 do hero.
- **Don't** usar o gradiente do R (o mais claro) como fundo de texto branco; ele não passa no contraste.
- **Don't** escrever hex em componentes nem trazer cores de fora do logotipo.
- **Don't** usar dim-slate ou faint-slate em texto que precise ser lido.
- **Don't** dar brilho colorido a cards ou painéis comuns; sombras de superfície são escuras.
- **Don't** animar propriedades de layout, nem deixar conteúdo escondido com movimento reduzido ou sem JavaScript.
