import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "lucide-react";

const Footer05Page = () => {
  return (
    <div className=" flex flex-col ">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <a href="p-gokul.site">p-gokul.dev</a>
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <div
                onClick={() =>
                  window.open("https://github.com/p-gokul/FunUI", "_blank")
                }
                className="cursor-pointer"
              >
                <GithubIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer05Page;
