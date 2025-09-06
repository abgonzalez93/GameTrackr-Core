import { z } from 'zod'

const path = 'core.schemas.shared'

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
export const IpAddressSchema = z.ipv4({ error: () => `${path}.ip_invalid` })

/**
 * Zod schema for validating a non-empty string.
 *
 * Ensures the string is not empty (min length: 1).
 */
export const NonEmptyStringSchema = z.string().min(1, { error: () => `${path}.string_empty` })

/**
 * Zod schema for validating a valid URL.
 *
 * Ensures the string is a properly formatted HTTP(S)/FTP/etc. URL.
 */
export const UrlStringSchema = z.url({ error: () => `${path}.url_invalid` })

/**
 * Zod schema for validating a positive number in seconds.
 *
 * Coerces the input to an integer and checks that it is positive.
 * Useful for durations, expirations, etc.
 */
export const PositiveNumberSchema = z.coerce
  .number({ error: () => `${path}.number_invalid` })
  .int({ error: () => `${path}.number_integer` })
  .positive({ error: () => `${path}.number_positive` })

/**
 * Zod schema for validating a development port number (1–9999).
 *
 * Coerces input to a positive integer and restricts the max value to 9999.
 * Suitable for typical local development ports (e.g., 3000, 8080).
 */
export const PortSchema = PositiveNumberSchema.max(9999, { error: () => `${path}.port_range` })

export const OptionalStringArraySchema = z.array(z.string().min(1)).optional()
