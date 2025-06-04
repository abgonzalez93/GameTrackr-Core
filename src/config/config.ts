import { EnvError } from '@errors/index'

/**
 * Retrieves a required environment variable.
 *
 * If the environment variable is not defined or empty, an `EnvError` is thrown.
 *
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 * @throws EnvError if the variable is not defined
 *
 * @example
 * const port = required('PORT') // Throws if PORT is undefined
 */
export const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new EnvError(name)
  return value
}

/**
 * Shared runtime environment flags used across both server and client environments.
 *
 * These flags indicate the current runtime environment mode and are computed
 * from the value of `NODE_ENV`.
 */
const getCommonConf = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
})

/**
 * Returns the server-side environment configuration.
 *
 * Uses `required()` to enforce presence of critical variables at runtime.
 * This function should only be called in a Node.js context.
 *
 * @returns An object containing server-only environment configuration
 * @throws EnvError if any required variable is missing
 *
 * @module config
 */
export const getServerConf = () => ({
  ...getCommonConf(),
  HOST: required('HOST'),
  PORT: parseInt(required('PORT'), 10),
  CORS_ORIGINS: required('CORS_ORIGINS'),
})

/**
 * Returns the client-side environment configuration.
 *
 * Includes only variables that are safe and relevant for browser usage.
 * Should never include secrets or server-specific values.
 *
 * @returns An object containing client-only configuration
 *
 * @module config
 */
export const getClientConf = () => ({
  ...getCommonConf(),
})
