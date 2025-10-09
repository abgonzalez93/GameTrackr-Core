import { format, transports, type Logger, createLogger as WinstonCreateLogger } from 'winston'
import { type LoggerOptions } from '#types/logger/LoggerOptions'

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
  new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour12: false,
  })

/**
 * **Creates a configured Winston logger instance**
 *
 * Factory function for constructing an isolated {@link Logger}.
 *
 * ### Responsibilities
 * - Configure per-service loggers with consistent formatting.
 * - Provide colorized console output in development.
 * - Write structured JSON logs to file in production.
 * - Capture uncaught exceptions and promise rejections automatically.
 *
 * ### Notes
 * - This logger is **not global**; each service or module should instantiate
 *   its own labeled logger.
 * - Log files are written to:
 *   - `logs/error.log` — errors only
 *   - `logs/combined.log` — all logs
 *   - `logs/exceptions.log` — uncaught exceptions
 *   - `logs/rejections.log` — unhandled rejections
 *
 * @param options - Optional {@link LoggerOptions} to customize behavior.
 * @returns A fully configured {@link Logger} instance.
 *
 */
export const createLogger = (options: LoggerOptions = {}): Logger => {
  const { isDevelopment = false, label: serviceLabel = 'TrackPlay', level = 'info' } = options

  return WinstonCreateLogger({
    level,
    format: combine(
      label({ label: serviceLabel }),
      timestamp({ format: getTimestamp }),
      isDevelopment ? combine(colorize(), consoleFormat) : format.json(),
    ),
    transports: [
      new transports.Console(),
      ...(!isDevelopment
        ? [
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined.log' }),
          ]
        : []),
    ],
    exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
    exitOnError: false,
  })
}
