"use client";

import * as React from "react";
import { TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { fetchFoodData } from "@/data/food-data";
import { useDate } from "@/contexts/date-context";

export const description = "A donut chart with text";

export function CalorieWheel() {
  const [chartData, setChartData] = React.useState([{ "meal": "breakfast", 'calories': 0 }]);
  const { date } = useDate();

  const formattedDate = date.toISOString().split('T')[0];
  React.useEffect(() => {
    fetchFoodData(formattedDate).then((data) => setChartData(data.data));
  }, [formattedDate]);

  const chartConfig = {
    calories: {
      label: "Calories"
    },
    breakfast: {
      label: "Breakfast",
      color: "hsl(var(--chart-1))"
    },
    lunch: {
      label: "Lunch",
      color: "hsl(var(--chart-2))"
    },
    dinner: {
      label: "Dinner",
      color: "hsl(var(--chart-3))"
    },
    snacks: {
      label: "Snacks",
      color: "hsl(var(--chart-4))"
    }
  } satisfies ChartConfig;

  
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) => acc + curr.calories,
      0
    );
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Calorie Breakdown</CardTitle>
        <CardDescription>October 23, 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="calories"
              nameKey="meal"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Calories
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Congrats! You have lost 1.5 pounds this month
          <TrendingDown className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
