// This component implements a toggle button for the sidebar
// It shows/hides based on screen size and animates a chevron icon

// Import required dependencies and components
import { ChevronLeft } from "lucide-react"; // Chevron icon for toggle button
import { cn } from "@/lib/utils"; // Utility for class name merging
import { Button } from "@/components/ui/button"; // Base button component

// Props interface for the toggle component
interface SidebarToggleProps {
  isOpen: boolean | undefined; // Controls sidebar open/closed state
  setIsOpen?: () => void; // Function to toggle sidebar state
}

// Main toggle button component
export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    // Container with visibility controls
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      {/* Toggle button with click handler */}
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8"
        variant="outline"
        size="icon"
      >
        {/* Animated chevron icon that rotates based on sidebar state */}
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}