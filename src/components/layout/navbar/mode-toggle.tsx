// This component enables theme switching between light and dark modes
// It uses next-themes for theme management and includes animated icons

"use client"; // Indicates this is a client-side component

// Import required dependencies
import * as React from "react";
import { useTheme } from "next-themes"; // For theme management
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"; // Theme icons

// Import UI components
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function ModeToggle() {
  // Get theme state and setter from next-themes
  const { setTheme, theme } = useTheme();

  return (
    // Tooltip wrapper for the theme toggle button
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {/* Theme toggle button with animated icons */}
          <Button
            className="rounded-full w-8 h-8 bg-background mr-2"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {/* Sun icon with animation for light/dark transitions */}
            <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            {/* Moon icon with animation for light/dark transitions */}
            <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
