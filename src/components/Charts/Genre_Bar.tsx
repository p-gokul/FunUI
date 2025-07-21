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

// 1. Generate book data
const books: Book[] = generateFakeBooks(1000);

// 3. Aggregate chart data
const chartData = bookGenres.map((genre) => ({
  genre,
  count: books.filter((b) => b.genre === genre).length,
}));

// 4. Chart config
const chartConfig = {
  count: {
    label: "Books",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function BookGenreBarChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Bar Chart - Book Genres</CardTitle>
        <CardDescription>Distribution of books by genre</CardDescription>
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
              angle={-30}
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
      <CardFooter className="flex-col  gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Based on 1,000 randomly generated books
        </div>
      </CardFooter>
    </Card>
  );
}
