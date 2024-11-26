import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface FoodData {
    meal: string;
    calories: number;
}

interface GroupedData {
    meal: string;
    calories: number;
    fill: string;
}

const colorData: Record<string, string> = {
    breakfast: "var(--color-breakfast)",
    lunch: "var(--color-lunch)",
    dinner: "var(--color-dinner)",
    snacks: "var(--color-snacks)"
};

export const GET = async () => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('foodData')
        .select(`meal, calories`);  

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const groupedData: Record<string, number> = {};

    data.forEach(item => {
        const { meal, calories } = item;
        if (groupedData[meal]) {
            groupedData[meal] += calories;
        } else {
            groupedData[meal] = calories;
        }
    });

    const result: GroupedData[] = Object.entries(groupedData).map(([meal, calories]) => ({
        meal,
        calories,
        fill: colorData[meal] || ""
    }));

    return NextResponse.json({ data: result });
}