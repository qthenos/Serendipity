import { Select, SelectValue, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";

export type MealDropdownProps = {
    selectedMeal: "breakfast" | "lunch" | "dinner" | "snacks";
    setSelectedMeal: (meal: string) => void;
}

const MealDropdown = ({ selectedMeal, setSelectedMeal }: MealDropdownProps) => {
    return (
        <Select value={selectedMeal} onValueChange={setSelectedMeal}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a meal" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Meal</SelectLabel>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}   
export default MealDropdown;