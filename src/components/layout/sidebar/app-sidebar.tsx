// This is a client-side component that implements a collapsible sidebar navigation
// It includes a brand logo, toggle controls, and navigation menu

"use client"; // Marks as client component

// Import required dependencies and components
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useStore } from "@/hooks/use-store";
import { SidebarToggle } from "./sidebar-toggle";
import { Menu } from "./menu";

export function Sidebar() {
  // Get sidebar state and controls from store
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  return (
    // Main sidebar container with responsive positioning and animations
    <aside
      className={cn(
        " fixed top-0  z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-[260px]", // Adjust width based on open state
        settings.disabled && "hidden" // Hide if disabled in settings
      )}
    >
      {/* Toggle button for expanding/collapsing sidebar */}
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />

      {/* Main sidebar content with hover detection */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-2 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        {/* Brand logo/link with animated visibility */}
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !getOpenState()
                  ? "-translate-x-96 opacity-0 hidden" // Hide text when collapsed
                  : "translate-x-0 opacity-100"
              )}
            >
            XREPO-AI
            </h1>
          </Link>
        </Button>

        {/* Navigation menu component */}
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
