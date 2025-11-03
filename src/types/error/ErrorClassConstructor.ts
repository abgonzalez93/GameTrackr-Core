import type { Translatable } from '#types/translate/Translatable'

export type ErrorClassConstructor = new (message: string | Translatable, details?: Record<string, unknown>) => Error
