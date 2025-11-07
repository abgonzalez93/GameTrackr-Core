import { z } from 'zod'
import { NodeEnvSchema, IpAddressSchema, PortSchema, NonEmptyStringSchema } from './base.schema.ts'

export const BaseServerEnvSchema = z.object({
  NODE_ENV: NodeEnvSchema,
  HOST: IpAddressSchema,
  PORT: PortSchema,
  CORS_ORIGINS: NonEmptyStringSchema,
})
