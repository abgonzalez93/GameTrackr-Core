import { format, transports, type Logger, createLogger as WinstonCreateLogger } from 'winston'
import { LOGGER } from '#constants/logger.constant'
import { NODE_ENV } from '#constants/nodeEnv.constant'
import { type LogLevel } from '#types/logger.type'

const { combine, timestamp, label, printf, colorize } = format

const consoleFormat = printf(({ level, message, label, timestamp }) => `[${timestamp}] [${label}] ${level}: ${message}`)

export interface LoggerOptions {
  label?: string
  level?: LogLevel
}

export const initWinston = (options: LoggerOptions = {}): Logger => {
  const { label: serviceLabel = LOGGER.DEFAULT_LABEL } = options
  const isDevelopment = process.env.NODE_ENV !== NODE_ENV.PRODUCTION

  return WinstonCreateLogger({
    level: isDevelopment ? 'debug' : 'info',
    format: combine(
      label({ label: serviceLabel }),
      timestamp({
        format: new Date().toLocaleString(LOGGER.TIMESTAMP.LOCALE, {
          timeZone: LOGGER.TIMESTAMP.TIMEZONE,
          hour12: false,
        }),
      }),
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
