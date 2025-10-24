import type { Translatable } from '#types/translate/Translatable'

/**
 * **ErrorClassCtor**
 *
 * Represents the constructor signature for any custom `Error` subclass
 * used throughout the TrackPlay core.
 *
 * This ensures a consistent shape for error class constructors,
 * particularly for domain errors that accept a message and optional context details.
 *
 */
export type ErrorClassConstructor = new (message: string | Translatable, details?: Record<string, unknown>) => Error
