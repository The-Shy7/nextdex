/**
 * Card Component
 * 
 * A container component that groups related content and actions.
 * 
 * Features:
 * - Structured layout with header, content, and footer sections
 * - Consistent styling with border, shadow, and rounded corners
 * - Customizable through Tailwind classes
 * - Semantic HTML structure
 * 
 * This component provides a flexible container for displaying content
 * in a visually distinct and organized manner.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card component
 * 
 * The main container for the card with border and rounded corners.
 * 
 * @param props - Standard HTML div attributes
 * @returns Card container component
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Card Header component
 * 
 * Container for the card's title and description, positioned at the top.
 * 
 * @param props - Standard HTML div attributes
 * @returns Card header component
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Card Title component
 * 
 * The main heading of the card, typically displayed in the header.
 * 
 * @param props - Standard HTML h3 attributes
 * @returns Card title component
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Card Description component
 * 
 * Secondary text that provides additional context about the card content.
 * 
 * @param props - Standard HTML paragraph attributes
 * @returns Card description component
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Card Content component
 * 
 * The main content area of the card.
 * 
 * @param props - Standard HTML div attributes
 * @returns Card content component
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * Card Footer component
 * 
 * Container for actions or additional information at the bottom of the card.
 * 
 * @param props - Standard HTML div attributes
 * @returns Card footer component
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }