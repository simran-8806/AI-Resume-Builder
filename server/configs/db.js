import mongoose from "mongoose";

const DB_NAME = "resume-builder";

// Fail fast instead of silently queueing queries. Without this, every query
// issued while the database is unreachable hangs for 10 seconds and then
// rejects with "Operation `users.findOne()` buffering timed out after 10000ms".
mongoose.set("bufferCommands", false);

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully 🔗");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

// Cached across requests so a serverless function (e.g. Vercel) reuses one
// connection per warm instance instead of reconnecting on every call.
let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    // `dbName` selects the database regardless of how the URI is written, so
    // Atlas strings that end in "/?retryWrites=true&w=majority" keep working.
    connectionPromise = mongoose
      .connect(mongodbURI, {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 10000,
      })
      .then((instance) => instance.connection)
      .catch((error) => {
        // Reset so the next request retries instead of reusing a failed promise.
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDB;
