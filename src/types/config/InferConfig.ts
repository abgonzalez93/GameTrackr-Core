import { z } from 'zod'
import { type ConfigSchema } from './ConfigSchema.ts'

export type InferConfig<Schema extends ConfigSchema> = z.infer<Schema>
