import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const features = [
  {
    category: "Table",
    title: "Powerful and Customizable Data Tables",
    details:
      "Includes features like header grouping, column filtering, visibility toggles, row selection, pagination, and sorting — all customizable for your needs.",
    tutorialLink: "/docs/table",
  },
  {
    category: "Charts",
    title: "Visualize Data with Bar, Pie, and Line Charts",
    details:
      "Turn complex data into insightful visualizations using bar, pie, and line charts — ideal for reports, dashboards, and business intelligence.",
    tutorialLink: "/docs/charts",
  },
  {
    category: "Form",
    title: "Type-Safe Forms with Zod and React Hook Form",
    details:
      "Build robust forms using React Hook Form and Zod for schema validation, ensuring accurate input handling with a smooth developer experience.",
    tutorialLink: "/docs/forms",
  },
  {
    category: "Dashboard",
    title: "Centralized and Dynamic Dashboard",
    details:
      "Track everything in one place — from KPIs to recent activity. Supports real-time updates, widgets, and custom views tailored to your workflow.",
    tutorialLink: "/docs/dashboard",
  },
  {
    category: "Global Features",
    title: "Multi-Language and Multi-Theme Support",
    details:
      "Switch seamlessly between languages and light/dark themes. Personalize your experience with built-in localization and theme toggling.",
    tutorialLink: "/docs/localization",
  },
];

const Features06Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full py-10 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          Boost Your Workflow with Smart Features
        </h2>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
            >
              <div className="w-full aspect-[6/4] bg-muted rounded-xl border border-border/50 basis-1/2" />
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-semibold text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-[17px]">
                  {feature.details}
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full min-w-40 text-[15px]"
                >
                  <Link to={feature.tutorialLink}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features06Page;
