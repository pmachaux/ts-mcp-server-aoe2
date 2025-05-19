import { Anthropic } from "@anthropic-ai/sdk";
import { Tool } from "@anthropic-ai/sdk/resources/messages/messages.mjs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from "dotenv";
import type { Logger } from "winston";

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

export class MCPClient {
  private readonly mcp: Client;
  private readonly anthropic: Anthropic;
  private transport: StdioClientTransport | null = null;
  private tools: Tool[] = [];

  constructor(private readonly logger: Logger) {
    this.anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async cleanup() {
    await this.mcp.close();
  }

  async connectToServer(serverScriptPath: string) {
    try {
      this.transport = new StdioClientTransport({
        command: process.execPath,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport);

      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
      this.logger.info(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name)
      );
    } catch (e) {
      this.logger.error("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  async processQuery(query: string) {
    return "I reply to you in a very smart way";
  }
}
