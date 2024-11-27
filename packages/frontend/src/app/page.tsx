import { CalorieWheel } from "@/components/calorie-wheel";
import { MacroChart } from "@/components/macro-chart";
import { ModeToggle } from "@/components/mode-toggle";
import QuickAdd from "@/components/quick-add";
import { Toaster } from "@/components/ui/toaster";
import { CalorieProgress } from "@/components/calorie-progress";
import { WeightPlot } from "@/components/weight-plot";
import { DateAggregation } from "@/components/date-aggreation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex space-x-4">
        <ModeToggle />
        <Link href="/account">
          <Button>My Account</Button>
        </Link>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Daily Calories</h1>
        <div className="grid grid-cols-2 gap-4">
          <CalorieWheel />
          <MacroChart />
        </div>
        <hr className="my-16 border-t border-gray-300" />
        <h1 className="text-2xl font-bold">Track Your Progress</h1>
        <DateAggregation />
        <div className="grid grid-cols-2 gap-4">
          <CalorieProgress />
          <WeightPlot />
        </div>
      </div>
      <QuickAdd />
      <Toaster />
    </div>
  );
}
