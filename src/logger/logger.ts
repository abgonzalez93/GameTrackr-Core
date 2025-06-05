import { getServerConf } from '@config/index'
import winston from 'winston'

const { combine, timestamp, label, printf, colorize } = winston.format

/**
 * Custom format for console output.
 * Displays timestamp, label, log level, and message in a readable format.
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`
})

let loggerInstance: winston.Logger | null = null

/**
 * Returns a singleton instance of Winston logger.
 * Lazy-initialized to prevent premature evaluation of environment variables.
 *
 * @returns A configured Winston logger instance.
 *
 * @module logger
 */
export const logger = (): winston.Logger => {
  if (loggerInstance) return loggerInstance

  const { IS_PRODUCTION } = getServerConf()

  loggerInstance = winston.createLogger({
    level: 'info',
    format: combine(
      label({ label: 'TrackPlay' }),
      timestamp({ format: 'HH:mm:ss' }),
      IS_PRODUCTION ? winston.format.json() : combine(colorize(), consoleFormat),
    ),
    transports: [
      new winston.transports.Console(),
      ...(IS_PRODUCTION
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
