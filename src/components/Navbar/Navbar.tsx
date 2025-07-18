import { Button } from "@/components/ui/button";
import { NavMenu } from "./Nav-Menu";
import { NavigationSheet } from "./NavigationSheet";
import { Earth } from "lucide-react";
import { ThemeToggle } from "../Theme/Theme-Toggle";

const NavbarPage = () => {
  return (
    <div className="z-50 bg-transparent">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-2xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4 ">
          <div className="text-xl flex flex-row space-x-1 items-center">
            <Earth />
            <div>FunUI</div>
          </div>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              Sign In
            </Button>
            {/* <Button className="rounded-full">Get Started</Button> */}
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
