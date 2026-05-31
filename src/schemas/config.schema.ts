import { z } from 'zod'
import { ENVIRONMENT } from '#constants/environment.constant'
import { LOGGER } from '#constants/logger.constant'

const EnvironmentSchema = z
  .enum(ENVIRONMENT.STAGES, { error: 'Environment must be one of: ' + ENVIRONMENT.STAGES.join(', ') })
  .default(ENVIRONMENT.DEFAULT_STAGE)

const LogLevelSchema = z
  .enum(LOGGER.LEVELS, { error: 'Log level must be one of: ' + LOGGER.LEVELS.join(', ') })
  .default(LOGGER.DEFAULT_LEVEL)

const HostSchema = z.union([z.literal('localhost'), z.ipv4({ error: 'HOST must be a valid IPv4 address' })])

const PortSchema = z.coerce
  .number({ error: 'PORT must be a number' })
  .int({ error: 'PORT must be an integer' })
  .positive({ error: 'PORT must be a positive number' })
  .max(65535, { error: 'PORT must be less than or equal to 65535' })

const CorsOriginsSchema = z
  .string({ error: 'CORS_ORIGINS must be a string' })
  .min(1, { error: 'CORS_ORIGINS cannot be empty' })
  .transform((val) => val.split(',').map((origin) => origin.trim()))

export const BaseServerEnvSchema = z.object({
  ENVIRONMENT: EnvironmentSchema,
  LOG_LEVEL: LogLevelSchema,
  HOST: HostSchema,
  PORT: PortSchema,
  CORS_ORIGINS: CorsOriginsSchema,
})

export const EmptySchema = z.object({})
