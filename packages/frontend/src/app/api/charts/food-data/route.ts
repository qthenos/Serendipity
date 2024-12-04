import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const colorData: Record<string, string> = {
  breakfast: "var(--color-breakfast)",
  lunch: "var(--color-lunch)",
  dinner: "var(--color-dinner)",
  snacks: "var(--color-snacks)",
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0];
  
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_food_data').eq("date", date);

  if (error) {
    return NextResponse.json({ error: error.message, date: date}, { status: 500 });
  }

  const result = data.map((meal: { meal: string }) => ({
    ...meal,
    fill: colorData[meal.meal] || "var(--color-default)"
  }));

  return NextResponse.json({data: result });
};
