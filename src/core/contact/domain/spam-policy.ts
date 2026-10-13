/**
 * O formulário tem um campo escondido (honeypot) que pessoas não veem nem
 * preenchem. Se ele chega preenchido, o envio veio de um robô.
 */
export function isLikelySpam(submission: { honeypot?: string }): boolean {
  return Boolean(submission.honeypot?.trim())
}
