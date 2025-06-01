import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
// Create express app and http server
const app = express();
const server = http.createServer(app);
// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/user", userRouter);
const PORT = 5000;
await connectDB();
server.listen(PORT, () => console.log("Server is running on PORT:" + PORT));
export default server;
