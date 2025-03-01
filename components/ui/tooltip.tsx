/**
 * Tooltip Component
 * 
 * A popup that displays information related to an element when the element 
 * receives keyboard focus or the mouse hovers over it.
 * 
 * This component is built using Radix UI's Tooltip primitive which provides
 * accessibility features, proper positioning, and keyboard interactions.
 * 
 * Features:
 * - Accessible: follows WAI-ARIA tooltip pattern
 * - Appears on hover or focus
 * - Customizable delay for showing/hiding
 * - Proper positioning that adjusts based on viewport edges
 * - Animated transitions
 * 
 * Usage example:
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>
 *       <p>Tooltip content</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * TooltipProvider component
 * Provides context for all tooltip components
 * Controls global tooltip settings like delay duration
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * Tooltip component
 * The root container for tooltip functionality
 */
const Tooltip = TooltipPrimitive.Root

/**
 * TooltipTrigger component
 * The element that triggers the tooltip when hovered or focused
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * TooltipContent component
 * The popup content of the tooltip
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }