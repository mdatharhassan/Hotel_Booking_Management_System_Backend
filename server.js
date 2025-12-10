import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import cabinRouter from "./routes/cabin.js";
import bookingRouter from "./routes/booking.js";
import connectDB from "./config/mongoDB.js";
import settingRouter from "./routes/settings.js";
import module from "module";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Cors configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
// connectDB(MONGO_URL);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// let isConnected = false;
// async function connecttoMongoDB() {
//   try {
//     await mongoose.connectDB(MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongDB:", error);
//   }
// }
// module.exports = app;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongDB Connection error", err));

module.exports = app;
