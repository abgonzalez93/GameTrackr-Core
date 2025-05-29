import { EnvError } from '../errors'

/**
 * Gets a required environment variable. Throws if not present.
 *
 * @param name - Environment variable name
 * @returns The variable value
 */
export const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new EnvError(name)
  return value
}

/**
 * Environment configuration.
 *
 * Centralized access to all environment variables used in the application,
 * including runtime flags and required external service credentials.
 *
 * Each variable is either loaded directly from `process.env`, has a default fallback,
 * or is enforced as required using the `required` function.
 *
 * @module config/env
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
}
