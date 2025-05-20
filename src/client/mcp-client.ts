import { Anthropic } from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources/index.js";
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
    const messages: MessageParam[] = [
      {
        role: "user",
        content: query,
      },
    ];

    const response = await this.anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 100,
      messages,
      tools: this.tools,
      system: `You are looking up information about Age of Empires 2.
    When a user asks a question, you rely only on the tools provided to you.
    You do not make up information or make assumptions.
    
    Available tools:
    ${this.tools
      .map((tool) => `- ${tool.name}: ${tool.description}`)
      .join("\n")}`,
    });

    const finalText = [];
    const toolResults = [];

    for (const content of response.content) {
      this.logger.info(`Content: ${JSON.stringify(content)}`);
      if (content.type === "text") {
        finalText.push(content.text);
      } else if (content.type === "tool_use") {
        const toolName = content.name;
        const toolArgs = content.input as { [x: string]: unknown } | undefined;

        const result = await this.mcp.callTool({
          name: toolName,
          arguments: toolArgs,
        });
        this.logger.info(`Tool result: ${JSON.stringify(result)}`);
        toolResults.push(result);

        messages.push({
          role: "user",
          content: result.content as string,
        });
        this.logger.info(
          `Messages back to anthropic: ${JSON.stringify(messages)}`
        );
        const response = await this.anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 100,
          messages,
        });
        this.logger.info(
          `Response from anthropic: ${JSON.stringify(response)}`
        );
        finalText.push(
          response.content[0].type === "text" ? response.content[0].text : ""
        );
      }
    }

    return finalText.join("\n");
  }
}
