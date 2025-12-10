import mongoose from "mongoose";

// const connectDB = async (mongoURL) => {
//   try {
//     await mongoose.connect(mongoURL);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//   }
// };
//export default connectDB;

let isConnected = false;

async function connectDB(mongoURL) {
  if (isConnected) return;

  await mongoose.connect(mongoURL);
  isConnected = true;

  console.log("MongoDB connected (once only)");
}

export default connectDB;

// mongoose.connect("mongoURL").then(() => {
//   console.log("MongoDB connected successfully");
// }).catch((error) => {
//   console.error("MongoDB connection error:", error.message);
// });
// mongoose.connection.on("connected", () => {
//   console.log("Mongoose connected to DB");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("Mongoose connection error:", err);
// });
// mongoose.connection.on("disconnected", () => {
//   console.log("Mongoose disconnected from DB");
// });
