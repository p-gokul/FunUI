import { GridPattern } from "../ui/grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden ">
      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Robust Table, Multi-Theme Charts and Forms
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Explore a collection of Shadcn UI blocks and components, ready to
          preview and copy. Streamline your development workflow with
          easy-to-implement examples.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <Github className="!h-5 !w-5" /> Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
