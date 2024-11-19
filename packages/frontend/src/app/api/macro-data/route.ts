import axios from 'axios'; 
import * as dotenv from 'dotenv';

dotenv.config({ path: '/Users/dakshesh/Serendipity/packages/frontend/.env' });

console.log("EDAMAM_APP_ID:", process.env.EDAMAM_APP_ID);
console.log("EDAMAM_APP_KEY:", process.env.EDAMAM_APP_KEY);

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

const url = 'https://api.edamam.com/api/food-database/v2/parser';
console.log(`API Request URL: ${url}?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=apple`);


if (!EDAMAM_APP_ID || !EDAMAM_APP_KEY) {
    throw new Error("Missing API credentials. Please check your .env file.");
}

async function testAPI(query: string) {
    const url = 'https://api.edamam.com/api/food-database/v2/parser';

    try {
        const response = await axios.get(url, {
            params: {
                app_id: EDAMAM_APP_ID,
                app_key: EDAMAM_APP_KEY,
                ingr: query,
            },
        });

        console.log("Response Data:", response.data);
        console.log("First Item:", response.data.hints[0]?.food);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error making API request:", error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
}

testAPI('banana');
