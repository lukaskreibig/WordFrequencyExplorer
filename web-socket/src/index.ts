import http from "http";
import { Server, WebSocket } from "ws";
import express from "express";
import redisClient from "./redisClient";
import { sendDataOnChange } from "./wordCountMapHandler";

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  sendDataOnChange(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started`);

  process.on("SIGINT", () => {
    console.log("Shutting down server...");
    redisClient.disconnect();
    server.close(() => {
      process.exit(0);
    });
  });
});
