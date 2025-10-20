import { IpAddressSchema } from './IpAddressSchema.ts'
import { NodeEnvSchema } from './NodeEnvSchema.ts'
import { NonEmptyStringSchema } from './NonEmptyStringSchema.ts'
import { PortSchema } from './PortSchema.ts'

/**
 * **BaseServerEnvSchema**
 *
 * Zod schema defining the core environment variables
 * required by all TrackPlay backend services.
 *
 * ### Contains
 * - `NODE_ENV`: Runtime environment (development, production, test)
 * - `HOST`: Hostname or IP address where the service runs
 * - `PORT`: Network port where the HTTP server will listen
 * - `CORS_ORIGINS`: Comma-separated list of allowed origins
 *
 * ### Usage
 * Extend this schema in your service-specific schemas to ensure
 * a consistent baseline configuration:
 *
 */
export const BaseServerEnvSchema = {
  NODE_ENV: NodeEnvSchema,
  HOST: IpAddressSchema,
  PORT: PortSchema,
  CORS_ORIGINS: NonEmptyStringSchema,
}
