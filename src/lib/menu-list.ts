import {
    Wallet,
    User,
    TrendingUp,
    Camera,
    LucideIcon,
    Banknote,
    CreditCard,
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
            href: "/dashboard",
            label: "Expense",
            icon: Wallet,
            submenus: [],
          },
          {
            href: "/account",
            label: "My Account", 
            icon: User,
          },
  
          {
            href: "/profit",
            label: "Profit Loss",
            icon: TrendingUp,
          },
          {
            href: "/snap",
            label: "Snap Receipts",
            icon: Camera,
          },
          {
            href: "/retire",
            label: "Retirement Planning",
            icon: Banknote,
          },
          {
            href: "/pricing",
            label: "Pricing",
            icon: CreditCard,
          },
        ],
      },
    ];
  }