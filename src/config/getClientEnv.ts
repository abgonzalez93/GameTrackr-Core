import { type GetEnvOptions } from './GetEnvOptions.ts'
import { buildEnvConfig } from './helpers/buildEnvConfig.ts'
import { normalizeEnvValues } from './helpers/normalizeEnvValues.ts'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type ConfigValues } from '#types/config/ConfigValues'
import { type InferConfig } from '#types/config/InferConfig'

const filterEnvByPrefix = (source: ConfigValues, prefix: string): ConfigValues =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key.startsWith(prefix)))

export interface GetClientEnvOptions extends GetEnvOptions {
  prefix?: string
}

export const getClientEnv = <Client extends ConfigSchema>(
  schema: Client,
  options?: GetClientEnvOptions,
): Readonly<InferConfig<Client>> => {
  const { runtimeEnv = process.env, emptyStringAsUndefined = true, prefix = 'NEXT_PUBLIC_' } = options ?? {}

  const env = normalizeEnvValues(runtimeEnv, emptyStringAsUndefined)
  const clientEnv = filterEnvByPrefix(env, prefix)
  const validated = buildEnvConfig(schema, clientEnv, 'client')

  return Object.freeze(validated)
}
