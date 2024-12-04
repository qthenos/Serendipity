"use client";

import React, { useState } from "react";
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
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { fetchMacroData } from "@/data/macro-data"; // Corrected function name
import { useDate } from "@/contexts/date-context";

export const description = "A stacked bar chart with a legend";



const chartConfig = {
  consumed: {
    label: "Consumed",
    color: "hsl(var(--chart-1))"
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--chart-5))"
  }
  };

export type MacroData = {
  macro: string;
  consumed: number;
  remaining: number;
};

export function MacroChart() {
  const { date } = useDate();
  
  const [chartData, setChartData] = useState([{}]);
  const formattedDate = date.toISOString().split('T')[0];
  const targetProtein = 110; // Target weight for protein
  const targetCarbs = 20;    // Target weight for carbs
  const targetFats = 40;     // Target weight for fats
  const targetFiber = 10;    // Target weight for fiber

  React.useEffect(() => {
    fetchMacroData(formattedDate).then((response) => {
      const data = response.data ? response.data[0] : null;
      const newChartData: MacroData[] = data ? [
        { macro: "Protein", consumed: data.total_protein ?? 0, remaining: Math.max(0, targetProtein - (data.total_protein ?? 0)) },
        { macro: "Carbs", consumed: data.total_carbs ?? 0, remaining: targetCarbs },
        { macro: "Fats", consumed: data.total_fats ?? 0, remaining: targetFats },
        { macro: "Fiber", consumed: data.total_fiber ?? 0, remaining: targetFiber }
      ] : [
        { macro: "Protein", consumed: 0, remaining: targetProtein },
        { macro: "Carbs", consumed: 0, remaining: targetCarbs },
        { macro: "Fats", consumed: 0, remaining: targetFats },
        { macro: "Fiber", consumed: 0, remaining: targetFiber }
      ];
      setChartData(newChartData);
    });
  }, [formattedDate]);

  console.log(chartData)
  
  // const chartData = [
  //   { macro: "Protein", consumed: 50, remaining: 30 },
  //   { macro: "Carbs", consumed: 70, remaining: 20 },
  //   { macro: "Fats", consumed: 60, remaining: 40 },
  //   { macro: "Fiber", consumed: 30, remaining: 10 }
  // ];

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
          Keep eating healthy!
        </div>
        <div className="leading-none text-muted-foreground">
          Showing macro nutrient consumption for today
        </div>
      </CardFooter>
    </Card>
  );
}
