import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.js";
import cabinRouter from "../routes/cabin.js";
import bookingRouter from "../routes/booking.js";
import connectDB from "../config/mongoDB.js";
import settingRouter from "../routes/settings.js";
import module from "module";
import mongoose from "mongoose";
import serverless from "serverless-http";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Cors configuration
const corsOptions = {
  origin: "https://hotel-booking-management-system-fro.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("Innsight Admin Server is running");
});

// Middleware to parse JSON requests
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   if (!isConnected) {
//     connecttoMongoDB();
//   }
//   next();
// });

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/cabins", cabinRouter);
// app.use("api/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/bookings", bookingRouter);
app.use("/api/settings", settingRouter);

// // Connect to MongoDB
// Middleware that ensures DB is connected before handling request
app.use(async (req, res, next) => {
  try {
    await connectDB(MONGO_URL);
    next();
  } catch (err) {
    console.log(err);
  }
});

// // Start the server
// Start server when running locally (avoid starting listener in production/serverless)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export handler for Vercel (named and default export)
export const handler = serverless(app);
export default handler;
