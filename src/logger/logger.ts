import winston from 'winston'

export interface LoggerOptions {
  isDevelopment?: boolean
  label?: string
  level?: 'info' | 'debug' | 'warn' | 'error'
}

const { combine, timestamp, label, printf, colorize } = winston.format

/**
 * Custom format for pretty-printing logs to the console in development mode.
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`
})

/**
 * Returns the current date and time as a localized string
 * in the 'es-ES' format and 'Europe/Madrid' timezone.
 */
const getTimestamp = () =>
  new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour12: false,
  })

/**
 * Creates a new Winston logger instance with the provided options.
 *
 * @param options - Configuration options for the logger.
 * @returns A new Winston logger instance (not globally stored).
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
