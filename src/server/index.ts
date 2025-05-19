import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getMcpServer } from "./mcp-server.js";
import { getLogger } from "../utils/logger.js";

const logger = getLogger("mcp-server.log");

async function main() {
  const transport = new StdioServerTransport();

  const server = getMcpServer(logger);
  await server.connect(transport);
  logger.info("AoE2 Assistant MCP Server running on stdio");
}

main().catch((error) => {
  logger.error("Fatal error in main():", error);
  process.exit(1);
});
