import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photoRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/test", (req, res) => res.json({ message: "Backend is working ✅" }));

app.use("/api/photos", photoRoutes);

// last middleware
app.use(errorHandler);

export default app;