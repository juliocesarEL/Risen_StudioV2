/**
 * Geometria do monograma "R" da Risen, redesenhado em vetor a partir do
 * logotipo oficial (public/images/favicon.jpeg).
 *
 * Fonte única para o logo do site (components/shared/logo.tsx), as imagens de
 * compartilhamento (lib/seo/og-image.tsx) e os ícones (scripts/generate-icons.mjs).
 *
 * Construção (no viewBox 346 × 346):
 * - curva do R: arco de raio 120 com espessura 65, centrado em (196, 120);
 * - perna e traço branco: faixas paralelas a 45°, como no logotipo.
 */
export const brandMark = {
  viewBox: '0 0 346 346',
  size: 346,
  /** Barra superior, curva, barra do meio e perna: pintadas com o gradiente do R. */
  gradientPath: 'M0 0H196A120 120 0 0 1 234 234L346 346H288L117 175H196A55 55 0 0 0 196 65H0Z',
  /** Traço diagonal claro, à esquerda da perna. */
  strokePath: 'M0 105L241 346H154L0 192Z',
  /** Direção do gradiente, em coordenadas do viewBox (azul → índigo → violeta). */
  gradient: { x1: 0, y1: 80, x2: 346, y2: 260 },
} as const
