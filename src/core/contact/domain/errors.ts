export type InvalidContactRequestReason = 'missing-consent' | 'missing-required-field'

/** A solicitação viola uma regra do domínio e não pode existir. */
export class InvalidContactRequestError extends Error {
  readonly reason: InvalidContactRequestReason

  constructor(reason: InvalidContactRequestReason, detail?: string) {
    super(detail ? `${reason}: ${detail}` : reason)
    this.name = 'InvalidContactRequestError'
    this.reason = reason
  }
}
