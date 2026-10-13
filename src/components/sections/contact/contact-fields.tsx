'use client'

import Link from 'next/link'

import {
  ConsentField,
  HoneypotField,
  MessageField,
  PhoneField,
  SelectField,
  TextField,
} from '@/components/sections/contact/form-fields'
import type { contactFormCopy } from '@/content/contact'
import { contactLimits } from '@/lib/schemas/contact'

export interface ContactFieldsProps {
  copy: typeof contactFormCopy
  projectTypes: { id: string; label: string }[]
  budgetRanges: { id: string; label: string }[]
  privacyHref: string
  newTabHint: string
}

/** Campos do formulário de orçamento: uma coluna no celular, pares lado a lado no tablet. */
export function ContactFields({
  copy,
  projectTypes,
  budgetRanges,
  privacyHref,
  newTabHint,
}: ContactFieldsProps) {
  const { fields } = copy

  return (
    <>
      <HoneypotField label={fields.honeypot} />

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          name="name"
          label={fields.name.label}
          placeholder={fields.name.placeholder}
          autoComplete="name"
        />
        <TextField
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
        />
        <PhoneField
          label={fields.phone.label}
          optionalTag={copy.optionalTag}
          placeholder={fields.phone.placeholder}
        />
        <TextField
          name="company"
          autoComplete="organization"
          label={fields.company.label}
          optionalTag={copy.optionalTag}
          placeholder={fields.company.placeholder}
        />
        <SelectField
          name="projectType"
          label={fields.projectType.label}
          placeholder={fields.projectType.placeholder}
          options={projectTypes}
        />
        <SelectField
          name="budget"
          label={fields.budget.label}
          optionalTag={copy.optionalTag}
          placeholder={fields.budget.placeholder}
          options={budgetRanges}
        />
      </div>

      <MessageField
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        minLength={contactLimits.messageMin}
        maxLength={contactLimits.messageMax}
        counter={{ belowMin: fields.message.counterBelowMin, reached: fields.message.counter }}
      />

      <ConsentField>
        {fields.consent.before}
        <Link
          href={privacyHref}
          target="_blank"
          className="text-foreground underline underline-offset-4 hover:text-accent"
        >
          {fields.consent.link}
          <span className="sr-only"> {newTabHint}</span>
        </Link>
        {fields.consent.after}
      </ConsentField>
    </>
  )
}
