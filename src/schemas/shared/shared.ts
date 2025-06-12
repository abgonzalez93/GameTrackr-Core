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
 * Zod schema for validating a positive port number.
 *
 * Coerces the input to a number, checks for positivity and integer.
 * Example: 3000
 */
export const PortSchema = z.coerce.number({ invalid_type_error: 'Must be a number' }).int().positive()

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
export const PositiveNumberSchema = z.coerce.number().int().positive()

/**
 * Zod schema for validating a positive integer ID.
 *
 * Coerces the input (string or number) to an integer and ensures it's positive.
 * Suitable for use with URL parameters.
 */
export const IdSchema = z.coerce.number().int().positive({ message: 'ID must be a positive integer' })

export type Id = z.infer<typeof IdSchema>
