/**
 * **ConfigValues**
 *
 * Represents the raw key–value pairs extracted from `process.env` or `/run/secrets`.
 * Used as the base source for validation and normalization.
 */
export type ConfigValues = Record<string, string | undefined>
