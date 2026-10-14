# Fontes das imagens Open Graph

Instâncias estáticas (TTF) usadas apenas no servidor, por `src/lib/seo/og-image.tsx` (imagens de compartilhamento dos estudos de caso). Elas existem porque o gerador de imagens do Next.js (`next/og`) não aceita fontes variáveis nem WOFF2. No site, as fontes são carregadas por `next/font` (ver `src/styles/fonts.ts`).

| Arquivo                     | Família | Instância          | Licença     |
| --------------------------- | ------- | ------------------ | ----------- |
| `archivo-expanded-bold.ttf` | Archivo | wdth 125, wght 700 | SIL OFL 1.1 |
| `archivo-medium.ttf`        | Archivo | wdth 100, wght 500 | SIL OFL 1.1 |

**Origem:** Google Fonts (https://fonts.google.com), pela API `css2`. Por exemplo, `family=Archivo:wdth,wght@125,700` com um user-agent que receba TTF.

**Ao trocar as fontes do site:** gere novas instâncias estáticas e substitua estes arquivos.
