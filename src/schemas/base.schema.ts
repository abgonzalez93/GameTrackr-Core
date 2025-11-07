import { z } from 'zod'
import { NODE_ENV } from '#constants/nodeEnv.constant'
import { getTranslationPath } from '#utils/translate.util'

const path = getTranslationPath(import.meta.url)

export const PositiveNumberSchema = z.coerce.number().int().positive()
export const IdSchema = PositiveNumberSchema
export const IdListSchema = z.array(IdSchema)
export const UrlSchema = z.url({ error: () => `${path}.url_invalid` })
export const PortSchema = PositiveNumberSchema.max(9999, { error: () => `${path}.port_invalid` })
export const IpAddressSchema = z.ipv4({ error: () => `${path}.ip_address_invalid` })

export const NonEmptyStringSchema = z
  .string({ error: () => `${path}.string_invalid` })
  .min(1, { error: () => `${path}.string_empty` })

export const NodeEnvSchema = z
  .enum(Object.values(NODE_ENV), { error: () => `${path}.node_env_invalid` })
  .default(NODE_ENV.DEVELOPMENT)

export const OptionalStringArraySchema = z.array(NonEmptyStringSchema).optional()
