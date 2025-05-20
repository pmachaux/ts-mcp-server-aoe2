import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Logger } from "winston";
import { z } from "zod";
import { aoe2Units } from "../../models/unit-stats.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const getToolUnitStatsLookup = (server: McpServer, logger: Logger) => {
  server.tool(
    "unitStatsLookup",
    "Retrieves comprehensive statistics for specific units including attack values, armor classes, movement speed, range, and special abilities. Optimal for queries about exact unit specifications and capabilities.",
    {
      unitName: z.string().min(1).describe("Name of the unit to look up"),
      includeCivilizationBonuses: z
        .boolean()
        .optional()
        .describe("Whether to include civilization-specific bonuses"),
    },
    ({ unitName, includeCivilizationBonuses }): CallToolResult => {
      logger.info(`Looking up unit stats for ${unitName}`);
      const match = aoe2Units.find((unit) => unit.unitName === unitName);
      const text = `The unit ${unitName} has the following stats: ${JSON.stringify(
        match
      )}`;
      logger.info(`Got info for ${unitName}`, text);
      return {
        content: [
          {
            type: "text",
            text,
          },
        ],
      } satisfies CallToolResult;
    }
  );
};
