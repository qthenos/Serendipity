import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


interface GroupedData {
    [meal: string]: number;
}


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


    const result = data.reduce<GroupedData>((groupedData, item) => {
        const { meal, calories } = item;
      
        // Initialize the meal key if it doesn't exist
        if (!groupedData[meal]) {
          groupedData[meal] = 0;
        }
      
        // Add the calories to the appropriate meal group
        groupedData[meal] += calories;
      
        return groupedData;
      }, {});

    return NextResponse.json({ result });
}