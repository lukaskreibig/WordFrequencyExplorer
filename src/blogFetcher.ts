import axios from "axios";
import { Server } from "ws";
import WebSocket from "ws";
import { createWordCountMap } from "./wordCounter";

/**
 * Fetch blog posts from the specified API endpoint.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of blog posts.
 */

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

/**
 * Broadcast the word count map to all connected WebSocket clients.
 *
 * @param {Server} wss - The WebSocket server.
 * @param {Record<string, number>} wordCountMap - The word count map to broadcast.
 */

export const broadcastWordCountMap = (wss: Server, wordCountMap: Record<string, number>) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(wordCountMap));
    }
  });
};

/**
 * Compare two word count maps for equality.
 *
 * @param {Record<string, number>} map1 - The first word count map.
 * @param {Record<string, number>} map2 - The second word count map.
 * @returns {boolean} True if the maps are equal, false otherwise.
 */

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

/**
 * Fetch blog posts periodically and send the word count map to WebSocket clients
 * only if the data has changed since the last fetch.
 *
 * @param {Server} wss - The WebSocket server.
 */

export const fetchBlogPostsPeriodically = (wss: Server) => {
  let previousWordCountMap: Record<string, number> = {};

  const processBlogPosts = async () => {
    const blogPosts = await fetchBlogPosts();
    const wordCountMap = createWordCountMap(blogPosts);

    if (!isEqual(previousWordCountMap, wordCountMap)) {
      console.log("not equal, new data will be sent")
      broadcastWordCountMap(wss, wordCountMap);
      previousWordCountMap = wordCountMap;
    } else {console.log("equal data - no update will be sent")} 
  };

  processBlogPosts();
  setInterval(processBlogPosts, 10000);
};