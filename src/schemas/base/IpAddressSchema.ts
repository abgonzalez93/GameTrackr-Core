import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const IpAddressSchema = z.ipv4({ error: () => `${path}.ip_address_invalid` })
