import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let date = searchParams.get("date");

        if (!date) {
            const today = new Date();
            date = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        }

        const supabase = await createClient();

        const { data, error } = await supabase.rpc('get_macro_data').eq("date", date);
        return NextResponse.json({ date, data });
    }
    catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
};
