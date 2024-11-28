import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


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


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    let date = searchParams.get("date");

    let startDate: Date;
    let endDate: Date;

    if (!date) {
        startDate = new Date();
        startDate.setUTCHours(0, 0, 0, 0);
    } else {
        startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
    }
    endDate = new Date(startDate);
    endDate.setUTCHours(23, 59, 59, 999);

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('foodData')
        .select(`meal, calories`)
        .gte('created_at', startDate.toISOString())
        .lt('created_at', endDate.toISOString())
        
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