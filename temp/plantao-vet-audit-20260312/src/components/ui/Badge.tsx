import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary)] text-white shadow hover:bg-[var(--primary-hover)]",
        secondary:
          "border-transparent bg-[var(--surface-hover)] text-[var(--text-main)] hover:bg-[var(--border)]",
        destructive:
          "border-transparent bg-[var(--accent-red)] text-white shadow hover:bg-[var(--accent-red)]/80",
        outline: "text-[var(--text-main)] border-[var(--border)]",
        warning: "border-transparent bg-[var(--accent-yellow)] text-black shadow hover:bg-[var(--accent-yellow)]/80",
        success: "border-transparent bg-[var(--accent-green)] text-white shadow hover:bg-[var(--accent-green)]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
