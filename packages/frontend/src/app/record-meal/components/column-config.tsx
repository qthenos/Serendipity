import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type FoodItem = {
    label: string
    ENERC_KCAL: number
    PROCNT: number
    FAT: number
    CHOCDF: number
    FIBTG: number
}

export const columns: ColumnDef<FoodItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "label",
        header: "Food",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("label")}</div>
        ),
    },
    {
        accessorKey: "ENERC_KCAL",
        header: "Calories",
        cell: ({ row }) => {
            const value = row.getValue("ENERC_KCAL");
            return <div>{typeof value === 'number' ? `${value.toFixed(0)} cal` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "PROCNT",
        header: "Protein",
        cell: ({ row }) => {
            const value = row.getValue("PROCNT");
            return <div>{typeof value === 'number' ? `${value.toFixed(1)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "FAT",
        header: "Fat",
        cell: ({ row }) => {
            const value = row.getValue("FAT");
            return <div>{typeof value === 'number' ? `${value.toFixed(1)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "CHOCDF",
        header: "Carbs",
        cell: ({ row }) => {
            const value = row.getValue("CHOCDF");
            return <div>{typeof value === 'number' ? `${value.toFixed(2)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "FIBTG",
        header: "Fiber",
        cell: ({ row }) => {
            const value = row.getValue("FIBTG");
            return <div>{typeof value === 'number' ? `${value.toFixed(2)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const foodItem = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(foodItem.label)}
                        >
                            Copy food name
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]