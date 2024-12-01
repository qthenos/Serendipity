import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// example path: /api/workout-data?date=2024-11-20

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  // Validate the 'date' query parameter
  if (!date || isNaN(new Date(date).getTime())) {
    return NextResponse.json(
      { error: "A valid 'date' query parameter is required" },
      { status: 400 }
    );
  }

  // Parse the date and set to UTC midnight
  const startDate = new Date(date);
  startDate.setUTCHours(0, 0, 0, 0);

  // Set the end date to the end of the day (23:59:59.999 UTC)
  const endDate = new Date(startDate);
  endDate.setUTCHours(23, 59, 59, 999);

  console.log("Received date:", date);
  console.log("Start Date:", startDate.toISOString());
  console.log("End Date:", endDate.toISOString());

  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from("exerciseData")
      .select("*")
      .gte("start_date", startDate.toISOString())  // Start of the day
      .lt("start_date", endDate.toISOString());    // End of the day

    console.log("Supabase query response:", { data, error });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No data found for the given date" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);

    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
};

  
