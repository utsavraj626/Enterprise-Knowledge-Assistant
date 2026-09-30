import "dotenv/config";
import cors from "cors";
import express from "express";
import pdfRoutes from "./routes/pdf.routes.js";
import documentRoutes from "./routes/document.routes.js";
import authRoutes from "./routes/auth.routes.js";
import historyRoutes from "./routes/history.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { connectDB } from "./services/db.service.js";


const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));


app.use("/api/pdf", pdfRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PDF Q&A Backend is running"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();