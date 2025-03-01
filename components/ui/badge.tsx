/**
 * Badge Component
 * 
 * A small visual indicator used to highlight an item, indicate status, or display a count.
 * 
 * Features:
 * - Multiple variants (default, secondary, outline, destructive)
 * - Customizable styling through Tailwind classes
 * - Accessible with appropriate ARIA attributes
 * - Responsive design
 * 
 * This component is built with class-variance-authority for flexible styling options.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge variants configuration using class-variance-authority
 * 
 * Defines the available visual variants for the Badge component:
 * - default: Primary colored badge
 * - secondary: Less prominent badge
 * - outline: Badge with border and transparent background
 * - destructive: For error or warning indicators
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Badge component props interface
 * 
 * @extends React.HTMLAttributes<HTMLDivElement> - Standard HTML div attributes
 * @extends VariantProps<typeof badgeVariants> - Variant props from class-variance-authority
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component
 * 
 * A small visual indicator with various styling options.
 * 
 * @param props - Badge component props including variant and HTML div attributes
 * @returns Badge component with appropriate styling
 * 
 * Example usage:
 * <Badge>New</Badge>
 * <Badge variant="destructive">Error</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }