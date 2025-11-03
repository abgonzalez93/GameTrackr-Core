import { z } from 'zod'
import { IpAddressSchema } from '../base/IpAddressSchema.ts'
import { NodeEnvSchema } from '../base/NodeEnvSchema.ts'
import { NonEmptyStringSchema } from '../base/NonEmptyStringSchema.ts'
import { PortSchema } from '../base/PortSchema.ts'

export const BaseServerEnvSchema = z.object({
  NODE_ENV: NodeEnvSchema,
  HOST: IpAddressSchema,
  PORT: PortSchema,
  CORS_ORIGINS: NonEmptyStringSchema,
})
