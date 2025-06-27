import { getI18n } from '@i18n/index'
import z from 'zod'

const i18n = getI18n()

/**
 * Zod schema for validating a username (used as login identifier).
 *
 * - Between 3 and 30 characters
 * - Alphanumeric characters and underscores only
 * - No spaces or special characters
 */
export const UsernameSchema = z
  .string({ required_error: i18n.t('core.schemas.login.username_required') })
  .trim()
  .min(3, i18n.t('core.schemas.login.username_min'))
  .max(30, i18n.t('core.schemas.login.username_max'))
  .regex(/^[a-zA-Z0-9_]+$/, i18n.t('core.schemas.login.username_invalid'))

export type Username = z.infer<typeof UsernameSchema>
