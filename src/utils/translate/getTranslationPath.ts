import { fileURLToPath } from 'url'
import path from 'path'

/**
 * Generates a repository-scoped, dot-separated **translation path** identifier
 * from a module’s {@link import.meta.url}.
 *
 * ### Responsibilities
 * - Derives a stable and human-readable identifier for the current module.
 * - Converts a file’s absolute path into a normalized, dot-delimited key.
 * - Ensures consistency across logs, error messages, and i18n translation keys.
 *
 * ### Format
 * The returned string follows this convention:
 * ```
 * <repoName>.<relative.path.from.src>
 * ```
 *
 * ### Example
 * Given:
 * ```
 * /Users/dev/trackplay-catalog/src/adapters/igdb/auth.ts
 * ```
 * The output will be:
 * ```
 * catalog.adapters.igdb.auth
 * ```
 *
 * ### Notes
 * - This function relies on detecting the repository name from the `trackplay-*` segment.
 * - File extensions (`.ts`, `.js`, `.mts`, `.cjs`) are automatically stripped.
 * - Intended for use in error translation keys (e.g., `catalog.adapters.igdb.auth.invalid_token`).
 *
 * @param url - The module’s {@link import.meta.url}.
 * @returns A normalized translation path string (e.g., `"catalog.adapters.igdb.auth"`).
 */
export const getTranslationPath = (url: string): string => {
  const filePath = fileURLToPath(url)

  const repoSegment = filePath.split('trackplay-')[1]?.split('/')[0] ?? ''
  const repoName = path.basename(repoSegment)

  const relativeToSrc = filePath.split('/src/')[1] ?? ''
  const withoutExt = relativeToSrc.replace(/\.[cm]?[tj]s$/, '')
  const dotPath = withoutExt.replaceAll('/', '.')

  return `${repoName}.${dotPath}`
}
