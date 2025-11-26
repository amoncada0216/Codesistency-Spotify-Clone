import { connectDb } from "./lib/ds.js";
import { clerkMiddleware } from '@clerk/express';

import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";

import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import songsRoutes from "./routes/songsRoute.js";
import albumRoutes from "./routes/albumRoute.js";
import statsRoutes from "./routes/statsRoute.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // To parse req.body
app.use(clerkMiddleware()); // This will add auth to req obj => req.auth
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10mb max file size
    }
}));



app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message })
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDb();
});