import { BooksTable } from "@/components/BooksTable/BooksTable";
import { generateFakeBooks } from "@/data/Data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = generateFakeBooks();
  return (
    <div className="flex  justify-center w-full min-h-screen">
      <div className="max-w-full pt-32">
        <BooksTable data={data} />
      </div>
    </div>
  );
}
