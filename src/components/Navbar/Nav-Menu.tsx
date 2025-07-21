import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

// Navigation menu items as data
const navItems = [
  { name: "dashboard", to: "/" },
  { name: "table", to: "/table" },
  { name: "chart", to: "/charts" },
  { name: "form", to: "/form" },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useTranslation();
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.to}>
            <NavigationMenuLink asChild>
              <Link to={item.to}>
                {t(`navbar.${item.name}`)}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
