"use client"

import * as React from "react"
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import ColumnVisibilityDropdown from "./components/column-filter"
import DataTable from "./components/data-table"
import PaginationControls from "./components/pagination-controls"
import { SearchBar, FilterBar } from "./components/search-filter"
import { columns } from "./components/column-config"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import MealDropdown from "./components/meal-dropdown"
import { useToast } from "@/hooks/use-toast"
import { useDate } from "@/contexts/date-context"

export type FoodItem = {
    label: string
    ENERC_KCAL: number
    PROCNT: number
    FAT: number
    CHOCDF: number
    FIBTG: number
    quantity: number // Added quantity field
}

export default function Page() {
    const [data, setData] = React.useState<FoodItem[]>([])
    const [searchTerm, setSearchTerm] = React.useState<string>("")
    const [selectedItems, setSelectedItems] = React.useState<FoodItem[]>([]);
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [selectedMeal, setSelectedMeal] = React.useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast")

    const fetchData = async (query: string) => {
        try {
            const response = await fetch(`/api/macro-data?query=${query}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const result = await response.json()
            const foodItems = result.hints.map((hint: any) => ({
                label: hint.food.label,
                ENERC_KCAL: hint.food.nutrients.ENERC_KCAL,
                PROCNT: hint.food.nutrients.PROCNT,
                FAT: hint.food.nutrients.FAT,
                CHOCDF: hint.food.nutrients.CHOCDF,
                FIBTG: hint.food.nutrients.FIBTG,
                quantity: 1 // Default quantity to 1
            }))
            setData(foodItems)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    React.useEffect(() => {
        fetchData("")
    }, [])

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setRowSelection({});
        fetchData(searchTerm)
    }

    React.useEffect(() => {
        const newSelectedItems = Object.keys(rowSelection)
            .filter((key) => rowSelection[key as keyof typeof rowSelection])
            .map((key) => data[parseInt(key)]);

        // Merge new selections with existing ones, avoiding duplicates
        const updatedSelectedItems = [...selectedItems, ...newSelectedItems].reduce((acc, item) => {
            if (!acc.some(existingItem => existingItem.label === item.label)) {
                acc.push(item);
            }
            return acc;
        }, [] as FoodItem[]);

        setSelectedItems(updatedSelectedItems);
    }, [rowSelection]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const addFoodItem = () => {
        const newSelectedItems = Object.keys(rowSelection)
            .filter((key) => rowSelection[key as keyof typeof rowSelection])
            .map((key) => data[parseInt(key)]);

        // Merge new selections with existing ones, avoiding duplicates
        const updatedSelectedItems = [...selectedItems, ...newSelectedItems].reduce((acc, item) => {
            if (!acc.some(existingItem => existingItem.label === item.label)) {
                acc.push(item);
            }
            return acc;
        }, [] as FoodItem[]);

        setSelectedItems(updatedSelectedItems);
    }

    const handleQuantityChange = (label: string, quantity: number) => {
        setSelectedItems(prevItems =>
            prevItems.map(item =>
                item.label === label ? { ...item, quantity } : item
            )
                .filter(item => item.quantity > 0)
        );
    }

    const { toast } = useToast();
    const { date } = useDate();
    const onClick = async () => {
        if (selectedItems.length === 0) {
            toast({
                title: "No items selected",
                description: "Please select at least one food item to log.",
            });
            return;
        }

        try {
            let allSuccess = true;
            for (const item of selectedItems) {
                const body = JSON.stringify({
                    meal: selectedMeal,
                    calories: item.ENERC_KCAL * item.quantity,
                    protein: item.PROCNT * item.quantity,
                    fat: item.FAT * item.quantity,
                    carbs: item.CHOCDF * item.quantity,
                    fiber: item.FIBTG * item.quantity,
                    date: date.toISOString().split('T')[0],
                });

                const response = await fetch('/api/food-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error inserting data:', errorData.error);
                    toast({
                        title: "Uh oh!",
                        description: "There is a problem with your log",
                    });
                    allSuccess = false;
                    continue; // Continue with the next item
                }
            }

            if (allSuccess) {
                console.log('All data inserted successfully');
                setSelectedItems([]);
                setRowSelection({});
                toast({
                    title: "Yay!",
                    description: "Food logged successfully",
                });
            }
        } catch (error) {
            console.error('An error occurred while submitting data:', error);
        }
    }



    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={40}>
                    <div className="w-full p-8 ">
                        <p className="mb-4 text-large font-bold leading-none">Add Food Items</p>
                        <Separator className="my-2" />
                        <div className="py-2">
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleSearchSubmit={handleSearchSubmit}
                            />
                        </div>
                        <div className="flex py-2">
                            <div className="flex-grow">
                                <FilterBar table={table} />
                            </div>
                            <div className="flex-none">
                                <ColumnVisibilityDropdown table={table} />
                            </div>
                        </div>
                        <DataTable table={table} columns={columns} onChange={addFoodItem} />
                        <PaginationControls table={table} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={20} className="p-8">
                    <p className="mb-4 text-large font-bold leading-none">Added Food Items</p>
                    <Separator className="my-2" />
                    <MealDropdown selectedMeal={selectedMeal} setSelectedMeal={(meal) => setSelectedMeal(meal as "breakfast" | "lunch" | "dinner" | "snacks")} />

                    <div className="flex flex-col h-full min-w-6">
                        <ScrollArea className="h-[38rem] w-full rounded-md border my-4 ">
                            <div className="p-4">
                                {selectedItems.map((item) => (
                                    <>
                                        <div className="flex justify-between items-center space-x-4">
                                            <div key={item.label} className="text-sm mx-2">
                                                {item.label}
                                                <br />
                                                <div className="text-gray-400">{item.ENERC_KCAL.toFixed(0)} cal</div>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-sm">Count: </p>
                                                <Input type="number" defaultValue={1} className="ml-2 w-[4rem]" onChange={(e) => handleQuantityChange(item.label, parseInt(e.target.value, 10))} />
                                            </div>
                                        </div>
                                        <Separator className="my-2" />
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-x-4 *:">
                            <Button type="reset" variant={"destructive"} onClick={() => {
                                setSelectedItems([]);
                                setRowSelection({});
                            }}>Clear</Button>
                            <Button type="submit" onClick={onClick}>Submit</Button>
                        </div>
                    </div>

                </ResizablePanel>
            </ResizablePanelGroup>
        </SidebarProvider>
    )
}
