import axios from "axios";
import { Server } from "ws";
import WebSocket from "ws";
import { createWordCountMap } from "./wordCounter";
import redisClient from "./redisClient";

export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(
      "https://www.thekey.academy/wp-json/wp/v2/posts"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const broadcastWordCountMap = (wss: Server, wordCountMap: Record<string, number>) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(wordCountMap));
    }
  });
};

const isEqual = (map1: Record<string, number>, map2: Record<string, number>): boolean => {
  const keys1 = Object.keys(map1);
  const keys2 = Object.keys(map2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (map1[key] !== map2[key]) {
      return false;
    }
  }

  return true;
};

export const fetchBlogPostsPeriodically = (wss: Server) => {
  let previousWordCountMap: Record<string, number> = {};

  const processBlogPosts = async () => {
    const blogPosts = await fetchBlogPosts();
    const wordCountMap = createWordCountMap(blogPosts);

    if (!isEqual(previousWordCountMap, wordCountMap)) {
      console.log("global update - new data recieved")
      broadcastWordCountMap(wss, wordCountMap);
      await redisClient.set("wordCountMap", JSON.stringify(wordCountMap));
      previousWordCountMap = wordCountMap;
    } 
  };

  wss.on("connection", async (ws) => {
    console.log("Send the lastWordCountMap to Client");

    const cachedWordCountMap = await redisClient.get("wordCountMap");
    if (cachedWordCountMap) {
      ws.send(cachedWordCountMap);
    }

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  processBlogPosts();
  setInterval(processBlogPosts, 10000);
};
