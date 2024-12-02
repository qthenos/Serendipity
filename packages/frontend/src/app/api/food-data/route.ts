import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
};
