import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { PositiveNumberSchema } from './PositiveNumberSchema.js'

const path = getTranslationPath(import.meta.url)

/**
 * **PortSchema**
 *
 * Zod schema validating a **valid TCP port number** for development environments.
 *
 * ### Purpose
 * Ensures that the provided value is:
 * - A positive integer (`> 0`)
 * - Within the typical local development range (`1–9999`)
 *
 * ### Behavior
 * - Automatically coerces input values (e.g., strings like `"3000"`) into numbers.
 * - Throws a localized validation error if the number exceeds the allowed range.
 *
 * @translationKey `${path}.port_range`
 */
export const PortSchema = PositiveNumberSchema.max(9999, { error: () => `${path}.port_range` })
