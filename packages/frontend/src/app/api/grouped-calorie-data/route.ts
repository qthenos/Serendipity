import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";


export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0];
  
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_grouped_calorie_data');

  if (error) {
    return NextResponse.json({ error: error.message, date: date}, { status: 500 });
  }

  return NextResponse.json({data: data });
};
