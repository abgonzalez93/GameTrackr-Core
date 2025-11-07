import { buildEnvConfig, normalizeEnvValues } from './config.helpers.ts'
import type { ConfigSchema, ConfigValues, InferConfig } from '#types/config.type'

export interface GetEnvOptions {
  runtimeEnv?: ConfigValues
  emptyStringAsUndefined?: boolean
}

export const getServerEnv = <Server extends ConfigSchema>(
  schema: Server,
  options?: GetEnvOptions,
): Readonly<InferConfig<Server>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const validated = buildEnvConfig(schema, env, 'server')

  return Object.freeze(validated)
}

export interface GetClientEnvOptions extends GetEnvOptions {
  prefix?: string
}

export const getClientEnv = <Client extends ConfigSchema>(
  schema: Client,
  options?: GetClientEnvOptions,
): Readonly<InferConfig<Client>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true, prefix = 'NEXT_PUBLIC_' } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const clientEnv = Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith(prefix)))
  const validated = buildEnvConfig(schema, clientEnv, 'client')

  return Object.freeze(validated)
}
