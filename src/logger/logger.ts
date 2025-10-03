import winston from 'winston'

export interface LoggerOptions {
  /**
   * Whether the service is running in development mode.
   * Enables colored and human-readable console output when `true`.
   */
  isDevelopment?: boolean

  /**
   * Optional label applied to each log entry (e.g., service name).
   */
  label?: string

  /**
   * Minimum log level to output.
   *
   * - `"debug"` → verbose development info
   * - `"info"` → general operational messages
   * - `"warn"` → recoverable issues
   * - `"error"` → critical failures
   */
  level?: 'info' | 'debug' | 'warn' | 'error'
}

const { combine, timestamp, label, printf, colorize } = winston.format

/**
 * **Custom console format**
 *
 * Defines a simple, readable layout for log entries in development mode.
 * Each log line includes a timestamp, service label, level, and message.
 *
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`
})

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
 * Factory function for constructing an isolated {@link winston.Logger}.
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
 * @returns A fully configured {@link winston.Logger} instance.
 *
 */
export const createLogger = (options: LoggerOptions = {}): winston.Logger => {
  const { isDevelopment = false, label: serviceLabel = 'TrackPlay', level = 'info' } = options

  return winston.createLogger({
    level,
    format: combine(
      label({ label: serviceLabel }),
      timestamp({ format: getTimestamp }),
      isDevelopment ? combine(colorize(), consoleFormat) : winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      ...(!isDevelopment
        ? [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
          ]
        : []),
    ],
    exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
    exitOnError: false,
  })
}
