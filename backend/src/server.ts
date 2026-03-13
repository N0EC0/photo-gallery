import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
    // Read required DB connection string from .env and fail if missing
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env");

    // Establish MongoDB connection before anything
    await connectDB(MONGODB_URI);

    // Start Express server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Log startup failures and exit non-zero
start().catch((err) => {
    console.error("Startup error:", err);
    process.exit(1);
});