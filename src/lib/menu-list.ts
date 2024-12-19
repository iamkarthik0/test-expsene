import {
    Wallet,
    User,
    TrendingUp,
    Camera,
    LucideIcon,
    Banknote,
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active?: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "Expense",
            icon: Wallet,
            submenus: [],
          },
          {
            href: "/users",
            label: "My Account",
            icon: User,
          },
  
          {
            href: "/users",
            label: "Profit Loss",
            icon: TrendingUp,
          },
          {
            href: "/users",
            label: "Snap Receipts",
            icon: Camera,
          },
          {
            href: "/users",
            label: "Retirement Planning",
            icon: Banknote,
          },
        ],
      },
    ];
  }
  