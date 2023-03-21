import { redisClient } from "../redisClient/redisClient";
import { WebSocket } from "ws";

/**
 * Fetches the word count map from Redis.
 * @function fetchWordCountMap
 * @returns {Promise<Object|null>} The word count map or null if not found.
 */
export const fetchWordCountMap = async () => {
  const wordCountMap = await redisClient.get("wordCountMap");
  return wordCountMap ? JSON.parse(wordCountMap) : null;
};

/**
 * Compares two word count maps for equality.
 * @function isEqual
 * @param {Object} map1 - The first word count map.
 * @param {Object} map2 - The second word count map.
 * @returns {boolean} True if the maps are equal, false otherwise.
 */
export const isEqual = (map1: {}, map2: {}): boolean => {
  return JSON.stringify(map1) === JSON.stringify(map2);
};

/**
 * Sends updated word count map to clients when it changes.
 * @function sendDataOnChange
 * @param {WebSocket} ws - The WebSocket instance.
 */
export const sendDataOnChange = async (ws: WebSocket) => {
  let previousWordCountMap = await fetchWordCountMap();
  if (previousWordCountMap) {
    console.log("new data being sent through WebSocket")
    ws.send(JSON.stringify(previousWordCountMap));
  }

  setInterval(async () => {
    const currentWordCountMap = await fetchWordCountMap();
    if (!isEqual(previousWordCountMap, currentWordCountMap)) {
      ws.send(JSON.stringify(currentWordCountMap));
      previousWordCountMap = currentWordCountMap;
    }
  }, 5000);
};
