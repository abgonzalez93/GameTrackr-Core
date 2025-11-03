import { z } from 'zod'
import { NODE_ENV } from '#constants/nodeEnv'
import { getTranslationPath } from '#utils/translate/getTranslationPath'

const path = getTranslationPath(import.meta.url)

export const NodeEnvSchema = z
  .enum(Object.values(NODE_ENV), { error: () => `${path}.node_env_invalid` })
  .default(NODE_ENV.DEVELOPMENT)
