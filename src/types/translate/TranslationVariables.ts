/**
 * **TranslationVariables**
 *
 * Represents a dynamic set of named placeholders used for **translation interpolation**.
 *
 * This type defines a mapping between variable names and their runtime values,
 * allowing localized messages to embed dynamic content such as usernames, IDs,
 * counts, or formatted strings.
 *
 * ### Responsibilities
 * - Provide runtime substitution values for placeholders in translation strings.
 * - Support both string and numeric values (auto-coerced by i18n).
 * - Maintain a consistent structure for all TrackPlay translation utilities.
 *
 */
export type TranslationVariables = Record<string, string | number | boolean>
