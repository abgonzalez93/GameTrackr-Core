import { fileURLToPath } from 'url'
import path from 'path'

/**
 * Generates a normalized, dot-separated "translation path" identifier
 * from a module's `import.meta.url`.
 *
 * This helper is intended for consistent, repository-relative identifiers
 * — for example, to prefix translation keys or structured log messages
 * with their exact file location in the source tree.
 *
 * @param url - The `import.meta.url` of the calling module.
 * @returns A normalized path identifier in the format: `<repoName>.<relative.path.from.src>`
 *
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
