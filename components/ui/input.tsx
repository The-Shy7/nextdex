/**
 * Input Component
 * 
 * A form control that allows users to enter text data.
 * Inputs are used in forms to collect user information like names, emails, passwords, etc.
 * 
 * Features:
 * - Consistent styling with the design system
 * - Support for disabled state
 * - Focus and hover states
 * - Customizable through className prop
 * - Accessible: includes proper labeling when used with Label component
 * 
 * Usage example:
 * <div className="grid w-full max-w-sm items-center gap-1.5">
 *   <Label htmlFor="email">Email</Label>
 *   <Input type="email" id="email" placeholder="Email" />
 * </div>
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component props
 * Extends HTML input element props
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component implementation
 * A styled input field for text entry
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }