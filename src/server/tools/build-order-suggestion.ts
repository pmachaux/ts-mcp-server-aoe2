import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Logger } from "winston";
import { z } from "zod";

export const getToolBuildOrderSuggestion = (
  server: McpServer,
  logger: Logger
) => {
  server.tool(
    "buildOrderSuggestion",
    "Recommends a build order for a given civilization, map and/or opening name. Will also provide a follow up build order if requested or a counter build order if requested.",
    {
      mapName: z.string().min(1).describe("Name of the map"),
      openingName: z.string().min(1).describe("Name of the opening"),
      includeFollowUp: z
        .boolean()
        .describe("Whether to include a follow up build order"),
      includeCounter: z
        .boolean()
        .describe("Whether to include a counter build order"),
    },
    async ({ mapName, openingName, includeFollowUp, includeCounter }) => {
      // TODO: Implement this
      return {} as any;
    }
  );
};
