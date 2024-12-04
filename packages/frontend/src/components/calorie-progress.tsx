"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList
} from "recharts";

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
import React from "react";

export const description = "A bar chart with negative values";

const chartConfig = {
  avg_calories: {
    label: "Average Calories"
  }
} satisfies ChartConfig;

export function CalorieProgress() {
  const [chartData, setChartData] = React.useState<{ month: string; avg_calories: number; }[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/grouped-calorie-data');
        const result = await response.json();
        if (result.data) {
          const transformedData = result.data.map((item: { month: string; average_total_calories: number; }) => ({
            month: item.month.trim(),
            avg_calories: item.average_total_calories - 2700
          }));
          const sortedData = transformedData.sort((a: { month: string }, b: { month: string }) => new Date(`01 ${a.month} 2020`).getTime() - new Date(`01 ${b.month} 2020`).getTime());
          setChartData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(chartData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Calorie Progress</CardTitle>
        <CardDescription>Showing average total calories </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel hideIndicator />
              }
            />
            <Bar dataKey="avg_calories" radius={5}>
              <LabelList
                position="top"
                dataKey="month"
                fillOpacity={1}
              />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.avg_calories > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
