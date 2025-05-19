import path from "path";
import winston from "winston";

export const getLogger = (logFile: string) =>
  winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`;
      })
    ),
    transports: [
      // Log to a file
      new winston.transports.File({
        filename: path.join(process.cwd(), "logs", logFile),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      // Log to stderr with colors for console viewing
      new winston.transports.Console({
        stderrLevels: ["error", "warn", "info", "debug"],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ],
  });
