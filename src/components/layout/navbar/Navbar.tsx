// This component represents the main navigation bar of the application
// It includes a sheet menu for mobile navigation, page title, theme toggle and user navigation

import { getUser } from "@/app/actions/getUser";
import { ModeToggle } from "./mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";

// Define props interface for the Navbar component
interface NavbarProps {
  title: string; // Title to display in the navbar
}

// Navbar component renders the top navigation bar with various controls
export async function Navbar({ title }: NavbarProps) {
  const user = await getUser();
  return (
    // Header with sticky positioning and glass-like background effect
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        {/* Left section with menu and title */}
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu /> {/* Mobile menu trigger */}
          <h1 className="font-bold">{title}</h1>
        </div>
        {/* Right section with theme toggle and user menu */}
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle /> {/* Light/dark theme toggle */}
          <UserNav
            email={user?.email}
            name={user?.name}
            image={user?.image}
          />{" "}
          {/* User profile dropdown */}
        </div>
      </div>
    </header>
  );
}
