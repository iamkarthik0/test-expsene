// This component implements a sliding sheet menu for mobile navigation
// It includes a menu trigger button and a slide-out panel with navigation options

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { Menu } from "../sidebar/menu";

export function SheetMenu() {
  return (
    // Sheet component for slide-out navigation panel
    <Sheet>
      {/* Menu trigger button, only visible on mobile/tablet */}
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      {/* Sheet content panel that slides in from left */}
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          {/* Brand/logo button that links to dashboard */}
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
             
              <SheetTitle className="font-bold text-lg">XREPO-AI</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        {/* Navigation menu component */}
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}