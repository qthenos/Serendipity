import { Select, SelectValue, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";

const MealDropdown = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a meal" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup defaultValue={"breakfast"}>
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