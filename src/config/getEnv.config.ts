import { type ZodType, z } from 'zod'
import { ConfigurationError } from '#errors/infrastructure.error'
import type { ConfigSchema, ConfigValues } from '#types/config.type'
import { validateSchema } from '#utils/validate.util'

const normalizeEnvValues = (source: ConfigValues, emptyAsUndefined: boolean): ConfigValues => {
  const normalized: ConfigValues = {}

  for (const [key, value] of Object.entries(source)) {
    const val = typeof value === 'string' ? value.trim() : value
    if (val === undefined || (emptyAsUndefined && val === '')) continue
    normalized[key.toUpperCase()] = val
  }

  return normalized
}

export interface GetEnvOptions {
  runtimeEnv?: ConfigValues
  emptyStringAsUndefined?: boolean
}

export const getServerEnv = <Server extends ZodType>(
  schema: Server,
  options?: GetEnvOptions,
): Readonly<z.infer<Server>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const validated = validateSchema(schema, env, {
    message: 'Invalid server configuration',
    ErrorClass: ConfigurationError,
  })

  return Object.freeze(validated)
}

export const getCombinedServerEnv = <Base extends ConfigSchema, Extra extends ConfigSchema>(
  base: Base,
  extra: Extra,
  options?: GetEnvOptions,
): Readonly<z.infer<Base> & z.infer<Extra>> => {
  const combined = base.and(extra)
  return getServerEnv(combined, options)
}

export interface GetClientEnvOptions extends GetEnvOptions {
  prefix?: string
}

export const getClientEnv = <Client extends ZodType>(
  schema: Client,
  options: GetClientEnvOptions = {},
): Readonly<z.infer<Client>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true, prefix = 'NEXT_PUBLIC_' } = options

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const clientEnv = Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith(prefix)))
  const validated = validateSchema(schema, clientEnv, {
    message: 'Invalid client configuration',
    ErrorClass: ConfigurationError,
  })

  return Object.freeze(validated)
}
