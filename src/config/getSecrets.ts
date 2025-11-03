import fs from 'fs'
import * as fPath from 'path'
import { parseConfig } from './helpers/parseConfig.ts'
import { SecretValidationError } from '#errors/config/SecretValidationError'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type InferConfig } from '#types/config/InferConfig'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'

const path = getTranslationPath(import.meta.url)

const readSecretFile = (secretName: string, basePath: string): string => {
  const filePath = fPath.resolve(basePath, secretName)

  try {
    const content = fs.readFileSync(filePath, 'utf8').trim()
    if (!content) throw new SecretValidationError(t(`${path}.empty_secret`, { secret: secretName }))
    return content
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new SecretValidationError(t(`${path}.missing_secret`, { secret: secretName }))
    }

    const reason = error instanceof Error ? error.message : String(error)
    throw new SecretValidationError(t(`${path}.read_failed`, { secret: secretName }), { reason })
  }
}

export interface SecretsConfigOptions {
  basePath?: string
}

export const getSecrets = <Schema extends ConfigSchema>(
  schema: Schema,
  options?: SecretsConfigOptions,
): Readonly<InferConfig<Schema>> => {
  const { basePath = '/run/secrets' } = options ?? {}

  const secrets = Object.fromEntries(
    Object.keys(schema.shape).map((key) => {
      const secretName = key.toLowerCase()
      const value = readSecretFile(secretName, basePath)
      return [key.toUpperCase(), value]
    }),
  )

  const validated = parseConfig(schema, secrets, { path, ErrorClass: SecretValidationError, label: 'secrets' })

  return Object.freeze(validated)
}
