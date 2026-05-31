import { z } from 'zod'

export const PositiveNumberSchema = z.coerce
  .number({ error: 'core.validation.number.base' })
  .int({ error: 'core.validation.number.integer' })
  .positive({ error: 'core.validation.number.positive' })

export const IdSchema = z.coerce
  .number({ error: 'core.validation.id.invalid' })
  .int({ error: 'core.validation.id.invalid' })
  .nonnegative({ error: 'core.validation.id.invalid' })

export const UuidSchema = z.uuid({ error: 'core.validation.uuid.invalid' })

export const RequiredString = z
  .string({ error: 'core.validation.string.base' })
  .min(1, { error: 'core.validation.string.empty' })
