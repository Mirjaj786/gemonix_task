import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("database con......");
  } catch (error) {
    console.error(" db con... faild");
    process.exit(1);
  }
};
