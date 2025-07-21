import { useTranslation } from "react-i18next";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { bookGenres, type BookGenre, type Book } from "@/types_&_schemas";
import { generateFakeBooks } from "@/data/Data";

export const description = "A pie chart showing book genre distribution";

// 1. Generate data
const books: Book[] = generateFakeBooks(1000);

// 2. Assign genre colors (theme variable-based)
const genreColors: Record<BookGenre, string> = {
  Fiction: "var(--color-chart-1)",
  Comic: "var(--color-chart-2)",
  Mystery: "var(--color-chart-3)",
  Fantasy: "var(--color-chart-4)",
  Romance: "var(--color-chart-5)",
  Memoir: "var(--color-chart-6)",
  Biography: "var(--color-chart-7)",
  History: "var(--color-chart-8)",
  Adventure: "var(--color-chart-9)",
};

// 3. Aggregate chart data
const chartData = bookGenres.map((genre) => ({
  genre,
  count: books.filter((b) => b.genre === genre).length,
  fill: genreColors[genre],
}));

// 4. Optional config for legends/tooltips (not required for Pie, but useful)
const chartConfig = Object.fromEntries(
  bookGenres.map((genre) => [
    genre,
    {
      label: genre,
      color: genreColors[genre],
    },
  ])
) satisfies ChartConfig;

export function GenrePieChart() {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("charts.genre_pie_chart.title")}</CardTitle>
        <CardDescription>
          {t("charts.genre_pie_chart.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="genre" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="genre"
              label
              labelLine={false}
              outerRadius="80%"
              isAnimationActive={true}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {t("charts.genre_pie_chart.footer_note")}
        </div>
      </CardFooter>
    </Card>
  );
}
