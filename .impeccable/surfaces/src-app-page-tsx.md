---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/projetos/[slug]/page.tsx","src/app/privacidade/page.tsx"]
---

# Home — risenstudio.com.br

**Escopo:** home (/), com o estudo de caso e a privacidade herdando o mundo visual. É uma **evolução do design atual**, pedida explicitamente pelo usuário ("melhorar o design atual"):
- **Permanecem:** a estrutura, as 11 seções, o conteúdo e o comportamento.
- **Mudam:** a paleta (para a da marca), a tipografia, o logo oficial e as animações.
- **Escopo da Bancada ao vivo:** ela é a interação-assinatura do hero. As demais seções recebem a paleta, a tipografia e a gramática de movimento, sem trocar de layout.
**Modo:** Persuade.
**Público:** negócios locais, profissionais liberais e empresas com processos (ver PRODUCT.md).
**Ação:** pedir orçamento (formulário) ou chamar no WhatsApp.
**Prova disponível:** o próprio site e o fundador, que constrói tudo. Não existem projetos de clientes, depoimentos nem números.
**Restrições:** as cores do logo; nada de cara de template; Lighthouse mobile ≥ 90; WCAG AA; movimento reduzido.

## Direction contract

**THESIS.** O site se escreve na frente do visitante: o código vira a página em tempo real, provando que quem atende é quem constrói. Recusa a landing de agência escura com título em gradiente centralizado, partículas e cards de vidro, que é o padrão da categoria e o visual anterior deste site.

**OWN-WORLD.** A bancada do Julio: painéis de editor sobre a noite azul da marca (#03040B). A navegação marca a seção atual como uma aba aberta, e uma barra de status fecha a página.

**Adaptação registrada (finish review).** A calha de numeração de linhas descendo pela página e a navegação inteira desenhada como abas de arquivo ficaram de fora. O usuário pediu explicitamente: "lembrando, oq vc vai faze é melhorar o design atual ok?". A gramática do editor chega às demais seções pela aba ativa do menu, pela barra de status do rodapé e pela região em gradiente do R. Abas completas no menu continuam como opção, a critério do usuário.
- **Cores:** o gradiente do R (#3386FE → #5658F8 → #8457FC) colore o código e domina regiões inteiras, com o branco frio do logotipo (#ECECEF).
- **Tipos:** Archivo largo (125%) nos títulos, Archivo 100% no texto e Martian Mono no código e nos rótulos.
- **Hierarquia por profundidade, não por caixas:** o que importa fica à frente e mais claro, e o resto recua.

**STORY.** O visitante vê um site sendo construído, entende as três frentes (site, sistema, integração) com o mesmo peso, conhece quem constrói e pede o orçamento com o tipo já escolhido.

**FIRST VIEWPORT.**
- **Topo:** barra de título do editor, com abas das seções e o botão de orçamento à direita.
- **Esquerda:** status mono ("Salto, SP · disponível"), H1 em Archivo largo com "experiências digitais" no gradiente, subtítulo e os dois CTAs.
- **Direita:** janela do editor com três abas, `site.tsx`, `sistema.tsx` e `integracao.ts`. O código digita, e o preview ao lado monta o artefato (landing, painel ou fluxo de integração). Cada aba leva ao orçamento daquele tipo.
- **Fundo:** partículas sobem devagar atrás de tudo.
- **Celular:** H1 e CTAs primeiro, editor compacto abaixo.

**FORM.** Bancada ao vivo (editor de código + preview ao vivo), candidato 7 da lista ordenada. Seed c79449a4.
- **Melhorias incorporadas:**
  - profundidade num único relógio de movimento;
  - grade de linhas como ritmo;
  - aba que nomeia a seção atual;
  - gradiente dominando regiões inteiras;
  - tipografia variável que reage;
  - paleta total.
- **Interação-assinatura:** "compilar" um projeto nas abas do hero.
- **Gramática de movimento:**
  - digitação em steps;
  - flash de compilação;
  - trilho de commits que se desenha;
  - largura da fonte que se expande ao entrar.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
