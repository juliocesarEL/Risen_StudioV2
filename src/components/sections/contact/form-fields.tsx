'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { fillTemplate } from '@/lib/format'
import { formatBrazilianPhone } from '@/lib/phone'
import type { ContactFieldName, ContactFormValues } from '@/lib/schemas/contact'

import type { ComponentProps, ReactNode } from 'react'

/** ids estáveis para associar rótulo, campo, descrição e erro. */
export function fieldIds(name: ContactFieldName) {
  const id = `contato-${name}`
  return { id, errorId: `${id}-erro`, descriptionId: `${id}-descricao` }
}

function describedBy(...ids: (string | false | undefined)[]) {
  const value = ids.filter(Boolean).join(' ')
  return value === '' ? undefined : value
}

function useFieldError(name: ContactFieldName) {
  const {
    formState: { errors },
  } = useFormContext<ContactFormValues>()
  return errors[name]?.message
}

/**
 * Mensagem de erro ligada ao campo por aria-describedby. Não é uma região
 * "ao vivo": é lida quando o campo recebe foco, evitando anúncios em cascata.
 */
function FieldErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm text-danger">
      {message}
    </p>
  )
}

interface LabelProps {
  htmlFor: string
  label: string
  optionalTag?: string
}

function Label({ htmlFor, label, optionalTag }: LabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {label}
      {optionalTag ? <span className="eyebrow text-subtle">{optionalTag}</span> : null}
    </FieldLabel>
  )
}

interface TextFieldProps extends Omit<ComponentProps<typeof Input>, 'name'> {
  name: ContactFieldName
  label: string
  optionalTag?: string
}

export function TextField({ name, label, optionalTag, ...inputProps }: TextFieldProps) {
  const { register } = useFormContext<ContactFormValues>()
  const error = useFieldError(name)
  const { id, errorId } = fieldIds(name)

  return (
    <Field data-invalid={Boolean(error)} className="gap-2">
      <Label htmlFor={id} label={label} optionalTag={optionalTag} />
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(error && errorId)}
        {...inputProps}
        {...register(name)}
      />
      <FieldErrorText id={errorId} message={error} />
    </Field>
  )
}

export function PhoneField({
  label,
  optionalTag,
  placeholder,
}: Omit<LabelProps, 'htmlFor'> & { placeholder: string }) {
  const { control } = useFormContext<ContactFormValues>()
  const error = useFieldError('phone')
  const { id, errorId } = fieldIds('phone')

  return (
    <Controller
      control={control}
      name="phone"
      render={({ field }) => (
        <Field data-invalid={Boolean(error)} className="gap-2">
          <Label htmlFor={id} label={label} optionalTag={optionalTag} />
          <Input
            id={id}
            ref={field.ref}
            name={field.name}
            value={field.value ?? ''}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(formatBrazilianPhone(event.target.value))}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy(error && errorId)}
          />
          <FieldErrorText id={errorId} message={error} />
        </Field>
      )}
    />
  )
}

interface SelectFieldProps extends Omit<LabelProps, 'htmlFor'> {
  name: 'projectType' | 'budget'
  placeholder: string
  options: { id: string; label: string }[]
}

export function SelectField({ name, label, optionalTag, placeholder, options }: SelectFieldProps) {
  const { control } = useFormContext<ContactFormValues>()
  const error = useFieldError(name)
  const { id, errorId } = fieldIds(name)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field data-invalid={Boolean(error)} className="gap-2">
          <Label htmlFor={id} label={label} optionalTag={optionalTag} />
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            // Só marca o campo como visitado ao fechar a lista, para o erro não
            // aparecer enquanto a pessoa ainda escolhe.
            onOpenChange={(open) => {
              if (!open) field.onBlur()
            }}
          >
            <SelectTrigger
              id={id}
              ref={field.ref}
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy(error && errorId)}
              className="w-full"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-72">
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldErrorText id={errorId} message={error} />
        </Field>
      )}
    />
  )
}

interface MessageFieldProps extends Omit<LabelProps, 'htmlFor'> {
  placeholder: string
  minLength: number
  maxLength: number
  counter: { belowMin: string; reached: string }
}

export function MessageField({
  label,
  placeholder,
  minLength,
  maxLength,
  counter,
}: MessageFieldProps) {
  const { register } = useFormContext<ContactFormValues>()
  const message = useWatch<ContactFormValues, 'message'>({ name: 'message' }) ?? ''
  const error = useFieldError('message')
  const { id, errorId, descriptionId } = fieldIds('message')
  const count = message.trim().length
  const counterText = fillTemplate(count < minLength ? counter.belowMin : counter.reached, {
    count,
    min: minLength,
  })

  return (
    <Field data-invalid={Boolean(error)} className="gap-2">
      <Label htmlFor={id} label={label} />
      <Textarea
        id={id}
        rows={5}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(error && errorId, descriptionId)}
        {...register('message')}
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
        <FieldErrorText id={errorId} message={error} />
        <p
          id={descriptionId}
          className="text-xs text-subtle tabular-nums sm:ml-auto"
          data-complete={count >= minLength}
        >
          {counterText}
        </p>
      </div>
    </Field>
  )
}

interface ConsentFieldProps {
  children: ReactNode
}

export function ConsentField({ children }: ConsentFieldProps) {
  const { control } = useFormContext<ContactFormValues>()
  const error = useFieldError('consent')
  const { id, errorId } = fieldIds('consent')

  return (
    <Controller
      control={control}
      name="consent"
      render={({ field }) => (
        <Field data-invalid={Boolean(error)} className="gap-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id={id}
              ref={field.ref}
              name={field.name}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy(error && errorId)}
              className="mt-0.5"
            />
            <FieldLabel
              htmlFor={id}
              className="block text-sm leading-relaxed font-normal text-body"
            >
              {children}
            </FieldLabel>
          </div>
          <FieldErrorText id={errorId} message={error} />
        </Field>
      )}
    />
  )
}

/**
 * Campo-armadilha para robôs: invisível e fora da ordem de tabulação. Pessoas
 * não o veem; robôs costumam preenchê-lo, e o envio é descartado no servidor.
 */
export function HoneypotField({ label }: { label: string }) {
  const { register } = useFormContext<ContactFormValues>()
  const { id } = fieldIds('website')

  return (
    <div aria-hidden="true" className="sr-only">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
    </div>
  )
}
