"use client";

import { useState, useEffect } from "react";
import { MinusIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./ui/drawer";
import { ChartTooltip } from "./ui/chart";
import MealDropdown from "@/app/record-meal/components/meal-dropdown";
import { useDate } from "@/contexts/date-context";
import { fetchCalorieData } from "@/data/calorie-data";


export default function QuickAdd() {
  const [calories, setCalories] = useState(350);
  const [chartData, setChartData] = useState([{ calories: 0 }]);
  const [isClient, setIsClient] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast")
  const { date } = useDate();

  const formattedDate = date.toISOString().split('T')[0];
  useEffect(() => {
    fetchCalorieData(formattedDate).then((data) => {
      if (data && data.data && data.data.length > 0) {
        setChartData(data.data);
      } else {
        setChartData([{ calories: 0 }]);
      }
    });
  }, [formattedDate]);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  function onClick(adjustment: number) {
    setCalories(Math.max(0, Math.min(10000, calories + adjustment)));
  }

  function handleSubmit() {
    const newData = [...chartData, { calories }];
    setChartData(newData);
    const body = JSON.stringify({
      meal: selectedMeal,
      calories: calories,
      date: date.toISOString().split('T')[0],
    });

    fetch('/api/food-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error('Error inserting data:', errorData.error);
            throw new Error('There is a problem with your log');
          });
        }
        return response.json();
      })
      .then(() => {
        console.log('Data inserted successfully');
        setCalories(350); // Reset calories after successful submission
      })
      .catch(error => {
        console.error('An error occurred while submitting data:', error);
      });
  }


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} className="w-full my-2"><PlusCircledIcon /> Quick Add Calories</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Quick Add Calories</DrawerTitle>
            <DrawerDescription>
              Set a meal and quickly add calories
            </DrawerDescription>
            <MealDropdown selectedMeal={selectedMeal} setSelectedMeal={(meal) => setSelectedMeal(meal as "breakfast" | "lunch" | "dinner" | "snacks")} />

          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-50)}
                disabled={calories <= 0}>
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {calories}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(50)}
                disabled={calories >= 10000}>
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>

            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar
                    dataKey="calories"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9
                      } as React.CSSProperties
                    }>
                    <ChartTooltip />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}