"use client";

/**
 * ThemeProvider Component
 * 
 * This component provides theme context to the entire application using next-themes.
 * It enables consistent theme application across all components and handles
 * theme persistence between sessions.
 * 
 * Features:
 * - Supports light and dark modes
 * - Persists theme preference in local storage
 * - Respects user's system preference by default
 * - Prevents flash of wrong theme on page load
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with the theme provider
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}