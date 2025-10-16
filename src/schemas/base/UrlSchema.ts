import { z } from 'zod'

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
export const UrlSchema = z.url()
