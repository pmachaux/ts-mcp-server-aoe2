import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Logger } from "winston";
import { z } from "zod";

export const getToolUnitStatsLookup = (server: McpServer, logger: Logger) => {
  server.tool(
    "unitStatsLookup",
    "Retrieves comprehensive statistics for specific units including attack values, armor classes, movement speed, range, and special abilities. Optimal for queries about exact unit specifications and capabilities.",
    {
      unitName: z.string().min(1).describe("Name of the unit to look up"),
      includeCivilizationBonuses: z
        .boolean()
        .describe("Whether to include civilization-specific bonuses"),
    },
    async ({ unitName, includeCivilizationBonuses }) => {
      // TODO: Implement this
      return {} as any;
    }
  );
};
