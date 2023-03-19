import express from "express";
import { fetchBlogPostsPeriodically } from "./blogFetcher";
import { createWebSocketServer } from "./webSocket";
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const wss = createWebSocketServer(server);
fetchBlogPostsPeriodically(wss);
