import express from "express";
import { createWebSocketServer } from "./webSocket";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Web Socket microservice is running on port ${PORT}`);
});

const wss = createWebSocketServer(server);

app.get("/word-count", async (req, res) => {
  try {
    const response = await axios.get("http://word-counter:8081/word-count");
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch word count" });
  }
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    ws.send(message);
  });
});
