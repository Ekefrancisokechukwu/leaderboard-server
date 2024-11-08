import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
import app from "./app";
const server = http.createServer(app);
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: { origin: "*" },
});

const start = async () => {
  await connectDB(process.env.MONGO_URI as string);
  server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
  io.on("connection", (socket) => console.log("a user connected"));
};

start();
