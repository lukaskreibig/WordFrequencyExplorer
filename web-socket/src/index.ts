import http from "http";
import WebSocket, { Server } from "ws";
import express from "express";
import redisClient from "./redisClient";

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

const fetchWordCountMap = async () => {
  const wordCountMap = await redisClient.get("wordCountMap");
  return wordCountMap ? JSON.parse(wordCountMap) : null;
};

wss.on("connection", async (ws) => {
  console.log("Client connected");

  const wordCountMap = await fetchWordCountMap();
  if (wordCountMap) {
    ws.send(JSON.stringify(wordCountMap));
  }

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started`);
});

// Gracefully shut down on SIGINT signal (Ctrl + C)
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  redisClient.disconnect();
  server.close(() => {
    process.exit(0);
  });
});
