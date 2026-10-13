import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-pill border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,filter,transform] duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/85',
        gradient:
          'bg-gradient-primary font-semibold text-on-accent shadow-glow hover:brightness-110 hover:saturate-125',
        whatsapp: 'bg-whatsapp font-semibold text-on-accent hover:brightness-110',
        outline:
          'border-line-2 bg-ghost text-foreground hover:border-dim hover:bg-surface-hover aria-expanded:bg-surface-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-surface-hover',
        ghost: 'text-foreground hover:bg-surface-hover aria-expanded:bg-surface-hover',
        destructive:
          'bg-destructive/15 text-destructive hover:bg-destructive/25 focus-visible:ring-destructive/40',
        link: 'h-auto px-0 text-accent underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 gap-2 px-5 text-sm',
        sm: 'h-9 gap-1.5 px-3.5 text-sm',
        lg: 'h-12 gap-2.5 px-6 text-base',
        icon: 'size-11',
        'icon-sm': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
