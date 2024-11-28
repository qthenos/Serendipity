"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { useDate } from "@/contexts/date-context";


export function DatePicker() {
  const { date , setDate } = useDate();
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar 
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" 
          initialFocus
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
