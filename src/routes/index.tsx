import Dashboard from "@/components/Hero/Features";
import Footer05Page from "@/components/Hero/Footer";
import Hero from "@/components/Hero/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full">
      <Hero />
      <Dashboard />
      <Footer05Page />
    </div>
  );
}
