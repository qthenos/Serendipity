import { NextResponse } from "next/server";

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

export const GET = async (req: Request) => {
    try {
        // Check environment variables inside the handler
        if (!EDAMAM_APP_ID || !EDAMAM_APP_KEY) {
            return NextResponse.json(
                { error: "Missing API credentials. Please check your .env file." },
                { status: 500 }
            );
        }

        // Extract the query parameter
        const url = new URL(req.url);
        const query = url.searchParams.get("query");

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter 'query' is required" },
                { status: 400 }
            );
        }

        // Call the Edamam API using fetch
        const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData || "An error occurred with the API" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Return the API response
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
};
