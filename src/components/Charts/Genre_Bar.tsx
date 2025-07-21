import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
import { bookGenres, type Book } from "@/types_&_schemas";
import { generateFakeBooks } from "@/data/Data";
import { useTranslation } from "react-i18next";

// 1. Generate book data
const books: Book[] = generateFakeBooks(1000);

// 2. Aggregate chart data
const chartData = bookGenres.map((genre) => ({
  genre,
  count: books.filter((b) => b.genre === genre).length,
}));

export default function GenreBarChart() {
  const { t } = useTranslation();

  const chartConfig = {
    count: {
      label: t("charts.genre_bar_chart.books_label"),
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{t("charts.genre_bar_chart.title")}</CardTitle>
        <CardDescription>
          {t("charts.genre_bar_chart.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="genre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-chart-5)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {t("charts.genre_bar_chart.footer_note")}
        </div>
      </CardFooter>
    </Card>
  );
}
