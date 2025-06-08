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
