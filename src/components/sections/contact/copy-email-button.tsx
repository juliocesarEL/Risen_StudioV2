'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

interface CopyEmailButtonProps {
  email: string
  copy: { label: string; success: string; failure: string }
}

export function CopyEmailButton({ email, copy }: CopyEmailButtonProps) {
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      toast.success(copy.success)
    } catch (error) {
      console.error('[contato] Não foi possível copiar o e-mail.', error)
      toast.error(copy.failure)
    }
  }

  return (
    <Button type="button" variant="ghost" size="icon" onClick={copyEmail} aria-label={copy.label}>
      <Copy aria-hidden="true" />
    </Button>
  )
}
