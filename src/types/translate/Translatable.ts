import { type TranslationVariables } from './TranslationVariables.ts'

export interface Translatable {
  key: string
  variables?: TranslationVariables
}
