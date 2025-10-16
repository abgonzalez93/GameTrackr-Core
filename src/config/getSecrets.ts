import fs from 'fs'
import * as fPath from 'path'
import { SecretValidationError } from '#errors/config/SecretValidationError'
import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { t } from '#utils/translate/t'

const path = getTranslationPath(import.meta.url)

/**
 * **readSecretFile**
 *
 * Reads and validates a Docker-managed secret from `/run/secrets/<name>`.
 *
 * ### Responsibilities
 * - Construct absolute file path for the given secret name.
 * - Ensure the file exists and is non-empty.
 * - Throw a localized {@link SecretValidationError} on any failure.
 *
 * @param secretName - The name of the secret file (without path).
 * @returns The trimmed secret value.
 * @throws {@link SecretValidationError} If the file is missing, empty, or unreadable.
 */
const readSecretFile = (secretName: string): string => {
  const filePath = fPath.resolve('/run/secrets', secretName)

  try {
    if (!fs.existsSync(filePath)) throw new SecretValidationError(t(`${path}.missing_secret`, { secret: secretName }))

    const content = fs.readFileSync(filePath, 'utf8').trim()

    if (!content) throw new SecretValidationError(t(`${path}.empty_secret`, { secret: secretName }))
    return content
  } catch (error: unknown) {
    if (error instanceof SecretValidationError) throw error

    const reason = error instanceof Error ? error.message : String(error)
    throw new SecretValidationError(t(`${path}.read_failed`, { secret: secretName }), { reason })
  }
}

/**
 * **getSecrets**
 *
 * Loads and validates multiple Docker secrets from `/run/secrets`.
 *
 * ### Responsibilities
 * - Resolve each secret file by name.
 * - Throw an error immediately if any secret is missing or invalid.
 * - Return a key–value map of successfully loaded secrets.
 *
 * @param names - List of secret file names to resolve.
 * @returns An object mapping secret names to their values.
 * @throws {@link SecretValidationError} If any secret file fails validation.
 */
export const getSecrets = (...names: string[]): Record<string, string> => {
  const resolved: Record<string, string> = {}
  for (const name of names) resolved[name] = readSecretFile(name)
  return resolved
}
