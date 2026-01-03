import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectDB } from "./config/DB";
import userRoute from "./router/user.route";
const app = express();
const PORT = 4000;

// parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("server running");
});

app.use(userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
