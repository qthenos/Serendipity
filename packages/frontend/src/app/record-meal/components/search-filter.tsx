import React from "react"
import { Input } from "@/components/ui/input"

interface SearchFilterProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    handleSearchSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    table: {
        getColumn: (columnId: string) => {
            getFilterValue: () => unknown;
            setFilterValue: (value: unknown) => void;
        } | undefined;
    };
}

const SearchBar: React.FC<Omit<SearchFilterProps, 'table'>> = ({ searchTerm, setSearchTerm, handleSearchSubmit }) => (
    <Input
        type="search"
        placeholder="Search for a food"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchSubmit(e);
            }
        }}
    />
);

const FilterBar: React.FC<Pick<SearchFilterProps, 'table'>> = ({ table }) => (
    <Input
        placeholder="Filter food..."
        value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
            table.getColumn("label")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
    />
);

export { SearchBar, FilterBar };
