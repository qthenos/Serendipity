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
  snacks: "var(--color-snacks)",
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const startDate = new Date(date || Date.now());
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setUTCHours(23, 59, 59, 999);

    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const { data, error } = await supabase
      .from("foodData")
      .select("meal, calories")
      .gte("created_at", startDate.toISOString())
      .lt("created_at", endDate.toISOString());

    if (error) {
      throw new Error(error.message);
    }

    const groupedData: GroupedData[] = data.reduce((acc, { meal, calories }) => {
      const existing = acc.find(item => item.meal === meal);
      if (existing) {
        existing.calories += calories;
      } else {
        acc.push({
          meal,
          calories,
          fill: colorData[meal] || "",
        });
      }
      return acc;
    }, [] as GroupedData[]);

    return NextResponse.json({ data: groupedData });
  } catch (error) {
    console.error("Error fetching food data:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
  }
};