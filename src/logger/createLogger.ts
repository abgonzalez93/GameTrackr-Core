import { format, transports, type Logger, createLogger as WinstonCreateLogger } from 'winston'
import { LOGGER } from '#constants/logger'
import { NODE_ENV } from '#constants/nodeEnv'
import { type LogLevel } from '#types/logger/LogLevel'

/**
 * **LoggerOptions**
 *
 * Configuration parameters for the **Winston-based logger** used across TrackPlay services.
 * Primarily consumed by {@link createLogger} and {@link bootstrap} to define
 * logging verbosity, output format, and contextual labeling.
 *
 * ### Responsibilities
 * - Control log verbosity (`level`) and output format (JSON or colorized).
 * - Reflect runtime mode (`isDevelopment`) for dynamic formatting behavior.
 * - Attach a contextual label to each log entry (e.g., `"TrackPlay-Auth"`).
 *
 * ### Notes
 * - In **development**, logs are colorized and human-readable.
 * - In **production**, logs are serialized as JSON for aggregation tools (e.g., Loki, ELK).
 * - Passed during infrastructure setup to unify logging behavior across all microservices.
 *
 */
interface LoggerOptions {
  /**
   * Optional label applied to every log entry.
   *
   * Commonly set to the service name (e.g., `"TrackPlay-Catalog"`),
   * allowing easy identification in multi-service logs.
   */
  label?: string

  /**
   * Minimum log level to include in the output stream.
   *
   * - `"debug"` — Detailed development traces.
   * - `"info"` — General operational events.
   * - `"warn"` — Recoverable or non-critical warnings.
   * - `"error"` — Critical failures or unexpected crashes.
   *
   * @default "info"
   */
  level?: LogLevel
}

const { combine, timestamp, label, printf, colorize } = format

/**
 * **Custom console format**
 *
 * Defines a simple, readable layout for log entries in development mode.
 * Each log line includes a timestamp, service label, level, and message.
 *
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => `[${timestamp}] [${label}] ${level}: ${message}`)

/**
 * **Generates a localized timestamp**
 *
 * Produces the current date and time formatted for the `es-ES` locale
 * and the `Europe/Madrid` timezone.
 *
 * @returns A timestamp string (e.g. `"03/10/2025, 12:41:23"`).
 */
const getTimestamp = (): string =>
  new Date().toLocaleString(LOGGER.TIMESTAMP.LOCALE, {
    timeZone: LOGGER.TIMESTAMP.TIMEZONE,
    hour12: false,
  })

/**
 * **createLogger**
 *
 * Factory function for creating a configured Winston logger.
 *
 * ### Responsibilities
 * - Provide consistent, labeled, and timestamped logging across services.
 * - Adapt output format depending on the environment:
 *   - **Development:** Human-readable, colorized console output.
 *   - **Production:** Structured JSON for log aggregation.
 * - Handle unhandled rejections and uncaught exceptions gracefully.
 *
 * @param options - Configuration options controlling log format, verbosity, and labeling.
 * @returns A fully configured Winston {@link Logger} instance.
 */
export const createLogger = (options: LoggerOptions = {}): Logger => {
  const { label: serviceLabel = LOGGER.DEFAULT_LABEL } = options
  const isDevelopment = process.env.NODE_ENV !== NODE_ENV.PRODUCTION

  return WinstonCreateLogger({
    level: isDevelopment ? 'debug' : 'info',
    format: combine(
      label({ label: serviceLabel }),
      timestamp({ format: getTimestamp }),
      isDevelopment ? combine(colorize(), consoleFormat) : format.json(),
    ),
    transports: [
      new transports.Console({
        stderrLevels: ['error', 'warn'],
      }),
    ],
    exceptionHandlers: [new transports.Console()],
    rejectionHandlers: [new transports.Console()],
    exitOnError: false,
  })
}
