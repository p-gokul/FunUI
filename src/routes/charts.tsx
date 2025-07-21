import ChartsPage from "@/components/Charts/Charts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/charts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full  min-h-screen p-4">
      <ChartsPage />
    </div>
  );
}
