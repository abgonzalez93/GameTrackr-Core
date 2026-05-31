import { format, transports, type Logger, type LoggerOptions as WinstonLoggerOptions, createLogger } from 'winston'
import { z } from 'zod'
import { createConsoleFormat } from './formatters/console.formatter.ts'
import { serializeErrorFields, jsonReplacer } from './serializers/error.serializer.ts'
import { LOGGER } from '#constants/logger.constant'
import { BaseServerEnvSchema } from '#schemas/config.schema'

export type LogLevel = (typeof LOGGER.LEVELS)[number]

type ServerEnv = Readonly<z.infer<typeof BaseServerEnvSchema>>

const { combine, timestamp, label, colorize, json, errors } = format

export interface LoggerOptions {
  label: string
  env: Pick<ServerEnv, 'ENVIRONMENT' | 'LOG_LEVEL'>
}

export const initWinston = (options: LoggerOptions): Logger => {
  const { label: serviceLabel, env } = options

  const isDevelopment = env.ENVIRONMENT === 'development'
  const level: LogLevel = isDevelopment ? 'debug' : env.LOG_LEVEL

  const config: WinstonLoggerOptions = {
    level,
    format: combine(
      label({ label: serviceLabel }),
      timestamp(),
      errors({ stack: true }),
      serializeErrorFields(),
      isDevelopment ? combine(colorize(), createConsoleFormat()) : json({ replacer: jsonReplacer }),
    ),
    transports: [
      new transports.Console({
        stderrLevels: ['error', 'warn'],
      }),
    ],
    exceptionHandlers: [new transports.Console()],
    rejectionHandlers: [new transports.Console()],
    exitOnError: false,
  }

  return createLogger(config)
}
