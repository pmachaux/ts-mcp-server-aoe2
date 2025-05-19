import { getLogger } from "../utils/logger.js";
import express from "express";
import { MCPClient } from "./mcp-client.js";
import path from "path";

const logger = getLogger("mcp-client.log");
const mcpClient = new MCPClient(logger);
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { query } = req.body;
  const response = await mcpClient.processQuery(query);
  res.json({ response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  try {
    console.log(path.join(process.cwd(), "./dist/server/index.js"));
    await mcpClient.connectToServer(
      path.join(process.cwd(), "./dist/server/index.js")
    );
  } catch (e) {
    logger.error("Failed to connect to MCP server: ", e);
    await mcpClient.cleanup();
    process.exit(1);
  }
});
