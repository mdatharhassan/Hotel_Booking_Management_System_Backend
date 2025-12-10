import cors from "cors";
import express from "express";
import dotenv from "dotenv";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import cookieParser from "cookie-parser";
// import authRouter from "../routes/auth.js";
// import cabinRouter from "../routes/cabin.js";
// import bookingRouter from "../routes/booking.js";
// import connectDB from "../config/mongoDB.js";
// import settingRouter from "../routes/settings.js";
// import module from "module";
// import mongoose from "mongoose";
import serverless from "serverless-http";

// Load environment variables from .env file
// dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URL;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.get("/favicon.ico", (req, res) => {
//   res.status(204).end();
// });

// Cors configuration
const corsOptions = {
  origin: ["https://hotel-booking-management-system-fro.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// Middleware to parse JSON requests
app.use(cors(corsOptions));
app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Innsight Admin Server is running");
});
// API Routes
// app.use("/api/auth", authRouter);
// app.use("/api/cabins", cabinRouter);
// // app.use("api/uploads", express.static("uploads"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/bookings", bookingRouter);
// app.use("/api/settings", settingRouter);

// this is for localhost
// connectDB(process.env.MONGO_URL);
// app.listen(PORT, () => {
//   console.log(`Server running locally on port ${PORT}`);
// });

//this is for vercel
// Middleware that ensures DB is connected before handling request
// app.use(async (req, res, next) => {
//   await connectDB(MONGO_URI);
//   next();
// });
// connectDB(MONGO_URI);
// let dbConnected = false;

// app.use(async (req, res, next) => {
//   if (!dbConnected) {
//     await connectDB(MONGO_URI);
//     dbConnected = true;
//   }
//   next();
// });
// // Start the server
// Start server when running locally (avoid starting listener in production/serverless)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running locally on port ${PORT}`);
//   });
// }

// Export handler for Vercel (named and default export)
const handler = serverless(app);
export default handler;
