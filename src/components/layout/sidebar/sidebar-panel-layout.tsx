// This component implements the main layout with a collapsible sidebar panel
// It wraps the main content and footer, adjusting their margins based on sidebar state

"use client"; // Marks as client component

// Import required dependencies and components
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "./app-sidebar";

// Main layout component that accepts children content
export default function SidebarPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get sidebar state and controls from store
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  return (
    <>
      {/* Render the collapsible sidebar */}
      <Sidebar />

      {/* Main content area with responsive margins */}
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled &&
            (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-[260px]")
        )}
      >
        {children}
      </main>

      {/* Footer with matching responsive margins */}
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          !settings.disabled &&
            (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-[260px]")
        )}
      ></footer>
    </>
  );
}
