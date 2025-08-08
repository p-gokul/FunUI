import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "dashboard", to: "/" },
  { name: "table", to: "/table" },
  { name: "chart", to: "/charts" },
  { name: "form", to: "/form" },
];

const isActivePath = (to: string, pathname: string) => {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
};

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {navItems.map((item) => {
          const active = isActivePath(item.to, pathname);
          return (
            <NavigationMenuItem key={item.to}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors",
                    active
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(`navbar.${item.name}`)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
