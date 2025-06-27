import { TrackPlayError } from '@errors/index'
import { getI18n } from '@i18n/index'
import winston from 'winston'

const i18n = getI18n()

let loggerInstance: winston.Logger | null = null

const { combine, timestamp, label, printf, colorize } = winston.format

/**
 * Custom format for pretty-printing logs to the console in development mode.
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`
})

export interface LoggerOptions {
  isDevelopment?: boolean
  label?: string
  level?: 'info' | 'debug' | 'warn' | 'error'
}

/**
 * Initializes a singleton Winston logger instance with the provided options.
 *
 * This function should be called once per service (e.g., in `main.ts`).
 * Subsequent calls will return the same instance.
 *
 * In development mode (`isDevelopment: true`), logs will be pretty-printed in color to the console.
 * Otherwise, logs are formatted as JSON and stored in files.
 *
 * @param options - Configuration options for the logger
 * @returns The configured Winston logger instance
 */
export const createLogger = (options: LoggerOptions = {}): winston.Logger => {
  if (loggerInstance) return loggerInstance

  const { isDevelopment = false, label: serviceLabel = 'TrackPlay', level = 'info' } = options

  loggerInstance = winston.createLogger({
    level,
    format: combine(
      label({ label: serviceLabel }),
      timestamp({
        format: () =>
          new Date().toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
            hour12: false,
          }),
      }),
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

  return loggerInstance
}

/**
 * Retrieves the existing singleton Winston logger instance.
 *
 * This should only be used after calling `createLogger()` during service initialization.
 *
 * @returns The previously created Winston logger instance
 * @throws Error if `createLogger()` has not been called yet
 */
export const getLogger = (): winston.Logger => {
  if (!loggerInstance) throw new TrackPlayError(i18n.t('core.logger.logger.uninitialized_logger'))
  return loggerInstance
}
