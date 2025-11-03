import { type GetEnvOptions } from './GetEnvOptions.ts'
import { buildEnvConfig } from './helpers/buildEnvConfig.ts'
import { normalizeEnvValues } from './helpers/normalizeEnvValues.ts'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type InferConfig } from '#types/config/InferConfig'

export const getServerEnv = <Server extends ConfigSchema>(
  schema: Server,
  options?: GetEnvOptions,
): Readonly<InferConfig<Server>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const validated = buildEnvConfig(schema, env, 'server')

  return Object.freeze(validated)
}
