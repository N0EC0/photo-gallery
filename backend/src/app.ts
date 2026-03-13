import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photoRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Allow requests from the local Vite dev server
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Photo API routes
app.use("/api/photos", photoRoutes);

// Error handling must be last
app.use(errorHandler);

export default app;