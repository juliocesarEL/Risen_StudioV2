import { z } from 'zod'

import { contactFormCopy } from '@/content/contact'
import { siteConfig } from '@/content/site'
import { isValidBrazilianPhone } from '@/lib/phone'
import type { ProjectTypeId } from '@/types/content'

const messages = contactFormCopy.validation

export const contactLimits = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  phoneMax: 30,
  companyMax: 120,
  messageMin: 20,
  messageMax: 4000,
  honeypotMax: 500,
} as const

/** Tipos de projeto ativos no formulário (site.ts). */
export const projectTypeOptions = siteConfig.contactForm.projectTypes.filter(
  (option) => option.enabled,
)

export const budgetRangeOptions = siteConfig.contactForm.budgetRanges

type NonEmptyList<T> = [T, ...T[]]

function toEnumValues<T extends string>(values: T[], listName: string): NonEmptyList<T> {
  const [first, ...rest] = values
  if (first === undefined) {
    throw new Error(`site.ts precisa de pelo menos um item em "${listName}".`)
  }
  return [first, ...rest]
}

const projectTypeIds = toEnumValues<ProjectTypeId>(
  projectTypeOptions.map((option) => option.id),
  'contactForm.projectTypes',
)

const budgetRangeIds = toEnumValues(
  budgetRangeOptions.map((option) => option.id),
  'contactForm.budgetRanges',
)

/**
 * Schema do formulário de orçamento. É o mesmo no navegador (React Hook Form)
 * e no servidor (Server Action), que sempre revalida os dados recebidos.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(contactLimits.nameMin, messages.nameMin)
    .max(contactLimits.nameMax, messages.nameMax),
  email: z
    .string()
    .trim()
    .min(1, messages.emailRequired)
    .max(contactLimits.emailMax, messages.emailInvalid)
    .pipe(z.email(messages.emailInvalid)),
  phone: z
    .string()
    .trim()
    .max(contactLimits.phoneMax, messages.phoneInvalid)
    .refine((value) => value === '' || isValidBrazilianPhone(value), messages.phoneInvalid)
    .optional(),
  company: z.string().trim().max(contactLimits.companyMax, messages.companyMax).optional(),
  projectType: z.enum(projectTypeIds, messages.projectTypeRequired),
  budget: z.enum(budgetRangeIds, messages.budgetInvalid).optional(),
  message: z
    .string()
    .trim()
    .min(contactLimits.messageMin, messages.messageMin)
    .max(contactLimits.messageMax, messages.messageMax),
  consent: z.boolean().refine((accepted) => accepted, messages.consentRequired),
  /** Honeypot: invisível para pessoas. Se vier preenchido, o envio é tratado como spam. */
  website: z.string().max(contactLimits.honeypotMax).optional(),
})

/** Valores do formulário (entrada). */
export type ContactFormValues = z.input<typeof contactSchema>
/** Dados validados e normalizados (saída). */
export type ContactFormData = z.output<typeof contactSchema>
export type ContactFieldName = keyof ContactFormValues
