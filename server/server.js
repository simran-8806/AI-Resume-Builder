import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => res.send("Server is live...🚀"));

// Make sure the database is reachable before any API handler runs. If the
// connection fails the client gets a clear 503 right away rather than a
// 10-second "buffering timed out" error from Mongoose.
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database unavailable:", error.message);
    return res.status(503).json({
      message: "Database connection failed. Please try again in a moment.",
    });
  }
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Warm up the connection on boot (non-fatal: requests will retry on demand).
connectDB().catch((error) => {
  console.error("Initial MongoDB connection failed:", error.message);
});

// Start the server (skipped on Vercel, which imports the exported app instead)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT} => http://localhost:${PORT} 🍽️`
    );
  });
}

export default app;
