import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { config } from "./config";
import logger from "./utils/logger";

interface GameJoinData {
  playerId: string;
  gameId?: string;
  playerName: string;
}

interface GameLeaveData {
  playerId: string;
  gameId: string;
}

interface HeartbeatData {
  playerId: string;
  gameId: string;
  timestamp: number;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // In production, replace with specific origins
    methods: ["GET", "POST"],
  },
});

// Basic health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on("connection", (socket: Socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Handle MCP specific events
  socket.on("game:join", (data: GameJoinData) => {
    logger.info(`Player joining game: ${JSON.stringify(data)}`);
    // TODO: Implement game joining logic
  });

  socket.on("game:leave", (data: GameLeaveData) => {
    logger.info(`Player leaving game: ${JSON.stringify(data)}`);
    // TODO: Implement game leaving logic
  });

  socket.on("game:heartbeat", (data: HeartbeatData) => {
    // TODO: Implement heartbeat logic
  });
});

// Start the server
httpServer.listen(config.port, () => {
  logger.info(`MCP Server running on port ${config.port}`);
  logger.info(`Environment: ${config.environment}`);
});
