import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

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
              <a href="p-gokul.site">p-gokul.site</a>
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link to="/" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer05Page;
