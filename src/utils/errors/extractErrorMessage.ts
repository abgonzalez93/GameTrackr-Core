import { ApiError } from '@errors/index'

/**
 * Extracts a user-friendly error message from an unknown error.
 *
 * @param error - The error thrown
 * @returns A formatted string message
 *
 * @module utils/errors
 */
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return `[${error.statusCode}] ${error.message}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}
