import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/Users/dakshesh/Serendipity/packages/frontend/.env' });

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

if (!EDAMAM_APP_ID || !EDAMAM_APP_KEY) {
    throw new Error("Missing API credentials. Please check your .env file.");
}

const app = express();

app.use(bodyParser.json());

app.post('/api/food-data', async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.body;

        if (!query) {
            res.status(400).json({ error: "Query parameter 'query' is required" });
            return;
        }

        const url = 'https://api.edamam.com/api/food-database/v2/parser';

        const response = await axios.get(url, {
            params: {
                app_id: EDAMAM_APP_ID,
                app_key: EDAMAM_APP_KEY,
                ingr: query,
            },
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        console.error("Error in POST /api/food-data:", error.message);

        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: "An internal server error occurred" });
        }
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
