# Fontes das imagens Open Graph

Instâncias estáticas (TTF) usadas apenas no servidor, por `src/lib/seo/og-image.tsx`, porque o gerador de imagens do Next.js (`next/og`) não aceita fontes variáveis nem WOFF2. No site, as fontes são carregadas por `next/font` (ver `src/styles/fonts.ts`).

| Arquivo                                  | Família             | Instância                  | Licença     |
| ---------------------------------------- | ------------------- | -------------------------- | ----------- |
| `bricolage-grotesque-condensed-bold.ttf` | Bricolage Grotesque | wdth 75, wght 700, opsz 96 | SIL OFL 1.1 |
| `figtree-medium.ttf`                     | Figtree             | wght 500                   | SIL OFL 1.1 |

Origem: Google Fonts (https://fonts.google.com). Ao trocar as fontes do site, gere novas instâncias estáticas e substitua estes arquivos.
