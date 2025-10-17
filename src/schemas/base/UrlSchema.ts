import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * **UrlSchema**
 *
 * Zod schema validating that a value is a **well-formed URL string**.
 *
 * ### Purpose
 * Ensures that the provided value is a syntactically valid URL
 * following standard protocols (e.g., `http`, `https`, `ftp`).
 *
 * ### Behavior
 * - Accepts absolute URLs only.
 * - Rejects relative paths or malformed strings.
 * - Throws a localized validation error when invalid.
 *
 */
export const UrlSchema = z.url({ error: () => `${path}.url_invalid` })
