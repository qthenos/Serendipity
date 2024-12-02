"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ColumnVisibilityDropdown from "./components/dropdown-menu"
import DataTable from "./components/data-table"
import PaginationControls from "./components/pagination-controls"
import { SearchBar, FilterBar } from "./components/search-filter"

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
            return <div>{typeof value === 'number' ? `${value.toFixed(2)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "PROCNT",
        header: "Protein",
        cell: ({ row }) => {
            const value = row.getValue("PROCNT");
            return <div>{typeof value === 'number' ? `${value.toFixed(2)}g` : <span className="text-gray-400">N/A</span>}</div>;
        },
    },
    {
        accessorKey: "FAT",
        header: "Fat",
        cell: ({ row }) => {
            const value = row.getValue("FAT");
            return <div>{typeof value === 'number' ? `${value.toFixed(2)}g` : <span className="text-gray-400">N/A</span>}</div>;
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

export default function Page() {
    
    const [data, setData] = React.useState<FoodItem[]>([])
    const [searchTerm, setSearchTerm] = React.useState<string>("")

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
        fetchData(searchTerm)
    }

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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

    return (
        <div className="w-full p-8">
            <div className="py-2">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearchSubmit={handleSearchSubmit}
                />
            </div>
            <div className="flex space-x-4 py-2">

                <FilterBar table={table} />
                <ColumnVisibilityDropdown table={table} />
            </div>
            <DataTable table={table} columns={columns} />
            <PaginationControls table={table} />
        </div>
    )
}
