import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("db connected");
  } catch (error) {
    console.log("Error in connecting to DB!");
  }
}
