import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { meal, calories, protein, fats, carbs, fiber, created_at, date } = body;

    // Validate the incoming data
    if (!meal || typeof meal !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'meal' field." },
        { status: 400 }
      );
    }

    if (!date || typeof date !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'date' field." },
        { status: 400 }
      );
    }

    const newEntry = {
      meal,
      calories: typeof calories === "number" ? calories : null,
      protein: typeof protein === "number" ? protein : null,
      fats: typeof fats === "number" ? fats : null,
      carbs: typeof carbs === "number" ? carbs : null,
      fiber: typeof fiber === "number" ? fiber : null,
      created_at: created_at || new Date().toISOString(), // Use provided or current timestamp
      date, // Include the selected date
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
