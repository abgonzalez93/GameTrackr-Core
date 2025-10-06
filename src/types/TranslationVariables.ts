/**
 * **TranslationVariables**
 *
 * Represents a dynamic set of named placeholders used for translation interpolation.
 *
 * This type defines a mapping between variable names and their runtime values,
 * allowing localized strings to include dynamic content (e.g., usernames, IDs, etc.).
 *
 */
export type TranslationVariables = Record<string, string | number>
