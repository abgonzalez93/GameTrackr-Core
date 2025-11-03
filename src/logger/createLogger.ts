import { format, transports, type Logger, createLogger as WinstonCreateLogger } from 'winston'
import { LOGGER } from '#constants/logger'
import { NODE_ENV } from '#constants/nodeEnv'
import { type LogLevel } from '#types/logger/LogLevel'

export interface LoggerOptions {
  label?: string
  level?: LogLevel
}

const { combine, timestamp, label, printf, colorize } = format

const getTimestamp = (): string =>
  new Date().toLocaleString(LOGGER.TIMESTAMP.LOCALE, {
    timeZone: LOGGER.TIMESTAMP.TIMEZONE,
    hour12: false,
  })

const consoleFormat = printf(({ level, message, label, timestamp }) => `[${timestamp}] [${label}] ${level}: ${message}`)

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
