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
 *
 * @property NODE_ENV - Node environment mode (`development`, `production`, or other)
 * @property IS_PRODUCTION - `true` if `NODE_ENV === 'production'`
 * @property IS_DEVELOPMENT - `true` if `NODE_ENV === 'development'` or not defined
 */
const commonConf = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
}

/**
 * Server-side environment configuration.
 *
 * Includes variables that are only available in the Node.js runtime (e.g., Express apps).
 * Uses `required()` to enforce presence of critical variables at startup.
 *
 * @property HOST - Hostname or IP where the server listens (e.g., '0.0.0.0')
 * @property PORT - Port number on which the server listens
 * @property CORS_ORIGINS - Comma-separated list of allowed CORS origins
 *
 * @module config
 */
export const serverConf = {
  ...commonConf,
  HOST: required('HOST'),
  PORT: parseInt(required('PORT'), 10),
  CORS_ORIGINS: required('CORS_ORIGINS'),
}

/**
 * Client-side environment configuration.
 *
 * Only includes environment flags that are safe and relevant for the browser runtime.
 * Should not access any server-only variables or sensitive information.
 *
 * @module config
 */
export const clientConf = {
  ...commonConf,
}
