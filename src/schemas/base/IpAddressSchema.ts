import { getTranslationPath } from '#utils/translate/getTranslationPath'
import { z } from 'zod'

const path = getTranslationPath(import.meta.url)

/**
 * **IpAddressSchema**
 *
 * Zod schema validating an IPv4 address.
 *
 * ### Purpose
 * Used for network configuration or logging contexts where a valid
 * IP address (v4) is required.
 *
 * ### Validation Rules
 * - Accepts both **IPv4** (`192.168.0.1`) format.
 * - Rejects malformed or non-string inputs.
 * - Returns a localized error key when invalid.
 *
 * @translationKey `${path}.ip_invalid`
 */
export const IpAddressSchema = z.ipv4({ error: () => `${path}.ip_invalid` })
