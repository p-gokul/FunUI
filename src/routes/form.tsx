import BookForm from "@/components/Form/Form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/form")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <BookForm />
    </div>
  );
}
