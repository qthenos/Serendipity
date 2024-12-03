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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const groupedData: Record<string, number> = {};

  data.forEach((item) => {
    const { meal, calories } = item;
    groupedData[meal] = (groupedData[meal] || 0) + calories;
  });

  const result: GroupedData[] = Object.entries(groupedData).map(
    ([meal, calories]) => ({
      meal,
      calories,
      fill: colorData[meal] || "",
    })
  );

  return NextResponse.json({ data: result });
};

export const POST = async (req: NextRequest) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { meal, calories, created_at } = body;

    // Validate the incoming data
    if (!meal || typeof meal !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'meal' field." },
        { status: 400 }
      );
    }

    if (!calories || typeof calories !== "number") {
      return NextResponse.json(
        { error: "Invalid or missing 'calories' field." },
        { status: 400 }
      );
    }

    const newEntry = {
      meal,
      calories,
      created_at: created_at || new Date().toISOString(), // Use provided or current timestamp
    };

    // Insert the new entry into the 'foodData' table
    const { data, error } = await supabase.from("foodData").insert(newEntry);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "Data inserted successfully!", data },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 } 
    );
  }
};
