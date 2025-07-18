import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "@tanstack/react-router";

// Navigation menu items as data
const navItems = [
  { name: "Dashboard", to: "/" },
  { name: "Table", to: "/table" },
  { name: "Charts", to: "/charts" },
  { name: "Form", to: "/form" },
];

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.to}>
          <NavigationMenuLink asChild>
            <Link to={item.to}>{item.name}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
