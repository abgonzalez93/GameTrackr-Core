import { type Translatable } from '#types/translate/Translatable'
import { type TranslationVariables } from '#types/translate/TranslationVariables'

export const t = (key: string, variables?: TranslationVariables): Translatable => ({ key, variables })
