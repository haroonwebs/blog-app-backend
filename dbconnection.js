import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
};
