import { NextResponse } from "next/server";
import axios from "axios";

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

if (!EDAMAM_APP_ID || !EDAMAM_APP_KEY) {
    throw new Error("Missing API credentials. Please check your .env file.");
}

export const POST = async (req: Request) => {
    try {
        const { query } = await req.json(); // Parse the JSON body

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter 'query' is required" },
                { status: 400 }
            );
        }

        const url = "https://api.edamam.com/api/food-database/v2/parser";

        const response = await axios.get(url, {
            params: {
                app_id: EDAMAM_APP_ID,
                app_key: EDAMAM_APP_KEY,
                ingr: query,
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        console.error("Error in POST /api/food-data:", error.message);

        if (error.response) {
            return NextResponse.json(
                { error: error.response.data },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
};
