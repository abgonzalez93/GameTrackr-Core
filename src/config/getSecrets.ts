import fs from 'fs'
import * as fPath from 'path'
import { parseConfig } from './helpers/parseConfig.ts'
import { SecretValidationError } from '#errors/config/SecretValidationError'
import { type ConfigSchema } from '#types/config/ConfigSchema'
import { type InferConfig } from '#types/config/InferConfig'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'

const path = getTranslationPath(import.meta.url)

/**
 * Reads and validates the contents of a secret file from the filesystem.
 *
 * ### Responsibilities
 * - Resolve the absolute path of the secret file under the configured base path.
 * - Read and trim the file contents.
 * - Validate that the secret is non-empty.
 * - Throw a localized {@link SecretValidationError} if the secret is missing or invalid.
 *
 * @param secretName - Name of the secret file (key in the schema).
 * @param basePath - Directory path where secrets are stored (default: `/run/secrets`).
 * @returns The trimmed secret value.
 * @throws {SecretValidationError} When the file is missing, empty, or unreadable.
 */
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

/**
 * **SecretsConfigOptions**
 *
 * Configuration options for {@link getSecrets}.
 *
 * Allows customization of where secret files are loaded from
 * (defaults to `/run/secrets` for Docker/Kubernetes compatibility).
 *
 * @property basePath - Directory where secret files are stored.
 */
export interface SecretsConfigOptions {
  /**
   * Directory path where secrets are located.
   *
   * @default "/run/secrets"
   */
  basePath?: string
}

/**
 * **getSecrets**
 *
 * Factory utility that loads, validates, and parses service secrets from the filesystem.
 *
 * It enforces a strongly typed, Zod-validated structure defined by a {@link ConfigSchema},
 * ensuring that all required secrets exist and contain valid (non-empty) values.
 *
 * ### Responsibilities
 * - Read secret files from disk using the provided schema keys.
 * - Validate that each file exists and contains non-empty data.
 * - Parse and validate secrets using {@link parseConfig}.
 * - Return an immutable, type-safe configuration object.
 *
 * ### Parameters
 * | Name | Type | Description |
 * |------|------|-------------|
 * | `schema` | {@link ConfigSchema} | Zod schema describing the required secret keys. |
 * | `options` | {@link SecretsConfigOptions} | Optional path configuration for where to read secret files. |
 *
 * ### Throws
 * - {@link SecretValidationError} when:
 *   - A secret file is missing or unreadable.
 *   - A secret file exists but is empty.
 *   - Zod validation fails on parsed secret values.
 *
 * @template Schema - The Zod schema defining the shape of the secrets object.
 * @param schema - The Zod schema describing expected secret keys.
 * @param options - Optional configuration for the secret base path.
 * @returns A readonly, validated secrets configuration object.
 *
 * @see {@link SecretValidationError}
 * @see {@link parseConfig}
 * @see {@link InferConfig}
 */
export const getSecrets = <Schema extends ConfigSchema>(
  schema: Schema,
  options?: SecretsConfigOptions,
): Readonly<InferConfig<Schema>> => {
  const { basePath = '/run/secrets' } = options ?? {}

  const secrets = Object.fromEntries(Object.keys(schema.shape).map((key) => [key, readSecretFile(key, basePath)]))
  const validated = parseConfig(schema, secrets, { path, ErrorClass: SecretValidationError, label: 'secrets' })

  return Object.freeze(validated)
}
