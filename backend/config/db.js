import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOOSE_URI, {
        dbName: "AuthStore",
      })
      .then(() => {
        console.log("MongoDB Connected");
      });
  } catch (error) {
    console.error(`Failed to connect ${error.message}`);
    process.exit(1);
  }
};
