import { readFileSync } from 'fs'
import { resolve, basename } from 'path'
import { z } from 'zod'
import { FileSystemError, ConfigurationError } from '#errors/infrastructure.error'
import { type ConfigSchema } from '#types/config.type'
import { validateSchema } from '#utils/validate.util'

const readSecretFile = (secretName: string, basePath: string): string => {
  const filePath = resolve(basePath, secretName)

  try {
    const content = readFileSync(filePath, 'utf8').trim()
    if (!content) throw new FileSystemError({ message: `Secret is empty: ${secretName}` })
    return content
  } catch (error) {
    if (error instanceof FileSystemError) throw error

    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new FileSystemError({
        message: `Secret is missing: ${secretName}`,
        errors: { error },
      })
    }

    throw new FileSystemError({
      message: `Failed to read secret: ${secretName}`,
      errors: { error },
    })
  }
}

export interface SecretsConfigOptions {
  basePath?: string
  isDevelopment?: boolean
  serviceName?: string
}

export const getSecrets = <Schema extends ConfigSchema>(
  schema: Schema,
  options: SecretsConfigOptions = {},
): Readonly<z.infer<Schema>> => {
  let { basePath } = options
  const { isDevelopment, serviceName } = options

  if (isDevelopment && !basePath) {
    const targetService = serviceName || basename(process.cwd())
    basePath = resolve(process.cwd(), '../.secrets', targetService.toLowerCase())
  }

  if (!basePath) basePath = '/run/secrets'

  const secrets = Object.fromEntries(
    Object.keys(schema.shape).map((key) => {
      const secretName = key.toLowerCase()
      const value = readSecretFile(secretName, basePath)
      return [key.toUpperCase(), value]
    }),
  )

  const validated = validateSchema(schema, secrets, {
    message: 'Invalid secrets configuration',
    ErrorClass: ConfigurationError,
  })

  return Object.freeze(validated)
}
