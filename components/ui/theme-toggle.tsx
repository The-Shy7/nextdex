"use client";

/**
 * ThemeToggle Component
 * 
 * This component provides a button that toggles between light and dark modes.
 * It uses the next-themes library to manage theme state and persistence.
 * 
 * Features:
 * - Smooth transition between light and dark modes
 * - Appropriate icons for each theme state
 * - Accessible button with proper aria labels
 * - Responsive design that works on all screen sizes
 * 
 * @component
 */

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full w-10 h-10 hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600" />
      )}
    </Button>
  );
}