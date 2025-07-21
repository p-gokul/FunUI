import { useTranslation } from "react-i18next";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

export const description = "Radar chart showing book counts by genre";

// 1. Generate books
const books: Book[] = generateFakeBooks(1000);

// 2. Chart data
const chartData = bookGenres.map((genre) => ({
  genre,
  count: books.filter((b) => b.genre === genre).length,
}));

export function GenreRadarChart() {
  const { t } = useTranslation();

  const chartConfig: ChartConfig = {
    count: {
      label: t("charts.genre_radar_chart.books_label"),
      color: "var(--color-chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>{t("charts.genre_radar_chart.title")}</CardTitle>
        <CardDescription>
          {t("charts.genre_radar_chart.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" nameKey="genre" />}
            />
            <PolarAngleAxis
              dataKey="genre"
              tick={({ x, y, textAnchor, index, ...props }) => {
                const data = chartData[index];

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{data.count}</tspan>
                    <tspan
                      x={x}
                      dy="1rem"
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.genre}
                    </tspan>
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-chart-5)"
              stroke="var(--color-chart-1)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {t("charts.genre_radar_chart.footer_note")}
        </div>
      </CardFooter>
    </Card>
  );
}
