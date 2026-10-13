/**
 * Descobre qual renderizador WebGL2 o navegador usa, fora da thread principal.
 *
 * Criar um contexto WebGL é uma chamada síncrona que pode esperar a GPU (ou o
 * renderizador por software) por centenas de milissegundos. Aqui essa espera
 * acontece no worker, sem travar a página. Responde com o nome do renderizador
 * ou null, quando não há WebGL2 em OffscreenCanvas.
 */
function readRenderer(): string | null {
  if (typeof OffscreenCanvas === 'undefined') return null

  const gl = new OffscreenCanvas(1, 1).getContext('webgl2')
  if (!gl) return null

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = String(
    debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
  )
  gl.getExtension('WEBGL_lose_context')?.loseContext()
  return renderer
}

postMessage(readRenderer())
