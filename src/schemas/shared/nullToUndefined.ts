import { ZodTypeAny } from 'zod'

/**
 * Transforms a nullable Zod schema to output `undefined` instead of `null`.
 *
 * @param schema - The base Zod schema
 * @returns A new schema that accepts `null` but transforms it to `undefined`
 */
export const nullToUndefined = <T extends ZodTypeAny>(schema: T) =>
  schema
    .nullable()
    .transform((v) => v ?? undefined)
    .optional()
