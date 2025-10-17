import { z } from 'zod'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

/**
 * **NodeEnvSchema**
 *
 * Zod schema validating the Node.js runtime environment.
 *
 * ### Purpose
 * Ensures that environment variables defining the runtime mode
 * (`NODE_ENV`) are restricted to recognized, safe values.
 *
 * ### Allowed Values
 * - `"development"` — Enables debug logging, relaxed security, and hot reload.
 * - `"production"` — Optimized for performance and security.
 * - `"test"` — Used for automated testing environments.
 *
 * ### Default
 * Defaults to `"development"` if no value is provided.
 *
 */
export const NodeEnvSchema = z
  .enum(['development', 'production', 'test'], { error: () => `${path}.node_env_invalid` })
  .default('development')
