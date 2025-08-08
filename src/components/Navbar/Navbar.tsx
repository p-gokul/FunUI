import { NavMenu } from "./Nav-Menu";
import { NavigationSheet } from "./NavigationSheet";
import { ThemeToggle } from "../Theme/Theme-Toggle";
import { ThemeSelector } from "../Theme/theme-selector";
import { LanguageSwitcher } from "@/i18n/LanguageDropdown";
import { useNavigate } from "@tanstack/react-router";
import FunUI from "/fun-ui.svg";

const NavbarPage = () => {
  const navigate = useNavigate();
  return (
    <div className="z-50 bg-transparent">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background/60 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-2xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4 ">
          <div
            className="text-xl flex flex-row space-x-1 items-center cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            {/* <Earth /> */}
            <img src={FunUI} className="w-8 h-8" />
            <div>FunUI</div>
          </div>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSelector />
            <ThemeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPage;
