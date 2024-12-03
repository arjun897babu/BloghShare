import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw Error("invalid mongoDB URI");
}

export const connectDB = async (): Promise<void> => {
  try {
    const con = await mongoose.connect(MONGO_URI);
    console.log(`mongo db is connected successfully : ${con.connection.host}`);
  } catch (error) {
    throw error;
  }
};
