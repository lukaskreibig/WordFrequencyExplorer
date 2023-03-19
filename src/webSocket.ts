import WebSocket, { Server } from "ws";
import { Server as HttpServer } from "http";

/**
 * Create a WebSocket server.
 *
 * @param {HttpServer} server - The HTTP server to attach the WebSocket server to.
 * @returns {Server} The created WebSocket server.
 */

export const createWebSocketServer = (server: HttpServer): Server => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};
