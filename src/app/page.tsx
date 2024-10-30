import { CalorieWheel } from "@/components/calorie-wheel";
import { MacroChart } from "@/components/macro-chart";
import { ModeToggle } from "@/components/mode-toggle";
import QuickAdd from "@/components/quick-add";
import { AddMeal } from "@/components/add-meal";
import { Toaster } from "@/components/ui/toaster";
import { CalorieProgress } from "@/components/calorie-progress";
import { WeightPlot } from "@/components/weight-plot";
import { DateAggregation } from "@/components/date-aggreation";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ModeToggle />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CalorieWheel />
          <MacroChart />
        </div>

        <DateAggregation />
        <div className="grid grid-cols-2 gap-4">
          <CalorieProgress />
          <WeightPlot />
        </div>
      </div>
      <QuickAdd />
      <AddMeal />
      <Toaster />
    </div>
  );
}
