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
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex-1 flex flex-col p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="flex justify-between items-center mb-8">
            <ModeToggle />
            <Link href="/account/profile">
              <Button>My Account</Button>
            </Link>
          </div>
          <div className="flex-1 space-y-8">
            <section>
              <h1 className="text-2xl font-bold mb-4">Daily Calories</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalorieWheel />
                <MacroChart />
              </div>
            </section>
            <hr className="border-t border-gray-300" />
            <section>
              <h1 className="text-2xl font-bold mb-4">Track Your Progress</h1>
              <DateAggregation />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalorieProgress />
                <WeightPlot />
              </div>
            </section>
          </div>
          <QuickAdd />
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
}
