"use client"

/**
 * Tooltip Component
 * 
 * This component provides a tooltip that appears when hovering over or focusing on an element.
 * It's built on Radix UI's Tooltip primitive for accessibility and customizability.
 * 
 * Features:
 * - Accessible by default, following WAI-ARIA Tooltip pattern
 * - Customizable appearance with Tailwind CSS
 * - Supports keyboard navigation
 * - Configurable delay for showing/hiding
 * - Proper positioning that adjusts based on available space
 * 
 * @component
 */

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * TooltipProvider Component
 * 
 * Provides context for all tooltip components.
 * Allows for global configuration of tooltip behavior.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {number} [props.delayDuration=700] - Delay before showing tooltip (in ms)
 * @param {number} [props.skipDelayDuration=300] - Skip delay when moving between tooltips (in ms)
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * Tooltip Component
 * 
 * Root component that wraps the trigger and content.
 * 
 * @component
 */
const Tooltip = TooltipPrimitive.Root

/**
 * TooltipTrigger Component
 * 
 * The element that triggers the tooltip when hovered or focused.
 * 
 * @component
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * TooltipContent Component
 * 
 * The content displayed in the tooltip.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tooltip content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.sideOffset=4] - Offset from the trigger (in px)
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-950 dark:text-gray-50 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }