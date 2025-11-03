import { PositiveNumberSchema } from './PositiveNumberSchema.ts'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const PortSchema = PositiveNumberSchema.max(9999, { error: () => `${path}.port_invalid` })
