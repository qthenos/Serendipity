"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
  { macro: "Protein", consumed: 50, remaining: 30 },
  { macro: "Carbs", consumed: 70, remaining: 20 },
  { macro: "Fats", consumed: 60, remaining: 40 },
  { macro: "Fiber", consumed: 30, remaining: 10 }
];

const chartConfig = {
  consumed: {
    label: "Consumed",
    color: "hsl(var(--chart-1))"
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--chart-5))"
  }
} satisfies ChartConfig;

export function MacroChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Macro Nutrient Consumption</CardTitle>
        <CardDescription>Daily Intake</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="macro"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="consumed"
              stackId="a"
              fill="var(--color-consumed)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="var(--color-remaining)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing macro nutrient consumption for today
        </div>
      </CardFooter>
    </Card>
  );
}
