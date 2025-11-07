export type TranslationVariables = Record<string, string | number | boolean>

export interface Translatable {
  key: string
  variables?: TranslationVariables
}
