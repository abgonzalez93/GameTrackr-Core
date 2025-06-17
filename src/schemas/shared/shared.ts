import { z } from 'zod'

/**
 * Zod schema for validating the Node environment.
 *
 * Accepts only 'development', 'production', or 'test'.
 */
export const NodeEnvSchema = z.enum(['development', 'production', 'test']).default('development')

/**
 * Zod schema for validating a valid IPv4 or IPv6 address.
 *
 * Ensures the value is a properly formatted IP string.
 */
export const IpAddressSchema = z.string().ip({ message: 'Must be a valid IP address' })

/**
 * Zod schema for validating a non-empty string.
 *
 * Ensures the string is not empty (min length: 1).
 */
export const NonEmptyStringSchema = z.string().min(1, { message: 'Must be a non-empty string' })

/**
 * Zod schema for validating a valid URL.
 *
 * Ensures the string is a properly formatted HTTP(S)/FTP/etc. URL.
 */
export const UrlStringSchema = z.string().url({ message: 'Must be a valid URL' })

/**
 * Zod schema for validating a positive number in seconds.
 *
 * Coerces the input to an integer and checks that it is positive.
 * Useful for durations, expirations, etc.
 */
export const PositiveNumberSchema = z.coerce
  .number({ invalid_type_error: 'Must be a number' })
  .int()
  .positive({ message: 'Must be a positive integer' })

/**
 * Zod schema for validating a development port number (1–9999).
 *
 * Coerces input to a positive integer and restricts the max value to 9999.
 * Suitable for typical local development ports (e.g., 3000, 8080).
 */
export const PortSchema = PositiveNumberSchema.max(9999, { message: 'Port must be between 1 and 9999' })

export const OptionalStringArraySchema = z.array(z.string().min(1)).optional()
