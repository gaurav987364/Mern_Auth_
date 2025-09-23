import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// import routes
import userRoute from "./routes/userRoute.js";
//utils
import { connectDB } from "./config/db.js";

//import .env items to whole application
dotenv.config();

//connect to port
const port = process.env.PORT || 4000;

//connect to MongoDB database
connectDB();

//create server instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//serve res to routes
app.use("/api/users", userRoute);
//listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
